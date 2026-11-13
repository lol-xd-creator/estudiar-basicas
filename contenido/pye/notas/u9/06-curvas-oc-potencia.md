# 9.6 Curva OC y curva de potencia

::: idea
Si $H_0$ es falsa, el parámetro puede tener **muchos** valores (todos los de $H_1$). Para cada uno hay un $\beta$ distinto. Las curvas muestran **cómo cambian $\beta$ y la potencia según el verdadero valor del parámetro**.
:::

## Cómo se calcula $\beta$ y la potencia

::: ppt Pasos (Garibaldi)
La potencia ($1-\beta$) dice **qué tan bien trabaja la prueba**: rechazar $H_0$ cuando es falsa es lo que debe hacer una buena prueba. Para calcularla hace falta **un valor específico de $H_1$**:

1. Calcular los **puntos críticos** con la distribución bajo $H_0$ (centrada en $\mu_0$).
2. **Trasladarlos** a la distribución bajo $H_1$ (centrada en $\mu_1$) y **estandarizarlos con $\mu_1$**: $z = \frac{\bar x^* - \mu_1}{\sigma/\sqrt n}$.
3. $\beta$ = área de la **zona de aceptación** bajo $H_1$; $\ 1 - \beta$ = área de la **zona de rechazo** bajo $H_1$.
:::

::: ejemplo Potencia en el ejemplo de las correas (Garibaldi)
Con $H_0: \mu = 40.000$ (bilateral, puntos críticos 39.020 y 40.980, $\sigma_{\bar x} = 500$), calcular $\beta$ y la potencia si $\mu = 40.700$.

::: solucion
::: pasos
z_1 = \frac{39.020 - 40.700}{500} = -3{,}36 \qquad z_2 = \frac{40.980 - 40.700}{500} = 0{,}56
1 - \beta = P(z < -3{,}36) + P(z > 0{,}56) = 0{,}2881
\beta = P(-3{,}36 < z < 0{,}56) = 0{,}7119
:::
Con $\mu = 40.700$ (cerca de 40.000), la prueba solo detecta que $H_0$ es falsa el 29 % de las veces.
:::
:::

::: ppt Con InfoStat (Garibaldi y Rimoldi)
Aplicaciones → Didácticas → **Gráficos de funciones de densidad continuas** → Normal con **media $\mu_0$** y **varianza de la media muestral** $\frac{\sigma^2}{n}$:

1. Elegir *Mayores o iguales que* (derecha), *Menores o iguales que* (izquierda) o *Entre* (bilateral) con la probabilidad de $\alpha$ o $1-\alpha$ → InfoStat calcula el **punto crítico**.
2. **Clonar** la función y, en la clonada, cambiar la media por $\mu_1$.
3. El área de rechazo en la clonada es la **potencia**; con **Complementario**, $\beta$.

*Ejemplos de las clases:* salarios con $\mu_0 = 136$, $\sigma^2_{\bar x} = 2{,}0484$: punto crítico 138,354 y potencia 0,7801 para $\mu = 139{,}46$. Longitud de piezas con $\mu_0 = 70$ (bilateral): puntos críticos 63,74 y 76,26 y potencia 0,0960 para $\mu = 72$. Salarios con $\mu_0 = 150$ y $\mu = 151$: $\beta = 0{,}7963$ y potencia $0{,}2037$.
:::

## Las curvas

::: ppt Curva de potencia y curva OC (Garibaldi)
- **Curva de potencia**: asocia a cada valor del parámetro (con $H_1$ cierta) su probabilidad $1 - \beta$.
- **Curva operatoria característica (OC)**: es el **complemento** de la de potencia; asocia a cada valor del parámetro su probabilidad $\beta$.
- Sirven para cualquier parámetro (también para la proporción).
:::

::: ejemplo La tabla de Garibaldi (y del apunte)
Una pieza tiene una característica normal con $\mu = 100$ y $\sigma = 12$; con $n = 36$, $\sigma_{\bar x} = 2$. Prueba lateral derecha ($H_1: \mu > 100$) con $\alpha = 0{,}0228$ ($z = 2$): punto crítico $\bar x^* = 100 + 2 \cdot 2 = 104$.

| $\mu$ | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 |
|---|---|---|---|---|---|---|---|---|---|
| $\beta$ (OC) | 0,9772 | 0,9332 | 0,8413 | 0,6915 | 0,50 | 0,3085 | 0,1587 | 0,0668 | 0,0228 |
| $1-\beta$ (potencia) | 0,0228 | 0,0668 | 0,1587 | 0,3085 | 0,50 | 0,6915 | 0,8413 | 0,9332 | 0,9772 |

