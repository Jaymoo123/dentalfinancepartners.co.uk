"""
Deliverable 4 (part B) — content-queue keyword enrichment.

Collapses raw/keywords_export_*.json (+ our raw/domain_keywords_*.json) into a
deduped keyword metrics table with SE Ranking volume/KD/intent, the rescore
score (sqrt(sv)*intent_weight/max(kd,5)) and a suggested priority band — the
exact column shape rescore_with_seranking.py consumes.

Producing the CSV is in scope. Applying it to a content-queue table is a deferred,
gated write (the legacy blog_topics_property table was dropped in the infra
refactor, so --apply is intentionally a no-op stub here).

Out: blog_topics_property_enrichment_<date>.csv
Run: python -m scripts.seranking.enrich_blog_topics
"""
from __future__ import annotations

import argparse
from datetime import date

from scripts.seranking._common import (
    raw_files, load, records, pick, to_int, to_num, norm, kw_score, score_to_priority, write_csv,
)


def _extract(rec: dict) -> dict:
    return {
        "keyword": pick(rec, "keyword", "kw", "query", "phrase", "name"),
        "sv": to_int(pick(rec, "volume", "search_volume", "sv", "searches")),
        "kd": to_num(pick(rec, "difficulty", "keyword_difficulty", "kd")),
        "intent": pick(rec, "intent", "search_intent", "intents"),
        "cpc": to_num(pick(rec, "cpc", "cost_per_click")),
        "competition": to_num(pick(rec, "competition", "comp")),
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true",
                    help="(deferred) push to content queue — no-op: legacy table dropped")
    args = ap.parse_args()

    files = raw_files("keywords_export") + raw_files("domain_keywords")
    if not files:
        print("No raw/keywords_export_*.json or domain_keywords yet. Run tier1 first.")
        return 1

    best: dict[str, dict] = {}
    for path in files:
        for rec in records(load(path)):
            e = _extract(rec)
            k = norm(e["keyword"])
            if not k or e["sv"] is None:
                continue
            if k not in best or (e["sv"] or 0) > (best[k]["sv"] or 0):
                best[k] = e

    rows = []
    for e in best.values():
        s = kw_score(e["sv"], e["kd"], e["intent"])
        rows.append({
            "keyword": e["keyword"], "sv": e["sv"], "kd": e["kd"], "intent": e["intent"],
            "competition": e["competition"], "cpc": e["cpc"],
            "score": s, "suggested_priority": score_to_priority(s),
        })
    rows.sort(key=lambda r: -(r["score"] or 0))
    out = write_csv(f"blog_topics_property_enrichment_{date.today().isoformat()}.csv", rows,
                    fieldnames=["keyword", "sv", "kd", "intent", "competition", "cpc",
                                "score", "suggested_priority"])
    print(f"Wrote {out}  ({len(rows)} enriched keywords)")
    if args.apply:
        print("--apply is a no-op: the legacy blog_topics_property table was dropped. "
              "Re-point to the live content-queue table when one exists.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
