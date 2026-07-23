"""UK Contractor Index -- reform-overlay post-processing step.

Derives a "reform_overlay" block from the existing monthly union incorporations
series in contractors-ir35/web/src/data/uk-contractor-index.json (no new
source: pure derived layer on top of the Companies House formations spine
already ingested by optimisation_engine/ingestion/research/engine.py) and
writes it back into the same JSON file.

Annotates the two off-payroll (IR35) reform dates:
  - April 2017: off-payroll reform extended to the public sector
  - April 2021: off-payroll reform extended to the private and voluntary sectors

and computes trailing-12-month (TTM) union-formation run-rates at the point
just before each reform, plus the CAGR of that run-rate across each era. Also
carries HMRC's own published impact figures as citation context (the
independent check the formations curve provides), sourced from gov.uk.

Run this AFTER regenerating uk-contractor-index.json via the research engine:
  python -m optimisation_engine.ingestion.research.engine --site contractors-ir35 --execute --no-supabase
  python contractors-ir35/pipeline/build_contractor_reform_overlay.py
"""
from __future__ import annotations

import datetime as dt
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
DATA_PATH = HERE.parent / "web" / "src" / "data" / "uk-contractor-index.json"

REFORM_DATES = [
    {
        "date": "2017-04",
        "label": "Off-payroll reform: public sector",
        "description": (
            "From 6 April 2017, public sector engagers became responsible for determining "
            "IR35 status, shifting risk away from the contractor's own personal service "
            "company for public sector engagements."
        ),
    },
    {
        "date": "2021-04",
        "label": "Off-payroll reform: private sector",
        "description": (
            "From 6 April 2021, the same off-payroll rules extended to medium and large "
            "private sector engagers, who became responsible for determining IR35 status for "
            "the great majority of the contractor market."
        ),
    },
]

HMRC_CONTEXT = {
    "additional_tax_gbp": 4_200_000_000,
    "additional_tax_label": "£4.2bn",
    "contractors_affected": 120_000,
    "period": "October 2019 to March 2023",
    "source_name": "HMRC, Impacts of the 2021 off-payroll working rules reform in the private and voluntary sectors (updated)",
    "source_url": "https://www.gov.uk/government/publications/impacts-of-the-2021-off-payroll-working-rules-reform-in-the-private-and-voluntary-sectors",
    "note": (
        "These are HMRC's own published impact estimates, not derived from this dataset. They "
        "are shown as independent context: if the private sector reform materially reduced the "
        "attractiveness of PSC contracting, we would expect to see it in the new-incorporation "
        "growth-rate deltas below."
    ),
}


def _month_add(ym: str, months: int) -> str:
    y, m = (int(p) for p in ym.split("-"))
    total = (y * 12 + (m - 1)) + months
    return f"{total // 12:04d}-{total % 12 + 1:02d}"


def _ttm_ending(monthly_by_key: dict[str, int], end_month: str) -> tuple[int | None, str, str]:
    """Sum of 'union' over the 12 months ending at (and including) end_month."""
    start_month = _month_add(end_month, -11)
    months = []
    m = start_month
    while m <= end_month:
        months.append(m)
        m = _month_add(m, 1)
    values = [monthly_by_key.get(m) for m in months]
    if any(v is None for v in values):
        return None, start_month, end_month
    return sum(values), start_month, end_month


def _cagr_pct(start_value: int, end_value: int, years: float) -> float | None:
    if start_value <= 0 or years <= 0:
        return None
    return round(((end_value / start_value) ** (1 / years) - 1) * 100, 1)


# Segment key (from optimisation_engine/ingestion/research/niches/contractors_ir35.py)
# -> the division column name the flagship page expects in incorporations.annual_by_division.
# "it_software" (the full division 62011/62012/62020/62090) is used for "it", not the
# narrower "it_consultancy" primary-headline segment (62020 only).
DIVISION_SEGMENT_MAP = {
    "it_software": "it",
    "consultancy": "consultancy",
    "engineering": "engineering",
    "creative": "creative",
}


def _rebuild_annual_by_division(data: dict) -> None:
    """Rebuild incorporations.annual_by_division from the engine's segments[] output.

    The generic engine (optimisation_engine/ingestion/research/snapshot.py) only
    auto-builds annual_by_division from segments whose key starts with the literal
    "div" (a convention this niche's segments never used). Without it, the
    division breakdown the flagship page renders is silently missing. Rebuilt
    here, deterministically, from the same segments[] data the engine already
    computed: no new source, no hand-typed numbers.
    """
    segments_by_key = {s["key"]: s for s in data["segments"]}
    annual_by_year: dict[int, dict] = {}
    for seg_key, column in DIVISION_SEGMENT_MAP.items():
        seg = segments_by_key.get(seg_key)
        assert seg is not None, f"expected segment '{seg_key}' not found in engine output"
        for row in seg["annual"]:
            annual_by_year.setdefault(row["year"], {"year": row["year"]})
            annual_by_year[row["year"]][column] = row["count"]
    for row in data["incorporations"]["annual"]:
        yr = row["year"]
        if yr in annual_by_year:
            annual_by_year[yr]["union"] = row.get("union", 0)
    data["incorporations"]["annual_by_division"] = [annual_by_year[yr] for yr in sorted(annual_by_year)]


