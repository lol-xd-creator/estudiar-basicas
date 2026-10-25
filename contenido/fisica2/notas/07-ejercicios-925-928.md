# Ejercicios 9.25, 9.26 y 9.28

*Clase práctica del 25/08. Guía de trabajos prácticos, capítulo 9.*

::: claves
Dos resistencias en paralelo:

$$
\frac{R_1\cdot R_2}{R_1 + R_2} = \frac{1}{\frac{1}{R_1} + \frac{1}{R_2}}
$$
:::

## 9.26

::: ejercicio Se aplican $50\,\text{V}$ al circuito. Calcular la intensidad de corriente en cada resistencia
```circuito
titulo: $50\,\text{V}$ con $4\,\Omega$, el paralelo de $7\,\Omega$ y $10\,\Omega$, y $9\,\Omega$
bateria (0,0) (0,2.5) ; 50 ; izquierda
cable (0,2.5) (0.6,2.5)
R (0.6,2.5) (1.8,2.5) ; 4
cable (1.8,2.5) (2.4,2.5)
cable (2.4,2.5) (2.4,3.3)
R (2.4,3.3) (4.6,3.3) ; 7
cable (4.6,3.3) (4.6,2.5)
cable (2.4,2.5) (2.4,1.7)
R (2.4,1.7) (4.6,1.7) ; 10 ; abajo
cable (4.6,1.7) (4.6,2.5)
cable (4.6,2.5) (5.2,2.5)
R (5.2,2.5) (6.4,2.5) ; 9
cable (6.4,2.5) (7,2.5) (7,0) (0,0)
tierra (0,0)
corriente (7,1.6) (7,0.9) ; "$I$"
corriente (2.4,2.75) (2.4,3.15) ; "$I_1$" ; derecha
corriente (2.4,2.25) (2.4,1.85) ; "$I_2$" ; derecha
```

Respuestas de la guía para controlar: $I = 2{,}92\,\text{A}$ (por $4$ y $9\,\Omega$), $I_1 = 1{,}71\,\text{A}$, $I_2 = 1{,}2\,\text{A}$.

::: solucion
El paralelo de $7\,\Omega$ y $10\,\Omega$ queda en $\frac{7\cdot 10}{7 + 10} = 4{,}11\,\Omega$, en serie con los otros dos: $R_{eq} = 4 + 4{,}11 + 9 = 17{,}11\,\Omega$.

```circuito
titulo: Reducido: tres resistencias en serie
bateria (0,0) (0,2) ; 50 ; izquierda
R (0,2) (1.6,2) ; 4
R (1.6,2) (3.2,2) ; 4.11
R (3.2,2) (4.8,2) ; 9
cable (4.8,2) (4.8,0) (0,0)
```

::: pasos
I = \frac{V}{R} = \frac{50\,\text{V}}{17{,}11\,\Omega} = 2{,}92\,\text{A}      // ley de Ohm con la equivalente
:::

Caídas de tensión, con la misma $I$ en las tres partes en serie (suman los $50\,\text{V}$):

::: pasos
V_1 = 2{,}92\,\text{A}\cdot 4\,\Omega = 11{,}7\,\text{V}                                   // en $4\,\Omega$
V_2 = 2{,}92\,\text{A}\cdot 4{,}11\,\Omega = 12\,\text{V}   // en el paralelo
V_3 = 2{,}92\,\text{A}\cdot 9\,\Omega = 26{,}3\,\text{V}                                   // en $9\,\Omega$
:::

Corrientes en el paralelo, cada una con los $12\,\text{V}$:

::: pasos
I_1 = \frac{12\,\text{V}}{7\,\Omega} \approx 1{,}71\,\text{A}
I_2 = \frac{12\,\text{V}}{10\,\Omega} = 1{,}2\,\text{A}       // control: $1{,}71 + 1{,}2 = 2{,}91 \approx 2{,}92\,\text{A}$
:::

::: resultado
$$
I_4 = I_9 = 2{,}92\ \text{A} \qquad\qquad I_7 \approx 1{,}71\ \text{A} \qquad\qquad I_{10} = 1{,}2\ \text{A}
$$
:::

::: aclaracion
En la hoja las dos cuentas de $I_1$ e $I_2$ quedaron sin terminar. La diferencia de $0{,}01\,\text{A}$ con $I$ es por redondeo. El botón **I** del circuito muestra $I_1 = 1{,}72\,\text{A}$ porque usa la tensión sin redondear, $V_2 = 12{,}03\,\text{V}$.
:::
:::
:::

