// Lenguaje de los gráficos: cada renglón es un objeto matemático escrito
// como en el apunte, y su tipo se deduce de la forma.
//
//   ```grafico                         ```grafico3d
//   x: -3..3                           z = 4 - x^2 - y^2 ; sobre x^2 + y^2 <= 4
//   y = 5 - x^2 ; rojo                 0 <= z <= 2x + 2, x^2 + y^2 <= 9, x >= 0, y >= 0
//   x^2 <= y <= sqrt(x) ; "$D$"        (cos(t), sin(t), t/4) ; t: 0..4pi
//   (1, 1) ; "$P$"                     ```
//   ```
//
// Renglones "clave: valor" son ajustes (rangos x/y/z/t/u/v/θ, titulo, vista,
// aspecto, alto, ejes, grilla, leyenda, caja, piso, marcas). Después de ";"
// van opciones: "etiqueta", color, estilo, sobre …, corte x = c, prismas NxM,
// rangos propios (t: a..b). # o // empiezan un comentario.
//
// parseSpec(texto, 2|3) → { dim, opts, items, errors }. Las funciones de los
// ítems reciben un scope { x, y, z, t, u, v, r, th }.
import { parseExpr, compile, varsOf, toTeX, splitTop, splitRelations, evalConst, ExprError } from "./mathexpr.js";

export const COLOR_WORDS = {
  verde: 0, rojo: 1, roja: 1, azul: 2, cian: 2, celeste: 2, ambar: 3, ámbar: 3, naranja: 3, amarillo: 3,
  violeta: 4, lila: 4, rosa: 5, gris: 6,
};
const STYLE_WORDS = {
  punteada: "dashed", punteado: "dashed", discontinua: "dashed", guiones: "dashed",
  gruesa: "thick", grueso: "thick", fina: "thin", fino: "thin",
  rayado: "hatch", rayada: "hatch", sombra: "shadow", malla: "mesh", opaca: "opaque", opaco: "opaque",
  transparente: "glass", flecha: "arrow", relleno: "fill", rellena: "fill", "sin-malla": "nomesh",
};
const RANGE_KEYS = { x: "x", y: "y", z: "z", t: "t", u: "u", v: "v", θ: "th", theta: "th", tita: "th" };
const SETTINGS = new Set(["titulo", "título", "vista", "aspecto", "alto", "ejes", "grilla", "leyenda", "caja", "piso", "marcas", "lineas", "animar", ...Object.keys(RANGE_KEYS)]);
const YES = (s) => !/^(no|false|0|off|ocultar?)$/i.test(s.trim());

const fn = (src) => {
  const ast = parseExpr(src);
  return { ast, f: compile(ast), vars: varsOf(ast), tex: toTeX(ast) };
};

function parseRange(src) {
  const s = src.trim().replace(/^\[|\]$/g, "");
  const parts = s.includes("..") ? s.split("..") : splitTop(s, ",");
  if (parts.length !== 2) throw new ExprError(`rango mal escrito: «${src}» (ejemplo: -2..2)`);
  const [a, b] = parts.map((p) => evalConst(p));
  if (!(b > a)) throw new ExprError(`el rango «${src}» tiene que ir de menor a mayor`);
  return [a, b];
}

function parseTuple(src) {
  const s = src.trim();
  if (!s.startsWith("(") || !s.endsWith(")")) throw new ExprError(`se esperaba un punto (a, b) y llegó «${s}»`);
  return splitTop(s.slice(1, -1), ",").map((p) => p.trim());
}
const tuples = (src) => (src.match(/\([^()]*(?:\([^()]*\)[^()]*)*\)/g) || []);

