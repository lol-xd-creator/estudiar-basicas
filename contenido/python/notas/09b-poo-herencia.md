# 9.2 · POO: herencia, MRO, super() y SOLID

*Peso **A**: tu amigo recordó preguntas del MRO (*Method Resolution Order*) en herencia múltiple y de `super()`. SOLID aparece en el reporte del examen de EPAM en Bakú (peso **B**). Viene de [[9.1 · POO: clases, atributos y métodos mágicos]]. Resultados comprobados con Python 3.14.*

::: claves
- Una subclase **hereda** los métodos y atributos de clase del padre, y puede **redefinirlos** (*override*). Si redefine `__init__` y no llama a `super().__init__(...)`, los atributos que crea el padre **no existen**.
- `isinstance(obj, Clase)` acepta **subclases**; `type(obj) == Clase`, no. Todas las clases heredan de `object`, y `bool` es subclase de `int`.
- El **MRO** es el orden en que Python busca un método: `Clase.__mro__` o `Clase.mro()`. Se calcula con la **linealización C3**: la clase primero, los hijos antes que los padres, y los padres **en el orden en que se escribieron**.
- En el **diamante** (`D(B, C)`, y `B` y `C` heredan de `A`), el MRO es `D, B, C, A, object`: `A` aparece **una sola vez**, al final.
- **`super()` no llama "a la clase padre":** llama a la **siguiente clase en el MRO del objeto**. En un diamante, el `super()` de `B` puede llevar a `C`.
- Si no se puede armar un MRO coherente: `TypeError: Cannot create a consistent method resolution order (MRO)`.
- Python **no tiene sobrecarga de métodos**: si hay dos `def` con el mismo nombre, el último pisa al primero.
- Una clase con `@abstractmethod` (heredando de `ABC`) **no se puede instanciar** hasta que una subclase implemente todos los métodos abstractos.
- **SOLID:** **S**ingle responsibility, **O**pen/closed, **L**iskov substitution, **I**nterface segregation, **D**ependency inversion.
:::

## 1. Herencia y redefinición

```python
class Animal:
    def __init__(self, nombre):
        self.nombre = nombre
    def hablar(self):
        return "..."
    def presentarse(self):
        return f"{self.nombre}: {self.hablar()}"

class Perro(Animal):            # Perro hereda de Animal
    def hablar(self):           # redefine (override) hablar
        return "guau"

print(Perro("Rex").presentarse())   # presentarse es de Animal, pero llama al hablar de Perro
print(Animal("X").presentarse())
```

`presentarse` está escrito en `Animal`, pero `self.hablar()` busca el método **en el objeto real**, que es un `Perro`. Eso es **polimorfismo**: el mismo código hace cosas distintas según el tipo del objeto.

**Si la subclase no define `__init__`, hereda el del padre** (con sus parámetros obligatorios). **Si lo define**, reemplaza al del padre, y hay que llamarlo a mano con `super()`:

```python
class A:
    def __init__(self):
        self.x = 1

class B(A):
    def __init__(self):
        self.y = 2              # no llama a super().__init__()

b = B()
print(b.y)
print(b.x)                      # AttributeError: el __init__ de A nunca corrió
```

```python
class A:
    def __init__(self, x):
        self.x = x

class B(A):
    def __init__(self, x, y):
        super().__init__(x)     # que A inicialice su parte
        self.y = y

b = B(1, 2)
print(b.x, b.y)
```

::: observacion
En Python 3 alcanza con `super()`. En Python 2 había que escribir `super(B, self)`, que en Python 3 sigue funcionando.
:::

**Los "privados" con `__` no se ven desde la subclase:** `self.__x` en `B` se renombra a `self._B__x`, pero el padre lo guardó como `_A__x`.

```python
class A:
    def __init__(self):
        self.__x = 1

class B(A):
    def ver(self):
        return self.__x         # busca _B__x

B().ver()                       # AttributeError: 'B' object has no attribute '_B__x'
```

## 2. `isinstance`, `type` e `issubclass`

