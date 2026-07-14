---
slug: emi-vs-unapproved-calculator
tier: calculator
route: /calculators/emi-vs-unapproved-calculator
intent: DIY. Founders and finance leads sizing the tax difference between an EMI scheme and unapproved options before choosing a scheme; a KD-0 win ("emi share options tax calculator" 50/0) that converts into emi-scheme-setup.
---
# EMI vs unapproved options comparison calculator: landing copy + calculator-logic brief

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site", "we", "employees", "your company". CTA and brand copy flow from site config at write time. No em-dashes anywhere. Faceless authority: no named experts, no ACA/ICAEW claims, no client names or counts, no pricing figures. This spec feeds a golden-figure vitest; every rate is anchored to a numbered HP and every formula is stated unambiguously.

## Positioning + wedge (dedup #32 UNIQUE, #33-adjacent voice)

No estate site has an EMI-vs-unapproved calculator (DEDUP_AUDIT #32, UNIQUE). The space is occupied by platform tools (Vestd, SeedLegals). The accountant-voiced wedge = the full tax take across three columns (EMI vs unapproved vs growth shares) INCLUDING the loss-relief/BADR maths at exit and the employer NIC cost to the company, which platform widgets under-model. This is the "accountant with the BADR maths" positioning versus the "cap-table platform" tools.

## Target queries (evidence: CALCULATORS.md, DataForSEO UK 2826, fetched 2026-07-11)

- Primary: "emi share options tax calculator" 50/mo KD 0 CPC £7.74
- Secondary: "emi share options calculator" 10/mo KD 9; head context "emi share options" 390/mo KD 7

## Search-intent class + play

DIY tool intent. Searcher (founder or finance lead) wants to see how much tax an option scheme costs the employee and the company under each route. Play: tool first (three-column comparison), transparent maths, gov.uk citations, then convert to emi-scheme-setup (the point being: EMI almost always wins, so set it up properly). Growth shares are the third column, not a full sub-model.

## Competitors to beat (COMPETITORS.md; domains only at seed stage, live-URL check is Stage 2)

- **Vestd / SeedLegals** platform calculators. Beat with the full employee-AND-company tax take, the BADR/loss-relief exit maths, growth shares as a third column, visible methodology and gov.uk citations.

## Calculator inputs (exact fields)

1. **Option / share value at grant (AMV, £)** — the agreed actual market value per the whole grant. Numeric, > 0. Used for the growth-shares/s.431 baseline and the EMI grant position.
2. **Exercise price (£)** — what the employee pays to exercise. Numeric, ≥ 0. If ≥ AMV, EMI has no income tax at exercise; if below AMV, the discount is taxable even under EMI (state this).
3. **Exit value (£)** — value of the shares at sale/exit. Numeric, > exercise price for a gain (validate; if ≤ exercise price, show nil/negative and the loss-relief note).
4. **Employee salary band** — select: basic 20%, higher 40%, additional 45%. Drives income tax on the unapproved exercise charge and the CGT band split at exit.
5. **(Optional) BADR eligibility** — toggle: "EMI shares held 2+ years at exit" (HP18). Default on for the EMI column's exit maths; drives 18% vs standard CGT.

## Calculation logic / formula (figure-by-figure, HP-anchored)

Let `AMV` = grant value (input 1), `EX` = exercise price (input 2), `EXIT` = exit value (input 3), `band` = employee IT band decimal, `gain = EXIT − EX`.

**Column 1 — EMI.** HP12, HP18.
- At grant: no income tax (HP12).
- At exercise (at AMV, i.e. `EX ≥ AMV`): no income tax charge (HP12). If `EX < AMV`, an income tax charge arises on the discount `(AMV − EX) × band` (state; the tool should compute this when EX < AMV).
- At sale: CGT on the gain from exercise price to exit. With BADR (input 5 on, EMI 2-year rule, no 5% test needed, HP18): CGT = `gain × 18%`. Without BADR: CGT = `gain × 18%` within basic band / `24%` above (HP19); for the base tool use the employee band as the proxy for the 18%/24% split (basic band → 18%, higher/additional → 24%), and state the simplification.
- EMI total employee tax = income-tax-at-exercise (usually 0) + CGT.
  - Golden figure: `AMV=£1`, `EX=£1`, `EXIT=£100,000` (per whole grant, gain £99,999 ≈ £100,000 for illustration), BADR on: CGT = £100,000 × 18% = £18,000. No income tax. EMI employee tax ≈ £18,000.

**Column 2 — Unapproved options.** HP17.
- At grant: no charge.
- At exercise: income tax + NIC on `(marketValueAtExercise − EX)`. For the base tool, use `EXIT`-independent market value at exercise = the value at exercise; since the tool does not collect a separate exercise-date value, use `AMV` scaled or ask for a market-value-at-exercise input. SIMPLEST correct model: collect market value at exercise as part of input set OR treat the full `(EXIT − EX)` as the exercise charge only if exercise and exit coincide. To keep the vitest unambiguous, define: unapproved income-tax charge at exercise = `(MVexercise − EX) × band`, where `MVexercise` defaults to `EXIT` in the base tool (assume exercise at exit / cashless exercise) and state this assumption. Employee NIC on the same amount at the primary NIC rate; because the primary NIC rate is NOT in the HP set, the tool must FLAG employee NIC as "plus employee National Insurance" without a hard percentage (see danger zones).
  - Income tax at exercise = `(EXIT − EX) × band` (under the exercise-at-exit assumption).
  - Any post-exercise CGT is nil under the exercise-at-exit assumption (no further gain).
  - Golden figure: `EX=£1`, `EXIT=£100,000`, higher-rate 40%: income tax ≈ £100,000 × 40% = £40,000, PLUS employee NIC (flagged, no rate), PLUS employer NIC to the company (see below). Unapproved employee tax ≈ £40,000 + NIC.

**Column 3 — Growth shares.** HP17, HP16.
- Growth shares are acquired up front at their (low, hope-value) market value; with a s.431 election (HP16) the employee is taxed on the unrestricted market value at acquisition (often small for a fresh growth class), then future growth is CGT not income tax.
- Base-tool treatment: growth shares acquired at nominal/low value → minimal income tax at acquisition (model as `acquisitionValue × band`, where acquisitionValue is a small input or defaulted to 0 with a note), then CGT on `(EXIT − acquisitionValue)` at 18%/24% by band (no automatic BADR unless the 2-year + qualifying tests are met; do NOT auto-apply BADR to growth shares, HP18 covers EMI shares specifically).
  - Present growth shares as the "third column" comparison, clearly labelled as needing a valuation and a s.431 election within 14 days (HP16). Do NOT over-precise the growth-share number; it depends on the initial valuation. State the mechanism and show an illustrative CGT-only outcome.

**Company-side cost — employer NIC (HP23).**
- On the UNAPPROVED column ONLY (EMI exercise at AMV is not earnings, so no employer NIC on a clean EMI exercise): employer NIC = 15% on the amount charged to income tax above the £5,000 secondary threshold context (for a single grant, model employer NIC = `(EXIT − EX) × 15%`, and note the £5,000 secondary threshold is an annual per-employee figure, not per-grant; state the simplification). HP23.
  - Golden figure: unapproved `(EXIT − EX) = £99,999 ≈ £100,000` → employer NIC ≈ £100,000 × 15% = £15,000 to the company. EMI clean exercise → £0 employer NIC.
- ponytail: employer NIC modelled as a flat 15% on the option gain, ignoring the £5,000 secondary threshold and other pay; correct for the comparison headline, flag the threshold nuance rather than modelling full annual NIC.

## Outputs

1. **Three-column comparison table**: EMI vs unapproved vs growth shares, showing employee income tax, employee CGT, and (where relevant) the employee NIC flag.
2. **Total employee tax take** per route.
3. **Company employer NIC cost** per route (0 for clean EMI, 15% of the gain for unapproved). HP23.
4. **The headline saving**: EMI vs unapproved (the number that sells EMI setup).
5. s.431 / valuation notes for growth shares and the general disclaimer.

## Result-CTA framing

After the comparison: "On these figures, an EMI scheme leaves far more value with the employee and no employer NIC for the company, but only if the company and the options qualify and the grant is valued and notified correctly. We set up EMI schemes end to end." CTA → /services/emi-scheme-setup. Secondary DIY route: EMI qualifying-company, EMI valuation, EMI-vs-CSOP, growth-shares, s.431 guides.

## Landing-page copy H2 skeleton (AROUND the tool)

Each money/methodology H2 opens with a citable 40-60 word BLUF answer.
1. Calculator embed block (tool leads the page): /embed/emi-vs-unapproved-calculator
2. What this calculator compares (EMI vs unapproved vs growth shares, employee AND company tax, BLUF)
3. The inputs explained (grant value/AMV, exercise price, exit value, salary band, BADR toggle)
4. EMI: no tax at grant, none at exercise at AMV, CGT + BADR at sale (BLUF). HP12, HP18.
5. Unapproved: income tax + NIC at exercise, and the employer NIC cost to the company (BLUF). HP17, HP23.
6. Growth shares: the third route, s.431 within 14 days, CGT on growth (BLUF). HP16, HP17.
7. Worked example: a £100k gain per grant, EMI (£18,000 CGT, no employer NIC) vs unapproved (£40,000 income tax + NIC + £15,000 employer NIC). HP12, HP17, HP18, HP23.
8. How the maths works (methodology + gov.uk citations, figure-by-figure)
9. What this calculator does NOT cover (exercise-timing nuances, exact NIC rates, whether the company qualifies for EMI; link out)
10. Why EMI almost always wins, and the traps that break it (qualifying tests, valuation, notification)
11. FAQ

FAQ candidates (questions only): How is EMI taxed vs unapproved options? Do EMI options qualify for Business Asset Disposal Relief? What is the tax on unapproved options at exercise? What is employer NIC on unapproved options? What are growth shares and how are they taxed? What is a section 431 election? Does my company qualify for EMI? Which is cheaper for the company, EMI or unapproved?

Table/chart opportunities: the three-column comparison as the hero table (employee IT, employee NIC flag, employee CGT, company employer NIC, total); a "£100k gain" bar comparison EMI vs unapproved; each rate cell linking its gov.uk source.

Calculator embed: /embed/emi-vs-unapproved-calculator

Internal links (launch core): /services/emi-scheme-setup · /services/share-schemes · /for/funded-startups · /blog/share-schemes-and-emi/emi-qualifying-company-rules · /blog/share-schemes-and-emi/emi-option-valuation · /blog/share-schemes-and-emi/emi-vs-csop · /blog/share-schemes-and-emi/growth-shares-explained · /blog/share-schemes-and-emi/section-431-elections

## House positions touched

- HP12: EMI = no tax at grant, no income tax at exercise at AMV; company/employee qualifying tests (£30m gross assets, <250 FTE, £250k per employee, £3m per company, working time). https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis
- HP16: s.431 election = 14-day joint election on restricted securities (growth-shares column). https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450
- HP17: growth shares and unapproved options taxed under general ERS rules (income tax, NIC where relevant, on value acquired above amount paid). https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450
- HP18: BADR 18% from 6 Apr 2026, £1m lifetime; EMI shares qualify on the 2-year rule without the 5% personal-company test. https://www.gov.uk/business-asset-disposal-relief
- HP19: CGT on shares 18% within basic band / 24% above. https://www.gov.uk/capital-gains-tax/rates
- HP23: employer NIC 15% above the £5,000 secondary threshold (company-side cost on the unapproved route). https://www.gov.uk/national-insurance-rates-letters

## Hallucination danger zones

- EMPLOYEE National Insurance rate on unapproved exercise is NOT in the HP set. Do NOT invent a primary NIC percentage. Flag employee NIC as "plus employee National Insurance" (no hard figure) and, if a rate is later needed, add an HP first.
- Employer NIC is 15% above a £5,000 secondary threshold (HP23). The tool models it as a flat 15% of the option gain for the comparison headline; state that the £5,000 threshold is annual/per-employee and not modelled per-grant. Golden figure: £100k gain unapproved → £15,000 employer NIC; EMI clean exercise → £0.
- BADR is 18% from 6 April 2026 (HP18), NOT 14% (that was 2025/26) and NOT 10% (pre-2025/26). EMI golden figure: £100k gain → £18,000 CGT with BADR. Do NOT apply the 5% personal-company test to EMI shares (HP18 explicitly waives it).
- Do NOT auto-apply BADR to the unapproved or growth-shares columns; BADR-without-5%-test is EMI-specific (HP18). Growth/unapproved use standard CGT 18%/24% (HP19).
- EMI exercise is tax-free at exercise ONLY when the exercise price is at least AMV at grant (HP12). If `EX < AMV`, model the discount income-tax charge; do NOT show EMI as always zero income tax.
- The "exercise at exit / cashless" assumption for the unapproved column is a SIMPLIFICATION (real unapproved options tax the gain at exercise on the then-market-value, with later CGT on further growth). State it; do NOT present the number as exact.
- Do NOT over-precise the growth-shares number; it depends on the initial valuation and s.431 (HP16). Present the mechanism and an illustrative CGT-only outcome, not a hard figure.
- No pricing; no client counts; frame as general guidance, route qualifying-company questions to "speak to us".

## Stage 2 TODO

- Confirm the engine input set and whether a separate "market value at exercise" input is collected (if yes, drop the exercise-at-exit simplification; if no, lock the assumption in copy and vitest).
- Confirm the golden-figure vitest cases: EMI £100k gain @18% BADR = £18,000, £0 employer NIC; unapproved £100k gain @40% = £40,000 income tax + £15,000 employer NIC.
- Resolve the employee-NIC display: flag-only vs adding an HP for the primary NIC rate (recommend flag-only at launch).
- Live-URL verify Vestd/SeedLegals EMI calculators to confirm the employer-NIC + BADR-exit wedge holds.
- Confirm answer-box copy blocks are 40-60 words.
