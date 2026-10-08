// Circuitos: lectura del bloque ```circuito y resolución por nudos.
//
//   ```circuito
//   bateria (0,0) (4,0) ; 14        el + va del lado del segundo punto
//   R (4,0) (4,2) ; 4               resistencia (Ω); "etiqueta" opcional
//   cable (4,2) (4,4) (0,4)         uno o más tramos
//   nodo (0,2) ; "a"
//   corriente (0,2.5) (0,3.5) ; "$I_3$"   flecha: posición y sentido propuesto
//   malla (2, 1) ; horaria ; "$I$"
//   ```
//
// Otros: capacitor, amperimetro, voltimetro, interruptor (abierto/cerrado),
// tierra (x,y), etiqueta (x,y) "texto". Coordenadas en una grilla, y hacia
// arriba. Ajustes: titulo, animar (si/no), flujo (convencional/electrones).
//
// Si todas las resistencias y baterías tienen valor, solveCircuit calcula la
// corriente de cada tramo (análisis nodal con las leyes de Kirchhoff).
import { splitTop, evalConst, ExprError } from "./mathexpr.js";

const KINDS = {
  r: "R", resistencia: "R", resistor: "R",
  bateria: "bat", batería: "bat", pila: "bat", fem: "bat", fuente: "bat",
  capacitor: "cap", condensador: "cap",
  cable: "wire", conductor: "wire",
  amperimetro: "amm", amperímetro: "amm", voltimetro: "volt", voltímetro: "volt",
  interruptor: "sw", llave: "sw",
  tierra: "ground", nodo: "node", etiqueta: "text", texto: "text",
  corriente: "current", malla: "mesh",
};
const TWO_POINTS = new Set(["R", "bat", "cap", "amm", "volt", "sw", "current"]);
const SIDES = { arriba: "up", abajo: "down", izquierda: "left", derecha: "right" };
const SETTINGS = new Set(["titulo", "título", "animar", "flujo", "alto"]);

const key = (p) => `${+p[0].toFixed(6)},${+p[1].toFixed(6)}`;

// "6", "6Ω", "6 ohm", "4,7k", "10V" → número
function parseValue(s) {
  const m = s
    .trim()
    .replace(",", ".")
    .match(/^([+-]?\d*\.?\d+)\s*(k|m|µ|u)?\s*(Ω|ohm|ohms|v|volt|volts|a|f)?$/i);
  if (!m) return null;
  const mult = { k: 1e3, m: 1e-3, µ: 1e-6, u: 1e-6 }[m[2]] || 1;
  return parseFloat(m[1]) * mult;
}

// Número con coma decimal y 3 cifras significativas, para mostrar.
export const fmtNum = (v) => {
  const r = Number(v.toPrecision(3));
  return String(Math.abs(r) < 1e-9 ? 0 : r).replace(".", "{,}");
};

export function parseCircuit(src) {
  const opts = { animar: true, flujo: "convencional" };
  const items = [];
  const errors = [];
  String(src)
    .split("\n")
    .forEach((raw, i) => {
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
        if (set && SETTINGS.has(set[1].toLowerCase())) {
          const k = set[1].toLowerCase();
          const v = set[2].trim();
          if (k === "animar") opts.animar = !/^(no|false|0)$/i.test(v);
          else if (k === "flujo") opts.flujo = /electr/i.test(v) ? "electrones" : "convencional";
          else if (k === "alto") opts.alto = Math.max(120, Math.min(900, evalConst(v)));
          else opts.titulo = v;
          return;
        }
        items.push(parseItem(line, i + 1));
      } catch (e) {
        errors.push({ line: i + 1, msg: e instanceof ExprError ? e.message : String(e.message || e) });
      }
    });
  return { opts, items, errors };
}

