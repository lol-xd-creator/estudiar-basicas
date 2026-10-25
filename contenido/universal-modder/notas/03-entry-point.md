# 3 · The entry point: from um to a function call

You type:

```text
um backup create "C:\Saves\Terraria" --name terraria
```

and, a moment later, a function called `create` in `um/backup.py` starts copying files. This chapter follows every step in between. It is a short path, but it shows four Python ideas you will meet again and again: **running a package**, **parsing arguments**, **importing a module from a string**, and **storing a function inside an object**.

::: claves
- `python -m um` runs `um/__main__.py`.
- `cli.main()` builds the command line with `argparse`, asking each module to **register** its own commands.
- Modules are imported **by name** with `importlib.import_module(f"um.{g}")`.
- Each command stores **the function that will run it** in the parsed arguments (`set_defaults(func=main)`); the CLI just calls `args.func(args)`.
:::

## Step 1: `__main__.py`

The launcher (chapter 2) runs `python -m um`. Python finds the file `um/__main__.py`, which contains only this:

```python um/__main__.py estatico
from um.cli import main

main()
```

To import `um.cli`, Python first imports the package `um`, which means running `um/__init__.py`:

```python um/__init__.py estatico
"""universal-modder: tools any AI agent (Claude Code, Codex, Cursor, Gemini CLI, ...) uses to mod games.

Subcommands (see `um --help`):
  scan      find installed games and fingerprint one: engine, runtime, anti-cheat, mod loaders, routes
  fal       generate game assets with fal (sprites, textures, PBR, 3D, rigs, SFX, music, voice, video)
  ...
"""

__version__ = "0.2.0"
```

This file has no logic: just a **docstring** and a version number. But both are used. A module's docstring is stored in its `__doc__` attribute ([[py:5#9|docstrings]]), and `cli.py` imports it to show as the main help text:

```python um/cli.py estatico
from um import __doc__ as DOC, __version__
```

`import ... as` gives the imported name a new name in this module. Here `__doc__` becomes `DOC`, so that it doesn't hide `cli.py`'s own `__doc__`.

## Step 2: building the parser

This is the heart of `cli.py`, complete:

```python um/cli.py estatico
GROUPS = ["scan", "fal", "comfy", "sprite", "render3d", "video", "win", "backup", "publish", "kb"]


def main(argv=None):
    ap = argparse.ArgumentParser(prog="um", description=DOC, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--version", action="version", version=f"universal-modder {__version__}")
    sub = ap.add_subparsers(dest="group", metavar="<group>")
    for g in GROUPS:
        importlib.import_module(f"um.{g}").register(sub)
    args = ap.parse_args(argv)
    if not getattr(args, "func", None):
        # a group without a command: show that group's help
        if args.group:
            ap.parse_args([args.group, "--help"])
        ap.print_help()
        sys.exit(1)
    args.func(args)


if __name__ == "__main__":
    main()
```

Read it line by line:

- **`argparse.ArgumentParser`** is the standard-library tool for command lines. You describe the arguments, and it parses `sys.argv`, prints `--help`, and reports errors.
- **`add_subparsers`** creates the first level of commands: `um scan`, `um fal`, `um backup`... `dest="group"` means the chosen group name will be stored as `args.group`.
- **The `for` loop** imports each module and calls its `register` function, passing the subparsers object. Each module adds its own commands; `cli.py` doesn't need to know any details.
- **`ap.parse_args(argv)`** turns the words you typed into an object (a `Namespace`) with one attribute per argument.
- **`getattr(args, "func", None)`** reads the attribute `func`, or returns `None` if it doesn't exist. That happens when you type only `um backup` without a command.
- **`args.func(args)`** calls the function that will do the work.

### Why `argv=None`?

