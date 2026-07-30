"""Expand each Track-A/B cluster into its full keyword universe via DataForSEO
keyword_suggestions (keywords containing each head seed, with UK volume).
Writes <cluster>_universe.csv. Feeds the comprehensive page map.
"""
from __future__ import annotations

import base64
import csv
from pathlib import Path

import httpx

HERE = Path(__file__).parent

SEEDS = {
    "specialist_tax": ["capital allowances", "research and development tax", "r&d tax credit",
                       "land remediation relief", "embedded capital allowances"],
    "business_finance": ["invoice finance", "asset finance", "business loan", "invoice factoring",
                         "merchant cash advance", "vat loan", "working capital finance"],
    "exit_eot": ["sell my business", "business valuation", "employee ownership trust",
                 "management buyout", "business exit"],
    "landlord_commercial_finance": ["bridging loan", "development finance", "commercial mortgage",
                                    "auction finance", "bridging finance", "commercial finance"],
}


def load_env():
    login = pw = ""
    for ln in (HERE.parents[1] / ".env").read_text(encoding="utf-8").splitlines():
        if ln.startswith("DATAFORSEO_API_LOGIN="):
            login = ln.split("=", 1)[1].strip()
        elif ln.startswith("DATAFORSEO_API_PASSWORD="):
            pw = ln.split("=", 1)[1].strip()
    return login, pw


def suggestions(seed, limit=700):
    login, pw = load_env()
    tok = base64.b64encode(f"{login}:{pw}".encode()).decode()
    r = httpx.post("https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_suggestions/live",
                   headers={"Authorization": f"Basic {tok}", "Content-Type": "application/json"},
                   json=[{"keyword": seed, "location_code": 2826, "language_code": "en",
                          "limit": limit, "include_serp_info": False}], timeout=180.0)
    r.raise_for_status()
    body = r.json()
    out = []
    for t in body.get("tasks", []) or []:
        if t.get("status_code") != 20000:
            print(f"  [{seed}] {t.get('status_code')}: {t.get('status_message')}")
            continue
        for res in t.get("result", []) or []:
            for it in res.get("items", []) or []:
                ki = it.get("keyword_info") or {}
                out.append((it.get("keyword", "").lower().strip(), ki.get("search_volume"),
                            ki.get("cpc"), ki.get("competition_level")))
    return out, body.get("cost", 0) or 0


def main():
    grand_cost = 0.0
    for cluster, seeds in SEEDS.items():
        uni = {}
        for s in seeds:
            rows, cost = suggestions(s)
            grand_cost += cost
            for kw, sv, cpc, comp in rows:
                if kw and (kw not in uni or (sv or 0) > (uni[kw][0] or 0)):
                    uni[kw] = (sv, cpc, comp)
        rows = sorted(([kw, sv, cpc, comp] for kw, (sv, cpc, comp) in uni.items()),
                      key=lambda r: -(r[1] or -1))
        with (HERE / f"{cluster}_universe.csv").open("w", newline="", encoding="utf-8") as f:
            w = csv.writer(f); w.writerow(["keyword", "search_volume", "cpc", "competition"]); w.writerows(rows)
        withvol = [r for r in rows if r[1]]
        print(f"{cluster:<30} {len(rows)} kw, {len(withvol)} w/vol, "
              f"sum {sum(r[1] for r in withvol)}/mo -> {cluster}_universe.csv")
    print(f"\ntotal DFS cost ${grand_cost:.4f}")


if __name__ == "__main__":
    main()
