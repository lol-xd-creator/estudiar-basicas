// Carga el apunte de integrales dobles en la app (por la API), colgado de la
// nota raíz «AM2» (cuyo texto sale de am2.md). Se puede correr de nuevo.
//   node cargar.mjs [http://localhost:8091]
import { cargarRama, leerNotas } from "../rama.mjs";

const [am2] = leerNotas(new URL("./", import.meta.url));
await cargarRama(new URL("./notas/", import.meta.url), { padre: am2.title, contenidoPadre: am2.content });
