# 4. Propiedades

Sean $f(x;y)$ y $g(x;y)$ integrables sobre $D$. Entonces:

::: propiedades
1. $\displaystyle\iint_D \big(f(x;y) + g(x;y)\big)\,\dx\,\dy = \iint_D f(x;y)\,\dx\,\dy + \iint_D g(x;y)\,\dx\,\dy$
2. $\displaystyle\iint_D c\,f(x;y)\,\dx\,\dy = c\iint_D f(x;y)\,\dx\,\dy$, con $c = \cte$
3. $\displaystyle\iint_D f(x;y)\,\dx\,\dy = \iint_{D_1} f(x;y)\,\dx\,\dy + \iint_{D_2} f(x;y)\,\dx\,\dy$, siendo $D = D_1 \cup D_2$ unión de regiones simples. Igual vale para la unión de más regiones simples.
4. Si $f(x;y) \ge g(x;y)\ \forall (x;y) \in D$: $\displaystyle\iint_D f(x;y)\,\dx\,\dy \ge \iint_D g(x;y)\,\dx\,\dy$
5. Si $f(x;y) = 1\ \forall (x;y) \in D$: $\displaystyle\iint_D 1\,\dx\,\dy = \iint_D \dx\,\dy = A(D)$, el **área** del recinto $D$.
6. Si $m \le f(x;y) \le M\ \forall (x;y) \in D$: $\displaystyle m\,A(D) \le \iint_D f(x;y)\,\dx\,\dy \le M\,A(D)$
:::

```grafico
titulo: Propiedad 3: $D = D_1 \cup D_2$
poligono (0, 1) (1, 3) (1, 0.5) ; "$D_1$"
poligono (1, 3) (2, 2) (2, 0) (1, 0.5) ; "$D_2$"
```

## Ejemplo

::: ejemplo Hallar $\displaystyle\iint_D \frac{\dx\,\dy}{x+y}$ siendo $D$ la región encerrada por $y = x$, $x = 1$, $x = 2$ e $y = 0$
**a) Gráfico de $D$**

```grafico
y = x ; x: -0.3..2.5
x = 1 ; gris ; punteada ; ""
x = 2 ; gris ; punteada ; ""
0 <= y <= x, 1 <= x <= 2 ; "$D$"
```

**b) Orden de integración.** $D$ es de tipo 1, $D = \{(x;y) \,/\, 1 \le x \le 2 \wedge 0 \le y \le x\}$: se integra **primero en $y$**.

Si se hubiera elegido primero $x$, habría que dividir $D$ y hacer dos integrales, usando la propiedad 3:

```grafico
titulo: Primero $x$: hay que partir $D$ en $D_1$ y $D_2$
1 <= y <= 2, y <= x <= 2 ; "$D_1$"
0 <= y <= 1, 1 <= x <= 2 ; "$D_2$"
```

**c) Cálculo**

::: pasos
I_D = \int_1^2 \dx \int_0^x \frac{\dy}{x+y}
    = \int_1^2 \dx \, \eval{\ln(x+y)}{0}{x}          // primitiva respecto de $y$
    = \int_1^2 \big(\ln 2x - \ln x\big)\,\dx
    = \ln 2 \int_1^2 \dx                               // $\ln 2x - \ln x = \ln\frac{2x}{x} = \ln 2$
    = \ln 2 \cdot \eval{x}{1}{2} = \ln 2
:::

::: resultado
$$
\iint_D \frac{\dx\,\dy}{x+y} = \ln 2
$$
:::
:::
