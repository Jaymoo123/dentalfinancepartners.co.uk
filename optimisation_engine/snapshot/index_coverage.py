"""
Google+Bing index-coverage sweep for any configured site.

Purpose: answer "of all sitemap URLs for a site, how many does Google actually
index, what canonical did Google choose per URL, and which are visible in
Bing-family?" — nothing in the estate measures this today.

Site-URL resolution rationale
------------------------------
The site_url (sc-domain: property) is resolved from the Supabase `sites` table
via ``optimisation_engine.config.get_site(site_key)['gsc_property_url']``.
This is the RELIABLE source.  We deliberately avoid
``diagnostics._gsc_site_url_for`` because that lookup had a dead-domain bug for
medical (``sc-domain:medicalaccounts.co.uk`` was stored as the typo
``sc-domain:medicalaccountants.co.uk``) that was fixed 2026-07-06.  Even though
it is now corrected, the Supabase registry is the single source of truth and
avoids any future drift.

Usage
------
  python -m optimisation_engine.snapshot.index_coverage medical --limit 5 --skip-bing
  python -m optimisation_engine.snapshot.index_coverage medical --limit 1
  python -m optimisation_engine.snapshot.index_coverage medical  # full sweep
  python -m optimisation_engine.snapshot.index_coverage property --fresh
"""
from __future__ import annotations

import argparse
import json
import random
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import httpx

ROOT = Path(__file__).resolve().parents[2]

try:
    from dotenv import load_dotenv
    load_dotenv(ROOT / ".env")
except ImportError:
    pass

# ---------------------------------------------------------------------------
# Old-domain strings that indicate phantom-canonical residue (medical-specific
# but harmless when checked against other sites).
# ---------------------------------------------------------------------------
OLD_DOMAIN_STRINGS = ("medicalaccountantsuk", "medicalaccountants.")

# Consecutive DDG empty-result runs before marking Bing check as degraded.
_DDG_DEGRADE_THRESHOLD = 3

# All bucket names, initialised to 0 in the rollup so absent buckets are explicit.
_ALL_BUCKETS = (
    "indexed_self_canonical",
    "crawled_not_indexed",
    "discovered_not_indexed",
    "unknown_to_google",
    "canonicalised_away",
    "excluded_or_redirect",
    "error",
)


# ---------------------------------------------------------------------------
# Extended inspection helper
# ---------------------------------------------------------------------------

def _call_inspection_with_status(
    page_url: str, site_url: str, creds
) -> tuple[int, dict]:
    """Call the GSC URL Inspection API, returning ``(http_status, result_dict)``.

    Extends ``diagnostics._call_url_inspection_api`` with:
    - ``coverage_state``  (``indexStatusResult.coverageState``)
    - ``robots_txt_state`` (``indexStatusResult.robotsTxtState`` raw string)
    - ``page_fetch_state`` (``indexStatusResult.pageFetchState``)

    Also exposes the raw HTTP status so callers can FAIL-LOUD on 401/403
    (the upstream helper silently returns ``{}`` for all 4xx).

    The returned dict is compatible with ``diagnostics._upsert_inspection``
    (same required keys; extras are silently ignored there but present in
    ``raw_response`` which is stored as JSONB).
    """
    from google.auth.transport.requests import Request as GoogleRequest

    if not creds.valid:
        creds.refresh(GoogleRequest())

    token = creds.token
    try:
        resp = httpx.post(
            "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
            },
            json={"inspectionUrl": page_url, "siteUrl": site_url},
            timeout=30.0,
        )
    except Exception as exc:
        print(f"  [index_coverage] network error for {page_url}: {exc}", file=sys.stderr)
        return 0, {}

    status = resp.status_code
    if status >= 400:
        return status, {}

    data = resp.json()
    result = data.get("inspectionResult", {})
    index_result = result.get("indexStatusResult", {})
    mobile_result = result.get("mobileUsabilityResult", {})
    rich_result = result.get("richResultsResult", {})

    mobile_issues = [i.get("message", "") for i in mobile_result.get("issues", [])]
    rich_types = [
        item.get("richResultType", "")
        for item in rich_result.get("detectedItems", [])
    ]

    return status, {
        # Fields matched by diagnostics._upsert_inspection
        "index_status":       index_result.get("verdict", "Unknown"),
        "last_crawl_time":    index_result.get("lastCrawlTime"),
        "crawl_allowed":      index_result.get("robotsTxtState") != "BLOCKED",
        "canonical_google":   index_result.get("googleCanonical", ""),
        "canonical_declared": index_result.get("userCanonical", ""),
        "mobile_issues":      mobile_issues,
        "rich_result_types":  rich_types,
        "raw_response":       data,
        # Extended fields (not in _upsert_inspection columns; stored via raw_response)
        "coverage_state":     index_result.get("coverageState", ""),
        "robots_txt_state":   index_result.get("robotsTxtState", ""),
        "page_fetch_state":   index_result.get("pageFetchState", ""),
    }


