"""docprep: make a legal markdown source fit to send, and refuse to ship it if it is not.

Every document that leaves this repo goes through `clean()` and `assert_sendable()`.
Both builders call them, so a document cannot reach a recipient carrying editing
artefacts. The rules are the owner's, set 2026-08-14 after a build comment naming
internal file paths reached page 1 of a signing copy:

  1. No em-dashes or en-dashes. Commas, brackets, full stops and colons instead.
  2. No horizontal rules. A heading is the divider.
  3. No inline bold or italic emphasis. A contract does not shout; the numbering and
     the headings carry the structure. Heading styles are applied by the builder and
     are not affected.
  4. No references to files, paths or repository internals. A recipient has no
     `config/tiers.json`, and naming one tells them the document was assembled by a
     machine. Name the schedule or the clause instead.
  5. No HTML comments. They are notes to ourselves.
  6. No placeholder tokens: `{{TOKEN}}`, `[INSERT ...]` or bare `[SOMETHING]` in caps.
     A blank a person fills in is a dotted line in a table, not a bracket.
  7. No duplicated sentences.

`clean()` fixes 1, 2, 3 and 5 mechanically. `assert_sendable()` fails on anything
left, because 4, 6 and 7 need a human decision about what the sentence should say.
"""
import re
import sys

# Lines that are structural in markdown but noise on the page. The leading class is
# [ \t]* and not \s*: \s matches newlines, so \s* would swallow the blank line before
# the rule and glue the previous paragraph to the next heading.
_RULE = re.compile(r"(?m)^[ \t]*-{3,}[ \t]*$\n?")
_COMMENT = re.compile(r"<!--.*?-->\s*", re.S)
_BOLD = re.compile(r"\*\*(.+?)\*\*", re.S)
_ITALIC = re.compile(r"(?<!\*)\*(?!\s)([^*\n]+?)(?<!\s)\*(?!\*)")

# A path is only a path if it has a directory separator or a code-ish extension, so
# ordinary prose ("clause 3.2") is never caught.
_PATH = re.compile(r"\b[\w.-]*[\w-]+/[\w./-]+\.\w{1,4}\b|\b[\w-]+\.(?:json|py|ts|tsx|sql|csv|md)\b")
_TOKEN = re.compile(r"\{\{[^}]*\}\}|\[INSERT[^\]]*\]|\[[A-Z][A-Z0-9 _-]{2,}\]")
_DASH = re.compile(r"[—–]")


def clean(text: str) -> str:
    """Strip the artefacts that can be removed without a judgement call."""
    text = _COMMENT.sub("", text)
    text = _RULE.sub("", text)
    text = _BOLD.sub(r"\1", text)
    text = _ITALIC.sub(r"\1", text)
    text = _DASH.sub(",", text)
    # Collapse the blank runs left behind by removed rules and comments.
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip() + "\n"


def _sentences(text: str):
    """Sentences of 40+ characters, normalised, for the duplication check."""
    body = re.sub(r"(?m)^\s*\|.*$", "", text)          # tables repeat labels legitimately
    body = re.sub(r"(?m)^#{1,6} .*$", "", body)        # so do headings
    for raw in re.split(r"(?<=[.:])\s+", body):
        s = " ".join(raw.split()).strip().lower()
        if len(s) >= 40:
            yield s


def problems(text: str) -> list[str]:
    """Everything still wrong with the text, as a list of human-readable lines."""
    out = []
    for label, rx in (("em or en dash", _DASH), ("horizontal rule", _RULE),
                      ("HTML comment", _COMMENT), ("bold", _BOLD)):
        hits = rx.findall(text)
        if hits:
            out.append(f"{len(hits)} x {label}")
    for label, rx in (("file path or repository reference", _PATH),
                      ("placeholder token", _TOKEN)):
        hits = sorted(set(m if isinstance(m, str) else m[0] for m in rx.findall(text)))
        if hits:
            out.append(f"{label}: {', '.join(hits[:6])}")

    seen, dupes = set(), []
    for s in _sentences(text):
        if s in seen and s not in dupes:
            dupes.append(s)
        seen.add(s)
    for d in dupes[:3]:
        out.append(f"duplicated sentence: {d[:90]}...")
    return out


def assert_sendable(text: str, what: str = "document") -> None:
    found = problems(text)
    if found:
        sys.exit(f"{what} is not fit to send:\n  " + "\n  ".join(found))
