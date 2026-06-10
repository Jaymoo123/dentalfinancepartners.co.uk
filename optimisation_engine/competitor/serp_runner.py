"""
SERP runner: for every page+query pair in our GSC data, fetch the top
organic competitor URLs from Serper and store in competitor_serps +
competitor_pages. Then trigger page parsing for each competitor URL.

Idempotent: competitor_serps has UNIQUE(site_key, query, fetch_date).
Re-running on the same day is a no-op (ON CONFLICT DO NOTHING).
"""
from __future__ import annotations

import sys
import os
from datetime import date
from typing import Any

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.competitor._db import _esc, _sql
from optimisation_engine.competitor.page_parser import fetch_and_store
from optimisation_engine.clients.ddg_serp_client import fetch_organic_results


# ---------------------------------------------------------------------------
# Query selection
# ---------------------------------------------------------------------------

def get_pages_to_analyse(site_key: str) -> list[dict]:
    """Return one row per unique page: (page_url, primary_query, avg_position).

    primary_query = highest-impressions query for that page over 28 days.
    Only pages with >= 5 impressions are included.
    """
    rows = _sql(f"""
        SELECT DISTINCT ON (page_url)
            site_key,
            page_url,
            query AS primary_query,
            ROUND(AVG(position)::NUMERIC, 1) AS avg_position,
            SUM(impressions) AS total_impressions
        FROM gsc_query_data
        WHERE site_key = {_esc(site_key)}
          AND date >= CURRENT_DATE - 28
        GROUP BY site_key, page_url, query
        HAVING SUM(impressions) > 0
        ORDER BY page_url, SUM(impressions) DESC
    """)
    return rows


def _priority_score(avg_position: float | None) -> float:
    """Position-only priority score. Used to decide processing order."""
    pos = float(avg_position or 100)
    if pos <= 20:
        return 10 - (pos - 1) * (9 / 49)
    return max(1.0, 5 - (pos - 20) * 0.1)


# ---------------------------------------------------------------------------
# SERP storage
# ---------------------------------------------------------------------------

def _upsert_serp(site_key: str, query: str, our_page_url: str | None, our_position: float | None) -> str | None:
    """Insert/update a competitor_serps row. Returns the id."""
    today = date.today().isoformat()
    rows = _sql(f"""
        INSERT INTO competitor_serps (site_key, query, our_page_url, our_position, fetch_date)
        VALUES ({_esc(site_key)}, {_esc(query)}, {_esc(our_page_url)}, {_esc(our_position)}, '{today}')
        ON CONFLICT (site_key, query, fetch_date) DO UPDATE SET
            our_page_url = EXCLUDED.our_page_url,
            our_position = EXCLUDED.our_position,
            fetched_at   = NOW()
        RETURNING id
    """)
    return rows[0]["id"] if rows else None


def _insert_competitor_pages(serp_id: str, results: list[dict]) -> None:
    """Insert competitor page rows. Skips duplicates (no unique index — we
    delete+reinsert on re-run or rely on idempotent serp upsert)."""
    if not results:
        return
    values = ", ".join(
        f"({_esc(serp_id)}, {_esc(r['position'])}, {_esc(r['link'])}, "
        f"{_esc(r['domain'])}, {_esc(r['title'])}, {_esc(r['snippet'])})"
        for r in results
    )
    _sql(f"""
        INSERT INTO competitor_pages (serp_id, position, url, domain, title, snippet)
        VALUES {values}
        ON CONFLICT DO NOTHING
    """)


def _update_competitor_content_map_id(serp_id: str, url: str, content_map_id: str) -> None:
    _sql(f"""
        UPDATE competitor_pages
        SET content_map_id = {_esc(content_map_id)}
        WHERE serp_id = {_esc(serp_id)} AND url = {_esc(url)}
    """)


# ---------------------------------------------------------------------------
# Main runner
# ---------------------------------------------------------------------------

