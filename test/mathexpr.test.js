import { test } from "node:test";
import assert from "node:assert/strict";
import { parseExpr, compile, toTeX, varsOf, splitTop, splitRelations, evalConst, ExprError } from "../public/js/mathexpr.js";

const ev = (src, scope = {}) => compile(parseExpr(src))({ x: 0, y: 0, ...scope });
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≠ ${b}`);

test("operaciones y precedencia", () => {
  close(ev("1 + 2*3"), 7);
  close(ev("-x^2", { x: 3 }), -9);
  close(ev("2^-1"), 0.5);
  close(ev("2^3^2"), 512);
  close(ev("(1+2)(3+4)"), 21);
  close(ev("10/2/5"), 1);
});

test("multiplicación implícita y nombres pegados", () => {
  close(ev("2x", { x: 4 }), 8);
  close(ev("x y", { x: 2, y: 5 }), 10);
  close(ev("xy", { x: 2, y: 5 }), 10);
  close(ev("2pi"), 2 * Math.PI);
  close(ev("x^2y", { x: 3, y: 2 }), 18);
  close(ev("2sen(x)", { x: Math.PI / 2 }), 2);
  close(ev("xsen(x)", { x: Math.PI / 2 }), Math.PI / 2);
});

test("funciones, sin paréntesis y notación de cursada", () => {
  close(ev("sen 2x", { x: Math.PI / 4 }), 1);
  close(ev("sen x cos x", { x: 0.7 }), Math.sin(0.7) * Math.cos(0.7));
  close(ev("sen^2(x) + cos^2(x)", { x: 1.3 }), 1);
  close(ev("sen^-1(1)"), Math.PI / 2);
  close(ev("tg(pi/4)"), 1);
  close(ev("ln(e^2)"), 2);
  close(ev("log(1000)"), 3);
  close(ev("|x - 3|", { x: 1 }), 2);
  close(ev("|x||y|", { x: -2, y: -3 }), 6);
  close(ev("raiz(9 - y^2)", { y: 0 }), 3);
  close(ev("raiz(-8, 3)"), -2);
  close(ev("x^(1/3)", { x: -27 }), -3);
  close(ev("x²", { x: 5 }), 25);
  close(ev("√x", { x: 16 }), 4);
  close(ev("max(x, y, 3)", { x: 1, y: 2 }), 3);
});

test("variables y errores", () => {
  assert.deepEqual([...varsOf(parseExpr("4 - x^2 - y^2"))].sort(), ["x", "y"]);
  assert.deepEqual([...varsOf(parseExpr("1 + cos(θ)"))], ["th"]);
  assert.throws(() => parseExpr("2 +"), ExprError);
  assert.throws(() => parseExpr("(x + 1"), ExprError);
  assert.throws(() => parseExpr("foo(x)"), /no conozco/);
  assert.throws(() => evalConst("x + 1"), /número/);
  close(evalConst("-pi/2"), -Math.PI / 2);
});

test("LaTeX de las etiquetas", () => {
  assert.equal(toTeX(parseExpr("x^2")), "x^{2}");
  assert.equal(toTeX(parseExpr("sqrt(x)")), "\\sqrt{x}");
  assert.equal(toTeX(parseExpr("5 - x^2")), "5 - x^{2}");
  assert.equal(toTeX(parseExpr("-1 - x")), "-1 - x");
  assert.equal(toTeX(parseExpr("2x + 2")), "2 x + 2");
  assert.equal(toTeX(parseExpr("1/(x+y)")), "\\frac{1}{x + y}");
  assert.equal(toTeX(parseExpr("e^(-x)")), "e^{-x}");
  assert.equal(toTeX(parseExpr("sen(x)^2")), "\\left(\\operatorname{sen}\\left(x\\right)\\right)^{2}");
  assert.equal(toTeX(parseExpr("(x+1)^2")), "\\left(x + 1\\right)^{2}");
});

test("cortar líneas de gráficos", () => {
  assert.deepEqual(splitTop("x^2 + y^2 <= 9, x >= 0, max(x, y) < 2", ","), ["x^2 + y^2 <= 9", " x >= 0", " max(x, y) < 2"]);
  assert.deepEqual(splitTop('z = 1 ; "a; b" ; rayado', ";"), ["z = 1 ", ' "a; b" ', " rayado"]);
  assert.deepEqual(splitRelations("0 <= y <= x^2"), { parts: ["0", "y", "x^2"], ops: ["<=", "<="] });
  assert.deepEqual(splitRelations("x^2 + y^2 = 9"), { parts: ["x^2 + y^2", "9"], ops: ["="] });
  assert.deepEqual(splitRelations("y ≥ f(x)"), { parts: ["y", "f(x)"], ops: [">="] });
});
