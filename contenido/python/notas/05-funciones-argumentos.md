# 5 · Funciones y argumentos

*Peso **A**: tu amigo recordó el `def foo(x=[])` y el desempaquetado con `*args` y `**kwargs`. Todos los resultados están comprobados con Python 3.14: antes de tocar ▶ Ejecutar, intentá adivinar. Los closures y el alcance de las variables están en [[6 · Alcance, regla LEGB y closures]].*

::: claves
- Una función **sin `return`** (o con `return` solo) devuelve **`None`**. `return a, b` devuelve **una tupla**.
- **Orden de los parámetros** al definir: posicionales → con valor por defecto → `*args` → solo por nombre → `**kwargs`. `/` marca "solo posicionales hasta acá" y un `*` solo, "solo por nombre desde acá".
- Al llamar, los argumentos **posicionales van antes** que los nombrados; si no, es `SyntaxError`.
- `*args` llega como **tupla** y `**kwargs` como **diccionario**.
- **Los valores por defecto se evalúan una sola vez, al definir la función.** Un `[]` o `{}` por defecto se **comparte** entre todas las llamadas. La solución: `=None`.
- Las funciones son **objetos**: se pasan como argumento, se devuelven y se guardan en listas o diccionarios.
- Una `lambda` tiene **una sola expresión** (sin `return`, sin asignaciones, sin bloques).
- `map`, `filter` y `zip` devuelven **iteradores**: se agotan después de recorrerlos una vez. `zip` se corta en el más corto.
- `any([])` es `False` y `all([])` es `True`.
- Las **anotaciones de tipo no se verifican** al ejecutar.
:::

## 1. Definir, llamar y devolver

```python
def foo():
    pass                # no devuelve nada explícito

print(foo())            # None

def bar():
    return 1, 2         # en realidad, una tupla

r = bar()
print(r, type(r))
a, b = bar()            # se desempaqueta en dos variables
```

- `def` **crea** un objeto función y lo asigna a un nombre. El cuerpo no se ejecuta hasta que se llama a la función.
- `return` termina la función en ese momento, aunque esté dentro de un bucle. Si la ejecución llega al final sin pasar por un `return`, devuelve `None`.

```python
def f(x):
    for i in range(x):
        if i == 2:
            return i    # corta la función, no solo el bucle

print(f(5), f(1))       # con x = 1 nunca llega al return: None
```

## 2. Tipos de parámetros y su orden

```python
def f(a, b=2, *args, c, **kw):
    print(a, b, args, c, kw)

f(1, 2, 3, 4, c=5, d=6)
f(1, c=0)
```

| Parámetro | En el ejemplo | Recibe |
|---|---|---|
| posicional | `a` | por posición o por nombre; obligatorio |
| con valor por defecto | `b=2` | opcional |
| `*args` | `args` | los posicionales que sobran, en una **tupla** |
| solo por nombre (*keyword-only*) | `c` | todo lo que va después de `*args` (o de un `*` solo): **solo** por nombre |
| `**kwargs` | `kw` | los nombrados que sobran, en un **diccionario** |

Los nombres `args` y `kwargs` son una **convención**: lo que importa son los `*` y `**`.

**`/` y `*` en la definición** (el `/` existe desde Python 3.8):

```python
def g(a, /, b, *, c):
    return a + b + c

print(g(1, 2, c=3))      # a: solo posicional; b: como quieras; c: solo por nombre
print(g(1, b=2, c=3))
```

::: ojo
**Errores que se preguntan:**

| Código | Error |
|---|---|
| `def f(a=1, b):` | `SyntaxError`: un parámetro sin valor por defecto no puede ir después de uno que lo tiene |
| `f(a=1, 2)` | `SyntaxError: positional argument follows keyword argument` |
| `def f(a, b)` y `f(1, a=2)` | `TypeError: f() got multiple values for argument 'a'` |
| `def f(a, /, b)` y `f(a=1, b=2)` | `TypeError`: `a` es solo posicional |
| `def f(a, *, b)` y `f(1, 2)` | `TypeError: f() takes 1 positional argument but 2 were given` |

Los dos primeros son errores **de sintaxis**: saltan al compilar, antes de ejecutar nada. Los otros saltan **al llamar**. El mensaje del primero cambió con las versiones: en las anteriores era *non-default argument follows default argument*.
:::

```python
def f(a, b):
    return a + b

print(f(1, a=2))        # 1 ya ocupó a; después llega a=2
```

## 3. Desempaquetar al llamar: `*` y `**`

