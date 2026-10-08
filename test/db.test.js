import { test } from "node:test";
import assert from "node:assert/strict";
import { openDB, BadRequest, NotFound } from "../src/db.js";

const tree = (db) => db.tree().map((n) => `${n.title}<${n.parent_id ? db.get(n.parent_id).title : "-"}`);

test("crear, mover y borrar en cascada", () => {
  const db = openDB(":memory:");
  const a = db.create({ title: "A" });
  const b = db.create({ title: "B" });
  const a1 = db.create({ parent_id: a.id, title: "A1" });
  db.create({ parent_id: a1.id, title: "A1x" });
  assert.deepEqual(tree(db).sort(), ["A1<A", "A1x<A1", "A<-", "B<-"]);

  db.move(b.id, { parent_id: null, index: 0 });
  assert.deepEqual(db.tree().filter((n) => !n.parent_id).map((n) => n.title), ["B", "A"]);

  db.move(b.id, { parent_id: a.id, index: 0 });
  assert.deepEqual(db.tree().filter((n) => n.parent_id === a.id).map((n) => n.title), ["B", "A1"]);

  assert.throws(() => db.move(a.id, { parent_id: a1.id }), BadRequest);

  db.remove(a.id);
  assert.equal(db.count(), 0);
});

test("validaciones y búsqueda", () => {
  const db = openDB(":memory:");
  assert.throws(() => db.create({ title: "  " }), BadRequest);
  assert.throws(() => db.get("nope"), NotFound);
  const n = db.create({ title: "Closures", content: "Un closure recuerda su entorno léxico.\n50% de las veces" });
  assert.equal(db.update(n.id, { content: "x" }).title, "Closures");
  db.update(n.id, { content: "Un closure recuerda su entorno léxico. 50% seguro" });
  assert.equal(db.search("entorno")[0].id, n.id);
  assert.equal(db.search("closures")[0].title, "Closures");
  assert.equal(db.search("0%")[0].id, n.id);
  assert.equal(db.search("_").length, 0);
});
