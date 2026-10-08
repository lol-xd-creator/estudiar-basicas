# Ejercicios 9.25, 9.26 y 9.28

## 9.26

Dos resistencias en paralelo:

$$
\frac{R_1\cdot R_2}{R_1 + R_2} = \frac{1}{\frac{1}{R_1} + \frac{1}{R_2}}
$$

::: ejercicio Calcular la intensidad de corriente en cada resistencia
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

El paralelo de $7\,\Omega$ y $10\,\Omega$ queda en $4{,}11\,\Omega$, en serie con los otros dos: $R_{eq} = 4 + 4{,}11 + 9 = 17{,}11\,\Omega$.

::: pasos
I = \frac{V}{R} = \frac{50\,\text{V}}{17{,}11\,\Omega} = 2{,}92\,\text{A}      // ley de Ohm con la equivalente
:::

Caídas de tensión, con la misma $I$ en las tres partes en serie (suman los $50\,\text{V}$):

::: pasos
V_1 = 11{,}7\,\text{V}                                   // en $4\,\Omega$
V_2 = I\cdot R = 2{,}92\,\text{A}\cdot 4{,}11\,\Omega = 12\,\text{V}   // en el paralelo
V_3 = 26{,}3\,\text{V}                                   // en $9\,\Omega$
:::

Corrientes en el paralelo, con sus $12\,\text{V}$:

$$
I_1 = \frac{V}{R} = \frac{12\,\text{V}}{7\,\Omega} \qquad\qquad I_2 = \frac{V}{R} = \frac{12\,\text{V}}{10\,\Omega}
$$

::: aclaracion
En la hoja las dos cuentas quedaron sin terminar: $I_1 \approx 1{,}71\,\text{A}$ e $I_2 = 1{,}2\,\text{A}$. Suman $2{,}91\,\text{A} \approx I$ (la diferencia es por redondeo). El botón **I** del circuito muestra $I_1 = 1{,}72\,\text{A}$ porque usa la tensión sin redondear, $V_2 = 12{,}03\,\text{V}$.
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

::: pasos
\frac{1}{\frac{1}{120} + \frac{1}{40}} = 30\,\Omega                         // $120\,\Omega$ y $40\,\Omega$ en paralelo
R + \frac{1}{\frac{1}{30} + \frac{1}{R + 5}} = 75\,\Omega                   // con la rama $R + 5$ en paralelo, y $R$ en serie
\Rightarrow R = 55\,\Omega
:::

::: aclaracion
Verificación: con $R = 55\,\Omega$, la rama de la derecha es de $60\,\Omega$; $30\,\Omega$ en paralelo con $60\,\Omega$ dan $20\,\Omega$, y $55 + 20 = 75\,\Omega$.
:::
:::

## 9.28

::: ejercicio Por el circuito circulan $I = 320\,\text{mA}$. ¿Cuánto vale $\Delta V_{ab}$?
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

::: pasos
I = 320\,\text{mA} = 320\cdot 10^{-3}\,\text{A}
\Delta V_{ab} = I\cdot R_{eq} = 320\,\text{mA}\cdot 5{,}85\,\Omega
:::

::: aclaracion
De dónde salen los $5{,}85\,\Omega$ (no está en la hoja): $3$ y $6\,\Omega$ en paralelo dan $2\,\Omega$; $3$, $2$ y $3\,\Omega$ en paralelo dan $\frac{1}{\frac{1}{3} + \frac{1}{2} + \frac{1}{3}} \approx 0{,}857\,\Omega$; en serie con $2$ y $1\,\Omega$: $2 + 2 + 1 + 0{,}857 = 5{,}857\,\Omega$ (en la hoja, $5{,}85$). La cuenta queda en $\Delta V_{ab} = 0{,}32\,\text{A}\cdot 5{,}857\,\Omega \approx 1{,}87\,\text{V}$.
:::
:::
