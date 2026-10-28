# Ecuaciones diferenciales de orden superior

Sigue de [[Ecuaciones diferenciales ordinarias]] (las de 1.er orden). Ahora la ecuación tiene derivadas de orden $n$; el centro de la unidad son las **lineales de 2.º orden a coeficientes constantes**: $y'' + p\,y' + q\,y = r(x)$.

::: claves
- **EDO de orden $n$**: su SG tiene $n$ constantes esenciales y una SP necesita $n$ condiciones iniciales. Es **lineal** si es de 1.er grado en $y$ y sus derivadas; **homogénea** si $r(x) = 0$. Ver [[1. EDO de orden n y ecuaciones lineales]].
- **Homogéneas de 2.º orden**: si $y_1$ e $y_2$ son soluciones **linealmente independientes** ($\frac{y_1}{y_2} \ne \cte$, o wronskiano $W \ne 0$), la SG es $y = C_1y_1 + C_2y_2$. Ver [[2. EDL homogéneas de 2.º orden y wronskiano]].
- **Coeficientes constantes**: se propone $y = e^{mx}$ y sale la **ecuación característica** $m^2 + p\,m + q = 0$. Según sus raíces:
  - reales distintas: $y = C_1e^{r_1x} + C_2e^{r_2x}$;
  - reales iguales: $y = C_1e^{rx} + C_2\,x\,e^{rx}$;
  - complejas $\alpha \pm \beta i$: $y = e^{\alpha x}(A\cos\beta x + B\sen\beta x)$.

  Ver [[3. Homogéneas a coeficientes constantes]].
- **No homogéneas**: $y = y_H + y_p$ (la SG de la homogénea más **una** solución particular). Ver [[4. EDL no homogéneas: estructura de la solución]].
- **$y_p$ por coeficientes indeterminados**: se propone una $y_p$ del mismo tipo que $r(x)$ (polinomio, exponencial, seno y coseno, sumas y productos) y, si choca con $y_H$, se multiplica por $x$ o $x^2$. Ver [[5. Método de los coeficientes indeterminados]].
- **$y_p$ por variación de los parámetros**: para cualquier $r(x)$; $y_p = u\,y_1 + v\,y_2$ con $u'$ y $v'$ por Cramer. Ver [[6. Método de variación de los parámetros]].
:::

## Cómo resolver $y'' + p\,y' + q\,y = r(x)$

::: tip Receta
1. **$y_H$**: plantear la ecuación característica $m^2 + p\,m + q = 0$, hallar sus raíces y escribir $y_H$ según el caso.
2. **$y_p$**: si $r(x)$ es polinomio, exponencial, seno o coseno (o sumas y productos de esos), por **coeficientes indeterminados**; si no (por ejemplo $\sec x$, $\tg x$, $\ln x$), por **variación de los parámetros**.
3. **Comparar** la $y_p$ propuesta con $y_H$: si algún sumando se repite, multiplicar por $x$ (o por $x^2$).
4. Derivar $y_p$, **reemplazar** en la ED e **igualar coeficientes**.
5. **SG**: $y = y_H + y_p$. Si hay condiciones iniciales, se calculan $C_1$ y $C_2$ al final, sobre la SG completa.
:::
