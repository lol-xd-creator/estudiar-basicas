# 4. Ecuaciones lineales y de Bernoulli

## Ecuación diferencial lineal (EDL)

::: definicion Ecuación diferencial lineal
Es una ecuación del tipo

$$
y' + p(x)\,y = r(x)
$$

con $p(x)$ y $r(x)$ funciones escalares de $x$, continuas o constantes. Se llama **lineal** porque lo es respecto de $y'$ y de $y$.
:::

### EDL incompleta: $r(x) = 0$

Es una ED de variables separables:

::: pasos
y' + p(x)\,y = 0
\then \frac{\dd y}{\dd x} = -p(x)\,y
\then \frac{\dd y}{y} = -p(x)\,\dx
\then \int \frac{\dd y}{y} = \int -p(x)\,\dx + C
\then \ln y = \int -p(x)\,\dx + C
:::

::: resultado EDL incompleta
$$
y = k\,e^{\int -p(x)\,\dx} \qquad\text{(SG)}
$$
:::

### EDL completa: $r(x) \ne 0$

Se resuelve con un cambio de variables que permita separar variables.

::: demostracion Método de resolución
**1. Cambio de variable.** Se propone $y = u\,v$, donde $u$ y $v$ son funciones indeterminadas de $x$. La derivada es

$$
y' = u'\,v + u\,v'
$$

Sustituyendo en la ED y sacando factor común $u$:

::: pasos
u'\,v + u\,v' + p(x)\,u\,v = r(x)
\then u'\,v + u\,\big(\hl{v' + p(x)\,v}\big) = r(x) \label{edl}
:::

**2. Elegir $v$.** Dentro del paréntesis queda una EDL en la variable $v$. Como $v$ es una función indeterminada, se puede **igualar el paréntesis a cero** y obtener una $v$ fácil de calcular por separación de variables:

::: pasos
v' + p(x)\,v = 0
\then \frac{\dd v}{\dd x} = -p(x)\,v
\then \frac{\dd v}{v} = -p(x)\,\dx
\then \ln v = \int -p(x)\,\dx
:::

$$
v = e^{-\int p(x)\,\dx}
$$

Sin constante de integración: es la expresión más simple de $v$.

**3. Calcular $u$.** La ecuación \eqref{edl} queda $u'\,v = r(x)$; reemplazando $v$:

::: pasos
\frac{\dd u}{\dd x}\,e^{-\int p(x)\,\dx} = r(x)
\then \dd u = r(x)\,e^{\int p(x)\,\dx}\,\dx
\then u = \int r(x)\,e^{\int p(x)\,\dx}\,\dx + C
:::

**4.** Por último, $y = u\,v$.
:::

::: resultado EDL completa
$$
y = \left[\int r(x)\,e^{\int p(x)\,\dx}\,\dx + C\right] e^{-\int p(x)\,\dx} \qquad\text{(SG)}
$$
:::

::: ejemplo Encontrar la SG de la ED $y' - x\,y' + 3y = (1 - x)^3$
**a) Llevarla a la forma de EDL**

::: pasos
(1 - x)\,y' + 3y = (1 - x)^3
\then y' + \frac{3}{1 - x}\,y = (1 - x)^2                 // dividiendo por $1 - x$: EDL
:::

**b) Cambio de variable.** $y = u\,v \then y' = u'\,v + u\,v'$. Reemplazando en la ED y sacando factor común $u$:

$$
u'\,v + u\left(\hl{v' + \frac{3}{1 - x}\,v}\right) = (1 - x)^2 \label{edl-ej}
$$

**c) $v$**, con el paréntesis igual a cero:

::: pasos
\frac{\dd v}{\dd x} = -\frac{3}{1 - x}\,v
\then \int \frac{\dd v}{v} = -\int \frac{3}{1 - x}\,\dx
\then \ln v = 3\ln(1 - x) = \ln(1 - x)^3
\then v = (1 - x)^3
:::

**d) $u$**, de \eqref{edl-ej}:

::: pasos
u'\,v = (1 - x)^2
\then \frac{\dd u}{\dd x}\,(1 - x)^3 = (1 - x)^2
\then \dd u = \frac{\dd x}{1 - x}
\then u = -\ln(1 - x) + C
:::

**e)** $y = u\,v$:

::: resultado
$$
y = \big(C - \ln(1 - x)\big)(1 - x)^3
$$
:::
:::

## Ecuación de Bernoulli (reducible a lineal)

::: definicion Ecuación de Bernoulli
Tiene la expresión general

$$
y' + p(x)\,y = y^n\,r(x) \qquad\text{con } n \ne 0 \wedge n \ne 1
$$
:::

No es una EDL (con $n = 0$ o $n = 1$ sí lo sería), pero se resuelve como una EDL así:

**1.** Se divide la ED por $y^n$:

$$
\frac{y'}{y^n} + p(x)\,\frac{y}{y^n} = r(x) \quad\then\quad \frac{y'}{y^n} + p(x)\,y^{1-n} = r(x) \label{bern}
$$

**2.** Se hace el cambio de variable

$$
z = y^{1-n} \quad\then\quad z' = (1 - n)\,y^{-n}\,y' \quad\then\quad y' = \frac{z'\,y^n}{1 - n}
$$

**3.** Reemplazando en \eqref{bern}, la ecuación se convierte en una **EDL en la variable $z$**:

$$
\frac{z'}{1 - n} + p(x)\,z = r(x) \quad\then\quad z' + (1 - n)\,p(x)\,z = (1 - n)\,r(x)
$$

Se resuelve como EDL y, como último paso, se vuelve a las variables originales con la sustitución $z = y^{1-n}$.

::: ejemplo Hallar la SG de la ED $x^2y' + 2xy = y^3$
**a) Dividiendo por $x^2y^3$**

$$
\frac{y'}{y^3} + \frac{2}{x}\,y^{-2} = \frac{1}{x^2} \label{bern-ej}
$$

**b) Cambio de variable** ($n = 3$): $z = y^{-2}$.

$$
z' = -2y^{-3}\,y' \quad\then\quad y' = -\frac{z'}{2}\,y^3
$$

Reemplazando en \eqref{bern-ej}:

::: pasos
-\frac{z'}{2}\,y^3\cdot\frac{1}{y^3} + \frac{2}{x}\,z = \frac{1}{x^2}
\then z' - \frac{4}{x}\,z = -\frac{2}{x^2}                          // multiplicando por $-2$: EDL en $z$
:::

**c) Como EDL:** $z = u\,v \then z' = u'\,v + u\,v'$.

$$
u'\,v + u\left(\hl{v' - \frac{4}{x}\,v}\right) = -\frac{2}{x^2} \label{bern-edl}
$$

$v$, con el paréntesis igual a cero:

::: pasos
\frac{\dd v}{\dd x} = \frac{4}{x}\,v
\then \frac{\dd v}{v} = \frac{4}{x}\,\dx
\then \ln v = 4\ln x = \ln x^4
\then v = x^4
:::

$u$, de \eqref{bern-edl}:

::: pasos
\frac{\dd u}{\dd x}\,x^4 = -\frac{2}{x^2}
\then \dd u = -\frac{2}{x^6}\,\dx
\then u = -\int \frac{2}{x^6}\,\dx + C = \frac{2}{5x^5} + C
:::

**d) Volviendo a $y$**

::: pasos
z = u\,v = \left(\frac{2}{5x^5} + C\right)x^4
\then y^{-2} = \frac{2}{5x} + C\,x^4                    // $z = y^{-2}$
:::

::: resultado
$$
y = \left(\frac{2}{5x} + C\,x^4\right)^{-1/2}
$$
:::
:::
