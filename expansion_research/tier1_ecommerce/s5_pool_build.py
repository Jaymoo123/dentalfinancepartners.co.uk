"""R3 tier1 ecommerce — Stage 5: union topic pool + estate dedup gate (HARD).

Adapted from tier1_care/s5_pool_build.py. FREE SOURCES ONLY: autocomplete +
rival sitemaps (no DFS files — TODO-paid-pulls will add them later).
Dedup vs ENTIRE estate (sitemap slugs in own_estate_exclusion.json +
raw/estate_blog_topics.json snapshot). Borderline pairs left for Claude judgment.
Adjacency flags for this niche: contractors-ir35 wall (IR35/contractor terms) and
generalist wall (handled structurally by the ecommerce SCOPE_RE gate + dedup).
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
    r"canada|\bnz\b|australia|ireland(?!.*northern)|\busa\b|american|india|dubai|"
    r"singapore|hong kong|\bhk\b|malaysia|pakistan|nigeria|philippines|"
    r"jobs?\b|salary|salaries|vacanc|career|course|degree|diploma|qualification|"
    r"login|sign in|near me|"
    r"instagram followers|tiktok followers|"
    # consumer/buyer-side ecommerce intent (not seller-side)
    r"best deals|discount code|voucher|coupon|track (?:my )?order|refund from|"
    r"is .* legit|review of|customer service number", re.I)

# ecommerce-seller-scope relevance gate
SCOPE_RE = re.compile(
    r"e-?commerce|amazon|\bfba\b|shopify|\betsy\b|ebay|tiktok shop|woocommerce|"
    r"online (?:sell|seller|store|shop|retail|business|arbitrage)|marketplace|dropship|"
    r"multi-?channel|\bdtc\b|d2c|direct.to.consumer|"
    r"\boss\b|\bioss\b|import one stop|one stop shop|distance sell|cross.?border|"
    r"seller central|settlement|\ba2x\b|link my books|"
    r"inventory|\bcogs\b|cost of goods|stock valuation|"
    r"side hustle|reselling|reseller|print on demand|private label|retail arbitrage", re.I)

# contractors-ir35 adjacency watch: terms that would erode the contractors site's wall
IR35_ADJ_RE = re.compile(
    r"\bir35\b|contractor|freelanc|umbrella compan|personal service compan|\bpsc\b|"
    r"day rate|outside ir35|inside ir35", re.I)


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
        row = pool.setdefault(term, {"sources": [], "ir35_adjacent": bool(IR35_ADJ_RE.search(term))})
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
        for orig, en in estate_list:
            r = difflib.SequenceMatcher(None, n, en).ratio()
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

    ir35_adj = [t for t, m in final.items() if m.get("ir35_adjacent")]
    out = {"raw_pool_size": len(pool), "estate_titles_checked": len(estate_titles),
           "kept": final, "dropped_exact": dropped_exact,
           "dropped_fuzzy": dropped_fuzzy, "borderline_for_judgment": borderline,
           "ir35_adjacent_flagged": ir35_adj}
    (HERE / "topic_pool.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"raw={len(pool)} kept={len(final)} exact_dropped={len(dropped_exact)} "
          f"fuzzy_dropped={len(dropped_fuzzy)} borderline={len(borderline)} ir35_adj={len(ir35_adj)}")


if __name__ == "__main__":
    main()