def _fill_extended_fields(row: dict) -> dict:
    """Ensure coverage_state / robots_txt_state / page_fetch_state keys exist.

    Cache reads via ``_load_inspection_cache`` do not select these columns (they
    are not DB columns; they live in raw_response).  Fill with empty strings so
    downstream code can safely call ``row.get(...)`` without conditionals.
    """
    result = dict(row)
    for field in ("coverage_state", "robots_txt_state", "page_fetch_state"):
        result.setdefault(field, "")
    return result


# ---------------------------------------------------------------------------
# Verdict bucketing
# ---------------------------------------------------------------------------

def _bucket(insp: dict) -> tuple[str, bool]:
    """Return ``(bucket_name, old_domain_residue)`` for one URL's inspection result.

    Priority order:
    1. ``error``                — API returned empty dict (no data)
    2. ``canonicalised_away``   — googleCanonical != userCanonical (both non-empty)
    3. ``indexed_self_canonical``— PASS verdict and self-canonical (or no canonical set)
    4. ``unknown_to_google``    — coverageState "URL is unknown to Google" (never
                                   discovered/crawled — the single most diagnostic
                                   state for an index-absence problem; MUST NOT be
                                   conflated with redirects/excluded)
    5. ``crawled_not_indexed``  — coverageState / verdict contains "Crawled … not indexed"
    6. ``discovered_not_indexed``— coverageState / verdict contains "Discovered … not indexed"
    7. ``excluded_or_redirect`` — everything else (noindex, redirect, blocked, etc.)

    ``old_domain_residue`` is True when googleCanonical contains one of the legacy
    medical domain strings (``medicalaccountantsuk`` or ``medicalaccountants.``).
    This flag is orthogonal to the bucket.
    """
    if not insp:
        return "error", False

    gc = (insp.get("canonical_google") or "").rstrip("/")
    uc = (insp.get("canonical_declared") or "").rstrip("/")
    verdict = insp.get("index_status") or ""
    coverage = insp.get("coverage_state") or ""

    old_domain_residue = any(s in gc for s in OLD_DOMAIN_STRINGS)

    # Canonicalised away takes priority (even if indexed — Google chose a diff URL)
    if gc and uc and gc != uc:
        return "canonicalised_away", old_domain_residue

    # PASS verdict => indexed and self-canonical
    if verdict in ("PASS", "Indexed"):
        return "indexed_self_canonical", False

    # Check both coverageState (API enum string) and verdict (which diagnostics.py
    # has historically also stored human-readable strings from the API).
    combined = f"{coverage} {verdict}".lower()

    # "URL is unknown to Google" => the URL was never discovered. For a suspected
    # index-absence / discovery failure this is THE key state, so it gets its own
    # bucket instead of being swept into excluded_or_redirect (a genuine mis-bucket
    # if left in the catch-all).
    if "unknown to google" in combined:
        return "unknown_to_google", old_domain_residue

    if "crawled" in combined and "not indexed" in combined:
        return "crawled_not_indexed", False
    if "discovered" in combined and "not indexed" in combined:
        return "discovered_not_indexed", False

    return "excluded_or_redirect", False


