"""
apply_internal_link — insert a markdown link in a sibling page body.

The opportunity here is a row in optimisation_changes where
change_type='internal_link' and auto_applied=false (queued by the
internal_link_suggester). Each row's diff_summary contains the suggester's
output: from_slug, anchor, insertion_hint, target_url.

What this does:
  1. Reads the FROM page (the sibling that gets the new outbound link).
  2. Finds an insertion point — preferably the exact phrase from the
     insertion_hint, otherwise the anchor text already in the body.
  3. Replaces the first occurrence with [anchor](relative_target_url).
  4. Validates: link target exists; anchor wasn't already in the body
     pointing to this URL; HTML/markdown still parses.
  5. Git commit + audit row.

Note: insertion_hint references PHRASES in the sibling body (e.g.
"replace 'CGT rates' with the link"). We extract phrases with regex.
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
)
from optimisation_engine.apply.brief import ChangeBrief  # noqa: E402
from optimisation_engine.apply.frontmatter_utils import (  # noqa: E402
    body_has_url,
    read,
    replace_first_phrase_with_link,
    write,
)
from optimisation_engine.apply.validators import (  # noqa: E402
    file_exists,
    markdown_link_format,
    no_banned_chars,
    valid_markdown_after_edit,
)

CHANGE_TYPE = "internal_link"


# Phrase-extraction helpers — insertion_hint usually references a phrase
# in single or double quotes (e.g. "replace 'CGT rates' with a link").
_HINT_PHRASE_RX = re.compile(r"['\"]([^'\"]{4,80})['\"]")


def _extract_candidate_phrases_from_hint(hint: str) -> list[str]:
    """Pull quoted phrases out of an insertion hint."""
    return _HINT_PHRASE_RX.findall(hint or "")


def _to_relative_url(target_url: str, site_domain: str) -> str:
    """Convert a full URL on our own domain to a relative path for internal linking."""
    if not target_url:
        return ""
    s = target_url
    for p in ("https://www.", "https://", "http://www.", "http://"):
        if s.startswith(p):
            s = s[len(p):]
            break
    if s.startswith(site_domain.lstrip("www.")):
        # strip domain, keep the path
        path = s[len(site_domain.lstrip("www.")):]
        return path if path.startswith("/") else "/" + path
    return target_url  # not on our domain — leave absolute


def build_brief_from_suggestion(*, site_key: str, from_slug: str, target_url: str, anchor_text: str, insertion_hint: str, source_change_id: str | None = None, opp_id: str | None = None) -> ChangeBrief:
    """Build a brief from the link-suggester output."""
    from_path = slug_to_path(site_key, from_slug)
    rel_path = str(from_path.relative_to(ROOT))

    site = None
    try:
        from optimisation_engine.config import get_site as _gs
        site = _gs(site_key)
    except Exception:
        site = {"domain": ""}
    relative_target = _to_relative_url(target_url, site["domain"])

    brief = ChangeBrief(
        apply_module="internal_link",
        site_key=site_key,
        target_url=target_url,
        target_file_path=rel_path,
        opportunity_id=opp_id,
        files_to_modify=[rel_path],
    )

    if not from_path.exists():
        brief.add_validation("file_exists", False, f"sibling file not found: {from_path}")
        brief.finalise_can_apply()
        return brief

    fm, body = read(from_path)
    brief.current_state = {
        "from_slug": from_slug,
        "from_title": fm.get("title"),
        "body_chars": len(body),
        "body_already_has_target_url": body_has_url(body, relative_target) or body_has_url(body, target_url),
        "anchor_already_used_as_link_text": f"[{anchor_text}]" in body,
    }

    brief.opportunity_rationale = (
        f"Internal Link Suggester recommended a link from /{from_slug} -> {target_url} "
        f"with anchor {anchor_text!r}. Hint: {insertion_hint}"
    )
    brief.opportunity_signal = {
        "source_change_id": source_change_id,
        "anchor": anchor_text,
        "insertion_hint": insertion_hint,
        "relative_target_url": relative_target,
        "candidate_phrases_from_hint": _extract_candidate_phrases_from_hint(insertion_hint),
    }

    # Decide WHICH phrase to replace. Try in order:
    #   1. Quoted phrases from the hint
    #   2. The anchor text itself, if it appears verbatim
    candidates = _extract_candidate_phrases_from_hint(insertion_hint)
    if anchor_text and anchor_text not in candidates:
        candidates.append(anchor_text)

    found_phrase: str | None = None
    for phrase in candidates:
        if phrase and phrase in body:
            found_phrase = phrase
            break

    # Construct the link string
    link_md = f"[{anchor_text}]({relative_target})"

    brief.change_summary = (
        f"Insert internal link from /{from_slug} to {target_url} (anchor: {anchor_text!r})"
    )
    brief.change_diff = {
        "phrase_to_replace": found_phrase,
        "replacement": link_md,
        "from_file_path": rel_path,
        "target_relative_url": relative_target,
    }
    brief.internal_data["found_phrase"] = found_phrase
    brief.internal_data["link_md"] = link_md
    brief.internal_data["body_snapshot_before"] = body[:1000]

    # Validators
    brief.add_validation("file_exists", True, "")
    ok, det = markdown_link_format(anchor_text, relative_target)
    brief.add_validation("link_format_valid", ok, det)
    ok, det = no_banned_chars(anchor_text)
    brief.add_validation("anchor_no_banned_chars", ok, det)
    brief.add_validation(
        "phrase_found_in_body",
        found_phrase is not None,
        f"phrase={found_phrase!r}" if found_phrase else "no candidate phrase matched body",
    )
    brief.add_validation(
        "target_url_not_already_linked_in_body",
        not brief.current_state["body_already_has_target_url"],
        "" if not brief.current_state["body_already_has_target_url"] else "body already links to target_url",
    )
    brief.add_validation(
        "anchor_text_not_already_a_link",
        not brief.current_state["anchor_already_used_as_link_text"],
        "" if not brief.current_state["anchor_already_used_as_link_text"] else f"'{anchor_text}' already used as a link text",
    )

    brief.finalise_can_apply()
    return brief


def apply(brief: ChangeBrief) -> dict:
    path = ROOT / brief.target_file_path
    phrase = brief.internal_data.get("found_phrase")
    link_md = brief.internal_data.get("link_md")
    if not phrase or not link_md:
        raise ApplyError("brief.internal_data missing found_phrase or link_md")

    def _edit(b: ChangeBrief) -> tuple[str, str]:
        fm, body = read(path)
        before_snapshot = body[:600]
        new_body, n = replace_first_phrase_with_link(
            body,
            phrase,
            anchor=brief.opportunity_signal.get("anchor", phrase),
            url=brief.opportunity_signal.get("relative_target_url", brief.target_url),
        )
        if n == 0:
            raise ApplyError(f"could not replace phrase {phrase!r} in body (file may have changed since brief was built)")
        ok, det = valid_markdown_after_edit(new_body)
        if not ok:
            raise ApplyError(f"post-edit markdown validation failed: {det}")
        write(path, fm, new_body)
        after_snapshot = new_body[: 600]
        return before_snapshot, after_snapshot

    return run_apply_lifecycle(
        brief=brief,
        edit_fn=_edit,
        change_type=CHANGE_TYPE,
        confidence="medium",
        auto_applied=True,
    )
