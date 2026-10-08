// Notas iniciales para una base vacía: la guía de formato y una nota de
// ejemplo. El contenido está en src/seed/*.md (la primera línea "# …" es
// el título; "<!-- hija -->" al principio la cuelga de la nota anterior).
import { readdirSync, readFileSync } from "node:fs";

export function seed(notes) {
  const dir = new URL("./seed/", import.meta.url);
  let last = null;
  for (const name of readdirSync(dir).filter((f) => f.endsWith(".md")).sort()) {
    let text = readFileSync(new URL(name, dir), "utf8").replace(/\r\n/g, "\n");
    const child = text.startsWith("<!-- hija -->");
    if (child) text = text.replace(/^<!-- hija -->\n/, "");
    const [, title, body] = text.match(/^# (.*)\n+([\s\S]*)$/);
    const note = notes.create({ parent_id: child ? last?.id : null, title, content: body.trimEnd() + "\n" });
    if (!child) last = note;
  }
}