```python
class A: pass
class B(A): pass

b = B()
print(isinstance(b, A), type(b) == A, type(b) is B)
print(issubclass(B, A), issubclass(A, B), issubclass(B, object))
print(isinstance(True, int), isinstance(1, (str, int)))   # una tupla de tipos: "alguno de estos"
```

- `isinstance` respeta la herencia (un `B` **es un** `A`); `type(x) == A` exige el tipo exacto. Por eso se prefiere `isinstance`.
- Todas las clases heredan de **`object`** (en Python 3, `class A:` es lo mismo que `class A(object):`).
- `bool` hereda de `int`: `isinstance(True, int)` es `True`.

## 3. Herencia múltiple y MRO

Una clase puede heredar de varias: `class D(B, C)`. Cuando se pide un método, Python lo busca en las clases según el **MRO** (*Method Resolution Order*) y usa **el primero** que encuentra.

**El problema del diamante:**

```python
class A:
    def hola(self):
        return "A"

class B(A):
    def hola(self):
        return "B"

class C(A):
    def hola(self):
        return "C"

class D(B, C):
    pass

print(D().hola())
print([k.__name__ for k in D.__mro__])

class E(C, B):          # el orden de los padres cambia el resultado
    pass

print(E().hola())
```

**Cómo se arma el MRO (linealización C3)**, en la práctica:

1. La clase va primero.
2. Una clase va **antes que sus padres**.
3. Los padres se respetan **en el orden en que se escribieron** (`D(B, C)`: `B` antes que `C`).
4. Cada clase aparece **una sola vez**: en el diamante, `A` va recién después de `B` **y** de `C`, porque las dos la tienen como padre.

Si `B` no define `hola`, el MRO sigue igual (`D, B, C, A`) y se usa el de `C`, no el de `A`: ¡`C` va antes que `A`!

```python
class A:
    def hola(self):
        return "A"
class B(A):
    pass                # no define hola
class C(A):
    def hola(self):
        return "C"
class D(B, C):
    pass

print(D().hola())
```

**Un ejemplo más grande**, para practicar el orden:

```python
class O: pass
class A(O): pass
class B(O): pass
class C(O): pass
class D(A, B): pass
class E(B, C): pass
class F(D, E): pass

print([k.__name__ for k in F.__mro__])
```

::: ojo
**Cuándo no hay MRO posible.** Si dos clases piden órdenes contradictorios, Python no puede cumplir las reglas y lo rechaza **al definir la clase**:

```python
class A: pass
class B: pass
class X(A, B): pass     # X quiere A antes que B
class Y(B, A): pass     # Y quiere B antes que A
class Z(X, Y): pass     # TypeError: Cannot create a consistent method resolution order (MRO)
```

Pasa lo mismo con `class C(object, A)`: `object` tiene que ir después de `A`, que hereda de él. Y `class B(A, A)` da `TypeError: duplicate base class A`.
:::

## 4. `super()` sigue el MRO

`super()` no significa "la clase padre": significa **"la siguiente clase en el MRO del objeto que se está usando"**. Si todas las clases llaman a `super()` (herencia **cooperativa**), cada método se ejecuta **una vez**, en el orden del MRO:

```python
class A:
    def go(self):
        print("A")

class B(A):
    def go(self):
        print("B")
        super().go()

class C(A):
    def go(self):
        print("C")
        super().go()

class D(B, C):
    def go(self):
        print("D")
        super().go()

D().go()        # D, B, C, A: el super() de B lleva a C
```

::: ojo
**El mismo `super()` lleva a lugares distintos según el objeto.** Dentro de `B`, `super().go()` llama a `C.go` si el objeto es un `D` (porque en el MRO de `D`, después de `B` viene `C`), pero a `A.go` si el objeto es un `B`:

```python
class A:
    def go(self):
        return "A"
class B(A):
    def go(self):
        return "B>" + super().go()
class C(A):
    def go(self):
        return "C>" + super().go()
class D(B, C):
    pass

print(D().go(), B().go())
```
:::

Llamar a los padres **por su nombre** (`A.__init__(self)`) en lugar de usar `super()` rompe la cooperación: en un diamante, `A` termina inicializándose **dos veces**.

