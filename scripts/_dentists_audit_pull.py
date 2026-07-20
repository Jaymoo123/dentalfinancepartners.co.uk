# ponytail: throwaway read-only audit pull, prints JSON to _dentists_audit/
import json, os, sys, datetime as dt
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
from agents.utils.gsc_client_oauth import GSCClient

SITE = "sc-domain:dentalfinancepartners.co.uk"
OUT = "scripts/_dentists_audit"
os.makedirs(OUT, exist_ok=True)
c = GSCClient()

def q(start, end, dims, limit=25000):
    body = {"startDate": start, "endDate": end, "dimensions": dims,
            "rowLimit": limit, "dataState": "all"}
    return c.service.searchanalytics().query(siteUrl=SITE, body=body).execute().get("rows", [])

today = dt.date.today()
end = str(today)
start90 = str(today - dt.timedelta(days=90))
jobs = {
    "daily_90d": (start90, end, ["date"]),
    "pages_90d": (start90, end, ["page"]),
    "queries_90d": (start90, end, ["query"]),
    "page_query_28d": (str(today - dt.timedelta(days=28)), end, ["page", "query"]),
    "pages_pre": ("2026-06-08", "2026-07-07", ["page"]),   # 30d pre meta batch2
    "pages_post": ("2026-07-08", end, ["page"]),           # post deploy
    "pq_pre": ("2026-06-08", "2026-07-07", ["page", "query"]),
    "pq_post": ("2026-07-08", end, ["page", "query"]),
}
for name, (s, e, dims) in jobs.items():
    rows = q(s, e, dims)
    json.dump(rows, open(f"{OUT}/{name}.json", "w"))
    print(name, len(rows))
