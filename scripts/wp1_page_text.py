#!/usr/bin/env python3
"""
Two owner-readable files per service page, from the BUILT HTML:

  briefs/property/wp1-services/PAGE_TEXT_<slug>.md
      the page as a reader meets it: title, meta, every section's heading and
      prose in order, the FAQ, the body links out. Shared components (lead
      panel, calculators) are marked, not reproduced.

  briefs/property/wp1-services/QUERY_PLACEMENT_<slug>.md
      every assignment row for the page: the query, where the plan said it
      goes, where the matcher actually finds it, and the sentence it sits in.

Usage: python scripts/wp1_page_text.py   (after `npm run build` in Property/web)
"""
from __future__ import annotations

import csv
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from service_page_verify import BUILD_APP, DOCS, Page, load_html, sentences  # noqa: E402
from track2_query_coverage import classify_query, content_terms  # noqa: E402

BRIEFS = ROOT / "briefs/property/wp1-services"
SLUGS = ("property-accountant", "landlord-accountant", "property-tax-advice")
ORDER = ["title", "h1", "h2", "faq", "fees_section", "coverage_statement", "body"]


def page_text(pg: Page) -> str:
    L = [f"# `/services/{pg.label}` as a reader meets it (built {pathlib.Path(BUILD_APP / 'services' / (pg.label + '.html')).stat().st_mtime_ns // 10**9})", "",
         f"**Title tag:** {pg.title}", "", f"**Meta description:** {pg.meta_description}", ""]
    for s in pg.sections:
        tag = "#" * (s["level"] + 1)
        if pg.is_shared_section(s):
            L.append(f"{tag} {s['heading']}  *(shared component: lead panel or calculators, unchanged by this build)*")
            L.append("")
            continue
        L.append(f"{tag} {s['heading']}")
        L.append("")
        text = s["text"]
        # put each H3 on its own line where it occurs in the text
        for h3 in s["h3s"]:
            text = text.replace(h3, f"\n\n**{h3}**\n\n", 1)
        L.append(text.strip())
        L.append("")
    L.append("## FAQ (visible and schema, identical strings)")
    L.append("")
    for q, a in pg.faq_schema:
        L.append(f"**{q}**  ")
        L.append(a)
        L.append("")
    L.append("## Body links out")
    L.append("")
    seen = set()
    for href, text in pg.x.main_links:
        if href.startswith("/") and (href, text) not in seen:
            seen.add((href, text))
            L.append(f"- [{text}]({href})")
    return "\n".join(L) + "\n"


def sentence_with(query: str, pg: Page) -> str:
    terms = set(content_terms(query))
    best, score = "", 0
    for s in sentences(pg.main_text):
        st = set(content_terms(s))
        sc = len(terms & st)
        if sc > score:
            best, score = s, sc
    return best


def placement(pg: Page, slug: str) -> str:
    rows = [r for r in csv.DictReader(open(DOCS / "QUERY_ASSIGNMENT_2026-10-09.csv", encoding="utf-8", newline=""))
            if r["owner_page"] == f"/services/{slug}"]
    rows.sort(key=lambda r: (ORDER.index(r["placement"]) if r["placement"] in ORDER else 99, -float(r["gsc_impressions_90d"] or 0)))
    f = pg.fields()
    fee_sections = " ".join(s["text"] for s in pg.sections if re.search(r"\bfee|\bcost", s["heading"], re.I))
    cov = next((s for s in sentences(pg.main_text) if re.search(r"\b(UK|United Kingdom)\b", s) and re.search(r"video call|phone|email|remote|wherever|anywhere", s, re.I)), "")
    L = [f"# Query placement on `/services/{slug}`", "",
         "Every query the plan assigned to this page, where it was meant to go, where the matcher finds it (term match, singular and plural unified, numbers literal), and the sentence it lives in. `coverage_statement` rows are served by the one coverage sentence and never appear as strings; `near me` forms are in that group by ruling R5.", "",
         f"**Coverage sentence:** {cov or '(none found)'}", "",
         "| Query | Impr 90d | Planned | Found in | Sentence |", "|---|---|---|---|---|"]
    placed = 0
    for r in rows:
        q = r["query"]
        if r["placement"] == "coverage_statement":
            found = "coverage sentence" if cov else "MISSING"
            sent = ""
        elif r["placement"] == "fees_section":
            st = classify_query(q, {"fees": fee_sections})
            found = "fees section" if st["status"] == "covered" else f"{st['status']}"
            sent = sentence_with(q, pg)
        else:
            st = classify_query(q, f)
            found = ", ".join(st["where"]) if st["where"] else st["status"]
            sent = sentence_with(q, pg)
        if found not in ("missing", "partial", "MISSING"):
            placed += 1
        L.append(f"| {q} | {r['gsc_impressions_90d'] or ''} | {r['placement']} | {found} | {sent[:160].replace('|', '/')} |")
    L.insert(4, f"**Placed: {placed} of {len(rows)}.**")
    return "\n".join(L) + "\n"


def main() -> int:
    for slug in SLUGS:
        pg = Page(load_html(BUILD_APP / f"services/{slug}.html"), slug)
        (BRIEFS / f"PAGE_TEXT_{slug}.md").write_text(page_text(pg), encoding="utf-8")
        (BRIEFS / f"QUERY_PLACEMENT_{slug}.md").write_text(placement(pg, slug), encoding="utf-8")
        print(slug, "written")
    return 0


if __name__ == "__main__":
    sys.exit(main())
