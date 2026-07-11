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
and write topic_pool_final.json with the honest topic count. No DFS volumes this run.
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


def main() -> None:
    d = json.loads((HERE / "topic_pool.json").read_text(encoding="utf-8"))
    pool = dict(d["kept"])

    junk = [t for t in pool if JUNK_RE.search(t)]
    for t in junk:
        pool.pop(t)

    items = sorted(pool.items(), key=lambda kv: -(kv[1].get("volume") or 0))
    clusters: list[dict] = []
    norms: list[str] = []
    for term, meta in items:
        n = norm(term)
        placed = False
        for i, cn in enumerate(norms):
            if difflib.SequenceMatcher(None, n, cn).ratio() >= 0.85:
                clusters[i]["members"].append(term)
                placed = True
                break
        if not placed:
            clusters.append({"head": term, "volume": meta.get("volume"),
                             "kd": meta.get("kd"), "sources": meta["sources"],
                             "members": [term]})
            norms.append(n)

    out = {"generated": "2026-07-11",
           "keyword_pool_final": len(pool),
           "junk_removed": len(junk), "junk_terms": junk,
           "restored": [],
           "confirmed_estate_dupes": ["accountants for locum doctors"],
           "medical_adjacency_flags": d["medical_adjacency_flags"],
           "topic_cluster_count": len(clusters),
           "clusters": clusters}
    (HERE / "topic_pool_final.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"keywords={len(pool)} junk_removed={len(junk)} topics={len(clusters)}")


if __name__ == "__main__":
    main()
