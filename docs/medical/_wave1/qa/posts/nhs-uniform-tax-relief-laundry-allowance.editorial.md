# Track B editorial and claims QA: nhs-uniform-tax-relief-laundry-allowance

Reviewed 2026-09-27. File: `docs/medical/_wave1/posts/nhs-uniform-tax-relief-laundry-allowance.md`
(PARTIAL row extending the live post `Medical/web/content/blog/nhs-uniform-tax-relief-laundry-allowance.md`).
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13 S4b plus the S4a QA paragraph.
Track A (`.factual.md`) passed with 3 edits; all three are intact and untouched here.
Sameness corpus: the other files in `docs/medical/_wave1/posts/` and the five newest posts in
`Medical/web/content/blog/` (selling-private-medical-practice-cgt-badr,
accountants-for-opticians-optical-practice-vat, accountants-for-physiotherapists-and-therapists,
accountants-for-vets-veterinary-practice-tax, locum-doctor-ir35-what-you-need-to-know).

## Findings

| # | Check | Result |
|---|---|---|
| 1 | First paragraph answers the decision with the numbers | PASS. Opens with the decision (claim direct, free, keep all of it), the HMRC "100% of the money owed" wording, all four flat rate figures and the deduction-not-payment conversion (£25 basic, £50 higher). Inside the first 150 words. |
| 2 | Body 800 to 1,200 words | PASS. 1,176 words, tags stripped, section titles and the table included. |
| 3 | Question-shaped H2s, answer first | 1 DEFECT, fixed. All 7 H2s are questions and each section opens with the answer in its first sentence ("Claim yourself.", "Multiply each deduction by your marginal rate", "The parts of your claim that need evidence", "Where the cost has not fallen on you", "Three routes, all free.", "The current tax year and the 4 previous tax years.", "The mechanism, not the economics."). H2 7 was ungrammatical as a question: "What have the rules on repayment agents changed?". Rewritten, no change to the section body. |
| 4 | AI tells | PASS. Zero hits for the tell list (delve, landscape, crucial, navigate, robust, comprehensive, leverage, realm, tapestry, moreover, furthermore, "it is worth noting", "in today's", "when it comes to", "dive into", "unlock", "game-changing", "in conclusion", "that said"). No tricolon padding, no "not only... but also", no closing summary paragraph that repeats the body. |
| 5 | Sentences shared verbatim with a sibling | PASS. Automated scan of every sentence of 6+ words against the 10 sibling files: zero shared sentences. Overlap is limited to unavoidable statutory and gov.uk phrasing already handled as quotations. |
| 6 | Thin or padded sections | PASS. Shortest section is 78 words ("When can you not claim the uniform flat rate?") and it carries four distinct rules; longest is 130. No section restates another. The comparison table earns its place (five decision rows, not a decorated list). |
| 7 | FAQ answers 40 to 120 words, not restating the question | PASS. 6 FAQs at 88, 88, 82, 80, 75, 72 words. None opens by echoing its question; each opens with the answer ("Rarely.", "The flat rate expense for your occupational group...", "You can claim for the current tax year...", "Yes, where the arrangement is a nomination.", "For most expenses, yes.", "If you already complete a Self Assessment return..."). |
| 8 | `summary` 40 to 60 words | PASS. 59 words, and it is the answer rather than a description of the article's contents. |
| 9 | Banned claims, case-insensitive | PASS. Zero hits for chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, advice, advise, turnaround, guarantee, any price of our own, any personal name or named agent. The one commercial line is compliant: "a specialist reviews the whole position", and the closer is "general information and not a personal recommendation". Third-party bodies (GMC, HMRC, CNSGP, List 3) are referenced as authorities, not as credentials of ours. |
| 10 | No em-dashes, British English | PASS. Zero em-dashes and zero en-dashes used as punctuation. No -ize/-yze spellings, no American forms. |
| 11 | Frontmatter per S4b | PASS. All 18 keys present including every required one. metaTitle 54 chars (limit 60), metaDescription 151 (limit 155), h1 present, author is the Medical editorial-team string, canonical in Medical's flat `/blog/<slug>` form, `dateModified` 2026-09-27 bumped against `date` 2026-08-26 as the PARTIAL rule requires, slug/canonical/date/category unchanged from the live post, category "Medical Expenses" is a verbatim Medical label, keyTakeaways 5 (band 3 to 5), faqs 6 (band 4 to 6), `generator: claude-opus`. |
| 12 | Raw HTML body, no markdown, links flat and on disk | PASS. Only `<p>`, `<h2>`, `<table>`, `<a>`. No markdown headings, bullets, link syntax or emphasis. 4 internal links, limit 5, all flat `/blog/<slug>`, all four verified present in `Medical/web/content/blog/`: medical-professional-expenses-what-is-claimable, nurse-tax-relief-professional-subscriptions, locum-doctor-self-assessment-filing-guide, locum-doctor-expenses-what-you-can-claim. No calculator links, no shortcodes, no CTA markup. |
| 13 | No pipeline leakage | PASS. No prompt text, no agent or model names in the body, no TODO, no placeholder, no bracketed instruction, no reference to the wave, the map or the QA chain. `generator: claude-opus` is the spec's required frontmatter field, not leakage. |

No figure, rate, date or rule was changed.

## Edit log

1. Body, heading 7: `<h2>What have the rules on repayment agents changed?</h2>` to
   `<h2>What has changed in the rules on repayment agents?</h2>`. The original was not a
   well-formed question, which is the one thing an H2 in this shape has to be. Wording of the
   section beneath it is unchanged, so the answer-first sentence ("The mechanism, not the
   economics.") still answers the heading.

Total edits: 1.

## Final state

- Body word count: 1,176 (band 800 to 1,200).
- metaTitle: 54 characters (limit 60).
- metaDescription: 151 characters (limit 155).
- summary: 59 words (band 40 to 60).
- YAML re-parsed after the edit: valid, 18 keys.

VERDICT: PASS
