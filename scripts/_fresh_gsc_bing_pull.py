"""
Fresh GSC + Bing pull for all sites (2026-07-19).
- GSC: date-only dimensions (no query/page) to get unsampled totals
- Bing: per-site aggregates
- Leads: schema + sample row verification (extras.site_key)
"""
from __future__ import annotations

import os
import sys
import json
from datetime import date, timedelta

sys.path.insert(0, r"C:\Users\user\Documents\Accounting")

from optimisation_engine.config import get_sites
from optimisation_engine.clients.gsc_query_client import GSCQueryFetcher
from optimisation_engine.clients.bing_query_client import BingQueryFetcher

try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"))
except ImportError:
    pass

import httpx

SUPABASE_ACCESS_TOKEN = os.getenv("SUPABASE_ACCESS_TOKEN", "")
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
MGMT_URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"


def query_db(sql: str) -> dict:
    """Run a SELECT query via Supabase Management API."""
    r = httpx.post(
        MGMT_URL,
        headers={"Authorization": f"Bearer {SUPABASE_ACCESS_TOKEN}", "Content-Type": "application/json"},
        json={"query": sql},
        timeout=60.0,
    )
    r.raise_for_status()
    return r.json()


def gsc_date_only_totals(site_key: str, days: int = 28) -> dict | None:
    """Fetch GSC data with ONLY date dimension (no query/page).
    
    Returns per-site total clicks + impressions for the window.
    """
    try:
        fetcher = GSCQueryFetcher(site_key)
    except Exception as exc:
        print(f"[GSC] {site_key} INIT ERROR: {exc}")
        return None

    end_date = date.today()
    start_date = end_date - timedelta(days=days)

    body = {
        "startDate": start_date.strftime("%Y-%m-%d"),
        "endDate": end_date.strftime("%Y-%m-%d"),
        "dimensions": ["date"],  # DATE ONLY (unsampled)
        "rowLimit": 10000,
    }

    try:
        response = (
            fetcher.gsc_client.service.searchanalytics()
            .query(siteUrl=fetcher.site["gsc_property_url"], body=body)
            .execute()
        )
    except Exception as exc:
        print(f"[GSC] {site_key} API ERROR: {exc}")
        return None

    rows = response.get("rows", [])
    if not rows:
        print(f"[GSC] {site_key} no data returned")
        return None

    total_clicks = sum(r.get("clicks", 0) for r in rows)
    total_impressions = sum(r.get("impressions", 0) for r in rows)

    return {
        "site_key": site_key,
        "gsc_property": fetcher.site["gsc_property_url"],
        "days": days,
        "window": f"{start_date} to {end_date}",
        "total_clicks": total_clicks,
        "total_impressions": total_impressions,
        "row_count": len(rows),
    }


def bing_site_totals(site_key: str) -> dict | None:
    """Fetch Bing aggregated clicks (per site, no per-query breakdown)."""
    try:
        fetcher = BingQueryFetcher(site_key)
        site_url = fetcher._resolve_site_url()
    except Exception as exc:
        print(f"[BING] {site_key} INIT/RESOLVE ERROR: {exc}")
        return None

    try:
        stats = fetcher.client.get_query_stats(site_url)
    except Exception as exc:
        print(f"[BING] {site_key} GetQueryStats ERROR: {exc}")
        return None

    if not stats:
        print(f"[BING] {site_key} no query stats returned")
        return None

    total_clicks = sum(s.get("Clicks", 0) for s in stats)
    total_impressions = sum(s.get("Impressions", 0) for s in stats)

    return {
        "site_key": site_key,
        "bing_site": site_url,
        "total_clicks": total_clicks,
        "total_impressions": total_impressions,
        "query_count": len(stats),
    }


def check_leads_schema() -> dict:
    """Check leads table schema + sample a row with extras."""
    # Get schema
    schema_sql = """
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'leads'
        ORDER BY ordinal_position
    """
    try:
        schema_result = query_db(schema_sql)
        columns = schema_result.get("results", [])
    except Exception as exc:
        print(f"[LEADS] schema query failed: {exc}")
        columns = []

    # Sample a row with extras (limit 1)
    sample_sql = """
        SELECT 
            id, created_at, email, phone, extras, site_key
        FROM public.leads
        WHERE extras IS NOT NULL
        LIMIT 1
    """
    try:
        sample_result = query_db(sample_sql)
        samples = sample_result.get("results", [])
        sample = samples[0] if samples else None
    except Exception as exc:
        print(f"[LEADS] sample query failed: {exc}")
        sample = None

    return {
        "columns": columns,
        "sample_with_extras": sample,
    }


