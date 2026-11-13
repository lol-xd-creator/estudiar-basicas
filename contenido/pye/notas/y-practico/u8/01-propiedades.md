# P8.1 Propiedades de los estimadores

*Guía, unidad 8: ejercicio 1. Es el modelo de todas las preguntas de "insesgado y eficiente" de los parciales.*

::: ejercicio 8.1 · Tres estimadores de $\mu$
Sean $x_1, x_2, x_3$ observaciones de una normal con media $\mu$ y varianza $\sigma^2$. Se proponen:
$$
\hat\theta_1 = \tfrac13 x_1 + \tfrac13 x_2 + \tfrac13 x_3 \qquad
\hat\theta_2 = \tfrac19 x_1 + \tfrac39 x_2 + \tfrac59 x_3 \qquad
\hat\theta_3 = \tfrac{4}{10} x_1 + \tfrac{2}{10} x_2 + \tfrac{4}{10} x_3
$$
a) ¿Cuáles son insesgados? b) ¿Cuál es relativamente más eficiente? c) ¿Cuál es la media muestral? ¿Es el de menor varianza?

::: solucion
**Propiedades que se usan:** $E(a\,x) = a\,E(x)$ y, con observaciones independientes, $V(a\,x) = a^2 V(x)$.

**a)** Para $\hat\theta_1$:
::: pasos
E(\hat\theta_1) = \tfrac13 E(x_1) + \tfrac13 E(x_2) + \tfrac13 E(x_3) = \tfrac13\mu + \tfrac13\mu + \tfrac13\mu = \mu
:::
Igual para los otros, porque los coeficientes **suman 1**: $\frac{1+3+5}{9} = 1$ y $\frac{4+2+4}{10} = 1$. **Los tres son insesgados.**

**b)**
::: pasos
V(\hat\theta_1) = \left(\tfrac19 + \tfrac19 + \tfrac19\right)\sigma^2 = \tfrac{3}{9}\,\sigma^2 = 0{,}333\,\sigma^2
V(\hat\theta_2) = \tfrac{1 + 9 + 25}{81}\,\sigma^2 = 0{,}432\,\sigma^2
V(\hat\theta_3) = \tfrac{16 + 4 + 16}{100}\,\sigma^2 = 0{,}360\,\sigma^2
:::
**$\hat\theta_1$ es el relativamente más eficiente** (menor varianza entre los insesgados).

**c)** $\hat\theta_1 = \frac{x_1 + x_2 + x_3}{3}$ es la **media muestral**, y es la de menor varianza: es el estimador insesgado y eficiente de $\mu$ (ver [[8.1 Estimadores y sus propiedades]]).
:::
:::
