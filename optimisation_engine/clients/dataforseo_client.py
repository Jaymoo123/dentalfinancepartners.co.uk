"""
DataForSEO Labs client with strict cost discipline.

Every paid call goes through CostTracker.guard:
  1. Refuses if today's running total + estimated cost > DATAFORSEO_ABORT_AT.
  2. Inserts a 'pending' row to api_cost_log BEFORE the call.
  3. Marks 'success' (with actual cost) or 'failed' after the call.
  4. Idempotency key prevents accidental double-billing if a run is re-tried.

The raw JSON response is saved on each call so future re-analysis is free.

Endpoints used in the first run:
  appendix/user_data                  (FREE) - balance + creds check
  keyword_suggestions/live            - related keywords from a seed
  competitors_domain/live             - top competing domains
  ranked_keywords/live                - keywords a competitor ranks for
  bulk_keyword_difficulty/live        - KD for up to 1000 keywords per call
  domain_intersection/live            - keywords two domains both rank for
  keyword_ideas/live                  - keyword ideas seeded from up to 200 keywords
"""
from __future__ import annotations

import base64
import json
from datetime import date, datetime
from typing import Any, Optional

import httpx

from optimisation_engine.config import (
    DATAFORSEO_BASE_URL,
    DATAFORSEO_COSTS,
    DATAFORSEO_LANGUAGE_CODE_EN,
    DATAFORSEO_LOCATION_CODE_UK,
    DATAFORSEO_LOGIN,
    DATAFORSEO_PASSWORD,
    SUPABASE_KEY,
    SUPABASE_URL,
)
from optimisation_engine.cost_tracker import CostTracker, make_idempotency_key


def _auth_header() -> str:
    if not DATAFORSEO_LOGIN or not DATAFORSEO_PASSWORD:
        raise RuntimeError(
            "DATAFORSEO_API_LOGIN and DATAFORSEO_API_PASSWORD must be set in .env"
        )
    token = base64.b64encode(f"{DATAFORSEO_LOGIN}:{DATAFORSEO_PASSWORD}".encode()).decode()
    return f"Basic {token}"


def _estimate_cost(endpoint: str, expected_rows: int = 0) -> float:
    # Accept either the short endpoint name ('keyword_suggestions/live') or
    # the full path ('dataforseo_labs/google/keyword_suggestions/live').
    cfg = DATAFORSEO_COSTS.get(endpoint)
    if cfg is None:
        for short_key, val in DATAFORSEO_COSTS.items():
            if endpoint.endswith(short_key):
                cfg = val
                break
    if cfg is None:
        raise ValueError(f"Unknown DataForSEO endpoint: {endpoint}. Add to DATAFORSEO_COSTS.")
    return float(cfg["base"]) + float(cfg["per_row"]) * expected_rows


def _supabase_headers() -> dict[str, str]:
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    }


