"""R3 tier1 ecommerce — Stage 5b: judged final pool.

Applies Claude's judgment to s5_pool_build.py output (2026-07-12):
 - Estate dedup was NOT clean this time (unlike care): 1 exact + 11 fuzzy drops, all
   against the generalist site's six live "Accountant For [ecommerce segment]" blog pages
   (hollowaydavies.co.uk). 139 borderline pairs reviewed: most are the usual sorted-token
   difflib false positives (IOSS vs CIS; "ecommerce accountants london" vs "contractor
   accountants london"), BUT the pairs matching the generalist ecommerce titles are REAL
   adjacency collisions. Those terms are kept in the pool (the new site is their natural
   owner) and flagged `estate_conflict` — resolving ownership (migrate/redirect the 6
   generalist pages, or fence them) is an explicit owner-gate question in DOSSIER.md.
 - Junk sweep (measured, see junk_terms): non-UK geo + non-English strings (Polish OSS
   terms, IT/NL/DE strays), US sales-tax/LLC/IRS layer, seller-ops and marketing noise
   (Black Friday, AOV, listing/account admin), DIY-software listicle intent
   (best-software/alternatives/QuickBooks-how-tos), programmatic numbered-slug and
   hash-slug artefacts from rival sitemaps.
Then greedy-cluster into page-level topics (difflib >=0.85 on sorted-token norm).

Paid pulls landed 2026-07-12 (manager-direct): raw/dfs_keyword_suggestions.json (9 seeds)
+ raw/dfs_ranked_keywords.json (4 rival domains) joined here on exact lowercase keyword
(ponytail: exact-match join, s5 re-run avoided — its difflib pass takes ~40 min);
clusters now seeded volume-desc like the crypto/care s5b.
"""
from __future__ import annotations

import difflib
import json
import re
from pathlib import Path

HERE = Path(__file__).parent

JUNK_RE = re.compile(
    # non-UK geo + US tax layer
    r"germany|france\b|poland|luxembourg|romania|kenya|\buae\b|dubai|scotland free zone|"
    r"\bgst\b|sales tax|nexus|1099|\birs\b|s.?corp\b|\bllc\b|venmo|oregon|texas|california|"
    r"brisbane|melbourne|toronto|\bksa\b|ontario|"
    # non-English strings (Polish/It/NL/DE strays from EU-facing rival sitemaps)
    r"wyrejestrowanie|stawki|limity|kurs z jakiego|partita iva|obbligatoria|wat zijn|"
    r"aangifte|umsatzsteuer|"
    # seller-ops / marketing / platform-admin noise (not finance)
    r"black friday|cyber monday|marketing|\baov\b|demographic|trend|growth strategy|"
    r"chatgpt|\bads\b|\bseo\b|return rate|fulfillment|when to switch|worth it|"
    r"matcha|home improvement|handmade\b|new frontier|\bpii\b|1p vs 3p|invite accountant|"
    r"bid on ebay|suspended|deactivat|sign ?in|sign ?up|log ?in|create|webhook|\bapi\b|"
    r"open banking|psd2|selling guide|how to sell on|seller central sales|scheduled means|"
    r"not showing|receipt\b|yearly payment|payments rates|change vat number|"
    r"show vat on product|selling limit|capacity limits|storage fee|referral fee|"
    r"pay fees|affiliate|made easier|ecommerce specialist local|"
    # DIY-software / listicle / tool-comparison intent (SaaS-owned SERPs, we don't contest)
    r"software|alternativ|taxomate|integration|quickbooks|\bzoho\b|acuity|netsuite|odoo|"
    r"\berp\b|youtube|reddit|spreadsheet|ebook|\.pdf|free download|"
    # programmatic sitemap artefacts
    r"\s\d{1,2}$|[0-9a-f]{10,}", re.I)

STOP = {"the", "a", "an", "for", "of", "to", "in", "on", "and", "or", "is", "are",
        "can", "do", "does", "how", "what", "when", "uk", "your", "you", "my", "we"}

