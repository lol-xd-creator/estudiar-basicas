// Expresiones matemáticas escritas "como en el pizarrón" para los gráficos:
// 2x, x y, sen(x), sen^2(x), |x|, x², √x, e^(-x), raiz(x, 3)…
//
// parseExpr(texto) → árbol; compile(árbol) → función(scope) que evalúa con
// las variables de scope (x, y, z, t, u, v, r, th = θ, ph = φ); toTeX(árbol)
// → LaTeX para las etiquetas. No usa eval (la CSP de la app lo prohíbe).
//
// Funciones sin paréntesis toman lo que sigue hasta un operador explícito:
// "sen 2x" = sen(2x), "sen x cos x" = sen(x)·cos(x).

export class ExprError extends Error {}

const inv = (f) => (x) => 1 / f(x);
// [función, LaTeX, cantidad de argumentos (0 = variable)]
const FUNCS = {
  sin: [Math.sin, "\\sin"], sen: [Math.sin, "\\operatorname{sen}"],
  cos: [Math.cos, "\\cos"],
  tan: [Math.tan, "\\tan"], tg: [Math.tan, "\\operatorname{tg}"],
  sec: [inv(Math.cos), "\\sec"], csc: [inv(Math.sin), "\\csc"], cosec: [inv(Math.sin), "\\operatorname{cosec}"],
  cot: [inv(Math.tan), "\\cot"], cotg: [inv(Math.tan), "\\operatorname{cotg}"], ctg: [inv(Math.tan), "\\operatorname{cotg}"],
  asin: [Math.asin, "\\arcsin"], arcsin: [Math.asin, "\\arcsin"], arcsen: [Math.asin, "\\operatorname{arcsen}"],
  acos: [Math.acos, "\\arccos"], arccos: [Math.acos, "\\arccos"],
  atan: [Math.atan, "\\arctan"], arctan: [Math.atan, "\\arctan"], arctg: [Math.atan, "\\operatorname{arctg}"],
  sinh: [Math.sinh, "\\sinh"], senh: [Math.sinh, "\\operatorname{senh}"],
  cosh: [Math.cosh, "\\cosh"], tanh: [Math.tanh, "\\tanh"], tgh: [Math.tanh, "\\operatorname{tgh}"],
  exp: [Math.exp, "exp"], ln: [Math.log, "\\ln"], log: [Math.log10, "\\log"],
  sqrt: [null, "sqrt"], raiz: [null, "sqrt"], cbrt: [Math.cbrt, "cbrt"],
  abs: [Math.abs, "abs"], sign: [Math.sign, "\\operatorname{sgn}"], sgn: [Math.sign, "\\operatorname{sgn}"],
  floor: [Math.floor, "floor"], ceil: [Math.ceil, "ceil"], round: [Math.round, "\\operatorname{round}"],
  min: [Math.min, "\\min"], max: [Math.max, "\\max"], hypot: [Math.hypot, "\\operatorname{hypot}"],
  atan2: [Math.atan2, "\\operatorname{atan2}"],
};
// sen^-1(x) = arcsen(x), como en la notación de la cursada.
const INVERSE = { sin: "asin", sen: "arcsen", cos: "acos", tan: "atan", tg: "arctg" };
const CONSTS = { pi: Math.PI, π: Math.PI, e: Math.E };
// Variables: nombre escrito → nombre interno.
const VARS = { x: "x", y: "y", z: "z", t: "t", u: "u", v: "v", r: "r", θ: "th", theta: "th", tita: "th", φ: "ph", phi: "ph", fi: "ph" };
const VAR_TEX = { th: "\\theta", ph: "\\varphi" };

const NAMES = [...Object.keys(FUNCS), ...Object.keys(CONSTS), ...Object.keys(VARS)].sort((a, b) => b.length - a.length);

// normalize pasa a ASCII lo que se suele pegar o escribir con símbolos.
export function normalize(src) {
  return String(src)
    .replace(/[−–]/g, "-")
    .replace(/[·×⋅∙]/g, "*")
    .replace(/÷/g, "/")
    .replace(/\*\*/g, "^")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/√/g, "sqrt ")
    .replace(/∞/g, "Infinity");
}

// ---------- tokens ----------

