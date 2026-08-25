"""
E-E-A-T schema generator.

Produces JSON-LD blocks for:
  - Person (Author + Reviewer, with credentials)
  - Organization (each site's accountancy firm)
  - Article (with DatePublished, DateModified, headline, image, author, reviewer)
  - WebPage (with main entity, breadcrumb)
  - HowTo (when content is procedural)
  - FAQPage (when faqs[] has entries)
  - BreadcrumbList
  - Service (for service-landing page types)
  - LocalBusiness (when site has physical locations)

The schemas are emitted as a single @graph object in the frontmatter `schema`
field. The site's Next.js renderer puts this in a <script type="application/ld+json">.

Each site has its own author/reviewer/organisation profile, derived from
niche.config.json + memory notes.
"""
from __future__ import annotations

import json
from typing import Any

from optimisation_engine.config import get_site


# Per-site E-E-A-T profile. Edited carefully — these become the canonical
# author/reviewer credentials shown to Google.
SITE_EEAT_PROFILES: dict[str, dict] = {
    "agency": {
        "organization": {
            "@type": "AccountingService",
            "name": "Agency Founder Finance",
            "url": "https://www.agencyfounderfinance.co.uk",
            "areaServed": ["United Kingdom", "United Arab Emirates"],
            "knowsAbout": [
                "Agency tax planning", "Creative agency accounting", "Digital agency finance",
                "IR35 for contractors", "Agency exit and acquisition", "UAE corporate tax",
                "R&D tax credits for digital agencies",
            ],
        },
        "author": {
            "@type": "Person",
            "name": "Agency Founder Finance Editorial Team",
            "jobTitle": "Specialist agency accountant",
            "knowsAbout": [
                "UK agency taxation", "IR35", "Agency incorporation",
                "Marketing agency finance", "UAE tax for UK founders",
            ],
        },
        "reviewer": {
            "@type": "Person",
            "name": "Agency Founder Finance Editorial Team",
            "jobTitle": "Reviewed against legislation.gov.uk and HMRC guidance",
            "knowsAbout": ["UK tax law", "Corporate tax", "International tax"],
        },
    },
    "property": {
        "organization": {
            "@type": "AccountingService",
            "name": "Property Tax Partners",
            "url": "https://www.propertytaxpartners.co.uk",
            "areaServed": "United Kingdom",
            "knowsAbout": [
                "UK landlord taxation", "Section 24 mortgage interest", "Capital gains tax on property",
                "Portfolio incorporation", "Making Tax Digital for property", "Furnished holiday lets",
                "Buy-to-let limited companies", "Non-resident landlord scheme",
            ],
        },
        "author": {
            "@type": "Person",
            "name": "Property Tax Partners Editorial Team",
            "jobTitle": "Specialist property accountant",
            "knowsAbout": [
                "Section 24 calculations", "60-day CGT reporting", "Property portfolio incorporation",
                "BTL mortgage interest relief", "FHL tax rules", "SDLT additional property surcharge",
            ],
        },
        "reviewer": {
            "@type": "Person",
            "name": "Property Tax Partners Editorial Team",
            "jobTitle": "Reviewed against legislation.gov.uk and HMRC guidance",
            "knowsAbout": ["UK property taxation", "CGT", "SDLT", "Section 24"],
        },
    },
    "dentists": {
        "organization": {
            "@type": "AccountingService",
            "name": "Dental Finance Partners",
            "url": "https://www.dentalfinancepartners.co.uk",
            "areaServed": "United Kingdom",
            "knowsAbout": [
                "Dental practice accounting", "Associate dentist taxation", "NHS contract finance",
                "Dental practice acquisitions", "NHS pension annual allowance", "VAT for dental practices",
                "Capital allowances for dental equipment",
            ],
        },
        "author": {
            "@type": "Person",
            "name": "Dental Finance Partners Editorial Team",
            "jobTitle": "Specialist dental accountant",
            "knowsAbout": [
                "NHS dental contracts", "Associate dentist tax",
                "Dental practice incorporation", "Dental VAT", "NHS pension scheme",
            ],
        },
        "reviewer": {
            "@type": "Person",
            "name": "Dental Finance Partners Editorial Team",
            "jobTitle": "Reviewed against legislation.gov.uk and HMRC guidance",
            "knowsAbout": ["Dental practice finance", "NHS contract accounting", "Practice valuation"],
        },
    },
    "generalist": {
        "organization": {
            "@type": "AccountingService",
            "name": "Holloway Davies",
            "url": "https://www.hollowaydavies.co.uk",
            "areaServed": "United Kingdom",
            "knowsAbout": [
                "UK limited company accounting", "Sole trader tax", "Partnership accounting",
                "Corporation tax", "VAT compliance", "Payroll and PAYE",
                "R&D tax credits", "Making Tax Digital", "Director dividends",
            ],
        },
        "author": {
            "@type": "Person",
            "name": "James Holloway",
            "jobTitle": "Senior accountant",
            "knowsAbout": [
                "UK corporation tax", "Limited company structures", "VAT registration",
                "Director remuneration", "R&D tax credits", "MTD compliance",
            ],
        },
        "reviewer": {
            "@type": "Person",
            "name": "Holloway Davies Editorial Team",
            "jobTitle": "Reviewed against legislation.gov.uk and HMRC guidance",
            "knowsAbout": ["UK SME taxation", "Corporation tax", "Personal taxation"],
        },
    },
}


