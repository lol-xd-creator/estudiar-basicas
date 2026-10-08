// Configuración de MathJax 4 (script clásico: tiene que correr antes de
// cargar vendor/mathjax). Fuente Pagella, la misma familia que el texto;
// las fórmulas centradas que no entran se parten en renglones.
//
// Atajos disponibles en todas las notas. Una nota puede definir los suyos
// con \newcommand dentro de una fórmula.
(function () {
  var macros = {
    // Conjuntos
    R: "\\mathbb{R}", N: "\\mathbb{N}", Z: "\\mathbb{Z}", Q: "\\mathbb{Q}", C: "\\mathbb{C}",
    // Funciones con nombre en castellano
    sen: "\\operatorname{sen}", tg: "\\operatorname{tg}", cotg: "\\operatorname{cotg}",
    cosec: "\\operatorname{cosec}", arcsen: "\\operatorname{arcsen}", arctg: "\\operatorname{arctg}",
    senh: "\\operatorname{senh}", tgh: "\\operatorname{tgh}", sgn: "\\operatorname{sgn}",
    Dom: "\\operatorname{Dom}", Img: "\\operatorname{Im}", cte: "\\text{cte}",
    // Diferenciales: \dd x, \dx, \dy, \dA …
    dd: "\\mathop{}\\!\\mathrm{d}", dx: "\\dd x", dy: "\\dd y", dz: "\\dd z", dt: "\\dd t",
    du: "\\dd u", dr: "\\dd r", dA: "\\dd A", dV: "\\dd V", dtheta: "\\dd\\theta",
    // Barras, normas, evaluación y derivadas
    abs: ["\\left|#1\\right|", 1],
    norm: ["\\left\\|#1\\right\\|", 1],
    eval: ["\\left.#1\\right|_{#2}^{#3}", 3],
    pd: ["\\frac{\\partial #1}{\\partial #2}", 2],
    grad: "\\nabla",
    // Lógica en castellano
    then: "\\Rightarrow", sii: "\\Leftrightarrow", y: "\\wedge",
    // Resaltados para seguir qué cambia de un paso al otro
    hl: ["\\class{hl-a}{#1}", 1], hlb: ["\\class{hl-b}{#1}", 1], hlc: ["\\class{hl-c}{#1}", 1],
  };

  window.MathJax = {
    loader: {
      paths: { "mathjax-pagella": "/vendor/mathjax-pagella" },
      load: ["[tex]/html", "[tex]/cancel"],
    },
    tex: {
      inlineMath: [["\\(", "\\)"]],
      displayMath: [["\\[", "\\]"]],
      processEscapes: false,
      packages: { "[+]": ["html", "cancel"] },
      macros: macros,
    },
    output: {
      font: "mathjax-pagella",
      displayOverflow: "linebreak",
      linebreaks: { inline: true },
    },
    options: {
      enableMenu: false,
      enableExplorer: false,
      enableSpeech: false,
      enableBraille: false,
      enableEnrichment: false,
    },
    startup: {
      typeset: false,
      // Los avisos de accesibilidad (voz, braille, explorador) arrancan un
      // worker externo y no se pueden apagar desde `options`: se apagan acá.
      ready: function () {
        MathJax.startup.defaultReady();
        var o = MathJax.startup.document.options;
        o.enableEnrichment = o.enableSpeech = o.enableBraille = o.enableExplorer = false;
      },
    },
  };
})();
