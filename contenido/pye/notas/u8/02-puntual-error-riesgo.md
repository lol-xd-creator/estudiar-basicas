# 8.2 Estimación puntual, error y riesgo

Un estimador puntual, aunque tenga todas las propiedades deseables, **no dice nada de la precisión**: casi seguro no coincide con el parámetro, y no se sabe por cuánto. Por eso se trabaja con un **error máximo** y un **riesgo**.

::: ppt Error, confianza y riesgo (Rimoldi)
- **Error de muestreo o de estimación**: $\lvert\bar x - \mu\rvert$.
- **Condición** que se pide: $\lvert\bar x - \mu\rvert \le e$ ($e$ = error máximo tolerado).
- **Nivel de confianza**: $1 - \alpha = P(\lvert\bar x - \mu\rvert \le e)$.
- **Riesgo**: $\alpha = P(\lvert\bar x - \mu\rvert > e)$, la probabilidad de que el error **supere** el máximo.

Para la proporción es igual: $\alpha = P(\lvert\hat p - P\rvert > e)$.
:::

```grafico
titulo: Riesgo: las dos colas donde el error supera $e$
y = e^(-x^2/2)/sqrt(2 pi) ; gruesa
-4 <= x <= -2, 0 <= y <= e^(-x^2/2)/sqrt(2 pi) ; rayado ; rojo
2 <= x <= 4, 0 <= y <= e^(-x^2/2)/sqrt(2 pi) ; rayado ; rojo
texto (0, -0.03) "$\mu$"
texto (-2, -0.03) "$\mu - e$"
texto (2, -0.03) "$\mu + e$"
texto (-3, 0.06) "$\alpha/2$"
texto (3, 0.06) "$\alpha/2$"
x: -4..4
grilla: no
aspecto: libre
alto: 220
leyenda: no
```

::: ppt Las tres fórmulas (Rimoldi y apunte)
Todo sale de $z = \dfrac{\bar x - \mu}{\sigma/\sqrt n} = \dfrac{e\sqrt n}{\sigma}$:

$$
\text{Error: } e = z\,\frac{\sigma}{\sqrt n}
\qquad
\text{Tamaño: } n = \frac{z^2\sigma^2}{e^2}
\qquad
\text{Riesgo: } \alpha = 2\left[1 - P\!\left(z < \frac{e\sqrt n}{\sigma}\right)\right]
$$

Para la proporción se cambia $\sigma$ por $\sqrt{P(1-P)}$.
:::

::: ejemplo Riesgo de un error mayor que 6 (apunte)
Población $N(500;\ 30)$, $n = 100$. ¿Riesgo de que $\bar x$ se equivoque en más de 6?

::: solucion
$\sigma_{\bar x} = \frac{30}{\sqrt{100}} = 3$, $\ z = \frac{6}{3} = 2$:
$$
\alpha = P(\lvert z \rvert > 2) = 2\,\big[1 - P(z < 2)\big] = 2\,(1 - 0{,}9772) = 0{,}0456
$$
:::
:::

::: ppt Relaciones (Garibaldi)
| Si… | el riesgo | la confianza |
|---|---|---|
| **crece el tamaño de muestra** | disminuye | crece |
| **crece el error** aceptado | disminuye | crece |
| **crece $z$** | disminuye | crece |

Y al revés si decrecen. Además, a **mayor $\sigma$**, mayor error (o más muestra necesaria).
:::

::: libro Riesgo con la distribución por enumeración (apunte)
Con la distribución de $\bar x$ de los 6 estudiantes ($\mu = 3$, con reposición), los valores a menos de $0{,}5$ de $\mu$ son $2{,}5$, $3$ y $3{,}5$: $P(\lvert\bar x - \mu\rvert \le 0{,}5) = \frac{20}{36} = 0{,}56$ (confianza) y el riesgo es $\frac{16}{36} = 0{,}44$.
:::

::: pregunta Con todo lo demás fijo, si se toma una muestra más grande:
- [x] baja el riesgo de superar un error dado
- [ ] sube el riesgo
- [ ] el riesgo no depende de $n$
::: solucion Explicación
$z = \frac{e\sqrt n}{\sigma}$ crece con $n$, y a mayor $z$, menor el área de las colas.
:::
:::

::: pregunta ¿Cuál es la expresión correcta del riesgo para un error máximo de 0,02 y un riesgo del 1 %?
- [ ] $P(\lvert\hat p - P\rvert \le 0{,}02) = 0{,}01$
- [x] $P(\lvert\hat p - P\rvert > 0{,}02) = 0{,}01$
- [ ] $P(\lvert\hat p - P\rvert > 0{,}01) = 0{,}02$
::: solucion Explicación
El riesgo es la probabilidad de que el error **supere** el máximo (pregunta de la guía, ej. 8.4).
:::
:::