def _default_eeat_profile(site_key: str) -> dict | None:
    """Config-driven fallback E-E-A-T profile for any site WITHOUT a curated
    entry in SITE_EEAT_PROFILES. Built from optimisation_engine.config
    (display_name + domain) so a new site emits valid, faceless
    author/reviewer/organization schema with ZERO hand-coding and NO credential
    claims (per the estate credential-source rule). Curated sites still win.
    Returns None if the site is unknown or missing name/domain (caller then
    emits no schema, preserving the old behaviour for truly-unknown keys)."""
    try:
        s = get_site(site_key)
    except Exception:
        return None
    name, domain = s.get("display_name"), s.get("domain")
    if not name or not domain:
        return None
    editorial = f"{name} Editorial Team"
    return {
        "organization": {
            "@type": "AccountingService",
            "name": name,
            "url": f"https://{domain}",
            "areaServed": "United Kingdom",
        },
        "author": {
            "@type": "Person",
            "name": editorial,
            "jobTitle": "Specialist accountant",
        },
        "reviewer": {
            "@type": "Person",
            "name": editorial,
            "jobTitle": "Reviewed against legislation.gov.uk and HMRC guidance",
        },
    }


def _site_url(site_key: str) -> str:
    return f"https://{get_site(site_key)['domain']}"


def _build_breadcrumb(*, site_key: str, canonical_url: str, category: str | None, title: str) -> dict:
    items: list[dict] = [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": _site_url(site_key)},
    ]
    if category:
        cat_slug = category.lower().replace(" & ", "-and-").replace(" ", "-")
        items.append({"@type": "ListItem", "position": 2, "name": category, "item": f"{_site_url(site_key)}/blog/{cat_slug}"})
        items.append({"@type": "ListItem", "position": 3, "name": title, "item": canonical_url})
    else:
        items.append({"@type": "ListItem", "position": 2, "name": title, "item": canonical_url})
    return {"@type": "BreadcrumbList", "itemListElement": items}


def _build_faqs(faqs: list[dict] | None) -> dict | None:
    if not faqs:
        return None
    return {
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": f.get("question", ""),
                "acceptedAnswer": {"@type": "Answer", "text": f.get("answer", "")},
            }
            for f in faqs if isinstance(f, dict) and f.get("question") and f.get("answer")
        ],
    }


def _build_article(*, site_key: str, frontmatter: dict, canonical_url: str, author: dict, reviewer: dict, organization: dict) -> dict:
    art = {
        "@type": "Article",
        "headline": frontmatter.get("title") or frontmatter.get("h1") or "",
        "description": frontmatter.get("metaDescription") or frontmatter.get("summary") or "",
        "url": canonical_url,
        "datePublished": frontmatter.get("date") or "",
        "dateModified": frontmatter.get("dateModified") or frontmatter.get("date") or "",
        "author": author,
        "reviewedBy": reviewer,
        "publisher": organization,
        "mainEntityOfPage": {"@type": "WebPage", "@id": canonical_url},
        "inLanguage": "en-GB",
    }
    if frontmatter.get("image"):
        art["image"] = (
            frontmatter["image"]
            if frontmatter["image"].startswith("http")
            else f"{_site_url(site_key)}{frontmatter['image']}"
        )
    return art


