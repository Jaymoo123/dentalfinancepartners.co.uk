"""R3 tier1 pharmacies — Stage 5: union topic pool + estate dedup gate.

Adapted from tier1_hospitality/s5_pool_build.py. Sources this run: autocomplete + rival
sitemaps ONLY (zero DataForSEO — daily guard exhausted; DFS enrichment is a TODO paid pull).
Dedup vs ENTIRE estate (own_estate_exclusion.json slugs + Supabase blog_topics dump).
Medical-site adjacency watched specifically: borderline matches against medical slugs are
flagged with site=medical for Claude judgment.
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
    r"canada|\bnz\b|australia|ireland(?!.*northern)|\busa\b|american|india|dubai|pakistan|"
    r"jobs?\b|salary|salaries|vacanc|career|course|degree|diploma|qualification|university|"
    r"gphc exam|pre-?reg|foundation year|otc training|"
    r"login|near me|software|quickbooks|\bxero\b|\bsage\b|freshbooks|"
    r"instagram|facebook|tiktok|recipe|hiring|"
    # clinical/consumer queries (patient intent, not owner intent)
    r"side effects|dosage|symptom|morning after|viagra|antibiotic|vaccine near|"
    r"opening times|open today|late night|24 hour|"
    # US/AU/CA/consumer noise seen in autocomplete raw
    r"florida|ontario|alberta|auckland|adelaide|texas|california|toronto|melbourne|sydney|"
    r"\bbc\b|reddit|apollo pharmacy|cvs\b|walgreens|chemist warehouse|"
    r"goodwill (?:free|industries|academy|drop|donation)|donate|"
    r"alternator|monopod|motorsports|b31|visa|driving licence|car\b|vehicle", re.I)

# pharmacy business/owner + locum scope relevance gate
SCOPE_RE = re.compile(
    r"pharmac|chemist|locum|dispensing|\bfp34\b|drug tariff|category m|nhsbsa|"
    r"prescription|superintendent|pharmacy first|\bgphc\b|otc\b|p meds|"
    r"wholesale dealer|controlled drugs?\b", re.I)


def norm(s: str) -> str:
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    toks = [t for t in s.split() if t not in STOP]
    return " ".join(sorted(toks))


def slug_to_title(url: str) -> str:
    path = urlparse(url).path.rstrip("/")
    seg = path.rsplit("/", 1)[-1]
    return seg.replace("-", " ").replace("_", " ").strip()


def load_estate_titles() -> list[tuple[str, str]]:
    """Returns (title, site) pairs so medical adjacency can be surfaced."""
    titles: list[tuple[str, str]] = []
    est = json.loads((ROOT / "expansion_research" / "own_estate_exclusion.json").read_text(encoding="utf-8"))
    for site, rec in est["sites"].items():
        for u in rec.get("urls", []):
            t = slug_to_title(u)
            if t and len(t) > 3:
                titles.append((t, site))
    bt = json.loads((RAW / "estate_blog_topics.json").read_text(encoding="utf-8"))
    for row in bt:
        site = row.get("site") or row.get("site_key") or "blog_topics"
        for f in ("topic", "primary_keyword", "slug"):
            v = row.get(f)
            if v:
                titles.append((v.replace("-", " "), site))
    return titles


def collect_pool() -> dict[str, dict]:
    pool: dict[str, dict] = {}

    def add(term: str, src: str, meta: dict | None = None) -> None:
        term = re.sub(r"\s+", " ", term.strip().lower())
        if len(term) < 6 or JUNK_RE.search(term):
            return
        if not SCOPE_RE.search(term):
            return
        row = pool.setdefault(term, {"sources": [], "volume": None, "kd": None})
        row["sources"].append(src)
        if meta:
            if meta.get("volume") is not None:
                row["volume"] = meta["volume"]
            if meta.get("kd") is not None:
                row["kd"] = meta["kd"]

    ac = json.loads((RAW / "autocomplete_raw.json").read_text(encoding="utf-8"))
    for s in ac["unique_suggestions"]:
        add(s, "autocomplete")

    # DFS files intentionally absent this run (zero-spend constraint); loop kept for tomorrow.
    for fname, src in (("dfs_ranked_keywords.json", "ranked_keywords"),
                       ("dfs_keyword_suggestions.json", "keyword_suggestions")):
        p = RAW / fname
        if not p.exists():
            continue
        for kw in json.loads(p.read_text(encoding="utf-8")):
            add(kw["keyword"], src, {"volume": kw.get("volume"), "kd": kw.get("kd")})

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
    estate_norm = {norm(t) for t, _ in estate_titles if t}
    estate_list = [(t, s, norm(t)) for t, s in estate_titles if t]

    kept, dropped_exact, dropped_fuzzy, borderline = {}, [], [], []
    for term, meta in pool.items():
        n = norm(term)
        if n in estate_norm:
            dropped_exact.append(term)
            continue
        best_ratio, best_match, best_site = 0.0, None, None
        for orig, site, en in estate_list:
            r = difflib.SequenceMatcher(None, n, en).ratio()
            if r > best_ratio:
                best_ratio, best_match, best_site = r, orig, site
        if best_ratio >= 0.90:
            dropped_fuzzy.append({"term": term, "match": best_match, "site": best_site,
                                  "ratio": round(best_ratio, 3)})
        elif best_ratio >= 0.78:
            borderline.append({"term": term, "match": best_match, "site": best_site,
                               "ratio": round(best_ratio, 3)})
            kept[term] = {**meta, "borderline_match": best_match,
                          "borderline_site": best_site, "ratio": round(best_ratio, 3)}
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

    medical_flags = [b for b in borderline if b["site"] == "medical"] + \
                    [b for b in dropped_fuzzy if b["site"] == "medical"]
    out = {"raw_pool_size": len(pool), "estate_titles_checked": len(estate_titles),
           "kept": final, "dropped_exact": dropped_exact,
           "dropped_fuzzy": dropped_fuzzy, "borderline_for_judgment": borderline,
           "medical_adjacency_flags": medical_flags}
    (HERE / "topic_pool.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"raw={len(pool)} kept={len(final)} exact_dropped={len(dropped_exact)} "
          f"fuzzy_dropped={len(dropped_fuzzy)} borderline={len(borderline)} "
          f"medical_flags={len(medical_flags)}")


if __name__ == "__main__":
    main()
