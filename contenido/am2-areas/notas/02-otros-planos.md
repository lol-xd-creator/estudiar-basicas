# 2. Superficies sobre los planos yz y xz

El mismo razonamiento vale si la superficie se proyecta sobre otro plano coordenado: cambian las variables de la función y el plano donde está $D$.

## Superficie $x = f(y;z)$, con $D$ en el plano $yz$

```grafico3d
titulo: $S$: $x = f(y;z)$, proyectada sobre $D$ en el plano $yz$
x = 2.5 + (y^2 + (z - 1.5)^2)/3 ; sobre y^2 + (z - 1.5)^2 <= 1 ; sombra ; "$x = f(y;z)$"
vista: 40, 18
```

::: resultado Área de la superficie $x = f(y;z)$
$$
A(S) = \iint_D \sqrt{\left[f'_y\right]^2 + \left[f'_z\right]^2 + 1}\;\dy\,\dz
$$
:::

## Superficie $y = f(x;z)$, con $D$ en el plano $xz$

```grafico3d
titulo: $S$: $y = f(x;z)$, proyectada sobre $D$ en el plano $xz$
y = 2.5 + (x^2 + (z - 1.5)^2)/3 ; sobre x^2 + (z - 1.5)^2 <= 1 ; sombra ; "$y = f(x;z)$"
vista: 25, 18
```

::: resultado Área de la superficie $y = f(x;z)$
$$
A(S) = \iint_D \sqrt{\left[f'_x\right]^2 + \left[f'_z\right]^2 + 1}\;\dx\,\dz
$$
:::

::: observacion
En los tres casos la regla es la misma: bajo la raíz van los cuadrados de las **dos derivadas parciales** de $f$ respecto de las variables del plano donde está $D$, más $1$; y se integra sobre $D$ respecto de esas dos variables.
:::
