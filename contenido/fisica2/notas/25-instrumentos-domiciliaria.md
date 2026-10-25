# Instrumentos y circuitos de medición, instalación domiciliaria

*Clase teórica del 15/09. Completado con el Serway, sec. 28.5 (Medidores eléctricos) y 28.6 (Cableado doméstico y seguridad eléctrica). El puente de Wheatstone y el circuito potenciométrico no están en esta edición del Serway: salen de la clase y de las leyes de Kirchhoff ([[Conexión de resistores y leyes de Kirchhoff]]).*

## Instrumentos de medición

### Galvanómetro

```circuito
titulo: Símbolo del galvanómetro
animar: no
cable (0,0) (1,0)
galvanometro (1,0) (2,0)
cable (2,0) (3,0)
```

Es la pieza básica de los medidores **analógicos** (de aguja). Es una **bobina** de alambre que puede girar en el campo magnético de un imán permanente; tiene una aguja pegada. Cuando pasa corriente por la bobina, el campo la hace girar, y **la desviación de la aguja es proporcional a la corriente** (Serway, sec. 28.5).

Tiene dos limitaciones:

- su resistencia es de unos $60\,\Omega$, mucha para meterla en un circuito;
- la aguja llega al fondo de escala con corrientes muy chicas, del orden de $1\,\text{mA}$.

Por eso, para medir corrientes o tensiones de verdad, se lo combina con una resistencia.

### Amperímetro

Mide **corriente**. Se coloca **en serie** en el circuito: la corriente que se quiere medir tiene que pasar por adentro del aparato.

```circuito
titulo: El amperímetro va en serie
animar: no
bateria (3,0) (0,0) ; "$\varepsilon$" ; abajo
cable (0,0) (0,2) (0.3,2)
R (0.3,2) (1.3,2) ; "$R_1$"
amperimetro (1.3,2) (2,2)
R (2,2) (3,2) ; "$R_2$"
cable (3,2) (3,0)
corriente (1.35,2.35) (1.95,2.35) ; "$I$"
```

**Cómo se construye:** con una resistencia de **desviación** $R_p$ **en paralelo** con el galvanómetro, para que el conjunto tenga **resistencia baja**. $R_p$ es mucho menor que la del galvanómetro, así que casi toda la corriente se va por $R_p$ y por el galvanómetro pasa solo una fracción chica, que no lo satura.

```circuito
titulo: Amperímetro por dentro: galvanómetro ($60\,\Omega$) con $R_p$ en paralelo
animar: no
cable (0,1) (0.8,1)
cable (0.8,0.4) (0.8,1.6)
galvanometro (0.8,1.6) (2.8,1.6) ; "$60\,\Omega$"
R (0.8,0.4) (2.8,0.4) ; "$R_p$" ; abajo
cable (2.8,0.4) (2.8,1.6)
cable (2.8,1) (3.6,1)
nodo (0,1)
nodo (3.6,1)
```

::: claves
- El amperímetro **ideal** tiene resistencia **cero**: no cambia la corriente que mide.
- Como $R_p \ll R_G$, la resistencia del amperímetro queda $R_A = \dfrac{R_p\,R_G}{R_p + R_G} \approx R_p$, chiquita.
:::

::: aclaracion
En la hoja quedó «$R_A \ll R_p$». Lo que es mucho menor es $R_p$ comparada con la del galvanómetro ($R_p \ll R_G = 60\,\Omega$). La del amperímetro, $R_A$, es el paralelo de las dos: un poco **menor** que $R_p$, pero del mismo orden.
:::

::: observacion
Por qué no sirve el galvanómetro solo: un circuito con una pila de $3\,\text{V}$ y una resistencia de $3\,\Omega$ lleva $1\,\text{A}$. Si se mete en serie un galvanómetro de $60\,\Omega$, la resistencia total pasa a $63\,\Omega$ y la corriente cae a $0{,}048\,\text{A}$. El aparato cambió lo que quería medir (Serway, sec. 28.5).
:::

### Voltímetro

Mide **diferencia de potencial**. Se coloca **en paralelo** con lo que se mide, sin abrir el circuito.