```python
class A:
    def __init__(self):
        print("A.init")
class B(A):
    def __init__(self):
        print("B.init")
        A.__init__(self)
class C(A):
    def __init__(self):
        print("C.init")
        A.__init__(self)
class D(B, C):
    def __init__(self):
        B.__init__(self)
        C.__init__(self)

D()             # A.init aparece dos veces
```

## 5. Sin sobrecarga de métodos

Python no elige un método según la cantidad o el tipo de los argumentos: un segundo `def` con el mismo nombre **reemplaza** al primero (es una asignación más). Para aceptar distintas formas de llamar se usan valores por defecto, `*args` o `**kwargs`.

```python
class Foo:
    def bar(self, x):
        return "uno"
    def bar(self, x, y):     # pisa al anterior
        return "dos"

print(Foo().bar(1, 2))
Foo().bar(1)                 # TypeError: falta y
```

## 6. Clases abstractas

Una clase abstracta define **qué métodos** tienen que tener sus subclases, sin implementarlos. Se arma heredando de `abc.ABC` y marcando los métodos con `@abstractmethod`:

```python
from abc import ABC, abstractmethod

class Figura(ABC):
    @abstractmethod
    def area(self):
        ...
    def describir(self):                 # un método común, que se hereda
        return f"área {self.area()}"

class Cuadrado(Figura):
    def __init__(self, l):
        self.l = l
    def area(self):                      # implementa el abstracto
        return self.l ** 2

print(Cuadrado(3).describir())
Figura()     # TypeError: Can't instantiate abstract class Figura ...
```

- No se puede instanciar la clase abstracta, **ni una subclase que no implemente todos** los métodos abstractos.
- El error salta **al crear el objeto**, no al definir la clase.

## 7. Los cuatro pilares de la POO

| Pilar | En Python |
|---|---|
| **Encapsulamiento** | agrupar datos y métodos en una clase, y ocultar los detalles internos: por convención (`_x`), *name mangling* (`__x`) y `@property` |
| **Abstracción** | mostrar solo lo esencial: clases abstractas (`ABC`), interfaces simples |
| **Herencia** | reutilizar y especializar: `class Perro(Animal)`, `super()`, herencia múltiple |
| **Polimorfismo** | el mismo código sirve para objetos de distintos tipos: redefinición de métodos y *duck typing* |

## 8. SOLID

Cinco principios de diseño orientado a objetos (Robert C. Martin):

| Letra | Principio | Idea |
|---|---|---|
| **S** | *Single responsibility* (responsabilidad única) | una clase debería tener **una sola razón para cambiar**: una sola responsabilidad |
| **O** | *Open/closed* (abierto/cerrado) | **abierto a la extensión, cerrado a la modificación**: agregar comportamiento con clases nuevas (subclases, polimorfismo), sin tocar el código que ya anda |
| **L** | *Liskov substitution* (sustitución de Liskov) | un objeto de una subclase tiene que poder **reemplazar** a uno de la clase padre **sin romper** el programa |
| **I** | *Interface segregation* (segregación de interfaces) | mejor varias interfaces **chicas y específicas** que una grande: nadie debería depender de métodos que no usa |
| **D** | *Dependency inversion* (inversión de dependencias) | depender de **abstracciones**, no de implementaciones concretas: los módulos de alto nivel no dependen de los de bajo nivel |

**El ejemplo clásico de una violación de Liskov:** un `Cuadrado` que hereda de `Rectangulo`. Matemáticamente "un cuadrado es un rectángulo", pero si cambiar el ancho de un cuadrado también cambia el alto, una función pensada para rectángulos deja de funcionar:

```python
class Rect:
    def __init__(self, w, h):
        self.w, self.h = w, h
    def set_w(self, w):
        self.w = w
    def area(self):
        return self.w * self.h

class Cuadrado(Rect):
    def __init__(self, l):
        super().__init__(l, l)
    def set_w(self, w):
        self.w = self.h = w     # para seguir siendo cuadrado, cambia los dos

def agrandar(r):                # espera que solo cambie el ancho
    r.set_w(5)
    return r.area()

print(agrandar(Rect(2, 3)), agrandar(Cuadrado(3)))   # 5·3 = 15 y… 5·5 = 25
```

