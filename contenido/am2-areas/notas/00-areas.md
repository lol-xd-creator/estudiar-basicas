# Cálculo de áreas de superficies

Área de una superficie del espacio $z = f(x;y)$ cuya proyección sobre el plano $xy$ es un dominio acotado $D$. Se calcula con una **integral doble sobre $D$**.

::: claves
- **Idea**: se parte $D$ en rectángulos $R_{ij}$; sobre cada uno, el pedazo de superficie se aproxima con el **pedazo de plano tangente** $\Delta\sigma_{ij}$, que se proyecta sobre $R_{ij}$: $\Delta A_{ij} = \Delta\sigma_{ij}\cos\varphi_{ij}$.
- **Fórmula**: $A(S) = \iint_D \sqrt{[f'_x]^2 + [f'_y]^2 + 1}\,\dx\,\dy$. Ver [[1. Superficies sobre el plano xy]].
- **Otras proyecciones**: si la superficie es $x = f(y;z)$ o $y = f(x;z)$, se integra sobre $D$ en el plano $yz$ o $xz$ con las derivadas respecto de esas variables. Ver [[2. Superficies sobre los planos yz y xz]].
- **Ejemplos**: dos porciones de plano; una en el primer octante y otra dentro de un cilindro, que se resuelve en polares. Ver [[3. Ejemplos de áreas de superficies]].
:::
