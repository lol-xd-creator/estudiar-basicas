# Capacitores: ejercicios 8.11 y 8.13

*Clase práctica del 11/08 (estos dos salen de las notas de otra persona; lo que sigue de la clase, con tu hoja, está en [[Capacitores: ejercicios 8.14, 8.15 y uno inventado]]). Guía de trabajos prácticos, capítulo 8.*

::: claves
- Serie: $\dfrac{1}{C_e} = \dfrac{1}{C_1} + \dfrac{1}{C_2} + \dots$ (misma carga $Q$ en todos)
- Paralelo: $C_e = C_1 + C_2 + \dots$ (misma $\Delta V$ en todos)
- $Q = C\cdot\Delta V$, en farad $\text{F} = \text{C}/\text{V}$; µ $= 10^{-6}$
:::

Teoría en [[Capacitancia y capacitores]].

::: aclaracion
En las notas de clase la numeración está cruzada con la de la guía: el circuito de $20$, $15$, $3$ y $6\,\mu\text{F}$ figura como **8.13**, pero en la guía es el **8.11**; y las tres capacidades equivalentes figuran como **8.11**, pero en la guía son el **8.13**. Acá van con el número de la guía.
:::

## Ejercicio 8.11

::: ejercicio Cuatro capacitores se conectan como en la figura. Calcular a) la capacidad equivalente y b) la carga en cada capacitor
```circuito
animar: no
cable (0,0) (0,2)
capacitor (0,2) (1.5,2) ; "$20\,\mu\text{F}$"
cable (1.5,2) (1.5,3)
capacitor (1.5,3) (2.6,3) ; "$15\,\mu\text{F}$"
capacitor (2.6,3) (3.7,3) ; "$3\,\mu\text{F}$"
cable (3.7,3) (3.7,2)
capacitor (1.5,2) (3.7,2) ; "$6\,\mu\text{F}$" ; abajo
nodo (1.5,2)
nodo (3.7,2)
cable (3.7,2) (4.6,2) (4.6,0)
bateria (4.6,0) (0,0) ; 15
```

Intentalo antes de abrir la solución: reducí de adentro hacia afuera y después volvé para atrás con las cargas.

::: solucion
**a) Capacidad equivalente**, de adentro hacia afuera:

::: pasos
// $15\,\mu\text{F}$ y $3\,\mu\text{F}$ están en serie:
\frac{1}{C_{e1}} = \frac{1}{15\,\mu\text{F}} + \frac{1}{3\,\mu\text{F}} \then C_{e1} = 2{,}5\ \mu\text{F}
// $C_{e1}$ queda en paralelo con $6\,\mu\text{F}$:
C_{e2} = 2{,}5\,\mu\text{F} + 6\,\mu\text{F} = 8{,}5\ \mu\text{F}
// $C_{e2}$ queda en serie con $20\,\mu\text{F}$:
\frac{1}{C_T} = \frac{1}{20\,\mu\text{F}} + \frac{1}{8{,}5\,\mu\text{F}} \then C_T \approx 5{,}96\ \mu\text{F}
:::

```circuito
titulo: Reducido: $20\,\mu\text{F}$ en serie con $C_{e2} = 8{,}5\,\mu\text{F}$
animar: no
cable (0,0) (0,2)
capacitor (0,2) (2,2) ; "$20\,\mu\text{F}$"
capacitor (2,2) (4,2) ; "$8{,}5\,\mu\text{F}$"
cable (4,2) (4,0)
bateria (4,0) (0,0) ; 15
```

**b) Cargas.** La carga total es la del capacitor equivalente; como el de $20\,\mu\text{F}$ está en serie con todo el resto, tiene **esa misma** carga:

::: pasos
Q_T = C_T\,\Delta V = 5{,}96\,\mu\text{F}\cdot 15\,\text{V} \approx 89{,}5\ \mu\text{C} = Q_{20}
\Delta V_{20} = \frac{Q_{20}}{20\,\mu\text{F}} \approx 4{,}47\ \text{V}
\Delta V_1 = 15\,\text{V} - 4{,}47\,\text{V} \approx 10{,}5\ \text{V}       // la $\Delta V$ del paralelo (es la misma para $6\,\mu\text{F}$ y para la rama $15$–$3$)
:::

En el paralelo, cada rama tiene $\Delta V_1$:

::: pasos
Q_{15} = Q_3 = \Delta V_1\cdot C_{e1} = 10{,}5\,\text{V}\cdot 2{,}5\,\mu\text{F} \approx 26{,}3\ \mu\text{C}          // $15$ y $3\,\mu\text{F}$ están en serie: la misma carga
Q_6 = \Delta V_1\cdot 6\,\mu\text{F} = 10{,}5\,\text{V}\cdot 6\,\mu\text{F} \approx 63\ \mu\text{C}
:::

