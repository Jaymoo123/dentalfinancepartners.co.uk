"""GA4 page-level ingestion for the optimisation engine.

Pulls daily (pagePath x date) metrics from GA4 Data API and upserts into
public.ga4_page_data. Idempotent: re-running the same day merges via UNIQUE.

Pre-processing decisions:
  * 2-day lag: GA4 has a 24-48h processing delay. Never query "today" or
    "yesterday" — partial data corrupts daily aggregations.
  * Path canonicalisation: strip query strings, drop URL fragments,
    normalise trailing slashes. GA4 records '/blog/foo', '/blog/foo/' and
    '/blog/foo?utm_source=x' as separate rows; we collapse them.
  * '(not set)' / '(other)' rows dropped at ingestion — GA4 bucket for
    cardinality limits or missing referrers; no analytical value.

Sites with GA4 access: dentists, property, medical, solicitors.
Agency + generalist intentionally excluded (no GA4 property granted yet).
"""
from __future__ import annotations

import argparse
import os
import re
import sys
from datetime import date, datetime, timedelta
from typing import Any
from urllib.parse import urlsplit

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.clients.ga4_client import run_report  # noqa: E402
from optimisation_engine.clients.ga4_config import GA4_PROPERTY_IDS  # noqa: E402
from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402


# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

# GA4 processing delay. Querying within this window gives partial data.
DATA_LAG_DAYS = 2

# Default lookback for a single ingestion run. The unique constraint on
# (site_key, page_path, date) means re-running with a larger window is a
# no-op for already-stored days, so we err on the side of catching any
# previously-missed days.
DEFAULT_LOOKBACK_DAYS = 30

# Rows to ask GA4 for per request. GA4 page-level reports cap at ~250k but
# our sites have <1000 unique pages so 5k is comfortable.
GA4_ROW_LIMIT = 5000

# Reject these GA4-internal dimension values at ingestion. They aren't real
# page paths and contaminate aggregates.
DROP_PATH_PREFIXES = ("(not set)", "(other)", "(none)")


# ---------------------------------------------------------------------------
# Normalisation
# ---------------------------------------------------------------------------


def normalize_page_path(raw: str) -> str | None:
    """Canonicalise a GA4 pagePath value.

    Returns None for paths that should be dropped (junk / GA4 internals).

    Rules:
      - Drop GA4 internal buckets: (not set), (other), (none)
      - Strip the query string and fragment
      - If path is empty after stripping, treat as "/"
      - Lowercase the path (we don't have case-sensitive routing)
      - Remove trailing slash except for the root "/"
      - Drop paths longer than 500 chars (almost certainly garbage)
    """
    if raw is None:
        return None
    s = raw.strip()
    if not s:
        return "/"
    if s.startswith(DROP_PATH_PREFIXES):
        return None

    # GA4 returns either a path or a full URL — handle both
    if s.startswith("http://") or s.startswith("https://"):
        parts = urlsplit(s)
        s = parts.path or "/"
    else:
        # path-only — strip query + fragment manually
        s = s.split("?", 1)[0].split("#", 1)[0]

    if not s:
        s = "/"
    if not s.startswith("/"):
        s = "/" + s

    s = s.lower()

    # Collapse repeated slashes
    s = re.sub(r"/{2,}", "/", s)

    # Remove trailing slash except for root
    if len(s) > 1 and s.endswith("/"):
        s = s.rstrip("/")

    if len(s) > 500:
        return None

    return s


