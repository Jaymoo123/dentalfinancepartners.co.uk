"""Enrich universe with UK search_volume, dump serp_composition.json + four_market.json + universe_merged.json."""
import json
from pathlib import Path
from urllib.parse import urlparse

OUT = Path(__file__).parent

skeleton = json.loads((OUT / "universe_skeleton.json").read_text(encoding="utf-8"))

# --- merge UK search_volume batches over the skeleton (authoritative volume/cpc/competition) ---
vol_updates = 0
for fp in sorted(OUT.glob("volume_uk_batch*.json")):
    data = json.loads(fp.read_text(encoding="utf-8"))
    for task in data.get("tasks", []) or []:
        for item in task.get("result", []) or []:
            kw = item.get("keyword")
            if kw in skeleton:
                skeleton[kw]["volume"] = item.get("search_volume")
                skeleton[kw]["cpc"] = item.get("cpc")
                skeleton[kw]["competition"] = item.get("competition")
                skeleton[kw]["sources"] = sorted(set(skeleton[kw]["sources"]) | {"search_volume_uk"})
                vol_updates += 1

(OUT / "universe_merged.json").write_text(json.dumps(skeleton, indent=2), encoding="utf-8")
print(f"universe_merged.json: {len(skeleton)} terms, {vol_updates} volume-enriched")

# --- four_market.json ---
four_market = {}
for name in ("us", "au", "ca"):
    data = json.loads((OUT / f"volume_{name}.json").read_text(encoding="utf-8"))
    for task in data.get("tasks", []) or []:
        for item in task.get("result", []) or []:
            kw = item.get("keyword")
            four_market.setdefault(kw, {})[name] = {
                "volume": item.get("search_volume"),
                "cpc": item.get("cpc"),
                "competition": item.get("competition"),
            }
(OUT / "four_market.json").write_text(json.dumps(four_market, indent=2), encoding="utf-8")
print(f"four_market.json: {len(four_market)} terms")

# --- serp_composition.json ---
def page_type(url: str) -> str:
    path = urlparse(url).path.lower()
    if path in ("", "/"):
        return "homepage"
    if "/blog" in path or "/news" in path or "/guide" in path or "/article" in path:
        return "blog"
    if "/service" in path or "/for-landlords" in path or "/accounting" in path:
        return "service"
    return "other"


serp_comp = {}
for fp in sorted(OUT.glob("serp_*.json")):
    data = json.loads(fp.read_text(encoding="utf-8"))
    for task in data.get("tasks", []) or []:
        kw = (task.get("data") or {}).get("keyword")
        for result in task.get("result", []) or []:
            items = result.get("items", []) or []
            ai_overview = any(i.get("type") == "ai_overview" for i in items)
            local_pack = [i for i in items if i.get("type") in ("local_pack", "maps")]
            paa = any(i.get("type") == "people_also_ask" for i in items)
            organic = [i for i in items if i.get("type") == "organic"][:10]
            serp_comp[kw or fp.stem] = {
                "ai_overview": ai_overview,
                "local_pack": bool(local_pack),
                "local_pack_names": [
                    (li.get("title") or li.get("name")) for lp in local_pack for li in (lp.get("items") or [lp])
                ][:5],
                "paa": paa,
                "top10": [
                    {
                        "rank": o.get("rank_absolute"),
                        "domain": o.get("domain"),
                        "url": o.get("url"),
                        "page_type": page_type(o.get("url") or ""),
                    }
                    for o in organic
                ],
            }
(OUT / "serp_composition.json").write_text(json.dumps(serp_comp, indent=2), encoding="utf-8")
print(f"serp_composition.json: {len(serp_comp)} terms")

# --- quick report bits ---
ranked = sorted(
    ((k, v) for k, v in skeleton.items() if v.get("volume")),
    key=lambda kv: kv[1]["volume"],
    reverse=True,
)
print("\nTOP 30 by UK volume:")
for k, v in ranked[:30]:
    print(f"  {v['volume']:>7}  cpc={v.get('cpc')}  {k}")

local_pack_terms = [k for k, v in serp_comp.items() if v["local_pack"]]
ai_terms = [k for k, v in serp_comp.items() if v["ai_overview"]]
print(f"\nlocal_pack terms ({len(local_pack_terms)}): {local_pack_terms}")
print(f"ai_overview terms ({len(ai_terms)}): {ai_terms}")
