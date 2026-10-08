// Gráficos en R²: curvas explícitas, implícitas, polares y paramétricas,
// regiones definidas por desigualdades, puntos, segmentos, polígonos y
// textos. Se dibuja en un <canvas>; las etiquetas (con fórmulas) van en una
// capa HTML encima. Arrastrar mueve, Ctrl+ruedita acerca, doble clic vuelve.
import { themeColors, rgba, renderLabel, ticks, fmtTick, piTicks, toolbar, fullscreenToggle, errorBox, rangeOf } from "./plotcommon.js";
import { typesetMath } from "./math.js";

const TAU = Math.PI * 2;
const CURVES = new Set(["fx", "fy", "polar", "implicit", "param"]);

export class Plot2D {
  constructor(fig, spec) {
    this.fig = fig;
    this.spec = spec;
    this.sc = { x: 0, y: 0, t: 0, r: 0, th: 0 };
    this.labels = new Map(); // caché de etiquetas renderizadas
    if (spec.errors.length) fig.append(errorBox(spec.errors));
    this.stage = el("div", "plot-stage");
    this.canvas = el("canvas", "plot-canvas");
    this.layer = el("div", "plot-layer");
    this.readout = el("div", "plot-readout");
    this.stage.append(this.canvas, this.layer, this.readout);
    fig.append(this.stage);
    toolbar(this.stage, [
      ["+", "Acercar (Ctrl+ruedita)", () => this.zoom(0.7)],
      ["−", "Alejar", () => this.zoom(1 / 0.7)],
      ["⟲", "Vista inicial (doble clic)", () => this.reset()],
      ["⛶", "Pantalla completa", fullscreenToggle(fig, () => this.resize())],
    ]);
    this.base = this.initialView();
    this.touched = false;
    this.bind();
    this.resize();
  }

  // ---------- vista ----------

