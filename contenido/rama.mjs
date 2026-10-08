// Carga una rama de notas en la app (por la API). La primera nota de la
// carpeta es la raíz de la rama y el resto, sus subnotas. La rama cuelga de
// la nota raíz «padre» (que se crea si no está). Se puede correr de nuevo:
// borra antes la rama del mismo título que cuelgue de ahí.
//   cargarRama(new URL("./notas/", import.meta.url), { padre: "AM2" })
import { readdirSync, readFileSync } from "node:fs";

const BASE = process.argv[2] || "http://localhost:8091";
const api = async (method, path, body) => {
  const r = await fetch(BASE + "/api" + path, { method, headers: body ? { "Content-Type": "application/json" } : {}, body: body && JSON.stringify(body) });
  if (!r.ok) throw new Error(`${method} ${path}: ${r.status} ${await r.text()}`);
  return r.status === 204 ? null : r.json();
};

export function leerNotas(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((file) => {
      const text = readFileSync(new URL(file, dir), "utf8").replace(/\r\n/g, "\n");
      const [, title, body] = text.match(/^# (.*)\n+([\s\S]*)$/);
      return { title, content: body.trimEnd() + "\n" };
    });
}

// padre: título de la nota raíz de la que cuelga la rama. contenidoPadre:
// si se da, se usa al crearla o se le actualiza el texto.
export async function cargarRama(dir, { padre, contenidoPadre }) {
  const notes = leerNotas(dir);
  const tree = await api("GET", "/tree");
  let parent = tree.find((n) => !n.parent_id && n.title === padre);
  if (!parent) parent = await api("POST", "/notes", { parent_id: null, title: padre, content: contenidoPadre ?? "" });
  else if (contenidoPadre !== undefined) await api("PUT", `/notes/${parent.id}`, { title: padre, content: contenidoPadre });
  // Si la rama ya estaba, la nueva ocupa su mismo lugar entre las hermanas.
  const siblings = tree.filter((n) => n.parent_id === parent.id);
  const old = siblings.findIndex((n) => n.title === notes[0].title);
  for (const n of siblings.filter((n) => n.title === notes[0].title)) await api("DELETE", `/notes/${n.id}`);

  let root = null;
  for (const n of notes) {
    const note = await api("POST", "/notes", { parent_id: root?.id ?? parent.id, ...n });
    root ??= note;
    console.log("✔", n.title);
  }
  if (old >= 0) await api("POST", `/notes/${root.id}/move`, { parent_id: parent.id, index: old });
}
