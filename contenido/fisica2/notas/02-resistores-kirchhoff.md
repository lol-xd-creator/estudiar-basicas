# Conexión de resistores y leyes de Kirchhoff

*Clase teórica del 01/09 (segunda parte). Completado con el Serway, sec. 28.2 (Resistores en serie y en paralelo) y 28.3 (Leyes de Kirchhoff). Viene de [[Potencia eléctrica, efecto Joule y resistencia interna]]; el ejemplo resuelto está en [[Método de Kirchhoff (EJ6)]].*

## 1. En serie

```circuito
titulo: En serie: la misma corriente $I$ pasa por $R_1$ y por $R_2$
bateria (0,0) (0,2) ; "$\Delta V$"
R (0,2) (2,2) ; "$R_1$"
R (2,2) (4,2) ; "$R_2$"
cable (4,2) (4,0) (0,0)
corriente (4,1.4) (4,0.6) ; "$I$"
```

Por los dos resistores pasa la misma corriente $I$, y la tensión de la fuente se reparte entre ellos:

::: pasos
\Delta V_1 = I\cdot R_1
\Delta V_2 = I\cdot R_2
\Delta V = \Delta V_1 + \Delta V_2
I\cdot R_{eq} = I\cdot R_1 + I\cdot R_2      // reemplazando cada caída
:::

::: resultado Resistencia equivalente en serie
$$
R_{eq} = R_1 + R_2 + \dots
$$
:::

## 2. En paralelo

```circuito
titulo: En paralelo: la misma tensión $\Delta V$ en $R_1$ y en $R_2$
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

Los dos tienen la misma tensión $\Delta V$; la corriente se reparte:

::: pasos
I_1 = \frac{\Delta V}{R_1}
I_2 = \frac{\Delta V}{R_2}
I = I_1 + I_2                                                     // la corriente se reparte en el nudo
\frac{\Delta V}{R_{eq}} = \frac{\Delta V}{R_1} + \frac{\Delta V}{R_2}
:::

::: resultado Resistencia equivalente en paralelo
$$
\frac{1}{R_{eq}} = \frac{1}{R_1} + \frac{1}{R_2} + \dots \qquad\qquad R_{eq} = \left(\frac{1}{R_1} + \frac{1}{R_2} + \dots\right)^{-1}
$$
:::

::: observacion
En paralelo, $R_{eq}$ queda por debajo de la menor de las resistencias: **el límite lo pone la más chica**. Por ejemplo, con $R_1 = 10\,\Omega$ y $R_2 = 2\,\Omega$: $R_{eq} = \frac{10\cdot 2}{10 + 2} \approx 1{,}67\,\Omega < 2\,\Omega$. En serie pasa lo contrario: $R_{eq}$ es mayor que la más grande.
:::

## Leyes de Kirchhoff

::: definicion Nudo, rama y malla
- **Nudo**: punto donde confluyen más de dos elementos de una red eléctrica.
- **Rama**: parte del circuito formada por el o los componentes que hay entre dos nudos.
- **Malla**: todo circuito cerrado que pueda establecerse dentro de la red eléctrica.
:::

```circuito
titulo: Nudos $a$ y $b$; mallas $acdba$, $abefa$ y $acdbefa$
cable (0,0) (0,3)
R (0,3) (4,3)
cable (4,3) (4,0)
cable (0,1.5) (0.8,1.5)
R (0.8,1.5) (2,1.5)
R (2,1.5) (3.2,1.5)
cable (3.2,1.5) (4,1.5)
bateria (1.5,0) (2.5,0)
cable (0,0) (1.5,0)
cable (2.5,0) (4,0)
nodo (0,1.5) ; "a"
nodo (4,1.5) ; "b"
etiqueta (-0.35,3.35) "$c$"
etiqueta (4.35,3.35) "$d$"
etiqueta (4.35,-0.35) "$e$"
etiqueta (-0.35,-0.35) "$f$"
corriente (0,0.5) (0,1.1) ; "$I$"
corriente (0.15,1.5) (0.65,1.5) ; "$I_1$"
corriente (0,2) (0,2.6) ; "$I_2$"
```

::: ley de los nudos (1ª de Kirchhoff)
En cualquier nudo, la sumatoria de corrientes debe ser cero. Se basa en el principio de **conservación de la carga**.

$$
\sum I_i = 0 \qquad\qquad \text{en el nudo } a:\quad I - I_1 - I_2 = 0
$$
:::

::: ley de las mallas (2ª de Kirchhoff)
La sumatoria de todas las diferencias de potencial a lo largo de una malla da cero. Se basa en la **conservación de la energía**: una carga que da la vuelta y vuelve al mismo punto tiene el mismo potencial que al salir (Serway, sec. 28.3).

$$
\sum \Delta V_i = 0
$$
:::

Signo de cada diferencia de potencial al recorrer la malla:

| Al recorrer… | $\Delta V$ |
|---|---|
| una batería de $-$ a $+$ | $+\varepsilon$ |
| una batería de $+$ a $-$ | $-\varepsilon$ |
| una resistencia en el sentido de la corriente | $-I\cdot R$ |
| una resistencia en contra de la corriente | $+I\cdot R$ |