::: observacion
**Cómo reconocer cada principio en una pregunta:**
- "Una clase hace demasiadas cosas (calcula, guarda en la base y manda mails)": **S**.
- "Para agregar un tipo nuevo hay que agregar otro `elif` en una función que ya existe": viola **O**.
- "Una subclase lanza `NotImplementedError` en un método heredado" o "cambia lo que el método promete": viola **L**.
- "Una interfaz obliga a implementar métodos que no tienen sentido para esa clase": viola **I**.
- "Una clase crea adentro el objeto concreto que usa, en lugar de recibir una abstracción": viola **D**.
:::

## Preguntas tipo examen

::: pregunta What is the output of the following code?
```python
class A:
    def hello(self):
        return "A"

class B(A):
    def hello(self):
        return "B"

class C(A):
    def hello(self):
        return "C"

class D(B, C):
    pass

print(D().hello())
```
- [ ] `A`
- [x] `B`
- [ ] `C`
- [ ] It raises `TypeError` because of the diamond
::: solucion Explicación
El MRO de `D` es `D, B, C, A, object`. `D` no define `hello`, así que se busca en el siguiente: `B`, que sí lo tiene. Los padres se recorren en el orden en que se escribieron (`B` antes que `C`). El diamante no es un error en Python: el MRO lo resuelve.
:::
:::

::: pregunta What is the output of the following code?
```python
class A:
    def hello(self):
        return "A"

class B(A):
    pass

class C(A):
    def hello(self):
        return "C"

class D(B, C):
    pass

print(D().hello())
```
- [ ] `A`
- [ ] `B`
- [x] `C`
- [ ] It raises `AttributeError`
::: solucion Explicación
El MRO es `D, B, C, A, object`: en la linealización C3, `A` va recién después de **todas** sus subclases (`B` y `C`). Como `B` no define `hello`, el siguiente en el MRO es `C`, que sí. Una búsqueda "en profundidad" (`D, B, A`) daría `A`, y es la trampa de la pregunta.
:::
:::

::: pregunta What is the output of the following code?
```python
class A:
    def go(self):
        print("A", end=" ")

class B(A):
    def go(self):
        print("B", end=" ")
        super().go()

class C(A):
    def go(self):
        print("C", end=" ")
        super().go()

class D(B, C):
    def go(self):
        print("D", end=" ")
        super().go()

D().go()
```
- [ ] `D B A`
- [ ] `D B A C A`
- [x] `D B C A`
- [ ] `D C B A`
::: solucion Explicación
`super()` llama a la **siguiente clase en el MRO del objeto**, y el objeto es un `D`, con MRO `D, B, C, A`. Por eso el `super()` de `B` no va a `A` sino a `C`. Como todos colaboran llamando a `super()`, cada método se ejecuta **una sola vez**, y `A` al final.
:::
:::

::: pregunta What is the output of the following code?
```python
class A:
    def go(self):
        return "A"

class B(A):
    def go(self):
        return "B>" + super().go()

class C(A):
    def go(self):
        return "C>" + super().go()

class D(B, C):
    pass

print(B().go(), D().go())
```
- [ ] `B>A B>A`
- [x] `B>A B>C>A`
- [ ] `B>C>A B>C>A`
- [ ] `B>A B>A>C`
::: solucion Explicación
Es el **mismo** método `B.go`, pero su `super()` depende del objeto. Con un `B` (MRO `B, A`), lo que sigue a `B` es `A`. Con un `D` (MRO `D, B, C, A`), lo que sigue a `B` es `C`, y el `super()` de `C` lleva a `A`.
:::
:::

::: pregunta What happens when this code runs?
```python
class A: pass
class B: pass
class X(A, B): pass
class Y(B, A): pass
class Z(X, Y): pass
```
- [ ] `Z` is created with MRO `Z, X, Y, A, B, object`
- [ ] `Z` is created with MRO `Z, X, A, Y, B, object`
- [x] It raises `TypeError` when `Z` is defined
- [ ] It raises `TypeError` only when an instance of `Z` is created
::: solucion Explicación
`X` exige que `A` vaya antes que `B`, y `Y` exige lo contrario. No hay ningún orden que cumpla las dos cosas, así que la linealización C3 falla: *TypeError: Cannot create a consistent method resolution order (MRO)*. El error salta **al definir** la clase `Z`.
:::
:::

