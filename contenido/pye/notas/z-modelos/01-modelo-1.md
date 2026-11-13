# Modelo 1

*20 puntos · alrededor de 1 hora · tablas normal y $t$ (o InfoStat). Preguntas tomadas o adaptadas de los parciales de Sistemas 2020 y de Moodle 2021.*

## Teoría (1 punto cada una)

::: pregunta Un estimador es un valor que puede calcularse a partir de los datos **poblacionales** y que proporciona información sobre el valor del parámetro.
- [ ] Verdadero
- [x] Falso
::: solucion Explicación
El estimador se calcula con los datos de la **muestra** (es una función de las observaciones muestrales). Lo que se calcula con datos poblacionales es el parámetro. Ver [[8.1 Estimadores y sus propiedades]].
:::
:::

::: pregunta Un estimador cuya esperanza coincide con el parámetro y que, además, tiene la menor varianza posible es:
- [ ] Suficiente
- [ ] Consistente y suficiente
- [x] Insesgado y eficiente
- [ ] Solo insesgado
::: solucion Explicación
$E(\hat\theta) = \theta$ es la **insesgabilidad**; la varianza mínima es la **eficiencia**. Ejemplo: $\bar x$ para $\mu$.
:::
:::

::: pregunta La media de la distribución de todas las medias muestrales es igual a la media de la población: $E(\bar x) = \mu$.
- [x] Verdadero
- [ ] Falso
::: solucion Explicación
Vale con y sin reposición, cualquiera sea la población. Ver [[7.3 Distribución de la media muestral]].
:::
:::

::: pregunta En el muestreo sistemático se toma un elemento cada $k$, y $k$ se calcula como:
- [ ] $k = \frac{n}{N}$
- [x] $k = \frac{N}{n}$
- [ ] $k = N - n$
- [ ] $k = \sqrt{N}$
::: solucion Explicación
$k$ es la razón de muestreo. El arranque se elige al azar entre los $k$ primeros.
:::
:::

::: pregunta En una dócima lateral **izquierda**, **no** se rechaza $H_0$ si el valor observado del estimador es mayor que el punto crítico.
- [x] Verdadero
- [ ] Falso
::: solucion Explicación
En la izquierda, la zona de rechazo está a la izquierda del punto crítico: se rechaza si $\hat\theta < \hat\theta^*$. Si es mayor, cae en la zona de aceptación.
:::
:::

::: pregunta El nivel de significación de un test de hipótesis (marcá todas las correctas):
- [x] suele ser pequeño y lo fija el investigador o un convenio generalmente aceptado
- [x] al disminuir, hace aumentar la probabilidad del error de tipo II
- [ ] es la probabilidad de no rechazar $H_0$ cuando es falsa
- [ ] ninguna de las otras es cierta
::: solucion Explicación
$\alpha = P(\text{rechazar } H_0 \mid H_0 \text{ cierta})$ lo fija el investigador (0,05; 0,01). $\alpha$ y $\beta$ varían en sentido inverso. "No rechazar $H_0$ falsa" es $\beta$.
:::
:::

::: pregunta La dócima uniformemente más potente:
- [ ] minimiza $1-\beta$
- [ ] minimiza $\alpha$
- [x] minimiza $\beta$
- [ ] maximiza $\beta$
::: solucion Explicación
Para un $\alpha$ fijo, tiene la mayor potencia $1-\beta$ para todos los valores del parámetro, o sea, el menor $\beta$. Ver [[9.6 Curva OC y curva de potencia]].
:::
:::

::: pregunta Una hipótesis estadística es una aseveración o conjetura con respecto a un **estadístico muestral**.
- [ ] Verdadero
- [x] Falso
::: solucion Explicación
Es una conjetura sobre un **parámetro** de la población. El estadístico se conoce (se calcula con la muestra); no tiene sentido hacer hipótesis sobre él.
:::
:::

## Práctica (3 puntos cada uno)

::: ejercicio Glucosa en sangre (Sistemas 2020)
El nivel de glucosa en sangre en ayunas de un grupo de diabéticos es normal con media $106$ mg/100 ml y desviación $8$ mg/100 ml.

a) Probabilidad de que un diabético tenga menos de 120.
b) Porcentaje de diabéticos con glucosa entre 90 y 130.
c) El 33 % de los diabéticos tiene un nivel inferior a ¿cuánto?

::: solucion
$X \sim N(106;\ 8)$.

**a)**
$$
P(X < 120) = P\!\left(z < \frac{120 - 106}{8}\right) = P(z < 1{,}75) = 0{,}9599
$$

**b)**
::: pasos
P(90 < X < 130) = P\!\left(\frac{90-106}{8} < z < \frac{130-106}{8}\right) = P(-2 < z < 3)
  = P(z < 3) - P(z < -2) = 0{,}99865 - 0{,}02275 = 0{,}9759     // simetría: $P(z<-2) = 1 - P(z<2)$
:::
El **97,59 %**.

**c)** Se busca $x_0$ con $P(X < x_0) = 0{,}33$. Como es menor que 0,5, $z$ es negativo: $P(z < z_0) = 0{,}33 \then z_0 = -0{,}44$.
$$
x_0 = \mu + z_0\,\sigma = 106 - 0{,}44 \cdot 8 = 102{,}48
$$

**En InfoStat:** Estadísticas → Probabilidades y cuantiles → **Normal (media, varianza)** con media $106$ y **varianza $64$**.
- a) Valor de x = 120 → Prob $(X \le x) = 0{,}9599$.
- b) Prob para 130 menos prob para 90.
- c) En "Prob $(X \le x)$" poner $0{,}33$ → $x = 102{,}48$.
:::
:::

