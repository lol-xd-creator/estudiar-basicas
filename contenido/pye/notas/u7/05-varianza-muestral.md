# 7.5 Distribución de la varianza muestral

::: idea
Así como $\bar x$ estima $\mu$, la varianza de la muestra estima la de la población. Para eso se usa la **varianza muestral corregida** (con $n-1$), porque en promedio **acierta** al parámetro.
:::

::: ppt La varianza corregida y su esperanza (Rimoldi)
$$
\hat s^2 = \frac{\sum (x_i - \bar x)^2}{n-1} \qquad\qquad E(\hat s^2) = S^2 \ \text{(sin reposición)} \qquad E(\hat s^2) = \sigma^2 \ \text{(con reposición)}
$$
con $S^2 = \frac{\sum(x_i - \mu)^2}{N-1}$, la varianza poblacional corregida. InfoStat la llama **Var(n-1)**.
:::

::: ejemplo $E(\hat s^2) = S^2$ (Rimoldi y guía)
Población: $3, 5, 7, 8$. Muestras de $n = 2$ sin reposición ($_4C_2 = 6$).

::: solucion
Con $n = 2$, $\hat s^2 = \frac{(x_1 - x_2)^2}{2}$:

| Muestra | 3;5 | 3;7 | 3;8 | 5;7 | 5;8 | 7;8 |
|---|---|---|---|---|---|---|
| $\hat s^2$ | 2 | 8 | 12,5 | 2 | 4,5 | 0,5 |

| $\hat s^2$ | 0,5 | 2 | 4,5 | 8 | 12,5 |
|---|---|---|---|---|---|
| $P(\hat s^2)$ | $\frac16$ | $\frac26$ | $\frac16$ | $\frac16$ | $\frac16$ |

::: pasos
E(\hat s^2) = \sum \hat s^2\,P(\hat s^2) = \frac{29{,}5}{6} = 4{,}917
S^2 = \frac{(3-5{,}75)^2 + (5-5{,}75)^2 + (7-5{,}75)^2 + (8-5{,}75)^2}{4-1} = \frac{14{,}75}{3} = 4{,}917   // $\mu = 5{,}75$
:::

Coinciden: $E(\hat s^2) = S^2$. ✓
:::
:::

Por eso $\hat s^2$ es el estimador **insesgado** de la varianza ([[8.1 Estimadores y sus propiedades]]).

::: libro Varianza sin corregir y relación con la chi cuadrado (apunte)
La **varianza muestral** $s^2 = \frac{\sum(x_i - \bar x)^2}{n}$ tiene el mismo numerador y divide por $n$:
$$
\hat s^2 = s^2\,\frac{n}{n-1} \qquad s^2 = \hat s^2\,\frac{n-1}{n}
$$
En la población pasa lo mismo: $\sigma^2$ divide por $N$ y $S^2 = \sigma^2\frac{N}{N-1}$.

Si la población es normal, $\frac{(n-1)\hat s^2}{\sigma^2} \sim \chi^2_{n-1}$ ([[6.7 Distribuciones de pequeñas muestras: t y chi cuadrado]]). Es la base del intervalo para $\sigma$ y de la dócima para la varianza que salieron en los parciales de 2021 (ver [[Modelo 3]] y [[Modelo 4]]).
:::

::: pregunta ¿Por qué se usa $\hat s^2$ (con $n-1$) para estimar la varianza poblacional?
- [ ] Porque es más chica
- [x] Porque su esperanza es igual al parámetro
- [ ] Porque no depende de $\bar x$
::: solucion Explicación
$E(\hat s^2) = \sigma^2$ (o $S^2$ sin reposición): en promedio sobre todas las muestras, acierta. $s^2$ divide por $n$ y en promedio queda por debajo.
:::
:::
