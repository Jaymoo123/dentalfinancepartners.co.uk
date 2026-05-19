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

    brief.change_summary = f"Rewrite intro paragraph of {slug} to weave {len(variants)} query variant(s)"
    brief.change_diff = {
        "variants_to_weave": variants,
        "intro_start": start,
        "intro_end": end,
        "intro_before_preview": (intro or "")[:300],
        "_intro_replaced_pending": "(rewritten by DeepSeek at apply time)",
    }
    brief.internal_data["intro_start"] = start
    brief.internal_data["intro_end"] = end
    brief.internal_data["intro_original"] = intro or ""

    # Validators
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

    brief.finalise_can_apply()
    return brief


def apply(brief: ChangeBrief) -> dict:
    path = ROOT / brief.target_file_path
    start = brief.internal_data.get("intro_start")
    end = brief.internal_data.get("intro_end")
    intro_original = brief.internal_data.get("intro_original")
    variants = brief.opportunity_signal.get("variants_to_weave") or []
    page_title = brief.current_state.get("title") or ""

    if start is None or end is None or not intro_original:
        raise ApplyError("brief.internal_data missing intro positioning")

    # Original tag counts — must be preserved after rewrite
    a_count = _count_tags(intro_original, "a")
    strong_count = _count_tags(intro_original, "strong")
    orig_words = len(intro_original.split())

    gen = rewrite_for_embedding(
        site_key=brief.site_key,
        page_title=page_title,
        target_paragraph=intro_original,
        query_variants_to_weave=variants,
    )
    if not gen.auto_applicable:
        raise ApplyError(f"embedding rewrite failed validators: {gen.notes}")
    new_para = gen.output.get("rewritten_paragraph") or ""
    if not new_para:
        raise ApplyError("DeepSeek returned empty rewritten_paragraph")
    new_words = len(new_para.split())
    if abs(new_words - orig_words) > 30:
        raise ApplyError(f"rewrite word count drift too large: {orig_words} -> {new_words}")
    if _count_tags(new_para, "a") < a_count:
        raise ApplyError(f"rewrite removed <a> tags: {a_count} -> {_count_tags(new_para, 'a')}")
    if _count_tags(new_para, "strong") < strong_count:
        raise ApplyError(f"rewrite removed <strong> tags: {strong_count} -> {_count_tags(new_para, 'strong')}")
    ok, det = no_banned_chars(new_para)
    if not ok:
        raise ApplyError(f"rewrite introduced banned char: {det}")

    def _edit(b: ChangeBrief) -> tuple[str, str]:
        fm, body = read(path)
        before = intro_original
        new_body = body[:start] + new_para + body[end:]
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
