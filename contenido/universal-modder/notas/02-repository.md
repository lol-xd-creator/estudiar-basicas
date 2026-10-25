# 2 · Anatomy of the repository

A repository is easier to read when you know where things are. This chapter walks through the folders, then looks at two small files that decide **how Python finds and starts the program**: `pyproject.toml` and the launcher script `bin/um`.

## The folders

```text
universal-modder/
├── bin/um                 launcher script (bash)
├── um/                    the Python package: one module per command group
│   ├── __init__.py        package docstring + version
│   ├── __main__.py        what `python -m um` runs
│   ├── cli.py             builds the command line
│   ├── common.py          helpers shared by every module
│   ├── scan.py  kb.py  sprite.py  fal.py  comfy.py  render3d.py
│   ├── win.py   video.py  backup.py  publish.py
│   ├── ps1/               PowerShell tools (with C# inside) for Windows
│   ├── blender/           a script that runs inside Blender
│   └── fonts/             fonts for video titles
├── skills/                instructions for the agents (Markdown)
├── .claude/skills/        a copy of skills/ for Claude Code
├── .agents/skills/        a copy of skills/ for other agents
├── knowledge/             field notes + INDEX.md
├── examples/              three complete example mods
├── tests/test_um.py       the test suite
├── pyproject.toml         package metadata
└── AGENTS.md              instructions every agent reads first
```

Three things are worth noticing:

- **The code is small.** The whole `um/` package is about 4,400 lines of Python. You could read all of it in a weekend; this reading covers the most interesting parts.
- **One module per command group.** `um scan` lives in `scan.py`, `um sprite` in `sprite.py`, and so on. When you want to know how a command works, you know which file to open.
- **Non-Python files ship inside the package.** The PowerShell tools, the Blender script and the fonts live inside `um/`, so they are installed together with the code. Chapter 12 shows how Python finds them with `Path(__file__)`.

## `pyproject.toml`: declaring the package

A modern Python project describes itself in a file called `pyproject.toml`. This is the important part:

```text pyproject.toml
[project]
name = "universal-modder"
version = "0.2.0"
requires-python = ">=3.10"
dependencies = [
    "pillow>=10",
    "numpy>=1.24",
    "pyyaml>=6",
]

[project.scripts]
um = "um.cli:main"
```

- **`dependencies`:** the three external packages from chapter 1, with minimum versions. A tool like `pip` or `uv` reads this list and installs them, normally inside a *virtual environment* ([[py:11#8|pip, PyPI and virtual environments]]).
- **`requires-python = ">=3.10"`:** the code uses features that older versions don't have.
- **`[project.scripts]`:** this line creates a command. When the package is installed, a small executable called `um` is created, and running it means: *import the module `um.cli` and call its function `main()`*. The text `"um.cli:main"` is literally `module:function`.

::: idea
`um.cli` is a **dotted name**: the module `cli` inside the package `um`. A package is a folder with an `__init__.py`, and modules inside it are imported with dots ([[py:11#5|packages]]).
:::

## `bin/um`: the launcher

Inside a clone of the repository, nothing is installed yet. The script `bin/um` solves that. It is written in bash, not Python, but it is short and worth understanding:

```text bin/um (the end of the script)
if command -v uv >/dev/null 2>&1 && [ -z "${UM_NO_UV:-}" ]; then
  exec uv run --quiet --project "$ROOT" python -m um "$@"
fi
PY="$(command -v python3 || command -v python)"
PYTHONPATH="$ROOT${PYTHONPATH:+:$PYTHONPATH}" exec "$PY" -m um "$@"
```

In plain English:

1. **If `uv` is installed** (a fast tool that manages Python environments), use it. `uv run --project` creates an environment with the three dependencies the first time, then runs `python -m um` with all the arguments (`"$@"`).
2. **Otherwise,** find `python3` (or `python`) and run `python -m um`, adding the repository folder to **`PYTHONPATH`**.

Two Python ideas appear here:

- **`python -m um`** runs a package as a program. Python looks for the file `um/__main__.py` and executes it. Chapter 3 starts there.
- **`PYTHONPATH`** is an environment variable with extra folders where Python looks for modules. Adding the repository root means that `import um` finds the `um/` folder. Your notes explain the search path in [[py:11#6|where Python looks for modules]] (`sys.path`).

## `AGENTS.md`: instructions for the robots

`AGENTS.md` is not code, but it shapes the code. It tells every agent how the toolkit is organised, and it states a convention that you will see in every module:

> *Code lives in `um/`, one module per CLI group, each with `register(sub)` and a docstring that doubles as `--help`.*

So every command module has:

- a **docstring** at the top, with usage examples, that is also shown when you type `um scan --help`;
- a function **`register(sub)`** that adds its commands to the command line;
- one or more functions that do the work.

Nobody forces a module to follow this pattern: there is no base class or interface. `cli.py` simply calls `register` on each module and trusts that it exists. If it looks like a command module and behaves like one, it is one: that is **duck typing** ([[py:9.1#7|duck typing]]).

## Tests and copies

Two more details:

- **`tests/test_um.py`** has 48 test functions that run without a game, a GPU or an API key. Chapter 16 reads some of them.
- **The skill folders are copies.** Different agents look for skills in different places (`.claude/skills`, `.agents/skills`), so `skills/` is copied there. A test fails if the copies are different from the original. It is a nice trick: a **test** that protects a convention humans might forget.

::: nota English corner
- **Comments drop words.** *"launcher script (bash)"*, *"Works from a clone, a Claude Code plugin install, or a PATH symlink"*. Technical comments often omit the subject and articles to save space. In a full sentence you need them: *"**It** works from a clone"*. See [[en:1#El sujeto nunca se omite|the subject is never omitted]].
- **Passive voice in documentation:** *"`skills/` **is copied** there"*, *"a small executable **is created**"*. Documentation uses the passive when *what happens* matters more than *who does it*: [[en:8#Cuándo se usa la pasiva|when to use the passive]].
- ***double as*:** *"a docstring that **doubles as** `--help`"* means it also works as the help text. A common phrasal verb in technical English.
- **Relative clauses without commas:** *"a tool **that manages** Python environments"* identifies which tool. See [[en:11.1#Pronombres relativos|relative pronouns]].
:::
