# 1 · Historia, cultura y filosofía de Python

*Peso **A**: tu amigo recordó preguntas sobre el creador del lenguaje, el Zen de Python, los principios de diseño, PEP 8 y el tipado. Es la unidad más "de memoria": conviene leerla dos veces. Lo que se puede ejecutar está comprobado con Python 3.14.*

::: claves
- **Creador:** **Guido van Rossum** (Países Bajos). Empezó en diciembre de **1989** en el **CWI** de Ámsterdam, como sucesor del lenguaje **ABC**. Primera versión pública: **0.9.0, febrero de 1991**.
- **El nombre** viene del grupo de humor británico **Monty Python** (*Monty Python's Flying Circus*), no de la serpiente.
- Guido fue el **BDFL** (*Benevolent Dictator For Life*) hasta **julio de 2018**. Desde 2019 decide un **Steering Council** de 5 personas elegido por los desarrolladores. La **PSF** (*Python Software Foundation*, 2001) es dueña de los derechos.
- **PEP** = *Python Enhancement Proposal*. **PEP 8**: guía de estilo. **PEP 20**: el Zen. **PEP 257**: docstrings. **PEP 484**: type hints.
- **El Zen de Python** (`import this`) lo escribió **Tim Peters**: **19 aforismos** (el 20 quedó sin escribir). "*There should be one — and preferably only one — obvious way to do it.*"
- **PEP 8:** **4 espacios** por nivel; líneas de **79 caracteres** (72 en docstrings y comentarios); `snake_case` para funciones y variables, `CapWords` para clases, `UPPER_CASE` para constantes; comparar con `None` usando **`is`**.
- **Tipado dinámico** (el tipo es del objeto, no de la variable) **y fuerte** (no mezcla tipos sin que se lo pidan: `"1" + 1` es `TypeError`). Los **type hints no se verifican** al ejecutar.
- **CPython** es la implementación de referencia, escrita en **C**: compila el código a **bytecode** (`.pyc`) y lo ejecuta en una máquina virtual. Otras: PyPy, Jython, IronPython, MicroPython.
- **Python 2 contra 3:** en Python 3 `print` es una **función**, `/` da **siempre** un `float` y los strings son **Unicode**. Python 2 dejó de tener soporte el **1 de enero de 2020**.
:::

## 1. Origen

- **Guido van Rossum**, programador holandés, empezó Python en **diciembre de 1989**, como proyecto de las vacaciones de Navidad, mientras trabajaba en el **CWI** (*Centrum Wiskunde & Informatica*, Ámsterdam).
- Lo pensó como sucesor de **ABC**, un lenguaje de enseñanza en el que había trabajado: tomó su legibilidad y le sumó lo que le faltaba (extensibilidad, manejo de excepciones, interacción con el sistema operativo).
- Publicó la versión **0.9.0 en febrero de 1991**. Ya traía clases con herencia, excepciones, funciones y los tipos `list`, `dict` y `str`.
- **El nombre** sale de *Monty Python's Flying Circus*, el programa de humor de la BBC que Guido miraba en esa época. Por eso la documentación usa `spam` y `eggs` (un sketch del grupo) en los ejemplos, en lugar de `foo` y `bar`.

| Año | Versión | Qué trajo |
|---|---|---|
| 1991 | 0.9.0 | primera versión pública |
| 1994 | 1.0 | `lambda`, `map`, `filter`, `reduce` |
| 2000 | 2.0 | comprensiones de listas, recolector de basura para ciclos |
| 2008 | 3.0 | rompió la compatibilidad con Python 2 para limpiar el lenguaje |
| 2020 | — | fin del soporte de Python 2 (1 de enero; la última versión, la 2.7.18, salió en abril) |

**Gobierno del lenguaje.**

- Guido fue el **BDFL** (*Benevolent Dictator For Life*, "dictador benevolente vitalicio"): la última palabra en cada decisión era suya.
- En **julio de 2018**, después de la discusión por el operador morsa `:=` (PEP 572), renunció a ese rol.
- Desde **2019** las decisiones las toma un **Steering Council** de **5 personas**, que eligen cada año los desarrolladores del núcleo (PEP 13).
- La **PSF** (*Python Software Foundation*, creada en 2001) es la organización sin fines de lucro dueña de la propiedad intelectual. Python es **software libre**, con licencia PSF (compatible con la GPL).
- Guido trabajó después en Google (2005–2012), en Dropbox (2013–2019) y, desde 2020, en Microsoft.

**Desde Python 3.9 sale una versión nueva por año**, cada octubre (PEP 602), y cada una tiene unos 5 años de soporte.

## 2. Los PEP

Un **PEP** (*Python Enhancement Proposal*, "propuesta de mejora de Python") es el documento con el que se propone, discute y registra un cambio en el lenguaje, un proceso o una convención. PEP 1 explica qué es un PEP.

| PEP | Tema |
|---|---|
| **PEP 8** | **guía de estilo** del código Python |
| **PEP 20** | **el Zen de Python** |
| **PEP 257** | convenciones para las **docstrings** |
| **PEP 484** | **type hints** (anotaciones de tipo), Python 3.5 |
| PEP 572 | operador morsa `:=`, Python 3.8 |
| PEP 634 | `match` / `case`, Python 3.10 |
| PEP 13 | el gobierno con Steering Council |

## 3. El Zen de Python (PEP 20)

Los principios de diseño del lenguaje, en **19 aforismos** escritos por **Tim Peters** (1999). Se ven con `import this`. El aforismo número 20 quedó "para que lo escriba Guido".

```python
import this
```

Los que más se preguntan:

- *Beautiful is better than ugly.* / *Explicit is better than implicit.* / *Simple is better than complex.*
- ***Readability counts.*** (la legibilidad importa)
- *Errors should never pass silently. Unless explicitly silenced.* (los errores no se tragan en silencio, salvo a propósito)
- *In the face of ambiguity, refuse the temptation to guess.*
- ***There should be one — and preferably only one — obvious way to do it.*** Y el chiste que sigue: *Although that way may not be obvious at first unless you're Dutch* (Guido es holandés).
- *Now is better than never. Although never is often better than* right *now.*
- *If the implementation is hard to explain, it's a bad idea.*
- *Namespaces are one honking great idea — let's do more of those!*

::: ojo
**"There's more than one way to do it"** (*TMTOWTDI*) **no** es del Zen: es el lema de **Perl**, y el Zen dice justo lo contrario. Es la opción trampa típica de "¿cuál de estas frases NO está en el Zen?".
:::

**Huevos de pascua** (chistes escondidos en el lenguaje):

- `import this` muestra el Zen (el código del módulo `this` está "cifrado" con ROT13).
- `from __future__ import braces` (pedir llaves en lugar de sangría) responde `SyntaxError: not a chance`.
- `import antigravity` abre en el navegador la tira cómica de xkcd sobre Python.

```python
from __future__ import braces
```

## 4. PEP 8: la guía de estilo

PEP 8 es una **recomendación**, no una regla del intérprete: el código que no la cumple igual funciona. Una de sus secciones se titula *"A Foolish Consistency is the Hobgoblin of Little Minds"*: la legibilidad está por encima de seguir la guía a ciegas.

**Formato:**

- Sangría de **4 espacios** por nivel. Se prefieren **espacios** a tabulaciones, y Python 3 **no permite mezclarlos** en un mismo bloque.
- Líneas de **79 caracteres como máximo**; **72** en docstrings y comentarios.
- **Dos líneas en blanco** entre funciones y clases de primer nivel; **una** entre métodos.
- Espacios alrededor de `=` y de los operadores de comparación, pero **no** en un argumento con nombre (`f(x=1)`), ni justo adentro de paréntesis o corchetes.
- **Imports** al principio del archivo, uno por renglón, en tres grupos separados por una línea en blanco: biblioteca estándar, paquetes de terceros y módulos propios.
- Archivos en **UTF-8**.

**Nombres:**

| Qué | Estilo | Ejemplo |
|---|---|---|
| funciones, métodos, variables | `snake_case` (minúsculas con guiones bajos) | `calcular_total`, `precio_final` |
| clases | `CapWords` (también llamado *CamelCase*) | `CuentaBancaria` |
| constantes | `UPPER_CASE` | `MAX_INTENTOS` |
| módulos | minúsculas, cortos | `utils.py` |
| uso interno | `_nombre` | `_cache` |
| evitar choque con una palabra reservada | `nombre_` | `class_` |
| *name mangling* en clases | `__nombre` | `__saldo` |

Nunca usar `l` (ele minúscula), `O` (o mayúscula) ni `I` (i mayúscula) como nombre de una letra: se confunden con 1 y 0.

**Recomendaciones de programación:**

- Comparar con `None` usando **`is` / `is not`**, nunca con `==`.
- No comparar booleanos con `==`: `if listo:` en lugar de `if listo == True:`.
- Para saber si una secuencia está vacía, usar su valor de verdad: `if not lista:` en lugar de `if len(lista) == 0:`.
- Usar `isinstance(x, int)` en lugar de `type(x) == int`.
- Usar `def` en lugar de asignar una `lambda` a un nombre.
- Usar `texto.startswith(...)` en lugar de comparar slices.

## 5. Principios de diseño y estilo "pythónico"

- **Legibilidad ante todo.** La **sangría es parte de la sintaxis** (no hay llaves): el código bien sangrado es la única forma de que funcione.
- **"Batteries included":** la biblioteca estándar trae de todo (archivos, JSON, fechas, matemática, redes, tests…).
- **Multiparadigma:** se puede programar en forma imperativa, orientada a objetos o funcional.
- **Duck typing:** importa lo que un objeto **sabe hacer**, no su tipo (unidad 9.1).
- **EAFP** (*Easier to Ask Forgiveness than Permission*, "es más fácil pedir perdón que permiso"): intentar la operación y capturar la excepción si falla. Es el estilo preferido en Python, frente a **LBYL** (*Look Before You Leap*, "mirá antes de saltar"), que chequea todo antes.
- **"We are all consenting adults":** el lenguaje no prohíbe; confía en las convenciones (`_interno`).
- **Pythónico** (*pythonic*): el código que aprovecha las formas idiomáticas del lenguaje (comprensiones, desempaquetado, `with`, `enumerate`…).

```python
d = {"a": 1}

# EAFP: intentar y capturar
try:
    valor = d["b"]
except KeyError:
    valor = 0

# LBYL: preguntar antes
valor2 = d["b"] if "b" in d else 0

print(valor, valor2)
```

## 6. Tipado: dinámico y fuerte

Son dos cosas distintas, y Python es las dos:

| | Significa | En Python |
|---|---|---|
| **Dinámico** (contra estático) | los tipos se controlan **al ejecutar**; una variable puede apuntar a objetos de cualquier tipo | `x = 5` y después `x = "cinco"` es válido |
| **Fuerte** (contra débil) | no convierte tipos sin que se lo pidan para que una operación "funcione" | `"1" + 1` es `TypeError` (en JavaScript da `"11"`) |

```python
x = 5
print(type(x).__name__)
x = "cinco"              # dinámico: la variable no tiene tipo; el objeto sí
print(type(x).__name__)

print(1 + 2.5, True + 1, 3 * "ab")   # conversiones permitidas: números entre sí, repetir un string
print("1" + 1)                       # fuerte: TypeError
```

- Sí hay conversiones entre **números** (`int` con `float`; `bool` es un `int`) y operaciones definidas entre tipos (`3 * "ab"` repite el string). Lo que no hay es una conversión "mágica" de string a número o al revés.
- Los **type hints** (PEP 484, Python 3.5) son **opcionales** y Python **no los verifica**: los usan los editores y herramientas como **mypy**.

```python
edad: int = "veinte"     # no da error: la anotación no se controla
print(edad)
```

## 7. Implementaciones y cómo se ejecuta

**Python** es el lenguaje; hay varias implementaciones:

| Implementación | En qué está hecha | Detalle |
|---|---|---|
| **CPython** | C | la **de referencia** (la de python.org), la más usada |
| **PyPy** | Python (RPython) | tiene un compilador JIT: suele ser mucho más rápida |
| **Jython** | Java | corre sobre la JVM (solo Python 2) |
| **IronPython** | C# | corre sobre .NET |
| **MicroPython** | C | para microcontroladores |
| Pyodide | CPython compilado a WebAssembly | corre en el navegador: es la que usa esta app |

**¿Es interpretado o compilado?** Las dos cosas: CPython primero **compila** el código fuente a **bytecode** (instrucciones para una máquina virtual, que se guardan en archivos `.pyc` dentro de `__pycache__`), y después la máquina virtual de Python **interpreta** ese bytecode. Por eso se dice que Python es un lenguaje "interpretado": no se compila a código de máquina antes de ejecutarlo.

**El GIL** (*Global Interpreter Lock*): en CPython, un solo hilo ejecuta bytecode por vez, aunque haya varios núcleos. Python 3.13 sumó una versión experimental sin GIL, que en 3.14 pasó a estar soportada oficialmente (como opción aparte).

## 8. Python 2 contra Python 3

| | Python 2 | Python 3 |
|---|---|---|
| `print` | sentencia: `print "hola"` | **función**: `print("hola")` |
| `3 / 2` | `1` (división entera entre enteros) | **`1.5`** (para la entera, `//`) |
| strings | bytes por defecto; Unicode con `u"…"` | **Unicode** por defecto; `bytes` aparte |
| `range` | arma una lista (`xrange` era el perezoso) | perezoso |
| `input` | `raw_input()` devolvía texto | `input()` devuelve texto |
| excepciones | `except E, e:` | `except E as e:` |
| enteros | `int` y `long` | un solo `int`, sin límite |
| comprensiones | su variable "se escapaba" | tienen su propio alcance |

**Hitos de Python 3** que se preguntan:

| Versión | Novedad |
|---|---|
| 3.5 | `async` / `await`, type hints (PEP 484), operador `@` |
| 3.6 | **f-strings**, `_` en números (`1_000_000`) |
| 3.7 | los dicts **garantizan** el orden de inserción, `@dataclass` |
| 3.8 | operador morsa **`:=`**, parámetros solo posicionales (`/`), `f"{x=}"` |
| 3.9 | `\|` y `\|=` para combinar dicts, `list[int]` en anotaciones |
| 3.10 | **`match` / `case`**, `int \| str` en anotaciones, mejores mensajes de error |
| 3.11 | entre 10 % y 60 % más rápido que 3.10 |
| 3.13 | consola interactiva nueva, versión experimental sin GIL |
| 3.14 | *template strings* (`t"…"`), versión sin GIL soportada |

## Preguntas tipo examen

::: pregunta Who created the Python programming language?
- [ ] Dennis Ritchie
- [ ] James Gosling
- [x] Guido van Rossum
- [ ] Bjarne Stroustrup
::: solucion Explicación
**Guido van Rossum**, en el CWI de Ámsterdam (desde 1989; primera versión pública en 1991). Dennis Ritchie creó C, James Gosling creó Java y Bjarne Stroustrup creó C++.
:::
:::

::: pregunta Where does the name "Python" come from?
- [ ] From the python snake, chosen for its flexibility
- [x] From the British comedy group Monty Python
- [ ] From an acronym of "Programming Your Toolkit Hands-On"
- [ ] From the Greek mythological serpent Python
::: solucion Explicación
Guido era fan de *Monty Python's Flying Circus*, el programa de humor de la BBC. Por eso la documentación usa `spam` y `eggs` en los ejemplos. La serpiente se adoptó después como logo.
:::
:::

::: pregunta Which of the following is NOT one of the aphorisms of the Zen of Python?
- [ ] Readability counts.
- [ ] Explicit is better than implicit.
- [x] There's more than one way to do it.
- [ ] Errors should never pass silently.
::: solucion Explicación
"*There's more than one way to do it*" es el lema de **Perl**. El Zen dice lo contrario: "*There should be one — and preferably only one — obvious way to do it*". Las otras tres sí son del Zen.
:::
:::

::: pregunta Who wrote "The Zen of Python", and how can you display it?
- [ ] Guido van Rossum; with `help("zen")`
- [x] Tim Peters; with `import this`
- [ ] Tim Peters; with `import zen`
- [ ] Barry Warsaw; with `print(__zen__)`
::: solucion Explicación
El Zen lo escribió **Tim Peters** (es la PEP 20) y se muestra con `import this`. Tiene 19 aforismos.
:::
:::

::: pregunta What does the acronym PEP stand for?
- [ ] Python Execution Process
- [x] Python Enhancement Proposal
- [ ] Python Extension Package
- [ ] Program Evaluation Policy
::: solucion Explicación
**Python Enhancement Proposal**: el documento con el que se propone y registra un cambio en el lenguaje o una convención. Por ejemplo, PEP 8 (estilo) y PEP 20 (el Zen).
:::
:::

::: pregunta According to PEP 8, how should code be indented?
- [ ] With one tab per indentation level
- [ ] With 2 spaces per indentation level
- [x] With 4 spaces per indentation level
- [ ] Any consistent amount, PEP 8 does not specify it
::: solucion Explicación
PEP 8 recomienda **4 espacios** por nivel y prefiere espacios a tabulaciones. Python 3 no permite mezclar tabulaciones y espacios en un mismo bloque.
:::
:::

::: pregunta What is the maximum line length recommended by PEP 8 for code?
- [ ] 72 characters
- [x] 79 characters
- [ ] 80 characters
- [ ] 120 characters
::: solucion Explicación
**79 caracteres** para el código, y **72** para docstrings y comentarios. La trampa típica es 80.
:::
:::

::: pregunta Which of the following names follow the PEP 8 naming conventions? (Select all that apply)
- [x] `class BankAccount:`
- [x] `def calculate_total():`
- [x] `MAX_RETRIES = 3`
- [ ] `def CalculateTotal():`
- [ ] `class bank_account:`
- [ ] `myVariable = 10`
::: solucion Explicación
Clases en `CapWords` (`BankAccount`), funciones y variables en `snake_case` (`calculate_total`, `my_variable`) y constantes en `UPPER_CASE` (`MAX_RETRIES`). `CalculateTotal` como función, `bank_account` como clase y `myVariable` (*camelCase*) no siguen PEP 8.
:::
:::

::: pregunta Which statement best describes Python's type system?
- [ ] Static and strong
- [ ] Static and weak
- [x] Dynamic and strong
- [ ] Dynamic and weak
::: solucion Explicación
**Dinámico**: los tipos se controlan al ejecutar, y una variable puede apuntar a objetos de distintos tipos. **Fuerte**: no convierte tipos implícitamente para que una operación funcione: `"1" + 1` da `TypeError`. JavaScript, por ejemplo, es dinámico y débil.
:::
:::

::: pregunta What happens when you run `from __future__ import braces`?
- [ ] It enables C-style curly braces for code blocks
- [x] It raises `SyntaxError: not a chance`
- [ ] It raises `ImportError`
- [ ] Nothing, it is silently ignored
::: solucion Explicación
Es un huevo de pascua: los desarrolladores dejaron claro que Python **nunca** va a usar llaves para los bloques. La respuesta es un `SyntaxError` con el mensaje *not a chance* ("ni en sueños").
:::
:::

::: pregunta What is CPython?
- [ ] A tool that compiles Python into C source code
- [x] The reference implementation of Python, written in C
- [ ] A Python library for calling C functions
- [ ] A version of Python that runs only on Windows
::: solucion Explicación
**CPython** es la implementación de referencia, la que se baja de python.org. Está escrita en C, compila el código a bytecode y lo ejecuta en su máquina virtual. Otras implementaciones son PyPy, Jython e IronPython. (La herramienta que traduce código parecido a Python a C es Cython, otra cosa.)
:::
:::

::: pregunta Which of the following changes was introduced in Python 3?
- [ ] The `print` statement was introduced
- [x] `print` became a built-in function
- [ ] Integer division `/` between integers started returning an `int`
- [ ] Strings stopped supporting Unicode
::: solucion Explicación
En Python 3, `print` dejó de ser una sentencia (`print "hola"`) y pasó a ser una función (`print("hola")`). Además, `/` pasó a devolver siempre un `float` (es en Python 2 donde `3 / 2` daba `1`), y los strings pasaron a ser Unicode por defecto.
:::
:::

::: pregunta According to PEP 8, how should you check whether a variable `x` is `None`?
- [ ] `if x == None:`
- [x] `if x is None:`
- [ ] `if x.isNone():`
- [ ] `if type(x) == None:`
::: solucion Explicación
`None` es un *singleton* (hay uno solo), así que se compara por **identidad**: `is` o `is not`. `==` se puede redefinir con `__eq__` y dar resultados raros. `x.isNone()` no existe.
:::
:::
