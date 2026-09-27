# Editorial and claims QA (Track B): nhs-pension-scheme-pays-doctors-deadlines

File: `docs/medical/_wave1/posts/nhs-pension-scheme-pays-doctors-deadlines.md`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4b, plus the S4a "QA" paragraph.
Reviewed 2026-09-27. Track A (factual) PASSED earlier the same day with 2 edits; both kept,
neither reopened. No figure, rate, date or rule was touched in this pass.

Sameness corpus: the other nine files in `docs/medical/_wave1/posts/`,
`docs/medical/_wave1/retiring-doctors.json`, and the five newest posts in
`Medical/web/content/blog/` (`selling-private-medical-practice-cgt-badr`,
`accountants-for-opticians-optical-practice-vat`,
`accountants-for-physiotherapists-and-therapists`,
`accountants-for-vets-veterinary-practice-tax`, `locum-doctor-ir35-what-you-need-to-know`),
plus the live post this row extends.

## Findings

| # | Check | Result |
|---|---|---|
| 1 | First paragraph answers the decision with the numbers | PASS. Names the two routes in the first sentence, then £2,000, £60,000 for 2026/27 and 31 July 2028, then scopes the page out of "how the charge arises". |
| 2 | Body 800 to 1,200 words | PASS. 1,194 words, tags stripped, section titles and questions counted. |
| 3 | Question-shaped H2s, answer first | PASS. Four H2s, all questions. "What is the Scheme Pays deadline for a 2026/27 charge?" opens "31 July 2028."; the other three answer in the first clause ("Neither is better as a rule", "Mandatory Scheme Pays is a right under...", "Confirm the pension input amount for each scheme"). The single H3 is a table label, not a section. |
| 4 | AI tells | PASS. Zero hits across the usual register (important to note, delve, landscape, crucial, robust, moreover, furthermore, in conclusion, ultimately, when it comes to, navigate, complexities, comprehensive, ensure, leverage, seamless, holistic, myriad, realm, underscore, pivotal, "not just X but Y", "let's"). |
| 5 | Sentences shared verbatim with a sibling | ONE DEFECT, fixed (edit 1). `summary` carried "A 2026/27 charge must be elected by 31 July 2028." word for word from the Scheme Pays paragraph in `docs/medical/_wave1/retiring-doctors.json`. One further match, "An election can be amended but it cannot be revoked", is against the live post this row extends, i.e. the same asset under the same slug, so it is carry-over rather than sameness. Nothing else over six words matches any sibling. |
| 6 | Thin or padded sections | PASS. Shortest section is the closing H2 at about 140 words over two paragraphs, both load-bearing (the pre-decision checklist, then the amend-never-revoke consequence). No section restates another; the comparison table carries distinct points rather than repeating the prose above it. |
| 7 | FAQ answers 40 to 120 words, not restating the question | PASS. Six answers at 86, 76, 68, 64, 69 and 69 words. Each opens on the answer ("It depends on whether you have the cash", "The charge is deducted", "Only where both statutory conditions", "By 31 July 2028", "Where the scheme administrator gives you information", "An election can be amended but it cannot be revoked"). None restates its question. |
| 8 | `summary` 40 to 60 words | PASS. 52 words after edit 1 (50 before). |
| 9 | Banned claims, case-insensitive | PASS. No "chartered", "ICAEW", "ACCA", "CIOT", "our accountants", "we are accountants", "our team", "award", "regulated", "advice", "advise", no turnaround promise, no price of our own. No personal name: the only named bodies are HMRC, NHSBSA and the Government Actuary's Department. The closing line is "A specialist reviews the statement...", the form S4b requires. |
| 10 | No em-dashes, British English, one current tax year leads | PASS. Zero em-dashes and zero en-dashes. British spellings throughout ("modelling", "capitalised", "revalued"); no US forms found. 2026/27 is the first and leading tax year, in the intro; 2025/26 appears once, later, only as the worked contrast for the deadline rule. |
| 11 | Frontmatter per S4b | PASS. 18 keys. `slug`, `title`, `date`, `category`, `metaDescription` present (build). `metaTitle` 50 chars (≤ 60), `metaDescription` 147 chars (≤ 155), `h1`, `summary`, `author` = "Medical Accountants UK Editorial Team" (matches the newest live post verbatim), `canonical` in the Medical flat form, `dateModified` 2026-09-27 bumped above `date` 2026-06-03 as an extended row requires, `faqs` 6 (band 4 to 6), `keyTakeaways` 5 (band 3 to 5, each one sentence), `generator: claude-opus`. `category: NHS Pension Planning` is one of the eight Medical labels verbatim. Slug, canonical, date and category are unchanged from the live post, as PARTIAL rows require. All nine `REQUIRED_FIELDS` in `scripts/validate_blog_content.py` present. |
| 12 | Raw HTML body, no markdown, links | PASS. `<p>`, `<h2>`, `<h3>`, `<table>` only; no heading hashes, no list markers, no `**`, no shortcodes, no CTA markup. Five links, the cap: `/blog/nhs-pension-annual-allowance-complete-guide`, `/calculators/nhs-pension-scheme-pays`, `/blog/mccloud-remedy-nhs-pension-doctors-explained`, `/blog/nhs-pension-tapered-annual-allowance-calculator`, `/blog/nhs-pension-partial-retirement-doctors-guide`. All four blog targets exist in `Medical/web/content/blog/`; all are the Medical flat `/blog/<slug>` form. The calculator slug exists at `Medical/web/src/lib/tools/configs/nhs-pension-scheme-pays.ts`. |
| 13 | Pipeline leakage | PASS. No wave, brief, map-row, prompt, model or QA language in the prose. `generator: claude-opus` is the frontmatter key S4b mandates, not leakage. |

Statute density was checked against the S4b "statute references sparse" rule: three citations in
the body (s.237B, s.237BA, s.237B(6)), each doing work on a page whose whole subject is a
statutory right and a statutory deadline. Within band, no edit.

## Edit log

1. `summary`: "in one scheme. A 2026/27 charge must be elected by 31 July 2028." changed to
   "in one scheme. The election deadline for a 2026/27 charge falls on 31 July 2028." The
   original sentence was verbatim identical to a sentence in the Scheme Pays paragraph of
   `docs/medical/_wave1/retiring-doctors.json`, which links to this very post, so the two
   assets would have shipped the same sentence side by side. Rewording only: same year, same
   date, same rule, and the summary stays in band at 52 words.

Total edits: 1. No figure, rate, date or rule changed. Track A's two edits left intact.

## Final measurements

- Body: 1,194 words (band 800 to 1,200).
- `metaTitle`: 50 characters (limit 60).
- `metaDescription`: 147 characters (limit 155).
- `summary`: 52 words (band 40 to 60).
- FAQ answers: 86, 76, 68, 64, 69, 69 words (band 40 to 120).
- keyTakeaways: 5, one sentence each.
- Em-dashes: 0. Internal links: 5 (cap 5), all verified on disk.
- Frontmatter re-parsed as YAML after the edit: valid, 18 keys.

VERDICT: PASS
