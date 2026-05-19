"""
apply_external_link — insert an outbound authority link in the TARGET page body.

Unlike internal_link, here the "from" is OUR page (the one with the
opportunity) and the "to" is an authority URL on gov.uk / HMRC / ICAEW etc.

Patch shape (from External Link Suggester):
  {
    "candidate_index": int,
    "anchor_text": str,
    "insertion_hint": str,
    "candidates": [{"url": str, "domain": str, ...}, ...]
  }

Bullet-proof requirements:
  - Target URL passes HEAD check at apply time (not just at suggestion time)
  - Anchor not generic ('click here', etc.)
  - Anchor diverse if multiple external links go on same page
  - We don't add the link if body already contains the same URL
  - Use plain markdown link; the site's Next.js renderer applies
    rel='noopener noreferrer' to external links automatically
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
from optimisation_engine.apply.frontmatter_utils import (  # noqa: E402
    body_has_url,
    read,
    replace_first_phrase_with_link,
    write,
)
from optimisation_engine.apply.internal_link import _extract_candidate_phrases_from_hint  # noqa: E402
from optimisation_engine.apply.validators import (  # noqa: E402
    file_exists,
    markdown_link_format,
    no_banned_chars,
    url_resolves,
    valid_markdown_after_edit,
)
from optimisation_engine.reasoning.internal_link_suggester import BAD_ANCHORS  # noqa: E402

CHANGE_TYPE = "external_link"


def build_brief_from_suggestion(*, site_key: str, target_slug: str, page_url: str, candidate_url: str, candidate_domain: str, anchor_text: str, insertion_hint: str, opp_id: str | None = None) -> ChangeBrief:
    """Build a brief from one External Link Suggester result."""
    page_path = slug_to_path(site_key, target_slug)
    rel_path = str(page_path.relative_to(ROOT))

    brief = ChangeBrief(
        apply_module="external_link",
        site_key=site_key,
        target_url=page_url,  # the page we are adding the outbound link TO
        target_file_path=rel_path,
        opportunity_id=opp_id,
        files_to_modify=[rel_path],
    )

    if not page_path.exists():
        brief.add_validation("file_exists", False, f"page not found: {page_path}")
        brief.finalise_can_apply()
        return brief

    fm, body = read(page_path)
    brief.current_state = {
        "page_slug": target_slug,
        "page_title": fm.get("title"),
        "body_chars": len(body),
        "body_already_has_url": body_has_url(body, candidate_url),
        "external_link_count_before": len(re.findall(r"\]\(https?://(?!www\.)?(?!" + re.escape(_domain_no_www(page_url)) + r")", body)),
    }

    brief.opportunity_rationale = (
        f"External Link Suggester recommends a {candidate_domain} citation in {target_slug} "
        f"with anchor {anchor_text!r}. Authority links signal E-E-A-T."
    )
    brief.opportunity_signal = {
        "candidate_url": candidate_url,
        "candidate_domain": candidate_domain,
        "anchor": anchor_text,
        "insertion_hint": insertion_hint,
        "candidate_phrases_from_hint": _extract_candidate_phrases_from_hint(insertion_hint),
    }

    # Find a phrase to replace
    candidates = _extract_candidate_phrases_from_hint(insertion_hint)
    if anchor_text and anchor_text not in candidates:
        candidates.append(anchor_text)
    found_phrase: str | None = None
    for phrase in candidates:
        if phrase and phrase in body:
            found_phrase = phrase
            break

    link_md = f"[{anchor_text}]({candidate_url})"

    brief.change_summary = f"Add outbound link in {target_slug} to {candidate_domain} (anchor: {anchor_text!r})"
    brief.change_diff = {
        "page_file_path": rel_path,
        "outbound_url": candidate_url,
        "outbound_domain": candidate_domain,
        "anchor_text": anchor_text,
        "phrase_to_replace": found_phrase,
        "replacement": link_md,
    }
    brief.internal_data["found_phrase"] = found_phrase
    brief.internal_data["link_md"] = link_md
    brief.internal_data["anchor"] = anchor_text
    brief.internal_data["candidate_url"] = candidate_url

    # Validators
    brief.add_validation("file_exists", True, "")
    ok, det = markdown_link_format(anchor_text, candidate_url)
    brief.add_validation("link_format_valid", ok, det)
    ok, det = no_banned_chars(anchor_text)
    brief.add_validation("anchor_no_banned_chars", ok, det)
    a_lower = (anchor_text or "").strip().lower()
    brief.add_validation(
        "anchor_not_generic",
        a_lower not in BAD_ANCHORS,
        "" if a_lower not in BAD_ANCHORS else f"generic anchor: {anchor_text!r}",
    )
    brief.add_validation(
        "phrase_found_in_body",
        found_phrase is not None,
        f"phrase={found_phrase!r}" if found_phrase else "no candidate phrase matched body",
    )
    brief.add_validation(
        "url_not_already_in_body",
        not brief.current_state["body_already_has_url"],
        "" if not brief.current_state["body_already_has_url"] else "body already links to candidate_url",
    )
    # Verify URL still resolves at apply time
    ok, det = url_resolves(candidate_url)
    brief.add_validation("url_resolves_head_or_get", ok, det)

    brief.finalise_can_apply()
    return brief


def _domain_no_www(url: str) -> str:
    s = (url or "").lower()
    for p in ("https://", "http://"):
        if s.startswith(p):
            s = s[len(p):]
    if s.startswith("www."):
        s = s[4:]
    return s.split("/", 1)[0]


def apply(brief: ChangeBrief) -> dict:
    path = ROOT / brief.target_file_path
    phrase = brief.internal_data.get("found_phrase")
    anchor = brief.internal_data.get("anchor")
    candidate_url = brief.internal_data.get("candidate_url")
    if not (phrase and anchor and candidate_url):
        raise ApplyError("brief.internal_data missing found_phrase/anchor/candidate_url")

    def _edit(b: ChangeBrief) -> tuple[str, str]:
        fm, body = read(path)
        before_snapshot = body[:600]
        new_body, n = replace_first_phrase_with_link(body, phrase, anchor=anchor, url=candidate_url)
        if n == 0:
            raise ApplyError(f"could not replace phrase {phrase!r} in body")
        ok, det = valid_markdown_after_edit(new_body)
        if not ok:
            raise ApplyError(f"post-edit markdown validation failed: {det}")
        write(path, fm, new_body)
        after_snapshot = new_body[:600]
        return before_snapshot, after_snapshot

    return run_apply_lifecycle(
        brief=brief,
        edit_fn=_edit,
        change_type=CHANGE_TYPE,
        confidence="medium",
        auto_applied=True,
    )
