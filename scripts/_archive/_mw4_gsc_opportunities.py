"""Throwaway: extract MW4 demand-side opportunities from gsc_query_data.

Queries Property earns impressions for but has never cracked top-10 on =>
net-new page candidates with proven demand. Read-only SELECT via the
Supabase Management API (no API budget spent).
"""
import os
import json
import httpx
from dotenv import load_dotenv

load_dotenv()

PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"


def run(sql: str):
    r = httpx.post(
        URL,
        headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
        json={"query": sql},
        timeout=60,
    )
    r.raise_for_status()
    return r.json()


# Demand-side: never ranked top-10 on any page/day, with a real impression base.
SQL = """
SELECT query,
       SUM(impressions)                 AS impr,
       SUM(clicks)                      AS clk,
       MIN(position)                    AS best_pos,
       ROUND(AVG(position)::numeric, 1) AS avg_pos
FROM gsc_query_data
WHERE site_key = 'property'
GROUP BY query
HAVING MIN(position) > 10 AND SUM(impressions) >= 25
ORDER BY impr DESC
LIMIT 200;
"""

rows = run(SQL)
print(f"OPPORTUNITY_COUNT={len(rows)}")
print(json.dumps(rows, indent=2)[:200])

# Also: total distinct queries + how many are position>10 with any impressions
summary = run("""
SELECT
  COUNT(DISTINCT query)                                              AS total_queries,
  COUNT(DISTINCT query) FILTER (WHERE impressions > 0)               AS queries_with_impr
FROM gsc_query_data
WHERE site_key = 'property';
""")
print("SUMMARY=", json.dumps(summary))

# Write full ranked list to a file for inspection.
out = "briefs/property/_mw4_gsc_opportunities_2026-05-29.json"
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, indent=2)
print("WROTE", out)
