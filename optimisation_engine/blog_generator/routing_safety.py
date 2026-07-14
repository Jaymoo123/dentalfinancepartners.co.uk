"""
Site-routing safety: three-layer zero-crossover guard.

Every operation that touches a site-specific resource (filesystem path,
Supabase table) goes through one of these helpers. The helpers refuse to
operate if the resource doesn't belong to the declared site_key.

If we are generating for "dentists", the output MUST land in Dentists/web/...
If we are generating for "agency", the output MUST land in Digital Agency/web/...
There is no scenario in which a site_key writes outside its own directory.
"""
from __future__ import annotations

import os
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]


class SiteRoutingError(RuntimeError):
    """Raised when an operation would cross site boundaries."""


# site_key -> path prefix that all writes for that site MUST start with
EXPECTED_SITE_PREFIXES: dict[str, str] = {
    "dentists": "Dentists",
    "property": "Property",
    "medical": "Medical",
    "solicitors": "Solicitors",
    "agency": "digital-agency",
    "generalist": "generalist",
    "crypto": "crypto",
    "care": "care",
    "hospitality": "hospitality",
    "charities": "charities",
    "contractors-ir35": "contractors-ir35",
    "construction-cis": "construction-cis",
}

# Post Phase 4 (2026-05-20): all sites share a single `blog_topics` table.
# Row-level isolation is via the `site_key` column. The table-level check
# only verifies the consolidated name.
UNIFIED_TOPICS_TABLE = "blog_topics"

KNOWN_SITES: set[str] = set(EXPECTED_SITE_PREFIXES.keys())


def assert_output_path_belongs_to_site(path: Path, site_key: str) -> None:
    """Resolve `path` to an absolute path and confirm it sits under the
    declared site's content tree. Raise SiteRoutingError on mismatch.

    This is the final-line-of-defence check before any file is written.
    """
    if site_key not in EXPECTED_SITE_PREFIXES:
        raise SiteRoutingError(f"Unknown site_key: {site_key!r}")

    abs_path = path.resolve()
    expected_root = (ROOT / EXPECTED_SITE_PREFIXES[site_key]).resolve()
    # str+sep guards against e.g. "/repo/Dentists2" matching "/repo/Dentists"
    if not (str(abs_path) == str(expected_root) or str(abs_path).startswith(str(expected_root) + os.sep)):
        raise SiteRoutingError(
            f"Refusing to write {abs_path} for site={site_key!r}. "
            f"Expected path under {expected_root}."
        )


def assert_table_belongs_to_site(table_name: str, site_key: str) -> None:
    """Confirm the Supabase table name matches the unified topics table.

    Post Phase 4: all sites read+write `blog_topics`; row-level isolation is
    via the `site_key` column (callers must add `?site_key=eq.<site>` filters
    on every query — enforced in topic_repository.py).
    """
    if site_key not in KNOWN_SITES:
        raise SiteRoutingError(f"Unknown site_key: {site_key!r}")
    if table_name != UNIFIED_TOPICS_TABLE:
        raise SiteRoutingError(
            f"Refusing to use table {table_name!r} for site={site_key!r}. "
            f"Expected {UNIFIED_TOPICS_TABLE!r}."
        )


def assert_site_config_consistent(config: dict, site_key: str) -> None:
    """Sanity-check a SITE_CONFIG dict at import time.

    Verifies that the config's site_key, output_dir, and topic_table all
    agree with the EXPECTED_* maps above. This is the first-line-of-defence
    check: misconfigurations get caught at module load, not at runtime.
    """
    if config.get("site_key") != site_key:
        raise SiteRoutingError(
            f"site_config['site_key']={config.get('site_key')!r} does not match "
            f"the registered site_key={site_key!r}"
        )
    expected_prefix = EXPECTED_SITE_PREFIXES[site_key]
    output_dir = config.get("output_dir", "")
    if not output_dir.startswith(expected_prefix + "/") and output_dir != expected_prefix:
        raise SiteRoutingError(
            f"site={site_key!r}: output_dir={output_dir!r} must start with "
            f"{expected_prefix!r} prefix"
        )
    pillar_dir = config.get("pillar_output_dir")
    if pillar_dir and not pillar_dir.startswith(expected_prefix + "/"):
        raise SiteRoutingError(
            f"site={site_key!r}: pillar_output_dir={pillar_dir!r} must start with "
            f"{expected_prefix!r} prefix"
        )
    table = config.get("topic_table", "")
    if table != UNIFIED_TOPICS_TABLE:
        raise SiteRoutingError(
            f"site={site_key!r}: topic_table={table!r} must be {UNIFIED_TOPICS_TABLE!r}"
        )


def resolve_output_path(site_key: str, output_dir_rel: str, slug: str) -> Path:
    """Resolve {ROOT}/{output_dir_rel}/{slug}.md and verify it stays in-site.

    This is the only place in the generator that builds an output path.
    All write operations go through here.
    """
    if not slug or not re.match(r"^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$", slug):
        raise SiteRoutingError(f"Invalid slug for output path: {slug!r}")
    candidate = ROOT / output_dir_rel / f"{slug}.md"
    assert_output_path_belongs_to_site(candidate, site_key)
    return candidate