function tokenize(src) {
  const out = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) {
      i++;
    } else if (/[\d.]/.test(c)) {
      const m = src.slice(i).match(/^(\d+\.?\d*|\.\d+)/);
      if (!m) throw new ExprError(`número mal escrito cerca de «${src.slice(i, i + 6)}»`);
      out.push({ t: "num", v: parseFloat(m[1]) });
      i += m[1].length;
    } else if (/\p{L}/u.test(c)) {
      const run = src.slice(i).match(/^\p{L}+/u)[0];
      if (run === "Infinity") {
        out.push({ t: "num", v: Infinity });
        i += run.length;
        continue;
      }
      // Partir la palabra en nombres conocidos: "xsen" = x · sen, "xy" = x · y.
      let k = 0;
      while (k < run.length) {
        const name = NAMES.find((n) => run.startsWith(n, k));
        if (!name) throw new ExprError(`no conozco «${run}»`);
        if (name in FUNCS) out.push({ t: "func", v: name });
        else if (name in CONSTS) out.push({ t: "const", v: name });
        else out.push({ t: "var", v: VARS[name] });
        k += name.length;
      }
      i += run.length;
    } else if ("+-*/^(),|[]{}".includes(c)) {
      out.push({ t: "[{".includes(c) ? "(" : "]}".includes(c) ? ")" : c });
      i++;
    } else {
      throw new ExprError(`carácter inesperado «${c}»`);
    }
  }
  out.push({ t: "end" });
  return out;
}

// ---------- parser ----------

class Parser {
  constructor(tokens) {
    this.toks = tokens;
    this.i = 0;
    this.absDepth = 0;
  }
  peek() {
    return this.toks[this.i];
  }
  next() {
    return this.toks[this.i++];
  }
  expect(t, msg) {
    if (this.peek().t !== t) throw new ExprError(msg);
    return this.next();
  }
  // ¿El token puede empezar un factor? (para la multiplicación implícita)
  startsFactor(tok, allowFunc = true) {
    if (tok.t === "func") return allowFunc;
    if (tok.t === "|") return this.absDepth === 0;
    return tok.t === "num" || tok.t === "var" || tok.t === "const" || tok.t === "(";
  }
  parseExpr() {
    let a = this.parseTerm();
    for (;;) {
      const t = this.peek().t;
      if (t !== "+" && t !== "-") return a;
      this.next();
      a = { k: "bin", op: t, a, b: this.parseTerm() };
    }
  }
  parseTerm() {
    let a = this.parseUnary();
    for (;;) {
      const tok = this.peek();
      if (tok.t === "*" || tok.t === "/") {
        this.next();
        a = { k: "bin", op: tok.t, a, b: this.parseUnary() };
      } else if (this.startsFactor(tok)) {
        a = { k: "bin", op: "*", a, b: this.parsePower(), implicit: true };
      } else return a;
    }
  }
  parseUnary() {
    const t = this.peek().t;
    if (t === "-") {
      this.next();
      return { k: "neg", a: this.parseUnary() };
    }
    if (t === "+") {
      this.next();
      return this.parseUnary();
    }
    return this.parsePower();
  }
  parsePower() {
    const base = this.parsePrimary();
    if (this.peek().t !== "^") return base;
    this.next();
    return { k: "bin", op: "^", a: base, b: this.parseUnary() };
  }
  parsePrimary() {
    const tok = this.next();
    switch (tok.t) {
      case "num":
        return { k: "num", v: tok.v };
      case "var":
        return { k: "var", n: tok.v };
      case "const":
        return { k: "const", n: tok.v, v: CONSTS[tok.v] };
      case "(": {
        const e = this.parseExpr();
        this.expect(")", "falta cerrar un paréntesis");
        return e;
      }
      case "|": {
        this.absDepth++;
        const e = this.parseExpr();
        this.absDepth--;
        this.expect("|", "falta cerrar el valor absoluto |…|");
        return { k: "abs", a: e };
      }
      case "func":
        return this.parseCall(tok.v);
      case "end":
        throw new ExprError("la expresión está incompleta");
      default:
        throw new ExprError(`sobra «${tok.t}»`);
    }
  }
  parseCall(name) {
    let power = null;
    if (this.peek().t === "^") {
      this.next();
      power = this.parseUnary();
      if (power.k === "neg" && power.a.k === "num" && power.a.v === 1 && INVERSE[name]) {
        name = INVERSE[name];
        power = null;
      }
    }
    let args;
    if (this.peek().t === "(") {
      this.next();
      args = [this.parseExpr()];
      while (this.peek().t === ",") {
        this.next();
        args.push(this.parseExpr());
      }
      this.expect(")", `falta cerrar el paréntesis de ${name}(…)`);
    } else {
      // Sin paréntesis: toma factores hasta un operador explícito u otra función.
      let a = this.parsePower();
      while (this.startsFactor(this.peek(), false)) a = { k: "bin", op: "*", a, b: this.parsePower(), implicit: true };
      args = [a];
    }
    const call = { k: "call", f: name, args };
    return power ? { k: "bin", op: "^", a: call, b: power } : call;
  }
}

