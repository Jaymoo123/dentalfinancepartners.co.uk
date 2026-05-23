# Wave 4 house positions extensions (recommendations)

**Stage 1 recommendations**, written 2026-05-23. **Do NOT apply to `house_positions.md` until manager review.** Three new / extended sections are proposed to support the 30 Wave 4 briefs. Each is scoped to the bucket it supports.

## Section 21 (NEW) — LtdCo + FIC Wave 4 extension (proposed; supports Bucket A, 10 briefs)

§11 (Companies House / ECCTA / RoE) is the only LtdCo-side house position in the current doc, and it is operational-compliance-focused. The 10 Wave 4 LtdCo + FIC briefs need locked positions on post-incorporation mechanics, share-class design, the connected-party rules around personal-rental-to-own-co, the salary-vs-dividend optimum for 2026/27, and FIC-specific mechanics. Proposed scope:

### 21.1 Directors' loan accounts (proposed)

- Credit balances created on s.162 incorporation transfer: tax-free repayment route; balance is the founder's investment in the company, tracked as a director's loan owed by company to director.
- Repayment order: usually DLA first (tax-free), then dividends (subject to dividend rates), then salary (PA + NI), then pension contributions (employer side, deductible).
- HMRC official rate of interest on credit balance is currently 2.25% (verify against gov.uk before locking precise rate; the official rate is updated periodically). Interest paid to director is taxable income on director, deductible by company within the CTA 2010 s.453 close-company rules.
- DLA exhaustion trap: founder drawing monthly rent receipts as DLA repayment can exhaust a £500k incorporation-credit balance within 4-5 years and find themselves forced into higher-rate dividend or salary extraction earlier than the s.162 plan envisaged. Worked-example discipline expected.

### 21.2 Share-class structures and the settlements legislation (proposed)

