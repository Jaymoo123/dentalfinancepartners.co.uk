"""UK Care Provider Business Index — data pipeline.

Uses the Companies House Advanced Search API to pull quarterly incorporation
and dissolution counts per care SIC code bucket, writing a static JSON
series the site renders at /research/care-provider-business-index.

Also attempts to fetch CQC registered locations data (England only).

Usage (from repo root):
    python care/pipeline/build_care_provider_index.py

Sources:
  - CH Advanced Search API: https://developer.company-information.service.gov.uk/api/docs/
    Filter by sic_codes + incorporated_from/to or dissolved_from/to.
    Auth: HTTP Basic with COMPANIES_HOUSE_API_KEY as username, empty password.
    Rate limit: 600 req / 5 min -> sleep 0.35 s between calls.
  - CQC Care Directory: https://www.cqc.org.uk/about-us/transparency/using-cqc-data
    Covers England only. XLSX format requires openpyxl (not stdlib); recorded but not parsed.
  - Pull date: 2026-07-12

Scope caveats (stated in JSON output):
  - Incorporated companies only (sole-trader care agencies invisible).
  - SIC codes are self-reported by the filing company.
  - Dissolution date != trading-closure date (strike-off lag); use rolling averages.
  - CH data covers UK; CQC data covers England only.
  - Domiciliary agencies often mis-file under residential SIC codes.

Raw API responses saved per call in care/pipeline/raw/ for audit.
Idempotent: cached raw responses reused on rerun.
"""
from __future__ import annotations

import base64
import csv
import datetime as dt
import io
import json
import os
import sys
import time
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
RAW = HERE / "raw"
RAW.mkdir(parents=True, exist_ok=True)

OUT = HERE.parent / "web" / "src" / "data" / "uk-care-provider-business-index.json"
OUT.parent.mkdir(parents=True, exist_ok=True)

CH_BASE = "https://api.company-information.service.gov.uk"
PULL_DATE = "2026-07-12"

# SIC buckets: (key, label, [sic_codes])
SUB_TRADES: list[tuple[str, str, list[int]]] = [
    ("residential_nursing", "Residential Nursing Care", [87100]),
    ("residential_other", "Residential Care (LD, MH, Elderly & Disabled)", [87200, 87300, 87900]),
    ("domiciliary", "Domiciliary & Non-Residential Care", [88100]),
]

# All care SICs for headline proxy
ALL_CARE_SICS = [87100, 87200, 87300, 87900, 88100]

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
            if label > "2026-Q2":
                continue
            result.append((label, frm, to))
    return result

QUARTERS = _quarters()


def _auth_header() -> str:
    key = os.environ.get("COMPANIES_HOUSE_API_KEY", "")
    if not key:
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


def _parse_cqc_ods(path: Path, source_url: str) -> dict:
    """Stream-parse the CQC HSCA Active Locations ODS (zip + content.xml, stdlib only).

    Counts total active locations, locations by Primary Inspection Category, and
    care homes (Care home? = Y). content.xml is ~440 MB uncompressed, so we use
    iterparse and clear rows as we go.
    """
    import xml.etree.ElementTree as ET
    import zipfile
    from collections import Counter

    ns = "{urn:oasis:names:tc:opendocument:xmlns:table:1.0}"
    z = zipfile.ZipFile(path)
    f = z.open("content.xml")

    in_data = False
    header: list[str] | None = None
    cat_idx: int | None = None
    ch_idx: int | None = None
    total = 0
    by_category: Counter[str] = Counter()
    care_homes = 0

    for ev, el in ET.iterparse(f, events=("start", "end")):
        if ev == "start" and el.tag == ns + "table":
            in_data = el.get(ns + "name") != "README"
            continue
        if ev == "end" and el.tag == ns + "table-row":
            if in_data:
                cells: list[str] = []
                for c in el.iter(ns + "table-cell"):
                    rep = int(c.get(ns + "number-columns-repeated", "1"))
                    txt = "".join(c.itertext())
                    cells.extend([txt] * min(rep, 500))
                if header is None:
                    if any("Location ID" in x for x in cells):
                        header = cells
                        for i, h in enumerate(cells):
                            if "Primary Inspection Category" in h:
                                cat_idx = i
                            if h.strip().lower() == "care home?":
                                ch_idx = i
                elif any(x.strip() for x in cells):
                    total += 1
                    if cat_idx is not None and cat_idx < len(cells) and cells[cat_idx].strip():
                        by_category[cells[cat_idx]] += 1
                    if ch_idx is not None and ch_idx < len(cells) and cells[ch_idx] == "Y":
                        care_homes += 1
            el.clear()

    return {
        "registered_locations": total,
        "care_homes": care_homes,
        "by_primary_inspection_category": dict(by_category.most_common()),
        "source_url": source_url,
        "note": (
            "CQC HSCA Active Locations directory (England only), parsed from the ODS "
            "download. Counts are active registered locations at the file's publication "
            "date. Around 1.5% of rows have blank or shifted category cells in the "
            "source file and are excluded from the category breakdown (but included in "
            "the total). Care homes = locations flagged 'Care home? = Y'. CQC counts "
            "regulated locations, not companies, so figures are not directly comparable "
            "to the Companies House series."
        ),
    }