  initialView() {
    const { opts, items } = this.spec;
    const R = opts.ranges;
    const sc = this.sc;
    const bx = [Infinity, -Infinity];
    const by = [Infinity, -Infinity];
    const add = (x, y) => {
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;
      if (x < bx[0]) bx[0] = x;
      if (x > bx[1]) bx[1] = x;
      if (y < by[0]) by[0] = y;
      if (y > by[1]) by[1] = y;
    };
    for (const it of items) {
      if (it.kind === "point" || it.kind === "text") add(...it.p);
      else if (it.kind === "segment") (add(...it.a), add(...it.b));
      else if (it.kind === "polygon") it.pts.forEach((p) => add(...p));
      else if (it.kind === "param" || it.kind === "polar") {
        const [a, b] = it.kind === "param" ? rangeOf(it, opts, ["t"], [0, TAU]) : rangeOf(it, opts, ["th", "t"], [0, TAU]);
        for (let k = 0; k <= 400; k++) {
          const t = a + ((b - a) * k) / 400;
          if (it.kind === "param") {
            sc.t = t;
            add(it.fx(sc), it.fy(sc));
          } else {
            sc.th = sc.t = t;
            const r = it.f(sc);
            add(r * Math.cos(t), r * Math.sin(t));
          }
        }
      }
    }
    // Regiones y curvas implícitas: un barrido grueso para encuadrarlas.
    const scan = items.filter((it) => it.kind === "region" || it.kind === "implicit");
    if (scan.length) {
      const sx = R.x || [-10, 10];
      const sy = R.y || [-10, 10];
      const N = 160;
      for (const it of scan) {
        const val = it.kind === "region" ? this.regionFn(it) : (x, y) => ((sc.x = x), (sc.y = y), it.F(sc));
        let prevRow = null;
        for (let j = 0; j <= N; j++) {
          const y = sy[0] + ((sy[1] - sy[0]) * j) / N;
          const row = new Float64Array(N + 1);
          for (let i = 0; i <= N; i++) {
            const x = sx[0] + ((sx[1] - sx[0]) * i) / N;
            const v = val(x, y);
            row[i] = v;
            if (it.kind === "region") {
              if (v >= 0) add(x, y);
            } else if (i && (v >= 0) !== (row[i - 1] >= 0) && Number.isFinite(v) && Number.isFinite(row[i - 1])) add(x, y);
            else if (prevRow && (v >= 0) !== (prevRow[i] >= 0) && Number.isFinite(v) && Number.isFinite(prevRow[i])) add(x, y);
          }
          prevRow = row;
        }
      }
    }
    let xr = R.x;
    let yr = R.y;
    const autoX = !xr;
    const autoY = !yr;
    if (!xr) {
      const doms = items.filter((it) => it.kind === "fx" && it.ranges?.x).map((it) => it.ranges.x);
      xr = Number.isFinite(bx[0]) ? [bx[0], bx[1]] : doms.length ? [Math.min(...doms.map((d) => d[0])), Math.max(...doms.map((d) => d[1]))] : [-5, 5];
      if (xr[1] - xr[0] < 2) xr = [(xr[0] + xr[1]) / 2 - 2, (xr[0] + xr[1]) / 2 + 2];
    }
    if (!yr) {
      const ys = [];
      for (const it of items.filter((i) => i.kind === "fx")) {
        const [a, b] = it.ranges?.x ? [Math.max(xr[0], it.ranges.x[0]), Math.min(xr[1], it.ranges.x[1])] : xr;
        for (let k = 0; k <= 300; k++) {
          sc.x = a + ((b - a) * k) / 300;
          const y = it.f(sc);
          if (Number.isFinite(y)) ys.push(y);
        }
      }
      if (ys.length) {
        ys.sort((p, q) => p - q);
        const lo = ys[Math.floor(ys.length * 0.02)];
        const hi = ys[Math.ceil(ys.length * 0.98) - 1];
        by[0] = Math.min(by[0], lo);
        by[1] = Math.max(by[1], hi);
      }
      yr = Number.isFinite(by[0]) ? [by[0], by[1]] : [-5, 5];
      if (yr[1] - yr[0] < 1e-9) yr = [yr[0] - 1, yr[1] + 1];
    }
    // x = g(y): con el rango de y ya conocido, ampliar el de x.
    if (autoX) {
      for (const it of items.filter((i) => i.kind === "fy")) {
        for (let k = 0; k <= 300; k++) {
          sc.y = yr[0] + ((yr[1] - yr[0]) * k) / 300;
          const x = it.f(sc);
          if (Number.isFinite(x)) xr = [Math.min(xr[0], x), Math.max(xr[1], x)];
        }
      }
    }
    const finish = (r, auto) => {
      if (!auto) return r;
      let [a, b] = r;
      const span = b - a;
      if (a > 0 && a < span * 0.6) a = 0;
      if (b < 0 && -b < span * 0.6) b = 0;
      const pad = (b - a) * 0.08;
      return [a - pad, b + pad];
    };
    return { x: finish(xr, autoX), y: finish(yr, autoY) };
  }

