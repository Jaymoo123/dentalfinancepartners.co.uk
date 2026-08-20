# CGT cluster dossier (frozen 2026-08-20)

The shared context for the capital gains tax cluster (cluster 2 of the coverage programme).
Every agent working this cluster reads this file first and adds no scope that is not in it.
Method: `docs/_engines/REWRITE_PROGRAM.md` §9. Predecessor: `briefs/property/sdlt/DOSSIER.md`
(SDLT batch deployed 2026-08-18, first Bing read ~2026-09-01).

**Status: DOSSIER FROZEN 2026-08-20. Work order NOT approved. Nothing written, changed or
deployed. Deploys stay owner-triggered.**

## 1. Scope declaration

Term family: `capital gain(s)` | standalone `CGT` (word boundary). Related relief vocabulary
(private residence relief, letting relief, annual exempt amount, 60-day return) enters the
universe through the pages and queries that carry the family terms; it was not used as a
harvest filter, which is a stated limitation (§7), not a silence.

**Our pages in scope: 374**

| How identified | Pages |
|---|---|
| Family in slug or title | 49 (incl. `/calculators/capital-gains-tax-calculator`) |
| 5+ family mentions in body, not in slug or title | 325 |

Those 374 pages carry 82,814 Google impressions and 808 clicks (90d to 2026-08-20), and
6,543 Bing impressions and 211 clicks (page stats, pulled 2026-08-20). Full list with
per-page equity: `pages_inventory.csv`.

**Competitor universe: 7 domains, 152 URLs carrying family keywords (93 with 3+ keywords),
1,134 unique keywords.** Harvest 2026-08-20, filtered `ranked_keywords` per domain
(keyword contains "capital gain" OR "cgt"), NO volume floor, NO row cap; no domain hit the
1,000-row page ceiling, so the pull is exhaustive under the filter. Spend $0.32 actual.
Raw dump: `briefs/property/_competitor_cgt_keywords_2026-08-20.json` (gitignored).

## 2. Query universe: 3,869 from three sources

| Source | Queries in family | Unique to it | Pulled |
|---|---|---|---|
| Competitor ranked keywords (DataForSEO, 7 domains) | 1,134 | 1,134 | 2026-08-20 |
| Our Google Search Console (90d page+query) | 506 | 454 | 2026-05-22 to 2026-08-20 |
| Our Bing page-query stats (94 of 103 in-scope pages with Bing data) | 2,390 | 2,281 | 2026-08-20 |
| **Union** | **3,869** | | |

Bing alone contributed 59% of the universe (2,281 unique queries), the largest single
source, consistent with the SDLT measurement. Competitor data alone would have dropped
2,735 queries we already earn impressions on. All three sources are mandatory.
Full list: `ledger.csv`.

## 3. Reconciliation ledger

Every query lands in exactly one bucket; the counts sum to the universe or the cluster
cannot reach the pre-deploy gate.

| Bucket | Queries | Meaning |
|---|---|---|
| assigned | 905 | mapped to exactly one page; the owning page's pack carries it |
| already-covered | 2,736 | we already earn impressions, no market cluster; protected by the equity gate |
| gap-no-page | 198 | real demand, no page of ours is close (two queued new pages carry most of it) |
| deferred-shares-decision | 19 | shares-CGT family, off-vertical for a property brand; owner decision (§5) |
| excluded-news | 1 | budget speculation |
| excluded-offniche | 10 | Spain/overseas jurisdictions we do not serve |
| **TOTAL** | **3,869** | balances |

## 4. Cluster map, ordered by peer-winnable volume

Peer-winnable counts only keywords where one of the 7 specialist domains holds a top-10
slot. Raw volume is not the prize: `capital gains tax how much` (84,200/mo) and
`how much capital gain` (48,020/mo) carry **zero** peer top-10 slots — those heads belong
to gov.uk, MoneyHelper and MSE, the same exclusion logic as the SDLT heads.

