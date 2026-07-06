"""
Diagnostics module: URL Inspection API + rule-based diagnosis for Tab 6.

Checks the gsc_url_inspection cache first (skip pages checked < 7 days ago).
Only calls the API for stale/uncached pages. Max ~30 API calls per run,
well within the 2,000/day quota.
"""
from __future__ import annotations

import json
import os
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

import httpx

ROOT = Path(__file__).resolve().parents[2]

try:
    from dotenv import load_dotenv
    load_dotenv(ROOT / ".env")
except ImportError:
    pass

SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
CACHE_STALENESS_DAYS = 7
MAX_INSPECTION_CALLS = 30


# ---------------------------------------------------------------------------
# Diagnosis rules
# ---------------------------------------------------------------------------

def _diagnose(row: dict, inspection: dict | None) -> tuple[str, str]:
    """Return (diagnosis, suggested_action) from signals."""
    flags: list[str] = row.get("flag_reasons") or []
    index_status = (inspection or {}).get("index_status", "Unknown")
    canonical_google = (inspection or {}).get("canonical_google", "")
    canonical_declared = (inspection or {}).get("canonical_declared", "")
    mobile_issues: list[str] = (inspection or {}).get("mobile_issues") or []

    # Indexing problems take priority
    if index_status in ("Crawled - currently not indexed", "Discovered - currently not indexed", "Not indexed"):
        return (
            "Google can't index this page. Check robots.txt, noindex tags, or canonical.",
            "Check robots.txt / noindex",
        )

    if canonical_google and canonical_declared and canonical_google != canonical_declared:
        return (
            f"Canonicalised away — Google thinks canonical is {canonical_google}.",
            "Fix canonical",
        )

    if mobile_issues:
        return (
            f"Mobile usability problems: {'; '.join(mobile_issues[:3])}.",
            "Review mobile",
        )

    if "position_drop_5" in flags and index_status in ("Indexed", "Unknown"):
        return (
            "Ranking decline. Likely content freshness or competitor displacement.",
            "Update content",
        )

    if "high_imp_low_ctr" in flags:
        return (
            "High impressions, low CTR. Title or meta description not earning clicks.",
            "Rewrite title/meta",
        )

    if "poor_engagement" in flags:
        return (
            "Good traffic volume but low engagement. Content may not match search intent.",
            "Improve content quality",
        )

    if "imp_drop_20pct" in flags:
        return (
            "Impressions collapsing. Possible ranking drop, cannibalisation, or deindex.",
            "Investigate competitor",
        )

    return ("No clear signal. Review manually.", "Manual review")


# ---------------------------------------------------------------------------
# URL Inspection API
# ---------------------------------------------------------------------------

def _gsc_site_url_for(site_key: str) -> str:
    """Map site_key to sc-domain: property."""
    mapping = {
        "property":  "sc-domain:propertytaxpartners.co.uk",
        "dentists":  "sc-domain:dentistaccountants.co.uk",
        "medical":   "sc-domain:medicalaccounts.co.uk",
        "solicitors": "sc-domain:solicitoraccountants.co.uk",
        "agency":    "sc-domain:agencyfounderfinance.co.uk",
        "generalist": "sc-domain:hollowaydavies.co.uk",
    }
    return mapping.get(site_key, f"sc-domain:{site_key}.co.uk")


def _call_url_inspection_api(page_url: str, site_url: str, credentials) -> dict:
    """Call GSC URL Inspection API for a single URL."""
    from google.auth.transport.requests import Request as GoogleRequest

    if not credentials.valid:
        credentials.refresh(GoogleRequest())

    token = credentials.token
    resp = httpx.post(
        "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        json={"inspectionUrl": page_url, "siteUrl": site_url},
        timeout=30.0,
    )

    if resp.status_code == 429:
        raise RuntimeError("URL Inspection API rate limit hit")
    if resp.status_code >= 400:
        return {}

    data = resp.json()
    result = data.get("inspectionResult", {})
    index_result = result.get("indexStatusResult", {})
    mobile_result = result.get("mobileUsabilityResult", {})
    rich_result = result.get("richResultsResult", {})

    mobile_issues = [i.get("message", "") for i in mobile_result.get("issues", [])]
    rich_types = [item.get("richResultType", "") for item in rich_result.get("detectedItems", [])]

    return {
        "index_status": index_result.get("verdict", "Unknown"),
        "last_crawl_time": index_result.get("lastCrawlTime"),
        "crawl_allowed": index_result.get("robotsTxtState") != "BLOCKED",
        "canonical_google": index_result.get("googleCanonical", ""),
        "canonical_declared": index_result.get("userCanonical", ""),
        "mobile_issues": mobile_issues,
        "rich_result_types": rich_types,
        "raw_response": data,
    }


def _load_inspection_cache(site_key: str, page_urls: list[str]) -> dict[str, dict]:
    """Load cached URL inspection results that are still fresh."""
    if not page_urls:
        return {}
    cutoff = (datetime.now(timezone.utc) - timedelta(days=CACHE_STALENESS_DAYS)).isoformat()
    h = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    resp = httpx.get(
        f"{SUPABASE_URL}/rest/v1/gsc_url_inspection",
        headers=h,
        params={
            "select": "page_url,index_status,last_crawl_time,canonical_google,"
                      "canonical_declared,mobile_issues,rich_result_types,checked_at",
            "site_key": f"eq.{site_key}",
            "checked_at": f"gte.{cutoff}",
        },
        timeout=20.0,
    )
    if resp.status_code >= 300:
        return {}
    return {row["page_url"]: row for row in resp.json()}