# ---------------------------------------------------------------------------
# Bing-family probe via DDG site: query
# ---------------------------------------------------------------------------

def _bing_probe(url: str, site_key: str) -> bool | str:
    """Check if a URL is indexed by Bing-family via a DDG ``site:`` query.

    Returns:
        True      — URL found in DDG site: results (indexed)
        False     — No matching result (not indexed, per this proxy)
        "unknown" — DDG returned empty list (possible rate-limit / captcha)
    """
    from optimisation_engine.clients.ddg_serp_client import fetch_organic_results

    query = f"site:{url}"
    # Add per-call jitter on top of fetch_organic_results' own rate limiter
    time.sleep(random.uniform(0.1, 0.5))

    results = fetch_organic_results(
        query,
        num=3,
        region="uk-en",
        site_key=site_key,
        sleep=1.0,
    )

    if not results:
        return "unknown"

    norm = url.rstrip("/")
    for r in results:
        link = (r.get("link") or "").rstrip("/")
        if link == norm:
            return True

    return False


# ---------------------------------------------------------------------------
# Artifact helpers
# ---------------------------------------------------------------------------

def _default_out_path(site_key: str) -> Path:
    """Default artifact path.

    Medical writes to ``.cache/medical_diag/`` (shared with other P2/P3 tools).
    All other sites write to ``.cache/<site_key>_diag/``.
    """
    if site_key == "medical":
        cache_dir = ROOT / ".cache" / "medical_diag"
    else:
        cache_dir = ROOT / ".cache" / f"{site_key}_diag"
    cache_dir.mkdir(parents=True, exist_ok=True)
    return cache_dir / "index_coverage.json"


def _write_artifact(data: dict, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, default=str)
    print(f"[index_coverage] artifact written -> {path}")


# ---------------------------------------------------------------------------
# Main run function
# ---------------------------------------------------------------------------