class DataForSEOClient:
    """Thin httpx wrapper. All paid calls are budget-gated and audit-logged."""

    def __init__(self, *, timeout: float = 60.0) -> None:
        self.headers = {
            "Authorization": _auth_header(),
            "Content-Type": "application/json",
        }
        self.timeout = timeout

    # ----- Free endpoint -----------------------------------------------------
    def get_account_balance(self) -> dict:
        """Returns {money: {balance, currency}, rates: {...}, ...}. FREE call."""
        url = f"{DATAFORSEO_BASE_URL}/appendix/user_data"
        r = httpx.get(url, headers=self.headers, timeout=self.timeout)
        r.raise_for_status()
        data = r.json()
        # Log the free call so we have a complete audit trail
        log_url = f"{SUPABASE_URL}/rest/v1/api_cost_log"
        httpx.post(
            log_url,
            headers={**_supabase_headers(), "Prefer": "return=minimal"},
            json={
                "api_provider": "dataforseo",
                "endpoint": "appendix/user_data",
                "status": "success",
                "cost_usd": 0.0,
                "estimated_cost_usd": 0.0,
                "response_status_code": r.status_code,
                "completed_at": datetime.utcnow().isoformat(),
                "idempotency_key": f"dataforseo:appendix/user_data:{date.today().isoformat()}",
            },
            timeout=10.0,
        )
        return data

    # ----- Generic POST executor with full cost gating -----------------------
    def _post_paid(
        self,
        endpoint: str,
        payload: list[dict],
        *,
        site_key: str,
        expected_rows: int = 0,
        seed_keyword: Optional[str] = None,
    ) -> dict:
        url = f"{DATAFORSEO_BASE_URL}/{endpoint}"
        estimated = _estimate_cost(endpoint, expected_rows=expected_rows)
        idem = make_idempotency_key(
            "dataforseo",
            endpoint,
            site_key,
            {"payload": payload, "seed": seed_keyword},
        )

        with CostTracker.guard(
            api_provider="dataforseo",
            endpoint=endpoint,
            estimated_cost_usd=estimated,
            site_key=site_key,
            niche=site_key,
            request_payload={"endpoint": endpoint, "payload": payload, "seed": seed_keyword},
            idempotency_key=idem,
        ) as record:
            r = httpx.post(url, headers=self.headers, json=payload, timeout=self.timeout)
            r.raise_for_status()
            body = r.json()

            # DataForSEO returns cost in the response root
            actual_cost = float(body.get("cost", estimated))
            record.complete(
                actual_cost_usd=actual_cost,
                response_size_bytes=len(r.content),
                response_status_code=r.status_code,
            )
            return body

    # ----- High-level Labs operations ---------------------------------------

    def keyword_suggestions(
        self,
        *,
        site_key: str,
        seed_keyword: str,
        limit: int = 200,
        location_code: int = DATAFORSEO_LOCATION_CODE_UK,
        language_code: str = DATAFORSEO_LANGUAGE_CODE_EN,
    ) -> dict:
        payload = [
            {
                "keyword": seed_keyword,
                "location_code": location_code,
                "language_code": language_code,
                "limit": limit,
                "include_serp_info": True,
            }
        ]
        return self._post_paid(
            "dataforseo_labs/google/keyword_suggestions/live",
            payload,
            site_key=site_key,
            expected_rows=limit,
            seed_keyword=seed_keyword,
        )

    def competitors_domain(
        self,
        *,
        site_key: str,
        domain: str,
        limit: int = 20,
        location_code: int = DATAFORSEO_LOCATION_CODE_UK,
        language_code: str = DATAFORSEO_LANGUAGE_CODE_EN,
    ) -> dict:
        payload = [
            {
                "target": domain,
                "location_code": location_code,
                "language_code": language_code,
                "limit": limit,
            }
        ]
        return self._post_paid(
            "dataforseo_labs/google/competitors_domain/live",
            payload,
            site_key=site_key,
            seed_keyword=f"domain:{domain}",
        )

    def ranked_keywords(
        self,
        *,
        site_key: str,
        domain: str,
        limit: int = 500,
        location_code: int = DATAFORSEO_LOCATION_CODE_UK,
        language_code: str = DATAFORSEO_LANGUAGE_CODE_EN,
    ) -> dict:
        payload = [
            {
                "target": domain,
                "location_code": location_code,
                "language_code": language_code,
                "limit": limit,
                "order_by": ["keyword_data.keyword_info.search_volume,desc"],
            }
        ]
        return self._post_paid(
            "dataforseo_labs/google/ranked_keywords/live",
            payload,
            site_key=site_key,
            expected_rows=limit,
            seed_keyword=f"domain:{domain}",
        )

    def related_keywords(
        self,
        *,
        site_key: str,
        seed_keyword: str,
        limit: int = 200,
        depth: int = 2,
        location_code: int = DATAFORSEO_LOCATION_CODE_UK,
        language_code: str = DATAFORSEO_LANGUAGE_CODE_EN,
    ) -> dict:
        """Semantic neighbourhood around a seed. Broader than keyword_suggestions."""
        payload = [
            {
                "keyword": seed_keyword,
                "location_code": location_code,
                "language_code": language_code,
                "limit": limit,
                "depth": depth,
                "include_serp_info": False,
            }
        ]
        return self._post_paid(
            "dataforseo_labs/google/related_keywords/live",
            payload,
            site_key=site_key,
            expected_rows=limit,
            seed_keyword=seed_keyword,
        )

    def keywords_for_site(
        self,
        *,
        site_key: str,
        target_domain: str,
        limit: int = 200,
        location_code: int = DATAFORSEO_LOCATION_CODE_UK,
        language_code: str = DATAFORSEO_LANGUAGE_CODE_EN,
    ) -> dict:
        """All keywords a given domain ranks for. Used on competitor domains."""
        payload = [
            {
                "target": target_domain,
                "location_code": location_code,
                "language_code": language_code,
                "limit": limit,
                "order_by": ["keyword_info.search_volume,desc"],
            }
        ]
        return self._post_paid(
            "dataforseo_labs/google/keywords_for_site/live",
            payload,
            site_key=site_key,
            expected_rows=limit,
            seed_keyword=f"site:{target_domain}",
        )

    def search_volume(
        self,
        *,
        site_key: str,
        keywords: list[str],
        location_code: int = DATAFORSEO_LOCATION_CODE_UK,
        language_code: str = DATAFORSEO_LANGUAGE_CODE_EN,
    ) -> dict:
        """Google Ads search_volume (NOT Labs): volume/CPC/competition for up to 1000 keywords."""
        if len(keywords) > 1000:
            raise ValueError("search_volume supports max 1000 keywords per call")
        payload = [
            {
                "keywords": keywords,
                "location_code": location_code,
                "language_code": language_code,
            }
        ]
        return self._post_paid(
            "keywords_data/google_ads/search_volume/live",
            payload,
            site_key=site_key,
            expected_rows=len(keywords),
            seed_keyword=f"sv:{len(keywords)}kw",
        )

    def historical_search_volume(
        self,
        *,
        site_key: str,
        keywords: list[str],
        location_code: int = DATAFORSEO_LOCATION_CODE_UK,
        language_code: str = DATAFORSEO_LANGUAGE_CODE_EN,
    ) -> dict:
        """Labs historical monthly volumes — spike detection + time-travel backtests."""
        if len(keywords) > 700:
            raise ValueError("historical_search_volume: keep batches <=700 keywords")
        payload = [
            {
                "keywords": keywords,
                "location_code": location_code,
                "language_code": language_code,
            }
        ]
        return self._post_paid(
            "dataforseo_labs/google/historical_search_volume/live",
            payload,
            site_key=site_key,
            expected_rows=len(keywords),
            seed_keyword=f"hsv:{len(keywords)}kw",
        )

    def serp_organic(
        self,
        *,
        site_key: str,
        query: str,
        depth: int = 10,
        location_code: int = DATAFORSEO_LOCATION_CODE_UK,
        language_code: str = DATAFORSEO_LANGUAGE_CODE_EN,
    ) -> dict:
        """SERP organic live advanced — fallback when Serper is unavailable."""
        payload = [
            {
                "keyword": query,
                "location_code": location_code,
                "language_code": language_code,
                "depth": depth,
            }
        ]
        return self._post_paid(
            "serp/google/organic/live/advanced",
            payload,
            site_key=site_key,
            seed_keyword=query,
        )

    def bulk_keyword_difficulty(
        self,
        *,
        site_key: str,
        keywords: list[str],
        location_code: int = DATAFORSEO_LOCATION_CODE_UK,
        language_code: str = DATAFORSEO_LANGUAGE_CODE_EN,
    ) -> dict:
        if len(keywords) > 1000:
            raise ValueError("bulk_keyword_difficulty supports max 1000 keywords per call")
        payload = [
            {
                "keywords": keywords,
                "location_code": location_code,
                "language_code": language_code,
            }
        ]
        return self._post_paid(
            "dataforseo_labs/google/bulk_keyword_difficulty/live",
            payload,
            site_key=site_key,
            seed_keyword=f"bulk_kd:{len(keywords)}kw",
        )

    def bulk_ranks(self, *, site_key: str, targets: list[str]) -> dict:
        """Backlinks bulk domain-rank score (0-1000-ish authority proxy) for
        up to 1000 domains per call. Used by niche_screener's
        new_domain_viability component."""
        if len(targets) > 1000:
            raise ValueError("bulk_ranks supports max 1000 targets per call")
        payload = [{"targets": targets}]
        return self._post_paid(
            "backlinks/bulk_ranks/live",
            payload,
            site_key=site_key,
            expected_rows=len(targets),
            seed_keyword=f"bulk_ranks:{len(targets)}dom",
        )

    def domain_intersection(
        self,
        domain1: str,
        domain2: str,
        *,
        site_key: str,
        limit: int = 500,
    ) -> dict:
        """Keywords both domains rank for, with each domain's SERP element per keyword."""
        payload = [
            {
                "target1": domain1,
                "target2": domain2,
                "location_code": DATAFORSEO_LOCATION_CODE_UK,
                "language_code": DATAFORSEO_LANGUAGE_CODE_EN,
                "limit": limit,
                "include_serp_info": False,
            }
        ]
        return self._post_paid(
            "dataforseo_labs/google/domain_intersection/live",
            payload,
            site_key=site_key,
            expected_rows=limit,
            seed_keyword=f"intersect:{domain1}|{domain2}",
        )

    def keyword_ideas(
        self,
        keywords: list[str],
        *,
        site_key: str,
        limit: int = 300,
    ) -> dict:
        """Keyword ideas seeded from up to 200 keywords (broader net than keyword_suggestions' single seed)."""
        payload = [
            {
                "keywords": keywords,
                "location_code": DATAFORSEO_LOCATION_CODE_UK,
                "language_code": DATAFORSEO_LANGUAGE_CODE_EN,
                "limit": limit,
            }
        ]
        return self._post_paid(
            "dataforseo_labs/google/keyword_ideas/live",
            payload,
            site_key=site_key,
            expected_rows=limit,
            seed_keyword=f"ideas:{len(keywords)}kw",
        )


