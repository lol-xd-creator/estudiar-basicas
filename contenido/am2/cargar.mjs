// Carga las notas de AM2 en la app (por la API). Se puede correr de nuevo:
// borra antes la raíz "Análisis Matemático II" y la nota "Prueba 3D".
//   node cargar.mjs [http://localhost:8091]
import { readdirSync, readFileSync } from "node:fs";

const BASE = process.argv[2] || "http://localhost:8091";
const dir = new URL("./notas/", import.meta.url);
const api = async (method, path, body) => {
  const r = await fetch(BASE + "/api" + path, { method, headers: body ? { "Content-Type": "application/json" } : {}, body: body && JSON.stringify(body) });
  if (!r.ok) throw new Error(`${method} ${path}: ${r.status} ${await r.text()}`);
  return r.status === 204 ? null : r.json();
};

const tree = await api("GET", "/tree");
for (const n of tree.filter((n) => !n.parent_id && ["Análisis Matemático II", "Prueba 3D"].includes(n.title))) await api("DELETE", `/notes/${n.id}`);

// 00 = raíz, 01 = hija de la raíz, el resto hijas de 01.
const ids = [];
for (const file of readdirSync(dir).filter((f) => f.endsWith(".md")).sort()) {
  const text = readFileSync(new URL(file, dir), "utf8").replace(/\r\n/g, "\n");
  const [, title, body] = text.match(/^# (.*)\n+([\s\S]*)$/);
  const parent = ids.length === 0 ? null : ids.length === 1 ? ids[0] : ids[1];
  const note = await api("POST", "/notes", { parent_id: parent, title, content: body.trimEnd() + "\n" });
  ids.push(note.id);
  console.log("✔", title);
}
