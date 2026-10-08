// Gráficos en R³ con proyección ortogonal (como las figuras de los libros):
// superficies z = f(x, y) (o x = …, y = …), sólidos a <= z <= b sobre una
// región D, cilindros, superficies paramétricas, curvas, puntos, cortes y
// prismas de Riemann. Arrastrar gira, Ctrl+ruedita acerca, doble clic vuelve.
//
// Todo se arma como una lista de polígonos y segmentos en 3D que se ordena
// por profundidad en cada cuadro (algoritmo del pintor).
import { themeColors, rgba, mix, renderLabel, ticks, fmtTick, toolbar, fullscreenToggle, errorBox, rangeOf } from "./plotcommon.js";
import { typesetMath } from "./math.js";

const TAU = Math.PI * 2;
const DEG = Math.PI / 180;
const N = 44; // celdas por lado de la grilla de superficies

export class Plot3D {
  constructor(fig, spec) {
    this.fig = fig;
    this.spec = spec;
    this.sc = { x: 0, y: 0, z: 0, t: 0, u: 0, v: 0, r: 0, th: 0 };
    if (spec.errors.length) fig.append(errorBox(spec.errors));
    this.stage = el("div", "plot-stage is-3d");
    this.canvas = el("canvas", "plot-canvas");
    this.layer = el("div", "plot-layer");
    this.stage.append(this.canvas, this.layer);
    fig.append(this.stage);
    toolbar(this.stage, [
      ["+", "Acercar (Ctrl+ruedita)", () => this.setZoom(this.zoom * 1.25)],
      ["−", "Alejar", () => this.setZoom(this.zoom / 1.25)],
      ["⊤", "Ver desde arriba", () => this.setView(-90, 89.9)],
      ["⟲", "Vista inicial (doble clic)", () => this.reset()],
      ["⛶", "Pantalla completa", fullscreenToggle(fig, () => this.resize())],
    ]);
    const [az, el0] = spec.opts.vista || [32, 22];
    this.home = { az: az * DEG, el: el0 * DEG };
    this.az = this.home.az;
    this.el = this.home.el;
    this.zoom = 1;
    this.R = this.ranges();
    this.build();
    this.bind();
    this.resize();
  }

  // ---------- rangos ----------

  ranges() {
    const { opts, items } = this.spec;
    const sc = this.sc;
    const box = { x: [Infinity, -Infinity], y: [Infinity, -Infinity], z: [Infinity, -Infinity] };
    const addv = (k, v) => {
      if (!Number.isFinite(v)) return;
      if (v < box[k][0]) box[k][0] = v;
      if (v > box[k][1]) box[k][1] = v;
    };
    const add = (p) => (addv("x", p[0]), addv("y", p[1]), addv("z", p[2]));
    for (const it of items) {
      if (it.kind === "point" || it.kind === "text") add(it.p);
      else if (it.kind === "segment") (add(it.a), add(it.b));
      else if (it.kind === "polygon") it.pts.forEach(add);
      else if (it.kind === "curve") this.sampleCurve(it).forEach(add);
      else if (it.kind === "psurf") this.samplePsurf(it, 24).forEach((row) => row.forEach(add));
    }
    // Regiones de la base: barrido grueso para encuadrarlas.
    for (const it of items) {
      const mask = this.maskOf(it);
      if (!mask) continue;
      const [A, B] = it.base;
      const ra = opts.ranges[A] || [-10, 10];
      const rb = opts.ranges[B] || [-10, 10];
      const M = 120;
      for (let j = 0; j <= M; j++)
        for (let i = 0; i <= M; i++) {
          const a = ra[0] + ((ra[1] - ra[0]) * i) / M;
          const b = rb[0] + ((rb[1] - rb[0]) * j) / M;
          if (mask(a, b) >= 0) (addv(A, a), addv(B, b));
        }
    }
    const R = {};
    const settle = (k, def) => {
      if (opts.ranges[k]) return (R[k] = opts.ranges[k]);
      R[k] = Number.isFinite(box[k][0]) ? [box[k][0], box[k][1]] : def;
      if (R[k][1] - R[k][0] < 1e-9) R[k] = [R[k][0] - 1, R[k][1] + 1];
    };
    for (const k of ["x", "y"]) settle(k, [-2, 2]);
    // Valores de las funciones (la "altura" de cada superficie o sólido).
    for (const it of items) {
      if (!["graph", "solid"].includes(it.kind)) continue;
      const [A, B] = it.base;
      const known = (k) => R[k] || opts.ranges[k] || (Number.isFinite(box[k][0]) ? box[k] : [-2, 2]);
      const ra = known(A);
      const rb = known(B);
      const mask = this.maskOf(it);
      for (let j = 0; j <= 40; j++)
        for (let i = 0; i <= 40; i++) {
          sc[A] = ra[0] + ((ra[1] - ra[0]) * i) / 40;
          sc[B] = rb[0] + ((rb[1] - rb[0]) * j) / 40;
          if (mask && !(mask(sc[A], sc[B]) >= 0)) continue;
          sc[A] = ra[0] + ((ra[1] - ra[0]) * i) / 40;
          sc[B] = rb[0] + ((rb[1] - rb[0]) * j) / 40;
          if (it.kind === "graph") addv(it.w, it.f(sc));
          else (addv(it.w, it.lo(sc)), addv(it.w, it.hi(sc)));
        }
    }
    for (const it of items) if (it.kind === "cyl" && it.ranges?.[it.w]) (addv(it.w, it.ranges[it.w][0]), addv(it.w, it.ranges[it.w][1]));
    settle("z", [-1, 1]);
    // Incluir el origen si está cerca y dejar un margen.
    for (const k of ["x", "y", "z"]) {
      if (opts.ranges[k]) continue;
      let [a, b] = R[k];
      const span = b - a;
      if (a > 0 && a < span * 0.6) a = 0;
      if (b < 0 && -b < span * 0.6) b = 0;
      const pad = (b - a) * 0.04;
      R[k] = [a - pad, b + pad];
    }
    return R;
  }

