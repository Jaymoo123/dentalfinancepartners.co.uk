"""Pharmacy Company Formation Index niche config.

SIC 47730: Dispensing chemist in specialised stores.
Tracks new UK pharmacy company incorporations (limited companies registered
under SIC 47730) from Companies House public records. This is the
corporate-entity layer that complements the NHSBSA Pharmacy Openings and
Closures index (which measures NHS dispensing contracts, not incorporated
companies) -- the two spines diverge because SIC 47730 includes holding
companies, private-only operators, and group restructurings that never touch
an NHS contract.
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
    "47730": "Dispensing chemist in specialised stores",
}

NICHE_CONFIG = NicheConfig(
    site_key="pharmacies",
    slug="pharmacy-company-formation-index",
    snapshot_path=os.path.join(ROOT, "pharmacies", "web", "src", "data", "pharmacy-ch-formations-index.json"),
    sic_labels=SIC_LABELS,
    segments=(
        Segment(
            key="pharmacy",
            label="Dispensing chemist in specialised stores",
            sic_codes=("47730",),
            is_primary=True,
        ),
    ),
    provisional_months=2,
    thin_segment_min_ttm=100,
    notes=(
        "Incorporation counts are gross (dissolved companies remain on the register; "
        "no survivorship bias). SIC 47730 covers all limited companies registered for "
        "dispensing-chemist activity, including NHS-contracted, mixed, and wholly "
        "private operators, plus holding companies for pharmacy groups. The most "
        "recent 2 months are provisional (Companies House indexing lag) and are "
        "excluded from headline figures. This corporate-formations count is a "
        "supplementary signal, not the main pharmacy-count spine: NHSBSA's Pharmacy "
        "Openings and Closures dataset (NHS dispensing contracts) is the primary "
        "measure of the shrinking pharmacy network."
    ),
    supabase_table="",
    headline_prefix="pharmacy",
    union_ttm_key="pharmacy_cos_ttm",
    attribution=(
        "Pharmacy Company Formation Index data compiled from Companies House public "
        "records (Open Government Licence v3.0). Free to cite with attribution to "
        "Pharmacy Tax."
    ),
)
