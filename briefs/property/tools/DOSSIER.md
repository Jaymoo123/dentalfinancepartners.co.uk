# Tools-family cluster dossier (Phase B of HANDOFF_2026-08-20)

The shared context for the yield-and-tools cluster. Every agent working this cluster reads
this file first and adds no scope that is not in it. Method: `docs/_engines/REWRITE_PROGRAM.md`
§9. Predecessors: `briefs/property/sdlt/DOSSIER.md` (deployed 08-18), `briefs/property/cgt/DOSSIER.md`
(batch cgt1, deploy parked).

**Status: FROZEN 2026-08-21 (teardown + language spec inserted same day).**
Owner rulings inherited from HANDOFF_2026-08-20 §2, recorded 2026-08-20, do not re-litigate:
tools family GO NOW, explicitly ungated from the SDLT calculator experiment read (~09-01);
honest framing mandatory (experiments with stated expectations, not promised wins; tool-SHAPE
lever corroborated, tool-COPY lever refuted per SDLT §4b); gov.uk/MSE-held heads change
expectations, not scope.

## 1. Scope declaration

Term family: keyword contains `yield` OR `calculator` (the scoping doc's four seeds -
"rental yield", "rent calculator", "buy to let calculator", "mortgage calculator" - all fall
inside this superset; the superset was harvested so the off-family remainder could be
excluded EXPLICITLY in the ledger rather than never seen).

**Our pages in scope: 108** (`_scope_pages.json`): 16 slug/title matches, 68 body-5+
mentions, 24 tool pages (all of `/calculators/*`, registry TOOLS).

**Competitor harvest 2026-08-21:** 7 domains (uklandlordtax.co.uk, ukpropertyaccountants.co.uk,
provestor.co.uk, optimiseaccountants.co.uk, cruseburke.co.uk, landlordstudio.com, taxd.co.uk),
`ranked_keywords/live` UK, filter `%calculator%|%yield%`, NO volume floor, NO row cap,
paginated to exhaustion (only taxd needed a second page; every domain terminated under the
page ceiling, so the pull is exhaustive under the filter). 3,573 rows, 2,381 unique keywords,
8 calls, ~$0.55. Raw: `briefs/property/_competitor_tools_keywords_2026-08-21.json`.
Balance before pull: $5.33.

## 2. Query universe: 2,787 from three sources

| Source | Family queries | Unique contribution | Pulled |
|---|---|---|---|
| Competitor ranked keywords (7 domains, uncapped) | 2,381 | 2,381 | 2026-08-21 |
| Our GSC (90d page+query, family-filtered locally) | 331 | 248 | 2026-08-21 |
| Our Bing page-query stats (18 of 108 in-scope pages have Bing data) | 190 | 158 | 2026-08-21 |
| **Union** | **2,787** | | |

Not used (stated limitation): Serper (OUT of credits - no live-SERP single-query claims
anywhere in this dossier; all position claims are DataForSEO harvest positions),
autocomplete/PAA expansions (family is tool-shaped; phrasing variants come through the
competitor pull), google_ads volume calls (banned).

## 3. Consensus map + the finding that shapes the work order

45 topics from 97 competitor URL nodes (3+ keywords), 30%-overlap merge
(`_consensus_map_raw.json`). The raw map is dominated by OFF-NICHE calculator verticals
(salary 6.07M raw vol, generic mortgage 376k, tax rebate 30k) that the superset filter
dragged in; they are excluded in the ledger with reasons, never silently.

**The on-niche finding:** uklandlordtax.co.uk owns the ENTIRE "buy to let mortgage
calculator" variant family from ONE page (their interest-only BTL mortgage calculator):
positions 1-4 on all seven 22,200-vol variants plus the tail (80 peer-top-10 keywords in
that topic). landlordstudio.com holds position 9 on `rental yield calculator` (2,400).
provestor.co.uk owns the "what is a good rental yield" question family (19 peer-top-10
keywords, positions 5-10) from a hotspots CONTENT page, not a tool.