  // Ajusta el alto del lienzo y, con escala igual, amplía un rango para que
  // un círculo se vea redondo.
  resize() {
    const full = Math.max(240, this.fig.clientWidth || 640);
    const { opts } = this.spec;
    const equal = opts.aspecto !== "libre";
    const maxH = document.fullscreenElement === this.fig ? window.innerHeight - 60 : opts.alto || 480;
    // Una figura alta y angosta con escala igual: se angosta el lienzo (como
    // una figura de libro) en vez de ensanchar el rango con espacio vacío.
    let W = full;
    if (equal) {
      const xs = this.base.x[1] - this.base.x[0];
      const ys = this.base.y[1] - this.base.y[0];
      if ((full * ys) / xs > maxH) W = Math.min(full, Math.max(full * 0.5, 300, (maxH * xs) / ys));
    }
    this.stage.style.width = W < full ? W + "px" : "";
    const fit = (v) => {
      const xs = v.x[1] - v.x[0];
      const ys = v.y[1] - v.y[0];
      let H = equal ? (W * ys) / xs : opts.alto || 340;
      H = Math.max(Math.min(220, maxH), Math.min(maxH, H));
      if (!equal) return { H, v };
      const s = Math.min(W / xs, H / ys);
      const cx = (v.x[0] + v.x[1]) / 2;
      const cy = (v.y[0] + v.y[1]) / 2;
      return { H, v: { x: [cx - W / s / 2, cx + W / s / 2], y: [cy - H / s / 2, cy + H / s / 2] } };
    };
    const { H, v } = fit(this.base);
    this.home = v;
    if (!this.touched || !this.view) this.view = structuredClone(v);
    else if (equal) {
      // Conservar centro y escala horizontal de la vista actual.
      const s = W / (this.view.x[1] - this.view.x[0]);
      const cy = (this.view.y[0] + this.view.y[1]) / 2;
      this.view.y = [cy - H / s / 2, cy + H / s / 2];
    }
    this.W = W;
    this.H = H;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.round(W * dpr);
    this.canvas.height = Math.round(H * dpr);
    this.canvas.style.height = H + "px";
    this.stage.style.height = H + "px";
    this.ctx = this.canvas.getContext("2d");
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.draw();
  }

  reset() {
    this.touched = false;
    this.view = structuredClone(this.home);
    this.draw();
  }

  zoom(f, px = this.W / 2, py = this.H / 2) {
    const v = this.view;
    const x = this.fromX(px);
    const y = this.fromY(py);
    v.x = [x + (v.x[0] - x) * f, x + (v.x[1] - x) * f];
    v.y = [y + (v.y[0] - y) * f, y + (v.y[1] - y) * f];
    this.touched = true;
    this.requestDraw();
  }

  sx(x) {
    return ((x - this.view.x[0]) / (this.view.x[1] - this.view.x[0])) * this.W;
  }
  sy(y) {
    return this.H - ((y - this.view.y[0]) / (this.view.y[1] - this.view.y[0])) * this.H;
  }
  fromX(px) {
    return this.view.x[0] + (px / this.W) * (this.view.x[1] - this.view.x[0]);
  }
  fromY(py) {
    return this.view.y[0] + ((this.H - py) / this.H) * (this.view.y[1] - this.view.y[0]);
  }

