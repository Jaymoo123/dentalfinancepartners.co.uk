# Niche dossier: buy-to-let

Run: `run_20260724T121447Z_bc4b9a` at 2026-07-24T12:26:34.803213+00:00
Total: **53.42** (range [53.42, 58.42], complete: False)

## Gates

| Gate | Result |
|---|---|
| G0 | {"verdict": "PASS", "evidence": {"regulatory_gate": "none"}} |
| G1 | {"verdict": "PASS", "evidence": {"override": "proven internal: DJH lead-purchase |
| G2 | {"verdict": "PASS", "evidence": {"volume_weighted_diy": 6110, "threshold": 3000} |
| G3 | {"verdict": "PASS", "evidence": {"delegation_volume": 10, "diy_share": 0.998, "t |
| G4 | {"verdict": "PASS", "evidence": {"spiking_queries": ["landlord self assessment t |
| overall | PASS |

## Components

| Component | Raw | Normalised | Weighted | Note |
|---|---|---|---|---|
| diy_pain_demand | 6110 | 0.7572 | 18.9306 | vw=6110 |
| longtail_winnability | {"mean_thinness": 0.9356, "mean_weak_share": 0.1954, "thinness_ci95": 0.0273} | 0.7135 | 17.838 | thinness 0.94 +/- 0.03 (95% CI) |
| rule_churn | 4 | 0.8 | 12.0 | spike_count=4 |
| calculator_demand | 2890 | 0.8653 | 8.6526 | calc vol=2890 |
| buyer_market_depth | {"override": "proven internal: DJH lead-purchase agreement executed 2026-06-22 at 85 GBP per qualifying lead (legal/Plain_English_Summary.md); Haines Watts proposal live at 100-250 GBP"} | 0.6 | 6.0 | documented buyer override |
| aio_exposure | 0.9111111111111111 | 1.0 | -10.0 | aio share 0.91 |
| new_domain_viability | NULL | NULL | NULL | needs bulk_ranks/whois - not yet wired |

## Tripwires

Verdict: **DEGRADED**

- soft: 2 thin SERPs (<8 organic), within tolerance
- soft: component new_domain_viability is NULL: needs bulk_ranks/whois - not yet wired

## Top winnable queries

| Query | Specialists in top 10 | UGC+INFO slots |
|---|---|---|
| rental income tax rate in kenya | 0 | 7 |
| rental income tax calculator nz | 0 | 6 |
| rental income tax rate canada | 0 | 6 |
| rental income tax rate in ethiopia | 0 | 6 |
| iras rental income tax rate | 0 | 5 |
| landlord tax form trinidad | 0 | 5 |
| rental income tax rate nz | 0 | 5 |
| rental income tax calculator usa | 0 | 4 |
| can i rent my property to my limited company | 0 | 3 |
| rental income tax calculator bc | 0 | 3 |
| landlord tax registration form | 0 | 2 |
| how to fill in landlord tax return | 0 | 1 |
| rental income tax calculator | 0 | 0 |
| rental income tax calculator uk | 0 | 0 |
| making tax digital landlords deadline | 0 | 0 |
