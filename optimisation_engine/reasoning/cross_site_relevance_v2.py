"""
Checkpoint 2 v2 — stricter cross-site relevance.

Differences from v1:
  - Explicit MUST-PASS gates: query must represent (a) commercial-or-informational
    intent for accounting services, (b) topical fit to an accountant's service
    offering (NOT a consumer product/service or generalist navigational query),
    (c) UK relevance.
  - Lower default relevance bar — niche sites need a STRONG topical match,
    not just adjacency.
  - Adds a 'rejected: <reason>' option in the output when the keyword fails
    all gates (e.g. it's a consumer product, US-specific, branded query etc.).
  - The runner overwrites previous relevant_sites/primary_site values.

Output schema per batch:
{
  "results": [
    {
      "keyword": string,
      "kept": boolean,                         // false if rejected by gates
      "reject_reason": string|null,            // when kept=false
      "relevant_sites": [string, ...],         // empty if kept=false
      "primary_site": string|null,
      "rationale": string                      // <=25 words
    },
    ...
  ],
  "confidence": int
}
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

REJECT_REASONS = {
    "consumer_product_or_service",
    "navigational_or_branded",
    "us_specific",
    "off_topic",
    "low_quality_or_unclear",
    None,  # null allowed when kept=true
}


def _site_descriptions() -> str:
    sites = get_sites(active_only=True)
    by_key = {s["site_key"]: s for s in sites}
    lines = []
    for key in ["agency", "property", "dentists", "generalist"]:
        s = by_key.get(key)
        if not s:
            continue
        lines.append(
            f"- {key}: {s['display_name']} ({s['domain']}). Buyer: {s.get('target_buyer_persona') or 'UK accounting client'}"
        )
    return "\n".join(lines)


def score_batch(keywords: list[str]) -> ReasoningResult:
    site_block = _site_descriptions()
    kw_block = "\n".join(f"- {k}" for k in keywords)

    user_input = f"""PORTFOLIO SITES (UK lead-generation sites for accountancy firms):
{site_block}

KEYWORDS TO SCORE ({len(keywords)} total):
{kw_block}

For each keyword, decide: (1) does it pass the relevance gates below? (2) if yes, which portfolio sites is it a real page-topic candidate for?

GATES (kept=true only if ALL pass):
  G1 — Intent: keyword represents COMMERCIAL or INFORMATIONAL intent for
       accounting/tax/finance ADVICE or SERVICE. Reject if purely
       navigational (looking up a brand/site), consumer-product (insurance
       quote, vehicle tax check, credit card application), or content
       consumption (recipes, dictionary lookups, sports results).
  G2 — Topical fit: must match an accountant's service offering — tax
       planning, accounting compliance, structure & incorporation, payroll,
       VAT, exit/sale, R&D, MTD, business finance advice. Adjacency is NOT
       enough (e.g. "mortgage broker" is finance-adjacent but not accounting).
  G3 — UK relevance: the term should make sense for UK clients. Reject if
       US-specific (401k, IRS forms, professional corporation, LLC) or
       region-specific to a place we don't serve.
  G4 — Quality: not gibberish, not single-word ambiguity (e.g. "tax" alone),
       not raw brand lookups ("Barclays plc", "Companies House").

If a keyword fails any gate, set kept=false, give a reject_reason, and leave
relevant_sites=[] + primary_site=null.

If a keyword passes, assign relevant_sites STRICTLY:
  - 'generalist' (Holloway Davies): include ONLY if a UK SME owner / contractor
    / sole trader / partnership / limited-company director would genuinely
    want this advice. Generic accounting topics qualify. Niche-specific
    topics do NOT (e.g. "Section 24 mortgage interest" is property-only).
  - 'agency': only if specifically relevant to UK/UAE agency founders (creative,
    marketing, PR, web, recruitment etc.) — IR35, agency exit, Dubai relocation,
    R&D for digital agencies. Generic tax topics do NOT belong unless the
    Agency persona has a specific angle.
  - 'property': only if specifically relevant to UK landlords / BTL investors
    / property developers — CGT on property, Section 24, MTD for property,
    portfolio incorporation, FHLs, SDLT etc.
  - 'dentists': only if specifically relevant to UK dental practice owners /
    associate dentists — practice ownership/sale, NHS contracts, associate
    incorporation, dental-specific VAT/capital allowances.

