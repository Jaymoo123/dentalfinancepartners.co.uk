# Track A factual QA: moving-property-into-a-limited-company

File: `docs/property/_wave1/moving-property-into-a-limited-company.json`
Reviewed 2026-09-27. Tie-breaker `docs/property/house_positions.md` (HP below); primary law only where it is silent.
Body word count 1,197 (band 800 to 1,200). metaTitle 46 chars, metaDescription 147 chars. No em-dashes.

## Assertions

| # | Section | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | stats | 5% additional dwellings SDLT surcharge on the transfer | HP 1 (surcharge 3% to 5%, transactions on or after 31 Oct 2024) | CORRECT |
| 2 | stats | CGT 18% / 24% on residential gains in 2026/27 | HP 5 | CORRECT |
| 3 | stats | 3-year anti-withdrawal window after a partnership transfer | HP 1.A (FA 2003 Sch 15 para 17A) | CORRECT |
| 4 | stats | Property income 22% / 42% / 47% from 6 April 2027 | HP 7 (FA 2026 ss.6-7) | CORRECT |
| 5 | challenge 1 | Sale to own company is connected-party, SDLT on open market value whatever the deed says | HP 1 / FA 2003 s.53 | CORRECT |
| 6 | challenge 1 | Company pays the 5% surcharge on top of the standard bands | HP 1 rate table | CORRECT |
| 7 | challenge 1 | A single dwelling above 500,000 pounds can fall into the 17% flat rate for non-natural persons | HP 1 rate table (Sch 4A, raised from 15% for effective dates on or after 31 Oct 2024, FA 2025 s.53) | CORRECT (see note A) |
| 8 | challenge 1 | Internal link `/calculators/stamp-duty-calculator` | `Property/web/src/app/calculators/stamp-duty-calculator` exists | CORRECT |
| 9 | challenge 2 | Sum of the lower proportions in FA 2003 Sch 15 can reduce the chargeable consideration; 100% removes it | HP 1.A | CORRECT |
| 10 | challenge 2 | Needs a real partnership with substance (filed returns, records, joint borrowing); one created weeks before is the HMRC challenge pattern | HP 1.A genuine-partnership requirement, s.75A enquiry attack, 2-year working safe harbour | CORRECT |
| 11 | challenge 2 | Cohabiting unmarried couples are not connected persons | HP 1.A and 1.F (CTA 2010 s.1122) | CORRECT |
| 12 | challenge 2 | Withdrawing capital within three years is itself chargeable | HP 1.A (Sch 15 para 17A) | CORRECT |
| 13 | challenge 3 | Transfer is a disposal at market value; gain chargeable at 18% or 24% | HP 5 | CORRECT |
| 14 | challenge 3 | 3,000 pound annual exempt amount | HP 5 | CORRECT |
| 15 | challenge 3 | s.162 rolls the gain into the base cost of the shares; business as a going concern, all assets other than cash, for shares | HP 5 (TCGA 1992 s.162) | CORRECT |
| 16 | challenge 3 | Since 6 April 2026 s.162 must be claimed, by the first anniversary of the 31 January following the tax year of transfer | HP 5 (FA 2026, new s.162(1)(b); s.162A election repealed) | CORRECT |
| 17 | challenge 4 | Personal BTL mortgage does not follow the property; each loan redeemed and refinanced on company terms, personal guarantee from the director | HP silent; lending-market practice | UNSOURCED (non-numeric, note B) |
| 18 | challenge 4 | Company products typically price above equivalent personal ones | HP silent; no figure stated | UNSOURCED (non-numeric, note B) |
| 19 | challenge 5 | Annual accounts, CT600, confirmation statements, identity verification at Companies House | HP 11 (ECCTA, ID verification mandatory, phased) | CORRECT |
| 20 | challenge 5 | Extraction is DLA repayment, dividend or salary; the incorporation loan credit is the cheapest route and runs out | HP 21.1 (credit balances, repayment order, DLA exhaustion trap) | CORRECT |
| 21 | challenge 5 | Dividends above the 500 pound allowance taxed at 10.75%, 35.75%, 39.35% | HP 21.4 and 21.9 (ITA 2007 s.8 as in force from 6 Apr 2026) | CORRECT |
| 22 | howWeHelp 1 | Internal link `/calculators/incorporation-cost-calculator` | `Property/web/src/app/calculators/incorporation-cost-calculator` exists | CORRECT |
| 23 | howWeHelp 3 | Partnership share reviewed on income profit shares | HP 1.A (Sch 15 para 34, income-profit entitlement, not capital or voting) | CORRECT |
| 24 | howWeHelp 4 | 60-day capital gains return where tax is due | HP 5 (UK residents file and pay within 60 days where CGT is due) | CORRECT |
| 25 | faq 1 | SDLT on open market value; no relief simply because you own both sides; exception is a genuine Sch 15 partnership transfer | HP 1, 1.A | CORRECT |
| 26 | faq 2 | Incorporation relief defers rather than cancels; met on a later share sale; must be claimed since 6 April 2026 | HP 5 | CORRECT |
| 27 | faq 3 | Business test turns on activity not door count; active-management evidence | HP 5 (Ramsay v HMRC [2013] threshold) | CORRECT |
| 28 | faq 4 | 22% / 42% / 47% from 6 April 2027 in England, Wales and Northern Ireland | HP 7 (only Scotland carved out for 2027/28) | CORRECT |
| 29 | faq 4 | Section 24 reducer lifts to 22% at the same time | HP 4 and HP 7 (FA 2026 Sch 1, ITTOIA 2005 ss.274AA/274C, ITA 2007 s.399B) | CORRECT |
| 30 | faq 4 | Basic-rate landlord sees no new gap; higher-rate gap stays the width it is now | HP 7 (wedge 20pp / 25pp in both years; does not widen) | CORRECT |
| 31 | faq 4 | Link `/blog/incorporation-and-company-structures/2027-tax-rates-incorporation-decision-property-landlords` | file exists, category "Incorporation & Company Structures", route segment exists | CORRECT |
| 32 | faq 5 | Formation and Companies House identity verification are quick; valuations, company-lender refinancing and conveyancing are the slow parts | HP 11 for the ID step; timing is practice, not law | UNSOURCED (non-numeric, note B) |
| 33 | faq 5 | CGT return and payment due within 60 days of completion where tax is payable | HP 5 | CORRECT |
| 34 | faq 5 | Link `/blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk` | file exists, same category | CORRECT |

