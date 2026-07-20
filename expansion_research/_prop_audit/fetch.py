# ponytail: scratch read-only audit fetch, no DB writes
import json, os, sys, time
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
os.chdir(os.path.join(os.path.dirname(__file__), "..", ".."))
from datetime import date, timedelta
from agents.utils.gsc_client_oauth import GSCClient

SITE = "sc-domain:propertytaxpartners.co.uk"
OUT = os.path.join("expansion_research", "_prop_audit")
c = GSCClient()

def pull(dims, start, end, limit=25000):
    rows, startRow = [], 0
    while True:
        body = {"startDate": start, "endDate": end, "dimensions": dims,
                "rowLimit": limit, "startRow": startRow}
        r = c.service.searchanalytics().query(siteUrl=SITE, body=body).execute()
        got = r.get("rows", [])
        rows += got
        if len(got) < limit:
            break
        startRow += limit
    return rows

end = (date.today() - timedelta(days=2)).isoformat()
start = (date.today() - timedelta(days=92)).isoformat()

jobs = {
    "date": ["date"],
    "page_date": ["page", "date"],
    "query_date": ["query", "date"],
    "page_query": ["page", "query"],
}
for name, dims in jobs.items():
    rows = pull(dims, start, end)
    json.dump(rows, open(os.path.join(OUT, f"gsc_{name}.json"), "w"))
    print(name, len(rows))
print("window", start, end)