// condition("x^2 + y^2 <= 9") → funciones s(scope) ≥ 0 dentro de la región.
function conditions(src) {
  const out = [];
  for (const part of splitTop(src, ",")) {
    if (!part.trim()) continue;
    const { parts, ops } = splitRelations(part);
    if (!ops.length) throw new ExprError(`«${part.trim()}» no es una desigualdad`);
    for (let i = 0; i < ops.length; i++) {
      const op = ops[i];
      if (op === "=" || op === "!=") throw new ExprError(`en una región van desigualdades, no «${op}»`);
      out.push({ lhs: parts[i], rhs: parts[i + 1], op });
    }
  }
  return out;
}
// s ≥ 0 adentro: a <= b → b - a; a >= b → a - b.
function condFn(c) {
  const a = fn(c.lhs);
  const b = fn(c.rhs);
  const less = c.op === "<" || c.op === "<=";
  const f = less ? (s) => b.f(s) - a.f(s) : (s) => a.f(s) - b.f(s);
  return { f, vars: new Set([...a.vars, ...b.vars]) };
}

const BARE = /^\s*([xyz])\s*$/;

// solidOf busca la variable w con cota inferior y superior que no dependen
// de w; el resto de las condiciones son la región D de la base.
function solidOf(conds) {
  for (const w of ["z", "y", "x"]) {
    const lo = [];
    const hi = [];
    const rest = [];
    for (const c of conds) {
      const L = c.lhs.match(BARE)?.[1];
      const R = c.rhs.match(BARE)?.[1];
      const less = c.op === "<" || c.op === "<=";
      if (L === w && !fn(c.rhs).vars.has(w)) (less ? hi : lo).push(fn(c.rhs));
      else if (R === w && !fn(c.lhs).vars.has(w)) (less ? lo : hi).push(fn(c.lhs));
      else rest.push(c);
    }
    if (lo.length && hi.length) {
      const D = rest.map(condFn);
      if (D.some((d) => d.vars.has(w))) throw new ExprError(`la región de la base no puede depender de ${w}`);
      const comb = (arr, pick) => (arr.length === 1 ? arr[0].f : (s) => pick(...arr.map((g) => g.f(s))));
      return { w, lo: comb(lo, Math.max), hi: comb(hi, Math.min), D: D.map((d) => d.f) };
    }
  }
  return null;
}

const BASES = { z: ["x", "y"], y: ["x", "z"], x: ["y", "z"] };

function parseOptions(parts, item, opts) {
  item.style = new Set();
  for (const raw of parts) {
    const o = raw.trim();
    if (!o) continue;
    let m;
    if ((m = o.match(/^"(.*)"$/s))) item.label = m[1] || null;
    else if ((m = o.match(/^sobre\s+(.+)$/is))) item.on = conditions(m[1]).map((c) => condFn(c).f);
    else if ((m = o.match(/^corte\s+([xyz])\s*=\s*(.+)$/i))) (item.cuts ||= []).push({ axis: m[1], c: evalConst(m[2]) });
    else if ((m = o.match(/^prismas\s+(\d+)(?:\s*[x×]\s*(\d+))?$/i))) item.prisms = [+m[1], +(m[2] || m[1])];
    else if ((m = o.match(/^(\p{L}+)\s*:\s*(.+)$/u)) && RANGE_KEYS[m[1]]) (item.ranges ||= {})[RANGE_KEYS[m[1]]] = parseRange(m[2]);
    // Valor de una carga o de una placa: +2, -1, + o −.
    else if ((m = o.match(/^([+\-−])\s*(\d*[.,]?\d*)$/)) || /^\d+([.,]\d+)?$/.test(o)) {
      const sign = m && m[1] !== "+" ? -1 : 1;
      const num = m ? m[2] : o;
      item.q = sign * (num ? parseFloat(num.replace(",", ".")) : 1);
    } else {
      for (const w of o.toLowerCase().split(/\s+/)) {
        if (w in COLOR_WORDS) {
          item.color = COLOR_WORDS[w];
          item.colorSet = true;
        }
        else if (w in STYLE_WORDS) item.style.add(STYLE_WORDS[w]);
        else throw new ExprError(`no conozco la opción «${w}»`);
      }
    }
  }
  return item;
}

