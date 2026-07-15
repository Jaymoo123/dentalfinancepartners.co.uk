"""R3 tier2 expats — Stage 5: union topic pool + estate dedup gate (HARD).

Adapted from tier1_care/s5_pool_build.py. FREE SOURCES ONLY: autocomplete +
rival sitemaps (no DFS — TODO-paid-pulls later). Dedup vs ENTIRE estate.
Flags property-adjacency (NRL/NRCGT overlaps the property site) for review,
not silent drop. estate_blog_topics.json copied from tier1_care run 2026-07-11.
"""
from __future__ import annotations

import difflib
import json
import re
from pathlib import Path
from urllib.parse import urlparse

HERE = Path(__file__).parent
ROOT = HERE.parent.parent
RAW = HERE / "raw"

STOP = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "is", "are",
        "can", "do", "does", "how", "what", "when", "uk", "your", "you", "my", "we"}

JUNK_RE = re.compile(
    # other-country domestic tax (not UK cross-border)
    r"\birs\b|form 1040|fbar|california|texas|florida|\bcanada revenue|\bcra\b|"
    r"ato\b.*australia|centrelink|kiwisaver|"
    # jobs / courses / software / consumer noise
    r"jobs?\b|salary|salaries|vacanc|career|course|degree|diploma|qualification|"
    r"login|near me|software download|quickbooks|\bxero\b|\bsage\b|"
    r"instagram|facebook|tiktok|reddit|"
    # visas/immigration-only (not tax)
    r"visa requirements|visa application|immigration lawyer|"
    # generic living-abroad lifestyle
    r"cost of living|best places to live|healthcare abroad|schools? in\b", re.I)

SCOPE_RE = re.compile(
    r"expat|non.?resident|non.?dom|nrcgt|\bnrl\b|leaving the uk|leave the uk|"
    r"moving abroad|move abroad|moving to|returning to the uk|arriv|"
    r"split.?year|statutory residence|\bsrt\b|residence test|tax residen|"
    r"overseas landlord|overseas income|foreign income|fig regime|remittance basis|"
    r"double tax|dual resid|tax treaty|treaty relief|worldwide income|offshore|"
    r"abroad\b|overseas\b|cross.?border|p85\b|domicile|seafarer|"
    r"us.?uk tax|uk.?us tax", re.I)

# property-site adjacency watch: NRL/NRCGT terms overlap propertytaxpartners corpus
PROPERTY_ADJ_RE = re.compile(
    r"landlord|rental income|buy.?to.?let|\bsdlt\b|stamp duty|selling.*property|"
    r"property.*(?:tax|sale|sell)|nrcgt", re.I)


def norm(s: str) -> str:
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    toks = [t for t in s.split() if t not in STOP]
    return " ".join(sorted(toks))


def slug_to_title(url: str) -> str:
    path = urlparse(url).path.rstrip("/")
    seg = path.rsplit("/", 1)[-1]
    return seg.replace("-", " ").replace("_", " ").strip()


def load_estate_titles() -> list[str]:
    titles = []
    est = json.loads((ROOT / "expansion_research" / "own_estate_exclusion.json").read_text(encoding="utf-8"))
    for site in est["sites"].values():
        for u in site.get("urls", []):
            t = slug_to_title(u)
            if t and len(t) > 3:
                titles.append(t)
    bt = json.loads((RAW / "estate_blog_topics.json").read_text(encoding="utf-8"))
    for row in bt:
        for f in ("topic", "primary_keyword", "slug"):
            v = row.get(f)
            if v:
                titles.append(v.replace("-", " "))
    return titles


def collect_pool() -> dict[str, dict]:
    pool: dict[str, dict] = {}

    def add(term: str, src: str) -> None:
        term = re.sub(r"\s+", " ", term.strip().lower())
        if len(term) < 6 or JUNK_RE.search(term):
            return
        if not SCOPE_RE.search(term):
            return
        row = pool.setdefault(term, {"sources": [], "property_adjacent": bool(PROPERTY_ADJ_RE.search(term))})
        row["sources"].append(src)

    ac = json.loads((RAW / "autocomplete_raw.json").read_text(encoding="utf-8"))
    for s in ac["unique_suggestions"]:
        add(s, "autocomplete")

    sm = RAW / "rival_sitemaps.json"
    if sm.exists():
        for dom, rec in json.loads(sm.read_text(encoding="utf-8")).items():
            for u in rec.get("urls", []):
                t = slug_to_title(u)
                if t and len(t.split()) >= 3:
                    add(t, f"sitemap:{dom}")
    return pool


def main() -> None:
    pool = collect_pool()
    estate_titles = load_estate_titles()
    estate_norm = {norm(t) for t in estate_titles if t}
    estate_list = [(t, norm(t)) for t in estate_titles if t]

    kept, dropped_exact, dropped_fuzzy, borderline = {}, [], [], []
    for term, meta in pool.items():
        n = norm(term)
        if n in estate_norm:
            dropped_exact.append(term)
            continue
        best_ratio, best_match = 0.0, None
        sm = difflib.SequenceMatcher(None, "", n)
        for orig, en in estate_list:
            sm.set_seq1(en)
            if sm.real_quick_ratio() < 0.78 or sm.quick_ratio() < 0.78:
                continue
            r = sm.ratio()
            if r > best_ratio:
                best_ratio, best_match = r, orig
        if best_ratio >= 0.90:
            dropped_fuzzy.append({"term": term, "match": best_match, "ratio": round(best_ratio, 3)})
        elif best_ratio >= 0.78:
            borderline.append({"term": term, "match": best_match, "ratio": round(best_ratio, 3)})
            kept[term] = {**meta, "borderline_match": best_match, "ratio": round(best_ratio, 3)}
        else:
            kept[term] = meta

    seen, final = {}, {}
    for term, meta in kept.items():
        n = norm(term)
        if n in seen:
            final[seen[n]]["sources"] += meta["sources"]
        else:
            seen[n] = term
            final[term] = meta

    prop_adj = [t for t, m in final.items() if m.get("property_adjacent")]
    out = {"raw_pool_size": len(pool), "estate_titles_checked": len(estate_titles),
           "kept": final, "dropped_exact": dropped_exact,
           "dropped_fuzzy": dropped_fuzzy, "borderline_for_judgment": borderline,
           "property_adjacent_flagged": prop_adj}
    (HERE / "topic_pool.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"raw={len(pool)} kept={len(final)} exact_dropped={len(dropped_exact)} "
          f"fuzzy_dropped={len(dropped_fuzzy)} borderline={len(borderline)} prop_adj={len(prop_adj)}")


if __name__ == "__main__":
    main()
