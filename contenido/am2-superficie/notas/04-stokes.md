# 4. Teorema de Stokes

::: teorema Teorema de Stokes {#stokes}
H) $\mathbf F(x;y;z)$ es un campo vectorial continuo, con derivadas parciales continuas en una región abierta que contiene a la superficie orientable $\sigma$, cuyo borde $\lambda$ se recorre en sentido positivo.
T) $\displaystyle\oint_\lambda \mathbf F\cdot\dd\mathbf s = \iint_\sigma \nabla\times\mathbf F\cdot\mathbf n\,\dd\sigma = \iint_\sigma \nabla\times\mathbf F\cdot\dd\boldsymbol\sigma$
:::

La **circulación** del campo sobre el borde es el **flujo del rotor** a través de la superficie.

```grafico3d
titulo: La superficie $\sigma$: $z = f(x;y)$ con su borde $\lambda$; abajo, la región $D$ con su contorno $L$
alto: 440
z = 3.2 - (x^2 + y^2)/3 ; sobre x^2 + y^2 <= 2.2 ; ""
(1.483 cos(t), 1.483 sin(t), 2.467) ; t: 0..2pi ; flecha ; azul ; "$\lambda$"
(1.483 cos(t), 1.483 sin(t), 0) ; t: 0..2pi ; flecha ; rojo ; "$L$"
vector (0.6, 0.6, 2.96) (1.0, 1.0, 4.1) ; rojo ; "$\mathbf n$"
texto (-0.6, -0.6, 3.3) "$\sigma$"
texto (0.4, 0.4, 0) "$D$"
```

::: demostracion
Se hace para $\sigma$: $z = f(x;y)$ sobre una región $D$ del plano $xy$.

**1. La curva $\lambda$.** Se empieza por la integral

$$
\oint_\lambda \mathbf F\cdot\dd\mathbf s = \oint_\lambda F_1(x;y;z)\,\dx + F_2(x;y;z)\,\dy + F_3(x;y;z)\,\dz
$$

con ecuaciones paramétricas para $\lambda$:

$$
\lambda: \begin{cases} x = g_1(t) \\ y = g_2(t) \\ z = f\big(g_1(t);g_2(t)\big) \end{cases}
$$

$\lambda$ es una curva que pertenece a la superficie $\sigma$: $z = f(x;y)$ y es la imagen de la curva $L$, contorno de la región $D$ en el plano $xy$:

$$
L: \begin{cases} x = g_1(t) \\ y = g_2(t) \end{cases} \qquad t_1 \le t \le t_2
$$

**2. Los diferenciales.** $z$ depende de $t$ a través de las variables intermedias $x$ e $y$ (regla de la cadena):

$$
\begin{cases} \dx = \dfrac{\dd x}{\dd t}\,\dt \\[8pt] \dy = \dfrac{\dd y}{\dd t}\,\dt \\[8pt] \dz = \left(\pd{z}{x}\dfrac{\dd x}{\dd t} + \pd{z}{y}\dfrac{\dd y}{\dd t}\right)\dt \end{cases}
$$

Entonces:

::: pasos
\oint_\lambda \mathbf F\cdot\dd\mathbf s = \oint_L F_1\frac{\dd x}{\dd t}\,\dt + F_2\frac{\dd y}{\dd t}\,\dt + F_3\left(\pd{z}{x}\frac{\dd x}{\dd t} + \pd{z}{y}\frac{\dd y}{\dd t}\right)\dt
  = \oint_L \left(F_1 + F_3\pd{z}{x}\right)\frac{\dd x}{\dd t}\,\dt + \left(F_2 + F_3\pd{z}{y}\right)\frac{\dd y}{\dd t}\,\dt \label{st1}       // reordenando
:::

**3. Green.** \eqref{st1} es una integral curvilínea sobre la curva **cerrada plana** $L$, así que se puede aplicar el [[1. Teorema de Green]]: los paréntesis son funciones que multiplican a $\dx = \frac{\dd x}{\dd t}\dt$ y a $\dy = \frac{\dd y}{\dd t}\dt$. Entonces:

$$
\eqref{st1} = \iint_D \left[\pd{}{x}\left(F_2 + F_3\pd{z}{y}\right) - \pd{}{y}\left(F_1 + F_3\pd{z}{x}\right)\right]\dx\,\dy \label{st2}
$$

**4. Las derivadas.** Cada componente del campo depende de $x$, $y$ y $z$, y $z$ a su vez de $x$ e $y$:

