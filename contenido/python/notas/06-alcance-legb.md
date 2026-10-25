# 6 · Alcance, regla LEGB y closures

*Peso **A**: tu amigo recordó preguntas de esto (LEGB, `global` contra `nonlocal`, funciones anidadas y closures con nombres como `foo` y `bar`). Todos los resultados de esta nota están comprobados con Python 3.14: tocá ▶ Ejecutar para verlos, pero antes intentá adivinar.*

::: claves
- **LEGB** es el orden en que Python **busca** un nombre: **L**ocal → **E**nclosing (la función que encierra) → **G**lobal (el módulo) → **B**uilt-in.
- Si en una función hay una **asignación** a un nombre (en cualquier renglón), ese nombre es **local en toda la función**. Leerlo antes de asignarlo da `UnboundLocalError`.
- **`global x`**: `x` es la del módulo. **`nonlocal x`**: `x` es la de la función que encierra más cercana; nunca la global (si no existe ahí, `SyntaxError`).
- **Modificar** un objeto (`lista.append(1)`) no es asignar el nombre: no hace falta `global`.
- Solo crean alcance nuevo las **funciones** (y `lambda`), las **clases**, los **módulos** y las **comprensiones**. Un `if`, un `for`, un `while`, un `with` o un `try` **no**.
- **Closure**: una función interna que recuerda las variables de la que la encierra, aunque esa ya haya terminado. Ve el valor **al momento de llamarla**, no al definirla (*late binding*).
- El cuerpo de una **clase no es "Enclosing"** para sus métodos: un método no ve los atributos de clase sin `self.` ni `NombreClase.`.
:::

## 1. Nombres, espacios de nombres y alcance

En Python una variable es un **nombre** que apunta a un objeto. Los nombres viven en **espacios de nombres** (*namespaces*), que en el fondo son diccionarios:

- el de las **funciones de fábrica** (*built-ins*: `print`, `len`, `ValueError`…), que existe desde que arranca el intérprete;
- el **global** de cada módulo (cada archivo `.py`);
- el **local** de cada llamada a una función, que se crea al llamarla y se descarta al terminar.

El **alcance** (*scope*) de un nombre es la parte del código desde donde se lo puede usar sin prefijo. Python lo decide **al compilar** la función, mirando el texto (alcance **léxico** o estático), no mientras se ejecuta. De ahí salen casi todas las trampas de esta unidad.

## 2. La regla LEGB

Cuando aparece un nombre, Python lo busca en este orden y usa **el primero que encuentra**:

| Letra | Alcance | Qué es |
|---|---|---|
| **L** | Local | lo asignado dentro de la función actual (incluye los parámetros) |
| **E** | Enclosing | las funciones que encierran a la actual, de la más cercana hacia afuera |
| **G** | Global | lo asignado en el nivel superior del módulo |
| **B** | Built-in | las funciones de fábrica (módulo `builtins`) |

Si no está en ninguno: `NameError`.

```python LEGB.py
x = "global"

def outer():
    x = "enclosing"
    def inner():
        x = "local"
        print(x)       # busca primero en L
    inner()
    print(x)           # outer no ve el x de inner

outer()
print(x)
```

::: observacion
La búsqueda es **hacia afuera** y nunca hacia adentro: `outer` no ve las variables de `inner`. Probá borrar el renglón `x = "local"`: `inner` pasa a imprimir `enclosing`. Si además borrás el de `outer`, imprime `global`.
:::

**Tapar un built-in.** Si asignás un nombre que ya es una función de fábrica, el tuyo gana por LEGB (G o L van antes que B):

```python
list = [1, 2, 3]        # ahora "list" es esta lista, no el tipo
print(list)
print(list("abc"))      # TypeError: 'list' object is not callable
```

Para recuperarlo se borra el nombre con `del list`: la búsqueda vuelve a llegar hasta B.

## 3. Asignar hace local al nombre (`UnboundLocalError`)

Python decide **antes de ejecutar** qué nombres son locales: lo es todo nombre que **se asigna** en algún renglón de la función. Aunque la asignación esté al final, el nombre es local **desde el principio**:

```python
x = 10

def foo():
    print(x)     # ¿10? No: x es local en toda la función
    x = 20

foo()
```

El error es `UnboundLocalError` (una subclase de `NameError`). En Python 3.11 o posterior el mensaje es *cannot access local variable 'x' where it is not associated with a value*; en versiones anteriores, *local variable 'x' referenced before assignment*.

El caso más común es un `+=`, que **lee y asigna**:

