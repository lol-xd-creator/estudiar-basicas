# Modelo 3

*20 puntos · alrededor de 1 hora · tablas normal, $t$ y $\chi^2$ (o InfoStat). Preguntas tomadas o adaptadas de los parciales de Sistemas 2020 y de Moodle 2021.*

## Teoría (1 punto cada una)

::: pregunta Cuando la esperanza matemática de la distribución en el muestreo del estimador coincide con el valor del parámetro **e incluye toda la información de la muestra**, el estimador es:
- [ ] Eficiente
- [x] Insesgado y suficiente
- [ ] Consistente y eficiente
- [ ] Solo suficiente
::: solucion Explicación
$E(\hat\theta) = \theta$ → insesgado; usa toda la información de la muestra → suficiente.
:::
:::

::: pregunta Para calcular el tamaño de muestra $n$ en la estimación de $\mu$ hace falta conocer:
- [ ] la desviación típica del estimador, el nivel de confianza y el riesgo
- [ ] el error máximo y el nivel de confianza
- [ ] el error máximo y la desviación típica del estimador
- [x] el error máximo aceptado, la desviación típica de la variable en la población y el nivel de confianza
::: solucion Explicación
$n = \frac{z^2\sigma^2}{e^2}$: $z$ sale del nivel de confianza, $\sigma$ es la de la **variable en la población** y $e$ es el error máximo. Ver [[8.6 Tamaño de la muestra]].
:::
:::

::: pregunta Cuando se relacionan todos los valores posibles del parámetro según la hipótesis alternativa con sus probabilidades $1-\beta$, se forma:
- [ ] la curva OC
- [ ] la curva operatoria característica
- [ ] la curva alternativa
- [x] la curva de potencia
::: solucion Explicación
$1-\beta$ es la potencia. La curva OC grafica $\beta$ (su complemento).
:::
:::

::: pregunta Si $x$ es binomial con $\mu = np$ y $\sigma^2 = npq$, la variable estandarizada es:
- [x] $z = \frac{x - np}{\sqrt{np(1-p)}}$
- [ ] $z = \frac{np - x}{\sqrt{np(1-p)}}$
- [ ] $z = \frac{x - nq}{\sqrt{np(1-p)}}$
- [ ] $z = \frac{x - np}{\sqrt{Np(1-p)}}$
::: solucion Explicación
Siempre $\frac{x - E(x)}{\sigma_x}$, con la esperanza y la desviación de la binomial.
:::
:::

::: pregunta Para tomar la decisión de rechazar la hipótesis nula:
- [ ] el parámetro debe pertenecer al área $\alpha$
- [x] el estimador debe caer en la zona de rechazo
- [ ] el parámetro debe pertenecer a la zona de rechazo
- [ ] el estadístico debe pertenecer al área $\beta$
::: solucion Explicación
Lo que se observa es el **estimador** (o el estadístico) calculado con la muestra. El parámetro es desconocido: no "cae" en ningún lado.
:::
:::

::: pregunta El muestreo sistemático es el que se usa cuando se trabaja con poblaciones y muestras grandes.
- [ ] Verdadero
- [x] Falso
::: solucion Explicación
Se define por cómo se elige (uno cada $k = \frac{N}{n}$, arranque al azar), no por el tamaño. Se puede usar si hay una lista ordenada; con poblaciones muy grandes o dispersas, numerar puede ser imposible.
:::
:::

::: pregunta La potencia de una prueba es la probabilidad de rechazar la hipótesis nula cuando la hipótesis alternativa es verdadera.
- [x] Verdadero
- [ ] Falso
::: solucion Explicación
$1 - \beta = P(\text{rechazar } H_0 \mid H_0 \text{ falsa})$, y que $H_0$ sea falsa es lo mismo que $H_1$ verdadera.
:::
:::

::: pregunta En una dócima lateral derecha, a los valores del estimador que caen en la zona de rechazo se los considera:
- [ ] con diferencia poco significativa respecto del valor de $H_0$
- [x] con diferencia significativa respecto del valor de $H_0$, y poco significativa con un valor del parámetro mayor que el de $H_0$
- [ ] con diferencia significativa respecto de un valor menor que el de $H_0$
::: solucion Explicación
Caer en la zona de rechazo es estar "demasiado lejos" de $\theta_0$ para ser casualidad; en la lateral derecha eso sugiere un parámetro **mayor**, compatible con $H_1$.
:::
:::

