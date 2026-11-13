# 9.3 Tipos de dócima y procedimiento

::: ppt Tipos de prueba (Garibaldi)
**La hipótesis alternativa determina** si la prueba es de una o de dos colas:

| Prueba | Cuándo | Zona de rechazo |
|---|---|---|
| **Bilateral** (dos colas) | $H_1$ no da un valor específico: el parámetro es **distinto** | a la izquierda y a la derecha, $\frac\alpha2$ en cada una |
| **Lateral izquierda** | $H_1$: valores **menores** que el de $H_0$ | a la izquierda, $\alpha$ |
| **Lateral derecha** | $H_1$: valores **mayores** que el de $H_0$ | a la derecha, $\alpha$ |

*Ejemplos:* "el diámetro promedio es de 20 mm" → $H_0: \mu = 20$, $H_1: \mu \ne 20$ (bilateral). "La duración promedio de las pantallas **no es mayor** a 6 años" → $H_0: \mu \le 6$, $H_1: \mu > 6$ (lateral derecha). "El promedio de medicamento solicitado es **mayor o igual** a 10 cajas" → $H_0: \mu \ge 10$, $H_1: \mu < 10$ (lateral izquierda).
:::

```grafico
titulo: Lateral derecha: toda la $\alpha$ en la cola derecha
y = e^(-x^2/2)/sqrt(2 pi) ; gruesa
1.645 <= x <= 4, 0 <= y <= e^(-x^2/2)/sqrt(2 pi) ; rayado ; rojo
texto (0, 0.15) "$1-\alpha$"
texto (2.6, 0.05) "$\alpha$"
texto (0, -0.03) "$\mu_0$"
texto (1.645, -0.03) "$\bar x^*$"
x: -4..4
grilla: no
aspecto: libre
alto: 200
leyenda: no
```

::: ppt Etapas de una prueba (Garibaldi)
1. Establecer la población y el parámetro de interés.
2. Formular la hipótesis nula.
3. Expresar la hipótesis alternativa.
4. Especificar el nivel de significación $\alpha$.
5. Escoger el tamaño de la muestra.
6. Determinar el estadístico de la prueba.
7. Establecer los valores críticos que dividen las regiones de rechazo y no rechazo.
8. Recolectar los datos y calcular el estadístico.
9. Determinar si el estadístico cayó en la región de rechazo o de no rechazo.
10. Tomar la decisión estadística.
11. Expresar la decisión en términos del problema.

Rimoldi lo resume en tres pasos: **planteo** ($H_0$ y $H_1$); **regla de decisión** (estadístico y su distribución, región crítica según $H_1$, $\alpha$ y punto crítico); **decisión** con el valor observado y conclusión.
:::

::: ppt Dos maneras de decidir (Garibaldi y Rimoldi)
- **En la escala del estimador:** calcular el punto crítico $\bar x^*$ (despejándolo del estadístico) y ver si $\bar x$ de la muestra cae del lado de rechazo.
- **En la escala de $z$:** buscar $z^*$ en la tabla, calcular $z = \frac{\bar x - \mu_0}{\sigma/\sqrt n}$ y ver en qué región cae.

Dan siempre la misma decisión.
:::

::: ppt Valor p (Garibaldi y Rimoldi)
El **valor p** es el área bajo la normal estándar para valores **tan o más extremos** que el estadístico observado, **en la dirección de $H_1$**: la probabilidad de obtener, si $H_0$ fuera cierta, un resultado igual o más extremo que el de la muestra. Es el **nivel de significación más bajo** con el que el resultado es significativo (Rimoldi: el "nivel de significación empírico").

| Prueba | Valor p |
|---|---|
| Lateral derecha | $P(z > z_{obs})$ |
| Lateral izquierda | $P(z < z_{obs})$ |
| Bilateral | $2\,P(z > \lvert z_{obs}\rvert)$ |

$$
\text{valor } p \le \alpha \then \text{se rechaza } H_0 \qquad\qquad \text{valor } p > \alpha \then \text{no se rechaza } H_0
$$
Cuanto más chico es el valor p, más evidencia a favor de $H_1$. Muchos programas (InfoStat) deciden con el valor p.
:::

::: ejemplo Edad en un pueblo (Garibaldi)
Se quiere probar que la edad media supera los 70 años. Con 100 habitantes, $\bar x = 71{,}8$ y $s = 8{,}9$. $\alpha = 0{,}05$.

::: solucion
$H_0: \mu \le 70$, $H_1: \mu > 70$.
$$
z = \frac{71{,}8 - 70}{8{,}9/\sqrt{100}} = 2{,}02 \qquad p = P(z > 2{,}02) = 0{,}0215 < 0{,}05
$$
**Se rechaza $H_0$**: la edad media supera los 70 años.
:::
:::

::: ppt Relación con el intervalo de confianza (Garibaldi y Rimoldi)
En una prueba **bilateral**, se puede decidir con el intervalo de confianza del $(1-\alpha)$: **se rechaza $H_0$ si el valor de $H_0$ no está dentro del intervalo**; si está dentro, no se rechaza. El intervalo es **más informativo** que el valor p, porque además estima el parámetro.
:::

::: libro Dócimas compuestas, simples y el mayor riesgo (apunte)
- Las **compuestas** contrastan un valor contra un conjunto ($\ne$, $>$, $<$); las **simples o exactas**, un valor contra otro ($H_0: \theta = \theta_0$ vs. $H_1: \theta = \theta_1$).
- En las laterales, $H_0$ vale para muchos valores ($\theta \le \theta_0$), pero la zona de rechazo se calcula con el valor límite $\theta_0$. Para los otros valores de $H_0$ la probabilidad de rechazarla siendo cierta es **menor** que $\alpha$: $\alpha$ es el mayor riesgo.
:::

::: pregunta En una dócima lateral derecha, si el valor p que calcula InfoStat es mayor que el nivel de significación, el estadístico observado pertenece a la zona de no rechazo.
- [x] Verdadero
- [ ] Falso
::: solucion Explicación
$p > \alpha$: no se rechaza $H_0$. (Pregunta del parcial de Sistemas de 2020.)
:::
:::

::: pregunta El intervalo del 95 % para $\mu$ es $[48;\ 52]$. Con $\alpha = 0{,}05$, ¿se rechaza $H_0: \mu = 53$ (bilateral)?
- [x] Sí, porque 53 queda fuera del intervalo
- [ ] No, porque 53 está cerca
- [ ] No se puede saber sin la tabla
::: solucion Explicación
En una prueba bilateral se rechaza $H_0$ si $\mu_0$ no está en el intervalo del $1 - \alpha$.
:::
:::
