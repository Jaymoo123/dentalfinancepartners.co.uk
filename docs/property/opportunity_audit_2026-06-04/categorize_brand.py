"""Re-cut mined competitor candidates by BRAND CONTENT CATEGORY (not just technical tax).

Primary framing for the opportunity register: we are saturated on technical tax but
under-indexed on the broader brand surface (customer-decision, human/relatable,
general-accounting, authority/commentary). This maps where competitors spread and we don't.

Reads _sitemap_cache/*.json (whatever has been mined so far — interim or full).
Writes _brand_categories.json (per-category competitor-gap slugs + our coverage).
Read-only against our repo. Reusable for the final pass.
"""
from __future__ import annotations
import json, re
from pathlib import Path
from collections import defaultdict

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
CACHE = HERE / "_sitemap_cache"

# Drop clear foreign / one-off-news / forum noise (NOT general/authority/customer content).
NOISE = re.compile(r"(athens|greece|kallithea|smirni|kentro|diamerisma|alfamesitiki|golden-visa|illinois|chicago|texas|sydney|prahran|new-zealand|chalmers|negative-gearing|\.\d{4,}|\bvol-\d|oitr|ptpr|-q-c\b|ramadan|quran|fraud|jail|scam|sentenced|spared|fitch|lonely-hearts|nightmare|boris|blairs|candy-brothers|rayner|reeves|hunt|receipts-hit|\bvero\b|florida|carrollton)", re.I)
CASELAW = re.compile(r"(\bv-hmrc|vs-hmrc|-vs-|tribunal|\bftt\b|upper-tribunal|judgment|spotlight-\d)", re.I)

# Brand/content categories (ordered, first match wins). Specific/commercial before technical.
CATS = [
 ("Customer/Commercial (cost, choosing, switching)", r"(cost|fees?|how-much|pricing|price|cheap|affordable|worth-it|do-i-need|do-you-need|should-i-(hire|use|get)|choos|switch|changing-accountant|best-(property-)?accountant|find-an-accountant|what-to-expect|hiring|why-use|why-hire)"),
 ("Getting-started / lifecycle", r"(first-time|getting-started|beginner|how-to-become|how-to-start|starting-(a|out|your)|new-landlord|new-to-|complete-beginner|guide-for-new|setting-up|your-first|buying-your-first|become-a-landlord)"),
 ("General accounting / admin / software", r"(bookkeeping|book-keeping|record-keeping|records|software|\bxero\b|quickbooks|freeagent|cash-?flow|year-end|annual-accounts|company-accounts|confirmation-statement|payroll|accounts-deadline|spreadsheet|how-to-do-your|self-assessment-deadline|filing-your)"),
 ("Authority / commentary / explainers", r"(budget|autumn-statement|spring-statement|what-the|what-it-means|what-this-means|changes-to|explained|review-of|trends|predictions|outlook|whats-changing|2026-update|year-ahead|guide-2026|complete-guide)"),
 ("Tools / templates / checklists", r"(calculator|template|checklist|cheat-sheet|downloadable|free-guide|free-template)"),
 ("Human / mistakes / myths / stories", r"(mistakes|myths|common-(errors|mistakes)|pitfalls|traps|tips|dos-and-donts|case-study|success-story|lessons|what-i-learned|questions-answered|faqs|things-you|reasons-(to|why)|ways-to)"),
 ("Adjacent / cross-sell (mortgage, insurance, wills, pension)", r"(mortgage|remortgage|insurance|will-writing|\bwills?\b|probate|conveyanc|pension|protection|bridging-finance|equity-release|estate-planning)"),
 ("Local / location", r"(accountant(s)?-(in|near|london|manchester|birmingham|leeds|bristol|glasgow|edinburgh|liverpool|sheffield|cardiff|nottingham|leicester|coventry)|property-accountant-[a-z]+|near-me)"),
]
TECH = "Technical tax (specific reliefs/rules) - SATURATED"

def cat(s):
    for name, pat in CATS:
        if re.search(pat, s, re.I):
            return name
    return TECH

def main():
    cands = {}
    domains = 0
    for cf in CACHE.glob("*.json"):
        d = json.loads(cf.read_text()); domains += 1
        for t in d["topical"]:
            if t["best_jaccard"] < 0.30:
                cands.setdefault(t["slug"], d["domain"])
    clean = {s: dom for s, dom in cands.items() if not NOISE.search(s) and not CASELAW.search(s)}

    our = [p.stem for p in (ROOT / "Property/web/content/blog").glob("*.md")]
    comp_by = defaultdict(list); our_by = defaultdict(int)
    for s, dom in clean.items(): comp_by[cat(s)].append({"slug": s, "domain": dom})
    for s in our: our_by[cat(s)] += 1

    order = [n for n, _ in CATS] + [TECH]
    out = {"generated_from_domains": domains, "cleaned_candidate_slugs": len(clean), "our_pages": len(our),
           "categories": {}}
    for n in order:
        out["categories"][n] = {"competitor_gap_count": len(comp_by[n]), "our_pages": our_by[n],
                                "candidates": sorted(comp_by[n], key=lambda x: x["slug"])}
    (HERE / "_brand_categories.json").write_text(json.dumps(out, indent=2))
    print(f"domains mined: {domains} | clean candidate slugs: {len(clean)} | our pages: {len(our)}")
    print(f"{'CATEGORY':<52}{'comp-gap':>9}{'ours':>6}")
    for n in order:
        print(f"{n:<52}{len(comp_by[n]):>9}{our_by[n]:>6}")
    print("wrote _brand_categories.json")

if __name__ == "__main__":
    main()
