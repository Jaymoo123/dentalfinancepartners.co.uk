"""
GSC query-level fetcher.

Persists daily page + query + date snapshots into public.gsc_query_data.

The existing agents/utils/gsc_fetcher.py only fetches page+date (no query
dimension), so it cannot drive intent-based decisions. This client fills the
gap. It reuses the existing GSC OAuth client.
"""
from __future__ import annotations

import os
import sys
from datetime import date, datetime, timedelta
from typing import Iterable

import httpx

# Reuse the project's GSC OAuth client and config
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from agents.utils.gsc_client_oauth import GSCClient  # noqa: E402

from optimisation_engine.config import (  # noqa: E402
    SUPABASE_KEY,
    SUPABASE_URL,
    get_site,
)


def _supabase_headers(prefer: str = "resolution=merge-duplicates,return=minimal") -> dict[str, str]:
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": prefer,
    }


class GSCQueryFetcher:
    """Fetches page+query+date GSC data and writes to public.gsc_query_data."""

    def __init__(self, site_key: str) -> None:
        self.site_key = site_key
        self.site = get_site(site_key)
        if not self.site.get("gsc_property_url"):
            raise ValueError(
                f"site_key={site_key} has no gsc_property_url; add one in public.sites first."
            )
        self.gsc_client = GSCClient()

    def fetch_and_store(self, days: int = 28, row_limit: int = 25000) -> int:
        """Fetch the last `days` days of page+query+date data and upsert.

        Returns:
            int: number of rows submitted to Supabase.
        """
        end_date = date.today()
        start_date = end_date - timedelta(days=days)

        print(f"[GSC-Q] {self.site_key} site={self.site['gsc_property_url']} window={start_date}..{end_date}")

        body = {
            "startDate": start_date.strftime("%Y-%m-%d"),
            "endDate": end_date.strftime("%Y-%m-%d"),
            "dimensions": ["page", "query", "date"],
            "rowLimit": row_limit,
        }

        try:
            response = (
                self.gsc_client.service.searchanalytics()
                .query(siteUrl=self.site["gsc_property_url"], body=body)
                .execute()
            )
        except Exception as exc:
            print(f"[GSC-Q] {self.site_key} API error: {exc}")
            return 0

        rows = response.get("rows", [])
        if not rows:
            print(f"[GSC-Q] {self.site_key} no data returned for window")
            return 0

        print(f"[GSC-Q] {self.site_key} fetched {len(rows)} (page, query, date) rows")
        return self._upsert(rows)

    def _upsert(self, rows: Iterable[dict]) -> int:
        records: list[dict] = []
        for row in rows:
            keys = row.get("keys", [])
            if len(keys) < 3:
                continue
            page_url, query, date_str = keys[0], keys[1], keys[2]
            records.append(
                {
                    "site_key": self.site_key,
                    "page_url": page_url,
                    "query": query,
                    "date": date_str,
                    "impressions": row.get("impressions", 0),
                    "clicks": row.get("clicks", 0),
                    "ctr": float(row.get("ctr", 0)),
                    "position": float(row.get("position", 0)),
                }
            )

        if not records:
            return 0

        # PostgREST batch upsert. The UNIQUE(site_key, page_url, query, date)
        # constraint plus Prefer: resolution=merge-duplicates makes this safe
        # to re-run within the same day without bloat.
        url = f"{SUPABASE_URL}/rest/v1/gsc_query_data"
        # Insert in chunks of 1000 to keep request size reasonable
        inserted = 0
        for i in range(0, len(records), 1000):
            chunk = records[i : i + 1000]
            r = httpx.post(
                url,
                headers={**_supabase_headers(), "Prefer": "resolution=merge-duplicates,return=minimal"},
                json=chunk,
                timeout=60.0,
            )
            if r.status_code >= 300:
                print(f"[GSC-Q] {self.site_key} upsert chunk {i} failed: {r.status_code} {r.text[:200]}")
                continue
            inserted += len(chunk)
        print(f"[GSC-Q] {self.site_key} upserted {inserted} rows")
        return inserted


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("site_key", help="agency | property | dentists | generalist")
    parser.add_argument("--days", type=int, default=28)
    args = parser.parse_args()

    fetcher = GSCQueryFetcher(args.site_key)
    fetcher.fetch_and_store(days=args.days)


if __name__ == "__main__":
    main()
