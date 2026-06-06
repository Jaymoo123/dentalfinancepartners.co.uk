#!/usr/bin/env python3
"""Deterministic fact / citation / link / frontmatter preservation guard
(Humanise Engine, C2).

WHAT THIS IS
------------
The hard guarantee that a Humanise voice-rewrite changed ONLY voice, never a
fact. It is pure Python (no LLM judgement). The Humanise workflow snapshots a
page's bytes BEFORE editing, lets Opus rewrite the prose, then runs `check`: if
any figure, statute/treaty citation, internal link, or protected frontmatter
value differs from the snapshot, the page FAILS and is reverted.

WHAT IS GUARDED (must be IDENTICAL before -> after)
---------------------------------------------------
  figures      every £ amount, %, year (19xx/20xx), year-tag (2026/27),
               comma/4+ digit threshold, and number+unit (60 days, 45p,
               10,000 miles). No value may be removed OR added (a removed value
               = a dropped fact; an added value = a fabricated/changed fact).
  citations    every statute (FA/CTA/TCGA/ITTOIA/IHTA/... + s.NNN / section N -
               reusing qa_verdict._STATUTE_RE) and every treaty/legislation
               reference (Article/Schedule/Part/paragraph N). Set preserved.
  links        every internal /blog/ href. Exact set preserved (no internal
               link, and therefore no SEO juice, may be lost when meta-commentary
               around it is removed - the rewriter must re-home the link).
  frontmatter  slug, category, metaTitle, metaDescription, h1, canonical, date,
               dateModified, reviewedBy, reviewerCredentials, reviewedAt, author,
               image, altText, schema: byte-identical. FAQ questions (query-
               bearing): same set. FAQ count + howToSteps count: unchanged.

WHAT IS EDITABLE (voice)
------------------------
  body prose, the summary text, FAQ answers, howToStep text - subject to every
  guard above (their facts/citations/links are still frozen). Query coverage
  itself is verified separately by scripts/track2_query_coverage.py (Check 2).

CLI
---
  python scripts/voice_safety_diff.py snapshot --slug <slug> [--site property]
  python scripts/voice_safety_diff.py check    --slug <slug> [--site property] [--json]
  python scripts/voice_safety_diff.py restore  --slug <slug> [--site property]
  python scripts/voice_safety_diff.py --selftest

`check` exits 0 if every guard holds (safe), 2 if any fact/citation/link/
frontmatter drifted (revert the page), 1 on error (no snapshot, etc.).
"""
from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys

import yaml

ROOT = pathlib.Path(__file__).resolve().parents[1]
CACHE = ROOT / "optimisation_engine" / ".cache"
SNAP = CACHE / "humanise"

# Reuse the statute regex from the QA verdict tool (single source of truth).
if str(ROOT / "scripts") not in sys.path:
    sys.path.insert(0, str(ROOT / "scripts"))
try:
    from qa_verdict import _STATUTE_RE
except Exception:  # pragma: no cover - fallback keeps the guard self-contained
    _STATUTE_RE = re.compile(
        r"Finance\s*\(No\.?\s*2\)\s*Act\s*20\d\d|Finance\s+Act\s+20\d\d|\bFA\s*20\d\d|"
        r"CAA\s*2001|TCGA\s*1992|ITTOIA\s*2005|ITA\s*2007|CTA\s*20\d\d|IHTA\s*1984|"
        r"TMA\s*1970|VATA\s*1994|\bs\.?\s?\d+[A-Z]{0,3}\b|\bsection\s+\d+", re.I)

# Treaty / legislation references the statute regex does not cover.
_CITATION_EXTRA = re.compile(
    r"\b(?:Article|Schedule|Sch|Part|paragraph|para)\.?\s+\d+[A-Z]{0,3}"
    r"(?:\(\d+[A-Za-z]?\))?", re.I)