- **Alphabet shares** (A / B / C class shares with differential dividend rights): standard property-SPV design for splitting dividends to spouse + adult children.
- **Settlements legislation ITTOIA 2005 s.624:** settlor-attribution risk where a spouse / minor / adult child receives dividends from shares they didn't pay full consideration for AND the settlor retains a benefit. Carve-out from *Jones v Garnett (Arctic Systems)* [2007] UKHL 35: an outright gift of ordinary shares to a spouse is not within s.624 because of the s.626 spouse-exception.
- **Child shares:** outright gift of shares to minor child is within s.624 (income treated as settlor's). Adult-child shares are not within s.624 directly, BUT bare-trust holdings for minor children remain settlor-attributed until child turns 18.
- **Growth shares vs preference shares:** standard FIC design uses preference shares (£-coupon dividend, frozen value) for founder + growth shares (entitled to capital growth) for next generation. Preference and ordinary classes can coexist with alphabet classes for dividend-splitting between founders.

### 21.3 Charging rent to own property company (proposed)

- Shareholder-director letting personally owned property to their own SPV at market rent: rental income for individual (ITTOIA 2005 s.272 property income), deductible for company (CTA 2009 s.54), section-24 applies on the individual side as normal for residential property.
- **Connected-party transfer-pricing risk:** TIOPA 2010 Pt 4 transfer-pricing rules apply to connected-party transactions but SME exemption (TIOPA 2010 s.166) generally takes most landlord-SPV transactions out. Where the SPV exceeds SME thresholds (250 staff or €50m turnover) and rent is set above or below market, HMRC can adjust under transfer-pricing rules.
- **Market-rent evidence pack:** independent valuer letter, comparable local listings printed at lease start, periodic review (annual) documented. Lack of formal lease + lack of market-rent evidence is the connected-party challenge pattern HMRC opens at enquiry.
- **Salary-vs-rent extraction comparison:** rent extracts at landlord's marginal rate (with s.24 finance-cost restriction applied); salary extracts at PA + NI (employee + employer 13.8% over £5k threshold). For property SPV directors, rent often out-performs salary as an extraction route if the property is genuinely personal property let to the company.

### 21.4 Salary vs dividends in property SPV 2026/27 (proposed)

- **CT rates 2026/27 (verify gov.uk):** 19% small profits rate (≤ £50k profits), 25% main rate (≥ £250k profits), marginal relief tapered band £50k-£250k effective 26.5% rate.
- **NI thresholds 2026/27:** Primary threshold (employee NI) £12,570 / yr (verify); Secondary threshold (employer NI) £5,000 / yr per current Hunt reform.
- **Dividend rates 2026/27:** £500 dividend allowance, then 8.75% basic, 33.75% higher, 39.35% additional.
- **Standard "tax-efficient mix"** for a single-director property SPV in 2026/27:
  - Salary: £5,000 (NI secondary threshold floor), OR £12,570 if Employment Allowance available (only certain employers).
  - Dividends: up to PA cliff (£50,270) then up to higher-rate threshold (£125,140), beyond which marginal rate jumps.
  - Pension: employer contributions (up to £60k annual allowance) deductible against CT; £200k+ in pension is a useful extraction lever for retiring-age founders.
- House position framing: provide marginal-rate worked examples at £30k / £50k / £100k / £125k profit bands; no single "optimum" recommendation, the optimum is reader-specific.

### 21.5 FIC mechanics (proposed)

- **FIC = a private company holding investment assets (property, shares, cash) used to manage and transfer family wealth.** Distinguished from a trading company by predominantly investment-income profile.
- **Articles of Association** for FIC bespoke beyond model articles (CA 2006 s.18): reserved-matters lists (decisions requiring founder consent for life), pre-emption rights on share transfer, drag-along / tag-along clauses, dividend-control mechanics by class, redemption / amortisation rules for preference shares.
- **Board governance:** decisions require board resolutions or written resolutions; minute book maintained; dividend declarations dated and signed. Substance-over-form risk where founder "is" the FIC operationally; HMRC may re-characterise distributions as personal income.
- **Tax profile:** FIC is a close investment company (CIC) under CTA 2010 s.34. CT at main rate (25% from 2026/27), no marginal-relief, no SBA on commercial property held within the FIC for trade-of-letting unless qualifying. Section 24 does NOT apply at corporate level (s.24 is income-tax rule, FIC pays CT not IT). Sub-£500 dividend allowance does NOT apply at corporate level (FIC pays dividends OUT, doesn't receive them taxable in the same way).
- **IHT mechanics:** FIC shares are investment-company shares; pure-investment FICs (BTL portfolios) do NOT qualify for BPR per Pawson principles. Growth-share design transfers value out of founder's estate over 7 years (PET); s.165 holdover relief is NOT available for transfers of investment-FIC shares (TCGA 1992 s.165 + Sch 7 limit holdover to trading-company shares).
- **CGT on disposal of FIC shares:** standard 18% / 24% rates (TCGA 1992 s.4 as amended 2024/25 onwards), no BADR for investment FICs.

### Citation discipline for §21 (proposed)
- ITTOIA 2005 s.272, s.624, s.626.
- CTA 2009 s.54.
- CTA 2010 s.34, s.453, ss.1064-1066 (close-company close-investment-company).
- TIOPA 2010 Pt 4, s.166 (transfer-pricing + SME exemption).
- CA 2006 s.18, s.392 (year-end changes).
- TCGA 1992 s.165, Sch 7 (holdover limited to trading).
- *Jones v Garnett* [2007] UKHL 35 (settlements + Arctic Systems carve-out).
- *Pawson v HMRC* [2013] UKUT 050 (TCC) (investment / trading).

### Do-not-write (proposed)
- "DLA repayment is tax-free indefinitely" (true while balance exists; founder must plan around exhaustion).
- "Alphabet shares to children avoid s.624" (false for minors; subject to anti-attribution for adult children only via the spouse-exception path).
- "FIC shares qualify for BPR" (false for investment FICs).
- "s.165 holdover applies on FIC share gifts" (false for investment FICs; available only for trading-company shares).
- "Employment Allowance available to all SPVs" (false; multiple-director SPVs and certain connected-companies are excluded).

---

## Section 19 (EXTEND) — MTD ITSA Wave 4 extension (proposed; supports Bucket B, 10 briefs)

§19 (Wave 3 MTD extension) is comprehensive on the threshold, qualifying income, exit rule, penalty regime (15/30/31 + 3%/3%/10%), and the abandoned £10k. Wave 4 Session B's operational depth needs additional locked positions on **agent involvement (ASA), foreign-property income mechanics inside MTD, pension funds + rental property exclusion, letting-agent who-files, spreadsheet+bridging "digital link" rule, mid-year cessation, digital-records evidence discipline.** Proposed sub-sections:

### 19.10 Agent Services Account (ASA) mechanics (proposed)

- Pre-MTD, agents represented clients via the 64-8 form and the Online Services Account (OSA). For MTD ITSA from 6 April 2026, the Agent Services Account (ASA) is the mandatory route.
- Agent must register an ASA via gov.uk/guidance/get-an-hmrc-agent-services-account.
- Client authorisation flow: agent generates an authorisation request via ASA; client receives an email link to the gov.uk authorisation portal; client logs in via Government Gateway and approves the agent for MTD ITSA filing specifically.
- Joint owners: each spouse / co-owner must authorise the agent separately. No "spouse-implies-spouse" rule.
- Re-authorisation on agent change: ASA authorisations do not transfer; if client moves accountant, the new accountant must request fresh authorisation; client should revoke the old agent's access via the portal.

### 19.11 Foreign property income inside MTD (proposed)

- §19.2 confirms foreign property income counts as property income for MTD where reported on the UK return.
- **FX translation:** spot rate on transaction date (per HMRC IM) OR HMRC published monthly average rates. Pick one method and apply consistently across the year.
- **Reporting:** software must support the SA106 foreign-property fields. Many MTD packages launched in 2025/26 did not; check the HMRC compatible-software list for foreign-property support before relying.
- **Foreign tax credit:** claimed at the final declaration (EoPS / final declaration stage), not at quarterly update.
- **NRL scheme interaction:** non-resident landlord receiving UK rental income via UK letting agent: NRL withholding applies (basic rate 20%) unless NRL1/2/3 approval. MTD-ITSA filing still required by the landlord (quarterly via overseas address) if qualifying-income threshold exceeded.

### 19.12 Pension funds + rental property (proposed)

- **SIPP / SSAS holding commercial property:** trustees of pension funds are excluded from MTD ITSA (§19.3). Property income within the pension wrapper is taxed inside the scheme (typically 0% on rental income within a registered pension scheme). Reporting is via the pension trustee return, not the personal MTD-ITSA cycle.
- **Personal portfolio + SIPP-held property:** personal portfolio is in MTD ITSA if threshold met; SIPP property is separate. The landlord with both must NOT combine the two streams for the qualifying-income test (SIPP rental is not the landlord's income for that test).

### 19.13 Letting-agent managed portfolio (proposed)

- The landlord is the MTD filer, NOT the letting agent.
- Letting agent provides monthly statement showing gross rent collected, agent commission deducted, management fees, other deductions, net paid to landlord.
- Landlord (or landlord's accountant via ASA) categorises the agent statement into the MTD quarterly update categories: gross rental income (gross collected, not net paid), agent commission (expense), management fees (expense), other deductions (expense per category).
- **Trap:** landlord reporting "net of agent fees" as gross income understates qualifying income for the threshold test AND understates expenses; both errors largely cancel for profit but for the threshold test (§19.2 gross-test) the landlord may incorrectly conclude they are below mandate threshold.

### 19.14 Spreadsheet + bridging software "digital link" rule (proposed)

- §19.6 confirms spreadsheet + bridging is acceptable.
- **Digital link** definition (per HMRC notice 700/22 + adapted for MTD ITSA): a transfer of data between software / spreadsheet cells that does NOT involve manual transcription or copy-paste. Acceptable: cell references / formulae, linked tables, API extract, CSV import via a script. NOT acceptable: copy-paste, manual re-keying, screen-reading.
- **Spreadsheet column discipline:** spreadsheet must categorise data into the SA105 categories (gross rental, agent fees, repairs, insurance, council tax, finance costs, other). Categorised columns flow via the bridging software into the MTD API as quarterly update lines.
- **HMRC-recognised bridging vendors:** list maintained at gov.uk/find-software; the names of recognised vendors change periodically. Do NOT hard-code product names.

### 19.15 Mid-year cessation (proposed)

- Landlord selling the last property mid-year: final quarterly update covers the partial quarter to date of disposal. EoPS and final declaration cover the full tax year up to cessation. Cessation must be notified to HMRC.
- **Post-cessation expenses:** ITTOIA 2005 s.354 allows post-cessation expense recovery up to 7 years where the expense is related to the let business and would have been deductible if the business had continued.
- **CGT 60-day return:** CGT-on-property-disposal 60-day return (TMA 1970 Sch 3ZA) runs in parallel with the MTD cessation reporting; the two are separate obligations.
- **Stopping letting but keeping the property:** if letting ceases but the property is retained (e.g. landlord moves into the property as PPR), MTD ITSA obligations end at cessation but CGT private-residence relief considerations begin.

### 19.16 Digital-records evidence discipline (proposed)

- Records must be kept digitally for the 7-year retention period (TMA 1970 s.12B).
- **What HMRC accepts as digital records:** receipt photographs captured by app (with date stamp), bank-feed CSV / API extracts, accounting-software entries, spreadsheet cells. Cash receipts must be photographed or transcribed.
- **What HMRC does not accept:** shoeboxed paper receipts (must be digitised), unstamped photographs without source software audit trail, written notes from memory.
- **Bank-feed integrations:** acceptable as gross-receipt evidence; auto-categorisation suggestions are not binding (landlord remains responsible for accuracy).

### Citation discipline for §19 extensions (proposed)
- TMA 1970 s.12B (records retention), Sch 3ZA (CGT 60-day return).
- ITTOIA 2005 s.272 (property income basis), s.354 (post-cessation expenses).
- TIOPA 2010 s.18 (foreign tax credit).
- HMRC IM (income manual) various.
- gov.uk/find-software (compatible software list, not hard-coded).
- gov.uk/get-an-hmrc-agent-services-account.

### Do-not-write (proposed)
- "Letting agent files quarterly updates for the landlord" (false; landlord is filer).
- "SIPP-held property combines with personal portfolio for MTD threshold" (false; separate).
- "Copy-paste between spreadsheet cells is a digital link" (false).
- "ASA authorisations transfer to a new agent automatically" (false; client must re-authorise).
- "Foreign property income is excluded from MTD" (false; included where reported on UK return).

---

## Section 22 (NEW) — IHT estate-planning for landlords Wave 4 extension (proposed; supports Bucket C, 10 briefs)

§15 (Wave 2 IHT extension) is comprehensive on NRB / RNRB / PETs / CLTs / GROB / 7-year clock / April 2026 cap / pension-IHT 2027 / non-resident IHT. The 10 Wave 4 IHT briefs need additional locked positions on **landlord-specific BPR test (Pawson rejection for pure BTL), s.142 deed-of-variation mechanics, Sch 1A charitable-legacy 36% rate, CLT discretionary-trust entry charge + s.260 holdover, FIC-as-estate-tool with explicit boundary against Bucket A FIC pages.** Proposed sub-sections:

### 22.1 BPR for landlords: the Pawson investment line (proposed)

- **Pure BTL fails BPR.** *Pawson v HMRC* [2013] UKUT 050 (TCC) is the anchor case: passive rent collection from residential lettings is "mainly investment", caught by s.105(3) IHTA 1984. BPR does NOT apply.
- **Boundary with serviced accommodation:** SA businesses MAY qualify where services beyond passive lettings are substantial (managed kitchen, daily cleaning, breakfast, concierge); the bar is high (see Pawson + Brander discussion). See Wave 2 `serviced-accommodation-bpr-eligibility-pawson-test`.
- **HMO landlords:** generally fail; the multi-tenant arrangement does not transform passive lettings into trading.
- **Property developers:** trading element (WIP, sites under development, build-to-rent during construction) can qualify; rental-investment element will not.
- **From 6 April 2026:** even where BPR applies, £1m cap (§15.4); above-cap 50% relief = effective 20% IHT.

### 22.2 Deed of variation (s.142 IHTA 1984) for landlord estates (proposed)

- **Mechanism:** beneficiary of estate can vary their inheritance within 2 years of death; variation reads back to the deceased for IHT (s.142 IHTA 1984) and for CGT (TCGA 1992 s.62(6)).
- **Common uses for landlord estates:** redirecting a BTL property from spouse to adult children (skipping a generation), redirecting to a charity to qualify for s.1A 36% reduced rate, equalising NRB/RNRB across spouses where first death wasted allowance.
- **Critical rule: no consideration.** Variation must be for no monetary consideration in exchange; consideration destroys the s.142 read-back.
- **Election:** the variation must include an election that s.142 (IHT) and / or s.62(6) (CGT) applies. Otherwise the redirection is a fresh PET / disposal by the original beneficiary.
- **Personal-representative consent:** required only where the variation increases IHT (PRs must agree to bear the higher charge).

### 22.3 Charitable legacy + 36% reduced rate (Sch 1A IHTA 1984) (proposed)

- Where ≥10% of "components of the estate" go to qualifying charity, the IHT rate on the chargeable estate drops from 40% to 36%.
- **Components of the estate:** Sch 1A divides the estate into three "components": (i) general component (free estate excluding jointly owned property and settled property), (ii) survivorship component (joint property passing by survivorship), (iii) settled component (settled property). Each component is tested separately for the 10% threshold OR a "merger election" can be made under Sch 1A para 7 to combine components.
- **Qualifying charity:** must be UK-registered or EEA-equivalent (post-Brexit transitional rules apply).
- **Maths:** the 36% rate often makes the charity gift "self-funding" for portfolios above ≈£2m. Worked-example discipline expected on the break-point where 36% on (estate - charity) ≥ 40% on (estate).

### 22.4 CLT into discretionary trust (proposed)

- **Mechanism:** lifetime gift into discretionary trust = chargeable lifetime transfer (CLT). Immediate 20% IHT on excess over NRB (less annual exemption + 7-yr cumulative gifts).
- **If settlor dies within 7 years:** further 20% (to bring cumulative rate to 40%), tapered per s.7(4).
- **10-year periodic charges:** up to 6% on chargeable property at each 10-year anniversary (s.64 IHTA 1984).
- **Exit charges:** proportional charge on capital distributions out of trust between periodic charges.
- **CGT s.260 holdover:** available on gift into trust (TCGA 1992 s.260) provided trust is non-settlor-interested. Settlor-interested trusts (where settlor or spouse can benefit) NOT eligible for s.260 holdover, so CGT is immediate at MV.
- **Comparison vs FIC for landlords:** trust = entry IHT + periodic charges, but s.260 holdover available (no CGT on transfer in). FIC = no entry IHT, but CGT immediate on transfer in (no s.165 holdover for investment FIC). Decision is reader-specific.

### 22.5 Spouse exemption + transferable allowances (proposed)

- **§18 IHTA 1984 spouse exemption:** unlimited transfers between UK-domiciled / long-term-resident spouses are exempt from IHT.
- **Limited spouse exemption** for transfers TO a non-UK-domiciled / non-long-term-resident spouse: £325k lifetime limit (s.18(2)). The non-UK-spouse can elect to be treated as long-term-resident under s.267ZA to access full exemption (with cost: brings worldwide assets into IHT scope).
- **Transferable NRB (TNRB):** unused NRB on first death transfers to surviving spouse (s.8A IHTA 1984). Claimed on IHT402 within 2 years of second death.
- **Transferable RNRB (TRNRB):** unused RNRB on first death transfers. Claimed on IHT436.
- **Second-death window planning:** between first and second death, the surviving spouse can use spouse exemption to consolidate the portfolio (no IHT on first-death transfers in), then face the full estate value on second death potentially above £2m RNRB taper threshold. Counter-strategies: gifting in survivor's lifetime, charity legacy on second death, equity-release to spend down portfolio value.

### 22.6 FIC as estate-planning value-freeze tool (proposed)

- **NOT a re-statement of §21.5 (FIC mechanics).** This is the IHT-side framing.
- **Value-freeze:** founder transfers property into FIC (or original founder of FIC) and retains preference shares with fixed £-coupon dividend (frozen value). Growth shares (entitled to capital growth + control) are gifted to next generation as PETs.
- **7-year clock starts on the share gift, NOT on FIC formation.** Founder must survive 7 years for full PET exemption.
- **Comparison vs direct property PET gift (Wave 4 C4):** direct property gift = single asset, CGT s.17 deemed disposal at MV (no holdover for non-business BTL). FIC growth-share gift = company-share gift, valued with minority discount, but still CGT MV (no s.165 holdover for investment FIC). FIC route can be lower CGT due to minority-discount valuation.
- **GROB risk:** if founder retains the preference dividend and the FIC's primary asset is property the founder also occupies / uses, GROB s.102 FA 1986 may apply. Counter: founder pays full market rent for any use; or founder takes pure cash-coupon income from preference shares with no use of underlying property.
- **Boundary against Bucket A FIC pages:** Wave 4 A8 = FIC retirement income; A9 = FIC growth-share PET mechanics; A10 = FIC blended-family. Wave 4 C7 = FIC value-freeze for IHT planning. C7 cites these other pages as siblings, doesn't re-cover their ground. Stage 2 sub-agents must agree the boundary BEFORE writing.

### Citation discipline for §22 (proposed)
- IHTA 1984: s.7 (rate), s.8A (TNRB), s.18 (spouse), s.62 (cumulative), s.105 (BPR), s.142 (DoV), Sch 1A (36% rate).
- TCGA 1992: s.17 (deemed disposal at MV), s.62 (DoV CGT read-back), s.165 (holdover for trading shares), s.260 (holdover for CLT).
- FA 1986: s.102 (GROB).
- Pawson v HMRC [2013] UKUT 050 (TCC); Brander v HMRC [2010] UKUT 300 (TCC).
- HMRC IHTM (BPR ground at IHTM25000+; APR at IHTM24000+; DoV at IHTM35000+; charitable rate at IHTM43000+).

### Do-not-write (proposed)
- "Pure BTL qualifies for BPR after the 2026 reforms" (still doesn't, per Pawson).
- "Deed of variation can be done at any time after death" (false; 2-year window).
- "10% charity threshold is calculated on the entire estate" (false; on the relevant component(s), with merger election possible).
- "Discretionary trust pays no entry IHT" (false; 20% on excess over NRB).
- "FIC value freezing avoids 7-year clock" (false; 7-year clock starts on share gift).

---

## Manager review checklist (before applying to house_positions.md)

- [ ] Verify §21 CT rates 2026/27 against current gov.uk publication.
- [ ] Verify §21 NI thresholds 2026/27 against current gov.uk publication.
- [ ] Verify §21 HMRC official rate of interest (DLA credit balances) against current gov.uk.
- [ ] Verify §22.1 Pawson + Brander citation summaries against the actual judgments.
- [ ] Verify §22.4 s.260 holdover settlor-interested-trust exclusion against TCGA 1992 s.169B-s.169G.
- [ ] Decide whether §21 / §22 land as new top-level sections or as extensions of §11 / §15 respectively.
- [ ] Decide cross-bucket boundary text between §21.5 (FIC mechanics) and §22.6 (FIC value-freeze) before Stage 2 sub-agents write.