function parseItem(line, lineNo) {
  const [head, ...rest] = splitTop(line, ";");
  const m = head.trim().match(/^(\p{L}+)\s*(.*)$/u);
  if (!m) throw new ExprError(`no entiendo «${head.trim()}»`);
  const kind = KINDS[m[1].toLowerCase()];
  if (!kind) throw new ExprError(`no conozco «${m[1]}» (R, bateria, cable, nodo, corriente, malla…)`);
  // Puntos (fuera de las comillas) y texto entre comillas en el mismo renglón.
  const body = m[2];
  const quoted = body.match(/"([^"]*)"/)?.[1];
  const pts = (body.replace(/"[^"]*"/g, "").match(/\([^()]*\)/g) || []).map((t) => {
    const c = splitTop(t.slice(1, -1), ",").map((s) => evalConst(s));
    if (c.length !== 2) throw new ExprError(`un punto es (x, y): «${t}»`);
    return c;
  });
  const item = { kind, line: lineNo, pts, label: quoted ?? null, side: null };
  for (const raw of rest) {
    const o = raw.trim();
    if (!o) continue;
    let q;
    if ((q = o.match(/^"(.*)"$/s))) item.label = q[1];
    else if ((q = o.match(/^r\s*=\s*(.+)$/i)) && kind === "bat") {
      item.r = parseValue(q[1]);
      if (item.r === null) throw new ExprError(`resistencia interna mal escrita: «${o}»`);
    } else if (SIDES[o.toLowerCase()]) item.side = SIDES[o.toLowerCase()];
    else if (/^(horaria|antihoraria)$/i.test(o)) item.cw = o.toLowerCase() === "horaria";
    else if (/^(abierto|abierta|cerrado|cerrada)$/i.test(o)) item.closed = /^cerrad/i.test(o);
    else if (parseValue(o) !== null) item.value = parseValue(o);
    else throw new ExprError(`no conozco la opción «${o}»`);
  }
  if (TWO_POINTS.has(kind) && pts.length !== 2) throw new ExprError(`${m[1]} va entre dos puntos: (x1, y1) (x2, y2)`);
  if (kind === "wire" && pts.length < 2) throw new ExprError("un cable une al menos dos puntos");
  if (["ground", "node", "text", "mesh"].includes(kind) && pts.length !== 1) throw new ExprError(`${m[1]} lleva un punto: (x, y)`);
  if (kind === "text" && item.label === null) throw new ExprError('etiqueta (x, y) "texto"');
  if (kind === "mesh" && item.cw === undefined) item.cw = true;
  if (kind === "sw" && item.closed === undefined) item.closed = false;
  // Etiquetas automáticas con el valor.
  if (item.label === null && item.value !== undefined) {
    if (kind === "R") item.label = `$${fmtNum(item.value)}\\,\\Omega$`;
    if (kind === "bat") item.label = `$${fmtNum(item.value)}\\,\\text{V}$` + (item.r ? `, $r = ${fmtNum(item.r)}\\,\\Omega$` : "");
  }
  return item;
}

// ---------- topología y resolución ----------

// Tramos eléctricos: cada componente de dos puntos y cada tramo de cable,
// partido donde otro elemento se le conecta en el medio.
export function segments(spec) {
  const segs = [];
  for (const it of spec.items) {
    if (it.kind === "wire") for (let k = 0; k + 1 < it.pts.length; k++) segs.push({ item: it, a: it.pts[k], b: it.pts[k + 1] });
    else if (["R", "bat", "cap", "amm", "volt", "sw"].includes(it.kind)) segs.push({ item: it, a: it.pts[0], b: it.pts[1] });
  }
  const terminals = new Map();
  for (const s of segs) for (const p of [s.a, s.b]) terminals.set(key(p), p);
  for (const it of spec.items) if (it.kind === "node" || it.kind === "ground") terminals.set(key(it.pts[0]), it.pts[0]);
  const out = [];
  for (const s of segs) {
    if (s.item.kind !== "wire") {
      out.push(s);
      continue;
    }
    const cuts = [...terminals.values()].filter((p) => onSegment(p, s.a, s.b, true));
    cuts.sort((p, q) => dist(p, s.a) - dist(q, s.a));
    let prev = s.a;
    for (const c of [...cuts, s.b]) {
      if (dist(prev, c) > 1e-9) out.push({ item: s.item, a: prev, b: c });
      prev = c;
    }
  }
  return out;
}

const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
// ¿p está sobre el segmento ab? (estricto: sin contar los extremos)
export function onSegment(p, a, b, strict = false) {
  const L = dist(a, b);
  if (L < 1e-12) return false;
  const cross = ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / L;
  if (Math.abs(cross) > 1e-6) return false;
  const t = ((p[0] - a[0]) * (b[0] - a[0]) + (p[1] - a[1]) * (b[1] - a[1])) / (L * L);
  return strict ? t > 1e-9 && t < 1 - 1e-9 : t >= -1e-9 && t <= 1 + 1e-9;
}

