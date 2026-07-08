"""
Agency lead attribution wrapper
================================
Adapted from scripts/medical/lead_attribution.py for agency site.

Key differences from medical:
- source='agency' throughout
- NO GA4 (ga4_page_data empty; niche.config GA4 id empty)
- First-party analytics: web_sessions (site_key='agency') + web_events (site_key='agency')
- GSC and Bing query enrichment still available (gsc_query_data / bing_query_data with site_key='agency')
- dark_ai_lens queries vw_probable_ai_direct for site_key='agency'
- Handles 0-lead case gracefully (writes artifact with empty leads + note, exits 0)

Usage:
    python scripts/agency/lead_attribution.py

Output: .cache/agency_diag/lead_attribution_smoke.json  (smoke run)
        .cache/agency_diag/lead_attribution.json        (full run, same file)
"""

from __future__ import annotations

import json
import os
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

import httpx
from dotenv import load_dotenv

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
load_dotenv()

PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
API_URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"

HERE = Path(__file__).parent
SQL_FILE = HERE / "40_lead_attribution.sql"
REPO_ROOT = HERE.parent.parent
CACHE_DIR = REPO_ROOT / ".cache" / "agency_diag"
OUT_FILE = CACHE_DIR / "lead_attribution_smoke.json"

_MACRO = {
    "chatgpt": "ai",
    "perplexity": "ai",
    "copilot": "ai",
    "claude": "ai",
    "gemini": "ai",
    "ai_other": "ai",
    "bing_family": "search",
    "google": "search",
    "direct": "direct",
    "social": "social",
    "referral": "referral",
}


# ---------------------------------------------------------------------------
# Supabase helper (verbatim from medical)
# ---------------------------------------------------------------------------

def run_sql(query: str) -> list[dict]:
    r = httpx.post(
        API_URL,
        headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
        json={"query": query},
        timeout=120,
    )
    if r.status_code not in (200, 201):
        print(f"SQL ERROR {r.status_code}: {r.text[:800]}", file=sys.stderr)
        sys.exit(1)
    return r.json()


# ---------------------------------------------------------------------------
# Query enrichment helpers (verbatim from medical)
# ---------------------------------------------------------------------------

def _path_of(url: str) -> str:
    parsed = urlparse(url)
    path = parsed.path.rstrip("/") or "/"
    return path


def build_query_index(rows: list[dict]) -> dict[str, list[dict]]:
    impr: dict[tuple[str, str], int] = defaultdict(int)
    for row in rows:
        path = _path_of(row["page_url"])
        impr[(path, row["query"])] += row.get("impressions") or 0
    by_path: dict[str, list[dict]] = defaultdict(list)
    for (path, query), total in impr.items():
        by_path[path].append({"query": query, "impressions": total})
    for path in by_path:
        by_path[path].sort(key=lambda x: x["impressions"], reverse=True)
    return dict(by_path)


def top3(query_index: dict, landing: str) -> list[dict]:
    return query_index.get(landing, [])[:3]


# ---------------------------------------------------------------------------
# Rollup helpers (verbatim from medical)
# ---------------------------------------------------------------------------

def _ym(ts: str) -> str:
    return ts[:7]


def build_rollups(leads: list[dict]) -> dict:
    n_total = len(leads)
    n_attributed = sum(
        1 for l in leads if l["attribution_level"] in ("session", "first_touch")
    )
    by_channel: dict[str, int] = defaultdict(int)
    by_channel_macro: dict[str, int] = defaultdict(int)
    by_landing: dict[str, int] = defaultdict(int)
    by_entry_page: dict[str, int] = defaultdict(int)
    by_submit_page: dict[str, int] = defaultdict(int)
    monthly: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    n_entry_differs_from_submit = 0
    n_entry_known = 0

    for lead in leads:
        ch = lead["channel"] or "direct"
        macro = _MACRO.get(ch, "referral")
        landing = lead["landing"] or "(unknown)"
        entry = lead.get("entry_page")
        submit = lead.get("submit_page")
        ym = _ym(str(lead["created_at"]))
        by_channel[ch] += 1
        by_channel_macro[macro] += 1
        by_landing[landing] += 1
        by_entry_page[entry or "(no session)"] += 1
        by_submit_page[submit or "(no source_url)"] += 1
        monthly[ym][ch] += 1
        if entry:
            n_entry_known += 1
            if submit and entry != submit:
                n_entry_differs_from_submit += 1

    return {
        "attributed_fraction": {
            "n_attributed": n_attributed,
            "n_total": n_total,
            "fraction": round(n_attributed / n_total, 3) if n_total else None,
        },
        "by_channel_granular": dict(sorted(by_channel.items(), key=lambda x: -x[1])),
        "by_channel_macro": dict(sorted(by_channel_macro.items(), key=lambda x: -x[1])),
        "by_landing": dict(sorted(by_landing.items(), key=lambda x: -x[1])),
        "by_entry_page": dict(sorted(by_entry_page.items(), key=lambda x: -x[1])),
        "by_submit_page": dict(sorted(by_submit_page.items(), key=lambda x: -x[1])),
        "entry_vs_submit": {
            "n_entry_known": n_entry_known,
            "n_entry_differs_from_submit": n_entry_differs_from_submit,
        },
        "monthly_trend": {
            ym: dict(sorted(ch_counts.items(), key=lambda x: -x[1]))
            for ym, ch_counts in sorted(monthly.items())
        },
    }


