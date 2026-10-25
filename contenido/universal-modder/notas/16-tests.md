# 16 · Tests: how the project checks itself

universal-modder controls games, GPUs, Windows APIs and paid web services. None of those are available on a test server. Yet the project has 48 test functions that run in a few seconds on any machine. This chapter shows how: **fake folders**, **replaced functions**, and **tests that protect conventions**, not just code.

The file starts by saying what it covers:

> *Offline tests for the pieces that don't need a game, a GPU or a fal key.*

::: claves
- The tests use **pytest**: plain functions whose names start with `test_`, checked with `assert`.
- **`tmp_path`** gives each test an empty temporary folder; the tests build fake game folders in it.
- **`monkeypatch`** replaces a function or a value for the duration of one test.
- **Fixtures** prepare shared setup; **`parametrize`** runs the same test with several inputs.
- **`pytest.raises(SystemExit)`** checks that an error really stops the program.
:::

## pytest in one minute

```python tests/test_um.py estatico
def test_sheet_slice_roundtrip():
    frames = [Image.new("RGBA", (8, 8), (i * 40, 0, 0, 255)) for i in range(5)]
    sh = sprite.sheet(frames, cols=3)
    assert sh.size == (24, 16)
    assert len(sprite.slice_sheet(sh, 8, 8)) == 5
```

