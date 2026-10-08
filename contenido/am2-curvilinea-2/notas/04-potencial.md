# 4. Cálculo de la función potencial

Si $\mathbf F$ es un campo vectorial gradiente, su función potencial $f$ cumple $\mathbf F = \nabla f$.

## 1) En $\R^2 \xrightarrow{\ \mathbf F\ } \R^2$, con $C \subset \R^2$

$$
\int_C F_1(x;y)\,\dx + F_2(x;y)\,\dy = \int_C \pd{f}{x}(x;y)\,\dx + \pd{f}{y}(x;y)\,\dy = \int_C \dd f
$$

Hay tres formas de calcular la función potencial.

### a) Partiendo de $F_1 = \pd{f}{x}$

$F_1$ es un dato; integrando respecto de $x$:

$$
f(x;y) = \int F_1(x;y)\,\dx + \varphi(y) \label{pot-a}
$$

Al integrar respecto de $x$, la **constante de integración** $\varphi$ puede depender de $y$. Para relacionar esta expresión con el otro dato, $F_2$, se la deriva respecto de $y$:

::: pasos
\pd{f}{y}(x;y) = \frac{\partial\left[\int F_1(x;y)\,\dx\right]}{\partial y} + \varphi'(y) = F_2(x;y)
\then \varphi'(y) = F_2(x;y) - \frac{\partial\left[\int F_1(x;y)\,\dx\right]}{\partial y}
:::

Para obtener $\varphi(y)$ se integra respecto de $y$, y por último se reemplaza su valor en \eqref{pot-a}: así queda calculada la función potencial $f$.

### b) Partiendo de $F_2 = \pd{f}{y}$

Se puede partir del dato $F_2$ y, con pasos similares a los recién vistos, llegar a la función potencial.

### c) Integrando $F_1$ y $F_2$ a la vez

$$
F_1 = \pd{f}{x} \quad\then\quad f(x;y) = \int F_1(x;y)\,\dx + \varphi(y)
$$

$$
F_2 = \pd{f}{y} \quad\then\quad f(x;y) = \int F_2(x;y)\,\dy + \psi(x)
$$

Luego se **comparan** ambas expresiones y se deduce el valor de las constantes; así queda calculada la función potencial $f$.

::: ejemplo Sabiendo que el campo vectorial $\mathbf F(x;y) = \left(2xy^3;\ 3x^2y^2 - 2\right)$ es un campo gradiente, hallar su función potencial
$$
F_1\,\dx + F_2\,\dy = \pd{f}{x}\,\dx + \pd{f}{y}\,\dy = \dd f
$$

Integrando cada componente respecto de su variable:

$$
\begin{aligned}
f(x;y) &= \int F_1\,\dx + \varphi(y) = \int 2xy^3\,\dx + \varphi(y) = \hl{x^2y^3} + \varphi(y) \\
f(x;y) &= \int F_2\,\dy + \psi(x) = \int \left(3x^2y^2 - 2\right)\dy + \psi(x) = \hl{x^2y^3} - 2y + \psi(x)
\end{aligned}
$$

Comparando:

$$
\varphi(y) = -2y + C \qquad\qquad \psi(x) = C
$$

::: resultado
$$
f(x;y) = x^2y^3 - 2y + C
$$
:::

Se verifica el resultado derivando: $\pd{f}{x} = 2xy^3 = F_1$ y $\pd{f}{y} = 3x^2y^2 - 2 = F_2$.
:::

## 2) En $\R^3 \xrightarrow{\ \mathbf F\ } \R^3$, con $C \subset \R^3$

$$
\int_C F_1\,\dx + F_2\,\dy + F_3\,\dz = \int_C \pd{f}{x}\,\dx + \pd{f}{y}\,\dy + \pd{f}{z}\,\dz = \int_C \dd f
$$

Se integran a la vez los datos $F_1$, $F_2$ y $F_3$:

$$
\begin{aligned}
F_1 = \pd{f}{x} &\quad\then\quad f(x;y;z) = \int F_1(x;y;z)\,\dx + \varphi(y;z) \\
F_2 = \pd{f}{y} &\quad\then\quad f(x;y;z) = \int F_2(x;y;z)\,\dy + \psi(x;z) \\
F_3 = \pd{f}{z} &\quad\then\quad f(x;y;z) = \int F_3(x;y;z)\,\dz + \phi(x;y)
\end{aligned}
$$

Luego se comparan estas expresiones para obtener el valor de las constantes; así queda calculada la función potencial $f$.

::: ejemplo Sabiendo que $\mathbf F(x;y;z) = \left(2xy;\ x^2 + z^2;\ 2yz\right)$ es un campo vectorial gradiente, hallar su función potencial
$$
\mathbf F(x;y;z) = (F_1;F_2;F_3) = \left(\pd{f}{x};\ \pd{f}{y};\ \pd{f}{z}\right)
$$

entonces:

$$
\begin{aligned}
f(x;y;z) &= \int F_1\,\dx + \varphi(y;z) = \int 2xy\,\dx + \varphi(y;z) = \hl{x^2y} + \varphi(y;z) \\
f(x;y;z) &= \int F_2\,\dy + \psi(x;z) = \int \left(x^2 + z^2\right)\dy + \psi(x;z) = \hl{x^2y} + \hlb{yz^2} + \psi(x;z) \\
f(x;y;z) &= \int F_3\,\dz + \phi(x;y) = \int 2yz\,\dz + \phi(x;y) = \hlb{yz^2} + \phi(x;y)
\end{aligned}
$$

Comparando:

$$
\varphi(y;z) = yz^2 + C \qquad\qquad \psi(x;z) = C \qquad\qquad \phi(x;y) = x^2y + C
$$

::: resultado
$$
f(x;y;z) = x^2y + yz^2 + C
$$
:::

Se verifica derivando $f$: $\pd{f}{x} = 2xy$, $\pd{f}{y} = x^2 + z^2$ y $\pd{f}{z} = 2yz$.
:::