$$
\pd{}{x}\left(F_2 + F_3\pd{z}{y}\right) = \pd{F_2}{x} + \pd{F_2}{z}\pd{z}{x} + \left(\pd{F_3}{x} + \pd{F_3}{z}\pd{z}{x}\right)\pd{z}{y} + F_3\frac{\partial^2 z}{\partial x\,\partial y} \label{sta}
$$

$$
\pd{}{y}\left(F_1 + F_3\pd{z}{x}\right) = \pd{F_1}{y} + \pd{F_1}{z}\pd{z}{y} + \left(\pd{F_3}{y} + \pd{F_3}{z}\pd{z}{y}\right)\pd{z}{x} + F_3\frac{\partial^2 z}{\partial y\,\partial x} \label{stb}
$$

Al restar, se cancelan las derivadas segundas cruzadas de $z$ (Schwarz) y los términos $\pd{F_3}{z}\pd{z}{x}\pd{z}{y}$:

$$
\eqref{sta} - \eqref{stb} = \pd{F_2}{x} - \pd{F_1}{y} + \pd{F_2}{z}\hl{\pd{z}{x}} - \pd{F_1}{z}\hlb{\pd{z}{y}} + \pd{F_3}{x}\hlb{\pd{z}{y}} - \pd{F_3}{y}\hl{\pd{z}{x}}
$$

**5. Factor común.** Sacando factor común y reordenando dentro de la integral:

$$
\eqref{st2} = \iint_D \left[-\hl{\pd{z}{x}}\left(\pd{F_3}{y} - \pd{F_2}{z}\right) - \hlb{\pd{z}{y}}\left(\pd{F_1}{z} - \pd{F_3}{x}\right) + \left(\pd{F_2}{x} - \pd{F_1}{y}\right)\right]\dx\,\dy
$$

El corchete es el **producto escalar** del rotor por $\left(-\pd{z}{x};\ -\pd{z}{y};\ 1\right)$:

$$
\left(\pd{F_3}{y} - \pd{F_2}{z};\ \pd{F_1}{z} - \pd{F_3}{x};\ \pd{F_2}{x} - \pd{F_1}{y}\right)\cdot\left(-\pd{z}{x};\ -\pd{z}{y};\ 1\right) = \nabla\times\mathbf F\cdot\left(-\pd{z}{x};\ -\pd{z}{y};\ 1\right)
$$

y $\left(-\pd{z}{x};\ -\pd{z}{y};\ 1\right)\dx\,\dy = \dd\boldsymbol\sigma$ (ver [[2. Flujo a través de una superficie]]). Entonces:

$$
\oint_\lambda \mathbf F\cdot\dd\mathbf s = \iint_\sigma \nabla\times\mathbf F\cdot\dd\boldsymbol\sigma
$$
:::

## Consideraciones

**1) Green es un caso particular de Stokes.** Si $\sigma$ es una superficie **plana paralela al plano $xy$**, $\Delta z = 0$, y

$$
\dd\boldsymbol\sigma = \left(-\pd{z}{x};\ -\pd{z}{y};\ 1\right)\dx\,\dy = (0;\,0;\,1)\,\dx\,\dy
$$

El producto escalar dentro de la integral deja solo la tercera componente del rotor, $\pd{F_2}{x} - \pd{F_1}{y}$, y el teorema de Stokes se transforma en el **teorema de Green**.

**2) Rotor nulo e independencia del camino.** Si $\oint_\lambda \mathbf F\cdot\dd\mathbf s = \oint_\lambda F_1\,\dx + F_2\,\dy + F_3\,\dz = 0$ $\forall\,\lambda$ cerrada, por Stokes

$$
\oint_\lambda \mathbf F\cdot\dd\mathbf s = \iint_\sigma \nabla\times\mathbf F\cdot\dd\boldsymbol\sigma = 0 \qquad\forall\,\lambda\ \text{y}\ \forall\,\sigma\ \text{según}\ \lambda
$$

lo que implica que

::: resultado
$$
\nabla\times\mathbf F = \left(\pd{F_3}{y} - \pd{F_2}{z};\ \pd{F_1}{z} - \pd{F_3}{x};\ \pd{F_2}{x} - \pd{F_1}{y}\right) = (0;0;0) = \mathbf 0 \label{rot0}
$$
:::

Esto significa que la integral de línea es independiente del camino de integración de $\mathbf F$ entre dos puntos, que **el cumplimiento de \eqref{rot0} es condición suficiente para afirmar la independencia del camino de integración** y, como se vio en [[3. Campo conservativo y función potencial]], que el campo vectorial $\mathbf F$ es un **campo conservativo o gradiente**. En este caso $\mathbf F = \nabla u$, con $u$ la **función potencial**.

