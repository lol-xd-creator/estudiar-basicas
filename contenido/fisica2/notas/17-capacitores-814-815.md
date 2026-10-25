# Capacitores: ejercicios 8.14, 8.15 y uno inventado

*Clase práctica del 11/08 (tu hoja). Guía de trabajos prácticos, capítulo 8. La teoría está en [[Capacitancia y capacitores]]; los ejercicios anteriores de la misma clase, en [[Capacitores: ejercicios 8.11 y 8.13]].*

::: claves
- **Serie** (uno detrás del otro): $C_{ef} = \dfrac{1}{\frac{1}{C_1} + \frac{1}{C_2} + \dots + \frac{1}{C_n}}$; todos tienen **la misma carga $Q$** y las $\Delta V$ se suman.
- **Paralelo** (entre los mismos dos cables): $C_{ef} = C_1 + C_2 + \dots + C_n$; todos tienen **la misma $\Delta V$** y las cargas se suman.
- **Mixto**: se reduce por partes, de adentro hacia afuera, y después se vuelve para atrás con $C = \dfrac{Q}{V}$.
- Unidades: $8\,\mu\text{F} = 8\times10^{-6}\,\text{F}$. Trabajando todo en $\mu\text{F}$ y $\text{V}$, las cargas salen en $\mu\text{C}$.
:::

```circuito
titulo: Un circuito mixto: $C_1$ en serie con el paralelo de ($C_2$ y $C_3$ en serie), $C_4$ y $C_5$
animar: no
cable (0,2) (0.3,2)
capacitor (0.3,2) (1.3,2) ; "$C_1$"
cable (1.3,2) (4,2) (4.6,2)
capacitor (2,2) (2,1) ; "$C_2$"
capacitor (2,1) (2,0) ; "$C_3$"
capacitor (3,2) (3,0) ; "$C_4$"
capacitor (4,2) (4,0) ; "$C_5$"
cable (0,0) (4.6,0)
nodo (0,2)
nodo (0,0)
nodo (4.6,2)
nodo (4.6,0)
```

## Ejercicio 8.14

::: ejercicio En el circuito de la figura calcular a) la capacidad equivalente, b) la carga en $C_1$ y $C_2$, c) la diferencia de potencial entre los puntos $mn$, $nx$ y $xy$
```circuito
animar: no
bateria (0,0) (0,2) ; 12
cable (0,2) (0.5,2)
capacitor (0.5,2) (1.7,2) ; "$24\,\mu\text{F}$"
cable (1.7,2) (2.2,2)
cable (2.2,1.4) (2.2,2.6)
capacitor (2.2,2.6) (3.6,2.6) ; "$C_1 = 4\,\mu\text{F}$"
capacitor (2.2,1.4) (3.6,1.4) ; "$C_2 = 8\,\mu\text{F}$" ; abajo
cable (3.6,1.4) (3.6,2.6)
cable (3.6,2) (4.2,2)
cable (4.2,1.4) (4.2,2.6)
capacitor (4.2,2.6) (5.6,2.6) ; "$6\,\mu\text{F}$"
capacitor (4.2,1.4) (5.6,1.4) ; "$2\,\mu\text{F}$" ; abajo
cable (5.6,1.4) (5.6,2.6)
cable (5.6,2) (6.2,2) (6.2,0) (0,0)
nodo (0.3,2) ; "m"
nodo (1.95,2) ; "n"
nodo (3.9,2) ; "x"
nodo (5.9,2) ; "y"
tierra (0,0)
```

Respuestas de la guía para controlar: a) $4\,\mu\text{F}$; b) $Q_{C1} = 16\,\mu\text{C}$, $Q_{C2} = 32\,\mu\text{C}$; c) $V_{mn} = 2\,\text{V}$, $V_{nx} = 4\,\text{V}$, $V_{xy} = 6\,\text{V}$.

::: solucion
**a) Capacidad equivalente.** Cada par de arriba y abajo está en paralelo, y los tres bloques quedan en serie:

