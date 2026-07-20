"""Per-prospect proposal config. Edit this file per proposal, then run
python proposal_engine/generate_proposal.py from the repo root."""

PROSPECT = {
    # Recipient. Leave name generic until confirmed spelling of firm name.
    "client_name": "Shazin Tayub ATT CTA, Director, Haines Watts",
    "proposal_date": "17 July 2026",
    "proposal_ref": "PTP-2026-002",

    # Which site's leads.
    "source": "property",
    "brand_name": "Property Tax Partners",
    "brand_domain": "propertytaxpartners.co.uk",
    "legal_entity": "Ashfield Trading Limited (company no. 16358723)",

    # Sample table.
    "sample_size": 40,

    # Pricing (GBP per lead).
    "price_all_leads": 100,
    "price_top_tiers": 250,
    "top_tiers": ("very_high", "high"),
    # Option B: review-and-select on anonymised details as each lead arrives.
    "select_window_days": 2,             # working days to accept an offered lead

    # Refund / credit terms.
    "rejection_window_days": 3,          # working days, objective grounds
    "dead_lead_window_days": 14,
    "dead_lead_touchpoints": "7 to 9",
    "payment_days": 14,
}
