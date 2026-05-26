# Stage 1b HP-Lock Drafts — MW1 (2026-05-26)

**Purpose:** drafts for 3 HP-locks the conductor reviews + commits into `docs/property/house_positions.md`. Each draft follows the existing convention (mini-lock under existing § or new top-level §). Statutory citations are surfaced from sub-agent briefs (verified during Stage 1) — conductor should spot-check key URLs before commit but most are already WebFetch-verified in the source briefs.

**Workflow:**
1. Read each draft below
2. Edit any wording you want different (style, tone, framing)
3. Append the section to `house_positions.md` at the right anchor point (positions noted below)
4. Commit as a single change: `git commit -m "Stage 1b HP-locks: §1.K + §30 + §31 for MW1"`
5. Touch sign-off flag
6. Dispatch Stage 2

**Note on numbering:** §29 is taken by Wave 8 VAT lock (added 2026-05-25). Next free top-level is §30. §31 follows.

---

## DRAFT 1: §1.K First-Time Buyers' Relief mini-lock (under §1 SDLT)

**Suggested anchor point in `house_positions.md`:** after §1.J (currently the last §1 mini-lock at line ~2340). Insert before next major section.

```markdown
## 1.K SDLT First-Time Buyers' Relief — FA 2003 s.57B + Sch 6ZA — MW1 mini-lock (added 2026-05-26)

This §1.K mini-lock closes the FTB-cluster HP gap surfaced by MW1 Bucket A picks A7 + A10 + A11 + A12 + A13 (5 picks anchored on FTB relief). The existing §1 main text mentions FTB relief at summary level; this mini-lock locks the rate-table architecture, the 1 April 2025 reversion narrative, the joint-purchase trap, and the deposit-availability framing.

- **Statutory hooks:**
  - **FA 2003 s.57B** "First-time buyers" — "(1) Schedule 6ZA provides relief for first-time buyers." Verified at https://www.legislation.gov.uk/ukpga/2003/14/section/57B on 2026-05-26.
  - **FA 2003 Sch 6ZA** "Relief for first-time buyers" — operative provisions:
    - **para 1(3):** £500,000 absolute cap on chargeable consideration. Relief is fully unavailable above this figure — relief is binary on the consideration, not tapered.
    - **para 4 Table A:** 0% on the first £300,000; 5% on £300,001 to £500,000.
    - **para 6(3):** bare trust leases — inserted by F(No.2)A 2024 c. 12 s.8 (commenced per s.41(8)).
  - Verified at https://www.legislation.gov.uk/ukpga/2003/14/schedule/6ZA on 2026-05-26.
  - **FA 2003 s.55 + Table A:** standard residential rates apply where FTB relief is unavailable. Post-1-April-2025 reverted bands: 0% to £125,000; 2% £125k-£250k; 5% £250k-£925k; 10% £925k-£1.5m; 12% above £1.5m.
  - **FA 2003 Sch 4ZA:** additional dwellings surcharge — interacts with FTB relief (joint-purchase trap, see below). Surcharge rate at 5% from 31 October 2024 per §1.I Wave 9 mini-lock.
- **1 April 2025 reversion (critical date):** the temporary uplift to £425,000 nil band + £625,000 cap (in force 23 September 2022 to 31 March 2025) **reverted** to the pre-uplift £300,000 / £500,000 architecture on 1 April 2025. Pages writing about FTB relief in 2026 must not cite the temporary thresholds as current. Competitor SERP content frequently still references the £425k/£625k figures — this is a known drift source.
- **Cliff-edge behaviour at £500,000:** the relief is binary, not tapered. A £499,999 purchase qualifies fully (relief applies). A £500,001 purchase reverts entirely to standard residential rates (relief unavailable). The single-pound differential changes the SDLT bill by ~£10,000+. Pages should surface this cliff explicitly — readers planning purchases near the threshold need to know.
- **Joint-purchase trap (interaction with Sch 4ZA surcharge):** FTB relief is unavailable where ANY joint buyer has previously owned a major interest in a dwelling. A first-time buyer who joint-purchases with a non-FTB partner (already owns property) loses BOTH the FTB relief AND attracts the 5% additional dwellings surcharge. The net SDLT cost can exceed a pure non-FTB purchase. Cross-link to §1.I (Sch 4ZA surcharge mechanics).
- **Eligibility (Sch 6ZA para 2):** "first-time buyer" means a buyer who has not previously acquired a major interest in a dwelling (or an equivalent interest under foreign law) anywhere in the world. Worldwide ownership disqualifies. Inheriting a property historically disqualifies. Beneficial interest under a trust counts. Stage 2 verifies the full Sch 6ZA para 2 definition + recent HMRC guidance.
- **Bare trust leases (FA(No.2)A 2024 s.8 / Sch 6ZA para 6(3)):** 2024 amendment addresses bare trust acquisition mechanics. Stage 2 verifies the precise operative language and HMRC interpretation.
- **Pages anchored to this lock:**
  - A7 (`applicable-sdlt-rates-for-first-time-buyers`) — rate-table reference
  - A10 (`first-time-buyer-relief-benefits-and-eligibility-requirements`) — eligibility-led
  - A11 (`first-time-buyer-relief-calculator`) — calculator-led
  - A12 (`first-time-buyer-relief-overcome-down-payment`) — deposit-availability angle
  - A13 (`first-time-buyer-relief-understanding-tax-credits-and-deductions`) — credits/deductions
- **Devolved-jurisdiction comparison (cross-link to §23):** Welsh LTT has NO separate FTB relief — the £225,000 nil band (§23.1) serves the function. Scottish LBTT has its own FTB relief at LBTT(S)A 2013 Sch 4 (different £175,000 nil-band uplift architecture; verify at §23.4 if not already captured). Pages must specify jurisdictional scope (England + NI only for FA 2003 Sch 6ZA).
- **Do not write:**
  - "FTB relief applies up to £625,000" (false post-1-April-2025; that was the temporary 2022-2025 figure).
  - "FTB relief tapers between £300,000 and £500,000" (false; tapered on the £300k-£500k portion via the 5% band, but the £500k cap is binary).
  - "FTB relief applies to second properties" (false; FTB definition excludes anyone who has previously owned a major interest in a dwelling).
  - "Joint purchasers each get partial relief" (false; ALL buyers must qualify as FTBs for relief to apply).
  - "Inheriting a property after 2017 doesn't count for FTB definition" (false; HMRC's position is that inheritance creates a prior interest disqualifying FTB status — Stage 2 verifies current HMRC manual).
- **HMRC manual anchor:** SDLTM29800+ (FTB relief).
- **Practical writing rule for sessions:** lead with the current rate table (post-1-April-2025), then surface the reversion narrative, then the cliff-edge behaviour, then the joint-purchase trap. Always specify England + NI jurisdiction. Cross-link to A7 (rate table) and A10 (eligibility) as the cluster pillars.
```

