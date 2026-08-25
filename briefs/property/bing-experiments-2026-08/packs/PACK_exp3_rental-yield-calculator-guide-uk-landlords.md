# Pack (experiment 3, conversational coverage): `rental-yield-calculator-guide-uk-landlords`

## 1. Target and permission
- File: `Property/web/content/blog/rental-yield-calculator-guide-uk-landlords.md`
- Change: insert ONE new H2 section (or extend the FAQ block if the post has one, with new
  entries only) that directly answers the Bing-only questions below. Answer-first: the number
  or the yes/no lands in the first sentence of each answer. Use the searcher's phrasing in the
  heading/question where it reads naturally; never force a variant verbatim.
- 3 to 5 questions answered, chosen from the list below by impressions.
- Baseline: Bing 16 impr / 1 clicks @ wpos 8.0; Google 28d 0 impr / 0 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## The Bing-only questions (queries Bing shows this page for that Google never has)

- `what is a good yield on rental property` : 3 impr, pos 8.0
- `what is the gross yield of the property` : 1 impr, pos 4.0
- `how to calculature proprty yield` : 1 impr, pos 5.0
- `how to figure out a property yield` : 1 impr, pos 5.0
- `.4 monthly rental income: £1,675#n##n#based on average rental yields of approximately 7% for a property valued at £260,000, the monthly rental income should be around:#n##n##n##n#annual rent = £260,000 × 0.07 = £18,200, monthly = £1,517 (rounded).#n##n##n##n#however, rental yields vary significantly by region. for a one‑bedroom flat in a commuter‑accessible area of greater london or a mid‑sized city outside london, achievable rents are higher. uk investor magazine reports average rents of £1,675 per month on properties priced around £231,402, delivering yields of around 7%. therefore, a monthly rent of £1,675 is realistic for a well‑located one‑bedroom flat.#n##n##n##n#source: uk investor magazine, november 2025 – properties priced around £231,402 with rents of £1,675/month.` : 1 impr, pos 1.0
- `what is rental yield` : 1 impr, pos 7.0
- `how to get specific property yield values for domestic` : 1 impr, pos 6.0
- `how to calculate yield on rental property` : 1 impr, pos 7.0

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `what is a good yield on rental property` : 3 impr, 0 clicks, pos 8.0
- `what is the gross yield of the property` : 1 impr, 1 clicks, pos 4.0
- `how to calculature proprty yield` : 1 impr, 0 clicks, pos 5.0
- `how to figure out a property yield` : 1 impr, 0 clicks, pos 5.0
- `.4 monthly rental income: £1,675#n##n#based on average rental yields of approximately 7% for a property valued at £260,000, the monthly rental income should be around:#n##n##n##n#annual rent = £260,000 × 0.07 = £18,200, monthly = £1,517 (rounded).#n##n##n##n#however, rental yields vary significantly by region. for a one‑bedroom flat in a commuter‑accessible area of greater london or a mid‑sized city outside london, achievable rents are higher. uk investor magazine reports average rents of £1,675 per month on properties priced around £231,402, delivering yields of around 7%. therefore, a monthly rent of £1,675 is realistic for a well‑located one‑bedroom flat.#n##n##n##n#source: uk investor magazine, november 2025 – properties priced around £231,402 with rents of £1,675/month.` : 1 impr, 0 clicks, pos 1.0
- `what is rental yield` : 1 impr, 0 clicks, pos 7.0
- `rental yield calculation formula` : 1 impr, 0 clicks, pos 9.0
- `property yield on cost calculation` : 1 impr, 0 clicks, pos 7.0
- `how to get specific property yield values for domestic` : 1 impr, 0 clicks, pos 6.0
- `how to calculate yield on rental property` : 1 impr, 0 clicks, pos 7.0
- `yield calculator property` : 1 impr, 0 clicks, pos 26.0
- `how is the gross yield calculated` : 1 impr, 0 clicks, pos 9.0
- `calculate yield on rental property` : 1 impr, 0 clicks, pos 9.0
- `how to calculate net yield` : 1 impr, 0 clicks, pos 9.0

Google 28d:

- none

## Acceptance
1. Diff is insert-only (one H2 section or new FAQ entries; existing entries byte-identical).
2. Each targeted question is answered under a searcher-worded heading with the answer in
   sentence one; facts re-derivable from the post or house_positions.md.
3. No em-dashes, no new links unless the post already links the same target.
