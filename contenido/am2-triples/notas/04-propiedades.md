# 4. Propiedades de las integrales triples

Sean $f(x;y;z)$ y $g(x;y;z)$ integrables sobre $S$. Entonces:

::: propiedades
1. $\displaystyle\iiint_S \big(f(x;y;z) + g(x;y;z)\big)\,\dx\,\dy\,\dz = \iiint_S f(x;y;z)\,\dx\,\dy\,\dz + \iiint_S g(x;y;z)\,\dx\,\dy\,\dz$
2. $\displaystyle\iiint_S c\,f(x;y;z)\,\dx\,\dy\,\dz = c\iiint_S f(x;y;z)\,\dx\,\dy\,\dz$, con $c = \cte$
3. $\displaystyle\iiint_S f(x;y;z)\,\dx\,\dy\,\dz = \iiint_{S_1} f(x;y;z)\,\dx\,\dy\,\dz + \iiint_{S_2} f(x;y;z)\,\dx\,\dy\,\dz$, siendo $S = S_1 \cup S_2$ unión de regiones simples.
4. Si $f(x;y;z) \ge g(x;y;z)\ \forall (x;y;z) \in S$: $\displaystyle\iiint_S f(x;y;z)\,\dx\,\dy\,\dz \ge \iiint_S g(x;y;z)\,\dx\,\dy\,\dz$
5. Si $f(x;y;z) = 1\ \forall (x;y;z) \in S$: $\displaystyle\iiint_S 1\,\dx\,\dy\,\dz = \iiint_S \dx\,\dy\,\dz = V(S)$, que equivale al **volumen** del recinto $S$.
6. Si $m \le f(x;y;z) \le M\ \forall (x;y;z) \in S$: $\displaystyle m\,V(S) \le \iiint_S f(x;y;z)\,\dx\,\dy\,\dz \le M\,V(S)$
:::

::: observacion
Son las mismas que en [[4. Propiedades]] de dobles, con $S$ en lugar de $D$ y el volumen $V(S)$ en lugar del área $A(D)$.
:::
