# Factual QA (Track A) - charities `/for/cics`

File: `docs/charities/_wave1/cics.json`. Reviewed 2026-09-27.
Tie-breaker: `docs/charities/house_positions.md` positions 22 to 27; primary law where silent.

## Assertions

| # | Section | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro, faq 1 | A CIC is not a charity and pays corporation tax on profits like any other company | HP 22 | CORRECT |
| 2 | intro, stat 3, faq 2 | No Gift Aid on donations to a CIC, no charity rate relief | HP 22 | CORRECT |
| 3 | intro, faq 1, faq 6 | Regulated by the Office of the Regulator of Community Interest Companies, based at Companies House, not the Charity Commission | HP 22 | CORRECT |
| 4 | intro, challenge 2, faq 4 | Statutory asset lock: assets and profits stay in the company or move only to another asset locked body | HP 23 | CORRECT |
| 5 | intro, challenge 2, faq 4 | Dividend cap applies to a CIC limited by shares | HP 23 | CORRECT (no cap percentage asserted, so no stale-figure risk) |
| 6 | challenge 2, faq 4 | Directors may be paid a reasonable salary through payroll; shareholders cannot take the surplus | HP 23 framing plus ordinary company law | CORRECT |
| 7 | stat 1, challenge 3, howWeHelp 1, faq 3 | CIC34 community interest report filed with the annual accounts at Companies House every year, online or by post | HP 24 | CORRECT |
| 8 | challenge 3, faq 3 | CIC34 content: community benefit activities, stakeholder consultation, how assets and profits were applied, remuneration and any dividend within the cap | HP 24 plus the CIC guidance pack | CORRECT |
| 9 | challenge 3, faq 3 | "A filing fee applies" with NO figure stated | HP 24 and open flag 2 | CORRECT - open flag 2 respected; the historic £15 is nowhere on the page |
| 10 | stat 2, howWeHelp 1, faq 3 | Nine months from the accounting reference date for a private company to file, CA 2006 s442 | CA 2006 s442(2)(a) | CORRECT |
| 11 | challenge 1, faq 1 | Taxable position turns on income recognition, allowable costs, capital allowances, losses carried forward; no community-purpose relief | HP 22 plus ordinary CT rules | CORRECT |
| 12 | intro, challenge 4, faq 5 | Grant income is recognised per the conditions attached; restricted and staged funding can fall in a different period from the cash; none of it is Gift Aid | HP 22 for the Gift Aid half; accounting treatment stated with no figure | CORRECT |
| 13 | intro, challenge 5, faq 2 | Converting to a charity or a CIO is the route where Gift Aid matters; brings Charity Commission registration, trustee duties, restricted objects; conversion must respect the asset lock | HP 25 (structure choice), HP 22, CAICE 2004 s54 to s55 on ceasing to be a CIC | CORRECT |
| 14 | challenge 5 | Charitable status opens Gift Aid and rate relief | HP 14, HP 21 | CORRECT (no percentage asserted) |
| 15 | stat 4, howWeHelp 4, faq 4 | Employer National Insurance 15% above the £5,000 secondary threshold for 2026/27 | HP 27 | CORRECT |
| 16 | howWeHelp 4 | Payroll operated under RTI | Ordinary employer rules | CORRECT |
| 17 | whole page | Employment Allowance | HP 27 grants eligibility to charities and CASCs; a CIC is neither | CORRECT BY OMISSION - the page makes no EA claim, which is the right call. Importing HP 27's charity eligibility onto a CIC would have been WRONG |
| 18 | faq 6 | Late filing can bring a Companies House penalty and the Regulator's attention; HMRC deadlines run alongside | CA 2006 s453 | CORRECT |
| 19 | howWeHelp 2 | CT600 and computation prepared, liability and date given early | Ordinary CT compliance | CORRECT |
| 20 | metaTitle / metaDescription | 51 and 160 characters | Spec S4a (≤ 60, ≤ 160) | CORRECT |

No WRONG, no STALE, no UNSOURCED figure. No charity threshold (positions 1 to 6) is mistakenly
applied to the CIC, and no SORP or examination gate leaks onto the page.

## Internal links (verified on disk)

| Link | File | Category | Verdict |
|---|---|---|---|
| `/blog/cics-and-social-enterprises/cic34-form-guide` | `charities/web/content/blog/cic34-form-guide.md` | "CICs and Social Enterprises" | EXISTS |
| `/blog/cics-and-social-enterprises/orcic-cic-regulator-explained` | `.../orcic-cic-regulator-explained.md` | same | EXISTS |
| `/blog/cics-and-social-enterprises/cic-funding-and-grants` | `.../cic-funding-and-grants.md` | same | EXISTS |
| `/blog/cics-and-social-enterprises/cic-vs-charity` | `.../cic-vs-charity.md` | same | EXISTS |
| `/guides/cic-complete-guide` | `charities/web/content/guides/cic-complete-guide.md` | n/a | EXISTS |

`slugifyCategory("CICs and Social Enterprises")` returns `cics-and-social-enterprises`, asserted
by `charities/web/src/lib/blog.test.ts:44`, so every path segment resolves.

## Sources array

Covered every figure and rule before review except two supporting assertions. Otherwise complete
and each entry carries its gov.uk or legislation.gov.uk anchor.

## Edit log

| # | Edit | Reason |
|---|---|---|
| 1 | Added a `sources` entry for house position 21 (charitable rate relief) | Challenge 5 says charitable status opens rate relief; no source line covered it |
| 2 | Added a `sources` entry for CA 2006 s453 | FAQ 6 asserts a Companies House late-filing penalty; no source line covered it |

No body copy changed, so the word count is unchanged. Two source lines added; `sources` are not
rendered and are outside the word band.

## Counts

Words across intro, challenge titles and bodies, howWeHelp titles and bodies, FAQ questions and
answers: 1,199 (band 800 to 1,200, measured with HTML tags stripped). Intro 146 words, so the
buyer's situation is answered inside the first 150. No em-dash anywhere in the file. JSON
re-validated after both edits: parses, 9 source entries.

VERDICT: PASS
