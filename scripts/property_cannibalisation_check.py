"""Cannibalisation check: for each proposed gap topic (post-reclassification),
compare against all 285 existing Property pages and annotate with one of:
  ✅ Net-new — no existing page substantially covers this topic
  ⚠️ Partial overlap with X — we touch the topic but a dedicated page may
     still be warranted (the existing one is broader or narrower)
  ❌ Already covered by X — existing page squarely owns this topic; skip

Similarity scoring: tokenised slug + title + h1 + metaTitle, weighted overlap.
"""
from __future__ import annotations

import json
import re
from collections import defaultdict
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent

STOP = {
    "the", "a", "an", "guide", "uk", "complete", "tax", "to", "and",
    "for", "of", "what", "how", "your", "you", "in", "is", "are",
    "step", "by", "2026", "2025", "2024", "2027", "with", "on", "from",
    "do", "does", "as", "be", "or", "if", "at", "this", "that", "it",
    "into", "out", "can", "i", "my", "we", "our", "us", "all", "any",
    "explained", "rules", "vs", "vs.", "complete-guide", "ultimate",
    "comprehensive", "best", "free", "online", "near", "me", "uk-",
}


def tokenise(s: str) -> set[str]:
    s = re.sub(r"[^a-z0-9]+", " ", s.lower())
    tokens = [t for t in s.split() if t and t not in STOP and len(t) >= 2]
    return set(tokens)


def load_our_pages() -> list[dict]:
    out: list[dict] = []
    for md in sorted((ROOT / "Property/web/content/blog").glob("*.md")):
        text = md.read_text(encoding="utf-8")
        if not text.startswith("---"):
            continue
        end = text.find("---", 3)
        if end == -1:
            continue
        try:
            fm = yaml.safe_load(text[3:end]) or {}
        except yaml.YAMLError:
            fm = {}
        slug = md.stem
        tokens = tokenise(slug + " " + str(fm.get("title", "")) + " "
                          + str(fm.get("metaTitle", "")) + " "
                          + str(fm.get("h1", "")))
        out.append({
            "slug": slug,
            "title": fm.get("title", ""),
            "h1": fm.get("h1", ""),
            "tokens": tokens,
        })
    return out


def jaccard(a: set, b: set) -> float:
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def best_match(gap_tokens: set, our_pages: list[dict], top_n: int = 3) -> list[tuple[float, dict]]:
    scored = [(jaccard(gap_tokens, p["tokens"]), p) for p in our_pages]
    scored.sort(key=lambda x: -x[0])
    return scored[:top_n]


def classify_overlap(top_score: float) -> str:
    if top_score >= 0.55:
        return "❌ already covered"
    if top_score >= 0.30:
        return "⚠️ partial overlap"
    return "✅ net-new"