**Volume caveat (stated in scoping, restated here):** the four+ "buy to let mortgage
calculator" close variants each carry an identical 22,200 - DataForSEO Google Ads grouping,
NOT independent demand pools. Treat the family as one ~22k-25k/mo prize, not 155k.

## 4. Assignment (unique, one owner per keyword) + equity grades

Full keyword-level ledger: `ledger.csv` (2,787 rows, per-keyword bucket + owner + volume +
best peer position + our GSC/Bing equity). Balance: **assigned 472 + already-covered 436 +
excluded 1,845 + deferred 34 = 2,787.** No fifth bucket.

### Work order (5 targets)

| # | Target | Grade | Kw | Vol | Evidence |
|---|---|---|---|---|---|
| T1 | `/calculators/buy-to-let-mortgage-calculator` | REFRAME + tool upgrade | 141 | 185,670 (grouped; real ~25k) | ours: G 153 imp / 0 clicks / pos 96.7, no Bing. Peer proof: uklandlordtax pos 1-4 whole family |
| T2 | `/calculators/rental-yield-calculator` | REFRAME + tool upgrade | 106 | 21,570 | ours: G 276 imp / 0 clicks / pos 78.9. Peer at pos 9 = beatable |
| T3 | `/calculators/rental-income-tax-calculator` | REFRAME | 51 | 13,190 | ours: G 23 imp / pos 59.7. Includes `tax on rental income calculator` 1,600 - ADJUDICATED to Phase B (the tool page); Phase C buckets it `assigned` here and works the prose pages only |
| T4 | `/calculators/buy-to-let-cashflow-calculator` | REFRAME light | 17 | 1,490 | ours: G 180 imp / pos 96. Owns roi/cashflow phrasings; `buy to let calculator` itself is T1's (consensus groups it with the mortgage page) |
| T5 | `blog:property-investment-benchmarks-uk-2026-good-yield` | **EXTEND - FROZEN until ~09-15** | 64 | 5,550 | Bing 72 imp / 5 clicks = equity; owns the question family vs provestor's hotspots page. **Discovered at freeze: it is a TREATMENT page in the armed Bing experiment (deployed 08-18, 28d read ~09-15). One change per window (§9.3): the EXTEND executes AFTER that read, as its own delta pass.** `rental-yield-calculator-guide-uk-landlords` is likewise a treatment page; T2's REFRAME touches only the /calculators/ tool page, never that blog page |

All four tool targets grade REFRAME under §9.5 (Google impressions <300 with zero clicks and
positions 46-98 are not equity; no Bing rows). There is nothing to protect on them; there is
everything to protect on T5 (Bing clicks) and on the PROTECT list below.

