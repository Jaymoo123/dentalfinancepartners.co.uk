"""SPV formation demand-map pipeline. Direct DataForSEO calls, budget-capped.
Steps: site-based discovery (keywords_for_site) -> seed expansion (keyword_ideas)
-> consolidate + classify -> optional bulk KD on top terms.
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
RAW = HERE / "raw"
RAW.mkdir(exist_ok=True)

DFS_LOGIN = os.environ.get("DATAFORSEO_API_LOGIN") or ""
DFS_PASSWORD = os.environ.get("DATAFORSEO_API_PASSWORD") or ""

BUDGET_CAP = 8.0
spent = 0.0


def _load_env() -> None:
    global DFS_LOGIN, DFS_PASSWORD
    if DFS_LOGIN and DFS_PASSWORD:
        return
    envp = Path("C:/Users/user/Documents/Accounting/.env")
    for line in envp.read_text(encoding="utf-8").splitlines():
        if line.startswith("DATAFORSEO_API_LOGIN="):
            DFS_LOGIN = line.split("=", 1)[1].strip()
        elif line.startswith("DATAFORSEO_API_PASSWORD="):
            DFS_PASSWORD = line.split("=", 1)[1].strip()


def _post(path: str, payload: list[dict]) -> dict:
    global spent
    if spent >= BUDGET_CAP:
        raise RuntimeError(f"BUDGET CAP HIT: spent=${spent:.4f}")
    _load_env()
    tok = base64.b64encode(f"{DFS_LOGIN}:{DFS_PASSWORD}".encode()).decode()
    r = httpx.post(
        f"https://api.dataforseo.com{path}",
        headers={"Authorization": f"Basic {tok}", "Content-Type": "application/json"},
        json=payload,
        timeout=180.0,
    )
    r.raise_for_status()
    data = r.json()
    cost = data.get("cost", 0) or 0
    spent += cost
    print(f"  [{path}] cost=${cost:.4f} cumulative=${spent:.4f}")
    return data


SITES = [
    "provestor.co.uk", "getground.co.uk", "uklandlordtax.co.uk",
    "propertyspv.co.uk", "watsonknipe.co.uk",
]

SEEDS = [
    "spv property", "buy to let limited company", "property company tax",
    "transfer property to limited company", "sic code spv",
    "limited company mortgage", "registered office", "non resident landlord company",
]


def _parse_site_resp(resp: dict, domain: str) -> list[dict]:
    out = []
    for task in resp.get("tasks", []) or []:
        for res in task.get("result", []) or []:
            for item in res.get("items", []) or []:
                info = item.get("keyword_info", {}) or {}
                kw = item.get("keyword")
                if not kw:
                    continue
                out.append({
                    "keyword": kw, "volume": info.get("search_volume"),
                    "cpc": info.get("cpc"), "kd": None,
                    "source": f"site:{domain}",
                })
    return out


def keywords_for_site(domain: str) -> list[dict]:
    cache = RAW / f"site_{domain}.json"
    if cache.exists():
        resp = json.loads(cache.read_text(encoding="utf-8"))
    else:
        payload = [{
            "target": domain, "location_code": 2826, "language_code": "en",
            "limit": 1000, "filters": [["keyword_info.search_volume", ">=", 10]],
        }]
        resp = _post("/v3/dataforseo_labs/google/keywords_for_site/live", payload)
        cache.write_text(json.dumps(resp), encoding="utf-8")
    return _parse_site_resp(resp, domain)


def keyword_ideas(seed: str) -> list[dict]:
    cache = RAW / f"ideas_{re.sub(r'[^a-z0-9]+', '_', seed.lower())}.json"
    if cache.exists():
        resp = json.loads(cache.read_text(encoding="utf-8"))
    else:
        payload = [{
            "keywords": [seed], "location_code": 2826, "language_code": "en",
            "limit": 700, "filters": [["keyword_info.search_volume", ">=", 10]],
        }]
        resp = _post("/v3/dataforseo_labs/google/keyword_ideas/live", payload)
        cache.write_text(json.dumps(resp), encoding="utf-8")
    out = []
    for task in resp.get("tasks", []) or []:
        for res in task.get("result", []) or []:
            for item in res.get("items", []) or []:
                info = item.get("keyword_info", {}) or {}
                kw = item.get("keyword")
                if not kw:
                    continue
                out.append({
                    "keyword": kw, "volume": info.get("search_volume"),
                    "cpc": info.get("cpc"), "kd": None,
                    "source": f"seed:{seed}",
                })
    return out


def bulk_kd(keywords: list[str]) -> dict[str, int]:
    out: dict[str, int] = {}
    for i in range(0, len(keywords), 1000):
        batch = keywords[i:i + 1000]
        cache = RAW / f"kd_{i}.json"
        if cache.exists():
            resp = json.loads(cache.read_text(encoding="utf-8"))
        else:
            payload = [{"keywords": batch, "location_code": 2826, "language_code": "en"}]
            resp = _post("/v3/dataforseo_labs/google/bulk_keyword_difficulty/live", payload)
            cache.write_text(json.dumps(resp), encoding="utf-8")
        for task in resp.get("tasks", []) or []:
            for res in task.get("result", []) or []:
                for item in res.get("items", []) or []:
                    kw = (item.get("keyword") or "").lower()
                    if kw:
                        out[kw] = item.get("keyword_difficulty")
    return out


# --- classification ---
PATTERNS = [
    ("form-now", re.compile(
        r"\b(set ?up|setting up|register|registration|cost to|how to open|"
        r"how much (to|does it cost)|form a|incorporate|incorporating|open a company)\b", re.I)),
    ("decide", re.compile(
        r"\b(should i|vs personal(ly)?|worth it|pros and cons|pros cons|is it worth|"
        r"advantages|disadvantages|better to)\b", re.I)),
    ("transfer-in", re.compile(
        r"\b(transfer .*(property|portfolio)|incorporation relief|s ?162|section 162|"
        r"cgt|capital gains|sdlt|stamp duty|move (my )?properties|"
        r"existing portfolio)\b", re.I)),
    ("mortgages", re.compile(
        r"\b(mortgage|remortgag|lender|ltv|interest rate)s?\b", re.I)),
    ("run-the-company", re.compile(
        r"\b(accounts|annual accounts|corporation tax|ct600|director'?s? loan|"
        r"dividend|ated|confirmation statement|filing|filings|bookkeeping|"
        r"registered office|companies house)\b", re.I)),
    ("non-resident", re.compile(
        r"\b(non.?resident|expat|overseas landlord|foreign national|nrl)\b", re.I)),
    ("tools", re.compile(r"\b(calculator|calculate)\b", re.I)),
]


def classify(kw: str) -> str:
    for bucket, pat in PATTERNS:
        if pat.search(kw):
            return bucket
    return "other"


def main() -> None:
    print("=== Stage 1: site-based discovery ===")
    all_rows: list[dict] = []
    for d in SITES:
        rows = keywords_for_site(d)
        print(f"  {d}: {len(rows)} keywords")
        all_rows.extend(rows)

    print("\n=== Stage 2: seed expansion ===")
    for s in SEEDS:
        rows = keyword_ideas(s)
        print(f"  '{s}': {len(rows)} keywords")
        all_rows.extend(rows)

    print(f"\nRaw total rows: {len(all_rows)}  spent so far: ${spent:.4f}")

    # dedupe: keep max volume row per keyword, merge sources
    dedup: dict[str, dict] = {}
    for r in all_rows:
        k = r["keyword"].strip().lower()
        if not k:
            continue
        if k not in dedup:
            dedup[k] = dict(r, keyword=k, sources={r["source"]})
        else:
            dedup[k]["sources"].add(r["source"])
            if (r["volume"] or 0) > (dedup[k]["volume"] or 0):
                dedup[k]["volume"] = r["volume"]
                dedup[k]["cpc"] = r["cpc"]

    for k, r in dedup.items():
        r["bucket"] = classify(k)
        r["source"] = ";".join(sorted(r["sources"]))
        del r["sources"]

    print(f"Deduped keyword count: {len(dedup)}")

    # Stage 4: bulk KD on top ~100 in priority buckets, if budget allows
    priority = [k for k, r in dedup.items() if r["bucket"] in ("form-now", "decide", "transfer-in")]
    priority.sort(key=lambda k: (dedup[k]["volume"] or 0), reverse=True)
    top100 = priority[:100]
    if spent < BUDGET_CAP and top100:
        print(f"\n=== Stage 4: bulk KD for top {len(top100)} priority keywords ===")
        try:
            kd_map = bulk_kd(top100)
            for k, kd in kd_map.items():
                if k in dedup:
                    dedup[k]["kd"] = kd
        except RuntimeError as e:
            print(f"  skipped: {e}")

    rows_out = sorted(dedup.values(), key=lambda r: (r["volume"] or 0), reverse=True)
    with (HERE / "demand_corpus.csv").open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["keyword", "volume", "cpc", "kd", "bucket", "source"])
        w.writeheader()
        for r in rows_out:
            w.writerow(r)

    print(f"\nFINAL total spent: ${spent:.4f}")
    (HERE / "spend.json").write_text(json.dumps({"spent": spent}), encoding="utf-8")

    # bucket totals for report
    bucket_totals: dict[str, int] = {}
    for r in rows_out:
        b = r["bucket"]
        bucket_totals[b] = bucket_totals.get(b, 0) + (r["volume"] or 0)
    print("\nBucket totals (monthly volume):")
    for b, v in sorted(bucket_totals.items(), key=lambda x: -x[1]):
        print(f"  {b:>16}: {v}")


if __name__ == "__main__":
    main()
