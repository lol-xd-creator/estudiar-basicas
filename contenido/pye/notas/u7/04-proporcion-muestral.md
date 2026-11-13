# 7.4 Distribución de la proporción muestral

::: idea
Lo mismo que con la media, pero para una característica de **sí o no** (éxito o fracaso). La proporción de éxitos de la muestra, $\hat P = \frac{x}{n}$, cambia de muestra en muestra; su distribución está **centrada en la proporción poblacional $P = \frac{X}{N}$**.
:::

::: ppt Relaciones con los parámetros (Garibaldi y Rimoldi)
Las muestras posibles son $N^n$ (con reposición) o $_NC_n$ (sin reposición), igual que para la media.
$$
E(\hat P) = P \qquad \text{(siempre)}
$$

| | Varianza | Desviación (error estándar) |
|---|---|---|
| **Con reposición** | $\sigma^2_{\hat P} = \dfrac{P(1-P)}{n}$ | $\sigma_{\hat P} = \sqrt{\dfrac{P(1-P)}{n}}$ |
| **Sin reposición** | $\sigma^2_{\hat P} = \dfrac{P(1-P)}{n}\cdot\dfrac{N-n}{N-1}$ | $\sigma_{\hat P} = \sqrt{\dfrac{P(1-P)}{n}}\sqrt{\dfrac{N-n}{N-1}}$ |

En palabras de Garibaldi: la desviación de la proporción muestral es la raíz del cociente entre el producto de la proporción por su complemento y el tamaño de muestra, multiplicada por la raíz del factor de corrección.
:::

::: ejemplo Estudiantes que estudiaron (Garibaldi)
De 4 estudiantes, A y B no estudiaron y C y D sí ($P = 0{,}5$). Muestras de $n = 2$.

::: solucion
**Con reposición** (16 muestras): la muestra (A;C) tiene un éxito de dos, $\hat P = 0{,}5$.

| $\hat P$ | 0 | 0,5 | 1 |
|---|---|---|---|
| $P(\hat P)$ | $\frac{4}{16}$ | $\frac{8}{16}$ | $\frac{4}{16}$ |

$E(\hat P) = 0{,}5 = P$ ✓; $\ \sigma^2_{\hat P} = \frac{6}{16} - 0{,}25 = 0{,}125 = \frac{0{,}5 \cdot 0{,}5}{2}$ ✓

**Sin reposición** (6 muestras): $\hat P = 0$ con $\frac16$, $0{,}5$ con $\frac46$, $1$ con $\frac16$.

$E(\hat P) = 0{,}5$ ✓; $\ \sigma^2_{\hat P} = \frac26 - 0{,}25 = 0{,}0833 = \frac{0{,}25}{2}\cdot\frac{2}{3}$ ✓
:::
:::

::: ejemplo Inasistencias de cuatro empleados (Rimoldi)
Empleados con 1, 2, 3 y 5 inasistencias; éxito: más de 3 inasistencias, así que $P = \frac14 = 0{,}25$. Con muestras de 2 con reposición (16), $E(\hat P) = \frac{4}{16} = 0{,}25 = P$ ✓ y $\sigma_{\hat P} = \sqrt{\frac{0{,}25 \cdot 0{,}75}{2}}$.
:::

Para $n$ grande, $\hat P$ es aproximadamente normal: $z = \dfrac{\hat P - P}{\sigma_{\hat P}}$ ([[6.6 Aproximación de modelos discretos a la normal]]).

::: libro Ejemplo del apunte: estudiantes con 2 o menos materias
Con la población $1, 2, 3, 3, 4, 5$ y éxito "2 o menos materias" ($P = 0{,}33$): con reposición, $\hat P = 0;\ 0{,}5;\ 1$ con probabilidades $\frac{16}{36}, \frac{16}{36}, \frac{4}{36}$; $E(\hat P) = 0{,}33$ y $\sigma_{\hat P} = 0{,}33$. Sin reposición, $\sigma_{\hat P} = 0{,}298$.

$\hat P$ varía relativamente más que $\bar x$ (100 % contra 30 %): solo mira si hay éxito o no, y usa menos información.
:::

::: pregunta En la distribución de la proporción muestral, con muestras grandes y con reposición, se cumple:
- [ ] $E(\hat p) \ne P$
- [ ] $E(\hat p) = P\left(\frac{N-n}{N-1}\right)$
- [x] $E(\hat p) = P$
::: solucion Explicación
$\hat P$ es insesgado. El factor de corrección afecta a la varianza (sin reposición), no a la esperanza. (Pregunta del parcial de Sistemas de 2020.)
:::
:::

::: pregunta El 20 % de las piezas de un lote muy grande es defectuoso. Con muestras de 100, ¿cuánto vale $\sigma_{\hat P}$?
- [x] $0{,}04$
- [ ] $0{,}16$
- [ ] $0{,}0016$
::: solucion Explicación
$\sqrt{\frac{0{,}2 \cdot 0{,}8}{100}} = 0{,}04$. $0{,}0016$ es la varianza.
:::
:::
