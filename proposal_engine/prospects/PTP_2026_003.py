"""Generic buyer proposal, per-tier price card model (2026-08). Recipient left
generic for the current outreach wave; personalise client_name per send.
Run: python proposal_engine/generate_proposal.py --prospect PTP_2026_003
"""

PROSPECT = {
    "client_name": "Prepared for your firm",
    "proposal_date": "6 August 2026",
    "proposal_ref": "PTP-2026-003",

    # Which site's leads.
    "source": "property",
    "brand_name": "Property Tax Partners",
    "brand_domain": "propertytaxpartners.co.uk",
    "legal_entity": "Ashfield Trading Limited (company no. 16358723)",

    # Sample table.
    "sample_size": 40,

    # Per-tier price card (GBP per accepted lead). Low tier never sold.
    "price_medium": 40,
    "price_high": 85,
    "price_very_high": 150,
    "offer_expiry_hours": 24,

    # Legacy fields kept for generator compatibility (not rendered by the
    # tier-card template; ratio_all still computes from price_all_leads).
    "price_all_leads": 85,
    "price_top_tiers": 150,
    "top_tiers": ("very_high", "high"),
    "select_window_days": 2,

    # Refund / credit terms.
    "rejection_window_days": 3,
    "dead_lead_window_days": 14,
    "dead_lead_touchpoints": "7 to 9",
    "payment_days": 14,
}
