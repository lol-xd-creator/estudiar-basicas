# P9.3 Dócima para la proporción y curva de potencia

*Guía, unidad 9: ejercicios 12, 14, 15 y 16 (el 13 es como el 16, con la curva OC).*

::: ojo
En la dócima para $P$, el error estándar se calcula con **$P_0$** (el valor de $H_0$), no con $\hat P$. Para $\beta$ y la potencia, con **$P_1$**.
:::

::: ejercicio 9.12 · Audiencia de un programa (bilateral)
La audiencia de un programa era del 50 %; se sospecha que cambió. De 100 televidentes, 45 lo ven. ¿Cambió, con $\alpha = 0{,}05$?

::: solucion
$H_0: P = 0{,}5$, $H_1: P \ne 0{,}5$. $\ \sigma_0 = \sqrt{\frac{0{,}5 \cdot 0{,}5}{100}} = 0{,}05$:
$$
\hat P^*_{1,2} = 0{,}5 \mp 1{,}96 \cdot 0{,}05 = 0{,}402 \text{ y } 0{,}598
$$
$\hat P = 0{,}45$ está entre los dos → **no se rechaza $H_0$**: por ahora no hay evidencia de que la proporción haya cambiado.
:::
:::

::: ejercicio 9.14 · Intención de voto (con $\beta$)
Un experto dice que votaría **como máximo** el 48 %. En un sondeo de 1500 personas, 800 piensan votar. Con $\alpha = 0{,}01$:

a) ¿Se equivoca el experto? Justificá la distribución. b) $\beta$ y $1-\beta$ si la proporción real es 48 % y si es 55 %.

::: solucion
**a)** $H_0: P = 0{,}48$, $H_1: P > 0{,}48$. Con $n = 1500$, por el TCL $\hat P$ es aproximadamente normal.
$$
\sigma_0 = \sqrt{\frac{0{,}48 \cdot 0{,}52}{1500}} = 0{,}0129 \qquad \hat P^* = 0{,}48 + 2{,}326 \cdot 0{,}0129 = 0{,}51
$$
$\hat P = \frac{800}{1500} = 0{,}533 > 0{,}51$ → **se rechaza $H_0$**: la intención de voto supera el 48 %, el experto se equivoca.

**b)**
- $P = 0{,}48$ (es $H_0$): "no rechazar" tiene probabilidad $1 - \alpha = 0{,}99$, y rechazar, $\alpha = 0{,}01$.
- $P = 0{,}55$: $\sigma_1 = \sqrt{\frac{0{,}55 \cdot 0{,}45}{1500}} = 0{,}0128$; $\ \beta = P\!\left(z \le \frac{0{,}51 - 0{,}55}{0{,}0128}\right) = P(z \le -3{,}11) = 0{,}0009$; $\ 1 - \beta = 0{,}9991$.
:::
:::

::: ejercicio 9.15 · Renovación de suscripciones (con potencia)
El 60 % de los abonados renueva. Por la recesión se teme una baja: de 200 encuestados, 105 renuevan.

a) Hipótesis. b) Prueba con $\alpha = 0{,}05$. c) Potencia si $P = 0{,}50$.

::: solucion
**a)** Lo que preocupa es una **reducción**: $H_0: P = 0{,}60$, $H_1: P < 0{,}60$.

**b)** $\sigma_0 = \sqrt{\frac{0{,}6 \cdot 0{,}4}{200}} = 0{,}0346$; $\ \hat P^* = 0{,}60 - 1{,}645 \cdot 0{,}0346 = 0{,}543$.
$\hat P = \frac{105}{200} = 0{,}525 < 0{,}543$ → **se rechaza $H_0$**: la proporción que renueva habría bajado.

**c)** $\sigma_1 = \sqrt{\frac{0{,}5 \cdot 0{,}5}{200}} = 0{,}0354$:
$$
1 - \beta = P(\hat P < 0{,}543 \mid P = 0{,}5) = P\!\left(z < \frac{0{,}543 - 0{,}5}{0{,}0354}\right) = P(z < 1{,}22) = 0{,}8888
$$
:::
:::

::: ejercicio 9.16 · Curva de potencia
$H_0: P = 0{,}50$, $H_1: P < 0{,}50$, $\alpha = 0{,}025$, $n = 100$; zona de rechazo $\hat P < 0{,}402$.

a) $\beta$ para $P = 0{,}40;\ 0{,}42;\ 0{,}44;\ 0{,}46;\ 0{,}48$. b) ¿Y para $P = 0{,}50$? c) Tabla y gráfico de la función de potencia.

::: solucion
**a)** $\beta = P(\hat P \ge 0{,}402 \mid P) = P\!\left(z \ge \frac{0{,}402 - P}{\sqrt{P(1-P)/100}}\right)$:

| $P$ | 0,40 | 0,42 | 0,44 | 0,46 | 0,48 | 0,50 |
|---|---|---|---|---|---|---|
| $z$ | 0,04 | −0,36 | −0,76 | −1,16 | −1,56 | −1,96 |
| $\beta$ | 0,4840 | 0,6406 | 0,7764 | 0,8770 | 0,9406 | 0,9750 |
| $1 - \beta$ | 0,5160 | 0,3594 | 0,2236 | 0,1230 | 0,0594 | 0,0250 |

**b)** Con $P = 0{,}50$, $H_0$ es cierta: "no rechazar" es $1 - \alpha = 0{,}975$ y la "potencia" es $\alpha = 0{,}025$.

**c)**
```grafico
titulo: Función de potencia (probabilidad de rechazar $H_0$)
segmento (0.40, 0.516) (0.42, 0.3594) ; rojo ; gruesa
segmento (0.42, 0.3594) (0.44, 0.2236) ; rojo ; gruesa
segmento (0.44, 0.2236) (0.46, 0.123) ; rojo ; gruesa
segmento (0.46, 0.123) (0.48, 0.0594) ; rojo ; gruesa
segmento (0.48, 0.0594) (0.50, 0.025) ; rojo ; gruesa
(0.40, 0.516)
(0.42, 0.3594)
(0.44, 0.2236)
(0.46, 0.123)
(0.48, 0.0594)
(0.50, 0.025) ; "$\alpha$"
x: 0.39..0.51
y: -0.02..0.6
aspecto: libre
alto: 240
```

Cuanto más lejos está $P$ de 0,50 (hacia la izquierda), más potente es la prueba. La tabla de $\beta$ es la **función operatoria característica** (curva OC), su complemento.
:::
:::
