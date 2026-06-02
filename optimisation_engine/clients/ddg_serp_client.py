"""
DuckDuckGo SERP client for competitor URL discovery.

Uses the `ddgs` package (pip install ddgs) — no API key required, no account,
no rate-limit quota. Returns real web results for UK-targeted queries.

Safety nets built in:
  - Rate limiting: mandatory sleep between calls (configurable)
  - Language validation: aborts if >30% of result titles are non-ASCII
    (indicates bot-detection redirect or wrong locale response)
  - Result count floor: logs a warning if fewer than MIN_RESULTS returned
  - Domain diversity check: warns if all results are from the same domain
  - Retry on transient failure: one retry with longer sleep before giving up
  - Exception isolation: any ddgs error returns [] rather than crashing the pipeline

Result format matches the competitor module's internal convention:
  [{position, title, link, snippet, domain}]
"""
from __future__ import annotations

import time
import unicodedata
from urllib.parse import urlparse

DEFAULT_SLEEP_BETWEEN_CALLS = 2.0   # seconds — keeps request rate human-like
RETRY_SLEEP = 8.0                   # seconds before single retry on failure
MIN_RESULTS = 2                     # fewer than this = suspect response
NON_ASCII_THRESHOLD = 0.30          # fraction above which titles are considered garbage


# ---------------------------------------------------------------------------
# Safety checks
# ---------------------------------------------------------------------------

def _non_ascii_ratio(text: str) -> float:
    """Fraction of characters in text that are non-ASCII (outside U+0020-U+007E)."""
    if not text:
        return 0.0
    non_ascii = sum(1 for ch in text if ord(ch) > 0x7E or ord(ch) < 0x20)
    return non_ascii / len(text)


def _titles_look_garbled(results: list[dict]) -> bool:
    """Return True if result titles suggest a bot-detection redirect."""
    if not results:
        return False
    ratios = [_non_ascii_ratio(r.get("title") or "") for r in results]
    avg_ratio = sum(ratios) / len(ratios)
    return avg_ratio > NON_ASCII_THRESHOLD


def _all_same_domain(results: list[dict]) -> bool:
    """Return True if every result is from the same domain (suspicious)."""
    domains = {r.get("domain") or "" for r in results}
    return len(domains) == 1 and len(results) > 1


def _domain_of(url: str) -> str:
    if not url:
        return ""
    netloc = urlparse(url).netloc.lower()
    return netloc.lstrip("www.").split(":")[0]


# ---------------------------------------------------------------------------
# Core fetch
# ---------------------------------------------------------------------------

def _do_search(query: str, num: int, region: str) -> list[dict]:
    """Single attempt at a DuckDuckGo text search."""
    from ddgs import DDGS

    with DDGS() as ddgs:
        raw = list(ddgs.text(
            query,
            region=region,
            max_results=num,
        ))

    results: list[dict] = []
    for i, item in enumerate(raw[:num], start=1):
        link = item.get("href") or item.get("url") or ""
        results.append({
            "position": i,
            "title": item.get("title") or "",
            "link": link,
            "snippet": item.get("body") or item.get("snippet") or "",
            "domain": _domain_of(link),
        })
    return results


# ---------------------------------------------------------------------------
# Public interface
# ---------------------------------------------------------------------------

_last_call_time: float = 0.0


def fetch_organic_results(
    query: str,
    *,
    num: int = 5,
    region: str = "uk-en",
    site_key: str | None = None,
    sleep: float = DEFAULT_SLEEP_BETWEEN_CALLS,
) -> list[dict]:
    """
    Fetch top organic results from DuckDuckGo.

    Args:
        query:    Search query (keep it natural — DDG handles UK context via region)
        num:      Number of results to return (ask for a few more than needed
                  since we'll filter out our own domain in the caller)
        region:   DDG region code. "uk-en" for English UK results.
        site_key: Logging context only.
        sleep:    Minimum seconds between consecutive calls.

    Returns:
        List of {position, title, link, snippet, domain}.
        Empty list if results are garbled or search fails after retry.
    """
    global _last_call_time

    # Rate limiting: enforce minimum gap between calls
    now = time.monotonic()
    elapsed = now - _last_call_time
    if elapsed < sleep:
        time.sleep(sleep - elapsed)
    _last_call_time = time.monotonic()

    label = f"[ddg] site={site_key or '-'} query={query[:50]!r}"

    # First attempt
    try:
        results = _do_search(query, num, region)
    except Exception as exc:
        print(f"  {label} — error on first attempt: {type(exc).__name__}: {exc}")
        print(f"  {label} — retrying in {RETRY_SLEEP}s...")
        time.sleep(RETRY_SLEEP)
        try:
            results = _do_search(query, num, region)
        except Exception as exc2:
            print(f"  {label} — retry also failed: {exc2}. Returning [].")
            return []

    # Safety: garbled title check (bot-detection redirect)
    if _titles_look_garbled(results):
        print(f"  {label} — WARNING: titles look garbled (non-ASCII ratio high). "
              f"Possible bot-detection redirect. Returning [].")
        return []

    # Safety: result count floor
    if len(results) < MIN_RESULTS:
        print(f"  {label} — WARNING: only {len(results)} result(s) returned "
              f"(floor is {MIN_RESULTS}). May indicate rate limiting.")
        # Return what we have — caller decides whether to skip
        return results

    # Safety: domain diversity
    if _all_same_domain(results):
        print(f"  {label} — WARNING: all {len(results)} results from same domain "
              f"({results[0].get('domain')}). Results may be unreliable.")

    return results
