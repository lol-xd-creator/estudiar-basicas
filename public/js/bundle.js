// Empaqueta los módulos del navegador que necesita el HTML descargado (los
// gráficos y las demostraciones paso a paso) en un solo script clásico: cada
// módulo pasa a ser una función que devuelve sus exports.

// En orden de dependencias.
export const RUNTIME_MODULES = ["macros.js", "mathexpr.js", "plotcommon.js", "plotspec.js", "plot2d.js", "plot3d.js", "plots.js", "enhance.js"];

export async function bundleModules(fetchText) {
  let out = "const __m = {};\n";
  for (const file of RUNTIME_MODULES) {
    let src = await fetchText(file);
    const names = [];
    src = src.replace(/^import\s*\{([^}]*)\}\s*from\s*"\.\/([\w.-]+)";?[ \t]*$/gm, (_, list, mod) => `const {${list}} = __m["${mod}"];`);
    src = src.replace(/^export\s+(async\s+)?(function|class|const|let)\s+([\w$]+)/gm, (m, _a, _k, name) => {
      names.push(name);
      return m.replace(/^export\s+/, "");
    });
    out += `__m["${file}"] = (() => {\n${src}\nreturn { ${names.join(", ")} };\n})();\n`;
  }
  return out + 'window.__mountPlots = __m["plots.js"].mountPlots;\nwindow.__enhance = __m["enhance.js"].enhance;\n';
}
