# Fuerza sobre un conductor, ley de Biot-Savart y conductores paralelos

*Clase teórica del 06/10. Completado con el Serway, sec. 29.4 (Fuerza sobre un conductor con corriente) y cap. 30 (Fuentes del campo magnético), sec. 30.1 y 30.2. Sigue de [[Movimiento de cargas en un campo magnético]].*

::: claves
**Parcial 2, magnetismo:** ley de Biot-Savart y fuerza entre campos (conductores). El resto: Kirchhoff, capacitores, inducción y una pregunta.
:::

## Fuerza sobre un conductor con corriente

Un cable con corriente son muchas cargas moviéndose: cada una siente $q\,\vec v_d\times\vec B$, y la suma es una fuerza sobre el cable.

**La experiencia.** Un cable vertical colgado entre los polos de un imán, con $\vec B$ entrante:

- sin corriente ($I = 0$), el cable queda derecho;
- con corriente **hacia arriba**, se curva hacia la **izquierda**;
- con corriente **hacia abajo**, se curva hacia la **derecha**.

Si en un tramo de largo $L$ y sección $A$ hay $n$ portadores de carga por unidad de volumen, la cantidad de cargas es $n\,A\,L$:

::: pasos
\vec F_B = (q\,\vec v_d\times\vec B)\,n\,A\,L       // la fuerza de cada carga por la cantidad de cargas
// Como $I = n\,q\,v_d\,A$ (ver [[Corriente eléctrica, resistencia y resistividad]]), y $\vec L$ apunta como la corriente:
\vec F_B = I\,\vec L\times\vec B
:::

::: resultado Fuerza sobre un conductor recto con corriente
$$
\vec F_B = I\,\vec L\times\vec B \qquad\qquad F_B = I\,L\,B\,\sen\theta
$$

- La fuerza **siempre es perpendicular** al cable y al campo.
- Si el cable es **paralelo** al campo, $F_B = 0$.
:::

::: aclaracion
En la hoja quedó $\vec F_B = I\,\vec B\times\vec L$ (como antes $q\,\vec B\times\vec v$). El orden correcto es $I\,\vec L\times\vec B$ (Serway, ec. 29.10); al revés da la fuerza en sentido contrario. Con $\vec B$ entrante y la corriente hacia arriba, $\vec L\times\vec B$ apunta a la **izquierda**, que es lo que se ve en la experiencia.
:::

## Fuentes de campo magnético: ley de Biot-Savart

Hasta acá el campo $\vec B$ estaba dado. Ahora: **¿qué campo genera una corriente?** Un trocito de cable $\dd\vec s$ con corriente $I$ produce, en un punto a distancia $r$, un campo $\dd\vec B$ con estas propiedades (Serway, sec. 30.1):

1. $\dd B \propto I$: el campo es **directamente proporcional a la corriente**.
2. $\dd B \propto \dd s$: depende del largo del trocito (a esos trocitos se los llama **elementos de corriente**).
3. $\dd B \propto \dfrac{1}{r^2}$: es **inversamente proporcional al cuadrado de la distancia**.
4. $\dd\vec B \perp \dd\vec s$: el campo es **perpendicular al elemento** que lleva la corriente.
5. $\dd\vec B \perp \hat r$: el campo es perpendicular a la dirección que va del elemento al punto.
6. $\dd B \propto \sen\theta$, siendo $\theta$ el ángulo entre $\dd\vec s$ y $\hat r$.

Todo eso junto:

::: resultado Ley de Biot-Savart
$$
\dd\vec B = \frac{\mu_0}{4\pi}\,\frac{I\,\dd\vec s\times\hat r}{r^2} \qquad\qquad \vec B = \frac{\mu_0\,I}{4\pi}\int\frac{\dd\vec s\times\hat r}{r^2}
$$

**Módulo:** $B = \dfrac{\mu_0\,I}{4\pi}\displaystyle\int\frac{\dd s\,\sen\theta}{r^2}$

$\mu_0$ es la **permeabilidad del vacío**: $\mu_0 = 4\pi\times10^{-7}\ \dfrac{\text{T}\cdot\text{m}}{\text{A}}$.
:::

**Dirección y sentido: regla de la mano derecha.** Con el **pulgar** en el sentido de la corriente, los **dedos** se cierran en el sentido de las líneas de campo, que son **circunferencias** alrededor del cable. Las líneas de campo magnético **siempre son cerradas**.

