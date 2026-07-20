"""Companies House Advanced Search spine.

Lifted from ingest_construction_data.py (has the 404->0 guard the landlord
copy lacks). Generalized to iterate any NicheConfig's sic_labels + union.
"""
from __future__ import annotations

import calendar
import os
import time
from datetime import date
from typing import Any

import httpx

from .config import NicheConfig

CH_BASE = "https://api.company-information.service.gov.uk"
CH_KEY = os.getenv("COMPANIES_HOUSE_API_KEY", "")
CH_SLEEP_S = 0.6


def month_windows(n_months: int) -> list[dict[str, str]]:
    """Return the last `n_months` COMPLETE months (oldest first)."""
    today = date.today()
    y, m = today.year, today.month
    m -= 1
    if m == 0:
        y, m = y - 1, 12

    out: list[dict[str, str]] = []
    for _ in range(n_months):
        last_day = calendar.monthrange(y, m)[1]
        out.append(
            {
                "month": f"{y:04d}-{m:02d}",
                "frm": f"{y:04d}-{m:02d}-01",
                "to": f"{y:04d}-{m:02d}-{last_day:02d}",
            }
        )
        m -= 1
        if m == 0:
            y, m = y - 1, 12
    out.reverse()
    return out


def ch_hits(client: httpx.Client, sic_codes: str, frm: str, to: str) -> int:
    """Count companies incorporated in [frm, to] for the given SIC code(s).

    404 -> 0: CH returns 404 for SIC/date combos with zero companies (confirmed
    on rare civil-engineering codes in low-volume months).
    """
    params = {
        "sic_codes": sic_codes,
        "incorporated_from": frm,
        "incorporated_to": to,
        "size": "1",
    }
    for attempt in range(4):
        r = client.get(f"{CH_BASE}/advanced-search/companies", params=params)
        if r.status_code == 429:
            wait = 60 * (attempt + 1)
            print(f"    [rate-limit] sleeping {wait}s ...", flush=True)
            time.sleep(wait)
            continue
        if r.status_code == 404:
            return 0
        r.raise_for_status()
        return int(r.json().get("hits", 0) or 0)
    raise RuntimeError(f"CH rate-limited repeatedly for {sic_codes} {frm}..{to}")


def fetch_segmented_incorporations(
    cfg: NicheConfig,
    windows: list[dict[str, str]],
    cached_months: set[str] | None = None,
) -> list[dict[str, Any]]:
    """Per-SIC + union monthly counts for all SIC codes in cfg.sic_labels.

    cached_months: set of "YYYY-MM" strings already in cache that should be
    skipped (only the trailing provisional_months+1 window is always re-fetched).
    Returns rows suitable for both Supabase and snapshot assembly.
    """
    if not CH_KEY:
        raise RuntimeError("COMPANIES_HOUSE_API_KEY is not set in .env")

    all_sics = list(cfg.sic_labels.keys())
    # Months that must always be re-fetched (provisional tail)
    tail_months = {w["month"] for w in windows[-(cfg.provisional_months + 1):]}

    rows: list[dict[str, Any]] = []
    auth = (CH_KEY, "")
    with httpx.Client(auth=auth, timeout=30.0, headers={"Accept": "application/json"}) as client:
        for i, w in enumerate(windows, 1):
            month = w["month"]
            # Skip fully-cached settled months
            if cached_months and month not in tail_months and month in cached_months:
                continue

            per_sic: dict[str, int] = {}
            for sic in all_sics:
                cnt = ch_hits(client, sic, w["frm"], w["to"])
                per_sic[sic] = cnt
                rows.append(
                    {
                        "month": month,
                        "sic_code": sic,
                        "sic_label": cfg.sic_labels[sic],
                        "count": cnt,
                        "is_union": False,
                    }
                )
                time.sleep(CH_SLEEP_S)

            union = ch_hits(client, ",".join(all_sics), w["frm"], w["to"])
            rows.append(
                {
                    "month": month,
                    "sic_code": "union",
                    "sic_label": f"All {cfg.slug} companies (deduplicated)",
                    "count": union,
                    "is_union": True,
                }
            )
            time.sleep(CH_SLEEP_S)

            primary_sic = next((s.sic_codes[0] for s in cfg.segments if s.is_primary), all_sics[0])
            print(
                f"  [{i:3d}/{len(windows)}] {month}  "
                f"{primary_sic}={per_sic.get(primary_sic, 0):5d}  "
                f"union={union:6d}",
                flush=True,
            )
    return rows
