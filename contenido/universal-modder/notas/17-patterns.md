# 17 · Patterns worth stealing

You have now read most of universal-modder. This last chapter collects the ideas that kept coming back, so you can recognise them in other projects and use them in your own code. Each one links to the chapter where it appeared and to the Python topic behind it. At the end there are exam-style questions about the code you read.

## Python idioms

| Pattern | Example from the code | Python topic |
|---|---|---|
| `x or default` for missing values | `a.note or ""`, `headers or {}`, `(g["name"] or "")` | [[py:2#7|`or` returns an operand]] |
| Guards that rely on short-circuiting | `len(p) > 6 and p[6] == "/"`, `q and q in name` | [[py:2#7|short-circuit]] |
| A set to remember, a list to keep order | `steam_roots`, the names `used` in `download_outputs` | [[py:4#3|sets]] |
| `next(gen, default)` for "the first match, or nothing" | `probe`, the `KNOWN` routes in `scan` | [[py:8#1|iterators]] |
| `any()` / `all()` with a generator, which stop early | `Index.has`, workflow validation in `comfy` | [[py:7#6|generator expressions]] |
| `iter(callable, sentinel)` to read in chunks | hashing in `backup`, `publish`, `win` | [[py:8#1|iterators]] |
| A recursive generator with `yield from` | `_urls_in` | [[py:8#2|generators]] |
| `dict(defaults, **overrides)` / `{**a, **b}` | EDL transitions, fal recipes | [[py:4#6|unpacking]] |
| Copy before modifying shared data | `dict(PRESETS[name])`, `json.loads(json.dumps(wf))` | [[py:3#5|copies]] |
| Mutate in place when someone else holds the reference | `dirnames[:] = ...` in `os.walk` | [[py:3#4|aliasing]] |
| Inner functions (closures) for small helpers | `add` in `detect`, `is_bg` in `cutout`, `cmd` in `register` | [[py:6#7|closures]] |
| Functions stored and called later | `set_defaults(func=main)` → `args.func(args)` | [[py:5#5|functions are objects]] |
| `for ... else` for "no match found" | the Godot check in `detect` | [[py:7#2|loops with `else`]] |
| Sorting with a key, and stable ties | `sort(key=lambda h: -h[1])`, `(len(k), k)` | [[py:12#2|sorting]] |
| `-(-a // b)` for ceiling division | `sheet`, `contact` | [[py:2#2|`//`]] |

## Design habits

| Habit | Where you saw it |
|---|---|
| **Knowledge as tables**, logic as short generic code | engine, loader and anti-cheat tables (ch. 7); secret patterns (ch. 14) |
| **One data structure, two views** (JSON for programs, text for humans) | `scan` report (ch. 7); `kb` index (ch. 15) |
| **Errors that say how to fix them** | `fal_key`, `load_workflow`, `die(...)` everywhere |
| **Narrow `except` clauses**, and `BaseException` only to clean up and re-raise | `run` (ch. 4); `backup.create` (ch. 14) |
| **Retry transient failures** with growing pauses; give up on permanent ones | `_req` in `fal` (ch. 10) |
| **Never lose paid-for work**: keep going, report the request ID | `download_outputs` (ch. 11); fal timeouts (ch. 10) |
| **All-or-nothing writes**: temporary file + rename, or mode `"x"` | `kb sync` (ch. 15); snapshots (ch. 14) |
| **Dry run by default**; act only with `--yes` | `backup restore` (ch. 14); `kb pr` (ch. 15) |
| **Make destructive actions undoable** | the automatic pre-restore snapshot (ch. 14) |
| **Verify what you download** | the ffmpeg SHA-256 check (ch. 12) |
| **Safety rules built into the tools**, not only written in documents | `kill` takes only a PID (ch. 12); `publish check` (ch. 14) |
| **Rules checked by tests** | skill copies, valid notes, the index in CI (ch. 16) |
| **Comments that explain *why***, often the bug a line prevents | the `ONLINE_ONLY` comment, `TEXT`, `strict_timestamps`, `chr(92)` |

## Exam-style questions about the code

These questions use code you read in this tour. Try to answer before checking.

::: pregunta What does this print?
```python estatico
dirs = ["a", ".git", "b"]
alias = dirs
dirs = [d for d in dirs if d != ".git"]
print(alias)
```
- [ ] ['a', 'b']
- [x] ['a', '.git', 'b']
- [ ] []
- [ ] It raises an error
::: solucion Explanation
`dirs = [...]` makes the name `dirs` point to a **new** list; `alias` still points to the original one, which never changed. To change the list that `alias` sees, you need slice assignment: `dirs[:] = [...]`. That is exactly why `scan.Index` writes `dirnames[:] = ...` inside `os.walk` (chapter 6).
:::
:::

::: pregunta What is the value of `-(-7 // 3)`?
- [ ] -2
- [ ] 2
- [x] 3
- [ ] -3
::: solucion Explanation
`-7 // 3` is `-3`, because `//` rounds **towards minus infinity** (−2.33 → −3). Negating gives `3`, which is `ceil(7 / 3)`. `sprite.sheet` uses this to compute how many rows a sheet needs (chapter 8).
:::
:::

::: pregunta `die()` calls `sys.exit(1)`. Which `except` clause catches it?
- [ ] `except Exception:`
- [ ] `except RuntimeError:`
- [x] `except SystemExit:`
- [ ] None: `sys.exit` can't be caught
::: solucion Explanation
`sys.exit()` raises `SystemExit`, which inherits from `BaseException`, not from `Exception`. So `except Exception` does **not** catch it, but `except SystemExit` (or `except BaseException`) does. `fal.upload` catches it on purpose to try a fallback (chapter 10).
:::
:::

::: pregunta In `detect()`, the inner function `add()` calls `hits.append(...)` on a list defined in `detect()`. Why doesn't it need `nonlocal hits`?
- [ ] Because lists are global by default
- [x] Because it mutates the list but never assigns to the name `hits`
- [ ] Because `append` is a built-in function
- [ ] It does need it: without `nonlocal` it raises `UnboundLocalError`
::: solucion Explanation
`nonlocal` is only needed to **rebind** a name of the enclosing function (`hits = ...`). Calling a method that changes the object (`hits.append(...)`) only **reads** the name, which the LEGB rule finds in the enclosing scope (chapter 7).
:::
:::

::: pregunta What does this print?
```python estatico
def find(files):
    for f in files:
        if f.endswith(".pck"):
            break
    else:
        return "embedded?"
    return "pack"

print(find([]), find(["a.pck"]))
```
- [ ] pack pack
- [x] embedded? pack
- [ ] embedded? embedded?
- [ ] It raises an error with the empty list
::: solucion Explanation
The `else` of a `for` loop runs when the loop ends **without `break`**. With an empty list the loop runs zero times, never breaks, so the `else` runs. With `["a.pck"]` the loop breaks, the `else` is skipped, and the function returns `"pack"` (chapter 7).
:::
:::

::: pregunta `PRESETS = {"side": {"headings": 2}}`. A function does `cam = PRESETS["side"]` and then `cam["headings"] = 8`. What is `PRESETS["side"]["headings"]` afterwards?
- [ ] 2
- [x] 8
- [ ] It raises `TypeError`, because dict values are read-only
- [ ] It depends on whether the function returned `cam`
::: solucion Explanation
`cam = PRESETS["side"]` doesn't copy anything: `cam` is a second name for the **same** dict, so changing it changes the global table. `render3d` avoids this with `cam = dict(PRESETS[preset])`, a shallow copy (chapter 13).
:::
:::

::: pregunta Which expression sorts the node ids `["10", "9", "25"]` as `["9", "10", "25"]` and also works for ids that are not numbers?
- [ ] `sorted(ids)`
- [ ] `sorted(ids, key=int)`
- [x] `sorted(ids, key=lambda k: (len(k), k))`
- [ ] `sorted(ids, reverse=True)`
::: solucion Explanation
Plain `sorted` compares text, so `"10"` comes before `"9"`. `key=int` works but raises `ValueError` for an id like `"node_a"`. The tuple key sorts by length first and then alphabetically, which gives natural order for numbers and still works for any string (chapter 11).
:::
:::

::: pregunta Why does `publish check` compare file **sizes** before computing any hash?
- [ ] Because hashes can't be computed for big files
- [ ] Because two files with the same size are always identical
- [x] Because identical files always have the same size, and reading a size is almost free, so most files never need hashing
- [ ] Because SHA-1 is not secure
::: solucion Explanation
Equal content implies equal size, but not the other way round. Grouping the game's files by size in a dict means a mod file whose size doesn't appear is skipped at once (O(1) lookup), and only same-size candidates are hashed (chapter 14).
:::
:::

::: pregunta What does this print?
```python estatico
def frange(a, b, step):
    t = a
    while t <= b:
        yield t
        t += step

print(len(list(frange(0, 0.3, 0.1))))
```
- [ ] 4
- [x] 3
- [ ] 2
- [ ] It never stops
::: solucion Explanation
`0.1 + 0.1 + 0.1` is `0.30000000000000004`, slightly more than `0.3`, so the last value is skipped and only 0, 0.1 and 0.2 are produced. The real `video.frange` compares with `b + 1e-9` to include it (chapter 13).
:::
:::

::: pregunta The test `test_steam_root_from_registry` uses `monkeypatch.setattr(scan, "steam_registry_root", lambda: root)`. Why does `scan.steam_roots()` then use the fake function?
- [ ] Because `monkeypatch` rewrites the source code of `scan.py`
- [x] Because `steam_roots()` looks up the global name `steam_registry_root` in the module every time it runs
- [ ] Because lambdas always take priority over normal functions
- [ ] Because pytest runs every test in a new Python process
::: solucion Explanation
Names inside a function are resolved **when the function runs**, following LEGB. `steam_registry_root` is a global of the `scan` module, and `setattr` replaced that global. The next call finds the fake. pytest restores the original when the test ends (chapter 16).
:::
:::

## Where to go next

- **Read the rest of the code.** You have seen the main parts; `comfy.py`, `video.py` and the Blender script `um/blender/render_sprites.py` have more to discover, and you now know all the patterns they use.
- **Read a field note.** The notes in `knowledge/games/` are real stories of how agents modded games, written in clear technical English. They are good reading practice, and you will recognise the commands.
- **Re-read with a different goal.** On a second pass, ignore the Python and read only the comments and docstrings, as English practice. They are short, precise, and full of the structures from the *English corner* boxes.

::: nota English corner
- ***worth stealing*:** *worth* + *-ing*: "que vale la pena robar", a playful way to say "worth copying". See [[en:10#Verbos seguidos de -ing|verbs and expressions with -ing]].
- ***kept coming back*:** *keep* + *-ing* in the past: the ideas appeared again and again.
- ***Try to answer before checking*:** *try to* + base = make an effort to do something; *before* + *-ing*. Compare *try doing* = experiment with something. See [[en:10#Verbos que admiten las dos formas|verbs with both forms]].
- ***you now know all the patterns they use*:** a relative clause without *that*: *the patterns (that) they use*. See [[en:11.1#Pronombres relativos|relative pronouns]].
:::