  // maskOf(ítem) → m(a, b) ≥ 0 en la región de la base (o null si no tiene).
  maskOf(it) {
    const sc = this.sc;
    let conds = null;
    if (it.kind === "graph" && it.on) conds = it.on;
    else if (it.kind === "solid") conds = [...it.conds, (s) => it.hi(s) - it.lo(s)];
    else if (it.kind === "flat") conds = it.conds;
    else if (it.kind === "cyl") {
      // El cilindro se encuadra por su curva: F cerca de 0.
      const [A, B] = it.base;
      return (a, b) => {
        sc[A] = a;
        sc[B] = b;
        const v = it.F(sc);
        if (it.on && it.on.some((c) => !(c(sc) >= 0))) return -1;
        return Math.abs(v) < 0.6 ? 1 : -1;
      };
    }
    if (!conds) return null;
    const [A, B] = it.base;
    return (a, b) => {
      sc[A] = a;
      sc[B] = b;
      let m = Infinity;
      for (const c of conds) {
        const v = c(sc);
        if (!(v === v)) return -1;
        if (v < m) m = v;
      }
      return m;
    };
  }

  sampleCurve(it) {
    const [a, b] = rangeOf(it, this.spec.opts, ["t"], [0, TAU]);
    const out = [];
    for (let k = 0; k <= 360; k++) {
      this.sc.t = a + ((b - a) * k) / 360;
      out.push([it.fx(this.sc), it.fy(this.sc), it.fz(this.sc)]);
    }
    return out;
  }

  samplePsurf(it, n) {
    const ur = rangeOf(it, this.spec.opts, ["u"], [0, 1]);
    const vr = rangeOf(it, this.spec.opts, ["v"], [0, TAU]);
    const rows = [];
    for (let j = 0; j <= n; j++) {
      const row = [];
      for (let i = 0; i <= n; i++) {
        this.sc.u = ur[0] + ((ur[1] - ur[0]) * i) / n;
        this.sc.v = vr[0] + ((vr[1] - vr[0]) * j) / n;
        row.push([it.fx(this.sc), it.fy(this.sc), it.fz(this.sc)]);
      }
      rows.push(row);
    }
    return rows;
  }

  // ---------- geometría ----------

  build() {
    const R = this.R;
    // Proporciones: "igual" respeta la geometría; "cubo" iguala los tres
    // ejes; por defecto se compensan los ejes muy largos o muy cortos (como
    // al dibujar a mano) para que la figura no quede alta y flaca.
    const spans = ["x", "y", "z"].map((k) => R[k][1] - R[k][0]);
    const asp = this.spec.opts.aspecto;
    let lens = spans;
    if (asp === "cubo") lens = [1, 1, 1];
    else if (asp !== "igual") {
      const med = [...spans].sort((a, b) => a - b)[1];
      lens = spans.map((sp) => Math.min(med * 1.35, Math.max(med / 1.35, sp)));
    }
    const top = Math.max(...lens);
    this.scale = spans.map((sp, i) => (2 * lens[i]) / top / sp);
    this.center = ["x", "y", "z"].map((k) => (R[k][0] + R[k][1]) / 2);
    this.radius = 0.5 * Math.hypot(...spans.map((sp, i) => sp * this.scale[i]));
    this.prims = [];
    this.labels = [];
    for (const it of this.spec.items) {
      try {
        this.buildItem(it);
      } catch (e) {
        console.warn("gráfico 3D:", e);
      }
    }
    this.buildAxes();
  }

  W(p) {
    return [(p[0] - this.center[0]) * this.scale[0], (p[1] - this.center[1]) * this.scale[1], (p[2] - this.center[2]) * this.scale[2]];
  }

  // opt.out: dirección hacia afuera (en datos) de una cara de un cuerpo
  // cerrado; la normal se orienta así y la cara se descarta cuando mira
  // para atrás (evita que se mezclen caras de adelante y de atrás).
  poly(pts, color, alpha, opt = {}) {
    if (pts.length < 3 || pts.some((p) => !Number.isFinite(p[0] + p[1] + p[2]))) return;
    const w = pts.map((p) => this.W(p));
    let n = normal(w);
    let cull = false;
    if (opt.out) {
      const o = opt.out.map((v, i) => v * this.scale[i]);
      if (n[0] * o[0] + n[1] * o[1] + n[2] * o[2] < 0) n = [-n[0], -n[1], -n[2]];
      cull = true;
    }
    this.prims.push({ t: "poly", w, n, color, alpha, ...opt, cull });
  }
  line(a, b, color, width = 1.5, opt = {}) {
    if (!Number.isFinite(a[0] + a[1] + a[2] + b[0] + b[1] + b[2])) return;
    this.prims.push({ t: "line", w: [this.W(a), this.W(b)], color, width, ...opt });
  }

  colorOf(it) {
    return { kind: "pal", i: it.color ?? 0 };
  }

  lifter(it) {
    return it.w === "z" ? (a, b, w) => [a, b, w] : it.w === "y" ? (a, b, w) => [a, w, b] : (a, b, w) => [w, a, b];
  }

