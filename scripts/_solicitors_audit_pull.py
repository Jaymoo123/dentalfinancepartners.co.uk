# ponytail: one-off read-only audit pull, prints JSON summaries, no DB writes
import os, sys, json
from datetime import date, timedelta
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT); sys.path.insert(0, ROOT)
from agents.utils.gsc_client_oauth import GSCClient

SITE = "sc-domain:accountsforlawyers.co.uk"
c = GSCClient()
svc = c.service
end = date.today() - timedelta(days=2)
start = end - timedelta(days=90)

def q(dims, limit=5000):
    return svc.searchanalytics().query(siteUrl=SITE, body={
        "startDate": str(start), "endDate": str(end),
        "dimensions": dims, "rowLimit": limit}).execute().get("rows", [])

try:
    daily = q(["date"], 500)
except Exception as e:
    print("GSC_ERROR:", e); sys.exit(1)

print("DAILY_COUNT", len(daily))
# weekly rollup
from collections import defaultdict
wk = defaultdict(lambda: [0,0,0.0,0])
for r in daily:
    d = r["keys"][0]
    w = date.fromisoformat(d).isocalendar()[:2]
    wk[w][0] += r["clicks"]; wk[w][1] += r["impressions"]
    wk[w][2] += r["position"]*r["impressions"]; wk[w][3] += 1
for w in sorted(wk):
    cl,im,pw,n = wk[w]
    print(f"WEEK {w[0]}-W{w[1]:02d} clicks={cl:.0f} impr={im:.0f} avgpos={pw/im if im else 0:.1f}")

qs = q(["query"])
ps = q(["page"])
print("\nTOP_QUERIES (clicks, impr, ctr, pos):")
for r in sorted(qs, key=lambda r:-r["impressions"])[:30]:
    print(f"  {r['keys'][0][:70]!r} c={r['clicks']:.0f} i={r['impressions']:.0f} ctr={r['ctr']*100:.1f}% pos={r['position']:.1f}")
print("\nSTRIKING_DISTANCE (pos 5-20, impr>=10):")
for r in sorted([r for r in qs if 5<=r["position"]<=20 and r["impressions"]>=10], key=lambda r:-r["impressions"])[:25]:
    print(f"  {r['keys'][0][:70]!r} i={r['impressions']:.0f} pos={r['position']:.1f} ctr={r['ctr']*100:.1f}%")
print("\nTOP_PAGES:")
for r in sorted(ps, key=lambda r:-r["impressions"])[:30]:
    print(f"  {r['keys'][0].replace('https://accountsforlawyers.co.uk','')[:80]} c={r['clicks']:.0f} i={r['impressions']:.0f} pos={r['position']:.1f}")
print("\nTOTAL_PAGES_WITH_IMPR", len(ps), "TOTAL_QUERIES", len(qs))
