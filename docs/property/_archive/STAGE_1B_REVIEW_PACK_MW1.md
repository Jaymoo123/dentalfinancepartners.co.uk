# Stage 1b Review Pack — MW1

**Purpose:** prep doc to compress Stage 1b conductor session from ~120 min → ~45-60 min. Surfaces decisions + proposed HP-lock wording + verbatim citations. **Does NOT pre-decide anything** — conductor judgement remains irreducible. Pack is a checklist + structure, not a substitute for reading the actual briefs at decision points.

**Created:** 2026-05-26 (post MW1 Stage 1 close)
**Reads:** 53 briefs at `briefs/property/megawave1/*.md` + flags + Q-N

---

## Sign-off completion target

```powershell
New-Item briefs/property/megawave1/_signals/stage1b_signed_off.flag -Type File
```

After this exists, dispatch Stage 2:
```powershell
./scripts/rolling-orchestrator.ps1 -Wave 1 -Phase stage2 -Lane a -BatchTimeoutMin 180
./scripts/rolling-orchestrator.ps1 -Wave 1 -Phase stage2 -Lane b -BatchTimeoutMin 180
./scripts/rolling-orchestrator.ps1 -Wave 1 -Phase stage2 -Lane c -BatchTimeoutMin 180
```

---

## Picks by cluster (53 total)

### Lane A — SDLT surcharges & reliefs (20 picks)

| Pos | Slug | Sub-cluster |
|---|---|---|
| A1 | `abolishment-of-multiple-dwelling-relief` | MDR-abolition (FA(No.2) 2024 s.7) |
| A2 | `abolition-of-multiple-dwellings-relief-mdr-raises-concerns` | MDR-abolition (sentiment angle) |
| A3 | `a-complete-guide-on-multiple-dwellings-relief-eligibility-and-benefits` | MDR (pre-abolition / historical) |
| A4 | `a-complete-guide-to-5-sdlt-surcharge-refund-claims` | Surcharge refund |
| A5 | `a-complete-guide-to-stamp-duty-refund` | General SDLT refund |
| A6 | `a-complete-guide-to-stamp-duty-relief-for-probate-properties` | Probate (Sch 3 + Sch 4 + Sch 6A + Sch 4ZA p16) |
| A7 | `applicable-sdlt-rates-for-first-time-buyers` | **FTB cluster** (§1.K candidate) |
| A8 | `archer-uk-limited-vs-revenue-scotland-ftt-rules-no-lbtt-charge-for-lease-extension-granted-under-sdlt` | Lease extension case (F-101) |
| A9 | `averdieck-case-analysis-navigating-sdlt-and-public-rights-of-way` | Mixed-use / PROW case |
| A10 | `first-time-buyer-relief-benefits-and-eligibility-requirements` | **FTB cluster** |
| A11 | `first-time-buyer-relief-calculator` | **FTB cluster** |
| A12 | `first-time-buyer-relief-overcome-down-payment` | **FTB cluster** (verified production-grade spot-check) |
| A13 | `first-time-buyer-relief-understanding-tax-credits-and-deductions` | **FTB cluster** |
| A14 | `ftt-confirms-residential-sdlt-rates-for-leasehold-with-garden-easement` | Residential-vs-not case |
| A15 | `ftt-refuses-late-sdlt-appeal-where-appellants-chose-not-to-seek-professional-advice` | Procedural case |
| A16 | `horton-hall-sdlt-case-residential-vs-non-residential-dispute` | Mixed-use case |
| A17 | `how-owning-property-abroad-leads-higher-stamp-duty-rates` | Higher rates / overseas |
| A18 | `labour-plans-stamp-duty-hike-for-overseas-buyers` | Political/proposed (verify dated) |
| A19 | `land-and-buildings-transaction-tax-multiple-dwellings-relief` | LBTT MDR (Scotland survives) |
| A20 | `multiple-dwellings-relief` | MDR generic / cross-jurisdictional |

### Lane B — Devolved equivalents + FHL abolition (18 picks)

