# Track A factual QA: couples-splitting-rental-income

File: `docs/property/_wave1/couples-splitting-rental-income.json`
Tie-breaker: `docs/property/house_positions.md` §24 (Form 17 + joint ownership), §5 (CGT), §1/§1.D (SDLT on spousal transfers).
Reviewed 2026-09-27. Word count 1,203 (intro + challenges + howWeHelp + faqs, tags stripped). No em-dashes. metaTitle 42, metaDescription 155.

## Assertions

| # | Field | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | stats | 50/50 default split of joint rental income, spouses and civil partners | HP 24.1; ITA 2007 s.836 | CORRECT |
| 2 | stats | 60 days for Form 17 to reach HMRC after the last signature | HP 24.2 (TSEM9851) | CORRECT |
| 3 | stats | No gain, no loss on transfer between spouses living together | HP 24.4; TCGA 1992 s.58(1) | CORRECT |
| 4 | stats | 3 tax years, no-gain-no-loss window after separation | HP 24.4 (s.58(1A)-(1B), F(No.2)A 2023 s.41) | CORRECT |
| 5 | challenge 1 | ITA 2007 s.836 taxes jointly held rent of a couple living together as equal shares regardless of contributions | HP 24.1 | CORRECT |
| 6 | challenge 1 | Displaced only by a joint Form 17 declaration and only where beneficial interests really are unequal | HP 24.1, 24.2 | CORRECT (scope note below) |
| 7 | challenge 2 | Form 17 reports existing beneficial ownership, cannot create a 90/10 split; unsupported form invalid, 50/50 continues | HP 24.2, 24.10 | CORRECT |
| 8 | challenge 3 | Joint tenants own the whole jointly, nothing to declare; sever first, E+W by notice under LPA 1925 s.36(2) | HP 24.2 joint tenancy bar | CORRECT |
| 9 | challenge 3 | A tenant in common's share passes under the will, not to the survivor | Primary land law (LPA 1925; survivorship applies to joint tenancy only) | CORRECT |
| 10 | challenge 4 | 60 days from the last signature; late forms invalid; effect from the signature date not the start of the tax year; not annual | HP 24.2, 24.10 | CORRECT |
| 11 | challenge 5 | Declaration of trust between spouses attracts no SDLT/LTT/LBTT of itself, no consideration | HP 24.3 SDLT trap | CORRECT |
| 12 | challenge 5 | Assumed share of mortgage debt is chargeable consideration; higher rates if the receiving partner owns another dwelling | HP 24.3; FA 2003 Sch 4 para 8; Sch 4ZA para 2(3) | CORRECT |
| 13 | challenge 6 | Unmarried co-owners: no 50/50 default, no Form 17; income follows actual beneficial shares | HP 24.1 scope note, 24.6 | CORRECT |
| 14 | challenge 6 | Transfer between unmarried co-owners sits outside s.58, market-value disposal, CGT can arise | HP 24.6; TCGA 1992 s.17, s.286 | CORRECT |
| 15 | howWeHelp 2 | Sequence: severance, declaration of trust, Form 17 inside 60 days, then reporting | HP 24.2, 24.3, 24.8 | CORRECT |
| 16 | howWeHelp 3 | Finance costs must follow the same shares as the income | HP 24.5 (PIM1030 / TSEM9851 correspondence rule) | CORRECT |
| 17 | howWeHelp 4 | Base cost passes across on a no-gain-no-loss transfer | HP 24.4 | CORRECT |
| 18 | faq 1 | Tax split must match beneficial ownership; 90/10 tax needs 90/10 ownership; severance first if joint tenants; Form 17 last | HP 24.2, 24.10 | CORRECT |
| 19 | faq 2 | Declaration of trust must be in writing under LPA 1925 s.53(1)(b); should state property, owners, shares, date of effect; HMRC may ask to see it | HP 24.3 | CORRECT |
| 20 | faq 3 | Joint tenancy is undivided ownership, no percentage for Form 17; sever by written notice under LPA 1925 s.36(2) | HP 24.2 | CORRECT |
| 21 | faq 4 | Spousal transfer while living together is s.58 no gain no loss; receiving partner takes the original base cost; gain deferred | HP 24.4 | CORRECT |
| 22 | faq 4 | After separation the same treatment can apply to court-order or formal-agreement transfers for up to 3 tax years after the year of separation | HP 24.4 (s.58(1A)-(1D)) | CORRECT (note below) |
| 23 | faq 5 | No SDLT where no money changes hands; assumed borrowing is chargeable consideration for SDLT, LTT and LBTT; higher rates where another dwelling is owned | HP 24.3; §1 surcharge 5% | CORRECT |
| 24 | sources | Array covers every statutory and manual reference used on the page (s.836, PIM1030, Form 17, TSEM9851/9852, LPA s.36(2)/s.53(1)(b), s.58 + F(No.2)A 2023, FA 2003 Sch 4 para 8, s.17/s.286, finance-cost correspondence) | this file | CORRECT, no gaps |

## Internal links

| Link | Resolves | Verdict |
|---|---|---|
| `/calculators/rental-income-tax-calculator` | `Property/web/src/lib/calculators/registry.ts` GENERIC, `tools/rental-income-tax-calculator.ts` slug matches; `/calculators/[slug]` route | CORRECT |
| `/calculators/section-24-calculator` | registry BESPOKE slug + `Property/web/src/app/calculators/section-24-calculator/` | CORRECT |
| `/blog/landlord-tax-essentials/unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share` | `Property/web/content/blog/unmarried-co-owners-...md`, category "Landlord Tax Essentials", canonical identical | CORRECT |

## Notes, no edit made

- Challenge 1 "the only way out is a joint declaration on Form 17" is true within the page's stated frame (a couple living together who jointly own). HP 24.1 also lifts the 50/50 rule where the couple is not living together, where legal title is in one name only, or where a third party co-owns. Not wrong as written; a Track B call if the frame should be widened.
- FAQ 4 states the 3-tax-year post-separation window. HP 24.4 states the same. Primary s.58(1D) is arguably wider for court-order transfers, so the page errs conservative and agrees with the tie-breaker. No change.

## Edit log

No edits. No WRONG, STALE or UNSOURCED item found. JSON unchanged, parses (checked with `json.load`). Word count remains 1,203; the three-word overage is left to Track B.

VERDICT: PASS
