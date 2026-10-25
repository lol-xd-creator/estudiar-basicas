# 8 · Sprites: image processing with Pillow

A **sprite** is a small 2D image used in a game: a character, a weapon, an enemy. Games are strict about them: Terraria wants an item of exactly 64×26 pixels, facing right, with a transparent background. An AI model gives you a 1024×1024 picture on a white background. `sprite.py` turns one into the other.

The module docstring summarises the lessons:

> *Rules of thumb (learned the hard way): generate on a flat background or with real transparency, cut out with a border flood fill (keeps interior whites like eyes), trim, then scale ONCE with nearest neighbour to the engine's frame size.*

This chapter reads those steps.

::: claves
- Images are handled with **Pillow** (`from PIL import Image`), always in **RGBA** mode: red, green, blue and **alpha** (opacity).
- The background is removed with a **flood fill from the border**: a breadth-first search that uses a `deque` as a queue.
- `fit` scales **once**, with *nearest neighbour* for pixel art.
- `-(-a // b)` is **ceiling division** with integers.
- The CLI uses a small **factory function** to avoid repeating the same lines 15 times.
:::

## Pixels and alpha

An image in RGBA mode is a grid of pixels, and each pixel is a tuple of four numbers from 0 to 255: `(red, green, blue, alpha)`. Alpha 255 is fully opaque, 0 is fully transparent. "Removing the background" means setting alpha to 0 in the background pixels.

```python um/sprite.py estatico
def _pil():
    need("PIL", "pillow")
    from PIL import Image
    return Image


def load(path) -> "Image.Image":
    Image = _pil()
    return Image.open(path).convert("RGBA")
```

- `_pil()` checks that Pillow is installed (with `need`, chapter 4) and imports it only when an image function is actually used.
- `convert("RGBA")` makes every image the same kind, whatever the file was (JPEG has no alpha, some PNGs use a palette). Every other function can then assume four channels.
- The return annotation is a **string**, `"Image.Image"`, because the name `Image` doesn't exist at the top of the module. Quoted annotations are never evaluated ([[py:12#5|type hints]]).

## Guessing the background colour

```python um/sprite.py estatico
def border_color(im, k: int = 4):
    """Median colour of the four corners (k x k each): the flat background colour."""
    w, h = im.size
    px = im.load()
    samples = [px[x, y][:3] for cx, cy in ((0, 0), (w - k, 0), (0, h - k), (w - k, h - k)) for x in range(cx, cx + k) for y in range(cy, cy + k)]
    return tuple(sorted(c[i] for c in samples)[len(samples) // 2] for i in range(3))
```

