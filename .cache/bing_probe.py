import os, sys, httpx, json
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from optimisation_engine.clients import bing_query_client as B
TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
URL = f"https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query"
f = B.BingQueryFetcher("dentists")
site = f._resolve_site_url()
ps = f.client.get_page_stats(site)
pages = [u for u in (B._as_url(p) for p in ps) if u][:2]
print("sample pages:", pages)
recs = []
for pg in pages:
    for q in f.client.get_page_query_stats(site, pg)[:3]:
        recs.append((pg, q.get("Query", ""), "2026-06-03",
                     int(q.get("Impressions", 0) or 0), int(q.get("Clicks", 0) or 0),
                     0.0, float(q.get("AvgImpressionPosition", 0) or 0)))
print("sample recs:", json.dumps(recs[:3], default=str))
vals = ", ".join(f"('dentists','{B._esc(p)}','{B._esc(q)}','{d}',{i},{c},{ct},{po})"
                 for p, q, d, i, c, ct, po in recs[:3])
sql = (f"INSERT INTO bing_query_data (site_key,page_url,query,date,impressions,clicks,ctr,position) "
       f"VALUES {vals} ON CONFLICT (site_key,page_url,query,date) DO UPDATE SET impressions=EXCLUDED.impressions")
r = httpx.post(URL, headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
               json={"query": sql}, timeout=60)
print("status:", r.status_code)
print("body:", r.text[:1500])
