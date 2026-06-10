"""
Conversion-rate (CRO) opportunity detectors driven by first-party on-site
behaviour (web_sessions / web_events), the mirror image of the SEO detectors in
detectors.py.

Each function reads a cheap, HUMAN-ONLY rollup view (the views already filter
is_bot=false AND human_confirmed=true), applies a deterministic rule, and returns
Opportunity objects persisted via the existing persist_opportunities(). No LLM,
no third-party calls -- pure data, exactly like the SEO detectors.

Opportunity types (must exist in the optimisation_opportunities CHECK constraint,
added by migration 20260605000003):
  cro_funnel      biggest human stage-to-stage drop in the funnel
  cro_calculator  calculator computed a lot but rarely converts
  cro_cta         high-traffic page whose CTA is ignored
  cro_form        form field where users abandon
  cro_ux          rage/dead-click cluster -> likely UX defect

Run:  python -m optimisation_engine.analysis.behaviour_detectors property
"""
from __future__ import annotations

import sys
from typing import Any

import httpx

from optimisation_engine.analysis.detectors import Opportunity, persist_opportunities
from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL


def _headers() -> dict[str, str]:
    return {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}


def _get(view: str, params: dict[str, str]) -> list[dict]:
    """Read a rollup view via PostgREST."""
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/{view}",
        headers=_headers(),
        params={"site_key": f"eq.{params.pop('site_key')}", **params},
        timeout=30.0,
    )
    r.raise_for_status()
    return r.json()


def _pct(numerator: float, denominator: float) -> float:
    return (numerator / denominator) if denominator else 0.0


# -----------------------------------------------------------------------------
# Detectors
# -----------------------------------------------------------------------------


def detect_funnel_dropoff(site_key: str, *, min_sessions: int = 50) -> list[Opportunity]:
    """Find the biggest proportional leak along the engagement funnel.

    Stages (per-session reach, human-only): sessions -> engaged -> calculator
    -> CTA -> form_start -> converted. We sum the daily rollup over its window
    and flag the single weakest transition (and the overall conversion rate).
    """
    rows = _get("vw_web_funnel_daily", {"site_key": site_key, "select": "*"})
    if not rows:
        return []

    agg = {
        "sessions": sum(int(r.get("sessions") or 0) for r in rows),
        "engaged": sum(int(r.get("engaged_sessions") or 0) for r in rows),
        "calculator": sum(int(r.get("calc_sessions") or 0) for r in rows),
        "cta": sum(int(r.get("cta_sessions") or 0) for r in rows),
        "form_start": sum(int(r.get("form_start_sessions") or 0) for r in rows),
        "converted": sum(int(r.get("converted_sessions") or 0) for r in rows),
    }
    if agg["sessions"] < min_sessions:
        return []

    stages = ["sessions", "engaged", "calculator", "cta", "form_start", "converted"]
    worst = None  # (drop_ratio, from_stage, to_stage, prev_count, cur_count)
    for a, b in zip(stages, stages[1:]):
        prev, cur = agg[a], agg[b]
        if prev <= 0:
            continue
        drop = _pct(prev - cur, prev)
        if worst is None or drop > worst[0]:
            worst = (drop, a, b, prev, cur)

    if worst is None:
        return []

    drop, frm, to, prev, cur = worst
    overall = _pct(agg["converted"], agg["sessions"])
    score = min(100, int(drop * 60 + min(agg["sessions"], 1000) / 1000 * 40))
    return [
        Opportunity(
            site_key=site_key,
            opportunity_type="cro_funnel",
            target_url=None,
            primary_query="funnel_dropoff",
            target_query_cluster=[],
            recommended_action=(
                f"Biggest funnel leak is {frm} -> {to}: {prev} sessions reached "
                f"'{frm}' but only {cur} reached '{to}' ({drop*100:.0f}% drop). "
                f"Investigate that step (copy, friction, CTA prominence)."
            ),
            rationale=(
                f"Human-only funnel over the window: {agg['sessions']} sessions, "
                f"{agg['engaged']} engaged, {agg['cta']} clicked a CTA, "
                f"{agg['form_start']} started a form, {agg['converted']} converted "
                f"({overall*100:.1f}% overall). The {frm}->{to} step loses the most."
            ),
            score=score,
            confidence="medium",
            supporting_data={"funnel": agg, "worst_transition": {"from": frm, "to": to, "drop": round(drop, 3)}},
        )
    ]


