# Track B editorial QA: cost-to-set-up-a-care-agency

Reviewer: Opus. Date: 2026-09-27. Site: care. Runs after Track A (verdict PASS, 2 edits).
Read for comparison: all 11 other posts in `docs/care/_wave1/posts/`, plus the two newest live posts `care/web/content/blog/cqc-registration-costs-and-finance-guide.md` and `cqc-registration-timeline-cash-burn-before-trading.md`.

## Verdict: PASS after 8 edits

Body word count 1,116 (was 1,057, band 800 to 1,200). No figure, rate, date or rule was changed. YAML re-validated.

## Formula ownership decision

The default in the task stands: `cqc-registration-domiciliary-care-finance` owns the CQC community social care fee formula in full. It is the post whose whole subject is the regulator's charge, it carries the per-location behaviour, the variation-on-growth point and the cqc.org.uk source link, and its head query is the fee query.

This post now states the formula once in the body, in the opening paragraph, because the brief requires the intro to answer with numbers and "what does it cost" cannot be answered without it. Everywhere else in the body it refers to the fee's behaviour and links across. Frontmatter keeps the figures in the summary and in FAQ 1, which is the head-term answer surfaced in search; those are not body prose and dropping them would cost the post its answer.

Result: formula in full, body, once. Three near-verbatim overlaps closed.

## Edits

| # | Location | What changed | Why |
|---|---|---|---|
| E1 | keyTakeaway 2 | Was a second full restatement of the formula. Now states the fee is a recurring annual charge that grows with the caseload and belongs in ongoing overhead as well as the opening plan. | Overlap 1 of 3 with the sibling. No figure altered, the figures stay in the summary and FAQ 1. |
| E2 | FAQ 2 | Replaced "What is the CQC fee for a domiciliary care agency?" (near-verbatim with the sibling's FAQ 1, same clause order, same figures) with "Do the costs stop once registration is granted?", answered from facts already in the post. | Overlap 2 of 3. The sibling's FAQ owns that question. The replacement is a setup question the sibling does not ask. |
| E3 | H2 "What is the CQC fee, and when does it start?" | Retitled "How does the CQC fee behave in a setup budget?" and the two paragraphs cut to one, with the formula restatement removed and a link added to the sibling. | Overlap 3 of 3: the old first paragraph tracked the sibling's H2 paragraph almost clause for clause. The section now carries only the budget consequence. |
| E4 | Payroll paragraph 1 | Rewritten around opening capital. | Was near-verbatim with `how-to-start-a-domiciliary-care-agency-money-decisions` decision four ("The National Living Wage is £12.71 for workers aged 21 and over from 1 April 2026, and £10.85 for those aged 18 to 20. Employer National Insurance runs at 15% above the £5,000 secondary threshold, offset ... Employment Allowance of up to £10,500 a year"). Same figures, new sentences. |
| E5 | Payroll paragraph 2 | Reframed as the paid-versus-billable gap, with the point that in the setup period nothing is billable at all. | Same sibling, same near-verbatim run on travel time, 55p mileage and 12.07% holiday. |
| E6 | Self-employment paragraph | Rewritten. | Near-verbatim with the sibling's substitution and HMRC-audit sentences. |
| E7 | VAT section, both paragraphs | Rewritten to the setup-cash angle. | The "VAT on your office, vehicles, software, equipment and professional fees is a permanent overhead and every cost line should be entered VAT inclusive" run and the "exempt income does not count towards the £90,000 registration threshold, which tests taxable turnover only" run both appear almost word for word in three other wave posts. Both de minimis limbs preserved exactly as Track A left them. |
| E8 | keyTakeaway 4, FAQ 4, and "We model that window separately" | Takeaway and FAQ reworded off the shared VAT stem; "We model" changed to "That window is modelled". | Takeaway 4 tracked the money-decisions takeaway; FAQ 4 opened identically to its VAT FAQ. The first person plural implied a service being performed rather than a page. "Our CQC fee calculator" and "Our walkthrough" are left, they match the sibling and the live corpus. |

## Checks

- AI tells, em-dashes, markdown in body, pipeline leakage ("verify at build", "(HP12)", "TODO"): none found, before or after.
- Banned claims: no pricing of our own, no named people, no "chartered", "ICAEW", "our accountants", "we advise" or "advice". "A specialist reviews" and "your accountant prepares" used as the brief directs.
- H2s: all five question-shaped, all answer-first in the first sentence.
- Intro answers with numbers in the first paragraph.
- Meta: metaTitle 37 of 60, metaDescription 153 of 155, both untouched. Summary 60 words, still at the ceiling, untouched.
- faqs 6 (band 4 to 6), keyTakeaways 5 (band 3 to 5).
- Internal links now 5, at the cap, none over. The new one is `/blog/cqc-and-financial-compliance/cqc-registration-domiciliary-care-finance`, a sibling in `docs/care/_wave1/posts/` whose category "CQC and Financial Compliance" slugifies to that path. The other four were verified on disk by Track A and are unchanged.
- YAML parsed clean after every edit. `updatedDate` and `dateModified` both 2026-09-27.
- No figure, rate, date, statutory reference or rule changed anywhere.

## Notes for the manager

1. No link can now be added to this post without removing one. It is at five.
2. The sentence "carrying on a regulated activity ... is a criminal offence under the Health and Social Care Act 2008" appears in near-identical form in five wave posts. It is a statement of statute and the continuations differ, so I left it. If you want it varied, it needs a wave-level ruling, not a per-post edit.
3. Wave-level duplication remains on the VAT welfare exemption stem (Group 7, Schedule 9, VATA 1994) and the payroll stack (£12.71 / 15% above £5,000 / £10,500). This post is now differentiated against `cqc-registration-domiciliary-care-finance` and `how-to-start-a-domiciliary-care-agency-money-decisions`, but `vat-on-domiciliary-care`, `supported-accommodation-registration-and-tax`, `opening-a-childrens-home-finance`, `supported-living-contract-forecast` and `care-personal-assistant-vat-registration` still share those runs with each other. Worth one sweep with a named owner per fact, the way the formula was settled here.
4. Live-corpus overlap, outside my edit scope: `care/web/content/blog/cqc-registration-costs-and-finance-guide.md` (published 2026-07-15) already covers setup cost buckets, pre-trading burn, the financial viability statement and AIA. It is vaguer than this post, which names figures it does not, but the two compete for the same intent and this post does not link to it. Decide whether it becomes a link target or a rewrite candidate before publishing the wave.
5. Track A's note that the opening clause "costs whatever it costs to keep the business alive" reads as a hedge: I kept it. The numbers arrive two sentences later in the same paragraph, and the hedge is the honest answer to a question with no single figure.
