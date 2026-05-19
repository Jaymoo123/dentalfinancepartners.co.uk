"""
Self-heal loop for apply briefs.

When build_brief returns can_apply=False, instead of moving on we:

  1. Classify each blocking_issue as "retryable" or "fatal"
  2. Apply deterministic fixes where we can (em-dash strip, char-limit truncate)
  3. For LLM-fixable issues, call DeepSeek with a focused correction prompt
     showing the specific failure + the original output + the rule
  4. Update the opportunity's action_plan in place
  5. Re-build the brief
  6. Loop up to MAX_RETRIES times
  7. If still blocked after max retries, return the final blocked brief

Cost per retry attempt: ~$0.001 (small focused prompt).

Fatal blockers (no retry):
  - file_exists: target file missing on disk
  - slug_does_not_exist: file already exists (new_page case)
  - path_resolvable: opp lacks a valid target

Retryable blockers (LLM correction):
  - metaTitle_char_limit / metaDescription_char_limit
  - *_no_banned_chars (em-dash slipped in)
  - *_no_hype_phrases
  - heading_no_banned_chars / heading_no_hype_phrases
  - tag_preservation (in_text_embedding)
  - word_count_drift_acceptable (in_text_embedding)
  - citation_density / citation_diversity
  - canonical_source_cited
  - generated_word_count_meets_minimum (new_page)
  - body_generation_ok / content_generation_ok (if notes show validator failures)
"""
from __future__ import annotations

import json
import re
from typing import Any

from optimisation_engine.apply._citation_renderer import strip_em_dashes
from optimisation_engine.apply.brief import ChangeBrief

MAX_RETRIES = 2  # plus the initial build = 3 total attempts


_FATAL_BLOCKERS = {
    "file_exists",
    "slug_does_not_exist",
    "path_resolvable",
    "slug_present",
    "primary_h1_present",
    "outline_present",
    "section_outline_substantive",
    "research_synthesis",  # research itself failed; unlikely to recover
    "target_word_count_realistic",
    "target_word_count_sensible",
    "heading_present",
    "intro_paragraph_found",
    "variants_to_weave_present",
}


def classify_blockers(blocking_issues: list[str]) -> tuple[list[str], list[str]]:
    """Split into (retryable, fatal). Each item is the raw blocker string."""
    retryable: list[str] = []
    fatal: list[str] = []
    for b in blocking_issues:
        # Each blocker string looks like "<name>: <detail>"
        name = b.split(":", 1)[0].strip()
        if name in _FATAL_BLOCKERS:
            fatal.append(b)
        else:
            retryable.append(b)
    return retryable, fatal


# ---------------------------------------------------------------------------
# Deterministic fixes
# ---------------------------------------------------------------------------


def deterministic_em_dash_strip(action_plan: dict) -> bool:
    """Strip em-dashes everywhere in the action_plan. Returns True if anything changed."""
    changed = False

    def _walk(obj):
        nonlocal changed
        if isinstance(obj, str):
            new = strip_em_dashes(obj)
            if new != obj:
                changed = True
            return new
        if isinstance(obj, list):
            return [_walk(x) for x in obj]
        if isinstance(obj, dict):
            return {k: _walk(v) for k, v in obj.items()}
        return obj

    cleaned = _walk(action_plan)
    if changed:
        action_plan.clear()
        action_plan.update(cleaned)
    return changed


def deterministic_truncate_title(action_plan: dict, max_chars: int = 60) -> bool:
    """Conservative truncate of metaTitle if it's the simple "too long" case.

    Strategy: trim at a word boundary near max_chars, append nothing (don't
    add ellipsis). Only used if LLM correction also fails.
    """
    patch = action_plan.get("patch") or {}
    meta = patch.get("meta_only") or patch
    title = meta.get("metaTitle") or meta.get("metaTitle_new")
    if not isinstance(title, str) or len(title) <= max_chars:
        return False
    # Try to trim at a word boundary
    truncated = title[:max_chars].rsplit(" ", 1)[0].rstrip(",;:-")
    if len(truncated) < 30:
        truncated = title[:max_chars].rstrip(",;:-")
    if "metaTitle" in meta:
        meta["metaTitle"] = truncated
    if "metaTitle_new" in meta:
        meta["metaTitle_new"] = truncated
    return True


