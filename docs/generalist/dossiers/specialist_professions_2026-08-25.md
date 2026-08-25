# Cluster dossier: specialist professions family — generalist (Holloway Davies)

Date 2026-08-25. Track 2 Stage 3 prep, merge-expansion program (R.5, decisions 13/14/15).
Structured per `REWRITE_PROGRAM.md` §9.2/§9.7/§9.8. **FROZEN on write; late finds go to
the delta list in §9 below (named: DELTA_specialist_professions_2026-08-25).**

Cluster = 7 niche rows from the amended
`expansion_research/nichemap_2026-08-25/C2_PLACEMENT.md` §10:
row 50 architects (surveyor slice excluded, property's ground GT 166),
row 63 footballers / sports professionals (C1 CONDITIONAL, content coverage only),
row 67 pilots / aviation (C1 CONDITIONAL, no rebate service framing),
row 83 virtual assistants, row 84 neurodivergent business owners (C1 CONDITIONAL),
row 85 energy & renewables (FLAGGED 3-way split; only the energy-company/developer
slice is generalist's), row 87 maritime / seafarers SED (C1 clear, must not become
rebate-shaped).

DataForSEO spend this dossier: **$0.2086** (ranked_keywords, 6 domains, uncapped,
paginated to exhaustion). Balance before: $50.51. **Four further planned harvests
(footballaccountant.com, yourtaxhelp.co.uk, balloonaccounting.co.uk, arleys.co.uk) were
refused by the `DATAFORSEO_ABORT_AT` $5/day gate (today's estate running total $4.99
before them); the gate was respected, not overridden.** Recorded as delta D1.

---

## 1. Scope declaration (§9.8 item 1)

**Term family (regex, recorded):** architect | pilot|aviation|flight crew|aircrew|
airline|cabin crew | seafar|\bsed\b|yacht|maritim|marine|superyacht|merchant navy|\bship|
offshore | renewab|solar|wind farm|\benergy\b|hydro|biomass|ev charg | virtual assistant |
neurodiver|\badhd\b|autis|dyslex | football|sports professional/star/agent/accountant|
athlete|image rights | surveyor (kept in the net to catch the property-boundary rows) —
with recorded false-positive screens for: drop-shipping ("ship"), "transport
accountant(s)" ("sport accountant" substring), Shipley place/brand names, offshore
banking, and competitor brand navigation.

**Our pages in scope (1 in-cluster seed + 1 conflict-check-only):** in
`generalist/web/content/blog/`: `accountant-for-architects-uk.md` (the only seed any of
the 7 rows has); plus `accountant-for-software-engineers.md` (row 51 engineers, host =
contractors-ir35 per C2, conflict-check only, untouched). Slug/title grep across the
generalist corpus for architect/pilot/seafarer/maritime/renewab/solar/virtual-assistant/
neurodiver/footballer found nothing else
(`invoice-finance-for-haulage-and-transport.md` is a "transport" false positive).

**Competitor domains harvested (6, uncapped, paginated to exhaustion, 2026-08-25):**
identified via free DDG SERP sweep over 13 heads (sweep JSON was a scratchpad
intermediate, deleted per house rule; head list recorded here: accountant for
architects, architects accountants uk, seafarers earnings deduction accountant,
accountant for seafarers uk, pilot accountant uk, accountants for airline pilots,
footballer accountant, accountants for footballers uk, accountant for virtual
assistants uk, renewable energy accountants uk, accountants for energy companies uk,
adhd accountant business owner uk, neurodivergent accountant uk).

| Domain | Niche probed | Ranked rows (total) | Family rows |
|---|---|---|---|
| marineaccounts.com | maritime/SED specialist | 351 | 146 |
| seafarerstaxreturns.com | SED specialist | 4 | 0 |
| kyzensports.co.uk | sports specialist ("UK's largest sports accountants") | 10 | 6 |
| bothamaccounting.co.uk | renewables specialist | 300 | 1 |
| macleodaccounting.co.uk | ADHD/neurodivergent specialist | 62 | 0 |
| smithbutler.co.uk | general firm with architects sector page | 411 | 4 |

**Specialist-field verdicts per sub-niche (the "no field = record it" rule):**

- **Maritime:** a real specialist field exists (marineaccounts.com, seafarerstaxreturns,
  seadays.co.uk, yourtaxhelp.co.uk, sed.marineaccounts.com). Only marineaccounts has a
  measurable keyword footprint, and 80%+ of it is career/salary content, not accountancy.
- **Architects:** NO pure specialist. The SERP is general firms with a sector page
  (Menzies, Sidaways, A4G, Smith Butler, Lanop, Gorilla, ICS, Jameco). Smith Butler's
  entire architect footprint is 2 software keywords.
- **Footballers:** field exists (Kyzen Sports, footballaccountant.com, Excel Accountancy,
  SRLV, Accotax pages). Kyzen's measurable footprint is 6 keywords. SRLV's ranked set
  (reused free from `creative_performers_2026-08-25_ranked_raw.json`) contains ZERO
  sports-family keywords: the field converts on reputation, not search.
- **Pilots:** NO specialist field found. SERP for "pilot accountant uk" is dominated by
  irrelevant results (a firm called "Co-Pilot", software reviews, job boards); only
  arleys.co.uk and a gorillaaccounting.com page target pilots. Neither harvested (abort
  gate, D1). Recorded: keyword-data-only, near-zero measurable demand (C3: 10/mo).
- **Virtual assistants:** NO accountant-for-VAs field exists AT ALL. The SERP is VA
  service providers and outsourced-bookkeeping-as-a-VA content. Recorded, no spend.
- **Neurodivergent:** a young brand field exists (Macleod, Balloon, Heywood Macdonald,
  AuDHD Accountant, Watmore) but the harvested specialist ranks for ZERO family keywords
  with volume. Demand is real enough to sustain five boutique brands but invisible in
  keyword data. Recorded.
- **Energy (generalist slice):** heads are owned by nationals (Azets, BDO, UHY,
  Armstrong Watson, Menzies) — screened as SERP-owned-by-national-brand per §9.2 step 3.
  The one small specialist (Botham) has a single family keyword, and it belongs to the
  property/solar slice.

**Query universe (union of named sources, §9.7):**

| Source | Pull date | Family rows | Unique contribution |
|---|---|---|---|
| Competitor ranked_keywords, 6 domains, uncapped | 2026-08-25 | 158 distinct kws | 158 |
| Our GSC 90d (window 2026-05-27 to 2026-08-25, 2,182 query rows swept) | 2026-08-25 | 3 true-family (+3 false positives screened: drop-shipping, offshore-banking, transport) | 3 |
| Our Bing 91d query stats | 2026-08-25 | 1 true-family (`ev chargers capital allowances`, 1 click) (+1 ecommerce false positive screened) | 1 |
| Discovery pool `discovery_candidates` lane specialist_professions | 2026-08-25 | 3 rows; 2 are sitemap noise (competitor page titles, not queries), 1 gsc row duplicates our GSC | 0 |
| srlv.co.uk ranked set, reused from the creative dossier raw JSON (free) | 2026-08-25 | 0 sports-family rows | 0 |

**Universe = 162 keywords.** Full row-level record:
`specialist_professions_2026-08-25_ledger.csv` (same directory). Raw paid harvest
preserved: `specialist_professions_2026-08-25_ranked_raw.json`.

**Known artefacts, stated:** the discovery pool lane is thin (3 rows) because the 15
general competitors in `sites/generalist.discovery.json` do not specialise here — a
sampling artefact, not low demand; this dossier's specialist harvest is the corrective.
Free expansions (autocomplete/PAA) NOT run: stated limitation. Four intended competitor
harvests blocked by the daily abort gate (D1): the pilots, footballers, ND and
second-SED fields are therefore keyword-data-thin by instrument, and their zeros below
are stated with that caveat where it matters.

---

## 2. Consensus topic map (§9.8 item 2)

Competitor URL nodes with 3+ family keywords, merged across domains at 30% overlap of
the smaller set. The whole harvest produces only a handful of true accountancy nodes;
the dominant structure is marineaccounts' career fleet, screened in §4.

| Topic | Domains | Kws | Raw vol/mo | Peer-winnable (top-10 held by a specialist) | Note |
|---|---|---|---|---|---|
| Seafarers Earnings Deduction (tax) | 1 (marineaccounts; seafarerstaxreturns/yourtaxhelp/seadays rank on the head per SERP but have no measurable footprint) | 17 | ~1,300 | ~1,090 | marineaccounts holds p3-8 on the whole SED set: `seafarers earnings deduction` 260 p4, `seafarer tax` 170 p5, `seafarers tax calculator uk` 50 p3. It runs ONE SED page + ONE days-calculator |
| Footballer tax Q&A | 2 | 3 | 370 | 370 | kyzensports blog `do-footballers-pay-tax` p16-28; pure question intent |
| Sports accountant heads | 2 | 3 | 150 | 150 | kyzensports homepage p8, smithbutler blog p14 |
| Architect accounting software | 1 | 2 | 100 | 100 | smithbutler blog p17-18; sub-topic, not a page for us |
| Accountant for architects (heads) | 0 measurable | 3 (our GSC only) | ~40 (C3) | n/a | 8 general firms run a sector page but NONE ranks for a measurable architect keyword; our seed already earns the long-tail impressions |
| Pilots, VAs, neurodivergent, energy-company slice | 0 | 0 | 0 measurable | 0 | no consensus node exists in any harvested or SERP-visible field |

Single-domain idiosyncrasy screened (§4): marineaccounts' career/qualification fleet
(~115 kws, ~13,000/mo family-wide: yacht crew salaries, how-to-become, VHF licences,
medicals, discharge books). Same pattern as greenandpeter in the creative dossier.

---

## 3. Assignment table, unique (§9.8 item 3)

One topic -> one page. Estate boundaries respected: surveyor queries -> property;
solar/EV installer and landlord slices -> construction-cis/property (row 85 3-way
split); engineers seed (row 51) untouched.

| Topic (ledger code) | Kws | Vol | Peer-winnable | Page | Grade |
|---|---|---|---|---|---|
| P-SED maritime/SED | 17 | ~1,300 | ~1,090 | net-new N1 (SED pillar) + net-new N2 (accountant for seafarers and yacht crew service/coverage page); `seafarers tax calculator uk` noted as tool evidence T1, owner-gated | NET-NEW x2 |
| P-FOOT tax-question set | 3 | 370 | 370 | net-new N3 "Do footballers pay tax / how much tax do footballers pay" Q&A | NET-NEW |
| P-FOOT sports accountant heads | 3 | 150 | 150 | net-new N4 "accountant for footballers and sports professionals" coverage page | NET-NEW |
| P-ARC architects | 5 (2 software + 3 our GSC long-tail) | ~140 | 100 | `accountant-for-architects-uk` — reframe takes the software pair as an H2 section (never a page per keyword) and protects the 3 GSC queries | REFRAME |
| Pilots (row 67) | 0 assigned | 0 | 0 | net-new N5, single coverage page, keyword-data-only, C1-fenced | NET-NEW (coverage) |
| Virtual assistants (row 83) | 0 assigned | 0 | 0 | net-new N6, single coverage page | NET-NEW (coverage) |
| Neurodivergent owners (row 84) | 0 assigned | 0 | 0 | net-new N7, single coverage page, C1-fenced | NET-NEW (coverage) |
| Energy-company slice (row 85) | 0 assigned | 0 | 0 | net-new N8, single coverage page ("accountants for renewable energy companies and developers") | NET-NEW (coverage) |

Coverage-strategy note: N5-N8 carry zero assigned keywords. Under §6.3's strategic
correction (coverage over selection, volume is NOT a gate) they are still built, but at
the minimum shape: one page each, no clusters, no hubs. The C2 Shape column's larger
priors (row 85 "hub 12-15", row 87 "hub 12-15", rows 63/84 "cluster 3-5") are sizing
priors from raw C3 volume; the harvest shows that volume sits in deferred slices
(solar -> property) or career content (yacht salaries), so the dossier right-sizes down.
Evidence, not the prior, sizes the build (farming E4/E5 discipline).

---

## 4. Screen: exclusions with reason codes and volumes (§9.2 step 3)

Nothing dropped silently; every row is in the ledger CSV. Summary:

| Reason code | Kws | Vol/mo | What it is |
|---|---|---|---|
| EX-CAREER | ~100 | ~12,000 | marineaccounts' earnings/how-to-become/jobs fleet (cruise ship captain salary 880 x10 variants, yacht crew salaries, deckhand/stewardess/bosun content). Same model as greenandpeter; excluded under the A* lead-intent bar |
| EX-OFFNICHE licensing/medical/definition | ~25 | ~2,300 | VHF radio licences, ENG1/ML5 medicals, yachtmaster qualifications, discharge books, "what makes a boat a yacht" |
| EX-BRAND | 6 | ~800 | marine accounts / kyzen / shipleys navigation |
| EX-OFFNICHE offshore/mortgage | 4 | ~200 | offshore banking/OIG certificates, seafarer mortgages |
| EX-REBATE | 0 | 0 | the C1 rebate fence (rows 67/87) was applied to every row; **zero harvested queries are rebate-intent** ("rebate", "refund", "claim back", "tax back" all absent). The fence bound the screen but caught nothing, which is itself evidence the SED field is not rebate-shaped at the query level |

Deferred (real demand, other hosts, named):

| Deferred to | Kws | Vol/mo |
|---|---|---|
| Property (row 85 landlord/homeowner solar slice): `hmrc solar panels` 1,900 (botham's only family row; new-homes solar rules, homeowner intent) | 1 | 1,900 |

Already-covered: `ev chargers capital allowances` (Bing, 1 click) lands on generalist's
core capital-allowances page; business-CA slice is generalist core and protected there;
landlord-EV slice is property's ground.

Ledger balance: **assigned 27 + already-covered 1 + excluded 133 + deferred 1 = 162 =
universe. BALANCES.**

---

## 5. Equity grading of seeds (§9.2 step 5; Bing graded first, conservative)

Google = GSC 90d (2026-05-27 to 2026-08-25); Bing = 91d page stats.

| Seed | Bing clicks/imps | Google clicks/imps/pos | Verdict |
|---|---|---|---|
| accountant-for-architects-uk | 0 / 0 | 0 / 12 / 24.2 | **REFRAME** (under every threshold on both engines) |

That is the whole seed table: 6 of the 7 rows have no page anywhere on the estate.
Protected equity travelling in the R1 pack: GSC queries `accountant for architects
wimbledon` (7 imps), `accountants for architects and surveyors` (2), `architects
accountant hammersmith` (2).

Non-cluster note: `accountant-for-software-engineers.md` (row 51, contractors-ir35's
ground) checked for conflict only; no architect/professional-practice overlap found;
untouched.

---

## 6. Proposed page plan (harvest-right-sized)

9 target surfaces: 1 REFRAME + 8 net-new, plus one evidence-backed tool candidate.

| # | Surface | Action | Assigned vol (peer-winnable) |
|---|---|---|---|
| R1 | accountant-for-architects-uk | REFRAME; fold in the accounting-software-for-architects H2 (100/mo); protect 3 GSC queries; surveyor mentions limited to a signpost (property's ground) | ~140 (100) |
| N1 | SED pillar: "Seafarers Earnings Deduction: how it works" | NET-NEW; takes the whole SED query set (`seafarers earnings deduction` 260 + tax/deduction/allowance/exemption variants); informational, self-assessment framing, NEVER rebate-shaped (C1) | ~1,100 (~1,000) |
| N2 | "Accountant for seafarers and yacht crew" | NET-NEW coverage/service page; takes `marine accounting` 30, `ship tax` 110 (tonnage-tax mention), `uk seafarers` variants | ~280 (~90) |
| T1 | SED qualifying-days calculator | CANDIDATE ONLY, owner-gated: evidence = `seafarers tax calculator uk` 50/mo, marineaccounts holds p3 with a days calculator. Meets the R1/R2/R3 evidence bar; not a round-number invention | 50 |
| N3 | "Do footballers pay tax? How footballer tax works" Q&A | NET-NEW; 370/mo question set, peer p16-28 = winnable; C1 fence: no scheme content, image rights described factually only | 370 (370) |
| N4 | "Accountant for footballers and sports professionals" | NET-NEW coverage page; `sports accountant(s)` heads 150/mo at 2 domains; content coverage only, C2's own note: a faceless form cannot convert this buyer, so expectation is visibility, not leads | 150 (150) |
| N5 | "Accountant for pilots and flight crew" | NET-NEW coverage, single page; zero keyword data (stated); C1 fence: informational + contractor/self-employed pilot accountancy, NO rebate service, no contingent fee, flight-crew expense claims described not sold | 0 |
| N6 | "Accountant for virtual assistants" | NET-NEW coverage, single page; no field exists, keyword-data-only limitation stated | 0 |
| N7 | "Accounting support for neurodivergent business owners" | NET-NEW coverage, single page; C1 fence: business-tax content only, no diagnostic or medical framing, no benefits-claim content or referral, accessibility-first tone | 0 |
| N8 | "Accountants for renewable energy companies and developers" | NET-NEW coverage, single page; ONLY the company/developer slice (row 85 3-way split); no installer content (construction-cis), no landlord solar/EV content (property), no energy-broking/TPI anything (§6.1 lock) | 0 |

NOT built, with reasons: maritime hub 12-15 (assigned demand routes to 2 pages + 1
tool; the other 12,000/mo is career content excluded under the A* bar); pilots/VA/ND/
energy clusters (zero assigned keywords each; coverage minimum only); a page for
architect software (folded into R1); anything for surveyors (property's ground).

Frozen-ground check (R.5 / §5.1 step 4): the single seed is not in an armed
`monitored_pages` window on the registers on file; verify against the live table at
pack derivation (standing rule).

Cannibalisation notes: N1 vs N2 is the only intra-cluster overlap risk; resolved by
assignment (N1 = the deduction mechanics, N2 = the service/audience page). Estate-wide:
construction-cis and property carry solar/EV/CIS content; N8's fence (no installer, no
landlord) is the differentiation instruction and trap-12 discipline (never change
Property, even indirectly) applies.

---

## 7. Audience, voice (§9.8 item 5)

Individually-employed or self-employed professionals (seafarers, crew, pilots, players)
and small specialist companies (architect practices, VAs, renewables developers). All
consumer-plain per generalist parity voice and `VOICE_STANDARD.md`; the farming finding
(reader in the sentence, not the relief) applies. N7 additionally needs the C1 tone
rule: vulnerability makes tone bite harder than law; short sentences, concrete steps,
zero medical language. Formal language pass (§9.11) still to run at pack derivation on
marineaccounts' SED page + the SERP-visible SED specialists.

---

## 8. Ground truth: house positions needed BEFORE writing (§9.8 item 6)

C1 status: rows 50/83/87 CLEAR, rows 63/67/84 CONDITIONAL (fences above), row 85
CONDITIONAL (no energy-broking/TPI monetisation, §6.1 lock).
`docs/generalist/house_positions.md` carries none of this cluster's specialist facts.
Lock these first; DO NOT author in this session:

1. **SED qualifying rules, current** (N1/N2/T1): eligible period 365 days, half-day
   rule, foreign port requirement, "ship" definition (offshore installations excluded),
   employment vs self-employment aboard, claim via self-assessment, HS205 latest year,
   interaction with residence/split year. Also mariners' NIC rules as a separate block.
2. **Tonnage tax scope fence** (N2): "ship tax" queries get a factual paragraph and a
   boundary; operator-level tonnage tax advisory is not this page's job.
3. **Architects professional-practice structures** (R1): LLP vs ltd for practices, ARB
   registration cost treatment, PII deductibility, R&D relief position for architecture
   (competitors sell it; our position must be conservative and current post-merged
   scheme).
4. **Image rights and agents' fees fence** (N3/N4): image-rights company treatment,
   dual-representation agent fees and P11D, and the hard line: no scheme promotion
   (DOTAS/POTAS/enablers history named in C1), no investment or pension advice.
5. **Flight-crew expenses position** (N5): FRE flat-rate expense for uniformed flight
   deck/cabin crew, what is claimable through self-assessment, and the repayment-agent
   fence (Income Tax (Repayment Agents) Regs 2023): we describe, we never process.
6. **Renewables capital allowances boundary** (N8 + existing core pages): FYA/full
   expensing on plant for energy companies vs the property site's landlord solar/EV
   ground (Bing already gives us a click on `ev chargers capital allowances` at the
   core CA page; the boundary must be written so N8 never competes with it or with
   property).
7. **Neurodivergent tone/fence spec** (N7): what may be said (business systems,
   deadlines, MTD, reasonable-adjustment signposting to gov.uk) and what may never be
   said (diagnosis, treatment, benefit eligibility, Access to Work claims help).

---

## 9. Delta list — DELTA_specialist_professions_2026-08-25

Dossier is FROZEN. Everything found after this point lands here, not in the batch.

| # | Item | Reason parked |
|---|---|---|
| D1 | Harvest footballaccountant.com, yourtaxhelp.co.uk, balloonaccounting.co.uk, arleys.co.uk (~$0.10 total) | blocked by DATAFORSEO_ABORT_AT $5/day (today's total $4.99 from other sessions); run on a fresh day before pack derivation if the owner wants the thin fields corroborated |
| D2 | Free expansions (autocomplete/PAA) never run for this family | stated §1 limitation; run at pack derivation, especially for SED question phrasings |
| D3 | marineaccounts career fleet (~12,000/mo excluded) | same owner call as creative D2: traffic-model content vs A* lead-intent bar |
| D4 | Persist raw harvest into `dataforseo_competitor_data` table | §9.2 step 1 persistence not done; raw JSON preserved beside this file |
| D5 | T1 SED days calculator | owner-gated tool decision; evidence recorded in §6 |
| D6 | `hmrc solar panels` 1,900/mo deferred to property | flag to the property program at its next pass; homeowner/new-build solar rules intent |

---

## 10. Open questions for the owner (batched; Q1 blocks pack derivation, the rest do not)

1. House positions (§8 items 1-7) must be authored and locked before any writing.
   Approve authoring as the first Stage 3 task for this cluster?
2. Four sub-niches (pilots, VAs, neurodivergent, energy-company) have zero measurable
   demand and get one coverage page each under the coverage-over-selection lock.
   Confirm one page each is the right minimum, or say if any should wait.
3. SED days calculator (T1): a specialist holds p3 with one and the query exists
   (50/mo). Build it alongside N1, or park it?
4. Footballers (N3/N4): C2 says a faceless form cannot convert this buyer, so these
   pages are visibility-only. Confirm you are happy shipping pages with no lead
   expectation attached.
