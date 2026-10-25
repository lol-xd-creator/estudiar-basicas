# 1. Definiciones: orden, grado y solución

Las ecuaciones diferenciales surgen de manera natural cuando se quieren resolver problemas físicos, geométricos o de cualquier ciencia.

**Ejemplo.** Queremos encontrar una familia de curvas planas que, en cada punto, tenga una **pendiente igual al triple del cuadrado de la abscisa**:

$$
\frac{\dd y}{\dd x} = 3x^2
$$

Esta es una **ecuación diferencial** (ED), y resolverla implica encontrar $y = f(x)$ (la incógnita de la ecuación) que la satisfaga:

$$
y = f(x) = \int 3x^2\,\dx + C \quad\then\quad y = x^3 + C
$$

```grafico
titulo: La familia $y = x^3 + C$: en cada punto, la pendiente es $3x^2$
y = x^3 - 2 ; gris ; "$C = -2$"
y = x^3 - 1 ; gris ; "$C = -1$"
y = x^3 ; azul ; gruesa ; "$C = 0$"
y = x^3 + 1 ; gris ; "$C = 1$"
y = x^3 + 2 ; gris ; "$C = 2$"
x: -2..2
y: -4..4
```

Entonces, una ED es una **ecuación en la que intervienen derivadas**:

- si las derivadas son **totales**, es una **ecuación diferencial ordinaria**;
- si son **derivadas parciales**, es una **ecuación diferencial en derivadas parciales**.

## Definiciones

::: definicion Ecuación diferencial ordinaria (EDO)
Es toda ecuación que establece una relación entre la variable independiente, la función buscada $y = f(x)$ y sus derivadas:

$$
R\left(x;\ y;\ y';\ y'';\ \dots;\ y^{(n)}\right) = 0
$$
:::

::: definicion Orden y grado
- **Orden** de una EDO: el mayor orden de derivación que interviene en la ecuación con coeficiente distinto de cero.
- **Grado** de una EDO: el mayor exponente con el que aparece la derivada que da el orden. El grado **existe** si la EDO puede escribirse como polinomio respecto de las derivadas.
:::

| Ecuación | Orden | Grado |
|---|---|---|
| $\left(y''\right)^3 - y' = k$ | 2.º | 3.º |
| $y' = \dfrac{y}{\left(1 + y'\right)^2} \;\then\; y'\left(1 + y'\right)^2 = y \;\then\; y' + 2\left(y'\right)^2 + \left(y'\right)^3 = y$ | 1.º | 3.º |
| $e^{y''} + y' = 4$ | 2.º | no tiene |

::: definicion Solución de una EDO
Es toda función $y = f(x)$ que, introducida en la ED con sus operaciones, la transforma en una **identidad**. La solución puede obtenerse en forma **explícita** o **implícita**, según el método de resolución.
:::

## Solución general, constantes esenciales y solución particular

::: ejemplo Ejemplo 1: $y' = 2x$
Integrando:

$$
y = x^2 + C \qquad\text{(solución general)}
$$

- Se llama **solución general** (SG) porque es una **familia de infinitas curvas** solución de la EDO.
- A $C$ se la llama **constante esencial**: sin ella no tendríamos la familia de infinitas curvas.
- Para cada valor de $C$ se obtiene una **solución particular** (SP), que se calcula con una información adicional llamada **condición inicial** (CI).

Si la CI es que la curva pase por el punto $(0;3)$, se reemplaza el punto en la SG:

$$
3 = 0 + C \quad\then\quad C = 3 \quad\then\quad y = x^2 + 3 \qquad\text{(SP para la CI } (x;y) = (0;3)\text{)}
$$

```grafico
titulo: La SG $y = x^2 + C$ y, resaltada, la SP que pasa por $(0;3)$
y = x^2 - 1 ; gris ; ""
y = x^2 ; gris ; ""
y = x^2 + 1 ; gris ; ""
y = x^2 + 2 ; gris ; ""
y = x^2 + 3 ; rojo ; gruesa ; "$y = x^2 + 3$"
y = x^2 + 4 ; gris ; ""
(0, 3) ; "$(0;3)$"
x: -2.5..2.5
y: -1.5..6
```
:::

::: ejemplo Ejemplo 2: $y'' = 3x^2$
Integrando dos veces:

$$
y'' = 3x^2 \quad\then\quad y' = x^3 + C_1 \quad\then\quad y = \frac{x^4}{4} + C_1 x + C_2 \qquad\text{(SG)}
$$

Tiene **dos constantes esenciales**. Para una SP hay que encontrar $C_1$ y $C_2$, así que hacen falta **dos CI**: que la curva pase por dos puntos dados, o los datos de un punto y de la derivada en ese punto.
:::

::: resultado
Una EDO de orden $n$ tiene una solución general con $n$ constantes esenciales.
:::

## Ecuaciones de 1.er orden y 1.er grado

Una EDO de 1.er orden y 1.er grado puede escribirse de las formas

$$
\text{a)}\ \ y' = f(x;y) \qquad\qquad \text{b)}\ \ M(x;y)\,\dx + N(x;y)\,\dy = 0
$$

Hay **cuatro tipos**: [[2. Variables separables]], [[3. Ecuaciones homogéneas]], [[4. Ecuaciones lineales y de Bernoulli]] y [[5. Ecuaciones diferenciales totales o exactas]].

::: aclaracion
El apunte escribe la forma b) como "$M(x;y)\,\dx + N(x;y)\,\dx = 0$"; el segundo diferencial es $\dy$. Pasa lo mismo más adelante, en variables separables y en la definición de ecuación exacta.
:::
