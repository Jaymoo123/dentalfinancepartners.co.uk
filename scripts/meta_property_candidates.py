"""Select Property meta-proposal candidates (read-only).

Combines worklist.json (CTR-shortfall scoring), intervention_ledger.json
(cooldown: no meta edit <28d), frozen list, and recency-weighted query profiles
(half-life 28d) per the v2 methodology. Only pages with weighted position <=15
on their recency-dominant queries are eligible (deeper pages route to
needs-position-not-meta).

Output: .cache/meta_program/property/candidates.json

Usage: python scripts/meta_property_candidates.py
"""
from __future__ import annotations

import json
import math
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from optimisation_engine.competitor._db import _sql  # noqa: E402
from optimisation_engine.analysis.query_ledger import canon, BRAND_TOKENS  # noqa: E402

CACHE = ROOT / ".cache" / "meta_program" / "property"
FROZEN = ROOT / "docs" / "_engines" / "property_frozen_pages.md"
COOLDOWN_DAYS = 28
HALF_LIFE = 28
MIN_IMPR_90D = 50
MAX_WPOS = 15.0
BRAND = BRAND_TOKENS["property"]


def main() -> None:
    worklist = json.loads((CACHE / "worklist.json").read_text(encoding="utf-8"))
    ledger = json.loads((CACHE / "intervention_ledger.json").read_text(encoding="utf-8"))
    frozen = {canon(m) for m in re.findall(r"^\s*-\s*(https?://\S+)",
                                           FROZEN.read_text(encoding="utf-8"), re.M)}
    today = date.today()

    candidates, rejected = [], []
    for w in worklist:
        u = canon(w["page_url"])
        reason = None
        if u in frozen:
            reason = "frozen"
        entry = ledger.get(u, {"interventions": []})
        meta_dates = [iv["date"] for iv in entry["interventions"]
                      if "meta" in iv["type"]]
        if not reason and meta_dates:
            days_since = (today - date.fromisoformat(max(meta_dates))).days
            if days_since < COOLDOWN_DAYS:
                reason = f"cooldown ({days_since}d since last meta edit)"
        if not reason and w["total_impressions"] < MIN_IMPR_90D:
            reason = "below impression floor"

        # recency-weighted query profile (90d, half-life 28d)
        if not reason:
            url_variants = "'" + u.replace("'", "''") + "', '" + \
                u.replace("https://propertytaxpartners", "https://www.propertytaxpartners").replace("'", "''") + "'"
            rows = _sql(f"""
                SELECT query, date::text AS d, SUM(impressions) i, SUM(clicks) c,
                       SUM(position*impressions)/NULLIF(SUM(impressions),0) wpos
                FROM gsc_query_data
                WHERE site_key='property' AND date > now() - interval '90 days'
                  AND page_url IN ({url_variants})
                GROUP BY query, date""")
            agg: dict[str, dict] = {}
            for r in rows:
                q = (r["query"] or "").lower()
                if any(t in q for t in BRAND):
                    continue
                age = (today - date.fromisoformat(r["d"])).days
                wgt = 0.5 ** (age / HALF_LIFE)
                a = agg.setdefault(q, {"w": 0.0, "i": 0, "c": 0, "pw": 0.0})
                a["w"] += wgt * int(r["i"] or 0)
                a["i"] += int(r["i"] or 0)
                a["c"] += int(r["c"] or 0)
                if r["wpos"] is not None:
                    a["pw"] += float(r["wpos"]) * wgt * int(r["i"] or 0)
            top = sorted(agg.items(), key=lambda kv: -kv[1]["w"])[:8]
            rw_queries = [{"query": q, "recency_weight": round(a["w"], 1),
                           "impressions_90d": a["i"], "clicks_90d": a["c"],
                           "wpos": round(a["pw"] / a["w"], 1) if a["w"] else None}
                          for q, a in top]
            if not rw_queries:
                reason = "no non-brand query data"
            else:
                total_w = sum(q["recency_weight"] for q in rw_queries)
                wpos = sum(q["wpos"] * q["recency_weight"] for q in rw_queries
                           if q["wpos"] is not None) / total_w if total_w else None
                if wpos is None or wpos > MAX_WPOS:
                    reason = f"needs-position-not-meta (weighted pos {wpos and round(wpos,1)})"

        if reason:
            rejected.append({"page_url": u, "slug": w["slug"], "reason": reason,
                             "score": w["score"]})
            continue
        candidates.append({
            "slug": w["slug"], "file": w["file"], "page_url": w["page_url"],
            "score": w["score"], "total_impressions": w["total_impressions"],
            "total_clicks": w["total_clicks"],
            "current_metaTitle": w["current_metaTitle"],
            "current_metaDescription": w["current_metaDescription"],
            "recency_queries": rw_queries,
            "weighted_pos": round(wpos, 1),
            "last_meta_edit": max(meta_dates) if meta_dates else None,
        })

    out = {"generated": str(today), "candidates": candidates, "rejected": rejected}
    (CACHE / "candidates.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"[candidates] {len(candidates)} eligible, {len(rejected)} rejected")
    for c in candidates:
        print(f"  {c['weighted_pos']:>5} pos {c['total_impressions']:>6} impr  {c['slug'][:60]}")
    from collections import Counter
    print("  rejected:", Counter(r["reason"].split(" (")[0] for r in rejected))


if __name__ == "__main__":
    main()
