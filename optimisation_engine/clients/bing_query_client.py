"""
Bing Webmaster Tools query-level fetcher.

Persists per-page query stats into public.bing_query_data, mirroring
clients/gsc_query_client.py. Unlike GSC, the Bing Webmaster Tools API returns
trailing-window AGGREGATES (no per-date dimension on query stats), so each
fetch is stored as a single snapshot dated today (the `date` column);
re-running merges idempotently via the (site_key, page_url, query, date)
unique constraint.

API: GET https://ssl.bing.com/webmaster/api.svc/json/<Method>?apikey=<KEY>
Auth: BING_WEBMASTER_API_KEY in .env. The site must be verified in BWT.

Methods used:
  GetUserSites                         -> validate key + list verified sites
  GetPageStats(siteUrl)                -> pages BWT has data for (URL in .Query)
  GetPageQueryStats(siteUrl, page)     -> queries a given page ranks for
  GetQueryStats(siteUrl)               -> site-level top queries (optional)
  GetAiPerformance(siteUrl)            -> Copilot AI citation counts per page
                                         (GEO Measurement -- Track B).

NOTE on GetAiPerformance:
  As of 2026-06-17 the Bing Webmaster Tools public documentation describes an
  AI Performance Report accessible via the BWT dashboard. A corresponding
  JSON API method is expected to follow the same envelope shape as GetQueryStats
  ({"d": [{"Query": ..., "Impressions": ..., "Clicks": ...}, ...]}) with an
  added "AiCitations" field per URL. The method name assumed here is
  "GetAiPerformance" and the siteUrl parameter is identical to other methods.

  ASSUMPTION FLAG: the exact API method name and response field names are
  inferred from BWT API conventions and public dashboard feature naming.
  If the live endpoint uses a different method name (e.g. "GetCopilotStats"
  or "GetAIPerformance") the _call() in BingWebmasterClient will surface a
  non-200 HTTP error at runtime -- update the method name constant
  AI_PERF_METHOD accordingly. The storage table schema (bing_ai_performance)
  is designed to accommodate whatever field mapping is needed.
"""
from __future__ import annotations

import os
import sys
import time
from datetime import date
from typing import Any, Iterable

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(ROOT, ".env"))
except ImportError:
    pass

SUPABASE_ACCESS_TOKEN: str = os.getenv("SUPABASE_ACCESS_TOKEN", "")
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
MGMT_URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"

BING_API_KEY: str = os.getenv("BING_WEBMASTER_API_KEY", "")
BING_BASE = "https://ssl.bing.com/webmaster/api.svc/json"

# ASSUMPTION: method name inferred from BWT dashboard naming. Update here if
# the live endpoint uses a different name (e.g. "GetCopilotStats").
AI_PERF_METHOD = "GetAiPerformance"

# BWT-verified site URL per site_key (from GetUserSites). Override with --site-url.
# _resolve_site_url matches by host (www-insensitive), so these need only be close.
DEFAULT_SITE_URL = {
    "property":         "https://propertytaxpartners.co.uk",
    "dentists":         "https://www.dentalfinancepartners.co.uk",
    "medical":          "https://medicalaccounts.co.uk",
    "solicitors":       "https://accountsforlawyers.co.uk",
    "generalist":       "https://hollowaydavies.co.uk",
    "agency":           "https://agencyfounderfinance.co.uk",
    "contractors-ir35": "https://www.contractortaxaccountants.co.uk",
    "construction-cis": "https://www.tradetaxspecialists.co.uk",
}


def _mgmt_sql(query: str) -> None:
    r = httpx.post(
        MGMT_URL,
        headers={"Authorization": f"Bearer {SUPABASE_ACCESS_TOKEN}", "Content-Type": "application/json"},
        json={"query": query},
        timeout=60.0,
    )
    r.raise_for_status()


def _esc(v: Any) -> str:
    return str(v).replace("'", "''")