# ---------------------------------------------------------------------------
# Dark-AI lens (agency variant)
# ---------------------------------------------------------------------------

def fetch_dark_ai_lens() -> dict:
    sql = """
SELECT
  COUNT(*)                                          AS flagged_sessions,
  COUNT(lead_id)                                    AS flagged_with_lead,
  MAX(bing_snap_date::text)                         AS latest_snap_date,
  ROUND(AVG(bing_impression_uplift_pct)::numeric,1) AS avg_uplift_pct
FROM public.vw_probable_ai_direct
WHERE site_key = 'agency';
"""
    try:
        rows = run_sql(sql)
        if not rows:
            return {"status": "empty", "note": "No rows from vw_probable_ai_direct for agency."}
        r = rows[0]
        flagged = r.get("flagged_sessions") or 0
        if flagged == 0:
            return {
                "status": "empty",
                "note": "vw_probable_ai_direct returned 0 flagged sessions for agency (likely < 2 Bing snapshots).",
            }
        return {
            "status": "has_rows",
            "flagged_sessions": int(flagged),
            "flagged_with_lead": int(r.get("flagged_with_lead") or 0),
            "latest_snap_date": r.get("latest_snap_date"),
            "avg_impression_uplift_pct": float(r.get("avg_uplift_pct") or 0),
            "note": "HEURISTIC only - Bing impression spike >=20% within 14d before direct session.",
        }
    except Exception as exc:
        return {"status": "error", "note": f"vw_probable_ai_direct query failed: {exc!s}"}


# ---------------------------------------------------------------------------
# First-party analytics summary (agency-specific, replaces GA4)
# ---------------------------------------------------------------------------

