---
slug: rd-relief-estimator
tier: calculator
route: /calculators/rd-relief-estimator
intent: DIY. Funded software/SaaS founders and finance leads wanting a merged-scheme vs ERIS credit number now; a KD-0 win ("r and d tax credits calculator" 170/0) that builds the trust the whole R&D service cluster converts on.
---
# R&D relief estimator (merged scheme + ERIS): landing copy + calculator-logic brief

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site", "we", "your company". CTA and brand copy flow from site config at write time. No em-dashes anywhere. Faceless authority: no named experts, no ACA/ICAEW claims, no client names or counts, no pricing figures. This spec feeds a golden-figure vitest; every rate is anchored to a numbered HP and every formula is stated unambiguously.

## Positioning + wedge (dedup #30, DIFFERENTIATE)

Generalist holds `/calculators/rd-tax-credit-estimator` and agency holds the same slug, both generic. This tool must NOT re-run the generic RDEC-vs-SME estimator maths. The distinct, load-bearing wedge:
- **Merged-scheme + ERIS-intensity toggle**: the tool decides which route applies from the profit/loss position and the 30% R&D-intensity test (HP2), and shows BOTH numbers side by side. Generic estimators show one blended figure.
- **Staff-time apportionment**: an input for the R&D-qualifying fraction of staff cost (funded software teams rarely spend 100% of payroll on qualifying work).
- **Subcontractor / EPW awareness**: a flagged line, not a full sub-calculation (rules are complex and route to "speak to us").
- Copy this wedge into the intro framing and the danger zones. The generic estimator stays generalist.

## Target queries (evidence: CALCULATORS.md, DataForSEO UK 2826, fetched 2026-07-11)

- Primary: "r and d tax credits calculator" 170/mo KD 0 CPC £23.68
- Secondary: "r&d tax credits calculator" 40/mo KD 0 CPC £35.65
- Head cluster (context, do not price-war): "r&d tax credits" 3×2,400/mo CPC £34-51 (captured on the service page, not here)

## Search-intent class + play

DIY tool intent. Searcher wants a credit number, not a guide. Play: tool first (above the fold), then landing copy that explains the merged/ERIS split, cites gov.uk figure-by-figure, and captures the two procedural traps (claim notification, AIF) into services-rd-tax-claims. The honest advance-in-science-or-technology framing (HP6) is the trust anchor a lead-form R&D mill widget cannot match.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- R&D mills (ForrestBrown tier) run "how much could you claim" lead-capture widgets, not transparent calculators. Beat with a two-route transparent estimator, visible methodology, and gov.uk citations.
- Generalist and agency generic estimators occupy the tool SERP; beat by being the only one that toggles ERIS-intensity and apportions staff time.

## Calculator inputs (exact fields)

1. **Qualifying R&D expenditure (£)** — the total qualifying spend for the period (staff, subcontractor/EPW, software, consumables). Numeric, ≥ 0.
2. **Qualifying staff cost within that spend (£)** — subset of input 1 used for the staff-time apportionment note and the PAYE-cap flag. Numeric, ≥ 0, must be ≤ input 1 (validate).
3. **Profit / loss position** — toggle: "Profit-making" or "Loss-making". Drives which route the tool recommends.
4. **Total company expenditure for the period (£)** — used for the 30% R&D-intensity test (HP2). Numeric, > 0 (validate against divide-by-zero).
5. **Corporation tax rate applying to the company** — select: 19% small-profits, 25% main, or "marginal / not sure" (HP21). Drives the net value of the taxable merged credit only; does NOT change the ERIS payable-credit maths.

Note for the engine build: the tool must not ask for a company name or contact detail to show the number (transparency is the wedge); the lead CTA sits after the result.

## Calculation logic / formula (figure-by-figure, HP-anchored)

Let `Q` = qualifying R&D expenditure (input 1), `S` = qualifying staff cost (input 2), `E` = total company expenditure (input 4), `ctRate` = selected CT rate (input 5).

**A. Merged-scheme route (always computed, both profit and loss).** HP1.
- Gross above-the-line credit = `Q × 20%` (the 20% expenditure credit, HP1).
- The credit is taxable, so the net benefit = `grossCredit × (1 − ctRate)`.
  - At 25% CT: net = `Q × 20% × 0.75` = `Q × 15%`.
  - At 19% CT: net = `Q × 20% × 0.81` = `Q × 16.2%`.
  - "marginal / not sure": display the RANGE net ~15% to ~16.2% and label it a range, do not pick a single marginal figure (marginal relief between £50k and £250k is not linear per spend; HP21). ponytail: range not point-estimate here, add a marginal-relief solver only if users ask.