# ----- Persistence helpers -------------------------------------------------


def persist_keyword_suggestions(
    *,
    site_key: str,
    seed_keyword: str,
    response: dict,
) -> int:
    """Flatten keyword_suggestions response into dataforseo_keyword_data rows.

    DataForSEO Labs keyword_suggestions items are FLAT: keyword, keyword_info,
    keyword_properties, search_intent_info are all at the item's top level.
    There is no 'keyword_data' wrapper for this endpoint.
    """
    rows_out: list[dict] = []
    tasks = response.get("tasks", []) or []
    for task in tasks:
        for result in task.get("result", []) or []:
            for item in result.get("items", []) or []:
                ki = item.get("keyword_info") or {}
                kp = item.get("keyword_properties") or {}
                si = item.get("search_intent_info") or {}
                rows_out.append(
                    {
                        "site_key": site_key,
                        "endpoint": "keyword_suggestions/live",
                        "seed_keyword": seed_keyword,
                        "location_code": DATAFORSEO_LOCATION_CODE_UK,
                        "language_code": DATAFORSEO_LANGUAGE_CODE_EN,
                        "related_keyword": item.get("keyword"),
                        "search_volume": ki.get("search_volume"),
                        "cpc": ki.get("cpc"),
                        "competition": ki.get("competition"),
                        "competition_level": ki.get("competition_level"),
                        "keyword_difficulty": kp.get("keyword_difficulty"),
                        "search_intent": si.get("main_intent"),
                        "raw_response": item,
                    }
                )
    return _bulk_insert("dataforseo_keyword_data", rows_out)


