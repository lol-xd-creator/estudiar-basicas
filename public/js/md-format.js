// Acciones de formato sobre el <textarea> del editor: envolver la selección
// (**negrita**, $fórmula$), prefijos de línea (# título, - lista), bloques
// (teorema, demostración, pasos, gráficos) y sangría. Los cambios pasan por
// insertText para que Ctrl+Z los deshaga como cualquier escritura.
//
// mathAt(texto, posición) dice en qué fórmula está el cursor (para la barra
// de fórmula y para insertar símbolos sin $ de más).

// replaceRange reemplaza [start, end) por text y deja seleccionado
// [selStart, selEnd) (relativo al inicio del reemplazo).
function replaceRange(ta, start, end, text, selStart = text.length, selEnd = selStart) {
  ta.focus();
  ta.setSelectionRange(start, end);
  if (!document.execCommand?.("insertText", false, text)) {
    ta.setRangeText(text, start, end, "end");
    ta.dispatchEvent(new Event("input", { bubbles: true }));
  }
  ta.setSelectionRange(start + selStart, start + selEnd);
}

// wrap envuelve la selección con before/after; si ya estaba envuelta, la
// desenvuelve. Sin selección inserta un texto de ejemplo seleccionado.
function wrap(ta, before, after, placeholder) {
  const { selectionStart: s, selectionEnd: e, value } = ta;
  const sel = value.slice(s, e);
  if (value.slice(s - before.length, s) === before && value.slice(e, e + after.length) === after) {
    replaceRange(ta, s - before.length, e + after.length, sel, 0, sel.length);
    return;
  }
  const inner = sel || placeholder;
  replaceRange(ta, s, e, before + inner + after, before.length, before.length + inner.length);
}

// lines aplica fn(línea, índice) a cada línea tocada por la selección.
function lines(ta, fn) {
  const { selectionStart: s, selectionEnd: e, value } = ta;
  const start = value.lastIndexOf("\n", s - 1) + 1;
  let end = value.indexOf("\n", e - (e > s && value[e - 1] === "\n" ? 1 : 0));
  if (end === -1) end = value.length;
  const out = value.slice(start, end).split("\n").map(fn).join("\n");
  replaceRange(ta, start, end, out, 0, out.length);
}