def _build_service(*, site_key: str, organization: dict, primary_h1: str, area_served: str = "United Kingdom") -> dict:
    return {
        "@type": "Service",
        "name": primary_h1,
        "provider": organization,
        "areaServed": area_served,
    }


def build_eeat_schema(
    *,
    site_key: str,
    frontmatter: dict,
    canonical_url: str,
    page_type: str = "blog_post",  # blog_post / service_landing / pillar / glossary / comparison
    faqs: list[dict] | None = None,
    extra_schema: list[dict] | None = None,
) -> str:
    """Build the full E-E-A-T @graph JSON-LD for a page. Returns a JSON string
    suitable for the frontmatter.schema field.
    """
    profile = SITE_EEAT_PROFILES.get(site_key) or _default_eeat_profile(site_key)
    if not profile:
        return ""

    organization = dict(profile["organization"])
    author = {**profile["author"], "worksFor": {"@type": "Organization", "name": organization["name"], "url": organization.get("url")}}
    reviewer = profile["reviewer"]

    graph: list[dict] = [organization, author, reviewer]

    # Article (always)
    graph.append(_build_article(
        site_key=site_key,
        frontmatter=frontmatter,
        canonical_url=canonical_url,
        author=author,
        reviewer=reviewer,
        organization=organization,
    ))

    # Breadcrumb (always)
    graph.append(_build_breadcrumb(
        site_key=site_key,
        canonical_url=canonical_url,
        category=frontmatter.get("category"),
        title=frontmatter.get("title", ""),
    ))

    # FAQPage (when faqs present)
    if (faqs or frontmatter.get("faqs")):
        fp = _build_faqs(faqs or frontmatter.get("faqs"))
        if fp:
            graph.append(fp)

    # Service (when service landing)
    if page_type == "service_landing":
        graph.append(_build_service(
            site_key=site_key,
            organization=organization,
            primary_h1=frontmatter.get("h1") or frontmatter.get("title", ""),
        ))

    # Any extra schema entries the caller wants merged in
    if extra_schema:
        for item in extra_schema:
            if isinstance(item, dict):
                graph.append(item)

    full = {"@context": "https://schema.org", "@graph": graph}
    return json.dumps(full, ensure_ascii=False, separators=(",", ":"))


if __name__ == "__main__":
    # Smoke test on the Dentists new_page
    sample_fm = {
        "title": "Accountants for Dentists: Specialist Dental Accountants in the UK",
        "metaTitle": "Accountants for Dentists | Specialist Dental Accountants UK",
        "metaDescription": "Specialist accountants for UK dental practices. NHS contracts, associate tax, practice acquisitions. Free consultation.",
        "h1": "Accountants for Dentists: Specialist Dental Accountants in the UK",
        "summary": "We are specialist dental accountants supporting associates, principals and groups across the UK.",
        "date": "2026-05-19",
        "dateModified": "2026-05-19",
        "category": "Specialist Services",
        "image": "/blog/accountants-for-dentists.jpg",
        "faqs": [
            {"question": "What makes a specialist dental accountant different?", "answer": "Specialist dental accountants understand the unique tax rules for dentists."},
        ],
    }
    s = build_eeat_schema(
        site_key="dentists",
        frontmatter=sample_fm,
        canonical_url="https://www.dentalfinancepartners.co.uk/blog/accountants-for-dentists",
        page_type="service_landing",
    )
    import json as _j
    parsed = _j.loads(s)
    print(f"Generated @graph with {len(parsed['@graph'])} entities:")
    for i, e in enumerate(parsed["@graph"], 1):
        print(f"  [{i}] @type={e.get('@type')} name={e.get('name', e.get('headline', '?'))[:60]!r}")
