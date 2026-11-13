# P9.2 Dócima para la media con t y salidas de InfoStat

*Guía, unidad 9: ejercicios 3, 8, 11, 17 y 18 (el 5 y el 10 son del mismo tipo).*

::: ejercicio 9.3 · Lámparas de una marca nueva
La marca actual dura en promedio 1250 horas. Se compra la nueva (más barata) **a menos que** su vida media sea menor. Se prueban 17 lámparas: $\bar x = 1210$ h, $\hat s = 19$ h.

a) ¿Se compra la marca nueva, con $\alpha = 0{,}05$? b) ¿Qué error se puede estar cometiendo?

::: solucion
**a)** $H_0: \mu = 1250$, $H_1: \mu < 1250$. $\sigma$ desconocida y $n = 17 < 30$ → $t_{16}$; $\ t_{(16);\,0{,}05} = -1{,}746$.
$$
\bar x^* = 1250 - 1{,}746 \cdot \frac{19}{\sqrt{17}} = 1242 \qquad t = \frac{1210 - 1250}{19/\sqrt{17}} = -8{,}68
$$
$1210 < 1242$ → **se rechaza $H_0$**: la vida media sería menor que 1250; **no se compra** la marca nueva.

**b)** Como se rechazó $H_0$, el error posible es el **tipo I** (rechazarla siendo cierta), con probabilidad $\alpha = 0{,}05$.

**En InfoStat:** con los 17 datos, Prueba t para una media → valor 1250 → Unilateral izquierda.
:::
:::

::: ejercicio 9.8 · Aspirina en comprimidos
Se exige un 30 % de aspirina por comprimido. En 16 comprimidos: $\bar x = 30{,}4\,\%$, $\hat s = 0{,}8\,\%$.

a) ¿Qué supuesto hace falta? b) ¿Cumple las especificaciones con $\alpha = 0{,}01$?

::: solucion
**a)** Como $n < 30$ y $\sigma$ es desconocida, el porcentaje de aspirina tiene que ser **normal** para poder usar la $t$.

**b)** $H_0: \mu = 30$, $H_1: \mu \ne 30$ (se exige exactamente 30). $\ t_{(15);\,0{,}995} = 2{,}947$; $\ \frac{\hat s}{\sqrt n} = 0{,}2$:
$$
\bar x^*_{1,2} = 30 \mp 2{,}947 \cdot 0{,}2 = 29{,}41 \text{ y } 30{,}59 \qquad t = \frac{0{,}4}{0{,}2} = 2 < 2{,}947
$$
**No se rechaza $H_0$**: cumple las especificaciones.
:::
:::

::: ejercicio 9.11 · Máquina de refrescos (con $\beta$)
Debe descargar 7 onzas. En 10 vasos: $\bar x = 7{,}1$, $\hat s = 0{,}12$.

a) ¿La descarga difiere de 7, con $\alpha = 0{,}10$? b) $\beta$ y potencia si la descarga real fuera 6,8447 onzas.

::: solucion
**a)** Bilateral con $t_9$: $t_{(9);\,0{,}95} = 1{,}833$; $\ \frac{0{,}12}{\sqrt{10}} = 0{,}038$.
$$
\bar x^*_{1,2} = 7 \mp 1{,}833 \cdot 0{,}038 = 6{,}93 \text{ y } 7{,}07
$$
$7{,}1 > 7{,}07$ → **se rechaza $H_0$**: la descarga promedio difiere de 7 onzas.

**b)**
$$
\beta = P(6{,}93 \le \bar x \le 7{,}07 \mid \mu = 6{,}8447) = P(2{,}25 \le t_9 \le 5{,}94) \approx 0{,}025 \qquad 1 - \beta \approx 0{,}975
$$
Si la descarga real fuera 6,8447, la prueba lo detectaría el 97,5 % de las veces.
:::
:::

::: ejercicio 9.17 · Interpretar una salida bilateral
La longitud programada de una pieza es 204 mm. Con $\alpha = 0{,}01$:

| Variable | n | Media | DE | T | p(Bilateral) |
|---|---|---|---|---|---|
| Longitud | 54 | 202,26 | 1,32 | −9,69 | <0,0001 |

::: solucion
$H_0: \mu = 204$, $H_1: \mu \ne 204$.

- $n = 54$ piezas, $\bar x = 202{,}26$ mm, $\hat s = 1{,}32$ mm.
- $T = \frac{202{,}26 - 204}{1{,}32/\sqrt{54}} = -9{,}69$: la media está casi 10 errores estándar por debajo de 204.
- $p < 0{,}0001 < 0{,}01$ → **se rechaza $H_0$**: el proceso está terminando piezas con una longitud media distinta de la programada (menor), y algunas pueden no servir.
:::
:::

::: ejercicio 9.18 · Interpretar una salida unilateral izquierda
¿El impuesto a las compras en el exterior bajó el gasto medio (antes 25,1 dólares)? Con $\alpha = 0{,}05$:

| Variable | n | Media | DE | T | p(Unilateral I) |
|---|---|---|---|---|---|
| Gasto | 45 | 23,8 | 12,7 | −0,7 | 0,2449 |

::: solucion
$H_0: \mu = 25{,}1$, $H_1: \mu < 25{,}1$.

$T = \frac{23{,}8 - 25{,}1}{12{,}7/\sqrt{45}} = -0{,}7$; $\ p = 0{,}2449 > 0{,}05$ → **no se rechaza $H_0$**: la media muestral es menor, pero no lo suficiente. El impuesto no estaría afectando el gasto promedio (posible error tipo II).
:::
:::
