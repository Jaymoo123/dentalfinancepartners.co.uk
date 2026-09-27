# Track A factual QA: landlord-retirement-and-succession

Reviewed 2026-09-27 against `docs/property/house_positions.md` (§5, §9, §15.1-§15.5, §21.5, §22.1, §22.4, §22.5, §22.6) and primary law on legislation.gov.uk where house positions is silent.

## Assertions

| # | Location | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro | RNRB begins to taper above a threshold | HP §15.1 | CORRECT |
| 2 | stats 1 | NRB £325,000, frozen until 5 April 2031 | HP §9, §15.1 | CORRECT |
| 3 | stats 2 | RNRB £175,000, withdrawn £1 for every £2 above £2m | HP §9, §15.1 | CORRECT |
| 4 | stats 3 | Combined BPR/APR allowance £2.5m from 6 April 2026 | HP §15.4 (IHTA 1984 s.124D, FA 2026 Sch 12 para 4); enacted figure, not the stale £1m announcement | CORRECT |
| 5 | stats 4 | Residential CGT 18% / 24%, 2026/27 | HP §5 | CORRECT |
| 6 | challenges 1 | £3,000 annual exempt amount | HP §5 | CORRECT |
| 7 | challenges 1 | 24% higher / 18% basic banding of gains | HP §5 | CORRECT |
| 8 | challenges 1 | 60-day return on every disposal where tax is due | HP §5 (UK residents, where CGT is due) | CORRECT |
| 9 | challenges 2 | Outright gift to a child is a PET, exempt on surviving 7 years | HP §15.2 | CORRECT |
| 10 | challenges 2 | Gift is a disposal at market value for CGT | HP §22.6 (TCGA 1992 s.17) | CORRECT |
| 11 | challenges 2 | Taper relief reduces the tax, not the value | HP §15.2 (s.7(4) IHTA 1984) | CORRECT |
| 12 | challenges 3 | FIC: founder holds fixed-coupon preference shares, next generation holds growth shares, estate value freezes | HP §21.5, §22.6 | CORRECT |
| 13 | challenges 3 | Seven-year clock runs from the gift of the growth shares, not formation | HP §22.6 | CORRECT |
| 14 | challenges 3 | No holdover for investment company shares | HP §21.5 (TCGA 1992 s.165 + Sch 7, trading only) | CORRECT |
| 15 | challenges 4 | Gift into discretionary trust is a CLT, 20% on excess over available NRB | HP §22.4 | CORRECT |
| 16 | challenges 4 | More if death within seven years | HP §22.4 (further 20%, tapered) | CORRECT |
| 17 | challenges 4 | Up to 6% at each ten-year anniversary | HP §22.4 (s.64 IHTA 1984) | CORRECT |
| 18 | challenges 4 | Holdover available where neither settlor nor spouse can benefit | HP §22.4 (TCGA 1992 s.260, ss.169B-169G) | CORRECT |
| 19 | challenges 5 | Incorporation relief must be claimed since 6 April 2026 | HP §5 (TCGA 1992 s.162(1)(b), FA 2026) | CORRECT |
| 20 | challenges 5 | Assets held at death acquired by PRs at market value, lifetime gain never charged | TCGA 1992 s.62(1), legislation.gov.uk, checked 2026-09-27 | CORRECT |
| 21 | howWeHelp 2 | PRR and s.58 spousal no-gain-no-loss checked before a sale | HP §5 | CORRECT |
| 22 | howWeHelp 3 | £2.5m allowance used up by qualifying business or agricultural property | HP §15.4 | CORRECT |
| 23 | howWeHelp 4 | Deeds of variation drafted by a solicitor, tax position supplied | HP §22.2 (s.142 IHTA 1984); passing mention only, no figure asserted | CORRECT |
| 24 | faqs 1 | Uplift on death versus lifetime disposal at 18% / 24%; 40% above allowances | TCGA 1992 s.62(1); HP §5, §9 | CORRECT |
| 25 | faqs 2 | Plain BTL does not qualify for BPR, Pawson v HMRC | HP §22.1, §9 | CORRECT — page states this explicitly and nowhere implies otherwise |
| 26 | faqs 2 | Holiday lets lost separate treatment April 2025, do not qualify | HP §6, §9 | CORRECT |
| 27 | faqs 2 | Serviced accommodation with substantial services can qualify, bar is high | HP §22.1 | CORRECT |
| 28 | faqs 2 | From 6 April 2026 combined £2.5m allowance, 50% relief above | HP §15.4 | CORRECT |
| 29 | faqs 3 | GROB under s.102 Finance Act 1986, stays in the estate, no clock starts | HP §15.3 | CORRECT |
| 30 | faqs 3 | Routes out: give up the income, or pay full market rent | HP §15.3 | CORRECT |
| 31 | faqs 4 | NRB £325,000 per person, frozen to 5 April 2031 | HP §15.1 | CORRECT |
| 32 | faqs 4 | RNRB £175,000, direct lineal descendants | HP §15.1 | CORRECT |
| 33 | faqs 4 | RNRB "gone before £2.35m" | HP §15.1: fully extinguished **at** £2,350,000 | WRONG as written, corrected (edit 1) |
| 34 | faqs 4 | Unused bands transfer to a surviving spouse on a claim | HP §15.1, §22.5 (IHT402 / IHT436) | CORRECT |
| 35 | faqs 4 | 40% above the allowances | HP §9 | CORRECT |
| 36 | faqs 5 | From 6 April 2027 unused DC pension funds in the estate, PRs report and pay, death in service excluded | HP §15.5 | CORRECT |
| 37 | faqs 5 | Pension fund counts against the £2m taper test | HP §15.5 | CORRECT |

No UNSOURCED figures. No STALE figures: the BPR/APR quantum is the enacted £2.5m, not the £1m announcement figure, and the freeze date is 2031 not 2030.

## Sources array

Twelve entries; each stat, rate and statutory rule above maps to one. The §22.2 deed-of-variation entry the writer flagged is **not present** in the array, so there was nothing to keep or drop; the single passing mention in `howWeHelp` asserts no figure and needs no cite. `sources` left unchanged.

## Internal links

| Link | On disk | Verdict |
|---|---|---|
| `/calculators/capital-gains-tax-calculator` | `Property/web/src/lib/calculators/tools/capital-gains-tax-calculator.ts`, imported in `registry.ts` | OK |
| `/calculators/incorporation-cost-calculator` | `registry.ts` bespoke entry, slug present | OK |
| `/calculators/bpr-apr-allowance-calculator` | `Property/web/src/lib/calculators/tools/bpr-apr-allowance-calculator.ts`, imported in `registry.ts` | OK |
| `/blog/landlord-tax-essentials/iht-7-year-clock-property-gifting-mid-life-landlord-strategy` | `Property/web/content/blog/iht-7-year-clock-property-gifting-mid-life-landlord-strategy.md`, category "Landlord Tax Essentials", canonical matches the linked path | OK |

## Edit log

1. `faqs[3].answer`: "and is gone before £2.35m" to "and is gone by £2.35m". RNRB is fully extinguished at £2,350,000 for a single estate (HP §15.1), so a residual band still exists just below that figure.

No other edits. JSON re-parsed clean after the edit. Word count across intro, challenges, howWeHelp and faqs: 1,196, inside the 800 to 1,200 band.

VERDICT: PASS