# ---------------------------------------------------------------------------
# LLM correction calls
# ---------------------------------------------------------------------------


def llm_correct_meta_title(*, current_title: str, max_chars: int, primary_query: str, primary_h1: str, site_key: str | None = None) -> str | None:
    """Ask DeepSeek to shorten a metaTitle to fit the char limit."""
    from optimisation_engine.reasoning.deepseek_runner import require_keys, run_reasoning

    user_input = f"""CURRENT metaTitle (TOO LONG):
  {current_title!r}   ({len(current_title)} chars)

CONSTRAINTS:
  - Must be at most {max_chars} characters (including spaces)
  - Must be at least 30 characters
  - Must contain the primary query token or close variant: {primary_query!r}
  - Must NOT contain em-dashes (—) or en-dashes (–)
  - Must NOT contain hype words: 'ultimate', 'amazing', 'discover', 'unlock'
  - Must read naturally and remain SEO-relevant

PAGE H1 for context: {primary_h1!r}
SITE: {site_key}

Rewrite the metaTitle to fit within the character limit while keeping the
primary query and the value proposition.
"""

    try:
        result = run_reasoning(
            endpoint_name="self_heal_meta_title",
            role="a UK accounting SEO editor shortening a metaTitle to fit a character limit without losing meaning.",
            task="Rewrite the metaTitle to fit the character limit.",
            schema_description='{"metaTitle": string, "confidence": int}',
            must_not=[
                f"produce metaTitle longer than {max_chars} characters",
                "use em-dashes or en-dashes",
                "use hype words",
                "drop the primary query token",
            ],
            examples=[
                {
                    "input": "CURRENT (64 chars): 'HMRC CGT Reporting Requirements 2026: 60-Day Property Sales Rule'\nMAX: 60\nQUERY: 'hmrc cgt reporting requirements 2026'",
                    "output": {"metaTitle": "HMRC CGT Reporting Requirements 2026: 60-Day Rule", "confidence": 88},
                }
            ],
            validators=[
                require_keys("metaTitle"),
                lambda o: (True, None) if isinstance(o.get("metaTitle"), str) and 30 <= len(o["metaTitle"]) <= max_chars else (False, f"metaTitle out of [30, {max_chars}] bounds"),
                lambda o: (True, None) if "—" not in (o.get("metaTitle") or "") and "–" not in (o.get("metaTitle") or "") else (False, "em-dash present"),
            ],
            user_input=user_input,
            site_key=site_key,
            confidence_threshold=70,
            max_tokens=400,
            temperature=0.3,
        )
        return (result.output or {}).get("metaTitle")
    except Exception:
        return None


def llm_correct_meta_description(*, current_desc: str, min_chars: int, max_chars: int, primary_query: str, site_key: str | None = None) -> str | None:
    from optimisation_engine.reasoning.deepseek_runner import require_keys, run_reasoning

    n = len(current_desc)
    issue = "TOO LONG" if n > max_chars else "TOO SHORT"
    user_input = f"""CURRENT metaDescription ({issue}):
  {current_desc!r}   ({n} chars)

CONSTRAINTS:
  - Length must be between {min_chars} and {max_chars} characters (inclusive)
  - Must contain the primary query: {primary_query!r}
  - No em-dashes or en-dashes
  - No hype words
  - Must end with a clear value proposition or call-to-action

Rewrite to fit the length window while preserving meaning.
"""
    try:
        result = run_reasoning(
            endpoint_name="self_heal_meta_description",
            role="a UK accounting SEO editor adjusting a metaDescription to fit a character window.",
            task="Rewrite the metaDescription to fit the length window.",
            schema_description='{"metaDescription": string, "confidence": int}',
            must_not=[
                f"produce metaDescription outside [{min_chars}, {max_chars}] character bounds",
                "use em-dashes",
                "use hype words",
            ],
            examples=[],
            validators=[
                require_keys("metaDescription"),
                lambda o: (True, None) if isinstance(o.get("metaDescription"), str) and min_chars <= len(o["metaDescription"]) <= max_chars else (False, f"out of [{min_chars}, {max_chars}]"),
                lambda o: (True, None) if "—" not in (o.get("metaDescription") or "") and "–" not in (o.get("metaDescription") or "") else (False, "em-dash present"),
            ],
            user_input=user_input,
            site_key=site_key,
            confidence_threshold=70,
            max_tokens=500,
            temperature=0.3,
        )
        return (result.output or {}).get("metaDescription")
    except Exception:
        return None


