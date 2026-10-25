# Circuitos de corriente continua: ejercicios 10.1 a 10.3

*Clase práctica del 15/09. Guía de trabajos prácticos, capítulo 10. En la hoja quedaron solo los números de los ejercicios y una consigna: **plantear las ecuaciones para ver qué tengo y qué no tengo**. Las resoluciones son de la guía (revisadas). La teoría está en [[Conexión de resistores y leyes de Kirchhoff]].*

::: claves
- Antes de calcular: anotar los datos, las incógnitas y qué ecuaciones sirven (Ohm, serie, paralelo, nudos, mallas).
- Serie: $R_{eq} = R_1 + R_2$, misma $I$. Paralelo: $\frac{1}{R_{eq}} = \frac{1}{R_1} + \frac{1}{R_2}$, misma $\Delta V$; con dos, $R_{eq} = \frac{R_1 R_2}{R_1 + R_2}$.
- Si hay una sola fuente (o fuentes en serie), se reduce todo a una $R_{eq}$ y se vuelve para atrás. Si no se puede reducir, Kirchhoff.
:::

## Ejercicio 10.1

::: ejercicio Encontrar la resistencia equivalente y las corrientes $I_1$ (la de la batería) e $I_2$ (la de la rama de $2\,\Omega$)
```circuito
titulo: Circuito reacomodado (como en la guía, fig. 10.1b)
bateria (4,0) (4,2) ; 36 ; derecha
cable (4,2) (4,2.6)
cable (4,2.6) (3.4,2.6)
cable (3.4,2.2) (3.4,3)
R (1.8,3) (3.4,3) ; 6
R (1.8,2.2) (3.4,2.2) ; 12 ; abajo
cable (1.8,2.2) (1.8,3)
cable (1.8,2.6) (1.4,2.6)
R (0.2,2.6) (1.4,2.6) ; 2
cable (0.2,2.6) (0,2.6) (0,0) (4,0)
cable (4,2.6) (4.6,2.6)
R (4.6,2.6) (5.8,2.6) ; 3
cable (5.8,2.6) (7.2,2.6)
R (6.2,2.6) (6.2,0) ; 9 ; izquierda
R (7.2,2.6) (7.2,0) ; 18 ; derecha
cable (7.2,0) (4,0)
corriente (4,2.1) (4,2.5) ; "$I_1$" ; izquierda
corriente (0,2) (0,1.4) ; "$I_2$" ; izquierda
```

Intentalo antes de abrir la solución: fijate qué está en paralelo con qué. La batería alimenta dos ramas, la de la izquierda y la de la derecha.

::: solucion
**Qué tengo y qué no:** la fem ($36\,\text{V}$) y todas las resistencias; faltan $R_{eq}$, $I_1$ e $I_2$. Las dos ramas están en paralelo con la batería, así que cada una tiene los $36\,\text{V}$.

::: pasos
// Rama izquierda: $2\,\Omega$ en serie con el paralelo de $6$ y $12\,\Omega$:
R_{izq} = 2 + \frac{6\cdot 12}{6 + 12} = 2 + 4 = 6\,\Omega
// Rama derecha: $3\,\Omega$ en serie con el paralelo de $9$ y $18\,\Omega$:
R_{der} = 3 + \frac{9\cdot 18}{9 + 18} = 3 + 6 = 9\,\Omega
// Las dos ramas en paralelo:
R_{eq} = \frac{6\cdot 9}{6 + 9} = 3{,}6\,\Omega
:::

**Corrientes**, con la ley de Ohm:

::: pasos
I_1 = \frac{36\,\text{V}}{3{,}6\,\Omega} = 10\,\text{A}       // la que sale de la batería
I_2 = \frac{36\,\text{V}}{6\,\Omega} = 6\,\text{A}       // la rama izquierda tiene los $36\,\text{V}$
:::

::: resultado
$$
R_{eq} = 3{,}6\ \Omega \qquad\qquad I_1 = 10\ \text{A} \qquad\qquad I_2 = 6\ \text{A}
$$
:::

Control: por la rama derecha pasan $\frac{36}{9} = 4\,\text{A}$, y $6 + 4 = 10\,\text{A} = I_1$. El botón **I** del circuito muestra todas las corrientes.
:::
:::

## Ejercicio 10.2

