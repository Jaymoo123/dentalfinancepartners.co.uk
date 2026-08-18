# Pack (experiment 2, tables): `a-complete-guide-on-community-infrastructure-levy-cil`

## 1. Target and permission
- File: `Property/web/content/blog/a-complete-guide-on-community-infrastructure-levy-cil.md`
- Change: insert exactly ONE comparison or rates table (`<table>` HTML, matching the post's
  existing markup style), at the single most relevant point in the body, with a one-sentence
  lead-in. Nothing else changes.
- The table content must come from figures ALREADY in the post (or house_positions.md if the
  post cites the same fact); it restructures, it does not add new claims.
- Baseline: Bing 1105 impr / 21 clicks @ wpos 6.39 (90d floor); Google 28d 313 impr / 4 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## Demand this page serves on Bing (pick the table subject that serves the biggest block)

- `community infrastructure levy` : 337 impr, pos 5.4
- `community infrastructure levy explained` : 120 impr, pos 5.9
- `cil` : 100 impr, pos 8.6
- `cil regulations` : 85 impr, pos 9.0
- `what is cil` : 34 impr, pos 5.5
- `cil regulations 2010` : 21 impr, pos 8.4
- `cil liability` : 16 impr, pos 9.0
- `what is a community infrastructure levy` : 13 impr, pos 5.5
- `what is community infrastructure levy` : 12 impr, pos 5.8
- `community infrastructure levy cil` : 12 impr, pos 6.4
- `community infrastructure levy (cil)` : 11 impr, pos 4.5
- `cil tax` : 9 impr, pos 3.2

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `community infrastructure levy` : 337 impr, 1 clicks, pos 5.4
- `community infrastructure levy explained` : 120 impr, 1 clicks, pos 5.9
- `cil` : 100 impr, 0 clicks, pos 8.6
- `cil regulations` : 85 impr, 0 clicks, pos 9.0
- `what is cil` : 34 impr, 0 clicks, pos 5.5
- `cil regulations 2010` : 21 impr, 0 clicks, pos 8.4
- `cil liability` : 16 impr, 0 clicks, pos 9.0
- `what is a community infrastructure levy` : 13 impr, 0 clicks, pos 5.5
- `what is community infrastructure levy` : 12 impr, 0 clicks, pos 5.8
- `community infrastructure levy cil` : 12 impr, 0 clicks, pos 6.4
- `community infrastructure levy (cil)` : 11 impr, 0 clicks, pos 4.5
- `cil tax` : 9 impr, 0 clicks, pos 3.2
- `cil payments` : 8 impr, 0 clicks, pos 8.0
- `cil guidance` : 7 impr, 0 clicks, pos 8.7
- `what is a cil` : 6 impr, 0 clicks, pos 7.0
- `community infrastructure levy regulaions` : 6 impr, 0 clicks, pos 10.0
- `what is community infrastructure levy uk` : 5 impr, 0 clicks, pos 5.0
- `cil charge` : 5 impr, 0 clicks, pos 6.4
- `community infrastructure levey` : 4 impr, 0 clicks, pos 6.0
- `cil admin charge` : 4 impr, 0 clicks, pos 4.0
- `community infrastructure levy regulations` : 4 impr, 0 clicks, pos 7.5
- `is cil payable for a single house` : 4 impr, 0 clicks, pos 7.0
- `community infrstructure levy` : 4 impr, 0 clicks, pos 7.8
- `cil levy explained` : 4 impr, 0 clicks, pos 6.5
- `sustainable investment levy sil` : 4 impr, 0 clicks, pos 8.0
- `when is community infrastructure levy payable` : 3 impr, 0 clicks, pos 7.0
- `cil levy cost` : 3 impr, 0 clicks, pos 8.0
- `cil tax area` : 3 impr, 0 clicks, pos 2.0
- `cil charges` : 3 impr, 0 clicks, pos 8.0
- `where is cil disclosed cipfa` : 3 impr, 0 clicks, pos 4.0
- `community infrastructure levy regulations 2010` : 3 impr, 0 clicks, pos 9.0
- `cil funding` : 3 impr, 0 clicks, pos 8.0
- `cil council tax` : 3 impr, 0 clicks, pos 5.0
- `whats cil` : 3 impr, 0 clicks, pos 9.0
- `what is a cil payment` : 3 impr, 0 clicks, pos 7.3
- `simple guide community infrastructure levy` : 3 impr, 1 clicks, pos 3.0
- `how do you work out commmunity infrastructre levy` : 3 impr, 0 clicks, pos 7.0
- `cil calculation` : 2 impr, 0 clicks, pos 3.0
- `cil liability on sdale` : 2 impr, 0 clicks, pos 4.0
- `what is community infrastructure levy charges?` : 2 impr, 0 clicks, pos 6.0
- (+160 more, all protected)

Google 28d:

- `community infrastructure levy questions` : 1 impr, 0 clicks, pos 46

## Acceptance
1. Diff is insert-only (one table block + lead-in sentence).
2. Every table figure re-derivable from the post or house_positions.md, stated per §6 QA.
3. No em-dashes, no new links, valid HTML table.
