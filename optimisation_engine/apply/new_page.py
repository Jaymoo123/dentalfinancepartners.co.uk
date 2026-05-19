"""
apply_new_page — build a complete new blog post markdown file.

The HEAVIEST of the apply modules. Generates frontmatter (title, metaTitle,
metaDescription, h1, summary, faqs, schema) AND a full HTML-in-markdown
body from the Action Specifier's outline.

Safety:
  - Target slug must NOT already exist as a file
  - All generated text validated against brand voice
  - Frontmatter must round-trip parse
  - Word count must reach 50% of the target (proxy for completeness)
"""
from __future__ import annotations

import json
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.apply._content_writer import write_new_page_content  # noqa: E402
from optimisation_engine.apply.base import (  # noqa: E402
    ApplyError,
    run_apply_lifecycle,
    slug_to_path,
)
from optimisation_engine.apply.brief import ChangeBrief  # noqa: E402
from optimisation_engine.apply.frontmatter_utils import (  # noqa: E402
    estimate_word_count,
    read,
    write,
)
from optimisation_engine.apply.validators import no_banned_chars  # noqa: E402
from optimisation_engine.config import get_site  # noqa: E402

CHANGE_TYPE = "new_content"


def build_brief(opportunity: dict) -> ChangeBrief:
    site_key = opportunity["site_key"]
    primary_q = opportunity.get("primary_query") or ""
    cluster = opportunity.get("target_query_cluster") or [primary_q]

    plan = opportunity.get("action_plan") or {}
    patch = plan.get("patch") or {}
    np_patch = patch.get("new_page") or {}

    proposed_slug = np_patch.get("proposed_slug") or ""
    page_type = np_patch.get("page_type") or "blog_post"
    primary_h1 = np_patch.get("primary_h1") or ""
    section_outline = np_patch.get("section_outline") or []
    schema_to_include = np_patch.get("schema_to_include") or ["Article", "BreadcrumbList"]
    target_words = int(np_patch.get("target_word_count") or 1500)

    site = get_site(site_key)
    target_url = f"https://{site['domain']}/blog/{proposed_slug}"
    proposed_path = slug_to_path(site_key, proposed_slug) if proposed_slug else None
    rel_path = str(proposed_path.relative_to(ROOT)) if proposed_path else ""

    brief = ChangeBrief(
        apply_module="new_page",
        site_key=site_key,
        target_url=target_url,
        target_file_path=rel_path,
        opportunity_id=opportunity.get("id"),
        files_to_modify=[rel_path] if rel_path else [],
    )

    brief.current_state = {
        "site": site["display_name"],
        "proposed_slug": proposed_slug,
        "proposed_path": rel_path,
        "slug_exists_already": bool(proposed_path and proposed_path.exists()),
    }

    brief.opportunity_rationale = opportunity.get("rationale") or plan.get("rationale") or ""
    brief.opportunity_signal = {
        "primary_query": primary_q,
        "cluster": cluster[:5],
        "page_type": page_type,
        "target_word_count": target_words,
        "score": opportunity.get("score"),
        "action_specifier_confidence": opportunity.get("action_plan_confidence"),
    }

    # Pre-LLM validators
    brief.add_validation(
        "slug_present",
        bool(proposed_slug and len(proposed_slug) >= 6),
        f"slug={proposed_slug!r}",
    )
    brief.add_validation(
        "slug_does_not_exist",
        not (proposed_path and proposed_path.exists()),
        "" if not (proposed_path and proposed_path.exists()) else f"file already exists: {rel_path}",
    )
    brief.add_validation(
        "primary_h1_present",
        bool(primary_h1 and 10 <= len(primary_h1) <= 100),
        f"h1_len={len(primary_h1) if primary_h1 else 0}",
    )
    brief.add_validation(
        "section_outline_substantive",
        len(section_outline) >= 3,
        f"{len(section_outline)} sections",
    )
    brief.add_validation(
        "target_word_count_realistic",
        500 <= target_words <= 4000,
        f"target={target_words}",
    )
    ok, det = no_banned_chars(primary_h1)
    brief.add_validation("h1_no_banned_chars", ok, det)

    if brief.blocking_issues:
        brief.change_summary = f"Create new page /blog/{proposed_slug} (blocked — see validators)"
        brief.change_diff = {
            "proposed_slug": proposed_slug,
            "proposed_path": rel_path,
            "primary_h1": primary_h1,
            "section_outline": section_outline,
            "target_word_count": target_words,
            "content_preview": "(skipped — pre-LLM validators failed)",
        }
        brief.internal_data["np_patch"] = np_patch
        brief.finalise_can_apply()
        return brief

    # --- Generate full page content NOW --------------------------------------
    from optimisation_engine.apply._content_writer import write_new_page_content
    try:
        gen = write_new_page_content(
            site_key=site_key,
            proposed_slug=proposed_slug,
            page_type=page_type,
            primary_h1=primary_h1,
            section_outline=section_outline,
            schema_to_include=schema_to_include,
            target_word_count=target_words,
            primary_query=primary_q,
            cluster=cluster,
        )
    except Exception as exc:
        brief.add_validation("page_generation", False, f"LLM call failed: {type(exc).__name__}: {exc}")
        brief.finalise_can_apply()
        return brief

    content = gen.output or {}
    body_html = content.get("body_html") or ""
    from optimisation_engine.apply.frontmatter_utils import estimate_word_count
    word_count = estimate_word_count(body_html)

    brief.change_summary = f"Create new page /blog/{proposed_slug} ({page_type})"
    brief.change_diff = {
        "proposed_slug": proposed_slug,
        "proposed_path": rel_path,
        "page_type": page_type,
        "generated_title": content.get("title"),
        "generated_metaTitle": content.get("metaTitle"),
        "generated_metaDescription": content.get("metaDescription"),
        "generated_h1": content.get("h1") or primary_h1,
        "generated_summary": content.get("summary"),
        "section_outline_target": section_outline,
        "schema_to_include": schema_to_include,
        "target_word_count": target_words,
        "generated_body_word_count": word_count,
        "generated_body_preview_first_1000_chars": body_html[:1000],
        "generated_faqs": content.get("faqs") or [],
        "llm_confidence": gen.confidence,
        "llm_cost_usd": round(gen.cost_usd, 6),
        "llm_validator_notes": gen.notes,
    }
    brief.internal_data["np_patch"] = np_patch
    brief.internal_data["generated_content"] = content
    brief.internal_data["generated_word_count"] = word_count

    # Post-LLM validators
    brief.add_validation(
        "content_generation_ok",
        gen.auto_applicable and bool(body_html),
        f"llm_confidence={gen.confidence}, body_chars={len(body_html)}, notes={gen.notes}",
    )
    brief.add_validation(
        "generated_word_count_meets_minimum",
        word_count >= target_words * 0.5,
        f"got {word_count} words vs minimum {int(target_words*0.5)}",
    )

    brief.finalise_can_apply()
    return brief