const PREFIX = /^(\s*)(#{1,6}\s+|[-*+]\s+\[[ xX]\]\s+|[-*+]\s+|\d+[.)]\s+|>\s?)/;

// setPrefix pone el prefijo en cada línea (reemplazando el que hubiera); si
// todas ya lo tenían, lo quita.
function setPrefix(ta, make) {
  const { selectionStart: s, selectionEnd: e, value } = ta;
  const start = value.lastIndexOf("\n", s - 1) + 1;
  const block = value.slice(start, Math.max(e, start)).split("\n");
  const all = block.every((l, i) => l.replace(/^\s*/, "").startsWith(make(i)));
  lines(ta, (l, i) => {
    const [, indent] = l.match(/^(\s*)/);
    const rest = l.replace(PREFIX, "$1").slice(indent.length);
    return all ? indent + rest : indent + make(i) + rest;
  });
}

// block inserta un bloque en su propio renglón; sel marca qué queda
// seleccionado dentro del texto insertado ([desde, hasta]).
function block(ta, text, sel) {
  const { selectionStart: s, selectionEnd: e, value } = ta;
  const pre = s > 0 && value[s - 1] !== "\n" ? "\n" : "";
  const post = value[e] && value[e] !== "\n" ? "\n" : "";
  const [a, b] = sel || [text.length, text.length];
  replaceRange(ta, s, e, pre + text + post, pre.length + a, pre.length + b);
}

// Plantillas de bloques. «¦» marca lo que queda seleccionado.
const BLOCKS = {
  teorema: "::: teorema ¦Nombre¦\nH) …\nT) …\n:::\n",
  definicion: "::: definicion ¦Nombre¦\n…\n:::\n",
  demostracion: "::: demostracion\n::: pasos\n¦A¦ = B   // por qué\n  = C   // por qué\n:::\n:::\n",
  idea: "::: idea\n¦En una frase: qué se hace y por qué funciona.¦\n:::\n",
  propiedades: "::: propiedades\n1. ¦…¦\n:::\n",
  ejemplo: "::: ejemplo ¦Enunciado¦\n…\n::: solucion\n…\n:::\n:::\n",
  ejercicio: "::: ejercicio ¦Enunciado¦\n…\n::: solucion\n…\n:::\n:::\n",
  solucion: "::: solucion\n¦…¦\n:::\n",
  resultado: "::: resultado\n$$\n¦A = B¦\n$$\n:::\n",
  observacion: "::: observacion\n¦…¦\n:::\n",
  claves: "::: claves\n- ¦…¦\n:::\n",
  ojo: "::: ojo\n¦…¦\n:::\n",
  aclaracion: "::: aclaracion\n¦…¦\n:::\n",
  pasos: "::: pasos\n¦A¦ = B   // por qué\n  = C   // por qué\n:::\n",
  plot2d:
    "```grafico\ntitulo: ¦Región $D$¦\ny = 5 - x^2\ny = -1 - x\n-1 - x <= y <= 5 - x^2 ; \"$D$\"\n```\n",
  plot3d:
    "```grafico3d\ntitulo: ¦Sólido sobre $D$¦\n0 <= z <= 4 - x^2 - y^2, x^2 + y^2 <= 4\n```\n",
  circuit:
    "```circuito\ntitulo: ¦Circuito en serie¦\nbateria (0,0) (0,2) ; 12\nR (0,2) (3,2) ; 4\nR (3,2) (3,0) ; 2\ncable (3,0) (0,0)\ncorriente (0.8,2) (1.4,2) ; \"$I$\"\n```\n",
};

function template(ta, name) {
  const raw = BLOCKS[name];
  const a = raw.indexOf("¦");
  const b = raw.indexOf("¦", a + 1) - 1;
  block(ta, raw.replace(/¦/g, ""), [a, b]);
}

export function applyFormat(ta, action) {
  const { selectionStart: s, selectionEnd: e, value } = ta;
  const sel = value.slice(s, e);
  switch (action) {
    case "bold":
      return wrap(ta, "**", "**", "texto en negrita");
    case "italic":
      return wrap(ta, "*", "*", "texto en cursiva");
    case "h2":
    case "h3":
      return setPrefix(ta, () => "#".repeat(Number(action[1])) + " ");
    case "ul":
      return setPrefix(ta, () => "- ");
    case "ol":
      return setPrefix(ta, (i) => `${i + 1}. `);
    case "math":
      return wrap(ta, "$", "$", "x");
    case "display":
      if (sel.includes("\n") || !sel) return block(ta, `$$\n${sel || "f(x)"}\n$$\n`, [3, 3 + (sel || "f(x)").length]);
      return block(ta, `$$\n${sel}\n$$\n`, [3, 3 + sel.length]);
    case "link": {
      const label = sel || "texto del link";
      const text = `[${label}](https://)`;
      return replaceRange(ta, s, e, text, label.length + 3, text.length - 1);
    }
    default:
      if (action in BLOCKS) {
        // Con texto seleccionado, el bloque lo envuelve.
        if (sel && !action.startsWith("plot") && action !== "circuit" && action !== "pasos") {
          const head = `::: ${action}\n`;
          return block(ta, `${head}${sel}\n:::\n`, [head.length, head.length + sel.length]);
        }
        return template(ta, action);
      }
  }
}

// insertSymbol escribe un comando de LaTeX; fuera de una fórmula lo envuelve
// en $…$. Los "a", "b", "x" de las plantillas quedan para reemplazar.
export function insertSymbol(ta, code) {
  const { selectionStart: s, selectionEnd: e, value } = ta;
  const inMath = !!mathAt(value, s);
  const text = inMath ? code : `$${code}$`;
  const off = inMath ? 0 : 1;
  replaceRange(ta, s, e, text, off + code.length, off + code.length);
}

// continueList maneja Enter dentro de una lista: el renglón nuevo empieza
// con el mismo prefijo (el número siguiente en las numeradas); Enter en un
// ítem vacío termina la lista. Devuelve true si se encargó del Enter.
export function continueList(ta) {
  const { selectionStart: s, selectionEnd: e, value } = ta;
  if (s !== e) return false;
  const start = value.lastIndexOf("\n", s - 1) + 1;
  const line = value.slice(start, s);
  const m = line.match(/^(\s*)([-*+]\s+\[[ xX]\]\s+|[-*+]\s+|(\d+)([.)])\s+|>\s?)(.*)$/);
  if (!m) return false;
  if (!m[5].trim()) {
    replaceRange(ta, start, s, "");
    return true;
  }
  let prefix = m[2];
  if (m[3]) prefix = `${Number(m[3]) + 1}${m[4]} `;
  else if (/\[[xX]\]/.test(prefix)) prefix = prefix.replace(/\[[xX]\]/, "[ ]");
  replaceRange(ta, s, s, `\n${m[1]}${prefix}`);
  return true;
}