  // Celdas de la grilla de la base, recortadas a la región (con marcas de
  // borde en las aristas que caen sobre el contorno de D).
  cells(it, conds, n = N) {
    const sc = this.sc;
    const [A, B] = it.base;
    const ra = this.R[A];
    const rb = this.R[B];
    const out = [];
    const val = (c) => (p) => {
      sc[A] = p[0];
      sc[B] = p[1];
      const v = c(sc);
      return v === v ? v : -Infinity; // fuera del dominio de la fórmula
    };
    const vals = conds.map(val);
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        const a0 = ra[0] + ((ra[1] - ra[0]) * i) / n;
        const a1 = ra[0] + ((ra[1] - ra[0]) * (i + 1)) / n;
        const b0 = rb[0] + ((rb[1] - rb[0]) * j) / n;
        const b1 = rb[0] + ((rb[1] - rb[0]) * (j + 1)) / n;
        // [a, b, borde]: el borde marca la arista que va al vértice siguiente.
        let P = [
          [a0, b0, j === 0],
          [a1, b0, i === n - 1],
          [a1, b1, j === n - 1],
          [a0, b1, i === 0],
        ];
        for (const v of vals) {
          P = clipBy(P, v);
          if (!P.length) break;
        }
        if (P.length) out.push(P);
      }
    }
    return out;
  }

  buildItem(it) {
    const sc = this.sc;
    const R = this.R;
    const col = this.colorOf(it);
    const glass = it.style.has("glass");
    const opaque = it.style.has("opaque");
    const alpha = (d) => (opaque ? 1 : glass ? 0.4 : d);
    switch (it.kind) {
      case "graph": {
        const [A, B] = it.base;
        const lift = this.lifter(it);
        const at = (a, b) => ((sc[A] = a), (sc[B] = b), it.f(sc));
        const cells = this.cells(it, it.on || []);
        const wr = R[it.w];
        const a0 = it.prisms ? 0.3 : alpha(1);
        for (const P of cells) {
          const pts = P.map((p) => lift(p[0], p[1], at(p[0], p[1])));
          if (area2(P) < 1e-14) continue;
          const wAvg = pts.reduce((s, p) => s + p[["x", "y", "z"].indexOf(it.w)], 0) / pts.length;
          const color = it.colorSet ? col : { kind: "height", t: (wAvg - wr[0]) / (wr[1] - wr[0]) };
          this.poly(pts, color, a0);
        }
        if (!it.style.has("nomesh") && !it.prisms) this.meshLines(it, at);
        if (it.on) this.boundary(it, cells, (a, b) => at(a, b), it.style.has("shadow"));
        for (const cut of it.cuts || []) this.cut(it, cut, at);
        if (it.prisms) this.prisms(it, at);
        break;
      }
      case "solid": {
        const [A, B] = it.base;
        const lift = this.lifter(it);
        const lo = (a, b) => ((sc[A] = a), (sc[B] = b), it.lo(sc));
        const hi = (a, b) => ((sc[A] = a), (sc[B] = b), it.hi(sc));
        const cells = this.cells(it, [...it.conds, (s) => it.hi(s) - it.lo(s)], 40);
        const al = alpha(1);
        const closed = al >= 0.95;
        const up = lift(0, 0, 1);
        const down = lift(0, 0, -1);
        for (const P of cells) {
          if (area2(P) < 1e-14) continue;
          this.poly(P.map((p) => lift(p[0], p[1], hi(p[0], p[1]))), col, al, closed ? { out: up } : {});
          this.poly(P.map((p) => lift(p[0], p[1], lo(p[0], p[1]))), col, al, closed ? { dim: 0.8, out: down } : { dim: 0.8 });
        }
        // Paredes laterales sobre el contorno de D, con una arista vertical en
        // cada esquina del contorno.
        const E = edges(cells);
        for (const p of corners(E)) this.line(lift(p[0], p[1], lo(...p)), lift(p[0], p[1], hi(...p)), col, 1.3, { strong: true, edge: true });
        const tiny = (R[it.w][1] - R[it.w][0]) * 1e-3;
        for (const [p, q] of E) {
          const K = 4;
          const lp = lo(...p), hp = hi(...p), lq = lo(...q), hq = hi(...q);
          // Hacia afuera de D: a la derecha del borde (las celdas van antihorario).
          const out = lift(q[1] - p[1], p[0] - q[0], 0);
          if (Math.abs(hp - lp) < tiny && Math.abs(hq - lq) < tiny) continue;
          for (let k = 0; k < K; k++) {
            const f0 = k / K;
            const f1 = (k + 1) / K;
            this.poly(
              [lift(p[0], p[1], lp + (hp - lp) * f0), lift(q[0], q[1], lq + (hq - lq) * f0), lift(q[0], q[1], lq + (hq - lq) * f1), lift(p[0], p[1], lp + (hp - lp) * f1)],
              col,
              al,
              closed ? { dim: 0.92, out } : { dim: 0.92 },
            );
          }
          this.line(lift(p[0], p[1], hp), lift(q[0], q[1], hq), col, 1.4, { strong: true });
          this.line(lift(p[0], p[1], lp), lift(q[0], q[1], lq), col, 1.2, { strong: true });
        }
        // Sombra de D en el plano coordenado (si el sólido no apoya ya ahí).
        const w0 = this.floorOf(it.w);
        const onFloor = cells.length && cells.slice(0, 30).every((P) => Math.abs(lo(P[0][0], P[0][1]) - w0) < 1e-9);
        if (!onFloor || it.style.has("shadow")) this.shadow(it, cells, w0);
        break;
      }
      case "flat": {
        const lift = this.lifter(it);
        const w0 = this.floorOf(it.w);
        const cells = this.cells(it, it.conds);
        for (const P of cells) if (area2(P) > 1e-14) this.poly(P.map((p) => lift(p[0], p[1], w0)), col, alpha(0.4), { flat: true });
        for (const [p, q] of edges(cells)) this.line(lift(p[0], p[1], w0), lift(q[0], q[1], w0), col, 1.6, { strong: true });
        if (it.label) this.labels.push({ p: centroid(cells, lift, w0), text: it.label, color: col, cls: "is-region" });
        break;
      }
      case "cyl": {
        const [A, B] = it.base;
        const lift = this.lifter(it);
        const wr = it.ranges?.[it.w] || R[it.w];
        const ra = R[A];
        const rb = R[B];
        const M = 90;
        const F = (a, b) => ((sc[A] = a), (sc[B] = b), it.F(sc));
        const ok = (a, b) => !it.on || ((sc[A] = a), (sc[B] = b), it.on.every((c) => c(sc) >= 0));
        const g = [];
        for (let j = 0; j <= M; j++) for (let i = 0; i <= M; i++) g.push(F(ra[0] + ((ra[1] - ra[0]) * i) / M, rb[0] + ((rb[1] - rb[0]) * j) / M));
        const segs = contourSegs(g, M, (i, j) => [ra[0] + ((ra[1] - ra[0]) * i) / M, rb[0] + ((rb[1] - rb[0]) * j) / M]);
        const K = 6;
        for (const [p, q] of segs) {
          if (!ok((p[0] + q[0]) / 2, (p[1] + q[1]) / 2)) continue;
          for (let k = 0; k < K; k++) {
            const w0 = wr[0] + ((wr[1] - wr[0]) * k) / K;
            const w1 = wr[0] + ((wr[1] - wr[0]) * (k + 1)) / K;
            this.poly([lift(p[0], p[1], w0), lift(q[0], q[1], w0), lift(q[0], q[1], w1), lift(p[0], p[1], w1)], col, alpha(0.5));
          }
          this.line(lift(p[0], p[1], wr[0]), lift(q[0], q[1], wr[0]), col, 1.3);
          this.line(lift(p[0], p[1], wr[1]), lift(q[0], q[1], wr[1]), col, 1.3);
        }
        break;
      }
      case "psurf": {
        const rows = this.samplePsurf(it, 40);
        for (let j = 0; j < rows.length - 1; j++)
          for (let i = 0; i < rows[j].length - 1; i++)
            this.poly([rows[j][i], rows[j][i + 1], rows[j + 1][i + 1], rows[j + 1][i]], col, alpha(1), { mesh: !it.style.has("nomesh") && (i % 4 === 0 || j % 4 === 0) ? "grid" : false, gi: i % 4 === 0, gj: j % 4 === 0 });
        break;
      }
      case "curve": {
        const pts = this.sampleCurve(it);
        for (let k = 0; k < pts.length - 1; k++) this.line(pts[k], pts[k + 1], col, it.style.has("thin") ? 1.5 : 2.6, { dashed: it.style.has("dashed") });
        break;
      }
      case "segment": {
        this.line(it.a, it.b, col, it.style.has("thick") ? 3 : 2, { dashed: it.style.has("dashed"), arrow: it.style.has("arrow") });
        if (it.label) this.labels.push({ p: it.b, text: it.label, color: col, cls: "is-point" });
        break;
      }
      case "polygon": {
        this.poly(it.pts, col, alpha(0.35), { flat: true });
        it.pts.forEach((p, k) => this.line(p, it.pts[(k + 1) % it.pts.length], col, 1.6));
        if (it.label) this.labels.push({ p: it.pts.reduce((s, p) => s.map((v, i) => v + p[i] / it.pts.length), [0, 0, 0]), text: it.label, color: col, cls: "is-region" });
        break;
      }
      case "point": {
        this.prims.push({ t: "point", w: [this.W(it.p)], color: col });
        if (it.label) this.labels.push({ p: it.p, text: it.label, color: col, cls: "is-point" });
        break;
      }
      case "text":
        this.labels.push({ p: it.p, text: it.text, color: null, cls: "is-text" });
        break;
    }
  }

  // Malla de la superficie: una línea cada 4 celdas en cada dirección,
  // cortada donde la superficie sale de su región.
  meshLines(it, at) {
    const [A, B] = it.base;
    const lift = this.lifter(it);
    const ra = this.R[A];
    const rb = this.R[B];
    const mask = this.maskOf(it);
    const col = it.colorSet ? this.colorOf(it) : { kind: "mesh" };
    const M = N * 2;
    for (const dir of [0, 1]) {
      for (let g = 0; g <= N; g += 4) {
        let prev = null;
        for (let k = 0; k <= M; k++) {
          const s = dir ? rb[0] + ((rb[1] - rb[0]) * g) / N : ra[0] + ((ra[1] - ra[0]) * g) / N;
          const t = dir ? ra[0] + ((ra[1] - ra[0]) * k) / M : rb[0] + ((rb[1] - rb[0]) * k) / M;
          const [a, b] = dir ? [t, s] : [s, t];
          if (mask && !(mask(a, b) >= 0)) {
            prev = null;
            continue;
          }
          const p = lift(a, b, at(a, b));
          if (prev) this.line(prev, p, col, 0.7, { mesh: true });
          prev = p;
        }
      }
    }
  }

  floorOf(w) {
    const r = this.R[w];
    return r[0] <= 0 && r[1] >= 0 ? 0 : r[0];
  }

  shadow(it, cells, w0) {
    const lift = this.lifter(it);
    const col = this.colorOf(it);
    for (const P of cells) if (area2(P) > 1e-14) this.poly(P.map((p) => lift(p[0], p[1], w0)), col, 0.22, { flat: true });
    for (const [p, q] of edges(cells)) this.line(lift(p[0], p[1], w0), lift(q[0], q[1], w0), col, 1.3, { dashed: true });
  }

  // Contorno de una superficie recortada: borde marcado y, con "sombra", la
  // región D abajo y algunas verticales punteadas como en el apunte.
  boundary(it, cells, at, withShadow) {
    const lift = this.lifter(it);
    const col = this.colorOf(it);
    const E = edges(cells);
    for (const [p, q] of E) this.line(lift(p[0], p[1], at(...p)), lift(q[0], q[1], at(...q)), col, 1.4, { strong: true });
    if (!withShadow) return;
    const w0 = this.floorOf(it.w);
    this.shadow(it, cells, w0);
    if (!E.length) return;
    const cx = E.reduce((s, e) => s + e[0][0], 0) / E.length;
    const cy = E.reduce((s, e) => s + e[0][1], 0) / E.length;
    const picked = new Map();
    for (const [p] of E) {
      const sector = Math.floor(((Math.atan2(p[1] - cy, p[0] - cx) + Math.PI) / TAU) * 8) % 8;
      if (!picked.has(sector)) picked.set(sector, p);
    }
    for (const p of picked.values()) this.line(lift(p[0], p[1], w0), lift(p[0], p[1], at(...p)), { kind: "axis" }, 1, { dashed: true });
  }

  // Corte con el plano x = c (o y = c): área bajo la curva C, como en Fubini.
  cut(it, cut, at) {
    const [A, B] = it.base;
    const lift = this.lifter(it);
    const fixedFirst = cut.axis === A;
    if (cut.axis !== A && cut.axis !== B) return;
    const other = fixedFirst ? B : A;
    const r = this.R[other];
    const w0 = this.floorOf(it.w);
    const col = { kind: "pal", i: (it.color + 1) % 6 };
    const n = 60;
    const inside = (a, b) => !it.on || ((this.sc[A] = a), (this.sc[B] = b), it.on.every((c) => c(this.sc) >= 0));
    const pt = (s) => (fixedFirst ? [cut.c, s] : [s, cut.c]);
    let prev = null;
    for (let k = 0; k <= n; k++) {
      const s = r[0] + ((r[1] - r[0]) * k) / n;
      const [a, b] = pt(s);
      if (!inside(a, b)) {
        prev = null;
        continue;
      }
      const w = at(a, b);
      if (prev) {
        this.poly([lift(prev.a, prev.b, w0), lift(a, b, w0), lift(a, b, w), lift(prev.a, prev.b, prev.w)], col, 0.5, { flat: true, hatch: true });
        this.line(lift(prev.a, prev.b, prev.w), lift(a, b, w), col, 2.6, { strong: true, bias: 0.06 });
      }
      prev = { a, b, w };
    }
  }

  // Prismas de la suma de Riemann: base ΔA y altura f en el centro de la celda.
  prisms(it, at) {
    const [A, B] = it.base;
    const lift = this.lifter(it);
    const [n, m] = it.prisms;
    const ra = this.R[A];
    const rb = this.R[B];
    const w0 = this.floorOf(it.w);
    const wr = this.R[it.w];
    const inside = (a, b) => !it.on || ((this.sc[A] = a), (this.sc[B] = b), it.on.every((c) => c(this.sc) >= 0));
    for (let i = 0; i < n; i++)
      for (let j = 0; j < m; j++) {
        const a0 = ra[0] + ((ra[1] - ra[0]) * i) / n;
        const a1 = ra[0] + ((ra[1] - ra[0]) * (i + 1)) / n;
        const b0 = rb[0] + ((rb[1] - rb[0]) * j) / m;
        const b1 = rb[0] + ((rb[1] - rb[0]) * (j + 1)) / m;
        const am = (a0 + a1) / 2;
        const bm = (b0 + b1) / 2;
        if (!inside(am, bm)) continue;
        const h = at(am, bm);
        if (!Number.isFinite(h)) continue;
        const col = it.colorSet ? this.colorOf(it) : { kind: "height", t: (h - wr[0]) / (wr[1] - wr[0]) };
        const c = [
          [a0, b0],
          [a1, b0],
          [a1, b1],
          [a0, b1],
        ];
        const sgn = h >= w0 ? 1 : -1;
        this.poly(c.map(([a, b]) => lift(a, b, h)), col, 1, { mesh: true, out: lift(0, 0, sgn) });
        for (let k = 0; k < 4; k++) {
          const [p, q] = [c[k], c[(k + 1) % 4]];
          const out = lift(q[1] - p[1], p[0] - q[0], 0);
          this.poly([lift(p[0], p[1], w0), lift(q[0], q[1], w0), lift(q[0], q[1], h), lift(p[0], p[1], h)], col, 1, { mesh: true, dim: 0.88, out });
        }
      }
  }

  buildAxes() {
    const R = this.R;
    const o = ["x", "y", "z"].map((k) => (R[k][0] <= 0 && R[k][1] >= 0 ? 0 : R[k][0]));
    this.axes = [];
    if (!this.spec.opts.ejes) return;
    ["x", "y", "z"].forEach((k, i) => {
      const a = [...o];
      const b = [...o];
      a[i] = Math.min(R[k][0], o[i]);
      b[i] = R[k][1] + (R[k][1] - R[k][0]) * 0.12;
      const K = 24;
      for (let s = 0; s < K; s++) {
        const p = a.map((v, d) => v + ((b[d] - v) * s) / K);
        const q = a.map((v, d) => v + ((b[d] - v) * (s + 1)) / K);
        this.line(p, q, { kind: "axis" }, 1.3, { axis: true });
      }
      this.axes.push({ k, end: b, origin: o, i });
    });
    // Piso: grilla en el plano z = 0 (o el más bajo).
    this.floor = [];
    if (this.spec.opts.piso && this.spec.opts.grilla) {
      const z0 = this.floorOf("z");
      for (const x of ticks(R.x[0], R.x[1], 6)) this.floor.push([this.W([x, R.y[0], z0]), this.W([x, R.y[1], z0])]);
      for (const y of ticks(R.y[0], R.y[1], 6)) this.floor.push([this.W([R.x[0], y, z0]), this.W([R.x[1], y, z0])]);
    }
    if (this.spec.opts.caja) {
      const c = (i, j, k) => [R.x[i], R.y[j], R.z[k]];
      const E = [
        [c(0, 0, 0), c(1, 0, 0)], [c(0, 1, 0), c(1, 1, 0)], [c(0, 0, 1), c(1, 0, 1)], [c(0, 1, 1), c(1, 1, 1)],
        [c(0, 0, 0), c(0, 1, 0)], [c(1, 0, 0), c(1, 1, 0)], [c(0, 0, 1), c(0, 1, 1)], [c(1, 0, 1), c(1, 1, 1)],
        [c(0, 0, 0), c(0, 0, 1)], [c(1, 0, 0), c(1, 0, 1)], [c(0, 1, 0), c(0, 1, 1)], [c(1, 1, 0), c(1, 1, 1)],
      ];
      for (const [p, q] of E) this.line(p, q, { kind: "axis" }, 0.8, { faint: true });
    }
  }

  // ---------- vista e interacción ----------

  resize() {
    const W = Math.max(260, this.stage.clientWidth || this.fig.clientWidth || 640);
    const H = document.fullscreenElement === this.fig ? window.innerHeight - 60 : this.spec.opts.alto || 420;
    this.Wpx = W;
    this.Hpx = H;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.round(W * dpr);
    this.canvas.height = Math.round(H * dpr);
    this.canvas.style.height = H + "px";
    this.stage.style.height = H + "px";
    this.ctx = this.canvas.getContext("2d");
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.fit = this.fitScale(W, H);
    this.draw();
  }

  // Escala que hace entrar la caja de los datos (más las flechas de los ejes)
  // en el lienzo con la vista inicial. No cambia al girar: la figura no "respira".
  fitScale(W, H) {
    const { az, el } = this.home;
    const r = [-Math.sin(az), Math.cos(az), 0];
    const u = [-Math.sin(el) * Math.cos(az), -Math.sin(el) * Math.sin(az), Math.cos(el)];
    const R = this.R;
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const i of [0, 1])
      for (const j of [0, 1])
        for (const k of [0, 1]) {
          const ext = (rr, t) => (t ? rr[1] + (rr[1] - rr[0]) * 0.14 : rr[0]);
          const p = this.W([ext(R.x, i), ext(R.y, j), ext(R.z, k)]);
          const X = p[0] * r[0] + p[1] * r[1] + p[2] * r[2];
          const Y = p[0] * u[0] + p[1] * u[1] + p[2] * u[2];
          x0 = Math.min(x0, X);
          x1 = Math.max(x1, X);
          y0 = Math.min(y0, Y);
          y1 = Math.max(y1, Y);
        }
    return Math.min((W * 0.84) / (x1 - x0), (H * 0.8) / (y1 - y0));
  }

  reset() {
    this.az = this.home.az;
    this.el = this.home.el;
    this.zoom = 1;
    this.draw();
  }
  setView(az, el) {
    this.az = az * DEG;
    this.el = el * DEG;
    this.draw();
  }
  setZoom(z) {
    this.zoom = Math.max(0.3, Math.min(6, z));
    this.requestDraw();
  }

  bind() {
    const c = this.canvas;
    let drag = null;
    c.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      drag = { x: e.clientX, y: e.clientY, az: this.az, el: this.el };
      c.setPointerCapture(e.pointerId);
      c.classList.add("is-dragging");
    });
    c.addEventListener("pointermove", (e) => {
      if (!drag) return;
      this.az = drag.az - (e.clientX - drag.x) * 0.45 * DEG;
      this.el = Math.max(-89.9 * DEG, Math.min(89.9 * DEG, drag.el + (e.clientY - drag.y) * 0.45 * DEG));
      this.requestDraw();
    });
    const end = () => {
      drag = null;
      c.classList.remove("is-dragging");
    };
    c.addEventListener("pointerup", end);
    c.addEventListener("pointercancel", end);
    c.addEventListener("dblclick", () => this.reset());
    c.addEventListener(
      "wheel",
      (e) => {
        if (!e.ctrlKey && document.fullscreenElement !== this.fig) return;
        e.preventDefault();
        this.setZoom(this.zoom * Math.exp(-e.deltaY * 0.0015));
      },
      { passive: false },
    );
  }

  requestDraw() {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.draw();
    });
  }

  // ---------- dibujo ----------

  draw() {
    const { ctx, Wpx: W, Hpx: H } = this;
    if (!ctx) return;
    const C = (this.C = themeColors());
    ctx.clearRect(0, 0, W, H);
    const ca = Math.cos(this.az), sa = Math.sin(this.az), ce = Math.cos(this.el), se = Math.sin(this.el);
    const d = [ce * ca, ce * sa, se]; // hacia la cámara
    const r = [-sa, ca, 0];
    const u = [-se * ca, -se * sa, ce];
    const k = (this.fit || (0.5 * Math.min(W, H)) / this.radius) * this.zoom;
    const cx = W / 2;
    const cy = H / 2;
    const proj = (p) => [cx + (p[0] * r[0] + p[1] * r[1] + p[2] * r[2]) * k, cy - (p[0] * u[0] + p[1] * u[1] + p[2] * u[2]) * k, p[0] * d[0] + p[1] * d[1] + p[2] * d[2]];
    this.proj = proj;
    // Luz desde arriba a la izquierda, fija respecto de la cámara.
    const L = norm3([-0.45 * r[0] + 0.7 * u[0] + 0.55 * d[0], -0.45 * r[1] + 0.7 * u[1] + 0.55 * d[1], -0.45 * r[2] + 0.7 * u[2] + 0.55 * d[2]]);

    const floorLines = () => {
      ctx.save();
      ctx.strokeStyle = rgba(C.grid);
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const [a, b] of this.floor) {
        const p = proj(a);
        const q = proj(b);
        ctx.moveTo(p[0], p[1]);
        ctx.lineTo(q[0], q[1]);
      }
      ctx.stroke();
      ctx.restore();
    };
    if (this.el >= 0) floorLines();

    const visible = this.prims.filter((pr) => !pr.cull || pr.n[0] * d[0] + pr.n[1] * d[1] + pr.n[2] * d[2] > -1e-6);
    const items = visible.map((pr) => {
      const P = pr.w.map(proj);
      let depth = 0;
      for (const p of P) depth += p[2];
      return { pr, P, depth: depth / P.length + (pr.bias || 0) + (pr.t === "line" ? 1e-4 : 0) + (pr.t === "point" ? 2e-3 : 0) };
    });
    items.sort((a, b) => a.depth - b.depth);
    for (const { pr, P } of items) {
      if (pr.t === "poly") this.drawPoly(pr, P, L);
      else if (pr.t === "line") this.drawLine(pr, P);
      else this.drawPointPrim(pr, P[0]);
    }
    if (this.el < 0) floorLines();
    this.drawAxisDecor(proj);
    this.renderOverlay(proj);
  }

  baseColor(c, t) {
    const C = this.C;
    if (c.kind === "height") {
      const tt = Math.max(0, Math.min(1, t ?? c.t));
      return tt < 0.5 ? mix(C.low, C.mid, tt * 2) : mix(C.mid, C.high, (tt - 0.5) * 2);
    }
    if (c.kind === "axis") return C.axis;
    if (c.kind === "mesh") return mix(C.low, [0, 0, 0, 1], 0.35);
    return C.palette[c.i % C.palette.length];
  }

  drawPoly(pr, P, L) {
    const { ctx } = this;
    const base = this.baseColor(pr.color);
    let shade = 1;
    if (!pr.flat) {
      const dot = Math.abs(pr.n[0] * L[0] + pr.n[1] * L[1] + pr.n[2] * L[2]);
      shade = 0.34 + 0.74 * dot;
    }
    shade *= pr.dim || 1;
    const c = [Math.min(255, base[0] * shade), Math.min(255, base[1] * shade), Math.min(255, base[2] * shade)];
    ctx.beginPath();
    ctx.moveTo(P[0][0], P[0][1]);
    for (let i = 1; i < P.length; i++) ctx.lineTo(P[i][0], P[i][1]);
    ctx.closePath();
    ctx.fillStyle = `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${pr.alpha})`;
    ctx.fill();
    if (pr.alpha >= 0.95) {
      // Sellar las uniones entre celdas para que no se vea la trama.
      ctx.strokeStyle = ctx.fillStyle;
      ctx.lineWidth = 0.7;
      ctx.stroke();
    }
    if (pr.mesh === true) {
      ctx.strokeStyle = `rgba(${(c[0] * 0.5) | 0}, ${(c[1] * 0.5) | 0}, ${(c[2] * 0.5) | 0}, 0.55)`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    } else if (pr.mesh === "grid") {
      // Superficie paramétrica: solo las aristas que caen en la malla cada 4.
      ctx.strokeStyle = `rgba(${(c[0] * 0.5) | 0}, ${(c[1] * 0.5) | 0}, ${(c[2] * 0.5) | 0}, 0.5)`;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      if (pr.gj) (ctx.moveTo(P[0][0], P[0][1]), ctx.lineTo(P[1][0], P[1][1]));
      if (pr.gi) (ctx.moveTo(P[3][0], P[3][1]), ctx.lineTo(P[0][0], P[0][1]));
      ctx.stroke();
    }
  }

  drawLine(pr, P) {
    const { ctx, C } = this;
    const base = this.baseColor(pr.color);
    ctx.save();
    ctx.strokeStyle = rgba(base, pr.faint ? 0.35 : pr.mesh ? 0.42 : pr.axis ? 0.85 : 1);
    ctx.lineWidth = pr.width;
    ctx.lineCap = "round";
    ctx.setLineDash(pr.dashed ? [5, 4] : []);
    ctx.beginPath();
    ctx.moveTo(P[0][0], P[0][1]);
    ctx.lineTo(P[1][0], P[1][1]);
    ctx.stroke();
    if (pr.arrow) {
      ctx.fillStyle = ctx.strokeStyle;
      arrowHead(ctx, P[0][0], P[0][1], P[1][0], P[1][1], 11);
    }
    ctx.restore();
    void C;
  }

  drawPointPrim(pr, p) {
    const { ctx, C } = this;
    ctx.beginPath();
    ctx.arc(p[0], p[1], 4.2, 0, TAU);
    ctx.fillStyle = rgba(this.baseColor(pr.color));
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = rgba(C.bg);
    ctx.stroke();
  }

  drawAxisDecor(proj) {
    const { ctx, C } = this;
    ctx.save();
    for (const ax of this.axes) {
      const endW = this.W(ax.end);
      const before = ax.end.map((v, i) => (i === ax.i ? v - (this.R[ax.k][1] - this.R[ax.k][0]) * 0.04 : v));
      const p = proj(endW);
      const q = proj(this.W(before));
      ctx.fillStyle = rgba(C.axis);
      arrowHead(ctx, q[0], q[1], p[0], p[1], 9);
      // Nombre del eje, un poco más allá de la punta.
      const dx = p[0] - q[0];
      const dy = p[1] - q[1];
      const len = Math.hypot(dx, dy) || 1;
      ctx.font = 'italic 16px "KaTeX_Math", "Times New Roman", serif';
      ctx.fillStyle = rgba(C.text, 0.92);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(ax.k, p[0] + (dx / len) * 12, p[1] + (dy / len) * 12);
      // Números sobre el eje
      ctx.font = "10.5px system-ui, sans-serif";
      ctx.fillStyle = rgba(C.text, 0.62);
      const R = this.R[ax.k];
      for (const t of ticks(R[0], R[1], 4)) {
        if (Math.abs(t) < 1e-12) continue;
        const pt = [...ax.origin];
        pt[ax.i] = t;
        const s = proj(this.W(pt));
        const nx = -dy / len;
        const ny = dx / len;
        ctx.fillText(fmtTick(t), s[0] + nx * 10, s[1] + ny * 10);
      }
    }
    ctx.restore();
  }

  renderOverlay(proj) {
    if (!this.labelEls) {
      this.labelEls = this.labels.map((l) => {
        const d = el("div", "plot-label " + l.cls);
        d.innerHTML = renderLabel(l.text);
        return d;
      });
      const legend = this.spec.items.filter((it) => it.label && ["graph", "cyl", "curve", "psurf", "solid"].includes(it.kind));
      const frag = document.createDocumentFragment();
      frag.append(...this.labelEls);
      if (legend.length && this.spec.opts.leyenda) {
        this.legendEl = el("div", "plot-legend");
        this.legendItems = legend.map((it) => {
          const row = el("div", "plot-legend-row");
          const sw = el("span", "plot-swatch is-fill");
          const lab = el("span", "");
          lab.innerHTML = renderLabel(it.label);
          row.append(sw, lab);
          this.legendEl.append(row);
          return { it, sw };
        });
        frag.append(this.legendEl);
      }
      this.layer.replaceChildren(frag);
      typesetMath(this.layer);
    }
    this.labels.forEach((l, i) => {
      const p = proj(this.W(l.p));
      const d = this.labelEls[i];
      d.style.left = p[0] + "px";
      d.style.top = p[1] + "px";
      d.style.color = l.color ? rgba(this.baseColor(l.color)) : "";
    });
    for (const { it, sw } of this.legendItems || []) {
      const c = it.kind === "graph" && !it.colorSet ? this.C.mid : this.baseColor(this.colorOf(it));
      sw.style.background = rgba(c, 0.85);
      sw.style.borderColor = rgba(c);
    }
  }
}

