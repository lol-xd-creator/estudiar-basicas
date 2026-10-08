# Potencia eléctrica, efecto Joule y resistencia interna

*Clase del 08/09.*

Potencia: $\dfrac{W}{t}$, donde $W$ es el trabajo (no el watt) y $t$ el tiempo.

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

1. De $a$ a $b$: la carga **gana energía potencial eléctrica** ($\Delta U$).
2. De $c$ a $d$: **aumenta la temperatura**; aumenta la energía interna en el resistor.
3. La temperatura se mantiene constante.

**Potencia**: velocidad con la que se transforma la energía.

::: pasos
P = \frac{dU}{dt} = \frac{d(Q\cdot\Delta V)}{dt}
  = \frac{dQ}{dt}\cdot\Delta V                          // $\Delta V$ constante
  = I\cdot\Delta V                                      // $\frac{dQ}{dt}$ es la intensidad
:::

::: resultado
$$
P = I\cdot\Delta V \qquad [\text{W}] = \frac{\text{J}}{\text{s}}
$$
:::

Con la ley de Ohm, $\Delta V = I\cdot R$:

$$
P = I^2\cdot R \qquad\qquad P = \frac{\Delta V^2}{R}
$$

Unidad: $\text{W} = \text{A}\cdot\text{V} = \dfrac{\text{C}}{\text{s}}\cdot\dfrac{\text{J}}{\text{C}} = \dfrac{\text{J}}{\text{s}}$.

::: ejemplo Agua: $m = 1{,}5\,\text{kg}$, de $T_0 = 10\,°\text{C}$ a $T_f = 50\,°\text{C}$ en $\Delta t = 10\,\text{min}$. ¿Qué potencia hace falta?
::: pasos
Q = m\cdot c_e\cdot\Delta T = 1500\,\text{g}\cdot 1\,\frac{\text{cal}}{\text{g}\,°\text{C}}\cdot 40\,°\text{C}
P = \frac{Q}{\Delta t}
:::

::: aclaracion
En la hoja quedó $Q = 6000\,\text{cal}$, pero $1500 \cdot 1 \cdot 40 = 60\,000\,\text{cal}$, y la cuenta no está terminada. Con $1\,\text{cal} = 4{,}186\,\text{J}$ y $\Delta t = 600\,\text{s}$:

$$
P = \frac{60\,000 \cdot 4{,}186\,\text{J}}{600\,\text{s}} \approx 419\,\text{W}
$$
:::
:::

## Resistencia interna

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

- $\varepsilon$: **fem** (fuerza electromotriz de la fuente).
- $\varepsilon > \Delta V$: parte de la fem se pierde en la resistencia interna.

::: pasos
\Delta V = \varepsilon - I\cdot r
I\cdot R = \varepsilon - I\cdot r          // en el resistor externo, $\Delta V = I\cdot R$
\varepsilon = I\cdot R + I\cdot r
            = I\,(R + r)                    // $R$ y $r$ están en serie
:::
