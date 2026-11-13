// Carga el apunte de PyE (2.º parcial) en la app (por la API). Se puede
// correr de nuevo: borra antes la raíz «PYE».
//   node contenido/pye/cargar.mjs [http://localhost:8091]
//
// Estructura: raíz PYE (pye.md) → una rama por carpeta de notas/. En cada
// carpeta, el primer .md es la nota de la carpeta; los demás .md cuelgan de
// ella y las subcarpetas también (cada una con la misma regla). Ejemplo:
// notas/u6/ (unidad 6 y sus temas) o notas/y-practico/u6/ (práctico).
import { readdirSync } from "node:fs";
import { leerNotas } from "../rama.mjs";

const BASE = process.argv[2] || "http://localhost:8091";
const api = async (method, path, body) => {
  const r = await fetch(BASE + "/api" + path, { method, headers: body ? { "Content-Type": "application/json" } : {}, body: body && JSON.stringify(body) });
  if (!r.ok) throw new Error(`${method} ${path}: ${r.status} ${await r.text()}`);
  return r.status === 204 ? null : r.json();
};
const porNombre = (a, b) => a.localeCompare(b, undefined, { numeric: true });
const subcarpetas = (dir) =>
  readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort(porNombre);

async function cargarCarpeta(dir, parentId, nivel) {
  const [nota, ...resto] = leerNotas(dir);
  const node = await api("POST", "/notes", { parent_id: parentId, ...nota });
  console.log("  ".repeat(nivel) + "✔", nota.title);
  for (const t of resto) {
    await api("POST", "/notes", { parent_id: node.id, ...t });
    console.log("  ".repeat(nivel + 1) + "✔", t.title);
  }
  for (const sub of subcarpetas(dir)) await cargarCarpeta(new URL(`${sub}/`, dir), node.id, nivel + 1);
}

const [raiz] = leerNotas(new URL("./", import.meta.url));
const dir = new URL("./notas/", import.meta.url);

const tree = await api("GET", "/tree");
// Si ya estaba, la nueva ocupa su mismo lugar entre las raíces.
const roots = tree.filter((n) => !n.parent_id);
const old = roots.findIndex((n) => n.title === raiz.title);
for (const n of roots.filter((n) => n.title === raiz.title)) await api("DELETE", `/notes/${n.id}`);

const top = await api("POST", "/notes", { parent_id: null, ...raiz });
console.log("✔", raiz.title);
for (const sub of subcarpetas(dir)) await cargarCarpeta(new URL(`${sub}/`, dir), top.id, 1);
if (old >= 0) await api("POST", `/notes/${top.id}/move`, { parent_id: null, index: old });
