"""
apply_in_text_embedding — weave query variants into existing prose without
changing meaning.

Patch shape (from Action Specifier):
  patch.in_text_embedding = {
    "weave_into_intro_paragraph": ["variant 1", "variant 2"],
    "weave_into_h2_headings": ["heading that should mention variant"],
    "do_not_keyword_stuff": True
  }

Strategy:
  1. Identify the first <p>...</p> in the body (the intro).
  2. Pass it to DeepSeek with the variants list.
  3. DeepSeek rewrites the paragraph to incorporate variants naturally.
  4. Replace the original paragraph in body.
  5. Validate: substance unchanged (length within ±25 words), variants appear,
     no em-dashes, no removed <a>/<strong> tags.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.apply._content_writer import rewrite_for_embedding  # noqa: E402
from optimisation_engine.apply.base import (  # noqa: E402
    ApplyError,
    run_apply_lifecycle,
    slug_to_path,
    url_to_slug,
)
from optimisation_engine.apply.brief import ChangeBrief  # noqa: E402
from optimisation_engine.apply.frontmatter_utils import read, write  # noqa: E402
from optimisation_engine.apply.validators import (  # noqa: E402
    file_exists,
    no_banned_chars,
    valid_markdown_after_edit,
)

CHANGE_TYPE = "in_text_embedding"


def _first_paragraph(body: str) -> tuple[str | None, int, int]:
    """Find the first <p>...</p>. Returns (text_with_tags, start, end) or (None, -1, -1)."""
    m = re.search(r"<p[^>]*>.*?</p>", body, flags=re.DOTALL | re.IGNORECASE)
    if not m:
        return None, -1, -1
    return m.group(0), m.start(), m.end()


def _count_tags(text: str, tag: str) -> int:
    return len(re.findall(rf"<{tag}\b", text or "", flags=re.IGNORECASE))


def build_brief(opportunity: dict) -> ChangeBrief:
    site_key = opportunity["site_key"]
    target_url = opportunity.get("target_url") or ""
    slug = url_to_slug(target_url) or opportunity.get("target_slug")

    plan = opportunity.get("action_plan") or {}
    patch = plan.get("patch") or {}
    embed_patch = patch.get("in_text_embedding") or {}
    variants = embed_patch.get("weave_into_intro_paragraph") or []

    path = slug_to_path(site_key, slug) if slug else None
    rel_path = str(path.relative_to(ROOT)) if path else ""

    brief = ChangeBrief(
        apply_module="in_text_embedding",
        site_key=site_key,
        target_url=target_url,
        target_file_path=rel_path,
        opportunity_id=opportunity.get("id"),
        files_to_modify=[rel_path] if rel_path else [],
    )

    if not path or not path.exists():
        brief.add_validation("file_exists", False, f"page not found: {path}")
        brief.finalise_can_apply()
        return brief

    fm, body = read(path)
    intro, start, end = _first_paragraph(body)

    brief.current_state = {
        "slug": slug,
        "title": fm.get("title"),
        "intro_paragraph_preview": (intro or "")[:400],
        "intro_word_count": len((intro or "").split()),
    }

    brief.opportunity_rationale = opportunity.get("rationale") or plan.get("rationale") or ""
    brief.opportunity_signal = {
        "primary_query": opportunity.get("primary_query"),
        "variants_to_weave": variants,
        "score": opportunity.get("score"),
    }

    # Pre-LLM validators
    brief.add_validation("file_exists", True, "")
    brief.add_validation(
        "intro_paragraph_found",
        intro is not None,
        f"chars=[{start}:{end}]" if intro else "no <p>...</p> in body",
    )
    brief.add_validation(
        "variants_to_weave_present",
        len(variants) >= 1,
        f"{len(variants)} variants",
    )

    if brief.blocking_issues:
        brief.change_summary = f"Rewrite intro of {slug} (blocked — see validators)"
        brief.change_diff = {
            "variants_to_weave": variants,
            "intro_before_preview": (intro or "")[:300],
            "rewritten_paragraph_preview": "(skipped — pre-LLM validators failed)",
        }
        brief.finalise_can_apply()
        return brief

    # --- Generate rewritten paragraph NOW ------------------------------------
    from optimisation_engine.apply._content_writer import rewrite_for_embedding
    try:
        gen = rewrite_for_embedding(
            site_key=site_key,
            page_title=fm.get("title") or "",
            target_paragraph=intro or "",
            query_variants_to_weave=variants,
        )
    except Exception as exc:
        brief.add_validation("rewrite_generation", False, f"LLM call failed: {type(exc).__name__}: {exc}")
        brief.finalise_can_apply()
        return brief

    rewritten = (gen.output or {}).get("rewritten_paragraph") or ""

    # Deterministic em-dash strip on the LLM output (safety net)
    from optimisation_engine.apply._citation_renderer import strip_em_dashes
    rewritten = strip_em_dashes(rewritten)

    # If LLM removed a <strong> tag, try to restore it by wrapping the same
    # word that was originally wrapped (deterministic safety net)
    strong_matches_before = re.findall(r"<strong>([^<]+)</strong>", intro or "", flags=re.IGNORECASE)
    strong_count_after = len(re.findall(r"<strong\b", rewritten, flags=re.IGNORECASE))
    if strong_matches_before and strong_count_after < len(strong_matches_before):
        # For each missing <strong>X</strong>, wrap the first occurrence of X in rewritten
        for term in strong_matches_before:
            if f"<strong>{term}</strong>" in rewritten:
                continue
            if term in rewritten:
                rewritten = rewritten.replace(term, f"<strong>{term}</strong>", 1)

    # Tag-preservation check (after deterministic fixes)
    a_count_before = len(re.findall(r"<a\b", intro or "", flags=re.IGNORECASE))
    a_count_after = len(re.findall(r"<a\b", rewritten, flags=re.IGNORECASE))
    strong_before = len(re.findall(r"<strong\b", intro or "", flags=re.IGNORECASE))
    strong_after = len(re.findall(r"<strong\b", rewritten, flags=re.IGNORECASE))
    orig_words = len((intro or "").split())
    new_words = len(rewritten.split())
    word_drift = abs(new_words - orig_words)

    brief.change_summary = f"Rewrite intro paragraph of {slug} to weave {len(variants)} query variant(s)"
    brief.change_diff = {
        "variants_to_weave": variants,
        "intro_before": (intro or "")[:500],
        "intro_after_rewrite": rewritten[:500],
        "word_count_drift": word_drift,
        "tag_counts_before": {"a": a_count_before, "strong": strong_before},
        "tag_counts_after": {"a": a_count_after, "strong": strong_after},
        "llm_confidence": gen.confidence,
        "llm_cost_usd": round(gen.cost_usd, 6),
        "llm_validator_notes": gen.notes,
    }
    brief.internal_data["intro_start"] = start
    brief.internal_data["intro_end"] = end
    brief.internal_data["intro_original"] = intro or ""
    brief.internal_data["rewritten_paragraph"] = rewritten

    # Post-LLM validators
    brief.add_validation(
        "rewrite_generation_ok",
        gen.auto_applicable and bool(rewritten),
        f"llm_confidence={gen.confidence}, notes={gen.notes}",
    )
    brief.add_validation(
        "tag_preservation",
        a_count_after >= a_count_before and strong_after >= strong_before,
        f"a {a_count_before}->{a_count_after}, strong {strong_before}->{strong_after}",
    )
    brief.add_validation(
        "word_count_drift_acceptable",
        word_drift <= 30,
        f"drift={word_drift} words",
    )

    brief.finalise_can_apply()
    return brief


def apply(brief: ChangeBrief) -> dict:
    path = ROOT / brief.target_file_path
    start = brief.internal_data.get("intro_start")
    end = brief.internal_data.get("intro_end")
    intro_original = brief.internal_data.get("intro_original")
    new_para = brief.internal_data.get("rewritten_paragraph")

    if start is None or end is None or not intro_original or not new_para:
        raise ApplyError("brief.internal_data missing intro positioning or rewritten_paragraph")

    research_bundle = brief.internal_data.get("research_bundle")

    def _edit(b: ChangeBrief) -> tuple[str, str]:
        from optimisation_engine.apply._citation_renderer import merge_references_into_body

        fm, body = read(path)
        before = intro_original
        new_body = body[:start] + new_para + body[end:]
        if research_bundle is not None:
            new_body = merge_references_into_body(new_body, research_bundle)
        ok, det = valid_markdown_after_edit(new_body)
        if not ok:
            raise ApplyError(f"post-edit markdown validation failed: {det}")
        write(path, fm, new_body)
        return before, new_para

    return run_apply_lifecycle(
        brief=brief,
        edit_fn=_edit,
        change_type=CHANGE_TYPE,
        confidence="medium",
        auto_applied=True,
    )