def aggregate_normalised_rows(raw_rows: list[dict]) -> list[dict]:
    """After path normalisation, two GA4 rows (e.g. '/foo' and '/foo/') may
    collapse to the same path. Sum their metric values.
    """
    agg: dict[tuple[str, str], dict[str, Any]] = {}
    for row in raw_rows:
        path = normalize_page_path(row.get("pagePath"))
        if path is None:
            continue
        ga4_date = row.get("date")  # YYYYMMDD format from GA4
        if not ga4_date or len(ga4_date) != 8:
            continue
        # Convert YYYYMMDD -> YYYY-MM-DD for Postgres DATE
        iso_date = f"{ga4_date[:4]}-{ga4_date[4:6]}-{ga4_date[6:8]}"
        key = (path, iso_date)

        existing = agg.get(key)
        if existing is None:
            existing = {
                "page_path": path,
                "date": iso_date,
                "active_users": 0,
                "sessions": 0,
                "screen_page_views": 0,
                "engaged_sessions": 0,
                "engagement_rate_weighted_sum": 0.0,
                "engagement_rate_sessions": 0,
                "average_session_duration_weighted_sum": 0.0,
                "average_session_duration_sessions": 0,
                "user_engagement_duration": 0.0,
                "bounce_rate_weighted_sum": 0.0,
                "bounce_rate_sessions": 0,
                "event_count": 0,
                "conversions": 0,
            }
            agg[key] = existing

        sessions = int(float(row.get("sessions", 0) or 0))
        existing["active_users"] += int(float(row.get("activeUsers", 0) or 0))
        existing["sessions"] += sessions
        existing["screen_page_views"] += int(float(row.get("screenPageViews", 0) or 0))
        existing["engaged_sessions"] += int(float(row.get("engagedSessions", 0) or 0))
        existing["event_count"] += int(float(row.get("eventCount", 0) or 0))
        existing["conversions"] += int(float(row.get("conversions", 0) or 0))
        existing["user_engagement_duration"] += float(row.get("userEngagementDuration", 0) or 0)

        # Weighted averages: engagementRate, averageSessionDuration, bounceRate
        # are session-weighted in GA4 reports.
        try:
            er = float(row.get("engagementRate", 0) or 0)
            existing["engagement_rate_weighted_sum"] += er * sessions
            existing["engagement_rate_sessions"] += sessions
        except (TypeError, ValueError):
            pass
        try:
            asd = float(row.get("averageSessionDuration", 0) or 0)
            existing["average_session_duration_weighted_sum"] += asd * sessions
            existing["average_session_duration_sessions"] += sessions
        except (TypeError, ValueError):
            pass
        try:
            br = float(row.get("bounceRate", 0) or 0)
            existing["bounce_rate_weighted_sum"] += br * sessions
            existing["bounce_rate_sessions"] += sessions
        except (TypeError, ValueError):
            pass

    # Materialise: compute weighted averages, drop sum-helpers
    out: list[dict] = []
    for row in agg.values():
        sessions = row["sessions"]
        engagement_rate = (
            row["engagement_rate_weighted_sum"] / row["engagement_rate_sessions"]
            if row["engagement_rate_sessions"] > 0 else None
        )
        avg_session_duration = (
            row["average_session_duration_weighted_sum"] / row["average_session_duration_sessions"]
            if row["average_session_duration_sessions"] > 0 else None
        )
        bounce_rate = (
            row["bounce_rate_weighted_sum"] / row["bounce_rate_sessions"]
            if row["bounce_rate_sessions"] > 0 else None
        )
        out.append({
            "page_path": row["page_path"],
            "date": row["date"],
            "active_users": row["active_users"],
            "sessions": row["sessions"],
            "screen_page_views": row["screen_page_views"],
            "engaged_sessions": row["engaged_sessions"],
            "engagement_rate": round(engagement_rate, 4) if engagement_rate is not None else None,
            "average_session_duration": round(avg_session_duration, 2) if avg_session_duration is not None else None,
            "user_engagement_duration": round(row["user_engagement_duration"], 2),
            "bounce_rate": round(bounce_rate, 4) if bounce_rate is not None else None,
            "event_count": row["event_count"],
            "conversions": row["conversions"],
        })
    return out


# ---------------------------------------------------------------------------
# Ingestion
# ---------------------------------------------------------------------------


