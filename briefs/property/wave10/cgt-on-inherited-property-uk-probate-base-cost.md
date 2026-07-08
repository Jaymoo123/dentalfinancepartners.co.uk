---
slug: cgt-on-inherited-property-uk-probate-base-cost
category: capital-gains-tax
intent: applied guide — CGT calculation when a UK beneficiary inherits and later sells residential property
---

# Working title: CGT on Inherited Property: Probate Value, PPR and the 60-Day Clock

## Statutory anchor

**Primary:** TCGA 1992 s.62 — base cost of assets acquired as legatee is the market value at the date of death (probate value), NOT the original purchase price.

**Supporting:**
- TCGA 1992 s.222-s.226 (PRR / PPR) — occupying beneficiary may qualify for private residence relief from the date they move in as main residence.
- TCGA 1992 s.62(6) — deed of variation reads back to the deceased for CGT where the relevant election is made (cross-reference §22.2).
- TCGA 1992 s.60 — personal representative (PR) disposals treated as nominee; PR rate is 24% (§5 house position).
- IHTA 1984 s.171 — value used for IHT (probate value) becomes the s.62 base cost for CGT; the interaction prevents double-taxation of the same uplift.
- Finance Act 2019 Sch 2 (60-day reporting for UK property disposals by UK residents where tax is due — confirmed in §5 house position).

**House position reference:** §5 (CGT rates, 60-day reporting, PRR). §22.2 (deed of variation s.62(6) and s.142 IHTA). §39 (LOCKED: s.62(1) probate base cost; PR AEA £3,000 year of death + 2 following years; PR residential rate 24% "from 6 April 2026" per GOV.UK — do NOT state 24% for PRs from Oct 2024).

## Framing differentiator

Closest existing page: `cgt-inherited-rental-property-calculation-uk` (Jaccard 0.12 — very low overlap per cannib check). Closest competitor coverage noted in picks label: `capital-gains-tax-property-complete-guide-uk` covers inheritance in one FAQ sentence only (confirmed live 2026-07-08; inheritance section is a brief FAQ answer, not an operational guide).

**Angle this page takes that neither existing page nor the complete guide takes:** This is the APPLIED operational guide — the reader has inherited a specific property and needs to know: (a) what their base cost is and where to find it, (b) whether PPR is available and from what date, (c) how IHT already paid interacts with the CGT calculation, (d) what happens if there are multiple beneficiaries, and (e) the 60-day filing window. The calculation walkthrough is the load-bearing section.

**Scope NOT covered here (in-scope for other pages):**
- Non-resident inheriting UK property (covered by non-resident-cgt-uk-property-rates-reporting).
- Deed of variation mechanics in depth (§22.2 position; this page should link to the DoV page if it exists, or note briefly).
- IHT itself — this page is CGT-only; IHT context is background only.

## Key questions this page must answer

1. What is the CGT base cost when you inherit a property, and how does it differ from buying at market price?
2. Where does the probate value come from, and what documents confirm it (IHT400 / IHT205 / grant of probate)?
3. Can a beneficiary who moves into the inherited property claim PPR, and from what date does the clock run?
4. Does the IHT paid by the estate reduce the CGT gain, or is it entirely separate?
5. How is the gain calculated where a property has been let between the date of death and sale?
6. What are the CGT rules when the estate has multiple beneficiaries (e.g. three children each inheriting a one-third share)?
7. Is a 60-day return required, and does it apply when PPR fully covers the gain?
8. What is the personal representative (PR) rate vs. the beneficiary rate, and does it matter who sells — the PR or the beneficiary after assent?
9. Can a deed of variation change the base cost for CGT, and what election is needed?
10. What records should an executor/beneficiary keep to support the base cost figure?

## Manager pre-decisions placeholder

- [ ] Confirm: does the site have an existing deed-of-variation page to cross-link? If not, flag as a future pick.
- [ ] Confirm: should the page cover the position where the PR sells before assent (PR at 24%) vs. beneficiary sells after assent (individual rates 18/24%)? Stage 1 assumes YES — both paths covered.

