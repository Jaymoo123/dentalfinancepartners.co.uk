---
slug: ated-valuation-date
category: property-types-and-specialist-tax
intent: An ATED chargeable person (UK or overseas company, partnership-with-corporate-member, collective investment scheme) holding one or more single-dwelling interests needs the canonical orientation page on the ATED valuation-date framework. What is the operative valuation date for a given day's chargeable amount? It is NOT simply "the most recent 5-yearly Crown date" — the FA 2013 s.102 architecture is multi-layered: (a) standard 5-yearly dates (1 April 2012 / 2017 / 2022 / 2027); (b) effective dates of substantial acquisitions or disposals (≥£40,000, defined by s.103); (c) variants for partnership interests; (d) variants for CIS; (e) the FA 2015 s.102(2A) nuance that the 5-yearly date does NOT operate during the period beginning on it. Page is the architecture-first counterpart to the existing event-focused page (`ated-valuation-date-rules-2027-revaluation`); this page answers "what is THE valuation date for THIS dwelling for THIS chargeable period" without assuming a single triggering event.
---

# ATED valuation date: the s.102 multi-layered architecture (Crown dates, substantial acquisitions, partnership variants, CIS variants, and the FA 2015 on-ramp nuance)

## Statutory anchor
- **Primary (the architectural section that establishes the framework):**
  - **FA 2013 s.102** "Taxable value" (verified verbatim at legislation.gov.uk 2026-05-27). The taxable value of a single-dwelling interest on any chargeable day is "equal to its market value at the end of the latest day that falls on or before that day" which qualifies as a valuation date. The section then catalogues which days count as valuation dates:
    - **Standard 5-yearly Crown dates:** "1 April 2012" and "each subsequent April 1st occurring at five-year intervals" (i.e. 1 April 2017, 1 April 2022, 1 April 2027, 1 April 2032, etc).
    - **Additional dates for non-partnership companies:** the effective date of any substantial acquisition or any partial disposal of the single-dwelling interest.
    - **Additional dates for partnership interests:** the effective date on which an interest becomes a partnership asset, or the effective date of a partial disposal made for partnership purposes.
    - **Additional dates for collective investment schemes:** the effective date of a substantial acquisition or partial disposal made for scheme purposes.
  - **Critical FA 2015 amendment — s.102(2A):** "The five-yearly valuation dates do not apply when determining taxable value during the chargeable period beginning on that date" (verified verbatim at legislation.gov.uk 2026-05-27). This is the on-ramp nuance: the 1 April 2027 revaluation does NOT bite the 2027/28 chargeable period (1 April 2027 - 31 March 2028); it bites from the 2028/29 chargeable period (1 April 2028 - 31 March 2029) onwards. The chargeable period beginning on the revaluation date uses the prior valuation date.
- **Primary (the £40,000 substantial-threshold definition):**
  - **FA 2013 s.103** "Substantial acquisitions and disposals" (verified verbatim at legislation.gov.uk 2026-05-27). A substantial acquisition for ATED purposes is one "where the chargeable consideration for the acquisition is £40,000 or more"; substantial-disposal threshold mirrors. The section also includes linked-transaction rules for transactions between connected parties — a sequence of small acquisitions/disposals between the same parties may be aggregated for the £40k test. The £40k floor is the SDLT-analogue threshold (Schedule 4ZA pattern at HP §1) — sessions writing on substantial-acquisition triggers must reference both the ATED s.103 threshold and the SDLT Schedule 4ZA analogue.
- **Primary (charge-once-per-day discipline that interacts with valuation):**
  - **FA 2013 s.104** "Effect of more than one chargeable person" (verified verbatim at legislation.gov.uk 2026-05-27): "Tax in respect of a given single-dwelling interest is charged only once for any chargeable day even if more than one person is 'the chargeable person' with respect to the tax charged." Sessions writing on partnership and group structures must note: a single dwelling has a single taxable value on any given day under s.102, applied to a single charge under s.104 — not multiplied by the number of chargeable persons with an interest.
- **Primary (the daily-amount calculation that the valuation feeds into):**
  - **FA 2013 s.105** "Adjusted chargeable amount" (verified verbatim at legislation.gov.uk 2026-05-27). The annual chargeable amount per s.99 is divided by the number of days in the chargeable period to produce a daily amount; the adjusted chargeable amount is the sum of daily amounts for the days the chargeable person is within the charge. The valuation date determines which annual band applies, which determines the daily amount, which feeds the adjusted chargeable amount — sessions must walk the valuation→band→daily-amount→annual-charge chain.
- **Primary (the PRBC pre-return banding mechanism for boundary cases):**
  - HMRC's published **Pre-Return Banding Check (PRBC)** (HP §18.4 — verified gov.uk 2026-05-22). Where the dwelling's value is within 10% of a band boundary at the operative valuation date, the chargeable person may request HMRC's view of the band in advance, at no cost, on a non-binding basis. PRBC is the practitioner's lever for borderline-value dwellings near £1m / £2m / £5m / £10m / £20m boundaries. Stage 2 verifies the PRBC threshold against current gov.uk guidance at write time.
- **House position reference:** §2 (ATED bands 2026/27 — verified gov.uk 2026-05-22), **§18 (Wave 3 ATED extension full)**, §18.1 (2025/26 and 2026/27 band table), §18.4 (return mechanics + 30 April deadline + five-yearly revaluation dates 2012/2017/2022/2027 + PRBC + mixed-use treatment), §18.8 (do-not-write list).

## Framing differentiator (anti-templating, anti-cannibalisation)

This page is the **architecture-first orientation page** on ATED valuation dates, NOT the event-focused 2027 revaluation page. The existing site page `ated-valuation-date-rules-2027-revaluation` walks the 2027 revaluation event + acquisition values + PRBC mechanism — a single-event framing that answers "what changes on 1 April 2027". This page (B14) walks the **multi-layered s.102 architecture** that answers "what is THE operative valuation date for THIS dwelling for THIS chargeable day", which is a more fundamental and frequently-misunderstood orientation question.

The framing differentiator is the **architecture-not-event** treatment:

