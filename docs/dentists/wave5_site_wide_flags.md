# Wave 5 site-wide flags (dentists)

**Created:** 2026-07-09. **Status:** Pre-launch (no flags yet).

Sessions raise flags here when they surface site-wide issues during their work â€” existing-page stale figures, brief drift catches, cross-page forward-link needs, house-position extensions, etc. Flags do NOT block; sessions continue work after flagging.

**Discipline reminder:** session-time flag edits go to THIS file in main via absolute path `C:/Users/user/Documents/Accounting/docs/dentists/wave5_site_wide_flags.md`. NEVER commit flag edits on a worktree branch.

Flag types per NETNEW_PROGRAM Â§13.2:
- EXISTING_PAGE_STALE â€” existing page with stale figures/framing
- BRIEF_DRIFT â€” brief contains a statutory or factual error caught at write time
- INTERNAL_LINK â€” existing page should back-link to new Wave 5 page
- CROSS_BUCKET â€” forward-link needing back-patch at wave merge
- REDIRECT â€” legacy slug should repoint to your new page
- HOUSE_POSITION_EXTENSION â€” house position needs new sub-section or clarification (manager closes)
- AUTHORITY_GAP â€” HMRC manual / legislation page never cited on our site

Flags never block. Sessions continue work after flagging.

---

## F-40 | HOUSE_POSITION_EXTENSION | A3 | 2026-07-09

**Raised by:** Stage 1 sub-agent, pick A3 (dental-hygienist-dcp-tax-employment-status)

**Issue:** No Â§1.C DCP employment-status position exists in house_positions.md.
The existing Â§1 covers the BDA-model associate; Â§1.A covers IR35 locums; Â§1.B
covers the foundation dentist. Dental hygienists and therapists are a structurally
distinct group: no BDA model agreement, no NHS performers list registration, more
common PAYE or sessional-fee structures, and a direct-access model that does not
exist for associates. A blanket "DCPs are self-employed" lock would be incorrect;
a "depends on the facts" lock with the specific DCP-pattern factors mapped is
needed.

**Action required (conductor, Stage 1b gate):** Draft and lock Â§1.C covering DCP
employment-status analysis, including the sessional-fee vs direct-access spectrum,
the absence of a BDA-equivalent model agreement, and the consequence for mixed
PAYE + self-employment patterns. The A3 full brief cannot be accurately written
until this lock is in place.

**Severity:** HIGH (without a Â§1.C lock, the Stage 2 writer has no house position
to anchor DCP-status framing and may default to the associate position, which
would be incorrect).

**Status:** CLOSED 2026-07-09 Stage 1b: locked as HP SS1.C, commit 130f80df.

---

## F-41 | HOUSE_POSITION_EXTENSION | A3 | 2026-07-09

**Raised by:** Stage 1 sub-agent, pick A3 (dental-hygienist-dcp-tax-employment-status)

**Issue:** house_positions Â§8 locks Class 4 NIC rates (6%/2%) and confirms Class 2
removed from 6 April 2024, but does not state the Small Profits Threshold for
2026/27. The 2026/27 SPT of **Â£7,105** was verified at gov.uk
(gov.uk/self-employed-national-insurance-rates) on 2026-07-09. The A3 page needs
this figure to answer "what happens to NIC if my self-employed income is very
low?" (relevant for a hygienist with one day a week at a private practice).

**Action required (conductor, Stage 1b gate):** Extend Â§8 of house_positions to
state the SPT 2026/27 (Â£7,105) with a date tag and a note that the threshold is
reviewed annually. Low priority for pages that do not address low-profit scenarios,
but load-bearing for A3.

**Severity:** MEDIUM (the Class 4 rates are already correct; this is an additive
figure, not a correction).

**Status:** CLOSED 2026-07-09 Stage 1b: locked as HP SS8.A, commit 09f21feb.

---

## F-42 | HOUSE_POSITION_EXTENSION | A6 | 2026-07-09

**Raised by:** Stage 1 sub-agent, pick A6 (vat-loan-dental-practices-uk)

