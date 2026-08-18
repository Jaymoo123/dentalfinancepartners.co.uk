# Pack (experiment 3, conversational coverage): `property-investment-benchmarks-uk-2026-good-yield`

## 1. Target and permission
- File: `Property/web/content/blog/property-investment-benchmarks-uk-2026-good-yield.md`
- Change: insert ONE new H2 section (or extend the FAQ block if the post has one, with new
  entries only) that directly answers the Bing-only questions below. Answer-first: the number
  or the yes/no lands in the first sentence of each answer. Use the searcher's phrasing in the
  heading/question where it reads naturally; never force a variant verbatim.
- 3 to 5 questions answered, chosen from the list below by impressions.
- Baseline: Bing 72 impr / 5 clicks @ wpos 5.21; Google 28d 14 impr / 0 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## The Bing-only questions (queries Bing shows this page for that Google never has)

- `uk rental yield vs property price 2026` : 4 impr, pos 6.0
- `uk average gross rental yield 2026 residential property` : 4 impr, pos 4.0
- `uk rental yield good gross net landlord costs` : 3 impr, pos 6.0
- `best rental yield uk cities 2026` : 3 impr, pos 7.0
- `what would you expect rental yield on a property to be in the south of england` : 2 impr, pos 5.0
- `what parts of northeast is rental yield of old buildings high` : 2 impr, pos 4.0
- `what is classed as a good return on investmenet target for a rental prooperty in belfast` : 2 impr, pos 2.0
- `what is a good rental yield for a commercial property in great yarmouth` : 2 impr, pos 2.0

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `uk rental yield vs property price 2026` : 4 impr, 0 clicks, pos 6.0
- `uk average gross rental yield 2026 residential property` : 4 impr, 0 clicks, pos 4.0
- `uk rental yield good gross net landlord costs` : 3 impr, 0 clicks, pos 6.0
- `best rental yield uk cities 2026` : 3 impr, 0 clicks, pos 7.0
- `what would you expect rental yield on a property to be in the south of england` : 2 impr, 0 clicks, pos 5.0
- `what parts of northeast is rental yield of old buildings high` : 2 impr, 0 clicks, pos 4.0
- `rental yields by region uk` : 2 impr, 1 clicks, pos 3.0
- `what is classed as a good return on investmenet target for a rental prooperty in belfast` : 2 impr, 1 clicks, pos 2.0
- `uk residential property yields 2026` : 2 impr, 0 clicks, pos 3.0
- `what is a good rental yield for a commercial property in great yarmouth` : 2 impr, 0 clicks, pos 2.0
- `yield for land march 2026` : 2 impr, 0 clicks, pos 9.0
- `what would you expect rental yield on a property to be in the south of england commercial` : 1 impr, 1 clicks, pos 2.0
- `what is good % return on rental properties uk before tax` : 1 impr, 0 clicks, pos 1.0
- `what is teh yeild on reatil properties 2026` : 1 impr, 0 clicks, pos 1.0
- `6% rental yields` : 1 impr, 0 clicks, pos 3.0
- `what is considered a good gross yeild in property rental` : 1 impr, 0 clicks, pos 6.0
- `+what isa good rental yeild england` : 1 impr, 0 clicks, pos 2.0
- `what isa good rental yeild england` : 1 impr, 0 clicks, pos 4.0
- `what rent does an investor require on 400k property` : 1 impr, 0 clicks, pos 5.0
- `what isa good rental yeild england surrey` : 1 impr, 0 clicks, pos 7.0
- `net uk residential rental yield uk june 2026` : 1 impr, 0 clicks, pos 3.0
- `what should landlords of residential property expect as a yield in the winchester area?` : 1 impr, 0 clicks, pos 5.0
- `yield investing average rental yield in the uk 2026 guide for property investors` : 1 impr, 1 clicks, pos 1.0
- `what is a good rental yield on a flat` : 1 impr, 0 clicks, pos 6.0
- `what is a good return on rental` : 1 impr, 0 clicks, pos 8.0
- `what is the typical return on rental property in the uk` : 1 impr, 0 clicks, pos 7.0
- `good rental yield` : 1 impr, 0 clicks, pos 8.0
- `what is a good net profit margin on rental prpoerties in the uk in percent` : 1 impr, 0 clicks, pos 4.0
- `what is a good net profit margin on rental prpoerties in the uk` : 1 impr, 0 clicks, pos 4.0
- `what is a good rental yield for a studio apartments in wimmbleodn` : 1 impr, 0 clicks, pos 7.0
- `what is a good gross rental yield` : 1 impr, 0 clicks, pos 5.0
- `good rental income` : 1 impr, 0 clicks, pos 4.0
- `is a 8.63% rental yield good` : 1 impr, 0 clicks, pos 7.0
- `average rental yield uk 026` : 1 impr, 0 clicks, pos 9.0
- `best locations in uk vs northern ireland for rental yield` : 1 impr, 0 clicks, pos 7.0
- `rying by region and property type.` : 1 impr, 0 clicks, pos 2.0
- `add south filetype:ma` : 1 impr, 0 clicks, pos 5.0
- `add more heavy filetype:ma` : 1 impr, 0 clicks, pos 7.0
- `add location filetype:ma` : 1 impr, 0 clicks, pos 4.0
- `cardiff uk property investment rental yield` : 1 impr, 0 clicks, pos 4.0
- (+15 more, all protected)

Google 28d:

- `site:www.propertytaxpartners.co.uk` : 1 impr, 0 clicks, pos 42

## Acceptance
1. Diff is insert-only (one H2 section or new FAQ entries; existing entries byte-identical).
2. Each targeted question is answered under a searcher-worded heading with the answer in
   sentence one; facts re-derivable from the post or house_positions.md.
3. No em-dashes, no new links unless the post already links the same target.