## 9.25

::: ejercicio Entre $a$ y $b$ hay $75\,\Omega$. ¿Cuánto vale $R$?
```circuito
titulo: La resistencia entre $a$ y $b$ es de $75\,\Omega$
R (0,2) (1.6,2) ; "$R$"
cable (1.6,2) (5.4,2)
R (2.6,2) (2.6,0) ; 120
R (4,2) (4,0) ; 40
R (5.4,2) (5.4,1) ; "$R$"
R (5.4,1) (5.4,0) ; 5
cable (5.4,0) (0,0)
nodo (0,2) ; "a"
nodo (0,0) ; "b"
etiqueta (0.85,1) "$75\,\Omega$"
```

::: solucion
::: pasos
// $120\,\Omega$ y $40\,\Omega$ en paralelo:
\frac{1}{\frac{1}{120} + \frac{1}{40}} = 30\,\Omega
// $30\,\Omega$ en paralelo con la rama $R + 5$, y todo eso en serie con $R$:
R + \frac{1}{\frac{1}{30} + \frac{1}{R + 5}} = 75\,\Omega
// Con el paralelo de dos, $\frac{R_1 R_2}{R_1 + R_2}$:
R + \frac{30\,(R + 5)}{R + 35} = 75
:::

Queda una ecuación cuadrática en $R$:

::: pasos
// Multiplicando por $R + 35$ y ordenando:
R\,(R + 35) + 30\,(R + 5) = 75\,(R + 35)
R^2 - 10\,R - 2475 = 0
// Con la resolvente ($\sqrt{100 + 9900} = 100$), da $55$ o $-45$:
R = \frac{10 \pm 100}{2}
:::

La negativa no tiene sentido físico:

::: resultado
$$
R = 55\,\Omega
$$
:::

Verificación: con $R = 55\,\Omega$, la rama de la derecha es de $60\,\Omega$; $30\,\Omega$ en paralelo con $60\,\Omega$ dan $20\,\Omega$, y $55 + 20 = 75\,\Omega$.
:::
:::

## 9.28

::: aclaracion
En la clase se llamó **9.28**, pero en la guía es el **9.27** (el 9.28 de la guía pide la diferencia de potencial en dos tramos con tierra). Respuesta de la guía: $1{,}87\,\text{V}$.
:::

::: ejercicio Por el tramo de circuito circulan $I = 320\,\text{mA}$. ¿Cuánto vale $\Delta V_{ab}$?
```circuito
titulo: $I = 320\,\text{mA}$ de $a$ a $b$
nodo (0,1) ; "a"
cable (0,1) (0.8,1)
R (0.8,1) (2,1) ; 2
cable (2,1) (2,1.7)
R (2,1.7) (4,1.7) ; 3
cable (4,1.7) (4,1)
cable (2,1) (2,0.3)
R (2,0.3) (4,0.3) ; 6
cable (4,0.3) (4,1)
R (4,1) (5.2,1) ; 1
cable (5.2,1) (5.2,1.9)
R (5.2,1.9) (7.2,1.9) ; 3
cable (7.2,1.9) (7.2,1)
R (5.2,1) (7.2,1) ; 2
cable (5.2,1) (5.2,0.1)
R (5.2,0.1) (7.2,0.1) ; 3
cable (7.2,0.1) (7.2,1)
cable (7.2,1) (8,1)
nodo (8,1) ; "b"
corriente (0.15,1) (0.65,1) ; "$I$"
corriente (7.35,1) (7.85,1) ; "$I$"
```

::: solucion
**Resistencia equivalente** del tramo (en la hoja está solo el $5{,}85\,\Omega$):

::: pasos
// $3$ y $6\,\Omega$ en paralelo:
\frac{3\cdot 6}{3 + 6} = 2\,\Omega
// $3$, $2$ y $3\,\Omega$ en paralelo:
\frac{1}{\frac{1}{3} + \frac{1}{2} + \frac{1}{3}} \approx 0{,}857\,\Omega
// Todo en serie:
R_{eq} = 2 + 2 + 1 + 0{,}857 = 5{,}857\,\Omega
:::

**Diferencia de potencial**, con la ley de Ohm:

::: pasos
I = 320\,\text{mA} = 320\cdot 10^{-3}\,\text{A}
\Delta V_{ab} = I\cdot R_{eq} = 0{,}32\,\text{A}\cdot 5{,}857\,\Omega
:::

::: resultado
$$
\Delta V_{ab} \approx 1{,}87\ \text{V}
$$
:::
:::
:::
