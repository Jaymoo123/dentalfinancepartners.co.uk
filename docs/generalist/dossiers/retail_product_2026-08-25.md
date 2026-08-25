# Cluster dossier: retail_product family — generalist (Holloway Davies)

Date 2026-08-25. Track 2 Stage 3 prep, merge-expansion program (R.5, decisions 13/14/15).
Structured per `REWRITE_PROGRAM.md` §9.2 and matched to the worked reference
`creative_performers_2026-08-25.md`. **FROZEN on write; late finds go to the delta list
in §9 (named: DELTA_retail_product_2026-08-25).**

Cluster = 5 niches, all ABSORB -> generalist per the amended
`expansion_research/nichemap_2026-08-25/C2_PLACEMENT.md` §10:
row 69 retail / independent shops (~250/mo, cluster 3-5 deepen),
row 70 used car dealers / automotive (~80/mo, cluster 3-5, **C1 CONDITIONAL**),
row 71 jewellers (section + 1-2 pages, demand below threshold),
row 73 manufacturing (~260/mo family, best merged read 590/mo per C3 §7a; hub 12-15),
row 82 franchisees (160-300/mo, cluster 3-5).

DataForSEO spend this dossier: **$0.00.** The three planned specialist pulls (motor
trade x2, franchise x1, ~$0.18 estimated) were blocked by the daily budget gate:
estate running total $4.9874 of the $5.00 `DATAFORSEO_ABORT_AT` at run time (consumed
today by the crypto pilot and the sibling generalist cluster sessions). The gate was
respected, not gamed; the pulls are D1 on the delta list. Account balance at run:
$50.51 (topped up since R.5's $2.82 note).

---

## 1. Scope declaration

**Term family (regex, recorded):** retail|shop(s)?|shopkeeper|convenience|newsagent|
off-licence|butcher|boutique|garden centre|car dealer|used car|motor trade|dealership|
garage|automotive|margin scheme|jewel*|hallmark|high-value dealer|manufactur*|factory|
fabricat*|franchis*|epos|till|stock-tak* — with recorded false-positive screens for
"coffee/bakery shop how-to-open" content (startup DIY, not accountancy) and consumer
car-depreciation queries (car-value intent, not motor-trade accountancy).

**Estate wall (binding):** ecommerce sellers / Amazon FBA / Shopify belong to the
ecommerce site. `accountant-for-shopify-stores.md` on generalist is conflict-check only
and untouched; online-selling intent is DEFERRED out of this cluster (1 ledger row).

**Our pages in scope (5 seeds + 1 conflict-check):** all in `generalist/web/content/blog/`:
`accountant-for-retail-shops-uk.md` (retail seed),
`how-to-sell-a-manufacturing-business.md`, `invoice-finance-for-manufacturing.md`,
`rd-tax-credits-manufacturing-incremental-improvements.md`,
`r-and-d-tax-credit-specialist-manufacturing-incremental-improvements.md`
(manufacturing-adjacent seeds); plus `accountant-for-shopify-stores.md` (ecommerce wall,
conflict-check only). Company-car posts (`writing-down-allowance-cars`, P11D etc.) are
generalist core corpus, NOT motor-trade cluster pages — checked and left out of scope.
Motor trade, jewellers and franchisees have **zero seeds**: all-net-new niches.

**Competitor field (free DDG sweep, 10 queries, 2026-08-25 +
reuse of tier1_manufacturing and tier2_retail R3 fieldwork):**

| Niche | Specialist field | Evidence |
|---|---|---|
| Retail | **0 dedicated** UK retail-accountancy specialists; 22 SECTION firms | `expansion_research/tier2_retail/COMPETITORS.md` (108 fetch-verified, 2026-07-15) |
| Motor trade | Real specialist tier exists: themotortradeaccountants.co.uk (DEDICATED, bot-blocked 403 but named+snippet verified), maynardjohns.com ("specialist motor trade accountants team"), xeinadin.com national industry page | this run's sweep (10 queries: motor trade accountant, accountants for car dealers uk, used car dealer accountant, car garage accountants uk, franchise accountant uk, accountants for franchisees, accountant for jewellers uk, jewellery business accountant, accountant for retailers uk, accountants for manufacturers uk) |
| Jewellers | **No specialist field.** Jeweller SERPs return generalists with a jewellery page (mytaxdoc, fusionaccountants, taj) and non-accountancy noise | this run's sweep; per instruction: recorded, no spend hunting |
| Manufacturing | 1 DEDICATED (skynetaccounting.co.uk) + 37 SECTION incl. institutional (MHA, Azets, PKF Francis Clark) | `tier1_manufacturing/COMPETITORS.md` (204 fetch-verified, 2026-07-12) |
| Franchisees | franchise.accountant (DEDICATED franchisee specialist, fetch-verified this run: "specialist franchise accountants... being a franchisee"). Watch reverse intent: several "franchise accountant" SERP slots sell accounting franchises (tfmcentre, taxaccountantfranchise.co.uk) — the recruitment reverse-intent precedent applies | this run's sweep |

**Ranked-keyword harvests used (all reused, $0 this session):**

| Domain | Pulled | Where | Family rows |
|---|---|---|---|
| skynetaccounting.co.uk | 2026-07-12 | `tier1_manufacturing/raw/dfs_ranked_raw.json` | 19 |
| lanop.co.uk | 2026-08-25 (sibling trades_transport session) | `docs/generalist/dossiers/trades_transport_2026-08-25_ranked_raw.json` | 17 |
| livingstonesaccountants.co.uk | 2026-08-25 (same sibling raw) | same file | 22 |
| depreciationscalculator.co.uk | 2026-07-12 | `tier1_manufacturing/raw/dfs_ranked_raw.json` | 12 (all screened EX-CONSUMER-CAR) |
| clarkwell.co.uk, gondalaccountancy, u-deliver, thexln | 2026-08-25 sibling raw | checked, 0 family rows | 0 |

**NOT harvested (gate-blocked, delta D1):** themotortradeaccountants.co.uk,
maynardjohns.com, franchise.accountant. The motor-trade and franchisee consensus maps
below are therefore built from measured head volumes (C3), the free SERP field and the
C1/C2 sizing — honest but one-eyed; D1 upgrades them.

**Query universe (union of named sources):**

| Source | Date | Rows contributed |
|---|---|---|
| Reused ranked pulls, family-filtered (4 domains) | 07-12 / 08-25 | 70 |
| tier2_retail paid head volumes (20 kws; 12 returned null volume) | 2026-07-15 | 20 |
| Discovery pool `discovery_candidates` site_key=generalist lane=retail_product (26 rows: 12 dfs_ranked, 9 sitemap, 5 gsc) | 2026-08-25 | 26 |
| Our GSC 90d (window 2026-05-27 to 2026-08-25) | 2026-08-25 | 13 true-family queries |
| Our Bing 91d query stats | 2026-08-25 | 0 true-family (3 regex hits, all false positives: ecommerce PAA, garage-costs mileage question) |
| C3_DEMAND measured heads (rows 70/71) | 2026-08-25 | 3 |

**Universe = 111 distinct keywords after dedupe.** Row-level record:
`retail_product_2026-08-25_ledger.csv` (same directory). Raw family extraction:
scratchpad intermediates deleted per housekeeping; the reused raws live at the paths
above and are not duplicated.

**Known artefacts, stated:** (1) variant families are summed per-variant in the ledger
("retail accountant(s)/accounting for retail..." = 8 rows at 210 each); the deduplicated
family demand is the C3 figure (~250/mo retail, 260-590 manufacturing, 160-300
franchisees, 80 automotive, jewellers below threshold) and THAT is the honest demand
line. (2) tier1_manufacturing's 2,586-kw topic pool and 1,690 page clusters were used as
consensus-shape evidence, not imported row-by-row into this ledger (they were built for
a standalone site; the hub plan below is the generalist-sized extract). (3) 12 of the 20
July retail head pulls returned null volume — sub-10/mo, not zero intent.

---

## 2. Consensus topic map

Competitor page groupings (§9.2 step 2) from the reused harvests + the two R3
competitor teardowns on file:

| Topic | Domains treating it as a page | Kws | Family vol/mo (deduped) | Peer-winnable | Note |
|---|---|---|---|---|---|
| Retail accountant / accounting for retail | lanop (/retail-business/, pos 23-36), + 22 SECTION firms on file | 20 | ~250 | ~250 | no specialist holds top-10; lanop best at 23. Weakest field of any niche researched (tier2 verdict) |
| Retail VAT schemes / till / EPOS / cash records | tier2 pool; retail vat scheme 140/mo, till reconciliation 40 | 8 | ~200 | ~200 | scheme queries are operator-problem intent; gov.uk owns heads but modified variants open |
| Convenience store accountant | 3esaccountants (UNVERIFIED), livingstones sub-pages; our GSC already shows local impressions (harrow 5, milton keynes 1) | 6 | ~40 measured + nulls | ~40 | tier2 read: most commercial retail sub-trade |
| Buying/selling a shop, goodwill | marketplaces own it; buying a convenience store 40/mo | 2 | ~40 | thin | section, not page |
| Manufacturing accountant (pillar) | skynet (pos 11-22), livingstones (66), lanop, + 37 SECTION firms | 10 | 260 (family 590 merged w/ engineering) | ~260 | skynet's page structure = the beatable specialist reference |
| Manufacturing costing / WIP / product cost | skynet (3 pages, pos 9-19), software vendors above | 10 | ~170 + theory tail | ~170 | student/DIY contamination measured in tier1 TOPICS.md; qualified slice only |
| Manufacturing plant & machinery CA (qualified) | tier1 pool cluster (21 members) | (pool) | n/a this ledger | open | ESTATE WALL: generic CA = generalist core already; only manufacturing-qualified variants are this cluster's |
| Manufacturing R&D (qualified) | boutique claim firms own generic; seeds exist | 1 | 15 imps GSC | thin | standing constraint 3 binds tone |
| Exporters / CBAM 2027 | zero incumbent accountancy owner (tier1 finding) | 0 here | unmeasured | open | the one whitespace hub; volume unproven — D3 |
| Franchise accountant / accountants for franchisees | franchise.accountant (DEDICATED), djh, plusaccounting, mne | 5 | 140-300 | ~140 | harvest gap D1; reverse-intent screen mandatory |
| Car dealer / motor trade accountant | themotortradeaccountants, maynardjohns, xeinadin + accotax/cruseburke section pages | 1 | 80 (head 40) | ~40 | harvest gap D1 |
| Jewellers | none | 3 | below threshold (autocomplete 10/4) | ~0 | coverage play, not a demand play |

Single-domain idiosyncrasies screened: livingstones' how-to-open-a-coffee-shop fleet
(7,440/mo, EX-STARTUP-DIY), depreciationscalculator's consumer car-value fleet (2,480/mo,
EX-CONSUMER-CAR), accounting-software roundups (980/mo, EX-SOFTWARE).