::: ejercicio Un dado (Sistemas 2020)
Se lanza un dado 720 veces. Calculá la probabilidad de que salga **al menos 110 veces** el seis.

::: solucion
$X$ = cantidad de seises, binomial con $n = 720$ y $P = \frac16$. Como $n > 30$, se aproxima con la normal ([[6.6 Aproximación de modelos discretos a la normal]]):

$$
E(X) = nP = 720 \cdot \tfrac16 = 120 \qquad \sigma = \sqrt{nPQ} = \sqrt{720 \cdot \tfrac16 \cdot \tfrac56} = \sqrt{100} = 10
$$

$$
P(X \ge 110) = P\!\left(z \ge \frac{110 - 120}{10}\right) = P(z \ge -1) = P(z \le 1) = 0{,}8413
$$

(Sin corrección por continuidad, como trabaja el apunte con $n > 30$. Era la opción correcta del parcial.)

**En InfoStat:** Probabilidades y cuantiles → Normal con media $120$ y varianza $100$ → valor $110$ → Prob $(X > x) = 0{,}8413$ (es el complemento de Prob $(X \le x)$).
:::
:::

::: ejercicio Intervalo para la media con tabla de frecuencias (Moodle 2021)
Se obtuvo esta muestra de una población:

| $x_i$ | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|
| $f_i$ | 1 | 6 | 3 | 7 | 8 |

Estimá la media poblacional con un intervalo de confianza del **95 %**.

::: solucion
**Medidas de la muestra:**
::: pasos
n = 1 + 6 + 3 + 7 + 8 = 25
\bar x = \frac{\sum x_i f_i}{n} = \frac{3 + 24 + 15 + 42 + 56}{25} = \frac{140}{25} = 5{,}6
\hat s^2 = \frac{\sum x_i^2 f_i - n\bar x^2}{n-1} = \frac{824 - 25 \cdot 5{,}6^2}{24} = \frac{824 - 784}{24} = 1{,}6667   // $\sum x_i^2 f_i = 9 + 96 + 75 + 252 + 392 = 824$
\hat s = 1{,}2910
:::

**Distribución:** $\sigma$ desconocida y $n = 25 < 30$ → **$t$ con 24 g. l.** $\quad t_{(24);\,0{,}975} = 2{,}064$.

$$
e = 2{,}064 \cdot \frac{1{,}2910}{\sqrt{25}} = 0{,}5329
\qquad
\boxed{5{,}067 \le \mu \le 6{,}133}
$$

Con el 95 % de confianza, la media poblacional está entre 5,07 y 6,13.

::: ojo
Con 99 % (otra versión del mismo parcial): $t_{(24);\,0{,}995} = 2{,}797 \then 4{,}878 \le \mu \le 6{,}322$. Opciones trampa del parcial: usar $z = 1{,}96$, o dividir por $n$ en lugar de $n-1$ en la varianza.
:::

**En InfoStat:**
1. Cargar los **25 valores** en una columna (cada $x_i$ repetido $f_i$ veces: un 3, seis 4, tres 5, siete 6 y ocho 7).
2. Estadísticas → Inferencia basada en una muestra → **Intervalos de confianza**.
3. Elegir la columna, **Bilateral**, Confianza **95**, tildar **Media** → Aceptar.
4. La salida da $\bar x = 5{,}60$ y el intervalo $[5{,}07;\ 6{,}13]$.
:::
:::

::: ejercicio Tiempo de entrega (Moodle 2021)
Una empresa de delivery asegura que los pedidos se entregan en un tiempo promedio de **a lo sumo 2 horas**, con varianza **conocida** de $0{,}25$ h². En una muestra de 25 pedidos la media fue de $2{,}1$ horas. Con $\alpha = 0{,}05$:

a) ¿Puede ser verdadera la afirmación?
b) Calculá la potencia de la prueba si el tiempo medio real fuera de $2{,}3$ horas.

::: solucion
**a)** La afirmación tiene la igualdad: $H_0: \mu \le 2$ (se usa $\mu = 2$), $H_1: \mu > 2$. **Lateral derecha.**

$\sigma$ conocida $\then$ normal: $\sigma_{\bar x} = \frac{\sqrt{0{,}25}}{\sqrt{25}} = \frac{0{,}5}{5} = 0{,}1$.

$$
z = \frac{2{,}1 - 2}{0{,}1} = 1 < z_{0{,}95} = 1{,}645
$$

**No se rechaza $H_0$**: se acepta la afirmación de la empresa. (Equivale a $\bar x = 2{,}1 < \bar x^* = 2 + 1{,}645 \cdot 0{,}1 = 2{,}1645$.)

::: ojo
El dato "varianza de la muestra 0,36" que trae el enunciado original es una trampa: como la varianza poblacional se **conoce**, se usa esa y la normal (las opciones con $t$ estaban mal).
:::

**b)** Se re-estandariza el punto crítico con $\mu_1 = 2{,}3$:

$$
1 - \beta = P(\bar x > 2{,}1645 \mid \mu = 2{,}3) = P\!\left(z > \frac{2{,}1645 - 2{,}3}{0{,}1}\right) = P(z > -1{,}355) \approx 0{,}912
$$

$\beta \approx 0{,}088$: si el tiempo real fuera 2,3 h, la prueba lo detectaría el 91 % de las veces.

**En InfoStat (potencia):** Aplicaciones → Didácticas → Gráficos de funciones de densidad continuas → Normal, media $2$, varianza $0{,}01$ ($= \sigma^2/n$) → "Mayores o iguales que" con probabilidad $0{,}05$ → punto crítico $2{,}1645$. **Clonar**, cambiar la media a $2{,}3$ → la probabilidad a la derecha del punto crítico es la potencia; con **Complementario** se obtiene $\beta$.
:::
:::
