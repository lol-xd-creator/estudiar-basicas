// Carga este resumen en la app (por la API), colgado de la nota raíz
// «AM2 1:30HS» (cuyo texto sale de ../am2-1h30.md). Se puede correr de nuevo.
//   node cargar.mjs [http://localhost:8091]
import { cargarRama, leerNotas } from "../rama.mjs";

const [raiz] = leerNotas(new URL("../", import.meta.url)).filter((n) => n.title === "AM2 1:30HS");
await cargarRama(new URL("./notas/", import.meta.url), { padre: raiz.title, contenidoPadre: raiz.content });
