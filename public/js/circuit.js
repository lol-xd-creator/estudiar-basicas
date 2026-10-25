// Dibujo de circuitos en SVG: símbolos como en los apuntes (resistencia en
// zigzag, batería con placa larga + y corta −), etiquetas con fórmulas y un
// brillo que recorre los cables en el sentido de la corriente (más rápido
// donde pasa más). Los colores son variables CSS del tema.
import { segments, circuitFlow, currentTexts } from "./circuitspec.js";
import { renderLabel, toolbar, errorBox } from "./plotcommon.js";
import { typesetMath } from "./math.js";

const NS = "http://www.w3.org/2000/svg";
const MARGIN = 1.2; // en unidades de la grilla (lugar para las etiquetas de afuera)

export class CircuitView {
  constructor(fig, spec) {
    this.fig = fig;
    this.spec = spec;
    fig.classList.add("is-circuit");
    if (spec.errors.length) fig.append(errorBox(spec.errors));
    this.stage = el("div", "plot-stage circuit-stage");
    fig.append(this.stage);
    this.segs = segments(spec);
    const { flow, solved } = circuitFlow(spec, this.segs);
    this.flow = flow;
    this.solved = solved;
    this.texts = solved ? currentTexts(spec, this.segs, flow) : [];
    const tools = [];
    if (this.animated()) tools.push(["⏸", "Pausar el brillo de la corriente", () => this.togglePause()]);
    if (solved) tools.push(["I", "Mostrar las corrientes calculadas con Kirchhoff", () => this.fig.classList.toggle("show-currents")]);
    if (tools.length) this.bar = toolbar(this.stage, tools);
    this.render();
  }

  animated() {
    return this.spec.opts.animar && [...this.flow.values()].some((v) => v);
  }
  // Los colores salen de variables CSS: al cambiar el tema no hay que redibujar.
  draw() {}
  resize() {
    this.render();
  }
  togglePause() {
    const paused = this.fig.classList.toggle("is-paused");
    this.bar.firstChild.textContent = paused ? "▶" : "⏸";
    this.bar.firstChild.title = paused ? "Reanudar el brillo de la corriente" : "Pausar el brillo de la corriente";
  }

  render() {
    const pts = this.spec.items.flatMap((it) => it.pts);
    this.stage.querySelector("svg")?.remove();
    this.stage.querySelector(".plot-layer")?.remove();
    if (!pts.length) return;
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    this.box = { x0, x1, y0, y1 };
    const bw = x1 - x0 + 2 * MARGIN;
    const bh = y1 - y0 + 2 * MARGIN;
    const W = Math.max(260, this.fig.clientWidth || 640);
    const u = Math.max(26, Math.min(72, (W - 16) / bw, (this.spec.opts.alto || 440) / bh));
    this.u = u;
    const w = bw * u;
    const h = bh * u;
    this.P = (p) => [(p[0] - x0 + MARGIN) * u, (y1 - p[1] + MARGIN) * u];

    const svg = svgEl("svg", { width: w, height: h, viewBox: `0 0 ${w} ${h}`, class: "circuit-svg", role: "img" });
    this.g = {
      wires: svgEl("g", { class: "c-wires" }),
      comps: svgEl("g", { class: "c-comps" }),
      flow: svgEl("g", { class: "c-flow" }),
      marks: svgEl("g", { class: "c-marks" }),
    };
    svg.append(this.g.wires, this.g.comps, this.g.flow, this.g.marks);
    this.layer = el("div", "plot-layer circuit-layer");
    this.layer.style.width = w + "px";
    this.layer.style.height = h + "px";
    this.stage.style.height = h + "px";
    this.stage.style.width = w + "px"; // centrado (la etapa tiene margin: auto)
    this.stage.prepend(svg, this.layer);
    this.svg = svg;
    this.geom = new Map(); // tramo → recorrido para el brillo
    for (const it of this.spec.items) this.drawItem(it);
    this.drawFlow();
    this.drawCurrentValues();
    typesetMath(this.layer);
  }

