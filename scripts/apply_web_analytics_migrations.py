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
    # Lead contactability & nurture system (verify -> nurture -> gate before DJH).
    "20260701000001_lead_contactability_nurture.sql",
    # Lead nurture observability: control plane table + health/step/stuck views.
    "20260702000001_lead_nurture_observability.sql",
    # Fix: reconcile the dual leads.status CHECK conflict found on prod (old
    # leads_status_check blocked contactable/unreachable/forwarded).
    "20260702000002_leads_status_constraint_reconcile.sql",
    # Wave 2 observability v2: cron heartbeat cols, enrolled-cohort funnel,
    # step-health aux-sequence exclusion, opened/clicked on the health view.
    "20260702000003_lead_nurture_observability_v2.sql",
    # Multi-sequence observability: step_health + stuck views gain a `sequence`
    # dimension so property_contactability and property_detail_capture read apart.
    "20260703000001_lead_nurture_multi_sequence_views.sql",
    "20260703000002_lead_event_re_consented.sql",
    # ---------------------------------------------------------------------
    # Retroactive registration 2026-07-05 (CRO parity program, baseline B1):
    # the 22 migrations below were applied to prod individually over June but
    # never added to this list. Each verified present on prod via a batched
    # object-existence query (functions/views/columns/constraint defs/rows)
    # before registration. Do NOT bulk re-run; apply-by-substring only.
    # ---------------------------------------------------------------------
    "20260608000009_leads_to_enrich_webhook.sql",
    "20260609000002_landlord_tax_index.sql",
    "20260610000001_add_generalist_to_leads_source.sql",
    "20260611000001_fix_visits_to_conversion_attribution.sql",
    "20260611000002_channel_view_registry_internal.sql",
    "20260611000003_leads_extras_jsonb.sql",
    "20260612000001_subscribers_double_optin_fields.sql",
    "20260612000002_generalist_newsletter_to_subscribers_data_migration.sql",
    "20260612000003_agency_newsletter_to_subscribers_data_migration.sql",
    "20260612000004_web_vitals_summary_view.sql",
    "20260613000001_add_contractors_ir35_to_sites.sql",
    "20260613000002_add_contractors_ir35_to_leads_source.sql",
    "20260614000001_add_construction_cis_to_sites.sql",
    "20260614000002_add_construction_cis_to_leads_source.sql",
    "20260616000001_dashboard_humans_kpis.sql",
    "20260616000001_rebrand_contractors_ir35.sql",
    "20260616000002_estate_kpis_country.sql",
    "20260616000003_chart_timeseries.sql",
    "20260624000001_test_data_isolation.sql",
    "20260630000001_console_perf_section_action_and_workmem.sql",
    "20260630000002_form_lead_counts.sql",
    "20260704000001_metric_consistency_visitor_id.sql",
    # R3 resource-gate consent isolation: WHEN clauses on the notify/enrich
    # triggers so in-house-consent resource downloads never CC the partner or
    # consume paid enrichment. Triggers only; functions (with secrets) untouched.
    "20260706000001_resource_gate_notify_skip.sql",
    # Timeseries rollup layer: web_rollup table + refresh/backfill fns + rewrite
    # web_timeseries/estate_timeseries to read the rollup (kills 89s all-time
    # scans / 7d-hourly 500s). Backfill run separately after apply.
    "20260707000002_web_timeseries_rollups.sql",
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
