"""UK Hospitality Openings & Closures Index — data pipeline.

Uses the Companies House Advanced Search API to pull quarterly incorporation
and dissolution counts per hospitality SIC code bucket, writing a static JSON
series the site renders at /research/hospitality-openings-closures-index.

Usage (from repo root):
    python hospitality/pipeline/build_openings_closures_index.py

Sources:
  - CH Advanced Search API: https://developer.company-information.service.gov.uk/api/docs/
    Filter by sic_codes + incorporated_from/to or dissolved_from/to.
    Auth: HTTP Basic with COMPANIES_HOUSE_API_KEY as username, empty password.
    Rate limit: 600 req / 5 min → sleep 0.35 s between calls.
  - Pull date: 2026-07-12

Scope caveats (stated in JSON output):
  - Incorporated companies only (sole-trader cafes/B&Bs invisible).
  - SIC codes are self-reported by the filing company.
  - Dissolution date != trading-closure date (strike-off lag); use rolling averages.

Raw API responses saved per call in hospitality/pipeline/raw/ for audit.
Idempotent: cached raw responses reused on rerun.
"""
from __future__ import annotations

import base64
import datetime as dt
import json
import os
import sys
import time
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
RAW = HERE / "raw"
RAW.mkdir(parents=True, exist_ok=True)

OUT = HERE.parent / "web" / "src" / "data" / "uk-hospitality-openings-closures-index.json"
OUT.parent.mkdir(parents=True, exist_ok=True)

CH_BASE = "https://api.company-information.service.gov.uk"
PULL_DATE = "2026-07-12"

# SIC buckets: (key, label, [sic_codes])
SUB_TRADES: list[tuple[str, str, list[int]]] = [
    ("restaurants_cafes", "Restaurants & Cafes", [56101, 56102, 56103]),
    ("takeaways", "Takeaways & Mobile Food", [56210, 56290]),
    ("pubs_bars", "Pubs, Bars & Nightclubs", [56301, 56302]),
    ("hotels", "Hotels", [55100]),
    ("other_accommodation", "Other Accommodation", [55201, 55209]),
]

# Quarters: Q1 2021 through Q2 2026 (22 quarters)
def _quarters() -> list[tuple[str, str, str]]:
    """Return list of (label, from_date, to_date) for each quarter."""
    result = []
    for year in range(2021, 2027):
        for q, (m_start, m_end, d_end) in enumerate(
            [(1, 3, 31), (4, 6, 30), (7, 9, 30), (10, 12, 31)], 1
        ):
            label = f"{year}-Q{q}"
            frm = f"{year}-{m_start:02d}-01"
            to = f"{year}-{m_end:02d}-{d_end:02d}"
            # Don't include future quarters (pull date = 2026-07-12, so Q3 2026 is partial/future)
            if label > "2026-Q2":
                continue
            result.append((label, frm, to))
    return result

QUARTERS = _quarters()


def _auth_header() -> str:
    key = os.environ.get("COMPANIES_HOUSE_API_KEY", "")
    if not key:
        # Try loading from .env in repo root
        env_path = HERE.parent.parent / ".env"
        if env_path.exists():
            for line in env_path.read_text(encoding="utf-8").splitlines():
                if line.startswith("COMPANIES_HOUSE_API_KEY="):
                    key = line.split("=", 1)[1].strip()
                    break
    if not key:
        raise RuntimeError("COMPANIES_HOUSE_API_KEY not set")
    return "Basic " + base64.b64encode(f"{key}:".encode()).decode()


_AUTH: str | None = None
_REQUEST_COUNT = 0