::: aclaracion
\eqref{rot0} son justamente las igualdades cruzadas de la 2.ª parte de integral curvilínea. Como allí, para que el rotor nulo alcance (sea suficiente), toda curva cerrada del dominio tiene que ser borde de una superficie contenida en él: el dominio debe ser **simplemente conexo**. Además, acá la función potencial se llama $u$ en lugar de $f$.
:::

**3) Campos irrotacionales.** Por la consideración 2, el rotor de un campo gradiente es igual a cero:

$$
\nabla\times\mathbf F = \nabla\times(\nabla u) = \mathbf 0 \quad\text{(vector nulo)}
$$

En este caso se dice que $\mathbf F$ es un **campo vectorial irrotacional**, porque la circulación de $\mathbf F$ sobre la curva cerrada $\lambda$ es $0$. Si se tratara de un campo de fuerzas, $\mathbf F$ es irrotacional porque el trabajo de circulación del campo sobre la curva cerrada $\lambda$ es nulo: el campo de fuerzas no intenta rotar a ningún elemento bajo su acción.

## Ejemplo

::: ejemplo Mediante el teorema de Stokes, calcular $\displaystyle\oint_\lambda \mathbf F\cdot\dd\mathbf s$, donde $\lambda$ está orientada en sentido contrario a las agujas del reloj vista desde arriba, $\lambda$ es el triángulo de vértices $(1;0;0)$, $(0;1;0)$ y $(0;0;1)$, y $\mathbf F = \left(x + y^2;\ y + z^2;\ z + x^2\right)$
**a) La superficie.** $\sigma$ es el triángulo del plano $x + y + z = 1$ que tiene a $\lambda$ como borde:

```grafico3d
titulo: El triángulo $\sigma$ del plano $x + y + z = 1$, su borde $\lambda$ y su proyección $D$
z = 1 - x - y ; sobre x >= 0, y >= 0, x + y <= 1 ; sombra ; ""
(1 - t, t, 0) ; t: 0..1 ; flecha ; azul ; "$\lambda$"
(0, 1 - t, t) ; t: 0..1 ; flecha ; azul ; ""
(t, 0, 1 - t) ; t: 0..1 ; flecha ; azul ; ""
texto (0.3, 0.3, 0.5) "$\sigma$"
texto (0.3, 0.3, 0) "$D$"
```

$$
\oint_\lambda F_1\,\dx + F_2\,\dy + F_3\,\dz = \iint_\sigma \nabla\times\mathbf F\cdot\dd\boldsymbol\sigma
$$

**b) El rotor**

$$
\nabla\times\mathbf F = \left(\pd{F_3}{y} - \pd{F_2}{z};\ \pd{F_1}{z} - \pd{F_3}{x};\ \pd{F_2}{x} - \pd{F_1}{y}\right) = (-2z;\ -2x;\ -2y)
$$

**c) El diferencial de superficie.** $\sigma$: $x + y + z = 1 \then z = 1 - x - y$:

$$
\dd\boldsymbol\sigma = \mathbf n\,\dd\sigma = \frac{(1;1;1)}{\sqrt 3}\cdot\sqrt 3\,\dx\,\dy = (1;1;1)\,\dx\,\dy
$$

**d) El integrando**, con $z$ valuada con la ecuación de la superficie $\sigma$:

::: pasos
\nabla\times\mathbf F\cdot\dd\boldsymbol\sigma = (-2z;\ -2x;\ -2y)\cdot(1;1;1)\,\dx\,\dy
  = (-2x - 2y - 2z)\,\dx\,\dy
  = \big(-2x - 2y - 2(1 - x - y)\big)\,\dx\,\dy                          // $z = 1 - x - y$
  = -2\,\dx\,\dy
:::

**e) Cálculo.** $D$ es el triángulo $0 \le x \le 1$, $0 \le y \le 1 - x$:

::: pasos
\oint_\lambda \mathbf F\cdot\dd\mathbf s = -2\iint_D \dx\,\dy
  = -2\int_0^1 \dx \int_0^{1-x} \dy
  = -2\int_0^1 (1 - x)\,\dx
  = -2\,\eval{\left(x - \frac{x^2}{2}\right)}{0}{1}
  = -2\cdot\frac{1}{2}
:::

::: resultado
$$
\oint_\lambda \mathbf F\cdot\dd\mathbf s = -1
$$
:::
:::