// ---------- utilidades ----------

function el(tag, cls) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  return e;
}

const norm3 = (v) => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};

// Normal por el método de Newell (sirve para polígonos de cualquier forma).
function normal(P) {
  let x = 0, y = 0, z = 0;
  for (let i = 0; i < P.length; i++) {
    const a = P[i];
    const b = P[(i + 1) % P.length];
    x += (a[1] - b[1]) * (a[2] + b[2]);
    y += (a[2] - b[2]) * (a[0] + b[0]);
    z += (a[0] - b[0]) * (a[1] + b[1]);
  }
  return norm3([x, y, z]);
}

function area2(P) {
  let s = 0;
  for (let i = 0; i < P.length; i++) {
    const a = P[i];
    const b = P[(i + 1) % P.length];
    s += a[0] * b[1] - b[0] * a[1];
  }
  return Math.abs(s);
}

// Recorta el polígono [a, b, borde] a la parte donde v ≥ 0. El punto de corte
// se afina con unas iteraciones para que caiga del lado de adentro (así una
// raíz como sqrt(4 − x² − y²) no da NaN justo en el borde).
function clipBy(P, v) {
  const vals = P.map(v);
  if (vals.every((x) => x >= 0)) return P;
  if (vals.every((x) => x < 0)) return [];
  const out = [];
  for (let k = 0; k < P.length; k++) {
    const p = P[k];
    const q = P[(k + 1) % P.length];
    const vp = vals[k];
    const vq = vals[(k + 1) % P.length];
    if (vp >= 0) out.push(p);
    if (vp >= 0 !== vq >= 0) {
      let a = p, b = q, va = vp, vb = vq;
      // Regla falsa; si un extremo cae fuera del dominio (−∞), bisección.
      for (let it = 0; it < 12; it++) {
        const t = Number.isFinite(va) && Number.isFinite(vb) ? va / (va - vb) : 0.5;
        const m = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
        const vm = v(m);
        if (vm >= 0 === va >= 0) [a, va] = [m, vm];
        else [b, vb] = [m, vm];
        if (Math.abs(vm) < 1e-12) break;
      }
      const I = va >= 0 ? a : b;
      out.push([I[0], I[1], vp >= 0 ? true : p[2]]);
    }
  }
  return out;
}