def run(
    site_key: str,
    site_url: str | None = None,
    limit: int | None = None,
    fresh: bool = False,
    skip_bing: bool = False,
    out_path: Path | None = None,
) -> dict:
    """Run the index-coverage sweep and return the results dict.

    Parameters
    ----------
    site_key:  e.g. ``"medical"``, ``"property"``
    site_url:  GSC sc-domain: property string.  If omitted, resolved from
               ``optimisation_engine.config.get_site(site_key)['gsc_property_url']``.
               NEVER falls back to ``diagnostics._gsc_site_url_for`` (bug history).
    limit:     Cap on how many sitemap URLs to inspect (default: all).
    fresh:     If True, bypass the 7-day Supabase cache for every URL.
    skip_bing: If True, omit the DDG site: Bing-family probe pass.
    out_path:  Override output file path.

    Returns the artifact dict (also written to disk).  On FAIL-LOUD (401/403
    from GSC) returns a dict with top-level ``"error"`` key and writes that
    partial artifact immediately.
    """
    from optimisation_engine.config import get_site
    from optimisation_engine.indexing.submit_indexnow import load_sitemap_urls
    from optimisation_engine.snapshot.auth import get_credentials
    from optimisation_engine.snapshot.diagnostics import (
        _load_inspection_cache,
        _upsert_inspection,
    )

    # ------------------------------------------------------------------
    # Resolve site_url from Supabase (authoritative source)
    # ------------------------------------------------------------------
    if not site_url:
        site_row = get_site(site_key)
        site_url = (site_row.get("gsc_property_url") or "").strip()

    if not site_url:
        err = (
            f"Cannot determine GSC sc-domain: property for site {site_key!r}. "
            "Pass --site-url explicitly or check the Supabase sites table."
        )
        print(f"[index_coverage] ERROR: {err}", file=sys.stderr)
        artifact: dict = {
            "error": err,
            "site_key": site_key,
            "site_url": "",
            "generated_at": datetime.now(timezone.utc).isoformat(),
        }
        _write_artifact(artifact, out_path or _default_out_path(site_key))
        return artifact

    print(f"[index_coverage] site_key={site_key!r}  site_url={site_url!r}")

    # ------------------------------------------------------------------
    # OAuth credentials
    # ------------------------------------------------------------------
    creds = get_credentials()

    # ------------------------------------------------------------------
    # Load and filter sitemap URLs
    # ------------------------------------------------------------------
    print(f"[index_coverage] fetching sitemap …")
    try:
        raw_urls = load_sitemap_urls(site_key)
    except Exception as exc:
        err = f"Failed to load sitemap for {site_key!r}: {exc}"
        print(f"[index_coverage] ERROR: {err}", file=sys.stderr)
        artifact = {
            "error": err,
            "site_key": site_key,
            "site_url": site_url,
            "generated_at": datetime.now(timezone.utc).isoformat(),
        }
        _write_artifact(artifact, out_path or _default_out_path(site_key))
        return artifact

    # Dedupe and restrict to current-domain URLs
    domain_substr = site_url.replace("sc-domain:", "").strip("/")
    seen: set[str] = set()
    urls: list[str] = []
    for u in raw_urls:
        if u in seen:
            continue
        seen.add(u)
        if domain_substr in u:
            urls.append(u)

    urls_total = len(urls)
    print(f"[index_coverage] sitemap: {len(raw_urls)} raw -> {urls_total} unique current-domain URLs")

    inspect_queue = urls[:limit] if limit is not None else list(urls)

    # ------------------------------------------------------------------
    # Load cache (skip if --fresh)
    # ------------------------------------------------------------------
    cache: dict[str, dict] = {}
    if not fresh and inspect_queue:
        cache = _load_inspection_cache(site_key, inspect_queue)
        print(f"[index_coverage] cache hits: {len(cache)} / {len(inspect_queue)}")

    # ------------------------------------------------------------------
    # Inspection loop
    # ------------------------------------------------------------------
    url_records: list[dict] = []
    urls_inspected = 0
    quota_hit = False
    bing_check_degraded = False
    ddg_consecutive_empty = 0

    for i, url in enumerate(inspect_queue):
        label = f"  [{i+1}/{len(inspect_queue)}]"

        # ---- Google inspection ----
        if url in cache and not fresh:
            insp = _fill_extended_fields(cache[url])
            urls_inspected += 1
            print(f"{label} (cache) {url}")
        else:
            # Throttle ~1 req/s
            time.sleep(1.0)
            print(f"{label} (api)   {url}")

            http_status, insp = _call_inspection_with_status(url, site_url, creds)

            if http_status in (401, 403):
                # FAIL-LOUD: auth failure — write error artifact and abort
                err = (
                    f"GSC URL Inspection API returned HTTP {http_status} for "
                    f"{url!r}. Check OAuth credentials and that the GSC property "
                    f"{site_url!r} is accessible to the authorised account."
                )
                print(f"[index_coverage] AUTH FAILURE: {err}", file=sys.stderr)
                artifact = {
                    "error": err,
                    "site_key": site_key,
                    "site_url": site_url,
                    "generated_at": datetime.now(timezone.utc).isoformat(),
                    "urls_total": urls_total,
                    "urls_inspected": urls_inspected,
                }
                _write_artifact(artifact, out_path or _default_out_path(site_key))
                return artifact

            if http_status == 429:
                print(
                    f"[index_coverage] quota/rate-limit hit at URL {i+1}; "
                    "stopping inspection gracefully.",
                    file=sys.stderr,
                )
                quota_hit = True
                break  # stop the sweep; do not process remaining URLs

            if insp:
                urls_inspected += 1
                try:
                    _upsert_inspection(site_key, url, insp)
                except Exception as exc:
                    print(f"  [index_coverage] cache upsert failed for {url}: {exc}")
            else:
                # Non-auth, non-quota 4xx/5xx or network error — count as error
                urls_inspected += 1  # we tried; record as error bucket

        # ---- Bucket assignment ----
        bucket, old_residue = _bucket(insp)

        # ---- Bing probe ----
        if skip_bing:
            bing_indexed = None
        elif bing_check_degraded:
            bing_indexed = "unknown"
        else:
            bing_result = _bing_probe(url, site_key)
            if bing_result == "unknown":
                ddg_consecutive_empty += 1
                if ddg_consecutive_empty >= _DDG_DEGRADE_THRESHOLD:
                    bing_check_degraded = True
                    print(
                        f"[index_coverage] DDG degraded (≥{_DDG_DEGRADE_THRESHOLD} "
                        f"consecutive empties) at URL {i+1}; remaining Bing checks = unknown.",
                        file=sys.stderr,
                    )
                bing_indexed = "unknown"
            else:
                ddg_consecutive_empty = 0
                bing_indexed = bing_result

        url_records.append({
            "url":               url,
            "bucket":            bucket,
            "old_domain_residue": old_residue,
            "google_canonical":  insp.get("canonical_google", ""),
            "user_canonical":    insp.get("canonical_declared", ""),
            "coverage_state":    insp.get("coverage_state", ""),
            "last_crawl_time":   insp.get("last_crawl_time"),
            "page_fetch_state":  insp.get("page_fetch_state", ""),
            "rich_results":      insp.get("rich_result_types", []),
            "bing_indexed":      bing_indexed,
        })

    # ------------------------------------------------------------------
    # Rollup
    # ------------------------------------------------------------------
    buckets: dict[str, int] = {b: 0 for b in _ALL_BUCKETS}
    for r in url_records:
        b = r["bucket"]
        buckets[b] = buckets.get(b, 0) + 1

    old_domain_residue_count = sum(1 for r in url_records if r.get("old_domain_residue"))

    artifact = {
        "site_key":               site_key,
        "site_url":               site_url,
        "generated_at":           datetime.now(timezone.utc).isoformat(),
        "urls_total":             urls_total,
        "urls_inspected":         urls_inspected,
        "quota_hit":              quota_hit,
        "bing_check_degraded":    bing_check_degraded,
        "buckets":                buckets,
        "old_domain_residue_count": old_domain_residue_count,
        "urls":                   url_records,
    }

    out = out_path or _default_out_path(site_key)
    _write_artifact(artifact, out)
    print(
        f"[index_coverage] complete: {urls_inspected}/{urls_total} inspected, "
        f"quota_hit={quota_hit}, bing_degraded={bing_check_degraded}"
    )
    print(f"[index_coverage] buckets: {buckets}")
    return artifact


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(
        prog="python -m optimisation_engine.snapshot.index_coverage",
        description=(
            "Google+Bing index-coverage sweep. "
            "Reports how many sitemap URLs are indexed, Google's canonical choice "
            "per URL, and Bing-family visibility (via DDG site: proxy)."
        ),
    )
    parser.add_argument(
        "site_key",
        help="Site key (e.g. medical, property, dentists)",
    )
    parser.add_argument(
        "--site-url",
        dest="site_url",
        default=None,
        help=(
            "GSC sc-domain: property string. Default: resolved from Supabase sites "
            "table (gsc_property_url column). Example: sc-domain:medicalaccounts.co.uk"
        ),
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        metavar="N",
        help="Inspect at most N sitemap URLs (default: all).",
    )
    parser.add_argument(
        "--fresh",
        action="store_true",
        help="Bypass the 7-day Supabase cache; always call the GSC API.",
    )
    parser.add_argument(
        "--skip-bing",
        action="store_true",
        help="Skip the DDG/Bing site: probe pass (faster; Google-only).",
    )
    parser.add_argument(
        "--out",
        default=None,
        metavar="PATH",
        help=(
            "Output JSON path. Default: .cache/medical_diag/index_coverage.json "
            "for medical; .cache/<site_key>_diag/index_coverage.json otherwise."
        ),
    )

    args = parser.parse_args()
    out_path = Path(args.out) if args.out else None

    result = run(
        site_key=args.site_key,
        site_url=args.site_url,
        limit=args.limit,
        fresh=args.fresh,
        skip_bing=args.skip_bing,
        out_path=out_path,
    )

    return 1 if "error" in result else 0


if __name__ == "__main__":
    sys.exit(main())
