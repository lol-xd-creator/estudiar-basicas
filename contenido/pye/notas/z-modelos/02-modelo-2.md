# Modelo 2

*20 puntos · alrededor de 1 hora · tablas normal y $t$ (o InfoStat). Preguntas tomadas o adaptadas de los parciales de Sistemas 2020 y de Moodle 2021.*

## Teoría (1 punto cada una)

::: pregunta La **varianza** de la distribución de las medias muestrales es igual a la desviación estándar de la población dividida por la raíz cuadrada del tamaño de la muestra.
- [ ] Verdadero
- [x] Falso
::: solucion Explicación
$\frac{\sigma}{\sqrt n}$ es la **desviación** (error estándar) de $\bar x$. La varianza es $\sigma^2_{\bar x} = \frac{\sigma^2}{n}$ (con reposición).
:::
:::

::: pregunta ¿Cuáles son razones por las que se trabaja con muestras?
- [ ] Datos simples, datos repetidos
- [ ] Datos sensibles, censo
- [x] Costo, tiempo, pruebas destructivas
- [ ] Costo, datos simples, pruebas destructivas
::: solucion Explicación
El apunte agrega la **mayor exactitud** (menos errores de observación que un censo). Ver [[7.1 Población, muestra y razones para muestrear]].
:::
:::

::: pregunta Para calcular la afijación óptima (de Neyman) hace falta la desviación estándar **de cada estrato** de la población.
- [x] Verdadero
- [ ] Falso
::: solucion Explicación
$n_i = \frac{N_i\,\sigma_i}{\sum N_i\,\sigma_i}\,n$: se usa $\sigma_i$ de cada estrato, no la desviación de toda la población.
:::
:::

::: pregunta En una prueba de hipótesis para la media con varianza **conocida**, bilateral, los puntos críticos son:
- [ ] $\mu_0 \pm t\,\frac{\sigma}{\sqrt n}$
- [ ] $\mu_0 \pm z\,\frac{s}{\sqrt n}$
- [ ] $\mu_1 \pm z\,\frac{\sigma}{\sqrt n}$
- [x] $\mu_0 \pm z\,\frac{\sigma}{\sqrt n}$
::: solucion Explicación
Se calculan con la distribución bajo $H_0$ (centrada en $\mu_0$), con $z$ porque $\sigma$ es conocida: $\bar x^*_{1,2} = \mu_0 \mp z_{1-\alpha/2}\frac{\sigma}{\sqrt n}$.
:::
:::

::: pregunta En las pruebas de hipótesis, la distribución $t$ se usa para:
- [ ] pruebas de medias con varianzas poblacionales conocidas
- [x] pruebas de medias con varianzas poblacionales desconocidas
- [ ] pruebas de proporciones con muestras pequeñas
- [ ] pruebas de proporciones
::: solucion Explicación
La $t$ reemplaza $\sigma$ por $\hat s$ (población normal, $n < 30$). Las proporciones se docimán con $z$.
:::
:::

::: pregunta En la distribución de la proporción muestral, con muestras grandes y muestreo con reposición:
- [ ] $E(\hat p) \ne P$
- [ ] $E(\hat p) = P\left(\frac{N-n}{N-1}\right)$
- [x] $E(\hat p) = P$
- [ ] $E(P) = \hat p$
::: solucion Explicación
$\hat P$ es insesgado: $E(\hat P) = P$ siempre. El factor $\frac{N-n}{N-1}$ afecta a la **varianza** (sin reposición), no a la esperanza.
:::
:::

::: pregunta Al tomar decisiones se pueden cometer errores. El error tipo I es rechazar la hipótesis nula bajo el supuesto de que es cierta.
- [x] Verdadero
- [ ] Falso
::: solucion Explicación
$\alpha = P(\text{rechazar } H_0 \mid H_0 \text{ cierta})$. El tipo II es no rechazarla siendo falsa.
:::
:::

::: pregunta El teorema central del límite dice que la media de una muestra de una población **que puede no ser normal** sigue aproximadamente una distribución **normal estándar** si $n$ es suficientemente grande.
- [ ] Verdadero
- [x] Falso
::: solucion Explicación
$\bar x$ es aproximadamente **normal con media $\mu$ y desviación $\frac{\sigma}{\sqrt n}$**, no estándar. La que es $N(0;1)$ es la estandarizada $z = \frac{\bar x - \mu}{\sigma/\sqrt n}$. (Así lo corrigió la cátedra en 2021.)
:::
:::

## Práctica (3 puntos cada uno)

::: ejercicio Normal: valores y desvíos (Sistemas 2020)
a) En una $N(9;\ 0{,}5)$, calculá $K$ tal que $P(X \le K) = 0{,}8212$.
b) En la misma distribución, $K$ tal que $P(X \ge K) = 0{,}8830$.
c) Las puntuaciones de un test son $N(60;\ 10)$. Calculá $P(\lvert X - 60\rvert \ge 20)$.

::: solucion
**a)** $P(z \le z_0) = 0{,}8212 \then z_0 = 0{,}92$ (directo de la tabla).
$$
K = 9 + 0{,}92 \cdot 0{,}5 = 9{,}46
$$

**b)** Como $0{,}8830 > 0{,}5$ es la probabilidad **a la derecha**, $K$ está a la izquierda de la media:
$$
P(z \ge z_0) = 0{,}8830 \then P(z \le -z_0) = 0{,}8830 \then -z_0 = 1{,}19 \then z_0 = -1{,}19
$$
$$
K = 9 - 1{,}19 \cdot 0{,}5 = 8{,}41
$$

