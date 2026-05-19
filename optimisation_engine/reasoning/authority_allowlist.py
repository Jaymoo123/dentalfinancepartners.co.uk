"""
UK authority allowlist — tiered by trust level + per-niche specificity.

Used by:
  - external_link_suggester  (outbound citations)
  - research_synthesizer     (claim harvesting)
  - content_authority_score  (per-page diversity scoring)

Tiers (higher = more trust, weight more in scoring):
  canonical:  primary government / regulatory / parliamentary / national-data sources
  authority:  professional bodies, regulators, qualified-research institutions
  industry:   trade press, specialist tax/finance journals, big-4 commentary
  press:      mainstream news (only when topical)
  niche:      specific to the particular site's audience

Each domain has:
  - tier        (str)
  - score       (int 0-100; canonical=90+, authority=70-85, industry=50-65, press=35-50)
  - description (human-readable note)
  - applies_to  (list of site_keys this domain is relevant to; * = all)
"""
from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class AuthorityDomain:
    domain: str
    tier: str
    score: int
    description: str
    applies_to: tuple[str, ...]  # site_keys, or ('*',) for all


_ALL = ("*",)
_PROPERTY = ("property", "generalist")
_DENTISTS = ("dentists", "generalist")
_AGENCY = ("agency", "generalist")
_GENERALIST = ("generalist",)
_ALL_NICHES = ("agency", "property", "dentists", "generalist")


# ============================================================================
# CANONICAL TIER — primary government / national-data / parliamentary sources
# ============================================================================
_CANONICAL: list[AuthorityDomain] = [
    AuthorityDomain("gov.uk", "canonical", 100, "UK government main site; tax, business, regulatory", _ALL),
    AuthorityDomain("hmrc.gov.uk", "canonical", 100, "HM Revenue & Customs guidance / manuals", _ALL),
    AuthorityDomain("legislation.gov.uk", "canonical", 100, "Primary legislation source of truth", _ALL),
    AuthorityDomain("parliament.uk", "canonical", 95, "House of Commons Library briefings, Hansard, committee reports", _ALL),
    AuthorityDomain("commonslibrary.parliament.uk", "canonical", 95, "House of Commons research briefings — fiscal / tax", _ALL),
    AuthorityDomain("ons.gov.uk", "canonical", 95, "Office for National Statistics", _ALL),
    AuthorityDomain("treasury.gov.uk", "canonical", 90, "HM Treasury (sometimes uses gov.uk)", _ALL),
    AuthorityDomain("hmtreasury.gov.uk", "canonical", 90, "HM Treasury alt path", _ALL),
    AuthorityDomain("obr.uk", "canonical", 95, "Office for Budget Responsibility", _ALL),
    AuthorityDomain("bankofengland.co.uk", "canonical", 95, "Bank of England statistics and analysis", _ALL),
    AuthorityDomain("data.gov.uk", "canonical", 90, "UK government open data portal", _ALL),
    AuthorityDomain("statistics.gov.uk", "canonical", 85, "Govt statistics archive (some content)", _ALL),
    AuthorityDomain("dwp.gov.uk", "canonical", 85, "Department for Work and Pensions", _ALL),
    AuthorityDomain("mhclg.gov.uk", "canonical", 85, "Ministry of Housing, Communities & Local Govt", _PROPERTY),
    AuthorityDomain("levellingup.gov.uk", "canonical", 80, "Dept for Levelling Up, Housing & Communities", _PROPERTY),
    AuthorityDomain("dluhc.gov.uk", "canonical", 80, "DLUHC (housing policy)", _PROPERTY),
    AuthorityDomain("landregistry.gov.uk", "canonical", 90, "HM Land Registry", _PROPERTY),
    AuthorityDomain("companieshouse.gov.uk", "canonical", 90, "Companies House", _ALL),
    AuthorityDomain("nhs.uk", "canonical", 95, "NHS main site", _DENTISTS),
    AuthorityDomain("england.nhs.uk", "canonical", 95, "NHS England", _DENTISTS),
    AuthorityDomain("nhsbsa.nhs.uk", "canonical", 90, "NHS Business Services Authority (pensions)", _DENTISTS),
    AuthorityDomain("digital.nhs.uk", "canonical", 85, "NHS Digital (data)", _DENTISTS),
]