## Stage 2 competitor URL verification

**Verified live (HTTP 200, on-topic guide):**

1. `https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk` — LIVE. Covers inheritance in one FAQ paragraph only ("probate value resets the base cost, subsequent disposal taxed on growth from that value"). Confirms our differentiator: no operational walkthrough, no PR-vs-beneficiary path, no multi-beneficiary section, no 60-day filing drill-down.

**Not verified (seeds referenced internal slugs only, no external competitor URLs):** The seed did not supply external competitor URLs beyond our own pillar page. Per brief rules, fewer than 2 external competitors verified:

<!-- competitor section: session-side WebSearch at write time, no Stage 2 hits -->

## Authority links (verified)

**HMRC manuals (gov.uk live as of 2026-07-08):**
- `https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg30540` — CG30540: personal representatives — computational rules; assets acquired at death market value; PPR availability; LIVE, last updated 6 July 2026.
- CG30700: legatee — general
- CG31100: assets passing on death — acquisition cost (legatee base cost)
- CG30900: personal representatives — rate and treatment
- CG64300+: PPR for assets not occupied throughout

**Legislation.gov.uk:**
- `https://www.legislation.gov.uk/ukpga/1992/12/section/62` — TCGA 1992 s.62 — LIVE, verified 2026-07-08. s.62(1): PRs acquire at death market value (no disposal on death). s.62(4): legatee treated as if PRs' acquisition were theirs (full step-up in base cost).
- `https://www.legislation.gov.uk/ukpga/1992/12/section/60` — TCGA 1992 s.60 (PR as nominee)
- `https://www.legislation.gov.uk/ukpga/1992/12/section/222` — TCGA 1992 s.222 (PPR)

**GOV.UK rates page:**
- `https://www.gov.uk/capital-gains-tax/rates` — LIVE. Confirmed: "Trustees or personal representatives of someone who's died pay tax at 24% from 6 April 2026." Do NOT write 24% for PRs from Oct 2024.

## Worked example

### Scenario: beneficiary sells inherited property with letting period

**Facts:**
- Rosa inherits a flat on 15 March 2024. Probate value (RICS report, accepted by HMRC): £320,000.
- Rosa lets the flat from April 2024 to December 2025 (21 months).
- Rosa moves in January 2026, lives there as main residence until December 2026.
- Rosa sells December 2026 for £375,000 (net of estate agent fees £3,750 and conveyancing £1,500 — incidental costs of disposal £5,250).

**CGT computation (Rosa as individual higher-rate taxpayer):**

| | |
|---|---|
| Disposal proceeds | £375,000 |
| Less: incidental costs of disposal | (£5,250) |
| Net proceeds | £369,750 |
| Less: base cost (probate value, s.62(1)) | (£320,000) |
| Less: enhancement expenditure (nil assumed) | — |
| **Gross gain** | **£49,750** |

**PPR relief:**
- Ownership period (death to sale): 15 March 2024 to December 2026 = approx 33 months.
- Qualifying occupation: January 2026 to December 2026 = 12 months as main residence.
- Final period exemption: 9 months (§5) — but Rosa was already in occupation in the final 9 months, so no additional exemption beyond the actual occupation.
- Non-qualifying period: approx 21 months (letting period).
- PPR fraction: (12 + 9) / 33. Wait: the 9-month final period overlaps with actual occupation here. Correct fraction: 12 / 33 = 36.4% (actual main residence months only, since final 9 months are within the 12-month occupation period).
- PPR relief = 36.4% x £49,750 = £18,109 (writer to recalculate with exact month counts).

**After PPR relief:**
- Chargeable gain = £49,750 - £18,109 = £31,641
- Less annual exempt amount (AEA): £3,000 (2026/27 AEA)
- Taxable gain: £28,641
- CGT at 24% (higher rate residential): £6,874

