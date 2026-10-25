# 15 · The knowledge base: YAML notes, search and pull requests

The knowledge base is what makes universal-modder more than a toolbox. Every agent that finishes a mod writes a **field note**, and the next agent searches those notes before starting. `kb.py` (about 480 lines) handles the whole cycle: finding the notes, searching them, creating a new one from a template, validating it, rebuilding the index, and opening a pull request on GitHub.

::: claves
- A note is **Markdown with YAML front matter**; a regular expression with `re.S` separates the two parts.
- The notes are found locally or **synced from GitHub** into a cache, swapped in atomically.
- `search` gives **weighted scores**: a match in the title counts more than one in the body.
- `_term` uses a **negative lookbehind** so that `rust` doesn't match `trust`.
- `check_note` collects every problem in two lists, `fails` and `warns`, instead of stopping at the first.
- Imports **inside functions** avoid a circular import between `kb.py`, `scan.py` and `publish.py`.
- `um kb pr` is a **dry run** unless you pass `--yes`.
:::

## What a note looks like

```text knowledge/games/terraria/fal-arsenal.md
---
kind: game
title: "Homing missiles and a tactical nuke in Terraria"
game: "Terraria"
engine: xna-fna
route: loader-api
status: working
agents: ["Claude Code (Opus 5.5)"]
date: 2026-09-30
---

# Homing missiles and a tactical nuke in Terraria

## Setup
...
## Route and why
...
## Gotchas
1. **Symptom.** ... **Cause:** ... **Fix:** ...
```

The part between the `---` lines is **YAML**, a format for structured data that is easy for humans to write. The rest is normal Markdown. This "front matter" format is common in static websites and documentation tools.

## Where are the notes?

```python um/kb.py estatico
def local_root() -> Path | None:
    """knowledge/ of the repo this package runs from (clone, plugin, editable install), or of the cwd's repo."""
    here = Path(__file__).resolve().parents[1] / "knowledge"
    if (here / "TEMPLATE.md").exists():
        return here
    for d in [Path.cwd(), *Path.cwd().parents]:
        if (d / "knowledge" / "TEMPLATE.md").exists():
            return d / "knowledge"
    return None
```

