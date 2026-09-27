# Factual QA (Track A): closing-a-medical-limited-company

Post: `docs/medical/_wave1/posts/closing-a-medical-limited-company.md`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4b + the S4a QA paragraph
Tie-breaker: `docs/medical/house_positions.md` §4, §5, §16, §20; legislation.gov.uk and gov.uk where the house file is silent
Reviewed: 2026-09-27

## Sources read at primary source for this review

- CTA 2010 s.1030A, https://www.legislation.gov.uk/ukpga/2010/4/section/1030A (Condition A and Condition B verbatim, the £25,000 cap and the aggregation of multiple distributions)
- CTA 2010 s.1030B, https://www.legislation.gov.uk/ukpga/2010/4/section/1030B (two years, not dissolved, or failure to secure sums due or satisfy debts and liabilities; s.1030A(3) treated as never having applied)
- gov.uk strike off, https://www.gov.uk/strike-off-your-company-from-companies-register (not traded or sold off stock in the last 3 months; no liquidation threat; no CVA)
- House positions §4 (BADR 18% from 6 Apr 2026, 24% main rate for a higher-rate taxpayer, £1m lifetime limit, 5% / 5% / officer or employee / 5% economic entitlement, 2 years, NHS goodwill cannot be sold)
- House positions §5 (dividend rates 2026/27, s.455 at 35.75% by loan-made date, s.458 deferral)
- House positions §16 (ITTOIA 2005 s.396B, FA 2016 s.35, conditions A to D verbatim from CTM36305, Condition C leads, CTA 2010 s.464ZA from 30 Oct 2024)
- House positions §20 (9 months and 1 day to pay, 12 months to file, £200 first late-filing penalty and the ruling permitting the "not the £100 Self Assessment figure" contrast)

## Assertions

### Frontmatter (S4b checks)

| # | Assertion | Verdict | Note |
|---|---|---|---|
| F1 | All required keys present (slug, title, date, category, metaDescription, metaTitle, h1, summary, author, canonical, dateModified, faqs, keyTakeaways, generator) | CORRECT | YAML parses clean |
| F2 | `metaTitle` 52 chars (≤ 60) | CORRECT | |
| F3 | `metaDescription` 151 chars (≤ 155) | CORRECT | after edit E1 |
| F4 | `metaDescription` "Under £25,000 the strike-off route keeps capital treatment" | WRONG | s.1030A Condition B is "does not exceed £25,000", so exactly £25,000 qualifies. Fixed, edit E1 |
| F5 | `summary` 52 words (40 to 60), answers the question, names s.1030A | CORRECT | |
| F6 | `canonical` = `https://www.medicalaccounts.co.uk/blog/closing-a-medical-limited-company` (Medical flat form) | CORRECT | |
| F7 | `category` "Incorporation & Company Structures" | CORRECT | verbatim in the S4b Medical list |
| F8 | `dateModified` = `date` on a new post | CORRECT | |
| F9 | `faqs` 6 (4 to 6), `keyTakeaways` 5 (3 to 5) | CORRECT | |
| F10 | `generator: claude-opus`, `author` = Medical editorial-team string | CORRECT | |
| F11 | Body is raw HTML, no markdown, no shortcodes, no CTA markup | CORRECT | `<p> <h2> <ul> <table> <strong> <a>` only |
| F12 | 5 internal links, all flat `/blog/<slug>`, all present on disk | CORRECT | all five verified in `Medical/web/content/blog/` |
| F13 | No em-dashes | CORRECT | |
| F14 | Body 1,200 words (band 800 to 1,200) | CORRECT | at the ceiling; both edits are word-neutral |

### Body and FAQ assertions

