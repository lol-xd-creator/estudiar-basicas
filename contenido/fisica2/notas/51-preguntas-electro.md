# Preguntas de repaso: electrostática y electrodinámica

*Cuestionario de repaso de la cátedra. Respuestas armadas con el teórico cargado y completadas con el Serway (vol. 2, cap. 23 a 28).*

| Pregunta | Tema | ¿Está en el teórico? |
|---|---|---|
| 1 | Campo eléctrico | sí |
| 2 | Líneas de campo | sí |
| 3 | Flujo eléctrico | sí |
| 4 | Ley de Gauss | sí |
| 5 | Carga negativa liberada en un campo | sí, repartido en dos clases |
| 6 | Trabajo del campo y energía | sí |
| 7 | Energía potencial contra potencial | sí |
| 8 | Capacitor | sí, salvo las otras formas (cilíndrico, esférico) |
| 9 | Capacitancia | sí |
| 10 | Corriente y velocidad de arrastre | sí |
| 11 | Materiales óhmicos | sí |
| 12 | Resistencia | sí |
| 13 | Resistividad y temperatura | sí |
| 14 | Resistores en paralelo | sí |
| 15 | Leyes de Kirchhoff | sí |
| 16 | Potencia y efecto Joule | sí, salvo cuándo **no** es deseado |

## 1) ¿Qué es el campo eléctrico? ¿Cuándo existe? ¿Qué características tiene? ¿Cómo se produce? ¿Qué unidad tiene?

- **Qué es:** la **fuerza por unidad de carga** que sentiría una carga de prueba **positiva** $q_0$ puesta en un punto: $\vec E = \dfrac{\vec F_e}{q_0}$. Las cargas no se tocan: se ejercen fuerza a distancia **a través del campo**.
- **Cómo se produce:** lo crean las **cargas eléctricas**. Una carga puntual genera $E = k_0\,\dfrac{|q|}{d^2}$; varias cargas, la suma vectorial de sus campos (superposición).
- **Cuándo existe:** **siempre** que haya una carga que lo genere, aunque no haya ninguna otra carga para sentirlo. No depende de la carga de prueba que se use para medirlo.
- **Características:**
  - es un **vector**: módulo, dirección y sentido;
  - su sentido es el de la fuerza sobre una carga positiva: **sale** de las cargas positivas y **entra** en las negativas;
  - es proporcional a la carga ($E \propto q$) e inversamente proporcional al cuadrado de la distancia ($E \propto \frac{1}{d^2}$);
  - sobre una carga $q$ produce una fuerza $\vec F = q\,\vec E$.
- **Unidad:** $[E] = \dfrac{\text{N}}{\text{C}}$, que es lo mismo que $\dfrac{\text{V}}{\text{m}}$.

```grafico
titulo: Carga positiva: el campo sale
carga (0, 0) ; +1
lineas: 12
animar: no
x: -2..2
y: -1.6..1.6
alto: 220
```

```grafico
titulo: Carga negativa: el campo entra
carga (0, 0) ; -1
lineas: 12
animar: no
x: -2..2
y: -1.6..1.6
alto: 220
```

