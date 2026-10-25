# Capacitancia y capacitores

*Clase teórica del 18/08. Completado con el Serway, cap. 26 (Capacitancia y materiales dieléctricos). Las fórmulas de serie y paralelo se vieron en el práctico del 11/08.*

## Qué es un capacitor

Un **capacitor** (o condensador) son dos **placas conductoras separadas entre sí** por un material aislante, el **dieléctrico** (aire, papel, plástico…). Sirve para:

- **acumular carga eléctrica**: una placa queda con $+Q$ y la otra con $-Q$;
- **acumular energía eléctrica**.

Se usa, por ejemplo, en los sistemas de encendido, en los sistemas de radio y en el flash de la cámara.

**Cómo se carga.** Se conectan las placas a una batería, por ejemplo de $12\,\text{V}$. La batería es como una **bomba de agua, pero de carga**: saca electrones de la placa conectada a su borne $+$ y los empuja a la placa conectada a su borne $-$. Así una placa queda con $+Q$, la otra con $-Q$, y entre ellas queda la misma diferencia de potencial que la de la batería, $\Delta V = 12\,\text{V}$. Entre las placas hay un campo uniforme que va de la $+$ a la $-$.

```grafico
titulo: Capacitor cargado: campo uniforme de la placa $+Q$ a la $-Q$
placa (-1.5, -1.6) (-1.5, 1.6) ; +
placa (1.5, -1.6) (1.5, 1.6) ; -
texto (-1.5, 1.95) "$+Q$"
texto (1.5, 1.95) "$-Q$"
texto (0, -2.1) "$\Delta V$"
x: -3.2..3.2
y: -2.4..2.3
```

## Capacitancia

Si se duplica la diferencia de potencial ($12\,\text{V} \to 24\,\text{V}$), se duplica la carga: $Q \propto \Delta V$. El gráfico de $Q$ en función de $\Delta V$ es una recta que pasa por el origen ($y = a\,x + b$ con $b = 0$), y su pendiente es la capacitancia.

```grafico
titulo: $Q$ en función de $\Delta V$: una recta por el origen, de pendiente $C$
ejes: ΔV, Q
y = 0.5*x ; x: 0..30 ; azul ; gruesa ; "$Q = C\,\Delta V$"
segmento (12, 0) (12, 6) ; gris ; punteada
segmento (0, 6) (12, 6) ; gris ; punteada
segmento (24, 0) (24, 12) ; gris ; punteada
segmento (0, 12) (24, 12) ; gris ; punteada
texto (12, -1) "$12$"
texto (24, -1) "$24$"
texto (-1.6, 6) "$Q_1$"
texto (-1.6, 12) "$2Q_1$"
x: -3..32
y: -2..16
```

::: definicion Capacitancia
$$
Q = C\cdot\Delta V \qquad\then\qquad C = \frac{Q}{\Delta V} \qquad\qquad [C] = \frac{[Q]}{[\Delta V]} = \frac{\text{C}\ \text{(coulomb)}}{\text{V}\ \text{(volt)}} = \text{F}\ \text{(farad)}
$$

- Indica la **capacidad del capacitor para acumular carga**: cuánta carga guarda por cada volt.
- Es un **valor propio de cada capacitor**: no cambia con $Q$ ni con $\Delta V$.
- Depende solo de la **geometría** y del **material dieléctrico entre las placas**.
- Siempre es **positiva**.
:::

El farad es una unidad muy grande; se usan submúltiplos:

| Prefijo | Valor |
|---|---|
| m (mili) | $10^{-3}$ |
| µ (micro) | $10^{-6}$ |
| n (nano) | $10^{-9}$ |
| p (pico) | $10^{-12}$ |

::: observacion
Un capacitor comercial trae dos datos impresos, por ejemplo **$2\,\mu\text{F}$ – $20\,\text{V}$**: el primero es la **capacitancia** y el segundo la **$\Delta V$ máxima** que se le puede aplicar sin que se rompa el dieléctrico (ver *Rigidez dieléctrica*, más abajo).
:::

## Cálculo de la capacitancia: placas paralelas

Dos placas de área $A$ separadas una distancia $d$. Entre ellas el campo es uniforme y vale $E = \frac{\sigma}{\varepsilon_0}$, con $\sigma = \frac{Q}{A}$ la densidad **superficial** de carga (ley de Gauss, ver [[Ley de Gauss: hilo infinito y placas]]):