def apply(brief: ChangeBrief) -> dict:
    np_patch = brief.internal_data.get("np_patch") or {}
    content = brief.internal_data.get("generated_content")
    if not content:
        raise ApplyError("brief.internal_data missing generated_content")

    proposed_slug = np_patch.get("proposed_slug")
    primary_h1 = np_patch.get("primary_h1") or ""
    target_words = int(np_patch.get("target_word_count") or 1500)
    page_type = np_patch.get("page_type") or "blog_post"

    site_key = brief.site_key
    site = get_site(site_key)
    page_path = slug_to_path(site_key, proposed_slug)

    # Re-confirm slug still doesn't exist (race condition safety)
    if page_path.exists():
        raise ApplyError(f"slug already taken at apply time: {page_path}")

    body_html = content.get("body_html") or ""
    word_count = brief.internal_data.get("generated_word_count") or estimate_word_count(body_html)

    # Construct frontmatter
    domain = site["domain"]
    # Try to infer category from URL slug — fall back to site default
    fm = {
        "title": content.get("title") or primary_h1,
        "slug": proposed_slug,
        "canonical": f"https://{domain}/blog/{proposed_slug}",
        "date": date.today().isoformat(),
        "author": f"{site['display_name']} Editorial Team",
        "category": np_patch.get("category") or "General",
        "metaTitle": content.get("metaTitle") or "",
        "metaDescription": content.get("metaDescription") or "",
        "altText": f"{primary_h1} illustration",
        "image": "",
        "h1": content.get("h1") or primary_h1,
        "summary": content.get("summary") or "",
        "schema": "",
        "faqs": content.get("faqs") or [],
    }

    # Ensure no banned chars escaped into any field
    for k in ("title", "metaTitle", "metaDescription", "h1", "summary"):
        if isinstance(fm.get(k), str):
            ok, det = no_banned_chars(fm[k])
            if not ok:
                raise ApplyError(f"{k} contains banned char: {det}")

    # Construct file path (only set if everything passes)
    page_path.parent.mkdir(parents=True, exist_ok=True)
    # Create empty file then use write helper
    page_path.write_text("---\nplaceholder: true\n---\n", encoding="utf-8")

    def _edit(b: ChangeBrief) -> tuple[str, str]:
        write(page_path, fm, body_html)
        return "(new file)", f"slug={proposed_slug} word_count={word_count} faqs={len(fm['faqs'])}"

    try:
        return run_apply_lifecycle(
            brief=brief,
            edit_fn=_edit,
            change_type=CHANGE_TYPE,
            confidence="low",  # new pages are highest-risk — queue for human review
            auto_applied=False,  # never autonomously ship a new page; always require review
        )
    except Exception:
        if page_path.exists():
            page_path.unlink()
        raise
