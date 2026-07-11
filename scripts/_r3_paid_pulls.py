"""R3 tier1 paid pulls — crypto / pharmacies / care TODO sections, one runner.

Owner-authorised interactive run 2026-07-11 (daily guard lifted via
DATAFORSEO_ABORT_AT env override; sub-agents still never set it).

Usage:
  DATAFORSEO_ABORT_AT=10 python scripts/_r3_paid_pulls.py crypto|pharmacies|care|all

Outputs per niche under expansion_research/tier1_<niche>/raw/:
  dfs_suggest_raw.json + dfs_keyword_suggestions.json (flat)
  dfs_ranked_raw.json  + dfs_ranked_keywords.json     (flat)
  dfs_head_volumes.json (google_ads search_volume + bulk KD, flat)
All calls via DataForSEOClient._post_paid (CostTracker + api_cost_log, site_key NULL).
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT))

from dotenv import load_dotenv

load_dotenv(ROOT / ".env")

from optimisation_engine.clients.dataforseo_client import DataForSEOClient

UK = 2826

PLANS = {
    "crypto": {
        "dir": "tier1_crypto",
        "seeds": [
            "crypto tax uk", "crypto accountant", "crypto capital gains tax",
            "defi tax", "staking tax", "crypto hmrc", "day trader tax",
            "crypto disclosure",
        ],
        "ranked": [
            "mycryptotax.co.uk", "uk.andersen.com",
            "crypto-tax-accountant.co.uk", "koinly.io",
        ],
        "heads": [
            "crypto tax accountant uk", "crypto tax accountant", "crypto accountant",
            "cryptocurrency accountant", "crypto tax uk", "crypto tax advisor uk",
            "bitcoin accountant uk", "defi tax accountant uk", "nft tax uk",
            "crypto mining tax uk", "staking rewards tax uk", "hmrc crypto disclosure",
            "crypto nudge letter", "koinly accountant", "day trader tax uk",
            "am i a crypto trader hmrc", "crypto self assessment",
            "crypto capital gains tax uk",
            # calculator terms
            "crypto tax calculator uk", "crypto capital gains tax calculator",
            "cgt on crypto calculator", "bitcoin mining tax calculator",
            "crypto staking tax calculator", "hmrc penalty calculator",
            "day trading tax calculator uk", "forex trading tax calculator uk",
        ],
    },
    "manufacturing": {
        "dir": "tier1_manufacturing",
        "seeds": [
            "manufacturing accountant", "accountants for manufacturers",
            "engineering accountant", "capital allowances plant and machinery",
            "r&d tax relief manufacturing", "patent box", "wip accounting", "cbam uk",
        ],
        "ranked": [
            "skynetaccounting.co.uk", "lanop.co.uk", "depreciationscalculator.co.uk",
        ],
        "heads": [
            "manufacturing accountant", "accountants for manufacturers",
            "manufacturing accountants uk", "engineering accountant",
            "accountants for engineers", "engineering firm accountant",
            "accountant for manufacturing business",
        ],
    },
    "pharmacies": {
        "dir": "tier1_pharmacies",
        "seeds": [
            "pharmacy accountant", "accountants for pharmacists", "buying a pharmacy",
            "selling a pharmacy", "pharmacy valuation", "locum pharmacist tax",
            "pharmacy vat", "pharmacy payroll",
        ],
        "ranked": ["rxvirtualfinance.co.uk", "pharmatax.co.uk", "lanop.co.uk"],
        "heads": [
            "buying a pharmacy uk", "pharmacy for sale", "selling a pharmacy",
            "pharmacy valuation", "pharmacy goodwill", "fp34", "drug tariff",
            "category m clawback", "pharmacy first payment",
            "do pharmacies pay vat", "are pharmacies vat exempt",
        ],
    },
    "care": {
        "dir": "tier1_care",
        "seeds": [
            "care home accountant", "domiciliary care accountant", "care home payroll",
            "sleep in shift pay", "care home vat", "buying a care home",
            "cqc registration", "supported living accountant",
        ],
        "ranked": [
            "heightenaccountants.co.uk", "costcare.co.uk",
            "carehome-accountants.co.uk", "care-calculator.co.uk",
        ],
        "heads": [],
    },
}


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


def run_niche(name: str, c: DataForSEOClient) -> float:
    plan = PLANS[name]
    raw_dir = ROOT / "expansion_research" / plan["dir"] / "raw"
    raw_dir.mkdir(exist_ok=True)
    spent = 0.0

    # 1. keyword_suggestions
    raw, flat = {}, []
    for s in plan["seeds"]:
        resp = c.keyword_suggestions(site_key=None, seed_keyword=s, limit=200)
        raw[s] = resp
        for task in resp.get("tasks", []):
            for res in task.get("result") or []:
                flat += flat_kw(res.get("items"))
        spent += float(resp.get("cost") or 0)
        print(f"[{name}] suggest '{s}' cost={resp.get('cost')}")
    (raw_dir / "dfs_suggest_raw.json").write_text(json.dumps(raw), encoding="utf-8")
    (raw_dir / "dfs_keyword_suggestions.json").write_text(json.dumps(flat, indent=1), encoding="utf-8")

    # 2. ranked_keywords
    raw, flat = {}, []
    for d in plan["ranked"]:
        resp = c.ranked_keywords(site_key=None, domain=d, limit=500)
        raw[d] = resp
        for task in resp.get("tasks", []):
            for res in task.get("result") or []:
                flat += flat_kw(res.get("items"))
        spent += float(resp.get("cost") or 0)
        print(f"[{name}] ranked '{d}' cost={resp.get('cost')}")
    (raw_dir / "dfs_ranked_raw.json").write_text(json.dumps(raw), encoding="utf-8")
    (raw_dir / "dfs_ranked_keywords.json").write_text(json.dumps(flat, indent=1), encoding="utf-8")

    # 3. head-term volumes (google_ads search_volume) + bulk KD
    heads = plan["heads"]
    if heads:
        sv = c._post_paid(
            "keywords_data/google_ads/search_volume/live",
            [{"keywords": heads, "location_code": UK, "language_code": "en"}],
            site_key=None,
            expected_rows=len(heads),
            seed_keyword=f"r3_{name}_heads:{len(heads)}kw",
        )
        spent += float(sv.get("cost") or 0)
        kd = c.bulk_keyword_difficulty(site_key=None, keywords=heads)
        spent += float(kd.get("cost") or 0)
        vol_by_kw, kd_by_kw = {}, {}
        for task in sv.get("tasks", []):
            for res in task.get("result") or []:
                kw = (res.get("keyword") or "").lower()
                if kw:
                    vol_by_kw[kw] = {"volume": res.get("search_volume"), "cpc": res.get("cpc"),
                                     "competition": res.get("competition")}
        for task in kd.get("tasks", []):
            for res in task.get("result") or []:
                for it in res.get("items") or []:
                    kw = (it.get("keyword") or "").lower()
                    if kw:
                        kd_by_kw[kw] = it.get("keyword_difficulty")
        merged = [{"keyword": k, **vol_by_kw.get(k.lower(), {}),
                   "kd": kd_by_kw.get(k.lower())} for k in heads]
        (raw_dir / "dfs_head_volumes_raw.json").write_text(
            json.dumps({"search_volume": sv, "bulk_kd": kd}), encoding="utf-8")
        (raw_dir / "dfs_head_volumes.json").write_text(json.dumps(merged, indent=1), encoding="utf-8")
        print(f"[{name}] heads: {len(merged)} rows")

    print(f"[{name}] TOTAL spent ${spent:.4f}")
    return spent


def main() -> None:
    which = sys.argv[1] if len(sys.argv) > 1 else "all"
    c = DataForSEOClient()
    print("balance:", json.dumps(c.get_account_balance())[:200])
    total = 0.0
    for name in (PLANS if which == "all" else [which]):
        total += run_niche(name, c)
    print(f"GRAND TOTAL ${total:.4f}")
    print("balance after:", json.dumps(c.get_account_balance())[:200])


if __name__ == "__main__":
    main()