::: pasos
C = \frac{Q}{\Delta V} = \frac{Q}{E\,d}       // en un campo uniforme, $\Delta V = E\,d$
= \frac{Q}{\frac{\sigma}{\varepsilon_0}\,d} = \frac{Q\,\varepsilon_0}{\frac{Q}{A}\,d}       // $E = \frac{\sigma}{\varepsilon_0}$ y $\sigma = \frac{Q}{A}$
= \frac{\varepsilon_0\,A}{d}       // se simplifica $Q$
:::

::: resultado Capacitor de placas paralelas
$$
C = \frac{\varepsilon_0\,A}{d} \qquad\qquad C \propto A \qquad\qquad C \propto \frac{1}{d}
$$
:::

Más área guarda más carga; más separación, menos capacidad. Como se simplificó $Q$, queda claro que $C$ depende solo de la geometría ($A$ y $d$) y del material ($\varepsilon_0$ para el vacío o el aire).

::: ejemplo Un capacitor de placas paralelas tiene $C = 1{,}3\,\text{pF}$ y placas de $A = 1\,\text{cm}^2$. ¿A qué distancia $d$ están las placas?
::: solucion
Pasando a unidades del SI: $C = 1{,}3\times10^{-12}\,\text{F}$ y $A = 1\,\text{cm}^2 = 0{,}0001\,\text{m}^2$. Despejando $d$ de $C = \frac{\varepsilon_0 A}{d}$:

::: pasos
d = \frac{\varepsilon_0\,A}{C} = 8{,}85\times10^{-12}\,\frac{\text{C}^2}{\text{N}\,\text{m}^2}\cdot\frac{0{,}0001\,\text{m}^2}{1{,}3\times10^{-12}\,\frac{\text{C}}{\text{V}}}
\approx 6{,}8\times10^{-4}\ \text{m} = 0{,}68\ \text{mm}
:::

**Unidades:** como $\text{V} = \frac{\text{J}}{\text{C}} = \frac{\text{N}\,\text{m}}{\text{C}}$, queda $\frac{\text{C}^2}{\text{N}\,\text{m}^2}\cdot\frac{\text{m}^2\,\text{V}}{\text{C}} = \frac{\text{C}\cdot\text{N}\,\text{m}}{\text{N}\cdot\text{C}} = \text{m}$.

::: resultado
$$
d \approx 0{,}68\ \text{mm}
$$
:::

::: aclaracion
En la hoja quedó $d = 0{,}00115\,\text{m} = 1{,}15\,\text{mm}$, pero con esos datos la cuenta da $\frac{8{,}85\times10^{-16}}{1{,}3\times10^{-12}} \approx 6{,}8\times10^{-4}\,\text{m}$. ($1{,}15\,\text{mm}$ saldría con $C \approx 0{,}77\,\text{pF}$.)
:::
:::
:::

## Influencia del material dieléctrico

Los **materiales aislantes de la electricidad** que se usan como dieléctricos son, por ejemplo: aire, plástico, caucho, madera, teflón, telgopor, vidrio, aceites, corcho y papel.

**La experiencia.** Se carga un capacitor con aire entre las placas ($C_0$, con $\Delta V_0$). Se quita la batería, así la carga $Q$ queda fija, y donde había aire se pone papel. Un voltímetro conectado a las placas marca **menos** que antes: $\Delta V < \Delta V_0$.

```circuito
titulo: Con aire: $C_0$ cargado a $\Delta V_0$
animar: no
capacitor (0,2) (3,2) ; "$C_0$, aire"
cable (3,2) (3,0)
cable (0,2) (0,0)
bateria (3,0) (0,0) ; "$\Delta V_0$" ; abajo
```

```circuito
titulo: Sin batería y con papel: el voltímetro marca $\Delta V < \Delta V_0$
animar: no
capacitor (0,2) (3,2) ; "$C$, papel"
cable (3,2) (3,0)
cable (0,2) (0,0)
voltimetro (3,0) (0,0) ; "$\Delta V$" ; abajo
```

La tensión baja en un factor $\kappa$ ($K$ en la clase), la **constante dieléctrica** del material:

$$
\Delta V = \frac{\Delta V_0}{\kappa}
$$

::: pasos
C = \frac{Q}{\Delta V} = \frac{Q}{\frac{\Delta V_0}{\kappa}} = \kappa\,\frac{Q}{\Delta V_0}       // la carga $Q$ no cambió (la batería estaba desconectada)
= \kappa\,C_0       // $C_0 = \frac{Q}{\Delta V_0}$ es la capacitancia con aire
:::

