"""
Optimisation engine configuration.

Loads:
  * Supabase creds (root .env)
  * DataForSEO creds (root .env)
  * The sites registry from public.sites (single source of truth)
  * Per-run budget ceilings for the DataForSEO trial

The brief mandates strict cost discipline:
  - Total DataForSEO ceiling: $1.00 (hard stop at $0.85 to leave headroom).
  - Per-site allocations rotate week to week so all four niches get the deeper
    pull eventually within the same monthly budget.
"""
from __future__ import annotations

import os
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]

# Load .env from project root
try:
    from dotenv import load_dotenv

    load_dotenv(ROOT / ".env")
except ImportError:
    pass

SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
DATAFORSEO_LOGIN: str = os.getenv("DATAFORSEO_API_LOGIN", "")
DATAFORSEO_PASSWORD: str = os.getenv("DATAFORSEO_API_PASSWORD", "")
ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError(
        "SUPABASE_URL / SUPABASE_KEY must be set in .env at the project root."
    )

# ---------------------------------------------------------------------------
# DataForSEO budget
# ---------------------------------------------------------------------------

# Hard stops. The cost tracker refuses to make a paid call that would push the
# running total over DATAFORSEO_ABORT_AT.
DATAFORSEO_CEILING_USD: float = 1.00
DATAFORSEO_ABORT_AT: float = 0.85

# Per-site allocations for the first run (priority order from the brief).
# These are SOFT ceilings used by the planner; the abort-at value above is the
# hard stop applied across all calls.
DATAFORSEO_SITE_BUDGETS: dict[str, float] = {
    "agency":     0.50,
    "property":   0.20,
    "dentists":   0.15,
    "generalist": 0.10,
}

# DataForSEO API endpoint costs (USD). Sourced from the public pricing page;
# call get_account_balance() to validate against actual account state before
# committing to spend.
DATAFORSEO_COSTS: dict[str, dict[str, Any]] = {
    # endpoint -> {base: USD per task, per_row: USD per row, notes: str}
    "keyword_suggestions/live": {"base": 0.01, "per_row": 0.0001},
    "related_keywords/live":    {"base": 0.01, "per_row": 0.0001},
    "keyword_ideas/live":       {"base": 0.01, "per_row": 0.0001},
    "bulk_keyword_difficulty/live": {"base": 0.01, "per_row": 0.0},  # flat per task up to 1000 kw
    "competitors_domain/live":  {"base": 0.05, "per_row": 0.0},
    "ranked_keywords/live":     {"base": 0.01, "per_row": 0.0001},
    "domain_intersection/live": {"base": 0.05, "per_row": 0.0},
    # Free endpoints (used for credential check + balance read)
    "appendix/user_data":       {"base": 0.0,  "per_row": 0.0},
}

DATAFORSEO_BASE_URL = "https://api.dataforseo.com/v3"

# Default location/language for UK accounting niche
DATAFORSEO_LOCATION_CODE_UK = 2826  # United Kingdom
DATAFORSEO_LANGUAGE_CODE_EN = "en"


# ---------------------------------------------------------------------------
# Sites
# ---------------------------------------------------------------------------

import httpx


def get_sites(active_only: bool = True) -> list[dict]:
    """Read the sites registry from Supabase."""
    url = f"{SUPABASE_URL}/rest/v1/sites"
    headers = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    params: dict[str, str] = {"select": "*", "order": "site_key.asc"}
    if active_only:
        params["active"] = "eq.true"
    r = httpx.get(url, headers=headers, params=params, timeout=15.0)
    r.raise_for_status()
    return r.json()


def get_site(site_key: str) -> dict:
    """Read a single site row from Supabase. Raises if missing."""
    url = f"{SUPABASE_URL}/rest/v1/sites"
    headers = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    r = httpx.get(
        url,
        headers=headers,
        params={"select": "*", "site_key": f"eq.{site_key}"},
        timeout=15.0,
    )
    r.raise_for_status()
    rows = r.json()
    if not rows:
        raise ValueError(f"Unknown site_key: {site_key}")
    return rows[0]


# Sites in priority order from the brief
PRIORITY_ORDER = ["agency", "property", "dentists", "generalist"]
