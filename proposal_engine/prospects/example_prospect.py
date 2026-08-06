"""Example per-prospect config. Copy to <ref>.py, fill in, then run
python proposal_engine/generate_proposal.py --prospect <ref> from the repo root."""

PROSPECT = {
    # Recipient.
    "client_name": "FIRST LAST, ROLE, FIRM NAME",
    "proposal_date": "1 January 2026",
    "proposal_ref": "PTP-2026-XXX",

    # Which site's leads.
    "source": "property",
    "brand_name": "Property Tax Partners",
    "brand_domain": "propertytaxpartners.co.uk",
    "legal_entity": "Ashfield Trading Limited (company no. 16358723)",

    # Sample table.
    "sample_size": 40,

    # Pricing (GBP per lead) — legacy two-price fields used by template.html.
    "price_all_leads": 100,
    "price_top_tiers": 250,
    "top_tiers": ("very_high", "high"),
    # Per-tier price card (docs/LEAD_PRICING.md, proposed pending owner sign-off).
    "price_medium": 40,
    "price_high": 85,
    "price_very_high": 150,
    # Option B: review-and-select on anonymised details as each lead arrives.
    "select_window_days": 2,             # working days to accept an offered lead

    # Refund / credit terms.
    "rejection_window_days": 3,          # working days, objective grounds
    "dead_lead_window_days": 14,
    "dead_lead_touchpoints": "7 to 9",
    "payment_days": 14,
}
