# Potencial y campo: ejercicios 7.14 y 7.16

*Clase práctica del 30/06. Guía de trabajos prácticos, capítulo 7.*

Fórmulas que se usan (ver [[Potencial eléctrico y diferencia de potencial]]):

$$
\vec E = -\nabla V = -\left(\pd{V}{x};\ \pd{V}{y};\ \pd{V}{z}\right) \qquad\qquad V = k_0\,\frac{q}{r} \qquad\qquad E = k_0\,\frac{q}{r^2}
$$

## Ejercicio 7.14

::: ejercicio El potencial eléctrico en una región del espacio es $V = 3x^2y - 4xy - 5xy^2$. Hallar el potencial y el campo eléctrico en el punto $(1;\,0{,}2)\,\text{m}$
Intentalo antes de abrir la solución: **a)** reemplazar en $V$, **b)** derivar para el campo.

::: solucion
**a) Potencial:** se reemplaza $x = 1$, $y = 0{,}2$:

::: pasos
V = 3(1)^2(0{,}2) - 4(1)(0{,}2) - 5(1)(0{,}2)^2
  = 0{,}6 - 0{,}8 - 0{,}2
  = -0{,}4\ \text{V}
:::

**b) Campo:** $\vec E = -\nabla V$. Primero las derivadas parciales:

$$
\pd{V}{x} = 6xy - 4y - 5y^2 \qquad\qquad \pd{V}{y} = 3x^2 - 4x - 10xy
$$

En el punto $(1;\,0{,}2)$:

::: pasos
E_x = -\pd{V}{x} = -\big(6(1)(0{,}2) - 4(0{,}2) - 5(0{,}2)^2\big)
    = -(1{,}2 - 0{,}8 - 0{,}2)
    = -0{,}2\ \frac{\text{V}}{\text{m}}
:::

::: pasos
E_y = -\pd{V}{y} = -\big(3(1)^2 - 4(1) - 10(1)(0{,}2)\big)
    = -(3 - 4 - 2)
    = 3\ \frac{\text{V}}{\text{m}}
:::

::: resultado
$$
V = -0{,}4\ \text{V} \qquad\qquad \vec E = \left(-0{,}2\,\hat\imath + 3\,\hat\jmath\right)\ \frac{\text{V}}{\text{m}} \qquad |\vec E| \approx 3{,}0\ \frac{\text{V}}{\text{m}}
$$
:::

```grafico
titulo: El campo $\vec E = -\nabla V$ y el punto $(1;\,0{,}2)$
campo (-(6 x y - 4 y - 5 y^2), -(3 x^2 - 4 x - 10 x y))
(1, 0.2) ; "$(1;\,0{,}2)$"
vector (1, 0.2) (0.93, 1.2) ; rojo ; "$\vec E$"
x: -0.5..2.5
y: -1..1.5
lineas: 8
```

::: aclaracion
En la guía, $E_y$ aparece como $3x^2 - 4x - 10x$: falta la $y$ del último término ($-10xy$). Con $y = 0{,}2$ da $-2$ y el resultado es el mismo. Además la guía escribe $E_x = \pd{V}{x}$ y pone el signo menos recién al final; acá va desde el principio.
:::
:::
:::

## Ejercicio 7.16

::: ejercicio A una distancia $r$ de una carga puntual $q$, el potencial es $V = 400\,\text{V}$ y el campo es $E = 150\,\text{N/C}$. Hallar $r$ y $q$
Pista: tenés dos ecuaciones ($V$ y $E$ de una carga puntual) y dos incógnitas.

::: solucion
**a) La distancia.** Dividiendo $V$ por $E$ se simplifican $k_0$ y $q$:

::: pasos
\frac{V}{E} = \frac{k_0\,q/r}{k_0\,q/r^2} = r
r = \frac{400\,\text{V}}{150\,\text{N/C}}
r \approx 2{,}67\ \text{m}
:::

**b) La carga**, despejando de $V = k_0\frac{q}{r}$:

::: pasos
q = \frac{V\,r}{k_0}
  = \frac{400\,\text{V}\cdot 2{,}67\,\text{m}}{9\times10^9\,\frac{\text{N}\,\text{m}^2}{\text{C}^2}}
  \approx 1{,}19\times10^{-7}\ \text{C} = 119\ \text{nC}
:::

::: resultado
$$
r \approx 2{,}67\ \text{m} \qquad\qquad q \approx 119\ \text{nC}
$$
:::

En la clase se resolvió con $V = E\cdot d$ (que da la misma $r$) y $E = k_0\frac{q}{r^2}$: $1{,}18\times10^{-7}\,\text{C}$; la diferencia con $1{,}19$ es de redondeo ($r = 2{,}66$ en vez de $2{,}67$).
:::
:::
