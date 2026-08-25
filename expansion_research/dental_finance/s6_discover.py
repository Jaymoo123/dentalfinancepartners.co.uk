"""Stage 6: deep competitor keyword discovery via DataForSEO keywords_for_site.
Returns every keyword each competitor domain ranks for, with UK volume + ranking URL.
Direct DFS call (bypasses cost-tracker audit layer). Writes discovered.json.
"""
from __future__ import annotations

import base64
import json
from pathlib import Path

import httpx

HERE = Path(__file__).parent

DENTAL_DOMAINS = ["samera.co.uk", "pfmdental.co.uk", "braemarfinance.co.uk",
                  "dentalelite.co.uk", "rangewell.com"]
BTL_DOMAINS = ["commercialtrust.co.uk", "thebuytoletbroker.co.uk",
               "spvmortgages.co.uk", "foxdavidson.co.uk"]


def load_env():
    login = pw = ""
    for line in Path("C:/Users/user/Documents/Accounting/.env").read_text(encoding="utf-8").splitlines():
        if line.startswith("DATAFORSEO_API_LOGIN="):
            login = line.split("=", 1)[1].strip()
        elif line.startswith("DATAFORSEO_API_PASSWORD="):
            pw = line.split("=", 1)[1].strip()
    return login, pw


def keywords_for_site(domain: str, limit: int = 1000) -> list[dict]:
    login, pw = load_env()
    tok = base64.b64encode(f"{login}:{pw}".encode()).decode()
    payload = [{
        "target": domain,
        "location_code": 2826,
        "language_code": "en",
        "limit": limit,
        "order_by": ["keyword_info.search_volume,desc"],
    }]
    r = httpx.post(
        "https://api.dataforseo.com/v3/dataforseo_labs/google/keywords_for_site/live",
        headers={"Authorization": f"Basic {tok}", "Content-Type": "application/json"},
        json=payload, timeout=180.0,
    )
    r.raise_for_status()
    body = r.json()
    out = []
    for task in body.get("tasks", []) or []:
        if task.get("status_code") != 20000:
            print(f"  [{domain}] task {task.get('status_code')}: {task.get('status_message')}")
            continue
        for result in task.get("result", []) or []:
            for item in result.get("items", []) or []:
                ki = item.get("keyword_info") or {}
                out.append({
                    "keyword": (item.get("keyword") or "").lower().strip(),
                    "search_volume": ki.get("search_volume"),
                    "cpc": ki.get("cpc"),
                    "competition": ki.get("competition"),
                })
    print(f"  cost ${body.get('cost', 0):.4f}")
    return out


def main() -> None:
    discovered = {"dental": {}, "btl": {}}
    for group, domains in (("dental", DENTAL_DOMAINS), ("btl", BTL_DOMAINS)):
        for d in domains:
            kws = keywords_for_site(d)
            discovered[group][d] = kws
            print(f"{group}/{d}: {len(kws)} keywords")
    (HERE / "discovered.json").write_text(json.dumps(discovered, indent=1), encoding="utf-8")
    # quick totals
    for group in discovered:
        allkw = {k["keyword"] for d in discovered[group].values() for k in d}
        print(f"{group}: {len(allkw)} unique keywords across {len(discovered[group])} domains")


if __name__ == "__main__":
    main()
