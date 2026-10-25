# Potencia eléctrica, efecto Joule y resistencia interna

*Clase teórica del 01/09 (primera parte). Completado con el Serway, sec. 27.6 (Potencia eléctrica) y 28.1 (Fuerza electromotriz). La clase sigue con [[Conexión de resistores y leyes de Kirchhoff]].*

Potencia: $\dfrac{W}{t}$, donde $W$ es el **trabajo** (no el watt) y $t$ el tiempo.

## Efecto Joule

```circuito
titulo: La fuente le da energía a las cargas; en el resistor se convierte en calor $Q$
bateria (2.2,0) (0.8,0) ; "$\Delta V$"
cable (0.8,0) (0,0) (0,2) (0.8,2)
R (0.8,2) (2.2,2) ; "$R$"
cable (2.2,2) (3,2) (3,0) (2.2,0)
etiqueta (0.8,-0.3) "$b$"
etiqueta (2.2,-0.3) "$a$"
etiqueta (0.8,2.3) "$c$"
etiqueta (2.2,2.3) "$d$"
etiqueta (2.75,2.65) "$\nearrow Q$"
corriente (0,0.6) (0,1.4) ; "$I$"
corriente (3,1.4) (3,0.6) ; "$I$"
```

Siguiendo una carga positiva que da la vuelta al circuito:

1. **De $a$ a $b$** (dentro de la batería): la carga **gana energía potencial eléctrica** ($\Delta U = Q\,\Delta V$). La batería la saca de su energía química.
2. **De $c$ a $d$** (en el resistor): la carga pierde esa energía chocando con los átomos. **Aumenta la temperatura**: aumenta la energía interna del resistor.
3. Cuando se llega al régimen, **la temperatura queda constante**: el resistor le pasa al ambiente, como **calor** $Q$, la misma energía que recibe.

Esa conversión de energía eléctrica en calor en un resistor es el **efecto Joule**. Así funcionan la estufa, la pava eléctrica y la tostadora (Serway, sec. 27.6).

**Potencia**: es la **velocidad con la que se transforma la energía**.

::: pasos
P = \frac{\dd U}{\dd t} = \frac{\dd (Q\cdot\Delta V)}{\dd t}
  = \frac{\dd Q}{\dd t}\cdot\Delta V                          // $\Delta V$ constante
  = I\cdot\Delta V                                      // $\frac{\dd Q}{\dd t}$ es la intensidad
:::

::: resultado Potencia eléctrica
$$
P = I\cdot\Delta V \qquad\qquad [P] = \text{W}\ \text{(watt)} = \frac{\text{J}}{\text{s}}
$$
:::

Con la ley de Ohm, $\Delta V = I\cdot R$, la potencia que se disipa en un resistor también se escribe:

$$
P = I^2\cdot R \qquad\qquad P = \frac{\Delta V^2}{R}
$$

Unidad: $\text{W} = \text{A}\cdot\text{V} = \dfrac{\text{C}}{\text{s}}\cdot\dfrac{\text{J}}{\text{C}} = \dfrac{\text{J}}{\text{s}}$.

::: observacion
La compañía eléctrica cobra la **energía**, no la potencia: $E = P\,\Delta t$. Se mide en **kilowatt-hora**: $1\,\text{kWh} = 1000\,\text{W}\cdot 3600\,\text{s} = 3{,}6\times10^{6}\,\text{J}$ (Serway, sec. 27.6).
:::

::: ejemplo Se calientan $m = 1{,}5\,\text{kg}$ de agua de $T_0 = 10\,°\text{C}$ a $T_f = 50\,°\text{C}$ en $\Delta t = 10\,\text{min}$. ¿Qué potencia hace falta?
::: solucion
El calor que necesita el agua (calorimetría, con $c_e = 1\,\frac{\text{cal}}{\text{g}\,°\text{C}}$):

::: pasos
Q = m\cdot c_e\cdot\Delta T = 1500\,\text{g}\cdot 1\,\frac{\text{cal}}{\text{g}\,°\text{C}}\cdot 40\,°\text{C} = 60\,000\,\text{cal}
Q = 60\,000\,\text{cal}\cdot 4{,}186\,\frac{\text{J}}{\text{cal}} \approx 251\,000\,\text{J}       // se pasa a joule
P = \frac{Q}{\Delta t} = \frac{251\,000\,\text{J}}{600\,\text{s}}       // $10\,\text{min} = 600\,\text{s}$
:::

