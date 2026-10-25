# Preguntas de repaso: magnetismo

*Cuestionario de repaso de la cátedra. Respuestas armadas con el teórico cargado y completadas con el Serway (vol. 2, cap. 29 a 31).*

| Pregunta | Tema | ¿Está en el teórico? |
|---|---|---|
| 1 | Fuerza magnética sobre una carga | sí |
| 2 | Fuerza magnética contra fuerza eléctrica | sí |
| 3 | Movimiento en un campo uniforme | sí |
| 4 | Fuerza de Lorentz y dispositivos | sí |
| 5 | Alambre con corriente en un campo | la fuerza sí; el **momento de torsión** sobre una espira, no |
| 6 | Ley de Biot-Savart | sí |
| 7 | Flujo magnético | sí |
| 8 | Ley de Faraday | sí |
| 9 | Generador de corriente alterna | sí |

## 1) Describir en forma completa la fuerza magnética sobre una partícula cargada dentro de un campo magnético

Una carga $q$ que **se mueve** con velocidad $\vec v$ en un campo $\vec B$ siente

$$
\vec F_B = q\,\vec v\times\vec B \qquad\qquad F_B = |q|\,v\,B\,\sen\theta
$$

con $\theta$ el ángulo entre $\vec v$ y $\vec B$.

- **Es directamente proporcional a** la carga $|q|$, a la velocidad $v$, al campo $B$ y al $\sen\theta$.
- **No es inversamente proporcional a nada** en esta fórmula. (Sí lo es la fuerza eléctrica de Coulomb, con $\frac{1}{d^2}$.)
- **Es nula** si la carga está **quieta** ($v = 0$) o si se mueve **paralela al campo** ($\theta = 0°$ o $180°$).
- **Es máxima**, $|q|\,v\,B$, si se mueve **perpendicular al campo** ($\theta = 90°$).
- **Se dirige** perpendicular **a la vez** a $\vec v$ y a $\vec B$: perpendicular al plano que forman. El sentido sale de la **regla de la mano derecha** (dedos según $\vec v$, se cierran hacia $\vec B$, el pulgar da $\vec F_B$) para una carga **positiva**; para una **negativa**, es el opuesto.
- **Unidad del campo:** el tesla, $\text{T} = \dfrac{\text{N}}{\text{C}\cdot\text{m/s}} = \dfrac{\text{N}}{\text{A}\cdot\text{m}}$.

```grafico
titulo: B entrante y v hacia la derecha: la fuerza sobre +q va hacia arriba y sobre −q hacia abajo
texto (-2.4, 1.6) "×"
texto (-1.2, 1.6) "×"
texto (0, 1.6) "×"
texto (1.2, 1.6) "×"
texto (2.4, 1.6) "×"
texto (-2.4, 0) "×"
texto (1.2, 0) "×"
texto (2.4, 0) "×"
texto (-2.4, -1.6) "×"
texto (0, -1.6) "×"
texto (1.2, -1.6) "×"
texto (2.4, -1.6) "×"
texto (-2.4, 2.05) "$\vec B$ entrante"
(-1.2, 0.6) ; "$+q$"
vector (-1.2, 0.6) (0.1, 0.6) ; verde ; "$\vec v$"
vector (-1.2, 0.6) (-1.2, 1.35) ; rojo ; "$\vec F_B$"
(-1.2, -0.7) ; "$-q$"
vector (-1.2, -0.7) (0.1, -0.7) ; verde ; "$\vec v$"
vector (-1.2, -0.7) (-1.2, -1.45) ; rojo ; "$\vec F_B$"
leyenda: no
x: -2.8..2.8
y: -2..2.3
```

```grafico3d
titulo: F_B = q v × B es perpendicular a v y a B (carga positiva, regla de la mano derecha)
alto: 340
vector (0, 0, 0) (2, 0, 0) ; verde ; "$\vec v$"
vector (0, 0, 0) (1, 1.7, 0) ; azul ; "$\vec B$"
vector (0, 0, 0) (0, 0, 1.8) ; rojo ; "$\vec F_B$"
poligono (0, 0, 0) (2, 0, 0) (3, 1.7, 0) (1, 1.7, 0) ; ambar ; ""
texto (0.55, 0.35, 0) "$\theta$"
x: -0.5..3
y: -0.5..2
z: 0..2
```

