# 9.4 Dócima para la media

::: idea
Se usa la misma regla que en estimación para elegir **$z$ o $t$**. La diferencia es que ahora el estadístico se centra en el valor de la hipótesis nula, $\mu_0$: "si $H_0$ fuera cierta, ¿qué tan raro sería este $\bar x$?".
:::

::: ppt Qué estadístico usar (Garibaldi y Rimoldi)
| Caso | Estadístico |
|---|---|
| $\sigma$ **conocida** (población normal, o $n$ grande) | $z = \dfrac{\bar x - \mu_0}{\sigma/\sqrt n}$ |
| $\sigma$ **desconocida**, $n > 30$ | $z = \dfrac{\bar x - \mu_0}{s/\sqrt n}$ (por el TCL) |
| $\sigma$ **desconocida**, $n < 30$ (población normal) | $t = \dfrac{\bar x - \mu_0}{s/\sqrt n}$, con $n-1$ grados de libertad |

Con $\sigma$ desconocida se usa **siempre la varianza muestral corregida** (Var(n-1) en InfoStat).
:::

::: ppt Puntos críticos y regla de decisión
Los valores críticos salen de **despejar $\bar x$ del estadístico**:

| Prueba | Punto crítico | Se rechaza $H_0$ si… |
|---|---|---|
| Lateral derecha | $\bar x^* = \mu_0 + z_\alpha\,\frac{\sigma}{\sqrt n}$ | $\bar x > \bar x^*$ (o $z > z^*$) |
| Lateral izquierda | $\bar x^* = \mu_0 - z_\alpha\,\frac{\sigma}{\sqrt n}$ | $\bar x < \bar x^*$ (o $z < -z^*$) |
| Bilateral | $\bar x^*_{1,2} = \mu_0 \mp z_{\alpha/2}\,\frac{\sigma}{\sqrt n}$ | $\bar x < \bar x^*_1$ o $\bar x > \bar x^*_2$ |

Con $\alpha = 0{,}05$: **1,645** en una lateral y **1,96** en la bilateral.
:::

::: ejemplo Correas de distribución (Garibaldi): bilateral, $\sigma$ conocida
Un ingeniero asegura que las correas duran en promedio 40.000 km; $\sigma = 5.000$ km. En 100 vehículos, $\bar x = 42.000$ km. $\alpha = 0{,}05$.

::: solucion
$H_0: \mu = 40.000$, $H_1: \mu \ne 40.000$ (no hay valor alternativo: dos colas). $\ \frac{\sigma}{\sqrt n} = 500$.

**Valores críticos:**
$$
\bar x^*_1 = 40.000 - 1{,}96 \cdot 500 = 39.020 \qquad \bar x^*_2 = 40.000 + 1{,}96 \cdot 500 = 40.980
$$
Regla: rechazar $H_0$ si $\bar x < 39.020$ o $\bar x > 40.980$. Como $\bar x = 42.000$, **se rechaza $H_0$**: la afirmación del ingeniero no es correcta.

**Con $z$:** $z = \frac{42.000 - 40.000}{500} = 4 > 1{,}96$ → se rechaza.
:::
:::

::: ejemplo Las mismas correas con $\sigma$ desconocida (Garibaldi): $t$
$n = 25$, $\bar x = 42.000$, $s = 8.000$. Bilateral con $\alpha = 0{,}05$.

::: solucion
$t_{(24)} = 2{,}064$. $\quad t = \frac{42.000 - 40.000}{8.000/\sqrt{25}} = 1{,}25$.

$-2{,}064 < 1{,}25 < 2{,}064$ → **no se rechaza $H_0$**. Con menos datos y más dispersión, la misma diferencia no alcanza.
:::
:::

::: ejemplo Ingreso de un restaurante (Rimoldi): lateral izquierda
El dueño dice que el ingreso medio diario es de 675; en 25 días se obtuvo $\bar x = 600$ (población normal). $\alpha = 0{,}05$. El empresario solo compra si las ventas no son inferiores a 675.

::: solucion
$H_0: \mu = 675$, $H_1: \mu < 675$.

- **$\sigma = 150$ conocida:** $z = \frac{600 - 675}{150/5} = -2{,}5 < -1{,}645$ → **se rechaza $H_0$**. Valor p: $P(z < -2{,}5) = 0{,}0062$.
- **$\sigma$ desconocida** ($s = 125$ sin corregir): $t_{24} = \frac{600 - 675}{125/\sqrt{24}} = -2{,}94 < -1{,}711$ → también **se rechaza**.

Los ingresos serían menores que 675: al empresario no le interesa comprar.
:::
:::

::: observacion $\frac{s}{\sqrt{n-1}}$ es lo mismo que $\frac{\hat s}{\sqrt n}$
En la resolución de Rimoldi se divide la desviación **sin corregir** por $\sqrt{n-1}$. Como $\hat s = s\sqrt{\frac{n}{n-1}}$, da el mismo error estándar que la corregida dividida por $\sqrt n$.
:::

::: ppt Con InfoStat (Rimoldi y Stefanich)
Cargar los datos → Estadísticas → Inferencia basada en una muestra → **Prueba t para una media** → valor de $\mu_0$ y tipo de prueba → la salida da $n$, Media, DE, $T$ y el **valor p**.

*Ejemplo (salarios):* "el salario promedio es distinto de \$150": $p < 0{,}0001 < 0{,}05$ → se rechaza $H_0$. "Mayor a \$150": $p = 0{,}9999 > 0{,}05$ → no se rechaza. También se decide viendo si $\mu_0$ está en el intervalo de confianza.
:::

::: libro Probabilidades involucradas en cada tipo (apunte)
El apunte arma, para cada tipo de prueba, las cuatro probabilidades. Por ejemplo, en la lateral derecha:
$$
\alpha = P\!\left(z > \tfrac{\bar x^* - \mu_0}{\sigma_{\bar x}}\right)
\quad
1-\alpha = P\!\left(z \le \tfrac{\bar x^* - \mu_0}{\sigma_{\bar x}}\right)
\quad
\beta = P\!\left(z \le \tfrac{\bar x^* - \mu_1}{\sigma_{\bar x}}\right)
\quad
1-\beta = P\!\left(z > \tfrac{\bar x^* - \mu_1}{\sigma_{\bar x}}\right)
$$
En la bilateral, $1-\beta$ es la suma de dos colas que **no son simétricas** respecto de los puntos críticos. El cálculo de $\beta$ y la potencia está en [[9.6 Curva OC y curva de potencia]].
:::

::: pregunta En una prueba de hipótesis para la media con varianza conocida, bilateral, los puntos críticos son:
- [ ] $\mu_0 \pm t\,\frac{\sigma}{\sqrt n}$
- [ ] $\mu_0 \pm z\,\frac{s}{\sqrt n}$
- [ ] $\mu_1 \pm z\,\frac{\sigma}{\sqrt n}$
- [x] $\mu_0 \pm z\,\frac{\sigma}{\sqrt n}$
::: solucion Explicación
Se calculan con la distribución bajo $H_0$ (centrada en $\mu_0$), con $z$ porque $\sigma$ es conocida. (Parcial de Sistemas de 2020.)
:::
:::

::: pregunta En las pruebas de hipótesis, la distribución $t$ se usa para:
- [ ] pruebas de medias con varianzas poblacionales conocidas
- [x] pruebas de medias con varianzas poblacionales desconocidas
- [ ] pruebas de proporciones
::: solucion Explicación
La $t$ reemplaza $\sigma$ por $s$ (con muestra chica y población normal). (Parcial de Sistemas de 2020.)
:::
:::
