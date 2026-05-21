"""Filter the raw competitor URLs scrape down to evergreen technical guides
the user can actually act on, then cluster by topic."""
from __future__ import annotations

import json
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


# URL path patterns that mean "not content" — staff profiles, service pages, etc
URL_PATH_EXCLUDES = [
    re.compile(p, re.IGNORECASE) for p in [
        r"/our-people/", r"/our-team/", r"/team/", r"/staff-profile",
        r"/author/", r"/category/", r"/tag/", r"/services/", r"/sectors/",
        r"/contact", r"/about", r"/cookie", r"/privacy", r"/terms",
        r"/thank-you", r"/login", r"/signup", r"/feed", r"/sitemap",
        r"/page/\d+", r"/our-firm", r"/case-studies?$",
        r"/international/tax-havens/",  # ukpropertyaccountants quirky structure
    ]
]


def is_url_excluded(url: str) -> bool:
    for pat in URL_PATH_EXCLUDES:
        if pat.search(url):
            return True
    return False


# Slugs that look like news / dated content — skip
NEWS_PATTERNS = [
    r"^\d+(-|$)",                  # starts with a number (counts, %, $ etc)
    r"\d+(-|$)(million|billion|bn|m|k)\b",
    r"^(spring|autumn|winter|summer)-(budget|statement)",
    r"\b(budget|statement|spending-review)\b",
    r"\b20\d{2}\b",                # contains a year
    r"\b(rises?|reveals?|warns?|launches?|announces?|criticis|defends?)\b",
    r"\b(latest|news|update[ds]?|breaking)\b",
    r"\bset-to-\b",
    r"\bcould-\b|\bwould-\b|\bshould-\b|\bwill-\b",
    r"\bblack-hole\b",
    r"\bcrack-?down\b|\bscandal\b|\bdebate\b|\bslip-?up\b",
    r"\bfile[ds]?-(self-assessment|tax-return|before|by)\b",
    r"\b(case|study)-share-for-share\b",
    r"vs-hmrc",
    r"\b(rachel-reeves|angela-rayner|jeremy-hunt|hmrc)\b",  # specific people / org news
    r"\b(forecast|predict|trend|hottest|priced-out|affordable|towns?)\b",
    r"\b(unclaimed|black-hole|debt-forces|penalties-for-a-missed)\b",
    r"\bbritains?\b|\bbrits-\b",
    r"^(my-experience|why-i-)",
    r"-deadline$|-deadline-\b",
    r"\b(opinions?|opinion-piece|comment|editorial)\b",
    r"\b(podcast|webinar|video)\b",
    r"^press-release",
    r"-explained$",                # often news angle, but borderline — keep some
    r"^how-can-i-",                # personal-anecdote framing
    r"^who-(is|wants|will|gets|owns|owes)",
]

NEWS_RE = [re.compile(p, re.IGNORECASE) for p in NEWS_PATTERNS]

# Evergreen keepers — strong positive signal
EVERGREEN_HINTS = [
    r"^(complete|comprehensive|ultimate|step-by-step)-guide",
    r"^a-complete-guide-(on|to)-",
    r"^a-guide-to-",
    r"-(complete-guide|step-by-step|explained|guide-uk|relief|allowance|exemption|deduction|election|threshold|rate[s]?)$",
    r"\b(sdlt|cgt|mtd|ated|cil|hmo|btl|fhl|llp|spv|fic|iht|cgt|sa-?\d+)\b",
    r"\b(incorporation|partnership|trust|disposal|deemed|election|relief|allowance|surcharge|threshold)\b",
    r"\b(rules|legislation|finance-act|tcga|ittoia|fa-?20\d\d)\b",
]
EVERGREEN_RE = [re.compile(p, re.IGNORECASE) for p in EVERGREEN_HINTS]


def is_news_like(slug: str) -> bool:
    for pat in NEWS_RE:
        if pat.search(slug):
            return True
    return False


def is_evergreen(slug: str) -> bool:
    for pat in EVERGREEN_RE:
        if pat.search(slug):
            return True
    # Slug-shape heuristic: short, no verbs, no specific figures
    tokens = slug.split("-")
    if 2 <= len(tokens) <= 8 and not any(t.isdigit() for t in tokens):
        return True
    return False


# Topic clustering — map slug tokens to a topic bucket
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


def assign_bucket(slug: str) -> str:
    s = slug.lower()
    for name, markers in TOPIC_BUCKETS:
        for m in markers:
            if m in s:
                return name
    return "Other / uncategorised"


