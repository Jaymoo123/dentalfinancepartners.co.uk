# Pack (experiment 2, tables): `a-complete-guide-to-identity-verification-in-uk`

## 1. Target and permission
- File: `Property/web/content/blog/a-complete-guide-to-identity-verification-in-uk.md`
- Change: insert exactly ONE comparison or rates table (`<table>` HTML, matching the post's
  existing markup style), at the single most relevant point in the body, with a one-sentence
  lead-in. Nothing else changes.
- The table content must come from figures ALREADY in the post (or house_positions.md if the
  post cites the same fact); it restructures, it does not add new claims.
- Baseline: Bing 47 impr / 0 clicks @ wpos 7.43 (90d floor); Google 28d 54 impr / 0 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## Demand this page serves on Bing (pick the table subject that serves the biggest block)

- `psc verification` : 8 impr, pos 8.0
- `identity verification` : 7 impr, pos 5.0
- `identity verification companies house` : 4 impr, pos 8.0
- `identity verification for psc` : 4 impr, pos 8.5
- `verify company directors identity` : 3 impr, pos 9.0
- `provide identity verification details for a person with significant control (psc) - gov.uk` : 3 impr, pos 8.0
- `psc identity verification` : 2 impr, pos 5.0
- `psc identity verification statement` : 2 impr, pos 7.0
- `identity verification for companies house` : 2 impr, pos 8.0
- `psc verify identity` : 2 impr, pos 8.0
- `uk gov verify identity psc change dob` : 2 impr, pos 8.0
- `provide identity verification details for a person with significant control (psc)` : 2 impr, pos 5.0

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `psc verification` : 8 impr, 0 clicks, pos 8.0
- `identity verification` : 7 impr, 0 clicks, pos 5.0
- `identity verification companies house` : 4 impr, 0 clicks, pos 8.0
- `identity verification for psc` : 4 impr, 0 clicks, pos 8.5
- `verify company directors identity` : 3 impr, 0 clicks, pos 9.0
- `provide identity verification details for a person with significant control (psc) - gov.uk` : 3 impr, 0 clicks, pos 8.0
- `psc identity verification` : 2 impr, 0 clicks, pos 5.0
- `psc identity verification statement` : 2 impr, 0 clicks, pos 7.0
- `identity verification for companies house` : 2 impr, 0 clicks, pos 8.0
- `psc verify identity` : 2 impr, 0 clicks, pos 8.0
- `uk gov verify identity psc change dob` : 2 impr, 0 clicks, pos 8.0
- `provide identity verification details for a person with significant control (psc)` : 2 impr, 0 clicks, pos 5.0
- `provide identity verification for a psc` : 2 impr, 0 clicks, pos 10.0
- `when did the director or psc verification become live` : 1 impr, 0 clicks, pos 10.0
- `companies house verify identity` : 1 impr, 0 clicks, pos 10.0
- `read more about identity verification companies act` : 1 impr, 0 clicks, pos 5.0
- `active person with significant control identity verification due by 5 july 2026` : 1 impr, 0 clicks, pos 6.0

Google 28d:

- `identity proofing and verification of an individual uk` : 1 impr, 0 clicks, pos 70

## Acceptance
1. Diff is insert-only (one table block + lead-in sentence).
2. Every table figure re-derivable from the post or house_positions.md, stated per §6 QA.
3. No em-dashes, no new links, valid HTML table.