---

## DRAFT 2: §30 Council-tax framework (new top-level)

**Suggested anchor point:** append after the last §28 / §29 section. New top-level §30.

```markdown
## 30. Council tax framework — LGFA 1992 + SI 1992/558 architecture — MW1 extension (locked, 2026-05-26)

Closes F-100 from MW1 Stage 1b. Anchors lane C council-tax cluster (C2 new builds, C3 HMO rooms, C4 housing market impact, C6 reduction routes, C8 single-person discount, C9 single-person guide). The HP file previously had no council-tax section — this lock establishes the framework all council-tax pages reference.

**Critical framing:** council tax is a domestic property tax administered by billing authorities (local councils) under the Local Government Finance Act 1992 (LGFA 1992) and a body of statutory instruments. It is property-based but resident-impacting: liability sits with the resident (or owner where no resident exists) per the s.6 hierarchy. Council tax is England, Wales, and Scotland — with Wales operating under the same primary Act but distinct rate setting, and Scotland operating under the Local Government Finance Act 1992 as devolved to the Scottish Parliament with its own SSI architecture. Northern Ireland uses a different rates system entirely (domestic rating). Pages must specify jurisdictional scope.

### 30.1 Statutory foundation

- **Local Government Finance Act 1992 c. 14 (LGFA 1992)** — the foundation Act. Verified at https://www.legislation.gov.uk/ukpga/1992/14/contents on 2026-05-26 (verify on write).
- **Key sections:**
  - **s.1:** council tax imposed on dwellings
  - **s.6:** liability hierarchy (resident leaseholder > resident statutory tenant > resident licensee > resident > owner > etc.)
  - **s.11:** discounts — s.11(1)(a) is the single-occupant 25% discount; s.11(3) sets the discount percentage; s.11(5) defines "resident" as the dwelling being the person's "sole or main residence"
  - **s.11A:** annexe disregards (in addition to s.11 discounts)
  - **s.11B:** empty-property premium powers (post-LURA 2023 reforms enable up to 100% premium after 1 year empty)
  - **s.11C:** second-home premium powers (post-LURA 2023 enables up to 100% premium for furnished second homes)
  - **s.16:** notifications and offences — s.16(6) makes failure to notify relevant change of circumstances within 21 days a criminal offence
  - **Sch 1:** persons disregarded for discount purposes — 11 principal disregards (students, apprentices, severely mentally impaired, etc.)

### 30.2 Statutory instruments architecture

- **SI 1992/558 — Council Tax (Exempt Dwellings) Order 1992** — exemption classes A through W. Key classes for landlord/property pages:
  - Class B: unoccupied dwellings owned by charity (6 months)
  - Class C: unoccupied and substantially unfurnished (LA discretion since 2013)
  - Class E: unoccupied because person normally lived there has moved to care home
  - Class N: occupied solely by full-time students (£0 council tax)
  - Class W: annex occupied by dependent relative (aged 65+, severely mentally impaired, substantially disabled)
- **SI 1992/554 — Council Tax (Administration and Enforcement) Regulations 1992** — billing, enforcement, recovery procedures.
- **SI 1992/612 — Council Tax (Liability of Owners) Regulations 1992** — when the owner (not resident) is liable (HMOs, certain care arrangements, etc.).

### 30.3 Discount mechanics

- **Single-occupant 25% discount (s.11(1)(a)):** statutory; not means-tested; applies day-by-day; pro-rated on mid-year changes. Application is free and direct to the LA. Disregards in Sch 1 collapse multi-resident households — a two-adult household with one student gets the 25% discount.
- **Sole or main residence test (s.11(5)):** fact-specific; the most-litigated single concept in the council-tax statute. Where a person has multiple homes (e.g. London weekday flat + country weekend house), the test asks which is their "sole or main residence" — not "where they sleep most nights." Look for the Williams v Horsham DC and Bennett v Copeland BC case-law line.
- **Disregard interaction with Class N exemption:** a household where ALL occupants are students gets the Class N exemption (£0 council tax — full removal). A household where ONLY SOME occupants are students gets the single-person discount on the non-student count (students disregarded under Sch 1 para 4). Misclassification can cost the entire annual bill.

### 30.4 Premium powers (post-LURA 2023)

- **Empty-property premium (s.11B):** LAs can charge up to 100% premium after 1 year empty (reduced from 2 years pre-LURA 2023). After 5 years: up to 200%. After 10 years: up to 300%. Each LA sets its own policy.
- **Second-home premium (s.11C):** LAs can charge up to 100% premium for furnished second homes (i.e. periodically occupied, not let). Permitted by LURA 2023, in force from 1 April 2024 for English LAs that adopted the power.
- **Premium interactions:** a single owner-occupier with a second furnished home pays single-person discount on their main residence + the second-home premium on the second property (where LA has adopted).

### 30.5 HMO and owner-liability mechanics

- **HMO definition under SI 1992/612:** dwelling occupied by more than one household, where occupants share basic amenities. HMO occupancy can shift council-tax liability from residents (room-by-room) to the owner (whole-property single bill). Government plans to change this — see C3 brief for the 2024-2026 reform proposals; verify current status at Stage 2.

### 30.6 Cross-jurisdictional notes

- **Wales:** same primary Act (LGFA 1992) but Welsh Ministers set the bands and Welsh LAs administer. Same discount + exemption structure. Bands re-valued in 2003 (vs England's 1991 base) — values differ. Wales has its own second-home and empty-property premium powers, often more aggressive than English LAs.
- **Scotland:** LGFA 1992 as devolved; Scottish Government and councils set bands. Same discount + exemption framework with SSI-specific variations. Council Tax Reduction Scheme operates in Scotland (replaced Council Tax Benefit in 2013).
- **Northern Ireland:** NO council tax. Domestic rates apply (separate Northern Ireland statute). Pages must not conflate NI with the rest of the UK.

### 30.7 Pages anchored to this lock

- C2 `council-tax-for-new-builds`
- C3 `government-to-end-council-tax-on-hmo-rooms` (HMO reform angle)
- C4 `is-increasing-council-tax-damaging-the-housing-market` (policy angle)
- C6 `reduce-your-council-tax-bill-in-the-uk` (hub for reduction routes)
- C8 `single-person-council-tax-discount` (operational)
- C9 `single-person-council-tax-discounts-a-complete-guide` (complete-guide framing)

### 30.8 Do not write

- "Council tax applies across the UK" (false; NI uses domestic rates, not council tax).
- "The single-person discount is means-tested" (false; statutory and non-means-tested — confusion with the Council Tax Reduction Scheme which IS means-tested).
- "Empty-property premium kicks in after 2 years" (false post-LURA 2023; now 1 year for English LAs that adopted the power).
- "You need a fee-charging service to claim the single-person discount" (false; application is free and direct to the LA — note the scam industry exists).
- "Failure to notify the LA is OK" (false; criminal offence under s.16(6), 21-day window).
- "A non-resident owner can claim single-person discount on a let property" (false; discount applies only where the dwelling is the person's sole or main residence).

### 30.9 HMRC / authority anchors

- gov.uk: https://www.gov.uk/council-tax (citizen-facing)
- LGFA 1992 statute: https://www.legislation.gov.uk/ukpga/1992/14
- SI 1992/558: https://www.legislation.gov.uk/uksi/1992/558

### 30.10 Practical writing rule for sessions

Lead with the statutory authority (LGFA 1992 + SI 1992/558). Specify jurisdiction. Cite the relevant s.11 sub-section + the relevant Sch 1 disregard for any discount claim. Surface the "sole or main residence" test for any non-trivial residency question. Note the s.16(6) notification offence. Warn about the fee-charging scam industry where relevant. Always cross-link to C6 (the hub) where the page is operational; always cross-link to the C-cluster siblings.
```