def persist_related_keywords(
    *,
    site_key: str,
    seed_keyword: str,
    response: dict,
) -> int:
    """Related keywords items have a `keyword_data` wrapper (different from suggestions)."""
    rows_out: list[dict] = []
    tasks = response.get("tasks", []) or []
    for task in tasks:
        for result in task.get("result", []) or []:
            for item in result.get("items", []) or []:
                kw_data = item.get("keyword_data") or {}
                ki = kw_data.get("keyword_info") or {}
                kp = kw_data.get("keyword_properties") or {}
                si = kw_data.get("search_intent_info") or {}
                rows_out.append(
                    {
                        "site_key": site_key,
                        "endpoint": "related_keywords/live",
                        "seed_keyword": seed_keyword,
                        "location_code": DATAFORSEO_LOCATION_CODE_UK,
                        "language_code": DATAFORSEO_LANGUAGE_CODE_EN,
                        "related_keyword": kw_data.get("keyword"),
                        "search_volume": ki.get("search_volume"),
                        "cpc": ki.get("cpc"),
                        "competition": ki.get("competition"),
                        "competition_level": ki.get("competition_level"),
                        "keyword_difficulty": kp.get("keyword_difficulty"),
                        "search_intent": si.get("main_intent"),
                        "raw_response": item,
                    }
                )
    return _bulk_insert("dataforseo_keyword_data", rows_out)