# Figure families. Order matters only for readability; comparison is set-based.
_FIGURE_RES = [
    re.compile(r"£\s?\d[\d,]*(?:\.\d+)?"),                 # money
    re.compile(r"\d+(?:\.\d+)?\s?%"),                       # percent
    re.compile(r"\b20\d\d/\d\d\b"),                         # year-tag 2026/27
    re.compile(r"\b(?:19|20)\d\d\b"),                       # year
    re.compile(r"\b\d{1,3}(?:,\d{3})+\b"),                  # comma threshold
    re.compile(r"\b\d{4,}\b"),                              # 4+ digit
    re.compile(r"\b\d+(?:\.\d+)?\s?(?:p|pence|days?|weeks?|months?|years?|miles?)\b",
               re.I),                                       # number + unit
]

_HREF_RE = re.compile(r'href="(/blog/[^"#?]+)"')

PROTECTED_FM = [
    "slug", "category", "metaTitle", "metaDescription", "h1", "canonical",
    "date", "dateModified", "reviewedBy", "reviewerCredentials", "reviewedAt",
    "author", "image", "altText", "schema",
]


def _blog_dir(site: str = "property") -> pathlib.Path:
    p = ROOT / "sites" / f"{site}.json"
    if p.exists():
        cfg = json.loads(p.read_text(encoding="utf-8"))
        return ROOT / cfg["paths"]["blogContentDir"]
    return ROOT / "Property" / "web" / "content" / "blog"


# --------------------------------------------------------------------------- #
# Extraction                                                                   #
# --------------------------------------------------------------------------- #
def _figures(text: str) -> set[str]:
    out: set[str] = set()
    for rx in _FIGURE_RES:
        for m in rx.finditer(text):
            out.add(re.sub(r"\s+", "", m.group(0)).lower())
    return out


def _citations(text: str) -> set[str]:
    out: set[str] = set()
    for rx in (_STATUTE_RE, _CITATION_EXTRA):
        for m in rx.finditer(text):
            out.add(re.sub(r"\s+", " ", m.group(0)).strip().lower())
    return out


def _hrefs(text: str) -> set[str]:
    return set(_HREF_RE.findall(text))


def _split_frontmatter(text: str):
    if not text.startswith("---"):
        return None, text
    end = text.find("\n---", 3)
    if end == -1:
        return None, text
    return text[3:end], text[end:]


def _parse_fm(text: str) -> dict:
    fm_text, _ = _split_frontmatter(text)
    try:
        fm = yaml.safe_load(fm_text) if fm_text else {}
    except Exception:
        fm = {}
    return fm if isinstance(fm, dict) else {}


def _faq_questions(fm: dict) -> list[str]:
    faqs = fm.get("faqs") or []
    if not isinstance(faqs, list):
        return []
    return sorted(re.sub(r"\s+", " ", str(f.get("question", "")).strip().lower())
                  for f in faqs if isinstance(f, dict))


# --------------------------------------------------------------------------- #
# Core comparison                                                              #
# --------------------------------------------------------------------------- #
def check_texts(before: str, after: str, slug: str = "") -> dict:
    fig_b, fig_a = _figures(before), _figures(after)
    cit_b, cit_a = _citations(before), _citations(after)
    href_b, href_a = _hrefs(before), _hrefs(after)
    fm_b, fm_a = _parse_fm(before), _parse_fm(after)

    removed_figures = sorted(fig_b - fig_a)
    added_figures = sorted(fig_a - fig_b)
    removed_citations = sorted(cit_b - cit_a)
    added_citations = sorted(cit_a - cit_b)
    removed_links = sorted(href_b - href_a)
    added_links = sorted(href_a - href_b)

    fm_mismatch = []
    for f in PROTECTED_FM:
        vb, va = fm_b.get(f), fm_a.get(f)
        if str(vb) != str(va):
            fm_mismatch.append({"field": f, "before": vb, "after": va})

    faq_issues = []
    qb, qa = _faq_questions(fm_b), _faq_questions(fm_a)
    if len(qb) != len(qa):
        faq_issues.append(f"faq count changed: {len(qb)} -> {len(qa)}")
    elif qb != qa:
        faq_issues.append("faq question set changed (questions are query-bearing)")
    hb = len(fm_b.get("howToSteps") or []) if isinstance(fm_b.get("howToSteps"), list) else 0
    ha = len(fm_a.get("howToSteps") or []) if isinstance(fm_a.get("howToSteps"), list) else 0
    if hb != ha:
        faq_issues.append(f"howToSteps count changed: {hb} -> {ha}")

    numbers_ok = not (removed_figures or added_figures)
    statutes_ok = not (removed_citations or added_citations)
    links_ok = not (removed_links or added_links)
    frontmatter_ok = not fm_mismatch
    faqs_ok = not faq_issues
    passed = numbers_ok and statutes_ok and links_ok and frontmatter_ok and faqs_ok

    return {
        "slug": slug,
        "passed": passed,
        "numbers_ok": numbers_ok,
        "statutes_ok": statutes_ok,
        "links_ok": links_ok,
        "frontmatter_ok": frontmatter_ok,
        "faqs_ok": faqs_ok,
        "removed_figures": removed_figures,
        "added_figures": added_figures,
        "removed_citations": removed_citations,
        "added_citations": added_citations,
        "removed_links": removed_links,
        "added_links": added_links,
        "frontmatter_mismatches": fm_mismatch,
        "faq_issues": faq_issues,
    }


