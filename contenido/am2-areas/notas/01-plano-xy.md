# 1. Superficies sobre el plano xy

Nos proponemos calcular el **área de la superficie** $z = f(x;y)$ sobre el dominio acotado $D$.

```grafico3d
titulo: La superficie $S$: $z = f(x;y)$ sobre $D$; en $M_{ij}$, el plano tangente $\Delta\sigma_{ij}$ y la normal $\mathbf N$
z = 3 + sen(x) cos(y)/2 - (x^2 + y^2)/10 ; sobre x^2 + y^2 <= 4 ; sombra ; ""
alto: 440
poligono (0.4, 0.2, 3.274) (1.2, 0.2, 3.376) (1.2, 1, 3.118) (0.4, 1, 3.016) ; ambar ; ""
poligono (0.4, 0.2, 0) (1.2, 0.2, 0) (1.2, 1, 0) (0.4, 1, 0) ; ambar ; ""
vector (0.8, 0.6, 3.196) (0.647, 0.987, 4.396) ; rojo ; "$\mathbf N$"
punto (0.8, 0.6, 3.196) ; ""
punto (0.8, 0.6, 0) ; ""
texto (1.6, 0.2, 3.5) "$\Delta\sigma_{ij}$"
texto (0.8, 0.6, 2.85) "$M_{ij}$"
texto (1.7, 0.6, 0) "$R_{ij}$"
texto (0.8, 0.6, -0.35) "$P_{ij}$"
segmento (0.8, 0.6, 0) (0.8, 0.6, 3.196) ; gris ; punteada
texto (-1.4, -1.4, 3.3) "$S$"
texto (-1.2, 1.2, 0) "$D$"
```

## El plano tangente sobre cada rectángulo

Se divide $D$ en rectángulos $R_{ij}$ de área $\Delta A_{ij} = \Delta x_i\,\Delta y_j$, haciendo la correspondiente partición de intervalos.

Se elige un punto interior de $R_{ij}$, $P_{ij} = (x_{ij};y_{ij})$, cuyo punto en la superficie es $M_{ij} = (x_{ij};y_{ij};z_{ij})$. Ahí se traza el **plano tangente**:

$$
z - z_{ij} = f'_x(x_{ij};y_{ij})\,(x - x_{ij}) + f'_y(x_{ij};y_{ij})\,(y - y_{ij})
$$

Llamamos $\Delta\sigma_{ij}$ al **área de la porción de plano tangente** que corresponde a $R_{ij}$ (es decir, cuya proyección sobre el plano $xy$ es $R_{ij}$).

::: teorema Área de una superficie {#area-sup}
H) $S$: $z = f(x;y)$, con $f'_x$ y $f'_y$ continuas en el dominio acotado $D$.
T) $\displaystyle A(S) = \iint_D \sqrt{\left[f'_x\right]^2 + \left[f'_y\right]^2 + 1}\;\dx\,\dy$
:::

::: idea
Cada pedazo de plano tangente $\Delta\sigma_{ij}$ es **más grande** que su sombra $\Delta A_{ij}$, tanto más cuanto más inclinado está: el factor es $\frac{1}{\cos\varphi_{ij}}$, y el coseno sale de la normal al plano tangente.
:::

::: demostracion
**1. Suma de Riemann.** Aproximamos el área de la superficie con la doble suma de Riemann de los pedazos de plano tangente, y tomamos límite:

::: pasos
A(S) \simeq \sum_{j=1}^{m}\sum_{i=1}^{n} \Delta\sigma_{ij}
A(S) = \lim_{\substack{n\to\infty \\ m\to\infty \\ (\max\Delta\sigma\to 0)}} \sum_{j=1}^{m}\sum_{i=1}^{n} \Delta\sigma_{ij} \label{area-lim}
:::

**2. Proyección.** Llamando $\varphi_{ij}$ al ángulo entre el plano tangente en $M_{ij}$ y el plano $xy$ (que es idéntico al ángulo entre la normal a la superficie en $M_{ij}$ y el eje $z$, normal al plano $xy$), la proyección de $\Delta\sigma_{ij}$ es $\Delta A_{ij}$:

$$
\Delta A_{ij} = \Delta\sigma_{ij}\cos\varphi_{ij} \quad\then\quad \Delta\sigma_{ij} = \frac{\Delta A_{ij}}{\cos\varphi_{ij}} \label{sigma}
$$

**3. La normal.** La normal $\mathbf N$ a la superficie en $M_{ij}$ está formada por los coeficientes de las variables de la **ecuación implícita** del plano tangente en ese punto, $-f'_x\,(x - x_{ij}) - f'_y\,(y - y_{ij}) + (z - z_{ij}) = 0$:

$$
\mathbf N = \big(-f'_x(x_{ij};y_{ij});\ -f'_y(x_{ij};y_{ij});\ 1\big)
$$

Sus cosenos directores son

$$
\frac{\mathbf N}{|\mathbf N|} = \frac{\big(-f'_x(x_{ij};y_{ij});\ -f'_y(x_{ij};y_{ij});\ 1\big)}{\sqrt{\left[f'_x(x_{ij};y_{ij})\right]^2 + \left[f'_y(x_{ij};y_{ij})\right]^2 + 1}} = \left(\cos\alpha_{ij};\ \cos\beta_{ij};\ \cos\varphi_{ij}\right)
$$

y el que interesa es el del eje $z$:

$$
\cos\varphi_{ij} = \frac{1}{\sqrt{\left[f'_x(x_{ij};y_{ij})\right]^2 + \left[f'_y(x_{ij};y_{ij})\right]^2 + 1}}
$$

**4. A la integral.** Con este coseno en \eqref{sigma}:

$$
\Delta\sigma_{ij} = \sqrt{\left[f'_x(x_{ij};y_{ij})\right]^2 + \left[f'_y(x_{ij};y_{ij})\right]^2 + 1}\;\Delta A_{ij}
$$

y reemplazando en \eqref{area-lim}:

$$
A(S) = \lim_{\substack{n\to\infty \\ m\to\infty \\ (\max\Delta\sigma\to 0)}} \sum_{j=1}^{m}\sum_{i=1}^{n} \sqrt{\left[f'_x(x_{ij};y_{ij})\right]^2 + \left[f'_y(x_{ij};y_{ij})\right]^2 + 1}\;\Delta A_{ij}
$$

que es la doble suma de Riemann de la integral doble de la tesis.
:::

::: resultado Área de la superficie $z = f(x;y)$
$$
A(S) = \iint_D \sqrt{\left[f'_x\right]^2 + \left[f'_y\right]^2 + 1}\;\dx\,\dy
$$
:::

::: observacion
Si la superficie es un plano paralelo al plano $xy$, $f'_x = f'_y = 0$ y la raíz vale $1$: el área de $S$ es el área de $D$, como en [[5. Área y volumen]] de dobles.
:::
