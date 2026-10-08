# 3 · Regiones generales: tipo 1 y tipo 2

*1.ª lectura: 5 min · con lápiz: 12 min*

## La región no es un rectángulo

Si la región $D$ es **acotada**, se la encierra en un rectángulo $R$ y se define una $F$ que vale $f$ en $D$ y $0$ afuera:

$$
F(x;y) = \begin{cases} f(x;y) & \text{si } (x;y) \text{ está en } D \\ 0 & \text{si } (x;y) \text{ está en } R \text{ pero no en } D \end{cases}
$$

Si $F$ es integrable sobre $R$:

$$
\iint_D f(x;y)\,\dx\,\dy = \iint_R F(x;y)\,\dx\,\dy
$$

No importa qué rectángulo se use, siempre que contenga a $D$. Si $f \ge 0$, es el **volumen del sólido** que está arriba de $D$ y debajo de $f$.

Al hacer la integral de adentro, $F$ vale $0$ fuera de $D$: por eso sus límites pasan a ser **las curvas que limitan $D$** (resaltadas abajo).

## Tipo 1: primero $y$

$D = \{(x;y) \,/\, a \le x \le b \wedge g_1(x) \le y \le g_2(x)\}$: para cada $x$, la $y$ va de una curva de abajo a una de arriba.

```grafico
titulo: Tipo 1: para cada $x$, $y$ va de $g_1(x)$ a $g_2(x)$
y = 1.4 + 0.3 sen(1.2x) ; x: 1..5 ; "$y = g_1(x)$"
y = 3.4 + 0.5 cos(1.4x) ; x: 1..5 ; "$y = g_2(x)$"
1.4 + 0.3 sen(1.2x) <= y <= 3.4 + 0.5 cos(1.4x), 1 <= x <= 5 ; "$D$"
segmento (2.6, 0) (2.6, 4.4) ; punteada ; gris
texto (2.6, -0.35) "$x$"
```

::: resultado Tipo 1
$$
\iint_D f(x;y)\,\dx\,\dy = \int_a^b \dx \int_{\hl{g_1(x)}}^{\hl{g_2(x)}} f(x;y)\,\dy
$$
:::

## Tipo 2: primero $x$

$D = \{(x;y) \,/\, c \le y \le d \wedge h_1(y) \le x \le h_2(y)\}$: para cada $y$, la $x$ va de una curva de la izquierda a una de la derecha.

```grafico
titulo: Tipo 2: para cada $y$, $x$ va de $h_1(y)$ a $h_2(y)$
x = 2 + 0.3 sen(1.5y) ; y: 0.5..4.5 ; "$x = h_1(y)$"
x = 4 + 0.4 cos(2y) ; y: 0.5..4.5 ; "$x = h_2(y)$"
2 + 0.3 sen(1.5y) <= x <= 4 + 0.4 cos(2y), 0.5 <= y <= 4.5 ; "$D$"
segmento (0, 2.4) (5, 2.4) ; punteada ; gris
texto (-0.35, 2.4) "$y$"
```

::: resultado Tipo 2
$$
\iint_D f(x;y)\,\dx\,\dy = \int_c^d \dy \int_{\hlb{h_1(y)}}^{\hlb{h_2(y)}} f(x;y)\,\dx
$$
:::

::: aclaracion
Para justificar el tipo 1, el apunte dice "$F(x;y) = 0$ si $y < g_1(x) \wedge y > g_2(x)$". Debe leerse con $\vee$ ("o"): ningún $y$ puede ser a la vez menor que $g_1(x)$ y mayor que $g_2(x)$.
:::

## ¿Qué variable va primero?

Lo que muestran los ejemplos del apunte:

- **Límites constantes** (un rectángulo): cualquier orden está bien.
- **Según el tipo** de la región: tipo 1, primero $y$; tipo 2, primero $x$. Con el otro orden puede haber que **partir $D$** en pedazos y hacer varias integrales (ejemplo de abajo).
- Para **no tener raíces en los límites**: en el ejemplo de volumen de [[4 · Propiedades, área y volumen]] conviene integrar primero $x$ "para poder eliminar la raíz del límite de integración".

## Ejemplo

::: ejemplo Hallar $\displaystyle\iint_D \frac{\dx\,\dy}{x+y}$ siendo $D$ la región encerrada por $y = x$, $x = 1$, $x = 2$ e $y = 0$
Intentalo antes de abrir la solución: **a)** gráfico de $D$, **b)** orden de integración, **c)** cálculo.

::: solucion
**a)**

```grafico
y = x ; x: -0.3..2.5
x = 1 ; gris ; punteada ; ""
x = 2 ; gris ; punteada ; ""
0 <= y <= x, 1 <= x <= 2 ; "$D$"
```

**b)** $D$ es de tipo 1: $D = \{(x;y) \,/\, 1 \le x \le 2 \wedge 0 \le y \le x\}$. Se integra **primero en $y$**. Con primero $x$, habría que partir $D$ en dos y hacer dos integrales (propiedad 3).

**c)**

::: pasos
I_D = \int_1^2 \dx \int_0^x \frac{\dy}{x+y}
    = \int_1^2 \dx \, \eval{\ln(x+y)}{0}{x}          // primitiva respecto de $y$
    = \int_1^2 \big(\ln 2x - \ln x\big)\,\dx
    = \ln 2 \int_1^2 \dx                               // $\ln 2x - \ln x = \ln\frac{2x}{x} = \ln 2$
    = \ln 2 \cdot \eval{x}{1}{2} = \ln 2
:::

::: resultado
$$
\iint_D \frac{\dx\,\dy}{x+y} = \ln 2
$$
:::
:::
:::
