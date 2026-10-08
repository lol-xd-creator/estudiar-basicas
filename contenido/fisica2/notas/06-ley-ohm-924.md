# Ley de Ohm y ejercicio 9.24

*Clase del 25/8.*

## Ley de Ohm

La tensión $V$ es proporcional a la intensidad eléctrica $I$:

::: ley de Ohm
$$
V = I\cdot R
$$

$V$ en volt ($\text{V}$), $I$ en ampere ($\text{A}$), $R$ en ohm ($\Omega$).
:::

## Ley de Kirchhoff

- **1ª ley**: $\sum V = \sum I\cdot R$
- **2ª ley**: $\sum I = 0$

::: aclaracion
En el teórico la numeración es al revés: la **1ª** es la de los nudos ($\sum I = 0$) y la **2ª** la de las mallas ($\sum \Delta V = 0$). Ver [[Conexión de resistores y leyes de Kirchhoff]].
:::

Intensidad: $I = \dfrac{dQ}{dt}$ (carga sobre tiempo).

## Potencia

$$
P = V\cdot I \qquad\qquad P = \frac{V^2}{R} \qquad\qquad P = I^2\cdot R \qquad [\text{W}]\ \text{(watts)}
$$

## Ejercicio 9.24

::: ejercicio Resistencia equivalente, a)
```circuito
titulo: a)
nodo (0,1)
R (0,1) (1.6,1) ; 6.2
R (1.6,1) (2.4,2) ; 3
R (2.4,2) (4.4,2) ; 3
R (4.4,2) (4.4,1) ; 1
R (1.6,1) (3,1) ; 2 ; abajo
R (3,1) (4.4,1) ; 5 ; abajo
cable (1.6,1) (1.6,0)
R (1.6,0) (4.4,0) ; 14
cable (4.4,0) (4.4,1)
nodo (4.4,1)
```

Las tres ramas entre los nudos quedan de $7\,\Omega$ ($3 + 3 + 1$ y $2 + 5$) y $14\,\Omega$:

```circuito
titulo: Reducido: $6{,}2\,\Omega$ en serie con tres ramas en paralelo
nodo (0,1)
R (0,1) (1.6,1) ; 6.2
cable (1.6,1) (1.6,2)
R (1.6,2) (3.6,2) ; 7
R (1.6,1) (3.6,1) ; 7 ; abajo
cable (1.6,1) (1.6,0)
R (1.6,0) (3.6,0) ; 14
cable (3.6,2) (3.6,0)
nodo (3.6,1)
```

::: pasos
R_p = \frac{1}{\frac{1}{7} + \frac{1}{7} + \frac{1}{14}} = 2{,}8\,\Omega     // las tres ramas en paralelo
R_{eq} = 6{,}2\,\Omega + 2{,}8\,\Omega = 9\,\Omega                           // en serie
:::

::: resultado
$$
R_{eq} = 9\,\Omega
$$
:::
:::

::: ejercicio Resistencia equivalente, b)
```circuito
titulo: b)
nodo (0,1)
R (0,1) (1.4,1) ; 7.6
cable (1.4,1) (1.4,2.4)
R (1.4,2.4) (2.6,2.4) ; 5
cable (2.6,2.4) (2.6,2.9)
R (2.6,2.9) (4.2,2.9) ; 3
cable (4.2,2.9) (4.2,2.4)
cable (2.6,2.4) (2.6,1.9)
R (2.6,1.9) (4.2,1.9) ; 6 ; abajo
cable (4.2,1.9) (4.2,2.4)
R (4.2,2.4) (5.6,2.4) ; 4
cable (5.6,2.4) (5.6,1)
R (1.4,1) (5.6,1) ; 22 ; abajo
cable (1.4,1) (1.4,0)
R (1.4,0) (4,0) ; 9
R (4,0) (5.6,1) ; 2 ; derecha
nodo (5.6,1)
```

::: resultado
$$
R_{eq} = 12\,\Omega
$$
:::

::: aclaracion
En la hoja está solo el resultado. Se llega así: $3\,\Omega$ y $6\,\Omega$ en paralelo dan $2\,\Omega$; la rama de arriba queda en $5 + 2 + 4 = 11\,\Omega$ y la de abajo en $9 + 2 = 11\,\Omega$. Las tres ramas en paralelo ($11$, $22$ y $11\,\Omega$) dan $4{,}4\,\Omega$, y en serie con $7{,}6\,\Omega$: $12\,\Omega$.
:::
:::