---

## 3. Assignment table, unique

One topic -> one page. Estate walls respected: ecommerce/Shopify -> ecommerce site;
generic capital allowances and generic R&D stay with the existing generalist/estate
owners (the tier1 s5b wall, 304 enforced drops, is adopted wholesale).

| Topic | Page | Grade |
|---|---|---|
| Retail pillar | `accountant-for-retail-shops-uk` | REFRAME |
| Retail VAT schemes + till/EPOS/cash records | net-new N1 | NET-NEW |
| Convenience stores (incl. buy/sell section) | net-new N2 | NET-NEW |
| Buying/selling a shop | folded into N2 as a section (never a page per keyword) | (inside N2) |
| Manufacturing pillar | net-new N3 `accountants for manufacturers` | NET-NEW (no seed owns the head) |
| Costing / WIP / stock year-end | net-new N4 | NET-NEW |
| Plant & machinery CA, manufacturing-qualified (FA 2026 14% WDA / 40% FYA / full expensing ordering) | net-new N5 | NET-NEW |
| VAT for manufacturers (GSC: "how to calculate vat for a manufacturing business" 12 imps) | folded into N3 FAQ or N4 | (inside) |
| Manufacturing R&D qualified | `rd-tax-credits-manufacturing-incremental-improvements` | EXTEND-shape (see §5; near-dupe sibling flagged) |
| Manufacturing exit | `how-to-sell-a-manufacturing-business` | EXTEND-shape |
| Manufacturing finance | `invoice-finance-for-manufacturing` | KEEP (specialist tail; constraint-4 wording check only) |
| Food & drink manufacturers | net-new N6 (biggest CH sub-sector, tier1 evidence) | NET-NEW |
| Exporters / CBAM wedge | net-new N7 (volume unproven, D3 gates it) | NET-NEW (conditional) |
| Motor trade / car dealer pillar | net-new N8 | NET-NEW |
| Used-car margin scheme VAT | net-new N9 | NET-NEW |
| Dealership operations (stocking finance, demo cars, part-ex, garage/MOT side) | net-new N10 | NET-NEW |
| Jewellers (incl. MLR HVD + margin scheme for second-hand) | net-new N11, single page | NET-NEW |
| Franchisee pillar | net-new N12 | NET-NEW |
| Franchise fees: initial fee, ongoing royalties, amortisation | net-new N13 | NET-NEW |
| Franchisee structure & VAT (ltd vs ST, MFF worked example) | net-new N14 or folded into N12 if D1 harvest shows one consensus page | NET-NEW (conditional) |