class BingWebmasterClient:
    """Thin wrapper over the Bing Webmaster Tools JSON API."""

    def __init__(self, api_key: str | None = None) -> None:
        self.api_key = api_key or BING_API_KEY
        if not self.api_key:
            raise ValueError("BING_WEBMASTER_API_KEY not set in .env")

    def _call(self, method: str, params: dict | None = None) -> Any:
        params = dict(params or {})
        params["apikey"] = self.api_key
        r = httpx.get(f"{BING_BASE}/{method}", params=params, timeout=60.0)
        r.raise_for_status()
        data = r.json()
        # BWT wraps results in a {"d": ...} envelope.
        return data.get("d", data) if isinstance(data, dict) else data

    def get_user_sites(self) -> list[dict]:
        return self._call("GetUserSites") or []

    def get_query_stats(self, site_url: str) -> list[dict]:
        return self._call("GetQueryStats", {"siteUrl": site_url}) or []

    def get_page_stats(self, site_url: str) -> list[dict]:
        return self._call("GetPageStats", {"siteUrl": site_url}) or []

    def get_page_query_stats(self, site_url: str, page: str) -> list[dict]:
        return self._call("GetPageQueryStats", {"siteUrl": site_url, "page": page}) or []

    def get_ai_performance(self, site_url: str) -> list[dict]:
        """Fetch per-page Copilot AI citation data from BWT.

        ASSUMPTION: method name is 'GetAiPerformance' (inferred from BWT
        dashboard naming conventions). The response is expected to follow the
        standard {"d": [...]} envelope. Each item in the list is expected to
        carry at minimum:
          "Query"      -- the page URL (reuses QueryStats shape, URL in .Query)
          "Impressions"-- number of times the page appeared in a Copilot response
          "Clicks"     -- clicks from Copilot citations (if reported separately)
          "AiCitations"-- Copilot citation count (may be same as Impressions or
                          a distinct field; stored in both columns with COALESCE)
          "GroundingQueries" -- the Copilot queries that grounded to this page
                          (stored as JSON array if present)

        If the endpoint does not exist yet (404 / method-not-found response),
        httpx will raise an HTTPStatusError and the caller should catch it.
        See AI_PERF_METHOD constant if the name needs changing.
        """
        return self._call(AI_PERF_METHOD, {"siteUrl": site_url}) or []


def _as_url(stat: dict) -> str:
    """GetPageStats reuses the QueryStats shape with the page URL in .Query.
    Tolerate a few field-name variants just in case."""
    for k in ("Query", "Page", "Url", "URL"):
        v = stat.get(k)
        if v and str(v).startswith("http"):
            return str(v)
    return ""


