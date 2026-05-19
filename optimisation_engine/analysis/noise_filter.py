"""
Noise filter — exclude keywords that are not real opportunities for a UK
accounting firm.

Why this exists: DataForSEO competitor scraping pulled keywords competitors
rank for ALONGSIDE us, even when those keywords are off-topic. charcol.co.uk
is a mortgage broker so it ranks for "mortgage calculator" terms;
simplybusiness.co.uk runs auto/business insurance and ranks for vehicle-tax
queries. The cross-site relevance LLM was too lenient and tagged these as
"tax-adjacent → relevant to generalist".

The filter is two-pronged:
  - PATTERN_BLOCKLIST: explicit regex patterns we never want to chase
  - is_noisy(): function that classifies a single keyword

Code-side, deterministic, free. Detectors call is_noisy() before persisting.
Cleanup script can also apply this retrospectively.
"""
from __future__ import annotations

import re

# ---------------------------------------------------------------------------
# Pattern groups
# ---------------------------------------------------------------------------

# Vehicle/DVLA tax queries (very high volume, irrelevant to accountants)
VEHICLE_TAX_PATTERNS = [
    r"\b(car|van|vehicle|bike|motorbike|motorcycle|lorry|hgv|truck) tax\b",
    r"\btax (a |my |your )?(car|van|vehicle|bike|motorbike|motorcycle|lorry|hgv|truck)\b",
    r"\btax (disc|class)\b",
    r"\b(check|is) (a |my |your )?vehicle( is)? (taxed|tax(ed)?|sorn)\b",
    r"\bcheck (if )?(a |my |your )?vehicle( is)? taxed\b",
    r"\bcheck (for )?(road|car|vehicle|van) tax\b",
    r"\broad tax\b",
    r"\bdvla\b",
    r"\bv5c?\b",
    r"\bcar and tax\b",
    r"\btax (check|enquiry|checker)\b(?!.*(self assessment|hmrc|income))",
]

# Generic consumer calculators / converters — useful to USERS but not topical
# fit for an accountant beyond the calculators we already host.
GENERIC_CALC_PATTERNS = [
    r"\bmortgage calculator\b",
    r"\bhome loan( calculator)?\b",
    r"\bloan calculator\b",
    r"\bpension calculator\b(?! .*(uk|relief|tax))",  # 'pension calculator' alone is generic
    r"\bsalary calculator\b",
    r"\bincome tax calculator\b",
    r"\btax income (estimator|calculator)\b",
    r"\bpercentage (how to calculate|calculator)\b",
    r"\bage calculator\b",
    r"\bbmi calculator\b",
    r"\bcurrency converter\b",
    r"\bdate calculator\b",
]

# Government-service navigational queries (people looking for gov.uk directly)
GOV_NAVIGATIONAL_PATTERNS = [
    r"\bcompanies house( login| beta| service)?\b",
    r"\bh ?m ?revenue (and )?customs\b",
    r"\bhmrc (login|gateway|portal|website|contact|phone)\b",
    r"\bgovernment gateway\b",
    r"\bgov\.uk\b",
    r"\bpersonal income tax account\b",  # gov.uk-specific
    r"\btax credits (login|portal)\b",
]

# Brand/company-name lookups (not our customers / not our topics)
BRAND_PATTERNS = [
    r"\bbarclays( plc| bank| business| online| login)?\b",
    r"\bhsbc( bank| business| login)?\b",
    r"\blloyds( bank| business| login)?\b",
    r"\bnatwest( bank| business| login)?\b",
    r"\bnationwide( bank| building society| login)?\b",
    r"\bsantander( uk| business| login)?\b",
    r"\bmonzo\b",
    r"\bstarling( bank)?\b",
    r"\brevolut\b",
    r"\bwise( business)?\b",
    r"\bpaypal\b",
    r"\bstripe\b",
    r"\bquickbooks\b(?! tutorial)",
    r"\bxero\b(?! tutorial| training)",  # generic Xero brand search, not "how to use Xero"
    r"\bsage\b(?! 50| business)",  # plain Sage brand search
    r"\bdentally\b",  # dental practice software brand
]

# Dental-consumer terms (about teeth, not about dental practice finance)
DENTAL_CONSUMER_PATTERNS = [
    r"\bteeth whitening\b",
    r"\bteeth cleaning\b",
    r"\bdental implant(s)? (cost|price|near me)\b",  # cost/near-me = consumer
    r"\bbraces (cost|price|near me)\b",
    r"\binvisalign (cost|price|near me)\b",
    r"\bdentist near me\b",
    r"\bemergency dentist\b",
    r"\bnhs dentist (find|register|accepting)\b",
    r"\btooth (extraction|pain|abscess) (cost|price|nhs)\b",
    r"\bdenture(s)? (cost|price|nhs)\b",
]

# US tax/finance terms (we serve UK only)
US_TERMS_PATTERNS = [
    r"\b(irs|fbar|w-?2|w-?4|w-?9|1099|401k|401\(k\)|ira|roth ira|hsa|fsa)\b",
    r"\bsocial security (number|administration|disability)\b",
    r"\bprofessional corporation\b",  # US legal form
    r"\bllc\b(?! uk)",  # plain LLC = US (we have Ltd)
    r"\bstructured (capital|settlement|annuity)\b",
    r"\bestate planning attorney\b",
    r"\b(american|us) (taxpayer|tax return|tax code)\b",
]