// ---------- objetos ----------

function parseObject2D(src, item) {
  // campo (Ex, Ey): un campo vectorial dado por fórmulas (en x e y).
  const field = src.match(/^campo\s*(\(.*\))\s*$/i);
  if (field) {
    const comps = parseTuple(field[1]);
    if (comps.length !== 2) throw new ExprError("campo (Ex, Ey): dos componentes");
    const fs = comps.map(fn);
    if (fs.some((f) => [...f.vars].some((v) => v !== "x" && v !== "y"))) throw new ExprError("un campo usa x e y");
    return Object.assign(item, { kind: "field", fx: fs[0].f, fy: fs[1].f });
  }
  const kw = src.match(/^(punto|texto|segmento|vector|flecha|pol[ií]gono|carga|placa)\b\s*(.*)$/i);
  if (kw) return keywordObject(kw[1].toLowerCase(), kw[2], item, 2);
  if (src.startsWith("(")) {
    const comps = parseTuple(src);
    if (comps.length !== 2) throw new ExprError("en 2D los puntos tienen 2 coordenadas");
    const fs = comps.map(fn);
    const vars = new Set(fs.flatMap((f) => [...f.vars]));
    if (!vars.size) return Object.assign(item, { kind: "point", p: fs.map((f) => f.f({})) });
    if ([...vars].some((v) => v !== "t")) throw new ExprError("una curva paramétrica usa solo t");
    return Object.assign(item, { kind: "param", fx: fs[0].f, fy: fs[1].f, auto: `(${fs[0].tex},\\ ${fs[1].tex})` });
  }
  const { parts, ops } = splitRelations(src);
  if (!ops.length) throw new ExprError(`no entiendo «${src}»: ¿falta un = o una desigualdad?`);
  if (ops.length === 1 && ops[0] === "=") {
    const [L, R] = parts;
    const rhs = fn(R);
    const bare = L.trim();
    if (bare === "y" && !rhs.vars.has("y") && [...rhs.vars].every((v) => v === "x"))
      return Object.assign(item, { kind: "fx", f: rhs.f, auto: `y = ${rhs.tex}` });
    if (bare === "x" && !rhs.vars.has("x") && [...rhs.vars].every((v) => v === "y"))
      return Object.assign(item, { kind: "fy", f: rhs.f, auto: `x = ${rhs.tex}` });
    if (bare === "r" && [...rhs.vars].every((v) => v === "th" || v === "t"))
      return Object.assign(item, { kind: "polar", f: rhs.f, auto: `r = ${rhs.tex}` });
    const lhs = fn(L);
    const vars = new Set([...lhs.vars, ...rhs.vars]);
    if ([...vars].some((v) => !["x", "y"].includes(v))) throw new ExprError("una curva implícita usa x e y");
    return Object.assign(item, { kind: "implicit", F: (s) => lhs.f(s) - rhs.f(s), auto: `${lhs.tex} = ${rhs.tex}` });
  }
  const conds = conditions(src).map(condFn);
  const vars = new Set(conds.flatMap((c) => [...c.vars]));
  if ([...vars].some((v) => !["x", "y", "r", "th"].includes(v))) throw new ExprError("una región en 2D usa x, y (o r, θ)");
  return Object.assign(item, { kind: "region", conds: conds.map((c) => c.f), polar: vars.has("r") || vars.has("th") });
}

