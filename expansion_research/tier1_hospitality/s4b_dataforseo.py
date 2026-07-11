"""R3 tier1 hospitality — Stage 4b: DataForSEO ranked_keywords (top rivals) + keyword_suggestions.

Usage:
  python s4b_dataforseo.py ranked domain1 domain2 domain3
  python s4b_dataforseo.py suggest
All paid calls via DataForSEOClient (CostTracker + api_cost_log). Raw saved for free re-analysis.
Adapted from pilot_charities/s4b_dataforseo.py.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT))

from dotenv import load_dotenv

load_dotenv(ROOT / ".env")

from optimisation_engine.clients.dataforseo_client import DataForSEOClient

# R3 hospitality is owner-authorised for $3-8 today; the default $0.85 daily code
# guard was already consumed by R2d + the charities R3 run. Session-scoped raise,
# documented in r3_call_plan.md. Hard stop stays well under the task budget.
import optimisation_engine.cost_tracker as _ct
_ct.DATAFORSEO_ABORT_AT = 2.50
_ct.DATAFORSEO_CEILING_USD = 3.00

SEEDS = [
    "restaurant accountant",
    "hospitality accountants",
    "pub accountant",
    "takeaway accountant",
    "hotel accountant",
    "tronc scheme",
    "vat on takeaway food",
    "tour operators margin scheme",
]


def flat_kw(items: list[dict]) -> list[dict]:
    out = []
    for it in items or []:
        kd = it.get("keyword_data") or it
        info = kd.get("keyword_info") or {}
        props = kd.get("keyword_properties") or {}
        out.append({
            "keyword": kd.get("keyword"),
            "volume": info.get("search_volume"),
            "cpc": info.get("cpc"),
            "competition": info.get("competition"),
            "kd": props.get("keyword_difficulty"),
        })
    return [r for r in out if r["keyword"]]


def main() -> None:
    mode = sys.argv[1]
    c = DataForSEOClient()
    bal = c.get_account_balance()
    print("balance:", json.dumps(bal)[:200])

    if mode == "ranked":
        domains = sys.argv[2:]
        raw, flat = {}, []
        for d in domains:
            resp = c.ranked_keywords(site_key=None, domain=d, limit=500)
            raw[d] = resp
            for task in resp.get("tasks", []):
                for res in task.get("result") or []:
                    flat += flat_kw(res.get("items"))
            print(d, "cost:", resp.get("cost"))
        (HERE / "raw" / "dfs_ranked_raw.json").write_text(json.dumps(raw), encoding="utf-8")
        (HERE / "raw" / "dfs_ranked_keywords.json").write_text(json.dumps(flat, indent=1), encoding="utf-8")
        print("flat rows:", len(flat))
    elif mode == "suggest":
        raw, flat = {}, []
        for s in SEEDS:
            resp = c.keyword_suggestions(site_key=None, seed_keyword=s, limit=200)
            raw[s] = resp
            for task in resp.get("tasks", []):
                for res in task.get("result") or []:
                    flat += flat_kw(res.get("items"))
            print(s, "cost:", resp.get("cost"))
        (HERE / "raw" / "dfs_suggest_raw.json").write_text(json.dumps(raw), encoding="utf-8")
        (HERE / "raw" / "dfs_keyword_suggestions.json").write_text(json.dumps(flat, indent=1), encoding="utf-8")
        print("flat rows:", len(flat))


if __name__ == "__main__":
    main()
