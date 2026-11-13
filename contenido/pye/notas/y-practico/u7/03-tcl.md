# P7.3 Probabilidades con el teorema central del límite

*Guía, unidad 7: ejercicios 10, 12, 13, 16 y 17.*

::: tip La diferencia clave
- Para **un elemento**: $z = \dfrac{x - \mu}{\sigma}$.
- Para **la media de una muestra**: $z = \dfrac{\bar x - \mu}{\sigma/\sqrt n}$.
- Para **la proporción de una muestra**: $z = \dfrac{\hat P - P}{\sqrt{PQ/n}}$.
:::

::: ejercicio 7.10 · Factor de corrección
Una población de 1000 individuos tiene $\mu = 50$ y $\sigma = 12$. Muestras de 36 **sin** reposición: calculá el valor esperado y la desviación de la distribución de $\bar x$.

::: solucion
$E(\bar x) = \mu = 50$.
$$
\sigma_{\bar x} = \frac{12}{\sqrt{36}}\sqrt{\frac{1000 - 36}{1000 - 1}} = 2 \cdot 0{,}982 = 1{,}965
$$
En promedio, las medias muestrales valen 50 y se apartan de 50 en alrededor de 1,96. (Como $n$ es el 3,6 % de $N$, sin el factor daría 2: casi lo mismo.)
:::
:::

::: ejercicio 7.12 · Estatura de alumnas
La estatura media es 165 cm con desviación 8 cm. ¿Probabilidad de que una muestra de 36 alumnas tenga media superior a 167 cm? ¿Y una de 64?

::: solucion
- $n = 36$: $\sigma_{\bar x} = \frac{8}{6} = 1{,}33$; $\ P(\bar x > 167) = P(z > 1{,}5) = 0{,}0668$.
- $n = 64$: $\sigma_{\bar x} = \frac88 = 1$; $\ P(\bar x > 167) = P(z > 2) = 0{,}0228$.

Con más datos, la media se concentra más cerca de 165: es menos probable que se aleje.

**En InfoStat:** Normal con media 165 y **varianza $\frac{64}{36} = 1{,}78$** (o $1$) → Prob $(X > 167)$.
:::
:::

::: ejercicio 7.13 · Peso de recién nacidos
El peso es normal con $\mu = 3100$ g y $\sigma = 150$ g.

a) ¿Probabilidad de que **un** recién nacido pese más de 3130 g?
b) ¿Cómo se distribuyen las medias de muestras de 100?
c) ¿Probabilidad de que la **media** de 100 recién nacidos supere 3130 g?

::: solucion
- a) $P(x > 3130) = P(z > \frac{30}{150}) = P(z > 0{,}2) = 0{,}4207$.
- b) Normal (la población es normal) con media 3100 y $\sigma_{\bar x} = \frac{150}{\sqrt{100}} = 15$.
- c) $P(\bar x > 3130) = P(z > \frac{30}{15}) = P(z > 2) = 0{,}0228$.

::: ojo
La misma diferencia de 30 g es poco para un bebé (a) y mucho para un promedio de 100 (c).
:::
:::
:::

::: ejercicio 7.16 · Estudiantes que fuman
El 60 % de los estudiantes fuma. En una muestra de 800, ¿probabilidad de que la proporción muestral sea menor que 0,55?

::: solucion
$$
\sigma_{\hat P} = \sqrt{\frac{0{,}6 \cdot 0{,}4}{800}} = 0{,}0173 \qquad P(\hat P < 0{,}55) = P\!\left(z < \frac{0{,}55 - 0{,}60}{0{,}0173}\right) = P(z < -2{,}89) = 0{,}0019
$$

**En InfoStat:** Normal con media 0,6 y varianza $\frac{0{,}24}{800} = 0{,}0003$ → Prob $(X \le 0{,}55)$.
:::
:::

::: ejercicio 7.17 · Información por Internet
El 60 % de los estudiantes busca información de cursos por Internet. Con muestras de 100: a) $P(\hat P > 0{,}50)$ · b) $P(\hat P < 0{,}60)$.

::: solucion
$\sigma_{\hat P} = \sqrt{\frac{0{,}24}{100}} = 0{,}049$.

- a) $P(z > \frac{-0{,}10}{0{,}049}) = P(z > -2{,}04) = 0{,}9793$
- b) $P(z < 0) = 0{,}50$: $0{,}60$ es justo la media de $\hat P$.
:::
:::
