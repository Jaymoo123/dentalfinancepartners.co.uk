# Pack (experiment 3, conversational coverage): `rent-a-room-relief-uk-landlords-lodgers-guide`

## 1. Target and permission
- File: `Property/web/content/blog/rent-a-room-relief-uk-landlords-lodgers-guide.md`
- Change: insert ONE new H2 section (or extend the FAQ block if the post has one, with new
  entries only) that directly answers the Bing-only questions below. Answer-first: the number
  or the yes/no lands in the first sentence of each answer. Use the searcher's phrasing in the
  heading/question where it reads naturally; never force a variant verbatim.
- 3 to 5 questions answered, chosen from the list below by impressions.
- Baseline: Bing 18 impr / 0 clicks @ wpos 7.61; Google 28d 138 impr / 0 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## The Bing-only questions (queries Bing shows this page for that Google never has)

- `rent a room scheme 2026 uk` : 4 impr, pos 8.0
- `does the rent a room allowance include bill money` : 3 impr, pos 7.0
- `rent a room tax free allowance 2026` : 3 impr, pos 8.3
- `when did the rent a room releif come in` : 1 impr, pos 7.0
- `do you have to live in the property to claim rent a room relief` : 1 impr, pos 10.0
- `how do i show the deduction of utility expenses from the rent a room allowance of £7,500?` : 1 impr, pos 7.0
- `rent a room joint ownership allowance` : 1 impr, pos 7.0
- `does the rent a room allowance apply for my only house whilst i am backpacking` : 1 impr, pos 7.0

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `rent a room scheme 2026 uk` : 4 impr, 0 clicks, pos 8.0
- `does the rent a room allowance include bill money` : 3 impr, 0 clicks, pos 7.0
- `rent a room tax free allowance 2026` : 3 impr, 0 clicks, pos 8.3
- `when did the rent a room releif come in` : 1 impr, 0 clicks, pos 7.0
- `do you have to live in the property to claim rent a room relief` : 1 impr, 0 clicks, pos 10.0
- `how do i show the deduction of utility expenses from the rent a room allowance of £7,500?` : 1 impr, 0 clicks, pos 7.0
- `rent a room joint ownership allowance` : 1 impr, 0 clicks, pos 7.0
- `does the rent a room allowance apply for my only house whilst i am backpacking` : 1 impr, 0 clicks, pos 7.0
- `rent a room relief uk 26/27` : 1 impr, 0 clicks, pos 5.0
- `rent a room relief 2026/27` : 1 impr, 0 clicks, pos 8.0
- `room to let tax allowance` : 1 impr, 0 clicks, pos 8.0

Google 28d:

- `بله` : 1 impr, 0 clicks, pos 3

## Acceptance
1. Diff is insert-only (one H2 section or new FAQ entries; existing entries byte-identical).
2. Each targeted question is answered under a searcher-worded heading with the answer in
   sentence one; facts re-derivable from the post or house_positions.md.
3. No em-dashes, no new links unless the post already links the same target.
