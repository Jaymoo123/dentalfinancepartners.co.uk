# Factual QA (Track A) - charities `/for/cios`

File: `docs/charities/_wave1/cios.json`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a, QA
Tie-breaker: `docs/charities/house_positions.md` (positions 1-7, 9, 10, 12, 13, 20, 25); primary law where silent.
Reviewed 2026-09-27.

## Assertions

| # | Field | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro | CIO registers with the Charity Commission whatever its income | pos 1 (CC21b) | CORRECT |
| 2 | intro, stat 1, faq 1, faq 5 | CIO files nothing at Companies House; no confirmation statement, no company accounts, no company number | pos 25 (structure guidance) | CORRECT |
| 3 | intro, stat 3, challenge 1, howWeHelp 2, faq 1 | Annual return due within 10 months of financial year end | pos 2 | CORRECT |
| 4 | intro, challenge 1, faq 1 | Trustees' annual report and accounts attach to the return once gross income is above £25,000 | pos 2 | CORRECT |
| 5 | challenge 1 | Under £10,000 income and spending only; £10,000 to £25,000 answer the return questions | pos 2 (tiering verbatim) | CORRECT |
| 6 | stat 2 | Other England and Wales charities register above £5,000 | pos 1 | CORRECT |
| 7 | stat 4, challenge 3, faq 2 | External scrutiny (examination or audit) required above £25,000 gross income | pos 3 (s145, CC31) | CORRECT |
| 8 | stat 4, challenge 3, faq 2 | £40,000 for accounting years ending on or after 30 September 2026 | pos 3 (S.I. 2026/427, ENDING rule) | CORRECT |
| 9 | challenge 3, faq 2 | Audit mandatory above £1m gross income, or income over £250,000 with gross assets over £3.26m | pos 4 (Charities Act 2011 s144(1)) | CORRECT - both limbs published together as pos 4 requires |
| 10 | challenge 3, faq 2 | Those become £1.5m, or £500,000 with assets over £5m, for years ending on or after 30 Sep 2026 | pos 4 (S.I. 2026/427) | CORRECT |
| 11 | challenge 3 | The asset limb catches CIOs holding a building on modest income | pos 4 (worked example £400k/£4m) | CORRECT |
| 12 | challenge 2, faq 3 | Receipts and payments available while gross income is at or below £250,000 | pos 6 (s133) | CORRECT |
| 13 | challenge 2, faq 3 | Rises to £500,000 for accounting years ending on or after 30 Sep 2026 | pos 6 | CORRECT |
| 14 | challenge 2, faq 3, faq 5 | A charitable company must always prepare accruals accounts, at any size | pos 6 (Companies Act 2006) | CORRECT |
| 15 | challenge 2, faq 3 | Above the boundary, accruals accounts under the Charities SORP | pos 6, pos 7 | CORRECT |
| 16 | howWeHelp 1 | SORP statements dated to the accounting period | pos 7 (transition rule) | CORRECT - and no SORP tier threshold is asserted anywhere on the page (open flag 1 respected) |
| 17 | challenge 4, faq 4 | A charitable company converts directly; the charity continues to exist in a different form, keeping name, charity number and existing bank accounts | gov.uk change-your-charity-structure, re-fetched 2026-09-27 ("the charity continues to exist but in a different form"; "keep the charity's existing name and keep its charity number... keep the charity's existing bank accounts") | CORRECT |
| 18 | challenge 4, faq 4 | An unincorporated charity does not convert: a new CIO is registered, assets transfer, the old charity closes, new charity number | same page, re-fetched 2026-09-27 ("setting up and registering a new CIO [and] closing your charity") | CORRECT |
| 19 | challenge 4, faq 4 | HMRC recognition must be applied for again before the new CIO can claim Gift Aid | pos 10 (recognition separate from Commission registration; new legal entity) | CORRECT |
| 20 | challenge 5 | Primary-purpose trading exempt without limit | pos 12 | CORRECT |
| 21 | challenge 5, faq 6 | Non-primary-purpose trading exempt only inside the small trading limits, a three-tier scale set by total income | pos 12 | CORRECT - tiers described, not mis-stated; the "£8k or 25% capped at £80k" shorthand pos 12 bans is not used |
| 22 | challenge 5, faq 6 | Breaching the limit taxes all that trade's profits, not the excess | pos 12 | CORRECT |
| 23 | challenge 5 | A trading subsidiary is a company and does file at Companies House | pos 13, pos 25 | CORRECT |
| 24 | faq 6 | Subsidiary profits donated up to the parent attract no corporation tax | pos 13 | CORRECT |
| 25 | challenge 5 | VAT follows the normal rules, compulsory above £90,000 taxable turnover | pos 20 | CORRECT - no "charities don't pay VAT" implication, which pos 20 bans |
| 26 | howWeHelp 3 | Whether the examiner must belong to one of the bodies listed in the Charities Act | pos 5 (s154; applies above £250,000) | CORRECT - stated conditionally ("whether"), so the £250,000 trigger is not mis-asserted |
| 27 | howWeHelp 2 | The public register carries trustee details and finances | pos 9 | CORRECT |
| 28 | faq 5 | Charity law scrutiny applies to charitable companies and CIOs alike | pos 3-6 | CORRECT |

Jurisdiction: England and Wales throughout; no Scottish figure or BEGINNING-rule framing leaks in (pos 26 trap clear).

## Sources array

Covers every assertion above. Positions 1, 2, 3, 4, 5, 6, 7, 9, 10, 12, 13, 20 and 25 are each cited with a live URL, plus the conversion fetch and the on-disk link check. No orphan assertion, no orphan source.

## Internal links (verified on disk 2026-09-27)

| Link | Target | Exists |
|---|---|---|
| `/guides/charity-structures-which-to-choose` | `charities/web/content/guides/charity-structures-which-to-choose.md` | yes |
| `/guides/audit-vs-independent-examination` | `charities/web/content/guides/audit-vs-independent-examination.md` | yes |
| `/guides/set-up-a-charity-cio` | `charities/web/content/guides/set-up-a-charity-cio.md` | yes |
| `/blog/gift-aid/charity-trading-subsidiary-gift-aid` | `charities/web/content/blog/charity-trading-subsidiary-gift-aid.md`, `category: "Gift Aid"`, `slugifyCategory` gives `gift-aid` (asserted in `charities/web/src/lib/blog.test.ts:45`) | yes |
| `/calculators/independent-examination-vs-audit-checker` | `charities/web/src/lib/calculators/tools/independent-examination-audit-checker.ts`, `slug: "independent-examination-vs-audit-checker"` | yes |

## Other spec checks

- Word count (intro, challenges, howWeHelp, faqs, titles and questions included, tags stripped): **1,200**. Inside the 800 to 1,200 band, at the ceiling.
- `metaTitle` 49 chars (limit 60); `metaDescription` 138 chars (limit 160).
- No em-dash anywhere in the file.
- Stats are all from house positions, each with a source.

## Edit log

No edits. Nothing WRONG, STALE or UNSOURCED was found. JSON unchanged and parses.

VERDICT: PASS
