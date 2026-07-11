"""R3 tier1 crypto — Stage 5: union topic pool + estate dedup gate.

Sources: autocomplete_raw.json, rival_sitemaps.json (slug-derived topics).
NO DataForSEO sources in this run (cost guard exhausted) — dfs_*.json are read
IF present so tomorrow's paid pulls can be merged by re-running this script.
Dedup: exact-normalised + fuzzy (difflib, token-overlap prefilter) vs
(a) estate sitemap slugs (own_estate_exclusion.json), (b) estate_blog_topics.json.
Property-CGT adjacency is the known collision surface — borderline pairs kept for judgment.
Outputs: topic_pool.json.
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
    r"canada|\bnz\b|australia|ireland(?!.*northern)|\busa\b|american|india|germany|"
    r"\birs\b|form 8949|jobs?\b|vacanc|course|degree|internship|login|sign in|near me|"
    r"price prediction|should i buy|best crypto to|how to buy|coinbase fees|binance fees|"
    r"instagram|facebook|reddit|meaning|definition|wikipedia|movie|film|lyrics", re.I)

SCOPE_RE = re.compile(
    r"crypto|bitcoin|\bbtc\b|ethereum|\beth\b|defi|\bnft\b|staking|mining|airdrop|"
    r"altcoin|token|blockchain|web3|stablecoin|binance|coinbase|kraken|koinly|"
    r"day trad|forex|spread bet|\bcfd\b|trader tax|trading tax|"
    r"section 104|share pool|bed and breakfast|nudge letter|disclosure|"
    r"digital asset|wallet", re.I)


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

    # TODO-paid-pulls: these files do not exist yet; created by tomorrow's DFS calls.
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
        best_ratio, best_match = 0.0, None
        ntoks = set(n.split())
        sm = difflib.SequenceMatcher(None, "", n)
        for orig, en, etoks in estate_list:
            if not (ntoks & etoks):
                continue
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

    out = {"raw_pool_size": len(pool), "estate_titles_checked": len(estate_titles),
           "kept": final, "dropped_exact": dropped_exact,
           "dropped_fuzzy": dropped_fuzzy, "borderline_for_judgment": borderline}
    (HERE / "topic_pool.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"raw={len(pool)} kept={len(final)} exact_dropped={len(dropped_exact)} "
          f"fuzzy_dropped={len(dropped_fuzzy)} borderline={len(borderline)}")


if __name__ == "__main__":
    main()
