# 9.7 Repaso de la unidad 9

*Primero intentá responder sin mirar; después abrí la respuesta.*

## Teoría

::: ejercicio ¿Qué es una dócima de hipótesis?
::: respuesta
Un experimento aleatorio para decidir sobre la veracidad o falsedad de la hipótesis nula (que por lo general indica ausencia de cambios o efectos en la población), con la evidencia de una muestra y midiendo los riesgos de equivocarse: aceptarla siendo falsa o rechazarla siendo cierta.
:::
:::

::: ejercicio Definí $\alpha$, $\beta$ y potencia.
::: respuesta
- $\alpha = P(\text{rechazar } H_0 \mid H_0 \text{ cierta})$: error tipo I, nivel de significación. Lo fija el investigador.
- $\beta = P(\text{aceptar } H_0 \mid H_0 \text{ falsa})$: error tipo II.
- $1 - \beta = P(\text{rechazar } H_0 \mid H_0 \text{ falsa})$: potencia.
:::
:::

::: ejercicio ¿Por qué $\alpha$ y $\beta$ no son complementarias? ¿Cómo se relacionan?
::: respuesta
Porque se calculan sobre distribuciones distintas: $\alpha$ bajo $H_0$ cierta y $\beta$ bajo $H_0$ falsa. Varían en sentido inverso: achicar uno agranda el otro. La única forma de bajar los dos a la vez es aumentar $n$.
:::
:::

::: ejercicio ¿Qué determina si una dócima es bilateral, lateral derecha o izquierda?
::: respuesta
La hipótesis alternativa: $\ne$ (dos colas), $>$ (cola derecha) o $<$ (cola izquierda). La zona de rechazo se calcula con la distribución bajo $H_0$ cierta, pero la ubica $H_1$.
:::
:::

::: ejercicio ¿Qué es el valor p y cómo se decide con él?
::: respuesta
La probabilidad, si $H_0$ fuera cierta, de obtener un estadístico igual o más extremo que el observado (en la dirección de $H_1$). Si $p \le \alpha$ se rechaza $H_0$; si $p > \alpha$, no.
:::
:::

::: ejercicio ¿Qué son las curvas OC y de potencia?
::: respuesta
Para un $\alpha$ dado, la curva de potencia da $1-\beta$ para cada valor posible del parámetro, y la OC da $\beta$ (son complementarias). En $\theta_0$ la potencia vale $\alpha$ y la OC $1-\alpha$. Sirven para comparar dócimas: la uniformemente más potente tiene mayor $1-\beta$ en todo el espacio paramétrico.
:::
:::

::: ejercicio ¿Qué relación hay entre una dócima bilateral y un intervalo de confianza?
::: respuesta
Con el mismo $\alpha$: si se acepta $H_0$, el intervalo del $(1-\alpha)$ contiene a $\theta_0$; si se rechaza, no lo contiene. Se rechaza $H_0$ si $\theta_0$ queda fuera del intervalo.
:::
:::

## Ejercicio integrador

::: ejercicio Duración de lámparas
Un fabricante afirma que sus lámparas duran en promedio **al menos** 1000 horas. Se sospecha que duran menos. Con $\sigma = 80$ h, una muestra de 64 lámparas dio $\bar x = 980$ h. Usá $\alpha = 0{,}05$.

a) Planteá las hipótesis. b) Punto crítico y regla de decisión. c) Decidí. d) Calculá $\beta$ y la potencia si en realidad $\mu = 975$.

::: solucion
a) $H_0: \mu \ge 1000$ (se usa $\mu = 1000$), $H_1: \mu < 1000$: lateral izquierda.

b) $\sigma_{\bar x} = \frac{80}{8} = 10$; $\ \bar x^* = 1000 - 1{,}645 \cdot 10 = 983{,}55$. Se rechaza $H_0$ si $\bar x < 983{,}55$.

c) $980 < 983{,}55 \then$ **se rechaza $H_0$**: hay evidencia de que duran menos de 1000 horas. (Con $z$: $z = \frac{980 - 1000}{10} = -2 < -1{,}645$.)

d) $1 - \beta = P(\bar x < 983{,}55 \mid \mu = 975) = P\!\left(z < \frac{983{,}55 - 975}{10}\right) = P(z < 0{,}855) \approx 0{,}80$, así que $\beta \approx 0{,}20$.
:::
:::

::: aclaracion
Este ejercicio integrador no está en el material: lo armé para practicar todos los pasos juntos, con las fórmulas del apunte.
:::

## Preguntas rápidas

::: pregunta "No se rechaza $H_0$" quiere decir que:
- [ ] se demostró que $H_0$ es cierta
- [x] la muestra no da evidencia suficiente para rechazarla
- [ ] $\beta = 0$
::: solucion Explicación
Aceptar $H_0$ es no encontrar evidencia en contra; puede ser falsa y estarse cometiendo un error tipo II.
:::
:::

::: pregunta Con $\alpha = 0{,}01$ en una dócima lateral derecha para la media ($\sigma$ conocida), $z^*$ es:
- [ ] 1,645
- [x] 2,33
- [ ] 2,576
::: solucion Explicación
Toda la $\alpha$ en una cola: $z_{0{,}99} = 2{,}33$. 2,576 es para una bilateral al 1 %.
:::
:::

::: pregunta Si aumenta la distancia entre el verdadero $\mu$ y $\mu_0$, la potencia:
- [x] aumenta
- [ ] disminuye
- [ ] no cambia
::: solucion Explicación
La distribución bajo $H_1$ se aleja del punto crítico y cae más área en la zona de rechazo.
:::
:::

::: pregunta Una dócima para $P$ usa en el error estándar:
- [ ] $\hat P$, como en el intervalo
- [x] $P_0$ (el valor de $H_0$)
- [ ] $0{,}5$
::: solucion Explicación
Se trabaja suponiendo $H_0$ cierta. $\hat P$ se usa en el intervalo, porque ahí $P$ es desconocido.
:::
:::