- First, look next to the code itself (`parents[1]` of this file is the repository root).
- Then look in the current folder **and every folder above it**. `[Path.cwd(), *Path.cwd().parents]` builds one list: the current folder, then the unpacked sequence of its parents ([[py:4#6|`*` in list literals]]). It is the same search that `git` does to find a repository.
- `TEMPLATE.md` works as a **marker file**: a folder called `knowledge` that has it is the right one.

If there is no local copy (for example, the tool was installed with `uv tool install`), the notes are downloaded from GitHub into a cache:

```python um/kb.py estatico
def sync(quiet: bool = False) -> Path:
    """Mirror knowledge/ from GitHub into the cache (git tree API + raw files; no auth needed)."""
    ...
    root = cache_root()
    tmp = root.with_name("knowledge.tmp")
    shutil.rmtree(tmp, ignore_errors=True)
    for p in paths:
        dst = tmp / p[len("knowledge/"):]
        dst.parent.mkdir(parents=True, exist_ok=True)
        ...download p into dst...
    shutil.rmtree(root, ignore_errors=True)
    tmp.rename(root)
    (root / ".synced").write_text(str(time.time()), **TEXT)
```

**Download into a temporary folder, then swap.** If the download fails halfway (no internet), the old cache is still intact, because it is only replaced at the very end, with a quick `rename`. Writing to a temporary location and then renaming is a classic way to make an update **all or nothing**.

The file `.synced` stores the time of the last sync. `resolve_root` syncs again if it is more than a day old (`time.time() - float(...) > 86400`: 86,400 seconds is 24 hours).

### `**TEXT`: the same options everywhere

```python um/kb.py estatico
# Notes and the index are UTF-8 with \n line ends on every OS. Without this, Windows reads and writes them in its
# ANSI code page with \r\n: the index's "·" separators come out as invalid UTF-8 and `um kb check --index` fails.
TEXT = {"encoding": "utf-8", "newline": "\n"}
...
    path.write_text(f"---\n{front}---\n{body}", **TEXT)
```

A dict of keyword arguments, unpacked with `**` in every call ([[py:5#3|unpacking with `**`]]). If the options ever change, there is one place to edit. The comment tells the story of the bug: on Windows, without an explicit encoding, Python uses the system's old code page, and characters like `·` are written in a way that isn't valid UTF-8 ([[py:10#7|files]]).

## Parsing a note

```python um/kb.py estatico
def parse(path: Path) -> tuple[dict, str]:
    text = path.read_text(encoding="utf-8", errors="replace")
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n?(.*)$", text, re.S)
    if not m:
        return {}, text
    import yaml
    try:
        meta = yaml.safe_load(m.group(1)) or {}
    except (yaml.YAMLError, ValueError) as e:  # ValueError: a date YAML can't build, e.g. 2026-09-31
        return {"_yaml_error": str(e)}, m.group(2)
    return (meta if isinstance(meta, dict) else {}), m.group(2)
```

- **The regular expression**: `^---` at the start, then **`(.*?)`** captures the YAML, then a line with `---`, then **`(.*)`** captures the rest.
- **`re.S`** (*DOTALL*) makes `.` match newlines too; without it, `.*` would stop at the end of the first line.
- **`.*?` is non-greedy**: it captures as **little** as possible, so it stops at the **first** closing `---`. A greedy `.*` would run to the **last** `---` in the file (a horizontal rule in the Markdown, for example).
- **`yaml.safe_load`**, never `yaml.load`: the plain version can create arbitrary Python objects from the file, which is dangerous with text written by others.
- **The comment explains a strange `ValueError`**: YAML turns `2026-09-31` into a date, and September has no 31st day. Instead of crashing, the error is returned as data (`_yaml_error`), so `check` can report it nicely.
- **`import yaml` inside the function**: only commands that parse notes need PyYAML.

```python front_matter.py
import re

text = """---
title: "A new boon god"
status: working
---
# A new boon god

Text.
---
More text after a horizontal rule.
"""
for name, pattern in [("non-greedy", r"^---\s*\n(.*?)\n---\s*\n?(.*)$"), ("greedy", r"^---\s*\n(.*)\n---\s*\n?(.*)$")]:
    m = re.match(pattern, text, re.S)
    print(f"{name}: front matter = {m.group(1)!r}")
print(re.match(r"^---\s*\n(.*?)\n---", text) is None)    # without re.S, . can't cross lines
```

## Searching

```python um/kb.py estatico
def _term(t: str) -> re.Pattern:
    """A search term that must start a word: "rust" finds "Rust" and "rusty", not "trust" or "frustum".
    A term that starts with punctuation (".esp", ".net") still matches anywhere, so it finds "plugin.esp"."""
    return re.compile((r"(?<![a-z0-9])" if t[:1].isalnum() else "") + re.escape(t))
```

- **`(?<![a-z0-9])`** is a *negative lookbehind*: "the character before is **not** a letter or digit". It doesn't consume any text; it only checks. So `rust` matches at the start of `rusty` but not inside `trust`.
- **`re.escape(t)`** escapes special characters, so a search for `.net` looks for a real dot, not "any character".
- **`t[:1].isalnum()`**: `t[:1]` is the first character, but slicing never fails, even for an empty string, while `t[0]` would raise `IndexError`.

The scoring:

```python um/kb.py estatico
        fields = {
            5: str(meta.get("title", "")),
            4: " ".join([str(meta.get("game", ""))] + [str(g) for g in meta.get("games_also") or []]),
            3: " ".join(str(x) for x in [meta.get("engine", ""), meta.get("route", ""), *(meta.get("tags") or []), *(meta.get("tools") or [])]),
        }
        low = body.lower()
        score = 0
        for t in terms:
            score += sum(w for w, f in fields.items() if t.search(f.lower()))
            score += min(5, len(t.findall(low)))
        if terms and score == 0:
            continue
```

- **A dict from weight to text.** Each search term adds 5 points if it appears in the title, 4 in the game name, 3 in the engine, route, tags or tools. The weights are the dict's **keys**, a neat trick: `sum(w for w, f in fields.items() if ...)` adds the weights of the fields that match.
- **`min(5, ...)`**: each mention in the body adds 1 point, but at most 5. Otherwise a long note that repeats a word 40 times would beat a short note whose **title** is exactly what you searched for. Capping is a simple, effective defence.
- **`*(meta.get("tags") or [])`** unpacks the tags into the list, with `or []` in case there are none.

```python search.py
import re

def term(t):
    return re.compile((r"(?<![a-z0-9])" if t[:1].isalnum() else "") + re.escape(t))

notes = [
    {"title": "A Rust DLL for Elden Ring", "body": "rust " * 3},
    {"title": "Trust issues with Unity mods", "body": "We trust BepInEx. " * 40},
    {"title": "Skyrim plugin.esp merging", "body": "Use xEdit."},
]

def search(words):
    terms = [term(w.lower()) for w in words]
    results = []
    for n in notes:
        score = 0
        for t in terms:
            score += 5 if t.search(n["title"].lower()) else 0
            score += min(5, len(t.findall(n["body"].lower())))
        if score:
            results.append((score, n["title"]))
    return sorted(results, reverse=True)

print(search(["rust"]))
print(search([".esp"]))
print(term("rust").search("frustum") is None)
```

## Validating a note

`check_note` is a long function, and its structure is the lesson: it never stops at the first problem.

```python um/kb.py estatico
def check_note(path: Path, root: Path | None = None) -> tuple[list[str], list[str]]:
    from um.publish import DECOMP_PATTERNS, SECRET_PATTERNS
    fails, warns = [], []
    ...
    kind = meta.get("kind", "game")
    for k in GAME_KEYS if kind == "game" else TECH_KEYS:
        if meta.get(k) in (None, "", []):
            fails.append(f"missing front-matter key: {k}")
    if kind == "game":
        if meta.get("route") and meta["route"] not in ROUTES:
            fails.append(f"route {meta['route']!r} not one of: {', '.join(ROUTES)}")
        from um.scan import ENGINES
        if meta.get("engine") and meta["engine"] not in ENGINES and meta["engine"] != "unknown":
            warns.append(f"engine {meta['engine']!r} isn't one of um scan's keys ...")
    ...
    for label, rx in SECRET_PATTERNS:
        if rx.search(text):
            fails.append(f"{label} in the note - remove it")
    ...
    return fails, warns
```

- **Two lists**: `fails` (the note is rejected) and `warns` (worth fixing, but allowed). The function returns both, and the caller prints everything at once. An agent can fix all the problems in one go instead of discovering them one by one.
- **`meta.get(k) in (None, "", [])`** treats a missing key, an empty string and an empty list as "missing" in one test.
- **`{meta['route']!r}`** shows the value with quotes, so an invalid value with a stray space (`'loader-api '`) is visible in the message.

### Imports inside functions: avoiding a circle

`kb.py` needs `ENGINES` from `scan.py` and the secret patterns from `publish.py`. But `scan.py` is imported when the CLI starts, and at least one of these modules could, one day, import `kb.py` too. Two modules that import each other at the top create a **circular import**: one of them is used before it has finished loading, and names are missing ([[py:11#7|circular imports]]).

Putting the import **inside the function** delays it until the function runs, when every module has long finished loading. It also keeps `um kb search` fast: it doesn't load `publish.py` unless it needs to check a note. And it reuses the rules: the secret patterns are written once, in `publish.py`, and used by both commands.

## Rebuilding the index

```python um/kb.py estatico
def build_index(root: Path) -> tuple[str, list[dict]]:
    rows = []
    for p, meta, _ in notes(root):
        rows.append(dict(path=p.relative_to(root).as_posix(), **{k: (v.isoformat() if isinstance(v, dt.date) else v) for k, v in meta.items()}))
    games = sorted([r for r in rows if r.get("kind", "game") == "game"], key=lambda r: (str(r.get("game", "")).lower(), str(r.get("date", ""))))
    ...
    esc = lambda s: str(s or "").replace("|", "\\|")
    lines = ["# Knowledge base index", "", ..., "| Game | Note | Engine | Route | Status | Agents | Date |", "|---|---|---|---|---|---|---|"]
    for r in games:
        ...
        lines.append(f"| {g} | [{esc(r.get('title'))}]({r['path']}) | {esc(r.get('engine'))} | ... |")
    ...
    return "\n".join(lines), rows
```

- **`for p, meta, _ in notes(root)`**: `_` is the conventional name for a value you don't need (here, the body).
- **Dates become text** with `isoformat()` (`2026-09-30`), because JSON has no date type.
- **Sorting by a tuple**: first by game name, then by date ([[py:12#2|sorting]]).
- **`esc`** escapes `|`, which would break a Markdown table cell.
- **The function returns two things**: the Markdown text for humans (`INDEX.md`) and the list of rows for programs (`index.json`). One source, two views, as in chapter 7.

The CI runs `um kb check --index`, which rebuilds the index **in memory** and fails if it differs from the file in the repository. Nobody can forget to regenerate it.

## Opening a pull request, carefully

```python um/kb.py estatico
def open_pr(path: Path, yes: bool):
    """Branch + commit the note (and its media + regenerated index) + push to your fork + gh pr create."""
    ...
    fails, _ = check_note(path, root)
    if fails:
        die("fix these first:\n  " + "\n  ".join(fails))
    branch = f"kb/{slug(meta.get('game', '') or 'technique')}-{slug(meta.get('title', 'note'))}"[:80]
    ...
    cmds = [["git", "checkout", "-b", branch], ["um", "kb", "index"],
            ["git", "add", str(path), str(root / "INDEX.md"), str(root / "index.json"), *map(str, media)],
            ["git", "commit", "-m", title]]
    ...
    if not yes:
        print("dry run (add --yes after your human agrees):")
        for c in cmds:
            print("  " + " ".join(c if len(" ".join(c)) < 200 else c[:6] + ["..."]))
        return
    ...
```

- **The note must pass `check` first.** No broken note reaches the shared repository.
- **The commands are built as data first** (a list of lists), and only then either **printed** or **run**. Because the same list is used for both, the dry run shows *exactly* what would happen.
- **`--yes` is required to act.** The message says when to add it: *after your human agrees*. Publishing is one of the actions the project's rules say an agent must not do without asking (chapter 1). The default is safe, and acting requires an explicit choice.
- **`*map(str, media)`** converts every media path to a string and unpacks them into the `git add` command.

::: nota English corner
- ***written by agents for agents*:** a passive participle without *that are*: notes (that are) written by agents. See [[en:8#Activa contra pasiva|the passive]].
- ***Ask your human before `um kb pr --yes`*:** a friendly, slightly funny way to say "the person you work for". The imperative again.
- ***must start a word*:** *must* for a rule or requirement: [[en:6#Obligación, prohibición y necesidad|obligation]].
- ***Without this, Windows reads and writes them in its ANSI code page*:** *without* + noun to describe what happens if something is missing; a zero conditional in meaning ("if we don't do this, Windows reads..."). See [[en:7#Los cuatro condicionales|conditionals]].
:::
