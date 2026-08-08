"""Buyer-side demand research: who searches to BUY leads we already produce.

Two DataForSEO calls: keywords_for_keywords (expand) then search_volume (price it).
UK / en. Writes expanded.csv.
"""
from __future__ import annotations

import base64
import csv
import json
import os
import re
from pathlib import Path

import httpx

HERE = Path(__file__).parent
SEEDS = json.loads((HERE / "seeds.json").read_text(encoding="utf-8"))["buckets"]
_ADS_RE = re.compile(r"[^a-z0-9 ']")


def _auth() -> str:
    login = os.environ.get("DATAFORSEO_API_LOGIN") or ""
    pwd = os.environ.get("DATAFORSEO_API_PASSWORD") or ""
    if not (login and pwd):
        for line in Path("C:/Users/user/Documents/Accounting/.env").read_text(encoding="utf-8").splitlines():
            if line.startswith("DATAFORSEO_API_LOGIN="):
                login = line.split("=", 1)[1].strip()
            elif line.startswith("DATAFORSEO_API_PASSWORD="):
                pwd = line.split("=", 1)[1].strip()
    return base64.b64encode(f"{login}:{pwd}".encode()).decode()


def post(path: str, payload: list[dict]) -> dict:
    r = httpx.post(
        f"https://api.dataforseo.com/v3/{path}",
        headers={"Authorization": f"Basic {_auth()}", "Content-Type": "application/json"},
        json=payload, timeout=180.0,
    )
    r.raise_for_status()
    return r.json()


def sane(kw: str) -> str | None:
    s = " ".join(_ADS_RE.sub(" ", kw.lower()).split())
    return s if s and len(s) <= 80 and 1 <= len(s.split()) <= 10 else None


def items(resp: dict):
    for task in resp.get("tasks", []) or []:
        if task.get("status_code") != 20000:
            raise RuntimeError(f"{task.get('status_code')}: {task.get('status_message')}")
        yield from (task.get("result") or [])


def main() -> None:
    raw = HERE / "raw"
    raw.mkdir(exist_ok=True)
    bucket_of = {k: b for b, kws in SEEDS.items() for k in map(str.lower, kws)}
    seeds = sorted(bucket_of)

    # Expand: keywords_for_keywords takes <=20 seeds per task, so one task per bucket
    # (buckets are all <=25; slice to be safe).
    expanded: dict[str, str] = {}
    tasks = [{"keywords": [s for s in map(sane, kws) if s][:20],
              "location_code": 2826, "language_code": "en", "limit": 700,
              "tag": bucket}
             for bucket, kws in SEEDS.items()]
    for t in tasks:
        resp = post("keywords_data/google_ads/keywords_for_keywords/live", [t])
        (raw / f"expand_{t['tag']}.json").write_text(json.dumps(resp), encoding="utf-8")
        for it in items(resp):
            kw = (it.get("keyword") or "").strip().lower()
            if kw:
                expanded.setdefault(kw, t["tag"])

    all_kw = sorted({s for s in map(sane, list(bucket_of) + list(expanded)) if s})
    print(f"seeds={len(seeds)} expanded={len(expanded)} sendable={len(all_kw)}")

    vols: dict[str, dict] = {}
    for i in range(0, len(all_kw), 500):
        resp = post("keywords_data/google_ads/search_volume/live",
                    [{"keywords": all_kw[i:i + 500], "location_code": 2826, "language_code": "en"}])
        (raw / f"volumes_{i}.json").write_text(json.dumps(resp), encoding="utf-8")
        for it in items(resp):
            kw = (it.get("keyword") or "").strip().lower()
            if kw:
                vols[kw] = it

    rows = []
    for kw in all_kw:
        v = vols.get(kw, {})
        sv = v.get("search_volume") or 0
        cpc = v.get("cpc") or 0
        rows.append({
            "keyword": kw,
            "search_volume": sv,
            "cpc": cpc,
            "competition": v.get("competition"),
            "value_index": round(sv * cpc, 1),   # crude monthly click-value proxy
            "bucket": bucket_of.get(kw) or expanded.get(kw, "expanded"),
            "source": "seed" if kw in bucket_of else "expanded",
        })
    rows.sort(key=lambda r: -r["value_index"])
    with (HERE / "expanded.csv").open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    print(f"\n{sum(1 for r in rows if r['search_volume'])}/{len(rows)} with volume")
    print("\nTop 60 by value_index (sv * cpc):")
    for r in rows[:60]:
        print(f"  {r['search_volume']:>6}  GBP{r['cpc']:>7.2f}  {r['bucket']:<28} {r['keyword']}")


if __name__ == "__main__":
    main()