def fetch_firstparty_summary() -> dict:
    """Summarise web_sessions + web_events for agency (no GA4 available)."""
    session_summary = run_sql(
        "SELECT COUNT(*) AS total_sessions, "
        "COUNT(CASE WHEN is_bot = false THEN 1 END) AS human_sessions, "
        "COUNT(DISTINCT visitor_id) AS unique_visitors "
        "FROM public.web_sessions WHERE site_key = 'agency';"
    )
    event_summary = run_sql(
        "SELECT event_name, COUNT(*) AS n "
        "FROM public.web_events WHERE site_key = 'agency' "
        "GROUP BY event_name ORDER BY n DESC LIMIT 10;"
    )
    s = session_summary[0] if session_summary else {}
    return {
        "total_sessions": int(s.get("total_sessions") or 0),
        "human_sessions": int(s.get("human_sessions") or 0),
        "unique_visitors": int(s.get("unique_visitors") or 0),
        "top_events": event_summary,
        "note": "Agency has no GA4; these are first-party web_sessions/web_events rows (site_key='agency').",
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

    CACHE_DIR.mkdir(parents=True, exist_ok=True)

    # 1. Core attribution SQL
    print("Running core attribution SQL ...", flush=True)
    sql = SQL_FILE.read_text(encoding="utf-8")
    leads = run_sql(sql)
    print(f"  -> {len(leads)} agency lead rows returned", flush=True)

    # ponytail: 0-lead case — write artifact with note rather than aborting,
    # so the battery runner gets a clean JSON file and knows this is expected.
    if not leads:
        print("  NOTE: 0 agency leads in DB — writing empty artifact (not an error).", flush=True)
        firstparty = fetch_firstparty_summary()
        dark_ai = fetch_dark_ai_lens()
        out = {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "site": "agency",
            "sql_source": "scripts/agency/40_lead_attribution.sql",
            "analytics_source": "first-party (web_sessions/web_events, site_key='agency') — NO GA4",
            "total_leads": 0,
            "leads": [],
            "rollups": None,
            "query_enrichment": {},
            "dark_ai_lens": dark_ai,
            "firstparty_summary": firstparty,
            "schema_notes": [
                "Agency uses source='agency' in the leads table.",
                "No GA4 property configured for agency.",
                "Session data: web_sessions WHERE site_key='agency'.",
                "Event data: web_events WHERE site_key='agency'.",
                "0 leads as of run date — all rollups are null/empty.",
            ],
        }
        OUT_FILE.write_text(json.dumps(out, indent=2, default=str), encoding="utf-8")
        print(f"\nWrote: {OUT_FILE}", flush=True)
        print("\n-- SMOKE SUMMARY --")
        print(f"  Total agency leads     : 0")
        print(f"  First-party sessions   : {firstparty['total_sessions']} total, {firstparty['human_sessions']} human")
        print(f"  Unique visitors        : {firstparty['unique_visitors']}")
        print(f"  Dark-AI lens           : {dark_ai['status']}")
        print("---")
        return

    _SAFE_KEYS = {
        "lead_id", "created_at", "submit_page", "entry_page", "landing",
        "attribution_level", "referrer_host", "channel", "utm_source",
        "utm_medium", "country", "device_type",
    }
    leads = [{k: v for k, v in row.items() if k in _SAFE_KEYS} for row in leads]

    # 2. GSC query enrichment (agency has GSC data)
    print("Fetching GSC query data for enrichment ...", flush=True)
    gsc_rows = run_sql(
        "SELECT page_url, query, SUM(impressions) AS impressions "
        "FROM gsc_query_data WHERE site_key = 'agency' GROUP BY page_url, query;"
    )
    gsc_index = build_query_index(gsc_rows)
    print(f"  -> {len(gsc_rows)} GSC (page, query) pairs across {len(gsc_index)} pages", flush=True)

    # 3. Bing query enrichment
    print("Fetching Bing query data for enrichment ...", flush=True)
    bing_rows = run_sql(
        "SELECT page_url, query, SUM(impressions) AS impressions "
        "FROM bing_query_data WHERE site_key = 'agency' GROUP BY page_url, query;"
    )
    bing_index = build_query_index(bing_rows)
    print(f"  -> {len(bing_rows)} Bing (page, query) pairs across {len(bing_index)} pages", flush=True)

    # 4. Rollups
    rollups = build_rollups(leads)

    # 5. Query enrichment per landing page
    landing_counts = rollups["by_landing"]
    query_enrichment: dict[str, dict] = {}
    for landing, count in landing_counts.items():
        if landing == "(unknown)" or count < 1:
            continue
        query_enrichment[landing] = {
            "lead_count": count,
            "gsc_top3": top3(gsc_index, landing),
            "bing_top3": top3(bing_index, landing),
            "inferred": True,
        }

    # 6. Dark-AI lens
    print("Checking vw_probable_ai_direct ...", flush=True)
    dark_ai = fetch_dark_ai_lens()

    # 7. First-party analytics summary
    print("Fetching first-party analytics summary ...", flush=True)
    firstparty = fetch_firstparty_summary()

    # 8. Assemble output
    out = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "site": "agency",
        "sql_source": "scripts/agency/40_lead_attribution.sql",
        "analytics_source": "first-party (web_sessions/web_events, site_key='agency') — NO GA4",
        "total_leads": len(leads),
        "leads": leads,
        "rollups": rollups,
        "query_enrichment": query_enrichment,
        "dark_ai_lens": dark_ai,
        "firstparty_summary": firstparty,
        "schema_notes": [
            "Agency uses source='agency' in the leads table.",
            "No GA4 property configured for agency; use web_sessions/web_events for session data.",
            "Session data: web_sessions WHERE site_key='agency'.",
            "Event data: web_events WHERE site_key='agency'.",
        ],
    }

    OUT_FILE.write_text(json.dumps(out, indent=2, default=str), encoding="utf-8")
    print(f"\nWrote: {OUT_FILE}", flush=True)

    af = rollups["attributed_fraction"]
    print("\n-- SMOKE SUMMARY --")
    print(f"  Total agency leads    : {af['n_total']}")
    print(f"  Attributed            : {af['n_attributed']}")
    print(f"  Dark-AI lens          : {dark_ai['status']}")
    print("---")


if __name__ == "__main__":
    main()