// solveCircuit → corriente de cada tramo (de a hacia b), o null si faltan
// valores o el circuito no tiene solución única. Análisis nodal modificado:
// incógnitas = potencial de cada nudo + corriente de cada fuente o cable.
export function solveCircuit(spec, segs = segments(spec)) {
  const conductive = segs.filter((s) => {
    const k = s.item.kind;
    return k === "wire" || k === "R" || k === "bat" || k === "amm" || (k === "sw" && s.item.closed);
  });
  if (!conductive.some((s) => s.item.kind === "bat")) return null;
  if (conductive.some((s) => (s.item.kind === "R" || s.item.kind === "bat") && !(s.item.value >= 0))) return null;
  if (conductive.some((s) => s.item.kind === "R" && s.item.value === 0)) return null;

  // Nudos
  const ids = new Map();
  const node = (p) => {
    const k = key(p);
    if (!ids.has(k)) ids.set(k, ids.size);
    return ids.get(k);
  };
  // Una batería con resistencia interna es fuente + resistencia en serie (nudo interno).
  const elems = [];
  for (const s of conductive) {
    const a = node(s.a);
    const b = node(s.b);
    if (s.item.kind === "R") elems.push({ seg: s, type: "R", a, b, R: s.item.value });
    else if (s.item.kind === "bat" && s.item.r > 0) {
      const mid = ids.size;
      ids.set(`interno${mid}`, mid);
      elems.push({ seg: s, type: "V", a, b: mid, E: s.item.value });
      elems.push({ seg: null, type: "R", a: mid, b, R: s.item.r });
    } else elems.push({ seg: s, type: "V", a, b, E: s.item.kind === "bat" ? s.item.value : 0 });
  }
  const n = ids.size;
  // Un nudo de referencia (potencial 0) por cada parte conectada.
  const parent = [...Array(n).keys()];
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  for (const e of elems) parent[find(e.a)] = find(e.b);
  const grounds = spec.items.filter((it) => it.kind === "ground").map((it) => ids.get(key(it.pts[0]))).filter((x) => x !== undefined);
  const refOf = new Map();
  for (const g of grounds) if (!refOf.has(find(g))) refOf.set(find(g), g);
  for (let v = 0; v < n; v++) if (!refOf.has(find(v))) refOf.set(find(v), v);
  const refs = new Set(refOf.values());

  const vIndex = new Map();
  for (let v = 0; v < n; v++) if (!refs.has(v)) vIndex.set(v, vIndex.size);
  const sources = elems.filter((e) => e.type === "V");
  const N = vIndex.size + sources.length;
  const A = Array.from({ length: N }, () => new Float64Array(N));
  const z = new Float64Array(N);
  const vi = (v) => vIndex.get(v);
  for (const e of elems) {
    if (e.type !== "R") continue;
    const g = 1 / e.R;
    const [i, j] = [vi(e.a), vi(e.b)];
    if (i !== undefined) A[i][i] += g;
    if (j !== undefined) A[j][j] += g;
    if (i !== undefined && j !== undefined) {
      A[i][j] -= g;
      A[j][i] -= g;
    }
  }
  sources.forEach((e, k) => {
    const row = vIndex.size + k;
    const [i, j] = [vi(e.a), vi(e.b)];
    // La corriente de la fuente va de a a b por adentro: sale de a, entra en b.
    if (i !== undefined) {
      A[i][row] += 1;
      A[row][i] -= 1;
    }
    if (j !== undefined) {
      A[j][row] -= 1;
      A[row][j] += 1;
    }
    z[row] = e.E; // V(b) − V(a) = E (el + está en b)
  });
  const x = gauss(A, z);
  if (!x) return null;
  const V = (v) => (refs.has(v) ? 0 : x[vi(v)]);
  const current = new Map();
  for (const e of elems) {
    if (!e.seg) continue;
    const I = e.type === "R" ? (V(e.a) - V(e.b)) / e.R : x[vIndex.size + sources.indexOf(e)];
    current.set(e.seg, Math.abs(I) < 1e-9 ? 0 : I);
  }
  return current;
}

// Eliminación gaussiana con pivoteo parcial (null si es singular).
function gauss(A, b) {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (Math.abs(M[p][c]) < 1e-10) return null;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = M[r][c] / M[c][c];
      if (!f) continue;
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((row, i) => row[n] / row[i]);
}

// ---------- ramas y flechas de corriente ----------