| # | Assertion | Verdict | Note |
|---|---|---|---|
| 1 | £25,000 strike-off cap gives capital treatment under CTA 2010 s.1030A | CORRECT | s.1030A Condition B verbatim |
| 2 | Condition A = company intends to secure, or has secured, payment of sums due to it and intends to satisfy, or has satisfied, its debts and liabilities | CORRECT | s.1030A verbatim |
| 3 | The cap aggregates several distributions | CORRECT | s.1030A Condition B covers "the total amount of the distributions" |
| 4 | Exceed £25,000 and s.1030A does not apply at all, so the whole distribution is income, no partial relief on the first £25,000 | CORRECT | the section is an all-or-nothing test, no tapering in the text |
| 5 | s.1030B withdrawal: two years pass and the company has not been dissolved, or has failed to secure sums due or satisfy its debts | CORRECT | s.1030B verbatim; treated as if s.1030A(3) had never applied |
| 6 | Companies House will not accept a strike-off application from a company that has traded or sold off stock in the last three months | CORRECT | gov.uk verbatim |
| 7 | An MVL keeps capital treatment at any size, run by a licensed insolvency practitioner | CORRECT | uncontroversial; consistent with §16's capital-vs-income framing |
| 8 | BADR 18% from 6 April 2026 | CORRECT | §4, gov.uk re-verified 2026-08-26 |
| 9 | Main CGT rate 24%, so BADR is worth up to 6 percentage points | CORRECT | §4 verbatim; the FAQ correctly qualifies it "for a higher-rate taxpayer" |
| 10 | BADR lifetime limit £1m per individual | CORRECT | §4 (TCGA 1992 s.169N) |
| 11 | Share-disposal conditions: 5% ordinary share capital, 5% voting rights, officer or employee, 5% economic entitlement, held throughout the two years to disposal | CORRECT | §4 |
| 12 | NHS GP goodwill cannot be sold, so it never forms part of the value realised | CORRECT | §4 (SI 2019/251) |
| 13 | Winding-up TAAR = ITTOIA 2005 s.396B, inserted by FA 2016 s.35, distributions on or after 6 April 2016 | CORRECT | §16 verbatim |
| 14 | Condition A: at least a 5% interest immediately before the winding up | CORRECT | §16 / CTM36305 |
| 15 | Condition B: close company at any point in the two years ending with the start of the winding up | CORRECT | §16 / CTM36305 |
| 16 | Condition C: continues to carry on or be involved with the same or a similar trade within two years from the date of the distribution | CORRECT | §16 / CTM36305; two-year same-trade trap stated correctly |
| 17 | Condition D: reasonable to assume a main purpose was avoidance or reduction of income tax | CORRECT | §16 / CTM36305 |
| 18 | All four must be met; Condition C leads for a medical audience; any vehicle counts (new company, partnership, self-employment) | CORRECT | §16 "Writers must" requires exactly this lead |
| 19 | Effect: treated as a distribution chargeable to income tax, capital gains treatment and BADR lost | CORRECT | §16 |
| 20 | The two-year TAAR clock runs from the distribution, not the dissolution | CORRECT | s.396B Condition C wording |
| 21 | Lede "Before either route, test the winding-up anti-avoidance rule" | WRONG | s.396B applies to a distribution "in a winding up"; a strike-off is not a winding up, so the TAAR cannot bite on the s.1030A route. Fixed, edit E2 |
| 22 | Dividend rates 10.75% / 35.75% / 39.35% for 2026/27 | CORRECT | §5, gov.uk re-verified 2026-08-26; year-tagged everywhere it appears |
| 23 | s.455 at 35.75% on loans made on or after 6 April 2026, 33.75% on loans made in 2025/26 or earlier, dated by when the loan was made | CORRECT | §5 verbatim |
| 24 | s.458 relief deferred to 9 months and 1 day after the end of the accounting period in which repayment falls | CORRECT | §5 |
| 25 | An overdrawn loan account is an asset of the company in a liquidation and the liquidator can call it in | CORRECT | ordinary insolvency law, not a figure |
| 26 | CTA 2010 s.464ZA, in force from 30 October 2024, matches repayments of £5,000 or more against new payments within 30 days | CORRECT | §16 (FA 2025 s.81(3)(a)) |
| 27 | s.464ZA arrangements limb: replacement payments where £15,000 or more is owed | CORRECT (incomplete, not wrong) | §16 adds that the replacement payments must be £5,000 or more; the post's shorter form states nothing false. Left as written: the body is at the 1,200-word ceiling |
| 28 | No page cites s.464C or s.464D | CORRECT | §16's hard ban is observed |
| 29 | Corporation tax payable 9 months and 1 day after the period end; CT600 due 12 months; payment falls before filing | CORRECT | §20 verbatim, and framed as the ordering point §20 requires |
| 30 | First late-filing penalty £200, "which is not the £100 Self Assessment figure" | CORRECT | §20 corrected figure; the contrast phrasing is expressly permitted by the 2026-09-01 wave C ruling under §20 |
| 31 | No Companies House late-accounts penalty is quoted | CORRECT | §20 forbids it; the post is silent |
| 32 | Final statutory accounts and a CT600 stated to be the final trading accounts must still be filed, with tax paid | CORRECT | gov.uk closing-a-limited-company machinery |
| 33 | Assets left in the company at dissolution pass to the Crown, recovering them means restoring the company | CORRECT | bona vacantia, CA 2006 s.1012 |
| 34 | Gain arises in the tax year the distribution is made, so moving it across 5 April moves the gain, the annual exempt amount and the use of the £1m BADR limit | CORRECT | no AEA figure quoted, so no currency risk |
| 35 | A company that stopped trading and became a pot of cash and investments is the common BADR failure | CORRECT | trading-company requirement, §4 |
| 36 | No pricing, no named people, no firm claims, "a specialist reviews" not "we advise" | CORRECT | last paragraph uses "A specialist reviews" |

No UNSOURCED figures were found: every number in the post traces to the house file or to a primary source read above. No STALE figures: all rates are the live 2026/27 positions (BADR 18%, dividends 10.75 / 35.75 / 39.35, s.455 35.75%), none are pre-6-April-2026 values presented as current.

## Edit log

| ID | Location | Was | Now | Reason |
|---|---|---|---|---|
| E1 | frontmatter `metaDescription` | "Under £25,000 the strike-off route keeps capital treatment." | "Up to £25,000 the strike-off route keeps capital treatment." | s.1030A Condition B is "does not exceed £25,000", so a distribution of exactly £25,000 qualifies. "Under" excluded it and contradicted the body, which correctly says "£25,000 or less". Length 151 chars, still within 155 |
| E2 | body, opening paragraph | "Before either route, test the winding-up anti-avoidance rule" | "Before a liquidation, test the winding-up anti-avoidance rule" | ITTOIA 2005 s.396B charges a distribution made "in a winding up". A strike-off dissolution is not a winding up, so the TAAR cannot apply to the s.1030A route. Word-neutral, so the 1,200-word body stays inside the band |

Edits: 2. Both word-neutral. YAML re-validated after editing (parses, all required keys, metaTitle 52, metaDescription 151, summary 52 words, faqs 6, keyTakeaways 5, body 1,200 words).

VERDICT: PASS
