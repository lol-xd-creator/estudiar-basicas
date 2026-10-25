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

// Estructura: raíz → Teórico y Práctico → una carpeta por clase ("DD/MM ·
// tema", en orden de fecha) → las notas de esa clase. Teórico y práctico van
// por separado porque no siempre ven el mismo tema la misma semana.
const TREE = [
  ["00-fisica2.md", [
    ["01-teorico.md", [
      ["tc0206.md", [["20-campo-electrico.md"]]],
      ["tc2306.md", [["21-flujo-gauss.md"]]],
      ["tc3006.md", [["10-gauss.md"], ["11-potencial.md"]]],
      ["tc1808.md", [["12-capacitores.md"]]],
      ["tc2508.md", [["24-corriente-resistencia.md"]]],
      ["tc0109.md", [["04-potencia-joule.md"], ["02-resistores-kirchhoff.md"], ["03-metodo-kirchhoff.md"]]],
      ["tc1509.md", [["25-instrumentos-domiciliaria.md"]]],
      ["tmag.md", [["26-magnetismo.md"]]],
      ["tc2909.md", [["28-cargas-campo-magnetico.md"]]],
      ["tc0610.md", [["30-biot-savart.md"]]],
      ["tc2010.md", [["32-induccion-faraday.md"]]],
    ]],
    ["05-practico.md", [
      ["pc0906.md", [["22-ejercicios-6.md"]]],
      ["pc2306.md", [["23-ejercicios-7a.md"]]],
      ["pc3006.md", [["15-potencial-714-716.md"]]],
      ["pc1108.md", [["16-capacitores-811-813.md"], ["17-capacitores-814-815.md"]]],
      ["pc2508.md", [["06-ley-ohm-924.md"], ["07-ejercicios-925-928.md"], ["08-reostato-911.md"]]],
      ["pc1509.md", [["27-circuitos-101-103.md"]]],
      ["pc2909.md", [["29-circuitos-104-106.md"]]],
      ["pc0610.md", [["31-kirchhoff-0610.md"]]],
      ["pc2010.md", [["33-campo-magnetico-unidad-11.md"]]],
    ]],
    ["40-ejercicios-modelo.md", [
      ["41-cap6-modelo.md", [["42-fuerza-neta-carga-puntual.md"]]],
    ]],
    ["50-preguntas-repaso.md", [["51-preguntas-electro.md"], ["52-preguntas-magnetismo.md"]]],
  ]],
];

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
