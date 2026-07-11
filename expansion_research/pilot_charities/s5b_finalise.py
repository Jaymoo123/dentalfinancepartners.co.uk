"""R3 pilot charities — Stage 5b: judged final pool.

Applies Claude's judgment on the fuzzy/borderline output of s5_pool_build.py:
 - RESTORE CIC/CIO false positives (CIC != CIS; sorted-token difflib collided them).
 - CONFIRM the two true estate dupes (generalist live page accountant-for-charities-uk).
 - Junk sweep: career/job intent, non-UK geo, brand/app noise.
Then greedy-cluster keywords into page-level topics (difflib >=0.85 on sorted-token norm)
and write topic_pool_final.json with the honest topic count.
"""
from __future__ import annotations

import difflib
import json
import re
from pathlib import Path

HERE = Path(__file__).parent

RESTORE = [
    "cic register", "register a cic", "cic registration", "register cic",
    "cio registration", "register a cio", "cic registration uk",
    "cic accountant", "accountant for cic", "charities accounting",
]
# true estate dupes (generalist live pages) — stay out of the blog pool; handled as
# money-page migration decision (see TOPICS.md / DOSSIER.md)
CONFIRMED_DUPES = ["accountants for charities", "accountants for charities uk"]

JUNK_RE = re.compile(
    r"\bjobs?\b|salary|salaries|vacanc|career|trainee|how to become|recruit|"
    r"\blds\b|brisbane|canva|church times account|church of account|my account|account app|"
    r"sign in|log ?in|\bcpe\b|account design|account details|amazon account|"
    r"church of jesus|moose jaw|wells fargo|\bndis\b|kya hai|zoo\b|asdasd", re.I)

STOP = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "is", "are",
        "can", "do", "does", "how", "what", "when", "uk", "your", "you", "my", "we"}


def norm(s: str) -> str:
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    return " ".join(sorted(t for t in s.split() if t not in STOP))


def main() -> None:
    d = json.loads((HERE / "topic_pool.json").read_text(encoding="utf-8"))
    pool = dict(d["kept"])

    # restores
    src = {t: {"sources": ["restored_fuzzy_fp"], "volume": None, "kd": None} for t in RESTORE}
    for kw in json.loads((HERE / "raw" / "dfs_keyword_suggestions.json").read_text(encoding="utf-8")) + \
              json.loads((HERE / "raw" / "dfs_ranked_keywords.json").read_text(encoding="utf-8")):
        if kw["keyword"] in src:
            src[kw["keyword"]]["volume"] = kw.get("volume")
            src[kw["keyword"]]["kd"] = kw.get("kd")
    pool.update(src)

    # junk sweep
    junk = [t for t in pool if JUNK_RE.search(t)]
    for t in junk:
        pool.pop(t)

    # greedy clustering into page-level topics
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

    out = {"generated": "2026-07-11",
           "keyword_pool_final": len(pool),
           "junk_removed": len(junk), "junk_terms": junk,
           "restored": RESTORE, "confirmed_estate_dupes": CONFIRMED_DUPES,
           "topic_cluster_count": len(clusters),
           "clusters": clusters}
    (HERE / "topic_pool_final.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"keywords={len(pool)} junk_removed={len(junk)} topics={len(clusters)}")


if __name__ == "__main__":
    main()
