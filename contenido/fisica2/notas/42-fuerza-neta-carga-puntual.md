# Fuerza neta sobre una carga puntual

Método para los ejercicios tipo **6.1 y 6.2** de la guía: varias cargas quietas, y se pide la fuerza neta sobre una de ellas. Se resuelve **mirando las fuerzas en el dibujo** y sumando por componentes. Teoría: [[Campo eléctrico y varias cargas puntuales]].

::: claves
- **Coulomb (módulo):** $F = k_0\,\dfrac{|q_1|\,|q_2|}{d^2}$, con $k_0 = 9\times10^9\ \dfrac{\text{N}\,\text{m}^2}{\text{C}^2}$. Las cargas van **en valor absoluto**: el signo solo decide el sentido.
- **Unidades SI:** carga en **C**, distancia en **m**, fuerza en **N**.
- **Mismo signo se repelen, distinto signo se atraen.**
- **La fuerza es un vector:** se suma por componentes, **nunca** sumando módulos.
:::

## Unidades y conversiones

| Dato | Unidad SI | Conversión |
|---|---|---|
| Carga | C (coulomb) | $1\,\mu\text{C} = 10^{-6}\,\text{C}$ · $1\,\text{nC} = 10^{-9}\,\text{C}$ · $1\,\text{pC} = 10^{-12}\,\text{C}$ |
| Distancia | m | $1\,\text{cm} = 10^{-2}\,\text{m}$ · $1\,\text{mm} = 10^{-3}\,\text{m}$ |
| Fuerza | N (newton) | resultado |

- **Para convertir, se reemplaza el prefijo por la potencia:** $7\,\mu\text{C} = 7\times10^{-6}\,\text{C}$; $50\,\text{cm} = 0{,}5\,\text{m}$.
- **Las unidades cierran:** $\dfrac{\text{N}\,\text{m}^2}{\text{C}^2}\cdot\dfrac{\text{C}\cdot\text{C}}{\text{m}^2} = \text{N}$.
- **Orden de magnitud:** con cargas de µC a distancias de metros, las fuerzas dan **centésimas a unidades de N**. Si da $10^9\,\text{N}$, faltó convertir.
- **La distancia va al cuadrado:** dejarla en cm multiplica el error por $10\,000$.
- **En la calculadora:** $7\times10^{-6}$ se escribe `7E-6`, y el modo tiene que estar en **grados** (DEG).

## El método

::: pasos
// **1. Datos y posiciones.** Cargas en C, posiciones en m. Si una posición no está dada, se calcula (ver la sección siguiente).
q_1,\ q_2,\ \dots \text{ en C} \qquad P_1,\ P_2,\ \dots \text{ en m}
// **2. Dibujo.** Una flecha sobre la carga pedida por cada una de las **otras** cargas: se **aleja** si tienen el mismo signo, va **hacia** la otra si tienen distinto signo.
\text{repulsión: se aleja} \qquad \text{atracción: se acerca}
// **3. Módulos** con Coulomb, cargas en valor absoluto:
F_{ij} = k_0\,\frac{|q_i|\,|q_j|}{d_{ij}^2}
// **4. Ángulo de cada flecha**, medido desde el semieje $+x$, en sentido antihorario (de $0°$ a $360°$):
\theta \text{ de la flecha, no de la recta}
// **5. Componentes:** con el ángulo de la flecha, los signos salen solos.
F_x = F\cos\theta \qquad F_y = F\sen\theta
// **6. Suma** de las $x$ por un lado y de las $y$ por el otro:
\vec F_{neta} = \left(\sum F_x\right)\hat\imath + \left(\sum F_y\right)\hat\jmath
// **7. Módulo y ángulo,** si los piden:
|\vec F| = \sqrt{F_x^2 + F_y^2} \qquad \theta = \arctan\frac{F_y}{F_x}\ \ (+180°\ \text{si}\ F_x < 0)
:::

### Ángulos de referencia

| La flecha apunta... | Ángulo | $\cos\theta$ | $\sen\theta$ |
|---|---|---|---|
| a la derecha | $0°$ | $1$ | $0$ |
| arriba | $90°$ | $0$ | $1$ |
| a la izquierda | $180°$ | $-1$ | $0$ |
| abajo | $270°$ | $0$ | $-1$ |

Si la flecha apunta en diagonal, el ángulo sale de la geometría de las cargas (sección siguiente). Por ejemplo, en un triángulo equilátero los lados forman $60°$ y $120°$ con la base, y sus opuestos, $240°$ y $300°$.

