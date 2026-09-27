# Track A factual QA: does-a-charity-need-a-utr-and-tax-return

Date: 2026-09-27. Verdict: **PASS** (after 5 in-place edits). Final body word count 1,167. Sources: `docs/charities/house_positions.md` positions 10 to 13; gov.uk charities detailed guidance chapter 6 (claims and returns); gov.uk find-utr-number.

## Assertions

| # | Assertion | Grade | Source |
|---|---|---|---|
| 1 | Charities pay no tax on most income used for charitable purposes | CORRECT | HP 11 |
| 2 | Recognition by HMRC is separate from Commission registration; HMRC charity reference number is not the UTR | CORRECT | HP 10; gov.uk/charities-and-tax |
| 3 | A UTR is a ten digit reference issued on setting up a limited company or registering for Self Assessment | CORRECT | find-utr-number ("It's a 10-digit number") |
| 4 | A charitable company **or a CIO** gets a UTR on coming into existence, sent to the Companies House address | **WRONG, fixed** | A CIO is not registered at Companies House; the Companies House address line belongs to the lost-UTR request service for limited companies only |
| 5 | An unincorporated association / charitable trust acquires a UTR only when a record is opened | CORRECT | find-utr-number, chapter 6 by implication |
| 6 | A return is due if HMRC asks or the trustees believe there may be tax to pay | CORRECT | ch.6 verbatim; HP 11 |
| 7 | No annual charity tax return; some notified yearly, most occasionally | CORRECT | ch.6 |
| 8 | Small trading tiers: under £32,000 allows £8,000; £32,000 to £320,000 allows 25%; above £320,000 caps at £80,000 | CORRECT | HP 12 (three-tier, boundaries present) |
| 9 | Exceeding the limit taxes all the profits of that trade, not the excess | CORRECT | HP 12 |
| 10 | Subsidiary is the route for persistent taxable trading | CORRECT | HP 13 |
| 11 | Non charitable expenditure and non approved investments restrict the exemption | CORRECT | HP 11 |
| 12 | Trust files SA900 with supplementary page SA907 | CORRECT | ch.6 verbatim |
| 13 | Company, CIO, association file CT600 with CT600E | CORRECT | ch.6 ("other charities") |
| 14 | Trust deadline 31 January after the end of the year of assessment, filing online | CORRECT | ch.6 (paper 31 October, not claimed) |
| 15 | Company deadline within 12 months of the end of the accounting period | CORRECT | ch.6 verbatim |
| 16 | Supplementary pages must always be completed; CT600E is the claim; no computation where all exempt | CORRECT | ch.6 |
| 17 | Late filing results in a penalty charge, appealable with a reasonable excuse | CORRECT | ch.6 verbatim |
| 18 | Claims within four years of the end of the tax year (trust) or accounting period (others and CASCs) | CORRECT | ch.6 verbatim |
| 19 | A CIC is not a charity, pays corporation tax normally, claims none of these exemptions | CORRECT | HP 22-23 framing |

No STALE, no UNSOURCED figures. Nothing removed.

## Edits made (5)

1. Body bullet split: charitable company (Companies House, about a fortnight, lost-UTR request goes to the registered address) separated from a new CIO bullet (no Companies House record, nothing automatic, reference follows when HMRC opens a record).
2. FAQ "Does a small charity need a UTR?" regrouped CIO with trusts and associations rather than with companies.
3. keyTakeaway 1: "charitable company or CIO holds one from incorporation" to "charitable company holds one from the point it is registered at Companies House".
4. `summary`: same correction (59 words, in range).
5. Intro paragraph: same correction.

## Checks

- Internal links, 5 (at the cap), all targets exist and their frontmatter categories slugify to the path used: `charities/web/content/blog/hmrc-recognition-vs-charity-registration.md` (Trustee Compliance), `charity-trading-subsidiary-gift-aid.md` (Gift Aid), `do-charities-pay-vat.md` (Charity VAT), `cic-vs-charity.md` (CICs and Social Enterprises); `/services/charity-accounts` is slug `charity-accounts` in `charities/web/src/data/charity-services.ts`.
- Frontmatter complete per POST_BRIEF; `dateModified` and `updatedDate` both set to 2026-09-27. metaTitle 43, metaDescription 145. faqs 6, keyTakeaways 5. Category "Trustee Compliance" matches the canonical path. YAML re-parsed clean after editing. No em-dashes.

## Notes for Track B

- The new CIO bullet is fresh prose; check it against the CIO passages in the sibling posts for near-verbatim overlap.
- Word count rose from 1,108 to 1,167, still inside 800 to 1,200 but with little headroom if Track B adds anything.
- Link budget is full at five; any new link must replace one.
- FAQ 5 and the "When does a charity have to file" section both work the non primary purpose trading point; a trim there is editorial, but do not touch the tier figures.