- Golden-figure anchor: `Q=£100,000`, 25% CT → gross £20,000, net £15,000. `Q=£100,000`, 19% CT → gross £20,000, net £16,200.

**B. ERIS route (computed only when route qualifies; see route logic below).** HP2.
- Additional deduction = `Q × 86%`.
- Enhanced expenditure total (the surrenderable loss element) = `Q + (Q × 86%)` = `Q × 1.86`.
- Payable credit = `min(enhancedExpenditure, surrenderableLoss) × 14.5%`. For the estimator, assume the full enhanced expenditure is surrenderable (state this assumption in copy; the real cap is the lower of enhanced R&D expenditure and the total unrelieved trading loss). Display: payable credit = `Q × 1.86 × 14.5%` = `Q × 0.2697`.
- Golden-figure anchor: `Q=£100,000` → additional deduction £86,000, enhanced expenditure £186,000, payable credit £186,000 × 14.5% = £26,970.
- ponytail: estimator assumes full loss surrender; real cap = lower of enhanced R&D spend and unrelieved loss, plus the PAYE/NIC cap. Flag both as "speak to us", do not model the cap.

**C. Route logic (which route applies).** HP1, HP2.
- Compute intensity ratio = `Q / E`.
- IF profit-making → merged scheme applies (result A is the headline; ERIS is not available to profit-makers).
- ELSE (loss-making) AND `intensity ratio ≥ 30%` → ERIS applies (result B is the headline); ALSO show the merged-scheme number (A) as the alternative, since a company may still elect the merged route.
- ELSE (loss-making but intensity `< 30%`) → merged scheme applies (result A); show a note that ERIS is unavailable because R&D spend is below 30% of total expenditure (HP2), and how far off the threshold they are.
- Intensity test uses `≥ 30%` inclusive (HP2 says "at least 30%").

**D. PAYE cap flag (flag only, no calculation).**
- IF the payable-credit route (ERIS or the merged-scheme payable element) is in play AND `S` is small relative to `Q` (heuristic: staff cost `S < Q × 0.5`), display a flag: "A PAYE/NIC cap may restrict the payable credit where qualifying staff cost is low relative to total R&D spend. We check this before filing." Do NOT compute a capped figure. ponytail: heuristic flag, not the real PAYE-cap formula, upgrade to the real cap only if the estimator is ever positioned as a filing tool.

**E. Claim-notification deadline warning (always shown).** HP3.
- Static warning surfaced with every result: first-time claimants (or anyone who has not claimed in the prior three years) must notify HMRC within 6 months of the accounting period end, or the claim is invalid. Optionally accept an accounting-period-end date input and display "notify by [period end + 6 months]" but do NOT compute anything tax-numeric from it. If a date is not collected, show the rule statement only.

## Outputs

1. **Estimated merged-scheme net benefit** (result A), with the gross-before-tax figure shown and the "taxable, so net of CT" explanation.
2. **Estimated ERIS payable credit** (result B) when the route qualifies, or a greyed "ERIS not available" state with the 30%-intensity reason.
3. **Which route applies** headline (merged / ERIS) with a one-line why.
4. **Claim-notification deadline warning** (HP3), always visible.
5. **PAYE-cap flag** where triggered (D).
6. A "these are estimates, not a filing" disclaimer and a route to services-rd-tax-claims.

## Result-CTA framing

After the number: "This is an estimate based on the figures you entered, not a filed claim. The route, the eligible spend and any PAYE cap all need checking against your accounts and project narratives. Speak to us to run a compliant claim." CTA routes to /services/rd-tax-claims. Secondary DIY route: the guide spine (merged-scheme, ERIS, claim-notification, AIF, software-eligibility guides).

## Landing-page copy H2 skeleton (AROUND the tool)

