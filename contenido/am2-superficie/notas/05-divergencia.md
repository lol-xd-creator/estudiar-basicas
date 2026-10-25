# 5. Teorema de la divergencia

También se llama **teorema de Gauss**.

::: teorema Teorema de la divergencia (o de Gauss) {#gauss}
H) $\mathbf F$ es un campo vectorial continuo con derivadas parciales continuas en una región abierta del espacio que contiene al sólido $V$, limitado por una superficie **cerrada** $\sigma$ orientable (normal hacia afuera).
T) $\displaystyle\iint_\sigma \mathbf F\cdot\mathbf n\,\dd\sigma = \iiint_V \operatorname{div}\mathbf F\,\dV$
:::

El **flujo** que sale por la superficie cerrada es la suma de lo que generan las fuentes (y absorben los sumideros) adentro: la integral de la divergencia en el volumen (ver [[1. Operador nabla]]).

```grafico3d
titulo: El sólido $V$ entre $\sigma_1$: $z = f_1(x;y)$ y $\sigma_2$: $z = f_2(x;y)$, con las normales hacia afuera
alto: 440
2 + (x^2 + y^2)/4 <= z <= 4.5 - (x^2 + y^2)/4
vector (0.6, 0.6, 4.32) (0.85, 0.85, 5.4) ; rojo ; "$\mathbf n$"
vector (0.6, 0.6, 2.18) (0.85, 0.85, 1.1) ; rojo ; "$\mathbf n$"
texto (-1.6, -1.6, 4.4) "$\sigma_2$"
texto (-1.6, -1.6, 2.1) "$\sigma_1$"
```

::: demostracion
Se supone que $V$ es **proyectable sobre los tres planos coordenados**, es decir, que es **triplemente simple**. Desarrollando la tesis:

$$
\iint_\sigma \left(F_1\,\mathbf i + F_2\,\mathbf j + F_3\,\mathbf k\right)\cdot\mathbf n\,\dd\sigma = \iiint_V \left(\pd{F_1}{x} + \pd{F_2}{y} + \pd{F_3}{z}\right)\dV
$$

Queda demostrado si se cumplen

$$
\text{a)}\ \iint_\sigma F_1\,\mathbf i\cdot\mathbf n\,\dd\sigma = \iiint_V \pd{F_1}{x}\,\dV
\qquad
\text{b)}\ \iint_\sigma F_2\,\mathbf j\cdot\mathbf n\,\dd\sigma = \iiint_V \pd{F_2}{y}\,\dV
\qquad
\text{c)}\ \iint_\sigma F_3\,\mathbf k\cdot\mathbf n\,\dd\sigma = \iiint_V \pd{F_3}{z}\,\dV
$$

**c) con $V$ de tipo 1**, proyectable sobre el plano $xy$:

$$
V = \{(x;y;z) \,/\, (x;y) \in D \wedge f_1(x;y) \le z \le f_2(x;y)\}
\qquad\qquad
\sigma = \sigma_1 \cup \sigma_2 \quad\text{con}\quad \begin{cases} \sigma_1: z = f_1(x;y) \\ \sigma_2: z = f_2(x;y) \end{cases}
$$

En $\sigma_2$ (arriba) la normal hacia afuera apunta hacia arriba, $\left(-\pd{z}{x};\ -\pd{z}{y};\ 1\right)$; en $\sigma_1$ (abajo) apunta hacia abajo, $\left(\pd{z}{x};\ \pd{z}{y};\ -1\right)$. El **primer miembro** de c):

$$
\iint_\sigma F_3\,\mathbf k\cdot\mathbf n\,\dd\sigma = \iint_{\sigma_1} (0;0;F_3)\cdot\mathbf n\,\dd\sigma + \iint_{\sigma_2} (0;0;F_3)\cdot\mathbf n\,\dd\sigma
$$

En cada superficie, del producto escalar solo queda la tercera componente:

::: pasos
\iint_{\sigma_1} (0;0;F_3)\cdot\mathbf n\,\dd\sigma = \iint_D (0;0;F_3)\cdot\left(\pd{z}{x};\ \pd{z}{y};\ -1\right)\dx\,\dy
  = -\iint_D F_3\big(x;y;f_1(x;y)\big)\,\dx\,\dy
:::

::: pasos
\iint_{\sigma_2} (0;0;F_3)\cdot\mathbf n\,\dd\sigma = \iint_D (0;0;F_3)\cdot\left(-\pd{z}{x};\ -\pd{z}{y};\ 1\right)\dx\,\dy
  = \iint_D F_3\big(x;y;f_2(x;y)\big)\,\dx\,\dy
:::

Sumando:

$$
\iint_\sigma F_3\,\mathbf k\cdot\mathbf n\,\dd\sigma = \iint_D \Big[F_3\big(x;y;f_2(x;y)\big) - F_3\big(x;y;f_1(x;y)\big)\Big]\dx\,\dy \label{gaussA}
$$

El **segundo miembro** de c), con la integral triple de tipo 1:

::: pasos
\iiint_V \pd{F_3}{z}\,\dV = \iint_D \dx\,\dy \int_{f_1(x;y)}^{f_2(x;y)} \pd{F_3}{z}\,\dz
  = \iint_D \Big[F_3\big(x;y;f_2(x;y)\big) - F_3\big(x;y;f_1(x;y)\big)\Big]\dx\,\dy \label{gaussB}
:::

Como \eqref{gaussA} $=$ \eqref{gaussB}, **queda demostrado c)**. El mismo trabajo se hace con a) y b), con $V$ de tipo 2 y de tipo 3 respectivamente.
:::

## Ejemplo

::: ejemplo Usando el teorema de la divergencia, hallar el flujo de $\mathbf F(x;y;z) = (z;\,y;\,x)$ a través de la esfera de radio uno, $x^2 + y^2 + z^2 = 1$
**a) La divergencia**

$$
\operatorname{div}\mathbf F = \pd{F_1}{x} + \pd{F_2}{y} + \pd{F_3}{z} = 0 + 1 + 0 = 1
$$

**b) Cálculo.** En esféricas: $x = \rho\cos\theta\sen\varphi$, $y = \rho\sen\theta\sen\varphi$, $z = \rho\cos\varphi$, con $|J| = \rho^2\sen\varphi$ (ver [[3. Coordenadas esféricas]]).

::: pasos
\iint_\sigma \mathbf F\cdot\dd\boldsymbol\sigma = \iiint_V \operatorname{div}\mathbf F\,\dV = \iiint_V 1\,\dx\,\dy\,\dz
  = \int_0^{2\pi} \dtheta \int_0^\pi \dd\varphi \int_0^1 \rho^2\sen\varphi\,\dd\rho
  = \int_0^{2\pi} \dtheta \int_0^\pi \sen\varphi \, \eval{\frac{\rho^3}{3}}{0}{1}\dd\varphi
  = \frac{1}{3}\int_0^{2\pi} \dtheta \, \eval{(-\cos\varphi)}{0}{\pi}
  = \frac{2}{3}\,\eval{\theta}{0}{2\pi}                                       // $-\cos\pi + \cos 0 = 2$
:::

::: resultado
$$
\iint_\sigma \mathbf F\cdot\dd\boldsymbol\sigma = \frac{4}{3}\,\pi
$$
:::

Es el mismo flujo que se calculó en [[3. Superficies paramétricas]] con la integral de superficie: da igual, pero con la divergencia la cuenta es mucho más corta. Como $\operatorname{div}\mathbf F = 1$, el flujo es el **volumen** de la esfera.
:::
