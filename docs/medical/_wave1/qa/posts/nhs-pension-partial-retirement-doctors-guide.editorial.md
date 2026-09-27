# Editorial and claims QA (Track B): nhs-pension-partial-retirement-doctors-guide

Reviewer: Opus editorial QA, 2026-09-27
File under review: `docs/medical/_wave1/posts/nhs-pension-partial-retirement-doctors-guide.md`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4b (shape, frontmatter, body rules) and the S4a QA paragraph.
Track A (`.factual.md`) PASSED with 3 edits; all three are present and untouched.
Sameness corpus: the other nine files in `docs/medical/_wave1/posts/`, `docs/medical/_wave1/retiring-doctors.json`, and the five newest posts in `Medical/web/content/blog/`.

## Findings

| # | Check | Result |
|---|---|---|
| 1 | First paragraph answers the decision with the numbers | PASS. Opens with the three routes, the 20 to 100 percent drawdown, two drawdowns, the 10 percent pay cut held 12 months, the 24 hour break, and the permanent reduction before normal pension age. |
| 2 | Body 800 to 1,200 words | PASS. 1,124 words. |
| 3 | Question-shaped `<h2>`s, answer in the first sentence | PASS. All six H2s are questions; each opening sentence answers before it explains ("Match the route to the thing you are not willing to give up", "It costs a tenth of your pensionable pay for a year", "It costs the employment", "Two bills land", "The Scheme Pays election", "A specialist reviews..."). |
| 4 | AI tells | PASS. No hits for delve, navigate, landscape, crucial, robust, leverage, realm, pivotal, testament, ever-evolving, moreover, furthermore, in conclusion, comprehensive guide, dive into. Prose is concrete and direct. |
| 5 | Sentences shared verbatim with a sibling | PASS. Sentence-level intersection (7+ words, tags stripped) against all 15 sibling files returned zero matches. |
| 6 | Thin or padded sections | PASS. Six sections, each carrying a distinct decision input; the shortest (retire and return cost) carries two paragraphs and the trade-off; the comparison table does work the prose does not repeat. No filler paragraph found. |
| 7 | FAQ answers 40 to 120 words, not restating the question | PASS. 93, 80, 76, 99, 84, 80 words. Each opens with the answer, none echoes its question stem. |
| 8 | `summary` 40 to 60 words | PASS. 55 words. |
| 9 | Banned claims, case-insensitive | ONE HIT, FIXED. "Annual pay awards" in FAQ 3 (see edit 1). No hits for chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", "regulated", "advice", "advise", personal names, own pricing, turnaround promises. The page uses "a specialist reviews", never "we advise". |
| 10 | No em-dashes, British English, one current tax year leads | PASS. No em-dash or en-dash anywhere. No US spellings. 2026/27 is the only tax year cited, and it leads both the annual allowance passages. |
| 11 | Frontmatter per S4b | PASS. slug, title, date, category, metaDescription (build-required) present; plus metaTitle (50 chars, limit 60), metaDescription (152, limit 155), h1, summary, author (Medical editorial-team string), canonical (Medical flat form), dateModified 2026-09-27, faqs (6, band 4 to 6), keyTakeaways (5, band 3 to 5), generator `claude-opus`, image and imageCredit. Category "NHS Pension Planning" is a verbatim Medical label. |
| 12 | Raw HTML body, no markdown, links flat and on disk | PASS. Body is `<p>`, `<h2>`, `<table>` only; no markdown syntax. Five internal links, the S4b maximum, all flat `/blog/<slug>`, all five verified present in `Medical/web/content/blog/`: retiring-from-gp-partnership-tax-capital-account, nhs-pension-annual-allowance-complete-guide, nhs-pension-scheme-pays-doctors-deadlines, mccloud-remedy-nhs-pension-doctors-explained, private-practice-tax-nhs-and-private-income. No calculator links, no shortcodes, no CTA markup. |
| 13 | Pipeline leakage | PASS. No wave, spec, track, row-id, model-handoff or placeholder text in the file. `generator: claude-opus` is the S4b-required field, not leakage. |

## Edit log

1. FAQ "What is abatement and when does it stop my pension?": "Annual pay awards and ordinary incremental progression do not count as an increase" to "Annual pay uplifts and ordinary incremental progression do not count as an increase". Reason: banned term "award"; S4b reword for a pay award. Sole occurrence in the file. No figure, rate, date or rule changed.

One edit. No other change to the file; the three Track A edits are preserved.

## Mechanical re-checks after the edit

- YAML frontmatter re-parsed: valid, 6 faqs, 5 keyTakeaways.
- Final body word count: 1,124 (band 800 to 1,200).
- metaTitle 50 characters (limit 60). metaDescription 152 characters (limit 155). summary 55 words (band 40 to 60).

VERDICT: PASS
