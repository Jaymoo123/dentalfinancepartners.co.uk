"""Contractors IR35 niche config.

SIC sets lifted verbatim from ingest_contractor_data.py.
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
    # IT and software (Division 62)
    "62011": "Ready-made interactive leisure and entertainment software development",
    "62012": "Business and domestic software development",
    "62020": "Information technology consultancy activities",
    "62090": "Other information technology service activities",
    # Management consultancy (Division 70)
    "70210": "Public relations and communications activities",
    "70221": "Financial management",
    "70229": "Management consultancy activities (other than financial management)",
    # Engineering and technical (Division 71)
    "71121": "Engineering design activities for industrial process and production",
    "71122": "Engineering related scientific and technical consulting activities",
    "71129": "Other engineering activities",
    # Creative and other (Divisions 73 / 74)
    "73110": "Advertising agencies",
    "74100": "Specialised design activities",
    "74201": "Portrait photographic activities",
}

NICHE_CONFIG = NicheConfig(
    site_key="contractors-ir35",
    slug="uk-contractor-index",
    snapshot_path=os.path.join(ROOT, "contractors-ir35", "web", "src", "data", "uk-contractor-index.json"),
    sic_labels=SIC_LABELS,
    segments=(
        Segment(
            key="it_consultancy",
            label="Information technology consultancy",
            sic_codes=("62020",),
            is_primary=True,
            division="it",
        ),
        Segment(
            key="it_software",
            label="IT and software",
            sic_codes=("62011", "62012", "62020", "62090"),
            division="it",
        ),
        Segment(
            key="consultancy",
            label="Management consultancy",
            sic_codes=("70210", "70221", "70229"),
            division="consultancy",
        ),
        Segment(
            key="engineering",
            label="Engineering and technical",
            sic_codes=("71121", "71122", "71129"),
            division="engineering",
        ),
        Segment(
            key="creative",
            label="Creative and other",
            sic_codes=("73110", "74100", "74201"),
            division="creative",
        ),
    ),
    provisional_months=2,
    thin_segment_min_ttm=120,
    notes=(
        "Incorporation counts are gross: they come from the Companies House Advanced Search "
        "API, which counts companies by incorporation date across all company statuses, so "
        "companies that have since been dissolved are still included in the year they were "
        "formed. The series therefore carries no survivorship bias. Union is the deduplicated count across all "
        f"{len(SIC_LABELS)} contractor SIC codes -- a company registering multiple SIC codes "
        "from the set is counted once. The most recent 2 months are provisional (Companies "
        "House indexing lag) and are excluded from headline figures and decade comparisons. "
        "The index is a proxy for personal service company (PSC) formation, not a direct "
        "count of contractors."
    ),
    supabase_table="contractor_incorporations",
    headline_prefix="it_consultancy",
    union_ttm_key="all_contractor_cos_ttm",
    division_labels={
        "it": "IT and software",
        "consultancy": "Management consultancy",
        "engineering": "Engineering and technical",
        "creative": "Creative and other",
    },
)
