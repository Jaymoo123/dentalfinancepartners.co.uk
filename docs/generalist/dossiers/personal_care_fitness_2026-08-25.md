# Cluster dossier: personal care & fitness family — generalist (Holloway Davies)

Date 2026-08-25. Track 2 Stage 3 prep, merge-expansion program (R.5, decisions 13/14/15).
Structured per `REWRITE_PROGRAM.md` §9.2/§9.7/§9.8. **FROZEN on write; late finds go to
the delta list in §9 below (named: DELTA_personal_care_fitness_2026-08-25).**

Cluster = 2 niche-map rows, both ABSORB -> generalist
(`expansion_research/nichemap_2026-08-25/C2_PLACEMENT.md`):
row 60 hairdressers / barbers / beauty (~40/mo head, C1 CLEAR, "chair-rental status is
generalist SA work"), row 61 gyms / fitness / personal trainers (~30/mo head, C1 CLEAR /
unregulated; C2 carries a CAUTION flag on row 61's contamination column, noted, no copy
fence required by C1).

DataForSEO spend this dossier: **$0.094** (ranked_keywords, 5 domains, uncapped with
pagination). Balance before: $50.51. **Harvest of 5 further domains was blocked by the
$5.00 daily estate budget gate** (`DATAFORSEO_ABORT_AT`): concurrent estate sessions had
today's running total at $4.97 before this dossier's second batch. The gate is the
compliance control and was respected, not raised. See §9 D1.

---

## 1. Scope declaration (§9.8 item 1)

**Term family (regex, recorded):** hairdress|barber|beauty|beautician|salon|stylist|
chair rent|rent(ing)? a chair|nail|lash|aesthetic|spa|massage|gym|fitness|
personal.train|crossfit|pilates|yoga|physio|therapist — with a recorded false-positive
screen: "therapist"/"massage"/"physio" alone can be medical/care-sector queries (row 63
family), and "beauty" appears in consumer product queries; each hit was intent-checked.

**Our pages in scope (3):** all in `generalist/web/content/blog/`
(sole-trader-and-self-employment category, all dated 2026-05-17):
`accountant-for-hairdressers-uk.md` (3,078 words, already carries a Chair Rental H2),
`accountant-for-beauty-therapists.md` (3,073 words),
`accountant-for-personal-trainers.md` (2,471 words).
Body-frequency sweep of the other 415 generalist posts: no further page carries the
family at density (next highest = 2 mentions; `p11d-benefits-in-kind-explained.md`
mentions gym membership twice — conflict-check page for N2, not in-cluster).

**Competitor domains (paid harvest 2026-08-25, uncapped, paginated):** identified via
free SERP sweep over "accountant for hairdressers", "salon accountant",
"accountant for personal trainers", "gym accountants / fitness accountants".

| Domain | Type | Ranked rows (total) | Family rows |
|---|---|---|---|
| salonexpertaccountants.co.uk | pure salon specialist | 9 | 8 (all software-intent) |
| pinkbutterflyaccounting.co.uk | pure salon specialist | 3 | 0 |
| berryaccounts.co.uk | pure hairdresser/barber specialist | 5 | 0 |
| fitnessindustryaccountants.com | pure fitness specialist | 0 | 0 |
| account-ease.co.uk | multi-niche with dedicated PT + gym pages | 267 | 0 |
| pulse-accountants.co.uk | REUSED from creative dossier raw (no new spend) | 785 | 10 (gym membership tax) |
| alto-accounting.com | REUSED from creative dossier raw (no new spend) | 1,175 | 1 (chair rental) |
| rsbc.uk | REUSED; has a fitness-and-wellbeing division | 901 | 0 |

**The headline finding of this harvest: the specialist field exists as brands but holds
almost no organic equity.** Four pure specialists rank for 17 keywords between them,
none for "accountant for hairdressers/personal trainers" heads. The niche's real ranked
demand is two topics owned by multi-niche firms: gym-membership tax (pulse) and
rent-a-chair tax (alto). This is evidence of low harvested-market volume, and it is also
consistent with C2's estimate (rows 60/61 head volume 40 + 30/mo). Recorded per the
"no specialist field = record it, do not spend hunting" instruction: the fitness side
has NO ranking specialist at all.

**Query universe (union of named sources, §9.7):**

