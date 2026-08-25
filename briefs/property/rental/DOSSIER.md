# Rental-income cluster dossier (Phase C of HANDOFF_2026-08-20)

Shared context for the rental-income-tax cluster. No agent adds scope not in this file.
Method: `docs/_engines/REWRITE_PROGRAM.md` §9. Predecessors: sdlt (deployed 08-18), cgt
(batch cgt1, parked), tools (batch executed 08-21, parked).

**Status: FROZEN 2026-08-21 PM (language spec inserted at freeze).**

## 1. Scope declaration

Term family: `rental income` | `rent tax` | `tax on rent` | `landlord tax` (substring,
covers "tax on rental income/property" via "tax on rent"). Our pages in scope: **391**
(52 slug/title + 339 body-5+; `_scope_pages.json`). Competitor harvest 2026-08-21: same 7
domains, filtered `ranked_keywords`, NO floor, NO cap, exhaustive under filter: 884 rows,
248 unique keywords, 7 calls (~$0.20). Raw: `briefs/property/_competitor_rental_keywords_2026-08-21.json`.

## 2. Query universe: 867 from three sources

| Source | Family queries | Pulled |
|---|---|---|
| Competitor ranked keywords (7 domains, uncapped) | 248 | 2026-08-21 |
| Our GSC (90d page+query, family-filtered) | 138 unique | 2026-08-21 |
| Our Bing page-query stats (108 of 391 in-scope pages have data) | 546 family queries | 2026-08-21 |
| **Union** | **867** | |

Bing again the largest own-engine source. Not used (stated): Serper (out of credits, no
live-SERP claims), autocomplete/PAA, google_ads volume calls.

## 3. Consensus map

6 topics from 66 nodes (`_consensus_map_raw.json`). The family is effectively ONE
consensus topic: `tax on rental income` (220 kws, 67,670 raw vol, 16,610 peer-winnable,
all 7 domains treat it) plus satellites (splitting income 360, council tax 630, MTD 170,
two generic-rates topics pw=0). Total peer-top-10 volume 17,210. Volume caveat: the six
2,900-vol head variants are Ads-grouped, not independent pools.

## 4. Assignment + ledger (balances: 605 assigned + 247 already-covered + 10 excluded + 5 deferred = 867)

Full ledger: `ledger.csv`. ADJUDICATIONS pinned by the conductor (recorded in the ledger
rows): `current tax year` excluded generic; `rental income estimator` to Phase B T3;
`landlord tax changes` to the 2027-rates page; all calculator/calculate phrasings (30 kw,
8,220 vol incl. `tax on rental income calculator` 1,600) = **assigned to Phase B T3**
(executed 08-21) per the cross-phase adjudication in HANDOFF §3; this cluster's prose
pages do NOT chase them.

### Work order (3 targets)

| # | Target | Grade | Kw | Evidence |
|---|---|---|---|---|
| E1 | `rental-income-tax-uk-complete-guide-landlords` | **EXTEND (additive only)** | 466 | Bing 253 queries / 204 imp / 6 clicks on family, positions 2-10 = REAL equity. The head owner vs uklandlordtax pos 3 |
| E2 | `landlord-tax-deductions-uk-2026-complete-list` | **EXTEND (additive only)** | 99 | Bing 367 queries / 593 imp / 55 clicks = the strongest Bing page in the family. Peer holds pos 2 on `allowable expenses rental income` 320 |
| N1 | net-new `national-insurance-on-rental-income` | **NET-NEW** | 7 kw, 4,520 vol | `rental income national insurance` + `national insurance on rental income` both 1,300 @ peer pos 9 (ukpropertyaccountants) = beatable; NO page of ours exists (grep confirmed) |

### FROZEN (Bing experiment, armed to ~09-15; discovered at assignment)
- `income-tax-rates-landlords-2026-27-complete-guide` = TREATMENT. `how-much-tax-rental-income-uk-complete-guide` = CONTROL (controls are never edited). Both excluded from
  this work order; their keywords bucket already-covered. The "how much tax" question
  phrasings are additionally carried on E1's extend (a question H2), with the stated risk
  that this may shift the control page's query mix; accepted because the control's
  measurement role ends at the ~09-15 read.

### Already-covered satellites (no action, named owners in ledger)
MTD (mtd-rental-income-threshold-exemptions, Bing 140/24), VAT pair, NRL pages, SA105,
let-property-campaign/penalties, joint-ownership/form-17 (§24 locks), holiday-let pages,
2027-rates page, cgt-cluster keywords.

### Excluded / deferred
News-cycle (`budget landlord tax` 590), council-tax intent (tenant SERP), foreign
jurisdictions, one malformed Bing artefact row; deferred: ltd-company phrasings (5 kw) to
Phase D incorporation.

## 5. Audience, voice

`_language_spec.md` (measured on THIS cluster's winners: uklandlordtax guide,
landlordstudio question pages, ukpropertyaccountants NI post). This is a BLOG cluster:
the tools-cluster calculator spec does NOT transfer. Standing rules: zero em-dashes, UK
English, no PTP pricing, additive-only on EXTEND (protected elements byte-identical),
every figure from house_positions or primary source.

## 6. Ground truth

house_positions: §34 (allowable expenses + home-office trap), §41 (property income
allowance), §24 (joint ownership), section 24 mechanics + April-2027 22% reducer lock,
§19 (MTD only if referenced), dividend/CT locks only if incorporation is mentioned.
FOR N1 (NI page): Class 2 abolition and Class 4 position, the "property business vs
trade" NI boundary (rental profits are generally NOT subject to NI unless the activity
is a trade; FHL abolition context; verify every claim against HMRC manuals at write time
and record in the coverage note - no NI figure exists in house positions today, so N1's
writer DERIVES from primary sources and the QA track re-verifies).

## 7. Expectations + failure triggers (stated before work)

- E1: impressions on 3+ new head phrasings (esp. `tax on rental income uk`, `rental
  income tax rate`) within 28d Bing, ZERO loss of its 253 existing Bing queries (equity
  gate). Failure: any protected query stops matching = revert per pack.
- E2: impressions on `allowable expenses rental income` family within 28d Bing; same
  equity floor over its 367 queries.
- N1: any Bing impressions on the NI pair within 28d of deploy; maturing label until a
  quarter. Honest framing: experiments, not promises.

## 8. Post-freeze delta list

1. E1/E2 second-pass candidates below the work-order line: none (the tail assigned to E1
   is carried in one pass; declined keywords land in coverage notes).
2. The two experiment-frozen pages re-enter consideration after ~09-15.
