# Track B editorial QA: nhs-continuing-healthcare-accounts

Date: 2026-09-27. Reviewer: Opus. Runs after Track A (verdict PASS, 0 edits).

Read for comparison: all 11 other posts in `docs/care/_wave1/posts/`, the two newest live posts (`cqc-registration-costs-and-finance-guide`, `cqc-registration-timeline-cash-burn-before-trading`) and the live overlap sibling `fnc-chc-la-fee-mix-accounting`.

**Verdict: PASS after fixes.** 6 edits. Body 1,143 words (was 1,129).

## Defects found and fixed

All six were duplication. Nothing else failed.

| # | Where | Defect | Fix |
|---|---|---|---|
| 1 | Body, FNC-versus-CHC paragraph | Near-verbatim with the live sibling `fnc-chc-la-fee-mix-accounting` ("the resident's primary funding arrangement stays in place... the NHS adds the FNC payment on top") | Recast around who is buying the bed rather than around the top-up framing the sibling owns |
| 2 | FAQ 3, "Is CHC income VAT exempt?" | Opened with the exact sentence frame used in `cost-to-set-up-a-care-agency` and `vat-on-domiciliary-care` ("Welfare services supplied by a CQC-registered provider are exempt from VAT under Group 7...") | Answer-first, CHC-specific: the payer is irrelevant, a bed does not change VAT character because the NHS took over the invoice |
| 3 | FAQ 4, the £90,000 threshold | Shared across three wave siblings (`supported-accommodation-registration-and-tax`, `supported-living-company-structure-before-framework-bid`, `vat-on-domiciliary-care`), same shape and near-identical clauses | Rewritten to this post's situation: NHS contract income grows the bank balance without moving the taxable total, and the taxable items that do count are named |
| 4 | Body, VAT section opening | Same statute frame as defect 2 | Reworded, citation kept intact |
| 5 | Body, de minimis sentence | Near-verbatim in four wave siblings, including both limbs in the same order and the same clause structure | Rewritten as a condition on the home rather than as a recital of the test; both limbs and both figures preserved exactly |
| 6 | Key takeaway 2 | Restated the summary almost word for word (Track A note) | Rewritten around the moment the award lands; £267.68 and the standard-rate label unchanged |

Also considered and left alone: the Scotland, Wales and Northern Ireland section (same subject as the live sibling's devolved section but no shared phrasing), the FNC-versus-CHC comparison table (the sibling's table is a four-payer recognition table, this one is a two-column contrast, no shared rows), and takeaway 1 against the summary (overlapping subject, no shared run of words).

## Checks passed

- No verbatim or near-verbatim sentence left with any sibling. A 9-word shingle sweep across all 11 wave siblings plus the three live posts now returns only the statutory citation "Group 7 of Schedule 9 to the Value Added Tax Act 1994" and frontmatter boilerplate, both of which must stay fixed.
- No AI tells, no em-dashes or en-dashes, no markdown in the body, no pipeline leakage.
- No banned claims: no pricing, no named people or brands, no "chartered", "ICAEW", "our accountants", "we advise" or "advice". House phrasings "a specialist reviews" and "your accountant prepares" both present and untouched.
- Every H2 is answer-first: "Three things change together", "On its own line", "No, and the assumption that it might is common enough to be worth killing off", "As reviewable income", "Retrospective awards... create a double recognition risk", "The position above is England", "Split the income lines first".
- Intro answers with numbers in the first two sentences (£267.68 standard, £368.24 higher, from 1 April 2026).
- No thin or padded sections. Body 1,143 words, inside 800 to 1,200. Nothing Track A flagged as load-bearing was trimmed.
- metaTitle 47 chars, metaDescription 144 chars, summary 53 words, 6 FAQs, 5 key takeaways.
- 5 internal links, at the cap, all unchanged from Track A's verified set.
- YAML re-parsed after editing: 15 keys, valid.

## No figure, rate, date or rule was changed

The edits are wording only. £267.68, £368.24, 1 April 2026, £90,000, £625, the 50% limb, the 3-month and annual review cadence and the Group 7 citation all read exactly as Track A graded them.

## Notes for the manager

1. The de minimis two-limb sentence is now phrased five different ways across five wave posts saying the same thing. Each is defensible on its own, but a reader hitting three of them in a session will notice the repetition of substance even though the wording differs. Worth deciding whether one post should own the partial exemption explanation and the others link to it.
2. The £90,000 threshold FAQ now appears in four wave posts with four wordings. Same observation as above; `vat-on-domiciliary-care` is the natural owner.
3. `fnc-chc-la-fee-mix-accounting` is live and states "seek advice specific to the relevant devolved regime" in its devolved section. That is a banned phrasing under the current brief. Out of scope for this post, flagged for a live-content sweep.
