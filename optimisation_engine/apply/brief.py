"""
ChangeBrief — the pre-apply manifest.

Every apply module produces a ChangeBrief BEFORE editing any files. The
brief is the "this is what it is, this is the opportunity, this is the
change" output the operator (or auto-apply gate) reviews.

A brief is constructed via the apply module's build_brief() function.
If can_apply is True, the same module's apply(brief) executes the change.
If can_apply is False, blocking_issues tells you why.

The brief is also the audit record — it can be JSON-serialised and stored
in optimisation_changes.diff_summary so we have a permanent record of the
reasoning behind every shipped change.
"""
from __future__ import annotations

import json
import textwrap
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from typing import Any


@dataclass
class ChangeBrief:
    # ---- Identity ----------------------------------------------------------
    apply_module: str                          # e.g. "meta_only", "internal_link"
    site_key: str
    target_url: str
    target_file_path: str                      # repo-relative
    opportunity_id: str | None = None          # link to optimisation_opportunities

    # ---- "This is what it is" - current state -----------------------------
    current_state: dict[str, Any] = field(default_factory=dict)

    # ---- "This is the opportunity" - signal + reasoning -------------------
    opportunity_signal: dict[str, Any] = field(default_factory=dict)
    opportunity_rationale: str = ""

    # ---- "This is the change" - proposed action ---------------------------
    change_summary: str = ""                   # one-line summary
    change_diff: dict[str, Any] = field(default_factory=dict)   # before/after structured
    files_to_modify: list[str] = field(default_factory=list)

    # ---- Validation --------------------------------------------------------
    validation_results: list[dict] = field(default_factory=list)
    can_apply: bool = False
    blocking_issues: list[str] = field(default_factory=list)

    # ---- Internal data (used by apply step, not shown in human output) -----
    internal_data: dict[str, Any] = field(default_factory=dict)

    # ---- Metadata ----------------------------------------------------------
    created_at: str = field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

    def add_validation(self, name: str, passed: bool, detail: str = "") -> None:
        """Append a validator result and update can_apply / blocking_issues."""
        self.validation_results.append({"name": name, "passed": passed, "detail": detail})
        if not passed:
            self.blocking_issues.append(f"{name}: {detail}")

    def finalise_can_apply(self) -> None:
        """Set can_apply=True iff all validators passed."""
        self.can_apply = all(v["passed"] for v in self.validation_results) and not self.blocking_issues

    def to_json(self) -> str:
        return json.dumps(asdict(self), indent=2, default=str)

    def format_human(self) -> str:
        """Three-section human-readable rendering for review.

        Layout matches the user's brief:
          [What] - current state of the page
          [Why]  - the opportunity signal + rationale
          [How]  - the proposed change with before/after
        """
        lines: list[str] = []
        lines.append("=" * 80)
        lines.append(f" CHANGE BRIEF  [{self.apply_module}]  site={self.site_key}")
        lines.append("=" * 80)
        lines.append(f"target_url:  {self.target_url}")
        lines.append(f"file_path:   {self.target_file_path}")
        if self.opportunity_id:
            lines.append(f"opp_id:      {self.opportunity_id}")
        lines.append("")

        # WHAT
        lines.append("[1] WHAT IT IS — current state")
        lines.append("-" * 80)
        for k, v in self.current_state.items():
            lines.append(self._kv(k, v))
        lines.append("")

        # WHY
        lines.append("[2] THE OPPORTUNITY — signal + reasoning")
        lines.append("-" * 80)
        if self.opportunity_rationale:
            lines.append(self._wrap(self.opportunity_rationale))
            lines.append("")
        for k, v in self.opportunity_signal.items():
            lines.append(self._kv(k, v))
        lines.append("")

        # HOW
        lines.append("[3] THE CHANGE — what will be modified")
        lines.append("-" * 80)
        lines.append(f"summary: {self.change_summary}")
        lines.append("")
        if self.files_to_modify:
            lines.append("files_to_modify:")
            for f in self.files_to_modify:
                lines.append(f"  - {f}")
            lines.append("")
        for k, v in self.change_diff.items():
            lines.append(self._kv(k, v))
        lines.append("")

        # Decision
        lines.append("-" * 80)
        if self.can_apply:
            lines.append("DECISION: READY TO APPLY")
        else:
            lines.append("DECISION: BLOCKED (cannot apply)")
            for issue in self.blocking_issues:
                lines.append(f"  blocker: {issue}")

        if self.validation_results:
            lines.append("")
            lines.append("validators:")
            for v in self.validation_results:
                mark = "PASS" if v["passed"] else "FAIL"
                lines.append(f"  [{mark}] {v['name']}" + (f"  ({v['detail']})" if v["detail"] else ""))
        lines.append("=" * 80)
        return "\n".join(lines)

    # -- helpers --
    def _wrap(self, text: str, indent: str = "  ") -> str:
        text = str(text or "")
        wrapped = textwrap.fill(text, width=76, initial_indent=indent, subsequent_indent=indent)
        return wrapped

    def _kv(self, k: str, v: Any) -> str:
        if isinstance(v, (dict, list)) and v:
            try:
                serialised = json.dumps(v, indent=2, default=str)
            except Exception:
                serialised = str(v)
            indented = textwrap.indent(serialised, "    ")
            return f"  {k}:\n{indented}"
        if isinstance(v, str) and len(v) > 80:
            return f"  {k}:\n{self._wrap(v, indent='    ')}"
        return f"  {k}: {v!r}" if isinstance(v, str) else f"  {k}: {v}"
