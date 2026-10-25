# Circuitos de corriente continua: ejercicios 10.4 y 10.6

*Clase práctica del 29/09. Guía de trabajos prácticos, capítulo 10. Sigue de [[Circuitos de corriente continua: ejercicios 10.1 a 10.3]].*

::: claves
- Nudo: lo que entra es igual a lo que sale ($\sum I = 0$).
- Dos ramas entre los mismos nudos tienen la **misma** diferencia de potencial.
- Malla: la suma de las fem es igual a la suma de las caídas $I\,R$.
- Fuentes en serie **en oposición**: la fem neta es la resta.
:::

## Ejercicio 10.4

::: ejercicio Calcular la corriente $I_2$, la resistencia $R$ y la fem $E$, sabiendo que $I_1 = 5\,\text{A}$ e $I_3 = 3{,}1\,\text{A}$
```circuito
titulo: $I_1 = 5\,\text{A}$, $I_3 = 3{,}1\,\text{A}$; $E$ y $R$ desconocidas
animar: no
cable (0,4) (0.6,4)
bateria (0.6,4) (1.4,4) ; "$E$"
cable (1.4,4) (1.8,4)
R (1.8,4) (3,4) ; 1
cable (3,4) (3.6,4) (3.6,3.6)
cable (3,3.6) (4.2,3.6)
R (3,3.6) (3,2.6) ; 1 ; izquierda
R (3,2.6) (3,1.4) ; "$R$" ; izquierda
R (4.2,3.6) (4.2,1.4) ; 4 ; derecha
cable (3,1.4) (4.2,1.4)
cable (3.6,1.4) (3.6,0.8) (2.4,0.8)
R (2.4,0.8) (1.2,0.8) ; 3 ; abajo
cable (1.2,0.8) (0,0.8) (0,1.2)
cable (-0.4,1.2) (0.4,1.2)
R (-0.4,1.2) (-0.4,2.4) ; 3 ; izquierda
R (0.4,1.2) (0.4,2.4) ; 6 ; derecha
cable (-0.4,2.4) (0.4,2.4)
cable (0,2.4) (0,2.8)
R (0,2.8) (0,4) ; 2 ; izquierda
nodo (3.6,3.6) ; "A"
nodo (3.6,1.4) ; "B"
corriente (3.6,4) (3.6,3.75) ; "$I_1$" ; derecha
corriente (3.45,3.6) (3.1,3.6) ; "$I_3$" ; abajo
corriente (3.75,3.6) (4.1,3.6) ; "$I_2$" ; abajo
```

Intentalo antes de abrir la solución: empezá por el nudo $A$, después la tensión entre $A$ y $B$, y al final la malla.

::: solucion
**Qué tengo y qué no:** todas las resistencias menos $R$, e $I_1$, $I_3$. Faltan $I_2$, $R$ y $E$.

**Nudo $A$:** entra $I_1$ y salen $I_2$ e $I_3$.

$$
I_1 - I_2 - I_3 = 0 \then I_2 = 5\,\text{A} - 3{,}1\,\text{A} = 1{,}9\,\text{A}
$$

**Tensión entre $A$ y $B$**, con la rama de $4\,\Omega$ (donde se conoce todo):

$$
V_{AB} = I_2\cdot 4\,\Omega = 1{,}9\,\text{A}\cdot 4\,\Omega = 7{,}6\,\text{V}
$$

**Resistencia $R$.** La otra rama tiene la misma $V_{AB}$, con $1\,\Omega$ y $R$ en serie:

::: pasos
V_{AB} = I_3\,(1\,\Omega + R)
1\,\Omega + R = \frac{7{,}6\,\text{V}}{3{,}1\,\text{A}} \approx 2{,}45\,\Omega
R \approx 1{,}45\,\Omega
:::

**Fem**, con la malla exterior. Por todo lo que no está entre $A$ y $B$ pasa $I_1$. El paralelo de $3$ y $6\,\Omega$ es $\frac{3\cdot 6}{3 + 6} = 2\,\Omega$:

