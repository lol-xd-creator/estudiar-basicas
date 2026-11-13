# 6.1 Variables continuas: densidad y acumulación

::: idea
Una variable continua tiene infinitos valores posibles, así que **cada valor exacto tiene probabilidad cero**. Por eso no se puede listar en una tabla como las discretas: la probabilidad se mide como **área bajo una curva**, la función de densidad.
:::

::: ppt Función de densidad (Garibaldi)
$f(x)$ es la función de densidad de la variable $x$, definida en $\R$, si:

- $f(x) \ge 0$ para todo $x \in \R$;
- $\displaystyle\int_{-\infty}^{+\infty} f(x)\,\dx = 1$ (el área total es 1);
- $\displaystyle P(a < x < b) = \int_a^b f(x)\,\dx$.
:::

```grafico
titulo: $P(a < x < b)$ es el área bajo $f(x)$ entre $a$ y $b$
y = e^(-x^2/2)/sqrt(2 pi) ; "$f(x)$" ; gruesa
-0.5 <= x <= 1.2, 0 <= y <= e^(-x^2/2)/sqrt(2 pi) ; rayado ; azul
texto (-0.5, -0.04) "$a$"
texto (1.2, -0.04) "$b$"
x: -3.5..3.5
grilla: no
aspecto: libre
alto: 260
```

Como $\int_a^a f(x)\,\dx = 0$:

::: resultado
$$
P(x = a) = 0 \qquad\then\qquad P(a < x < b) = P(a \le x \le b)
$$
:::

::: ppt Acumulada, esperanza y varianza (Garibaldi)
$$
F(x) = P(X \le x) = \int_{-\infty}^{x} f(t)\,\dt
\qquad
P(a < x < b) = F(b) - F(a)
$$

$$
E(x) = \int_{-\infty}^{+\infty} x\,f(x)\,\dx
\qquad
V(x) = \int_{-\infty}^{+\infty} \big[x - E(x)\big]^2 f(x)\,\dx = E(x^2) - \big[E(x)\big]^2
$$
:::

Los modelos que siguen son casos particulares de $f(x)$: **uniforme, exponencial, normal y $t$** (son las cuatro distribuciones que presenta Garibaldi).

::: pregunta Si $x$ es continua, ¿cuánto vale $P(x = 15)$?
- [ ] Depende de $f(15)$
- [x] $0$
- [ ] $F(15)$
::: solucion Explicación
Es el área de un segmento de ancho cero: $\int_{15}^{15} f(x)\,\dx = 0$. $f(15)$ es una **densidad** (la altura de la curva), no una probabilidad.
:::
:::

::: pregunta ¿Qué es $F(b) - F(a)$?
- [x] $P(a < x \le b)$
- [ ] $f(b) - f(a)$
- [ ] $E(x)$ en $[a;b]$
::: solucion Explicación
$F(b)$ acumula el área hasta $b$ y $F(a)$ hasta $a$: la diferencia es el área entre $a$ y $b$.
:::
:::
