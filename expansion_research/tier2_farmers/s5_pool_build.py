"""R3 tier2 farmers — Stage 5: build + cluster the raw topic pool (no paid enrichment).

Sources: autocomplete suggestions + verified-rival sitemap slugs (farm-relevant only).
Dedupe vs estate corpora query CSVs (exact norm match). Greedy-cluster (difflib >=0.85
on sorted-token norm), volumes/KD left null — paid enrichment is a manager-run TODO.
"""
from __future__ import annotations

import csv
import difflib
import json
import re
from pathlib import Path
from urllib.parse import urlparse

HERE = Path(__file__).parent
CORPORA = HERE.parent / "corpora"

RELEVANT_RE = re.compile(
    r"farm|agricultur|rural|herd basis|averaging|smallholding|apr\b|"
    r"agricultural property relief|landed estate|tenant|tenanc|diversif|"
    r"arable|dairy|livestock|equine|crofting|woodland|vineyard|landowner", re.I)
JUNK_RE = re.compile(
    # non-UK geo + non-UK schemes
    r"ohio|texas|california|florida|iowa|kansas|usda|401k|\birs\b|india|kerala|pakistan|"
    r"australia|nz\b|new zealand|canada|ontario|ireland only|\bacres act\b|"
    # consumer/leisure noise, not provider finance
    r"near me|for sale|jobs|salary|vacanc|simulator|minecraft|stardew|clash|game|"
    r"rightmove|zoopla|instagram|tiktok|youtube|"
    # farm shop consumer / visiting
    r"farm shop opening|petting|cafe menu|wedding venue prices|"
    # software brand nav noise
    r"farmplan login|xero login|quickbooks login|sage login|"
    # dictionary / history / edu / pop-culture noise
    r"meaning in|meaning$|synonym|\bwiki\b|definition|picture|photo|clipart|"
    r"victoria 3|victoria ii|ck3|\bserf\b|sharecrop|reconstruction|1800s|19th century|"
    r"medieval|feudal|haryana|bengali|tamil|hindi|urdu|punjabi|apush|quizlet|"
    r"wyeth|painting|poem|lyrics|song|movie|film|book pdf|\bpdf\b|"
    r"life on the farm (autumn|spring|winter|summer)|"
    r"non ?farm payroll|warframe|fortnite|roblox|folk alliance|jamies farm", re.I)
STOP = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "is", "are",
        "can", "do", "does", "how", "what", "when", "uk", "your", "you", "my", "we"}


def norm(s: str) -> str:
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    return " ".join(sorted(t for t in s.split() if t not in STOP))


def slug_to_phrase(url: str) -> str:
    path = urlparse(url).path.strip("/")
    if not path:
        return ""
    last = path.split("/")[-1]
    last = re.sub(r"\.(html?|php|aspx?)$", "", last)
    return re.sub(r"[-_]+", " ", last).strip()


def main() -> None:
    terms: dict[str, dict] = {}

    def add(term: str, src: str) -> None:
        t = re.sub(r"\s+", " ", term).strip().lower()
        if not (6 <= len(t) <= 90):
            return
        if not RELEVANT_RE.search(t) or JUNK_RE.search(t):
            return
        n = norm(t)
        if not n or n in terms:
            return
        terms[n] = {"term": t, "src": src}

    ac = json.loads((HERE / "raw" / "autocomplete_raw.json").read_text(encoding="utf-8"))
    sugg = ac.get("suggestions") or ac
    if isinstance(sugg, dict):
        for q, lst in sugg.items():
            if isinstance(lst, list):
                for s in lst:
                    add(s, "autocomplete")
    else:
        for s in sugg:
            add(s, "autocomplete")

    sm = json.loads((HERE / "raw" / "rival_sitemaps.json").read_text(encoding="utf-8"))
    for dom, rec in sm.items():
        for u in rec.get("urls", []):
            p = slug_to_phrase(u)
            if p:
                add(p, f"sitemap:{dom}")

    serp = json.loads((HERE / "raw" / "serp_raw.json").read_text(encoding="utf-8"))
    for q, results in serp["ddg"].items():
        for r in results:
            t = re.split(r" [|·] | - ", r.get("title") or "")[0]
            add(t, "serp_title")

    # estate dedupe: exact norm match against all corpora query CSVs
    estate_norms: set[str] = set()
    if CORPORA.exists():
        for f in CORPORA.glob("*_queries.csv"):
            with open(f, encoding="utf-8", errors="replace") as fh:
                for row in csv.DictReader(fh):
                    estate_norms.add(norm(row.get("query", "")))
        dupes = [v["term"] for n, v in terms.items() if n in estate_norms]
        for n in [n for n in terms if n in estate_norms]:
            del terms[n]
        corpora_note = f"deduped vs {len(estate_norms)} estate query norms; {len(dupes)} exact dupes removed"
    else:
        dupes, corpora_note = [], "corpora dir missing; estate dedupe SKIPPED"

    # greedy cluster
    items = sorted(terms.values(), key=lambda v: v["term"])
    clusters: list[dict] = []
    for it in items:
        n = norm(it["term"])
        placed = False
        for c in clusters:
            if difflib.SequenceMatcher(None, n, c["_n"]).ratio() >= 0.85:
                c["members"].append(it["term"])
                placed = True
                break
        if not placed:
            clusters.append({"head": it["term"], "_n": n, "members": [it["term"]],
                             "volume": None, "kd": None, "src": it["src"]})
    for c in clusters:
        del c["_n"]
    clusters.sort(key=lambda c: (-len(c["members"]), c["head"]))

    out = {"generated": "2026-07-15", "raw_terms": len(items),
           "estate_dedupe": corpora_note, "estate_dupes_removed": dupes,
           "topic_cluster_count": len(clusters),
           "note": "volume/kd null by design: zero paid calls this run; see DOSSIER TODO",
           "clusters": clusters}
    (HERE / "topic_pool.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"raw_terms={len(items)} clusters={len(clusters)} estate_dupes={len(dupes)}")


if __name__ == "__main__":
    main()
