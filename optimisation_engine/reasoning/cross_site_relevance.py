"""
Checkpoint 2: Cross-site keyword relevance.

For each keyword in the pool, decide which of the 4 portfolio sites it's
genuinely relevant to. Today the data is tagged with whoever paid for it;
this checkpoint adds a `relevant_sites text[]` column so a single keyword
can be visible to all sites it applies to.

Batches 30-50 keywords per DeepSeek call to keep cost down (~$0.05 for the
full 1,446 keyword pool).

Output schema (per keyword in the batch):
{
  "keyword": str,
  "relevant_sites": [str, ...],     // subset of ["agency","property","dentists","generalist"]
  "primary_site": str | null,       // the single MOST relevant site
  "rationale": str                  // 1 sentence
}

Plus a top-level "confidence" for the whole batch.
"""
from __future__ import annotations

from optimisation_engine.config import get_sites
from optimisation_engine.reasoning.deepseek_runner import (
    ReasoningResult,
    must_be_in,
    require_keys,
    run_reasoning,
)

VALID_SITE_KEYS = {"agency", "property", "dentists", "generalist"}


def _site_descriptions() -> str:
    """Compact site-context block for the prompt."""
    sites = get_sites(active_only=True)
    by_key = {s["site_key"]: s for s in sites}
    lines = []
    for key in ["agency", "property", "dentists", "generalist"]:
        s = by_key.get(key)
        if not s:
            continue
        lines.append(
            f"- {key}: {s['display_name']} ({s['domain']}). Audience: {s.get('target_buyer_persona') or 'UK accounting services'}"
        )
    return "\n".join(lines)


def score_batch(keywords: list[str]) -> ReasoningResult:
    """Score relevance of a batch of keywords against the 4 portfolio sites."""
    site_block = _site_descriptions()
    kw_block = "\n".join(f"- {k}" for k in keywords)

    user_input = f"""PORTFOLIO SITES:
{site_block}

KEYWORDS TO SCORE ({len(keywords)} total):
{kw_block}

For each keyword, decide which sites it is GENUINELY relevant to as a potential page topic.
Multi-site relevance is the norm for generic accounting topics (e.g. 'annual investment allowance' applies to most businesses).
Niche-specific terms have narrower relevance (e.g. 'nhs dental contract accounting' only applies to dentists).

The 'generalist' site is the catch-all UK SME accountant — ANY general accounting topic is relevant to it.
The 'agency', 'property', 'dentists' sites are specialised — relevance requires a clear topical fit, not just being adjacent.
"""

    examples = [
        {
            "input": "KEYWORDS: ['annual investment allowance', 'nhs dental contract accounting', 'section 24 mortgage interest']",
            "output": {
                "results": [
                    {
                        "keyword": "annual investment allowance",
                        "relevant_sites": ["agency", "property", "dentists", "generalist"],
                        "primary_site": "generalist",
                        "rationale": "Universal capital allowance applicable to any business buying equipment.",
                    },
                    {
                        "keyword": "nhs dental contract accounting",
                        "relevant_sites": ["dentists"],
                        "primary_site": "dentists",
                        "rationale": "Specific to NHS dental contracts; no relevance to non-dental sites.",
                    },
                    {
                        "keyword": "section 24 mortgage interest",
                        "relevant_sites": ["property", "generalist"],
                        "primary_site": "property",
                        "rationale": "Section 24 is the landlord-specific mortgage interest restriction; generalist covers it as a tax topic.",
                    },
                ],
                "confidence": 95,
            },
        },
    ]

    return run_reasoning(
        endpoint_name="cross_site_relevance",
        role=(
            "an SEO topical-relevance analyst for a UK accounting firm with 4 specialist lead-generation sites "
            "(agency-founder finance, property tax, dental accounting, and a generalist SME accountancy site)."
        ),
        task=(
            "For each keyword in the batch, output the list of portfolio sites where the keyword is a "
            "genuine page-topic candidate (not just tangentially related)."
        ),
        schema_description=(
            "{\n"
            '  "results": [\n'
            '    {\n'
            '      "keyword": string,                       // echo the input keyword verbatim\n'
            '      "relevant_sites": [string, ...],         // subset of ["agency","property","dentists","generalist"]\n'
            '      "primary_site": string|null,             // the SINGLE most relevant site, or null if no fit\n'
            '      "rationale": string                      // ONE sentence (<=20 words)\n'
            "    },\n"
            "    ... one entry per input keyword in same order ...\n"
            "  ],\n"
            '  "confidence": integer 0-100                  // your overall confidence for the batch\n'
            "}"
        ),
        must_not=[
            "include a site_key not in [agency, property, dentists, generalist]",
            "skip any input keyword (every keyword must appear in results, in the same order)",
            "mark every keyword relevant to every site — be selective, ESPECIALLY for the niche sites",
            "claim a niche-site is relevant when only the topic is loosely adjacent",
            "include rationale longer than one sentence or 20 words",
        ],
        examples=examples,
        validators=[
            require_keys("results", "confidence"),
            lambda o: (
                (True, None)
                if isinstance(o.get("results"), list) and len(o["results"]) == len(keywords)
                else (False, f"results length mismatch: expected {len(keywords)}, got {len(o.get('results') or [])}")
            ),
            lambda o: (
                (True, None)
                if all(
                    isinstance(r, dict)
                    and "keyword" in r
                    and isinstance(r.get("relevant_sites"), list)
                    and all(s in VALID_SITE_KEYS for s in r["relevant_sites"])
                    for r in (o.get("results") or [])
                )
                else (False, "result entry has bad shape or invalid site_key")
            ),
        ],
        user_input=user_input,
        confidence_threshold=70,
        max_tokens=8000,
    )


def main() -> None:
    import argparse
    import json

    parser = argparse.ArgumentParser()
    parser.add_argument("--keywords", nargs="+", help="Quick test with one or more keywords")
    args = parser.parse_args()

    if not args.keywords:
        # Use a default test set covering all sites
        args.keywords = [
            "annual investment allowance",
            "nhs dental contract accounting",
            "section 24 mortgage interest restriction",
            "ir35 contractor tax",
            "buying a dental practice",
            "uk corporation tax rates 2026",
        ]

    result = score_batch(args.keywords)
    print(json.dumps(result.output, indent=2))
    print(f"\nconfidence={result.confidence} auto_applicable={result.auto_applicable}")
    print(f"cost=${result.cost_usd:.6f} (in={result.input_tokens} out={result.output_tokens} tokens)")
    if result.notes:
        print(f"notes: {result.notes}")


if __name__ == "__main__":
    main()
