# Cluster dossier: trades_transport family — generalist (Holloway Davies)

Date 2026-08-25. Track 2 Stage 3 prep, merge-expansion program (R.5, decisions 13/14/15).
Structured per `REWRITE_PROGRAM.md` §9.2/§9.7/§9.8. **FROZEN on write; late finds go to
the delta list in §9 below (named: DELTA_trades_transport_2026-08-25).**

Cluster = 6 niche-map rows, all ABSORB -> generalist per the amended
`expansion_research/nichemap_2026-08-25/C2_PLACEMENT.md`:
row 64 taxi & private-hire drivers (hub 12-15 shape, 310/mo), row 65 couriers / delivery
drivers (cluster 3-5, 20/mo), row 66 hauliers / trucking (cluster 3-5, 140/mo), row 79
driving instructors (cluster 3-5, 60/mo), row 88 security firms (cluster 3-5, vol null),
row 89 cleaning businesses (cluster 3-5, 10/mo). C1 status all six rows: **CLEAR**
(licensing bites the client/driver in every case; the HMRC tax check for taxi/PHV licence
renewal is ordinary compliance work).

**Estate boundary, applied throughout:** plumbers / electricians / CIS trades belong to
construction-cis and are OUT of this cluster (pool row `accounting for plumber` excluded
EX-CIS in the ledger). Gig-platform driver work is generalist sole-trader SA territory and
stays off construction-cis's ground (couriers are not CIS subcontractors).

DataForSEO spend this dossier: **$0.855** (ranked_keywords 6 domains, lanop + clarkwell
paginated to exhaustion: $0.4243 first pass + $0.4308 pagination). Balance before $50.51,
after pagination ~$49.65. Within the $1.50 hard cap for this dossier.
**Limitation, recorded:** a planned $0.12 `search_volume` call for 31 head terms
(driving-instructor / cleaning / security heads the harvest cannot see) was BLOCKED by the
`DATAFORSEO_ABORT_AT` daily gate ($4.99 of $5.00 already spent today across sessions).
The cap was NOT raised. Those heads are sized from C2's free-corpus figures instead;
the call is parked as delta D1.

---

## 1. Scope declaration (§9.8 item 1)

**Term family (regex, recorded):** taxi|uber|private hire|phv|minicab|cab|courier|
deliveroo|just eat|amazon flex|evri|dpd|delivery|hauli|haulage|hgv|truck|lorry|logistics|
transport|driving instructor|adi|cleaner|cleaning|security|sia|door supervisor|driver|
chauffeur|gig — with recorded false-positive screens for "social security" (benefits),
"cyber security" (SERP noise), "taxing dividend income" and employee uniform-cleaning
rebate queries (none of these is this family; all screened in the ledger).

**Our pages in scope (5 seeds), all in `generalist/web/content/blog/`:**
`accountant-for-uber-drivers.md` (note: no `-uk` suffix on this slug),
`accountant-for-delivery-drivers-uk.md`, `invoice-finance-for-haulage-and-transport.md`,
`invoice-finance-for-security-firms.md`, `invoice-finance-for-cleaning-companies.md`.
Slug/title sweep of the rest of the generalist corpus found no other page carrying the
family (no taxi, driving-instructor, or cleaning/security accountancy page exists).
**There is NO taxi page**: the highest-volume niche in the cluster (row 64) has no seed.

**Competitor domains harvested (6, 2026-08-25), identified via free DDG SERP sweep over
10 heads (`accountant for taxi drivers uk`, `accountants for couriers uk`, `haulage
accountants uk`, etc.) plus the discovery pool's dfs_ranked source domain
(qaccounting.com, pool rows reused, not re-pulled):**