| Pos | Slug | Sub-cluster |
|---|---|---|
| B1 | `essential-guide-for-first-time-homebuyers-in-scotland` | Scottish FTB (LBTT) |
| B2 | `higher-rates-of-land-transaction-tax-a-complete-guide` | Welsh LTT higher rates |
| B3 | `land-transaction-tax-a-complete-guide` | Welsh LTT primer |
| B4 | `bare-trusts-and-lbtt-relief-availability` | Scottish LBTT + trusts |
| B5 | `lbtt-acquisition-relief-when-corporate-takeovers-reduce-tax` | Scottish LBTT corp relief |
| B6 | `lbtt-review-in-scotland` | LBTT review (political) |
| B7 | `limits-on-ads-repayment-ftt-clarifies-disposal-in-replacement-of-main-residence` | Scottish ADS case |
| B8 | `ltt-higher-rates-for-spouses-minor-children-and-trust-interests` | Welsh LTT higher rates detail |
| B9 | `ltt-refunds-for-derelict-or-uninhabitable-properties` | **F-50 cannib pair** |
| B10 | `understanding-alternative-finance-arrangements-under-lbtt` | LBTT alternative finance |
| B11 | `ltt-calculator` | Welsh LTT calculator |
| B12 | `ltd-property-spreadsheet` | **F-51 lane-misclustered** (Incorporation topic, not Scottish/Welsh) |
| B13 | `abolition-of-furnished-holiday-lettings-fhl-what-individual-owners-needs-to-know` | FHL abolition (FA 2025 s.25) |
| B14 | `impact-of-fhl-tax-abolition-on-pension-contributions-key-insights-strategies` | FHL + pensions |
| B15 | `understanding-the-taxation-of-fhls-in-a-company` | FHL in company |
| B16 | `vat-on-furnished-holiday-lettings-fhl` | FHL + VAT |
| B17 | `big-tax-changes-ahead-for-furnished-holiday-lettings` | FHL overview |
| B18 | `end-of-the-furnished-holiday-letting-regime` | FHL abolition narrative |

### Lane C — CIL/council-tax/disclosure/leases (15 picks)

| Pos | Slug | Sub-cluster |
|---|---|---|
| C1 | `a-complete-guide-on-community-infrastructure-levy-cil` | CIL (Planning Act 2008 Pt 11) |
| C2 | `council-tax-for-new-builds` | **Council-tax (§30 candidate)** |
| C3 | `government-to-end-council-tax-on-hmo-rooms` | **Council-tax** + HMO |
| C4 | `is-increasing-council-tax-damaging-the-housing-market` | **Council-tax** (sentiment) |
| C5 | `making-a-disclosure-using-the-worldwide-disclosure-facility` | HMRC WDF |
| C6 | `reduce-your-council-tax-bill-in-the-uk` | **Council-tax** reduction |
| C7 | `remittance-basis-tax-insights-for-non-domiciled-individuals` | Non-dom (changed April 2025) |
| C8 | `single-person-council-tax-discount` | **Council-tax** discount |
| C9 | `single-person-council-tax-discounts-a-complete-guide` | **Council-tax** discount (potential dupe of C8) |
| C10 | `residency-and-domicile` | Non-dom / residency |
| C11 | `free-rental-valuation` | RICS / lead-magnet style |
| C12 | `selling-house-below-market-value` | Valuation / CGT angle |
| C13 | `lease-extension-vs-freehold-purchase` | **Lease extension (F-101 candidate)** |
| C14 | `lease-extensions-in-the-uk-surrender-and-regrant` | **Lease extension (F-101)** |
| C15 | `lease-variation-and-lease-surrender` | **Lease variation (F-101)** |

---

## Flag-by-flag review

### F-1: BRIEF_DRIFT — A1 mis-states Scottish LBTT MDR position

**Action: APPLY VERBATIM CORRECTION** (low risk — wording verified against legislation.gov.uk by the sub-agent).

