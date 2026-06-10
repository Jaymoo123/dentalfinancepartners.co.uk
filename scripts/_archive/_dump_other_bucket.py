"""Extract just the entries that fall in 'Other / uncategorised' bucket from
the same filter logic the topic gap script uses, so I can read them for
manual recategorisation."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Replicate the filter logic from property_topic_gap_filter.py
URL_PATH_EXCLUDES = [re.compile(p, re.I) for p in [
    r"/our-people/", r"/our-team/", r"/team/", r"/staff-profile",
    r"/author/", r"/category/", r"/tag/", r"/services/", r"/sectors/",
    r"/contact", r"/about", r"/cookie", r"/privacy", r"/terms",
    r"/thank-you", r"/login", r"/signup", r"/feed", r"/sitemap",
    r"/page/\d+", r"/our-firm", r"/case-studies?$",
    r"/international/tax-havens/",
]]
NEWS_PATTERNS = [
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
]
EVERGREEN_HINTS = [
    r"^(complete|comprehensive|ultimate|step-by-step)-guide",
    r"^a-complete-guide-(on|to)-", r"^a-guide-to-",
    r"-(complete-guide|step-by-step|explained|guide-uk|relief|allowance|exemption|deduction|election|threshold|rate[s]?)$",
    r"\b(sdlt|cgt|mtd|ated|cil|hmo|btl|fhl|llp|spv|fic|iht|cgt|sa-?\d+)\b",
    r"\b(incorporation|partnership|trust|disposal|deemed|election|relief|allowance|surcharge|threshold)\b",
    r"\b(rules|legislation|finance-act|tcga|ittoia|fa-?20\d\d)\b",
]
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
NR = [re.compile(p, re.I) for p in NEWS_PATTERNS]
ER = [re.compile(p, re.I) for p in EVERGREEN_HINTS]


def url_excl(u):
    return any(p.search(u) for p in URL_PATH_EXCLUDES)


def news_like(s):
    return any(p.search(s) for p in NR)


def evergreen(s):
    if any(p.search(s) for p in ER):
        return True
    t = s.split("-")
    return 2 <= len(t) <= 8 and not any(x.isdigit() for x in t)


def bucket(s):
    s = s.lower()
    for n, mks in TOPIC_BUCKETS:
        for m in mks:
            if m in s:
                return n
    return "Other / uncategorised"


raw = json.loads((ROOT / "briefs/property/_competitor_urls.json").read_text(encoding="utf-8"))
our = {re.sub(r"[^a-z0-9]+", " ", p.stem.lower()).strip()
       for p in (ROOT / "Property/web/content/blog").glob("*.md")}


def covered(slug):
    n = re.sub(r"[^a-z0-9]+", " ", slug.lower()).strip()
    if not n:
        return False
    tok = set(n.split())
    for o in our:
        ot = set(o.split())
        if not ot:
            continue
        if len(tok & ot) >= max(2, int(0.7 * min(len(tok), len(ot)))):
            return True
    return False


primary = ["ukpropertyaccountants.co.uk", "uklandlordtax.co.uk",
           "landlordstax.co.uk", "alexander-ene.co.uk",
           "propertyaccountant.co.uk"]

others = []
for d in primary:
    for p in raw.get(d, []):
        s, u = p["slug"], p["url"]
        if url_excl(u) or news_like(s) or not evergreen(s) or covered(s):
            continue
        if bucket(s) != "Other / uncategorised":
            continue
        others.append((s, u, d))

print(f"Other-bucket entries: {len(others)}")
out = ROOT / "briefs/property/_other_bucket.txt"
out.write_text("\n".join(f"{s}\t{u}\t{d}" for s, u, d in others), encoding="utf-8")
print(f"Wrote {out}")
