# 3. Ecuaciones homogéneas

## Funciones homogéneas

::: definicion Función homogénea de grado $n$
Una función $f(x;y)$ es **homogénea de grado $n$** si, al reemplazar $x$ por $\lambda x$ e $y$ por $\lambda y$, se cumple que

$$
f(\lambda x;\lambda y) = \lambda^n\,f(x;y)
$$
:::

**Ejemplo.** Con $f(x;y) = xy + 2x^2$:

::: pasos
f(\lambda x;\lambda y) = \lambda x\,\lambda y + 2(\lambda x)^2
  = \lambda^2 xy + \lambda^2\,2x^2
  = \lambda^2\left(xy + 2x^2\right)
  = \lambda^2 f(x;y)
:::

$f(x;y)$ es una función homogénea de **grado 2**.

::: observacion
El **cociente** entre dos funciones homogéneas del mismo grado es una función homogénea de **grado cero**.
:::

## Ecuación diferencial homogénea (EDH)

::: definicion Ecuación diferencial homogénea
Una ecuación $y' = f(x;y)$ es una **ecuación diferencial homogénea** cuando la función asociada $f(x;y)$ es homogénea de **grado cero**.
:::

Para resolverla conviene un **cambio de variable** que la transforme en una ED de variables separables.

::: demostracion Método de resolución
**1.** Si la ED es homogénea, su función asociada es homogénea de grado cero:

$$
f(\lambda x;\lambda y) = \lambda^0\,f(x;y)
$$

Siendo $\lambda^0 = 1$:

$$
y' = f(x;y) = f(\lambda x;\lambda y) \qquad\forall\,\lambda
$$

**2.** Como se cumple para todo $\lambda$, se le puede dar el valor $\lambda = \frac{1}{x}$:

$$
y' = f\!\left(1;\ \frac{y}{x}\right) \label{edh}
$$

**3.** Se hace el cambio de variable

$$
u = \frac{y}{x} \quad\then\quad y = u\,x \quad\then\quad y' = u'x + u
$$

donde $u$ es una función de $x$. Reemplazando en \eqref{edh}:

$$
u'x + u = f(1;u)
$$

**4.** Es una ED de variables separables:

$$
\frac{\dd u}{\dd x}\,x = f(1;u) - u \quad\then\quad \frac{\dd u}{f(1;u) - u} = \frac{\dd x}{x}
$$

y separadas las variables, se integra.
:::

::: resultado
$$
\int \frac{\dd u}{f(1;u) - u} = \int \frac{\dd x}{x} + C
$$
:::

Resueltas las integrales, se vuelve a las variables originales con la ecuación de sustitución $u = \frac{y}{x}$, y queda la **solución general**.

## Ejemplo

::: ejemplo Hallar la SG de $2x^3\,\dy - 2x^2y\,\dx + y^3\,\dx = 0$ y su SP para la CI $(x;y) = (1;2)$
**a) ¿Es homogénea?**

::: pasos
-\left(2x^2y - y^3\right)\dx + 2x^3\,\dy = 0
\then 2x^3\,\dy = \left(2x^2y - y^3\right)\dx
\then \frac{\dd y}{\dd x} = \frac{2x^2y - y^3}{2x^3}              // cociente de funciones homogéneas de grado 3: EDH
:::

**b) Cambio de variable.** $u = \frac{y}{x} \then y = u\,x \then \frac{\dd y}{\dd x} = \frac{\dd u}{\dd x}\,x + u$. Reemplazando en la ED:

::: pasos
\frac{\dd u}{\dd x}\,x + u = \frac{2u - u^3}{2}                  // dividiendo numerador y denominador por $x^3$
\then \frac{\dd u}{\dd x}\,x = \frac{2u - u^3}{2} - u = -\frac{u^3}{2}
\then -\int \frac{2\,\dd u}{u^3} = \int \frac{\dd x}{x} + C         // variables separables
\then u^{-2} = \ln x + C
:::

**c) Volviendo a $y$**, con $u = \frac{y}{x}$:

::: resultado Solución general
$$
\frac{x^2}{y^2} - \ln x = C
$$
:::

**d) La CI.** Reemplazando $(1;2)$:

$$
\frac{1^2}{2^2} - \ln 1 = C \quad\then\quad C = \frac{1}{4}
$$

::: resultado Solución particular para la CI $(1;2)$
$$
\frac{x^2}{y^2} - \ln x = \frac{1}{4}
$$
:::

```grafico
titulo: La SP, que pasa por $(1;2)$: $y = \dfrac{x}{\sqrt{\ln x + \frac{1}{4}}}$
y = x / raiz(ln(x) + 1/4) ; x: 0.79..5 ; rojo ; gruesa ; ""
(1, 2) ; "$(1;2)$"
x: 0..5
y: 0..6
```
:::
