"""R3 tier1 pharmacies — Stage 5b: judged final pool.

Applies Claude's judgment on the s5_pool_build.py output (pattern: pilot_charities/s5b):
 - The 1 fuzzy drop ("accountants for locum doctors" vs generalist live page) is a TRUE
   estate dupe — stays dropped. No pharmacy false positives to restore (RESTORE list empty).
 - All 22 borderline keeps CONFIRMED kept: matches are cross-niche noise ("pharmacy
   accountants" ~ "HR Accountants" etc), except the medical flag "locum pharmacist tax
   calculator" which is kept but must differentiate from medical's locum tax calculator
   (pharmacist-specific, ESM4270) — carried through as a flag.
 - Junk sweep: US Goodwill Industries training noise, meaning-in-<language>, career/CPD
   ("how to become", training, student/intern evaluation), apps, US brands (Strive Pharmacy).
Then greedy-cluster keywords into page-level topics (difflib >=0.85 on sorted-token norm)
and write topic_pool_final.json with the honest topic count.
2026-07-11 late: DFS enrichment fold-back (same join pattern as tier1_care/s5b) —
volumes/KD/CPC joined from raw/dfs_keyword_suggestions.json + dfs_ranked_keywords.json +
dfs_head_volumes.json by exact-norm match; clusters re-seeded/re-ordered by measured volume.
"""
from __future__ import annotations

import difflib
import json
import re
from pathlib import Path

HERE = Path(__file__).parent

JUNK_RE = re.compile(
    r"meaning in \w+|^category meaning$|goodwill pharmacy|how to become|"
    r"evaluation comments|student evaluation|intern evaluation|\btraining\b|"
    r"\bapp\b|original meaning|shopping definition|meaning in hebrew|"
    r"strive pharmacy|whatsapp|"
    # US/foreign brand + geo noise surviving the s5 scope gate
    r"tax id\b|\binc\b|accredo|alto pharmacy|amazon pharmacy|cigna|walgreen|walmart|"
    r"rite aid|express scripts|optum|caremark|goodrx|alternador|"
    r"alabama|georgia|virginia|vegas|jamaica|kolkata|ibadan|pattaya|labuan|dimapur|"
    r"union city|wellesley|new jersey|\bnj\b|\bnyc\b|ohio|kingston", re.I)

STOP = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "is", "are",
        "can", "do", "does", "how", "what", "when", "uk", "your", "you", "my", "we"}


def norm(s: str) -> str:
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    return " ".join(sorted(t for t in s.split() if t not in STOP))


def load_dfs_metrics() -> dict[str, dict]:
    """norm(keyword) -> best row from the paid pulls (max volume wins on collision)."""
    rows: dict[str, dict] = {}
    for fname in ("dfs_keyword_suggestions.json", "dfs_ranked_keywords.json",
                  "dfs_head_volumes.json"):
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

    junk = [t for t in pool if JUNK_RE.search(t)]
    for t in junk:
        pool.pop(t)

    # seed order = measured volume desc so the highest-volume term heads its cluster
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
                             "volume": r.get("volume") if r else meta.get("volume"),
                             "kd": r.get("kd") if r else meta.get("kd"),
                             "cpc": r.get("cpc") if r else None,
                             "sources": meta["sources"], "members": [term]})
            norms.append(n)

    clusters.sort(key=lambda c: (-(c["volume"] or 0), c["head"]))

    out = {"generated": "2026-07-11",
           "dfs_enriched": True,
           "dfs_matched_keywords": matched,
           "keyword_pool_final": len(pool),
           "junk_removed": len(junk), "junk_terms": junk,
           "restored": [],
           "confirmed_estate_dupes": ["accountants for locum doctors"],
           "medical_adjacency_flags": d["medical_adjacency_flags"],
           "topic_cluster_count": len(clusters),
           "clusters": clusters}
    (HERE / "topic_pool_final.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    with_vol = sum(1 for c in clusters if c["volume"])
    print(f"keywords={len(pool)} junk_removed={len(junk)} topics={len(clusters)} "
          f"dfs_matched={matched} clusters_with_volume={with_vol}")


if __name__ == "__main__":
    main()