# ---------------------------------------------------------------------------
# Apply targeted corrections to action_plan
# ---------------------------------------------------------------------------


def _build_corrective_context(blocking_issues: list[str]) -> str | None:
    """Generate a corrective-instruction block for the writer based on blockers."""
    instructions: list[str] = []
    for b in blocking_issues:
        bl = b.lower()
        if "citation_diversity" in bl and "unique sources" in bl:
            m = re.search(r"only (\d+) unique sources", bl)
            n_cited = int(m.group(1)) if m else 1
            instructions.append(
                f"PREVIOUS ATTEMPT ONLY CITED {n_cited} UNIQUE SOURCE(S). You MUST cite at "
                "least 5 different sources, spread across the body — use [n] markers "
                "referencing different source indices. Do NOT keep reusing the same one."
            )
        if "citation_density" in bl and "<" in b:
            instructions.append(
                "PREVIOUS ATTEMPT HAD CITATION DENSITY BELOW MINIMUM. Increase inline [n] "
                "markers — aim for 1 per 200 words. Every specific number / date / rule "
                "should have a [n] citation."
            )
        if "canonical_source_cited" in bl or "no canonical" in bl:
            instructions.append(
                "PREVIOUS ATTEMPT DID NOT CITE ANY CANONICAL SOURCE (gov.uk, HMRC, ONS, etc.). "
                "You MUST cite at least one canonical-tier source from the SOURCES list."
            )
        if "fact_check" in bl and "wrong values" in bl:
            instructions.append(
                "PREVIOUS ATTEMPT CONTAINED INCORRECT UK TAX FIGURES. ONLY use specific "
                "numbers/rates/thresholds that appear in the research bundle's claims. "
                "If unsure of an exact value, write 'current rates apply' instead."
            )
        if "no variant verbatim" in bl:
            instructions.append(
                "PREVIOUS ATTEMPT DID NOT INCLUDE ANY QUERY VARIANTS VERBATIM. You MUST "
                "include at least 2 of the listed variants exactly as written."
            )
        if "orphan citation indices" in bl or "indices in range" in bl and "max valid is" in bl:
            m_bad = re.search(r"orphan citation indices: \[([^\]]+)\]", b)
            m_max = re.search(r"max valid is (\d+)", b)
            bad_list = m_bad.group(1) if m_bad else "unknown"
            max_idx = m_max.group(1) if m_max else "N"
            instructions.append(
                f"PREVIOUS ATTEMPT USED CITATION MARKERS THAT POINT TO NOTHING: [{bad_list}]. "
                f"You have ONLY {max_idx} source(s) in the SOURCES list — valid markers are "
                f"[1] through [{max_idx}]. Remove any [n] where n is outside this range, or "
                "replace it with a valid [n] that actually appears in the SOURCES list. "
                "If you cannot cite a claim from the listed sources, REMOVE the claim — do NOT "
                "invent a marker number."
            )
    if not instructions:
        return None
    return "\n\n--- CORRECTIVE INSTRUCTIONS (this is a retry; fix these specifically) ---\n" + "\n".join(f"• {i}" for i in instructions)


