"""
Site health snapshot module.

Queries Supabase for all 6-tab payloads, runs URL Inspection for
underperformers, and writes everything to a Google Sheet.

Usage:
    python -m optimisation_engine.snapshot --site property
"""
from __future__ import annotations

from .auth import get_credentials
from .collector import (
    collect_changelog,
    collect_diagnostics_candidates,
    collect_leads,
    collect_overview,
    collect_overview_history,
    collect_pages,
    collect_queries,
    upsert_weekly_snapshot,
)
from .diagnostics import enrich_diagnostics
from .sheets_exporter import export_to_sheets


def run_snapshot(site_key: str) -> str:
    """Run the full snapshot for a site. Returns the Sheets URL."""
    print(f"\n{'='*80}")
    print(f"[Snapshot] Site: {site_key}")
    print(f"{'='*80}")

    creds = get_credentials()

    print("  Collecting overview...")
    overview = collect_overview(site_key)

    print("  Collecting pages...")
    pages = collect_pages(site_key)

    print("  Collecting queries...")
    queries = collect_queries(site_key)

    print("  Collecting leads...")
    leads = collect_leads(site_key)

    print("  Collecting changelog...")
    changelog = collect_changelog(site_key)

    print("  Identifying underperformers...")
    candidates = collect_diagnostics_candidates(site_key)

    print(f"  Running URL Inspection API for {len(candidates)} candidates...")
    diagnostics = enrich_diagnostics(site_key, candidates, creds)

    print("  Persisting weekly snapshot to Supabase...")
    upsert_weekly_snapshot(overview)

    print("  Loading full overview history from Supabase...")
    overview_history = collect_overview_history(site_key)

    print("  Exporting to Google Sheets...")
    url = export_to_sheets(
        site_key=site_key,
        credentials=creds,
        overview_history=overview_history,
        pages=pages,
        queries=queries,
        leads=leads,
        changelog=changelog,
        diagnostics=diagnostics,
    )

    print(f"\n[Snapshot] Done. Sheet: {url}")
    return url
