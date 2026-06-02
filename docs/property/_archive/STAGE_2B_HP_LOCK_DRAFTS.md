# Stage 2b HP-Lock Drafts — MW1 (2026-05-26)

**Purpose:** drafts for 4 HP-locks raised at Stage 2 (F-3 / F-5 / F-7 / F-102). Conductor reviews + appends to `house_positions.md`. Same pattern as Stage 1b drafts.

**Suggested anchor points:**
- §1.J extension (F-3) — edit §1.J in place at line ~2340-2395
- §1.N (F-5) — append after §1.K (~line 3180)
- §1.O (F-7) — append after §1.N
- §32 (F-102) — append after §31 (~line 3340)

**Numbering audit:** §29 = VAT (Wave 8), §30 = council-tax (Stage 1b), §31 = lease-extension (Stage 1b). Next free top-level: §32. §1.K through §1.O extend §1 mini-lock cluster.

**Already applied this session:** F-52 (§23.8 s.41 → s.44, commit eb50951).

---

## DRAFT 1: §1.J extension for F-3 (garden-easement + PROW sub-lines)

**Approach:** extend the existing §1.J Wave 9 mini-lock in place rather than open §1.M. Lighter touch; keeps the case-law cluster anchor unified.

**Edit:** find the end of §1.J's "Pages adjacent to this lock" list (or before the "Do not write" subsection) and append:

```markdown
- **§1.J sub-line 1 — Garden-easement leasehold (FA 2003 s.116(1)(c)) — added 2026-05-26 (MW1 A14).** The s.116(1)(c) easement-benefit limb extends "residential property" treatment to land that is not itself part of the dwelling but exists for the benefit of the dwelling (e.g. a garden easement, communal-gardens right of way for residents only). MW1 A14 page (`ftt-confirms-residential-sdlt-rates-for-leasehold-with-garden-easement`) is the anchor page. Sub-line covers the contractual / proprietary easement distinction + the FTT's residential-favouring approach to ambiguous easements benefiting flat-leaseholders + the practical evidence the buyer's conveyancer assembles to support residential classification at write-time (lease wording referencing the easement; plan showing the easement's relationship to the demised premises; absence of commercial use of the easement land).
- **§1.J sub-line 2 — Public rights of way (PROW) over residential land — added 2026-05-26 (MW1 A9).** A subsidiary line where the disputed land carries a Definitive Map PROW (public footpath, bridleway, restricted byway, or BOAT). HMRC's argument-pattern: PROW = non-private = non-residential character → mixed-use rates. MW1 A9 page (`averdieck-case-analysis-navigating-sdlt-and-public-rights-of-way`) is the case-led anchor. The FTT's general approach distinguishes PROW that materially constrain the residential enjoyment (potentially mixed-use) from PROW that are notional / unenforced (typically residential). Surveyor evidence + on-site inspection notes are decisive.
- **§1.J cluster taxonomy.** The trilogy core (Hyman + Suterwalla + Mudan / MHB / Brown) remains the residential-vs-mixed-use ratio line. The two sub-lines above are the case-led extensions for MW1's three named-case pages (A14 + A9 + A16); future named-case pages may add further sub-lines under §1.J without needing a new mini-lock.
```

---

## DRAFT 2: §1.N SDLT appeal procedure (F-5)

**Suggested anchor point:** append after §1.K (line ~3180).

