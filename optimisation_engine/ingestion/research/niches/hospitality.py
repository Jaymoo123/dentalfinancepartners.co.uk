"""Hospitality Company Formation Index niche config.

SIC cluster: Division 55 (Accommodation) and Division 56 (Food and beverage
service activities) -- the 5-digit codes covering restaurants, cafes,
takeaways, event/contract catering, pubs, bars, licensed clubs, hotels and
other accommodation. Segment definitions mirror the sub-trade buckets already
published in hospitality/web/src/data/uk-hospitality-openings-closures-index.json
(a hand-built one-off asset); this config lets the same cluster be refreshed
through the shared, config-driven ingestion engine going forward.

Output snapshot is written to a DISTINCT path/slug (uk-hospitality-formation-index)
rather than overwriting the existing hand-built openings-closures index, so the
live, already-wired research page is not disturbed by this config's schema
(monthly/annual + division rollups) which differs from the existing page's
quarterly/sub_trade shape.
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
    # Division 55: Accommodation
    "55100": "Hotels and similar accommodation",
    "55201": "Holiday and other short-stay accommodation",
    "55209": "Other holiday and other collective accommodation",
    "55300": "Camping grounds, recreational vehicle parks and trailer parks",
    "55900": "Other accommodation",
    # Division 56: Food and beverage service activities
    "56101": "Licensed restaurants",
    "56102": "Unlicensed restaurants and cafes",
    "56103": "Take-away food shops and mobile food stands",
    "56210": "Event catering activities",
    "56290": "Other food services",
    "56301": "Licensed clubs",
    "56302": "Public houses and bars",
}

NICHE_CONFIG = NicheConfig(
    site_key="hospitality",
    slug="uk-hospitality-formation-index",
    snapshot_path=os.path.join(ROOT, "hospitality", "web", "src", "data", "uk-hospitality-formation-index.json"),
    sic_labels=SIC_LABELS,
    segments=(
        Segment(
            key="restaurants_cafes",
            label="Restaurants and cafes",
            sic_codes=("56101", "56102", "56103"),
            is_primary=True,
            division="56",
        ),
        # Division rollups (macro view)
        Segment(
            key="div55",
            label="Accommodation (Division 55)",
            sic_codes=("55100", "55201", "55209", "55300", "55900"),
            division="55",
        ),
        Segment(
            key="div56",
            label="Food and beverage service activities (Division 56)",
            sic_codes=("56101", "56102", "56103", "56210", "56290", "56301", "56302"),
            division="56",
        ),
        # Trade-level segments
        Segment(key="takeaways", label="Takeaway food shops and mobile stands", sic_codes=("56103",), division="56"),
        Segment(key="pubs_bars_clubs", label="Pubs, bars and licensed clubs", sic_codes=("56301", "56302"), division="56"),
        Segment(key="hotels", label="Hotels and similar accommodation", sic_codes=("55100",), division="55"),
        Segment(key="event_catering", label="Event catering", sic_codes=("56210",), division="56"),
        Segment(key="other_food_service", label="Other food services (contract/canteen)", sic_codes=("56290",), division="56"),
        Segment(
            key="other_accommodation",
            label="Other accommodation (holiday, camping, other)",
            sic_codes=("55201", "55209", "55300", "55900"),
            division="55",
        ),
    ),
    secondary_sources=(),
    attribution="UK Hospitality Formation Index data compiled from Companies House public records (Open Government Licence v3.0). Free to cite with attribution to Hospitality Tax.",
    provisional_months=2,
    thin_segment_min_ttm=60,
    notes=(
        "Incorporation counts are gross (dissolved companies remain on the register; "
        "no survivorship bias). Union is the deduplicated count across all 12 hospitality "
        "SIC codes (Division 55 accommodation and Division 56 food and beverage service) "
        "-- a company registering multiple SIC codes from the set is counted once. The most "
        "recent 2 months are provisional (Companies House indexing lag) and are excluded "
        "from headline figures and decade comparisons."
    ),
    supabase_table="",
    headline_prefix="hospitality",
    union_ttm_key="hospitality_cos_ttm",
    division_labels={
        "55": "Accommodation (Division 55)",
        "56": "Food and beverage service activities (Division 56)",
    },
)
