"""Canonicalise dentists GSC property to sc-domain + re-ingest 90d. Reversible."""
import os, sys, json
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT)
import httpx
from dotenv import load_dotenv
load_dotenv(os.path.join(ROOT, ".env"))

tok = os.getenv("SUPABASE_ACCESS_TOKEN", "")
assert tok, "SUPABASE_ACCESS_TOKEN missing from .env"
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
MGMT_URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"
def mgmt(q):
    r = httpx.post(MGMT_URL, headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"},
                   json={"query": q}, timeout=60.0)
    r.raise_for_status()
    return r.json()

print("BEFORE:", json.dumps(mgmt("SELECT gsc_property_url FROM sites WHERE site_key='dentists'")))
mgmt("UPDATE sites SET gsc_property_url='sc-domain:dentalfinancepartners.co.uk' WHERE site_key='dentists'")
print("AFTER :", json.dumps(mgmt("SELECT gsc_property_url FROM sites WHERE site_key='dentists'")))

# Re-ingest 90d under the sc-domain property
from optimisation_engine.clients.gsc_query_client import GSCQueryFetcher
n = GSCQueryFetcher("dentists").fetch_and_store(days=90)
print(f"\nIngested rows this run: {n}")

print("\n=== gsc_query_data (dentists) after re-ingest ===")
print(json.dumps(mgmt(
    "SELECT COUNT(*) AS rows, COUNT(DISTINCT query) AS queries, MIN(date) AS min_date, "
    "MAX(date) AS max_date, SUM(impressions) AS impr, SUM(clicks) AS clk "
    "FROM gsc_query_data WHERE site_key='dentists'"), indent=2))
print("\nTop 15 dentists queries by impressions:")
print(json.dumps(mgmt(
    "SELECT query, SUM(impressions) AS impr, SUM(clicks) AS clk, ROUND(AVG(position)::numeric,1) AS pos "
    "FROM gsc_query_data WHERE site_key='dentists' GROUP BY query ORDER BY impr DESC LIMIT 15"), indent=2))
