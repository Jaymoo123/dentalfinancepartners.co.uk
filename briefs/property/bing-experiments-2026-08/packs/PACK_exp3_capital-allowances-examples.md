# Pack (experiment 3, conversational coverage): `capital-allowances-examples`

## 1. Target and permission
- File: `Property/web/content/blog/capital-allowances-examples.md`
- Change: insert ONE new H2 section (or extend the FAQ block if the post has one, with new
  entries only) that directly answers the Bing-only questions below. Answer-first: the number
  or the yes/no lands in the first sentence of each answer. Use the searcher's phrasing in the
  heading/question where it reads naturally; never force a variant verbatim.
- 3 to 5 questions answered, chosen from the list below by impressions.
- Baseline: Bing 32 impr / 2 clicks @ wpos 6.22; Google 28d 0 impr / 0 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## The Bing-only questions (queries Bing shows this page for that Google never has)

- `are capital allowances worth it for commercial property. my location is united kingdom.` : 4 impr, pos 2.0
- `how to calculate unused capital allowances on a commercial property uk` : 2 impr, pos 5.0
- `what is a capital allowance calculation example` : 2 impr, pos 6.0
- `capital allowances on the sale of property` : 2 impr, pos 8.0
- `do you get capital allowances on improvements to invedtment property` : 1 impr, pos 4.0
- `discounts and capital allowance claims aia` : 1 impr, pos 10.0
- `capital allowances what is written down allowance` : 1 impr, pos 9.0
- `can you get capital allowances on property held as stock and moved to ppe` : 1 impr, pos 4.0

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `are capital allowances worth it for commercial property. my location is united kingdom.` : 4 impr, 0 clicks, pos 2.0
- `how to calculate unused capital allowances on a commercial property uk` : 2 impr, 0 clicks, pos 5.0
- `examples of capital allowances` : 2 impr, 1 clicks, pos 4.0
- `capital allowances uk property` : 2 impr, 0 clicks, pos 4.0
- `what is a capital allowance calculation example` : 2 impr, 0 clicks, pos 6.0
- `capital allowances on residential property` : 2 impr, 0 clicks, pos 9.0
- `capital allowances residential property` : 2 impr, 0 clicks, pos 8.5
- `capital allowances on the sale of property` : 2 impr, 0 clicks, pos 8.0
- `do you get capital allowances on improvements to invedtment property` : 1 impr, 0 clicks, pos 4.0
- `discounts and capital allowance claims aia` : 1 impr, 0 clicks, pos 10.0
- `printed wall wrap capital allowances` : 1 impr, 0 clicks, pos 10.0
- `capital allowances what is written down allowance` : 1 impr, 0 clicks, pos 9.0
- `can you get capital allowances on property held as stock and moved to ppe` : 1 impr, 0 clicks, pos 4.0
- `electric mains board, new kitchen downlghts and capital allowances` : 1 impr, 0 clicks, pos 5.0
- `capital allowances property sale` : 1 impr, 1 clicks, pos 6.0
- `capital allowance for a property sale uk` : 1 impr, 0 clicks, pos 5.0
- `capital allowances residential property business` : 1 impr, 0 clicks, pos 9.0
- `uk capital allowance rates 2023/2024 for rental real estate` : 1 impr, 0 clicks, pos 8.0
- `capital allowance rates in uk - property rich companies` : 1 impr, 0 clicks, pos 6.0
- `what is sec to caa` : 1 impr, 0 clicks, pos 9.0
- `rental income loss offset from capital allowance example` : 1 impr, 0 clicks, pos 9.0
- `average landlord capital contributiosn towards fit out in lkarge indutral and loficsttics bvuildings` : 1 impr, 0 clicks, pos 8.0

Google 28d:

- none

## Acceptance
1. Diff is insert-only (one H2 section or new FAQ entries; existing entries byte-identical).
2. Each targeted question is answered under a searcher-worded heading with the answer in
   sentence one; facts re-derivable from the post or house_positions.md.
3. No em-dashes, no new links unless the post already links the same target.
