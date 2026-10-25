# 10 · Excepciones y context managers

*Peso **B**: no estaba en lo que recordó tu amigo, pero las preguntas de "¿qué imprime?" con `try`/`finally` son clásicas. Que `except ... as e` borra la variable está en [[6 · Alcance, regla LEGB y closures]]. Resultados comprobados con Python 3.14.*

::: claves
- **Orden:** `try` → (si hubo una excepción que coincide) `except` → (si **no** hubo excepción) `else` → **siempre** `finally`.
- **`finally` se ejecuta siempre**: también si el `try` hace `return`, `break` o lanza una excepción que nadie captura.
- Un **`return` dentro de `finally`** pisa el `return` del `try` y **se traga** la excepción que estuviera en curso. (Python 3.14 avisa con un `SyntaxWarning`.)
- El valor de `return x` se calcula **antes** de correr el `finally`: cambiar `x` en el `finally` no cambia lo que se devuelve.
- Los `except` se prueban **en orden**, y gana el **primero** que coincide (con la clase o con una clase padre). Uno general (`except Exception`) antes que uno específico lo tapa.
- **Jerarquía:** `BaseException` es la raíz. `KeyboardInterrupt`, `SystemExit` y `GeneratorExit` heredan de ella **pero no de `Exception`**. `KeyError` e `IndexError` heredan de `LookupError`; `ZeroDivisionError`, de `ArithmeticError`.
- Un **`except:` pelado** captura **todo**, incluso `Ctrl+C` y `sys.exit()`: se desaconseja. Las excepciones propias heredan de **`Exception`**.
- `raise` solo (sin nada) **vuelve a lanzar** la excepción que se está manejando. `raise B from A` encadena: `A` queda en `__cause__`. Lanzar algo que no es una excepción (`raise "error"`) es `TypeError`.
- `assert cond, msg` lanza `AssertionError` si `cond` es falsa, y **se desactiva** al correr Python con `-O`.
- **`with`** usa `__enter__` (su valor de retorno es lo que va después de `as`) y `__exit__`, que corre **siempre**. Si `__exit__` devuelve **`True`**, la excepción **se suprime**.
- **Modos de `open`:** `"r"` (por defecto; si no existe, `FileNotFoundError`), `"w"` (crea o **vacía**), `"a"` (agrega al final), `"x"` (crea; si ya existe, `FileExistsError`), con `"b"` para binario.
:::

## 1. `try`, `except`, `else`, `finally`

```python
try:
    print("try")
except ZeroDivisionError:
    print("except")
else:                     # solo si el try NO lanzó una excepción
    print("else")
finally:                  # siempre
    print("finally")
```

```python
try:
    print("try")
    print(1 / 0)          # salta al except: el resto del try no se ejecuta
    print("no llega")
except ZeroDivisionError:
    print("except")
else:
    print("else")
finally:
    print("finally")
```

| Bloque | Cuándo corre |
|---|---|
| `try` | siempre, hasta la primera excepción |
| `except` | si hubo una excepción de ese tipo (o de una subclase) |
| `else` | si el `try` terminó **sin** excepción |
| `finally` | **siempre**, al final, pase lo que pase |

::: observacion
**¿Para qué sirve el `else`?** Para dejar en el `try` solo el código que puede fallar de la forma que se está capturando. Una excepción que salte **dentro del `else`** no la capturan los `except` de ese mismo `try`:

```python
try:
    x = 1
except ZeroDivisionError:
    print("capturado")
else:
    print(1 / 0)          # ZeroDivisionError sin capturar
```
:::

**Capturar varias excepciones:** en una tupla, `except (ValueError, TypeError) as e:`. Con `as e` se obtiene el objeto excepción: `str(e)` da el mensaje y `e.args`, los argumentos.

```python
for v in ["a", None]:
    try:
        int(v)
    except (ValueError, TypeError) as e:
        print(type(e).__name__, "-", e)
```

## 2. `finally` y `return`

`finally` corre **aunque el `try` haga `return`**: primero se calcula el valor a devolver, después corre el `finally`, y recién ahí la función termina.