::: resultado Capacitor con dieléctrico
$$
C = \kappa\,C_0 \qquad\qquad C = \frac{\kappa\,\varepsilon_0\,A}{d}
$$
:::

- $\kappa$ es **adimensional** y es una constante propia de cada material.
- Siempre es **mayor que $1$**, salvo para el aire, que tiene $\kappa \approx 1$ (para el vacío es exactamente $1$).
- **Material aislante entre las placas $\then$ más capacitancia.**

::: observacion
El Serway (sec. 26.5) remarca la diferencia: si el capacitor **sigue conectado** a la batería, lo que se mantiene es $\Delta V$ (y entonces aumenta la carga); si se **desconecta antes**, se mantiene $Q$ (y baja $\Delta V$, como en la experiencia). En los dos casos $C$ aumenta $\kappa$ veces.
:::

## Rigidez dieléctrica

::: definicion Rigidez dieléctrica
Es el **campo eléctrico máximo que soporta un material** sin que se rompa el aislamiento (salta una chispa y el dieléctrico empieza a conducir). Se mide en $\frac{\text{N}}{\text{C}} = \frac{\text{V}}{\text{m}}$.

$$
\Delta V = E\,d \quad\then\quad E = \frac{\Delta V}{d} \quad\then\quad E_{max} = \frac{\Delta V_{max}}{d}
$$
:::

$\Delta V_{max}$ es la tensión más alta que se le puede aplicar al capacitor. Según el fabricante se llama **voltaje de servicio**, **voltaje nominal** o **voltaje de ruptura** (es el segundo número impreso, los $20\,\text{V}$ del ejemplo de arriba).

Algunos valores (Serway, tabla 26.1):

| Material | Constante dieléctrica $\kappa$ | Rigidez dieléctrica ($\text{V/m}$) |
|---|---|---|
| Aire (seco) | $1{,}00059$ | $3\times10^{6}$ |
| Aceite de silicona | $2{,}5$ | $15\times10^{6}$ |
| Papel | $3{,}7$ | $16\times10^{6}$ |
| Teflón | $2{,}1$ | $60\times10^{6}$ |
| Poliestireno | $2{,}56$ | $24\times10^{6}$ |
| Hule de neopreno (caucho) | $6{,}7$ | $12\times10^{6}$ |
| Vidrio pírex | $5{,}6$ | $14\times10^{6}$ |
| Agua | $80$ | — |

**Ventajas de poner un material dieléctrico** (Serway, sec. 26.5):

- **aumenta la capacitancia** $C$, en un factor $\kappa$;
- **aumenta $\Delta V_{max}$**, el voltaje de ruptura, porque soporta más campo que el aire;
- **hace de soporte mecánico** entre las placas: permite **reducir la distancia $d$** sin que se toquen, y así aumentar todavía más $C$.

## Por qué baja el campo: la carga inducida

Las moléculas del dieléctrico (en la clase, un corcho) son como pequeños dipolos $-\,+$. **Fuera del capacitor** están desordenadas. **Dentro del capacitor**, el campo $\vec E_0$ de las placas las alinea: en el borde del dieléctrico pegado a la placa $+$ queda una capa de carga negativa, y en el borde pegado a la placa $-$, una capa positiva. Esa **densidad de carga inducida** $\sigma_i$ genera un campo $\vec E_i$ que va **para el otro lado**, de su capa $+$ a su capa $-$.

```grafico
titulo: Dieléctrico en el capacitor: la carga inducida $\pm\sigma_i$ hace un campo $E_i$ opuesto a $E_0$
placa (-2, -1.6) (-2, 1.6) ; +
placa (2, -1.6) (2, 1.6) ; -
poligono (-1.5, -1.6) (1.5, -1.6) (1.5, 1.6) (-1.5, 1.6) ; ambar ; ""
texto (-1.25, 1.9) "$-\sigma_i$"
texto (1.25, 1.9) "$+\sigma_i$"
vector (0.8, -2.1) (-0.8, -2.1) ; rojo ; "$E_i$"
animar: no
x: -3.2..3.2
y: -2.6..2.3
```

::: resultado Campo eléctrico neto
$$
E = E_0 - E_i = \frac{E_0}{\kappa}
$$

El campo neto en el dieléctrico es menor que $E_0$, y por eso baja $\Delta V = E\,d$.
:::

