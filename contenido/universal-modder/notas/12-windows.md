# 12 · Controlling Windows from Python

Games are awkward to automate. The module docstring of `win.py` explains why, in three sentences:

> *Games render with the GPU, so GDI screen grabs are black - Windows.Graphics.Capture (ffmpeg's gfxcapture) gets the real frames of one window even when covered. Many games talk to WASAPI directly, so the only clean way to get just the game's sound is a process-loopback capture. Input goes through SendInput only while the game is the foreground window, so nothing leaks into other apps.*

In other words: ordinary screenshots come out black, ordinary audio recording catches every sound on the PC, and fake keyboard input could end up in the wrong window. The solutions are external tools. Python's job is to **start them, talk to them, and stop them cleanly**.

::: claves
- `subprocess.run` starts a program and **waits** for it; `subprocess.Popen` starts it and **returns at once**, so Python can keep working while it runs.
- Programs talk through **pipes**: Python writes commands to the program's stdin and reads answers from its stdout.
- `Recorder` and `Drive` are classes with a **lifecycle**: start, use, stop/close.
- A downloaded tool is verified with **SHA-256** before it is used.
- `try` / `finally` guarantees that a recording is stopped even if something fails.
:::

## Running PowerShell

```python um/win.py estatico
def powershell(script: str, timeout: float = 60) -> str:
    _check_platform()
    r = subprocess.run([ps_exe(), "-NoProfile", "-NonInteractive", "-Command", script], capture_output=True, text=True, timeout=timeout,
                       cwd="/mnt/c" if is_wsl() else None)
    if r.returncode:
        die(f"powershell failed: {r.stderr.strip()[-1500:]}")
    return r.stdout.replace("\r", "")
```

- **`_check_platform()`** first: on Linux or macOS it stops with a message that suggests the right tools for those systems. A **guard** at the top keeps the rest of the function simple.
- **`capture_output=True, text=True`**: collect stdout and stderr as strings in `r.stdout` and `r.stderr`.
- **`if r.returncode:`**: by convention, 0 means success and any other number means failure. Since 0 is falsy, `if r.returncode` reads as "if it failed".
- **`replace("\r", "")`**: Windows ends lines with `\r\n`; removing `\r` gives clean Unix-style lines.

## Finding files that ship with the package

```python um/win.py estatico
HERE = Path(__file__).resolve().parent
TOOLS = HERE / "ps1"          # shipped inside the package so `uv tool install` gets them too
```

The PowerShell tools live in `um/ps1/`. Since the package can be installed anywhere, the code finds them **relative to its own file**. `__file__` is the path of `win.py`; `.parent` is its folder. This works whether the code runs from a clone or from an installed package.

```python um/win.py estatico
def tool_path(name: str) -> str:
    """Copy um/ps1/<name> to %LOCALAPPDATA% (PowerShell won't run scripts from \\\\wsl$ reliably); Windows path."""
    src = TOOLS / name
    dst = local_appdata() / "tools" / name
    dst.parent.mkdir(parents=True, exist_ok=True)
    if not dst.exists() or hashlib.sha1(dst.read_bytes()).digest() != hashlib.sha1(src.read_bytes()).digest():
        shutil.copyfile(src, dst)
    return to_win(dst)
```

PowerShell won't reliably run scripts stored inside WSL, so each tool is copied to a Windows folder first, but **only if it is missing or different**. Comparing hashes is a cheap way to ask "are these files identical?". The `or` short-circuits: if `dst` doesn't exist, the hashes are never computed (and reading a missing file would fail).

## Verifying a download

`um win setup` downloads ffmpeg from the internet. Running a program downloaded from the internet is risky, so the code checks it first:

```python um/win.py estatico
def download_ffmpeg(z: Path):
    """Download the ffmpeg zip to z and check its SHA-256 before anything is extracted."""
    want = ffmpeg_sha256()
    print("downloading", FFMPEG_URL)
    urllib.request.urlretrieve(FFMPEG_URL, z)
    h = hashlib.sha256()
    with open(z, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    if h.hexdigest() != want:
        z.unlink()
        die(f"ffmpeg download failed its checksum (got {h.hexdigest()}, expected {want}); deleted it. ...")
    print("sha256 ok", want)
```

- A **hash** (here SHA-256) is a short fingerprint of a file. If even one byte changes, the hash changes completely. Comparing it with the published hash detects a corrupt, truncated or swapped download.
- **`iter(lambda: f.read(1 << 20), b"")`** is the **two-argument form of `iter`**: it calls the function again and again, and stops when the function returns the *sentinel* value `b""` (an empty read means end of file). It reads the file in 1 MiB pieces, so even a 100 MB file needs little memory ([[py:8#1|iterators]]).
- **`h.update(chunk)`** feeds each piece to the hash; the result is the same as hashing the whole file at once.
- **On failure, the file is deleted** before anything is extracted, and the message explains what probably happened and what to do.

```python iter_sentinel.py
import hashlib, io

f = io.BytesIO(b"x" * 2_500_000)           # a fake 2.5 MB file in memory
h = hashlib.sha256()
sizes = []
for chunk in iter(lambda: f.read(1 << 20), b""):
    sizes.append(len(chunk))
    h.update(chunk)

print(sizes)
print(h.hexdigest() == hashlib.sha256(b"x" * 2_500_000).hexdigest())
```

The docstring of `ffmpeg_sha256` is a small lesson in security thinking: the published checksum *"catches corrupt, truncated or swapped downloads; it can't catch a compromised release, which is what the pin is for."* If an attacker controls the download site, they can change the checksum too; only a hash you checked yourself (an environment variable, `UM_FFMPEG_SHA256`) protects against that.

## Processes: JSON from PowerShell

```python um/win.py estatico
def processes(name: str | None = None) -> list[dict]:
    flt = f"-Name '{name}*'" if name else ""
    out = powershell(f"Get-Process {flt} -ErrorAction SilentlyContinue | Where-Object {{ $_.MainWindowHandle -ne 0 }} | "
                     "Select-Object Id,ProcessName,MainWindowTitle,@{n='Hwnd';e={[int64]$_.MainWindowHandle}} | ConvertTo-Json -Compress")
    if not out.strip():
        return []
    d = json.loads(out)
    return d if isinstance(d, list) else [d]
```

- **`{{` and `}}` in an f-string** produce literal braces. PowerShell needs `{ $_.MainWindowHandle -ne 0 }`, but in an f-string a single `{` starts an expression.
- **PowerShell returns JSON**, and Python reads it with `json.loads`. Using JSON as the common language between two programs avoids fragile text parsing.
- **`d if isinstance(d, list) else [d]`** fixes a well-known quirk: `ConvertTo-Json` returns a **list** for several processes but a **single object** for one. Wrapping the single case in a list means the caller always gets a list.

## Killing by PID only

```python um/win.py estatico
def kill(pid: int):
    """By exact PID. (Pattern kills - pkill -f, taskkill /IM with wildcards - can hit the agent's own shell or other apps.)"""
    r = subprocess.run(["taskkill.exe" if is_wsl() else "taskkill", "/PID", str(int(pid)), "/F"], capture_output=True, text=True)
    print((r.stdout or r.stderr).strip())
```

This is the safety rule from chapter 1 made concrete. The function accepts **one number**, and `str(int(pid))` makes sure it really is a number, even if a string sneaks in. There is no way to call it with a name pattern that could match the agent's own terminal.

## `run` versus `Popen`

Everything so far used `subprocess.run`, which **waits** until the program ends. A recording must run *while* the game is being played, so the recorder uses **`subprocess.Popen`**, which starts the program and **returns immediately**:

| | `subprocess.run(...)` | `subprocess.Popen(...)` |
|---|---|---|
| Returns | when the program has finished | at once, while it runs |
| Result | a `CompletedProcess` with output and return code | a `Popen` object to talk to it |
| Use for | short commands | long-running programs, conversations |
| Talk to it with | (nothing: it is over) | `.stdin.write()`, `.stdout.readline()`, `.wait()`, `.kill()` |

Several programs running at the same time are **separate processes**, managed by the operating system. That is real parallelism, with no Python threads involved, so the GIL from your notes doesn't matter here ([[py:12#3|concurrency]]).

## The `Recorder` class

```python um/win.py estatico
class Recorder:
    """Game window video (gfxcapture -> .mkv) + game-only audio (ProcLoopback -> .audio.raw) + timing .json.

        rec = Recorder(exe="AoE2DE_s.exe", out=r"C:\\caps\\take1"); rec.start(); ...; rec.stop()
    """
    STARTUP = 0.3   # ffmpeg spawn + capture + encoder init before the first frame (measured ~0.24-0.3 s)

    def __init__(self, exe=None, out="take", hwnd=None, title=None, fps=30, audio=True, crop=None, max_width=None, cq=19, pid=None):
        self.pid = pid
        self.exe, self.hwnd, self.title, self.fps, self.audio_on, self.crop, self.max_width, self.cq = exe, hwnd, title, fps, audio, crop, max_width, cq
        self.base = to_win(Path(out).resolve()) if is_wsl() and not (len(out) > 1 and out[1] == ":") else out
        self.video = self.audio = None
```

- **`STARTUP` is a class attribute**: one value shared by every recorder, defined once in the class body. The `self.something` values are **instance attributes**, one set per object ([[py:9.1#2|class and instance attributes]]). The comment records where the number came from: it was **measured**.
- **`__init__` only stores settings.** It doesn't start anything. Creating an object and starting the work are separate steps, which makes the object easy to configure and to test ([[py:9.1#1|`__init__` and `self`]]).
- **One line assigns eight attributes** with tuple unpacking. Compact, but harder to read than eight lines; you will find both styles in real code.
- **`self.video = self.audio = None`** is a chained assignment: both names get `None`. That is safe here because `None` is immutable. With a list, `a = b = []` would make two names for **the same** list ([[py:3#4|aliasing]]).

### `start()` returns `self`

```python um/win.py estatico
    def start(self):
        ff = ffmpeg_win()
        ...
        if self.audio_on:
            pid = self.pid or (pid_of(self.exe) if self.exe else None)
            if not pid:
                print("no pid for audio capture (give --exe or --pid); recording video only", file=sys.stderr)
            else:
                self.audio = subprocess.Popen([ps_exe(), "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", tool_path("ProcLoopback.ps1"),
                                               "-TargetPid", str(pid), "-Out", self.base + ".audio.raw"],
                                              stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, ...)
                self.header = json.loads(self.audio.stdout.readline() or "{}")
                t_audio = time.time()
        self.t_video = time.time()
        ...
        self.video = subprocess.Popen([ff, ..., self.base + ".mkv"], stdin=subprocess.PIPE, stderr=open(self.log, "w"))
        self.t_audio = t_audio
        return self
```

- **Two processes run at the same time**: the audio tool and ffmpeg. Each one is a `Popen` object stored in the recorder.
- **`stdin=subprocess.PIPE`** gives Python a pipe to write into the program's input. That is how the recording will be stopped later.
- **`self.audio.stdout.readline()`** reads the first line the audio tool prints: a JSON header with the audio format. `or "{}"` covers the case where the tool printed nothing.
- **The times are recorded** (`t_audio`, `t_video`) because audio and video start a fraction of a second apart. `stop()` uses them to compute the offset that keeps sound and picture in sync.
- **`return self`** allows **method chaining**: `rec = Recorder(...).start()` creates and starts the recorder in one expression. The CLI code below uses exactly that.

### `stop()`: ending things politely

```python um/win.py estatico
    def stop(self):
        """'q' to ffmpeg, then wait - never from a thread the game needs (gfxcapture stalls if the window freezes)."""
        if self.video:
            try:
                self.video.stdin.write(b"q")
                self.video.stdin.flush()
            except OSError:
                pass
            try:
                self.video.wait(20)
            except subprocess.TimeoutExpired:
                print("ffmpeg ignored q; killing it", file=sys.stderr)
                self.video.kill()
        ...
```

- **Ask first, force later.** ffmpeg stops cleanly when it reads `q` on its input, and a clean stop writes a complete video file. Only if it doesn't finish within 20 seconds is it killed.
- **`flush()`** pushes the written byte through the pipe at once; otherwise it could wait in a buffer.
- **`except OSError: pass`**: if the pipe is already closed (ffmpeg died), writing fails; that is fine, the next step handles it.
- **`TimeoutExpired`** is the exception `wait(20)` raises when time runs out. Catching **specific** exceptions, rather than everything, keeps real bugs visible ([[py:10#3|the exception hierarchy]]).

## The `Drive` class: a conversation over pipes

`Drive` sends mouse and keyboard input to a game through a PowerShell tool called WinDrive. Python and the tool talk with a tiny **text protocol**: Python writes one command per line (`click 640 360`), and the tool answers one line (`ok` or `error ...`).

```python um/win.py estatico
class Drive:
    """Python side of WinDrive: d = Drive("AoE2DE_s"); d.focus(); d.click(640, 360); d.key("0x1B")."""

    def __init__(self, proc: str):
        _check_platform()
        self.p = subprocess.Popen([ps_exe(), ..., "-File", tool_path("WinDrive.ps1"), "-Proc", proc],
                                  stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True, bufsize=1, ...)
        self.ready = self.p.stdout.readline().strip()

    def cmd(self, line: str, retry: bool = True) -> str:
        self.p.stdin.write(line + "\n")
        self.p.stdin.flush()
        out = self.p.stdout.readline().strip()
        if out.startswith("error") and "foreground" in out and retry:
            self.cmd("focus", retry=False)     # nobody at the PC: the foreground drifts; take it back once
            time.sleep(0.3)
            return self.cmd(line, retry=False)
        if out.startswith("error"):
            raise RuntimeError(f"{line}: {out}")
        return out

    def click(self, x, y, right=False, pause=0.3):
        self.cmd(f"click {int(x)} {int(y)}" + (" right" if right else ""))
        time.sleep(pause)

    def key(self, vk, mode="tap", pause=0.12):
        self.cmd(f"key {vk} {mode}")
        time.sleep(pause)
    ...
```

- **`bufsize=1`** with `text=True` means *line-buffered*: each line is sent as soon as it is complete, which a back-and-forth conversation needs.
- **Retry with a flag.** If the game lost focus, `cmd` takes it back **once** and repeats the command. The recursive calls pass `retry=False`, so they can't retry again: a simple way to make sure the recursion stops ([[py:5#8|recursion]]).
- **`raise RuntimeError(...)`** turns a protocol error into a Python exception. The caller decides what to do with it ([[py:10#4|`raise`]]).
- **Small methods wrap the protocol.** `d.click(640, 360)` is easier to read and harder to get wrong than `d.cmd("click 640 360")`. That is **encapsulation**: the class hides how the protocol works behind clear methods ([[py:9.2#7|the four pillars]]).

## `try` / `finally` in the CLI

```python um/win.py estatico
    elif c == "drive":
        d = Drive(a.proc)
        print(d.ready)
        try:
            for line in a.commands:
                print(line, "->", d.cmd(line, retry=not a.no_retry))
        finally:
            d.close()
    elif c == "record":
        ...
        rec = Recorder(exe=a.exe, out=a.out, ..., pid=a.pid).start()
        try:
            if a.seconds:
                time.sleep(a.seconds)
            else:
                input("recording - press Enter to stop ")
        finally:
            print(json.dumps(rec.stop(), indent=1))
```

**`finally` runs no matter how the `try` block ends**: normally, with an exception (a `RuntimeError` from `Drive`), or with **Ctrl+C** (`KeyboardInterrupt`). So the PowerShell tool is always closed, and the recording is always stopped and saved ([[py:10#1|`try`, `except`, `else`, `finally`]]). Without it, a crash could leave ffmpeg running in the background and the video file unfinished.

## A detail from Python's history

```python um/win.py estatico
        bfile = backup / f"{key.replace(chr(92), '_').replace(':', '')}-{time.strftime('%Y%m%d-%H%M%S')}.reg"
```

Why `chr(92)` instead of `"\\"`? Character 92 is the backslash. Before **Python 3.12**, a backslash was **not allowed inside the expression part of an f-string**, so `f"{key.replace('\\', '_')}"` was a `SyntaxError`. `chr(92)` produces a backslash without writing one. Python 3.12 removed that restriction, but the project supports 3.10, so the workaround stays.

::: nota English corner
- ***so nothing leaks into other apps*:** *so* here means "so that, as a result". *leak into* = escape into a place where it shouldn't be. See [[en:12#Consecuencia|consequence connectors]].
- ***never from a thread the game needs*:** a relative clause with the pronoun omitted: *a thread (that) the game needs*. See [[en:11.1#Pronombres relativos|relative pronouns]].
- ***nobody at the PC: the foreground drifts; take it back once*:** *take back* = recover. *Nobody* takes a singular verb, and *drifts* has the third-person *-s*: [[en:1#Concordancia: cuándo el verbo cambia|subject-verb agreement]].
- ***it can't catch a compromised release, which is what the pin is for*:** *what... is for* = "para lo que sirve". A *pin* here is a fixed value you trust.
:::
