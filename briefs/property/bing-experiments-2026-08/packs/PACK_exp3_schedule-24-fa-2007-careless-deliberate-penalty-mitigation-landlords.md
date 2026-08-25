# Pack (experiment 3, conversational coverage): `schedule-24-fa-2007-careless-deliberate-penalty-mitigation-landlords`

## 1. Target and permission
- File: `Property/web/content/blog/schedule-24-fa-2007-careless-deliberate-penalty-mitigation-landlords.md`
- Change: insert ONE new H2 section (or extend the FAQ block if the post has one, with new
  entries only) that directly answers the Bing-only questions below. Answer-first: the number
  or the yes/no lands in the first sentence of each answer. Use the searcher's phrasing in the
  heading/question where it reads naturally; never force a variant verbatim.
- 3 to 5 questions answered, chosen from the list below by impressions.
- Baseline: Bing 29 impr / 0 clicks @ wpos 8.17; Google 28d 51 impr / 0 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## The Bing-only questions (queries Bing shows this page for that Google never has)

- `schedule 24 finance act 2007, paragraph 14` : 2 impr, pos 8.0
- `fa 2007 sch 24 — careless 15–30%, deliberate 35–70% of potential lost revenue.` : 1 impr, pos 7.0
- `schedule 24 fa 2007 penalities - what does careless mean` : 1 impr, pos 9.0
- `paragraph 14 schedule 24 fa 2007` : 1 impr, pos 8.0

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `schedule 24 fa 2007` : 14 impr, 0 clicks, pos 7.7
- `schedule 24 penalty` : 3 impr, 0 clicks, pos 7.0
- `schedule 24 penalties` : 3 impr, 0 clicks, pos 10.0
- `sch 24 fa 27` : 2 impr, 0 clicks, pos 10.0
- `schedule 24 finance act 2007, paragraph 14` : 2 impr, 0 clicks, pos 8.0
- `fa 2007 sch 24 — careless 15–30%, deliberate 35–70% of potential lost revenue.` : 1 impr, 0 clicks, pos 7.0
- `ch82420` : 1 impr, 0 clicks, pos 8.0
- `schedule 24 to fa 2007` : 1 impr, 0 clicks, pos 10.0
- `schedule 24 fa 2007 penalities - what does careless mean` : 1 impr, 0 clicks, pos 9.0
- `paragraph 14 schedule 24 fa 2007` : 1 impr, 0 clicks, pos 8.0

Google 28d:

- `site:www.propertytaxpartners.co.uk` : 2 impr, 0 clicks, pos 76
- `schedule 24 fa 2007` : 1 impr, 0 clicks, pos 10

## Acceptance
1. Diff is insert-only (one H2 section or new FAQ entries; existing entries byte-identical).
2. Each targeted question is answered under a searcher-worded heading with the answer in
   sentence one; facts re-derivable from the post or house_positions.md.
3. No em-dashes, no new links unless the post already links the same target.
