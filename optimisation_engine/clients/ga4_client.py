"""GA4 Data API client.

Auth via OAuth Desktop app (because the org policy blocks service-account
key creation). Credentials cycle:

  1. First run: opens browser for user consent. The token JSON is then
     written to secrets/ga4_token.json.
  2. Subsequent runs: reads the token JSON, refreshes silently when needed.

The OAuth client secrets live at secrets/ga4_oauth_client.json. Add new
sites by adding to optimisation_engine.clients.ga4_config.GA4_PROPERTY_IDS.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
SECRETS = ROOT / "secrets"
OAUTH_CLIENT_FILE = SECRETS / "ga4_oauth_client.json"
TOKEN_FILE = SECRETS / "ga4_token.json"

SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"]


def _load_credentials():
    """Return google.oauth2.credentials.Credentials, refreshing as needed.

    On first call (no token.json), opens a browser for one-time consent
    and saves the resulting token to disk for future runs.
    """
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow

    creds = None
    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_FILE), SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not OAUTH_CLIENT_FILE.exists():
                raise FileNotFoundError(
                    f"Missing OAuth client secrets at {OAUTH_CLIENT_FILE}. "
                    f"Download from GCP Console → Credentials → your OAuth Desktop client."
                )
            flow = InstalledAppFlow.from_client_secrets_file(
                str(OAUTH_CLIENT_FILE), SCOPES
            )
            print("Opening browser for one-time OAuth consent...")
            print("If the browser doesn't open, the script will print a URL — copy it manually.")
            creds = flow.run_local_server(port=0)
        TOKEN_FILE.parent.mkdir(parents=True, exist_ok=True)
        TOKEN_FILE.write_text(creds.to_json(), encoding="utf-8")
        print(f"Saved refresh token to {TOKEN_FILE}")

    return creds


def get_client():
    """Return a GA4 BetaAnalyticsDataClient ready to make API calls."""
    from google.analytics.data_v1beta import BetaAnalyticsDataClient

    creds = _load_credentials()
    return BetaAnalyticsDataClient(credentials=creds)


def run_report(
    site_key: str,
    metrics: list[str],
    dimensions: list[str] | None = None,
    date_ranges: list[tuple[str, str]] | None = None,
    limit: int = 100,
) -> dict[str, Any]:
    """Run a GA4 report for a site.

    Args:
        site_key: one of "dentists", "property", "medical", "solicitors"
        metrics: e.g. ["activeUsers", "sessions"]
        dimensions: e.g. ["date", "pagePath"]
        date_ranges: list of (start_date, end_date) tuples in YYYY-MM-DD or
                     relative ("7daysAgo", "today")
        limit: rows to return

    Returns dict with: rows[], dimension_headers[], metric_headers[]
    """
    from google.analytics.data_v1beta.types import (
        DateRange, Dimension, Metric, RunReportRequest,
    )

    from optimisation_engine.clients.ga4_config import get_property_id

    property_id = get_property_id(site_key)
    client = get_client()

    if date_ranges is None:
        date_ranges = [("7daysAgo", "today")]
    if dimensions is None:
        dimensions = []

    req = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[DateRange(start_date=s, end_date=e) for s, e in date_ranges],
        dimensions=[Dimension(name=d) for d in dimensions],
        metrics=[Metric(name=m) for m in metrics],
        limit=limit,
    )

    resp = client.run_report(req)
    return {
        "site_key": site_key,
        "property_id": property_id,
        "dimension_headers": [h.name for h in resp.dimension_headers],
        "metric_headers": [h.name for h in resp.metric_headers],
        "rows": [
            {
                **{h.name: r.dimension_values[i].value for i, h in enumerate(resp.dimension_headers)},
                **{h.name: r.metric_values[i].value for i, h in enumerate(resp.metric_headers)},
            }
            for r in resp.rows
        ],
        "row_count": resp.row_count,
    }


def main() -> None:
    """CLI: bootstrap auth + run a tiny smoke-test report against each site."""
    import argparse

    p = argparse.ArgumentParser(description="GA4 auth bootstrap + smoke test")
    p.add_argument("--site", default=None, help="Single site to test; default: all 4")
    p.add_argument("--days", type=int, default=7, help="Days back to query")
    args = p.parse_args()

    from optimisation_engine.clients.ga4_config import GA4_PROPERTY_IDS

    print("Bootstrapping GA4 OAuth credentials (browser may open)...")
    _load_credentials()
    print("[OK] credentials ready.\n")

    sites = [args.site] if args.site else list(GA4_PROPERTY_IDS.keys())
    for site in sites:
        try:
            result = run_report(
                site_key=site,
                metrics=["activeUsers", "sessions", "screenPageViews"],
                dimensions=[],
                date_ranges=[(f"{args.days}daysAgo", "today")],
                limit=1,
            )
            if result["rows"]:
                r = result["rows"][0]
                print(f"[OK] {site:<12} (property {result['property_id']}): "
                      f"users={r.get('activeUsers')}, sessions={r.get('sessions')}, "
                      f"pageviews={r.get('screenPageViews')} (last {args.days}d)")
            else:
                print(f"[OK] {site:<12} (property {result['property_id']}): "
                      f"no data in last {args.days}d")
        except Exception as e:
            print(f"[FAIL] {site:<12}: {type(e).__name__}: {e}")


if __name__ == "__main__":
    main()