# ============================================================================
# AUTHORITY TIER — professional bodies, regulators, research institutions
# ============================================================================
_AUTHORITY: list[AuthorityDomain] = [
    # General accounting / tax professional bodies
    AuthorityDomain("icaew.com", "authority", 90, "ICAEW (Institute of Chartered Accountants England & Wales)", _ALL),
    AuthorityDomain("accaglobal.com", "authority", 85, "ACCA (Association of Chartered Certified Accountants)", _ALL),
    AuthorityDomain("cimaglobal.com", "authority", 80, "CIMA (Chartered Institute of Management Accountants)", _ALL),
    AuthorityDomain("cgma.org", "authority", 75, "CGMA (Chartered Global Management Accountant)", _ALL),
    AuthorityDomain("ciot.org.uk", "authority", 90, "CIOT (Chartered Institute of Taxation)", _ALL),
    AuthorityDomain("tax.org.uk", "authority", 85, "Tax.org.uk (CIOT)", _ALL),
    AuthorityDomain("att.org.uk", "authority", 85, "Association of Taxation Technicians", _ALL),
    AuthorityDomain("ifa.org.uk", "authority", 75, "Institute of Financial Accountants", _ALL),
    AuthorityDomain("ats.org.uk", "authority", 70, "Association of Tax Specialists", _ALL),

    # Financial regulators / authorities
    AuthorityDomain("fca.org.uk", "authority", 90, "Financial Conduct Authority", _ALL),
    AuthorityDomain("prudential.bankofengland.co.uk", "authority", 85, "Prudential Regulation Authority (BoE)", _ALL),
    AuthorityDomain("ico.org.uk", "authority", 85, "Information Commissioner's Office (data protection)", _ALL),
    AuthorityDomain("frc.org.uk", "authority", 85, "Financial Reporting Council (audit standards)", _ALL),
    AuthorityDomain("ofgem.gov.uk", "authority", 75, "Ofgem (energy regulator)", _ALL),
    AuthorityDomain("ofcom.org.uk", "authority", 75, "Ofcom", _ALL),
    AuthorityDomain("cma.gov.uk", "authority", 80, "Competition and Markets Authority", _ALL),

    # Research institutes
    AuthorityDomain("ifs.org.uk", "authority", 95, "Institute for Fiscal Studies — high-trust tax research", _ALL),
    AuthorityDomain("resolutionfoundation.org", "authority", 85, "Resolution Foundation", _ALL),
    AuthorityDomain("niesr.ac.uk", "authority", 80, "National Institute of Economic and Social Research", _ALL),
    AuthorityDomain("ippr.org", "authority", 75, "Institute for Public Policy Research", _ALL),
    AuthorityDomain("instituteforgovernment.org.uk", "authority", 80, "Institute for Government", _ALL),
    AuthorityDomain("taxfoundation.org", "authority", 70, "Tax Foundation (international comparisons)", _ALL),
    AuthorityDomain("oecd.org", "authority", 85, "OECD reports — UK comparisons", _ALL),

    # Property-specific bodies + regulators
    AuthorityDomain("nrla.org.uk", "authority", 85, "National Residential Landlords Association", _PROPERTY),
    AuthorityDomain("rla.org.uk", "authority", 80, "Residential Landlords Association (legacy/NRLA)", _PROPERTY),
    AuthorityDomain("propertymark.co.uk", "authority", 80, "Propertymark (estate agent regulator)", _PROPERTY),
    AuthorityDomain("ricsfirms.com", "authority", 75, "RICS member firms", _PROPERTY),
    AuthorityDomain("rics.org", "authority", 85, "Royal Institution of Chartered Surveyors", _PROPERTY),
    AuthorityDomain("propertyinvestortoday.co.uk", "authority", 60, "Property investor industry pub", _PROPERTY),
    AuthorityDomain("residentiallandlord.com", "authority", 55, "Landlord trade press", _PROPERTY),

    # Dentists-specific bodies + regulators
    AuthorityDomain("bda.org", "authority", 90, "British Dental Association", _DENTISTS),
    AuthorityDomain("gdc-uk.org", "authority", 90, "General Dental Council (regulator)", _DENTISTS),
    AuthorityDomain("bdia.org.uk", "authority", 75, "British Dental Industry Association", _DENTISTS),
    AuthorityDomain("adi.org.uk", "authority", 70, "Association of Dental Implantology", _DENTISTS),
    AuthorityDomain("bsdh.org", "authority", 70, "British Society for Disability and Oral Health", _DENTISTS),
    AuthorityDomain("nasdal.org.uk", "authority", 80, "National Association of Specialist Dental Accountants & Lawyers", _DENTISTS),
    AuthorityDomain("the-pda.org", "authority", 70, "Practice owner / dental network", _DENTISTS),

    # Agency-specific bodies + regulators
    AuthorityDomain("asa.org.uk", "authority", 85, "Advertising Standards Authority", _AGENCY),
    AuthorityDomain("cap.org.uk", "authority", 80, "Committee of Advertising Practice (CAP)", _AGENCY),
    AuthorityDomain("ipa.co.uk", "authority", 85, "Institute of Practitioners in Advertising", _AGENCY),
    AuthorityDomain("cim.co.uk", "authority", 80, "Chartered Institute of Marketing", _AGENCY),
    AuthorityDomain("dma.org.uk", "authority", 75, "Data & Marketing Association", _AGENCY),
    AuthorityDomain("prca.org.uk", "authority", 75, "Public Relations & Communications Association", _AGENCY),

    # Employment / contractor
    AuthorityDomain("cipd.co.uk", "authority", 85, "Chartered Institute of Personnel and Development", _ALL),
    AuthorityDomain("acas.org.uk", "authority", 90, "ACAS (employment guidance)", _ALL),
    AuthorityDomain("hse.gov.uk", "authority", 85, "Health and Safety Executive", _ALL),
]


