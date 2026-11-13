# P7.2 Distribuciones por muestreo por enumeración

*Guía, unidad 7: ejercicios 8, 6 y 5 (el 4 es del mismo tipo). Stefanich resuelve varios iguales con 3 o 4 elementos.*

::: ejercicio 7.8 · Edades de cuatro niños (media muestral, sin reposición)
Población: niños de 3, 4, 5 y 6 años.

a) Media y varianza de la población.
b) Todas las muestras de tamaño 2 (combinaciones).
c) Distribución por muestreo de $\bar x$.
d) $E(\bar x)$ y $\sigma_{\bar x}$; comprobar la relación con los parámetros.

::: solucion
**a)** $\mu = \frac{3+4+5+6}{4} = 4{,}5$; $\ \sigma^2 = \frac{9+16+25+36}{4} - 4{,}5^2 = 1{,}25$, $\ \sigma = 1{,}118$.

**b)** $\binom42 = 6$ muestras: $(3;4),\ (3;5),\ (3;6),\ (4;5),\ (4;6),\ (5;6)$.

**c)**

| $\bar x$ | 3,5 | 4 | 4,5 | 5 | 5,5 |
|---|---|---|---|---|---|
| $P(\bar x)$ | $\frac16$ | $\frac16$ | $\frac26$ | $\frac16$ | $\frac16$ |

**d)**
::: pasos
E(\bar x) = \frac{3{,}5 + 4 + 2 \cdot 4{,}5 + 5 + 5{,}5}{6} = \frac{27}{6} = 4{,}5 = \mu
\sigma^2_{\bar x} = \frac{124}{6} - 4{,}5^2 = 0{,}4167 \qquad \sigma_{\bar x} = 0{,}6455     // $\sum \bar x^2 = 124$
:::
Con la fórmula (sin reposición): $\sigma_{\bar x} = \frac{1{,}118}{\sqrt 2}\sqrt{\frac{4-2}{4-1}} = 0{,}6455$ ✓

**En InfoStat:** cargar 3, 4, 5, 6 en una columna → Aplicaciones → Didácticas → **Todas las muestras posibles** → tamaño muestral 2, M.A.S., *Media muestral*. Después, Medidas resumen sobre la columna de medias.
:::
:::

::: ejercicio 7.6 · Tres electores (proporción muestral)
A vota al candidato conservador (éxito = 1); B y C al liberal (0).

a) Proporción poblacional.
b) Muestras de tamaño 2 **con** reposición: distribución de $\hat P$, $E(\hat P)$ y $\sigma_{\hat P}$.
c) Lo mismo **sin** reposición.

::: solucion
**a)** $P = \frac13 = 0{,}33$.

**b)** $3^2 = 9$ muestras: AA da 1; AB, AC, BA, CA dan 0,5; BB, BC, CB, CC dan 0.

| $\hat P$ | 0 | 0,5 | 1 |
|---|---|---|---|
| $P(\hat P)$ | $\frac49$ | $\frac49$ | $\frac19$ |

$E(\hat P) = \frac{0{,}5 \cdot 4 + 1}{9} = \frac13 = P$ ✓ $\quad\sigma_{\hat P} = \sqrt{\frac{PQ}{n}} = \sqrt{\frac{\frac13 \cdot \frac23}{2}} = 0{,}333$

**c)** $\binom32 = 3$ muestras: AB → 0,5; AC → 0,5; BC → 0.

$E(\hat P) = \frac{0{,}5 + 0{,}5 + 0}{3} = \frac13 = P$ ✓

$\sigma^2_{\hat P} = \frac{0{,}25 + 0{,}25}{3} - \frac19 = 0{,}0556 \then \sigma_{\hat P} = 0{,}236$. Con la fórmula: $\sqrt{\frac{PQ}{n}\cdot\frac{N-n}{N-1}} = \sqrt{0{,}1111 \cdot \frac12} = 0{,}236$ ✓

::: aclaracion
La guía (y la diapositiva de Rimoldi) dan $\sigma_{\hat P} = 0{,}2714$ sin reposición. Calculando directamente con las tres muestras, o con la fórmula del apunte, da $0{,}236$.
:::
:::
:::

::: ejercicio 7.5 · Esperanza de la varianza corregida
Población: 3, 5, 7 y 8. Muestras de tamaño 2 **sin** reposición. Calculá las varianzas corregidas de todas las muestras y verificá que $E(\hat s^2) = S^2$.

::: solucion
$\mu = 5{,}75$, $\ \sigma^2 = 3{,}6875$ ($\sigma = 1{,}92$), $\ S^2 = \frac{14{,}75}{3} = 4{,}917$.

Con $n = 2$, $\hat s^2 = \frac{(x_1 - x_2)^2}{2}$:

| Muestra | 3;5 | 3;7 | 3;8 | 5;7 | 5;8 | 7;8 |
|---|---|---|---|---|---|---|
| $\hat s^2$ | 2 | 8 | 12,5 | 2 | 4,5 | 0,5 |

$E(\hat s^2) = \frac{29{,}5}{6} = 4{,}917 = S^2$ ✓ (está desarrollado en [[7.5 Distribución de la varianza muestral]]).

**En InfoStat:** Todas las muestras posibles → *Varianza muestral corregida*.
:::
:::
