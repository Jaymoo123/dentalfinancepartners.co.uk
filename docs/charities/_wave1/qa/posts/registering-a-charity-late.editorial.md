# Track B editorial QA: registering-a-charity-late (charities, wave 1)

Date: 2026-09-27. Reviewer: Track B (Opus). Ran after Track A (verdict PASS, 0 edits).
Read for comparison: the four other posts in `docs/charities/_wave1/posts/` plus `charity-consolidating-legacy-bank-accounts-restricted-funds.md` (landed during this pass), and the two newest live posts `charities/web/content/blog/who-can-do-an-independent-examination.md` and `charity-trading-subsidiary-gift-aid.md`.

## Verdict: PASS after fixes

Edits made: 8 (six FAQ answers rewritten, one FAQ figure phrasing tightened, one body paragraph closing rewritten). Final body word count: 1,124 (in the 800 to 1,200 band). No figure, rate, date or rule changed.

## Defects found and fixed

1. **FAQs restated the body near-verbatim.** Track A flagged this and a trigram overlap pass confirmed it: the return-tier sentence "Between £10,000 and £25,000 it answers the annual return questions" was word-for-word identical in the FAQ and the body, with the HMRC recognition sentence at 0.53 Jaccard, the scrutiny gate at 0.47, the lower return tier at 0.43, and the four-year window and the CC21b proof list in the high 0.20s. All six FAQ answers were rewritten to carry a distinct angle rather than a second telling: the reconstruction failure mode, gift-by-gift triage and untraceable donors, the sequencing risk of donations ageing past four years, the year-end choice, the rebuilt year crossing the gate once cash and grants are added back, and the Scotland contrast stated as consequence. Every figure was carried across unchanged.
2. **Scotland clause shared with siblings.** "every Scottish charity needs external scrutiny of its accounts whatever its income" appeared in this post twice (body and FAQ) and in near-identical form in `charity-consolidating-legacy-bank-accounts-restricted-funds.md` and `charity-income-from-charitable-activities-vs-donations.md`. Both instances here were reworded. The rule is unchanged and still stated without qualification: no minimum income, every Scottish charity scrutinised.
3. **FAQ 5 phrasing drifted off the gate wording** during the rewrite ("sits at £25,000"). Restored to the precise test: passed once gross income exceeds £25,000, rising to £40,000 for accounting years ending on or after 30 September 2026. The ENDING framing Track A protected is intact.

## Checks that passed with no edit

Cross-sibling and live-post sentence overlap now has no pair above 0.25 trigram Jaccard; intra-post frontmatter-to-body overlap likewise. No AI tells, no em-dashes anywhere in the file, no markdown in the body (raw HTML throughout, per the site's rendering model). No pipeline leakage. No banned claims: no pricing, no named people, no "chartered", "ICAEW", "our accountants", "we advise" or "advice"; the two soft references are "a specialist reviews the reconstruction" and "your accountant prepares the accounts", both allowed phrasings. All six H2s are answer-first. The intro answers with numbers in the first three sentences (£5,000, four years, ten months). Five internal links, at the cap, not over. metaTitle 59 chars, metaDescription 151 chars. YAML re-validated after editing: parses, all fifteen keys present, 6 faqs, 5 keyTakeaways, `dateModified` and `updatedDate` both set.

## Notes for the manager

- The Scotland sentence is a wave-wide duplication risk, not a defect of this post. Three of six charities wave 1 posts carried the same clause. Worth a single agreed phrasing per post, or the pattern recurs in wave 2.
- Body is 1,124 words, 76 off the ceiling. Any later addition needs a matching cut.
- Nothing factual is in doubt. Track A's protected items (four-year window, the ENDING framing on the £40,000 uplift, the unqualified Scotland scrutiny rule) all survive the rewrite in those terms.
