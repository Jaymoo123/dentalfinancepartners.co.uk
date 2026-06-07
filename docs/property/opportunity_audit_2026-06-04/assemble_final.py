"""Final register: union of the full-corpus core adjudication (_register2, with
competitor-convergence signal) + the earlier sample pass (_register), deduped.
Writes OPPORTUNITY_REGISTER_FINAL.md.
"""
from __future__ import annotations
import json, re
from pathlib import Path

A = Path(__file__).resolve().parent

def load(dirn):
    rows = []
    for rf in (A / dirn).glob("*.json"):
        d = json.loads(rf.read_text())
        for cid, c in d.get("categories", {}).items():
            for t in c.get("topics", c.get("canonical_topics", [])):
                v = (t.get("verdict") or "").replace("-", "_")
                kind = "net_new" if v.startswith("net") else ("expand" if "expand" in v else None)
                if not kind:
                    continue
                rows.append({
                    "kind": kind, "title": t.get("topic_title", "?"),
                    "cat": t.get("assigned_category", cid),
                    "n": int(t.get("n_competitors", 0) or 0),
                    "imp": sum(int(x.get("imp", 0)) for x in (t.get("demand") or []) if isinstance(x, dict)),
                    "angle": t.get("suggested_angle", ""), "closest": t.get("closest_our_page", ""),
                })
    return rows

rows = load("_register2") + load("_register")

def key(t):
    return set(w for w in re.split(r"[^a-z0-9]+", t["title"].lower()) if len(w) > 3)

def dedupe(items):
    out = []
    for t in sorted(items, key=lambda x: -(x["n"] + x["imp"])):
        k = key(t)
        if any(len(k & key(m)) >= max(2, int(0.6 * min(len(k), len(key(m))))) for m in out):
            continue
        out.append(t)
    return out

netnew = dedupe([r for r in rows if r["kind"] == "net_new"])
expand = dedupe([r for r in rows if r["kind"] == "expand"])
catname = {c["id"]: c["name"] for c in json.loads((A / "_final_taxonomy.json").read_text())["categories"]}

L = ["# Property Opportunity Register (FINAL) — 2026-06-04", "",
     "**Full-corpus pass — every slug processed, no cap.**", "",
     "```",
     "91,789 clean candidate slugs (from 6,385 new competitor domains, 5 search engines)",
     "   -> dedupe via embedding + clustering",
     "   463 canonical topic cores  +  71,787 one-offs (single-competitor / niche / noise)",
     "   -> adjudicate all 463 cores vs our 686 live pages",
     f"   {len([r for r in rows if r['kind']=='net_new'])} net-new (pre-dedupe)  +  ~340 already-covered / off-mission",
     f"   -> union with sample pass, deduped  =  {len(netnew)} net-new + {len(expand)} expand-existing",
     "```", "",
     "Net-new is concentrated in BRAND-BREADTH (operations, deposits, mistakes/myths, buying, finance, "
     "customer-decision); technical tax is confirmed saturated. `n` = distinct competitors converging on the topic "
     "(confidence/priority signal); `imp` = GSC+Bing demand.", "",
     f"## NET-NEW ({len(netnew)}) — ranked by competitor-convergence + demand", ""]
for t in netnew:
    sig = []
    if t["n"]: sig.append(f"**{t['n']} competitors**")
    if t["imp"]: sig.append(f"~{t['imp']} imp")
    tag = f" — _{catname.get(t['cat'], t['cat'])}_" if t["cat"] in catname else ""
    L.append(f"- {t['title']}  [{', '.join(sig) or 'long-tail'}]{tag}")
    if t["angle"]:
        L.append(f"  - {t['angle']}")
L += ["", f"## EXPAND-EXISTING ({len(expand)}) — deepen a live page", ""]
for t in expand:
    L.append(f"- {t['title']}" + (f"  → `{t['closest']}`" if t["closest"] else ""))

(A / "OPPORTUNITY_REGISTER_FINAL.md").write_text("\n".join(L), encoding="utf-8")
print(f"net-new (deduped union): {len(netnew)} | expand: {len(expand)}")
print("wrote OPPORTUNITY_REGISTER_FINAL.md")
