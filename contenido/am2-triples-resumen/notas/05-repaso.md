# 5 · Repaso de integrales triples

*15 min: primero las fórmulas, después las preguntas sin mirar.*

## Las fórmulas

::: claves
- **Definición:** $\displaystyle\iiint_B f\,\dV = \lim_{\max\Delta V\to 0} \sum_{i=1}^{l}\sum_{j=1}^{m}\sum_{k=1}^{n} f(x_{ijk};y_{ijk};z_{ijk})\,\Delta V_{ijk}$
- **Paralelepípedo:** $\displaystyle\iiint_B f\,\dx\,\dy\,\dz = \int_a^b \dx \int_c^d \dy \int_p^q f\,\dz$ (o en cualquiera de los seis órdenes)
- **Tipo 1:** $\displaystyle\iiint_S f = \iint_D \dx\,\dy \int_{\mu_1(x;y)}^{\mu_2(x;y)} f\,\dz$
- **Tipo 2:** $\displaystyle\iiint_S f = \iint_D \dy\,\dz \int_{\mu_1(y;z)}^{\mu_2(y;z)} f\,\dx$
- **Tipo 3:** $\displaystyle\iiint_S f = \iint_D \dx\,\dz \int_{\mu_1(x;z)}^{\mu_2(x;z)} f\,\dy$
- **Volumen:** $\displaystyle V(S) = \iiint_S \dx\,\dy\,\dz$
:::

## Cómo se resuelve un ejercicio

Los tres ejemplos del apunte siguen los mismos pasos:

1. **Gráfico** del sólido.
2. **Tipo de región:** entre qué dos superficies queda; esa variable va primero. Dibujar la sombra $D$.
3. **Límites:** los de la primera variable son superficies; los de $D$, como en dobles (evitando raíces en los límites cuando se puede).
4. **Cálculo:** de la integral de la derecha hacia afuera.

## Preguntas

::: ejercicio ¿Qué cambia en la definición respecto de las integrales dobles?
::: respuesta
El rectángulo pasa a ser un paralelepípedo $B = [a;b]\times[c;d]\times[p;q]$; los subrectángulos, subparalelepípedos $B_{ijk}$ de volumen $\Delta V_{ijk} = \Delta x_i\,\Delta y_j\,\Delta z_k$; la suma de Riemann es triple, y el límite se toma con $\max\Delta V \to 0$.
:::
:::

::: ejercicio En $\displaystyle\int_a^b \dx \int_c^d \dy \int_p^q f\,\dz$, ¿en qué orden se integra y qué queda constante en cada paso?
::: respuesta
Primero respecto de $z$, con $x$ e $y$ constantes (queda una integral doble en $[a;b]\times[c;d]$); después respecto de $y$, con $x$ constante; por último respecto de $x$ sobre $[a;b]$.
:::
:::

::: ejercicio ¿Cuántos órdenes de integración hay y cuál se elige?
::: respuesta
Seis. Si se puede integrar en otro orden, el resultado es el mismo: se elige el que dé el cálculo más sencillo.
:::
:::

::: ejercicio ¿Cómo se integra sobre un sólido $S$ que no es un paralelepípedo?
::: respuesta
Se lo encierra en un paralelepípedo $B$ y se define $F = f$ en $S$ y $F = 0$ en el resto de $B$; entonces $\iiint_S f = \iiint_B F$. En la práctica: se reconoce el tipo de región, se integra primero entre las dos superficies y lo que queda es una integral doble sobre la sombra $D$.
:::
:::

::: ejercicio $S$ está entre $x = \mu_1(y;z)$ y $x = \mu_2(y;z)$. ¿Qué tipo es, qué variable va primero y en qué plano está $D$?
::: respuesta
Tipo 2: primero se integra en $x$, y $D$ está en el plano $yz$: $\iiint_S f = \iint_D \dy\,\dz \int_{\mu_1}^{\mu_2} f\,\dx$.
:::
:::

::: ejercicio ¿Cómo se calcula el volumen con una integral triple? ¿Qué relación tiene con la fórmula de dobles?
::: respuesta
Con $f = 1$ (propiedad 5): $V(S) = \iiint_S \dx\,\dy\,\dz$. Si $S$ es tipo 1, la integral en $z$ da $\mu_2 - \mu_1$ y queda $\iint_D [\mu_2 - \mu_1]\,\dx\,\dy$, la fórmula de volumen de dobles.
:::
:::

::: ejercicio En el ejemplo del cilindro ($z\sqrt{1-y^2}$ sobre $x^2 + y^2 \le 1$, $0 \le z \le 1$), ¿por qué conviene dejar $y$ para el final?
::: respuesta
Porque el integrando tiene $\sqrt{1 - y^2}$ y los límites de $x$ son $\pm\sqrt{1 - y^2}$: al integrar en $x$ aparece otro $2\sqrt{1-y^2}$, el producto da $2(1 - y^2)$ y la raíz desaparece. Resultado: $\frac{4}{3}$.
:::
:::