def fetch_site_window(site_key: str, days: int) -> list[dict]:
    """Fetch GA4 page-level rows for `site_key` across a window that ends
    DATA_LAG_DAYS days ago and starts (days + DATA_LAG_DAYS) days ago.
    """
    start = f"{days + DATA_LAG_DAYS}daysAgo"
    end = f"{DATA_LAG_DAYS}daysAgo"
    result = run_report(
        site_key=site_key,
        metrics=[
            "activeUsers",
            "sessions",
            "screenPageViews",
            "engagedSessions",
            "engagementRate",
            "averageSessionDuration",
            "userEngagementDuration",
            "bounceRate",
            "eventCount",
            "conversions",
        ],
        dimensions=["pagePath", "date"],
        date_ranges=[(start, end)],
        limit=GA4_ROW_LIMIT,
    )
    return result.get("rows", []) or []


def upsert_rows(site_key: str, normalised_rows: list[dict]) -> int:
    """Bulk upsert into ga4_page_data. Returns inserted+updated count."""
    if not normalised_rows:
        return 0
    url = f"{SUPABASE_URL}/rest/v1/ga4_page_data"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,return=minimal",
    }
    payload = [{**row, "site_key": site_key} for row in normalised_rows]

    total = 0
    chunk_size = 500
    for i in range(0, len(payload), chunk_size):
        chunk = payload[i:i + chunk_size]
        r = httpx.post(
            url,
            headers=headers,
            params={"on_conflict": "site_key,page_path,date"},
            json=chunk,
            timeout=30.0,
        )
        if r.status_code >= 400:
            raise RuntimeError(
                f"GA4 upsert failed for {site_key} chunk {i}-{i + len(chunk)}: "
                f"{r.status_code} {r.text[:300]}"
            )
        total += len(chunk)
    return total


def ingest_site(site_key: str, days: int = DEFAULT_LOOKBACK_DAYS) -> dict[str, Any]:
    """Pull, normalise, and upsert GA4 data for one site."""
    raw = fetch_site_window(site_key, days=days)
    normalised = aggregate_normalised_rows(raw)
    upserted = upsert_rows(site_key, normalised)
    return {
        "site_key": site_key,
        "raw_rows": len(raw),
        "normalised_rows": len(normalised),
        "upserted": upserted,
        "window": f"{days + DATA_LAG_DAYS}d to {DATA_LAG_DAYS}d ago",
    }


def run(site_keys: list[str] | None = None, days: int = DEFAULT_LOOKBACK_DAYS) -> dict[str, dict]:
    """Ingest GA4 data for all (or a subset of) GA4-enabled sites."""
    if site_keys is None:
        site_keys = list(GA4_PROPERTY_IDS.keys())

    results: dict[str, dict] = {}
    for site_key in site_keys:
        if site_key not in GA4_PROPERTY_IDS:
            print(f"[SKIP] {site_key}: no GA4 property configured")
            results[site_key] = {"site_key": site_key, "skipped": "no_property"}
            continue
        print(f"\n=== GA4 ingestion: {site_key} ===")
        try:
            result = ingest_site(site_key, days=days)
            print(
                f"  raw={result['raw_rows']:5d}  normalised={result['normalised_rows']:5d}  "
                f"upserted={result['upserted']:5d}  window={result['window']}"
            )
            results[site_key] = result
        except Exception as exc:
            print(f"[ERROR] {site_key}: {type(exc).__name__}: {exc}")
            results[site_key] = {"site_key": site_key, "error": str(exc)}
    return results


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("site_keys", nargs="*", help="One or more site_keys; default = all 4 with GA4 access")
    parser.add_argument("--days", type=int, default=DEFAULT_LOOKBACK_DAYS,
                        help=f"Lookback days (default {DEFAULT_LOOKBACK_DAYS}, lags {DATA_LAG_DAYS}d behind real-time)")
    args = parser.parse_args()

    results = run(args.site_keys or None, days=args.days)
    print("\n=== Summary ===")
    for site_key, result in results.items():
        if "error" in result:
            print(f"  {site_key:11s} ERROR: {result['error']}")
        elif "skipped" in result:
            print(f"  {site_key:11s} SKIPPED ({result['skipped']})")
        else:
            print(f"  {site_key:11s} {result['upserted']} rows upserted")


if __name__ == "__main__":
    main()