```markdown
## 1.N SDLT appeal procedure + late-appeal jurisdiction — FA 2003 Sch 10 + Martland framework — MW1 mini-lock (added 2026-05-26)

Closes F-5 from MW1 Stage 2b. Anchors MW1 A15 (`ftt-refuses-late-sdlt-appeal-where-appellants-chose-not-to-seek-professional-advice`) plus any future procedural-explainer SDLT pages. §27 covers income-tax appeal procedure but is anchored on TMA 1970 s.28A / s.31A — a distinct statutory line.

- **Statutory hooks:**
  - **FA 2003 Schedule 10** — SDLT returns, enquiries, appeals. Key paragraphs:
    - **para 6:** enquiry notice + 9-month enquiry window
    - **para 12:** closure of enquiry
    - **para 25:** appealable decisions
    - **paras 28-29:** appeal mechanics + appealable matters
    - **para 34:** overpayment relief — alternative route where the appeal window has lapsed
    - **para 35:** **30-day appeal window** from notice of appealable decision; the central operative section for late-appeal jurisprudence
  - Verified at https://www.legislation.gov.uk/ukpga/2003/14/schedule/10 (verify section list on write).
- **Tribunal Procedure Rules 2009 (SI 2009/273):** rule 5(3)(a) (general case-management permission to extend time) + rule 20(4) (notice of appeal time-limits). Verified at https://www.legislation.gov.uk/uksi/2009/273/contents.
- **Case-law framework:**
  - **Martland v HMRC [2018] UKUT 178 (TCC)** — the controlling three-stage framework for late appeals: (1) length of delay; (2) reasons for delay; (3) all the circumstances of the case. Verified at the [Tax Chamber decisions database — write-time verification required].
  - **Denton v T H White Ltd [2014] EWCA Civ 906** — imported into the tax-tribunal framework via Martland; the Court of Appeal three-stage test for relief from sanction. The Martland framework borrows the Denton structure but applies it in the tax-tribunal context.
  - **BPP Holdings Ltd v HMRC [2017] UKSC 55** — Supreme Court emphasis on statutory compliance + the courts' general approach to time limits. Anchor authority on the importance of meeting statutory deadlines.
  - **HMRC v Katib [2019] UKUT 189 (TCC)** — agent failures (e.g. accountant failing to file) vs personal responsibility; an agent's failure does not generally provide a "good reason" for late filing.
- **The "no professional advice" reasoning line:**
  - The FTT regularly considers (and typically rejects) appellants' arguments that they did not take professional advice on SDLT.
  - The reasoning runs: SDLT is a self-assessed tax; the obligation to file accurately + appeal within time rests with the taxpayer; not seeking professional advice is generally not a "good reason" for delay under Martland step 2.
  - This is a recurring FTT pattern. MW1 A15 page is the deep-dive on this line. The controlling FTT decision is identified via the F-2 / F-4 / F-6 / F-9 case-verification dispatch.
- **Two procedural routes for SDLT overpayment / wrong-classification:**
  - **Sch 10 para 35 appeal route:** lodge within 30 days of HMRC's appealable decision (closure notice, amendment, assessment). Permission to appeal out of time = Martland framework.
  - **Sch 10 para 34 overpayment relief route:** alternative where the appeal window has lapsed. Four-year time limit from the end of the relevant chargeable period. Requires HMRC's agreement OR FTT review of refusal.
  - The two routes are NOT interchangeable: para 35 requires an appealable HMRC decision; para 34 does not. Pages should surface the distinction clearly.
- **Pages anchored to this lock:**
  - A15 (`ftt-refuses-late-sdlt-appeal-where-appellants-chose-not-to-seek-professional-advice`) — anchor page
  - Future SDLT procedural-explainer pages in this cluster
- **Do not write:**
  - "Late-appeal applications routinely succeed" (false; the Martland framework + BPP set a high bar; most late SDLT appeals fail).
  - "No professional advice is a good reason for delay" (false; the FTT typically rejects this reasoning).
  - "The 30-day window can be extended at the FTT's discretion freely" (false; permission to appeal out of time requires Martland-framework demonstration).
  - "Overpayment relief and appeal route are interchangeable" (false; the para 34 / para 35 routes have distinct statutory triggers and time limits).
  - "An agent's failure to file is a good reason for the taxpayer" (false; Katib UKUT rejects this absent exceptional circumstances).
- **HMRC manual anchor:** SDLTM50000+ (SDLT compliance + enquiries + appeals).
- **Practical writing rule for sessions:** lead with the statutory window (30 days, FA 2003 Sch 10 para 35), then the Martland three-stage framework, then the "no professional advice" pattern as a recurring FTT theme. Always distinguish the para 35 appeal route from the para 34 overpayment route. Cite a controlling FTT decision (per Stage 2b case verification) where the page is case-led.
```