  bind() {
    const c = this.canvas;
    let drag = null;
    c.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      drag = { x: e.clientX, y: e.clientY, view: structuredClone(this.view) };
      c.setPointerCapture(e.pointerId);
      c.classList.add("is-dragging");
    });
    c.addEventListener("pointermove", (e) => {
      const r = c.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      if (drag) {
        const kx = (drag.view.x[1] - drag.view.x[0]) / this.W;
        const ky = (drag.view.y[1] - drag.view.y[0]) / this.H;
        const dx = (e.clientX - drag.x) * kx;
        const dy = (e.clientY - drag.y) * ky;
        this.view = { x: [drag.view.x[0] - dx, drag.view.x[1] - dx], y: [drag.view.y[0] + dy, drag.view.y[1] + dy] };
        this.touched = true;
        this.requestDraw();
      }
      const step = (this.view.x[1] - this.view.x[0]) / this.W;
      const d = Math.max(0, Math.min(4, -Math.floor(Math.log10(step))));
      this.readout.textContent = `(${this.fromX(px).toFixed(d)}; ${this.fromY(py).toFixed(d)})`.replace(/-/g, "−");
      this.readout.hidden = false;
    });
    const end = () => {
      drag = null;
      c.classList.remove("is-dragging");
    };
    c.addEventListener("pointerup", end);
    c.addEventListener("pointercancel", end);
    c.addEventListener("pointerleave", () => (this.readout.hidden = true));
    c.addEventListener("dblclick", () => this.reset());
    c.addEventListener(
      "wheel",
      (e) => {
        if (!e.ctrlKey && document.fullscreenElement !== this.fig) return;
        e.preventDefault();
        const r = c.getBoundingClientRect();
        this.zoom(Math.exp(e.deltaY * 0.0015), e.clientX - r.left, e.clientY - r.top);
      },
      { passive: false },
    );
    this.readout.hidden = true;
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
    const { ctx, W, H } = this;
    if (!ctx) return;
    const C = (this.C = themeColors());
    ctx.clearRect(0, 0, W, H);
    this.overlay = [];
    const items = this.spec.items;
    if (this.spec.opts.grilla) this.drawGrid();
    for (const it of items) if (it.kind === "region") this.drawRegion(it);
    for (const it of items) if (it.kind === "polygon") this.drawPolygon(it);
    if (this.spec.opts.ejes) this.drawAxes();
    for (const it of items) {
      if (it.kind === "fx" || it.kind === "fy") this.drawExplicit(it);
      else if (it.kind === "implicit") this.drawImplicit(it);
      else if (it.kind === "param" || it.kind === "polar") this.drawParam(it);
    }
    for (const it of items) {
      if (it.kind === "segment") this.drawSegment(it);
      else if (it.kind === "point") this.drawPoint(it);
      else if (it.kind === "text") this.overlay.push({ x: this.sx(it.p[0]), y: this.sy(it.p[1]), html: this.label(it.text), cls: "is-text", color: C.text });
    }
    this.renderOverlay(C);
  }

  color(it, a) {
    const c = it.color === null ? this.C.text : this.C.palette[it.color % this.C.palette.length];
    return rgba(c, a ?? 1);
  }

  lineStyle(it) {
    const { ctx } = this;
    ctx.lineWidth = it.style.has("thick") ? 3 : it.style.has("thin") ? 1.2 : 2;
    ctx.setLineDash(it.style.has("dashed") ? [7, 5] : []);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
  }

  drawGrid() {
    const { ctx, W, H, C } = this;
    ctx.save();
    ctx.strokeStyle = rgba(C.grid);
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const x of this.xTicks()) {
      const px = Math.round(this.sx(x[0])) + 0.5;
      ctx.moveTo(px, 0);
      ctx.lineTo(px, H);
    }
    for (const y of ticks(this.view.y[0], this.view.y[1], H / 70)) {
      const py = Math.round(this.sy(y)) + 0.5;
      ctx.moveTo(0, py);
      ctx.lineTo(W, py);
    }
    ctx.stroke();
    ctx.restore();
  }

  xTicks() {
    const [a, b] = this.view.x;
    if (this.spec.opts.marcas === "pi") return piTicks(a, b);
    return ticks(a, b, this.W / 80).map((v) => [v, fmtTick(v)]);
  }

  drawAxes() {
    const { ctx, W, H, C } = this;
    const ox = Math.min(W - 1, Math.max(0, this.sx(0)));
    const oy = Math.min(H - 1, Math.max(0, this.sy(0)));
    const xIn = this.sy(0) >= 0 && this.sy(0) <= H;
    const yIn = this.sx(0) >= 0 && this.sx(0) <= W;
    ctx.save();
    ctx.strokeStyle = ctx.fillStyle = rgba(C.axis);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    if (xIn) (ctx.moveTo(0, oy), ctx.lineTo(W - 2, oy));
    if (yIn) (ctx.moveTo(ox, H), ctx.lineTo(ox, 2));
    ctx.stroke();
    if (xIn) arrow(ctx, W - 10, oy, W - 1, oy);
    if (yIn) arrow(ctx, ox, 10, ox, 1);
    // Marcas y números
    ctx.font = "11px system-ui, sans-serif";
    ctx.fillStyle = rgba(C.text, 0.75);
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const ty = xIn ? Math.min(H - 14, oy + 5) : H - 14;
    for (const [x, label] of this.xTicks()) {
      const px = this.sx(x);
      if (x === 0 || px < 12 || px > W - 18) continue;
      if (xIn) ctx.fillRect(Math.round(px), oy - 3, 1, 6);
      ctx.fillText(label, px, ty);
    }
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    const tx = yIn ? Math.max(24, ox - 6) : 28;
    for (const y of ticks(this.view.y[0], this.view.y[1], H / 70)) {
      const py = this.sy(y);
      if (y === 0 || py < 14 || py > H - 10) continue;
      if (yIn) ctx.fillRect(ox - 3, Math.round(py), 6, 1);
      ctx.fillText(fmtTick(y), tx, py);
    }
    if (xIn && yIn) {
      ctx.textAlign = "right";
      ctx.textBaseline = "top";
      ctx.fillText("0", ox - 5, oy + 4);
    }
    // Nombres de los ejes
    ctx.font = `italic 16px ${C.serif}`;
    ctx.fillStyle = rgba(C.text, 0.9);
    if (xIn) {
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";
      ctx.fillText("x", W - 4, oy - 6);
    }
    if (yIn) {
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("y", ox + 7, 2);
    }
    ctx.restore();
  }

  drawExplicit(it) {
    const { ctx, sc, H } = this;
    const vert = it.kind === "fy"; // x = g(y)
    const view = vert ? this.view.y : this.view.x;
    const dom = vert ? it.ranges?.y : it.ranges?.x;
    const a = dom ? Math.max(view[0], dom[0]) : view[0];
    const b = dom ? Math.min(view[1], dom[1]) : view[1];
    if (!(b > a)) return;
    const pxLen = vert ? Math.abs(this.sy(a) - this.sy(b)) : this.sx(b) - this.sx(a);
    const n = Math.max(2, Math.ceil(pxLen));
    const LIM = H * 20;
    const ev = (s) => {
      if (vert) sc.y = s;
      else sc.x = s;
      return it.f(sc);
    };
    const toPx = (s, v) => (vert ? [this.sx(v), this.sy(s)] : [this.sx(s), this.sy(v)]);
    ctx.save();
    this.lineStyle(it);
    ctx.strokeStyle = this.color(it);
    ctx.beginPath();
    let prev = null;
    for (let k = 0; k <= n; k++) {
      const s = a + ((b - a) * k) / n;
      const v = ev(s);
      if (!Number.isFinite(v)) {
        prev = null;
        continue;
      }
      let [px, py] = toPx(s, v);
      const along = vert ? px : py;
      if (prev) {
        const jump = Math.abs(along - prev.along);
        if (jump > H * 0.8) {
          // ¿Asíntota o solo una curva empinada? Mirar el punto medio.
          const mid = ev((s + prev.s) / 2);
          const lo = Math.min(v, prev.v);
          const hi = Math.max(v, prev.v);
          if (!(mid >= lo && mid <= hi)) {
            prev = null;
          }
        }
      }
      px = Math.max(-LIM, Math.min(LIM, px));
      py = Math.max(-LIM, Math.min(LIM, py));
      if (prev) ctx.lineTo(px, py);
      else ctx.moveTo(px, py);
      prev = { s, v, along };
    }
    ctx.stroke();
    ctx.restore();
  }

  drawParam(it) {
    const { ctx, sc, opts } = { ctx: this.ctx, sc: this.sc, opts: this.spec.opts };
    const polar = it.kind === "polar";
    const [a, b] = polar ? rangeOf(it, opts, ["th", "t"], [0, TAU]) : rangeOf(it, opts, ["t"], [0, TAU]);
    const n = 900;
    ctx.save();
    this.lineStyle(it);
    ctx.strokeStyle = this.color(it);
    ctx.beginPath();
    let pen = false;
    for (let k = 0; k <= n; k++) {
      const t = a + ((b - a) * k) / n;
      let x, y;
      if (polar) {
        sc.th = sc.t = t;
        const r = it.f(sc);
        x = r * Math.cos(t);
        y = r * Math.sin(t);
      } else {
        sc.t = t;
        x = it.fx(sc);
        y = it.fy(sc);
      }
      if (!Number.isFinite(x) || !Number.isFinite(y)) {
        pen = false;
        continue;
      }
      if (pen) ctx.lineTo(this.sx(x), this.sy(y));
      else ctx.moveTo(this.sx(x), this.sy(y));
      pen = true;
    }
    ctx.stroke();
    ctx.restore();
  }

  // Marching squares sobre F(x, y) = 0.
  drawImplicit(it) {
    const { ctx, sc, W, H } = this;
    const cs = 3;
    const nx = Math.ceil(W / cs);
    const ny = Math.ceil(H / cs);
    const g = this.grid(nx, ny, cs, (x, y) => ((sc.x = x), (sc.y = y), it.F(sc)));
    ctx.save();
    this.lineStyle(it);
    ctx.strokeStyle = this.color(it);
    ctx.beginPath();
    contour(g, nx, ny, cs, ctx);
    ctx.stroke();
    ctx.restore();
  }

  grid(nx, ny, cs, f) {
    const g = new Float64Array((nx + 1) * (ny + 1));
    for (let j = 0; j <= ny; j++) {
      const y = this.fromY(j * cs);
      for (let i = 0; i <= nx; i++) g[j * (nx + 1) + i] = f(this.fromX(i * cs), y);
    }
    return g;
  }

  // m(x, y) = mínimo de las condiciones (≥ 0 adentro). Con r y θ, θ se prueba
  // en [0, 2π) y en [−2π, 0) para que no aparezca un corte sobre el eje x.
  regionFn(it) {
    const sc = this.sc;
    const conds = it.conds;
    const minc = () => {
      let m = Infinity;
      for (const c of conds) {
        const v = c(sc);
        if (v !== v) return -1;
        if (v < m) m = v;
      }
      return m;
    };
    if (!it.polar) return (x, y) => ((sc.x = x), (sc.y = y), minc());
    return (x, y) => {
      sc.x = x;
      sc.y = y;
      sc.r = Math.hypot(x, y);
      let th = Math.atan2(y, x);
      if (th < 0) th += TAU;
      sc.th = th;
      const m1 = minc();
      sc.th = th - TAU;
      return Math.max(m1, minc());
    };
  }

  drawRegion(it) {
    const { ctx, W, H } = this;
    const cs = 3;
    const nx = Math.ceil(W / cs);
    const ny = Math.ceil(H / cs);
    const g = this.grid(nx, ny, cs, this.regionFn(it));
    const path = new Path2D();
    let sumX = 0;
    let sumY = 0;
    let count = 0;
    const N = nx + 1;
    for (let j = 0; j < ny; j++) {
      let run = -1; // inicio de una tira de celdas completas
      for (let i = 0; i <= nx; i++) {
        const full = i < nx && g[j * N + i] >= 0 && g[j * N + i + 1] >= 0 && g[(j + 1) * N + i] >= 0 && g[(j + 1) * N + i + 1] >= 0;
        if (full) {
          if (run < 0) run = i;
          sumX += i;
          sumY += j;
          count++;
          continue;
        }
        if (run >= 0) {
          path.rect(run * cs, j * cs, (i - run) * cs, cs);
          run = -1;
        }
        if (i === nx) break;
        const P = clipPoly([
          [i * cs, j * cs, g[j * N + i]],
          [(i + 1) * cs, j * cs, g[j * N + i + 1]],
          [(i + 1) * cs, (j + 1) * cs, g[(j + 1) * N + i + 1]],
          [i * cs, (j + 1) * cs, g[(j + 1) * N + i]],
        ]);
        if (P.length > 2) {
          path.moveTo(P[0][0], P[0][1]);
          for (let k = 1; k < P.length; k++) path.lineTo(P[k][0], P[k][1]);
          path.closePath();
        }
      }
    }
    ctx.save();
    ctx.fillStyle = this.color(it, 0.26);
    if (it.style.has("hatch")) {
      ctx.fillStyle = this.color(it, 0.07);
      ctx.fill(path);
      ctx.fillStyle = hatch(ctx, this.color(it, 0.75));
    }
    ctx.fill(path);
    ctx.strokeStyle = this.color(it, 0.85);
    ctx.lineWidth = 1.3;
    ctx.setLineDash(it.style.has("dashed") ? [6, 4] : []);
    ctx.beginPath();
    contour(g, nx, ny, cs, ctx);
    ctx.stroke();
    ctx.restore();
    if (it.label && count) {
      // Etiqueta en el centro de la región (o en la celda más cercana adentro).
      let cx = sumX / count;
      let cy = sumY / count;
      const at = (i, j) => g[Math.round(j) * N + Math.round(i)] >= 0;
      if (!at(cx, cy)) {
        let best = Infinity;
        for (let j = 0; j < ny; j += 2)
          for (let i = 0; i < nx; i += 2)
            if (g[j * N + i] >= 0) {
              const d = (i - cx) ** 2 + (j - cy) ** 2;
              if (d < best) [best, cx, cy] = [d, i, j];
            }
      }
      this.overlay.push({ x: (cx + 0.5) * cs, y: (cy + 0.5) * cs, html: this.label(it.label), cls: "is-region", color: this.color(it) });
    }
  }

  drawPolygon(it) {
    const { ctx } = this;
    ctx.save();
    ctx.beginPath();
    it.pts.forEach(([x, y], k) => (k ? ctx.lineTo(this.sx(x), this.sy(y)) : ctx.moveTo(this.sx(x), this.sy(y))));
    ctx.closePath();
    ctx.fillStyle = it.style.has("hatch") ? hatch(ctx, this.color(it, 0.7)) : this.color(it, 0.2);
    ctx.fill();
    this.lineStyle(it);
    ctx.strokeStyle = this.color(it);
    ctx.stroke();
    ctx.restore();
    if (it.label) {
      const cx = it.pts.reduce((s, p) => s + p[0], 0) / it.pts.length;
      const cy = it.pts.reduce((s, p) => s + p[1], 0) / it.pts.length;
      this.overlay.push({ x: this.sx(cx), y: this.sy(cy), html: this.label(it.label), cls: "is-region", color: this.color(it) });
    }
  }

  drawSegment(it) {
    const { ctx } = this;
    const [x1, y1] = [this.sx(it.a[0]), this.sy(it.a[1])];
    const [x2, y2] = [this.sx(it.b[0]), this.sy(it.b[1])];
    ctx.save();
    this.lineStyle(it);
    ctx.strokeStyle = ctx.fillStyle = this.color(it);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    if (it.style.has("arrow")) {
      ctx.setLineDash([]);
      arrow(ctx, x1, y1, x2, y2, 11);
    }
    ctx.restore();
    if (it.label) this.overlay.push({ x: (x1 + x2) / 2, y: (y1 + y2) / 2, html: this.label(it.label), cls: "is-point", color: this.color(it) });
  }

  drawPoint(it) {
    const { ctx, C } = this;
    const x = this.sx(it.p[0]);
    const y = this.sy(it.p[1]);
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 4.2, 0, TAU);
    ctx.fillStyle = this.color(it);
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = rgba(C.bg);
    ctx.stroke();
    ctx.restore();
    if (it.label) this.overlay.push({ x, y, html: this.label(it.label), cls: "is-point", color: this.color(it) });
  }

  label(text) {
    if (!this.labels.has(text)) this.labels.set(text, renderLabel(text));
    return this.labels.get(text);
  }

  renderOverlay(C) {
    const frag = document.createDocumentFragment();
    for (const o of this.overlay) {
      const d = el("div", "plot-label " + o.cls);
      d.innerHTML = o.html;
      d.style.left = o.x + "px";
      d.style.top = o.y + "px";
      d.style.color = o.color;
      frag.append(d);
    }
    const curves = this.spec.items.filter((it) => CURVES.has(it.kind) && it.label);
    if (curves.length && this.spec.opts.leyenda) {
      const box = el("div", "plot-legend");
      for (const it of curves) {
        const row = el("div", "plot-legend-row");
        const sw = el("span", "plot-swatch" + (it.style.has("dashed") ? " is-dashed" : ""));
        sw.style.borderColor = this.color(it);
        const lab = el("span", "");
        lab.innerHTML = this.label(it.label);
        row.append(sw, lab);
        box.append(row);
      }
      frag.append(box);
    }
    this.layer.replaceChildren(frag);
    typesetMath(this.layer);
  }
}

