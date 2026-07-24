"""
Backtest analysis: league table + prereg-expectation checks over a batch registry.

Reads cache/backtest_runs.json (name -> run_id), rescores every run from cache
(zero spend), and prints a markdown league table plus the pre-registered
directional checks. Feeds docs/_engines/NICHE_SCREENER_V2_BACKTEST.md.

Run: python -m optimisation_engine.niche_screener.analyze_backtest [registry.json]
"""
from __future__ import annotations

import json
import sys

from optimisation_engine.niche_screener import common, tripwires
from optimisation_engine.niche_screener.score import score_niche


def analyze(registry_path: str) -> list[dict]:
    registry = json.loads(open(registry_path, encoding="utf-8").read())
    rows: list[dict] = []
    for name, r in registry.items():
        if name.startswith("_"):
            continue
        rid = r["run_id"]
        spec_path = common.SPECS_DIR / f"{name}.json"
        spec = common.load_spec(spec_path)
        gates = common.cache_get(rid, name, "gates")
        row: dict = {"name": name, "run_id": rid, "gates": None, "score": None}
        if gates is None:
            manifest = common.cache_get(rid, name, "manifest") or {}
            row["gates"] = {"overall": "G0-ABORT" if manifest.get("aborted") else "MISSING"}
            rows.append(row)
            continue
        row["gates"] = {
            "overall": gates.get("overall"),
            "failed": gates.get("failed_gates"),
            "G1": (gates.get("G1") or {}).get("verdict"),
            "g2_vw": ((gates.get("G2") or {}).get("evidence") or {}).get("volume_weighted_diy"),
            "g3_deleg": ((gates.get("G3") or {}).get("evidence") or {}).get("delegation_volume"),
            "g3_share": ((gates.get("G3") or {}).get("evidence") or {}).get("diy_share"),
            "g4_spikes": ((gates.get("G4") or {}).get("evidence") or {}).get("spiking_count"),
        }
        if common.cache_get(rid, name, "score") is not None or common.cache_get(rid, name, "serps"):
            try:
                sc = score_niche(spec, rid)
                tw = tripwires.evaluate(rid, name)
                row["score"] = {
                    "total": sc["total"], "min": sc["total_min"], "max": sc["total_max"],
                    "verdict": tw["verdict"],
                    "components": {k: (round(v["weighted"], 1) if not v["is_null"] else None)
                                   for k, v in sc["components"].items()},
                }
            except Exception as exc:
                row["score"] = {"error": str(exc)}
        rows.append(row)

    scored = sorted((r for r in rows if r["score"] and "total" in (r["score"] or {})),
                    key=lambda r: -r["score"]["total"])
    gated = [r for r in rows if not r["score"] or "total" not in (r["score"] or {})]

    print("\n## League table (gate-passers, /100)\n")
    print("| Niche | Score | Range | Verdict | DIY | Winnability | Churn | Calc | Buyer | AIO |")
    print("|---|---|---|---|---|---|---|---|---|---|")
    for r in scored:
        s = r["score"]; c = s["components"]
        print(f"| {r['name']} | {s['total']} | [{s['min']}, {s['max']}] | {s['verdict']} "
              f"| {c.get('diy_pain_demand')} | {c.get('longtail_winnability')} | {c.get('rule_churn')} "
              f"| {c.get('calculator_demand')} | {c.get('buyer_market_depth')} | {c.get('aio_exposure')} |")

    print("\n## Gate outcomes (non-passers)\n")
    print("| Niche | Overall | Failed gates | G1 | G2 vw-DIY | G3 deleg vol | G3 DIY share | G4 spikes |")
    print("|---|---|---|---|---|---|---|---|")
    for r in gated:
        g = r["gates"]
        print(f"| {r['name']} | {g.get('overall')} | {g.get('failed')} | {g.get('G1')} "
              f"| {g.get('g2_vw')} | {g.get('g3_deleg')} | {g.get('g3_share')} | {g.get('g4_spikes')} |")

    # Prereg directional checks
    def overall(name: str) -> str:
        for r in rows:
            if r["name"] == name:
                return str((r["gates"] or {}).get("overall"))
        return "ABSENT"

    def total(name: str) -> float | None:
        for r in rows:
            if r["name"] == name and r["score"] and "total" in r["score"]:
                return r["score"]["total"]
        return None

    scored_totals = [r["score"]["total"] for r in scored]
    btl = total("buy-to-let")
    checks = [
        ("property passes all gates", overall("buy-to-let") == "PASS"),
        ("property top-2 of in-house scored", btl is not None and sum(
            1 for r in scored if not r["name"].startswith("ext-") and r["score"]["total"] > btl) < 2),
        ("dentists fails >=1 hard gate", overall("dentists") == "FAIL"),
        ("contractors-ir35 fails a gate or parks", overall("contractors-ir35") in ("FAIL", "PARK")),
        ("ext-pension-transfer killed at G0", overall("ext-pension-transfer") == "G0-ABORT"),
        ("ext-conveyancing LOW/FAIL", overall("ext-conveyancing") in ("FAIL", "PARK")),
        ("ext-rd-tax LOW/FAIL", overall("ext-rd-tax") in ("FAIL", "PARK")),
        ("ext-equity-release HIGH (PASS + scores)", overall("ext-equity-release") == "PASS"),
        ("ext-wills-probate HIGH (PASS + scores)", overall("ext-wills-probate") == "PASS"),
    ]
    print("\n## Prereg directional checks\n")
    for label, ok in checks:
        print(f"- [{'PASS' if ok else 'FAIL'}] {label}")
    return rows


if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else str(common.CACHE_DIR / "backtest_runs.json")
    analyze(path)
