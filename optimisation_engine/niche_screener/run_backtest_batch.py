"""
Backtest batch driver: screen every backtest spec end-to-end (stage 1 + 2).

Sequential (autocomplete throttle dominates wall clock). Each spec gets its
own run_id recorded in cache/backtest_runs.json so the backtest analysis and
any rescore can find them. Gate-failing specs stop at stage 1 by design;
that IS the prediction for dentists/contractors-ir35.

Run: python -m optimisation_engine.niche_screener.run_backtest_batch
"""
from __future__ import annotations

import json
import traceback

from optimisation_engine.niche_screener import common
from optimisation_engine.niche_screener.cli import cmd_screen

SPECS = [
    "buy-to-let",
    "dentists",
    "contractors-ir35",
    "construction-trades",
    "medical-gp",
    "digital-agency",
    "solicitors",
    "ext-wills-probate",
    "ext-equity-release",
    "ext-conveyancing",
    "ext-rd-tax",
    "ext-boiler",
    "ext-pension-transfer",
]


class _Args:
    def __init__(self, spec_path: str, run_id: str):
        self.spec = spec_path
        self.run_id = run_id
        self.stage2 = True


def main() -> None:
    registry_path = common.CACHE_DIR / "backtest_runs.json"
    registry: dict = {}
    if registry_path.exists():
        registry = json.loads(registry_path.read_text(encoding="utf-8"))

    for name in SPECS:
        spec_path = common.SPECS_DIR / f"{name}.json"
        run_id = common.new_run_id()
        print(f"\n===== {name} ({run_id}) =====", flush=True)
        try:
            cmd_screen(_Args(str(spec_path), run_id))
            registry[name] = {"run_id": run_id, "status": "done"}
        except Exception as exc:
            traceback.print_exc()
            registry[name] = {"run_id": run_id, "status": f"error: {exc}"}
        registry_path.write_text(json.dumps(registry, indent=2), encoding="utf-8")

    print("\nbatch complete:")
    for name, r in registry.items():
        print(f"  {name}: {r['status']} ({r['run_id']})")


if __name__ == "__main__":
    main()