```grafico
titulo: Corriente saliente ($\odot$): las líneas de $\vec B$ son circunferencias en sentido antihorario
animar: no
(0.7*cos(t), 0.7*sin(t)) ; t: 0..2*pi ; azul ; flecha ; ""
(1.3*cos(t), 1.3*sin(t)) ; t: 0..2*pi ; azul ; flecha ; ""
(1.9*cos(t), 1.9*sin(t)) ; t: 0..2*pi ; azul ; flecha ; ""
punto (0, 0) ; ""
texto (0, -0.25) "$\odot\ I$"
texto (2.25, 1.6) "$\vec B$"
x: -2.6..2.6
y: -2.2..2.2
alto: 280
```

::: observacion
Notación: $\odot$ es corriente (o campo) **saliente** de la hoja y $\otimes$, **entrante**. Con la corriente entrante, las líneas giran en sentido horario.
:::

## Aplicaciones

### 1. Conductor recto delgado

Un cable recto por el eje $x$ con corriente $I$, y un punto $P$ a distancia $a$ del cable. Cuando se pide el campo en un punto alrededor de un conductor, **$a$ es la distancia perpendicular** al cable. Cada elemento $\dd x$ se ve desde $P$ con un ángulo $\alpha$ medido desde la perpendicular.

```grafico
titulo: Conductor recto: el elemento $\dd x$ se ve desde $P$ con el ángulo $\alpha$
animar: no
segmento (-3, 0) (3, 0) ; gris ; gruesa ; ""
vector (1.6, -0.25) (2.6, -0.25) ; rojo ; "$I$"
punto (0, 1.8) ; "$P$"
segmento (0, 1.8) (0, 0) ; gris ; punteada
segmento (0, 1.8) (-1.3, 0) ; azul ; ""
poligono (-1.4, -0.06) (-1.2, -0.06) (-1.2, 0.06) (-1.4, 0.06) ; rojo ; ""
texto (-1.3, -0.3) "$\dd x$"
texto (0.2, 0.9) "$a$"
texto (-0.85, 1.05) "$r$"
texto (-0.2, 1.3) "$\alpha$"
texto (-0.65, -0.3) "$x$"
x: -3.2..3.2
y: -0.6..2.2
alto: 240
```

Con $\theta$ el ángulo entre $\dd\vec s$ y $\hat r$, $\sen\theta = \cos\alpha$, y por la geometría:

::: pasos
\dd B = \frac{\mu_0\,I}{4\pi}\,\frac{\dd x\,\cos\alpha}{r^2}       // $|\dd\vec s\times\hat r| = \dd x\,\sen\theta = \dd x\,\cos\alpha$
\cos\alpha = \frac{a}{r} \then r^2 = \frac{a^2}{\cos^2\alpha}
\dd B = \frac{\mu_0\,I}{4\pi}\,\frac{\dd x\,\cos\alpha\,\cos^2\alpha}{a^2}
\tg\alpha = \frac{-x}{a} \then x = -a\,\tg\alpha \then \dd x = -\frac{a\,\dd\alpha}{\cos^2\alpha}
\dd B = \frac{\mu_0\,I}{4\pi}\cdot\frac{-a\,\dd\alpha}{\cos^2\alpha}\cdot\frac{\cos\alpha\,\cos^2\alpha}{a^2} = -\frac{\mu_0\,I}{4\pi a}\,\cos\alpha\,\dd\alpha
B = -\frac{\mu_0\,I}{4\pi a}\int_{\alpha_2}^{\alpha_1}\cos\alpha\,\dd\alpha = -\frac{\mu_0\,I}{4\pi a}\,\sen\alpha\,\Big|_{\alpha_2}^{\alpha_1}
:::

::: resultado Conductor recto de largo finito
$$
B = \frac{\mu_0\,I}{4\pi a}\,\big(\sen\alpha_1 - \sen\alpha_2\big)
$$

$\alpha_1$ y $\alpha_2$ son los ángulos con que se ven los extremos del cable desde $P$, medidos desde la perpendicular: positivo de un lado ($\alpha_1$) y negativo del otro ($\alpha_2$). (¿Y el signo menos? Como $x = -a\,\tg\alpha$, cuando $x$ recorre el cable de izquierda a derecha, $\alpha$ va de $\alpha_1$ a $\alpha_2$: la integral en $x$ es $\int_{\alpha_1}^{\alpha_2}$, que es menos la de arriba, y el menos se cancela. El Serway hace la misma cuenta con los ángulos $\theta$ medidos desde el cable y llega a $\cos\theta_1 - \cos\theta_2$, ej. 30.1.)
:::

