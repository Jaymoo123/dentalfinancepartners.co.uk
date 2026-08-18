# Pack (experiment 3, conversational coverage): `multiple-dwellings-relief`

## 1. Target and permission
- File: `Property/web/content/blog/multiple-dwellings-relief.md`
- Change: insert ONE new H2 section (or extend the FAQ block if the post has one, with new
  entries only) that directly answers the Bing-only questions below. Answer-first: the number
  or the yes/no lands in the first sentence of each answer. Use the searcher's phrasing in the
  heading/question where it reads naturally; never force a variant verbatim.
- 3 to 5 questions answered, chosen from the list below by impressions.
- Baseline: Bing 14 impr / 0 clicks @ wpos 6.14; Google 28d 7 impr / 0 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## The Bing-only questions (queries Bing shows this page for that Google never has)

- `multiple dwellings relief not aboldiaed for lbtt?` : 1 impr, pos 1.0
- `ltt tax 2024 when it came into effect` : 1 impr, pos 3.0
- `chapter 5 property taxation sdlt ltt` : 1 impr, pos 6.0
- `is mdr still available for sdlt?` : 1 impr, pos 9.0
- `what are the  multiple dwellings relief rules after june 2024` : 1 impr, pos 6.0

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `multiple dwellings relief` : 3 impr, 0 clicks, pos 7.7
- `multiple dwelling relief` : 2 impr, 0 clicks, pos 5.0
- `sdlt multiple dwelling relief` : 2 impr, 0 clicks, pos 10.0
- `ads multiple dwelling relief eligibility` : 1 impr, 0 clicks, pos 4.0
- `multiple dwellings relief not aboldiaed for lbtt?` : 1 impr, 0 clicks, pos 1.0
- `lbtt on property swap rules` : 1 impr, 0 clicks, pos 4.0
- `ltt tax 2024 when it came into effect` : 1 impr, 0 clicks, pos 3.0
- `chapter 5 property taxation sdlt ltt` : 1 impr, 0 clicks, pos 6.0
- `is mdr still available for sdlt?` : 1 impr, 0 clicks, pos 9.0
- `what are the  multiple dwellings relief rules after june 2024` : 1 impr, 0 clicks, pos 6.0

Google 28d:

- none

## Acceptance
1. Diff is insert-only (one H2 section or new FAQ entries; existing entries byte-identical).
2. Each targeted question is answered under a searcher-worded heading with the answer in
   sentence one; facts re-derivable from the post or house_positions.md.
3. No em-dashes, no new links unless the post already links the same target.
