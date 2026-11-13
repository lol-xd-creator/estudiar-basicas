# P8.3 Intervalo de confianza para la media

*Guía, unidad 8: ejercicios 15, 11, 16, 18 y 22 (los 7, 8, 12, 13 y 17 son del mismo tipo; Garibaldi resuelve el 7 y el 8).*

::: ejercicio 8.15 · Calcio en agua (datos, $t$)
Se analizó seis veces la misma muestra de agua: $9{,}54;\ 9{,}61;\ 9{,}32;\ 9{,}48;\ 9{,}70;\ 9{,}26$ ppm.

a) Estimá la media y la varianza. b) Intervalo del 90 % para la media.

::: solucion
**a)**
::: pasos
\bar x = \frac{56{,}91}{6} = 9{,}485
\hat s^2 = \frac{\sum (x_i - \bar x)^2}{n - 1} = \frac{0{,}1425}{5} = 0{,}0285 \qquad \hat s = 0{,}169
:::

**b)** $n = 6 < 30$ y $\sigma$ desconocida (se supone normal) → $t$ con 5 g. l.: $t_{(5);\,0{,}95} = 2{,}015$.
$$
e = 2{,}015 \cdot \frac{0{,}169}{\sqrt 6} = 0{,}139 \qquad 9{,}35 \le \mu \le 9{,}62
$$

::: aclaracion
La guía redondea $\bar x = 9{,}5$ antes de calcular y da $\hat s^2 = 0{,}0282$ y $[9{,}36;\ 9{,}64]$. Sin redondear la media salen los valores de arriba; el error ($0{,}14$) es el mismo.
:::

**En InfoStat:** cargar los 6 datos → Intervalos de confianza → Media, Bilateral, confianza 90.
:::
:::

::: ejercicio 8.11 · Tiempo por operación ($t$ y sin reposición)
En 25 máquinas, el tiempo medio por operación es 5 min, con $\hat s = 0{,}8$ min.

a) Intervalo del 90 %. b) ¿Cuál sería el error con 16 máquinas? c) ¿Y el intervalo si en total hay 87 máquinas?

::: solucion
**a)** $t_{(24);\,0{,}95} = 1{,}711$: $\ e = 1{,}711 \cdot \frac{0{,}8}{5} = 0{,}27 \then [4{,}73;\ 5{,}27]$.

**b)** $n = 16$: $t_{(15);\,0{,}95} = 1{,}753$; $\ e = 1{,}753 \cdot \frac{0{,}8}{4} = 0{,}35$. Con menos datos el error crece: $[4{,}65;\ 5{,}35]$.

**c)** $N = 87$: la muestra es el 29 % de la población → factor de corrección:
$$
e = 0{,}27 \cdot \sqrt{\frac{87 - 25}{87 - 1}} = 0{,}27 \cdot 0{,}849 = 0{,}23 \qquad [4{,}77;\ 5{,}23]
$$
:::
:::

::: ejercicio 8.16 · Tiempo entre salidas ($n$ grande)
En 100 salidas de aprovisionamiento, el tiempo hasta la salida siguiente tuvo media 18,2 min y desviación 1,5 min. Intervalo del 95 % e interpretación.

::: solucion
$n = 100 \ge 30$ → $z$: $\ e = 1{,}96 \cdot \frac{1{,}5}{10} = 0{,}29 \then [17{,}9;\ 18{,}5]$.

**Interpretación:** con 95 % de confianza, el tiempo medio entre salidas está entre 17,9 y 18,5 minutos. El 95 % de los intervalos construidos así contienen la verdadera media, y el error es a lo sumo 0,3 min. Otra muestra daría otra media y otra varianza, porque los estimadores son variables aleatorias.
:::
:::

::: ejercicio 8.18 · Monto de compra (99 %)
En 66 ventas: $\bar x = \$208{,}7$ y $\hat s = \$17{,}2$. Intervalo del 99 %.

::: solucion
$e = 2{,}576 \cdot \frac{17{,}2}{\sqrt{66}} = 5{,}45 \qquad 203{,}2 \le \mu \le 214{,}2$

$208{,}7$ y $17{,}2^2 = 295{,}8$ son estimaciones puntuales de la media y la varianza del monto por compra.
:::
:::

::: ejercicio 8.22 · Interpretar una salida de InfoStat
Para estimar el gasto promedio en compras al exterior se obtuvo:

| Variable | Parámetro | Estimación | E.E. | n | LI(95%) | LS(95%) |
|---|---|---|---|---|---|---|
| Gasto | Media | 28,7 | 2,3 | 118 | 24,1 | 33,2 |

Escribí la conclusión usando cada valor.

::: solucion
- **Estimación 28,7:** estimación puntual: el gasto medio por compra sería de unos 28,7 dólares.
- **E.E. 2,3:** error estándar estimado de $\bar x$, $\frac{\hat s}{\sqrt n}$. En promedio, la media muestral se aparta de $\mu$ en unos 2,3 dólares.
- **n = 118:** compras observadas.
- **[24,1; 33,2]:** con un 95 % de confianza, el gasto medio está entre 24,1 y 33,2 dólares. El error de estimación es de unos 4,5 dólares ($\approx 1{,}98 \cdot 2{,}3$: InfoStat usa $t$ con 117 g. l.).
:::
:::
