"""R3 tier2 FCA — Stage 5b: judged final pool + greedy clustering.

Applies Claude's judgment to s5_pool_build.py output. NO paid enrichment this run:
volumes/kd/cpc stay null (see DOSSIER "TODO paid pulls").
Greedy-cluster into page-level topics (difflib >=0.85 on sorted-token norm).
"""
from __future__ import annotations

import difflib
import json
import re
from pathlib import Path

HERE = Path(__file__).parent

# judged junk: consumer/investor-side, geo, brand noise, non-finance ops
JUNK_RE = re.compile(
    r"fca meaning|what does fca stand|fca register search|check fca register|"
    r"fca fine|fca fines list|fca news|fca ban|warning list|"
    r"is [a-z0-9 ]+ (?:fca )?regulated\b|"  # consumer checking a brand
    r"revolut|monzo|wise\b|paypal|stripe|klarna|etoro|plus500|binance|coinbase|"
    r"kraken|robinhood|trading ?212|freetrade|hargreaves|vanguard|degiro|"
    r"crypto price|bitcoin price|"
    r"mortgage rates|best mortgage|mortgage calculator|remortgage deal|"
    r"insurance quote|cheap insurance|compare insurance|"
    r"apprenticeship|exam|syllabus|textbook|meaning\b|definition\b|acronym|"
    # US county auditors + freight, non-UK
    r"cass county|cass freight|cass city|adalah|full form|"
    # social-care / child-protection sense of "safeguarding" (not payments safeguarding)
    r"safeguarding (?:principles|children|child|adults?|policy|policies|training|course|"
    r"lead|officer|board|partnership|concerns?|referral|week|team)|"
    r"adult safeguarding|child safeguarding|schools? safeguarding|"
    r"(?:birmingham|bromley|manchester|leeds|croydon|lambeth|kirklees) safeguarding|"
    # Brazilian IFPR (Instituto Federal do Parana) + game/app/news noise
    r"curitiba|londrina|parana|joao|cursos|vestibular|hidden chest|"
    r"fca mobile app|fortnight in fintech", re.I)


STOP = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "is", "are",
        "can", "do", "does", "how", "what", "when", "uk", "your", "you", "my", "we"}


def norm(s: str) -> str:
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    return " ".join(sorted(t for t in s.split() if t not in STOP))


def main() -> None:
    d = json.loads((HERE / "topic_pool.json").read_text(encoding="utf-8"))
    pool = dict(d["kept"])

    # sibling-adjacency: drop terms that belong to estate sibling sites (judged)
    sib_dropped = [t for t, m in pool.items() if m.get("sibling_adjacent")]
    for t in sib_dropped:
        pool.pop(t)

    junk = [t for t in pool if JUNK_RE.search(t)]
    for t in junk:
        pool.pop(t)

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
            clusters.append({"head": term, "volume": None, "kd": None, "cpc": None,
                             "sources": meta["sources"], "members": [term]})
            norms.append(n)

    out = {"generated": "2026-07-15",
           "dfs_enriched": False,
           "keyword_pool_final": len(pool),
           "junk_removed": len(junk), "junk_terms": sorted(junk),
           "sibling_adjacent_dropped": sorted(sib_dropped),
           "topic_cluster_count": len(clusters),
           "clusters": clusters}
    (HERE / "topic_pool_final.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"keywords={len(pool)} junk_removed={len(junk)} sib_dropped={len(sib_dropped)} "
          f"topics={len(clusters)}")


if __name__ == "__main__":
    main()