**Issue:** No HP position exists for the VAT late-payment penalty and interest
regime that replaced the default surcharge from 1 January 2023 (Finance Act 2021
Schedule 26). The A6 page compares a VAT loan against HMRC Time to Pay; the TTP
section cannot be written accurately without knowing: (a) what penalty/interest
accrues on a late VAT payment under the current regime; (b) whether TTP suspends
or reduces the late-payment interest; (c) HMRC's stated eligibility criteria for
a VAT TTP agreement; (d) the correct HMRC contact route (online payment plan vs
phone for VAT specifically).

**Action required (conductor, Stage 1b gate):** Fetch gov.uk/hmrc-internal-manuals
/debt-management-and-banking or VAT Notice 700/58 or HMRC's dedicated "If you
cannot pay your VAT bill" page. Confirm the FA 2021 Sch 26 penalty/interest
regime and TTP interaction. Lock as new Â§6.D or within Â§6 of house_positions.md
before Stage 2 runs for A6.

**Severity:** HIGH for the A6 brief specifically. TTP-vs-loan is a central
question of the page; without the locked position the writer cannot accurately
compare the two options.

**Status:** CLOSED 2026-07-09 Stage 1b: locked as HP SS6.D (3%/3%/10% p.a. penalties, interest from day 1, TTP effect; verified gov.uk), commit 4d03d4ab.

---

## F-43 | HOUSE_POSITION_EXTENSION | A6 | 2026-07-09

**Raised by:** Stage 1 sub-agent, pick A6 (vat-loan-dental-practices-uk)

**Issue:** Related to F-42 above. The VAT TTP mechanics for a business (not an
individual) have not been verified at primary source. The general HMRC payment-
plan page (gov.uk/difficulties-paying-hmrc, fetched 2026-07-09) confirms TTP
exists and is subject to an affordability assessment, but does not confirm VAT-
specific rules (surcharge pause, minimum payment required, maximum instalment
period). Without this the A6 TTP section must be hedged as "unverified at
primary source".

**Action required (conductor, Stage 1b gate):** Combine with F-42 resolution.
One fetch of the relevant VAT TTP source closes both flags.

**Status:** CLOSED 2026-07-09 Stage 1b: TTP mechanics locked in HP SS6.D, commit 4d03d4ab.

---

## F-WM-01 | HOUSE_POSITION_EXTENSION | GIA CGT rates 2026/27

**Raised by:** A2 sub-agent, 2026-07-09
**Source page:** briefs/dentists/wave5/wealth-management-for-dentists-uk.md
**Issue:** The October 2024 Budget raised CGT rates on non-residential/non-BPR
assets from 10%/20% to 18%/24%. The effective date (30 Oct 2024 or 6 Apr 2025)
and whether any further change applies for 2026/27 was not confirmed at
primary source during Stage 1. The wealth-management brief uses 18%/24% as a
working figure but the exact position must be locked in house_positions before
Stage 2 writes the bed-and-ISA and portfolio-harvest examples.
**Action for conductor:** WebFetch gov.uk/capital-gains-tax/rates + HMRC CG10715
to confirm 18%/24% rate and effective date. Add as Â§14 or sub-section of
existing CGT section in house_positions.md.
**Status:** CLOSED 2026-07-09 Stage 1b: CGT 18%/24% + AEA GBP3,000 verified gov.uk (from 6 Apr 2026 wording confirmed); locked in HP SS15, commit 657399fc.

---

## F-WM-02 | HOUSE_POSITION_EXTENSION | Close-company passive investment income rules post-2026

**Raised by:** A2 sub-agent, 2026-07-09
**Source page:** briefs/dentists/wave5/wealth-management-for-dentists-uk.md
**Issue:** The wealth-management page will cover investing surplus inside a
dental limited company. A close company holding investment assets may be
subject to additional income tax rules on undistributed investment income (CTA
2010 Part 10). The current position post-FA 2026 has not been verified at
primary source. Stage 2 cannot advise on "investing inside vs outside the
company" without confirming whether any close-company investment income
surcharge applies.
**Action for conductor:** Verify at legislation.gov.uk (CTA 2010 Part 10) and
HMRC CTM60700+ whether a surcharge on close-company passive income applies
and at what rate. Lock as a new HP sub-section before Stage 2 runs.
**Status:** CLOSED 2026-07-09 Stage 1b: CIHC CTA 2010 s.18N verified via CTM60710 â€” small-profits rate lost, NO undistributed-income surcharge; locked in HP SS15, commit 657399fc.

