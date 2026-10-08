// Estudiar matemática: servidor de la app. Sirve la interfaz de public/, las
// imágenes de <DATA_DIR>/media en /media/ y una API JSON sobre la base SQLite
// de <DATA_DIR>/matematica.db.
//
// Configuración por variables de entorno (o un archivo .env, ver .env.example):
//   HOST               dónde escucha: 127.0.0.1 (solo esta PC, por defecto),
//                      0.0.0.0 (toda la red)
//   PORT               puerto (8091)
//   DATA_DIR           carpeta de datos (./data)
//   APP_PASSWORD_HASH  hash de la contraseña (`npm run password`). Obligatorio
//                      si HOST no es local o si REQUIRE_AUTH=1.
//   REQUIRE_AUTH=1     exigir contraseña aunque HOST sea local (en el VPS)
//   SESSION_SECRET     secreto para firmar la cookie de sesión
//   COOKIE_SECURE=1    cookie solo por HTTPS (en el VPS, detrás de Caddy)
//   TRUST_PROXY=1      tomar la IP real de X-Forwarded-For (detrás de Caddy)
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { openDB, NotFound, BadRequest } from "./src/db.js";
import { seed } from "./src/seed.js";
import { createAuth } from "./src/auth.js";

const ROOT = fileURLToPath(new URL(".", import.meta.url));
const PUBLIC = join(ROOT, "public");
const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT) || 8091;
const DATA = resolve(ROOT, process.env.DATA_DIR || "data");
const MEDIA = join(DATA, "media"); // imágenes de las notas, servidas en /media/
const LOCAL_ONLY = ["127.0.0.1", "localhost", "::1"].includes(HOST);

const auth = createAuth({
  passwordHash: process.env.APP_PASSWORD_HASH,
  secret: process.env.SESSION_SECRET,
  secureCookies: process.env.COOKIE_SECURE === "1",
});
// En el VPS la app escucha en 127.0.0.1 pero Caddy la publica: REQUIRE_AUTH=1
// exige contraseña aunque HOST sea local.
const MUST_AUTH = !LOCAL_ONLY || process.env.REQUIRE_AUTH === "1";
if (!auth.enabled && MUST_AUTH) {
  const why = LOCAL_ONLY ? "REQUIRE_AUTH=1" : `HOST=${HOST} expone la app a la red`;
  console.error(`✖ ${why}, pero falta APP_PASSWORD_HASH.\n  Generalo con: npm run password`);
  process.exit(1);
}
if (auth.enabled && !process.env.SESSION_SECRET) {
  console.warn("⚠ Falta SESSION_SECRET: las sesiones se pierden al reiniciar (npm run password lo genera).");
}

const notes = openDB(process.env.DB || join(DATA, "matematica.db"));
if (notes.count() === 0) seed(notes);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

// Cabeceras de seguridad en todas las respuestas.
const SECURITY_HEADERS = {
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; " +
    "connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
};

const send = (res, status, body, headers = {}) => {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", ...headers });
  res.end(body === undefined ? "" : JSON.stringify(body));
};

const clientIP = (req) =>
  (process.env.TRUST_PROXY === "1" && String(req.headers["x-forwarded-for"] || "").split(",")[0].trim()) ||
  req.socket.remoteAddress;

const IMAGE_EXT = { "image/png": ".png", "image/jpeg": ".jpg", "image/gif": ".gif", "image/webp": ".webp" };

// saveMedia guarda la imagen del cuerpo con un nombre derivado de su
// contenido (la misma imagen subida dos veces es un solo archivo).
async function saveMedia(req) {
  const ext = IMAGE_EXT[(req.headers["content-type"] || "").split(";")[0]];
  if (!ext) throw new BadRequest("solo imágenes PNG, JPG, GIF o WebP");
  const chunks = [];
  let size = 0;
  for await (const c of req) {
    size += c.length;
    if (size > 15_000_000) throw new BadRequest("imagen demasiado grande (máx. 15 MB)");
    chunks.push(c);
  }
  const data = Buffer.concat(chunks);
  const name = createHash("sha1").update(data).digest("hex").slice(0, 16) + ext;
  await mkdir(MEDIA, { recursive: true });
  await writeFile(join(MEDIA, name), data);
  return { url: "/media/" + name };
}

async function readJSON(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 5_000_000) throw new BadRequest("cuerpo demasiado grande");
  }
  try {
    return raw ? JSON.parse(raw) : {};
  } catch {
    throw new BadRequest("JSON inválido");
  }
}