def persist_keywords_for_site(
    *,
    site_key: str,
    target_domain: str,
    response: dict,
) -> int:
    """Flat top-level structure: keyword, keyword_info, etc. (same as keyword_suggestions)."""
    rows_out: list[dict] = []
    tasks = response.get("tasks", []) or []
    for task in tasks:
        for result in task.get("result", []) or []:
            for item in result.get("items", []) or []:
                ki = item.get("keyword_info") or {}
                kp = item.get("keyword_properties") or {}
                si = item.get("search_intent_info") or {}
                rows_out.append(
                    {
                        "site_key": site_key,
                        "endpoint": "keywords_for_site/live",
                        "seed_keyword": f"site:{target_domain}",
                        "location_code": DATAFORSEO_LOCATION_CODE_UK,
                        "language_code": DATAFORSEO_LANGUAGE_CODE_EN,
                        "related_keyword": item.get("keyword"),
                        "search_volume": ki.get("search_volume"),
                        "cpc": ki.get("cpc"),
                        "competition": ki.get("competition"),
                        "competition_level": ki.get("competition_level"),
                        "keyword_difficulty": kp.get("keyword_difficulty"),
                        "search_intent": si.get("main_intent"),
                        "raw_response": item,
                    }
                )
    return _bulk_insert("dataforseo_keyword_data", rows_out)


def persist_bulk_keyword_difficulty(
    *,
    site_key: str,
    response: dict,
) -> int:
    rows_out: list[dict] = []
    tasks = response.get("tasks", []) or []
    for task in tasks:
        for result in task.get("result", []) or []:
            for item in result.get("items", []) or []:
                rows_out.append(
                    {
                        "site_key": site_key,
                        "endpoint": "bulk_keyword_difficulty/live",
                        "location_code": DATAFORSEO_LOCATION_CODE_UK,
                        "language_code": DATAFORSEO_LANGUAGE_CODE_EN,
                        "related_keyword": item.get("keyword"),
                        "keyword_difficulty": item.get("keyword_difficulty"),
                        "raw_response": item,
                    }
                )
    return _bulk_insert("dataforseo_keyword_data", rows_out)


def persist_competitors_domain(
    *,
    site_key: str,
    response: dict,
) -> int:
    rows_out: list[dict] = []
    tasks = response.get("tasks", []) or []
    for task in tasks:
        for result in task.get("result", []) or []:
            for item in result.get("items", []) or []:
                rows_out.append(
                    {
                        "site_key": site_key,
                        "competitor_domain": item.get("domain"),
                        "intersection_count": item.get("intersections"),
                        "competitor_rank_score": item.get("competitor_metrics", {}).get("organic", {}).get("count"),
                        "raw_response": item,
                    }
                )
    return _bulk_insert("dataforseo_competitor_data", rows_out)


def persist_ranked_keywords(
    *,
    site_key: str,
    competitor_domain: str,
    response: dict,
) -> int:
    rows_out: list[dict] = []
    tasks = response.get("tasks", []) or []
    for task in tasks:
        for result in task.get("result", []) or []:
            for item in result.get("items", []) or []:
                kw_data = item.get("keyword_data", {}) or {}
                ki = kw_data.get("keyword_info", {}) or {}
                ranked = item.get("ranked_serp_element", {}) or {}
                serp = (ranked.get("serp_item") or {})
                rows_out.append(
                    {
                        "site_key": site_key,
                        "competitor_domain": competitor_domain,
                        "ranked_keyword": kw_data.get("keyword"),
                        "position": serp.get("rank_absolute"),
                        "search_volume": ki.get("search_volume"),
                        "cpc": ki.get("cpc"),
                        "url": serp.get("url"),
                        "raw_response": item,
                    }
                )
    return _bulk_insert("dataforseo_competitor_data", rows_out)


