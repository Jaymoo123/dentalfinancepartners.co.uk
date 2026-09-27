# Editorial QA (Track B): care-structure-before-cqc

File: `docs/care/_wave1/posts/care-structure-before-cqc.md`
Brief: `docs/_engines/WAVE1_POST_QA_BRIEF.md`, Track B. Site brief: `docs/care/_wave1/POST_BRIEF.md`.
Track A report: `docs/care/_wave1/qa/posts/care-structure-before-cqc.factual.md` (PASS, 1 edit, 5 notes).
Compared against: the seven sibling posts in `docs/care/_wave1/posts/`, plus `care/web/content/blog/cqc-registration-costs-and-finance-guide.md` and `care/web/content/blog/cqc-registration-timeline-cash-burn-before-trading.md`.
Reviewed 2026-09-27.

## Verdict

**PASS.** 4 edits. Final body word count 1,093 (was 1,105).

## Track A notes, dispositions

| Note | Disposition |
|---|---|
| 1. Intro "the wrapper lenders and local authority commissioners expect to contract with" is unevidenced | **Fixed.** Clause removed, intro rewritten around what the structure actually does (where profit is taxed, where liability sits). No figure changed. |
| 2. FAQ 6 "Not at all" twins the h2 6 "No" on VAT/payroll neutrality | **Fixed.** FAQ 6 now opens "It changes nothing." Substance unchanged; still answer-first. Checked against `care-franchisees.json`: employer NIC, Employment Allowance and mileage are covered there in different sentences, no near-verbatim overlap. |
| 3. h2 3 and FAQ 4 repeat the ordinary-partnership liability point | **Fixed.** The h2 4 liability sentence was the near-verbatim twin of FAQ 4 ("a real consideration in a sector with long fee-settlement cycles and heavy payroll commitments" vs "matters in a sector with heavy fixed payroll and slow fee settlement"). Shortened to a one-clause statement; FAQ 4 keeps the fuller version. |
| 4. Body near the 1,200 ceiling | Net 12 words removed. No additions made. |
| 5. No em-dashes, markdown, leakage or banned claims | Re-confirmed independently. |

## Edits made

1. **Intro.** Replaced the sentence beginning "For most new care providers the answer is a limited company: it pays corporation tax at 19% ..." with two sentences that keep the same figures (19%, £50,000, 25%, £250,000, marginal relief) but drop the unevidenced lenders and commissioners claim, and reword the rate clause so it is no longer near-verbatim with `how-to-start-a-domiciliary-care-agency-money-decisions` (see duplication below).
2. **h2 4, second paragraph.** "First, liability: a sole trader and the partners in an ordinary partnership are personally exposed to the business's debts, which matters in a sector with heavy fixed payroll and slow fee settlement." to "First, liability: there is no separate legal person on either route, so the business's debts are your debts."
3. **FAQ 6.** Opener "Not at all." to "It changes nothing."
4. **h2 7 heading.** "The order to decide in" to "What order should you decide in?" The brief requires question-shaped h2s; this was the only statement heading on the page. The first sentence already answered it.

No figure, rate, date, threshold or rule was changed.

## Duplication sweep

Ran a 7-gram sentence-overlap pass over all seven siblings and the two newest live posts.

| Pair | Before | Action |
|---|---|---|
| Intro vs `how-to-start-a-domiciliary-care-agency-money-decisions` ("A company pays corporation tax at 19% on profits up to £50,000 and 25% above £250,000, with marginal relief between.") | 0.88 overlap, effectively the same sentence | Intro rewritten, edit 1 |
| h2 4 liability sentence vs own FAQ 4 | near-verbatim | Shortened, edit 2 |
| h2 1 "criminal offence under the Health and Social Care Act 2008" vs `cqc-registration-domiciliary-care-finance`, `vat-on-domiciliary-care`, `cqc-registration-timeline-cash-burn-before-trading` | 0.32 to 0.59 | **Left.** The overlap is the statutory formula itself; the surrounding sentences differ in subject and purpose. Rewording risks the fact. |
| Corporation tax rate recital vs `supported-accommodation-registration-and-tax`, `supported-living-company-structure-before-framework-bid`, `supported-living-contract-forecast` | 0.29 to 0.69 | **Left after edit 1.** What remains is the rate figures themselves in differently built sentences. |
| Welfare exemption / input VAT vs `cost-to-set-up-a-care-agency`, `supported-accommodation-registration-and-tax` | 0.32 to 0.43 | **Left.** Different framings of the same exemption; no shared sentence. |

No shared FAQ question and no shared key takeaway across the wave.

## Mechanical checks

| Check | Result |
|---|---|
| Body word count | 1,093, inside 800 to 1,200 |
| metaTitle | 54 chars |
| metaDescription | 151 chars |
| summary | 55 words |
| keyTakeaways / faqs | 5 / 6 |
| Internal links | 5, at the cap, unchanged from Track A |
| Em-dashes, en-dashes | 0 |
| Markdown in body | none; raw HTML only |
| Pipeline leakage | none |
| Banned claims (pricing, named people, "chartered", "ICAEW", "our accountants", "we advise", "advice") | none; the close uses "a specialist reviews" |
| AI tells | none found |
| H2s answer-first | all seven, after edit 4 |
| Intro answers with numbers | yes, 19% / £50,000 / 25% / £250,000 in the first two sentences |
| YAML | re-parsed after editing, 15 keys, `date`, `dateModified` and `updatedDate` all 2026-09-27 |

## Notes for the manager

1. Every wave 1 care post recites the corporation tax band and the Health and Social Care Act 2008 offence. Within one post that is fine; across eight posts published together it will read as boilerplate to a human and may look templated to a crawler. Worth deciding once at wave level whether one post owns each recital and the rest link to it.
2. Nothing else. No factual doubts raised by this pass.
