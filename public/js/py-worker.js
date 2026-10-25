// Worker que ejecuta Python con Pyodide (CPython compilado a WebAssembly,
// en public/vendor/pyodide). Corre aparte de la página: si un programa se
// cuelga, pyrun.js lo termina y arranca otro.
//
// Mensaje: { id, code } → respuesta { id, out, err, ms } con lo que se
// imprimió (stdout y stderr juntos, en orden) y el traceback si hubo error.
import { loadPyodide } from "../vendor/pyodide/pyodide.mjs";

// Cada ejecución arranca de cero, como correr un archivo nuevo: un espacio
// de nombres limpio y sin los módulos que importó la anterior (así
// `import this` vuelve a imprimir el Zen). El traceback solo muestra los
// renglones del código de la nota.
const RUNNER = `
import sys, io, linecache, traceback, contextlib, builtins

def __run(src):
    linecache.cache["<celda>"] = (len(src), None, src.splitlines(True), "<celda>")
    out = io.StringIO()
    ns = {"__name__": "__main__", "__builtins__": builtins}
    before = set(sys.modules)
    err = None
    def no_input(prompt=""):
        raise RuntimeError("input() no está disponible acá: poné los datos directamente en el código")
    ns["input"] = no_input
    with contextlib.redirect_stdout(out), contextlib.redirect_stderr(out):
        try:
            exec(compile(src, "<celda>", "exec"), ns)
        except SystemExit:
            pass
        except BaseException as e:
            te = traceback.TracebackException.from_exception(e)
            te.stack = traceback.StackSummary.from_list([f for f in te.stack if f.filename == "<celda>"])
            err = "".join(te.format())
    for name in set(sys.modules) - before:
        del sys.modules[name]
    return out.getvalue(), err
`;

let ready = null;

function boot() {
  ready ??= (async () => {
    const py = await loadPyodide({ indexURL: new URL("../vendor/pyodide/", import.meta.url).href });
    py.runPython(RUNNER);
    const version = py.runPython("import sys; sys.version.split()[0]");
    return { py, run: py.globals.get("__run"), version };
  })();
  return ready;
}

self.onmessage = async (e) => {
  const { id, code } = e.data;
  try {
    const { run, version } = await boot();
    const t0 = performance.now();
    const res = run(code);
    const [out, err] = res.toJs();
    res.destroy();
    self.postMessage({ id, out, err, version, ms: Math.round(performance.now() - t0) });
  } catch (error) {
    self.postMessage({ id, fatal: String(error?.message || error) });
  }
};
