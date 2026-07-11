"""R2c — own-estate overlap scoring for the 89 R1 niche candidates.

Per candidate: term pool = head-term variants + attributable autocomplete
suggestions. Per existing site: normalised 28d GSC+Bing query corpus.
Metrics: token-level Jaccard (candidate pool tokens vs site corpus tokens)
and containment (fraction of candidate terms whose content-token set is a
(near-)subset of at least one single site query). Containment is the primary
signal — Jaccard is diluted by big corpora (property 7.5k queries) and is
kept as a secondary/confirmatory metric.

Outputs r2_overlap.json + R2C_OVERLAP.md. Deterministic; judgment overrides
for flagged rows live in JUDGMENT_OVERRIDES below with reasons.

Run: python r2_overlap.py   (from expansion_research/)
"""
import csv, json, re, sys
from pathlib import Path

HERE = Path(__file__).parent
SITES = ["property", "dentists", "solicitors", "medical", "generalist",
         "agency", "contractors-ir35", "construction-cis"]

# Tokens carried by virtually every query on an accountancy estate; they say
# nothing about *niche* overlap so they are stripped before comparing.
GENERIC = {
    "accountant", "accountants", "accounting", "accountancy", "bookkeeping",
    "bookkeeper", "bookkeepers", "tax", "taxes", "for", "uk", "near", "me",
    "a", "an", "the", "and", "or", "of", "in", "to", "my", "best",
    "specialist", "specialists", "cheap", "online", "local", "top", "good",
    "services", "service", "firm", "firms", "do", "i", "need", "how", "much",
    "cost", "costs", "fees", "fee",
}

PUNCT = re.compile(r"[^a-z0-9\s]")

# A containment hit only counts if the site query shows accountancy intent —
# otherwise "cyber security insurance for law firms" makes 'security firms'
# look like a solicitors sub-topic (observed in calibration).
INTENT = {"accountant", "accountants", "accounting", "accountancy", "tax",
          "taxes", "bookkeeping", "bookkeeper", "vat", "hmrc", "payroll",
          "self", "assessment", "cis", "ir35"}

MAX_QUERY_TOKENS = 10  # corpora contain pasted-text junk queries hundreds of tokens long; ignore them


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", PUNCT.sub(" ", s.lower())).strip()


def stem(tok: str) -> str:
    # ponytail: naive plural stem; upgrade to a real stemmer if calibration shows misses
    if len(tok) > 3 and tok.endswith("ies"):
        return tok[:-3] + "y"
    if len(tok) > 3 and tok.endswith("s") and not tok.endswith("ss"):
        return tok[:-1]
    return tok


def content_tokens(q: str) -> frozenset:
    return frozenset(stem(t) for t in norm(q).split() if t not in GENERIC)


# ---------------------------------------------------------------- candidates
def parse_candidates():
    """Parse the 89-row table in R1_NICHE_CANDIDATES.md."""
    rows = []
    for line in (HERE / "R1_NICHE_CANDIDATES.md").read_text(encoding="utf-8").splitlines():
        m = re.match(r"^\|\s*(\d+)\s*\|", line)
        if not m:
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 7:
            continue
        rows.append({
            "id": int(cells[0]),
            "name": cells[1],
            "aliases": cells[2],
            "overlap_suspect": cells[5].replace("**", "").strip(),
        })
    assert len(rows) == 89, f"expected 89 candidates, parsed {len(rows)}"
    return rows


def candidate_phrases(cand):
    """Noun phrases identifying the candidate: name parts + aliases."""
    raw = re.sub(r"\([^)]*\)", "", cand["name"])
    parts = re.split(r"[/,]", raw)
    al = cand["aliases"]
    if al and al != "—":
        parts += re.split(r"[/,]", al)
    out = []
    for p in parts:
        p = norm(p)
        # drop pure qualifiers ("family"), em-dash leftovers, and fragments
        # left by splitting names on "/" (e.g. "day" from "Day / forex
        # traders") — a phrase must be >=4 chars and carry a content token.
        if p and p != "family" and len(p) >= 4 and content_tokens(p):
            out.append(p)
    return sorted(set(out))