| Domain | Type | Ranked rows (total) | Family rows |
|---|---|---|---|
| lanop.co.uk | drivers multi-page specialist (taxi/uber/delivery) | 2,700 (paginated, total_count 2,700) | 14 |
| gondalaccountancy.co.uk | uber/taxi/HGV driver specialist | 511 | 9 |
| u-deliver.co.uk | delivery-driver/courier specialist | 15 | 3 |
| livingstonesaccountants.co.uk | haulier + taxi + niche-fleet specialist | 388 | 35 |
| clarkwell.co.uk | transport/couriers + cleaning generalist-with-pages | 2,490 (paginated, total_count 2,490) | 4 |
| thexln.com | the ONLY security-firm accountancy page found | 22 | 0 |

**Field findings from the free sweep (spend deliberately NOT extended hunting):**
- **Driving instructors: NO specialist accountancy field exists.** The DDG SERP for
  `accountant for driving instructors uk` returns zero accountancy specialists (gov.uk
  test booking, driving schools, AI-tools listicles). Recorded as a finding, not chased.
- **Security firms: NO specialist field.** One page-1 result (thexln.com) whose entire
  ranked-keyword set (22 rows) contains zero security-accountancy terms. The demand field
  is invisible to keyword data. Recorded, not chased.
- **Cleaning: specialists exist** (accotax, clarkwell, cruseburke, sbxaccountants,
  soletraderaccountants all hold page-1 slots for `accountants for cleaning companies
  uk`) but the harvested field carries almost no cleaning-accountancy keyword volume;
  the head is C2-sized at ~10/mo.
- Taxi / couriers / haulage: crowded genuine specialist fields (10/10 specialist SERPs).

**Query universe (union of named sources, §9.7):**

| Source | Pull date | Family rows | Note |
|---|---|---|---|
| Competitor ranked_keywords, 6 domains, uncapped (lanop + clarkwell paginated to exhaustion after a 1,000-row first page truncated at vol 170) | 2026-08-25 | 65 raw -> distinct kws below | min-vol reached 10 on every harvested domain: no volume floor |
| Our GSC 90d (window 2026-05-27 to 2026-08-25, data-through per stage0 pull) | reused from stage0 `gsc_90d.json` | 4 queries | `transport accountants croydon` (70 imps, pos 78.5), `accountant for delivery driver uk`, `accounting for courier`, `haulage accountant` |
| Our Bing query stats (provider-side rolling snapshot) | reused from stage0 `bing.json` | 6 queries | all uber/delivery; incl. 1 click on `as a delivery driver can i claim capital allowance for van` and 2 clicks on `uber accounting services` |
| Discovery pool `discovery_candidates` lane trades_transport (dfs_ranked + gsc sources only; the 26 sitemap rows are competitor page titles, not queries) | 2026-08-25 | 5 | `uber tax` 480/mo, `are uber driver self employed` 260 x2 (qaccounting.com), `driving instructor claim 45p per mile` (gsc), `accounting for plumber` (gsc, excluded EX-CIS) |

**Universe = 65 distinct keywords** after cross-domain dedupe.
Full row-level record: `trades_transport_2026-08-25_ledger.csv` (same directory).
Raw paid harvest preserved: `trades_transport_2026-08-25_ranked_raw.json`.

**Known artefacts, stated:** (1) the pool lane is thin (3 dfs_ranked rows) because
`sites/generalist.discovery.json`'s 15 general competitors do not specialise here; a
sampling artefact, not low demand; this dossier's specialist harvest is the corrective.
(2) Free expansions (autocomplete/PAA) were NOT run: stated limitation, delta D3.
(3) Head-term Ads volumes for the three zero-field niches were NOT bought (daily budget
gate, header note); C2's free-corpus sizing is used instead.

---

## 2. Consensus topic map (§9.8 item 2)

Competitor URL nodes with 3+ family keywords, merged across domains at 30% overlap of
the smaller set. Surviving consensus topics (peer-winnable = vol of kws where a
specialist holds top-10):