📍 **En el teórico:** [[Campo eléctrico y varias cargas puntuales#Campo eléctrico|02/06 · Campo eléctrico]] (definición, carga puntual, características) y [[Campo eléctrico y varias cargas puntuales#Campo generado por varias cargas puntuales|02/06 · Varias cargas]]. La equivalencia $\frac{\text{N}}{\text{C}} = \frac{\text{V}}{\text{m}}$, en [[Potencial eléctrico y diferencia de potencial#Potencial eléctrico|30/06 · Potencial eléctrico]]. Serway, sec. 23.4.

## 2) ¿Cómo se relacionan las líneas de campo eléctrico con la región del espacio?

Las **líneas de campo** son un esquema de cómo se distribuye el campo en el espacio:

- en cada punto, el vector $\vec E$ es **tangente** a la línea que pasa por ahí;
- la **densidad de líneas** (cuántas atraviesan una unidad de área perpendicular) es **proporcional a la intensidad** del campo: donde están más juntas, el campo es más fuerte; donde están separadas, más débil;
- **salen** de las cargas positivas y **entran** en las negativas (o van al infinito);
- la cantidad de líneas es **proporcional a la carga**;
- **no se cruzan**.

```grafico
titulo: Dipolo: las líneas salen de la + y entran en la −; más juntas cerca de las cargas (campo más intenso)
carga (-1.5, 0) ; +1
carga (1.5, 0) ; -1
animar: no
x: -3.5..3.5
y: -2.2..2.2
```

```grafico
titulo: Dos cargas positivas iguales: las líneas no se cruzan; en el medio el campo es nulo
carga (-1.5, 0) ; +1
carga (1.5, 0) ; +1
(0, 0) ; "$E = 0$"
animar: no
x: -3.5..3.5
y: -2.2..2.2
```

📍 **En el teórico:** [[Líneas de campo, flujo y ley de Gauss#Líneas de campo|23/06 · Líneas de campo]] (con las reglas para dibujarlas y los gráficos del dipolo y de dos cargas iguales). Serway, sec. 23.6.

## 3) ¿Qué es el flujo eléctrico? ¿Cuándo es máximo y cuándo es nulo?

Es una medida de **cuántas líneas de campo atraviesan una superficie**:

$$
\Phi_E = \vec E\cdot\vec A = E\,A\cos\theta \qquad [\Phi_E] = \frac{\text{N}\cdot\text{m}^2}{\text{C}}
$$

$\vec A$ es el vector área (perpendicular a la superficie) y $\theta$ el ángulo entre $\vec E$ y $\vec A$. Si el campo no es uniforme o la superficie es curva, se integra: $\Phi_E = \int \vec E\cdot\dd\vec A$.

- **Máximo** ($\Phi_E = E\,A$): cuando $\theta = 0°$, el campo es **perpendicular a la superficie** (paralelo a $\vec A$) y la atraviesa de frente.
- **Nulo** ($\Phi_E = 0$): cuando $\theta = 90°$, el campo es **paralelo a la superficie** y "pasa rasante", sin atravesarla.

```grafico
titulo: Flujo según la orientación: máximo de frente, intermedio inclinada, nulo si el campo pasa rasante
vector (-4.8, 0.9) (-2.3, 0.9) ; azul
vector (-4.8, 0.3) (-2.3, 0.3) ; azul
vector (-4.8, -0.3) (-2.3, -0.3) ; azul
vector (-4.8, -0.9) (-2.3, -0.9) ; azul
segmento (-3.5, -1.1) (-3.5, 1.1) ; verde ; gruesa
vector (-3.5, 0) (-2.6, 0) ; violeta ; "$\vec A$"
texto (-3.5, -1.5) "$\theta = 0°$: máximo"
vector (-1.2, 0.9) (1.3, 0.9) ; azul
vector (-1.2, 0.3) (1.3, 0.3) ; azul
vector (-1.2, -0.3) (1.3, -0.3) ; azul
vector (-1.2, -0.9) (1.3, -0.9) ; azul
segmento (-0.5, -1) (0.5, 1) ; verde ; gruesa
vector (0, 0) (0.8, -0.4) ; violeta ; "$\vec A$"
texto (0, -1.5) "$\Phi_E = E\,A\cos\theta$"
vector (2.3, 0.9) (4.8, 0.9) ; azul
vector (2.3, 0.3) (4.8, 0.3) ; azul
vector (2.3, -0.3) (4.8, -0.3) ; azul
vector (2.3, -0.9) (4.8, -0.9) ; azul
segmento (2.5, 0) (4.5, 0) ; verde ; gruesa
vector (3.5, 0) (3.5, 0.75) ; violeta ; "$\vec A$"
texto (3.5, -1.5) "$\theta = 90°$: nulo"
x: -5.2..5.2
y: -1.8..1.3
alto: 230
```

📍 **En el teórico:** [[Líneas de campo, flujo y ley de Gauss#Flujo eléctrico|23/06 · Flujo eléctrico]] (definición y tabla de máximo y nulo). Serway, sec. 24.1.

## 4) ¿Qué enuncia la ley de Gauss? ¿Para qué sirve?

**Enunciado:** el flujo eléctrico neto a través de una **superficie cerrada** es igual a la **carga encerrada** dividida por $\varepsilon_0$:

$$
\Phi_E = \oint \vec E\cdot\dd\vec A = \frac{q_{int}}{\varepsilon_0} \qquad \varepsilon_0 = 8{,}85\times10^{-12}\ \frac{\text{C}^2}{\text{N}\,\text{m}^2}
$$

- El flujo depende **solo de la carga de adentro**, no de la forma ni del tamaño de la superficie, ni de las cargas de afuera.
- Si $\Phi_E = 0$, entran y salen las mismas líneas: no hay carga neta adentro (aunque haya campo).

**Para qué sirve:** para **calcular el campo** de distribuciones de carga con **mucha simetría**, donde Coulomb sería muy difícil de integrar. Se elige una superficie gaussiana donde $E$ sea constante y paralelo a $\dd\vec A$, y el campo sale de la ecuación. Así se calcularon:

- la **esfera** cargada: desde afuera, como una carga puntual en el centro, $E = k_0\frac{Q}{r^2}$; adentro, $E = k_0\frac{Q\,r}{a^3}$;
- el **hilo** infinito: $E = \dfrac{2k_0\lambda}{r}$;
- la **placa** infinita: $E = \dfrac{\sigma}{2\varepsilon_0}$, y entre dos placas opuestas, $E = \dfrac{\sigma}{\varepsilon_0}$.

```grafico
titulo: Superficie gaussiana: una superficie cerrada imaginaria; el flujo solo depende de la carga de adentro
carga (0, 0) ; +1
(1.5cos(t), 1.5sen(t)) ; t: 0..2pi ; verde ; punteada
texto (1.45, 1.45) "superficie gaussiana"
leyenda: no
animar: no
x: -2.6..2.6
y: -2..2
```

```grafico
titulo: Esfera cargada (radio a): E crece lineal adentro y cae como 1/r² afuera
(t, t) ; t: 0..1 ; azul ; gruesa
(t, 1/t^2) ; t: 1..4 ; rojo ; gruesa
segmento (1, 0) (1, 1) ; gris ; punteada
texto (1, -0.12) "$a$"
texto (0.35, 0.6) "$k_0\frac{Q\,r}{a^3}$"
texto (2.2, 0.45) "$k_0\frac{Q}{r^2}$"
ejes: r, E
leyenda: no
aspecto: libre
alto: 240
x: 0..4
y: -0.2..1.3
```

📍 **En el teórico:** [[Líneas de campo, flujo y ley de Gauss#Ley de Gauss|23/06 · Ley de Gauss]] (enunciado y demostración) y [[Líneas de campo, flujo y ley de Gauss#Aplicación 1: esfera sólida cargada uniformemente|23/06 · Esfera]]; [[Ley de Gauss: hilo infinito y placas|30/06 · Hilo y placas]]. Serway, sec. 24.2 y 24.3.

## 5) ¿Qué ocurre cuando una carga negativa se libera dentro de una región con campo eléctrico?

```grafico
titulo: Una carga negativa entre dos placas: la fuerza es opuesta al campo
placa (-2.5, 1.3) (2.5, 1.3) ; +
placa (-2.5, -1.3) (2.5, -1.3) ; -
texto (0.35, -0.1) "$-q$"
vector (0, 0) (0, 0.9) ; rojo ; "$\vec F = q\,\vec E$"
vector (1.6, 0.6) (1.6, -0.6) ; azul ; "$\vec E$"
animar: no
x: -3..3
y: -1.7..1.7
```

- **¿Recibe fuerza?** Sí: $\vec F = q\,\vec E$. Como $q$ es negativa, la fuerza tiene **sentido opuesto al campo**.
- **¿Se mueve? ¿Hacia dónde?** Si se la suelta en reposo, se mueve **en contra del campo**: hacia la placa **positiva**, o sea hacia donde el potencial es **mayor**.
- **¿Con aceleración?** Sí. Por la segunda ley de Newton, $\vec a = \dfrac{q\,\vec E}{m}$, opuesta a $\vec E$. Si el campo es **uniforme**, la aceleración es **constante**: es un **MRUV**, como un cuerpo que cae, con la fuerza eléctrica en el papel del peso. Si entra con una velocidad que no es paralela al campo, la trayectoria es una parábola (tiro oblicuo).
- **Energía:** el campo hace trabajo positivo, así que la carga **gana energía cinética** y **pierde energía potencial eléctrica**.

📍 **En el teórico:** la fuerza, en [[Campo eléctrico y varias cargas puntuales#Campo eléctrico|02/06 · Campo eléctrico]] ($\vec F = q\,\vec E$); la aceleración opuesta al campo y el tiro oblicuo, en [[Potencial eléctrico y diferencia de potencial#Carga lanzada en un campo uniforme: tiro oblicuo|30/06 · Carga en un campo uniforme]]; la energía de una carga negativa, en [[Potencial eléctrico y diferencia de potencial#Ejemplos|30/06 · Ejemplos]]. Serway, sec. 23.7 y 25.2.

::: aclaracion
El caso de una carga negativa **soltada en reposo** no está resuelto como tal en el teórico: está repartido entre esas tres secciones. La respuesta las junta.
:::

## 6) ¿Cuál es el trabajo realizado por el campo eléctrico sobre una carga? ¿Cómo repercute en el sistema carga-campo?

El campo ejerce la fuerza $\vec F = q\,\vec E$; si la carga se desplaza, el trabajo es

$$
W_{campo} = \int_A^B q\,\vec E\cdot\dd\vec s = -\Delta U = -q\,\Delta V_{AB}
$$

- El trabajo del campo es **igual a menos la variación de energía potencial** del sistema carga-campo.
- Si el campo hace **trabajo positivo** (la carga se mueve "a favor", como la carga positiva en el sentido de $\vec E$), la **energía potencial disminuye** y la **energía cinética aumenta**. Es como un objeto que cae.
- Si un **agente externo** mueve la carga en contra del campo, el trabajo lo hace el agente, y la **energía potencial del sistema aumenta**.
- En un campo uniforme: $W = q\,E\,d$.

📍 **En el teórico:** [[Potencial eléctrico y diferencia de potencial#Trabajo|30/06 · Trabajo]] y [[Potencial eléctrico y diferencia de potencial#Energía potencial eléctrica|30/06 · Energía potencial eléctrica]]. Serway, sec. 25.1.

## 7) ¿Cuál es la diferencia entre energía potencial eléctrica y potencial eléctrico?

| | Energía potencial eléctrica $U$ | Potencial eléctrico $V$ |
|---|---|---|
| Qué es | La energía del **sistema carga-campo**: depende de la carga que se ponga. | La energía potencial **por unidad de carga**: $V = \dfrac{U}{q_0}$. Es una propiedad **del punto** del campo. |
| ¿Depende de la carga? | Sí: con el doble de carga, el doble de energía. | No: existe aunque no haya ninguna carga en ese punto. |
| Unidad | joule, $\text{J}$ | volt, $\text{V} = \dfrac{\text{J}}{\text{C}}$ |
| Relación | $U = q\,V$ | $\Delta V_{AB} = -\displaystyle\int_A^B \vec E\cdot\dd\vec s$ |

Lo que tiene sentido físico es la **diferencia** de potencial, $\Delta V$; el valor de $V$ en un punto depende de dónde se elija el cero.

```grafico
titulo: Entre placas: el campo va de + a −; las equipotenciales son perpendiculares al campo y V₁ > V₂ > V₃
placa (-2.5, 1.2) (2.5, 1.2) ; +
placa (-2.5, -1.2) (2.5, -1.2) ; -
segmento (-2.5, 0.6) (2.5, 0.6) ; ambar ; punteada
segmento (-2.5, 0) (2.5, 0) ; ambar ; punteada
segmento (-2.5, -0.6) (2.5, -0.6) ; ambar ; punteada
texto (3.05, 0.6) "$V_1$"
texto (3.05, 0) "$V_2$"
texto (3.05, -0.6) "$V_3$"
animar: no
x: -3..3.5
y: -1.6..1.6
```

📍 **En el teórico:** [[Potencial eléctrico y diferencia de potencial#Potencial eléctrico|30/06 · Potencial eléctrico]] (definiciones y la comparación "energía en un punto sin carga"). Serway, sec. 25.1.

## 8) ¿Qué es un capacitor? (forma, uso, cómo se carga)

- **Qué es:** dos **conductores** (placas) **separados por un aislante**, el **dieléctrico** (aire, papel, plástico). Cuando está cargado, una placa tiene $+Q$ y la otra $-Q$, con un campo y una diferencia de potencial entre ellas.
- **Para qué se usa:** para **acumular carga** y **energía eléctrica** ($U = \frac{1}{2}C\,\Delta V^2$) y entregarla cuando hace falta: flash de la cámara, sistemas de encendido, circuitos de radio.
- **Cómo se carga:** conectando las placas a una **batería**, que funciona como una **bomba de carga**: saca electrones de una placa y los lleva a la otra hasta que la diferencia de potencial entre las placas es igual a la de la batería.
- **Forma:** la más común es la de **placas planas paralelas**, con $C = \dfrac{\varepsilon_0 A}{d}$.

```grafico
titulo: Capacitor de placas paralelas cargado: campo uniforme de +Q a −Q
placa (-1.5, -1.6) (-1.5, 1.6) ; +
placa (1.5, -1.6) (1.5, 1.6) ; -
texto (-1.5, 1.95) "$+Q$"
texto (1.5, 1.95) "$-Q$"
segmento (-1.5, -2) (1.5, -2) ; gris ; punteada ; "$d$"
animar: no
x: -3.2..3.2
y: -2.4..2.3
```

```circuito
titulo: Carga de un capacitor: al cerrar el interruptor, la batería pasa electrones de una placa a la otra
bateria (0,0) (0,2) ; "$\Delta V$"
cable (0,2) (1.5,2)
interruptor (1.5,2) (2.7,2) ; cerrado
cable (2.7,2) (4,2) (4,1.4)
capacitor (4,1.4) (4,0.6) ; "$C$"
cable (4,0.6) (4,0) (0,0)
```

📍 **En el teórico:** [[Capacitancia y capacitores#Qué es un capacitor|18/08 · Qué es un capacitor]], [[Capacitancia y capacitores#Cálculo de la capacitancia: placas paralelas|18/08 · Placas paralelas]] y [[Capacitancia y capacitores#Energía almacenada|18/08 · Energía almacenada]]. Serway, sec. 26.1 a 26.4.

::: aclaracion
**No está en el teórico:** otras formas de capacitor. El Serway (sec. 26.2) también calcula el **cilíndrico** (dos cilindros coaxiales, como un cable coaxial), $C = \dfrac{\ell}{2k_0\ln(b/a)}$, y el **esférico** (dos esferas concéntricas), $C = \dfrac{ab}{k_0(b - a)}$. En la práctica también hay capacitores **enrollados** (dos láminas metálicas y una de papel enrolladas en un tubo) y **electrolíticos**.
:::

## 9) ¿En qué unidad se mide la capacitancia? ¿Qué indica y de qué depende?

- **Unidad:** el **farad**, $\text{F} = \dfrac{\text{C}}{\text{V}}$. Es enorme: en la práctica se usan $\mu\text{F}$, $\text{nF}$ y $\text{pF}$.
- **Qué indica:** la **capacidad para almacenar carga**: cuánta carga guarda el capacitor **por cada volt** de diferencia de potencial, $C = \dfrac{Q}{\Delta V}$. En el gráfico de $Q$ contra $\Delta V$, es la pendiente de la recta.
- **De qué depende:** **solo de la geometría** del capacitor y del **dieléctrico**, no de la carga ni del voltaje (si se duplica $\Delta V$, se duplica $Q$ y $C$ queda igual). Para placas paralelas:
  - el **área** $A$ de las placas: $C \propto A$;
  - la **distancia** $d$ entre ellas: $C \propto \frac{1}{d}$;
  - el **material dieléctrico**: con un dieléctrico de constante $\kappa$, $C = \kappa\,C_0$ (aumenta).

$$
C = \frac{\kappa\,\varepsilon_0\,A}{d}
$$

```grafico
titulo: Q en función de ΔV: rectas por el origen cuya pendiente es la capacitancia
y = 2x ; azul ; gruesa ; "$C_1$ (mayor)"
y = 0.8x ; rojo ; gruesa ; "$C_2$ (menor)"
ejes: ΔV, Q
aspecto: libre
alto: 250
x: 0..5
y: 0..10
```

📍 **En el teórico:** [[Capacitancia y capacitores#Capacitancia|18/08 · Capacitancia]], [[Capacitancia y capacitores#Cálculo de la capacitancia: placas paralelas|18/08 · Placas paralelas]] y [[Capacitancia y capacitores#Influencia del material dieléctrico|18/08 · Dieléctrico]]. Serway, sec. 26.1, 26.2 y 26.5.

## 10) ¿Qué es la corriente eléctrica? ¿Qué es la velocidad de arrastre?

- **Corriente eléctrica:** la **cantidad de carga que atraviesa una sección** del conductor **por unidad de tiempo**: $I = \dfrac{\dd Q}{\dd t}$. Unidad: el **ampere**, $\text{A} = \dfrac{\text{C}}{\text{s}}$. Por convención, su sentido es el del movimiento de las cargas **positivas** (en un metal se mueven los electrones, al revés).
- **Velocidad de arrastre (o de deriva):** los electrones de un metal se mueven al azar y muy rápido, chocando con los átomos, pero con un campo eléctrico aplicado tienen además un pequeño desplazamiento promedio en un sentido. La **velocidad media** de ese avance es la de arrastre, $v_d$. Es **muy lenta** (del orden de décimas de milímetro por segundo), y se relaciona con la corriente así:

$$
I = n\,q\,v_d\,A
$$

con $n$ los portadores de carga por unidad de volumen y $A$ la sección.

```grafico
titulo: Los electrones avanzan despacio (v_d) en contra de E; la corriente convencional va a favor de E
segmento (-3, 0.8) (3, 0.8) ; gris ; gruesa
segmento (-3, -0.8) (3, -0.8) ; gris ; gruesa
vector (-2.6, 1.3) (-1.2, 1.3) ; azul ; "$\vec E$"
vector (1.2, 1.3) (2.6, 1.3) ; violeta ; "$I$"
(-1.4, 0.25) ; "$e^-$"
vector (-1.4, 0.25) (-2.2, 0.25) ; rojo ; "$\vec v_d$"
(0.9, -0.3) ; "$e^-$"
vector (0.9, -0.3) (0.1, -0.3) ; rojo
(2.3, 0.35) ; "$e^-$"
vector (2.3, 0.35) (1.5, 0.35) ; rojo
texto (0, -1.25) "sección $A$"
leyenda: no
x: -3.4..3.4
y: -1.6..1.7
```

📍 **En el teórico:** [[Corriente eléctrica, resistencia y resistividad#Corriente eléctrica|25/08 · Corriente eléctrica]] y [[Corriente eléctrica, resistencia y resistividad#Velocidad de arrastre (o de deriva)|25/08 · Velocidad de arrastre]]. Serway, sec. 27.1.

## 11) ¿Cuál es la relación que cumplen los materiales óhmicos?

En un material **óhmico**, la densidad de corriente es **proporcional al campo eléctrico**, con una conductividad $\sigma$ constante:

$$
J = \sigma\,E \qquad\text{(forma microscópica)} \qquad\qquad \Delta V = I\,R \qquad\text{(ley de Ohm)}
$$

Es decir: **la corriente es proporcional a la diferencia de potencial**, y la resistencia $R$ **no depende** de $\Delta V$ ni de $I$. El gráfico de $I$ en función de $\Delta V$ es una **recta** que pasa por el origen. Los materiales **no óhmicos**, como el diodo, no cumplen esa proporción: su gráfico no es una recta.

```grafico
titulo: Óhmico: I proporcional a ΔV (recta, pendiente 1/R). No óhmico (diodo): curva
y = 0.6x ; azul ; gruesa ; "óhmico"
y = 0.04*(e^(1.3*x) - 1) ; rojo ; gruesa ; "diodo (no óhmico)"
ejes: ΔV, I
aspecto: libre
alto: 250
x: -1..4
y: -0.5..4
```

📍 **En el teórico:** [[Corriente eléctrica, resistencia y resistividad#Densidad de corriente|25/08 · Densidad de corriente]] (ley de Ohm microscópica, óhmicos y no óhmicos) y [[Corriente eléctrica, resistencia y resistividad#Resistencia y resistividad|25/08 · Resistencia y resistividad]]. Serway, sec. 27.2.

## 12) ¿Qué es la resistencia eléctrica?

Es la **oposición** de un conductor al paso de la corriente: la diferencia de potencial necesaria por cada ampere que circula.

$$
R = \frac{\Delta V}{I} \qquad [R] = \frac{\text{V}}{\text{A}} = \Omega\ \text{(ohm)} \qquad\qquad R = \rho\,\frac{\ell}{A}
$$

Depende del **material** (su resistividad $\rho$), de la **longitud** $\ell$ (más largo, más resistencia), de la **sección** $A$ (más grueso, menos resistencia) y de la **temperatura**. Se mide con el **óhmetro** (el multímetro, sin tensión aplicada).

```grafico
titulo: R = ρ ℓ / A: más largo, más resistencia; más grueso, menos resistencia
segmento (-2.5, 0.4) (2.5, 0.4) ; gris
segmento (-2.5, -0.4) (2.5, -0.4) ; gris
segmento (-2.5, -0.4) (-2.5, 0.4) ; verde ; gruesa ; "$A$"
segmento (-2.5, -0.75) (2.5, -0.75) ; gris ; punteada ; "$\ell$"
vector (-1.5, 0) (0.5, 0) ; violeta ; "$I$"
texto (1.5, 0) "$\rho$"
x: -3.2..3.2
y: -1.1..0.9
alto: 170
```

📍 **En el teórico:** [[Corriente eléctrica, resistencia y resistividad#Resistencia y resistividad|25/08 · Resistencia y resistividad]] y [[Corriente eléctrica, resistencia y resistividad#Medir con el multímetro|25/08 · Medir con el multímetro]]. Serway, sec. 27.2.

## 13) ¿Cómo se comporta la resistividad de los materiales óhmicos con la temperatura?

En los **metales** (los conductores óhmicos), **la resistividad aumenta con la temperatura**: al calentarse, los átomos vibran más y los electrones chocan más. En un rango no muy grande, el aumento es lineal:

$$
\rho = \rho_0\,[1 + \alpha\,(T - T_0)] \qquad\qquad R = R_0\,[1 + \alpha\,(T - T_0)]
$$

con $\alpha > 0$, el **coeficiente de temperatura** de la resistividad. En cambio, en los **semiconductores** (carbono, silicio, germanio) la resistividad **disminuye** al aumentar la temperatura ($\alpha < 0$).

```grafico
titulo: Resistividad en función de la temperatura: los metales suben, los semiconductores bajan
y = 1 + 0.004*x ; azul ; gruesa ; "metal ($\alpha > 0$)"
y = 2.6*e^(-x/120) ; rojo ; gruesa ; "semiconductor ($\alpha < 0$)"
ejes: T, ρ
aspecto: libre
alto: 250
x: 0..300
y: 0..3
```

📍 **En el teórico:** [[Corriente eléctrica, resistencia y resistividad#Variación de la resistividad con la temperatura|25/08 · Variación de la resistividad con la temperatura]]. Serway, sec. 27.4.

## 14) Si se conecta un resistor en paralelo con otro, ¿la resistencia total aumenta, disminuye o no cambia?

**Disminuye.** En paralelo,

$$
\frac{1}{R_{eq}} = \frac{1}{R_1} + \frac{1}{R_2}
$$

y la resistencia equivalente queda **por debajo de la menor** de las dos. Al agregar un resistor en paralelo, se abre **otro camino** para la corriente: con la misma diferencia de potencial circula más corriente total, que es lo mismo que menos resistencia. Por ejemplo, $10\,\Omega$ en paralelo con $2\,\Omega$ da $1{,}67\,\Omega$. (En serie pasa lo contrario: la resistencia total aumenta.)

```circuito
titulo: En paralelo: los dos resistores tienen la misma ΔV y la corriente se reparte
bateria (0,0) (0,2) ; "$\Delta V$"
cable (0,2) (4,2)
cable (2,2) (2,1.5)
R (2,1.5) (2,0.5) ; "$R_1$"
cable (2,0.5) (2,0)
R (4,2) (4,0) ; "$R_2$"
cable (4,0) (0,0)
corriente (0.6,2) (1.4,2) ; "$I$"
corriente (2,1.95) (2,1.55) ; "$I_1$"
corriente (2.6,2) (3.4,2) ; "$I_2$"
```

📍 **En el teórico:** [[Conexión de resistores y leyes de Kirchhoff#2. En paralelo|01/09 · Resistores en paralelo]]. Serway, sec. 28.2.

## 15) ¿Qué enuncian las dos leyes de Kirchhoff? ¿Para qué se utilizan?

- **1ª ley, de los nudos** (conservación de la **carga**): en cualquier nudo, la suma de las corrientes que entran es igual a la suma de las que salen: $\sum I = 0$.
- **2ª ley, de las mallas** (conservación de la **energía**): al recorrer cualquier malla cerrada, la suma de las diferencias de potencial (subidas en las baterías y caídas en las resistencias) es cero: $\sum \Delta V = 0$.

**Para qué se usan:** para **resolver circuitos** que no se pueden reducir a combinaciones simples de serie y paralelo (por ejemplo, con varias baterías en distintas ramas): se plantea una ecuación por nudo y por malla hasta tener tantas ecuaciones como corrientes incógnitas. Si una corriente da negativa, circulaba al revés de lo propuesto.

```circuito
titulo: Nudos a y b: lo que entra es igual a lo que sale. En cada malla, la suma de las ΔV es cero
cable (0,0) (0,4)
R (0,4) (4,4) ; "$R_1$"
cable (4,4) (4,2)
R (0,2) (2,2) ; "$R_2$"
bateria (4,2) (2,2) ; "$\varepsilon_2$"
R (4,2) (4,0) ; "$R_3$"
bateria (0,0) (4,0) ; "$\varepsilon_1$"
nodo (0,2) ; "a"
nodo (4,2) ; "b"
corriente (0,2.6) (0,3.6) ; "$I_1$"
corriente (0.6,2) (1.4,2) ; "$I_2$"
corriente (4,1.4) (4,0.6) ; "$I_3$"
malla (2,3) ; horaria
malla (2,1) ; horaria
```

📍 **En el teórico:** [[Conexión de resistores y leyes de Kirchhoff#Leyes de Kirchhoff|01/09 · Leyes de Kirchhoff]] y [[Método de Kirchhoff (EJ6)#Pasos|01/09 · Método de Kirchhoff]]. Serway, sec. 28.3.

## 16) ¿Qué es la potencia eléctrica? ¿Qué es el efecto Joule? ¿Cuándo es deseado y cuándo no?

- **Potencia eléctrica:** la **rapidez con la que se transforma la energía** eléctrica: $P = \dfrac{\dd U}{\dd t} = I\,\Delta V$. Unidad: el **watt**, $\text{W} = \dfrac{\text{J}}{\text{s}} = \text{V}\cdot\text{A}$. En un resistor:

$$
P = I\,\Delta V = I^2 R = \frac{\Delta V^2}{R}
$$

- **Efecto Joule:** la conversión de energía eléctrica en **calor** cuando la corriente atraviesa un resistor. Las cargas pierden energía al chocar con los átomos, el resistor se calienta, y en régimen entrega al ambiente como calor la misma energía que recibe.
- **Cuándo es deseado:** cuando lo que se busca es **calor**: estufas, pavas eléctricas, tostadoras, planchas, los fusibles (que se funden a propósito) y las lámparas incandescentes.

```grafico
titulo: P = I²R: con el doble de corriente, cuatro veces más calor
y = x^2 ; rojo ; gruesa
(1, 1) ; "$P$"
(2, 4) ; "$4P$"
ejes: I, P
leyenda: no
aspecto: libre
alto: 230
x: 0..2.4
y: 0..5.5
```

📍 **En el teórico:** [[Potencia eléctrica, efecto Joule y resistencia interna#Efecto Joule|01/09 · Efecto Joule]] (definición, potencia y ejemplos deseados). Serway, sec. 27.6.

::: aclaracion
**No está en el teórico: cuándo el efecto Joule NO es deseado.** Es cuando la energía se pierde como calor sin que nadie lo quiera (Serway, sec. 27.6):

- en los **cables de transmisión** de energía, donde se pierde $I^2 R$. Por eso la energía se transporta en **alta tensión** y baja corriente: con la misma potencia, menos corriente da muchas menos pérdidas;
- en **motores, transformadores y circuitos electrónicos**, donde el calor es energía desperdiciada y además puede dañar los componentes (hay que ventilarlos);
- en las **instalaciones** con cables demasiado finos para la corriente: se recalientan y pueden provocar incendios (para eso están los fusibles y las térmicas).
:::