Each money/methodology H2 opens with a citable 40-60 word BLUF answer.
1. Calculator embed block (tool leads the page): /embed/rd-relief-estimator
2. What this estimator works out (merged-scheme net benefit AND ERIS payable credit, BLUF)
3. The inputs explained (qualifying spend, staff-cost subset, profit/loss, total expenditure, CT rate)
4. Merged scheme vs ERIS: which route the tool picked and why (BLUF; the 30%-intensity test)
5. Worked example: a profitable SaaS company under the merged scheme (£100k spend → £20k gross → £15k net at 25%) vs a loss-making R&D-intensive one under ERIS (£100k spend → £26,970 payable credit). HP1, HP2.
6. How the maths works (methodology + gov.uk citations, figure-by-figure)
7. What the estimator does NOT cover (real PAYE cap, subcontractor/EPW restrictions, whether the work is genuinely qualifying R&D; link out)
8. The advance-in-science-or-technology test: routine development does not qualify (honesty moat). HP6.
9. The two procedural traps: claim notification (6 months) and the AIF. HP3, HP4.
10. When to get help (capture edge → services-rd-tax-claims)
11. FAQ

FAQ candidates (questions only): How much is R&D tax relief worth under the merged scheme? What is ERIS and how do I know if my company qualifies? Why is the merged credit taxable? What is the 30% R&D-intensity test? Does routine software development qualify? What is the claim-notification deadline? Does the estimator account for the PAYE cap? Can I claim if the company is loss-making?

Table/chart opportunities: merged vs ERIS side-by-side table at £100k spend (gross, net-of-tax, payable credit) across profit/loss and CT-rate scenarios; each rate cell linking its gov.uk source per the HP consistency rule.

Calculator embed: /embed/rd-relief-estimator

Internal links (launch core): /services/rd-tax-claims · /for/funded-startups · /for/saas-companies · /blog/r-and-d-tax-relief/merged-rd-scheme-explained · /blog/r-and-d-tax-relief/eris-rd-intensive-30-percent · /blog/r-and-d-tax-relief/rd-claim-notification-6-month-deadline · /blog/r-and-d-tax-relief/rd-additional-information-form-guide · /blog/r-and-d-tax-relief/software-rd-eligibility-what-qualifies

## House positions touched

- HP1: merged R&D scheme = 20% above-the-line taxable expenditure credit (periods from 1 Apr 2024); taxable, so net of CT. https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies
- HP2: ERIS = 86% additional deduction + 14.5% payable credit for loss-making SMEs with qualifying R&D spend at least 30% of total expenditure. https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-small-and-medium-sized-enterprises
- HP3: claim notification within 6 months of period end for first-time (or lapsed-3-year) claimants. https://www.gov.uk/guidance/tell-hmrc-that-youre-planning-to-claim-research-and-development-rd-tax-relief
- HP4: Additional Information Form mandatory before the CT600 (methodology "what this does not cover" only). https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief
- HP6: qualifying R&D must seek an advance in science or technology; routine development does not qualify. https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000
- HP21: CT 19% ≤£50k, 25% ≥£250k, marginal relief between; drives the net value of the taxable merged credit. https://www.gov.uk/corporation-tax-rates · https://www.gov.uk/guidance/corporation-tax-marginal-relief

## Hallucination danger zones

- The merged credit is TAXABLE. Do NOT display the 20% gross as the take-home; net it by (1 − CT rate) per HP1. The vitest golden figures: £100k → £20k gross → £15k net at 25%, £16.2k net at 19%.
- ERIS payable credit golden figure is £100k × 1.86 × 14.5% = £26,970. Do NOT state the payable credit as `Q × 14.5%` (that ignores the 86% uplift) or as any "up to 27%" rounded shortcut in the engine (display copy may say "about 27%", the engine must use 0.2697).
- Do NOT invent an intensity threshold other than 30% (HP2); the test is `≥ 30%` inclusive.
- Do NOT model the real PAYE/NIC cap or the loss-surrender cap; flag both and route to "speak to us". The estimator assumes full loss surrender and says so.
- Do NOT quote a pre-2024 SME super-deduction rate (130%/86%-era enhanced deduction was route-different) as the current merged rate; the merged scheme replaced it for in-scope periods (HP1).
- Do NOT let the marginal CT case pick a single point net figure; show a 15%-16.2% range (HP21).
- Do NOT assert a specific project qualifies as R&D; frame as general guidance (HP6) and route complex facts to "speak to us".
- No "average claim" or benefit-percentage-of-spend marketing figure; no pricing.

## Stage 2 TODO

- Confirm the engine input set exactly matches inputs 1-5 and the golden-figure vitest cases (£100k merged at 19%/25%; £100k ERIS = £26,970).
- Live-URL verify generalist and agency generic estimators to confirm the merged/ERIS toggle is genuinely absent there (dedup #30 wedge integrity).
- Confirm answer-box copy blocks are 40-60 words.
- Decide whether to collect an accounting-period-end date for the notification-deadline display (nice-to-have, non-tax-numeric).
