import os, sys, time, httpx
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from optimisation_engine.clients import bing_query_client as B
from datetime import date

TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
URL = "https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query"


def post(sql):
    return httpx.post(URL, headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
                      json={"query": sql}, timeout=90)


def row_sql(r):
    p, q, d, i, c, ct, po = r
    return (f"('dentists','{B._esc(p)}','{B._esc(q)}','{d}',{i},{c},{ct},{po})")


def upsert(rows):
    vals = ", ".join(row_sql(r) for r in rows)
    sql = ("INSERT INTO bing_query_data (site_key,page_url,query,date,impressions,clicks,ctr,position) "
           f"VALUES {vals} ON CONFLICT (site_key,page_url,query,date) DO UPDATE SET "
           "impressions=EXCLUDED.impressions, clicks=EXCLUDED.clicks, ctr=EXCLUDED.ctr, position=EXCLUDED.position")
    return post(sql)


f = B.BingQueryFetcher("dentists")
site = f._resolve_site_url()
snap = date.today().strftime("%Y-%m-%d")
ps = f.client.get_page_stats(site)
pages = [u for u in (B._as_url(p) for p in ps) if u]
print(f"pages with Bing data: {len(pages)}")
recs = []
for i, pg in enumerate(pages):
    try:
        qs = f.client.get_page_query_stats(site, pg)
    except Exception as exc:
        print(f"  page {i} {pg} error: {exc}")
        continue
    for q in qs:
        impr = int(q.get("Impressions", 0) or 0)
        clk = int(q.get("Clicks", 0) or 0)
        pos = float(q.get("AvgImpressionPosition", 0) or 0)
        ctr = round(clk / impr, 4) if impr else 0.0
        query = q.get("Query", "")
        if not query:
            continue
        recs.append((pg, query, snap, impr, clk, ctr, pos))
    time.sleep(0.3)

print(f"collected {len(recs)} (page,query) rows")
ok = 0
bad = []
CH = 50
for i in range(0, len(recs), CH):
    chunk = recs[i:i + CH]
    r = upsert(chunk)
    if r.status_code in (200, 201):
        ok += len(chunk)
    else:
        # isolate row-by-row
        for row in chunk:
            rr = upsert([row])
            if rr.status_code in (200, 201):
                ok += 1
            else:
                bad.append((row, rr.status_code, rr.text[:200]))
print(f"upserted ok={ok}  bad={len(bad)}")
for row, sc, body in bad[:10]:
    print(f"  BAD[{sc}] query={row[1]!r}\n      {body}")
