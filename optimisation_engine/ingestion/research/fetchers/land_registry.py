"""HM Land Registry UK House Price Index fetcher.

Lifted unchanged from ingest_landlord_data.py.
"""
from __future__ import annotations

import csv
import io
from datetime import date
from typing import Any

import httpx

HPI_URL = (
    "http://publicdata.landregistry.gov.uk/market-trend-data/"
    "house-price-index-data/Average-prices-{ym}.csv"
)

HPI_REGIONS = [
    "United Kingdom",
    "England",
    "London",
    "Wales",
    "Scotland",
    "Northern Ireland",
]


def latest_hpi_month() -> str:
    """Discover the most recent published Average-prices-YYYY-MM.csv by probing
    backwards from last month (the release lags ~6 weeks)."""
    today = date.today()
    y, m = today.year, today.month
    for _ in range(6):
        m -= 1
        if m == 0:
            y, m = y - 1, 12
        ym = f"{y:04d}-{m:02d}"
        r = httpx.head(HPI_URL.format(ym=ym), timeout=20.0, follow_redirects=True)
        if r.status_code == 200:
            return ym
    raise RuntimeError("Could not find a published UK HPI Average-prices file")


def fetch_house_prices(start_month: str) -> tuple[list[dict[str, Any]], str]:
    """Download the latest UK HPI file, filter to target regions and to months
    >= start_month. Returns (rows, hpi_through)."""
    ym = latest_hpi_month()
    r = httpx.get(HPI_URL.format(ym=ym), timeout=120.0, follow_redirects=True)
    r.raise_for_status()
    reader = csv.DictReader(io.StringIO(r.text))
    regions = set(HPI_REGIONS)
    rows: list[dict[str, Any]] = []
    latest_seen = ""
    for rec in reader:
        region = (rec.get("Region_Name") or "").strip()
        if region not in regions:
            continue
        d = (rec.get("Date") or "").strip()  # YYYY-MM-01
        if len(d) < 7:
            continue
        month = d[:7]
        if month > latest_seen:
            latest_seen = month
        if month < start_month:
            continue
        price = rec.get("Average_Price")
        ann = rec.get("Annual_Change")
        try:
            price_v = round(float(price)) if price not in (None, "") else None
        except ValueError:
            price_v = None
        try:
            ann_v = round(float(ann), 1) if ann not in (None, "") else None
        except ValueError:
            ann_v = None
        if price_v is None:
            continue
        rows.append(
            {"month": month, "region": region, "metric": "avg_price", "value": price_v, "source": "uk_hpi"}
        )
        if ann_v is not None:
            rows.append(
                {"month": month, "region": region, "metric": "annual_change_pct", "value": ann_v, "source": "uk_hpi"}
            )
    return rows, latest_seen