```circuito
titulo: El voltímetro va en paralelo con la resistencia
animar: no
cable (0,1.6) (0.8,1.6)
R (0.8,1.6) (2.2,1.6) ; "$R_1$"
R (2.8,1.6) (4.2,1.6) ; "$R_2$"
cable (2.2,1.6) (2.8,1.6)
cable (0.8,1.6) (0.8,0.8)
voltimetro (0.8,0.8) (2.2,0.8)
cable (2.2,0.8) (2.2,1.6)
corriente (0.1,1.6) (0.6,1.6) ; "$I$"
```

**Cómo se construye:** con una resistencia $R_s$ **en serie** con el galvanómetro, para que el conjunto tenga **resistencia alta**. Así por el voltímetro casi no se desvía corriente y no altera la tensión que mide.

```circuito
titulo: Voltímetro por dentro: galvanómetro con $R_s$ en serie
animar: no
cable (0,1.6) (0.8,1.6)
R (0.8,1.6) (2.2,1.6) ; "$R_1$"
R (2.8,1.6) (4.2,1.6) ; "$R_2$"
cable (2.2,1.6) (2.8,1.6)
cable (0.8,1.6) (0.8,0.6)
galvanometro (0.8,0.6) (1.5,0.6)
R (1.5,0.6) (2.2,0.6) ; "$R_s$" ; abajo
cable (2.2,0.6) (2.2,1.6)
```

::: claves
- El voltímetro **ideal** tiene resistencia **infinita**: por él no pasa corriente.
- Amperímetro: en **serie**, resistencia **baja** ($R_p$ en paralelo). Voltímetro: en **paralelo**, resistencia **alta** ($R_s$ en serie).
:::

::: ejemplo Un galvanómetro de $R_G = 60\,\Omega$ llega al fondo de escala con $I_G = 1\,\text{mA}$. ¿Qué $R_p$ hace falta para convertirlo en un amperímetro de $1\,\text{A}$? ¿Y qué $R_s$ para un voltímetro de $10\,\text{V}$?
::: solucion
**Amperímetro.** A fondo de escala entra $1\,\text{A}$: $1\,\text{mA}$ va por el galvanómetro y el resto, $0{,}999\,\text{A}$, por $R_p$. Los dos están en paralelo, con la misma tensión:

::: pasos
I_G\,R_G = (I - I_G)\,R_p
R_p = \frac{I_G\,R_G}{I - I_G} = \frac{0{,}001\,\text{A}\cdot 60\,\Omega}{0{,}999\,\text{A}} \approx 0{,}06\,\Omega
:::

**Voltímetro.** Con $10\,\text{V}$ entre sus bornes tiene que pasar $1\,\text{mA}$ por el galvanómetro y $R_s$, que están en serie:

::: pasos
10\,\text{V} = I_G\,(R_G + R_s)
R_s = \frac{10\,\text{V}}{0{,}001\,\text{A}} - 60\,\Omega = 9940\,\Omega
:::

::: resultado
$$
R_p \approx 0{,}06\ \Omega \ \text{(amperímetro: muy baja)} \qquad\qquad R_s = 9940\ \Omega \ \text{(voltímetro: muy alta)}
$$
:::

*(Ejemplo armado con los valores típicos del Serway, no es de la clase.)*
:::
:::

## Circuitos de medición

### 1. Puente de Wheatstone

Sirve para **medir una resistencia desconocida $R_x$ con alta precisión**. $R_1$ es una resistencia variable (en la clase, una de largo variable) y $R_2$, $R_3$ son conocidas. Entre los puntos $a$ y $b$ se conecta un voltímetro (o un galvanómetro).

```circuito
titulo: Puente de Wheatstone: se ajusta $R_1$ hasta que el voltímetro marque cero
animar: no
bateria (0,0) (0,2) ; "$\varepsilon$" ; izquierda
cable (0,2) (0,3.2) (2.5,3.2) (2.5,3)
R (2.5,3) (1.3,1.8) ; "$R_1$" ; izquierda
R (2.5,3) (3.7,1.8) ; "$R_2$" ; derecha
R (1.3,1.8) (2.5,0.6) ; "$R_3$" ; izquierda
R (3.7,1.8) (2.5,0.6) ; "$R_x$" ; derecha
voltimetro (1.3,1.8) (3.7,1.8)
cable (2.5,0.6) (2.5,0) (0,0)
nodo (1.3,1.8) ; "a"
nodo (3.7,1.8) ; "b"
corriente (0.6,3.2) (1.3,3.2) ; "$I$"
```

