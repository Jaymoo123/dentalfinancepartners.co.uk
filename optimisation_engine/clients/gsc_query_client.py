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
    get_site,
)

try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(ROOT, ".env"))
except ImportError:
    pass

SUPABASE_ACCESS_TOKEN: str = os.getenv("SUPABASE_ACCESS_TOKEN", "")
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
MGMT_URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"


def _mgmt_sql(query: str) -> None:
    r = httpx.post(
        MGMT_URL,
        headers={"Authorization": f"Bearer {SUPABASE_ACCESS_TOKEN}", "Content-Type": "application/json"},
        json={"query": query},
        timeout=60.0,
    )
    r.raise_for_status()


def _esc(v: str) -> str:
    return str(v).replace("'", "''")


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
        records: list[tuple] = []
        for row in rows:
            keys = row.get("keys", [])
            if len(keys) < 3:
                continue
            page_url, query, date_str = keys[0], keys[1], keys[2]
            records.append((
                page_url,
                query,
                date_str,
                int(row.get("impressions", 0)),
                int(row.get("clicks", 0)),
                float(row.get("ctr", 0)),
                float(row.get("position", 0)),
            ))

        if not records:
            return 0

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
                INSERT INTO gsc_query_data
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
                print(f"[GSC-Q] {self.site_key} chunk {i} upsert failed: {exc}")

        print(f"[GSC-Q] {self.site_key} upserted {inserted} rows to gsc_query_data")
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