def attempt_corrections(
    *,
    opportunity: dict,
    brief: ChangeBrief,
) -> tuple[bool, list[str]]:
    """Apply corrections in-place to opportunity['action_plan']. Returns
    (changed, notes) — changed=True if at least one correction was applied.

    Strategy:
      1. Deterministic em-dash strip (free)
      2. Targeted LLM rewrites for char-limit failures (meta_only)
      3. Corrective-context injection for content-generation kinds (new_section,
         new_page, in_text_embedding, format pages) via a transient hint on
         opportunity['_corrective_context'] that writers read from action_plan
         meta.
    """
    plan = opportunity.get("action_plan") or {}
    patch = plan.get("patch") or {}
    meta = patch.get("meta_only") or patch
    notes: list[str] = []
    any_changed = False

    # 1. Deterministic em-dash strip
    if deterministic_em_dash_strip(plan):
        notes.append("stripped em-dashes deterministically")
        any_changed = True

    # 2. LLM correction for metaTitle char-limit (covers meta_only)
    metatitle_blocker = next((b for b in brief.blocking_issues if "metaTitle_char_limit" in b), None)
    if metatitle_blocker:
        cur = meta.get("metaTitle") or meta.get("metaTitle_new") or ""
        new = llm_correct_meta_title(
            current_title=cur,
            max_chars=60,
            primary_query=opportunity.get("primary_query") or "",
            primary_h1=brief.current_state.get("h1") or brief.current_state.get("title") or "",
            site_key=opportunity.get("site_key"),
        )
        if new and new != cur:
            if "metaTitle" in meta:
                meta["metaTitle"] = new
            if "metaTitle_new" in meta:
                meta["metaTitle_new"] = new
            notes.append(f"LLM rewrote metaTitle: {len(cur)}->{len(new)} chars")
            any_changed = True

    # 3. LLM correction for metaDescription char-limit
    desc_blocker = next((b for b in brief.blocking_issues if "metaDescription_char_limit" in b), None)
    if desc_blocker:
        cur = meta.get("metaDescription") or meta.get("metaDescription_new") or ""
        new = llm_correct_meta_description(
            current_desc=cur,
            min_chars=120,
            max_chars=170,
            primary_query=opportunity.get("primary_query") or "",
            site_key=opportunity.get("site_key"),
        )
        if new and new != cur:
            if "metaDescription" in meta:
                meta["metaDescription"] = new
            if "metaDescription_new" in meta:
                meta["metaDescription_new"] = new
            notes.append(f"LLM rewrote metaDescription: {len(cur)}->{len(new)} chars")
            any_changed = True

    # 4. Corrective context for content-generation kinds (new_section, new_page, in_text_embedding, formats)
    correction = _build_corrective_context(brief.blocking_issues)
    if correction:
        opportunity["_corrective_context"] = correction
        notes.append("attached corrective_context for writer regeneration")
        any_changed = True

    return any_changed, notes


# ---------------------------------------------------------------------------
# Main entry — build_brief_with_self_heal
# ---------------------------------------------------------------------------


def build_brief_with_self_heal(opportunity: dict, *, max_retries: int = MAX_RETRIES, verbose: bool = True) -> tuple[ChangeBrief, list[dict]]:
    """Build a brief, then self-heal up to max_retries times if blocked.

    Returns (final_brief, attempt_log). attempt_log is a list of
    {attempt, can_apply, blockers, corrections}.
    """
    from optimisation_engine.apply.dispatcher import build_brief_for

    log: list[dict] = []
    brief = build_brief_for(opportunity)
    log.append({
        "attempt": 0,
        "can_apply": brief.can_apply,
        "blockers": list(brief.blocking_issues),
        "corrections": [],
    })

    if brief.can_apply:
        return brief, log

    for attempt in range(1, max_retries + 1):
        retryable, fatal = classify_blockers(brief.blocking_issues)
        if fatal:
            if verbose:
                print(f"  [self_heal] attempt {attempt}: fatal blocker, no retry: {fatal[0]}")
            break
        if not retryable:
            break

        changed, notes = attempt_corrections(opportunity=opportunity, brief=brief)
        if not changed:
            if verbose:
                print(f"  [self_heal] attempt {attempt}: no corrections produced; stopping")
            break

        brief = build_brief_for(opportunity)
        log.append({
            "attempt": attempt,
            "can_apply": brief.can_apply,
            "blockers": list(brief.blocking_issues),
            "corrections": notes,
        })

        if verbose:
            status = "READY" if brief.can_apply else "still blocked"
            print(f"  [self_heal] attempt {attempt}: {status} — {', '.join(notes)}")

        if brief.can_apply:
            break

    return brief, log
