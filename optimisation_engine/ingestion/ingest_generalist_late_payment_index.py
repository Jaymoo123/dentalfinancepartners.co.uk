"""UK Late Payment Index (generalist) -- data ingestion.

Aggregate, half-yearly trend of how long large UK businesses take to pay
invoices, built from the statutory Payment Practices Reporting (PPR)
disclosure. Kept strictly AGGREGATE: no company names, no per-firm league
(the generalist site's editorial posture differs from the construction-cis
PPR league, which is a named per-firm table -- see locked instruction to
keep this page's hero aggregate only).

Source:
  Payment Practices Reporting service -- full CSV export (gov.uk).
  Every large UK business (broadly, meeting 2 of: >GBP36m turnover, >GBP18m
  balance sheet, >250 employees) must file this twice a year under the
  Reporting on Payment Practices and Performance Regulations 2017. This is a
  statutory public disclosure regime (not OGL-badged, but a public register).

Usage:
  python -m optimisation_engine.ingestion.ingest_generalist_late_payment_index

Self-contained: no Supabase, no git commit. The export is a ~100MB CSV of
every filing ever made; this script streams it and never writes company-level
rows to the output snapshot.
"""
from __future__ import annotations

import csv
import io
import json
from collections import defaultdict
from datetime import date
from pathlib import Path

import requests

PPR_CSV_URL = "https://check-payment-practices.service.gov.uk/export/csv/"
RELEASE_PAGE = "https://www.gov.uk/check-when-businesses-pay-invoices"
ATTRIBUTION = (
    "UK Late Payment Index compiled from the Payment Practices Reporting "
    "service (gov.uk), a statutory disclosure every large UK business must "
    "publish twice yearly. Aggregate figures only; no individual company is "
    "named or ranked on this page. Free to cite with attribution to Holloway "
    "Davies."
)

OUT_PATH = (
    Path(__file__).resolve().parents[2]
    / "generalist" / "web" / "src" / "data" / "uk-late-payment-index.json"
)

MIN_YEAR, MAX_YEAR = 2017, date.today().year + 1
ATP_MIN, ATP_MAX = 0, 365  # sanity bounds for "Average time to pay" (days); drops mis-keyed outliers


def half_year(y: int, m: int) -> str:
    return f"{y}H1" if m <= 6 else f"{y}H2"


def fnum(row: dict, key: str) -> float | None:
    v = (row.get(key) or "").strip()
    if not v:
        return None
    try:
        return float(v)
    except ValueError:
        return None


