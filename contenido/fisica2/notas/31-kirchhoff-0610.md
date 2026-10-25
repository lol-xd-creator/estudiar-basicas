# Kirchhoff: dos circuitos de práctica para el parcial

*Clase práctica del 06/10. En la hoja: primero se corrigió el 10.3, y después se dieron dos circuitos sin número para resolver con Kirchhoff (corrientes y potencia en una resistencia). **No están en la guía**: el segundo es el problema 28.17 del Serway; el primero no está ni en la guía ni en el Serway, así que parece armado por el profe. La teoría está en [[Conexión de resistores y leyes de Kirchhoff]] y el método en [[Método de Kirchhoff (EJ6)]].*

::: claves
**Parcial 2:** 1 de capacitores, 1 de circuitos (Kirchhoff), 1 de magnetismo (Biot-Savart, fuerza entre campos) y 1 pregunta (inducción / laboratorio).
:::

## El 10.3, corregido en clase

En la clase se resolvió el ejercicio 10.3 ([[Circuitos de corriente continua: ejercicios 10.1 a 10.3]]) con la malla completa:

$$
\sum V = \sum I\,R \qquad\then\qquad (50 + \varepsilon - 28)\,\text{V} = I\,(R_1 + R_4 + \dots) \qquad\then\qquad \varepsilon = 23\,\text{V}
$$

con $I = 3\,\text{A}$ (lo que marca $A_2$). Es el mismo resultado que quedó en la nota del 10.3: **la guía, que da $10\,\text{V}$, está mal**.

## Circuito 1

::: ejercicio Calcular $I_1$, $I_2$, $I_3$ y la potencia en la resistencia de $5\,\Omega$
```circuito
titulo: Tres ramas entre los nudos $a$ y $b$ (corrientes con el sentido de la hoja)
cable (0,1.6) (0,3) (0.4,3)
R (0.4,3) (1.6,3) ; 4
R (1.6,3) (2.8,3) ; 7
cable (2.8,3) (3.6,3)
bateria (3.6,2.2) (3.6,3) ; 12 ; derecha
cable (3.6,2.2) (3.6,1.6)
R (0,1.6) (3.6,1.6) ; 5
bateria (0,0.4) (0,1.2) ; 14 ; izquierda
cable (0,1.2) (0,1.6)
cable (0,0.4) (0,0) (1.2,0)
R (1.2,0) (2.4,0) ; 3 ; abajo
cable (2.4,0) (3.6,0) (3.6,1.6)
tierra (0,0)
nodo (0,1.6) ; "a"
nodo (3.6,1.6) ; "b"
corriente (2.9,3) (3.4,3) ; "$I_1$"
corriente (2.6,1.6) (3.1,1.6) ; "$I_2$"
corriente (3.6,0.4) (3.6,0.9) ; "$I_3$" ; derecha
```

Se toman las dos baterías con el **$+$ arriba**, como en el dibujo de la hoja, y las tres corrientes **llegando al nudo $b$**, como las flechas de la hoja.

::: solucion
**① Nudo $b$:** llegan las tres.

$$
I_1 + I_2 + I_3 = 0
$$

**② Mallas.** Malla de arriba, de $a$ a $b$ por la rama de $4$ y $7\,\Omega$ y volviendo por la de $5\,\Omega$; malla de abajo, de $a$ a $b$ por la de $5\,\Omega$ y volviendo por la de abajo:

::: pasos
// Arriba: a favor de $I_1$ caen $11 I_1$; la batería de $12\,\text{V}$ se cruza de $+$ a $-$; se vuelve contra $I_2$:
-11\,I_1 - 12 + 5\,I_2 = 0
// Abajo: a favor de $I_2$; se baja por la derecha y se cruza $3\,\Omega$ contra $I_3$; se sube por la batería de $-$ a $+$:
-5\,I_2 + 3\,I_3 + 14 = 0
:::

**③ Resolver.** Se despejan $I_1$ e $I_3$ en función de $I_2$ y se reemplazan en el nudo:

::: pasos
I_1 = \frac{5\,I_2 - 12}{11} \qquad I_3 = \frac{5\,I_2 - 14}{3}
:::

En el nudo:

$$
\frac{5\,I_2 - 12}{11} + I_2 + \frac{5\,I_2 - 14}{3} = 0
$$

::: pasos
// Multiplicando por $33$:
15\,I_2 - 36 + 33\,I_2 + 55\,I_2 - 154 = 0
103\,I_2 = 190 \then I_2 \approx 1{,}84\,\text{A}
:::

Volviendo a las de arriba:

::: pasos
I_1 = \frac{5\cdot 1{,}845 - 12}{11} \approx -0{,}25\,\text{A}
I_3 = \frac{5\cdot 1{,}845 - 14}{3} \approx -1{,}59\,\text{A}
:::

**④ Potencia en $5\,\Omega$:**

$$
P_{5\Omega} = I_2^2\cdot 5\,\Omega = (1{,}845\,\text{A})^2\cdot 5\,\Omega \approx 17\,\text{W}
$$

::: resultado
$$
I_1 \approx -0{,}25\ \text{A} \qquad I_2 \approx 1{,}84\ \text{A} \qquad I_3 \approx -1{,}59\ \text{A} \qquad P_{5\Omega} \approx 17\ \text{W}
$$
:::

