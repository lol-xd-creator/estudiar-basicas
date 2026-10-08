# Pendiente: migración de KaTeX a MathJax 4

El usuario eligió **MathJax 4 con la fuente Pagella** (tipo Palatino, igual que el texto) después de comparar KaTeX, Temml y MathJax. La migración quedó a mitad de camino.

## Hecho

- `package.json` y `scripts/vendor.mjs`: MathJax 4 + `@mathjax/mathjax-pagella-font` en `public/vendor/` (KaTeX quitado).
- `public/js/mathjax-config.js` (script clásico): configuración y atajos (`\R`, `\sen`, `\dx`, `\eval`, `\hl`…). Reemplaza a `macros.js`.
- `public/js/math.js`: `render.js` deja marcadores `<span class="tex" data-d="0|1">`; `typesetMath(raíz)` los dibuja con un caché por fórmula (al escribir solo se dibuja la que cambió; las centradas se guardan por ancho, porque MathJax las parte en renglones). También copia fórmulas como LaTeX y acepta un caché precargado (`window.__MATH_SEED`) para el HTML descargado.
- `public/js/render.js`: usa `mathHTML`; las citas dentro de fórmulas usan `\data{ref=…,target=…}`.
- `plotcommon.js`, `plot2d.js`, `plot3d.js`: las etiquetas con `$…$` usan marcadores + `typesetMath(capa)`.
- `app.js`: `typesetMath` en la vista y la vista previa, barra de fórmula con `mathError`, se redibuja al cambiar el ancho de la ventana.
- `index.html` y `math.css`: estilos de `mjx-container` en vez de `.katex`.

## Falta

1. **`public/js/export.js`** (descarga ⤓): todavía usa KaTeX. Hay que:
   - renderizar cada nota en un contenedor fuera de pantalla (con el ancho de la vista) y esperar `typesetMath`;
   - embeber `MathJax.chtmlStylesheet()` con sus `.woff2` en base64;
   - precargar las fórmulas de las etiquetas de los gráficos: `parseSpec` + `labelFormulas` → `typesetMath` → `mathEntries()` → `window.__MATH_SEED` en el HTML;
   - sacar `katexCSS` / `katexJS`.
2. **`public/js/bundle.js`**: en `RUNTIME_MODULES` cambiar `macros.js` por `math.js`. Después borrar `public/js/macros.js`.
3. **`test/render.test.js`**: no usa más KaTeX. Las pruebas tienen que buscar los marcadores `span class="tex"`.
4. **`server.js`**: agregar ETag / 304 a los archivos estáticos (MathJax pesa ~2 MB y hoy se vuelve a bajar entero en cada visita).
5. **`math.css`**: borrar las reglas viejas `.math-error`.
6. **Probar en el navegador**:
   - pasos (en la comparación, un `\lim` con dos renglones debajo se pisaba con la `\sum` en columna angosta);
   - recuadros de resultado (clase `mjx-measuring`);
   - barra de fórmula con error;
   - copiar fórmulas;
   - etiquetas de gráficos;
   - descarga ⤓;
   - celular.
7. **README**: cambiar las menciones a KaTeX y la tabla de estructura (`math.js`, `mathjax-config.js`).

## Contenido

`contenido/am2/notas/` tiene las notas de AM2 (Integrales dobles), transcriptas del apunte. Para cargarlas en una base local con la app corriendo:

```bash
node contenido/am2/cargar.mjs http://localhost:8091
```
