# Corriente eléctrica, resistencia y resistividad

*Clase teórica del 25/08. Completado con el Serway, cap. 27 (Corriente y resistencia). Los circuitos de resistores siguen en [[Conexión de resistores y leyes de Kirchhoff]].*

## Corriente eléctrica

Hasta ahora las cargas estaban quietas (electrostática). Ahora se mueven: es la **electrodinámica**. Si entre los extremos de un conductor hay una diferencia de potencial $\Delta V$ (una batería), adentro aparece un campo $\vec E$ y las cargas libres se mueven.

::: definicion Corriente eléctrica (intensidad de corriente)
Es la carga que atraviesa una sección del conductor por unidad de tiempo:

$$
I_{prom} = \frac{\Delta Q}{\Delta t} \qquad\qquad I = \frac{\dd Q}{\dd t}\ \text{(instantánea)} \qquad\qquad [I] = \frac{[Q]}{[t]} = \frac{\text{C}}{\text{s}} = \text{A}\ \text{(ampere)}
$$
:::

::: observacion
**La corriente va en el sentido del campo, no en el de los electrones.** Por convención, el sentido de $I$ es el que tendrían cargas **positivas**: sale del borne $+$ de la batería, recorre el circuito y entra por el $-$. En un cable de metal lo que se mueve son electrones, que van **al revés**, del $-$ al $+$ (Serway, sec. 27.1).
:::

```circuito
titulo: La corriente $I$ sale del $+$; los electrones van al revés
bateria (3,0) (0,0) ; "$\Delta V$" ; abajo
cable (0,0) (0,2) (3,2) (3,0)
corriente (1,2) (2,2) ; "$I$"
```

**En un cable de cobre** (Cu): el enlace es **metálico**, núcleos positivos ($\text{Cu}^+$) en un "mar" de electrones libres. Esos electrones son los que se mueven. La carga de cada uno es $q_e = 1{,}6\times10^{-19}\,\text{C}$.

## Velocidad de arrastre (o de deriva)

- **Sin diferencia de potencial** ($\Delta V = 0$): los electrones libres se mueven al azar, en zigzag, chocando con los átomos. En promedio no avanzan: no hay corriente.
- **Con diferencia de potencial** ($\Delta V \neq 0$): el campo $\vec E$ los empuja. Siguen chocando, pero en promedio avanzan lentamente en sentido contrario a $\vec E$. Esa velocidad media es la **velocidad de arrastre** $v_d$ (o $v_a$).

Si $n$ es el **número de portadores de carga por unidad de volumen**, en un tiempo $\Delta t$ pasan por la sección $A$ todos los portadores de un tramo de largo $\ell = v_d\,\Delta t$, que ocupa un volumen $V = A\,\ell$:

::: pasos
I = \frac{\Delta Q}{\Delta t} = \frac{n\,V\,q}{\Delta t}       // carga $=$ (portadores por volumen) $\cdot$ volumen $\cdot$ carga de cada uno
= \frac{n\,A\,\ell\,q}{\Delta t}       // $V = A\,\ell$
= n\,A\,v_d\,q       // $\frac{\ell}{\Delta t} = v_d$
:::

::: resultado Velocidad de arrastre
$$
I = n\,A\,v_d\,q \qquad\then\qquad v_d = \frac{I}{n\,A\,q}
$$
:::

::: ejemplo Averiguar la velocidad de arrastre en un conductor de cobre con $I = 10\,\text{A}$ y $A = 3{,}31\times10^{-6}\,\text{m}^2$. La densidad del cobre es $8{,}92\,\text{g/cm}^3$ y cada átomo de cobre aporta $1$ electrón libre. *(Se dijo que no se toma.)*
::: solucion
Hay que sacar $n$: cuántos electrones libres hay por metro cúbico. Con la masa molar del cobre, $63{,}5\,\text{g/mol}$ (Serway, ej. 27.1):

::: pasos
// Volumen de $1$ mol de cobre:
V = \frac{m}{\delta} = \frac{63{,}5\,\text{g}}{8{,}92\,\text{g/cm}^3} = 7{,}12\,\text{cm}^3 = 7{,}12\times10^{-6}\,\text{m}^3
// En $1$ mol hay $6{,}02\times10^{23}$ átomos, y cada uno aporta $1$ electrón:
n = \frac{6{,}02\times10^{23}}{7{,}12\times10^{-6}\,\text{m}^3} \approx 8{,}46\times10^{28}\ \frac{\text{electrones}}{\text{m}^3}
// Velocidad de arrastre:
v_d = \frac{I}{n\,A\,q}
= \frac{10\,\text{A}}{8{,}46\times10^{28}\,\text{m}^{-3}\cdot 3{,}31\times10^{-6}\,\text{m}^2\cdot 1{,}6\times10^{-19}\,\text{C}}
:::

