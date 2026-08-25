# ponytail: throwaway read-only audit pull for medical GSC
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT)
from agents.utils.gsc_client_oauth import GSCClient

SITE = "sc-domain:medicalaccounts.co.uk"
c = GSCClient()
svc = c.service

def q(body):
    return svc.searchanalytics().query(siteUrl=SITE, body=body).execute().get("rows", [])

out = {}
out["daily"] = q({"startDate": "2026-04-18", "endDate": "2026-07-17", "dimensions": ["date"], "rowLimit": 5000})
out["pages_pre"] = q({"startDate": "2026-05-25", "endDate": "2026-07-05", "dimensions": ["page"], "rowLimit": 5000})
out["pages_post"] = q({"startDate": "2026-07-06", "endDate": "2026-07-17", "dimensions": ["page"], "rowLimit": 5000})
out["queries_post"] = q({"startDate": "2026-07-06", "endDate": "2026-07-17", "dimensions": ["query"], "rowLimit": 100})
d = os.path.join(ROOT, "scripts", "_medical_audit")
os.makedirs(d, exist_ok=True)
with open(os.path.join(d, "gsc.json"), "w") as f:
    json.dump(out, f)
print({k: len(v) for k, v in out.items()})
