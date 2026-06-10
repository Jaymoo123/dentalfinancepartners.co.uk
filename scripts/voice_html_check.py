#!/usr/bin/env python3
"""Per-page build-safety check (Humanise Engine).

Deterministic gate that a humanised page will render and build: frontmatter
parses as YAML, the body HTML is well-formed (block tags balanced), and no
markdown leaked into the HTML body (## / - / 1. lines render literally on this
site). Run after the voice rewrite, before commit; a failure reverts the page.

  python scripts/voice_html_check.py --slug <slug> [--site property] [--json]

Exit 0 = safe to build, 2 = malformed (revert), 1 = error.
"""
from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys
from html.parser import HTMLParser

import yaml

ROOT = pathlib.Path(__file__).resolve().parents[1]

# Void / self-closing elements never need a closing tag.
_VOID = {"br", "hr", "img", "input", "meta", "link", "col", "source", "wbr"}
# Block + inline tags we expect to be explicitly balanced in this corpus.
_TRACK = {"p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "table",
          "thead", "tbody", "tfoot", "tr", "th", "td", "aside", "blockquote",
          "strong", "em", "b", "i", "span", "div", "figure", "figcaption",
          "caption", "a", "section", "article"}


def _blog_dir(site: str = "property") -> pathlib.Path:
    p = ROOT / "sites" / f"{site}.json"
    if p.exists():
        cfg = json.loads(p.read_text(encoding="utf-8"))
        return ROOT / cfg["paths"]["blogContentDir"]
    return ROOT / "Property" / "web" / "content" / "blog"


def _split_frontmatter(text: str):
    if not text.startswith("---"):
        return None, text
    end = text.find("\n---", 3)
    if end == -1:
        return None, text
    rest = text[end:]
    nl = rest.find("\n", 1)
    return text[3:end], (rest[nl + 1:] if nl != -1 else "")


class _Balance(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack: list[str] = []
        self.errors: list[str] = []

    def handle_starttag(self, tag, attrs):
        if tag in _VOID or tag not in _TRACK:
            return
        self.stack.append(tag)

    def handle_startendtag(self, tag, attrs):  # <tag/>
        return

    def handle_endtag(self, tag):
        if tag in _VOID or tag not in _TRACK:
            return
        if tag in self.stack:
            while self.stack and self.stack[-1] != tag:
                self.errors.append(f"unclosed <{self.stack.pop()}>")
            if self.stack:
                self.stack.pop()
        else:
            self.errors.append(f"stray </{tag}>")


_MD_LINE = re.compile(r"^\s*(#{1,6}\s+\S|[-*]\s+\S|\d+\.\s+\S)")


def check_text(raw: str, slug: str = "") -> dict:
    errors: list[str] = []
    fm_text, body = _split_frontmatter(raw)

    # 1. Frontmatter parses.
    if fm_text is None:
        errors.append("no frontmatter block")
    else:
        try:
            fm = yaml.safe_load(fm_text)
            if not isinstance(fm, dict):
                errors.append("frontmatter is not a mapping")
        except Exception as e:
            errors.append(f"frontmatter YAML error: {str(e)[:120]}")

    # 2. HTML body well-formed (tracked block/inline tags balanced).
    bal = _Balance()
    try:
        bal.feed(body)
        bal.close()
    except Exception as e:
        errors.append(f"HTML parse error: {str(e)[:120]}")
    leftover = [t for t in bal.stack]
    if leftover:
        errors.append("unclosed tags: " + ", ".join(f"<{t}>" for t in leftover[:8]))
    errors.extend(bal.errors[:8])

    # 3. No leaked markdown in the HTML body (renders literally on this site).
    md_hits = []
    for i, line in enumerate(body.splitlines(), 1):
        # ignore lines that are clearly inside HTML (start with a tag)
        if line.lstrip().startswith("<"):
            continue
        if _MD_LINE.match(line):
            md_hits.append(f"L{i}: {line.strip()[:60]}")
    if md_hits:
        errors.append("leaked markdown: " + " | ".join(md_hits[:5]))

    return {"slug": slug, "passed": not errors, "errors": errors}


def check(slug: str, site: str, as_json: bool) -> int:
    p = _blog_dir(site) / f"{slug}.md"
    if not p.exists():
        print(f"ERROR: no page {p}", file=sys.stderr)
        return 1
    res = check_text(p.read_text(encoding="utf-8"), slug)
    if as_json:
        print(json.dumps(res, ensure_ascii=False))
    else:
        print(f"build-safety: {slug}  {'PASS' if res['passed'] else 'FAIL'}")
        for e in res["errors"]:
            print("   - " + e)
    return 0 if res["passed"] else 2


def _selftest() -> int:
    def md(body):
        return "---\ntitle: \"t\"\nslug: \"s\"\n---\n" + body
    cases = [
        ("clean HTML -> PASS", md("<h2>Heading</h2><p>Text with <strong>bold</strong>.</p>"), True),
        ("unclosed <p> -> FAIL", md("<p>text <strong>bold</strong>"), False),
        ("stray close -> FAIL", md("<p>text</p></div>"), False),
        ("leaked markdown heading -> FAIL", md("## A markdown heading\n<p>x</p>"), False),
        ("leaked markdown bullet -> FAIL", md("- item one\n- item two"), False),
        ("table balanced -> PASS",
         md("<table><thead><tr><th>A</th></tr></thead><tbody><tr><td>1</td></tr></tbody></table>"), True),
        ("void tags ok -> PASS", md("<p>line<br>break</p><hr>"), True),
        ("broken frontmatter -> FAIL", "---\ntitle: \"t\nslug: s: bad\n---\n<p>x</p>", False),
    ]
    ok = True
    for label, raw, expect in cases:
        r = check_text(raw, "selftest")
        good = r["passed"] == expect
        ok = ok and good
        print(f"  [{'PASS' if good else 'FAIL'}] {label}")
        if not good:
            print(f"         expected {expect}, got {r['passed']}: {r['errors']}")
    print("\nSELFTEST:", "PASS" if ok else "FAIL")
    return 0 if ok else 1


def main() -> int:
    ap = argparse.ArgumentParser(description="Per-page build-safety check (frontmatter + HTML + markdown leak).")
    ap.add_argument("--slug")
    ap.add_argument("--site", default="property")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--selftest", action="store_true")
    a = ap.parse_args()
    if a.selftest:
        return _selftest()
    if not a.slug:
        ap.error("--slug required (or --selftest)")
    return check(a.slug, a.site, a.json)


if __name__ == "__main__":
    sys.exit(main())