::: ojo
**Ángulo de la flecha, no de la recta.** La recta entre dos cargas tiene dos sentidos, que difieren en $180°$. En la atracción y en la repulsión las flechas son **opuestas**: si usás el ángulo equivocado, la fuerza sale al revés. Mirá siempre el dibujo.
:::

## Calcular posiciones, distancias y ángulos

Cuando el enunciado da una figura en lugar de coordenadas:

| Figura | Posición | Ejemplo |
|---|---|---|
| Triángulo equilátero de lado $\ell$, base de $(0;0)$ a $(\ell;0)$ | vértice de arriba: $\left(\dfrac{\ell}{2};\ \ell\,\sen 60°\right) = \left(\dfrac{\ell}{2};\ \dfrac{\sqrt3}{2}\ell\right)$ | $\ell = 0{,}5\,\text{m}$: $(0{,}25;\ 0{,}433)\ \text{m}$ |
| Punto en un círculo de radio $R$ a un ángulo $\theta$ | $(R\cos\theta;\ R\sen\theta)$ | $R = 2\,\text{m}$, $30°$: $(1{,}732;\ 1)\ \text{m}$ |
| Cuadrado de lado $a$ con un vértice en el origen | $(0;0)$, $(a;0)$, $(a;a)$, $(0;a)$ · diagonal: $a\sqrt2$ | $a = 0{,}1\,\text{m}$: diagonal $0{,}141\,\text{m}$ |
| Triángulo rectángulo con catetos $a$ y $b$ | hipotenusa: $\sqrt{a^2 + b^2}$ | catetos $3$ y $4$: $5$ |

Con dos puntos $A = (x_A;\ y_A)$ y $B = (x_B;\ y_B)$:

$$
d = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2} \qquad\qquad \alpha = \arctan\frac{y_B - y_A}{x_B - x_A}
$$

$\alpha$ es el ángulo de la recta que va **de $A$ hacia $B$** (si $x_B - x_A < 0$, sumale $180°$). La flecha sobre $B$ tiene ángulo $\alpha$ si $A$ la **repele**, y $\alpha + 180°$ si la **atrae**.

```grafico
titulo: De la figura a las coordenadas: el vértice de arriba
segmento (0, 0) (0.5, 0) ; gris ; "$\ell = 0{,}5$"
segmento (0.5, 0) (0.25, 0.433) ; gris
segmento (0.25, 0.433) (0, 0) ; gris ; "$\ell$"
segmento (0.25, 0.433) (0.25, 0) ; gris ; punteada ; "$\ell\,\sen 60°$"
(0, 0) ; "$(0;\,0)$"
(0.5, 0) ; "$(0{,}5;\,0)$"
(0.25, 0.433) ; "$(0{,}25;\,0{,}433)$"
texto (0.09, 0.04) "$60°$"
x: -0.2..0.75
y: -0.12..0.58
```

## Ejercicio 6.1: cargas sobre los ejes

::: ejemplo $q_1 = 1{,}3\,\mu\text{C}$ en $(-0{,}5;\,0)\,\text{m}$, $q_2 = 3{,}2\,\mu\text{C}$ en $(0;\,1{,}5)\,\text{m}$ y $q_3 = 2{,}5\,\mu\text{C}$ en el origen. Fuerza neta sobre $q_3$
```grafico
carga (-0.5, 0) ; +1.3
carga (0, 1.5) ; +3.2
carga (0, 0) ; +2.5
texto (-0.5, -0.22) "$q_1$"
texto (0.25, 1.5) "$q_2$"
texto (-0.2, 0.22) "$q_3$"
vector (0, 0) (1.17, 0) ; azul ; "$\vec F_{13}$"
vector (0, 0) (0, -0.32) ; rojo ; "$\vec F_{23}$"
vector (0, 0) (1.17, -0.32) ; verde ; gruesa ; "$\vec F$"
lineas: 4
animar: no
x: -0.9..1.6
y: -0.7..1.8
```

::: solucion
Las tres son positivas: se repelen. $q_1$ empuja a $q_3$ hacia la **derecha** ($0°$) y $q_2$ la empuja hacia **abajo** ($270°$).

