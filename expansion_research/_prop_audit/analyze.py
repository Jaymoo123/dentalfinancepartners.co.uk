# ponytail: scratch analysis
import json, os
from collections import defaultdict
OUT = os.path.join(os.path.dirname(__file__))
L = lambda n: json.load(open(os.path.join(OUT, n)))

dates = L("gsc_date.json")
pd_ = L("gsc_page_date.json")
qd = L("gsc_query_date.json")
pq = L("gsc_page_query.json")

def seg(rows, keyfn, start, end):
    agg = defaultdict(lambda: [0, 0, 0.0, 0])  # clicks, impr, pos*impr, n
    for r in rows:
        d = r["keys"][-1]
        if not (start <= d <= end): continue
        k = keyfn(r)
        a = agg[k]
        a[0] += r["clicks"]; a[1] += r["impressions"]
        a[2] += r["position"] * r["impressions"]; a[3] += 1
    return agg

def tot(rows, start, end):
    c = i = 0; pw = 0.0
    for r in rows:
        d = r["keys"][0]
        if start <= d <= end:
            c += r["clicks"]; i += r["impressions"]; pw += r["position"] * r["impressions"]
    return c, i, round(pw / i, 2) if i else 0

# weekly totals
print("== weekly totals (date, clicks, impr, avg pos) ==")
wk = defaultdict(lambda: [0, 0, 0.0])
for r in dates:
    d = r["keys"][0]
    import datetime as dt
    w = dt.date.fromisoformat(d)
    w = (w - dt.timedelta(days=w.weekday())).isoformat()
    wk[w][0] += r["clicks"]; wk[w][1] += r["impressions"]; wk[w][2] += r["position"] * r["impressions"]
for w in sorted(wk):
    c, i, pw = wk[w]
    print(w, c, i, round(pw / i, 2) if i else 0)

# segment windows around 07-08/09 interventions (equal 7d and 14d windows)
for a, b, lbl in [("2026-06-24", "2026-07-07", "PRE 14d"), ("2026-07-08", "2026-07-15", "POST 8d")]:
    print(lbl, tot(dates, a, b))

# page-level pre/post (14d pre vs post 8d, normalized per day)
pre = seg(pd_, lambda r: r["keys"][0], "2026-06-24", "2026-07-07")
post = seg(pd_, lambda r: r["keys"][0], "2026-07-08", "2026-07-15")
def rate(a, days): return (a[0] / days, a[1] / days, a[2] / a[1] if a[1] else 0)
print("\n== page movers (impr/day post vs pre, top |delta|) ==")
movers = []
for p in set(pre) | set(post):
    c0, i0, p0 = rate(pre.get(p, [0,0,0,0]), 14); c1, i1, p1 = rate(post.get(p, [0,0,0,0]), 8)
    movers.append((i1 - i0, p, round(i0,1), round(i1,1), round(c0,2), round(c1,2), round(p0,1), round(p1,1)))
movers.sort()
for m in movers[:8] + movers[-10:]:
    print(m)

# new pages (first impression >= 2026-07-01)
first = {}
for r in pd_:
    p, d = r["keys"]
    if p not in first or d < first[p]: first[p] = d
newp = {p for p, d in first.items() if d >= "2026-07-01"}
print(f"\n== new pages since 07-01: {len(newp)} ==")
tots = defaultdict(lambda: [0,0,0.0])
for r in pd_:
    p = r["keys"][0]
    if p in newp:
        t = tots[p]; t[0]+=r["clicks"]; t[1]+=r["impressions"]; t[2]+=r["position"]*r["impressions"]
for p, t in sorted(tots.items(), key=lambda x: -x[1][1])[:15]:
    print(p, t[0], t[1], round(t[2]/t[1],1) if t[1] else 0)

# striking distance queries (pos 5-20, high impr) - last 28d
q28 = seg(qd, lambda r: r["keys"][0], "2026-06-18", "2026-07-15")
print("\n== striking distance (pos 5-20, 28d, by impr) ==")
sd = [(a[1], q, a[0], round(a[2]/a[1],1)) for q, a in q28.items() if a[1] >= 30 and 5 <= a[2]/a[1] <= 20]
for x in sorted(sd, reverse=True)[:15]: print(x)

# CTR underperformers: pos <=5, impr high, ctr low (28d)
print("\n== CTR underperformers (pos<=5, impr>=50, 28d) ==")
cu = [(a[1], q, a[0], round(a[0]/a[1],3), round(a[2]/a[1],1)) for q, a in q28.items() if a[1] >= 50 and a[2]/a[1] <= 5 and a[0]/a[1] < 0.02]
for x in sorted(cu, reverse=True)[:12]: print(x)

# query movers pre/post
qpre = seg(qd, lambda r: r["keys"][0], "2026-06-24", "2026-07-07")
qpost = seg(qd, lambda r: r["keys"][0], "2026-07-08", "2026-07-15")
print("\n== query movers (impr/day delta) ==")
qm = []
for q in set(qpre) | set(qpost):
    _, i0, p0 = rate(qpre.get(q,[0,0,0,0]), 14); _, i1, p1 = rate(qpost.get(q,[0,0,0,0]), 8)
    qm.append((round(i1-i0,1), q, round(i0,1), round(i1,1), round(p0,1), round(p1,1)))
qm.sort()
for x in qm[:6] + qm[-8:]: print(x)

# cannibalisation: queries with >=2 pages each >=20% of impressions (page_query 90d)
print("\n== cannibalisation candidates ==")
byq = defaultdict(list)
for r in pq:
    byq[r["keys"][1]].append((r["impressions"], r["keys"][0], round(r["position"],1)))
for q, lst in byq.items():
    ti = sum(x[0] for x in lst)
    big = [x for x in lst if x[0] >= 0.2 * ti]
    if ti >= 60 and len(big) >= 2:
        print(q, ti, sorted(big, reverse=True)[:3])

# decaying pages: 90d trend, compare first 30d in-window vs last 30d
e30a = seg(pd_, lambda r: r["keys"][0], "2026-04-16", "2026-05-15")
e30b = seg(pd_, lambda r: r["keys"][0], "2026-06-16", "2026-07-15")
print("\n== decaying pages (impr 4/16-5/15 vs 6/16-7/15) ==")
dec = []
for p in set(e30a):
    i0 = e30a[p][1]; i1 = e30b.get(p, [0,0,0,0])[1]
    if i0 >= 100 and i1 < 0.6 * i0:
        dec.append((i0 - i1, p, i0, i1, e30a[p][0], e30b.get(p,[0]*4)[0]))
for x in sorted(dec, reverse=True)[:12]: print(x)

# bing top
bq = L("bing_query.json")
print("\n== bing top queries ==")
for q in sorted(bq, key=lambda x: -x.get("Impressions",0))[:12]:
    print(q.get("Query"), q.get("Impressions"), q.get("Clicks"), q.get("AvgImpressionPosition"))
print("bing totals:", sum(q.get("Impressions",0) for q in bq), sum(q.get("Clicks",0) for q in bq))
