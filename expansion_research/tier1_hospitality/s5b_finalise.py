"""R3 hospitality — Stage 5b: judged final pool (pattern: pilot_charities/s5b_finalise.py).

Judgment 2026-07-12 on s5_pool_build.py borderline/fuzzy output:
 - RESTORE false positives: B&B tax terms (collided with 'bed and breakfasting' CGT rule),
   TOMS VAT terms (collided with solicitor VAT pages), tronc/troncmaster (collided with
   'doncaster'), tips/food VAT calculators, pub accounts, cafe GP margin.
 - CONFIRM true estate dupes stay out: 'accountant for pubs/hotels/restaurants',
   'hospitality accountants' family = live Holloway Davies pages; fence at brief level
   pending owner overlap ruling (handoff queue item).
 - Junk sweep: career/job intent, non-UK geo, brand noise, movie ('the accountant').
Then greedy-cluster into page-level topics and write topic_pool_final.json.
"""
from __future__ import annotations

import difflib
import json
import re
from pathlib import Path

HERE = Path(__file__).parent

RESTORE = [
    "bed and breakfast tax", "bed and breakfast tax uk", "tax on bed and breakfast",
    "capital gains tax on bed and breakfast property", "cafe gross profit margin uk",
    "hotel vat calculator", "restaurant vat calculator", "vat on food calculator",
    "tips and tax calculator", "tips tax calculator", "tips tax refund", "tronc calculator",
    "toms vat accounting", "toms vat calculation", "toms vat registration",
    "toms vat threshold", "toms vat registration threshold", "troncmaster", "troncmaster uk",
    "pub accounts",
]
CONFIRMED_DUPES = [
    "hospitality accountants", "hospitality accountants uk", "accountant for pubs",
    "accountants for hospitality", "hospitality accountant", "accountant hospitality",
    "toms vat serviced accommodation",
]

JUNK_RE = re.compile(
    r"\bjobs?\b|salary|salaries|vacanc|career|trainee|how to become|recruit|resume|"
    r"duties|responsibilit|skills\b|\bmake\b|remote|reddit|\bcpe\b|classes|"
    r"brisbane|melbourne|sydney|vancouver|knysna|atlanta|\bnyc\b|the accountant hotel|"
    r"hotel the accountant|\baj\b|\bamp\b|\baoc\b|kallas|ocra|paperchase|wmt|"
    r"evans (&|and) co|inn control|association", re.I)

STOP = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "is", "are",
        "can", "do", "does", "how", "what", "when", "uk", "your", "you", "my", "we"}


def norm(s: str) -> str:
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    return " ".join(sorted(t for t in s.split() if t not in STOP))


def main() -> None:
    d = json.loads((HERE / "topic_pool.json").read_text(encoding="utf-8"))
    pool = dict(d["kept"])

    src = {t: {"sources": ["restored_fuzzy_fp"], "volume": None, "kd": None} for t in RESTORE}
    for kw in json.loads((HERE / "raw" / "dfs_keyword_suggestions.json").read_text(encoding="utf-8")) + \
              json.loads((HERE / "raw" / "dfs_ranked_keywords.json").read_text(encoding="utf-8")):
        if kw["keyword"] in src:
            src[kw["keyword"]]["volume"] = kw.get("volume")
            src[kw["keyword"]]["kd"] = kw.get("kd")
    pool.update(src)

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
                clusters[i]["volume"] = max(clusters[i]["volume"] or 0, meta.get("volume") or 0) or None
                placed = True
                break
        if not placed:
            clusters.append({"head": term, "volume": meta.get("volume"),
                             "kd": meta.get("kd"), "sources": meta["sources"], "members": [term]})
            norms.append(n)

    out = {"generated": "2026-07-12",
           "keyword_pool_final": len(pool),
           "junk_removed": len(junk), "junk_terms": junk,
           "restored": RESTORE, "confirmed_estate_dupes": CONFIRMED_DUPES,
           "topic_cluster_count": len(clusters),
           "clusters": clusters}
    (HERE / "topic_pool_final.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"keywords={len(pool)} junk_removed={len(junk)} topics={len(clusters)}")


if __name__ == "__main__":
    main()
