"""30-day Supabase cache for Companies House SIC counts.

Mirrors the _cache_lookup/_cache_insert/_headers pattern from research_synthesizer.
Table: ch_sic_counts_cache(site_key, sic_key, month, count, is_union, fetched_at)

Only re-fetches months absent from cache + the trailing provisional_months+1
months (historical months are immutable once indexed).
"""
from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any

import httpx

from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL

CACHE_TTL_DAYS = 30


def _headers() -> dict[str, str]:
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    }


def cache_lookup(site_key: str) -> list[dict[str, Any]]:
    """Return all cached rows for this site newer than CACHE_TTL_DAYS."""
    fresh_since = (datetime.now(timezone.utc) - timedelta(days=CACHE_TTL_DAYS)).isoformat()
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/ch_sic_counts_cache",
        headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"},
        params={
            "select": "*",
            "site_key": f"eq.{site_key}",
            "fetched_at": f"gte.{fresh_since}",
        },
        timeout=15.0,
    )
    return r.json() if r.status_code < 300 else []


def cache_insert(site_key: str, rows: list[dict[str, Any]]) -> None:
    """Upsert rows into ch_sic_counts_cache."""
    if not rows:
        return
    payload = [
        {
            "site_key": site_key,
            "sic_key": row["sic_code"],
            "month": row["month"],
            "count": row["count"],
            "is_union": row["is_union"],
            "fetched_at": datetime.now(timezone.utc).isoformat(),
        }
        for row in rows
    ]
    for i in range(0, len(payload), 500):
        httpx.post(
            f"{SUPABASE_URL}/rest/v1/ch_sic_counts_cache",
            headers={**_headers(), "Prefer": "resolution=merge-duplicates,return=minimal"},
            params={"on_conflict": "site_key,sic_key,month"},
            json=payload[i : i + 500],
            timeout=30.0,
        )


def cached_months_set(cached_rows: list[dict[str, Any]]) -> set[str]:
    """Return set of months fully covered by the cache (all SIC codes present)."""
    # ponytail: just return all months seen; engine skips months in this set
    return {r["month"] for r in cached_rows}


def rows_from_cache(cached_rows: list[dict[str, Any]], sic_labels: dict[str, str]) -> list[dict[str, Any]]:
    """Convert cache rows back to the shape fetch_segmented_incorporations returns."""
    return [
        {
            "month": r["month"],
            "sic_code": r["sic_key"],
            "sic_label": sic_labels.get(r["sic_key"], r["sic_key"]),
            "count": r["count"],
            "is_union": r["is_union"],
        }
        for r in cached_rows
    ]
