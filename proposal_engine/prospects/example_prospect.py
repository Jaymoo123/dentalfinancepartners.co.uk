"""Example per-prospect config (fictional recipient). Copy to <ref>.py, fill
in, then run python proposal_engine/generate_proposal.py --prospect <ref>
from the repo root. Only recipient, scope and commercial knobs live here;
brand, entity, prices, terms and philosophy come from shared sources."""

PROSPECT = {
    # Recipient.
    "client_name": "Jane Example, Partner, Sample Advisory LLP",
    "proposal_date": "1 January 2026",
    "proposal_ref": "APN-2026-EXAMPLE",

    # Scope: estate source keys, or ["*"] for the whole portfolio.
    "sources": ["*"],
    "profession_lane": "accounting",   # "accounting" | "adjacent"

    # Commercial knobs. {} = published prices from config/tiers.json.
    "tier_overrides": {"advisory": 95},   # example single-tier override
    "payment_days": 14,
}
