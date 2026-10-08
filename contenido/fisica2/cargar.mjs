// Carga las notas de Física II en la app (por la API). Se puede correr de
// nuevo: borra antes la raíz "Física II".
//   node contenido/fisica2/cargar.mjs [http://localhost:8091]
import { readFileSync } from "node:fs";

const BASE = process.argv[2] || "http://localhost:8091";
const api = async (method, path, body) => {
  const r = await fetch(BASE + "/api" + path, { method, headers: body ? { "Content-Type": "application/json" } : {}, body: body && JSON.stringify(body) });
  if (!r.ok) throw new Error(`${method} ${path}: ${r.status} ${await r.text()}`);
  return r.status === 204 ? null : r.json();
};
const read = (file) => {
  const text = readFileSync(new URL(`./notas/${file}`, import.meta.url), "utf8").replace(/\r\n/g, "\n");
  const [, title, body] = text.match(/^# (.*)\n+([\s\S]*)$/);
  return { title, content: body.trimEnd() + "\n" };
};

// Estructura: raíz → Teórico y Práctico → una nota por hoja.
const TREE = [
  ["00-fisica2.md", [
    ["01-teorico.md", [["02-resistores-kirchhoff.md"], ["03-metodo-kirchhoff.md"], ["04-potencia-joule.md"]]],
    ["05-practico.md", [["06-ley-ohm-924.md"], ["07-ejercicios-925-928.md"]]],
  ]],
];

const root = read(TREE[0][0]);
const tree = await api("GET", "/tree");
for (const n of tree.filter((n) => !n.parent_id && n.title === root.title)) await api("DELETE", `/notes/${n.id}`);

async function load(nodes, parent) {
  for (const [file, kids = []] of nodes) {
    const note = await api("POST", "/notes", { parent_id: parent, ...read(file) });
    console.log("✔", note.title);
    await load(kids, note.id);
  }
}
await load(TREE, null);
