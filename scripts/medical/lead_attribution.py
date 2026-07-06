"""
Medical lead attribution wrapper — Step P2.t2
=============================================
Runs scripts/medical/40_lead_attribution.sql, adds query-join enrichment
from gsc_query_data + bing_query_data, checks vw_probable_ai_direct, then
writes .cache/medical_diag/lead_attribution.json.

Usage:
    python scripts/medical/lead_attribution.py

Output: .cache/medical_diag/lead_attribution.json
  - leads[]        per-lead rows (NO PII)
  - rollups        by_channel, by_landing, monthly_trend, attributed_fraction
  - query_enrichment  per landing-page probable_queries (inferred=true)
  - dark_ai_lens   vw_probable_ai_direct verdict for medical direct leads

Sane with tiny denominators: reports absolute counts only; rates suppressed
when denominator < 20 (per DIAGNOSIS_2026-07.md invariants).
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
CACHE_DIR = REPO_ROOT / ".cache" / "medical_diag"
OUT_FILE = CACHE_DIR / "lead_attribution.json"

# Macro channel groupings (mirrors vw_channel_leads_weekly §classified → SELECT)
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
# Supabase helper
# ---------------------------------------------------------------------------

def run_sql(query: str) -> list[dict]:
    """POST a SQL query to the Supabase Management API; return rows as list of dicts."""
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
# Query enrichment helpers
# ---------------------------------------------------------------------------

def _path_of(url: str) -> str:
    """Extract normalised path from a full URL or bare path."""
    parsed = urlparse(url)
    # urlparse handles both full URLs and bare paths
    path = parsed.path.rstrip("/") or "/"
    return path


def build_query_index(rows: list[dict]) -> dict[str, list[dict]]:
    """
    Build { normalised_path: [sorted (query, total_impr)] } from
    gsc_query_data or bing_query_data rows (page_url is a full URL).
    Aggregates across all dates (trailing-window rows share query values).
    """
    # Accumulate impressions per (path, query)
    impr: dict[tuple[str, str], int] = defaultdict(int)
    for row in rows:
        path = _path_of(row["page_url"])
        impr[(path, row["query"])] += row.get("impressions") or 0

    # Group by path, sort by impressions DESC
    by_path: dict[str, list[dict]] = defaultdict(list)
    for (path, query), total in impr.items():
        by_path[path].append({"query": query, "impressions": total})

    for path in by_path:
        by_path[path].sort(key=lambda x: x["impressions"], reverse=True)

    return dict(by_path)


def top3(query_index: dict, landing: str) -> list[dict]:
    """Return top-3 queries by impressions for a given landing path."""
    return query_index.get(landing, [])[:3]


# ---------------------------------------------------------------------------
# Rollup helpers
# ---------------------------------------------------------------------------

def _ym(ts: str) -> str:
    """'2026-04-15T...' → '2026-04'"""
    return ts[:7]


def build_rollups(leads: list[dict]) -> dict:
    n_total = len(leads)
    n_attributed = sum(
        1 for l in leads if l["attribution_level"] in ("session", "first_touch")
    )

    # by_channel: granular counts
    by_channel: dict[str, int] = defaultdict(int)
    by_channel_macro: dict[str, int] = defaultdict(int)
    by_landing: dict[str, int] = defaultdict(int)       # true landing (entry-preferred)
    by_entry_page: dict[str, int] = defaultdict(int)    # session entry page only
    by_submit_page: dict[str, int] = defaultdict(int)   # form-submit page only
    monthly: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))

    # How many leads entered on a DIFFERENT page than where they submitted the
    # form? A high count means the "converting page" is NOT the entry page — the
    # /contact landing figure would be an artifact of source_url = submit page.
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

    # Sort dicts for readability
    rollup = {
        "attributed_fraction": {
            "n_attributed": n_attributed,
            "n_total": n_total,
            "fraction": round(n_attributed / n_total, 3) if n_total else None,
            "note": (
                "attributed = session or first_touch; "
                "source_url / unattributed = landing known but channel unresolved"
            ),
        },
        "by_channel_granular": dict(sorted(by_channel.items(), key=lambda x: -x[1])),
        "by_channel_macro": dict(sorted(by_channel_macro.items(), key=lambda x: -x[1])),
        "by_landing": dict(sorted(by_landing.items(), key=lambda x: -x[1])),
        "by_entry_page": dict(sorted(by_entry_page.items(), key=lambda x: -x[1])),
        "by_submit_page": dict(sorted(by_submit_page.items(), key=lambda x: -x[1])),
        "entry_vs_submit": {
            "n_entry_known": n_entry_known,
            "n_entry_differs_from_submit": n_entry_differs_from_submit,
            "note": (
                "submit_page = leads.source_url path (window.location.href at form "
                "mount, i.e. where the form was submitted, usually /contact). "
                "entry_page = resolved session entry_path (the true landing). "
                "When these differ the visitor navigated to the submit page before "
                "converting, so 'converting page = /contact' is a submit-page "
                "artifact, NOT the acquisition page. Use by_entry_page + query "
                "enrichment for the real converting-content read."
            ),
        },
        "monthly_trend": {
            ym: dict(sorted(ch_counts.items(), key=lambda x: -x[1]))
            for ym, ch_counts in sorted(monthly.items())
        },
    }
    return rollup


# ---------------------------------------------------------------------------
# Dark-AI lens
# ---------------------------------------------------------------------------

def fetch_dark_ai_lens() -> dict:
    """
    Query vw_probable_ai_direct for medical direct-channel lead sessions.
    Returns a summary dict. Gracefully handles view-not-found or empty result.
    """
    sql = """
