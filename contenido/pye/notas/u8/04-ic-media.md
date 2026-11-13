# 8.4 Intervalo de confianza para la media

::: idea
Siempre es **$\bar x \pm$ error**. Lo único que cambia de un caso a otro es **qué coeficiente** se usa ($z$ o $t$) y **qué desviación** ($\sigma$ o $s$).
:::

::: ppt Los tres casos (Garibaldi y Rimoldi)
| Caso | Intervalo | Coeficiente |
|---|---|---|
| **$\sigma$ conocida** (población normal, o $n$ grande por el TCL) | $\bar x - z_{\alpha/2}\dfrac{\sigma}{\sqrt n} < \mu < \bar x + z_{\alpha/2}\dfrac{\sigma}{\sqrt n}$ | tabla normal con $1 - \frac\alpha2$ |
| **$\sigma$ desconocida, $n > 30$** | $\bar x - z_{\alpha/2}\dfrac{s}{\sqrt n} < \mu < \bar x + z_{\alpha/2}\dfrac{s}{\sqrt n}$ | tabla normal (por el TCL) |
| **$\sigma$ desconocida, $n < 30$** | $\bar x - t_{\alpha/2}\dfrac{s}{\sqrt n} < \mu < \bar x + t_{\alpha/2}\dfrac{s}{\sqrt n}$ | tabla $t$ con **$n - 1$** g. l. |

- Rara vez se conoce $\sigma$: si no se conoce, se usa la desviación de la muestra $s$ (**siempre la corregida**, Var(n-1) en InfoStat).
- **Error de estimación**: $e = z_{\alpha/2}\frac{\sigma}{\sqrt n}$; con una confianza de $(1-\alpha)\,100\,\%$, el error no supera $e$.
- El apunte escribe el coeficiente como $z_{1-\alpha/2}$: es el **mismo** valor (1,96 para el 95 %), nombrado por la probabilidad acumulada.
:::

```grafico
titulo: Árbol de decisión
texto (0, 4) "¿$\sigma$ conocida?"
segmento (-0.4, 3.75) (-2, 2.9)
segmento (0.4, 3.75) (2, 2.9)
texto (-2.2, 3.35) "sí"
texto (2.2, 3.35) "no"
texto (-2, 2.6) "$z$ con $\sigma$"
texto (-2, 2.2) "(normal, o $n \ge 30$)"
texto (2, 2.6) "¿$n \ge 30$?"
segmento (1.6, 2.35) (0.6, 1.5)
segmento (2.4, 2.35) (3.4, 1.5)
texto (0.8, 2) "sí"
texto (3.2, 2) "no"
texto (0.6, 1.2) "$z$ con $s$"
texto (3.4, 1.2) "$t_{n-1}$ con $s$"
texto (3.4, 0.8) "(población normal)"
x: -4..5
y: 0.4..4.4
grilla: no
ejes: no
aspecto: libre
alto: 260
```

::: ejemplo Resistencia del concreto: los tres casos (Garibaldi)
La resistencia a la compresión del concreto es aproximadamente normal. Intervalos del 95 % para la media:

a) $\sigma^2 = 1000$ conocida; 50 especímenes con $\bar x = 3250$ psi.
b) $\sigma$ desconocida; 50 especímenes con $\bar x = 3250$ y $s^2 = 800$.
c) $\sigma$ desconocida; 20 especímenes con $\bar x = 3250$ y $s^2 = 800$.

::: solucion
**a)** $z_{0{,}975} = 1{,}96$; $\ \sigma = 31{,}62$:
$$
3250 \pm 1{,}96\,\frac{31{,}62}{\sqrt{50}} = 3250 \pm 8{,}76 \then [3241{,}24;\ 3258{,}76]
$$
Con 95 % de confianza, la resistencia media está entre 3241,24 y 3258,76 psi.

**b)** $n = 50 > 30$ → normal con $s = 28{,}28$:
$$
3250 \pm 1{,}96\,\frac{28{,}28}{\sqrt{50}} = 3250 \pm 7{,}84 \then [3242{,}16;\ 3257{,}84]
$$

