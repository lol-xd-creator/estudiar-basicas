# 2. Integrales iteradas

Las integrales dobles se calculan mediante **integrales sucesivas o iteradas**: integrando de a una variable por vez se obtiene el valor del volumen y, por lo tanto, el de la integral doble.

::: teorema Integrales sucesivas o iteradas {#iteradas}
H) $f(x;y)$ integrable en $R = [a;b]\times[c;d]$.
T) $\displaystyle \iint_R f(x;y)\,\dx\,\dy = \int_a^b \dx \int_c^d f(x;y)\,\dy = \int_c^d \dy \int_a^b f(x;y)\,\dx$
:::

::: idea
Cortar el sólido con planos $x = \cte$: cada corte tiene un área $F(x)$; sumando las rebanadas de espesor $\Delta x$ se obtiene el volumen.
:::

::: demostracion
Se razona con $f \ge 0$, para poder hablar de volumen.

**1.** Se integra primero respecto de $y$, considerando a $x$ constante. El resultado es una función de $x$:

$$
\int_c^d f(x;y)\,\dy = F(x) \label{F}
$$

$F(x)$ es el área de la figura debajo de la curva $C$ en el plano $x = \cte$:

```grafico3d
titulo: El corte $x = \text{cte}$: la curva $C$ y el área $F(x)$ debajo de ella
z = 2 + x^2/3 + y^2/4 ; corte x = 1.2
texto (1.2, 3.2, 5.3) "$C$"
texto (1.2, 1.5, 1.2) "$F(x)$"
x: 0..2.5
y: 0..3
```

**2.** Se parte $[a;b]$: $x_0 = a;\ x_1;\ \dots;\ x_n = b$, con $\Delta x_i = x_i - x_{i-1}$. Si se toma $x = \varepsilon_i$ en $[x_{i-1};x_i]$, de \eqref{F} sale $F(\varepsilon_i)$, y la rebanada tiene volumen $V_i = F(\varepsilon_i)\,\Delta x_i$.

**3.** Se suman las rebanadas y se toma límite:

::: pasos
V \simeq \sum_{i=1}^{n} F(\varepsilon_i)\,\Delta x_i                                              // suma de Riemann: aproxima el volumen
V = \lim_{\substack{n\to\infty \\ (\max\Delta x \to 0)}} \sum_{i=1}^{n} F(\varepsilon_i)\,\Delta x_i   // si el límite existe
  = \int_a^b F(x)\,\dx                                                                            // definición de integral simple
  = \int_a^b \left[\int_c^d f(x;y)\,\dy\right]\dx                                                 // reemplazando $F(x)$ por \eqref{F}
:::

De igual manera, integrando primero respecto de $x$ y luego respecto de $y$, se obtiene el mismo valor:

$$
\int_c^d \left[\int_a^b f(x;y)\,\dx\right]\dy = V
$$
:::

## Notación

Los corchetes se suelen omitir:

$$
\int_a^b \left[\int_c^d f(x;y)\,\dy\right]\dx = \int_a^b \dx \int_c^d f(x;y)\,\dy
$$

La **primera integral que se resuelve es la de la derecha**: primero respecto de $y$, y al resultado luego se lo integra respecto de $x$.

::: observacion
La deducción se hizo para $f(x;y) \ge 0$, pero el cálculo vale igual cuando $f$ toma valores negativos: el resultado es una suma algebraica de valores positivos y negativos que ya **no representa un volumen**.
:::

## Ejemplo

::: ejemplo Calcular $\displaystyle\iint_R x^2y^3\,\dx\,\dy$ con $R$: $1 \le x \le 2 \wedge 0 \le y \le 2$
**a) Dominio de integración**

```grafico
1 <= x <= 2, 0 <= y <= 2 ; "$R$"
x: -0.5..3
y: -0.5..2.6
```

**b) Orden de integración:** primero $x$.

**c) Cálculo**

::: pasos
I_R = \int_0^2 \dy \int_1^2 x^2 y^3\,\dx
    = \int_0^2 y^3\,\dy \int_1^2 x^2\,\dx                // $y^3$ es constante al integrar en $x$
    = \int_0^2 y^3\,\dy \cdot \eval{\frac{x^3}{3}}{1}{2}
    = \frac{7}{3}\int_0^2 y^3\,\dy                       // $\frac{8}{3} - \frac{1}{3} = \frac{7}{3}$
    = \frac{7}{3} \cdot \eval{\frac{y^4}{4}}{0}{2}
    = \frac{7}{3} \cdot 4 = \frac{28}{3}
:::

::: resultado
$$
\iint_R x^2y^3\,\dx\,\dy = \frac{28}{3}
$$
:::

Con límites constantes, cualquier orden de integración está bien.
:::