// Aristas marcadas como borde en las celdas recortadas.
function edges(cells) {
  const out = [];
  for (const P of cells)
    for (let k = 0; k < P.length; k++)
      if (P[k][2] === true) {
        const q = P[(k + 1) % P.length];
        if (Math.abs(P[k][0] - q[0]) + Math.abs(P[k][1] - q[1]) > 1e-12) out.push([[P[k][0], P[k][1]], [q[0], q[1]]]);
      }
  return out;
}

// Esquinas del contorno: puntos donde dos aristas de borde forman un ángulo
// marcado (ahí se dibuja una arista vertical del sólido).
function corners(E) {
  const at = new Map();
  const key = (p) => p[0].toFixed(6) + "," + p[1].toFixed(6);
  for (const [p, q] of E) {
    const d = norm3([q[0] - p[0], q[1] - p[1], 0]);
    for (const [pt, dir] of [[p, d], [q, [-d[0], -d[1], 0]]]) {
      const k = key(pt);
      if (!at.has(k)) at.set(k, { pt, dirs: [] });
      at.get(k).dirs.push(dir);
    }
  }
  const out = [];
  for (const { pt, dirs } of at.values()) {
    if (dirs.length !== 2) continue;
    const cos = dirs[0][0] * dirs[1][0] + dirs[0][1] * dirs[1][1];
    if (cos > -0.75) out.push(pt);
  }
  return out;
}