---

## DRAFT 3: §1.O Worldwide-property + non-resident-buyer SDLT (F-7)

**Suggested anchor point:** append after §1.N.

```markdown
## 1.O Worldwide-property ownership and UK SDLT — three statutory routes — MW1 mini-lock (added 2026-05-26)

Closes F-7 from MW1 Stage 2b. Anchors MW1 A17 (`how-owning-property-abroad-leads-higher-stamp-duty-rates`) + A18 (`labour-plans-stamp-duty-hike-for-overseas-buyers`) + any future cross-border SDLT pages. §1.I (Sch 4ZA 5% surcharge mechanics) covers domestic additional-dwellings but not the worldwide-reach triangulation; §1.K (FTB relief) covers FTB mechanics but not worldwide-disqualification asymmetry.

**Critical framing — three independent statutory routes triangulate on the same transaction:**

1. **Sch 4ZA — 5% Additional Dwellings Surcharge (worldwide reach for buyer's other property)**
2. **Sch 9A — 2% Non-Resident Surcharge (test on buyer's UK-residence status, NOT property location)**
3. **Sch 6ZA — FTB Relief (worldwide-disqualification on prior ownership of any dwelling)**

The three routes stack: a non-resident buyer of an additional dwelling who is not a FTB attracts all three rate-adjustments on the same transaction.

### 1.O.1 Sch 4ZA — Additional Dwellings Surcharge (worldwide)

- **Statutory hook:** FA 2003 Sch 4ZA, rate uplifted to 5% from 31 October 2024 by FA 2025 c. 8 s.51 (verified at §1.I Wave 9 mini-lock).
- **Worldwide-reach test (Sch 4ZA para 2 + 9):** the buyer is treated as already owning a dwelling if they own a major interest in any dwelling anywhere in the world worth ≥ £40,000.
- **Spouse-aggregation trap (Sch 4ZA para 9):** worldwide property of the buyer's spouse (or civil partner) is attributed to the buyer. Joint-purchaser test extends similarly under Sch 4ZA para 17.
- **£40,000 minor-interest exclusion:** properties under £40,000 market value are excluded from the test (but the consideration-side £40,000 threshold for the surcharge to apply remains).
- **Replacement-of-main-residence relief (Sch 4ZA para 3(6) + 6-7):** if the buyer replaces their main residence within the 3-year (36-month) window, the surcharge is refundable.
- **Inherited interests (Sch 4ZA para 16):** interests inherited in the previous 3 years are disregarded; interests inherited longer ago are counted.

### 1.O.2 Sch 9A — 2% Non-Resident Surcharge (since 1 April 2021)

- **Statutory hook:** FA 2003 Sch 9A, inserted by FA 2021 s.86 + Sch 16 with effect from 1 April 2021. Verified at https://www.legislation.gov.uk/ukpga/2021/26/section/86 (verify on write).
- **Test triggers on the BUYER's residence status, not the property's location:** the surcharge applies where the buyer is "non-resident" for SDLT purposes at the effective date.
- **SDLT residence test (Sch 9A para 4):** SDLT-specific test, **distinct from the SRT** under FA 2013 Sch 45. Sch 9A uses a 183-day-in-the-relevant-period test (12-month window ending with effective date) — simpler than the SRT's connecting-factors matrix.
- **Joint-purchaser rule (Sch 9A para 1):** any joint purchaser being non-resident attracts the surcharge for the whole transaction.
- **Companies (Sch 9A para 5):** UK-incorporated company is treated as UK-resident UNLESS controlled by non-residents (Schedule 9A's specific control test).
- **Refund route (Sch 9A para 11):** if the buyer becomes UK-resident (183 days in the relevant 12-month period centred on the effective date) post-completion, the surcharge is refundable on a backward-looking claim.

### 1.O.3 Sch 6ZA — First-Time Buyer Relief disqualification (worldwide)

- **Statutory hook:** FA 2003 Sch 6ZA para 6(2) (FTB definition with worldwide reach).
- **Test:** FTB relief is unavailable if the buyer (or any joint buyer) has previously held a major interest in a dwelling anywhere in the world. No £40,000 floor — any prior ownership disqualifies.
- **Asymmetry vs Sch 4ZA:** Sch 4ZA has a £40,000 minor-interest exclusion; Sch 6ZA does not. A buyer with worldwide property worth £30,000 escapes the Sch 4ZA surcharge but still loses FTB relief.
- **Inherited interests:** historically count for Sch 6ZA disqualification (inheritance gives rise to a prior major interest). Verify current HMRC manual position.

### 1.O.4 Stacking on a single transaction

- A non-resident buyer of a £500,000 additional dwelling who is not a FTB attracts: standard rates (Sch 4 FA 2003) + 5% Sch 4ZA surcharge + 2% Sch 9A surcharge. Total SDLT = standard + 7% on the chargeable consideration.
- Worked example: £500,000 second-home purchase by a non-resident: standard SDLT ~£12,500 + 5% (£25,000) + 2% (£10,000) = ~£47,500. Versus a UK-resident FTB on a £500,000 first home: full FTB relief applies (binary cliff edge — see §1.K), SDLT = £10,000.

### 1.O.5 Pages anchored to this lock

- A17 (`how-owning-property-abroad-leads-higher-stamp-duty-rates`)
- A18 (`labour-plans-stamp-duty-hike-for-overseas-buyers`) — live-policy verification per F-8
- Future cross-border SDLT pages

### 1.O.6 Live-policy watchpoint (F-8 / A18)

The Labour Party's 2024 General Election manifesto commits to lifting the Sch 9A non-resident surcharge from 2% to 3%. As of 2026-05-26, the operative rate remains 2%. Any page citing the policy state MUST WebFetch-verify at write date against gov.uk + the latest Finance Bill / Act. See F-8 in `megawave1_site_wide_flags.md` for the verification protocol.

### 1.O.7 Do not write

- "The £40,000 minor-interest exclusion applies to FTB relief disqualification" (false; only Sch 4ZA has the £40k floor; Sch 6ZA disqualifies on any prior worldwide major interest).
- "The Sch 9A residence test is the SRT" (false; Sch 9A para 4 is a SDLT-specific 183-day test, distinct from FA 2013 Sch 45 SRT).
- "The 5% surcharge does not apply to overseas-owned properties" (false; Sch 4ZA has worldwide reach for the buyer's other-property test).
- "Non-resident surcharge is 3%" (verify on write — current statutory rate is 2%; Labour-manifesto proposed 3% may or may not be legislated by write date).
- "A UK-incorporated company is always UK-resident for Sch 9A" (false; Sch 9A para 5 has its own control test where non-resident control can flip the status).

### 1.O.8 Practical writing rule

Lead with the three-route triangulation. Always specify which schedule applies to which test. For non-resident buyers, surface the stacking with Sch 4ZA (additive). For FTB writeups, surface the Sch 6ZA worldwide-disqualification asymmetry (no £40k floor). Cite the live policy state for the 2% / 3% non-resident rate with explicit write-date verification.
```

