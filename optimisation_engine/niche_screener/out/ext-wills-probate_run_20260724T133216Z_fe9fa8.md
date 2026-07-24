# Niche dossier: ext-wills-probate

Run: `run_20260724T133216Z_fe9fa8` at 2026-07-24T16:01:11.304534+00:00
Total: **60.57** (range [60.57, 65.57], complete: False)

## Gates

| Gate | Result |
|---|---|
| G0 | {"verdict": "PASS", "evidence": {"regulatory_gate": "none"}} |
| G1 | {"verdict": "PASS", "evidence": {"serp_seller_domains": ["alltheleads.com", "bsd |
| G2 | {"verdict": "PASS", "evidence": {"volume_weighted_diy": 16140, "threshold": 3000 |
| G3 | {"verdict": "PASS", "evidence": {"delegation_volume": 10600, "diy_share": 0.751, |
| G4 | {"verdict": "PASS", "evidence": {"spiking_queries": ["do i need probate for a sm |
| overall | PASS |

## Components

| Component | Raw | Normalised | Weighted | Note |
|---|---|---|---|---|
| diy_pain_demand | 16140 | 0.8416 | 21.0397 | vw=16140 |
| longtail_winnability | {"mean_thinness": 0.84, "mean_weak_share": 0.0616, "thinness_ci95": 0.0492} | 0.6065 | 15.162 | thinness 0.84 +/- 0.05 (95% CI) |
| rule_churn | 10 | 1.0 | 15.0 | spike_count=10 |
| calculator_demand | 5590 | 0.9369 | 9.3687 | calc vol=5590 |
| buyer_market_depth | {"brokers": 37, "mean_ads": 0, "ch_firms": 0} | 1.0 | 10.0 | brokers=37, mean_ads=0.0, ch_firms=0 |
| aio_exposure | 1.0 | 1.0 | -10.0 | aio share 1.00 |
| new_domain_viability | NULL | NULL | NULL | needs bulk_ranks/whois - not yet wired |

## Tripwires

Verdict: **DEGRADED**

- soft: 4 thin SERPs (<8 organic), within tolerance
- soft: component new_domain_viability is NULL: needs bulk_ranks/whois - not yet wired

## Top winnable queries

| Query | Specialists in top 10 | UGC+INFO slots |
|---|---|---|
| do i need probate to sell a park home | 0 | 3 |
| inheritance tax threshold 2025 | 0 | 1 |
| do i need probate if my husband dies | 0 | 1 |
| inheritance tax threshold ireland | 0 | 1 |
| what do i need for probate uk | 0 | 1 |
| do i need probate if there is a will | 0 | 0 |
| inheritance tax threshold for married couples | 0 | 0 |
| do i need grant of probate | 0 | 0 |
| inheritance tax threshold uk calculator | 0 | 0 |
| do i need probate if there is no will | 0 | 0 |
| what do i need for probate application | 0 | 0 |
| cost of making a will in victoria | 1 | 5 |
| do i need a rics valuation for probate | 1 | 2 |
| do i need to get probate | 1 | 1 |
| do i need to obtain probate | 1 | 1 |