```python
def f():
    try:
        return "valor"
    finally:
        print("finally corre igual")

print(f())
```

```python
def g():
    x = 1
    try:
        return x          # el valor (1) ya quedó calculado
    finally:
        x = 2             # no cambia lo que se devuelve

print(g())
```

::: ojo
**Un `return` dentro del `finally` gana siempre**: pisa el `return` del `try` y además **se traga** cualquier excepción en curso. Por eso es mala práctica, y desde Python 3.14 da un aviso (*SyntaxWarning: 'return' in a 'finally' block*); con `break` y `continue` dentro de un `finally` pasa lo mismo.

```python
def f():
    try:
        return "try"
    finally:
        return "finally"

def h():
    try:
        1 / 0
    finally:
        return "tragada"      # la ZeroDivisionError desaparece

print(f(), h())
```
:::

Dentro de un bucle, el `finally` también corre en la vuelta en que hay `break`:

```python
for i in range(3):
    try:
        if i == 1:
            break
    finally:
        print("finally", i)
```

## 3. La jerarquía de excepciones

```text
BaseException
 ├── SystemExit                 (sys.exit())
 ├── KeyboardInterrupt          (Ctrl+C)
 ├── GeneratorExit
 └── Exception                  ← de acá heredan las "normales" y las propias
      ├── ArithmeticError
      │    ├── ZeroDivisionError
      │    └── OverflowError
      ├── LookupError
      │    ├── IndexError
      │    └── KeyError
      ├── NameError
      │    └── UnboundLocalError
      ├── ImportError
      │    └── ModuleNotFoundError
      ├── OSError
      │    ├── FileNotFoundError
      │    └── PermissionError
      ├── RuntimeError
      │    ├── RecursionError
      │    └── NotImplementedError
      ├── SyntaxError
      │    └── IndentationError
      ├── StopIteration
      ├── TypeError
      ├── ValueError
      ├── AttributeError
      └── AssertionError
```

Un `except` captura la clase nombrada **y todas sus subclases**:

```python
try:
    {}["x"]
except LookupError as e:          # KeyError es una LookupError
    print("lookup", repr(e))
```

| Excepción | Cuándo salta | Ejemplo |
|---|---|---|
| `TypeError` | operación con un tipo que no corresponde | `len(5)`, `"a" + 1` |
| `ValueError` | tipo correcto, valor inválido | `int("abc")` |
| `KeyError` | clave que no está en un dict | `{}["x"]` |
| `IndexError` | índice fuera de rango | `[1][5]` |
| `AttributeError` | atributo o método que no existe | `None.upper()` |
| `NameError` | nombre que no existe | una variable sin definir |
| `ZeroDivisionError` | división por cero | `1 / 0`, `1.0 / 0` |
| `StopIteration` | un iterador se agotó | `next(iter([]))` |
| `FileNotFoundError` | archivo que no existe | `open("no_existe.txt")` |

::: ojo
**El orden de los `except` importa.** Se prueban de arriba hacia abajo y corre **solo el primero** que coincide. Si uno general va antes, los específicos de abajo nunca se alcanzan:

```python
try:
    int("a")
except Exception:          # ValueError es una Exception: entra acá
    print("Exception")
except ValueError:         # nunca se alcanza
    print("ValueError")
```

Y un **`except:` pelado** (sin tipo) captura todo `BaseException`, incluso `KeyboardInterrupt` y `SystemExit`: puede impedir cortar el programa con `Ctrl+C`. Lo correcto es `except Exception:` (o algo más específico).

```python
try:
    raise KeyboardInterrupt
except Exception:
    print("Exception")         # KeyboardInterrupt no es una Exception
except:
    print("except pelado")
```
:::

## 4. Lanzar excepciones: `raise`

```python
def f():
    try:
        1 / 0
    except ZeroDivisionError:
        print("registro el error")
        raise                     # vuelve a lanzar la misma excepción

try:
    f()
except ZeroDivisionError as e:
    print("afuera:", e)
```

