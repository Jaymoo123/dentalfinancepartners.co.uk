# Niche dossier: leasehold-rights

Run: `run_20260724T145704Z_e4fbff` at 2026-07-24T15:21:04.550502+00:00
Total: **59.17** (range [59.17, 64.17], complete: False)

## Gates

| Gate | Result |
|---|---|
| G0 | {"verdict": "PASS", "evidence": {"regulatory_gate": "none"}} |
| G1 | {"verdict": "PASS", "evidence": {"serp_seller_domains": ["adbetter.com", "amazon |
| G2 | {"verdict": "PASS", "evidence": {"volume_weighted_diy": 10760, "threshold": 3000 |
| G3 | {"verdict": "PASS", "evidence": {"delegation_volume": 150, "diy_share": 0.984, " |
| G4 | {"verdict": "PASS", "evidence": {"spiking_queries": ["buying the freehold of a l |
| overall | PASS |

## Components

| Component | Raw | Normalised | Weighted | Note |
|---|---|---|---|---|
| diy_pain_demand | 10760 | 0.8064 | 20.1593 | vw=10760 |
| longtail_winnability | {"mean_thinness": 0.7644, "mean_weak_share": 0.1204, "thinness_ci95": 0.0293} | 0.5712 | 14.281 | thinness 0.76 +/- 0.03 (95% CI) |
| rule_churn | 12 | 1.0 | 15.0 | spike_count=12 |
| calculator_demand | 7810 | 0.9732 | 9.7318 | calc vol=7810 |
| buyer_market_depth | {"brokers": 42, "mean_ads": 0, "ch_firms": 0} | 1.0 | 10.0 | brokers=42, mean_ads=0.0, ch_firms=0 |
| aio_exposure | 0.8888888888888888 | 1.0 | -10.0 | aio share 0.89 |
| new_domain_viability | NULL | NULL | NULL | needs bulk_ranks/whois - not yet wired |

## Tripwires

Verdict: **DEGRADED**

- soft: 1 thin SERPs (<8 organic), within tolerance
- soft: classifier unknown_rate 0.48 > 0.05
- soft: component new_domain_viability is NULL: needs bulk_ranks/whois - not yet wired

## Top winnable queries

| Query | Specialists in top 10 | UGC+INFO slots |
|---|---|---|
| how to pay ground rent online | 0 | 0 |
| how much does a lease extension cost | 1 | 2 |
| what's ground rent | 1 | 2 |
| how does commonhold work | 1 | 2 |
| how does ground rent work | 1 | 2 |
| cost of lease extension london | 1 | 2 |
| how much does it cost to extend a lease | 1 | 1 |
| average cost of lease extension uk | 1 | 1 |
| buying the freehold of a leasehold house calculator | 1 | 0 |
| how much does lease extension cost | 2 | 2 |
| how much is a lease extension | 2 | 2 |
| how much is ground rent uk | 2 | 2 |
| how much cost lease extension | 2 | 2 |
| average cost of lease extension | 2 | 2 |
| how much does a lease extension cost uk | 2 | 2 |