---

## DRAFT 3: §31 Lease extension and enfranchisement (new top-level)

**Suggested anchor point:** append after §30. New top-level §31.

```markdown
## 31. Lease extension and enfranchisement — LRA 1967 + LRHUDA 1993 + LFRA 2024 architecture — MW1 extension (locked, 2026-05-26)

Closes F-101 from MW1 Stage 1b. Anchors lane A pick A8 (Archer UK case) + lane C picks C13 (lease extension vs freehold), C14 (surrender and regrant mechanics), C15 (lease variation and surrender). The HP file previously had no lease-extension section — this lock establishes the framework for the post-LFRA-2024 regime.

**Critical framing:** there are two parallel statutory regimes for leaseholder rights, one for houses (LRA 1967) and one for flats (LRHUDA 1993). Both regimes were materially reformed by the Leasehold and Freehold Reform Act 2024, **commencement of which is phased through 2026-2027 and not all provisions are in force**. Pages must verify the in-force position on the write date against the gov.uk commencement-orders register.

### 31.1 Houses — Leasehold Reform Act 1967 (LRA 1967)

- **Statute:** Leasehold Reform Act 1967 c. 88. Verified at https://www.legislation.gov.uk/ukpga/1967/88/contents on 2026-05-26.
- **Two rights for qualifying house-leaseholders:**
  - **Enfranchisement** — acquire the freehold. Sections: s.1 (entitlement); s.2 (definition of "house"); s.3 (definition of "long tenancy"); s.5 (general claim provisions); s.9 (purchase price — statutory valuation formula).
  - **Extension** — 50-year extension at modern ground rent. Sections: s.14 (obligation to grant); s.15 (terms).
- **Practical reality:** the LRA 1967 extension at modern ground rent is rarely chosen against the LRA 1967 enfranchisement (which extinguishes the leasehold structure altogether). Most house-leaseholders default to enfranchisement under LRA 1967.

### 31.2 Flats — Leasehold Reform, Housing and Urban Development Act 1993 (LRHUDA 1993)

- **Statute:** Leasehold Reform, Housing and Urban Development Act 1993 c. 28. Verified at https://www.legislation.gov.uk/ukpga/1993/28/contents on 2026-05-26.
- **Two rights for qualifying flat-leaseholders:**
  - **Chapter I — Collective enfranchisement.** Group of qualifying tenants in a block buys the freehold. Sections: s.1 (right); s.13 (initial notice); s.32 (price determination + Sch 6 valuation formula). Requires at least 50% of qualifying tenants to participate — a coordination problem that often defeats the route in practice.
  - **Chapter II — Individual lease extension.** Unilateral right; single qualifying tenant extends their lease against payment of a statutory premium. Sections: s.39 (right); s.42 (initial notice); s.56 (obligation to grant new lease). **Post-LFRA-2024:** term increases from existing-lease + 90 years (peppercorn) to fresh 990-year term (peppercorn).

### 31.3 LFRA 2024 reform overlay

- **Statute:** Leasehold and Freehold Reform Act 2024 c. 22 Part 2 "Leasehold enfranchisement and extension". Verified at https://www.legislation.gov.uk/ukpga/2024/22/contents on 2026-05-26.
- **Four headline changes:**
  1. **Abolishes the 2-year qualifying-ownership prerequisite.** A new buyer can extend or join an enfranchisement immediately on completion.
  2. **Extends LRHUDA 1993 Chapter II new-lease term** from existing-lease + 90 years to a fresh **990-year** term.
  3. **Abolishes "marriage value"** — the historic valuation uplift triggered at the 80-year unexpired-term boundary. Materially reduces premiums on short-lease enfranchisements.
  4. **Regulates deferment / capitalisation rates** — Secretary of State may set the statutory valuation rate; the post-Sportelli 5% rate is no longer the default unless re-confirmed.
- **CRITICAL: commencement is phased.** Some Part 2 provisions are in force; some require secondary legislation and are not yet in force as of 2026-05-26. Stage 2 sub-agents MUST verify the in-force position on the write date against the gov.uk commencement-orders register. Pages written during the transition must distinguish: "pre-LFRA-2024 regime" / "current regime, post-commencement of provision X" / "future regime once provision Y commences".
- **Pre-LFRA-2024 valuation rules** continue to govern claims notified before the relevant commencement date. The "claim notified before" cut-off is the critical operative date for each set of provisions.

### 31.4 SDLT treatment

- **Statutory extension (surrender and regrant) — FA 2003 Sch 17A para 9:** variation of a lease term or rent is treated as the surrender of the existing lease + grant of a new lease for SDLT purposes. Chargeable consideration = premium + NPV of any rent (peppercorn = nil NPV). Verified at https://www.legislation.gov.uk/ukpga/2003/14/schedule/17A on 2026-05-26.
- **5% HRAD surcharge interaction (Sch 4ZA, §1.I Wave 9 lock):** extension premiums ≥ £40,000 attract the 5% additional dwellings surcharge where the leaseholder already owns another residential property. Catches a meaningful share of London / South-East extension premiums.
- **House enfranchisement (LRA 1967):** standard SDLT on the freehold consideration.
- **Collective enfranchisement (LRHUDA 1993 Chapter I) — FA 2003 s.74 special calculation:** total consideration divided by number of qualifying flats; standard rates applied to per-flat fraction; result multiplied back up by flat count. Typically delivers materially lower SDLT than full-rate application to aggregate price (per-flat fraction often falls below the £250,000 nil band). Verified at https://www.legislation.gov.uk/ukpga/2003/14/section/74 on 2026-05-26.
- **Scottish equivalent (LBTT) — Archer UK Ltd v Revenue Scotland (FTT):** confirmed no LBTT charge on a lease extension granted under SDLT (transitional Scotland-vs-rUK question — see A8 brief for the case-law detail). Statutory basis in Scotland: LBTT(S)A 2013 Sch 19 + cross-jurisdictional rules.

### 31.5 Valuation architecture

Both regimes operate three valuation components, discounted at the statutory deferment rate (post-Sportelli 5%, now regulable post-LFRA 2024):

- **Term:** value of the freeholder's right to receive ground rent for the remaining unexpired term.
- **Reversion:** deferred value of the freeholder's right to repossess on lease expiry.
- **Marriage value (ABOLISHED post-LFRA-2024 commencement):** historic uplift triggered at the 80-year unexpired-term boundary.
- **Hope value:** uplift achievable by combining the freehold with adjoining leases. ABOLISHED for collective enfranchisement post-LFRA-2024.

LRA 1967 (houses) valuation: s.9.
LRHUDA 1993 (flats — collective) valuation: Sch 6.
LRHUDA 1993 (flats — individual extension) valuation: Sch 13.

### 31.6 Cost-and-process timeline

- Individual lease extension under LRHUDA 1993 Chapter II: ~6-12 months
- Collective enfranchisement under LRHUDA 1993 Chapter I: ~9-18 months
- House enfranchisement under LRA 1967: ~6-12 months

Leaseholder pays the freeholder's reasonable legal and valuation costs in addition to the premium (capped post-LFRA-2024 by the costs-cap framework). Leaseholder also pays own legal and valuation costs. Typical all-in cost loading: 1.3-1.8x of the headline premium.

### 31.7 CGT, IHT, ATED implications

- **CGT:** leaseholder pays no CGT on extension or enfranchisement (consideration outgoing, not incoming). Freeholder has a chargeable disposal — corporation tax (corporate freeholder) or CGT under TCGA 1992 (individual freeholder, residential rates 18% / 24%).
- **IHT:** extension or enfranchisement converts cash to interest in land — no IHT consequence on the leaseholder. The post-extension lease may have higher reversionary value; planning point for IHT-mitigation strategies (cross-link §15 IHT cluster).
- **ATED:** post-extension or post-enfranchisement revaluation of a corporate-held leasehold residential property ≥ £500k may push into higher ATED band. Verify next valuation date under §18 Wave 3 ATED extension.

### 31.8 Pages anchored to this lock

- A8 `archer-uk-limited-vs-revenue-scotland-ftt-rules-no-lbtt-charge-for-lease-extension-granted-under-sdlt` (Scottish LBTT case)
- C13 `lease-extension-vs-freehold-purchase` (decision-architecture page)
- C14 `lease-extensions-in-the-uk-surrender-and-regrant` (FA 2003 Sch 17A para 9 mechanic)
- C15 `lease-variation-and-lease-surrender` (voluntary / non-statutory deed-of-variation context)

### 31.9 Do not write

- "Marriage value still applies" (false post-LFRA-2024 commencement of the relevant provision — but verify which provisions are in force on write date).
- "Lease extension requires 2 years of ownership" (false post-LFRA-2024 abolition of the qualifying period — but verify commencement).
- "New lease term is 90 years" (false post-LFRA-2024; now 990 years for flats under LRHUDA 1993 — but verify commencement; existing claims notified pre-commencement use the old 90-year term).
- "Collective enfranchisement requires 100% participation" (false; 50%+ qualifying tenants required, not 100%).
- "Statutory extension and freehold acquisition have the same SDLT treatment" (false; extension is surrender-and-regrant under Sch 17A para 9; collective enfranchisement uses the FA 2003 s.74 special calculation; house freehold uses standard SDLT).
- "LFRA 2024 fully in force" (false at time of writing; phased commencement through 2026-2027).

### 31.10 Practical writing rule for sessions

Lead with the regime governing the leaseholder's property (LRA 1967 for houses; LRHUDA 1993 for flats). Specify the in-force LFRA 2024 position with WebFetch verification at write time. For SDLT, surface the correct treatment for the chosen route (extension = Sch 17A para 9; collective enfranchisement = s.74 special calc; house freehold = standard). Distinguish voluntary deed-of-variation outcomes (§ separate, where it covers them) from statutory rights (this §31). Cross-link to §1.I for the 5% HRAD surcharge interaction with extension premiums.
```