| Cluster | Vol/mo | Peer-winnable | Kw | Domains | Action | Page |
|---|---|---|---|---|---|---|
| capital gains tax calculator | 161,220 | 23,540 | 125 | 3 | REFRAME (tool experiment, gated) | `/calculators/capital-gains-tax-calculator` |
| capital gains tax on shares calculator | 7,530 | 6,230 | 15 | 1 (taxd) | DEFERRED | owner decision |
| capital gains tax on property | 33,000 | 5,190 | 102 | 6 | EXTEND-BING | `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk` |
| uk capital gains tax calculator | 94,050 | 4,370 | 163 | 5 | REFRAME (same tool) | `/calculators/capital-gains-tax-calculator` |
| cgt letting relief | 4,730 | 4,270 | 19 | 4 | EXTEND-GOOGLE | `/blog/capital-gains-tax/letting-relief-landlords-2026-changes` |
| report capital gains | 28,770 | 2,110 | 131 | 3 | EXTEND-GOOGLE | `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026` |
| do companies pay cgt (x2, merged) | 9,040 | 1,790 | 65 | 3 | NO-PAGE, new page queued | `do-limited-companies-pay-capital-gains-tax-property` |
| hmrc capital gains tax | 15,530 | 1,220 | 43 | 1 | EXTEND-GOOGLE | `cgt-payment-deadlines-property-sales-2026` (consolidation) |
| capital gains tax main residence | 7,910 | 1,130 | 21 | 1* | EXTEND-BING | `/blog/capital-gains-tax/principal-private-residence-relief-landlords` |
| capital gains on residential property | 14,180 | 1,020 | 45 | 3 | EXTEND-GOOGLE | `/blog/capital-gains-tax/capital-gains-tax-property-sale-uk-2026-rates-allowances` |
| cgt on property inherited | 8,780 | 1,000 | 28 | 1* | EXTEND-GOOGLE | `/blog/capital-gains-tax/cgt-inherited-rental-property-calculation-uk` |
| capital gains on rental property | 3,680 | 620 | 22 | 2 | EXTEND-BING | `/blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step` |
| capital gains tax private residence relief | 1,140 | 610 | 8 | 3 | EXTEND-BING | `principal-private-residence-relief-landlords` (consolidation) |
| capital gains on second home | 14,580 | 260 | 45 | 2 | NO-PAGE, new page queued | `capital-gains-tax-second-home-sale` |
| capital gains loss | 1,370 | 50 | 14 | 1 | EXTEND-BING | `/blog/capital-gains-tax/cgt-property-sold-loss-claim-capital-losses` |

\* single-domain clusters where the only ranking domain is `ukpropertyaccountants.co.uk`,
which is visible ONLY through DataForSEO (§7). Their peer-winnable figures rest on one
uncorroborated snapshot; treat as the weakest rows in the map.

22 further clusters carry zero peer-winnable volume and get no work; their keywords sit in
the ledger as assigned/already-covered and their scorer-suggested owners below the work-order
line are provisional, not adjudicated. Full map: `cluster_map.csv`.

## 4b. Tool-shape caveat, inherited from the SDLT dossier §4b