- `raise ValueError("mensaje")` lanza una instancia; `raise ValueError` (la clase) también vale: Python crea la instancia.
- Solo se puede lanzar algo que herede de `BaseException`: `raise "error"` es `TypeError: exceptions must derive from BaseException`.

**Encadenamiento:**

| Forma | Qué queda guardado | Qué muestra el traceback |
|---|---|---|
| lanzar otra excepción dentro de un `except` | la original en `__context__` | *During handling of the above exception, another exception occurred* |
| `raise B from A` | `A` en `__cause__` | *The above exception was the direct cause of the following exception* |
| `raise B from None` | — | solo `B` (oculta la original) |

```python
try:
    try:
        1 / 0
    except ZeroDivisionError as e:
        raise ValueError("dato inválido") from e
except ValueError as e:
    print(type(e.__cause__).__name__)
```

**Excepciones propias:** se heredan de `Exception` (o de una más específica), y pueden tener atributos propios.

```python
class SaldoError(Exception):
    def __init__(self, faltan):
        super().__init__(f"faltan {faltan}")
        self.faltan = faltan

try:
    raise SaldoError(50)
except SaldoError as e:
    print(e, e.faltan)
```

**Grupos de excepciones** (Python 3.11): `ExceptionGroup` junta varias excepciones, y `except*` maneja cada tipo por separado.

## 5. `assert`

```python
x = 5
assert x > 0, "tiene que ser positivo"     # se cumple: no pasa nada
assert x < 0, "tiene que ser negativo"     # AssertionError: tiene que ser negativo
```

- Sirve para **chequeos internos** durante el desarrollo, no para validar datos del usuario: al correr Python con **`-O`** (optimizado), los `assert` **se eliminan**.
- `assert (cond, "msg")`, con paréntesis, es una **tupla no vacía**: siempre verdadera, nunca falla (Python avisa con un `SyntaxWarning`).

## 6. Context managers y `with`

Un **context manager** es un objeto que se usa con `with` para preparar algo y **limpiarlo siempre** al final, aunque haya un error. El caso típico: un archivo que se cierra solo.

**El protocolo:**

1. Al entrar, Python llama a `__enter__()`. Lo que devuelve es lo que se asigna después de `as`.
2. Corre el bloque.
3. Al salir, **siempre**, llama a `__exit__(tipo, valor, traceback)`. Si no hubo excepción, los tres son `None`.
4. Si `__exit__` devuelve **`True`**, la excepción **se suprime** y el programa sigue después del `with`; si devuelve `False` o `None`, la excepción sigue su camino.

```python
class Silencio:
    def __enter__(self):
        return "hola"                       # esto va al "as"
    def __exit__(self, tipo, valor, tb):
        print("exit con", tipo.__name__ if tipo else None)
        return True                         # suprime la excepción

with Silencio() as s:
    print(s)
    1 / 0
    print("no llega")
print("después")
```

```python
class Ctx:
    def __enter__(self):
        print("enter")
        return self
    def __exit__(self, *a):
        print("exit")                       # devuelve None: no suprime

with Ctx():
    raise ValueError("sigue")               # __exit__ corre, y el error sigue
```

**Con `contextlib`:**

```python
from contextlib import contextmanager, suppress

@contextmanager
def etiqueta(nombre):
    print(f"<{nombre}>")          # lo de antes del yield es el __enter__
    try:
        yield nombre.upper()      # lo que se entrega va al "as"
    finally:
        print(f"</{nombre}>")     # lo de después es el __exit__

with etiqueta("p") as e:
    print(e)

with suppress(KeyError):          # ignora ese tipo de excepción
    {}["x"]
print("sigue")
```

## 7. Archivos

```python
with open("prueba.txt", "w") as f:       # "w": crea el archivo (o lo vacía)
    n = f.write("hola\nchau\n")          # devuelve la cantidad de caracteres escritos
print(n, f.closed)                       # al salir del with, el archivo se cerró

with open("prueba.txt") as f:            # por defecto, "r"
    print(f.readline().strip())          # un renglón
    print(f.read().strip())              # el resto

with open("prueba.txt", "a") as f:       # "a": agrega al final
    f.write("otra\n")

with open("prueba.txt") as f:
    print([l.strip() for l in f])        # un archivo se recorre renglón por renglón
```