No WRONG and no STALE items. Every tax-year-sensitive figure is the 2026/27 or the enacted 2027/28
position: no 3% surcharge, no 28% CGT, no 8.75% / 33.75% dividends, no 20% reducer presented as the
2027/28 rate, and s.162 is stated as claim-required rather than automatic.

## Sources array

Covers every figure and rule the page states. Two observations:

- Line 2 cited FA 2003 Sch 15 paras 10-13 as the sum-of-lower-proportions hook. On this page the
  transfer runs out of a letting partnership to a connected company, which is paras 18-20 with the
  SLP at para 20; paras 10-13 are the mirror rule for transfers into a partnership, and HP 1 records
  that para 10 is "frequently misquoted as the incorporation rule". Corrected (edit 1). The page body
  cites only "Schedule 15", so nothing rendered changes.
- Line 3 cites HP 1.B (linked transactions, FA 2003 s.108). The page makes no linked-transactions
  claim. Harmless surplus in a non-rendered array; left as is.

## Notes

**A. Sch 4A 17% flat rate.** HP 1 states the 17% non-natural-persons rate in its rate table with no
relief caveat, so under the tie-breaker the page is correct as written and the "can fall into" hedge
is accurate. Flagged for the manager rather than edited: FA 2003 Sch 4A para 5 gives relief for a
property rental business, which most landlord incorporations meet, so the 17% rate is the exception
rather than the norm on this route. HP 1 is silent on the Sch 4A reliefs and is worth extending.

**B. Unsourced items.** Items 17, 18 and 32 are lending and conveyancing practice, not figures. The
removal rule applies to unsourced figures; none of these states a number, rate or date, so none were
removed.

## Edit log

1. `sources[1]`: replaced "FA 2003 Sch 15 paras 10-13 sum of lower proportions" with "FA 2003 Sch 15
   paras 18-20 sum of lower proportions on transfer from a partnership to a connected company, paras
   10-13 the mirror rule for transfers into a partnership". Reason: wrong direction of travel cited
   for this page's route (HP 1, HP 1.A). No rendered text changed.

Total edits: 1. JSON re-parsed clean after the edit; body word count unchanged at 1,197.

VERDICT: PASS