::: resultado
$$
v_d \approx 2{,}23\times10^{-4}\ \frac{\text{m}}{\text{s}} = 0{,}223\ \frac{\text{mm}}{\text{s}}
$$
:::

Es muy lenta: un electrón tarda unos $75$ minutos en recorrer $1\,\text{m}$. La luz se prende al instante porque lo que viaja casi a la velocidad de la luz es el **campo**, que empuja a la vez a todos los electrones del cable.

::: aclaracion
En la hoja la densidad quedó como «$8{,}92\,\text{g}\cdot\text{m}^2$»: es $8{,}92\,\text{g/cm}^3$.
:::
:::
:::

## Densidad de corriente

::: definicion Densidad de corriente
Es la corriente por unidad de área de la sección del conductor:

$$
J = \frac{I}{A} \qquad\qquad [J] = \frac{\text{A}}{\text{m}^2}
$$

Es un vector, con la dirección y el sentido de la corriente.
:::

En muchos materiales, la densidad de corriente es **proporcional al campo** que la produce: $\vec J \propto \vec E$.

::: ley de Ohm (forma microscópica)
$$
\vec J = \sigma\,\vec E
$$

$\sigma$ es la **conductividad eléctrica**, propia de cada material, con $[\sigma] = (\Omega\cdot\text{m})^{-1}$. Los materiales que cumplen esta ley (con $\sigma$ constante) son los **materiales óhmicos**.
:::

```grafico
titulo: Material óhmico: $J$ en función de $E$ es una recta de pendiente $\sigma$
ejes: E, J
y = 0.6*x ; x: 0..4 ; azul ; gruesa ; "$J = \sigma E$"
segmento (2, 1.2) (3, 1.2) ; gris ; punteada
segmento (3, 1.2) (3, 1.8) ; gris ; punteada
texto (3.25, 1.5) "$\sigma$"
x: -0.3..4.3
y: -0.3..2.7
```

::: observacion
Los que **no** cumplen esta proporción son **no óhmicos**, como el diodo semiconductor: su gráfico de $I$ en función de $\Delta V$ no es una recta (Serway, sec. 27.2).
:::

## Resistencia y resistividad

En un conductor de largo $\ell$ y sección $A$, el campo es uniforme y $\Delta V = E\,\ell$. Partiendo de $J = \sigma E$:

::: pasos
J = \sigma\,E
\frac{I}{A} = \sigma\,\frac{\Delta V}{\ell}       // $J = \frac{I}{A}$ y $E = \frac{\Delta V}{\ell}$
\Delta V = I\cdot\frac{\ell}{A\,\sigma}       // se despeja $\Delta V$; lo que multiplica a $I$ es la resistencia
:::

::: resultado Ley de Ohm y resistencia
$$
\Delta V = I\cdot R \qquad\qquad R = \frac{\ell}{A\,\sigma} \qquad\qquad [R] = \frac{[\Delta V]}{[I]} = \frac{\text{V}}{\text{A}} = \Omega\ \text{(ohm)}
$$
:::

La inversa de la conductividad es la **resistividad eléctrica**, también propia del material:

::: resultado Resistividad
$$
\rho = \frac{1}{\sigma} \qquad [\rho] = \Omega\cdot\text{m} \qquad\qquad R = \rho\,\frac{\ell}{A}
$$

$\rho$ depende del **material**; $\frac{\ell}{A}$, de la **geometría**. Un cable más largo tiene más resistencia; uno más grueso, menos.
:::

- **Reóstato**: un dispositivo de **resistencia variable**.
- **Todo** lo que ponemos en un circuito (una lámpara, un motor, una plancha) es, para el circuito, una resistencia.

Valores a $T_0 = 20\,°\text{C}$, la temperatura de referencia (Serway, tabla 27.2):

