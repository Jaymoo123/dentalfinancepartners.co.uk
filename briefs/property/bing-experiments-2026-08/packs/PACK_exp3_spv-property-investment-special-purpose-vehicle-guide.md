# Pack (experiment 3, conversational coverage): `spv-property-investment-special-purpose-vehicle-guide`

## 1. Target and permission
- File: `Property/web/content/blog/spv-property-investment-special-purpose-vehicle-guide.md`
- Change: insert ONE new H2 section (or extend the FAQ block if the post has one, with new
  entries only) that directly answers the Bing-only questions below. Answer-first: the number
  or the yes/no lands in the first sentence of each answer. Use the searcher's phrasing in the
  heading/question where it reads naturally; never force a variant verbatim.
- 3 to 5 questions answered, chosen from the list below by impressions.
- Baseline: Bing 423 impr / 24 clicks @ wpos 5.96; Google 28d 57 impr / 2 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## The Bing-only questions (queries Bing shows this page for that Google never has)

- `what is an spv` : 14 impr, pos 6.9
- `what is an spv in property` : 5 impr, pos 2.0
- `unallocated shares spv and do mortgage lenders like them uk` : 5 impr, pos 5.8
- `article of association for a buy to let special purpose vehicle` : 4 impr, pos 3.0
- `what is a propert spv and why is it used` : 3 impr, pos 8.7
- `multiple share classes in a property spv` : 3 impr, pos 2.0
- `reasons to set up spv in property` : 3 impr, pos 8.0
- `what does spv stand for in property` : 3 impr, pos 5.7

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `spv` : 38 impr, 0 clicks, pos 8.0
- `property spv` : 26 impr, 0 clicks, pos 6.6
- `spv sic codes` : 17 impr, 0 clicks, pos 5.7
- `what is an spv` : 14 impr, 0 clicks, pos 6.9
- `sic codes for property spv` : 9 impr, 0 clicks, pos 6.3
- `spv meaning in property` : 7 impr, 0 clicks, pos 6.9
- `what is an spv in property` : 5 impr, 0 clicks, pos 2.0
- `unallocated shares spv and do mortgage lenders like them uk` : 5 impr, 0 clicks, pos 5.8
- `spv structure` : 4 impr, 1 clicks, pos 5.8
- `spv meaning property` : 4 impr, 0 clicks, pos 6.0
- `article of association for a buy to let special purpose vehicle` : 4 impr, 0 clicks, pos 3.0
- `what is a propert spv and why is it used` : 3 impr, 0 clicks, pos 8.7
- `multiple share classes in a property spv` : 3 impr, 1 clicks, pos 2.0
- `spv bespoke articles` : 3 impr, 0 clicks, pos 8.0
- `tax relief for spv` : 3 impr, 0 clicks, pos 2.0
- `reasons to set up spv in property` : 3 impr, 0 clicks, pos 8.0
- `special purpose vehicle` : 3 impr, 0 clicks, pos 9.0
- `spv for property portfolio` : 3 impr, 0 clicks, pos 7.0
- `spv codes` : 3 impr, 0 clicks, pos 8.7
- `what does spv stand for in property` : 3 impr, 0 clicks, pos 5.7
- `uk tax spv limited company rules` : 3 impr, 0 clicks, pos 5.0
- `uk taxation rules for spv limited company & self-assessment tax return` : 3 impr, 0 clicks, pos 1.0
- `structured property vehicle` : 2 impr, 1 clicks, pos 1.0
- `do spv to hold buy to let property qualify as estate agency business for aml` : 2 impr, 0 clicks, pos 4.0
- `spv (english company` : 2 impr, 0 clicks, pos 6.0
- `spv for property flipping uk` : 2 impr, 0 clicks, pos 6.0
- `ltd company for properties spv` : 2 impr, 1 clicks, pos 5.0
- `standard spv finance` : 2 impr, 0 clicks, pos 8.0
- `special value status ownership / property` : 2 impr, 0 clicks, pos 6.0
- `spv codes for uk property` : 2 impr, 0 clicks, pos 4.0
- `what is spv company` : 2 impr, 0 clicks, pos 6.0
- `whats an spv sale` : 2 impr, 0 clicks, pos 9.0
- `uk spv` : 2 impr, 0 clicks, pos 6.0
- `what is a spv` : 2 impr, 0 clicks, pos 6.0
- `spv codes for property` : 2 impr, 0 clicks, pos 6.0
- `warranty as to base cost of a property in an spv` : 2 impr, 0 clicks, pos 1.0
- `sic code for spv` : 2 impr, 0 clicks, pos 7.0
- `how many shares does a spv limited company typically have` : 2 impr, 1 clicks, pos 1.0
- `does land sec have a spv` : 2 impr, 0 clicks, pos 3.0
- `most appropriate sic code for an spv with the primary function of an investment vehicle where the principal business activity description is investments in renewable energy and other related power generation businesses, infrastructure-related businesses, resource-related businesses, and other related businesses` : 2 impr, 0 clicks, pos 8.0
- (+177 more, all protected)

Google 28d:

- `help me` : 1 impr, 0 clicks, pos 1
- `yes to the above` : 1 impr, 0 clicks, pos 1

## Acceptance
1. Diff is insert-only (one H2 section or new FAQ entries; existing entries byte-identical).
2. Each targeted question is answered under a searcher-worded heading with the answer in
   sentence one; facts re-derivable from the post or house_positions.md.
3. No em-dashes, no new links unless the post already links the same target.