def run_serps(
    site_key: str,
    *,
    max_pages: int | None = None,
    parse_competitors: bool = True,
    n_competitors: int = 3,
    skip_our_pages: bool = False,
) -> dict[str, Any]:
    """
    For every page with GSC impressions:
    1. Fetch Serper SERP for the primary query
    2. Store competitor_serps + competitor_pages rows
    3. Optionally parse our page + top N competitor pages via page_parser

    Args:
        site_key: e.g. "property"
        max_pages: limit to first N pages (for dev runs)
        parse_competitors: if True, fetch + parse competitor HTML
        n_competitors: how many competitor pages to parse per query
        skip_our_pages: if True, skip parsing our own pages
    """
    pages = get_pages_to_analyse(site_key)
    # Sort by priority (near page 1 first)
    pages.sort(key=lambda p: -_priority_score(p.get("avg_position")))

    if max_pages:
        pages = pages[:max_pages]

    print(f"[serp_runner] {site_key}: {len(pages)} pages to process")
    today = date.today().isoformat()

    # Pre-fetch all queries already processed today — single DB call for the whole batch
    already_done_rows = _sql(f"""
        SELECT query FROM competitor_serps
        WHERE site_key = {_esc(site_key)} AND fetch_date = '{today}'
    """)
    already_done: set[str] = {r["query"] for r in already_done_rows}
    if already_done:
        print(f"[serp_runner] {len(already_done)} queries already fetched today — will skip")

    summary: dict[str, Any] = {
        "site_key": site_key,
        "pages_processed": 0,
        "serps_fetched": 0,
        "competitors_parsed": 0,
        "our_pages_parsed": 0,
        "errors": [],
    }

    for page in pages:
        our_url = page["page_url"]
        query = page["primary_query"]
        our_pos = float(page.get("avg_position") or 0)

        print(f"\n  query: {query[:60]} | pos={our_pos} | {our_url[:60]}")

        # 1. Skip if already fetched today (idempotency — avoids redundant DDG calls)
        if query in already_done:
            print(f"    already fetched today — skipping")
            summary["serps_fetched"] += 1
            summary["pages_processed"] += 1
            continue

        # 2. Fetch SERP
        try:
            serp_results = fetch_organic_results(query, num=n_competitors + 2, site_key=site_key)
        except Exception as exc:
            print(f"    CSE error: {exc}")
            summary["errors"].append({"query": query, "error": str(exc)})
            continue

        if not serp_results:
            print(f"    CSE returned no results")
            summary["serps_fetched"] += 1
            continue

        # Filter out our own domain from competitor results
        our_domain = _domain_of(our_url)
        competitor_results = [r for r in serp_results if our_domain not in (r.get("domain") or "")][:n_competitors]

        # 3. Store SERP rows
        serp_id = _upsert_serp(site_key, query, our_url, our_pos)
        if serp_id:
            _insert_competitor_pages(serp_id, competitor_results)
        summary["serps_fetched"] += 1

        # 4. Parse our own page
        if not skip_our_pages:
            try:
                our_id = fetch_and_store(
                    our_url, query, is_our_page=True, site_key=site_key
                )
                if our_id:
                    summary["our_pages_parsed"] += 1
            except Exception as exc:
                print(f"    Our page parse error: {exc}")
                summary["errors"].append({"url": our_url, "error": str(exc)})

        # 5. Parse competitor pages
        if parse_competitors:
            for comp in competitor_results:
                comp_url = comp.get("link") or ""
                if not comp_url:
                    continue
                try:
                    comp_id = fetch_and_store(comp_url, query)
                    if comp_id and serp_id:
                        _update_competitor_content_map_id(serp_id, comp_url, comp_id)
                    if comp_id:
                        summary["competitors_parsed"] += 1
                except Exception as exc:
                    print(f"    Competitor parse error {comp_url[:60]}: {exc}")
                    summary["errors"].append({"url": comp_url, "error": str(exc)})

        summary["pages_processed"] += 1

    print(f"\n[serp_runner] done: {summary}")
    return summary


def _domain_of(url: str) -> str:
    if not url:
        return ""
    from urllib.parse import urlparse
    netloc = urlparse(url).netloc.lower()
    return netloc.lstrip("www.").split(":")[0]