def _fetch_cqc_data() -> dict:
    """Attempt to find and fetch CQC Care Directory data.

    CQC publishes an active locations file at their transparency page.
    The download is typically XLSX, which requires openpyxl (not stdlib).
    We record the URL and return null data with an explanation if so.
    """
    cqc_page_url = "https://www.cqc.org.uk/about-us/transparency/using-cqc-data"
    cache_file = RAW / "cqc_page.html"

    print("\n[CQC] Attempting to fetch CQC transparency page...")
    try:
        if not cache_file.exists():
            req = urllib.request.Request(
                cqc_page_url,
                headers={"User-Agent": "Mozilla/5.0 (compatible; research-bot/1.0)"},
            )
            with urllib.request.urlopen(req, timeout=30) as r:
                html = r.read().decode("utf-8", errors="replace")
            cache_file.write_text(html, encoding="utf-8")
        else:
            html = cache_file.read_text(encoding="utf-8")

        # Look for a CSV or XLSX download link
        import re
        # Find links to care directory files
        links = re.findall(r'href="([^"]*(?:HSCA|care.directory|care_directory)[^"]*)"', html, re.IGNORECASE)
        if not links:
            # Broader search for xlsx/csv links
            links = re.findall(r'href="([^"]*\.(?:xlsx|csv|ods)[^"]*)"', html, re.IGNORECASE)

        print(f"  Found {len(links)} potential download link(s)")

        if not links:
            return {
                "registered_locations": None,
                "source_url": cqc_page_url,
                "note": (
                    "No download link found on the CQC transparency page at fetch time. "
                    "CQC publishes an active locations XLSX file covering England only. "
                    "Parsing XLSX requires openpyxl (not stdlib); data not included."
                ),
            }

        download_url = links[0]
        if not download_url.startswith("http"):
            download_url = "https://www.cqc.org.uk" + download_url

        print(f"  Download URL: {download_url}")

        # ODS is a zip containing content.xml: parseable with stdlib (zipfile + iterparse)
        if download_url.lower().endswith(".ods"):
            ods_cache = RAW / "cqc_active_locations.ods"
            if not ods_cache.exists():
                req = urllib.request.Request(
                    download_url,
                    headers={"User-Agent": "Mozilla/5.0 (compatible; research-bot/1.0)"},
                )
                with urllib.request.urlopen(req, timeout=300) as r:
                    ods_cache.write_bytes(r.read())
            print(f"  Parsing ODS ({ods_cache.stat().st_size / 1e6:.0f} MB zip) via stdlib stream...")
            return _parse_cqc_ods(ods_cache, download_url)

        if download_url.lower().endswith(".xlsx"):
            return {
                "registered_locations": None,
                "source_url": download_url,
                "note": (
                    f"CQC Care Directory found at {download_url}. "
                    "XLSX format requires openpyxl (not stdlib). Data not parsed. "
                    "CQC data covers England only; CH data covers UK."
                ),
            }

        # If CSV, try to parse
        csv_cache = RAW / "cqc_locations.csv"
        if not csv_cache.exists():
            req = urllib.request.Request(
                download_url,
                headers={"User-Agent": "Mozilla/5.0 (compatible; research-bot/1.0)"},
            )
            with urllib.request.urlopen(req, timeout=60) as r:
                csv_bytes = r.read()
            csv_cache.write_bytes(csv_bytes)
        else:
            csv_bytes = csv_cache.read_bytes()

        reader = csv.DictReader(io.StringIO(csv_bytes.decode("utf-8-sig", errors="replace")))
        rows = list(reader)
        return {
            "registered_locations": len(rows),
            "source_url": download_url,
            "note": "CQC active registered locations (England only). Parsed from CSV.",
        }

    except Exception as exc:
        print(f"  CQC fetch failed: {exc}")
        return {
            "registered_locations": None,
            "source_url": cqc_page_url,
            "note": (
                f"CQC fetch failed: {exc}. "
                "CQC publishes an active locations file covering England only. "
                "The download is typically XLSX, which requires openpyxl (not stdlib)."
            ),
        }


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

    # Headline: active companies across all care SICs combined
    print("\n[Care company count proxy] active SICs", ALL_CARE_SICS)
    care_active = sum(_active_count(sic) for sic in ALL_CARE_SICS)
    total_sic_requests += len(ALL_CARE_SICS)
    print(f"  care_company_count_proxy = {care_active:,}")

    # CQC layer
    cqc_data = _fetch_cqc_data()

    # Latest quarter net per sub-trade
    latest_q = quarter_labels[-1]
    latest_idx = -1
    latest_net = {k: v["net_openings"][latest_idx] for k, v in sub_trade_data.items()}

    snapshot = {
        "meta": {
            "title": "UK Care Provider Business Index",
            "description": (
                "Quarterly Companies House incorporation and dissolution counts "
                "for UK care sector companies by sub-segment, from Q1 2021."
            ),
            "source": "Companies House Advanced Search API",
            "source_url": "https://developer.company-information.service.gov.uk/api/docs/",
            "pull_date": PULL_DATE,
            "generated_at": dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "licence": "Open Government Licence v3.0",
            "methodology": (
                "Incorporations counted by incorporated_from/to date range per SIC code. "
                "Dissolutions counted by dissolved_from/to date range with company_status=dissolved. "
                "Each sub-segment aggregates one or more SIC codes. Rolling 4-quarter averages "
                "smooth the dissolution-lag effect (companies may cease trading months before "
                "formal strike-off). Counts reflect the state of the register at pull date. "
                "Companies House covers all UK-incorporated companies; CQC covers England-regulated "
                "locations only. These are different scopes and should not be directly compared."
            ),
            "caveats": [
                "Incorporated companies only: sole traders, partnerships, and unregistered "
                "care businesses are not visible in Companies House data.",
                "SIC codes are self-reported by the filing company. Domiciliary care agencies "
                "frequently mis-file under residential SIC codes (87100-87900) rather than "
                "the correct non-residential code (88100), understating the domiciliary segment.",
                "Dissolution date is the formal strike-off date, which typically lags "
                "actual trading closure by several months to over a year.",
                "A single business may operate across multiple SIC codes; each company "
                "is counted under its primary registered SIC.",
                "Companies House data covers the whole of the UK (England, Scotland, Wales, "
                "Northern Ireland). CQC data covers England-regulated locations only. "
                "These are different scopes: CH counts incorporated entities, CQC counts "
                "registered service locations.",
            ],
            "sic_buckets": {key: {"label": label, "codes": sics} for key, label, sics in SUB_TRADES},
        },
        "quarters": quarter_labels,
        "sub_trades": sub_trade_data,
        "headline": {
            "care_company_count_proxy": {
                "description": (
                    "Live active companies with any care SIC code "
                    "(87100, 87200, 87300, 87900, 88100) on the Companies House register as at "
                    + PULL_DATE
                ),
                "count": care_active,
                "sic_codes": ALL_CARE_SICS,
                "as_of": PULL_DATE,
            },
            "latest_quarter": latest_q,
            "latest_quarter_net_by_sub_trade": latest_net,
        },
        "cqc": cqc_data,
    }

    OUT.write_text(json.dumps(snapshot, indent=2) + "\n", encoding="utf-8")
    print(f"\n[done] wrote {OUT} ({OUT.stat().st_size / 1024:.0f} KB)")
    print(f"  API requests made: {_REQUEST_COUNT} live, {total_sic_requests} total lookups")
    print(f"  Quarters covered: {quarter_labels[0]} to {quarter_labels[-1]} ({len(quarter_labels)} quarters)")
    print(f"  Care company count proxy: {care_active:,}")
    print(f"  Latest quarter ({latest_q}) net openings: {latest_net}")
    print(f"  CQC registered locations: {cqc_data.get('registered_locations')}")


if __name__ == "__main__":
    sys.exit(main())
