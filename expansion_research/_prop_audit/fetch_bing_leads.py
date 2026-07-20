# ponytail: read-only bing + leads pull
import json, os, sys, httpx
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
os.chdir(os.path.join(os.path.dirname(__file__), "..", ".."))
from optimisation_engine.clients.bing_query_client import BingWebmasterClient, _as_url

OUT = "expansion_research/_prop_audit"
c = BingWebmasterClient()
sites = c.get_user_sites()
site = next(s["Url"].rstrip("/") for s in sites if "propertytaxpartners" in s.get("Url", ""))
qs = c.get_query_stats(site)
ps = c.get_page_stats(site)
json.dump(qs, open(f"{OUT}/bing_query.json", "w"))
json.dump(ps, open(f"{OUT}/bing_pages.json", "w"))
print("bing queries", len(qs), "pages", len(ps))

# leads by week (read-only SELECT)
tok = os.getenv("SUPABASE_ACCESS_TOKEN", "")
if not tok:
    from dotenv import load_dotenv; load_dotenv(".env"); tok = os.getenv("SUPABASE_ACCESS_TOKEN", "")
sql = """
select date_trunc('week', created_at)::date wk, count(*) n
from leads where source='property' and created_at > now() - interval '9 weeks'
group by 1 order by 1
"""
r = httpx.post("https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query",
               headers={"Authorization": f"Bearer {tok}"}, json={"query": sql}, timeout=60)
print("leads:", r.status_code, r.text[:2000])
json.dump(r.json(), open(f"{OUT}/leads_weekly.json", "w"))
# daily around multistep deploy
sql2 = """
select created_at::date d, count(*) n from leads
where source='property' and created_at > '2026-06-25'
group by 1 order by 1
"""
r2 = httpx.post("https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query",
                headers={"Authorization": f"Bearer {tok}"}, json={"query": sql2}, timeout=60)
print("leads daily:", r2.status_code, r2.text[:3000])
json.dump(r2.json(), open(f"{OUT}/leads_daily.json", "w"))