The two calculator clusters are 27,910 of the 52,400 total peer-winnable volume. The SDLT
test showed calculator copy does NOT separate winners from losers on tool SERPs (our SDLT
calculator matched the winner's phrase coverage and ranked nowhere). The same caution
applies here: the CGT calculator REFRAME is an **experiment about tool visibility**, with a
stated hypothesis and revert trigger, not a promised win, and it is **gated on the SDLT
calculator experiment read (~2026-09-01)**. If that read shows no movement, the CGT
calculator work is deprioritised, not executed anyway.

## 4c. Manager adjudications (recorded because the token scorer's pick was wrong)

1. **Both calculator clusters → the head tool** `/calculators/capital-gains-tax-calculator`.
   Tool intent belongs on the named tool; the scorer preferred blog pages because the tool is
   near-invisible (51 Google impressions), which is the defect, not evidence of ownership.
2. **capital gains tax on property → capital-gains-tax-property-complete-guide-uk.** This is
   our biggest CGT asset (14,345 Google impressions / 70 clicks / pos 6.0, 90d) and the
   cluster is the market's core prose topic (6 of 7 domains own a page for it). The scorer
   had given the page to the shares cluster on a token accident.
3. **report capital gains + hmrc capital gains tax → cgt-payment-deadlines-property-sales-2026**
   (2,491 impressions / 19 clicks). The intent is the 60-day reporting and payment regime,
   which is that page's exact subject. Consolidation, not stacking.
4. **main residence + private residence relief → principal-private-residence-relief-landlords**
   (Bing 171 impressions / 4 clicks = our strongest Bing asset in the relief family). The
   narrow election/joint-ownership mechanics pages keep their specialist tails untouched.
5. **do companies pay cgt (both variants) → NEW short page queued.** Companies pay
   corporation tax on chargeable gains, not CGT; no page of ours has that question as its
   subject. The winning competitor page is a 1,068-word direct answer
   (cruseburke `do-limited-company-pay-capital-gains-tax-on-property`). This is the
   subject-match finding from SDLT §4b operating in our favour: the answer is a short
   dedicated page, not a section bolted onto `cgt-property-transfer-limited-company-calculate`.
6. **capital gains on second home → NEW page queued.** 14,580/mo raw, no page of ours has
   second-home CGT as its subject (the SDLT dossier found the same second-home gap on the
   SDLT side). Only 260 peer-winnable, so the page is queued behind the extend work, not
   ahead of it.
7. **capital gains on rental property → cgt-calculation-selling-buy-to-let-property-step-by-step**
   (Bing 84 impressions / 8 clicks). Freed by adjudication 5.
8. **cgt letting relief → letting-relief-landlords-2026-changes**; **cgt on property
   inherited → cgt-inherited-rental-property-calculation-uk**; **capital gains foreign
   property → cgt-overseas-property-uk-residents-foreign-disposals**; **capital gains loss →
   cgt-property-sold-loss-claim-capital-losses**; **capital gains on residential property →
   capital-gains-tax-property-sale-uk-2026-rates-allowances**. Subject-match corrections of
   greedy-scorer artefacts.
9. **Shares family (6,430 pw) → DEFERRED, owner decision.** Only taxd ranks for it; a shares
   CGT play is off-vertical for a property tax brand. Options if wanted: a shares mode on the
   CGT calculator (cheapest), a single shares-vs-property comparison page, or stay out.

## 5. Work order (awaiting owner approval; ordered by evidence-backed prize, not raw prize)

| # | Page | Grade | Peer-winnable | Google 90d | Bing |
|---|---|---|---|---|---|
| 1 | `capital-gains-tax-property-complete-guide-uk` | EXTEND-BING | 5,260 | 14,345i / 70c / pos 6.0 | 476i / 4c |
| 2 | `letting-relief-landlords-2026-changes` | EXTEND-GOOGLE | 4,270 | 192i / 0c / pos 5.4 | 15i / 1c |
| 3 | `cgt-payment-deadlines-property-sales-2026` | EXTEND-GOOGLE | 3,330 | 2,491i / 19c / pos 9.3 | 103i / 1c |
| 4 | `principal-private-residence-relief-landlords` | EXTEND-BING | 1,740 | 13i / 0c | 171i / 4c |
| 5 | `capital-gains-tax-property-sale-uk-2026-rates-allowances` | EXTEND-GOOGLE | 1,020 | 136i / 0c / pos 6.0 | 50i / 2c |
| 6 | `cgt-inherited-rental-property-calculation-uk` | EXTEND-GOOGLE | 1,000 | 115i / 1c / pos 7.1 | 9i / 1c |
| 7 | `cgt-calculation-selling-buy-to-let-property-step-by-step` | EXTEND-BING | 620 | 31i / 0c | 84i / 8c |
| 8 | `/calculators/capital-gains-tax-calculator` | REFRAME, tool experiment | 27,910 | 51i / 0c / pos 9.7 | 9i / 0c |

Gated separately (not started without an explicit decision each):
- **Item 8** waits for the SDLT calculator read ~2026-09-01 (§4b).
- **Two new pages** (`do-limited-companies-pay-capital-gains-tax-property`,
  `capital-gains-tax-second-home-sale`): net-new content, owner-gated per the standing rule.
- **Shares family**: owner decision (§4c.9).

All 7 extend pages are ADDITIVE ONLY (protected elements byte-identical), one change per
page per measurement window, `monitored_pages` + `blog_optimizations` rows at deploy with
missing phrases as `target_keywords`. Packs: `packs/PACK_*.md` (8 sections each, failure
triggers stated before the work).

## 6. Language spec for this cluster

Measured 2026-08-20: 14 competitor pages holding top-10 family slots, 21 non-winning
competitor pages, 24 of our owner/scope pages. Full data: `_language_probe.json`.

| Measure | Winners | Us | Target for this cluster |
|---|---|---|---|
| Words per page | 2,022 | 2,914 | no target; do not pad, do not gut |
| Sentence length | 34.3 | 24.3 | leave alone, we are already tighter |
| Flesch reading ease | 37.9 | 46.8 | leave alone, we already read easier |
| Question-form headings | 31.5% | 14.5% | **raise: new H2s take question form** (differs from SDLT, where we already exceeded winners) |
| "you/your" per 1,000 words | 39.7 | 8.8 | **raise toward 25+ in new sections** |
| Statute refs per 1,000 words | 0.0 | 10.2 | **near zero in new plain-language sections; keep depth below** |
| Jargon nouns per 1,000 words | 0.4 | 3.9 | near zero above the fold |
| Tables | 0.4 | 1.2 | keep ours |

**Answer patterns observed on the winning pages.**

- The heading is the question in the searcher's words: "Do Limited Companies Pay Capital
  Gains Tax on Property?", "What is Lettings Relief?", "What costs can you deduct from a
  capital gain?".
- The answer is the first sentence under the heading: "…limited companies are not liable to
  pay capital gains tax. However, corporation tax is paid…". Context follows the answer.
- Deadlines as direct second-person statements: "You have 60 days to report and pay CGT
  after completion" (landlordstudio, as an H2).
- Worked example with current-year figures on nearly every winner.
- Statute essentially absent from the top half.

**Matched pair (the register gap in one line).** Our Lettings Relief page opens:
"Lettings Relief under section 223B of the Taxation of Chargeable Gains Act 1992 is the
post-2020 incarnation of a relief that used to be much broader." The winning page's opening
heading is "What is Lettings Relief?" answered in the second person in one sentence. Same
facts, opposite order.

**Do not copy:** stale years left on page (cruseburke's winning lettings-relief page still
quotes the £11,100 annual exemption from 2023 and ranks anyway — domain trust, not a habit
to imitate), fluff openers ("Let's kick off our discussion…"), thinness on transitional
rules, booking-CTA padding (optimise).

## 7. Known limitations, stated not hidden

- `ukpropertyaccountants.co.uk` serves an HTTP 202 captcha stub; keyword-data-only, no
  teardown. It is the ONLY ranking domain behind three map rows (main residence, inherited,
  and much of second-home), so those peer-winnable figures are single-source snapshots.
- The shares family's peer evidence is one domain (taxd).
- Bing's page list is a top-N feed: 235 pages have Bing data, 103 in scope, 94 returned
  query rows. Pages below Bing's cut have no Bing detail here.
- GSC drops anonymised queries; our Google contribution is a floor.
- DataForSEO positions are a database snapshot; live SERP positions are UNVERIFIED this
  pass (Serper out of credits, same as the SDLT dossier). No single-query position claim in
  this dossier is live-verified.
- Volume figures sum close variants; cluster totals overstate unique demand. Peer-winnable
  volume is the steering number.
- Relief-specific phrasings that never contain "capital gain"/"CGT" (e.g. bare "letting
  relief" searches) enter only via our own GSC/Bing data, not the competitor filter.
- One uklandlordtax teardown URL returned 404 (recorded in the teardown file); 34 of 35
  targeted competitor pages fetched clean.

## 8. Ground truth for this cluster

`docs/property/house_positions.md`: §5 (CGT on UK residential property 2026/27 — rates,
AEA £3,000, 60-day regime), §17.3-17.4 (temporary non-residence, NRCGT), §17.10 (FA 2025
rebasing election), §39 (CGT on death, probate base cost). 2027 rates:
memory `property_2027_rates_ground_truth` (reducer 22% from April 2027, FA 2026 enacted).
Any conflict between a competitor page and house positions resolves to house positions.

## 9. What happens next

1. Owner approves, trims or reorders the §5 work order, and rules on the three gated items.
2. Per-page work through the existing Opus chain, one page at a time, pack as the only
   input, two QA tracks (adversarial factual vs house positions + editorial vs §6 spec).
3. Eight deterministic gates: the four standing floors plus equity preservation, cluster
   coverage, ledger balance, competitor re-read.
4. `monitored_pages` + `blog_optimizations` rows at deploy (owner-triggered), missing
   phrases as `target_keywords`, dual baselines.
5. Bing read at 14/28d, Google 28/90d. Failure triggers per pack §8.
