"""Digital-agency (Agency Founder Finance) Formation Index niche config.

Creative/marketing agency SIC cluster (SIC 2007), per
docs/_engines/scout_batch2/digital-agency.md:
- 73110: Advertising agencies (anchor -- headline segment, ~46k active companies on CH)
- 73120: Media representation (selling advertising space/time)
- 70210: Public relations and communications
- 74100: Specialised design activities (branding, graphic, digital design)
- 73200: Market research and public opinion polling
- 62012: Business and domestic software development
- 62020: Information technology consultancy activities

Advertising sits in SIC division 731, which is isolable to 3-digit in both
Companies House and Insolvency Service data (unlike coarser section-level
niches), so a genuinely agency-specific formation and churn series is
buildable. 62012/62020 straddle "agency" and "software house" -- kept as a
separate "tech" division rollup so the creative-cluster union isn't diluted
by generic software companies.

Counts are gross: they are drawn from the Companies House Advanced Search
API, which counts companies by incorporation date across all company
statuses. Companies that have since been dissolved are still included in the
year they were formed (Companies House retains dissolved records for roughly
20 years after dissolution, so nothing in this series' range has been purged),
so the series carries no survivorship bias.
"""
from __future__ import annotations

import os

from ..config import NicheConfig, Segment

ROOT = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.dirname(
                os.path.dirname(os.path.abspath(__file__))
            )
        )
    )
)

SIC_LABELS: dict[str, str] = {
    "73110": "Advertising agencies",
    "73120": "Media representation",
    "70210": "Public relations and communications activities",
    "74100": "Specialised design activities",
    "73200": "Market research and public opinion polling",
    "62012": "Business and domestic software development",
    "62020": "Information technology consultancy activities",
}

DIVISION_LABELS = {
    "creative": "Creative and communications agencies",
    "tech": "Software and IT consultancy (agency-adjacent)",
}

NICHE_CONFIG = NicheConfig(
    site_key="digital-agency",
    slug="uk-agency-formation-index",
    snapshot_path=os.path.join(ROOT, "digital-agency", "web", "src", "data", "uk-agency-formation-index.json"),
    sic_labels=SIC_LABELS,
    segments=(
        Segment(
            key="advertising",
            label="Advertising agencies",
            sic_codes=("73110",),
            is_primary=True,
            division="creative",
        ),
        Segment(
            key="media_representation",
            label="Media representation",
            sic_codes=("73120",),
            division="creative",
        ),
        Segment(
            key="pr_communications",
            label="Public relations and communications",
            sic_codes=("70210",),
            division="creative",
        ),
        Segment(
            key="specialised_design",
            label="Specialised design activities",
            sic_codes=("74100",),
            division="creative",
        ),
        Segment(
            key="market_research",
            label="Market research and public opinion polling",
            sic_codes=("73200",),
            division="creative",
        ),
        Segment(
            key="software_dev",
            label="Business and domestic software development",
            sic_codes=("62012",),
            division="tech",
        ),
        Segment(
            key="it_consultancy",
            label="Information technology consultancy activities",
            sic_codes=("62020",),
            division="tech",
        ),
        # Division rollups (macro view, consumed by annual_by_division on the page).
        # Keys must start with "div" -- the shared snapshot builder detects
        # this prefix to build incorporations.annual_by_division.
        Segment(
            key="div_creative",
            label=DIVISION_LABELS["creative"],
            sic_codes=("73110", "73120", "70210", "74100", "73200"),
            division="creative",
        ),
        Segment(
            key="div_tech",
            label=DIVISION_LABELS["tech"],
            sic_codes=("62012", "62020"),
            division="tech",
        ),
    ),
    provisional_months=2,
    thin_segment_min_ttm=100,
    notes=(
        "Incorporation counts are gross: they are drawn from the Companies House Advanced "
        "Search API, which counts companies by incorporation date across all company "
        "statuses. Union is the deduplicated count across all 7 agency-cluster SIC codes "
        "-- a company registering multiple SIC codes from the set is counted once. "
        "Companies that have since been dissolved are still included in the year they were "
        "formed (Companies House retains dissolved records for roughly 20 years, so nothing "
        "in this series' range has been purged), so the series carries no survivorship "
        "bias. SIC codes are self-reported by the filing company; agencies "
        "commonly straddle 73110 (advertising), 74100 (design) and 62012/62020 "
        "(software/IT consultancy) depending on how the founder classified the business "
        "at incorporation. The most recent 2 months are provisional (Companies House "
        "indexing lag) and are excluded from headline figures and decade comparisons."
    ),
    supabase_table="",
    headline_prefix="advertising",
    union_ttm_key="all_agency_cos_ttm",
    division_labels=DIVISION_LABELS,
    attribution=(
        "UK Agency Formation Index data compiled from Companies House public records "
        "(Open Government Licence v3.0). Free to cite with attribution to Agency Founder "
        "Finance."
    ),
)
