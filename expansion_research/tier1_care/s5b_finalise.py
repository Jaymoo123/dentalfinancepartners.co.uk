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
2026-07-11 enrichment re-run: volumes/KD/CPC joined from the completed paid pulls
(raw/dfs_keyword_suggestions.json + raw/dfs_ranked_keywords.json, exact-norm match);
clusters ordered by measured volume desc. Unmatched terms keep null (no invented data).
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


def load_dfs_metrics() -> dict[str, dict]:
    """norm(keyword) -> best row from the paid pulls (max volume wins on collision)."""
    rows: dict[str, dict] = {}
    for fname in ("dfs_keyword_suggestions.json", "dfs_ranked_keywords.json"):
        p = HERE / "raw" / fname
        if not p.exists():
            continue
        for r in json.loads(p.read_text(encoding="utf-8")):
            n = norm(r["keyword"])
            if n not in rows or (r.get("volume") or 0) > (rows[n].get("volume") or 0):
                rows[n] = r
    return rows


def main() -> None:
    d = json.loads((HERE / "topic_pool.json").read_text(encoding="utf-8"))
    pool = dict(d["kept"])
    dfs = load_dfs_metrics()

    med_dropped = [t for t in MED_ADJ_DROP if pool.pop(t, None) is not None]
    junk = [t for t in pool if JUNK_RE.search(t)]
    for t in junk:
        pool.pop(t)

    # greedy clustering into page-level topics; seed order = measured volume desc
    # so the highest-volume term in a family becomes the cluster head
    def vol(term: str) -> int:
        r = dfs.get(norm(term))
        return (r.get("volume") or 0) if r else 0

    clusters: list[dict] = []
    norms: list[str] = []
    matched = 0
    for term, meta in sorted(pool.items(), key=lambda kv: (-vol(kv[0]), kv[0])):
        n = norm(term)
        r = dfs.get(n)
        if r:
            matched += 1
        placed = False
        for i, cn in enumerate(norms):
            if difflib.SequenceMatcher(None, n, cn).ratio() >= 0.85:
                c = clusters[i]
                c["members"].append(term)
                if r and (r.get("volume") or 0) > (c["volume"] or 0):
                    c["volume"], c["kd"], c["cpc"] = r.get("volume"), r.get("kd"), r.get("cpc")
                placed = True
                break
        if not placed:
            clusters.append({"head": term,
                             "volume": r.get("volume") if r else None,
                             "kd": r.get("kd") if r else None,
                             "cpc": r.get("cpc") if r else None,
                             "sources": meta["sources"], "members": [term]})
            norms.append(n)

    clusters.sort(key=lambda c: (-(c["volume"] or 0), c["head"]))

    out = {"generated": "2026-07-11",
           "dfs_enriched": True,
           "dfs_matched_keywords": matched,
           "keyword_pool_final": len(pool),
           "junk_removed": len(junk), "junk_terms": sorted(junk),
           "medical_adjacent_dropped": med_dropped,
           "restored": [], "confirmed_estate_dupes": [],
           "topic_cluster_count": len(clusters),
           "clusters": clusters}
    (HERE / "topic_pool_final.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    with_vol = sum(1 for c in clusters if c["volume"])
    print(f"keywords={len(pool)} junk_removed={len(junk)} med_adj_dropped={len(med_dropped)} "
          f"topics={len(clusters)} dfs_matched={matched} clusters_with_volume={with_vol}")


if __name__ == "__main__":
    main()
