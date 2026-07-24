"""
Shared SERP fetch with provider fallback for the niche screener.

Primary: Serper (cheapest). Fallback: DataForSEO serp/google/organic/live/advanced
(credits confirmed available; Serper is currently out of credits, 2026-07-24).
Both normalise to:
  {"organic": [{"position", "title", "link", "snippet", "domain"}],
   "has_aio": bool, "ads_count": int, "provider": "serper"|"dataforseo",
   "fetched": bool, "reason": str|None}
"""
from __future__ import annotations

import httpx

from optimisation_engine.cost_tracker import IdempotencyHit
from optimisation_engine.niche_screener import common

_serper_dead = False  # remember credit exhaustion for the rest of the process


def fetch_serp(query: str, *, num: int = 10, site_key: str | None = None) -> dict:
    global _serper_dead
    if not _serper_dead:
        try:
            return _via_serper(query, num=num, site_key=site_key)
        except IdempotencyHit:
            return {"organic": [], "has_aio": False, "ads_count": 0,
                    "provider": "serper", "fetched": False, "reason": "idempotency"}
        except httpx.HTTPStatusError as exc:
            body = exc.response.text[:200]
            if exc.response.status_code == 400 and "credit" in body.lower():
                _serper_dead = True  # fall through to DataForSEO
            else:
                raise
    try:
        return _via_dataforseo(query, num=num, site_key=site_key)
    except IdempotencyHit:
        return {"organic": [], "has_aio": False, "ads_count": 0,
                "provider": "dataforseo", "fetched": False, "reason": "idempotency"}


def _via_serper(query: str, *, num: int, site_key: str | None) -> dict:
    from optimisation_engine.clients.serper_client import SerperClient
    resp = SerperClient().search(query=query, num=num, site_key=site_key)
    organic = [
        {
            "position": o.get("position"),
            "title": o.get("title"),
            "link": o.get("link"),
            "snippet": o.get("snippet"),
            "domain": common.domain_of(o.get("link") or ""),
        }
        for o in (resp.get("organic") or [])[:num]
    ]
    has_aio = bool(resp.get("aiOverview")) or (resp.get("answerBox") or {}).get("type") == "ai"
    return {"organic": organic, "has_aio": has_aio,
            "ads_count": len(resp.get("ads") or []), "provider": "serper",
            "fetched": True, "reason": None}


def _via_dataforseo(query: str, *, num: int, site_key: str | None) -> dict:
    from optimisation_engine.clients.dataforseo_client import DataForSEOClient
    resp = DataForSEOClient().serp_organic(site_key=site_key, query=query, depth=max(num, 10))
    organic: list[dict] = []
    has_aio = False
    ads = 0
    for task in resp.get("tasks") or []:
        for result in task.get("result") or []:
            for item in result.get("items") or []:
                t = item.get("type")
                if t == "organic" and len(organic) < num:
                    organic.append({
                        "position": item.get("rank_absolute"),
                        "title": item.get("title"),
                        "link": item.get("url"),
                        "snippet": item.get("description"),
                        "domain": common.domain_of(item.get("url") or ""),
                    })
                elif t == "ai_overview":
                    has_aio = True
                elif t == "paid":
                    ads += 1
    return {"organic": organic, "has_aio": has_aio, "ads_count": ads,
            "provider": "dataforseo", "fetched": True, "reason": None}


if __name__ == "__main__":
    fake = {"tasks": [{"result": [{"items": [
        {"type": "organic", "rank_absolute": 1, "title": "T", "url": "https://www.a.co.uk/x", "description": "s"},
        {"type": "ai_overview"},
        {"type": "paid"},
    ]}]}]}
    import unittest.mock as m
    with m.patch("optimisation_engine.clients.dataforseo_client.DataForSEOClient") as C:
        C.return_value.serp_organic.return_value = fake
        out = _via_dataforseo("q", num=10, site_key=None)
    assert out["organic"][0]["domain"] == "a.co.uk" and out["has_aio"] and out["ads_count"] == 1
    print("serp_fetch self-check OK")
