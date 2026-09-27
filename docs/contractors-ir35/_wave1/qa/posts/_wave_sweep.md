# contractors-ir35 Wave 1: per-site post sweep (2026-09-27)

Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` s13 S4b. QA rules: `docs/_engines/WAVE1_POST_QA_BRIEF.md`.
All 8 posts in `docs/contractors-ir35/_wave1/posts/` read together and fixed in place by rule. No commit. `content/blog/` untouched (read-only, for image and link ground truth).

Verdict: PASS. 8 files, 19 edits. No figure, rate, date or rule changed.

## 1. The "A specialist ..." opener/closer tic

Found in 5 of 8 posts, always as a paragraph opener or the final sentence. Rule allows at most one.

| Post | Was | Now |
| --- | --- | --- |
| `alphabet-shares-contractor-company` | closer "A specialist reviews the articles, the transfer and the dividend history together" | "Read the articles, the transfer and the dividend history as one file" |
| `first-contract-outside-ir35-checklist` | closer "A specialist reviews the sequence with you before the first invoice" | KEPT (the one permitted instance) |
| `inside-ir35-keep-close-or-umbrella` | closer "let a specialist model the routes on your own reserves" | "then price each route against your own reserves and expected months inside" |
| `spouse-shareholder-or-employee-contractor-company` | closer "so a specialist looks at all three together" | "so settle all three in one sitting rather than one at a time" |
| `winding-up-taar-contractor-same-trade` | paragraph opener "A specialist reviewing a closure keeps a dated note of" | "A closure file that answers it holds a dated note of" |

`contractor-accountant-fees-cost` uses "a contractor specialist" mid-body as a noun for a firm type, not the tic. Left.

## 2. Near-verbatim overlap across siblings

Mechanical check: 7-gram shingles over every sentence of every post (frontmatter summary, takeaways, FAQs and body), flagged at >= 0.27 containment. Four cross-post pairs above threshold, all fixed on the secondary side.

| Pair | Overlap | Fix |
| --- | --- | --- |
| `alphabet-shares` / `spouse-shareholder` | 0.56, the s.626 test "the gift carries the right to the whole of the income and the property is not wholly or substantially a right to income" restated twice in the spouse post | Both spouse instances (FAQ and body) recast as a named two-condition test. Statutory wording preserved, rule unchanged. |
| `inside-ir35-keep` / `winding-up-taar` | 0.38, the s.455 / s.458 sentence | Rewritten on both sides in their own registers: 35.75%, the 6 April 2026 trigger and the nine months and one day all unchanged. |
| `inside-ir35-keep` / `winding-up-taar` | 0.30, the BADR 18% / £1m lifetime limit sentence | `inside-ir35-keep` recast as two sentences; figures unchanged. |
| `inside-ir35-keep` / `winding-up-taar` | 0.38, "the condition that catches contractors ... same or a similar trade within two years of the distribution" | `inside-ir35-keep` reopened as "What undoes that for contractors is the winding-up TAAR." |

Residual, deliberate: one pair still sits at 0.38 on the phrase "the same or a similar trade within two years of the distribution". That is the Condition C statutory test itself, one instance in `winding-up-taar`'s `summary` and one in `inside-ir35-keep`'s body; the surrounding prose now differs entirely. Rewording it further would change the rule. Left as is.

Within-post FAQ-to-body echo is inherent to the format and out of the brief's scope (siblings only). Not touched.

## 3. Frontmatter by rule

Required key set = what `contractors-ir35/web/src/lib/blog.ts` reads (via `STANDARD_MANIFEST` plus the fields mapped in `parsePostFile`) union what the two newest live posts carry (`contractor-day-rate-to-take-home.md`, `switching-umbrella-to-limited-company.md`): title, slug, date, updatedDate, dateModified, author, generator, image, altText, imageCredit, category, canonical, metaTitle, metaDescription, h1, summary, keyTakeaways, sourcesVerifiedAt, schema, faqs.

| Post | Added |
| --- | --- |
| `alphabet-shares-contractor-company` | image block, `sourcesVerifiedAt`, `schema` |
| `contractor-accountant-fees-cost` | `updatedDate` 2026-06-12 -> 2026-09-27 (the reported stale one) |
| `contractor-pension-carry-forward` | none, complete |
| `first-contract-outside-ir35-checklist` | none, complete |
| `inside-ir35-keep-close-or-umbrella` | image block, `sourcesVerifiedAt`, `schema` |
| `overdrawn-directors-loan-account-s455-contractor` | image block, `sourcesVerifiedAt`, `schema` |
| `spouse-shareholder-or-employee-contractor-company` | image block, `sourcesVerifiedAt`, `schema`, canonical quoted |
| `winding-up-taar-contractor-same-trade` | none, complete |

Verified mechanically after editing: YAML parses on all 8; `updatedDate` and `dateModified` both 2026-09-27 on all 8; canonical on every post equals `https://www.contractortaxaccountants.co.uk/blog/<slugifyCategory(category)>/<slug>`, matching the loader's own `slugifyCategory`; metaTitle <= 56 chars, metaDescription <= 153; body 935 to 1,200 words; no em-dashes.