- **File:** `briefs/property/megawave1/abolishment-of-multiple-dwelling-relief.md`
- **What's wrong:** Q5 + Framing differentiator paragraph say "Scotland never had an MDR equivalent — LBTT has its own Additional Dwelling Supplement regime." Incorrect.
- **Truth:** Scotland HAS had LBTT MDR since 2015 (LBTT(S)A 2013 Sch 5, verified 2026-05-26). LBTT MDR is NOT abolished alongside SDLT MDR. ADS is a separate parallel tax, not an MDR substitute.
- **Proposed Q5 wording** (from flag entry, verbatim): "Does this affect Welsh or Scottish purchases? No — SDLT only. Welsh LTT MDR survives under LTTA 2017 Sch 13. Scottish LBTT MDR survives under LBTT(S)A 2013 Sch 5 — the Scottish Parliament has not legislated an MDR repeal at the time of writing. Cross-link to the Welsh-survives page and to A19 (`land-and-buildings-transaction-tax-multiple-dwellings-relief`) for the Scottish-survives mechanics."
- **Companion need:** triggers Devolved-tax HP-lock (see below)
- **Effort:** ~5 min (find + replace + commit)

### F-50: CROSS_BUCKET — B9 soft cannib

**Action: CONDUCTOR JUDGEMENT NEEDED** — read both pages, decide differentiate / redirect / kill.

