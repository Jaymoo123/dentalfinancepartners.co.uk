"""
Validation harness for reasoning checkpoints.

Provides:
  - TestCase: input + expectation + optional multi-shot agreement check
  - run_cases(): executes test cases, captures outputs + validator passes/fails
  - report(): summarises results: pass rate, agreement rate, false-pos/false-neg

Used by checkpoint-specific test modules. The goal is not to prove correctness
absolutely (LLMs are stochastic) but to give US confidence that:
  1. Normal inputs produce expected category outputs (acceptance)
  2. Adversarial inputs are handled robustly (rejection / 'skip')
  3. Multi-shot runs agree at acceptable rates (consistency)
  4. Validators catch the failure modes they're meant to (catch rate)
"""
from __future__ import annotations

import json
from collections import defaultdict
from dataclasses import dataclass, field
from typing import Any, Callable


@dataclass
class TestCase:
    case_id: str
    description: str
    input_data: Any
    # Expectation: a callable that takes the parsed output and returns
    # (passed: bool, note: str). For categorical outputs you can use
    # expects() helpers below.
    expect: Callable[[Any], tuple[bool, str]]
    category: str = "normal"  # 'normal' | 'adversarial' | 'edge'
    multi_shot: int = 1       # number of times to run; >1 = consistency check
    agreement_field: str | None = None  # if multi_shot>1, field whose values must agree across runs


@dataclass
class CaseResult:
    case_id: str
    passed_runs: int
    failed_runs: int
    agreement_rate: float
    outputs: list[Any] = field(default_factory=list)
    notes: list[str] = field(default_factory=list)
    cost_usd: float = 0.0


@dataclass
class HarnessReport:
    checkpoint: str
    case_results: list[CaseResult]
    total_cost_usd: float

    @property
    def pass_rate(self) -> float:
        if not self.case_results:
            return 0.0
        passed = sum(1 for c in self.case_results if c.failed_runs == 0)
        return passed / len(self.case_results)

    @property
    def by_category(self) -> dict[str, dict]:
        out: dict[str, dict] = defaultdict(lambda: {"passed": 0, "failed": 0, "total": 0})
        return dict(out)

    def summary(self) -> str:
        lines = [f"\n=== Validation Report: {self.checkpoint} ==="]
        lines.append(f"Cases: {len(self.case_results)}")
        passed_cases = sum(1 for c in self.case_results if c.failed_runs == 0)
        partial_cases = sum(1 for c in self.case_results if 0 < c.failed_runs < c.failed_runs + c.passed_runs)
        failed_cases = sum(1 for c in self.case_results if c.passed_runs == 0)
        lines.append(f"  fully passing: {passed_cases}")
        lines.append(f"  partial (some runs failed):  {partial_cases}")
        lines.append(f"  fully failing: {failed_cases}")
        lines.append(f"Pass rate: {self.pass_rate:.1%}")
        # multi-shot agreement
        ms_cases = [c for c in self.case_results if c.passed_runs + c.failed_runs > 1]
        if ms_cases:
            avg_agree = sum(c.agreement_rate for c in ms_cases) / len(ms_cases)
            lines.append(f"Multi-shot agreement: {avg_agree:.1%} (across {len(ms_cases)} multi-shot cases)")
        lines.append(f"Total DeepSeek cost: ${self.total_cost_usd:.6f}")
        # Failures
        failures = [c for c in self.case_results if c.failed_runs > 0]
        if failures:
            lines.append(f"\nFAILURES / partials ({len(failures)}):")
            for c in failures[:20]:
                lines.append(f"  {c.case_id}: passed_runs={c.passed_runs}/{c.passed_runs+c.failed_runs}")
                for n in c.notes[:2]:
                    lines.append(f"    note: {n}")
        return "\n".join(lines)


def expects_field_equals(field_path: str, expected_value: Any) -> Callable:
    """Build an expectation that a JSON path equals the value."""
    def _e(output):
        parts = field_path.split(".")
        cur = output
        for p in parts:
            if isinstance(cur, dict) and p in cur:
                cur = cur[p]
            else:
                return False, f"path {field_path!r} missing"
        if cur == expected_value:
            return True, ""
        return False, f"{field_path}={cur!r} != expected {expected_value!r}"
    return _e


def expects_field_in(field_path: str, allowed: set) -> Callable:
    def _e(output):
        parts = field_path.split(".")
        cur = output
        for p in parts:
            if isinstance(cur, dict) and p in cur:
                cur = cur[p]
            else:
                return False, f"path {field_path!r} missing"
        if cur in allowed:
            return True, ""
        return False, f"{field_path}={cur!r} not in {allowed}"
    return _e


def expects_all(*expectations: Callable) -> Callable:
    def _e(output):
        for fn in expectations:
            ok, note = fn(output)
            if not ok:
                return False, note
        return True, ""
    return _e


def run_cases(
    *,
    checkpoint_name: str,
    cases: list[TestCase],
    run_fn: Callable[[Any], tuple[Any, float, int]],
) -> HarnessReport:
    """Execute test cases.

    run_fn(input) must return (output_dict, cost_usd, confidence).
    """
    results: list[CaseResult] = []
    total_cost = 0.0

    for case in cases:
        outputs: list[Any] = []
        notes: list[str] = []
        passed_runs = 0
        failed_runs = 0
        case_cost = 0.0

        for shot in range(case.multi_shot):
            try:
                output, cost, _conf = run_fn(case.input_data)
            except Exception as exc:
                outputs.append({"__error__": str(exc)})
                notes.append(f"shot {shot+1}: exception {type(exc).__name__}: {exc}")
                failed_runs += 1
                continue

            outputs.append(output)
            case_cost += cost
            ok, note = case.expect(output)
            if ok:
                passed_runs += 1
            else:
                failed_runs += 1
                notes.append(f"shot {shot+1}: {note}")

        # Agreement rate (for multi-shot)
        agree_rate = 1.0
        if case.multi_shot > 1 and case.agreement_field:
            vals = []
            for o in outputs:
                if not isinstance(o, dict):
                    continue
                cur = o
                for p in case.agreement_field.split("."):
                    if isinstance(cur, dict) and p in cur:
                        cur = cur[p]
                    else:
                        cur = "__MISSING__"
                        break
                vals.append(cur)
            if vals:
                from collections import Counter
                counts = Counter(vals)
                agree_rate = counts.most_common(1)[0][1] / len(vals)

        total_cost += case_cost
        results.append(
            CaseResult(
                case_id=case.case_id,
                passed_runs=passed_runs,
                failed_runs=failed_runs,
                agreement_rate=agree_rate,
                outputs=outputs,
                notes=notes,
                cost_usd=case_cost,
            )
        )

    return HarnessReport(checkpoint=checkpoint_name, case_results=results, total_cost_usd=total_cost)
