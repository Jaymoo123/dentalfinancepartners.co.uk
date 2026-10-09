#!/usr/bin/env python3
"""
Build the writer research packs for the three service pages (blueprint §6 step 5).

Reads the blueprint, the assignment CSV, the teardown, the audit and the BUILT
page (Property/web/.next/server/app/services/<slug>.html) and writes
briefs/property/wp1-services/<slug>.pack.md. Re-run after any input changes.
Usage: python scripts/wp1_build_packs.py
"""
from __future__ import annotations

import csv
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from service_page_verify import BUILD_APP, Page, load_html  # noqa: E402

DOCS = ROOT / "docs/property/commercial_recovery_2026-10-07"
OUT = ROOT / "briefs/property/wp1-services"
CODES = {"property-accountant": "PA", "landlord-accountant": "LA", "property-tax-advice": "PTA"}
HEADS = {"property-accountant": "### 3.2", "landlord-accountant": "### 3.3", "property-tax-advice": "### 3.4"}
NEXTS = {"property-accountant": "### 3.3", "landlord-accountant": "### 3.4", "property-tax-advice": "## 4."}
ORDER = ["title", "h1", "h2", "faq", "fees_section", "coverage_statement", "body"]


def between(text: str, start: str, ends: list[str]) -> str:
    """Text from `start` up to the first of `ends` (a LIST; a string here once
    produced empty sections because Python iterated its characters)."""
    assert isinstance(ends, list)
    i = text.index(start)
    j = len(text)
    for e in ends:
        k = text.find(e, i + len(start))
        if k != -1:
            j = min(j, k)
    chunk = text[i:j].rstrip()
    # Embedded documents carry their own H2/H3 headings; demote them two levels
    # so the pack's own section numbering stays the outline, and strip
    # em-dashes so a writer never copies one into page copy.
    chunk = re.sub(r"^(#{2,4}) ", lambda m: "#" * (len(m.group(1)) + 2) + " ", chunk, flags=re.M)
    return chunk.replace("\u2014", " - ")


