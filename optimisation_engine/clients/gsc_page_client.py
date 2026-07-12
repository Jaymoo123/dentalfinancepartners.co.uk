"""
GSC page-level fetcher.

Persists daily page + date snapshots into public.gsc_page_performance using
dimensions=['page', 'date'] — unthresholded, accurate click/impression totals.

This complements gsc_query_client.py (which uses page+query+date and is
privacy-thresholded). All aggregate metrics in the snapshot must come from
this table, not gsc_query_data.
"""
from __future__ import annotations

import os
import sys
from datetime import date, timedelta
from typing import Iterable

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from agents.utils.gsc_client_oauth import GSCClient  # noqa: E402
from optimisation_engine.config import get_site  # noqa: E402

try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(ROOT, ".env"))
except ImportError:
    pass

SUPABASE_ACCESS_TOKEN: str = os.getenv("SUPABASE_ACCESS_TOKEN", "")
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
MGMT_URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"

_SITE_URL_MAP = {
    "property":          "sc-domain:propertytaxpartners.co.uk",
    "dentists":          "sc-domain:dentalfinancepartners.co.uk",
    "medical":           "sc-domain:medicalaccounts.co.uk",
    "solicitors":        "sc-domain:accountsforlawyers.co.uk",
    "agency":            "sc-domain:agencyfounderfinance.co.uk",
    "generalist":        "sc-domain:hollowaydavies.co.uk",
    "contractors-ir35":  "sc-domain:contractortaxaccountants.co.uk",
    "construction-cis":  "sc-domain:tradetaxspecialists.co.uk",
    "charities":         "sc-domain:brand-tbd-charities.invalid",
    "hospitality":       "sc-domain:brand-tbd-hospitality.invalid",
}


def _mgmt_sql(query: str) -> None:
    r = httpx.post(
        MGMT_URL,
        headers={"Authorization": f"Bearer {SUPABASE_ACCESS_TOKEN}", "Content-Type": "application/json"},
        json={"query": query},
        timeout=60.0,
    )
    r.raise_for_status()


def _esc_str(v: str) -> str:
    return v.replace("'", "''")


class GSCPageFetcher:
    """Fetches page+date GSC data and writes to public.gsc_page_performance."""

    def __init__(self, site_key: str) -> None:
        self.site_key = site_key
        self.site = get_site(site_key)
        if not self.site.get("gsc_property_url"):
            raise ValueError(f"site_key={site_key} has no gsc_property_url")
        self.gsc_property_url = self.site["gsc_property_url"]
        self.site_url = _SITE_URL_MAP.get(site_key, f"sc-domain:{site_key}.co.uk")
        self.gsc_client = GSCClient()

    def fetch_and_store(self, days: int = 28, row_limit: int = 25000) -> int:
        end_date = date.today()
        start_date = end_date - timedelta(days=days)

        print(f"[GSC-P] {self.site_key} site={self.gsc_property_url} window={start_date}..{end_date}")

        body = {
            "startDate": start_date.strftime("%Y-%m-%d"),
            "endDate": end_date.strftime("%Y-%m-%d"),
            "dimensions": ["page", "date"],
            "rowLimit": row_limit,
        }

        try:
            response = (
                self.gsc_client.service.searchanalytics()
                .query(siteUrl=self.gsc_property_url, body=body)
                .execute()
            )
        except Exception as exc:
            print(f"[GSC-P] {self.site_key} API error: {exc}")
            return 0

        rows = response.get("rows", [])
        if not rows:
            print(f"[GSC-P] {self.site_key} no data returned")
            return 0

        print(f"[GSC-P] {self.site_key} fetched {len(rows)} (page, date) rows")
        return self._upsert(rows)

    def _upsert(self, rows: Iterable[dict]) -> int:
        records: list[tuple] = []
        for row in rows:
            keys = row.get("keys", [])
            if len(keys) < 2:
                continue
            page_url, date_str = keys[0], keys[1]
            records.append((
                page_url,
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
                f"('{_esc_str(self.site_key)}', '{_esc_str(self.site_url)}', "
                f"'{_esc_str(page_url)}', '{date_str}', "
                f"{impressions}, {clicks}, {ctr}, {position})"
                for page_url, date_str, impressions, clicks, ctr, position in chunk
            )
            sql = f"""
                INSERT INTO gsc_page_performance
                    (niche, site_url, page_url, date, impressions, clicks, ctr, position)
                VALUES {values}
                ON CONFLICT (niche, page_url, date) DO UPDATE SET
                    site_url   = EXCLUDED.site_url,
                    impressions = EXCLUDED.impressions,
                    clicks     = EXCLUDED.clicks,
                    ctr        = EXCLUDED.ctr,
                    position   = EXCLUDED.position,
                    fetched_at = NOW()
            """
            try:
                _mgmt_sql(sql)
                inserted += len(chunk)
            except Exception as exc:
                print(f"[GSC-P] {self.site_key} chunk {i} upsert failed: {exc}")

        print(f"[GSC-P] {self.site_key} upserted {inserted} rows to gsc_page_performance")
        return inserted