class BingQueryFetcher:
    """Fetch per-page query stats from BWT and write to public.bing_query_data."""

    def __init__(self, site_key: str, site_url: str | None = None) -> None:
        self.site_key = site_key
        self.site_url = (site_url or DEFAULT_SITE_URL.get(site_key) or "").rstrip("/")
        if not self.site_url:
            raise ValueError(f"No BWT site_url for site_key={site_key}; pass --site-url.")
        self.client = BingWebmasterClient()

    def _resolve_site_url(self) -> str:
        """Validate the key and pin the exact verified site URL string BWT expects."""
        sites = self.client.get_user_sites()
        urls = [s.get("Url", "").rstrip("/") for s in sites if s.get("Url")]
        if not urls:
            raise RuntimeError("BWT GetUserSites returned no verified sites for this API key.")
        host = self.site_url.split("//")[-1].split("/")[0].replace("www.", "")
        for u in urls:
            if host in u:
                return u  # exact verified string (trailing slash already stripped)
        raise RuntimeError(
            f"Site {self.site_url} not found among BWT-verified sites: {urls}. "
            "Verify the site in Bing Webmaster Tools first."
        )

    def fetch_and_store(self, pages: list[str] | None = None, sleep: float = 0.4) -> int:
        snap = date.today().strftime("%Y-%m-%d")
        site = self._resolve_site_url()
        print(f"[BING-Q] {self.site_key} site={site} snapshot={snap}")

        if pages is None:
            page_stats = self.client.get_page_stats(site)
            pages = [u for u in (_as_url(p) for p in page_stats) if u]
            print(f"[BING-Q] {self.site_key} GetPageStats -> {len(pages)} pages with Bing data")
        else:
            print(f"[BING-Q] {self.site_key} explicit page list -> {len(pages)} pages")

        records: list[tuple] = []
        for i, pg in enumerate(pages):
            try:
                qs = self.client.get_page_query_stats(site, pg)
            except Exception as exc:
                print(f"[BING-Q]   page {i} {pg} error: {exc}")
                continue
            for q in qs:
                impr = int(q.get("Impressions", 0) or 0)
                clk = int(q.get("Clicks", 0) or 0)
                pos = float(q.get("AvgImpressionPosition", 0) or 0)
                ctr = round(clk / impr, 4) if impr else 0.0
                query = q.get("Query", "")
                if not query:
                    continue
                records.append((pg, query, snap, impr, clk, ctr, pos))
            if sleep:
                time.sleep(sleep)

        if not records:
            print(f"[BING-Q] {self.site_key} no (page, query) rows collected")
            return 0
        return self._upsert(records)

    def _upsert(self, records: Iterable[tuple]) -> int:
        records = list(records)
        # Dedupe by the unique key (page_url, query) for this snapshot: Bing can
        # return the same query more than once per page, and a single
        # INSERT ... ON CONFLICT cannot affect the same row twice (Postgres
        # 21000). Keep the last occurrence.
        _seen: dict[tuple, tuple] = {}
        for _r in records:
            _seen[(_r[0], _r[1])] = _r
        records = list(_seen.values())
        inserted = 0
        chunk_size = 500
        for i in range(0, len(records), chunk_size):
            chunk = records[i: i + chunk_size]
            values = ", ".join(
                f"('{_esc(self.site_key)}', '{_esc(page_url)}', '{_esc(query)}', "
                f"'{date_str}', {impressions}, {clicks}, {ctr}, {position})"
                for page_url, query, date_str, impressions, clicks, ctr, position in chunk
            )
            sql = f"""
                INSERT INTO bing_query_data
                    (site_key, page_url, query, date, impressions, clicks, ctr, position)
                VALUES {values}
                ON CONFLICT (site_key, page_url, query, date) DO UPDATE SET
                    impressions = EXCLUDED.impressions,
                    clicks      = EXCLUDED.clicks,
                    ctr         = EXCLUDED.ctr,
                    position    = EXCLUDED.position
            """
            try:
                _mgmt_sql(sql)
                inserted += len(chunk)
            except Exception as exc:
                print(f"[BING-Q] chunk {i} upsert failed: {exc}")
        print(f"[BING-Q] {self.site_key} upserted {inserted} rows to bing_query_data")
        return inserted