**c)** $\lvert X - 60\rvert \ge 20$ significa $X \le 40$ o $X \ge 80$, es decir $\lvert z\rvert \ge 2$:
$$
P(\lvert z\rvert \ge 2) = 2\,\big[1 - P(z < 2)\big] = 2\,(1 - 0{,}9772) = 0{,}0456
$$

**En InfoStat:** Probabilidades y cuantiles → Normal.
- a) Media 9, **varianza 0,25**, Prob $(X \le x) = 0{,}8212$ → $x = 9{,}46$.
- b) Prob $(X > x) = 0{,}8830$ → $x = 8{,}41$.
- c) Media 60, varianza 100: Prob $(X \le 40)$ + Prob $(X \ge 80) = 0{,}0228 + 0{,}0228$.
:::
:::

::: ejercicio Uniforme (Sistemas 2020)
a) La corriente $X$ (en mA) en un alambre delgado tiene rango $[0;\ 20]$ y densidad $f(x) = 0{,}05$. Calculá $E(X)$ y $V(X)$.
b) Una variable $Y$ es uniforme en $(2;\ 4)$. Calculá $P(2{,}2 < Y < 3{,}5)$ (dos decimales).

::: solucion
**a)** $f(x) = 0{,}05 = \frac{1}{20 - 0}$: es uniforme con $a = 0$, $b = 20$ ([[6.2 Modelo uniforme continuo]]).
$$
E(X) = \frac{0 + 20}{2} = 10 \qquad V(X) = \frac{(20 - 0)^2}{12} = \frac{400}{12} = 33{,}33
$$

**b)**
$$
P(2{,}2 < Y < 3{,}5) = \frac{3{,}5 - 2{,}2}{4 - 2} = \frac{1{,}3}{2} = 0{,}65
$$

**En InfoStat:** Probabilidades y cuantiles → **Uniforme (a,b)** con $a = 2$, $b = 4$: Prob $(Y \le 3{,}5) = 0{,}75$ y Prob $(Y \le 2{,}2) = 0{,}10$; la diferencia es $0{,}65$.
:::
:::

::: ejercicio Intervalo para la proporción y tamaño de muestra
En una muestra aleatoria de 400 usuarios de una aplicación, 88 reportaron fallas.

a) Estimá la proporción de usuarios con fallas con un intervalo del **95 %**.
b) ¿Cuántos usuarios hay que encuestar para estimarla con un error no mayor al 3 % y la misma confianza, usando la estimación de a)? ¿Y si no se tuviera ninguna información previa?

::: solucion
**a)** $\hat P = \frac{88}{400} = 0{,}22$. Muestra grande → normal, con $\hat P$ en el error estándar ([[8.5 Intervalo de confianza para la proporción]]):
::: pasos
\hat\sigma_{\hat P} = \sqrt{\frac{0{,}22 \cdot 0{,}78}{400}} = 0{,}0207
e = 1{,}96 \cdot 0{,}0207 = 0{,}0406
0{,}179 \le P \le 0{,}261
:::
Entre el 17,9 % y el 26,1 % de los usuarios tiene fallas, con 95 % de confianza.

**b)**
$$
n \ge \frac{1{,}96^2 \cdot 0{,}22 \cdot 0{,}78}{0{,}03^2} = \frac{0{,}6592}{0{,}0009} = 732{,}5 \then n = 733
$$

Sin información: $P = 0{,}5$ (lo más conservador):
$$
n \ge \frac{1{,}96^2 \cdot 0{,}25}{0{,}0009} = 1067{,}1 \then n = 1068
$$

**En InfoStat:** cargar una columna con 400 datos (88 unos y 312 ceros) → Estadísticas → Inferencia basada en una muestra → Intervalos de confianza → Bilateral, Confianza 95, tildar **Proporción** con éxito $= 1$.
:::
:::

::: ejercicio Dócima para la proporción
El área de soporte afirma que **a lo sumo el 10 %** de los tickets se reabren. En una muestra de 150 tickets se reabrieron 21. Con $\alpha = 0{,}05$, ¿se puede rechazar la afirmación? Calculá también el valor p.

::: solucion
$H_0: P \le 0{,}10$ (se usa $P_0 = 0{,}10$), $H_1: P > 0{,}10$. **Lateral derecha.**

$\hat P = \frac{21}{150} = 0{,}14$. En la dócima se usa **$P_0$** en el error estándar ([[9.5 Dócima para la proporción]]):

::: pasos
\sigma_0 = \sqrt{\frac{0{,}10 \cdot 0{,}90}{150}} = 0{,}0245
z = \frac{0{,}14 - 0{,}10}{0{,}0245} = 1{,}633
:::

$z = 1{,}633 < z_{0{,}95} = 1{,}645$ → **no se rechaza $H_0$**. Equivale a $\hat P = 0{,}14 < \hat P^* = 0{,}10 + 1{,}645 \cdot 0{,}0245 = 0{,}1403$.

**Valor p:** $P(z > 1{,}633) \approx 0{,}051 > 0{,}05$. Por muy poco, no hay evidencia suficiente para decir que se reabren más del 10 %.

::: ojo
Está **justo en el límite**: con $\alpha = 0{,}10$ se rechazaría. Por eso conviene informar el valor p, que dice qué tan cerca se estuvo.
:::

**En InfoStat:** Probabilidades y cuantiles → Normal con media $0{,}10$ y varianza $\frac{0{,}1 \cdot 0{,}9}{150} = 0{,}0006$ → Prob $(X > 0{,}14) \approx 0{,}051$ (el valor p), o con probabilidad $0{,}05$ a la derecha → punto crítico $0{,}1403$.
:::
:::