::: pasos
E = I_1\,(1 + 3 + 2 + 2)\,\Omega + V_{AB}       // $R_1$, $R_4$, el paralelo y $R_7$
= 5\,\text{A}\cdot 8\,\Omega + 7{,}6\,\text{V}
= 47{,}6\,\text{V}
:::

::: resultado
$$
I_2 = 1{,}9\ \text{A} \qquad\qquad R \approx 1{,}45\ \Omega \qquad\qquad E = 47{,}6\ \text{V}
$$
:::
:::
:::

## Ejercicio 10.6

::: ejercicio Resolver el circuito: calcular la resistencia total $R_T$ y las corrientes de cada rama
```circuito
titulo: Dos fuentes en oposición: $E_1 = 15\,\text{V}$ y $E_2 = 48\,\text{V}$
bateria (0,2.4) (0,3.2) ; 15 ; izquierda
cable (0,3.2) (0,4) (0.8,4)
R (0.8,4) (2,4) ; 5
R (2,4) (3.2,4) ; 4
cable (3.2,4) (4,4)
R (4,4) (4,2.6) ; 4 ; izquierda
R (4,4) (5.2,4) ; 3
R (5.2,4) (5.2,2.6) ; 9 ; derecha
cable (5.2,2.6) (4,2.6)
R (4,2.6) (4,1.2) ; 1 ; derecha
cable (4,1.2) (4,0) (3,0)
bateria (2,0) (3,0) ; 48 ; abajo
cable (2,0) (0,0) (0,0.4)
R (0,0.4) (0,1.8) ; 2 ; izquierda
cable (0,1.8) (0,2.4)
tierra (1,0)
```

Respuestas de la guía para controlar: $R_T = 15\,\Omega$, $I_{R1} = 2{,}2\,\text{A}$, $I_{R4} = 1{,}65\,\text{A}$, $I_{R5} = 0{,}55\,\text{A}$.

::: solucion
**Qué tengo y qué no:** las dos fem y todas las resistencias; faltan las corrientes. Es una sola malla, salvo un paralelo: se puede reducir.

**Resistencia total.** $R_5$ y $R_6$ están en serie ($3 + 9 = 12\,\Omega$), y esa rama en paralelo con $R_4$:

::: pasos
R_{\parallel} = \frac{4\cdot 12}{4 + 12} = 3\,\Omega
R_T = R_1 + R_2 + R_3 + R_{\parallel} + R_7 = 2 + 5 + 4 + 3 + 1 = 15\,\Omega
:::

**Corriente principal.** Las fuentes están **en oposición** (la de $48\,\text{V}$ empuja en un sentido y la de $15\,\text{V}$ en el contrario):

$$
I = \frac{48\,\text{V} - 15\,\text{V}}{15\,\Omega} = \frac{33\,\text{V}}{15\,\Omega} = 2{,}2\,\text{A}
$$

Es la que pasa por $R_1$, $R_2$, $R_3$, $R_7$ y las dos fuentes.

**Corrientes en el paralelo**, con su tensión $V_{\parallel} = 2{,}2\,\text{A}\cdot 3\,\Omega = 6{,}6\,\text{V}$:

::: pasos
I_{R4} = \frac{6{,}6\,\text{V}}{4\,\Omega} = 1{,}65\,\text{A}
I_{R5} = I_{R6} = \frac{6{,}6\,\text{V}}{12\,\Omega} = 0{,}55\,\text{A}       // control: $1{,}65 + 0{,}55 = 2{,}2\,\text{A}$
:::

::: resultado
$$
R_T = 15\ \Omega \qquad I = I_{R1} = 2{,}2\ \text{A} \qquad I_{R4} = 1{,}65\ \text{A} \qquad I_{R5} = I_{R6} = 0{,}55\ \text{A}
$$
:::

La corriente circula en el sentido que impone la fuente de $48\,\text{V}$: atraviesa la de $15\,\text{V}$ de $+$ a $-$, o sea que esa batería **se está cargando**. El botón **I** del circuito muestra todas las corrientes.
:::
:::
