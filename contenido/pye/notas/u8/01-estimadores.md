# 8.1 Estimadores y sus propiedades

::: ppt Parámetro, estadístico y error de estimación (Garibaldi)
- Si los datos son de **toda la población**, el valor que los resume es un **parámetro**: describe la población, pero en la práctica casi nunca se lo conoce.
- Si los datos son de una **muestra**, el número que los resume es un **estadístico**, que se usa como **estimación** del parámetro.
- La diferencia entre el valor del parámetro y el del estadístico es el **error de estimación**.

Se usa $\hat\theta$ para el estimador y $\theta$ para el parámetro.
:::

El apunte distingue además el **estimador** (la fórmula, $\bar x$, que es una variable aleatoria) de la **estimación** (el valor que toma en una muestra, $\bar x = 15$).

::: ppt Propiedades de un buen estimador (Garibaldi)
| Propiedad | Definición |
|---|---|
| **Insesgabilidad** | su esperanza es igual al parámetro: $E(\hat\theta) = \theta$. Cumplen $E(\bar x) = \mu$ y $E(\hat p) = P$ |
| **Consistencia** | con muestras grandes, su valor se acerca al verdadero valor del parámetro: $\hat\theta \to \theta$ cuando $n \to N$ |
| **Eficiencia** | entre todos los estimadores insesgados de un parámetro, el de **menor variación** |
| **Suficiencia** | usa **toda la información** de la muestra |

| Parámetro | $\mu$ | $\sigma^2$ | $\sigma$ | $P$ |
|---|---|---|---|---|
| Mejor estimador | $\bar x$ | $s^2$ (corregida) | $s$ | $\hat p$ |
:::

::: ojo Combinaciones que se preguntan
En los parciales de 2021 aparecían descripciones que juntan dos propiedades:
- "su esperanza coincide con el parámetro **e incluye toda la información** de la muestra" → **insesgado y suficiente**;
- "incluye toda la información relevante **y su varianza es mínima**" → **eficiente y suficiente**;
- "su esperanza coincide con el parámetro **y su varianza es mínima**" → **insesgado y eficiente**.
:::

::: ojo
Que $E(\hat\theta) = \theta$ **no** garantiza que una estimación concreta acierte: solo dice que el promedio sobre **todas** las muestras posibles es el parámetro. Por eso importa también que su variabilidad sea chica (eficiencia).
:::

::: libro Insesgabilidad en detalle (apunte)
- $E(\bar x) = \frac1n[E(x_1) + \dots + E(x_n)] = \frac1n\,n\mu = \mu$.
- $\bar x + c$ tiene esperanza $\mu + c$: **sesgo** positivo. Si $E(\hat\theta) > \theta$ el sesgo es positivo; si es menor, negativo.
- La **mediana muestral** es insesgada para $\mu$ solo si la población es simétrica; con asimetría a derecha tiene sesgo negativo y con asimetría a izquierda, positivo.
- $s^2 = \frac{\sum(x_i - \bar x)^2}{n}$ es **sesgado**: $E(s^2) = \frac{n-1}{n}\sigma^2$. Por eso se usa $\hat s^2$ (con $n - 1$), que cumple $E(\hat s^2) = \sigma^2$.
:::

::: libro Eficiencia relativa y consistencia (apunte)
- **Eficiencia relativa** de dos estimadores insesgados: $Ef = \frac{\sigma^2_{\hat\theta_1}}{\sigma^2_{\hat\theta_2}}$; si es menor que 1, $\hat\theta_1$ es más eficiente. En una población normal, media contra mediana da $Ef = \frac{2}{\pi} \approx 0{,}64$: **$\bar x$ es más eficiente**, y de hecho es el estimador de varianza mínima para $\mu$.
- **Consistencia** formal: $\lim_{n\to\infty} P(\lvert\hat\theta - \theta\rvert \le d) = 1$. $\bar x$ y $\hat p$ son consistentes por la ley de los grandes números; $s^2$ es sesgado pero consistente.
:::

::: pregunta Un estimador es un valor que puede calcularse a partir de los datos **poblacionales** y que proporciona información sobre el valor del parámetro.
- [ ] Verdadero
- [x] Falso
::: solucion Explicación
Se calcula con los datos de la **muestra**. (Pregunta de todos los parciales de 2021, con distintas variantes.)
:::
:::

::: pregunta Cuando el estimador incluye toda la información relevante de la muestra y su varianza es mínima, es:
- [ ] Suficiente
- [ ] Insesgado y consistente
- [x] Eficiente y suficiente
- [ ] Consistente
::: solucion Explicación
Toda la información → suficiente. Varianza mínima → eficiente.
:::
:::

::: pregunta Dos estimadores insesgados de $\mu$ con varianzas 4 y 6. ¿Cuál es más eficiente?
- [x] El de varianza 4
- [ ] El de varianza 6
- [ ] Son igual de eficientes por ser insesgados
::: solucion Explicación
El eficiente es el insesgado de menor variación.
:::
:::
