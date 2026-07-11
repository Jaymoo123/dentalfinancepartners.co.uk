"""R3 tier1 crypto — Stage 5b: judged final pool.

Applies Claude's judgment on s5_pool_build.py output:
 - Borderline pairs (139) reviewed: ALL are cross-niche sorted-token false
   positives ("crypto accountant manchester" <-> "gp accountant manchester",
   "crypto capital gains tax" <-> property "capital gains tax", etc.) — kept
   by s5 already, no restores needed.
 - 1 exact drop confirmed: "bed and breakfasting" (property blog owns the
   generic slug); crypto-specific variants ("bed and breakfast rule crypto"
   etc.) remain in the pool as distinct-audience topics.
 - Junk sweep: non-UK geo that leaked past s5's JUNK_RE, job/salary/meme
   intent, exchange-brand support noise.
Then greedy-cluster keywords into page-level topics (difflib >=0.85 on
sorted-token norm) and write topic_pool_final.json.

Paid pulls landed 2026-07-11: dfs_*.json in raw/ merged via s5_pool_build.py
re-run then this script; volumes/KD/CPC now populated.
"""
from __future__ import annotations

import difflib
import json
import re
from pathlib import Path

HERE = Path(__file__).parent

JUNK_RE = re.compile(
    r"\bjobs?\b|salary|salaries|vacanc|career|trainee|how to become|recruit|"
    r"auckland|brisbane|sydney|perth|melbourne|toronto|vancouver|montreal|ottawa|ontario|"
    r"calgary|\bnyc\b|\bnj\b|miami|denver|texas|california|florida|dubai|singapore|"
    r"malta|malaysia|portugal|netherlands|spain|france|switzerland|cyprus|pakistan|"
    r"nigeria|philippines|dublin|\bmeme\b|gift card|customer service|phone number|"
    r"support number|helpline|referral code|promo code|airdrop free|free coins", re.I)

STOP = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "is", "are",
        "can", "do", "does", "how", "what", "when", "uk", "your", "you", "my", "we"}


def norm(s: str) -> str:
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    return " ".join(sorted(t for t in s.split() if t not in STOP))


def main() -> None:
    d = json.loads((HERE / "topic_pool.json").read_text(encoding="utf-8"))
    pool = dict(d["kept"])

    junk = sorted(t for t in pool if JUNK_RE.search(t))
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
                             "kd": meta.get("kd"), "cpc": meta.get("cpc"),
                             "sources": meta["sources"], "members": [term]})
            norms.append(n)

    vol = [c for c in clusters if c["volume"]]
    out = {"generated": "2026-07-11",
           "keyword_pool_final": len(pool),
           "junk_removed": len(junk), "junk_terms": junk,
           "clusters_total": len(clusters),
           "clusters_with_volume": len(vol),
           "note": "DFS volumes/KD/CPC merged 2026-07-11 (paid pulls: suggestions x8 seeds, ranked x4 rivals, head volumes x26)",
           "clusters": clusters}
    (HERE / "topic_pool_final.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"final_keywords={len(pool)} junk={len(junk)} clusters={len(clusters)} with_volume={len(vol)}")

    assert len(pool) + len(junk) == len(d["kept"])  # ponytail: self-check


if __name__ == "__main__":
    main()
