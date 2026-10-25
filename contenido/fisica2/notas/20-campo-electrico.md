# Campo eléctrico y varias cargas puntuales

*Clase teórica del 02/06. Completado con el Serway, cap. 23 (Campos eléctricos).*

::: aclaracion
Esta clase es el **borde entre los dos parciales**: el campo de cargas puntuales entró en el parcial 1 (16/06); el campo generado por **cuerpos cargados**, que se anunció al final, es lo primero del parcial 2 y sigue en [[Líneas de campo, flujo y ley de Gauss]].
:::

## Fuerzas a distancia

La ley de Coulomb da la fuerza entre dos cargas puntuales:

$$
F_e = k_0\,\frac{|q_1|\,|q_2|}{d^2} \qquad\qquad k_0 = 9\times10^9\ \frac{\text{N}\,\text{m}^2}{\text{C}^2}
$$

Es de **atracción** si las cargas tienen signos opuestos y de **repulsión** si tienen el mismo signo. Las fuerzas a distancia (gravitatoria, eléctrica, magnética) actúan a través de un **campo**.

## Campo eléctrico

::: definicion Campo eléctrico
Es la fuerza por unidad de carga que sentiría una **carga de prueba positiva** $q_0$ puesta en el punto:

$$
\vec E = \frac{\vec F_e}{q_0} \qquad [E] = \frac{\text{N}}{\text{C}} \qquad\qquad \vec F_e = q_0\,\vec E
$$
:::

Para una carga puntual $q$, a una distancia $d$:

::: resultado Campo de una carga puntual
$$
E = k_0\,\frac{|q|}{d^2}
$$
:::

- Es un **vector**: tiene módulo, dirección y sentido. El sentido es el de la fuerza sobre una carga **positiva**: sale de las cargas positivas y entra en las negativas.
- $E \propto \dfrac{1}{d^2}$ y $E \propto q$.
- **El campo siempre está**: no depende de la carga de prueba que se ponga para medirlo (Serway, sec. 23.4).

```grafico
titulo: Carga positiva: el campo sale. Carga negativa: el campo entra
carga (-1.8, 0) ; +1
carga (1.8, 0) ; -1
x: -3.6..3.6
y: -2..2
lineas: 10
```

## Campo generado por varias cargas puntuales

El campo total es la **suma vectorial** de los campos de cada carga (principio de superposición, Serway sec. 23.4):

$$
\vec E = \vec E_1 + \vec E_2 + \vec E_3
\qquad\then\qquad
\begin{cases} E_x = E_{1x} + E_{2x} + E_{3x} \\ E_y = E_{1y} + E_{2y} + E_{3y} \end{cases}
\qquad\qquad
E = \sqrt{E_x^2 + E_y^2}
$$

::: observacion
Se suma **por componentes** (método de las componentes de vectores): cada campo se descompone con su ángulo, $E_x = E\cos\alpha$, $E_y = E\sen\alpha$, se suman las $x$ por un lado y las $y$ por el otro, y al final se arma el módulo. Los ejercicios están en [[Campo eléctrico: ejercicios 6.5 a 6.10]].
:::

## Campo generado por cuerpos cargados

*No entró en el primer parcial.* Se anunciaron tres casos, que se desarrollan con la ley de Gauss en las clases siguientes:

- **esfera sólida** cargada: desde afuera es como si toda la carga estuviera en un punto, el centro;
- **esfera hueca** (cáscara);
- **esfera conductora**: la carga se va a la superficie.

## Ejercicio tipo parcial: péndulo con carga en un campo

En la clase se planteó este tipo de ejercicio: una esferita cargada colgada de un hilo, dentro de un campo eléctrico horizontal, queda en equilibrio inclinada. Las fuerzas son el peso $P = m\,g$, la fuerza eléctrica $F_e = q\,E$ y la tensión $T$ del hilo. Es el ejercicio 6.12 de la guía.

::: ejemplo Un péndulo con una esfera de $2\,\text{g}$ está en un campo eléctrico horizontal de $5000\,\text{N/C}$. En equilibrio forma un ángulo de $25°$ con la vertical. ¿Cuál es la carga de la esfera?
```grafico
segmento (0, 2) (0.845, 0.188) ; gris ; gruesa ; "hilo"
segmento (-1, 2) (1, 2) ; gris
(0.845, 0.188) ; "$q$"
vector (0.845, 0.188) (0.845, -0.8) ; rojo ; "$P = m\,g$"
vector (0.845, 0.188) (1.75, 0.188) ; azul ; "$F_e = q\,E$"
vector (0.845, 0.188) (0.4, 1.14) ; verde ; "$T$"
segmento (0, 2) (0, 0.6) ; gris ; punteada
texto (0.12, 1.25) "$25°$"
x: -1.2..2.3
y: -1..2.3
```

::: solucion
**Equilibrio** ($\sum F = 0$), descomponiendo la tensión:

::: pasos
// Horizontal, $\sum F_x = 0$:
T\sen 25° = q\,E
// Vertical, $\sum F_y = 0$:
T\cos 25° = m\,g
// Dividiendo la primera por la segunda se va $T$:
\tg 25° = \frac{q\,E}{m\,g}
\then q = \frac{m\,g\,\tg 25°}{E} = \frac{0{,}002\,\text{kg}\cdot 9{,}8\,\frac{\text{m}}{\text{s}^2}\cdot 0{,}466}{5000\,\frac{\text{N}}{\text{C}}}
:::

::: resultado
$$
q \approx 1{,}83\times10^{-6}\ \text{C} = 1{,}83\ \mu\text{C}
$$
:::
:::
:::

## Lo que se anunció del parcial 1 (16/06)

- Se toma **termodinámica** y **fuerza y campo** (hasta esta clase).
- Más que nada **verdadero o falso**, marcar y gráficos, sin preguntas a desarrollar, **todo con justificación**.
- Temas marcados: tipos de variables (de transformación o de proceso, como $Q$ y $W$; de estado); cómo funciona el calorímetro; la ley de Coulomb; el rendimiento de las máquinas térmicas y el ciclo de Carnot (rendimiento máximo); un ejercicio tipo péndulo como el de arriba.
