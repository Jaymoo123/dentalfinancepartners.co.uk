# Pack (experiment 2, tables): `directors-loan-accountsdla-uk-guide`

## 1. Target and permission
- File: `Property/web/content/blog/directors-loan-accountsdla-uk-guide.md`
- Change: insert exactly ONE comparison or rates table (`<table>` HTML, matching the post's
  existing markup style), at the single most relevant point in the body, with a one-sentence
  lead-in. Nothing else changes.
- The table content must come from figures ALREADY in the post (or house_positions.md if the
  post cites the same fact); it restructures, it does not add new claims.
- Baseline: Bing 228 impr / 14 clicks @ wpos 6.48 (90d floor); Google 28d 0 impr / 0 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## Demand this page serves on Bing (pick the table subject that serves the biggest block)

- `directors loan account` : 23 impr, pos 9.6
- `dla interest rates` : 10 impr, pos 8.0
- `directors loan account interest rate` : 8 impr, pos 6.0
- `is directors loan account asset or liability` : 7 impr, pos 10.0
- `interest on directors loan account 26/27` : 5 impr, pos 4.2
- `section 455 tax rate 2026/27` : 4 impr, pos 4.0
- `gov.uk director's loan account tax charge 35.75% 2026` : 3 impr, pos 1.0
- `what is interest percentage on dla credit balance mean` : 2 impr, pos 7.0
- `directors loan repayment anti avoidance` : 2 impr, pos 5.0
- `participator for dla purposes` : 2 impr, pos 6.0
- `directors loan on accounts is that a credit` : 2 impr, pos 4.0
- `assignment of directors loan account credit balance to new company when it has no value is tax due` : 2 impr, pos 2.0

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `directors loan account` : 23 impr, 0 clicks, pos 9.6
- `dla interest rates` : 10 impr, 0 clicks, pos 8.0
- `directors loan account interest rate` : 8 impr, 0 clicks, pos 6.0
- `is directors loan account asset or liability` : 7 impr, 0 clicks, pos 10.0
- `interest on directors loan account 26/27` : 5 impr, 0 clicks, pos 4.2
- `section 455 tax rate 2026/27` : 4 impr, 0 clicks, pos 4.0
- `gov.uk director's loan account tax charge 35.75% 2026` : 3 impr, 0 clicks, pos 1.0
- `what is interest percentage on dla credit balance mean` : 2 impr, 0 clicks, pos 7.0
- `directors loan repayment anti avoidance` : 2 impr, 0 clicks, pos 5.0
- `participator for dla purposes` : 2 impr, 0 clicks, pos 6.0
- `directors loan on accounts is that a credit` : 2 impr, 0 clicks, pos 4.0
- `assignment of directors loan account credit balance to new company when it has no value is tax due` : 2 impr, 0 clicks, pos 2.0
- `assignment of directors loan account credit balance to new company when it has no value ym` : 2 impr, 0 clicks, pos 3.0
- `what si a dla finance` : 2 impr, 0 clicks, pos 7.0
- `directors loan account credit balance` : 2 impr, 0 clicks, pos 6.0
- `credit directors loan account` : 2 impr, 0 clicks, pos 10.0
- `dla arrangemnts hmrc 30 days` : 2 impr, 0 clicks, pos 4.0
- `is director loan for property purchase a business expense for spv hmrc` : 2 impr, 0 clicks, pos 6.0
- `dla interest rate 2526 uk` : 2 impr, 0 clicks, pos 10.0
- `ditrectors loan accounts` : 2 impr, 0 clicks, pos 8.0
- `cta 2010 ss 464c–464d` : 2 impr, 0 clicks, pos 10.0
- `how is uc likely to treat director's loan accounts that arose from unpaid director fees and work carried out rather than cash personally lent to the company? does it matter that the companies do not currently have sufficient cash to repay the balances? would uc view the dla balances as capital, earnings, or something else?` : 2 impr, 0 clicks, pos 2.0
- `directors loan interest rates 26/27` : 2 impr, 0 clicks, pos 8.0
- `directors loan account rates` : 2 impr, 0 clicks, pos 9.0
- `debit balance on directors loan account` : 2 impr, 0 clicks, pos 5.0
- `interest rates on dla for debot balance` : 2 impr, 1 clicks, pos 8.0
- `direcots loand account` : 2 impr, 0 clicks, pos 6.0
- `directors loan accounts` : 2 impr, 0 clicks, pos 6.0
- `is a dla in credit or debit` : 2 impr, 0 clicks, pos 1.0
- `uk icd nil interest loan allowed` : 2 impr, 0 clicks, pos 4.0
- `section 455 interest rate` : 2 impr, 0 clicks, pos 8.0
- `directors loan interest rate 26/27` : 2 impr, 0 clicks, pos 9.0
- `beenfits of a directors loan account versus share capital in the uk for ltd company` : 2 impr, 0 clicks, pos 5.0
- `can i see directors loans` : 2 impr, 0 clicks, pos 6.0
- `directorts loan spreadsheet showing debits and credits` : 2 impr, 0 clicks, pos 10.0
- `uk rules around directors loans` : 2 impr, 0 clicks, pos 10.0
- `capitalisation of directors loans inform direct` : 2 impr, 0 clicks, pos 5.0
- `interest rate dla` : 2 impr, 0 clicks, pos 8.0
- `director loan account in credit` : 2 impr, 0 clicks, pos 5.0
- `director's loan interest rates#` : 2 impr, 0 clicks, pos 5.0
- (+91 more, all protected)

Google 28d:

- none

## Acceptance
1. Diff is insert-only (one table block + lead-in sentence).
2. Every table figure re-derivable from the post or house_positions.md, stated per §6 QA.
3. No em-dashes, no new links, valid HTML table.
