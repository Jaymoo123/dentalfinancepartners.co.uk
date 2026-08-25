"""WIDE opportunity scan across ALL candidate high-value clusters for the estate.
Focus: unregulated / high-value / existing-audience-fit. DataForSEO Google Ads volume
+ Labs bulk_keyword_difficulty. Writes wide_scan.csv. Direct DFS (no audit layer).
"""
from __future__ import annotations

import base64
import csv
import re
from pathlib import Path

import httpx

HERE = Path(__file__).parent
_ADS_RE = re.compile(r"[^a-z0-9 ']")

CLUSTERS = {
    # ---- PROPERTY / landlord audience: unregulated commercial property finance ----
    "landlord_commercial_finance": [
        "bridging loan", "bridging finance", "bridging loan calculator", "bridging loan rates",
        "development finance", "property development finance", "property development loan",
        "auction finance", "auction property finance", "commercial mortgage", "commercial mortgage rates",
        "semi commercial mortgage", "second charge mortgage", "refurbishment finance", "brrr finance",
        "mezzanine finance", "self build mortgage", "land finance", "portfolio refinance",
        "commercial bridging loan", "bridging loan for property", "development exit finance",
    ],
    # ---- specialist property/business tax services (unregulated, high value) ----
    "specialist_tax": [
        "capital allowances", "embedded capital allowances", "capital allowances commercial property",
        "capital allowances claim", "r&d tax credits", "research and development tax relief",
        "r&d tax credit specialist", "tax investigation insurance", "fee protection insurance",
        "land remediation relief", "capital allowances on furnished holiday lets",
    ],
    # ---- multi-sector practice finance (replicate dental template) ----
    "practice_finance_multisector": [
        "gp practice finance", "buy a gp practice", "pharmacy finance", "buy a pharmacy", "pharmacy loan",
        "care home finance", "buy a care home", "veterinary practice finance", "buy a vets practice",
        "optician practice finance", "physiotherapy practice finance", "healthcare business loans",
        "medical practice loan", "vet practice finance", "nursery finance", "children's nursery finance",
    ],
    # ---- law firm finance (solicitor audience, mostly unregulated commercial) ----
    "law_firm_finance": [
        "law firm finance", "solicitors practice loan", "litigation funding", "disbursement funding",
        "legal disbursement funding", "partner capital loan", "law firm vat loan", "chambers finance",
        "solicitors professional indemnity finance", "law firm cash flow finance",
    ],
    # ---- estate-wide business finance (all audiences, unregulated commercial) ----
    "business_finance": [
        "invoice finance", "invoice factoring", "asset finance", "merchant cash advance",
        "business loans", "unsecured business loan", "vat loan", "tax loan", "corporation tax loan",
        "working capital finance", "growth guarantee scheme", "recovery loan scheme",
        "equipment finance", "hire purchase business", "revolving credit facility business",
    ],
    # ---- business exit / M&A / EOT (accountant-adjacent, unregulated, high value) ----
    "exit_ma_eot": [
        "sell my business", "business valuation", "how to value a business", "employee ownership trust",
        "eot", "employee ownership trust tax", "management buyout", "mbo finance", "business exit planning",
        "company exit strategy", "selling a business tax", "business sale accountant",
    ],
    # ---- construction / trade (unregulated slices) ----
    "trade_finance": [
        "plant finance", "digger finance", "excavator finance", "van finance", "van finance self employed",
        "contractor finance", "cis tax rebate", "construction equipment finance", "tool finance",
    ],
}


def load_env():
    login = pw = ""
    for ln in (HERE.parents[1] / ".env").read_text(encoding="utf-8").splitlines():
        if ln.startswith("DATAFORSEO_API_LOGIN="):
            login = ln.split("=", 1)[1].strip()
        elif ln.startswith("DATAFORSEO_API_PASSWORD="):
            pw = ln.split("=", 1)[1].strip()
    return login, pw