**60-day return required:** Yes — Rosa is a UK resident selling UK residential property with tax due. She must report and pay within 60 days of completion.

### Scenario: personal representative sells before assent

- PR sells estate property for £380,000; probate value £320,000.
- Gain: £60,000. PR rate: 24% (current, per GOV.UK from 6 April 2026).
- PR AEA: £3,000 (available in year of death and up to 2 following tax years per §39).
- Tax: (£60,000 - £3,000) x 24% = £13,680.
- 60-day return required (UK residential property, tax due).

### PR vs beneficiary path note

The PR rate is 24% (current). An individual basic-rate beneficiary pays only 18%. Where the property has modest growth from probate value, the TIMING of assent matters: if the PR assents before selling and the beneficiary is a basic-rate taxpayer, the CGT cost falls. Conversely, a basic-rate beneficiary who also has large employment income in the disposal year may be pushed to the 24% rate on part of the gain.

## FAQ expansion (8-12 full draft answers)

### Q1: What is the CGT base cost when I inherit a property?

Your CGT base cost is the market value of the property at the date the person died. This is called the probate value. It is established by a formal valuation (usually an RICS-qualified surveyor) and agreed with HMRC as part of the inheritance tax (IHT) process. It is recorded in the estate's IHT return (form IHT400 for larger estates, or IHT205 for estates below the IHT reporting threshold).

The key point is this: the base cost is NOT what the deceased originally paid for the property. If they bought it in 1985 for £40,000 and it was worth £350,000 when they died, your base cost is £350,000. You only pay CGT on growth from the date of death onwards, not on the gain that accumulated during the deceased's lifetime.

### Q2: Do I pay CGT when I inherit a property?

No — inheritance itself is not a disposal for CGT purposes. Under TCGA 1992 s.62(1), no CGT arises at the point of death. CGT only becomes relevant when you (or the estate) later sell or otherwise dispose of the property.

The estate may have paid inheritance tax on the property's value (if the estate exceeded the IHT nil-rate band), but that is a separate tax on the estate itself, not a CGT charge on you as the beneficiary. The two taxes operate independently: the IHT uses the probate value to compute the estate's liability; the CGT uses the same probate value as your acquisition cost going forward.

### Q3: What CGT rate does a personal representative pay?

Personal representatives (PRs) — executors and administrators — pay residential property CGT at 24% (current rate, applicable from 6 April 2026 per GOV.UK). This is the same rate as a higher-rate individual taxpayer. PRs do not get the graduated 18%/24% rate that individuals benefit from (where the 18% rate applies to gains that fall within the basic-rate income tax band).

PRs also receive the annual exempt amount (AEA) of £3,000 for the tax year of death and the two following tax years. After that, no AEA is available to the estate.

### Q4: Can I use the annual exempt amount on inherited property?

Yes. As a beneficiary (individual) who sells inherited property, you get the standard individual AEA for the tax year of disposal — £3,000 for 2024/25 onwards. This is deducted from your chargeable gain after any other reliefs (such as PPR) before CGT is computed.

If the PR sells before assent, the estate has its own AEA (£3,000) for the year of death and up to two further tax years. Once the estate's AEA expires, the PR pays CGT on the full gain with no exemption.

### Q5: What if the property has fallen in value since probate?

If you sell the inherited property for less than the probate value, you make a capital loss. Losses from property disposals are allowable and can be offset against capital gains from other assets in the same tax year, or carried forward to future years.

You cannot offset a capital loss on residential property against income — losses are CGT-only. Keep the probate valuation document and the sale proceeds figures carefully, as HMRC may query a large loss on an inherited property.

### Q6: How does the PR's two-year AEA window work?

The estate gets the AEA for the tax year in which death occurred, plus the two immediately following tax years. After that, the AEA drops to nil. For example, if death occurred in January 2024 (tax year 2023/24), the estate's AEA is available for 2023/24, 2024/25 and 2025/26. If the PR sells in 2026/27 or later, no AEA is available to the estate.

