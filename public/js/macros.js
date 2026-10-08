// Atajos de LaTeX disponibles en todas las notas (además de los de KaTeX).
// Una nota puede definir los suyos con \newcommand dentro de una fórmula:
// valen desde ahí hasta el final de esa nota.
export const MACROS = {
  // Conjuntos
  "\\R": "\\mathbb{R}",
  "\\N": "\\mathbb{N}",
  "\\Z": "\\mathbb{Z}",
  "\\Q": "\\mathbb{Q}",
  "\\C": "\\mathbb{C}",
  // Funciones con nombre en castellano
  "\\sen": "\\operatorname{sen}",
  "\\tg": "\\operatorname{tg}",
  "\\cotg": "\\operatorname{cotg}",
  "\\cosec": "\\operatorname{cosec}",
  "\\arcsen": "\\operatorname{arcsen}",
  "\\arctg": "\\operatorname{arctg}",
  "\\senh": "\\operatorname{senh}",
  "\\tgh": "\\operatorname{tgh}",
  "\\sgn": "\\operatorname{sgn}",
  "\\Dom": "\\operatorname{Dom}",
  "\\Img": "\\operatorname{Im}",
  "\\cte": "\\text{cte}",
  // Diferenciales: \dd x, \dx, \dy, \dA …
  "\\dd": "\\mathop{}\\!\\mathrm{d}",
  "\\dx": "\\dd x",
  "\\dy": "\\dd y",
  "\\dz": "\\dd z",
  "\\dt": "\\dd t",
  "\\du": "\\dd u",
  "\\dr": "\\dd r",
  "\\dA": "\\dd A",
  "\\dV": "\\dd V",
  "\\dtheta": "\\dd\\theta",
  // Barras, normas, evaluación y derivadas
  "\\abs": "\\left|#1\\right|",
  "\\norm": "\\left\\|#1\\right\\|",
  "\\eval": "\\left.#1\\right|_{#2}^{#3}",
  "\\pd": "\\frac{\\partial #1}{\\partial #2}",
  "\\grad": "\\nabla",
  // Lógica en castellano
  "\\then": "\\Rightarrow",
  "\\sii": "\\Leftrightarrow",
  "\\y": "\\wedge",
  // Resaltados para seguir qué cambia de un paso al otro
  "\\hl": "\\htmlClass{hl-a}{#1}",
  "\\hlb": "\\htmlClass{hl-b}{#1}",
  "\\hlc": "\\htmlClass{hl-c}{#1}",
};

export const KATEX_OPTIONS = {
  strict: "ignore",
  globalGroup: true,
  // Solo se permiten las extensiones de clase y datos (para los resaltados y
  // las referencias a ecuaciones); nada de links ni HTML arbitrario.
  trust: (ctx) => ctx.command === "\\htmlClass" || ctx.command === "\\htmlData",
};