| Source | Pull date | Family rows | Unique contribution |
|---|---|---|---|
| Competitor ranked_keywords, 5 new domains uncapped | 2026-08-25 | 8 | 8 |
| Reused creative-dossier raw (pulse, alto, rsbc; uncapped 2026-08-25) | 2026-08-25 | 11 | 11 |
| Our GSC 90d (window 2026-05-27 to 2026-08-25, stage0 fresh pull) | 2026-08-25 | 5 | 5 |
| Our Bing snapshot (stage0, 1,202 queries / 665 page rows) | 2026-08-25 | **0** | 0 |
| Discovery pool `discovery_candidates` lane personal_care_fitness (23 rows: 5 dfs_ranked, 1 gsc, 17 sitemap) | 2026-08-25 | 6 non-sitemap | 0 (all duplicate pulse/GSC rows; sitemap rows are competitor page titles, not queries — used as topic evidence in §2) |

**Universe = 24 keywords.** Full row-level record:
`personal_care_fitness_2026-08-25_ledger.csv` (same directory). Raw paid harvest
preserved: `personal_care_fitness_2026-08-25_ranked_raw.json`.

**Stated limitations:** (a) five ranking multi-niche domains (fusionaccountants.co.uk,
mytaxdoc.co.uk, mccaccountants.co.uk, ross-brooke.co.uk, accotax.co.uk) were NOT
harvested — daily budget gate, §9 D1; their head-term keyword sets are unseen.
(b) No search_volume top-up call was made for head terms (same gate); head volumes cite
C2's corpus figures and harvest rows only. (c) Free expansions (autocomplete/PAA) not
run. (d) Bing zero is an absence-of-data observation on a rolling snapshot, not proof of
zero Bing demand.

---

## 2. Consensus topic map (§9.8 item 2)

