"""
Google Custom Search JSON API client.

Returns top organic results for a query, UK-targeted (gl=gb).
Free tier: 100 queries/day. Beyond that: $5 per 1,000 queries.

Setup (one-time):
  1. Enable "Custom Search JSON API" in your Google Cloud Console project
     (same project used for GSC).
  2. Create a Programmable Search Engine at programmablesearchengine.google.com
     — set it to search the entire web.
  3. Copy the Search Engine ID (cx parameter).
  4. Create a browser API key in Cloud Console (APIs & Services -> Credentials).
  5. Add to .env:
       GOOGLE_CSE_KEY=AIza...
       GOOGLE_CSE_ID=abc123...456

The result format matches what serper_client.fetch_top_organic_urls() returns
so callers are interchangeable.
"""
from __future__ import annotations

import os
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parents[2]
try:
    from dotenv import load_dotenv
    load_dotenv(ROOT / ".env")
except ImportError:
    pass

GOOGLE_CSE_KEY: str = os.getenv("GOOGLE_CSE_KEY", "")
GOOGLE_CSE_ID: str = os.getenv("GOOGLE_CSE_ID", "")
CSE_ENDPOINT = "https://www.googleapis.com/customsearch/v1"


def fetch_organic_results(query: str, *, num: int = 5, site_key: str | None = None) -> list[dict]:
    """
    Fetch top organic results from Google Custom Search.

    Args:
        query: The search query (UK-targeted, English)
        num: Number of results to return (max 10 per API call)
        site_key: Optional site context (for logging only)

    Returns:
        List of dicts: [{position, title, link, snippet, domain}]
        Empty list on error or misconfiguration.
    """
    if not GOOGLE_CSE_KEY or not GOOGLE_CSE_ID:
        raise RuntimeError(
            "GOOGLE_CSE_KEY and GOOGLE_CSE_ID must be set in .env. "
            "See optimisation_engine/clients/google_cse_client.py for setup instructions."
        )

    params = {
        "key": GOOGLE_CSE_KEY,
        "cx": GOOGLE_CSE_ID,
        "q": query,
        "gl": "gb",       # UK results
        "hl": "en",       # English
        "num": min(num, 10),  # CSE max is 10 per request
    }

    try:
        resp = httpx.get(CSE_ENDPOINT, params=params, timeout=20.0)
    except httpx.HTTPError as exc:
        print(f"  [cse] HTTP error for {query!r}: {exc}")
        return []

    if resp.status_code == 429:
        print(f"  [cse] Rate limited — daily quota (100) likely exhausted")
        return []

    if resp.status_code == 400:
        data = resp.json()
        print(f"  [cse] 400 error: {data.get('error', {}).get('message', resp.text[:200])}")
        return []

    if resp.status_code >= 400:
        print(f"  [cse] {resp.status_code} error for {query!r}: {resp.text[:200]}")
        return []

    data = resp.json()
    items = data.get("items") or []

    results: list[dict] = []
    for i, item in enumerate(items[:num], start=1):
        link = item.get("link") or ""
        results.append({
            "position": i,
            "title": item.get("title") or "",
            "link": link,
            "snippet": item.get("snippet") or "",
            "domain": _domain_of(link),
        })

    return results


def _domain_of(url: str) -> str:
    if not url:
        return ""
    from urllib.parse import urlparse
    netloc = urlparse(url).netloc.lower()
    return netloc.lstrip("www.").split(":")[0]
