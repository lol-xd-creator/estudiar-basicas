# 9.1 · POO: clases, atributos y métodos mágicos

*Peso **A**: tu amigo recordó preguntas de métodos mágicos (*dunder methods*). La herencia, el MRO y `super()` están en [[9.2 · POO: herencia, MRO, super() y SOLID]]. Resultados comprobados con Python 3.14.*

::: claves
- `self` es **explícito**: es el primer parámetro de los métodos de instancia, y `obj.metodo()` es lo mismo que `Clase.metodo(obj)`.
- `__new__` **crea** el objeto; `__init__` lo **inicializa** (no es un constructor) y tiene que devolver `None`.
- Un **atributo de clase** lo comparten todas las instancias. Asignarlo a través de una instancia (`obj.x = …`) crea un atributo **de instancia** que lo tapa. Una **lista** como atributo de clase se comparte entre todas.
- `_x` es solo una **convención** ("uso interno"). `__x` (dos guiones al principio, ninguno al final) se **renombra** a `_Clase__x` (*name mangling*). En Python no hay atributos privados de verdad.
- `@classmethod` recibe la clase (`cls`); `@staticmethod` no recibe ni la clase ni la instancia.
- `print()` y `str()` usan `__str__`; si no está, usan `__repr__`. Dentro de un contenedor (`print([obj])`) se usa siempre **`__repr__`**.
- Por defecto, `==` compara **identidad**. Si definís `__eq__` y no `__hash__`, la clase deja de ser **hashable**.
- `bool(obj)` usa `__bool__`; si no está, `__len__`; si tampoco, el objeto vale como verdadero.
- Un operador que no sabe operar con el otro tipo devuelve **`NotImplemented`** (no lo lanza), y Python prueba el método reflejado (`__radd__`).
- `__slots__` impide agregar atributos que no estén en la lista. `@dataclass` genera `__init__`, `__repr__` y `__eq__`.
:::

## 1. Clase, instancia y `self`

```python
class Perro:
    especie = "canis"                  # atributo de clase

    def __init__(self, nombre):        # inicializa cada instancia
        self.nombre = nombre           # atributo de instancia

    def ladrar(self):
        return self.nombre + " dice guau"

p = Perro("Rex")
print(p.ladrar(), Perro.ladrar(p))     # las dos formas son equivalentes
print(p.especie, type(p).__name__)
print(type(Perro))                     # las clases también son objetos: de tipo type
```

- `self` no es una palabra clave: es una **convención** para el primer parámetro (PEP 8). Python pasa la instancia ahí solo, cuando se llama `obj.metodo()`.
- Si un método se define sin `self` y se lo llama desde una instancia, falla: `TypeError: Foo.bar() takes 0 positional arguments but 1 was given`.
- Las clases son objetos (instancias de `type`), y todo hereda de `object`.

**`__new__` contra `__init__`.** Al hacer `Clase(args)`, Python llama primero a `__new__(cls, …)`, que **crea** el objeto, y después a `__init__(self, …)`, que lo **inicializa**. Casi nunca hace falta redefinir `__new__` (se usa con tipos inmutables o en *singletons*).

```python
class Foo:
    def __new__(cls, *a):
        print("new")
        return super().__new__(cls)
    def __init__(self, x):
        print("init", x)

Foo(1)
```

::: ojo
**`__init__` tiene que devolver `None`.** Si devuelve otra cosa: `TypeError: __init__() should return None, not 'int'`.
:::

## 2. Atributos de clase y de instancia

Al leer `obj.x`, Python busca primero en la **instancia** (`obj.__dict__`) y, si no está, en la **clase** (y después en sus padres). Al **asignar** `obj.x = …`, siempre escribe en la instancia.

```python
class Foo:
    x = 1

a = Foo(); b = Foo()
a.x = 99              # crea un x de instancia en a, que tapa el de la clase
print(a.x, b.x, Foo.x)
Foo.x = 5             # cambiar el de la clase afecta a quien no lo tapa
print(a.x, b.x)
print(a.__dict__, b.__dict__)
```

::: ojo
**Una lista como atributo de clase la comparten todas las instancias.** `self.items.append(v)` no asigna `self.items`: lo **lee** (lo encuentra en la clase) y modifica esa lista.