def _post(path, payload):
    login, pw = load_env()
    tok = base64.b64encode(f"{login}:{pw}".encode()).decode()
    r = httpx.post(f"https://api.dataforseo.com/v3/{path}",
                   headers={"Authorization": f"Basic {tok}", "Content-Type": "application/json"},
                   json=payload, timeout=180.0)
    r.raise_for_status()
    return r.json()


def search_volume(keywords):
    body = _post("keywords_data/google_ads/search_volume/live",
                 [{"keywords": keywords, "location_code": 2826, "language_code": "en"}])
    out = {}
    for t in body.get("tasks", []):
        if t.get("status_code") != 20000:
            raise RuntimeError(f"{t.get('status_code')}: {t.get('status_message')}")
        for it in t.get("result", []) or []:
            kw = (it.get("keyword") or "").lower().strip()
            if kw:
                out[kw] = {"sv": it.get("search_volume"), "cpc": it.get("cpc"),
                           "comp": it.get("competition")}
    return out


def keyword_difficulty(keywords):
    body = _post("dataforseo_labs/google/bulk_keyword_difficulty/live",
                 [{"keywords": keywords, "location_code": 2826, "language_code": "en"}])
    out = {}
    for t in body.get("tasks", []):
        if t.get("status_code") != 20000:
            print(f"  KD task {t.get('status_code')}: {t.get('status_message')}")
            continue
        for res in t.get("result", []) or []:
            for it in res.get("items", []) or []:
                out[(it.get("keyword") or "").lower().strip()] = it.get("keyword_difficulty")
    print(f"  KD cost ${body.get('cost',0):.4f}")
    return out


def sane(kw):
    s = " ".join(_ADS_RE.sub(" ", kw.lower()).split())
    return s if s and len(s) <= 80 and 1 <= len(s.split()) <= 10 else None


def main():
    kw2cluster = {}
    for cl, seeds in CLUSTERS.items():
        for s in seeds:
            ss = sane(s)
            if ss:
                kw2cluster.setdefault(ss, cl)
    allkw = sorted(kw2cluster)
    print(f"scanning {len(allkw)} keywords across {len(CLUSTERS)} clusters")

    vols = {}
    for i in range(0, len(allkw), 500):
        vols.update(search_volume(allkw[i:i+500]))
    # KD only for keywords with real volume (save cost)
    withvol = [k for k in allkw if (vols.get(k, {}).get("sv") or 0) >= 20]
    kd = {}
    for i in range(0, len(withvol), 1000):
        kd.update(keyword_difficulty(withvol[i:i+1000]))

    rows = []
    for kw in allkw:
        v = vols.get(kw, {})
        rows.append({"cluster": kw2cluster[kw], "keyword": kw,
                     "search_volume": v.get("sv"), "cpc": v.get("cpc"),
                     "competition": v.get("comp"), "kd": kd.get(kw)})
    rows.sort(key=lambda r: (r["cluster"], -(r["search_volume"] or -1)))
    with (HERE / "wide_scan.csv").open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys())); w.writeheader(); w.writerows(rows)

    # cluster league table
    print(f"\n{'cluster':<32}{'kw':>4}{'w/vol':>6}{'sum vol':>9}{'top term (vol/kd)':>34}")
    print("-" * 88)
    league = []
    for cl in CLUSTERS:
        cr = [r for r in rows if r["cluster"] == cl]
        wv = [r for r in cr if r["search_volume"]]
        total = sum(r["search_volume"] for r in wv)
        top = max(wv, key=lambda r: r["search_volume"]) if wv else None
        league.append((total, cl, len(cr), len(wv), top))
    for total, cl, n, nv, top in sorted(league, reverse=True):
        t = f"{top['keyword']} ({top['search_volume']}/kd{top['kd']})" if top else "-"
        print(f"{cl:<32}{n:>4}{nv:>6}{total:>9}{t:>34}")


if __name__ == "__main__":
    main()
