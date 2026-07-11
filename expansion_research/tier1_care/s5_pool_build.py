"""R3 tier1 care — Stage 5: union topic pool + estate dedup gate (HARD).

Adapted from tier1_hospitality/s5_pool_build.py. FREE SOURCES ONLY: autocomplete +
rival sitemaps (no DFS files — TODO-paid-pulls will add them later).
Dedup vs ENTIRE estate. Borderline pairs left for Claude judgment.
Flags medical-adjacency terms (clinician-side) for exclusion review.
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
    r"jobs?\b|salary|salaries|vacanc|career|course|degree|diploma|qualification|"
    r"login|near me|software|quickbooks|\bxero\b|\bsage\b|freshbooks|"
    r"instagram|facebook|tiktok|recruitment agency|"
    # consumer/family-side care intent (not provider-side)
    r"find a care home|best care homes?|care home reviews?|visiting|"
    r"gifts? for|activities for|moving (?:mum|dad|mother|father|a parent)|"
    r"power of attorney|attendance allowance|carers? allowance", re.I)

# care-provider-scope relevance gate
SCOPE_RE = re.compile(
    r"care home|domiciliary|home care|nursing home|residential care|care agenc|"
    r"care provider|care sector|care business|supported living|children'?s home|"
    r"\bcqc\b|sleep.?in|live.?in care|social care|care worker|carers?\b|"
    r"funded nursing|\bfnc\b|continuing healthcare|\bchc\b|local authority|"
    r"care fees?|care franchise|elderly care|adult care|care staff|agency staff|"
    r"care operator|respite|dementia care", re.I)

# medical-adjacency watch: clinician-facing terms that would erode the medical site's wall
MEDICAL_ADJ_RE = re.compile(
    r"\bgp\b|doctor|locum|nhs pension|consultant|dentist|nurse tax|nurses? tax|"
    r"clinician|practice manager|salaried gp|surgery\b", re.I)


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
        row = pool.setdefault(term, {"sources": [], "medical_adjacent": bool(MEDICAL_ADJ_RE.search(term))})
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

    med_adj = [t for t, m in final.items() if m.get("medical_adjacent")]
    out = {"raw_pool_size": len(pool), "estate_titles_checked": len(estate_titles),
           "kept": final, "dropped_exact": dropped_exact,
           "dropped_fuzzy": dropped_fuzzy, "borderline_for_judgment": borderline,
           "medical_adjacent_flagged": med_adj}
    (HERE / "topic_pool.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"raw={len(pool)} kept={len(final)} exact_dropped={len(dropped_exact)} "
          f"fuzzy_dropped={len(dropped_fuzzy)} borderline={len(borderline)} med_adj={len(med_adj)}")


if __name__ == "__main__":
    main()
