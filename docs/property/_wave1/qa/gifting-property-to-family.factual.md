# Track A factual QA — gifting-property-to-family

File: `docs/property/_wave1/gifting-property-to-family.json`
Tie-breaker: `docs/property/house_positions.md` (§1, §1.P, §5, §15.1-15.3, §22.11, §22.12, §24.6, §24.7)
Date: 2026-09-27

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro | Gift between connected people = disposal at market value | hp §24.7 (TCGA 1992 s.17 + s.286) | CORRECT |
| 2 | stats | CGT 18% or 24% on a residential gain, 2026/27 | hp §5 | CORRECT |
| 3 | stats | AEA £3,000 per person | hp §5 | CORRECT |
| 4 | stats | 60 days to report and pay after the gift completes | hp §5 (60 days where CGT is due; qualifier carried in howWeHelp 4) | CORRECT |
| 5 | stats | 7-year survival period | hp §15.2 | CORRECT |
| 6 | challenge 1 | TCGA 1992 s.17 and s.286 connected-person market value | hp §24.7 | CORRECT |
| 7 | challenge 1 | Gain = value less cost and allowable costs; 18%/24% after £3,000 | hp §5 | CORRECT |
| 8 | challenge 1 | Only spouse/civil partner escapes (s.58 no-gain-no-loss) | hp §5, §24.6 | CORRECT |
| 9 | challenge 1 | No holdover on an ordinary buy to let, tax payable in cash | hp §24.7 ("No holdover for non-business BTL") | CORRECT |
| 10 | challenge 2 | Outright gift to an individual leaves the estate after 7 years | hp §15.2 (PET) | CORRECT |
| 11 | challenge 2 | Taper reduces tax on gifts above the NRB from year three | hp §15.2 | CORRECT |
| 12 | challenge 2 | FA 1986 s.102 GROB; property back in estate at death value | hp §15.3, §22.11 (s.102(3)) | CORRECT |
| 13 | challenge 3 | Three exits: full market rent, cease occupation, s.102B(4) | hp §22.11 (the three routes, named identically) | CORRECT |
| 14 | challenge 3 | s.102B(4) = undivided share, both occupy, no benefit from donee | hp §22.11 | CORRECT |
| 15 | challenge 3 | Only the carve-out allows rent-free continued occupation | hp §22.11 ("the only family-home GROB exit that allows the parent to continue occupying without paying rent") | CORRECT |
| 16 | challenge 4 | No SDLT on an unencumbered gift (charge falls on consideration) | hp §1.P by implication; FA 2003 Sch 3 para 1 | CORRECT |
| 17 | challenge 4 | FA 2003 Sch 4 para 8: assumed debt = chargeable consideration, residential rates | hp §1.P (para 8(1)(b)) | CORRECT |
| 18 | challenge 4 | Capped at market value | hp §1.P (para 8(2)) | CORRECT |
| 19 | challenge 4 | 5% surcharge can apply where the recipient already owns a home | hp §1 (5% from 31 Oct 2024) | CORRECT |
| 20 | howWeHelp 2 | FA 1986 s.102, s.102A, s.102B and the pre-owned assets charge | hp §22.11 (POAT FA 2004 Sch 15) | CORRECT |
| 21 | howWeHelp 4 | 60-day return where tax is due, plus self assessment reporting | hp §5 | CORRECT |
| 22 | faq 1 | Market value at the date of gift; 18% basic / 24% higher; £3,000 AEA; no holdover | hp §5, §24.7 | CORRECT |
| 23 | faq 2 | s.102 reservation keeps the house in the estate; no 7-year clock; three narrow exits | hp §15.3, §22.11 | CORRECT |
| 24 | faq 3 | SDLT only on assumed debt; residential rates; market-value limit; surcharge on top | hp §1.P, §1 | CORRECT |
| 25 | faq 4 | NRB £325,000 per person, frozen to 5 April 2031 | hp §15.1 | CORRECT |
| 26 | faq 4 | Taper 80% / 60% / 40% / 20% across years 3-7, reduces tax not value | hp §15.2 | CORRECT |
| 27 | faq 4 | No tax within the band, but the band left for the estate is reduced | hp §15.2 | CORRECT |
| 28 | faq 5 | Recipient taxed on their share of rent from the gift date | hp §24.6 (income follows beneficial ownership) | CORRECT |
| 29 | faq 5 | Donee takes market value at the gift date as base cost | TCGA 1992 s.17 (hp §24.7) | CORRECT |
| 30 | faq 5 | PRR may cover most of a later gain on their own home | hp §5 (s.222-226) | CORRECT |
| 31 | faq 5 | Minor child: settlements rules attribute rent to the parent to age 18 | hp §24.7 (ITTOIA 2005 s.624, 18th-birthday cliff) | CORRECT |
| 32 | faq 6 | Gift into most trusts = CLT, 20% entry charge above NRB, ten-year charges | hp §15.2, §22.12 | CORRECT |
| 33 | faq 6 | TCGA 1992 s.260 holdover, barred if settlor or spouse can benefit | hp §22.12, sources line (ss.169B-169G) | CORRECT |
| 34 | faq 6 | Bare trust outside the relevant property regime | hp §22.12 | CORRECT |

No WRONG, STALE or UNSOURCED assertions.

## Sources array

Ten entries; every figure, rate, date and statutory reference on the page maps to one of them
(§5 CGT and PRR, §15.1 NRB, §15.2 PETs and taper, §15.3 + §22.11 GROB and POAT, §22.12 trusts
and s.260, §24.6 rental income split, §24.7 connected-person disposal and s.624, §1.P assumed
debt, §1 surcharge). Coverage: complete.

## Internal links

| Link | On disk | Verdict |
|---|---|---|
| `/calculators/capital-gains-tax-calculator` | `Property/web/src/lib/calculators/registry.ts` GENERIC array (`capitalGainsTaxCalculator`), served by `app/calculators/[slug]` | EXISTS |
| `/calculators/stamp-duty-calculator` | `Property/web/src/app/calculators/stamp-duty-calculator/page.tsx` | EXISTS |
| `/blog/landlord-tax-essentials/gift-with-reservation-of-benefit` | `Property/web/content/blog/gift-with-reservation-of-benefit.md`, category "Landlord Tax Essentials" | EXISTS |
| `/blog/capital-gains-tax/gifting-property-and-deed-of-gift-tax-implications` | same dir, category "Capital Gains Tax" | EXISTS |
| `/blog/incorporation-and-company-structures/gifting-property-to-adult-children-decision-tree-cgt-iht-occupancy-mechanics` | same dir, category "Incorporation and Company Structures" | EXISTS |

## Other checks

- Word count across intro, challenges, howWeHelp and faqs: 1,200. Inside the 800 to 1,200 band, at the ceiling.
- metaTitle 44 chars, metaDescription 153 chars. No em-dash anywhere in the file.
- JSON parses.

## Edit log

No edits. 0 corrections, 0 removals.

VERDICT: PASS