## Práctica (3 puntos cada uno)

::: ejercicio Llenado de latas (Sistemas 2020)
Una máquina llena latas siguiendo una distribución normal de media $34$ cl y desviación $1{,}5$ cl. Se desechan las latas con menos de $33$ cl.

a) ¿Qué proporción de latas se desecha?
b) ¿A qué media habría que ajustar la máquina para que solo el 1 % tenga menos de 33 cl?
c) Con la máquina original, eligiendo 10 latas, ¿probabilidad de que **ninguna** se deseche?
d) Con la máquina original, eligiendo 500 latas, ¿probabilidad de que **al menos 100** se desechen?

::: solucion
**a)**
$$
P(X < 33) = P\!\left(z < \frac{33 - 34}{1{,}5}\right) = P(z < -0{,}67) = 1 - 0{,}7486 = 0{,}2514
$$
Se desecha el 25,14 %.

**b)** Se quiere $P(X < 33) = 0{,}01 \then z_0 = -2{,}33$. Despejando $\mu$ (con $\sigma = 1{,}5$):
$$
-2{,}33 = \frac{33 - \mu}{1{,}5} \then \mu = 33 + 2{,}33 \cdot 1{,}5 = 36{,}495 \text{ cl}
$$

**c)** Cada lata se desecha con $p = 0{,}2514$: binomial con $n = 10$.
$$
P(Y = 0) = \binom{10}{0}\,0{,}2514^0\,0{,}7486^{10} = 0{,}0553
$$

**d)** Binomial con $n = 500$ → aproximación normal:
::: pasos
E(Y) = 500 \cdot 0{,}2514 = 125{,}7
\sigma = \sqrt{500 \cdot 0{,}2514 \cdot 0{,}7486} = \sqrt{94{,}10} = 9{,}70
P(Y \ge 100) = P\!\left(z \ge \frac{100 - 125{,}7}{9{,}70}\right) = P(z \ge -2{,}65) = 0{,}9960
:::

::: aclaracion
En la resolución manuscrita que circula con este ejercicio, la probabilidad de a) da $0{,}2546$ por un redondeo de la tabla, y por eso c) y d) dan $0{,}0530$ y $0{,}9974$. Con $0{,}2514$ salen los valores de arriba.
:::

**En InfoStat:**
- a) Normal, media 34, **varianza 2,25** → Prob $(X \le 33) = 0{,}2525$ (InfoStat no redondea $z$; la tabla da $0{,}2514$).
- b) Probabilidades y cuantiles con la **normal estándar** (media 0, varianza 1) → Prob $0{,}01$ → $z = -2{,}326$; después se despeja $\mu$ a mano.
- c) **Binomial (n,p)** con $n = 10$, $p = 0{,}2514$ → Prob $(X \le 0)$.
- d) Normal con media $125{,}7$ y varianza $94{,}10$ → Prob $(X \ge 100)$.
:::
:::

::: ejercicio Intervalo para la desviación estándar (Moodle 2021)
Con una muestra de valores $5,\ 7,\ 9,\ 4,\ 6,\ 2,\ 2,\ 8,\ 5$ de una población normal, estimá la **desviación estándar** poblacional con un intervalo de confianza del **95 %**.

::: solucion
**Medidas de la muestra:** $n = 9$, $\ \bar x = \frac{48}{9} = 5{,}333$, $\ \sum x_i^2 = 304$.
$$
\sum (x_i - \bar x)^2 = 304 - 9 \cdot 5{,}333^2 = 304 - 256 = 48 \qquad \hat s^2 = \frac{48}{8} = 6
$$

**Distribución:** $\frac{(n-1)\hat s^2}{\sigma^2} \sim \chi^2_{n-1}$ ([[7.5 Distribución de la varianza muestral]]). Despejando $\sigma^2$:

