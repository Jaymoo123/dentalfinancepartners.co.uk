"""One-shot schema introspection for the property traffic eval.

Prints columns + date ranges for web_sessions, web_events, leads so the main
eval can build exact daily time-series queries.
"""
from __future__ import annotations
import os, json, sys
import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(ROOT, ".env"))
except ImportError:
    pass

TOKEN = os.getenv("SUPABASE_ACCESS_TOKEN", "")
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
MGMT_URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"


def sql(q: str):
    r = httpx.post(
        MGMT_URL,
        headers={"Authorization": f"Bearer {TOKEN}",
                 "Content-Type": "application/json",
                 "User-Agent": "traffic-eval/1.0"},
        json={"query": q},
        timeout=60.0,
    )
    r.raise_for_status()
    return r.json()


def cols(table: str):
    rows = sql(f"""
        select column_name, data_type
        from information_schema.columns
        where table_schema='public' and table_name='{table}'
        order by ordinal_position
    """)
    return rows


for t in ("web_sessions", "web_events", "leads"):
    print(f"\n===== {t} columns =====")
    try:
        for c in cols(t):
            print(f"  {c['column_name']:<28} {c['data_type']}")
    except Exception as e:
        print(f"  ERROR: {type(e).__name__}: {e}")

# List candidate views for daily timeseries
print("\n===== views/matviews with 'web' or 'funnel' or 'timeseries' =====")
try:
    rows = sql("""
        select table_name from information_schema.views
        where table_schema='public'
          and (table_name ilike '%web%' or table_name ilike '%funnel%'
               or table_name ilike '%timeseries%' or table_name ilike '%session%')
        order by table_name
    """)
    for r in rows:
        print("  ", r["table_name"])
except Exception as e:
    print(f"  ERROR: {e}")
