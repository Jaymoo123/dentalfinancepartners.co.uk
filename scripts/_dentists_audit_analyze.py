# ponytail: throwaway read-only analysis of _dentists_audit/*.json
import json, os
D = os.path.join(os.path.dirname(__file__), "_dentists_audit")
L = lambda n: json.load(open(f"{D}/{n}.json"))

def agg(rows):
    return {r["keys"][0]: (r["clicks"], r["impressions"], r["ctr"], r["position"]) for r in rows}

# 1. weekly trend
daily = L("daily_90d")
from collections import defaultdict
wk = defaultdict(lambda: [0, 0])
import datetime as dt
for r in daily:
    d = dt.date.fromisoformat(r["keys"][0])
    w = d - dt.timedelta(days=d.weekday())
    wk[str(w)][0] += r["clicks"]; wk[str(w)][1] += r["impressions"]
print("== weekly clicks/impr ==")
for w in sorted(wk): print(w, wk[w])

print("\n== top pages 90d (clicks, impr, ctr, pos) ==")
for r in sorted(L("pages_90d"), key=lambda r: -r["impressions"])[:20]:
    print(f"{r['keys'][0]}  c={r['clicks']} i={r['impressions']} ctr={r['ctr']:.3f} pos={r['position']:.1f}")

print("\n== top queries 90d ==")
for r in sorted(L("queries_90d"), key=lambda r: -r["impressions"])[:25]:
    print(f"{r['keys'][0]!r}  c={r['clicks']} i={r['impressions']} ctr={r['ctr']:.3f} pos={r['position']:.1f}")

print("\n== pre vs post 2026-07-08 per page (impr>=5 either side) ==")
pre, post = agg(L("pages_pre")), agg(L("pages_post"))
days_pre, days_post = 30, 9
for p in sorted(set(pre) | set(post), key=lambda p: -(pre.get(p, (0,0,0,0))[1] + post.get(p, (0,0,0,0))[1])):
    a, b = pre.get(p, (0, 0, 0, 0)), post.get(p, (0, 0, 0, 0))
    if a[1] < 5 and b[1] < 5: continue
    print(f"{p}\n  pre : c={a[0]} i={a[1]} ({a[1]/days_pre:.1f}/d) ctr={a[2]:.3f} pos={a[3]:.1f}"
          f"\n  post: c={b[0]} i={b[1]} ({b[1]/days_post:.1f}/d) ctr={b[2]:.3f} pos={b[3]:.1f}")

print("\n== striking distance queries (pos 5-20, impr>=10, 90d) ==")
for r in sorted(L("queries_90d"), key=lambda r: -r["impressions"]):
    if 5 <= r["position"] <= 20 and r["impressions"] >= 10:
        print(f"{r['keys'][0]!r}  c={r['clicks']} i={r['impressions']} pos={r['position']:.1f}")

print("\n== CTR underperformers (pos<=10, impr>=20, ctr<2%) ==")
for r in L("page_query_28d"):
    if r["position"] <= 10 and r["impressions"] >= 20 and r["ctr"] < 0.02:
        print(f"{r['keys'][1]!r} -> {r['keys'][0]}  i={r['impressions']} c={r['clicks']} pos={r['position']:.1f}")

print("\n== cannibalisation (query on 2+ pages, 28d) ==")
qp = defaultdict(list)
for r in L("page_query_28d"):
    qp[r["keys"][1]].append((r["keys"][0], r["impressions"], r["position"]))
for q, ps in qp.items():
    if len(ps) > 1 and sum(i for _, i, _ in ps) >= 10:
        print(q, ps)