$$
\frac{(n-1)\,\hat s^2}{\chi^2_{(n-1);\,1-\alpha/2}} \;\le\; \sigma^2 \;\le\; \frac{(n-1)\,\hat s^2}{\chi^2_{(n-1);\,\alpha/2}}
$$

Con 8 g. l.: $\chi^2_{0{,}975} = 17{,}535$ y $\chi^2_{0{,}025} = 2{,}180$.

::: pasos
\frac{48}{17{,}535} \le \sigma^2 \le \frac{48}{2{,}180}
2{,}737 \le \sigma^2 \le 22{,}018
1{,}654 \le \sigma \le 4{,}692     // raíz cuadrada de los dos extremos
:::

::: ojo
Las opciones trampa del parcial eran el intervalo para la **varianza** ($[2{,}74;\ 22{,}02]$) en lugar de para la desviación, o usar los valores de $\chi^2$ cruzados. **El valor grande de $\chi^2$ va abajo en el límite inferior.**
:::

::: aclaracion
El intervalo para $\sigma$ con $\chi^2$ no está desarrollado en el apunte teórico (solo se nombra), pero salió en todos los parciales de 2021. La fórmula sale de despejar $\sigma^2$ de la $\chi^2$ de la unidad 7.
:::

**En InfoStat:** cargar los 9 datos → Estadísticas → Inferencia basada en una muestra → Intervalos de confianza → Bilateral, Confianza 95, tildar **Varianza** → da el intervalo para $\sigma^2$; se le saca la raíz a los extremos. Los valores de $\chi^2$ salen de Probabilidades y cuantiles → **Chi cuadrado (v)** con $v = 8$.
:::
:::

::: ejercicio Intervalo para la media con muestra chica
Se midió el tiempo de compilación de un proyecto en 16 corridas: $\bar x = 12{,}4$ s y $\hat s = 2$ s. Suponiendo normalidad, estimá el tiempo medio con un intervalo del **99 %**.

::: solucion
Población normal, $\sigma$ desconocida, $n = 16 < 30$ → **$t$ con 15 g. l.** $\quad t_{(15);\,0{,}995} = 2{,}947$.

$$
e = 2{,}947 \cdot \frac{2}{\sqrt{16}} = 1{,}47 \qquad \boxed{10{,}93 \le \mu \le 13{,}87}
$$

Con el 99 % de confianza, el tiempo medio de compilación está entre 10,93 y 13,87 s.

**En InfoStat:** con los 16 datos, Intervalos de confianza → Confianza 99, Media. Sin los datos, el $t$ sale de Probabilidades y cuantiles → **T Student (v)** con $v = 15$ y Prob $(X \le x) = 0{,}995$.
:::
:::

::: ejercicio Dócima con $t$: tiempo de respuesta
Un proveedor promete un tiempo de respuesta medio de 200 ms. En 16 mediciones se obtuvo $\bar x = 212$ ms y $\hat s = 20$ ms (población normal). Con $\alpha = 0{,}05$, ¿el tiempo medio **difiere** de lo prometido?

::: solucion
$H_0: \mu = 200$, $H_1: \mu \ne 200$. **Bilateral.** $\sigma$ desconocida y $n < 30$ → $t_{15}$.

$$
t = \frac{212 - 200}{20/\sqrt{16}} = \frac{12}{5} = 2{,}4
\qquad
t_{(15);\,0{,}975} = 2{,}131
$$

$2{,}4 > 2{,}131$ → **se rechaza $H_0$**: el tiempo medio difiere de 200 ms (es mayor).

**Valor p:** como $t_{(15);\,0{,}975} = 2{,}131 < 2{,}4 < t_{(15);\,0{,}99} = 2{,}602$, cada cola tiene entre 0,01 y 0,025, y el valor p bilateral está **entre 0,02 y 0,05**: menor que $\alpha$, así que se rechaza.

**En InfoStat:** con los datos cargados → Estadísticas → Inferencia basada en una muestra → **Prueba t para una media** → valor de $H_0$: 200, prueba **bilateral** → la salida da $T$ y el **p-valor**; como $p < 0{,}05$, se rechaza $H_0$.
:::
:::
