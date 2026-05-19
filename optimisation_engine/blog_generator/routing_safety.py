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
    "agency": "Digital Agency",
    "generalist": "generalist",
}

# site_key -> required Supabase table prefix
EXPECTED_TABLE_PREFIXES: dict[str, str] = {
    "dentists": "blog_topics_dentists",
    "property": "blog_topics_property",
    "medical": "blog_topics_medical",
    "solicitors": "blog_topics_solicitors",
    "agency": "blog_topics_agency",
    "generalist": "blog_topics_generalist",
}


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
    """Confirm the Supabase table name is the expected one for this site."""
    if site_key not in EXPECTED_TABLE_PREFIXES:
        raise SiteRoutingError(f"Unknown site_key: {site_key!r}")
    expected = EXPECTED_TABLE_PREFIXES[site_key]
    if table_name != expected:
        raise SiteRoutingError(
            f"Refusing to use table {table_name!r} for site={site_key!r}. "
            f"Expected {expected!r}."
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
    expected_table = EXPECTED_TABLE_PREFIXES[site_key]
    if table != expected_table:
        raise SiteRoutingError(
            f"site={site_key!r}: topic_table={table!r} must be {expected_table!r}"
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
