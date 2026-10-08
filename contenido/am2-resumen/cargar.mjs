// Carga el resumen de integrales dobles en la app (por la API), como una
// rama aparte: 00 es la raíz y el resto, sus subnotas. Se puede correr de
// nuevo: borra antes la rama anterior (por el título de la raíz).
//   node cargar.mjs [http://localhost:8091]
import { readdirSync, readFileSync } from "node:fs";

const BASE = process.argv[2] || "http://localhost:8091";
const dir = new URL("./notas/", import.meta.url);
const api = async (method, path, body) => {
  const r = await fetch(BASE + "/api" + path, { method, headers: body ? { "Content-Type": "application/json" } : {}, body: body && JSON.stringify(body) });
  if (!r.ok) throw new Error(`${method} ${path}: ${r.status} ${await r.text()}`);
  return r.status === 204 ? null : r.json();
};

const notes = readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .sort()
  .map((file) => {
    const text = readFileSync(new URL(file, dir), "utf8").replace(/\r\n/g, "\n");
    const [, title, body] = text.match(/^# (.*)\n+([\s\S]*)$/);
    return { title, content: body.trimEnd() + "\n" };
  });

const tree = await api("GET", "/tree");
for (const n of tree.filter((n) => !n.parent_id && n.title === notes[0].title)) await api("DELETE", `/notes/${n.id}`);

let root = null;
for (const n of notes) {
  const note = await api("POST", "/notes", { parent_id: root?.id ?? null, ...n });
  root ??= note;
  console.log("✔", n.title);
}
