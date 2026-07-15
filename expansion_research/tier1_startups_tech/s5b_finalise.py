"""R3 tier1 startups_tech — Stage 5b: judged final pool.

Mirrors tier1_care/s5b_finalise.py (2026-07-15 run, retro-fitted so startups gets a
seedable topic_pool_final.json like every other Tier-1 niche; the earlier
s5b_intent_classify.py labelled intents but never clustered).

Judgment applied:
 - Junk sweep: non-UK jurisdiction terms (US 401k/IRS/Delaware/state filings, IN/AU/CA geo),
   job-board and course noise, software-brand DIY noise where the term is the brand itself.
 - Intent labels from topic_pool_classified.json are carried onto each cluster head
   (accountant_seeking / funding_stage_signal / founder_diy / investor_diy / ambiguous).
   DIY intents are KEPT: they are blog-pool fodder, not lead pages.
Then greedy-cluster (difflib >=0.85 sorted-token norm), volumes joined from the paid
DFS pulls; unmatched terms keep null (no invented data).
"""
from __future__ import annotations

import difflib
import json
import re
from pathlib import Path

HERE = Path(__file__).parent

JUNK_RE = re.compile(
    # US tax system + entities
    r"\b401k\b|\birs\b|\bdelaware\b|c[- ]corp|s[- ]corp|\bllc\b|\bein\b|w[- ]?2\b|1099|"
    r"california|texas|florida|new york|washington|"
    # other non-UK geo
    r"\bindia\b|\bindian\b|bangalore|mumbai|delhi|australia|melbourne|sydney|toronto|"
    r"canada|ontario|singapore|dubai|ireland\b|"
    # job/course/directory noise
    r"\bjobs?\b|salary|salaries|hiring|vacanc|course|certification|internship|"
    # app-store / consumer noise
    r"reddit|quora|app store|\bapk\b",
    re.I)

STOP = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "is", "are",
        "can", "do", "does", "how", "what", "when", "uk", "your", "you", "my", "we"}


def norm(s: str) -> str:
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    return " ".join(sorted(t for t in s.split() if t not in STOP))


def load_dfs_metrics() -> dict[str, dict]:
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
    intents = {k: v.get("intent", "ambiguous")
               for k, v in json.loads((HERE / "topic_pool_classified.json")
                                      .read_text(encoding="utf-8"))["kept"].items()}
    dfs = load_dfs_metrics()

    junk = [t for t in pool if JUNK_RE.search(t)]
    for t in junk:
        pool.pop(t)

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
                             "intent": intents.get(term, "ambiguous"),
                             "sources": meta["sources"], "members": [term]})
            norms.append(n)

    clusters.sort(key=lambda c: (-(c["volume"] or 0), c["head"]))

    out = {"generated": "2026-07-15",
           "dfs_enriched": True,
           "dfs_matched_keywords": matched,
           "keyword_pool_final": len(pool),
           "junk_removed": len(junk), "junk_terms": sorted(junk),
           "restored": [], "confirmed_estate_dupes": [],
           "topic_cluster_count": len(clusters),
           "clusters": clusters}
    (HERE / "topic_pool_final.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    with_vol = sum(1 for c in clusters if c["volume"])
    print(f"keywords={len(pool)} junk_removed={len(junk)} topics={len(clusters)} "
          f"dfs_matched={matched} clusters_with_volume={with_vol}")


if __name__ == "__main__":
    main()
