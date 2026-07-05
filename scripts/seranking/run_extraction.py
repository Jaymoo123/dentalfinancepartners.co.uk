"""
SE Ranking 7-day trial — Property extraction orchestrator (LOCAL-ONLY).

Phases:
  gate         Day-0 access gate. Validate token, read credit balance, PROBE the
               live API to discover the working endpoint shape (the May trial used
               /v1; current docs say /data — we don't know which this trial gives),
               dump sample responses to raw/, and write _api_profile.json +
               GATE_REPORT.md. RUN THIS FIRST — it tells us full-plan vs fallback.
  tier1        Permanent snapshots: our + competitor domain keywords, domain
               overviews, backlinks summary + refdomains, keyword enrichment,
               AI-search citations. Dry-run by default; --execute to spend.
  tier2-setup  Create/locate the rank-tracker project + start the audit crawl.
  tier2-poll   One daily position pull (run Days 1-7).
  tier2-export Export the 7-day series + audit issues.

Spend discipline: --dry-run (default) prints the per-call credit estimate and the
running total without calling. --execute is required to spend. The client refuses
any call over SERANKING_CREDIT_CEILING and skips same-day duplicates (idempotency).

Usage:
  python -m scripts.seranking.run_extraction --phase gate
  python -m scripts.seranking.run_extraction --phase tier1 --dry-run
  python -m scripts.seranking.run_extraction --phase tier1 --execute
  python -m scripts.seranking.run_extraction --phase tier2-setup --execute
  python -m scripts.seranking.run_extraction --phase tier2-poll --execute   # daily
"""
from __future__ import annotations

import argparse
import json
import sys
from datetime import date
from pathlib import Path

import httpx

# Make the repo root importable whether run via `-m scripts.seranking...` or as a path.
_ROOT = Path(__file__).resolve().parents[2]
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))

from optimisation_engine.config import (
    ROOT, SUPABASE_KEY, SUPABASE_URL, SERANKING_SYSTEM_UK, SERANKING_CREDIT_CEILING,
)
from optimisation_engine.clients.seranking_client import (
    SerankingClient, NoAccess, BudgetExceeded, IdempotencyHit, SerankingError,
    estimate_credits, ledger_total, ENDPOINTS, GATE_PREFIX_CANDIDATES,
    OUT_DIR, RAW_DIR,
)

OWN_DOMAIN = "propertytaxpartners.co.uk"
COMPETITOR_UNIVERSE = ROOT / "briefs" / "property" / "_competitor_universe_v2.json"
API_PROFILE = OUT_DIR / "_api_profile.json"
GATE_REPORT = OUT_DIR / "GATE_REPORT.md"

# Verified top-5 fallback if the universe file can't be parsed.
FALLBACK_COMPETITORS = [
    "ukpropertyaccountants.co.uk", "uklandlordtax.co.uk", "landlordstax.co.uk",
    "rossmartin.co.uk", "dnsassociates.co.uk",
]

# High-intent property-tax prompts for AI-search citation tracking (Deliverable 3).
AI_PROMPTS = [
    "best property tax accountant UK",
    "section 24 mortgage interest relief landlords",
    "limited company buy to let tax",
    "capital gains tax on rental property UK",
    "should I incorporate my property portfolio",
    "stamp duty on second home buy to let",
    "landlord tax changes 2026",
    "how are landlords taxed UK",
]


# --------------------------------------------------------------------------- #
# Inputs: competitors + keyword seeds
# --------------------------------------------------------------------------- #
def load_competitors(top_n: int) -> list[str]:
    try:
        raw = json.loads(COMPETITOR_UNIVERSE.read_text(encoding="utf-8"))
        kept = raw.get("kept", raw) if isinstance(raw, dict) else raw
        doms = [
            c["domain"] for c in kept
            if isinstance(c, dict)
            and c.get("domain")
            and int(c.get("total_appearances", 0) or 0) >= 2
            and not c.get("software_vendor")
        ]
        if doms:
            return doms[:top_n]
    except Exception as e:  # noqa: BLE001
        print(f"  [warn] competitor universe unreadable ({e}); using fallback 5")
    return FALLBACK_COMPETITORS[:top_n]