def detect_calculator_abandon_before_lead(
    site_key: str, *, min_computed: int = 20, max_lead_rate: float = 0.02
) -> list[Opportunity]:
    """Calculators that compute a lot but almost never convert to a lead."""
    rows = _get("vw_calculator_conversion", {"site_key": site_key, "select": "*"})
    out: list[Opportunity] = []
    for r in rows:
        slug = r.get("calculator_slug")
        computed = int(r.get("computed") or 0)
        lead_sessions = int(r.get("lead_sessions") or 0)
        if not slug or computed < min_computed:
            continue
        lead_rate = _pct(lead_sessions, computed)
        if lead_rate > max_lead_rate:
            continue
        score = min(100, int(min(computed, 500) / 500 * 70 + (max_lead_rate - lead_rate) / max(max_lead_rate, 1e-6) * 30))
        out.append(
            Opportunity(
                site_key=site_key,
                opportunity_type="cro_calculator",
                target_url=f"/calculators/{slug}",
                primary_query=f"calc_abandon:{slug}",
                target_query_cluster=[],
                recommended_action=(
                    f"'{slug}' computed {computed} times but produced {lead_sessions} "
                    f"leads ({lead_rate*100:.1f}%). Add/strengthen a result-stage CTA, "
                    f"a 'have an expert check this' hook, or capture the result by email."
                ),
                rationale=(
                    f"viewed={r.get('viewed')}, computed={computed}, "
                    f"result_viewed={r.get('result_viewed')}, lead_sessions={lead_sessions}. "
                    f"High intent (they ran the numbers) but the conversion bridge is weak."
                ),
                score=score,
                confidence="medium",
                supporting_data={k: r.get(k) for k in r},
            )
        )
    return out


def detect_cta_ignored_high_traffic(
    site_key: str, *, min_sessions: int = 50, max_cta_rate: float = 0.03
) -> list[Opportunity]:
    """Pages with real traffic whose CTA is essentially ignored."""
    rows = _get("vw_page_engagement", {"site_key": site_key, "select": "*"})
    out: list[Opportunity] = []
    for r in rows:
        path = r.get("page_path")
        sessions = int(r.get("sessions_28d") or 0)
        cta_rate = float(r.get("cta_click_rate_28d") or 0.0)
        leads = int(r.get("lead_sessions_28d") or 0)
        if not path or sessions < min_sessions:
            continue
        if cta_rate > max_cta_rate or leads > 0:
            continue
        score = min(100, int(min(sessions, 1000) / 1000 * 80 + (max_cta_rate - cta_rate) / max(max_cta_rate, 1e-6) * 20))
        out.append(
            Opportunity(
                site_key=site_key,
                opportunity_type="cro_cta",
                target_url=path,
                primary_query="cta_ignored",
                target_query_cluster=[],
                recommended_action=(
                    f"{path}: {sessions} sessions but CTA click-rate {cta_rate*100:.1f}% "
                    f"and 0 leads. Make the primary CTA clearer/earlier, or match it to "
                    f"the page's intent."
                ),
                rationale=(
                    f"sessions={sessions}, cta_click_rate={cta_rate:.3f}, "
                    f"max_scroll={r.get('max_scroll_pct_28d')}. Traffic lands but the "
                    f"conversion action isn't compelling."
                ),
                score=score,
                confidence="medium",
                supporting_data={k: r.get(k) for k in r},
            )
        )
    return out