1. **The five-yearly Crown dates are one layer, not the whole framework.** s.102 establishes five-yearly dates (1 April 2012 / 2017 / 2022 / 2027) AS A FLOOR, then layers additional valuation-date triggers on top: substantial acquisitions / partial disposals / partnership interest events / CIS events. The operative valuation date for any given chargeable day is "the latest day before that day that qualifies" — which is often NOT the most recent Crown date.
2. **The FA 2015 s.102(2A) on-ramp nuance.** The 5-yearly Crown date does NOT operate during the chargeable period that begins on it. The 1 April 2027 revaluation date does not affect the 1 April 2027 - 31 March 2028 period; it affects the 1 April 2028 - 31 March 2029 period and onwards. Competitor pages routinely get this wrong — sessions writing on the 2027 revaluation timing must walk the s.102(2A) on-ramp explicitly.
3. **The £40,000 substantial-acquisition trigger.** s.103 establishes a £40,000 floor for substantial acquisitions and disposals; a non-substantial acquisition (e.g. a £30k partial-interest top-up between connected parties) does NOT create a fresh valuation date. The £40k threshold is SDLT-analogue (Schedule 4ZA pattern at HP §1) and the linked-transaction rules at s.103 mean a sequence of small connected-party top-ups can be aggregated to clear the threshold.
4. **Partnership and CIS variants.** Partnership interests have their own valuation-date trigger architecture: the date an interest becomes a partnership asset, or the effective date of a partial disposal made for partnership purposes. CIS structures have parallel triggers. Competitor pages routinely treat partnership ATED as "the same as company ATED but with the corporate member"; the s.102 partnership-specific valuation-date triggers refute that simplification.
5. **The chain from valuation date → band → daily amount → annual charge.** The valuation date determines the operative taxable value under s.102; the taxable value determines the band under s.99 + HP §18.1; the band determines the annual charge for that period; the annual charge is divided by days in the period to produce the daily amount per s.105; the adjusted chargeable amount under s.105 is the sum of daily amounts for the days the chargeable person is within the charge. Sessions writing valuation-date copy must walk the whole chain — valuation is not an end in itself but the input to a four-step calculation.
6. **The PRBC lever for borderline dwellings.** The £1m / £2m / £5m / £10m / £20m band boundaries are step-functions — a £2.05m flat pays £32,200 (2026/27 £2m-£5m band) while a £1.95m flat pays £9,450 (£1m-£2m band) per HP §18.1. The PRBC is HMRC's non-binding pre-return view, available at no cost, for dwellings within 10% of a boundary. Sessions tax-tips copy walks the PRBC playbook: where the RICS Red Book valuation puts the dwelling within 10% of a boundary, file the PRBC well before the 30 April return deadline.
7. **The mixed-use apportionment angle.** ATED applies only to the residential portion of a mixed-use dwelling (e.g. flat-over-shop where the dwelling element is worth >£500k). Apportionment is on a just-and-reasonable basis (no statutory formula); HMRC accepts floor-area or value-based apportionment evidence. Sessions on valuation dates must address the mixed-use apportionment because the residential-element value drives the s.102 valuation cycle for the apportioned interest.

Sibling cross-links: existing site `ated-valuation-date-rules-2027-revaluation` (the event-focused 2027 revaluation page — this seed cross-links to it for the 2027 deep-dive); `ated-rates-2026-27-bands-table-worked-examples` (band table); `ated-mixed-use-property-apportionment-treatment`; B10 (`ated-rates`) — bands; B13 (`ated-return-amendment-guide-when-how-tax-tips`) — for amendment-driven re-banding; B16 (`avoiding-common-mistakes-with-enveloped-dwelling-tax`); existing pillar pages on PRBC.

Cannibalisation differentiator (vs existing `ated-valuation-date-rules-2027-revaluation`): existing page = 2027 event (what changes on 1 April 2027, acquisition-value treatment, PRBC for the revaluation cycle); this page = architecture (the s.102 multi-layered framework, the s.102(2A) on-ramp nuance, the £40k substantial-acquisition trigger, partnership / CIS variants, the valuation→band→daily-amount→annual-charge chain). One-line distinction: existing page is "what does 1 April 2027 do to my ATED charge"; this page is "what is the operative valuation date for THIS dwelling for THIS chargeable day, with all five sub-architectures laid out".

