# Track B editorial QA: charity-consolidating-legacy-bank-accounts-restricted-funds

Reviewed 2026-09-27, after Track A (PASS, 0 edits). Verdict: **PASS with edits**. Edits made: 9. Final body word count: 1,198 (under the 1,200 ceiling).

Read for comparison: the six other posts in `docs/charities/_wave1/posts/`, and the two newest in `charities/web/content/blog/` (`can-charities-claim-back-vat.md`, `do-charities-pay-vat.md`, both Charity VAT, no subject overlap).

## Defects found and fixed

### 1. Sibling overlap on the permanent endowment mechanics (Track A note 3)

`permanent-endowment-what-trustees-can-spend.md` owns ss.281 to 284D. This post restated the same machinery three times, close to the sibling's own wording: the £25,000 fund test, Commission authority above it, the 25% borrowing cap, the 20 year repayment. Fixed by stating the consequence for a consolidation and linking, per the instruction. No figure, rate, date or rule was altered; the restated ones were removed from this post and now live only in the sibling.

- Key takeaway 4: mechanics out, consequence in ("cannot be swept into a general account ... a separate statutory decision, not a by-product of a banking tidy-up").
- FAQ 4 ("Does permanent endowment stop a consolidation?"): answer rewritten to the consolidation consequence, the fund keeping its identity in the ledger, and the release and borrowing routes being separate decisions. The thresholds and limits are gone.
- H2 4 body paragraph: same treatment, plus the new internal link to the sibling.

### 2. H2s that were labels, not answers

- "Where consolidation is blocked outright" to "Three funds stay where they are".
- "The order to run it in" to "Run the exercise in this order".

### 3. The Scotland/OSCR universal-scrutiny clause, twice in near-identical words, and close to two siblings

The clause appears in FAQ 6 and the closing paragraph here, and in near-identical form in `registering-a-charity-late.md` (FAQ and body) and `charity-income-from-charitable-activities-vs-donations.md`. Both instances rewritten to this post's own framing, and differentiated from each other:

- FAQ 6: pitched at the trustee question, scrutiny "from the first pound of income", and the comparison with an English charity of the same size filing unexamined.
- Closing paragraph: pitched at the consolidation output, that the fund notes the exercise produces are read by an examiner in their first year.

Neither wording is shared with a sibling. The substance (OSCR is the regulator, no minimum income for external scrutiny) is unchanged, and matches `house_positions.md` position 26.

### 4. Word budget

Track A flagged the body two words under the ceiling, so the endowment trims above paid for the link sentence and the Scotland rewrites, and four padded phrases were tightened to bring it back under:

- "A funder will sometimes agree to release the condition when asked, which is quicker than it sounds and is worth doing in writing" to "A funder will sometimes lift the condition on request; get that in writing."
- "and the exercise often turns up one nobody on the current board knew about" to "and often one no current trustee knew about".
- "rather than by keeping accounts open" to "not by keeping accounts open".
- "Quite often the purpose is recorded in the trustees' annual report of the time even when nothing else survives" to "Often the purpose survives in the trustees' annual report of the time when nothing else does."

## Checks that passed with no edit

- No verbatim or near-verbatim sentence shared with any sibling after the fixes above. The SORP 2026 commencement sentence is a shared fact stated in different words in `charity-income-from-charitable-activities-vs-donations.md` and `charity-annual-return-related-party-transactions.md`; left as is.
- No em-dashes anywhere in the file. No markdown in the body. No AI tells.
- No pipeline leakage. No banned claims: no pricing, no named people, no "chartered", "ICAEW", "our accountants", "we advise" or "advice". "A specialist reviews the fund mapping" and "your accountant prepares the fund notes" are on the pattern the other wave posts use.
- Intro answers the question in the first paragraph and opens on a number.
- Internal links 4 of a permitted 5. The new one, `/blog/charity-governance/permanent-endowment-what-trustees-can-spend`, targets the sibling in `docs/charities/_wave1/posts/`; its category "Charity Governance" slugifies to the path used. The other three were verified on disk by Track A. One external link, to gov.uk CC8.
- metaTitle 53 of 60, metaDescription 153 of 155, both unchanged.
- YAML re-validated after editing: parses, 15 keys, `date`, `dateModified` and `updatedDate` all present and "2026-09-27".
- No section is thin or padded after the trims. Six H2s, all answer-first.

## Manager notes

1. This post now depends on `permanent-endowment-what-trustees-can-spend.md` publishing in the same wave and at the category path `charity-governance`. If that post slips or its category changes, the link here breaks and the endowment thresholds no longer appear anywhere in this post's cluster.
2. The Scotland/OSCR clause recurs in at least four wave 1 posts. Two of the others, `registering-a-charity-late.md` and `charity-income-from-charitable-activities-vs-donations.md`, are still close to each other in phrasing. Worth one pass across the wave rather than post by post.
3. Track A's deliberate omission (adjusted market value under s.282(1)(a) where trustees have already borrowed from the fund) is now covered by the sibling, which states it in FAQ 2 and in its H2 3 body. No gap left.
