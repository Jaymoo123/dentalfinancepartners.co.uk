# Pack (experiment 3, conversational coverage): `residential-property-developer-tax-uk`

## 1. Target and permission
- File: `Property/web/content/blog/residential-property-developer-tax-uk.md`
- Change: insert ONE new H2 section (or extend the FAQ block if the post has one, with new
  entries only) that directly answers the Bing-only questions below. Answer-first: the number
  or the yes/no lands in the first sentence of each answer. Use the searcher's phrasing in the
  heading/question where it reads naturally; never force a variant verbatim.
- 3 to 5 questions answered, chosen from the list below by impressions.
- Baseline: Bing 8 impr / 0 clicks @ wpos 5.25; Google 28d 16 impr / 0 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## The Bing-only questions (queries Bing shows this page for that Google never has)

- `taxed as developer or investor uk hmrc` : 2 impr, pos 6.0
- `tax differences property investor vs developer when working with a developer` : 2 impr, pos 7.0
- `max indirect tax input tax credit for re developer in uk` : 1 impr, pos 4.0
- `indirect tax input tax credit for re developer in uk` : 1 impr, pos 4.0

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `taxed as developer or investor uk hmrc` : 2 impr, 0 clicks, pos 6.0
- `residential property developer tax` : 2 impr, 0 clicks, pos 4.0
- `tax differences property investor vs developer when working with a developer` : 2 impr, 0 clicks, pos 7.0
- `max indirect tax input tax credit for re developer in uk` : 1 impr, 0 clicks, pos 4.0
- `indirect tax input tax credit for re developer in uk` : 1 impr, 0 clicks, pos 4.0

Google 28d:

- `tax on property development profits` : 4 impr, 0 clicks, pos 63.8
- `paying tax on property development` : 2 impr, 0 clicks, pos 71
- `property development tax issues` : 2 impr, 0 clicks, pos 79.5

## Acceptance
1. Diff is insert-only (one H2 section or new FAQ entries; existing entries byte-identical).
2. Each targeted question is answered under a searcher-worded heading with the answer in
   sentence one; facts re-derivable from the post or house_positions.md.
3. No em-dashes, no new links unless the post already links the same target.
