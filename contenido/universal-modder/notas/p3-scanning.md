# Part III · Scanning games

The first real step of every mod is **recon**: which games are installed, where they are, which engine each one uses, whether it has anti-cheat, and where it keeps its saves. The command `um scan` does all of that, and `scan.py` is the biggest module in the project (about 750 lines).

| Chapter | You will learn |
|---|---|
| 5 · Finding installed games | Parsing Steam's file format with a stack, caching a result in a function attribute, sets for removing duplicates, and fuzzy name matching. |
| 6 · The file index and binary sniffing | A class that indexes a folder with `os.walk`, why `dirnames[:] = ...` is not the same as `dirnames = ...`, and reading binary headers with `struct`. |
| 7 · Detecting the engine | Knowledge stored as tables, a closure that collects results, `for ... else`, stable sorting, and building the final report. |

Everything in `scan.py` is **read-only**: it never changes a game folder. That makes it safe to run on any machine, and easy to test with fake folders (chapter 16).
