"""Fetch fresh Bing data for solicitors and upsert in SMALL chunks (~50).

Reuses the shared engine's fetch methods unchanged; only the upsert chunking
is done here (50 rows) to dodge the Management-API 400 that a 500-row chunk
triggers. Writes only site_key='solicitors' rows.
"""
import os
import sys
import time
from datetime import date

ROOT = r"C:\Users\user\Documents\Accounting"
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.clients.bing_query_client import (
    BingQueryFetcher, _mgmt_sql, _esc, _as_url,
)

f = BingQueryFetcher("solicitors")
snap = date.today().strftime("%Y-%m-%d")
site = f._resolve_site_url()
print(f"[BING] site={site} snapshot={snap}")

page_stats = f.client.get_page_stats(site)
pages = [u for u in (_as_url(p) for p in page_stats) if u]
print(f"[BING] GetPageStats -> {len(pages)} pages")

records = []
for i, pg in enumerate(pages):
    try:
        qs = f.client.get_page_query_stats(site, pg)
    except Exception as exc:
        print(f"[BING]   page {i} {pg} error: {exc}")
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
    time.sleep(0.4)

print(f"[BING] collected {len(records)} (page, query) rows (pre-dedup)")

# Dedupe on the conflict key (page_url, query, date): an intra-statement
# duplicate makes ON CONFLICT DO UPDATE 'affect row a second time' -> 400.
# Keep the row with the highest impressions for each key.
dedup = {}
for pg, qy, ds, im, ck, ct, ps in records:
    key = (pg, qy, ds)
    cur = dedup.get(key)
    if cur is None or im > cur[3]:
        dedup[key] = (pg, qy, ds, im, ck, ct, ps)
records = list(dedup.values())
print(f"[BING] {len(records)} rows after dedup on (page,query,date)")

import httpx
from optimisation_engine.clients.bing_query_client import MGMT_URL, SUPABASE_ACCESS_TOKEN


def _post(sql):
    r = httpx.post(
        MGMT_URL,
        headers={"Authorization": f"Bearer {SUPABASE_ACCESS_TOKEN}",
                 "Content-Type": "application/json"},
        json={"query": sql}, timeout=60.0,
    )
    if r.status_code >= 400:
        raise RuntimeError(f"{r.status_code}: {r.text[:300]}")


inserted = 0
CHUNK = 50
for i in range(0, len(records), CHUNK):
    chunk = records[i:i + CHUNK]
    values = ", ".join(
        f"('solicitors', '{_esc(pg)}', '{_esc(qy)}', '{ds}', {im}, {ck}, {ct}, {ps})"
        for pg, qy, ds, im, ck, ct, ps in chunk
    )
    sql = (
        "INSERT INTO bing_query_data "
        "(site_key, page_url, query, date, impressions, clicks, ctr, position) "
        f"VALUES {values} "
        "ON CONFLICT (site_key, page_url, query, date) DO UPDATE SET "
        "impressions = EXCLUDED.impressions, clicks = EXCLUDED.clicks, "
        "ctr = EXCLUDED.ctr, position = EXCLUDED.position"
    )
    try:
        _post(sql)
        inserted += len(chunk)
    except Exception as exc:
        print(f"[BING] chunk {i} ({len(chunk)} rows) failed: {exc}")
print(f"[BING] upserted {inserted} / {len(records)} rows to bing_query_data")