def main() -> None:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    _rebuild_annual_by_division(data)
    monthly = data["incorporations"]["monthly"]
    monthly_by_key = {row["month"]: int(row["union"]) for row in monthly}

    provisional = set(data["meta"]["provisional_months"])
    settled_through = data["meta"]["incorporations_settled_through"]

    # Three TTM snapshots: just before each reform, and the latest settled month.
    pre_2017_ttm, pre_2017_from, pre_2017_to = _ttm_ending(monthly_by_key, "2017-03")
    pre_2021_ttm, pre_2021_from, pre_2021_to = _ttm_ending(monthly_by_key, "2021-03")
    latest_ttm, latest_from, latest_to = _ttm_ending(monthly_by_key, settled_through)

    assert pre_2017_ttm is not None, "missing months for pre-2017 TTM window"
    assert pre_2021_ttm is not None, "missing months for pre-2021 TTM window"
    assert latest_ttm is not None, "missing months for latest TTM window"
    assert not (set([latest_from, latest_to]) & provisional), "latest TTM window touches provisional months"

    periods = [
        {
            "key": "pre_2017",
            "label": "12 months to Mar 2017 (before the public sector reform)",
            "from_month": pre_2017_from,
            "to_month": pre_2017_to,
            "ttm_union": pre_2017_ttm,
        },
        {
            "key": "pre_2021",
            "label": "12 months to Mar 2021 (before the private sector reform)",
            "from_month": pre_2021_from,
            "to_month": pre_2021_to,
            "ttm_union": pre_2021_ttm,
        },
        {
            "key": "latest",
            "label": f"12 months to {latest_to} (latest settled data)",
            "from_month": latest_from,
            "to_month": latest_to,
            "ttm_union": latest_ttm,
        },
    ]

    # Years elapsed between TTM windows (approximate, by month count / 12).
    def _years_between(a: str, b: str) -> float:
        ya, ma = (int(p) for p in a.split("-"))
        yb, mb = (int(p) for p in b.split("-"))
        return round(((yb * 12 + mb) - (ya * 12 + ma)) / 12, 2)

    years_public_era = _years_between(pre_2017_to, pre_2021_to)
    years_private_era = _years_between(pre_2021_to, latest_to)

    deltas = [
        {
            "from_period": "pre_2017",
            "to_period": "pre_2021",
            "label": "Public sector reform era (Apr 2017 to Apr 2021)",
            "years": years_public_era,
            "change_pct": round((pre_2021_ttm - pre_2017_ttm) / pre_2017_ttm * 100, 1),
            "cagr_pct": _cagr_pct(pre_2017_ttm, pre_2021_ttm, years_public_era),
        },
        {
            "from_period": "pre_2021",
            "to_period": "latest",
            "label": "Private sector reform era (Apr 2021 to latest)",
            "years": years_private_era,
            "change_pct": round((latest_ttm - pre_2021_ttm) / pre_2021_ttm * 100, 1),
            "cagr_pct": _cagr_pct(pre_2021_ttm, latest_ttm, years_private_era),
        },
    ]

    data["reform_overlay"] = {
        "generated_at": dt.date.today().isoformat(),
        "methodology": (
            "Derived from the same monthly union (all-contractor-SIC, deduplicated) "
            "incorporation series used elsewhere on this page: no new source. Each period is "
            "a trailing-12-month (TTM) sum of new company formations, sampled at the month "
            "immediately before each reform took effect (March 2017 and March 2021) and at "
            "the latest settled month. New-incorporation counts do not suffer survivorship "
            "bias (see meta.notes), so the run-rate comparison across reform eras is not "
            "distorted by dissolved companies dropping out of later snapshots."
        ),
        "reform_dates": REFORM_DATES,
        "periods": periods,
        "deltas": deltas,
        "hmrc_context": HMRC_CONTEXT,
    }

    # Self-check: every division column present for every year. (Divisions are raw
    # per-SIC-code sums, not deduplicated, so they legitimately sum to MORE than the
    # deduplicated "union" figure when a company registers SIC codes in more than one
    # division; that is not an error.)
    for row in data["incorporations"]["annual_by_division"]:
        for col in ("it", "consultancy", "engineering", "creative", "union"):
            assert col in row, f"annual_by_division {row['year']} missing '{col}'"

    DATA_PATH.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    print(f"[done] wrote reform_overlay + annual_by_division into {DATA_PATH}")
    print(f"  annual_by_division: {len(data['incorporations']['annual_by_division'])} years")
    for p in periods:
        print(f"  {p['key']}: {p['from_month']}..{p['to_month']} TTM union = {p['ttm_union']:,}")
    for d in deltas:
        print(f"  {d['from_period']} -> {d['to_period']}: {d['change_pct']:+.1f}% "
              f"(CAGR {d['cagr_pct']}% over {d['years']} yrs)")


if __name__ == "__main__":
    main()