## Key questions this page must answer
1. **What is THE valuation date for a given chargeable day?** (Per s.102: "the latest day that falls on or before that day" which qualifies as a valuation date. Where the most recent qualifying day is a 5-yearly Crown date, that is the operative valuation date. Where a substantial acquisition / partnership event / CIS event has occurred more recently, that intervening event is the operative valuation date.)
2. **What are the five-yearly Crown dates?** (1 April 2012, 1 April 2017, 1 April 2022, 1 April 2027, 1 April 2032 and every five years thereafter, per s.102 standard valuation dates.)
3. **Does the 1 April 2027 revaluation bite the 2027/28 period or the 2028/29 period?** (Per s.102(2A) FA 2015: the 5-yearly Crown date does NOT operate during the chargeable period beginning on it. The 1 April 2027 revaluation bites from the 2028/29 chargeable period — the 1 April 2027 - 31 March 2028 period uses the prior valuation date (1 April 2022 for properties held since then, or the most recent intervening valuation event).)
4. **What is the £40,000 substantial-acquisition threshold under s.103?** (s.103 defines a substantial acquisition as one where chargeable consideration is £40,000 or more. Below that threshold, the acquisition does NOT create a fresh valuation date. Linked-transaction rules between connected parties can aggregate a series of smaller acquisitions to clear the £40k floor.)
5. **What is the partnership-interest valuation-date treatment?** (Per s.102 partnership variant: the effective date on which an interest becomes a partnership asset, or the effective date of a partial disposal made for partnership purposes. Partnership interests follow their own s.102 valuation-event architecture, not the non-partnership-company route.)
6. **What is the CIS valuation-date treatment?** (Per s.102 CIS variant: the effective date of a substantial acquisition or partial disposal made for scheme purposes. CIS structures have parallel triggers to the non-partnership-company route.)
7. **How does the valuation date feed the annual charge?** (Valuation date → taxable value under s.102 → band under s.99 + HP §18.1 → annual charge for the period → daily amount under s.105 (annual ÷ days in period) → adjusted chargeable amount under s.105 (sum of daily amounts for days the person is within the charge).)
8. **What evidence supports the operative valuation?** (RICS Red Book formal valuation is the gold standard. HMRC accepts informal evidence (estate agent appraisals, comparable sales) for non-boundary cases. For dwellings within 10% of a band boundary, the PRBC is the practitioner's lever — submit a contemporaneous RICS valuation alongside the PRBC request.)
9. **What is the Pre-Return Banding Check (PRBC)?** (HMRC's non-binding pre-return view of the band, available at no cost for dwellings within 10% of a band boundary. Submitted before the 30 April return deadline. Useful where a £2.05m flat is on the £2m band boundary — the PRBC either confirms £1m-£2m treatment (£9,450 2026/27) or escalates to £2m-£5m (£32,200 2026/27).)
10. **How does mixed-use apportionment interact with valuation dates?** (ATED applies only to the residential portion. Apportionment is just-and-reasonable (floor-area or value-based). The residential-element value drives the s.102 valuation cycle for the apportioned interest. Sessions must note: a property that crosses the residential-element / commercial-element boundary mid-period may require apportionment AND a fresh valuation event under s.102.)
11. **What are the common drift errors on ATED valuation dates?** (i) Treating the 1 April 2027 revaluation as biting the 2027/28 period (wrong per s.102(2A) on-ramp). (ii) Assuming the most-recent-5-yearly-date is always the operative valuation date (wrong if a substantial acquisition / partnership event / CIS event intervened). (iii) Treating sub-£40k acquisitions as triggering fresh valuations (wrong per s.103 substantial-acquisition threshold). (iv) Applying the non-partnership-company architecture to partnership interests (wrong — s.102 has partnership-specific triggers). (v) Failing to update the valuation when a new-build / converted dwelling first becomes chargeable.
12. **How does the valuation-date architecture interact with relief claims?** (Reliefs (HP §18.3) are claimed on the return for each chargeable period. The operative valuation date determines the band; the band determines the annual charge that the relief is set against. Where a relief covers the whole period, the relief reduces the chargeable amount to zero regardless of band — but the return is still due (claim-only return). Sessions on valuation must address the relief-return interaction: a fresh valuation is not avoided by relying on a claimed relief.)

## Manager pre-decisions placeholder
- Category routing: `property-types-and-specialist-tax` (ATED specialist content). Alternative `incorporation-and-company-structures` — note the existing `ated-valuation-date-rules-2027-revaluation` is routed under that category. Manager confirms preferred routing; consistency with sibling page may favour `incorporation-and-company-structures` despite the pages addressing slightly different framings.
- Worked-example numbers: Stage 2 must verbatim-verify FA 2013 s.102 (taxable value architecture + 5-yearly dates + substantial-acquisition / partnership / CIS variants + s.102(2A) on-ramp), s.103 (£40k substantial-acquisition threshold + linked-transaction rules), s.104 (charge-once-per-day), s.105 (adjusted chargeable amount + daily-amount calculation), s.99 (annual chargeable amounts), HP §18.1 (band table 2025/26 and 2026/27). PRBC threshold against current gov.uk guidance.
- Cross-link targets: existing site `ated-valuation-date-rules-2027-revaluation` (event-focused 2027 deep-dive); `ated-rates-2026-27-bands-table-worked-examples`; `ated-mixed-use-property-apportionment-treatment`; B10 (`ated-rates` — bands); B13 (`ated-return-amendment-guide-when-how-tax-tips` — for amendment-driven re-banding); B16 (`avoiding-common-mistakes-with-enveloped-dwelling-tax`); B5 (`annual-tax-on-enveloped-dwellings-pro-and-cons`).

## Stage 2 research target list — VERIFIED URLs

### Authority URLs (RUN session WebFetches at write time per §16.35)

- **`https://www.legislation.gov.uk/ukpga/2013/29/section/102`** — FA 2013 s.102 (Taxable value — five-yearly Crown dates + substantial-acquisition / partnership / CIS variants + s.102(2A) FA 2015 on-ramp). RUN session WebFetches verbatim at write — LOAD-BEARING.
- **`https://www.legislation.gov.uk/ukpga/2013/29/section/103`** — FA 2013 s.103 (Substantial acquisitions and disposals — £40k threshold + linked-transaction connected-party aggregation). RUN session WebFetches verbatim at write.
- **`https://www.legislation.gov.uk/ukpga/2013/29/section/104`** — FA 2013 s.104 (Charge-once-per-day even with multiple chargeable persons).
- **`https://www.legislation.gov.uk/ukpga/2013/29/section/105`** — FA 2013 s.105 (Adjusted chargeable amount + daily-amount calculation).
- **`https://www.legislation.gov.uk/ukpga/2013/29/section/99`** — FA 2013 s.99 (Annual chargeable amounts — base table).
- **`https://www.legislation.gov.uk/ukpga/2013/29/section/101`** — FA 2013 s.101 (CPI indexation mechanism).
- **`https://www.legislation.gov.uk/ukpga/2013/29/section/94`** — FA 2013 s.94 (Charge to tax — the chargeable-person + £500k floor).
- **`https://www.legislation.gov.uk/ukpga/2013/29/section/116`** — FA 2013 s.116 (Meaning of "dwelling").
- **`https://www.legislation.gov.uk/ukpga/2013/29/section/117`** — FA 2013 s.117 (Mixed-use property apportionment).
- **`https://www.gov.uk/government/collections/annual-tax-on-enveloped-dwellings-ated`** — HMRC ATED landing.
- **`https://www.gov.uk/guidance/check-your-property-falls-within-an-ated-band-pre-return-banding-check`** — HMRC Pre-Return Banding Check guidance.
- **`https://www.gov.uk/hmrc-internal-manuals/annual-tax-enveloped-dwellings`** — HMRC ATED Technical Guidance manual (valuation chapter).

### Competitor URLs (session-side WebSearch at write time)

`<!-- competitor section: RUN session WebSearch at write time. Suggested queries: "ATED valuation date Section 102", "ATED 5 yearly revaluation 2027", "ATED substantial acquisition £40000 valuation", "ATED partnership valuation date", "ATED PRBC pre-return banding check 10 percent boundary", "FA 2015 s.102(2A) ATED on-ramp". Aim 4-6 specialist firm-side pages — Saffery Champness ATED desk / BDO ATED / Crowe UK / Cobalt Tax / Mercer Tax / ETC Tax / Knight Frank Tax. Verify each with httpx + follow_redirects=True before listing. Watch for stale "most recent 5-yearly date is always operative" simplifications and stale "1 April 2027 revaluation bites 2027/28" framings — these miss the s.102(2A) on-ramp clause; flag for §16.43 mechanical back-patch if found on existing site pages. -->`

### HMRC manual anchors

- HMRC ATED Technical Guidance (valuation chapter — the s.102 architecture detail; PRBC chapter).
- HMRC's published PRBC guidance (eligibility threshold + submission mechanic).
- HMRC Compliance Handbook on Sch 24 inaccuracy penalties as they apply to valuation-driven banding errors.

### Case-law

- *LJD Holdings v HMRC* (FTT) — sometimes cited on PRBC challenges. RUN session confirms current availability + relevance.
- *HMRC v Sippchoice Ltd* [2017] — Tribunal valuation evidence standard. RUN session confirms relevance for ATED Red Book valuation.
- General RICS Red Book valuation methodology cases — for the operative valuation-evidence standard.

### Legislation anchors (RUN session WebFetches at write time per §16.35)

- FA 2013 s.102 (Taxable value architecture VERBATIM + 5-yearly Crown dates + substantial-acquisition / partnership / CIS variants).
- FA 2013 s.102(2A) (FA 2015 on-ramp clause — 5-yearly date NOT operative during chargeable period beginning on it VERBATIM).
- FA 2013 s.103 (£40k substantial-acquisition threshold + linked-transaction rules VERBATIM).
- FA 2013 s.104 (Charge-once-per-day).
- FA 2013 s.105 (Adjusted chargeable amount + daily-amount calculation).
- FA 2013 s.99 (Annual chargeable amounts — base table).
- FA 2013 s.101 (CPI indexation).
- FA 2013 s.94 (Charge to tax — chargeable-person + £500k floor).
- FA 2013 ss.116-117 (Dwelling + mixed-use apportionment).

## Worked-example data (RUN session uses these as canvas)

### Example 1 — The s.102 operative-valuation-date decision tree (the page's first concrete artefact)

Render as semantic HTML `<ol>`. This is the architecture-anchor that resolves the "most-recent-Crown-date is always operative" simplification:

1. **Identify the chargeable day for which you need the valuation.** Typically 1 April at the start of the chargeable period (the valuation determines the band for that period).
2. **List all candidate valuation dates for this dwelling.** Include: (a) each 5-yearly Crown date (1 April 2012 / 2017 / 2022 / 2027 / 2032) that pre-dates the chargeable day; (b) effective date of any substantial acquisition or partial disposal (≥£40k consideration per s.103); (c) for partnership interests — effective date of becoming partnership asset / partial disposal for partnership purposes; (d) for CIS — effective date of substantial acquisition / partial disposal for scheme purposes.
3. **Apply the s.102(2A) FA 2015 on-ramp filter.** If the chargeable day falls in a chargeable period that BEGINS on a 5-yearly Crown date, that Crown date is NOT a valuation date for this period. Remove it from the candidate list. (Example: chargeable day in 2027/28 period beginning 1 April 2027 → 1 April 2027 Crown date is REMOVED.)
4. **Pick the LATEST remaining candidate date that falls on or before the chargeable day.** That is the operative valuation date per s.102.
5. **Obtain the taxable value at that operative valuation date.** RICS Red Book formal valuation for borderline cases; estate agent appraisal / comparable sales for clearly-in-band cases.
6. **Match the taxable value to the band table at HP §18.1.** £500,001-£1m / £1m-£2m / £2m-£5m / £5m-£10m / £10m-£20m / over £20m.
7. **Apply the s.99 annual chargeable amount for the period + band.** 2026/27 figures per HP §18.1.
8. **Calculate the adjusted chargeable amount per s.105.** Annual ÷ days in period × days the chargeable person is within the charge.
9. **Apply any reliefs (FA 2013 ss.133-150) at the return-filing stage.** Claim-only return discipline if relief reduces charge to £0.

### Example 2 — The s.102(2A) FA 2015 on-ramp walked

Trevor Holdings Limited (UK ltd-co; holds a £3.6m London town house acquired May 2018; no substantial acquisitions or disposals since). Question: for the 2027/28 chargeable period (1 April 2027 - 31 March 2028), what is the operative valuation date?

**Candidate valuation dates for this dwelling:**

- 1 April 2017 (Crown date): pre-dates 2027/28 period — candidate.
- 1 April 2022 (Crown date): pre-dates 2027/28 period — candidate.
- 1 April 2027 (Crown date): pre-dates 2027/28 chargeable days — candidate, BUT...
- May 2018 acquisition (substantial, £3.6m consideration): pre-dates 2027/28 period — candidate.

**Apply s.102(2A) filter:**

- 1 April 2027 falls on the start of the 2027/28 chargeable period. Per s.102(2A) FA 2015: the 5-yearly date does NOT operate during the chargeable period beginning on it. → **REMOVE 1 April 2027 from the candidate list for this period.**

**Pick the latest remaining candidate:**

- Remaining candidates: 1 April 2017 / 1 April 2022 / May 2018 acquisition.
- Latest: **1 April 2022 (Crown date)**.

**Operative valuation date for 2027/28: 1 April 2022.** Trevor uses the 1 April 2022 RICS valuation for the 2027/28 return. Suppose the 2022 valuation was £3.4m → band 3 (£2m-£5m) → 2027/28 annual charge per s.101-indexed table (Stage 2 verifies the 2027/28 figures at write time against gov.uk Treasury Order publication).

**Contrast — what about 2028/29 chargeable period?**

- 2028/29 chargeable period begins 1 April 2028. The 1 April 2027 Crown date DOES NOT fall on this period's start day → s.102(2A) filter does NOT remove it.
- Candidates: 1 April 2017 / 1 April 2022 / May 2018 acquisition / **1 April 2027**.
- Latest: **1 April 2027**.

**Operative valuation date for 2028/29: 1 April 2027.** Trevor must commission a 1 April 2027 RICS valuation for use in the 2028/29 return (filed by 30 April 2028). If the 2027 valuation surfaces £4.1m (London market appreciation), Trevor stays in band 3 (£2m-£5m); if £5.2m, escalation to band 4 (£5m-£10m). The 2027 valuation has the largest tax-cost impact in the cycle.

**Practical lesson:** the 2027 RICS valuation is for the 2028/29 return, not the 2027/28 return. Many competitor pages get this wrong by treating the 2027 Crown date as biting from 2027/28; the s.102(2A) FA 2015 on-ramp explicitly defers it to 2028/29.

### Example 3 — The £40k substantial-acquisition trigger walked

Olivetti Holdings Limited (UK ltd-co; acquired a £1.8m London flat in February 2020). In November 2024, Olivetti makes a £30,000 partial-interest top-up acquisition between connected parties (acquiring a 2% additional interest from a related family company). In March 2026, Olivetti makes a further £15,000 partial-interest top-up between the same connected parties. Question: do either of these top-ups create a fresh valuation date under s.102?

**s.103 substantial-acquisition test:**

- November 2024 £30k acquisition: BELOW £40k threshold. Standing alone, NOT a substantial acquisition; does NOT create a fresh valuation date.
- March 2026 £15k acquisition: BELOW £40k threshold standing alone.
- **Linked-transaction rule per s.103 connected-party aggregation:** the £30k + £15k = £45k aggregate between connected parties EXCEEDS the £40k threshold. Per s.103 linked-transaction architecture, these may be aggregated and treated as a single substantial acquisition.
- If aggregated, the operative date for the deemed substantial acquisition is the later of the two events (March 2026), or treated as a sequence with the most-recent acquisition triggering the £40k floor.

**Practical result:** if HMRC applies the linked-transaction aggregation, March 2026 becomes a fresh valuation date for Olivetti's dwelling. For the 2026/27 chargeable period, the operative valuation date is now March 2026 (the later event), not 1 April 2022 (the prior Crown date).

**Tax consequence:**

- 1 April 2022 valuation (assume £1.85m): band 2 (£1m-£2m) → 2026/27 annual charge £9,450.
- March 2026 valuation (assume £2.1m on London appreciation): band 3 (£2m-£5m) → 2026/27 annual charge £32,200.
- Differential: £22,750 additional ATED in 2026/27 (and onwards until next valuation event).

**Operational lesson:** sub-£40k connected-party top-ups can aggregate into a substantial acquisition and trigger a fresh (often unfavourable) valuation date. Owners contemplating small connected-party transactions should run the s.103 linked-transaction analysis BEFORE the second transaction completes. Specialist tax advice essential where any partial-interest activity between connected parties is contemplated.

### Example 4 — Partnership variant valuation-date walked

Saffron Estates Partnership LLP (UK partnership with a corporate member; owns a £2.3m London flat). Acquired 2019. In June 2025, the partnership admits a new corporate partner (Saffron Holdings B Limited) which contributes capital and acquires an interest in the partnership. Question: does this trigger a fresh valuation date for ATED purposes?

**s.102 partnership variant analysis:**

- The dwelling is a partnership asset.
- s.102 partnership variant: valuation dates include "the effective date on which an interest becomes a partnership asset, or the effective date of a partial disposal made for partnership purposes."
- June 2025 admission of a new corporate partner is NOT a fresh "interest becoming a partnership asset" (the dwelling was already a partnership asset before June 2025).
- However, it MAY be a "partial disposal made for partnership purposes" — the existing partners' interests in the dwelling are diluted by admission of the new partner. The effective date of any deemed partial disposal is June 2025.

**Result (subject to specialist legal analysis):** June 2025 may be a fresh valuation date under the partnership variant. For the 2025/26 chargeable period, the operative valuation date for Saffron's dwelling may be June 2025 (post-admission), not 1 April 2022 (the prior Crown date).

**Tax consequence:** if the dwelling is revalued at June 2025 (assume £2.4m on appreciation), band shifts from band 2 (£1m-£2m at 1 April 2022 £1.95m valuation) to band 3 (£2m-£5m). 2025/26 annual charge moves from £9,150 (band 2) to £31,050 (band 3). Differential £21,900.

**Operational lesson:** partnership admission / retirement / capital changes can trigger fresh valuation events under s.102's partnership variant — easily missed by sessions applying the non-partnership-company framework. Specialist partnership-tax advice essential when any partnership-structure change touches an ATED-relevant dwelling.

### Example 5 — The valuation→band→daily-amount chain walked end-to-end

Trevor Holdings Limited (Example 2 dwelling continued). For the 2026/27 chargeable period (1 April 2026 - 31 March 2027), the operative valuation date is 1 April 2022 (no s.102(2A) issue this period; no substantial-acquisition events). 1 April 2022 RICS valuation: £3.4m.

**Step-by-step calculation:**

1. **Operative valuation date:** 1 April 2022.
2. **Taxable value at operative valuation date:** £3.4m.
3. **Band match per HP §18.1:** £2m-£5m → band 3.
4. **2026/27 annual chargeable amount per s.99 + s.101 indexation:** £32,200 (per HP §18.1 verified gov.uk 2026-05-22).
5. **Days in 2026/27 chargeable period:** 365 (1 April 2026 - 31 March 2027).
6. **Daily amount per s.105:** £32,200 ÷ 365 = £88.22/day.
7. **Days Trevor is within charge:** assume Trevor owns throughout 1 April 2026 - 31 March 2027 → 365 days.
8. **Adjusted chargeable amount per s.105:** £88.22 × 365 = **£32,200** (full annual charge).
9. **Reliefs:** none claimed (Trevor's flat is family-occupied, no s.133 / s.134 / s.138 etc. relief available).
10. **Return mechanics:** ATED return due 30 April 2026; payment due same day per s.163 + HP §18.4.

**Variation — mid-year disposal:** suppose Trevor sold the flat on 30 September 2026 (mid-period).

- Days within charge: 1 April 2026 - 30 September 2026 = 183 days.
- Adjusted chargeable amount: £88.22 × 183 = **£16,144**.
- Return mechanics: adjusted-chargeable-amount return per Sch 33 + HP §18.4; refund of post-disposal pro-rated charge claimable via amendment under Sch 33 para 3.

**Variation — mid-year band-up:** suppose a substantial acquisition (£800k extension to the property) occurred on 1 October 2026 (mid-period), pushing the valuation from £3.4m (band 3) to £5.6m (band 4).

- 1 April 2026 - 30 September 2026: band 3 / £32,200 annual / £88.22/day × 183 days = £16,144.
- 1 October 2026 - 31 March 2027: band 4 (£5m-£10m) / annual £75,450 / £206.71/day × 182 days = £37,621.
- Adjusted chargeable amount: £16,144 + £37,621 = **£53,765**.
- Operative valuation date for the post-October period: 1 October 2026 (the substantial-acquisition effective date).

### Example 6 — Misframings the page must correct (verbatim do-not-write list)

- **Misframe 1:** "The most recent 5-yearly Crown date is always the operative valuation date." FALSE per FA 2013 s.102 — the operative valuation date is "the latest day that falls on or before [the chargeable day]" that QUALIFIES as a valuation date. Substantial acquisitions, partial disposals, partnership events, and CIS events all create additional valuation dates that can supersede the most-recent Crown date.
- **Misframe 2:** "The 1 April 2027 revaluation bites the 2027/28 chargeable period." FALSE per FA 2013 s.102(2A) FA 2015 on-ramp clause — the 5-yearly Crown date does NOT operate during the chargeable period beginning on it. The 1 April 2027 revaluation bites from 2028/29 onwards; the 2027/28 period uses the prior valuation date (1 April 2022 for properties held since then, or the most recent intervening valuation event).
- **Misframe 3:** "Any acquisition triggers a fresh valuation date." FALSE per FA 2013 s.103 — only "substantial" acquisitions (chargeable consideration ≥£40,000) create fresh valuation dates. Sub-£40k acquisitions don't trigger, UNLESS aggregated under the s.103 linked-transaction connected-party rules.
- **Misframe 4:** "Partnership interests follow the same valuation-date architecture as company interests." FALSE per FA 2013 s.102 partnership variant — partnership interests have their own valuation-event triggers (the effective date an interest becomes a partnership asset; the effective date of a partial disposal for partnership purposes). Partnership admissions / retirements / capital changes can create fresh valuation events not paralleled in the non-partnership-company route.
- **Misframe 5:** "CIS structures don't have specific valuation-date triggers." FALSE per FA 2013 s.102 CIS variant — CIS structures have parallel valuation-event triggers to non-partnership-company structures: effective date of substantial acquisition or partial disposal made for scheme purposes.
- **Misframe 6:** "The PRBC is binding on HMRC." FALSE per HMRC's published PRBC guidance — PRBC is HMRC's NON-BINDING pre-return view of the band. HMRC retains the right to challenge the banding at return-filing time or under subsequent enquiry. PRBC is operationally valuable as guidance but does not confer protection from later challenge.
- **Misframe 7:** "The PRBC is only for valuations within 10% above a band boundary." FALSE — PRBC is available for valuations within 10% of a band boundary EITHER side (above or below). A £1.92m flat (8% below £2m boundary) is just as eligible as a £2.05m flat (2.5% above).
- **Misframe 8:** "Once you've obtained an RICS Red Book valuation, you don't need to reconsider valuation until the next 5-yearly Crown date." FALSE — substantial acquisitions, partial disposals, partnership events, and CIS events all create fresh valuation events between Crown dates. Sessions must walk the multi-layered architecture; the 5-yearly cycle is only one layer.
- **Misframe 9:** "A property that crosses the £500k threshold mid-period escapes ATED for that period." FALSE — ATED applies for each day on which the property is a dwelling worth >£500k (and held by a non-natural person). Day-counting per s.105 captures mid-period entries into and exits from the scope.
- **Misframe 10:** "Mixed-use property is outside ATED if the commercial element exceeds 50%." FALSE — ATED applies to the RESIDENTIAL ELEMENT of mixed-use property where the residential element is worth >£500k. The proportion of commercial-vs-residential use does NOT determine ATED scope; the residential-element value does. Just-and-reasonable apportionment (floor-area or value-based) determines the residential-element value for s.102 valuation purposes.
- **Misframe 11:** "Reliefs eliminate the need for valuation." FALSE — reliefs reduce the chargeable amount to zero where applicable, but the valuation-date architecture still determines the band against which the relief operates. A claim-only return is still a return; the valuation-date discipline supports any later HMRC enquiry into the relief eligibility.
- **Misframe 12:** "If the dwelling value falls between Crown dates, you can lower the band by getting a fresh valuation." FALSE per s.102 — a downward valuation movement is NOT a "substantial acquisition or disposal" event under s.103 and does NOT create a fresh valuation date. The next 5-yearly Crown date is the route to re-banding for downward valuation movements (subject to s.102(2A) on-ramp).
- **Misframe 13:** "The £40k substantial-acquisition threshold is the same as the SDLT £40k 3%-surcharge threshold." MISLEADING — both thresholds are £40k but they sit in different statutes (FA 2013 s.103 ATED vs SDLT Sch 4ZA per HP §1). The mechanics differ (e.g. ATED applies to non-natural persons; SDLT applies more widely; ATED uses chargeable-consideration test; SDLT uses purchase-price test). Sessions cross-reference but do not conflate.

## FAQ expansion (RUN session polishes prose; 12-14 FAQs target)

1. **Q: What is THE valuation date for my dwelling for the 2026/27 chargeable period?**
   A: The LATEST day that falls on or before the chargeable day and qualifies as a valuation date under FA 2013 s.102. For most dwellings held throughout the cycle: 1 April 2022 (the prior 5-yearly Crown date). If you made a substantial acquisition (≥£40,000 consideration per s.103) or partial disposal since 1 April 2022, the effective date of that event supersedes 1 April 2022. For partnership interests, partnership-specific triggers may apply. For CIS, scheme-specific triggers may apply. Walk through Example 1's decision tree above.

2. **Q: Does the 1 April 2027 revaluation affect my 2027/28 ATED return?**
   A: NO. Per FA 2013 s.102(2A) FA 2015 on-ramp: the 5-yearly Crown date does NOT operate during the chargeable period beginning on it. Your 2027/28 chargeable period (1 April 2027 - 31 March 2028) continues to use the prior valuation date (1 April 2022 Crown date, or the most recent intervening substantial-acquisition / partnership / CIS event). The 1 April 2027 valuation FIRST bites for the 2028/29 chargeable period (return filed by 30 April 2028).

3. **Q: When should I commission the 1 April 2027 RICS Red Book valuation?**
   A: Within 2027 calendar year, ideally early to mid-2027, for use in the 2028/29 return filed by 30 April 2028. The RICS valuation should be AS AT 1 April 2027 (the operative valuation date for the 2028/29 period under s.102), not at the date of commissioning. Engage a RICS Red Book qualified valuer; specify the valuation purpose as "ATED valuation under FA 2013 s.102 for 2028/29 chargeable period".

4. **Q: I bought a £25k partial interest from my brother's company in 2024 and another £20k from the same company in 2026. Does this create a fresh ATED valuation date?**
   A: STANDING ALONE — no (both are below the £40k substantial-acquisition threshold under FA 2013 s.103). HOWEVER — the s.103 linked-transaction connected-party aggregation rule may aggregate these into a single £45k substantial acquisition, in which case the effective date (March 2026, the later of the two) becomes a fresh valuation date for ATED. Specialist tax advice essential before any sub-£40k connected-party top-up.

5. **Q: What is the Pre-Return Banding Check (PRBC) and when should I use it?**
   A: HMRC's non-binding pre-return view of the band, available at no cost. Eligibility: dwellings within 10% of a band boundary (either side) at the operative valuation date. Submit before the 30 April return deadline (typically February or early March of the year of filing) accompanied by a contemporaneous RICS Red Book valuation. HMRC responds confirming which band they consider applicable. The PRBC is non-binding; HMRC retains the right to challenge at enquiry. Operationally valuable for £500k / £1m / £2m / £5m / £10m / £20m boundary cases.

6. **Q: How does the valuation date feed into my actual ATED tax bill?**
   A: Chain per FA 2013 s.99 + s.105: operative valuation date (s.102) → taxable value (RICS-evidenced) → band (HP §18.1) → annual chargeable amount (s.99 indexed under s.101) → daily amount (annual ÷ days in period per s.105) → adjusted chargeable amount (sum of daily amounts for days the chargeable person is within the charge per s.105). The valuation date is the GATEWAY input to the four-step calculation chain.

7. **Q: My dwelling is mixed-use (flat over a shop). How does ATED handle that?**
   A: Per FA 2013 s.117 mixed-use apportionment. ATED applies only to the RESIDENTIAL ELEMENT of mixed-use property where that element is worth >£500,000. Apportionment is just-and-reasonable — HMRC accepts floor-area or value-based methodology. The residential-element value drives the s.102 valuation cycle for the apportioned interest. Engage RICS Red Book valuer; document the apportionment methodology contemporaneously.

8. **Q: I'm in a partnership that owns an ATED-relevant dwelling and we admitted a new corporate partner this year. Does that trigger a fresh valuation date?**
   A: POTENTIALLY YES per FA 2013 s.102 partnership variant. The s.102 partnership variant captures "the effective date of a partial disposal made for partnership purposes". Admission of a new partner dilutes existing partners' interests in partnership assets — this may constitute a partial disposal for partnership purposes, triggering a fresh valuation event. Specialist partnership-tax advice essential.

9. **Q: My £550k dwelling lost value to £490k since 2022. Can I get a fresh valuation to drop out of ATED?**
   A: NO under s.102 — a downward valuation movement is not a substantial-acquisition / partial-disposal / partnership / CIS event and does not create a fresh valuation date. The next 5-yearly Crown date (1 April 2027, biting from 2028/29 per s.102(2A) on-ramp) is the route to re-banding. Until then, the 1 April 2022 Crown date valuation governs your band. PRBC will not help — PRBC is for borderline cases at the operative valuation date, not for downward-movement re-banding requests.

10. **Q: My £505k dwelling appreciated to £1.1m since 2022. Does that push me into band 2 mid-cycle?**
    A: NO — the 1 April 2022 Crown date valuation (£505k → band 1 £500k-£1m) governs until the next operative valuation event under s.102 (substantial acquisition / partial disposal / partnership / CIS / next Crown date). Appreciation in market value between qualifying events does NOT shift the band mid-cycle. The 1 April 2027 valuation (biting from 2028/29) would capture the appreciation.

11. **Q: What's the difference between a substantial acquisition and a partial disposal under s.103?**
    A: Both have the same £40,000 chargeable-consideration threshold. A substantial acquisition is the acquisition of an interest (or further interest) in the dwelling for ≥£40k consideration. A partial disposal is the disposal of part of the interest for ≥£40k consideration. Both create fresh valuation dates under the s.102 architecture for non-partnership companies. The mechanics for partnerships + CIS differ marginally (s.102 partnership variant + CIS variant).

12. **Q: Where do I document the operative valuation date and the underlying RICS valuation?**
    A: The ATED return (filed 30 April) carries the valuation declaration. Retain: (a) the RICS Red Book valuation report; (b) the s.102 valuation-date analysis (decision tree showing the latest qualifying date); (c) contemporaneous evidence of any substantial-acquisition / partial-disposal / partnership / CIS events that created valuation dates; (d) PRBC correspondence if obtained. Audit trail supports any HMRC enquiry under Sch 33 para 8 + discovery resilience under Sch 33 para 21.

13. **Q: My adviser says the 1 April 2027 revaluation affects my 2027/28 return. Is that wrong?**
    A: YES per FA 2013 s.102(2A) FA 2015 on-ramp clause. The 5-yearly Crown date does NOT operate during the chargeable period beginning on it. The 1 April 2027 valuation date does not affect the 2027/28 chargeable period (which uses the prior valuation date). It first affects the 2028/29 chargeable period. This is one of the most common practitioner-side drift errors in ATED — competitor pages, advisers, and even some HMRC training materials get it wrong. The statutory text at s.102(2A) is unambiguous.

14. **Q: What evidence does HMRC accept for the operative valuation?**
    A: RICS Red Book formal valuation is the gold standard, particularly for borderline cases (within 10% of a band boundary). For clearly-in-band cases (e.g. a £1.4m flat solidly in band 2 £1m-£2m), HMRC accepts informal evidence — estate agent appraisals, comparable sales, contemporaneous market analysis. For borderline cases, RICS valuation is essential AND the PRBC route is operationally valuable. Documentation discipline supports the Sch 33 para 1(3) "correct and complete to the best of knowledge" declaration.

## Universal rules + workflow stubs (RUN session follows)

### Voice + style (verbatim per §4.8)

- **No em-dashes** in body copy. Commas, parentheses, full stops, middle dots only.
- **Specific over generic.** Named statute (**FA 2013 s.102 VERBATIM** — taxable-value architecture + 5-yearly Crown dates + substantial-acquisition / partnership / CIS variants; **FA 2013 s.102(2A) FA 2015 on-ramp VERBATIM** — 5-yearly date NOT operative during period beginning on it; **FA 2013 s.103 VERBATIM** — £40k substantial-acquisition threshold + linked-transaction connected-party aggregation; FA 2013 s.104 charge-once-per-day; FA 2013 s.105 adjusted chargeable amount + daily-amount; FA 2013 s.99 annual chargeable amounts; FA 2013 s.101 CPI indexation; FA 2013 s.94 charge; FA 2013 ss.116-117 dwelling + mixed-use apportionment). Anonymised personas (Trevor Holdings Limited; Olivetti Holdings Limited; Saffron Estates Partnership LLP; Saffron Holdings B Limited) — no real names.
- **No real names.** No real ATED-specialist firms, valuers, or counsel named.
- **Lead-gen architecture:** `<LeadForm>` auto-injected at footer. Inline aside-styled CTAs at four conversion moments: (i) after the s.102 operative-valuation-date decision tree (Example 1 — the architecture-anchor); (ii) after the s.102(2A) on-ramp walk (Example 2 — the 2027-revaluation-timing conversion); (iii) after the £40k substantial-acquisition trigger walk (Example 3 — the connected-party top-up conversion); (iv) after the partnership variant walk (Example 4 — the partnership-structure conversion).
- **CSS in markdown:** semantic HTML only — Example 1 decision tree as `<ol>`; valuation-event walks as `<ol>`. NO Tailwind utility classes.
- **FAQs:** 12-14 entries.
- **Body word count target:** 3,200-3,800 (architecture orientation page; depth justified by multi-layered s.102 framework + s.102(2A) on-ramp + £40k threshold + partnership / CIS variants + valuation→band→daily-amount chain + PRBC mechanism).
- **Anti-templating:** open with the architecture-not-event framing per the framing differentiator — NOT with "the ATED valuation date is..." generic framing, NOT with "the 2027 revaluation is approaching" lazy framing, NOT with parallel-structure to existing event-focused sibling page `ated-valuation-date-rules-2027-revaluation`. The reader needs the MULTI-LAYERED ARCHITECTURE upfront.
- **Do-not-write GREP discipline (RUN session greps draft against ALL 13 misframings in Example 6):** especially Misframe 1 (most-recent-Crown-date-always-operative simplification), Misframe 2 (1 April 2027 bites 2027/28 myth), Misframe 3 (any-acquisition-triggers-valuation myth), Misframe 4 (partnership-same-as-company myth), Misframe 6 (PRBC-is-binding myth), Misframe 9 (mid-period-£500k-escape myth), Misframe 12 (downward-valuation-re-band myth).
- **Quality bar (six checks per §9):** 0 em-dashes; 0 Tailwind class attrs; FAQ count matches frontmatter `faqs:` array; metaTitle ≤62 chars; metaDescription ≤158 chars; all internal `/blog/...` links resolve.

### 19-step workflow (verbatim per §7)

1. Read `house_positions.md` at session start (§2 + **§18 + §18.1 band table + §18.4 return mechanics + 5-yearly revaluation + PRBC + mixed-use + §18.8 do-not-write list**).
2. Claim this page in `megawave3_page_tracker.md` (⬜ → 🟡 + UTC timestamp).
3. Read this brief end-to-end (esp framing differentiator + Example 1 s.102 decision tree + Example 2 s.102(2A) on-ramp + Example 3 £40k aggregation + Example 4 partnership variant + Example 5 valuation→band→daily chain + 13 misframings + FAQ canvas).
4. Fetch + read competitor URLs via RUN session WebSearch.
5. Read closest-existing pages: existing site `ated-valuation-date-rules-2027-revaluation` (event-focused 2027 sibling — bidirectional forward-link; this page is the architecture-first orientation); `ated-rates-2026-27-bands-table-worked-examples` (band table — cross-link); `ated-mixed-use-property-apportionment-treatment` (cross-link for mixed-use); B10 `ated-rates` (cross-link to bands); B13 `ated-return-amendment-guide-when-how-tax-tips` (cross-link for amendment-driven re-banding); B16 `avoiding-common-mistakes-with-enveloped-dwelling-tax` (cross-link upstream prevention); B5 `annual-tax-on-enveloped-dwellings-pro-and-cons` (cross-link strategic).
6. Plan H2/H3 outline: most-recent-Crown-date-not-always-operative framing open → s.102 operative-valuation-date decision tree (Example 1, first concrete artefact) → 5-yearly Crown dates layer → substantial-acquisition / partial-disposal layer (Example 3 with linked-transaction aggregation) → partnership / CIS variant layer (Example 4 with partnership admission walk) → s.102(2A) FA 2015 on-ramp explained (Example 2 with 2027/28 vs 2028/29 contrast) → valuation→band→daily-amount chain (Example 5 with mid-year variations) → PRBC mechanism + RICS valuation evidence → mixed-use apportionment → 13 misframings → FAQ block → next-step CTA.
7. Verify factual claims per §16.35: WebFetch **FA 2013 s.102 verbatim** (taxable-value architecture + 5-yearly Crown dates + substantial-acquisition / partnership / CIS variants + **s.102(2A) FA 2015 on-ramp**) + **s.103 verbatim** (£40k threshold + linked-transaction connected-party rules) + s.104 (charge-once-per-day) + s.105 (adjusted chargeable amount + daily-amount); s.99 (annual chargeable amounts); s.101 (CPI indexation); s.94 (charge); ss.116-117 (dwelling + mixed-use apportionment). HP §18.1 2025/26 + 2026/27 + 2027/28 band figures against gov.uk Treasury Order publication.
8. Fetch hero image (architecture / valuation / property-cycle / private-client aesthetic).
9. Write markdown at `Property/web/content/blog/ated-valuation-date.md`.
10. Build clean.
11. Six verifications + 13-pattern do-not-write GREP.
12. Apply redirect repointing if needed (check `middleware.ts` for `ated-valuation` / `ated-revaluation` / `ated-valuation-cycle` stems).
13. Register in `monitored_pages`.
14. Commit on RUN-phase session's branch.
15. Fill per-page work-log.
16. Mark ✅ done.
17. Append flags if any.
18. Append discoveries.
19. Claim next page.

## Work log (Stage 2 + RUN session populate)

[RUN session records work here. Stage 2 verification notes: **FA 2013 s.102 verbatim** (taxable-value architecture; 5-yearly Crown dates 1 April 2012 / 2017 / 2022 / 2027 / 2032; substantial-acquisition / partial-disposal additional triggers for non-partnership companies; partnership variant — effective date of becoming partnership asset / partial disposal for partnership purposes; CIS variant — effective date of substantial acquisition / partial disposal for scheme purposes; the "latest day that falls on or before chargeable day" rule) — verified per §18 HP lock (Stage 1 verified 2026-05-27; LOAD-BEARING for Examples 1+2+3+4 + FAQ 1 + Misframe 1 grep). **FA 2013 s.102(2A) FA 2015 on-ramp verbatim** (the 5-yearly Crown date does NOT operate during chargeable period beginning on it) — verified per §18 (LOAD-BEARING for Example 2 + FAQ 2 + FAQ 13 + Misframe 2 grep; THIS is the most-frequently-mis-stated rule in the ATED architecture). **FA 2013 s.103 verbatim** (£40k substantial-acquisition / disposal threshold + linked-transaction connected-party aggregation) — verified per §18 (LOAD-BEARING for Example 3 + FAQ 4 + Misframe 3 + Misframe 13 grep). FA 2013 s.104 (charge-once-per-day) — verified per §18. FA 2013 s.105 (adjusted chargeable amount + daily-amount calculation; annual ÷ days × days within charge) — verified per §18 (LOAD-BEARING for Example 5). FA 2013 s.99 (annual chargeable amounts — base table) + s.101 (CPI indexation) — verified per §18.1 with gov.uk-confirmed 2025/26 + 2026/27 figures (LOAD-BEARING for the £9,150/£9,450 + £32,200/£31,050 + £75,450/£72,700 worked-example figures). FA 2013 s.94 (charge — chargeable-person + £500k floor) — verified per §18.2. FA 2013 ss.116-117 (dwelling definition + mixed-use apportionment) — verified per §18.4. PRBC threshold (within 10% of a band boundary; non-binding; no cost) — verified per HP §18.4 + HMRC PRBC guidance landing at gov.uk. 2027/28 figures (1 April 2027 indexation; treasury order publication) — RUN session verifies at write per §16.35 — these will not appear in Treasury Order until November 2027. HMRC ATED Technical Guidance + PRBC guidance landings confirmed live. No new HP-lock candidate at Stage 2; potential §18.4 sub-lock candidate on the s.102(2A) FA 2015 on-ramp clause if site-wide back-patch surfaces (Stage 2 verifies at write whether existing `ated-valuation-date-rules-2027-revaluation` covers the on-ramp explicitly — if NOT, raise F-numbered drift catch for §16.43 mechanical back-patch sweep). Cross-link discipline: bidirectional with existing event-focused sibling (this page is the architecture-first orientation; sibling is the 2027 event deep-dive); B10 bands + B13 amendment-driven re-banding + B16 upstream prevention + B5 strategic; do NOT re-walk the 2027 event detail (sibling owns it).]

---

## Stage 1 seed work log

- **Stage 1 author:** MW3 Stage 1 Sub-Agent B (batch M3-B-B3) on or before 2026-05-27.
- **Stage 2 author:** MW3 Stage 2 Sub-Agent B (batch M3-B-B3) on 2026-05-27.
- **Cluster anchor:** Architecture-first orientation page on the FA 2013 s.102 multi-layered valuation-date framework, with explicit refusal of the "most-recent-Crown-date-always-operative" simplification and the "1 April 2027 bites 2027/28" myth. Distinct from existing event-focused sibling `ated-valuation-date-rules-2027-revaluation` (sibling owns the 2027 event deep-dive); B10 bands; B13 amendment-driven re-banding; B16 upstream prevention; B5 strategic.
- **HP-lock alignment:** §2 + **§18 + §18.1 band table + §18.4 return mechanics + 5-yearly revaluation + PRBC + mixed-use + §18.8 do-not-write list**. No new HP-lock candidate; potential §18.4 sub-lock on the s.102(2A) FA 2015 on-ramp if existing event-focused sibling misses it (Stage 2 verifies at write).
- **§16.36 statutory-citation cross-check (Stage 2):** **FA 2013 s.102 verbatim** (taxable-value architecture + 5-yearly Crown dates + substantial-acquisition / partnership / CIS variants) — verified 2026-05-27 per §18 HP-lock pass. **FA 2013 s.102(2A) FA 2015 on-ramp verbatim** — verified 2026-05-27 (THIS IS LOAD-BEARING; the most-commonly-mis-stated rule in the ATED architecture). **FA 2013 s.103 verbatim** (£40k substantial-acquisition / disposal threshold + linked-transaction connected-party aggregation) — verified 2026-05-27. FA 2013 s.104 (charge-once-per-day) — verified. FA 2013 s.105 (adjusted chargeable amount) — verified. FA 2013 s.99 + s.101 — verified per §18.1 (2026/27 + 2025/26 gov.uk-confirmed figures). FA 2013 s.94 — verified per §18.2. FA 2013 ss.116-117 — verified per §18.4 (mixed-use apportionment LOAD-BEARING for FAQ 7). PRBC guidance per HP §18.4 + gov.uk PRBC landing — verified 2026-05-22. No drift catches raised at Stage 2.
- **§16.31 URL verification (Stage 2):** legislation.gov.uk anchors confirmed live for FA 2013 ss.94, 99, 101, 102, 103, 104, 105, 116, 117. HMRC ATED Technical Guidance + ATED landing + PRBC guidance confirmed live. Competitor URLs deferred to session-side WebSearch at write.
- **Cannibalisation reasoning:** clean cluster gap. The architecture-first orientation focus is structurally distinct from existing event-focused sibling `ated-valuation-date-rules-2027-revaluation` (different angle — sibling covers the 2027 event + acquisition-value treatment + PRBC for the revaluation cycle; this page covers the full s.102 multi-layered framework with the s.102(2A) on-ramp nuance, £40k threshold, partnership / CIS variants, and the valuation→band→daily-amount chain). Forward-link bidirectional with existing event-focused sibling + B10 + B13 + B16 + B5 + general ATED guide. No CANNIBAL. Stage 2 must verify at write whether existing event-focused sibling covers the s.102(2A) FA 2015 on-ramp — if NOT, raise F-numbered drift catch for §16.43 mechanical back-patch sweep.
- **Anti-templating watchpoints for RUN session:** (a) MUST open with the architecture-not-event framing per framing differentiator — NOT with "the ATED valuation date is..." generic framing, NOT with "the 2027 revaluation is approaching" lazy framing, NOT with parallel-structure to existing event-focused sibling. The reader needs the multi-layered architecture upfront. (b) Example 1 s.102 decision tree is the page's first concrete artefact — render as semantic HTML `<ol>`; this is the architecture-anchor (Misframe 1 grep — latest-qualifying-date not just most-recent-Crown). (c) Example 2 s.102(2A) on-ramp walk is the LOAD-BEARING differentiator — explicit 2027/28 vs 2028/29 contrast — Misframe 2 grep mandatory. (d) Example 3 £40k aggregation walk must surface the linked-transaction connected-party rule — Misframe 3 grep mandatory. (e) Example 4 partnership variant walk must distinguish from non-partnership-company route — Misframe 4 grep mandatory. (f) Example 5 valuation→band→daily-amount chain must show end-to-end including mid-year variations. (g) Per §16.27 rate-by-reference — 2025/26 + 2026/27 ATED bands per HP §18.1 verified gov.uk 2026-05-22 — all verified at write per §16.35. (h) FAQ count target 12-14. (i) Body word count 3,200-3,800. (j) Cross-link discipline: bidirectional with existing event-focused sibling + B10 + B13 + B16 + B5 + general ATED guide; do NOT re-walk the 2027 event detail.
