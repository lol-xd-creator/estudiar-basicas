# Part VI · Safety, knowledge and tests

The last part reads the code that makes the toolkit **trustworthy**: backups that can always be undone, a linter that stops a mod from leaking game files or secrets, the knowledge base that lets agents learn from each other, and the tests that keep all of it working.

| Chapter | You will learn |
|---|---|
| 14 · Backups and the publish check | Hashing files in chunks, creating a file only if it doesn't exist (`"x"` mode), cleaning up and re-raising with `except BaseException`, set differences, and finding duplicate files efficiently. |
| 15 · The knowledge base | Parsing YAML front matter with a regular expression, a search with weighted scores, validating notes, imports inside functions to avoid circular imports, and a "dry run by default" design. |
| 16 · Tests | How the project tests code that needs games, GPUs and the internet without having any of them: fake folders, `monkeypatch`, fixtures and `parametrize`. |
| 17 · Patterns worth stealing | A summary of the ideas that keep coming back, and exam-style questions about the code you read. |
