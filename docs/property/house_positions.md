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
- **From 2027/28 (Finance Act 2026, Royal Assent 18 March 2026):** the finance-cost tax reducer is given at the new **property basic rate of 22%**, NOT frozen at 20% (FA 2026 Sch 1 amends ITTOIA 2005 ss.274AA/274C and ITA 2007 s.399B). The three-part cap above is computed at 22% for 2027/28 onwards; 20% applies for 2026/27 and earlier. Because the reducer rate tracks the basic property income rate, a basic-rate landlord sees NO new wedge in 2027/28; a higher/additional-rate landlord's relief rises from 20% to 22% but still sits well below their 42%/47% rate (see §7).

**Interaction with the £100k personal allowance taper:** the credit doesn't undo the taper. Rental profit is added to total income BEFORE the credit; £1 of personal allowance is lost for every £2 above £100,000, fully eliminated at £125,140. This is the "60% effective marginal rate" trap.

**Do not write:** "Mortgage interest is deductible 100%" (only for companies). "S24 is repealed" (in force). "S24 doesn't apply to higher-rate taxpayers" (it does — that's the point). "The reducer/credit stays at 20% in 2027/28" (it rises to the 22% property basic rate). "A new basic-rate wedge opens in 2027/28" (it does not — the reducer tracks the 22% rate).

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

**Locked framing:** Separate property income tax rates were **announced at the Autumn Budget 2025 (26 November 2025)** and **enacted by Finance Act 2026 (Royal Assent 18 March 2026)**, ss.6-7, taking effect from **6 April 2027**. They apply to property income in **England and Northern Ireland**; Scotland and Wales set their own property income rates (FA 2026 s.8 / Sch 2). FA 2026 has Royal Assent — state the rates as enacted law, not as a proposal, surcharge-to-come, or draft.

For **2026/27**, the standard UK income tax rates of **20%, 40%, 45%** apply to rental income alongside other income, and the Section 24 finance-cost reducer is a **20% basic-rate tax credit**.

For **2027/28 onwards**, property income (England + NI) is taxed at **22% basic, 42% higher, 47% additional**, and — critically — FA 2026 Sch 1 gives the **Section 24 finance-cost reducer at the new property basic rate of 22%** (amending ITTOIA 2005 ss.274AA/274C and ITA 2007 s.399B). The reducer is NOT frozen at 20%.

**Consequence (state this correctly):** for a **basic-rate** landlord the reducer (22%) matches the rate on property income (22%), so **no new wedge** opens from this change. For **higher/additional-rate** landlords the reducer rises 20%→22% (a 2 percentage point improvement) but remains far below their 42%/47% rate, leaving a finance-cost wedge of **20pp (42−22)** / **25pp (47−22)** — the same as the 2026/27 wedge of 20pp (40−20) / 25pp (45−20). The wedge does NOT widen.

**Do not write:** "the reducer/credit stays at 20% in 2027/28" (it rises to 22%). "a new basic-rate wedge opens in 2027/28" (it does not — the reducer tracks the 22% rate). "FA 2026 is draft / awaiting Royal Assent / a proposal" (enacted 18 March 2026). "announced at the Autumn Budget 2024" for these property income rates (that was Budget 2025; the 30 October 2024 budget did the SDLT 5% surcharge and CGT 18/24). "Property income is taxed at 20/40/45 in 2027/28" (it is 22/42/47 in England + NI).

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
- **Combined £2.5 million BPR + APR cap commenced 6 April 2026:** the previously-unlimited 100% relief on qualifying agricultural and business property is replaced by a rolling 7-year combined allowance of £2.5m per IHTA 1984 s.124D (inserted by FA 2026 Sch 12 para 4). Excess gets 50% relief (i.e. effective 20% IHT). Affects farming families and trading-business owners; rarely affects standard BTL landlords (who don't qualify for BPR anyway). NOTE: GOV.UK announcement-stage summary page still cites £1m (stale at 30 October 2024 announcement state); see §15.4 for the F-102 stale-page warning + back-patch list.

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

## 11.A ECCTA 2023 + ECTEA 2022 statutory-section depth — Wave 9 mini-lock (added 2026-05-25)

This §11.A mini-lock closes F-10 from Wave 9 Stage 1b. Extends the §11 timeline with verbatim statutory anchors so Wave 9 Bucket B (B1 ID verification + B2 RoE + B3 confirmation statement) writes against locked references, not seed-flagged candidates.

**Important Stage 1b corrections to F-10 flag content (sub-agent surfaced flag with several structural errors — corrected here):**
1. ECCTA 2023 Part 1 is NOT organised by "Chapter 1 / 2 / 4" — it is **23 sections grouped under crossheadings** (no Chapter structure). Sub-agent's "Chapter" framing is wrong.
2. ECCTA 2023 Schedule 12 is "**Criminal liability of bodies: economic crimes**" (a Part 5 matter — failure to prevent fraud) — it does NOT amend ECTEA 2022 / Register of Overseas Entities. RoE amendments live elsewhere in ECCTA (Part 3 + various schedules; Stage 2 sub-agent verifies precise location).
3. RoE statute is **ECTEA 2022 c. 10** (Economic Crime (Transparency and Enforcement) Act 2022), NOT ECCTA 2023. The 2023 Act amends the 2022 Act in places but RoE primary anchor is ECTEA 2022.

### Statutory anchor map (verified at https://www.legislation.gov.uk/ukpga/2023/56/contents on 2026-05-25)

**ECCTA 2023 Part 1 (Companies) — section-grouped crossheadings:**
- **s.1** — Registrar's objectives (CA 2006 amendment inserting new s.1081A statement of objectives).
- **ss.2-7** — Company formation: identity verification at incorporation; disqualification checks.
- **ss.8-22** — Company names: restrictions, change powers, enforcement.
- **ss.23-27** — Business names.
- **ss.28-30** — Registered offices + **registered email addresses** (the new requirement — CA 2006 inserted-s.88A and following). REGISTERED EMAIL IS A CH-TO-COMPANY CORRESPONDENCE CHANNEL ONLY — NOT PUBLISHED ON PUBLIC REGISTER.
- **ss.31-39** — Disqualification regime updates.
- **ss.40-45** — Directors (includes ID verification mechanics for new + existing directors).
- **ss.46-50** — Register of members (private register reforms).
- **ss.51-52** — **Abolition of local registers** for directors, secretaries, and PSCs (consolidates at the Companies House central register).
- **ss.59-63** — **Confirmation statements + lawful purposes notification** (the new "lawful purposes" statement added to the annual confirmation statement obligation).
- **ECCTA Identity-verification crossheading — section attributions (CORRECTED 2026-05-25 per F-14 Wave 9 RUN catch — earlier attributions for s.64/65/67/68/69 were wrong; verbatim section headings WebFetched from legislation.gov.uk):**
  - **s.64** — "**Identity verification of persons with significant control**" — PSC-side ID verification provision (not director-side as earlier framed). Inserts CA 2006 PSC verification requirements.
  - **s.65** — "**Procedure etc for verifying identity**" — generic procedure provision applying to BOTH director + PSC verification (not PSC-specific). The how-to of the verification process.
  - **s.66** — "Authorisation of corporate service providers" — **Authorised Corporate Service Providers (ACSPs)** authorisation regime (CA 2006 inserted-section for ACSP registration and supervision by AML supervisor). ✓ matches earlier framing.
  - **s.67** — "**Exemption from identity verification: national security grounds**" — exemption provision (not continuing-obligations as earlier framed). Narrow national-security carve-out.
  - **s.68** — "**Allocation of unique identifiers**" — unique-identifier mechanic per verified individual (not offences as earlier framed). Each verified individual gets a UID used across Companies House interactions.
  - **s.69** — "**Identity verification: material unavailable for public inspection**" — publication restriction provision (not offences). Defines what verified-identity data is withheld from public register inspection.
  - **Director-side ID verification operative provisions** live in CA 2006 amendments inserted by ECCTA earlier in Part 1 (ss.2-7 + ss.40-45 area) plus the new CA 2006 Part 11A — Stage 2 sub-agent verifies precise section numbers at write time per §16.35.

**ECTEA 2022 (Register of Overseas Entities) — anchors per Part 1 (CORRECTED 2026-05-25 per F-13 Stage 2 catch — earlier attributions for s.8 / s.34 / s.36 were wrong; verbatim section headings WebFetched from legislation.gov.uk):**
- **ECTEA 2022 s.4** — "Application for registration" (overseas entity applies to be entered on the register).
- **ECTEA 2022 s.7** — "Updating duty" — entity must file an updating statement within **14 days after the end of each "update period"** (NOT 14 days from "registration anniversary" — the operative clock is the update period, defined separately in s.7). Civil penalty quantum (£2,500 + £500/day) is in a SEPARATE Penalties Regulations SI, NOT in ECTEA itself. The s.8 + s.36 fines machinery is criminal-side, distinct from the civil-SI quantum.
- **ECTEA 2022 s.8** — "**Failure to comply with updating duty**" — criminal offence (entity + every officer in default; on conviction a fine + daily default fine ≥ greater of £2,500 or half of level 4 on the standard scale for E&W). **NOT "removal from register on application" — that's at s.9 ("Removal from register").**
- **ECTEA 2022 s.34** — "**Power to require overseas entity to register if it owns certain land**" — Secretary of State's compulsory-registration-notice power for unregistered overseas entities that own UK property. **NOT the HMLR disposition-block — that lives at LRA 2002 Sch 4A (inserted by ECTEA but the LRA Schedule is the operative anchor for the disposition restriction, not ECTEA s.34).**
- **ECTEA 2022 s.36** — "**Meaning of 'daily default fine'**" — DEFINITIONAL section that applies CA 2006 s.1125 daily-default-fine concept to ECTEA Part 1. **NOT a stand-alone offences provision.** The failure-to-update criminal offence is at s.8; the false-statements offences are at ss.15A / 15B / 32A (introduced via post-enactment amendments per the contents page).
- **LRA 2002 Sch 4A** — HMLR disposition-block for non-compliant overseas entities (the actual anchor for the HMLR consequence). Inserted by ECTEA 2022 Sch 3.

**Commencement chain (CRITICAL — phased rollout; verify at write time per §16.27 rate-by-reference + phased-commencement-by-reference discipline) (HARDENED 2026-05-25 per F-11 Stage 2 catch):**
- **8 April 2025:** ID verification opens VOLUNTARILY for directors + PSCs (per Commencement Regulations published end-2024).
- **18 November 2025:** ID verification became a LEGAL REQUIREMENT for newly appointed directors and PSCs (per Commencement Regulations — sessions WebFetch SI number at write time). (Earlier "Autumn 2025 (subject to regs)" framing was caveat-rich for a date that has actually become operative; hardened per F-11.)
- **18 November 2025 → ~November 2026 (12-month transition window):** EXISTING directors and PSCs must verify by their next confirmation statement filed within / after the transition window. The deadline is per-company, anchored to the confirmation statement cycle.
- **No earlier than November 2026:** separate later phase for "people who file at Companies House" + corporate-officer scenarios (presenter-side verification + corporate-director regime; Commencement Regulations TBD).
- **4 March 2024:** Companies (Registration etc) Regulations 2024 — confirmation statement changes effective (registered email + lawful purposes statement).
- **1 March 2024 (per ECCTA 2023 Sch 2 commencement):** ECTEA 2022 amendments via ECCTA Part 3 in force.
- **1 August 2022:** RoE in force per ECTEA 2022.

**Sessions writing Bucket B MUST WebFetch the canonical commencement-tracking page at write time (CORRECTED 2026-05-25 per F-12 Stage 2 catch — earlier nominated URL `https://www.gov.uk/government/news/changes-to-uk-company-law` now returns HTTP 404):**
- **Primary tracker:** `https://changestoukcompanylaw.campaign.gov.uk/` (Companies House campaign-page domain).
- **Sub-pages per topic:** `/identity-verification/`, `/authorised-corporate-service-providers/`, `/confirmation-statement-changes/`, `/changes-to-company-registers/`.
- **Secondary tracker (operational announcements):** `https://companieshouse.blog.gov.uk/` (Companies House blog publishes commencement-phase posts).

DO NOT rely on this mini-lock's commencement state as cached; verify at every write against the campaign page + blog.

### Authorised Corporate Service Provider (ACSP) framework — what landlords' accountants do

- ACSPs are firms supervised for AML purposes (under MLR 2017) that register with Companies House to perform identity verification on behalf of clients.
- For landlord LtdCos, the typical ACSP is the company's accountant or company-secretarial agent.
- Directors / PSCs of landlord LtdCos may verify identity (a) directly with Companies House via the GOV.UK ID-check service OR (b) through their ACSP. ACSP route is preferred where the accountant already holds AML-verified ID documents.
- One natural-person verification covers all directorships + PSC interests — verification is per-person, not per-company.

### Operational implications for landlord LtdCos

- **Director ID verification:** every individual director must be verified. Existing landlord LtdCos with 2-4 director roles across multiple SPVs verify each director ONCE.
- **PSC ID verification:** every PSC (typically 25%+ shareholder / controller) must be verified. For BTL portfolio structures with multiple SPVs, the same individual is usually PSC of all — one verification covers all.
- **Registered email:** every UK company must designate a registered email address for CH correspondence (NOT published publicly). Companies must keep this up to date — failure is an offence.
- **Lawful purposes statement:** the confirmation statement now requires a positive statement that the company's intended future activities are lawful. Typically tick-box on the online filing; substantive obligation if challenged.
- **PSC public-register integration:** local PSC registers abolished (ss.51-52); PSC info now lives only at Companies House central register.

### Do-not-write list (extends §11 main + Wave 9 Bucket B specific)

- "ECCTA 2023 Part 1 is organised by Chapters" (false; section-grouped crossheadings only — no Chapter structure).
- "Schedule 12 of ECCTA 2023 amends ECTEA 2022" (false; Sch 12 is "Criminal liability of bodies: economic crimes" addressing failure-to-prevent-fraud — Part 5 territory).
- "Register of Overseas Entities is in ECCTA 2023" (false; RoE primary anchor is ECTEA 2022 c. 10; ECCTA 2023 amends it in places but is not the primary statute).
- "ID verification is voluntary" (false if mandatory by write date — verify against gov.uk Companies House campaign page).
- "Registered email is published on the public register" (false — CH-to-company correspondence only; NOT publicly visible).
- "Appropriate address rule allows PO boxes" (false post-4-March-2024 — registered office must be an "appropriate address" with capacity to acknowledge service of documents; PO boxes do not qualify).
- "RoE annual update is due on calendar-year anniversary" (false — update period is anchored to registration date, due within 14 days of that anniversary).
- "Each SPV needs separate ID verification" (false — one natural-person verification covers all directorships + PSC interests for that person).
- "Lawful purposes statement is a one-off declaration" (false — re-stated annually on each confirmation statement).
- "ACSP is mandatory for landlord LtdCos" (false — ID verification can be direct with CH; ACSP is one option, typically used where the accountant already holds AML-verified ID).
- "s.267 deemed domicile applies to overseas entities" (false — wrong regime; that's IHTA 1984 / FA 2025 territory per §22.X, not RoE).

### HMRC + Companies House manual anchors

- **Primary commencement-state tracker (CORRECTED per F-12):** `https://changestoukcompanylaw.campaign.gov.uk/` — Companies House campaign-page domain (with topic sub-pages); Bucket B sessions MUST WebFetch at write time. The earlier nominated URL `https://www.gov.uk/government/news/changes-to-uk-company-law` returns HTTP 404 — do not use.
- **Secondary tracker:** `https://companieshouse.blog.gov.uk/` (Companies House blog — operational announcements + phase-rollout posts).
- **Companies House guidance:** GP1 (incorporation) + GP2 (life of a company) + ID-verification specific guidance pages on gov.uk.
- **legislation.gov.uk anchors:** https://www.legislation.gov.uk/ukpga/2023/56/contents (ECCTA 2023); https://www.legislation.gov.uk/ukpga/2022/10/contents (ECTEA 2022); https://www.legislation.gov.uk/ukpga/2002/9/schedule/4A (LRA 2002 Sch 4A — HMLR disposition-block anchor).

### Practical writing rules for Bucket B sessions

- **B1 (ID verification):** lead with commencement state (voluntary-now → mandatory-X-date; verify date at write time); then who must verify (directors + PSCs); then how (direct with CH or via ACSP); then operational implications for multi-SPV BTL structures (one-person-one-verification).
- **B2 (RoE):** lead with the ECTEA 2022 anchor (not ECCTA 2023); annual update mechanics + 14-day window + penalty regime; the disposition-block consequence via LRA 2002 Sch 4A; correction of "applies only to new acquisitions" misframing.
- **B3 (confirmation statement):** lead with 4 March 2024 commencement; new elements (lawful purposes statement + registered email); operational filing mechanics; the offence-of-false-statement risk.

**End §11.A.** Wave 9 Bucket B B1 + B2 + B3 use this lock + cross-verify against the gov.uk Companies House page at write time. Stage 2 sub-agent for Bucket B uses this lock as the authoritative starting point — any contradictions surface as Stage 2b drift catches.

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

**Locked position (re-verified against IHTA 1984 s.124D as inserted by FA 2026 Sch 12 para 4, 2026-05-27, F-102):** From **6 April 2026**, the previously unlimited 100% rate of Business Property Relief and Agricultural Property Relief is replaced by a combined 100% relief allowance. The enacted figure under IHTA 1984 s.124D(2)(a) is **£2,500,000**, available as a **rolling 7-year allowance** (the "allowance period" per s.124D(3) is the 7-year window ending immediately before the relevant transfer, less prior 7-year usage under s.104(1A) or s.116(1A)). Functionally, for a single death transfer with no prior chargeable transfers in the preceding 7 years, this operates as a £2.5m combined cap per estate. For estates with significant lifetime CLT history, the death-time allowance is reduced by prior usage.

- **Below the allowance:** 100% relief, as before, for qualifying property.
- **Above the allowance:** 50% relief on the excess, producing an effective IHT rate of 20% on the qualifying value above the cap.
- **AIM-listed shares (and other "not listed" shares on recognised stock exchanges):** previously qualified at 100% BPR after 2 years' ownership; from 6 April 2026 the rate is **50%** and is **NOT affected by the s.124D allowance** — AIM shares operate as a **separate 50% sub-tier** and do not consume the allowance. Gov.uk announcement summary verbatim: *"The exception is for shares designated as 'not listed' on the markets of recognised stock exchanges, such as the AIM, where the rate of relief will be 50% and will not be affected by the new allowance."*
- **Anti-forestalling (lifetime transfers):** the new rules apply to lifetime transfers made **on or after 30 October 2024** (Autumn Budget 2024 announcement date) if the donor dies **on or after 6 April 2026** and within 7 years of the gift. Pre-announcement gifts (before 30 October 2024) are NOT caught even where the donor dies after 6 April 2026. Gov.uk announcement summary verbatim: *"The new rules will apply for lifetime transfers on or after 30 October 2024 if the donor dies on or after 6 April 2026. This prevents forestalling."*
- **Trust anti-fragmentation:** trusts settled **before 30 October 2024** each retain their own allowance for chargeable events. For trusts settled by the **same settlor on or after 30 October 2024**, FA 2026 (commenced 6 April 2026) introduces rules sharing a **single allowance divided across the same-settlor cohort** (preventing allowance multiplication via multi-trust structures). Quantum of the trust-side allowance is set by the s.124G-124K range (the "settlement allowance" mechanics); pre-RUN re-verification against the enacted FA 2026 text recommended for any trust-side worked example.

**CRITICAL STALE-PAGE WARNING:** The GOV.UK announcement summary at `https://www.gov.uk/government/publications/agricultural-property-relief-and-business-property-relief-reforms/summary-of-reforms-to-agricultural-property-relief-and-business-property-relief` still cites £1 million as of 2026-05-27 — published 30 October 2024 at announcement stage and never updated to reflect the FA 2026 enacted quantum. Sessions and writers must NOT cite that page as authoritative for the cap figure; cite IHTA 1984 s.124D direct via `https://www.legislation.gov.uk/ukpga/1984/51/section/124D` (or FA 2026 Sch 12 para 4 inserting it). The structural rules (AIM carve-out, anti-forestalling triggers, trust anti-fragmentation principle) on the GOV.UK summary remain accurate — only the quantum is stale.

**Property-investment context (most BTL landlords):** standard BTL property is investment, not trading — **Pawson v HMRC [2013] UKUT 050 (TCC)** confirms it does not qualify for BPR. The April 2026 cap therefore rarely affects pure BTL landlords. It DOES affect:
- Property developers (trading) holding work-in-progress at death.
- Serviced-accommodation operations with substantial services (the *Pawson*-distinguishing fact pattern: managed kitchen, daily cleaning, breakfast, concierge).
- Mixed estates with both an active trading business (e.g. a farm) and a BTL portfolio — the trading element competes with farmland for the £1m allowance.

**Do not write:** "BTL qualifies for BPR after the April 2026 reforms" (still doesn't, per Pawson). "The £2.5m allowance applies separately to BPR and APR" (it's combined under s.124D). "AIM relief is unaffected" (rate drops to 50%, but does NOT consume the s.124D allowance). "Pre-announcement gifts are caught" (false; anti-forestalling triggers only on transfers on or after 30 October 2024). "Each new same-settlor trust gets its own allowance" (false from 30 October 2024 onwards). "The cap is £1 million" (false; GOV.UK announcement-stage summary page is stale — enacted figure is £2.5m per IHTA 1984 s.124D as inserted by FA 2026 Sch 12 para 4).

**Correction logged 2026-05-23 (F-18):** earlier §15.4 (locked 2026-05-22) hedged AIM mechanics as "the most-likely-to-be-amended detail" and noted trust anti-fragmentation as "expected (consult HMRC technical note)". Wave 4 Session C8 surfaced firmer locked positions via session-time gov.uk WebFetch verification against the APR/BPR reforms summary publication. Three structural positions firmly locked at that time: (a) AIM 50% sub-tier is separate and does NOT consume the allowance; (b) anti-forestalling rule from 30 October 2024 announcement date with 6 April 2026 + 7-year-from-gift trigger; (c) trust anti-fragmentation from 30 October 2024 for same-settlor multi-trust structures (single allowance divided across the cohort).

**Correction logged 2026-05-27 (F-102) — QUANTUM uplift from £1m to £2.5m:** MW2 Stage 2 Bucket C sub-agent (batch M2-C-B1) surfaced verbatim cite of IHTA 1984 s.124D(2)(a) at **£2,500,000**, inserted by FA 2026 Sch 12 para 4, in force from 6 April 2026. Manager independently re-verified 2026-05-27 via three independent WebFetches: (i) legislation.gov.uk s.124D direct; (ii) FA 2026 Sch 12 para 4 enacted text; (iii) IHTA 1984 s.104(1A) referring out to s.124D. All three confirmed £2.5m. The GOV.UK announcement-stage summary page (published 30 October 2024 with £1m headline) was never updated post-enactment — confirms the §16.22 / §16.27 Bill-vs-enacted-Act drift pattern at the most material level. The Wave 4 F-18 verification (2026-05-23) was against the stale GOV.UK summary; the §16.35 per-write legislation.gov.uk discipline introduced in Wave 5 caught this at MW2 Stage 2. Affected previously-shipped pages: Wave 2 A4 + A10 + any earlier IHT cluster page citing "£1m combined" — **back-patch list** captured in F-102 resolution log; manager-side dispatch to follow. **Twelfth consecutive Bill-vs-enacted-Act drift catch in the program** (F-6 §19.7, F-11 §20.7, F-12/F-13 §20.10/§20.5, F-18 §15.4 quantum, F-9 §21.1 s.455 35.75%, F-3 NRB 5 April 2031, F-19/F-20 dividend rate stack, F-102 §15.4 quantum); §16.22 + §16.27 + §16.30 + §16.35 pattern firmly load-bearing.

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

The Non-Resident Landlord scheme (live basis **ITA 2007 ss.971-972** + **SI 1995/2902**, the Taxation of Income from Land (Non-Residents) Regulations 1995) is a UK statutory withholding mechanism. Tenants / letting agents withhold 20% of UK rent paid to non-resident landlords and account to HMRC quarterly, unless the landlord holds an **NRL1** (individuals) / **NRL2** (companies) / **NRL3** (trustees) gross-payment approval. Treaty residence does not displace NRL; even a treaty-resolved non-UK resident must apply for gross-payment approval.

> **Citation discipline (corrected 2026-05-30, F-NRL-1 / F-8 family, Track 2 citation fix):** the live regulation-making power is **ITA 2007 s.971** ("Income tax due in respect of income of non-resident landlords", in force) + **s.972**, under which **SI 1995/2902** continues. History: the original power was **ICTA 1988 s.42A** (inserted by FA 1995 s.40), rewritten into ITA 2007 ss.971-972 and repealed in ICTA from 6 Apr 2007; the SI's preamble still recites the now-repealed ICTA s.42A. **Do NOT cite "FA 1995 Sch 23"** — that schedule ("Obligations etc. imposed on UK representatives") was repealed by TIOPA 2010 (Sch 10 Pt 11) and is unrelated to the NRL scheme. ~10+ corpus pages inherited the "FA 1995 Sch 23" miscite; back-patch sweep tracked.

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

- **NRL1 / NRL2 / NRL3** — the landlord's gross-payment application, by entity type: **NRL1** (individuals), **NRL2** (companies), **NRL3** (trustees). Approved where the landlord's UK tax affairs are up to date and they expect to remain compliant. Decision usually within ~6 weeks. (Corrected 2026-05-30: NRL2/NRL3 are NOT the quarterly returns.)
- **NRL4** — UK letting agent's registration with HMRC to operate the scheme (NRL5 = branch-by-branch operation).
- **NRLQ** — the letting agent's (or tenant's) **quarterly** return of rent paid + 20% tax withheld. **NRLY** — the **annual** information return.
- **NRL6** — annual certificate of tax deducted, given by the agent / tenant to the landlord.
- The £100/week (=£5,200/year) threshold is the point above which a **tenant** (where no UK letting agent is involved) must operate the scheme.
- Failure to operate NRL: the tenant / agent (the "prescribed person") becomes liable to account for the unwithheld tax and HMRC may assess it. (Ordinary TMA 1970 assessment time limits apply; there is no special "unlimited" discovery window for NRL.)

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

### 19.18 SI 2021/1076 → SI 2026/336 migration (MW3 Stage 1b F-3, locked 2026-05-27)

**Critical drift caught at MW3 A19 §16.35 per-write verification.** The Income Tax (Digital Requirements) Regulations 2021 (SI 2021/1076) — the operative MTD ITSA instrument anchoring all §19 architecture from Wave 3 forward — was **REVOKED on 1 April 2026** by the Income Tax (Digital Obligations) Regulations 2026 (SI 2026/336). Verified against legislation.gov.uk 2026-05-27 (the page header reads "The Income Tax (Digital Requirements) Regulations 2021 (revoked)" with the textual amendment note: "Regulations revoked (1.4.2026) by The Income Tax (Digital Obligations) Regulations 2026 (S.I. 2026/336)").

The substantive mechanics carry over (qualifying-income, threshold tiers, exclusion notices, exit rule, voluntary opt-in, non-resident company exemption, trustee exemption are all preserved) but regulation numbers have migrated. Sub-agent verified the following migrations against legislation.gov.uk 2026-05-27 (additional rows marked "verify Stage 2" require per-write re-fetch):

| Topic | OLD (SI 2021/1076, revoked) | NEW (SI 2026/336, in force) |
|---|---|---|
| Qualifying income | reg 20 | **reg 25** |
| Qualifying amount / threshold | (implicit) | **reg 27** |
| Exclusion notice / digital-exclusion exemption | reg 20 | **reg 18** |
| Meaning of "excluded" (digitally-excluded or s.46-identity-verification carve-out) | (implicit) | **reg 20** |
| Three-tax-year income-exemption exit rule | reg 22 | **reg 24** |
| Election not to be exempt (voluntary opt-in) | reg 23 | (verify Stage 2) |
| Non-resident company exemption | reg 24 | (verify Stage 2) |
| Trustee exemption | reg 25 | (verify Stage 2) |

**Sessions writing MTD ITSA pages after 2026-05-27 MUST cite SI 2026/336 with the new regulation numbers (or the verified migration table where the new number is yet to be confirmed by per-write fetch).** SI 2021/1076 references remain appropriate only in **historical context** (when describing the original 2021 framework and the 2026 migration) or in **migration discussion** where both old and new are explicitly named. Any page citing SI 2021/1076 as the live operative instrument is now stale — back-patch required.

**Back-patch sweep scope (Stage 1b deferred to post-Stage-1b commit):**
- All MW3 Bucket A MTD seeds shipped pre-A19: A6 / A7 / A11 / A16 / A18 — sub-agent at MW3 A19 flagged A18 as "wrong on two axes" (citing reg 20 as qualifying-income, which is now exclusion-notice; correct is reg 25 of new SI). Each requires per-pick judgment.
- Wave 3 + Wave 4 MTD content on `Property/web/content/blog/` citing SI 2021/1076: mechanical text-swap candidates per §16.43. Any reg-20 references need judgment per the two-axis ambiguity for that specific regulation number.

**Source authority:** legislation.gov.uk SI 2026/336 (in force from 1 April 2026); the SI 2021/1076 page now shows revocation note. Sub-agent at MW3 A19 verbatim verified at write time 2026-05-27. **Thirteenth Bill-vs-enacted-Act drift in the program** (F-6 §19.7, F-11 §20.7, F-12/F-13 §20.10/§20.5, F-18 §15.4 structural, F-9 §21.1 s.455 35.75%, F-3 NRB 2031, F-19/F-20 dividend rate stack, F-102 §15.4 quantum, now F-3 §19 SI migration). The §16.22 / §16.27 / §16.30 / §16.35 pattern continues to earn its keep.

### 19.19 Points-based late submission regime (MW3 Stage 1b watchpoint, locked 2026-05-27)

**Watchpoint surfaced at MW3 A20 per-write verification (§16.35).** The points-based late-submission regime sits at **FA 2021 Schedule 24** (NOT to be confused with FA 2007 Schedule 24, the long-standing inaccuracy regime — naming collision flagged at F-3 BRIEF_DRIFT, Bucket A). Points reset for quarterly filers requires a **dual-condition test** per HMRC's published policy paper: (a) 12-month compliance period AND (b) all submissions due within the preceding 24 months have been made. §19.7 in its earlier framing surfaced only the 24-month limb; sessions citing the reset rule must surface both limbs explicitly. Penalty structure: 4-point threshold for quarterly filers → £200 fixed penalty per failure after threshold reached; daily late-payment penalty escalation (3% / 3% / 10%) preserved per §19.7 F-6 Wave 4 lock.

### 19.20 CT late-filing flat-rate penalty figures (MW3 Stage 1b F-1, locked 2026-05-27)

**Verified verbatim at MW3 A5 + legislation.gov.uk 2026-05-27 against FA 1998 Schedule 18 paragraph 17:**

- **Para 17(2)(a):** £200 if the company tax return is delivered within three months after the filing date.
- **Para 17(2)(b):** £400 in any other case.
- **Para 17(3):** Increased to £1,000 / £2,000 for a third successive failure (where failures relate to three successive accounting periods).

These figures supersede the widely-cited historical £100 / £200 / £500 / £1,000 figures that may appear in pre-existing site content (older guides on CT penalties, accountant-services pillar pages, or earlier Stage-2 briefs). Sessions writing any CT late-filing penalty content **MUST cite the verified £200 / £400 / £1,000 / £2,000 figures, not the historical numbers**.

**Back-patch sweep scope (Stage 1b deferred):** any pre-existing page citing flat-rate CT late-filing penalty figures at the historical £100/£200/£500/£1,000 levels. Pattern is mechanical text swap per §16.43.

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

**Correction logged 2026-05-24 (F-3) — RRA 2025 verbatim-section disambiguation table.** Wave 7 Session A caught two distinct section-number drifts in briefs and adjacent commentary; both verified against https://www.legislation.gov.uk/ukpga/2025/26/ on 2026-05-24. The substantive citations sessions must use are:
- **RRA 2025 s.2** — "Abolition of assured shorthold tenancies" (omits Ch.2 of Pt.1 HA 1988 + s.6A). This is the s.21 abolition mechanism. NOT s.4.
- **RRA 2025 s.3** — introduces Sch 1 (reformed Section 8 possession grounds).
- **RRA 2025 s.4** — "Possession for anti-social behaviour: relevant factors" (NOT the s.21 abolition section).
- **RRA 2025 s.5** — amending vehicle for PEA 1977 s.5(1ZA) per F-14 above; sets the 2-month tenant-notice floor.
- **RRA 2025 s.6** — "Statutory procedure for increases of rent" (the s.13 rent-review mechanic). NOT the re-letting restriction.
- **RRA 2025 s.15** — inserts new **HA 1988 s.16E** (12-month re-letting restriction on landlord-sale and landlord-occupation grounds) + **HA 1988 s.16J** (criminal offence for breach) + **HA 1988 s.16K** (£40,000 civil-penalty alternative). This is the operative re-letting-restriction anchor, NOT s.6.
The sequential numbering of these provisions makes them easy to collapse in unverified prose. Sessions writing on RRA 2025 mechanics must cite the verbatim section heading or use this disambiguation table; "RRA 2025 s.6 imposes a 12-month re-letting restriction" is a recurring drift catch and is **wrong** — that mechanic is at HA 1988 s.16E inserted by RRA 2025 s.15.

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
- **From 6 April 2026:** even where BPR applies, **£2.5m combined BPR + APR rolling 7-year allowance** per IHTA 1984 s.124D (see §15.4 + F-102 correction 2026-05-27); above-allowance relief drops to 50%, giving effective 20% IHT on the above-allowance portion.

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

- **s.18(1) IHTA 1984 spouse exemption (full):** unlimited transfers between spouses are exempt from IHT where the **receiving** spouse is a long-term UK resident (s.6A test; see §15.6 + §22.X for the operative LTR mechanics). The historic "UK-domiciled" criterion was replaced by FA 2025 with effect from 6 April 2025; sessions writing post-6-April-2025 cases must use LTR not domicile.
- **s.18(2) IHTA 1984 spouse exemption (limited):** where the transferor is LTR but the receiving spouse is NOT LTR, the cumulative lifetime spouse-exemption value is capped at the **exemption limit** defined by s.18(2A) as the NRB upper limit per Sch 1 Table — **currently £325,000** but framed by-reference (the cap automatically tracks the NRB; sessions writing s.18(2) limited exemption must cite the s.18(2A) by-reference framing per the same rate-by-reference discipline as s.455 / ITA 2007 s.8(2) at §21.1).
- **LTR election (SPOUSAL — not generic): IHTA 1984 s.267ZC.** Election available only where a spousal/civil-partner LTR connection exists (Condition A or B per s.267ZC). Condition A (s.267ZC(3)) — at any time within 7 years ending with the election date, the electing person had a spouse/civil partner who was LTR. Condition B (s.267ZC(4)) — a deceased person was LTR within 7 years ending with their death AND was the spouse/civil partner of the electing person (election made by P or by the deceased's personal representatives). **No election exists for non-LTR individuals without a spousal/civil-partner LTR connection** — there is no freestanding "anyone can elect to be LTR" route. Cost of election: brings worldwide assets into UK IHT scope for the election period. Further procedural detail at s.267ZD. NOT to be confused with **s.267ZA**, which was NARROWED by FA 2025 Sch 13 — the spousal-connection date in s.267ZA conditions A/B must be "before 6 April 2025" within the 7-year window. s.267ZA has no automatic repeal date; it remains available indefinitely for qualifying legacy spousal-connection cases. (Stage 1a §16.45 drift catch — earlier framing of s.267ZC as "generic LTR election" was misleading; the spousal-connection requirement makes it spousal-only.)
- **Transferable NRB (TNRB):** unused NRB on first death transfers to surviving spouse (s.8A IHTA 1984). Claimed on IHT402 within 2 years of second death.
- **Transferable RNRB (TRNRB):** unused RNRB on first death transfers. Claimed on IHT436.
- **Second-death window planning:** between first and second death, the surviving spouse can use spouse exemption to consolidate the portfolio (no IHT on first-death transfers in), then face the full estate value on second death potentially above £2m RNRB taper threshold. Counter-strategies: gifting in survivor's lifetime, charity legacy on second death, equity-release to spend down portfolio value.

**Refresh logged 2026-05-25 (F-22).** Earlier §22.5 (locked 2026-05-23 as part of Wave 4 extension) carried pre-FA-2025 architecture — used "UK-domiciled" alongside "long-term-resident" framing (correct in some cases; misleading post-6-April-2025), cited "s.267ZA" as the generic LTR election (wrong post-FA-2025 — s.267ZA narrowed to transitional, generic election is s.267ZC), and hard-coded "£325k lifetime limit" rather than the s.18(2A) by-reference framing. Refresh substitutes LTR-only framing, corrects election cite to s.267ZC, and frames limit by-reference. Deferred §16.39 Wave 6 inter-wave queue item closed by this refresh. Verified against IHTA 1984 ss.18 + 6A + 267ZA + 267ZC on legislation.gov.uk on 2026-05-25. **15th + 16th + 17th Bill-vs-enacted-Act drift catches in succession** (the three sub-corrections — LTR-not-domicile in s.18; s.267ZC-not-s.267ZA; by-reference NRB Sch 1 not hard-coded £325k); §16.27 / §16.30 / §16.35 / §16.45 pattern extends to housekeeping refresh territory.

### 22.6 FIC as estate-planning value-freeze tool

- **NOT a re-statement of §21.5.** §21.5 is the corporate-side mechanics (share classes, CIHC status, CT profile). §22.6 is the IHT-side framing.
- **Value-freeze:** founder transfers property into FIC and retains preference shares with fixed £-coupon dividend (frozen value). Growth shares (entitled to capital growth + control) are gifted to next generation as PETs.
- **7-year clock starts on the share gift, NOT on FIC formation.** Founder must survive 7 years for full PET exemption.
- **Comparison vs direct property PET gift (Wave 4 C4):** direct property gift = single asset, CGT s.17 deemed disposal at market value (no holdover for non-business BTL). FIC growth-share gift = company-share gift, valued with minority discount, but still CGT MV (no s.165 holdover for investment FIC per §21.5). FIC route can be lower CGT due to minority-discount valuation.
- **GROB risk:** if founder retains the preference dividend and the FIC's primary asset is property the founder also occupies / uses, GROB s.102 FA 1986 may apply. Counter: founder pays full market rent for any use; or founder takes pure cash-coupon income from preference shares with no use of underlying property.
- **Cross-bucket boundary with §21.5 / Bucket A FIC pages:** Wave 4 A8 = FIC retirement income mechanics; A9 = FIC growth-share PET mechanics at point of gift; A10 = FIC blended-family articles design. Wave 4 C7 = FIC value-freeze for IHT planning, citing A8 / A9 / A10 as the operational siblings without re-walking their ground.

### 22.7 Citations for §22

- IHTA 1984: s.6 (excluded property — references LTR test), s.6A (LTR test), s.6B (young-person LTR variation), s.7 (rate), s.8A (TNRB), s.18 (spouse — post-FA-2025 LTR-based), Sch 1 Table (NRB upper limit used by-reference at s.18(2A)), s.62 (cumulative), s.105 (BPR), s.142 (DoV), Sch 1A (36% rate), s.267ZA (transitional pre-6-April-2025 domicile-window SPOUSAL election — narrow gateway, no repeal date), ss.267ZC-267ZF (post-FA-2025 SPOUSAL LTR election framework — Conditions A/B require spouse/civil-partner LTR connection within 7-year window). **NOTE: s.267 (deemed domicile) omitted by FA 2025 s.44 + Sch 13 effective 6 April 2025 — historic framework GONE; do not cite s.267 in post-FA-2025 content.** **NOTE: ss.267ZA + 267ZC are BOTH spousal-only — there is no post-FA-2025 generic "anyone can elect LTR" route.**
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
- Returns due: SDLT 14 days from effective date (FA 2003 s.76); LTT 30 days (LTTA 2017 s.44 — Duty to make a return, Part 6); LBTT 30 days (LBTT(S)A 2013 s.29). The SDLT 14-day clock is shorter than both devolved equivalents. (F-52 close 2026-05-26: prior cite of LTTA 2017 s.41 was incorrect — s.41 sits in Part 5; the operative returns provision is s.44 in Part 6.)

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

**Practical hook for sessions.** Pages on commercial property allowances must distinguish (i) the building shell (s.21 List A, excluded), (ii) the structures (s.22 List B, excluded), (iii) the integral features (s.33A, special rate 6%), and (iv) the remaining plant (List C and main rate 14% reducing balance from April 2026, cut from 18% by FA 2026 s.28; see §38). The s.198 fixtures election is the make-or-break mechanism for buyer-side claims; sessions must surface the two-year election deadline and the pooling-requirement gate. Pages on residential property (BTL ordinary lettings) must surface the s.35 dwelling-house restriction: P&M allowances are barred for plant in a dwelling-house unless the plant is in a common part of a multi-let property (e.g. communal halls of a block of flats). Source: legislation.gov.uk, verified 2026-05-23.

### 25.3 Annual Investment Allowance (CAA 2001 ss.51A-51N)

**Statutory base, s.51A "Entitlement to annual investment allowance"** (`https://www.legislation.gov.uk/ukpga/2001/2/section/51A`). Verbatim s.51A(5): "The maximum allowance is £1,000,000." Verified 2026-05-23. The £1m cap was made **permanent from 1 April 2023** by Finance (No. 2) Act 2023 s.8; the prior structure of temporary cap levels (£200k baseline, with successive temporary uplifts to £1m) ended at that point. AIA provides 100% write-off in the chargeable period of incurring for AIA-qualifying expenditure up to the cap; expenditure above the cap rolls into the main pool (14% from April 2026, see §38) or special-rate pool (6%) as the case may be.

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

**Pool concept.** Main pool (14% WDA from April 2026, cut from 18% by FA 2026 s.28; see §38), special-rate pool (6% WDA, integral features per s.33A and long-life assets), single-asset pools (short-life assets per s.83 election, cars over emissions threshold, certain other items). Disposal proceeds reduce the pool balance; where TDR exceeds AQE the difference is a balancing charge (taxable receipt).

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

## 1.H SDLT Multiple Dwellings Relief — ABOLISHED — F(No.2)A 2024 s.7 — Wave 9 mini-lock (added 2026-05-25)

This §1.H mini-lock closes F-1 from Wave 9 Stage 1b. Placement after §1.G for chronological-audit consistency.

- **Statutory hooks:** Finance (No. 2) Act 2024 (c. 12) **s.7** ("Abolition of multiple dwellings relief for SDLT") repeals FA 2003 Schedule 6B in full. Verified at https://www.legislation.gov.uk/ukpga/2024/12/contents on 2026-05-25 (TOC fetch confirms s.7 exists with that title; full-text verification of effective date + transitional commencement language: see Wave 9 Stage 2 sub-agent A1 per §16.36).
- **Effective date.** MDR is unavailable for **land transactions with an effective date on or after 1 June 2024**. The "effective date" for SDLT = completion OR substantial performance, whichever is earlier (FA 2003 s.119).
- **Transitional cohort (Stage 2 sub-agent A1 verifies precise statutory language).** Contracts entered into and substantially performed BEFORE 1 June 2024 remain eligible for MDR even if completion occurs after 1 June 2024 (subject to anti-forestalling). Two operational tests:
  - Contract date pre-1-June-2024 AND substantial performance pre-1-June-2024 = transitional eligibility likely.
  - Contract date pre-1-June-2024 but substantial performance / completion post-1-June-2024 = anti-forestalling carve-outs apply; relief may be denied.
- **Anti-forestalling architecture (Stage 2 verifies exact statutory section).** F(No.2)A 2024 includes anti-forestalling provisions to block retrofit MDR claims via:
  - Sub-sale arrangements structured around the abolition date;
  - Options or assignments of pre-1-June-2024 contracts where the underlying transaction completes post-abolition;
  - Variations of pre-1-June-2024 contracts after Budget Day that change the consideration or dwelling count.
- **Surviving alternatives for portfolio buyers post-abolition (CRITICAL for sessions):**
  - **FA 2003 s.116(7) six-or-more-dwellings rule:** purchase of 6+ dwellings in a single transaction is **automatically classified non-residential** for SDLT rate purposes (no claim required; statutory deeming). This is a STATUTORY DEEMING, not a relief; it survives MDR abolition and is the workhorse route for bulk portfolio acquisitions now. Wave 1 audit logged 2026-05-22 corrected an earlier mis-attribution of this rule to Sch 6B para 7.
  - **FA 2003 Sch 15 para 10 partnership SLP route:** transfer of property to a genuine pre-existing partnership uses Sum of the Lower Proportions (SLP) calculation per §1.A (Wave 7 lock). Available only where the partnership predates the transaction with substance; anti-Ramsay safeguards apply.
  - **FA 2003 s.45 sub-sale relief:** narrow surviving route for genuine pre-completion onward-sale arrangements. NOT a substitute for MDR planning; sub-sale must reflect commercial reality.
- **Pages adjacent to this lock:** Wave 9 A1 (`multiple-dwellings-relief-abolition-fa-2024-transitional-rules-landlords`) is the primary anchor page. Existing site coverage includes `welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition` (Welsh LTT survival angle — MDR-equivalent remains live under LTTA 2017 for Welsh transactions; do not conflate).
- **Do not write:**
  - "MDR is still available for second properties" (false; abolished for effective date on or after 1 June 2024).
  - "MDR was abolished by the Autumn 2024 Budget" (false attribution; abolition was in the Spring 2024 Budget, enacted by F(No.2)A 2024 s.7 with 1 June 2024 commencement).
  - "Six-or-more-dwellings rule is at Sch 6B para 7" (false; the rule lives at FA 2003 s.116(7); Sch 6B was the MDR provision and is repealed).
  - "Transitional rules apply automatically to any pre-1-June-2024 contract" (false; substantial performance pre-1-June-2024 is required; anti-forestalling can defeat retrofit attempts).
  - "Anti-forestalling looks at Budget Day only" (false; multiple operative dates matter; Stage 2 sub-agent A1 verifies the exact commencement architecture).
- **HMRC manual anchor:** SDLTM29900+ (multiple dwellings relief — note the manual page may still describe the relief as live for historical/transitional purposes; cross-reference SDLTM00500 for current rates post-abolition).
- **Practical writing rule for A1:** lead with the abolition date + statutory authority; then transitional cohort identification mechanics; then anti-forestalling architecture; then the three surviving alternatives (s.116(7) / Sch 15 SLP / s.45) as the post-abolition operational toolkit. Distinguish from Welsh LTT angle explicitly.

---

## 1.I SDLT 5% additional-dwellings surcharge — refund routes + 3-year replacement window — FA 2003 Sch 4ZA — Wave 9 mini-lock (added 2026-05-25)

This §1.I mini-lock closes F-2 from Wave 9 Stage 1b. The §1 main do-not-write already references the 3% rate historically; this lock corrects to current 5% rate + adds refund-route architecture.

- **Statutory hooks:** FA 2003 Schedule 4ZA (Higher rates for additional dwellings); rate increase from 3% to 5% via **FA 2025 s.51(1)-(2)** (note: NOT FA 2024 — the Autumn 2024 Budget on 30 October 2024 was enacted by FA 2025 c.8 in the following session). Verified at https://www.legislation.gov.uk/ukpga/2003/14/schedule/4ZA on 2026-05-25. **Earlier Wave 9 F-2 framing of "Autumn 2024 / FA 2024" was a Stage 1b drift catch — corrected here.**
- **Current Table A rates (per Sch 4ZA para 1(2) as amended by FA 2025 s.51):**
  - £0 — £125,000: **5%** (was 3%)
  - £125,001 — £250,000: **7%** (was 5%)
  - £250,001 — £925,000: **10%** (was 8%)
  - £925,001 — £1,500,000: **15%** (was 13%)
  - £1,500,001+: **17%** (was 15%)
  - **Verify at write time (§16.27 rate-by-reference):** these rates are the current state per the 2026-05-25 verification; sessions writing must re-verify against gov.uk SDLT calculator page.
- **3-year replacement-window architecture (the refund route for surcharge paid pending old-home sale):** governed by Sch 4ZA **para 3(6)-(7B)** (CORRECTED 2026-05-25 per F-5 Wave 9 RUN catch — earlier framing conflated the extension TEST with the extension POWER).
  - **Para 3(7)(b):** defines a "permitted period" for disposing of the prior residence to qualify for surcharge refund.
  - **Para 3(7A):** the permitted period is **(a) three years beginning with the day after the effective date** of the higher-rate transaction; OR **(b) such longer period as HMRC may agree where exceptional circumstances prevented disposal within the 3-year window** (this is the TEST — the condition that defines when an extended period qualifies; HMRC's POWER to agree the longer period is at para 3(7B)).
  - **Para 3(7B):** the operative GRANT of HMRC's discretionary power to agree a longer period under para 3(7A)(b). Distinct from the test: 3(7A)(b) defines WHAT qualifies; 3(7B) confers HMRC's power to AGREE that something qualifies. Application is taxpayer-initiated; HMRC decision is discretionary; exceptional circumstances typically COVID-era delays, conveyancing-chain failure, market freeze (routine market delay does not qualify).
- **Refund claim mechanics:**
  - **Time limit for refund:** within 12 months of the sale of the prior residence OR within 12 months of the SDLT return filing date, whichever is later (FA 2003 Sch 11A — overpayment relief regime as adapted for Sch 4ZA refunds).
  - **Form:** SDLT amendment via HMRC's online SDLT return amendment service or by letter to Stamp Office.
  - **Documentation required:** sale completion statement for old home; SDLT5 certificate for higher-rate transaction; chain of evidence for "main residence" status of the sold property.
- **Pages adjacent to this lock:** Wave 9 A2 (`sdlt-additional-property-surcharge-refund-routes-3-year-replacement-claim`) is the primary anchor page. **Partial-overlap risk (cannib 0.36) vs existing `sdlt-5-percent-surcharge-refund-claim-process`** — differentiation: existing page is the how-to-claim process; A2 is the refund ROUTES + 3-year-window + extension mechanics + sale-delay scenario walkthroughs.
- **Do not write:**
  - "Surcharge is 3%" (false; raised to 5% by FA 2025 s.51 effective 31 October 2024 for transactions with effective date on/after that day; verify against gov.uk for any subsequent changes).
  - "The 3-year window is at Sch 4ZA para 3(7)(a)" (false; "permitted period" is at para 3(7)(b); the 3-year length is at para 3(7A)(a)).
  - "The extension TEST is at para 3(7B)" (false — para 3(7B) is the POWER to grant; the TEST that defines when an extended period qualifies is at para 3(7A)(b)). F-5 Wave 9 RUN catch.
  - "HMRC extensions to the 3-year window are routine" (false; para 3(7A)(b) requires exceptional circumstances; para 3(7B) power is discretionary; routine market delay does not qualify).
  - "Refund must be claimed within 12 months of the SDLT effective date" (false; the 12-month clock runs from the LATER of sale of prior residence OR SDLT return filing date).
- **HMRC manual anchor:** SDLTM09730+ (higher rates for additional dwellings); SDLTM09750+ (replacement of main residence + refund).
- **Practical writing rule for A2:** lead with the 5% current rate + statutory authority (correcting any "still 3%" confusion); then the 3-year window mechanic + statutory anchor (para 3(7A)(a)); then the refund claim mechanics + time limits; then the exceptional-circumstances extension route. Cross-link the existing page for the basic process; A2 is the architecture + edge-case page.

---

## 1.J SDLT residential-vs-mixed-use rate line — case-law trilogy + FA 2003 s.116 — Wave 9 mini-lock (added 2026-05-25)

This §1.J mini-lock closes F-3 from Wave 9 Stage 1b. Sits in the §1 SDLT cluster.

- **Statutory hooks:** FA 2003 **s.116** ("Meaning of 'residential property'"). The residential/non-residential rate distinction is the most-tested SDLT classification line in tribunal litigation (residential rates can be 12-17% on higher-band transactions; non-residential top rate is 5%). Verified at https://www.legislation.gov.uk/ukpga/2003/14/section/116 on 2026-05-25 (TOC level; full s.116 text verification at Stage 2 write time per §16.36).
- **The s.116 framework in plain terms:** "Residential property" = (a) buildings used or suitable for use as a dwelling, in the process of being constructed or adapted for such use; (b) land that is or forms part of the garden or grounds of such a building; (c) interests in or over land that subsists for the benefit of such a building. **Mixed-use** = transactions involving BOTH residential and non-residential land/property; charged at non-residential rates on the entire consideration.
- **Case-law trilogy — the operative tribunal authority for property investors:**
  - **Hyman & Goodfellow v HMRC [2021] UKUT 68 (TCC)** (CORRECTED 2026-05-25 per F-6 Wave 9 RUN catch — earlier "[2019] UKUT 0411 (TCC)" citation was wrong; 2019 is the FTT decision [2019] UKFTT 469 per §1.C lock; UT binding ruling is [2021] UKUT 68; further appeal at [2022] EWCA Civ 185): upper-tier ruling on "garden or grounds" interpretation. Established that "grounds" is broader than "garden" and includes land used for purposes ancillary to the dwelling. Tightened against taxpayer attempts to fragment large rural holdings into residential-house + non-residential-grounds. Court of Appeal upheld at [2022] EWCA Civ 185.
  - **Suterwalla v HMRC [2024] UKUT 188 (TCC):** more recent UT ruling. Held that the "use" test for "garden or grounds" looks at use at the **effective date** of the transaction, not historic/intended use. A field grazed by a neighbour's horses (with grazing rights) at completion is NOT garden or grounds of the dwelling for that reason — but the test is fact-specific.
  - **Hortons Hall (Horton Hall Estates Ltd v HMRC):** FTT cases (multiple decisions) on the residential/non-residential line for substantial estates. **Stage 2 sub-agent A3 verifies the precise citation + ratio at write time** — there are several Horton/Horton's Hall decisions and the brief should cite the controlling one. **MW1 Stage 2b case-citation closure (2026-05-26, F-6):** the property is **Horton Hall** (singular, Staffordshire); the case name is **Mark White & Carol Kane v HMRC [2023] UKFTT 866 (TC)** (TC08943), 29 September 2023, Tribunal Judge Anne Fairpo. Para 32 sets out the "functionally, occupied with and were appendages" test. White & Kane is FTT-only; Hyman EWCA + How Development 1 [2023] UKUT 84 (TCC) + Suterwalla [2024] UKUT 188 (TCC) are the controlling appellate authorities.
- **§1.J sub-line 1 — Garden-easement leasehold (FA 2003 s.116(1)(c)) — added 2026-05-26 (MW1 F-3, anchors A14).** The s.116(1)(c) easement-benefit limb extends "residential property" treatment to land that is not itself part of the dwelling but exists for the benefit of the dwelling (e.g. a garden easement, communal-gardens right of way for residents only). MW1 Stage 2b case-citation closure: **Bonsu v HMRC [2024] UKFTT 158 (TC)** (TC09084), 26 February 2024, Tribunal Judge Richard Chapman KC. FTT held the right to use the communal garden was an easement subsisting for the benefit of the leasehold flat within s.116(1)(c); the easement was "in any event residential property" because s.116(1)(c) does not require the right to be exclusively for the benefit of the dwelling. Residential SDLT rates (Table A) applied; appeal dismissed. Earlier sister authority: Sexton & Anor v HMRC [2023] UKFTT 73 (TC) (19 January 2023, TC08708). MW1 A14 page (`ftt-confirms-residential-sdlt-rates-for-leasehold-with-garden-easement`) is the anchor page citing Bonsu primarily + Sexton as line precedent.
- **§1.J sub-line 2 — Public rights of way (PROW) over residential land — added 2026-05-26 (MW1 F-3, anchors A9).** A subsidiary line where the disputed land carries a Definitive Map PROW (public footpath, bridleway, restricted byway, or BOAT). HMRC's argument-pattern: PROW = non-private = non-residential character → mixed-use rates. The FTT's general approach distinguishes PROW that materially constrain the residential enjoyment (potentially mixed-use) from PROW that are notional or unenforced (typically residential). Surveyor evidence + on-site inspection notes are decisive. MW1 A9 page (`averdieck-case-analysis-navigating-sdlt-and-public-rights-of-way`) is the case-led anchor.
- **§1.J cluster taxonomy.** The trilogy core (Hyman EWCA + How Development UKUT + Suterwalla UKUT + Mudan / MHB / Brown FTT cluster) remains the residential-vs-mixed-use ratio line. The two sub-lines above are the case-led extensions for MW1's three named-case pages (A14 + A9 + A16). Future named-case pages may add further sub-lines under §1.J without needing a new mini-lock.
- **The Bewley exception (already in §1.C — Wave 7 lock):** narrow exception for properties that are NOT suitable for use as a dwelling at the effective date due to substantial structural defect / contamination / requiring complete reconstruction. Bewley v HMRC [2019] UKFTT 65 (TC). **Post-Hyman + Mudan + MHB + Brown the Bewley test has narrowed substantially** — sessions writing must not over-state Bewley availability.
- **Operational decision framework for landlords (sessions writing A3 use this):**
  - Single-dwelling residential property: residential rates (no MDR available post-1-June-2024 per §1.H).
  - Bulk purchase 6+ dwellings: automatic non-residential per s.116(7) (per §1.H surviving alternative).
  - Dwelling + working farm / business premises in same transaction: mixed-use → non-residential rates.
  - Dwelling + paddock with grazing rights to neighbour (Suterwalla pattern): fact-specific; may be mixed-use.
  - Dwelling + amenity garden / grounds: residential rates per Hyman (no fragmentation).
  - Uninhabitable property (Bewley): narrow exception only.
- **Pages adjacent to this lock:** Wave 9 A3 (`sdlt-mixed-use-rates-vs-residential-property-tribunal-tests-landlords`) is the primary anchor page. Existing site coverage includes `sdlt-bewley-uninhabitable-property-test-non-residential-rates-landlords` (Bewley specifically — Wave 7) and `sdlt-mixed-use-property-classification` (existing higher-level page — A3 should cross-link as companion).
- **Do not write:**
  - "Mixed-use saves landlords money" (false framing; mixed-use rates are NOT a relief — they're a classification consequence; aggressive mixed-use claims are litigated heavily and HMRC actively enquires).
  - "Hyman applies only to very large properties" (false; the ratio applies to any residential property with adjoining land; size is a fact factor, not a threshold).
  - "Suterwalla settled the mixed-use test" (false framing; Suterwalla refined the "use at effective date" test for one fact pattern; the line remains fact-specific).
  - "Bewley is available for any unmodernised property" (false; carried forward from §1.F Wave 7 lock — Bewley is a narrow exception for substantially structurally dangerous / contaminated / requiring complete reconstruction properties).
  - "Six-or-more rule overrides s.116 mixed-use" (false; s.116(7) and mixed-use are different routes; sessions must distinguish — bulk-dwelling deeming vs mixed-use classification).
- **HMRC manual anchor:** SDLTM00370+ (residential property definition); SDLTM00385+ (gardens and grounds).
- **Practical writing rule for A3:** lead with the rate-difference economic stakes (5% non-residential top vs 17% residential top); then s.116 framework; then case-law trilogy with operational implications; then decision framework with worked examples. Distinguish from existing companion pages explicitly.

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
  | Careless | 30% | 0% | 15% |
  | Deliberate not concealed | 70% | 20% | 35% |
  | Deliberate and concealed | 100% | 30% | 50% |

  **F-5 correction logged 2026-05-24:** Schedule 24 FA 2007 para 10 imposes NO "within 12 months" qualifier on the careless-unprompted 0% floor. The 12-month cliff exists in **Schedule 41 FA 2008 para 13** (failure-to-notify): unprompted disclosure of a non-deliberate failure must be made within 12 months of when liability arose to access the 0% floor; otherwise the floor is 10%. Sessions writing on inaccuracy penalties must not import the Sch 41 12-month qualifier into Sch 24 commentary. Verified against https://www.legislation.gov.uk/ukpga/2007/11/schedule/24/paragraph/10 on 2026-05-24 (Wave 7 B8 write-time verification). Earlier §27.2 carried the conflation; back-patched at this commit.
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

## 17.8 FIG regime operational depth (ITTOIA 2005 ss.845A-845J, inserted by FA 2025 s.37) — Wave 8 mini-lock (added 2026-05-25)

**Architectural sibling of §17.6 (headline framing).** §17.6 names the 4-year FIG window; §17.8 anchors the operative ITTOIA 2005 sections + the loss-of-allowance + claim-deadline mechanics that Wave 8 Bucket A pages will write to.

- **Statutory anchor.** Foreign income and gains relief for qualifying new residents is inserted into **ITTOIA 2005 Chapter 5 (ss.845A-845J)** by **FA 2025 s.37 + Sch 8** (employment income parallel) — NOT in FA 2025 Sch 9 (which removes the historic remittance-basis + domicile-based exemptions; see §16.39 housekeeping note). Effective from tax year 2025-26.
- **Qualifying new resident test (ITTOIA 2005 s.845B(1)) — FOUR cumulative conditions (Stage 2b correction 2026-05-25 expanded from earlier 2-condition framing):**
  - (a) individual is UK-resident for the current tax year (the FIG window only operates while UK-resident);
  - (b) individual was NOT UK-resident "for each of the 10 tax years before that tax year" (the 10-year prior-non-residence gateway; partial-year residence triggered by SRT split-year (§17.2) breaks the chain unless the individual was non-resident for the full tax year per SRT);
  - (c) individual is not disqualified per s.845B(2) (typically: previously claimed FIG / remittance basis for over-quota period);
  - (d) **individual is at least 10 years old at the commencement of the tax year** (age-floor; rarely operative but binding for young-person scenarios — trust beneficiaries, young expat-returnees).
- **Duration of relief (ITTOIA 2005 s.845B(2)):** up to **4 tax years** — the qualifying tax year + the 3 subsequent tax years. The relief is per-year claim (not automatic); failure to claim in a year forfeits that year's relief.
- **Claim mechanism (ITTOIA 2005 s.845A):** relief is deducted at Step 2 of the income tax calculation (ITA 2007 s.23). Claimed via self-assessment return for the relevant tax year.
- **Qualifying foreign income categories (ITTOIA 2005 s.845H):** broad scope — approximately 22-23 distinct income types including foreign property income, foreign trade profits, foreign pensions, foreign interest, foreign dividends, foreign savings income, foreign annuities. **Sessions must cross-reference the s.845H verbatim category list at write time before asserting a specific income type qualifies** — the exact count is HMRC-published and verifiable via legislation.gov.uk WebFetch; do NOT rely on the bare "22" or "23" figure without verification per §16.35.
- **Disqualified income (ITTOIA 2005 s.845I):** excludes income derived from UK-related sources via interposition (anti-fragmentation). Cross-verify at write time.
- **Loss of personal allowance + CGT annual exempt amount.** Claiming FIG relief in a tax year causes loss of personal allowance + dividend allowance + CGT AEA for that tax year — same architecture as the historic remittance-basis claim. Sessions writing on FIG must hedge claim mechanics (claim only where foreign income / gains exceeds the lost allowance value).
- **Claim deadline (Stage 2b correction 2026-05-25):** s.845A imposes its OWN deadline — **12 months beginning with 31 January after the end of the relevant tax year** (e.g. for 2025/26 claim, deadline is 31 January 2028). NOT the TMA 1970 s.43 generic 4-year amendment window (s.43 is for return-amendment, not for FIG claim-creation). Late claims forfeit the year's relief; sessions writing on missed-claim recovery cannot rely on s.43.
- **Year-5+ position.** From tax year 5 onwards the individual is taxed on the arising basis as a standard UK resident. No transitional taper; the cliff is hard.

### 17.8.1 Citations for §17.8

- ITTOIA 2005 Chapter 5 ss.845A (claim mechanism + Step 2 deduction), 845B (qualifying new resident test + 4-year window), 845E (loss interactions), 845H (22 categories of qualifying foreign income), 845I (disqualified income).
- FA 2025 s.37 (inserting Act) + Sch 8 (foreign employment income parallel).
- FA 2025 s.40 (remittance basis abolition — no new claims after tax year 2024-25).
- ITA 2007 s.23 (Step 2 of income tax calculation), s.43 (amendment window).
- HMRC RDRM (Residence, Domicile and Remittance Manual) — being rewritten; sessions must verify currency at write time.

### 17.8.2 Do not write (§17.8)

- "FIG relief is automatic for the first 4 tax years" (false — per-year claim required; failure to claim forfeits that year).
- "FIG election preserves personal allowance and CGT AEA" (false — claim forfeits both, same architecture as historic remittance basis).
- "FIG eligibility requires 7 years of prior non-residence" (false — the test is **10 tax years** of prior non-residence per s.845B(1)).
- "FIG covers UK-source income" (false — only foreign source per s.845H + s.845I disqualified-income exclusion).
- "Year 5 is a taper year" (false — hard cliff; arising basis applies from year 5).
- "FIG is in FA 2025 Sch 9" (false — FIG is in FA 2025 s.37 + ITTOIA 2005 ss.845A-845J; Sch 9 removes the historic remittance-basis + domicile architecture but does not contain the FIG regime itself).

---

## 17.9 Temporary Repatriation Facility (TRF) operational mechanics (FA 2025 s.41 + Sch 10) — Wave 8 mini-lock (added 2026-05-25)

**Architectural sibling of §17.6 (headline 3-year at 12%/12%/15% framing).** §17.9 anchors the operative FA 2025 Sch 10 mechanics that Wave 8 Bucket A pages will write to.

- **Statutory anchor.** FA 2025 s.41 + Sch 10. Effective from tax year 2025-26.
- **Rate ramp (verified FA 2025 Sch 10 para 1(8) on 2026-05-25):**
  - **2025-26 designations: 12%** of designated qualifying overseas capital.
  - **2026-27 designations: 12%** of designated qualifying overseas capital.
  - **2027-28 designations: 15%** of designated qualifying overseas capital.
  - Window closes 5 April 2028; no extension currently legislated.
- **Qualifying overseas capital (FA 2025 Sch 10 para 2) — THREE distinct scenarios (Stage 2b correction 2026-05-25 — earlier framing combined scenarios A + B and omitted scenario C):**
  - **Scenario A (para 2(2)):** amount arose in tax year 2024-25 or earlier as foreign income / gains AND has NOT been remitted to the UK by the date of designation. Pre-window unremitted accumulation.
  - **Scenario B (para 2(5)):** amount arose in tax year 2024-25 or earlier as foreign income / gains AND IS remitted to the UK during tax years 2025-26, 2026-27, or 2027-28. In-window remittance.
  - **Scenario C (para 2(8)):** amount that does NOT fall within (2) or (5), was held by the individual immediately before 6 April 2025, AND was situated outside the United Kingdom (the residual "pre-6-April-2025 offshore capital" scenario — captures historic clean-capital-equivalent holdings that don't have the income / gain origin of scenarios A+B).
- **Income/CGT triggers absent TRF (per para 2 cross-references):** would (absent TRF designation) trigger income tax under ITEPA 2003 ss.22 / 26 / 41F / 554Z9 / 554Z10 OR ITTOIA 2005 s.832 OR CGT under TCGA 1992 Sch 1 on remittance.
- **Designation election deadline (FA 2025 Sch 10 para 8(1)):** election must be made before **12 months from 31 January after the end of the tax year**. So 2025-26 designations: deadline 31 January 2028. 2026-27 designations: deadline 31 January 2029. 2027-28 designations: deadline 31 January 2030. Late designation forfeits the rate (post-window remittance falls back to normal rates per the underlying remittance-basis source).
- **Source coverage.** Designation can be partial — election specifies the £-amount designated, not full source coverage. An individual can designate £100k of a £500k pre-2025 offshore portfolio and the remaining £400k stays subject to normal remittance taxation on later remittance.
- **No-clean-capital benefit.** TRF designation effectively crystallises the income / gain status of the offshore amount at the designation rate. Once designated and paid, the amount becomes "clean capital" for UK tax purposes — no further UK tax on later remittance.
- **Interaction with FIG (§17.8).** TRF is for individuals who PREVIOUSLY claimed remittance basis. A new arrival in 2025-26 + later claiming FIG does NOT need TRF (their foreign income is FIG-exempt during the 4-year window). TRF is the cleanup mechanism for the pre-2025-26 remittance-basis cohort.

### 17.9.1 Citations for §17.9

- FA 2025 s.41 (inserting Act) + Sch 10 (operational detail).
- ITEPA 2003 ss.22, 26, 41F, 554Z9, 554Z10 (employment / disguised remuneration remittance triggers).
- ITTOIA 2005 s.832 (foreign-income remittance trigger).
- TCGA 1992 Sch 1 (CGT on remittance trigger).
- ITA 2007 s.809B (the historic remittance-basis claim section, no longer claimable from 2025-26 onwards per FA 2025 s.40).

### 17.9.2 Do not write (§17.9)

- "TRF rate is 12% across all three years" (false — 12% in 2025-26 and 2026-27, 15% in 2027-28).
- "TRF is available to all UK residents" (false — only to those with pre-2025-26 unremitted foreign income / gains from a period when they claimed remittance basis).
- "TRF designation extends beyond 5 April 2028" (false — window closes; no extension legislated).
- "TRF designation deadline is the tax year end" (false — deadline is 31 January 12 months after end of relevant tax year per FA 2025 Sch 10 para 8(1)).
- "TRF requires actual remittance to the UK to claim the rate" (false — designation alone crystallises; the amount becomes clean capital whether or not physically remitted).

---

## 17.10 CGT rebasing election — narrow eligibility (FA 2025 s.42 + Sch 11) — Wave 8 mini-lock (added 2026-05-25)

**Architectural sibling of §17.6 (headline "rebasing to 5 April 2017 value" mention).** §17.10 anchors the FA 2025 Sch 11 eligibility narrowness — most departing UK landlords will NOT qualify, contrary to widespread popular understanding.

- **Statutory anchor.** FA 2025 s.42 + Sch 11. Effective for disposals on or after 6 April 2025.
- **Rebasing date (verified FA 2025 Sch 11 para 1(2) on 2026-05-25): 5 April 2017** (NOT 5 April 2019 or 5 April 2025 — those dates appeared in earlier consultation but were NOT enacted).
- **All FIVE eligibility conditions must be met (FA 2025 Sch 11 para 1(1)) — narrow combination (Stage 2b heading-count correction 2026-05-25 — body listed 5 conditions; heading mis-counted as "four"):**
  1. **Asset held on 5 April 2017** (the rebasing-date condition).
  2. **Disposal on or after 6 April 2025** (the operative window — pre-6-April-2025 disposals fall under the old regime).
  3. **Asset NOT situated in UK between 6 March 2024 and 5 April 2025** — i.e. the asset must have been a non-UK asset throughout that 13-month window. **A UK property held by a non-dom does NOT qualify** (UK situs); the rebasing benefits non-UK assets only.
  4. **Individual not domiciled in UK before tax year 2025-26** — pre-2025-26 non-dom status required.
  5. **Remittance-basis claim history:** individual must have made a **claim under ITA 2007 s.809B for at least one tax year within 2017-18 to 2024-25**, and for those years neither ITA 2007 s.809D (auto-RB) nor s.809E (low-foreign-income exception) applied. So they must have ACTIVELY elected remittance basis at least once in the qualifying window.
- **Election mechanics.** Per FA 2025 Sch 11 para 3:
  - Election is per-disposal (individual may elect for the rebasing NOT to apply for a specific disposal).
  - TMA 1970 ss.42-43 procedural rules apply (except s.42(1A)).
  - **Election is irrevocable** once made for a disposal.
- **Critical: NO UK PROPERTY REBASING.** Condition (3) above excludes UK situs property from rebasing. A departing landlord cannot use FA 2025 Sch 11 rebasing to step up the base cost of UK BTL property. UK land disposals by non-residents are governed by NRCGT (§17.4) which has its OWN rebasing regime (5 April 2015 for residential, 5 April 2019 for non-residential).

### 17.10.1 Citations for §17.10

- FA 2025 s.42 (inserting Act) + Sch 11 paras 1-3 (operational detail).
- TCGA 1992 Sch 1A / 1B / 4AA (NRCGT regime — separate rebasing dates 5 April 2015 / 2019 for UK land).
- ITA 2007 ss.809B (active RB claim), 809D (automatic RB), 809E (small-foreign-income exception).
- TMA 1970 ss.42-43 (election procedure).

### 17.10.2 Do not write (§17.10)

- "Rebasing to 5 April 2017 applies to all non-doms" (false — narrow combination of 5 conditions per FA 2025 Sch 11 para 1(1)).
- "Rebasing covers UK property held by non-doms" (false — condition (3) excludes UK situs assets; UK land follows NRCGT rebasing at §17.4).
- "Rebasing applies automatically" (false — per-disposal election; default IS rebasing for qualifying assets BUT opt-out election available per para 3).
- "Rebasing date is 5 April 2019" (false — 5 April 2017; the 2019 date appeared in earlier consultation but was not enacted).
- "Anyone who used remittance basis can use rebasing" (false — must have made an active s.809B claim, not just automatic s.809D treatment, in at least one tax year 2017-18 to 2024-25).
- "Rebasing election is revocable" (false — irrevocable per Sch 11 para 3; sessions writing planning advice must caveat).

---

## 21.A Corporation tax three-figure framework (FA 2021 architecture, post-1-April-2023) — Wave 8 mini-lock (added 2026-05-25)

**Why this lock exists.** Track 2 manager's F-31 (raised 2026-05-24) surfaced a residual cohort of legacy property pages conflating the three post-FA-2021 CT figures. Site-wide STALE sweep at commit `195e895` back-patched 65 pages + 0 false positives. This mini-lock anchors the framework verbatim so future generation passes cannot regress to the pre-FA-2021 "19% on all profits" mental model. Sits above §21.4 (year-specific rate verification) and §21.5 (CIHC depth) as the architectural headline.

**Architecture — three figures, three regimes, one anti-fragmentation mechanic.**

| Figure | Statutory role | Operative section |
|---|---|---|
| **19% small profits rate (SPR)** | Applies to UK-resident, non-CIHC companies with augmented profits ≤ lower limit | CTA 2010 s.18A (charge) |
| **25% main rate** | Applies to all companies with augmented profits ≥ upper limit, AND to CIHCs at all profit levels | CTA 2010 s.3 (charge); s.18N (CIHC exclusion from SPR) |
| **26.5% effective marginal rate** | The effective rate applied to the slice of profits between the lower and upper limits, achieved via marginal relief calculation with standard fraction 3/200 | CTA 2010 s.18B (marginal relief trigger); s.18D (formula + standard fraction, image-bound on legislation.gov.uk per §16.44; gov.uk consumer guidance confirms 3/200 for 2026/27) |

**Limit thresholds (set by Parliament yearly via FA; verify gov.uk at write time per §16.27 rate-by-reference discipline):**
- **Lower limit £50,000** for tax year 2026/27 (unchanged since 1 April 2023; FA 2021 Sch 1 initial set; confirmed FA 2022/2023/2024/2025/2026)
- **Upper limit £250,000** for tax year 2026/27 (unchanged since 1 April 2023; same FA chain)
- Note: the £ thresholds are NOT hard-coded in CTA 2010; they are confirmed each tax year by the operative Finance Act. Sessions writing 2027/28+ figures must re-verify against gov.uk consumer guidance at write time — same pattern as the s.455 / ITA 2007 s.8(2) rate-by-reference discipline in §21.1 / §21.4.

**Associated-companies divisor (CTA 2010 s.18D + s.18E) — the most-misunderstood mechanic for multi-SPV property portfolios:**
- Where a company has **associated companies** during an accounting period, both the lower limit (£50k) and the upper limit (£250k) are **divided by (1 + N)**, where N = number of associated companies. The divisor formula lives in s.18D's image-bound table; s.18E defines "associated company" status.
- Example: a landlord with 5 BTL SPVs (each holding one property) → each SPV is associated with the other 4 → lower limit per SPV = £50k / 5 = £10k; upper limit per SPV = £250k / 5 = £50k. SPR band collapses to £0-£10k per SPV; marginal relief band £10k-£50k per SPV; main rate above £50k per SPV.
- **Common drift this catches:** "Each of my SPVs gets its own £50k small profits band" — false; associated SPVs share. Multi-SPV portfolios designed for IHT or operational segregation lose most of the SPR benefit unless the SPVs are genuinely independent (e.g. different individual shareholders, no common control test met).
- **Associated company definition shorthand (s.18E + cross-ref to CTA 2010 s.450):** companies under common control by the same person(s); "control" includes 51%+ voting / dividend / assets-on-winding-up. Dormant companies excluded. Non-resident associates count.

**CIHC exclusion from SPR (CTA 2010 s.18N — restating from §21.5 for framework completeness):**
- A close investment-holding company is **always taxed at 25% main rate** regardless of profit level. The SPR is unavailable.
- **Qualifying-purpose carve-out (s.18N(2)(b) + s.18N(3)):** companies whose business is "making investments in land, or estates or interests in land, in cases where the land is, or is intended to be, **let commercially**" are NOT CIHCs. **The "let commercially" exclusion is EXPANSIVE per s.18N(3) statutory wording — a letting is NOT commercial if the land is let to: (a) a person connected with the candidate company; (b) the spouse or civil partner of a connected person; (c) a relative of a connected person; OR (d) the spouse or civil partner of a relative of a connected person.** So "connected" reaches well beyond direct connected-party tenants — sibling/parent/child/uncle/aunt tenants of a connected person all defeat the qualifying-purpose carve-out. (Stage 1a §16.45 drift catch — earlier framing as "let to persons NOT connected with the company" was incomplete; updated 2026-05-25 with the full statutory exclusion.)
- **Property-SPV implication:** standard BTL SPV with unconnected tenants = qualifies for SPR (subject to associated-companies divisor). BTL SPV with family-tenant occupant = potentially CIHC, loses SPR entirely. Mixed portfolios require per-SPV analysis.
- Full CIHC depth in §21.5; this restatement is for framework completeness only.

**"Augmented profits" (CTA 2010 s.18L) — the comparison figure for the threshold tests:**
- Augmented profits = taxable total profits **+** qualifying exempt distributions received from non-group companies (s.18L(1)).
- Distributions from 51% group companies are excluded from the augmentation (s.18L(2)).
- The lower-limit and upper-limit tests are applied to augmented profits, NOT to taxable total profits alone. A company with modest TTP can be pushed into the marginal-relief band by significant dividends-received income.

### 21.A.1 Citations for §21.A

- CTA 2010: s.3 (CT charge), s.18A (SPR charge), s.18B (marginal relief trigger), s.18D (marginal relief formula + standard fraction, image-bound; verify gov.uk for 3/200), s.18E (associated companies definition), s.18L (augmented profits), s.18N (CIHC exclusion + qualifying-purpose carve-out), s.450 (control definition cross-ref).
- FA 2021 c. 26 Sch 1 (inserting Act for the post-1-April-2023 framework; paras 1-3 inserted ss.18A-S; Sch 1 para 34 commencement = effect for financial year 2023 onwards).
- gov.uk consumer guidance: "Corporation Tax rates and allowances" (rates table) and "Marginal Relief for Corporation Tax" calculator page — verify figures at write time.

### 21.A.2 Do not write (§21.A — F-31 drift patterns)

- "Companies pay 19% on the first £250,000" (false — 19% applies up to £50k; £250k is the upper marginal-relief boundary).
- "Small profits rate of 19% for profits under £250,000" (false — £250k is the upper bound; 19% bound is £50k).
- "Companies pay 25% on profits over £50,000" (false — main rate is 25% on profits over £250k; the £50k-£250k slice attracts marginal relief, effective 26.5%).
- "Companies pay 19% CGT" / "Companies pay CGT on property disposals" (false — companies don't pay CGT; they pay Corporation Tax on chargeable gains at the prevailing CT rate per CTA 2009 + CTA 2010, with NRCGT carve-out for non-resident companies disposing of UK land per TCGA 1992 s.1A — see §17.4).
- "Each of my SPVs gets its own £50,000 small profits band" (false — associated SPVs share via s.18D divisor; a 5-SPV portfolio under common control has £10k SPR band per SPV).
- "Dormant companies count towards the associated-companies test" (false — dormant companies excluded per s.18E + standard practice; verify at write time against the operative period).
- "Property investment FICs always get the small profits rate" (false — pure-investment FIC with predominantly investment income may be a CIHC; per §21.5 the s.18N(2)(b) carve-out turns on whether land is let commercially to unconnected persons; FIC holding family-occupied property or connected-tenant property is likely CIHC).
- "FA 2014 abolished the small profits rate permanently" (false in current state — FA 2014 abolished the original s.19 SPR effective 1 April 2015, but FA 2021 Sch 1 reinstated a structurally different SPR + marginal-relief regime effective 1 April 2023. Sessions writing on legacy "single 19% rate" or "single 25% rate" framings must use the FA 2021 architecture, not the FA 2014 abolished position).
- "Marginal relief uses a flat 26.5% calculation" (false — the calculation uses the formula (U − A) × (N/A) × (3/200), where U = upper limit, A = augmented profits, N = taxable total profits; 26.5% is the effective marginal rate that emerges on the slice between limits at the 3/200 standard fraction, not a separate rate applied directly. Sessions must show the worked calculation, not assert a flat figure).

---

## 22.X IHT long-term residence operational depth — IHTA 1984 ss.6A-6C + ss.267ZC-267ZF (FA 2025 architecture) — Wave 8 mini-lock (added 2026-05-25)

**Architectural sibling of §15.6 (headline framing) and §22.5 (spouse-exemption refresh in same commit).** §15.6 names the LTR test as policy framework; §22.X anchors the operative IHTA 1984 sections + tail-period mechanics that Wave 8 Bucket A IHT pages will write to.

### 22.X.1 The s.6A LTR test (10 of 20)

- **Statutory anchor.** IHTA 1984 s.6A, inserted by FA 2025 s.44(2)+(4) + Sch 13 (the s.44 subsections perform the s.6 amendment and the introduction of new s.6A; Sch 13 para 27 inserts ss.267ZC-267ZF; the LTR test itself is in ss.6A-6C). Effective from 6 April 2025.
- **Baseline test.** An individual is a "long-term UK resident" for IHT purposes at any time in a tax year if they were **UK resident for at least 10 of the previous 20 tax years**. The test is applied tax-year by tax-year; LTR status can fluctuate.
- **NOTE on the "10 consecutive years" framing.** §15.6 currently presents the test as "10 consecutive tax years OR 10 of previous 20 tax years" — HMRC consumer-guidance shorthand. The s.6A statutory test is the single 10-of-20 route; 10-consecutive is a trivial subset (10 consecutive implies 10 of 20). Sessions writing on the test may use either framing but must not present them as distinct alternative routes — they describe the same population. The "10 consecutive" framing is helpful for ongoing residents who clearly satisfy the test; the "10 of 20" framing is correct for departed-and-returned cases.
- **"UK resident" for s.6A.** Uses the SRT definition at FA 2013 Sch 45 (see §17.1) — same residence concept as income tax / CGT. No separate IHT residence concept post-FA-2025.

### 22.X.2 The s.6A tail-period table (departure from UK)

- **The architecture.** Once LTR status is established, departure from UK does NOT immediately end LTR status. The individual remains LTR (and within IHT on worldwide assets) for a "tail period" of consecutive non-UK-resident tax years. The required tail length depends on how many years they were UK-resident in the run-up to departure.
- **The lookup table (verified s.6A on 2026-05-25; HMRC consumer guidance corroborates):**

| Prior UK-resident tax years (within last 20) | Required consecutive non-UK tax years to lose LTR |
|---|---|
| 13 or fewer | 3 |
| 14 | 4 |
| 15 | 5 |
| 16 | 6 |
| 17 | 7 |
| 18 | 8 |
| 19 | 9 |
| 20 (all 20) | 10 |

- **Operative implication.** A landlord-emigrant who has been UK-resident for 15 of the last 20 tax years before departure remains LTR (worldwide-asset IHT exposure) for **5 consecutive non-UK tax years** after departure. Pre-FA-2025 architecture for non-doms was a flat 3-year "tail" under deemed-domicile s.267(1)(b); post-FA-2025 the tail scales 3-10 years.
- **Planning consequence.** Departing landlords with long UK residence cannot achieve immediate worldwide-asset IHT exit. Pre-FA-2025 advice anchored on "stay non-UK for 3+ years to break deemed domicile" is now wrong for individuals with 14+ prior UK-resident years; substitute the s.6A table.

### 22.X.3 s.6B young-person variation (under-20s)

- **The architecture.** For individuals under age 20 at the start of the current tax year, the s.6A 10-of-20 test is scaled by reference to their actual life-years. s.6B substitutes:
  - "20" → number of whole tax years for which the person was alive before the current tax year
  - "10" → half that number (rounded up)
- **Edge case.** Individuals under age 1 (or not yet born) immediately before the tax year are NOT LTR per s.6B(3). Useful for trust structures involving young beneficiaries.
- **Operative scope.** Rarely material for landlord-context pages (estate planning is mostly adult-cohort), but Wave 8 Bucket A pages covering family-investment-company succession planning to young beneficiaries should cite s.6B for under-20 settlements.

### 22.X.4 Excluded property regime under LTR (individual-side s.6 + trust-side s.48ZA)

- **Two-section architecture (CRITICAL):** the post-FA-2025 excluded-property regime splits across **two distinct sections** by holder type:
  - **IHTA 1984 s.6 (individual-side).** "Property situated outside the United Kingdom is excluded property if the person beneficially entitled to it is an individual who is not a long-term UK resident." Test: individual's LTR status.
  - **IHTA 1984 s.48ZA (trust-side — NEW, inserted by FA 2025 s.45).** "Excluded property: property situated outside the United Kingdom etc" — applies to settled property; test: settlor's LTR status (or, for settlors who died before 6 April 2025, the historic domicile-at-settlement test is preserved at s.48ZA(4)). **Sessions writing on offshore-trust IHT mechanics MUST use s.48ZA as the trust-side operative section, NOT s.6 (which is individual-side only) and NOT pre-FA-2025 s.48(3)-(3F) (omitted).** Detail at §22.12.
- **Direct implication.** Non-LTR individuals are within UK IHT only on UK situs property. LTR individuals are within UK IHT on worldwide property. The historic domicile-based "excluded property" framework is gone.
- **UK property by non-LTR individuals.** Always within UK IHT regardless of LTR status. Schedule A1 IHTA 1984 enveloped-residential look-through (in force from 6 April 2017) continues to bring UK residential property held via offshore structures into UK IHT.
- **Excluded property trusts (settlor-LTR pivot per s.48ZA).** A trust's excluded-property status now depends on whether the **settlor** was LTR at the time of the addition to the trust (NOT on the settlor's domicile as historically). Trusts settled by non-LTR settlors are excluded property; trusts settled by LTR settlors are within IHT on worldwide assets. Operative section is s.48ZA (not s.6).
- **Transitional for pre-6-April-2025 trusts (s.48ZA(4)).** Trusts settled before 6 April 2025 by then-non-UK-domiciled settlors retain excluded-property status for the property settled before that date — the historic domicile-at-settlement test is preserved at s.48ZA(4) for deceased pre-2025 settlors. Property added AFTER 6 April 2025 is tested under the new LTR settlor regime (so a non-dom settlor who is now LTR adding property post-6-April-2025 loses excluded-property status for that new addition). Detailed transitional provisions in FA 2025 Sch 13 paras 40-46 (predominantly administrative — Excepted Estates Regulations 2004 amendments at paras 40-43; Excepted Settlements Regulations 2008 amendments at para 44; commencement at para 45; pre-commencement-emigrants exemption at para 46). **Sch 13 paras 40-46 do NOT contain the substantive settlor-LTR pivot — that lives in s.48ZA.** (F-6 Stage 2b Wave 8 catch — earlier Stage 2 brief drift mis-attributed substantive provision to Sch 13 paras 40-46.)

### 22.X.5 ss.267ZC-267ZF LTR election framework (post-FA-2025)

- **Statutory anchor.** IHTA 1984 ss.267ZC-267ZF inserted by FA 2025 Sch 13 paras 27 + 45(1) (Stage 2b precision cite — para 27 is the substantive insertion; para 45(1) is the commencement co-reference).
- **s.267ZC: SPOUSAL LTR election (not generic).** Election available only where a spousal/civil-partner LTR connection exists. Condition A (s.267ZC(3)) — within 7 years before the election date, the electing person had a spouse/civil partner who was LTR. Condition B (s.267ZC(4)) — a deceased person was LTR within 7 years before death AND was the spouse/civil partner of the electing person (election made by P or by deceased's personal representatives). NO freestanding "anyone non-LTR can elect" route exists; the spousal-connection gateway is mandatory. Typical use: non-LTR spouse of an LTR transferor electing in to receive unlimited spouse-exemption transfers (per §22.5 / §22.X.6). Cost: brings worldwide assets into UK IHT for the election period. (Stage 1a §16.45 drift catch — earlier framing of "generic LTR election" was misleading; updated 2026-05-25.)
- **s.267ZD: further provision.** Procedural mechanics for s.267ZC elections — timing, revocation rules, cessation events.
- **s.267ZE: pre-FA-2025 domicile election subjects.** Individuals who made a s.267ZA election before 6 April 2025 (when the election was domicile-based) are treated as LTR under the new regime. Preservation route for legacy elections.
- **s.267ZF: DTA tie-breaker.** Where a DTA operates by reference to "deemed domicile" (older treaties still using the pre-FA-2025 concept), s.267ZF provides the bridging rule — deemed domicile is treated as engaged where the individual is LTR. Necessary for older treaties that have not been updated to use LTR language.
- **Critical distinction from s.267ZA + s.267ZB (with 6 April 2032 deferred repeal).** s.267ZA was NARROWED by FA 2025 — the spousal-connection date in s.267ZA conditions A/B must be "before 6 April 2025" within the 7-year window. **s.267ZA + s.267ZB are scheduled for repeal at 6 April 2032** per FA 2025 Sch 13 para 45 (deferred repeal — the 7-year-window mechanic in s.267ZA(3)/(4) means by 6 April 2032 no qualifying pre-6-April-2025 spousal-connection date can still be within a 7-year window, so the sections become operationally dead and Parliament repeals them then). Until 6 April 2032 they remain available for qualifying legacy spousal-connection cases (where the spouse / civil partner was UK-domiciled before 6 April 2025). Sessions writing on spouse-election advice must determine WHICH section applies: s.267ZA if the spousal connection (and pre-6-April-2025 domicile) sits in the legacy window AND the election is being made before 6 April 2032; s.267ZC if the connection sits post-6-April-2025 and the spouse / civil partner was/is LTR. Both are spousal — neither is a generic "anyone elects" route. (F-6 Stage 2b Wave 8 catch — earlier framing "no automatic repeal date" was incorrect; updated 2026-05-25.)

### 22.X.6 Spouse exemption interactions with LTR (cross-reference §22.5)

- **Transferor LTR, receiving spouse LTR:** unlimited exemption per s.18(1).
- **Transferor LTR, receiving spouse non-LTR:** limited exemption per s.18(2) — by-reference to Sch 1 NRB upper limit (currently £325k cumulative lifetime). Receiving spouse can elect under s.267ZC to access full exemption (cost: worldwide assets into IHT scope).
- **Transferor non-LTR, receiving spouse LTR:** full exemption per s.18(1) (transferor LTR-status not required for full exemption; only receiving spouse's matters per s.18(2) wording).
- **Transferor non-LTR, receiving spouse non-LTR:** s.18(1) full exemption applies, BUT — the transferor's non-LTR status means only UK situs property is in UK IHT scope at all (per s.6 excluded property), so the exemption is structurally less consequential. Worldwide non-UK assets are already outside UK IHT.

### 22.X.7 Citations for §22.X

- IHTA 1984: s.6 (excluded property — LTR-based test), s.6A (LTR baseline + tail-period table), s.6B (young-person variation), s.6C (transitional / interpretation), s.7 (rate), s.18 (spouse exemption post-FA-2025 LTR-based), Sch 1 Table (NRB upper limit referenced by s.18(2A)), Sch A1 (enveloped UK residential property look-through, unaffected by FA 2025), ss.267ZC-267ZF (LTR election framework), s.267ZA (transitional pre-6-April-2025 only — narrow).
- FA 2025 c. 8: s.44 (excluded property domicile test replaced with LTR test), s.45 (corresponding change for settled property), s.46 (consequential, connected, transitional), Sch 13 (operational detail).
- FA 2013 Sch 45 (SRT — applied for LTR by cross-reference).
- **OMITTED by FA 2025: IHTA 1984 s.267 (deemed domicile).** Do not cite in post-6-April-2025 content; historic framework gone.

### 22.X.8 Do not write (§22.X)

- "Long-term resident status is lost after 3 years of non-UK residence" (false — only for individuals with 13 or fewer prior UK-resident years; scales 3-10 per s.6A table).
- "Deemed domicile rules at s.267 IHTA 1984" (false — s.267 omitted by FA 2025 from 6 April 2025; cite s.6A LTR test instead).
- "Non-doms can elect into LTR under s.267ZA" (false — s.267ZA narrowed to transitional pre-6-April-2025 domicile-window only; post-FA-2025 election is s.267ZC, which is itself SPOUSAL-only — both routes require a spouse/civil-partner LTR connection).
- "Any non-LTR individual can elect into LTR status under s.267ZC" (false — s.267ZC is SPOUSAL only; Conditions A + B both require a spouse/civil-partner LTR connection within the 7-year window).
- "Excluded property status depends on settlor's domicile" (false — post-FA-2025 depends on settlor's LTR status; cite s.6 IHTA 1984 LTR framework).
- "10 consecutive years of UK residence is a separate test from 10 of 20" (false — 10 consecutive trivially satisfies 10 of 20; they describe the same population; s.6A statute uses single 10-of-20 test).
- "Trusts settled by non-doms pre-6-April-2025 lose excluded-property status from 6 April 2025" (false — pre-6-April-2025 settlements retain excluded-property status for property settled before that date; only post-6-April-2025 additions are tested under new LTR settlor regime per FA 2025 Sch 13 paras 40-46).
- "LTR election is revocable mid-tax-year" (false — verify against s.267ZD procedural rules at write time; revocation generally constrained).
- "DTAs override the LTR test for spouse exemption" (false — s.267ZF provides bridging where treaty uses deemed-domicile language but the LTR test still applies for UK IHT operative purposes).

---

## 28. Transactions in UK land + trading-vs-investment (CTA 2010 Part 8ZB + ITA 2007 Part 9A) — NEW Wave 8 cluster (locked 2026-05-25)

Wave 8 Bucket B cluster. Anchors the anti-fragmentation regime for property developers (commercial + residential) and the trading-vs-investment line for "trader-by-stealth" landlords who flip. Distinct from §21 (LtdCo + FIC operational tax); §22 (IHT estate planning); §17 (expat). Cross-references §5 (CGT on residential property — chargeable-gain alternative to trading treatment); §1 (SDLT — incorporation + connected-party tests parallel the s.356OH fragmented-activities concept); §22.1 (BPR Pawson investment line — IHT-side framing of the same trading-vs-investment test).

### 28.1 Statutory architecture — symmetric corporate + individual regimes (Finance Act 2016)

- **Companies:** CTA 2010 Part 8ZB ss.356OA-356OT, inserted by FA 2016 c. 24 s.77(1). Effective per FA 2016 s.81 — disposals on or after 5 July 2016.
- **Individuals:** ITA 2007 Part 9A ss.517A-517U, inserted by FA 2016 c. 24 s.79(1) + s.82(1). Effective for disposals on or after 5 July 2016.
- **Symmetric architecture** — both Parts mirror each other section-by-section:

| Topic | Companies (CTA 2010) | Individuals (ITA 2007) |
|---|---|---|
| Overview | s.356OA | s.517A |
| Disposals of UK land + four-conditions test | s.356OB | s.517B |
| Profits treated as trading | s.356OC | s.517C |
| Disposals of property deriving value from land | s.356OD | s.517D |
| Profits and losses | s.356OF | s.517F |
| Chargeable person | s.356OG | s.517G |
| Fragmented activities (anti-fragmentation) | s.356OH | s.517H |
| Calculation of profit / surplus | s.356OI | s.517I |
| Apportionments | s.356OJ | s.517J |
| Arrangements for avoiding tax | s.356OK | s.517K |
| Profits attributable to pre-intention period | s.356OL | s.517L |
| Private residences carve-out | (no equivalent) | s.517M |
| Tracing value | s.356OM | s.517N |
| Related parties | s.356OT | s.517U |

- **Operative consequence.** A "transaction in UK land" caught by Part 8ZB / Part 9A is treated as a trade — profit taxed as trading profit (CT for companies; income tax for individuals) at full marginal rates rather than CGT rates. For individuals this can flip an 18% / 24% CGT charge into a 40% / 45% income tax charge plus Class 4 NIC.
- **Non-resident scope.** Both regimes catch non-UK-resident persons — a non-resident corporate developer cannot escape UK trading-tax charge by acting through an offshore structure. Designed to close pre-FA-2016 gap where non-resident developers structured around UK CT scope.

### 28.2 The four-conditions test (s.356OB / s.517B)

A disposal of UK land is caught if the disposal is made by a person within the operative scope AND **any one of Conditions A-D** is met:

- **Condition A — acquisition main-purpose test (verbatim s.356OB(4)):** "the main purpose, or one of the main purposes, of acquiring the land was to realise a profit or gain from disposing of the land."
- **Condition B — derived-property acquisition main-purpose test:** "the main purpose, or one of the main purposes, of acquiring any property deriving its value from the land was to realise a profit or gain from disposing of the land." (catches indirect acquisitions — share purchases in property-rich companies, partnership interest acquisitions, etc.)
- **Condition C — trading-stock test:** "the land is held as trading stock." (deterministic — no main-purpose evaluation needed; if held as trading stock, caught.)
- **Condition D — development main-purpose test:** "(in a case where the land has been developed) the main purpose, or one of the main purposes, of developing the land was to realise a profit or gain from disposing of the land when developed."

- **"Main purpose, or one of the main purposes" wording.** Statutory language is **disjunctive** — multiple "main purposes" can coexist; only one needs to be profit-from-disposal. This makes Conditions A / B / D substantially WIDER than a single-dominant-purpose test. HMRC's published view: investment intent alongside profit intent does NOT defeat the test where profit intent is genuine and substantial.
- **Timing of test.** Condition A tests intent AT ACQUISITION; Condition D tests intent AT DEVELOPMENT (later). A landlord who acquires-to-let (no Condition A) but later develops-to-sell can be caught by Condition D even though Conditions A and B fail. Operative for "convert and flip" cases.
- **Chargeable-person rule + six-month window (s.356OB(2) + s.356OB(8)) — Stage 2b cite refinement 2026-05-25:**
  - **s.356OB(2)** is the CHARGEABLE-PERSON RULE: charge applies to (a) the person acquiring / holding / developing the land, (b) a person associated with the person in (a) at a relevant time, (c) a person who is a party to or concerned in an arrangement within subsection (3).
  - **s.356OB(8)** is the TIME-PERIOD DEFINITION: "relevant time" means "any time in the period beginning when the activities of the project begin and ending 6 months after the disposal mentioned in subsection (1)." This is the six-month window.
  - Same offset for s.517B(2) chargeable-person rule and s.517B(8) time-period definition on the individuals side.
  - **Operative implication:** the "six-month associated-persons window" widely-cited in commentary is the COMBINATION of (2) defining who is caught + (8) defining when the association engages.

### 28.3 Indirect disposals via property-rich entities (s.356OD / s.517D)

- **The mechanism (Stage 2b refresh 2026-05-25 — earlier framing as "parallel four-conditions test" was incorrect).** s.356OD / s.517D applies a DISTINCT THREE-CONDITION framework specific to indirect disposals (NOT a parallel restatement of s.356OB Conditions A-D). The three conditions per s.356OD: (1) a person realises a profit or gain from a disposal of property which (at time of disposal) derives at least 50% of its value from UK land; (2) the person is a party to or concerned in an arrangement concerning some or all of that land; (3) the main purpose (or one of the main purposes) of the arrangement is to (a) deal in or develop the project land AND (b) realise a profit or gain from a disposal of property deriving the whole or part of its value from that land. Captures the "slice of the action" pattern where a developer takes a profit-share via a corporate intermediary rather than direct land disposal.
- **The 50% derivation test.** "Property deriving its value from land" is interpreted in line with NRCGT and other property-rich tests — typically requires ≥50% of value to derive (directly or indirectly) from UK land. Tracing rules at s.356OM / s.517N walk through multi-tier structures.
- **Operative implication.** Cannot escape Part 8ZB / Part 9A by holding land in a SPV and selling SPV shares. Both the direct land disposal route and the share disposal route are caught.

### 28.4 Anti-fragmentation: s.356OH / s.517H

- **The architecture.** Where activities relating to a land disposal are fragmented across multiple persons / entities, the fragmentation rules attribute the activities to the chargeable person for the purpose of applying the main-purpose tests. Defeats the planning pattern of separating "the developer", "the seller", and "the profit-recipient" into different legal persons.
- **Operative implication for landlord-developers.** Cannot insulate a sale entity from a development entity to avoid Condition D. The fragmentation rule treats coordinated activities by associated persons as a single chargeable scheme.
- **Cross-reference to s.356OK / s.517K (arrangements for avoiding tax).** Wider anti-avoidance umbrella over the fragmentation rules.

### 28.5 Badges of trade — caselaw framework for the main-purpose tests

Where the four-conditions test is engaged, the underlying question is **whether the activity is a trade**. Pre-FA-2016 caselaw remains operative for the "main purpose was to realise a profit" evaluation. Leading authorities:

- **Marson v Morton [1986] 1 WLR 1343** — the "nine badges of trade" framework (the canonical multi-factor test):
  1. Subject matter of the realisation (commodities suggesting trading; investment assets suggesting capital)
  2. Length of period of ownership (short = trading; long = investment)
  3. Frequency or number of similar transactions (multiple = trading)
  4. Supplementary work done on the property (development = trading)
  5. Circumstances of realisation (forced sale = capital; marketed sale = trading)
  6. Motive of the taxpayer (profit-intent at acquisition = trading)
  7. Method of financing (short-term borrowing for resale = trading)
  8. Profit-seeking motive
  9. Way the asset was actually used
- **Iswera v IRC [1965] 1 WLR 663** — Privy Council; single-transaction can be trading if profit-intent at acquisition + active steps to enhance value.
- **Salt v Chamberlain [1979] STC 750** — share-dealing investor / trader line; relevant by analogy for high-frequency property dealing.
- **Page v Lowther [1983] STC 799** — single property flip held to be trading; intention at acquisition is decisive.
- **Pickford v Quirke (1927) 13 TC 251** — repeated transactions establish trade even where each individual transaction might look capital.

**Operative use.** Wave 8 Bucket B pages writing on "is this landlord a trader" must work through the nine badges with worked examples. No single badge is determinative; the overall picture decides. The post-FA-2016 transactions-in-UK-land regime is statutory **alongside** the badges-of-trade caselaw — Part 8ZB / Part 9A can catch a transaction that fails the badges test (statutory overrides at the four-conditions level), and the badges test can support a trading conclusion even where Part 8ZB / Part 9A applies.

### 28.6 Trading-stock test (Condition C — s.356OB(6) / s.517B(6))

- **Deterministic test.** Land "held as trading stock" is caught regardless of original intent. No main-purpose evaluation.
- **What is "trading stock"?** Property carried in the trading accounts as inventory (CTA 2009 / ITTOIA 2005 trading-profit computation). Distinguished from fixed-asset investment property carried in non-current assets.
- **Appropriation between trading stock and investment (CTA 2010 s.157; ITTOIA 2005 s.172).** Appropriation INTO trading stock is a deemed disposal at market value for CGT (TCGA 1992 s.161) with subsequent trading profit accounted for the difference between MV and disposal proceeds. Appropriation OUT of trading stock (rare) is a market-value acquisition for CGT.
- **Operative implication.** Landlord-incorporators who transfer property into a development SPV using a trading-stock framing trigger a deemed CGT disposal at incorporation (no s.162 incorporation relief if treated as trading-stock appropriation; s.162 is for business-as-going-concern transfers, not stock appropriations). Wave 8 Bucket B pages on the incorporation route for property developers must distinguish stock-appropriation from going-concern transfer.

### 28.7 Residential Property Developer Tax (RPDT) — IN FORCE per FA 2022

- **FA 2022 Part 2 ss.31-53** introduced RPDT: a 4% additional Corporation Tax charge on residential property developer profits above a £25m group allowance, in force for accounting periods beginning on or after 1 April 2022.
- **STATUS CORRECTED 2026-05-25 (Stage 2b — drift catch in original §28.7 lock):** RPDT is **CURRENTLY IN FORCE** per FA 2022 Part 2 ss.31-53. The previously-locked "REPEALED by FA 2024 s.81 for APs beginning on/after 1 April 2024" claim was **incorrect** — FA 2024 s.81 returns 404 on legislation.gov.uk; FA 2024 + FA(No.2) 2024 contents do NOT contain RPDT-repeal provisions; legislation.gov.uk Finance Act 2022 Part 2 page (verified 2026-05-25) shows "no known outstanding effects" and no repeal amendment. **RPDT applies for accounting periods beginning on or after 1 April 2022 per s.51 FA 2022 commencement** and remains operative. Rate: 4% surcharge on residential property developer profits above the £25m group allowance threshold.
- **Wave 8 Bucket B framing.** B3 (development main-purpose) + B10 (partnership JV) pages must work RPDT into the developer-CT cost calculation where group profits exceed £25m. Pages on smaller-developer CT exposure should note RPDT non-applicability below the threshold. Sessions must verify current RPDT status against legislation.gov.uk at write time per §16.27 rate-by-reference discipline (if RPDT is repealed in a future Finance Act, this lock requires update).

### 28.8 Cross-references with other clusters

- **§5 (CGT residential property) ↔ §28.** The trading-vs-investment line decides between CGT (18% / 24% from 30 October 2024) and trading profit (40% / 45% income tax + Class 4 NIC for individuals; CT for companies). Wave 8 Bucket B pages must work the comparison with worked examples.
- **§21 (LtdCo) ↔ §28.** A property developer incorporating triggers Condition C if trading stock; cannot use s.162 incorporation relief; may use CTA 2010 Part 22 (transfers of trade) instead.
- **§22.1 (BPR Pawson line) ↔ §28.** The IHT-side trading-vs-investment line (Pawson) and the CT/IT-side transactions-in-UK-land line use overlapping but not identical tests. A landlord can fail Pawson (investment for BPR) while also being caught by Part 8ZB / Part 9A (trading for CT/IT) — the tests are NOT interchangeable.
- **§17.4 (NRCGT) ↔ §28.** A non-resident disposal of UK land may be caught by BOTH NRCGT (TCGA 1992 s.1A) and Part 8ZB / Part 9A; Part 8ZB / Part 9A takes priority where engaged (trading profit, not chargeable gain), with NRCGT operating as the capital-gain backstop where the transaction is not trading.
- **§1 (SDLT) ↔ §28.** SDLT on land acquisition is a separate charge applied at acquisition; the transactions-in-UK-land regime catches the DISPOSAL side. No double-charge issue but sessions must keep the two charges architecturally separate.

### 28.9 Citations for §28

- CTA 2010 Part 8ZB ss.356OA-356OT (transactions in UK land — companies; inserted by FA 2016 s.77).
- ITA 2007 Part 9A ss.517A-517U (transactions in UK land — individuals; inserted by FA 2016 s.79).
- FA 2016 c. 24 ss.77, 79, 81, 82 (inserting Act).
- CTA 2009 Part 3 (trading profit computation for companies); ITTOIA 2005 Part 2 (trading profit computation for individuals).
- TCGA 1992 s.161 (appropriation to trading stock deemed disposal), s.1A (NRCGT — backstop).
- CTA 2010 s.157 + Part 22 (intra-group transfers of trade); ITTOIA 2005 s.172 (appropriation from trading stock).
- FA 2022 Part 2 ss.31-53 (RPDT — **IN FORCE** per FA 2022 s.51 commencement; APs beginning on or after 1 April 2022; no outstanding effects per legislation.gov.uk verified 2026-05-25; the previously-locked "repealed FA 2024 s.81" framing was incorrect — FA 2024 s.81 returns 404 and no RPDT-repeal provision exists in FA 2024 or FA(No.2) 2024).
- *Marson v Morton* [1986] 1 WLR 1343 (badges of trade).
- *Iswera v IRC* [1965] 1 WLR 663 (single transaction can be trading).
- *Salt v Chamberlain* [1979] STC 750 (share dealing investor / trader line by analogy).
- *Page v Lowther* [1983] STC 799 (property flip held to be trading).
- *Pickford v Quirke* (1927) 13 TC 251 (repeated transactions).
- HMRC BIM60000+ (Property income / trading distinction); HMRC BIM20000+ (badges of trade); HMRC manual pages on Part 8ZB / Part 9A.

### 28.10 Things to flag (do NOT decide unilaterally)

- Border cases on the main-purpose test where investment intent is genuine and substantial AND profit intent is also present. Statute is disjunctive but HMRC enquiry practice in this area is litigated; case-specific facts decide. Sessions writing border-case pages should hedge with "main purpose evaluation is fact-sensitive; specialist advice required for transactions near the line".
- Whether RPDT has been further amended in any subsequent Finance Act (currently IN FORCE per FA 2022 ss.31-53; verify against current legislation.gov.uk Part 2 page at write time per §16.27 rate-by-reference discipline).
- Whether HMRC has issued new guidance on the s.356OH / s.517H fragmented-activities rule in response to specific schemes (verify HMRC manual currency).
- Whether the "property deriving its value from land" 50% derivation threshold has been adjusted by subsequent legislation.

### 28.11 Do not write (§28)

- "Property profits are always capital gains for individuals" (false — Part 9A catches main-purpose-of-profit acquisitions or developments; can be trading profit taxed at marginal income tax rates plus Class 4 NIC).
- "Selling a single BTL property cannot be trading" (false — *Iswera* + *Page v Lowther* + Condition D show single transactions can be trading where intent at acquisition or development was profit-from-disposal).
- "Holding land for more than 5 years means it's investment" (false — length of ownership is one of nine badges; not determinative; trading classification can apply to long-held land if main-purpose-at-acquisition or main-purpose-of-development was profit-from-disposal).
- "Non-resident developers escape UK tax" (false — Part 8ZB applies to non-resident corporate developers; Part 9A applies to non-resident individual developers; pre-FA-2016 planning routes around UK CT scope are closed).
- "Slice-of-the-action arrangements via offshore SPVs avoid the charge" (false — s.356OD / s.517D catches indirect disposals via property-rich entities; tracing rules at s.356OM / s.517N walk through multi-tier structures).
- "RPDT is repealed" (false — RPDT is currently IN FORCE per FA 2022 ss.31-53; verified live on legislation.gov.uk 2026-05-25; the previously-circulated "repealed FA 2024 s.81" claim cannot be substantiated against the Finance Act 2024 contents).
- "RPDT applies to all residential developers" (false — applies only to groups with >£25m residential developer profit allowance threshold per FA 2022 s.33).
- "Pawson investment treatment for BPR also means investment treatment for CT" (false — Pawson and Part 8ZB use overlapping but distinct tests; a landlord can be investment for BPR + trading for CT/IT).
- "The main-purpose test requires sole purpose" (false — statute uses "main purpose, or one of the main purposes" — disjunctive; multiple main purposes can coexist; only one needs to be profit-from-disposal).
- "s.162 incorporation relief covers all property-business incorporations" (false — s.162 is for going-concern business transfers; trading-stock appropriations are CGT-deemed-disposals at MV without relief; property developers incorporating need CTA 2010 Part 22 trade-transfer route, not s.162).

---

## 25.12 Land Remediation Relief (CTA 2009 Part 14 ss.1143-1175) — Wave 8 mini-lock (added 2026-05-25; closes Wave 6 F-17 inter-wave queue item)

**Architectural sibling of §25 (Capital allowances Wave 6 cluster) and §25.11 (s.198 fixtures election Wave 7 mini-lock).** §25.12 is the COMPANY-ONLY relief for cleaning up contaminated or derelict land — distinct corporate-tax relief outside the capital-allowances framework. Closes F-17 from Wave 6 Session C inter-wave queue.

### 25.12.1 Statutory architecture

- **Statutory anchor.** CTA 2009 Part 14 (ss.1143-1175). Inserted by CTA 2009; original contaminated-land regime carried forward from pre-CTA-2009 architecture. Derelict-land parallel provisions (ss.1145A + 1146A) added by Finance Act 2009.
- **Chapter structure:**
  - Chapter 1: Introduction (s.1143)
  - Chapter 2: Reliefs for expenditure (ss.1147-1150)
  - Chapter 3: Land remediation tax credit (ss.1151-1158)
  - Chapter 4: Special provision for BLAGAB (basic life assurance and general annuity business) (ss.1160-1168) — out of scope for property landlords
  - Chapter 5: Tax avoidance (s.1169)
  - Chapter 6: Supplementary (ss.1170-1175)
- **Scope.** Companies only. Individual landlords cannot claim LRR — must hold land through corporate structure. Property SPVs and FICs holding remediation-eligible land qualify.

### 25.12.2 The 100% + 50% additional deduction (s.1149)

- **The headline.** LRR provides an **additional 50% deduction** on top of the standard 100% revenue / capital deduction for qualifying land remediation expenditure. Total tax-deductible amount: **150% of qualifying expenditure**. Statutory mechanics at CTA 2009 s.1149(8): additional deduction is 50% of qualifying expenditure.
- **Common headline-vs-statute misframing.** Sessions writing on LRR should anchor the framing as **"100% normal deduction + 50% additional deduction = 150% total"** rather than the popular shorthand "150% relief". The "150% relief" framing masks the additive structure and can mislead on interactions with other reliefs.
- **Revenue vs capital treatment (s.1147 vs s.1148).** The relief flexes for revenue-account expenditure (deduction in computing trading profit / property income) and capital-account expenditure (deduction by election under s.1148 in computing profit). Most landlord-developer remediation is capital-account; election under s.1148 required.

### 25.12.3 Qualifying conditions A-F (s.1144)

A company's expenditure qualifies as "qualifying land remediation expenditure" only if ALL six conditions are met:

- **Condition A: Land in contaminated state OR derelict state.** Per s.1145 (contaminated — definitions of "contaminated state" via substance presence / harm-causing potential / pollution of controlled waters) OR s.1145A (derelict — long-period vacancy + buildings or structures present).
- **Condition B: Causation.** "The expenditure would not have been incurred if the land had not been in a contaminated or derelict state." Excludes general site preparation / development expenditure that would have been incurred anyway.
- **Condition C: Relevance.** Expenditure on either "relevant contaminated land remediation" or "relevant derelict land remediation" (defined by reference to ss.1146 / 1146A activity lists — preventing, removing, mitigating contamination effects; demolishing buildings / removing post-tensioned concrete heavyweight construction / etc. for derelict).
- **Condition D: Activity categories.** Expenditure must be on **staffing costs**, **materials**, **contracted-out remediation**, or **qualifying connected sub-contracted remediation**. Overhead and general management costs are NOT qualifying.
- **Condition E: Not subsidised.** Per CTA 2009 s.1144(7) — excludes expenditure where the company has received a notified state aid, grant, or other subsidy covering the cost. Critical for landlord-developers receiving local authority brownfield grants — verify subsidy treatment before claiming.
- **Condition F: Not landfill tax.** Excludes landfill tax payments (landfill tax has its own relief regime).

### 25.12.4 Polluter exclusion (s.1150)

- **The architecture.** LRR is for INNOCENT remediators — companies cleaning up contamination they did NOT cause. s.1150(1) prohibits relief if the contamination or dereliction results "wholly or partly" from acts or omissions by the company OR by persons with a "relevant connection". **"Relevant connection" is defined at s.1178 (Stage 2b cite correction 2026-05-25 — earlier framing pointed to s.1150(2)-(3))** which provides a three-pathway test: (a) person connected to the company at the time of the contamination act/omission; (b) person connected at the time the company acquired a major interest in the land; (c) person connected at the time relevant land remediation was undertaken.
- **Relevant connection (s.1178 — three-pathway test):** (a) person connected to the company at the time of the contamination act/omission; (b) person connected to the company at the time the company acquired a major interest in the land; (c) person connected to the company at the time the relevant land remediation was undertaken (whether by the company or on its behalf). "Connected" follows the CTA 2010 s.1122 definition. Encompasses the company's 51% subsidiaries / parents + persons who held a relevant interest in the land at the relevant pathway time.
- **Acquired-contaminated cases.** Landlord-developer SPVs acquiring contaminated brownfield sites from unrelated vendors are typically eligible — they did NOT cause the contamination. Verify at acquisition diligence: vendor identity, ownership chain, polluter history.
- **Caused-contamination cases.** A company that polluted its own land cannot claim relief on the clean-up. Group structures must be checked — a subsidiary cleaning up contamination caused by a parent / sister company under "relevant connection" is excluded.
- **Operative implication for landlord-developers.** The polluter exclusion is the most-litigated LRR area at HMRC enquiry. Wave 8 Bucket B pages on developer LRR claims must front the polluter exclusion + relevant-connection test + acquisition-diligence framework.

### 25.12.5 Loss-conversion 16% tax credit (s.1154)

- **The architecture.** Where a company obtaining LRR under s.1149 has a tax loss (typical for early-stage developers / pre-revenue SPVs), it may surrender the loss in exchange for a cash payment from HMRC ("land remediation tax credit").
- **Rate (s.1154).** The credit is **16% of qualifying loss surrendered**. Lower than the marginal CT rate, so the credit is economically worse than carrying the loss forward unless cash-flow constraints dominate.
- **Qualifying loss (s.1153).** Defined as the unrelieved trading or property-business loss arising from claiming the s.1149 additional deduction. Capped at the surrendable loss multiplied by 150% of the LRR deduction (limits the credit to the LRR-generated portion of the loss).
- **Election deadline.** Claim made via the corporation tax return for the relevant accounting period; amendment window per FA 1998 Sch 18 (4 years from end of accounting period).
- **Operative implication.** Early-stage developer SPVs with no taxable profit can convert LRR losses to cash at 16p in the £. Late-stage developers with profit prefer the standard 25% CT-saving route (LRR deduction reduces taxable profit at marginal rate).

### 25.12.6 Cross-references with other clusters

- **§25 (CAA 2001 capital allowances) ↔ §25.12.** LRR is OUTSIDE the capital allowances regime — separate Part 14 of CTA 2009. A landlord-developer can claim LRR on remediation expenditure AND capital allowances on plant & machinery installed post-remediation; no double-relief concern because the regimes operate on different expenditure categories.
- **§25.11 (s.198 fixtures election Wave 7) ↔ §25.12.** s.198 fixtures election (purchase-side capital allowances) and LRR (remediation) operate on the same brownfield-acquisition fact pattern but on different cost categories. Sessions writing on brownfield-acquisition tax planning must address both regimes.
- **§28 (Transactions in UK land — Wave 8 Bucket B) ↔ §25.12.** A landlord-developer caught by Part 8ZB (trading) computes profit using LRR as a trading deduction (s.1147). A landlord-developer treated as investment (capital) uses LRR under s.1148 election. The trading-vs-investment line at §28 determines which LRR route applies.
- **§21 (LtdCo + FIC) ↔ §25.12.** LRR is company-only; property FICs holding remediation-eligible land can claim. Individual landlords cannot claim — incentive for incorporating a remediation-vehicle SPV.

### 25.12.7 Citations for §25.12

- CTA 2009 Part 14 ss.1143-1175 (full Part — Land Remediation Relief framework).
- s.1144 (qualifying expenditure conditions A-F).
- s.1145 (contaminated state definition); s.1145A (derelict state definition).
- s.1146 (relevant contaminated land remediation activities); s.1146A (relevant derelict land remediation activities).
- s.1147 (revenue-account deduction); s.1148 (capital-account election).
- s.1149 (the 50% additional deduction — the headline relief mechanic; subsection (8) holds the 50% rate).
- s.1150 (polluter exclusion + relevant-connection rules).
- s.1151-1158 (Chapter 3: land remediation tax credit — loss-conversion to cash).
- s.1154 (tax credit rate: 16% of qualifying loss).
- s.1169 (Chapter 5: tax avoidance).
- CTA 2010 s.1122 (connected persons definition — relevant for s.1150 polluter relevant-connection test).
- FA 2009 (inserting Act for derelict-land parallel provisions s.1145A + s.1146A).
- HMRC Corporate Intangibles Research and Development Manual / Corporation Tax manual pages on LRR (verify currency at write time — manual coverage of LRR is light vs other reliefs).

### 25.12.8 Things to flag (do NOT decide unilaterally)

- **Subsidy interaction at Condition E.** Where the landlord-developer has received any local authority grant / Environment Agency funding / regional development subsidy, verify whether the subsidy reduces qualifying expenditure to nil under s.1144(7). Border cases require specialist tax advice.
- **Polluter relevant-connection at s.1150(2)-(3).** Where the developer group has any historical connection to the polluting entity (acquired a former subsidiary, bought from a sister company, prior shareholder relationship), the polluter exclusion can engage. Flag for case-specific review.
- **LRR repeal / amendment status.** Verify against current FA at write time — LRR has been periodically reviewed; sessions writing on current eligibility must check no recent amendments have changed the 50% rate, the 16% credit, or the qualifying-expenditure conditions.

### 25.12.9 Do not write (§25.12)

- "Land Remediation Relief gives 150% relief" (technically true as a popular shorthand but misframes the architecture — relief is **100% standard deduction + 50% additional deduction under s.1149**; sessions should use the additive framing to surface the interaction with other reliefs correctly).
- "Individual landlords can claim LRR on rental property remediation" (false — LRR is company-only per CTA 2009 Part 14; individuals must incorporate a remediation SPV or claim no LRR).
- "Polluter exclusion only catches direct pollution by the claimant" (false — s.1150(2)-(3) extends to persons with a "relevant connection" including 51% group members and prior interest-holders at the time of the polluting act).
- "Subsidised expenditure still qualifies if the subsidy is small" (false — Condition E at s.1144(7) is absolute; any notified state aid / grant / subsidy on the qualifying expenditure disqualifies that expenditure).
- "Loss-conversion credit gives the same value as carry-forward" (false — credit is 16% of loss vs marginal CT rate (currently up to 25% main rate); credit is economically worse unless cash-flow dominates).
- "LRR applies to landfill tax payments" (false — Condition F at s.1144 excludes; landfill tax has its own relief regime).
- "LRR applies to all dilapidations on derelict buildings" (false — Condition C requires expenditure on "relevant derelict land remediation" per s.1146A activity list; general refurbishment / non-derelict-state dilapidations do NOT qualify).
- "LRR can be claimed alongside capital allowances on the same expenditure" (false — same expenditure cannot be twice-relieved; LRR + capital allowances on DIFFERENT expenditure categories is fine but architecture must be carefully designed).

---

## 29. VAT for property — architectural anchor cluster — Wave 8 mini-lock (added 2026-05-25; Stage 1b HP-gap closure)

**Why this lock exists.** Wave 5 Bucket A was VAT topical-gap deepening (10 picks) but did not lock a dedicated HP cluster — per the manager note at the time, "Bucket A is statute-isolated (VAT is UK-wide; no §X locked; per-write §16.35 verification". Stage 1a sub-agent dispatch for Wave 8 Bucket C (9 picks all VAT-side) surfaced that all 9 seeds anchor to a non-existent "§22 (VAT extension)" placeholder. This §29 closes that HP gap with architectural anchors (statutory section + key SI references + form numbers) so Wave 8 Bucket C Stage 2 sub-agents have a single citation source. Does NOT replace per-write §16.35 verification on figures (rates, thresholds, deadlines change by Budget) — locks the FRAMEWORK only.

### 29.1 VATA 1994 architectural overview — property-relevant Parts and Schedules

- **VATA 1994 s.1.** Charge to value added tax on the supply of goods or services in the United Kingdom. Standard / reduced / zero rates per ss.2-4.
- **VATA 1994 s.31 + Sch 9.** Exempt supplies. Property-relevant exemptions at Sch 9 Group 1 (Land).
- **VATA 1994 s.29A + Sch 7A.** Reduced-rate (5%) supplies. Property-relevant reduced rates at **Sch 7A Group 6** ("Residential conversions" — includes the changed-number-of-dwellings sub-category per Group 6 Notes) and **Sch 7A Group 7** ("Renovation or alteration of qualifying residential premises" — empty-homes relief; properties unoccupied for ≥2 years). (Stage 2b correction 2026-05-25 — earlier framing of Group 7 as "changed number of dwellings" was wrong; changed-number is a Group 6 conversion category, Group 7 is the empty-homes / 2-year-vacancy relief.)
- **VATA 1994 s.30 + Sch 8.** Zero-rate supplies. Property-relevant zero rates at Sch 8 Group 5 (construction of dwellings) and Group 6 (protected buildings — narrowed by FA 2012 to alterations only).
- **VATA 1994 Sch 10.** Option to tax framework — the election regime that converts otherwise-exempt land supplies into taxable supplies + input-tax recovery on related costs.
- **VATA 1994 s.49.** Transfer of business as a going concern (TOGC) framework.
- **VATA 1994 ss.43-43D.** Group registration framework.
- **SI 1995/2518 regs 112-116 (Part XV).** Capital Goods Scheme (CGS) — adjustment over 10 years on capital expenditure ≥£250,000 on land or buildings. (Stage 2b correction 2026-05-25 — earlier framing cited VATA 1994 s.26B as enabling but s.26B is the FLAT-RATE SCHEME, not CGS; CGS enabling powers sit elsewhere in VATA 1994 with operational detail entirely in SI 1995/2518 Part XV.)
- **SI 1995/2518 regs 99-110.** Partial exemption framework (standard method + special method).

### 29.2 Sch 9 Group 1 (exempt land default + 14+ carve-outs to standard-rated)

- **Default position:** the grant of any interest in or right over land, or of any licence to occupy land, is an EXEMPT supply unless caught by a carve-out.
- **Standard-rated carve-outs to the exempt default — Sch 9 Group 1 Item 1 paragraphs (a)-(n):**
  - **(a)** holiday accommodation grants (FHL-type seasonal lettings)
  - **(b)** parking facilities
  - **(c)** hunting / shooting rights
  - **(d)** sporting rights
  - **(e)** mineral and timber extraction rights
  - **(f)** entries in betting / gaming venues
  - **(g)** caravan pitches (non-permanent)
  - **(h)** seasonal tent / camping pitches
  - **(i)** mooring / aircraft housing
  - **(j)** boxes / seats at sporting / cultural venues
  - **(ja)** facilities for sport / physical recreation (gym memberships)
  - **(k)** safe-deposit
  - **(ka)** **self-storage of goods** — inserted by **FA 2012 Sch 26 paras 5(2) + 7(1)** with effect from 1 October 2012. Self-storage facility lettings are STANDARD-RATED by default, NOT exempt land supplies.
  - **(l)** advertising displays / installations
  - **(m)** premium services in clubs / restaurants
  - **(n)** related catering
- **Operative implication for Wave 8 C8 (self-storage page):** the page must front the standard-rated carve-out at para (ka). Competitor pages still framing self-storage as "exempt land supply" are pre-FA-2012-Sch-26 stale.

### 29.3 Sch 10 option to tax — election, revocation, disapplication

- **Election to opt (Sch 10 para 2):** notification to HMRC on **VAT 1614A** (or its current successor form). Notification within 30 days of effective date. HMRC acknowledges; option then in force.
- **Cooling-off revocation (Sch 10 para 23):** option can be revoked within 6 months of effective date provided no input tax has been recovered on related costs AND no taxable supplies under the option have been made. **VAT 1614C** form.
- **20-year revocation (Sch 10 para 25):** option in force ≥20 years can be revoked. **VAT 1614J** form. Pre-revocation conditions on capital goods scheme + connected-party rules.
- **Automatic disapplication for dwellings (Sch 10 para 5):** option does NOT apply to grants of buildings "designed or adapted, and intended, for use as a dwelling or number of dwellings, or solely for a relevant residential purpose". Automatic — no election by recipient required.
- **Recipient-certified disapplication (Sch 10 para 6):** recipient can disapply the option by certifying intended use as dwelling / relevant residential purpose. **VAT 1614D** certificate.
- **Developers of exempt land anti-avoidance (Sch 10 para 12):** option does NOT apply where the grant is made by a developer of exempt land in certain anti-avoidance fact patterns — caught: developer + grant to connected party + recipient intends mixed-use. Distinct from paras 5/6.
- **Real estate election (Sch 10 para 21):** election to opt all current and future interests in land owned by a person — **VAT 1614E** (election). REE revocation is NOT a numbered form — revocation is by Commissioner direction only under para 21(5) for non-compliance. **VAT 1614F** is the separate "Exclude a new building from an option to tax" form for paragraph 21(3)-(5) new-building carve-outs from an existing REE (not for revoking the REE itself).
- **Prior permission required (Sch 10 paras 28-30):** option may require HMRC prior permission in certain anti-avoidance fact patterns — application is on **VAT 1614H** ("Apply for permission to opt to tax land or buildings"). HMRC's decision returns as a letter, not a numbered form. (Correction 2026-05-25 Stage 2b F-5 catch — earlier "VAT 1614B" framing was incorrect; VAT 1614B is the "Stop being a relevant associate to an option to tax" form, used for relevant-associate cessation, NOT prior permission.)
- **Housing-association disapplication (Sch 10 para 10):** opt-to-tax does NOT apply on the grant of land sold to a relevant housing association where the recipient certifies on **VAT 1614G** ("Disapply the option to tax land sold to housing associations"). Distinct from §29.3 paras 5/6 dwelling disapplications.
- **Relevant-associate cessation (Sch 10 para 22):** a relevant associate connected to an opter can cease that status on **VAT 1614B** ("Stop being a relevant associate to an option to tax").

### 29.4 TOGC (VATA 1994 s.49 + SI 1995/1268 reg 5)

- **The mechanism.** Transfer of a business as a going concern is OUTSIDE the scope of VAT — no VAT charged on the transfer, no input-tax recovery issue for the transferee.
- **Conditions (SI 1995/1268 reg 5):** (a) the assets transferred are to be used by the transferee in carrying on the same kind of business as the transferor; (b) transferee is or immediately becomes a taxable person; (c) for property transfers — transferee opts to tax + notifies before tax point AND any beneficial-occupier-status condition is met.
- **Option-matching rule for property TOGCs:** where the transferor has opted to tax, the transferee MUST opt to tax (and notify HMRC) BEFORE the tax point to qualify for TOGC treatment. Failure = standard-rated supply with VAT chargeable.

### 29.5 Capital Goods Scheme (SI 1995/2518 Part XV regs 112-116)

- **Threshold:** capital expenditure on land or buildings ≥**£250,000** (excluding VAT) triggers the CGS.
- **Adjustment period:** 10 intervals (10 years).
- **Adjustment mechanic:** annual recalculation of recoverable input tax based on the asset's use for taxable (recoverable) vs exempt (non-recoverable) purposes. Adjustments either return additional recoverable input tax to the taxpayer OR claw back over-recovered amounts.
- **Use changes:** a switch from taxable to exempt use (e.g. opt-to-tax revocation; tenant change from commercial to residential) triggers clawback.

### 29.6 Partial exemption (SI 1995/2518 regs 99-110)

- **Standard method (reg 101).** Apportions residual input tax (non-attributable to either taxable or exempt supplies) based on the value of taxable supplies as a proportion of total supplies. Default; no HMRC approval required.
- **Special method (reg 102).** Approved alternative method tailored to the business. Requires PRIOR HMRC approval; once approved, must be used consistently.
- **Standard-method override (reg 107A inserted by SI 2002/1074, effective 18 April 2002).** Where the standard method materially distorts the recoverable amount, the taxpayer must adjust to a fair-and-reasonable basis. Override is taxpayer-initiated; HMRC may direct a special method via reg 102B (HMRC-direction route). (Stage 2b cite correction 2026-05-25 — earlier SI 2002/1142 cite was wrong.)
- **De minimis (reg 106).** Where exempt input tax is below £625/month average AND ≤50% of total input tax, the trader is "below de minimis" and can recover ALL input tax (including the exempt portion). Annual computation.

### 29.7 Reduced rate 5% — Sch 7A Group 6 (residential conversions)

- **Trigger.** "Qualifying services" (typically construction and renovation services) supplied in the course of "qualifying conversions" of non-residential / mixed-use property into wholly residential use.
- **Qualifying conversions (Sch 7A Group 6 Notes):** include (a) conversion of a non-residential building into a single household dwelling; (b) conversion of one or more buildings into multiple-occupancy dwellings; (c) changed-number-of-dwellings conversions per Group 7.
- **Developer recovery flow.** Where developer makes onward sale of the converted property as a zero-rated first-grant-of-major-interest in a dwelling (Sch 8 Group 5), the 5% input VAT on conversion services is FULLY recoverable. Where onward use is exempt (e.g. residential letting), the 5% input VAT enters the partial exemption calculation.

### 29.8 VAT registration thresholds (rate-by-reference)

- **Standard registration threshold:** £90,000 (up from £85,000 from 1 April 2024). Verify against gov.uk at write time per §16.27 rate-by-reference discipline (same pattern as s.455 / s.8(2)).
- **De-registration threshold:** £88,000 (up from £83,000 from 1 April 2024). Generally £2,000 below the registration threshold.
- **Group registration (s.43-43D):** related corporate entities under common control can register as a VAT group. Intra-group supplies disregarded; single VAT return; joint and several liability.

### 29.9 Citations for §29

- VATA 1994 c. 23: s.1 (charge), s.4 (scope), ss.26B + 43-43D (CGS + group registration), s.29A + Sch 7A (reduced rates), s.30 + Sch 8 (zero rates), s.31 + Sch 9 (exempt supplies), s.49 (TOGC), Sch 10 (option to tax).
- VATA 1994 Sch 9 Gr 1 Item 1 paragraphs (a)-(n) — exempt-default carve-outs (paragraph (ka) self-storage inserted by FA 2012 Sch 26 paras 5(2) + 7(1)).
- VATA 1994 Sch 7A Group 6 (residential conversions reduced rate) + Group 7 (changed number of dwellings).
- VATA 1994 Sch 10 paras 2 (election), 5 (dwelling automatic disapplication), 6 (recipient certification VAT 1614D), 12 (developers of exempt land anti-avoidance), 21 (real estate election), 23 (cooling-off revocation), 25 (20-year revocation), 28-30 (prior permission).
- SI 1995/1268 reg 5 (TOGC conditions).
- SI 1995/2518 regs 99-110 (partial exemption — standard method 101, special method 102, override 107A, de minimis 106) + regs 112-116 (CGS).
- FA 2012 c. 14 Sch 26 paras 5(2) + 7(1) (inserting self-storage standard-rated carve-out at Sch 9 Gr 1 para (ka)).
- HMRC VAT manuals (VATLP — Land and Property), Notice 706 (partial exemption), Notice 700/9 (TOGC), Notice 742 + 742A (land + option to tax), Notice 708 (buildings + construction), Notice 706/2 (CGS).
- VAT 1614 form series (verified against gov.uk publication pages 2026-05-25; F-5 Wave 8 catch — earlier mapping mis-attributed B/F/G/H):
  | Form | Verified verbatim title | Operative use |
  |---|---|---|
  | VAT1614A | "Tell HMRC about an option to tax land and buildings" | Standard option notification (Sch 10 para 2), 30-day window |
  | VAT1614B | "Stop being a relevant associate to an option to tax" | Relevant-associate cessation (Sch 10 para 22) — NOT prior permission |
  | VAT1614C | "Revoke an option to tax within 6-month cooling off period" | Sch 10 para 23 cooling-off revocation |
  | VAT1614D | "Certificate to disapply the option to tax buildings" | Sch 10 para 6 recipient-certified residential conversion |
  | VAT1614E | "Opting to tax land and buildings: notification of a real estate election" | Sch 10 para 21 REE notification |
  | VAT1614F | "Exclude a new building from an option to tax" | Sch 10 para 21(3)-(5) new-building exclusion from an existing REE — NOT revoke REE |
  | VAT1614G | "Disapply the option to tax land sold to housing associations" | Sch 10 para 10 housing-association disapply |
  | VAT1614H | "Apply for permission to opt to tax land or buildings" | Sch 10 paras 28-30 prior permission — NOT 1614B |
  | VAT1614J | "Revoke an option to tax after 20 years" | Sch 10 para 25 20-year revocation |

### 29.10 Things to flag (do NOT decide unilaterally)

- Whether HMRC has issued new permission-requirement direction or updated form numbers since the §29.3 lock — verify form currency at write time.
- VAT rate / threshold changes at each Budget — sessions writing thresholds (£90k / £88k / £250k CGS) must verify against gov.uk at write time per §16.27 rate-by-reference discipline.
- Whether the CGS £250k threshold or 10-year adjustment period has been amended (unchanged since SI 1995/2518 enactment but verify).
- Special-method approval timelines + HMRC standard-method-override direction practice — case-specific; specialist advice required for border cases.

### 29.11 Do not write (§29)

- "Self-storage is exempt land supply" (false — STANDARD-RATED since 1 October 2012 via Sch 9 Gr 1 para (ka) inserted by FA 2012 Sch 26).
- "All land supplies are exempt by default" (true in general but Sch 9 Gr 1 Item 1 paragraphs (a)-(n) carve out 14 categories to standard-rated; sessions must check the carve-out list).
- "Option to tax is permanent" (false — cooling-off revocation within 6 months per Sch 10 para 23; 20-year revocation per Sch 10 para 25).
- "Option to tax applies to residential property" (false — automatic disapplication for dwellings per Sch 10 para 5; recipient certification per para 6).
- "Sch 10 para 12 covers residential conversion disapplication" (false — para 12 is "developers of exempt land" anti-avoidance; residential disapplication is paras 5 + 6).
- "TOGC applies to property transfers without conditions" (false — option-matching + notification-before-tax-point + same-kind-of-business conditions per SI 1995/1268 reg 5).
- "CGS adjustment is 5 years" (false — 10 intervals / 10 years for land + buildings; the 5-year period is for capital goods other than land).
- "Special method approval is automatic" (false — requires prior HMRC approval per reg 102).
- "Standard registration threshold is £85k" (false — £90k from 1 April 2024).
- "Reduced rate is 0%" (false — 5% per Sch 7A; 0% is zero-rating per Sch 8 — different regimes).
- "Group registration is available to all related entities" (false — common-control test under s.43-43D; specific eligibility conditions; HMRC can refuse).
- "VAT is recoverable on all professional fees for property acquisitions" (false — recoverability depends on the onward use of the property: taxable use = full recovery; exempt use = no recovery; mixed = partial exemption calculation).

---


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

---

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

### 30.4 Premium powers (post-LURA 2023) — MW3 Stage 2b F-105 refinement (2026-05-28)

**Statutory insertion architecture (verified verbatim against legislation.gov.uk 2026-05-28):**
- **LURA 2023 s.79 "Long-term empty dwellings: England"** amends LGFA 1992 **s.11B** (long-term empty premium).
- **LURA 2023 s.80 "Dwellings occupied periodically: England"** inserts LGFA 1992 **s.11C** ("Higher amount for dwellings occupied periodically: England") and **s.11D** ("Section 11C: regulations" — Secretary-of-State regulations-making power to specify excepted classes of dwelling).

**Premium powers:**
- **Empty-property premium (LGFA 1992 s.11B, as amended by LURA 2023 s.79):** LAs can charge up to 100% premium after 1 year empty (reduced from 2 years pre-LURA 2023). After 5 years: up to 200%. After 10 years: up to 300%. Each LA sets its own policy.
- **Second-home premium (LGFA 1992 s.11C, inserted by LURA 2023 s.80):** LAs can charge up to 100% premium for furnished second homes where (a) "there is no resident of the dwelling" AND (b) "the dwelling is substantially furnished" (s.11C(2) verbatim). Each LA sets its own percentage up to the 100% ceiling by determination (s.11C(1)).
- **s.11C(3) one-year notice rule:** "A billing authority's first determination under this section must be made at least one year before the beginning of the financial year to which it relates." Practical consequence: LAs that determined in 2023 could first impose the premium from **1 April 2024** (FY 2024/25); LAs that determined later (most tourism-area LAs) first impose it from **1 April 2025** (FY 2025/26). Sessions citing the effective date must distinguish the statutory floor (1 April 2024) from the commonly-adopted date (1 April 2025).
- **s.11C(5):** mutual exclusion with s.11A(3)/(4)/(4A) determinations for the same class of dwellings.
- **s.11C(7)+(8):** LA must publish notice in at least one local newspaper within 21 days of determination (validity not affected by failure under s.11C(9)).
- **s.11D regulations gate:** Secretary of State may specify by regulations classes of dwelling excepted from s.11C (e.g. dwellings being actively marketed for sale, dwellings undergoing probate). Sessions writing on exceptions cite the latest in-force SI under s.11D.
- **Premium interactions:** a single owner-occupier with a second furnished home pays single-person discount on their main residence + the second-home premium on the second property (where LA has adopted).

**Do not write:** "LURA 2023 s.81" (s.81 is street-naming, unrelated to council tax). "LURA 2023 inserted s.11C" without crediting s.80. "Premium in force from 1 April 2024" without acknowledging the s.11C(3) notice rule. "Premium from 1 April 2025" as the statutory commencement (it is the common tourism-area adoption date, not the statutory floor).

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

---

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


## 1.N SDLT appeal procedure + late-appeal jurisdiction — FA 2003 Sch 10 + Martland framework — MW1 mini-lock (added 2026-05-26)

Closes F-5 from MW1 Stage 2b. Anchors MW1 A15 (`ftt-refuses-late-sdlt-appeal-where-appellants-chose-not-to-seek-professional-advice`) plus any future procedural-explainer SDLT pages. §27 covers income-tax appeal procedure but is anchored on TMA 1970 s.28A / s.31A, a distinct statutory line.

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
  - **Martland v HMRC [2018] UKUT 178 (TCC)** — the controlling three-stage framework for late appeals: (1) length of delay; (2) reasons for delay; (3) all the circumstances of the case.
  - **Denton v T H White Ltd [2014] EWCA Civ 906** — imported into the tax-tribunal framework via Martland; the Court of Appeal three-stage test for relief from sanction.
  - **BPP Holdings Ltd v HMRC [2017] UKSC 55** — Supreme Court emphasis on statutory compliance + the courts' general approach to time limits. Anchor authority on the importance of meeting statutory deadlines.
  - **HMRC v Katib [2019] UKUT 189 (TCC)** — agent failures (e.g. accountant failing to file) vs personal responsibility; an agent's failure does not generally provide a "good reason" for late filing.
  - **MW1 Stage 2b case-citation closure (2026-05-26, F-4): R & E Goonesena v HMRC [2024] UKFTT 619 (TC)** (TC09240), 25 June 2024, Tribunal Judge Abigail McGregor. The on-point recent FTT decision applying Martland to "did not seek professional advice" reasoning. Para 22: conscious-decision finding. Para 47: Martland-framework synthesis on shortage-of-funds/professional-advice not being weighty in themselves.
- **The "no professional advice" reasoning line:**
  - The FTT regularly considers (and typically rejects) appellants' arguments that they did not take professional advice on SDLT.
  - The reasoning runs: SDLT is a self-assessed tax; the obligation to file accurately + appeal within time rests with the taxpayer; not seeking professional advice is generally not a "good reason" for delay under Martland step 2.
  - This is a recurring FTT pattern. MW1 A15 page is the deep-dive on this line, citing Goonesena [2024] UKFTT 619 (TC) as the controlling recent decision.
- **Two procedural routes for SDLT overpayment / wrong-classification:**
  - **Sch 10 para 35 appeal route:** lodge within 30 days of HMRC's appealable decision (closure notice, amendment, assessment). Permission to appeal out of time = Martland framework.
  - **Sch 10 para 34 overpayment relief route:** alternative where the appeal window has lapsed. Four-year time limit from the end of the relevant chargeable period. Requires HMRC's agreement OR FTT review of refusal.
  - The two routes are NOT interchangeable: para 35 requires an appealable HMRC decision; para 34 does not. Pages should surface the distinction clearly.
- **Pages anchored to this lock:**
  - A15 (`ftt-refuses-late-sdlt-appeal-where-appellants-chose-not-to-seek-professional-advice`) — anchor page
  - Future SDLT procedural-explainer pages in this cluster
- **Do not write:**
  - "Late-appeal applications routinely succeed" (false; the Martland framework + BPP set a high bar; most late SDLT appeals fail).
  - "No professional advice is a good reason for delay" (false; the FTT typically rejects this reasoning — Goonesena confirms).
  - "The 30-day window can be extended at the FTT's discretion freely" (false; permission to appeal out of time requires Martland-framework demonstration).
  - "Overpayment relief and appeal route are interchangeable" (false; the para 34 / para 35 routes have distinct statutory triggers and time limits).
  - "An agent's failure to file is a good reason for the taxpayer" (false; Katib UKUT rejects this absent exceptional circumstances).
- **HMRC manual anchor:** SDLTM50000+ (SDLT compliance + enquiries + appeals).
- **Practical writing rule for sessions:** lead with the statutory window (30 days, FA 2003 Sch 10 para 35), then the Martland three-stage framework, then the "no professional advice" pattern as a recurring FTT theme (anchored by Goonesena). Always distinguish the para 35 appeal route from the para 34 overpayment route.

---

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

---

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
- Future planning permission + change-of-use cluster (MW3 territory) — CIL applies on chargeable development including most material changes-of-use.

### 32.7 Do not write

- "CIL applies to all property purchases" (false; CIL applies on chargeable DEVELOPMENT, not purchase. A buyer of an existing dwelling does not pay CIL.)
- "s.106 obligations transfer to subsequent owners freely" (partially false; s.106 obligations bind successors in title via Land Registry notice, but specific obligation wording determines transferability + enforceability).
- "CIL exemptions apply automatically" (false; most CIL exemptions require formal notice + procedural compliance — self-build exemption reg.42 has specific notice-of-chargeable-development + commencement-notice + 3-year clawback rules).
- "CIL rates are set nationally" (false; each charging authority sets its own rates via examination-confirmed Charging Schedule).
- "The s.106 5-pooling restriction still applies" (false; repealed by LURA 2023).
- "CIL replaced s.106" (false; they coexist with distinct roles).

### 32.8 Practical writing rule for sessions

Lead with the distinction between CIL and s.106 (national framework + LA rates vs bespoke negotiated obligation). Specify whether the property in question is purchase-of-existing-dwelling (no CIL) or development (CIL chargeable subject to exemptions). For self-build exemption pages, surface the procedural-discipline requirements + 3-year clawback aggressively. For LURA 2023 reform pages, verify commencement status at write.

---

# MW2 Stage 1b mini-lock extensions (locked 2026-05-27)

Locked by Stage 1b conductor session on 2026-05-27 after MW2 Stage 1 closed at 60/60 picks. The locks below populate gaps surfaced by MW2 sub-agents (12 HP-extension flags raised across F-1..F-6, F-50..F-52, F-100, F-106). F-101 was info-only (no lock needed). Section numbering reconciled against existing §29 / §30 / §31 / §32 to avoid conflicts with prior MW1 locks. Stage 2 writers on MW2 picks (and downstream MW3+) should thread to these locks rather than self-sourcing the underlying statutes.

---

## 11.B ECCTA 2023 Part 2 — Limited Partnership reforms — MW2 mini-lock (added 2026-05-27)

**Scope.** §11.B extends the §11 + §11.A companies-side ECCTA framework (Part 1) with the **Part 2 reforms** that bring limited partnerships under LPA 1907 into a CA-2006-style regime. The MW2 A3 seed (`companies-house-changes-limited-partnership-requirements`) writes against this lock; A7 / A16 / A18 cross-reference where their taxonomy must distinguish PA-1890 general partnership from LPA-1907 LP from LLPA-2000 LLP.

- **Statutory hooks.** ECCTA 2023 Part 2 (ss.109-148, amending LPA 1907); Limited Partnerships Act 1907 as amended; commencement SIs (separate from companies-side rollout under §11.A); LRA 2002 Sch 4A (HMLR disposition-block where applicable).
- **§11.B.1 ECCTA 2023 Part 2 section range.** Part 2 sections amend specified LPA 1907 sections (registered office, annual confirmation, GP ID verification, striking-off, information-disclosure obligations). Stage 2 writers verify verbatim section headings via WebFetch against legislation.gov.uk at write time per §16.35.
- **§11.B.2 Commencement chain.** Companies House operational rollout for LP reforms is phased and SI-controlled separately from companies-side rollout per §11.A. Sessions verify current commencement state at the **campaign page** per §11.A F-12 (`https://changestoukcompanylaw.campaign.gov.uk/`) — do NOT use the deprecated `gov.uk/government/news/changes-to-uk-company-law` URL.
- **§11.B.3 Operative new obligations for LPs.** Registered office (appropriate-address rule mirroring §11 + ECCTA Part 1 s.28-30); annual confirmation (GPs + LPs + nature of business); GP ID verification routing through s.66 ACSP regime per §11.A; striking-off powers; information-disclosure obligations.
- **§11.B.4 GP ID-verification routing.** New + existing GPs must verify via the ACSP framework (§11.A.7 + §11.A.8). The ACSP route is preferred for non-UK-resident GPs over the GOV.UK One Login interactive flow.
- **§11.B.5 RoE interaction.** Where an overseas-LP holds UK property, the overseas entity must register under ECTEA 2022 RoE regime per §11.A. Companies House then holds **two registrations**: the RoE entry on the entity itself, and the LP register entry on the LP. Both must remain current; lapse of either triggers consequences per §11.A.
- **§11.B.6 Property-LP-specific implications.** Property-fund LPs (English limited partnership widely used in real-estate fund finance); JV-development LPs; family-investment LPs holding tenanted property. Each faces material new compliance overlay vs. pre-ECCTA position.
- **§11.B.7 Tax-side preservation.** ECCTA Part 2 changes **compliance only** — tax-transparency of LPs (ITTOIA 2005 Part 9, TCGA 1992 s.59) is unchanged. Do not write that LP tax treatment has changed.

**Pages anchored to this lock.** MW2: A3 (LP compliance changes seed). Cross-reference candidates: A7 (partnership taxonomy), A16 (partnership agreement), A18 (sole-trader vs partnership). Existing site: none currently dedicated to LP-side post-ECCTA (gap candidate for MW3+).

**Do not write.** "LP-Act-1907 compliance is light-touch" (post-ECCTA, no longer true); "LP only files on changes" (annual confirmation now required); "LP has no registered office obligation" (it now does); "LP compliance is the same as LLP" (false; separate Acts, separate sub-regimes); "RoE doesn't apply to LPs" (false where overseas entities are GP/LP holding UK property).

---

## 11.C Partnership statutory architecture — PA 1890 + ITTOIA 2005 Part 9 + TCGA 1992 s.59 + FA 2003 Sch 15 — MW2 mini-lock (added 2026-05-27)

**Scope.** §11.C is the unified partnership statutory architecture lock covering general partnerships (PA 1890), the tax-transparency framework (ITTOIA 2005 Part 9), CGT mechanics (TCGA 1992 s.59 + HMRC SP D12), and SDLT-side mechanics (FA 2003 Sch 15 — cross-references §1.A). Five+ MW2 Bucket A picks consume this lock (A7, A10, A14, A15, A16, A18). §11.C.X / §11.C.Y / §11.C.Z below extend §11.C with sub-regimes (salaried-member, mixed-membership, LLP accounts).

- **Statutory hooks.** Partnership Act 1890 s.1 + s.2 + s.14 + s.24; ITTOIA 2005 Part 9 ss.846-863; ITA 2007 s.852; TCGA 1992 s.59 + HMRC SP D12; FA 2003 Sch 15; TMA 1970 s.12AA. All verified verbatim against legislation.gov.uk by sub-agents at A7 / A10 / A14 / A15 write time.
- **§11.C.1 PA 1890 s.1 four cumulative tests.** Two-plus persons + business + in common + with a view of profit. All four required; failure of any → no partnership exists in law.
- **§11.C.2 PA 1890 s.2 negative tests.** Particularly **s.2(1) joint property / co-ownership negative** — load-bearing for property audiences; one of the most common landlord misframings (joint ownership of a let property does NOT, by itself, create a partnership).
- **§11.C.3 PA 1890 s.2(3) profit-share prima-facie rule.** Receipt of a share of profits is prima-facie evidence of partnership, subject to six rebuttal heads at s.2(3)(a)-(f) — debt repayment, remuneration of employee, annuity to widow/child, loan interest, annuity, sale of goodwill.
- **§11.C.4 HMRC operative guidance map.** **BIM72005-72165** (partnership identification); **BIM72015** specifically (joint ownership of property — the operative HMRC line on s.2(1)); **PIM1030** (jointly owned property); **SDLTM33000+** (SDLT partnership Sch 15 mechanics, cross-reference §1.A); **SP D12** (CGT statement of practice on partnerships).
- **§11.C.5 SA800 partnership return obligation.** TMA 1970 s.12AA is the operative trigger — once partnership exists, SA800 is mandatory regardless of profit level.
- **§11.C.6 ITTOIA 2005 Part 9 partnership tax-transparency framework.** Sections 846-863 establish the look-through framework; ITA 2007 s.852 notional-trade rule.
- **§11.C.7 TCGA 1992 s.59 fractional-interest framework.** SP D12 introduction / withdrawal / share-rebasing / dissolution treatment.
- **§11.C.8 FA 2003 Sch 15 partnership-SDLT regime.** Para 1 "business" definitional gate (cross-reference §1.A); para 10 incorporation relief sum-of-lower-proportions (SLP) mechanics (cross-reference §1.A.5 step-by-step). Lock holds the gating definitional layer + the operative reliefs.
- **§11.C.9 Entity distinction.** PA 1890 general partnership / LPA 1907 LP (cross-reference §11.B) / LLPA 2000 LLP / CTA 2010 + CA 2006 limited company (cross-reference §21). Entity-choice forks for property audiences.

**Pages anchored to this lock.** MW2: A7 (does-your-business-qualify-as-a-partnership) / A10 (hybrid-LLP) / A14 (LLP accounts, cross-ref §11.C.Z) / A15 (LLP taxation benefits) / A16 (partnership agreement) / A18 (sole-trader vs partnership). Future MW3+ partnership picks thread here.

**Do not write.** "Joint ownership = partnership" (s.2(1) PA 1890 negative); "sharing gross returns = partnership" (s.2(2) negative); "SA800 is optional where profits are low" (s.12AA mandates where partnership exists); "all partnerships get Sch 15 reliefs on incorporation" (para 1 business gate required); "civil partnership = business partnership" (CPA 2004 vs PA 1890 conflation — different concepts entirely).

### 11.C.X Salaried-member rules + post-BlueCrest HMRC PM276000+ guidance (LLP sub-regime) — MW2 sub-lock

**Scope.** Extends §11.C with the salaried-member regime that targets **individual** LLP members. Sibling to §11.C.Y mixed-membership (which targets corporate members). Both regimes can fire on the same LLP simultaneously. MW2 A11 (`hmrcs-new-guidelines-for-llps-raise-concerns`) writes against this lock; A10 / A14 / A15 cross-reference.

- **§11.C.X.1 ITA 2007 s.863A-G regime architecture.** Three conjunctive Conditions — A: 80% disguised salary; B: lack of significant influence over the affairs of the partnership; C: capital < 25% of disguised salary. All three required for reclassification.
- **§11.C.X.2 BlueCrest Supreme Court [2024] UKSC 33.** Condition B "significant influence over the affairs of the partnership" does NOT require whole-LLP influence; influence over a significant part can be enough. This **narrows** the safe-harbour reading the FTT/UT had taken; matrix-silo'd member roles may not count post-BlueCrest.
- **§11.C.X.3 HMRC PM276000+ updated 2025 guidance.** Operative current text — Stage 2 writers verify at write time per §16.35. Narrower view of significant influence consistent with BlueCrest.
- **§11.C.X.4 Operative practical safe harbour.** Condition C capital-contribution route (≥25% capital takes member OUT of the regime). Easier to demonstrate in practice than Condition B significant influence.
- **§11.C.X.5 s.863G anti-avoidance overlay.** Catches contrived Condition C arrangements (round-trip loans; sham contributions; capital at no real economic risk).
- **§11.C.X.6 Operative consequence of reclassification.** PAYE + secondary Class 1 NIC at LLP level (15% from 6 April 2026 per FA 2026 — verify rate at write per §16.27) + Apprenticeship Levy (0.5% above £15k allowance) + late-payment-penalty regime + interest, all backdated.

**Do not write.** "Condition C requires 25% capital" (inverted — <25% IN, ≥25% OUT); "BlueCrest narrowed Condition B for everyone" (only narrowed the influence-over-the-whole-vs-part dimension); "salaried-member rules don't apply to property LLPs" (false — apply to all LLP business types regardless of trading/investment status); "BlueCrest was bad for taxpayers" (mixed — narrowed Condition B on one point; affirmed safe-harbour structure overall).

### 11.C.Y Mixed-membership partnership rules + hybrid LLP architecture (ITA 2007 ss.850C-E) — MW2 sub-lock

**Scope.** Extends §11.C with the mixed-membership regime that targets **corporate** members. Sibling to §11.C.X salaried-member (which targets individual members). FA 2014 anti-avoidance pair. MW2 A10 (`hybrid-limited-liability-partnership`) writes against this lock; A4 (corporate tax planning pillar) cross-references where lever-discussion touches hybrid LLPs.

- **§11.C.Y.1 Hybrid LLP structure baseline.** LLPA 2000 imposes no restriction on member type; corporates can be members; Companies House operates no separate hybrid classification.
- **§11.C.Y.2 ITA 2007 s.850C-E mixed-membership regime architecture.** Three operative steps: (i) corporate member allocated profit share; (ii) "excess" test — corporate's share > arms-length commercial entitlement; (iii) "power to enjoy" test — individual member directly or indirectly able to benefit from corporate's allocated profits. All three steps required for reallocation.
- **§11.C.Y.3 Reallocation mechanism.** Excess profits + power to enjoy → reattributed to individual member taxed at marginal rate, with double-tax credit for corporate's CT paid. Outcome is generally worse than the original structure intended; double-tax credit only partially neutralises.
- **§11.C.Y.4 HMRC PM236500-PM238000 operative guidance.** Stage 2 writers verify current text at write per §16.35.
- **§11.C.Y.5 Interaction with salaried-member rules (§11.C.X).** Distinct regimes; mixed-membership targets corporate member; salaried-member targets individual member; both can fire on the same LLP simultaneously.
- **§11.C.Y.6 Residual legitimate hybrid-LLP uses.** Asset protection (where corporate's commercial entitlement is real); succession planning via FIC corporate member (cross-reference §21.5 + §22.6); external-investor inclusion (institutional / PE corporate member with no individual power-to-enjoy link).

**Do not write.** "Hybrid LLPs are illegal" (lawful under LLPA 2000); "mixed-membership rules apply to all hybrid LLPs" (only where excess + power-to-enjoy both met); "Section 24 is solved by a hybrid LLP" (mixed-membership rules systematically dismantle the income-splitting attraction for typical founder-LtdCo setups); "mixed-membership rules and salaried-member rules are the same thing" (different regimes, different targets); "double-tax credit makes reallocation neutral" (only partially — operational outcome is generally worse).

### 11.C.Z LLP accounts + SORP + designated member framework (SI 2008/1911 + LLP SORP + FRS 102 Section 22 substance test) — MW2 sub-lock

**Scope.** Extends §11.C with the operational-accounts spine that sits parallel to the tax-side architecture. MW2 A14 (`llp-accounts`) writes against this lock; A10 hybrid-LLP and A11 salaried-member cross-reference where accounts-side equity-vs-liability classification has cascade implications.

- **§11.C.Z.1 LLPA 2000 + SI 2008/1911 statutory architecture.** SI applies CA 2006 Part 15 + Part 16 to LLPs with modifications (Sch 1 + Sch 2 modifications); members' interests instead of share capital; designated members carry director-equivalent responsibility.
- **§11.C.Z.2 LLP SORP.** CCAB-published; 2025 revision current — Stage 2 verifies at write per §16.35. Operative GAAP overlay for LLP-specific accounting treatments.
- **§11.C.Z.3 FRS 102 Section 22 + LLP SORP application.** Equity-vs-liability substance test for members' interests; commonly liability where puttable on retirement or where contractual obligation to repay exists; cascade implications for balance-sheet presentation + members' remuneration treatment.
- **§11.C.Z.4 Members' remuneration accounts split.** Expense vs appropriation; automatic-allocation per LLP agreement triggers expense; discretionary-allocation post-profit triggers appropriation; SORP-driven; **independent of tax-side allocation** per ITTOIA 2005 + s.863.
- **§11.C.Z.5 "Loans and other debts due to members".** Specific LLP balance-sheet line under SI 2008/1911 + LLP SORP — distinct from share-capital line on company balance sheets.
- **§11.C.Z.6 Designated members responsibility.** LLPA 2000 ss.6-9 applied CA 2006 ss.451-453; minimum 2 required; carry statutory accounts + filing responsibility with criminal + civil exposure for default. Not honorific.
- **§11.C.Z.7 Audit exemption thresholds.** Small-LLP exemption per applied CA 2006 s.477 + s.479 (turnover ≤ £10.2m, balance sheet ≤ £5.1m, ≤ 50 employees in 2 of 3 — Stage 2 verifies post-uplift wording at write per recent threshold-uplift policy); exemption denied where members holding ≥10% require audit per applied s.476; group consolidation trigger; regulated-sector LLPs ineligible.
- **§11.C.Z.8 Filing windows.** Applied CA 2006 s.441 (9 months from end of accounting reference period; first accounts 21 months from incorporation); abridged accounts per applied s.444; filleted accounts per applied s.444A omitting P&L from public filing.
- **§11.C.Z.9 Property-investment LLP fair-value treatment.** FRS 102 Section 16 commonly elected; **NO LLP-level deferred tax** (LLP tax-transparent); cleaner accounts presentation vs LtdCo Section 29 deferred-tax overhead.
- **§11.C.Z.10 Post-ECCTA LLP-side operational overlay.** Cross-reference §11.B per F-1; registered email + appropriate registered office + ID verification + ACSP framework for designated members; phased rollout separate from companies-side per LLP-side SI implementation.

**Do not write.** "LLP accounts are the same as company accounts" (false — SI 2008/1911 modifications apply throughout); "all members' interests are equity" (false — Section 22 substance test gates this); "members' remuneration is always appropriation" (false — automatic allocation triggers expense treatment); "audit exemption is automatic for small LLPs" (false — ≥10% members can require audit per applied s.476); "LLPs must use IFRS" (false — FRS 105 / FRS 102 commonly used); "FRS 102 fair-value gains trigger LLP-level deferred tax" (false — LLP tax-transparent, no LLP-level CT charge); "designated members are honorific" (false — director-equivalent statutory responsibility).

---

## 21.8 Multi-company group operation (CT group relief + SDLT group relief + dividend conduit + change-of-ownership loss restriction) — MW2 mini-lock (added 2026-05-27)

**Scope.** §21.8 extends §21 (single-SPV Ltd Co + FIC operation, §21.1-§21.7) with multi-company group operation. MW2 A8 (`eligible-groups-for-group-relief-under-uk-corporation-tax`) writes against this lock; A6 marginal-relief pillar cross-references where associated-company gating overlaps with 75% group test.

- **§21.8.1 CT group relief 75% test.** CTA 2010 s.131 (basic test) + s.1154 (definition of 75% subsidiary) + Sch 18 equity-holder overlay (defeats 100%-ordinary-share-capital-but-fails-economic-substance arrangements) + s.156 worldwide-group; consortium relief at ss.143-149 **limited to trading consortium-companies** (property-investment JV LtdCos do NOT qualify; developer JVs may).
- **§21.8.2 SDLT group relief 75% test.** FA 2003 Sch 7 para 1 — **structurally similar but legally distinct** from CT 75% test; 3-year intra-group claw-back at Sch 7 para 3.
- **§21.8.3 Dividend conduit through HoldCo.** CTA 2009 Part 9A intra-group dividend exemption (s.931A+) — small-company exemption limited; large-company exemption broader; conditions for class-of-distribution exemption.
- **§21.8.4 Associated-company gating for marginal relief.** CTA 2010 s.18D-J post-FA 2021 — counts all **associated** companies (broader than 75% group; control test under s.450+) when allocating the £50k / £250k marginal relief thresholds. **Critical interaction:** group structuring decisions optimising group relief may dilute marginal relief thresholds across associated companies.
- **§21.8.5 Change-of-ownership loss restriction.** CTA 2010 Part 14 — s.673 + s.674 + s.676. Operative when buying loss-making target SPVs. Pre-acquisition losses sterilised by s.673; post-acquisition losses restricted where major change in nature/conduct of trade.
- **§21.8.6 Property-investment-vs-trading line for group purposes.** UK property businesses are typically **investment** (CTA 2009 Part 4). Consortium relief unavailable to investment JVs. Trading-investment line at CTA 2010 s.1124-1126 + ITTOIA 2005 s.5 + extensive case-law (cross-reference §28 Wave 8 trading-vs-investment cluster).

**Pages anchored to this lock.** MW2: A8 (group-relief eligibility seed). Existing site: `property-company-group-relief-corporation-tax`, `sdlt-group-relief-for-corporate-landlord-portfolios`, `sdlt-group-relief-schedule-7-fa-2003-claw-back-connected-party-recovery-depth`, `multi-company-group-extraction-spv-holding-co-dividend-conduit-mechanics`. Future change-of-ownership / consortium / SSE-group-interaction picks thread here.

**Do not write.** "100% ordinary share capital = automatic CT group relief" (Sch 18 overlay can disqualify); "CT and SDLT 75% tests are the same" (different regimes, different tests, different claw-back); "associated companies = 75% group" (associated-company test under s.450+ control test is broader); "consortium relief works for investment JVs" (trading-only); "intra-group dividends are always tax-free" (CTA 2009 s.931A+ class exemptions are conditional).

---

## 22.21 RoE trust-disclosure 2025 expansion — MW2 mini-lock (added 2026-05-27)

**Scope.** §22.21 extends §11.A (ECCTA / ECTEA) and §22.16 (TRS) with the 2025 expansion of public access to trust information on the Register of Overseas Entities (RoE). Previously available only to law enforcement and legitimate-interest applicants; the 2025 expansion regulations made under ECCTA 2023 amending powers broaden access to structured-public. MW2 C18 (`public-access-to-trust-data-on-the-uk-register-of-overseas-entities-expanded`) writes against this lock.

- **Statutory hooks.** ECTEA 2022 ss.4 / 7 / 8 / 34; ECCTA 2023 Part 3 amending powers; LRA 2002 Sch 4A (HMLR disposition-block); MLR 2017 SI 2017/692 reg 45 / reg 76. 2025 expansion SI reference flagged for Stage 2 verification at legislation.gov.uk before commencement-tense claims.
- **§22.21.1 Three-layer disclosure-expansion timeline.** ECTEA 2022 baseline (register existence + legitimate-interest access only) → ECCTA 2023 amendments + 1 March 2024 commencement (HMRC + LEA expansion) → 2025 expansion SI (structured-public access). Stage 2 verifies specific SI reference + commencement date at write.
- **§22.21.2 Scope of newly-public trust information.** Trustee identity, trust name, trust type, beneficiary names or classes (exact list per SI — Stage 2 verifies).
- **§22.21.3 Redaction architecture.** Personal safety grounds + vulnerable persons + residential addresses + DOB carve-outs preserved.
- **§22.21.4 RoE-vs-TRS register distinction (CRITICAL).** Companies-House-administered **RoE** structured-public vs HMRC-administered **TRS** non-public. Critical for property audiences with overseas-entity ownership structures. Cross-reference §22.16 for TRS.
- **§22.21.5 Non-application of CJEU Sovim in the UK post-Brexit.** CJEU C-37/20 + C-601/20 (Sovim) narrowed AML5 public access in EU member states. UK left EU pre-judgment; CJEU rulings don't bind UK post-Brexit. UK continues post-Brexit policy under ECCTA framework expanding (not restricting) RoE public access.

**Pages anchored to this lock.** MW2: C18 (RoE trust-disclosure expansion). Cross-reference candidates: any future RoE / TRS / overseas-trust-property-holding compliance pages.

**Do not write.** "RoE is private like TRS" (false — RoE is structured-public, TRS is not); "Sovim restricted UK RoE access" (false — UK left EU before Sovim; CJEU rulings don't bind UK post-Brexit); "2025 expansion is voluntary" (false — statutory, SI-controlled); "only trustees have to register" (false — RoE registers the overseas-entity not the trust per se).

**CRITICAL RUN-session caveat.** SI reference must be verified against legislation.gov.uk before commencement-tense claims; use conditional framing ("the 2025 expansion regulations, once commenced, will...") if SI cannot be verified at write time.

---

## 29.12 VAT artificial separation — Sch 1 para 2 directions in property contexts — MW2 sub-lock (added 2026-05-27)

**Scope.** §29.12 extends the §29 VAT architectural anchor cluster with anti-disaggregation mechanics under VATA 1994 Sch 1 paras 1A + 2 (single-taxable-person directions). MW2 B3 (`artificial-separation-and-vat-key-insights-from-cases`) writes against this lock; future FHL / serviced-accommodation / multi-SPV VAT pages cross-reference.

- **Statutory hooks.** VATA 1994 Sch 1 para 1A (purpose of the direction power); Sch 1 para 2 (the direction power itself); Sch 1 para 1(1) registration threshold (rate-by-reference per §29.8, currently £90,000 from 1 April 2024 per Spring Budget 2024); VATA 1994 s.4 (taxable supply); s.94 (business); Sch 9 Group 1 (exempt residential lettings boundary, cross-reference §29.1); Sch 10 (option to tax, cross-reference §29.1).
- **§29.12.1 Three-link test.** Financial + economic + organisational links — operative standard from successive FTT decisions + **HMRC VAT Notice 700/1** + VBNB / V1-28 internal guidance. Substance-over-form discipline.
- **§29.12.2 Property-business application.** (a) FHL / short-stay accommodation post-FHL-income-tax-abolition (8 December 2023 Budget retained 20% VAT rating for short-stay accommodation; VAT registration threshold continues to bite where aggregated FHL turnover crosses); (b) serviced accommodation; (c) multi-SPV portfolio operators with parallel management LLPs (cross-reference §11.C); (d) **residential-letting carve-out** — pure exempt income outside Sch 1 para 2 reach; mixed standard-rated services pull part of the business back in.
- **§29.12.3 Effective-date discipline.** Sch 1 para 2 directions are **prospective only** (cannot retro-impose registration on past supplies). Appeal under VATA 1994 s.83 does NOT stay the direction unless tribunal orders.
- **§29.12.4 Leading-case map.** Stage 2 writers verify case-law citations verbatim at write per §16.36 strict gate. Sub-agent flagged candidate names in B3 brief with strict-verification gate.

**Pages anchored to this lock.** MW2: B3 (artificial separation VAT seed). Cross-reference candidates: existing `landlord-vat-registration-when-required`, `togc-vat-property-letting-business`, future FHL / serviced-accommodation / multi-SPV VAT picks.

**Do not write.** "HMRC can retro-tax past supplies under Sch 1 para 2" (false, prospective only); "residential lettings can never trigger Sch 1 para 2" (false where mixed standard-rated services are charged); "spouse co-ownership alone shows artificial separation" (false — financial + economic + organisational links collectively required); "HMRC gives clearance on separated structures" (no formal route — substance-over-form reviewed retrospectively).

---

## 33. Construction Industry Scheme (FA 2004 Part 3) — property-business context floor — MW2 extension (locked, 2026-05-27)

**Scope.** New top-level §33 covering the Construction Industry Scheme — income-tax withholding regime on payments to construction subcontractors. Distinct from VAT domestic reverse charge (sibling regime; both can trigger on same payment but operate on different bases). MW2 B4 (`beginners-guide-to-cis-verification-in-the-uk`) writes against this lock; future property-developer-compliance / REIT-capex / BTL-refurb / HMO-capex pages cross-reference.

- **Statutory hooks.** FA 2004 Part 3 (ss.57-77) with operative anchors at s.62 (deduction obligation), s.63 (registration for gross payment or for payment under deduction), s.64 (gross-payment registration tests), s.66 (cancellation of registration), s.69 (verification of subcontractor registration status), s.70 + ss.71-72 (returns + records). **SI 2005/2045** (Income Tax (Construction Industry Scheme) Regulations 2005) as the operational implementation.
- **§33.1 In-scope categorisation for property businesses.** (a) **Property developers** — mainstream contractor under FA 2004 s.59(1)(k), always in scope when paying subcontractors for construction operations; (b) **property-investment companies + large landlord groups** — **deemed contractors** under FA 2004 s.59(1)(l) + Sch 11A once average annual construction-related spend crosses the **deemed-contractor £3 million rolling-12-month threshold** under FA 2021 reforms in force 6 April 2021 (rate-by-reference per §16.27; verify against current SI at write); (c) **REITs / property funds / HMO operators with capex programmes** — same deemed-contractor logic; (d) **pure-residential individual landlords (not businesses)** — OUT of scope as contractors. Stage 2 sub-agent verifies the precise individual-vs-business boundary at HMRC CIS Manual + Sch 11A wording at write per §16.35.
- **§33.2 Verification process (FA 2004 s.69 + SI 2005/2045).** Contractor obtains subcontractor identifiers; HMRC system returns one of three statuses (gross-payment / registered-for-deduction / unregistered); HMRC issues verification reference (typically valid 2 tax years for that contractor-subcontractor relationship); contractor applies correct withholding rate.
- **§33.3 Withholding rates.** FA 2004 s.62 + s.61(2) + SI 2005/2045 reg 6: gross-payment = 0%; registered-for-deduction = 20% of labour element; unregistered = 30% of labour element. **Materials portion excluded from deduction base** under s.61(2) + SI reg 6.
- **§33.4 Returns + penalties.** FA 2004 s.70 + SI 2005/2045 + FA 2009 Sch 55/56: monthly **CIS300 return** required even if no payments (nil-return rule); late-filing penalty exposure on nil-returns is a common operational trap; under-deduction penalty exposure where contractor pays without verifying.
- **§33.5 Interaction with VAT domestic reverse charge for construction.** CIS = income-tax withholding on subcontractor labour. Reverse charge = VAT-side regime where customer accounts for VAT. **Both trigger simultaneously on the same payment but operate on different bases.** Cross-reference existing `domestic-reverse-charge-construction-vat-landlords` page.

**Pages anchored to this lock.** MW2: B4 (CIS verification beginner). Existing site: `domestic-reverse-charge-construction-vat-landlords` (VAT-side sibling). Future capex / refurb / property-developer-compliance / REIT-capex picks thread here.

**Do not write.** "All landlords need to register for CIS" (false — pure-residential individual landlords are NOT contractors); "CIS only applies to property developers" (false — deemed-contractor threshold pulls in property-investment companies with high capex); "verification is a one-off step per subcontractor" (false — typically valid 2 tax years; re-verify when window expires); "you don't need to file CIS returns in months with no payments" (false — monthly nil-return required); "CIS deduction is on the full payment" (false — labour element only).

---

## 34. Landlord allowable expenses + home-office cross-tax trap — operational floor — MW2 extension (locked, 2026-05-27)

**Scope.** New top-level §34 covering landlord-allowable-expenses architecture (ITTOIA 2005 s.272 imports trading rules into property businesses) and the **home-office cross-tax trap** under TCGA 1992 s.224(1) PPR business-use restriction. MW2 B5 (`claim-home-office-deduction-landlords`) writes against this lock; future motor / training / professional-fees / capital-vs-revenue deep-dives cross-reference.

- **Statutory hooks.** ITTOIA 2005 s.271 (property business charge); s.271E (GAAP calculation); **s.272 (Application of trading income rules: GAAP — the operative import gateway)**; s.34 (wholly-and-exclusively, imported); s.94H (simplified expenses, imported); TCGA 1992 s.224(1) (PPR business-use restriction); ITEPA 2003 ss.316A-317 (Ltd Co employer-provided home-working allowance); CTA 2009 s.54 (Ltd Co rental-paid-to-director route).
- **§34.1 Statutory architecture.** ITTOIA 2005 s.272 is the operative import gateway — trading-business deduction rules apply to property business GAAP calculation. HMRC PIM section anchors (Property Income Manual).
- **§34.2 Home-office two-route choice + CGT-trap (CRITICAL).** (a) **ITTOIA s.94H simplified flat-rate** (hours-based, no exclusive-use requirement, no CGT downside); (b) **ITTOIA s.34 actual-cost apportionment** (potentially higher deduction but **exclusive-business-use characterisation triggers TCGA 1992 s.224(1) PPR restriction on disposal**). Decision-tree framing for which to choose by portfolio size + home-business-use intensity; documented mixed-use as the avoidance route.
- **§34.3 Cross-tax discipline (LOAD-BEARING).** Where an income-tax claim characterises a fact (e.g. "this room is used exclusively for the property business"), the same characterisation flows through to CGT, IHT, and HMRC enquiry. Writers MUST surface cross-tax consequences before recommending route choices. Material consumer-protection exposure: a Stage 2 writer recommending the actual-cost route to a reader who would then lose 14% of their PPR exemption on home sale costs tens of thousands.
- **§34.4 Ltd Co-landlord home-office mechanic.** ITEPA 2003 ss.316A-317 (employer-provided home-working allowance £6/week / £312/year) vs formal home-office rental between director and company (CTA 2009 s.54 + ITTOIA s.272 + director's individual-side ITTOIA s.272/s.94H/s.34 + TCGA s.224(1) on director's PPR). Cross-reference §21.3.

**Pages anchored to this lock.** MW2: B5 (home-office deduction landlords). Existing site: `landlord-expenses-allowable-uk-2026` (pillar — back-patch candidate to add home-office CGT trap). Future motor-expenses / training-costs / professional-fees / capital-vs-revenue picks thread here.

**Do not write.** "The simplified £10/month always wins" (false — actual-cost can be higher; depends on home-business-use intensity); "actual-cost apportionment doesn't affect PPR" (false — exclusive-business-use room characterisation triggers s.224(1)); "Ltd Co director can claim home-office on the corporation tax side directly without involving the director's personal tax" (false — must route through ITEPA s.316A-317 allowance OR formal rental; both have personal-side mechanics).

---

## 35. Payroll mechanics for property-business employers — MW2 extension (locked, 2026-05-27)

**Scope.** New top-level §35 covering PAYE / NIC / Apprenticeship Levy / auto-enrolment as employer duties for property-business employers. Distinct from §3 MTD for ITSA (individual-side), §11.A ECCTA (companies-side compliance), §21 Ltd Co + FIC operational tax (CT, dividends, ER allowance edges). MW2 C1 / C5 / C7 (payroll cluster) write against this lock.

- **Statutory hooks.** ITEPA 2003 (Parts 2, 3, 4, 11); SI 2003/2682 (PAYE Regulations — key regs 21, 67B, 67E, 67G, 73); SSCBA 1992 Part 1 (NIC — primary + secondary Class 1, Class 1A on BIK, Class 1B on PSAs); FA 2016 ss.99-121 (Apprenticeship Levy); Pensions Act 2008 (auto-enrolment).
- **§35.1 Operative 2026/27 rate stack.** PT, ST, UEL, EA £10,500, Apprenticeship Levy £15k allowance, AE 8% total. **Rates by-reference per §16.27** — sessions verify at write time against current HMRC publications, not against this lock.
- **§35.2 Property-business specifics.** (a) **Employment Allowance single-director bar** — LtdCo BTL with sole director-shareholder doesn't qualify; (b) **Apprenticeship Levy connected-employer aggregation** under FA 2016 s.101 for portfolio operators with multiple SPVs — the £3m payroll threshold + £15k allowance is shared across associated employers; (c) **BIK touchpoints for landlord-employers** — employer-provided live-in accommodation for property managers per ITEPA 2003 ss.97-113; pool-vehicle vs employer-provided-car for refurb foremen; (d) **employment-vs-self-employment Ready Mixed Concrete line** for on-call refurb labour and HMO property managers; (e) **corporation-tax interaction** — salary + employer NIC + AL are CT-deductible per CTA 2009 Part 3.
- **§35.3 IR35 / off-payroll-working interaction.** Cross-reference future IR35 lock (currently not held). Stage 2 writers verify CEST / status-determination-statement workflow at write per §16.35.

**Pages anchored to this lock.** MW2: C1 (UK payroll taxes pillar) / C5 (payroll reporting regulations) / C7 (running payroll effectively). Future IR35 / employment-status / Ltd Co landlord PAYE picks thread here.

**Do not write.** "All LtdCos get the Employment Allowance" (single-director bar excludes BTL SPVs); "Apprenticeship Levy starts at £3m for each company" (connected-employer aggregation under s.101); "PAYE registration is automatic" (must be applied for before first payday); "RTI annual P35 is required" (P35 framework superseded by RTI from 2013/14).

---

# MW2 Stage 1b sign-off (2026-05-27)

**Locks added.** §11.B (ECCTA Part 2 LP reforms) / §11.C (Partnership statutory architecture) + §11.C.X (salaried-member) + §11.C.Y (mixed-membership) + §11.C.Z (LLP accounts) / §21.8 (multi-company group operation) / §22.21 (RoE trust-disclosure 2025 expansion) / §29.12 (VAT artificial separation) / §33 (CIS property-context floor) / §34 (landlord allowable expenses + home-office CGT trap) / §35 (payroll for property-business employers). 11 mini-locks closing 11 of 12 HP-extension flag candidates raised across MW2 Stage 1 (F-1, F-2, F-3, F-4, F-5, F-6, F-50, F-51, F-52, F-100, F-106). F-101 was info-only (Wave 2 A10 s.117 erratum already self-corrected at A10 write time, no lock needed).

**A19 SSE redirect-vs-proceed decision (DEFERRED).** A19 `substantial-shareholding-exemption-sse` flagged HIGH CANNIBAL risk with shipped `substantial-shareholding-exemption-property-companies` (2026-05-22). Carved by sub-agent as "deeper statutory-mechanics reference layer" but the differentiation may not be operationally sustainable. **Decision deferred to Stage 2 dispatch:** if Stage 2 sub-agent confirms the deeper-layer carve survives full statutory expansion, proceed; if not, REDIRECT the A19 slug to the existing comprehensive page (the slug retains generic-search-term capture funnelling).

**Stage 2 unlocked.** Sessions can now dispatch Stage 2 brief extensions for all 60 MW2 picks via `./scripts/rolling-orchestrator.ps1 -Wave 2 -Phase stage2 -Lane {a,b,c}`. Stage 2 writers thread to the locks above where applicable; per-write §16.35 statute verification still required for all figures (rates, thresholds, deadlines change by Budget).

---

## 27.10 Disguised remuneration loan charge + settlement framework — MW3 Stage 1b F-2 lock (2026-05-27)

The Bucket A LPC/voluntary-disclosure cluster contains a non-LPC limb — disguised-remuneration loan-charge settlement — that warrants a dedicated lock to prevent Stage 2 / RUN drift across the controlling statutes and case-law.

**Statutory architecture (verified verbatim at write time, 2026-05-27, against legislation.gov.uk):**
- **Finance (No.2) Act 2017 Schedule 11** — loan charge on outstanding 5 April 2019 balances; crystallisation mechanic; Sch 11 para 2 charging provision; Sch 11 para 14 PAYE / NIC interaction (verified at https://www.legislation.gov.uk/ukpga/2017/32/schedule/11).
- **ITEPA 2003 Part 7A (ss.554A–554Z21)** — disguised remuneration head-rule. s.554A relevant arrangement test; ss.554B-554D relevant step categories; ss.554Z–554Z21 modifications and exceptions (verified at https://www.legislation.gov.uk/ukpga/2003/1/part/7A in force as of 27 May 2026 per legislation.gov.uk currency note).
- **Finance Act 2020 Schedule 2** — Morse Review amendments: **9 December 2010 cut-off** (loans before that date carved out unless certain conditions met); **pre-2016 disclosed-but-unactioned carve-out** (taxpayer disclosed to HMRC before 2016 but no HMRC action followed); **PAYE-instalment deferral route** for genuine hardship; **double-charge denial** against double taxation.
- **HMRC Settlement Opportunity** — administrative practice, not statutory regime; published in successive iterations 2017-2020.

**Controlling case-law line:**
- *RFC 2012 plc (in liquidation) v HMRC* [2017] UKSC 45 (Rangers EBT case) — confirms PAYE/NICs applied at the time of payment into the trust; foundational authority for the disguised-remuneration regime.
- *Hargreaves Lansdown Pension Trustees Ltd v HMRC* [2022] UKUT 34 (TCC) — clarifies the interaction between historical EBT arrangements and current ITEPA 7A application.
- *Hoey v HMRC* [2022] EWCA Civ 656 — confirms HMRC's discretion to issue Reg 80 directions transferring PAYE liability from employee to employer-equivalent.

**Boundary disciplines:**
- vs §21.1 CTA 2010 s.455-464A close-company loans — overlapping but DISTINCT regimes; s.455 catches close-company directors' loans (no "loan charge" mechanic; instead 35.75% standalone charge per §21.1); FA(No.2) 2017 Sch 11 catches disguised remuneration via third-party EBT/trust/contractor-loan arrangements.
- vs §27.5 CoP9 / CDF — the loan charge / settlement framework operates alongside HMRC's civil-fraud routes but is not contingent on fraud-finding.
- vs §27.6 LPC / WDF — LPC is unrelated to disguised remuneration; sessions must not collapse these into a single "voluntary disclosure" umbrella.

**Do not write:**
- "The 9 December 2010 cut-off applies universally" — it doesn't; FA 2020 Sch 2 added specific carve-out conditions; check the original loan arrangement.
- "Settlement Opportunity figures are statutory" — false; they're HMRC administrative practice and have varied across publications.

---

## 31.B Commonhold White Paper 2025 + forthcoming Commonhold and Leasehold Reform Bill — MW3 Stage 1b F-103 lock (2026-05-27)

**LIVE LEGISLATIVE PIPELINE — not yet enacted.** Sessions writing on commonhold conversion, leasehold-reform Bill updates, ground-rent-reform-for-existing-leases, forfeiture reform, service-charge transparency reform, or commonhold-conversion tax-treatment MUST use **forward-looking / proposed / consultation-stage framing** until the Bill is enacted. Verified at write time 2026-05-27: Bill **not yet introduced to Parliament**; White Paper published 3 March 2025; King's Speech 2024 announcement is the formal commitment.

**In-force anchors (these ARE locked statute):**
- **Commonhold and Leasehold Reform Act 2002 Part 1** (commonhold framework ss.1-70) + **Part 2** (leasehold reform ss.71-179) — verified at https://www.legislation.gov.uk/ukpga/2002/15/contents 2026-05-27 with post-LFRA-2024 + post-BSA-2022 amendment list.
- **Leasehold Reform (Ground Rent) Act 2022 (c. 1)** — in force 30 June 2022 + 1 April 2023.
- **Building Safety Act 2022 ss.116-125 + Sch 8** (§26.2 pre-locked) — in force 28 June 2022, LFRA 2024 amendments via SI 2024/1018 effective 31 October 2024.
- **Leasehold and Freehold Reform Act 2024** (§31.3 pre-locked) — phased commencement 2024-2027.

**White Paper proposals (forthcoming Bill territory, must use conditional framing):**
- Default-commonhold for new flats.
- Service-charge transparency reforms.
- Forfeiture reform.
- Ground-rent reform for existing leases.
- Commonhold conversion pathway (existing leasehold → commonhold).
- RTM (Right to Manage) simplification.
- Buildings-insurance commission restriction.

**Unresolved tax-treatment questions (DO NOT WRITE definitively until enacted):**
- **SDLT on commonhold conversion** — no specific FA 2003 provision currently; conversion may trigger or be relieved by future bespoke provision.
- **CGT on commonhold conversion** — TCGA 1992 s.22 part-disposal trajectory if value migrates; bespoke provision possible.
- **IHT on commonhold unit-holder interest** — IHTA 1984 commonhold unit-holder treatment not currently provided; bespoke provision possible.

**Cross-jurisdictional carve-out:** Welsh Government parallel intentions noted but separate. Scottish jurisdictional separation (Land Tenure Reform (Scotland) Act 1974, Long Leases (Scotland) Act 2012, Tenancy of Shops (Scotland) Act 1949) is structurally distinct — commonhold reform does NOT apply to Scotland.

**Per-write verification gate:** sessions writing on this cluster MUST re-fetch the live state of the Bill at write time. If introduced to Parliament during writing → update framing to reflect Bill status; if enacted → migrate from this §31.B floor to a new §31.C enacted-state lock.

---

## 36. Professional conduct of property accountants — MW3 Stage 1b F-100 lock (2026-05-27)

The professional-conduct / anti-money-laundering statutory cordon around property accountants, distinct from the §27 HMRC enquiry mechanics (civil-enquiry focused) and warranting a separate criminal-prosecution / AML-floor lock.

**Statutory architecture (verified verbatim against legislation.gov.uk, 2026-05-27):**
- **Proceeds of Crime Act 2002 ss.327-330** — principal money-laundering offences:
  - s.327: concealing / disguising / converting / transferring / removing criminal property.
  - s.328: arrangements (entering or becoming concerned in an arrangement that facilitates acquisition / retention / use / control of criminal property by another).
  - s.329: acquisition / use / possession of criminal property.
  - s.330: failure to disclose (regulated-sector head-rule — knowledge / suspicion / reasonable grounds for suspicion).
- **Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017 (SI 2017/692)** — regs 8 (scope), 18 (risk assessment), 19 (policies, controls and procedures), 27 (customer due diligence), 28 (CDD enhanced measures for high-risk situations), 33 (enhanced due diligence in respect of certain customers); these regs apply to accountancy-service providers per reg 11.
- **Fraud Act 2006 s.2** — fraud by false representation; foundational for property-accountant prosecutions where the accountant participates in or facilitates fraudulent property transactions.

**HMRC supervision route:** HMRC supervises accountancy-service providers not supervised by a professional body (ICAEW, ACCA, AAT, etc.). Money Laundering and Terrorist Financing Regulations 2019 (SI 2019/1511) made amendments effective 10 January 2020 strengthening the fit-and-proper test.

**Property-context use cases:**
- BTL portfolio mortgage-fraud schemes (false income / occupancy declarations).
- SDLT-reclaim schemes (false rebate claims via ATED-relief / refurbishment claims).
- Cash-purchase property-laundering (large-cash payment vs declared income mismatch).
- FIC / trust structures used to obscure beneficial ownership ahead of TRS / RoE compliance.

**Boundary disciplines:**
- vs §27 (HMRC enquiry mechanics) — §27 is civil-enquiry focused (CoP8, CoP9, CDF); §36 is criminal-prosecution + AML-floor.
- vs §11.A (ECCTA / RoE) — ECCTA 2023 / ECTEA 2022 are register / disclosure regimes; §36 is the broader professional-conduct + criminal-prosecution floor that runs alongside.

**Do not write:**
- "POCA applies only to large transactions" — false; no threshold.
- "Accountants are exempt from MLR 2017 if not directly handling client money" — false; MLR scope extends to advisory and arrangement-facilitation.

---

## 37. Share-exchange + reconstruction reliefs + transactions-in-securities anti-avoidance — MW3 Stage 1b F-101 lock (2026-05-27)

The TCGA 1992 share-exchange and reconstruction reliefs plus the parallel income-tax-side and corporation-tax-side transactions-in-securities anti-avoidance regimes, with their advance-clearance procedures.

**TCGA 1992 reliefs (verified verbatim, 2026-05-27, against legislation.gov.uk):**
- **s.127** — equation of original shares and new holding (treats the new shares as the same asset acquired at the same time as the original shares).
- **s.135** — exchange of securities for those in another company; relief gateway requires (a) bona-fide commercial reason AND (b) main purpose of arrangements not avoidance of tax (the s.137 gate).
- **s.136** — reconstruction involving issue of securities (broader than s.135; applies to reconstructions where shares are issued in a scheme).
- **s.137** — anti-avoidance gate / main-purpose test; **subsections (1)-(1C) substituted by FA 2026 s.37(4)(b)** per current legislation.gov.uk text (2026-05-27 currency).
- **s.138** — advance clearance procedure for s.135 / s.136 reliefs; written application to HMRC.
- **s.139** — reconstruction involving transfer of business; relief on transfer of business in exchange for shares.

**ITA 2007 Part 13 Chapter 1 (ss.682-713)** — income-tax-side transactions-in-securities anti-avoidance:
- s.685 — counteraction-notice mechanic.
- s.701 — clearance route (advance application to HMRC for non-application of the Chapter).
- Full chapter contents verified at https://www.legislation.gov.uk/ukpga/2007/3/part/13/chapter/1 2026-05-27.

**CTA 2010 Part 15 (ss.731-751)** — corporation-tax-side transactions-in-securities anti-avoidance:
- s.748 — clearance route (advance application).

**Foundational case-law line:**
- *IRC v Brebner* [1967] 2 AC 18 — the foundational "main purpose" test for transactions-in-securities anti-avoidance.
- *IRC v Cleary* [1968] AC 766 — extension of the *Brebner* test to share-buy-back arrangements.
- *Joiner v IRC* [1975] STC 657 — purpose-test application to reorganisations.
- *Snell v HMRC* [2008] UKSPC SPC00713 — modern application of the purpose test.
- *MyTravel Group plc v HMRC* [2007] STC 1267 — main-purpose test in corporate reconstruction context.

**Property-context use cases:**
- Parent HoldCo insertion above existing property SPVs (s.135 share-exchange relief; s.138 clearance recommended).
- Portfolio merger of two BTL companies under a single shareholder (s.136 reconstruction; s.138 clearance recommended).
- FIC reorganisation (alphabet shares → growth shares restructure; s.136 + clearance route).
- Demerger of mixed-use SPV into separate residential / commercial SPVs (s.136 + s.139 if business transfer involved).
- Group share buyback under CTA 2010 Pt 18 ss.1033-1048 (purchase of own shares for trade-purposes treatment) — intersects with transactions-in-securities anti-avoidance.

**Boundary disciplines:**
- vs §21 (LtdCo / FIC mechanics) — §21 is operational; §37 is the reorganisation / restructure relief framework.
- vs §11.B (Companies House / ECCTA) — §11.B is filing / disclosure; §37 is tax-relief structure.

**Do not write:**
- "s.137 main-purpose test is identical to GAAR" — false; s.137 predates GAAR and has narrower scope.
- "Advance clearance is optional" — practical fact: optional in statute, but operationally mandatory for any non-trivial reorganisation.

## 38. Capital allowances (CAA 2001) — Finance Act 2026 reform floor — Track 2 batch 4 lock (manager source-verified 2026-05-30)

Verified by the manager at legislation.gov.uk + the GOV.UK measure page on 2026-05-30. **Finance Act 2026 (c.11), Royal Assent 18 March 2026, is ENACTED.** State all of the below as current law; never as "Finance Bill 2026", "proposed", or "subject to Royal Assent".

**Rates and allowances (current):**
- **Main-pool (general pool) WDA: 14%** (reduced from 18%). FA 2026 **s.28** substitutes "14%" into CAA 2001 s.56(1). Effective chargeable periods beginning on or after **1 April 2026 (CT) / 6 April 2026 (IT)**. A chargeable period straddling the start date uses a **hybrid, time-apportioned rate** between 18% and 14% (FA 2026 s.28(2)-(6)). Verified: legislation.gov.uk CAA 2001 s.56 now reads 14%, annotated "substituted ... by Finance Act 2026 (c. 11), s. 28(1)".
- **Special rate pool WDA: 6%, UNCHANGED.** CAA 2001 s.104D. The GOV.UK measure states verbatim it "does not change the WDA on the special rate pool which is currently 6%". Any "special rate falls to 4%" claim is false.
- **New 40% first-year allowance.** FA 2026 **s.29** ("First-year allowance for main rate expenditure on plant or machinery"): a 40% FYA on **main-rate, new and unused** plant and machinery, expenditure incurred **on or after 1 January 2026**. **Excludes cars, second-hand/used assets, and assets for leasing overseas.** Deliberately available to **unincorporated businesses (sole traders, partnerships, individual landlords)** and to leasing, i.e. precisely where full expensing is not available. (Cite FA 2026 s.29; verify any consolidated CAA 2001 inserted-section number at write time, otherwise cite FA 2026 s.29. Never invent a section number.)
- **AIA: £1,000,000, permanent.** CAA 2001 s.51A(5), made permanent by **F(No.2)A 2023 (c.30) s.8** (RA 11 July 2023) from 1 April 2023. The "temporary until 31 March 2026 / reverts to £200,000" framing is stale.
- **Full expensing: 100% FYA, companies only** (CAA 2001 s.45S), new and unused, permanent. Not available to unincorporated landlords. Distinct from the new 40% FYA (s.29).
- **SBA (structures and buildings allowance): 3%** (uplifted from 2%), enacted by **Finance Act 2021 (c.26) Sch 22 para 7(4)**, effective 1 April 2020 (CT) / 6 April 2020 (IT). Not "Finance Act 2020".

**Property-business disciplines (the central nuances):**
- **s.35 dwelling-house bar:** no plant and machinery allowances for plant for use in a **dwelling-house** within a property business. What can still qualify: **common parts** of a block (communal boiler, lift, lighting), and **integral features** (CAA 2001 s.33A, five categories) in qualifying non-dwelling areas (offices, communal areas, commercial units in mixed-use).
- **FHL regime abolished** from **6 April 2025 (IT) / 1 April 2025 (CT)** (FA 2025 (c.8) Sch 5). The old FHL capital-allowances route is gone; pools already established continue to be written down in the ordinary residential property business (see §… FHL-abolition note).
- **Cars:** excluded from AIA (CAA 2001 **s.38B**, General Exclusion 2) AND from the new 40% FYA (CAA 2001 s.46 / FA 2026 s.29). The only car FYA is the **100% FYA for new, unused zero-emission cars (0 g/km CO2)** under **CAA 2001 s.45D**, available to **31 March 2027 (CT) / 5 April 2027 (IT)**. Cars above 0 g/km get no FYA: **≤50 g/km → main pool (14%)**, **>50 g/km → special rate pool (6%)**. Only 0 g/km qualifies for the FYA ("≤50 g/km = FYA" is wrong).

**Do not write:**
- "Writing-down allowance is 18%" (it is 14% from April 2026).
- "Special rate pool falls to 4%" (it stays at 6%).
- "Landlords can claim AIA on furnishings/boilers inside a let dwelling" (barred by s.35).
- "Full expensing is available to individual landlords" (companies only; the new 40% FYA is the unincorporated route).
- "Cars qualify for AIA or the 40% FYA" (excluded from both).

**Boundary disciplines:**
- vs §4 (Section 24 finance-cost relief) — §4 is interest relief; §38 is capital allowances on plant/fixtures.
- vs §34 (landlord allowable expenses) — §34 is revenue deductions; §38 is capital expenditure allowances. The revenue-vs-capital line is the gateway.

**Pages anchored to this lock:** Track 2 batch 4 rewrites = annual-investment-allowance-uk, annual-investment-allowance-landlords-uk, writing-down-allowance-rates, writing-down-allowance-cars. `capital-allowances-on-property` was diagnosed as a collapse-into-pillar candidate but the collapse was DROPPED: the pillar currently has zero ranking equity (0 Google + 0 Bing impressions, live only days) and collapsing an established indexed page into an unproven brand-new one is the wrong direction. Parked for a data-informed revisit once the pillar accrues equity (and the collapse guard `scripts/track2_collapse_guard.py` was hardened with R6 to block collapses into unproven targets). The remaining ~15 capital-allowance cluster pages cite this lock as the authoritative floor.


