"""Apply the web-analytics migrations to a Supabase project via the Management API.

Usage:
    python scripts/apply_web_analytics_migrations.py staging   # validate (dev)
    python scripts/apply_web_analytics_migrations.py prod      # ship (production)

Reads SUPABASE_ACCESS_TOKEN from .env. Each migration file is run as one
statement batch; the Management API runs it transactionally, so a syntax error
rolls back with no partial state. Prints a clear PASS/FAIL per migration.
"""
from __future__ import annotations

import json
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PROJECT_REFS = {
    "staging": "fyabqbuklfrjqjxaofcx",
    "prod": "dhlxwmvmkrfnmcgjbntk",
}

MIGRATIONS = [
    "20260605000001_create_web_analytics_tables.sql",
    "20260605000002_add_visitor_id_to_leads.sql",
    "20260605000003_extend_opportunity_types.sql",
    "20260605000004_loosen_human_filter.sql",
    "20260605000005_enrich_visitor_journey.sql",
    "20260606000001_stitch_lead_to_session.sql",
    "20260606000002_personalization_view.sql",
    "20260606000003_section_engagement.sql",
    "20260606000004_experiments.sql",
    "20260606000005_timeseries.sql",
    "20260606000006_bot_score.sql",
    "20260607000001_calc_gate_placement_views.sql",
    "20260608000001_funnel_v2_and_geo_views.sql",
    "20260608000002_cta_friction_and_timeseries_geo.sql",
    "20260608000003_dashboard_trackers.sql",
    "20260608000004_experiment_results_unnest.sql",
    "20260608000005_session_geo_city_region_tz.sql",
    "20260608000006_channel_and_visits_views.sql",
    "20260608000007_nurture_engine.sql",
    "20260608000008_lead_enrichment.sql",
    "20260609000001_experiment_funnel.sql",
    # GEO measurement layer (Track B) -- AI/Bing channel granularity, weekly cadence,
    # first-touch journey fix, dark-AI heuristic, Copilot citation storage.
    "20260617000001_geo_channel_split.sql",
    "20260617000002_geo_leads_weekly_and_journey_fix.sql",
    "20260617000003_vw_probable_ai_direct.sql",
    "20260617000004_bing_ai_performance_table.sql",
]


def load_env(key: str) -> str:
    for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith(key + "="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit(f"{key} not found in .env")


def run_sql(ref: str, token: str, sql: str) -> tuple[bool, str]:
    url = f"https://api.supabase.com/v1/projects/{ref}/database/query"
    body = json.dumps({"query": sql}).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        method="POST",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "User-Agent": "accounting-network-migrator/1.0",
            "Accept": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return True, resp.read().decode("utf-8")[:500]
    except urllib.error.HTTPError as e:
        return False, f"HTTP {e.code}: {e.read().decode('utf-8')[:800]}"
    except Exception as e:  # noqa: BLE001
        return False, f"{type(e).__name__}: {e}"


def main() -> None:
    target = sys.argv[1] if len(sys.argv) > 1 else "staging"
    # Optional 2nd arg: run ONLY migrations whose filename contains this string.
    # Re-running the whole list can fail on non-idempotent statements (e.g. bare
    # partition CREATEs), so apply new migrations individually:
    #   python scripts/apply_web_analytics_migrations.py prod 20260606000001
    only = sys.argv[2] if len(sys.argv) > 2 else None
    if target not in PROJECT_REFS:
        raise SystemExit(f"target must be one of {list(PROJECT_REFS)}")
    ref = PROJECT_REFS[target]
    token = load_env("SUPABASE_ACCESS_TOKEN")

    migrations = [m for m in MIGRATIONS if only is None or only in m]
    if only and not migrations:
        raise SystemExit(f"no migration in MIGRATIONS matches {only!r}")

    print(f"Target: {target} ({ref})" + (f"  [only: {only}]" if only else "") + "\n")
    all_ok = True
    for name in migrations:
        sql = (ROOT / "supabase" / "migrations" / name).read_text(encoding="utf-8")
        ok, msg = run_sql(ref, token, sql)
        status = "PASS" if ok else "FAIL"
        print(f"[{status}] {name}")
        if not ok:
            all_ok = False
            print(f"        {msg}\n")
    print("\n" + ("ALL MIGRATIONS APPLIED CLEANLY" if all_ok else "ONE OR MORE MIGRATIONS FAILED"))
    sys.exit(0 if all_ok else 1)


if __name__ == "__main__":
    main()
