# Pack (experiment 3, conversational coverage): `furnished-holiday-let-tax-rules-exemptions`

## 1. Target and permission
- File: `Property/web/content/blog/furnished-holiday-let-tax-rules-exemptions.md`
- Change: insert ONE new H2 section (or extend the FAQ block if the post has one, with new
  entries only) that directly answers the Bing-only questions below. Answer-first: the number
  or the yes/no lands in the first sentence of each answer. Use the searcher's phrasing in the
  heading/question where it reads naturally; never force a variant verbatim.
- 3 to 5 questions answered, chosen from the list below by impressions.
- Baseline: Bing 232 impr / 12 clicks @ wpos 6.29; Google 28d 496 impr / 4 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## The Bing-only questions (queries Bing shows this page for that Google never has)

- `when did furnished holiday let rules change` : 5 impr, pos 7.2
- `when did fhl rules change` : 4 impr, pos 4.5
- `anti avoidance abolition of furnished holiday letting` : 3 impr, pos 8.0
- `after april 2025 how are fhl shown on tax return` : 3 impr, pos 4.0
- `how did tax on furnished holiday homes change` : 2 impr, pos 5.0
- `for 2025 to 2026 hmrc tax return for a furnished holiday let do you fill out uk property income section` : 2 impr, pos 9.0
- `when do furnished holiday let rules change` : 2 impr, pos 9.0
- `hmrc furnished holiday let guidlines from 5 april 2025` : 2 impr, pos 4.0

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `fhl abolished` : 14 impr, 0 clicks, pos 5.4
- `furnished holiday let rules` : 6 impr, 0 clicks, pos 8.0
- `fhl rules 2025/26` : 5 impr, 0 clicks, pos 7.6
- `when did furnished holiday let rules change` : 5 impr, 0 clicks, pos 7.2
- `when did fhl rules change` : 4 impr, 0 clicks, pos 4.5
- `fhl property` : 4 impr, 0 clicks, pos 9.0
- `furnished holiday let rules 2025/26` : 3 impr, 0 clicks, pos 6.3
- `anti avoidance abolition of furnished holiday letting` : 3 impr, 0 clicks, pos 8.0
- `fhl tax` : 3 impr, 0 clicks, pos 8.3
- `after april 2025 how are fhl shown on tax return` : 3 impr, 0 clicks, pos 4.0
- `new fhl rules 2025` : 3 impr, 0 clicks, pos 7.0
- `holiday let tax rules uk` : 3 impr, 0 clicks, pos 7.0
- `fhl tax regime` : 2 impr, 1 clicks, pos 5.0
- `how did tax on furnished holiday homes change` : 2 impr, 0 clicks, pos 5.0
- `for 2025 to 2026 hmrc tax return for a furnished holiday let do you fill out uk property income section` : 2 impr, 0 clicks, pos 9.0
- `hol hse tax` : 2 impr, 0 clicks, pos 3.0
- `fhl corporation tax rate` : 2 impr, 0 clicks, pos 4.0
- `fhl mortgage` : 2 impr, 0 clicks, pos 3.0
- `fhl rules for 2025/26` : 2 impr, 0 clicks, pos 6.0
- `when do furnished holiday let rules change` : 2 impr, 0 clicks, pos 9.0
- `hmrc furnished holiday let guidlines from 5 april 2025` : 2 impr, 1 clicks, pos 4.0
- `do fhl letting occpancy rules still apply` : 2 impr, 0 clicks, pos 10.0
- `what happense to s&bs on fhl rules` : 2 impr, 0 clicks, pos 2.0
- `overseas furnished holiday lets 25/26` : 2 impr, 0 clicks, pos 10.0
- `what is the uk tax difference between furnished holiday let and small business relief` : 2 impr, 0 clicks, pos 3.0
- `furnished holiday lettings abolished` : 2 impr, 0 clicks, pos 4.0
- `fhl` : 2 impr, 0 clicks, pos 10.0
- `furnished holiday letting abolished` : 2 impr, 0 clicks, pos 4.0
- `fhl ceased with losses c/fwd to 25/26` : 2 impr, 0 clicks, pos 10.0
- `fhl scrapped apri l206` : 2 impr, 0 clicks, pos 3.0
- `hmrc guidance on fhl rules ablogished affect no mortgage interest costs` : 2 impr, 0 clicks, pos 6.0
- `interest on furnished holiday lets abolished` : 2 impr, 0 clicks, pos 5.0
- `changes to furnished holiday let rules from april 2025` : 2 impr, 0 clicks, pos 10.0
- `fhl company with asset additions pre and post april 2025` : 2 impr, 0 clicks, pos 6.0
- `are fhls sepaarate business for incorproationreleif` : 2 impr, 0 clicks, pos 6.0
- `when do fhl rules change for companis` : 2 impr, 0 clicks, pos 9.0
- `can a company claim sba for work on a fhl before april 2025?` : 2 impr, 0 clicks, pos 7.0
- `what happens to fhl after 31/03/26` : 2 impr, 0 clicks, pos 6.0
- `what happens to fhl tax written down value for 2025-26?` : 2 impr, 0 clicks, pos 2.0
- `losing fhl losses` : 2 impr, 0 clicks, pos 9.0
- (+106 more, all protected)

Google 28d:

- `furnished holiday let rules 2025` : 36 impr, 0 clicks, pos 50.2
- `furnished holiday lettings tax regime` : 27 impr, 0 clicks, pos 31.5
- `furnished holiday let tax` : 25 impr, 0 clicks, pos 57.0
- `furnished holiday let tax rules` : 22 impr, 0 clicks, pos 56.1
- `furnished holiday lettings tax changes` : 14 impr, 0 clicks, pos 64.7
- `holiday let tax rules` : 13 impr, 0 clicks, pos 66.5
- `fhl tax rules` : 12 impr, 0 clicks, pos 40.9
- `furnished holiday lettings tax` : 11 impr, 0 clicks, pos 59.6
- `no stamp duty on furnished holiday let` : 8 impr, 0 clicks, pos 63.5
- `tax rules for fhl` : 8 impr, 0 clicks, pos 42.4
- `furnished holiday lettings mortgage interest relief` : 6 impr, 0 clicks, pos 57.2
- `how have recent tax changes affected existing holiday let owners?` : 6 impr, 0 clicks, pos 9.2
- `income tax rules on holiday let` : 6 impr, 0 clicks, pos 88
- `holiday lets tax rules` : 5 impr, 0 clicks, pos 69
- `furnished holiday lets fhl` : 4 impr, 0 clicks, pos 61.2

## Acceptance
1. Diff is insert-only (one H2 section or new FAQ entries; existing entries byte-identical).
2. Each targeted question is answered under a searcher-worded heading with the answer in
   sentence one; facts re-derivable from the post or house_positions.md.
3. No em-dashes, no new links unless the post already links the same target.
