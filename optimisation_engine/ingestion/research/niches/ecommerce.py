"""UK Online Seller Formation Seasonality niche config.

SIC 47910 (retail sale via mail order houses or via internet) is the core
online-retail / DTC SIC. SIC 47990 (other retail not in stores, stalls or
markets) is tracked as a secondary segment, never blended into the 47910
headline.

This niche config feeds a monthly incorporations series used to add a
seasonality cut (month-of-year incorporation pattern) to the existing
"UK Online Seller Business Index" flagship page
(ecommerce/web/src/app/research/online-seller-index/page.tsx), which already
covers quarterly incorporations/dissolutions and cohort survival from a
separate live CH Advanced Search pull. This engine snapshot is additive, not
a replacement: it is the only source for month-of-year seasonality.
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
    "47910": "Retail sale via mail order houses or via Internet",
    "47990": "Other retail sale not in stores, stalls or markets",
}

NICHE_CONFIG = NicheConfig(
    site_key="ecommerce",
    slug="online-seller-formation-seasonality",
    snapshot_path=os.path.join(
        ROOT, "ecommerce", "web", "src", "data", "online-seller-formation-seasonality.json"
    ),
    sic_labels=SIC_LABELS,
    segments=(
        Segment(
            key="online_retail",
            label="Retail sale via mail order houses or via Internet",
            sic_codes=("47910",),
            is_primary=True,
        ),
        Segment(
            key="other_non_store_retail",
            label="Other retail sale not in stores, stalls or markets",
            sic_codes=("47990",),
        ),
    ),
    provisional_months=2,
    thin_segment_min_ttm=120,
    notes=(
        "Incorporation counts are gross (dissolved companies remain on the register; "
        "no survivorship bias). SIC 47910 is the primary online-retail / DTC code; "
        "47990 is tracked as a labelled secondary segment and never blended into the "
        "47910 headline. The most recent 2 months are provisional (Companies House "
        "indexing lag) and are excluded from headline figures and decade comparisons."
    ),
    supabase_table="",
    headline_prefix="online_retail",
    union_ttm_key="all_online_seller_cos_ttm",
    attribution=(
        "UK Online Seller Formation Seasonality data compiled from Companies House public "
        "records (Open Government Licence v3.0). Free to cite with attribution to Ecommerce "
        "Finance."
    ),
)