def _upsert_inspection(site_key: str, page_url: str, data: dict) -> None:
    """Write/refresh an inspection result to the cache table via Management API."""
    import json as _json
    import os as _os
    from pathlib import Path as _Path

    _ROOT = _Path(__file__).resolve().parents[2]
    try:
        from dotenv import load_dotenv as _lde
        _lde(_ROOT / ".env")
    except ImportError:
        pass

    access_token = _os.getenv("SUPABASE_ACCESS_TOKEN", "")
    project_ref = "dhlxwmvmkrfnmcgjbntk"
    mgmt_url = f"https://api.supabase.com/v1/projects/{project_ref}/database/query"

    def _esc(v):
        if v is None:
            return "NULL"
        if isinstance(v, bool):
            return "TRUE" if v else "FALSE"
        if isinstance(v, (list,)):
            if not v:
                return "ARRAY[]::TEXT[]"
            items = ", ".join(f"'{str(i).replace(chr(39), chr(39)*2)}'" for i in v)
            return f"ARRAY[{items}]"
        s = str(v).replace("'", "''")
        return f"'{s}'"

    mobile_issues = data.get("mobile_issues") or []
    rich_types = data.get("rich_result_types") or []
    raw = _json.dumps(data.get("raw_response") or {}, default=str).replace("'", "''")
    checked_at = datetime.now(timezone.utc).isoformat()

    httpx.post(
        mgmt_url,
        headers={"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"},
        json={"query": f"""
            INSERT INTO gsc_url_inspection
                (site_key, page_url, checked_at, index_status, last_crawl_time,
                 crawl_allowed, canonical_google, canonical_declared,
                 mobile_issues, rich_result_types, raw_response)
            VALUES (
                {_esc(site_key)}, {_esc(page_url)}, {_esc(checked_at)},
                {_esc(data.get('index_status'))}, {_esc(data.get('last_crawl_time'))},
                {_esc(data.get('crawl_allowed'))}, {_esc(data.get('canonical_google'))},
                {_esc(data.get('canonical_declared'))},
                {_esc(mobile_issues)}, {_esc(rich_types)},
                '{raw}'::JSONB
            )
            ON CONFLICT (site_key, page_url) DO UPDATE SET
                checked_at        = EXCLUDED.checked_at,
                index_status      = EXCLUDED.index_status,
                last_crawl_time   = EXCLUDED.last_crawl_time,
                crawl_allowed     = EXCLUDED.crawl_allowed,
                canonical_google  = EXCLUDED.canonical_google,
                canonical_declared = EXCLUDED.canonical_declared,
                mobile_issues     = EXCLUDED.mobile_issues,
                rich_result_types = EXCLUDED.rich_result_types,
                raw_response      = EXCLUDED.raw_response
        """},
        timeout=20.0,
    ).raise_for_status()


# ---------------------------------------------------------------------------
# Public entry point
# ---------------------------------------------------------------------------

def enrich_diagnostics(
    site_key: str,
    candidates: list[dict],
    credentials,
) -> list[dict]:
    """Given flagged candidate pages, call URL Inspection API for uncached ones
    and return enriched rows ready for Tab 6.

    Args:
        site_key: e.g. "property"
        candidates: from collector.collect_diagnostics_candidates()
        credentials: from auth.get_credentials()
    """
    page_urls = [r["page_url"] for r in candidates[:MAX_INSPECTION_CALLS]]
    site_url = _gsc_site_url_for(site_key)

    cache = _load_inspection_cache(site_key, page_urls)
    uncached = [u for u in page_urls if u not in cache]
    print(f"  [diagnostics] {len(candidates)} candidates, "
          f"{len(cache)} cached, inspecting up to "
          f"{min(MAX_INSPECTION_CALLS, len(uncached))} pages via API")

    api_calls = 0
    inspection_map: dict[str, dict] = dict(cache)

    for url in page_urls:
        if url in cache:
            continue
        if api_calls >= MAX_INSPECTION_CALLS:
            print(f"  [diagnostics] API call cap ({MAX_INSPECTION_CALLS}) reached")
            break
        try:
            result = _call_url_inspection_api(url, site_url, credentials)
            if result:
                _upsert_inspection(site_key, url, result)
                inspection_map[url] = result
            api_calls += 1
        except Exception as exc:
            print(f"  [diagnostics] inspection failed for {url}: {exc}")

    print(f"  [diagnostics] Made {api_calls} API calls")

    enriched: list[dict] = []
    for candidate in candidates:
        url = candidate["page_url"]
        insp = inspection_map.get(url)
        diagnosis, action = _diagnose(candidate, insp)
        enriched.append({
            "page_url": url,
            "flag_reason": ", ".join(candidate.get("flag_reasons") or []),
            "impressions_28d": candidate.get("impressions"),
            "position_28d": candidate.get("avg_position"),
            "imp_delta_pct": candidate.get("imp_delta"),
            "pos_delta": candidate.get("pos_delta"),
            "sessions_28d": candidate.get("sessions"),
            "engagement_rate": candidate.get("engagement_rate"),
            "index_status": (insp or {}).get("index_status", "Unknown"),
            "last_crawl": (insp or {}).get("last_crawl_time", ""),
            "canonical_google": (insp or {}).get("canonical_google", ""),
            "mobile_issues": "; ".join((insp or {}).get("mobile_issues") or []),
            "diagnosis": diagnosis,
            "suggested_action": action,
        })

    return enriched
