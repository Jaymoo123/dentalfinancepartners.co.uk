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
- Late payment: 3% from day 31, +3% from day 46, +10% per annum from day 91.

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
- **Nil-rate band (NRB):** **£325,000**, frozen until 5 April 2030 (extended in Autumn Budget 2024).
- **Residence Nil-Rate Band (RNRB):** **£175,000**, frozen until 5 April 2030.
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

- **NRB:** £325,000 per individual, frozen until 5 April 2030 (extended in Autumn Budget 2024 from the previous April 2028 expiry).
- **RNRB:** £175,000 per individual, frozen until 5 April 2030.
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

**Locked position (verified gov.uk announcement 2026-05-22):** From **6 April 2026**, the previously unlimited 100% rate of Business Property Relief and Agricultural Property Relief is capped at **£1,000,000 combined** per estate. The cap applies across both reliefs jointly; estates cannot stack a £1m BPR allowance on top of a £1m APR allowance.

- **Below £1m:** 100% relief, as before, for qualifying property.
- **Above £1m:** 50% relief on the excess, producing an effective IHT rate of 20% on the qualifying value above the cap.
- **AIM-listed shares** previously qualified at 100% BPR after 2 years' ownership; the announced reform reduces this to **50%** from 6 April 2026 regardless of the £1m allowance. AIM shares do NOT consume the £1m allowance (separate 50% tier). **Session note:** verify the exact AIM mechanics against gov.uk HMRC technical note before relying on a precise figure in any worked example — AIM rate is the most-likely-to-be-amended detail in this reform package.
- **Trusts:** trusts holding BPR/APR-qualifying property at 6 April 2026 each get their own £1m allowance for chargeable events; anti-fragmentation provisions are expected (consult HMRC technical note before writing trust-specific worked examples).

**Property-investment context (most BTL landlords):** standard BTL property is investment, not trading — **Pawson v HMRC [2013] UKUT 050 (TCC)** confirms it does not qualify for BPR. The April 2026 cap therefore rarely affects pure BTL landlords. It DOES affect:
- Property developers (trading) holding work-in-progress at death.
- Serviced-accommodation operations with substantial services (the *Pawson*-distinguishing fact pattern: managed kitchen, daily cleaning, breakfast, concierge).
- Mixed estates with both an active trading business (e.g. a farm) and a BTL portfolio — the trading element competes with farmland for the £1m allowance.

**Do not write:** "BTL qualifies for BPR after the April 2026 reforms" (still doesn't, per Pawson). "The £1m cap applies separately to BPR and APR" (it's combined). "AIM relief is unaffected" (rate drops to 50%).

### 15.5 Pensions in IHT — 6 April 2027

**Locked framing:** From **6 April 2027**, unused defined-contribution pension funds (and unused DB lump-sum death benefits) will be brought into the deceased's estate for IHT. Announced Autumn Budget 2024; statutory provisions in the draft Finance Act 2026 cycle.

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
- A small number of older UK treaties (e.g. **UK-Luxembourg pre-2022 protocol**) historically lacked indirect-disposal provisions; the 2009 / 2018 / 2022 protocols brought most into line. Session research: check the treaty's current consolidated text on gov.uk before writing.

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
