# Intent-bucket classifier validation (Property, GSC 90d)

Validates the regex bucketing in `scripts/property_commercial_baseline.py`
(`COMMERCIAL_RE` / `FORMCODE_RE`, lines 53-58; commercial tested first,
informational is the residue) against a 100-query hand classification.

Source: `gsc_query_rows_90d.json`, 3,763 query rows.
Sample: top 40 by impressions (ties broken alphabetically) plus 60 evenly
spaced indices through the remaining 3,723 sorted alphabetically. Fully
deterministic, no randomness. Sample carries 7,553 impressions.

Published numbers under test: commercial 326 queries / 4,856 impr;
form/HMRC 388 / 5,336; informational 3,049 / 19,033.

## Confusion matrix (queries, rows = hand truth, cols = script)

| hand \ script | commercial | form/HMRC | informational | total |
|---|---|---|---|---|
| commercial | 12 | 0 | 3 | 15 |
| form/HMRC | 0 | 15 | 24 | 39 |
| informational | 0 | 0 | 46 | 46 |
| total | 12 | 15 | 73 | 100 |

## Confusion matrix (impressions)

| hand \ script | commercial | form/HMRC | informational | total |
|---|---|---|---|---|
| commercial | 1,249 | 0 | 315 | 1,564 |
| form/HMRC | 0 | 2,209 | 1,542 | 3,751 |
| informational | 0 | 0 | 2,238 | 2,238 |
| total | 1,249 | 2,209 | 4,095 | 7,553 |

## Precision / recall

| bucket | precision | recall |
|---|---|---|
| commercial | 1.00 (12/12) | 0.80 (12/15) |
| form/HMRC | 1.00 (15/15) | 0.38 (15/39) |
| informational | 0.63 (46/73) | 1.00 (46/46) |

Overall accuracy 73/100. Every error is one-directional: real commercial and
real form/HMRC queries leak into informational. Nothing leaks the other way,
because informational is defined as the residue.

## Disagreements (27 of 100)

| # | query | impr | script | hand | reason |
|---|---|---|---|---|---|
| 5 | revenue scotland non-residential lbtt rates 2026 | 318 | info | form | official rate table, but `FORMCODE_RE` only knows hmrc/gov.uk, not Revenue Scotland |
| 15 | revenue scotland additional dwelling supplement 8% 2026 | 141 | info | form | same: named official rate lookup, non-HMRC authority |
| 19 | revenue scotland lbtt non-residential rates 2026 | 130 | info | form | same |
| 21 | uk cgt rates residential property 2026 | 120 | info | form | wants the statutory rate table, no trigger token present |
| 22 | property accounting software uk | 119 | info | commercial | buying intent, "software" is not in `COMMERCIAL_RE` |
| 24 | lbtt ads 8% revenue scotland 5 december 2024 | 118 | info | form | dated official rate lookup |
| 27 | uk capital gains tax residential property rates 2026 annual exempt amount | 109 | info | form | rate plus allowance table lookup |
| 29 | revenue scotland lbtt residential rates 2026 | 108 | info | form | same as 5 |
| 31 | uk capital gains tax residential property rates 2026 | 107 | info | form | same as 21 |
| 32 | landlord accounting software | 102 | info | commercial | product purchase intent, no commercial token |
| 34 | scotland non-residential lbtt rates 2026 revenue scotland | 100 | info | form | same as 5 |
| 37 | scotland non-residential lbtt rates 2026 official | 97 | info | form | "official" signals authority source, not in regex |
| 38 | uk capital gains tax rates residential property 2026 | 96 | info | form | same as 21 |
| 40 | property tax specialists in london | 94 | info | commercial | `COMMERCIAL_RE` has "specialist" but not the plural "specialists" |
| 45 | ated rates 2026/27 | 45 | info | form | official rate table |
| 52 | cis statement of payment and deduction template | 8 | info | form | HMRC-prescribed document, "template" not a trigger |
| 54 | current uk cgt rates 2026 | 5 | info | form | rate table |
| 73 | non-resident landlord application for an individual | 2 | info | form | this is form NRL1; regex only matches the literal "nrl" code |
| 78 | reg 102 | 2 | info | form | regulation code lookup |
| 81 | revenue scotland lbtt residential property rates scotland 2026 additional dwelling supplement | 10 | info | form | same as 5 |
| 82 | s102 fa 1986 | 1 | info | form | statute reference lookup |
| 83 | scotland commercial lbtt rates 2026 revenue scotland | 7 | info | form | same as 5 (note: "commercial" here is a property type, not intent) |
| 89 | tax code 102 | 1 | info | form | code lookup |
| 92 | uk capital gains tax on residential property 2026 rates | 3 | info | form | rate table |
| 93 | uk capital gains tax residential property rates 2026 annual exempt amount 2026 | 1 | info | form | rate table |
| 94 | uk corporation tax rates 2026 small profits rate marginal relief | 1 | info | form | rate table |
| 95 | uk residential property capital gains tax rates 2026 annual exempt amount | 12 | info | form | rate table |

Failure modes, in order of impact:

1. **Rate-table blindness.** 20 of 27 errors are official rate lookups
   ("... rates 2026", Revenue Scotland, ATED, CGT/CT rate tables). The regex
   assumes gov lookups say "hmrc" or "gov.uk". Devolved authorities and bare
   rate-table queries fall straight through into informational.
2. **Plural and adjacent commercial tokens.** "specialists", "software",
   "advisors" style variants are missed. 3 errors, 315 impressions.
3. No false positives were found in either matched bucket.

## Precedence effect

Across all 3,763 rows, **3 queries (46 impressions, 0.1%) match both regexes**
and are forced into commercial by the ordering. In the 100-query sample: zero.
The precedence choice is immaterial to the published figures. The damage is in
the residue rule, not the ordering.

## Effect on the published numbers

Applying the sample's impression-level rates as correction factors:

| bucket | published impr | implied true impr | factor |
|---|---|---|---|
| commercial | 4,856 | ~6,080 | x1.25 |
| form/HMRC | 5,336 | ~9,060 | x1.70 |
| informational | 19,033 | ~10,400 | x0.55 |

Direction is unambiguous even if the exact factors are sample-limited: the
script understates commercial, badly understates the structurally unwinnable
form/rate-lookup bucket, and roughly doubles informational.

## Verdict

**yes-with-correction-factor**, and only for the commercial bucket.

- Commercial is safe to act on. Precision 1.00, recall 0.80, so the published
  326 queries / 4,856 impressions is a floor, understated by roughly 25%.
  Any "commercial capture is the gap" conclusion survives, and gets slightly
  stronger.
- Form/HMRC at recall 0.38 is not usable as stated. The bucket exists to fence
  off structurally unwinnable demand; at this recall it fences off less than
  half of it.
- Informational is the worst of the three. It is a residue, not a
  classification, and roughly 45% of its impressions in the sample are
  misfiled rate-table lookups. Do not use the informational total to argue
  anything about content demand or headroom.

Cheapest fix, if these buckets get quoted again: add `revenue scotland|lbtt|
ated|\brates?\b.*20\d\d|annual exempt|allowance` to `FORMCODE_RE`, pluralise
the commercial tokens (`specialists?`, `advis(or|er)s?`), add `software`, and
test FORMCODE first so a rate-table query cannot be claimed as commercial.
That closes 25 of the 27 errors.
