"""
Google Autocomplete ingestion (free).

Pulls real-time Google autocomplete suggestions for each site's top GSC seeds,
expanded with WH-prefixes and intent suffixes. Persists to
dataforseo_keyword_data with endpoint='google_autocomplete' so the downstream
detectors and cross-site relevance pass can use them alongside the paid data.

Autocomplete doesn't return volume / KD / CPC — those fields are null. The
keyword itself is the value: it's a known user search pattern.

Rate-limited locally (200ms between calls) to be polite to Google.
"""
from __future__ import annotations

import argparse
import os
import sys
import time
from datetime import date

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL, get_sites  # noqa: E402

PREFIXES = ["", "how", "what", "when", "can i", "how much", "how to", "do i", "is", "should i"]
SUFFIXES = ["", "uk", "cost", "2026", "rules", "explained", "for landlords", "for dentists", "for agencies"]


def _supabase_headers() -> dict[str, str]:
    return {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}", "Content-Type": "application/json"}


def _autocomplete(query: str, client: httpx.Client) -> list[str]:
    """Hit Google's autocomplete endpoint. Returns a list of suggestions."""
    try:
        r = client.get(
            "http://suggestqueries.google.com/complete/search",
            params={"client": "firefox", "q": query, "hl": "en-GB", "gl": "uk"},
            timeout=8.0,
        )
        if r.status_code != 200:
            return []
        data = r.json()
        # firefox client returns [original_query, [suggestion1, suggestion2, ...]]
        if isinstance(data, list) and len(data) >= 2 and isinstance(data[1], list):
            return [s.strip().lower() for s in data[1] if isinstance(s, str) and s.strip()]
    except Exception:
        pass
    return []


def _top_seeds(site_key: str, *, limit: int = 5) -> list[str]:
    """Pull top seeds — prefer GSC, fall back to existing DataForSEO seeds."""
    h = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    # GSC first
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/gsc_query_data",
        headers=h,
        params={
            "select": "query,impressions",
            "site_key": f"eq.{site_key}",
            "order": "impressions.desc",
            "limit": str(limit * 3),
        },
        timeout=15.0,
    )
    r.raise_for_status()
    seen: set[str] = set()
    out: list[str] = []
    for row in r.json():
        q = (row.get("query") or "").strip()
        if not q or q.lower() in seen or len(q) < 3:
            continue
        seen.add(q.lower())
        out.append(q)
        if len(out) >= limit:
            break

    if out:
        return out

    # Fallback: pull from existing DataForSEO keyword_suggestions seeds
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/dataforseo_keyword_data",
        headers=h,
        params={
            "select": "seed_keyword",
            "site_key": f"eq.{site_key}",
            "seed_keyword": "not.is.null",
            "limit": "100",
        },
        timeout=15.0,
    )
    if r.status_code < 300:
        for row in r.json():
            s = (row.get("seed_keyword") or "").strip()
            if not s or s.lower() in seen or s.startswith("site:") or s.startswith("domain:") or s.startswith("bulk_kd:"):
                continue
            seen.add(s.lower())
            out.append(s)
            if len(out) >= limit:
                break
    return out


def expand_seed(seed: str, client: httpx.Client) -> set[str]:
    """For one seed, generate all prefix/suffix variants and merge results."""
    found: set[str] = set()
    for prefix in PREFIXES:
        for suffix in SUFFIXES:
            q = f"{prefix} {seed} {suffix}".strip()
            q = " ".join(q.split())
            suggestions = _autocomplete(q, client)
            for s in suggestions:
                if 3 <= len(s) <= 100:
                    found.add(s)
            time.sleep(0.2)  # polite rate-limit
    return found


def persist(site_key: str, seed_keyword: str, keywords: list[str]) -> int:
    """Bulk-insert autocomplete suggestions into dataforseo_keyword_data."""
    if not keywords:
        return 0
    rows = [
        {
            "site_key": site_key,
            "endpoint": "google_autocomplete",
            "seed_keyword": seed_keyword,
            "location_code": 2826,
            "language_code": "en",
            "related_keyword": kw,
            # search_volume / KD / CPC unknown — left null
            "raw_response": {"source": "google_autocomplete", "seed": seed_keyword},
        }
        for kw in keywords
    ]
    r = httpx.post(
        f"{SUPABASE_URL}/rest/v1/dataforseo_keyword_data",
        headers={**_supabase_headers(), "Prefer": "return=minimal"},
        json=rows,
        timeout=30.0,
    )
    if r.status_code >= 300:
        print(f"  [ERR] persist {site_key} seed={seed_keyword!r}: {r.status_code} {r.text[:200]}")
        return 0
    return len(rows)


def run(*, sites: list[str] | None = None, seeds_per_site: int = 5) -> dict[str, int]:
    if sites is None:
        sites = [s["site_key"] for s in get_sites(active_only=True)]

    print(f"Running Google Autocomplete for sites: {sites}")
    results: dict[str, int] = {}

    with httpx.Client() as client:
        for site_key in sites:
            seeds = _top_seeds(site_key, limit=seeds_per_site)
            if not seeds:
                print(f"\n=== {site_key}: no seeds available — skipping")
                results[site_key] = 0
                continue
            print(f"\n=== {site_key}: {len(seeds)} seeds")
            for seed in seeds:
                print(f"  seed={seed!r}")
                expanded = expand_seed(seed, client)
                print(f"    {len(expanded)} unique suggestions")
                inserted = persist(site_key, seed, sorted(expanded))
                results[site_key] = results.get(site_key, 0) + inserted

    print("\n=== Summary ===")
    for site, count in results.items():
        print(f"  {site:11s} {count} autocomplete keywords")
    return results


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--sites", nargs="*", default=None)
    parser.add_argument("--seeds", type=int, default=5)
    args = parser.parse_args()
    run(sites=args.sites, seeds_per_site=args.seeds)


if __name__ == "__main__":
    main()