::: solucion Cómo sale cada valor
$\beta = P(\bar x \le 104 \mid \mu) = P\!\left(z \le \frac{104 - \mu}{2}\right)$. Por ejemplo, para $\mu = 102$: $P(z \le 1) = 0{,}8413$. En $\mu = 100$ ($H_0$ cierta) la potencia vale $\alpha$; en $\mu = 104$ (el punto crítico), $\beta = 0{,}5$.

Con $\bar x = 103$ en la muestra: $103 < 104$ → no se rechaza $H_0$ (no conviene cambiar el proceso).
:::
:::

```grafico
titulo: Curva de potencia $1-\beta$ (roja) y curva OC $\beta$ (azul)
segmento (100, 0.0228) (101, 0.0668) ; rojo ; gruesa
segmento (101, 0.0668) (102, 0.1587) ; rojo ; gruesa
segmento (102, 0.1587) (103, 0.3085) ; rojo ; gruesa
segmento (103, 0.3085) (104, 0.5) ; rojo ; gruesa
segmento (104, 0.5) (105, 0.6915) ; rojo ; gruesa
segmento (105, 0.6915) (106, 0.8413) ; rojo ; gruesa
segmento (106, 0.8413) (107, 0.9332) ; rojo ; gruesa
segmento (107, 0.9332) (108, 0.9772) ; rojo ; gruesa
segmento (100, 0.9772) (101, 0.9332) ; azul ; gruesa
segmento (101, 0.9332) (102, 0.8413) ; azul ; gruesa
segmento (102, 0.8413) (103, 0.6915) ; azul ; gruesa
segmento (103, 0.6915) (104, 0.5) ; azul ; gruesa
segmento (104, 0.5) (105, 0.3085) ; azul ; gruesa
segmento (105, 0.3085) (106, 0.1587) ; azul ; gruesa
segmento (106, 0.1587) (107, 0.0668) ; azul ; gruesa
segmento (107, 0.0668) (108, 0.0228) ; azul ; gruesa
texto (107.3, 0.85) "$1-\beta$"
texto (107.3, 0.15) "$\beta$"
texto (100.4, 0.08) "$\alpha$"
x: 99.5..108.5
y: -0.05..1.05
aspecto: libre
alto: 260
```

::: ppt Qué hace más potente a una prueba (Garibaldi y Rimoldi)
- **Aumentar $\alpha$** (van en el mismo sentido), a costa de más error tipo I.
- **Aumentar $n$**: el estimador se concentra, $\beta$ baja.
- **Diferencias más grandes** entre el valor de $H_0$ y el de $H_1$.
:::

**Dócima uniformemente más potente:** entre varias pruebas con el mismo $\alpha$, la que tiene **mayor $1-\beta$ para todos los valores del parámetro**, es decir, la que **minimiza $\beta$**. (Viene del apunte y salió en el parcial de Sistemas de 2020.)

::: libro Las otras dos versiones del ejemplo (apunte)
- **Lateral izquierda** ($H_1: \mu < 100$), $\bar x = 92$: punto crítico $\bar x^* = 96$; $92 < 96$ → se rechaza $H_0$. La potencia vale $0{,}9772$ en $\mu = 92$, $0{,}5$ en $96$ y $0{,}0228$ en $100$.
- **Bilateral** con $\alpha = 0{,}0456$, $\bar x = 95$: puntos críticos 96 y 104; se rechaza $H_0$. La potencia tiene forma de **V**, con mínimo $\alpha$ en $\mu = 100$ ($0{,}50$ en 96 y en 104; $0{,}9772$ en 92 y en 108).
- Las pruebas cuyas curvas de potencia se cruzan (mejores para unos valores, peores para otros) se llaman **inadmisibles**.
:::

::: pregunta Cuando se relacionan todos los valores posibles del parámetro, con la hipótesis alternativa cierta, con sus probabilidades $1-\beta$, se forma:
- [ ] la curva OC
- [ ] la curva operatoria característica
- [x] la curva de potencia
::: solucion Explicación
$1-\beta$ es la potencia. La curva OC grafica $\beta$. (Parcial de Sistemas de 2020.)
:::
:::

::: pregunta La dócima uniformemente más potente:
- [ ] minimiza $1-\beta$
- [ ] minimiza $\alpha$
- [x] minimiza $\beta$
::: solucion Explicación
Para un $\alpha$ fijo, tiene la mayor potencia en todo el espacio del parámetro, o sea, el menor $\beta$. (Parcial de Sistemas de 2020.)
:::
:::