::: pregunta What happens when this code runs?
```python
class A:
    def __init__(self):
        self.x = 1

class B(A):
    def __init__(self):
        self.y = 2

b = B()
print(b.x)
```
- [ ] It prints `1`
- [ ] It prints `None`
- [x] It raises `AttributeError`
- [ ] It raises `TypeError`
::: solucion Explicación
`B` redefine `__init__` y no llama a `super().__init__()`, así que el `__init__` de `A` nunca se ejecuta y `self.x` no se crea. Heredar no ejecuta automáticamente el inicializador del padre si la subclase tiene el suyo.
:::
:::

::: pregunta What is the output of the following code?
```python
class A: pass
class B(A): pass

b = B()
print(isinstance(b, A), type(b) == A)
```
- [ ] `True True`
- [x] `True False`
- [ ] `False False`
- [ ] `False True`
::: solucion Explicación
`isinstance` tiene en cuenta la herencia: un `B` también **es un** `A`. `type(b)` devuelve el tipo exacto, `B`, que no es igual a `A`.
:::
:::

::: pregunta What is the output of the following code?
```python
class Foo:
    def bar(self, x):
        return "one"

    def bar(self, x, y):
        return "two"

print(Foo().bar(1))
```
- [ ] `one`
- [ ] `two`
- [x] It raises `TypeError`
- [ ] It raises `SyntaxError`
::: solucion Explicación
Python **no tiene sobrecarga de métodos**: el segundo `def bar` reemplaza al primero, que deja de existir. El único `bar` pide dos argumentos (además de `self`), y se le pasa uno: *TypeError: missing 1 required positional argument: 'y'*.
:::
:::

::: pregunta What happens when this code runs?
```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Square(Shape):
    pass

s = Square()
```
- [ ] `s` is a `Square` instance, and `s.area()` returns `None`
- [x] It raises `TypeError` when creating `Square()`
- [ ] It raises `TypeError` when defining the class `Square`
- [ ] It raises `NotImplementedError`
::: solucion Explicación
`Square` hereda el método abstracto `area` y no lo implementa, así que sigue siendo abstracta: no se puede instanciar. El error salta **al crear el objeto**, no al definir la clase: *TypeError: Can't instantiate abstract class Square without an implementation for abstract method 'area'*.
:::
:::

::: pregunta Which SOLID principle states that objects of a subclass should be able to replace objects of the base class without breaking the program?
- [ ] Single responsibility principle
- [ ] Open/closed principle
- [x] Liskov substitution principle
- [ ] Dependency inversion principle
::: solucion Explicación
Es el principio de **sustitución de Liskov** (la L). El ejemplo clásico de violación es un `Cuadrado` que hereda de `Rectangulo` y cambia el alto al cambiar el ancho: una función que esperaba un rectángulo deja de funcionar bien.
:::
:::

::: pregunta "Software entities should be open for extension, but closed for modification." Which SOLID principle is this?
- [ ] Single responsibility principle
- [x] Open/closed principle
- [ ] Interface segregation principle
- [ ] Liskov substitution principle
::: solucion Explicación
Es el principio **abierto/cerrado** (la O): agregar comportamiento nuevo con código nuevo (por ejemplo, una subclase que redefine un método) en lugar de modificar el que ya funciona (por ejemplo, agregando otro `elif`).
:::
:::

::: pregunta Which statement about `super()` in Python 3 is TRUE?
- [ ] It always calls the method of the class written first in the class definition's list of bases
- [ ] It can only be used in `__init__`
- [x] It calls the next class in the method resolution order (MRO) of the instance's class
- [ ] It requires two arguments: `super(ClassName, self)`
::: solucion Explicación
`super()` devuelve un objeto que busca a partir de la **siguiente clase en el MRO** del objeto. Se puede usar en cualquier método, no solo en `__init__`. En Python 3 va sin argumentos: la forma con dos (`super(B, self)`) es la de Python 2, que todavía funciona pero no es obligatoria.
:::
:::
