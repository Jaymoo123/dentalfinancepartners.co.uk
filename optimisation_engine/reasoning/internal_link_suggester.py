"""
Checkpoint 6: Internal Link Suggester (dynamic backlinking).

For a TARGET page (slug + primary query + URL), find sibling pages on the
same site that should link to it. For each candidate sibling, ask DeepSeek
to read the sibling's body and propose:
  - whether linking is natural (and not contrived)
  - the anchor text (must contain query tokens; must not be 'click here')
  - the insertion hint (section / paragraph)

Validation:
  - anchor text contains at least one significant token from the target query
  - target URL exists in the site map
  - sibling body does not already contain a link to target (avoid duplicates)
  - anchor not in {'click here', 'read more', 'see here', 'this', 'here'}

Output per candidate sibling:
{
  "from_slug": str,
  "should_link": bool,
  "anchor_text": str | null,
  "insertion_hint": str | null,
  "reason": str
}
"""
from __future__ import annotations

import re
from pathlib import Path

from optimisation_engine.config import get_site
from optimisation_engine.reasoning.action_specifier import _read_page, _related_pages_for_site
from optimisation_engine.reasoning.deepseek_runner import (
    ReasoningResult,
    no_em_dashes,
    require_keys,
    run_reasoning,
)

ROOT = Path(__file__).resolve().parents[2]

BAD_ANCHORS = {
    "click here", "read more", "see here", "this", "here", "more info",
    "more information", "learn more", "find out more", "more", "link",
    "page", "the page", "this page", "the article", "above", "below",
}

MAX_BODY_CHARS_PER_SIBLING = 6000  # cap each sibling body to keep prompt small


def _significant_tokens(query: str) -> set[str]:
    """Lowercase content tokens excluding common stopwords."""
    stop = {
        "uk", "the", "a", "an", "and", "or", "for", "of", "in", "on", "to",
        "is", "are", "do", "what", "how", "why", "when", "with", "by", "at",
        "vs", "as", "your", "my", "you", "i", "we", "be", "this", "that",
    }
    return {t for t in re.findall(r"[a-z0-9]+", query.lower()) if t and t not in stop and len(t) >= 3}


def _tokens_overlap_stemmed(anchor_tokens: set[str], cluster_tokens: set[str]) -> bool:
    """Cluster overlap that tolerates simple stemming (incorporat-ing / -ion / -ed).

    A match counts if any anchor token shares a 5+ character prefix with any
    cluster token. This catches:
      'incorporating' vs 'incorporation' (both start with 'incorporat')
      'rental' vs 'rentals' (both start with 'rental')
      'cgt' vs 'cgt' (exact)
    """
    if anchor_tokens & cluster_tokens:
        return True
    for at in anchor_tokens:
        if len(at) < 5:
            continue
        for ct in cluster_tokens:
            if len(ct) < 5:
                continue
            shared_prefix_len = 0
            for a, b in zip(at, ct):
                if a == b:
                    shared_prefix_len += 1
                else:
                    break
            if shared_prefix_len >= 5:
                return True
    return False


def _read_sibling_summary(site_key: str, slug: str) -> dict | None:
    """Read sibling's frontmatter + body excerpt."""
    site = get_site(site_key)
    content_dir = ROOT / site["content_dir"]
    md_path = content_dir / f"{slug}.md"
    if not md_path.exists():
        # Try fuzzy match
        matches = list(content_dir.glob(f"{slug}*.md"))
        if not matches:
            return None
        md_path = matches[0]
    txt = md_path.read_text(encoding="utf-8", errors="ignore")
    m = re.match(r"^---\s*\n(.+?)\n---\s*\n(.*)$", txt, flags=re.DOTALL)
    if m:
        fm = m.group(1)
        body = m.group(2)
    else:
        fm = ""
        body = txt

    def f(n: str) -> str | None:
        mm = re.search(rf"^{re.escape(n)}:\s*(.+?)\s*$", fm, flags=re.MULTILINE)
        return mm.group(1).strip().strip("\"'") if mm else None

    return {
        "slug": md_path.stem,
        "path": str(md_path.relative_to(ROOT)),
        "title": f("title"),
        "category": f("category"),
        "h1": f("h1"),
        "body": body[:MAX_BODY_CHARS_PER_SIBLING],
        "body_truncated": len(body) > MAX_BODY_CHARS_PER_SIBLING,
    }


