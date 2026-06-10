"""Classify the mined competitor candidates + our own pages into the EMERGENT taxonomy
(_emergent_taxonomy.json, derived bottom-up from the data) and produce the gap map.

Each slug -> the category whose data-derived signature_keywords it matches most (ties
broken by taxonomy order). Read-only; writes _emergent_gap_map.json. Reusable.
"""
from __future__ import annotations
import json, re
from pathlib import Path
from collections import defaultdict

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
TAX = json.loads((HERE / "_emergent_taxonomy.json").read_text())["categories"]

NOISE = re.compile(r"(athens|greece|kallithea|smirni|kentro|diamerisma|alfamesitiki|golden-visa|illinois|chicago|texas|sydney|prahran|new-zealand|chalmers|negative-gearing|\.\d{4,}|\bvol-\d|oitr|ptpr|-q-c\b|ramadan|quran|fraud|jail|scam|sentenced|spared|fitch|lonely-hearts|nightmare|boris|blairs|candy-brothers|rayner|reeves|hunt|receipts-hit|\bvero\b|florida|carrollton)", re.I)
CASE = re.compile(r"(\bv-hmrc|vs-hmrc|-vs-|tribunal|\bftt\b|upper-tribunal|judgment|spotlight-\d)", re.I)

def classify(slug):
    s = slug.lower()
    best_id, best_score = None, 0
    for c in TAX:  # taxonomy order = tiebreak priority
        score = sum(1 for kw in c["signature_keywords"] if kw in s)
        if score > best_score:
            best_score, best_id = score, c["id"]
    return best_id  # None if nothing matched

def main():
    # competitor candidates (slugs we don't closely have), deduped, noise-stripped
    cands = {}
    for cf in (HERE / "_sitemap_cache").glob("*.json"):
        d = json.loads(cf.read_text())
        for t in d["topical"]:
            if t["best_jaccard"] < 0.30 and not NOISE.search(t["slug"]) and not CASE.search(t["slug"]):
                cands.setdefault(t["slug"], d["domain"])
    our = [p.stem for p in (ROOT / "Property/web/content/blog").glob("*.md")]

    comp = defaultdict(list); ours = defaultdict(int); comp_uncl = ours_uncl = 0
    for s, dom in cands.items():
        cid = classify(s)
        if cid: comp[cid].append({"slug": s, "domain": dom})
        else: comp_uncl += 1
    for s in our:
        cid = classify(s)
        if cid: ours[cid] += 1
        else: ours_uncl += 1

    meta = {c["id"]: c for c in TAX}
    out = {"domains_mined": len(list((HERE / "_sitemap_cache").glob("*.json"))),
           "competitor_candidates": len(cands), "our_pages": len(our),
           "competitor_unclassified": comp_uncl, "our_unclassified": ours_uncl, "categories": {}}
    print(f"domains mined: {out['domains_mined']} | competitor candidates: {len(cands)} | our pages: {len(our)}")
    print(f"{'CATEGORY (emergent)':<46}{'brand_function':<34}{'comp-gap':>9}{'ours':>6}")
    for c in TAX:
        cid = c["id"]
        items = comp[cid]
        out["categories"][cid] = {"name": c["name"], "brand_function": c["brand_function"],
                                  "on_mission": c["on_mission"], "competitor_gap": len(items),
                                  "our_pages": ours[cid], "samples": [x["slug"] for x in items[:8]],
                                  "candidates": items}
        flag = "" if c["on_mission"] else "  (off-mission)"
        print(f"{c['name'][:45]:<46}{c['brand_function'][:33]:<34}{len(items):>9}{ours[cid]:>6}{flag}")
    print(f"{'(unclassified)':<46}{'':<34}{comp_uncl:>9}{ours_uncl:>6}")
    (HERE / "_emergent_gap_map.json").write_text(json.dumps(out, indent=2))
    print("\nwrote _emergent_gap_map.json")

if __name__ == "__main__":
    main()
