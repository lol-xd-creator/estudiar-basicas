# 13 · Showcase videos and 3D renders

A mod is only finished when people can see it. `video.py` cuts recordings into a short, styled **showcase video** with titles, transitions and music, and `render3d.py` turns a 3D model into sprite frames with Blender. Neither module processes video or 3D itself: both **build instructions for another program** (ffmpeg and Blender) and run it. That is the pattern this chapter is about.

::: claves
- `probe()` prefers `ffprobe`'s JSON output, and falls back to parsing ffmpeg's text with regular expressions.
- `next((s for s in streams if ...), {})` finds the first matching item or returns a default.
- `frange()` is a **generator** of float values that avoids accumulated rounding errors.
- An **EDL** (*edit decision list*) is a JSON file that describes the whole edit; `compile_edl` turns it into one ffmpeg command.
- `dict(defaults, **overrides)` merges settings; `dict(PRESETS[name])` makes a **copy** so the global table is never changed.
- Blender runs a script and prints a **sentinel line** to confirm success.
:::

## Asking a video file about itself

```python um/video.py estatico
def probe(path) -> dict:
    if not shutil.which("ffprobe"):
        return _probe_ffmpeg(path)
    r = subprocess.run(["ffprobe", "-v", "error", "-print_format", "json", "-show_streams", "-show_format", str(path)], capture_output=True, text=True)
    if r.returncode:
        die(f"ffprobe {path}: {r.stderr.strip()}")
    d = json.loads(r.stdout)
    v = next((s for s in d["streams"] if s["codec_type"] == "video"), {})
    a = next((s for s in d["streams"] if s["codec_type"] == "audio"), None)
    num, den = (v.get("avg_frame_rate") or "0/1").split("/")
    return dict(path=str(path), duration=float(d["format"].get("duration") or v.get("duration") or 0), width=v.get("width"), height=v.get("height"),
                fps=round(float(num) / float(den), 3) if float(den) else None, audio=bool(a), audio_rate=int(a["sample_rate"]) if a else None)
```