**Si el conductor es infinito**, sus extremos se ven a $\alpha_1 = \frac{\pi}{2}$ y $\alpha_2 = -\frac{\pi}{2}$:

::: pasos
B = \frac{\mu_0\,I}{4\pi a}\left[\sen\frac{\pi}{2} - \sen\left(-\frac{\pi}{2}\right)\right] = \frac{\mu_0\,I}{4\pi a}\,\big[1 - (-1)\big]
:::

::: resultado Conductor recto infinito
$$
B = \frac{\mu_0\,I}{2\pi a}
$$
:::

::: ejemplo Ejemplo del pizarrón: por un cable recto muy largo circula $I = 2\,\text{A}$ (entrante). ¿Cuánto vale $B$ a $10\,\text{cm}$ del cable?
::: solucion
$$
B = \frac{\mu_0\,I}{2\pi a} = \frac{4\pi\times10^{-7}\,\frac{\text{T}\cdot\text{m}}{\text{A}}\cdot 2\,\text{A}}{2\pi\cdot 0{,}1\,\text{m}} = 4\times10^{-6}\ \text{T}
$$

Como la corriente es entrante, las líneas de campo giran en sentido horario alrededor del cable.

*(En la foto del pizarrón el dato de la distancia se lee a medias; si no era $10\,\text{cm}$, la cuenta es la misma con otro $a$.)*
:::
:::

### 2. Campo en el eje de una espira de corriente circular

Una espira circular de radio $a$ con corriente $I$, y un punto $P$ sobre su eje a distancia $x$ del centro. Cada elemento $\dd\vec s$ está a la misma distancia de $P$, $r = \sqrt{a^2 + x^2}$, y es perpendicular a $\hat r$ ($\theta = 90°$). Los $\dd\vec B$ de elementos opuestos tienen componentes **perpendiculares** al eje que se **cancelan**, y las componentes **horizontales** (a lo largo del eje) **se van sumando** (Serway, ej. 30.3):

::: pasos
\dd B = \frac{\mu_0\,I}{4\pi}\,\frac{\dd s}{a^2 + x^2}       // $\sen\theta = 1$
\dd B_x = \dd B\,\cos\phi = \dd B\,\frac{a}{\sqrt{a^2 + x^2}}       // la componente a lo largo del eje
B_x = \frac{\mu_0\,I\,a}{4\pi\,(a^2 + x^2)^{3/2}}\oint \dd s = \frac{\mu_0\,I\,a}{4\pi\,(a^2 + x^2)^{3/2}}\cdot 2\pi a       // $\oint \dd s$ es el perímetro
:::

::: resultado Espira circular, en un punto del eje
$$
B_x = \frac{\mu_0\,I\,a^2}{2\,(a^2 + x^2)^{3/2}}
$$
:::

- **En el centro de la espira** ($x = 0$): $B_x = \dfrac{\mu_0\,I\,a^2}{2\,a^3}$, o sea $B = \dfrac{\mu_0\,I}{2\,a}$.
- **En un punto muy lejos** ($x \gg a$): $a^2 + x^2 \approx x^2$, y queda $B_x \approx \dfrac{\mu_0\,I\,a^2}{2\,x^3}$.

::: observacion
Lejos, la espira se comporta como un **imán de barra** chiquito, con un polo norte y uno sur (un dipolo magnético). Muchas espiras juntas forman un **solenoide** (una bobina), que adentro tiene un campo casi uniforme, como el de un imán (en el pizarrón quedaron dibujados los dos).
:::

## Fuerza magnética entre dos conductores paralelos

Dos cables paralelos de largo $L$, separados una distancia $a$, con corrientes $I_1$ e $I_2$. Cada uno genera un campo en el lugar del otro, y ese campo le hace fuerza:

::: pasos
B_2 = \frac{\mu_0\,I_2}{2\pi a}       // campo del cable 2 donde está el 1 (cable infinito)
F_{B1} = I_1\,L\,B_2 = I_1\,\frac{\mu_0\,I_2}{2\pi a}\,L       // fuerza sobre el cable 1, con $\vec L \perp \vec B_2$
F_{B2} = I_2\,L\,B_1 = I_2\,\frac{\mu_0\,I_1}{2\pi a}\,L       // y sobre el 2: da lo mismo
:::

