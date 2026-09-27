# Track B editorial QA: contractor-pension-carry-forward

Site: contractors-ir35. Reviewed 2026-09-27, after Track A (verdict PASS, 1 edit). Row type:
PARTIAL / extend of the live post of the same slug. Compared against the seven sibling drafts in
`docs/contractors-ir35/_wave1/posts/` and the two newest live posts
(`contractor-day-rate-to-take-home.md`, `switching-umbrella-to-limited-company.md`).

**Verdict: PASS** (1 edit). Body 935 words.

## Checks

| Check | Result |
|---|---|
| Verbatim or near-verbatim sentences shared with a sibling | None. Six-word shingle sweep over all seven sibling drafts and the two newest live posts, including FAQs and takeaways, returned no pair above 0.25 Jaccard. |
| AI tells | None. No "in today's landscape", no "it's important to note", no tricolon padding, no "delve". |
| Em-dashes | None, body or frontmatter. |
| Markdown in the body | None. Body is raw HTML throughout, one table, five anchors. |
| Thin or padded sections | None. Six H2s, each 90 to 140 words, each carrying a distinct rule. |
| H2s answer-first | Yes. Every H2 is a question and every following sentence answers it directly ("Start with £60,000", "Because the company is paying it, not you", "Two situations cut it", "Only years in which you were a member"). |
| Intro answers with numbers | Yes. £60,000, three years, £240,000 in the first two sentences. |
| Pipeline leakage | None. No "verify at build", no "(HP..)", no TODO, no generator artefacts in the body. |
| Banned claims | None. No pricing, no named people, no "chartered", no "ICAEW", no "our accountants", no "we advise", no "advice". "Our guide" / "our guides" used twice as link framing, which is the wave pattern. |
| Word count | 935, inside 800 to 1,200. |
| Meta lengths | metaTitle 56, metaDescription 153. Both inside the caps. |
| Internal links | 5, at the cap, not over. |
| YAML | Re-parsed clean after editing: 21 keys, frontmatter intact. |

## Edits made (1)

1. Closing paragraph of "What should you check before the company pays?": replaced the opener
   "A specialist reviews those figures against your statements before a large one-off contribution
   goes out" with "Run those figures against your annual benefit statements before a large one-off
   contribution leaves the company account". The "A specialist reviews" construction opens or
   closes several other wave posts (`alphabet-shares-contractor-company.md` closer,
   `first-contract-outside-ir35-checklist.md` closer), so this post's use of it in the same closing
   position was a wave-level tell. Meaning, links and word order otherwise unchanged. No figure,
   rate, date or rule touched.

## Ruling on `primaryKeyword`

**Keep it.** The test was: remove unless the loader or the live siblings use it. The loader
`contractors-ir35/web/src/lib/blog.ts` does not read it, but thirteen live posts in
`contractors-ir35/web/content/blog/` carry it, including two this post links to
(`contractor-pension-schemes-sipp.md`, `director-salary-dividend-split-guide.md`). It is a live
site convention rather than pipeline residue, so dropping it here would make this post the odd one
out. It is inert at render time either way.

Track A's secondary point stands separately: the value "contractor pension calculator" points at a
calculator the post does not link to, and the post has no link budget left. That is a targeting
question for the manager, not an editorial defect, and I have not changed the value.

## Notes for the manager

- The two within-post overlaps Track A flagged (FAQ 2 against the H2 2 paragraph on the salary cap,
  FAQ 5 against the H2 4 MPAA paragraph) are real but are the intended FAQ-mirrors-body pattern
  used across the whole wave, and neither is verbatim. Left as they are. Say the word if you want
  FAQ answers to stop restating the body on this wave, because that is a wave-wide rewrite, not a
  one-post fix.
- No figure, rate or rule was doubted. Track A's assertion table is locked by house positions and I
  found nothing editorial that bears on it.
- Track A's cross-wave finding still needs action elsewhere: `contractor-accountant-fees-cost.md`
  carries the same stale `updatedDate` against `dateModified` that this post had.
