# P9.1 Dócima para la media con sigma conocida

*Guía, unidad 9: ejercicios 1, 6, 7 y 9 (el 4 es como el 1; Garibaldi y Rimoldi calculan la potencia con InfoStat igual que en el 6).*

::: ejercicio 9.1 · Los tres tipos de dócima con los mismos datos
Se supone $\mu = 75{,}2$ y $\sigma = 5{,}72$. Una muestra de 45 elementos dio $\bar x = 78{,}1$.

a) Prueba lateral derecha con $\alpha = 0{,}05$. b) Lateral izquierda con $\alpha = 0{,}01$. c) Bilateral con $\alpha = 0{,}10$.
d) Interpretá $T$ y $p$ en esta salida de InfoStat de la prueba a):

| Variable | n | Media | DE | T | p(Unilateral D) |
|---|---|---|---|---|---|
| Variable X | 45 | 78,10 | 5,72 | 3,40 | 0,0007 |

::: solucion
$\sigma_{\bar x} = \frac{5{,}72}{\sqrt{45}} = 0{,}853$.

**a)** $H_0: \mu = 75{,}2$, $H_1: \mu > 75{,}2$. $\ \bar x^* = 75{,}2 + 1{,}645 \cdot 0{,}853 = 76{,}6$. Como $78{,}1 > 76{,}6$, **se rechaza $H_0$**: el promedio sería mayor que 75,2.

**b)** $H_1: \mu < 75{,}2$. $\ \bar x^* = 75{,}2 - 2{,}326 \cdot 0{,}853 = 73{,}2$. Como $78{,}1 > 73{,}2$, **no se rechaza**: no sería menor que 75,2.

**c)** $H_1: \mu \ne 75{,}2$. $\ \bar x^*_{1,2} = 75{,}2 \mp 1{,}645 \cdot 0{,}853 = 73{,}8$ y $76{,}6$. Como $78{,}1 > 76{,}6$, **se rechaza**: sería distinto de 75,2.

**d)** $T = \frac{78{,}1 - 75{,}2}{5{,}72/\sqrt{45}} = 3{,}40$ es el estadístico; supera al punto crítico $1{,}645$. $p = 0{,}0007$ es la probabilidad de un valor tan extremo si $H_0$ fuera cierta; como $0{,}0007 < 0{,}05$, se rechaza.

::: ojo
**Los mismos datos dan decisiones distintas** según $H_1$ y $\alpha$: primero se plantea la hipótesis, después se mira la muestra.
:::

**En InfoStat:** con los 45 datos → **Prueba t para una media** → valor del parámetro 75,2 → Unilateral derecha (o izquierda, o bilateral). Para b) la salida da $p(\text{Unilateral I}) = 0{,}9993 > 0{,}01$: no se rechaza.
:::
:::

::: ejercicio 9.6 · Resistencia de fibras (con potencia)
El proveedor dice que la resistencia media es 33,5 kg con varianza 64 kg². En 25 fibras, la media fue 30 kg. El comprador suspende la compra si la resistencia media es **menor**.

a) ¿Se descarta lo que dice el proveedor, con $\alpha = 0{,}05$? b) Potencia si la resistencia media real es 30 kg.

::: solucion
**a)** $H_0: \mu = 33{,}5$, $H_1: \mu < 33{,}5$. $\ \sigma_{\bar x} = \frac{8}{5} = 1{,}6$.
$$
\bar x^* = 33{,}5 - 1{,}645 \cdot 1{,}6 = 30{,}87
$$
$30 < 30{,}87$ → **se rechaza $H_0$**: la resistencia sería menor; el comprador debería suspender la compra.

**b)**
$$
1 - \beta = P(\bar x < 30{,}87 \mid \mu = 30) = P\!\left(z < \frac{30{,}87 - 30}{1{,}6}\right) = P(z < 0{,}54) = 0{,}7054
$$
(La guía redondea el punto crítico a 30,9 y da $0{,}7123$.)

**En InfoStat:** Gráficos de funciones de densidad continuas → Normal, media **33,5**, varianza **2,56** ($= 64/25$) → *Menores o iguales que* con $0{,}05$ → punto crítico 30,87 → **Clonar** → media 30 → potencia ≈ 0,71.
:::
:::

::: ejercicio 9.7 · Tiempo de preparación de un equipo (con $\beta$)
El equipo debe exigir en promedio **10 minutos** de preparación por hora; si supera ese tiempo, no se compra. En 40 horas de operación hubo 450 minutos de preparación. $\sigma = 3$ min.

a) ¿Se rechaza que el equipo es adecuado, con $\alpha = 0{,}01$? b) $\beta$ y potencia si el tiempo medio real es 11 minutos.

::: solucion
$\bar x = \frac{450}{40} = 11{,}25$ min por hora. $\ \sigma_{\bar x} = \frac{3}{\sqrt{40}} = 0{,}474$.

**a)** $H_0: \mu = 10$, $H_1: \mu > 10$. $\ \bar x^* = 10 + 2{,}326 \cdot 0{,}474 = 11{,}10$. Como $11{,}25 > 11{,}10$, **se rechaza $H_0$**: no se compra el equipo.

**b)**
$$
\beta = P(\bar x \le 11{,}10 \mid \mu = 11) = P\!\left(z \le \frac{11{,}10 - 11}{0{,}474}\right) = P(z \le 0{,}21) = 0{,}5832 \qquad 1 - \beta = 0{,}4168
$$
Si el tiempo real fuera 11 minutos, la prueba lo detectaría solo el 42 % de las veces: 11 está muy cerca de 10.
:::
:::

::: ejercicio 9.9 · Botellas de leche chocolatada (bilateral, con $\beta$)
La máquina debe descargar 32 onzas con $\sigma = 0{,}06$. En 36 botellas, $\bar x = 32{,}01$.

a) ¿Funciona bien, con $\alpha = 0{,}05$? b) $\beta$ y $1 - \beta$ para $\mu = 31{,}99$ y $\mu = 32{,}1$.

::: solucion
**a)** $H_0: \mu = 32$, $H_1: \mu \ne 32$. $\ \sigma_{\bar x} = \frac{0{,}06}{6} = 0{,}01$:
$$
\bar x^*_{1,2} = 32 \mp 1{,}96 \cdot 0{,}01 = 31{,}98 \text{ y } 32{,}02
$$
$31{,}98 < 32{,}01 < 32{,}02$ → **no se rechaza**: la máquina funciona según lo programado.

**b)** $\beta = P(31{,}98 \le \bar x \le 32{,}02 \mid \mu_1)$:

| $\mu_1$ | $z$ de los puntos críticos | $\beta$ | $1 - \beta$ |
|---|---|---|---|
| 31,99 | $-1$ y $3$ | $0{,}9987 - 0{,}1587 = 0{,}84$ | $0{,}16$ |
| 32,10 | $-12$ y $-8$ | $0$ | $1$ |

Una diferencia de 0,01 casi no se detecta; una de 0,1 se detecta siempre.

**En InfoStat:** Gráficos de funciones de densidad continuas → Normal, media 32, varianza 0,0001 → *Entre* con $0{,}95$ → puntos críticos → Clonar con media 31,99 → *Entre* da $\beta$ y *Complementario* la potencia.
:::
:::