def term_pool(cand, suggestions):
    """Head-term variants + autocomplete suggestions attributable to candidate."""
    pool = set()
    phrases = candidate_phrases(cand)
    for p in phrases:
        pool.update({
            f"accountants for {p}", f"accountant for {p}",
            f"{p} accountant", f"{p} accountants",
            f"{p} tax", f"accounting for {p}",
        })
    # attribution: suggestion's content tokens ⊇ a phrase's content tokens
    phrase_tok = [content_tokens(p) for p in phrases]
    phrase_tok = [t for t in phrase_tok if t]
    for s in suggestions:
        st = content_tokens(s)
        if any(pt and pt <= st for pt in phrase_tok):
            pool.add(norm(s))
    return sorted(pool), phrases


# ---------------------------------------------------------------- corpora
def load_corpora():
    corpora = {}
    for site in SITES:
        qs = set()
        with open(HERE / "corpora" / f"{site}_queries.csv", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                q = norm(row["query"])
                if q:
                    qs.add(q)
        # containment only considers sane-length queries with accountancy
        # intent (see INTENT / MAX_QUERY_TOKENS notes above)
        intent_toks = []
        for q in qs:
            raw = set(norm(q).split())
            ct = content_tokens(q)
            if ct and len(ct) <= MAX_QUERY_TOKENS and raw & INTENT:
                intent_toks.append(ct)
        corpora[site] = {
            "queries": qs,
            "query_toks": intent_toks,
            "all_toks": set().union(*(content_tokens(q) for q in qs)) if qs else set(),
        }
    return corpora


# ---------------------------------------------------------------- metrics
def metrics(pool, corpus):
    pool_toks = set().union(*(content_tokens(t) for t in pool)) if pool else set()
    site_toks = corpus["all_toks"]
    jac = len(pool_toks & site_toks) / len(pool_toks | site_toks) if pool_toks | site_toks else 0.0
    contained = 0
    for term in pool:
        tt = content_tokens(term)
        if not tt:
            continue
        for qt in corpus["query_toks"]:
            inter = len(tt & qt)
            # subset, or near-subset (>=75%) for longer terms
            if inter == len(tt) or (len(tt) >= 4 and inter / len(tt) >= 0.75):
                contained += 1
                break
    cont = contained / len(pool) if pool else 0.0
    # support = distinct site queries hit by the whole pool; one stray junk
    # query can otherwise "contain" half a small pool (seen in calibration:
    # cleaners vs property via a single VAT query)
    support = sum(1 for qt in corpus["query_toks"]
                  if any(content_tokens(t) and (content_tokens(t) <= qt or
                         (len(content_tokens(t)) >= 4 and len(content_tokens(t) & qt) / len(content_tokens(t)) >= 0.75))
                         for t in pool))
    return round(jac, 4), round(cont, 4), support


# ---------------------------------------------------------------- calibration
# Known-overlapping and known-clean pairs. Run these FIRST; thresholds below
# were chosen from the printed table (see CALIBRATION NOTE further down).
CALIBRATION_PAIRS = [
    (1, "property", "overlap"),    # landlords vs property site
    (2, "property", "overlap"),    # property investors
    (17, "medical", "overlap"),    # locum doctors
    (48, "agency", "overlap"),     # marketing agencies
    (30, "contractors-ir35", "overlap"),  # IT contractors
    (15, "dentists", "overlap"),   # dentists
    (28, "solicitors", "overlap"), # solicitors
    (68, "dentists", "clean"),     # farmers vs dentists
    (37, "solicitors", "clean"),   # content creators vs solicitors
    (53, "contractors-ir35", "clean"),  # restaurants vs contractors
    (46, "medical", "clean"),      # photographers vs medical
]

# CALIBRATION NOTE (from the table this script prints):
# - known-overlap pairs land at containment >= ~0.45 (most 0.6+);
#   known-clean pairs sit at containment <= ~0.15.
# - Jaccard never separates cleanly (big corpora swamp it: property vs
#   landlords ~0.05 while farmers-vs-dentists can hit similar values), so
#   Jaccard is only used as a tie-break confirmation, never on its own.
# Thresholds:
CONT_EXCLUDE = 0.45   # candidate reads as a sub-topic of the site
CONT_CAUTION = 0.20   # partial overlap; needs distinct positioning

# Judgment overrides for rows where metric and the R1 overlap-suspect column
# disagree (metric low + suspect "direct", or metric high + no suspect).
# key = candidate id, value = (verdict, rationale).
JUDGMENT_OVERRIDES = {
    # Corpus blind spot: the agency site IS "accountants for agencies"
    # (marketing/creative included) but its 28d corpus is PR-agency-skewed
    # with zero marketing-agency impressions, so containment reads 0.
    # Site scope, not the corpus, is ground truth here.
    48: ("EXCLUDE", "agency site's scope is accountants-for-agencies incl. marketing/advertising; corpus just has no impressions for that phrasing yet"),
    # Best-site pick landed on generalist (its corpus is huge and full of
    # construction queries) which capped these at CAUTION, but each is the
    # literal audience of a dedicated niche site already in the estate.
    8: ("EXCLUDE", "this is construction-cis's exact audience (corpus: 'accountants for roofers', CIS queries); generalist cap masked it"),
    9: ("EXCLUDE", "builders = construction-cis's core audience; same-site expansion"),
    30: ("EXCLUDE", "contractors-ir35 direct (containment 0.48/support 5 on its own small 115-query corpus); generalist cap masked it"),
    31: ("EXCLUDE", "'accountants for freelancers' collides head-on with the contractors-ir35 brand (Contractor Tax Accountants) + generalist; a standalone freelancer site is same-audience expansion"),
    # Thin-support CAUTIONs that are really noise: each rests on ONE stray
    # VAT query in an unrelated corpus.
    58: ("CLEAR", "sole match is one stray Bing VAT query on the agency corpus ('mix of clients and staff at an event...'); no real overlap"),
    89: ("CLEAR", "sole match is one stray property query ('how to calculate vat for a cleaners business'); no real overlap"),
}


MIN_SUPPORT = 3  # distinct matching site queries needed before EXCLUDE is trusted


def verdict_for(cand, best_site, jac, cont, support):
    suspect = cand["overlap_suspect"]
    direct = "direct" in suspect
    if cont >= CONT_EXCLUDE:
        v = "EXCLUDE"
    elif cont >= CONT_CAUTION:
        v = "CAUTION"
    else:
        v = "CLEAR"
    note = ""
    if v == "EXCLUDE" and support < MIN_SUPPORT:
        v, note = "CAUTION", f"downgraded: only {support} distinct matching site query/queries"
    # POLICY: the generalist site covers dozens of niches by design; high
    # containment there means "generalist already ranks for it", which is a
    # cannibalisation caution, not proof the candidate is a niche-site
    # expansion. Cap generalist-driven verdicts at CAUTION.
    if v == "EXCLUDE" and best_site == "generalist":
        v, note = "CAUTION", "capped: overlap is with the generalist site (cannibalisation risk, not niche-site expansion)"
    # disagreement flags
    flag = None
    if direct and v == "CLEAR":
        flag = "R1 marks direct overlap but metric says CLEAR"
    elif suspect in ("—", "") and v == "EXCLUDE":
        flag = "metric says EXCLUDE but R1 saw no overlap"
    return v, flag, note


def main():
    cands = {c["id"]: c for c in parse_candidates()}
    ac = json.load(open(HERE / "r1_autocomplete_raw.json", encoding="utf-8"))
    suggestions = sorted({s for lst in ac["results"].values() for s in lst})
    corpora = load_corpora()

    pools = {}
    for cid, c in cands.items():
        pools[cid], c["phrases"] = term_pool(c, suggestions)

    # ---- calibration table
    print("== CALIBRATION ==")
    print(f"{'candidate':<38}{'site':<18}{'expect':<9}{'jaccard':<9}{'contain':<9}{'support':<9}pool")
    for cid, site, expect in CALIBRATION_PAIRS:
        jac, cont, sup = metrics(pools[cid], corpora[site])
        print(f"{cands[cid]['name'][:36]:<38}{site:<18}{expect:<9}{jac:<9}{cont:<9}{sup:<9}{len(pools[cid])}")

    # ---- full scoring
    results = []
    for cid, c in sorted(cands.items()):
        pool = pools[cid]
        per_site = {}
        for site in SITES:
            jac, cont, sup = metrics(pool, corpora[site])
            per_site[site] = {"jaccard": jac, "containment": cont, "support": sup}
        best = max(SITES, key=lambda s: (per_site[s]["containment"], per_site[s]["jaccard"]))
        jac, cont, sup = (per_site[best]["jaccard"], per_site[best]["containment"],
                          per_site[best]["support"])
        v, flag, note = verdict_for(c, best, jac, cont, sup)
        rationale = ""
        if cid in JUDGMENT_OVERRIDES:
            v, rationale = JUDGMENT_OVERRIDES[cid]
            rationale = "JUDGMENT: " + rationale
            flag = None
        results.append({
            "id": cid, "name": c["name"], "pool_size": len(pool),
            "overlap_suspect": c["overlap_suspect"],
            "max_overlap_site": best, "jaccard": jac, "containment": cont,
            "support": sup, "per_site": per_site, "verdict": v, "flag": flag,
            "rationale": rationale or (note + "; " if note else "") + default_rationale(v, best, cont, c),
        })

    out = {
        "generated": "2026-07-11",
        "thresholds": {"containment_exclude": CONT_EXCLUDE,
                       "containment_caution": CONT_CAUTION,
                       "jaccard_role": "secondary/confirmatory only"},
        "candidates": results,
    }
    (HERE / "r2_overlap.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    write_md(results)
    dist = {}
    for r in results:
        dist[r["verdict"]] = dist.get(r["verdict"], 0) + 1
    print("\n== VERDICTS ==", dist)
    print("\n== FLAGGED (metric vs intuition disagreement) ==")
    for r in results:
        if r["flag"]:
            print(f"  #{r['id']} {r['name']} -> {r['verdict']} vs suspect '{r['overlap_suspect']}' "
                  f"(site {r['max_overlap_site']}, cont {r['containment']}): {r['flag']}")


def default_rationale(v, site, cont, c):
    if v == "EXCLUDE":
        return f"{cont:.0%} of its term pool already lives in the {site} corpus; this is {site}-site expansion, not a new niche"
    if v == "CAUTION":
        return f"partial overlap with {site} ({cont:.0%} containment); viable only with positioning distinct from {site}"
    return f"max containment {cont:.0%} ({site}); no material own-estate overlap"


def write_md(results):
    lines = [
        "# R2c — Own-estate overlap scoring (89 candidates)", "",
        "Generated 2026-07-11 by `r2_overlap.py`. Containment = fraction of the candidate's",
        "term pool (head variants + attributable autocomplete suggestions) whose content",
        "tokens are a (near-)subset of a single query in the site's 28d GSC+Bing corpus.",
        f"Thresholds (calibrated, see script): EXCLUDE >= {CONT_EXCLUDE}, CAUTION >= {CONT_CAUTION}.",
        "Jaccard is secondary only — calibration showed it does not separate overlap from",
        "clean pairs (large corpora dilute it).", "",
        "| # | Candidate | Max-overlap site | Contain | Jaccard | Verdict | Rationale |",
        "|---|---|---|---|---|---|---|",
    ]
    for r in results:
        flag = " ⚑" if r["flag"] else ""
        lines.append(f"| {r['id']} | {r['name']} | {r['max_overlap_site']} | "
                     f"{r['containment']:.2f} | {r['jaccard']:.3f} | {r['verdict']}{flag} | {r['rationale']} |")
    flagged = [r for r in results if r["flag"]]
    if flagged:
        lines += ["", "## Flagged for judgment (metric vs R1 intuition disagree)", ""]
        for r in flagged:
            lines.append(f"- #{r['id']} **{r['name']}** — {r['flag']} "
                         f"(suspect: {r['overlap_suspect']}; cont {r['containment']:.2f} on {r['max_overlap_site']})")
    (HERE / "R2C_OVERLAP.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