function parseObject3D(src, item) {
  const kw = src.match(/^(punto|texto|segmento|vector|flecha|pol[ií]gono)\b\s*(.*)$/i);
  if (kw) return keywordObject(kw[1].toLowerCase(), kw[2], item, 3);
  if (src.startsWith("(")) {
    const comps = parseTuple(src);
    if (comps.length !== 3) throw new ExprError("en 3D los puntos tienen 3 coordenadas");
    const fs = comps.map(fn);
    const vars = new Set(fs.flatMap((f) => [...f.vars]));
    if (!vars.size) return Object.assign(item, { kind: "point", p: fs.map((f) => f.f({})) });
    if ([...vars].every((v) => v === "t")) return Object.assign(item, { kind: "curve", fx: fs[0].f, fy: fs[1].f, fz: fs[2].f });
    if ([...vars].every((v) => v === "u" || v === "v")) return Object.assign(item, { kind: "psurf", fx: fs[0].f, fy: fs[1].f, fz: fs[2].f });
    throw new ExprError("una curva usa t; una superficie paramétrica usa u y v");
  }
  const { parts, ops } = splitRelations(src);
  if (!ops.length) throw new ExprError(`no entiendo «${src}»: ¿falta un = o una desigualdad?`);
  if (ops.length === 1 && ops[0] === "=") {
    const [L, R] = parts;
    const w = L.match(BARE)?.[1];
    const rhs = fn(R);
    if (w && [...rhs.vars].every((v) => BASES[w].includes(v)))
      return Object.assign(item, { kind: "graph", w, base: BASES[w], f: rhs.f, auto: `${w} = ${rhs.tex}` });
    const lhs = fn(L);
    const vars = [...new Set([...lhs.vars, ...rhs.vars])];
    if (vars.some((v) => !["x", "y", "z"].includes(v))) throw new ExprError("en 3D se usan x, y, z");
    if (vars.length === 3) throw new ExprError("superficie implícita: escribila como z = f(x, y) o en forma paramétrica (u, v)");
    const missing = ["z", "y", "x"].find((v) => !vars.includes(v));
    return Object.assign(item, { kind: "cyl", w: missing, base: BASES[missing], F: (s) => lhs.f(s) - rhs.f(s), auto: `${lhs.tex} = ${rhs.tex}` });
  }
  const conds = conditions(src);
  const solid = solidOf(conds);
  if (solid) return Object.assign(item, { kind: "solid", w: solid.w, base: BASES[solid.w], lo: solid.lo, hi: solid.hi, conds: solid.D });
  const cs = conds.map(condFn);
  const vars = [...new Set(cs.flatMap((c) => [...c.vars]))];
  if (vars.length > 2) throw new ExprError("para un sólido, una variable tiene que quedar entre dos cotas: a <= z <= b");
  const missing = ["z", "y", "x"].find((v) => !vars.includes(v));
  return Object.assign(item, { kind: "flat", w: missing, base: BASES[missing], conds: cs.map((c) => c.f) });
}

