"""Guard: every site with a GSC property must be writable to gsc_page_performance.

The niche CHECK constraint drifted behind the sites registry once already, and the
failure mode is silent (a rejected write printed "upserted 0 rows"), so this asserts
the two stay in step. Run directly:

    python optimisation_engine/clients/test_gsc_page_niche_coverage.py
"""
from __future__ import annotations

import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

sys.path.insert(0, os.path.join(ROOT, "scripts", "Database"))
from apply_migration import run_sql  # noqa: E402

from optimisation_engine.config import get_sites  # noqa: E402


def allowed_niches() -> set[str]:
    rows = run_sql(
        "select pg_get_constraintdef(oid) as def from pg_constraint "
        "where conname = 'gsc_page_performance_niche_check';"
    )
    assert rows, "gsc_page_performance_niche_check not found"
    return set(re.findall(r"'([^']+)'::text", rows[0]["def"]))


def test_every_gsc_site_is_allowed() -> None:
    allowed = allowed_niches()
    expected = {
        s["site_key"] for s in get_sites(active_only=False) if s.get("gsc_property_url")
    }
    missing = sorted(expected - allowed)
    assert not missing, (
        f"{len(missing)} site(s) have a GSC property but are rejected by "
        f"gsc_page_performance_niche_check: {missing}. Widen the constraint "
        f"(see supabase/migrations/20260803000001_widen_gsc_page_performance_niche.sql)."
    )
    print(f"OK: all {len(expected)} GSC sites accepted ({len(allowed)} allowed in constraint)")


if __name__ == "__main__":
    test_every_gsc_site_is_allowed()