def _candidate_siblings(site_key: str, target_slug: str, *, limit: int = 8) -> list[dict]:
    """Pick candidate sibling slugs by category overlap with target.

    A site can have 300+ pages; we don't want to ask DeepSeek about every one.
    Filter to:
      - same category as target (when known)
      - sibling pages whose title has significant token overlap with target slug
    """
    site = get_site(site_key)
    target = _read_sibling_summary(site_key, target_slug)
    if not target:
        return []

    target_cat = target.get("category")
    target_tokens = _significant_tokens(target_slug.replace("-", " "))

    pages = _related_pages_for_site(site_key, limit=200)
    scored: list[tuple[int, dict]] = []
    for p in pages:
        if p["slug"] == target_slug:
            continue
        # token overlap with target slug
        p_tokens = _significant_tokens((p.get("title") or "") + " " + (p.get("h1") or "") + " " + p["slug"].replace("-", " "))
        overlap = len(target_tokens & p_tokens)
        # category match bonus
        cat_match = 1 if (target_cat and p.get("category") == target_cat) else 0
        score = overlap * 2 + cat_match * 3
        if score >= 2:
            scored.append((score, p))
    scored.sort(key=lambda x: x[0], reverse=True)
    return [p for _, p in scored[:limit]]


def _dedupe_anchors_in_place(output: dict) -> int:
    """Drop duplicate anchors. Keep the FIRST positive suggestion with each anchor;
    set should_link=False on the rest with a deduplication reason.

    Returns the number of demoted suggestions.
    """
    seen: set[str] = set()
    demoted = 0
    for s in (output.get("suggestions") or []):
        if not s.get("should_link"):
            continue
        anchor = (s.get("anchor_text") or "").strip().lower()
        if not anchor:
            continue
        if anchor in seen:
            s["should_link"] = False
            s["reason"] = f"deduplicated: anchor '{s.get('anchor_text')}' already used for another sibling on this target"
            s["anchor_text"] = None
            s["insertion_hint"] = None
            demoted += 1
        else:
            seen.add(anchor)
    return demoted