---

## F-101 | HOUSE_POSITION_EXTENSION + BRIEF_DRIFT | BPR FA 2026 reform figure INCORRECT in task prompt; s.165 holdover not in HP

**Raised by:** A1 sub-agent, 2026-07-09
**Source page:** briefs/dentists/wave5/dental-practice-succession-planning-family-transfer.md
**Severity:** CRITICAL (Issue 1) / HIGH (Issue 2)

**Issue 1 â€” BPR allowance figure in task prompt is wrong (CRITICAL):**
The A1 task prompt stated "IHT/BPR on practice assets INCLUDING the April 2026 reforms (Â£1m 100%-relief allowance then 50%)." Verification at legislation.gov.uk on 2026-07-09 (IHTA 1984 s.124D as inserted by FA 2026 Sch 12 para 17) shows the correct allowance is **Â£2.5m**, not Â£1m. The Â£1m figure does not appear in the enacted statute. The brief correctly uses Â£2.5m. Stage 2 must use Â£2.5m.
Action: conductor to lock the following as new **Â§4.B** in house_positions before Stage 2:
- Â£2.5m 100% BPR allowance (IHTA 1984 s.124D, FA 2026 Sch 12); 50% BPR on value above the allowance (s.104(1) baseline); rolling 7-year lookback reducing the allowance by prior usage; commencement 6 April 2026 (Sch 12 para 17); transitional for gifts made 30 Oct 2024 to 5 Apr 2026 where donor dies on/after 6 Apr 2026.
- s.113A condition: BPR applies on a PET only if the donee still holds qualifying business property at the transferor's death.
- Interaction with CGT base-cost uplift on death (TCGA 1992 s.62): a lifetime gift with holdover loses the uplift for the transferee; holding until death gives both full IHT BPR (if still qualifying) and CGT uplift. This is a key decision-tree point.

**Issue 2 â€” TCGA 1992 s.165 gift holdover not in house_positions (HIGH):**
s.165 is not referenced in current house_positions (Â§4 covers open-market sale BADR/s.162 only). The brief identifies the holdover-vs-BADR election as the core planning tension: holdover defers CGT but the transferee inherits a lower base cost; alternatively the transferor pays CGT at 18% BADR and banks the current rate.
Action: conductor to lock the following as new **Â§4.C** in house_positions before Stage 2:
- s.165 applies to unincorporated practice assets (used in the trade) and unquoted dental company shares (personal company: 5%+ voting rights per s.165(8)).
- s.165(3)(ba): does NOT apply if the transferee is a company (for share disposals).
- Joint claim required by transferor and transferee (or transferor alone if trustees).
- Holdover reduces the transferee's acquisition cost by the held-over gain; no CGT at disposal date for the transferor.
- Holdover-vs-BADR decision: holding over loses the BADR rate for the transferor; the transferee inherits a low base cost and will pay CGT at their future rate (standard rates or BADR if they independently qualify). Paying CGT now at 18% BADR uses the Â£1m lifetime limit. Planning tension must be framed as a modelling exercise, not a prescription.

**Status:** CLOSED 2026-07-09 Stage 1b: conductor re-verified FA 2026 Sch 12 at legislation.gov.uk â€” GBP2.5m allowance CONFIRMED (task-prompt GBP1m figure wrong). Locked as HP SS4.B + SS4.C (s.165), commit 519ec583.

---

## F-102 | EXISTING_PAGE_STALE | A4 | 2026-07-09

**Raised by:** Stage 1 sub-agent, pick A4 (buying-car-through-limited-company-dentist)

**Page:** `Dentists/web/content/blog/aia-allowance-dental-equipment-uk.md`

**Issue:** FAQ answer states "claim the simplified mileage rate of 45p per mile for the first 10,000 business miles" with no date qualification. AMAP car/van rate rose to 55p from 6 April 2026 (confirmed EIM31240, 2026-07-09). The 45p figure is stale for 2026/27 advice.

**Fix needed:** Update the FAQ answer to state 55p/mile from 6 April 2026 (55p first 10,000 miles, then 25p), replacing the bare 45p figure.

