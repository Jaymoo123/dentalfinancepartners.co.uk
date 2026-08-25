"""Accounting-lane prospect, August 2026. Whole portfolio, published price card.

The firm accepted the published model on the call (shared claims capped at 3,
exclusive at 3x, price fixed at the first claim, credits on exclusive claims only),
so there are no tier overrides: it gets the card as published.

Run: python proposal_engine/generate_proposal.py --prospect APN_2026_004 --all-leads
"""

PROSPECT = {
    # Recipient.
    "client_name": "Robert McKee CTA, Director, Maratax Limited",
    "proposal_date": "14 August 2026",
    "proposal_ref": "APN-2026-004",

    # Scope: the whole portfolio. He self-selects per alert rather than by vertical.
    "sources": ["*"],
    "profession_lane": "accounting",

    # Commercial knobs: published prices, standard payment terms.
    "tier_overrides": {},
    "payment_days": 14,
}