def main() -> None:
    print(f"\n{'='*80}")
    print(f"FRESH GSC + BING PULL (2026-07-19)")
    print(f"{'='*80}\n")

    # Get all sites
    sites = get_sites(active_only=False)
    site_keys = [s["site_key"] for s in sorted(sites, key=lambda x: x["site_key"])]

    print(f"[PULL] sites to fetch: {len(site_keys)}")
    print(f"       {', '.join(site_keys)}\n")

    # GSC pulls
    print("[GSC] Pulling 28-day date-only totals (unsampled)...\n")
    gsc_results = {}
    for sk in site_keys:
        result = gsc_date_only_totals(sk, days=28)
        if result:
            gsc_results[sk] = result
            print(f"[GSC] {sk:25} clicks={result['total_clicks']:6d}  impressions={result['total_impressions']:8d}")
        else:
            gsc_results[sk] = None

    # Bing pulls
    print("\n[BING] Pulling per-site aggregates...\n")
    bing_results = {}
    for sk in site_keys:
        result = bing_site_totals(sk)
        if result:
            bing_results[sk] = result
            print(f"[BING] {sk:25} clicks={result['total_clicks']:6d}  impressions={result['total_impressions']:8d}")
        else:
            bing_results[sk] = None

    # Leads table schema
    print("\n[LEADS] Checking schema + extras field...\n")
    leads_info = check_leads_schema()

    # Final report
    print(f"\n{'='*80}")
    print("RESULTS SUMMARY")
    print(f"{'='*80}\n")

    print("[GSC RESULTS]")
    print(json.dumps(
        {k: v for k, v in gsc_results.items() if v},
        indent=2,
        default=str
    ))

    print("\n[BING RESULTS]")
    print(json.dumps(
        {k: v for k, v in bing_results.items() if v},
        indent=2,
        default=str
    ))

    print("\n[LEADS TABLE SCHEMA]")
    print(json.dumps(
        leads_info["columns"],
        indent=2,
        default=str
    ))

    print("\n[LEADS SAMPLE WITH EXTRAS]")
    if leads_info["sample_with_extras"]:
        sample = leads_info["sample_with_extras"].copy()
        # Redact PII
        if sample.get("email"):
            sample["email"] = "***@***.***"
        if sample.get("phone"):
            sample["phone"] = "***"
        print(json.dumps(sample, indent=2, default=str))
    else:
        print("(no rows with extras field populated)")

    # Summary table
    print(f"\n{'='*80}")
    print("GOOGLE SEARCH CONSOLE: 28-Day Totals (Fresh Pull)")
    print(f"{'='*80}")
    print(f"{'Site Key':<25} {'Clicks':>12} {'Impressions':>12} {'Source':<15}")
    print("-" * 70)
    for sk in site_keys:
        if gsc_results[sk]:
            r = gsc_results[sk]
            print(f"{sk:<25} {r['total_clicks']:>12} {r['total_impressions']:>12} GSC API")
        else:
            print(f"{sk:<25} {'ERROR':>12} {'ERROR':>12} GSC API")

    print(f"\n{'='*80}")
    print("BING WEBMASTER TOOLS: Per-Site Aggregates (Fresh Pull)")
    print(f"{'='*80}")
    print(f"{'Site Key':<25} {'Clicks':>12} {'Impressions':>12} {'Source':<15}")
    print("-" * 70)
    for sk in site_keys:
        if bing_results[sk]:
            r = bing_results[sk]
            print(f"{sk:<25} {r['total_clicks']:>12} {r['total_impressions']:>12} Bing API")
        else:
            print(f"{sk:<25} {'ERROR':>12} {'ERROR':>12} Bing API")

    print(f"\n{'='*80}\n")


if __name__ == "__main__":
    main()
