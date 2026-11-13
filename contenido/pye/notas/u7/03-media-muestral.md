# 7.3 Distribución de la media muestral

::: idea
Cada muestra posible da **su** $\bar x$. Si se juntan las medias de **todas** las muestras posibles, se obtiene la distribución de $\bar x$. Resultado clave: **está centrada en $\mu$** y es **menos dispersa** que la población, tanto menos cuanto más grande es $n$.
:::

::: ppt Distribución de muestreo (Garibaldi)
Una **estadística** es una variable aleatoria que se obtiene con datos de una muestra. La **distribución muestral** de una estadística es la distribución de **todos** los valores que puede tomar, calculados con muestras **del mismo tamaño**, elegidas al azar **de la misma población**.

La media muestral tiene, como toda distribución, **forma, centro y variabilidad**, y conocerla permite **estimar su error**. Las medias muestrales varían **menos** que los valores individuales: por eso se confía más en un promedio que en un dato suelto.
:::

::: ppt Cómo se arma (Garibaldi y Rimoldi)
1. **Cantidad de muestras posibles:**
   - con reposición (o población infinita): $N^n$;
   - sin reposición (o población finita): $_NC_n = \binom{N}{n}$.
2. **Listar todas las muestras** y calcular $\bar x$ en cada una.
3. **Tabla** con los valores distintos de $\bar x$ y su probabilidad.
4. $E(\bar x) = \sum \bar x_i\,P(\bar x_i)$ y $\sigma^2_{\bar x} = \sum \bar x_i^2\,P(\bar x_i) - \big[E(\bar x)\big]^2$.
5. **Comprobar** las relaciones con los parámetros.
:::

::: ppt Relaciones con los parámetros
$$
E(\bar x) = \mu \qquad \text{(con o sin reposición)}
$$

| | Varianza de $\bar x$ | Desviación de $\bar x$ (error estándar) |
|---|---|---|
| **Con reposición** (MCR) | $\sigma^2_{\bar x} = \dfrac{\sigma^2}{n}$ | $\sigma_{\bar x} = \dfrac{\sigma}{\sqrt n}$ |
| **Sin reposición** (MSR) | $\sigma^2_{\bar x} = \dfrac{\sigma^2}{n}\cdot\dfrac{N-n}{N-1}$ | $\sigma_{\bar x} = \dfrac{\sigma}{\sqrt n}\sqrt{\dfrac{N-n}{N-1}}$ |

$\frac{N-n}{N-1}$ es el **factor de corrección para poblaciones finitas**: tiende a 1 si $N$ es grande frente a $n$, y se omite si $n \le 5\,\%$ de $N$.
:::

- La varianza de $\bar x$ es **proporcional a $\sigma^2$** e **inversamente proporcional a $n$**: más muestra, menos variabilidad.
- $\sigma_{\bar x}$ dice con qué exactitud $\bar x$ estima a $\mu$.

::: ejemplo Clínicas (Garibaldi)
Población: 4 clínicas con $1, 2, 3$ y $4$ quirófanos. Muestras de $n = 2$.

::: solucion
$\mu = 2{,}5$ y $\sigma^2 = \frac{1+4+9+16}{4} - 2{,}5^2 = 1{,}25$.

**Con reposición** ($4^2 = 16$ muestras):

| $\bar x$ | 1 | 1,5 | 2 | 2,5 | 3 | 3,5 | 4 |
|---|---|---|---|---|---|---|---|
| $P$ | $\frac{1}{16}$ | $\frac{2}{16}$ | $\frac{3}{16}$ | $\frac{4}{16}$ | $\frac{3}{16}$ | $\frac{2}{16}$ | $\frac{1}{16}$ |

$E(\bar x) = 2{,}5 = \mu$ ✓; $\ \sigma^2_{\bar x} = \frac{110}{16} - 2{,}5^2 = 0{,}625 = \frac{1{,}25}{2}$ ✓

**Sin reposición** ($_4C_2 = 6$ muestras): $\bar x = 1{,}5;\ 2;\ 2{,}5;\ 2{,}5;\ 3;\ 3{,}5$.

$E(\bar x) = 2{,}5$ ✓; $\ \sigma^2_{\bar x} = \frac{40}{6} - 6{,}25 = 0{,}4167 = \frac{1{,}25}{2}\cdot\frac{4-2}{4-1}$ ✓
:::
:::

```grafico
titulo: Distribución de $\bar x$ de las clínicas (con reposición): centrada en $\mu = 2{,}5$
segmento (1, 0) (1, 1) ; gruesa ; azul
segmento (1.5, 0) (1.5, 2) ; gruesa ; azul
segmento (2, 0) (2, 3) ; gruesa ; azul
segmento (2.5, 0) (2.5, 4) ; gruesa ; rojo
segmento (3, 0) (3, 3) ; gruesa ; azul
segmento (3.5, 0) (3.5, 2) ; gruesa ; azul
segmento (4, 0) (4, 1) ; gruesa ; azul
x: 0.5..4.5
y: -0.3..4.6
aspecto: libre
alto: 220
```

::: ejemplo Horas de cuatro empleados (Rimoldi)
Cuatro empleados trabajan 3, 4, 5 y 6 horas. Con muestras de 2 con reposición ($4^2 = 16$), $E(\bar x) = \frac{72}{16} = 4{,}5 = \mu$, y $\sigma_{\bar x} = \frac{\sigma}{\sqrt 2}$.
:::

::: libro Ejemplo del apunte: materias aprobadas de 6 estudiantes
Población $1, 2, 3, 3, 4, 5$: $\mu = 3$, $\sigma^2 = 1{,}666$, $\sigma = 1{,}29$. Con reposición hay $6^2 = 36$ muestras; las medias van de 1 a 5 con probabilidades $\frac{1}{36}, \frac{2}{36}, \frac{5}{36}, \frac{6}{36}, \frac{8}{36}, \frac{6}{36}, \frac{5}{36}, \frac{2}{36}, \frac{1}{36}$. Da $E(\bar x) = 3$ y $\sigma_{\bar x} = 0{,}9129 = \frac{1{,}29}{\sqrt 2}$. Sin reposición hay 15 muestras (los dos 3 son elementos distintos), con $\sigma_{\bar x} = 0{,}8165$.

**¿Para qué sirve si se toma una sola muestra?** Dice qué tan cerca de $\mu$ puede caer la única $\bar x$ que se obtiene: en el ejemplo, ninguna media se aleja más de 2 materias, y hay un 56 % de probabilidad de no alejarse más de 0,5.
:::

::: pregunta Si se cuadruplica el tamaño de la muestra, el error estándar de la media:
- [ ] se divide por 4
- [x] se divide por 2
- [ ] no cambia
::: solucion Explicación
$\sigma_{\bar x} = \frac{\sigma}{\sqrt n}$: con $4n$ queda $\frac{\sigma}{2\sqrt n}$.
:::
:::

::: pregunta La varianza de la distribución de las medias muestrales es igual a la desviación de la población dividida por la raíz de $n$.
- [ ] Verdadero
- [x] Falso
::: solucion Explicación
$\frac{\sigma}{\sqrt n}$ es la **desviación** de $\bar x$; la varianza es $\frac{\sigma^2}{n}$. (Pregunta de los parciales de 2021.)
:::
:::
