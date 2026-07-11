"""R3 tier1 manufacturing — Stage 5b: judged final pool.

Applies Claude's judgment to s5_pool_build.py output (2026-07-12):
 - Estate dedup was NOT clean this niche: 15 exact + 34 fuzzy dupes, all in the generic
   annual-investment-allowance / full-expensing / capital-allowances family already owned
   by generalist + dentists + property pages. Judgment: the WALL extends beyond the exact
   dupes — every generic capital-allowances term WITHOUT a manufacturing/plant qualifier
   is dropped (generalist-territory), not just the measured collisions.
 - All 158 borderline pairs reviewed by family: dominated by the same generic-AIA family
   (handled by the wall above); the non-CA remainder ("accountants for manufacturers" ~
   "accountant for farmers" 0.791 etc.) are sorted-token difflib false positives — kept.
 - Adjacency wall (contractors-ir35): all 48 flagged terms dropped — generic/unqualified
   R&D-relief terms, R&D blog-slug noise from rival sitemaps, plus one regex false
   positive ("fertiliser and diesel costs" matches 'r and d' across word boundaries —
   off-scope farming junk, dropped anyway).
 - Junk sweep: non-UK finance (SBI/EMI/australia), student costing-theory phrasing,
   consumer machine-loan rate shopping, capital-WIP (Indian AS-10 flavour), software
   brand noise, numbered sitemap-slug fragments.
Then greedy-cluster into page-level topics (difflib >=0.85 on sorted-token norm).
No volumes/KD this run (zero DataForSEO) — fields left null for the paid pull.
"""
from __future__ import annotations

import difflib
import json
import re
from pathlib import Path

HERE = Path(__file__).parent

MFG_QUALIFIER_RE = re.compile(
    r"manufactur|engineering|factory|factories|fabricat|cnc|machin|plant|equipment|"
    r"tooling|industrial|aerospace|automotive|food|steel|foundry|production|workshop", re.I)

GENERIC_CA_RE = re.compile(
    r"annual investment allowance|full expensing|capital allowance|first.?year allowance|"
    r"writing down allowance", re.I)

JUNK_RE = re.compile(
    # non-UK finance/geo
    r"\bsbi\b|\bemi\b|hdfc|australia|ontario|ireland|\bnz\b|\busa\b|american|"
    # student / theory / definition phrasing (DIY, not operator intent)
    r"is prepared to|class 1[12]|igcse|tally|journal|ledger|trial balance|"
    r"formula sheet|questions|worksheet|example problems|"
    # consumer loan-rate shopping (lender territory)
    r"loan emi|loan interest rate|finance rates|hire purchase rates|"
    # capital-WIP (Indian AS-10 accounting-standard family, not UK stock/WIP)
    r"capital work in progress|cwip|"
    # brand/software noise
    r"freeagent|croner|xero|sage|brightpay|moneysoft|"
    # sitemap slug fragments with stray numbers
    r"\b\d{3,}\b|20120321|"
    # consumer curiosities
    r"made in britain (?:mugs|gifts|clothing|logo|stamp)", re.I)

STOP = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "is", "are",
        "can", "do", "does", "how", "what", "when", "uk", "your", "you", "my", "we"}


def norm(s: str) -> str:
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    return " ".join(sorted(t for t in s.split() if t not in STOP))


def main() -> None:
    d = json.loads((HERE / "topic_pool.json").read_text(encoding="utf-8"))
    pool = dict(d["kept"])

    adj_dropped = [t for t in d["adjacency_flagged"] if pool.pop(t, None) is not None]

    generic_ca = [t for t in pool
                  if GENERIC_CA_RE.search(t) and not MFG_QUALIFIER_RE.search(t)]
    for t in generic_ca:
        pool.pop(t)

    junk = [t for t in pool if JUNK_RE.search(t)]
    for t in junk:
        pool.pop(t)

    # greedy clustering into page-level topics (no volume ordering this run)
    clusters: list[dict] = []
    norms: list[str] = []
    for term, meta in sorted(pool.items()):
        n = norm(term)
        placed = False
        for i, cn in enumerate(norms):
            if difflib.SequenceMatcher(None, n, cn).ratio() >= 0.85:
                clusters[i]["members"].append(term)
                placed = True
                break
        if not placed:
            clusters.append({"head": term, "volume": None, "kd": None,
                             "sources": meta["sources"], "members": [term]})
            norms.append(n)

    out = {"generated": "2026-07-12",
           "keyword_pool_final": len(pool),
           "adjacency_dropped": adj_dropped,
           "generic_ca_wall_dropped": len(generic_ca),
           "generic_ca_wall_terms": sorted(generic_ca),
           "junk_removed": len(junk), "junk_terms": sorted(junk),
           "restored": [],
           "confirmed_estate_dupes": d["dropped_exact"] + [r["term"] for r in d["dropped_fuzzy"]],
           "topic_cluster_count": len(clusters),
           "clusters": clusters}
    (HERE / "topic_pool_final.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"keywords={len(pool)} adj_dropped={len(adj_dropped)} generic_ca_dropped={len(generic_ca)} "
          f"junk_removed={len(junk)} topics={len(clusters)}")


if __name__ == "__main__":
    main()