- **Pick:** B9 `ltt-refunds-for-derelict-or-uninhabitable-properties` (Welsh LTT refunds for derelict properties)
- **Conflict:** "Wave 5 page" (specific page not named in flag entry — need to read B9's brief or search Wave 5 commits)
- **Decision options:**
  1. **Differentiate** — keep B9, refine framing to distinguish (jurisdictional + scope)
  2. **Redirect** — kill B9, point its slug at the Wave 5 page if same canonical answer
  3. **Kill** — drop B9 from MW1, remove its tracker row, remove brief
- **Effort:** ~15 min (read B9 brief + find Wave 5 page + decide)

### F-51: CROSS_BUCKET — B12 lane-misclustered

**Action: CONDUCTOR DECISION on disposition.**

- **Pick:** B12 `ltd-property-spreadsheet` (Limited company property spreadsheet — Incorporation topic, NOT Scottish/Welsh)
- **Issue:** slicer put it in Bucket B (SDLT Scottish/Welsh equivalents) but the topic is Limited Company / Incorporation, which is MW2's "Entity / incorporation family"
- **Decision options:**
  1. **Drop from MW1, roll to MW2** — most defensible; the affinity grouping was wrong
  2. **Keep in MW1** — already drafted as Stage 1 seed; if quality is OK, ship as-is and accept the cluster-coherence cost
  3. **Reclassify within MW1** — move to a different bucket (e.g. if Bucket A or C has tonal fit)
- **Effort:** ~10 min (read B12's brief + decide based on draft quality + cluster goals)

### F-100: HOUSE_POSITION_EXTENSION — Council-tax framework

**Action: WRITE NEW HP-LOCK.**

- **Target:** `house_positions.md` §30 (new section)
- **Anchors:** 6 picks — C2 (new builds), C3 (HMO rooms), C4 (housing-market sentiment), C6 (reduction), C8 (single-person discount), C9 (single-person discount guide)
- **Statutory framework:**
  - Local Government Finance Act 1992 (the foundation Act)
  - Council Tax (Exempt Dwellings) Order 1992 (S.I. 1992/558) — exemption classes
  - Council Tax (Variation for Adjustments of Discounts) (England) Regulations 2003 — discount mechanics
  - Local Government Finance Act 2012 — second-homes / empty-property premium powers
  - Levelling-up & Regeneration Act 2023 — empty-home premium adjustments
- **Proposed §30 structure:** (read C2 + C6 briefs to verify wording before locking)
  - §30 main: bands A-H + valuation date + revaluation (or absence of)
  - §30.A: discounts (single-person 25%, full disregard, severe mental impairment)
  - §30.B: exemptions (classes A-W per S.I. 1992/558)
  - §30.C: second-homes premium + empty-home premium powers (devolved post-LGFA 2012 + LURA 2023)
  - §30.D: HMO classification (room-by-room vs whole-property) — captures C3
- **Likely cross-links:** Lane C cluster + any existing council-tax content; cross-jurisdictional (Wales has separate council tax; Scotland has council tax with different exemptions)
- **Effort:** ~30 min (write the lock, verify citations against legislation.gov.uk)

### F-101: HOUSE_POSITION_EXTENSION — Lease-extension / enfranchisement

**Action: WRITE NEW HP-LOCK.**

- **Target:** new section in `house_positions.md` (proposed §1.L or new §)
- **Anchors:** 4 picks — A8 (Archer UK case), C13 (vs freehold purchase), C14 (surrender + regrant), C15 (variation + surrender)
- **Statutory framework:**
  - Leasehold Reform, Housing and Urban Development Act 1993 (the 1993 Act) — long lease extensions for flats
  - Commonhold and Leasehold Reform Act 2002 — collective enfranchisement + lease extension reforms
  - Leasehold and Freehold Reform Act 2024 c. 22 — material 2024 reforms (premium calculation, marriage value abolition, 990-year extensions). **Verify 2024 Act commencement status** — much of it is not in force yet (commenced piecemeal).
  - Landlord and Tenant Act 1987 + 1988 — surrender + regrant context
- **SDLT angle (A8):** lease extension granted vs lease surrender-and-regrant has DIFFERENT SDLT treatment. Archer UK Ltd v Revenue Scotland (FTT) confirmed no LBTT on lease extension; under SDLT there's a separate FA 2003 Sch 17A para 9A treatment.
- **Effort:** ~30 min (lock the post-LFRA 2024 position carefully; the regime is mid-transition)

---

## Independent HP-lock candidate (raised by A7 brief, NOT in flag file)

### §1.K — First-Time Buyers' Relief

**Action: WRITE NEW HP-LOCK.**

- **Target:** `house_positions.md` §1.K (new sub-section under §1 SDLT main)
- **Anchors:** 5 picks — A7 (rates), A10 (eligibility), A11 (calculator), A12 (deposit-availability angle), A13 (tax-credits-and-deductions angle)
- **Statutory framework (verified by A7's sub-agent against legislation.gov.uk, 2026-05-26):**
  - FA 2003 s.57B "First-time buyers" — "(1) Schedule 6ZA provides relief for first-time buyers." (https://www.legislation.gov.uk/ukpga/2003/14/section/57B)
  - FA 2003 Sch 6ZA "Relief for first-time buyers" — operative provisions:
    - para 1(3): £500,000 absolute cap on chargeable consideration (relief unavailable above)
    - para 4 Table A: 0% on first £300,000; 5% on £300,001-£500,000
    - para 6(3): bare trust leases — inserted by F(No.2)A 2024 c. 12 s.8
  - FA 2003 s.55 + Table A: standard residential rates (post-1 April 2025 reversion)
  - FA 2003 Sch 4ZA: additional dwellings surcharge — interacts with FTB (joint-purchase trap)
  - FA 2025: 1 April 2025 reversion of temporary 2022-2025 £425k/£625k thresholds
- **Proposed §1.K wording outline:**
  - §1.K main: current rate structure (0% / 5% / cap at £500k)
  - §1.K.1: pre/post 1 April 2025 reversion narrative
  - §1.K.2: eligibility (FTB definition; joint-purchase rules)
  - §1.K.3: cliff-edge behaviour at £500k (binary, not tapered)
  - §1.K.4: interaction with additional dwellings surcharge (joint-purchase trap)
  - §1.K.5: bare trust + LISA + Help to Buy ISA interactions
- **Effort:** ~25 min (citations already verified; mostly transcription + cluster-coherence sweep)

---

## Independent HP-lock candidate (from F-1's "Companion HP-extension need")

### §X — Devolved property taxes (Wales LTT + Scotland LBTT)

**Action: CONDUCTOR DECISION on structure, then write.**

- **Target:** new section, e.g. §31 or §1.M ("Devolved property taxes"); alternative is two separate sections (§31 Welsh LTT + §32 Scottish LBTT)
- **Anchors:** ~20 picks — all of Lane B (B1-B12 = 12 picks) + Lane A's A19 (LBTT MDR) + A20 (cross-jurisdictional MDR) + possibly A8 (Archer UK Scottish case)
- **Statutory framework:**
  - Wales: Land Transaction Tax and Anti-avoidance of Devolved Taxes (Wales) Act 2017 (LTTA 2017) — operative since 1 April 2018
  - Wales: LTTA 2017 Sch 13 — Multiple Dwellings Relief (Welsh MDR survives SDLT abolition)
  - Scotland: Land and Buildings Transaction Tax (Scotland) Act 2013 (LBTT(S)A 2013) — operative since 1 April 2015
  - Scotland: LBTT(S)A 2013 Sch 5 — Multiple Dwellings Relief (Scottish MDR survives, F-1 verified)
  - Scotland: LBTT(S)A 2013 Sch 2A — Additional Dwelling Supplement (separate from MDR)
- **Decision points:**
  1. Single §X covering both jurisdictions in one section vs separate per-jurisdiction sections
  2. Whether to add HP locks for FHL devolution (FHL abolished UK-wide via FA 2025 but the LTT/LBTT side has its own quirks)
- **Effort:** ~30 min (this is the most cluster-spanning lock; high value but high cost)

---

## Recommended sign-off sequence

| Step | Action | Time est |
|---|---|---|
| 1 | Apply F-1 verbatim correction to A1 brief + commit | 5 min |
| 2 | Decide F-50 disposition (B9 cannib) — read brief + Wave 5 page | 15 min |
| 3 | Decide F-51 disposition (B12 lane-mis) — read brief + decide | 10 min |
| 4 | Write **§1.K** (FTB relief) HP-lock | 25 min |
| 5 | Write **§30** (council-tax) HP-lock | 30 min |
| 6 | Write **§1.L or new §** (lease-extension) HP-lock | 30 min |
| 7 | Write **§X or §31+§32** (devolved property taxes) HP-lock | 30 min |
| 8 | Final read-through + commit all HP edits as a single coherent commit | 10 min |
| 9 | `New-Item briefs/property/megawave1/_signals/stage1b_signed_off.flag -Type File` | <1 min |
| 10 | Dispatch Stage 2 (3 lanes in parallel) | 2 min |
| **Total** | | **~2 hours focused** |

Comparison without this pack: ~3-4 hours (more reading + structure discovery).

---

## Notes for Stage 2 dispatch (after sign-off)

- batch-detect substring bug is FIXED (`f01d3ef`); Stage 2 safety net should work correctly
- Each Stage 2 sub-agent extends each Stage 1 brief in place at `briefs/property/megawave1/<slug>.md`
- Sub-agents will read the new HP-locks in `house_positions.md` — make sure the locks ARE committed before dispatch
- Stage 2 prompt template references the brief's `## Stage 2 research target list` block — sub-agent fetches competitor URLs (Bug #3 + #5 caveat: verify URLs live before listing)
- Expected Stage 2 close: ~45 min unattended per lane in parallel; ~45 min total wall-clock
- Stage 2b drift triage is the next conductor task after

---

## Q-1 (lane A) — not a blocker

- **Content:** "M1-A-B4 re-dispatched after work already complete; queue rows still flagged pending"
- **Resolution:** that was the safety-net bug (fixed at `f01d3ef`) + my manual queue reconciliation
- **Action:** no Stage 1b action required; mark as resolved in the Q file or leave as historical record

---

## After Stage 1b: next-stage doc

Continue with: `docs/property/ROUND_6_7_SEQUENCING.md` — Stage 2 dispatch instructions through Round 7.
