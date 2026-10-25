# Movimiento de cargas en un campo magnético

*Clase teórica del 29/09. Completado con el Serway, sec. 29.1 a 29.3 (Campos magnéticos). Sigue de [[Magnetismo: campo magnético y fuerza sobre una carga]].*

## Lo que se anunció del parcial 2

En el parcial hay **4 ejercicios**:

- 1 de **capacitores**;
- 1 de **circuitos** (puede ser de Kirchhoff u otro);
- 1 de **magnetismo**;
- 1 **pregunta de laboratorio**.

## Unidad del campo magnético

Despejando $B$ de $F_B = q\,v\,B\,\sen\theta$:

$$
B = \frac{F_B}{q\,v\,\sen\theta} \qquad\then\qquad [B] = \frac{[F]}{[q]\,[v]} = \frac{\text{N}}{\text{C}\cdot\frac{\text{m}}{\text{s}}} = \frac{\text{N}}{\text{A}\cdot\text{m}} = \text{T}\ \text{(tesla)}
$$

(porque $\frac{\text{C}}{\text{s}} = \text{A}$).

## Diferencias entre la fuerza eléctrica y la magnética

$$
\vec F_E = q\,\vec E \qquad\qquad \vec F_B = q\,\vec v\times\vec B
$$

1. **Las dos actúan sobre partículas cargadas**, pero $\vec F_B$ solo existe si la carga **está en movimiento**. Una carga quieta en un campo $\vec E$ siente fuerza; en un campo $\vec B$, no.
2. $\vec F_E$ actúa **a lo largo de la dirección** del campo $\vec E$; en cambio, $\vec F_B$ actúa **perpendicular** a $\vec B$: $\vec F_E \parallel \vec E$ y $\vec F_B \perp \vec B$.
3. $\vec F_E$ **hace trabajo** sobre la partícula; $\vec F_B$ **no**, porque es perpendicular al movimiento (Serway, sec. 29.1). Entonces:
   - una carga en un campo $\vec B$ **no cambia su energía cinética**, porque no cambia su rapidez;
   - **solo cambia su dirección** $\then$ **movimiento circular**.

::: aclaracion
En la hoja quedó otra vez $\vec F_B = q\,\vec B\times\vec v$ (y lo mismo en la fuerza de Lorentz). El orden correcto es $q\,\vec v\times\vec B$: al revés da la fuerza en sentido contrario. Ver la aclaración en [[Magnetismo: campo magnético y fuerza sobre una carga]].
:::

## Movimiento de una partícula cargada en un campo $\vec B$ uniforme

### Caso 1: $\vec v \perp \vec B$ ($\theta = 90°$)

La fuerza magnética es siempre perpendicular a la velocidad y de módulo constante: hace de **fuerza centrípeta**. La trayectoria es una **circunferencia**.

```grafico
titulo: $\vec B$ entrante ($\times$): una carga positiva gira en sentido antihorario
animar: no
(1.4*cos(t), 1.4*sin(t)) ; t: 0..2*pi ; azul ; gruesa ; ""
vector (1.4, 0) (1.4, 1.1) ; rojo ; "$\vec v$"
vector (1.4, 0) (0.5, 0) ; verde ; "$\vec F_B$"
punto (1.4, 0) ; "$q^+$"
texto (-2.2, 1.6) "$\times$"
texto (-1.1, 1.6) "$\times$"
texto (0, 1.9) "$\times$"
texto (1.1, 1.6) "$\times$"
texto (2.2, 1.6) "$\times$"
texto (-2.2, 0) "$\times$"
texto (-0.6, 0.5) "$\times$"
texto (0.6, -0.5) "$\times$"
texto (2.2, 0) "$\times$"
texto (-2.2, -1.6) "$\times$"
texto (-1.1, -1.6) "$\times$"
texto (0, -1.9) "$\times$"
texto (1.1, -1.6) "$\times$"
texto (2.2, -1.6) "$\times$"
x: -2.6..2.6
y: -2.2..2.2
alto: 300
```

::: observacion
Notación para vectores perpendiculares a la hoja: $\times$ es **entrante** (se ve la cola de la flecha) y $\bullet$ es **saliente** (se ve la punta).
:::