| Material | Resistividad $\rho$ ($\Omega\cdot\text{m}$) | Coef. de temperatura $\alpha$ ($°\text{C}^{-1}$) |
|---|---|---|
| Plata | $1{,}59\times10^{-8}$ | $3{,}8\times10^{-3}$ |
| Cobre | $1{,}7\times10^{-8}$ | $3{,}9\times10^{-3}$ |
| Oro | $2{,}44\times10^{-8}$ | $3{,}4\times10^{-3}$ |
| Aluminio | $2{,}82\times10^{-8}$ | $3{,}9\times10^{-3}$ |
| Tungsteno | $5{,}6\times10^{-8}$ | $4{,}5\times10^{-3}$ |
| Hierro | $10\times10^{-8}$ | $5{,}0\times10^{-3}$ |
| Nicromo (aleación) | $1{,}5\times10^{-6}$ | $0{,}4\times10^{-3}$ |
| Carbono (metaloide) | $3{,}5\times10^{-5}$ | $-0{,}5\times10^{-3}$ |
| Silicio | $2{,}3\times10^{3}$ | $-75\times10^{-3}$ |
| Vidrio | $10^{10}$ a $10^{14}$ | |

::: claves
**La resistividad cambia cuando cambia la temperatura del material.** Por eso las tablas dan el valor a $20\,°\text{C}$, junto con el coeficiente $\alpha$ que dice cuánto cambia.
:::

## Medir con el multímetro

El **multímetro** mide resistencia ($\Omega$), tensión ($\text{V}$) y corriente ($\text{A}$), según dónde se ponga la perilla y en qué bornes se enchufen las puntas. Cada escala tiene un **fondo de escala**: el valor máximo que puede medir. En la clase, los bornes de corriente eran de $1\,\text{A}$ y de $10\,\text{A}$.

- Como **voltímetro**, va en **paralelo** con lo que se mide: sus puntas a los dos lados de la resistencia.
- Como **amperímetro**, va en **serie**: hay que abrir el circuito para que la corriente pase por adentro del aparato.

```circuito
titulo: Voltímetro en paralelo con $R_1$; amperímetro en serie con $R_1$
animar: no
bateria (0,0) (0,2) ; "$\varepsilon$" ; izquierda
cable (0,2) (0.4,2)
R (0.4,2) (1.8,2) ; "$R_1$"
amperimetro (1.8,2) (3,2)
cable (3,2) (3.6,2) (3.6,0)
cable (0.4,2) (0.4,3)
voltimetro (0.4,3) (1.8,3)
cable (1.8,3) (1.8,2)
cable (0,0) (0.8,0)
cable (0.8,0) (0.8,1)
R (0.8,1) (3.6,1) ; "$R_2$"
cable (0.8,0) (3.6,0)
cable (3.6,1) (3.6,0)
```

## Variación de la resistividad con la temperatura

En un intervalo de temperatura no muy grande, la resistividad varía linealmente:

::: resultado Resistividad y resistencia en función de la temperatura
$$
\rho = \rho_0\,\big[1 + \alpha\,(T - T_0)\big] \qquad\qquad R = R_0\,\big[1 + \alpha\,(T - T_0)\big]
$$

$\rho_0$ y $R_0$ son los valores a la temperatura de referencia $T_0$ (cualquiera, pero las tablas usan $20\,°\text{C}$). La de $R$ sale de la de $\rho$ porque $R = \rho\,\frac{\ell}{A}$.
:::

Según cómo varía $\rho$, hay tres tipos de materiales:

**1. Metales (conductores óhmicos).** Mientras más temperatura, **peor conductor**: $\rho$ crece, casi en línea recta salvo muy cerca del cero absoluto ($\alpha > 0$).

```grafico
titulo: Metal: $\rho$ crece con $T$
ejes: T, ρ
y = 0.15 + 0.7*x^2/(x + 0.6) ; x: 0..4 ; azul ; gruesa ; ""
x: -0.2..4.2
y: -0.2..3.2
alto: 220
```

**2. Semiconductores** (metales de transición o **metaloides**, como el carbono, el silicio y el germanio). $\rho$ **baja** al subir la temperatura ($\alpha < 0$): son **buenos conductores a altas temperaturas**. Pasa porque al calentarse aparecen más portadores de carga libres.

```grafico
titulo: Semiconductor: $\rho$ baja con $T$
ejes: T, ρ
y = 0.3 + 2.6*exp(-1.4*x) ; x: 0..4 ; rojo ; gruesa ; ""
x: -0.2..4.2
y: -0.2..3.2
alto: 220
```

**3. Superconductores.** A cierta temperatura, la **temperatura crítica** $T_c$, la resistividad cae a $\rho = 0$. Para el mercurio (Hg), $T_c = 4{,}2\,\text{K}$ (Serway, sec. 27.5).

```grafico
titulo: Superconductor: por debajo de $T_c$, $\rho = 0$
ejes: T, ρ
segmento (0, 0) (1.2, 0) ; verde ; gruesa
y = 0.6 + 0.55*(x - 1.2) ; x: 1.2..4 ; verde ; gruesa ; ""
segmento (1.2, 0) (1.2, 0.6) ; gris ; punteada
texto (1.2, -0.3) "$T_c$"
x: -0.2..4.2
y: -0.5..2.6
alto: 220
```

