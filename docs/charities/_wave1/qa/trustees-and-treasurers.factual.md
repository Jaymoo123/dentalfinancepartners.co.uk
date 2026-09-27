# Track A factual QA: charities / trustees-and-treasurers

File: `docs/charities/_wave1/trustees-and-treasurers.json`
Tie-breaker: `docs/charities/house_positions.md` (positions 2-7, 26), England and Wales default.
Reviewed 2026-09-27.

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro | Page scoped to a registered charity in England or Wales | house positions, default jurisdiction | CORRECT |
| 2 | intro, challenge 1, FAQ 2 | Non-company charities with gross income of £250,000 or less may prepare receipts and payments accounts | position 6 (CC15d, CC31) | CORRECT |
| 3 | intro, challenge 1, FAQ 2 | Charitable companies always prepare accruals accounts, Companies Act requirement | position 6 | CORRECT |
| 4 | intro, stat 1, FAQ 1 | External scrutiny required once gross income exceeds £25,000; at or below, the Charities Act requires none | position 3 (Charities Act 2011 s145, s133; CC31) | CORRECT |
| 5 | intro, stat 1, howWeHelp 1 and 5, FAQ 1 and 2 | Uplift applies to accounting years ENDING on or after 30 September 2026 | position 3, S.I. 2026/427; the "beginning vs ending" trap is not tripped anywhere on the page | CORRECT |
| 6 | stat 1, FAQ 1 | Independent examination gate becomes £40,000 after the uplift | position 3 | CORRECT |
| 7 | intro, stat 4, challenge 2, FAQ 1 | Audit mandatory above £1 million income, OR above £250,000 income with gross assets over £3.26 million | position 4 (Charities Act 2011 s144(1)) | CORRECT |
| 8 | challenge 2 | Both limbs stated together; worked case of £400,000 income and a £4 million building sitting in the audit band | position 4 (the "both limbs must be published together" rule, same worked example) | CORRECT |
| 9 | challenge 2, FAQ 1 | Governing documents and funders can force an audit below the statutory gates | position 4, position 3 | CORRECT |
| 10 | FAQ 1 | Post-uplift audit figures £1.5 million, £500,000 and £5 million | position 4 | CORRECT |
| 11 | stat 3, FAQ 2 | Receipts and payments ceiling rises to £500,000 after the uplift | position 6 | CORRECT |
| 12 | howWeHelp 4 | Above £250,000 gross income the examiner must belong to a professional body listed in the Charities Act | position 5 (s154; CC31, 13 listed bodies) | CORRECT |
| 13 | intro, stat 2, howWeHelp 5, FAQ 3 | Annual return due within 10 months of financial year end; 31 March year end falls due 31 January | position 2 (arithmetic checked) | CORRECT |
| 14 | challenge 3, FAQ 3 | Return tiers: under £10,000 income and spending only; £10,000 to £25,000 answer the questions; above £25,000 attach the trustees' annual report and accounts | position 2 | CORRECT |
| 15 | challenge 3 | Annual return and trustees' annual report are separate filings; missing attachment leaves the filing incomplete on the register | position 2 (tiered content); no figure asserted | CORRECT |
| 16 | challenge 4, howWeHelp 3 | Trustees' annual report content: activities, public benefit, trustees and appointments, governance, with reserves, risks and financial review as income grows | CC15d reporting requirements (sources line 8); no figure asserted | CORRECT |
| 17 | challenge 5, FAQ 4 | New SORP edition applies to accounting periods BEGINNING on or after 1 January 2026; edition follows the accounting period | position 7 (charitysorp.org) | CORRECT |
| 18 | challenge 5, FAQ 4 | No SORP tier thresholds stated anywhere | position 7 open flag 1 respected | CORRECT |
| 19 | FAQ 4 | Receipts and payments accounts do not follow the SORP | position 7 (SORP governs accruals accounts) | CORRECT |
| 20 | FAQ 2 | Charitable incorporated organisations are not companies, so the income test decides | position 25 (a CIO registers with the Commission only, not Companies House) | CORRECT |
| 21 | FAQ 5 | Scottish charities regulated by OSCR under separate regulations; every charity needs external scrutiny whatever its income | position 26, CLOSED flag 3 (SSI 2006/218 reg 11, floor of zero) | CORRECT |
| 22 | FAQ 5 | The Scottish threshold change runs from financial years BEGINNING on or after 1 January 2026 | position 26 (SSI 2025/341 reg 1(2)) | CORRECT |
| 23 | FAQ 5 | Framings kept apart: the sentence names Scotland's beginning rule and contrasts it with year ends without carrying an E&W figure across the border | position 26 TRAP | CORRECT |

### Sources array

Covers positions 2, 3, 4, 5, 6, 7 and 26, each with a live URL or the CC31/CC15d anchor, plus a line for the trustees' annual report content. S.I. 2026/427 is named for the E&W uplift and SSI 2025/341 for the Scottish one, as the spec requires. No assertion on the page sits outside that coverage. No unsourced figures found.

### Internal links (all verified on disk)

| Link | Target | Exists |
|---|---|---|
| `/calculators/independent-examination-vs-audit-checker` | `charities/web/src/lib/calculators/tools/independent-examination-audit-checker.ts`, exported `slug: "independent-examination-vs-audit-checker"`, served by `src/app/calculators/[slug]/page.tsx` from `t.slug` (the filename differs from the slug, the route uses the slug) | YES |
| `/blog/trustee-compliance/charity-commission-annual-return-guide` | post exists, `category: "Trustee Compliance"`, `slugifyCategory` gives `trustee-compliance` | YES |
| `/blog/trustee-compliance/trustees-annual-report-guide` | post exists, same category | YES |
| `/blog/charity-accounts-and-sorp/charity-sorp-2026-changes` | post exists, `category: "Charity Accounts and SORP"`, slugifies to `charity-accounts-and-sorp` | YES |
| `/services/independent-examination` | `charities/web/src/data/charity-services.ts`, `slug: "independent-examination"` | YES |

### Mechanical

Word count 1,200 including section titles and FAQ questions, at the top of the 800 to 1,200 band. metaTitle 46 chars, metaDescription 142 chars. No em-dash. JSON parses.

## Edit log

No edits. Nothing WRONG, STALE or UNSOURCED was found.

VERDICT: PASS
