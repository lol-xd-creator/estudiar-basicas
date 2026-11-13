# 6.2 Modelo uniforme continuo

::: idea
La variable solo puede caer en un intervalo $[a;b]$ y **la densidad es constante** ahí (por eso también se llama **rectangular**). La probabilidad de un subintervalo es **proporcional a su longitud**.
:::

::: ppt Densidad, media y varianza (Garibaldi y Rimoldi)
$$
f(x) = \begin{cases} \dfrac{1}{b-a} & a \le x \le b \\[4pt] 0 & \text{en otro caso} \end{cases}
\qquad
\mu = E(x) = \frac{a+b}{2}
\qquad
\sigma^2 = V(x) = \frac{(b-a)^2}{12}
$$

$a$ es el valor mínimo que puede tomar la variable y $b$ el máximo. Si dan $f(x)$ y el intervalo, se reconoce porque $\frac{1}{b-a}$ coincide con la densidad (en la máquina de café, $[7;10]$ y $f(x) = \frac13$).
:::

```grafico
titulo: Densidad uniforme: un rectángulo de base $b-a$ y altura $\frac{1}{b-a}$
1 <= x <= 5, 0 <= y <= 0.25 ; rayado
segmento (1, 0.25) (5, 0.25) ; gruesa
texto (1, -0.02) "$a$"
texto (5, -0.02) "$b$"
texto (0.3, 0.25) "$\frac{1}{b-a}$"
x: 0..6
y: -0.05..0.35
aspecto: libre
grilla: no
```

::: ppt Los tres casos (Rimoldi)
- **A lo sumo** $x_2$: $\ P(x \le x_2) = \dfrac{x_2 - a}{b-a}$ (el límite inferior implícito es $a$).
- **Al menos** $x_1$: $\ P(x \ge x_1) = \dfrac{b - x_1}{b-a}$ (el límite superior implícito es $b$).
- **Entre** $x_1$ y $x_2$: $\ P(x_1 \le x \le x_2) = \dfrac{x_2 - x_1}{b-a}$.

Como en toda continua, "menor que" es lo mismo que "menor o igual que".
:::

La acumulada es $F(x) = \frac{x-a}{b-a}$ entre $a$ y $b$ (vale 0 antes de $a$ y 1 después de $b$).

::: ejemplo Máquina de café (Rimoldi)
La cantidad diaria de café, en litros, está en $[7;10]$ con $f(x) = \frac{1}{3}$.

::: solucion
- Como máximo 8,8 litros: $P(x \le 8{,}8) = \frac{8{,}8 - 7}{10-7} = 0{,}6$.
- Entre 7,4 y 9,5: $P(7{,}4 \le x \le 9{,}5) = \frac{9{,}5 - 7{,}4}{3} = 0{,}7$.
- Al menos 8,5: $P(x \ge 8{,}5) = \frac{10 - 8{,}5}{3} = 0{,}5$.

**InfoStat:** Probabilidades y cuantiles → Uniforme (a,b). Para el intervalo, $P(x \le 9{,}5) - P(x \le 7{,}4) = 0{,}8333 - 0{,}1333$.
:::
:::

::: ejemplo Reserva de un aula (Garibaldi)
La duración $x$ de un curso es uniforme en $[0;4]$ horas. ¿Probabilidad de que dure como mínimo 3 horas? ¿Media y varianza?

::: solucion
$P(x \ge 3) = \frac{4-3}{4} = \frac14$. $\quad\mu = \frac{0+4}{2} = 2$, $\quad\sigma^2 = \frac{(4-0)^2}{12} = 1{,}33$.
:::
:::

::: libro De dónde salen la densidad, la media y la varianza
**Densidad.** Se parte de una constante $y = k$ y se pide que el área total sea 1: $\int_a^b k\,\dx = k(b-a) = 1 \then k = \frac{1}{b-a}$. Por eso $\frac{1}{b-a}$ se llama **factor de proporcionalidad**: $P(c < x < d) = \frac{d-c}{b-a}$.

**Media y varianza.**
::: pasos
E(x) = \int_a^b x\,\frac{1}{b-a}\,\dx = \frac{b^2-a^2}{2(b-a)} = \frac{a+b}{2}
E(x^2) = \int_a^b x^2\,\frac{1}{b-a}\,\dx = \frac{b^3-a^3}{3(b-a)}
V(x) = E(x^2) - \big[E(x)\big]^2 = \frac{(b-a)^3}{12(b-a)} = \frac{(b-a)^2}{12}
:::
:::

::: pregunta Si $x$ es uniforme en $(0;10)$, ¿cuánto vale $P(2 < x < 5)$?
- [ ] $0{,}5$
- [x] $0{,}3$
- [ ] $0{,}2$
::: solucion Explicación
$\frac{5-2}{10-0} = 0{,}3$: la longitud del subintervalo sobre la del intervalo total.
:::
:::