```python
class Foo:
    items = []                 # una sola lista, de la clase
    def add(self, v):
        self.items.append(v)

a = Foo(); b = Foo()
a.add(1); b.add(2)
print(a.items, b.items, Foo.items)
```

La solución: crear la lista en `__init__` (`self.items = []`), una por instancia.
:::

**El contador con `self` en lugar de la clase.** `self.cantidad += 1` lee el atributo de clase y **asigna** el resultado en la instancia: el de la clase no cambia.

```python
class Foo:
    cantidad = 0
    def __init__(self):
        self.cantidad += 1     # crea un atributo de instancia: Foo.cantidad sigue en 0

a = Foo(); b = Foo()
print(Foo.cantidad, a.cantidad, b.cantidad)
```

Para contar instancias hay que escribir `Foo.cantidad += 1`.

**Atributos dinámicos.** A una instancia se le pueden agregar atributos en cualquier momento (salvo que use `__slots__`). Las funciones `getattr`, `setattr`, `hasattr` y `delattr` trabajan con el nombre como string.

```python
class Foo:
    pass

f = Foo()
f.nuevo = 1
print(vars(f), getattr(f, "nada", "por defecto"), hasattr(f, "nuevo"))
```

## 3. Visibilidad: `_x`, `__x` y `__x__`

| Nombre | Qué significa |
|---|---|
| `x` | público |
| `_x` | **convención**: "uso interno, no lo toques desde afuera". Python no lo impide. `from módulo import *` no importa los nombres que empiezan con `_`. |
| `__x` | ***name mangling***: Python lo renombra a `_Clase__x`, para que una subclase no lo pise por accidente. Tampoco es privado: se puede acceder como `obj._Clase__x`. |
| `__x__` | nombres especiales de Python (*dunder*): **no** se renombran. No hay que inventar nombres nuevos con esta forma. |

```python
class Foo:
    def __init__(self):
        self._prot = 1
        self.__priv = 2
        self.__dunder__ = 3

f = Foo()
print(sorted(vars(f)))      # __priv quedó guardado como _Foo__priv
print(f._Foo__priv)
print(f.__priv)             # AttributeError
```

::: observacion
"Somos todos adultos responsables" (*we are all consenting adults*): la cultura de Python confía en las convenciones en lugar de prohibir.
:::

## 4. Métodos de instancia, de clase y estáticos

| | Primer parámetro | Se usa para |
|---|---|---|
| método de instancia | `self` (la instancia) | trabajar con los datos de un objeto |
| `@classmethod` | `cls` (la clase) | constructores alternativos (`Fecha.desde_texto("9/10")`); funciona bien con herencia (`cls` es la subclase) |
| `@staticmethod` | ninguno | una función común que tiene sentido agrupar en la clase |

```python
class Foo:
    def inst(self):
        return "inst", type(self).__name__
    @classmethod
    def cm(cls):
        return "cm", cls.__name__
    @staticmethod
    def sm(x):
        return "sm", x

print(Foo().inst(), Foo.cm(), Foo().cm(), Foo.sm(1))
print(Foo.inst())        # TypeError: falta self
```

Los de clase y los estáticos se pueden llamar desde la clase **o** desde una instancia.

**`@property`**: un método que se usa como si fuera un atributo, para calcular un valor o validar al asignar. Si no tiene *setter*, es de solo lectura.

```python
class Celsius:
    def __init__(self, t):
        self._t = t
    @property
    def t(self):
        return self._t
    @t.setter
    def t(self, v):
        if v < -273.15:
            raise ValueError("imposible")
        self._t = v
    @property
    def f(self):
        return self._t * 9 / 5 + 32

c = Celsius(10)
c.t = 20                 # pasa por el setter
print(c.t, c.f)          # sin paréntesis
c.f = 100                # AttributeError: no tiene setter
```

## 5. Métodos mágicos (*dunder methods*)

Son los métodos con dos guiones bajos a cada lado (de *double underscore*). Python los llama solo cuando se usa una operación: `len(x)` llama a `x.__len__()`, `a + b` a `a.__add__(b)`, y así.

