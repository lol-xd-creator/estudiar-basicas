// Circuitos: lectura del bloque y resolución por las leyes de Kirchhoff.
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseCircuit, segments, solveCircuit, circuitFlow, currentTexts, branches } from "../public/js/circuitspec.js";

// EJ6 del práctico (malla abcda y afeda): I1 = 2 A, I2 = 3 A, I3 = −1 A.
const EJ6 = `
titulo: Ejercicio 6
cable (0,0) (0,4)
R (0,4) (4,4) ; 2
cable (4,4) (4,2)
R (0,2) (2,2) ; 6
bateria (4,2) (2,2) ; 10
R (4,2) (4,0) ; 4
bateria (0,0) (4,0) ; 14
nodo (0,2) ; "a"
corriente (2,2.6) (1,2.6) ; "$I_1$"
corriente (0,0.5) (0,1.5) ; "$I_2$"
corriente (0,2.5) (0,3.5) ; "$I_3$"
`;
// Las flechas de I1 e I2 de arriba no caen sobre un tramo: van en la tabla.
const EJ6_FLECHAS = EJ6.replace("corriente (2,2.6) (1,2.6)", "corriente (1.5,2) (0.5,2)").replace("corriente (0,0.5) (0,1.5)", "corriente (0,1.5) (0,0.5)");

const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≠ ${b}`);

test("lectura: componentes, valores, etiquetas y errores", () => {
  const spec = parseCircuit(EJ6 + "\nfoco (1,1) (2,2)\nR (0,0)");
  assert.equal(spec.opts.titulo, "Ejercicio 6");
  const R2 = spec.items.find((it) => it.kind === "R" && it.value === 2);
  assert.equal(R2.label, "$2\\,\\Omega$");
  assert.equal(spec.items.find((it) => it.kind === "bat" && it.value === 14).label, "$14\\,\\text{V}$");
  assert.deepEqual(
    spec.errors.map((e) => e.msg),
    ["no conozco «foco» (R, bateria, cable, nodo, corriente, malla…)", "R va entre dos puntos: (x1, y1) (x2, y2)"],
  );
  assert.equal(parseCircuit("R (0,0) (1,0) ; 4,7k").items[0].value, 4700);
});

test("los cables se parten donde se les conecta otro elemento", () => {
  const segs = segments(parseCircuit(EJ6));
  const left = segs.filter((s) => s.item.kind === "wire" && s.a[0] === 0 && s.b[0] === 0);
  assert.equal(left.length, 2); // (0,0)–(0,2) y (0,2)–(0,4): el nudo a
});

test("EJ6: Kirchhoff da I1 = 2 A, I2 = 3 A, I3 = −1 A", () => {
  const spec = parseCircuit(EJ6_FLECHAS);
  const segs = segments(spec);
  const I = solveCircuit(spec, segs);
  const of = (pred) => I.get(segs.find(pred));
  // 6 Ω de (0,2) a (2,2): I1 = 2 A va de d hacia a (de derecha a izquierda).
  close(of((s) => s.item.value === 6), -2);
  close(Math.abs(of((s) => s.item.value === 4)), 3);
  close(Math.abs(of((s) => s.item.value === 2)), 1);
  const texts = currentTexts(spec, segs, I).map((t) => t.text);
  assert.ok(texts.includes("$I_1 = 2\\,\\text{A}$"));
  assert.ok(texts.includes("$I_2 = 3\\,\\text{A}$"));
  assert.ok(texts.includes("$I_3 = -1\\,\\text{A}$")); // contrario al propuesto
});

test("sin valores, el sentido sale de las flechas y se propaga por la rama", () => {
  const spec = parseCircuit(`
bateria (0,0) (0,2)
R (0,2) (2,2)
cable (2,2) (2,0) (0,0)
corriente (0.5,2) (1.5,2) ; "$I$"`);
  const { flow, solved } = circuitFlow(spec);
  assert.equal(solved, false);
  const segs = [...flow.keys()];
  assert.equal(segs.length, 4); // todo el lazo es una sola rama
  const R = segs.find((s) => s.item.kind === "R");
  assert.equal(flow.get(R), 1); // de (0,2) a (2,2), como la flecha
  const down = segs.find((s) => s.a[0] === 2 && s.b[1] === 0);
  assert.equal(flow.get(down), 1); // sigue bajando por la derecha
});

test("ramas: cadenas entre nudos de tres o más tramos", () => {
  const segs = segments(parseCircuit(EJ6));
  assert.equal(branches(segs).length, 3); // izquierda-arriba… : tres ramas entre a y d
});

test("resistencia interna y circuito sin solución", () => {
  const spec = parseCircuit("bateria (0,0) (0,1) ; 12 ; r=1\nR (0,1) (1,1) ; 5\ncable (1,1) (1,0) (0,0)");
  const segs = segments(spec);
  const I = solveCircuit(spec, segs);
  close(Math.abs(I.get(segs.find((s) => s.item.kind === "R"))), 2); // 12 / (5 + 1)
  assert.equal(solveCircuit(parseCircuit("bateria (0,0) (0,1) ; 5\ncable (0,1) (1,1) (1,0) (0,0)")), null); // cortocircuito
});

// Los circuitos de la guía y del contenido no tienen que dar errores.
test("los circuitos de la guía y del contenido se leen sin errores", async () => {
  const { readFileSync, readdirSync, statSync } = await import("node:fs");
  const files = ["src/seed/01-guia.md"];
  const walk = (dir) => {
    for (const f of readdirSync(dir)) {
      const p = `${dir}/${f}`;
      if (statSync(p).isDirectory()) walk(p);
      else if (f.endsWith(".md")) files.push(p);
    }
  };
  walk("contenido");
  let count = 0;
  for (const f of files) {
    const text = readFileSync(f, "utf8").replace(/\r\n/g, "\n");
    for (const m of text.matchAll(/^```circuito\s*\n([\s\S]*?)\n```/gm)) {
      count++;
      assert.deepEqual(parseCircuit(m[1]).errors, [], `${f}: ${m[1].slice(0, 40)}`);
    }
  }
  assert.ok(count >= 10);
});

test("9.26: con los valores, Kirchhoff da 2,92 A, 1,71 A y 1,2 A", async () => {
  const { readFileSync } = await import("node:fs");
  const text = readFileSync("contenido/fisica2/notas/07-ejercicios-925-928.md", "utf8").replace(/\r\n/g, "\n");
  const src = text.match(/```circuito\n([\s\S]*?)\n```/)[1];
  const spec = parseCircuit(src);
  const segs = segments(spec);
  const I = solveCircuit(spec, segs);
  const val = (v) => Math.abs(I.get(segs.find((s) => s.item.kind === "R" && s.item.value === v)));
  assert.ok(Math.abs(val(4) - 2.921) < 1e-3);
  assert.ok(Math.abs(val(7) - 1.718) < 1e-3);
  assert.ok(Math.abs(val(10) - 1.203) < 1e-3);
});
