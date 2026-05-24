# Property — house positions (locked figures and framings)

Locked by the manager (orchestrator session) on 2026-05-21 before Track 1 sessions launch. These are the positions every Track 1 rewrite and every net-new Track 1 page must use. Avoids the inter-session disagreement we hit on Property's 22/42/47% question during the priority rewrite.

If you (Session A/B/C) hit a factual conflict between a competitor source and a house position, **append a flag** to `docs/property/track1_site_wide_flags.md` with the contradicting source. Do not unilaterally re-frame; the orchestrator will reconcile.

---

## 1. SDLT — rates and surcharges (2026/27)

**Residential SDLT bands (England + NI), from 1 April 2025:**

| Band | Rate (no surcharge) | Rate + 5% additional dwellings surcharge | Rate for non-natural persons over £500k (Sch 4A FA 2003) |
|---|---|---|---|
| £0 to £125,000 | 0% | 5% | 15% |
| £125,001 to £250,000 | 2% | 7% | 15% |
| £250,001 to £925,000 | 5% | 10% | 15% (if dwelling >£500k) |
| £925,001 to £1,500,000 | 10% | 15% | 15% |
| Above £1,500,000 | 12% | 17% | 15% |

**Key dates and changes:**
- 0% nil band returned to £125,000 from **1 April 2025** (it had been temporarily £250,000 from 23 September 2022).
- Additional dwellings surcharge raised from 3% to **5%** with effect from transactions on or after **31 October 2024** (Autumn Budget 2024 / Finance (No.2) Act 2024).
- Multiple Dwellings Relief (MDR) **abolished** for transactions with an effective date on or after **1 June 2024** (Finance (No.2) Act 2024). Anti-forestalling rules prevent late claims via sub-sale or option arrangements.
- First-time buyer relief: 0% on the first **£300,000**, 5% on the portion £300,000–£500,000. Above £500,000 the relief is fully withdrawn.
- Non-UK resident purchaser surcharge: **2%** on top of the standard SDLT (residential, England + NI).

**Routes to mitigate the 5% surcharge that remain available post-1-June-2024:**
- **Six-dwellings rule — automatic non-residential treatment** (s.116(7) FA 2003). Where six or more separate dwellings are the subject of a single transaction involving the transfer of a major interest or grant of a lease, the dwellings are **automatically treated** as not being residential property for SDLT — non-residential rates apply (0% to £150k, 2% £150k–£250k, 5% above £250k) and no additional dwellings surcharge. This is a statutory deeming, not an election; no claim mechanism is required, the buyer reports on the non-residential basis. The rule survives the MDR abolition and is the principal portfolio-friendly route for genuine bulk acquisitions. **Correction logged 2026-05-22:** earlier versions of this doc cited "Sch 6B para 7 FA 2003" and described the rule as an "election". Both were wrong (Sch 6B para 7 is the definitional "what counts as a dwelling" rule). Verified against legislation.gov.uk on 2026-05-22; in force as of that date.
- **Genuine partnership incorporation** under FA 2003 Sch 15 para 10. The portfolio must already be held in a real, pre-existing letting partnership (with partnership tax returns, partnership accounting, joint borrowing) for HMRC to accept the chargeable consideration is reduced to nil under the connected-party formula. Heavily scrutinised; not a quick fix for a husband-and-wife joint-ownership portfolio.
- **Sub-sale relief** under FA 2003 s.45 — narrow application; useful for genuine pre-completion onward sales, NOT for retrofit incorporation of an existing portfolio.

**Do not write:** "MDR is available", "MDR can reduce SDLT on portfolio incorporation", "the additional dwellings surcharge is 3%". All wrong.

**Scottish equivalent (LBTT):** Land and Buildings Transaction Tax via Revenue Scotland. Bands are different from SDLT. Additional Dwelling Supplement (ADS) is **8%** (raised from 6% on 5 December 2024). Use Revenue Scotland figures, not SDLT.

**Welsh equivalent (LTT):** Land Transaction Tax via Welsh Revenue Authority. Bands and rates differ from SDLT. Higher rates for additional properties.

### 1.A Partnership SDLT relief — FA 2003 Sch 15 — Wave 7 extension (locked, 2026-05-24)

**Scope.** §1.A extends the §1 brief Sch 15 para 10 note with the full sum-of-lower-proportions (SLP) mechanics for partnership transfers — both **into** a partnership (Sch 15 paras 10-13) and **out of** a partnership to a partner or connected person (Sch 15 paras 18-20). Wave 7 Bucket C C9 (Partnership SDLT relief) cites §1.A directly.

- **Statutory hooks:** FA 2003 Schedule 15 paras 10-13 (transfer into partnership), paras 14-17 (transfers of partnership interests), paras 18-20 (transfer from partnership to partner), para 17A (3-year anti-withdrawal rule), para 34 (partnership share definition by reference to income-profit entitlement). Verified at https://www.legislation.gov.uk/ukpga/2003/14/schedule/15 on 2026-05-24.
- **HMRC manual anchor:** **SDLTM33500+** (Partnership transactions). Confirmed current (last updated 20 February 2026) at https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm33500 on 2026-05-24. F-21 / Wave 6 confirmed this is the correct partnership-transfer reference; sessions must NOT cite the s.75A general anti-avoidance manual at **SDLTM09050+** for partnership-transfer mechanics (s.75A is the Ramsay anti-avoidance code, separate territory).
- **Transfer INTO partnership — Sch 15 para 10 + para 12 SLP calculation:**
  - **Chargeable consideration formula:** `Chargeable consideration = MV × (1 − SLP%)` where MV is market value of the chargeable interest and SLP is the sum of the lower proportions for partners connected with the transferor(s).
  - **Five-step SLP calculation (Sch 15 para 12):**
    1. **Identify relevant owners** — persons entitled to a proportion of the chargeable interest pre-transaction who become partners post-transaction OR are connected with partners post-transaction (within CTA 2010 s.1122).
    2. **Identify corresponding partners** — for each relevant owner, the partners who are that owner or are connected with that owner.
    3. **Apportion the relevant owner's pre-transaction proportion** among their corresponding partners (free-choice apportionment within statutory limits).
    4. **Each partner's lower proportion** = the lesser of (a) the attributable proportion under step 3 and (b) the partner's post-transaction partnership share (per para 34, profit-sharing ratio).
    5. **Sum the lower proportions** across all partners — this is the SLP%.
  - **Effect:** the higher the SLP (more partners connected with transferor; tighter post-transfer partnership shares), the lower the chargeable consideration. **100% SLP = zero chargeable consideration = zero SDLT.** This is the route by which a sole-proprietor letting business transferring portfolio into a connected partnership (e.g. husband-and-wife partnership, family LLP) may achieve zero-SDLT incorporation **IF** the partnership pre-exists genuinely (not a contrivance) and the partnership shares align with the SLP calculation.
- **Transfer FROM partnership to partner — Sch 15 paras 18-20:**
  - Mirror SLP mechanic operates in reverse. Chargeable consideration = MV × (1 − SLP%) on transfer out to a partner. SLP calculation uses the same connected-party + partnership-share aggregation.
- **3-year anti-withdrawal rule — Sch 15 para 17A:**
  - Within **3 years** of a Sch 15 para 10 / 14 transfer-in, any "qualifying event" (capital withdrawal from partnership, repayment of partner loan, reduced interest, return of capital in any form) is itself a chargeable transaction.
  - Charge cannot exceed MV of the chargeable interest originally transferred, reduced by any amount already charged.
  - This is the **anti-Ramsay safeguard** within Sch 15: prevents the SLP relief being used as a quick-flip route where the partner exits within 3 years.
- **Partnership share definition — Sch 15 para 34:**
  - "Partnership share" at a time = the proportion in which the partner is entitled at that time to share in the **income profits** of the partnership.
  - **Not capital profits**, **not voting rights**, **not asset entitlement on dissolution** — income-profit entitlement is the operative metric. Sessions writing on Wave 7 C9 must distinguish; partnership agreements with mismatched income vs capital ratios produce non-obvious SLP outcomes.
- **Connected persons — CTA 2010 s.1122:**
  - Sch 15 imports the CTA 2010 s.1122 connected-persons definition (spouse, civil partner, lineal ascendants/descendants, siblings, spouse-of-sibling chains; controlled-company chains).
  - **Cohabitants are not connected** under s.1122. A cohabiting unmarried couple cannot use the SLP relief at the partnership-transfer-in stage in respect of each other (this is a common drift in popular commentary).
- **Genuine-partnership requirement (anti-Ramsay defence under s.75A FA 2003 + HMRC enquiry practice):**
  - Sch 15 SLP is available only where there is a **real, pre-existing partnership** with substance: separate partnership tax returns under SA800; partnership accounting records; joint borrowing where mortgaged; partnership decision-making structures.
  - **HMRC's standard enquiry attack** is that the "partnership" is a paper contrivance entered into just before incorporation to access SLP — the s.75A general anti-avoidance rule (Ramsay code, SDLTM09050+) is then invoked to ignore the partnership for SDLT purposes.
  - **Evidential threshold (post-Project Blue):** at least 2 years of genuine partnership operation pre-transfer with HMRC-filed partnership returns is the working safe harbour; shorter periods invite enquiry.
- **Cross-references:** §21 (LtdCo + FIC), §23 (Welsh LTT + Scottish LBTT — note these have their own partnership-relief frameworks under LTTA 2017 Sch 7 and LBT(S)A 2013 Sch 17 respectively; not identical to FA 2003 Sch 15).
- **Practical writing rule for sessions (Wave 7 C9):** lead with the **substance-requirement** (genuine pre-existing partnership) as the threshold; then mechanics of the SLP calculation with a worked example; then the 3-year para 17A anti-withdrawal trap; then the s.75A enquiry-attack architecture. Avoid framing Sch 15 as a "loophole" — the route is statutorily authorised but tightly conditioned.

### 1.B Linked transactions — FA 2003 s.108 — Wave 7 extension (locked, 2026-05-24)

- **Statutory hook:** FA 2003 s.108. **Manager_prompt typo correction:** Manager_prompt §19 Wave 7 §1.X picks reference "SDLT linked-transactions Sch 4 para 5" — Sch 4 para 5 is actually the **exchanges** provision (consideration partly in land), not the linked-transactions definition. The linked-transactions hook is s.108 (rates aggregation) plus para 5 only for the partial-consideration exchange case.
- **Definition — s.108(1):** Transactions are "linked" where they form "**part of a single scheme, arrangement or series of transactions between the same vendor and purchaser or persons connected with them**". Connected persons defined by reference to CTA 2010 s.1122.
- **Aggregation mechanism — s.108(2):** Where linked transactions share an effective date, the purchaser(s) may file a single Land Transaction Return treating the linked transactions as one notifiable transaction. **Effect:** total chargeable consideration is aggregated to determine the SDLT rate applicable across all the linked transactions (so two £400k purchases of separate properties that ARE linked get rated as one £800k purchase, attracting higher-band rates on the combined consideration).
- **Joint purchasers — s.108(3):** Where multiple purchasers file jointly under s.108(2), joint-purchaser rules (s.103 FA 2003) apply as if the linked transactions are a single transaction with joint purchasers.
- **Scottish + Welsh exclusion — s.108(1A):** Transactions involving Scottish or Welsh land are **excluded** from the linked-transactions definition. Cross-border portfolio transactions therefore use the appropriate jurisdiction's linked-transactions definition (LBTT(S)A 2013 s.57; LTTA 2017 s.65). Sessions writing on cross-border landlord transactions must use the right jurisdictional anchor.
- **The 6-dwellings rule interaction (s.116(7)) — §1 main text already covers**: where 6+ dwellings are subject to a single transaction OR linked transactions, the non-residential treatment applies. The linkage discipline is therefore **load-bearing for the 6-dwellings rule** — sessions must identify whether multiple property contracts are linked under s.108 before invoking the 6-dwellings auto-relief.
- **HMRC manual anchor:** SDLTM30100+ (linked transactions general); SDLTM30200+ (specific scenarios).
- **Practical writing rule for sessions (Wave 7 C5):** the test is **"single scheme, arrangement or series"** between same/connected parties — purposive, not formalistic. HMRC's enquiry pattern: separate contracts on the same day to the same buyer = linked; contracts within 6 months between connected parties = high risk of linkage; contracts more than 12 months apart, separate negotiations, unrelated economic purpose = likely not linked. Sessions writing on Wave 7 C5 must surface the **connected-persons + arrangement test** as the operative two-part check.

### 1.C Bewley uninhabitable-property test — Wave 7 extension (locked, 2026-05-24)

- **Statutory hook:** FA 2003 s.116(1)(a) — definition of "residential property": "a building that is used or **suitable for use as a single dwelling**, or is in the process of being constructed or adapted for such use". The "suitable for use" limb is the operative test for derelict / uninhabitable acquisitions.
- **Leading authority:** **P N Bewley Ltd v HMRC [2019] UKFTT 65 (TC)** (TC07097). Bungalow purchased for £200k+, derelict, no functioning kitchen, no functioning bathroom, asbestos throughout, surveyor reported "structure dangerous". FTT held the property was **NOT residential property** within s.116(1)(a) at the effective date — the £150k non-residential bands applied (saving the buyer £6,000+ in SDLT). The reasoning: a property requiring complete reconstruction of major elements is not "suitable for use" as a dwelling; minor repair or refurbishment requirements do not change residential classification, but structural / asbestos / utilities-failure does.
- **Subsequent narrowing — the post-Bewley line:**
  - **Hyman v HMRC [2019] UKFTT 469** (and on appeal UT [2021] UKUT 68; CA [2022] EWCA Civ 185): the "suitable for use" test is **"in principle suitable"** — minor repairs do not undermine residential character.
  - **Mudan v HMRC [2023] UKFTT 317** + **MHB Ltd v HMRC**: properties with intact structure but unmodernised condition (no functioning kitchen, no central heating, decor dated, electrical wiring 1970s) remain residential — the unmodernised state does not bring them within Bewley.
  - **Brown v HMRC [2024] UKFTT** + subsequent FTT cases continue the narrowing trajectory.
  - **Current operational position (2026):** Bewley applies only to properties **substantially structurally dangerous, contaminated (asbestos, mould requiring removal), or requiring complete reconstruction of major elements**. Run-of-the-mill "fixer-upper" purchases do NOT qualify.
- **HMRC's enquiry stance.** HMRC routinely challenges Bewley-style filings; the practical burden is on the buyer to evidence the structural / contamination state at the effective date (surveyor reports contemporaneous with completion; asbestos assessments; planning records showing the property as non-habitable). Many post-2019 buyer claims of non-residential classification have failed on enquiry.
- **Practical writing rule for sessions (Wave 7 C8):** lead with **Bewley as the narrow exception**, not the rule. Surface the post-Bewley narrowing (Hyman / Mudan / MHB / Brown). Set the operational test as: **"would a surveyor, on the effective date, certify the property as dangerous to occupy and requiring complete reconstruction of major elements?"** If yes → arguable Bewley; if it's just unmodernised → residential. Cite HMRC's enquiry-stance reality (most buyer Bewley claims fail).

### 1.D Spouse/civil-partner transfers on divorce or separation — FA 2003 Sch 3 para 3 — Wave 7 extension (locked, 2026-05-24)

- **Statutory hook:** FA 2003 Schedule 3 para 3 — exempt transactions on dissolution of marriage or civil partnership. Verified at https://www.legislation.gov.uk/ukpga/2003/14/schedule/3 on 2026-05-24.
- **Exemption scope.** A land transaction is exempt from SDLT where it is effected:
  - On granting (or in connection with) **divorce, judicial separation, or annulment** between spouses, OR equivalent dissolution / separation of civil partnership;
  - Pursuant to an **order of the court** under Matrimonial Causes Act 1973 ss.22A (maintenance pending suit), 23A (financial provision orders), 24A (property adjustment orders), OR the equivalent civil-partnership provisions under Civil Partnership Act 2004 Schedule 5;
  - OR pursuant to **"any agreement made in contemplation of or otherwise in connection with the dissolution"** of the marriage/CP (so consent orders + separation agreements + post-decree property settlements all qualify).
- **Time-of-transfer flexibility.** Sch 3 para 3 does not impose a strict deadline — the exemption applies whether the transfer is contemporaneous with the divorce decree or executed later pursuant to a divorce-related order or agreement. Common practice: transfer effected after Decree Absolute pursuant to the financial order.
- **What the exemption does NOT cover:**
  - **Pre-divorce inter-spousal transfers** (these are exempt under different rules — Sch 3 para 1 or the FA 2003 s.43 chargeable-consideration-nil treatment where no consideration passes). Sch 3 para 3 is specifically the dissolution-related route.
  - **Transfers to third parties pursuant to a divorce.** A husband-to-trust-for-children transfer pursuant to a divorce order is NOT exempt under para 3 (the exemption is spouse-to-spouse only); third-party transfers are chargeable.
  - **Mortgage assumption as consideration.** Where the receiving spouse takes over an existing mortgage, HMRC has historically argued the assumed mortgage liability is chargeable consideration; the consensus is that **on a Sch 3 para 3 exempt transfer the assumption is also exempt** (the policy intent is full no-SDLT treatment of divorce-driven property reallocation), but sessions must surface the historic ambiguity.
  - **5% additional dwellings surcharge.** The Sch 3 para 3 exemption removes SDLT; the question of whether the surcharge would apply absent the exemption is academic in the divorce context — exempt is exempt.
- **CGT no-gain-no-loss interaction (TCGA 1992 s.58 / s.225B).** Divorce-context transfers also benefit from CGT no-gain-no-loss treatment under s.225B (CGT main-residence treatment continues for the leaving spouse) and the s.58 spouse-transfer rule (where transfer is during a tax year of separation but before Decree Absolute, s.58 still applies). Sessions writing on Wave 7 C7 must combine both: SDLT-exempt under Sch 3 para 3 + CGT no-gain-no-loss under s.58/s.225B.
- **HMRC manual anchor:** SDLTM07650+ (divorce-related transactions); CG65000+ (CGT on divorce, with cross-reference to s.58/s.225B).
- **Practical writing rule for sessions (Wave 7 C7):** the SDLT-side is mechanically simple (Sch 3 para 3 exempt) — most of the writing value is on (a) the CGT/SDLT combination, (b) the third-party-transfer trap, (c) the mortgage-assumption historic ambiguity, and (d) the cross-border + non-English-court interaction (Scotland uses LBTT(S)A 2013 Sch 1 para 6; Wales uses LTTA 2017 Sch 3 para 6; recognition of foreign divorce orders requires Family Law Act 1986 + recognition tests).

### 1.E Citations for §1.A-§1.D (extends §1)

- **FA 2003:** s.108 (linked transactions); s.116 (residential property definition); Sch 3 paras 1, 3, 4 (exempt transactions); Sch 4 para 5 (exchanges); Sch 15 paras 10-20, 34 (partnerships).
- **CTA 2010:** s.1122 (connected persons).
- **MCA 1973:** ss.22A, 23A, 24A (financial relief / property adjustment orders).
- **Civil Partnership Act 2004:** Sch 5 (financial relief / property adjustment on dissolution).
- **TCGA 1992:** s.58 (spouse no-gain-no-loss); s.225B (main-residence on divorce).
- **Case law:** P N Bewley Ltd v HMRC [2019] UKFTT 65 (TC) TC07097; Hyman v HMRC [2019] UKFTT 469 + [2021] UKUT 68 + [2022] EWCA Civ 185; Mudan v HMRC [2023] UKFTT 317; MHB Ltd v HMRC; Brown v HMRC [2024] UKFTT.
- **HMRC manuals:** SDLTM07650+ (divorce); SDLTM09050+ (s.75A Ramsay general anti-avoidance — NOT partnership-transfer anchor); SDLTM30100+ (linked transactions); SDLTM33500+ (partnership transactions per Sch 15).

### 1.F Do not write (extends §1 main do-not-write) — Wave 7 SDLT extension

- "Sch 15 SLP relief is a loophole" (false in framing; statutorily authorised relief with substance + anti-Ramsay safeguards; sessions should use neutral language).
- "A cohabiting unmarried couple can use Sch 15 SLP" (false; cohabitants are not connected under CTA 2010 s.1122; the SLP route requires connected partners).
- "Sch 15 para 17A anti-withdrawal applies for 7 years" (false; the period is **3 years** under para 17A).
- "Partnership share for SLP is voting/capital share" (false; **income-profit-share** is the operative metric under para 34; capital/voting share is irrelevant to SLP calculation).
- "SDLTM09050 is the partnership-transfer reference" (false; SDLTM09050+ is the s.75A Ramsay general anti-avoidance manual; partnership-transfer is at SDLTM33500+. F-21 / Wave 6 confirmed).
- "Scottish and Welsh land aggregate with English land for s.108 linked transactions" (false; s.108(1A) excludes them; use jurisdictional definitions LBTT(S)A 2013 s.57 / LTTA 2017 s.65).
- "Bewley applies to any unmodernised property" (false; Bewley is a narrow exception for **substantially structurally dangerous / contaminated / requiring complete reconstruction** properties; post-Hyman / Mudan / MHB / Brown narrowing has tightened the test substantially).
- "Sch 3 para 3 divorce exemption covers transfers to children pursuant to a divorce order" (false; exemption is spouse-to-spouse only; transfers to third parties are chargeable).
- "Sch 3 para 3 requires a Decree Absolute before applying" (false; exemption applies to transfers pursuant to a divorce-related order or "agreement in contemplation of dissolution" — pre-decree settlements qualify if the dissolution context is established).
- "Linked transactions definition is at Sch 4 para 5 FA 2003" (false; Sch 4 para 5 is the exchanges provision; linked-transactions definition is at **s.108 FA 2003**).

**End Wave 7 §1.A-§1.F extension.** Wave 7 Bucket C C5 (linked transactions), C7 (divorce/separation transfer), C8 (Bewley uninhabitable test), C9 (Sch 15 partnership relief) cite §1.A-§1.D directly. Any contradiction between competitor sources and §1.A-§1.D, flag in `wave7_site_wide_flags.md`.

---

## 2. ATED (Annual Tax on Enveloped Dwellings) — 2026/27

**Bands (chargeable amounts for the year 1 April 2025 to 31 March 2026):**

| Property value | Annual charge 2025/26 |
|---|---|
| £500,001 to £1m | £4,450 |
| £1m to £2m | £9,150 |
| £2m to £5m | £31,050 |
| £5m to £10m | £72,700 |
| £10m to £20m | £145,950 |
| Over £20m | £292,350 |

Bands are indexed annually (CPI for the year ended September). 2026/27 figures are uplifted; use the gov.uk-published current-year figures rather than hard-coding old amounts.

**Key mechanics:**
- ATED applies to **non-natural persons** (companies, partnerships with corporate members, collective investment schemes) holding a single UK residential dwelling worth more than **£500,000** on 1 April (or at acquisition).
- **ATED-related CGT** was abolished from April 2019; non-resident company gains now fall under the standard non-resident CGT regime.
- **Reliefs claimed on the ATED return**: rental property let to an unconnected tenant on commercial terms (the most common relief for BTL ltd cos), property developer trading stock, property trader, farmhouse, employee accommodation, dwellings open to the public, charitable use, registered providers of social housing, dwellings being demolished or converted.
- **Filing:** ATED return due by **30 April** in the year of charge. Late filing penalties of £100 / £200 / £300 escalating + tax-geared penalties. ATED returns must be filed even where a relief is claimed (claim-only return).

**Do not write:** "ATED-related CGT applies to gains over £500k" (abolished). "Reliefs are automatic" (must be claimed on the return).

---

## 3. MTD for ITSA — applicability to landlords

**Locked schedule:**
- **From 6 April 2026:** mandatory for sole-trader landlords and self-employed individuals with qualifying income above **£50,000**.
- **From 6 April 2027:** threshold drops to **£30,000**.
- **From 6 April 2028:** threshold drops to **£20,000**.
- **Limited companies are outside MTD for ITSA entirely.** They file annual CT600s.
- **General partnerships** are deferred. The roadmap originally proposed April 2027 for all-individual-member partnerships; the latest HMRC position defers to a date to be confirmed. Treat as "MTD for partnerships expected in a later phase, no confirmed date as of May 2026."
- **Joint-property owners** test the threshold against their **share** of gross income, not the property's total.

**Penalties from 6 April 2026:**
- Points-based late submission regime: 1 point per missed quarterly update; **£200** fixed penalty at the 4-point threshold (within any 24-month rolling window).
- Late payment, MTD ITSA accelerated schedule (Spring Statement 2025): 3% from day 15, +3% from day 30, +10% per annum from day 31. The legacy 31/46/91 day-triggers at 2%/2%/4% remain for non-MTD income tax + VAT only. (See §19.7 for full mechanics and Correction logged 2026-05-22.)

**Do not write:** "£10,000 threshold" (abandoned in late 2022). "MTD applies to limited companies" (wrong). "MTD applies to GP partnerships from April 2026" (deferred).

---

## 4. Section 24 — finance cost restriction

**Locked mechanics for individual residential landlords:**
- Mortgage interest and other allowable finance costs are **NOT deducted from rental profit** for income tax purposes.
- Instead, a **20% basic-rate tax credit** is applied against the overall income tax liability.
- **Credit cap = the lower of three figures:**
  1. 20% of the finance costs of the year
  2. 20% of the residential rental profit before any finance cost deduction
  3. 20% of total income above the personal allowance (i.e. taxable income)
- Where the credit is restricted by the cap, the un-credited portion **carries forward** indefinitely.
- **Applies to individuals, partnerships, and trusts.** Does NOT apply to limited companies (companies deduct interest in full pre-CT).
- **Furnished holiday lets:** S24 did not apply while FHL was a separate regime; from 6 April 2025 (FHL abolition) it now applies to former FHL properties under the standard residential let rules.

**Interaction with the £100k personal allowance taper:** the credit doesn't undo the taper. Rental profit is added to total income BEFORE the credit; £1 of personal allowance is lost for every £2 above £100,000, fully eliminated at £125,140. This is the "60% effective marginal rate" trap.

