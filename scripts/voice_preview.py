#!/usr/bin/env python3
"""Render a readable BEFORE/AFTER preview of a humanised page (Humanise Engine).

Produces a self-contained HTML file (inline CSS, no server, no node_modules) that
shows the pre-edit snapshot and the current page side by side, so a human can read
the voice and confirm nothing substantive was lost. Reusable for the whole proof
batch; with --batch it also writes an index.

  python scripts/voice_preview.py --slug <slug> [--site property]
  python scripts/voice_preview.py --batch <slug> <slug> ...   # + index.html
  -> writes .preview/<slug>.html (and .preview/index.html) and prints the path.
"""
from __future__ import annotations

import argparse
import html as _html
import json
import pathlib
import re
import sys

import yaml

ROOT = pathlib.Path(__file__).resolve().parents[1]
SNAP = ROOT / "optimisation_engine" / ".cache" / "humanise"
OUT = ROOT / ".preview"


def _blog_dir(site: str = "property") -> pathlib.Path:
    p = ROOT / "sites" / f"{site}.json"
    if p.exists():
        cfg = json.loads(p.read_text(encoding="utf-8"))
        return ROOT / cfg["paths"]["blogContentDir"]
    return ROOT / "Property" / "web" / "content" / "blog"


def _split(text: str):
    if not text.startswith("---"):
        return {}, text
    end = text.find("\n---", 3)
    if end == -1:
        return {}, text
    try:
        fm = yaml.safe_load(text[3:end]) or {}
    except Exception:
        fm = {}
    rest = text[end:]
    nl = rest.find("\n", 1)
    body = rest[nl + 1:] if nl != -1 else ""
    return (fm if isinstance(fm, dict) else {}), body


def _faqs_html(fm: dict) -> str:
    faqs = fm.get("faqs") or []
    if not isinstance(faqs, list) or not faqs:
        return ""
    rows = ["<h2>FAQs</h2>"]
    for f in faqs:
        if not isinstance(f, dict):
            continue
        q = _html.escape(str(f.get("question", "")))
        a = _html.escape(str(f.get("answer", "")))
        rows.append(f"<details open><summary><strong>{q}</strong></summary><p>{a}</p></details>")
    return "\n".join(rows)


def _col(label: str, raw: str | None) -> str:
    if raw is None:
        return f'<div class="col"><div class="lab miss">{label}: no snapshot</div></div>'
    fm, body = _split(raw)
    h1 = _html.escape(str(fm.get("h1") or fm.get("title") or ""))
    summary = _html.escape(str(fm.get("summary") or ""))
    words = len(re.sub(r"<[^>]+>", " ", body).split())
    return (f'<div class="col"><div class="lab">{label} '
            f'<span class="wc">({words} body words)</span></div>'
            f'<article class="prose"><h1>{h1}</h1>'
            f'<p class="sum"><em>{summary}</em></p>{body}{_faqs_html(fm)}</article></div>')


CSS = """
:root{--ink:#1a1a1a;--mut:#666;--line:#e2e2e2;--bg:#fafafa;--acc:#0b6;}
*{box-sizing:border-box}
body{margin:0;font:16px/1.65 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:var(--ink);background:var(--bg)}
.top{position:sticky;top:0;background:#fff;border-bottom:1px solid var(--line);padding:10px 16px;z-index:5}
.top h2{margin:0;font-size:15px}
.top .meta{color:var(--mut);font-size:13px}
.wrap{display:grid;grid-template-columns:1fr 1fr;gap:0}
.col{border-right:1px solid var(--line);min-width:0}
.col:last-child{border-right:0}
.lab{position:sticky;top:48px;background:#fff;border-bottom:1px solid var(--line);padding:8px 22px;font-weight:700;font-size:13px;letter-spacing:.04em;text-transform:uppercase;color:var(--mut)}
.lab.miss{color:#b00}
.wc{font-weight:400;text-transform:none;letter-spacing:0}
.prose{max-width:68ch;margin:0 auto;padding:14px 22px 60px}
.prose h1{font-size:24px;line-height:1.25;margin:.4em 0 .5em}
.prose h2{font-size:19px;margin:1.5em 0 .4em;padding-top:.3em;border-top:1px solid var(--line)}
.prose h3{font-size:16px;margin:1.2em 0 .3em}
.prose p{margin:.7em 0}
.prose .sum{color:var(--mut)}
.prose table{border-collapse:collapse;width:100%;margin:1em 0;font-size:14px}
.prose th,.prose td{border:1px solid var(--line);padding:6px 9px;text-align:left;vertical-align:top}
.prose th{background:#f0f0f0}
.prose ul,.prose ol{margin:.6em 0;padding-left:1.3em}
.prose details{margin:.4em 0;border:1px solid var(--line);border-radius:6px;padding:6px 10px;background:#fff}
.prose summary{cursor:pointer}
.prose a{color:var(--acc)}
.prose aside{background:#f0f7f4;border:1px solid #cde9dd;border-radius:8px;padding:10px 14px;margin:1em 0;font-size:14px}
"""


def render(slug: str, site: str) -> pathlib.Path:
    after_p = _blog_dir(site) / f"{slug}.md"
    before_p = SNAP / site / f"{slug}.before.md"
    after = after_p.read_text(encoding="utf-8") if after_p.exists() else None
    before = before_p.read_text(encoding="utf-8") if before_p.exists() else None
    if after is None:
        raise FileNotFoundError(after_p)
    page = (f"<!doctype html><html><head><meta charset='utf-8'>"
            f"<title>Humanise preview: {_html.escape(slug)}</title><style>{CSS}</style></head><body>"
            f"<div class='top'><h2>Humanise preview &middot; {_html.escape(slug)}</h2>"
            f"<div class='meta'>BEFORE (original) on the left, AFTER (humanised) on the right. "
            f"Facts/figures/citations/links are frozen by voice_safety_diff.py; this is a voice read.</div></div>"
            f"<div class='wrap'>{_col('BEFORE', before)}{_col('AFTER', after)}</div></body></html>")
    OUT.mkdir(parents=True, exist_ok=True)
    out = OUT / f"{slug}.html"
    out.write_text(page, encoding="utf-8")
    return out


def write_index(slugs: list[str]) -> pathlib.Path:
    items = "\n".join(
        f"<li><a href='./{_html.escape(s)}.html'>{_html.escape(s)}</a></li>" for s in slugs)
    page = (f"<!doctype html><html><head><meta charset='utf-8'><title>Humanise previews</title>"
            f"<style>body{{font:16px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;max-width:780px;"
            f"margin:40px auto;padding:0 20px}}li{{margin:.3em 0}}</style></head><body>"
            f"<h1>Humanise previews ({len(slugs)})</h1><ul>{items}</ul></body></html>")
    OUT.mkdir(parents=True, exist_ok=True)
    out = OUT / "index.html"
    out.write_text(page, encoding="utf-8")
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description="Render BEFORE/AFTER humanise previews.")
    ap.add_argument("--slug")
    ap.add_argument("--batch", nargs="+", help="render several slugs + an index.html")
    ap.add_argument("--site", default="property")
    args = ap.parse_args()
    slugs = args.batch or ([args.slug] if args.slug else [])
    if not slugs:
        ap.error("--slug or --batch required")
    paths = []
    for s in slugs:
        try:
            paths.append(render(s, args.site))
        except FileNotFoundError as e:
            print(f"  skip {s}: missing {e}", file=sys.stderr)
    if args.batch and paths:
        idx = write_index([p.stem for p in paths])
        print(f"index -> {idx}")
    for p in paths:
        print(f"preview -> {p}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