# ============================================================================
# INDUSTRY TIER — trade press, specialist publications, big-4 commentary
# ============================================================================
_INDUSTRY: list[AuthorityDomain] = [
    # Tax / accounting specialist press
    AuthorityDomain("taxjournal.com", "industry", 75, "Tax Journal — specialist", _ALL),
    AuthorityDomain("taxation.co.uk", "industry", 70, "Taxation magazine", _ALL),
    AuthorityDomain("accountingweb.co.uk", "industry", 70, "AccountingWEB", _ALL),
    AuthorityDomain("accountancyage.com", "industry", 70, "Accountancy Age", _ALL),
    AuthorityDomain("economia.icaew.com", "industry", 75, "Economia (ICAEW magazine)", _ALL),
    AuthorityDomain("rossmartin.co.uk", "industry", 75, "Rossmartin Tax (well-regarded SME tax)", _ALL),
    AuthorityDomain("taxinsider.co.uk", "industry", 65, "Tax Insider", _ALL),
    AuthorityDomain("litrg.org.uk", "industry", 80, "Low Incomes Tax Reform Group", _ALL),

    # Big-4 / consulting
    AuthorityDomain("pwc.co.uk", "industry", 80, "PwC UK", _ALL),
    AuthorityDomain("deloitte.com", "industry", 80, "Deloitte UK", _ALL),
    AuthorityDomain("ey.com", "industry", 80, "EY UK", _ALL),
    AuthorityDomain("kpmg.com", "industry", 80, "KPMG UK", _ALL),
    AuthorityDomain("bdo.co.uk", "industry", 75, "BDO", _ALL),
    AuthorityDomain("grantthornton.co.uk", "industry", 75, "Grant Thornton", _ALL),
    AuthorityDomain("rsm.global", "industry", 70, "RSM UK", _ALL),
    AuthorityDomain("mazars.co.uk", "industry", 70, "Mazars / Forvis Mazars", _ALL),
    AuthorityDomain("crowe.co.uk", "industry", 65, "Crowe UK", _ALL),
    AuthorityDomain("saffery.com", "industry", 65, "Saffery (specialist UK practice)", _ALL),

    # Investment / personal finance
    AuthorityDomain("moneyweek.com", "industry", 65, "MoneyWeek (specialist personal finance)", _ALL),
    AuthorityDomain("investorschronicle.co.uk", "industry", 70, "Investors Chronicle", _ALL),
    AuthorityDomain("citywire.com", "industry", 65, "Citywire", _ALL),

    # Property-specific industry
    AuthorityDomain("estatesgazette.com", "industry", 80, "Estates Gazette — property industry", _PROPERTY),
    AuthorityDomain("propertyweek.com", "industry", 75, "Property Week", _PROPERTY),
    AuthorityDomain("propertyindustryeye.com", "industry", 65, "Property Industry Eye", _PROPERTY),
    AuthorityDomain("landlordtoday.co.uk", "industry", 65, "Landlord Today (NRLA-affiliated)", _PROPERTY),
    AuthorityDomain("buyassociation.co.uk", "industry", 55, "BuyAssociation (BTL news)", _PROPERTY),

    # Property data / indices
    AuthorityDomain("halifax.co.uk", "industry", 75, "Halifax House Price Index", _PROPERTY),
    AuthorityDomain("nationwide.co.uk", "industry", 75, "Nationwide HPI", _PROPERTY),
    AuthorityDomain("hometrack.com", "industry", 65, "Hometrack property data", _PROPERTY),
    AuthorityDomain("rightmove.co.uk", "industry", 55, "Rightmove research / quarterly updates", _PROPERTY),
    AuthorityDomain("zoopla.co.uk", "industry", 55, "Zoopla market research (specific reports only)", _PROPERTY),

    # Dentists industry
    AuthorityDomain("dentistry.co.uk", "industry", 70, "Dentistry magazine", _DENTISTS),
    AuthorityDomain("dental-tribune.com", "industry", 60, "Dental Tribune", _DENTISTS),
    AuthorityDomain("nature.com", "industry", 85, "Nature journal — dental research occasionally", _DENTISTS),
    AuthorityDomain("bdjopen.bdj.co.uk", "industry", 75, "British Dental Journal Open", _DENTISTS),
    AuthorityDomain("ada.org", "industry", 60, "American Dental Association (occasional UK relevance)", _DENTISTS),
    AuthorityDomain("dentalreviewnews.com", "industry", 55, "Dental Review News", _DENTISTS),

    # Agency industry
    AuthorityDomain("marketingweek.com", "industry", 75, "Marketing Week", _AGENCY),
    AuthorityDomain("campaignlive.co.uk", "industry", 75, "Campaign", _AGENCY),
    AuthorityDomain("thedrum.com", "industry", 70, "The Drum", _AGENCY),
    AuthorityDomain("digiday.com", "industry", 70, "Digiday", _AGENCY),
    AuthorityDomain("adweek.com", "industry", 65, "AdWeek", _AGENCY),

    # SME-relevant industry (generalist)
    AuthorityDomain("simplybusiness.co.uk", "industry", 60, "Simply Business knowledge centre", _ALL),
    AuthorityDomain("fsb.org.uk", "industry", 75, "Federation of Small Businesses", _ALL),
    AuthorityDomain("cbi.org.uk", "industry", 80, "Confederation of British Industry", _ALL),
    AuthorityDomain("british-business-bank.co.uk", "industry", 80, "British Business Bank", _ALL),
]


