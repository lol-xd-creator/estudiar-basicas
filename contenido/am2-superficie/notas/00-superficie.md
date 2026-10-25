# Integrales de superficie

Integral de un **campo vectorial** sobre un dominio superficial $\sigma$: es el **flujo** del campo a través de la superficie. Con ella se enuncian los teoremas de **Stokes** (que generaliza el de Green) y de la **divergencia** (Gauss).

::: claves
- **Operador nabla**: $\nabla = \left(\pd{}{x};\pd{}{y};\pd{}{z}\right)$ da el gradiente $\nabla f$, la divergencia $\nabla\cdot\mathbf F$ y el rotor $\nabla\times\mathbf F$. Ver [[1. Operador nabla]].
- **Flujo**: $\iint_\sigma \mathbf F\cdot\mathbf n\,\dd\sigma$; si $\sigma$: $z = f(x;y)$, queda $\iint_D \left(-\pd{f}{x}F_1 - \pd{f}{y}F_2 + F_3\right)\dx\,\dy$. Ver [[2. Flujo a través de una superficie]].
- **Superficie paramétrica** $\mathbf r(u;v)$: $\iint_D \mathbf F\big(\mathbf r(u;v)\big)\cdot(\mathbf r_u\times\mathbf r_v)\,\du\,\dd v$. Ver [[3. Superficies paramétricas]].
- **Stokes**: la circulación sobre el borde es el flujo del rotor, $\oint_\lambda \mathbf F\cdot\dd\mathbf s = \iint_\sigma \nabla\times\mathbf F\cdot\dd\boldsymbol\sigma$; Green es un caso particular. Ver [[4. Teorema de Stokes]].
- **Divergencia (Gauss)**: el flujo por una superficie cerrada es la integral triple de la divergencia, $\iint_\sigma \mathbf F\cdot\mathbf n\,\dd\sigma = \iiint_V \operatorname{div}\mathbf F\,\dV$. Ver [[5. Teorema de la divergencia]].
:::