::: ejercicio Calcular las corrientes en cada una de las ramas del circuito
```circuito
titulo: Dos fuentes en oposición: $36\,\text{V}$ y $12\,\text{V}$
bateria (0,1.8) (0,2.6) ; 36 ; izquierda
bateria (0,1.4) (0,0.6) ; 12 ; izquierda
cable (0,2.6) (0,3)
R (0,3) (0,4) ; 2 ; izquierda
cable (0,1.4) (0,1.8)
cable (0,0.6) (0,0) (3,0)
cable (0,4) (0.6,4)
R (0.6,4) (2,4) ; 4
cable (2,4) (3,4) (3,3.6)
cable (2.5,3.6) (4.6,3.6)
R (2.5,3.6) (2.5,2.4) ; 3 ; izquierda
R (3.5,3.6) (3.5,2.4) ; 6 ; derecha
cable (2.5,2.4) (3.5,2.4)
cable (3,2.4) (3,2)
R (3,2) (3,0.8) ; 1 ; derecha
cable (3,0.8) (3,0)
R (4.6,3.6) (4.6,0) ; 6 ; derecha
cable (4.6,0) (3,0)
nodo (3,3.6) ; "A"
nodo (3,0) ; "B"
corriente (1.4,0) (0.4,0) ; "$I_1$" ; abajo
```

En la guía: $I_1$ es la corriente de las fuentes, $I_4$ la de la rama de $1\,\Omega$, $I_5$ la de la de $6\,\Omega$, e $I_2$, $I_3$ las de $3\,\Omega$ y $6\,\Omega$ del paralelo de arriba.

::: solucion
**Qué tengo y qué no:** las dos fem y todas las resistencias; faltan $5$ corrientes. Las fuentes están en serie y **en oposición**: la fem neta es $36 - 12 = 24\,\text{V}$. Con una sola fem neta, se puede reducir todo.

::: pasos
// Paralelo de $3$ y $6\,\Omega$, en serie con $1\,\Omega$:
R_{T1} = \frac{3\cdot 6}{3 + 6} + 1 = 2 + 1 = 3\,\Omega
// $R_{T1}$ en paralelo con $6\,\Omega$ (entre $A$ y $B$), en serie con $2$ y $4\,\Omega$:
R_T = \frac{3\cdot 6}{3 + 6} + 2 + 4 = 2 + 6 = 8\,\Omega
:::

**Volviendo para atrás:**

::: pasos
I_1 = \frac{36\,\text{V} - 12\,\text{V}}{8\,\Omega} = 3\,\text{A}       // fuentes en oposición: se restan
V_{AB} = I_1\cdot 2\,\Omega = 6\,\text{V}       // $2\,\Omega$ es el paralelo entre $A$ y $B$
I_4 = \frac{6\,\text{V}}{3\,\Omega} = 2\,\text{A} \qquad I_5 = \frac{6\,\text{V}}{6\,\Omega} = 1\,\text{A}       // las dos ramas entre $A$ y $B$
// En el paralelo de $3$ y $6\,\Omega$ (de $2\,\Omega$) cae $2\,\text{A}\cdot 2\,\Omega = 4\,\text{V}$:
I_2 = \frac{4\,\text{V}}{3\,\Omega} = \frac{4}{3}\,\text{A} \qquad I_3 = \frac{4\,\text{V}}{6\,\Omega} = \frac{2}{3}\,\text{A}
:::

::: resultado
$$
I_1 = 3\ \text{A} \qquad I_4 = 2\ \text{A} \qquad I_5 = 1\ \text{A} \qquad I_2 = \tfrac{4}{3}\ \text{A} \approx 1{,}33\ \text{A} \qquad I_3 = \tfrac{2}{3}\ \text{A} \approx 0{,}67\ \text{A}
$$
:::

Control en los nudos: $I_4 + I_5 = 3\,\text{A} = I_1$ e $I_2 + I_3 = 2\,\text{A} = I_4$.
:::
:::

## Ejercicio 10.3