# ============================================================================
# PRESS TIER — mainstream news (only cite when truly topical)
# ============================================================================
_PRESS: list[AuthorityDomain] = [
    AuthorityDomain("ft.com", "press", 80, "Financial Times", _ALL),
    AuthorityDomain("bbc.co.uk", "press", 75, "BBC News", _ALL),
    AuthorityDomain("bbc.com", "press", 75, "BBC (international)", _ALL),
    AuthorityDomain("telegraph.co.uk", "press", 65, "Telegraph (business / property)", _ALL),
    AuthorityDomain("theguardian.com", "press", 65, "Guardian (money section)", _ALL),
    AuthorityDomain("thetimes.co.uk", "press", 70, "The Times", _ALL),
    AuthorityDomain("ifsfreeguides.co.uk", "press", 60, "IFS quick guides", _ALL),
    AuthorityDomain("which.co.uk", "press", 65, "Which? Money (consumer side, occasional)", _ALL),
    AuthorityDomain("thisismoney.co.uk", "press", 55, "This is Money", _ALL),
    AuthorityDomain("moneysavingexpert.com", "press", 60, "MoneySavingExpert (Martin Lewis content)", _ALL),
    AuthorityDomain("uk.reuters.com", "press", 80, "Reuters UK", _ALL),
    AuthorityDomain("reuters.com", "press", 80, "Reuters", _ALL),
    AuthorityDomain("bloomberg.com", "press", 75, "Bloomberg", _ALL),
    AuthorityDomain("cityam.com", "press", 65, "City AM", _ALL),
    AuthorityDomain("economist.com", "press", 80, "The Economist", _ALL),
]


