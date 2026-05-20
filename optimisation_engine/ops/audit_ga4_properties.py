"""Audit each GA4 property's configuration before the optimisation engine
trusts its data.

Checks per property:
  - Property accessible with current OAuth credentials
  - Timezone (must be Europe/London for UK sites; off-by-N-hours daily buckets)
  - Currency (informational; should be GBP)
  - Configured conversion events (CRITICAL — if none configured,
    optimisation_engine's GA4-conversion signal is meaningless)
  - Recent traffic (last 14 days sessions, page views)

Run before the first weekly ingestion run goes live. Re-run any time a
property's config changes.

Usage:
  python -m optimisation_engine.ops.audit_ga4_properties
  python -m optimisation_engine.ops.audit_ga4_properties --site dentists
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.clients.ga4_config import GA4_PROPERTY_IDS, get_property_id
from optimisation_engine.clients.ga4_client import _load_credentials, run_report


def fetch_property_metadata(property_id: str) -> dict[str, Any]:
    """Get timezone, currency, account name etc. via Admin API."""
    from google.analytics.admin_v1beta import AnalyticsAdminServiceClient

    creds = _load_credentials()
    client = AnalyticsAdminServiceClient(credentials=creds)
    prop = client.get_property(name=f"properties/{property_id}")
    return {
        "property_id": property_id,
        "display_name": prop.display_name,
        "time_zone": prop.time_zone,
        "currency_code": prop.currency_code,
        "create_time": prop.create_time.isoformat() if prop.create_time else None,
        "industry_category": str(prop.industry_category) if prop.industry_category else None,
    }


def fetch_conversion_events(property_id: str) -> list[dict[str, Any]]:
    """List events marked as conversions in this property."""
    from google.analytics.admin_v1beta import AnalyticsAdminServiceClient
    from google.analytics.admin_v1beta.types import ListConversionEventsRequest

    creds = _load_credentials()
    client = AnalyticsAdminServiceClient(credentials=creds)
    req = ListConversionEventsRequest(parent=f"properties/{property_id}")
    out: list[dict[str, Any]] = []
    for ev in client.list_conversion_events(req):
        out.append({
            "event_name": ev.event_name,
            "deletable": ev.deletable,
            "custom": ev.custom,
            "counting_method": str(ev.counting_method) if ev.counting_method else None,
        })
    return out


def quick_traffic_snapshot(site_key: str) -> dict[str, Any]:
    """Sessions, users, page views for the last 14 days (after 2-day lag)."""
    result = run_report(
        site_key=site_key,
        metrics=["activeUsers", "sessions", "screenPageViews", "engagedSessions", "conversions"],
        dimensions=[],
        date_ranges=[("16daysAgo", "2daysAgo")],
        limit=1,
    )
    if not result["rows"]:
        return {"sessions": 0, "active_users": 0, "page_views": 0, "engaged_sessions": 0, "conversions": 0}
    r = result["rows"][0]
    return {
        "sessions": int(r.get("sessions", 0) or 0),
        "active_users": int(r.get("activeUsers", 0) or 0),
        "page_views": int(r.get("screenPageViews", 0) or 0),
        "engaged_sessions": int(r.get("engagedSessions", 0) or 0),
        "conversions": int(r.get("conversions", 0) or 0),
    }


def audit_one(site_key: str) -> dict[str, Any]:
    property_id = get_property_id(site_key)
    out: dict[str, Any] = {"site_key": site_key, "property_id": property_id, "issues": []}

    try:
        meta = fetch_property_metadata(property_id)
        out["metadata"] = meta
        if meta["time_zone"] != "Europe/London":
            out["issues"].append(
                f"Timezone is {meta['time_zone']}; expected Europe/London. Daily "
                "buckets will be off-by-hours until corrected in GA4 Admin -> Property Settings."
            )
        if meta["currency_code"] not in {"GBP", "GBP "}:
            out["issues"].append(f"Currency is {meta['currency_code']!r}; expected GBP (informational, not blocking).")
    except Exception as exc:
        out["issues"].append(f"Property metadata fetch failed: {exc}")
        return out

    try:
        events = fetch_conversion_events(property_id)
        out["conversion_events"] = events
        if not events:
            out["issues"].append(
                "NO conversion events configured. Per-page conversion signal will "
                "always be 0 until lead-form submission is marked as a conversion in GA4 Admin -> Events."
            )
    except Exception as exc:
        out["issues"].append(f"Conversion events fetch failed: {exc}")

    try:
        traffic = quick_traffic_snapshot(site_key)
        out["recent_traffic"] = traffic
        if traffic["sessions"] < 50:
            out["issues"].append(
                f"Only {traffic['sessions']} sessions in last 14d (after 2d lag). "
                "Engagement detectors won't have statistical floor; thresholds will rarely fire."
            )
    except Exception as exc:
        out["issues"].append(f"Recent traffic fetch failed: {exc}")

    return out


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--site", default=None, help="Single site; default: all 4 with GA4 access")
    args = parser.parse_args()

    sites = [args.site] if args.site else list(GA4_PROPERTY_IDS.keys())

    print("=" * 80)
    print("GA4 PROPERTY AUDIT")
    print("=" * 80)
    overall_issue_count = 0
    for site in sites:
        print(f"\n--- {site} ---")
        report = audit_one(site)
        meta = report.get("metadata", {})
        if meta:
            print(f"  property_id : {report['property_id']}")
            print(f"  display     : {meta.get('display_name', '?')}")
            print(f"  timezone    : {meta.get('time_zone', '?')}")
            print(f"  currency    : {meta.get('currency_code', '?')}")
        events = report.get("conversion_events")
        if events is not None:
            if events:
                names = ", ".join(sorted({e['event_name'] for e in events}))
                print(f"  conversions : {len(events)} event(s) configured ({names})")
            else:
                print(f"  conversions : NONE — page-level conversion signal will be 0")
        traffic = report.get("recent_traffic", {})
        if traffic:
            print(
                f"  traffic 14d : sessions={traffic.get('sessions', 0):,} "
                f"users={traffic.get('active_users', 0):,} "
                f"views={traffic.get('page_views', 0):,} "
                f"conv={traffic.get('conversions', 0)}"
            )
        if report["issues"]:
            print(f"  ISSUES:")
            for issue in report["issues"]:
                print(f"    - {issue}")
                overall_issue_count += 1
        else:
            print("  [OK] no issues")

    print("\n" + "=" * 80)
    print(f"Audit complete. {overall_issue_count} issue(s) across {len(sites)} site(s).")
    print("=" * 80)
    if overall_issue_count > 0:
        sys.exit(1)


if __name__ == "__main__":
    main()