**Priority:** MEDIUM (a FAQ answer; the main AIA content is unaffected).

**Status:** CLOSED 2026-07-09 WRAP back-patch: aia-allowance FAQ now dates the rate (55p from 6 Apr 2026, 45p before).

---

## F-103 | EXISTING_PAGE_STALE | A4 | 2026-07-09

**Raised by:** Stage 1 sub-agent, pick A4 (buying-car-through-limited-company-dentist)

**Pages (two):**
1. `Dentists/web/content/blog/allowable-expenses-locum-dentists-uk-2025-26.md` -- metaDescription, FAQ answers and body all state 45p as the current mileage rate (body worked example: "10,000 miles at 45p = Â£4,500"). No date qualification. Stale for any 2026/27 reader.
2. `Dentists/web/content/blog/dental-associate-self-assessment-step-by-step.md` -- FAQ answer and body both state "45p per mile for the first 10,000 business miles" with no date qualifier. Stale.

**Issue:** Both pages present 45p as the live rate with no caveat that it changed from 6 April 2026. AMAP 55p/25p confirmed HMRC EIM31240 (2026-07-09).

**Fix needed:** Update each page to state 55p/mile from 6 April 2026, flag 45p as applying only to 2025/26 and earlier, and update any worked examples using 45p.

**Priority:** HIGH (both pages give current-year tax advice; a reader preparing their 2026/27 return would use the wrong rate).

**Status:** CLOSED 2026-07-09 WRAP back-patch: locum 2025/26 page annotated (45p correct for its year, rising note added); self-assessment page updated to 55p-dated.

---

## F-115 | WRITE_TIME_BLOCKER | A2 | 2026-07-09

**Raised by:** Stage 2 sub-agent, pick A2 (wealth-management-for-dentists-uk)

**Issue:** LISA property price cap and withdrawal charge could not be confirmed
at Stage 2. WebFetch of gov.uk/lifetime-isa/buying-property and
gov.uk/lifetime-isa/withdrawal-charges did not return the specific figures in
the fetched excerpt. The 25% withdrawal charge is widely cited but must be
verified at primary source before it is stated in the FAQ. The property price
cap (believed to be Â£450,000 but unconfirmed at Stage 2) must similarly be
fetched before lock.

**Action required (write-time agent):** Fetch both URLs above, extract the
current figures, and lock them into FAQ Q5 before publishing. If the cap or
charge has changed, update accordingly.

**Severity:** LOW (LISA content is a minor angle; the page is not primarily
about LISA. Does not block other sections.).

**Status:** CLOSED 2026-07-09 RUN-A2: property price cap £450,000 and withdrawal charge 25% verified gov.uk/lifetime-isa/withdrawing-money-from-your-lifetime-isa 2026-07-09. Both figures locked in FAQ Q5.

---

## F-116 | INTERNAL_LINK | A2 | 2026-07-09

**Raised by:** A2 write-time agent (wealth-management-for-dentists-uk)

**Issue:** The brief mandates a cross-link to dental-practice-succession-planning-family-transfer (A1) for the IHT/death-of-spouse ISA section (FAQ Q12). That page is committed in the A1 worktree but not yet merged or deployed. The A2 page references the topic in FAQ Q12 prose without a hard link ("speak to a specialist adviser" framing used as a holding position). Once A1 is merged and deployed, add a link from wealth-management-for-dentists-uk FAQ Q12 ("For wider estate planning...") to the succession page at /blog/goodwill-and-practice-sale/dental-practice-succession-planning-family-transfer.

**Priority:** LOW (the page is correct without it; this is an enhancement back-patch at wave merge).

**Status:** CLOSED 2026-07-09 WRAP: FAQ Q12 link to succession page added post-merge.

---

## F-104 | HOUSE_POSITION_EXTENSION | A4 | 2026-07-09

**Raised by:** Stage 1 sub-agent, pick A4 (buying-car-through-limited-company-dentist)