class BingAiPerformanceFetcher:
    """Fetch Copilot AI Performance data from BWT and write to bing_ai_performance.

    Mirrors the BingQueryFetcher pattern:
      * resolves the verified BWT site URL via GetUserSites
      * calls GetAiPerformance(siteUrl) -> list of per-URL citation rows
      * upserts into public.bing_ai_performance via the Supabase Management API
        (same _mgmt_sql / _esc helpers as BingQueryFetcher)

    Storage table: public.bing_ai_performance (see migration
    20260617000003_vw_probable_ai_direct.sql companion table if added, or apply
    the CREATE TABLE below via a separate migration if not yet applied).

    SCHEMA (expected, not yet in a migration file):
      bing_ai_performance (
        id           uuid primary key default gen_random_uuid(),
        fetched_at   timestamptz default now(),
        site_key     text references sites(site_key),
        page_url     text,
        date         date,           -- snapshot date (today)
        ai_citations integer,        -- Copilot citation impressions
        clicks       integer,        -- clicks from Copilot citations
        grounding_queries jsonb,     -- raw grounding query list if available
        unique (site_key, page_url, date)
      )

    Run `python -m optimisation_engine.clients.bing_query_client --ai-inspect`
    to probe the raw API shape before wiring to the table.
    """

    TABLE = "bing_ai_performance"

    def __init__(self, site_key: str, site_url: str | None = None) -> None:
        self.site_key = site_key
        self.site_url = (site_url or DEFAULT_SITE_URL.get(site_key) or "").rstrip("/")
        if not self.site_url:
            raise ValueError(f"No BWT site_url for site_key={site_key}; pass --site-url.")
        self.client = BingWebmasterClient()

    def _resolve_site_url(self) -> str:
        """Reuse the same verified-URL resolution logic as BingQueryFetcher."""
        sites = self.client.get_user_sites()
        urls = [s.get("Url", "").rstrip("/") for s in sites if s.get("Url")]
        if not urls:
            raise RuntimeError("BWT GetUserSites returned no verified sites for this API key.")
        host = self.site_url.split("//")[-1].split("/")[0].replace("www.", "")
        for u in urls:
            if host in u:
                return u
        raise RuntimeError(
            f"Site {self.site_url} not found among BWT-verified sites: {urls}. "
            "Verify the site in Bing Webmaster Tools first."
        )

    def fetch_and_store(self) -> int:
        snap = date.today().strftime("%Y-%m-%d")
        site = self._resolve_site_url()
        print(f"[BING-AI] {self.site_key} site={site} snapshot={snap} method={AI_PERF_METHOD}")

        try:
            rows = self.client.get_ai_performance(site)
        except Exception as exc:
            print(
                f"[BING-AI] {self.site_key} GetAiPerformance failed: {type(exc).__name__}: {exc}\n"
                f"         (If 404/400: the API endpoint may not yet exist or the method name "
                f"         may differ -- update AI_PERF_METHOD constant in this file.)"
            )
            return 0

        if not rows:
            print(f"[BING-AI] {self.site_key} no rows returned by {AI_PERF_METHOD}")
            return 0

        print(f"[BING-AI] {self.site_key} {AI_PERF_METHOD} -> {len(rows)} rows")
        return self._upsert(rows, snap)

    def _upsert(self, rows: list[dict], snap: str) -> int:
        import json as _json

        records: list[tuple] = []
        for row in rows:
            # Tolerate the URL appearing in .Query, .Page, or .Url (same as _as_url)
            page_url = ""
            for k in ("Query", "Page", "Url", "URL"):
                v = row.get(k, "")
                if v and str(v).startswith("http"):
                    page_url = str(v)
                    break
            if not page_url:
                continue

            # Citation count: prefer AiCitations field; fall back to Impressions
            ai_citations = int(
                row.get("AiCitations") or row.get("Impressions") or 0
            )
            clicks = int(row.get("Clicks") or 0)

            # Grounding queries: may be a list or a JSON string
            gq_raw = row.get("GroundingQueries") or row.get("groundingQueries")
            if isinstance(gq_raw, list):
                grounding_queries = _json.dumps(gq_raw)
            elif isinstance(gq_raw, str):
                grounding_queries = gq_raw
            else:
                grounding_queries = "null"

            records.append((page_url, snap, ai_citations, clicks, grounding_queries))

        if not records:
            print(f"[BING-AI] {self.site_key} no valid page_url rows to upsert")
            return 0

        # Dedupe by (page_url) for this snapshot
        _seen: dict[str, tuple] = {}
        for r in records:
            _seen[r[0]] = r
        records = list(_seen.values())

        inserted = 0
        chunk_size = 500
        for i in range(0, len(records), chunk_size):
            chunk = records[i : i + chunk_size]
            values = ", ".join(
                f"('{_esc(self.site_key)}', '{_esc(page_url)}', '{date_str}', "
                f"{ai_citations}, {clicks}, '{_esc(grounding_queries)}'::jsonb)"
                for page_url, date_str, ai_citations, clicks, grounding_queries in chunk
            )
            sql = f"""
                INSERT INTO {self.TABLE}
                    (site_key, page_url, date, ai_citations, clicks, grounding_queries)
                VALUES {values}
                ON CONFLICT (site_key, page_url, date) DO UPDATE SET
                    ai_citations       = EXCLUDED.ai_citations,
                    clicks             = EXCLUDED.clicks,
                    grounding_queries  = EXCLUDED.grounding_queries,
                    fetched_at         = now()
            """
            try:
                _mgmt_sql(sql)
                inserted += len(chunk)
            except Exception as exc:
                print(f"[BING-AI] chunk {i} upsert failed: {exc}")
        print(f"[BING-AI] {self.site_key} upserted {inserted} rows to {self.TABLE}")
        return inserted


