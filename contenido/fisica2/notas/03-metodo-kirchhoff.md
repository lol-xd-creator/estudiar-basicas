# Método de Kirchhoff (EJ6)

*Clase teórica del 01/09 (final). La teoría está en [[Conexión de resistores y leyes de Kirchhoff]].*

## Pasos

1. Proponer el sentido de las corrientes.
2. Armar las ecuaciones de nudo.
3. Armar las ecuaciones de malla.
4. Resolver el sistema de ecuaciones.
5. Interpretar el resultado.

::: claves
- Entre los pasos 2 y 3 tiene que haber **la misma cantidad de ecuaciones que de incógnitas**.
- Si una incógnita da **negativa**, es porque la corriente iba en sentido opuesto al propuesto.
- Signos al recorrer la malla: batería de $-$ a $+$, $+\varepsilon$; resistencia a favor de la corriente, $-I R$ (y al revés, los signos contrarios).
:::

## Ejemplo

::: ejercicio EJ6: hallar las corrientes $I_1$, $I_2$ e $I_3$
```circuito
titulo: EJ6: corrientes propuestas $I_1$, $I_2$, $I_3$
cable (0,0) (0,4)
cable (0,4) (1.2,4)
R (1.2,4) (2.8,4) ; 2
cable (2.8,4) (4,4) (4,2)
cable (0,2) (0.5,2)
R (0.5,2) (1.7,2) ; 6
cable (1.7,2) (2.5,2)
bateria (3.3,2) (2.5,2) ; 10
cable (3.3,2) (4,2)
R (4,2) (4,0) ; 4
cable (0,0) (1.5,0)
bateria (1.5,0) (2.5,0) ; 14
cable (2.5,0) (4,0)
nodo (0,2) ; "a"
nodo (4,2) ; "d"
etiqueta (-0.35,4.35) "$b$"
etiqueta (4.35,4.35) "$c$"
etiqueta (4.35,-0.35) "$e$"
etiqueta (-0.35,-0.35) "$f$"
corriente (2.35,2) (1.85,2) ; "$I_1$"
corriente (0,1.3) (0,0.7) ; "$I_2$"
corriente (0,2.7) (0,3.3) ; "$I_3$"
```

Intentalo antes de abrir la solución: hay $3$ incógnitas, así que hacen falta $3$ ecuaciones (un nudo y dos mallas).

::: solucion
**① Nudo $a$:** entra $I_1$ y salen $I_2$ e $I_3$.

$$
I_1 = I_2 + I_3
$$

**② Mallas**, recorridas desde $a$:

::: pasos
// malla abcda
-I_3\cdot 2\,\Omega + 10\,\text{V} - I_1\cdot 6\,\Omega = 0
// malla afeda
14\,\text{V} - I_2\cdot 4\,\Omega + 10\,\text{V} - I_1\cdot 6\,\Omega = 0
:::

**③ Resolver el sistema.** De la malla $afeda$ se despeja $I_2$, y de la $abcda$, $I_3$:

::: pasos
4\,I_2 = 24 - 6\,I_1 \then I_2 = 6 - 1{,}5\,I_1
2\,I_3 = 10 - 6\,I_1 \then I_3 = 5 - 3\,I_1
// Reemplazando en el nudo, $I_1 = I_2 + I_3$:
I_1 = (6 - 1{,}5\,I_1) + (5 - 3\,I_1) = 11 - 4{,}5\,I_1
5{,}5\,I_1 = 11 \then I_1 = 2\,\text{A}
I_2 = 6 - 1{,}5\cdot 2 = 3\,\text{A} \qquad I_3 = 5 - 3\cdot 2 = -1\,\text{A}
:::

**④ Interpretar.** $I_3$ dio negativa: esa corriente va al revés de la flecha propuesta.

| Corriente | Valor | Sentido |
|---|---|---|
| $I_1$ | $2\,\text{A}$ | el propuesto |
| $I_2$ | $3\,\text{A}$ | el propuesto |
| $I_3$ | $1\,\text{A}$ | **contrario al propuesto** (o se hace otro dibujo con la flecha dada vuelta) |

**Control** en el nudo $a$: $I_1 = I_2 + I_3 \Rightarrow 2 = 3 + (-1)$. El botón **I** del circuito muestra las corrientes calculadas.
:::
:::