def main() -> None:
    print("Downloading Payment Practices Reporting full CSV export (large file)...")
    r = requests.get(PPR_CSV_URL, timeout=300, stream=True)
    r.raise_for_status()
    text = r.content.decode("utf-8", errors="replace")
    print(f"  {len(text):,} bytes")

    buckets: dict[str, dict] = defaultdict(lambda: {
        "atp": [], "w30": [], "late": [], "companies": set(),
    })
    n_rows = 0
    n_bad_date = 0
    n_outlier_atp = 0

    reader = csv.DictReader(io.StringIO(text))
    for row in reader:
        n_rows += 1
        ed = (row.get("End date") or "").strip()
        if len(ed) != 10 or ed[4] != "-":
            n_bad_date += 1
            continue
        try:
            y, m = int(ed[:4]), int(ed[5:7])
        except ValueError:
            n_bad_date += 1
            continue
        if not (MIN_YEAR <= y <= MAX_YEAR):
            n_bad_date += 1
            continue

        b = half_year(y, m)
        atp = fnum(row, "Average time to pay")
        if atp is not None and not (ATP_MIN <= atp <= ATP_MAX):
            n_outlier_atp += 1
            atp = None
        w30 = fnum(row, "% Invoices paid within 30 days")
        late = fnum(row, "% Invoices not paid within agreed terms")

        if atp is not None:
            buckets[b]["atp"].append(atp)
        if w30 is not None:
            buckets[b]["w30"].append(w30)
        if late is not None:
            buckets[b]["late"].append(late)
        buckets[b]["companies"].add(row.get("Company number", ""))

    def stats(lst: list[float]) -> tuple[float | None, float | None, int]:
        if not lst:
            return None, None, 0
        s = sorted(lst)
        n = len(s)
        mean = round(sum(s) / n, 1)
        median = s[n // 2] if n % 2 else round((s[n // 2 - 1] + s[n // 2]) / 2, 1)
        return mean, median, n

    periods = []
    for b in sorted(buckets):
        d = buckets[b]
        mean_atp, median_atp, n_atp = stats(d["atp"])
        mean_w30, _, _ = stats(d["w30"])
        mean_late, _, _ = stats(d["late"])
        periods.append({
            "period": b,
            "n_filings": n_atp,
            "n_companies": len(d["companies"]),
            "mean_days_to_pay": mean_atp,
            "median_days_to_pay": median_atp,
            "mean_pct_within_30d": mean_w30,
            "mean_pct_not_paid_on_time": mean_late,
        })

    # Drop sparse partial periods at either end (regime just started / most
    # recent half-year still filing) from the headline series -- mirrors the
    # "exclude partial year" convention used elsewhere in the estate.
    full_periods = [p for p in periods if p["n_filings"] >= 100]

    latest = full_periods[-1]
    decade_start = full_periods[0]
    change_pct = (
        round((latest["mean_days_to_pay"] - decade_start["mean_days_to_pay"]) / decade_start["mean_days_to_pay"] * 100, 1)
        if decade_start["mean_days_to_pay"] else None
    )

    headline = {
        "latest_period": latest["period"],
        "latest_mean_days_to_pay": latest["mean_days_to_pay"],
        "latest_median_days_to_pay": latest["median_days_to_pay"],
        "latest_pct_within_30d": latest["mean_pct_within_30d"],
        "latest_pct_not_paid_on_time": latest["mean_pct_not_paid_on_time"],
        "latest_n_companies": latest["n_companies"],
        "series_from_period": decade_start["period"],
        "series_from_mean_days_to_pay": decade_start["mean_days_to_pay"],
        "change_pct": change_pct,
    }

    snapshot = {
        "meta": {
            "generated_at": date.today().isoformat(),
            "sources": [{
                "name": "Payment Practices Reporting -- full CSV export",
                "publisher": "Department for Business and Trade",
                "url": PPR_CSV_URL,
                "release_page": RELEASE_PAGE,
                "licence": "Statutory public disclosure (Reporting on Payment Practices and Performance Regulations 2017)",
                "retrieved": date.today().isoformat(),
            }],
            "notes": (
                "Every large UK business (broadly, meeting at least two of: turnover above "
                "GBP 36 million, balance sheet above GBP 18 million, more than 250 employees) "
                "must publish this statutory return twice a year. Figures here are "
                "aggregated across every qualifying filing in each half-year reporting "
                "period (bucketed by each filing's own period end date, not a fixed "
                "calendar half); this page never names or ranks individual companies. "
                "'Average time to pay' is each filer's own self-reported figure across all "
                "its supplier invoices. A small number of filings with implausible values "
                "(outside 0-365 days) are excluded as data-entry errors. The earliest and "
                "latest half-years are shown in the full series but excluded from the "
                "headline trend where filing volume is still sparse (regime start-up or "
                "reporting lag)."
            ),
            "attribution": ATTRIBUTION,
            "data_quality": {
                "total_rows_in_export": n_rows,
                "rows_dropped_bad_date": n_bad_date,
                "atp_values_dropped_as_outliers": n_outlier_atp,
            },
        },
        "headline": headline,
        "periods": periods,
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(snapshot, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\n[snapshot] wrote {OUT_PATH}")

    # Self-check
    assert len(full_periods) >= 10, "too few full reporting periods"
    for p in full_periods:
        assert p["mean_days_to_pay"] is not None and 0 <= p["mean_days_to_pay"] <= 365
        assert p["mean_pct_within_30d"] is None or 0 <= p["mean_pct_within_30d"] <= 100
    print("[self-check] PASS")
    print(f"Latest period {latest['period']}: mean {latest['mean_days_to_pay']} days, median {latest['median_days_to_pay']} days, {latest['n_companies']} companies")
    print(f"Since {decade_start['period']}: mean days-to-pay change {change_pct}%")


if __name__ == "__main__":
    main()