::: ejemplo Resistividad del cobre a $50\,°\text{C}$
::: solucion
Con los valores de la tabla, $\rho_0 = 1{,}7\times10^{-8}\,\Omega\cdot\text{m}$ y $\alpha = 3{,}9\times10^{-3}\,°\text{C}^{-1}$, a $T_0 = 20\,°\text{C}$:

::: pasos
\rho = \rho_0\,\big[1 + \alpha\,(T - T_0)\big]
= 1{,}7\times10^{-8}\,\Omega\cdot\text{m}\,\Big[1 + 3{,}9\times10^{-3}\,\tfrac{1}{°\text{C}}\,(50 - 20)\,°\text{C}\Big]
= 1{,}7\times10^{-8}\,\Omega\cdot\text{m}\cdot 1{,}117 \approx 1{,}9\times10^{-8}\ \Omega\cdot\text{m}
:::

**Y si tiene largo y área**, por ejemplo un resistor de cobre a $50\,°\text{C}$ de largo $\ell = 1\,\text{cm}$ y área $A = 2\,\text{cm}^2$, se puede calcular $R_0$ a $20\,°\text{C}$ y después usar $R = R_0\,[1 + \alpha\,(T - T_0)]$, o directamente $R = \rho\,\frac{\ell}{A}$ con la $\rho$ de arriba:

$$
R = 1{,}9\times10^{-8}\,\Omega\cdot\text{m}\cdot\frac{0{,}01\,\text{m}}{2\times10^{-4}\,\text{m}^2} \approx 9{,}5\times10^{-7}\ \Omega
$$
:::
:::

::: ejemplo Un alambre de $3\,\text{m}$ de largo y $0{,}45\,\text{mm}^2$ de sección tiene una resistencia de $41\,\Omega$ a $20\,°\text{C}$. A $29\,°\text{C}$ su resistencia sube a $41{,}4\,\Omega$. ¿Cuál es el coeficiente de temperatura $\alpha$? ¿Y la resistividad? ¿De qué material puede ser?
::: solucion
Es el ejercicio 9.8 de la guía. **Coeficiente de temperatura**, despejando $\alpha$ de $R = R_0\,[1 + \alpha\,(T - T_0)]$:

::: pasos
\frac{R}{R_0} = 1 + \alpha\,(T - T_0)
\alpha = \frac{\frac{R}{R_0} - 1}{T - T_0}
= \frac{\frac{41{,}4\,\Omega}{41\,\Omega} - 1}{(29 - 20)\,°\text{C}} = \frac{0{,}00976}{9\,°\text{C}}
\approx 1{,}08\times10^{-3}\ °\text{C}^{-1}
:::

**Resistividad** a $20\,°\text{C}$, despejando de $R = \rho\,\frac{\ell}{A}$, con $A = 0{,}45\,\text{mm}^2 = 0{,}45\times10^{-6}\,\text{m}^2$:

$$
\rho_0 = \frac{R_0\,A}{\ell} = \frac{41\,\Omega\cdot 0{,}45\times10^{-6}\,\text{m}^2}{3\,\text{m}} \approx 6{,}15\times10^{-6}\ \Omega\cdot\text{m}
$$

::: resultado
$$
\alpha \approx 1{,}08\times10^{-3}\ °\text{C}^{-1} \qquad\qquad \rho_0 \approx 6{,}15\times10^{-6}\ \Omega\cdot\text{m}
$$
:::

**Material:** no coincide con ninguno de la tabla. Por la resistividad está entre el nicromo ($1{,}5\times10^{-6}$) y el carbono ($3{,}5\times10^{-5}$), y $\alpha$ es positivo y chico como el de una aleación: será alguna aleación para resistencias. La guía solo pide $\alpha$.

::: aclaracion
En la hoja quedó $\frac{0{,}00097}{9\,°\text{C}} = 0{,}0001\,°\text{C}^{-1}$ y después $\alpha = 1\times10^{-3}\,°\text{C}^{-1}$: las dos cosas no coinciden. El numerador es $\frac{41{,}4}{41} - 1 = 0{,}00976$ (no $0{,}00097$), y con eso $\alpha = 1{,}08\times10^{-3}\,°\text{C}^{-1}$, que es la respuesta de la guía. El resultado final de la hoja, redondeado, estaba bien.
:::
:::
:::
