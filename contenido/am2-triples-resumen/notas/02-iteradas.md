# 2 · Cómo se calcula: integrales iteradas

*1.ª lectura: 5 min · con lápiz: 12 min*

Al igual que las dobles, las integrales triples se resuelven con **integrales sucesivas o iteradas**.

::: resultado Integrales iteradas en un paralelepípedo
$$
\iiint_B f(x;y;z)\,\dx\,\dy\,\dz = \int_a^b \left[\int_c^d \left(\int_p^q f(x;y;z)\,\dz\right)\dy\right]\dx = \int_a^b \dx \int_c^d \dy \int_p^q f(x;y;z)\,\dz
$$
:::

**Cómo se lee**, de la derecha hacia afuera:

::: pasos
// 1.º respecto de $z$, con $x$ e $y$ constantes
\int_p^q f(x;y;z)\,\dz          // queda una integral doble en $R = [a;b]\times[c;d]$
// 2.º respecto de $y$, con $x$ constante
\int_c^d \dy \int_p^q f\,\dz     // queda una función de $x$
// 3.º respecto de $x$, sobre $[a;b]$
\int_a^b \dx \int_c^d \dy \int_p^q f\,\dz
:::

::: claves
- Hay **seis órdenes** de integración posibles ($3! = 6$). Si se puede integrar en otro orden, **el resultado es el mismo**.
- Se elige el orden que corresponda con **el cálculo más sencillo**.
:::

## Ejemplo

::: ejemplo Calcular $\displaystyle\iiint_B xy^2z^3\,\dx\,\dy\,\dz$, donde $B$ es el recinto limitado por $x = 1$, $y = 2$, $z = 3$ y los planos coordenados
Intentalo antes de abrir la solución: **a)** gráfico, **b)** límites de cada variable, **c)** cálculo.

::: solucion
**a)** $B$ es la caja $[0;1]\times[0;2]\times[0;3]$:

```grafico3d
titulo: $B = [0;1]\times[0;2]\times[0;3]$
0 <= z <= 3, 0 <= x <= 1, 0 <= y <= 2
```

**b)** Con límites constantes, cualquier orden sirve; además el integrando es un producto, así que cada integral se hace por separado.

**c)**

::: pasos
I_B = \int_0^1 x\,\dx \int_0^2 y^2\,\dy \int_0^3 z^3\,\dz
    = \eval{\frac{x^2}{2}}{0}{1}\cdot\eval{\frac{y^3}{3}}{0}{2}\cdot\eval{\frac{z^4}{4}}{0}{3}    // cada factor depende de una sola variable
    = \frac{1}{2}\cdot\frac{8}{3}\cdot\frac{81}{4} = 27
:::

::: resultado
$$
\iiint_B xy^2z^3\,\dx\,\dy\,\dz = 27
$$
:::
:::
:::