`*` reparte una secuencia como argumentos posicionales y `**` reparte un diccionario como argumentos nombrados:

```python
def f(a, b, c):
    print(a, b, c)

f(*[1, 2], **{"c": 3})
args = (1,)
f(*args, 2, c=3)        # se pueden mezclar con argumentos comunes
```

- Las claves del diccionario tienen que ser **strings** (los nombres de los parámetros): `f(**{1: "x"})` es `TypeError: keywords must be strings`.
- Un mismo nombre no puede llegar dos veces: `f(a=1, **{"a": 2})` es `TypeError: got multiple values for keyword argument 'a'`.
- `print(*[1, 2, 3])` imprime `1 2 3`: cada elemento es un argumento distinto.

## 4. Los valores por defecto se evalúan una sola vez

**La trampa más famosa de Python.** El valor por defecto se calcula **una vez, cuando se ejecuta el `def`**, y queda guardado en la función (en `__defaults__`). Si es mutable, todas las llamadas usan **el mismo objeto**:

```python
def foo(x=[]):
    x.append(1)
    return x

print(foo())
print(foo())
print(foo.__defaults__)    # la lista guardada en la función ya tiene dos unos
```

Lo mismo pasa con un diccionario o un set por defecto:

```python
def add(k, v, d={}):
    d[k] = v
    return d

print(add("a", 1))
print(add("b", 2))         # trae el "a" de la llamada anterior
```

**La solución idiomática:** `None` por defecto, y crear el objeto adentro:

```python
def foo(x=None):
    if x is None:
        x = []             # una lista nueva en cada llamada
    x.append(1)
    return x

print(foo(), foo())
```

El valor por defecto también se "congela" con lo que valía la variable **en ese momento**:

```python
x = 5

def f(a=x):                # a queda en 5 para siempre
    return a

x = 10
print(f())
```

::: observacion
Es al revés que en los closures, donde lo que cuenta es el valor **al llamar** (*late binding*). Por eso `lambda i=i: i` arregla las `lambda` creadas en un bucle: ver [[6 · Alcance, regla LEGB y closures]].
:::

## 5. Las funciones son objetos

En Python las funciones son objetos como cualquier otro (*first-class functions*): se asignan a variables, se pasan como argumento, se devuelven y se guardan en estructuras.

```python
def doble(x):
    return 2 * x

def aplicar(f, v):          # recibe una función
    return f(v)

ops = [doble, abs, str]      # funciones en una lista
print([aplicar(f, -3) for f in ops])
print(doble.__name__, type(doble))
```

Una función que recibe o devuelve funciones se llama **de orden superior**: es la base de los decoradores (unidad 8).

**Paso de argumentos.** Python pasa los argumentos **por asignación**: el parámetro es otro nombre para **el mismo objeto**. Si la función lo **modifica**, se ve afuera; si lo **reasigna**, no:

```python
def f(lst):
    lst.append(1)    # modifica el objeto de afuera
    lst = [9]        # reasigna el nombre local: afuera no cambia nada
    lst.append(2)

mia = [0]
f(mia)
print(mia)
```

(Esto se profundiza en la unidad 3, modelo de objetos.)

## 6. `lambda`

Una función anónima de **una sola expresión**, cuyo valor se devuelve solo:

```python
f = lambda x, y=10: x + y
print(f(1), f(1, 2), f.__name__)
```

- Admite parámetros con valor por defecto, `*args` y `**kwargs`.
- **No** puede tener sentencias: ni `return`, ni asignaciones con `=`, ni `if` en bloque (sí la expresión `a if c else b`), ni varios renglones. `lambda x: return x` es un `SyntaxError`.
- Su `__name__` es `'<lambda>'`.
- PEP 8 desaconseja asignar una `lambda` a un nombre (`f = lambda …`): para eso está `def`.

## 7. Funciones de fábrica que reciben funciones

| Función | Qué hace | Detalle que se pregunta |
|---|---|---|
| `map(f, it)` | aplica `f` a cada elemento | devuelve un **iterador** |
| `filter(f, it)` | se queda con los que dan verdadero | `filter(None, it)` saca los valores falsos |
| `functools.reduce(f, it, inicial)` | acumula de a dos | ya no es built-in desde Python 3 |
| `zip(a, b)` | arma tuplas de a pares | se corta en el **más corto**; con `strict=True` (3.10) da error si no tienen el mismo largo |
| `enumerate(it, start=0)` | pares (índice, valor) | `start` cambia el primer índice |
| `sorted(it, key=…, reverse=…)` | lista nueva ordenada | es **estable**: los empates conservan el orden original |
| `min`, `max` | con `key=` | `default=` para cuando el iterable está vacío |
| `any(it)` / `all(it)` | alguno / todos verdaderos | `any([])` es `False`, `all([])` es `True` |
| `sum(it, inicio)` | suma | `sum([1, 2, 3], 10)` es 16 |

