# Track B editorial QA: supported-living-contract-forecast

Date: 2026-09-27. Reviewer: Opus, editorial pass. Runs after Track A (verdict PASS, 1 edit).
Compared against: all 12 siblings in `docs/care/_wave1/posts/` and the two newest live posts, `care/web/content/blog/cqc-registration-costs-and-finance-guide.md` and `cqc-registration-timeline-cash-burn-before-trading.md`.

## Verdict: PASS after 6 edits

Body word count 1128 (band 800 to 1,200). No figure, rate, date or rule was changed.

## Method

Mechanical scan first, then a read. A 9-gram shingle comparison of this post against every sibling surfaced the shared strings; a sentence-level similarity pass at 0.62 surfaced the near-verbatim sentences. Both were re-run after the edits.

## Defects found and fixed

| # | Defect | Where | Fix |
|---|---|---|---|
| 1 | H2 not question-shaped, so not answer-first | "A worked example of the hours-to-cost bridge" | Retitled "What does the hours-to-cost bridge look like?" and the first sentence now answers it ("It turns a weekly package schedule into paid hours and then into cost") before the illustration disclaimer |
| 2 | Near-verbatim corporation tax sentence shared with `care-structure-before-cqc`, `supported-living-company-structure-before-framework-bid`, `opening-a-childrens-home-finance` (11 overlapping 9-grams) | H2 "tax and structure" | Rewritten as a forecast correction ("the corporation tax rate the projected profit actually meets"), same three figures and the same associated company rule, different construction; the paragraph now also opens answer-first ("Two corrections, and both usually push the cost up") |
| 3 | Near-verbatim VAT welfare-group sentence shared with `vat-on-domiciliary-care` FAQ (8 overlapping 9-grams) | H2 "tax and structure" | Rewritten from the modelling angle ("Registration with the Care Quality Commission puts your support income inside the welfare exemption, so the VAT ... never comes back") |
| 4 | Same VAT framing repeated three times in this post in near-identical wording, flagged by Track A | keyTakeaway 5, FAQ 6, body | All three kept, since each has a job, but reworded so none echoes another: the takeaway now leads on the modelling consequence, FAQ 6 on partial exemption, the body on set-up spend |
| 5 | Summary was a near clone of the intro paragraph | frontmatter `summary` | Rewritten as three short instructions, 53 words (band 40 to 60), same four figures; the intro keeps the long-form answer |
| 6 | Boilerplate devolved-nations closer shared with `cqc-registration-domiciliary-care-finance`, `cost-to-set-up-a-care-agency` and `how-to-start-a-domiciliary-care-agency-money-decisions` ("England is the default position here. Scotland, Wales and Northern Ireland ...") | closing paragraph | Rewritten in this post's own terms, tying the caveat to the model and the lender rather than to registration generally |

## Checks that passed with no edit

- Em-dashes: none (also no en-dashes).
- Markdown in the body: none. Body is `p`, `h2`, `table`, `a`, `strong` only.
- Pipeline leakage: no "verify at build", no "(HP", no "TODO".
- Banned claims: no pricing, no named people or brands, no "chartered", "ICAEW", "our accountants", "we advise", "advice". Royal Mencap Society v Tomlinson-Blake is a case citation, kept per Track A note.
- AI tells: scanned for the usual register ("it is worth noting", "delve", "navigate", "robust", "leverage", "crucial", "landscape", "in conclusion", "ultimately", "moreover", "comprehensive", "when it comes to"). Zero hits, before and after the edits.
- Intro answers with numbers: yes, £12.71, 15%, £5,000, 12.07%, 24 to 36 months in the first paragraph.
- H2s: all six are now question-shaped and each is answered in its first sentence.
- Internal links: five, which is the cap, not over it. All five verified on disk by Track A; unchanged by this pass.
- Meta lengths: metaTitle 56 (cap 60), metaDescription 136 (cap 155). Unchanged.
- Counts: 6 FAQs (band 4 to 6), 5 keyTakeaways (band 3 to 5), summary 53 words (band 40 to 60).
- Thin or padded sections: none. Every H2 carries at least two substantive paragraphs or a paragraph plus the table. No section was trimmed, so no fact was lost to the word count.
- YAML: re-parsed clean after every edit and at the end.

## Residual overlap, deliberately left

Three statutory strings still match siblings and cannot be reworded without changing the rule as stated:

- "employer National Insurance at 15% above the £5,000 secondary threshold" (shared with `care-structure-before-cqc`, `cost-to-set-up-a-care-agency`, `supported-accommodation-registration-and-tax`)
- "55p a mile for the first 10,000 business miles from 6 April 2026" (shared with `cost-to-set-up-a-care-agency`, `how-to-start-a-domiciliary-care-agency-money-decisions`, `care-personal-assistant-vat-registration`)
- "National Living Wage for workers aged 21 and over" at £12.71 (shared with `supported-accommodation-registration-and-tax`, `how-to-start-a-domiciliary-care-agency-money-decisions`)

These are the statutory rule stated once correctly. The surrounding sentences differ in every post, and Track B is barred from changing a figure or a rule, so they stay.

## Notes for the manager

1. The three statutory strings above recur across the wave by necessity. If the manager wants them varied, that is a wave-level wording decision, not a per-post one, and it risks accuracy. Recommendation: leave them.
2. `supported-living-company-structure-before-framework-bid` and this post are the closest pair in the wave. After edit 2 they no longer share a sentence, but they are the two posts a reader is most likely to see together, so they are worth a joint read if any later edit touches either one's structure section.
3. No factual doubt raised by this pass. Track A's one removal (the "roughly three quarters" fraction) is the only figure that left the post, and nothing in the editorial edits reintroduced a quantification.
