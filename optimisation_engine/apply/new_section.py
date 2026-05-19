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

    brief.change_summary = f"Add new H2 section '{new_heading}' to {slug}"
    brief.change_diff = {
        "new_h2_heading": new_heading,
        "outline_points": outline,
        "target_word_count": target_words,
        "insertion_point": insertion_point,
        "insertion_offset_chars": offset,
        "body_word_count_before": word_count_before,
        "_body_html_pending": "(generated by DeepSeek at apply time — see internal_data after build)",
    }
    brief.internal_data["insertion_offset"] = offset
    brief.internal_data["new_heading"] = new_heading

    # Validators
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
    # Heading not duplicating existing H2
    existing_norm = {h.lower().strip() for h in existing_h2s}
    brief.add_validation(
        "heading_not_duplicate",
        new_heading.lower().strip() not in existing_norm,
        "" if new_heading.lower().strip() not in existing_norm else f"H2 {new_heading!r} already exists",
    )

    brief.finalise_can_apply()
    return brief


def apply(brief: ChangeBrief) -> dict:
    path = ROOT / brief.target_file_path
    new_heading = brief.internal_data.get("new_heading")
    offset = brief.internal_data.get("insertion_offset")
    if offset is None or not new_heading:
        raise ApplyError("brief.internal_data missing insertion_offset or new_heading")

    # Generate body
    site_key = brief.site_key
    outline = brief.change_diff["outline_points"]
    target_words = brief.change_diff["target_word_count"]
    primary_q = brief.opportunity_signal.get("primary_query") or ""
    cluster = brief.opportunity_signal.get("cluster") or []
    page_title = brief.current_state.get("title") or ""

    gen = write_new_section_body(
        site_key=site_key,
        page_title=page_title,
        section_heading=new_heading,
        section_outline=outline,
        target_word_count=target_words,
        primary_query=primary_q,
        cluster=cluster,
    )
    if not gen.auto_applicable:
        raise ApplyError(f"section body generation failed validators: {gen.notes}")
    body_html = gen.output.get("body_html") or ""
    if not body_html:
        raise ApplyError("DeepSeek returned empty body_html")

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
