"""Tier-2 R3 paid pulls — head-term volumes only, all 5 niches, one runner.

Every Tier-2 verdict came back NO-GO / CONDITIONAL with the flip condition being
measured hire-intent head volume, so this pulls ONLY the decisive heads (no
suggest/ranked expansion for niches that are not being built).

Owner-authorised interactive run pattern per 2026-07-11 ruling (manager-driven;
sub-agents never touch guards).

Usage: DATAFORSEO_ABORT_AT=10 python scripts/_tier2_paid_pulls.py

Outputs per niche: expansion_research/tier2_<n>/raw/dfs_head_volumes.json
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

HEADS = {
    "farmers": [
        "farm accountant", "agricultural accountants", "accountants for farmers",
        "farm accountants near me", "agricultural accountant uk", "rural accountants",
        "farm tax adviser", "farm tax advice", "agricultural property relief",
        "farmers averaging", "herd basis", "farm inheritance tax",
        "farm diversification tax", "farm business tenancy tax",
        "selling farmland capital gains tax", "farm vat", "contract farming agreement tax",
    ],
    "expats": [
        "expat accountant", "expat accountant uk", "expat tax advice uk",
        "non resident tax uk", "non resident tax accountant",
        "non resident landlord scheme", "nrcgt", "leaving the uk tax",
        "split year treatment", "statutory residence test", "fig regime",
        "foreign income and gains regime", "non dom tax uk", "us expat tax uk",
        "moving abroad tax uk", "p85 form", "returning to the uk tax",
        "double taxation relief uk",
    ],
    "retail": [
        "retail accountant", "retail accountants uk", "accountant for retail business",
        "accountant for shop", "shop accountant", "accountants for independent shops",
        "convenience store accountant", "newsagent accountant", "off licence accountant",
        "franchise accountant", "accountants for franchisees", "retail vat scheme",
        "point of sale vat scheme", "vat apportionment scheme", "epos accounting",
        "till reconciliation", "retail stock accounting",
        "buying a convenience store", "selling a shop business tax",
        "cash business hmrc investigation",
    ],
    "fca": [
        "accountants for fca regulated firms", "fca regulated accountants",
        "cass audit", "cass audit cost", "cass audit firms", "client money audit",
        "safeguarding audit", "safeguarding audit payment institution",
        "emi safeguarding audit", "cass 15", "regdata reporting",
        "fca regulatory reporting", "mifidpru reporting", "ifpr", "icara",
        "fca authorisation cost", "fca application accountant",
        "accountants for mortgage brokers", "accountants for insurance brokers",
        "accountants for ifas", "payment institution accountant",
        "e money institution accountant",
    ],
    "travel": [
        "travel agency accountant", "travel agent accountants",
        "accountants for travel agents", "tour operator accountant",
        "accountants for tour operators", "travel industry accountants",
        "toms vat", "toms vat accountant", "tour operators margin scheme",
        "toms vat calculation", "atol reporting accountant", "atol accountant",
        "ara accountant", "abta bonding requirements", "atol renewal accountant",
        "travel trust account", "pipeline monies travel",
        # control pair: consumer-intent terms to quantify the conflation
        "atol certificate", "abta protected",
    ],
}


def main() -> None:
    c = DataForSEOClient()
    total = 0.0
    for name, heads in HEADS.items():
        raw_dir = ROOT / "expansion_research" / f"tier2_{name}" / "raw"
        raw_dir.mkdir(parents=True, exist_ok=True)
        sv = c._post_paid(
            "keywords_data/google_ads/search_volume/live",
            [{"keywords": heads, "location_code": UK, "language_code": "en"}],
            site_key=None,
            expected_rows=len(heads),
            seed_keyword=f"r3_tier2_{name}_heads:{len(heads)}kw",
        )
        spent = float(sv.get("cost") or 0)
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
        print(f"[{name}] {len(merged)} rows, ${spent:.4f}")
        total += spent
    print(f"TOTAL ${total:.4f}")


if __name__ == "__main__":
    main()