---

## DRAFT 4: §32 CIL + s.106 framework (F-102)

**Suggested anchor point:** append after §31 (lease-extension).

```markdown
## 32. Community Infrastructure Levy + s.106 planning-obligation framework — Planning Act 2008 Part 11 + SI 2010/948 + TCPA 1990 s.106 — MW1 extension (locked, 2026-05-26)

Closes F-102 from MW1 Stage 2b (carryover from F-100's CIL portion — §31 was allocated to lease-extension at Stage 1b). Anchors MW1 C1 (`a-complete-guide-on-community-infrastructure-levy-cil`) plus any future planning-levy pages.

**Critical framing:** CIL and s.106 are TWO DISTINCT planning-side charges that interact with property development + property purchase. CIL is a national levy framework with local-authority-set rates per chargeable square metre. s.106 is bespoke contractual planning obligation negotiated per development. The two can apply to the same development but cannot fund the same infrastructure item (the LURA 2023 pooling-restriction reforms).

### 32.1 CIL statutory framework

- **Planning Act 2008 Part 11 (ss.205-225)** — the foundation Act. Verified at https://www.legislation.gov.uk/ukpga/2008/29/part/11 (verify on write).
- **The CIL Regulations 2010 (SI 2010/948, as amended)** — the operative regulations. Multiple amending SIs since 2010; **always cite a consolidated text or the operative current SI**. Verify at https://www.legislation.gov.uk/uksi/2010/948.
- **Key Planning Act 2008 sections:**
  - **s.205:** CIL imposed
  - **s.206:** charging schedules (each charging authority sets its own rates)
  - **s.209:** liability default (the landowner) + Assumption of Liability mechanic (developer may assume liability)
  - **s.210:** charging schedule procedure
  - **s.211:** appeals against charging-schedule examination
  - **s.218:** s.106 / s.278 (Highways Act 1980) interaction
  - **s.219:** chargeable amount calculation (regulation-set; BCIS uplift mechanism)
  - **s.220:** liability arises on commencement of development
- **Key CIL Regulations sections (SI 2010/948 as amended):**
  - **reg.6-10:** chargeable development definition (≥100 sqm new build threshold + 1+ dwelling exemption)
  - **reg.14-17:** charging schedule architecture + BCIS uplift formula
  - **reg.42:** **self-build exemption** (single-dwelling owner-occupier construction)
  - **reg.42A:** **annexe + extension exemption** (≥100 sqm extension; ≥1 dwelling annexe)
  - **reg.49-52:** **social housing relief**
  - **reg.54-58:** **charitable relief**
  - **reg.65:** liability default to owner of material interest; Assumption-of-Liability via formal notice transfers liability to a developer
  - **reg.67-69:** **commencement-notice + commencement-date** mechanics; failure to serve a commencement notice can trigger surcharges
  - **reg.85+:** **surcharges for procedural failures** (late payment, failure to assume liability, late commencement notice)

### 32.2 s.106 planning obligation framework

- **Town and Country Planning Act 1990 s.106** — the bespoke obligation route. Verified at https://www.legislation.gov.uk/ukpga/1990/8/section/106.
- **Five "tests" for s.106 enforceability (CIL Regulations reg.122):** an obligation must be (a) necessary to make the development acceptable in planning terms; (b) directly related to the development; (c) fairly and reasonably related in scale and kind to the development. (Pre-LURA 2023 reg.122 also had a "pooling restriction" — see below.)
- **Pre-LURA 2023 pooling restriction (CIL Regulations reg.123, since repealed):** more than 5 s.106 obligations could not be pooled to fund a single infrastructure item; the LURA 2023 reforms removed this restriction.
- **Common s.106 obligation categories:**
  - Affordable housing provision (in-development + off-site)
  - Highway improvements (often via s.278 Highways Act 1980 agreements running in parallel to s.106)
  - Education contribution (financial contributions for school places)
  - Open space + recreational facilities
  - Public art + cultural-infrastructure contributions
  - Community-infrastructure financial contributions (where CIL not adopted in the LPA area)

### 32.3 LURA 2023 reforms

- **Levelling-up and Regeneration Act 2023 c. 55 Part 4** — major CIL / s.106 reforms; phased commencement. Verified at https://www.legislation.gov.uk/ukpga/2023/55/part/4.
- **Headline changes:**
  - Pooling restriction (reg.123) repealed.
  - Development Levy planned to replace CIL in stages (commencement TBD; pilot framework).
  - Plain-language CIL guidance + procedural simplification mandates.
- **Commencement watchpoint:** like LFRA 2024, LURA 2023 Part 4 is phased. Pages must verify in-force position at write.

### 32.4 CIL vs s.106 — division of labour

- **Use CIL for:** generic, scaled-by-floor-area infrastructure contributions across multiple developments (highway uplift contributions, strategic transport, schools at scale, healthcare infrastructure).
- **Use s.106 for:** development-specific obligations not amenable to a flat-rate levy (affordable housing units IN the development; specific highway works for the specific development; community-infrastructure tied to the specific development's impacts).
- **Cannot use both for the same item:** Planning Act 2008 s.218 + CIL reg.122 prevent double-charging.

### 32.5 Pages anchored to this lock

- C1 (`a-complete-guide-on-community-infrastructure-levy-cil`) — primary CIL explainer
- Future s.106-specific pages (none in MW1 currently)
- Future LURA 2023 reform / Development Levy transition pages

### 32.6 Cross-references

- **§30** (Council tax) — distinct from CIL despite both being "local-authority levy on property"; council tax is annual occupation-based, CIL is one-off development-based.
- **Planning permission + change-of-use cluster** (residual MW3 topics) — CIL applies on chargeable development including most material changes-of-use.

### 32.7 Do not write

- "CIL applies to all property purchases" (false; CIL applies on chargeable DEVELOPMENT, not purchase. A buyer of an existing dwelling does not pay CIL.)
- "s.106 obligations transfer to subsequent owners freely" (partially false; s.106 obligations bind successors in title via Land Registry notice, but specific obligation wording determines transferability + enforceability).
- "CIL exemptions apply automatically" (false; most CIL exemptions require formal notice + procedural compliance — self-build exemption reg.42 has specific notice-of-chargeable-development + commencement-notice + 3-year clawback rules).
- "CIL rates are set nationally" (false; each charging authority sets its own rates via examination-confirmed Charging Schedule).
- "The s.106 5-pooling restriction still applies" (false; repealed by LURA 2023).
- "CIL replaced s.106" (false; they coexist with distinct roles).

### 32.8 Practical writing rule for sessions

Lead with the distinction between CIL and s.106 (national framework + LA rates vs bespoke negotiated obligation). Specify whether the property in question is purchase-of-existing-dwelling (no CIL) or development (CIL chargeable subject to exemptions). For self-build exemption pages, surface the procedural-discipline requirements + 3-year clawback aggressively. For LURA 2023 reform pages, verify commencement status at write.
```