**c)** $n = 20 < 30$ → $t$ con 19 g. l.: $t = 2{,}093$ (riesgo de $0{,}025$ a la derecha):
$$
3250 \pm 2{,}093\,\frac{28{,}28}{\sqrt{20}} = 3250 \pm 13{,}24 \then [3236{,}76;\ 3263{,}24]
$$

Con $t$ el intervalo es más ancho: la $t$ es más dispersa que la normal.
:::
:::

::: aclaracion
En la diapositiva de Garibaldi, el límite inferior de b) figura como 3246,16; con $3250 - 7{,}84$ da $3242{,}16$. En c) la diapositiva da $[3236{,}89;\ 3263{,}10]$ por redondeo.
:::

::: ejemplo Estación de servicio (apunte y Rimoldi)
Muestra de 36 clientes: en promedio, 15 litros. La población es aproximadamente normal con $\sigma = 2$ litros. Estimación puntual e intervalos del 95 % y del 99 %.

::: solucion
- **Puntual:** $\bar x = 15$ litros.
- **95 %:** $e = 1{,}96 \cdot \frac{2}{6} = 0{,}65 \then [14{,}35;\ 15{,}65]$.
- **99 %:** $e = 2{,}576 \cdot \frac{2}{6} = 0{,}86 \then [14{,}14;\ 15{,}86]$.

La amplitud pasa de 1,31 a 1,71: más confianza, menos precisión. De cada 100 intervalos así, 95 (o 99) contienen a $\mu$.
:::
:::

::: ppt Con InfoStat (Rimoldi)
Cargar los datos en una columna → Estadísticas → Inferencia basada en una muestra → **Intervalos de confianza** → elegir la variable → **Media**, Bilateral, la **Confianza** → Aceptar. Ejemplo de salarios: "con un nivel de confianza del 95 %, el verdadero valor de la media poblacional se encuentra en $[134{,}79;\ 139{,}65]$, siendo la estimación puntual \$137,22".
:::

::: ppt Sin reposición
Si la población es finita y $n > 5\,\%$ de $N$, el error estándar lleva el factor de corrección:
$$
\bar x \pm z_{\alpha/2}\,\frac{\sigma}{\sqrt n}\sqrt{\frac{N-n}{N-1}}
$$
:::

::: libro Otros ejemplos del apunte
- **Pesos de 20 empleados** ($\bar x = 75$ kg, $\hat s^2 = 16$, normal, 90 %): $t_{(19);\,0{,}95} = 1{,}729 \then [73{,}45;\ 76{,}55]$.
- **Rendimiento de acciones** ($n = 50$, $\bar x = 8{,}71\,\%$, $\hat s = 2{,}1\,\%$, 90 %): $z = 1{,}645 \then [8{,}22;\ 9{,}20]$.
- **Salario sindical** ($n = 60$, $\bar x = 247{,}45$, $\sigma = 21{,}60$, población no normal, 95 %): $[241{,}98;\ 252{,}92]$.
- **Pago a destajo** ($n = 300$, $\bar x = 18$, $\hat s = 1{,}4$, 95 %): $[17{,}84;\ 18{,}16]$.

El apunte organiza los casos en una tabla (población normal o no, $\sigma$ conocida o no, $n$ menor o mayor que 30). Con población no normal, $\sigma$ desconocida y $n < 30$, no hay método.
:::

::: ojo Errores típicos
- Usar $t$ con $n$ grados de libertad: son **$n - 1$**.
- Buscar $z$ con $1-\alpha$ en vez de $1 - \frac\alpha2$: para el 95 % es 1,96, no 1,645.
- Dividir por la varianza en lugar de la desviación, u olvidarse del $\sqrt n$.
:::

::: pregunta Población normal, $\sigma$ desconocida, $n = 15$. ¿Qué se usa?
- [ ] $z$ con $s$
- [x] $t$ con 14 grados de libertad y $s$
- [ ] $t$ con 15 grados de libertad y $\sigma$
::: solucion Explicación
$\sigma$ desconocida y muestra chica con población normal: $t_{n-1}$ con la desviación muestral.
:::
:::