// ---------- utilidades de dibujo ----------

function el(tag, cls) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  return e;
}

function arrow(ctx, x1, y1, x2, y2, size = 9) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - size * Math.cos(a - 0.38), y2 - size * Math.sin(a - 0.38));
  ctx.lineTo(x2 - size * Math.cos(a + 0.38), y2 - size * Math.sin(a + 0.38));
  ctx.closePath();
  ctx.fill();
}

const patterns = new Map();
function hatch(ctx, color) {
  if (patterns.has(color)) return patterns.get(color);
  const c = document.createElement("canvas");
  const dpr = window.devicePixelRatio || 1;
  const s = Math.round(9 * dpr);
  c.width = c.height = s;
  const g = c.getContext("2d");
  g.strokeStyle = color;
  g.lineWidth = 1.3 * dpr;
  g.beginPath();
  for (const o of [-s, 0, s]) {
    g.moveTo(o, s);
    g.lineTo(o + s, 0);
  }
  g.stroke();
  const p = ctx.createPattern(c, "repeat");
  p.setTransform?.(new DOMMatrix().scale(1 / dpr));
  patterns.set(color, p);
  return p;
}

// Recorta un polígono [x, y, valor] a la parte con valor ≥ 0.
export function clipPoly(pts) {
  const out = [];
  for (let k = 0; k < pts.length; k++) {
    const P = pts[k];
    const Q = pts[(k + 1) % pts.length];
    const pin = P[2] >= 0;
    if (pin) out.push(P);
    if (pin !== Q[2] >= 0) {
      const t = P[2] / (P[2] - Q[2]);
      out.push([P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t, 0]);
    }
  }
  return out;
}