`main` takes an optional list of arguments. With `None`, `parse_args` reads the real command line (`sys.argv[1:]`). But a test can call `main(["scan", "--list"])` directly, with no terminal involved. A **default value** makes the function easy to use in both situations ([[py:5#2|types of parameters]]).

### `if __name__ == "__main__"`

The last two lines run `main()` only when `cli.py` is executed as a script (`python um/cli.py`), not when it is imported. This is the classic pattern from your notes: [[py:11#3|`__name__` and `__main__`]].

## Step 3: importing a module from a string

```python um/cli.py estatico
importlib.import_module(f"um.{g}").register(sub)
```

A normal `import um.scan` needs the name written in the code. `importlib.import_module` takes the name **as a string**, so a loop can import ten modules from a list. It returns the module object, and `.register(sub)` calls a function inside it, in the same expression.

Two facts from your notes explain why this is safe and cheap:

- **A module is executed only once.** The first import runs the file; later imports just return the same module object from `sys.modules` ([[py:11#1|modules and import]]).
- **Modules are objects.** You can store them in variables, pass them around and read their attributes, like any other object.

## Step 4: each module registers its commands

Here is `register` from `backup.py`. Every module has one like it:

```python um/backup.py estatico
def register(sub):
    import argparse
    p = sub.add_parser("backup", help="snapshot / diff / restore save folders before you touch them",
                       description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    cs = p.add_subparsers(dest="cmd", metavar="<cmd>")
    q = cs.add_parser("create", help="snapshot a folder")
    q.add_argument("src")
    q.add_argument("--name")
    q.add_argument("--note")
    q.set_defaults(func=main)
    q = cs.add_parser("list", help="list snapshots")
    q.add_argument("name", nargs="?")
    q.set_defaults(func=main)
    ...
    q = cs.add_parser("restore", help="restore the latest (or --snapshot) snapshot")
    q.add_argument("name")
    q.add_argument("--clean", action="store_true", help="also delete files created after the snapshot")
    q.add_argument("--yes", action="store_true")
    q.set_defaults(func=main)
```

The useful `add_argument` options:

| Option | Meaning | Example |
|---|---|---|
| no dashes (`"src"`) | a **positional** argument: required, by position | `um backup create C:\Saves` |
| `--name` | an **optional** argument with a value | `--name terraria` |
| `nargs="?"` | the positional argument may be missing (then it is `None`) | `um backup list` |
| `action="store_true"` | a **flag**: `True` if present, `False` if not | `--yes` |
| `type=int` | convert the text to an integer (and fail nicely if it isn't one) | `um win kill 4312` |
| `choices=[...]` | only these values are accepted | `--anchor center` |

Notice also:

- **`description=__doc__`**: the module's docstring becomes the help text of `um backup --help`. That is the convention from `AGENTS.md`: *a docstring that doubles as `--help`*. `RawDescriptionHelpFormatter` keeps its line breaks.
- **`import argparse` inside the function.** Imports can go anywhere, not only at the top of the file. Here it keeps the import next to the only place that needs it.

### Functions stored in objects

The key line is:

```python um/backup.py estatico
q.set_defaults(func=main)
```

`main` is not called here: there are no parentheses. The **function object itself** is stored as a default value, so after parsing, `args.func` *is* `backup.main`. Then `cli.py` calls it with `args.func(args)`.

This works because in Python **functions are objects**: they can be stored in variables, lists, dictionaries or attributes, and called later ([[py:5#5|functions are objects]]). It is the same idea as a *callback*.

Inside, `backup.main` decides what to do from `args.cmd`:

```python um/backup.py estatico
def main(a):
    if a.cmd == "create":
        create(a.src, a.name, a.note or "")
    elif a.cmd == "list":
        ...
    elif a.cmd == "restore":
        restore(a.name, a.to, a.snapshot, a.clean, a.yes)
```

`a.note or ""` uses `or` to give a default: if `--note` was not given, `a.note` is `None`, which is falsy, so the expression returns `""`. Remember that `or` returns **one of its operands**, not `True` or `False` ([[py:2#7|`and`, `or`, `not`]]).

## Try it: a tiny CLI

This is the same structure in miniature. `parse_args` receives a list, as a test would do:

```python mini_cli.py
import argparse

def greet(args):
    msg = f"Hello, {args.name}!"
    print(msg.upper() if args.shout else msg)

def add(args):
    print(args.a + args.b)

ap = argparse.ArgumentParser(prog="mini")
sub = ap.add_subparsers(dest="cmd")

p = sub.add_parser("greet")
p.add_argument("name")
p.add_argument("--shout", action="store_true")
p.set_defaults(func=greet)

p = sub.add_parser("add")
p.add_argument("a", type=int)
p.add_argument("b", type=int)
p.set_defaults(func=add)

for line in (["greet", "Ana"], ["greet", "Ana", "--shout"], ["add", "2", "40"]):
    args = ap.parse_args(line)
    print(line, "->", args.func.__name__, end=": ")
    args.func(args)
```

::: ojo
**A small trap in the real code:** `sprite.py` has an option called `--from`. `argparse` stores it as an attribute named `from`, but `args.from` is a **syntax error**, because `from` is a keyword. So the code reads it with `getattr(a, "from")`. `getattr` takes the name as a string, so any name works.
:::

## The whole path

```text
um backup create C:\Saves --name terraria
  └─ bin/um ──► python -m um
       └─ um/__main__.py ──► cli.main()
            ├─ import um.scan, um.fal, ... um.backup   (each one calls register(sub))
            ├─ parse_args  ──► Namespace(group='backup', cmd='create', src='C:\\Saves',
            │                            name='terraria', note=None, func=<function backup.main>)
            └─ args.func(args) ──► backup.main(args) ──► backup.create('C:\\Saves', 'terraria', '')
```

::: nota English corner
- ***show that group's help*:** the comment uses *that* as a determiner ("ese grupo"), not as a relative pronoun. Context tells you which one it is.
- **Imperative help texts:** *"snapshot a folder"*, *"list snapshots"*, *"restore the latest snapshot"*. Help texts and docstrings usually start with a verb in the base form. See [[en:1#El sujeto nunca se omite|the subject in English]].
- ***before* + subject + verb:** *"save folders **before you touch** them"*: in a time clause about the future, English uses the present simple, not *will*. See [[en:5#La regla de when + presente|*when* + present]].
- ***files created after the snapshot*:** a past participle used like a relative clause (*files that were created*). See [[en:15#Participle clauses|participle clauses]].
:::
