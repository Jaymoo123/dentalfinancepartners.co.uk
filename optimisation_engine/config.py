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
    "keywords_for_site/live":   {"base": 0.01, "per_row": 0.0001},
    "bulk_keyword_difficulty/live": {"base": 0.01, "per_row": 0.0},  # flat per task up to 1000 kw
    "competitors_domain/live":  {"base": 0.05, "per_row": 0.0},
    "ranked_keywords/live":     {"base": 0.01, "per_row": 0.0001},
    "domain_intersection/live": {"base": 0.05, "per_row": 0.0},
    # Google Ads keyword data (NOT Labs): flat per task, up to 1000 keywords.
    # Verified 2026-07-11 probe: $0.075 base + $0.0015 per keyword (10 kw cost $0.09).
    "keywords_data/google_ads/search_volume/live": {"base": 0.075, "per_row": 0.0015},
    # Free endpoints (used for credential check + balance read)
    "appendix/user_data":       {"base": 0.0,  "per_row": 0.0},
}

DATAFORSEO_BASE_URL = "https://api.dataforseo.com/v3"

# Default location/language for UK accounting niche
DATAFORSEO_LOCATION_CODE_UK = 2826  # United Kingdom
DATAFORSEO_LANGUAGE_CODE_EN = "en"


# ---------------------------------------------------------------------------
# SE Ranking (7-day trial — credit-metered, LOCAL-ONLY ledger)
# ---------------------------------------------------------------------------
# Unlike DataForSEO (USD-metered, Supabase cost log), the SE Ranking trial work
# is local-only: no Supabase. The client keeps a JSON credit ledger + idempotency
# cache on disk under briefs/property/seranking/. Add the current trial's key to
# the root .env as:  SERANKING_API_TOKEN=<key>   (the May token is dead — 403).
SERANKING_API_TOKEN: str = os.getenv("SERANKING_API_TOKEN", "")
SERANKING_BASE_URL: str = os.getenv("SERANKING_BASE_URL", "https://api.seranking.com")
SERANKING_SYSTEM_UK: str = os.getenv("SERANKING_SYSTEM_UK", "uk")  # regional db / system code

# Hard credit ceiling for the whole trial. A call whose estimate would push
# cumulative ledger spend over this is refused. The Day-0 gate reads the real
# trial allowance from the balance endpoint and we tighten this to match.
SERANKING_CREDIT_CEILING: int = int(os.getenv("SERANKING_CREDIT_CEILING", "20000"))

# Per-endpoint credit cost: base = per-request credits, per_row = per record.
# From the public pricing page; the Day-0 gate confirms the real numbers from
# live response headers/body before any bulk spend. Keyed by short endpoint name
# (same .get() + endswith fallback that DataForSEO's _estimate_cost uses).
SERANKING_COSTS: dict[str, dict[str, Any]] = {
    "domain/keywords":      {"base": 100, "per_row": 0},   # flat per request
    "domain/competitors":   {"base": 100, "per_row": 0},
    "domain/overview":      {"base": 100, "per_row": 0},
    "keywords/export":      {"base": 0,   "per_row": 10},
    "keywords/related":     {"base": 0,   "per_row": 10},
    "keywords/similar":     {"base": 0,   "per_row": 10},
    "keywords/questions":   {"base": 0,   "per_row": 10},
    "keywords/longtail":    {"base": 0,   "per_row": 1},
    "backlinks/summary":    {"base": 0,   "per_row": 100},
    "backlinks/all":        {"base": 0,   "per_row": 1},
    "backlinks/refdomains": {"base": 0,   "per_row": 1},
    "ai/overview":          {"base": 0,   "per_row": 0},    # confirm at gate
    "account/balance":      {"base": 0,   "per_row": 0},    # free
}


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

# ---------------------------------------------------------------------------
# Model IDs (single source of truth — update here when a model is promoted)
# ---------------------------------------------------------------------------
SONNET_MODEL = "claude-sonnet-4-6"
HAIKU_MODEL = "claude-haiku-4-5-20251001"
