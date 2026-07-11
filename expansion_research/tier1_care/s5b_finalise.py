"""R3 tier1 care — Stage 5b: judged final pool.

Applies Claude's judgment to s5_pool_build.py output (2026-07-11):
 - All 36 borderline pairs reviewed: every one is a false positive of sorted-token
   difflib (CQC vs CIS collision; 'care home accountant' vs 'accountant for farmers').
   Nothing restored, nothing dropped as an estate dupe (0 exact, 0 fuzzy hits).
 - Medical-adjacency: drop clinician-side terms (GP/private-GP/dental CQC registration,
   nurse/locum worker-side support) to keep the wall with the medical + dentists sites.
 - Junk sweep: US payroll-portal brands, non-UK geo, franchise brand noise, car care,
   consumer/family-side paying-for-care intent, care-ops non-finance terms.
Then greedy-cluster into page-level topics (difflib >=0.85 on sorted-token norm).
No volumes/KD this run (zero DataForSEO) — fields left null for the paid pull.
"""
from __future__ import annotations

import difflib
import json
import re
from pathlib import Path

HERE = Path(__file__).parent

MED_ADJ_DROP = ["cqc gp registration", "cqc registered gp", "cqc registration private gp",
                "cqc registration dental practices", "support for nurses locums carers"]

JUNK_RE = re.compile(
    # US/AU/NZ/other geo + US law
    r"california|\bsb 525\b|brisbane|melbourne|new zealand|kerala|texas|florida|ontario|"
    # US home-care payroll portal brands + franchise brand noise
    r"addus|advantage home care|advanced home care|amazing home care|anchor (?:health )?home care|"
    r"astra home care|blossom home care|brightstar|always best care|bluebird care|chiesi|"
    r"home instead|right at home|visiting angels|comfort keepers|helping hands|"
    # not our sector
    r"car care|3m\b|5k car|"
    # forum/app noise
    r"reddit|payroll (?:number|phone|sign in)|payroll department\b|"
    # consumer/family-side paying-for-care intent (not provider-side)
    r"financial assessment|how much can i keep|sell your house|negotiate care home fees|"
    r"advice on paying|paying for care|joint accounts|value cap|"
    # care-ops / clinical non-finance
    r"menu examples|equipment list|maintenance checklist|business card|name ideas|"
    r"dols|continence|dependency assessment|capacity assessment|pre assessment|"
    r"needs assessment|risk assessment|appraisal forms|assessment (?:bed|criteria|form|forms|"
    r"questions|team|template|tool|scotland|wales)\b", re.I)

STOP = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "is", "are",
        "can", "do", "does", "how", "what", "when", "uk", "your", "you", "my", "we"}


def norm(s: str) -> str:
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    return " ".join(sorted(t for t in s.split() if t not in STOP))


def main() -> None:
    d = json.loads((HERE / "topic_pool.json").read_text(encoding="utf-8"))
    pool = dict(d["kept"])

    med_dropped = [t for t in MED_ADJ_DROP if pool.pop(t, None) is not None]
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

    out = {"generated": "2026-07-11",
           "keyword_pool_final": len(pool),
           "junk_removed": len(junk), "junk_terms": sorted(junk),
           "medical_adjacent_dropped": med_dropped,
           "restored": [], "confirmed_estate_dupes": [],
           "topic_cluster_count": len(clusters),
           "clusters": clusters}
    (HERE / "topic_pool_final.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"keywords={len(pool)} junk_removed={len(junk)} med_adj_dropped={len(med_dropped)} topics={len(clusters)}")


if __name__ == "__main__":
    main()
