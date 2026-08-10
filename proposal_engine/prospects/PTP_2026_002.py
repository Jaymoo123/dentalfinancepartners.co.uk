"""HISTORICAL INSTANCE (sent 17 July 2026, v2). Haines Watts proposal,
originally the default in config_prospect.py under the old two-price model
(£100 all leads / £250 top tiers); the document actually sent lives in
out/proposal_PTP-2026-002.*. Ported to the site-ambiguous schema for the
record; re-running renders it on the current published card.
Run: python proposal_engine/generate_proposal.py --prospect PTP_2026_002
"""

PROSPECT = {
    # Recipient.
    "client_name": "Shazin Tayub ATT CTA, Director, Haines Watts",
    "proposal_date": "17 July 2026",
    "proposal_ref": "PTP-2026-002",

    # Scope.
    "sources": ["property"],
    "profession_lane": "accounting",

    # Commercial knobs: published card, no overrides.
    "tier_overrides": {},
    "payment_days": 14,
}
