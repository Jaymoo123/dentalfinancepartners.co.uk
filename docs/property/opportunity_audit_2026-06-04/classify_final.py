"""Classify the full clean corpus + our 686 pages into the FINAL taxonomy.
Produces the gap map and stages per-category candidate slugs for consolidation.
"""
from __future__ import annotations
import json
from pathlib import Path
from collections import defaultdict

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
TAX = json.loads((HERE / "_final_taxonomy.json").read_text())["categories"]
clean = json.loads((HERE / "_clean_corpus.json").read_text())  # {slug: domain}
our = [p.stem for p in (ROOT / "Property/web/content/blog").glob("*.md")]

def classify(slug):
    s = slug.lower()
    best, score = None, 0
    for c in TAX:
        sc = sum(1 for kw in c["signature_keywords"] if kw in s)
        if sc > score:
            score, best = sc, c["id"]
    return best

comp = defaultdict(list); ours = defaultdict(int); cu = ou = 0
for s, dom in clean.items():
    cid = classify(s)
    if cid: comp[cid].append({"slug": s, "domain": dom})
    else: cu += 1
for s in our:
    cid = classify(s)
    if cid: ours[cid] += 1
    else: ou += 1

out = {"competitor_clean": len(clean), "our_pages": len(our),
       "competitor_unclassified": cu, "our_unclassified": ou, "categories": {}}
print(f"clean competitor slugs: {len(clean)} | our pages: {len(our)} | comp-unclassified: {cu}")
print(f"{'TIER':>4} {'CATEGORY':<42}{'comp':>7}{'ours':>6}")
for c in sorted(TAX, key=lambda c: (c["priority_tier"], c["id"])):
    cid = c["id"]; items = comp[cid]
    out["categories"][cid] = {"name": c["name"], "tier": c["priority_tier"],
                              "brand_function": c["brand_function"], "definition": c.get("definition", ""),
                              "competitor_count": len(items), "our_pages": ours[cid],
                              "candidates": items[:300]}
    print(f"{c['priority_tier']:>4} {c['name'][:41]:<42}{len(items):>7}{ours[cid]:>6}")
(HERE / "_final_gap_map.json").write_text(json.dumps(out, indent=2))
print(f"\nunclassified competitor slugs: {cu} (diffuse long-tail not matching any signature)")
print("wrote _final_gap_map.json")