This creates a practical consideration: if the estate cannot be wound up quickly, the PR may lose the AEA before the property is sold. Planning the timing of assent and sale around this window can reduce the overall CGT cost.

### Q7: What if multiple beneficiaries inherit jointly?

Where two or more beneficiaries inherit a property jointly (for example, three siblings each inheriting a one-third share), each beneficiary is treated as owning their fraction of the property. Each one has their own CGT base cost (their share of the probate value) and their own AEA for the tax year of disposal.

A joint disposal means each beneficiary computes their own gain and pays their own CGT at their own marginal rate. One sibling may be a basic-rate taxpayer (18%) while another is a higher-rate taxpayer (24%) — both rates may apply within the same transaction across different beneficial owners.

### Q8: How does PPR interact with inherited property?

If you move into the inherited property as your main residence after inheriting it, you can claim private residence relief (PPR) from the date you begin to occupy it. PPR does NOT run from the date of death — it only starts when the property is actually your main home.

The 9-month final period exemption (§5) means that the last 9 months of your ownership period always qualify for PPR, even if you have moved out before selling. This helps where you move out and the property takes time to sell.

If the property was the deceased's main residence for part or all of their ownership, their PPR period does NOT transfer to you. Your PPR clock starts fresh from your own occupation.

### Q9: What records do I need for the probate valuation?

Keep the following documents to support the base cost:
- The RICS-qualified surveyor's valuation report (dated at or near the date of death).
- Correspondence with the District Valuer if HMRC challenged the estate's valuation.
- The IHT400 (or IHT205) showing the agreed property value.
- The grant of probate or letters of administration.
- The assent document (if the property was transferred from the estate to you before sale).

HMRC may enquire into the probate value years later when you sell. The surveyor's contemporaneous report is the primary evidence. If no formal valuation was obtained at the time, HMRC can challenge the base cost and substitute a lower figure, which increases your chargeable gain.

### Q10: When does the CGT clock start for inherited property?

For beneficiaries, the holding period runs from the date of death, not from the date the probate process completes or the date the property is formally transferred (assented) to you. This matters for two reasons:

First, the PPR clock (if the property is your main home from acquisition) could in theory run from death — but PPR requires actual occupation, not merely legal ownership, so in practice PPR only starts when you move in.

Second, for the purposes of the 60-day return, the relevant date is the date of completion of the sale. The holding period itself does not affect the rate for residential property (unlike pre-2008 taper relief); residential CGT is 18% or 24% regardless of how long you held the property.

### Q11: Is a 60-day return required when PPR fully covers the gain?

No. The 60-day return (introduced by Finance Act 2019 Sch 2) is only required where there is a tax liability to report and pay. If PPR eliminates the entire gain, no tax is due and no 60-day return is required for UK residents. (The position is different for non-UK residents, who must file a non-resident CGT return within 60 days even if no tax is due — but that is outside the scope of this page.)

Where PPR only partially covers the gain and some tax is due, the 60-day return is required for the chargeable balance.

### Q12: Can a deed of variation change the base cost for CGT?

Yes, subject to conditions. A deed of variation (DoV) under IHTA 1984 s.142 allows beneficiaries to redirect inherited assets within two years of death. Where an election is made under TCGA 1992 s.62(6), the variation is treated for CGT purposes as if the deceased had made the revised disposition. This can change who inherits the property and therefore whose base cost applies going forward.

The DoV mechanics are covered in more depth in the deed-of-variation page (cross-link when published). The key CGT point: the probate value at the original date of death remains the base cost; the DoV does not create a second valuation.

## Keyword seed set