```python
total = 0

def add():
    total += 1   # total = total + 1: total es local, y se lee antes de tener valor

add()
```

::: ojo
**Cuentan como asignación** (y vuelven local al nombre): `=`, `+=` y compañía, `for x in ...`, `import x`, `def x`, `class x`, `del x`, `with ... as x`, `except ... as x` y el operador `:=`.
:::

## 4. `global` y `nonlocal`

```python
count = 0

def inc():
    global count     # count es la variable del módulo
    count += 1

inc()
inc()
print(count)
```

| | `global x` | `nonlocal x` |
|---|---|---|
| Se refiere a | la `x` del módulo | la `x` de la función que encierra más cercana que la tenga |
| ¿Tiene que existir antes? | No: si no existe, la crea al asignarla | **Sí**: si no hay ninguna función que la encierre con esa `x`, es `SyntaxError` |
| ¿Sirve para una global? | Sí | **No** |
| ¿Dónde se puede usar? | en cualquier función | solo en una función **anidada** |

```python
x = 1

def foo():
    nonlocal x   # SyntaxError: no binding for nonlocal 'x' found
    x = 2
```

`nonlocal` llega hasta la función que encierra más cercana **que tenga** ese nombre, aunque esté varios niveles más afuera:

```python
def a():
    v = "a"
    def b():
        def c():
            nonlocal v   # salta b (que no tiene v) y llega a la de a
            v = "c"
        c()
    b()
    print(v)

a()
```

Las declaraciones van **antes** de usar el nombre en la función: `print(x)` seguido de `global x` es un `SyntaxError` (*name 'x' is used prior to global declaration*).

**Modificar no es asignar.** Para cambiar el contenido de una lista o un dict global no hace falta `global`: el nombre sigue apuntando al mismo objeto.

```python
foo = []

def bar():
    foo.append(1)   # no asigna "foo": lo busca por LEGB y lo modifica

bar()
bar()
print(foo)
```

::: observacion
Que se pueda no quiere decir que convenga: PEP 8 y la cultura de Python desaconsejan abusar de `global`. Es mejor pasar los datos como argumentos y devolver resultados.
:::

## 5. Qué crea un alcance nuevo (y qué no)

**Sí crean alcance:** módulos, funciones (incluidas las `lambda`), clases y comprensiones (de lista, dict, set y generator expressions).

**No crean alcance** (al revés que en C o Java): `if`, `for`, `while`, `with`, `try`. Lo asignado adentro queda en el alcance de afuera:

```python
if True:
    dentro = "sí"
print(dentro)       # existe: el if no tiene alcance propio

for i in range(3):
    pass
print(i)            # 2: la variable del for sobrevive al bucle

[j for j in range(3)]
print(j)            # NameError: la comprensión tiene su propio alcance
```

::: ojo
**Tres casos raros que se preguntan:**

- **`except ... as e`**: al salir del bloque, Python **borra** `e`, aunque antes existiera una `e` afuera.
- **El operador `:=` dentro de una comprensión** asigna en el alcance **de afuera**, no en el de la comprensión.
- **En Python 2** la variable de una comprensión de lista se "escapaba" al alcance de afuera; en Python 3 ya no.
:::

```python
e = "foo"
try:
    1 / 0
except ZeroDivisionError as e:
    pass
print(e)        # NameError: el except borró e
```

```python
datos = [1, 5, 8]
grandes = [y for x in datos if (y := x * 2) > 4]
print(grandes, y)   # y quedó afuera, con el último valor asignado
```

## 6. El cuerpo de una clase no es "Enclosing"

Los atributos que se definen en el cuerpo de una clase **no** se ven desde sus métodos por LEGB: la búsqueda salta el cuerpo de la clase y va directo al módulo. Hay que escribir `self.x` o `Foo.x`.

```python
class Foo:
    x = 10
    def bar(self):
        return x        # NameError: no busca en el cuerpo de la clase

print(Foo().bar())
```

Lo mismo pasa con una comprensión escrita en el cuerpo de una clase: no ve los nombres de la clase.

```python
class A:
    x = 5
    ys = [x for _ in range(2)]   # NameError: name 'x' is not defined
```

## 7. Closures

Una función definida dentro de otra puede **usar las variables de la de afuera**, y las **sigue recordando** aunque la de afuera ya haya terminado. Eso es un **closure** (clausura): la función más las variables que captura (sus *variables libres*).

```python
def make_counter():
    n = 0
    def bar():
        nonlocal n      # sin esto, n += 1 da UnboundLocalError
        n += 1
        return n
    return bar

c1 = make_counter()
c2 = make_counter()
c1()
c1()
print(c1(), c2())   # cada llamada a make_counter crea un n distinto
```

