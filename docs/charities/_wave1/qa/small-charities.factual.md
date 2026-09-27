# Factual QA (Track A) — charities / small-charities

File: `docs/charities/_wave1/small-charities.json`
Reviewed: 2026-09-27. Tie-breaker: `docs/charities/house_positions.md` (positions 1-6, 14-17, 26); primary law where silent.

## Assertions

| # | Section | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | stats | Registration required once income exceeds £5,000 (E&W) | HP 1 | CORRECT |
| 2 | stats | Examination/audit gate £25,000; £40,000 for accounting years ending on or after 30 Sep 2026 | HP 3 (CA 2011 s145; S.I. 2026/427) | CORRECT |
| 3 | stats | Annual return due within 10 months of financial year end | HP 2 | CORRECT |
| 4 | stats | GASDS: £8,000 of small donations a year, top-up worth up to £2,000 | HP 17 (states both figures; £2,000 is the published cap, not a page computation) | CORRECT |
| 5 | intro | Below £25,000 gross income the Charities Act requires no external scrutiny | HP 3 | CORRECT (statute is "exceeds £25,000", so £25,000 exactly is also outside; "below" is under-inclusive by one point, not false) |
| 6 | intro | Annual return within 10 months; governing document can impose an examination the law does not | HP 2, HP 3 | CORRECT |
| 7 | challenges 1 | Scrutiny starts above £25,000; £40,000 for years ENDING on or after 30 Sep 2026 | HP 3 | CORRECT (ending framing, E&W — correct side of the HP 26 beginning/ending trap) |
| 8 | challenges 1 | Governing document or funder can require an examination regardless of income | HP 3 | CORRECT |
| 9 | challenges 1 | Scotland requires scrutiny at any income | HP 26 (SSI 2006/218 reg 11, floor of zero) | CORRECT |
| 10 | challenges 2 | Non-company charity, gross income £250,000 or less, may use receipts and payments | HP 6 | CORRECT |
| 11 | challenges 2 | Charitable companies cannot use R&P at any size (company law requires accruals) | HP 6 (Companies Act 2006) | CORRECT |
| 12 | challenges 3 | Registration bites above £5,000; a CIO registers whatever its income | HP 1 | CORRECT |
| 13 | challenges 3 | Annual return tiers: under £10,000 income and spending; £10,000-£25,000 the questions; above £25,000 TAR and accounts attached | HP 2 | CORRECT |
| 14 | challenges 4 | Gift Aid worth 25p per £1 | HP 14 | CORRECT |
| 15 | challenges 4 | Valid declaration names the charity and donor, gives home address, states the donor tax-paid condition | HP 15 | CORRECT (condensed; no required element mis-stated) |
| 16 | challenges 4 | Records kept six years from the end of the accounting period; unsupported claims repaid | HP 15 | CORRECT |
| 17 | challenges 5 | GASDS on cash/contactless gifts of £30 or less, no declaration held, up to £8,000 a tax year | HP 17 | CORRECT |
| 18 | challenges 5 | GASDS is NOT claimed on the same donations as Gift Aid | HP 17 banned-framing (a) — page states the permitted form | CORRECT |
| 19 | challenges 5 | Matching rule: GASDS cannot exceed ten times the Gift Aid donations claimed that year | HP 17 | CORRECT |
| 20 | howWeHelp 2 | Thresholds tested at the accounting year end | HP 3 (ending rule) | CORRECT |
| 21 | howWeHelp 3 | Donor benefit limits apply to the claim | HP 16 | CORRECT (no figures asserted) |
| 22 | faq 1 | No legal requirement to appoint an accountant; trustees remain responsible | Charities Act — no appointment duty; HP 3 for the £25,000 limb | CORRECT |
| 23 | faq 2 | Above £25,000: examination, or audit where audit thresholds met; £40,000 from years ending on/after 30 Sep 2026 | HP 3, HP 4 | CORRECT |
| 24 | faq 3 | R&P boundary £250,000, rising to £500,000 for years ending on or after 30 Sep 2026; companies accruals | HP 6 | CORRECT |
| 25 | faq 4 | No statutory reserves figure; policy reasoned from commitments; unrestricted reserves distinguished from total funds | No statutory benchmark exists; no benchmark asserted | CORRECT |
| 26 | faq 4 | Above £25,000 the trustees' annual report is filed with the return | HP 2 | CORRECT |
| 27 | faq 5 | Two-year track record test removed for donations collected after 6 Apr 2017; matching rule still applies in year one | HP 17 banned-framing (b) — page states the correct position | CORRECT |
| 28 | faq 5 | £8,000 ceiling, up to £2,000, claims run out two years after the tax year ends | HP 17 | CORRECT |
| 29 | faq 6 | Above £250,000 R&P ends for non-company charities and the examiner must be from the listed professional bodies | HP 5, HP 6 | CORRECT |
| 30 | faq 6 | Audit mandatory above £1m income, or above £250,000 income with gross assets over £3.26m | HP 4 (s144(1), both limbs published together) | CORRECT |
| 31 | faq 6 | Each figure rises for accounting years ending on or after 30 Sep 2026 | HP 4 (£1.5m / £500,000 / £5m) | CORRECT |

No figure is STALE: every threshold carries its 2026 uplift where HP 3-6 record one, and every uplift is stated on the ENDING framing (E&W), never Scotland's BEGINNING framing.

## Sources array

Covers positions 1, 2, 3, 4, 5, 6, 14, 15, 16, 17 and 26 — every figure and rule asserted on the page maps to one of them. No unsourced figure remains. Nothing in the array is surplus.

## Internal links (verified on disk)

| Link | File | Category | Slug check |
|---|---|---|---|
| `/blog/trustee-compliance/annual-report-vs-annual-return` | `charities/web/content/blog/annual-report-vs-annual-return.md` | Trustee Compliance | OK |
| `/blog/gift-aid/gasds-rules` | `.../gasds-rules.md` | Gift Aid | OK |
| `/blog/independent-examination-and-audit/what-is-an-independent-examination` | `.../what-is-an-independent-examination.md` | Independent Examination and Audit | OK |
| `/blog/charity-finance/how-much-should-a-charity-hold-in-reserves` | `.../how-much-should-a-charity-hold-in-reserves.md` | Charity Finance | OK |
| `/calculators/gift-aid-calculator` | `charities/web/src/lib/calculators/tools/gift-aid-calculator.ts` (`slug: "gift-aid-calculator"`) | n/a | OK |

Category slugs checked against `slugifyCategory` in `charities/web/src/lib/blog.ts`.

## Mechanical

- JSON parses.
- Words (intro + challenges + howWeHelp + faqs, titles and questions included, tags stripped): 1,199. Inside 800-1,200, one word from the ceiling — any later edit must be word-neutral or subtractive.
- No em-dashes or en-dashes. metaTitle 45 chars, metaDescription 138 chars.

## Edit log

No edits. 0 corrections, 0 removals. File left byte-identical.

VERDICT: PASS
