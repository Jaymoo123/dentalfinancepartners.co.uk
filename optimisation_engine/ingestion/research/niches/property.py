"""Property niche config.

SIC sets lifted verbatim from ingest_landlord_data.py. Segments reproduce
the existing landlord index exactly (one primary segment = all four property
SIC codes, matching the original single-segment approach).
"""
from __future__ import annotations

import os

from ..config import NicheConfig, SecondarySource, Segment, SourceRef

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
    "68100": "Buying and selling of own real estate",
    "68201": "Renting and operating of Housing Association real estate",
    "68209": "Other letting and operating of own or leased real estate",
    "68320": "Management of real estate on a fee or contract basis",
}

NICHE_CONFIG = NicheConfig(
    site_key="property",
    slug="landlord-tax-index",
    snapshot_path=os.path.join(ROOT, "Property", "web", "src", "data", "landlord-tax-index.json"),
    sic_labels=SIC_LABELS,
    segments=(
        Segment(
            key="landlord_cos",
            label="Other letting and operating of own or leased real estate",
            sic_codes=("68209",),  # PRIMARY_SIC -- the buy-to-let SPV headline line
            is_primary=True,
        ),
        Segment(
            key="all_property",
            label="All property companies",
            sic_codes=tuple(SIC_LABELS.keys()),
        ),
    ),
    secondary_sources=(
        SecondarySource(
            key="land_registry",
            label="UK House Price Index",
            fetcher="optimisation_engine.ingestion.research.fetchers.land_registry.fetch_house_prices",
            provenance=SourceRef(
                name="UK House Price Index",
                publisher="HM Land Registry / ONS",
                url="https://www.gov.uk/government/collections/uk-house-price-index-reports",
                licence="",  # oracle sources list has no licence key for this source
            ),
            optional=False,
        ),
        SecondarySource(
            key="net_formation",
            label="Dissolutions (property SIC union)",
            fetcher="optimisation_engine.ingestion.research.fetchers.ch_dissolutions.fetch_dissolutions",
            provenance=SourceRef(
                name="Companies House Advanced Search API",
                publisher="Companies House",
                url="https://developer.company-information.service.gov.uk/",
                licence="Open Government Licence v3.0",
            ),
            optional=True,
        ),
        SecondarySource(
            key="regional",
            label="Regional SPV distribution (CH bulk data)",
            fetcher="optimisation_engine.ingestion.research.fetchers.ch_bulk_regional.fetch_regional",
            provenance=SourceRef(
                name="Companies House Basic Company Data (bulk)",
                publisher="Companies House",
                url="http://download.companieshouse.gov.uk/en_output.html",
                licence="Open Government Licence v3.0",
            ),
            optional=True,
        ),
    ),
    provisional_months=2,
    thin_segment_min_ttm=120,
    notes=(
        "Incorporation counts are gross (dissolved companies remain on the register). "
        "Union is the deduplicated count across the four real-estate SIC codes. The most recent "
        "2 months are provisional (Companies House indexing lag) and are excluded "
        "from headline figures."
    ),
    supabase_table="landlord_incorporations",
    headline_prefix="landlord",
    union_ttm_key="all_property_cos_ttm",
    hoist_secondary_to_top={"land_registry": "house_prices", "net_formation": "net_formation", "regional": "regional"},
)
