"""Config-only dataclasses for the research ingestion engine. No logic here."""
from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class SourceRef:
    name: str
    publisher: str
    url: str
    licence: str = "Open Government Licence v3.0"
    attribution: str = ""


@dataclass(frozen=True)
class Segment:
    key: str
    label: str
    sic_codes: tuple[str, ...]
    is_primary: bool = False
    division: str | None = None  # optional grouping axis (e.g. "41", "42", "43")


@dataclass(frozen=True)
class SecondarySource:
    key: str
    label: str
    fetcher: str  # dotted module path to a fetch function
    provenance: SourceRef
    optional: bool = True


@dataclass(frozen=True)
class NicheConfig:
    site_key: str
    slug: str                              # used in snapshot filename
    snapshot_path: str                     # absolute or repo-relative output path
    sic_labels: dict[str, str]             # full SIC code -> label map
    segments: tuple[Segment, ...]          # ordered; first is_primary drives headline
    secondary_sources: tuple[SecondarySource, ...] = field(default_factory=tuple)
    provisional_months: int = 2
    thin_segment_min_ttm: int = 120        # trailing-12m below this -> thin flag
    notes: str = ""
    supabase_table: str = ""               # target upsert table (blank = none)
    division_labels: dict[str, str] = field(default_factory=dict)
    # headline key names: "{prefix}_cos_settled", "{prefix}_cos_yoy_pct" etc.
    # Default "primary"; property uses "landlord" to stay backward-compatible.
    headline_prefix: str = "primary"
    # Label for the union TTM key: "all_{union_label}_cos_ttm"
    # Default "all"; property uses "all_property".
    union_ttm_key: str = "all_cos_ttm"
    # Top-level attribution string emitted in meta.attribution (blank = omit).
    attribution: str = ""
    # Secondary source keys to hoist to top-level snapshot keys.
    # e.g. {"land_registry": "house_prices"} -> snap["house_prices"] = secondary["land_registry"]
    hoist_secondary_to_top: dict[str, str] = field(default_factory=dict)
