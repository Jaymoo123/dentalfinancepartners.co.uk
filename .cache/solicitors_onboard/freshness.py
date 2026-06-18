"""Confirm GSC + Bing freshness for solicitors (read-only)."""
import os
import sys
import httpx

ROOT = r"C:\Users\user\Documents\Accounting"
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)
try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(ROOT, ".env"))
except ImportError:
    pass

TOKEN = os.getenv("SUPABASE_ACCESS_TOKEN", "")
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"


def q(sql):
    r = httpx.post(URL, headers={"Authorization": f"Bearer {TOKEN}",
                  "Content-Type": "application/json"}, json={"query": sql}, timeout=60.0)
    r.raise_for_status()
    return r.json()


for tbl in ("gsc_query_data", "bing_query_data"):
    rows = q(f"""
        SELECT count(*) AS rows, count(DISTINCT page_url) AS pages,
               count(DISTINCT query) AS queries, min(date) AS min_d, max(date) AS max_d,
               sum(impressions) AS impr, sum(clicks) AS clicks
        FROM {tbl} WHERE site_key='solicitors'
    """)
    print(f"=== {tbl} (solicitors) ===")
    print(rows[0] if rows else "no rows")