| Modo | Lee | Escribe | Si no existe | Si existe |
|---|---|---|---|---|
| `"r"` (por defecto) | sí | no | `FileNotFoundError` | lo abre |
| `"w"` | no | sí | lo crea | **lo vacía** |
| `"a"` | no | sí, al final | lo crea | agrega al final |
| `"x"` | no | sí | lo crea | `FileExistsError` |
| `"+"` (`"r+"`, `"w+"`…) | sí | sí | según la letra | según la letra |

Se le agrega `"b"` para modo binario (`"rb"`, `"wb"`: lee y escribe `bytes`) o `"t"` para texto (el valor por defecto). Escribir en un archivo abierto con `"r"` da `io.UnsupportedOperation: not writable`.

::: observacion
Sin `with`, hay que acordarse de llamar a `f.close()` (y de hacerlo aunque haya un error, con un `finally`). Por eso la forma recomendada es siempre `with open(...) as f:`. En un mismo `with` se pueden abrir varios: `with open("a") as a, open("b") as b:`.
:::

## Preguntas tipo examen

::: pregunta What is the output of the following code?
```python
try:
    print("try")
except ValueError:
    print("except")
else:
    print("else")
finally:
    print("finally")
```
- [ ] `try`, `finally`
- [x] `try`, `else`, `finally`
- [ ] `try`, `except`, `else`, `finally`
- [ ] `try`, `except`, `finally`
::: solucion Explicación
El `try` termina sin excepción, así que se saltea el `except`, corre el `else` (que es justamente para el caso "no hubo error") y al final el `finally`, que corre siempre.
:::
:::

::: pregunta What is the output of the following code?
```python
try:
    print("A")
    print(1 / 0)
    print("B")
except ZeroDivisionError:
    print("C")
else:
    print("D")
finally:
    print("E")
```
- [ ] `A`, `B`, `C`, `E`
- [x] `A`, `C`, `E`
- [ ] `A`, `C`, `D`, `E`
- [ ] `A`, `C`
::: solucion Explicación
`A` se imprime. La división lanza `ZeroDivisionError`, y el resto del `try` (`B`) no se ejecuta: salta al `except` (`C`). Como hubo excepción, el `else` no corre. El `finally` corre siempre (`E`).
:::
:::

::: pregunta What does `f()` return?
```python
def f():
    try:
        return "try"
    finally:
        return "finally"

print(f())
```
- [ ] `"try"`
- [x] `"finally"`
- [ ] `None`
- [ ] It raises `SyntaxError`
::: solucion Explicación
El `finally` corre después de que el `try` calculó su `return`, y su propio `return` **pisa** al anterior. No es un error: es código válido (desde Python 3.14 da un `SyntaxWarning`, un aviso, no un error). Es mala práctica justamente por esto, y porque además se traga cualquier excepción.
:::
:::

::: pregunta What does `f()` return?
```python
def f():
    x = 1
    try:
        return x
    finally:
        x = 2

print(f())
```
- [x] `1`
- [ ] `2`
- [ ] `None`
- [ ] It raises `UnboundLocalError`
::: solucion Explicación
Al llegar al `return x`, el valor a devolver (1) ya queda calculado. Después corre el `finally`, que cambia la variable `x`, pero no el valor que ya se iba a devolver. Distinto sería un `return` dentro del `finally`.
:::
:::

::: pregunta What is the output of the following code?
```python
try:
    int("abc")
except Exception:
    print("Exception")
except ValueError:
    print("ValueError")
```
- [x] `Exception`
- [ ] `ValueError`
- [ ] `Exception` and then `ValueError`
- [ ] It raises `SyntaxError` because `ValueError` is unreachable
::: solucion Explicación
Los `except` se prueban en orden y corre solo el **primero** que coincide. `ValueError` es subclase de `Exception`, así que entra en el primero. El segundo nunca se alcanza, pero no es un error de sintaxis. Los `except` específicos tienen que ir **antes** que los generales.
:::
:::

