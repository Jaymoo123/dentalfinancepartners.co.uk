"""
apply_faq_addition — append to YAML `faqs:` array in frontmatter.

Patch shape (from Action Specifier):
  {
    "faq_addition": {
      "faq_entries": [
        {"question": "...", "answer": "..."}
      ]
    }
  }

Validators:
  - question + answer are non-empty strings
  - No em-dashes / hype phrases
  - Question doesn't duplicate an existing FAQ on this page
  - Answer is 30-400 words (sensible FAQ length)
  - Append to existing faqs[] array (or initialise if empty)
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.apply.base import (  # noqa: E402
    ApplyError,
    run_apply_lifecycle,
    slug_to_path,
    url_to_slug,
)
from optimisation_engine.apply.brief import ChangeBrief  # noqa: E402
from optimisation_engine.apply.frontmatter_utils import read, write  # noqa: E402
from optimisation_engine.apply.validators import file_exists, no_banned_chars, no_banned_phrases  # noqa: E402

CHANGE_TYPE = "faq_addition"


def _normalise_question(q: str) -> str:
    """Lowercase + collapse whitespace for duplicate-detection."""
    return re.sub(r"\s+", " ", q.lower().strip())


def build_brief(opportunity: dict) -> ChangeBrief:
    site_key = opportunity["site_key"]
    target_url = opportunity.get("target_url") or ""
    slug = url_to_slug(target_url) or opportunity.get("target_slug")

    plan = opportunity.get("action_plan") or {}
    patch = plan.get("patch") or {}
    faq_patch = patch.get("faq_addition") or patch
    new_entries = faq_patch.get("faq_entries") or []

    path = slug_to_path(site_key, slug) if slug else None
    rel_path = str(path.relative_to(ROOT)) if path else ""

    brief = ChangeBrief(
        apply_module="faq_addition",
        site_key=site_key,
        target_url=target_url,
        target_file_path=rel_path,
        opportunity_id=opportunity.get("id"),
        files_to_modify=[rel_path] if rel_path else [],
    )

    existing_faqs: list[dict] = []
    existing_questions: set[str] = set()
    if path and path.exists():
        try:
            fm, _body = read(path)
            existing_faqs = list(fm.get("faqs") or [])
            existing_questions = {_normalise_question(f.get("question") or "") for f in existing_faqs if isinstance(f, dict)}
            brief.current_state = {
                "slug": slug,
                "title": fm.get("title"),
                "existing_faq_count": len(existing_faqs),
                "existing_questions_preview": [f.get("question") for f in existing_faqs[:3]],
            }
        except Exception as exc:
            brief.add_validation("file_readable", False, str(exc))
            brief.finalise_can_apply()
            return brief

    brief.opportunity_rationale = opportunity.get("rationale") or plan.get("rationale") or ""
    brief.opportunity_signal = {
        "primary_query": opportunity.get("primary_query"),
        "cluster": (opportunity.get("target_query_cluster") or [])[:5],
        "score": opportunity.get("score"),
        "n_entries_proposed": len(new_entries),
    }

    # Filter out duplicates and validate each
    accepted: list[dict] = []
    rejected_dupes: list[str] = []
    invalid: list[str] = []
    for entry in new_entries:
        if not isinstance(entry, dict):
            invalid.append("non-dict entry")
            continue
        q = (entry.get("question") or "").strip()
        a = (entry.get("answer") or "").strip()
        if not q or not a:
            invalid.append(f"missing q or a in entry: {entry}")
            continue
        if _normalise_question(q) in existing_questions:
            rejected_dupes.append(q)
            continue
        if not (10 <= len(q) <= 200):
            invalid.append(f"question length {len(q)} out of [10,200]: {q[:50]}")
            continue
        a_words = len(a.split())
        if not (20 <= a_words <= 400):
            invalid.append(f"answer word count {a_words} out of [20,400]: {q[:50]}")
            continue
        ok, det = no_banned_chars(q + " " + a)
        if not ok:
            invalid.append(f"banned char in entry: {q[:30]} ({det})")
            continue
        ok, det = no_banned_phrases(q + " " + a)
        if not ok:
            invalid.append(f"banned phrase in entry: {q[:30]} ({det})")
            continue
        accepted.append({"question": q, "answer": a})

    brief.change_summary = (
        f"Append {len(accepted)} new FAQ entr{'y' if len(accepted) == 1 else 'ies'} to {slug}"
    )
    brief.change_diff = {
        "existing_faq_count": len(existing_faqs),
        "entries_accepted": [e["question"] for e in accepted],
        "entries_rejected_as_duplicates": rejected_dupes,
        "entries_rejected_invalid": invalid,
        "final_faq_count": len(existing_faqs) + len(accepted),
    }
    brief.internal_data["accepted_entries"] = accepted

    # Validators
    if not rel_path:
        brief.add_validation("path_resolvable", False, "could not resolve slug to filesystem path")
    else:
        ok, det = file_exists(path)
        brief.add_validation("file_exists", ok, det)
    brief.add_validation(
        "at_least_one_accepted_entry",
        len(accepted) >= 1,
        f"{len(accepted)} accepted, {len(rejected_dupes)} dupes, {len(invalid)} invalid",
    )

    brief.finalise_can_apply()
    return brief


def apply(brief: ChangeBrief) -> dict:
    path = ROOT / brief.target_file_path
    accepted = brief.internal_data.get("accepted_entries") or []

    def _edit(b: ChangeBrief) -> tuple[str, str]:
        fm, body = read(path)
        existing = list(fm.get("faqs") or [])
        before = f"faq_count={len(existing)}"
        merged = existing + accepted
        fm["faqs"] = merged
        write(path, fm, body)
        after = f"faq_count={len(merged)} (added: {[e['question'][:50] for e in accepted]})"
        return before, after

    return run_apply_lifecycle(
        brief=brief,
        edit_fn=_edit,
        change_type=CHANGE_TYPE,
        confidence="medium",  # FAQ additions need slightly more human review than meta
        auto_applied=True,
    )