  // ---------- componentes ----------

  drawItem(it) {
    const P = this.P;
    const u = this.u;
    switch (it.kind) {
      case "wire":
        this.g.wires.append(svgEl("polyline", { points: it.pts.map(P).map((p) => p.join(",")).join(" ") }));
        break;
      case "R":
      case "bat":
      case "cap":
      case "amm":
      case "volt":
      case "galv":
      case "sw": {
        const [a, b] = it.pts.map(P);
        const geo = frame(a, b);
        const side = it.side || this.outside(it, geo, "comp");
        const path = this[`draw_${it.kind}`](geo, it, side);
        for (const s of this.segs.filter((s) => s.item === it)) this.geom.set(s, path || [a, b]);
        this.label(it, geo, side, 0.4);
        break;
      }
      case "node": {
        const p = P(it.pts[0]);
        this.g.marks.append(svgEl("circle", { cx: p[0], cy: p[1], r: 3.6, class: "c-node" }));
        if (it.label) this.labelAt(p[0] - 0.12 * u, p[1] - 0.12 * u, it.side || "upleft", it.label, "c-node-label");
        break;
      }
      case "text": {
        const p = P(it.pts[0]);
        this.labelAt(p[0], p[1], it.side || "center", it.label, "c-text");
        break;
      }
      case "ground": {
        const [x, y] = P(it.pts[0]);
        const s = 0.22 * u;
        this.g.comps.append(
          svgEl("path", {
            d: `M${x},${y} v${s} M${x - s},${y + s} h${2 * s} M${x - s * 0.62},${y + s * 1.35} h${s * 1.24} M${x - s * 0.25},${y + s * 1.7} h${s * 0.5}`,
          }),
        );
        break;
      }
      case "current": {
        const [a, b] = it.pts.map(P);
        const geo = frame(a, b);
        this.g.marks.append(arrowHead(geo.mid, geo.t, 9, "c-arrow"));
        const side = it.side || this.outside(it, geo, "current");
        if (it.label) this.labelAt(...offset(geo.mid, side, 0.3 * u), side, it.label, "c-current cur-name");
        break;
      }
      case "mesh": {
        const [cx, cy] = P(it.pts[0]);
        const r = 0.42 * u;
        const rad = (d) => (d * Math.PI) / 180;
        const [f0, f1] = it.cw ? [-150, 130] : [-30, -310];
        const p0 = [cx + r * Math.cos(rad(f0)), cy + r * Math.sin(rad(f0))];
        const p1 = [cx + r * Math.cos(rad(f1)), cy + r * Math.sin(rad(f1))];
        this.g.marks.append(svgEl("path", { d: `M${p0} A${r},${r} 0 1 ${it.cw ? 1 : 0} ${p1}`, class: "c-mesh" }));
        const tan = it.cw ? [-Math.sin(rad(f1)), Math.cos(rad(f1))] : [Math.sin(rad(f1)), -Math.cos(rad(f1))];
        this.g.marks.append(arrowHead(p1, tan, 8, "c-arrow c-mesh-head"));
        if (it.label) this.labelAt(cx, cy, "center", it.label, "c-mesh-label");
        break;
      }
    }
  }

  // Cada componente devuelve su recorrido (para el brillo) y deja los cables
  // que lo unen a sus puntos.
  leads(geo, len) {
    const [a, b] = [geo.at(-len / 2), geo.at(len / 2)];
    this.g.wires.append(svgEl("polyline", { points: `${geo.a} ${a}` }), svgEl("polyline", { points: `${b} ${geo.b}` }));
    return [a, b];
  }

  draw_R(geo) {
    const u = this.u;
    const z = Math.min(geo.L - 0.2 * u, 0.9 * u);
    const [a, b] = this.leads(geo, z);
    const amp = 0.13 * u;
    const pts = [a];
    const N = 6;
    for (let k = 0; k < N; k++) {
      const p = geo.at(-z / 2 + (z * (k + 0.5)) / N);
      pts.push([p[0] + geo.n[0] * amp * (k % 2 ? -1 : 1), p[1] + geo.n[1] * amp * (k % 2 ? -1 : 1)]);
    }
    pts.push(b);
    this.g.comps.append(svgEl("polyline", { points: pts.join(" ") }));
    return [geo.a, ...pts, geo.b];
  }