// Ramas: cadenas de tramos unidas por puntos donde solo se tocan dos tramos.
export function branches(segs) {
  const at = new Map();
  for (const s of segs) for (const p of [s.a, s.b]) {
    const k = key(p);
    if (!at.has(k)) at.set(k, []);
    at.get(k).push(s);
  }
  const seen = new Set();
  const out = [];
  for (const s of segs) {
    if (seen.has(s)) continue;
    const chain = [s];
    seen.add(s);
    for (const dir of ["a", "b"]) {
      let cur = s;
      let p = s[dir];
      for (;;) {
        const list = at.get(key(p));
        if (list.length !== 2) break;
        const nx = list[0] === cur ? list[1] : list[0];
        if (seen.has(nx)) break;
        seen.add(nx);
        dir === "a" ? chain.unshift(nx) : chain.push(nx);
        p = key(nx.a) === key(p) ? nx.b : nx.a;
        cur = nx;
      }
    }
    out.push(chain);
  }
  return out;
}

// La flecha de corriente (p → q) cae sobre un tramo; devuelve el tramo y si
// el sentido propuesto coincide con a → b.
export function arrowSegment(arrow, segs) {
  const [p, q] = arrow.pts;
  const mid = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const seg = segs.find((s) => onSegment(mid, s.a, s.b));
  if (!seg) return null;
  const dot = (q[0] - p[0]) * (seg.b[0] - seg.a[0]) + (q[1] - p[1]) * (seg.b[1] - seg.a[1]);
  return { seg, sameDir: dot >= 0 };
}

// Corriente de cada tramo para animar: la calculada o, si no se puede
// calcular, el sentido de las flechas (propagado a toda su rama, con la misma
// intensidad). Devuelve { flow: Map(tramo → corriente a→b), solved }.
export function circuitFlow(spec, segs = segments(spec)) {
  const solved = solveCircuit(spec, segs);
  if (solved) return { flow: solved, solved: true };
  const flow = new Map();
  const chains = branches(segs);
  for (const arrow of spec.items.filter((it) => it.kind === "current")) {
    const hit = arrowSegment(arrow, segs);
    if (!hit) continue;
    const chain = chains.find((c) => c.includes(hit.seg));
    orientChain(chain, chain.indexOf(hit.seg), hit.sameDir ? 1 : -1, flow);
  }
  return { flow, solved: false };
}

// Orienta toda la rama a partir del tramo idx (con signo dado): cada tramo
// vecino recibe el signo que mantiene el sentido de circulación.
function orientChain(chain, idx, sign, flow) {
  flow.set(chain[idx], sign);
  // Hacia adelante
  for (let i = idx; i + 1 < chain.length; i++) {
    const cur = chain[i];
    const s = flow.get(cur);
    const exit = s > 0 ? cur.b : cur.a;
    const nxt = chain[i + 1];
    flow.set(nxt, key(nxt.a) === key(exit) ? 1 : -1);
  }
  // Hacia atrás
  for (let i = idx; i - 1 >= 0; i--) {
    const cur = chain[i];
    const s = flow.get(cur);
    const enter = s > 0 ? cur.a : cur.b;
    const prv = chain[i - 1];
    flow.set(prv, key(prv.b) === key(enter) ? 1 : -1);
  }
}

// Todas las fórmulas que puede mostrar el circuito (para el HTML descargado).
export function circuitLabels(spec) {
  const out = [];
  for (const it of spec.items) if (it.label) out.push(it.label);
  const segs = segments(spec);
  const solved = solveCircuit(spec, segs);
  if (solved) for (const t of currentTexts(spec, segs, solved)) out.push(t.text);
  return out;
}

// Textos de "mostrar corrientes": I = valor junto a cada flecha (con signo
// respecto del sentido propuesto) y el valor en las ramas sin flecha.
export function currentTexts(spec, segs, solved) {
  const out = [];
  const chains = branches(segs);
  const done = new Set();
  for (const arrow of spec.items.filter((it) => it.kind === "current")) {
    const hit = arrowSegment(arrow, segs);
    if (!hit) continue;
    const I = solved.get(hit.seg) * (hit.sameDir ? 1 : -1);
    const name = arrow.label ? arrow.label.replace(/^\$|\$$/g, "") : "I";
    out.push({ at: arrow, seg: hit.seg, text: `$${name} = ${fmtNum(I)}\\,\\text{A}$` });
    done.add(chains.find((c) => c.includes(hit.seg)));
  }
  for (const chain of chains) {
    if (done.has(chain)) continue;
    const seg = chain.find((s) => s.item.kind !== "wire") || chain[Math.floor(chain.length / 2)];
    const I = solved.get(seg);
    if (I === undefined) continue;
    out.push({ at: null, seg, text: `$${fmtNum(Math.abs(I))}\\,\\text{A}$` });
  }
  return out;
}