# the six live generalist (hollowaydavies.co.uk) ecommerce titles — real adjacency wall
GENERALIST_TITLES = [
    "accountant for ecommerce business", "accountant for amazon fba sellers uk",
    "accountant for ecommerce sellers", "accountant for dropshippers uk",
    "accountant for shopify stores", "accountant for etsy sellers uk",
]


def norm(s: str) -> str:
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    return " ".join(sorted(t for t in s.split() if t not in STOP))


def main() -> None:
    d = json.loads((HERE / "topic_pool.json").read_text(encoding="utf-8"))
    pool = dict(d["kept"])

    junk = [t for t in pool if JUNK_RE.search(t)]
    for t in junk:
        pool.pop(t)

    # join DFS volumes/KD/CPC (exact lowercase keyword match across both flat files)
    dfs: dict[str, dict] = {}
    for fn in ("dfs_keyword_suggestions.json", "dfs_ranked_keywords.json"):
        for row in json.loads((HERE / "raw" / fn).read_text(encoding="utf-8")):
            k = row["keyword"].strip().lower()
            if k not in dfs or (row.get("volume") or 0) > (dfs[k].get("volume") or 0):
                dfs[k] = row
    matched = 0
    for term, meta in pool.items():
        row = dfs.get(term.strip().lower())
        if row:
            meta["volume"], meta["kd"], meta["cpc"] = row.get("volume"), row.get("kd"), row.get("cpc")
            matched += 1

    # flag (keep) terms colliding with the generalist ecommerce pages
    gnorms = [norm(g) for g in GENERALIST_TITLES]
    conflicts = []
    for term in pool:
        n = norm(term)
        for g, gn in zip(GENERALIST_TITLES, gnorms):
            if difflib.SequenceMatcher(None, n, gn).ratio() >= 0.78:
                conflicts.append({"term": term, "generalist_page": g})
                pool[term]["estate_conflict"] = g
                break

    # greedy clustering into page-level topics, seeded volume-desc (crypto/care pattern)
    clusters: list[dict] = []
    norms: list[str] = []
    for term, meta in sorted(pool.items(), key=lambda kv: (-(kv[1].get("volume") or 0), kv[0])):
        n = norm(term)
        placed = False
        for i, cn in enumerate(norms):
            if difflib.SequenceMatcher(None, n, cn).ratio() >= 0.85:
                clusters[i]["members"].append(term)
                clusters[i]["volume"] = max(clusters[i]["volume"] or 0, meta.get("volume") or 0) or None
                placed = True
                break
        if not placed:
            clusters.append({"head": term, "volume": meta.get("volume"),
                             "kd": meta.get("kd"), "cpc": meta.get("cpc"),
                             "sources": meta["sources"], "members": [term],
                             "estate_conflict": meta.get("estate_conflict")})
            norms.append(n)

    vol = [c for c in clusters if c["volume"]]
    out = {"generated": "2026-07-12",
           "keyword_pool_final": len(pool),
           "junk_removed": len(junk), "junk_terms": sorted(junk),
           "estate_conflict_flagged": conflicts,
           "restored": [], "confirmed_estate_dupes":
               d["dropped_exact"] + [x["term"] for x in d["dropped_fuzzy"]],
           "dfs_keywords_matched": matched,
           "topic_cluster_count": len(clusters),
           "clusters_with_volume": len(vol),
           "note": "DFS volumes/KD/CPC joined 2026-07-12 (paid pulls: suggestions x9 seeds, ranked x4 rivals); volume-desc cluster seeding",
           "clusters": clusters}
    (HERE / "topic_pool_final.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"keywords={len(pool)} junk_removed={len(junk)} dfs_matched={matched} "
          f"estate_conflicts={len(conflicts)} topics={len(clusters)} with_volume={len(vol)}")
    assert len(pool) + len(junk) == len(d["kept"])  # ponytail: self-check


if __name__ == "__main__":
    main()