::: ejercicio El amperímetro $A_1$ marca $2\,\text{A}$. Calcular el valor de $V_2$ y las lecturas del amperímetro $A_2$ y del voltímetro $V_m$
```circuito
titulo: $A_1 = 2\,\text{A}$; $V_2$ desconocida
animar: no
cable (1.2,2.6) (-0.7,2.6)
voltimetro (-0.7,2.6) (-0.7,0) ; "$V_m$" ; izquierda
cable (-0.7,0) (1.2,0)
bateria (1.2,1.1) (1.2,1.9) ; 50 ; izquierda
cable (1.2,1.9) (1.2,2.6)
cable (1.2,1.1) (1.2,0.95)
R (1.2,0.95) (1.2,0.15) ; 3 ; derecha
cable (1.2,0.15) (1.2,0)
cable (1.2,2.6) (1.2,3.2)
R (1.2,3.2) (2.4,3.2) ; 3
amperimetro (2.4,3.2) (3.2,3.2) ; "$A_1$"
cable (3.2,3.2) (3.6,3.2) (3.6,2.6)
R (1.2,2.6) (3.6,2.6) ; 6 ; abajo
R (3.6,2.6) (4.8,2.6) ; 5
cable (4.8,2.6) (5.2,2.6)
bateria (5.2,2.6) (6,2.6) ; "$V_2$"
cable (6,2.6) (6.6,2.6) (6.6,2.2)
R (6.6,2.2) (6.6,0.6) ; 2 ; derecha
cable (6.6,0.6) (6.6,0)
amperimetro (6.6,0) (5.6,0) ; "$A_2$" ; abajo
R (5.6,0) (4.4,0) ; 1 ; abajo
bateria (3.4,0) (4.4,0) ; 28 ; abajo
cable (3.4,0) (3.2,0)
R (3.2,0) (2,0) ; 2 ; abajo
cable (2,0) (1.2,0)
nodo (1.2,2.6) ; "B"
nodo (1.2,0) ; "A"
nodo (3.6,2.6) ; "C"
```

::: solucion
**Qué tengo y qué no:** $V_1 = 50\,\text{V}$, $V_3 = 28\,\text{V}$, todas las resistencias y la corriente por $A_1$ ($2\,\text{A}$, por la de $3\,\Omega$ del paralelo). Faltan $V_2$, la corriente del circuito (la que marca $A_2$) y $V_m$. Todo es una sola malla, salvo el paralelo entre $B$ y $C$.

**Corriente del circuito.** En el paralelo, la de $3\,\Omega$ lleva $2\,\text{A}$:

::: pasos
V_{\parallel} = 2\,\text{A}\cdot 3\,\Omega = 6\,\text{V}       // la misma tensión en las dos ramas
I_{R3} = \frac{6\,\text{V}}{6\,\Omega} = 1\,\text{A}
I = 2\,\text{A} + 1\,\text{A} = 3\,\text{A}       // nudo $C$: es lo que marca $A_2$
:::

**$V_2$**, con la malla (sentido horario, desde $V_1$). Las caídas en las resistencias en serie suman $I\,(5 + 2 + 1 + 2 + 3) = 3\cdot 13 = 39\,\text{V}$:

$$
\begin{gathered}
V_1 - V_{\parallel} - I\,R_4 + V_2 \\
- I\,(R_5 + R_6) - V_3 - I\,(R_7 + R_1) = 0
\end{gathered}
$$

::: pasos
50 - 6 - 15 + V_2 - 9 - 28 - 15 = 0
V_2 = 23\,\text{V}
:::

**$V_m$**: el voltímetro mide entre $A$ y $B$, en paralelo con $V_1$ y $R_1$. Subiendo de $A$ a $B$ por esa rama:

$$
V_m = V_B - V_A = V_1 - I\cdot R_1 = 50\,\text{V} - 3\,\text{A}\cdot 3\,\Omega = 41\,\text{V}
$$

::: resultado
$$
A_2 = 3\ \text{A} \qquad\qquad V_2 = 23\ \text{V} \qquad\qquad V_m = 41\ \text{V}
$$
:::

::: aclaracion
La guía da $V_2 = 10\,\text{V}$ y $V_m = 44\,\text{V}$, pero llega a esos números poniendo $2\,\text{A}$ (lo que marca $A_1$) en las resistencias en serie, cuando la corriente de la malla es $3\,\text{A}$: la misma guía calcula antes $I_2 = 3\,\text{A}$ en el nudo $C$. Con $3\,\text{A}$ queda $V_2 = 23\,\text{V}$ y $V_m = 41\,\text{V}$. **Control** por el otro camino, de $A$ a $B$ pasando por la derecha (contra la corriente): $+6 + 28 + 3 + 6 - 23 + 15 + 6 = 41\,\text{V}$. En el práctico del 06/10 se corrigió este ejercicio en clase y también dio $V_2 = 23\,\text{V}$ ([[Kirchhoff: dos circuitos de práctica para el parcial]]).
:::
:::
:::