def main() -> int:
    raw = json.loads((ROOT / "briefs/property/_competitor_urls.json").read_text(encoding="utf-8"))

    # Focus on direct property-focused competitors
    primary = [
        "ukpropertyaccountants.co.uk",
        "uklandlordtax.co.uk",
        "landlordstax.co.uk",
        "alexander-ene.co.uk",
        "propertyaccountant.co.uk",
    ]

    # Load our slug set for the "covered" check (reuse the loose match from the finder)
    our_slugs = [p.stem for p in (ROOT / "Property/web/content/blog").glob("*.md")]
    our_norm = {re.sub(r"[^a-z0-9]+", " ", s.lower()).strip() for s in our_slugs}

    def is_covered(slug: str) -> bool:
        norm = re.sub(r"[^a-z0-9]+", " ", slug.lower()).strip()
        if not norm:
            return False
        tokens = set(norm.split())
        for our in our_norm:
            our_tokens = set(our.split())
            if not our_tokens:
                continue
            overlap = tokens & our_tokens
            if len(overlap) >= max(2, int(0.7 * min(len(tokens), len(our_tokens)))):
                return True
        return False

    # Build (bucket, slug, [(domain, url), ...]) — keyed by canonical slug
    by_slug: dict[str, dict] = defaultdict(lambda: {"sources": [], "bucket": ""})
    for domain in primary:
        for p in raw.get(domain, []):
            slug = p["slug"]
            url = p["url"]
            if is_url_excluded(url):
                continue
            if is_news_like(slug):
                continue
            if not is_evergreen(slug):
                continue
            if is_covered(slug):
                continue
            entry = by_slug[slug]
            entry["sources"].append((domain, url))
            entry["bucket"] = assign_bucket(slug)

    # Rank: more competitors covering = higher demand signal
    ranked = sorted(by_slug.items(), key=lambda kv: (-len(kv[1]["sources"]), kv[1]["bucket"], kv[0]))

    # Group by bucket for the output
    by_bucket: dict[str, list[tuple[str, list]]] = defaultdict(list)
    for slug, info in ranked:
        by_bucket[info["bucket"]].append((slug, info["sources"]))

    # Sort buckets by total competitor-page coverage
    bucket_score = {b: sum(len(srcs) for _, srcs in items) for b, items in by_bucket.items()}
    bucket_order = sorted(by_bucket.keys(), key=lambda b: -bucket_score[b])

    lines = ["# Property — filtered competitor topic gaps", ""]
    lines.append("Generated 2026-05-21. Filtered from raw competitor sitemap scrape (`briefs/property/_competitor_urls.json`) using news-pattern exclusion + evergreen-pattern inclusion + loose-match exclusion against our 285 pages.")
    lines.append("")
    lines.append(f"Primary competitors considered: {', '.join(primary)}")
    lines.append("")
    lines.append("**How to read this:**")
    lines.append("- Topics are bucketed by theme.")
    lines.append("- Within each bucket, slugs are ordered by the number of competitor sites that cover them (higher = stronger demand signal).")
    lines.append("- A slug listed here means at least one direct competitor has an evergreen guide on it, and we don't (loose slug match).")
    lines.append("- The slug itself is a starting hypothesis for the gap topic, not a final spec — Opus should look at the underlying competitor URL to confirm scope before we commit to writing.")
    lines.append("")
    lines.append("---")
    lines.append("")
    for bucket in bucket_order:
        items = by_bucket[bucket]
        if not items:
            continue
        lines.append(f"## {bucket} ({len(items)} gap topics, {bucket_score[bucket]} competitor pages)")
        lines.append("")
        for slug, sources in items[:40]:
            n = len(sources)
            indicator = f"**[x{n}]**" if n >= 2 else f"[x{n}]"
            lines.append(f"- {indicator} `{slug}`")
            for domain, url in sources:
                lines.append(f"  - {domain}: {url}")
        if len(items) > 40:
            lines.append(f"- *(+{len(items)-40} more in this bucket)*")
        lines.append("")

    out = ROOT / "docs/property_topic_gaps_2026-05-21.md"
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {out}")
    print(f"Total filtered gap topics: {sum(len(items) for items in by_bucket.values())}")
    print(f"Buckets: {len(by_bucket)}")
    print()
    print("Top buckets by competitor coverage:")
    for b in bucket_order[:15]:
        print(f"  {bucket_score[b]:4d} pages | {len(by_bucket[b]):3d} topics | {b}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