| Método | Se usa en |
|---|---|
| `__init__`, `__new__`, `__del__` | crear, inicializar y liberar el objeto |
| `__str__` / `__repr__` | `str()`, `print()` / `repr()`, la consola, los contenedores |
| `__eq__`, `__lt__`, `__le__`, … | `==`, `<`, `<=`, … |
| `__hash__` | `hash()`, claves de dict, elementos de set |
| `__len__`, `__bool__` | `len()`, `bool()`, `if obj:` |
| `__getitem__`, `__setitem__`, `__contains__` | `obj[i]`, `obj[i] = v`, `x in obj` |
| `__iter__`, `__next__` | `for`, `list()`, desempaquetado (unidad 8) |
| `__call__` | `obj()`: llamar al objeto como si fuera una función |
| `__add__`, `__radd__`, `__iadd__`, … | `a + b`, `b + a` cuando `b` no sabe, `a += b` |
| `__enter__`, `__exit__` | `with` (unidad 10) |
| `__getattr__` | cuando se pide un atributo que **no existe** |

### `__str__` contra `__repr__`

- `__repr__`: la representación **para el programador**, sin ambigüedad. Idealmente, código que recrearía el objeto (`P(1)`).
- `__str__`: la representación **legible para el usuario**.
- `print(obj)`, `str(obj)` y `f"{obj}"` usan `__str__`; si no está definido, usan `__repr__`. Al revés **no**: `repr()` nunca usa `__str__`.
- Los contenedores muestran a sus elementos con **`__repr__`**: `print([obj])`.

```python
class P:
    def __init__(self, x):
        self.x = x
    def __repr__(self):
        return f"P({self.x})"
    def __str__(self):
        return f"punto {self.x}"

p = P(1)
print(p)
print(repr(p), f"{p!r}")
print([p])               # dentro de una lista: __repr__
```

### `__eq__` y `__hash__`

```python
class A:
    def __init__(self, x):
        self.x = x

print(A(1) == A(1))      # False: por defecto compara identidad
```

::: ojo
**Si definís `__eq__`, Python pone `__hash__ = None`**: la clase deja de ser hashable (no puede ir en un set ni ser clave de un dict). Es para que dos objetos iguales no puedan tener hashes distintos. Si la querés hashable, definí también `__hash__`, a partir de los mismos datos que comparás.

```python
class A:
    def __init__(self, x):
        self.x = x
    def __eq__(self, o):
        return isinstance(o, A) and self.x == o.x

print(A(1) == A(1), A.__hash__)
{A(1)}                   # TypeError: unhashable type: 'A'
```
:::

### Valor de verdad, contenedores y llamadas

```python
class Caja:
    def __init__(self, n):
        self.n = n
    def __len__(self):
        return self.n

print(bool(Caja(0)), bool(Caja(3)))   # sin __bool__, usa __len__

class Vacia:
    pass
print(bool(Vacia()))                  # sin ninguno de los dos: verdadero
```

```python
class Serie:
    def __getitem__(self, i):          # con __getitem__ ya se puede iterar
        if i >= 3:
            raise IndexError
        return i * 10

s = Serie()
print(s[1], list(s), 20 in s)          # in también funciona, recorriendo
```

```python
class Contador:
    def __init__(self):
        self.n = 0
    def __call__(self):                # el objeto se puede llamar
        self.n += 1
        return self.n

c = Contador()
c(); c()
print(c(), callable(c))
```

### Operadores: `__add__`, `__radd__` y `NotImplemented`

```python
class V:
    def __init__(self, x):
        self.x = x
    def __add__(self, o):
        if isinstance(o, V):
            return V(self.x + o.x)
        if isinstance(o, int):
            return V(self.x + o)
        return NotImplemented      # "no sé sumar esto": que pruebe el otro
    def __radd__(self, o):         # para 5 + V(1): int no sabe, prueba V.__radd__
        return self.__add__(o)
    def __repr__(self):
        return f"V({self.x})"

print(V(1) + V(2), V(1) + 5, 5 + V(1))
print(sum([V(1), V(2)]))           # sum arranca en 0: necesita __radd__
print(V(1) + "a")                  # los dos devuelven NotImplemented: TypeError
```

::: observacion
`NotImplemented` (un valor que se **devuelve**) no es lo mismo que `NotImplementedError` (una excepción que se **lanza**, por ejemplo en un método que una subclase tiene que completar).
:::

**Comparaciones:** si se define `__lt__`, `sorted()` ya funciona y `a > b` se resuelve con el reflejado (`b < a`). Pero `<=` necesita `__le__` (o `functools.total_ordering`, que completa los que faltan).

## 6. `__slots__` y `@dataclass`

