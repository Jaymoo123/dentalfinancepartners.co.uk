"""
apply_new_section — insert a new H2 + body at a specified insertion point.

LLM call (DeepSeek via _content_writer.write_new_section_body) generates
the body text. The HTML scaffold (<h2>...</h2>) is added deterministically.

Patch shape (from Action Specifier):
  patch.new_section = {
    "insertion_point": "after_h2_<existing_heading>" or "before_h2_<...>",
    "new_h2_heading": "Worked Example: ...",
    "new_body_outline": ["point 1", "point 2", ...],
    "target_word_count": 400
  }
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.apply._content_writer import write_new_section_body  # noqa: E402
from optimisation_engine.apply.base import (  # noqa: E402
    ApplyError,
    run_apply_lifecycle,
    slug_to_path,
    url_to_slug,
)
from optimisation_engine.apply.brief import ChangeBrief  # noqa: E402
from optimisation_engine.apply.frontmatter_utils import (  # noqa: E402
    estimate_word_count,
    read,
    write,
)
from optimisation_engine.apply.validators import (  # noqa: E402
    file_exists,
    no_banned_chars,
    no_banned_phrases,
    valid_markdown_after_edit,
)

CHANGE_TYPE = "section_expansion"


def _parse_insertion_point(insertion_point: str) -> tuple[str, str]:
    """Returns (anchor: 'after'|'before', heading_text).

    Examples:
      'after_h2_What_Are_the_Rates'  -> ('after', 'What Are the Rates')
      'before_h2_Conclusion'         -> ('before', 'Conclusion')
    """
    m = re.match(r"^(after|before)_h2_(.+)$", insertion_point.strip())
    if not m:
        return "end_of_body", ""
    anchor = m.group(1)
    heading_text = m.group(2).replace("_", " ")
    return anchor, heading_text


def _find_insertion_offset(body: str, anchor: str, heading_text: str) -> int | None:
    """Find character offset in body where the new section should go."""
    if anchor == "end_of_body":
        return len(body)
    if not heading_text:
        return None
    # Find the H2 with matching text (case-insensitive)
    rx = re.compile(r"<h2[^>]*>\s*" + re.escape(heading_text) + r"\s*</h2>", re.IGNORECASE)
    m = rx.search(body)
    if not m:
        # Fuzzy: try a partial match on the first 3+ word stems
        stem = " ".join(heading_text.split()[:3])
        if len(stem) >= 6:
            rx2 = re.compile(r"<h2[^>]*>([^<]*" + re.escape(stem) + r"[^<]*)</h2>", re.IGNORECASE)
            m = rx2.search(body)
        if not m:
            return None
    if anchor == "after":
        # Insert after the END of this section (i.e. before the NEXT <h2> or end of body)
        next_h2 = re.search(r"<h2[^>]*>", body[m.end():], re.IGNORECASE)
        if next_h2:
            return m.end() + next_h2.start()
        return len(body)
    if anchor == "before":
        return m.start()
    return None


def build_brief(opportunity: dict) -> ChangeBrief:
    site_key = opportunity["site_key"]
    target_url = opportunity.get("target_url") or ""
    slug = url_to_slug(target_url) or opportunity.get("target_slug")

    plan = opportunity.get("action_plan") or {}
    patch = plan.get("patch") or {}
    section_patch = patch.get("new_section") or {}
    insertion_point = section_patch.get("insertion_point") or "end_of_body"
    new_heading = section_patch.get("new_h2_heading") or ""
    outline = section_patch.get("new_body_outline") or []
    target_words = int(section_patch.get("target_word_count") or 350)

    path = slug_to_path(site_key, slug) if slug else None
    rel_path = str(path.relative_to(ROOT)) if path else ""

    brief = ChangeBrief(
        apply_module="new_section",
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
    existing_h2s = re.findall(r"<h2[^>]*>([^<]+)</h2>", body)
    word_count_before = estimate_word_count(body)

    brief.current_state = {
        "slug": slug,
        "title": fm.get("title"),
        "existing_h2s": existing_h2s,
        "body_word_count": word_count_before,
    }

    brief.opportunity_rationale = opportunity.get("rationale") or plan.get("rationale") or ""
    brief.opportunity_signal = {
        "primary_query": opportunity.get("primary_query"),
        "cluster": (opportunity.get("target_query_cluster") or [])[:5],
        "score": opportunity.get("score"),
        "action_specifier_confidence": opportunity.get("action_plan_confidence"),
    }

    # Compute insertion offset
    anchor, heading_text = _parse_insertion_point(insertion_point)
    offset = _find_insertion_offset(body, anchor, heading_text)

    # Initial validators (pre-LLM)
    brief.add_validation("file_exists", True, "")
    brief.add_validation(
        "heading_present",
        bool(new_heading and 10 <= len(new_heading) <= 100),
        f"len={len(new_heading) if new_heading else 0}",
    )
    brief.add_validation(
        "outline_present",
        len(outline) >= 1,
        f"{len(outline)} outline points",
    )
    brief.add_validation(
        "insertion_point_found",
        offset is not None,
        f"insertion_point={insertion_point} -> offset={offset}",
    )
    brief.add_validation(
        "target_word_count_sensible",
        100 <= target_words <= 800,
        f"target={target_words}",
    )
    ok, det = no_banned_chars(new_heading)
    brief.add_validation("heading_no_banned_chars", ok, det)
    ok, det = no_banned_phrases(new_heading)
    brief.add_validation("heading_no_hype_phrases", ok, det)
    existing_norm = {h.lower().strip() for h in existing_h2s}
    brief.add_validation(
        "heading_not_duplicate",
        new_heading.lower().strip() not in existing_norm,
        "" if new_heading.lower().strip() not in existing_norm else f"H2 {new_heading!r} already exists",
    )

    # If any pre-LLM validator failed, don't bother generating
    if brief.blocking_issues:
        brief.change_summary = f"Add new H2 section '{new_heading}' to {slug} (blocked — see validators)"
        brief.change_diff = {
            "new_h2_heading": new_heading,
            "outline_points": outline,
            "target_word_count": target_words,
            "insertion_point": insertion_point,
            "body_html_preview": "(skipped — pre-LLM validators failed)",
        }
        brief.finalise_can_apply()
        return brief

    # --- Research synthesis (multi-source grounding) ------------------------
    from optimisation_engine.apply._citation_renderer import (
        assemble_final_body,
        citation_density_meets_minimum,
        citation_diversity_meets_minimum,
    )
    from optimisation_engine.apply._content_writer import write_new_section_body
    from optimisation_engine.reasoning.research_synthesizer import synthesize_research

    primary_q = opportunity.get("primary_query") or ""
    cluster = (opportunity.get("target_query_cluster") or [])[:5]
    page_title = fm.get("title") or ""

    try:
        research_bundle = synthesize_research(topic_query=primary_q, site_key=site_key)
    except Exception as exc:
        brief.add_validation("research_synthesis", False, f"research failed: {type(exc).__name__}: {exc}")
        brief.finalise_can_apply()
        return brief

    # --- Generate body (research-grounded) -----------------------------------
    try:
        gen = write_new_section_body(
            site_key=site_key,
            page_title=page_title,
            section_heading=new_heading,
            section_outline=outline,
            target_word_count=target_words,
            primary_query=primary_q,
            cluster=cluster,
            research_bundle=research_bundle,
        )
    except Exception as exc:
        brief.add_validation("body_generation", False, f"LLM call failed: {type(exc).__name__}: {exc}")
        brief.finalise_can_apply()
        return brief

    raw_body_html = (gen.output or {}).get("body_html") or ""
    body_html = assemble_final_body(raw_body_html, research_bundle, append_references=False)
    # We DON'T append references for new_section because the references go on the
    # whole page, not per-section. Body keeps the [n] markers rendered as
    # superscript links pointing at the page's existing References section
    # (or a new one if the page doesn't yet have one).

    # --- Citation validators ------------------------------------------------
    ok_density, det_density = citation_density_meets_minimum(raw_body_html, min_per_1000_words=4.0)
    ok_diversity, det_diversity = citation_diversity_meets_minimum(
        raw_body_html, research_bundle, min_unique_sources=3, min_tier_types=2
    )

    brief.change_summary = f"Add new H2 section '{new_heading}' to {slug} (research-grounded, {len(research_bundle.sources)} sources)"
    brief.change_diff = {
        "new_h2_heading": new_heading,
        "outline_points": outline,
        "target_word_count": target_words,
        "insertion_point": insertion_point,
        "insertion_offset_chars": offset,
        "body_word_count_before": word_count_before,
        "generated_body_html": body_html,
        "generated_word_count_estimate": (gen.output or {}).get("word_count"),
        "research_sources_count": len(research_bundle.sources),
        "research_claims_count": len(research_bundle.claims),
        "research_tiers_covered": research_bundle.diversity_tier_count,
        "research_canonical_present": research_bundle.canonical_sources_present,
        "research_cost_usd": round(research_bundle.total_serper_cost_usd + research_bundle.total_deepseek_cost_usd, 4),
        "llm_confidence": gen.confidence,
        "llm_cost_usd": round(gen.cost_usd, 6),
        "llm_validator_notes": gen.notes,
        "citation_density_detail": det_density,
        "citation_diversity_detail": det_diversity,
    }
    brief.internal_data["insertion_offset"] = offset
    brief.internal_data["new_heading"] = new_heading
    brief.internal_data["generated_body_html"] = body_html
    brief.internal_data["research_bundle"] = research_bundle

    # Post-LLM validators
    brief.add_validation(
        "body_generation_ok",
        gen.auto_applicable and bool(body_html),
        f"llm_confidence={gen.confidence}, body_chars={len(body_html)}, notes={gen.notes}",
    )
    brief.add_validation("citation_density", ok_density, det_density)
    brief.add_validation("citation_diversity", ok_diversity, det_diversity)
    brief.add_validation(
        "canonical_source_cited",
        research_bundle.canonical_sources_present,
        f"canonical_sources_in_bundle={research_bundle.canonical_sources_present}",
    )

    brief.finalise_can_apply()
    return brief


def apply(brief: ChangeBrief) -> dict:
    path = ROOT / brief.target_file_path
    new_heading = brief.internal_data.get("new_heading")
    offset = brief.internal_data.get("insertion_offset")
    body_html = brief.internal_data.get("generated_body_html")
    if offset is None or not new_heading or not body_html:
        raise ApplyError("brief.internal_data missing offset / heading / generated_body_html")

    section_block = f"\n\n<h2>{new_heading}</h2>\n{body_html.strip()}\n"

    def _edit(b: ChangeBrief) -> tuple[str, str]:
        fm, body = read(path)
        before = body[max(0, offset - 200) : offset + 200] if 0 <= offset <= len(body) else body[:600]
        new_body = body[:offset] + section_block + body[offset:]
        ok, det = valid_markdown_after_edit(new_body)
        if not ok:
            raise ApplyError(f"post-edit markdown validation failed: {det}")
        write(path, fm, new_body)
        after = new_body[max(0, offset - 200) : offset + 200 + len(section_block)]
        return before, after

    return run_apply_lifecycle(
        brief=brief,
        edit_fn=_edit,
        change_type=CHANGE_TYPE,
        confidence="medium",
        auto_applied=True,
    )