Las variables capturadas quedan guardadas en "celdas", y se pueden inspeccionar:

```python
def outer():
    a = 5
    def inner():
        return a
    return inner

f = outer()
print(f.__code__.co_freevars)            # los nombres capturados
print(f.__closure__[0].cell_contents)    # sus valores
```

**Late binding.** El closure guarda **la variable**, no una copia de su valor. Lo que importa es cuánto vale **cuando se llama** a la función interna:

```python
def outer():
    x = 1
    def inner():
        return x
    x = 2               # cambia antes de que alguien llame a inner
    return inner

print(outer()())
```

::: ojo
**La trampa clásica: funciones creadas en un bucle.** Todas las `lambda` capturan **la misma** `i`, y cuando se las llama el bucle ya terminó, con `i = 2`:

```python
funcs = [lambda: i for i in range(3)]
print([f() for f in funcs])        # [2, 2, 2]

funcs = [lambda i=i: i for i in range(3)]
print([f() for f in funcs])        # [0, 1, 2]
```

La solución es un **argumento por defecto** (`i=i`): los valores por defecto se evalúan **al definir** la función, así que cada `lambda` guarda el valor de ese momento.
:::

## 8. Funciones para inspeccionar el alcance

- `globals()`: el diccionario del espacio de nombres global del módulo.
- `locals()`: los nombres locales en ese punto (dentro de una función: sus parámetros y variables).
- `dir()`: sin argumentos, los nombres del alcance actual; con un objeto, sus atributos.
- `import builtins` y `dir(builtins)`: todas las funciones de fábrica.

```python
def foo(a, b=2):
    c = 3
    print(sorted(locals()))

foo(1)
```

## Preguntas tipo examen

::: pregunta What is the output of the following code?
```python
x = "global"

def outer():
    x = "enclosing"
    def inner():
        print(x)
    inner()

outer()
```
- [ ] `global`
- [x] `enclosing`
- [ ] `None`
- [ ] It raises `NameError`
::: solucion Explicación
`inner` no tiene una `x` local, así que la busca por LEGB: el siguiente alcance es el de la función que la encierra (**E**), donde `x = "enclosing"`. Ahí la encuentra y no sigue buscando en el global.
:::
:::

::: pregunta What happens when this code runs?
```python
x = 10

def foo():
    print(x)
    x = 20

foo()
```
- [ ] It prints `10`
- [ ] It prints `20`
- [ ] It prints `10` and then rebinds the global `x` to `20`
- [x] It raises `UnboundLocalError`
::: solucion Explicación
Como `foo` **asigna** `x` (renglón `x = 20`), Python decide al compilar que `x` es **local en toda la función**. El `print(x)` intenta leer esa variable local, que todavía no tiene valor: `UnboundLocalError`. La global no se usa nunca. Se arregla con `global x` al principio de la función, o con otro nombre para la variable local.
:::
:::

::: pregunta What is the output of the following code?
```python
def make_counter():
    n = 0
    def bar():
        nonlocal n
        n += 1
        return n
    return bar

c1 = make_counter()
c2 = make_counter()
c1()
c1()
print(c1(), c2())
```
- [ ] `1 1`
- [ ] `3 4`
- [x] `3 1`
- [ ] `2 1`
::: solucion Explicación
Cada llamada a `make_counter()` crea un `n` **nuevo**, y el closure que devuelve recuerda el suyo. `c1` se llamó dos veces antes del `print` (n = 2); en el `print`, `c1()` lo lleva a 3. `c2` tiene su propio `n`, que pasa de 0 a 1.
:::
:::

::: pregunta What happens when this code is executed?
```python
x = 1

def foo():
    nonlocal x
    x = 2

foo()
print(x)
```
- [ ] It prints `2`
- [ ] It prints `1`
- [ ] It raises `UnboundLocalError` when `foo()` is called
- [x] It raises `SyntaxError`
::: solucion Explicación
`nonlocal` solo busca en las **funciones que encierran** a la actual, nunca en el alcance global. `foo` no está dentro de ninguna función, así que no hay ninguna `x` a la que referirse: *SyntaxError: no binding for nonlocal 'x' found*. Es un error **de compilación**: salta antes de ejecutar cualquier renglón, incluso antes de llamar a `foo`. Para modificar la global hacía falta `global x`.
:::
:::

