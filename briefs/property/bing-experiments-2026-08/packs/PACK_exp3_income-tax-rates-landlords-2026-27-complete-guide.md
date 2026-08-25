# Pack (experiment 3, conversational coverage): `income-tax-rates-landlords-2026-27-complete-guide`

## 1. Target and permission
- File: `Property/web/content/blog/income-tax-rates-landlords-2026-27-complete-guide.md`
- Change: insert ONE new H2 section (or extend the FAQ block if the post has one, with new
  entries only) that directly answers the Bing-only questions below. Answer-first: the number
  or the yes/no lands in the first sentence of each answer. Use the searcher's phrasing in the
  heading/question where it reads naturally; never force a variant verbatim.
- 3 to 5 questions answered, chosen from the list below by impressions.
- Baseline: Bing 123 impr / 18 clicks @ wpos 3.95; Google 28d 7 impr / 0 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## The Bing-only questions (queries Bing shows this page for that Google never has)

- `uk company rental income tax rate 2026` : 4 impr, pos 2.0
- `tax advice for landlords,7,7,260,13,2.6,https://www.cottonsgroup.com/resources/blog/accounting-tips-for-landlords/,6,0.34,15,0.18,24800000,"18, 35, 8, 35, 22, 8, 66, 81, 66, 66, 100, 81",22/4/2026,"video, ads bottom, related searches, ai overview",informa` : 4 impr, pos 8.0
- `tax rate on rental income 2026/27` : 3 impr, pos 1.0
- `uk landlord tax marginal rate basic vs higher rate` : 3 impr, pos 6.0
- `what is the  taxable income on my 2nd property if i rent it in year 26 27 in scotland?` : 3 impr, pos 2.0
- `can i make money in the uk as a landlord 2027` : 3 impr, pos 1.0
- `uk tax rates 2026/27 for rent` : 2 impr, pos 2.0
- `rental income in 26/27 basic rate` : 2 impr, pos 5.0

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `landlord tax` : 6 impr, 0 clicks, pos 7.0
- `uk company rental income tax rate 2026` : 4 impr, 0 clicks, pos 2.0
- `tax advice for landlords,7,7,260,13,2.6,https://www.cottonsgroup.com/resources/blog/accounting-tips-for-landlords/,6,0.34,15,0.18,24800000,"18, 35, 8, 35, 22, 8, 66, 81, 66, 66, 100, 81",22/4/2026,"video, ads bottom, related searches, ai overview",informa` : 4 impr, 0 clicks, pos 8.0
- `tax rate on rental income 2026/27` : 3 impr, 2 clicks, pos 1.0
- `rent income tax 26-27` : 3 impr, 0 clicks, pos 2.0
- `tax on rental income 2026/27` : 3 impr, 0 clicks, pos 3.0
- `uk landlord tax marginal rate basic vs higher rate` : 3 impr, 0 clicks, pos 6.0
- `rental income tax rate` : 3 impr, 0 clicks, pos 9.0
- `what is the  taxable income on my 2nd property if i rent it in year 26 27 in scotland?` : 3 impr, 0 clicks, pos 2.0
- `can i make money in the uk as a landlord 2027` : 3 impr, 0 clicks, pos 1.0
- `gross income property income 26/27` : 2 impr, 0 clicks, pos 4.0
- `rental 2026-2027` : 2 impr, 0 clicks, pos 3.0
- `uk tax rates 2026/27 for rent` : 2 impr, 0 clicks, pos 2.0
- `rental income in 26/27 basic rate` : 2 impr, 0 clicks, pos 5.0
- `tax rate on rental income 26/27` : 2 impr, 0 clicks, pos 1.0
- `landords income rate of tax on £80,000` : 2 impr, 0 clicks, pos 3.0
- `rental income tax rates 2728 uk` : 2 impr, 0 clicks, pos 3.0
- `tax rate on rental income 2026/27 uk` : 2 impr, 0 clicks, pos 1.0
- `rental income tax rate 2026/27` : 2 impr, 0 clicks, pos 1.0
- `lamdlord taxx rates` : 2 impr, 0 clicks, pos 1.0
- `tax rate on rental profit 26/27` : 2 impr, 0 clicks, pos 3.0
- `hmrc landlord tax rules 2026` : 2 impr, 0 clicks, pos 7.0
- `do you pay 50% of year 1 property income tax on account for year 2026/72` : 2 impr, 1 clicks, pos 1.0
- `new rental property tax rates` : 2 impr, 0 clicks, pos 6.0
- `gov.uk--additional tax for landlords for 2026/2027 tax year` : 2 impr, 0 clicks, pos 4.0
- `average income tax percentage on a property for 1400 pcm` : 2 impr, 1 clicks, pos 1.0
- `property tax bands 2026/27` : 2 impr, 0 clicks, pos 7.0
- `landlord tax from 2027` : 2 impr, 0 clicks, pos 6.0
- `rental income tax rates april 2027` : 2 impr, 0 clicks, pos 7.0
- `taxation of rental income change 2026-27` : 1 impr, 1 clicks, pos 2.0
- `property income tax rate 2026/27` : 1 impr, 1 clicks, pos 3.0
- `tax rate on rental income` : 1 impr, 0 clicks, pos 10.0
- `landlord tax 26-27` : 1 impr, 1 clicks, pos 1.0
- `tax for landlords scotland 2027` : 1 impr, 1 clicks, pos 5.0
- `rent tax 2026/27` : 1 impr, 0 clicks, pos 2.0
- `income tax rates landlords uk` : 1 impr, 0 clicks, pos 1.0
- `renting over £100k.income` : 1 impr, 0 clicks, pos 6.0
- `rental income tax 26/27` : 1 impr, 0 clicks, pos 2.0
- `rates and thresholds 2026/27` : 1 impr, 0 clicks, pos 8.0
- `income tax rates for landlords 27/28` : 1 impr, 0 clicks, pos 1.0
- (+39 more, all protected)

Google 28d:

- none

## Acceptance
1. Diff is insert-only (one H2 section or new FAQ entries; existing entries byte-identical).
2. Each targeted question is answered under a searcher-worded heading with the answer in
   sentence one; facts re-derivable from the post or house_positions.md.
3. No em-dashes, no new links unless the post already links the same target.