# --------------------------------------------------------------------------- #
# File ops                                                                     #
# --------------------------------------------------------------------------- #
def _snap_path(slug: str, site: str) -> pathlib.Path:
    return SNAP / site / f"{slug}.before.md"


def snapshot(slug: str, site: str) -> int:
    src = _blog_dir(site) / f"{slug}.md"
    if not src.exists():
        print(f"ERROR: no live page {src}", file=sys.stderr)
        return 1
    dst = _snap_path(slug, site)
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_bytes(src.read_bytes())
    print(f"snapshot: {slug} -> {dst}")
    return 0


def restore(slug: str, site: str) -> int:
    snap = _snap_path(slug, site)
    if not snap.exists():
        print(f"ERROR: no snapshot {snap}", file=sys.stderr)
        return 1
    live = _blog_dir(site) / f"{slug}.md"
    live.write_bytes(snap.read_bytes())
    print(f"restore: {snap} -> {live} (page reverted to pre-edit bytes)")
    return 0


def check(slug: str, site: str, as_json: bool) -> int:
    snap = _snap_path(slug, site)
    live = _blog_dir(site) / f"{slug}.md"
    if not snap.exists():
        print(f"ERROR: no snapshot for {slug} (run `snapshot` first): {snap}", file=sys.stderr)
        return 1
    if not live.exists():
        print(f"ERROR: no live page {live}", file=sys.stderr)
        return 1
    res = check_texts(snap.read_text(encoding="utf-8"),
                      live.read_text(encoding="utf-8"), slug)
    if as_json:
        print(json.dumps(res, indent=2, ensure_ascii=False))
    else:
        _print_human(res)
    return 0 if res["passed"] else 2


def _print_human(res: dict) -> None:
    print(f"\nSafety diff: {res['slug']}   {'PASS' if res['passed'] else 'FAIL'}")
    print("=" * 60)
    print(f"  figures      : {'ok' if res['numbers_ok'] else 'CHANGED'}")
    for x in res["removed_figures"]:
        print(f"      - removed figure: {x}")
    for x in res["added_figures"]:
        print(f"      + added figure  : {x}")
    print(f"  citations    : {'ok' if res['statutes_ok'] else 'CHANGED'}")
    for x in res["removed_citations"]:
        print(f"      - removed cite  : {x}")
    for x in res["added_citations"]:
        print(f"      + added cite    : {x}")
    print(f"  links        : {'ok' if res['links_ok'] else 'CHANGED'}")
    for x in res["removed_links"]:
        print(f"      - removed link  : {x}")
    for x in res["added_links"]:
        print(f"      + added link    : {x}")
    print(f"  frontmatter  : {'ok' if res['frontmatter_ok'] else 'CHANGED'}")
    for m in res["frontmatter_mismatches"]:
        print(f"      ! {m['field']}: {m['before']!r} -> {m['after']!r}")
    print(f"  faqs         : {'ok' if res['faqs_ok'] else 'CHANGED'}")
    for x in res["faq_issues"]:
        print(f"      ! {x}")


