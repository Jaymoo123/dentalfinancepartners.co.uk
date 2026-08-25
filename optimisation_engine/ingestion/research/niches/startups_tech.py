"""UK Tech Formations Index niche config.

Tech-startup SIC cluster (per docs/_engines/scout_batch2/startups-tech.md):
62012 (business/domestic software development) is the spine code, the single
largest formation cohort in the cluster. Distinct, narrower cut than the
existing bespoke startup-formation-survival-index.json (which uses an 8-code
cluster incl. 62011/63120/58210): this engine-based index is the monthly
formation-velocity / seasonality companion asset, not a duplicate.
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
    "62012": "Business and domestic software development",
    "62020": "Information technology consultancy activities",
    "62090": "Other information technology service activities",
    "63110": "Data processing, hosting and related activities",
    "58290": "Other software publishing",
}

NICHE_CONFIG = NicheConfig(
    site_key="startups-tech",
    slug="uk-tech-formations-index",
    snapshot_path=os.path.join(ROOT, "startups-tech", "web", "src", "data", "uk-tech-formations-index.json"),
    sic_labels=SIC_LABELS,
    segments=(
        Segment(
            key="software_development",
            label="Business and domestic software development",
            sic_codes=("62012",),
            is_primary=True,
        ),
        Segment(key="it_consultancy", label="IT consultancy activities", sic_codes=("62020",)),
        Segment(key="other_it_services", label="Other IT service activities", sic_codes=("62090",)),
        Segment(key="data_processing", label="Data processing and hosting", sic_codes=("63110",)),
        Segment(key="software_publishing", label="Other software publishing", sic_codes=("58290",)),
    ),
    provisional_months=2,
    thin_segment_min_ttm=120,
    notes=(
        "Incorporation counts are gross (dissolved companies remain on the register; "
        "no survivorship bias). Union is the deduplicated count across the 5 tech SIC "
        "codes 62012/62020/62090/63110/58290 -- a company registering multiple codes "
        "from the set is counted once. The most recent 2 months are provisional "
        "(Companies House indexing lag) and are excluded from headline figures and "
        "decade comparisons. This is a narrower, monthly-granularity companion to the "
        "site's existing startup-formation-survival-index (8-code cluster, "
        "annual/quarterly grain, active/dissolved snapshot): this index tracks "
        "formation velocity and seasonality, not survival status."
    ),
    supabase_table="",
    headline_prefix="software_development",
    union_ttm_key="all_tech_cos_ttm",
    attribution=(
        "UK Tech Formations Index data compiled from Companies House public records "
        "(Open Government Licence v3.0). Free to cite with attribution to Founder Tax Partners."
    ),
)
