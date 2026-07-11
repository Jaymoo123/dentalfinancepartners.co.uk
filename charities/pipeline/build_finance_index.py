"""UK Small Charity Finance Index — data pipeline.

Downloads the Charity Commission full-register extract (charity table, daily
extract, OGL v3.0) and the Companies House bulk company file (for the CIC
layer), computes the index aggregates, and writes the snapshot JSON the site
renders at /research/uk-small-charity-finance-index.

Usage (from repo root):
    python charities/pipeline/build_finance_index.py [--skip-cic] [--keep-raw]

Sources (verified live 2026-07-11):
  - https://register-of-charities.charitycommission.gov.uk/en/register/full-register-download
    -> https://ccewuksprdoneregsadata1.blob.core.windows.net/data/json/publicextract.charity.zip
  - https://download.companieshouse.gov.uk/en_output.html
    -> BasicCompanyDataAsOneFile-<YYYY-MM-01>.zip (CompanyCategory identifies CICs)

Scrutiny bands mirror docs/charities/house_positions.md (positions 1-4):
registration £5k, independent examination £25k, accruals/qualified examiner
£250k, audit £1m. The audit band here is income-only (the £250k + £3.26m
assets test needs part-B data the headline extract does not carry; documented
in the snapshot notes).

Raw downloads land in charities/pipeline/raw/ (deleted after a successful run
unless --keep-raw). Stdlib only.
"""
from __future__ import annotations

import argparse
import csv
import datetime as dt
import io
import json
import statistics
import sys
import urllib.request
import zipfile
from collections import Counter
from pathlib import Path

HERE = Path(__file__).resolve().parent
RAW = HERE / "raw"
OUT = HERE.parent / "web" / "src" / "data" / "uk-small-charity-finance-index.json"

CHARITY_ZIP_URL = (
    "https://ccewuksprdoneregsadata1.blob.core.windows.net/data/json/publicextract.charity.zip"
)
CH_BULK_INDEX = "https://download.companieshouse.gov.uk/en_output.html"

# House-position thresholds (England & Wales). Single source of truth:
# docs/charities/house_positions.md.
REGISTRATION_GATE = 5_000
IE_GATE = 25_000
ACCRUALS_GATE = 250_000
AUDIT_GATE = 1_000_000

BANDS = [
    ("under_5k", "Under £5,000 (below the registration threshold)", 0, REGISTRATION_GATE),
    ("5k_25k", "£5,000 to £25,000 (no external scrutiny required)", REGISTRATION_GATE, IE_GATE),
    ("25k_100k", "£25,001 to £100,000 (independent examination)", IE_GATE, 100_000),
    ("100k_250k", "£100,001 to £250,000 (independent examination)", 100_000, ACCRUALS_GATE),
    (
        "250k_1m",
        "£250,001 to £1m (independent examination by a qualified examiner, accruals accounts)",
        ACCRUALS_GATE,
        AUDIT_GATE,
    ),
    ("over_1m", "Over £1m (statutory audit)", AUDIT_GATE, None),
]


def download(url: str, dest: Path) -> Path:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        print(f"  using cached {dest.name} ({dest.stat().st_size / 1e6:.0f} MB)")
        return dest
    print(f"  downloading {url}")
    req = urllib.request.Request(url, headers={"User-Agent": "charity-finance-index/1.0"})
    with urllib.request.urlopen(req) as r, open(dest, "wb") as f:
        while chunk := r.read(1 << 20):
            f.write(chunk)
    print(f"  saved {dest.name} ({dest.stat().st_size / 1e6:.0f} MB)")
    return dest


def load_charities() -> list[dict]:
    zpath = download(CHARITY_ZIP_URL, RAW / "publicextract.charity.zip")
    with zipfile.ZipFile(zpath) as z:
        member = z.namelist()[0]
        with z.open(member) as f:
            data = json.load(io.TextIOWrapper(f, encoding="utf-8-sig"))
    print(f"  parsed {len(data):,} rows from {member}")
    return data


