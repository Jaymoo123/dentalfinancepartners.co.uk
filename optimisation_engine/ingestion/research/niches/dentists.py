"""Dental Company Formation Index niche config.

SIC 86230: General dental practice activities.
Tracks new UK dental company incorporations (limited companies registered under
SIC 86230) from Companies House public records.

~18,481 active dental companies on SIC 86230 as of 2026.
"""
from __future__ import annotations

import os

from ..config import NicheConfig, Segment, SourceRef

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
    "86230": "General dental practice activities",
}

NICHE_CONFIG = NicheConfig(
    site_key="dentists",
    slug="dental-company-formation-index",
    snapshot_path=os.path.join(ROOT, "Dentists", "web", "src", "data", "dental-company-formation-index.json"),
    sic_labels=SIC_LABELS,
    segments=(
        Segment(
            key="dental",
            label="General dental practice activities",
            sic_codes=("86230",),
            is_primary=True,
        ),
    ),
    provisional_months=2,
    thin_segment_min_ttm=10,
    notes=(
        "Incorporation counts are gross (dissolved companies remain on the register; "
        "no survivorship bias). SIC 86230 covers all limited companies registered for "
        "general dental practice activities, including NHS, mixed, and private dental "
        "practices. The most recent 2 months are provisional (Companies House indexing lag) "
        "and are excluded from headline figures."
    ),
    supabase_table="",
    headline_prefix="dental",
    union_ttm_key="dental_cos_ttm",
    attribution=(
        "Dental Company Formation Index data compiled from Companies House public records "
        "(Open Government Licence v3.0). Free to cite with attribution to Dental Finance Partners."
    ),
)
