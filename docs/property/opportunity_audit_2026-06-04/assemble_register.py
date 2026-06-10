"""Assemble the per-group consolidation outputs into one OPPORTUNITY_REGISTER.md."""
from __future__ import annotations
import json
from pathlib import Path
from collections import defaultdict

HERE = Path(__file__).resolve().parent
TAX = {c["id"]: c for c in json.loads((HERE / "_final_taxonomy.json").read_text())["categories"]}

rows = []  # (tier, cat_name, verdict, priority, title, demand_imp, angle, closest, consolidates)
totals = defaultdict(lambda: defaultdict(int))
for rf in sorted((HERE / "_register").glob("*.json")):
    data = json.loads(rf.read_text())
    for cid, c in data.get("categories", {}).items():
        meta = TAX.get(cid, {})
        tier = meta.get("priority_tier", 9); cname = meta.get("name", cid)
        cnt = c.get("counts", {})
        for k in ("net_new", "expand", "already_covered"):
            totals[cid][k] += cnt.get(k, 0)
        totals[cid]["_tier"] = tier; totals[cid]["_name"] = cname
        for t in c.get("canonical_topics", []):
            v = (t.get("verdict") or "").replace("-", "_")
            if v not in ("net_new", "expand", "expand_existing"):
                continue
            demand = t.get("demand", []) or []
            imp = sum(int(d.get("imp", 0)) for d in demand if isinstance(d, dict))
            pr = t.get("priority", 3)
            pr = {"high": 1, "medium": 2, "low": 3}.get(str(pr).lower(), pr) if not isinstance(pr, int) else pr
            rows.append((tier, cname, "expand" if "expand" in v else "net_new",
                         pr if isinstance(pr, int) else 3, t.get("topic_title", "?"), imp,
                         t.get("suggested_angle", ""), t.get("closest_our_page", ""),
                         t.get("consolidates_competitor_variants", "")))

netnew = [r for r in rows if r[2] == "net_new"]
expand = [r for r in rows if r[2] == "expand"]
netnew.sort(key=lambda r: (r[3], -r[5], r[0]))  # priority, then demand desc

L = ["# Property Opportunity Register — 2026-06-04", "",
     f"Derived from a multi-engine harvest (3,183 GSC+Bing queries x 5 engines -> 6,385 new competitor domains), "
     f"sitemap-mined (~7,800 competitor pages -> 92k clean candidate slugs), clustered into 23 data-derived brand "
     f"categories, consolidated into canonical topics and de-cannibalised against our 686 live pages.", "",
     f"**{len(netnew)} net-new topics** + **{len(expand)} expand-existing**. Technical-tax categories are confirmed "
     f"saturated; the opportunity is brand-breadth (operations, deposits, customer-decision, authority, adjacencies).", "",
     "## Per-category scorecard (net-new / expand / already-covered)", "",
     "| Tier | Category | net-new | expand | already-covered |", "|---|---|---:|---:|---:|"]
for cid, d in sorted(totals.items(), key=lambda kv: (kv[1].get("_tier", 9), kv[1].get("_name", ""))):
    L.append(f"| {d.get('_tier')} | {d.get('_name')} | {d.get('net_new',0)} | {d.get('expand',0)} | {d.get('already_covered',0)} |")

L += ["", "## NET-NEW topics (priority order)", ""]
for tier, cat, _v, pr, title, imp, angle, closest, cons in netnew:
    dem = f" · demand ~{imp} imp" if imp else ""
    L.append(f"- **[P{pr}] {title}** — _{cat}_{dem}")
    if angle:
        L.append(f"  - angle: {angle}")
L += ["", "## EXPAND-EXISTING (deepen a live page)", ""]
for tier, cat, _v, pr, title, imp, angle, closest, cons in sorted(expand, key=lambda r: (r[3], -r[5])):
    L.append(f"- **[P{pr}] {title}** — _{cat}_" + (f" -> expand `{closest}`" if closest else ""))

(HERE / "OPPORTUNITY_REGISTER.md").write_text("\n".join(L), encoding="utf-8")
print(f"net-new: {len(netnew)} | expand: {len(expand)}")
print("by tier (net-new):", dict((t, sum(1 for r in netnew if r[0]==t)) for t in (1,2,3)))
print("top 12 net-new by priority+demand:")
for r in netnew[:12]:
    print(f"  P{r[3]} imp{r[5]:>4}  {r[4]}  ({r[1]})")
print("\nwrote OPPORTUNITY_REGISTER.md")