def detect_form_field_abandonment(
    site_key: str, *, min_focuses: int = 20, min_abandon_rate: float = 0.5
) -> list[Opportunity]:
    """The specific form field where users hesitate and bail."""
    rows = _get("vw_form_field_dropoff", {"site_key": site_key, "select": "*"})
    out: list[Opportunity] = []
    for r in rows:
        field = r.get("field")
        form_id = r.get("form_id")
        focuses = int(r.get("focuses") or 0)
        abandon_rate = float(r.get("abandon_rate") or 0.0)
        if not field or focuses < min_focuses or abandon_rate < min_abandon_rate:
            continue
        score = min(100, int(abandon_rate * 60 + min(focuses, 200) / 200 * 40))
        out.append(
            Opportunity(
                site_key=site_key,
                opportunity_type="cro_form",
                target_url=None,
                primary_query=f"form_abandon:{form_id}:{field}",
                target_query_cluster=[],
                recommended_action=(
                    f"Form '{form_id}' field '{field}' is abandoned {abandon_rate*100:.0f}% "
                    f"of the time it's focused ({focuses} focuses). Consider making it "
                    f"optional, adding inline help, or reordering it later."
                ),
                rationale=f"focuses={focuses}, abandons={r.get('abandons')}, errors={r.get('errors')}.",
                score=score,
                confidence="medium",
                supporting_data={k: r.get(k) for k in r},
            )
        )
    return out


def detect_rage_click_ux_bug(site_key: str, *, min_clusters: int = 5) -> list[Opportunity]:
    """Repeated rage-clicks on the same element => a likely UX defect."""
    rows = httpx.get(
        f"{SUPABASE_URL}/rest/v1/web_events",
        headers=_headers(),
        params={
            "site_key": f"eq.{site_key}",
            "event_name": "eq.rage_click",
            "is_bot": "eq.false",
            "select": "page_path,props",
            "order": "ts.desc",
            "limit": "5000",
        },
        timeout=30.0,
    )
    rows.raise_for_status()
    counts: dict[tuple[str, str], int] = {}
    for e in rows.json():
        path = e.get("page_path") or ""
        selector = (e.get("props") or {}).get("selector") or ""
        counts[(path, selector)] = counts.get((path, selector), 0) + 1

    out: list[Opportunity] = []
    for (path, selector), n in counts.items():
        if n < min_clusters or not selector:
            continue
        out.append(
            Opportunity(
                site_key=site_key,
                opportunity_type="cro_ux",
                target_url=path or None,
                primary_query=f"rage:{selector}",
                target_query_cluster=[],
                recommended_action=(
                    f"{n} rage-click clusters on '{selector}'"
                    + (f" at {path}" if path else "")
                    + ". Users expect it to do something it doesn't, or it's broken. Fix it."
                ),
                rationale=f"{n} rage_click events on the same element -> a real UX defect or dead control.",
                score=min(100, 40 + n * 5),
                confidence="high" if n >= 10 else "medium",
                supporting_data={"selector": selector, "page_path": path, "count": n},
            )
        )
    return out


ALL_DETECTORS = [
    detect_funnel_dropoff,
    detect_calculator_abandon_before_lead,
    detect_cta_ignored_high_traffic,
    detect_form_field_abandonment,
    detect_rage_click_ux_bug,
]


def run_behaviour_detectors(site_key: str) -> dict[str, Any]:
    """Run every CRO detector for a site and persist the findings."""
    opportunities: list[Opportunity] = []
    for fn in ALL_DETECTORS:
        try:
            found = fn(site_key)
            opportunities.extend(found)
            print(f"[CRO] {fn.__name__}: {len(found)}")
        except Exception as exc:  # noqa: BLE001 -- one detector must not kill the run
            print(f"[CRO] {fn.__name__} ERROR: {type(exc).__name__}: {exc}")
    result = persist_opportunities(opportunities)
    return {"site_key": site_key, "opportunities": len(opportunities), **result}


if __name__ == "__main__":
    site = sys.argv[1] if len(sys.argv) > 1 else "property"
    print(run_behaviour_detectors(site))
