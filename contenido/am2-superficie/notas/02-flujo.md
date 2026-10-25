# 2. Flujo a través de una superficie

## Superficies orientables

::: definicion Superficie orientable
Una superficie $\sigma$ es **orientable** si es posible elegir un **versor normal** $\mathbf n$ en cada punto que varíe continuamente sobre $\sigma$; es decir, la superficie debe tener plano tangente en todos sus puntos.
:::

Esto significa también que hay **dos orientaciones** posibles. Si $\sigma$ es **cerrada**, se toma como orientación **positiva** la de los vectores $\mathbf n$ que apuntan **hacia afuera**, y negativa la de los que apuntan hacia adentro.

Si la superficie viene dada por $z = f(x;y)$, tiene una orientación natural dada por

$$
\mathbf n = \frac{\left(-\pd{f}{x};\ -\pd{f}{y};\ 1\right)}{\sqrt{\left(\pd{f}{x}\right)^2 + \left(\pd{f}{y}\right)^2 + 1}}
$$

(la tercera componente es positiva: la normal apunta hacia arriba). Si la superficie viene dada en forma paramétrica, $\mathbf r(u;v) = \big(x(u;v);\ y(u;v);\ z(u;v)\big)$, adquiere automáticamente la orientación del vector normal unitario

$$
\mathbf n = \frac{\mathbf r_u \times \mathbf r_v}{|\mathbf r_u \times \mathbf r_v|}
$$

## La integral de superficie

Queremos integrar el campo vectorial $\mathbf F$ sobre un dominio superficial $\sigma$. Sea $\mathbf F(x;y;z) = \big(F_1;F_2;F_3\big)$ un campo vectorial definido en un dominio espacial abierto $E \subseteq \R^3$ que contiene a la superficie $\sigma$: $z = f(x;y)$. Queremos calcular el **flujo** del campo $\mathbf F$ a través de $\sigma$.

Para entenderlo, suponemos que $\mathbf F$ es la **velocidad de un fluido incompresible** y queremos calcular la cantidad de fluido que atraviesa $\sigma$.

```grafico3d
titulo: El flujo a través de $\Delta\sigma_{ij}$ es $\mathbf F(M_{ij})\cdot\mathbf n_{ij}\,\Delta\sigma_{ij}$
alto: 440
z = 3 + sen(x) cos(y)/2 - (x^2 + y^2)/10 ; sobre x^2 + y^2 <= 4 ; sombra ; ""
poligono (0.4, 0.2, 3.274) (1.2, 0.2, 3.376) (1.2, 1, 3.118) (0.4, 1, 3.016) ; ambar ; ""
vector (0.8, 0.6, 3.196) (0.647, 0.987, 4.396) ; rojo ; "$\mathbf n_{ij}$"
vector (0.8, 0.6, 3.196) (1.6, -0.3, 4.6) ; verde ; "$\mathbf F(M_{ij})$"
punto (0.8, 0.6, 3.196) ; ""
texto (0.8, 0.6, 2.85) "$M_{ij}$"
texto (1.6, 0.2, 3.5) "$\Delta\sigma_{ij}$"
texto (-1.4, -1.4, 3.3) "$\sigma$"
texto (-1.2, 1.2, 0) "$D$"
```

::: teorema Flujo a través de $z = f(x;y)$ {#flujo}
H) $\sigma$: $z = f(x;y)$ sobre $D$, con derivadas parciales continuas; $\mathbf F = (F_1;F_2;F_3)$ continuo en un abierto que contiene a $\sigma$; $\mathbf n$ la normal hacia arriba.
T) $\displaystyle\iint_\sigma \mathbf F\cdot\dd\boldsymbol\sigma = \iint_D \left(-\pd{f}{x}\,F_1 - \pd{f}{y}\,F_2 + F_3\right)\dx\,\dy$
:::

::: demostracion
**1. Suma de Riemann.** Se divide $D$ en rectángulos $R_{ij}$ de área $\Delta A_{ij} = \Delta x_i\,\Delta y_j$; se elige un punto $P_{ij}$ interior a $R_{ij}$, cuyo punto en la superficie es $M_{ij} = (x_{ij};y_{ij};z_{ij})$, y ahí se traza el plano tangente:

$$
z - z_{ij} = \pd{f}{x}(P_{ij})\,(x - x_{ij}) + \pd{f}{y}(P_{ij})\,(y - y_{ij})
$$

$\Delta\sigma_{ij}$ es la parte del plano tangente en $M_{ij}$ cuya proyección sobre el plano $xy$ es $R_{ij}$. La cantidad de fluido que atraviesa $\Delta\sigma_{ij}$ es aproximadamente la componente normal de la velocidad por el área:

$$
\mathbf F(M_{ij})\cdot\mathbf n_{ij}\,\Delta\sigma_{ij}
$$