export function parseExpr(src) {
  const text = normalize(src).trim();
  if (!text) throw new ExprError("expresión vacía");
  const p = new Parser(tokenize(text));
  const ast = p.parseExpr();
  if (p.peek().t !== "end") throw new ExprError(`no entiendo «${text}» (¿falta un operador?)`);
  return ast;
}

// ---------- evaluación ----------

// Potencia con raíces reales de negativos para exponentes p/q con q impar
// (x^(1/3) de un negativo da la raíz cúbica real, no NaN).
function powFn(expConst) {
  if (expConst !== undefined && !Number.isInteger(expConst)) {
    for (const q of [3, 5, 7, 9]) {
      const p = Math.round(expConst * q);
      if (Math.abs(p - expConst * q) < 1e-9) {
        const odd = Math.abs(p) % 2 === 1;
        return (b) => (b >= 0 ? Math.pow(b, expConst) : (odd ? -1 : 1) * Math.pow(-b, expConst));
      }
    }
  }
  return null;
}

function constValue(node) {
  if (node.k === "num" || node.k === "const") return node.v;
  if (node.k === "neg") {
    const v = constValue(node.a);
    return v === undefined ? undefined : -v;
  }
  if (node.k === "bin") {
    const a = constValue(node.a);
    const b = constValue(node.b);
    if (a === undefined || b === undefined) return undefined;
    return { "+": a + b, "-": a - b, "*": a * b, "/": a / b, "^": Math.pow(a, b) }[node.op];
  }
  return undefined;
}

export function compile(node) {
  switch (node.k) {
    case "num":
    case "const": {
      const v = node.v;
      return () => v;
    }
    case "var": {
      const n = node.n;
      return (s) => s[n];
    }
    case "neg": {
      const a = compile(node.a);
      return (s) => -a(s);
    }
    case "abs": {
      const a = compile(node.a);
      return (s) => Math.abs(a(s));
    }
    case "bin": {
      const a = compile(node.a);
      const b = compile(node.b);
      switch (node.op) {
        case "+":
          return (s) => a(s) + b(s);
        case "-":
          return (s) => a(s) - b(s);
        case "*":
          return (s) => a(s) * b(s);
        case "/":
          return (s) => a(s) / b(s);
        case "^": {
          const e = constValue(node.b);
          const special = powFn(e);
          if (special) return (s) => special(a(s));
          if (e === 2) return (s) => {
            const v = a(s);
            return v * v;
          };
          return (s) => Math.pow(a(s), b(s));
        }
      }
      break;
    }
    case "call": {
      const args = node.args.map(compile);
      if (node.f === "sqrt" || node.f === "raiz") {
        if (args.length === 2) {
          const [x, n] = args;
          return (s) => {
            const v = x(s);
            const k = n(s);
            return v < 0 && Math.round(k) % 2 === 1 ? -Math.pow(-v, 1 / k) : Math.pow(v, 1 / k);
          };
        }
        const x = args[0];
        return (s) => Math.sqrt(x(s));
      }
      const fn = FUNCS[node.f][0];
      if (args.length === 1) {
        const x = args[0];
        return (s) => fn(x(s));
      }
      if (args.length === 2) {
        const [x, y] = args;
        return (s) => fn(x(s), y(s));
      }
      return (s) => fn(...args.map((f) => f(s)));
    }
  }
  throw new ExprError("expresión inválida");
}

// varsOf devuelve las variables que usa la expresión (nombres internos).
export function varsOf(node, out = new Set()) {
  if (node.k === "var") out.add(node.n);
  if (node.a) varsOf(node.a, out);
  if (node.b) varsOf(node.b, out);
  if (node.args) node.args.forEach((a) => varsOf(a, out));
  return out;
}

// ---------- LaTeX ----------

const fmtNum = (v) => (Number.isInteger(v) ? String(v) : String(Number(v.toPrecision(6))));
const PREC = { "+": 1, "-": 1, "*": 2, "/": 2, neg: 2, "^": 3 };
const prec = (n) => (n.k === "bin" ? PREC[n.op] : n.k === "neg" ? 2 : 4);
const paren = (s) => `\\left(${s}\\right)`;

