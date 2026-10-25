# Part V · Windows and video

To verify a mod, the agent has to **play** the game: launch it, take screenshots, click and type, and record a video. On Windows, Python can't do most of that on its own, so `win.py` controls other programs (PowerShell, ffmpeg, small C# tools) and talks to them through pipes. `video.py` then turns the recordings into a finished showcase video, and `render3d.py` drives Blender.

| Chapter | You will learn |
|---|---|
| 12 · Controlling Windows | `subprocess.run` versus `Popen`, talking to a process through stdin/stdout, two classes with a clear lifecycle, verifying a download with SHA-256, and `try`/`finally`. |
| 13 · Videos and 3D renders | A float-range generator, `next()` with a default, merging dicts with `dict(a, **b)`, why `dict(PRESETS[name])` copies, and building long command lines from data. |