  draw_bat(geo, it, side) {
    const u = this.u;
    const gap = 0.14 * u;
    this.leads(geo, gap);
    // El + (placa larga) va del lado del segundo punto.
    const plus = geo.at(gap / 2);
    const minus = geo.at(-gap / 2);
    const plate = (c, half, cls) => svgEl("line", { x1: c[0] - geo.n[0] * half, y1: c[1] - geo.n[1] * half, x2: c[0] + geo.n[0] * half, y2: c[1] + geo.n[1] * half, class: cls });
    this.g.comps.append(plate(plus, 0.3 * u, "c-plate"), plate(minus, 0.16 * u, "c-plate is-short"));
    // Signo + junto a la placa larga, del lado contrario a la etiqueta.
    const sp = geo.at(gap / 2 + 0.16 * u);
    const away = SIDE_VEC[side] || [0, 0];
    const s = svgEl("text", { x: sp[0] - away[0] * 0.3 * u, y: sp[1] - away[1] * 0.3 * u, class: "c-sign" });
    s.textContent = "+";
    this.g.comps.append(s);
    return [geo.a, geo.b];
  }

  draw_cap(geo) {
    const u = this.u;
    const gap = 0.16 * u;
    this.leads(geo, gap);
    for (const d of [-gap / 2, gap / 2]) {
      const c = geo.at(d);
      const half = 0.28 * u;
      this.g.comps.append(svgEl("line", { x1: c[0] - geo.n[0] * half, y1: c[1] - geo.n[1] * half, x2: c[0] + geo.n[0] * half, y2: c[1] + geo.n[1] * half, class: "c-plate" }));
    }
    return null; // en continua no pasa corriente
  }

  meter(geo, letter) {
    const r = 0.24 * this.u;
    this.leads(geo, 2 * r);
    this.g.comps.append(svgEl("circle", { cx: geo.mid[0], cy: geo.mid[1], r, class: "c-meter" }));
    const t = svgEl("text", { x: geo.mid[0], y: geo.mid[1], class: "c-meter-letter" });
    t.textContent = letter;
    this.g.comps.append(t);
    return [geo.a, geo.b];
  }
  draw_amm(geo) {
    return this.meter(geo, "A");
  }
  draw_volt(geo) {
    return this.meter(geo, "V");
  }
  draw_galv(geo) {
    return this.meter(geo, "G");
  }

  draw_sw(geo, it) {
    const u = this.u;
    const len = Math.min(geo.L - 0.2 * u, 0.7 * u);
    const [a, b] = this.leads(geo, len);
    for (const p of [a, b]) this.g.comps.append(svgEl("circle", { cx: p[0], cy: p[1], r: 2.6, class: "c-contact" }));
    // Cerrado: la cuchilla toca el otro contacto; abierto: queda levantada.
    const tip = it.closed ? b : [b[0] + geo.n[0] * 0.32 * u, b[1] + geo.n[1] * 0.32 * u];
    this.g.comps.append(svgEl("line", { x1: a[0], y1: a[1], x2: tip[0], y2: tip[1] }));
    return [geo.a, geo.b];
  }

  // ---------- etiquetas ----------

  // Lado de la etiqueta, como en los libros: lo que está en el borde del
  // circuito la lleva hacia afuera; lo de adentro, arriba o a la derecha
  // (las flechas de corriente, del lado opuesto, para no pisarse).
  outside(it, geo, role) {
    const { x0, x1, y0, y1 } = this.box;
    const [p, q] = it.pts;
    const eq = (a, b) => Math.abs(a - b) < 1e-9;
    if (geo.horizontal) {
      if (eq(p[1], y0) && eq(q[1], y0)) return "down";
      if (eq(p[1], y1) && eq(q[1], y1)) return "up";
      return role === "comp" ? "up" : "down";
    }
    if (eq(p[0], x0) && eq(q[0], x0)) return "left";
    if (eq(p[0], x1) && eq(q[0], x1)) return "right";
    return role === "comp" ? "right" : "left";
  }

