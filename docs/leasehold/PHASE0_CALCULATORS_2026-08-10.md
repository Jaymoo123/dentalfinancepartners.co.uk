# Leasehold niche: Phase 0 calculator fleet (derived from data, 2026-08-10)

Selection rules (playbook §Phase 0.3): R1 = explicit tool-frame UK volume > 0. R2 = family volume
at least 1,000/mo AND decision/computation-shaped AND SERP top 10 prose-only. R3 = screener-validated
regulatory shock (leasehold-rights screener: rule_churn spike_count = 12, G4 PASS; reg-churn
candidates leaseholder-service-charge-rights and leasehold-to-commonhold-conversion).

Data sources: `optimisation_engine/niche_screener/out/leasehold_research_export/` (universe, volumes,
serps, classify; run_20260724T145704Z_e4fbff) merged with the 389 leasehold rows of
`expansion_research/buyer_demand/sweep5.csv` (DataForSEO, 2026-08-08).

## Applied selection table

| Family | Tool-frame vol | Family vol | SERP gap evidence | Rule | Verdict |
|---|---|---|---|---|---|
| Lease extension cost | "lease extension calculator" 5,400 + "lease extension estimate" 5,400 + calculator variants ~1,400 | 23,200 (cost + calculator families) | lease-advice.org calculator ranks #2 on head query but is flats-only, national-average, no reform scenarios | R1 | **BUILD** |
| Marriage value / 80-year flag | "leasehold marriage value calculator" 20 + "lease extension marriage value calculator" 10 + "calculate marriage value lease extension" 10 | 1,940 (marriage value family) | No dedicated checker in sampled SERPs; reform confusion is the demand driver | R1 (and R3: valuation reform uncommenced) | **BUILD** |
| Freehold purchase (house + collective) | "buy the freehold calculator" 720 + "buying the freehold of a leasehold house calculator" 40 | 2,970+ (buy-freehold family incl. "collective enfranchisement" 480) | freeholdcalculator.com is the only specialist tool incumbent; G4 spike included the house-freehold calculator query | R1 | **BUILD** |
| RTM eligibility | "right to manage calculator" 0 | 2,540 (RTM family; head "right to manage" 1,000 @ KD 1) | All 4 sampled RTM SERPs are prose-only (lease-advice.org, gov.uk, law firm guides); no eligibility tool in any top 10 | R2 | **BUILD** |
| Ground rent projection (doubling / RPI / cap scenario) | "ground rent calculator" 70 + "ground rent increase calculator" 10 + "ground rent calculator rpi" 10 | 5,300 (ground rent family; doubling sub-family ~400) | No projection tool in sampled SERPs; draft Bill £250 cap proposal makes this the news-cycle tool | R1 (and R3: ground rent reform) | **BUILD** |
| Wait-or-act reform decision aid | none (novel frame) | reform-status family 14,440 ("leasehold reform" 9,900) | Incumbents publish prose timelines only; the under-80-years wait-or-act question is the niche's core dilemma | R3 (rates consultation live 15 Jul to 23 Sep 2026; marriage value abolition pending; CoA appeal pending) | **BUILD** |
| Service charge sanity checker | "service charge challenge calculator" 0 | 440 | servicechargecalculator.co.uk exists (brand); family too small | R1 fail, R2 fail (<1,000) | **DEFER** (R3 revisit when LAFRA service charge SIs commence, expected from late 2026) |
| Section 20 consultation threshold | "section 20 notice calculator" 0 | 930 | Prose SERP but family just under threshold | R2 fail (<1,000) | **FOLD** threshold logic (£250 works / £100 per year contracts) into the service charge checker when built |
| SDLT on lease extension premium | "lease extension stamp duty calculator" 20 | ~120 | thin | R1 pass but trivially small | **FOLD** as an output line in the lease extension cost estimator |

Fleet = **6 build**, 1 deferred, 2 folded. The data yielded 6; do not pad.

## Build notes per tool (for Phase 2)

1. **Lease extension cost estimator.** Inputs: unexpired term, ground rent (and review pattern),
   flat value, house/flat. Output: indicative premium RANGE plus professional fee ranges (solicitor,
   valuer) and an SDLT line where the premium exceeds the threshold. MUST include marriage value where
   term is 80 years or less (current law) and a clearly labelled "if reform commences" scenario view.
   Hard rule from GROUND_TRUTH: valuation is not formulaic; every output labelled indicative, never a
   valuation; specialist-handoff close. Differentiators vs lease-advice.org: houses covered, reform
   scenario, fee stack, worked examples.
2. **Marriage value / 80-year flag checker.** Inputs: lease start or expiry date, unexpired term.
   Output: months until the 80-year cliff, whether marriage value applies today, plain-English
   explanation of the uncommenced abolition and the wait-or-act tension. Cheapest tool in the fleet;
   strong internal-link hub to the cost estimator.
3. **Freehold purchase cost estimator.** Two modes: leasehold house (1967 Act) and collective
   enfranchisement of flats (1993 Act, participation share maths, non-participating flats effect).
   Indicative ranges only.
4. **RTM eligibility checker.** Rule-based yes/maybe/no: self-contained building test, two-thirds
   qualifying tenants, 50% participation, non-residential floor area up to 50% (post 3 March 2025
   law, cite SI 2025/131), excluded categories. Ends with RTM company formation next steps.
5. **Ground rent projection checker.** Inputs: current rent, review clause (doubling every N years /
   RPI / fixed), review dates. Output: projection table, assignability warning flags (rent over
   £250 outside London / £1,000 in London AST trap as current law), and a clearly-labelled draft
   Bill £250 cap scenario (PROPOSAL, not law).
6. **Wait-or-act decision aid.** Not a premium calculator: a structured decision framework (term
   remaining vs 80/85/90-year bands, sale plans, remortgage plans, ground rent level) returning a
   reasoned "factors for acting now vs waiting" summary with the live reform status baked in from
   GROUND_TRUTH. Never predicts reform outcomes or dates.

All tools: workedExamples (GEO), faqs, specialist-handoff close, MiniCapture on result, ground-truth
maths in a shared module with vitest edge cases (80-year boundary, 0 ground rent, sub-50-year terms).
