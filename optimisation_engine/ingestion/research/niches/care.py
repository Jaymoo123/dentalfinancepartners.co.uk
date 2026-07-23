"""Care Company Formation Index niche config.

Care-sector SIC set (Section Q, human health & social work):
- 87100: Residential nursing care activities
- 87200: Residential care for learning disability, mental health & substance misuse
- 87300: Residential care activities for the elderly and disabled
- 87900: Other residential care activities n.e.c. (often children's/supported-living)
- 88100: Social work activities without accommodation for the elderly and disabled
  (domiciliary/home care, day centres)
- 88990: Other social work activities without accommodation n.e.c. (supported living
  frequently lands here)

SIC is self-selected and coarse: many single-home operators sit in 87300/87900
interchangeably, and domiciliary agencies sometimes mis-file under residential codes.
The authoritative count of live regulated services is CQC (see the sibling
UK Care Home Density & Quality Index, built from CQC open data, not Companies House),
not this incorporation-count index.

Monthly cadence via the shared engine (companies_house.py + snapshot.py); this
supersedes the quarterly ad-hoc pull in care/pipeline/build_care_provider_index.py
in depth (adds 88990, monthly granularity, YoY/decade/thin-segment maths) without
replacing the existing /research/care-provider-business-index page, which folds this
snapshot in as an additional "formations and seasonality" section alongside its
existing CQC-active-locations content.
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
    "87100": "Residential nursing care activities",
    "87200": "Residential care for learning disability, mental health & substance misuse",
    "87300": "Residential care activities for the elderly and disabled",
    "87900": "Other residential care activities n.e.c.",
    "88100": "Social work activities without accommodation for the elderly and disabled",
    "88990": "Other social work activities without accommodation n.e.c.",
}

NICHE_CONFIG = NicheConfig(
    site_key="care",
    slug="uk-care-company-formation-index",
    snapshot_path=os.path.join(ROOT, "care", "web", "src", "data", "uk-care-company-formation-index.json"),
    sic_labels=SIC_LABELS,
    segments=(
        Segment(
            key="residential_nursing",
            label="Residential Nursing Care",
            sic_codes=("87100",),
            is_primary=True,
        ),
        Segment(
            key="residential_other",
            label="Residential Care (LD, MH, Elderly & Disabled)",
            sic_codes=("87200", "87300", "87900"),
        ),
        Segment(
            key="domiciliary",
            label="Domiciliary & Day Social Work Care",
            sic_codes=("88100",),
        ),
        Segment(
            key="supported_living_other",
            label="Other Social Work Activities (often supported living)",
            sic_codes=("88990",),
        ),
    ),
    provisional_months=2,
    thin_segment_min_ttm=50,
    notes=(
        "Incorporation counts are gross (dissolved companies remain on the register; "
        "no survivorship bias). Union is the deduplicated count across all 6 care SIC "
        "codes -- a company registering multiple SIC codes from the set is counted "
        "once. SIC codes are self-reported by the filing company; domiciliary care "
        "agencies frequently mis-file under residential SIC codes (87100-87900) rather "
        "than 88100, and single-home operators move between 87300/87900. The most "
        "recent 2 months are provisional (Companies House indexing lag) and are "
        "excluded from headline figures and decade comparisons. For the authoritative "
        "count of live regulated care services (as opposed to incorporated companies), "
        "see the UK Care Home Density & Quality Index, built from CQC open data."
    ),
    supabase_table="",
    headline_prefix="care",
    union_ttm_key="all_care_cos_ttm",
    attribution=(
        "Care Company Formation Index data compiled from Companies House public records "
        "(Open Government Licence v3.0). Free to cite with attribution to Care Home Tax."
    ),
)
