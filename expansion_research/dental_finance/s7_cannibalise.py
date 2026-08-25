"""Stage 7: cross-map discovered competitor keywords against OUR existing corpus.

Classifies each relevant competitor keyword as:
  COVERED   - we already rank for it (GSC) or have a matching page  -> cannibalisation risk, DON'T build new
  NEW       - competitor ranks, we don't                            -> genuine opportunity

Dental discovery -> checked vs DENTISTS corpus.  BTL discovery -> checked vs PROPERTY corpus.
Writes NEW_OPPORTUNITIES.md + cannibalisation.md.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

HERE = Path(__file__).parent
STOP = {"for", "a", "the", "to", "in", "of", "uk", "my", "your", "how", "what",
        "is", "are", "do", "i", "and", "or", "on", "with", "can", "you", "much",
        "cost", "vs", "near", "me", "best", "s", "an"}

# Relevance: DENTAL build-now finance cluster (+ protection, flagged separately).
# Word-boundary tokens so "student" does NOT match "dent".
DENT_TOK = re.compile(r"\b(dental|dentist|dentists|dentistry|orthodontic\w*|"
                      r"practice|practices|surgery|surgeries|goodwill|squat|associate)\b", re.I)
DENT_NEG = re.compile(r"\b(student|students|tuition|university|college|bursary|apprentice\w*|"
                      r"implant\w*|insurance|veneer\w*|whitening|bonding|filling\w*|crown\w*|"
                      r"braces|invisalign|hygienist|check ?up|treatment|toothache|denture\w*|"
                      r"near me|nhs dental|dental plan|extraction|root canal|cost uk|cost england)\b", re.I)
DENT_MONEY = re.compile(r"financ|loan|mortgage|lease|leasing|fund|asset|equipment|"
                        r"valuation|acquisition|refinanc|buy|sell|purchase|"
                        r"protection|locum|income|insurance|borrow|lend|capital|worth|cost", re.I)
# Relevance: BTL / ltd-co / SPV mortgage cluster. Word-boundary so "debtline" != btl.
BTL_TOK = re.compile(r"\b(buy to let|buy-to-let|btl|landlord|landlords|spv|"
                     r"limited company|ltd company|portfolio landlord|hmo|holiday let|let to buy)\b", re.I)
# Require mortgage/lending intent — separates the NEW mortgage cluster from property's existing tax turf.
BTL_MONEY = re.compile(r"mortgage|remortgage|lender|lending|\bltv\b|deposit|proc fee|"
                       r"financ|\blend\b|interest rate|fixed rate|mortgage rate", re.I)
# BTL tax/structuring = PROPERTY's existing turf (cannibalisation zone even if not yet ranked).
BTL_TAX = re.compile(r"section 24|incorporation|capital gains|cgt|stamp duty|sdlt|tax|"
                     r"accountant|allowance|relief|self assessment", re.I)


def toks(s: str) -> set[str]:
    return {w for w in re.sub(r"[^a-z0-9 ]", " ", s.lower()).split() if w not in STOP and len(w) > 1}


def jaccard(a: set, b: set) -> float:
    return len(a & b) / len(a | b) if (a or b) else 0.0


def build_index(queries: list[dict], slugs: list[str]):
    exact = {q["query"] for q in queries}
    toklist = [(q["query"], toks(q["query"]), q) for q in queries]
    slug_text = " ".join(slugs).lower()
    return exact, toklist, slug_text


COVER_IMPR = 15  # partial match only counts as coverage if the existing query really gets traffic


def coverage(cand: str, exact, toklist, slug_text):
    """Return (status, evidence). status in exact/partial/slug/None."""
    if cand in exact:
        row = next(q for qq, _, q in toklist if qq == cand)
        return "exact", f"GSC '{cand}' ({row['impressions']} impr, pos {row['position']})"
    ct = toks(cand)
    best, bestq, bestrow = 0.0, None, None
    for qq, qt, row in toklist:
        j = jaccard(ct, qt)
        if j > best:
            best, bestq, bestrow = j, qq, row
    if best >= 0.6 and bestrow and bestrow["impressions"] >= COVER_IMPR:
        return "partial", f"~'{bestq}' (J={best:.2f}, {bestrow['impressions']} impr)"
    # slug substring (page exists even if no impressions yet)
    key = "-".join(sorted(ct))[:0]  # noop; use phrase slug
    phrase_slug = cand.replace(" ", "-")
    if phrase_slug and phrase_slug in slug_text:
        return "slug", f"page slug contains '{phrase_slug}'"
    return None, None


def dedupe(cands: list[dict]) -> list[dict]:
    """Drop near-identical keywords (same token set), keep highest volume."""
    seen: dict[frozenset, dict] = {}
    for c in sorted(cands, key=lambda x: -(x["search_volume"] or 0)):
        key = frozenset(toks(c["keyword"]))
        if not key:
            continue
        if key not in seen:
            seen[key] = c
    return sorted(seen.values(), key=lambda x: -(x["search_volume"] or 0))


def run_cluster(name, disc_domains, tok_re, money_re, corpus, min_vol=10, neg_re=None):
    exact, toklist, slug_text = build_index(corpus["queries"], corpus["sitemap_urls"])
    # gather + relevance filter + dedupe
    pool = []
    for kws in disc_domains.values():
        for k in kws:
            kw = k["keyword"]
            if not kw or (k["search_volume"] or 0) < min_vol:
                continue
            if neg_re and neg_re.search(kw):
                continue
            if tok_re.search(kw) and money_re.search(kw):
                pool.append(k)
    pool = dedupe(pool)
    new, cannibal = [], []
    for c in pool:
        status, ev = coverage(c["keyword"], exact, toklist, slug_text)
        if status:
            cannibal.append({**c, "status": status, "evidence": ev})
        else:
            new.append(c)
    return new, cannibal, len(pool)


def md_table(rows, extra=None):
    out = ["| vol/mo | keyword |" + (" evidence |" if extra else ""),
           "|---|---|" + ("---|" if extra else "")]
    for r in rows:
        line = f"| {r['search_volume'] or 0} | {r['keyword']} |"
        if extra:
            line += f" {r.get('evidence','')} |"
        out.append(line)
    return "\n".join(out)


def main():
    disc = json.loads((HERE / "discovered.json").read_text(encoding="utf-8"))
    corpus = json.loads((HERE / "our_corpus.json").read_text(encoding="utf-8"))

    d_new, d_can, d_pool = run_cluster("dental", disc["dental"], DENT_TOK, DENT_MONEY,
                                       corpus["dentists"], neg_re=DENT_NEG)
    b_new, b_can, b_pool = run_cluster("btl", disc["btl"], BTL_TOK, BTL_MONEY, corpus["property"])

    # BTL tax-overlap: BTL candidates whose intent is tax/structuring (property's turf)
    btl_tax = dedupe([k for kws in disc["btl"].values() for k in kws
                      if (k["search_volume"] or 0) >= 10 and BTL_TOK.search(k["keyword"])
                      and BTL_TAX.search(k["keyword"])])

    print(f"DENTAL: pool {d_pool} relevant -> {len(d_new)} NEW, {len(d_can)} covered")
    print(f"BTL:    pool {b_pool} relevant -> {len(b_new)} NEW, {len(b_can)} covered")
    print(f"BTL tax-intent (property turf): {len(btl_tax)}")

    doc = ["# NET-NEW opportunities (deduped, relevant, not in our corpus)",
           f"\n_Discovery: competitor keywords_for_site. Baseline: our GSC queries + sitemaps. Vol = DataForSEO UK Google Ads._",
           "\n## Dental practice-finance (build-now, unregulated) — NEW vs dentist corpus",
           f"_{len(d_new)} net-new keywords_\n",
           md_table(d_new[:60]),
           "\n## SPV / BTL mortgage — NEW vs property corpus",
           f"_{len(b_new)} net-new keywords_\n",
           md_table(b_new[:70])]
    (HERE / "NEW_OPPORTUNITIES.md").write_text("\n".join(doc), encoding="utf-8")

    can = ["# CANNIBALISATION flags — competitor terms we ALREADY rank for",
           "_Don't build a new page for these; the existing property/dentist page already ranks. Optimise it instead._",
           "\n## Dental — already covered by dentist corpus\n",
           md_table(d_can[:40], extra=True),
           "\n## BTL mortgage — already covered by property corpus\n",
           md_table(b_can[:40], extra=True),
           "\n## BTL tax/structuring intent — PROPERTY's core turf (build on property, not a mortgage page)\n",
           md_table(btl_tax[:40])]
    (HERE / "cannibalisation.md").write_text("\n".join(can), encoding="utf-8")
    print("-> NEW_OPPORTUNITIES.md, cannibalisation.md")

    # console preview
    print("\nTOP 15 NEW DENTAL:")
    for r in d_new[:15]:
        print(f"  {r['search_volume'] or 0:>5}  {r['keyword']}")
    print("\nTOP 20 NEW BTL:")
    for r in b_new[:20]:
        print(f"  {r['search_volume'] or 0:>5}  {r['keyword']}")
    print("\nTOP 10 BTL CANNIBAL (property already ranks):")
    for r in b_can[:10]:
        print(f"  {r['search_volume'] or 0:>5}  {r['keyword']}  <- {r['evidence']}")


if __name__ == "__main__":
    main()
