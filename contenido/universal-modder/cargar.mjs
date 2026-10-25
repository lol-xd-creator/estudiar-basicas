// Carga la lectura guiada de universal-modder en la app (por la API). Se puede
// correr de nuevo: borra antes la raíz con el mismo título.
//   node contenido/universal-modder/cargar.mjs [http://localhost:8091]
//
// Las notas enlazan los apuntes de Python e inglés con una forma corta que se
// expande acá, y falla si el destino no existe:
//   [[py:6#7|closures]]              → nota «6 · …» de Python, título «## 7. …»
//   [[py:8#functools.wraps|wraps]]   → un título que empieza con ese texto
//   [[en:8#Activa contra pasiva|passive]]
import { readFileSync, readdirSync } from "node:fs";

const BASE = process.argv[2] || "http://localhost:8091";
const api = async (method, path, body) => {
  const r = await fetch(BASE + "/api" + path, { method, headers: body ? { "Content-Type": "application/json" } : {}, body: body && JSON.stringify(body) });
  if (!r.ok) throw new Error(`${method} ${path}: ${r.status} ${await r.text()}`);
  return r.status === 204 ? null : r.json();
};
const text = (url) => readFileSync(url, "utf8").replace(/\r\n/g, "\n");

// ---------- índice de los apuntes enlazados ----------

const plain = (s) => s.replace(/\$([^$]*)\$/g, "$1").replace(/[*_`]/g, "").trim();
function indexOf(dir) {
  const out = {};
  const folder = new URL(`../${dir}/notas/`, import.meta.url);
  for (const f of readdirSync(folder).filter((f) => f.endsWith(".md"))) {
    const src = text(new URL(f, folder));
    const title = src.match(/^# (.*)$/m)[1];
    const key = title.match(/^([\d.]+) · /)?.[1];
    if (key) out[key] = { title, heads: [...src.matchAll(/^#{2,3} (.+)$/gm)].map((m) => m[1]) };
  }
  return out;
}
const BOOKS = { py: indexOf("python"), en: indexOf("ingles") };

function expand(body, file) {
  return body.replace(/\[\[(py|en):([\d.]+)(?:#([^|\]]+))?(?:\|([^\]]+))?\]\]/g, (all, book, key, sec, label) => {
    const note = BOOKS[book][key];
    if (!note) throw new Error(`${file}: no hay nota ${book}:${key}`);
    let target = note.title;
    if (sec) {
      const want = plain(sec).toLowerCase();
      const head = note.heads.find((h) => plain(h).toLowerCase() === want)
        ?? note.heads.find((h) => /^\d+$/.test(sec) && plain(h).startsWith(sec + ". "))
        ?? note.heads.find((h) => plain(h).toLowerCase().startsWith(want));
      if (!head) throw new Error(`${file}: ${book}:${key} no tiene la sección «${sec}»`);
      target += "#" + head;
    }
    return `[[${target}|${label ?? note.title}]]`;
  });
}

const read = (file) => {
  const src = text(new URL(`./notas/${file}`, import.meta.url));
  const [, title, body] = src.match(/^# (.*)\n+([\s\S]*)$/);
  return { title, content: expand(body.trimEnd(), file) + "\n" };
};

// ---------- estructura: raíz → partes → capítulos ----------

const TREE = [["00-universal-modder.md", [
  ["p1-big-picture.md", [["01-what-it-is.md"], ["02-repository.md"]]],
  ["p2-cli-skeleton.md", [["03-entry-point.md"], ["04-common.md"]]],
  ["p3-scanning.md", [["05-finding-games.md"], ["06-file-index.md"], ["07-engine-report.md"]]],
  ["p4-assets.md", [["08-sprites-pillow.md"], ["09-sprites-numpy.md"], ["10-fal-http.md"], ["11-json-comfy.md"]]],
  ["p5-windows-video.md", [["12-windows.md"], ["13-video-3d.md"]]],
  ["p6-safety-tests.md", [["14-backup-publish.md"], ["15-knowledge-base.md"], ["16-tests.md"], ["17-patterns.md"]]],
]]];

const root = read(TREE[0][0]);
const tree = await api("GET", "/tree");
const roots = tree.filter((n) => !n.parent_id);
const old = roots.findIndex((n) => n.title === root.title);
for (const n of roots.filter((n) => n.title === root.title)) await api("DELETE", `/notes/${n.id}`);

let top = null;
let words = 0;
async function load(nodes, parent) {
  for (const [file, kids = []] of nodes) {
    const data = read(file);
    words += data.content.split(/\s+/).length;
    const note = await api("POST", "/notes", { parent_id: parent, ...data });
    top ??= note;
    console.log("✔", note.title);
    await load(kids, note.id);
  }
}
await load(TREE, null);
if (old >= 0) await api("POST", `/notes/${top.id}/move`, { parent_id: null, index: old });
console.log(`${words} palabras (~${Math.round(words / 130)} min a 130 palabras por minuto)`);