# --------------------------------------------------------------------------- #
# Self-test                                                                    #
# --------------------------------------------------------------------------- #
def _selftest() -> int:
    def mk(body, **fm):
        front = {"slug": "x", "category": "Cat", "metaTitle": "T", "h1": "H",
                 "faqs": fm.pop("faqs", [{"question": "What is X?", "answer": "A."}])}
        front.update(fm)
        lines = []
        for k, v in front.items():
            lines.append(f"{k}: {json.dumps(v)}")
        return "---\n" + "\n".join(lines) + "\n---\n" + body

    base = mk("<p>The landlord pays £3,000 at 18% under FA 2013 Schedule 10. "
              'See <a href="/blog/x/y">our guide</a> and Article 6.</p>')
    cases = [
        ("identical -> PASS", base, base, True),
        ("voice-only change (the landlord -> you) -> PASS",
         base,
         mk("<p>You pay £3,000 at 18% under FA 2013 Schedule 10. "
            'See <a href="/blog/x/y">our guide</a> and Article 6.</p>'),
         True),
        ("changed figure £3,000 -> £4,000 -> FAIL",
         base,
         mk("<p>You pay £4,000 at 18% under FA 2013 Schedule 10. "
            'See <a href="/blog/x/y">our guide</a> and Article 6.</p>'),
         False),
        ("dropped internal link -> FAIL",
         base,
         mk("<p>You pay £3,000 at 18% under FA 2013 Schedule 10 and Article 6.</p>"),
         False),
        ("dropped statute FA 2013 -> FAIL",
         base,
         mk("<p>You pay £3,000 at 18% under Schedule 10. "
            'See <a href="/blog/x/y">our guide</a> and Article 6.</p>'),
         False),
        ("dropped Article 6 -> FAIL",
         base,
         mk("<p>You pay £3,000 at 18% under FA 2013 Schedule 10. "
            'See <a href="/blog/x/y">our guide</a>.</p>'),
         False),
        ("changed metaTitle -> FAIL",
         base,
         mk("<p>You pay £3,000 at 18% under FA 2013 Schedule 10. "
            'See <a href="/blog/x/y">our guide</a> and Article 6.</p>', metaTitle="DIFFERENT"),
         False),
        ("changed FAQ question -> FAIL",
         base,
         mk("<p>You pay £3,000 at 18% under FA 2013 Schedule 10. "
            'See <a href="/blog/x/y">our guide</a> and Article 6.</p>',
            faqs=[{"question": "A reworded question?", "answer": "A."}]),
         False),
        ("voice-edit FAQ answer only -> PASS",
         base,
         mk("<p>You pay £3,000 at 18% under FA 2013 Schedule 10. "
            'See <a href="/blog/x/y">our guide</a> and Article 6.</p>',
            faqs=[{"question": "What is X?", "answer": "You report it on a return."}]),
         True),
    ]
    all_ok = True
    for label, b, a, expect in cases:
        res = check_texts(b, a, "selftest")
        ok = res["passed"] == expect
        all_ok = all_ok and ok
        print(f"  [{'PASS' if ok else 'FAIL'}] {label}")
        if not ok:
            print(f"         expected passed={expect}, got {res['passed']}: "
                  f"figs-{res['removed_figures']}/{res['added_figures']} "
                  f"cite-{res['removed_citations']}/{res['added_citations']} "
                  f"links-{res['removed_links']}/{res['added_links']} "
                  f"fm{res['frontmatter_mismatches']} faq{res['faq_issues']}")
    print("\nSELFTEST:", "PASS" if all_ok else "FAIL")
    return 0 if all_ok else 1


def main() -> int:
    ap = argparse.ArgumentParser(description="Fact/citation/link/frontmatter preservation guard.")
    ap.add_argument("cmd", nargs="?", choices=["snapshot", "check", "restore"],
                    help="snapshot before editing, check after, restore to revert")
    ap.add_argument("--slug")
    ap.add_argument("--site", default="property")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--selftest", action="store_true")
    args = ap.parse_args()

    if args.selftest:
        return _selftest()
    if not args.cmd:
        ap.error("a command is required: snapshot | check | restore (or --selftest)")
    if not args.slug:
        ap.error("--slug is required")
    if args.cmd == "snapshot":
        return snapshot(args.slug, args.site)
    if args.cmd == "restore":
        return restore(args.slug, args.site)
    return check(args.slug, args.site, args.json)


if __name__ == "__main__":
    sys.exit(main())
