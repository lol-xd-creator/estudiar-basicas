# Campo eléctrico: ejercicios 6.5 a 6.10

*Clase práctica del 09/06 (6.5 y 6.6). El 6.7, el 6.8 y el 6.10 están en la hoja siguiente, sin fecha. Guía de trabajos prácticos, capítulo 6.*

Fórmulas (ver [[Campo eléctrico y varias cargas puntuales]]):

$$
F_e = k_0\,\frac{|q_1|\,|q_2|}{d^2} \qquad\qquad E = k_0\,\frac{|q|}{r^2} \qquad\qquad \vec F = q\,\vec E \qquad\qquad k_0 = 9\times10^9\ \frac{\text{N}\,\text{m}^2}{\text{C}^2}
$$

::: observacion
En la clase se anotó, como ejemplo de pregunta de parcial (de termodinámica): **¿qué es la energía interna $\Delta E_{int}$?** Es la energía cinética de los átomos y moléculas: su vibración y el movimiento de la posición de los átomos dentro de las moléculas. Y para el parcial: 3 ejercicios prácticos, 1 pregunta del laboratorio, y estudiar unidades y conversiones.
:::

## Ejercicio 6.5

::: ejercicio Dos esferas de radios y pesos iguales cuelgan de dos hilos y sus superficies se tocan. Al darles una carga $q = 0{,}4\,\mu\text{C}$ a cada una, se repelen y los hilos forman un ángulo de $60°$. Hallar el peso de las esferas si la distancia de la suspensión al centro de cada esfera es $\ell = 20\,\text{cm}$
```grafico
segmento (0, 2) (-1, 0.268) ; gris ; gruesa ; "$\ell$"
segmento (0, 2) (1, 0.268) ; gris ; gruesa
segmento (-1.4, 2) (1.4, 2) ; gris
segmento (0, 2) (0, 0.8) ; gris ; punteada
texto (0, 0.6) "$60°$"
(-1, 0.268) ; "$q$"
(1, 0.268) ; "$q$"
vector (1, 0.268) (1.8, 0.268) ; azul ; "$F_e$"
vector (1, 0.268) (1, -0.6) ; rojo ; "$P$"
vector (1, 0.268) (0.55, 1.05) ; verde ; "$T$"
x: -1.8..2.3
y: -0.8..2.3
```

Intentalo antes de abrir la solución: ¿a qué distancia quedan las cargas? Después, equilibrio de fuerzas en una de las esferas.

::: solucion
**La distancia entre las cargas.** Los dos hilos de $20\,\text{cm}$ con $60°$ entre ellos y la recta que une las esferas forman un triángulo **equilátero**: $d = \ell = 0{,}20\,\text{m}$. Cada hilo forma $30°$ con la vertical.

**Fuerza eléctrica:**

$$
F_e = k_0\,\frac{q^2}{d^2} = 9\times10^9\cdot\frac{\left(0{,}4\times10^{-6}\right)^2}{(0{,}20)^2} = 0{,}036\ \text{N}
$$

**Equilibrio** en la esfera de la derecha ($\sum F = 0$), con la tensión a $30°$ de la vertical:

::: pasos
// Horizontal, $\sum F_x = 0$:
T\sen 30° = F_e \then T = \frac{0{,}036\,\text{N}}{0{,}5} = 0{,}072\ \text{N}
// Vertical, $\sum F_y = 0$:
P = T\cos 30° = 0{,}072\,\text{N}\cdot 0{,}866
:::

::: resultado
$$
P \approx 0{,}062\ \text{N}
$$
:::

En la clase se planteó igual, con los ángulos medidos desde la horizontal: $T\cos 120° + F_e\cos 0° = 0$ y $T\sen 120° + P\sen 270° = 0$. Da lo mismo.
:::
:::

## Ejercicio 6.6

::: ejercicio Una carga $q = -5{,}2\,\mu\text{C}$ está en el origen. Hallar el campo eléctrico en a) $p_1 = (3;0)\,\text{m}$, b) $p_2 = (0;-4)\,\text{m}$ y c) $p_3 = (2;2)\,\text{m}$
```grafico
(0, 0) ; "$q$"
(3, 0) ; "$p_1$"
(0, -4) ; "$p_2$"
(2, 2) ; "$p_3$"
x: -1..4
y: -4.6..3

```

::: solucion
**Módulos** con $E = k_0\frac{|q|}{r^2}$:

::: pasos
E_1 = 9\times10^9\cdot\frac{5{,}2\times10^{-6}}{3^2} = 5200\ \frac{\text{N}}{\text{C}}
E_2 = 9\times10^9\cdot\frac{5{,}2\times10^{-6}}{4^2} = 2925\ \frac{\text{N}}{\text{C}}
E_3 = 9\times10^9\cdot\frac{5{,}2\times10^{-6}}{\left(\sqrt 8\right)^2} = 5850\ \frac{\text{N}}{\text{C}}            // $r_3 = \sqrt 8$
:::

**Sentidos.** La carga es **negativa**: el campo apunta **hacia la carga**.