// indent maneja Tab / Shift+Tab: sin selección de varias líneas inserta dos
// espacios; con varias líneas sangra o desangra todas.
export function indent(ta, outdent) {
  const { selectionStart: s, selectionEnd: e, value } = ta;
  if (!outdent && !value.slice(s, e).includes("\n")) {
    replaceRange(ta, s, e, "  ");
    return;
  }
  lines(ta, (l) => (outdent ? l.replace(/^( {1,2}|\t)/, "") : "  " + l));
}

// ---------- ¿dónde hay fórmulas? ----------

// mathSegments recorre el texto y devuelve las fórmulas con su posición:
// $…$, $$…$$, \(…\), \[…\] y cada renglón de un bloque ::: pasos.
export function mathSegments(text) {
  const segs = [];
  const n = text.length;
  let i = 0;
  let lineStart = true;
  let fence = null;
  let pasos = false;
  while (i < n) {
    if (lineStart) {
      const eol = text.indexOf("\n", i);
      const end = eol < 0 ? n : eol;
      const line = text.slice(i, end);
      const t = line.trim();
      const f = t.match(/^(`{3,}|~{3,})(.*)$/);
      if (f && (!fence || (f[1][0] === fence[0] && f[1].length >= fence.length && !f[2].trim()))) {
        fence = fence ? null : f[1];
        i = end + 1;
        continue;
      }
      if (fence) {
        i = end + 1;
        continue;
      }
      if (/^:{3,}\s*pasos\b/i.test(t)) {
        pasos = true;
        i = end + 1;
        continue;
      }
      if (pasos) {
        if (/^:{3,}$/.test(t)) pasos = false;
        else if (t && !t.startsWith("//")) {
          const m = line.match(/(^|[^:])\/\/(.*)$/);
          const stop = m ? i + m.index + m[1].length : end;
          segs.push({ start: i, end: stop, display: true, pasos: true, src: text.slice(i, stop) });
        }
        i = end + 1;
        continue;
      }
      lineStart = false;
    }
    const c = text[i];
    if (c === "\n") {
      lineStart = true;
      i++;
    } else if (c === "\\") {
      const nx = text[i + 1];
      if (nx === "[" || nx === "(") {
        const close = nx === "[" ? "\\]" : "\\)";
        const e = text.indexOf(close, i + 2);
        if (e >= 0) {
          segs.push({ start: i + 2, end: e, display: nx === "[", src: text.slice(i + 2, e) });
          i = e + 2;
          continue;
        }
      }
      i += 2;
    } else if (c === "$") {
      if (text[i + 1] === "$") {
        const e = text.indexOf("$$", i + 2);
        if (e < 0) {
          i += 2;
          continue;
        }
        segs.push({ start: i + 2, end: e, display: true, src: text.slice(i + 2, e) });
        i = e + 2;
        continue;
      }
      let e = i + 1;
      while (e < n && text[e] !== "$" && !(text[e] === "\n" && text[e + 1] === "\n")) e += text[e] === "\\" ? 2 : 1;
      if (text[e] === "$" && e > i + 1) {
        segs.push({ start: i + 1, end: e, display: false, src: text.slice(i + 1, e) });
        i = e + 1;
        continue;
      }
      i++;
    } else i++;
  }
  return segs;
}

export function mathAt(text, pos) {
  return mathSegments(text).find((s) => pos >= s.start && pos <= s.end) || null;
}