  label(it, geo, side, dist) {
    if (it.label) this.labelAt(...offset(geo.mid, side, dist * this.u), side, it.label, "c-label");
  }

  labelAt(x, y, side, text, cls) {
    const d = el("div", `plot-label circuit-label side-${side} ${cls}`);
    d.style.left = x + "px";
    d.style.top = y + "px";
    d.innerHTML = renderLabel(text);
    this.layer.append(d);
    return d;
  }

  // Valores calculados (botón I): en lugar del nombre de cada flecha, y en
  // las ramas sin flecha, junto al componente.
  drawCurrentValues() {
    for (const t of this.texts) {
      if (t.at) {
        const geo = frame(...t.at.pts.map(this.P));
        const side = t.at.side || this.outside(t.at, geo, "current");
        this.labelAt(...offset(geo.mid, side, 0.3 * this.u), side, t.text, "c-current cur-val");
      } else {
        const seg = { pts: [t.seg.a, t.seg.b] };
        const geo = frame(...seg.pts.map(this.P));
        const side = this.outside(seg, geo, "current");
        this.labelAt(...offset(geo.mid, side, 0.42 * this.u), side, t.text, "c-current cur-val");
      }
    }
  }

  // ---------- brillo de la corriente ----------

  drawFlow() {
    if (!this.animated()) return;
    const max = Math.max(...[...this.flow.values()].map(Math.abs));
    const electrons = this.spec.opts.flujo === "electrones";
    for (const [seg, I] of this.flow) {
      if (!I) continue;
      let path = this.geom.get(seg) || [seg.a, seg.b].map(this.P);
      if (I < 0 !== electrons) path = [...path].reverse();
      const v = 28 + 64 * (Math.abs(I) / max); // px por segundo
      this.g.flow.append(
        svgEl("polyline", {
          points: path.join(" "),
          class: "c-pulse",
          style: `animation-duration: ${(18 / v).toFixed(3)}s`,
        }),
      );
    }
  }
}

// ---------- geometría y utilidades ----------

// Marco de un tramo a → b: dirección t, normal n, largo y punto a distancia d del medio.
function frame(a, b) {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const t = [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
  let n = [-t[1], t[0]];
  // La normal apunta hacia arriba (o a la izquierda): las placas y el zigzag no dependen del sentido.
  if (n[1] > 1e-9 || (Math.abs(n[1]) < 1e-9 && n[0] > 0)) n = [-n[0], -n[1]];
  const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  return { a, b, L, t, n, mid, horizontal: Math.abs(t[0]) >= Math.abs(t[1]), at: (d) => [mid[0] + t[0] * d, mid[1] + t[1] * d] };
}

const SIDE_VEC = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0], upleft: [-0.7, -0.7], center: [0, 0] };
const offset = (p, side, d) => {
  const v = SIDE_VEC[side] || [0, 0];
  return [p[0] + v[0] * d, p[1] + v[1] * d];
};

function arrowHead(p, dir, size, cls) {
  const [dx, dy] = dir;
  const n = [-dy, dx];
  const tip = [p[0] + dx * size * 0.6, p[1] + dy * size * 0.6];
  const back = [p[0] - dx * size * 0.4, p[1] - dy * size * 0.4];
  const l = [back[0] + n[0] * size * 0.45, back[1] + n[1] * size * 0.45];
  const r = [back[0] - n[0] * size * 0.45, back[1] - n[1] * size * 0.45];
  return svgEl("polygon", { points: `${tip} ${l} ${r}`, class: cls });
}

function svgEl(tag, attrs = {}) {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  return e;
}

function el(tag, cls) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  return e;
}