**Issue:** No house-positions section exists for company car BIK rules. The page requires locked positions on:
- ITEPA 2003 ss.114-148 car benefit mechanics (list price x appropriate percentage)
- 2026/27 appropriate percentages: EV (0g/km) 4%; petrol 120-124g/km 30%; petrol 125-129g/km 31% (fetched EIM24705 2026-07-09, but not locked as HP)
- 2027/28 EV trajectory (not yet fetched -- Stage 2 or conductor must extract from EIM24705)
- Fuel benefit (ITEPA 2003 s.149): 2026/27 multiplier not yet verified at primary source
- P11D / P11D(b) deadlines: 6 July; Class 1A NIC due 22 July electronic (not in HP; Class 1A rate 15% already locked Â§5/Â§13)
- VAT purchase block and 50% lease recovery (confirmed VAT Notice 700/64 2026-07-09 but not locked in HP)
- EV home-charging reimbursement advisory rate for directors: not yet verified

**Action required (conductor, Stage 1b gate):** Create new **Â§14** in house_positions.md covering company car BIK, appropriate percentages table, fuel benefit multiplier, P11D mechanics and VAT on cars/charging. Lock before Stage 2 runs for A4.

**Severity:** HIGH (all BIK calculations and the EV vs petrol worked comparison depend on these figures).

**Status:** CLOSED 2026-07-09 Stage 1b: locked as HP SS14 (EV 4%, Class 1A 15%, AMAP 55p verified; fuel multiplier + 2027/28 EV + FYA end date left as mandatory write-time fetches), commit 657399fc.

---

## F-105 INTERNAL_LINK â€” Wave 5 A1 back-patches needed (2026-07-09)

**Raised by:** Wave 5 A1 writer agent.
**Scope:** The following existing pages reference adjacent topics and should gain a back-link to the new dental-practice-succession-planning-family-transfer page once it is merged and deployed:

- dental-partner-buy-in-financing-tax-guide â€” add a sentence noting that where the incoming partner is a family member receiving a gift rather than a commercial buyer, holdover relief applies; link to the succession page.
- dental-partner-buy-out-retiring-partner-tax â€” add a sentence noting the alternative family-gift route for succession; link.
- exit-planning-3-5-years-out-uk-dental-practice â€” add a sentence pointing to the family-transfer succession page for owners who want to pass the practice internally rather than sell.
- section-162-incorporation-relief-dental-practice â€” add a sentence noting that incorporation is the precursor to a share gift that avoids NHS contract novation; link to succession page.
- usiness-asset-disposal-relief-dentists-what-qualifies â€” add a sentence covering the holdover-vs-BADR election in the context of a family transfer; link.
- sset-sale-vs-share-sale-dental-practice â€” add a sentence noting that the no-novation advantage of a share transfer applies equally to a family share gift; link.

**Priority:** low (back-patch at wave merge or next rewrite cycle). No stale figures involved.

## F-125 | INTERNAL_LINK | A3 | 2026-07-09

**Type:** INTERNAL_LINK (back-patch required)
**Page:** employing-first-dental-nurse-practice-manager-cost-tax
**Raised by:** A3 sub-agent (dental-hygienist-dcp-tax-employment-status)
**Detail:** The A3 brief mandates a bidirectional cross-link. The new DCP page links out to the nurse/payroll page. The nurse/payroll page must add a reciprocal link back: "If you are a dental hygienist or therapist working out your own tax position, see [dental-hygienist-dcp-tax-employment-status]." This back-patch is needed at wave merge.
**Status:** CLOSED 2026-07-09 WRAP: reciprocal link added to employing-first-dental-nurse page.

---

## F-126 | AUTHORITY_GAP | A3 | 2026-07-09

**Type:** AUTHORITY_GAP
**Page:** dental-hygienist-dcp-tax-employment-status (new)
**Raised by:** A3 sub-agent
**Detail:** GDC Direct Access guidance URL (gdc-uk.org) was not verified live at write time due to previous 404 on the direct sub-URL. The body cites the 2013 GDC direct-access decision but does not link to a GDC URL. If a stable GDC direct-access page URL is confirmed, add it to the body as an authority link.
**Status:** CLOSED 2026-07-09: low-priority; GDC direct-access referenced without hard URL on page (no unverified URL shipped).

---

---

## F-135 | INTERNAL_LINK | A4 | 2026-07-09

**Raised by:** RUN writer, pick A4 (buying-car-through-limited-company-dentist)

