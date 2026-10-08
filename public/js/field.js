// Campo eléctrico para los gráficos 2D: líneas de campo de cargas puntuales
// y placas (o de un campo dado por fórmulas) y el brillo animado que las
// recorre en el sentido del campo, más rápido donde el campo es más intenso.

// Campo de un conjunto de cargas (k = 1): E = Σ q (r − rᵢ) / |r − rᵢ|³.
// Cada placa se reparte en muchas cargas chicas a lo largo del segmento.
export function chargeSystem(items) {
  const charges = [];
  for (const it of items) {
    if (it.kind === "charge") charges.push({ x: it.p[0], y: it.p[1], q: it.q, item: it });
    if (it.kind === "plate") {
      const K = 40;
      for (let k = 0; k < K; k++) {
        const t = (k + 0.5) / K;
        charges.push({ x: it.a[0] + (it.b[0] - it.a[0]) * t, y: it.a[1] + (it.b[1] - it.a[1]) * t, q: it.q / K * 6, item: it });
      }
    }
  }
  const E = (x, y) => {
    let ex = 0;
    let ey = 0;
    for (const c of charges) {
      const dx = x - c.x;
      const dy = y - c.y;
      const r2 = dx * dx + dy * dy + 1e-9;
      const f = c.q / (r2 * Math.sqrt(r2));
      ex += f * dx;
      ey += f * dy;
    }
    return [ex, ey];
  };
  return { charges, E };
}

