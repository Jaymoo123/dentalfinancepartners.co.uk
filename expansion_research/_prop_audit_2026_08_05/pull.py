import os, sys, json, re, collections
from datetime import date, timedelta

ROOT = r"C:\Users\user\Documents\Accounting"
os.chdir(ROOT)
sys.path.insert(0, ROOT)
from dotenv import load_dotenv
load_dotenv(os.path.join(ROOT, ".env"))

from agents.utils.gsc_client_oauth import GSCClient

OUT = os.path.join(ROOT, "expansion_research", "_prop_audit_2026_08_05")
SITE = "sc-domain:propertytaxpartners.co.uk"

svc = GSCClient().service

def q(dims, days, row_limit=25000, filters=None):
    end = date.today() - timedelta(days=3)
    start = end - timedelta(days=days)
    body = {"startDate": str(start), "endDate": str(end), "dimensions": dims, "rowLimit": row_limit}
    if filters:
        body["dimensionFilterGroups"] = [{"filters": filters}]
    return svc.searchanalytics().query(siteUrl=SITE, body=body).execute().get("rows", [])

def save(name, obj):
    p = os.path.join(OUT, name)
    with open(p, "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=2)
    print("saved", p)

# --- Task 1: monthly totals, date dimension, 365d ---
rows = q(["date"], 365, 500)
monthly = collections.defaultdict(lambda: [0, 0])
for r in rows:
    m = r["keys"][0][:7]
    monthly[m][0] += r["clicks"]
    monthly[m][1] += r["impressions"]
gsc_monthly = {m: {"clicks": c, "impressions": i, "ctr_pct": round(c/i*100, 3) if i else 0}
               for m, (c, i) in sorted(monthly.items())}
claimed = {"2026-04": {"impressions": 11521, "clicks": 11},
           "2026-05": {"impressions": 26747, "clicks": 74},
           "2026-06": {"impressions": 55335, "clicks": 318},
           "2026-07": {"impressions": 77466, "clicks": 811}}
save("gsc_monthly.json", {"measured": gsc_monthly, "claimed": claimed})

# --- Task 2: landlord tax filter ---
contains = q(["query"], 90, filters=[{"dimension": "query", "operator": "contains", "expression": "landlord tax"}])
exact = q(["query"], 90, filters=[{"dimension": "query", "operator": "equals", "expression": "landlord tax"}])
save("gsc_landlordtax_filter.json", {
    "contains_landlord_tax": {
        "total_impressions": sum(r["impressions"] for r in contains),
        "total_clicks": sum(r["clicks"] for r in contains),
        "rows": sorted(contains, key=lambda r: -r["impressions"]),
    },
    "exact_landlord_tax": {
        "total_impressions": sum(r["impressions"] for r in exact),
        "total_clicks": sum(r["clicks"] for r in exact),
        "rows": exact,
    },
})

# --- Task 3: head-term page serving ---
ht = q(["query", "page"], 90, filters=[{"dimension": "query", "operator": "contains", "expression": "property accountant"}])
by_query = collections.defaultdict(list)
for r in ht:
    query, page = r["keys"]
    by_query[query].append({"page": page, "impressions": r["impressions"], "clicks": r["clicks"], "position": round(r["position"], 1)})
top20 = sorted(by_query.items(), key=lambda kv: -sum(x["impressions"] for x in kv[1]))[:20]
summary = []
for query, pages in top20:
    pages_sorted = sorted(pages, key=lambda x: -x["impressions"])
    summary.append({
        "query": query,
        "total_impressions": sum(x["impressions"] for x in pages_sorted),
        "num_pages_served": len(pages_sorted),
        "pages": pages_sorted,
    })
save("gsc_headterm_pages.json", {"summary_top20_by_impressions": summary, "raw_row_count": len(ht)})

# --- Task 4: buckets + full query rows ---
COMMERCIAL_RE = re.compile(
    r"\b(accountant|accountants|accountancy|advisor|adviser|advice|specialist|"
    r"firm|service|services|help|near me|cost|fee|fees|price|quote|hire|best)\b", re.I)
FORMCODE_RE = re.compile(
    r"\b(sa\d{3}|nrl\d?|ct\d{3}|p\d{2}d?|is\d+\w*|form|hmrc|gov\.?uk|helpline|"
    r"login|sign in|deadline|manual)\b", re.I)

qrows = q(["query"], 90)
buckets = collections.defaultdict(lambda: [0, 0, 0, 0.0])
for r in qrows:
    b = ("commercial" if COMMERCIAL_RE.search(r["keys"][0])
         else "form_hmrc_lookup" if FORMCODE_RE.search(r["keys"][0])
         else "informational")
    buckets[b][0] += 1
    buckets[b][1] += r["impressions"]
    buckets[b][2] += r["clicks"]
    buckets[b][3] += r["position"] * r["impressions"]

bucket_out = {b: {"queries": n, "impressions": i, "clicks": c,
                   "ctr_pct": round(c/i*100, 3) if i else 0,
                   "avg_position": round(wp/i, 1) if i else 0}
              for b, (n, i, c, wp) in buckets.items()}

date90 = q(["date"], 90, 500)
total_90d_impressions = sum(r["impressions"] for r in date90)
total_90d_clicks = sum(r["clicks"] for r in date90)
sample_impressions = sum(r["impressions"] for r in qrows)

claimed_buckets = {"commercial": {"queries": 326, "impressions": 4856, "clicks": 5},
                    "form_hmrc_lookup": {"queries": 388, "impressions": 5336, "clicks": 10},
                    "informational": {"queries": 3049, "impressions": 19033, "clicks": 50}}

save("gsc_buckets.json", {
    "measured_buckets_90d": bucket_out,
    "claimed_buckets_90d": claimed_buckets,
    "total_query_rows_90d": len(qrows),
    "sample_impressions_sum": sample_impressions,
    "sample_clicks_sum": sum(r["clicks"] for r in qrows),
    "date_dimension_total_90d_impressions": total_90d_impressions,
    "date_dimension_total_90d_clicks": total_90d_clicks,
    "sampling_ratio_impressions": round(sample_impressions / total_90d_impressions, 4) if total_90d_impressions else None,
})
save("gsc_query_rows_90d.json", qrows)

# --- Task 6: page coverage ---
prows = q(["page"], 90)
by_host = collections.defaultdict(dict)
targets = ["/locations/leeds", "/locations/london", "/locations/manchester"]
host_split = {}
for r in prows:
    page = r["keys"][0]
    for t in targets:
        if page.rstrip("/").endswith(t):
            host_split.setdefault(t, []).append({
                "url": page, "impressions": r["impressions"], "clicks": r["clicks"],
                "position": round(r["position"], 1)})

claimed_pages = {"pages_with_impressions": 665, "pages_over_100": 118, "pages_over_1000": 16}
save("gsc_pages.json", {
    "measured": {
        "pages_with_impressions_90d": len(prows),
        "pages_over_100_impressions": sum(1 for r in prows if r["impressions"] >= 100),
        "pages_over_1000_impressions": sum(1 for r in prows if r["impressions"] >= 1000),
    },
    "claimed": claimed_pages,
    "locations_host_split": host_split,
})

print("DONE")
