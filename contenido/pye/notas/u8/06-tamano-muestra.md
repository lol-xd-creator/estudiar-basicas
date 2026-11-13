# 8.6 Tamaño de la muestra

::: idea
Es la pregunta al revés: "**para no superar este error con esta confianza, ¿cuántos datos necesito?**". Se despeja $n$ de la fórmula del error.
:::

::: ppt Para estimar la media (Garibaldi y Rimoldi)
Si se usa $\bar x$ para estimar $\mu$, se puede tener una confianza del $(1-\alpha)\,100\,\%$ de que el error no excede $e$ cuando
$$
n \ge \frac{z_{\alpha/2}^2\;\sigma^2}{e^2}
$$
Hacen falta **tres datos**: el **nivel de confianza** (da $z$), el **error máximo** $e$ y la **desviación de la variable en la población** $\sigma$ (conocida, de datos anteriores o de un estudio piloto).
:::

::: ejemplo 27 pilas (Rimoldi)
Error máximo 1,5, confianza 99 %, $\sigma = 3$.

::: solucion
$1 - \alpha = 0{,}99 \then 1 - \frac\alpha2 = 0{,}995 \then z = 2{,}576$:
$$
n \ge \frac{2{,}576^2 \cdot 3^2}{1{,}5^2} = 26{,}5 \then n = 27 \text{ pilas}
$$
:::
:::

::: ejemplo Resistencia del concreto (Garibaldi)
$\sigma^2 = 1000$, confianza 95 %, error de 5 psi: $\ n \ge \frac{1{,}96^2 \cdot 1000}{5^2} = 153{,}7 \then n \ge 154$ especímenes.
:::

::: ppt Para estimar la proporción (Garibaldi y Rimoldi)
$$
n \ge \frac{z_{\alpha/2}^2\;P(1-P)}{e^2}
$$
Para $P$ hay dos caminos: usar un valor de **datos o experiencia anterior** ("proporción que proviene de otra población"), o usar **$P = 0{,}50$**, que hace a $P(1-P)$ lo más grande posible y da un $n$ que cubre todos los casos.
:::

::: ejemplo Hotel sin información previa (Garibaldi)
Error máximo del 3 %, 95 %: $\ n \ge \frac{1{,}96^2 \cdot 0{,}5 \cdot 0{,}5}{0{,}03^2} = 1067{,}1 \then n \ge 1068$ turistas.
:::

::: ppt Sin reposición: dos etapas (Garibaldi)
1. Calcular $n_0$ con las fórmulas de arriba, sin factor de corrección.
2. Corregirlo con el tamaño de la población:
$$
n = \frac{n_0\,N}{N + (n_0 - 1)}
$$
:::

::: ppt Relaciones (Garibaldi)
| Si crece… | el tamaño de muestra necesario… |
|---|---|
| la confianza ($z$) | **crece** |
| el error permitido $e$ | **baja** |
| la variabilidad ($\sigma$ o $P(1-P)$) | **crece** |
| el riesgo aceptado | **baja** |
:::

::: ojo
$n$ se **redondea siempre hacia arriba** (153,7 → 154): con 153 el error superaría lo pedido.
:::

::: libro Ejemplos del apunte
- **Vialidad**: error de 15 km, 95,45 % ($z = 2$), $\sigma = 120$: $n \ge \frac{4 \cdot 14400}{225} = 256$.
- **Radio**: error del 2 %, 95 %: con $P \approx 0{,}60$, $n \ge 2305$; sin información ($P = 0{,}5$), $n \ge 2401$. Sin información hace falta una muestra más grande, y si la proporción real está lejos de 0,5, se sobreestima $n$.
:::

::: pregunta Para calcular el tamaño de muestra $n$ en la estimación de $\mu$ hace falta:
- [ ] la desviación típica del estimador, el nivel de confianza y el riesgo
- [ ] el error máximo y el nivel de confianza
- [x] el error máximo aceptado, la desviación típica de la variable en la población y el nivel de confianza
::: solucion Explicación
Es la pregunta 18 de la evaluación de complemento de Sistemas (2020). $n = \frac{z^2\sigma^2}{e^2}$.
:::
:::

::: pregunta Si se quiere reducir el error **a la mitad** manteniendo la confianza, el tamaño de muestra:
- [ ] se duplica
- [x] se cuadruplica
- [ ] se reduce a la mitad
::: solucion Explicación
$n = \frac{z^2\sigma^2}{e^2}$: con $\frac{e}{2}$, $n$ se multiplica por 4.
:::
:::