**Interpretación:** $I_1$ e $I_3$ dieron negativas, así que van al revés de las flechas. Por la de $5\,\Omega$ la corriente va de $a$ a $b$; vuelve de $b$ a $a$ por la rama de abajo ($1{,}59\,\text{A}$, empujada por la batería de $14\,\text{V}$) y por la de arriba ($0{,}25\,\text{A}$). Control en el nudo: $-0{,}25 + 1{,}84 - 1{,}59 = 0$.

::: aclaracion
Los valores exactos son $I_1 = -\frac{26}{103}\,\text{A}$, $I_2 = \frac{190}{103}\,\text{A}$ e $I_3 = -\frac{164}{103}\,\text{A}$. Si en la hoja alguna batería estaba con el $+$ abajo, cambian los signos de esa fem en las mallas y los números. El botón **I** del circuito muestra las corrientes calculadas por la app, para controlar.
:::
:::
:::

## Circuito 2

::: ejercicio Calcular $I_1$, $I_2$, $I_3$ y la potencia en la resistencia de $3\,\Omega$
```circuito
titulo: Problema 28.17 del Serway (corrientes con el sentido de la hoja)
R (0,0) (0,3) ; 8 ; izquierda
cable (0,3) (2,3)
cable (2,3) (2,2.6)
R (2,2.6) (2,1.9) ; 5 ; izquierda
R (2,1.9) (2,1.2) ; 1 ; izquierda
bateria (2,0.4) (2,1) ; 4 ; izquierda
cable (2,1) (2,1.2)
cable (2,0.4) (2,0)
R (2,3) (3.6,3) ; 3
R (3.6,3) (3.6,2) ; 1 ; derecha
bateria (3.6,0.8) (3.6,1.6) ; 12 ; derecha
cable (3.6,2) (3.6,1.6)
cable (3.6,0.8) (3.6,0) (0,0)
nodo (2,3) ; "a"
nodo (2,0) ; "b"
tierra (2,0)
corriente (0.9,3) (1.6,3) ; "$I_1$"
corriente (2.4,3.3) (3,3.3) ; "$I_3$"
corriente (2,2.95) (2,2.65) ; "$I_2$" ; derecha
```

Se toman las baterías con el **$+$ arriba**, como en la hoja: así coincide con las respuestas del Serway. $I_1$ llega al nudo $a$ desde la rama de $8\,\Omega$, $I_3$ sale hacia la de $3\,\Omega$ e $I_2$ baja por la del medio.

::: solucion
**① Nudo $a$:** entra $I_1$ y salen $I_2$ e $I_3$.

$$
I_1 = I_2 + I_3
$$

**② Mallas**, recorridas desde $a$:

::: pasos
// Izquierda: se baja por el medio a favor de $I_2$ ($6\,\Omega$ y la batería de $4\,\text{V}$ de $+$ a $-$) y se sube por $8\,\Omega$ a favor de $I_1$:
-6\,I_2 - 4 - 8\,I_1 = 0
// Derecha: se va por $3$ y $1\,\Omega$ a favor de $I_3$, se baja por la de $12\,\text{V}$ de $+$ a $-$ y se sube por el medio contra $I_2$:
-4\,I_3 - 12 + 6\,I_2 + 4 = 0
:::

**③ Resolver:**

::: pasos
I_1 = -\frac{3\,I_2 + 2}{4} \qquad I_3 = \frac{3\,I_2 - 4}{2}
-\frac{3\,I_2 + 2}{4} = I_2 + \frac{3\,I_2 - 4}{2}       // en el nudo
-3\,I_2 - 2 = 4\,I_2 + 6\,I_2 - 8       // multiplicando por $4$
13\,I_2 = 6 \then I_2 \approx 0{,}46\,\text{A}
I_1 = -\frac{3\cdot 0{,}46 + 2}{4} \approx -0{,}85\,\text{A}
I_3 = \frac{3\cdot 0{,}46 - 4}{2} \approx -1{,}31\,\text{A}
:::

**④ Potencia en $3\,\Omega$:**

$$
P_{3\Omega} = I_3^2\cdot 3\,\Omega = (1{,}31\,\text{A})^2\cdot 3\,\Omega \approx 5{,}1\,\text{W}
$$

::: resultado
$$
I_1 \approx -0{,}85\ \text{A} \qquad I_2 \approx 0{,}46\ \text{A} \qquad I_3 \approx -1{,}31\ \text{A} \qquad P_{3\Omega} \approx 5{,}1\ \text{W}
$$
:::

**Interpretación:** la batería de $12\,\text{V}$ manda $1{,}31\,\text{A}$ que llega al nudo $a$ por la derecha ($I_3$ al revés de la flecha); de ahí, $0{,}85\,\text{A}$ bajan por la de $8\,\Omega$ ($I_1$ al revés de la flecha) y $0{,}46\,\text{A}$ por la del medio, que atraviesan la batería de $4\,\text{V}$ de $+$ a $-$: **esa batería se está cargando**. Coincide con el Serway: $846\,\text{mA}$, $462\,\text{mA}$ y $1{,}31\,\text{A}$.

Valores exactos: $I_1 = -\frac{11}{13}\,\text{A}$, $I_2 = \frac{6}{13}\,\text{A}$, $I_3 = -\frac{17}{13}\,\text{A}$ y $P_{3\Omega} = \frac{867}{169}\,\text{W}$.
:::
:::