From triage.json and gap discovery (queries mapped to related pages, adapted for this page's intent):

1. cgt on inherited property uk
2. capital gains tax inherited property probate value
3. probate value cgt base cost
4. do you pay cgt when you inherit a property
5. personal representative cgt rate uk
6. cgt on inherited property after letting
7. 60 day return inherited property
8. ppr on inherited property
9. selling inherited house cgt calculation
10. annual exempt amount personal representative
11. cgt on inherited property multiple beneficiaries
12. deed of variation cgt inherited property
13. inherited property base cost hmrc
14. tcga 1992 s62 probate base cost

## Format spec

**Tables:**
| Scenario | Who sells | CGT rate | AEA available |
|---|---|---|---|
| PR sells before assent | Personal representative | 24% (from 6 Apr 2026) | £3,000 (year of death + 2 years) |
| Beneficiary sells — higher-rate taxpayer | Individual | 24% | £3,000 per year |
| Beneficiary sells — basic-rate taxpayer | Individual | 18% (on gain within basic-rate band) | £3,000 per year |

**Schema:** FAQ schema (JSON-LD) — writer to inject at page level. Minimum 5 FAQ pairs from the answers above.

**Lead-form segment:** "Inherited property disposal" — trigger this segment when the lead-form question "What best describes your situation?" is answered with an inherited property disposal. Collect: approximate probate value, approximate sale price, whether the property was let after inheritance, whether beneficiary occupied as main home.

**Internal links:**
- `capital-gains-tax-property-complete-guide-uk` (pillar) — link from intro and conclusion.
- `cgt-payment-deadlines-property-sales-2026` — link from the 60-day section.
- `cgt-inherited-rental-property-calculation-uk` — cross-link as the letting-focus companion (scope note: that page goes deeper on the letting calculation; this page covers the base-cost mechanics and the PR-vs-beneficiary paths).
- Deed of variation page (future pick — flag if not yet live).

## Anti-templating cross-check

This brief is distinct from the overseas and gifting briefs in three structural ways. First, the base-cost mechanic is a STATUTORY STEP-UP (s.62): the gain up to death simply vanishes for CGT purposes. That is unique to inheritance — gifting and overseas disposals both compute gains from the original acquisition cost. Second, the PR-vs-beneficiary distinction (two possible selling parties, different rates) does not exist in the other briefs. Third, the 60-day reporting trigger here is: UK resident, UK land, tax due — the same trigger as any residential disposal, but the inherited context adds the question of whether the PR or the beneficiary is the reporting party. The overseas brief has no 60-day return at all; the gifting brief triggers the 60-day return only if the donor crystallises a CGT liability (which they do, under s.17 market-value rule). None of these mechanics overlap.

## HP drift log

No HP drift found. §39 is correctly applied: s.62(1) step-up confirmed via legislation.gov.uk; PR rate stated as "24% (current, from 6 April 2026)" per GOV.UK; PR AEA £3,000 + 2 years per §39. The seed brief's reference to "§5 house position" for the PR rate was slightly under-specified but not contradictory; §39 supersedes and locks the detail.

**BRIEF_DRIFT note (non-blocking):** The seed brief cited Finance Act 2019 Sch 2 for the 60-day return. CG30540 (live, updated 6 July 2026) confirms PRs file the 60-day return for UK residential property where tax is due. No conflict with the seed.

## Flags raised

None new for F-51..F-60 range. Existing locks (§39) cover all mechanics for this brief.

**INTERNAL_LINK flag:** `cgt-inherited-rental-property-calculation-uk` should back-link to this page once published (the letting-calculation page is a companion, not a replacement, for this base-cost guide).

## Work log

- 2026-07-08 S1 seed written (Stage 1 sub-agent, Session A).
- 2026-07-08 S2 extended: competitor URL verified (pillar page live, inheritance = 1 FAQ paragraph), authority links confirmed (CG30540 live, s.62 legislation.gov.uk live, GOV.UK rates page confirmed PR 24% from 6 Apr 2026), worked examples added (beneficiary + PR paths), 12 FAQ answers drafted, keyword seeds added, format spec added, anti-templating note added. S.252 NOT cited (overseas brief correction binding; not relevant here). HP §39 applied throughout.
