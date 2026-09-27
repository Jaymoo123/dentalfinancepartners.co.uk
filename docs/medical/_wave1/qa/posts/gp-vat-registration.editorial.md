# Editorial and claims QA (Track B): gp-vat-registration

Post: `docs/medical/_wave1/posts/gp-vat-registration.md` (extension of the live
`Medical/web/content/blog/gp-vat-registration.md`)
Reviewed: 2026-09-27
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4b, plus the S4a QA paragraph
Sameness corpus: the other nine files in `docs/medical/_wave1/posts/` and the five newest posts in
`Medical/web/content/blog/`

## VERDICT: PASS

2 edits applied. Track A's 3 factual edits kept untouched. No figure, rate, date or rule changed.
Final body 963 words.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | First paragraph answers the decision with the numbers | PASS. Opens "Private work does not make your fees VATable", then the exemption, the £90,000 taxable-turnover trigger, the four taxable streams and the outside-scope NHS point, all inside the first 90 words |
| 2 | Body 800 to 1,200 words | PASS, 963 |
| 3 | Question-shaped `<h2>`s, answer in the first sentence | PASS. All five are questions ("Which Private Medical Work Is Exempt?", "Which Private Work Is Standard-Rated?", "When Exactly Must You Register?", "Should You Register Voluntarily?", "What Changes Once You Are Registered?") and each opens on its answer ("Work that passes two tests.", "Four streams account for...", "On one of two tests, whichever comes first.", "Usually no, for a mainly clinical practice.", "You become partially exempt.") |
| 4 | AI tells | PASS after edit 1. Scanned 34 tell strings (in today, delve, landscape, navigate, crucial, robust, moreover, furthermore, additionally, in conclusion, seamless, leverage, when it comes to, not only/but also, ultimately, in summary and the rest): zero hits. The one roadmap sentence was removed, see edit 1 |
| 5 | Sentences shared verbatim with a sibling | PASS. Every sentence of four words or more, body and frontmatter, diffed against 14 sibling files: zero matches. Structural sameness also checked: the openers differ in shape from the nine wave-1 siblings |
| 6 | Thin or padded sections | PASS after edit 1. Five sections, each 90 to 200 words, each carrying either the table, the two tests, the three voluntary-registration cases or the partial-exemption limits. No section is a restatement of another |
| 7 | FAQ answers 40 to 120 words, not restating the question | PASS. 79, 90, 69, 76, 92, 89. All six open on the answer, none repeats its question stem. Edit 2 removed a duplicated opener |
| 8 | `summary` 40 to 60 words | PASS, 47 |
| 9 | Banned claims, case-insensitive | PASS. Zero hits for chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, advice, advise, guarantee, turnaround. No personal names, no prices of ours, no turnaround promise. The close uses the compliant form, "a specialist reviews the split" |
| 10 | No em-dashes, British English | PASS. No em-dash or en-dash anywhere in the file. "registered to practise" is the correct verb form; "apportioned", "recognised" are UK spellings |
| 11 | Frontmatter per S4b | PASS. slug, title, date, category, metaDescription present; metaTitle 55 (≤ 60), metaDescription 154 (≤ 155), h1, summary, author (site editorial-team string), canonical in the Medical flat form, dateModified bumped to 2026-09-27, 6 faqs (4 to 6), 5 keyTakeaways (3 to 5), `generator: claude-opus`. `category: GP Practice Management` is on the Medical label list verbatim |
| 12 | Raw HTML body, no markdown | PASS. `<p>`, `<h2>`, `<ul>`, `<table>`, `<strong>` only. No heading hashes, no asterisk emphasis, no markdown links |
| 13 | Internal links flat `/blog/<slug>`, at most five, on disk | PASS. Exactly five, all flat, all four verified present in `Medical/web/content/blog/`: medico-legal-expert-witness-income-doctors-tax, gp-practice-private-non-nhs-income-streams, private-practice-tax-nhs-and-private-income, accountants-for-physiotherapists-and-therapists, accountants-for-opticians-optical-practice-vat |
| 14 | No pipeline leakage | PASS. No wave, spec, prompt, placeholder, TODO or house-positions reference in the file |

## Edit log

1. **Body, paragraph 2** — removed in full: "That is the whole decision. What follows sorts your
   income into the right boxes, sets out the two registration tests, and covers what changes once
   you are registered." Reason: a roadmap sentence that announces the article instead of answering
   anything. It is the post's only padding, it reads as a model tell, and none of the nine wave-1
   siblings uses one. Body 991 to 963 words, still inside the band. No fact touched.
2. **FAQ 6, "Does the flat rate scheme work for a medical practice?"** — opener "Usually not."
   replaced with "It fits a medical practice badly." Reason: FAQ 1 already opens "Usually not.",
   so two of six answers began identically. The replacement is still answer-first and carries the
   same verdict. Answer length 85 to 89 words, inside 40 to 120. No fact touched.

Nothing else added, nothing else removed. Track A's three corrections (the two forward-look
"register by the end of that 30-day period" fixes and the occupational-health table row) are
present and unchanged.

## Re-validation after the edits

| Check | Result |
|---|---|
| YAML parses | PASS |
| Body word count | 963 (800 to 1,200) |
| metaTitle | 55 chars (≤ 60) |
| metaDescription | 154 chars (≤ 155) |
| summary | 47 words (40 to 60) |
| FAQ answer words | 79, 90, 69, 76, 92, 89 (40 to 120) |
| No em-dash | PASS |

## Note carried forward, not a Track B defect

Track A's integrator note stands: the live post's `metaTitle_prev`, `metaDescription_prev` and
`editorialNote` from the 2026-06-12 SERP meta rewrite are not carried into the extension. Whether
the meta programme's audit trail survives an extension is an integrator call.
