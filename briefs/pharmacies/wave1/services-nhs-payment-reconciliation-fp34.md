---
slug: services-nhs-payment-reconciliation-fp34
tier: money
route: /services/nhs-payment-reconciliation-fp34
intent: OPERATOR-PROBLEM / HIRE. The community pharmacy owner or manager who needs their NHSBSA/FP34 payments reconciled, their margin variance against the Drug Tariff tracked, and their working capital planned around the payment lag. THE "only a pharmacy specialist would build this" signal page. Captures "fp34" and "how does the FP34 payment cycle work" and converts the operator who realises their generalist accountant does not understand contract-driven income.
---
# Service page: NHS payment reconciliation (FP34 / NHSBSA)

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site" / "the firm". CTA and brand copy flow from site config at write time. No em-dashes anywhere.

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO gl=GB, 2026-07-11)

- Primary: "fp34" 140/mo, KD 0, CPC low (the specialist head; zero competition, the operator's own term)
- Primary: NHS pharmacy payment reconciliation / NHSBSA reconciliation HIRE intent (LAUNCH_CORE intent class 3, the "only a specialist writes this" layer)
- Secondary: "how does the FP34 payment cycle work" (autocomplete, feeds the NHS-economics blog cluster); "drug tariff" 14,800/mo, KD 37 sits adjacent as look-up/citation intent, not a money head (treat as GEO/citation surface)
- Note: no rival interactive FP34 tool exists in anything fetched this run; the cash-flow estimator is the specialist-signal asset.

## Search-intent class + play

OPERATOR-PROBLEM / HIRE page, the sharpest specialist-signal on the site. The frame is that pharmacy income is contract-driven, not till-driven (HP 6): it is reimbursement (Drug Tariff prices) plus remuneration (fees and service payments) under the CPCF, not shop takings, and a generalist accountant who treats it like retail gets it wrong. Three positions carry the page: (1) the FP34 submission cycle drives cash flow, prescriptions submitted monthly and paid roughly two months later with an advance on account, so working capital must model the NHSBSA lag (HP 7); (2) Drug Tariff and Category M clawbacks and price volatility set gross margin centrally and adjust it retrospectively, so margin variance analysis is the core monthly job (HP 8); (3) service income (Pharmacy First and similar) is a growing, separately accounted line (HP 9). The wedge is that no rival tool exists and no generalist can fake this. The FP34 cash-flow estimator is the proof: it turns items dispensed and advance percentage into a month-by-month receipt timeline and the working-capital gap. The play: demonstrate deep contract-income literacy, embed the tool, convert the operator who just realised their accountant does not get it.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **Generalist accountants** who treat pharmacy income as retail takings. Beat by: the contract-driven-not-till-driven frame (HP 6), the FP34 lag mechanics (HP 7), and margin-variance analysis (HP 8), which they structurally cannot do.
- **Verified specialist pharmacy accountants (brochure-tier)**. Beat on depth and the tool: the FP34 cash-flow estimator is a specialist-signal asset none of them publishes; brochure claims of "we understand FP34" lose to a working calculator.
- **NHSBSA/Drug Tariff look-up pages** (huge 14,800/mo "drug tariff" surface). Not competitors for the lead, but the citation/GEO surface: cite them accurately and win the answer-box for the contract-economics questions.

## Required structure

H2 skeleton (open each with a 40-60 word BLUF answer):
1. Your income is a contract, not a till (answer-first; reimbursement plus remuneration under the CPCF, not shop takings; HP 6; then the service)
2. How the FP34 payment cycle actually works (submit monthly, paid roughly two months later, advance on account; HP 7)
3. The working-capital gap the lag creates, and how to plan for it (HP 7; the cash-flow reality)
4. Margin variance: Drug Tariff and Category M set your margin centrally and adjust it retrospectively (HP 8; why reconciliation is the monthly job, not year-end bookkeeping)
5. Service income (Pharmacy First and similar) as a separate accounted line (HP 9)
6. What the site's reconciliation service covers (reconcile NHSBSA schedules to your ledger, track margin variance against the Tariff, model working capital, flag under-recovery)
7. Model your FP34 cash flow (embed the FP34 cash-flow estimator)
8. Next step CTA (get reconciliation from someone who reads the schedule, not just the bank statement)

FAQ candidates (questions only):
- What is FP34 and why does it matter to my cash flow? (answer: the monthly submission cycle that drives NHSBSA payment timing; HP 7)
- When does NHSBSA actually pay me? (answer: roughly two months after submission, with an advance on account; HP 7)
- Why is my pharmacy income not the same as my till takings? (answer: it is contract reimbursement plus remuneration, not shop takings; HP 6)
- What is Category M and why does my margin keep changing? (answer: Drug Tariff/Category M set margin centrally and adjust it retrospectively; HP 8)
- How do I account for Pharmacy First income? (answer: a separately accounted service line; HP 9)
- Does my generalist accountant need to understand FP34? (answer: yes, or they will misstate your income and cash position)
- How much working capital do I need to cover the payment lag? (route to the estimator; HP 7)

Table/chart opportunities: an FP34 timeline diagram (submit month 0, advance on account, balancing payment roughly two months later) mapped to HP 7; a margin-variance box (reimbursement set by Drug Tariff, Category M clawback, retrospective adjustment) mapped to HP 8; an income-lines table (dispensing reimbursement / remuneration fees / service income like Pharmacy First) mapped to HP 6 and HP 9. No fee figures. Do NOT assert a specific advance percentage or exact payment-day count without re-verifying the current NHSBSA schedule at build time; describe as "roughly two months" per HP 7 wording.

Calculator embed: /embed/pharmacy-fp34-cash-flow (mid-page, in the modelling section; the launch-tier differentiating tool per CALCULATORS.md; takes monthly items dispensed, average item value, advance percentage, returns a month-by-month NHSBSA receipt timeline and the working-capital gap; encodes HP 7; output is a scenario estimate ending at "your situation has X complexity, speak to us", never a guaranteed cash figure). This is the site's clearest "only a pharmacy specialist would build this" asset.

Internal links (launch core): homepage, /for/pharmacy-owners (primary hub), /for/pharmacy-groups (multi-store cash consolidation), services-pharmacy-benchmarking-margin (the margin-analysis sibling), services-pharmacy-vat-retail-schemes (the other contract-income complexity), services-pharmacy-purchase-accounting (buyers verifying FP34 income in due diligence), /research/pharmacy-openings-closures-index (sector context), /calculators/pharmacy-fp34-cash-flow (landing).

## House positions touched (docs/pharmacies/house_positions.md; every figure maps to a position + gov.uk/NHS URL)

- HP 6: pharmacy income is contract-driven, not till-driven; it is reimbursement (Drug Tariff prices) plus remuneration (fees and service payments) under the Community Pharmacy Contractual Framework, not shop takings. https://www.england.nhs.uk/community-pharmacy-contractual-framework/ and https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/drug-tariff
- HP 7: the FP34 submission cycle drives cash flow; prescriptions are submitted monthly and payment arrives roughly two months later, with an advance on account; working-capital planning must model the NHSBSA payment lag. https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/submitting-prescriptions
- HP 8: Drug Tariff and Category M clawbacks and price volatility mean gross margin is set centrally and retrospectively adjusted; margin variance analysis, not just bookkeeping, is the core monthly job. https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/drug-tariff
- HP 9: service income (Pharmacy First and similar) is a growing, separately accounted revenue line with its own fee structure and thresholds. https://www.england.nhs.uk/primary-care/pharmacy/pharmacy-services/pharmacy-first/

Consistency rules: income is contract-driven, not till-driven (HP 6) is the spine. State the payment lag as "roughly two months later, with an advance on account" (HP 7 wording), never a hard day-count without re-verification. Margin is set centrally and adjusted retrospectively (HP 8).

## Hallucination danger zones

- Do NOT assert a specific advance percentage, a specific number of days to payment, or a specific Category M clawback figure without re-verifying the current NHSBSA/Drug Tariff position at build time. HP 7 says "roughly two months", HP 8 describes the mechanism, neither locks a hard number. The calculator takes the operator's own advance percentage as an input.
- Do NOT treat pharmacy income as retail takings anywhere (HP 6); that is the exact generalist error the page attacks.
- England scope: the CPCF, Drug Tariff, Pharmacy First and NHSBSA citations are England. Do NOT silently assume Scotland, Wales or Northern Ireland match; flag devolved variants as a post-launch lane.
- Positioning wall: reconciliation and cash-flow accounting only, nothing clinical, prescribing or dispensing-practice.
- The estimator is a scenario/working-capital tool ending at "speak to us", never a guaranteed cash-position figure (CALCULATORS.md).
- No credential claims, no named expert (faceless authority; owner is not an accountant). No fee or pricing figures. No em-dashes.

## Stage 2 TODO

- Live-URL verify: a specialist pharmacy-accountant FP34/reconciliation page, one generalist "retail accounting" page for the contrast, the current NHSBSA submitting-prescriptions page.
- Confirm the FP34 cash-flow estimator embed slug against the built config.
- Re-verify at build time: the current NHSBSA payment-lag wording and whether an advance-percentage figure can be cited (HP 7); the current Category M / Drug Tariff mechanism wording (HP 8); the current Pharmacy First fee-structure page (HP 9).
- Flag England-only scope on the page; queue devolved-nation contract variants as post-launch content.
