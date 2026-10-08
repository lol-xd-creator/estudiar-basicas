// Piezas compartidas por los gráficos 2D y 3D: colores del tema, etiquetas
// con fórmulas (MathJax), marcas de los ejes y la capa de controles.
import { mathHTML } from "./math.js";

// Colores del tema actual (variables --plot-* de themes.css).
export function themeColors() {
  const cs = getComputedStyle(document.documentElement);
  const get = (n, d) => parseColor(cs.getPropertyValue(n).trim() || d);
  return {
    palette: [1, 2, 3, 4, 5, 6, 7].map((i) => get(`--plot-${i}`, "#888888")),
    axis: get("--plot-axis", "#888888"),
    grid: get("--plot-grid", "#88888833"),
    text: get("--plot-text", "#cccccc"),
    bg: get("--plot-bg", "#000000"),
    low: get("--plot-low", "#2b7fa8"),
    mid: get("--plot-mid", "#34c76a"),
    high: get("--plot-high", "#e8d44d"),
    // Campo eléctrico: brillo y cargas positivas / negativas.
    flow: get("--flow", "#ffcf6b"),
    cpos: get("--carga-pos", "#e8746f"),
    cneg: get("--carga-neg", "#6fa8e8"),
    // Nombres de los ejes: la misma letra que el texto de las notas.
    serif: cs.getPropertyValue("--serif").trim() || "serif",
  };
}

// parseColor("#34c76a") → [r, g, b, a]
export function parseColor(s) {
  let m = s.match(/^#([\da-f]{3,8})$/i);
  if (m) {
    let h = m[1];
    if (h.length <= 4) h = [...h].map((c) => c + c).join("");
    const n = (i) => parseInt(h.slice(i, i + 2), 16);
    return [n(0), n(2), n(4), h.length === 8 ? n(6) / 255 : 1];
  }
  m = s.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const [r, g, b, a = 1] = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    return [r, g, b, a];
  }
  return [136, 136, 136, 1];
}

export const rgba = (c, a = c[3]) => `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${a})`;
export const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, 1];

const escHTML = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// renderLabel: texto con $fórmulas$ → HTML con marcadores de fórmula (los
// dibuja typesetMath una vez insertado).
export function renderLabel(text) {
  return String(text)
    .split(/(\$[^$]+\$)/)
    .map((part) => (part.length > 2 && part.startsWith("$") && part.endsWith("$") ? mathHTML(part.slice(1, -1), false) : escHTML(part)))
    .join("");
}

// Fórmulas que aparecen en las etiquetas de un gráfico (para el HTML
// descargado, que las lleva ya dibujadas).
export const labelFormulas = (text) => (String(text).match(/\$[^$]+\$/g) || []).map((m) => m.slice(1, -1));

// niceStep: paso "redondo" (1, 2, 5 × 10^k) para ~n marcas en span.
export function niceStep(span, n) {
  const raw = span / Math.max(1, n);
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  const f = raw / p;
  return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * p;
}

export function ticks(a, b, n) {
  const step = niceStep(b - a, n);
  const out = [];
  for (let v = Math.ceil(a / step) * step; v <= b + step * 1e-9; v += step) out.push(Math.abs(v) < step * 1e-9 ? 0 : v);
  return out;
}

export const fmtTick = (v) => {
  const s = Number(v.toPrecision(6)).toString();
  return s.replace("-", "−");
};

// Marcas en múltiplos de π/2 (o π/4): "π/2", "π", "3π/2".
export function piTicks(a, b) {
  const q = (b - a) / Math.PI > 6 ? 1 : (b - a) / Math.PI > 2 ? 2 : 4;
  const step = Math.PI / q;
  const out = [];
  for (let k = Math.ceil(a / step); k * step <= b + 1e-9; k++) {
    if (k === 0) {
      out.push([0, "0"]);
      continue;
    }
    const g = gcd(Math.abs(k), q);
    const num = k / g;
    const den = q / g;
    const n = num === 1 ? "π" : num === -1 ? "−π" : `${String(num).replace("-", "−")}π`;
    out.push([k * step, den === 1 ? n : `${n}/${den}`]);
  }
  return out;
}
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

// Controles que aparecen al pasar el mouse sobre el gráfico.
export function toolbar(fig, actions) {
  const bar = document.createElement("div");
  bar.className = "plot-tools";
  for (const [label, title, fn] of actions) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.title = title;
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      fn();
    });
    bar.append(b);
  }
  fig.append(bar);
  return bar;
}

export function fullscreenToggle(fig, onChange) {
  return () => {
    if (document.fullscreenElement === fig) document.exitFullscreen();
    else fig.requestFullscreen?.().then(onChange, () => {});
  };
}

// Mensajes de error de la especificación, con su renglón.
export function errorBox(errors) {
  const box = document.createElement("div");
  box.className = "plot-errors";
  box.innerHTML = errors.map((e) => `<div><b>Renglón ${e.line}:</b> ${escHTML(e.msg)}</div>`).join("");
  return box;
}

// Rango del parámetro de una curva: el del ítem, el global o el por defecto.
export const rangeOf = (item, opts, keys, def) => {
  for (const k of keys) if (item.ranges?.[k]) return item.ranges[k];
  for (const k of keys) if (opts.ranges[k]) return opts.ranges[k];
  return def;
};