---

## Conductor checklist

For each draft:
- [ ] Read proposed wording
- [ ] Edit for style / tone (no em-dashes in user-facing — HP-locks are internal so em-dashes tolerated)
- [ ] Spot-verify 2-3 key statutory citations
- [ ] Decide on §1.M extension vs §1.M new lock for F-3 (DRAFT 1 chose extend §1.J in place)
- [ ] Append to `house_positions.md` at suggested anchor points
- [ ] Commit as `Stage 2b HP-locks: §1.J extension + §1.N + §1.O + §32 for MW1`

After commit:
- Receive case-verification Agent results (running in background)
- Decide F-2 / F-4 / F-6 / F-9 disposition based on verification (apply verified citations to A14 / A15 / A16 / A8 Stage 2 briefs in their worktree branches)
- Defer F-8 (live-policy) to RUN-session write-time verification
- Defer F-10 (Wave 9 back-patch) to close-wave step

---

## Then RUN dispatch readiness

After Stage 2b HP-locks committed + case citations resolved + worktree-to-main reconciliation handled, the rolling architecture proceeds to RUN dispatch per `ROUND_6_7_SEQUENCING.md`:

```powershell
./scripts/rolling-orchestrator.ps1 -Wave 1 -Phase run -Lane a
./scripts/rolling-orchestrator.ps1 -Wave 1 -Phase run -Lane b
./scripts/rolling-orchestrator.ps1 -Wave 1 -Phase run -Lane c
```

RUN-phase orchestrator dispatches with the batch-detect Stage 2/RUN fix (commit 8aae30f) so the safety-net no longer false-positives. Sub-agents generate full blog pages from briefs into worktree branches at `Property/web/src/content/blog/<slug>.md`.
