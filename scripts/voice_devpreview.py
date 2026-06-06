#!/usr/bin/env python3
"""Stage BEFORE/AFTER on the running dev server + a clickable index (Humanise review).

Creates a temp <slug>-orig.md from the pre-edit snapshot so the dev server serves
the original alongside the humanised page, and writes .preview/devindex.html with
both localhost URLs per page. `clean` removes the temp originals afterwards.

  python scripts/voice_devpreview.py build <slug> [<slug> ...] [--port 3030]
  python scripts/voice_devpreview.py clean
"""
from __future__ import annotations

import argparse
import html as H
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
SNAP = ROOT / "optimisation_engine" / ".cache" / "humanise"
OUT = ROOT / ".preview"


def _blog_dir(site: str = "property") -> pathlib.Path:
    p = ROOT / "sites" / f"{site}.json"
    if p.exists():
        return ROOT / json.loads(p.read_text(encoding="utf-8"))["paths"]["blogContentDir"]
    return ROOT / "Property/web/content/blog"


def _fm_field(text: str, field: str) -> str:
    m = re.search(rf'^{field}:\s*"?(.*?)"?\s*$', text, re.M)
    return m.group(1).strip() if m else ""


def _slugify(s: str) -> str:
    s = s.lower().replace("&", "and")
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def build(slugs, site, port) -> None:
    blog = _blog_dir(site)
    rows = []
    for slug in slugs:
        after = blog / f"{slug}.md"
        snap = SNAP / site / f"{slug}.before.md"
        if not after.exists():
            print(f"  skip {slug}: no live page", file=sys.stderr)
            continue
        cat = _slugify(_fm_field(after.read_text(encoding="utf-8"), "category"))
        after_url = f"http://localhost:{port}/blog/{cat}/{slug}"
        before_url = ""
        if snap.exists():
            txt = snap.read_text(encoding="utf-8")
            txt = txt.replace(f'slug: "{slug}"', f'slug: "{slug}-orig"')
            txt = re.sub(r'^(title: ")', r'\g<1>[ORIGINAL] ', txt, count=1, flags=re.M)
            txt = re.sub(r'^(h1: ")', r'\g<1>[ORIGINAL] ', txt, count=1, flags=re.M)
            (blog / f"{slug}-orig.md").write_text(txt, encoding="utf-8")
            before_url = f"http://localhost:{port}/blog/{cat}/{slug}-orig"
        rows.append((slug, before_url, after_url))

    items = []
    for slug, b, a in rows:
        bl = f'<a href="{b}" target="_blank">BEFORE (original)</a>' if b else "no snapshot"
        items.append(f"<tr><td>{H.escape(slug)}</td><td>{bl}</td>"
                     f'<td><a href="{a}" target="_blank">AFTER (humanised)</a></td></tr>')
    page = (
        "<!doctype html><meta charset=utf-8><title>Humanise proof batch</title>"
        "<style>body{font:16px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;"
        "max-width:920px;margin:40px auto;padding:0 20px;color:#1a1a1a}"
        "table{border-collapse:collapse;width:100%;margin-top:16px}"
        "td,th{border:1px solid #ddd;padding:10px 12px;text-align:left}"
        "th{background:#f3f3f3}a{color:#0a7;font-weight:600;text-decoration:none}"
        "a:hover{text-decoration:underline}</style>"
        "<h1>Humanise proof batch &mdash; before / after</h1>"
        "<p>Open a pair in two tabs and read side by side. Left is the original, "
        f"right is the humanised version, both rendered by the dev server on :{port}. "
        "Facts, figures, statutes, links and SEO are frozen; you are judging voice.</p>"
        "<table><tr><th>Page</th><th>Original</th><th>Humanised</th></tr>"
        + "".join(items) + "</table>")
    OUT.mkdir(parents=True, exist_ok=True)
    idx = OUT / "devindex.html"
    idx.write_text(page, encoding="utf-8")
    print(f"index -> {idx}")
    for slug, b, a in rows:
        print(f"  {slug}\n    BEFORE {b or '(none)'}\n    AFTER  {a}")


def clean(site: str) -> None:
    blog = _blog_dir(site)
    n = 0
    for f in list(blog.glob("*-orig.md")) + list(blog.glob("dta-iom-original.md")):
        f.unlink()
        n += 1
    print(f"removed {n} temp original file(s)")


def main() -> int:
    ap = argparse.ArgumentParser(description="Stage before/after on the dev server.")
    ap.add_argument("cmd", choices=["build", "clean"])
    ap.add_argument("slugs", nargs="*")
    ap.add_argument("--site", default="property")
    ap.add_argument("--port", type=int, default=3030)
    a = ap.parse_args()
    if a.cmd == "clean":
        clean(a.site)
        return 0
    if not a.slugs:
        ap.error("build needs at least one slug")
    build(a.slugs, a.site, a.port)
    return 0


if __name__ == "__main__":
    sys.exit(main())