**Do not write:** "Mortgage interest is deductible 100%" (only for companies). "S24 is repealed" (in force). "S24 doesn't apply to higher-rate taxpayers" (it does — that's the point).

---

## 5. CGT on UK residential property — 2026/27

**Rates and allowances:**
- **Annual exempt amount (AEA):** **£3,000** per individual (£1,500 for most trusts). Reduced from £6,000 (2023/24) and £12,300 (pre-April-2023).
- **Residential property CGT rates** (from 30 October 2024, Autumn Budget 2024): **18%** basic rate and **24%** higher rate.
- **Non-residential / commercial gains** aligned to the same 18%/24% rates from 30 October 2024.
- **Trustees and personal representatives** pay 24% throughout (no basic-rate slice).
- **Indexation allowance** (frozen at December 2017 since April 2018) still applies to companies' pre-2018 base costs; does NOT apply to individuals.

**60-day reporting (UK property service):**
- **UK residents** must file a CGT-on-UK-property return AND pay the tax within **60 days of completion** **where CGT is due**.
- Where the gain is fully covered by PRR, losses, or the AEA, no 60-day filing is required for UK residents.
- **Non-UK residents** must file the 60-day return for **every UK land disposal**, regardless of tax due (residential, commercial, indirect interests in property-rich entities). Rebasing applied at 5 April 2015 for residential and 5 April 2019 for non-residential.
- Late filing penalties: £100 fixed + £10/day from day 91 + 5% of tax due at 6 and 12 months. Tax-geared penalties for prompted/unprompted/deliberate disclosure under the standard schedule.

**Reliefs:**
- **Private Residence Relief (PRR / PPR):** s.222–226 TCGA 1992. Final **9 months** of ownership always qualify as deemed occupation where the property was at some point a main residence. Various deemed-occupation periods (job-related, working away from home, etc).
- **Letting Relief:** restricted from 6 April 2020 — only available where the owner shared occupation with the tenant during the let period.
- **Spouse / civil partner transfers:** no-gain-no-loss under s.58 TCGA 1992. Spousal transfers happen at base cost.
- **Section 162 incorporation relief:** automatic relief from CGT on incorporation of a business (including a property letting business) where ALL assets (other than cash) are transferred in exchange wholly or partly for shares. HMRC's position on whether residential letting constitutes a "business" requires evidence of business activity — usually a portfolio of multiple properties under active management. Ramsay v HMRC [2013] sets the threshold.

**Business Asset Disposal Relief (BADR):** does NOT apply to investment property disposals. Applied to former FHL until 5 April 2025 only. BADR rates have also risen: 10% to 14% from 6 April 2025, 14% to 18% from 6 April 2026.

**Do not write:** "CGT rate is 28%" (was, until 30 October 2024). "Letting Relief is available for all rental periods" (only shared-occupation since April 2020). "60-day applies to all UK residents' disposals regardless of tax due" (only where tax is due).

---

## 6. FHL — abolition transition

**Locked mechanics:**
- The Furnished Holiday Lettings tax regime was **abolished from 6 April 2025**.
- Former FHL properties are now taxed as standard residential rental property: S24 applies, FHL-specific reliefs (capital allowances, BADR, pension earnings, no-restriction on losses) are no longer available.
- **Transitional rules:**
  - **Pooled capital allowances** brought forward from FHL ownership continue to receive writing-down allowances post-abolition (in the new residential property business).
  - **Losses** from the former FHL business are ring-fenced and can be carried forward against future profits of the residential property business.
  - **Anti-forestalling rules** prevent artificial pre-abolition disposals to lock in BADR — applies to disposals between announcement (6 March 2024) and abolition (5 April 2025) where conditions are met.
  - **Joint ownership:** the 50/50 spousal default for non-FHL property applies post-abolition. Form 17 elections previously not needed for FHL income split now require an election.

**Do not write:** "FHL still applies" (abolished). "BADR is available on FHL disposals" (only until 5 April 2025). "Pension earnings include FHL profits" (only until 5 April 2025).

---

## 7. April 2027 property income tax surcharge — house framing

**Locked framing:** A 2% surcharge on UK property income, on top of standard income tax rates, was **announced in the Autumn Budget** and is **scheduled to take effect from 6 April 2027**. The legislation sits in the **draft Finance Act 2026**, awaiting Royal Assent.

For **2026/27**, the standard UK income tax rates of **20%, 40%, 45%** continue to apply to rental income alongside other income.

For **2027/28** (subject to Finance Act 2026 receiving Royal Assent), the surcharge produces effective property income rates of **22% basic, 42% higher, 47% additional**.

Plan against these scheduled rates while noting they require enactment to crystallise. Avoid asserting them as "confirmed law" — they are scheduled and in draft legislation.

**Do not write:** "22/42/47 is speculation" (it's announced and scheduled). "22/42/47 is confirmed law" (pending Royal Assent). "Property income is taxed at 20/40/45 in 2027/28" (wrong if the FA passes).

---

## 8. Lifetime Allowance — abolished, replaced framework

**Locked figures from 6 April 2024:**
- **Lifetime Allowance (LTA): abolished**. The £1,073,100 cap no longer exists as a separate concept.
- Replaced by:
  - **Lump Sum Allowance (LSA):** **£268,275** lifetime cap on tax-free lump sum withdrawals (25% of the old LTA).
  - **Lump Sum and Death Benefit Allowance (LSDBA):** **£1,073,100** lifetime cap on total tax-free lump sums including death benefits.
- **Annual Allowance:** £60,000 (unchanged from 2023/24).
- **Tapered Annual Allowance** applies where adjusted income exceeds £260,000 AND threshold income exceeds £200,000. Floor: £10,000.
- **Money Purchase Annual Allowance (MPAA):** £10,000.

**Do not write:** "LTA is £1,073,100" (abolished). "Pension transfers are subject to LTA" (LSA / LSDBA replace it).

---

## 9. IHT — landlord-relevant positions

**Locked figures 2026/27:**
- **Nil-rate band (NRB):** **£325,000**, frozen until 5 April 2031 (further extended; gov.uk IHT thresholds table shows the current row as "from 6 April 2009 to 5 April 2031" — verified 2026-05-23 per Wave 6 F-3).
- **Residence Nil-Rate Band (RNRB):** **£175,000**, frozen until 5 April 2031.
- **RNRB taper:** £1 reduction for every £2 of estate value above £2 million.
- **IHT rate:** 40% (36% where 10%+ of net estate goes to charity).
- **Pensions in IHT scope:** from **6 April 2027** (announced in Autumn Budget 2024), unused defined-contribution pension funds will be brought into the deceased's estate for IHT purposes. Plan against this; it materially affects estate planning for landlord-pension-rich clients.

**Business Property Relief (BPR) / Agricultural Property Relief (APR):**
- **Standard residential BTL does NOT qualify** for BPR. Pawson v HMRC [2013] is the leading authority — investment activity (collecting rent) doesn't meet the "wholly or mainly trading" test.
- **FHL did historically qualify in some cases** but the position was always borderline; post-abolition (April 2025) FHL properties categorically do not qualify.
- **Active hotel/serviced-accommodation businesses with substantial services** can qualify but the bar is high (managed kitchen, daily cleaning, breakfast service, etc — see HMRC's Pawson successor cases).
- **Combined £1 million BPR + APR cap announced for 6 April 2026:** the previously-unlimited 100% relief on qualifying agricultural and business property is being capped at £1 million combined per estate. Excess gets 50% relief (i.e. effective 20% IHT). Affects farming families and trading-business owners; rarely affects standard BTL landlords (who don't qualify for BPR anyway).

**Do not write:** "BTL qualifies for BPR" (Pawson). "RNRB is £125,000" (wrong, £175,000 since 2020). "Pensions are outside IHT" (true until 5 April 2027, then false).

---

## 10. Double Taxation Agreements (DTAs) — general framing

**Locked structure:**
- The UK has DTAs with ~130 jurisdictions, primarily following the OECD Model Tax Convention.
- **Article 6 (immovable property)** in OECD-model treaties: property income is taxable in the country where the property is situated. The UK retains primary taxing rights over UK property income.
- **Article 13 (capital gains):** gains on UK immovable property are taxable in the UK regardless of seller residence (under treaty Article 13.1 / 13.4).
- **Article 22 (other income)** and tie-breaker rules in **Article 4 (residence)**: relevant where a UK-resident landlord becomes non-UK-resident and the question of dual residence arises.
- **Foreign tax credit:** UK residents with overseas property income claim relief for tax paid abroad under UK foreign tax credit rules (s.18 / s.130 TIOPA 2010 etc).
- **Non-resident landlord (NRL) scheme:** statutory, not treaty-based. Tenants/agents withhold basic rate (20%) on rent paid to a non-resident landlord, unless the landlord holds an NRL1 / NRL2 / NRL3 approval to receive rent gross.

**Do not write:** "DTAs eliminate UK tax on UK property for non-residents" (false; UK retains taxing rights under Art. 6 / 13). "NRL scheme is treaty-based" (statutory). "Foreign tax credit is automatic" (must be claimed).

---

## 11. Companies House reforms / ECCTA / Register of Overseas Entities

**Locked timeline:**
- **Economic Crime and Corporate Transparency Act 2023 (ECCTA)** — broad reforms to Companies House.
- **ID verification at Companies House:** voluntary from 8 April 2025, **mandatory from autumn 2025 / 2026** (phased rollout). Directors and PSCs must verify identity directly with Companies House or through an Authorised Corporate Service Provider (ACSP).
- **Authorised Corporate Service Providers (ACSPs):** accountants and other agents must register with Companies House to provide ID verification services on behalf of clients.
- **Register of Overseas Entities (RoE):** in force since 1 August 2022. Overseas entities owning UK property must register beneficial ownership annually. Annual update statement due within 14 days of the entity's anniversary. £2,500 fixed penalty + £500/day for non-compliance.

**Do not write:** "Companies House ID verification is voluntary" (becoming mandatory). "RoE only applies to new acquisitions" (applies to all post-1-Aug-2022 holdings).

---

## 12. Renters' Rights Act 2026

**Locked position (as of May 2026):** the Renters' Rights Bill was reintroduced under the Labour government and is **in passage**. Key tenets being legislated:
- **Section 21 ("no-fault") evictions abolished** — replaced by reformed Section 8 grounds.
- **Periodic tenancies become the default** — fixed-term ASTs phased out.
- **Property MOT / decent homes standard** extended to the private rented sector.
- **Database of landlords + ombudsman scheme** to be established.
- **Specific minimum periods between rent increases** with formal challenge route.
- **Pet rights** — tenants able to request to keep pets, landlord refusal must be reasonable.

Frame these as "the Renters' Rights Act, as enacted" if it has Royal Assent by the time of writing; or "the Renters' Rights Bill, in passage" if not yet enacted. Check current status before writing.

**Do not write:** "Section 21 is still available" (will be / is abolished by RRA). "Tenants must give 2 months notice always" (changed under the act).

---

## 13. The do-not-write list (general, applies across all pages)

- No em-dashes anywhere (commas, parentheses, full stops, middle dots).
- No real client names. Anonymised personas only ("Mark and Sarah, BTL landlords in Leeds with 4 properties").
- No specific NHS Trust names, specific letting agency names, or specific tenant disputes unless quoting publicly available policy or case law.
- No claim that a particular accountancy firm is "the best" or quantified pricing claims about competitors.
- No emoji in body content (acceptable in inline asides only if they're directional / functional).
- No abbreviations without defining them at first use ("Section 24 (S24) finance cost restriction").
- No invented £ figures that purport to come from HMRC publications.

---

## 14. Things to flag (do NOT decide unilaterally)

If you find any of the following while writing, **append to `docs/property/track1_site_wide_flags.md`** and continue:
- Pages that recommend tax planning specific to a named letting agency or platform (we have not verified those organisations).
- Pages that cite specific £ figures for "average BTL gross yield" or "typical SDLT in city X" that imply we have proprietary data we don't have.
- Pages that recommend a specific accounting software product by name without disclosure (we are an accounting firm, not a software reseller).
- Pages where the slug itself contains an out-of-date figure or rate.
- Cannibalisation between two pages on the same topic where neither has a clearly stronger differentiation.
- Conflicts between this house positions doc and a competitor source — flag, do not unilaterally accept the competitor framing.

---

This file is **read once at the start of each session** and then referenced as a tie-breaker. If a competitor page contradicts a house position, the house position wins — the competitor is wrong (or out of date) and you should not transcribe their figure into ours.

---

## 15. IHT — Wave 2 extension (locked, 2026-05-22)

Extends §9 with the depth Wave 2 sessions need. §9 remains authoritative for headline figures; §15 adds the working detail. **Verified against legislation.gov.uk on 2026-05-22** for s.102 FA 1986 (gifts with reservation) and the published April 2026 APR/BPR reform.

### 15.1 NRB, RNRB and freezes

- **NRB:** £325,000 per individual, frozen until 5 April 2031 (further extended from the prior 5 April 2030 date by the additional one-year extension reflected on the gov.uk IHT thresholds page; verified 2026-05-23 per Wave 6 F-3).
- **RNRB:** £175,000 per individual, frozen until 5 April 2031.
- **RNRB taper:** withdrawn at £1 for every £2 of net estate above £2,000,000; fully extinguished at £2,350,000 (single) or £2,700,000 (with transferable RNRB).
- **Transferable NRB and RNRB:** unused portion transfers to surviving spouse / civil partner on first death; up to 100% of each. Claim made by personal representatives on IHT402 (NRB) / IHT436 (RNRB) within 2 years of second death (HMRC may accept late in practice).
- **RNRB qualifying conditions:** the residence must be in the deceased's estate, must have been a residence of the deceased at some point, and must pass to a direct lineal descendant (children, step-children, adopted, foster, grandchildren). Direct lineal descendant rule is strict: nieces / nephews / siblings do NOT qualify.
- **Downsizing addition** (IHTA 1984 ss.8FA–8FE): RNRB preserved on a smaller-replacement-residence basis where the deceased downsized after 8 July 2015.

### 15.2 PETs, CLTs and the 7-year clock

- **PETs (potentially exempt transfers):** outright gifts to individuals are PETs. No IHT at the time of gift; fully exempt if the donor survives 7 years.
- **CLTs (chargeable lifetime transfers):** gifts into most trusts. 20% lifetime IHT on the excess over NRB, with a further 20% (to bring the cumulative rate to 40%) if the donor dies within 7 years.
- **Taper relief** (s.7(4) IHTA 1984) reduces the **tax** payable (not the gift value) where the donor dies between 3 and 7 years after the PET:
  - 3-4 years: 80% of full rate
  - 4-5 years: 60%
  - 5-6 years: 40%
  - 6-7 years: 20%
- Taper applies only where the gift exceeds the NRB; gifts within the NRB get no taper because there's no tax to taper.
- **Annual exemption:** £3,000 per donor per tax year, with one-year carry-back of unused exemption. Small gifts exemption: £250 per recipient per year.

### 15.3 Gifts with reservation of benefit (GROB) — s.102 FA 1986

**Locked statutory citation: s.102 Finance Act 1986** (verified against legislation.gov.uk on 2026-05-22). The rule: where a donor gifts property on or after 18 March 1986 but **either** does not assume possession **or** retains any benefit by contract or otherwise, the gift is "subject to a reservation". Under s.102(3), property subject to a reservation immediately before death is treated as property to which the donor was beneficially entitled — i.e. **it remains in the donor's estate for IHT** notwithstanding the lifetime transfer.

Classic property-tax application: parent "gifts" the family home to children but continues to live there rent-free. The gift is a GROB; the house is in the parent's estate at death; no 7-year clock starts; the PET protection is illusory.

**Routes that avoid GROB on family-home gifts:**
- Donor pays **full market rent** to the donee for any continued occupation. Rent must be commercial, reviewed periodically, and demonstrably paid. The donee declares the rental income.
- Donor moves out completely and does not return except in normal family-visit circumstances (e.g. Christmas, family events).
- Co-ownership gift where donor and donee share occupation AND donor bears their share of running costs (FA 1986 Sch 20 para 6 carve-out — narrow, scrutinised).

**Pre-Owned Assets Tax (POAT):** s.84 + Sch 15 FA 2004. Where GROB doesn't apply but the donor still enjoys the benefit (e.g. cash gift used by donee to buy the home), an annual income tax charge based on deemed market rent. Avoidable by election to be treated as GROB (election form IHT500). Default behaviour where families have engaged in "home-loan" or "double-trust" schemes pre-2003.

**Do not write:** "Gifting your home to your children removes it from your estate." (Almost always wrong without paying rent — GROB applies.) "GROB only catches gifts of land." (Wrong — applies to any property where benefit is reserved.)

### 15.4 BPR / APR — the April 2026 cap

**Locked position (verified gov.uk APR/BPR reforms summary 2026-05-23, F-18):** From **6 April 2026**, the previously unlimited 100% rate of Business Property Relief and Agricultural Property Relief is capped at **£1,000,000 combined** per estate. The cap applies across both reliefs jointly; estates cannot stack a £1m BPR allowance on top of a £1m APR allowance.

- **Below £1m:** 100% relief, as before, for qualifying property.
- **Above £1m:** 50% relief on the excess, producing an effective IHT rate of 20% on the qualifying value above the cap.
- **AIM-listed shares (and other "not listed" shares on recognised stock exchanges):** previously qualified at 100% BPR after 2 years' ownership; from 6 April 2026 the rate is **50%** and is **NOT affected by the £1m allowance** — AIM shares operate as a **separate 50% sub-tier** and do not consume the new allowance. Gov.uk verbatim: *"The exception is for shares designated as 'not listed' on the markets of recognised stock exchanges, such as the AIM, where the rate of relief will be 50% and will not be affected by the new allowance."*
- **Anti-forestalling (lifetime transfers):** the new rules apply to lifetime transfers made **on or after 30 October 2024** (Autumn Budget 2024 announcement date) if the donor dies **on or after 6 April 2026** and within 7 years of the gift. Pre-announcement gifts (before 30 October 2024) are NOT caught even where the donor dies after 6 April 2026. Gov.uk verbatim: *"The new rules will apply for lifetime transfers on or after 30 October 2024 if the donor dies on or after 6 April 2026. This prevents forestalling."*
- **Trust anti-fragmentation:** trusts settled **before 30 October 2024** each retain their own £1m allowance for chargeable events. For trusts settled by the **same settlor on or after 30 October 2024**, the government will introduce rules to **share a single £1m allowance divided across them** (preventing allowance multiplication via multi-trust structures). Division mechanic now exists in draft statute via the **Finance Bill 2025-26 (published 21 July 2025; technical consultation closed 15 September 2025)**, providing for a single £1m allowance divided across the same-settlor cohort. **Finance Act 2026 enactment expected with the Autumn Budget 2025 cycle.** Housekeeping lock 2026-05-23 per Wave 5 pre-wave statute verification; re-verify enactment before Wave-6+ IHT-trust pages write commencement-tense claims.

**Property-investment context (most BTL landlords):** standard BTL property is investment, not trading — **Pawson v HMRC [2013] UKUT 050 (TCC)** confirms it does not qualify for BPR. The April 2026 cap therefore rarely affects pure BTL landlords. It DOES affect:
- Property developers (trading) holding work-in-progress at death.
- Serviced-accommodation operations with substantial services (the *Pawson*-distinguishing fact pattern: managed kitchen, daily cleaning, breakfast, concierge).
- Mixed estates with both an active trading business (e.g. a farm) and a BTL portfolio — the trading element competes with farmland for the £1m allowance.

**Do not write:** "BTL qualifies for BPR after the April 2026 reforms" (still doesn't, per Pawson). "The £1m cap applies separately to BPR and APR" (it's combined). "AIM relief is unaffected" (rate drops to 50%, but does NOT consume the £1m cap). "Pre-announcement gifts are caught" (false; anti-forestalling triggers only on transfers on or after 30 October 2024). "Each new same-settlor trust gets its own £1m allowance" (false from 30 October 2024 onwards).

**Correction logged 2026-05-23 (F-18):** earlier §15.4 (locked 2026-05-22) hedged AIM mechanics as "the most-likely-to-be-amended detail" and noted trust anti-fragmentation as "expected (consult HMRC technical note)". Wave 4 Session C8 surfaced firmer locked positions via session-time gov.uk WebFetch verification against the APR/BPR reforms summary publication. Three positions now firmly locked: (a) AIM 50% sub-tier is separate and does NOT consume the £1m allowance; (b) anti-forestalling rule from 30 October 2024 announcement date with 6 April 2026 + 7-year-from-gift trigger; (c) trust anti-fragmentation from 30 October 2024 for same-settlor multi-trust structures (single £1m divided across the cohort). Independently verified by manager 2026-05-23 via gov.uk publication `agricultural-property-relief-and-business-property-relief-reforms/summary-of-reforms-to-agricultural-property-relief-and-business-property-relief`. This is the **fourth Bill-vs-enacted-Act drift caught in succession** (F-6 §19.7, F-11 §20.7, F-12/F-13 §20.10/§20.5, now F-18 §15.4); §16.22 + §16.27 pattern firmly load-bearing.

### 15.5 Pensions in IHT — 6 April 2027

**Locked framing:** From **6 April 2027**, unused defined-contribution pension funds and unused DB lump-sum death benefits will be brought into the deceased's estate for IHT. Announced Autumn Budget 2024. **Consultation outcome + draft Finance Bill 2025-26 legislation both published 21 July 2025 (consultation closed 15 September 2025).** Confirmed: **personal representatives (not scheme administrators)** report and pay; **death-in-service benefits excluded** from estate IHT. Finance Act 2026 enactment expected with the Autumn Budget 2025 cycle. Housekeeping lock 2026-05-23 per Wave 5 pre-wave statute verification.

Implications for landlord estate planning:
- The "use pension last" decumulation strategy that maximised IHT-free pension legacy is undermined for deaths from April 2027.
- Pension funds will be aggregated with the rest of the estate for the £2m RNRB taper threshold; landlords holding a £900k pension + £1.6m of property may newly trigger RNRB taper.
- Spousal exemption applies as normal; the IHT trigger is the second death.
- Charity exemption (s.23 IHTA 1984) applies as normal to charitable pension nominations.

**Do not write:** "Pensions are outside IHT" (true until 5 April 2027, false thereafter). "Pensions remain outside IHT under the spousal exemption" (spousal exemption applies, but the underlying inclusion changes).

### 15.6 Non-resident IHT — domicile and the new residence test

**Locked framing (April 2025+ changes):**
- The historic **domicile** concept for IHT was replaced from **6 April 2025** by a **residence-based test** (announced Autumn Budget 2024, in force per Finance Act 2025).
- An individual is a "**long-term resident**" (and therefore within IHT on worldwide assets) where **either** they have been UK resident for **10 consecutive tax years**, **or** they have been UK resident in **at least 10 of the previous 20 tax years**. The two-route test is the HMRC published position (correction logged 2026-05-22: earlier versions of this doc named only the 10-of-20 route; Session A's research on A6 surfaced the consecutive-route alternative).
- A "**formerly long-term resident**" remains within IHT on worldwide assets for up to 10 years after departure (tapered by length of residence — the longer the prior UK residence, the longer the tail).
- **UK situs property** (including all UK residential property held directly or via overseas company / partnership) remains within UK IHT regardless of residence status. Schedule A1 IHTA 1984 (enveloped UK residential property look-through, in force from 6 April 2017) is unaffected.
- **Excluded property trusts** settled by non-doms pre-6-April-2025 — transitional rules preserve excluded-property status for property settled before that date, but property added after triggers the new residence test.

**Do not write:** "Non-doms are outside UK IHT on overseas assets" (true historically, false from 6 April 2025). "UK residential property held through an offshore company is outside IHT" (false since 6 April 2017 — Sch A1 IHTA 1984 looks through).

---

## 16. DTAs — Wave 2 extension (locked, 2026-05-22)

Extends §10 with treaty-article-level detail Wave 2 needs. **Verified against the OECD Model 2017 Commentary** and selected published UK treaty texts on 2026-05-22.

### 16.1 OECD Model 2017 — the article map

UK treaties broadly follow the OECD Model with state-specific variations. Wave 2 sessions should quote the article number from the **specific bilateral treaty** they are writing about, not the OECD Model number, because numbering can differ slightly.

| OECD Article | Subject | Typical UK property impact |
|---|---|---|
| Art 4 | Residence (tie-breakers) | Permanent home, centre of vital interests, habitual abode, nationality, mutual agreement |
| Art 6 | Income from immovable property | Source state (UK) has primary taxing rights over UK rental income |
| Art 7 | Business profits | Permanent establishment threshold — relevant where landlord operates through a PE |
| Art 10 | Dividends | Withholding rates on UK company dividends paid to non-resident shareholders |
| Art 11 | Interest | Withholding on interest paid offshore — relevant for back-to-back director loans |
| Art 13 | Capital gains | Art 13(1) gives source state taxing rights over immovable property gains; Art 13(4) extends to property-rich entities |
| Art 21 | Other income | Catch-all where the gain or income doesn't fit Art 6 / 13 |
| Art 22 | Capital | Wealth taxes (UK has none; relevant for incoming Spanish / French residents) |
| Art 23 | Methods for elimination of double taxation | Exemption method vs credit method varies by treaty |
| Art 24 | Non-discrimination | National-treatment requirement |
| Art 25 | Mutual Agreement Procedure | Dispute resolution between competent authorities |

### 16.2 Art 6 — immovable property in UK treaties

- The UK retains primary taxing rights over UK property income regardless of landlord's residence.
- "Immovable property" definition includes rights to variable / fixed payments for working of mineral deposits and natural resources.
- Ships, boats and aircraft are NOT immovable property under the OECD model (covered by Art 8).
- DTAs do NOT generally provide a UK property income exemption — the treaty allocates taxing rights; UK source taxation continues per ITTOIA 2005 (individuals) or CTA 2009 (companies).

### 16.3 Art 13 — capital gains: the NRCGT override

- Treaty Art 13(1) typically gives the situs state (UK) primary taxing rights on immovable property gains.
- Art 13(4) extends to gains on alienation of shares in property-rich entities (≥50% of value from immovable property).
- **Critical statutory override:** the UK NRCGT regime now lives at TCGA 1992 s.1A and Schedules 1A / 1B / 4AA (rewritten by Finance Act 2019, which repealed the earlier ss.14B–14H structure introduced by FA 2015). The regime applies whether or not the treaty assigns UK taxing rights. Where a treaty's Art 13(4) is narrower than NRCGT (e.g. older treaties without the indirect-disposal extension), UK statute still imposes NRCGT; HMRC's view is that this is consistent with treaty obligations because the UK is exercising taxing rights that the treaty does not deny.
- Older UK treaties without indirect-disposal Art 13(4) provisions have largely been updated. The **UK-Luxembourg Double Taxation Convention and Protocol (signed 7 June 2022, in force 22 November 2023; effective UK income tax / CGT 6 April 2024, corporation tax 1 April 2024)** brought UK-Lux into the modern OECD line. Sessions writing UK-Lux property cases should cite the 2022 convention; pre-2022 forms are superseded for transactions on or after the effective dates above. Housekeeping lock 2026-05-23 per Wave 5 pre-wave statute verification.

### 16.4 Art 4 — residence tie-breaker for individuals (cascade)

Where an individual is resident under domestic law of both states:

1. **Permanent home** — available to them in one state only? They are resident there.
2. **Centre of vital interests** — if permanent home available in both, residence is the state with closer personal and economic relations (family, professions, social, political, cultural, business activities).
3. **Habitual abode** — if neither test resolves, where they habitually live.
4. **Nationality** — if habitual abode in both / neither, the nationality state.
5. **Mutual agreement procedure** — if all else fails, competent authorities agree.

For property-tax purposes, the tie-breaker often resolves a UK SRT-resident landlord who is also resident in (e.g.) France under French domestic rules. The tie-breaker doesn't change UK source taxation under Art 6/13 — UK property is still UK-taxable — but it changes the framework for foreign tax credit relief.

### 16.5 Specific UK treaty notes

- **UK-US treaty:** the **saving clause** (typically Art 1(4)) allows the US to tax its citizens worldwide regardless of treaty residence. US citizens UK-resident with UK property still file US returns; foreign tax credit relief offsets UK tax paid. The 2001 treaty (with 2002 protocol) is in force.
- **UK-France treaty (2008, in force 2009):** Art 6 immovable property in usual form. Art 24A (capital gains) — UK retains taxing rights on UK property gains. Art 25 elimination of double taxation: France uses tax-credit method for UK property income.
- **UK-Spain treaty (2013):** Art 13(4) property-rich entity rule applies. Spanish wealth tax (impuesto sobre el patrimonio) on UK property is creditable in Spain only; UK has no wealth tax to credit.
- **UK-India treaty (1993):** older treaty; Art 13(1) covers immovable property gains; no Art 13(4) indirect-disposal provision (so UK NRCGT applies on UK property-rich shares regardless).
- **UK-China treaty (2011):** Art 6 + Art 13 in OECD form.
- **UK-UAE treaty (2016):** Art 6 + Art 13 in OECD form. UAE has no income tax / CGT, so foreign tax credit is asymmetric.
- **Crown Dependencies (Jersey, Guernsey, Isle of Man):** modern (2018+) treaties in OECD form; Art 13(4) indirect-disposal applies.

### 16.6 NRL scheme is statutory, not treaty

The Non-Resident Landlord scheme (FA 1995 Sch 23; SI 1995/2902 — the Taxation of Income from Land (Non-Residents) Regulations) is a UK statutory withholding mechanism. Tenants / letting agents withhold 20% of UK rent paid to non-resident landlords and account to HMRC quarterly, unless the landlord holds an **NRL1 / NRL2 / NRL3** approval to receive rent gross. Treaty residence does not displace NRL; even a treaty-resolved non-UK resident must apply for gross-payment approval.

**Do not write:** "DTAs eliminate UK tax on UK property income for non-UK residents" (false — treaty allocates taxing rights to UK as situs state). "NRL withholding is treaty-based" (false — statutory). "Foreign tax credit applies automatically" (false — claimed on relevant tax return).

---

## 17. Leaving the UK / expat — Wave 2 extension (locked, 2026-05-22)

Extends and consolidates the expat-landlord positions Wave 2 needs. **Verified against HMRC Capital Gains Manual CG26540 on 2026-05-22** for the s.10A test; against gov.uk SRT guidance for residence tests.

### 17.1 Statutory Residence Test (SRT) — FA 2013 Sch 45

Mandatory test from **6 April 2013**. Cascade:

1. **Automatic overseas tests** (any one met → non-UK resident):
   - Under 16 UK days in tax year (UK resident in any of preceding 3 years).
   - Under 46 UK days (not UK resident in any of preceding 3 years).
   - Full-time work overseas (35-hour week test, ≤30 UK workdays, ≤90 UK days).
2. **Automatic UK tests** (any one met without overseas test triggered → UK resident):
   - 183+ UK days in tax year.
   - Only home in UK for at least 91 consecutive days, with ≥30 days in that period in the tax year.
   - Full-time UK work (75% of workdays UK; 365-day period spanning the tax year).
3. **Sufficient ties test** (where no automatic test met): five UK ties (family, accommodation, work, 90-day, country tie). The number of ties combined with UK days determines residence — see HMRC RDR3 Annex A.

"UK day" = present in UK at midnight (with deeming rule for transit and exceptional circumstances).

### 17.2 Split-year treatment — Cases 1-8 (FA 2013 Sch 45 Part 3)

Where SRT makes the individual UK-resident for the whole tax year but they were genuinely arriving / departing partway through, split-year treatment may apply.

| Case | Direction | Trigger |
|---|---|---|
| 1 | Leaving | Starting full-time work overseas |
| 2 | Leaving | Partner of someone covered by Case 1 |
| 3 | Leaving | Ceasing to have any home in the UK |
| 4 | Arriving | Starting to have only a UK home |
| 5 | Arriving | Starting full-time UK work |
| 6 | Arriving | Ceasing full-time overseas work |
| 7 | Arriving | Partner of someone covered by Case 6 |
| 8 | Arriving | Starting to have a UK home |

Split-year is **not optional** — the cases either apply or they don't. Where multiple cases could apply, statute determines priority (Sch 45 Part 3 paras 53-55).

### 17.3 Temporary non-residence — TCGA 1992 s.10A

**Locked statutory citation: s.10A TCGA 1992** (verified against HMRC CG26540 on 2026-05-22). The "5-year rule":

- Test: an individual is a "temporary non-resident" where their **period of non-UK residence is 5 years or less**, having previously been UK-resident in 4 or more of the 7 tax years before departure.
- Effect: gains realised on assets owned at departure, disposed during the period of non-residence, are deemed to arise in the **year of return** and become chargeable.
- Excluded: gains on assets acquired AND disposed during the non-residence period (no UK base cost issue).
- The CGT regime parallel for income (ITA 2007 s.812) applies to dividend / pension lump-sum income during temporary non-residence — same 5-year test.

**Planning consequence for landlord-emigrants:** selling a UK rental property as a non-resident during the 5-year window doesn't escape CGT if the individual returns within the period; the gain is recaptured in the return year. To genuinely shed CGT, the individual must be non-resident for more than 5 complete tax years.

**Do not write:** "Temporary non-residence is 4 years" (wrong — 5 years or less). "Selling UK property as non-resident avoids CGT" (NRCGT applies anyway; and if the seller returns within 5 years, s.10A recaptures any gain that NRCGT didn't catch). "s.10A applies to all assets including UK land" (UK land is already in NRCGT; s.10A primarily matters for non-UK situs assets and pre-2015 base-cost UK gains).

### 17.4 NRCGT — non-resident CGT on UK land

**Locked statutory citation:** The current NRCGT regime lives at **TCGA 1992 s.1A and Schedules 1A / 1B / 4AA** (rewritten by Finance Act 2019, which repealed the earlier ss.14B–14H structure introduced by FA 2015 and reorganised the regime around the s.1A "non-resident CGT" charging provision). Older HMRC guidance and competitor pages may still cite ss.14B–14H — that is stale citation, the substance carried forward into s.1A + Schs 1A/1B/4AA.

**Locked timeline (verified gov.uk 2026-05-22):**
- **6 April 2015:** NRCGT extended to non-residents disposing of UK **residential** property (then under FA 2015 ss.14B–14H). Rebasing to 5 April 2015 market value default (alternative: straight-line apportionment, or full historic gain). Reporting via NRCGT return within 30 days (now 60).
- **6 April 2019:** NRCGT extended to non-residents disposing of **non-residential** UK land AND to **indirect disposals** of shares in property-rich entities (≥75% of value from UK land + the disposing person holds ≥25%). Statutory regime rewritten into TCGA 1992 s.1A + Sch 1A / 1B / 4AA by FA 2019. Rebasing to 5 April 2019 default for non-residential.
- **27 October 2021:** UK residents' 30-day reporting extended to **60 days**; non-residents' deadline aligned at 60.

**Reporting obligation:** non-residents must file the 60-day return for **every** UK land disposal, including indirect disposals of property-rich entity shares, regardless of whether tax is due (HMRC guidance confirms: "must report disposals of UK property or land even if you have no tax to pay" — verified gov.uk 2026-05-22). UK residents file only where tax is due.

**Rates:** CGT rates aligned with UK-resident rates (18% / 24% residential from 30 October 2024; 18% / 24% non-residential aligned same date). No Annual Exempt Amount for non-resident companies; £3,000 AEA for non-resident individuals where they would qualify if resident.

### 17.5 NRL scheme operational mechanics

- **NRL1** — landlord application to receive rent gross. Approved where landlord's UK tax affairs are up to date and they expect to remain compliant. Decision usually within 6 weeks.
- **NRL2** — letting agent's quarterly return of rent paid to non-resident landlords + 20% tax withheld.
- **NRL3** — tenant's equivalent where no letting agent involved AND annual rent exceeds £100/week (=£5,200/year).
- **NRL6** — annual statement of tax deducted, given to landlord.
- Failure to operate NRL: tenant / agent becomes liable for the unwithheld tax (no time limit for unprompted discovery).

### 17.6 Domicile reform and the residence-based regime (April 2025+)

The historic non-domiciled regime ended **6 April 2025**. From that date:

- **Remittance basis abolished.** Replaced by a 4-year Foreign Income and Gains (FIG) regime for new UK arrivals (full exemption on foreign income / gains for the first 4 years of UK residence, provided not UK-resident in any of the preceding 10 years).
- **IHT shifts to residence basis.** "Long-term resident" = either 10 consecutive tax years OR 10 of preceding 20 tax years (see §15.6).
- **Transitional rules** for existing non-doms: Temporary Repatriation Facility (TRF) runs **3 years** at **12% / 12% / 15%** for 2025/26, 2026/27, and 2027/28 to bring pre-6-April-2025 foreign income / gains onshore (correction logged 2026-05-22: earlier versions of this doc named a 2-year-at-12% facility; Autumn Budget 2024 extended to 3 years with the rate stepping to 15% in year 3. Session C's research on C8 surfaced the extension.). CGT rebasing election to 5 April 2017 value for individuals who claimed remittance basis pre-6-April-2025.

Affects expat landlords because the previous "remit only what you need" strategy for foreign-sourced income is no longer available; foreign income is taxable on the arising basis after the FIG window.

**Do not write:** "Non-doms can use the remittance basis" (false from 6 April 2025). "The 15-of-20 deemed-dom test still applies to IHT" (replaced — now 10-of-20 residence test). "Foreign income is exempt forever for new arrivals" (only first 4 years under FIG regime).

### 17.7 Section 21 expat-specific compliance points

- Owners of UK property continuing letting after emigration must register under NRL (see §17.5).
- Personal allowance availability for non-residents: depends on nationality / treaty; UK / EEA nationals retain personal allowance under domestic law; other nationalities depend on the specific UK treaty.
- Self-assessment continues to be required for non-resident landlords with UK property income.
- The 60-day NRCGT return (§17.4) is separate from the annual self-assessment and runs to a tighter clock.
- Statutory residence test must be applied each tax year; emigration in year 1 doesn't pre-determine residence in year 2.

---

**End Wave 2 extension.** Sessions A (IHT), B (DTAs), C (Expat) — use §§9-10 + §§15-17 together. §§15-17 are the working detail; §§9-10 remain the headline tie-breakers. Any contradiction between competitor sources and §§15-17 → flag in `wave2_site_wide_flags.md`.

---

## 18. ATED — Wave 3 extension (locked, 2026-05-22)

Extends §2 with the working detail Wave 3 Session A needs. §2 remains authoritative for the headline rate table; §18 adds mechanics, reliefs, valuation, returns, and interactions. **Verified against gov.uk on 2026-05-22** for the 2025/26 and 2026/27 band figures, the 30 April return deadline, and the five-yearly valuation rule.

### 18.1 Bands 2025/26 and 2026/27

| Property value | 2025/26 annual charge | 2026/27 annual charge |
|---|---|---|
| £500,001 to £1m | £4,450 | £4,600 |
| £1m to £2m | £9,150 | £9,450 |
| £2m to £5m | £31,050 | £32,200 |
| £5m to £10m | £72,700 | £75,450 |
| £10m to £20m | £145,950 | £151,450 |
| Over £20m | £292,350 | £303,450 |

Indexation by CPI for the year ended September; HMRC publishes the next-year table each November. The 2026/27 figures above are the gov.uk-published amounts (verified 2026-05-22) and supersede any older estimate in earlier drafts of §2.

### 18.2 Chargeable persons

ATED applies to **non-natural persons** holding a UK dwelling worth more than £500,000:
- UK companies.
- Non-UK companies.
- Partnerships with at least one corporate member.
- Collective investment schemes.

ATED does **not** apply to:
- Individuals owning in their own name.
- Trustees (provided no corporate trustee structure produces a non-natural-person owner).
- Charities holding the dwelling on charitable trusts (subject to the §18.3 charitable-use relief mechanics).

Statutory basis: **Part 3 FA 2013** (ss.94-174) introduced ATED, with the relief structure at sections referenced through the Act itself. Sessions citing the SDLT 15% rate schedule should cite **Schedule 4A FA 2003**; ATED itself sits in Part 3 FA 2013.

### 18.3 The relief catalogue

ATED reliefs are claimed on the return (no automatic application). All require the dwelling to be used for the qualifying purpose throughout the chargeable period or during a period of qualifying transition (acquisition, sale, redevelopment).

| Relief | Statutory section | Qualifying conditions |
|---|---|---|
| Property rental business (rental to unconnected tenant) | s.133 FA 2013 | Let on commercial terms to an unconnected tenant; let with a view to profit. The most common relief for BTL ltd cos. |
| Property developer | s.138 FA 2013 | Held as trading stock; carrying on a property development trade for at least 2 years. |
| Property trader | s.141 FA 2013 | Held as trading stock by a property trader (buy-sell business). |
| Farmhouse | s.144 FA 2013 | Farmhouse occupied by a working farmer or surviving spouse. |
| Employee accommodation | s.145 FA 2013 | Provided to a qualifying employee for performance of duties; tight definition of qualifying employee. |
| Dwellings open to the public | s.137 FA 2013 | Commercially run and open to the public for at least 28 days per year. |
| Charitable use | s.150 FA 2013 | Owned by a charity, used for charitable purposes. |
| Social housing (registered providers) | s.149 FA 2013 | Owned by a registered provider of social housing. |
| Demolition / conversion | ss.134-135 FA 2013 | Held with intention to demolish or convert to non-residential. |

**Relief mechanics:**
- Reliefs **must be claimed** on the return; HMRC does not apply them automatically. A "claim-only return" with all-relief boxes ticked is still a return; failing to file is a penalty point even where no tax is due.
- A single dwelling can move between reliefs in a chargeable period (e.g. rental until 31 December, then redevelopment from 1 January). The return apportions days.
- Relief is **clawed back** where conditions cease to be met within a period of non-qualifying occupation. The most common clawback trigger is occupation by a connected non-qualifying individual (director's family member moving in for a few months while between rentals).

### 18.4 Return mechanics and valuation

- **Return due: 30 April** in the chargeable period (i.e. 30 April 2026 for the 2026/27 period, which starts 1 April 2026). Same date for both tax-due returns and claim-only relief returns. Verified gov.uk 2026-05-22.
- **Payment due: 30 April**, alongside the return.
- **Late filing penalties:** £100 immediate, £200 at 3 months, £300 at 6 months and 12 months. Tax-geared penalties for prompted / unprompted / deliberate disclosure under FA 2009 Sch 55.
- **Five-yearly revaluation:** the chargeable value is the property's open-market value at the **most recent valuation date**. Revaluation dates: **1 April 2012**, **1 April 2017**, **1 April 2022**, **1 April 2027**, and every five years thereafter. Acquisitions between revaluation dates use the **acquisition value** until the next five-yearly revaluation date.
- **Pre-return banding check (PRBC):** for values within 10% of a band boundary, the owner can request HMRC's view in advance (no fee). Useful where a Knight Frank or Savills valuation puts a flat at £2.05m and the £2m band-boundary materially changes the charge.
- **Mixed-use treatment:** ATED applies only to the residential portion. Where a flat-over-shop produces a dwelling element worth >£500,000, ATED applies to that element only. Apportionment is on a just-and-reasonable basis (no statutory formula); HMRC accepts floor-area or value-based apportionment evidence.

### 18.5 ATED-CGT abolition and NRCGT interaction

- **ATED-related CGT (ATED-CGT)** was abolished from **6 April 2019** by FA 2019. Pre-April-2019 gains on enveloped dwellings sat in a parallel CGT regime at 28%.
- From 6 April 2019, gains on ATED-relevant dwellings disposed by non-resident companies fall under the standard **non-resident CGT** regime at TCGA 1992 s.1A + Sch 1A. Rebasing to 5 April 2019 default applied for the transition.
- For non-resident company disposals on or after 30 October 2024, CGT rate is 18%/24% (aligned with individuals from that date) but companies typically pay corporation tax on gains at the prevailing CT rate via the non-resident chargeable gains route. Sessions writing ATED pages should note the ATED-CGT abolition explicitly because competitor pages still reference the old 28% rate.

### 18.6 RoE interaction for overseas-held ATED dwellings

The Register of Overseas Entities (RoE, ECCTA 2023 / Economic Crime (Transparency and Enforcement) Act 2022) **does not displace ATED**, an overseas company holding a UK dwelling must comply with both regimes. RoE compliance evidence (the overseas entity ID, OE number) does not file with HMRC for ATED; ATED and RoE run in parallel. Sessions writing on overseas-held ATED structures should note that non-RoE-compliant overseas entities cannot complete UK Land Registry dispositions, but the ATED return obligation continues regardless of RoE status.

### 18.7 HMRC's OTM letters campaign

In 2024-2025 HMRC ran (and continues) an "OTM" (One-to-Many) compliance letters campaign targeting suspected ATED non-compliance, typically overseas companies on the Land Registry holding what HMRC's data warehouse suggests are >£500,000 dwellings that have not filed an ATED return. The letter is not an assessment; it invites voluntary disclosure. Sessions writing on ATED compliance should treat the OTM campaign as a known practical compliance pressure (worth a paragraph in compliance-oriented pages, not a worked example).

### 18.8 Do not write

- "ATED-related CGT applies to enveloped dwelling gains" (abolished from 6 April 2019).
- "ATED reliefs are automatic where the dwelling is let" (must be claimed on the return).
- "ATED only applies to overseas companies" (applies to UK companies too).
- "ATED applies where any company owns any residential property" (the £500,000 threshold must be met).
- "FA 2013 Schedule 33 introduced ATED" (Part 3 FA 2013 introduced ATED).

---

## 19. MTD for ITSA — Wave 3 extension (locked, 2026-05-22)

Extends §3 with the operational detail Wave 3 Session B needs. §3 remains the headline locked schedule; §19 adds qualifying-income mechanics, software, joint-property treatment, exit / income-drop rules, and the new penalty regime. **Verified against gov.uk on 2026-05-22** for the £50,000 threshold and April 2026 mandate; penalty percentages reflect the Spring Statement 2025 doubling for MTD ITSA late payments (see §19.7 verification note).

### 19.1 Mandate timeline

| From | Mandatory for | Threshold |
|---|---|---|
| 6 April 2026 | Sole traders, landlords | Qualifying income > £50,000 |
| 6 April 2027 | Sole traders, landlords | Qualifying income > £30,000 |
| 6 April 2028 | Sole traders, landlords | Qualifying income > £20,000 |

Threshold is tested against the **2024/25 tax year self-assessment return** for the 6 April 2026 cohort, the **2025/26 return** for the April 2027 cohort, and the **2026/27 return** for the April 2028 cohort. HMRC writes to taxpayers who appear in scope; the obligation is the taxpayer's regardless of whether HMRC's letter arrives.

### 19.2 Qualifying income, what counts

- **Qualifying income** = gross self-employment turnover + gross property rental income, **before deductions**.
- The two streams are aggregated for the threshold test; £30,000 of trade and £25,000 of rent (£55,000 combined) brings the taxpayer in.
- **Gross matters:** a landlord with £52,000 rental income and £40,000 of allowable deductions (net £12,000 profit) is **in scope** at the April 2026 mandate. Net-low / gross-high landlords are the largest population HMRC's outreach targets.
- **Excluded from qualifying income:** employment income (PAYE), pensions, dividends, savings interest, partnership profit shares (until the partnership phase commences), and overseas property income reported in non-MTD ways.
- **Foreign property income** counts as property income for MTD where reported on the UK return.

### 19.3 Excluded categories

- **Limited companies are outside MTD ITSA entirely.** They file annual CT600s under separate digital-record rules (MTD for CT is a future cycle, no confirmed date).
- **General partnerships are deferred.** Originally proposed for April 2027, now deferred to a date to be confirmed. Treat as "MTD for partnerships expected in a later phase, no confirmed date as of May 2026". Partners with separate sole-trader / landlord income outside the partnership remain in MTD ITSA via that other income.
- **LLPs** are partnerships for MTD purposes (deferred).
- **Trustees** are outside MTD ITSA; trust property income reported via the SA900 trust return continues unchanged.
- **Non-UK resident individuals** with UK property income are in scope where threshold met; the NRL scheme (§17.5) operates alongside MTD, not in place of it.

### 19.4 Joint-property owners

- Joint owners (spouses, civil partners, joint tenants, tenants in common) test the threshold against their **share of gross**, not the property's total gross.
- Spouses owning jointly with a £100,000 gross rental income test £50,000 each (default 50/50 split absent Form 17 election). At the April 2026 mandate, both are in scope at the threshold boundary.
- A Form 17 election that splits 75/25 brings the 75% spouse into scope earlier than their partner.
- HMRC's published view: joint-owner threshold testing follows the income-split rule applied for SA, not a default joint-test rule.

### 19.5 Exit / income-drop rule

- A taxpayer in MTD ITSA can **exit** if qualifying income falls below the threshold for **three consecutive tax years**. The taxpayer notifies HMRC; HMRC confirms removal from MTD obligations.
- A taxpayer who exits remains liable for the regular self-assessment cycle and re-enters MTD if income rises above threshold again.
- **Voluntary opt-in:** taxpayers below threshold can join MTD voluntarily from 6 April 2025 (the pilot) or 6 April 2026 (general voluntary). Voluntary participants are bound by the quarterly cycle and penalties.

### 19.6 Software requirements

- MTD requires **HMRC-recognised compatible software**. The list is maintained at gov.uk's "Find software that's compatible with Making Tax Digital for Income Tax" page (updated regularly; do not hard-code product names).
- Software must support: digital record-keeping, quarterly update submissions, end-of-period statement, final declaration. Spreadsheet-plus-bridging is acceptable provided the bridging software is on the HMRC list.
- Free-tier options exist but are limited (FreeAgent for NatWest customers; HMRC's own pilot tooling for some segments). Paid options dominate the recognised list.

**Quarterly cycle (UK tax year):**

| Update period | Submission deadline |
|---|---|
| 6 April to 5 July | 7 August |
| 6 July to 5 October | 7 November |
| 6 October to 5 January | 7 February |
| 6 January to 5 April | 7 May |
| End-of-Period Statement (EoPS) | 31 January following year-end |
| Final declaration | 31 January following year-end |

Calendar-quarter elections are available from 6 April 2026 (HMRC will allow filers to use 31 March / 30 June / 30 September / 31 December quarter-ends), but the default remains the 5th-of-month UK tax year quarters.

### 19.7 Penalty regime

**Late submission, points-based:**
- 1 point per missed quarterly update.
- Penalty threshold for quarterly filers: **4 points**.
- At threshold: **£200** penalty per missed submission while at threshold.
- Points reset after 24 months of full compliance.
- Annual EoPS / final declaration counts as a separate annual obligation under the points cycle (threshold 2 points for annual obligations).

**Late payment, Spring Statement 2025 doubling AND accelerated trigger days, applicable to MTD ITSA from 6 April 2026:**
- **3% of unpaid tax from day 15** (was 2% from day 31 under the legacy FA 2021 Sch 26 schedule).
- **A further 3% from day 30** (was 2% from day 46).
- **Then 10% per annum from day 31** (was 4% per annum from day 91).

**Correction logged 2026-05-22:** Earlier versions of this section reproduced the day-triggers as **31 / 46 / 91** (the legacy FA 2021 Sch 26 schedule) while correctly noting the doubled 3%/3%/10% percentages. The legacy day-triggers were wrong; the Spring Statement 2025 reform also **accelerated the day-thresholds to 15 / 30 / 31**. Verified Stage 2 of Wave 3 against the gov.uk Spring Statement 2025 HTML document (`https://www.gov.uk/government/publications/spring-statement-2025-document/spring-statement-2025-html`) which states verbatim: *"The new rates will be 3% of the tax outstanding where tax is overdue by 15 days, plus 3% where tax is overdue by 30 days, plus 10% per annum where tax is overdue by 31 days or more."* The lower 2%/2%/4% figures on the legacy 31/46/91 day-triggers continue to apply to VAT and to non-MTD income tax for taxpayers below the MTD threshold; MTD ITSA filers face the accelerated 15/30/31 schedule from 6 April 2026.

**Sessions writing penalty content for MTD ITSA must use the 15/30/31 trigger days with 3%/3%/10% percentages**, citing the Spring Statement 2025 HTML document or the FA 2025 amendments to FA 2021 Sch 26 once enacted. Do NOT carry over the 31/46/91 schedule; that is the legacy non-MTD regime.

### 19.8 The abandoned £10,000 threshold

- The original 2018 MTD ITSA design used a **£10,000 qualifying income threshold** for all sole traders and landlords.
- The £10,000 threshold was abandoned in late 2022 / early 2023 under the previous government, with the phased £50,000 / £30,000 schedule announced 19 December 2022.
- Competitor pages from 2019-2022 frequently still reference £10,000; sessions encountering this should treat it as stale (do not write "the threshold was lowered from £10,000"; the £10,000 threshold was never implemented).

### 19.9 Do not write

- "MTD applies to limited companies from April 2026" (Ltd Cos are outside MTD ITSA).
- "MTD applies to GP partnerships from April 2026" (deferred to TBC).
- "£10,000 is the MTD threshold" (abandoned in 2022).
- "Joint owners test against the property's total gross" (each tests their share).
- "Late submission produces an immediate £200 penalty" (points-based; £200 only at the threshold).
- "Late payment penalties are 2%/2%/4%" (for MTD ITSA from 6 April 2026, the figures are 3%/3%/10% per Spring Statement 2025).

### 19.10 Agent Services Account (ASA) mechanics — Wave 4 extension (locked, 2026-05-23)

- Pre-MTD, agents represented clients via the 64-8 form and the Online Services Account (OSA). For MTD ITSA from 6 April 2026, the **Agent Services Account (ASA) is the mandatory route**.
- Agent must register an ASA via gov.uk/guidance/get-an-hmrc-agent-services-account.
- Client authorisation flow: agent generates an authorisation request via ASA; client receives an email link to the gov.uk authorisation portal; client logs in via Government Gateway and approves the agent for MTD ITSA filing specifically.
- **Joint owners:** each spouse / co-owner must authorise the agent separately. No "spouse-implies-spouse" rule.
- **Re-authorisation on agent change:** ASA authorisations do not transfer. If a client moves accountant, the new accountant must request fresh authorisation; client should revoke the old agent's access via the gov.uk authorisation portal.

### 19.11 Foreign property income inside MTD — Wave 4 extension (locked, 2026-05-23)

- §19.2 confirms foreign property income counts as property income for MTD where reported on the UK return.
- **FX translation:** spot rate on transaction date (per HMRC IM) OR HMRC published monthly average rates. Pick one method and apply consistently across the year.
- **Reporting:** software must support the SA106 foreign-property fields. Many MTD packages launched in 2025/26 did not; check the HMRC compatible-software list for foreign-property support before relying.
- **Foreign tax credit:** claimed at the final declaration (EoPS / final declaration stage), not at quarterly update.
- **NRL scheme interaction:** non-resident landlord receiving UK rental income via UK letting agent: NRL withholding applies (basic rate 20%) unless NRL1/2/3 approval. MTD ITSA filing still required by the landlord (quarterly via overseas address) if qualifying-income threshold exceeded.

### 19.12 Pension funds + rental property — Wave 4 extension (locked, 2026-05-23)

- **SIPP / SSAS holding commercial property:** trustees of pension funds are excluded from MTD ITSA (§19.3). Property income within the pension wrapper is taxed inside the scheme (typically 0% on rental income within a registered pension scheme). Reporting is via the pension trustee return, not the personal MTD ITSA cycle.
- **Personal portfolio + SIPP-held property:** personal portfolio is in MTD ITSA if threshold met; SIPP property is separate. The landlord with both must NOT combine the two streams for the qualifying-income test (SIPP rental is not the landlord's income for that test).

### 19.13 Letting-agent managed portfolio — Wave 4 extension (locked, 2026-05-23)

- The **landlord is the MTD filer**, NOT the letting agent.
- Letting agent provides monthly statement showing gross rent collected, agent commission deducted, management fees, other deductions, net paid to landlord.
- Landlord (or landlord's accountant via ASA) categorises the agent statement into the MTD quarterly update categories: gross rental income (gross collected, not net paid), agent commission (expense), management fees (expense), other deductions (expense per category).
- **Trap:** landlord reporting "net of agent fees" as gross income understates qualifying income for the threshold test AND understates expenses; both errors largely cancel for profit but for the threshold test (§19.2 gross-test) the landlord may incorrectly conclude they are below mandate threshold.

### 19.14 Spreadsheet + bridging software "digital link" rule — Wave 4 extension (locked, 2026-05-23)

- §19.6 confirms spreadsheet + bridging is acceptable.
- **Digital link** definition (per HMRC notice 700/22 + adapted for MTD ITSA): a transfer of data between software / spreadsheet cells that does NOT involve manual transcription or copy-paste. Acceptable: cell references / formulae, linked tables, API extract, CSV import via a script. NOT acceptable: copy-paste, manual re-keying, screen-reading.
- **Spreadsheet column discipline:** spreadsheet must categorise data into the SA105 categories (gross rental, agent fees, repairs, insurance, council tax, finance costs, other). Categorised columns flow via the bridging software into the MTD API as quarterly update lines.
- **HMRC-recognised bridging vendors:** list maintained at gov.uk/find-software. Vendor names change periodically; do NOT hard-code product names in body content.

### 19.15 Mid-year cessation — Wave 4 extension (locked, 2026-05-23)

- Landlord selling the last property mid-year: final quarterly update covers the partial quarter to date of disposal. EoPS and final declaration cover the full tax year up to cessation. Cessation must be notified to HMRC.
- **Post-cessation expenses:** ITTOIA 2005 s.354 allows post-cessation expense recovery up to 7 years where the expense is related to the let business and would have been deductible if the business had continued.
- **CGT 60-day return:** CGT-on-property-disposal 60-day return (TMA 1970 Sch 3ZA) runs in parallel with the MTD cessation reporting; the two are separate obligations.
- **Stopping letting but keeping the property:** if letting ceases but the property is retained (e.g. landlord moves into the property as PPR), MTD ITSA obligations end at cessation but CGT private-residence relief considerations begin.

### 19.16 Digital-records evidence discipline — Wave 4 extension (locked, 2026-05-23)

- Records must be kept digitally for the 7-year retention period (TMA 1970 s.12B).
- **What HMRC accepts as digital records:** receipt photographs captured by app (with date stamp), bank-feed CSV / API extracts, accounting-software entries, spreadsheet cells. Cash receipts must be photographed or transcribed.
- **What HMRC does not accept:** shoeboxed paper receipts (must be digitised), unstamped photographs without source software audit trail, written notes from memory.
- **Bank-feed integrations:** acceptable as gross-receipt evidence; auto-categorisation suggestions are not binding (landlord remains responsible for accuracy).

### 19.17 Wave 4 do not write

- "Letting agent files quarterly updates for the landlord" (false; landlord is filer).
- "SIPP-held property combines with personal portfolio for MTD threshold" (false; separate).
- "Copy-paste between spreadsheet cells is a digital link" (false).
- "ASA authorisations transfer to a new agent automatically" (false; client must re-authorise).
- "Foreign property income is excluded from MTD" (false; included where reported on UK return).

---

## 20. Renters' Rights Act 2025 — Wave 3 extension (locked, 2026-05-22)

Extends and **replaces** §12 with enacted detail. §12 was written when the Bill was in passage; §20 reflects the post-Royal-Assent reality. **Verified against legislation.gov.uk on 2026-05-22:** Royal Assent received **27 October 2025**. The Act is **2025 c. 26**, the **Renters' Rights Act 2025** (not 2026, the program previously labelled it the "RRA 2026" in anticipation of commencement; the Act is 2025-dated by enactment). **Correction logged 2026-05-22:** §12 framed the legislation as "in passage" and used the placeholder "Renters' Rights Act 2026". Both are out of date, the Act is enacted as the Renters' Rights Act 2025, with commencement phased by statutory instrument. Earlier wording retained in §12 for audit; §20 is the working detail.

### 20.1 Status and commencement

- **Royal Assent: 27 October 2025.**
- **Citation: Renters' Rights Act 2025 (2025 c. 26).**
- Commencement is phased by Statutory Instrument. Several core provisions were brought into force by mid-2026 commencement orders; Wales-specific discrimination provisions (ss.43-49) and a small number of enforcement provisions remained pending as of the verification fetch (legislation.gov.uk 2026-05-22).
- Sessions writing on RRA 2025 must check the commencement table for the specific section they cite before asserting "in force"; the Act is enacted but not yet fully in force.

### 20.2 Section 21 abolition and reformed Section 8 grounds

- **Section 21 of the Housing Act 1988 ("no-fault" eviction) is abolished** for assured tenancies under the Act's tenancy reforms.
- **Section 8** is restructured with a substantially expanded list of possession grounds: rent arrears (extended threshold and notice period), anti-social behaviour, landlord-sale and landlord-occupation grounds (with 12-month restriction on re-letting after possession), and tenant-breach grounds.
- New tenant notice period: tenants can end the tenancy with **2 months' written notice** at any point. The 2-month floor is set by **RRA 2025 s.5 amending Protection from Eviction Act 1977 to insert s.5(1ZA)**, independent of the periodic-tenancy mechanic.
- Landlord re-letting restriction: after possession on landlord-sale or landlord-occupation grounds, the property cannot be re-let for **12 months**. Breach is an offence with civil penalty up to £40,000.

**Correction logged 2026-05-23 (F-14):** earlier §20.2 framed the tenant 2-month notice as a consequence of the periodic-tenancy default ("fixed-term lock-in unavailable"). The actual statutory hook is **RRA 2025 s.5** amending Protection from Eviction Act 1977 to insert **PEA 1977 s.5(1ZA)**, which sets the 2-month floor independent of the periodic-tenancy mechanic. Pinning the statutory source prevents future writers from collapsing two distinct provisions. Verified via §20 verification pass against legislation.gov.uk and enacted-Act PDF (lines 2477-2491), 2026-05-23.

### 20.3 Periodic-tenancy default and AST phase-out

- All new assured tenancies are **periodic from grant** under the Act.
- Existing **fixed-term assured shorthold tenancies (ASTs)** convert to periodic on commencement of the relevant Part of the Act (statutory instrument). The Government's published transition window allowed an existing-tenancy conversion period; sessions citing the transition date should refer to the most recent commencement SI rather than rely on press estimates.
- **Default rent period:** monthly (max one month). Six-monthly or annual rent periods are no longer permitted.
- **Fixed-term tenancies of more than 21 years** are outside the assured tenancy regime (HA 1988 Sch 1 para 3D, inserted by RRA 2025 s.31). **Fixed-term tenancies of 7 to 21 years** granted before the Act passed (or within a two-month transitional window) are also outside (HA 1988 Sch 1 para 3E) but this is a **closed transitional cohort, not an ongoing carve-out**. Going forward, only fixed terms longer than 21 years sit outside the assured regime. Most company-let and business tenancies remain outside on the existing HA 1988 carve-outs and are unaffected by the reform.

**Correction logged 2026-05-23 (F-15):** earlier §20.3 collapsed two distinct paragraphs of HA 1988 Sch 1 (paras 3D and 3E) into one phrase, "fixed-term leases of 7+ years". The enacted Act inserts both paragraphs via RRA 2025 s.31: **para 3D** carves out fixed terms of more than 21 years (prospective, ongoing); **para 3E** carves out fixed terms of 7 to 21 years only where granted before the Act passed or within a closed two-month transitional window. The "7+ years" framing risked misleading future writers into thinking new 10-year ASTs sit outside the assured regime; they do not. Going forward, only fixed terms longer than 21 years sit outside. Verified via §20 verification pass against legislation.gov.uk and enacted-Act PDF (lines 3040-3097), 2026-05-23.

### 20.4 Decent Homes Standard extended to PRS

- The Decent Homes Standard (originally a social-housing standard) is extended to the private rented sector.
- A property failing the standard can be subject to enforcement by the local authority; tenants gain a Rent Repayment Order route where the property is non-compliant.
- The standard covers: meeting the statutory minimum for housing (HHSRS Category 1 hazards), reasonable state of repair, reasonably modern facilities, and a reasonable degree of thermal comfort.

### 20.5 Landlord database and PRS Ombudsman

- **Private Rented Sector Database**, a national register of landlords and their properties. Registration is mandatory before a property can be let. **Status as of 2026-05-24: Pt.2 Ch.3 (ss.75-96) not yet commenced; no Statutory Instrument has appointed an operative date.** See §26.6.
- Database records: landlord ID, property addresses, compliance status (gas safety, EICR, EPC, Right to Rent checks, deposit protection).
- **Approved Landlord Redress Scheme regime under RRA 2025 ss.64-74.** s.64 empowers the Secretary of State by regulations to approve **one or more** redress schemes that residential landlords must join. Government policy intention is a single statutory ombudsman, but the enacted Act permits a plural-scheme regime; sessions should hedge as "approved redress scheme(s)" or "statutory landlord redress regime", not "the single statutory ombudsman". **Ombudsman compensation is to be set by regulations under RRA 2025 s.65(2)**; the £25,000 figure widely cited in policy commentary is a government expectation, not on the face of the enacted Act. See §26.5 for the operational depth.
- Operating outside the database or refusing to join an approved scheme = civil penalty up to £7,000 for breach / £40,000 for offence (RRA 2025 s.66) or banning order under HPA 2016 ss.14-23 (extended by RRA 2025 to additional offences).

**Correction logged 2026-05-23 (F-13):** earlier §20.5 stated "Ombudsman decisions can require compensation up to £25,000". This figure is **not on the face of the enacted Act**. RRA 2025 s.65(2)(j) only provides that regulations *may* require members to "provide redress... including paying compensation"; no monetary cap is set in the Act. The £25,000 figure is a government policy expectation widely circulated in commentary but lacks statutory basis. The Wave 3 page `prs-database-landlord-ombudsman-registration-requirements.md` already uses the safer "anticipated at £25,000 on current policy" form; the house position now matches that hedging. Verified via §20 verification pass against legislation.gov.uk 2026-05-23.

### 20.6 Rent-rise mechanics, Section 13 reform, and tribunal challenge

- Rent increases via the **Section 13 procedure only**, once per 12-month period.
- Notice period: **2 months' written notice** of the proposed increase.
- Tenant can challenge at the **First-Tier Tribunal (Property Chamber)** if they believe the proposed rent exceeds market rent. The tribunal cannot now set a rent **above** the landlord's proposed amount (a procedural protection against tenants triggering self-harm by referring).
- The Section 13 route is mandatory; contractual rent-review clauses in tenancy agreements are unenforceable for rent increases.

### 20.7 Pet rights and reasonable refusal

- Tenants gain a statutory right to **request to keep a pet** (RRA 2025 s.11, inserting HA 1988 ss.16A/16B; in force 1 May 2026).
- Landlord must **respond in writing within 28 days** of the request (s.16A(1)(c)), subject to the limited extension circumstances in s.16A(2) to (5).
- **Reasonable refusal is narrowly defined.** Enacted s.16B(4) restricts reasonable grounds to (a) superior-landlord-agreement breach, or (b) superior-landlord refusal after reasonable steps by the immediate landlord. The Bill's broader "reasonable refusal" categories (general building-insurance constraint, layout / size unsuitability, amenity-mix arguments) were replaced by this narrow statutory test during passage.
- **Court remedy, not tribunal.** Where consent is refused unreasonably, the tenant's remedy is **specific performance in the County Court** under s.16B(5). There is **no** FTT Property Chamber route for pet refusal challenges.
- **Pet damage insurance cannot be a consent condition.** The original Bill carried an explicit permitted-payment exception to the Tenant Fees Act 2019 for pet damage insurance; the provision was **removed during Bill passage** and is **not in the enacted Act**. The combined effect of (a) enacted ss.16A/16B saying nothing about insurance and (b) the TFA 2019 prohibition on charges beyond the prescribed list is that a landlord **cannot** require pet insurance as a consent condition. The tenant may take out pet insurance voluntarily, but the contract cannot require it.
- **Landlord's own insurance covering pet damage** (typical £30 to £80 annual premium uplift over standard cover) remains the proper risk-mitigation route and is fully deductible as a normal landlord insurance operating expense.

**Correction logged 2026-05-23 (F-11):** earlier versions of §20.7 (drafted in good faith from the Bill text during the Wave 3 prep house-positions extension) stated that landlords could require pet damage insurance, that reasonable refusal grounds included building-insurance / layout / size considerations, and that an FTT tribunal route existed. All three points were superseded by the enacted Act. Verified against legislation.gov.uk text of RRA 2025 s.11 (inserting HA 1988 ss.16A and 16B only) by Session C during the C7 write 2026-05-22T23:15Z. This is the second §20-vs-enacted-Act drift in Wave 3 after F-6 §19.7; a full §20 verification pass against the enacted Act is recommended before Wave 4 launch.

### 20.8 Prohibition on bidding wars and asking-rent caps

- Landlords and letting agents **cannot invite or accept offers above the advertised rent**.
- The advertised rent is the statutory ceiling for the marketing period; rent increases occur after the tenancy starts via the Section 13 procedure (§20.6).
- **Advance rent prohibited on two layers**:
  - **(i) Pre-tenancy:** RRA 2025 s.9 amends the Tenant Fees Act 2019 to make any pre-lease rent payment a prohibited payment (with carve-outs in the new permitted-payment para 1A).
  - **(ii) Post-tenancy:** RRA 2025 s.8 inserts HA 1988 s.4B making terms providing for rent due in advance of the rent period of no effect, with carve-outs for "initial rent" payable during an "initial 28 day period" and rent due during a "permitted pre-tenancy period" (the gap between contract execution and the first day of the tenancy).
- Combined effect: landlords cannot demand 6 or 12 months upfront as a deposit-substitute.

**Correction logged 2026-05-23 (F-16):** earlier §20.8 framed advance-rent restrictions as a single "first month" rule. The enacted Act creates two separate regimes. **(i) Pre-tenancy:** RRA 2025 s.9 amends the Tenant Fees Act 2019 to make any pre-lease rent payment a prohibited payment (with carve-outs in the new permitted-payment para 1A). **(ii) Post-tenancy:** RRA 2025 s.8 inserts HA 1988 s.4B making terms providing for rent due in advance of the rent period of no effect, with carve-outs for "initial rent" payable during an "initial 28 day period" and rent due during a "permitted pre-tenancy period" (the gap between contract execution and the first day of the tenancy). The previous single-rule framing risked misleading writers about which prohibition applies pre- vs post-lease. Verified via §20 verification pass against legislation.gov.uk and enacted-Act PDF, 2026-05-23.

### 20.9 Transition for existing tenancies

- Existing fixed-term ASTs convert to periodic at the commencement of the tenancy reform Part (see §20.1).
- Tenants in fixed-term tenancies gain new tenant-notice rights from commencement.
- Pre-commencement Section 21 notices already served remain operative for a defined transitional window; sessions advising on in-progress possession claims should check the specific transitional saving provision.

### 20.10 Enforcement and penalties

- Local authorities have expanded investigatory powers (entry, document production).
- Civil penalty regime: up to **£40,000** per offence for serious breaches (operating outside database, breach of re-letting restriction, repeated decent-homes failures).
- **Rent Repayment Orders** (RROs) extended to new offences; tenants can claim up to **2 years' rent** (extended from 12 months by RRA 2025 s.98 amending HPA 2016 ss.41, 42 and 44, in force 1 May 2026 per SI 2026/421 reg.3).
- **Banning orders** for repeat or serious offenders.

**Correction logged 2026-05-23 (F-12):** earlier §20.10 stated "tenants can claim up to 12 months' rent" for Rent Repayment Orders. The enacted RRA 2025 s.98 substitutes "**2 years**" for "12 months" across Housing and Planning Act 2016 ss.41(2)(b), 42(5), and 44, doubling the RRO maximum claim period. In force 1 May 2026 per SI 2026/421 reg.3. Two existing live pages (`london-property-accountant.md` line 124 and `property-accountant-bournemouth-landlords-tax-services.md` lines 38-40 and 207) carried the legacy 12-month figure and have been back-patched in the same commit as this correction. Verified via §20 verification pass against legislation.gov.uk and enacted-Act PDF (lines 8678-8687 and 9179-9180), 2026-05-23.

### 20.11 Tax implications for landlords (Property Tax Partners angle)

These are the items most relevant to the firm's positioning, not the legal-services-firm positioning competitor sites lean on:
- **Rent-increase frequency limits** affect cash-flow modelling and Section 24 (§4) interactions: where mortgage interest rises faster than the Section 13-permitted annual rent increase, the landlord's S24 tax credit cap may bind earlier.
- **12-month landlord-sale re-letting restriction** affects timing of CGT disposals: a landlord taking possession on landlord-sale grounds must complete the sale within the 12-month re-let window or face a 12-month income gap.
- **Landlord's own pet damage insurance** (the £30 to £80 annual uplift over standard cover noted in §20.7) is deductible as ordinary landlord insurance against rental income. Pet damage insurance **cannot lawfully be required as a consent condition** on the tenant; see §20.7 for the underlying rule.
- **PRS database registration fees and Ombudsman subscription** are deductible as professional expenses of the rental business.
- **Decent Homes Standard compliance spend**, repairs are revenue-deductible; capital improvements add to base cost for CGT.
- **Sale-driven possession route** affects the §17.4 NRCGT timeline for non-resident landlords selling UK property.

**Correction logged 2026-05-23 (F-17):** earlier §20.11 bullet 3 stated "Pet damage insurance (where required as a consent condition) is a deductible expense". Following the F-11 correction to §20.7, pet damage insurance **cannot lawfully be required as a consent condition** under the enacted Act. The §20.11 bullet was internally inconsistent with the corrected §20.7 (housekeeping omitted during F-11 back-patching, not a fresh legal drift). Rewritten to: landlord's own pet damage insurance (the £30 to £80 annual uplift in §20.7) is deductible as ordinary landlord insurance; pet damage insurance cannot be required as a consent condition on the tenant. Cross-reference to §20.7 added to prevent future drift. Verified via §20 verification pass 2026-05-23.

### 20.12 Commencement timeline (Wave 3 Stage 2 verification, locked 2026-05-22)

Verified against legislation.gov.uk (RRA 2025 contents page, SI 2025/1354, SI 2026/421) on 2026-05-22. The Act is enacted; substantive provisions arrive in waves via Statutory Instrument.

**Commencement orders made to date (England, the only jurisdiction Property Tax Partners advises on):**
- **SI 2025/1354** (Commencement No. 1 Regulations 2025): brought sections 63, 99 and 100 plus parts of Schedule 4 into force on **27 December 2025**. These cover preparatory provisions (regulation-making powers, enforcement-authority designations, Decent Homes preliminary provisions).
- **SI 2026/421** (Commencement No. 2 and Transitional and Saving Provisions Regulations 2026): made 16 April 2026, appointed day **1 May 2026**. This is the major substantive commencement.

**Status by provision as of 2026-05-22 (today):**

| Provision | Section / Part | In force? | Date | Source |
|---|---|---|---|---|
| Periodic tenancies as default | s.1 (Ch.1 Pt.1) | **In force** | 1 May 2026 | SI 2026/421 reg.2 |
| Section 21 abolition (AST regime ended) | s.2 (Ch.1 Pt.1) | **In force** | 1 May 2026 | SI 2026/421 reg.2 |
| Reformed Section 8 grounds for possession | s.3 + Sch.1 (Ch.1 Pt.1) | **In force** | 1 May 2026 | SI 2026/421 reg.2 |
| Section 13 / statutory rent-increase procedure | s.6 (Ch.1 Pt.1) | **In force** | 1 May 2026 | SI 2026/421 reg.2 |
| Tribunal route for rent challenge | s.7 | **In force** | 1 May 2026 | SI 2026/421 reg.2 |
| Advance rent prohibition (post-lease) | s.8 | **In force** | 1 May 2026 | SI 2026/421 reg.2 |
| Advance rent prohibition (pre-lease) | s.9 | **In force** | 1 May 2026 | SI 2026/421 reg.2 |
| Pet rights (right to request) | s.11 | **In force** | 1 May 2026 | SI 2026/421 reg.2 |
| Bidding-wars / rental-bidding prohibition (Ch.6 Pt.1) | Ch.6 Pt.1 | **In force** | 1 May 2026 | SI 2026/421 reg.3 |
| Discrimination protections (children, benefits) (Ch.3 Pt.1) | Ch.3 Pt.1 | **In force** | 1 May 2026 | SI 2026/421 reg.3 |
| Financial penalties and offences | s.15, s.16, Sch.5 | **In force** | 1 May 2026 | SI 2026/421 reg.2 + reg.3 |
| Landlord Redress Scheme / PRS Ombudsman (Ch.2 Pt.2, ss.64-74) | Pt.2 Ch.2 | **Partial** (s.74 only) | 1 May 2026 | SI 2026/421 reg.3 |
| PRS Database (Ch.3 Pt.2, ss.75-96) | Pt.2 Ch.3 | **Pending** | not yet appointed | n/a |
| Decent Homes Standard for PRS (Pt.3, ss.100-101) | Pt.3 | **Partial** (s.100 + Sch.4 partial in force 27 Dec 2025; full standard awaits SI) | 27 Dec 2025 + pending | SI 2025/1354 + pending |
| Wales-specific provisions (ss.43-49) | ss.43-49 | **Partial — Wales-only, out of PTP scope** | SI 2026/6 appointed Wales commencement (articles 2(a)-(g)); PTP advises England-only so not Wave-5+ relevant. Footnote added 2026-05-23 per statute verification sub-agent. | legislation.gov.uk |

**Practical writing rule for sessions:**
- Section 21 abolition, periodic tenancies, reformed Section 8, Section 13 rent-rise procedure, advance-rent ban, bidding-wars ban, pet rights, financial penalties: **write in present tense as in force from 1 May 2026**.
- PRS Database + full Ombudsman scheme: **write as "scheduled by commencement order"**, expected before April 2027 per government policy statements but no SI appointed day yet as of 2026-05-22.
- Decent Homes Standard: preliminary provisions in force from 27 Dec 2025; **the substantive standard for PRS awaits a further commencement order**. Frame current state as "transitional, with the full standard pending Statutory Instrument".

**Source-of-truth re-check:** before any session writes a definite-tense claim about an RRA 2025 provision, re-verify against `https://www.legislation.gov.uk/ukpga/2025/26/contents` and the SI commencement table (SIs 2025/1354 and 2026/421 are the operative orders as of 2026-05-22; new SIs may have appointed further sections after that date).

### 20.13 Do not write

- "The Renters' Rights Bill is in passage" (received Royal Assent on 27 October 2025).
- "Section 21 is still available" (abolished for assured tenancies under the Act; subject to commencement order, check specific provision).
- "Tenants must give 2 months notice always" (tenants can give 2 months at any point in a periodic tenancy; landlord notice periods vary by ground).
- "Fixed-term ASTs continue" (all new assured tenancies are periodic; existing fixed-terms convert at commencement).
- "Landlords can demand 6 months rent upfront" (prohibited).
- "The Act is the Renters' Rights Act 2026" (the Act is 2025-dated by enactment; "2026" appears in some commencement contexts but the citation is "2025 c. 26").

---

**End Wave 3 extension.** Sessions A (ATED), B (MTD ITSA), C (RRA / Tenancies) use §§2 + 18 (ATED), §§3 + 19 (MTD), §§12 + 20 (RRA) together. §§18-20 are the working detail; §§2, 3, 12 are superseded by the Wave 3 extensions where they conflict. Any contradiction between competitor sources and §§18-20, flag in `wave3_site_wide_flags.md`.

---

## 21. Ltd Co + FIC — Wave 4 extension (locked, 2026-05-23)

**Verification note:** numeric figures in §21.4 (CT rates 2026/27, NI thresholds 2026/27, HMRC official rate of interest, Employment Allowance value) reflect the expected 2026/27 Budget settlement at time of locking. Sessions verify against current gov.uk at write time per §7 of NETNEW_PROGRAM. The framework, not the figures, is the locked position; precise numeric values are commodity and may shift via Budget / Spring Statement / monetary policy without invalidating the framework.

### 21.1 Directors' loan accounts (DLA)

- **Credit balances** created on s.162 incorporation transfer: tax-free repayment route; balance is the founder's investment in the company, tracked as a director's loan owed by company to director.
- **Repayment order:** usually DLA first (tax-free), then dividends (subject to dividend rates), then salary (PA + NI), then pension contributions (employer side, deductible).
- **HMRC official rate of interest** on credit balance is set quarterly by HMRC (recent rates have varied between 2% and 3.75%; verify current rate against gov.uk publication "Beneficial loan arrangements — HMRC official rates" at write time). Interest paid to director is taxable income on director, deductible by company within the CTA 2010 s.453 close-company rules.
- **Debit balances** (overdrawn DLA): s.455 CTA 2010 charge at the dividend upper rate set by ITA 2007 s.8(2) for the tax year in which the loan is made — **33.75% for loans made before 6 April 2026, 35.75% for loans made on or after 6 April 2026** (FA 2026 s.4(1)(b) substituted s.8(2) to "the dividend upper rate is 35.75%" for tax year 2026/27 onwards; s.455 follows by reference, so no separate amendment to s.455 was needed). Charge falls on amounts unpaid 9 months after year-end; repayable on later director repayment. F-9 / Wave 6 lock 2026-05-24. **§16.27 / §16.42 rate-by-reference verification pattern: sessions writing s.455 must verify s.8(2) at write time, not rely on a flat-percentage house-position figure.**
- **DLA exhaustion trap:** founder drawing monthly rent receipts as DLA repayment can exhaust a £500k incorporation-credit balance within 4-5 years and find themselves forced into higher-rate dividend or salary extraction earlier than the s.162 plan envisaged. Worked-example discipline expected.

### 21.2 Share-class structures and the settlements legislation

- **Alphabet shares** (A / B / C class shares with differential dividend rights): standard property-SPV design for splitting dividends to spouse + adult children.
- **Settlements legislation ITTOIA 2005 s.624:** settlor-attribution risk where a spouse / minor / adult child receives dividends from shares they didn't pay full consideration for AND the settlor retains a benefit. Carve-out from *Jones v Garnett (Arctic Systems)* [2007] UKHL 35: an outright gift of ordinary shares to a spouse is not within s.624 because of the s.626 spouse-exception.
- **Child shares:** outright gift of shares to minor child is within s.624 (income treated as settlor's). Adult-child shares are not within s.624 directly, BUT bare-trust holdings for minor children remain settlor-attributed until child turns 18.
- **Growth shares vs preference shares:** standard FIC design uses preference shares (£-coupon dividend, frozen value) for founder + growth shares (entitled to capital growth) for next generation. Preference and ordinary classes can coexist with alphabet classes for dividend-splitting between founders.

### 21.3 Charging rent to own property company

- Shareholder-director letting personally owned property to their own SPV at market rent: rental income for individual (ITTOIA 2005 s.272 property income), deductible for company (CTA 2009 s.54), section-24 applies on the individual side as normal for residential property.
- **Connected-party transfer-pricing risk:** TIOPA 2010 Pt 4 transfer-pricing rules apply to connected-party transactions but SME exemption (TIOPA 2010 s.166) generally takes most landlord-SPV transactions out. Where the SPV exceeds SME thresholds (250 staff or €50m turnover) and rent is set above or below market, HMRC can adjust under transfer-pricing rules.
- **Market-rent evidence pack:** independent valuer letter, comparable local listings printed at lease start, periodic review (annual) documented. Lack of formal lease + lack of market-rent evidence is the connected-party challenge pattern HMRC opens at enquiry.
- **Salary-vs-rent extraction comparison:** rent extracts at landlord's marginal rate (with s.24 finance-cost restriction applied); salary extracts at PA + NI (employee + employer 13.8% over £5k threshold). For property SPV directors, rent often out-performs salary as an extraction route if the property is genuinely personal property let to the company.

### 21.4 Salary vs dividends in property SPV 2026/27

- **CT rates 2026/27 (confirmed gov.uk 2026-05-23):** 19% small profits rate (≤ £50k profits), 25% main rate (≥ £250k profits), marginal relief tapered band £50k-£250k effective 26.5% rate. Unchanged from 2025/26; Spring Statement 2025 confirmed no CT rate changes.
- **NI thresholds + rates 2026/27 (confirmed gov.uk 2026-05-23):** Primary threshold (employee NI) £12,570 / yr; Secondary threshold (employer NI) £5,000 / yr (lowered from £9,100 by Reeves Autumn Budget 2024, in force 6 April 2025); **Employer NI rate 15% above ST (raised from 13.8% by Reeves Autumn Budget 2024, in force 6 April 2025; F-19 correction 2026-05-23, prior locked text said 13.8% — stale pre-6-April-2025 figure).** Employment Allowance £10,500 / yr (raised from £5,000 by Reeves Autumn Budget 2024).
- **Dividend rates 2026/27 (confirmed gov.uk 2026-05-23):** £500 dividend allowance, then **10.75% basic, 35.75% higher, 39.35% additional. Basic and higher dividend rates raised by 2 percentage points from 6 April 2026; additional rate unchanged at 39.35%; 2025/26 and prior rates were 8.75% / 33.75% / 39.35%. F-20 correction 2026-05-23, prior locked text said 8.75% / 33.75% — stale pre-6-April-2026 figures; all Wave 4 + earlier salary-vs-dividend worked examples carrying 8.75% / 33.75% require back-patching, in flight via sub-agent (`docs/property/wave5_f19_f20_patch_manifest_2026-05-23.md`).**
- **s.455 close-company loan charge 2026/27 (F-9 lock 2026-05-24, verified gov.uk):** **35.75% on amounts unpaid 9 months after year-end for loans made on or after 6 April 2026** (was 33.75% for loans made before that date). s.455 rate references the dividend upper rate at ITA 2007 s.8(2), which FA 2026 s.4(1)(b) substituted to 35.75% effective 2026/27 onwards. See §21.1 for full DLA mechanics and the rate-by-reference verification discipline.
- **Employment Allowance exclusions:** single-director SPV where the director is the only paid employee = NOT eligible for Employment Allowance (the "sole-director exclusion"). Multi-director SPVs may qualify subject to the connected-companies rules; the test is whether the company has at least one secondary contributor in addition to the director.
- **Standard "tax-efficient mix"** for a single-director property SPV in 2026/27:
  - Salary: £5,000 (NI secondary threshold floor) where Employment Allowance not available; OR £12,570 PA floor where Employment Allowance available (rare for single-director SPVs).
  - Dividends: up to PA cliff (£50,270) then up to higher-rate threshold (£125,140), beyond which marginal rate jumps to 39.35%.
  - Pension: employer contributions (up to £60k annual allowance) deductible against CT; £200k+ in pension is a useful extraction lever for retiring-age founders.
- House position framing: provide marginal-rate worked examples at £30k / £50k / £100k / £125k profit bands; no single "optimum" recommendation, the optimum is reader-specific.

### 21.5 FIC mechanics

- **FIC = a private company holding investment assets** (property, shares, cash) used to manage and transfer family wealth. Distinguished from a trading company by predominantly investment-income profile.
- **Articles of Association** for FIC bespoke beyond model articles (CA 2006 s.18): reserved-matters lists (decisions requiring founder consent for life), pre-emption rights on share transfer, drag-along / tag-along clauses, dividend-control mechanics by class, redemption / amortisation rules for preference shares.
- **Board governance:** decisions require board resolutions or written resolutions; minute book maintained; dividend declarations dated and signed. Substance-over-form risk where founder "is" the FIC operationally; HMRC may re-characterise distributions as personal income.
- **Close investment-holding company (CIHC) status:** pure-investment FIC is a CIHC under **CTA 2010 s.18N (and ss.18N-Q)**. Consequence: denied the small profits rate; CT at 25% main rate from 2026/27 regardless of profit level. **§16.3 / Wave 1 lesson:** most BTL SPVs are NOT CIHCs because the s.18N qualifying-purpose carve-out takes unconnected-tenant land investment out of CIHC status. A pure-investment FIC holding tenant-let BTL is excluded from CIHC for the SAME reason; verify on a per-FIC basis. Where FIC predominantly holds shares / cash / connected-tenant property, CIHC status applies.
- **Tax profile generally:** Section 24 does NOT apply at corporate level (s.24 is income-tax rule, FIC pays CT not IT). The £500 personal dividend allowance does NOT apply at corporate level. SBA on commercial property held within the FIC available where structure qualifies.
- **IHT mechanics:** FIC shares are investment-company shares; pure-investment FICs (BTL portfolios) do NOT qualify for BPR per *Pawson* principles. Growth-share design transfers value out of founder's estate over 7 years (PET); s.165 holdover relief is NOT available for transfers of investment-FIC shares (TCGA 1992 s.165 + Sch 7 limit holdover to trading-company shares). Detailed IHT framing for FIC-as-estate-tool is in §22.6.
- **CGT on disposal of FIC shares:** standard 18% / 24% rates (TCGA 1992 s.4 as amended 2024/25 onwards), no BADR for investment FICs.

### 21.6 Citations for §21

- ITTOIA 2005 s.272, s.624, s.626.
- CTA 2009 s.54.
- CTA 2010 s.18N (CIHC qualifying-purpose carve-out), ss.18N-Q (CIHC framework), s.453 (close-company benefits to participators), s.455 (overdrawn DLA charge).
- TIOPA 2010 Pt 4, s.166 (transfer-pricing + SME exemption).
- CA 2006 s.18 (articles), s.392 (year-end changes).
- TCGA 1992 s.165, Sch 7 (holdover limited to trading).
- *Jones v Garnett* [2007] UKHL 35 (settlements + Arctic Systems carve-out).
- *Pawson v HMRC* [2013] UKUT 050 (TCC) (investment / trading line for BPR).

### 21.7 Do not write

- "DLA repayment is tax-free indefinitely" (true while balance exists; founder must plan around exhaustion).
- "Alphabet shares to children avoid s.624" (false for minors; subject to anti-attribution for adult children only via the spouse-exception path).
- "FIC shares qualify for BPR" (false for investment FICs).
- "s.165 holdover applies on FIC share gifts" (false for investment FICs; available only for trading-company shares).
- "All BTL SPVs are CIHCs" (false; s.18N qualifying-purpose carve-out excludes unconnected-tenant land investment).
- "Employment Allowance available to all SPVs" (false; sole-director SPV explicitly excluded; multi-director SPVs subject to connected-company rules).
- "FIC is a CIC under CTA 2010 s.34" (wrong citation; CTA 2010 s.18N is the correct cite for CIHC qualifying-purpose).

---

## 22. IHT estate planning for landlords — Wave 4 extension (locked, 2026-05-23)

Extends and deepens the Wave 2 IHT positions in §15 / §16 with landlord-specific estate-planning angles. Cross-references §15 (NRB / RNRB / PETs / GROB family-home / pension-IHT 2027) and §21.5 (FIC mechanics, generic). §22.6 is the IHT-side framing of FICs; §21.5 is the corporate-side mechanics. Boundary between §22 and §21.5: §21.5 covers corporate tax + governance + share-class mechanics; §22.6 covers IHT value-freeze framing + 7-year-PET-on-share-gift + comparison vs direct property gift.

### 22.1 BPR for landlords: the Pawson investment line

- **Pure BTL fails BPR.** *Pawson v HMRC* [2013] UKUT 050 (TCC) is the anchor case: passive rent collection from residential lettings is "mainly investment", caught by s.105(3) IHTA 1984. BPR does NOT apply.
- **Boundary with serviced accommodation:** SA businesses MAY qualify where services beyond passive lettings are substantial (managed kitchen, daily cleaning, breakfast, concierge); the bar is high (see *Pawson* + *Brander v HMRC* [2010] UKUT 300 (TCC) discussion). See Wave 2 page `serviced-accommodation-bpr-eligibility-pawson-test`.
- **HMO landlords:** generally fail; the multi-tenant arrangement does not transform passive lettings into trading.
- **Property developers:** trading element (WIP, sites under development, build-to-rent during construction) can qualify; rental-investment element will not.
- **From 6 April 2026:** even where BPR applies, **£1m combined BPR + APR cap** (see §15.4); above-cap relief drops to 50%, giving effective 20% IHT on the above-cap portion.

### 22.2 Deed of variation (s.142 IHTA 1984) for landlord estates

- **Mechanism:** beneficiary of estate can vary their inheritance within 2 years of death; variation reads back to the deceased for IHT (s.142 IHTA 1984) and for CGT (TCGA 1992 s.62(6)).
- **Common uses for landlord estates:** redirecting a BTL property from spouse to adult children (skipping a generation), redirecting to a charity to qualify for the Sch 1A 36% reduced rate, equalising NRB / RNRB across spouses where first death wasted allowance.
- **Critical rule: no consideration.** Variation must be for no monetary consideration in exchange; consideration destroys the s.142 read-back.
- **Election:** the variation must include an election that s.142 (IHT) and / or s.62(6) (CGT) applies. Otherwise the redirection is a fresh PET / disposal by the original beneficiary.
- **Personal-representative consent:** required only where the variation increases IHT (PRs must agree to bear the higher charge).

### 22.3 Charitable legacy + 36% reduced rate (Sch 1A IHTA 1984)

- Where ≥10% of "components of the estate" go to qualifying charity, the IHT rate on the chargeable estate drops from 40% to 36%.
- **Components of the estate:** Sch 1A divides the estate into three "components": (i) general component (free estate excluding jointly owned property and settled property), (ii) survivorship component (joint property passing by survivorship), (iii) settled component (settled property). Each component is tested separately for the 10% threshold OR a "merger election" can be made under Sch 1A para 7 to combine components.
- **Qualifying charity:** must be UK-registered or EEA-equivalent (post-Brexit transitional rules apply).
- **Maths:** the 36% rate often makes the charity gift "self-funding" for portfolios above approximately £2m. Worked-example discipline expected on the break-point where 36% on (estate minus charity) equals 40% on (estate).

### 22.4 CLT into discretionary trust

- **Mechanism:** lifetime gift into discretionary trust = chargeable lifetime transfer (CLT). Immediate 20% IHT on excess over NRB (less annual exemption + 7-yr cumulative gifts).
- **If settlor dies within 7 years:** further 20% (to bring cumulative rate to 40%), tapered per s.7(4).
- **10-year periodic charges:** up to 6% on chargeable property at each 10-year anniversary (s.64 IHTA 1984).
- **Exit charges:** proportional charge on capital distributions out of trust between periodic charges.
- **CGT s.260 holdover:** available on gift into trust (TCGA 1992 s.260) provided trust is non-settlor-interested. Settlor-interested trusts (where settlor or spouse can benefit) NOT eligible for s.260 holdover under TCGA 1992 ss.169B-169G, so CGT is immediate at market value.
- **Comparison vs FIC for landlords:** trust = entry IHT + periodic charges, but s.260 holdover available (no CGT on transfer in if non-settlor-interested). FIC = no entry IHT, but CGT immediate on transfer in (no s.165 holdover for investment FIC per §21.5). Decision is reader-specific.

### 22.5 Spouse exemption + transferable allowances

- **s.18 IHTA 1984 spouse exemption:** unlimited transfers between UK-domiciled / long-term-resident spouses are exempt from IHT.
- **Limited spouse exemption** for transfers TO a non-UK-domiciled / non-long-term-resident spouse: £325k lifetime limit (s.18(2)). The non-UK-spouse can elect to be treated as long-term-resident under s.267ZA to access full exemption (with cost: brings worldwide assets into IHT scope).
- **Transferable NRB (TNRB):** unused NRB on first death transfers to surviving spouse (s.8A IHTA 1984). Claimed on IHT402 within 2 years of second death.
- **Transferable RNRB (TRNRB):** unused RNRB on first death transfers. Claimed on IHT436.
- **Second-death window planning:** between first and second death, the surviving spouse can use spouse exemption to consolidate the portfolio (no IHT on first-death transfers in), then face the full estate value on second death potentially above £2m RNRB taper threshold. Counter-strategies: gifting in survivor's lifetime, charity legacy on second death, equity-release to spend down portfolio value.

### 22.6 FIC as estate-planning value-freeze tool

- **NOT a re-statement of §21.5.** §21.5 is the corporate-side mechanics (share classes, CIHC status, CT profile). §22.6 is the IHT-side framing.
- **Value-freeze:** founder transfers property into FIC and retains preference shares with fixed £-coupon dividend (frozen value). Growth shares (entitled to capital growth + control) are gifted to next generation as PETs.
- **7-year clock starts on the share gift, NOT on FIC formation.** Founder must survive 7 years for full PET exemption.
- **Comparison vs direct property PET gift (Wave 4 C4):** direct property gift = single asset, CGT s.17 deemed disposal at market value (no holdover for non-business BTL). FIC growth-share gift = company-share gift, valued with minority discount, but still CGT MV (no s.165 holdover for investment FIC per §21.5). FIC route can be lower CGT due to minority-discount valuation.
- **GROB risk:** if founder retains the preference dividend and the FIC's primary asset is property the founder also occupies / uses, GROB s.102 FA 1986 may apply. Counter: founder pays full market rent for any use; or founder takes pure cash-coupon income from preference shares with no use of underlying property.
- **Cross-bucket boundary with §21.5 / Bucket A FIC pages:** Wave 4 A8 = FIC retirement income mechanics; A9 = FIC growth-share PET mechanics at point of gift; A10 = FIC blended-family articles design. Wave 4 C7 = FIC value-freeze for IHT planning, citing A8 / A9 / A10 as the operational siblings without re-walking their ground.

### 22.7 Citations for §22

- IHTA 1984: s.7 (rate), s.8A (TNRB), s.18 (spouse), s.62 (cumulative), s.105 (BPR), s.142 (DoV), Sch 1A (36% rate), s.267ZA (long-term-resident election).
- TCGA 1992: s.17 (deemed disposal at MV), s.62 (DoV CGT read-back), s.165 (holdover for trading shares), s.260 (holdover for CLT), ss.169B-169G (settlor-interested trust exclusion).
- FA 1986: s.102 (GROB).
- *Pawson v HMRC* [2013] UKUT 050 (TCC); *Brander v HMRC* [2010] UKUT 300 (TCC).
- HMRC IHTM (BPR at IHTM25000+; APR at IHTM24000+; DoV at IHTM35000+; charitable rate at IHTM43000+; 10% test at IHTM44000+).

### 22.8 Do not write

- "Pure BTL qualifies for BPR after the 2026 reforms" (still doesn't, per *Pawson*).
- "Deed of variation can be done at any time after death" (false; 2-year window).
- "10% charity threshold is calculated on the entire estate" (false; on the relevant component(s), with merger election possible).
- "Discretionary trust pays no entry IHT" (false; 20% on excess over NRB).
- "FIC value-freeze avoids the 7-year clock" (false; 7-year clock starts on share gift, not FIC formation).
- "s.260 holdover applies to all trust gifts" (false; settlor-interested trusts excluded per ss.169B-G).

---

**End Wave 4 extension.** Session A (LtdCo + FIC) uses §11 + §21 together; §21 is the working detail. Session B (MTD operational) uses §3 + §19 (with §19.10-§19.17 as Wave 4 additions). Session C (IHT estate planning) uses §15 + §22; §22.6 must read with §21.5 to enforce the FIC cross-bucket boundary. Any contradiction between competitor sources and §§21-22, flag in `wave4_site_wide_flags.md`.


---

## 23. Devolved property tax (Welsh LTT, Scottish LBTT, ADS), Wave 5 extension (locked, 2026-05-23)

Extends §1 (SDLT for England + Northern Ireland) with the devolved-jurisdiction working detail Wave 5 Session B needs. §1 remains authoritative for England + Northern Ireland; §23 covers Wales (Welsh Revenue Authority) and Scotland (Revenue Scotland) and the cross-jurisdictional rules every UK landlord page must respect. **Verified against gov.wales, revenue.scot, and legislation.gov.uk on 2026-05-23** for current rates, bands, surcharges, and statutory citations.

**Critical framing for sessions:** Wales (LTT) and Scotland (LBTT) are wholly devolved property-transfer taxes with their own legislation, rate tables, surcharges, reliefs, and tribunal routes. Northern Ireland is **NOT** devolved for property-transfer tax: SDLT applies in NI exactly as in England under FA 2003. Pages must not conflate "the UK" with "England + Wales" or with "Great Britain"; each jurisdiction has its own rule book.

### 23.1 Welsh LTT, main residential rates and bands (2026/27)

**Statutory basis:** Land Transaction Tax and Anti-avoidance of Devolved Taxes (Wales) Act 2017 ("LTTA 2017"), `https://www.legislation.gov.uk/anaw/2017/1/contents`. Rates and bands are set by regulations under LTTA 2017 s.24 (residential) and s.25 (non-residential), most recently the Land Transaction Tax (Tax Bands and Tax Rates) (Wales) Regulations.

**Main residential rates (purchaser does NOT own another dwelling), in force from 10 October 2022, unchanged for 2026/27:**

| Band | Rate |
|---|---|
| £0 to £225,000 | 0% |
| £225,001 to £400,000 | 6% |
| £400,001 to £750,000 | 7.5% |
| £750,001 to £1,500,000 | 10% |
| Above £1,500,000 | 12% |

Source: `https://www.gov.wales/land-transaction-tax-rates-and-bands`, verified 2026-05-23.

**Key structural differences from SDLT (§1):**
- Welsh LTT nil-rate band is £225,000, materially higher than SDLT's £125,000 nil band (since 1 April 2025).
- **No first-time-buyer relief in Wales.** The £225,000 nil band already covers most starter purchases; Wales does not operate a separate FTB regime (contrast England's £300,000 FTB-only nil band, withdrawn fully above £500,000).
- **No non-resident-purchaser surcharge.** Wales has not introduced the equivalent of the 2% SDLT non-resident surcharge that applies in England + NI from 1 April 2021. Non-UK-resident buyers in Wales pay the same standard or higher rates as Welsh residents.

### 23.2 Welsh LTT, higher residential rates (additional residential property)

**In force from 11 December 2024**, after a 1 percentage point uplift across all higher-rate bands made by **The Land Transaction Tax (Tax Bands and Tax Rates) (Wales) (Amendment) Regulations 2024**, made under LTTA 2017 and brought in by the made-affirmative procedure. Welsh higher rates are a standalone band structure, NOT a flat surcharge stacked on the main rates (contrast SDLT's 5% additional dwellings surcharge added on top of standard bands).

| Band | Higher residential rate (from 11 December 2024) |
|---|---|
| £0 to £180,000 | 5% |
| £180,001 to £250,000 | 8.5% |
| £250,001 to £400,000 | 10% |
| £400,001 to £750,000 | 12.5% |
| £750,001 to £1,500,000 | 15% |
| Above £1,500,000 | 17% |

Source: `https://www.gov.wales/higher-rates-land-transaction-tax-overview`, `https://www.gov.wales/welsh-government-draft-budget-changes-land-transaction-tax-and-landfill-disposals-tax` (10 December 2024 announcement), verified 2026-05-23.

**When higher rates apply:** the buyer (or any joint buyer) owns another dwelling **anywhere in the world** at the effective date of the transaction with a market value of £40,000 or more. The £40,000 minor-interest threshold mirrors the SDLT Schedule 4ZA pattern (§1 / §24.5).

**Corporate buyers:** Welsh LTT does NOT replicate the SDLT 15% rate for non-natural-persons buying a >£500,000 dwelling (Sch 4A FA 2003). Wales applies the higher residential rates table above to corporate buyers; there is no separate corporate flat rate.

**Replacement-of-main-residence rule:** a buyer replacing their main residence within the prescribed window pays the main residential rates (§23.1), not the higher rates, even if they own another dwelling. The Welsh rule mirrors the SDLT 3-year replacement window (LTTA 2017 Sch 5 paras 8-11). Where the previous main residence is sold AFTER the effective date of the new purchase, the buyer pays higher rates initially and claims a repayment within the 3-year window via the Welsh Revenue Authority repayment mechanism.

### 23.3 Welsh LTT, multiple dwellings relief, non-residential rates, reliefs

**Multiple dwellings relief (MDR) RETAINED in Wales, diverges sharply from SDLT.** SDLT's MDR was abolished for transactions with effective dates on or after 1 June 2024 (Finance (No.2) Act 2024); Welsh LTT MDR was **modified, not abolished**, by the Land Transaction Tax (Modification of Multiple Dwellings Relief) (Wales) Regulations 2025 and again by the Land Transaction Tax (Modification of Relief for Acquisitions Involving Multiple Dwellings) (Wales) Regulations 2026:

- From **7 February 2025**: MDR is **not available** where an individual buys a dwelling with one or more "subsidiary dwellings" AND would otherwise pay LTT at the main residential rates. The carve-out targets main-residence-with-annexe purchases.
- From **13 February 2026**: the **minimum tax rate** under MDR is raised from **1% to 3%**. The minimum-rate floor reduces the relief's headline benefit for genuine multi-dwelling acquisitions.
- MDR remains available for portfolio investors and corporate buyers acquiring genuinely separate dwellings in a single transaction. Source: `https://www.gov.wales/written-statement-amendment-land-transaction-tax-multiple-dwellings-relief` (20 January 2026); `https://www.gov.wales/the-land-transaction-tax-modification-of-relief-for-acquisitions-involving-multiple-dwellings-wales-regulations-2026-integrated-impact-assessment-html`. Verified 2026-05-23.

**Six-or-more-dwellings non-residential treatment:** Wales does NOT have an LTT equivalent to FA 2003 s.116(7) (the SDLT six-dwellings rule, §1). Welsh portfolio acquisitions remain residential for LTT and use MDR (subject to §23.3 modifications above) to mitigate. The cross-jurisdictional trap: a portfolio buyer who is used to the SDLT six-dwellings automatic non-residential treatment will get a different answer in Wales.

**Non-residential LTT bands (unchanged from 22 December 2020, in force for 2026/27):**

| Band | Rate (freehold / lease premium) |
|---|---|
| £0 to £225,000 | 0% |
| £225,001 to £250,000 | 1% |
| £250,001 to £1,000,000 | 5% |
| Above £1,000,000 | 6% |

Source: `https://www.gov.wales/land-transaction-tax-rates-and-bands`, verified 2026-05-23.

**Other Welsh LTT reliefs commonly relevant to landlords:**
- **Charities relief** (LTTA 2017 Sch 19): charity purchasing a dwelling for charitable use.
- **Group relief** (LTTA 2017 Sch 16): transfers between members of the same corporate group, mirroring FA 2003 Sch 7 in scope.
- **Sub-sale relief** (LTTA 2017 Sch 2 Part 4): narrow application, mirrors SDLT sub-sale.
- **Partnership relief** (LTTA 2017 Sch 7): incorporation of a genuine pre-existing letting partnership; same evidential bar as SDLT Sch 15 (§1).

### 23.4 Scottish LBTT, main residential rates and bands (2026/27)

**Statutory basis:** Land and Buildings Transaction Tax (Scotland) Act 2013 ("LBTT(S)A 2013"), `https://www.legislation.gov.uk/asp/2013/11/contents`. Rates and bands are set by Scottish Statutory Instrument under LBTT(S)A 2013 s.24.

**Main residential rates (purchaser does NOT own another dwelling), in force for 2026/27 (Scottish Budget 2026/27 confirmed no change to LBTT rates or bands):**

| Band | Rate |
|---|---|
| £0 to £145,000 | 0% |
| £145,001 to £250,000 | 2% |
| £250,001 to £325,000 | 5% |
| £325,001 to £750,000 | 10% |
| Above £750,000 | 12% |

Source: `https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property`, Scottish Budget 2026/27 confirmation at `https://www.gov.scot/publications/scottish-budget-2026-2027/pages/4/`. Verified 2026-05-23.

**Scottish first-time-buyer relief:**
- Raises the nil-rate band from £145,000 to **£175,000** (statutory cite: LBTT(S)A 2013 Sch 4A, inserted by the Land and Buildings Transaction Tax (First-Time Buyer Relief) (Scotland) Order 2018).
- Maximum saving: **£600**.
- **No upper property-value ceiling** (contrast England's FTB relief which is fully withdrawn above £500,000). The Scottish FTB relief is a nil-band uplift, not a value-capped relief.
- Eligibility: buyer (and any joint buyer) must never have previously owned a dwelling anywhere in the world.

Source: `https://revenue.scot/taxes/land-buildings-transaction-tax/lbtt-legislation-guidance/lbtt3001-exemptions-reliefs/lbtt3010-tax-reliefs/lbtt3048-first-time-buyer-relief`, verified 2026-05-23.

**No non-resident surcharge.** Scotland has not introduced the equivalent of the 2% SDLT non-resident surcharge. Non-UK-resident buyers in Scotland pay standard LBTT plus, where applicable, the Additional Dwelling Supplement (§23.5).

### 23.5 Scottish LBTT, Additional Dwelling Supplement (ADS)

**Current rate: 8%**, in force for transactions where the contract is entered into on or after **5 December 2024** (Scottish Budget 2025/26 announcement).

**Rate history:**
- **3%** from 1 April 2016 (introduction, by the LBTT (Amendment) (Scotland) Act 2016).
- **4%** from 25 January 2019.
- **6%** from 16 December 2022.
- **8%** from 5 December 2024 (current).

Source: `https://revenue.scot/news-publications/news/scottish-budget-2025-2026-changes-land-buildings`, verified 2026-05-23.

**Mechanics:**
- ADS applies to anyone buying a residential property in Scotland who already owns one or more residential properties **anywhere in the world** at the effective date.
- ADS is charged on the **entire purchase price**, not on a marginal-band basis like the main LBTT rates above. Corollary: an £180,000 second-home purchase attracts £14,400 of ADS (8% of £180,000) PLUS standard LBTT on the slice above £145,000.
- **£40,000 de-minimis:** ADS does not apply where the property being purchased is worth less than £40,000, mirroring the SDLT Sch 4ZA threshold.
- **Joint buyers:** if any joint buyer meets the ADS conditions, ADS applies to the whole transaction (LBTT(S)A 2013 Sch 2A para 5(2), mirroring SDLT Sch 4ZA para 2(3), see §24.5). (F-B7-1 correction 2026-05-23: earlier drafts of §23.5 cited Sch 2A para 4 — that paragraph is in fact the 8% rate provision; the joint-buyer aggregation rule is at para 5(2): "the conditions are satisfied if they are satisfied in relation to any one of, or more than one of, the buyers".) Where one buyer is a first-time buyer and the other owns an existing dwelling, FTB relief is unavailable on the transaction; both buyers must be eligible.

**ADS repayment on sale of previous main residence, 36-month rule:**
- Where the buyer sells their previous main residence **within 36 months** of buying the new main residence, ADS paid on the new purchase can be reclaimed.
- The 36-month window was extended from **18 months** by the Coronavirus (Scotland) (No.2) Act 2020 in response to pandemic delays, then made permanent. Verify against revenue.scot at write time as the current operative window.
- The previous main residence must have been the buyer's only or main residence at any time in the 36 months **before** the new purchase.
- **Statutory amendment deadline:** the LBTT return can be amended within 12 months of the original return; beyond that, a claim for repayment of overpaid tax must be made within **5 years of the original return due date**.
- Source: `https://revenue.scot/taxes/land-buildings-transaction-tax/additional-dwelling-supplement-ads`, `https://revenue.scot/taxes/land-buildings-transaction-tax/how-submit-amend-or-pay-lbtt/how-claim-repayment-additional-dwelling-supplement`, verified 2026-05-23.

**Critical cross-jurisdictional trap:** Scotland's ADS repayment window is **36 months**, England's SDLT higher-rate refund window is **3 years (36 months)**, Wales's LTT higher-rate refund window is **3 years (36 months)**. All three jurisdictions now align at 36 months, but legacy content frequently cites Scotland's pre-2020 18-month window. Sessions must use the current 36-month figure throughout.

### 23.6 Scottish LBTT, multiple dwellings relief, non-residential rates, reliefs

**MDR RETAINED in Scotland.** Like Wales (§23.3), Scotland diverged from England's June 2024 MDR abolition. Scottish LBTT MDR continues to apply for transactions involving 2 or more dwellings purchased in a single transaction. Statutory basis: LBTT(S)A 2013 Sch 5.

- **Minimum rate:** the average tax payable across the dwellings cannot fall below the **minimum prescribed rate** (currently set by SSI; verify revenue.scot at write time for the current floor).
- **No subsidiary-dwelling carve-out:** Scotland has not introduced the Welsh 2025 "subsidiary dwelling" exclusion for individual main-residence buyers. Annexe purchases in Scotland can still claim MDR where two qualifying dwellings exist.
- **ADS interaction:** MDR reduces standard LBTT but does NOT reduce ADS. ADS at 8% applies to the total chargeable consideration regardless of MDR.

**Six-or-more-dwellings non-residential treatment:** LBTT(S)A 2013 s.59(8) replicates the SDLT s.116(7) six-dwellings rule. Six or more separate dwellings acquired in a single transaction are treated as non-residential for LBTT (and ADS does not apply to non-residential purchases). Source: `https://www.legislation.gov.uk/asp/2013/11/section/59`, verified 2026-05-23.

**Non-residential LBTT bands (unchanged for 2026/27):**

| Band | Rate (freehold / lease premium) |
|---|---|
| £0 to £150,000 | 0% |
| £150,001 to £250,000 | 1% |
| Above £250,000 | 5% |

Source: `https://revenue.scot/taxes/land-buildings-transaction-tax/non-residential-property`, verified 2026-05-23.

**Other Scottish LBTT reliefs commonly relevant to landlords:**
- **Charities relief** (LBTT(S)A 2013 Sch 13).
- **Group relief** (LBTT(S)A 2013 Sch 10), mirrors FA 2003 Sch 7.
- **Sub-sale development relief** (LBTT(S)A 2013 Sch 10A): narrower than SDLT sub-sale; specifically tied to development intent.
- **Partnership relief** (LBTT(S)A 2013 Sch 17): genuine pre-existing letting partnership incorporation.

### 23.7 Northern Ireland, SDLT applies, not devolved

Property-transfer tax in Northern Ireland is **SDLT under FA 2003**, identical to England. NI is not a devolved jurisdiction for SDLT (contrast Wales, Scotland, and the partially devolved corporation tax + air passenger duty regimes that exist for NI under separate statute).

**Practical writing rule:** Sessions writing on NI property purchases use §1 (SDLT), not §23. The 5% additional dwellings surcharge, the 2% non-resident surcharge, FTB relief up to £500,000, and MDR abolition (1 June 2024) all apply identically in NI. The only NI-specific consideration is that border-crossing transactions with the Republic of Ireland may engage Irish stamp duty (out of scope for §23 / §1).

### 23.8 Cross-jurisdictional traps for sessions

The 4-nation comparison must be precise. Sessions writing on Welsh or Scottish purchases for clients who also own English property (or vice versa) face a citation-density bar; the cross-jurisdictional traps below cause the most common errors in competitor content:

| Item | England + NI (SDLT) | Wales (LTT) | Scotland (LBTT) |
|---|---|---|---|
| Nil-rate band | £125,000 | £225,000 | £145,000 |
| Additional dwellings surcharge / supplement | 5% flat on top of standard | Higher-rate band structure (5% to 17%) | 8% on entire price (ADS) |
| Non-resident surcharge | 2% on top | None | None |
| First-time buyer relief | £300k nil + 5% to £500k, fully withdrawn above £500k | None (nil band covers it) | £175,000 nil-rate band, no upper ceiling |
| MDR status | Abolished 1 June 2024 | Retained, subsidiary-dwelling carve-out 7 Feb 2025, min rate 3% from 13 Feb 2026 | Retained, no carve-outs |
| Six-dwellings non-residential | s.116(7) FA 2003 (automatic) | None | s.59(8) LBTT(S)A 2013 (automatic) |
| Surcharge refund on sale of old main residence | 3 years (36 months) | 3 years (36 months) | 3 years (36 months) |
| Corporate / non-natural-person flat rate | 15% above £500k (Sch 4A FA 2003) | None (uses higher rates table) | None (uses ADS) |

**Cross-border transactions involving land in two jurisdictions:**
- FA 2003 s.48A (England) + LTTA 2017 Sch 22 (Wales) + LBTT(S)A 2013 Sch 14 (Scotland) provide apportionment rules where a single transaction includes land in two jurisdictions.
- Apportionment is on a just-and-reasonable basis (no statutory formula). Three returns may be required (one to HMRC, one to Welsh Revenue Authority, one to Revenue Scotland), each on the apportioned consideration.
- The 5% / higher rates / ADS triggers are tested **on each jurisdiction's share separately**; a buyer who already owns property may attract the additional dwellings charge in one jurisdiction but not the other depending on local thresholds.

**Effective date timing:**
- SDLT effective date: substantially-performed-or-completed test under FA 2003 s.44 (often equates to completion).
- LTT effective date: LTTA 2017 s.10, same substantial-performance test.
- LBTT effective date: LBTT(S)A 2013 s.10, same substantial-performance test.
- Returns due: SDLT 14 days from effective date (FA 2003 s.76); LTT 30 days (LTTA 2017 s.41); LBTT 30 days (LBTT(S)A 2013 s.29). The SDLT 14-day clock is shorter than both devolved equivalents.

### 23.9 Tax implications for landlords (Property Tax Partners angle)

These are the items most relevant to the firm's positioning for clients with property in Wales or Scotland (or cross-border portfolios), not the legal-services-firm angle competitor sites lean on:

- **Portfolio investor purchasing 6+ dwellings:** Scotland (s.59(8) non-residential automatic) and England (s.116(7)) align; Wales does not have the rule and MDR (with the modified minimum rate) is the only relief route. Sessions modelling Welsh portfolio acquisitions must use MDR rather than the non-residential treatment routinely cited for England.
- **Replacement of main residence timing:** all three jurisdictions align at 36 months for surcharge refund. Sessions advising on the gap between sale and purchase need not differentiate between jurisdictions on this point.
- **ADS at 8% is the highest dwelling-surcharge rate in the UK.** A £500,000 second-home purchase in Scotland attracts £40,000 of ADS plus standard LBTT, materially worse than the equivalent SDLT calculation (£25,000 of additional 5% surcharge plus standard SDLT). Sessions on Scottish BTL acquisitions should foreground this differential.
- **Non-resident buyer:** an overseas investor buys cheaper (relative to standard rates) in Wales and Scotland than in England, because neither has a non-resident surcharge. Sessions on non-UK-resident landlord pages should note the planning angle without making it the principal recommendation (still subject to the underlying main / higher rates).
- **Cross-border portfolio incorporation:** s.162 incorporation relief operates UK-wide as a CGT relief (TCGA 1992 s.162), but the SDLT / LTT / LBTT side requires partnership relief evidence in each jurisdiction the portfolio touches. The evidential bar (formal letting partnership, accounts, joint borrowing) is the same in all three; the relief mechanic differs.

### 23.10 Citations for §23

- **Welsh LTT:** LTTA 2017 (`https://www.legislation.gov.uk/anaw/2017/1/contents`), with key provisions at ss.10, 24, 25, Sch 5 (higher rates), Sch 7 (partnership), Sch 16 (group), Sch 19 (charities), Sch 22 (cross-border).
- **Welsh LTT regulations:** Land Transaction Tax (Tax Bands and Tax Rates) (Wales) (Amendment) Regulations 2024 (higher rates uplift, 11 Dec 2024); Land Transaction Tax (Modification of Multiple Dwellings Relief) (Wales) Regulations 2025; Land Transaction Tax (Modification of Relief for Acquisitions Involving Multiple Dwellings) (Wales) Regulations 2026.
- **Scottish LBTT:** LBTT(S)A 2013 (`https://www.legislation.gov.uk/asp/2013/11/contents`), with key provisions at ss.10, 24, 29, 59(8), Sch 2A (ADS), Sch 5 (MDR), Sch 10 (group), Sch 10A (sub-sale development), Sch 13 (charities), Sch 14 (cross-border), Sch 17 (partnership).
- **Scottish ADS:** LBTT (Amendment) (Scotland) Act 2016 (introduction); Coronavirus (Scotland) (No.2) Act 2020 (36-month window extension); Scottish Budget 2025/26 (8% rate from 5 Dec 2024).
- **gov.wales source pages:** `https://www.gov.wales/land-transaction-tax-rates-and-bands`, `https://www.gov.wales/higher-rates-land-transaction-tax-overview`, `https://www.gov.wales/higher-rates-purchases-residential-property-technical-guidance`, `https://www.gov.wales/calculation-land-transaction-tax-payable-technical-guidance`.
- **revenue.scot source pages:** `https://revenue.scot/taxes/land-buildings-transaction-tax`, `https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property`, `https://revenue.scot/taxes/land-buildings-transaction-tax/additional-dwelling-supplement-ads`, `https://revenue.scot/taxes/land-buildings-transaction-tax/lbtt-legislation-guidance/lbtt3001-exemptions-reliefs/lbtt3010-tax-reliefs/lbtt3048-first-time-buyer-relief`.
- **gov.scot Scottish Budget:** `https://www.gov.scot/publications/scottish-budget-2026-2027/pages/4/` (LBTT rates frozen for 2026/27).

### 23.11 Do not write

- "Welsh LTT has a non-resident surcharge" (false; Wales has not introduced one).
- "Scottish LBTT has a non-resident surcharge" (false; Scotland has not introduced one).
- "ADS is 6%" (raised to 8% from 5 December 2024; the 6% figure was 16 Dec 2022 to 4 Dec 2024).
- "ADS is 4%" (legacy figure; in force 25 Jan 2019 to 15 Dec 2022).
- "ADS repayment window is 18 months" (legacy figure; extended to 36 months from 2020 and made permanent).
- "MDR was abolished UK-wide on 1 June 2024" (false; abolition was SDLT only, MDR retained in Wales with modifications and in Scotland without modifications).
- "Wales has first-time-buyer relief" (false; the £225,000 nil band serves the function; no separate FTB regime).
- "Welsh higher rates are a 4% flat surcharge on top of standard LTT" (false; the higher rates are a standalone band structure, see §23.2 table).
- "Welsh LTT applies in Northern Ireland" or "Scottish LBTT applies in Northern Ireland" (false; NI is SDLT under FA 2003).
- "Six-dwellings automatic non-residential rule applies in Wales" (false; Wales has no LTT equivalent to s.116(7) FA 2003).
- "ADS applies on the slice above £40,000" (false; ADS applies to the entire purchase price where the £40,000 de-minimis is crossed).
- "Cross-border transactions need only one return" (false; separate returns to HMRC + Welsh Revenue Authority + Revenue Scotland, each on the apportioned consideration).

---

---

## 24. Form 17 + joint ownership + spouse-mechanics, Wave 5 extension (locked, 2026-05-23)

Cross-references §15 (IHT spousal exemption, GROB), §19.4 (MTD threshold for joint owners), §21.2 (settlements legislation Arctic Systems carve-out), §22.5 (transferable NRB / RNRB), and §23.5 (joint-buyer ADS trigger). Wave 5 Session C briefs are operational pages on the mechanics of unequal-share rental-income splits, the documents that support them, and the HMRC enquiry pattern when they fail.

**Verified against gov.uk, legislation.gov.uk and HMRC internal manuals on 2026-05-23** for the 50/50 default rule, the Form 17 60-day filing window, the TCGA 1992 s.58 no-gain-no-loss treatment, and the s.222(5) main-residence election mechanics.

### 24.1 Default 50/50 split for spouses + civil partners

**Statutory base, TWO provisions, one for each tax:**

- **Income tax:** ITA 2007 s.836, `https://www.legislation.gov.uk/ukpga/2007/3/section/836`. Joint income of spouses / civil partners living together is treated as arising in equal shares (50/50) unless they make a joint declaration of unequal beneficial interests on the prescribed form (Form 17) AND their actual beneficial interests are unequal.
- **HMRC working position:** PIM1030 (`https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1030`) sets out HMRC's position grounded in ITA 2007 s.836: the 50/50 presumption applies "regardless of the underlying ownership of the property" unless displaced by Form 17. (F-4 correction 2026-05-23: earlier drafts of §24.1 cited ITTOIA 2005 s.282 as the property-income parallel for the 50/50 rule; that is wrong. ITTOIA 2005 s.282 is titled "Assignments for profit of lease granted at undervalue" and has no connection to the spouse / civil partner 50/50 income rule. The operating statutory provision is ITA 2007 s.836 alone.)

**Application limits, when the 50/50 rule does NOT apply (HMRC TSEM9851 / TSEM9852):**

- Spouses / civil partners NOT living together. The default is the actual beneficial share once cohabitation ceases.
- Property NOT held in joint legal title (e.g. property in one spouse's sole name but beneficially co-owned). The 50/50 rule applies only where there is **joint legal ownership** plus joint beneficial ownership. Sole-legal-title-but-co-beneficial-ownership cases fall outside the rule entirely.
- Property held jointly with a third party (e.g. parent + adult child + spouse). Three-party joint ownership falls outside the 50/50 spouse-only presumption; default is actual beneficial share.
- Property held legally by a nominee (i.e. legal title in one party's name but beneficially owned jointly). Same outcome: actual beneficial share.

**Critical scope note for sessions:** the 50/50 rule applies to spouses / civil partners ONLY. **Unmarried co-owners (cohabitees, friends, family non-spouses) always split rental income according to actual beneficial ownership** (§24.6). Sessions on unmarried co-owners must NOT cite Form 17.

### 24.2 Form 17 mechanics, the election to displace 50/50

**The form:** HMRC Form 17, formal name "Declaration of beneficial interests in joint property and income", `https://www.gov.uk/government/publications/income-tax-declaration-of-beneficial-interests-in-joint-property-and-income-17`. Verified 2026-05-23.

**Operational requirements (HMRC TSEM9842 et seq.):**

- **Both spouses / civil partners must sign.** Single-spouse declarations are invalid. No agent delegation; both signatures are personal.
- **60-day filing window.** The form must reach HMRC within **60 days of the date the last spouse signs** (TSEM9851). HMRC enforces the 60-day window strictly; late forms are invalid and the 50/50 default re-applies.
- **The declared split must match the underlying beneficial ownership.** Form 17 declares the existing unequal beneficial interest; it does NOT create one. A purported 90/10 declaration on a property held 50/50 beneficially is invalid (TSEM9851 evidence requirement: HMRC may request the underlying declaration of trust or deed of trust).
- **Effective date:** the declaration takes effect from the date of the last spouse's signature, not from filing date, not from the start of the tax year. The split applies to income arising from that date forward.
- **Persistence:** the declaration remains in force until a fresh declaration is made OR there is a change in the underlying beneficial interest OR the spouses cease living together OR one spouse dies. A new declaration is required after any qualifying change.
- **Cannot create non-50/50 split where beneficial interests are 50/50.** This is the most common confusion: spouses who wish to split rental income unequally must first change the underlying beneficial ownership (declaration of trust, §24.3), THEN file Form 17 to declare that new ownership to HMRC. Form 17 is the disclosure; the deed is the underlying mechanic.

**Joint tenancy bar, the elephant in the room (TSEM9851):**
- **Joint tenants cannot use Form 17.** Joint tenancy under English / Welsh land law (and the equivalent in Scotland and NI) is undivided ownership: each joint tenant owns 100% of the property jointly with the other(s), not a specific share. There is no "share" to declare on Form 17.
- **Tenants in common (TIC)** hold divisible shares (typically 50/50 by default on grant, but can be 99/1 / 75/25 / any ratio) and CAN use Form 17.
- **Practical consequence:** spouses holding as joint tenants who wish to use Form 17 must first sever the joint tenancy to TIC (in England + Wales: notice under Law of Property Act 1925 s.36(2); in Scotland: deed of trust over the inhibition title; in NI: similar to England).

### 24.3 Declaration of trust, the underlying ownership document

**What it is:** a written deed (typically signed and witnessed) declaring that the legal owners of the property hold the property on trust for themselves in specified unequal beneficial shares. The deed is the **underlying ownership document**; Form 17 is the tax declaration that references the ownership the deed establishes.

**Format / mechanics:**
- Must be in writing (Law of Property Act 1925 s.53(1)(b)).
- Should be signed by both spouses; witnessing strengthens evidential value (formal deed execution).
- Should specify: the property address, the legal owners, the beneficial shares (e.g. 75% / 25%), and the date of effect.
- Should be evidenced before Form 17 is filed; HMRC may request the deed as evidence under TSEM9851.

**Stamp duty / SDLT trap (CRITICAL for sessions):**
- Creating a declaration of trust to redistribute beneficial ownership between spouses **does not** of itself trigger SDLT / LTT / LBTT, because no chargeable consideration changes hands.
- **BUT** if the receiving spouse assumes a share of a mortgage on the property as part of the trust declaration, the assumed debt is **chargeable consideration** for SDLT / LTT / LBTT purposes (FA 2003 Sch 4 para 8 for SDLT; LTTA 2017 / LBTT(S)A 2013 equivalents).
- Example: husband solely owns property worth £400,000 with £200,000 mortgage; husband and wife sign declaration of trust giving wife 50% beneficial interest; wife is added to mortgage. Wife's assumed share of mortgage debt (£100,000) is chargeable consideration. SDLT due if above nil band, with potential 5% surcharge if wife already owns another dwelling.
- **The connected-spouse SDLT trap is the most common Form 17 implementation error.** Sessions must flag the SDLT / LTT / LBTT consequences of the trust declaration alongside the income-tax Form 17 mechanics.

**CGT on the trust declaration itself:**
- Inter-spouse transfer is at no-gain-no-loss (TCGA 1992 s.58, see §24.4) where spouses living together. No CGT charge on creating or varying the beneficial interest between cohabiting spouses.
- Post-separation: s.58(1D) (inserted by Finance (No. 2) Act 2023 c.30 s.41(2)(6), in force 6 April 2023) extends no-gain-no-loss to disposals in accordance with a court order or formal separation agreement; otherwise the transferring spouse may have a chargeable disposal.

### 24.4 TCGA 1992 s.58, no-gain-no-loss spouse transfer

**Statutory base:** TCGA 1992 s.58, `https://www.legislation.gov.uk/ukpga/1992/12/section/58`, verified 2026-05-23.

**Mechanics:**
- Transfers between spouses / civil partners living together are treated as made at "such consideration as would ensure that neither a gain nor a loss accrued to the party making the disposal" (s.58(1)).
- The receiving spouse acquires at the transferor's original base cost (NOT market value).
- The CGT crystallises only when the receiving spouse later disposes to a third party.
- "Living together" is given the s.288 definition: spouses are treated as living together unless separated under a court order, by formal deed of separation, or in circumstances likely to be permanent.

**Post-separation extension (Finance (No. 2) Act 2023 c.30 s.41(2)(6), in force 6 April 2023):**
- s.58(1D) extends no-gain-no-loss to disposals made in accordance with a divorce settlement, court order, or formal separation agreement, for up to **3 tax years** after the year of separation (s.58(1A)-(1B)).
- Pre-2023 separating spouses had only the tax year of separation; the 2023 extension to 3 years was a major reform for divorcing couples.

**Interaction with §24.3 declaration of trust:**
- A husband-to-wife declaration of trust shifting beneficial ownership from 100/0 to 50/50 is a CGT disposal by the husband to the wife. s.58 applies; no CGT on the husband.
- Wife inherits husband's original base cost in her 50% share. Wife's eventual CGT on disposal of her 50% is computed against that original base cost, not the market value at trust declaration.

### 24.5 Cross-mechanism interactions for joint owners

The interactions below cause the most common drafting errors in competitor content. Sessions writing on joint-ownership pages must thread the needle across all of them.

**Section 24 (§4), finance cost restriction:**
- The 20% basic-rate tax credit (and the cap mechanics in §4) apply to each spouse's share of finance costs separately.
- Where Form 17 splits income 75/25, finance costs must also be apportioned 75/25 (HMRC PIM1030 / TSEM9851: the income-and-property correspondence rule).
- Spouses cannot allocate finance costs 100/0 while declaring income 75/25; both must follow the underlying beneficial ownership.

**Main residence relief, TCGA 1992 s.222(5) election:**
- **Spouses / civil partners living together can have only ONE main residence between them** for PPR purposes (s.222(6)).
- Where the couple owns two residences, a joint s.222(5) election nominates which one is the main residence. The election must be in writing and signed by BOTH spouses (TCGA 1992 s.222(5), `https://www.legislation.gov.uk/ukpga/1992/12/section/222`).
- The election applies from the date specified (can be backdated to within 2 years of acquisition of the second residence).
- **Trap on Form 17 + PPR election interaction:** a Form 17 75/25 split on a property changes neither spouse's PPR status. PPR follows actual residence, not beneficial share.
- **Unmarried co-owners:** each can have their OWN main residence (no s.222(6) bar). Two unmarried co-owners can both claim PPR on their respective principal homes if they live in different places.

**IHT spousal exemption (§22.5):**
- s.18 IHTA 1984 exempts inter-spouse transfers from IHT regardless of value (where both UK-domiciled / long-term-resident). A declaration of trust shifting beneficial ownership between UK-resident spouses is fully IHT-exempt under s.18.
- **Limited spouse exemption** (£325k lifetime cap, s.18(2)) where one spouse is non-UK-domiciled / non-long-term-resident. The non-UK spouse may elect under s.267ZA to access full exemption, with the cost of bringing worldwide assets into IHT scope. Cross-link §22.5.

**SDLT / LTT / LBTT higher-rate surcharges (§23.5 + §1), joint buyer trigger:**
- FA 2003 Sch 4ZA para 2(3) (SDLT): if any joint buyer meets the additional-dwellings conditions, the whole transaction is at the higher rate.
- LTTA 2017 Sch 5 (Welsh LTT higher rates): same any-buyer-triggers-whole-transaction rule.
- LBTT(S)A 2013 Sch 2A para 4 (ADS): same rule.
- **Practical trap:** a first-time buyer marrying someone who owns a BTL portfolio loses FTB status the moment they jointly purchase, and the joint purchase attracts the additional-dwellings rate / ADS in full. Spousal joint purchase of a starter home where one spouse owns an investment property is a sustained loss-of-FTB-relief trap.

**MTD threshold for joint owners (§19.4):**
- Each spouse tests their share-of-gross against the threshold separately (£50,000 for the 6 April 2026 mandate, dropping to £30,000 from April 2027, £20,000 from April 2028 per §3).
- A Form 17 75/25 split brings the 75% spouse into MTD scope at a lower property-gross level than the 25% spouse. Sessions on joint-owner MTD pages must use the gross-share calculation per §19.4.

### 24.6 Unmarried co-owners

**No Form 17 route.** ITA 2007 s.836 applies only to spouses / civil partners. Unmarried co-owners (cohabitees, friends, family non-spouses) are outside the 50/50 default and outside the Form 17 election mechanism.

**Default rule for unmarried co-owners (PIM1030 / TSEM9821):**
- Income is split per the **actual beneficial ownership** of the property. No presumption of equality, no presumption of any other split.
- Where legal title and beneficial title differ, beneficial title governs the income split.
- Evidence of beneficial split: declaration of trust (same instrument as §24.3 but without the Form 17 follow-up), or sufficient documentary evidence (mortgage contributions, deposit contributions, conveyancing records).

**HMRC enquiry pattern for unmarried co-owners:**
- HMRC's typical challenge is to a purported split that doesn't match the deed or the contribution evidence. "Cohabitees declared 70/30 because she's a higher-rate taxpayer; deed says joint tenants" is the canonical enquiry pattern.
- **Joint tenancy bar applies equally:** unmarried joint tenants own undivided 100% interests, not divisible shares. Severance to TIC is required to support an unequal split (same conveyancing route as §24.2).
- Capital contribution discipline matters: an unmarried co-owner claiming 70% of rental income must show 70% of acquisition contribution and / or 70% of mortgage exposure, or a declaration of trust to that effect.

**Inter-cohabitee transfer of beneficial ownership:**
- **NO s.58 no-gain-no-loss treatment for unmarried co-owners.** A transfer from one cohabitee to another is a market-value disposal under TCGA 1992 s.17 (connected persons rules per s.286 may apply; or arm's-length transfer between unconnected persons).
- The CGT contrast with spouses is material: a spouse-to-spouse 50% transfer is no-CGT; a cohabitee-to-cohabitee 50% transfer is at market value with CGT due on any gain.

### 24.7 Adult-child + minor-child co-ownership, settlements legislation traps

Cross-links §15.2 (GROB on family-home gift-with-reservation) and §21.2 (settlements legislation under ITTOIA 2005 s.624).

**Minor child as co-owner:**
- Gift of beneficial share in property to a minor child engages **settlements legislation ITTOIA 2005 s.624**. The rental income on the minor's share is treated as the settlor-parent's income for income-tax purposes until the child reaches 18.
- Bare-trust holdings for minor children (the typical mechanism where a parent buys property "for" a child) face the same outcome: settlor-parent attribution under s.624 until the child reaches 18.
- **18th birthday cliff:** from the child's 18th birthday, s.624 ceases to apply; rental income on the (now adult) child's share is taxed on the child. No retrospective re-attribution.

**Adult child as co-owner:**
- s.624 does NOT attribute the adult child's share of rental income to the parent, provided the share is an outright gift (no parental retained benefit, no parental control via discretionary trust).
- **Capital gains tax disposal on the original gift:** the gift to the adult child is a connected-person disposal at market value (TCGA 1992 s.17 + s.286). No holdover for non-business BTL; CGT crystallises on the gift. Cross-link §22 / §15.2.
- **GROB / reservation of benefit:** if the parent continues to occupy or benefit from the property after the gift (e.g. continues to receive part of the rent informally, or lives in the property), the gift is a reservation of benefit under FA 1986 s.102 and remains in the parent's estate for IHT. Cross-link §15.2.
- **POAT (pre-owned assets tax):** where GROB does not catch the arrangement, POAT under FA 2004 Sch 15 may apply, charging an annual income-tax-style benefit on the parent's continuing use.

**Adult child contributing capital to a joint purchase:**
- Where an adult child contributes to the purchase price (e.g. parent + adult child buy together, each paying half), beneficial ownership follows contribution. The Form 17 / unmarried co-owner pattern (§24.6) governs; no settlements attribution.
- **Critical trap for sessions:** "the bank of mum and dad" pattern where parent funds the child's share is NOT a contribution from the child for beneficial ownership purposes. The parent-funded share is a gift to the child; the child holds beneficially; settlements legislation may attach until the child reaches 18.

### 24.8 HMRC enquiry pattern, sham or excessive Form 17 split

HMRC's typical enquiry pattern for joint-ownership tax planning, drawn from TSEM9851 / TSEM9852 / PIM1030 + observed compliance correspondence:

**Triggers for enquiry:**
- Form 17 filed showing 99/1 or 95/5 split favouring the lower-rate spouse, without a contemporaneous declaration of trust.
- Form 17 filed shortly before a high-income event (e.g. spouse leaves PAYE employment) suggesting income-shifting motive.
- Form 17 filed but the underlying property is held as joint tenants (the §24.2 bar).
- Disposal of the property shortly after Form 17 filing where the CGT-favoured spouse takes the major share of the gain.

**HMRC's evidence requests (TSEM9851):**
- The declaration of trust or other deed evidencing the unequal beneficial interest.
- Mortgage documentation showing the contributing parties.
- Bank account evidence showing rental receipts and where they are paid.
- Capital contribution evidence (deposit / purchase price contributions).

**HMRC's challenge basis:**
- "The 99/1 declaration is not supported by an underlying beneficial split"; the income remains 50/50 by default and the Form 17 is invalid.
- "The beneficial split was created the day before the Form 17 filing"; the change may be a sham under *Ramsay* / *Furniss v Dawson* principles, particularly where the spouses retain joint control over the property.
- "The arrangement constitutes a settlement under ITTOIA 2005 s.624"; the income is settlor-attributed back to the higher-rate spouse despite the form.

**Defence pack expected:**
- Declaration of trust executed contemporaneously with (or before) the change in beneficial ownership.
- Documentary chain showing the underlying ownership was actually unequal (contribution at acquisition, equity build-up over time, formal severance + variance deed).
- Consistent treatment over a sustained period (not a one-off election the year before a CGT disposal).

### 24.9 Citations for §24

- **Statutory base:**
  - ITA 2007 s.836 (50/50 income split): `https://www.legislation.gov.uk/ukpga/2007/3/section/836`.
  - TCGA 1992 s.58 (no-gain-no-loss spouse transfer): `https://www.legislation.gov.uk/ukpga/1992/12/section/58`. Sub-sections (1A)-(1D) (3-tax-year post-separation window) inserted by **Finance (No. 2) Act 2023 c.30 s.41(2)(6)**, in force 6 April 2023. Note: the inserting Act is Finance (No. 2) Act 2023, NOT Finance Act 2023 (two separate Acts of the same calendar year — same-year-different-Act drift trap, see F-18 in `track2_site_wide_flags.md`).
  - TCGA 1992 s.222 (main residence; sub-s.222(5) election; sub-s.222(6) one-residence-per-couple): `https://www.legislation.gov.uk/ukpga/1992/12/section/222`.
  - TCGA 1992 s.17 (market-value disposal); s.286 (connected persons).
  - FA 1986 s.102 (GROB).
  - FA 2004 Sch 15 (POAT).
  - IHTA 1984 s.18 (spouse exemption); s.267ZA (long-term-resident election).
  - ITTOIA 2005 s.624 (settlements legislation).
  - FA 2003 Sch 4 para 8 (SDLT chargeable consideration including assumed debt); Sch 4ZA para 2(3) (joint-buyer higher-rates trigger).
  - Law of Property Act 1925 s.36(2) (joint tenancy severance); s.53(1)(b) (declaration of trust formalities).
- **HMRC manuals:**
  - PIM1030 (joint property income split): `https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1030`.
  - PIM1035 (jointly owned property and partnerships).
  - TSEM9810 et seq. (Form 17 mechanics general): `https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem9810`.
  - TSEM9842 (declaration of trust evidence).
  - TSEM9851 (Form 17 evidence requirement).
  - TSEM9852 (Form 17 effective-date mechanics).
- **Form 17 itself:** `https://www.gov.uk/government/publications/income-tax-declaration-of-beneficial-interests-in-joint-property-and-income-17`.
- **Cross-references in this house position doc:** §1 (SDLT England + NI); §4 (Section 24 finance cost restriction); §15.2 (GROB family home); §15.5 (IHT spousal exemption); §19.4 (MTD joint-owner threshold); §21.2 (settlements legislation Arctic Systems carve-out); §22.5 (transferable NRB + RNRB); §23.5 (ADS joint-buyer trigger).

### 24.10 Do not write

- "Spouses can file Form 17 to split rental income any way they choose" (false; must match underlying beneficial ownership).
- "Form 17 changes the beneficial ownership of the property" (false; it declares the existing unequal beneficial ownership; the declaration of trust changes ownership).
- "Form 17 is filed annually" (false; it persists indefinitely until a qualifying change).
- "Joint tenants can file Form 17" (false; severance to tenants in common is a prerequisite).
- "Form 17 takes effect from the start of the tax year" (false; from the date of the last spouse's signature).
- "Form 17 can be filed up to 12 months after signature" (false; 60 days strict).
- "Unmarried cohabitees can use Form 17" (false; spouses / civil partners only).
- "Inter-spouse property transfer triggers CGT at market value" (false; s.58 no-gain-no-loss for cohabiting spouses; or for the 3-tax-year separation window under s.58(1A)-(1B) per Finance (No. 2) Act 2023 c.30 s.41).
- "Each spouse can have their own main residence for PPR" (false; one residence per couple per s.222(6)).
- "Declaration of trust between spouses always triggers SDLT" (false; only where the receiving spouse assumes a share of mortgage debt, see §24.3 trap).
- "Gift of property share to adult child has no CGT consequence" (false; connected-person disposal at MV under s.17 / s.286; no holdover for non-business BTL).
- "Minor child's share of rental income is taxed on the child" (false; settlor-parent attribution under ITTOIA 2005 s.624 until the child reaches 18).
- "Cohabitee-to-cohabitee transfer is no-gain-no-loss" (false; s.58 applies only to spouses / civil partners).

---

---

**End Wave 5 extension.** Session B (Devolved property tax) uses §1 + §23 together; §23 is the working detail for Welsh + Scottish jurisdictions. Session C (Form 17 + joint ownership) uses §19.4 + §21.2 + §22.5 + §23.5 + §24 together; §24 is the working detail for spouse-mechanics. Any contradiction between competitor sources and §§23-24, flag in `wave5_site_wide_flags.md`.


---

## 22.A IHT estate planning, Wave 6 extension (locked, 2026-05-23 PM)

These subsections extend the Wave 4 §22 cluster with settlements legislation depth, minor-child attribution mechanics, GROB family-home depth (with the FA 2025 s.48ZA reform reflected for non-UK settled property), and the trust-vs-FIC decision boundary. Numbering continues from §22.8. All statutory citations verified against legislation.gov.uk on 2026-05-23 via 36 WebFetch passes by the Wave 6 prep statute-verification sub-agent.

### 22.9 Settlements legislation (ITTOIA 2005 ss.620-628), the income-tax attribution framework

**Statutory base.** ITTOIA 2005 Part 5 Chapter 5 ("Settlements: amounts treated as income of settlor") is the income-tax anti-avoidance code that pulls income arising under a settlement back to the settlor for tax purposes. The core sections, all verified against legislation.gov.uk on 2026-05-23 (latest available revised version, with FA 2025 Sch 12 amendments reflected to 20 March 2025), are:

- **s.620 "Meaning of 'settlement' and 'settlor'"** (`https://www.legislation.gov.uk/ukpga/2005/5/section/620`). "Settlement" is defined broadly as **any disposition, trust, covenant, agreement, arrangement or transfer of assets** (with a charitable-loan-arrangement carve-out). "Settlor", in relation to a settlement, means any person by whom the settlement was made. The width of the definition is the load-bearing point: there is no requirement for a formal trust; an informal family arrangement, a deed of gift, a covenant, or an asset transfer can each constitute a "settlement" for s.624 purposes.
- **s.624 "Income where settlor retains an interest"** (`https://www.legislation.gov.uk/ukpga/2005/5/section/624`). Verbatim s.624(1): "Income which arises under a settlement is treated for income tax purposes as the income of the settlor and of the settlor alone if it arises (a) during the life of the settlor, and (b) from property in which the settlor has an interest." Subsection (1A) adds that trustee expenses cannot be used to reduce the attributed income. Subsection (3) carves out the three statutory exceptions in ss.626, 627, 628.
- **s.625 "Settlor's retained interest"** (`https://www.legislation.gov.uk/ukpga/2005/5/section/625`). Verbatim s.625(1): a settlor has an interest in property if there are "any circumstances in which the property or any related property (a) is payable to the settlor or the settlor's spouse or civil partner, (b) is applicable for the benefit of the settlor or the settlor's spouse or civil partner, or (c) will, or may, become so payable or applicable." Spouse / civil partner is treated as an extension of the settlor for the purposes of testing retained interest. "Related property" (s.625(5)) means income from that property or any other property representing proceeds of, or income from, that property.
- **s.626 "Exception for outright gifts between spouses or civil partners"** (`https://www.legislation.gov.uk/ukpga/2005/5/section/626`). The s.624 attribution rule does not apply to an outright gift of income-producing property between spouses or civil partners, provided **Condition A** (the gift carries a right to the whole of the income) and **Condition B** (the property is not wholly or substantially a right to income) are met, and the gift is not subject to conditions or to any donor-benefit reservation. This is the statutory grounding for the *Arctic Systems* (*Jones v Garnett* [2007] UKHL 35) outcome: ordinary shares with full dividend rights gifted to a spouse are outside s.624 by force of s.626; preference shares with a frozen dividend right are at higher risk because Condition B (not "wholly or substantially a right to income") is more challenging.
- **s.627 "Exceptions for certain types of income"** (`https://www.legislation.gov.uk/ukpga/2005/5/section/627`). Carves out: (a) income payable to a former spouse / civil partner under a separation or divorce provision; (b) annual payments made by an individual for commercial reasons in connection with a trade, profession, or vocation; (c) qualifying gift-aid donations; (d) benefits under a relevant pension scheme.
- **s.628 "Exception for gifts to charities"** (`https://www.legislation.gov.uk/ukpga/2005/5/section/628`). Carves out qualifying income arising under a UK settlement where given to charity in the tax year of arising, or where a charity is entitled to it under the trust terms. Note: this is the charities exception, not a "5% rule" — there is no 5% threshold in s.628.

**Mechanics for landlord pages.** Where a landlord settles BTL property on trust and retains any prospective benefit (right to live in the property, right to receive rent, right to call back capital, position as beneficiary of a discretionary class that includes them or their spouse), all rental income from the trust assets is treated as the landlord's own for income tax. Even where the trust deed names children as beneficiaries, the settlor-attribution under s.624 means the income-tax outcome is unchanged from a direct-ownership baseline.

**Practical hook for sessions.** Any page that recommends a trust-based BTL planning structure must thread the s.624 needle: it must either confirm the trust is genuinely non-settlor-interested (no benefit path back to settlor or spouse, no discretionary inclusion of settlor / spouse) or expressly accept the settlor-attribution and pitch the structure on IHT grounds alone. Pages must not imply a "trust = income shift" outcome without the s.626 spouse-carve-out fit. Cross-reference §21.2 (Arctic Systems carve-out for share alphabet structures) and §22.13 (Trust-vs-FIC decision boundary below).

---

### 22.10 Minor-child attribution (ITTOIA 2005 s.629 + s.631)

**Statutory base.** Verified against legislation.gov.uk on 2026-05-23.

- **s.629 "Income paid to relevant children of settlor"** (`https://www.legislation.gov.uk/ukpga/2005/5/section/629`). Verbatim s.629(1): "Income arising under a settlement is treated as income of the settlor alone if, during the settlor's life, it is paid to or for the benefit of a relevant child or would otherwise be treated as that child's income." Subsection (2) deconflicts with s.624 (the attribution is one or the other, not both). Subsection (3) carves out the £100 de-minimis: the section does not apply where the relevant settlement income paid to or for the relevant child in the tax year does not exceed **£100**. Subsection (7) defines "relevant child" as an unmarried minor not in a civil partnership; "child" includes step-children.
- **s.631 "Retained and accumulated income"** (`https://www.legislation.gov.uk/ukpga/2005/5/section/631`). Where trustees retain or accumulate settlement income and later make a payment to a relevant child, the payment is treated as a distribution under s.629(1) to the extent of retained-or-accumulated income available. The retained-or-accumulated income is computed as total settlement income since creation, less amounts already treated as settlor income, already paid to other beneficiaries, or applied to trustee expenses properly chargeable to income. This closes the obvious avoidance route of accumulating in trust and distributing when the child reaches majority.

**Mechanics for landlord pages.** A parent who gifts a beneficial share in a BTL to their minor child (whether via bare trust, declaration of trust, or direct title-on-trust mechanism) faces full settlor-attribution under s.629(1) on the child's share of rental income, subject to the £100 per-settlement de-minimis. Bare-trust holdings for minor children do NOT escape s.629; the bare-trust mechanism affects only CGT and IHT treatment, not income-tax attribution. The 18th-birthday cliff matters: from the child's 18th birthday s.629 ceases to apply prospectively (with no retrospective re-attribution), and income arising on the now-adult child's share is taxed on the child.

**The grandparent-route exception.** Where a grandparent (not parent) settles property on a minor grandchild, the grandparent is the "settlor"; s.629 attributes income to the **grandparent**, not the parent. This is materially better than the parent-route because the parent's marginal rate does not bite; the grandparent's marginal rate does. Where the grandparent is retired or basic-rate, the s.629 outcome can be tax-neutral or favourable. This is the structural reason JISA contributions from grandparents (in their own name as settlor of the JISA arrangement) are a common minor-child planning vehicle.

**Practical hook for sessions.** Pages recommending parent-to-minor-child BTL income-shifting structures must surface the s.629(1) outcome explicitly and must not frame the structure as an income-tax saving. Acceptable use cases for the parent-to-minor route are IHT (PET clock running on the gift) and base-cost-roll-up (CGT base in the child's hands), not income tax. Where a grandparent-route alternative exists, surface it as the income-tax-favoured variant. JISA mechanics are a separate cross-reference: JISA contributions are within the JISA limit per tax year and grow tax-free for the child, outside the s.629 attribution mechanic entirely because the income is statutorily exempt at source.

---

### 22.11 GROB family-home depth (FA 1986 s.102 + s.102A + s.102B)

**Statutory base.** Verified against legislation.gov.uk on 2026-05-23 (latest available revised version, with amendment date 18 March 2026 reflected on s.102).

- **FA 1986 s.102 "Gifts with reservation"** (`https://www.legislation.gov.uk/ukpga/1986/41/section/102`). Verbatim s.102(1): the section applies where an individual disposes of property by way of gift on or after 28 March 1986 and either (a) possession and enjoyment of the property is not bona fide assumed by the donee at or before the beginning of the relevant period (the seven years ending with the donor's death, or where the gift is less than seven years before death, the period from the gift to death), or (b) at any time in the relevant period the property is not enjoyed to the entire exclusion, or virtually to the entire exclusion, of the donor and of any benefit to him by contract or otherwise. The property is then treated as subject to a reservation (s.102(2)) and, if reserved immediately before the donor's death, is treated for IHT as property to which the donor was beneficially entitled (s.102(3)) — i.e. it falls back into the deceased's death estate at death market value. If the reservation ceases before the seven-year relevant period ends, the donor is treated as making a fresh PET on the date the reservation ceased (s.102(4)).
- **FA 1986 s.102A "Gifts with reservation: interest in land"** (`https://www.legislation.gov.uk/ukpga/1986/41/section/102A`). Applies to disposals of an interest in land by way of gift on or after 9 March 1999. The interest is treated as property subject to a reservation if, at any time in the relevant period, the donor (or spouse / civil partner) enjoys a "significant right or interest" or is party to a "significant arrangement" in relation to the land. A right or arrangement is **significant** if it entitles the donor to occupy or enjoy part of the land otherwise than for full consideration in money or money's worth. A right is **not significant** if it cannot prevent the donee's entire or virtually entire exclusive enjoyment, or if it does not enable post-disposal donor occupation, or if it was granted or acquired more than seven years before the gift.
- **FA 1986 s.102B "Gifts with reservation: share of interest in land"** (`https://www.legislation.gov.uk/ukpga/1986/41/section/102B`). Applies to gifts on or after 9 March 1999 of an undivided share of an interest in land. The share is treated as subject to a reservation EXCEPT where: (s.102B(3)) the donor does not occupy the land, or occupies it to the exclusion of the donee for full consideration; OR (s.102B(4)) **both donor and donee occupy the land AND the donor does not receive any benefit, other than a negligible one, provided by or at the expense of the donee for some reason connected with the gift**.

**Mechanics for landlord and family-home pages.** The classic family-home gift trap: parent gifts the family home (or a share of it) to adult children but continues to live there. Three statutory exit routes, each narrow:

1. **Full-market-rent occupation** (s.102 generally, s.102A "significant right" carve-out). Parent pays the donees a full open-market rent for ongoing occupation. Rent must be commercial, paid in cash, regularly, with documentary record; informal or below-market rent re-triggers GROB.
2. **Parent ceases occupation entirely** (s.102A subsection (4)(a) safe harbour). Parent moves out and does not return as a regular occupier.
3. **Shared-occupation carve-out** (s.102B(4)). Parent gifts an undivided share (e.g. 50%); both parent and donee actually occupy as their joint home; parent receives no benefit from the donee related to the gift. The classic worked-example: parent and adult child both live in the family home, parent gifts 50% to child, child also lives there bona fide, parent receives no rent, no payments, no contributions to bills above their own share. This is the only family-home GROB exit that allows the parent to continue occupying without paying rent.

**POAT (Pre-Owned Assets Tax) backstop.** Where an arrangement escapes GROB (e.g. via a sale at undervalue plus loan-back, or via a discretionary trust mechanism that nominally excludes the donor) the FA 2004 Sch 15 POAT charge frequently catches it instead, levying an annual income-tax-style benefit on the donor's continuing use. Sessions on family-home gift planning must thread both gates: GROB on the IHT side under FA 1986 ss.102/102A/102B, and POAT on the income-tax side under FA 2004 Sch 15.

**Practical hook for sessions.** Pages on family-home gifts to children must NOT recommend the gift-and-continue-living-there structure as an IHT saver without surfacing both the s.102A "significant right" trigger and the s.102B(4) narrow carve-out conditions. The shared-occupation carve-out applies only where the donee genuinely and bona fide occupies as their home, not where the donee is a non-resident child treated as occupying because the title nominates them. Cross-reference §15.2 (existing position on GROB family-home overview) and §24.7 (existing Wave 5 position on adult-child + minor-child co-ownership traps).

---

### 22.12 Settlor-interested trusts for IHT (IHTA 1984 s.49 + new s.48ZA)

**Statutory base.** Verified against legislation.gov.uk on 2026-05-23 (latest available revised, with FA 2025 s.45 amendments reflected from 6 April 2025).

- **IHTA 1984 s.49 "Treatment of interests in possession"** (`https://www.legislation.gov.uk/ukpga/1984/51/section/49`). s.49(1): a person beneficially entitled to an interest in possession (IIP) in settled property is treated for IHT purposes as beneficially entitled to the underlying property. s.49(1A): for IIPs arising on or after 22 March 2006, the s.49(1) treatment applies only where the IIP is (a) an immediate post-death interest (IPDI), (b) a disabled person's interest, or (c) a transitional serial interest, or falls within s.5(1B). The 22 March 2006 reform (FA 2006) was the structural shift moving most new IIP settlements out of the IIP regime into the relevant property regime.
- **IHTA 1984 s.48 "Excluded property"** (`https://www.legislation.gov.uk/ukpga/1984/51/section/48`) **as amended by FA 2025 s.45**. **CRITICAL: s.48(3)-(3F) were OMITTED in full by Finance Act 2025 s.45(2)(b) with effect from 6 April 2025.** The pre-FA 2025 mechanism (excluded property by reference to non-UK-domiciled settlor at the time property became settled) is no longer in force. The replacement is:
- **IHTA 1984 s.48ZA "Excluded property: property situated outside the United Kingdom etc"** (`https://www.legislation.gov.uk/ukpga/1984/51/section/48ZA`), inserted by FA 2025 s.45 with effect from 6 April 2025. Settled property situated outside the UK (or holding in an authorised unit trust / shares in an OEIC, where applicable) is excluded property where: (i) while the settlor is alive, the settlor is **not a long-term UK resident** (the new statutory residence-based test); (ii) for settlors who die on or after 6 April 2025, the settlor was not a long-term UK resident immediately before death; (iii) for settlors who died before 6 April 2025, the historic domicile-at-settlement test is preserved.

**Mechanics for IHT planning.** The post-6-April-2025 framework reorientates settlor-based IHT trust planning around the new long-term-resident test. The "non-UK-domiciled settlor → excluded property forever" structure that drove decades of offshore-trust planning is closed for living settlors after 6 April 2025 unless the settlor becomes (and remains) a non-long-term-UK-resident. Sessions writing on offshore trust IHT planning must use the new s.48ZA framework and must not cite pre-FA 2025 s.48(3) (omitted).

**Relevant property regime vs IIP regime.** Most trusts settled on or after 22 March 2006 are within the **relevant property regime**, with the consequences: (i) 10-year periodic charge up to 6% on chargeable property at each 10-year anniversary (IHTA 1984 s.64); (ii) proportional exit charges on capital distributions between anniversaries; (iii) entry charge of 20% on excess over NRB on transfer in (CLT, cross-ref §22.4). Only IPDIs, disabled person's interests, and transitional serial interests post-22 March 2006 retain the pre-2006 IIP treatment under s.49(1A).

**Bare trusts treated as outside settlement for IHT.** Where property is held on bare trust, the beneficiary is treated as the absolute owner from the gift date. The transfer into bare trust is a PET (potentially exempt transfer) by the settlor; the property does not enter the relevant property regime; no 10-year charges apply; no exit charges apply. This is the structural reason bare trusts are heavily used for minor-child IHT planning (PET runs the seven-year clock from gift date) despite the income-tax cost of s.629 attribution (cross-ref §22.10).

**Practical hook for sessions.** Any page that touches non-resident settlor IHT mechanics or offshore trust IHT mechanics must use the s.48ZA framework with the long-term-resident test, not the pre-FA 2025 domicile-at-settlement test. Pages on relevant property regime mechanics must accurately distinguish pre-22-March-2006 IIP settlements (still in s.49(1) treatment) from post-22-March-2006 settlements (in the relevant property regime save for the three carve-outs in s.49(1A)).

---

### 22.13 Trust-vs-FIC decision boundary

Cross-references §21.5 (FIC mechanics generic), §22.6 (FIC as IHT value-freeze tool), §22.9-§22.10 (settlements legislation income-tax attribution), §22.12 (relevant property regime). §22.13 is the comparative-framing position; sessions choosing the right structure for a reader scenario use this section as the decision tree.

**Trusts win where:**

- The structure can be made **genuinely non-settlor-interested** (no benefit path back to settlor or spouse, no discretionary inclusion of settlor / spouse). Where this is achievable, ITTOIA 2005 s.624 / s.629 attribution is avoided and the trust functions cleanly for income tax.
- The reader values **TCGA 1992 s.260 holdover** on transfer in. s.260 holdover is available for CLTs into non-settlor-interested trusts (TCGA 1992 s.260, with the settlor-interested restriction at ss.169B-169G). This is unavailable for FICs because FIC transfers do not generate CLT status.
- The reader wants a **non-corporate vehicle** with cleaner discretionary distribution mechanics (trustees can distribute or accumulate without dividend-class engineering).
- The structure is for **multi-generational hold** and the 10-year periodic charge profile (up to 6% per 10 years) is acceptable in exchange for the entry-side s.260 holdover.

**FICs win where:**

- The structure must avoid **trust-side IHT charges entirely** (no entry CLT, no 10-year, no exit charges). FIC entry is a transfer to a company (s.18 CA 2006 vehicle), not a settlement; the IHT clock runs on the share gift, not on the company formation.
- The founder wants **operational control via director appointment** independent of share ownership. A family member can sit on the FIC board without owning shares; trustees do not have the same separation between governance role and beneficial entitlement.
- The structure carries **substantial operating activity** (active property management, active investment management) where corporate governance is the better fit than trustee governance.
- The reader is comfortable with the **CGT MV cost on transfer in** (no s.165 holdover for investment FICs, no s.260 holdover because there's no CLT), in exchange for the absence of 10-year charges.
- The structure benefits from **alphabet-share dividend flexibility** for income splitting across family members (subject to s.624 / s.626 Arctic Systems carve-out for spouses; s.629 attribution still bites for minor children, cross-ref §22.10).

**Hybrid structures.** Trust-owns-FIC-shares hybrids combine both gates: trust IHT regime governs the trust assets (FIC shares), FIC corporate regime governs the underlying property income. Sessions should treat hybrids as advanced advisory-territory structures; the cross-charge interaction (trust 10-year charge on FIC share value, plus CT on underlying rental, plus dividend WHT exit charge to trust) often makes hybrids worse than either pure structure unless the family has £multi-million asset base.

**Practical hook for sessions.** Pages comparing trust and FIC structures must frame the choice as a four-axis decision: (1) income-tax attribution risk (s.624 / s.629); (2) entry-tax cost (CGT MV vs s.260 holdover; IHT CLT vs FIC PET); (3) ongoing-charge profile (10-year periodic vs CT main rate); (4) governance flexibility. No single "winner" answer; the optimum is reader-specific. Cross-reference §21.5 + §22.6 for the FIC operational detail and §22.4 + §22.12 for the trust operational detail.

---

### 22.14 Citations for §22.9-§22.13 (extends §22.7)

- **ITTOIA 2005:** s.620 (definition of settlement / settlor); s.624 (settlor-attribution); s.625 (retained interest definition); s.626 (outright-gift spouse / civil partner exception); s.627 (separation / commercial / pension carve-outs); s.628 (charity exception, NOT a 5% rule); s.629 (minor child attribution, £100 de-minimis); s.631 (retained-and-accumulated income).
- **FA 1986:** s.102 (general GROB); s.102A (land-interest GROB significant-right test); s.102B (undivided-share-of-land GROB with shared-occupation carve-out).
- **FA 2004:** Sch 15 (POAT — Pre-Owned Assets Tax).
- **IHTA 1984:** s.49 (IIP treatment, including s.49(1A) post-22-March-2006 narrowing); s.48 as amended by FA 2025 s.45 (subsections (3)-(3F) omitted); s.48ZA NEW (post-6-April-2025 long-term-resident-based excluded-property test for non-UK settled property); s.64 (10-year charge); s.5(1B) (cross-reference for IIP carve-outs).
- **TCGA 1992:** s.260 (CLT holdover, available for non-settlor-interested trusts only via ss.169B-169G); **s.169E (settlor definition for ss.169B-169D and s.169G)**; **s.169G (arrangement definition for ss.169B-169E plus information power)** — sessions writing on ss.169B-169G must NOT cite s.169G as the settlor definition (s.169G's pre-2009 subsections (2)-(5) were omitted by FA 2009, and the misattribution still appears in older commentary). F-4 / Wave 6 lock 2026-05-24, verified at legislation.gov.uk.
- **FA 2025:** s.45 (omits IHTA 1984 s.48(3)-(3F) and inserts new s.48ZA; effective 6 April 2025).
- **Case law:** *Jones v Garnett (Arctic Systems)* [2007] UKHL 35 (settlements / s.626 spouse exception).
- **Cross-references in this house position doc:** §15.2 (GROB family home overview); §21.2 (Arctic Systems carve-out for share alphabet structures); §21.5 (FIC mechanics generic); §22.4 (CLT into discretionary trust); §22.6 (FIC as IHT value-freeze tool); §24.7 (adult-child + minor-child co-ownership settlements traps).

---

### 22.15 Do not write (extends §22.8)

- "Settlor-interested trust income is taxed on the beneficiary" (false; s.624 attributes back to the settlor).
- "ITTOIA 2005 s.628 contains a 5% rule" (false; s.628 is the charities exception; there is no 5% rule).
- "Parent-to-minor-child rental income split is taxed on the child" (false; s.629(1) attributes to the settlor-parent, with £100 de-minimis per settlement; the 18th-birthday cliff is prospective only).
- "Bare trust for minor child escapes settlements legislation for income tax" (false; bare trust mechanism affects only CGT and IHT, not s.629 income-tax attribution).
- "Grandparent-to-grandchild trust attributes income to the parent" (false; the grandparent is the settlor, attribution is to grandparent).
- "Parent can gift family home to children and continue living there without IHT consequences" (false; GROB under FA 1986 s.102 / s.102A unless full market rent paid or s.102B(4) shared-occupation carve-out met).
- "s.102B applies whenever the donor occupies the home" (false; s.102B applies only to undivided-share gifts of land AND requires both donor and donee to occupy AND no donor-benefit-from-donee).
- "IHTA 1984 s.48(3) is the route to excluded-property status for offshore trusts" (false; s.48(3)-(3F) omitted by FA 2025 s.45 from 6 April 2025; replaced by new s.48ZA long-term-resident test).
- "Non-UK-domiciled settlor of an offshore trust gives permanent excluded-property protection" (false; post-FA 2025 the test is long-term-residence-based; domicile is not the operative criterion for new settlements or for living settlors).
- "TCGA 1992 s.169G defines the settlor for ss.169B-169D" (false; s.169G defines 'arrangement' for ss.169B-169E plus information power; the settlor definition is at **s.169E**. The s.169G misattribution appears in older commentary because subsections (2)-(5) of s.169G were omitted by FA 2009. F-4 / Wave 6 lock 2026-05-24).
- "Bare trusts attract 10-year periodic IHT charges" (false; bare trusts are treated as outside settlement for IHT; the beneficiary is the absolute owner from gift date).
- "Trust is always better than FIC for IHT" (false; trust-vs-FIC is a four-axis decision per §22.13, not a one-axis ranking).
- "s.260 holdover is available on FIC share gifts" (false; FIC share gifts do not generate CLT status; s.260 is only for CLTs into non-settlor-interested trusts).

**End Wave 6 §22 extension.** Wave 6 Session B (Trusts + §24.7 adult/minor-child + settlements + GROB) uses §22.1-§22.15 together with §15 + §24 + §21. §22.12 reflects the post-FA-2025 long-term-resident architecture replacing the pre-FA-2025 domicile-at-settlement test for IHT excluded property; sessions writing on offshore-trust IHT must use the new s.48ZA framework and must not cite the omitted s.48(3)-(3F). Any contradiction between competitor sources and §§22.9-22.15, flag in `wave6_site_wide_flags.md`.

### 22.16 Trust Registration Service (TRS) — Wave 7 extension (locked, 2026-05-24)

- **Statutory hook:** Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017 (**SI 2017/692**), regulation 45 (TRS registration) and regulation 76 (statutory penalty regime). Implemented by HMRC via the Trust Registration Service (TRS) portal on gov.uk. Verified at https://www.legislation.gov.uk/uksi/2017/692/regulation/45 on 2026-05-24.
- **Registrable trust classes (MLR 2017 reg 45 + Schedules 3A / 3B):**
  - **Taxable relevant trusts** — UK trusts where trustees are liable for UK income tax, capital gains tax, inheritance tax, stamp duty land tax, or stamp duty reserve tax. Includes most landlord-owned trust structures (bare trust holding rental property, IIP trust receiving rental income, discretionary trust with property assets, IPDI trust under will, etc.).
  - **Non-taxable UK express trusts** (added by the Fifth Money Laundering Directive transposition, effective 6 October 2020) — registration extended to express trusts even where they have no UK tax liability, subject to **Schedule 3A exclusions** (statutory trusts, pension scheme trusts, charitable trusts, trusts for vulnerable beneficiaries, life-policy trusts in very limited cases, bare trusts holding policy proceeds for a child under 18, etc.).
  - **Non-UK trusts** — register where (a) they have at least one UK-resident trustee AND enter a UK business relationship OR acquire UK land, or (b) they acquire UK land regardless of trustee residence (post-1 October 2017 acquisitions).
- **Registration deadlines:**
  - **New trust (taxable):** within **90 days** of the trustees first becoming liable to UK tax OR the trust being established, whichever is later.
  - **New trust (non-taxable):** within **90 days** of the trust being established.
  - **Existing trust (taxable, pre-6 April 2021):** original deadline 31 January following the tax year of first liability (transitional; mostly historical now).
  - **Existing trust (non-taxable, pre-4 June 2022):** deadline was 1 September 2022 (historical).
  - **Change of beneficial ownership / trust details:** updates must be made within 90 days of the change.
- **Penalty regime (MLR 2017 reg 76 + HMRC operational tariff at TRSM80020):**
  - **Statutory hook is reg 76 (general MLR penalty)**, max £5,000 per occurrence in practice.
  - **HMRC operates a case-by-case discretion framework**, not a graduated tariff. Per TRSM80020 (verified 2026-05-24): "Where a trustee has failed to register a registrable trust a £5,000 penalty may be charged. Penalties for non-compliance will be applied on a case-by-case basis." HMRC factors include continued failure after warnings, providing inaccurate details with continued failure to amend.
  - **No graduated £100 / £200 / £300 tariff in HMRC guidance.** Sessions writing on TRS penalties must NOT cite a graduated tariff scale; HMRC's published position is discretionary £5,000-max-per-failure.
  - In practice HMRC's enforcement focus has been on **(a) failure to register** (most common) and **(b) failure to update on beneficial-ownership change** (rising focus 2024-2026).
- **HMRC manual anchor:** TRSM10000+ (TRS Manual general); TRSM23000+ (registration triggers); TRSM80000+ (penalties); TRSM30000+ (information to be provided).
- **Practical writing rule for sessions (Wave 7 C1):** the operational picture is (a) trust class → does the trust fall within reg 45? (b) tax-status overlay → taxable relevant trust OR non-taxable express trust? (c) deadline calculation → 90 days from trigger event; (d) information requirements → trustees, settlor, beneficiaries (named or class), trust assets, beneficial-owner-style declaration; (e) penalty mitigation framing → registration even late + cooperation reduces HMRC penalty exposure. The widely-cited graduated tariff is a common misconception; sessions must use the £5,000-max-discretionary framing.

### 22.17 Immediate Post-Death Interest (IPDI) + Qualifying Interest in Possession (QIIP) — rental-property depth (locked, 2026-05-24)

- **Statutory hook:** IHTA 1984 s.49A (IPDI definition); s.49(1) (deemed beneficial entitlement); s.5 (IHT charge on death); s.144 (post-death deed of variation reading back into IPDI). Verified at https://www.legislation.gov.uk/ukpga/1984/51/section/49A and /section/49 on 2026-05-24.
- **IPDI definition — IHTA 1984 s.49A four conditions:**
  1. **Settlement effected by will or under the law of intestacy.** Lifetime-created settlements cannot be IPDIs (they would be CLTs into discretionary or relevant property regime post-22 March 2006).
  2. **Beneficiary became entitled to the IIP on the testator's or intestate's death.** The "post-death" element — interest must crystallise on death, not on a later event.
  3. **Neither s.71A (trusts for bereaved minors) nor disabled person's interest (s.89B) applies to the property.**
  4. **Condition 3 has been satisfied at all times since the beneficiary became entitled.**
- **IHT treatment (s.49(1) deemed beneficial entitlement):** "A person beneficially entitled to an interest in possession in settled property shall be treated for the purposes of this Act as beneficially entitled to the property in which the interest subsists." For an IPDI holder, the underlying trust property is in their IHT estate on death — taxed at the rate appropriate to their personal circumstances (with NRB + RNRB + transferable allowances if applicable).
- **Why the IPDI route matters for landlord-rental-property estate planning:**
  - **Lifetime gift of property to a trust now = relevant property regime** (CLT entry charge above NRB; 10-year periodic charges at up to 6%; exit charges on distribution). For property assets above NRB this is expensive.
  - **IPDI on death = no entry charge, no periodic charges, no exit charges WITHIN the IIP holder's lifetime.** IHT bites on the IPDI holder's death (at their then-NRB-and-rates) but the lifetime tax cost is zero.
  - **Use case:** life-tenant spouse + remainder to children. Wife inherits IIP in family home / rental property on husband's death (IPDI); spouse exemption defers IHT on first death; on wife's later death, full s.49(1) charge but the assets are in her estate (so NRB + RNRB + transferable allowances apply).
- **QIIP (Qualifying Interest in Possession) — IHTA 1984 s.59:** the broader category capturing IPDIs + pre-22-March-2006 IIPs + disabled persons' interests + transitional serial interests. **Post-22-March-2006, the QIIP route is narrow:** only IPDIs, disabled persons' interests, transitional serial interests, and (limited) immediate-post-death-IIPs created on a TSI converter. Sessions writing on QIIP-vs-relevant-property regime distinctions must anchor on the 22 March 2006 reform date.
- **Deed of variation re-engineering IPDI — IHTA 1984 s.144 + s.142:**
  - **s.142** allows beneficiaries to vary a will within 2 years of death, reading back into the deceased's estate for IHT and CGT purposes. Common landlord use case: vary will to redirect rental property to an IPDI trust for surviving spouse (creating the IPDI post-hoc).
  - **s.144** specifically covers distributions out of a discretionary will-trust within 2 years of death; those distributions read back to the deceased's death. Allows landlord estate to be settled into discretionary trust by will, then within 2 years distributed out (with reading-back) into IPDI or absolute interests as circumstances dictate.
- **Sub-trust mechanics — IPDI within bare-trust holding for adult-child IIP holder.** Where the IPDI beneficiary is under 25, the trustees may sub-trust to defer outright distribution while preserving the s.49(1) treatment. The sub-trust must not become a settlor-interested trust (settlor = original testator, deceased; no s.624 attribution issue post-death).
- **Rental-property mechanics within IPDI:**
  - **Rental income** is taxable on the **IIP holder** at their personal IT rates (transparent treatment under ITTOIA 2005 s.272 + s.13 read with IPDI s.49(1)). NOT taxed on trustees as if discretionary trust.
  - **Section 24 mortgage interest restriction** applies at IIP holder level (since they are deemed beneficial owner for IT purposes).
  - **CGT on disposal during life of IIP:** trustees dispose; gain is trust-level subject to trust CGT rules (TCGA 1992 s.169B et seq); but s.225 PPR availability where the IIP holder occupies the property as their main residence (trustees can claim PPR via s.225).
  - **On IPDI holder's death:** TCGA 1992 s.72 (no CGT on death; assets re-base for trustees + remaindermen). Combined with s.49(1) IHT charge, the full base-cost uplift mirrors the absolute-ownership-on-death position.
- **HMRC manual anchor:** IHTM16000+ (Trusts manual on IPDI and IIP); IHTM12000+ (intestacy + administration); PIM4400+ (Property Income Manual on trusts).
- **Practical writing rule for sessions (Wave 7 C2):** present IPDI as a **defensive estate-planning route** for spouses + adult children where the family home / rental portfolio sits in a trust regime that defers IHT to the IIP holder's death. Distinguish IPDI from (a) lifetime IIP trusts (post-22-March-2006 relevant property regime), (b) bare trusts (no trust regime; absolute beneficial ownership), and (c) discretionary trusts (relevant property; 10-yearly charges).

### 22.18 Employee Ownership Trust (EOT) property-SPV exit — Wave 7 extension (locked, 2026-05-24)

- **Manager_prompt typo correction.** Manager_prompt Wave 7 §19 references "CTA 2010 ss.464M-Q" for EOT bonus exemption mechanics. **No such range exists in CTA 2010** — ss.464A-D are the close-company loans-to-participators anti-avoidance range (omitted CTA 2010 ss.464C/464D per FA 2025 / Wave 6 §21.1 lock). The EOT income-tax bonus exemption is actually **ITEPA 2003 s.312A** (£3,600 per employer per tax year currently). Confirmed at HP-lock 2026-05-24.
- **Statutory hooks:**
  - **CGT relief on disposal to EOT — TCGA 1992 ss.236H-236U** (the 236H-U range, not "ss.236M-Q" alone — s.236H is the relief entry; s.236M is the controlling-interest condition; s.236N is the all-employee-benefit condition; s.236O-Q cover anti-avoidance + disqualifying events).
  - **Income tax bonus exemption — ITEPA 2003 ss.312A-312I** (s.312A defines the £3,600 exemption; ss.312B-I define qualifying-bonus conditions, equal-terms requirement, EOT-controlled trading-company test).
  - **FA 2025 EOT reforms — Finance Act 2025 s.31 + Schedule 6 (Part 1 CGT, Part 2 IT).** Royal Assent 20 March 2025; commencement 6 April 2025. Verified at https://www.legislation.gov.uk/ukpga/2025/8/contents on 2026-05-24.
- **Controlling interest test — TCGA 1992 s.236M (4-pronged):**
  1. **Ordinary share capital:** trustees hold **more than 50%** of OSC (not "at least 50%" — the 50%+1 framing is correct).
  2. **Voting rights:** trustees' voting rights give them control on all questions affecting the company as a whole.
  3. **Profit entitlement:** trustees entitled to more than 50% of distributable profits.
  4. **Winding-up assets:** trustees entitled to more than 50% of assets available for equity holders on winding-up.
  Plus the post-condition: **no agreement or instrument provisions** allowing these conditions to lapse without trustee consent.
- **FA 2025 reforms (commenced 6 April 2025) — the key changes:**
  - **(i) UK-resident trustee requirement.** The EOT trust must have UK-resident trustees throughout — closes the offshore-trustee route that was historically used.
  - **(ii) Trustee independence test.** Restricts former-owner influence over trustees post-disposal; specific tests on related-party trustee appointments.
  - **(iii) Consideration requirement.** Tightens the "reasonable steps" obligation around price-setting; restricts purely deferred / earn-out structures that left former owners economically exposed.
  - **(iv) Extended disqualifying-event period.** Anti-avoidance window extended; disqualifying events trigger clawback over a longer period than pre-FA-2025.
  - **(v) Income-tax bonus exemption modifications.** Sch 6 Part 2 amends ITEPA 2003 s.312 framework; sessions writing on EOT bonus exemption must use post-6-April-2025 text.
- **EOT property-SPV qualification (Wave 7 C3 specific):**
  - **Trading company requirement (s.236I).** EOT relief requires the company being sold to be a trading company OR holding company of a trading group. **Property investment / letting business is not a trading activity** under HMRC's CG65700+ guidance and the standard CG/HS interpretation. **Property development** can be trading where there is sufficient development activity (Pawson-style investment-vs-trading line).
  - **Practical EOT applicability:** mainstream property-investment SPVs (BTL portfolio in LtdCo, FIC, HoldCo with property subsidiaries) **do NOT qualify** for the s.236H CGT relief because they fail the trading-company test. Wave 7 C3 must lead with this gating constraint.
  - **Where EOT IS applicable:** property-development companies (genuine trading), property-management companies (where management is a service business rather than passive letting), property-related professional services (estate agents, surveyors, architects, project management).
- **Income tax bonus exemption — ITEPA 2003 s.312A (current state as of 2026-05-24):**
  - **£3,600 per employer per tax year** (verified at https://www.legislation.gov.uk/ukpga/2003/1/section/312A on 2026-05-24).
  - "**No liability to income tax arises in respect of the qualifying bonus payments if, or to the extent that, the total chargeable amount in respect of those payments does not exceed £3,600**" (verbatim from s.312A(1)).
  - NICs still apply on the bonus (no equivalent NIC exemption).
  - Conditions (s.312B-I): qualifying-bonus payment from EOT-controlled trading company; paid to all employees on similar terms; bonus must not be paid in lieu of regular salary.
  - **FA 2026 c. 11 pending uplift to £4,800** noted in legislation.gov.uk amendment panel — sessions writing after FA 2026 Royal Assent must verify operative figure.
- **HMRC manual anchor:** CG67830P (EOT relief); CG67871+ (EOT controlling interest test); EIM03050+ (income tax bonus exemption); CG65700+ (trading-vs-investment line).
- **Practical writing rule for sessions (Wave 7 C3):** lead with the **trading-company test as the gating constraint** for property-SPV EOT applicability. Most landlord/portfolio SPVs do not qualify. Then walk through the s.236M-Q mechanics for the cases that do qualify (development companies, mixed property-trading-and-investment groups, property professional-services companies). Cite the FA 2025 reforms as the current operational state — the pre-FA-2025 offshore-trustee + lenient-consideration position is no longer available.

### 22.19 Citations for §22.16-§22.18 (extends §22.7 + §22.14)

- **SI 2017/692** (Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017): reg 45 + Sch 3A + reg 76.
- **IHTA 1984:** s.49A (IPDI); s.49(1) (IIP deemed beneficial entitlement); s.5 (charge on death); s.59 (QIIP); s.71A (trusts for bereaved minors); s.71D (18-25 trusts); s.89B (disabled person's interest); s.142 (deed of variation); s.144 (discretionary will-trust distribution reading back); s.151 (RPRT charge — separate); s.211 (PRs' liability).
- **TCGA 1992:** ss.236H-236U (EOT relief range); s.169B+ (trust CGT); s.225 (PPR for trusts); s.72 (CGT on death — no charge + re-base).
- **ITEPA 2003:** ss.312A-312I (EOT bonus exemption).
- **Finance Act 2025 (c. 8):** s.31 + Sch 6 (EOT reforms, commenced 6 April 2025).
- **HMRC manuals:** TRSM10000+ (TRS general); TRSM80000+ (TRS penalties); IHTM16000+ (IIP trusts); IHTM12000+ (intestacy); CG67830P (EOT); EIM03050+ (EOT bonus).

### 22.20 Do not write (extends §22.8 + §22.15)

- "TRS penalties are graduated £100 / £200 / £300" (false; HMRC operates case-by-case discretion with £5,000 maximum per TRSM80020).
- "Bare trusts are exempt from TRS" (false in general; the bare-trust-holding-policy-proceeds-for-a-minor exclusion is narrow Schedule 3A carve-out; most bare trusts holding rental property must register).
- "Trustees have 30 days to register on TRS" (false; the deadline is **90 days** from the trigger event under reg 45).
- "IPDIs can be created during the settlor's lifetime" (false; IHTA 1984 s.49A condition 1 requires settlement by will or intestacy — lifetime settlement cannot be IPDI; lifetime IIP trusts created post-22-March-2006 fall into the relevant property regime).
- "IPDI rental income is taxed on the trustees as a discretionary trust" (false; IPDI is transparent under s.49(1) deeming; rental income taxed on IIP holder at personal rates).
- "All IIPs are QIIPs" (false post-22-March-2006; only IPDIs + disabled persons' interests + transitional serial interests are QIIPs from that date — wider IIP definitions fall into relevant property regime).
- "EOT relief is available on disposal of property investment companies" (false in general; s.236H requires trading company / trading group; property letting is not a trade per CG65700+; property development may be trade but must be substantive).
- "EOT trustees can be offshore-resident" (false post-6 April 2025; FA 2025 s.31 + Sch 6 introduced UK-resident-trustee requirement).
- "ITEPA s.312A bonus exemption is £4,800" (false as of 2026-05-24; current operative figure is **£3,600 per employer per tax year**; FA 2026 c. 11 includes a pending uplift to £4,800 not yet in force).
- "Bonus paid under ITEPA s.312A is NIC-exempt as well as income-tax-exempt" (false; the exemption is income-tax only; Class 1 NIC applies on the bonus payment in full).
- "The EOT controlling-interest test is at least 50%" (false; the test is **more than 50%** — 50%+1 / strictly over 50%; equal-50/50 splits fail).
- "CTA 2010 ss.464M-Q govern the EOT bonus exemption" (false; no such range exists in CTA 2010; the EOT bonus exemption is ITEPA 2003 ss.312A-312I; CTA 2010 ss.464A-D are the close-company loan-to-participator anti-avoidance range).

**End Wave 7 §22.16-§22.18 extension.** Wave 7 Session C picks C1 (TRS), C2 (IPDI/QIIP), C3 (EOT) cite §22.16-§22.18 directly. §22.16 supersedes any prior assumption of a graduated TRS penalty tariff (HMRC operates discretionary £5,000-max-per-failure per TRSM80020). §22.17 distinguishes the IPDI route from lifetime-IIP relevant-property regime (post-22-March-2006 cut-off is the critical date). §22.18 leads with the trading-company gating constraint on EOT relief for property-SPVs (most landlord SPVs do NOT qualify) plus FA 2025 s.31 + Sch 6 reforms (commenced 6 April 2025 — UK-resident trustee, independence, consideration tightening). Any contradiction between competitor sources and §§22.16-22.18, flag in `wave7_site_wide_flags.md`.

---

## 25. Capital allowances for property businesses (CAA 2001) — Wave 6 extension (locked, 2026-05-23)

**Verification anchor:** every section and rate in §25 verified against legislation.gov.uk on 2026-05-23 (latest available revised version). Where a reform has been announced but not yet reflected on legislation.gov.uk (e.g. FYA leased-plant extension awaiting commencement), the position is marked PENDING with explanation. Cross-references §1 (SDLT on property transactions), §6 (FHL abolition transition narrative), §21.5 (FIC mechanics, including FIC-side capital allowance availability).

**Critical framing for sessions.** Capital allowances are a CT-side or IT-side relief mechanism (Part 2 of CAA 2001 for plant and machinery, Part 2A for SBA, Part 6A for various). They are available where the property is held for a **qualifying activity** within CAA 2001 s.15 / s.270CA (typically a UK property business, an overseas property business, or a trade); they are NOT available simply because a building exists. Residential lettings face a major restriction: CAA 2001 s.35 excludes plant and machinery in a dwelling-house from qualifying expenditure for a property business, with narrow exceptions. Commercial property and former-FHL (subject to transitional rules) carry the broader claim base.

### 25.1 Qualifying activity (CAA 2001 s.15 + s.270CA)

**Statutory base for plant and machinery, s.15 "Qualifying activities"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/15`). Verbatim s.15(1): "Each of the following is a qualifying activity for the purposes of this Part — (a) a trade, (b) a UK property business, (c) [OMITTED for corporation tax from 1 April 2025 and income tax from 6 April 2025], (d) an overseas property business, (da) [OMITTED for corporation tax from 1 April 2025 and income tax from 6 April 2025], (e) a profession or vocation, (f) a concern listed in section 12(4) of ITTOIA 2005 or section 39(4) of CTA 2009 (mines, transport undertakings etc.), (g) managing the investments of a company with investment business, (h) special leasing of plant or machinery, and (i) an employment or office, but to the extent only that the profits or gains from the activity are, or (if there were any) would be, chargeable to tax." Verified 2026-05-23.

**The s.15(1)(c) / (da) omission is the FHL pivot.** Pre-1-April-2025 / 6-April-2025, s.15(1)(c) listed "a UK furnished holiday lettings business" and s.15(1)(da) listed "an EEA furnished holiday lettings business" as standalone qualifying activities, allowing FHL to access the broader plant-and-machinery claim base regardless of the dwelling-house restriction. Both paragraphs were OMITTED with effect from 1 April 2025 (CT) / 6 April 2025 (IT) by Finance Act 2025 Schedule 5 Part 3. From those dates forward, FHL is absorbed into the ordinary UK property business / overseas property business regime, with the s.35 dwelling-house restriction biting in full. Transitional rules at FA 2025 Sch 5 Part 5 govern grandfathered FHL-pool balances (cross-ref §25.7).

**Statutory base for SBA, s.270CA "Qualifying activities"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/270CA`). Verbatim: "Each of the following is a qualifying activity for the purposes of this Part — (a) a trade, (b) a UK property business, (c) an overseas property business, (d) a profession or vocation, (e) the carrying on of a concern listed in section 12(4) of ITTOIA 2005 or section 39(4) of CTA 2009 (mines, quarries and other concerns), and (f) managing the investments of a company with investment business, but only to the extent that the profits or gains from the activity are, or (if there were any) would be, chargeable to tax." Verified 2026-05-23. Note: SBA s.270CA does NOT list FHL separately; SBA qualifying-activity scope was never separately broadened for FHL.

**Practical hook for sessions.** Pages on landlord capital allowances post-6-April-2025 must use the post-omission s.15 framework. Pages on commercial property capital allowances use s.15 unchanged for trade or property business. Pages on FHL capital allowances must navigate the transitional grandfathering at FA 2025 Sch 5 Part 5 explicitly; framing FHL as still-a-separate-activity is now wrong. Source: legislation.gov.uk, verified 2026-05-23.

### 25.2 Plant and machinery allowances (CAA 2001 Part 2, ss.21-204)

**The buildings exclusion, s.21 "Buildings"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/21`). Verbatim s.21(1): "For the purposes of this Act, expenditure on the provision of plant or machinery does not include expenditure on the provision of a building." s.21(2): provision of a building includes its construction or acquisition. s.21(3): "building" includes any asset in or connected with the building falling within **List A** — walls, floors, ceilings, doors, gates, shutters, windows and stairs; mains services and systems for water, electricity and gas; waste disposal systems; sewerage and drainage systems; shafts or other structures in which lifts, hoists, escalators and moving walkways are installed; fire safety systems. List A items are treated as building, not plant, and excluded from P&M allowances.

**The structures exclusion, s.22 "Structures, assets and works"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/22`). s.22(1): expenditure on plant or machinery does not include expenditure on the provision of a structure or other asset in **List B** (tunnels, roads, waterways, dams, docks, harbours, embankments, retaining walls, etc.) or any works involving alteration of land.

**The carve-outs back, s.23 "Expenditure unaffected by sections 21 and 22"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/23`). s.23(1)-(2) lists the statutory carve-back provisions, including s.28 (thermal insulation of buildings), s.33 (personal security), s.33A (integral features), s.71 (software). s.23(3)-(4) introduces **List C** (33 items) which restores items that would otherwise be treated as buildings/structures back into plant — examples include machinery and equipment, computer systems, swimming pools, glasshouses, sports pavilions, fish tanks, advertising hoardings, and various trade-specific items. List C does not override the s.21 List A items or the s.22 List B items where they apply, but it is the primary route by which plant-like equipment fixed to a building remains claimable.

**Integral features, s.33A** (`https://www.legislation.gov.uk/ukpga/2001/2/section/33A`). Verbatim s.33A(5): integral features comprise (a) an electrical system (including a lighting system); (b) a cold water system; (c) a space or water heating system, a powered system of ventilation, air cooling or air purification, and any floor or ceiling comprised in such a system; (d) a lift, an escalator or a moving walkway; (e) external solar shading. Integral feature expenditure is special-rate expenditure, written down at the special rate (currently 6% reducing balance from FY 2019 onwards).

**Fixtures elections, s.198 "Election to apportion sale price on sale of qualifying interest"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/198`). s.198(1): the section applies where the disposal value of a fixture is brought into account under item 1 or 9 of the Table in s.196 (sale at not less than market value, etc.). s.198(2): seller and purchaser may jointly elect to fix the amount treated as the part of the sale price that is expenditure incurred by the purchaser on the provision of the fixture. s.198(3): the elected amount must not exceed the lower of (a) the capital expenditure originally treated as incurred by the seller on the fixture, and (b) the actual sale price. The election is the operative mechanism for buyer-side fixtures claims on commercial property purchase; without the s.198 election (or alternative s.199 election for past-claim cases), the buyer cannot claim allowances on fixtures already pooled by the seller. The 2014 reform (FA 2012 Sch 10) introduced the **pooling and fixed-value requirements** for post-April-2014 transactions: buyer claims are barred unless the seller pooled the expenditure AND a s.198 fixed-value election or tribunal determination has been agreed within two years of completion.

**Short-life asset election, s.83 "Meaning of 'short-life asset'"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/83`). Plant qualifies as a short-life asset where (a) s.84 does not rule out the classification, and (b) the person incurring expenditure elects for short-life treatment. Short-life assets are depooled (held in a single-asset pool), written down separately, and the residual balance is crystallised as a balancing allowance on disposal within the cut-off period (currently 8 years from end of period of incurring) rather than rolling indefinitely in the main pool. Useful for assets with high write-off velocity (computer equipment, certain industrial machinery).

**Practical hook for sessions.** Pages on commercial property allowances must distinguish (i) the building shell (s.21 List A, excluded), (ii) the structures (s.22 List B, excluded), (iii) the integral features (s.33A, special rate 6%), and (iv) the remaining plant (List C and main rate 18% reducing balance). The s.198 fixtures election is the make-or-break mechanism for buyer-side claims; sessions must surface the two-year election deadline and the pooling-requirement gate. Pages on residential property (BTL ordinary lettings) must surface the s.35 dwelling-house restriction: P&M allowances are barred for plant in a dwelling-house unless the plant is in a common part of a multi-let property (e.g. communal halls of a block of flats). Source: legislation.gov.uk, verified 2026-05-23.

### 25.3 Annual Investment Allowance (CAA 2001 ss.51A-51N)

**Statutory base, s.51A "Entitlement to annual investment allowance"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/51A`). Verbatim s.51A(5): "The maximum allowance is £1,000,000." Verified 2026-05-23. The £1m cap was made **permanent from 1 April 2023** by Finance (No. 2) Act 2023 s.8; the prior structure of temporary cap levels (£200k baseline, with successive temporary uplifts to £1m) ended at that point. AIA provides 100% write-off in the chargeable period of incurring for AIA-qualifying expenditure up to the cap; expenditure above the cap rolls into the main pool (18%) or special-rate pool (6%) as the case may be.

**Restrictions for companies under common control, ss.51B-51N.** s.51B (`https://www.legislation.gov.uk/ukpga/2001/2/section/51B`): a company is entitled to a single AIA across all its qualifying activities. s.51C (`https://www.legislation.gov.uk/ukpga/2001/2/section/51C`): a parent and its subsidiary companies share a single AIA between them (allocable as they think fit). s.51E (`https://www.legislation.gov.uk/ukpga/2001/2/section/51E`): two or more companies under common control AND **related** to one another share a single AIA. "Control" is defined at s.51F; "related" is defined at s.51G (the **shared premises condition** or the **similar activities condition** — NACE first-level classification, more than 50% turnover overlap). s.51K (`https://www.legislation.gov.uk/ukpga/2001/2/section/51K`) governs allocation mechanics within shared-allowance groups. ss.51M-51N (`https://www.legislation.gov.uk/ukpga/2001/2/section/51M`) deal with long chargeable periods within shared-allowance arrangements.

**AIA-qualifying expenditure.** Most P&M qualifies including special-rate pool items (integral features per s.33A). Cars are excluded from AIA (separate FYA mechanism for low-emission cars per §25.5 below).

**Practical hook for sessions.** Pages on AIA for landlords / property SPVs must surface: (i) the £1m permanent cap; (ii) the single-allowance rule for related corporate group (s.51E + s.51G shared premises / similar activities tests); (iii) AIA does NOT extend to cars; (iv) AIA is unavailable for residential lettings under the s.35 dwelling-house restriction in the same way as ordinary P&M allowances. Cross-reference §21.5 for FIC-level AIA usage (where the FIC owns commercial property, AIA available; where pure-investment FIC owns BTL, AIA blocked by s.35). Source: legislation.gov.uk, verified 2026-05-23.

### 25.4 Structures and Buildings Allowance (CAA 2001 Part 2A, ss.270AA-270IH)

**Statutory base, s.270AA "Structures and buildings allowances"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/270AA`). Verbatim s.270AA(1): the Part applies if (a) construction of a building or structure begins on or after **29 October 2018**, (b) qualifying expenditure is incurred on or after that date on its construction or acquisition, and (c) the first use after qualifying expenditure is incurred is non-residential use. s.270AA(2A): allowance period is 33⅓ years for general qualifying expenditure, 10 years for special tax site (Freeport) qualifying expenditure. s.270AA(5): basic annual allowance is **3% of the expenditure** for general qualifying expenditure (uplifted from 2% to 3% by FA 2020 with effect from 1 April 2020 for CT / 6 April 2020 for IT) and **10% of the expenditure** for special tax site qualifying expenditure (Freeport / Investment Zone enhanced rate).

**Qualifying expenditure, s.270BA "Meaning of 'qualifying expenditure'"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/270BA`). Qualifying expenditure means expenditure that is qualifying capital expenditure under any of ss.270BB-270BE (construction / purchase) and is not excluded under s.270BG (land acquisition or alteration), s.270BH (market value rule), or s.270BI (provision of plant or machinery, which is dealt with under Part 2 not Part 2A).

**Construction expenditure, s.270BB "Capital expenditure incurred on construction"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/270BB`). Where capital expenditure is incurred on construction of a building or structure AND the relevant interest has not been sold (or if sold, only after non-residential use began), the expenditure is qualifying capital expenditure.

**Land-acquisition exclusion, s.270BG "Acquisition or alteration of land etc"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/270BG`). Expenditure on (a) acquisition of land or rights in or over land, or (b) altering land (land reclamation, land remediation, landscaping other than creating a structure), or (c) planning permission costs, is excluded expenditure. Subsection (3) extends the acquisition exclusion to fees, SDLT / LTT / LBTT, and other incidental costs of acquisition.

**Residential exclusion, s.270CF "Exclusion: residential use"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/270CF`). A building or structure is in "residential use" if used as, or for purposes ancillary to use as: (a)(i) a dwelling-house; (a)(ii) residential accommodation for school pupils; (a)(iii) student accommodation (purpose-built or converted, available for at least 165 days of each calendar year, occupied exclusively or mainly by persons undertaking a course of education); (a)(iv) residential accommodation for members of the armed forces; (a)(v) a home or other institution providing residential accommodation (with personal-care carve-out for old age / disability / addiction / mental disorder); (a)(vi) a prison or similar establishment. s.270CF(2) extends residential treatment to a garden or grounds occupied with a residential building. s.270CF(5): "Any part of a building or structure that is used as a dwelling-house (whether or not it is also used for any other purposes) is not in qualifying use" — the dwelling-house mixed-use trap means a mixed-use building loses SBA on the dwelling portion entirely.

**Allowance statement, s.270IA "Evidence of qualifying expenditure etc"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/270IA`). Verbatim s.270IA(2): "the amount of the qualifying expenditure is treated as nil unless, before the current owner first makes a claim for an allowance under this Part, the allowance statement requirement is met." s.270IA(4): an allowance statement is a written statement identifying the building / structure, stating (a) date of the earliest construction contract, (b) amount of qualifying expenditure incurred on construction or acquisition, (c) date first brought into non-residential use, (d) any post-first-use qualifying expenditure incurred and its date.

**No balancing event on SBA disposal.** SBA is not balancing-event-driven. On disposal of the relevant interest, the new owner inherits the remaining allowance period and continues writing down on the same basis. No balancing allowance, no balancing charge. The sale proceeds reflect the written-down value indirectly via CGT computation: TCGA 1992 s.37B requires the cumulative SBA claimed to be added to the disposal proceeds for CGT purposes (the SBA effectively converts to an increased CGT cost).

**Practical hook for sessions.** Pages on commercial property SBA must surface: (i) the 29 October 2018 construction-date gate; (ii) the 3% straight-line writing-down (33⅓ years); (iii) the **allowance statement requirement** (no statement → nil claim, including for successor owners); (iv) the residential exclusion at s.270CF (not s.270BG, which is the land-acquisition exclusion); (v) the no-balancing-event treatment on disposal; (vi) the s.37B TCGA add-back on CGT computation. Pages on FHL SBA: SBA was not available to FHL even pre-abolition (residential exclusion at s.270CF bites); FHL operators relying on SBA were always in error. Source: legislation.gov.uk, verified 2026-05-23.

### 25.5 First-Year Allowances (CAA 2001 ss.39-51)

**Statutory base, s.39 "First-year allowances available for certain types of qualifying expenditure only"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/39`). Verified 2026-05-23. FYAs are available only where the expenditure is first-year qualifying expenditure under one of: s.45D (cars with low CO2 emissions); s.45DA (zero-emission goods vehicles); s.45E (gas refuelling stations); s.45EA (electric vehicle charging points); s.45F (ring-fence trades plant); s.45K (plant in designated assisted areas); s.45O (plant for use in special tax sites — Freeports / Investment Zones); s.45S (plant or machinery in other cases — the "full expensing" / 50% special rate provision); s.45U (companion to s.45S).

**Cars with low CO2 emissions, s.45D** (`https://www.legislation.gov.uk/ukpga/2001/2/section/45D`). 100% FYA where (a) expenditure incurred in the relevant period, (b) car first registered on or after 17 April 2002, unused and not second-hand, (c) car is electrically propelled or has an applicable CO2 emissions figure that does not exceed zero g/km. Relevant period ends on **31 March 2027** for CT or **5 April 2027** for IT (extendable by Treasury order). Pre-1-April-2025 the CO2 threshold was 50 g/km; the current zero-g/km test reflects the FA 2021 reduction.

**Electric vehicle charging points, s.45EA** (`https://www.legislation.gov.uk/ukpga/2001/2/section/45EA`). 100% FYA on plant or machinery installed solely for the purpose of charging electric vehicles, unused and not second-hand, incurred between 23 November 2016 and **31 March 2027 (CT) / 5 April 2027 (IT)**, extendable by Treasury regulations.

**Special tax sites (Freeports / Investment Zones), s.45O** (`https://www.legislation.gov.uk/ukpga/2001/2/section/45O`). 100% FYA where the plant or machinery is for use primarily in a special tax site, unused and not second-hand, expenditure is for purposes of a s.15(1)(a) (trade) or s.15(1)(f) (mines etc.) qualifying activity, expenditure is incurred on or before the applicable sunset date (Finance (No. 2) Act 2023 s.332(4)-(5) governs the sunset framework), and the company is within the charge to corporation tax. The companion **10% SBA** for special tax site qualifying expenditure is at s.270AA(5)(a) (cross-ref §25.4).

**Full expensing for companies, s.45S "Expenditure on plant or machinery in other cases"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/45S`). Verbatim: expenditure qualifies as first-year qualifying expenditure if (a) it is incurred on or after **1 April 2023**, (b) it is incurred by a company within the charge to corporation tax, (c) it is expenditure on plant or machinery which is unused and not second-hand, and (d) it is not excluded by s.45T or s.46. Inserted by Finance (No. 2) Act 2023. The 100% main-rate full-expensing FYA companions the 50% special-rate FYA (separate provision) for integral features and long-life assets. **Full expensing was made permanent by Autumn Statement 2023** and confirmed at Autumn Budget 2024; permanence is reflected in the absence of a sunset clause in the section as enacted.

**General exclusions for FYAs, s.46** (`https://www.legislation.gov.uk/ukpga/2001/2/section/46`). FYAs (other than the specific car / charging point / Freeport carve-outs) are excluded for: (i) expenditure at permanent cessation of qualifying activity; (ii) cars (within the s.45D / s.45DA mechanism instead); (iii) long-life assets in transitional cases; (iv) plant for leasing (with specific carve-outs in s.46(4)-(4G)); (v) expenditure connected with a change in trade where the FYA represents the main benefit; (vi) certain prior-use cases under ss.13, 13A, 14. The leasing exclusion is the operationally material one for property structures: full expensing under s.45S was originally barred for plant intended for leasing. **Autumn Budget 2024 announced an extension of full expensing to plant for leasing** subject to commencement appointment — see PENDING note below.

**Clawback on disposal.** FYA-claimed plant carries a disposal-value calculation under s.61 (item 1: market value where sold at less than MV in connected-party context; item 2: market value generally) — the disposal value claws back FYA where the asset is sold or otherwise disposed of, capped at the original cost for full-expensing items per the FA(No.2)2023 provisions.

**Practical hook for sessions.** Pages on FYA for landlords / SPVs must distinguish: (i) the company-only full expensing (s.45S, 100% main-rate; not available to individuals, partnerships, or LLPs); (ii) the special-rate 50% FYA companion; (iii) the EV-only car FYA at s.45D (companion vehicle FYAs at s.45DA and s.45EA for goods vehicles and charging points); (iv) the Freeport / Investment Zone enhanced FYA at s.45O + 10% SBA at s.270AA(5)(a). The 130% super-deduction (FA 2021 s.9-10) expired on 31 March 2023 and is now relevant only for ongoing disposal-value clawback computations on assets claimed in the super-deduction window. Source: legislation.gov.uk, verified 2026-05-23.

### 25.6 Disposal mechanics (CAA 2001 ss.55-67 + s.61)

**Entitlement and balancing events, s.55 "Determination of entitlement or liability"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/55`). Verbatim s.55(1): entitlement to a writing-down allowance or balancing allowance, or liability to a balancing charge, is determined separately for each pool of qualifying expenditure and depends on (a) the available qualifying expenditure ("AQE") in that pool and (b) the total disposal receipts ("TDR") in that pool. s.55(2): if AQE exceeds TDR, the person is entitled to a writing-down allowance or balancing allowance. s.55(3): if TDR exceeds AQE, the person is liable to a balancing charge. s.55(4)-(5): writing-down allowance applies in all periods except the final chargeable period (per s.65), where balancing allowance / charge applies.

**Disposal events and values, s.61 "Disposal events and disposal values"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/61`). Disposal events include: ceasing to own the plant; permanent loss of possession; abandonment of plant used for mineral exploration; the plant ceasing to exist (destruction / dismantling); the plant beginning to be used wholly or partly for non-qualifying purposes; entry into a long funding lease; permanent discontinuance of the qualifying activity. Disposal value depends on the event: (1) sale at market value → net proceeds plus insurance and compensation; (2) sale below market value (connected-party context) → market value; (3) demolition / destruction → net proceeds from remains plus compensation; (4) permanent loss → insurance and compensation; (5) abandonment → insurance and compensation; (6) long funding finance lease → greater of MV or qualifying lease payments; (7) long funding operating lease → MV at lease commencement; (8) other events → MV at time of event.

**Pool concept.** Main pool (18% WDA), special-rate pool (6% WDA, integral features per s.33A and long-life assets), single-asset pools (short-life assets per s.83 election, cars over emissions threshold, certain other items). Disposal proceeds reduce the pool balance; where TDR exceeds AQE the difference is a balancing charge (taxable receipt).

**Fixtures Table, s.196** (`https://www.legislation.gov.uk/ukpga/2001/2/section/196`). 12-item Table of disposal values for fixtures, governing the seller-side computation when fixtures are sold with the building. Companion to the s.198 buyer-side election (cross-ref §25.2).

**SBA disposal.** No balancing event under Part 2A. The allowance period runs with the building; successor owner inherits the remaining period. Disposal triggers the s.37B TCGA cumulative-add-back into the CGT base cost computation (not a CAA balancing event).

**Practical hook for sessions.** Pages on landlord exits / sales must surface the disposal-value mechanic on plant pools: a property sale that includes fixtures will trigger disposal values per s.61 / s.196, potentially creating balancing charges. The s.198 election is the buyer-side gate; the seller-side counterpart is the s.196 Table read directly. Pages on SBA disposal must clarify the no-balancing-event treatment AND the s.37B TCGA add-back; framing SBA as a "free" allowance is wrong because the CGT cost on disposal claws back the cumulative claim. Source: legislation.gov.uk, verified 2026-05-23.

### 25.7 Furnished Holiday Lets transitional (FA 2025 Sch 5)

**Statutory base.** Finance Act 2025 Schedule 5 "Furnished holiday lettings" (`https://www.legislation.gov.uk/ukpga/2025/8/schedule/5`). Verified 2026-05-23. The Schedule is in five Parts: Part 1 amends income tax provisions; Part 2 amends corporation tax provisions; Part 3 amends capital allowances provisions (including the s.15(1)(c) / (da) omissions in §25.1); Part 4 amends chargeable gains provisions; Part 5 contains commencement and transitional provisions.

**Commencement.** Per FA 2025 Sch 5 Part 5 paragraph 12, the income tax, corporation tax, and capital allowances amendments take effect from **1 April 2025** (CT) and **6 April 2025** (IT). Per paragraph 13, the CGT amendments have a separate commencement structure (relevant for BADR / Investors' Relief transitional disposals).

**Grandfathered FHL pool balances.** Pre-1-April-2025 / 6-April-2025 plant-and-machinery expenditure incurred for a UK or EEA FHL business was a qualifying activity per pre-FA-2025 s.15(1)(c) / (da). The pool balances on the FHL pool at the commencement date are transferred into the corresponding ordinary property business pool (UK or overseas) by the transitional provisions in FA 2025 Sch 5 Part 3. Continued writing-down on the transferred balance is permitted, but **no new FHL P&M expenditure is qualifying** post-commencement; new expenditure must instead satisfy the ordinary property business rules with the s.35 dwelling-house restriction biting.

**CGT consequences.** BADR (Business Asset Disposal Relief) and Investors' Relief were tied to the trading-status of the FHL business pre-abolition; the FA 2025 Sch 5 Part 4 transitional rules preserve eligibility for qualifying disposals where the trading period predates abolition. The detailed cliff-edge mechanics are operationally complex; sessions on FHL exit planning must surface the Part 4 transitional schedule explicitly and must not generalise "FHL CGT advantages are gone" — the transitional preservation is real and material.

**Loss-relief transitional.** Pre-abolition FHL losses had specific carry-forward and offset rules (treated as trading losses for certain purposes); post-abolition, residual unutilised FHL losses are treated under the property-business loss rules. The transitional preservation is set out in FA 2025 Sch 5 Parts 1-2.

**Practical hook for sessions.** Pages on FHL post-abolition must (i) cite the correct enabling legislation as **FA 2025 Sch 5** (NOT FA 2024 Sch 5, which is a different Schedule on museum and gallery exhibitions); (ii) surface the 1 April 2025 / 6 April 2025 commencement; (iii) walk the grandfathered-pool transitional carefully; (iv) preserve the CGT-side transitional eligibility for pre-abolition trading-period disposals; (v) NOT recommend new FHL structures post-commencement, which are now ordinary property businesses with the dwelling-house P&M restriction. Source: legislation.gov.uk, verified 2026-05-23.

### 25.8 Recent reforms + verification anchors

- **Full expensing made permanent.** CAA 2001 s.45S inserted by Finance (No. 2) Act 2023 with effect from 1 April 2023; permanence confirmed Autumn Statement 2023 (5.40 Policy Costings) and Autumn Budget 2024. Section as enacted has no sunset clause. Verified at `https://www.legislation.gov.uk/ukpga/2001/2/section/45S`, 2026-05-23.
- **Full expensing extension to leased plant.** Announced Autumn Budget 2024 (paragraph 5.41 Policy Costings). **PENDING VERIFICATION**: commencement date appointment order not yet on legislation.gov.uk as of 2026-05-23. Sessions writing on leased-plant FYAs post-Autumn-Budget-2024 should not assume the extension is in force; cite the announcement only and note "subject to commencement appointment order".
- **AIA permanently set at £1 million.** CAA 2001 s.51A(5) amended by Finance (No. 2) Act 2023 s.8 with effect from 1 April 2023, removing the prior temporary-uplift structure. Verified at `https://www.legislation.gov.uk/ukpga/2001/2/section/51A`, 2026-05-23.
- **SBA rate uplift from 2% to 3%.** CAA 2001 s.270AA(5) amended by Finance Act 2020 with effect from 1 April 2020 (CT) and 6 April 2020 (IT). Verified at `https://www.legislation.gov.uk/ukpga/2001/2/section/270AA`, 2026-05-23.
- **FHL regime abolition.** CAA 2001 s.15(1)(c) and (da) omitted by FA 2025 Sch 5 Part 3 with effect from 1 April 2025 (CT) and 6 April 2025 (IT). Verified at `https://www.legislation.gov.uk/ukpga/2001/2/section/15` and FA 2025 Sch 5, 2026-05-23. Brief-instruction note: the FHL abolition legislation is FA 2025 Sch 5, not FA 2024 Sch 5 (FA 2024 Sch 5 is a separate provision on museum and gallery exhibitions, verified 2026-05-23).
- **130% super-deduction.** FA 2021 ss.9-10 — operative 1 April 2021 to 31 March 2023, now EXPIRED. Relevant only for ongoing disposal-value clawback computations on assets originally claimed in the super-deduction window. Not a current FYA route.
- **EV-related FYAs (s.45D cars, s.45DA goods vehicles, s.45EA charging points).** All currently in force with sunset dates 31 March 2027 (CT) / 5 April 2027 (IT); Treasury order extendable. Verified 2026-05-23.

### 25.9 Citations for §25

- **CAA 2001:** s.15 (qualifying activities, post-FA-2025 omissions of (c) / (da)); s.21 (buildings, List A); s.22 (structures, List B); s.23 (List C carve-back); s.33A (integral features, special-rate); s.35 (dwelling-house exclusion); s.39 (FYA gateway); s.45D (low-emission cars FYA); s.45DA (zero-emission goods vehicles FYA); s.45EA (EV charging points FYA); s.45K (plant in designated assisted areas FYA); s.45O (special tax site / Freeport FYA); s.45S (full expensing for companies, post-1-April-2023); s.46 (general FYA exclusions); s.51A (AIA £1m maximum, permanent from 1 April 2023); s.51B (single AIA per company); s.51C (parent / subsidiary single AIA); s.51E (common-control + related single AIA); s.51F (control definition); s.51G (related-companies definition: shared premises / similar activities NACE test); s.51K (allocation within shared-AIA groups); s.51M-N (long chargeable periods); s.55 (entitlement and balancing events); s.61 (disposal events and values); s.83 (short-life asset election); s.196 (fixtures disposal-value Table); s.198 (fixtures election on sale of qualifying interest); s.270AA (SBA: 29-October-2018 gate, 3% / 10% rates, 33⅓ / 10-year periods); s.270BA (SBA qualifying expenditure); s.270BB (construction expenditure); s.270BG (land-acquisition exclusion); s.270CA (SBA qualifying activities); s.270CF (SBA residential-use exclusion); s.270IA (SBA allowance statement requirement).
- **Finance Acts:** Finance Act 2020 (SBA rate uplift to 3%); Finance Act 2021 ss.9-10 (super-deduction, expired 31 March 2023); Finance (No. 2) Act 2023 s.8 (AIA £1m permanent); Finance (No. 2) Act 2023 (insertion of s.45S full expensing for companies); **Finance Act 2025 Sch 5** (FHL abolition; commencement 1 April 2025 CT / 6 April 2025 IT).
- **TCGA 1992:** s.37B (SBA cumulative-add-back into CGT base cost on disposal).
- **HMRC manuals:** CA21000+ (P&M general); CA22000+ (integral features); CA23000+ (AIA); CA90000+ (SBA); CA50000+ (FYAs). Sessions should anchor on legislation.gov.uk for statutory positions and use HMRC manuals as HMRC's interpretive overlay.
- **Cross-references in this house position doc:** §1 (SDLT on property transactions, including portfolio acquisition mechanics); §6 (FHL abolition transition narrative, post-6-April-2025 property-business absorption); §21.5 (FIC mechanics; FIC-level SBA availability where commercial property held).

### 25.10 Do not write

- "AIA cap is £200,000" (false; permanent £1m from 1 April 2023).
- "AIA is £1m temporarily" (false; permanent, not temporary).
- "Full expensing is available to individual landlords" (false; s.45S is company-only).
- "Full expensing applies to second-hand plant" (false; unused and not second-hand only).
- "Full expensing is temporary, set to expire" (false; made permanent at Autumn Statement 2023).
- "Full expensing already covers leased plant" (false / PENDING; Autumn Budget 2024 announced extension, commencement date not yet appointed as of 2026-05-23).
- "Super-deduction is the current 130% FYA rate" (false; super-deduction expired 31 March 2023).
- "SBA is at 2%" (false; uplifted to 3% from 1 April 2020 / 6 April 2020; 10% Freeport / Investment Zone rate).
- "SBA is available on residential property" (false; s.270CF residential-use exclusion bites; dwelling-house part of mixed-use building is not in qualifying use per s.270CF(5)).
- "SBA generates a balancing allowance on disposal" (false; SBA has no balancing-event treatment; allowance period inherits to successor; CGT-side s.37B TCGA add-back applies).
- "SBA can be claimed without an allowance statement" (false; s.270IA(2) treats qualifying expenditure as nil without an allowance statement).
- "FHL is still a separate qualifying activity for capital allowances" (false; CAA 2001 s.15(1)(c) and (da) omitted by FA 2025 Sch 5 Part 3 from 1 April 2025 / 6 April 2025).
- "FHL abolition is in Finance Act 2024 Schedule 5" (false; FA 2024 Sch 5 is on museum and gallery exhibitions; FHL abolition is FA 2025 Sch 5).
- "Plant in a residential dwelling is claimable under AIA" (false; s.35 dwelling-house restriction bars P&M allowances for plant in a dwelling-house; narrow exception for plant in communal common parts of a multi-let building).
- "Buyer can claim allowances on fixtures without a s.198 election" (false post-April-2014; pooling-and-fixed-value gates apply per FA 2012 Sch 10; without the s.198 election or tribunal determination within two years, buyer claims are barred).
- "Special tax site FYA (s.45O) is available to individuals" (false; s.45O is company-only, within the charge to corporation tax).
- "FYA on electric vehicle charging points is at s.45K" (false; s.45EA is the charging-points FYA; s.45K is plant in designated assisted areas).
- "Cars are AIA-qualifying" (false; cars are excluded from AIA; separate FYA mechanism at s.45D for low-emission cars).

**End Wave 6 §25 extension.** Wave 6 Session C (Capital allowances + SBA + FYA) uses §25.1-§25.10 as the working detail. §25 is a brand new cluster with no prior wave coverage; all 10 Bucket C briefs cite §25 subsections directly. The s.35 dwelling-house restriction is the cluster's central misconception (residential lets do NOT qualify for P&M allowances except common parts of HMOs per §25.7 + Bucket C C7 framing). Three PENDING items logged in §25.8: full expensing extension to leased plant (commencement appointment order pending); FA(No.2) 2023 amendment-chain documentation; HMRC official rate cross-reference. Any contradiction between competitor sources and §§25.1-25.10, flag in `wave6_site_wide_flags.md`.

### 25.11 Section 198 fixtures election — purchase-side depth — Wave 7 extension (locked, 2026-05-24)

**Scope.** §25.11 extends §25.6 (disposal mechanics) and §25.7 (FHL transitional + dwelling-house s.35 restriction) with the buyer-side mechanics for fixtures claims on transfer of qualifying interests. Wave 7 Bucket C C4 (s.198 commercial-fixtures depth) cites §25.11 directly. **This §25.11 is distinct from the proposed Wave 6 F-17 LRR §25.11 inter-wave queue item** (LRR is CTA 2009 Part 14, in different territory); the LRR position can be added as §25.12 or in a future cluster.

- **Statutory hooks:** CAA 2001 s.187A (fixed-value requirement); s.198 (election to apportion expenditure between transferor and transferee); s.199 (election on grant of lease, parallel mechanic); s.201 (election procedural mechanics + 2-year time limit + tribunal route). All verified at legislation.gov.uk on 2026-05-24.
- **The mechanism in plain terms.** When a property is sold containing existing fixtures (heating systems, lifts, lighting, sanitaryware, kitchens in commercial property, integral features), the seller and buyer can **jointly agree** what part of the total sale price is allocated to the fixtures for capital allowances purposes. That allocated value becomes the buyer's qualifying expenditure and the seller's disposal value. Without the election, the buyer's claim faces the **pooling-and-fixed-value gates** and may be **barred entirely** (s.187A(3) treats expenditure as nil).
- **The two-gate test for buyer fixtures claims (post-April-2014):**
  - **Pooling requirement (s.187B).** Past owner must have pooled the fixture expenditure (claimed AIA / WDA / FYA on it) for the buyer to claim. Where past owner failed to pool, the buyer is **permanently barred** — the s.198 election cannot rescue a non-pooled fixture.
  - **Fixed-value requirement (s.187A).** Once the pooling gate is passed, the apportioned value between seller and buyer must be FIXED within 2 years via:
    - **(a) Joint s.198 election** (most common route), OR
    - **(b) Tribunal determination** under s.563 (where one party refuses to elect), OR
    - **(c) Written statements** from past owner + transferee (limited residual route under s.187A(6)).
  - **Consequence of failure:** s.187A(3): "**the new expenditure is to be treated as nil**" — the buyer cannot claim allowances at all on those fixtures. The "lost-and-trapped" allowances cannot be recovered by any subsequent buyer (the fixture remains stranded for the property's remaining life).
- **s.198 election — form and content (s.201(3) + HMRC CA26450+):**
  - **In writing**, signed by both seller and buyer.
  - **Must specify:** (i) the **fixed amount** allocated to the fixtures; (ii) **names** of the electing parties; (iii) **identification of the plant and machinery** to which the election relates (item-level specificity for major fixtures recommended; high-level catch-all permitted but less defensible on enquiry); (iv) **identification of the land / qualifying interest**; (v) **UTRs** of both parties (or confirmation of non-possession).
  - **Submitted to HMRC** by notice to an HMRC officer — usually attached to the buyer's tax return for the period of acquisition; can also be filed separately.
  - **No prescribed HMRC form** but template forms widely circulated by CA specialists; HMRC accepts free-form documents meeting s.201(3) content requirements.
- **2-year time limit — CAA 2001 s.201(1):** the election must be made within **2 years from the date the purchaser acquires the qualifying interest**. For lease grants (s.199 elections), 2 years from grant of lease. **Strict deadline** — late elections invalid unless the s.201(1A) tribunal-extension route applies (where a s.563 tribunal application is pending, the 2-year window is suspended until tribunal determines or application is withdrawn).
- **Maximum apportioned amount — s.198(3):** lesser of (a) the seller's original qualifying expenditure on the fixture (i.e. the buyer cannot get more allowances on the fixture than the seller had available), and (b) the actual sale price (a £1 election remains legally valid; the floor is not the seller's TWDV). The market practice is a "nominal-£1" election where the seller has fully written down the pool but wishes to comply with s.187A — or a market-value election where the parties want the buyer to claim full WDA.
- **Negotiation reality.** s.198 election is **commercially negotiated** between buyer and seller. Seller prefers low election value (reduces disposal value, preserves balance of pool, avoids balancing charge); buyer prefers high election value (maximises buyer's qualifying expenditure for ongoing WDA). The Heads of Terms / SPA should address the election quantum and the obligation to execute within the 2-year window. **PTP firm-positioning note:** failure to embed the s.198 obligation in the SPA is one of the most common deal-mishandling issues seen on commercial-property completions; the firm's role is to flag this at heads-of-terms stage.
- **Tribunal route — s.563 + s.201(1A):** where one party refuses to execute a s.198 election, the other party may apply to the **First-tier Tribunal (Tax Chamber)** under s.563 for a determination of the just apportionment. The application must be made within 2 years of the disposal event; tribunal determination has the same effect as a s.198 election for s.187A purposes. **Rarely used in practice** because (a) cost-and-time of tribunal proceedings, (b) the parties' commercial incentives usually align around a negotiated election; tribunal mostly relevant where one party becomes insolvent or refuses to cooperate.
- **Common s.198 traps for sessions to surface:**
  - **(i) Election agreed in principle, never executed.** Common SPA failure — parties intend to elect but the 2-year deadline passes without paperwork. Buyer permanently loses allowances on the fixtures.
  - **(ii) Election quantum reflects negotiation not market reality.** A £1 election is legally valid but represents the seller's effective transfer of allowances back to HMRC (not commercially neutral for the buyer); a £market-value election protects the buyer's future claim but creates a balancing charge for the seller. The right quantum is fact-and-circumstance-specific.
  - **(iii) Past owner never pooled the fixtures (pre-2014 acquisitions).** The pooling gate (s.187B) is the structural killer — if the property has been through multiple ownerships and at some point a seller failed to pool, the fixtures are permanently stranded. Buyer's due-diligence must include a **historic pooling audit** of all prior dispositions.
  - **(iv) Section-15 qualifying-activity boundary.** s.198 only operates where the buyer holds the property for a **qualifying activity** (CAA 2001 s.15). A residential investor buying commercial property and converting to residential lettings is outside the qualifying-activity definition for the residential side; the s.198 election protects only the commercial-letting period of ownership. Sessions writing on conversion scenarios must distinguish.
  - **(v) Integral features carve-out (CAA 2001 ss.33A-33B).** Integral features (electrical systems, cold-water systems, space heating, air-cooling, lifts, escalators, external solar shading) are within the s.198 mechanic but allocated to the special-rate pool (6%). Sessions writing on commercial-fixtures elections must distinguish main-pool fixtures (kitchens, sanitaryware, fixed lighting) from integral-features fixtures (HVAC, lifts, electrical infrastructure).
- **HMRC manual anchor:** CA26100+ (fixtures generally); CA26450+ (s.198 elections); CA34800+ (s.187A fixed-value mechanics); CA28000+ (integral features).
- **Practical writing rule for sessions (Wave 7 C4):** lead with the **two-gate test (pooling + fixed-value)** as the structural framework; then walk s.198 election mechanics; then surface the **2-year deadline as the operational risk**; then cover the negotiation reality (£1 vs market value). Cite HMRC CA26450+ as the working manual reference. The tribunal route is mentioned for completeness but is not the operational path.

### 25.12 Do not write (extends §25.10) — s.198 election

- "s.198 election can be made up to 4 years after acquisition" (false; 2 years under s.201(1); no 4-year extension; tribunal route under s.201(1A) is the only post-2-year mechanism).
- "Without a s.198 election the buyer still claims at market value" (false; s.187A(3) treats the buyer's expenditure as **nil** absent satisfaction of the fixed-value requirement — buyer cannot claim allowances at all on the un-elected fixtures).
- "s.198 election needs HMRC approval" (false; the election is a joint declaration between buyer and seller; HMRC's role is processing not approving; election operates on lodgement / inclusion in return).
- "Past owner's pooling failure can be rescued by a s.198 election" (false; pooling gate s.187B is independent of the fixed-value gate; non-pooled fixtures are permanently stranded — s.198 cannot rescue).
- "£1 elections are challenged by HMRC as not bona fide" (false; £1 elections are commercially legitimate and accepted by HMRC where the parties have agreed the seller retains the allowances; the legal validity is independent of the negotiation outcome).
- "s.198 elections apply to residential property fixtures" (false; CAA 2001 s.35 dwelling-house restriction bars plant in dwellings from the qualifying-activity definition; s.198 has no application to residential-only properties — only commercial and HMO common-parts qualify per §25.7).

---

## 26. Regulatory framework (non-tax) — Wave 7 extension (locked, 2026-05-24)

**Scope.** §26 covers the non-tax statutory regulatory cluster for residential lettings: building safety (BSA 2022), minimum energy efficiency (MEES SI 2015/962 + the unlegislated EPC C 2030 trajectory), the Decent Homes Standard extended to PRS, the new landlord redress scheme architecture, and the PRS Database. The Renters' Rights Act 2025 tenancy-reform core (s.21 abolition, periodic-tenancy default, Section 13 rent reform, pet rights, advance-rent prohibition, RROs) is already locked at §20; §26 is the framework that surrounds it. Wave 7 Bucket A picks A1-A10 draw on this cluster.

**Verification note.** Locked 2026-05-24 against legislation.gov.uk + gov.uk MEES guidance + RRA 2025 contents + BSA 2022 contents. Three critical drift catches surfaced at lock time (see §26.3 + §26.5 + §26.6).

### 26.1 RRA 2025 — pointer to §20 + naming discipline

- The canonical enacted-state RRA detail lives at §20. Wave 7 Bucket A briefs cite §20 for tenancy-reform mechanics. **§26 does not duplicate §20; it adds the non-tenancy regulatory clusters that surround the Act.**
- **Naming discipline (critical).** The Act is the **Renters' Rights Act 2025 (2025 c. 26)**, Royal Assent 27 October 2025. Some Wave 7 brief picks and the existing live slug `renters-rights-act-2026-tax-implications-landlords` use "2026" because the program adopted the placeholder before Royal Assent. The slug is grandfathered (mid-flight rename costs SEO equity); body copy must use "Renters' Rights Act 2025". Sessions writing in 2026 may refer to a provision being "in force from 1 May 2026 under SI 2026/421" — the **commencement** falls in 2026; the **Act** is 2025.
- **§20.5 nuance flagged at lock time (do not correct in-place; logged for inter-wave queue).** §20.5 frames the PRS Ombudsman as "a single statutory ombudsman scheme covering all landlords". RRA 2025 s.64 actually empowers the Secretary of State to approve **one or more** redress schemes meeting the s.65 criteria — the government policy intention is a single scheme but the enacted Act permits a plural-scheme regime. Sessions writing on the redress scheme must hedge: "the Act provides for an approved redress scheme regime; the government's policy expectation is a single statutory ombudsman, subject to regulations under s.64". Verified at https://www.legislation.gov.uk/ukpga/2025/26/part/2 on 2026-05-24.

### 26.2 Building Safety Act 2022 (c. 30) — Higher-Risk Buildings + leaseholder protections

- **Citation:** Building Safety Act 2022 (2022 c. 30). Royal Assent 28 April 2022. Phased commencement via numbered SIs (England chain: SI 2022/561 No.1, SI 2022/787 No.2, SI 2023/362 No.3, SI 2023/993 No.4, SI 2024/* No.5; SI 2025/1368 is the **Wales** No.6 commencement, **out of Property Tax Partners scope** — sessions must not cite SI 2025/1368 as an England commencement). Sessions writing in 2026 should treat the BSA 2022 framework as substantially in force; any specific section commencement requires a fresh legislation.gov.uk check.
- **Higher-Risk Building (HRB) definition — BSA 2022 s.65.** A building in England that (a) is at least **18 metres in height OR has at least 7 storeys**, and (b) contains **at least 2 residential units**. Both limbs must be met. The Secretary of State has reg-making power under s.65(2) to refine "building", "storey", and height-calculation methods. Verified verbatim at https://www.legislation.gov.uk/ukpga/2022/30/section/65 on 2026-05-24. The 18m / 7-storey threshold is the **occupation-stage HRB test**; the Building Safety Regulator (Part 2, ss.2-30) has separate **design-and-construction-stage** HRB scope under the Gateway regime, which captures additional building types (care homes, hospitals) not within the s.65 occupation-stage definition.
- **Accountable Person regime — BSA 2022 ss.72-74 + ss.85-90.** The Accountable Person (AP) for an HRB is the freeholder or, if different, the person with the legal obligation to repair the common parts (typical structure for leasehold blocks: freeholder is AP; RTM company can also be AP where it has assumed common-parts management). For multi-building / multi-part HRBs there can be a Principal Accountable Person plus subsidiary APs (s.73). The AP has continuous safety-management duties under ss.85-90 (safety-case report, mandatory occurrence reporting, residents' engagement strategy, complaints procedure, golden-thread documentation).
- **Leaseholder protections — BSA 2022 ss.116-125 + Schedule 8.** Came into force **28 June 2022**. Schedule 8 ("Remediation costs under qualifying leases etc"):
  - **Qualifying lease** (s.119): long lease of a single dwelling in a "relevant building" (HRB or building 11m+ / 5+ storeys with a "relevant defect"), where the lease was granted before 14 February 2022 AND the lessee held the lease on 14 February 2022 AND the dwelling was the lessee's only or principal home OR they owned no more than 3 UK residential properties.
  - **Cladding remediation costs (Sch 8 para 8):** no service charge payable under a qualifying lease in respect of cladding remediation. Absolute protection.
  - **Non-cladding remediation costs — low-value carve-out (Sch 8 para 4):** properties valued at £175,000 or below (£325,000 in Greater London) on 14 February 2022 are fully exempt from non-cladding remediation service charges.
  - **Non-cladding remediation costs — graduated cap (Sch 8 para 6):** properties above the carve-out threshold attract permitted maxima of £10,000 (outside Greater London) / £15,000 (Greater London) at the base band, scaling to £50,000 / £100,000 for properties above £1m / £2m. Spread over 10 years. The cap is **per leaseholder-per-lease**, not per dwelling.
  - **Amendments by the Leasehold and Freehold Reform Act 2024 (c. 22) commenced via SI 2024/1018 with effect from 31 October 2024.** Sessions should verify any specific Sch 8 reference against the post-LFRA 2024 text.
- **Building Safety Levy.** Separate from BSA 2022 leaseholder protections. The Building Safety Levy is a developer levy on new residential developments to fund historic remediation; legislative vehicle is the Building Safety Levy (England) Regulations 2025 (commencement separate from BSA 2022 main provisions). Wave 7 Bucket A A10 should NOT conflate the leaseholder-protection regime (Sch 8) with the developer-funded levy.

### 26.3 MEES regime — current state + EPC C 2030 IS NOT ENACTED (critical do-not-write)

- **Current legislative state (verified 2026-05-24):** The Energy Efficiency (Private Rented Property) (England and Wales) Regulations 2015 (**SI 2015/962**) prohibit a landlord from letting a "sub-standard" domestic PR property (i.e. EPC F or G) without an exemption registered on the PRS Exemptions Register. This **EPC E floor has applied to new tenancies since 1 April 2018 and to all continuing lets since 1 April 2020** (domestic), and continuing non-domestic lets from 1 April 2023 (reg.27 covers the non-domestic chain). The **landlord cost cap is £3,500 (including VAT)** above which an exemption can be registered (reg.25(2) domestic / equivalent non-domestic provisions). Source: gov.uk MEES landlord guidance + SI 2015/962 verified 2026-05-24.
- **EPC C 2030 trajectory — NOT enacted (critical drift catch at Wave 7 HP-lock).** The widely-cited "EPC C by 2030 for all PRS / 2028 for new tenancies / £10,000 cap" framing is **government policy aspiration only**, not enacted legislation. Verified at https://www.gov.uk/guidance/domestic-private-rented-property-minimum-energy-efficiency-standard-landlord-guidance on 2026-05-24: the guidance states the government has "committed to look at a long-term trajectory to improve the energy performance standards" with the "aim for as many of them as possible to be upgraded to EPC Band C or equivalent by 2030", and is "exploring policy design options following the 2026 consultation". **No amending Statutory Instrument has been laid** to give the EPC C trajectory statutory force as of 2026-05-24. The 2020 consultation, the 2026 consultation outcome, and various ministerial statements all stop short of legislating a new minimum band.
- **Practical writing rule for sessions (Wave 7 A8 + A9):** write the EPC C 2030 trajectory as **government policy / proposed direction**, not as enacted statute. Use hedges: "government has proposed", "consultation closed 2026", "no Statutory Instrument yet laid", "landlords should plan on the assumption that an EPC C standard will be legislated for new tenancies before 2028 and for continuing tenancies before 2030, subject to commencement regulations not yet made". Do not assert "the cap rises to £10,000" or "EPC C is required from 2028" as live statute. The £3,500 cap and EPC E floor are the **enacted current state** sessions can assert.
- **Grant schemes (Wave 7 A9).** ECO4 (Energy Company Obligation 4, Apr 2022 - Mar 2026 — successor scheme TBC), Great British Insulation Scheme (GBIS, formerly ECO+, running alongside ECO4), Boiler Upgrade Scheme (BUS — £7,500 grant for ASHP / GSHP / biomass replacements), and Home Upgrade Grant 2 (HUG2 — off-gas-grid homes, runs to March 2025 — verify replacement scheme status at write time). Eligibility is means-tested or property-tied (D/E/F/G band, off-gas-grid). Most schemes flow to owner-occupier + low-income households; landlord access is **partial** (ECO4 LA Flex route + GBIS general-eligibility route open to private landlords in some council areas).

### 26.4 Decent Homes Standard application to PRS

- **Statutory hook:** RRA 2025 Part 3 (ss.100-101). Extends the Decent Homes Standard (originally a social-housing standard since 2006) to the private rented sector.
- **Substantive standard pending SI.** Per §20.12, **SI 2025/1354 brought s.100 + parts of Schedule 4 into force on 27 December 2025** (preliminary / enforcement-authority designations). The **substantive Decent Homes Standard for PRS** has not yet been appointed by a further commencement order as of 2026-05-24. Sessions writing on the DHS-for-PRS must frame as **"preliminary provisions in force; the operative standard awaits a further Statutory Instrument"**.
- **Four-criterion DHS framework** (the policy expectation, subject to regulations to be made):
  1. Meets the statutory minimum standard for housing — i.e. free of HHSRS Category 1 hazards (Housing Health and Safety Rating System under Housing Act 2004 Pt 1).
  2. In a reasonable state of repair (no Category 1 disrepair).
  3. Has reasonably modern facilities and services.
  4. Provides a reasonable degree of thermal comfort.
- **Enforcement route.** Local housing authority improvement notices + civil penalties; **Rent Repayment Orders (RROs) — see §20.10** — extended to DHS breaches under RRA 2025 reform of HPA 2016 ss.40-44.
- **Practical writing rule for sessions (Wave 7 A7).** Treat the four-criterion framework as the publicly-stated policy structure but DO NOT assert the standard is in force with specific compliance dates; only the preliminary provisions are in force. The substantive standard's commencement date will be set by a future SI.

### 26.5 Landlord Redress Scheme — RRA 2025 Part 2 Chapter 2 (ss.64-74)

- **Statutory hook:** RRA 2025 Part 2 Chapter 2, ss.64-74. **Partially in force from 1 May 2026** per SI 2026/421 reg.3 (specifically s.74 only; the broader chapter awaits further commencement orders).
- **Plural-scheme regime, not single ombudsman (drift watch).** s.64 empowers the Secretary of State by regulations to **approve one or more redress schemes** that residential landlords must be members of. Government policy intention is a single statutory ombudsman; the Act itself permits multiple approved schemes. Sessions must hedge: "approved redress scheme regime" not "the statutory ombudsman". See §26.1 for the §20.5 in-place text nuance flagged for inter-wave correction.
- **Scheme criteria (s.65).** Approved schemes must provide for:
  - independent investigation and determination by an independent person
  - determinations requiring apology / explanation / payment of compensation / other actions specified in the scheme rules
  - rules on time limits, evidence, enforcement of determinations
  - **NO MONETARY CAP on compensation on the face of the Act**; the widely-cited £25,000 figure is government policy commentary, not enacted statute (per §20.5 / F-13). Sessions must not assert "compensation up to £25,000" as if it were on the face of the Act.
- **Penalties for non-membership (s.66).** Local housing authority may impose financial penalty up to **£7,000 for breach** of the regulations or **up to £40,000 for offences** (continuing breach > 28 days after notice). Multiple penalties bar against double jeopardy within the 28-day window.
- **Marketing prohibition (s.66 / regulations to be made).** Regulations may prohibit a landlord from marketing a dwelling unless they are scheme members; breach is enforced via the s.66 penalty regime.
- **Pre-existing letting-agent redress regime — DO NOT CONFLATE.** Letting and managing agents have been required to join an approved redress scheme since **1 October 2014 under SI 2014/2359** (The Redress Schemes for Lettings Agency Work and Property Management Work (Requirement to Belong to a Scheme etc) (England) Order 2014). Three approved schemes operate: The Property Ombudsman (TPO), Property Redress Scheme (PRS), and Property Redress (formerly Ombudsman Services: Property — exited 2018). The **agent regime under SI 2014/2359 is separate from the new RRA 2025 landlord scheme**; sessions writing on Wave 7 A6 must distinguish (a) agent membership (pre-existing, since 2014) from (b) landlord membership (new under RRA 2025, awaiting full commencement).

### 26.6 Private Rented Sector Database — RRA 2025 Part 2 Chapter 3 (ss.75-96)

- **Statutory hook:** RRA 2025 Part 2 Chapter 3, ss.75-96. **NO commencement order as of 2026-05-24.** Verified at https://www.legislation.gov.uk/ukpga/2025/26 (Changes to Legislation panel) on 2026-05-24. SI 2025/1354 + SI 2026/421 do NOT bring Pt.2 Ch.3 into force; only SI 2026/6 (Wales-only ss.43-49) is appointed beyond those two principal commencement SIs.
- **Database architecture (the policy structure, subject to commencement + regulations).** s.75 requires the database operator to establish entries for (a) landlords, (b) dwellings, (c) persons subject to banning orders or convictions for relevant offences. s.78 mandates active-entry maintenance. s.82 makes marketing without an active entry an offence (without invalidating tenancy contracts). s.92 criminalises knowingly false information / continued breach after penalty notice.
- **Registration mechanics (s.77 — regulations may prescribe).** Fee structure, compliance timelines, required information fields, evidence requirements — all to be set by regulations not yet made.
- **Practical writing rule for sessions (Wave 7 — across A-cluster).** Frame the PRS Database as **"scheduled by commencement order; expected before April 2027 per government policy statements; no Statutory Instrument yet appointing the operative date"**. Do not assert "landlords must register from 1 May 2026" or "the database is live"; both are false as of 2026-05-24.

### 26.7 Property Tax Partners angle (the tax-side hooks across §26)

- **Building safety remediation costs (BSA 2022 + Sch 8).** For a landlord whose building has Sch 8 leaseholder protections, the residual cost a landlord bears (above the cap, or where the landlord IS the freeholder paying remediation directly) is a **capital improvement** (CGT base-cost addition under TCGA 1992 s.38(1)(b)) where it improves the building above its prior state, OR a **revenue repair** where it merely restores prior condition. Cladding replacement that meets building regs would typically be capital (improvement); like-for-like fire-alarm replacement on a 1:1 swap basis can be revenue. The CAA 2001 s.35 dwelling-house restriction still applies to plant within individual flats; HMO communal common-parts P&M can be claimable (per §25.7 + Wave 6 C7).
- **MEES energy improvement spend.** Insulation, double-glazing, heating upgrades that bring a sub-standard property to EPC E are typically **capital improvements** (CGT base-cost addition) where they materially improve the building's specification. A like-for-like boiler replacement is repair (revenue). Government grant receipts under ECO4 / GBIS / BUS reduce the CGT base cost (HMRC general principle: grants matched against the expenditure they fund).
- **Landlord redress scheme + PRS Database fees.** Annual scheme membership + database registration are deductible as professional / regulatory expenses against rental income (revenue, per ITTOIA 2005 s.272 wholly-and-exclusively rule applied generously to compulsory regulatory costs).
- **Decent Homes Standard compliance spend.** Same capital/revenue split as MEES: repairs are revenue; improvements (e.g. modernising kitchens / bathrooms beyond like-for-like) are capital.
- **Section 24 interaction.** None of the §26 regulatory costs are mortgage-interest finance costs; the s.24 restriction does not apply. They are operating costs of the rental business (revenue) or capital additions to base cost (CGT).
- **CIR (Corporate Interest Restriction) interaction.** None — BSA / MEES / DHS compliance costs are not interest expense.

### 26.8 Do not write (§26 cluster)

- "The Renters' Rights Act 2026" (false; the Act is "Renters' Rights Act 2025 (2025 c. 26)" — the 2026 reference is to commencement, not enactment; the existing slug `renters-rights-act-2026-tax-implications-landlords` is a program legacy artefact and the body copy must use "2025").
- "EPC C 2030 / 2028 is now law" (false; aspirational policy only as of 2026-05-24; no Statutory Instrument laid; current floor remains EPC E under SI 2015/962).
- "The landlord cap is now £10,000" (false; cap remains £3,500 including VAT under SI 2015/962 reg.25(2); £10,000 is a consulted-on figure not yet legislated).
- "Landlords must register on the PRS Database from 1 May 2026" (false; RRA 2025 Pt.2 Ch.3 ss.75-96 not yet commenced; no SI appointing operative date as of 2026-05-24).
- "The Decent Homes Standard for PRS is in force" (false; only preliminary provisions in force from 27 December 2025; substantive standard awaits further SI).
- "There is a single statutory ombudsman for landlords" (false on the face of the Act; RRA 2025 s.64 permits a plural approved-scheme regime — government intention is single but the Act does not require single; use "approved redress scheme regime" or hedged "statutory ombudsman scheme").
- "Compensation under the new landlord ombudsman is capped at £25,000" (false on the face of the Act; the £25,000 figure is policy commentary; the Act sets no statutory cap; see §20.5 / F-13).
- "Higher-Risk Buildings are 11m+ / 5 storeys" (false for BSA 2022 s.65 occupation-stage definition; the s.65 threshold is **18m OR 7 storeys** plus 2 residential units. The 11m / 5-storey threshold is a separate cohort relevant to Sch 8 leaseholder protections, not to the HRB occupation-stage regime).
- "Sch 8 BSA 2022 leaseholder protections apply to all leases on relevant buildings" (false; protection is limited to **qualifying leases** as defined in s.119 — long lease, granted pre-14-Feb-2022, lessee at 14 Feb 2022, only-or-principal home OR ≤3 UK residential properties).
- "BSA 2022 SI 2025/1368 commences provisions in England" (false; SI 2025/1368 is the **Wales** commencement order — the W. 225 designation is the giveaway).
- "Letting agents joined the redress scheme regime under RRA 2025" (false; agents have been required since 1 October 2014 under SI 2014/2359; the RRA 2025 regime is for **landlords**, additional to and separate from the pre-existing agent regime).
- "The Building Safety Levy is part of BSA 2022 leaseholder protections" (false; the Levy is a developer-funded charge under the Building Safety Levy (England) Regulations 2025; it funds the wider remediation programme and is **not** what limits a leaseholder's service-charge exposure under Sch 8).
- "Cladding remediation is capped at £10,000 for a leaseholder" (false; under Sch 8 para 8, qualifying-lease cladding remediation is **fully protected** — no service charge at all; the £10k / £15k / £50k / £100k caps in Sch 8 para 6 are for **non-cladding** remediation only).

### 26.9 HMO + selective licensing — Housing Act 2004 Parts 2 + 3 — Wave 7 mini-lock (added 2026-05-24)

- **Statutory hooks:** Housing Act 2004 Part 2 (HMO licensing, ss.55-78) + Part 3 (selective licensing, ss.79-100). Civil penalty regime under s.249A (up to **£40,000** per offence as alternative to prosecution; uplifted from £30,000 by SI 2026/319 reg.2 in force 1 May 2026; original £30,000 cap inserted by HPA 2016 s.126). Rent Repayment Orders under ss.73-74 (extended by RRA 2025 to 2-year window per §20.10). Banning orders via HPA 2016 ss.14-23. Verified at https://www.legislation.gov.uk/ukpga/2004/34/section/249A on 2026-05-24 (post-back-patch).
- **HMO definition for licensing — s.254:** building (or self-contained flat) occupied by 3 or more persons forming 2+ households (households = single people or family units) AND sharing one or more basic amenities. Variant tests under s.254(2)-(5) include the building-type test, converted-blocks-of-flats test, and the s.55 prescribed-description test for mandatory licensing.
- **Mandatory HMO licensing — s.61 + Licensing of Houses in Multiple Occupation (Prescribed Description) (England) Order 2018 (SI 2018/221):** any HMO occupied by **5 or more persons** forming 2+ households is subject to mandatory licensing nationwide (since 1 October 2018; the 2018 Order removed the prior 3-storey-floor restriction). Mandatory licensing applies regardless of LA designation.
- **Additional HMO licensing — ss.56-60:** local authorities may designate areas requiring licensing for additional HMO categories (e.g. 3-4 person HMOs not within mandatory scope). Designations require consultation under s.58 + secretary-of-state confirmation under s.60.
- **Selective licensing — Part 3 (ss.79-100):** LAs may designate **geographic areas** requiring licensing for **all private rentals** (not just HMOs) within the designation. Used for areas with high anti-social behaviour, low housing demand, or rogue-landlord prevalence. Approval thresholds under s.80; current designations cover ~70+ LA areas across England.
- **Penalties + enforcement:**
  - **Operating an unlicensed HMO / unlicensed rental in selective area = criminal offence** under s.72 (HMO) / s.95 (selective). Summary conviction: unlimited fine.
  - **Civil penalty alternative:** up to **£40,000 per offence** under s.249A from 1 May 2026 per SI 2026/319 (HMO/selective licensing breaches; introduced by HPA 2016 at £30,000; uplifted to £40,000 in 2026).
  - **Rent Repayment Order:** tenants OR LAs can apply to FTT for RRO recovering up to **2 years' rent** (RRA 2025 extension per §20.10). Available where landlord operated unlicensed during the RRO period.
  - **Banning order:** repeat offenders may be banned from operating any rental properties for ≥12 months under HPA 2016; landlord database (when commenced under RRA 2025 §26.6) records banned persons.
- **Tax-side hooks (for PTP angle):**
  - Licensing fees: **deductible as a revenue expense** of the rental business under ITTOIA 2005 s.272 — see existing `hmo-licensing-fees-tax-deductible-uk-landlords` page.
  - Civil penalties + criminal-conviction fines: **NOT deductible** (general principle that penalties for breach of law are non-deductible per HMRC BIM38500+).
  - Banning order: ends the rental business; CGT cessation considerations apply.
- **Do not write:**
  - "All HMOs require licensing" (false; mandatory licensing applies only to HMOs with 5+ persons in 2+ households OR HMOs in LA additional-licensing areas).
  - "HMO licensing is England-only" (Scotland + Wales + NI have parallel but distinct regimes — Welsh Rent Smart Wales is the equivalent; Scottish HMO licensing under Civic Government (Scotland) Act 1982 / Housing (Scotland) Act 2006).
  - "Selective licensing is mandatory across all of England" (false; LA-designation-based; ~70+ areas have selective licensing as of 2026).
  - "Civil penalty for unlicensed letting is unlimited" (false; capped at **£40,000** per offence under s.249A from 1 May 2026 per SI 2026/319 — was £30,000 under HPA 2016; alternative criminal route has unlimited fines on summary conviction).
- **HMRC manual anchor:** BIM38500+ (deductibility of penalties); PIM2010+ (Property Income Manual).
- **Practical writing rule for sessions (Wave 7 A4):** lead with the **two-tier framework** (mandatory HMO licensing via s.61 + SI 2018/221 5-person test; LA-designated additional/selective licensing); then map the penalty stack (civil **£40k** per offence under s.249A from 1 May 2026 per SI 2026/319 — was £30k under HPA 2016; OR criminal unlimited + RRO 2-year window + banning order); then tax-side deductibility (fees yes; penalties no). Cross-reference §20.10 (RRO under RRA 2025) and §26.6 (PRS Database when commenced — includes ban-order records). **F-1 closure (2026-05-24 PM):** £30,000 → £40,000 back-patch landed at this commit; uplift via SI 2026/319 reg.2 is the post-1-May-2026 figure; do NOT write the £30,000 figure as current.

---

## 1.G SDLT group relief — FA 2003 Schedule 7 paragraphs 1-5 — Wave 7 mini-lock (added 2026-05-24)

This §1.G mini-lock sits adjacent to the §1.A-§1.F Wave 7 SDLT extensions; placement after §26 for chronological audit-trail reasons. **In future restructuring, §1.G could move to logical placement immediately after §1.F.**

- **Statutory hooks:** FA 2003 Schedule 7 paragraphs 1-5 (group relief); CTA 2010 ss.1155-1157 (75% subsidiary indirect-ownership calculation). Verified at https://www.legislation.gov.uk/ukpga/2003/14/schedule/7 on 2026-05-24.
- **The relief in plain terms.** SDLT group relief allows intra-group property transfers between members of the same 75%-controlled corporate group to be **free of SDLT** on the transfer. Used heavily in landlord-LtdCo portfolio restructuring (e.g. moving properties from an operating company to a HoldCo or vice versa, consolidating multi-SPV portfolios under a single HoldCo, separating residential from commercial holdings).
- **75% group definition — Sch 7 para 1(3):** Company A is a 75% subsidiary of Company B if Company B (directly or indirectly via CTA 2010 ss.1155-1157):
  - **(i)** owns at least 75% of A's ordinary share capital;
  - **(ii)** is beneficially entitled to at least 75% of A's distributable profits;
  - **(iii)** would be entitled to at least 75% of A's assets on winding-up.
  All three limbs must be met. "Ordinary share capital" excludes preference shares with fixed-rate dividends (CTA 2010 s.1119).
- **Anti-avoidance — Sch 7 para 2 (arrangements):** Relief is **denied** at the point of transfer where, at the effective date, there are arrangements:
  - For the transferee to leave the group;
  - For the transferor or transferee to enter another group;
  - For consideration to flow from a non-group party.
- **3-year claw-back — Sch 7 para 3:** Relief is **withdrawn** if the transferee company **leaves the group within 3 years** of the SDLT effective date. Withdrawal triggers tax at market value rates on the original transaction, payable by the transferee. **Major operational risk** in landlord restructuring: subsequent sale of an SPV with portfolio properties triggers claw-back of SDLT relief obtained at the intra-group transfer.
- **Pre-Wave-7 escape from claw-back:** Para 3(2) carve-outs include some statutory restructurings (insolvency, court order); the standard rule bites otherwise.
- **Recovery from connected parties — Sch 7 para 5:** Where the SDLT remains unpaid 6 months after assessment, HMRC may recover from the **vendor company**, **parent company** of the group, OR **controlling director** of the group. Wide recovery powers; sessions writing must surface this as the silent risk in restructuring.
- **Group relief vs incorporation relief vs Sch 15 SLP partnership relief — the three SDLT mitigation routes:**
  - **Group relief (Sch 7):** intra-group transfers in established 75%-controlled corporate group; no consideration test; 3-year claw-back.
  - **Incorporation relief (Sch 15 + s.162 TCGA + s.53 deferred consideration):** sole-proprietor / partnership → LtdCo transfer; tighter conditions.
  - **Partnership SLP (Sch 15 paras 10-13 per §1.A):** transfer to genuine partnership; SLP calculation.
- **Tax-side practical note (PTP angle):** group relief is the workhorse SDLT mechanism for landlord-LtdCo portfolio consolidation. Most common deal-mishandling: incorporating a Sch 7 transfer without locking the buyer (transferee SPV) into the group for 3 years — subsequent SPV sale triggers claw-back. **Standing recommendation:** any group-relief restructuring should embed a 3-year SPA covenant restricting transferee disposal, with break-fee for accelerated exit covering the claw-back exposure.
- **Do not write:**
  - "Group relief applies to any 50%+ subsidiary" (false; 75% test all three limbs).
  - "Claw-back period is 1 year" (false; 3 years from effective date per Sch 7 para 3).
  - "Group relief is automatic" (false; relief must be claimed in the SDLT return; non-claim within 12 months from effective date can be remedied via overpayment claim under FA 2003 Sch 11A within 4 years — but late claim risks enquiry).
  - "Pre-FA-2003 stamp duty group relief covered same scope" (false; pre-2003 SDLT predecessor regime; sessions writing on historic transactions need different reference frame).
- **HMRC manual anchor:** SDLTM23000+ (group relief).
- **Practical writing rule for sessions (Wave 7 C6 new):** lead with the **3-year claw-back** as the operational risk; then 75% test mechanics; then the para 2 arrangements-defeating-relief trap; then recovery from connected parties as the silent risk. Distinguish from the existing site page `sdlt-group-relief-for-corporate-landlord-portfolios` by going DEEP on claw-back mechanics + connected-party recovery + standard SPA-covenant defensive pack — the existing page is broader/higher-level.

---

## 22.21 SIPP/SSAS taxable property regime — FA 2004 Schedule 29A — Wave 7 mini-lock (added 2026-05-24)

This §22.21 mini-lock sits in the §22 cluster as it extends the IHT / estate-planning + pension intersection territory. **Scope-justification:** SIPP/SSAS commercial property purchase is an estate-planning + pension-funded property acquisition route; it sits naturally alongside §22.16-§22.18 (TRS + IPDI + EOT).

- **Statutory hooks:** FA 2004 Schedule 29A (taxable property held by investment-regulated pension schemes); inserted by FA 2006 effective 6 April 2006; amended multiple times to 2013+. Verified at https://www.legislation.gov.uk/ukpga/2004/12/schedule/29A on 2026-05-24.
- **The regime in plain terms.** Registered pension schemes (SIPP / SSAS) may hold property as an investment, BUT if the property is **"taxable property"** the scheme is subject to **unauthorised payment charges** under FA 2004 s.208 + 209 + Sch 29A. Taxable property charges effectively make residential property unviable for pension-fund holding; commercial property is excluded from taxable property (so SIPP/SSAS purchase of business premises remains the workhorse use case).
- **Taxable property definition — Sch 29A para 6+:**
  - **(a) Residential property** — buildings suitable for dwelling use (including parts of buildings); gardens, grounds, attached land; hotel accommodation; beach huts. **Includes UK + overseas residential**. The "suitable for dwelling use" test mirrors SDLT s.116(1)(a) per §1.C Bewley — narrow exception only for substantially uninhabitable / under-development properties.
  - **(b) Tangible moveable property** — Treasury-restricted (art, classic cars, vintage wine, antiques).
- **Commercial property — EXCLUDED from taxable property (Sch 29A para 7):** business premises (offices, warehouses, retail units, factories, mixed-use where commercial element dominates), agricultural land, and forestry are NOT taxable property. SIPP/SSAS can acquire commercial property freely.
- **Investment-regulated pension scheme — Sch 29A paras 1-2:** the rules apply only to schemes where members (or connected persons) can "direct, influence or advise on the manner of investment". This captures SIPPs (Self-Invested Personal Pensions) and SSASs (Small Self-Administered Schemes) but NOT typical occupational-DB / DC schemes (where investment is at trustee discretion).
- **Unauthorised payment charge — FA 2004 s.208 (member) + s.209 (scheme administrator):** where an investment-regulated pension scheme holds taxable property, the member is treated as having received an unauthorised payment equal to the property's market value (or consideration paid). Charges:
  - **s.208 member's charge: 40% income tax** on unauthorised payment.
  - **s.208 unauthorised payment surcharge: additional 15%** if unauthorised payments in a tax year exceed 25% of the member's pension fund.
  - **s.209 scheme sanction charge: 15% of unauthorised payment** on scheme administrator (recoverable from member in practice).
  - **Combined effective rate: 55-70%** on the value of any taxable property acquired.
- **In-specie contributions of commercial property.** A common SIPP/SSAS funding route: member contributes existing commercial property to the scheme by way of in-specie contribution. CGT no-gain-no-loss treatment under TCGA 1992 s.62 + 188; income tax relief on the market-value contribution under FA 2004 s.188-189 (subject to annual + lifetime allowances). **Drift watchpoint:** lifetime allowance was abolished and replaced by lump-sum allowances under FA 2024 — sessions writing on in-specie contributions must use the FA 2024 architecture, not the pre-2024 LTA framework.
- **Member loans + connected-party transactions:** scheme cannot lend to member or connected persons (FA 2004 s.179 — unauthorised). Scheme can let property to member's business at arm's-length rent. SSAS can lend to sponsoring employer subject to the 50% asset / 5-year repayment / 1st-charge security conditions (Sch 30 + Reg 6 SIPP rules).
- **Cross-references:** §1 SDLT (purchase by pension scheme — standard SDLT applies on commercial property; ATED §2 only on residential, so commercial property within ATED scope rare); §4 (section 24 has no application — pension scheme is tax-exempt on rental income while held); §15 (IHT — pension funds outside member's IHT estate generally pre-April 2027; FA 2024 reforms bring pensions into IHT from 6 April 2027 per §15.5 / §22.14).
- **Do not write:**
  - "SIPP/SSAS can hold residential rental property without tax charge" (false; residential property triggers Sch 29A unauthorised payment charge ~55-70% effective rate; effectively prohibitive).
  - "Commercial property in SIPP/SSAS is subject to unauthorised payment charge" (false; commercial property explicitly EXCLUDED from taxable property per Sch 29A para 7).
  - "All pension schemes can hold taxable property" (false; Sch 29A bites only on INVESTMENT-REGULATED schemes — SIPPs + SSASs; not typical occupational schemes where trustees have discretion).
  - "Lifetime allowance limits in-specie contributions" (false post-FA-2024; LTA abolished + replaced by lump-sum-allowance + lump-sum-and-death-benefit-allowance framework; sessions must use the new architecture).
  - "SSAS can lend freely to sponsoring employer" (false; subject to 50% asset cap / 5-year repayment / 1st-charge security conditions; breach = unauthorised payment).
- **HMRC manual anchor:** RPSM07000+ (Registered Pension Schemes Manual on taxable property); PTM120000+ (Pensions Tax Manual investment).
- **Practical writing rule for sessions (Wave 7 C10):** lead with the **commercial-property-only rule** as the headline (most readers expect SIPP/SSAS-can-hold-property = property generally; the residential exclusion via 55-70% effective penalty is the structural killer). Then walk in-specie contribution mechanics + lease-to-own-business mechanics + the FA 2024 lump-sum-allowance architecture (replacing pre-2024 LTA). Cross-reference §15.5 (pensions in IHT from 6 April 2027) for the inheritance-tax-side picture.

---

## 27. HMRC enquiry + tax compliance mechanics — Wave 7 extension (locked, 2026-05-24)

**Scope.** §27 covers the operational tax-compliance mechanics for landlords: discovery assessment time limits (TMA 1970 s.29), closure notices (s.28A), penalties (Sch 24 FA 2007 + Sch 41 FA 2008), criminal-investigation track (CoP9 + CDF), voluntary disclosure routes (Let Property Campaign + Worldwide Disclosure Facility), and record retention (s.12B). Wave 7 Bucket B picks B1-B10 draw on this cluster.

**Verification note.** Locked 2026-05-24 against legislation.gov.uk + gov.uk HMRC manuals. Most statutory anchors are bedrock — TMA 1970 s.29 / s.28A / s.12B and Sch 24 FA 2007 / Sch 41 FA 2008 have been stable since the FA 2008-2010 reforms — but **percentage bands and territory categorisation must be re-verified at write time** per §16.42 (rate-by-reference verification). The offshore Category 2/3 uplifts and the Sch 24 mitigation floors are operationally load-bearing for Wave 7 B7 + B8.

### 27.1 Discovery assessment time limits — TMA 1970 s.29 + s.34 + s.36

- **Ordinary self-assessment time limit — TMA 1970 s.34:** an assessment to income tax or capital gains tax may be made **not later than 4 years after the end of the year of assessment to which it relates**. Verified at https://www.legislation.gov.uk/ukpga/1970/9/section/34 (cf Track 2 manager's 2026-05-24 commit `6769942` on s.43 4-year claim deadline; the parallel s.34/s.43 4-year framework applies to assessments and claims respectively).
- **Discovery preconditions — TMA 1970 s.29(1):** an officer or the Board must have "discovered" one of (a) tax that ought to have been assessed but has not, (b) an assessment that is or has become insufficient, or (c) relief given that is or has become excessive. The "discovery" requirement is a **threshold condition** — without a true discovery on the facts the s.29 power does not arise. Discovery is a low bar in practice; HMRC need only have come to a "view that there is an insufficiency".
- **Extended time limits — TMA 1970 s.36:**
  - **Ordinary 4 years** under s.34 (no behaviour element).
  - **Careless 6 years** under s.36(1) (s.29 assessment where loss of tax brought about carelessly).
  - **Deliberate 20 years** under s.36(1A) (loss of tax brought about deliberately by the taxpayer or a person acting on their behalf).
  - **Offshore matters 12 years** under s.36A (FA 2019 reform; applies where the loss of tax is attributable to offshore income / gains / assets — even without carelessness or deliberate behaviour). s.36A is **the 2019 reform** giving HMRC a 12-year window for innocent-error offshore cases; sessions writing on s.36A must NOT collapse it into the careless 6-year or deliberate 20-year limbs. Verified at https://www.legislation.gov.uk/ukpga/1970/9/section/36 (current as amended).
- **s.29(4) + (5) — the two conditions that unlock the s.29 assessment power after the enquiry window has closed:**
  - **First condition (s.29(4)):** the situation under s.29(1) was brought about carelessly or deliberately by the taxpayer or a person acting on their behalf.
  - **Second condition (s.29(5)):** the officer could not have been reasonably expected, on the basis of information then available to them, to be aware of the under-assessment before the enquiry-window closing point.
  - The "competent officer test" under s.29(5) (Veltema, Sanderson, HMRC v Tooth) is the working judicial gloss; sessions writing on s.29(5) appeals should cite at least one of these authorities and refer to HMRC v Tooth [2021] UKSC 17 as the current Supreme Court authority on the deliberate-behaviour test.
- **HMRC manual anchor:** EM3270+ (Enquiry Manual on discovery); CH51000+ (Compliance Handbook on s.29 + s.36).
- **Practical writing rule for sessions (Wave 7 B1, B5, B6, B7):** distinguish (a) ordinary 4-year limit (no behaviour), (b) careless 6-year (Sch 24 careless behaviour), (c) deliberate 20-year (Sch 24 deliberate / deliberate-concealed), (d) offshore innocent-error 12-year under s.36A FA 2019. Do not collapse (d) into (b) — they are independent.

### 27.2 Penalties for inaccuracy — Schedule 24 FA 2007

- **Title and scope:** Schedule 24 FA 2007 — "Penalties for errors". Applies to inaccuracies in returns and documents leading to under-assessment, over-claim of relief, or false statements of loss.
- **Behaviour categories (Sch 24 para 3):**
  - **Careless** — failure to take reasonable care.
  - **Deliberate but not concealed** — deliberate inaccuracy without arrangements to conceal.
  - **Deliberate and concealed** — deliberate inaccuracy with arrangements to conceal (false invoices, bank-account routing, document destruction).
- **Standard maximum penalties (Sch 24 para 4) and disclosure mitigation floors (paras 9-10):**
  | Behaviour | Max | Unprompted disclosure floor | Prompted disclosure floor |
  |---|---|---|---|
  | Careless | 30% | 0% (within 12 months) | 15% |
  | Deliberate not concealed | 70% | 20% | 35% |
  | Deliberate and concealed | 100% | 30% | 50% |
- **Offshore uplift (Sch 24 para 4A inserted by FA 2010 + FA 2015 reforms):**
  - **Category 1** (domestic + offshore in territories with full information exchange): bands as above (max 30% / 70% / 100%).
  - **Category 2** (offshore in partial-information-exchange territories): bands multiplied 1.5x (max 45% / 105% / 150%).
  - **Category 3** (offshore in no-information-exchange territories): bands multiplied 2x (max 60% / 140% / 200%).
- **Asset Move penalty (Sch 21 FA 2015):** further uplift applies where assets are moved from a Category 2/3 territory to defeat HMRC. Sessions writing on offshore deliberate scenarios should distinguish (a) the offshore uplift under Sch 24 / Sch 41 from (b) the additional Sch 21 FA 2015 asset-move penalty.
- **Suspension (Sch 24 para 14):** careless penalties may be suspended for up to 2 years subject to suspension conditions; deliberate penalties cannot be suspended. Suspension is HMRC discretion (Anderson) and refusal can be appealed to FTT.
- **HMRC manual anchor:** CH80000+ (Compliance Handbook on penalties); CC/FS7a (taxpayer-facing factsheet).
- **Practical writing rule for sessions (Wave 7 B8):** present the band-mitigation matrix as a table; distinguish unprompted vs prompted disclosure floors; flag the offshore uplift mechanism but note Category-2/3 territory classification is dynamic (published list in HMRC manuals; verify per-write). For Wave 7 B7 (WDF), the offshore-Category uplift is the operationally critical mechanic.

### 27.3 Failure-to-notify penalties — Schedule 41 FA 2008

- **Title and scope:** Schedule 41 FA 2008 — penalties for failure to notify chargeability + certain VAT and excise wrongdoing. Bites where a landlord fails to notify HMRC of liability to income tax / CGT on rental income under TMA 1970 s.7 (the 6-month-after-end-of-year notification obligation).
- **Behaviour categories (Sch 41 para 5):** non-deliberate / deliberate (not concealed) / deliberate and concealed.
- **Standard maxima + offshore uplift (all verified at https://www.legislation.gov.uk/ukpga/2008/9/schedule/41 on 2026-05-24):**
  | Behaviour | Cat 1 max | Cat 2 max | Cat 3 max |
  |---|---|---|---|
  | Non-deliberate ("other") | 30% | 45% | 60% |
  | Deliberate not concealed | 70% | 105% | 140% |
  | Deliberate and concealed | 100% | 150% | 200% |
- **Disclosure mitigation (Sch 41 para 13):** unprompted disclosure floor 0% (non-deliberate within 12 months) / 20% / 30%; prompted 10% / 35% / 50%.
- **Failure-to-notify vs inaccuracy — both can apply on same facts.** If a landlord has never registered for self-assessment for rental income AND has filed inaccurate returns for non-rental income, both Sch 41 (failure-to-notify) and Sch 24 (inaccuracy) penalties can apply in respect of different aspects. They do not double-count on the same tax loss.
- **Reasonable excuse defence (Sch 41 para 20):** an exclusion from penalty applies where the taxpayer had a reasonable excuse for the failure. The case law (Perrin v HMRC [2018] UKUT 156) provides the working test: a four-stage Test framing what counts as reasonable excuse. Sessions writing on Wave 7 B9 (reasonable excuse case law for landlord penalties) should cite Perrin as the controlling Upper Tribunal authority.
- **HMRC manual anchor:** CH71000+ (Compliance Handbook on failure-to-notify); CC/FS11 (factsheet).
- **Practical writing rule for sessions (Wave 7 B6 + B10):** the Let Property Campaign route operates within the Sch 41 framework — LPC is the **mitigation-route**, not a separate penalty regime. Disclosure via LPC unlocks the unprompted-disclosure floors (potentially down to 0% for non-deliberate within 12 months).

### 27.4 Closure notices + FTT appeal route — TMA 1970 s.28A + TCEA 2007 Sch 4

- **Statutory hook:** TMA 1970 s.28A. An enquiry under s.9A is completed by HMRC giving a closure notice. The closure notice must either state that no amendment is required OR make the amendments the officer considers necessary. Verified at https://www.legislation.gov.uk/ukpga/1970/9/section/28A on 2026-05-24.
- **Partial vs final closure notices.** s.28A allows partial closure notices on specific matters (issued by HMRC where ready to close on one limb while continuing on another). Each partial closure notice is independently appealable. Final closure ends the enquiry.
- **Tribunal direction to issue closure notice — s.28A(4):** the taxpayer may apply to the FTT for a direction requiring HMRC to issue a closure notice within a specified period. The tribunal must grant the direction unless HMRC have reasonable grounds for not issuing it (s.28A(6)). The application is the working tool for taxpayers stuck in long-running open enquiries; the threshold is "no reasonable grounds for delay".
- **FTT appeal route — TCEA 2007 + TPRT 2009 (SI 2009/273):** appeals against amendments in closure notices, penalty assessments, and information notices go to the First-tier Tribunal (Tax Chamber) under TCEA 2007 ss.3-5 + the Tribunal Procedure (First-tier Tribunal) (Tax Chamber) Rules 2009 (SI 2009/273). Standard category cases; complex cases attract costs-shifting. Upper Tribunal (Tax and Chancery) handles appeals on points of law (TCEA 2007 s.11). Onward to Court of Appeal + Supreme Court on points of law.
- **30-day notice of appeal window — TMA 1970 s.31A:** appeals against a closure notice or amendment must be made within 30 days. Late appeals can be accepted on reasonable-excuse grounds (Martland v HMRC [2018] UKUT 178).
- **HMRC alternative dispute resolution (ADR).** Available alongside FTT route; ADR engagement does not pause appeal time limits. Sessions writing on B4 (Tribunal appeal process) should mention ADR as an option, not a replacement for FTT.
- **HMRC manual anchor:** EM1500+ (Enquiry Manual on closure); ARTG2000+ (Appeals, Reviews and Tribunals Guidance).
- **Practical writing rule for sessions (Wave 7 B2, B4):** present the closure-notice-and-appeal pathway as a sequence: enquiry opens → information exchange → closure notice (partial or final) → 30-day appeal window → tribunal listing. Note that s.28A(4) is the taxpayer's lever to break HMRC stalling.

### 27.5 Contractual Disclosure Facility — Code of Practice 9 (CoP9)

- **What CoP9 is.** HMRC Code of Practice 9 (current version: CoP9 (2014), republished editorially since; sessions should verify current edition via gov.uk at write time) is the published code under which HMRC offers a **Contractual Disclosure Facility (CDF)** to taxpayers HMRC suspect of tax fraud. Where HMRC opens a civil-fraud investigation, CoP9 is the route to **immunity from criminal prosecution** for the matters disclosed.
- **The CDF offer + 60-day window.** HMRC issues a CoP9 letter offering CDF. The taxpayer has **60 days to accept** by signing the CDF acceptance and providing an outline disclosure. Acceptance crystallises the immunity (for matters within the disclosure). Rejection does not preclude criminal investigation; HMRC reserves discretion.
- **Outline Disclosure + Disclosure Report.** Acceptance triggers an Outline Disclosure (within 60 days of acceptance) summarising the tax fraud. Followed by a full **Disclosure Report** within a longer window (typically 6-12 months, by agreement) detailing the full fraud and tax loss calculation. Reports are reviewed by HMRC's Fraud Investigation Service.
- **Scope of immunity.** Immunity is **only for matters disclosed**. False statements in CDF documents revoke immunity and expose the taxpayer to criminal investigation including for the disclosed conduct. Non-disclosed matters are not covered.
- **CoP9 vs WDF vs LPC — distinct routes:**
  - **CoP9 / CDF:** HMRC-initiated civil-fraud investigation; immunity offered; **for cases involving deliberate behaviour with criminal-prosecution exposure**.
  - **WDF (Worldwide Disclosure Facility):** **Taxpayer-initiated** offshore voluntary disclosure; no criminal immunity (HMRC retains discretion); **for offshore matters typically post-FtC 2018 deadline**.
  - **LPC (Let Property Campaign):** **Taxpayer-initiated** voluntary disclosure of UK rental income; **for residential landlords with undisclosed rental income** (campaign open-ended since 2013); operates within Sch 41 framework with unprompted-disclosure mitigation.
- **Important. CoP9 is NOT a voluntary-disclosure route.** It is HMRC-initiated. Taxpayer-initiated disclosure of fraud (where the taxpayer wants criminal-immunity protection) is via **voluntary CDF request** — also offered under CoP9 mechanics. The distinction matters: HMRC-issued CoP9 = HMRC has chosen to offer CDF; taxpayer-requested CDF = taxpayer is asking HMRC to put them under CoP9.
- **HMRC manual anchor:** EM6000+ (Enquiry Manual on civil investigation of fraud); FIS Operational Manual (internal but partially published).
- **Practical writing rule for sessions (Wave 7 B3):** present CoP9 as HMRC's fraud-investigation track; distinguish HMRC-initiated CoP9 (offered after HMRC starts investigation) from taxpayer-initiated voluntary CDF request. Emphasise the immunity scope and the deliberate-conduct trigger. Do NOT frame CoP9 as a landlord-friendly disclosure route — it is a serious step taken only with specialist representation.

### 27.6 Voluntary disclosure routes — LPC + WDF + general "voluntary disclosure"

- **Let Property Campaign (LPC).** HMRC campaign open since 9 September 2013, no announced end date. Eligibility: **residential landlords** (UK + non-UK resident) with undisclosed rental income. Excludes: companies (LtdCo route differs), trusts (TRS route under §22.16), non-residential property (commercial LPC equivalent does not exist — use general voluntary disclosure). Three-step process: **(i) notify** intent via gov.uk landlord disclosure form (no penalty consequence at this stage); **(ii) disclose** full liability within **90 days** of HMRC's acknowledgment, calculating tax + interest + penalty; **(iii) pay** the full liability on disclosure. Penalty band achieved: typically careless 0% (unprompted within 12 months) to 15% (prompted), occasionally up to 30%; deliberate cases incur higher penalties but **LPC is not appropriate where HMRC has criminal-prosecution interest** — switch to CoP9 / CDF.
- **Worldwide Disclosure Facility (WDF).** HMRC facility opened 5 September 2016, ongoing. Eligibility: any person with undisclosed UK tax liability connected to offshore income, gains, or assets. **90-day disclosure timeline** from notification (extendable to 180 days for complex cases). Penalty banding follows Sch 24 / Sch 41 with offshore Category 2/3 uplifts; no criminal-prosecution immunity; HMRC retains discretion to prosecute.
- **Failure-to-Correct (FtC) regime — FA 2017 Sch 18.** Standalone offshore-correction obligation that required taxpayers with undeclared offshore tax matters to make disclosure **by 30 September 2018**. Post-deadline failures attract a minimum **200% penalty** (under Sch 18 para 4 FA 2017), reducible to **100% on full unprompted disclosure** + Sch 18 para 7 asset-based penalty + naming-and-shaming. Sessions writing on offshore landlord cases (Wave 7 B7) MUST cite the FtC regime; post-2018 disclosures via WDF do not avoid FtC penalty (the WDF route operates within the FtC framework where applicable).
- **General voluntary disclosure.** For UK-only non-rental matters not covered by LPC: the Digital Disclosure Service (DDS) on gov.uk. Same general principles: notification + 90-day disclosure + payment; mitigation via unprompted-disclosure floors.
- **HMRC manual anchor:** CH150000+ (Compliance Handbook on disclosure mitigation); Let Property Campaign published guidance at gov.uk/guidance/let-property-campaign.
- **Practical writing rule for sessions (Wave 7 B6, B7, B10):** the LPC + WDF + DDS + CoP9 architecture is a decision-tree, not parallel options. Decision criteria: (a) what is the income / asset class? (rental → LPC; offshore → WDF + FtC; other UK → DDS; serious-fraud → CoP9 / CDF). (b) Has HMRC opened an enquiry? (yes-with-criminal-interest → CoP9; yes-civil → continue but flag for disclosure-route within enquiry). (c) Is offshore involved? (yes → WDF + FtC overlay).

### 27.7 Record retention — TMA 1970 s.12B + adjacent obligations

- **Statutory hook:** TMA 1970 s.12B. Record-keeping obligation for self-assessment + companies (CTA 2009 s.386 + CA 2006 s.388 for companies). Verified at https://www.legislation.gov.uk/ukpga/1970/9/section/12B on 2026-05-24.
- **Retention periods:**
  - **Business records (sole-trader rental + LtdCo rental):** **5 years after 31 January following the tax year** (so a 2026/27 record must be kept until 31 January 2033). For accounting periods of companies, **6 years from end of period**.
  - **Non-business records (e.g. private investor with rental income? No — rental income is a business for s.12B purposes per Salisbury House Estate principle):** generally 22 months after end of tax year, but **for landlords always treat as business** (per HMRC PIM2010+).
  - **Where an enquiry is open:** retention extends until enquiry closes (with reasonable post-closure window for appeal records).
- **Records covered:** all amounts received and paid in the course of the rental business; supporting invoices, receipts, contracts, mortgage statements, repair invoices, tenancy agreements, deposit-protection records, MTD ITSA digital records (interaction with §19.16 — digital-records evidence discipline). Records may be preserved digitally.
- **Penalty (s.12B(5)):** **up to £3,000 per year of failure**. In practice rarely the operative penalty (Sch 24 / Sch 41 dominate); s.12B penalty is the floor for record-keeping-only failures with no consequential tax under-assessment.
- **CA 2006 s.388 (companies):** statutory accounting-record obligation independent of TMA 1970 — relevant where landlord operates via LtdCo. **6-year retention floor for private companies; 6-year minimum from end of accounting period.** Companies House offences attach separately for failure to keep adequate accounting records.
- **MTD ITSA interaction (§19.16).** MTD ITSA digital-records evidence discipline runs alongside s.12B. The digital-link requirement does not extend the retention period; it constrains the form (digital, not paper-only) for landlords within MTD scope.
- **HMRC manual anchor:** SAM50000+ (Self Assessment Manual on record-keeping); PIM2000+ (Property Income Manual).
- **Practical writing rule for sessions (Wave 7 B10):** the 5-years-from-31-January rule (income tax) and 6-years-from-period-end rule (corporation tax) are the operational floors. Sessions must not collapse them ("6 years" alone is over-stated for personal landlords; "5 years" alone is under-stated for LtdCo landlords).

### 27.8 Property Tax Partners angle (the firm-positioning hooks across §27)

- **Enquiry response engagement.** The firm's positioning on enquiry response is (a) timing-discipline (30-day appeal windows are non-negotiable; engage specialist within first 7 days), (b) closure-notice strategy (s.28A(4) tribunal direction where HMRC stalls beyond 9-12 months), (c) penalty mitigation discipline (push for unprompted-disclosure floors where applicable).
- **CoP9 / CDF representation.** Specialist territory — the firm partners with specialist tax investigations counsel rather than handling in-house; landlord-clients with deliberate-behaviour exposure are referred for CoP9 representation.
- **Voluntary disclosure routes — LPC / WDF / FtC.** Working route for landlord-clients with historic undisclosed rental income. LPC is the default; WDF + FtC overlay for offshore matters. Engagement timing: client realisation → 7-day in-house assessment → notify within 14 days → 90-day disclosure window → payment.
- **Record retention compliance.** The firm's standing recommendation: **keep records for 7 years** (one year above s.12B floor) as risk-buffer for late-discovered errors. Sessions writing on Wave 7 B10 should anchor on the **5-year statutory floor** but recommend the **7-year practical floor** consistent with prior pages (per §19.16 7-year recommendation).
- **Cross-references in this house position doc:** §19 (MTD ITSA penalty regime — Sch 56 / 55 sit alongside §27.2 / §27.3 for MTD-specific defaults); §22.16 (TRS penalty regime under MLR 2017 — see §22.16 lock); §1 (SDLT enquiry windows are 9-12 months not 4 years; SDLT has its own time-limit regime under FA 2003 Sch 10 paras 28-31).

### 27.9 Do not write (§27 cluster)

- "HMRC has 6 years to assess all under-declared rental income" (false in general; ordinary limit is **4 years** under s.34; 6 years applies only for careless behaviour under s.36(1); 20 years for deliberate; 12 years for offshore innocent-error under s.36A FA 2019).
- "The 12-year offshore limit applies only to careless cases" (false; s.36A bites on **innocent-error offshore matters** — it is the **no-behaviour** offshore extension; careless offshore is 6 years under s.36(1) read with no specific offshore uplift to that bracket).
- "Sch 24 careless penalty is 30% flat" (false; standard MAX 30%, with mitigation to 0% unprompted within 12 months or 15% prompted; sessions writing penalty calculation must use the matrix not a flat figure).
- "Offshore deliberate-concealed Sch 24 penalty is capped at 100%" (false; Category 3 offshore uplift takes the max to 200% under Sch 24 para 4A read with the offshore-categories Order).
- "CoP9 is a landlord-friendly voluntary-disclosure route" (false; CoP9 is HMRC's civil-fraud-investigation track offering criminal-prosecution immunity; not the appropriate route for ordinary undisclosed rental income).
- "WDF gives criminal-prosecution immunity" (false; only CoP9 / CDF gives immunity; WDF disclosures remain liable to HMRC prosecution discretion).
- "Failure-to-Correct (FtC) deadline was extended past 30 September 2018" (false; the FtC deadline was 30 September 2018 and was not extended; post-deadline disclosure attracts the 200%/100% FtC penalty framework under FA 2017 Sch 18).
- "Closure notices are issued at HMRC's discretion with no taxpayer remedy" (false; TMA 1970 s.28A(4) gives the taxpayer the right to apply to the FTT for a direction; tribunal must grant unless HMRC have reasonable grounds for delay per s.28A(6)).
- "Closure-notice appeals can be made within 60 days" (false; the appeal window is **30 days** under TMA 1970 s.31A; late appeals require reasonable-excuse application under Martland framework).
- "Reasonable excuse is determined by HMRC officer discretion" (false; reasonable excuse is a statutory defence under Sch 41 para 20 + Sch 24 para 14; appealable to FTT; Perrin v HMRC [2018] UKUT 156 is the controlling Upper Tribunal four-stage test).
- "Records must be kept for 6 years (income tax)" (false; **5 years after 31 January following the tax year** for income tax; 6 years applies to corporation tax / CA 2006 s.388; sessions must distinguish).
- "Records must be kept for 7 years (statutory floor)" (false; **statutory floor is 5 years (income tax) or 6 years (corporation tax / CA 2006); 7 years is the firm's practical recommendation, not the statutory minimum**).
- "Failure to keep records carries an unlimited penalty" (false; s.12B(5) caps at £3,000 per year of failure; bigger penalty exposures arise via Sch 24 / Sch 41 on the consequential tax loss, not via s.12B itself).
- "LPC is open to commercial-property landlords" (false; LPC is for **residential rental income** only; commercial / mixed-use disclosure uses the general voluntary-disclosure route via DDS).
- "LPC notification triggers immediate penalty exposure" (false; notification is a **no-penalty-consequence** step; penalty exposure crystallises on disclosure + payment within 90 days of acknowledgment).

---