::: pregunta What is the output of the following code?
```python
funcs = [lambda: i for i in range(3)]
print([f() for f in funcs])
```
- [ ] `[0, 1, 2]`
- [x] `[2, 2, 2]`
- [ ] `[0, 0, 0]`
- [ ] It raises `NameError`
::: solucion Explicación
Las tres `lambda` usan la **misma variable** `i` de la comprensión (closure), y la leen **cuando se las llama** (*late binding*). Para ese momento la comprensión ya terminó y la última `i` vale 2. No es `NameError`: aunque `i` no se vea desde afuera de la comprensión, las `lambda` la tienen capturada. La solución es `lambda i=i: i`.
:::
:::

::: pregunta What is the output of the following code?
```python
foo = []

def bar():
    foo.append(1)

bar()
bar()
print(foo)
```
- [ ] `[]`
- [ ] `[1]`
- [x] `[1, 1]`
- [ ] It raises `UnboundLocalError`
::: solucion Explicación
`bar` no **asigna** el nombre `foo`: solo llama a un método del objeto. Entonces `foo` no es local, se encuentra por LEGB en el alcance global y la lista se modifica en el lugar. No hace falta `global` para modificar un objeto mutable, solo para **reasignar** el nombre (`foo = ...`, o `foo += [1]`, que sí asigna).
:::
:::

::: pregunta Which of the following create a new scope in Python? (Select all that apply)
- [x] A function definition
- [x] A class body
- [x] A list comprehension
- [ ] An `if` block
- [ ] A `for` loop
- [ ] A `with` block
::: solucion Explicación
En Python solo crean alcance nuevo los módulos, las funciones (y `lambda`), las clases y las comprensiones. Los bloques `if`, `for`, `while`, `with` y `try` **no**: lo que se asigna adentro queda en el alcance de afuera. Por eso la variable de un `for` sigue existiendo después del bucle, pero la de una comprensión no.
:::
:::

::: pregunta What is the output of the following code?
```python
def outer():
    x = 1
    def inner():
        return x
    x = 2
    return inner

print(outer()())
```
- [ ] `1`
- [x] `2`
- [ ] `None`
- [ ] It raises `UnboundLocalError`
::: solucion Explicación
El closure no guarda el valor que tenía `x` al **definir** `inner`, sino la **variable**. Cuando por fin se llama a `inner` (con el segundo par de paréntesis), `outer` ya terminó y `x` vale 2.
:::
:::

::: pregunta What is the output of the following code?
```python
e = "foo"
try:
    1 / 0
except ZeroDivisionError as e:
    pass
print(e)
```
- [ ] `foo`
- [ ] `division by zero`
- [ ] `ZeroDivisionError`
- [x] It raises `NameError`
::: solucion Explicación
`except ... as e` **asigna** la excepción al nombre `e` (y pisa el `"foo"`). Al salir del bloque `except`, Python **borra** ese nombre: es una regla del lenguaje, para no dejar la excepción y su traceback ocupando memoria. Por eso el `print(e)` no encuentra ninguna `e`.
:::
:::

::: pregunta What happens when this code runs?
```python
class Foo:
    x = 10

    def bar(self):
        return x

print(Foo().bar())
```
- [ ] It prints `10`
- [ ] It prints `None`
- [x] It raises `NameError`
- [ ] It raises `AttributeError`
::: solucion Explicación
El cuerpo de una clase **no** cuenta como alcance *Enclosing* para sus métodos. Dentro de `bar`, la búsqueda de `x` es: local (no está) → global (no está) → built-in (no está): `NameError`. No es `AttributeError` porque no se está pidiendo un atributo de ningún objeto. Para usar el atributo de clase hay que escribir `self.x` o `Foo.x`.
:::
:::

::: pregunta In the LEGB rule, what does the letter "E" stand for?
- [ ] External
- [ ] Extended
- [x] Enclosing
- [ ] Encapsulated
::: solucion Explicación
**E**nclosing: los alcances de las funciones que encierran a la actual (en funciones anidadas). Las cuatro son **L**ocal, **E**nclosing, **G**lobal y **B**uilt-in, en ese orden de búsqueda.
:::
:::

::: pregunta What is the output of the following code?
```python
def foo():
    len = 3
    return len("abc")

print(foo())
```
- [ ] `3`
- [ ] It prints `3` and then the built-in `len` is restored
- [x] It raises `TypeError`
- [ ] It raises `UnboundLocalError`
::: solucion Explicación
Dentro de `foo`, `len` es una variable local que vale `3`, y tapa a la función de fábrica (L se busca antes que B). `len("abc")` intenta llamar a un `int`: *TypeError: 'int' object is not callable*. No es `UnboundLocalError` porque `len` ya tiene valor cuando se la usa.
:::
:::