// Rutas de la API: [método, patrón, handler(params, body, url, req)].
const routes = [
  ["GET", /^\/api\/tree$/, () => notes.tree()],
  ["GET", /^\/api\/search$/, (_, __, url) => notes.search(url.searchParams.get("q"))],
  ["POST", /^\/api\/notes$/, (_, body) => notes.create(body)],
  ["GET", /^\/api\/notes\/([\w-]+)$/, ([id]) => notes.get(id)],
  ["PUT", /^\/api\/notes\/([\w-]+)$/, ([id], body) => notes.update(id, body)],
  ["DELETE", /^\/api\/notes\/([\w-]+)$/, ([id]) => notes.remove(id)],
  ["POST", /^\/api\/notes\/([\w-]+)\/move$/, ([id], body) => notes.move(id, body)],
  ["POST", /^\/api\/media$/, (_, __, ___, req) => saveMedia(req)],
];

async function api(req, res, url) {
  const path = url.pathname;

  // Rutas públicas: salud, login y logout.
  if (path === "/api/health") return send(res, 200, { ok: true, auth: auth.enabled });
  if (path === "/api/login" && req.method === "POST") {
    try {
      const { password } = await readJSON(req);
      const r = auth.login(clientIP(req), password);
      if (!r.ok) return send(res, r.status, { error: r.error });
      return send(res, 200, { ok: true }, { "Set-Cookie": r.cookie });
    } catch {
      return send(res, 400, { error: "petición inválida" });
    }
  }
  if (path === "/api/logout" && req.method === "POST") {
    return send(res, 200, { ok: true }, { "Set-Cookie": auth.logoutCookie() });
  }
  if (!auth.isLoggedIn(req)) return send(res, 401, { error: "no autenticado" });

  const match = routes.map(([m, re, fn]) => [m, path.match(re), fn]).filter(([, m]) => m);
  if (!match.length) return send(res, 404, { error: "ruta inexistente" });
  const route = match.find(([m]) => m === req.method);
  if (!route) return send(res, 405, { error: "método no permitido" });
  try {
    const raw = path === "/api/media";
    const body = !raw && (req.method === "POST" || req.method === "PUT") ? await readJSON(req) : undefined;
    const out = await route[2](route[1].slice(1), body, url, req);
    send(res, out === undefined ? 204 : 200, out);
  } catch (e) {
    if (e instanceof NotFound) return send(res, 404, { error: e.message });
    if (e instanceof BadRequest) return send(res, 400, { error: e.message });
    console.error(e);
    send(res, 500, { error: "error interno" });
  }
}

// Sin sesión solo se sirve lo necesario para la pantalla de login.
const PUBLIC_FILES = new Set(["/login.html", "/styles.css", "/themes.css", "/js/theme-boot.js", "/js/login.js"]);

async function file(req, res, path) {
  if (path === "/login") path = "/login.html";
  if (!auth.isLoggedIn(req) && !PUBLIC_FILES.has(path)) {
    if (path === "/" || path.endsWith(".html")) {
      res.writeHead(302, { Location: "/login" });
      return res.end();
    }
    return send(res, 401, { error: "no autenticado" });
  }
  if (path === "/login.html" && auth.isLoggedIn(req)) {
    res.writeHead(302, { Location: "/" });
    return res.end();
  }
  const media = path.startsWith("/media/");
  const base = media ? MEDIA : PUBLIC;
  let rel;
  try {
    rel = normalize(path === "/" ? "/index.html" : decodeURIComponent(media ? path.slice(6) : path));
  } catch {
    return send(res, 400, { error: "ruta inválida" });
  }
  const full = join(base, rel);
  if (!full.startsWith(base + sep)) return send(res, 403, { error: "prohibido" });
  try {
    const data = await readFile(full);
    // ETag por contenido: el navegador revalida en cada visita y, si no
    // cambió, recibe un 304 vacío (MathJax pesa ~2 MB).
    const etag = `"${createHash("sha1").update(data).digest("base64url")}"`;
    const headers = {
      "Content-Type": TYPES[extname(full)] || "application/octet-stream",
      "Cache-Control": media ? "private, max-age=86400" : "no-cache",
      ETag: etag,
    };
    if (req.headers["if-none-match"] === etag) {
      res.writeHead(304, headers);
      return res.end();
    }
    res.writeHead(200, headers);
    res.end(req.method === "HEAD" ? undefined : data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("no encontrado");
  }
}

const server = createServer((req, res) => {
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) res.setHeader(k, v);
  const url = new URL(req.url, "http://localhost");
  if (url.pathname.startsWith("/api/")) return api(req, res, url);
  if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, { error: "método no permitido" });
  return file(req, res, url.pathname);
});

server.listen(PORT, HOST, () => {
  const where = LOCAL_ONLY ? `http://localhost:${PORT}` : `http://${HOST}:${PORT} (expuesta a la red)`;
  console.log(`Estudiar matemática → ${where} · datos en ${DATA} · login ${auth.enabled ? "activado" : "desactivado (solo local)"}`);
});

// Apagado ordenado (systemd manda SIGTERM al reiniciar o detener el servicio).
for (const signal of ["SIGTERM", "SIGINT"]) {
  process.on(signal, () => {
    server.close(() => {
      notes.close();
      process.exit(0);
    });
    setTimeout(() => process.exit(0), 5000).unref();
  });
}
