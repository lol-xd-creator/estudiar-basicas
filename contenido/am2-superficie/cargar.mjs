// Carga este apunte en la app (por la API), colgado de la nota raíz «AM2».
// Se puede correr de nuevo: reemplaza la rama anterior.
//   node cargar.mjs [http://localhost:8091]
import { cargarRama } from "../rama.mjs";

await cargarRama(new URL("./notas/", import.meta.url), { padre: "AM2" });