// Curva de nivel 0 de una grilla (marching squares), agregada al path de ctx.
function contour(g, nx, ny, cs, ctx) {
  const N = nx + 1;
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const v0 = g[j * N + i];
      const v1 = g[j * N + i + 1];
      const v2 = g[(j + 1) * N + i + 1];
      const v3 = g[(j + 1) * N + i];
      if (!(Number.isFinite(v0) && Number.isFinite(v1) && Number.isFinite(v2) && Number.isFinite(v3))) continue;
      const pts = [];
      const edge = (va, vb, xa, ya, xb, yb) => {
        if (va >= 0 !== vb >= 0) {
          const t = va / (va - vb);
          pts.push(xa + (xb - xa) * t, ya + (yb - ya) * t);
        }
      };
      const x = i * cs;
      const y = j * cs;
      edge(v0, v1, x, y, x + cs, y);
      edge(v1, v2, x + cs, y, x + cs, y + cs);
      edge(v2, v3, x + cs, y + cs, x, y + cs);
      edge(v3, v0, x, y + cs, x, y);
      for (let k = 0; k + 3 < pts.length; k += 4) {
        ctx.moveTo(pts[k], pts[k + 1]);
        ctx.lineTo(pts[k + 2], pts[k + 3]);
      }
    }
  }
}
