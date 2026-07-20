"""Ad-hoc monitored-pages evaluation query runner (scratch, safe READ-only).
Runs SQL against prod Supabase via Management API. Prints JSON.
"""
import json, os, sys
import httpx
from dotenv import load_dotenv

load_dotenv()
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"


def sql(query: str):
    r = httpx.post(URL, headers={"Authorization": f"Bearer {TOKEN}",
                                 "Content-Type": "application/json"},
                   json={"query": query}, timeout=120)
    r.raise_for_status()
    return r.json()


QUERIES = {
 "mp_overview": """
   SELECT rewrite_type, status,
          COUNT(*) n,
          MIN(rewrite_date) min_rw, MAX(rewrite_date) max_rw,
          MIN(monitor_until) min_mu, MAX(monitor_until) max_mu
   FROM monitored_pages WHERE site_key='property'
   GROUP BY rewrite_type, status ORDER BY rewrite_type, status;
 """,
 "mp_by_date": """
   SELECT rewrite_date, rewrite_type, status, COUNT(*) n
   FROM monitored_pages WHERE site_key='property'
   GROUP BY rewrite_date, rewrite_type, status ORDER BY rewrite_date;
 """,
 "gsc_freshness": """
   SELECT site_key, MIN(date) min_d, MAX(date) max_d, COUNT(*) rows
   FROM gsc_query_data WHERE site_key='property' GROUP BY site_key;
 """,
 "bing_freshness": """
   SELECT site_key, MIN(date) min_d, MAX(date) max_d, COUNT(DISTINCT date) snaps,
          COUNT(*) rows
   FROM bing_query_data WHERE site_key='property' GROUP BY site_key;
 """,
 "bing_snaps": """
   SELECT date, COUNT(*) rows, SUM(impressions) impr, SUM(clicks) clk
   FROM bing_query_data WHERE site_key='property'
   GROUP BY date ORDER BY date DESC LIMIT 8;
 """,
}

if __name__ == "__main__":
    which = sys.argv[1] if len(sys.argv) > 1 else "all"
    for name, q in QUERIES.items():
        if which != "all" and name != which:
            continue
        print(f"\n===== {name} =====")
        try:
            print(json.dumps(sql(q), indent=2, default=str))
        except Exception as e:
            print(f"ERROR: {e}")