| Topic | Domains | Kws | Raw vol/mo | Peer-winnable | Note |
|---|---|---|---|---|---|
| T-TAXI accountant for taxi / private-hire drivers | 4 (gondal p1, lanop, livingstones, u-deliver) | 5 | 580 | 330 | gondal holds p1 on `accountant for taxi drivers` (110) with a dedicated page; every specialist runs one |
| T-SA self-employed taxi driver / self assessment / MTD / expenses | 1 (livingstones, three dedicated pages: self-assessment, allowable-expenses, MTD note) | 10 | 890 | 770 | single-domain but livingstones holds p7-p10 across the whole set; expenses sub-set folded in (never a page per keyword) |
| T-VAT VAT on taxi fares / private hire | 1 (livingstones dedicated page) | 5 | 520 | 0 | `do taxis charge vat` 140, `is there vat on taxi fares uk` 110; positions 16-24, winnable field |
| T-GIG uber / gig-driver tax status Q&A | 5 + qaccounting (pool) | 12 | 1,280 | 70 | `uber tax` 480 + `are uber driver self employed` 260 x2 (pool), `is uber eats self employed` 90, `uber hmrc reporting` 50, our 6 Bing queries |
| T-COU couriers / delivery drivers | (our GSC/Bing only; u-deliver + gondal run pages but their courier kws surface inside T-GIG) | 3 | 0 measured | — | heads are sub-measurement; the field exists (5 specialist page-1 domains on the DDG sweep) |
| T-TRANS transport / haulage-company accountant | 3 (clarkwell, lanop, livingstones) | 5 | 270 | 0 | `transport accountant(s)` 90 x2; + our GSC `transport accountants croydon` 70 imps + `haulage accountant`; specialists sit p23-p63: open field |
| T-HGV HGV / lorry-driver expenses & meal allowance | 1 (gondal dedicated page) | 2 | 100 | 0 | `lorry driver meal allowance` 50, `meal allowance for hgv drivers` 50 |
| T-DRI driving instructors | 0 competitor domains | 1 | 0 measured | 0 | only our pool GSC query `driving instructor claim 45p per mile`; C2 sizes the head at 60/mo; no specialist field exists |
| T-CLN cleaning businesses | 1 (livingstones start-a-cleaning page) | 2 | 140 | 70 | `cleaning products vat` 70 + `vat on cleaning products` 70; head C2-sized ~10/mo; specialist pages exist (accotax etc., unharvested) |
| security firms | 0 | 0 | 0 | 0 | zero keyword field anywhere, incl. the one specialist's own harvest |

Single-domain idiosyncrasies screened (§4): livingstones' chauffeur how-to-become fleet
(career intent), gondal's Bolt-launch news page, lanop's uniform-tax-rebate page
(employee rebate demand wearing the word "cleaning").

---

## 3. Assignment table, unique (§9.8 item 3)

One topic -> one page. The three invoice-finance seeds are our specialist tail (§9.2
step 4, third outcome): they match nothing in the market map, are kept and protected,
and take no topic.

| Topic | Kws | Vol | Peer-winnable | Page | Grade |
|---|---|---|---|---|---|
| T-TAXI | 5 | 580 | 330 | NO PAGE EXISTS -> net-new N1 hub `accountant for taxi and private-hire drivers` | NET-NEW |
| T-SA (+ expenses folded in as H2s) | 10 | 890 | 770 | net-new N2 `self-employed taxi driver tax, self assessment, expenses and MTD` | NET-NEW |
| T-VAT | 5 | 520 | 0 | net-new N3 `VAT on taxi fares and private hire` | NET-NEW |
| T-GIG | 12 | 1,280 | 70 | `accountant-for-uber-drivers` | EXTEND |
| T-COU | 3 | 0 | — | `accountant-for-delivery-drivers-uk` | EXTEND (override, §5) |
| T-TRANS | 5 | 270 | 0 | net-new N4 `accountant for hauliers, haulage and transport companies` | NET-NEW |
| T-HGV | 2 | 100 | 0 | net-new N5 `HGV and lorry driver expenses (meal allowance, sleeper cab, subsistence)` | NET-NEW |
| T-DRI | 1 | 0 | 0 | net-new N6 `accountant for driving instructors` (single page, coverage minimum) | NET-NEW |
| T-CLN | 2 | 140 | 70 | net-new N7 `accountant for cleaning businesses` (single page, coverage minimum; carries the VAT-on-cleaning-products FAQ set) | NET-NEW |
| security | 0 | 0 | 0 | net-new N8 `accountant for security firms` (single page, coverage minimum, zero assigned kws: built on the coverage-over-selection lock, not on measured demand) | NET-NEW |