def main() -> int:
    bp = (DOCS / "SERVICE_PAGES_BLUEPRINT_2026-10-09.md").read_text(encoding="utf-8")
    audit = (DOCS / "AUDIT_IMPL_2026-10-09.md").read_text(encoding="utf-8")
    tear = (DOCS / "TEARDOWN_2026-10-09.md").read_text(encoding="utf-8")
    shape = between(bp, "### 3.1 Shared shape", ["### 3.2"])
    sec4 = between(bp, "## 4. The pages that give up", ["## 5."])
    sec5 = between(bp, "## 5. Links in", ["## 6."])
    sec12_3 = between(bp, "### 12.3 Contextual layer", ["### 12.4"])
    paa = between(tear, "## (c) People Also Ask", ["## (d)"])
    aud2c = between(audit, "### 2c. Proposed body links", ["### 2d."])
    aud6 = between(audit, "## 6. Non-copy elements", ["## Unknowns"])
    rows = list(csv.DictReader(open(DOCS / "QUERY_ASSIGNMENT_2026-10-09.csv", encoding="utf-8", newline="")))
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, code in CODES.items():
        spec = between(bp, HEADS[slug], [NEXTS[slug]])
        own = [r for r in rows if r["owner_page"] == f"/services/{slug}"]
        own.sort(key=lambda r: (ORDER.index(r["placement"]) if r["placement"] in ORDER else 99,
                                -float(r["gsc_impressions_90d"] or 0)))
        tbl = ["| placement | query | impressions 90d | monthly volume | current best page (pos) | rationale |",
               "|---|---|---|---|---|---|"]
        for r in own:
            tbl.append(f"| {r['placement']} | {r['query']} | {r['gsc_impressions_90d'] or ''} | {r['monthly_volume'] or ''} | "
                       f"{r['current_best_page'] or ''} ({r['current_best_position'] or ''}) | {r['rationale'].replace('|', '/')} |")
        others = [r for r in rows if (r["owner_page"].startswith("/locations/") or r["placement"] in ("exclude", "city_page"))
                  and r.get("phrase_family") != "brand"]
        leak = ["| query | owner | placement |", "|---|---|---|"] + [f"| {r['query']} | {r['owner_page']} | {r['placement']} |" for r in others]
        tsec = between(tear, f"### Owned by /services/{slug}", ["### Owned by", "## (b)"])
        pg = Page(load_html(BUILD_APP / f"services/{slug}.html"), slug)
        cur = [f"**Title:** {pg.title}", f"**Meta description:** {pg.meta_description}", ""]
        for s in pg.sections:
            cur.append(f"{'#' * (s['level'] + 2)} {s['heading']}" + (f"  (id `{s['id']}`)" if s["id"] else "  (no id)"))
            if s["h3s"]:
                cur.append("H3s: " + " · ".join(s["h3s"]))
            cur.append(s["text"])
            cur.append("")
        cur.append("**FAQ (schema, verbatim):**")
        for q, a in pg.faq_schema:
            cur.append(f"- **{q}** {a}")
        links = sorted({h for h, _ in pg.x.main_links if h.startswith("/")})
        cur.append("")
        cur.append("**Body links out today:** " + ", ".join(links))
        pack = f"""# Research pack: `/services/{slug}` (WP1-services, 2026-10-09)

This pack is the writer's whole world (REWRITE_PROGRAM §9.9 "On the writer"). Scope, constraints, phrases, questions, the competitor read, the current copy and the acceptance checks are all here or named here. Anything the writer believes is missing goes back as a delta in the hand-back, not into the page. Regenerate with `python scripts/wp1_build_packs.py` after a build.

## 0. Non-negotiables

- Blueprint: `docs/property/commercial_recovery_2026-10-07/SERVICE_PAGES_BLUEPRINT_2026-10-09.md`. Rulings R1 to R29 bind. R5 (intent-led, no "near me" strings), R7 (no fee figure, no hours, no professional body, no named person, no response-time claim in copy), R27 (the only contact facts: `umair@propertytaxpartners.co.uk`, `+44 7723 568557`, rendered by `LeadCTAPanel`; do not repeat them in copy), R24 ("property tax accounting" forms in body only), R21 (commercial property yes, development no).
- Register and voice: `docs/property/commercial_recovery_2026-10-07/ANSWER_PATTERN_SPEC_services_2026-10.md` (read it first; the editorial review is run against it, not against taste). Measured: the winners say "we/our" 24 times per 1,000 words against our 12.6, cite statute 0 times against our 4.1, and run 1,250 words against our 2,700. Write in the first person about the firm, link to the guide instead of citing the section, and cut.
- Facts: every tax number cites `docs/property/house_positions.md` by section (`§N.M`) in a code comment next to it; no number without one. House positions §13 is the do-not-write list.
- No em-dashes (U+2014) anywhere in copy. No "every client", no "landlords only", no "fixed annual fee in writing", no "developers" as a client group (the only fee wording is: fixed fees quoted upfront, you approve the fee before work starts).
- Schema: `Service.@id` is `<page-url>#service`; `provider` is `{{ "@id": "<site-url>#organization" }}` with NO slash before the hash (that is the form `lib/schema.ts` emits for the Organization node); `areaServed` is `{{ "@type": "Country", "name": "United Kingdom" }}`; `hasOfferCatalog` is built from the same array that renders the "What we do" H3s, as `Offer` items carrying `name` (or `itemOffered` with a nested `Service`; both pass).
- Output: the full route file `Property/web/src/app/services/{slug}/page.tsx`, copy and schema, preserving every element in §8 below. The conductor builds once and runs `python scripts/service_page_verify.py --slug {slug}`; you receive the report and fix every BLOCK in a second pass.

## 1. The page specification (blueprint §{HEADS[slug][4:]})

{shape}

{spec}

## 2. The phrases (assignment table, this page's rows only)

Placement means where the matcher must find it: `title` in the title tag, `h1`, `h2` in some H2, `faq` in a FAQ question or answer, `fees_section` in the section whose H2 names fees or cost, `coverage_statement` served by the one coverage sentence (never as a literal string), `body` anywhere once where natural.

{chr(10).join(tbl)}

Strings that must NOT appear on this page (owned by a city page, or excluded). The check is a whole-phrase literal match, so a longer phrase that contains one of these as consecutive words also trips it (write "real estate accountants", not "...estate accountant"):

{chr(10).join(leak)}

## 3. The questions people ask (People Also Ask, mapped)

{paa}

## 4. What the winners do on this page's terms (teardown)

{tsec}

The trust elements the winners show (phone, reviews, professional body, fee figure) are the deferred facts; do not invent them. The AI overviews lift one definition sentence then short labelled lines; write the opening and each "What we do" item in that shape.

## 5. The current page, rendered (what Google holds today; the §12.2 check 20 baseline)

{chr(10).join(cur)}

## 6. Links that will point at this page, and what their anchors promise (audit §2c; this page is `{code}`)

The page must answer what these anchors promise. Rows with Target `{code}` are yours. The applied set, with final wording, is `briefs/property/wp1-services/LINKS_APPLIED_2026-10-09.md`.

{aud2c}

## 7. Give-up pages and the links-in rules (blueprint §4, §5)

{sec4}

{sec5}

## 8. Preserve through the rewrite (audit §6; column `{code}`)

{aud6}

## 9. How the page is reviewed after you hand it back (blueprint §12.3)

{sec12_3}
"""
        out = OUT / f"{slug}.pack.md"
        pack = pack.replace("\u2014", " - ")  # the rendered current page can carry one; a writer must not copy it
        out.write_text(pack, encoding="utf-8")
        print(out, len(pack.split()), "words, em-dashes:", pack.count("—"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
