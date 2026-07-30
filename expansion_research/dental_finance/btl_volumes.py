"""Comparison volume pull: SPV / Ltd-co / portfolio BTL mortgage keyword universe.
Same direct-DataForSEO path as s2. Answers 'is BTL where the real volume is?'.
"""
from __future__ import annotations

import base64
import csv
import re
from pathlib import Path

import httpx

HERE = Path(__file__).parent
_ADS_RE = re.compile(r"[^a-z0-9 ']")

SEEDS = [
    # ltd-co / SPV core
    "limited company buy to let mortgage", "ltd company buy to let mortgage",
    "spv mortgage", "spv buy to let mortgage", "limited company buy to let",
    "buy to let limited company", "company buy to let mortgage",
    "limited company buy to let mortgage rates", "spv btl mortgage",
    "buy to let mortgage limited company", "ltd company btl",
    # portfolio
    "portfolio landlord mortgage", "portfolio buy to let mortgage",
    "portfolio landlord", "portfolio mortgage", "portfolio landlord remortgage",
    "buy to let portfolio mortgage",
    # rates / product
    "buy to let mortgage", "buy to let mortgages", "buy to let mortgage rates",
    "buy to let remortgage", "best buy to let mortgages", "buy to let mortgage calculator",
    "hmo mortgage", "hmo buy to let mortgage", "holiday let mortgage",
    "5 year fixed buy to let", "85 ltv buy to let",
    # structuring / incorporation (accounting x mortgage seam)
    "transfer property to limited company", "incorporation relief buy to let",
    "moving buy to let into a company", "section 24 buy to let",
    "should i buy property through a limited company", "spv company",
    "spv for property", "setting up a limited company for buy to let",
    # criteria long-tail
    "first time landlord mortgage", "first time buyer buy to let",
    "buy to let mortgage bad credit", "buy to let mortgage no income",
    "expat buy to let mortgage", "non resident landlord mortgage",
    "buy to let mortgage self employed", "let to buy mortgage",
    "day one remortgage", "buy to let stress test", "rental income calculator buy to let",
    # expat / NRL cluster (adjacent)
    "expat mortgage", "non resident mortgage uk", "british expat mortgage",
]


def load_env():
    envp = Path("C:/Users/user/Documents/Accounting/.env")
    login = pw = ""
    for line in envp.read_text(encoding="utf-8").splitlines():
        if line.startswith("DATAFORSEO_API_LOGIN="):
            login = line.split("=", 1)[1].strip()
        elif line.startswith("DATAFORSEO_API_PASSWORD="):
            pw = line.split("=", 1)[1].strip()
    return login, pw


def sv(keywords):
    login, pw = load_env()
    tok = base64.b64encode(f"{login}:{pw}".encode()).decode()
    r = httpx.post(
        "https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live",
        headers={"Authorization": f"Basic {tok}", "Content-Type": "application/json"},
        json=[{"keywords": keywords, "location_code": 2826, "language_code": "en"}],
        timeout=120.0,
    )
    r.raise_for_status()
    out = {}
    for task in r.json().get("tasks", []):
        if task.get("status_code") != 20000:
            raise RuntimeError(f"{task.get('status_code')}: {task.get('status_message')}")
        for it in task.get("result", []) or []:
            kw = (it.get("keyword") or "").lower().strip()
            if kw:
                out[kw] = it.get("search_volume")
    return out


def main():
    sane = {}
    for kw in dict.fromkeys(SEEDS):
        s = " ".join(_ADS_RE.sub(" ", kw.lower()).split())
        if s and len(s) <= 80 and 1 <= len(s.split()) <= 10:
            sane.setdefault(s, kw)
    vols = sv(sorted(sane))
    rows = sorted(((sane[s], vols.get(s)) for s in sane), key=lambda x: -(x[1] or -1))
    with (HERE / "btl_volumes.csv").open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f); w.writerow(["keyword", "search_volume"]); w.writerows(rows)
    withvol = [(k, v) for k, v in rows if v]
    print(f"{len(withvol)}/{len(rows)} have volume | total monthly: {sum(v for _, v in withvol)}")
    for k, v in rows:
        print(f"  {v or 0:>6}  {k}")


if __name__ == "__main__":
    main()
