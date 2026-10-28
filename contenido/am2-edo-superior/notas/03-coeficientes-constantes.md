# 3. Homogéneas a coeficientes constantes

$$
y'' + p\,y' + q\,y = 0 \qquad (p \text{ y } q \text{ constantes}) \label{cc}
$$

Para la SG hacen falta **dos soluciones particulares LI** ([[2. EDL homogéneas de 2.º orden y wronskiano]]).

## Ecuación característica

La EDL homogénea de 1.er orden, $y' + p\,y = 0$, tiene soluciones del tipo $e^{mx}$. Se prueba si sirven también para \eqref{cc}:

$$
y = e^{mx} \quad\then\quad y' = m\,e^{mx} \quad\then\quad y'' = m^2e^{mx}
$$

Reemplazando en \eqref{cc}:

$$
m^2e^{mx} + p\,m\,e^{mx} + q\,e^{mx} = 0 \quad\then\quad e^{mx}\,\big(\hl{m^2 + p\,m + q}\big) = 0
$$

Como $e^{mx}$ nunca se anula, tiene que anularse el paréntesis.

::: resultado Ecuación característica (EC)
$$
m^2 + p\,m + q = 0
$$

Cada raíz $r$ de la EC da una solución $y = e^{rx}$ de la ED. Se arma copiando los coeficientes: $y'' \to m^2$, $y' \to m$, $y \to 1$.
:::

Hay tres casos, según las raíces $r = \dfrac{-p \pm \sqrt{p^2 - 4q}}{2}$.

## Caso 1: raíces reales y distintas ($p^2 - 4q > 0$)

$y_1 = e^{r_1x}$ e $y_2 = e^{r_2x}$ son soluciones, y son LI porque $\dfrac{y_1}{y_2} = e^{(r_1 - r_2)x} \ne \cte$.

::: resultado
$$
y = C_1\,e^{r_1x} + C_2\,e^{r_2x} \qquad\text{(SG)}
$$
:::

::: ejemplo $y'' + y' - 6y = 0$
EC: $m^2 + m - 6 = 0 \then m = \dfrac{-1 \pm \sqrt{1 + 24}}{2} \then r_1 = -3;\ r_2 = 2$.

$$
y = C_1\,e^{-3x} + C_2\,e^{2x}
$$
:::

## Caso 2: raíces reales iguales ($p^2 - 4q = 0$)

La raíz doble es $r = -\dfrac{p}{2}$, o sea, $2r + p = 0$. Da **una sola** solución, $y_1 = e^{rx}$: con $C_1e^{rx} + C_2e^{rx} = (C_1 + C_2)\,e^{rx}$ queda una sola constante esencial, y hacen falta dos.

::: demostracion Cómo se consigue la segunda solución
Se propone $y = u\,e^{rx}$, que contiene a $y_1 = e^{rx}$ y una función $u(x)$ a determinar:

$$
y' = u'e^{rx} + r\,u\,e^{rx} \qquad y'' = u''e^{rx} + 2r\,u'e^{rx} + r^2u\,e^{rx}
$$

Reemplazando en \eqref{cc} y reagrupando:

$$
u''e^{rx} + u'e^{rx}\,\big(\hl{2r + p}\big) + u\,e^{rx}\,\big(\hlb{r^2 + p\,r + q}\big) = 0
$$

- $2r + p = 0$, por ser raíz doble;
- $r^2 + p\,r + q = 0$, por ser $r$ raíz de la EC.

Queda $u''e^{rx} = 0 \then u'' = 0$. Integrando dos veces: $u' = C_2 \then u = C_1 + C_2\,x$. Entonces $y = (C_1 + C_2x)\,e^{rx}$.
:::

$y_1 = e^{rx}$ e $y_2 = x\,e^{rx}$ son LI ($\frac{y_1}{y_2} = \frac{1}{x} \ne \cte$).

::: resultado
$$
y = C_1\,e^{rx} + C_2\,x\,e^{rx} \qquad\text{(SG)}
$$
:::

::: ejemplo $y'' - 2y' + y = 0$
EC: $m^2 - 2m + 1 = 0 \then m = \dfrac{2 \pm \sqrt{4 - 4}}{2} \then r_1 = r_2 = 1$.

$$
y = C_1\,e^{x} + C_2\,x\,e^{x}
$$
:::

## Caso 3: raíces complejas conjugadas ($p^2 - 4q < 0$)

Las raíces son $r_{1;2} = \alpha \pm \beta i$, con soluciones $e^{(\alpha + \beta i)x}$ y $e^{(\alpha - \beta i)x}$, que son LI ($\frac{y_1}{y_2} = e^{2\beta i x} \ne \cte$).

