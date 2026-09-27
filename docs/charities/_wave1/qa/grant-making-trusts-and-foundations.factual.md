# Factual QA (Track A) — grant-making-trusts-and-foundations

File: `docs/charities/_wave1/grant-making-trusts-and-foundations.json`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4a (QA, Track A)
Tie-breaker: `docs/charities/house_positions.md`; primary law where silent.
Reviewed 2026-09-27.

## Assertions

| # | Section | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro | Investment income and gains exempt while applied to charitable purposes; most years no tax and no return unless HMRC asks or non-charitable expenditure arises | position 11 | CORRECT |
| 2 | stats | £25,000 = fund market value above which Commission authority is needed before spending permanent endowment | gov.uk permanent-endowment-rules-for-charities; Charities Act 2011 s281/s282 | CORRECT |
| 3 | stats | 25% = most a charity may borrow from permanent endowment without Commission authority, repayable within 20 years | gov.uk permanent endowment; CA 2011 ss284A-284D | CORRECT (narrowing: the borrowing power does not extend to permanent endowment that is designated land; the page sits at the 1,200-word ceiling so the caveat cannot be added without a cut. Not WRONG for an invested endowment, which is this page's subject.) |
| 4 | stats | Annual return deadline 10 months after financial year end | position 2 | CORRECT |
| 5 | stats | Charities SORP 2026 applies to accounting periods beginning on or after 1 January 2026 | position 7 | CORRECT (beginning framing, as required) |
| 6 | challenges 1 | Permanent endowment = property the charity must keep rather than spend | gov.uk permanent endowment | CORRECT |
| 7 | challenges 1 | ss.281 to 284D Charities Act 2011 give trustees a power to release | CA 2011 ss281-284D (281, 282, 283, 284, 284A-284D) | CORRECT |
| 8 | challenges 1 | Test turns on market value of the whole fund, not the sum to be spent; at £25,000 or less trustees resolve, above that the Commission must authorise | gov.uk permanent endowment; s281/s282 | CORRECT |
| 9 | challenges 2 | Total return stops the income/capital split; accounts must show the trust for investment, the unapplied total return and the allocation | gov.uk permanent endowment (total return by resolution); Charities (Total Return) Regulations 2013; SORP | CORRECT |
| 10 | challenges 3 | Liability arises when the charity has an obligation the recipient can rely on; multi-year, conditional and withdrawable awards land differently | Charities SORP (grants payable, constructive obligation) | CORRECT |
| 11 | challenges 4 | Grants to bodies a trustee founded, chairs or works for are related party matters; accruals accounts must disclose them | Charities SORP related party disclosures; accruals basis per position 6 | CORRECT |
| 12 | challenges 4 | "Undisclosed connected grants are a common first-examination finding" | none | UNSOURCED (qualitative, not a figure, so the spec's removal rule does not reach it; flagged) |
| 13 | challenges 5 | Portfolio management charges belong with the cost of generating funds, not charitable activity | Charities SORP (costs of raising funds include investment management costs) | CORRECT |
| 14 | challenges 5 | No blanket VAT exemption for charities, so those fees are usually a cost carried | position 20 | CORRECT |
| 15 | challenges 5 | Grants outside the objects, and certain loans and investments, count as non-charitable expenditure | position 11; CTA 2010 Pt 11 Ch 3 | CORRECT |
| 16 | howWeHelp 1 | Receipts and payments where the law still allows it, otherwise accruals under the SORP | position 6 | CORRECT (states no figure, so the £250,000 to £500,000 uplift cannot be mis-framed) |
| 17 | howWeHelp 1 | SORP in its 2026 edition applies to periods beginning on or after 1 January 2026 | position 7 | CORRECT |
| 18 | howWeHelp 4 | File the annual return within the ten months allowed | position 2 | CORRECT |
| 19 | howWeHelp 5 | HMRC recognition is separate from Commission registration and the exemptions depend on it | position 10 | CORRECT |
| 20 | faq 1 | No tax on most income including investment income while applied charitably and the charity is recognised by HMRC; non-qualifying income or non-charitable spending brings tax and a return; HMRC may issue a notice to file | positions 10, 11 | CORRECT |
| 21 | faq 2 | Fund market value £25,000 or less: trustees may resolve to spend if satisfied the purposes would be met more effectively; above £25,000 the Commission must authorise; borrowing up to 25%, repaid within 20 years | gov.uk permanent endowment; ss281, 282, 284A-284D | CORRECT (same designated-land narrowing as #3) |
| 22 | faq 3 | Total return treats income and growth as one return with an annual allocation decided by trustees; reporting consequences as listed | gov.uk permanent endowment; Total Return Regulations 2013 | CORRECT |
| 23 | faq 4 | Recognition once the award is communicated with no conditions left in the charity's own control; discretionary or future-conditional awards not yet a liability; multi-year awards split, amounts payable after twelve months shown separately | Charities SORP (grant commitments; creditors under and over one year) | CORRECT |
| 24 | faq 5 | Connected-body grants are related party transactions requiring note disclosure on accruals accounts; the grant itself is usually lawful | Charities SORP; position 6 | CORRECT |
| 25 | faq 6 | Tiering: under £10,000 income and spending only; £10,000 to £25,000 the annual return questions; above £25,000 also the trustees' annual report and accounts; ten months in every case | position 2 | CORRECT (matches the position verbatim) |
| 26 | faq 7 | External scrutiny starts once gross income exceeds £25,000; £40,000 for accounting years ENDING on or after 30 September 2026 | position 3 (S.I. 2026/427) | CORRECT (ending framing, correct side of the beginning-vs-ending trap) |
| 27 | faq 7 | Above the audit thresholds an examination is not enough and a statutory audit is required; a trust deed or funder can require scrutiny the law would not | position 4 | CORRECT (states no audit figure, so position 4's "both limbs together" rule is not breached) |

## Sources array

Covers every figure on the page: positions 2, 3, 4, 6, 7, 10, 11, 20 and 26, plus the gov.uk permanent endowment page carrying the £25,000 gate, ss281-284D, the 25% borrowing power repayable within 20 years, and total return. No figure on the page lacks an entry. Position 26 (Scotland) is cited for the explicit "England and Wales" scoping in faqs 6 and 7, which is the correct use of it.

## Links

| Link | On disk | Verdict |
|---|---|---|
| `/blog/charity-accounts-and-sorp/charity-sorp-2026-changes` | `charities/web/content/blog/charity-sorp-2026-changes.md`, category "Charity Accounts and SORP" slugifies to `charity-accounts-and-sorp` | OK |
| `/blog/trustee-compliance/trustees-annual-report-guide` | `charities/web/content/blog/trustees-annual-report-guide.md`, category "Trustee Compliance" | OK |
| `/blog/trustee-compliance/charity-commission-annual-return-guide` | `charities/web/content/blog/charity-commission-annual-return-guide.md`, category "Trustee Compliance" | OK |
| `/calculators/independent-examination-vs-audit-checker` | `charities/web/src/lib/calculators/tools/independent-examination-audit-checker.ts`, `slug: "independent-examination-vs-audit-checker"` | OK (filename differs from the slug; the slug field is what routes) |

## Other checks

- Word count across intro, challenges, howWeHelp and faqs including section titles and FAQ questions: 1,199. Inside 800 to 1,200, with one word of headroom. This is why no clarifying clause was added at #3 and #21.
- metaTitle 46 characters (limit 60). metaDescription 149 characters (limit 160).
- No em-dashes.
- JSON parses.

## Edit log

No edits. No WRONG or STALE item was found. The one UNSOURCED item (#12) is a qualitative statement rather than a figure, so the removal rule does not apply to it.

Edits made: 0.

VERDICT: PASS
