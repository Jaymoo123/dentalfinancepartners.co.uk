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