Estate unique-assignment checks: no other site holds a taxi/courier/haulage/cleaning/
security accountancy page (C2 max-overlap rows for 88/89 are support-1 noise, recorded
in C2 §4); plumber/electrician demand routes to construction-cis and is excluded here.

---

## 4. Screen: exclusions with reason codes and volumes (§9.2 step 3)

Nothing dropped silently; every row is in the ledger CSV. Summary (20 kws, 3,380 vol/mo):

| Reason code | Kws | Vol/mo | What it is |
|---|---|---|---|
| EX-CAREER | 9 | 1,060 | livingstones' chauffeur how-to-become fleet + `best apps for drivers`; traffic-model content, conflicts with the A* lead-intent bar |
| EX-OFFNICHE | 8 | 2,140 | employee uniform-cleaning tax-rebate set (lanop, 5 kws 910), `taxing dividend income` (1,000, dividend-page noise), `social security scotland...` (regex false positive) |
| EX-NEWS | 2 | 180 | gondal's Bolt-launches-in-Birmingham news page |
| EX-CIS | 1 | 0 | `accounting for plumber` (pool gsc) -> construction-cis's ground |

Deferred: none. (The pool's 26 sitemap rows are competitor page titles, not queries;
they are source-invalid for the universe and never entered it, per the
creative-performers precedent.)