📍 **En el teórico:** [[Magnetismo: campo magnético y fuerza sobre una carga#Fuerza magnética sobre una carga|Sin fecha (después del 15/09) · Fuerza magnética sobre una carga]] (las 7 propiedades experimentales y el producto vectorial) y [[Movimiento de cargas en un campo magnético#Unidad del campo magnético|29/09 · Unidad del campo magnético]]. Serway, sec. 29.1.

## 2) ¿Cuáles son las semejanzas y diferencias entre la fuerza magnética y la eléctrica?

$$
\vec F_E = q\,\vec E \qquad\qquad \vec F_B = q\,\vec v\times\vec B
$$

| | Fuerza eléctrica | Fuerza magnética |
|---|---|---|
| **Semejanza:** sobre qué actúa | partículas **cargadas** | partículas **cargadas** |
| **Semejanza:** proporcional a | la carga $q$ y al campo | la carga $q$ y al campo |
| **Semejanza:** el signo de la carga | invierte el sentido | invierte el sentido |
| ¿Hace falta movimiento? | **no**: actúa aunque la carga esté quieta | **sí**: solo si la carga se mueve |
| Dirección | **paralela** al campo $\vec E$ | **perpendicular** al campo $\vec B$ y a $\vec v$ |
| ¿Hace trabajo? | **sí**: puede cambiar la rapidez y la energía cinética | **no**: es perpendicular al movimiento, solo cambia la **dirección** de la velocidad |

```grafico
titulo: Izquierda: F_E paralela a E (actúa aunque la carga esté quieta). Derecha: F_B perpendicular a B y a v
vector (-4.6, 1.1) (-1.6, 1.1) ; azul
vector (-4.6, 0) (-1.6, 0) ; azul ; "$\vec E$"
vector (-4.6, -1.1) (-1.6, -1.1) ; azul
(-3.4, 0.5) ; "$+q$"
vector (-3.4, 0.5) (-2.3, 0.5) ; rojo ; "$\vec F_E$"
texto (0.8, 1.2) "×"
texto (2, 1.2) "×"
texto (3.2, 1.2) "×"
texto (4.4, 1.2) "×"
texto (0.8, 0) "×"
texto (3.2, 0) "×"
texto (4.4, 0) "×"
texto (0.8, -1.2) "×"
texto (2, -1.2) "×"
texto (3.2, -1.2) "×"
texto (4.4, -1.2) "×"
texto (3.8, 1.65) "$\vec B$ entrante"
(2, 0) ; "$+q$"
vector (2, 0) (2, 0.9) ; verde ; "$\vec v$"
vector (2, 0) (1.1, 0) ; rojo ; "$\vec F_B$"
leyenda: no
x: -5..5
y: -1.6..1.9
```

📍 **En el teórico:** [[Movimiento de cargas en un campo magnético#Diferencias entre la fuerza eléctrica y la magnética|29/09 · Diferencias entre la fuerza eléctrica y la magnética]]. Serway, sec. 29.1.

::: aclaracion
El teórico lista las **diferencias**; las **semejanzas** (actúan sobre cargas, son proporcionales a $q$ y al campo, el signo de la carga invierte el sentido) se deducen de las dos fórmulas, pero no están escritas como lista.
:::

## 3) ¿Cómo es el movimiento de una partícula cargada dentro de un campo magnético uniforme? Graficar y explicar

```grafico
titulo: Carga positiva con v perpendicular a un campo B entrante: movimiento circular uniforme
texto (-2.2, 1.6) "×"
texto (-1.1, 1.6) "×"
texto (0, 1.6) "×"
texto (1.1, 1.6) "×"
texto (2.2, 1.6) "×"
texto (-2.2, 0) "×"
texto (2.2, 0) "×"
texto (-2.2, -1.6) "×"
texto (-1.1, -1.6) "×"
texto (0, -1.6) "×"
texto (1.1, -1.6) "×"
texto (2.2, -1.6) "×"
texto (-2.6, 2.1) "$\vec B$ entrante"
(cos(t), sen(t)) ; t: 0..2pi ; gris ; punteada ; flecha
(0, -1) ; "$+q$"
vector (0, -1) (0.9, -1) ; verde ; "$\vec v$"
vector (0, -1) (0, -0.35) ; rojo ; "$\vec F_B$"
(0, 0) ; "$r$"
leyenda: no
x: -2.9..2.9
y: -2..2.3
```

- **Si $\vec v \perp \vec B$:** la fuerza es siempre perpendicular a la velocidad, así que **no cambia la rapidez, solo la dirección**. Una fuerza de módulo constante y siempre perpendicular a la velocidad es una **fuerza centrípeta**: la partícula hace un **movimiento circular uniforme**. Igualando $|q|\,v\,B = m\,\dfrac{v^2}{r}$:

$$
r = \frac{m\,v}{|q|\,B} \qquad\qquad \omega = \frac{|q|\,B}{m} \qquad\qquad T = \frac{2\pi m}{|q|\,B}
$$

  Cuanto más rápida o pesada la partícula, más grande el círculo; cuanto más intenso el campo, más chico. El período **no depende de la velocidad**. Las cargas positivas y negativas giran en sentidos **opuestos**.
- **Si $\vec v$ es paralela a $\vec B$:** no hay fuerza y la partícula sigue en **línea recta** (MRU).
- **Si $\vec v$ forma otro ángulo con $\vec B$:** la componente paralela no cambia y la perpendicular produce el giro: la trayectoria es una **hélice** (un resorte) alrededor de las líneas de campo, con $r = \dfrac{m\,v_\perp}{|q|\,B}$.

```grafico3d
titulo: Si v no es perpendicular a B, la trayectoria es una hélice alrededor de las líneas de campo
alto: 340
(cos(t), sen(t), t/6) ; t: 0..6pi ; azul
vector (1.7, 0, 0) (1.7, 0, 3.2) ; rojo ; "$\vec B$"
x: -1.6..2
y: -1.6..1.6
z: 0..3.3
```

📍 **En el teórico:** [[Movimiento de cargas en un campo magnético#Movimiento de una partícula cargada en un campo vec B uniforme|29/09 · Movimiento de una partícula cargada en un campo B uniforme]] (los dos casos, el radio, la velocidad angular y el período). Serway, sec. 29.2.

## 4) ¿Cuál es la fuerza de Lorentz? ¿En qué dispositivos se aplica?

Cuando en una región hay **campo eléctrico y campo magnético a la vez**, la fuerza total sobre una carga es la suma de las dos:

$$
\vec F = q\,\vec E + q\,\vec v\times\vec B
$$

**Dispositivos:**

- **Selector de velocidad:** $\vec E$ y $\vec B$ perpendiculares, con las dos fuerzas opuestas. Solo pasan sin desviarse las partículas que tienen $q\,E = q\,v\,B$, o sea $v = \dfrac{E}{B}$.
- **Espectrómetro de masas:** después del selector, las partículas entran a un segundo campo $B_2$ y giran en un semicírculo de radio $r = \dfrac{m\,v}{q\,B_2}$. Midiendo $r$ se obtiene la relación $\dfrac{m}{q}$: sirve para separar isótopos e identificar sustancias.
- **Ciclotrón (acelerador de partículas):** el campo $\vec B$ hace girar las partículas y un campo $\vec E$ alterno las acelera cada media vuelta, así que el radio crece en espiral. La energía de salida es $K = \dfrac{q^2 B^2 R^2}{2m}$.

```grafico
titulo: Selector de velocidad: F_E y F_B son opuestas; la partícula pasa derecho solo si v = E/B
placa (-2.6, 1.4) (2.6, 1.4) ; +
placa (-2.6, -1.4) (2.6, -1.4) ; -
texto (-2, 0.8) "×"
texto (0, 0.8) "×"
texto (2, 0.8) "×"
texto (-2, -0.8) "×"
texto (2, -0.8) "×"
texto (2.1, 1.05) "$\vec B$ entrante"
(-0.6, 0) ; "$+q$"
vector (-0.6, 0) (0.9, 0) ; verde ; "$\vec v$"
vector (-0.6, 0) (-0.6, 0.75) ; rojo ; "$\vec F_B$"
vector (-0.6, 0) (-0.6, -0.75) ; azul ; "$\vec F_E$"
lineas: 6
animar: no
leyenda: no
x: -3..3
y: -1.8..1.8
```

📍 **En el teórico:** [[Movimiento de cargas en un campo magnético#Fuerza de Lorentz|29/09 · Fuerza de Lorentz]] y [[Movimiento de cargas en un campo magnético#Aplicaciones|29/09 · Aplicaciones]] (los tres dispositivos). Serway, sec. 29.3, que además cuenta el experimento de Thomson para medir $\frac{e}{m}$ del electrón.

## 5) ¿Por qué sufre torsión un alambre que lleva corriente dentro de un campo magnético? ¿Cómo se calcula esa fuerza?

**Por qué:** una corriente son **muchas cargas en movimiento**. Cada una siente la fuerza magnética $q\,\vec v_d\times\vec B$, y la suma de todas es una fuerza sobre el alambre, que lo **desvía o lo curva**. En la experiencia de clase, un cable vertical entre los polos de un imán se curva hacia un lado o hacia el otro según el sentido de la corriente, y no se mueve si no hay corriente.

**Cómo se calcula:** sumando la fuerza de las $n\,A\,L$ cargas del tramo, y usando $I = n\,q\,v_d\,A$:

$$
\vec F_B = I\,\vec L\times\vec B \qquad\qquad F_B = I\,L\,B\,\sen\theta
$$

con $\vec L$ en el sentido de la corriente y $\theta$ el ángulo entre el cable y el campo. Es máxima con el cable **perpendicular** al campo y **nula** si es **paralelo**. Para un cable no recto, se suman los tramos: $\vec F_B = I\displaystyle\int \dd\vec s\times\vec B$.

```grafico
titulo: Cable con corriente hacia arriba en un campo entrante: la fuerza F = I L × B lo empuja a la izquierda
texto (-2, 1.2) "×"
texto (-1, 1.2) "×"
texto (1, 1.2) "×"
texto (2, 1.2) "×"
texto (-2, 0) "×"
texto (1, 0) "×"
texto (2, 0) "×"
texto (-2, -1.2) "×"
texto (-1, -1.2) "×"
texto (1, -1.2) "×"
texto (2, -1.2) "×"
texto (-1.6, 1.75) "$\vec B$ entrante"
segmento (0, -1.6) (0, 1.6) ; gris ; gruesa
vector (0.3, -0.6) (0.3, 0.6) ; violeta ; "$I$"
vector (0, 0) (-1.1, 0) ; rojo ; "$\vec F_B$"
leyenda: no
x: -2.5..2.5
y: -1.9..2.1
```

📍 **En el teórico:** [[Fuerza sobre un conductor, ley de Biot-Savart y conductores paralelos#Fuerza sobre un conductor con corriente|06/10 · Fuerza sobre un conductor con corriente]] (la experiencia, la deducción y la fórmula). Serway, sec. 29.4.

::: aclaracion
**No está en el teórico: el momento de torsión sobre una espira.** Si el alambre forma una **espira** con corriente, las fuerzas sobre lados opuestos son iguales y opuestas: no la trasladan, pero forman un **par** que la hace **girar** (torsión). Ese momento de torsión es (Serway, sec. 29.5):

$$
\tau = I\,A\,B\,\sen\theta \qquad\qquad \vec\tau = \vec\mu\times\vec B, \quad \vec\mu = I\,\vec A
$$

con $A$ el área de la espira, $\theta$ el ángulo entre la normal de la espira y $\vec B$, y $\vec\mu$ el **momento dipolar magnético**. Con $N$ vueltas, se multiplica por $N$. Es el principio de los **motores eléctricos** y del **galvanómetro**.
:::

## 6) ¿Para qué sirve la ley de Biot-Savart? Formularla y aplicarla al conductor recto y delgado

**Para qué sirve:** para **calcular el campo magnético que genera una corriente**. Es al magnetismo lo que la ley de Coulomb es al campo eléctrico: da el campo de un pedacito de corriente, y sumando (integrando) todos los pedacitos se obtiene el campo de cualquier conductor.

**Formulación:** un elemento de corriente $I\,\dd\vec s$ produce, en un punto a distancia $r$,

$$
\dd\vec B = \frac{\mu_0}{4\pi}\,\frac{I\,\dd\vec s\times\hat r}{r^2} \qquad\qquad \vec B = \frac{\mu_0\,I}{4\pi}\int\frac{\dd\vec s\times\hat r}{r^2} \qquad\qquad \mu_0 = 4\pi\times10^{-7}\ \frac{\text{T}\cdot\text{m}}{\text{A}}
$$

El campo es proporcional a $I$ y a $\dd s$, inversamente proporcional a $r^2$, y perpendicular a la vez a $\dd\vec s$ y a $\hat r$.

**Conductor recto y delgado:** para un punto $P$ a distancia $a$ del cable, todos los $\dd\vec B$ apuntan para el mismo lado (perpendiculares al plano del cable y $P$), así que se suman los módulos. Integrando a lo largo del cable:

$$
B = \frac{\mu_0\,I}{4\pi a}\,\big(\sen\alpha_1 - \sen\alpha_2\big) \qquad\xrightarrow{\ \text{cable infinito}\ }\qquad B = \frac{\mu_0\,I}{2\pi a}
$$

con $\alpha_1$ y $\alpha_2$ los ángulos con que se ven los extremos desde $P$, medidos desde la perpendicular (uno positivo y otro negativo). Si el cable es infinito, $\alpha_1 = 90°$ y $\alpha_2 = -90°$. Las líneas de campo son **círculos** alrededor del cable, con el sentido dado por la regla de la mano derecha (pulgar según la corriente).

```grafico
titulo: Corriente saliente (vista de frente): las líneas de B son círculos antihorarios alrededor del cable
texto (0.05, 0.35) "$I\ \odot$"
(0, 0) ; ""
(0.8cos(t), 0.8sen(t)) ; t: 0..2pi ; azul ; flecha
(1.5cos(t), 1.5sen(t)) ; t: 0..2pi ; azul ; flecha
(2.2cos(t), 2.2sen(t)) ; t: 0..2pi ; azul ; flecha
vector (1.5, 0) (1.5, 0.75) ; rojo ; "$\vec B$"
leyenda: no
x: -2.6..2.6
y: -2.6..2.6
```

```grafico
titulo: Conductor recto finito: a es la distancia de P al cable; α₁ y α₂, los ángulos a los extremos desde la perpendicular
segmento (-2.2, 0) (2.2, 0) ; gris ; gruesa
vector (0.9, -0.3) (1.9, -0.3) ; violeta ; "$I$"
(0.4, 1.4) ; "$P$"
segmento (0.4, 1.4) (0.4, 0) ; gris ; punteada ; "$a$"
segmento (0.4, 1.4) (-2.2, 0) ; gris ; punteada
segmento (0.4, 1.4) (2.2, 0) ; gris ; punteada
texto (0.05, 0.95) "$\alpha_1$"
texto (0.75, 0.95) "$\alpha_2$"
x: -2.6..2.6
y: -0.6..1.8
```

📍 **En el teórico:** [[Fuerza sobre un conductor, ley de Biot-Savart y conductores paralelos#Fuentes de campo magnético: ley de Biot-Savart|06/10 · Ley de Biot-Savart]] y [[Fuerza sobre un conductor, ley de Biot-Savart y conductores paralelos#1. Conductor recto delgado|06/10 · Conductor recto delgado]] (con la deducción completa). Serway, sec. 30.1 y ej. 30.1.

## 7) ¿Cómo se calcula el flujo magnético? Explicar

El **flujo magnético** mide cuánto campo magnético atraviesa una superficie, igual que el flujo eléctrico:

$$
\Phi_B = \vec B\cdot\vec A = B\,A\cos\theta \qquad\qquad \Phi_B = \int \vec B\cdot\dd\vec A \ \ \text{(si } B \text{ no es uniforme)}
$$

- $\vec A$ es el vector área, **perpendicular** a la superficie, y $\theta$ el ángulo **entre $\vec B$ y $\vec A$** (no entre el campo y la superficie).
- Es **máximo** ($B\,A$) si el campo atraviesa la superficie de frente ($\theta = 0°$) y **nulo** si el campo es paralelo a la superficie ($\theta = 90°$).
- **Unidad:** el **weber**, $\text{Wb} = \text{T}\cdot\text{m}^2$.
- A través de una superficie **cerrada**, el flujo magnético es **siempre cero** (ley de Gauss para el magnetismo): las líneas de $\vec B$ son cerradas y no hay polos magnéticos aislados.

```grafico
titulo: Flujo según la orientación: máximo de frente, intermedio inclinada, nulo si el campo pasa rasante
vector (-4.8, 0.9) (-2.3, 0.9) ; rojo
vector (-4.8, 0.3) (-2.3, 0.3) ; rojo
vector (-4.8, -0.3) (-2.3, -0.3) ; rojo
vector (-4.8, -0.9) (-2.3, -0.9) ; rojo
segmento (-3.5, -1.1) (-3.5, 1.1) ; verde ; gruesa
vector (-3.5, 0) (-2.6, 0) ; violeta ; "$\vec A$"
texto (-3.5, -1.5) "$\theta = 0°$: máximo"
vector (-1.2, 0.9) (1.3, 0.9) ; rojo
vector (-1.2, 0.3) (1.3, 0.3) ; rojo
vector (-1.2, -0.3) (1.3, -0.3) ; rojo
vector (-1.2, -0.9) (1.3, -0.9) ; rojo
segmento (-0.5, -1) (0.5, 1) ; verde ; gruesa
vector (0, 0) (0.8, -0.4) ; violeta ; "$\vec A$"
texto (0, -1.5) "$\Phi_B = B\,A\cos\theta$"
vector (2.3, 0.9) (4.8, 0.9) ; rojo
vector (2.3, 0.3) (4.8, 0.3) ; rojo
vector (2.3, -0.3) (4.8, -0.3) ; rojo
vector (2.3, -0.9) (4.8, -0.9) ; rojo
segmento (2.5, 0) (4.5, 0) ; verde ; gruesa
vector (3.5, 0) (3.5, 0.75) ; violeta ; "$\vec A$"
texto (3.5, -1.5) "$\theta = 90°$: nulo"
x: -5.2..5.2
y: -1.8..1.3
alto: 230
```

📍 **En el teórico:** [[Flujo magnético, ley de Faraday y ley de Lenz#Flujo magnético|20/10 · Flujo magnético]] y [[Flujo magnético, ley de Faraday y ley de Lenz#Ley de Gauss para el magnetismo|20/10 · Ley de Gauss para el magnetismo]]. Serway, sec. 30.5.

## 8) ¿Qué enuncia la ley de inducción de Faraday? ¿Cómo puede inducirse una fem?

**Enunciado:** cuando el **flujo magnético** a través de un circuito **varía en el tiempo**, se induce en él una **fem**, igual a menos la rapidez de cambio del flujo:

$$
\varepsilon_{ind} = -\frac{\dd\Phi_B}{\dd t} \qquad\qquad \varepsilon_{ind} = -N\,\frac{\dd\Phi_B}{\dd t}\ \ \text{(bobina de } N \text{ espiras)}
$$

Lo que induce la fem no es que haya campo, sino que el flujo **cambie**: con un imán quieto cerca de una espira no circula corriente; al acercarlo o alejarlo, sí. El **signo menos** es la **ley de Lenz**: la corriente inducida circula en el sentido que **se opone al cambio** de flujo.

**Variables que se pueden modificar:** como $\Phi_B = B\,A\cos\theta$, hay tres maneras de hacer cambiar el flujo:

| Qué se cambia | Cómo | Ejemplo |
|---|---|---|
| El **campo** $B$ | acercar o alejar un imán; prender o apagar una bobina cercana | bobina con campo creciente: $\varepsilon = N\,A\,\dfrac{\Delta B}{\Delta t}$ |
| El **área** $A$ | una barra que se desliza sobre rieles; deformar la espira | **fem de movimiento**: $\varepsilon = B\,\ell\,v$ |
| El **ángulo** $\theta$ | hacer **girar** la espira en el campo | **generador** (pregunta 9) |

O cualquier combinación de las tres.

```grafico
titulo: Fem de movimiento: la barra se mueve, el área encerrada crece y se induce una corriente (Lenz: antihoraria)
segmento (-2.5, 1) (1.6, 1) ; gris ; gruesa
segmento (-2.5, -1) (1.6, -1) ; gris ; gruesa
segmento (-2.5, -1) (-2.5, 1) ; gris ; gruesa ; "$R$"
segmento (0.5, -1.15) (0.5, 1.15) ; azul ; gruesa
vector (0.5, 0) (1.4, 0) ; verde ; "$\vec v$"
vector (-0.6, 1) (-1.6, 1) ; violeta ; "$I$"
texto (-2, 0.5) "×"
texto (-1, 0.5) "×"
texto (0, 0.5) "×"
texto (-2, -0.5) "×"
texto (-1, -0.5) "×"
texto (0, -0.5) "×"
texto (1.2, 0.6) "×"
texto (1.2, -0.6) "×"
segmento (-2.5, -1.45) (0.5, -1.45) ; gris ; punteada ; "$x$"
texto (0.75, 0.25) "$\ell$"
leyenda: no
x: -3..2
y: -1.8..1.6
```

📍 **En el teórico:** [[Flujo magnético, ley de Faraday y ley de Lenz#Inducción electromagnética|20/10 · Inducción electromagnética]], [[Flujo magnético, ley de Faraday y ley de Lenz#Ley de Faraday|20/10 · Ley de Faraday]] (con las tres formas de cambiar el flujo), [[Flujo magnético, ley de Faraday y ley de Lenz#Fem de movimiento|20/10 · Fem de movimiento]] y [[Flujo magnético, ley de Faraday y ley de Lenz#Ley de Lenz|20/10 · Ley de Lenz]]. Serway, sec. 31.1 a 31.3.

## 9) ¿Cómo funciona un generador de corriente alterna y cómo se determina su fem?

**Cómo funciona:** una espira (o una bobina de $N$ espiras) **gira** con velocidad angular $\omega$ constante en un campo magnético, entre los polos de un imán. La energía para hacerla girar viene de afuera: una caída de agua, vapor, el viento. Al girar, cambia el **ángulo** entre $\vec B$ y $\vec A$, el flujo cambia y, por Faraday, se induce una fem. Los extremos de la espira van a dos **anillos de deslizamiento** que giran con ella, y unas **escobillas** fijas apoyadas en los anillos la conectan al **circuito exterior**.

**La fem:** con $\theta = \omega\,t$,

$$
\Phi_B = B\,A\cos(\omega t) \qquad\then\qquad \varepsilon_{ind} = -N\,\frac{\dd\Phi_B}{\dd t} = N\,B\,A\,\omega\,\sen(\omega t) \qquad\qquad \varepsilon_{max} = N\,B\,A\,\omega
$$

- La fem es **senoidal**: cambia de sentido dos veces por vuelta. Por eso es **corriente alterna**.
- Es **máxima** cuando el campo queda en el plano de la espira ($\omega t = 90°$): el flujo es cero pero cambia lo más rápido.
- Es **nula** cuando el campo atraviesa la espira de frente ($\omega t = 0°$ o $180°$): el flujo es máximo pero no cambia.
- Aumenta con más espiras, más campo, más área o más velocidad de giro. La frecuencia es $f = \dfrac{\omega}{2\pi}$: $50\,\text{Hz}$ en la Argentina.

```grafico
titulo: Generador: el flujo varía como un coseno y la fem como un seno (máxima donde el flujo es cero)
y = cos(x) ; azul ; "$\Phi_B = B\,A\cos(\omega t)$"
y = sen(x) ; rojo ; gruesa ; "$\varepsilon = N\,B\,A\,\omega\sen(\omega t)$"
ejes: ωt, Φ y ε
marcas: pi
aspecto: libre
alto: 250
x: 0..12.6
y: -1.4..1.6
```

📍 **En el teórico:** [[Flujo magnético, ley de Faraday y ley de Lenz#Generador de corriente alterna|20/10 · Generador de corriente alterna]] (con el gráfico de la fem y la tabla de máximos y ceros). Serway, sec. 31.5.