def persist_domain_intersection(
    *,
    site_key: str,
    domain1: str,
    domain2: str,
    response: dict,
) -> int:
    """Domain intersection items wrap one keyword_data block (keyword +
    keyword_info) plus a SERP element per domain: first_domain_serp_element
    (domain1's ranking for that keyword) and second_domain_serp_element
    (domain2's). Unlike competitors_domain/ranked_keywords rows (one domain
    per row), each intersecting keyword covers both domains at once, so this
    emits two rows per item -- one per domain -- into the same
    dataforseo_competitor_data shape persist_ranked_keywords uses.
    """
    rows_out: list[dict] = []
    tasks = response.get("tasks", []) or []
    for task in tasks:
        for result in task.get("result", []) or []:
            for item in result.get("items", []) or []:
                kw_data = item.get("keyword_data", {}) or {}
                ki = kw_data.get("keyword_info", {}) or {}
                keyword = kw_data.get("keyword")
                for domain, serp_key in (
                    (domain1, "first_domain_serp_element"),
                    (domain2, "second_domain_serp_element"),
                ):
                    serp = item.get(serp_key) or {}
                    rows_out.append(
                        {
                            "site_key": site_key,
                            "competitor_domain": domain,
                            "ranked_keyword": keyword,
                            "position": serp.get("rank_absolute"),
                            "search_volume": ki.get("search_volume"),
                            "cpc": ki.get("cpc"),
                            "url": serp.get("url"),
                            "raw_response": item,
                        }
                    )
    return _bulk_insert("dataforseo_competitor_data", rows_out)


def persist_keyword_ideas(
    *,
    site_key: str,
    seed_keywords: list[str],
    response: dict,
) -> int:
    """Flatten keyword_ideas response into dataforseo_keyword_data rows.

    TRAP: keyword_ideas items are FLAT (keyword, keyword_info,
    keyword_properties, search_intent_info all at the item's top level),
    same as keyword_suggestions -- NOT wrapped in a keyword_data block like
    related_keywords/ranked_keywords. Follows persist_keywords_for_site.
    """
    rows_out: list[dict] = []
    tasks = response.get("tasks", []) or []
    for task in tasks:
        for result in task.get("result", []) or []:
            for item in result.get("items", []) or []:
                ki = item.get("keyword_info") or {}
                kp = item.get("keyword_properties") or {}
                si = item.get("search_intent_info") or {}
                rows_out.append(
                    {
                        "site_key": site_key,
                        "endpoint": "keyword_ideas/live",
                        "seed_keyword": ",".join(seed_keywords[:5]),
                        "location_code": DATAFORSEO_LOCATION_CODE_UK,
                        "language_code": DATAFORSEO_LANGUAGE_CODE_EN,
                        "related_keyword": item.get("keyword"),
                        "search_volume": ki.get("search_volume"),
                        "cpc": ki.get("cpc"),
                        "competition": ki.get("competition"),
                        "competition_level": ki.get("competition_level"),
                        "keyword_difficulty": kp.get("keyword_difficulty"),
                        "search_intent": si.get("main_intent"),
                        "raw_response": item,
                    }
                )
    return _bulk_insert("dataforseo_keyword_data", rows_out)


def _bulk_insert(table: str, rows: list[dict]) -> int:
    if not rows:
        return 0
    url = f"{SUPABASE_URL}/rest/v1/{table}"
    inserted = 0
    for i in range(0, len(rows), 500):
        chunk = rows[i : i + 500]
        r = httpx.post(
            url,
            headers={**_supabase_headers(), "Prefer": "return=minimal"},
            json=chunk,
            timeout=60.0,
        )
        if r.status_code >= 300:
            print(f"[DFS] {table} insert chunk {i} failed: {r.status_code} {r.text[:200]}")
            continue
        inserted += len(chunk)
    return inserted


if __name__ == "__main__":
    # Smoke test: balance check only (free)
    client = DataForSEOClient()
    info = client.get_account_balance()
    money = info.get("tasks", [{}])[0].get("result", [{}])[0] if info.get("tasks") else {}
    print(json.dumps(money, indent=2))