The primary_site is the SINGLE most relevant — choose the most specific
niche if applicable, generalist only when the topic is genuinely cross-niche.
"""

    examples = [
        {
            "input": "KEYWORDS: ['mortgage calculator', 'section 24 mortgage interest', 'tax car checker', 'ir35 contractor']",
            "output": {
                "results": [
                    {
                        "keyword": "mortgage calculator",
                        "kept": False,
                        "reject_reason": "consumer_product_or_service",
                        "relevant_sites": [],
                        "primary_site": None,
                        "rationale": "Consumer mortgage calc tool — not an accountancy service topic.",
                    },
                    {
                        "keyword": "section 24 mortgage interest",
                        "kept": True,
                        "reject_reason": None,
                        "relevant_sites": ["property"],
                        "primary_site": "property",
                        "rationale": "Landlord-specific mortgage interest relief restriction. Property-only.",
                    },
                    {
                        "keyword": "tax car checker",
                        "kept": False,
                        "reject_reason": "consumer_product_or_service",
                        "relevant_sites": [],
                        "primary_site": None,
                        "rationale": "DVLA vehicle tax lookup — unrelated to accountancy services.",
                    },
                    {
                        "keyword": "ir35 contractor",
                        "kept": True,
                        "reject_reason": None,
                        "relevant_sites": ["agency", "generalist"],
                        "primary_site": "agency",
                        "rationale": "IR35 directly affects agency contractors; generalist covers all contractors broadly.",
                    },
                ],
                "confidence": 95,
            },
        },
        {
            "input": "KEYWORDS: ['companies house', 'corporation tax 2026 rates', 'teeth whitening', 'how to register limited company uk']",
            "output": {
                "results": [
                    {
                        "keyword": "companies house",
                        "kept": False,
                        "reject_reason": "navigational_or_branded",
                        "relevant_sites": [],
                        "primary_site": None,
                        "rationale": "Navigational query for the Companies House website.",
                    },
                    {
                        "keyword": "corporation tax 2026 rates",
                        "kept": True,
                        "reject_reason": None,
                        "relevant_sites": ["agency", "property", "dentists", "generalist"],
                        "primary_site": "generalist",
                        "rationale": "Affects every UK limited company across all niches.",
                    },
                    {
                        "keyword": "teeth whitening",
                        "kept": False,
                        "reject_reason": "off_topic",
                        "relevant_sites": [],
                        "primary_site": None,
                        "rationale": "Consumer dental treatment query, not practice finance.",
                    },
                    {
                        "keyword": "how to register limited company uk",
                        "kept": True,
                        "reject_reason": None,
                        "relevant_sites": ["agency", "generalist"],
                        "primary_site": "generalist",
                        "rationale": "Common UK SME setup question; relevant for both agency and SME generalist.",
                    },
                ],
                "confidence": 95,
            },
        },
    ]

    return run_reasoning(
        endpoint_name="cross_site_relevance_v2",
        role=(
            "a SENIOR SEO topical-relevance analyst for a UK accounting firm portfolio "
            "with 4 specialist sites. You are deliberately strict: lead-gen sites cannot "
            "afford pages on off-topic queries, so you reject everything that doesn't "
            "represent a clear accounting buyer's intent."
        ),
        task=(
            "For each keyword, check all four relevance gates (intent / topical fit / "
            "UK / quality). If any gate fails, kept=false with reject_reason. If all "
            "pass, list the portfolio sites where this keyword is a real page-topic "
            "candidate. Be conservative — when in doubt, kept=false."
        ),
        schema_description=(
            "{\n"
            '  "results": [\n'
            '    {\n'
            '      "keyword": string,                          // echo input verbatim\n'
            '      "kept": boolean,                            // false if any gate failed\n'
            '      "reject_reason": string|null,               // one of: consumer_product_or_service,\n'
            "                                                  //   navigational_or_branded, us_specific,\n"
            "                                                  //   off_topic, low_quality_or_unclear\n"
            '      "relevant_sites": [string, ...],            // empty if kept=false\n'
            '      "primary_site": string|null,                // null if kept=false\n'
            '      "rationale": string                          // <=25 words\n'
            "    },\n"
            "    ... one entry per input keyword, same order ...\n"
            "  ],\n"
            '  "confidence": integer 0-100\n'
            "}"
        ),
        must_not=[
            "skip any input keyword — every keyword must appear in results, in the same order",
            "include a site_key not in [agency, property, dentists, generalist]",
            "mark a keyword kept=true if it's a consumer product, vehicle tax lookup, brand search, US-specific term, or pure navigational",
            "mark relevant_sites for a niche site (agency/property/dentists) when only topical adjacency exists — require a clear buyer match",
            "include rationale longer than 25 words",
            "mark every keyword as relevant to generalist — be conservative",
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
                    and "kept" in r
                    and isinstance(r.get("relevant_sites"), list)
                    and all(s in VALID_SITE_KEYS for s in r["relevant_sites"])
                    and (r.get("reject_reason") in REJECT_REASONS)
                    and (not r["kept"] or r.get("primary_site") in VALID_SITE_KEYS)
                    for r in (o.get("results") or [])
                )
                else (False, "result entry has bad shape, invalid site_key, or kept/primary_site inconsistency")
            ),
        ],
        user_input=user_input,
        confidence_threshold=70,
        max_tokens=8000,
    )


def main() -> None:
    import json

    test_kws = [
        "annual investment allowance",
        "mortgage calculator",
        "section 24 mortgage interest restriction",
        "tax car checker",
        "buying a dental practice",
        "companies house",
        "ir35 contractor tax",
        "professional corporation",
        "teeth whitening",
        "uk corporation tax rates 2026",
    ]
    result = score_batch(test_kws)
    print(json.dumps(result.output, indent=2))
    print(f"\nconfidence={result.confidence} auto_applicable={result.auto_applicable}")
    print(f"cost=${result.cost_usd:.6f}")


if __name__ == "__main__":
    main()