def _inspect() -> None:
    """Probe the API and dump raw response shapes (no DB writes)."""
    import json
    c = BingWebmasterClient()
    print("=== GetUserSites ===")
    sites = c.get_user_sites()
    print(json.dumps(sites, indent=2, default=str)[:2000])
    if not sites:
        return
    site_url = (sites[0].get("Url") or "").rstrip("/")
    print(f"\n=== GetPageStats({site_url}) [first 3] ===")
    ps = c.get_page_stats(site_url)
    print(f"(count={len(ps)})")
    print(json.dumps(ps[:3], indent=2, default=str))
    if ps:
        pg = _as_url(ps[0])
        print(f"\n=== GetPageQueryStats({pg}) [first 5] ===")
        qs = c.get_page_query_stats(site_url, pg)
        print(f"(count={len(qs)})")
        print(json.dumps(qs[:5], indent=2, default=str))


def _inspect_ai(site_key: str, site_url_override: str | None = None) -> None:
    """Probe GetAiPerformance and dump the raw response shape (no DB writes).

    Useful to verify the method name and response field names before the
    first live ingest run. If the endpoint does not exist yet, the HTTP error
    is printed and the caller should update AI_PERF_METHOD.
    """
    import json
    c = BingWebmasterClient()
    print("=== GetUserSites ===")
    sites = c.get_user_sites()
    if not sites:
        print("No verified sites found.")
        return
    site_url = site_url_override or DEFAULT_SITE_URL.get(site_key, "")
    host = site_url.split("//")[-1].split("/")[0].replace("www.", "")
    matched = next((s.get("Url", "").rstrip("/") for s in sites if host in s.get("Url", "")), "")
    if not matched:
        matched = (sites[0].get("Url") or "").rstrip("/")
        print(f"WARNING: no exact match for {site_key}; using {matched}")
    print(f"\n=== {AI_PERF_METHOD}({matched}) [first 5 rows] ===")
    try:
        rows = c.get_ai_performance(matched)
        print(f"(count={len(rows)})")
        print(json.dumps(rows[:5], indent=2, default=str))
    except Exception as exc:
        print(f"ERROR calling {AI_PERF_METHOD}: {type(exc).__name__}: {exc}")
        print(
            f"If this is a 404/400, the endpoint may not yet be available or "
            f"the method name may differ. Update AI_PERF_METHOD = '{AI_PERF_METHOD}' "
            f"in bing_query_client.py."
        )


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("site_key", nargs="?", default="property")
    parser.add_argument("--site-url", default=None)
    parser.add_argument("--inspect", action="store_true", help="Probe query-stats API shapes, no DB writes")
    parser.add_argument("--ai-performance", action="store_true",
                        help="Fetch Copilot AI Performance report and upsert to bing_ai_performance")
    parser.add_argument("--ai-inspect", action="store_true",
                        help="Probe GetAiPerformance API shape, no DB writes")
    parser.add_argument("--sleep", type=float, default=0.4)
    args = parser.parse_args()

    if args.inspect:
        _inspect()
        return

    if args.ai_inspect:
        _inspect_ai(args.site_key, args.site_url)
        return

    if args.ai_performance:
        ai_fetcher = BingAiPerformanceFetcher(args.site_key, site_url=args.site_url)
        ai_fetcher.fetch_and_store()
        return

    fetcher = BingQueryFetcher(args.site_key, site_url=args.site_url)
    fetcher.fetch_and_store(sleep=args.sleep)


if __name__ == "__main__":
    main()
