# 5 · Repaso: lo que hay que saber

*15 min: primero las fórmulas, después las preguntas sin mirar.*

## Las fórmulas

::: claves
- **Definición:** $\displaystyle\iint_R f\,\dA = \lim_{\max\Delta A\to 0} \sum_{j=1}^{m}\sum_{i=1}^{n} f(x_{ij};y_{ij})\,\Delta A_{ij}$
- **Rectángulo:** $\displaystyle\iint_R f\,\dx\,\dy = \int_a^b \dx \int_c^d f\,\dy = \int_c^d \dy \int_a^b f\,\dx$
- **Tipo 1:** $\displaystyle\iint_D f\,\dx\,\dy = \int_a^b \dx \int_{g_1(x)}^{g_2(x)} f\,\dy$
- **Tipo 2:** $\displaystyle\iint_D f\,\dx\,\dy = \int_c^d \dy \int_{h_1(y)}^{h_2(y)} f\,\dx$
- **Área:** $\displaystyle A(D) = \iint_D \dx\,\dy$
- **Volumen:** $\displaystyle V = \iint_D \big[f_2 - f_1\big]\,\dx\,\dy$
:::

## Cómo se resuelve un ejercicio

Los cuatro ejemplos del apunte siguen los mismos pasos:

1. **Gráfico** del dominio de integración.
2. **Orden de integración:** según el tipo de región, evitando partir $D$ o tener raíces en los límites.
3. **Cálculo:** de la integral de la derecha hacia afuera.

## Preguntas

::: ejercicio ¿Qué representa $\iint_R f(x;y)\,\dA$ si $f \ge 0$? ¿Y si $f$ toma valores negativos?
::: respuesta
Si $f \ge 0$, el volumen del sólido entre $R$ y la superficie $z = f(x;y)$. Si toma valores negativos, el cálculo vale igual, pero el número es una suma algebraica de valores positivos y negativos que ya no representa un volumen.
:::
:::

::: ejercicio ¿Qué es cada término de la doble suma de Riemann?
::: respuesta
El volumen de un paralelepípedo rectángulo (prisma) de base $\Delta A_{ij}$ y altura $f(x_{ij};y_{ij})$. La suma aproxima el volumen; su límite, cuando $\max\Delta A \to 0$, es la integral doble.
:::
:::

::: ejercicio En $\displaystyle\int_a^b \dx \int_c^d f(x;y)\,\dy$, ¿qué integral se hace primero y qué queda constante?
::: respuesta
La de la derecha: primero se integra respecto de $y$, con $x$ constante. El resultado es una función de $x$, que después se integra entre $a$ y $b$.
:::
:::

::: ejercicio ¿Qué es geométricamente $F(x) = \int_c^d f(x;y)\,\dy$?
::: respuesta
El área de la figura debajo de la curva $C$ en el plano $x = \cte$: el área de un corte del sólido. Sumando las rebanadas $F(\varepsilon_i)\,\Delta x_i$ y tomando límite se obtiene el volumen.
:::
:::

::: ejercicio ¿Cuándo da igual el orden de integración?
::: respuesta
Cuando los límites son constantes (dominio rectangular): $\int_a^b \dx \int_c^d f\,\dy = \int_c^d \dy \int_a^b f\,\dx$.
:::
:::

::: ejercicio Escribí la integral sobre una región de tipo 1 y sobre una de tipo 2.
::: respuesta
Tipo 1, $a \le x \le b \wedge g_1(x) \le y \le g_2(x)$: $\displaystyle\int_a^b \dx \int_{g_1(x)}^{g_2(x)} f\,\dy$.

Tipo 2, $c \le y \le d \wedge h_1(y) \le x \le h_2(y)$: $\displaystyle\int_c^d \dy \int_{h_1(y)}^{h_2(y)} f\,\dx$.
:::
:::

::: ejercicio En $\displaystyle\iint_D \frac{\dx\,\dy}{x+y}$, con $D$ entre $y = x$, $x = 1$, $x = 2$ e $y = 0$, ¿por qué se integra primero en $y$?
::: respuesta
Porque $D$ es de tipo 1 ($1 \le x \le 2$, $0 \le y \le x$). Integrando primero en $x$ habría que partir $D$ en dos regiones y hacer dos integrales (propiedad 3).
:::
:::

::: ejercicio ¿Cómo se calcula el área de una región con una integral doble? ¿Qué propiedad se usa?
::: respuesta
$A(D) = \iint_D \dx\,\dy$, por la propiedad 5: integrar $f = 1$ sobre $D$ da el área de $D$.
:::
:::

::: ejercicio ¿Cómo se calcula el volumen entre $z = f_1(x;y)$ y $z = f_2(x;y)$?
::: respuesta
$V = \iint_D \big[f_2(x;y) - f_1(x;y)\big]\,\dx\,\dy$, con $f_2$ la de arriba, $f_1$ la de abajo y $D$ la región del plano $xy$ sobre la que está el sólido.
:::
:::

::: ejercicio En el volumen del primer octante ($x^2 + y^2 = 9$, $z = 2x + 2$, $z = 2$), ¿por qué conviene integrar primero en $x$?
::: respuesta
Para eliminar la raíz del límite de integración: $x$ va de $0$ a $\sqrt{9 - y^2}$ y, como la primitiva de $2x$ es $x^2$, al evaluar queda $9 - y^2$, sin raíz.
:::
:::
