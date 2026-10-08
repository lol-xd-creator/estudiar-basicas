// Autenticación de un solo usuario (la app es personal).
//
// - La contraseña se guarda como hash scrypt en APP_PASSWORD_HASH
//   ("scrypt$<sal>$<hash>", se genera con `npm run password`).
// - La sesión es una cookie firmada con HMAC-SHA256 (SESSION_SECRET):
//   "<vence>.<firma>". No hay estado en el servidor; cambiar el secreto
//   cierra todas las sesiones.
// - Límite de intentos: 5 fallidos por IP cada 15 minutos.
import { scryptSync, randomBytes, timingSafeEqual, createHmac } from "node:crypto";

// Nombre propio: en localhost las cookies no se separan por puerto, y así no
// choca con la de estudiar-desarrollo si las dos apps tienen login.
const COOKIE = "sid_mat";
const SESSION_DAYS = 30;
const MAX_FAILS = 5;
const WINDOW_MS = 15 * 60 * 1000;

export function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `scrypt$${salt.toString("base64url")}$${hash.toString("base64url")}`;
}

export function verifyPassword(password, stored) {
  const [kind, salt, hash] = String(stored || "").split("$");
  if (kind !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "base64url");
  const actual = scryptSync(String(password), Buffer.from(salt, "base64url"), expected.length);
  return timingSafeEqual(actual, expected);
}

export function createAuth({ passwordHash, secret, secureCookies }) {
  const enabled = Boolean(passwordHash);
  const key = secret || randomBytes(32).toString("hex"); // sin secreto fijo, las sesiones duran hasta reiniciar
  const fails = new Map(); // ip → { count, until }

  const sign = (value) => createHmac("sha256", key).update(value).digest("base64url");

  function readCookie(req) {
    const header = req.headers.cookie || "";
    for (const part of header.split(";")) {
      const [k, ...v] = part.trim().split("=");
      if (k === COOKIE) return v.join("=");
    }
    return null;
  }

  function isLoggedIn(req) {
    if (!enabled) return true;
    const token = readCookie(req);
    if (!token) return false;
    const [expires, sig] = token.split(".");
    if (!expires || !sig || Number(expires) < Date.now()) return false;
    const good = Buffer.from(sign(expires));
    const got = Buffer.from(sig);
    return good.length === got.length && timingSafeEqual(good, got);
  }

  function cookieHeader(value, maxAgeSec) {
    return [
      `${COOKIE}=${value}`,
      "Path=/",
      "HttpOnly",
      "SameSite=Strict",
      `Max-Age=${maxAgeSec}`,
      secureCookies ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; ");
  }

  // login devuelve la cabecera Set-Cookie si la contraseña es correcta.
  function login(ip, password) {
    const now = Date.now();
    const f = fails.get(ip);
    if (f && f.until > now && f.count >= MAX_FAILS) {
      return { ok: false, status: 429, error: "Demasiados intentos. Probá de nuevo en 15 minutos." };
    }
    if (!verifyPassword(password, passwordHash)) {
      const entry = f && f.until > now ? f : { count: 0, until: now + WINDOW_MS };
      entry.count++;
      fails.set(ip, entry);
      return { ok: false, status: 401, error: "Contraseña incorrecta." };
    }
    fails.delete(ip);
    const expires = String(now + SESSION_DAYS * 86400_000);
    return { ok: true, cookie: cookieHeader(`${expires}.${sign(expires)}`, SESSION_DAYS * 86400) };
  }

  const logoutCookie = () => cookieHeader("", 0);

  return { enabled, isLoggedIn, login, logoutCookie };
}
