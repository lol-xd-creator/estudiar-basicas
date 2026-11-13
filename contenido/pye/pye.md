# PYE

Probabilidad y Estadística: apunte teórico del **2.º parcial** (unidades 6 a 9). Está armado con el apunte teórico de la cátedra (Rouadi, Savi, Infante) y las clases de **Garibaldi** y **Rimoldi** (apuntes del Ing. Stefanich).

## El hilo del parcial

Las cuatro unidades son **una sola historia**:

::: idea
1. **U6 · Modelos continuos.** Se aprende a calcular probabilidades con la normal (y con la $t$ y la $\chi^2$).
2. **U7 · Muestreo.** Las estadísticas de una muestra ($\bar x$, $\hat P$) son variables aleatorias, y **son normales** (TCL) con un **error estándar** conocido.
3. **U8 · Estimación.** Con esa distribución se arma un **intervalo** que contiene al parámetro con cierta confianza.
4. **U9 · Pruebas de hipótesis.** Con la misma distribución se **decide** si un valor supuesto del parámetro es creíble.
:::

```grafico
titulo: Cómo se conectan las unidades
texto (0, 3) "U6: normal, $t$, $\chi^2$"
texto (0, 2) "U7: $\bar x \sim N(\mu;\ \sigma/\sqrt n)$"
texto (-2.2, 1) "U8: $\bar x \pm z\,\sigma_{\bar x}$"
texto (2.2, 1) "U9: $\mu_0 \pm z\,\sigma_{\bar x}$"
flecha (0, 2.75) (0, 2.25)
flecha (-0.4, 1.75) (-1.8, 1.25)
flecha (0.4, 1.75) (1.8, 1.25)
x: -4..4
y: 0.5..3.4
grilla: no
ejes: no
aspecto: libre
alto: 220
```

## La fórmula que está en todo

::: resultado
$$
z = \frac{\text{estadístico} - \text{parámetro}}{\text{error estándar}}
$$

| | Estadístico | Error estándar | Si $\sigma$ no se conoce y $n < 30$ |
|---|---|---|---|
| Media | $\bar x$ | $\dfrac{\sigma}{\sqrt n}$ | $t_{n-1}$ con $\dfrac{\hat s}{\sqrt n}$ |
| Proporción | $\hat P$ | $\sqrt{\dfrac{P(1-P)}{n}}$ | — (muestra grande) |

Sin reposición y $n > 5\,\%$ de $N$: $\times\sqrt{\frac{N-n}{N-1}}$.

- **U6** la usa para calcular probabilidades de una variable ($z = \frac{x - \mu}{\sigma}$).
- **U8** la despeja para el parámetro: **$\text{estadístico} \pm z \cdot \text{error estándar}$**.
- **U9** la evalúa con el valor de $H_0$ y mira si cae en la zona de rechazo.
:::

## Cómo estudiar con este apunte

::: tip Plan sugerido
1. Leé la nota de cada **unidad**: tiene el mapa, la tabla de fórmulas y la receta.
2. Recorré los **temas** en orden. En cada uno: la **idea** (recuadro de arriba), las **fórmulas** (recuadros), los **ejemplos** (intentá resolverlos antes de abrir la solución) y las **preguntas** del final.
3. Cerrá cada unidad con su **repaso**: primero sin mirar, después abriendo las respuestas.
4. Antes del parcial, volvé a las cuatro tablas de **claves** de las notas de unidad.
5. Practicá con el [[Práctico]]: ejercicios de la guía con el machete de cada unidad y cómo se hacen en InfoStat.
6. Hacé los cuatro [[Modelos de parcial]] tomando el tiempo (alrededor de 1 hora cada uno).
:::

::: ppt Lo que se toma
Los recuadros como este, con el sello **EN LAS PPT**, son lo que dan Garibaldi y Rimoldi en sus diapositivas y apuntes: **es lo que se evalúa**. Cada unidad empieza con una tabla de qué trabaja cada profesor. Los desplegables *Ampliación del libro (no está en las PPT)* son desarrollos del apunte teórico (demostraciones y ejemplos largos) que se pueden saltear.
:::

::: ojo
Las cajas **"Aclaración fuera del apunte"** marcan lo que no sale del material de la cátedra: correcciones de errores o ejemplos que agregué para practicar.
:::

## Tabla de valores de $z$ más usados

| Uso | 90 % | 95 % | 95,45 % | 99 % | 99,73 % |
|---|---|---|---|---|---|
| Bilateral ($z_{1-\alpha/2}$) | 1,645 | 1,96 | 2 | 2,576 | 3 |
| Lateral con el mismo $\alpha$ ($z_{1-\alpha}$) | 1,28 | 1,645 | 1,69 | 2,33 | 2,78 |
