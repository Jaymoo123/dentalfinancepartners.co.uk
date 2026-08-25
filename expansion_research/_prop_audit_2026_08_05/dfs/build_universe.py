"""Merge suggest_/related_/ranked_/keywords_for_site_ JSON into a deduped term list + universe skeleton."""
import json
import re
from pathlib import Path

OUT = Path(__file__).parent

# Drop pure real-estate-sales / unrelated noise
DROP_PATTERNS = [
    r"\bestate agent\b", r"\bhouse for sale\b", r"\bhouses for sale\b",
    r"\bproperty for sale\b", r"\brent(al)? (flat|house|room)s?\b",
    r"\bletting agent\b", r"\bmortgage broker\b", r"\bconveyanc",
    r"\bproperty management company\b", r"\bfor rent\b", r"\bzoopla\b",
    r"\brightmove\b", r"\bwhat is a\b.*\baccountant\b$",
    r"\bvehicle\b", r"\bcar tax\b", r"\bvan tax\b", r"\bmot\b", r"\bcouncil tax\b",
    r"\btax disc\b", r"\bdvla\b", r"\bchildcare\b", r"\btax my car\b", r"\broad tax\b",
    r"\bis a car\b", r"\btax free childcare\b", r"\btax credit\b(?!.*property)",
    r"\bcar rental\b", r"\bvan rental\b", r"\bbike rental\b", r"\bbicycle rental\b",
    r"\bvanagon\b", r"\bholiday rental", r"\bvacation rental", r"\brent a car\b",
    r"\bhouse rental\b", r"\brentals? homes?\b",
    r"^rental$", r"^rentals?$", r"\bflats?\b", r"\blondon england\b",
]
DROP_RE = re.compile("|".join(DROP_PATTERNS), re.I)

# Must mention the property/landlord/lettings domain OR a property-specific tax
# scheme by name. Bare "tax"/"hmrc"/"vat" alone is too broad (pulls in car tax,
# council tax, tax credits) so it's excluded unless paired with a domain term.
KEEP_HINTS = re.compile(
    r"landlord|property|buy.?to.?let|\bbtl\b|section 24|"
    r"stamp duty|\bsdlt\b|non.?resident landlord",
    re.I,
)
# bare "rental" only counts alongside accountant/tax/property/landlord (handled
# above); on its own it pulls in car/bike/holiday rental noise so it's dropped
# from KEEP_HINTS and only kept via the other terms already present.


def relevant(term: str) -> bool:
    if DROP_RE.search(term):
        return False
    return bool(KEEP_HINTS.search(term))


def items_from_suggestions_or_related(fp: Path):
    data = json.loads(fp.read_text(encoding="utf-8"))
    out = []
    for task in data.get("tasks", []) or []:
        for result in task.get("result", []) or []:
            for item in result.get("items", []) or []:
                kw = item.get("keyword")
                ki = item.get("keyword_info") or (item.get("keyword_data") or {}).get("keyword_info") or {}
                if not kw:
                    continue
                out.append((kw, ki.get("search_volume"), ki.get("cpc"), ki.get("competition")))
    return out


def items_from_ranked_or_site(fp: Path):
    data = json.loads(fp.read_text(encoding="utf-8"))
    out = []
    for task in data.get("tasks", []) or []:
        for result in task.get("result", []) or []:
            for item in result.get("items", []) or []:
                kd = item.get("keyword_data") or {}
                kw = kd.get("keyword") or item.get("keyword")
                ki = kd.get("keyword_info") or item.get("keyword_info") or {}
                se = item.get("ranked_serp_element") or {}
                rank_pos = None
                serp_item = se.get("serp_item") or {}
                rank_pos = serp_item.get("rank_absolute") or serp_item.get("rank_group")
                if not kw:
                    continue
                out.append((kw, ki.get("search_volume"), ki.get("cpc"), ki.get("competition"), rank_pos))
    return out


universe = {}  # term -> {volume, cpc, competition, sources:set, competitor_ranks: {domain: pos}}

for fp in sorted(OUT.glob("suggest_*.json")):
    for kw, vol, cpc, comp in items_from_suggestions_or_related(fp):
        e = universe.setdefault(kw, {"volume": None, "cpc": None, "competition": None, "sources": set(), "competitor_ranks": {}})
        e["sources"].add("suggestion")
        if vol is not None:
            e["volume"] = vol
        if cpc is not None:
            e["cpc"] = cpc
        if comp is not None:
            e["competition"] = comp

for fp in sorted(OUT.glob("related_*.json")):
    for kw, vol, cpc, comp in items_from_suggestions_or_related(fp):
        e = universe.setdefault(kw, {"volume": None, "cpc": None, "competition": None, "sources": set(), "competitor_ranks": {}})
        e["sources"].add("related")
        if vol is not None:
            e["volume"] = vol
        if cpc is not None:
            e["cpc"] = cpc
        if comp is not None:
            e["competition"] = comp

for fp in sorted(OUT.glob("ranked_*.json")):
    domain = fp.stem.replace("ranked_", "").replace("_", ".")
    for kw, vol, cpc, comp, pos in items_from_ranked_or_site(fp):
        e = universe.setdefault(kw, {"volume": None, "cpc": None, "competition": None, "sources": set(), "competitor_ranks": {}})
        e["sources"].add("competitor")
        if vol is not None:
            e["volume"] = vol
        if cpc is not None:
            e["cpc"] = cpc
        if comp is not None:
            e["competition"] = comp
        if pos is not None:
            e["competitor_ranks"][domain] = pos

for fp in sorted(OUT.glob("keywords_for_site_*.json")):
    for kw, vol, cpc, comp, pos in items_from_ranked_or_site(fp):
        e = universe.setdefault(kw, {"volume": None, "cpc": None, "competition": None, "sources": set(), "competitor_ranks": {}})
        e["sources"].add("our-site")
        if vol is not None:
            e["volume"] = vol
        if cpc is not None:
            e["cpc"] = cpc
        if comp is not None:
            e["competition"] = comp
        if pos is not None:
            e["competitor_ranks"]["propertytaxpartners.co.uk"] = pos

print(f"raw universe size: {len(universe)}")

filtered = {k: v for k, v in universe.items() if relevant(k)}
print(f"filtered (relevant) universe size: {len(filtered)}")

# persist skeleton (pre search_volume enrichment) + plain term list for the volume batch calls
(OUT / "universe_skeleton.json").write_text(
    json.dumps({k: {**v, "sources": sorted(v["sources"])} for k, v in filtered.items()}, indent=2),
    encoding="utf-8",
)
(OUT / "universe_terms.json").write_text(json.dumps(sorted(filtered.keys())), encoding="utf-8")
print("wrote universe_skeleton.json + universe_terms.json")