With 24 keywords the URL-node merge is trivial; domain count is the confidence score and
nothing here reaches 2 domains on ranked data. Sitemap topic evidence (competitor page
titles from the discovery pool: "do hairdressers charge vat", "becoming a self employed
mobile hairdresser", "bookkeeping for self employed hairdressers and beauty salon
owners", "how to be a self employed personal trainer", "gym membership benefit in kind")
corroborates topics 2-4 without adding countable queries.

| Topic | Domains | Kws | Raw vol/mo | Peer-winnable (top-10 by a specialist/peer) | Note |
|---|---|---|---|---|---|
| Gym membership tax (BIK / salary sacrifice / "through the business") | 1 (pulse) + pool | 10 | 940 | 390 (pulse holds pos 3-10 on 5 of them) | pulse runs it as one blog page + one service page; the cluster's biggest real prize |
| Rent-a-chair tax for hairdressers | 1 (alto) + sitemap evidence | 1 | 170 | 0 (alto pos 16) | alto runs a dedicated page; the C2 signature topic; nobody in top-10 = whitespace |
| Accountant for hairdressers / beauty therapists heads | 0 ranked | 3 (ours, GSC) | ~40 (C2) | 0 | we already have both pages and both earn impressions; no specialist ranks |
| Accountant / accounting for personal trainers | 0 ranked | 2 (ours, GSC+pool) | ~30 (C2) | 0 | our page earns the cluster's only click; no specialist ranks |
| Salon accounting software | 1 (salonexpert) | 8 | 400 | 0 (best pos 21) | software-purchase intent, not accountancy demand — screened §4 |

---

## 3. Assignment table, unique (§9.8 item 3)

One topic -> one page. Estate unique-assignment: hospitality/medical hold no
hair/beauty/fitness pages (C2 rows 60/61 name generalist the sole host); the gym-BIK
topic overlaps generalist's own `p11d-benefits-in-kind-explained.md` (2 mentions), which
keeps generic BIK and links out — differentiation instruction recorded, never-collapse.

| Topic (ledger code) | Kws | Vol | Peer-winnable | Page | Grade |
|---|---|---|---|---|---|
| N2 gym membership tax | 10 | 940 | 390 | net-new Q&A page: "Is gym membership tax deductible?" (employer BIK + salary sacrifice/OpRA + sole trader wholly-and-exclusively + limited company) | NET-NEW |
| N1 chair rental | 1 | 170 | 0 | net-new: rent-a-chair tax, VAT and employment status (salon owner AND self-employed stylist, both sides) | NET-NEW |
| R1/R2 hair & beauty heads | 4 | ~40 | 0 | `accountant-for-hairdressers-uk` (R1) and `accountant-for-beauty-therapists` (R2) keep their heads; GSC queries protected per ledger | REFRAME (both) |
| E1 personal trainers | 2 | ~30 | 0 | `accountant-for-personal-trainers` | EXTEND |

Third §9.2-step-4 outcome (specialist tail): all three of our seeds match nothing the
market groups — the market barely groups this family at all. They are kept and
protected; the two net-new pages chase the only two topics with measured demand.

---

## 4. Screen: exclusions with reason codes and volumes (§9.2 step 3)

Nothing dropped silently; every row is in the ledger CSV.

| Reason code | Kws | Vol/mo | What it is |
|---|---|---|---|
| EX-SOFTWARE | 7 | 350 | "salon accounting software" family — software-purchase intent, salonexpert ranks 21-56 for its own product pages; not accountancy-service demand |
| EX-OFFNICHE | 1 | 50 | "list of services in beauty salon" — consumer navigation |

Deferred: none. No family keyword belongs to another cluster. (Sports massage /
physio-adjacent queries would defer to medical row 63; none surfaced.)

Ledger balance: **assigned 16 + already-covered 0 + excluded 8 + deferred 0 = 24 =
universe. BALANCES.** (already-covered legitimately zero: no seed has ranking coverage
strong enough to protect outside its assigned pack; the 5 live GSC queries travel inside
their pages' packs as do-not-lose entries.)

---

## 5. Equity grading of the 3 seeds (§9.2 step 5; Bing graded first, conservative)

Google = GSC 90d (2026-05-27 to 2026-08-25, stage0 pull); Bing = stage0 snapshot page
stats (665 page rows — zero rows for any of these three URLs).

| Seed | Bing clicks/imps | Google clicks/imps/pos | Verdict |
|---|---|---|---|
| accountant-for-hairdressers-uk | 0 / 0 | 0 / 22 / 7.8 | **REFRAME** (imps < 300, Bing 0). Note: pos 7.8 with the strongest structure of the three; the reframe should be conservative in practice — the page already owns the right outline including the Chair Rental H2 |
| accountant-for-beauty-therapists | 0 / 0 | 0 / 40 / 15.8 | **REFRAME** |
| accountant-for-personal-trainers | 0 / 0 | 1 / 52 / 12.0 | **EXTEND** (Google clicks >= 1). Additive only; keep metaTitle, H1, H2 order; protect `personal trainer accounting` |

---

## 6. Proposed page plan (harvest-right-sized; C2 sizing said cluster 3-5 per niche, evidence says less)

**5 target surfaces total: 3 seed verdicts + 2 net-new.** Row 60 gets 3 surfaces, row 61
gets 2. Building to C2's 3-5-per-niche shape is not supported by the harvest: outside the
two net-new topics there is no measured demand to assign, and a planned page with no
assigned demand does not get written (farming E4/E5 discipline; same call as the
creative dossier's musicians niche).

| # | Surface | Action | Assigned vol (peer-winnable) |
|---|---|---|---|
| R1 | accountant-for-hairdressers-uk | REFRAME on hairdresser/barber heads; protect GSC `accountant for salons sutton`; keep and link the chair-rental section to N1 once built (summary stays, depth moves is NOT allowed — never delete depth; N1 differentiates by covering both sides + status) | ~40 head |
| R2 | accountant-for-beauty-therapists | REFRAME; protect 3 GSC queries incl. `how to calculate vat for a beauty therapist business` (VAT H2 already exists, sharpen against it) | inside R1's head family |
| E1 | accountant-for-personal-trainers | EXTEND, additive only; candidate new H2s: employed-at-gym vs freelance-licence PT status, gym rent/licence fees as expenses | ~30 head |
| N1 | net-new: rent-a-chair in a salon — tax, VAT and employment status | NET-NEW (alto precedent, pos 16 = beatable; nobody in top-10; C2 signature topic) | 170 raw, 0 currently peer-held |
| N2 | net-new: is gym membership tax deductible? (employee BIK, salary sacrifice, sole trader, limited company) | NET-NEW (pulse treats it as a page and holds 5 top-10 slots); differentiate from `p11d-benefits-in-kind-explained` (generic BIK stays there, gym specifics here, cross-link) | 940 raw, 390 peer-winnable |

Frozen-ground check (R.5 / §5.1 step 4): none of the 3 seeds appears in an armed
`monitored_pages` window on the registers on file; verify against the live table at pack
derivation before any edit (standing rule regardless).

Cannibalisation (C2 amendment note 5): no stray pages for these niches on other sites.
Intra-cluster: R1 vs R2 (hairdresser vs beauty-therapist heads) already differentiated by
audience; N2 vs p11d page resolved by the assignment note above.

---

## 7. Audience, voice (§9.8 item 5)

Self-employed sole traders and micro-employers: chair-renting stylists and salon owners
(both sides of the same transaction — N1 must address both), mobile beauty therapists,
freelance PTs and small studio owners. NOT gym chains, NOT aesthetics clinics doing
medical procedures (row 63 adjacency). Register per generalist parity voice and
`VOICE_STANDARD.md`: consumer-plain, direct address, worked figures. Formal language
pass (§9.11) to `_language_spec.md` still to run at pack derivation — note the winner
set is tiny (pulse's gym page, alto's chair page, plus head-term SERP leaders once the
D1 harvest completes).

---

## 8. Ground truth: house positions needed BEFORE writing (§9.8 item 6)

C1 rows 60/61: **CLEAR** (row 60: local licensing bites the client; chair rental is an
employment-status tax question. Row 61: unregulated). `docs/generalist/house_positions.md`
carries **zero** hair/beauty/fitness positions. GT 0: lock these before any pack is
written (do not author in this session):

1. **Chair/room rental position** for N1/R1: VAT treatment of rent-a-chair (standard-
   rated since the 2012 change, not exempt land letting), the salon owner's income
   treatment, and the stylist's self-employed status tests (control/substitution,
   HMRC's hairdressing sector guidance); NICs for self-employed stylists (Class 2/4
   post-2024 reform).
2. **Salon VAT registration threshold planning fence**: legitimate threshold planning
   vs artificial disaggregation (splitting salon/stylists into separate entities);
   write the fence so pages describe, never scheme. C1 is CLEAR but this is the one
   avoidance-adjacent area in the cluster.
3. **Gym membership / fitness cost position** for N2/E1: employer-provided membership
   as BIK, salary sacrifice under OpRA rules, on-site gym exemption, sole trader
   wholly-and-exclusively (personal fitness generally disallowed, narrow exceptions),
   limited company treatment.
4. **PT status position** for E1: employed instructor vs freelance PT paying a gym
   licence/rent fee, mixed employment + self-employment in the same tax year, IR35
   only where a PSC exists.
5. **Beauty/hairdresser basics** (tips and tronc treatment, product resale, MTD ITSA
   phasing) can cite existing sole-trader positions; confirm coverage at pack time,
   no new lock expected beyond items 1-2.

---

## 9. Delta list — DELTA_personal_care_fitness_2026-08-25

Dossier is FROZEN. Everything found after this point lands here, not in the batch.

| # | Item | Reason parked |
|---|---|---|
| D1 | Harvest fusionaccountants.co.uk, mytaxdoc.co.uk, mccaccountants.co.uk, ross-brooke.co.uk, accotax.co.uk (the domains that actually rank for the head terms) | blocked by the $5 daily estate budget gate 2026-08-25 (concurrent sessions); ~$0.30 estimated; run on the next budget day BEFORE pack derivation — head-term keyword sets are the main blind spot |
| D2 | search_volume top-up for the head terms + sitemap-evidenced questions ("do hairdressers charge vat" etc.) | same gate; batch with D1 |
| D3 | Free expansions (autocomplete/PAA) never run for this family | run at pack derivation if head coverage looks thin |
| D4 | Persist raw harvest into `dataforseo_competitor_data` table | §9.2 step 1 persistence not done; raw JSON preserved beside this file (same debt as creative D4) |
| D5 | Language pass (§9.11) winner set incomplete until D1 lands | run post-D1, pre-pack |

---

## 10. Open questions for the owner (batched; Q1 blocks pack derivation)

1. House positions (§8 items 1-4) must be authored and locked before writing. Approve
   authoring as the first Stage 3 task for this cluster?
2. The D1 top-up harvest (~$0.30) was blocked only by today's estate-wide budget gate.
   Approve running it on the next budget day before packs are derived?
3. C2 sized both rows at cluster 3-5; the evidence supports 5 surfaces total across
   both. Confirm right-sizing down is acceptable (same call you approved implicitly on
   the creative cluster's musicians niche).
