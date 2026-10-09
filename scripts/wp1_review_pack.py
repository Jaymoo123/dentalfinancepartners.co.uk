#!/usr/bin/env python3
"""
Owner review pack per service page (blueprint §12.5): the sixteen lines, old
versus new by section, the harness WARN rows, the reviewer NOTE items (when the
merge file exists), the link sentences pointing at the page, the screenshots
and the questions. Written to briefs/property/wp1-services/REVIEW_PACK_<slug>.md.

Usage: python scripts/wp1_review_pack.py [--draft draft2]
"""
from __future__ import annotations

import argparse
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from service_page_verify import BUILD_APP, DOCS, Page, load_html, sentences  # noqa: E402

BRIEFS = ROOT / "briefs/property/wp1-services"
SLUGS = ("property-accountant", "landlord-accountant", "property-tax-advice")
CODES = {"property-accountant": "PA", "landlord-accountant": "LA", "property-tax-advice": "PTA"}


def first_last(text: str) -> tuple[str, str]:
    s = sentences(text)
    return (s[0] if s else "", s[-1] if len(s) > 1 else "")


def warn_rows(report: str) -> list[str]:
    rows = [l for l in report.splitlines() if re.match(r"^\| \d+ \|", l) and "| WARN |" in l]
    out = []
    for r in rows:
        num = r.split("|")[1].strip()
        quotes = re.search(rf"\*\*{num}\. [^\n]*\*\*\n((?:- [^\n]*\n?)+)", report)
        out.append(r + ("\n" + quotes.group(1).strip() if quotes else ""))
    return out


def link_rows(code: str) -> list[str]:
    reg = (BRIEFS / "LINKS_APPLIED_2026-10-09.md").read_text(encoding="utf-8")
    rows = [l for l in reg.splitlines() if l.startswith("| ") and f"/services/{ {'PA':'property-accountant','LA':'landlord-accountant','PTA':'property-tax-advice'}[code] } |" in l]
    return rows


def build(slug: str, draft: str) -> str:
    code = CODES[slug]
    new = Page(load_html(BUILD_APP / f"services/{slug}.html"), slug)
    old = Page(load_html(DOCS / "snapshots_2026-10-09" / f"services_{slug}.html.gz"), "old")
    report = (BRIEFS / f"VERIFY_{slug}_{draft}.md").read_text(encoding="utf-8")
    merge = BRIEFS / f"MERGE_{slug}.md"
    opening = next((s for s in new.sections if s["level"] == 1), {"text": ""})["text"]
    cov = next((s for s in sentences(new.main_text) if re.search(r"\bUK\b", s) and sum(1 for c in ("London", "Manchester", "Birmingham", "Leeds", "Bristol") if c in s) >= 3), "(coverage sentence not found)")
    L = []
    L.append(f"# Review pack: `/services/{slug}` ({draft}, 2026-10-09)\n")
    L.append("Read §1 first; if those lines are right the page is mostly right. Reply with numbers from §7 or \"approved\" with the SHA at the end.\n")
    L.append("## 1. The sixteen lines\n")
    L.append(f"- **Title:** {new.title}")
    L.append(f"- **Meta description:** {new.meta_description}")
    L.append(f"- **H1:** {new.h1s[0]['text'] if new.h1s else ''}")
    L.append(f"- **Opening:** {opening}")
    L.append(f"- **Coverage sentence:** {cov}")
    for s in new.sections:
        if s["level"] == 2:
            f, _ = first_last(s["text"])
            L.append(f"- **H2 {s['heading']}** · {f}")
    L.append("- **FAQ questions:** " + " · ".join(q for q, _ in new.faq_schema))
    L.append("")
    L.append("## 2. Old versus new, by section\n")
    L.append("| New H2 | First sentence now | Old section it replaces (first sentence then) |\n|---|---|---|")
    old_secs = [s for s in old.sections if s["level"] == 2]
    for s in new.sections:
        if s["level"] != 2:
            continue
        f, _ = first_last(s["text"])
        # nearest old section by shared heading words
        hw = set(re.findall(r"\w+", s["heading"].lower()))
        best = max(old_secs, key=lambda o: len(hw & set(re.findall(r"\w+", o["heading"].lower()))), default=None)
        of = first_last(best["text"])[0] if best else ""
        L.append(f"| {s['heading']} | {f} | {best['heading'] if best else ''}: {of} |")
    L.append("")
    L.append("Old H2s with no replacement (dropped on purpose, reasons in the writer's hand-back and check 20): " + "; ".join(o["heading"] for o in old_secs if o["heading"] not in [s["heading"] for s in new.sections]))
    L.append("")
    L.append("## 3. What the harness flagged and was left (WARN rows)\n")
    for w in warn_rows(report):
        L.append(w)
        L.append("")
    L.append("## 4. Reviewer disagreements (NOTE items for you)\n")
    if merge.exists():
        m = merge.read_text(encoding="utf-8")
        sec = re.search(r"## 2[^\n]*\n(.*?)(?:\n## 3|\Z)", m, re.S)
        L.append(sec.group(1).strip() if sec else m)
    else:
        L.append("Pending: the two independent reviews and the merge have not run yet for this draft.")
    L.append("")
    L.append("## 5. The link sentences pointing at this page (before and after)\n")
    L.append("| # | File:line | Source type | Indexed | Before | After | Target | Class |\n|---|---|---|---|---|---|---|---|")
    for r in link_rows(code):
        L.append(r)
    L.append("")
    L.append("## 6. Screenshots\n")
    for name in ("desktop_top", "phone_top", "desktop", "phone"):
        L.append(f"- `briefs/property/wp1-services/shots/{slug}_{name}.jpg`")
    L.append("")
    L.append("## 7. Questions\n")
    L.append("1. Title and H1 as in §1: keep, or name the change. (Recommended: keep.)")
    L.append("2. The six \"What we do\" items are what the firm sells under this heading: confirm, or strike one.")
    L.append("3. The lead panel proof points are now the same on all three pages: \"Fixed fees, quoted upfront\", \"A free first call\", and a page-specific first line. The \"24-hour response\" point was removed from the service pages (it stays on the homepage and services index until F5). Agree, or restore it here.")
    L.append("4. Anything in §4 (reviewer notes) you want decided differently.")
    L.append("")
    return "\n".join(L) + "\n"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--draft", default="draft2")
    a = ap.parse_args()
    for slug in SLUGS:
        out = BRIEFS / f"REVIEW_PACK_{slug}.md"
        out.write_text(build(slug, a.draft), encoding="utf-8")
        print(out, len(out.read_text(encoding='utf-8').split()), "words")
    return 0


if __name__ == "__main__":
    sys.exit(main())