::: resultado Fuerza entre dos conductores paralelos
$$
F_B = \frac{\mu_0\,I_1\,I_2\,L}{2\pi a} \qquad\qquad \frac{F_B}{L} = \frac{\mu_0\,I_1\,I_2}{2\pi a}
$$

- Corrientes en el **mismo sentido**: se **atraen**.
- Corrientes en **sentidos opuestos**: se **repelen**.

Las dos fuerzas son iguales y opuestas (acción y reacción) (Serway, sec. 30.2).
:::

```grafico
titulo: Corrientes en el mismo sentido: cada cable atrae al otro
animar: no
segmento (-2.5, 1) (2.5, 1) ; gris ; gruesa ; ""
segmento (-2.5, -1) (2.5, -1) ; gris ; gruesa ; ""
vector (1.6, 1.25) (2.5, 1.25) ; rojo ; "$I_1$"
vector (1.6, -1.25) (2.5, -1.25) ; rojo ; "$I_2$"
vector (0, 1) (0, 0.25) ; verde ; "$\vec F_{B1}$"
vector (0, -1) (0, -0.25) ; verde ; "$\vec F_{B2}$"
texto (-2.4, 0) "$a$"
segmento (-2.2, 1) (-2.2, -1) ; gris ; punteada
x: -2.8..2.9
y: -1.6..1.6
alto: 240
```

::: observacion
De acá sale la definición del **ampere**: es la corriente que, circulando por dos cables paralelos separados $1\,\text{m}$, produce una fuerza de $2\times10^{-7}\,\text{N}$ por metro de cable (Serway, sec. 30.2).
:::

::: ejemplo Ejemplo del pizarrón: $I_1 = 2\,\text{A}$, $I_2 = 4\,\text{A}$, separados $a = 1\,\text{m}$. ¿Cuál es la fuerza por unidad de largo?
::: solucion
$$
\frac{F}{L} = \frac{\mu_0\,I_1\,I_2}{2\pi a} = \frac{4\pi\times10^{-7}\,\frac{\text{T}\cdot\text{m}}{\text{A}}\cdot 2\,\text{A}\cdot 4\,\text{A}}{2\pi\cdot 1\,\text{m}} = 1{,}6\times10^{-6}\ \frac{\text{N}}{\text{m}}
$$

Atractiva si las corrientes van en el mismo sentido; repulsiva si van en sentidos opuestos.
:::
:::

**El campo de los dos cables juntos** es la suma, $\vec B = \vec B_1 + \vec B_2$, con $B_1 = \frac{\mu_0\,I_1}{2\pi d_1}$ y $B_2 = \frac{\mu_0\,I_2}{2\pi d_2}$ ($d_1$, $d_2$: distancias del punto a cada cable).

- Si las corrientes van en **sentidos opuestos** ($\otimes$ y $\odot$), entre los cables los dos campos apuntan para el mismo lado y **se suman**.
- **Cuando llevan la corriente para el mismo lado**, entre los cables los campos son opuestos, y se puede encontrar un punto **donde los campos se anulan**.

::: ejemplo Con los mismos datos ($I_1 = 2\,\text{A}$, $I_2 = 4\,\text{A}$, $d = 1\,\text{m}$): a) ¿cuánto vale $B$ en el punto medio si las corrientes son opuestas? b) Si van en el mismo sentido, ¿dónde se anula el campo?
::: solucion
**a)** En el punto medio cada cable está a $\frac{d}{2} = 0{,}5\,\text{m}$, y los campos se suman:

$$
B = \frac{\mu_0}{2\pi\cdot 0{,}5\,\text{m}}\,(I_1 + I_2) = \frac{2\times10^{-7}\,\frac{\text{T}\cdot\text{m}}{\text{A}}}{0{,}5\,\text{m}}\cdot 6\,\text{A} = 2{,}4\times10^{-6}\ \text{T}
$$

**b)** Entre los cables, a distancia $x$ del cable 1, los dos campos tienen que ser iguales:

::: pasos
\frac{\mu_0\,I_1}{2\pi x} = \frac{\mu_0\,I_2}{2\pi (d - x)}
I_1\,(d - x) = I_2\,x \then x = \frac{I_1\,d}{I_1 + I_2} = \frac{2\cdot 1\,\text{m}}{6} \approx 0{,}33\,\text{m}
:::

Se anula a $\frac{1}{3}\,\text{m}$ del cable de $2\,\text{A}$: más cerca del cable con **menos** corriente.

*(Ejemplo armado con los datos del pizarrón; en la hoja quedó el planteo sin la cuenta.)*
:::
:::