Specialist-tail outcome (§9.2 step 4, third outcome): `invoice-finance-for-manufacturing`
matches only 2 low-volume market keywords (180/mo variant-summed); the market does not
group it. KEEP, protected, not expanded.

---

## 4. Screen: exclusions with reason codes and volumes

Nothing dropped silently; every row in the ledger CSV. Summary:

| Reason code | Kws | Vol/mo (variant-summed) | What it is |
|---|---|---|---|
| EX-STARTUP-DIY | 17 | 7,440 | "how to open a coffee shop/bakery" fleet — livingstones' traffic model, startup DIY not accountancy; A* lead-intent bar |
| EX-CONSUMER-CAR | 12 | 2,480 | consumer vehicle-depreciation/car-value queries (depreciationscalculator audience) |
| EX-SOFTWARE | 8 | 980 | "manufacturing/accounting software" roundup intent — software-vendor SERPs; separate editorial call, not this cluster |
| EX-OFFNICHE | 4 | 30 | residual no-topic rows |
| DEF-ECOM (deferred, not excluded) | 1 | — | `shopify seller accountants` GSC query -> ecommerce site territory |

Ledger balance: **assigned 69 + excluded 41 + deferred 1 = 111 = universe. BALANCES.**
(already-covered is legitimately zero: no seed has protected ranking coverage; the 13
GSC family queries travel inside their assigned pages' packs as do-not-lose entries.)

---

## 5. Equity grading of the seeds (Bing first, conservative)

Google = GSC 90d (2026-05-27 to 2026-08-25); Bing = 91d page stats summed per URL.
All five seeds have **zero Bing rows** — no Bing equity anywhere in this cluster.

| Seed | Bing clicks/imps | Google clicks/imps/pos | Verdict |
|---|---|---|---|
| accountant-for-retail-shops-uk | 0 / 0 | 0 / 1 / 10.0 | **REFRAME** |
| how-to-sell-a-manufacturing-business | 0 / 0 | 0 / 9 / 7.4 | **REFRAME** (pos 7 on 9 imps is immature, not equity) |
| rd-tax-credits-manufacturing-incremental-improvements | 0 / 0 | 0 / 6 / 6.7 | **REFRAME** |
| r-and-d-tax-credit-specialist-manufacturing-incremental-improvements | 0 / 0 | 0 / 0 / — | **REFRAME**, but see near-dupe note |
| invoice-finance-for-manufacturing | 0 / 0 | 0 / 0 / — | KEEP (specialist tail; a REFRAME with no target set is a no-op) |

**Near-duplicate flag (never-collapse rule applies):** the two R&D posts carry
near-identical titles ("Incremental Improvements" vs "Incremental Production
Improvements"). Keep both, differentiate hard at pack time (one takes the
claim-eligibility question, one takes the specialist/process angle), zero redirects.

**Local-query note:** the cluster's largest live GSC queries are local variants
("retail accountants croydon" 44 imps, "manufacturing accountant swansea" 32, putney/
sutton/harrow/bury st edmunds) almost certainly landing on location pages, not blog
seeds (stage0 pull is single-dimension; join not run). These travel as do-not-lose
entries; pack derivation must run the page+query join before touching any location page.

---

## 6. Proposed page plan (right-sized per niche)

**19 target surfaces: 4 seed actions + 14 net-new + 1 conditional.** C2's shapes hold
for retail (3-5 ✓), motor trade (3 ✓), jewellers (1 ✓), franchisees (2-3 ✓).
**Manufacturing hub 12-15 is REVISED DOWN to ~9 surfaces on evidence:** the tier1 pool
is deep (1,690 clusters) but two of its three moat clusters sit behind the estate's own
walls (generic CA and generic R&D already owned by generalist/dentists/property/
contractors-ir35 — 304 enforced drops in tier1's own s5b), and the field at head-term
tier is institutional (MHA/Azets/PKF). 9 qualified-slice surfaces now; the hub grows to
12-15 only if the 90d read clears the NETNEW success line (cohort median >200 imps).

| # | Surface | Niche | Action |
|---|---|---|---|
| R1 | accountant-for-retail-shops-uk | 69 | REFRAME on `retail accountant(s)` family (~250/mo, no specialist top-10; lanop best 23) |
| N1 | Retail VAT schemes: point-of-sale, apportionment, direct calculation + till/EPOS/cash-records H2s | 69 | NET-NEW (~200/mo) |
| N2 | Accountant for convenience stores (+ buying/selling a shop section) | 69 | NET-NEW (~40 measured + null-volume tail + live local GSC impressions) |
| N3 | Accountants for manufacturers (pillar; VAT-for-manufacturers FAQ) | 73 | NET-NEW — beats skynet's pos-11 page or nothing does |
| N4 | Manufacturing costing / WIP / stock year-end (qualified slice) | 73 | NET-NEW (~170/mo + tail; screen student intent) |
| N5 | Plant & machinery capital allowances for manufacturers (FA 2026: WDA 14%, 40% FYA, special 6%, ordering) | 73 | NET-NEW (manufacturing-qualified only; generic CA = wall) |
| E1 | rd-tax-credits-manufacturing-incremental-improvements | 73 | REFRAME + near-dupe differentiation of its sibling |
| E2 | how-to-sell-a-manufacturing-business | 73 | REFRAME (query set from N3 harvest at pack time) |
| N6 | Accountant for food & drink manufacturers | 73 | NET-NEW (largest CH sub-sector; jointly serves cake-makers row 72's tail) |
| N7 | Exporters/CBAM 2027 for manufacturers | 73 | NET-NEW CONDITIONAL on D3 volume check — whitespace with zero accountancy incumbent |
| N8 | Accountant for car dealers and the motor trade | 70 | NET-NEW (head 40/mo, family 80; specialist field exists so intent is real) |
| N9 | VAT margin scheme for used car dealers (worked examples, global accounting) | 70 | NET-NEW — the operator problem that anchors the niche |
| N10 | Car dealership accounting: stocking finance, demo cars, part-exchange, garage/MOT side | 70 | NET-NEW |
| N11 | Accountant for jewellers: MLR high-value dealer registration, margin scheme on second-hand/antique, stock | 71 | NET-NEW, single page (coverage play; demand below threshold, recorded not chased) |
| N12 | Accountant for franchisees (pillar) | 82 | NET-NEW (140-300/mo; differentiate from buy-a-franchise reverse intent) |
| N13 | Franchise fees and tax: initial fee, royalties, amortisation | 82 | NET-NEW |
| N14 | Franchisee structure and VAT | 82 | NET-NEW CONDITIONAL — fold into N12 if the D1 franchise.accountant harvest shows one consensus page |

**C1 fence on every row-70 surface (binding, from C1_REGULATORY.md row 70):** margin
scheme VAT accountancy is clear; motor-finance commission or mis-selling claim content,
and any referral of a claimant, is regulated claims management (RAO art 89G; FSMA
s.19/s.23 — unauthorised carrying-on is criminal). N8/N9/N10 carry ZERO motor-finance
redress content, no DCA/commission-scandal explainer, no claims CTA. The fence goes in
each pack's section 1.

Frozen-ground check: none of the 5 seeds is in an armed `monitored_pages` window on the
registers on file; verify against the live table at pack derivation (standing rule).

Cannibalisation notes (C2 amendment note 5): R1 vs N2 resolved by assignment split
(pillar vs sub-trade). N6 vs row 72 cake makers: N6 is the host surface, note closes.
N5 vs existing generalist/estate CA pages: manufacturing-qualified phrasings only, the
tier1 wall list is the screen. `accountant-for-shopify-stores` untouched (ecommerce).

---

## 7. Audience, voice

Owner-operators: shopkeepers, dealer principals, factory MDs, franchisees — trading
companies and sole traders, NOT consumers (no car-buyer, no jewellery-buyer content;
that is what EX-CONSUMER-CAR guards). Register per generalist parity voice and
`VOICE_STANDARD.md`; the farming finding applies (reader in the sentence, not the
relief). Language pass (§9.11) per cluster at pack derivation.

---

## 8. Ground truth: house positions needed BEFORE writing (list only, not authored)

`docs/generalist/house_positions.md` carries none of these. Lock before packs:

1. **VAT margin scheme** (N9, N11): second-hand margin scheme mechanics, the used-car
   scheme specifics (stock book, global accounting eligibility), margin scheme for
   second-hand jewellery/antiques. One position serves both niches.
2. **The row-70 motor-finance fence, written as a wording rule** (N8/N9/N10): what the
   pages may not say or link, per C1 CONDITIONAL above.
3. **MLR high-value dealer registration** (N11): the €10,000 cash-payment trigger, HMRC
   supervision, penalties — verified at source.
4. **Retail VAT schemes** (N1): point-of-sale vs apportionment vs direct calculation,
   eligibility turnover caps, mixed-rate food rules.
5. **Capital allowances for plant, FA 2026** (N5): ground truth already in memory
   (WDA 18%->14%, new 40% FYA, special rate 6%) — needs porting into generalist
   house_positions with ordering guidance, not re-derivation.
6. **Franchise fee treatment** (N13): initial franchise fee capital vs revenue, corporate
   intangibles amortisation vs income-tax treatment, ongoing royalties deductibility.
7. **R&D positioning** (E1): merged-scheme facts + standing constraint 3 (no claim-farm
   positioning) restated as a page-level rule.
8. **CBAM 2027 exporter facts** (N7, only if D3 clears it).

---

## 9. Delta list — DELTA_retail_product_2026-08-25

Dossier FROZEN. Everything found after this point lands here, not in the batch.

| # | Item | Reason parked |
|---|---|---|
| D1 | ranked_keywords harvest: themotortradeaccountants.co.uk, maynardjohns.com, franchise.accountant (~$0.18 est.) | blocked by `DATAFORSEO_ABORT_AT` daily gate at $4.99/$5.00; run when the gate resets, then re-check N8-N10/N12-N14 consensus and the N14 fold decision |
| D2 | Persist reused + future harvests into `dataforseo_competitor_data` | §9.2 step 1 persistence not done by any of today's dossier sessions (table query 400s on expected columns; schema check needed first) |
| D3 | Exporters/CBAM volume check (free autocomplete + one cheap volume pull) | N7 is conditional on it |
| D4 | Free expansions (autocomplete/PAA) not run for motor trade/jewellers/franchise this session | tier2_retail autocomplete on file covers retail only; run at pack derivation if heads look thin |
| D5 | GSC page+query join for the local-variant queries (croydon/swansea/putney...) | stage0 pull is single-dimension; join before touching any location page |
| D6 | 12 null-volume retail heads from the July pull | sub-10/mo; re-check only if N1/N2 underperform at 90d |

---

## 10. Open questions for the owner (batched; none blocks pack derivation except Q1)

1. House positions (§8 items 1-7) must be locked before any writing. Approve authoring
   as the first Stage 3 task for this cluster?
2. Manufacturing hub sized at 9 surfaces now, growing to C2's 12-15 only on a passing
   90d read — the tier1 evidence (institutional field + estate walls) says start
   smaller. Confirm, or direct the full 12-15 up front.
3. N7 (CBAM/exporters) is genuine whitespace but unproven volume; D3 is a sub-$0.10
   check. Run it, or drop N7 to keep the cluster lean?
4. The 17-surface batch is large for one wave. Proposed order: manufacturing (richest
   evidence) -> retail -> franchisees -> motor trade (after D1) -> jewellers. Reorder if
   you want the C1-fenced motor work sooner.
