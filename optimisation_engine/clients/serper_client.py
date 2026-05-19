"""
Thin Serper.dev client for Google SERP fetching.

Serper is cheaper than DataForSEO SERP API and we already have credentials.
Used by the content gap analyzer (Checkpoint 5) and the external link
suggester (Checkpoint 7).

Per Serper pricing (2026): standard search ~$0.001 per query, organic-only.
PAA and related_searches are NOT returned for UK gl=gb (memory note from
2026-05-17). For SERP gap analysis we only need organic top results, which
this client returns.
"""
from __future__ import annotations

import os
from datetime import date, datetime
from typing import Any

import httpx

from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL
from optimisation_engine.cost_tracker import CostTracker, IdempotencyHit, make_idempotency_key

SERPER_API_KEY = os.getenv("SERPER_API_KEY", "")
SERPER_URL = "https://google.serper.dev/search"

# Serper cost per query (verify with /v3/serp prefix on first run)
SERPER_COST_PER_QUERY = 0.001


def _supabase_headers() -> dict[str, str]:
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    }


class SerperClient:
    def __init__(self, *, timeout: float = 20.0) -> None:
        if not SERPER_API_KEY:
            raise RuntimeError("SERPER_API_KEY not set in .env")
        self.headers = {
            "X-API-KEY": SERPER_API_KEY,
            "Content-Type": "application/json",
        }
        self.timeout = timeout

    def search(
        self,
        *,
        query: str,
        gl: str = "gb",
        hl: str = "en",
        num: int = 10,
        site_key: str | None = None,
    ) -> dict:
        """Hit the Serper search endpoint. Returns the raw response."""
        idem = make_idempotency_key("serper", "search", site_key, {"q": query, "gl": gl, "hl": hl, "num": num})
        payload = {"q": query, "gl": gl, "hl": hl, "num": num}

        with CostTracker.guard(
            api_provider="serper",
            endpoint="search",
            estimated_cost_usd=SERPER_COST_PER_QUERY,
            site_key=site_key,
            niche=site_key,
            request_payload=payload,
            idempotency_key=idem,
            skip_budget_check=True,  # Serper has its own quota; no shared budget gate
        ) as record:
            r = httpx.post(SERPER_URL, headers=self.headers, json=payload, timeout=self.timeout)
            r.raise_for_status()
            data = r.json()
            record.complete(
                actual_cost_usd=SERPER_COST_PER_QUERY,
                response_size_bytes=len(r.content),
                response_status_code=r.status_code,
            )
            return data


def fetch_top_organic_urls(query: str, *, num: int = 5, site_key: str | None = None) -> list[dict]:
    """Convenience: return the top N organic results (title + link + snippet).

    Returns empty list on IdempotencyHit (already called today). The cost
    tracker enforces 1-call-per-query-per-day; same-day re-runs can use the
    cached state but for now we just degrade gracefully.
    """
    client = SerperClient()
    try:
        resp = client.search(query=query, num=num, site_key=site_key)
    except IdempotencyHit:
        return []
    organic = resp.get("organic", []) or []
    out = []
    for item in organic[:num]:
        out.append({
            "position": item.get("position"),
            "title": item.get("title"),
            "link": item.get("link"),
            "snippet": item.get("snippet"),
            "domain": _domain_of(item.get("link") or ""),
        })
    return out


def _domain_of(url: str) -> str:
    if not url:
        return ""
    s = url.lower()
    for p in ("https://", "http://"):
        if s.startswith(p):
            s = s[len(p):]
    if s.startswith("www."):
        s = s[4:]
    return s.split("/", 1)[0]


if __name__ == "__main__":
    # Smoke test
    import json
    import sys
    q = sys.argv[1] if len(sys.argv) > 1 else "uk cgt rates residential property 2026"
    results = fetch_top_organic_urls(q, num=5)
    print(f"Top 5 organic UK results for {q!r}:")
    for r in results:
        print(f"  #{r['position']} [{r['domain']}] {r['title']}")
        print(f"    {r['link']}")
        print(f"    {(r.get('snippet') or '')[:200]}")