// Una línea de campo desde (x, y), siguiendo E (dir = 1) o −E (dir = −1).
// Para en el borde, cerca de una carga o donde el campo se anula.
function trace(E, x, y, dir, h, bounds, stop, maxSteps = 1600) {
  const pts = [[x, y]];
  const mag = [Math.hypot(...E(x, y))];
  const unit = (px, py) => {
    const [ex, ey] = E(px, py);
    const m = Math.hypot(ex, ey);
    return m < 1e-12 ? null : [(dir * ex) / m, (dir * ey) / m];
  };
  for (let s = 0; s < maxSteps; s++) {
    // Runge-Kutta de orden 4 sobre la dirección del campo.
    const k1 = unit(x, y);
    if (!k1) break;
    const k2 = unit(x + (h / 2) * k1[0], y + (h / 2) * k1[1]);
    if (!k2) break;
    const k3 = unit(x + (h / 2) * k2[0], y + (h / 2) * k2[1]);
    if (!k3) break;
    const k4 = unit(x + h * k3[0], y + h * k3[1]);
    if (!k4) break;
    x += (h / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
    y += (h / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
    pts.push([x, y]);
    mag.push(Math.hypot(...E(x, y)));
    if (x < bounds.x0 || x > bounds.x1 || y < bounds.y0 || y > bounds.y1) break;
    const hit = stop(x, y, s);
    if (hit) {
      if (hit !== true) hit.arrivals = (hit.arrivals || 0) + 1;
      break;
    }
  }
  return { pts, mag };
}

// Líneas de campo de las cargas y placas: salen de las positivas (tantas
// como su carga) y terminan en las negativas. Si a una negativa le llegan
// menos de las que le tocan, se completan desde ella (hacia atrás).
export function chargeLines(items, view, perUnit = 8) {
  const { charges, E } = chargeSystem(items);
  if (!charges.length) return [];
  const span = Math.max(view.x[1] - view.x[0], view.y[1] - view.y[0]);
  const h = span / 260;
  const r0 = span * 0.035;
  const pad = span * 0.6;
  const bounds = { x0: view.x[0] - pad, x1: view.x[1] + pad, y0: view.y[0] - pad, y1: view.y[1] + pad };
  const points = items.filter((it) => it.kind === "charge");
  const plates = items.filter((it) => it.kind === "plate");
  const distSeg = (x, y, a, b) => {
    const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
    const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(x - a[0] - t * dx, y - a[1] - t * dy);
  };
  // ¿Llegó a una carga (o placa) de otro signo que la de salida?
  const stopper = (sign) => (x, y, s) => {
    for (const c of points) if (Math.sign(c.q) !== sign && Math.hypot(x - c.p[0], y - c.p[1]) < r0 * 0.7) return c;
    for (const p of plates) if (Math.sign(p.q) !== sign && distSeg(x, y, p.a, p.b) < h * 1.5) return p;
    // Volver a pasar cerca de una del mismo signo también corta (después de salir).
    if (s > 10) for (const c of points) if (Math.sign(c.q) === sign && Math.hypot(x - c.p[0], y - c.p[1]) < r0 * 0.5) return true;
    return false;
  };
  const lines = [];
  const seeds = (sign) => {
    const out = [];
    for (const c of points.filter((c) => Math.sign(c.q) === sign)) {
      const need = Math.max(4, Math.min(40, Math.round(perUnit * Math.abs(c.q))));
      const n = sign > 0 ? need : need - (c.arrivals || 0);
      if (n <= 0) continue;
      for (let k = 0; k < n; k++) {
        const a = (2 * Math.PI * (k + 0.5)) / n;
        out.push([c.p[0] + r0 * Math.cos(a), c.p[1] + r0 * Math.sin(a)]);
      }
    }
    for (const p of plates.filter((p) => Math.sign(p.q) === sign)) {
      const [dx, dy] = [p.b[0] - p.a[0], p.b[1] - p.a[1]];
      const L = Math.hypot(dx, dy);
      const nx = -dy / L;
      const ny = dx / L;
      const n = Math.max(3, Math.round((L / span) * perUnit * 2.2 * Math.abs(p.q)));
      for (let k = 0; k < n; k++) {
        const t = (k + 0.5) / n;
        const [x, y] = [p.a[0] + dx * t, p.a[1] + dy * t];
        for (const side of [1, -1]) out.push([x + nx * side * h * 2, y + ny * side * h * 2]);
      }
    }
    return out;
  };
  for (const [x, y] of seeds(1)) {
    const l = trace(E, x, y, 1, h, bounds, stopper(1));
    if (l.pts.length > 3) lines.push(l);
  }
  // Negativas que todavía necesitan líneas: se trazan hacia atrás y se dan vuelta.
  for (const [x, y] of seeds(-1)) {
    const l = trace(E, x, y, -1, h, bounds, stopper(-1));
    if (l.pts.length > 3) lines.push({ pts: l.pts.reverse(), mag: l.mag.reverse() });
  }
  if (!plates.length) return lines;
  // Con placas, afuera del capacitor el campo es casi nulo (así lo toma la
  // teoría): esas líneas débiles no se dibujan.
  const mean = (l) => l.mag.reduce((s, m) => s + m, 0) / l.mag.length;
  const means = lines.map(mean).sort((a, b) => a - b);
  const median = means[Math.floor(means.length / 2)] || 0;
  return lines.filter((l) => mean(l) >= median * 0.25);
}

// Líneas de un campo dado por fórmulas: semillas en una grilla, cada línea
// se traza hacia adelante y hacia atrás y no entra en celdas ya ocupadas
// (así quedan parejas, sin amontonarse).
export function formulaLines(item, view, sc) {
  const E = (x, y) => {
    sc.x = x;
    sc.y = y;
    if (item.on && !item.on.every((c) => c(sc) >= 0)) return [0, 0];
    return [item.fx(sc), item.fy(sc)];
  };
  const [x0, x1] = view.x;
  const [y0, y1] = view.y;
  const span = Math.max(x1 - x0, y1 - y0);
  const h = span / 200;
  const cell = span / 16;
  const cols = Math.ceil((x1 - x0) / cell) + 1;
  const used = new Set();
  const cellOf = (x, y) => `${Math.floor((x - x0) / cell)},${Math.floor((y - y0) / cell)}`;
  const bounds = { x0, x1, y0, y1 };
  const lines = [];
  for (let j = 0; (j + 0.5) * cell < y1 - y0; j++) {
    for (let i = 0; i < cols; i++) {
      const x = x0 + (i + 0.5) * cell;
      const y = y0 + (j + 0.5) * cell;
      if (used.has(cellOf(x, y))) continue;
      const mine = new Set();
      const stop = (px, py, s) => {
        // Una línea cerrada (un remolino) se corta al completar la vuelta.
        if (s > 20 && Math.hypot(px - x, py - y) < h * 1.5) return true;
        const c = cellOf(px, py);
        if (used.has(c) && !mine.has(c)) return true;
        mine.add(c);
        return false;
      };
      const fw = trace(E, x, y, 1, h, bounds, stop, 400);
      const bw = trace(E, x, y, -1, h, bounds, stop, 400);
      const pts = [...bw.pts.reverse(), ...fw.pts.slice(1)];
      const mag = [...bw.mag.reverse(), ...fw.mag.slice(1)];
      if (pts.length < 8) continue;
      for (const c of mine) used.add(c);
      lines.push({ pts, mag });
    }
  }
  return lines;
}

// ---------- brillo animado ----------

// Pulsos de luz que recorren líneas (en píxeles) a la velocidad de cada
// tramo. Se pausa solo cuando el gráfico no está a la vista.
export class FlowAnimator {
  constructor(canvas, host) {
    this.canvas = canvas;
    this.lines = [];
    this.paused = matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.visible = false;
    this.last = 0;
    this.io = new IntersectionObserver((entries) => {
      this.visible = entries.some((e) => e.isIntersecting);
      this.kick();
    });
    this.io.observe(host);
  }

  // lines: [{ pts: [[px, py]…], speed: [px/s por vértice] }]
  setLines(lines, color, additive) {
    this.color = color;
    this.additive = additive;
    this.lines = lines.map((l) => {
      const cum = [0];
      for (let k = 1; k < l.pts.length; k++) cum.push(cum[k - 1] + Math.hypot(l.pts[k][0] - l.pts[k - 1][0], l.pts[k][1] - l.pts[k - 1][1]));
      const L = cum[cum.length - 1];
      // Las líneas muy cortas no llevan brillo (se amontonaría en un punto).
      const n = L < 60 ? 0 : Math.max(1, Math.floor(L / 110));
      // Arranques escalonados para que los pulsos no vayan todos parejos.
      const pulses = Array.from({ length: n }, (_, k) => ((k + Math.random() * 0.6) * L) / n);
      return { ...l, cum, L, pulses };
    });
    this.kick();
  }

  setPaused(p) {
    this.paused = p;
    if (p) this.clear();
    this.kick();
  }

  kick() {
    if (this.raf || this.paused || !this.visible || !this.lines.length) return;
    this.last = performance.now();
    this.raf = requestAnimationFrame((t) => this.frame(t));
  }

  clear() {
    const c = this.canvas;
    c.getContext("2d").clearRect(0, 0, c.width, c.height);
  }

  at(l, s) {
    let lo = 0;
    let hi = l.cum.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (l.cum[mid] <= s) lo = mid;
      else hi = mid;
    }
    const seg = l.cum[hi] - l.cum[lo] || 1;
    const t = (s - l.cum[lo]) / seg;
    const [a, b] = [l.pts[lo], l.pts[hi]];
    return { x: a[0] + (b[0] - a[0]) * t, y: a[1] + (b[1] - a[1]) * t, v: l.speed[lo] + (l.speed[hi] - l.speed[lo]) * t };
  }

  frame(t) {
    this.raf = 0;
    if (this.paused || !this.visible || !this.canvas.isConnected) return;
    const dt = Math.min(0.05, (t - this.last) / 1000);
    this.last = t;
    const ctx = this.canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.globalCompositeOperation = this.additive ? "lighter" : "source-over";
    ctx.lineCap = "round";
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 7;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2.6;
    for (const l of this.lines) {
      for (let k = 0; k < l.pulses.length; k++) {
        let s = l.pulses[k];
        const p = this.at(l, s);
        s += p.v * dt;
        if (s > l.L) s -= l.L;
        l.pulses[k] = s;
        // Estela corta detrás del pulso.
        const tail = this.at(l, Math.max(0, s - 12));
        const head = this.at(l, s);
        ctx.globalAlpha = Math.min(1, s / 20, (l.L - s) / 20);
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(head.x, head.y);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    this.raf = requestAnimationFrame((tt) => this.frame(tt));
  }
}
