"""Aggregate the freshly-ingested solicitors GSC query data into a head-query signal."""
import os, sys, json
import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT)
os.chdir(ROOT)
try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(ROOT, ".env"))
except ImportError:
    pass

TOKEN = os.getenv("SUPABASE_ACCESS_TOKEN", "")
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"

def q(sql):
    r = httpx.post(URL, headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
                   json={"query": sql}, timeout=60.0)
    r.raise_for_status()
    return r.json()

totals = q("""SELECT COUNT(*) AS rows, COUNT(DISTINCT query) AS queries,
                     SUM(impressions) AS impr, SUM(clicks) AS clicks,
                     MIN(date) AS d0, MAX(date) AS d1
              FROM gsc_query_data WHERE site_key='solicitors'""")
print("TOTALS:", json.dumps(totals[0], default=str))

print("\nTOP HEAD QUERIES (90d, by impressions):")
rows = q("""SELECT query, SUM(impressions) AS impr, SUM(clicks) AS clicks,
                   ROUND(AVG(position)::numeric, 1) AS avg_pos
            FROM gsc_query_data WHERE site_key='solicitors'
            GROUP BY query ORDER BY impr DESC LIMIT 25""")
for r in rows:
    print(f"  {r['impr']:>5} impr  {r['clicks']:>3} clk  pos {r['avg_pos']:>5}  {r['query']}")
