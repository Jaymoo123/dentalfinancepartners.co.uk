"""R3 tier2 expats — Stage 5b: judged final pool.

Applies Claude's judgment to s5_pool_build.py output (2026-07-15):
 - Junk sweep of autocomplete noise that slipped the s5 gates: Tesla/parts "p85",
   Resident Evil, "fig regimen" cosmetics, US-state residency/domestic filing,
   AU "foreign resident capital gains withholding", other-country domestic regimes.
 - Property-adjacency: NRL/NRCGT terms are KEPT but tagged; the manager decides the
   wall vs propertytaxpartners at launch-architecture time (they are the commercial
   core of this niche, silent drop would gut the pool).
 - Greedy-cluster into page-level topics (difflib >=0.85 on sorted-token norm).
Volumes/KD/CPC are ALL null: no paid pulls ran (zero-spend rule). Never invented.
"""
from __future__ import annotations

import difflib
import json
import re
from pathlib import Path

HERE = Path(__file__).parent

JUNK_RE = re.compile(
    # p85 the product, not the HMRC form
    r"p ?85(?:d| kw| k\d| hp)?\b.*(?:tesla|model|john deere|gas|brembo|kw|battery|deere|"
    r"k160|filter|pump|engine|price|specs)|tesla|john deere|brembo|"
    # resident evil / games
    r"resident evil|garrador|double helix|"
    # cosmetics
    r"fig regimen|venus fig|"
    # US-state / US-domestic residency + filing
    r"virginia|new york|california|colorado|dual residency (?:between states|india)|"
    r"state tax|form 8843|form 1116|"
    # Australia-domestic
    r"foreign resident capital gains withholding|"
    # other-country domestic (not a UK corridor)
    r"nigeria(?!.*uk)|philippines(?!.*uk)|kenya(?!.*uk)|"
    # generic reddit/software noise
    r"reddit|\bcpa\b|software\b", re.I)


STOP = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "is", "are",
        "can", "do", "does", "how", "what", "when", "uk", "your", "you", "my", "we"}


def norm(s: str) -> str:
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    toks = [t for t in s.split() if t not in STOP]
    return " ".join(sorted(toks))


def main() -> None:
    pool = json.loads((HERE / "topic_pool.json").read_text(encoding="utf-8"))
    kept = {t: m for t, m in pool["kept"].items() if not JUNK_RE.search(t)}
    junked = [t for t in pool["kept"] if t not in kept]

    # greedy cluster
    items = sorted(kept.items(), key=lambda kv: -len(kv[1]["sources"]))
    clusters: list[dict] = []
    for term, meta in items:
        n = norm(term)
        placed = False
        for c in clusters:
            if difflib.SequenceMatcher(None, n, c["norm"]).ratio() >= 0.85:
                c["keywords"].append(term)
                placed = True
                break
        if not placed:
            clusters.append({"head": term, "norm": n, "keywords": [term],
                             "property_adjacent": meta.get("property_adjacent", False),
                             "volume": None, "kd": None, "cpc": None})
    for c in clusters:
        del c["norm"]

    out = {"generated": "2026-07-15",
           "final_keywords": len(kept), "junk_dropped_s5b": len(junked),
           "clusters": len(clusters),
           "property_adjacent_clusters": sum(1 for c in clusters if c["property_adjacent"]),
           "note": "volume/kd/cpc all null - zero paid pulls this run (by rule)",
           "cluster_list": clusters, "junked": junked}
    (HERE / "topic_pool_final.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"kept={len(kept)} junked={len(junked)} clusters={len(clusters)} "
          f"prop_adj_clusters={out['property_adjacent_clusters']}")


if __name__ == "__main__":
    main()
