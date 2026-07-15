"""R3 tier2 travel — Stage 5: union topic pool + intent split + estate dedup gate (HARD).

Adapted from tier1_care/s5_pool_build.py. FREE SOURCES ONLY (autocomplete + rival
sitemaps; no DFS — volumes stay null, paid pulls listed in VERDICT TODO).
Core of the R2 intent-correction: every kept term is tagged hire_intent (business
seeking an accountant/TOMS/ATOL adviser or provider-side finance topic) vs
consumer_travel noise, which is dropped and counted.
Estate blog-topic snapshot reused from tier1_care/raw/estate_blog_topics.json (2026-07-11).
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
CARE_RAW = ROOT / "expansion_research" / "tier1_care" / "raw"

STOP = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "is", "are",
        "can", "do", "does", "how", "what", "when", "uk", "your", "you", "my", "we"}

# hard junk: geo, jobs, software brands, misc
JUNK_RE = re.compile(
    r"canada|\bnz\b|australia|ireland(?!.*northern)|\busa\b|american|india|dubai|"
    r"pakistan|nigeria|kenya|south africa|philippines|"
    r"jobs?\b|salary|salaries|vacanc|career|course|degree|diploma|qualification|"
    r"login|near me|software|quickbooks|\bxero\b|\bsage\b|freshbooks|"
    r"instagram|facebook|tiktok|recruitment", re.I)

# CONSUMER travel intent — the noise R2 conflated with buyer volume. Dropped + counted.
CONSUMER_RE = re.compile(
    r"cheap|deals?\b|best (?:holiday|hotel|flight|time)|book(?:ing)? (?:a )?(?:holiday|flight|hotel)|"
    r"refund|compensation|claim\b|cancelled|delay|is my (?:holiday|money) (?:protected|safe)|"
    r"atol certificate|atol protected (?:meaning|holiday)|what does atol|abta protected|"
    r"check (?:atol|abta)|holiday packages?|all inclusive|last minute|"
    r"travel insurance|visa requirements|passport", re.I)

# provider/hire scope gate: term must be about the travel BUSINESS or its finance/regulation
SCOPE_RE = re.compile(
    r"travel agen|tour operator|\btoms\b|margin scheme|\batol\b|\babta\b|"
    r"travel trust|trust account|pipeline monies|travel business|travel compan|"
    r"travel industry|travel franchise|homeworking travel|host agency|\bdmc\b|"
    r"tour business|touring|coach operator|travel accounting|travel bookkeep", re.I)

# extra hire-intent markers (accountant/adviser/finance words) for the intent tag
HIRE_RE = re.compile(
    r"accountant|accounting|bookkeep|\bvat\b|\btoms\b|margin scheme|tax\b|payroll|"
    r"atol report|ara\b|renewal|licence|license|bonding|financial criteria|trust account|"
    r"pipeline monies|accounts\b|audit|company formation|limited company|self employed|"
    r"profit|turnover|hmrc", re.I)

# adjacency watch: terms that belong to existing estate sites (ir35/property/etc)
ESTATE_ADJ_RE = re.compile(r"\bir35\b|property|landlord|dentist|solicitor|care home|construction", re.I)


def norm(s: str) -> str:
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    return " ".join(sorted(t for t in s.split() if t not in STOP))


def slug_to_title(url: str) -> str:
    seg = urlparse(url).path.rstrip("/").rsplit("/", 1)[-1]
    return seg.replace("-", " ").replace("_", " ").strip()


def load_estate_titles() -> list[str]:
    titles = []
    est = json.loads((ROOT / "expansion_research" / "own_estate_exclusion.json").read_text(encoding="utf-8"))
    for site in est["sites"].values():
        for u in site.get("urls", []):
            t = slug_to_title(u)
            if t and len(t) > 3:
                titles.append(t)
    bt = json.loads((CARE_RAW / "estate_blog_topics.json").read_text(encoding="utf-8"))
    for row in bt:
        for f in ("topic", "primary_keyword", "slug"):
            v = row.get(f)
            if v:
                titles.append(v.replace("-", " "))
    return titles


def collect_pool() -> tuple[dict[str, dict], dict[str, list[str]]]:
    pool: dict[str, dict] = {}
    rejected: dict[str, list[str]] = {"junk": [], "consumer": [], "out_of_scope": []}

    def add(term: str, src: str) -> None:
        term = re.sub(r"\s+", " ", term.strip().lower())
        if len(term) < 6:
            return
        if JUNK_RE.search(term):
            rejected["junk"].append(term)
            return
        if CONSUMER_RE.search(term):
            rejected["consumer"].append(term)
            return
        if not SCOPE_RE.search(term):
            rejected["out_of_scope"].append(term)
            return
        row = pool.setdefault(term, {"sources": [],
                                     "hire_intent": bool(HIRE_RE.search(term)),
                                     "estate_adjacent": bool(ESTATE_ADJ_RE.search(term))})
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
    for k in rejected:
        rejected[k] = sorted(set(rejected[k]))
    return pool, rejected


def main() -> None:
    pool, rejected = collect_pool()
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

    # greedy cluster into page-level topics; volumes null (no paid data this run)
    clusters, norms = [], []
    for term, meta in sorted(final.items()):
        n = norm(term)
        placed = False
        for i, cn in enumerate(norms):
            if difflib.SequenceMatcher(None, n, cn).ratio() >= 0.85:
                clusters[i]["members"].append(term)
                placed = True
                break
        if not placed:
            clusters.append({"head": term, "volume": None, "kd": None, "cpc": None,
                             "hire_intent": meta["hire_intent"],
                             "sources": sorted(set(meta["sources"])), "members": [term]})
            norms.append(n)

    hire = sum(1 for t, m in final.items() if m["hire_intent"])
    out = {"generated": "2026-07-15",
           "dfs_enriched": False,
           "raw_pool_size": len(pool),
           "rejected_counts": {k: len(v) for k, v in rejected.items()},
           "rejected": rejected,
           "estate_titles_checked": len(estate_titles),
           "kept": final,
           "hire_intent_kept": hire,
           "provider_scope_no_hire_marker": len(final) - hire,
           "dropped_exact": dropped_exact, "dropped_fuzzy": dropped_fuzzy,
           "borderline_for_judgment": borderline,
           "clusters": clusters, "n_clusters": len(clusters)}
    (HERE / "topic_pool.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"raw_in_scope={len(pool)} rejected={ {k: len(v) for k, v in rejected.items()} } "
          f"kept={len(final)} hire={hire} exact={len(dropped_exact)} fuzzy={len(dropped_fuzzy)} "
          f"borderline={len(borderline)} clusters={len(clusters)}")


if __name__ == "__main__":
    main()
