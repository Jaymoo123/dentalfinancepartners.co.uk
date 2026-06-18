"""Demand-ranked rewrite worklist for solicitors (read-only).

Page-level GSC + Bing aggregate for site_key='solicitors', ranked by combined
impressions, excluding anything already in monitored_pages. Emits a markdown
worklist + prints the ranked table.
"""
import os
import re
import sys
import json
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


def slug_of(page_url):
    # strip query/hash, trailing slash, take last path segment
    u = page_url.split("?")[0].split("#")[0].rstrip("/")
    seg = u.split("/")[-1] if "/" in u else u
    return seg


# monitored_pages exclusion set
mon = q("SELECT * FROM monitored_pages WHERE site_key='solicitors'")
mon_slugs = set()
for row in mon:
    for k in ("slug", "url", "page_url", "path"):
        v = row.get(k)
        if v:
            mon_slugs.add(slug_of(str(v)))
print(f"monitored_pages(solicitors) rows={len(mon)} -> excluded slugs={sorted(mon_slugs) if mon_slugs else 'none'}")

# GSC per-page aggregate
gsc = q("""
    SELECT page_url, sum(impressions) AS impr, sum(clicks) AS clicks,
           count(DISTINCT query) AS queries, round(avg(position)::numeric,1) AS avg_pos
    FROM gsc_query_data WHERE site_key='solicitors'
    GROUP BY page_url
""")
# Bing per-page aggregate (latest snapshot only = max date)
bing = q("""
    SELECT page_url, sum(impressions) AS impr, sum(clicks) AS clicks,
           count(DISTINCT query) AS queries, round(avg(position)::numeric,1) AS avg_pos
    FROM bing_query_data
    WHERE site_key='solicitors' AND date=(SELECT max(date) FROM bing_query_data WHERE site_key='solicitors')
    GROUP BY page_url
""")

agg = {}
for r in gsc:
    s = slug_of(r["page_url"])
    a = agg.setdefault(s, {"slug": s, "url": r["page_url"], "g_impr": 0, "g_clk": 0, "g_q": 0, "g_pos": None,
                           "b_impr": 0, "b_clk": 0, "b_q": 0, "b_pos": None})
    a["g_impr"] += int(r["impr"] or 0); a["g_clk"] += int(r["clicks"] or 0)
    a["g_q"] = int(r["queries"] or 0); a["g_pos"] = r["avg_pos"]
for r in bing:
    s = slug_of(r["page_url"])
    a = agg.setdefault(s, {"slug": s, "url": r["page_url"], "g_impr": 0, "g_clk": 0, "g_q": 0, "g_pos": None,
                           "b_impr": 0, "b_clk": 0, "b_q": 0, "b_pos": None})
    a["b_impr"] += int(r["impr"] or 0); a["b_clk"] += int(r["clicks"] or 0)
    a["b_q"] = int(r["queries"] or 0); a["b_pos"] = r["avg_pos"]
    if not a["url"]:
        a["url"] = r["page_url"]

rows = []
for s, a in agg.items():
    a["combined_impr"] = a["g_impr"] + a["b_impr"]
    a["combined_clk"] = a["g_clk"] + a["b_clk"]
    a["excluded"] = s in mon_slugs
    rows.append(a)
rows.sort(key=lambda x: (-x["combined_impr"], -x["combined_clk"]))

# is it a /blog/ page?
def is_blog(url):
    return "/blog/" in url

print(f"\n{'slug':52s} {'cmbI':>5} {'cmbC':>5} {'gI':>4} {'gC':>4} {'gPos':>5} {'bI':>4} {'bC':>4} {'bQ':>4}")
lines = []
for a in rows:
    if a["excluded"]:
        continue
    print(f"{a['slug'][:52]:52s} {a['combined_impr']:5d} {a['combined_clk']:5d} "
          f"{a['g_impr']:4d} {a['g_clk']:4d} {str(a['g_pos'] or '-'):>5} "
          f"{a['b_impr']:4d} {a['b_clk']:4d} {a['b_q']:4d}")
    lines.append(a)

with open(os.path.join(ROOT, ".cache", "solicitors_onboard", "worklist.json"), "w", encoding="utf-8") as f:
    json.dump(rows, f, indent=2, default=str)
print(f"\nTotal distinct pages with demand: {len(rows)} ({sum(1 for a in rows if not a['excluded'])} after monitored exclusion)")
print(f"Blog pages with demand: {sum(1 for a in rows if is_blog(a['url']) and not a['excluded'])}")
