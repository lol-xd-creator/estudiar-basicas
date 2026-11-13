# 9.5 Dócima para la proporción

::: ppt Dócima para $P$ (Garibaldi y Rimoldi)
El procedimiento es el mismo que para la media. Como la muestra es grande, se usa la normal, y **el valor de $P$ que se usa es el que plantea $H_0$**:
$$
z = \frac{\hat p - P_0}{\sqrt{\dfrac{P_0(1-P_0)}{n}}} \qquad \hat p = \frac{x}{n}
$$
Puntos críticos (despejando $\hat p$):

| Prueba | $H_1$ | Punto crítico |
|---|---|---|
| Lateral derecha | $P > P_0$ | $\hat p^* = P_0 + z_\alpha\sqrt{\frac{P_0(1-P_0)}{n}}$ |
| Lateral izquierda | $P < P_0$ | $\hat p^* = P_0 - z_\alpha\sqrt{\frac{P_0(1-P_0)}{n}}$ |
| Bilateral | $P \ne P_0$ | $\hat p^*_{1,2} = P_0 \mp z_{\alpha/2}\sqrt{\frac{P_0(1-P_0)}{n}}$ |
:::

::: ojo $P_0$ y no $\hat p$
- En el **intervalo** de confianza no se conoce $P$, así que el error estándar se estima con $\hat p$.
- En la **dócima** se supone cierta $H_0$, así que se usa **$P_0$**. Para calcular $\beta$ o la potencia, se usa **$P_1$**.
:::

::: ejemplo Correas que se rompen (Garibaldi): bilateral
El ingeniero afirma que el 20 % de las correas se rompe antes de los 40.000 km. En 200 vehículos se rompieron 30. $\alpha = 0{,}05$.

::: solucion
$H_0: P = 0{,}20$, $H_1: P \ne 0{,}20$. $\ \hat p = \frac{30}{200} = 0{,}15$.
::: pasos
\sigma_0 = \sqrt{\frac{0{,}20 \cdot 0{,}80}{200}} = 0{,}0283
\hat p^*_1 = 0{,}20 - 1{,}96 \cdot 0{,}0283 = 0{,}145
\hat p^*_2 = 0{,}20 + 1{,}96 \cdot 0{,}0283 = 0{,}255
:::
Regla: rechazar si $\hat p < 0{,}145$ o $\hat p > 0{,}255$. Como $\hat p = 0{,}15$, **no se rechaza $H_0$**: se acepta lo que dice el ingeniero.
:::
:::

::: ejemplo Nueva redacción de un test (Rimoldi)
El 75 % resuelve bien un test. Con una redacción nueva, de 120 alumnos lo resolvieron bien 107. ¿Se puede **afirmar** que mejoró, con $\alpha = 0{,}025$?

::: solucion
Lo que se quiere afirmar va en $H_1$: $H_0: P = 0{,}75$, $H_1: P > 0{,}75$.

$\hat p = 0{,}892$; $\ \sigma_0 = \sqrt{\frac{0{,}75 \cdot 0{,}25}{120}} = 0{,}0395$; $\ z = \frac{0{,}892 - 0{,}75}{0{,}0395} = 3{,}58 > 1{,}96 \then$ **se rechaza $H_0$**: la nueva redacción mejoró las respuestas.
:::
:::

::: aclaracion
En el resumen de Rimoldi este ejercicio aparece bajo el título "unilateral izquierdo", pero el planteo ($H_1$: la proporción **aumentó**) es una prueba **lateral derecha**. La resolución numérica no está en el material: la hice con las fórmulas de la dócima para $P$.
:::

::: pregunta En una dócima para $P$ con $H_0: P = 0{,}4$, $n = 150$ y $\hat p = 0{,}46$, ¿qué va en el denominador de $z$?
- [ ] $\sqrt{\frac{0{,}46 \cdot 0{,}54}{150}}$
- [x] $\sqrt{\frac{0{,}4 \cdot 0{,}6}{150}}$
- [ ] $\frac{0{,}4 \cdot 0{,}6}{150}$
::: solucion Explicación
Se supone cierta $H_0$, así que se usa $P_0 = 0{,}4$, con la raíz.
:::
:::