```python
m = map(lambda x: x * 2, [1, 2, 3])
print(list(m), list(m))       # el segundo list() encuentra el iterador agotado

print(list(zip([1, 2, 3], "ab")))
print(sorted(["bb", "a", "ccc", "dd"], key=len))   # "bb" y "dd" empatan: quedan en su orden
print(any([]), all([]))

from functools import reduce
print(reduce(lambda acc, x: acc * x, [1, 2, 3, 4]))
print(list(filter(None, [0, 1, "", "a", [], [0]])))
```

## 8. Recursión

Una función puede llamarse a sí misma. Cada llamada ocupa un lugar en la pila, y CPython pone un límite (por defecto, **1000** niveles: `sys.getrecursionlimit()`). Si se pasa, salta `RecursionError`. Python **no** optimiza la recursión de cola.

```python
def fact(n):
    return 1 if n <= 1 else n * fact(n - 1)

print(fact(5))

def sin_fin(n):
    return sin_fin(n + 1)    # nunca termina

sin_fin(0)                    # RecursionError: maximum recursion depth exceeded
```

## 9. Docstrings y anotaciones

```python
def f(x: int) -> int:
    """Devuelve el doble de x."""
    return x * 2

print(f.__doc__)
print(f.__annotations__)
print(f("ab"))    # las anotaciones no se controlan: "ab" * 2
```

- La **docstring** es el string que va como primera sentencia del cuerpo; queda en `__doc__` y la muestra `help()`. Sus convenciones están en **PEP 257**.
- Las **anotaciones** (PEP 484) son información para el programador y para herramientas como mypy; Python **no las verifica** al ejecutar.

## Preguntas tipo examen

::: pregunta What is the output of the following code?
```python
def foo(x=[]):
    x.append(1)
    return x

print(foo(), foo())
```
- [ ] `[1] [1]`
- [ ] `[1] [1, 1]`
- [x] `[1, 1] [1, 1]`
- [ ] It raises `TypeError`
::: solucion Explicación
La lista por defecto se crea **una sola vez**, al definir `foo`. Las dos llamadas devuelven **el mismo objeto**, que termina con dos unos. Y `print` recibe los dos valores ya evaluados antes de imprimir: ve dos referencias a esa misma lista, `[1, 1]`. Si fueran dos `print` separados se vería `[1]` y después `[1, 1]`.
:::
:::

::: pregunta What is the output of the following code?
```python
def f(a, b=2, *args, c, **kw):
    print(a, b, args, c, kw)

f(1, 2, 3, 4, c=5, d=6)
```
- [x] `1 2 (3, 4) 5 {'d': 6}`
- [ ] `1 2 [3, 4] 5 {'d': 6}`
- [ ] `1 2 (3, 4, 5) None {'d': 6}`
- [ ] It raises `TypeError`
::: solucion Explicación
`1` y `2` van a `a` y `b`; los posicionales que sobran (`3, 4`) van a `args` como **tupla** (no lista); `c` es solo por nombre porque está después de `*args`, y recibe `5`; lo nombrado que sobra (`d=6`) va a `kw` como diccionario.
:::
:::

::: pregunta Which of the following function definitions raises a `SyntaxError`?
- [ ] `def f(a, b=1): ...`
- [x] `def f(a=1, b): ...`
- [ ] `def f(*args, b): ...`
- [ ] `def f(a, /, b, *, c): ...`
::: solucion Explicación
Un parámetro **sin** valor por defecto no puede ir después de uno **con** valor por defecto (no habría forma de saber a cuál corresponde un argumento posicional). Las otras son válidas: `b` después de `*args` es solo por nombre, y `/` y `*` marcan los solo posicionales y los solo por nombre.
:::
:::

::: pregunta What happens when this code runs?
```python
def f(a, b):
    return a + b

print(f(1, a=2))
```
- [ ] It prints `3`
- [ ] It prints `2`
- [x] It raises `TypeError`
- [ ] It raises `SyntaxError`
::: solucion Explicación
El `1` posicional ya se asigna a `a`; después llega `a=2` y `a` recibiría dos valores: *TypeError: f() got multiple values for argument 'a'*. No es `SyntaxError`: el orden de la llamada (posicional y después nombrado) es válido; el problema aparece recién al ejecutarla. Además, `b` quedaría sin valor.
:::
:::