export function toTeX(node, min = 0) {
  const s = texOf(node);
  return prec(node) < min ? paren(s) : s;
}

function startsWithNumber(node) {
  if (node.k === "num" || node.k === "neg") return true;
  if (node.k === "bin" && node.op !== "/") return startsWithNumber(node.a);
  return false;
}

function texOf(n) {
  switch (n.k) {
    case "num":
      return fmtNum(n.v);
    case "var":
      return VAR_TEX[n.n] || n.n;
    case "const":
      return n.n === "e" ? "e" : "\\pi";
    case "neg":
      return "-" + toTeX(n.a, 2);
    case "abs":
      return `\\left|${toTeX(n.a)}\\right|`;
    case "bin":
      switch (n.op) {
        case "+":
          if (n.b.k === "neg") return `${toTeX(n.a, 1)} - ${toTeX(n.b.a, 2)}`;
          return `${toTeX(n.a, 1)} + ${toTeX(n.b, 1)}`;
        case "-":
          return `${toTeX(n.a, 1)} - ${toTeX(n.b, 2)}`;
        case "*": {
          const dot = startsWithNumber(n.b) || (n.a.k === "num" && n.b.k === "num");
          return `${toTeX(n.a, 2)}${dot ? " \\cdot " : " "}${toTeX(n.b, 2)}`;
        }
        case "/":
          return `\\frac{${toTeX(n.a)}}{${toTeX(n.b)}}`;
        case "^": {
          const base = n.a.k === "call" && !["sqrt", "raiz", "abs"].includes(n.a.f) ? paren(toTeX(n.a)) : toTeX(n.a, 4);
          return `${base}^{${toTeX(n.b)}}`;
        }
      }
      break;
    case "call": {
      const [a, b] = n.args.map((x) => toTeX(x));
      const tex = FUNCS[n.f][1];
      if (tex === "sqrt") return b ? `\\sqrt[${b}]{${a}}` : `\\sqrt{${a}}`;
      if (tex === "cbrt") return `\\sqrt[3]{${a}}`;
      if (tex === "exp") return `e^{${a}}`;
      if (tex === "abs") return `\\left|${a}\\right|`;
      if (tex === "floor") return `\\left\\lfloor ${a}\\right\\rfloor`;
      if (tex === "ceil") return `\\left\\lceil ${a}\\right\\rceil`;
      return `${tex}${paren(n.args.map((x) => toTeX(x)).join(", "))}`;
    }
  }
  return "";
}

// ---------- utilidades para las líneas de los gráficos ----------

// splitTop corta en el separador sep solo a nivel 0 (fuera de paréntesis,
// corchetes, |…| y comillas).
export function splitTop(src, sep) {
  const out = [];
  let depth = 0;
  let abs = false;
  let quote = false;
  let cur = "";
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (c === '"') quote = !quote;
    else if (!quote) {
      if ("([{".includes(c)) depth++;
      else if (")]}".includes(c)) depth--;
      else if (c === "|" && depth === 0) abs = !abs;
      else if (c === sep && depth === 0 && !abs) {
        out.push(cur);
        cur = "";
        continue;
      }
    }
    cur += c;
  }
  out.push(cur);
  return out;
}

const REL_RE = /^(<=|>=|!=|==|≤|≥|≠|<|>|=)/;
const REL_NORM = { "≤": "<=", "≥": ">=", "≠": "!=", "==": "=" };

// splitRelations("0 <= y <= x^2") → { parts: ["0", "y", "x^2"], ops: ["<=", "<="] }
export function splitRelations(src) {
  const parts = [];
  const ops = [];
  let depth = 0;
  let cur = "";
  for (let i = 0; i < src.length; ) {
    const c = src[i];
    if ("([{".includes(c)) depth++;
    else if (")]}".includes(c)) depth--;
    const m = depth === 0 && src.slice(i).match(REL_RE);
    if (m) {
      parts.push(cur.trim());
      ops.push(REL_NORM[m[1]] || m[1]);
      cur = "";
      i += m[1].length;
      continue;
    }
    cur += c;
    i++;
  }
  parts.push(cur.trim());
  return { parts, ops };
}

// evalConst evalúa una expresión sin variables ("2pi", "-1/2").
export function evalConst(src) {
  const ast = parseExpr(src);
  if (varsOf(ast).size) throw new ExprError(`«${src}» debería ser un número`);
  return compile(ast)({});
}