::: resultado
$$
P \approx 419\ \text{W}
$$
:::

::: aclaracion
En la hoja quedó $Q = 6000\,\text{cal}$, pero $1500 \cdot 1 \cdot 40 = 60\,000\,\text{cal}$, y la cuenta de $P$ quedó sin terminar.
:::
:::
:::

## Circuito eléctrico: resistencia interna

```circuito
titulo: La batería: fem $\varepsilon$ y resistencia interna $r$ (su material también ofrece resistencia)
cable (0,0) (0.3,0)
R (0.3,0) (1.3,0) ; "$r$"
cable (1.3,0) (1.7,0)
bateria (1.7,0) (2.7,0) ; "$\varepsilon$"
cable (2.7,0) (3,0)
cable (0,0) (0,2) (0.8,2)
R (0.8,2) (2.2,2) ; "$R$"
cable (2.2,2) (3,2) (3,0)
etiqueta (-0.3,-0.3) "$a$"
etiqueta (3.3,-0.3) "$b$"
etiqueta (0.8,2.3) "$c$"
etiqueta (2.2,2.3) "$d$"
corriente (3,0.6) (3,1.4) ; "$I$"
```

- $\varepsilon$: **fem** (fuerza electromotriz de la fuente). Es la tensión entre los bornes **cuando no circula corriente**, el valor nominal de la batería.
- La batería real tiene una **resistencia interna** $r$: su propio material también ofrece resistencia, y está en serie con la fem.
- Cuando circula corriente, la tensión entre los bornes es **menor** que la fem: $\varepsilon > \Delta V$. Parte de la fem se pierde en $r$.

::: pasos
\Delta V = \varepsilon - I\cdot r       // tensión entre los bornes de la batería
I\cdot R = \varepsilon - I\cdot r          // en el resistor externo, $\Delta V = I\cdot R$
\varepsilon = I\cdot R + I\cdot r
            = I\,(R + r)                    // $R$ y $r$ están en serie
:::

::: resultado Batería con resistencia interna
$$
\Delta V = \varepsilon - I\,r \qquad\qquad I = \frac{\varepsilon}{R + r}
$$
:::

Multiplicando $\varepsilon = I R + I r$ por $I$ queda el balance de potencias: la batería entrega $\varepsilon\,I$, que se reparte en $I^2 R$ (en la carga, lo útil) y $I^2 r$ (calor dentro de la batería) (Serway, sec. 28.1).

::: ejemplo Una batería tiene una fem de $12\,\text{V}$ y una resistencia interna de $0{,}05\,\Omega$. Sus bornes se conectan a una resistencia de carga de $3\,\Omega$. Calcular la corriente, la tensión entre los bornes y las potencias en $R$, en $r$ y la que entrega la batería
::: solucion
Es el ejemplo 28.1 del Serway.

::: pasos
I = \frac{\varepsilon}{R + r} = \frac{12\,\text{V}}{3{,}05\,\Omega} \approx 3{,}93\,\text{A}
\Delta V = \varepsilon - I\,r = 12\,\text{V} - 3{,}93\,\text{A}\cdot 0{,}05\,\Omega \approx 11{,}8\,\text{V}       // control: $I R = 3{,}93\cdot 3 = 11{,}8\,\text{V}$
P_R = I^2 R = (3{,}93\,\text{A})^2\cdot 3\,\Omega \approx 46{,}3\,\text{W}
P_r = I^2 r = (3{,}93\,\text{A})^2\cdot 0{,}05\,\Omega \approx 0{,}77\,\text{W}
P = \varepsilon\,I = P_R + P_r \approx 47{,}1\,\text{W}
:::

::: resultado
$$
I \approx 3{,}93\ \text{A} \qquad \Delta V \approx 11{,}8\ \text{V} \qquad P_R \approx 46{,}3\ \text{W} \qquad P_r \approx 0{,}77\ \text{W} \qquad P \approx 47{,}1\ \text{W}
$$
:::

Con una $r$ chica casi toda la potencia llega a la carga. Al envejecer, la $r$ de la batería aumenta: con $r = 2\,\Omega$ la corriente baja a $2{,}4\,\text{A}$, la tensión en los bornes a $7{,}2\,\text{V}$, y el $40\,\%$ de la potencia se queda en la batería.
:::
:::
