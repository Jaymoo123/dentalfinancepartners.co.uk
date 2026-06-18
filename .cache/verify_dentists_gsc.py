"""One-off verification: what is the real Dentists GSC property + does it have data?
Read-only. Safe to delete."""
import os, sys, json
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT)

from optimisation_engine.config import get_site
import httpx

# 1. sites table row for dentists (this drives the actual GSC API call)
try:
    row = get_site("dentists")
    print("=== sites row (dentists) ===")
    for k in ("site_key", "domain", "gsc_property_url", "niche", "active"):
        print(f"  {k}: {row.get(k)!r}")
except Exception as exc:
    print(f"get_site('dentists') FAILED: {exc}")
    row = None

# 2. Which GSC properties can the OAuth account actually see?
print("\n=== GSC accessible properties ===")
try:
    from agents.utils.gsc_client_oauth import GSCClient
    svc = GSCClient().service
    sites = svc.sites().list().execute().get("siteEntry", [])
    for s in sites:
        print(f"  {s.get('siteUrl')!r}  perm={s.get('permissionLevel')}")
except Exception as exc:
    print(f"GSC sites().list() FAILED: {exc}")

# 3. Row counts already ingested for dentists in gsc_query_data
print("\n=== gsc_query_data ingested for dentists (last 90d) ===")
tok = os.getenv("SUPABASE_ACCESS_TOKEN", "")
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
MGMT_URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"
def mgmt(q):
    r = httpx.post(MGMT_URL, headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"},
                   json={"query": q}, timeout=60.0)
    r.raise_for_status()
    return r.json()
try:
    q = ("SELECT COUNT(*) AS rows, COUNT(DISTINCT query) AS queries, "
         "MIN(date) AS min_date, MAX(date) AS max_date, "
         "SUM(impressions) AS impr, SUM(clicks) AS clk "
         "FROM gsc_query_data WHERE site_key='dentists'")
    print(json.dumps(mgmt(q), indent=2))
    q2 = ("SELECT COUNT(*) AS rows, MAX(date) AS max_date FROM bing_query_data WHERE site_key='dentists'")
    print("bing_query_data:", json.dumps(mgmt(q2)))
except Exception as exc:
    print(f"Supabase count FAILED: {exc}")