::: pregunta Which of the following exceptions does NOT inherit from `Exception`?
- [ ] `ValueError`
- [ ] `KeyError`
- [x] `KeyboardInterrupt`
- [ ] `ZeroDivisionError`
::: solucion Explicación
`KeyboardInterrupt` (al apretar `Ctrl+C`) hereda directamente de `BaseException`, igual que `SystemExit` y `GeneratorExit`. Así, un `except Exception` no impide cortar el programa. Las otras tres son subclases de `Exception`.
:::
:::

::: pregunta What is the output of the following code?
```python
try:
    d = {}
    d["missing"]
except LookupError:
    print("lookup")
except KeyError:
    print("key")
```
- [x] `lookup`
- [ ] `key`
- [ ] `lookup` and then `key`
- [ ] It raises `KeyError`
::: solucion Explicación
`KeyError` es subclase de `LookupError` (igual que `IndexError`), así que el primer `except` ya la captura. Como corre un solo `except`, `key` no se imprime.
:::
:::

::: pregunta What is the output of the following code?
```python
try:
    try:
        1 / 0
    except ZeroDivisionError as e:
        raise ValueError("bad") from e
except ValueError as e:
    print(type(e.__cause__).__name__)
```
- [ ] `ValueError`
- [x] `ZeroDivisionError`
- [ ] `NoneType`
- [ ] `Exception`
::: solucion Explicación
`raise ... from e` **encadena** las excepciones: la original (`ZeroDivisionError`) queda guardada en el atributo `__cause__` de la nueva. El traceback muestra las dos, con *"The above exception was the direct cause of the following exception"*.
:::
:::

::: pregunta What is the output of the following code?
```python
class Quiet:
    def __enter__(self):
        return "hello"

    def __exit__(self, exc_type, exc, tb):
        return True

with Quiet() as q:
    print(q)
    1 / 0
    print("unreachable")
print("after")
```
- [ ] `hello` and then a `ZeroDivisionError` traceback
- [x] `hello`, `after`
- [ ] `hello`, `unreachable`, `after`
- [ ] `after`
::: solucion Explicación
`as q` recibe lo que devuelve `__enter__` (`"hello"`). Al dividir por cero, el bloque se corta y Python llama a `__exit__` con los datos de la excepción. Como `__exit__` devuelve `True`, la excepción **se suprime** y el programa sigue después del `with`. `"unreachable"` no se imprime porque el bloque se cortó en la división.
:::
:::

::: pregunta Which `open()` mode creates a new file and raises `FileExistsError` if the file already exists?
- [ ] `"w"`
- [ ] `"a"`
- [x] `"x"`
- [ ] `"r+"`
::: solucion Explicación
`"x"` es la creación **exclusiva**: crea el archivo y falla si ya existe. `"w"` lo crea o lo **vacía** si existe; `"a"` lo crea o agrega al final; `"r+"` lee y escribe, pero el archivo tiene que existir.
:::
:::

::: pregunta What happens when this code runs?
```python
raise "Something went wrong"
```
- [ ] It raises an `Exception` with that message
- [ ] It prints `Something went wrong`
- [x] It raises `TypeError`
- [ ] It raises `SyntaxError`
::: solucion Explicación
Solo se puede lanzar un objeto (o una clase) que herede de `BaseException`. Lanzar un string da *TypeError: exceptions must derive from BaseException*. En Python 2 muy viejo se podían lanzar strings; en Python 3, no.
:::
:::

::: pregunta What is the output of the following code?
```python
class MyError(ValueError):
    pass

try:
    raise MyError("oops")
except ValueError as e:
    print("caught", type(e).__name__)
```
- [x] `caught MyError`
- [ ] `caught ValueError`
- [ ] It raises `MyError` because it is not caught
- [ ] It raises `TypeError`
::: solucion Explicación
`MyError` hereda de `ValueError`, así que `except ValueError` la captura. Pero el objeto sigue siendo un `MyError`: `type(e).__name__` da su clase real.
:::
:::