- **Two strategies.** `ffprobe` can answer in JSON, which is easy and reliable to read. If it isn't installed, `_probe_ffmpeg` reads the human-readable text that `ffmpeg -i` prints, with regular expressions. The caller never knows which one was used: both return the same dict.
- **`next(generator, default)`** returns the first stream of the right type. A video file normally has a video stream, so the default `{}` (an empty dict) only protects the following `.get()` calls; a file can have no audio, so that default is `None`, and later `bool(a)` says whether there is audio ([[py:8#1|`next()` with a default]]).
- **Frame rates are fractions.** ffprobe writes `"30000/1001"` (29.97 fps, a TV standard). `split("/")` and a division give the number; `if float(den)` avoids dividing by zero.
- **`d["format"].get("duration") or v.get("duration") or 0`**: a chain of `or` fallbacks that returns the first value that exists and isn't empty ([[py:2#7|`or` returns an operand]]).

## A range of floats

`range()` only works with integers. To take a frame every 0.5 seconds, `video.py` has its own version for floats:

```python um/video.py estatico
def frange(a, b, step):
    t = a
    while t <= b + 1e-9:
        yield round(t, 3)
        t += step
```

- It is a **generator**: values are produced one at a time, when the caller asks ([[py:8#2|generators]]).
- **`b + 1e-9`**: floats are not exact. `0.1 + 0.1 + 0.1` is `0.30000000000000004`, slightly **more** than `0.3`, so a plain `t <= b` would skip the last value. The tiny tolerance fixes that ([[py:2#3|floats and rounding]]).
- **`round(t, 3)`** gives clean numbers to the caller (`0.3` instead of `0.30000000000000004`). Note that `t` itself keeps the unrounded value, so the errors still accumulate inside, just slowly.

```python frange.py
def frange(a, b, step):
    t = a
    while t <= b + 1e-9:
        yield round(t, 3)
        t += step

def frange_naive(a, b, step):
    t = a
    while t <= b:
        yield t
        t += step

print(list(frange(0, 0.3, 0.1)))
print(list(frange_naive(0, 0.3, 0.1)))       # 0.3 is missing!
print(list(frange_naive(0, 1, 0.1))[-3:])     # and the values are ugly
print(0.1 + 0.1 + 0.1, 0.1 + 0.1 + 0.1 <= 0.3)
```

## Skipping loading screens

```python um/video.py estatico
def first_frame(path, start=0.0, step=0.5, limit=90, min_mean=45, min_std=18) -> float:
    """Loading screens are dark and flat; gameplay isn't. First bright, busy frame (seconds)."""
    np = need("numpy")
    t = start
    while t < limit:
        raw = subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{t:.2f}", "-i", str(path), "-frames:v", "1", "-vf", "scale=160:90,format=gray",
                              "-f", "rawvideo", "-"], capture_output=True).stdout
        if not raw:
            break
        a = np.frombuffer(raw, np.uint8).reshape(-1, 160)[5:-5, 20:140].astype(float)
        if a.mean() > min_mean and a.std() > min_std:
            return t
        t += step
    return 0.0
```

A nice example of turning a human idea into code. *"Loading screens are dark and flat; gameplay isn't"*: so take a tiny grey version of a frame, and measure its **mean** (brightness) and **standard deviation** (how much it varies). The first frame that is both bright and busy is gameplay.

- ffmpeg writes the raw pixels to stdout (`"-"`), and Python reads them as bytes. **No temporary file.**
- `np.frombuffer` turns bytes into an array, `reshape(-1, 160)` makes it 160 pixels wide (`-1` means "work out the height"), and the slice `[5:-5, 20:140]` ignores the borders, where black bars or a logo could confuse the measurement.

## The edit as data: the EDL

A showcase video is described in a JSON file. Here is a short one, from the module docstring:

```text edl.json
{"size": [1920, 1080], "fps": 30, "bpm": 128,
 "transition": {"type": "fade", "duration": 0.3},
 "music": {"path": "track.mp3", "volume": 0.8},
 "segments": [
   {"card": {"title": "Every game is moddable now."}, "dur": 2.2},
   {"clip": "a.mp4", "in": 12.0, "dur": 4.0, "title": "Minecraft inside Elden Ring", "transition": {"type": "pixelize"}},
   {"clip": "b.mp4", "in": 0, "beats": 8, "hook": "Point Claude at any game."}]}
```

This is the same idea as the scan report in chapter 7, reversed: **the input is data**, so an agent can write and adjust an edit as JSON, without knowing ffmpeg's complex syntax. `compile_edl` translates it.

### Relative paths with a closure

```python um/video.py estatico
def compile_edl(edl_path, out, preview=False, keep=False):
    edl_path = Path(edl_path)
    edl = json.loads(edl_path.read_text())
    base = edl_path.parent

    def rel(p):
        return str((base / p).resolve()) if p and not Path(p).is_absolute() else p

    for seg in edl["segments"]:
        if "clip" in seg:
            seg["clip"] = rel(seg["clip"])
        ...
```

Paths in the EDL are relative to the EDL file, not to the folder where you run the command. `rel` uses `base` from the enclosing function, another small closure ([[py:6#7|closures]]).

### Durations and merged settings

```python um/video.py estatico
def _seg_dur(seg, bpm):
    if "beats" in seg:
        if not bpm:
            die("segment uses 'beats' but the EDL has no 'bpm'")
        return seg["beats"] * 60.0 / bpm
    return float(seg.get("dur", 4.0))

    ...
    default_tr = edl.get("transition", {"type": "fade", "duration": 0.3})
    segs = edl["segments"]
    durs = [_seg_dur(s, bpm) for s in segs]
    trans = []
    for k in range(len(segs) - 1):
        t = dict(default_tr, **segs[k + 1].get("transition", {}))
        if t.get("type") == "cut" or float(t.get("duration", 0)) < 1.5 / fps:
            t = dict(type="cut", duration=0.0)     # hard cut: concat (a sub-frame xfade breaks the chain)
        trans.append(t)
```

- **Cutting on the beat.** A segment can be measured in **beats** of the music instead of seconds: at 128 beats per minute, one beat lasts 60 / 128 seconds, so 8 beats are `8 * 60 / 128 = 3.75` seconds. Cuts that land on the beat feel professional.
- **`dict(default_tr, **segment_transition)`** creates a **new** dict: first the default transition, then the segment's own keys on top. A segment that only says `{"type": "pixelize"}` keeps the default duration. It is the same as `{**default_tr, **override}` ([[py:4#6|unpacking]]).
- There are `len(segs) - 1` transitions: they go **between** segments.
- **A transition shorter than one and a half frames** becomes a hard cut, because ffmpeg breaks with a fade shorter than one frame. The comment records the bug that this line prevents.

```python edl.py
default_tr = {"type": "fade", "duration": 0.3}
segs = [{"dur": 2.2}, {"beats": 8, "transition": {"type": "pixelize"}}, {"dur": 4, "transition": {"type": "cut"}}]
bpm, fps = 128, 30

durs = [s["beats"] * 60.0 / bpm if "beats" in s else float(s.get("dur", 4.0)) for s in segs]
trans = []
for k in range(len(segs) - 1):
    t = dict(default_tr, **segs[k + 1].get("transition", {}))
    if t.get("type") == "cut" or float(t.get("duration", 0)) < 1.5 / fps:
        t = dict(type="cut", duration=0.0)
    trans.append(t)

print(durs)
print(trans)
print(default_tr)          # the default itself was never modified
```

### Building one huge command

Each segment is rendered to a temporary file, and then they are joined. ffmpeg's *filter graph* is a mini-language of its own, written as text, so the code builds it as a **list of strings** and joins them at the end:

```python um/video.py estatico
    inputs, graph = [], []
    for f in files:
        inputs += ["-i", f]
    for k in range(len(files)):   # one timebase for every input: concat and xfade refuse to mix them
        graph.append(f"[{k}:v]settb=AVTB,setpts=PTS-STARTPTS[s{k}]")
    ...
    ff(*inputs, "-filter_complex", ";".join(graph), "-map", "[vout]", "-map", "[aout]", "-t", f"{total:.3f}", *enc, out)
```

- **`inputs += ["-i", f]`** extends the list in place with two items.
- **`";".join(graph)`** is the same "build a list, join once" pattern as in chapter 7.
- **`ff(*inputs, ..., *enc, out)`** unpacks two lists into one call, so `ff` receives one long list of arguments ([[py:5#3|unpacking with `*`]]). `ff` itself is defined as `def ff(*args, quiet=True)`: everything positional is collected, and `quiet` can only be passed by name ([[py:5#2|parameters]]).

The whole edit (cards, clips, titles, transitions, watermark, sound effects and music) becomes **one** ffmpeg command, often several thousand characters long. No human would want to write it by hand; generating it from data is the only sane way.

## 3D models to sprites: `render3d.py`

Generating each frame of an animation with an AI model gives inconsistent results: the character changes a little from frame to frame. Rendering a 3D model from fixed camera angles keeps everything consistent. That is how the Age of Empires II units were made.

### Presets, and why the code copies them

```python um/render3d.py estatico
PRESETS = {
    "aoe2": dict(type="ortho", elevation_deg=30, headings=16, start_deg=0, clockwise=True),
    "iso8": dict(type="ortho", elevation_deg=30, headings=8, start_deg=0, clockwise=True),
    ...
    "side": dict(type="ortho", elevation_deg=0.01, headings=2, start_deg=0, clockwise=True),
}


def render(glb: str, out_dir: str, preset: str = "aoe2", ..., elevation=None, headings=None, ...):
    out = Path(out_dir).resolve()
    out.mkdir(parents=True, exist_ok=True)
    cam = dict(PRESETS[preset])
    if elevation is not None:
        cam["elevation_deg"] = elevation
    if headings is not None:
        cam["headings"] = headings
    ...
```

`cam = dict(PRESETS[preset])` makes a **copy** of the preset. Without the copy, `cam["headings"] = headings` would modify the **global** table, and every later render in the same program would silently inherit the change. It is the classic aliasing bug from your notes ([[py:3#4|aliasing]]). A shallow copy is enough here because the preset's values are numbers and strings, which are immutable ([[py:3#5|shallow copies]]).

Notice also **`if elevation is not None`** rather than `if elevation`: an elevation of `0` is a valid value, but `0` is falsy, so `if elevation` would ignore it. Comparing with `None` using `is` is the PEP 8 way ([[py:3#2|`is` versus `==`]]).

```python presets.py
PRESETS = {"side": dict(type="ortho", elevation_deg=0.01, headings=2)}

def render_bad(preset, headings=None):
    cam = PRESETS[preset]                # no copy: an alias of the global dict
    if headings is not None:
        cam["headings"] = headings
    return cam

def render_good(preset, headings=None, elevation=None):
    cam = dict(PRESETS[preset])          # a copy
    if headings is not None:
        cam["headings"] = headings
    if elevation is not None:            # 0 is a valid elevation
        cam["elevation_deg"] = elevation
    return cam

print(render_good("side", headings=8, elevation=0), PRESETS["side"])
print(render_bad("side", headings=8), PRESETS["side"])   # the global table changed
```

### Parsing a mini-language

```python um/render3d.py estatico
def parse_anims(spec: str) -> dict:
    """'idle:10:bob,walk:12:walk,death:20:die' -> {name: {frames, motion}}"""
    out = {}
    for part in spec.split(","):
        bits = part.split(":")
        name, frames = bits[0], int(bits[1]) if len(bits) > 1 else 1
        motion = MOTIONS.get(bits[2] if len(bits) > 2 else "still", None)
        out[name] = dict(frames=frames, motion=motion)
    return out
```

A compact text format for a command-line option: animations separated by commas, fields by colons, with defaults for missing fields. Watch the precedence in `name, frames = bits[0], int(bits[1]) if len(bits) > 1 else 1`: the conditional expression applies only to the **second** value, not to the whole tuple ([[py:2#9|operator precedence]]).

```python parse_anims.py
MOTIONS = {"bob": "bob", "walk": "walk", "die": "die", "still": None}

def parse_anims(spec):
    out = {}
    for part in spec.split(","):
        bits = part.split(":")
        name, frames = bits[0], int(bits[1]) if len(bits) > 1 else 1
        motion = MOTIONS.get(bits[2] if len(bits) > 2 else "still", None)
        out[name] = dict(frames=frames, motion=motion)
    return out

print(parse_anims("idle:10:bob,walk:12:walk,death:20:die"))
print(parse_anims("idle"))
```

### Running Blender and checking that it worked

```python um/render3d.py estatico
    script = Path(__file__).parent / "blender" / "render_sprites.py"
    with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False) as f:
        json.dump(cfg, f)
    n = sum(a["frames"] for a in cfg["anims"].values()) * cam["headings"] * (2 if shadows else 1)
    print(f"rendering {n} images with Blender ({engine}, {samples} samples) -> {out}")
    r = subprocess.run([blender_bin(), "-b", "--python", str(script), "--", f.name], capture_output=True, text=True)
    done = [l for l in r.stdout.splitlines() if l.startswith("UM_RENDER_DONE")]
    if r.returncode or not done:
        die("Blender failed:\n" + (r.stderr or r.stdout)[-3000:])
```

- **Passing settings through a file.** Blender runs its own Python, a separate process, so it can't receive a Python dict. The settings are written to a temporary JSON file, and its name is passed on the command line. `delete=False` keeps the file after the `with` block closes it, so Blender can still read it.
- **`-b`** runs Blender without a window (*background*), and everything after `--` is passed to the script, not to Blender.
- **A sentinel line.** Blender sometimes exits with code 0 even when the script failed. So the script prints a special line, `UM_RENDER_DONE ...`, as its very last action, and Python checks for it. **No line, no success.** It is a simple and robust way to confirm that another program finished its job.

::: nota English corner
- ***Loading screens are dark and flat; gameplay isn't*:** an ellipsis: *isn't* stands for *isn't dark and flat*. English avoids repeating the adjective. See [[en:15#Elipsis y sustitución|ellipsis and substitution]].
- ***concat and xfade refuse to mix them*:** *refuse* + *to* + base verb: [[en:10#Verbos seguidos de to + base|verbs followed by *to*]].
- ***Rendering from 3D keeps every facing and frame consistent, which per-frame image generation can't*:** *-ing* as the subject (*Rendering... keeps*) and *which* referring to a whole idea. See [[en:10#El -ing como sustantivo|the -ing form as a noun]].
- ***Style that works on X: open on the strongest moment*:** superlative with *the*: *the strongest*. See [[en:11.1#Comparativos y superlativos|superlatives]].
:::