De ahí sale cuánta carga se induce en el borde del dieléctrico. Con $E_0 = \frac{\sigma}{\varepsilon_0}$ (las placas) y $E_i = \frac{\sigma_i}{\varepsilon_0}$ (las capas inducidas):

::: pasos
E = E_0 - E_i
\frac{\sigma}{\kappa\,\varepsilon_0} = \frac{\sigma}{\varepsilon_0} - \frac{\sigma_i}{\varepsilon_0}       // $E = \frac{E_0}{\kappa}$
\frac{\sigma}{\kappa} = \sigma - \sigma_i       // se multiplica todo por $\varepsilon_0$
\sigma_i = \sigma - \frac{\sigma}{\kappa}
:::

::: resultado Densidad de carga inducida
$$
\sigma_i = \sigma\left(1 - \frac{1}{\kappa}\right)
$$

Sirve para calcular la carga inducida en el borde del dieléctrico. Es lo mismo que el Serway escribe como $\sigma_{ind} = \frac{\kappa - 1}{\kappa}\,\sigma$ (sec. 26.7).
:::

::: aclaracion
En la hoja quedó «$E_i < E_0$, $E_i = \frac{E_0}{\kappa}$». Lo que vale $\frac{E_0}{\kappa}$ es el campo **neto** $E$, no el inducido: $E_i = E_0 - \frac{E_0}{\kappa}$. Con eso sale la cuenta de $\sigma_i$ de arriba.
:::

- Para el aire ($\kappa = 1$), $\sigma_i = 0$: no hay carga inducida y el campo no cambia.
- **Si el material es conductor**, sus cargas libres se mueven hasta anular el campo: $E_i = E_0$ y $E = E_0 - E_i = 0$. Es como $\kappa \to \infty$, y $\sigma_i = \sigma$.

## Capacitores en paralelo

```circuito
titulo: Paralelo: todos a la misma $\Delta V$
animar: no
cable (0,0) (0,2)
cable (0,2) (4,2)
cable (0,0) (4,0)
capacitor (1.3,2) (1.3,0) ; "$C_1$"
capacitor (2.6,2) (2.6,0) ; "$C_2$"
capacitor (4,2) (4,0) ; "$C_3$"
bateria (0,0) (0,2) ; "$\Delta V$" ; izquierda
```

Todos tienen la **misma** $\Delta V$ (la de la batería) y la carga total es la suma: $Q = Q_1 + Q_2 + Q_3 = C_1\Delta V + C_2\Delta V + C_3\Delta V$. Dividiendo por $\Delta V$:

::: resultado Paralelo
$$
C_e = C_1 + C_2 + C_3
$$
:::

## Capacitores en serie

```circuito
titulo: Serie: todos con la misma carga $Q$
animar: no
capacitor (0,2) (1.3,2) ; "$C_1$"
capacitor (1.3,2) (2.6,2) ; "$C_2$"
capacitor (2.6,2) (4,2) ; "$C_3$"
cable (4,2) (4,0)
cable (0,2) (0,0)
bateria (4,0) (0,0) ; "$\Delta V$" ; abajo
```

La batería saca carga de una placa y la pone en la otra; por inducción, **todos** quedan con la misma $Q$. Las diferencias de potencial se suman: $\Delta V = \frac{Q}{C_1} + \frac{Q}{C_2} + \frac{Q}{C_3}$. Dividiendo por $Q$:

::: resultado Serie
$$
\frac{1}{C_e} = \frac{1}{C_1} + \frac{1}{C_2} + \frac{1}{C_3} \qquad\then\qquad C_e = \frac{1}{\frac{1}{C_1} + \frac{1}{C_2} + \frac{1}{C_3}}
$$
:::

::: observacion
Es **al revés que las resistencias**: los capacitores en paralelo se suman directo y en serie se suman las inversas. En serie, $C_e$ es menor que el más chico; con dos, $C_e = \frac{C_1 C_2}{C_1 + C_2}$.
:::

## Energía almacenada

*No se vio en esta clase; sale del Serway, sec. 26.4.* Cargar un capacitor cuesta trabajo, que queda guardado como energía potencial eléctrica:

::: resultado Energía de un capacitor
$$
U = \frac{Q^2}{2C} = \frac{1}{2}\,Q\,\Delta V = \frac{1}{2}\,C\,\Delta V^2
$$
:::

Los ejercicios están en [[Capacitores: ejercicios 8.11 y 8.13]] y [[Capacitores: ejercicios 8.14, 8.15 y uno inventado]].