::: resultado
$$
C_T \approx 5{,}96\ \mu\text{F} \qquad Q_{20} \approx 89{,}5\ \mu\text{C} \qquad Q_{15} = Q_3 \approx 26{,}3\ \mu\text{C} \qquad Q_6 \approx 63\ \mu\text{C}
$$
:::

**Verificación:** las cargas del paralelo suman la total, $26{,}3 + 63{,}2 = 89{,}5\ \mu\text{C}$, y las tensiones de la serie suman la de la batería, $4{,}47 + 10{,}53 = 15\ \text{V}$.

::: observacion
La guía da $26{,}25\,\mu\text{C}$ y $63\,\mu\text{C}$ porque redondea $\Delta V_1$ a $10{,}5\,\text{V}$; sin redondear, $\Delta V_1 = 10{,}53\,\text{V}$ y quedan $26{,}3$ y $63{,}2\,\mu\text{C}$. En la clase la carga total quedó $89{,}4\,\mu\text{C}$ y la de $6\,\mu\text{F}$, $63{,}15\,\mu\text{C}$: son los mismos valores con otros redondeos.
:::
:::
:::

## Ejercicio 8.13

::: ejercicio Hallar la capacidad equivalente en los tres casos
```circuito
titulo: (A)
animar: no
cable (0.5,2) (3.5,2)
cable (0.5,0) (3.5,0)
capacitor (0.5,2) (0.5,0) ; "$2\,\mu\text{F}$"
capacitor (2,2) (2,0) ; "$4\,\mu\text{F}$"
capacitor (3.5,2) (3.5,0) ; "$5\,\mu\text{F}$"
cable (2,2) (2,2.8)
cable (2,0) (2,-0.8)
nodo (2,2.8)
nodo (2,-0.8)
```

```circuito
titulo: (B)
animar: no
cable (0,0) (0.5,0)
capacitor (0.5,0) (1.6,0) ; "$3\,\mu\text{F}$"
capacitor (1.6,0) (2.7,0) ; "$12\,\mu\text{F}$"
capacitor (2.7,0) (3.8,0) ; "$4\,\mu\text{F}$"
cable (3.8,0) (4.3,0)
nodo (0,0)
nodo (4.3,0)
```

```circuito
titulo: (C)
animar: no
cable (0,1) (0.6,1)
cable (0.6,0) (0.6,2)
capacitor (0.6,2) (2,2) ; "$2\,\mu\text{F}$"
capacitor (0.6,0) (2,0) ; "$4\,\mu\text{F}$" ; abajo
cable (2,0) (2,2)
cable (2,1) (2.8,1)
cable (2.8,0) (2.8,2)
capacitor (2.8,2) (3.8,2) ; "$6\,\mu\text{F}$"
capacitor (3.8,2) (4.8,2) ; "$3\,\mu\text{F}$"
capacitor (2.8,0) (4.8,0) ; "$10\,\mu\text{F}$" ; abajo
cable (4.8,0) (4.8,2)
cable (4.8,1) (5.4,1)
nodo (0,1)
nodo (5.4,1)
```

Respuestas de la guía para controlar: A $= 11\,\mu\text{F}$, B $= 1{,}5\,\mu\text{F}$, C $= 4\,\mu\text{F}$.

::: solucion
**(A)** Los tres están entre los mismos dos cables: **paralelo**.

$$
C_e = 2 + 4 + 5 = 11\ \mu\text{F}
$$

**(B)** Uno detrás del otro: **serie**.

::: pasos
\frac{1}{C_e} = \frac{1}{3} + \frac{1}{12} + \frac{1}{4} = \frac{4 + 1 + 3}{12} = \frac{8}{12}     // en $\mu\text{F}^{-1}$, con denominador común $12$
C_e = \frac{12}{8} = 1{,}5\ \mu\text{F}
:::

**(C)** Se reduce por partes:

::: pasos
// $2$ y $4\,\mu\text{F}$, en paralelo:
C_a = 2 + 4 = 6\ \mu\text{F}
// $6$ y $3\,\mu\text{F}$, en serie:
C_b = \frac{6\cdot 3}{6 + 3} = 2\ \mu\text{F}
// $C_b$ en paralelo con $10\,\mu\text{F}$:
C_c = 2 + 10 = 12\ \mu\text{F}
// $C_a$ en serie con $C_c$:
C_e = \frac{6\cdot 12}{6 + 12} = 4\ \mu\text{F}
:::

::: resultado
$$
C_A = 11\ \mu\text{F} \qquad\qquad C_B = 1{,}5\ \mu\text{F} \qquad\qquad C_C = 4\ \mu\text{F}
$$
:::
:::
:::
