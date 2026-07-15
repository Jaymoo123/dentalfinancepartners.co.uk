"""R3 tier2 retail — Stage 5b: judged final pool + greedy page-level clustering.

Waits for topic_pool.json (s5 is slow), applies junk sweep, then greedy-clusters
(difflib >=0.85 on sorted-token norm). Volumes null (zero paid pulls this run).
"""
from __future__ import annotations

import difflib
import json
import re
import time
from pathlib import Path

HERE = Path(__file__).parent

JUNK_RE = re.compile(
    # non-UK geo + brand noise + non-finance retail ops + consumer intent
    r"india|ahmedabad|kenya|nigeria|uganda|shopee|m-pesa|juice-shop|"
    r"accountant 1 vs|objective examples|accountant shopper|"
    r"franchise for sale|franchises for sale|franchise opportunit|buy a franchise|"
    r"franchise review|accounts franchise|accountants franchise|franchise cost|"
    r"franchise rating|best franchise|top franchise|"  # franchise-directory intent
    r"epos now|epos direct|swan retail|askbiz|xero for|"
    r"visual merchandis|window display|shop fitting ideas|store layout|"
    r"customer service|loyalty card|retail jobs|shop assistant|"
    r"do post office accounts still exist|post office card account|"
    r"shopping centre|retail park|shop for sale|shops for sale|shop to let", re.I)


def norm(s: str) -> str:
    stop = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "is", "are",
            "can", "do", "does", "how", "what", "when", "uk", "your", "you", "my", "we"}
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    return " ".join(sorted(t for t in s.split() if t not in stop))


def main() -> None:
    src = HERE / "topic_pool.json"
    while not src.exists():
        time.sleep(10)
    time.sleep(2)
    d = json.loads(src.read_text(encoding="utf-8"))
    kept = {t: m for t, m in d["kept"].items() if not JUNK_RE.search(t)}
    junked = [t for t in d["kept"] if t not in kept]

    # greedy cluster
    items = sorted(kept.items(), key=lambda kv: -len(kv[1]["sources"]))
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
            clusters.append({"head": term, "members": [term],
                             "sources": sorted(set(meta["sources"]))[:4],
                             "ecom_adjacent": meta.get("ecom_adjacent", False),
                             "volume": None, "kd": None, "cpc": None})
            norms.append(n)

    out = {"generated": "2026-07-15", "kept_terms": len(kept), "junk_swept": len(junked),
           "clusters": clusters, "junked_terms": junked}
    (HERE / "topic_pool_final.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    ecom = sum(1 for c in clusters if c["ecom_adjacent"])
    print(f"kept={len(kept)} junked={len(junked)} clusters={len(clusters)} ecom_adj_clusters={ecom}")


if __name__ == "__main__":
    main()
