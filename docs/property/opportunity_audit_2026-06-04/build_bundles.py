"""Build per-category consolidation bundles: competitor slugs + real GSC/Bing demand
+ our existing pages in that category. One bundle JSON per category for the
consolidation agents.
"""
from __future__ import annotations
import os, json, re
from pathlib import Path
from collections import defaultdict
import httpx
from dotenv import load_dotenv

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
load_dotenv(ROOT / ".env")
TOKEN = os.getenv("SUPABASE_ACCESS_TOKEN"); REF = "dhlxwmvmkrfnmcgjbntk"
MGMT = f"https://api.supabase.com/v1/projects/{REF}/database/query"

TAX = json.loads((HERE / "_final_taxonomy.json").read_text())["categories"]
gap = json.loads((HERE / "_final_gap_map.json").read_text())["categories"]

def classify(text):
    s = text.lower()
    best, score = None, 0
    for c in TAX:
        sc = sum(1 for kw in c["signature_keywords"] if kw in s)
        if sc > score:
            score, best = sc, c["id"]
    return best

# demand: union GSC+Bing distinct queries with summed impressions
rows = httpx.post(MGMT, headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
    json={"query": """
      SELECT query, SUM(imp) imp FROM (
        SELECT query, SUM(impressions) imp FROM gsc_query_data WHERE site_key='property' GROUP BY query
        UNION ALL
        SELECT query, SUM(impressions) imp FROM bing_query_data WHERE site_key='property' GROUP BY query
      ) t GROUP BY query ORDER BY imp DESC"""}, timeout=90).json()
demand = defaultdict(list)
for r in rows:
    cid = classify(r["query"])
    if cid:
        demand[cid].append({"query": r["query"], "imp": int(r["imp"])})

# our existing pages per category
our = [p.stem for p in (ROOT / "Property/web/content/blog").glob("*.md")]
our_by = defaultdict(list)
for s in our:
    cid = classify(s)
    if cid: our_by[cid].append(s)

bundles_dir = HERE / "_bundles"; bundles_dir.mkdir(exist_ok=True)
for c in TAX:
    cid = c["id"]
    g = gap.get(cid, {})
    # cap competitor slugs at 150 (dedup-ish representative), demand top 40, our existing all
    comp = [x["slug"] for x in g.get("candidates", [])][:150]
    bundle = {
        "category": {k: c[k] for k in ("id", "name", "definition", "brand_function", "priority_tier")},
        "competitor_slugs": comp,
        "competitor_total_in_category": g.get("competitor_count", 0),
        "demand_queries": demand.get(cid, [])[:40],
        "our_existing_pages": sorted(our_by.get(cid, [])),
    }
    (bundles_dir / f"{cid}.json").write_text(json.dumps(bundle, indent=2))

print(f"wrote {len(TAX)} bundles to _bundles/")
print(f"{'category':<40}{'comp':>6}{'demand':>8}{'ours':>6}")
for c in sorted(TAX, key=lambda c: (c["priority_tier"], c["id"])):
    cid = c["id"]
    print(f"{c['name'][:39]:<40}{min(150,gap.get(cid,{}).get('competitor_count',0)):>6}{len(demand.get(cid,[])):>8}{len(our_by.get(cid,[])):>6}")