Ledger balance: **assigned 45 + excluded 20 + deferred 0 = 65 = universe. BALANCES.**
(already-covered is legitimately zero: no query in the universe is one we currently
rank top-10 for; the 4 live GSC family queries and 6 Bing queries travel inside their
assigned pages' packs as do-not-lose entries.)

---

## 5. Equity grading of the seeds (§9.2 step 5; Bing graded first, conservative)

Google = GSC 90d (2026-05-27 to 2026-08-25); Bing = page stats summed per URL from the
stage0 snapshot.

| Seed | Bing clicks/imps | Google clicks/imps/pos | Verdict |
|---|---|---|---|
| accountant-for-uber-drivers | **13 / 532** | 0 / 104 / 7.3 | **EXTEND** (hard: Bing clicks >= 3 by 4x; the cluster's entire Bing equity lives here). Additive only; keep metaTitle/H1/H2 order; protect all 6 Bing queries + Google pos 7.3 |
| accountant-for-delivery-drivers-uk | 0 / 0 page-level | 0 / 113 / 11.4 | **EXTEND — manager override, recorded**: the deterministic table says REFRAME (Google imps 113 < 300, clicks 0, Bing page rows 0), but the Bing query `as a delivery driver can i claim capital allowance for van` took 1 click and this is the only page it can plausibly have landed on, and Google pos 11.4 on 113 imps is a near-page-1 surface. Bing-first-conservative means protecting it: additive only (creative-performers E-override precedent) |
| invoice-finance-for-haulage-and-transport | 0 / 0 | 0 / 0 / — | untouched: specialist tail, no topic assigned; N4 must differentiate (accountancy vs invoice-finance intent), never overlap |
| invoice-finance-for-security-firms | 0 / 0 | 0 / 0 / — | untouched, same rule vs N8 |
| invoice-finance-for-cleaning-companies | 0 / 0 | 0 / 0 / — | untouched, same rule vs N7 |

---

## 6. Proposed page plan (harvest-right-sized)

**10 target surfaces: 2 EXTEND + 8 net-new. Zero REFRAME.** Right-sizing vs C2:
row 64's "hub 12-15" shape is deliberately NOT built; the evidence supports a 3-page
taxi spine (N1 hub + N2 + N3), the market's own page groupings show 3-4 taxi pages per
specialist, and one-cohort discipline caps the batch anyway. Rows 79/88/89 get exactly
1 page each: coverage minimum under the coverage-over-selection lock, because their
measured buyer field is zero (79, 88) or near-zero (89); building 3-5 pages into a
zero field would be pages with no assigned demand (farming E4/E5 discipline).

| # | Surface | Niche row | Action | Assigned vol (peer-winnable) |
|---|---|---|---|---|
| E1 | accountant-for-uber-drivers | 64/65 | EXTEND additive: gig-status Q&A H2s + FAQ (`uber tax`, `are uber drivers self employed`, `is uber eats self employed`, `uber hmrc reporting`/platform-reporting); protect all 6 Bing queries | 1,280 (70) |
| E2 | accountant-for-delivery-drivers-uk | 65 | EXTEND additive (override): courier phrasings (`accountants for couriers`, `accounting for courier` GSC, `accountant for delivery driver uk` GSC) + van capital-allowance FAQ (protect the 1-click Bing query) | ~0 measured, field-backed |
| N1 | accountant for taxi & private-hire drivers (hub) | 64 | NET-NEW; heads at 4 domains; links N2/N3/E1 | 580 (330) |
| N2 | self-employed taxi driver: SA, expenses, MTD | 64 | NET-NEW; livingstones p7-10 across the set; expenses + `hmrc digital tax rules taxi drivers` folded in | 890 (770) |
| N3 | VAT on taxi fares & private hire | 64 | NET-NEW; carries the Uber/private-hire VAT position (house-position lock GT-4 required first) | 520 (0) |
| N4 | accountant for hauliers, haulage & transport companies | 66 | NET-NEW; `transport accountant(s)` + our GSC `transport accountants croydon` + `haulage accountant` protected; differentiate from invoice-finance seed | 270 (0) |
| N5 | HGV / lorry driver expenses & meal allowance | 66 | NET-NEW; gondal's page is the model; sleeper-cab/subsistence position lock GT-5 required | 100 (0) |
| N6 | accountant for driving instructors | 79 | NET-NEW single page; protect pool GSC query `driving instructor claim 45p per mile`; mileage 45p->55p and dual-control-car capital allowances angles | 0 measured (C2 head 60/mo) |
| N7 | accountant for cleaning businesses | 89 | NET-NEW single page; VAT-on-cleaning-products FAQ set (140) folded in as FAQ, never its own page | 140 (70) |
| N8 | accountant for security firms | 88 | NET-NEW single page; zero assigned kws, built on the coverage lock; SIA licence cost treatment (C1: licence bites the client, fine to describe) | 0 |
| — | taxi second-tier pages 4-12 of the C2 hub shape | 64 | NOT built: no consensus topic left unassigned; a planned page with no assigned demand does not get written | — |

Frozen-ground check (R.5 / §5.1 step 4): none of the 5 seeds appears in an armed
`monitored_pages` window on the registers on file; verify against the live table at pack
derivation before any edit (standing rule regardless).

Cannibalisation notes: E1 vs N1/N2 (uber vs taxi) is the intra-cluster risk; resolved by
assignment (gig-platform status Q&A stays on E1; taxi-trade SA/expenses/VAT on N1-N3).
N4/N7/N8 vs their invoice-finance siblings: accountancy intent vs finance-product
intent, the differentiation is the instruction, zero redirects (never-collapse rule).

---

## 7. Audience, voice (§9.8 item 5)

Self-employed sole-trader drivers and instructors (taxi/PHV, courier, HGV owner-driver,
ADI) plus small ltd-co operators (haulage, cleaning, security). Reading level plain;
these are the least tax-literate audiences on the site: consumer-plain register, direct
address, worked figures in pounds, per generalist's parity voice and `VOICE_STANDARD.md`
(the farming language finding applies: put the reader in the sentence, not the relief).
Formal language pass (§9.11) to `_language_spec.md` still to run at pack derivation on
the harvested domains' top pages.

---

## 8. Ground truth: house positions needed BEFORE writing (§9.8 item 6)

C1 all six rows CLEAR (C1_REGULATORY.md rows 64/65/66/79/88/89), so these are wording
locks, not regulatory fences. `docs/generalist/house_positions.md` already carries AMAP
(45p 2025/26 -> **55p/25p from 6 Apr 2026**), MTD ITSA (£50k 2026 / £30k 2027 / £20k
2028), VAT £90k/£88k and §12 mileage: cite, do not re-derive. It carries **zero**
positions on the following; lock before any pack is written:

1. **GT-1 gig-platform reporting** (E1/E2): OECD model rules / UK digital-platform
   reporting regs (first reports Jan 2025), what Uber/Deliveroo/Amazon Flex report to
   HMRC, side-hustle £1,000 trading allowance interaction, and the wording fence that
   platform reporting is NOT a new tax.
2. **GT-2 employment status for gig drivers** (E1/E2): Uber BV v Aslam worker status is
   employment law, NOT tax status; drivers remain self-employed for SA. This distinction
   is the number-one factual trap in the cluster; write the fence into the position.
3. **GT-3 taxi/PHV licence-renewal HMRC tax check** (N1/N2): the conditionality check
   (FA 2021 Sch 33), who it applies to, what "tax check code" means.
4. **GT-4 VAT on taxi fares / private hire** (N3): agent vs principal, the Uber/Sefton
   litigation state and current HMRC position, when a driver/operator must register.
   Needs primary-source verification at authoring; do NOT write N3 without it.
5. **GT-5 HGV driver subsistence** (N5): approved overnight/sleeper-cab allowance rates,
   meal allowances, employed vs owner-driver split; O-licence cost treatment (describe
   only; the licence bites the client).
6. **GT-6 driving instructor specifics** (N6): dual-control car capital allowances vs
   AMAP choice (55p from 2026/27), franchise fee deductibility, DVSA ADI/PDI fees.
7. **GT-7 vehicle-cost method choice** (all driver pages): AMAP simplified mileage vs
   actual costs + capital allowances, the once-chosen-stick rule per vehicle, and the
   van capital-allowance answer that already earns a Bing click on E2.
8. **GT-8 cleaning/security basics** (N7/N8): can largely cite existing sole-trader/
   VAT/employer-NIC positions (confirm at pack time); one new item each: TUPE/staff-cost
   framing for cleaning contracts (describe only) and SIA licence fee deductibility.

---

## 9. Delta list — DELTA_trades_transport_2026-08-25

Dossier is FROZEN. Everything found after this point lands here, not in the batch.

| # | Item | Reason parked |
|---|---|---|
| D1 | Ads `search_volume` call for 31 heads (driving instructor / cleaning / security / courier / MTD-for-taxi heads) | blocked by the $5 daily DATAFORSEO_ABORT_AT gate on 2026-08-25; ~$0.12; run on a fresh budget day if head sizing is challenged |
| D2 | "Start a chauffeur business" angle (chauffeur set excluded EX-CAREER, 1,060/mo family) | livingstones' traffic model; conflicts with A* lead-intent bar; owner call if revisited |
| D3 | Free expansions (autocomplete/PAA) never run for this family | run at pack derivation if head coverage looks thin |
| D4 | Persist raw harvest into `dataforseo_competitor_data` | §9.2 step 1 persistence not done; raw JSON preserved beside this file |
| D5 | accotax/cruseburke/sbx (cleaning specialists) never harvested | field noted from free SERP; harvest only if N7 is ever scaled past one page |
| D6 | `uber tax calculator` style tool demand | no calculator evidence harvested; any fleet decision needs R1/R2/R3 evidence, never a round number |

---

## 10. Open questions for the owner (batched; Q1 blocks pack derivation)

1. House positions GT-1 to GT-7 must be authored and locked before writing (GT-4, the
   private-hire VAT position, is the one needing real primary-source work). Approve
   authoring as the first Stage 3 task for this cluster?
2. Rows 79/88/89 get 1 page each instead of C2's 3-5 shape (zero/near-zero measured
   field; coverage minimum honoured). Confirm the right-size down is acceptable.
3. Row 64 gets a 3-page taxi spine instead of the C2 "hub 12-15" shape, on the same
   evidence basis. Confirm.