def load_seeds(limit: int = 60) -> list[str]:
    """Top Property queries from live GSC (gsc_query_data), deduped, by impressions.

    The legacy blog_topics_property table was dropped in the infra refactor, so GSC
    is the live seed source (and it is the same GSC union the gap report uses).
    Falls back to a small hand list if Supabase/GSC is unreachable (offline-safe)."""
    fallback = [
        "property tax accountant", "section 24 tax", "buy to let limited company",
        "capital gains tax property", "stamp duty buy to let", "landlord tax",
        "incorporate property portfolio", "making tax digital landlords",
    ]
    if not (SUPABASE_URL and SUPABASE_KEY):
        return fallback
    headers = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    for site_col in ("property", "propertytaxpartners"):
        try:
            r = httpx.get(
                f"{SUPABASE_URL}/rest/v1/gsc_query_data",
                headers=headers,
                params={"select": "query,impressions", "site_key": f"eq.{site_col}",
                        "order": "impressions.desc", "limit": "400"},
                timeout=20.0,
            )
            if r.status_code >= 300:
                continue
            seen, seeds = set(), []
            for row in r.json():
                q = (row.get("query") or "").strip().lower()
                if q and q not in seen:
                    seen.add(q)
                    seeds.append(q)
            if seeds:
                return seeds[:limit]
        except Exception as e:  # noqa: BLE001
            print(f"  [warn] GSC seed read failed ({e})")
            break
    print("  [warn] no GSC seeds found; using hand fallback")
    return fallback


# --------------------------------------------------------------------------- #
# Phase: GATE (Day-0 access discovery)
# --------------------------------------------------------------------------- #
def phase_gate() -> int:
    print("=== SE Ranking Day-0 GATE ===")
    try:
        client = SerankingClient()
    except NoAccess as e:
        print(f"BLOCKED: {e}")
        return 1

    profile: dict = {"checked": date.today().isoformat(), "base": ENDPOINTS, "balance": None,
                     "working_paths": {}, "data_api": False}

    # 1) Balance / credential check (free)
    print("\n[1] balance / credential check ...")
    try:
        bal = client.get_account_balance()
        profile["balance"] = bal
        print(f"    OK via {bal['path']}")
        print("    " + json.dumps(bal["data"])[:500])
    except NoAccess as e:
        print(f"    TOKEN REJECTED: {e}")
        _write_gate_report(profile, verdict="TOKEN REJECTED — token invalid/expired. "
                           "Provide the current trial key in .env as SERANKING_API_TOKEN.")
        return 2

    # 2) Probe one representative endpoint per family across prefix candidates.
    #    Use the smallest footprint (limit=1) so discovery is cheap.
    print("\n[2] probing endpoint families (smallest footprint) ...")
    probes = [
        ("domain/keywords", {"domain": OWN_DOMAIN, "source": SERANKING_SYSTEM_UK, "limit": 1}),
        ("keywords/questions", {"keyword": "buy to let tax", "source": SERANKING_SYSTEM_UK, "limit": 1}),
        ("backlinks/summary", {"target": OWN_DOMAIN, "mode": "domain"}),
        ("ai/overview", {"keyword": "property tax accountant UK", "source": SERANKING_SYSTEM_UK}),
        ("legacy/similar", {"keyword": "buy to let tax", "system": SERANKING_SYSTEM_UK, "limit": 1}),
    ]
    for short, params in probes:
        base_path = ENDPOINTS[short]["path"]
        tail = base_path.split("/", 2)[-1]  # e.g. "domain/keywords"
        found = None
        for prefix in _prefixes_for(base_path):
            candidate = f"{prefix}/{tail}".replace("//", "/")
            try:
                client._request(short, params=params, path_override=candidate, force=True)
                found = candidate
                print(f"    OK   {short:22s} -> {candidate}")
                break
            except NoAccess:
                continue
            except (SerankingError, BudgetExceeded, IdempotencyHit) as e:
                # 4xx/5xx other than auth, or budget — record and move on
                msg = str(e)[:80]
                if "HTTP 404" in msg or "HTTP 400" in msg:
                    continue
                print(f"    ..   {short:22s} {candidate}: {msg}")
                continue
        if found:
            profile["working_paths"][short] = found
            if ENDPOINTS[short]["kind"] == "data":
                profile["data_api"] = True
        else:
            print(f"    MISS {short:22s} (no candidate answered)")

    API_PROFILE.parent.mkdir(parents=True, exist_ok=True)
    API_PROFILE.write_text(json.dumps(profile, indent=2), encoding="utf-8")

    if profile["data_api"]:
        verdict = ("DATA API UNLOCKED — full plan proceeds. Lock the working_paths into "
                   "ENDPOINTS, then run --phase tier1 --dry-run.")
    elif profile["working_paths"]:
        verdict = ("PLATFORM-ONLY (no Data API) — run the Project-API fallback: rank "
                   "tracker + audit + manual competitor reads. Deliverable 4 + audit only.")
    else:
        verdict = "NO ENDPOINTS ANSWERED — check token scope / API generation."
    print(f"\nVERDICT: {verdict}")
    print(f"Profile -> {API_PROFILE}")
    print(f"Credits spent so far (ledger): {ledger_total()}")
    _write_gate_report(profile, verdict=verdict)
    return 0