y en toda la superficie, $\displaystyle\sum_{i=1}^{n}\sum_{j=1}^{m} \mathbf F(M_{ij})\cdot\mathbf n_{ij}\,\Delta\sigma_{ij}$, donde

$$
\mathbf n_{ij} = \frac{\left(-\pd{f}{x}(P_{ij});\ -\pd{f}{y}(P_{ij});\ 1\right)}{\sqrt{\left(\pd{f}{x}(P_{ij})\right)^2 + \left(\pd{f}{y}(P_{ij})\right)^2 + 1}} = \left(\cos\alpha_{ij};\ \cos\beta_{ij};\ \cos\varphi_{ij}\right)
$$

**2. El caudal.** Tomando $\max\Delta\sigma$ como la mayor área entre los pedazos de plano tangente:

$$
\text{Caudal}(\sigma) = \lim_{\substack{n\to\infty \\ m\to\infty \\ (\max\Delta\sigma\to 0)}} \sum_{i=1}^{n}\sum_{j=1}^{m} \mathbf F(M_{ij})\cdot\mathbf n_{ij}\,\Delta\sigma_{ij} = \iint_\sigma \mathbf F\cdot\mathbf n\,\dd\sigma = \iint_\sigma \mathbf F\cdot\dd\boldsymbol\sigma \label{caudal}
$$

Es la cantidad de fluido, su **caudal**, que atraviesa la superficie $\sigma$. Esta expresión es conceptual: para calcularla hay que relacionarla con el dominio de la superficie.

**3. Del pedazo de plano a su sombra.** Como en [[1. Superficies sobre el plano xy]]:

$$
\Delta\sigma_{ij}\cos\varphi_{ij} = \Delta A_{ij} \quad\then\quad \Delta\sigma_{ij} = \frac{\Delta A_{ij}}{\cos\varphi_{ij}} = \sqrt{\left(\pd{f}{x}(P_{ij})\right)^2 + \left(\pd{f}{y}(P_{ij})\right)^2 + 1}\;\Delta A_{ij} \label{dsigma}
$$

con $\varphi_{ij}$ el ángulo director de $\mathbf n_{ij}$ respecto del eje $z$, que es el mismo ángulo que hay entre $\Delta\sigma_{ij}$ y $\Delta A_{ij}$.

**4. Reemplazando** \eqref{dsigma} en \eqref{caudal} e incorporando la expresión de $\mathbf n$, las raíces se simplifican:

$$
\mathbf n\,\dd\sigma = \frac{\left(-\pd{f}{x};\ -\pd{f}{y};\ 1\right)}{\hl{\sqrt{\left(\pd{f}{x}\right)^2 + \left(\pd{f}{y}\right)^2 + 1}}}\cdot\hl{\sqrt{\left(\pd{f}{x}\right)^2 + \left(\pd{f}{y}\right)^2 + 1}}\;\dd A = \left(-\pd{f}{x};\ -\pd{f}{y};\ 1\right)\dx\,\dy
$$

y entonces:

::: pasos
\iint_\sigma \mathbf F\cdot\mathbf n\,\dd\sigma = \iint_D (F_1;F_2;F_3)\cdot\left(-\pd{f}{x};\ -\pd{f}{y};\ 1\right)\dx\,\dy
  = \iint_D \left(-\pd{f}{x}\,F_1 - \pd{f}{y}\,F_2 + F_3\right)\dx\,\dy                                    // producto escalar
:::
:::

::: resultado Flujo a través de $z = f(x;y)$
$$
\iint_\sigma \mathbf F\cdot\dd\boldsymbol\sigma = \iint_D \left(-\pd{f}{x}\,F_1 - \pd{f}{y}\,F_2 + F_3\right)\dx\,\dy
$$
:::

Es la **fórmula práctica** para calcular el flujo de $\mathbf F$ a través de $\sigma$, independientemente de la aplicación, cuando la superficie viene dada por $z = f(x;y)$. El procedimiento consiste en **valuar $\mathbf F$ en la superficie**:

$$
\begin{cases} F_1(x;y;z) = F_1\big(x;y;f(x;y)\big) \\ F_2(x;y;z) = F_2\big(x;y;f(x;y)\big) \\ F_3(x;y;z) = F_3\big(x;y;f(x;y)\big) \end{cases}
$$

es decir,

$$
\iint_\sigma \mathbf F\cdot\dd\boldsymbol\sigma = \iint_D \left(-\pd{f}{x}\,F_1\big(x;y;f(x;y)\big) - \pd{f}{y}\,F_2\big(x;y;f(x;y)\big) + F_3\big(x;y;f(x;y)\big)\right)\dx\,\dy
$$

y luego se calcula la integral doble.

## Superficies $x = f(y;z)$ e $y = f(x;z)$

Si la superficie viene dada por $x = f(y;z)$, con $D$ en el plano $yz$:

```grafico3d
titulo: $x = f(y;z)$ sobre $D$ en el plano $yz$, y el campo $\mathbf F$
x = 2.5 + (y^2 + (z - 1.5)^2)/3 ; sobre y^2 + (z - 1.5)^2 <= 1 ; sombra ; "$x = f(y;z)$"
vector (2.7, 0.3, 1.8) (4.2, 0.6, 2.2) ; verde ; "$\mathbf F$"
vista: 40, 18
```

::: resultado
$$
\iint_\sigma \mathbf F\cdot\dd\boldsymbol\sigma = \iint_D \left(F_1\big(f(y;z);y;z\big) - \pd{f}{y}\,F_2\big(f(y;z);y;z\big) - \pd{f}{z}\,F_3\big(f(y;z);y;z\big)\right)\dy\,\dz
$$
:::

Si viene dada por $y = f(x;z)$, con $D$ en el plano $xz$:

```grafico3d
titulo: $y = f(x;z)$ sobre $D$ en el plano $xz$, y el campo $\mathbf F$
y = 2.5 + (x^2 + (z - 1.5)^2)/3 ; sobre x^2 + (z - 1.5)^2 <= 1 ; sombra ; "$y = f(x;z)$"
vector (0.3, 2.7, 1.8) (0.6, 4.2, 1.4) ; verde ; "$\mathbf F$"
vista: 25, 18
```

::: resultado
$$
\iint_\sigma \mathbf F\cdot\dd\boldsymbol\sigma = \iint_D \left(-\pd{f}{x}\,F_1\big(x;f(x;z);z\big) + F_2\big(x;f(x;z);z\big) - \pd{f}{z}\,F_3\big(x;f(x;z);z\big)\right)\dx\,\dz
$$
:::

::: observacion
La regla es siempre la misma: la componente de $\mathbf F$ en la dirección de la variable despejada va con $+1$; las otras dos, con menos la derivada de $f$ respecto de su variable.
:::

## Ejemplo

::: ejemplo Calcular el flujo de $\mathbf F = (y;\,x;\,z)$ a través de la superficie $z = 1 - x^2 - y^2$ con $z \ge 0$
**a) La superficie**

```grafico3d
titulo: El paraboloide $z = 1 - x^2 - y^2$ con $z \ge 0$, sobre el círculo $D$
z = 1 - x^2 - y^2 ; sobre x^2 + y^2 <= 1 ; sombra ; ""
texto (0, 0, 1.25) "$z = 1 - x^2 - y^2$"
texto (0.5, 0.5, 0) "$D$"
```

$$
\Phi = \iint_\sigma \mathbf F\cdot\dd\boldsymbol\sigma = \iint_\sigma \mathbf F\cdot\mathbf n\,\dd\sigma = \iint_D \left(-\pd{z}{x}\,F_1 - \pd{z}{y}\,F_2 + F_3\right)\dx\,\dy
$$

**b) Las derivadas**

$$
\pd{z}{x} = -2x \qquad\qquad \pd{z}{y} = -2y
$$

**c) El integrando**, con $\mathbf F$ valuado en la superficie ($F_3 = z = 1 - x^2 - y^2$):

::: pasos
-\pd{z}{x}\,F_1 - \pd{z}{y}\,F_2 + F_3 = 2x\cdot y + 2y\cdot x + 1 - x^2 - y^2
  = 1 + 4xy - x^2 - y^2
:::

**d) Cálculo.** $D$ es el círculo $x^2 + y^2 \le 1$: en polares, $x = r\cos\theta$, $y = r\sen\theta$, $|J| = r$.

::: pasos
\Phi = \iint_D \left(1 + 4xy - x^2 - y^2\right)\dx\,\dy
  = \int_0^{2\pi} \dtheta \int_0^1 \left(1 + 4r^2\cos\theta\sen\theta - r^2\right) r\,\dr
  = \int_0^{2\pi} \dtheta \, \eval{\left[\frac{r^2}{2} + \frac{r^4}{4}\left(4\cos\theta\sen\theta - 1\right)\right]}{0}{1}
  = \int_0^{2\pi} \left[\frac{1}{2} + \frac{1}{4}\left(4\cos\theta\sen\theta - 1\right)\right]\dtheta
  = \int_0^{2\pi} \left(\frac{1}{4} + \cos\theta\sen\theta\right)\dtheta
  = \eval{\frac{\theta}{4}}{0}{2\pi} + \eval{\frac{\sen^2\theta}{2}}{0}{2\pi}            // la segunda vale $0$
:::

::: resultado
$$
\iint_\sigma \mathbf F\cdot\dd\boldsymbol\sigma = \frac{\pi}{2}
$$
:::

::: aclaracion
En el apunte la primitiva de $\cos\theta\sen\theta$ figura como $\sen^2\theta$; es $\frac{\sen^2\theta}{2}$. No cambia el resultado: entre $0$ y $2\pi$ vale $0$ igual.
:::
:::