def main() -> int:
    our = load_our_pages()
    print(f"Our property pages: {len(our)}")

    # Load the full filtered gap set + the reclassified Other
    gap_buckets: dict[str, list[dict]] = defaultdict(list)

    # 1. Re-derive the original (non-Other) buckets via the same filter as
    #    property_topic_gap_filter.py — but here we just consume the resolved JSON
    #    AND the original raw scrape filtered to non-Other.
    other_resolved = json.loads((ROOT / "briefs/property/_other_resolved.json").read_text(encoding="utf-8"))
    for bucket, items in other_resolved["classified"].items():
        for it in items:
            gap_buckets[bucket].append({"slug": it["slug"], "url": it["url"], "domain": it.get("domain", "")})

    # 2. Also pull the original gap doc's non-Other buckets directly from the raw scrape
    #    so we have ONE consolidated input. Reuse the original filter logic.
    raw = json.loads((ROOT / "briefs/property/_competitor_urls.json").read_text(encoding="utf-8"))
    URL_EXCL = [re.compile(p, re.I) for p in [
        r"/our-people/", r"/our-team/", r"/team/", r"/staff-profile",
        r"/author/", r"/category/", r"/tag/", r"/services/", r"/sectors/",
        r"/contact", r"/about", r"/cookie", r"/privacy", r"/terms",
        r"/thank-you", r"/login", r"/signup", r"/feed", r"/sitemap",
        r"/page/\d+", r"/our-firm", r"/case-studies?$",
        r"/international/tax-havens/",
    ]]
    NEWS = [re.compile(p, re.I) for p in [
        r"^\d+(-|$)", r"\d+(-|$)(million|billion|bn|m|k)\b",
        r"^(spring|autumn|winter|summer)-(budget|statement)",
        r"\b(budget|statement|spending-review)\b", r"\b20\d{2}\b",
        r"\b(rises?|reveals?|warns?|launches?|announces?|criticis|defends?)\b",
        r"\b(latest|news|update[ds]?|breaking)\b", r"\bset-to-\b",
        r"\bcould-\b|\bwould-\b|\bshould-\b|\bwill-\b",
        r"\bblack-hole\b", r"\bcrack-?down\b|\bscandal\b|\bdebate\b|\bslip-?up\b",
        r"\bfile[ds]?-(self-assessment|tax-return|before|by)\b",
        r"\b(case|study)-share-for-share\b", r"vs-hmrc",
        r"\b(rachel-reeves|angela-rayner|jeremy-hunt|hmrc)\b",
        r"\b(forecast|predict|trend|hottest|priced-out|affordable|towns?)\b",
        r"\b(unclaimed|black-hole|debt-forces|penalties-for-a-missed)\b",
        r"\bbritains?\b|\bbrits-\b",
        r"^(my-experience|why-i-)", r"-deadline$|-deadline-\b",
        r"\b(opinions?|opinion-piece|comment|editorial)\b",
        r"\b(podcast|webinar|video)\b", r"^press-release",
        r"-explained$", r"^how-can-i-",
        r"^who-(is|wants|will|gets|owns|owes)",
    ]]
    EVERGREEN = [re.compile(p, re.I) for p in [
        r"^(complete|comprehensive|ultimate|step-by-step)-guide",
        r"^a-complete-guide-(on|to)-", r"^a-guide-to-",
        r"-(complete-guide|step-by-step|explained|guide-uk|relief|allowance|exemption|deduction|election|threshold|rate[s]?)$",
        r"\b(sdlt|cgt|mtd|ated|cil|hmo|btl|fhl|llp|spv|fic|iht|cgt|sa-?\d+)\b",
        r"\b(incorporation|partnership|trust|disposal|deemed|election|relief|allowance|surcharge|threshold)\b",
        r"\b(rules|legislation|finance-act|tcga|ittoia|fa-?20\d\d)\b",
    ]]
    TOPIC_BUCKETS = [
        ("CGT — disposal & specific scenarios", ["cgt", "capital-gains", "ppr", "private-residence", "letting-relief", "rollover", "holdover", "rebasing"]),
        ("CGT — incorporation & corporate", ["s162", "section-162", "incorporation-relief"]),
        ("SDLT — surcharges and reliefs", ["sdlt", "stamp-duty", "surcharge", "additional-dwelling", "first-time-buyer", "mdr", "multiple-dwellings"]),
        ("SDLT — refund and reclaim", ["sdlt-refund", "stamp-duty-refund", "reclaim"]),
        ("SDLT — Scottish / Welsh equivalents", ["lbtt", "ads", "ltt"]),
        ("ATED (Annual Tax on Enveloped Dwellings)", ["ated", "enveloped", "envelopment"]),
        ("CIL & Section 106 (planning levies)", ["cil", "community-infrastructure-levy", "section-106", "s106"]),
        ("IHT and estate planning", ["iht", "inheritance-tax", "agricultural-relief", "business-relief", "br-", "nrb", "rnrb"]),
        ("Family Investment Companies & FICs", ["family-investment-company", "fic", "fics"]),
        ("Trusts and beneficial ownership", ["trust", "discretionary", "beneficial-owner", "settlor", "trustees"]),
        ("Section 24 / mortgage interest restriction", ["section-24", "s24", "mortgage-interest", "finance-cost"]),
        ("MTD for ITSA", ["mtd", "making-tax-digital", "quarterly", "itsa"]),
        ("Incorporation mechanics", ["incorporate", "incorporation", "incorporated", "transfer-to-company"]),
        ("Limited company / BTL company operation", ["limited-company", "btl-ltd", "ltd-co", "spv", "corporation-tax-property", "director-loan"]),
        ("HMOs (multi-occupancy, licensing)", ["hmo", "multi-occup", "licensing"]),
        ("FHL — abolition and transitional rules", ["fhl", "furnished-holiday", "holiday-let"]),
        ("Non-resident landlords / NRL", ["nrl", "non-resident-landlord", "non-residents", "expat"]),
        ("VAT for landlords", ["vat-", "vat-registration", "option-to-tax", "toms"]),
        ("Capital allowances on commercial / FHL / HMO", ["capital-allowance", "annual-investment-allowance", "aia", "writing-down"]),
        ("Rent-a-Room scheme", ["rent-a-room", "rent-room"]),
        ("Property development tax (trading vs investment)", ["development", "developer", "transactions-in-uk-land", "transaction-in-land", "trading-vs-investment"]),
        ("Service charges and ground rent", ["service-charge", "ground-rent", "leasehold-reform", "leasehold"]),
        ("Property finance — refinance, BLs, LIBOR/SONIA", ["refinanc", "bridge", "bridging", "let-to-buy", "remortgag"]),
        ("Lease extensions and statutory tenancy", ["lease-extension", "section-42", "statutory-tenancy"]),
        ("Tenancies and Renters' Rights Act", ["tenancy", "renters-rights", "rrb", "shorthold", "ast", "periodic"]),
        ("Property accountant for cities / regions", ["accountant-", "-property-accountant", "-landlord"]),
        ("Wear-and-tear, replacement of domestic items", ["wear-and-tear", "replacement-domestic", "rdir"]),
        ("Self-assessment mechanics", ["self-assessment", "sa-100", "sa-105", "sa-108"]),
        ("Renters' Rights Act 2026 / tenant rights", ["renters-rights", "tenant-rights"]),
        ("CIS / construction industry scheme", ["cis-", "construction-industry-scheme"]),
        ("Payroll for property companies", ["payroll", "paye-property"]),
        ("Property partnership / LLP", ["partnership", "llp", "limited-liability-partnership"]),
        ("Overseas / international property", ["overseas", "foreign", "abroad", "international"]),
        ("Inheritance — GROB, reservation of benefit", ["grob", "reservation-of-benefit", "gift-with-reservation"]),
        ("ESC D / private letting / former main residence", ["esc-d", "former-main-residence", "former-home"]),
        ("Penalties & enquiries", ["penalt", "hmrc-enquiry", "discovery-assessment", "ddc"]),
        ("Bookkeeping & accounting practices", ["bookkeeping", "record-keeping", "accounting-software"]),
        ("Property valuation / RICS / chargeable consideration", ["valuation", "rics", "chargeable-consideration", "market-value"]),
        ("Property data / forecast / market reports", ["forecast", "market", "data-", "report-"]),
        ("HR/employment for property businesses", ["payroll", "employment-", "auto-enrolment", "workplace-pension"]),
        ("Anti-avoidance and case law", ["anti-avoidance", "ramsay", "garnham", "case-law", "tribunal", "ftt-"]),
    ]

    def url_excl(u):
        return any(p.search(u) for p in URL_EXCL)

    def news_like(s):
        return any(p.search(s) for p in NEWS)

    def evergreen(s):
        if any(p.search(s) for p in EVERGREEN):
            return True
        t = s.split("-")
        return 2 <= len(t) <= 8 and not any(x.isdigit() for x in t)

    def bucket_of(s):
        s = s.lower()
        for n, mks in TOPIC_BUCKETS:
            for m in mks:
                if m in s:
                    return n
        return None  # would be Other — skip here (handled via _other_resolved.json)

    # Loose-cover check against ours (so we don't re-include things already
    # covered by our existing pages at the first-cut stage)
    our_norm = {re.sub(r"[^a-z0-9]+", " ", p["slug"].lower()).strip() for p in our}

    def loose_covered(slug):
        n = re.sub(r"[^a-z0-9]+", " ", slug.lower()).strip()
        if not n:
            return False
        tok = set(n.split())
        for o in our_norm:
            ot = set(o.split())
            if not ot:
                continue
            if len(tok & ot) >= max(2, int(0.7 * min(len(tok), len(ot)))):
                return True
        return False

    primary = ["ukpropertyaccountants.co.uk", "uklandlordtax.co.uk",
               "landlordstax.co.uk", "alexander-ene.co.uk",
               "propertyaccountant.co.uk"]
    for domain in primary:
        for p in raw.get(domain, []):
            s, u = p["slug"], p["url"]
            if url_excl(u) or news_like(s) or not evergreen(s) or loose_covered(s):
                continue
            b = bucket_of(s)
            if not b:
                # Was 'Other' in original — _other_resolved.json already covered it
                continue
            gap_buckets[b].append({"slug": s, "url": u, "domain": domain})

    # Dedup within bucket
    for b in gap_buckets:
        seen = set()
        unique = []
        for it in gap_buckets[b]:
            if it["slug"] in seen:
                continue
            seen.add(it["slug"])
            unique.append(it)
        gap_buckets[b] = unique

    print(f"Total buckets: {len(gap_buckets)}")
    total = sum(len(v) for v in gap_buckets.values())
    print(f"Total gap entries to check: {total}")

    # Run cannibalisation check
    annotated = {}
    counts = defaultdict(int)
    for bucket, items in gap_buckets.items():
        annotated[bucket] = []
        for it in items:
            gt = tokenise(it["slug"])
            top = best_match(gt, our, top_n=3)
            top_score = top[0][0] if top else 0.0
            cls = classify_overlap(top_score)
            counts[cls] += 1
            annotated[bucket].append({
                **it,
                "match_score": round(top_score, 2),
                "classification": cls,
                "best_match_slug": top[0][1]["slug"] if top else "",
                "second_best": top[1][1]["slug"] if len(top) > 1 else "",
                "second_score": round(top[1][0], 2) if len(top) > 1 else 0.0,
            })

    print(f"\nClassification counts:")
    for k, v in sorted(counts.items(), key=lambda kv: -kv[1]):
        print(f"  {k}: {v}")

    # Output: ranked topic gap doc with cannibalisation annotations
    out = ROOT / "docs/property/topic_gaps_final.md"
    lines = ["# Property — topic gap analysis (final, cannibalisation-checked)", ""]
    lines.append("Manager-validated topic gap list. Each entry has been checked against all 285 existing Property pages for token + title overlap; classification is one of:")
    lines.append("")
    lines.append("- ✅ **Net-new** — no existing page substantially covers this. Write a new page.")
    lines.append("- ⚠️ **Partial overlap** — we touch the topic on an existing page but the competitor has a dedicated guide. Worth assessing whether the existing page should be expanded, redirected, or whether a fresh dedicated page is warranted.")
    lines.append("- ❌ **Already covered** — our existing page squarely owns this topic. Skip (or revisit the existing page during Track 2).")
    lines.append("")
    lines.append(f"Total: {total} candidates · ✅ net-new {counts['✅ net-new']} · ⚠️ partial {counts['⚠️ partial overlap']} · ❌ covered {counts['❌ already covered']}")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Sort buckets by net-new count (highest priority = most net-new opportunity)
    bucket_priority = sorted(
        annotated.keys(),
        key=lambda b: -sum(1 for e in annotated[b] if e["classification"] == "✅ net-new")
    )
    for bucket in bucket_priority:
        items = annotated[bucket]
        if not items:
            continue
        net_new = [e for e in items if e["classification"] == "✅ net-new"]
        partial = [e for e in items if e["classification"] == "⚠️ partial overlap"]
        covered = [e for e in items if e["classification"] == "❌ already covered"]
        lines.append(f"## {bucket}")
        lines.append("")
        lines.append(f"✅ {len(net_new)} net-new · ⚠️ {len(partial)} partial · ❌ {len(covered)} covered")
        lines.append("")
        if net_new:
            lines.append("### ✅ Net-new (write these)")
            lines.append("")
            for e in net_new[:40]:
                lines.append(f"- `{e['slug']}` ({e['domain']}) — {e['url']}")
                if e["best_match_slug"]:
                    lines.append(f"  - closest existing: `{e['best_match_slug']}` (score {e['match_score']})")
            if len(net_new) > 40:
                lines.append(f"- *(+{len(net_new)-40} more net-new in this bucket)*")
            lines.append("")
        if partial:
            lines.append("### ⚠️ Partial overlap (review existing first)")
            lines.append("")
            for e in partial[:30]:
                lines.append(f"- `{e['slug']}` ↔ our `{e['best_match_slug']}` (score {e['match_score']})")
                lines.append(f"  - competitor: {e['url']}")
            if len(partial) > 30:
                lines.append(f"- *(+{len(partial)-30} more partials in this bucket)*")
            lines.append("")
        if covered:
            lines.append("### ❌ Already covered (skip)")
            lines.append("")
            for e in covered[:20]:
                lines.append(f"- `{e['slug']}` covered by our `{e['best_match_slug']}` (score {e['match_score']})")
            if len(covered) > 20:
                lines.append(f"- *(+{len(covered)-20} more)*")
            lines.append("")

    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"\nWrote {out}")

    # Top 5 buckets by net-new count (executive summary)
    print("\nTop buckets by net-new opportunity:")
    for b in bucket_priority[:15]:
        nn = sum(1 for e in annotated[b] if e["classification"] == "✅ net-new")
        if nn == 0:
            continue
        print(f"  {nn:3d} net-new | {b}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