**Pages needing back-link to new page:**
- `writing-down-allowance-cars-dentists` â€” should link to the new decision-framework page from its intro or a "see also" note
- `can-dental-associates-claim-mileage-multiple-practices` â€” should note that for DIRECTORS (vs associates), the BIK decision framework lives on the new A4 page
- `dental-practice-profit-extraction-uk` â€” already links to a car planning angle; add link to the new page

**Action:** back-patch at wave merge (no commit needed now).

**Status:** CLOSED 2026-07-09 WRAP: all 3 back-links inserted.

---

## F-136 | WRITE_TIME_BLOCKER_RESOLVED | A4 | 2026-07-09

**Raised by:** RUN writer, pick A4 (buying-car-through-limited-company-dentist)

**Issue:** Three write-time fetches were required per the brief.

**Resolution status:**
1. **AER (advisory electric rate):** RESOLVED. From 1 June 2026: 7p/mile home charging, 15p/mile public charging. Confirmed gov.uk advisory fuel rates guidance 2026-07-09.
2. **VAT 50% lease restriction statutory basis:** RESOLVED. VAT Notice 700/64 section 4.2 (VATA 1994) confirmed: 50% of input VAT on lease rentals blocked for private use. Exact statutory regulation number (VAT Regs 1995 reg.63) not returned by WebFetch but principle confirmed from VAT Notice 700/64.
3. **EV appropriate % 2027/28 and 2028/29:** UNRESOLVED. EIM24705 only publishes through 2026/27. Autumn Budget 2024 policy paper URL returned 404. Page written around this: states rates will rise, directs reader to check EIM24705, does not assert a specific future %. Per brief instruction.

**Status:** CLOSED (items 1 and 2 resolved; item 3 written around per brief protocol).


---

## F-145 | INTERNAL_LINK | A6 | 2026-07-09

**Raised by:** RUN writer, pick A6 (vat-loan-dental-practices-uk)

**Issue:** dental-practice-working-capital-overdraft-finance-options should carry a back-link to
the new VAT loan page. The working-capital page covers general overdraft/revolving-credit/short-term
products; the VAT loan page covers the VAT-payment-specific cash-flow event. Readers of the
working-capital page who are VAT-registered will benefit from the specific cross-reference.

**Suggested addition:** one sentence in the working-capital page under its short-term loan section:
"For the specific case of funding a quarterly VAT bill or a CGS adjustment, see [vat-loan-dental-practices-uk]."

**Status:** CLOSED 2026-07-09 WRAP: back-link inserted in working-capital page.

---

## F-146 | INTERNAL_LINK | A6 | 2026-07-09

**Raised by:** RUN writer, pick A6 (vat-loan-dental-practices-uk)

**Issue:** dental-practice-cash-flow-management-tax-reserves should carry a back-link to the
new VAT loan page. The cash-flow page covers reserving for VAT payments in aggregate; the VAT
loan page covers what to do when the reserve is insufficient and a bill falls due.

**Suggested addition:** one sentence in the cash-flow page under the VAT-reserving section:
"If the reserve is not enough to cover the quarterly bill, see [vat-loan-dental-practices-uk]
for a comparison of short-term borrowing and HMRC Time to Pay."

**Status:** CLOSED 2026-07-09 WRAP: back-link inserted in cash-flow page.

---

## F-147 | EXISTING_PAGE_STALE | A6 | 2026-07-09

**Raised by:** RUN writer, pick A6 (vat-loan-dental-practices-uk)

**Issue:** Wave 5 A6 brief notes that the facial-aesthetics-vat-uk-dental-practices page states the
Â£85,000 VAT threshold (now Â£90,000 from 1 April 2024). This stale-figure flag was originally raised
at the Wave 2 HP-lock gate (docs/dentists/house_positions.md verification log entry for Â§6.A) and
passed to the rewrite hit-list at that time. Confirming it is still open as at 2026-07-09 and
should be prioritised in the next dentists rewrite batch.

**Status:** CLOSED 2026-07-09 WRAP: FALSE POSITIVE - facial-aesthetics page already states GBP90,000 (raised from GBP85,000 on 1 April 2024); no edit needed.