::: pasos
// Los paralelos se suman directo:
C_{nx} = 4 + 8 = 12\ \mu\text{F} \qquad C_{xy} = 6 + 2 = 8\ \mu\text{F}
// Quedan $24$, $12$ y $8\,\mu\text{F}$ en serie (denominador común $24$):
\frac{1}{C_e} = \frac{1}{24} + \frac{1}{12} + \frac{1}{8} = \frac{1 + 2 + 3}{24} = \frac{6}{24}
C_e = 4\ \mu\text{F}
:::

```circuito
titulo: Reducido: tres capacitores en serie
animar: no
bateria (0,0) (0,2) ; 12
capacitor (0,2) (1.6,2) ; "$24\,\mu\text{F}$"
capacitor (1.6,2) (3.2,2) ; "$12\,\mu\text{F}$"
capacitor (3.2,2) (4.8,2) ; "$8\,\mu\text{F}$"
cable (4.8,2) (4.8,0) (0,0)
```

**Carga total.** Es la del capacitor equivalente, y como los tres bloques están en serie, **cada bloque tiene esa misma carga**:

$$
Q = C_e\,\Delta V = 4\,\mu\text{F}\cdot 12\,\text{V} = 48\ \mu\text{C}
$$

**c) Caída de tensión en cada bloque**, con $V = \frac{Q}{C}$:

::: pasos
V_{mn} = \frac{48\,\mu\text{C}}{24\,\mu\text{F}} = 2\ \text{V}
V_{nx} = \frac{48\,\mu\text{C}}{12\,\mu\text{F}} = 4\ \text{V}
V_{xy} = \frac{48\,\mu\text{C}}{8\,\mu\text{F}} = 6\ \text{V}
:::

Control: $2 + 4 + 6 = 12\,\text{V}$, la de la batería. El capacitor más chico se lleva la mayor tensión.

**b) Cargas en $C_1$ y $C_2$.** Los dos están en paralelo entre $n$ y $x$, así que los dos tienen $V_{nx} = 4\,\text{V}$:

::: pasos
Q_{C1} = 4\,\mu\text{F}\cdot 4\,\text{V} = 16\ \mu\text{C}
Q_{C2} = 8\,\mu\text{F}\cdot 4\,\text{V} = 32\ \mu\text{C}       // control: $16 + 32 = 48\,\mu\text{C}$
:::

::: resultado
$$
C_e = 4\ \mu\text{F} \qquad Q_{C1} = 16\ \mu\text{C} \qquad Q_{C2} = 32\ \mu\text{C} \qquad V_{mn} = 2\ \text{V} \quad V_{nx} = 4\ \text{V} \quad V_{xy} = 6\ \text{V}
$$
:::

De paso, en el último bloque (los dos a $6\,\text{V}$): $Q_6 = 36\,\mu\text{C}$ y $Q_2 = 12\,\mu\text{C}$, que también suman $48\,\mu\text{C}$.
:::
:::

## Ejercicio inventado en clase

::: ejercicio Calcular lo mismo que en el 8.14: la capacidad equivalente y la carga de cada capacitor
```circuito
animar: no
bateria (0,0) (0,2) ; 24
cable (0,2) (0.4,2)
capacitor (0.4,2) (1.8,2) ; "$6\,\mu\text{F}$"
cable (1.8,2) (4.8,2)
capacitor (2.4,2) (2.4,1) ; "$2\,\mu\text{F}$"
capacitor (2.4,1) (2.4,0) ; "$5\,\mu\text{F}$"
capacitor (3.6,2) (3.6,0) ; "$8\,\mu\text{F}$"
capacitor (4.8,2) (4.8,0) ; "$12\,\mu\text{F}$"
cable (4.8,0) (0,0)
tierra (0,0)
```

Es el mismo esquema que el circuito mixto de arriba.

::: solucion
**Capacidad equivalente**, de adentro hacia afuera:

::: pasos
// $2$ y $5\,\mu\text{F}$ en serie:
C_{25} = \frac{2\cdot 5}{2 + 5} = \frac{10}{7} \approx 1{,}43\ \mu\text{F}
// $C_{25}$, $8$ y $12\,\mu\text{F}$ en paralelo:
C_p = 1{,}43 + 8 + 12 \approx 21{,}43\ \mu\text{F}
// $6\,\mu\text{F}$ en serie con $C_p$:
C_T = \frac{6\cdot 21{,}43}{6 + 21{,}43} \approx 4{,}69\ \mu\text{F}
:::

Queda una batería con dos capacitores en serie, $6\,\mu\text{F}$ y $C_p$:

```circuito
titulo: Reducido: $6\,\mu\text{F}$ en serie con $C_p \approx 21{,}43\,\mu\text{F}$
animar: no
bateria (0,0) (0,2) ; 24
capacitor (0,2) (2,2) ; "$6\,\mu\text{F}$"
capacitor (2,2) (4,2) ; "$C_p$"
cable (4,2) (4,0) (0,0)
```

**Cargas.** El de $6\,\mu\text{F}$ está en serie con todo el resto: tiene la carga total.

::: pasos
Q_T = C_T\,\Delta V = 4{,}6875\,\mu\text{F}\cdot 24\,\text{V} = 112{,}5\ \mu\text{C} = Q_6
V_6 = \frac{112{,}5\,\mu\text{C}}{6\,\mu\text{F}} = 18{,}75\ \text{V}
V_p = 24\,\text{V} - 18{,}75\,\text{V} = 5{,}25\ \text{V}       // la tensión de las tres ramas en paralelo
:::

Cada rama del paralelo tiene $V_p = 5{,}25\,\text{V}$:

::: pasos
Q_8 = 8\,\mu\text{F}\cdot 5{,}25\,\text{V} = 42\ \mu\text{C}
Q_{12} = 12\,\mu\text{F}\cdot 5{,}25\,\text{V} = 63\ \mu\text{C}
Q_2 = Q_5 = \frac{10}{7}\,\mu\text{F}\cdot 5{,}25\,\text{V} = 7{,}5\ \mu\text{C}       // $2$ y $5\,\mu\text{F}$ en serie: la misma carga
:::

::: resultado
$$
C_T \approx 4{,}69\ \mu\text{F} \qquad Q_6 = 112{,}5\ \mu\text{C} \qquad Q_8 = 42\ \mu\text{C} \qquad Q_{12} = 63\ \mu\text{C} \qquad Q_2 = Q_5 = 7{,}5\ \mu\text{C}
$$
:::

**Verificación:** $42 + 63 + 7{,}5 = 112{,}5\,\mu\text{C}$, y en la rama de $2$ y $5\,\mu\text{F}$: $\frac{7{,}5}{2} + \frac{7{,}5}{5} = 3{,}75 + 1{,}5 = 5{,}25\,\text{V}$.

::: aclaracion
En la hoja quedó $C_t = 4{,}68\,\mu\text{F}$ y $Q_t = 112{,}8\,\mu\text{C}$. Sin redondear, $C_T = 4{,}6875\,\mu\text{F}$ y $Q_T = 4{,}6875\cdot 24 = 112{,}5\,\mu\text{C}$.
:::
:::
:::

## Ejercicio 8.15

::: ejercicio En el circuito, $C_1 = 6\,\mu\text{F}$, $C_2 = 3\,\mu\text{F}$ y $V = 20\,\text{V}$. Primero se carga $C_1$ cerrando el interruptor $S_1$. Luego se abre $S_1$ y el capacitor cargado se conecta al descargado cerrando $S_2$. Calcular la carga inicial de $C_1$ y la carga final en cada capacitor
```circuito
titulo: Paso 1: $S_1$ cerrado, se carga $C_1$
animar: no
bateria (0,0) (0,2) ; 20
cable (0,2) (4,2)
capacitor (2,2) (2,0) ; "$C_1 = 6\,\mu\text{F}$" ; izquierda
capacitor (4,2) (4,0) ; "$C_2 = 3\,\mu\text{F}$" ; izquierda
cable (0,0) (0.5,0)
interruptor (0.5,0) (1.5,0) ; cerrado ; "$S_1$" ; abajo
cable (1.5,0) (2,0) (2.5,0)
interruptor (2.5,0) (3.5,0) ; abierto ; "$S_2$" ; abajo
cable (3.5,0) (4,0)
tierra (0,0)
```