def year(datestr) -> int | None:
    if not datestr:
        return None
    try:
        return int(str(datestr)[:4])
    except ValueError:
        return None


def compute_charity_aggregates(rows: list[dict]) -> dict:
    # Main charities only (linked_charity_number == 0 excludes subsidiary/linked entries).
    main = [r for r in rows if (r.get("linked_charity_number") or 0) == 0]
    registered = [r for r in main if r.get("charity_registration_status") == "Registered"]
    removed = [r for r in main if r.get("charity_registration_status") == "Removed"]

    incomes = [
        float(r["latest_income"]) for r in registered if r.get("latest_income") is not None
    ]
    incomes.sort()

    band_counts: dict[str, int] = {k: 0 for k, *_ in BANDS}
    for inc in incomes:
        for key, _label, lo, hi in BANDS:
            if inc >= lo and (hi is None or inc < hi):
                band_counts[key] += 1
                break

    n = len(incomes)
    ie_band = band_counts["25k_100k"] + band_counts["100k_250k"] + band_counts["250k_1m"]
    under_25k = band_counts["under_5k"] + band_counts["5k_25k"]

    this_year = dt.date.today().year
    reg_years = Counter(y for r in main if (y := year(r.get("date_of_registration"))))
    rem_years = Counter(y for r in removed if (y := year(r.get("date_of_removal"))))
    flow_years = [
        {
            "year": y,
            "registrations": reg_years.get(y, 0),
            "removals": rem_years.get(y, 0),
            "net": reg_years.get(y, 0) - rem_years.get(y, 0),
        }
        # Current year is a partial year; stop at the last complete one.
        for y in range(this_year - 10, this_year)
    ]

    def pct(x: int) -> float:
        return round(100 * x / n, 1) if n else 0.0

    return {
        "registered_charities": len(registered),
        "removed_charities_on_register": len(removed),
        "with_reported_income": n,
        "income": {
            "median": round(statistics.median(incomes)) if incomes else 0,
            "mean": round(statistics.fmean(incomes)) if incomes else 0,
            "p25": round(incomes[n // 4]) if n else 0,
            "p75": round(incomes[(3 * n) // 4]) if n else 0,
            "p90": round(incomes[(9 * n) // 10]) if n else 0,
        },
        "scrutiny_bands": [
            {
                "key": key,
                "label": label,
                "count": band_counts[key],
                "pct": pct(band_counts[key]),
            }
            for key, label, *_ in BANDS
        ],
        "headline_shares": {
            "under_25k_pct": pct(under_25k),
            "ie_band_pct": pct(ie_band),
            "audit_band_pct": pct(band_counts["over_1m"]),
        },
        "flows": flow_years,
    }


def latest_ch_bulk_url() -> str:
    """The CH bulk file is republished monthly as ...-YYYY-MM-01.zip."""
    with urllib.request.urlopen(CH_BULK_INDEX) as r:
        html = r.read().decode("utf-8", "replace")
    import re

    m = re.search(r'href="(BasicCompanyDataAsOneFile-\d{4}-\d{2}-\d{2}\.zip)"', html)
    if not m:
        raise RuntimeError("Could not find BasicCompanyDataAsOneFile link on en_output.html")
    return "https://download.companieshouse.gov.uk/" + m.group(1)


def compute_cic_aggregates() -> dict:
    """Stream the CH bulk CSV (large, ~450 MB zipped) and count CICs.

    ponytail: full-file streaming count, no persistence of company rows; if CH
    ever offers a CIC-only extract, switch to it.
    """
    url = latest_ch_bulk_url()
    zpath = download(url, RAW / url.rsplit("/", 1)[1])
    active = 0
    total = 0
    inc_years: Counter[int] = Counter()
    with zipfile.ZipFile(zpath) as z:
        member = z.namelist()[0]
        with z.open(member) as f:
            reader = csv.DictReader(io.TextIOWrapper(f, encoding="utf-8", newline=""))
            # Column names in the bulk file carry stray spaces, e.g. " CompanyCategory".
            for i, row in enumerate(reader):
                cat = (row.get("CompanyCategory") or row.get(" CompanyCategory") or "").strip()
                if "community interest company" in cat.lower():
                    total += 1
                    status = (row.get("CompanyStatus") or "").strip().lower()
                    if status == "active":
                        active += 1
                    # IncorporationDate format is DD/MM/YYYY in this file.
                    d = (row.get("IncorporationDate") or "").strip()
                    if len(d) == 10 and d[6:].isdigit():
                        inc_years[int(d[6:])] += 1
                if i % 500_000 == 0 and i:
                    print(f"  ...scanned {i:,} companies, {total:,} CICs so far")
    this_year = dt.date.today().year
    return {
        "source_file": url,
        "total_cics_on_register": total,
        "active_cics": active,
        "incorporations_by_year": [
            {"year": y, "count": inc_years.get(y, 0)} for y in range(this_year - 10, this_year)
        ],
    }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--skip-cic", action="store_true", help="skip the Companies House CIC layer")
    ap.add_argument("--keep-raw", action="store_true", help="keep downloaded raw files")
    args = ap.parse_args()

    print("[1/3] Charity Commission full-register extract")
    rows = load_charities()
    charity = compute_charity_aggregates(rows)
    del rows

    cic = None
    if not args.skip_cic:
        print("[2/3] Companies House bulk file (CIC layer)")
        cic = compute_cic_aggregates()
    else:
        print("[2/3] CIC layer skipped (--skip-cic)")

    snapshot = {
        "meta": {
            "name": "UK Small Charity Finance Index",
            "generated_at": dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "jurisdiction": "England and Wales (Charity Commission register); CIC layer is UK-wide",
            "sources": [
                {
                    "name": "Charity Commission full register extract (charity table, daily)",
                    "publisher": "Charity Commission for England and Wales",
                    "url": "https://register-of-charities.charitycommission.gov.uk/en/register/full-register-download",
                    "licence": "Open Government Licence v3.0",
                },
                {
                    "name": "Companies House free company data product (monthly)",
                    "publisher": "Companies House",
                    "url": "https://download.companieshouse.gov.uk/en_output.html",
                    "licence": "Open Government Licence v3.0",
                },
            ],
            "thresholds": {
                "registration": REGISTRATION_GATE,
                "independent_examination": IE_GATE,
                "accruals_qualified_examiner": ACCRUALS_GATE,
                "audit": AUDIT_GATE,
            },
            "notes": (
                "Income figures are each charity's latest reported gross income (latest_income). "
                "Main charities only (linked charities excluded). The 'audit' band is income-only: "
                "charities over £250,000 income with gross assets over £3.26m also require an audit, "
                "but asset data is not in the headline extract, so the audit share shown is a floor. "
                "Registrations/removals use date_of_registration and date_of_removal across the full "
                "extract including removed charities; the Commission notes removed-charity history is "
                "complete only for recent decades. Current partial year excluded."
            ),
        },
        "charities": charity,
        "cics": cic,
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(snapshot, indent=2) + "\n", encoding="utf-8")
    print(f"[3/3] wrote {OUT} ({OUT.stat().st_size / 1024:.0f} KB)")
    print(
        f"  registered={charity['registered_charities']:,} "
        f"median_income=£{charity['income']['median']:,} "
        f"ie_band={charity['headline_shares']['ie_band_pct']}%"
        + (f" cics_active={cic['active_cics']:,}" if cic else "")
    )

    if not args.keep_raw:
        for p in RAW.glob("*"):
            p.unlink()
        print("  raw downloads deleted (--keep-raw to retain)")


if __name__ == "__main__":
    sys.exit(main())