Igualando la fuerza magnética con la centrípeta:

::: pasos
F_B = m\,a_c       // segunda ley de Newton, con aceleración centrípeta
q\,B\,v = m\,\frac{v^2}{r}       // $a_c = \frac{v^2}{r}$
r = \frac{m\,v}{q\,B}       // se simplifica una $v$
:::

::: resultado Radio de la trayectoria
$$
r = \frac{m}{q}\cdot\frac{v}{B}
$$

**Mientras más intenso es el campo, más chico es el radio.** También, más rápida o más pesada la partícula, más grande el radio.
:::

**Velocidad angular.** De $r = \frac{m\,v}{q\,B}$ sale $v = \frac{q}{m}\,r\,B$, y $\omega = \frac{v}{r}$:

::: pasos
\omega = \frac{v}{r} = \frac{\frac{q}{m}\,r\,B}{r}
\omega = \frac{q}{m}\,B       // se va $r$
:::

::: resultado Velocidad angular y período
$$
\omega = \frac{q\,B}{m}\ \ [\text{rad/s}] \qquad\qquad T = \frac{2\pi}{\omega} = \frac{2\pi\,m}{q\,B}
$$

$\omega$ y $T$ **no dependen de la velocidad ni del radio**: una partícula más rápida da una vuelta más grande, pero tarda lo mismo (Serway, sec. 29.2). Esto es lo que aprovecha el ciclotrón.
:::

**Protones y electrones** con la misma velocidad, en el mismo campo:

$$
r_p = \frac{m_p}{q_p}\cdot\frac{v}{B} \qquad\qquad r_e = \frac{m_e}{q_e}\cdot\frac{v}{B} \qquad\then\qquad r_e < r_p
$$

Tienen la misma carga (en módulo), pero el electrón es unas $1836$ veces más liviano: su circunferencia es mucho más chica. Y como su carga es negativa, **gira al revés** que el protón.

```grafico
titulo: Mismo $\vec B$ entrante y misma $v$: el protón da una vuelta grande y el electrón una chica, en sentido contrario
animar: no
(-0.6 + 1.6*cos(t), 1.6*sin(t)) ; t: 0..2*pi ; rojo ; gruesa ; "protón"
(1.6 + 0.35*cos(t), 0.35*sin(t)) ; t: 0..2*pi ; azul ; gruesa ; "electrón"
vector (1, 0) (1, 0.8) ; gris ; "$\vec v$"
vector (1.25, 0) (1.25, 0.8) ; gris ; ""
x: -2.6..2.6
y: -2..2
alto: 280
```

### Caso 2: $0° < \theta < 90°$ ($\vec v$ no es perpendicular a $\vec B$)

Se separa $\vec v$ en dos partes: la **paralela** a $\vec B$, que no siente fuerza y sigue igual, y la **perpendicular**, que produce el giro. La combinación es una **hélice** (un resorte) alrededor de las líneas de campo. El radio se calcula con la componente perpendicular: $r = \frac{m\,v_\perp}{q\,B}$ (Serway, sec. 29.2).

```grafico3d
titulo: Con $\vec B$ en la dirección $x$ y $\vec v$ inclinada, la trayectoria es una hélice
alto: 360
(0.25*t, cos(t), sin(t)) ; t: 0..6*pi ; azul ; gruesa ; ""
vector (-0.5, -1.6, -1.6) (5.3, -1.6, -1.6) ; gris ; "$\vec B$"
x: -0.5..5.5
y: -1.8..1.8
z: -1.8..1.8
```

## Fuerza de Lorentz

Si en la región hay campo eléctrico **y** magnético, la fuerza total sobre la carga es la suma:

::: resultado Fuerza de Lorentz
$$
\vec F = \vec F_E + \vec F_B = q\,\vec E + q\,\vec v\times\vec B
$$
:::

## Aplicaciones

### 1. Selector de velocidad

Entre dos placas cargadas hay un campo $\vec E$, y además un campo $\vec B$ entrante, perpendiculares entre sí. Sobre una carga positiva que entra, $\vec F_E$ empuja hacia un lado y $\vec F_B$ hacia el otro. Si las dos fuerzas son iguales, la partícula **sigue derecho**:

::: pasos
F_B = F_E
q\,B\,v = q\,E       // se va $q$
v = \frac{E}{B}
:::

::: resultado Selector de velocidad
$$
v = \frac{E}{B}
$$

**Solo salen derecho por la rendija las partículas que cumplen $v = \frac{E}{B}$**; las más rápidas o más lentas se desvían.
:::

```grafico
titulo: Selector de velocidad: con $v = E/B$ las fuerzas se cancelan y la partícula sigue derecho
animar: no
placa (-2.2, 1.4) (2.2, 1.4) ; +
placa (-2.2, -1.4) (2.2, -1.4) ; -
vector (-2, 0) (-0.6, 0) ; rojo ; "$\vec v$"
vector (0, 0) (0, -0.9) ; verde ; "$\vec F_E$"
vector (0, 0) (0, 0.9) ; azul ; "$\vec F_B$"
punto (0, 0) ; ""
segmento (0, 0) (2.4, 0) ; rojo ; punteada
texto (-1.6, 0.8) "$\times$"
texto (1.6, 0.8) "$\times$"
texto (-1.6, -0.8) "$\times$"
texto (1.6, -0.8) "$\times$"
texto (2.6, 0.9) "$\vec B$ entrante"
x: -2.6..3.4
y: -2..2
alto: 280
```

### 2. Espectrómetro de masas

Separa partículas según su relación $\frac{m}{q}$. Primero pasan por un **selector de velocidad** (campos $E$ y $B$), así que todas entran con $v = \frac{E}{B}$. Después entran en una zona con otro campo $B_2$, donde describen media circunferencia y pegan en una **placa fotográfica**:

::: pasos
r = \frac{m}{q}\cdot\frac{v}{B_2}
r = \frac{m}{q}\cdot\frac{E}{B\,B_2}       // $v = \frac{E}{B}$, del selector
:::

::: resultado Espectrómetro de masas
$$
\frac{m}{q} = \frac{r\,B\,B_2}{E}
$$

Midiendo dónde pega cada partícula ($r$) se obtiene la **relación entre la masa y la carga**. Partículas más pesadas pegan más lejos.
:::

::: aclaracion
En la hoja quedó $r = \frac{m}{q}\cdot\frac{v}{B}$: en el espectrómetro el radio va con el campo de la segunda zona, $B_2$. La fórmula final de la hoja ($\frac{m}{q} = \frac{r\,B\,B_2}{E}$) está bien.
:::

### 3. Acelerador de partículas o ciclotrón

Dos piezas huecas en forma de D ($D_1$ y $D_2$) dentro de un campo $\vec B$ perpendicular. Entre ellas se aplica una **diferencia de potencial alterna**. Cada vez que la partícula cruza el hueco entre las D, el campo eléctrico la acelera; adentro de cada D, el campo magnético la hace girar media vuelta. Como el período $T = \frac{2\pi m}{qB}$ no depende de la velocidad, la tensión alterna se sincroniza con ese período, y la partícula va en espiral cada vez más rápida hasta salir por el **orificio de salida** con velocidad $v_f$ (Serway, sec. 29.3).

Al salir, el radio es el de las D, $R$. Con $v = \frac{q}{m}\,R\,B$:

::: pasos
E_c = \frac{1}{2}\,m\,v_f^2 = \frac{1}{2}\,m\left(\frac{q}{m}\,R\,B\right)^2
E_c = \frac{q^2\,R^2\,B^2}{2\,m}
:::

::: resultado Energía cinética de salida del ciclotrón
$$
E_c = \frac{q^2\,R^2\,B^2}{2\,m}
$$
:::

## Ejercicios de la clase

::: ejercicio Ejercicio 1. Un protón se mueve en una órbita circular de $14\,\text{cm}$ de radio en un campo magnético uniforme de $0{,}35\,\text{T}$, perpendicular a la velocidad del protón. a) Determinar la rapidez del protón. b) Si la partícula fuera un electrón en lugar de un protón, moviéndose con la misma velocidad en el mismo campo, ¿cómo sería su trayectoria?
Datos: $m_p = 1{,}67\times10^{-27}\,\text{kg}$, $m_e = 9{,}11\times10^{-31}\,\text{kg}$, $q = 1{,}6\times10^{-19}\,\text{C}$.

