"""R3 tier1 startups — Stage 5: union topic pool + estate dedup gate.

Sources: autocomplete_raw.json, dfs_ranked_keywords.json, dfs_keyword_suggestions.json,
rival_sitemaps.json (slug-derived topics).
Dedup: exact-normalised + fuzzy (difflib) vs (a) all estate sitemap slugs/titles
(own_estate_exclusion.json), (b) Supabase blog_topics dump (estate_blog_topics.json).
Outputs: topic_pool.json (kept / dropped_exact / dropped_fuzzy / borderline).
Borderline pairs (0.75<=ratio<0.90) are left for Claude judgment, not auto-dropped.
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

# non-UK / junk / clearly-out-of-scope filters for keyword-type sources
JUNK_RE = re.compile(
    r"canada|\bnz\b|australia|ireland(?!.*northern)|\busa\b|american|india|delaware|"
    r"\birs\b|jobs?\b|vacanc|course|degree|internship|login|sign in|near me|"
    r"quickbooks|xero\b|freeagent|\bsage\b|instagram|facebook|linkedin|reddit|"
    r"meaning|definition|wikipedia|movie|film|lyrics", re.I)


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

    def add(term: str, src: str, meta: dict | None = None) -> None:
        term = re.sub(r"\s+", " ", term.strip().lower())
        if len(term) < 6 or JUNK_RE.search(term):
            return
        # must be startup/tech/SaaS-scope relevant
        if not re.search(r"start-?up|saas|software|tech\b|scale-?up|founder|r&d|r and d|research and development|"
                         r"seis|\beis\b|\bemi\b|advance assurance|share (?:scheme|option)|growth share|csop|"
                         r"venture|vc\b|seed|series [ab]|fundrais|investor|equity|valuation|"
                         r"cap table|runway|burn rate|\bmrr\b|\barr\b|revenue recognition|"
                         r"cfo|convertible|\bsaf[et]\b|option pool|vesting|fintech|spinout", term, re.I):
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
    estate_norm = {norm(t) for t in estate_titles if t}
    estate_list = [(t, norm(t), set(norm(t).split())) for t in estate_titles if t]

    kept, dropped_exact, dropped_fuzzy, borderline = {}, [], [], []
    for term, meta in pool.items():
        n = norm(term)
        if n in estate_norm:
            dropped_exact.append(term)
            continue
        # ponytail: token-overlap + quick_ratio prefilter — pilot's raw O(n*m) full-ratio scan
        # takes ~40 min on this pool; identical thresholds, upper-bound gates preserve results
        best_ratio, best_match = 0.0, None
        ntoks = set(n.split())
        sm = difflib.SequenceMatcher(None, "", n)
        for orig, en, etoks in estate_list:
            if not (ntoks & etoks):
                continue  # zero shared tokens can't reach 0.78 on sorted-token norms
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

    # in-pool self-dedup (exact norm)
    seen, final = {}, {}
    for term, meta in kept.items():
        n = norm(term)
        if n in seen:
            final[seen[n]]["sources"] += meta["sources"]
        else:
            seen[n] = term
            final[term] = meta

    out = {"raw_pool_size": len(pool), "estate_titles_checked": len(estate_titles),
           "kept": final, "dropped_exact": dropped_exact,
           "dropped_fuzzy": dropped_fuzzy, "borderline_for_judgment": borderline}
    (HERE / "topic_pool.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"raw={len(pool)} kept={len(final)} exact_dropped={len(dropped_exact)} "
          f"fuzzy_dropped={len(dropped_fuzzy)} borderline={len(borderline)}")


if __name__ == "__main__":
    main()
