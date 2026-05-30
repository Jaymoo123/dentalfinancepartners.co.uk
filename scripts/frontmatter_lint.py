"""Deterministic blog-frontmatter YAML linter / fixer.

Root cause it closes: the Track 2 writer emits free-text frontmatter values
(metaTitle / metaDescription / summary / faqs question+answer) UNQUOTED. When a
value contains a colon-space (e.g. "rates 2026/27: main pool" or
"phased by gross income: GBP50,000"), YAML reads it as a nested mapping and the
Next.js build dies with "incomplete explicit mapping pair". The QA "frontmatter
intact" check never actually parsed the YAML, so this slipped every gate and
only failed at build. This tool makes frontmatter validity a deterministic,
gateable property.

Modes:
  --check <files...> | --site <key>   exit 1 if any file's frontmatter is invalid YAML
  --fix   <files...> | --site <key>   re-quote free-text values, re-validate, write back

Quoting rule: free-text scalar keys (title, metaTitle, metaDescription, summary,
altText, h1, author, ogTitle, ogDescription, reviewedBy, reviewerCredentials, and
faqs question/answer) are wrapped in double quotes (escaping backslash + quote) if
not already quoted and not a YAML structural/flow value. Colons-without-space
(URLs like https://, image:) are left alone (valid plain scalars).

Usage:
  python scripts/frontmatter_lint.py --check Property/web/content/blog/foo.md
  python scripts/frontmatter_lint.py --fix   Property/web/content/blog/foo.md bar.md
  python scripts/frontmatter_lint.py --check --site property      # all of a site's blog
Exit 0 = all valid; exit 1 = at least one invalid (check) / unfixable (fix).
"""
from __future__ import annotations

import argparse
import pathlib
import re
import sys

import yaml

SITE_BLOG = {
    "property": "Property/web/content/blog",
    "dentists": "Dentists/web/content/blog",
    "solicitors": "Solicitors/web/content/blog",
    "medical": "Medical/web/content/blog",
    "generalist": "generalist/web/content/blog",
    "agency": "Digital Agency/web/content/blog",
}

QUOTE_KEYS = ("title", "metaTitle", "metaDescription", "summary", "altText", "h1",
              "author", "ogTitle", "ogDescription", "reviewedBy", "reviewerCredentials",
              "question", "answer")
_line_re = re.compile(rf'^(\s*-?\s*)({"|".join(QUOTE_KEYS)}):[ \t]+(.*?)[ \t]*$')


def split_frontmatter(text: str):
    """Return (fm_text, rest) where rest begins at the closing '---'. None if no FM."""
    if not text.startswith("---"):
        return None, text
    end = text.find("\n---", 3)
    if end == -1:
        return None, text
    return text[3:end], text[end:]


def _quote(v: str) -> str:
    if len(v) >= 2 and ((v[0] == "'" and v[-1] == "'") or (v[0] == '"' and v[-1] == '"')):
        return v  # already quoted
    if v and v[0] in "[{|>&*!":
        return v  # flow / block scalar / anchor - leave structural values alone
    return '"' + v.replace("\\", "\\\\").replace('"', '\\"') + '"'


def fix_text(text: str) -> str:
    fm, rest = split_frontmatter(text)
    if fm is None:
        return text
    out = []
    for ln in fm.split("\n"):
        m = _line_re.match(ln)
        if m:
            ln = f"{m.group(1)}{m.group(2)}: {_quote(m.group(3))}"
        out.append(ln)
    return "---" + "\n".join(out) + rest


def check_file(p: pathlib.Path) -> str | None:
    """Return an error string if invalid, else None."""
    fm, _ = split_frontmatter(p.read_text(encoding="utf-8"))
    if fm is None:
        return "no frontmatter block"
    try:
        yaml.safe_load(fm)
        return None
    except yaml.YAMLError as e:
        mk = getattr(e, "problem_mark", None)
        loc = f" (fm line {mk.line + 1} col {mk.column + 1})" if mk else ""
        return f"{getattr(e, 'problem', e)}{loc}"


def resolve(args) -> list[pathlib.Path]:
    files: list[pathlib.Path] = [pathlib.Path(f) for f in (args.files or [])]
    if args.site:
        d = pathlib.Path(SITE_BLOG[args.site])
        files += sorted(d.glob("*.md"))
    return files


def main() -> int:
    ap = argparse.ArgumentParser()
    mode = ap.add_mutually_exclusive_group(required=True)
    mode.add_argument("--check", action="store_true")
    mode.add_argument("--fix", action="store_true")
    ap.add_argument("files", nargs="*")
    ap.add_argument("--site", choices=list(SITE_BLOG))
    args = ap.parse_args()

    files = resolve(args)
    if not files:
        print("No files (pass paths or --site).")
        return 1

    if args.check:
        bad = []
        for p in files:
            err = check_file(p)
            if err:
                bad.append((p, err))
        if bad:
            print(f"FRONTMATTER INVALID ({len(bad)} of {len(files)} file(s)):")
            for p, err in bad:
                print(f"  {p}: {err}")
            return 1
        print(f"frontmatter OK: {len(files)} file(s) valid")
        return 0

    # --fix
    fixed, still_bad = 0, []
    for p in files:
        if check_file(p) is None:
            continue
        new = fix_text(p.read_text(encoding="utf-8"))
        fm, _ = split_frontmatter(new)
        try:
            yaml.safe_load(fm)
        except yaml.YAMLError as e:
            still_bad.append((p, getattr(e, "problem", e)))
            continue
        p.write_bytes(new.encode("utf-8"))
        fixed += 1
        print(f"  fixed {p}")
    if still_bad:
        print(f"STILL INVALID after fix ({len(still_bad)}):")
        for p, err in still_bad:
            print(f"  {p}: {err}")
        return 1
    print(f"frontmatter fix: {fixed} file(s) re-quoted, all valid")
    return 0


if __name__ == "__main__":
    sys.exit(main())
