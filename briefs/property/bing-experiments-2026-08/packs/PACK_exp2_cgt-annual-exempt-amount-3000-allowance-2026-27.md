# Pack (experiment 2, tables): `cgt-annual-exempt-amount-3000-allowance-2026-27`

## 1. Target and permission
- File: `Property/web/content/blog/cgt-annual-exempt-amount-3000-allowance-2026-27.md`
- Change: insert exactly ONE comparison or rates table (`<table>` HTML, matching the post's
  existing markup style), at the single most relevant point in the body, with a one-sentence
  lead-in. Nothing else changes.
- The table content must come from figures ALREADY in the post (or house_positions.md if the
  post cites the same fact); it restructures, it does not add new claims.
- Baseline: Bing 366 impr / 4 clicks @ wpos 6.07 (90d floor); Google 28d 39 impr / 0 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## Demand this page serves on Bing (pick the table subject that serves the biggest block)

- `cgt annual exemption 2026/27` : 66 impr, pos 5.5
- `cgt allowance 2026/27` : 36 impr, pos 6.5
- `annual exempt amount` : 26 impr, pos 6.5
- `annual exemption 2026/27` : 23 impr, pos 6.3
- `cgt annual exemption` : 20 impr, pos 6.0
- `cgt annual allowance` : 14 impr, pos 6.6
- `annual exempt amount 2026/27` : 11 impr, pos 7.2
- `cgt exemption 2026/27` : 10 impr, pos 6.0
- `cgt annual exemption 26/27` : 6 impr, pos 6.3
- `cgt allowance` : 5 impr, pos 8.0
- `what is the cgt allowance for 2026/27` : 5 impr, pos 7.4
- `capital gains annual exemption 2026/27` : 5 impr, pos 7.4

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `cgt annual exemption 2026/27` : 66 impr, 0 clicks, pos 5.5
- `cgt allowance 2026/27` : 36 impr, 0 clicks, pos 6.5
- `annual exempt amount` : 26 impr, 0 clicks, pos 6.5
- `annual exemption 2026/27` : 23 impr, 0 clicks, pos 6.3
- `cgt annual exemption` : 20 impr, 0 clicks, pos 6.0
- `cgt annual allowance` : 14 impr, 0 clicks, pos 6.6
- `annual exempt amount 2026/27` : 11 impr, 0 clicks, pos 7.2
- `cgt exemption 2026/27` : 10 impr, 0 clicks, pos 6.0
- `cgt annual exemption 26/27` : 6 impr, 0 clicks, pos 6.3
- `cgt allowance` : 5 impr, 0 clicks, pos 8.0
- `what is the cgt allowance for 2026/27` : 5 impr, 0 clicks, pos 7.4
- `capital gains annual exemption 2026/27` : 5 impr, 0 clicks, pos 7.4
- `cgt allowance 2026` : 5 impr, 0 clicks, pos 5.2
- `2026 27 annual exempt amount` : 5 impr, 0 clicks, pos 5.2
- `capital gains tax annual exemption 2026/27` : 3 impr, 0 clicks, pos 6.0
- `how to put capital gains on a property sale below the £3000 tax free limit in a hmrc self assessment return in 2026` : 3 impr, 0 clicks, pos 3.0
- `what does annual exempt amouint mean capital gains` : 2 impr, 0 clicks, pos 7.0
- `cgt allowance 2026/2726` : 2 impr, 0 clicks, pos 10.0
- `what is the annual cgt allowance` : 2 impr, 0 clicks, pos 3.0
- `capital gains tax annual exempt amount 26/27` : 2 impr, 0 clicks, pos 4.0
- `cgt allowance 26/27` : 2 impr, 0 clicks, pos 6.0
- `annual exempt allowance cgt` : 2 impr, 0 clicks, pos 4.0
- `capital gains tax annual exemption` : 2 impr, 0 clicks, pos 2.0
- `what is the annual exempt amount for cgt` : 2 impr, 0 clicks, pos 6.0
- `how to put capital gains below the £3000 tax free limit in a hmrc self assessment retuyrn` : 2 impr, 0 clicks, pos 5.0
- `does everyone get 3000 cgt allowance 2025/26` : 2 impr, 0 clicks, pos 5.0
- `capital gains tax exemption 2026/27` : 2 impr, 0 clicks, pos 6.0
- `is there an annual exemption on cgt on property` : 2 impr, 0 clicks, pos 3.0
- `is the annual cgt exemption for each personal representative` : 2 impr, 0 clicks, pos 4.0
- `what is the current capital gains annual exemption 26/27` : 2 impr, 0 clicks, pos 5.0
- `capital gains annual exemption uk` : 2 impr, 0 clicks, pos 10.0
- `2026/27 annual exemption` : 2 impr, 0 clicks, pos 4.0
- `3k capital gains allowance` : 2 impr, 0 clicks, pos 3.0
- `uk cgt annual exempt amount 2026 2027` : 2 impr, 0 clicks, pos 8.0
- `cgt annual allowance 2026 27` : 2 impr, 0 clicks, pos 6.0
- `annual cgt exemption` : 2 impr, 0 clicks, pos 6.0
- `annual exemption allowance 2026-27` : 2 impr, 0 clicks, pos 8.0
- `2026/27 cgt annual exemption` : 2 impr, 0 clicks, pos 4.0
- `gov.uk capital gains tax annual exempt amount 3000 2026` : 2 impr, 0 clicks, pos 5.0
- `cgt allowance 2026-27` : 2 impr, 0 clicks, pos 8.0
- (+62 more, all protected)

Google 28d:

- `hmrc capital gains tax annual exempt amount 2026 3000` : 3 impr, 0 clicks, pos 10.3
- `hmrc annual exempt amount 2024/25 3000` : 2 impr, 0 clicks, pos 27
- `gov.uk capital gains tax annual exempt amount 2026 3000` : 1 impr, 0 clicks, pos 7
- `hmrc capital gains annual exempt amount 2025 2026 3000` : 1 impr, 0 clicks, pos 8
- `hmrc capital gains tax annual exempt amount 2026 2027 uk` : 1 impr, 0 clicks, pos 4
- `hmrc capital gains tax annual exempt amount 2026 2027 £3000` : 1 impr, 0 clicks, pos 4
- `how much will i get` : 1 impr, 0 clicks, pos 3
- `uk capital gains tax annual exempt amount 2026 2027 hmrc` : 1 impr, 0 clicks, pos 4
- `uk capital gains tax annual exempt amount 2026 2027 official hmrc` : 1 impr, 0 clicks, pos 10

## Acceptance
1. Diff is insert-only (one table block + lead-in sentence).
2. Every table figure re-derivable from the post or house_positions.md, stated per §6 QA.
3. No em-dashes, no new links, valid HTML table.
