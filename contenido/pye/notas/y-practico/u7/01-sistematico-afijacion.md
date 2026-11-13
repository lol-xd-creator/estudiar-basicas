# P7.1 Muestreo sistemático y afijación

*Guía, unidad 7: ejercicios 2, 3 y 7 (el 9 es igual al 7). Stefanich y Rimoldi resuelven ejercicios de este tipo.*

::: ejercicio 7.2 · Encuesta a suscriptores (sistemático)
Una revista tiene 500.000 suscriptores y quiere encuestar al 10 % con muestreo sistemático. ¿Cómo se toma la muestra?

::: solucion
- $n = 10\,\% \cdot 500.000 = 50.000$.
- Razón de muestreo: $k = \frac{N}{n} = \frac{500.000}{50.000} = 10$.
- Se numeran los suscriptores del 1 al 500.000 y se elige **al azar** un número entre 1 y 10. Si sale 5, entran el 5, 15, 25, 35, …, 499.995.
:::
:::

::: ejercicio 7.3 · Firmas en dos estratos
Se van a elegir 80 de 800 firmas, divididas en dos estratos: 500 con 29 empleados o menos ($\sigma_1 = 30$) y 300 con 30 a 99 empleados ($\sigma_2 = 50$). Calculá la afijación igual, proporcional y óptima.

::: solucion
| Estrato | $N_i$ | $\sigma_i$ | $N_i\sigma_i$ | Igual | Proporcional | Óptima |
|---|---|---|---|---|---|---|
| 1 | 500 | 30 | 15.000 | 40 | 50 | 40 |
| 2 | 300 | 50 | 15.000 | 40 | 30 | 40 |
| Total | 800 | | 30.000 | 80 | 80 | 80 |

- Igual: $\frac{80}{2} = 40$.
- Proporcional: $n_1 = \frac{500}{800}\,80 = 50$; $\ n_2 = \frac{300}{800}\,80 = 30$.
- Óptima: $n_1 = \frac{15.000}{30.000}\,80 = 40$; $\ n_2 = 40$.

El estrato 2 es más chico pero más disperso: en la óptima recibe tanto como el 1.
:::
:::

::: ejercicio 7.7 · Industrias por rubro
Se encuestan 54 industrias de tres rubros: alimenticio ($N = 600$, $\sigma = 15$), textil ($N = 180$, $\sigma = 10$) y metalúrgico ($N = 300$, $\sigma = 20$). Calculá las tres afijaciones. ¿Cuál conviene y por qué?

::: solucion
$N = 1080$; $\ \sum N_i\sigma_i = 9000 + 1800 + 6000 = 16.800$.

| Estrato | $N_i$ | $\sigma_i$ | $N_i\sigma_i$ | Igual | Proporcional | Óptima |
|---|---|---|---|---|---|---|
| Alimenticio | 600 | 15 | 9.000 | 18 | 30 | 29 |
| Textil | 180 | 10 | 1.800 | 18 | 9 | 6 |
| Metalúrgico | 300 | 20 | 6.000 | 18 | 15 | 19 |
| Total | 1080 | | 16.800 | 54 | 54 | 54 |

- Proporcional: $n_1 = \frac{600}{1080}\,54 = 30$, $\ n_2 = 9$, $\ n_3 = 15$.
- Óptima: $n_1 = \frac{9000}{16800}\,54 = 28{,}9 \approx 29$, $\ n_2 = 5{,}8 \approx 6$, $\ n_3 = 19{,}3 \approx 19$.

**Conviene la óptima**, porque los estratos tienen **desviaciones distintas**: maximiza la precisión.

::: ojo
Al redondear, revisá que la suma dé $n$ (29 + 6 + 19 = 54). La guía pone 20 en el texto y 19 en la tabla; con 20 sumaría 55.
:::
:::
:::