def _prefixes_for(base_path: str) -> list[str]:
    cur = "/" + base_path.strip("/").split("/")[0]
    ordered = [cur] + [p for p in GATE_PREFIX_CANDIDATES if p != cur]
    return ordered


def _write_gate_report(profile: dict, *, verdict: str) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    lines = [
        "# SE Ranking — Day-0 Gate Report",
        f"_Checked: {profile.get('checked')}_  ",
        "",
        f"**Verdict:** {verdict}",
        "",
        "## Balance",
        "```json",
        json.dumps(profile.get("balance"), indent=2)[:1200],
        "```",
        "",
        "## Working endpoint paths (lock these into ENDPOINTS in seranking_client.py)",
        "```json",
        json.dumps(profile.get("working_paths"), indent=2),
        "```",
        "",
        f"Data API available: **{profile.get('data_api')}**",
        "",
        f"Sample raw responses dumped under `{RAW_DIR}`.",
    ]
    GATE_REPORT.write_text("\n".join(lines), encoding="utf-8")


# --------------------------------------------------------------------------- #
# Phase: TIER 1 (permanent snapshots)
# --------------------------------------------------------------------------- #
def phase_tier1(*, execute: bool, n_comp_kw: int, n_comp_overview: int,
                n_comp_backlinks: int, refdomain_limit: int, kw_limit: int) -> int:
    competitors_kw = load_competitors(n_comp_kw)
    competitors_overview = load_competitors(n_comp_overview)
    competitors_bl = load_competitors(n_comp_backlinks)
    seeds = load_seeds()

    # Build the call plan as (short_name, kwargs, expected_rows) for estimation.
    plan: list[tuple[str, dict, int]] = []
    plan.append(("domain/keywords", {"domain": OWN_DOMAIN, "limit": kw_limit}, 0))
    for d in competitors_overview:
        plan.append(("domain/overview", {"domain": d}, 0))
    plan.append(("domain/competitors", {"domain": OWN_DOMAIN}, 0))
    for d in competitors_kw:
        plan.append(("domain/keywords", {"domain": d, "limit": kw_limit}, 0))
    plan.append(("backlinks/summary", {"target": OWN_DOMAIN}, 1))
    for d in competitors_bl:
        plan.append(("backlinks/summary", {"target": d}, 1))
        plan.append(("backlinks/refdomains", {"target": d, "limit": refdomain_limit}, refdomain_limit))
    plan.append(("backlinks/refdomains", {"target": OWN_DOMAIN, "limit": refdomain_limit}, refdomain_limit))
    # keyword enrichment in chunks of <=200
    for i in range(0, len(seeds), 200):
        chunk = seeds[i:i + 200]
        plan.append(("keywords/export", {"keywords": chunk}, len(chunk)))
    for s in seeds[:5]:
        plan.append(("keywords/questions", {"seed": s, "limit": 30}, 30))
    for p in AI_PROMPTS:
        plan.append(("ai/overview", {"query": p}, 0))

    total_est = sum(estimate_credits(name, rows) for name, _, rows in plan)
    print(f"=== TIER 1 plan: {len(plan)} calls, ~{total_est} credits "
          f"(ceiling {SERANKING_CREDIT_CEILING}, spent {ledger_total()}) ===")
    for name, kw, rows in plan:
        tag = kw.get("domain") or kw.get("target") or kw.get("seed") or kw.get("query") \
            or (f"{len(kw['keywords'])}kw" if "keywords" in kw else "")
        print(f"  ~{estimate_credits(name, rows):>5} cr  {name:22s} {tag}")

    if not execute:
        print("\nDry run. Re-run with --execute to spend. Confirm the estimate fits the "
              "Day-0 balance first.")
        return 0

    client = SerankingClient()
    ok = err = 0
    for name, kw, _rows in plan:
        try:
            _dispatch(client, name, kw)
            ok += 1
        except IdempotencyHit:
            print(f"  skip (already done today): {name} {kw}")
        except BudgetExceeded as e:
            print(f"  STOP (budget): {e}")
            break
        except (NoAccess, SerankingError, ValueError) as e:
            err += 1
            print(f"  ERR {name} {kw}: {str(e)[:120]}")
    print(f"\nTIER 1 done: {ok} ok, {err} errors. Credits spent: {ledger_total()}")
    print(f"Raw responses -> {RAW_DIR}")
    return 0