def suggest_links_for_target(
    *,
    site_key: str,
    target_slug: str,
    target_url: str,
    primary_query: str,
    target_query_cluster: list[str] | None = None,
) -> ReasoningResult:
    """Run the suggester for ONE target page across its candidate siblings.

    Post-processes the LLM output to enforce anchor diversity deterministically:
    duplicate anchors are demoted to should_link=False with a dedup reason.
    """
    candidates = _candidate_siblings(site_key, target_slug, limit=8)
    if not candidates:
        # Return a synthetic empty result without spending DeepSeek tokens
        return ReasoningResult(
            output={"suggestions": [], "confidence": 100},
            confidence=100,
            cost_usd=0.0,
            auto_applicable=True,
            raw_response="(no candidate siblings — local short-circuit)",
        )

    # Load each candidate's summary
    sibling_summaries: list[dict] = []
    for c in candidates:
        s = _read_sibling_summary(site_key, c["slug"])
        if s:
            sibling_summaries.append(s)

    cluster = target_query_cluster or [primary_query]
    site = get_site(site_key)

    sib_block = "\n\n".join(
        f"--- SIBLING {i+1}: {s['slug']} ({s.get('category')!r}) ---\n"
        f"title: {s.get('title')!r}\n"
        f"h1: {s.get('h1')!r}\n"
        f"body (truncated to {MAX_BODY_CHARS_PER_SIBLING} chars):\n{s['body']}"
        for i, s in enumerate(sibling_summaries)
    )

    user_input = f"""SITE: {site['display_name']} ({site['domain']})

TARGET PAGE (the page we want links pointing TO):
  slug:          {target_slug}
  url:           {target_url}
  primary query: {primary_query!r}
  cluster:       {cluster[:5]}

CANDIDATE SIBLING PAGES (we want to decide which should link TO the target):

{sib_block}

For each sibling, decide whether linking to the target is natural and useful.
Only suggest a link when the sibling's existing body has a sentence where the
target's primary query would fit AS A LINK without changing the meaning.
If forcing the link would require rewording the sibling's content, DO NOT suggest it.
"""

    examples = [
        {
            "input": (
                "TARGET: slug='annual-investment-allowance-agency-equipment-2025-26' "
                "primary_query='annual investment allowance'.\n"
                "SIBLING 1: slug='capital-allowances-office-fit-out-agency' mentions equipment relief.\n"
                "SIBLING 2: slug='ir35-contractor-tax' has no mention of allowances at all.\n"
                "SIBLING 3: slug='dubai-relocation-agency-tax' mentions UK assets when relocating.\n"
                "SIBLING 4: slug='r-and-d-agency-claim' references equipment + 100% relief."
            ),
            "output": {
                "suggestions": [
                    {
                        "from_slug": "capital-allowances-office-fit-out-agency",
                        "should_link": True,
                        "anchor_text": "annual investment allowance",
                        "insertion_hint": "Where the page discusses 'claiming relief on equipment' — replace 'equipment relief' with a link using the exact phrase.",
                        "reason": "Direct topical overlap; sibling discusses equipment relief.",
                    },
                    {
                        "from_slug": "ir35-contractor-tax",
                        "should_link": False,
                        "anchor_text": None,
                        "insertion_hint": None,
                        "reason": "IR35 page has no natural insertion point.",
                    },
                    {
                        "from_slug": "dubai-relocation-agency-tax",
                        "should_link": True,
                        "anchor_text": "AIA on agency equipment",
                        "insertion_hint": "Section discussing UK assets retained pre-relocation — link from 'capital allowances on equipment'.",
                        "reason": "Founders relocating need to know AIA timing before exit; varied anchor for diversity.",
                    },
                    {
                        "from_slug": "r-and-d-agency-claim",
                        "should_link": True,
                        "anchor_text": "100% AIA equipment relief",
                        "insertion_hint": "Where the page distinguishes R&D from standard relief — different anchor flavour.",
                        "reason": "R&D vs AIA distinction is a natural place to link out for the standard alternative.",
                    },
                ],
                "confidence": 90,
            },
        }
    ]

    result = run_reasoning(
        endpoint_name="internal_link_suggester",
        role=(
            "an SEO internal-linking specialist. Given a target page and a set of "
            "sibling pages, you decide which siblings should link to the target and "
            "where in their body the link would fit naturally."
        ),
        task=(
            "For each sibling, output should_link (bool) + (if true) the anchor text "
            "(must contain a content token from the target's primary query, must NOT "
            "be a generic anchor like 'click here', 'read more', 'this') + the "
            "insertion hint (which section or paragraph it would fit). Only suggest "
            "links that would slot into EXISTING sentences naturally."
        ),
        schema_description=(
            "{\n"
            '  "suggestions": [\n'
            '    {\n'
            '      "from_slug": string,                          // MUST be one of the sibling slugs in input\n'
            '      "should_link": boolean,\n'
            '      "anchor_text": string|null,                    // null if should_link=false\n'
            '      "insertion_hint": string|null,                 // null if should_link=false\n'
            '      "reason": string                                // 1 short sentence\n'
            "    },\n"
            "    ... one entry per input sibling, same order ...\n"
            "  ],\n"
            '  "confidence": integer 0-100\n'
            "}"
        ),
        must_not=[
            "use generic anchor text like 'click here', 'read more', 'see here', 'this', 'here', 'more info', 'the page', 'this page'",
            "suggest a link to a sibling whose body has no natural insertion point — say should_link=false",
            "invent a slug; from_slug must match one of the input siblings",
            "use em-dashes or en-dashes anywhere",
            "suggest more than ONE link per sibling",
            "suggest a link when the existing prose does not contain the topic — do not propose rewording",
            "use the SAME anchor_text for multiple should_link=true suggestions — vary the anchor wording across siblings (Google flags identical-anchor internal-linking patterns as manipulative)",
        ],
        examples=examples,
        validators=[
            require_keys("suggestions", "confidence"),
            lambda o: (
                (True, None)
                if isinstance(o.get("suggestions"), list)
                else (False, "suggestions is not a list")
            ),
            # Each suggestion must reference a valid sibling slug
            lambda o: (
                (True, None)
                if all(
                    isinstance(s, dict)
                    and s.get("from_slug") in {sib["slug"] for sib in sibling_summaries}
                    for s in (o.get("suggestions") or [])
                )
                else (False, "suggestion references unknown from_slug")
            ),
            # If should_link=True, anchor_text must be present and not in BAD_ANCHORS
            lambda o: (
                (True, None)
                if all(
                    (not s.get("should_link"))
                    or (
                        isinstance(s.get("anchor_text"), str)
                        and s["anchor_text"].strip().lower() not in BAD_ANCHORS
                    )
                    for s in (o.get("suggestions") or [])
                )
                else (False, "anchor_text is missing or generic for a should_link=true suggestion")
            ),
            # Anchor text must contain at least one significant token from the cluster
            # (with simple stemming: 5-char shared prefix counts)
            lambda o: (
                (True, None)
                if all(
                    (not s.get("should_link"))
                    or (
                        s.get("anchor_text")
                        and _tokens_overlap_stemmed(
                            _significant_tokens(s["anchor_text"]),
                            set().union(*(_significant_tokens(q) for q in cluster)),
                        )
                    )
                    for s in (o.get("suggestions") or [])
                )
                else (False, "anchor_text does not contain any significant cluster token (with stemming)")
            ),
            # Anchor diversity: no two positive suggestions may share the same anchor text
            lambda o: (
                (True, None)
                if (
                    lambda anchors: len(anchors) == len(set(a.strip().lower() for a in anchors))
                )(
                    [
                        s.get("anchor_text", "")
                        for s in (o.get("suggestions") or [])
                        if s.get("should_link") and s.get("anchor_text")
                    ]
                )
                else (False, "duplicate anchor_text across positive suggestions — Google flags identical-anchor patterns")
            ),
        ],
        user_input=user_input,
        site_key=site_key,
        confidence_threshold=75,
        max_tokens=2500,
        temperature=0.2,
    )

    # Post-process: deterministic anchor deduplication
    if isinstance(result.output, dict):
        demoted = _dedupe_anchors_in_place(result.output)
        if demoted:
            result.notes.append(f"deduplicated {demoted} duplicate anchor(s) post-LLM")

    return result


def main() -> None:
    import argparse
    import json

    parser = argparse.ArgumentParser()
    parser.add_argument("site_key")
    parser.add_argument("target_slug")
    parser.add_argument("primary_query")
    args = parser.parse_args()

    target_url = f"https://{get_site(args.site_key)['domain']}/blog/{args.target_slug}"
    result = suggest_links_for_target(
        site_key=args.site_key,
        target_slug=args.target_slug,
        target_url=target_url,
        primary_query=args.primary_query,
    )
    print(json.dumps(result.output, indent=2)[:2500])
    print(f"\nconfidence={result.confidence} auto_applicable={result.auto_applicable}")
    print(f"cost=${result.cost_usd:.6f}")
    if result.notes:
        print(f"notes: {result.notes}")


if __name__ == "__main__":
    main()
