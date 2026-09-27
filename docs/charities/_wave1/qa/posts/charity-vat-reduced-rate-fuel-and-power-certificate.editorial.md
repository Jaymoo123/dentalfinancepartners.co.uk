# Track B editorial QA: charity-vat-reduced-rate-fuel-and-power-certificate

Date: 2026-09-27. Verdict: **PASS** (4 edits). Final body word count: 1,093. No figure, rate, date or rule was changed.

## Corpus read

All five siblings in `docs/charities/_wave1/posts/` (related-party annual return, charitable activities vs donations, CIC donations and Gift Aid, registering late, consolidating legacy bank accounts) and the two newest live posts, `charities/web/content/blog/who-can-do-an-independent-examination.md` and `charities/web/content/blog/do-charities-pay-vat.md`. The two posts another agent is patching were read only, not edited.

## Duplication

Eight-gram overlap run against every sibling and both live posts. The only hits are frontmatter boilerplate (author, canonical stem, the three dates) and the statutory phrase "use by a charity otherwise than in the course or furtherance of a business", which is quoted law and shared with `do-charities-pay-vat` by necessity. No shared prose sentence, FAQ or takeaway. Nothing to fix.

## Edits made (4)

1. `title` was 62 characters, over the 60 cap. "the 5% Rate and the Certificate" to "the 5% Rate and Certificate". Now 58. `metaTitle` 54 and `metaDescription` 152 were already inside their caps and are untouched.
2. Intro: dropped the rhetorical tail "so the relief is worth what you claim it for and nothing for the years you did not", replaced with the operative point, that the supplier applies the lower rate only from the date it holds the certificate. The old clause argued; the new one answers.
3. The 60% section's second paragraph, the one Track A flagged. Removed "That threshold is worth measuring against rather than guessing past" and "The gap between those two answers is larger than the gap between 55% and 62% suggests, and on a meter where the split is genuinely close the measurement is the cheapest work available to you". Replaced with a direct statement of the same point and the three measurement bases. 55% and 62% are kept as the worked illustration, unchanged.
4. "along the same lines as the other charity reliefs it cannot reach" to "as it does on the other reliefs written around charities". The original was vague and read as filler.

## Checks

| Check | Result |
|---|---|
| Body word count | 1,093, inside 800 to 1,200 |
| metaTitle / metaDescription | 54 / 152 |
| title | 58 after edit |
| Em-dashes and en-dashes | 0 |
| Markdown in body | none, raw HTML only |
| Internal links | 3, all verified on disk by Track A |
| H2s answer-first | all seven, first sentence carries the answer |
| Intro answers with numbers | yes: 5%, 20%, 0%, 1 Oct 2026 to 31 Mar 2027 |
| Pipeline leakage | none |
| Banned claims | none; pricing, named people, "chartered", "ICAEW", "advice" all absent; required "a specialist reviews" and "your accountant prepares" both present |
| Thin or padded sections | the 60% section was the only one, now fixed |
| YAML | re-parsed after editing, 15 keys, valid |

## Notes for the manager

- `h1` is 90 characters. Not a defect under this brief, which caps `metaTitle` and `title` only, but it will wrap to three lines on a phone. If the wave wants a cap, "Charity VAT on fuel and power: the 5% rate and the certificate you send" is 71 and keeps the query.
- This post and the live `do-charities-pay-vat` both explain the business and non-business line. The overlap is conceptual, not textual, and the post links across rather than repeating, but whoever is patching that live post should keep its treatment short and let this one carry the fuel and power detail.
- Nothing here depends on the two posts being patched concurrently beyond the two links, which Track A verified resolve.
