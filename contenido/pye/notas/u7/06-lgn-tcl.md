# 7.6 Ley de los grandes números y teorema central del límite

::: ppt Teorema central del límite (Garibaldi)
1. Cuando la población es bastante grande y está **normalmente distribuida**, la distribución de la media muestral es **normal**.
2. Cuando la población **no es normal**, la distribución de la media muestral **se aproxima a una normal** si el tamaño de la muestra es suficientemente grande: **$n \ge 30$**.

Esa normal tiene media $\mu$ y desviación $\frac{\sigma}{\sqrt n}$, así que
$$
z = \frac{\bar x - \mu}{\sigma/\sqrt n} \sim N(0;1)
$$

**Importancia:** permite usar estadísticas de muestra para hacer inferencias sobre los parámetros **sin conocer la forma** de la distribución de la población.
:::

::: ojo
La **media muestral** no sigue una normal **estándar**: sigue una normal con media $\mu$ y desviación $\frac{\sigma}{\sqrt n}$. La que es $N(0;1)$ es la estandarizada $z$. Era una pregunta de verdadero o falso de los parciales de 2021 (la respuesta era **falso**).
:::

El TCL es también la razón por la que la binomial, la Poisson y la hipergeométrica se aproximan a la normal con muestras grandes ([[6.6 Aproximación de modelos discretos a la normal]]).

## Las estandarizaciones que se usan en las unidades 8 y 9

::: ppt Resumen
| Estadística | Estandarización | Cuándo |
|---|---|---|
| $\bar x$, $\sigma$ conocida | $z = \dfrac{\bar x - \mu}{\sigma/\sqrt n} \sim N(0;1)$ | población normal, o $n \ge 30$ |
| $\bar x$, $\sigma$ desconocida | $t = \dfrac{\bar x - \mu}{\hat s/\sqrt n} \sim t_{n-1}$ | población normal y muestra chica |
| $\bar x$, $\sigma$ desconocida, $n \ge 30$ | $z = \dfrac{\bar x - \mu}{\hat s/\sqrt n}$ | por el TCL |
| $\hat P$ | $z = \dfrac{\hat P - P}{\sqrt{P(1-P)/n}} \sim N(0;1)$ | $n$ grande |

Sin reposición y con $n > 5\,\%$ de $N$, se multiplica el error estándar por $\sqrt{\frac{N-n}{N-1}}$.
:::

::: ejemplo Cómo se usa
Una población tiene $\mu = 50$ y $\sigma = 12$ (forma desconocida). Con una muestra de $n = 36$, ¿probabilidad de que $\bar x$ supere 53?

::: solucion
Como $n \ge 30$, por el TCL $\bar x$ es aproximadamente normal con $\sigma_{\bar x} = \frac{12}{6} = 2$.

$P(\bar x > 53) = P\!\left(z > 1{,}5\right) = 1 - 0{,}9332 = 0{,}0668$
:::
:::

::: aclaracion
Este último ejemplo no está en el apunte ni en las PPT: lo agregué para mostrar cómo se combina el TCL con la tabla normal (es como el ejercicio 7.12 de la guía).
:::

::: libro Ley de los grandes números (apunte)
La probabilidad de que la diferencia entre el estadístico y el parámetro supere un número $d$ cualquiera tiende a 0 cuando $n \to \infty$:
$$
\lim_{n\to\infty} P\big(\lvert\hat\theta - \theta\rvert \le d\big) = 1
$$
Con muestras grandes es muy probable que el estadístico esté cerca del parámetro. Es lo que justifica que $\bar x$ y $\hat P$ sean **consistentes** (unidad 8).
:::

::: pregunta Una población muy asimétrica. ¿Qué se puede decir de $\bar x$ con $n = 50$?
- [ ] Es asimétrica como la población
- [x] Es aproximadamente normal, con media $\mu$ y desviación $\sigma/\sqrt{50}$
- [ ] Es normal estándar
::: solucion Explicación
Es el TCL: con $n \ge 30$, $\bar x$ es aproximadamente normal cualquiera sea la población. No es estándar: la estándar es la variable $z$.
:::
:::