```grafico
titulo: El campo de una carga negativa apunta hacia ella
carga (0, 0) ; -1
vector (3, 0) (2, 0) ; rojo ; "$\vec E_1$"
vector (0, -4) (0, -3) ; rojo ; "$\vec E_2$"
vector (2, 2) (1.3, 1.3) ; rojo ; "$\vec E_3$"
(3, 0) ; "$p_1$"
(0, -4) ; "$p_2$"
(2, 2) ; "$p_3$"
animar: no
x: -1.5..4
y: -4.6..3

```

::: resultado
$$
\vec E_1 = -5200\,\hat\imath\ \frac{\text{N}}{\text{C}} \qquad \vec E_2 = 2925\,\hat\jmath\ \frac{\text{N}}{\text{C}} \qquad \vec E_3 = 5850\ \frac{\text{N}}{\text{C}}\ \text{a}\ 225°
$$
:::
:::
:::

## Ejercicio 6.7

::: ejercicio Tres cargas puntuales idénticas de $-5\,\mu\text{C}$ están sobre un círculo de radio $2\,\text{m}$, a $30°$, $150°$ y $270°$. Hallar el campo eléctrico resultante en el centro
```grafico
x^2 + y^2 = 4 ; gris ; punteada ; ""
carga (1.732, 1) ; -1
carga (-1.732, 1) ; -1
carga (0, -2) ; -1
(0, 0) ; "centro"
x: -3..3
y: -2.6..2.6

```

::: solucion
Las tres cargas son iguales y están a la misma distancia del centro: los tres campos tienen el **mismo módulo**, $E = k_0\frac{|q|}{r^2}$. Cada uno apunta hacia su carga (son negativas), es decir, a $30°$, $150°$ y $270°$.

Por componentes:

::: pasos
E_x = E\left(\cos 30° + \cos 150° + \cos 270°\right)
    = E\left(0{,}866 - 0{,}866 + 0\right) = 0
E_y = E\left(\sen 30° + \sen 150° + \sen 270°\right)
    = E\left(0{,}5 + 0{,}5 - 1\right) = 0
:::

::: resultado
$$
\vec E = \left(0\,\hat\imath + 0\,\hat\jmath\right)\ \frac{\text{N}}{\text{C}}
$$
:::

Era de esperar: tres vectores iguales separados $120°$ se cancelan por simetría.
:::
:::

## Ejercicio 6.8

::: ejercicio Tres cargas positivas iguales $q$ están en los vértices de un triángulo equilátero de lado $a$. Calcular a) el campo en el centro del triángulo y b) el campo en el vértice de arriba $P$ debido a las dos cargas de la base
```grafico
carga (0, 1.732) ; +1
carga (-1, 0) ; +1
carga (1, 0) ; +1
segmento (-1, 0) (1, 0) ; gris ; "$a$"
segmento (1, 0) (0, 1.732) ; gris
segmento (0, 1.732) (-1, 0) ; gris
texto (0.25, 1.95) "$P$"
x: -2.2..2.2
y: -0.9..2.6

lineas: 8
```

::: solucion
**a) En el centro**, las tres cargas están a la misma distancia y separadas $120°$: igual que en el 6.7, los campos se cancelan.

$$
\vec E_{centro} = 0
$$

**b) En $P$**, solo cuentan las dos cargas de la base, cada una a distancia $a$: los dos campos tienen módulo $E = k_0\frac{q}{a^2}$ y salen de cada carga (son positivas), a $60°$ y $120°$ de la horizontal.

::: pasos
E_x = E\cos 60° + E\cos 120° = 0                              // las componentes en $x$ se anulan: son opuestas
E_y = E\sen 60° + E\sen 120°
    = 2E\,\frac{\sqrt 3}{2} = \sqrt 3\,k_0\,\frac{q}{a^2}
:::

::: resultado
$$
\vec E_P = \sqrt 3\,\frac{k_0\,q}{a^2}\,\hat\jmath \qquad\text{(vertical, hacia arriba)}
$$
:::
:::
:::

## Ejercicio 6.10

::: ejercicio Un objeto con carga neta de $24\,\mu\text{C}$ está en un campo eléctrico uniforme de $610\,\text{N/C}$ dirigido verticalmente. Calcular su masa si está flotando en el campo
```grafico
placa (-2, -1.2) (2, -1.2) ; +
placa (-2, 1.2) (2, 1.2) ; -
(0, 0) ; "$q$"
animar: no
```

::: solucion
**Flota**: la fuerza eléctrica (hacia arriba) equilibra al peso.

::: pasos
F = q\,E = 24\times10^{-6}\,\text{C}\cdot 610\,\frac{\text{N}}{\text{C}} \approx 0{,}0146\ \text{N}
P = F \then m\,g = q\,E
m = \frac{q\,E}{g} = \frac{0{,}0146\,\text{N}}{9{,}8\,\frac{\text{m}}{\text{s}^2}}
:::

::: resultado
$$
m \approx 1{,}49\times10^{-3}\ \text{kg} = 1{,}49\ \text{g}
$$
:::

La guía lo redondea a $1{,}5\,\text{g}$.
:::
:::