---

## Conductor review checklist

For each draft above:
- [ ] Read the proposed wording
- [ ] Edit for tone / style / framing (no em-dashes in user-facing copy is locked; HP-locks are internal so em-dashes are tolerated but the conductor may prefer to remove)
- [ ] Spot-verify 2-3 key statutory citations against legislation.gov.uk (sub-agents verified at write but reconductor confirmation is the locked discipline)
- [ ] Decide whether to apply LFRA 2024 commencement verification AT lock time or defer to Stage 2 (the lock should record the position as of 2026-05-26 and flag Stage 2 verification)
- [ ] Append to `house_positions.md` at the suggested anchor points
- [ ] Commit as `Stage 1b HP-locks: §1.K + §30 + §31 for MW1`

After commit:
- [ ] `New-Item briefs/property/megawave1/_signals/stage1b_signed_off.flag -Type File`
- [ ] Dispatch Stage 2 per `ROUND_6_7_SEQUENCING.md` §"Stage 2 — Brief extensions"

---

## Notes for Stage 2 sub-agents

When the HP-locks above commit, Stage 2 sub-agents will reference them via the brief's "House position reference" line. Verify each Stage 1 seed's `House position reference` includes the new lock numbers where applicable:

- A7, A10, A11, A12, A13 should reference §1.K (currently may reference §1 generic or "§1.K NEW HP-LOCK CANDIDATE")
- C2, C3, C4, C6, C8, C9 should reference §30 (currently reference "§30 NEW HP-LOCK NEEDED")
- A8, C13, C14, C15 should reference §31 (currently reference "§1.K NEW HP-LOCK CANDIDATE" — A8 + C13 — or no anchor — C14 + C15)

Stage 2 prompt template (`templates/rolling/stage2.tmpl.md`) instructs sub-agents to verify HP-lock references at extension time. The locks above being committed means Stage 2 sub-agents have authoritative anchors.
