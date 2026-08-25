# Pack (experiment 3, conversational coverage): `writing-down-allowance-cars`

## 1. Target and permission
- File: `Property/web/content/blog/writing-down-allowance-cars.md`
- Change: insert ONE new H2 section (or extend the FAQ block if the post has one, with new
  entries only) that directly answers the Bing-only questions below. Answer-first: the number
  or the yes/no lands in the first sentence of each answer. Use the searcher's phrasing in the
  heading/question where it reads naturally; never force a variant verbatim.
- 3 to 5 questions answered, chosen from the list below by impressions.
- Baseline: Bing 276 impr / 17 clicks @ wpos 5.65; Google 28d 81 impr / 1 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## The Bing-only questions (queries Bing shows this page for that Google never has)

- `example of aat level 4 business tax capital allowance computation with twdv for special pool and the general pool with a plant and specail rate car disposal calcualtion cessation? aat level 4 business exam task 2 can you show me how the table goes  balancing charde and abancing allowance as on had a mius fighure one had a positive pool figure` : 3 impr, pos 4.0
- `when does annual investmenta allowance apply to vehicles` : 2 impr, pos 9.0
- `what is wda in tax` : 2 impr, pos 4.0
- `what is under special rate pool wda?` : 2 impr, pos 3.0
- `writing down allowance on company car` : 2 impr, pos 6.0
- `whats the maximum value for a claim for writing down allowance on a car` : 2 impr, pos 3.0
- `dirty car pool wda rate 26/27` : 2 impr, pos 2.0
- `do cars qualify for wda` : 2 impr, pos 3.0

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `writing down allowance` : 26 impr, 0 clicks, pos 7.7
- `wda rates` : 11 impr, 0 clicks, pos 8.4
- `capital allowances on cars 2026/27` : 11 impr, 0 clicks, pos 6.9
- `wda tax` : 6 impr, 0 clicks, pos 7.7
- `wdv rate for 2026/27` : 5 impr, 0 clicks, pos 9.0
- `wda rates for cars` : 4 impr, 0 clicks, pos 4.2
- `writing down allowance rates` : 4 impr, 0 clicks, pos 8.0
- `writing down allowances on cars` : 4 impr, 0 clicks, pos 4.0
- `writing down allowances 2026/27` : 4 impr, 0 clicks, pos 4.0
- `wda on motor vehicles` : 3 impr, 0 clicks, pos 7.7
- `wda rate change` : 3 impr, 0 clicks, pos 7.3
- `hmrc wdv allowance rate` : 3 impr, 0 clicks, pos 3.0
- `example of aat level 4 business tax capital allowance computation with twdv for special pool and the general pool with a plant and specail rate car disposal calcualtion cessation? aat level 4 business exam task 2 can you show me how the table goes  balancing charde and abancing allowance as on had a mius fighure one had a positive pool figure` : 3 impr, 0 clicks, pos 4.0
- `when does annual investmenta allowance apply to vehicles` : 2 impr, 0 clicks, pos 9.0
- `wda on cars` : 2 impr, 1 clicks, pos 3.5
- `what is wda in tax` : 2 impr, 0 clicks, pos 4.0
- `capital allowances for cars 2026/27` : 2 impr, 0 clicks, pos 4.0
- `wda` : 2 impr, 0 clicks, pos 9.0
- `hmrc writing down allowances motor` : 2 impr, 0 clicks, pos 4.0
- `writing down allowance for cars` : 2 impr, 0 clicks, pos 3.0
- `what is under special rate pool wda?` : 2 impr, 0 clicks, pos 3.0
- `electric vehicles write down hmrc` : 2 impr, 0 clicks, pos 8.0
- `writing down allowance on company car` : 2 impr, 0 clicks, pos 6.0
- `comapny car write down allowance` : 2 impr, 0 clicks, pos 4.0
- `hmrc car write down` : 2 impr, 0 clicks, pos 4.0
- `whats the maximum value for a claim for writing down allowance on a car` : 2 impr, 0 clicks, pos 3.0
- `dirty car pool wda rate 26/27` : 2 impr, 0 clicks, pos 2.0
- `do cars qualify for wda` : 2 impr, 0 clicks, pos 3.0
- `car capital allowances 2026/27` : 2 impr, 0 clicks, pos 4.0
- `wda car rate` : 2 impr, 0 clicks, pos 3.0
- `wda rates on cars hmrc` : 2 impr, 0 clicks, pos 3.0
- `first year allowances for zero emission cars 2026/27` : 2 impr, 0 clicks, pos 5.0
- `written down allowance for co2 emmissions` : 2 impr, 0 clicks, pos 5.0
- `work out the wda for a sole trader on a used car` : 2 impr, 0 clicks, pos 7.0
- `change in wda rate` : 2 impr, 0 clicks, pos 5.0
- `motor vehicle writing down allowance` : 2 impr, 0 clicks, pos 4.0
- `hmrc property rental expenses car allowance` : 2 impr, 0 clicks, pos 10.0
- `wda 14% vs 18%` : 2 impr, 0 clicks, pos 6.0
- `wda cars` : 2 impr, 0 clicks, pos 4.0
- `capital allowances on cars special rate or general pool` : 2 impr, 0 clicks, pos 10.0
- (+101 more, all protected)

Google 28d:

- none

## Acceptance
1. Diff is insert-only (one H2 section or new FAQ entries; existing entries byte-identical).
2. Each targeted question is answered under a searcher-worded heading with the answer in
   sentence one; facts re-derivable from the post or house_positions.md.
3. No em-dashes, no new links unless the post already links the same target.