function keywordObject(kw, rest, item, dim) {
  // Las coordenadas se buscan fuera de las comillas: en texto (a, b) "$F(x)$"
  // el (x) es parte del texto, no un punto.
  const pts = tuples(rest.replace(/"[^"]*"/g, "")).map((t) => parseTuple(t).map((c) => evalConst(c)));
  if (pts.some((p) => p.length !== dim)) throw new ExprError(`en ${dim}D los puntos tienen ${dim} coordenadas`);
  if (kw === "punto") {
    if (pts.length !== 1) throw new ExprError("punto (a, b)");
    return Object.assign(item, { kind: "point", p: pts[0] });
  }
  if (kw === "texto") {
    const text = rest.match(/"(.*)"/s)?.[1];
    if (pts.length !== 1 || text === undefined) throw new ExprError('texto (a, b) "lo que dice"');
    return Object.assign(item, { kind: "text", p: pts[0], text });
  }
  if (kw === "segmento" || kw === "vector" || kw === "flecha") {
    if (pts.length !== 2) throw new ExprError(`${kw} (a, b) (c, d)`);
    if (kw !== "segmento") item.style.add("arrow");
    return Object.assign(item, { kind: "segment", a: pts[0], b: pts[1] });
  }
  // Cargas y placas: el campo eléctrico (líneas y brillo) lo calcula el gráfico.
  if (kw === "carga") {
    if (pts.length !== 1) throw new ExprError("carga (x, y) ; +1");
    if (!item.q) throw new ExprError("a la carga le falta el valor (ejemplo: carga (0, 0) ; +2)");
    return Object.assign(item, { kind: "charge", p: pts[0] });
  }
  if (kw === "placa") {
    if (pts.length !== 2) throw new ExprError("placa (x1, y1) (x2, y2) ; +");
    if (!item.q) throw new ExprError("a la placa le falta el signo (+ o −)");
    return Object.assign(item, { kind: "plate", a: pts[0], b: pts[1] });
  }
  if (pts.length < 3) throw new ExprError("un polígono necesita al menos 3 vértices");
  return Object.assign(item, { kind: "polygon", pts });
}

// ---------- spec completo ----------

export function parseSpec(src, dim) {
  const opts = { ejes: true, grilla: true, leyenda: true, caja: false, piso: true, ranges: {} };
  const items = [];
  const errors = [];
  String(src)
    .split("\n")
    .forEach((raw, i) => {
      // Comentarios: # o // fuera de comillas.
      let line = "";
      let quote = false;
      for (let k = 0; k < raw.length; k++) {
        const c = raw[k];
        if (c === '"') quote = !quote;
        if (!quote && (c === "#" || (c === "/" && raw[k + 1] === "/"))) break;
        line += c;
      }
      line = line.trim();
      if (!line) return;
      try {
        const set = line.match(/^(\p{L}+)\s*:\s*(.*)$/u);
        if (set && SETTINGS.has(set[1].toLowerCase())) return setting(opts, set[1].toLowerCase(), set[2].trim());
        const [obj, ...rest] = splitTop(line, ";");
        const item = parseOptions(rest, { line: i + 1, label: undefined, color: null }, opts);
        (dim === 3 ? parseObject3D : parseObject2D)(obj.trim(), item);
        if (item.label === undefined) item.label = item.auto && !["region", "flat", "solid", "point", "segment", "polygon"].includes(item.kind) ? `$${item.auto}$` : null;
        items.push(item);
      } catch (e) {
        errors.push({ line: i + 1, msg: e instanceof ExprError ? e.message : String(e.message || e) });
      }
    });
  // Colores: los que no eligieron uno van tomando la paleta en orden.
  const taken = new Set(items.map((it) => it.color).filter((c) => c !== null));
  const free = [0, 1, 2, 3, 4, 5].filter((c) => !taken.has(c));
  const palette = free.length ? free : [0, 1, 2, 3, 4, 5];
  let next = 0;
  for (const it of items) if (it.color === null && it.kind !== "text") it.color = palette[next++ % palette.length];
  return { dim, opts, items, errors };
}

function setting(opts, key, val) {
  if (RANGE_KEYS[key]) opts.ranges[RANGE_KEYS[key]] = parseRange(val);
  else if (key === "titulo" || key === "título") opts.titulo = val;
  else if (key === "vista") {
    const [az, el] = splitTop(val, ",").map((p) => evalConst(p));
    if (!Number.isFinite(az) || !Number.isFinite(el)) throw new ExprError("vista: giro, altura (en grados), por ejemplo vista: 30, 20");
    opts.vista = [az, el];
  } else if (key === "aspecto") opts.aspecto = val.toLowerCase();
  else if (key === "alto") opts.alto = Math.max(160, Math.min(900, evalConst(val)));
  else if (key === "marcas") opts.marcas = val.toLowerCase();
  else if (key === "lineas") opts.lineas = Math.max(2, Math.min(24, evalConst(val)));
  else if (key === "ejes" && /^\s*\p{L}+\s*,\s*\p{L}+\s*$/u.test(val) && YES(val)) {
    // ejes: u, v → ejes visibles, con esos nombres (solo en 2D).
    opts.ejes = true;
    opts.nombresEjes = splitTop(val, ",").map((p) => p.trim());
  } else opts[key] = YES(val);
}