# Real estate / property-consumer (not landlord finance)
PROPERTY_CONSUMER_PATTERNS = [
    r"\bestate agent(s)? near me\b",
    r"\b(zoopla|rightmove|onthemarket)\b",
    r"\bhouse prices\b(?! data)",  # 'house prices' alone is consumer
    r"\bproperty for sale\b",
    r"\bmortgage broker (near me|recommendation)\b",
    r"\b(buying|selling) (a |my )?house( near me)?\b(?!.*(tax|cgt|sdlt|stamp duty))",
]

# Off-topic finance product searches
FINANCE_PRODUCT_PATTERNS = [
    r"\bsavings (account|rates) (best|highest|2026)\b",  # rate-shopping
    r"\bisa rates\b",
    r"\bcredit (card|score) (best|check|free)\b",
    r"\binsurance quote\b",
    r"\bcar insurance\b",
    r"\bhome insurance\b",
    r"\bcurrency exchange (rate|usd|euro|gbp)\b",
]

# All patterns combined for fast matching
ALL_BLOCKLIST_PATTERNS = (
    VEHICLE_TAX_PATTERNS
    + GENERIC_CALC_PATTERNS
    + GOV_NAVIGATIONAL_PATTERNS
    + BRAND_PATTERNS
    + DENTAL_CONSUMER_PATTERNS
    + US_TERMS_PATTERNS
    + PROPERTY_CONSUMER_PATTERNS
    + FINANCE_PRODUCT_PATTERNS
)

_COMPILED = [re.compile(p, re.IGNORECASE) for p in ALL_BLOCKLIST_PATTERNS]

# Detailed reason tracking (for audit)
_PATTERN_GROUPS = {
    "vehicle_tax": [re.compile(p, re.IGNORECASE) for p in VEHICLE_TAX_PATTERNS],
    "generic_calculator": [re.compile(p, re.IGNORECASE) for p in GENERIC_CALC_PATTERNS],
    "gov_navigational": [re.compile(p, re.IGNORECASE) for p in GOV_NAVIGATIONAL_PATTERNS],
    "brand_lookup": [re.compile(p, re.IGNORECASE) for p in BRAND_PATTERNS],
    "dental_consumer": [re.compile(p, re.IGNORECASE) for p in DENTAL_CONSUMER_PATTERNS],
    "us_terms": [re.compile(p, re.IGNORECASE) for p in US_TERMS_PATTERNS],
    "property_consumer": [re.compile(p, re.IGNORECASE) for p in PROPERTY_CONSUMER_PATTERNS],
    "finance_product": [re.compile(p, re.IGNORECASE) for p in FINANCE_PRODUCT_PATTERNS],
}


def is_noisy(keyword: str) -> tuple[bool, str | None]:
    """Return (is_noise, reason_group_or_None)."""
    if not keyword:
        return True, "empty"
    kw = keyword.strip().lower()
    if len(kw) < 3:
        return True, "too_short"
    for group, patterns in _PATTERN_GROUPS.items():
        for pat in patterns:
            if pat.search(kw):
                return True, group
    return False, None


def filter_keywords(keywords: list[str]) -> list[str]:
    """Drop noisy keywords from a list."""
    return [k for k in keywords if not is_noisy(k)[0]]


def categorize_keywords(keywords: list[str]) -> dict[str, list[str]]:
    """Group by noise reason (useful for audit reports)."""
    out: dict[str, list[str]] = {"clean": []}
    for k in keywords:
        noisy, reason = is_noisy(k)
        if not noisy:
            out["clean"].append(k)
        else:
            out.setdefault(reason or "other", []).append(k)
    return out


if __name__ == "__main__":
    # Quick self-test against known noise from today's run
    tests = [
        ("annual investment allowance", False, None),
        ("tax car checker", True, "vehicle_tax"),
        ("check a vehicle is taxed", True, "vehicle_tax"),
        ("mortgage calculator", True, "generic_calculator"),
        ("salary calculator", True, "generic_calculator"),
        ("companies house", True, "gov_navigational"),
        ("h m revenue customs", True, "gov_navigational"),
        ("barclays plc", True, "brand_lookup"),
        ("teeth whitening", True, "dental_consumer"),
        ("dentally", True, "brand_lookup"),
        ("professional corporation", True, "us_terms"),
        ("uk cgt rates residential property 2026", False, None),
        ("accountants for dentists", False, None),
        ("section 24 mortgage interest restriction", False, None),
        ("incorporating a property portfolio uk", False, None),
        ("ir35 contractor tax", False, None),
        ("zoopla", True, "property_consumer"),
        ("car insurance", True, "finance_product"),
    ]
    fails = 0
    for kw, want_noise, want_reason in tests:
        got_noise, got_reason = is_noisy(kw)
        ok = got_noise == want_noise and (want_reason is None or got_reason == want_reason)
        status = "OK " if ok else "FAIL"
        print(f"  {status}  {kw!r:50s} noise={got_noise} reason={got_reason!r}")
        if not ok:
            fails += 1
    print(f"\n{len(tests) - fails}/{len(tests)} tests passed")
