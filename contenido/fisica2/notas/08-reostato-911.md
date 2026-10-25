# Reóstato: ejercicio 9.11

*Clase práctica del 25/08 (hecho al final, en la misma hoja que el teórico). Guía de trabajos prácticos, capítulo 9. La variación de la resistencia con la temperatura está en [[Corriente eléctrica, resistencia y resistividad]].*

::: claves
- Malla: la tensión de la fuente se reparte entre lo que está en serie, $V_{cc} = V_R + V_L$.
- Ley de Ohm: $R = \dfrac{V}{I}$.
- Temperatura: $R = R_0\,\big[1 + \alpha\,(T - T_0)\big]$, con $R_0$ a $20\,°\text{C}$.
:::

::: ejercicio Se construye un reóstato de nicromo para regular la tensión de una lámpara. La tensión de línea es $220\,\text{V}$ (continua). En funcionamiento normal circulan por la lámpara $450\,\text{mA}$ y en ella cae una tensión de $130\,\text{V}$; el reóstato está entonces a $48\,°\text{C}$ ($\alpha_{\text{nicromo}} = 0{,}0004\,°\text{C}^{-1}$). Determinar la resistencia inicial del reóstato a $20\,°\text{C}$
```circuito
titulo: Reóstato $R$ en serie con la lámpara $L$ ($V_L = 130\,\text{V}$)
animar: no
bateria (0,0) (0,2) ; 220 ; izquierda
cable (0,2) (0.6,2)
R (0.6,2) (2.4,2) ; "$R$ (reóstato)"
cable (2.4,2) (3.4,2)
R (3.4,2) (3.4,0) ; "$L$" ; derecha
cable (3.4,0) (0,0)
corriente (3.4,1.6) (3.4,1.1) ; "$450\,\text{mA}$" ; izquierda
```

Intentalo antes de abrir la solución: primero sacá cuánta tensión le queda al reóstato.

::: solucion
**Resistencia del reóstato funcionando** (a $48\,°\text{C}$). Recorriendo la malla, la tensión de línea se reparte entre el reóstato y la lámpara:

::: pasos
V_{cc} = V_R + V_L \then V_R = 220\,\text{V} - 130\,\text{V} = 90\,\text{V}
R_{48°} = \frac{V_R}{I} = \frac{90\,\text{V}}{0{,}45\,\text{A}} = 200\,\Omega       // $450\,\text{mA} = 0{,}45\,\text{A}$
:::

**Resistencia a $20\,°\text{C}$**, despejando $R_0$ de $R = R_0\,[1 + \alpha\,(T - T_0)]$:

::: pasos
R_0 = \frac{R_{48°}}{1 + \alpha\,(T - T_0)}
= \frac{200\,\Omega}{1 + 0{,}0004\,°\text{C}^{-1}\cdot(48 - 20)\,°\text{C}}
= \frac{200\,\Omega}{1{,}0112}
:::

::: resultado
$$
R_0 \approx 197{,}8\ \Omega
$$
:::

El nicromo casi no cambia con la temperatura ($\alpha$ muy chico): por eso se usa para hacer resistencias. La guía da $197{,}7\,\Omega$; la diferencia es de redondeo.
:::
:::
