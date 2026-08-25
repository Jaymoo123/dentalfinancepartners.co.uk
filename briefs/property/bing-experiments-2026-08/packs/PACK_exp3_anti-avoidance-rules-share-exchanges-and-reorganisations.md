# Pack (experiment 3, conversational coverage): `anti-avoidance-rules-share-exchanges-and-reorganisations`

## 1. Target and permission
- File: `Property/web/content/blog/anti-avoidance-rules-share-exchanges-and-reorganisations.md`
- Change: insert ONE new H2 section (or extend the FAQ block if the post has one, with new
  entries only) that directly answers the Bing-only questions below. Answer-first: the number
  or the yes/no lands in the first sentence of each answer. Use the searcher's phrasing in the
  heading/question where it reads naturally; never force a variant verbatim.
- 3 to 5 questions answered, chosen from the list below by impressions.
- Baseline: Bing 7 impr / 0 clicks @ wpos 4.71; Google 28d 0 impr / 0 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## The Bing-only questions (queries Bing shows this page for that Google never has)

- `definition of control for the purposes of s285 tcga 1992,uk hmrc` : 1 impr, pos 9.0
- `interlocking shareholding among a shares companies in 2025` : 1 impr, pos 2.0
- `tax optimization scheme for spv investment in listed companies during corporate reorganization` : 1 impr, pos 6.0
- `do we need subject to section 138 tcga clearance on cancellation of scheme` : 1 impr, pos 5.0
- `possibility of parent company injecting new assets or restructuring` : 1 impr, pos 5.0

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `definition of control for the purposes of s285 tcga 1992,uk hmrc` : 1 impr, 0 clicks, pos 9.0
- `interlocking shareholding among a shares companies in 2025` : 1 impr, 0 clicks, pos 2.0
- `shareholder exchange tax policy` : 1 impr, 0 clicks, pos 2.0
- `tax risk from anti-avoidance adjustments` : 1 impr, 0 clicks, pos 4.0
- `tax optimization scheme for spv investment in listed companies during corporate reorganization` : 1 impr, 0 clicks, pos 6.0
- `do we need subject to section 138 tcga clearance on cancellation of scheme` : 1 impr, 0 clicks, pos 5.0
- `possibility of parent company injecting new assets or restructuring` : 1 impr, 0 clicks, pos 5.0

Google 28d:

- none

## Acceptance
1. Diff is insert-only (one H2 section or new FAQ entries; existing entries byte-identical).
2. Each targeted question is answered under a searcher-worded heading with the answer in
   sentence one; facts re-derivable from the post or house_positions.md.
3. No em-dashes, no new links unless the post already links the same target.
