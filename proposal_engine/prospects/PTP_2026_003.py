"""HISTORICAL INSTANCE (2026-08 outreach wave). Generic buyer proposal for the
Property Tax Partners lead flow; recipient left generic, personalise
client_name per send. Ported to the site-ambiguous schema; the document sent
in August 2026 (out/proposal_PTP-2026-003.*) used the older per-tier price
card and template. Run: python proposal_engine/generate_proposal.py --prospect PTP_2026_003
"""

PROSPECT = {
    # Recipient.
    "client_name": "Prepared for your firm",
    "proposal_date": "6 August 2026",
    "proposal_ref": "PTP-2026-003",

    # Scope.
    "sources": ["property"],
    "profession_lane": "accounting",

    # Commercial knobs: published card, no overrides.
    "tier_overrides": {},
    "payment_days": 14,
}