**1°** Se regula el valor de $R_1$ de manera que el voltímetro marque **cero**: el puente está **equilibrado**.

Entonces $\Delta V_{ab} = 0$, o sea $V_a = V_b$. Por el voltímetro no pasa corriente: por $R_1$ y $R_3$ circula la misma $I_1$, y por $R_2$ y $R_x$, la misma $I_2$. Como $a$ y $b$ están al mismo potencial, la caída en $R_1$ es igual a la de $R_2$, y la de $R_3$ igual a la de $R_x$:

::: pasos
I_1\,R_1 = I_2\,R_2       // misma caída desde arriba hasta $a$ y hasta $b$
I_1\,R_3 = I_2\,R_x       // misma caída desde $a$ y desde $b$ hasta abajo
\frac{R_1}{R_3} = \frac{R_2}{R_x}       // dividiendo miembro a miembro, se van $I_1$ e $I_2$
:::

::: resultado Puente de Wheatstone equilibrado
$$
R_x = \frac{R_2\,R_3}{R_1}
$$
:::

No depende de la fem ni de las corrientes, solo de las resistencias conocidas: por eso es tan preciso.

::: ejemplo El puente se equilibra con $R_1 = 25\,\Omega$, siendo $R_2 = 100\,\Omega$ y $R_3 = 50\,\Omega$. ¿Cuánto vale $R_x$?
::: solucion
$$
R_x = \frac{R_2\,R_3}{R_1} = \frac{100\,\Omega\cdot 50\,\Omega}{25\,\Omega} = 200\,\Omega
$$

Control: $\frac{R_1}{R_3} = \frac{25}{50} = 0{,}5$ y $\frac{R_2}{R_x} = \frac{100}{200} = 0{,}5$.
:::
:::

### 2. Circuito potenciométrico

Sirve para **medir una fem desconocida $\varepsilon_x$**. Una fuente $\varepsilon_0$ hace circular una corriente $I$ por una resistencia variable; en paralelo con un tramo $R_x$ de esa resistencia se conecta la fem a medir, con un amperímetro.

```circuito
titulo: Circuito potenciométrico: se ajusta $R_x$ hasta que el amperímetro marque cero
animar: no
bateria (0,0) (0,2) ; "$\varepsilon_0$" ; izquierda
cable (0,2) (0,3) (2,3)
R (2,3) (2,1) ; "$R_x$ (variable)" ; izquierda
cable (2,1) (2,0) (0,0)
cable (2,3) (4,3)
bateria (4,2.2) (4,3) ; "$\varepsilon_x$" ; derecha
amperimetro (4,2) (4,1.2)
cable (4,2.2) (4,2)
cable (4,1.2) (4,1) (2,1)
nodo (2,3) ; "a"
etiqueta (4.3,3.3) "$b$"
etiqueta (4.3,0.7) "$c$"
nodo (2,1) ; "d"
corriente (0.5,3) (1.3,3) ; "$I$"
corriente (2.6,3) (3.4,3) ; "$I_x$"
```

**1°** Se aplica la 2ª ley de Kirchhoff a la malla $abcda$, por la que circula $I_x$ (y por $R_x$ circula $I - I_x$):

$$
-\varepsilon_x + (I - I_x)\,R_x = 0
$$

**2°** Se ajusta $R_x$ de modo que el amperímetro marque cero: $I_x = 0$.

::: pasos
-\varepsilon_x + I\,R_x = 0
\varepsilon_x = I\,R_x
:::

**3°** Se cambia $\varepsilon_x$ por una fem **conocida** (patrón) $\varepsilon_s$ y se repite el procedimiento. El amperímetro vuelve a marcar cero con otro valor, $R_s$:

$$
\varepsilon_s = I\,R_s
$$

**4°** La corriente $I$ es la misma en los dos casos (la pone $\varepsilon_0$, y por la rama de la fem no pasa nada):

::: pasos
I = \frac{\varepsilon_x}{R_x} \qquad I = \frac{\varepsilon_s}{R_s}
\frac{\varepsilon_x}{R_x} = \frac{\varepsilon_s}{R_s}
:::

::: resultado Circuito potenciométrico
$$
\varepsilon_x = \frac{\varepsilon_s}{R_s}\,R_x
$$
:::