- **A comprehension with three `for` clauses**: for each corner, for each `x`, for each `y` in a 4×4 square. That is 64 samples. The clauses are read left to right, like nested loops ([[py:7#5|comprehensions]]).
- **`px[x, y][:3]`** takes the first three values of the pixel (RGB) and ignores alpha.
- **The median, per channel.** For each channel `i`, sort the 64 values and take the middle one (`[len(samples) // 2]`). The median ignores outliers: if one corner has a bit of the object, the other three still win. An average would be pulled towards the wrong colour.

## The flood fill

Here is the core of `cutout`, the function that removes the background:

```python um/sprite.py estatico
    bg = bg or border_color(im)
    w, h = im.size
    px = im.load()
    seen = bytearray(w * h)

    def is_bg(c):
        r, g, b = c[:3]
        if abs(r - bg[0]) + abs(g - bg[1]) + abs(b - bg[2]) <= tol * 3:
            return True
        return grey is not None and min(r, g, b) >= grey and max(r, g, b) - min(r, g, b) < spread

    q = deque([(x, y) for x in range(w) for y in (0, h - 1)] + [(x, y) for y in range(h) for x in (0, w - 1)])
    while q:
        x, y = q.popleft()
        i = y * w + x
        if seen[i]:
            continue
        seen[i] = 1
        c = px[x, y]
        if not is_bg(c):
            continue
        px[x, y] = (c[0], c[1], c[2], 0)
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not seen[ny * w + nx]:
                q.append((nx, ny))
```

**The idea:** start from every pixel on the border of the image. If a pixel looks like the background, make it transparent and visit its four neighbours. Keep going until the queue is empty. The fill spreads like paint poured from the edges, and it **stops at the object's outline**.

That is why a white eye inside a character survives: it is white, but the paint never reaches it, because it is surrounded by the character's non-white pixels. A simpler approach, "make every white pixel transparent", would make holes in the eyes. (The project has a test for exactly this: `test_cutout_keeps_interior_white`.)

**The Python details:**

- **`deque` from `collections`** is a double-ended queue. `popleft()` takes the oldest item in O(1). With a list, `pop(0)` would be O(n), because every other item has to move one place left. For an image with a million pixels, that difference is huge ([[py:4#5|`collections`]], [[py:12#1|complexity]]).
- Taking the **oldest** item first makes this a **breadth-first search** (BFS): the fill grows evenly from the border.
- **`seen = bytearray(w * h)`** marks visited pixels: one byte per pixel, all starting at 0. A 2D grid is stored as a flat array, and pixel `(x, y)` lives at index `y * w + x`. It is much more compact than a set of tuples.
- **`is_bg` is an inner function** that reads `bg`, `tol`, `grey` and `spread` from `cutout` (a closure, [[py:6#7|closures]]). Keeping the test in one place makes the loop easy to read.
- **The colour distance** is the sum of the differences per channel (the *Manhattan* distance). `tol * 3` gives each channel a tolerance of `tol`.
- **`0 <= nx < w`** is a chained comparison: it means `0 <= nx and nx < w` ([[py:2#6|comparisons]]).

Here is the same algorithm on a grid of characters, where `.` is background, `#` the object and `o` a white eye:

```python flood_fill.py
from collections import deque

art = [
    "..........",
    "..######..",
    "..#o..o#..",
    "..#....#..",
    "..######..",
    "..........",
]
grid = [list(row) for row in art]
h, w = len(grid), len(grid[0])

def is_bg(c):
    return c in ".o"        # white eyes look like background, on purpose

seen = bytearray(w * h)
q = deque([(x, y) for x in range(w) for y in (0, h - 1)] + [(x, y) for y in range(h) for x in (0, w - 1)])
while q:
    x, y = q.popleft()
    i = y * w + x
    if seen[i]:
        continue
    seen[i] = 1
    if not is_bg(grid[y][x]):
        continue
    grid[y][x] = " "                      # transparent
    for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
        if 0 <= nx < w and 0 <= ny < h and not seen[ny * w + nx]:
            q.append((nx, ny))

print("\n".join("".join(row) for row in grid))
```

The `o` and `.` inside the box are kept, because the fill from the border never gets in.

## Trimming and fitting

```python um/sprite.py estatico
def fit(im, w: int, h: int, anchor: str = "center", smooth: bool = False, allow_upscale: bool = True):
    """Trim, scale to fit inside w x h (nearest neighbour unless smooth), place on a transparent frame."""
    Image = _pil()
    im = trim(im)
    s = min(w / im.width, h / im.height)
    if not allow_upscale:
        s = min(s, 1.0)
    small = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS if smooth else Image.NEAREST)
    frame = Image.new("RGBA", (w, h))
    x = (w - small.width) // 2
    y = {"center": (h - small.height) // 2, "bottom": h - small.height, "top": 0}[anchor]
    frame.paste(small, (x, y))
    return frame
```

- **`min(w / im.width, h / im.height)`** is the largest scale at which the image still fits in both directions. `/` always gives a float ([[py:2#2|arithmetic operators]]).
- **`max(1, round(...))`** prevents a size of 0 pixels, which Pillow would reject.
- **Nearest neighbour versus Lanczos.** Nearest neighbour copies the closest pixel, so edges stay sharp: right for pixel art. Lanczos blends neighbouring pixels: right for painted art. The default is nearest, because most of the target games are pixel-art games.
- **`(w - small.width) // 2`** centres the image horizontally. `//` is integer division, so the position is a whole number of pixels.
- **A dict as a switch.** `{...}[anchor]` picks the vertical position for `"center"`, `"bottom"` or `"top"`. Python has `match` since 3.10 ([[py:7#match / case|`match` / `case`]]), but a dict lookup is shorter when each case is just a value. One catch: **all three values are computed** before the lookup. Here they are cheap, so it doesn't matter.

## Packing frames into a sheet: ceiling division

Games often load all the frames of an animation from one image, a **sprite sheet**:

```python um/sprite.py estatico
def sheet(frames, cols: int | None = None, pad: int = 0, vertical: bool = False):
    Image = _pil()
    fw, fh = max(f.width for f in frames), max(f.height for f in frames)
    if vertical:
        cols = 1
    cols = cols or len(frames)
    rows = -(-len(frames) // cols)
    out = Image.new("RGBA", (cols * (fw + pad) - pad, rows * (fh + pad) - pad))
    for i, f in enumerate(frames):
        out.paste(f, ((i % cols) * (fw + pad), (i // cols) * (fh + pad)))
    return out
```

- **`max(f.width for f in frames)`**: `max` accepts a generator directly.
- **`cols = cols or len(frames)`**: if no number of columns was given (`None`), put all frames in one row.
- **`rows = -(-len(frames) // cols)`** is the clever line. With 5 frames in 3 columns you need 2 rows, but `5 // 3` is 1. The trick: `//` rounds **towards minus infinity**, so `-5 // 3` is `-2`, and negating gives `2`. It is **ceiling division** without importing `math` ([[py:2#2|`//` with negative numbers]]).
- **`i % cols`** and **`i // cols`** turn a frame number into a column and a row.

```python ceil_div.py
import math

for n, cols in [(5, 3), (6, 3), (1, 4), (8, 1)]:
    print(f"{n} frames, {cols} cols -> {n // cols} with //, {-(-n // cols)} rows with -(-n // cols), {math.ceil(n / cols)} with math.ceil")

print(-5 // 3, -(-5 // 3))
for i in range(5):
    print(f"frame {i}: column {i % 3}, row {i // 3}")
```

## Cheap animations with indexing tricks

```python um/sprite.py estatico
def simple_frames(im, n: int = 3, kind: str = "bob"):
    ...
    for k in range(n):
        if kind == "bob":
            out.append(ImageChops.offset(im, 0, (0, -1, 0, 1)[k % 4]))
        elif kind == "squash":
            s = 1 + 0.08 * ((-1) ** k) * (k > 0)
            ...
        elif kind == "wobble":
            out.append(im.rotate((0, -5, 0, 5)[k % 4], resample=Image.NEAREST))
```

- **`(0, -1, 0, 1)[k % 4]`** cycles through four values: frame 0 → 0, frame 1 → -1, frame 2 → 0, frame 3 → 1, frame 4 → 0 again. Indexing a literal tuple is a compact way to write a repeating pattern.
- **`((-1) ** k) * (k > 0)`**: `(-1) ** k` alternates between 1 and -1. And `(k > 0)` is a **boolean used as a number**: `False` is 0 and `True` is 1, because `bool` is a subclass of `int` ([[py:2#5|booleans]]). So frame 0 gets no squash at all. Note the parentheses in `(-1) ** k`: `-1 ** k` would be `-(1 ** k)`, always -1, because `**` binds tighter than the unary minus ([[py:2#9|operator precedence]]).

```python bool_math.py
for k in range(5):
    print(k, (0, -1, 0, 1)[k % 4], 1 + 0.08 * ((-1) ** k) * (k > 0), -1 ** k)
```

## The CLI: a factory function

`sprite` has 16 commands, and most of them take an input file and an output file. Instead of repeating the same three lines each time, `register` defines a helper:

```python um/sprite.py estatico
def register(sub):
    ...
    cs = p.add_subparsers(dest="cmd", metavar="<cmd>")

    def cmd(name, help_, io=True):
        q = cs.add_parser(name, help=help_)
        if io:
            q.add_argument("input")
            q.add_argument("output")
        q.set_defaults(func=main)
        return q

    q = cmd("cutout", "flat background -> transparent (border flood fill)")
    q.add_argument("--tol", type=int, default=28, help="colour distance to the background (0-255 per channel)")
    ...
    q = cmd("fit", "trim + scale into a WxH frame (nearest neighbour)")
    q.add_argument("--size", required=True)
```

- `cmd` is an **inner function** that uses `cs` from the enclosing function: another closure. It creates and configures a parser, then **returns** it so the caller can add the options specific to that command.
- **`help_`** ends with an underscore because `help` is the name of a built-in function. A trailing underscore is the PEP 8 convention for avoiding a clash with a built-in or keyword ([[py:1#4|PEP 8]]). It also avoids the trap from your notes about shadowing built-ins ([[py:6#2|LEGB]]).

And a small parser for colours written like `#141018`:

```python um/sprite.py estatico
def _color(s: str | None):
    if not s:
        return None
    s = s.lstrip("#")
    return tuple(int(s[i:i + 2], 16) for i in (0, 2, 4)) + ((int(s[6:8], 16),) if len(s) == 8 else (255,))
```

`int("1a", 16)` converts hexadecimal text to a number ([[py:2#4|conversions]]). The result is a 3-tuple plus a 1-tuple, alpha from the text if it has 8 digits, otherwise 255. Note the commas in `(255,)`: without them it would be the number 255, and `tuple + int` raises `TypeError`.

```python color.py
def _color(s):
    if not s:
        return None
    s = s.lstrip("#")
    return tuple(int(s[i:i + 2], 16) for i in (0, 2, 4)) + ((int(s[6:8], 16),) if len(s) == 8 else (255,))

print(_color("#141018"), _color("FF000080"), _color(""))
```

::: nota English corner
- ***learned the hard way*:** an idiom: "aprendido a los golpes", by making mistakes. See [[en:15#Idioms del trabajo|work idioms]].
- ***keeps interior whites like eyes*:** *like* = "such as" (for example). *as* would be wrong here.
- ***scale ONCE*:** capital letters for emphasis in a comment; in normal writing you would use *only once*, or the emphatic *do*: [[en:14#Énfasis con do/does/did|emphasis]].
- ***nearest neighbour*:** a compound noun; in British spelling *neighbour*, *colour*; in American spelling *neighbor*, *color*. The project uses British spelling in comments and American spelling in some names.
- ***unless smooth*:** *unless* = *if not*: "nearest neighbour **unless** smooth (is chosen)". See [[en:7#Otras palabras para la condición|*unless*]].
:::
