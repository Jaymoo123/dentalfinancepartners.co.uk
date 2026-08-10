"""Default prospect config (fully fictional). For a real prospect, copy
prospects/example_prospect.py to prospects/<ref>.py and run
python proposal_engine/generate_proposal.py --prospect <ref> from the repo root.

Everything firm-side (brand, legal entity, published prices, terms, tiering
philosophy) comes from shared sources: generate_proposal.py constants,
config/tiers.json, config/standard_terms.md, docs/CLASSIFY.md. A prospect
config carries ONLY recipient, scope and commercial knobs.
"""

PROSPECT = {
    # Recipient.
    "client_name": "Example Recipient, Director, Example Accountants Ltd",
    "proposal_date": "1 January 2026",
    "proposal_ref": "APN-2026-XXX",

    # Scope: list of estate source keys (see SOURCE_META in
    # generate_proposal.py), or ["*"] for the whole portfolio.
    "sources": ["*"],
    "profession_lane": "accounting",   # "accounting" | "adjacent"

    # Commercial knobs. {} = published prices from config/tiers.json;
    # e.g. {"advisory": 95} overrides one tier's per-lead price (footnoted).
    "tier_overrides": {},
    "payment_days": 14,
}