SELECT
  COUNT(*)                                          AS flagged_sessions,
  COUNT(lead_id)                                    AS flagged_with_lead,
  MAX(bing_snap_date::text)                         AS latest_snap_date,
  ROUND(AVG(bing_impression_uplift_pct)::numeric,1) AS avg_uplift_pct
FROM public.vw_probable_ai_direct
WHERE site_key = 'medical';
"""
    try:
        rows = run_sql(sql)
        if not rows:
            return {"status": "empty", "note": "No rows returned from vw_probable_ai_direct."}
        r = rows[0]
        flagged = r.get("flagged_sessions") or 0
        if flagged == 0:
            return {
                "status": "empty",
                "note": (
                    "vw_probable_ai_direct returned 0 flagged sessions for medical. "
                    "Likely < 2 Bing snapshots per page (fresh ingest may still be running). "
                    "Re-run after P1.c Bing re-ingest completes."
                ),
            }
        return {
            "status": "has_rows",
            "flagged_sessions": int(flagged),
            "flagged_with_lead": int(r.get("flagged_with_lead") or 0),
            "latest_snap_date": r.get("latest_snap_date"),
            "avg_impression_uplift_pct": float(r.get("avg_uplift_pct") or 0),
            "note": (
                "HEURISTIC only — Bing impression spike ≥20% within 14d before direct session. "
                "Correlative, not causal. See migration 20260617000003 for full limitations."
            ),
        }
    except Exception as exc:
        return {
            "status": "error",
            "note": f"vw_probable_ai_direct query failed: {exc!s}",
        }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    # Windows consoles / redirected pipes default to cp1252, which cannot encode
    # non-ASCII chars that appear in some note strings (e.g. the dark-AI "≥20%").
    # Force UTF-8 with replacement so a successful run never dies at a print()
    # and returns a false non-zero exit to the battery orchestrator.
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

    CACHE_DIR.mkdir(parents=True, exist_ok=True)

    # 1. Run the core attribution SQL
    print("Running core attribution SQL ...", flush=True)
    sql = SQL_FILE.read_text(encoding="utf-8")
    leads = run_sql(sql)
    print(f"  -> {len(leads)} medical lead rows returned", flush=True)

    if not leads:
        print("ERROR: no medical leads returned — refusing to write empty artifact.", file=sys.stderr)
        sys.exit(1)

    # Strip any PII columns that might appear (defensive)
    _SAFE_KEYS = {
        "lead_id", "created_at", "submit_page", "entry_page", "landing",
        "attribution_level", "referrer_host", "channel", "utm_source",
        "utm_medium", "country", "device_type",
    }
    leads = [{k: v for k, v in row.items() if k in _SAFE_KEYS} for row in leads]

    # 2. Fetch GSC query data for medical
    print("Fetching GSC query data for enrichment ...", flush=True)
    gsc_rows = run_sql(
        "SELECT page_url, query, SUM(impressions) AS impressions "
        "FROM gsc_query_data "
        "WHERE site_key = 'medical' "
        "GROUP BY page_url, query;"
    )
    gsc_index = build_query_index(gsc_rows)
    print(f"  ->{len(gsc_rows)} GSC (page, query) pairs across {len(gsc_index)} pages", flush=True)

    # 3. Fetch Bing query data for medical
    print("Fetching Bing query data for enrichment ...", flush=True)
    bing_rows = run_sql(
        "SELECT page_url, query, SUM(impressions) AS impressions "
        "FROM bing_query_data "
        "WHERE site_key = 'medical' "
        "GROUP BY page_url, query;"
    )
    bing_index = build_query_index(bing_rows)
    print(f"  ->{len(bing_rows)} Bing (page, query) pairs across {len(bing_index)} pages", flush=True)

    # 4. Build rollups
    rollups = build_rollups(leads)

    # 5. Build query enrichment: per unique TRUE landing page (entry-preferred)
    #    that has >=1 lead. Keyed on the real entry page (not the /contact submit
    #    page) so GSC/Bing impressions map to the acquisition content.
    landing_counts = rollups["by_landing"]
    query_enrichment: dict[str, dict] = {}
    for landing, count in landing_counts.items():
        if landing == "(unknown)" or count < 1:
            continue
        gsc_q = top3(gsc_index, landing)
        bing_q = top3(bing_index, landing)
        query_enrichment[landing] = {
            "lead_count": count,
            "gsc_top3": gsc_q,
            "bing_top3": bing_q,
            "inferred": True,
            "note": (
                "probable_queries are inferred from impressions data, not confirmed "
                "click-to-lead traces. GSC data may be stale 14d+ (P1.c re-ingest pending)."
            ),
        }

    # 6. Dark-AI lens
    print("Checking vw_probable_ai_direct ...", flush=True)
    dark_ai = fetch_dark_ai_lens()
    print(f"  ->dark_ai status: {dark_ai['status']}", flush=True)

    # 7. Assemble output
    out = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "site": "medical",
        "sql_source": "scripts/medical/40_lead_attribution.sql",
        "total_leads": len(leads),
        "leads": leads,
        "rollups": rollups,
        "query_enrichment": query_enrichment,
        "dark_ai_lens": dark_ai,
        "schema_notes": [
            "leads.id is UUID (not int).",
            "gsc_page_performance uses column 'niche' not 'site_key' (see 00_staleness.sql).",
            "GSC data starts 2026-04-01; Bing starts 2026-06-03 (stale at time of run — P1.c re-ingest pending).",
            "channel='direct' for leads without a session match (attribution_level source_url/unattributed); "
            "treat direct count with caution until session coverage improves.",
        ],
    }

    OUT_FILE.write_text(json.dumps(out, indent=2, default=str), encoding="utf-8")
    print(f"\nWrote: {OUT_FILE}", flush=True)

    # 8. Smoke-test summary (no PII)
    af = rollups["attributed_fraction"]
    print("\n-- SMOKE SUMMARY --")
    print(f"  Total medical leads   : {af['n_total']}")
    print(f"  Attributed (session+ft): {af['n_attributed']}  "
          f"({af['fraction']:.0%} attributed_fraction)")
    print("\n  Channel breakdown (granular):")
    for ch, n in rollups["by_channel_granular"].items():
        macro = _MACRO.get(ch, "referral")
        print(f"    {ch:<16}  {n:>3}  (macro: {macro})")
    print("\n  Channel breakdown (macro):")
    for ch, n in rollups["by_channel_macro"].items():
        print(f"    {ch:<12}  {n:>3}")
    print("\n  Top TRUE landing (entry-preferred) pages by lead count:")
    top5 = list(rollups["by_landing"].items())[:5]
    for landing, n in top5:
        qe = query_enrichment.get(landing, {})
        gsc_q = [q["query"] for q in qe.get("gsc_top3", [])]
        print(f"    {landing:<40}  {n:>3} lead(s)  GSC top: {gsc_q or '(no data)'}")

    evs = rollups["entry_vs_submit"]
    print("\n  Entry-page vs submit-page (source_url = SUBMIT page, not landing):")
    print(f"    entry_page known for   : {evs['n_entry_known']} / {af['n_total']} leads")
    print(f"    entry != submit page   : {evs['n_entry_differs_from_submit']}  "
          f"(these converted on a different page than they entered on)")
    print("    by_submit_page:")
    for pg, n in list(rollups["by_submit_page"].items())[:5]:
        print(f"      {pg:<40}  {n:>3}")
    print("    by_entry_page (true landing):")
    for pg, n in list(rollups["by_entry_page"].items())[:5]:
        print(f"      {pg:<40}  {n:>3}")
    print("\n  Attribution level breakdown:")
    level_counts: dict[str, int] = defaultdict(int)
    for lead in leads:
        level_counts[lead.get("attribution_level", "unattributed")] += 1
    for lvl, n in sorted(level_counts.items(), key=lambda x: -x[1]):
        print(f"    {lvl:<16}  {n:>3}")
    print(f"\n  Dark-AI lens: {dark_ai['status']}  - {dark_ai.get('note', '')[:80]}")
    print("---")


if __name__ == "__main__":
    main()