::: solucion
Es el ejemplo 29.2 del Serway.

**a)** Despejando $v$ de $r = \frac{m\,v}{q\,B}$:

::: pasos
v = \frac{q\,B\,r}{m_p}
= \frac{1{,}6\times10^{-19}\,\text{C}\cdot 0{,}35\,\text{T}\cdot 0{,}14\,\text{m}}{1{,}67\times10^{-27}\,\text{kg}}
\approx 4{,}69\times10^{6}\ \frac{\text{m}}{\text{s}}
:::

**b)** Con la misma $v$, el radio es proporcional a la masa:

::: pasos
r_e = \frac{m_e\,v}{q\,B}
= \frac{9{,}11\times10^{-31}\,\text{kg}\cdot 4{,}69\times10^{6}\,\frac{\text{m}}{\text{s}}}{1{,}6\times10^{-19}\,\text{C}\cdot 0{,}35\,\text{T}}
\approx 7{,}6\times10^{-5}\ \text{m}
:::

::: resultado
$$
v \approx 4{,}69\times10^{6}\ \text{m/s} \qquad\qquad r_e \approx 7{,}6\times10^{-5}\ \text{m} \approx 0{,}08\ \text{mm}
$$
:::

El electrón también describe una circunferencia, pero unas $1800$ veces más chica (la razón de las masas), y **gira en sentido contrario** porque su carga es negativa.
:::
:::

::: ejercicio Ejercicio 2. Se quiere medir el campo magnético $B$ en una región, y para eso se usa un haz de electrones que se aceleran desde el reposo con una diferencia de potencial de $350\,\text{V}$. Los electrones ingresan de forma perpendicular al campo y describen una trayectoria de $7{,}5\,\text{cm}$ de radio. a) Determinar $B$. b) Determinar la rapidez angular de los electrones ($\omega$). c) Determinar la fuerza que recibe cada electrón.

::: solucion
Es el ejemplo 29.3 del Serway. **Primero, la velocidad** con que entran: la energía que les da la diferencia de potencial se convierte en cinética (empiezan en reposo):

::: pasos
q\,\Delta V = \frac{1}{2}\,m_e\,v^2
v = \sqrt{\frac{2\,q\,\Delta V}{m_e}} = \sqrt{\frac{2\cdot 1{,}6\times10^{-19}\,\text{C}\cdot 350\,\text{V}}{9{,}11\times10^{-31}\,\text{kg}}}
\approx 1{,}11\times10^{7}\ \frac{\text{m}}{\text{s}}
:::

**a) Campo**, despejando de $r = \frac{m\,v}{q\,B}$:

::: pasos
B = \frac{m_e\,v}{q\,r}
= \frac{9{,}11\times10^{-31}\,\text{kg}\cdot 1{,}11\times10^{7}\,\frac{\text{m}}{\text{s}}}{1{,}6\times10^{-19}\,\text{C}\cdot 0{,}075\,\text{m}}
\approx 8{,}4\times10^{-4}\ \text{T}
:::

**b) Rapidez angular:**

$$
\omega = \frac{v}{r} = \frac{1{,}11\times10^{7}\,\text{m/s}}{0{,}075\,\text{m}} \approx 1{,}48\times10^{8}\ \frac{\text{rad}}{\text{s}}
$$

(da lo mismo con $\omega = \frac{q\,B}{m_e}$).

**c) Fuerza** sobre cada electrón ($\theta = 90°$):

$$
F_B = q\,v\,B = 1{,}6\times10^{-19}\,\text{C}\cdot 1{,}11\times10^{7}\,\tfrac{\text{m}}{\text{s}}\cdot 8{,}4\times10^{-4}\,\text{T} \approx 1{,}5\times10^{-15}\ \text{N}
$$

::: resultado
$$
B \approx 8{,}4\times10^{-4}\ \text{T} \qquad\qquad \omega \approx 1{,}48\times10^{8}\ \text{rad/s} \qquad\qquad F_B \approx 1{,}5\times10^{-15}\ \text{N}
$$
:::
:::
:::