::: pasos
F_{13} = 9\times10^9\cdot\frac{1{,}3\times10^{-6}\cdot2{,}5\times10^{-6}}{0{,}5^2} = 0{,}117\ \text{N}            // a $0°$
F_{23} = 9\times10^9\cdot\frac{3{,}2\times10^{-6}\cdot2{,}5\times10^{-6}}{1{,}5^2} = 0{,}032\ \text{N}            // a $270°$
\textstyle\sum F_x = 0{,}117\cos 0° + 0{,}032\cos 270° = 0{,}117\ \text{N}
\textstyle\sum F_y = 0{,}117\sen 0° + 0{,}032\sen 270° = -0{,}032\ \text{N}
:::

::: resultado
$$
\vec F_3 = (0{,}117\,\hat\imath - 0{,}032\,\hat\jmath)\ \text{N} \qquad |\vec F_3| \approx 0{,}121\ \text{N},\ \theta \approx 344{,}7°
$$
:::
:::
:::

## Ejercicio 6.2: triángulo equilátero

::: ejemplo Cargas de $2\,\mu\text{C}$, $7\,\mu\text{C}$ y $-4\,\mu\text{C}$ en los vértices de un triángulo equilátero de lado $0{,}5\,\text{m}$ (fig. 6.2). Fuerza neta sobre la de $7\,\mu\text{C}$
```grafico
carga (0, 0) ; +2
carga (0.5, 0) ; -4
carga (0.25, 0.433) ; +7
texto (0, -0.07) "$q_1$"
texto (0.5, -0.07) "$q_3$"
texto (0.15, 0.48) "$q_2$"
vector (0.25, 0.433) (0.452, 0.782) ; azul ; "$\vec F_{12}$"
vector (0.25, 0.433) (0.653, -0.265) ; rojo ; "$\vec F_{32}$"
vector (0.25, 0.433) (0.855, 0.084) ; verde ; gruesa ; "$\vec F$"
lineas: 4
animar: no
x: -0.3..1.1
y: -0.4..0.95
```

::: solucion
**Posiciones:** $q_1$ en $(0;\,0)$, $q_3$ en $(0{,}5;\,0)$ y $q_2$ en el vértice de arriba, $(0{,}25;\ 0{,}433)\,\text{m}$. Las dos distancias son el lado, $0{,}5\,\text{m}$.

**Dibujo:**

- $q_1$ y $q_2$ son positivas: **repulsión**. La flecha se aleja de $q_1$, por el lado del triángulo: **$60°$**.
- $q_3$ es negativa: **atracción**. La flecha va hacia $q_3$, abajo a la derecha: **$300°$** (no $120°$, que sería alejarse).

::: pasos
F_{12} = 9\times10^9\cdot\frac{2\times10^{-6}\cdot7\times10^{-6}}{0{,}5^2} = 0{,}504\ \text{N}            // a $60°$
F_{32} = 9\times10^9\cdot\frac{4\times10^{-6}\cdot7\times10^{-6}}{0{,}5^2} = 1{,}008\ \text{N}            // a $300°$
\textstyle\sum F_x = 0{,}504\cos 60° + 1{,}008\cos 300° = 0{,}252 + 0{,}504 = 0{,}756\ \text{N}
\textstyle\sum F_y = 0{,}504\sen 60° + 1{,}008\sen 300° = 0{,}436 - 0{,}873 = -0{,}437\ \text{N}
:::

::: resultado
$$
\vec F_2 = (0{,}756\,\hat\imath - 0{,}437\,\hat\jmath)\ \text{N} \qquad |\vec F_2| \approx 0{,}873\ \text{N},\ \theta \approx 330°
$$
:::
:::
:::

## Errores típicos

::: ojo
1. **No convertir** µC a C o cm a m.
2. **Sumar módulos** ($0{,}504 + 1{,}008$) en lugar de componentes.
3. **Usar el ángulo de la recta y no el de la flecha:** en la atracción, la flecha apunta hacia la otra carga.
4. **Poner el signo dos veces:** si el ángulo ya es el de la flecha ($300°$), el $\cos$ y el $\sen$ dan los signos; no agregues un menos a mano.
5. **Incluir la fuerza de la carga sobre sí misma:** solo cuentan las **otras** cargas.
6. **Calculadora en radianes,** o ángulo final sin corregir cuando $F_x < 0$.
7. **Olvidar el N** en los resultados intermedios y en el final.
:::

## Lo mismo sirve para el campo eléctrico

El campo es la fuerza por unidad de carga, $\vec E = \vec F / q_0$, en $\text{N/C}$. El método es el mismo, con $E = k_0\dfrac{|q|}{d^2}$, y la flecha **sale** de las cargas positivas y **entra** en las negativas. Así se resolvieron el 6.6 y el 6.7: [[Campo eléctrico: ejercicios 6.5 a 6.10]].