**`__slots__`** fija la lista de atributos permitidos: las instancias no tienen `__dict__` (ocupan menos memoria) y no se les pueden agregar otros atributos.

```python
class P:
    __slots__ = ("x", "y")

p = P()
p.x = 1
print(hasattr(p, "__dict__"))
p.z = 3                  # AttributeError
```

**`@dataclass`** (módulo `dataclasses`, Python 3.7) genera `__init__`, `__repr__` y `__eq__` a partir de los campos anotados:

```python
from dataclasses import dataclass, field

@dataclass
class P:
    x: int
    y: int = 0
    tags: list = field(default_factory=list)   # un [] directo da ValueError

print(P(1), P(1) == P(1))

@dataclass(frozen=True)          # inmutable, y por eso hashable
class F:
    a: int

f = F(1)
f.a = 2                          # FrozenInstanceError
```

Un valor por defecto mutable (`tags: list = []`) da `ValueError` al definir la clase: la dataclass evita así la trampa del `def foo(x=[])`.

## 7. Duck typing

"Si camina como pato y hace cuac como pato, es un pato." En Python no se pregunta el **tipo** de un objeto, sino si tiene los **métodos** que se necesitan:

```python
class Pato:
    def sonido(self):
        return "cuac"

class Robot:
    def sonido(self):
        return "bip"

for x in (Pato(), Robot()):      # no comparten ninguna clase padre
    print(x.sonido())
```

Por eso un objeto propio con `__iter__` funciona en un `for`, y uno con `__len__`, en `len()`.

## Preguntas tipo examen

::: pregunta What is the output of the following code?
```python
class Foo:
    items = []

    def add(self, v):
        self.items.append(v)

a = Foo()
b = Foo()
a.add(1)
b.add(2)
print(a.items, b.items)
```
- [ ] `[1] [2]`
- [x] `[1, 2] [1, 2]`
- [ ] `[1] [1, 2]`
- [ ] It raises `AttributeError`
::: solucion Explicación
`items` es un atributo **de clase**: hay una sola lista, compartida por todas las instancias. `self.items.append(v)` no asigna `self.items`, así que no crea un atributo de instancia: encuentra la lista en la clase y la modifica. Para una lista por instancia, hay que crearla en `__init__`.
:::
:::

::: pregunta What is the output of the following code?
```python
class Foo:
    x = 1

a = Foo()
b = Foo()
a.x = 99
Foo.x = 5
print(a.x, b.x)
```
- [ ] `99 99`
- [ ] `5 5`
- [x] `99 5`
- [ ] `99 1`
::: solucion Explicación
`a.x = 99` crea un atributo **de instancia** en `a`, que tapa al de la clase. `b` no tiene uno propio, así que sigue leyendo el de la clase, que pasó a valer 5. Al leer un atributo, Python busca primero en la instancia y después en la clase.
:::
:::

::: pregunta What happens when this code runs?
```python
class Foo:
    def __init__(self):
        self.__secret = 42

f = Foo()
print(f.__secret)
```
- [ ] It prints `42`
- [x] It raises `AttributeError`
- [ ] It raises `PermissionError` because the attribute is private
- [ ] It prints `None`
::: solucion Explicación
Un nombre con dos guiones bajos al principio dentro de una clase se **renombra** (*name mangling*): queda guardado como `_Foo__secret`. Por eso `f.__secret` no existe. No es un error de permisos: en Python no hay privados de verdad, y `f._Foo__secret` devuelve 42.
:::
:::

::: pregunta What is the output of the following code?
```python
class P:
    def __repr__(self):
        return "repr"

    def __str__(self):
        return "str"

p = P()
print(p, [p])
```
- [ ] `repr [repr]`
- [ ] `str [str]`
- [x] `str [repr]`
- [ ] `repr [str]`
::: solucion Explicación
`print(p)` usa `__str__`. Pero una lista, al convertirse en texto, muestra a sus elementos con `__repr__`. Si solo estuviera definido `__repr__`, los dos casos mostrarían `repr`.
:::
:::

::: pregunta What happens when this code runs?
```python
class A:
    def __init__(self, x):
        self.x = x

    def __eq__(self, other):
        return self.x == other.x

s = {A(1), A(2)}
```
- [ ] `s` is a set with two elements
- [ ] `s` is a set with one element
- [x] It raises `TypeError`
- [ ] It raises `AttributeError`
::: solucion Explicación
Al definir `__eq__` sin `__hash__`, Python pone `__hash__ = None`: los objetos dejan de ser **hashables** y no pueden ir en un set (*TypeError: unhashable type: 'A'*). Para que funcione hay que definir también `__hash__` (por ejemplo, `return hash(self.x)`).
:::
:::