### Assigned, no action this batch
`/calculators/commercial-mortgage-calculator` (49 kw but 210 summed vol; zero peer-top-10 -
brokers/banks own it; our 1,521 G imp at pos 53.7 noted as the largest impression base in
the family, revisit if a peer ever cracks top-10), rd-tax-credit (22 kw, 6,670 - off the
property brand's core, existing tool stands), development-finance, bridging, holiday-let /
free-rental-valuation / rent-increase blog owners (tail, existing pages).

### PROTECT (do not touch in this batch)
- `landlord-accounting-spreadsheet-template-free-excel-guide` - Google pos 9.2 on `buy to
  let tax calculator spreadsheet`. Real equity. Bucketed already-covered.
- Everything in the sdlt-cluster (deployed 08-18, windows armed to ~11-16) and cgt-cluster
  (batch cgt1 verdict-hashed, deploy parked): 436 already-covered keywords route there.
  One change per page per window (§9.3). The SDLT/CGT calculators are NOT touched by this
  batch even where a tools keyword lands on them.

### Deferred (named)
`trade-site:mileage` + `trade-site:cis` (construction-cis site), `wills-probate` (RNRB/probate
calcs), `candidate-tool:hmlr-fee-calculator` (6.6k vol, weak brand fit - owner call some day),
`candidate-tool:fhl-str` (str calculator 3,600 - post-FHL-abolition angle, future).

### Excluded classes (1,845 kw, 7.36M vol - the superset's off-niche mass)
off-niche:salary/employment (the 6M salary-calculator vertical cruseburke/taxd rank for),
generic-mortgage (bank/MSE-owned, no landlord intent), off-niche general-accountancy/VAT/
refund/personal, brand-navigational, marketplace/crypto, local-tax-generic, and a pass-3
class-reviewed long tail. Every row carries its reason in `ledger.csv`.

## 5. Competitor teardown

See `_teardown.md` (inserted at freeze). Architecture lever recap from the SDLT teardown
stands: non-owner-heavy pages linking to an owner separates the winners (98-100% vs our 39%);
the internal-link sweep discipline from Wave 11 applies to the tool pages via the pillars
and related-links, not a new linking experiment (owner-delayed; reader-navigation only).

## 6. Audience, voice and the answer-pattern spec

See `_language_spec.md` (inserted at freeze). Measured on THIS cluster's winners, not copied
from SDLT/CGT. Standing rules regardless: zero em-dashes, UK English, no PTP pricing, honest
`note` on every tool, every figure traces to `house_positions.md` or HMRC.

## 7. Ground truth

`house_positions.md` sections governing this cluster: §1 (SDLT rates only where a tool
cross-references), §5 (CGT rates for cashflow/tax outputs), §12/§20 (Renters' Rights, only
if cited), §21.9 (dividend rates 2026/27 if the rental-income tool models incorporation
comparison), §24 (joint ownership splits), §26.3/§26.3a (MEES costs in yield prose if
mentioned), §34 (allowable expenses for net-yield definitions), §41 (property income
allowance in the rental-income tool), plus `amap_mileage`/`employer_nic` locks only if
touched. Mortgage-rate assumptions are NOT house positions: every rate input is a USER KNOB
with a stated default and source note, never a hardcoded claim (HANDOFF Phase B mandate).

## 8. Expectations + failure triggers (stated before the work, per tool)

- T1 BTL mortgage calculator: expectation = entry into the variant family's top 20 on Bing
  within 28d of deploy, top 10 within a quarter on at least 2 variants. Failure trigger =
  no Bing impressions on any family variant after 28d; then the page competes on tool SHAPE
  (interest-only default, stress-test link) and copy is NOT the lever to iterate (SDLT §4b).
- T2 rental yield: expectation = beat pos 9 peer within a quarter (Google), Bing
  impressions on `rental yield calculator` within 28d. Failure trigger = same as T1.
- T3 rental income tax: expectation = impressions on `tax on rental income calculator`
  family within 28d Bing. T4: roi/cashflow tail impressions, any, 28d Bing.
- T5 benchmarks EXTEND: expectation = impressions on 3+ question-family phrasings within
  28d Bing without losing any of its current 55 Bing queries (equity gate enforces).
- All honest-framing: these are experiments; "the worst thing that can happen is that
  nothing happens" (owner, 2026-08-20).

## 9. Post-freeze delta list

1. **T5 EXTEND** (benchmarks question-family) - executes after the Bing experiment 28d read
   (~09-15). Includes its GBP-literal fix and named-source/data-through additions.
2. **GBP-literal class** (language probe find): 13 blog files render `GBP18,000`-style
   figures instead of £. 11 window-clear files fixed 2026-08-21 in this batch (mechanical,
   figure-preserving); 2 deferred with T5 (both Bing-experiment treatments:
   property-investment-benchmarks-uk-2026-good-yield, rental-yield-calculator-guide-uk-landlords).
3. `candidate-tool` deferrals from §4 (hmlr-fee, fhl-str) - owner call, not this batch.
