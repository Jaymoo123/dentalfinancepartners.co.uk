# ponytail: minimal read-only 117-URL inspection sweep, no Supabase writes
import json, sys, time, urllib.request, xml.etree.ElementTree as ET
sys.path.insert(0, r"C:\Users\user\Documents\Accounting")
from optimisation_engine.snapshot.auth import get_credentials
from google.auth.transport.requests import AuthorizedSession

SITE = "sc-domain:medicalaccounts.co.uk"
with urllib.request.urlopen("https://www.medicalaccounts.co.uk/sitemap.xml", timeout=30) as r:
    xmlb = r.read()
ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
urls = [l.text.strip() for l in ET.fromstring(xmlb).findall("sm:url/sm:loc", ns)]
urls = list(dict.fromkeys(u for u in urls if "medicalaccounts.co.uk" in u))
print("sitemap urls:", len(urls))

sess = AuthorizedSession(get_credentials())
buckets = {}
rows = []
for i, u in enumerate(urls):
    resp = sess.post("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
                     json={"inspectionUrl": u, "siteUrl": SITE}, timeout=60)
    if resp.status_code == 429:
        print("quota hit at", i); break
    resp.raise_for_status()
    idx = resp.json().get("inspectionResult", {}).get("indexStatusResult", {})
    cs = idx.get("coverageState", "?")
    verdict = idx.get("verdict", "?")
    buckets[cs] = buckets.get(cs, 0) + 1
    rows.append({"url": u, "coverageState": cs, "verdict": verdict,
                 "lastCrawl": idx.get("lastCrawlTime"), "canonical": idx.get("googleCanonical")})
    if (i+1) % 20 == 0: print(i+1, "done", buckets)
    time.sleep(0.3)
json.dump({"generated": "2026-07-17", "rows": rows, "buckets": buckets},
          open("scripts/_medical_audit/inspection_2026-07-17.json", "w"), indent=1)
print(json.dumps(buckets, indent=1))
