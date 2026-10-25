# 1. Operador nabla

::: definicion Operador nabla o de Hamilton
Es un **pseudo vector** que indica operaciones de derivación:

$$
\nabla = \left(\pd{}{x};\ \pd{}{y};\ \pd{}{z}\right)
$$
:::

Según a qué se aplique y cómo, da tres operaciones distintas.

## Gradiente: aplicado a un campo escalar

Cuando se aplica a un **campo escalar** $w = f(x;y;z)$, se presenta como la multiplicación de un vector por un escalar, pero lo que se calcula es el **gradiente de la función**:

$$
\nabla f(x;y;z) = \left(\pd{}{x};\ \pd{}{y};\ \pd{}{z}\right) f(x;y;z) = \left(\pd{f}{x}(x;y;z);\ \pd{f}{y}(x;y;z);\ \pd{f}{z}(x;y;z)\right)
$$

Ya se vio que el vector $\nabla f$ en un punto indica la **dirección de máxima variación** de la función en el punto, y que su derivada direccional máxima en ese punto es su módulo:

$$
\left[\pd{f}{u}(x;y;z)\right]_{\max} = \big|\nabla f(x;y;z)\big|
$$

## Divergencia: producto escalar con un campo vectorial

Cuando se aplica a un **campo vectorial** $\mathbf F(x;y;z) = \big(F_1;F_2;F_3\big)$ como un producto escalar entre vectores, lo que se calcula es la **divergencia** de $\mathbf F$:

::: resultado Divergencia
$$
\nabla\cdot\mathbf F(x;y;z) = \left(\pd{}{x};\ \pd{}{y};\ \pd{}{z}\right)\cdot\big(F_1;\ F_2;\ F_3\big) = \pd{F_1}{x} + \pd{F_2}{y} + \pd{F_3}{z} = \operatorname{div}\mathbf F(x;y;z)
$$
:::

Es un **escalar** y representa la capacidad del campo vectorial de ser **fuente** o **sumidero** del flujo del campo en el punto donde se evalúa. Es el flujo resultante del campo (o ente físico) **por unidad de volumen** que pasa por el punto:

- si $\nabla\cdot\mathbf F > 0$, el punto es una **fuente**;
- si $\nabla\cdot\mathbf F < 0$, el punto es un **sumidero**;
- si $\nabla\cdot\mathbf F = 0$, el flujo es **pasante**: el punto no genera ni absorbe flujo del campo. Es el caso, por ejemplo, de un fluido incompresible.

```grafico
titulo: Una fuente ($\nabla\cdot\mathbf F > 0$): el campo $\mathbf F = (x;y)$ sale del punto en todas direcciones
campo (x, y)
x: -2..2
y: -2..2
(0, 0) ; "fuente"
```

## Rotor: producto vectorial con un campo vectorial

Cuando el operador nabla se aplica a un campo vectorial en forma de **producto cruz**, lo que se calcula es el **rotor** de $\mathbf F$:

::: resultado Rotor
$$
\operatorname{rot}\mathbf F = \nabla\times\mathbf F = \begin{vmatrix} \mathbf i & \mathbf j & \mathbf k \\[2pt] \pd{}{x} & \pd{}{y} & \pd{}{z} \\[4pt] F_1 & F_2 & F_3 \end{vmatrix} = \left(\pd{F_3}{y} - \pd{F_2}{z};\ \pd{F_1}{z} - \pd{F_3}{x};\ \pd{F_2}{x} - \pd{F_1}{y}\right)
$$
:::

::: aclaracion
El apunte escribe las derivadas parciales con $\delta$ (y la divergencia como $\nabla\mathbf F$, sin punto); uso $\partial$ y $\nabla\cdot\mathbf F$, la notación habitual. Es lo mismo.
:::