```circuito
titulo: Paso 2: $S_1$ abierto y $S_2$ cerrado, $C_1$ comparte su carga con $C_2$
animar: no
bateria (0,0) (0,2) ; 20
cable (0,2) (4,2)
capacitor (2,2) (2,0) ; "$C_1$"
capacitor (4,2) (4,0) ; "$C_2$"
cable (0,0) (0.5,0)
interruptor (0.5,0) (1.5,0) ; abierto ; "$S_1$" ; abajo
cable (1.5,0) (2,0) (2.5,0)
interruptor (2.5,0) (3.5,0) ; cerrado ; "$S_2$" ; abajo
cable (3.5,0) (4,0)
tierra (0,0)
```

Pista: cuando se abre $S_1$, la batería queda afuera. La carga de $C_1$ **no se pierde**: se reparte entre los dos, que quedan en paralelo.

::: solucion
**Paso 1.** Con $S_1$ cerrado, $C_1$ queda conectado a la batería:

$$
Q_0 = C_1\,V = 6\,\mu\text{F}\cdot 20\,\text{V} = 120\ \mu\text{C}
$$

**Paso 2.** Con $S_1$ abierto y $S_2$ cerrado, $C_1$ y $C_2$ quedan en paralelo (los dos con la **misma** $\Delta V$) y sin batería, así que la carga total se conserva:

::: pasos
Q_0 = Q_1 + Q_2       // la carga solo se reparte
C_1\,V = C_1\,\Delta V + C_2\,\Delta V = (C_1 + C_2)\,\Delta V       // $C_1 + C_2 = 9\,\mu\text{F}$: el paralelo
\Delta V = \frac{Q_0}{C_1 + C_2} = \frac{120\,\mu\text{C}}{9\,\mu\text{F}} \approx 13{,}3\ \text{V}
:::

Con esa tensión, cada carga:

::: pasos
Q_1 = C_1\,\Delta V = 6\,\mu\text{F}\cdot 13{,}3\,\text{V} = 80\ \mu\text{C}
Q_2 = C_2\,\Delta V = 3\,\mu\text{F}\cdot 13{,}3\,\text{V} = 40\ \mu\text{C}       // control: $80 + 40 = 120\,\mu\text{C}$
:::

::: resultado
$$
Q_0 = 120\ \mu\text{C} \qquad\qquad Q_1 = 80\ \mu\text{C} \qquad\qquad Q_2 = 40\ \mu\text{C} \qquad (\Delta V \approx 13{,}3\ \text{V})
$$
:::

::: aclaracion
La guía escribe $Q_0 = C_1\times V = 20\,\mu\text{C}$: es un error de tipeo, porque $6\cdot 20 = 120\,\mu\text{C}$. Lo demás de la guía (y de tu hoja) ya usa $120\,\mu\text{C}$: $13{,}3\,\text{V}$, $80$ y $40\,\mu\text{C}$.
:::

::: observacion
La carga se conserva, pero la **energía no**: antes $U = \frac{1}{2}\cdot 6\,\mu\text{F}\cdot(20\,\text{V})^2 = 1{,}2\,\text{mJ}$, y después $U = \frac{1}{2}\cdot 9\,\mu\text{F}\cdot(13{,}3\,\text{V})^2 = 0{,}8\,\text{mJ}$. El resto se pierde en calor y radiación en los cables durante el reparto.
:::
:::
:::

## Lo que se anunció en la clase

- **Parcial 2:** entran **Kirchhoff (ley de Ohm)**, **capacitancia**, **resistencia** e **inducción (primera parte)**.
- **TP Laboratorio 3:** fecha a fijar, presencial. Hay que leer la información del profe y **repasar el TP 2**. **Va en el parcial.**