::: pregunta What is the output of the following code?
```python
class A:
    def __init__(self, x):
        self.x = x

print(A(1) == A(1))
```
- [ ] `True`
- [x] `False`
- [ ] It raises `TypeError`
- [ ] It raises `NotImplementedError`
::: solucion Explicación
Si una clase no define `__eq__`, hereda el de `object`, que compara **identidad**: son dos objetos distintos, aunque tengan el mismo `x`.
:::
:::

::: pregunta What is the output of the following code?
```python
class Foo:
    count = 0

    def __init__(self):
        self.count += 1

a = Foo()
b = Foo()
print(Foo.count, a.count, b.count)
```
- [ ] `2 2 2`
- [ ] `2 1 2`
- [x] `0 1 1`
- [ ] It raises `UnboundLocalError`
::: solucion Explicación
`self.count += 1` es `self.count = self.count + 1`: **lee** `count` (lo encuentra en la clase, vale 0) y **asigna** 1 en la **instancia**. El atributo de clase nunca cambia. Para contar instancias había que escribir `Foo.count += 1`.
:::
:::

::: pregunta Which statement about `@staticmethod` and `@classmethod` is TRUE?
- [ ] Both receive the instance as their first argument
- [x] A class method receives the class as its first argument; a static method receives neither the class nor the instance
- [ ] A static method can only be called on the class, not on an instance
- [ ] A class method cannot be called on an instance
::: solucion Explicación
`@classmethod` recibe la clase (por convención, `cls`) y sirve, por ejemplo, para constructores alternativos. `@staticmethod` no recibe nada automáticamente: es una función común agrupada en la clase. Los dos se pueden llamar desde la clase o desde una instancia.
:::
:::

::: pregunta What is the output of the following code?
```python
class Box:
    def __init__(self, n):
        self.n = n

    def __len__(self):
        return self.n

print(bool(Box(0)), bool(Box(3)))
```
- [ ] `True True`
- [x] `False True`
- [ ] `False False`
- [ ] It raises `TypeError` because `__bool__` is not defined
::: solucion Explicación
Para el valor de verdad, Python busca `__bool__`; si no está, usa `__len__` (largo 0 es falso). Si no hubiera ninguno de los dos, cualquier objeto valdría como verdadero.
:::
:::

::: pregunta What happens when this code runs?
```python
class Foo:
    def __init__(self):
        return 5

f = Foo()
```
- [ ] `f` is `5`
- [ ] `f` is a `Foo` instance, and the `5` is ignored
- [x] It raises `TypeError`
- [ ] It raises `SyntaxError`
::: solucion Explicación
`__init__` inicializa un objeto que ya creó `__new__`, y **tiene que devolver `None`**. Si devuelve otra cosa: *TypeError: \_\_init\_\_() should return None, not 'int'*. No es un error de sintaxis: salta al ejecutar `Foo()`.
:::
:::

::: pregunta What does a binary operator method like `__add__` return when it does not support the type of the other operand?
- [ ] It raises `NotImplementedError`
- [x] It returns `NotImplemented`, so Python can try the reflected method of the other operand
- [ ] It returns `None`
- [ ] It returns `False`
::: solucion Explicación
Devuelve el valor especial `NotImplemented`. Entonces Python prueba el método reflejado del otro operando (`__radd__`), y si ese también devuelve `NotImplemented`, recién ahí lanza `TypeError`. `NotImplementedError` es otra cosa: una excepción para los métodos que una subclase tiene que implementar.
:::
:::

::: pregunta What happens when this code runs?
```python
class P:
    __slots__ = ("x",)

p = P()
p.x = 1
p.y = 2
```
- [ ] `p` ends up with attributes `x` and `y`
- [x] It raises `AttributeError` at `p.y = 2`
- [ ] It raises `TypeError` at `p.x = 1`
- [ ] It raises `SyntaxError`
::: solucion Explicación
`__slots__` fija los únicos atributos que pueden tener las instancias, y les saca el `__dict__`. `x` está permitido; `y` no, así que asignarlo da `AttributeError`.
:::
:::
