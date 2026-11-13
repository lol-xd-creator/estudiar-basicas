# 8.5 Intervalo de confianza para la proporción

::: ppt Intervalo para $P$ (Garibaldi)
Con $n$ grande, por el TCL, $\hat p$ es aproximadamente normal:
$$
z = \frac{\hat p - P}{\sqrt{\dfrac{P(1-P)}{n}}}
$$
Despejando $P$ y **reemplazando dentro de la raíz $P$ por su estimador $\hat p$**:
$$
\hat p - z_{\alpha/2}\sqrt{\frac{\hat p(1-\hat p)}{n}} < P < \hat p + z_{\alpha/2}\sqrt{\frac{\hat p(1-\hat p)}{n}}
\qquad
e = z_{\alpha/2}\sqrt{\frac{\hat p(1-\hat p)}{n}}
$$
Sin reposición ($n > 5\,\%$ de $N$) se multiplica la raíz por $\sqrt{\frac{N-n}{N-1}}$.
:::

::: ppt Pasos para estimar la proporción (Rimoldi)
1. Fijar el nivel de significación o de confianza.
2. Buscar el valor de $z$.
3. Calcular la proporción de la muestra $\hat p = \frac{x}{n}$.
4. Calcular el error típico $\sqrt{\frac{\hat p(1-\hat p)}{n}}$.
5. Construir el intervalo.
6. Conclusión.
:::

::: ejemplo Pensión completa en un hotel (Garibaldi)
De 500 turistas, 100 pidieron pensión completa. Intervalo del 95 %.

::: solucion
$\hat p = \frac{100}{500} = 0{,}20$:
$$
0{,}20 \pm 1{,}96\sqrt{\frac{0{,}2 \cdot 0{,}8}{500}} = 0{,}20 \pm 0{,}035 \then [0{,}165;\ 0{,}235]
$$
Con un 95 % de confianza, entre el 16,5 % y el 23,5 % de los turistas pediría pensión completa. (En la diapositiva aparece redondeado como $[0{,}16;\ 0{,}23]$.)
:::
:::

::: ejemplo Estudiantes que elegirían testing (Rimoldi)
De 100 estudiantes, 39 se dedicarían a testing. Intervalo del 99 %. ¿Un nivel de confianza menor mejoraría la precisión?

::: solucion
$\hat p = 0{,}39$; $\ 0{,}39 \pm 2{,}576\sqrt{\frac{0{,}39 \cdot 0{,}61}{100}} \then [0{,}26;\ 0{,}52]$. De cada 100 intervalos así, 99 contienen la verdadera proporción.

**Sí:** la longitud es $2z\sqrt{\frac{\hat p(1-\hat p)}{n}}$; con menos confianza $z$ baja, la longitud baja y la precisión mejora (a cambio de más riesgo).
:::
:::

::: ppt Con InfoStat (Rimoldi y guía)
Una columna con **1** (éxito) y **0** (fracaso) → Estadísticas → Inferencia basada en una muestra → **Intervalos de confianza** → **Proporción**, Bilateral, *Éxitos valores =* 1, confianza → Aceptar. La salida da la *Estimación* ($\hat p$), el *E.E.* (error estándar) y los límites. Ejemplo de inmobiliarias: "con un nivel de confianza del 95 %, la proporción de alquileres está en $[0{,}50;\ 0{,}80]$, con estimación puntual 0,66".
:::

::: libro Regla de Cochran e intervalo para el número de éxitos (apunte)
- **¿Cuándo $n$ es "grande"?** Para un intervalo del 95 %: $\hat p = 0{,}5 \to n \ge 30$; $0{,}4 \to 50$; $0{,}3 \to 80$; $0{,}2 \to 200$; $0{,}1 \to 600$; $0{,}05 \to 1400$. Cuanto más lejos de 0,5, más grande tiene que ser $n$.
- **Para $nP$** se multiplican los límites por $n$. *Ejemplo:* de 500 directores, 100 vacacionan en el exterior; con 99,73 % ($z = 3$), $0{,}146 \le P \le 0{,}254$ y $73 \le nP \le 127$.
:::

::: pregunta En una estimación por intervalos de la proporción poblacional se utiliza:
- [ ] $z = \frac{\hat p - P}{\frac{P(1-P)}{n}}$
- [x] $z = \frac{\hat p - P}{\sqrt{\frac{P(1-P)}{n}}}$
- [ ] $z = \frac{\hat p - P}{\sqrt{P(1-P)}}$
::: solucion Explicación
Se divide por el error estándar de $\hat p$ (con la raíz). Es una pregunta del parcial de Sistemas de 2020.
:::
:::

::: pregunta ¿Por qué en el intervalo para $P$ se usa $\hat p(1-\hat p)$ y no $P(1-P)$?
- [ ] Porque da un intervalo más angosto
- [x] Porque $P$ es justamente lo que no se conoce
- [ ] Porque $\hat p$ es sesgado
::: solucion Explicación
El error estándar depende del parámetro desconocido, así que se estima con $\hat p$.
:::
:::