::: pregunta What happens when this code runs?
```python
def f(a, /, b):
    return a + b

print(f(a=1, b=2))
```
- [ ] It prints `3`
- [x] It raises `TypeError`
- [ ] It raises `SyntaxError`
- [ ] It prints `None`
::: solucion Explicación
Lo que está antes de `/` es **solo posicional**: `a` no se puede pasar por nombre. La llamada correcta sería `f(1, 2)` o `f(1, b=2)`. El error salta al llamar, no al definir.
:::
:::

::: pregunta What is the output of `print(any([]), all([]))`?
- [ ] `False False`
- [ ] `True True`
- [x] `False True`
- [ ] `True False`
::: solucion Explicación
`any` pregunta "¿hay **alguno** verdadero?": en una lista vacía no hay ninguno, `False`. `all` pregunta "¿hay **alguno** falso?" y responde al revés: como no hay ninguno falso, `True` (es la "verdad vacía" de la lógica).
:::
:::

::: pregunta What is the output of the following code?
```python
x = 5

def f(a=x):
    return a

x = 10
print(f())
```
- [x] `5`
- [ ] `10`
- [ ] `None`
- [ ] It raises `NameError`
::: solucion Explicación
El valor por defecto se evalúa **al ejecutar el `def`**, cuando `x` vale 5, y queda guardado en la función. Cambiar `x` después no lo afecta.
:::
:::

::: pregunta What is the output of the following code?
```python
m = map(lambda x: x * 2, [1, 2, 3])
print(list(m), list(m))
```
- [ ] `[2, 4, 6] [2, 4, 6]`
- [x] `[2, 4, 6] []`
- [ ] `<map object> <map object>`
- [ ] It raises `StopIteration`
::: solucion Explicación
En Python 3, `map` devuelve un **iterador**, no una lista. El primer `list(m)` lo recorre entero y lo **agota**; el segundo no encuentra más elementos y arma una lista vacía. No sale `StopIteration`: `list()` lo usa internamente para saber dónde terminar.
:::
:::

::: pregunta What is the output of the following code?
```python
def f(x: int) -> int:
    return x * 2

print(f("ab"))
```
- [ ] It raises `TypeError` because `"ab"` is not an `int`
- [ ] `4`
- [x] `abab`
- [ ] It raises `SyntaxError`
::: solucion Explicación
Las anotaciones de tipo **no se verifican** al ejecutar: son información para quien lee el código y para herramientas como mypy. `"ab" * 2` repite el string. Es una consecuencia del **tipado dinámico**.
:::
:::

::: pregunta What is the output of the following code?
```python
print(sorted(["bb", "a", "ccc", "dd"], key=len))
```
- [ ] `['a', 'dd', 'bb', 'ccc']`
- [x] `['a', 'bb', 'dd', 'ccc']`
- [ ] `['ccc', 'bb', 'dd', 'a']`
- [ ] `['a', 'bb', 'ccc', 'dd']`
::: solucion Explicación
Ordena por largo: `"a"` (1), después `"bb"` y `"dd"` (2) y al final `"ccc"` (3). Entre `"bb"` y `"dd"` hay empate, y `sorted` es **estable**: los empates quedan en el orden en que venían (`"bb"` estaba antes). La última opción ordena alfabéticamente, sin usar `key`.
:::
:::

::: pregunta What is the output of the following code?
```python
def f(*args, **kwargs):
    print(type(args).__name__, type(kwargs).__name__)

f(1, 2, x=3)
```
- [ ] `list dict`
- [x] `tuple dict`
- [ ] `tuple list`
- [ ] `list list`
::: solucion Explicación
`*args` junta los posicionales que sobran en una **tupla** (inmutable) y `**kwargs` junta los nombrados que sobran en un **diccionario**.
:::
:::

::: pregunta Which statement about `lambda` functions in Python is TRUE?
- [ ] A lambda can contain several statements if they are separated by semicolons
- [ ] A lambda must use `return` to give back a value
- [x] A lambda body is a single expression, and its value is returned automatically
- [ ] A lambda cannot have default parameter values
::: solucion Explicación
El cuerpo de una `lambda` es **una sola expresión**, y su valor se devuelve solo: escribir `return` es un error de sintaxis. No admite sentencias (ni separadas por `;`), pero sí parámetros con valor por defecto (`lambda x, y=10: x + y`), `*args` y `**kwargs`.
:::
:::