def _ch_get(url: str, cache_key: str) -> dict:
    global _AUTH, _REQUEST_COUNT
    if _AUTH is None:
        _AUTH = _auth_header()

    cache_file = RAW / f"{cache_key}.json"
    if cache_file.exists():
        return json.loads(cache_file.read_text(encoding="utf-8"))

    # Rate limit: 600 req / 5 min = 2/sec; sleep 0.35 s to stay safe
    if _REQUEST_COUNT > 0:
        time.sleep(0.35)

    req = urllib.request.Request(url, headers={"Authorization": _AUTH, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = json.loads(r.read())
    cache_file.write_text(json.dumps(data, indent=2), encoding="utf-8")
    _REQUEST_COUNT += 1
    return data


def _hits(sic: int, quarter_label: str, qfrom: str, qto: str, kind: str) -> int:
    """Fetch hit count for one SIC + quarter + kind (inc or dis)."""
    cache_key = f"{kind}_{sic}_{quarter_label}"
    if kind == "inc":
        url = (
            f"{CH_BASE}/advanced-search/companies"
            f"?sic_codes={sic}&incorporated_from={qfrom}&incorporated_to={qto}&size=1"
        )
    else:
        url = (
            f"{CH_BASE}/advanced-search/companies"
            f"?sic_codes={sic}&company_status=dissolved"
            f"&dissolved_from={qfrom}&dissolved_to={qto}&size=1"
        )
    data = _ch_get(url, cache_key)
    return int(data.get("hits", 0))


def _active_count(sic: int) -> int:
    """Live active company count for a SIC code."""
    cache_key = f"active_{sic}"
    url = f"{CH_BASE}/advanced-search/companies?sic_codes={sic}&company_status=active&size=1"
    data = _ch_get(url, cache_key)
    return int(data.get("hits", 0))


def _rolling4(series: list[int]) -> list[float | None]:
    result: list[float | None] = []
    for i, _ in enumerate(series):
        if i < 3:
            result.append(None)
        else:
            result.append(round(sum(series[i - 3 : i + 1]) / 4, 2))
    return result


def main() -> None:
    quarter_labels = [q[0] for q in QUARTERS]
    total_sic_requests = 0

    # Build per-sub-trade series
    sub_trade_data: dict[str, dict] = {}
    for key, label, sics in SUB_TRADES:
        print(f"\n[{label}] SICs {sics}")
        incs: list[int] = []
        diss: list[int] = []
        for qlabel, qfrom, qto in QUARTERS:
            q_inc = sum(_hits(sic, qlabel, qfrom, qto, "inc") for sic in sics)
            q_dis = sum(_hits(sic, qlabel, qfrom, qto, "dis") for sic in sics)
            incs.append(q_inc)
            diss.append(q_dis)
            total_sic_requests += 2 * len(sics)
            print(f"  {qlabel}: inc={q_inc} dis={q_dis} net={q_inc - q_dis}")

        net = [i - d for i, d in zip(incs, diss)]
        sub_trade_data[key] = {
            "label": label,
            "sic_codes": sics,
            "incorporations": incs,
            "dissolutions": diss,
            "net_openings": net,
            "rolling_4q_avg_net": _rolling4(net),
        }

    # Pub count proxy: live active companies SIC 56301 + 56302
    print("\n[Pub count proxy] active SIC 56301 + 56302")
    pub_active = _active_count(56301) + _active_count(56302)
    total_sic_requests += 2
    print(f"  pub_count_proxy = {pub_active:,}")

    # Latest quarter net per sub-trade
    latest_q = quarter_labels[-1]
    latest_idx = -1
    latest_net = {k: v["net_openings"][latest_idx] for k, v in sub_trade_data.items()}

    snapshot = {
        "meta": {
            "title": "UK Hospitality Openings & Closures Index",
            "description": (
                "Quarterly Companies House incorporation and dissolution counts "
                "for UK hospitality companies by sub-trade, from Q1 2021."
            ),
            "source": "Companies House Advanced Search API",
            "source_url": "https://developer.company-information.service.gov.uk/api/docs/",
            "pull_date": PULL_DATE,
            "generated_at": dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "licence": "Open Government Licence v3.0",
            "methodology": (
                "Incorporations counted by incorporated_from/to date range per SIC code. "
                "Dissolutions counted by dissolved_from/to date range with company_status=dissolved. "
                "Each sub-trade aggregates one or more SIC codes. Rolling 4-quarter averages "
                "smooth the dissolution-lag effect (companies may cease trading months before "
                "formal strike-off). Counts reflect the state of the register at pull date."
            ),
            "caveats": [
                "Incorporated companies only: sole traders, partnerships, and unregistered "
                "businesses are not visible in Companies House data.",
                "SIC codes are self-reported by the filing company and may not precisely "
                "reflect the business's primary activity.",
                "Dissolution date is the formal strike-off date, which typically lags "
                "actual trading closure by several months to over a year.",
                "A single business may operate across multiple SIC codes; each company "
                "is counted under its primary registered SIC.",
            ],
            "sic_buckets": {key: {"label": label, "codes": sics} for key, label, sics in SUB_TRADES},
        },
        "quarters": quarter_labels,
        "sub_trades": sub_trade_data,
        "headline": {
            "pub_count_proxy": {
                "description": (
                    "Live active companies with SIC 56301 (public houses and bars) or "
                    "56302 (licensed clubs) on the Companies House register as at " + PULL_DATE
                ),
                "count": pub_active,
                "as_of": PULL_DATE,
            },
            "latest_quarter": latest_q,
            "latest_quarter_net_by_sub_trade": latest_net,
        },
    }

    OUT.write_text(json.dumps(snapshot, indent=2) + "\n", encoding="utf-8")
    print(f"\n[done] wrote {OUT} ({OUT.stat().st_size / 1024:.0f} KB)")
    print(f"  API requests made (live + cached): {_REQUEST_COUNT} live, {total_sic_requests} total lookups")
    print(f"  Quarters covered: {quarter_labels[0]} to {quarter_labels[-1]} ({len(quarter_labels)} quarters)")
    print(f"  Pub count proxy: {pub_active:,}")
    print(f"  Latest quarter ({latest_q}) net openings: {latest_net}")


if __name__ == "__main__":
    sys.exit(main())
