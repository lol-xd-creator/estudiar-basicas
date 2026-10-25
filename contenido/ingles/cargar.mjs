// Carga el apunte de inglés (test de EPAM) en la app (por la API). Se
// puede correr de nuevo: borra antes la raíz "Inglés (EPAM)".
//   node contenido/ingles/cargar.mjs [http://localhost:8091]
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

// Estructura: raíz con el programa analítico → una subnota por unidad.
const TREE = [["00-ingles.md", [["01-oracion-auxiliares.md"], ["02-mapa-tiempos.md"], ["03-presentes.md"], ["04-pasados.md"], ["05-futuros.md"], ["06-modales.md"], ["07-condicionales.md"], ["08-pasiva.md"], ["09-estilo-indirecto.md"], ["10-gerundio-infinitivo.md"], ["11-relativos-articulos.md"], ["11b-adjetivos-adverbios.md"], ["12-conectores.md"], ["13-vocabulario.md"], ["14-inversion-cleft.md"], ["15-estructuras-avanzadas.md"], ["16-lectura.md"]]]];

const root = read(TREE[0][0]);
const tree = await api("GET", "/tree");
// Si la rama ya estaba, la nueva ocupa su mismo lugar entre las raíces.
const roots = tree.filter((n) => !n.parent_id);
const old = roots.findIndex((n) => n.title === root.title);
for (const n of roots.filter((n) => n.title === root.title)) await api("DELETE", `/notes/${n.id}`);

let top = null;
async function load(nodes, parent) {
  for (const [file, kids = []] of nodes) {
    const note = await api("POST", "/notes", { parent_id: parent, ...read(file) });
    top ??= note;
    console.log("✔", note.title);
    await load(kids, note.id);
  }
}
await load(TREE, null);
if (old >= 0) await api("POST", `/notes/${top.id}/move`, { parent_id: null, index: old });