def _dispatch(client: SerankingClient, name: str, kw: dict):
    if name == "domain/keywords":
        return client.domain_keywords(kw["domain"], limit=kw.get("limit", 1000))
    if name == "domain/overview":
        return client.domain_overview(kw["domain"])
    if name == "domain/competitors":
        return client.domain_competitors(kw["domain"])
    if name == "backlinks/summary":
        return client.backlinks_summary(kw["target"])
    if name == "backlinks/refdomains":
        return client.backlinks_refdomains(kw["target"], limit=kw.get("limit", 400))
    if name == "keywords/export":
        return client.keywords_export(kw["keywords"])
    if name == "keywords/questions":
        return client.keywords_questions(kw["seed"], limit=kw.get("limit", 50))
    if name == "ai/overview":
        return client.ai_overview(kw["query"])
    raise ValueError(f"no dispatch for {name}")


# --------------------------------------------------------------------------- #
# Phase: TIER 2 (rank tracker + audit) — best-effort scaffold, confirm at gate
# --------------------------------------------------------------------------- #
def phase_tier2(sub: str, *, execute: bool) -> int:
    print(f"=== TIER 2 ({sub}) ===")
    print("Project-API shapes are confirmed at the gate. Once _api_profile.json shows the "
          "working project endpoints, wire this to client.project_* methods.")
    print("Setup: create project for", OWN_DOMAIN, "+ seed head queries + top-5 competitors,")
    print("start audit crawl. Poll: daily positions. Export: 7-day series + audit issues.")
    return 0


# --------------------------------------------------------------------------- #
def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--phase", required=True,
                    choices=["gate", "tier1", "tier2-setup", "tier2-poll", "tier2-export"])
    ap.add_argument("--execute", action="store_true", help="actually spend credits (default dry-run)")
    ap.add_argument("--dry-run", action="store_true", help="explicit dry-run (default)")
    ap.add_argument("--comp-kw", type=int, default=20, help="competitors for full keyword pulls")
    ap.add_argument("--comp-overview", type=int, default=25, help="competitors for cheap overviews")
    ap.add_argument("--comp-backlinks", type=int, default=10, help="competitors for backlink pulls")
    ap.add_argument("--refdomain-limit", type=int, default=400, help="refdomains per domain cap")
    ap.add_argument("--kw-limit", type=int, default=1000, help="domain/keywords record cap")
    args = ap.parse_args()
    execute = args.execute and not args.dry_run

    if args.phase == "gate":
        return phase_gate()
    if args.phase == "tier1":
        return phase_tier1(execute=execute, n_comp_kw=args.comp_kw,
                           n_comp_overview=args.comp_overview, n_comp_backlinks=args.comp_backlinks,
                           refdomain_limit=args.refdomain_limit, kw_limit=args.kw_limit)
    return phase_tier2(args.phase, execute=execute)


if __name__ == "__main__":
    sys.exit(main())