::: demostracion Cómo se pasa a funciones reales
La SG es $y = C_1e^{(\alpha + \beta i)x} + C_2e^{(\alpha - \beta i)x} = e^{\alpha x}\big(C_1e^{\beta i x} + C_2e^{-\beta i x}\big)$. Con la **fórmula de Euler**, $e^{\pm\beta i x} = \cos\beta x \pm i\sen\beta x$:

$$
y = e^{\alpha x}\big[C_1(\cos\beta x + i\sen\beta x) + C_2(\cos\beta x - i\sen\beta x)\big] = e^{\alpha x}\big[\hl{(C_1 + C_2)}\cos\beta x + \hlb{(C_1 - C_2)\,i}\,\sen\beta x\big]
$$

Llamando $A = C_1 + C_2$ y $B = (C_1 - C_2)\,i$ queda la forma real.
:::

::: resultado
$$
y = e^{\alpha x}\,\big(A\cos\beta x + B\sen\beta x\big) \qquad\text{(SG)}
$$

$\alpha$ es la **parte real** de la raíz y $\beta$ la **imaginaria** (sin el signo).
:::

::: ejemplo $y'' + 2y' + 2y = 0$ y $y'' + 4y = 0$
- $m^2 + 2m + 2 = 0 \then m = \dfrac{-2 \pm \sqrt{4 - 8}}{2} = -1 \pm i$ ($\alpha = -1$, $\beta = 1$):
  $$y = e^{-x}\,(A\cos x + B\sen x)$$
- $m^2 + 4 = 0 \then m = \pm 2i$ ($\alpha = 0$, $\beta = 2$):
  $$y = A\cos 2x + B\sen 2x$$
:::

```grafico
titulo: Raíces $-\frac{1}{2} \pm 3i$: $y = e^{-x/2}\cos 3x$ oscila entre $\pm e^{-x/2}$ y se amortigua
y = e^(-x/2) cos(3x) ; azul ; gruesa ; "$e^{-x/2}\cos 3x$"
y = e^(-x/2) ; gris ; punteada ; "$\pm e^{-x/2}$"
y = -e^(-x/2) ; gris ; punteada ; ""
x: 0..8
y: -1.2..1.2
```

## Resumen de los tres casos

| Raíces de la EC | Soluciones LI | SG |
|---|---|---|
| reales distintas $r_1 \ne r_2$ | $e^{r_1x}$, $e^{r_2x}$ | $C_1e^{r_1x} + C_2e^{r_2x}$ |
| reales iguales $r$ | $e^{rx}$, $x\,e^{rx}$ | $(C_1 + C_2x)\,e^{rx}$ |
| complejas $\alpha \pm \beta i$ | $e^{\alpha x}\cos\beta x$, $e^{\alpha x}\sen\beta x$ | $e^{\alpha x}(A\cos\beta x + B\sen\beta x)$ |

## Orden $n$ a coeficientes constantes

$$
y^{(n)} + b_1\,y^{(n-1)} + \dots + b_{n-1}\,y' + b_n\,y = 0 \qquad (b_i \text{ constantes})
$$

Vale todo lo del 2.º orden: $n$ soluciones son LI si su wronskiano es distinto de cero (ninguna es combinación lineal de las otras), y en ese caso $y = C_1y_1 + C_2y_2 + \dots + C_ny_n$ es la SG.

::: tip Cálculo de la SG
1. Hallar las $n$ raíces de la EC: $m^n + b_1m^{n-1} + \dots + b_{n-1}m + b_n = 0$.
2. Cada tipo de raíz aporta soluciones:
   - **raíz real simple** $r$: $e^{rx}$;
   - **raíz real de multiplicidad $k$**: $e^{rx};\ x\,e^{rx};\ x^2e^{rx};\ \dots;\ x^{k-1}e^{rx}$;
   - **par complejo** $\alpha \pm \beta i$: $e^{\alpha x}\cos\beta x$ y $e^{\alpha x}\sen\beta x$;
   - **par complejo de multiplicidad $k$**: las dos anteriores multiplicadas por $1;\ x;\ \dots;\ x^{k-1}$ ($2k$ soluciones).

La dificultad está en **hallar las raíces** de la EC (Ruffini, factor común, etc.).
:::

::: ejemplo $y''' - y'' - y' + y = 0$
EC: $m^3 - m^2 - m + 1 = m^2(m - 1) - (m - 1) = (m - 1)(m^2 - 1) = (m - 1)^2(m + 1)$.

Raíces: $1$ doble y $-1$ simple.

$$
y = C_1\,e^{x} + C_2\,x\,e^{x} + C_3\,e^{-x}
$$
:::