## 4. Images

`winding-up-taar-contractor-same-trade` carried Pexels 36766672, shared with the live `closing-contractor-limited-company.md` (linked from the wave) and `psc-limited-company-contractor-tax.md`. Replaced with the block from the live `contractor-tax-planning-guide.md` (Pexels 6939518, Vlad Deep), a Limited Company Tax post that nothing in the wave links to.

Four posts had no image block at all; each took a block from a distinct live company or tax post that the wave does not link to:

| Post | Image source (live post) | Pexels id |
| --- | --- | --- |
| `winding-up-taar-contractor-same-trade` | `contractor-tax-planning-guide` | 6939518 |
| `alphabet-shares-contractor-company` | `contractor-self-assessment-guide` | 8962445 |
| `inside-ir35-keep-close-or-umbrella` | `ir35-status-tests-explained` | 32341972 |
| `overdrawn-directors-loan-account-s455-contractor` | `contractor-expenses-allowable-guide` | 7680744 |
| `spouse-shareholder-or-employee-contractor-company` | `home-office-expenses-contractor` | 8424478 |

No two wave posts now share an image. `contractor-accountant-fees-cost` keeps Pexels 6779567, also on the live `what-is-a-contractor-accountant.md`; that post is not linked from the wave, so it sits inside the same rule and was left alone. `contractor-pension-carry-forward` keeps 7545279, which is its own live predecessor at the same slug.

## 5. Internal links

31 internal links across the 8 posts, maximum 5 per post. Every one resolves, and every `/blog/<category>/<slug>` path matches the target's real category.

Calculator links, both present in `contractors-ir35/web/src/lib/calculators/tools/`:

- `/calculators/contractor-salary-dividend-calculator` (alphabet-shares)
- `/calculators/inside-ir35-take-home-calculator` (inside-ir35-keep)

Sibling-dependent links, which only resolve once the wave is integrated:

| From | To (wave sibling) |
| --- | --- |
| `inside-ir35-keep-close-or-umbrella` | `/blog/limited-company-tax/winding-up-taar-contractor-same-trade` |
| `winding-up-taar-contractor-same-trade` | `/blog/ir35-status/inside-ir35-keep-close-or-umbrella` |
| `spouse-shareholder-or-employee-contractor-company` | `/blog/limited-company-tax/alphabet-shares-contractor-company` |

The remaining 26 point at live posts in `contractors-ir35/web/content/blog/`: corporation-tax-contractor-limited-company, director-salary-dividend-split-guide, dividend-tax-rates-contractors-2026, how-to-choose-contractor-accountant, do-i-need-an-accountant-for-mtd, msc-legislation-contractors, how-to-switch-contractor-accountant, contractor-pension-employer-contributions, contractor-pension-tax-relief, contractor-pension-schemes-sipp, set-up-limited-company-contractor, flat-rate-vat-limited-cost-trader, contractor-vat-registration-guide, ir35-contract-review-checklist, inside-ir35-take-home-explained, limited-company-vs-umbrella-contractor, challenge-ir35-determination-sds, closing-contractor-limited-company. All confirmed on disk with matching categories. No `src/data/` links are used.

## Blocking integration

Nothing blocking.

One thing for the manager, not a defect: `contractor-pension-carry-forward` already exists live at the same slug. This wave file is a replacement, not a net-new post, so integration overwrites rather than adds. Worth confirming that is intended before the wave is landed.