::: observacion
Como en el momento de medir **no circula corriente** por la fem desconocida ($I_x = 0$), no hay caída en su resistencia interna: se mide la fem de verdad, no la tensión entre bornes (ver [[Potencia eléctrica, efecto Joule y resistencia interna]]). Un voltímetro común, en cambio, siempre deja pasar algo de corriente.
:::

## Instalación domiciliaria

Los artefactos de una casa se conectan **en paralelo**:

- **para que sean independientes**: cada uno se prende y se apaga con su llave sin afectar a los demás;
- **para que funcionen a la misma tensión**, la de la red: $220\,\text{V}$.

```circuito
titulo: Instalación domiciliaria: cada artefacto en paralelo, con su llave, a $220\,\text{V}$
animar: no
bateria (1.5,0) (2.5,0) ; "$220\,\text{V}$" ; abajo
cable (0,0) (1.5,0)
cable (2.5,0) (4,0)
cable (0,0) (0,3)
cable (4,0) (4,3)
interruptor (0,1) (1,1) ; cerrado
R (1.8,1) (3.2,1) ; "lavarropas"
cable (1,1) (1.8,1)
cable (3.2,1) (4,1)
interruptor (0,2) (1,2) ; abierto
R (1.8,2) (3.2,2) ; "lámpara"
cable (1,2) (1.8,2)
cable (3.2,2) (4,2)
interruptor (0,3) (1,3) ; cerrado
R (1.8,3) (3.2,3) ; "ventilador"
cable (1,3) (1.8,3)
cable (3.2,3) (4,3)
corriente (-0.01,0.3) (-0.01,0.8) ; "$I_{max}$" ; izquierda
```

Por el cable principal pasa la **suma** de las corrientes de todos los artefactos prendidos. La **corriente máxima** $I_{max}$ que puede circular define el **grosor del cableado**: un cable más grueso tiene menos resistencia y se calienta menos (efecto Joule).

::: ejemplo En un mismo circuito de $220\,\text{V}$ se enchufan una tostadora de $1000\,\text{W}$, un microondas de $1300\,\text{W}$ y una cafetera de $800\,\text{W}$. ¿Qué corriente pasa por el cable si funcionan los tres a la vez?
::: solucion
Cada uno toma $I = \frac{P}{\Delta V}$, y en paralelo las corrientes se suman:

::: pasos
I_{tost} = \frac{1000\,\text{W}}{220\,\text{V}} \approx 4{,}5\,\text{A} \qquad I_{micro} = \frac{1300\,\text{W}}{220\,\text{V}} \approx 5{,}9\,\text{A} \qquad I_{caf} = \frac{800\,\text{W}}{220\,\text{V}} \approx 3{,}6\,\text{A}
I = 4{,}5 + 5{,}9 + 3{,}6 \approx 14\,\text{A}       // o directo: $\frac{3100\,\text{W}}{220\,\text{V}}$
:::

El cable y la llave térmica de ese circuito tienen que soportar al menos $14\,\text{A}$. *(Es el ejemplo del Serway, sec. 28.6, pasado de $120\,\text{V}$ a los $220\,\text{V}$ de acá.)*
:::
:::

## Seguridad eléctrica

- **Disyuntor (diferencial)**: detecta **fuga de corriente** (corriente que se va a tierra, por ejemplo a través de una persona) y corta. **Salva vidas.**
- **Llaves térmicas**: detectan **corriente alta**, por **cortocircuito** o **sobrecarga** (demasiados artefactos en el mismo circuito), y cortan. Protegen la instalación.
- **Cable a tierra**: conecta las carcasas metálicas de los artefactos a tierra. Si un cable pelado toca la carcasa, la corriente se va por la tierra y no por quien la toca.
- **Fusibles**: un alambre que se funde si pasa demasiada corriente. Es la protección más antigua; hoy se usan las llaves térmicas.

::: observacion
Un **cortocircuito** es una conexión de resistencia casi cero entre dos puntos a distinto potencial: la corriente se dispara. Para el cuerpo (Serway, sec. 28.6): unos $5\,\text{mA}$ se sienten como un golpe; más de $10\,\text{mA}$ contraen los músculos y no se puede soltar el cable; unos $100\,\text{mA}$ durante algunos segundos pueden ser mortales.
:::
