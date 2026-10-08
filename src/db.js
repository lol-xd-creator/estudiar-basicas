// Persistencia en un único archivo SQLite (node:sqlite, sin dependencias).
// Las notas forman un árbol: parent_id NULL = raíz; position ordena hermanos.
import { DatabaseSync } from "node:sqlite";
import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

export function openDB(file) {
  if (file !== ":memory:") mkdirSync(dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS notes (
      id         TEXT PRIMARY KEY,
      parent_id  TEXT REFERENCES notes(id) ON DELETE CASCADE,
      title      TEXT NOT NULL,
      content    TEXT NOT NULL DEFAULT '',
      position   INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS notes_parent ON notes(parent_id, position);
  `);
  return new Notes(db);
}

export class NotFound extends Error {}
export class BadRequest extends Error {}

class Notes {
  constructor(db) {
    this.db = db;
  }

  // tree devuelve todas las notas sin contenido, ordenadas para armar el árbol.
  tree() {
    return this.db
      .prepare("SELECT id, parent_id, title, position, updated_at FROM notes ORDER BY position, created_at")
      .all()
      .map((r) => ({ ...r }));
  }

  get(id) {
    const r = this.db.prepare("SELECT * FROM notes WHERE id = ?").get(id);
    if (!r) throw new NotFound("nota inexistente");
    return { ...r };
  }

  create({ parent_id = null, title, content = "" }) {
    title = String(title ?? "").trim();
    if (!title) throw new BadRequest("el título es obligatorio");
    parent_id = parent_id || null;
    if (parent_id) this.get(parent_id);
    const { n } = this.db
      .prepare("SELECT COALESCE(MAX(position) + 1, 0) AS n FROM notes WHERE parent_id IS ?")
      .get(parent_id);
    const id = randomUUID();
    this.db
      .prepare("INSERT INTO notes (id, parent_id, title, content, position) VALUES (?, ?, ?, ?, ?)")
      .run(id, parent_id, title, String(content), n);
    return this.get(id);
  }

  update(id, { title, content }) {
    const cur = this.get(id);
    title = title === undefined ? cur.title : String(title).trim();
    if (!title) throw new BadRequest("el título es obligatorio");
    content = content === undefined ? cur.content : String(content);
    this.db
      .prepare("UPDATE notes SET title = ?, content = ?, updated_at = datetime('now') WHERE id = ?")
      .run(title, content, id);
    return this.get(id);
  }

  // move cuelga la nota de parent_id en la posición index (entre sus nuevos
  // hermanos) y renumera ese grupo. No permite moverla dentro de sí misma.
  move(id, { parent_id = null, index = 0 }) {
    this.get(id);
    parent_id = parent_id || null;
    for (let p = parent_id; p; p = this.get(p).parent_id) {
      if (p === id) throw new BadRequest("no se puede mover una nota dentro de sí misma");
    }
    const siblings = this.db
      .prepare("SELECT id FROM notes WHERE parent_id IS ? AND id <> ? ORDER BY position, created_at")
      .all(parent_id, id)
      .map((r) => r.id);
    siblings.splice(Math.max(0, Math.min(index, siblings.length)), 0, id);
    const setPos = this.db.prepare("UPDATE notes SET parent_id = ?, position = ? WHERE id = ?");
    this.db.exec("BEGIN");
    try {
      siblings.forEach((sid, i) => setPos.run(parent_id, i, sid));
      this.db.exec("COMMIT");
    } catch (e) {
      this.db.exec("ROLLBACK");
      throw e;
    }
  }

  // remove borra la nota y (por la cascada) todo su subárbol.
  remove(id) {
    this.get(id);
    this.db.prepare("DELETE FROM notes WHERE id = ?").run(id);
  }

  // search busca en títulos y contenido; devuelve un fragmento alrededor del
  // primer acierto en el contenido.
  search(q) {
    q = String(q ?? "").trim();
    if (!q) return [];
    const like = "%" + q.replace(/[\\%_]/g, (c) => "\\" + c) + "%";
    const rows = this.db
      .prepare(
        `SELECT id, title, content FROM notes
         WHERE title LIKE ? ESCAPE '\\' OR content LIKE ? ESCAPE '\\'
         ORDER BY (title LIKE ? ESCAPE '\\') DESC, title LIMIT 50`,
      )
      .all(like, like, like);
    const lower = q.toLowerCase();
    return rows.map(({ id, title, content }) => {
      const at = content.toLowerCase().indexOf(lower);
      const snippet = at < 0 ? "" : (at > 40 ? "…" : "") + content.slice(Math.max(0, at - 40), at + q.length + 60).replace(/\s+/g, " ");
      return { id, title, snippet };
    });
  }

  close() {
    this.db.close();
  }

  count() {
    return this.db.prepare("SELECT COUNT(*) AS n FROM notes").get().n;
  }
}