function centroid(cells, lift, w0) {
  let a = 0, b = 0, n = 0;
  for (const P of cells)
    for (const p of P) {
      a += p[0];
      b += p[1];
      n++;
    }
  return lift(a / n, b / n, w0);
}

// Segmentos de la curva de nivel 0 de una grilla (marching squares).
function contourSegs(g, M, at) {
  const out = [];
  const S = M + 1;
  for (let j = 0; j < M; j++)
    for (let i = 0; i < M; i++) {
      const v = [g[j * S + i], g[j * S + i + 1], g[(j + 1) * S + i + 1], g[(j + 1) * S + i]];
      if (!v.every(Number.isFinite)) continue;
      const c = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]];
      const pts = [];
      for (let e = 0; e < 4; e++) {
        const a = v[e];
        const b = v[(e + 1) % 4];
        if (a >= 0 !== b >= 0) {
          const t = a / (a - b);
          const [i0, j0] = c[e];
          const [i1, j1] = c[(e + 1) % 4];
          pts.push(at(i0 + (i1 - i0) * t, j0 + (j1 - j0) * t));
        }
      }
      for (let k = 0; k + 1 < pts.length; k += 2) out.push([pts[k], pts[k + 1]]);
    }
  return out;
}

function arrowHead(ctx, x1, y1, x2, y2, size) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - size * Math.cos(a - 0.38), y2 - size * Math.sin(a - 0.38));
  ctx.lineTo(x2 - size * Math.cos(a + 0.38), y2 - size * Math.sin(a + 0.38));
  ctx.closePath();
  ctx.fill();
}