pytest finds every function named `test_...`, runs it, and reports which ones fail. A test fails if an `assert` is false or if an exception escapes. There is no special assertion API: a plain `assert` is enough, and pytest shows the values on both sides when it fails ([[py:10#5|`assert`]], [[py:12#4|testing]]).

This test is a **round trip**: pack 5 frames into a sheet, slice the sheet, and check that you get 5 frames back. Round trips are a powerful way to test pairs of functions (save/load, encode/decode, pack/slice).

## Fake game folders

The engine detection from chapter 7 needs a game folder. The tests make tiny fake ones:

```python tests/test_um.py estatico
def make(root: Path, files: dict):
    for rel, data in files.items():
        p = root / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_bytes(data if isinstance(data, bytes) else data.encode())


def engine_of(tmp_path, files):
    make(tmp_path, files)
    hits, _ = scan.detect(scan.Index(tmp_path))
    return hits[0][0], hits[0][3]


def test_unity_mono_and_version(tmp_path):
    key, det = engine_of(tmp_path, {
        "UnityPlayer.dll": b"MZ", "Game_Data/Managed/Assembly-CSharp.dll": b"MZ",
        "Game_Data/globalgamemanagers": b"\0" * 20 + b"2022.3.21f1\0" + b"\0" * 100,
        "Game_Data/app.info": "Studio\nCoolGame",
    })
    assert key == "unity-mono"
    assert det["version"] == "2022.3.21f1" and det["product"] == "CoolGame"
```

- **`tmp_path`** is a **fixture** provided by pytest: when a test function has a parameter with that name, pytest creates a fresh empty folder and passes its path. Each test gets its own, so tests can't disturb each other.
- **A whole "Unity game" in four tiny files.** `UnityPlayer.dll` only needs to exist, so it contains just `MZ`. The version file contains the version string surrounded by zero bytes, which is all `unity_version` (chapter 6) looks at.
- This works because the detection code reads **only what it needs**: names and a few bytes. Designing code so it can be tested this way is a skill in itself.

The same trick tests the Unreal version search (a fake `.exe` with a UTF-16 string inside), Godot (`GDPC` plus four integers made with `struct.pack`) and the PE reader.

## `monkeypatch`: replacing things for one test

What about code that reads the Windows registry, calls PowerShell or downloads from the internet? The tests **replace** those functions:

```python tests/test_um.py estatico
def test_steam_root_from_registry(tmp_path, monkeypatch):
    ...
    root = tmp_path / "Steam"
    ...
    monkeypatch.setattr(scan, "steam_registry_root", lambda: root)
    ...
```

`monkeypatch.setattr(module, "name", new_value)` replaces `scan.steam_registry_root` with a lambda that returns a fake path. When the test ends, pytest **puts the original back** automatically.

Why does this work? Because `steam_roots()` calls `steam_registry_root()` by looking up the name **at call time**, in the module's global namespace ([[py:6#2|the LEGB rule]]). Replacing the attribute of the module changes what that lookup finds. (This is also why `from module import name` and `import module` behave differently when something is patched: [[py:11#2|`from ... import` copies the reference]].)

### Controlling time

The backup tests need several snapshots **in the same second**, to test the numbered suffixes from chapter 14. Real clocks don't cooperate, so the test stops time:

```python tests/test_um.py estatico
@pytest.fixture
def backup_same_second(tmp_path, monkeypatch):
    monkeypatch.setattr(backup, "data_dir", lambda: tmp_path / "data")
    monkeypatch.setattr(backup.time, "strftime", lambda *args: "20261006-120000")


def test_backup_same_second_keeps_every_snapshot(tmp_path, backup_same_second):
    src = tmp_path / "src"
    paths = []
    for i in range(12):
        make(src, {"save.dat": f"version {i}"})
        paths.append(backup.create(str(src), name="t", note=f"take {i}"))

    assert len(set(paths)) == 12
    assert paths[0].name == "20261006-120000.zip"  # keep the existing filename format when available
    assert backup.snapshots("t") == paths         # latest selection still works after ten collisions
    ...
```

- **`@pytest.fixture`** turns a function into reusable setup. Any test that lists `backup_same_second` as a parameter gets it applied. Fixtures can use other fixtures (`tmp_path`, `monkeypatch`), like building blocks. The decorator syntax is the one from your notes ([[py:8#5|decorators]]).
- **`lambda *args: "20261006-120000"`**: a fake `strftime` that accepts any arguments and always returns the same time ([[py:5#6|`lambda`]]).
- **12 snapshots**, more than 10, on purpose: the comment *"after ten collisions"* refers to the `_10` before `_9` sorting problem. The test reproduces the exact situation that would expose the bug.
- **`len(set(paths)) == 12`**: putting the paths in a set removes duplicates, so 12 means "all different".

## `parametrize`: one test, many cases

```python tests/test_um.py estatico
@pytest.mark.parametrize("alpha", [1, 64, 128, 192, 254, 255])
@pytest.mark.parametrize("operation", ["fit", "sheet", "squash"])
def test_sprite_placement_preserves_rgba(alpha, operation):
    # Placing a frame on a transparent canvas must not apply its alpha twice.
    im = Image.new("RGBA", (8, 8), (200, 100, 50, alpha))
    ...
```

Two stacked `parametrize` decorators produce **every combination**: 6 alpha values × 3 operations = **18 test cases** from one function. Each one is reported separately, so a failure says exactly which case broke. The comment states the bug this test prevents: pasting an image with partial transparency could apply its alpha **twice**, making semi-transparent pixels too faint.

## Checking that errors stop the program

```python tests/test_um.py estatico
    with pytest.raises(SystemExit):
        fal.download_outputs(res, tmp_path, "clip")
    ...
    assert (tmp_path / "clip_thumb.png").read_bytes() == b"ok"   # the other outputs still saved
```

`die()` raises `SystemExit` (chapter 4), so `pytest.raises(SystemExit)` is how the tests say "this call must fail". The `with` block passes only if the exception is raised inside it. Then the test checks the **promise** from chapter 11: even though one download failed, the other files were saved.

Other tests use **`capsys`**, a fixture that captures what the code prints, to check the error messages themselves. For a tool whose users are AI agents, the wording of an error is part of the interface.

## Fake objects

The recorder from chapter 12 starts ffmpeg with `subprocess.Popen`. The test replaces `Popen` with a small class that **records the command** instead of running it:

```python tests/test_um.py estatico
    monkeypatch.setattr(win, "is_wsl", lambda: False)   # under WSL, Recorder calls wslpath through the patched Popen
    monkeypatch.setattr(win, "ffmpeg_win", lambda *a, **k: "ffmpeg")
    monkeypatch.setattr(win, "encoder", lambda: "libx264")
    monkeypatch.setattr(win.subprocess, "Popen", FakePopen)
    win.Recorder(exe="Game.exe", out=str(tmp_path / "take"), audio=False).start()
```

`FakePopen` only needs the methods and attributes the recorder actually uses. Python doesn't care that it isn't a real `Popen`: if it has the right methods, it works. That is **duck typing** again, and it is what makes this kind of testing so easy in Python ([[py:9.1#7|duck typing]]). After `start()`, the test inspects the recorded ffmpeg command and checks the colour settings it asks ffmpeg for (the BT.709 colour tags that browsers expect).

## Tests that protect conventions

Two tests don't test Python code at all:

```python tests/test_um.py estatico
def test_repo_knowledge_is_valid():
    ...

def test_skill_copies_match():
    ...
```

- **`test_repo_knowledge_is_valid`** runs `check_note` (chapter 15) on every field note in the repository. A contributor can't merge a broken note.
- **`test_skill_copies_match`** checks that `.claude/skills` and `.agents/skills` are exact copies of `skills/` (chapter 2). A human editing one copy and forgetting the others gets a failing test, with a message saying what to do.

**A rule written in a document can be forgotten; a rule checked by a test can't.** That idea runs through the whole project: the safety rules built into the tools, `kb check` in CI, and these tests.

## Try it: the same ideas without pytest

pytest isn't available in this page, but the core ideas need nothing special. Here a fake replaces a function in a module, a test checks a `SystemExit`, and the original comes back at the end:

```python mini_tests.py
import sys, types

# a tiny "module" with a function that depends on the outside world
scan = types.ModuleType("scan")
exec('''
def registry_root():
    raise OSError("no registry on this machine")

def steam_roots():
    try:
        return [registry_root()]
    except OSError:
        return []
''', scan.__dict__)

def die(msg):
    sys.exit(1)

def test_roots_with_fake_registry():
    original = scan.registry_root
    scan.registry_root = lambda: "C:/Steam"          # monkeypatch by hand
    try:
        assert scan.steam_roots() == ["C:/Steam"]
    finally:
        scan.registry_root = original                # always restore

def test_roots_without_registry():
    assert scan.steam_roots() == []

def test_die_stops():
    try:
        die("boom")
    except SystemExit as e:
        assert e.code == 1
    else:
        raise AssertionError("die() did not stop")

for name, fn in list(globals().items()):
    if name.startswith("test_"):
        fn()
        print("PASS", name)
```

Notice the `try` / `except` / `else` in `test_die_stops`: the `else` runs only if **no** exception was raised, which here means the test should fail ([[py:10#1|`try`, `except`, `else`, `finally`]]). And the `finally` in the first test restores the original even if the assertion fails, which is exactly what `monkeypatch` does for you.

::: nota English corner
- ***the pieces that don't need a game*:** *don't* agrees with the plural *pieces*; with a singular subject it would be *doesn't*. See [[en:1#Concordancia: cuándo el verbo cambia|subject-verb agreement]].
- ***must not apply its alpha twice*:** *must not* = it is not allowed (a requirement), not "doesn't have to". See [[en:6#Obligación, prohibición y necesidad|*mustn't* versus *don't have to*]].
- ***keep the existing filename format when available*:** *when available* = "when it is available", a reduced clause.
- ***the other outputs still saved*:** a reduced passive: the other outputs **were** still saved. See [[en:8#La pasiva en todos los tiempos|the passive]].
:::
