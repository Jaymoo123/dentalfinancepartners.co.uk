"""Construction CIS niche config.

SIC sets lifted verbatim from ingest_construction_data.py.
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
    # Division 41
    "41100": "Development of building projects",
    "41201": "Construction of commercial buildings",
    "41202": "Construction of domestic buildings",
    # Division 42
    "42110": "Construction of roads and motorways",
    "42120": "Construction of railways and underground railways",
    "42130": "Construction of bridges and tunnels",
    "42910": "Construction of water projects",
    "42990": "Construction of other civil engineering projects n.e.c.",
    # Division 43
    "43110": "Demolition",
    "43120": "Site preparation",
    "43210": "Electrical installation",
    "43220": "Plumbing, heat and air-conditioning installation",
    "43290": "Other installation activities",
    "43310": "Plastering",
    "43320": "Joinery installation",
    "43330": "Floor and wall covering",
    "43341": "Painting",
    "43390": "Other building completion and finishing",
    "43999": "Other specialised construction activities n.e.c.",
}

NICHE_CONFIG = NicheConfig(
    site_key="construction-cis",
    slug="uk-construction-index",
    snapshot_path=os.path.join(ROOT, "construction-cis", "web", "src", "data", "uk-construction-index.json"),
    sic_labels=SIC_LABELS,
    segments=(
        Segment(
            key="domestic_buildings",
            label="Construction of domestic buildings",
            sic_codes=("41202",),
            is_primary=True,
            division="41",
        ),
        # Division rollups (macro view, consumed by annual_by_division on the page)
        Segment(
            key="div41",
            label="Building construction (Division 41)",
            sic_codes=("41100", "41201", "41202"),
            division="41",
        ),
        Segment(
            key="div42",
            label="Civil engineering (Division 42)",
            sic_codes=("42110", "42120", "42130", "42910", "42990"),
            division="42",
        ),
        Segment(
            key="div43",
            label="Specialised construction activities (Division 43)",
            sic_codes=("43110", "43120", "43210", "43220", "43290", "43310", "43320", "43330", "43341", "43390", "43999"),
            division="43",
        ),
        # Trade-level segments (CIS subcontractor trades, each a single SIC subset
        # of the existing 19-code universe -- union is unchanged, no published
        # figure is revised). Roofing (SIC 43910) is deliberately NOT added here:
        # it sits outside the current universe and adding it would retroactively
        # revise the published all-construction union. Reserved for a documented
        # v2 methodology bump.
        Segment(key="electricians", label="Electricians", sic_codes=("43210",), division="43"),
        Segment(key="plumbers", label="Plumbers and heating engineers", sic_codes=("43220",), division="43"),
        Segment(key="painters", label="Painters and decorators", sic_codes=("43341",), division="43"),
        Segment(key="joiners", label="Joiners and carpenters", sic_codes=("43320",), division="43"),
        Segment(key="plasterers", label="Plasterers", sic_codes=("43310",), division="43"),
        Segment(key="flooring", label="Flooring and wall tiling", sic_codes=("43330",), division="43"),
        Segment(key="groundworks", label="Groundworks and site preparation", sic_codes=("43120",), division="43"),
        Segment(key="demolition", label="Demolition", sic_codes=("43110",), division="43"),
    ),
    secondary_sources=(
        SecondarySource(
            key="ons_construction",
            label="ONS Construction Output (deferred v2)",
            fetcher="optimisation_engine.ingestion.research.fetchers.ons_construction.fetch",
            provenance=SourceRef(
                name="Construction Output in Great Britain (CGBR)",
                publisher="Office for National Statistics",
                url="https://www.ons.gov.uk/businessindustryandtrade/constructionindustry/datasets/outputintheconstructionindustry",
                licence="Open Government Licence v3.0",
            ),
            optional=True,
        ),
    ),
    attribution="UK Construction Index data compiled from Companies House public records (Open Government Licence v3.0). Free to cite with attribution to Trade Tax Specialists.",
    hoist_secondary_to_top={"ons_construction": "construction_output"},
    provisional_months=2,
    thin_segment_min_ttm=120,
    notes=(
        "Incorporation counts are gross (dissolved companies remain on the register; "
        "no survivorship bias). Union is the deduplicated count across all 19 "
        "construction SIC codes -- a company registering multiple SIC codes from the "
        "set is counted once. The most recent 2 months are provisional (Companies House "
        "indexing lag) and are excluded from headline figures and decade comparisons."
    ),
    supabase_table="construction_incorporations",
    headline_prefix="domestic_building",
    union_ttm_key="all_construction_cos_ttm",
    division_labels={
        "41": "Building construction (Division 41)",
        "42": "Civil engineering (Division 42)",
        "43": "Specialised construction activities (Division 43)",
    },
)
