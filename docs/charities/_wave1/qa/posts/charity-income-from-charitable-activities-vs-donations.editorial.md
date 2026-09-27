# Track B editorial QA: charity-income-from-charitable-activities-vs-donations

Date: 2026-09-27. Reviewer: Track B (Opus). Runs after Track A (PASS, 1 edit).

**Verdict: PASS after fixes** (7 edits). Body 1,073 words, in band. No figure, rate, date or rule changed.

## Corpus read

All seven siblings in `docs/charities/_wave1/posts/` (two more landed since Track A ran: `charity-consolidating-legacy-bank-accounts-restricted-funds`, `permanent-endowment-what-trustees-can-spend`) plus the two newest in `charities/web/content/blog/` by file date: `who-can-do-an-independent-examination`, `charity-trading-subsidiary-gift-aid`. Duplication checked by 9-gram overlap across frontmatter and body.

## Edits (7)

1. **Intro, no numbers.** Every sibling answers with a figure in the opening; this one had none, and the first paragraph was near-verbatim with its own `summary`. Rewrote both intro paragraphs: the test now lands as three short sentences, and paragraph 2 carries "a ceiling that starts at £8,000 of turnover for the smallest charities". £8,000 is HP12 tier 1, already in the post; nothing new asserted.
2. **Track A note 3, the test stated three times in the body.** Cut the restatement in H2 1 ("The giveaway is exchange. Somebody is getting something identifiable, and you are obliged to provide it. That obligation is what separates this category from a gift") down to one sentence on the obligation.
3. **Same, H2 2.** Deleted "If the giver walks away with nothing but the knowledge they helped, it is a donation.", which restated the sentence directly above it.
4. **Track A note 1, small trading tiers twice in near-identical wording.** Rewrote FAQ 5. The three tiers and the all-profits rule are unchanged in substance and in figures; the sentence structure and the ordering language now differ from the H2 5 prose.
5. **Verbatim 20-word run between H2 6 and FAQ 6** ("charities with gross income over £25,000 must also attach the trustees annual report and accounts, which carry the full income analysis"). Rewrote FAQ 6 only; the body section kept its wording.
6. **Verbatim clash with `charity-consolidating-legacy-bank-accounts-restricted-funds`**, 12-word run: "Accruals accounts follow the Charities SORP, and SORP 2026 applies to accounting periods…". Reworded the target's body sentence to "report under the Charities SORP, and which edition you use depends on your period: SORP 2026 takes effect for accounting periods starting on or after 1 January 2026". Date untouched, link anchor retained.
7. **Verbatim clash with `registering-a-charity-late` and the consolidating post**, 11-word run: "OSCR, and every Scottish charity needs external scrutiny of its accounts whatever its income". Reworded the target's Scotland sentence. Also renamed the bare `<h2>Scotland</h2>` label to an answer-first heading, "The categories are the same in Scotland, but the scrutiny is not"; it was the only H2 in the post that was not answer-first.

## Checks that passed without edit

| Check | Result |
|---|---|
| AI tells | None. Closest was "This matters beyond tidiness", removed by edit 1 anyway |
| Em-dashes | 0, frontmatter and body |
| Markdown in body | None, body is HTML throughout |
| Pipeline leakage | No "verify at build", no "(HP12)", no TODO |
| Banned claims | No pricing, no named people, no "chartered", "ICAEW", "our accountants", "we advise", "advice". "A specialist reviews the classification" retained as required |
| Internal links | 5, at the limit, not over. Targets verified on disk by Track A |
| Meta lengths | metaTitle 59 (<=60), metaDescription 151 (<=155) |
| Word count | 1,061 before, 1,073 after, band 800 to 1,200 |
| Thin or padded sections | Every H2 now carries two or more paragraphs of distinct content after the trims |
| YAML | Re-parsed clean after all edits, 15 keys, `date` / `dateModified` / `updatedDate` all 2026-09-27 |

## Notes for the manager

1. **Not fixable inside this post.** "£500,000 for financial years ending on or after 30 September 2026" overlaps verbatim with two live posts, `who-can-do-an-independent-examination` and `charity-trading-subsidiary-gift-aid`. It is a statutory formula and rewording it risks the fact, so it stands. Flagging because a duplication sweep across the wave will keep surfacing it.
2. **Three of the five links point at Trustee Compliance posts** (Track A note 1). Two of those three, the annual return guide and the annual report vs annual return comparison, are also linked from `charity-annual-return-related-party-transactions` in this wave. Not a defect in either post, but the two posts will read as neighbours; worth a decision on whether they cross-link to each other instead.
3. **No doubts on any figure.** Nothing in the body needed a factual query back to Track A.