# Combined master list (~120 domains)
AUTHORITY_DOMAINS_ALL: list[AuthorityDomain] = _CANONICAL + _AUTHORITY + _INDUSTRY + _PRESS


# Domains that are NEVER acceptable as citation sources (override the allowlist)
BLOCKED_DOMAINS: set[str] = {
    "youtube.com", "youtu.be",
    "facebook.com", "instagram.com", "twitter.com", "x.com",
    "linkedin.com", "tiktok.com", "pinterest.com",
    "reddit.com", "quora.com", "stackexchange.com",
    "wikipedia.org", "en.wikipedia.org",
    "justanswer.com", "justanswer.co.uk",
    "answers.com",
    "raisin.com", "hoa.org.uk",
}


def domains_for_site(site_key: str) -> list[AuthorityDomain]:
    """Return all domains relevant to a given site, sorted by score desc."""
    out = []
    for d in AUTHORITY_DOMAINS_ALL:
        if d.applies_to == _ALL or "*" in d.applies_to or site_key in d.applies_to:
            out.append(d)
    out.sort(key=lambda x: (-x.score, x.tier, x.domain))
    return out


def domains_by_tier(site_key: str, tier: str) -> list[AuthorityDomain]:
    return [d for d in domains_for_site(site_key) if d.tier == tier]


def authority_score_for_domain(domain: str) -> int:
    """Lookup score for a domain (case-insensitive, www-stripped). 0 if unknown."""
    norm = domain.lower().lstrip("www.")
    for d in AUTHORITY_DOMAINS_ALL:
        if d.domain == norm or norm.endswith("." + d.domain):
            return d.score
    return 0


def tier_for_domain(domain: str) -> str:
    norm = domain.lower().lstrip("www.")
    for d in AUTHORITY_DOMAINS_ALL:
        if d.domain == norm or norm.endswith("." + d.domain):
            return d.tier
    return "unknown"


def is_blocked(domain: str) -> bool:
    norm = domain.lower().lstrip("www.")
    return norm in BLOCKED_DOMAINS or any(norm == b or norm.endswith("." + b) for b in BLOCKED_DOMAINS)


# Pretty-print for inspection
if __name__ == "__main__":
    import sys
    site = sys.argv[1] if len(sys.argv) > 1 else "property"
    domains = domains_for_site(site)
    by_tier_count: dict[str, int] = {}
    for d in domains:
        by_tier_count[d.tier] = by_tier_count.get(d.tier, 0) + 1
    print(f"Authority allowlist for site={site}: {len(domains)} domains")
    print(f"  by tier: {by_tier_count}")
    print()
    for tier in ["canonical", "authority", "industry", "press"]:
        tier_domains = [d for d in domains if d.tier == tier]
        print(f"--- {tier.upper()} ({len(tier_domains)}) ---")
        for d in tier_domains:
            print(f"  [{d.score:3d}] {d.domain:38s} {d.description}")
        print()
