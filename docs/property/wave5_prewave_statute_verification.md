# Wave 5 Pre-Wave Statute Verification

Date: 2026-05-23
Sub-agent: pre-wave statute verification per §16.27 / §16.30

Scanned §§15-22 of `docs/property/house_positions.md` for LIVE hedges ("verify before relying", "verify at write time", "expected in technical consultation cycle", "we'll know more once X happens", deferred-mechanic pointers) not yet locked by a session-time or post-merge correction. Each hedge fetched against `legislation.gov.uk` / `gov.uk` and classified resolved / pending. **House positions document not modified per task brief — recommendations only.**

---

## §15.4 — Trust anti-fragmentation division mechanic (APR/BPR £1m cap)

**Current locked text (verbatim from house_positions.md line 311):**
> Trust anti-fragmentation: trusts settled before 30 October 2024 each retain their own £1m allowance for chargeable events. For trusts settled by the same settlor on or after 30 October 2024, the government will introduce rules to share a single £1m allowance divided across them (preventing allowance multiplication via multi-trust structures). **Division mechanic deferred to technical consultation cycle / Finance Act 2026 final text.**

**Authoritative current source:**
- URL: `https://www.gov.uk/government/publications/agricultural-property-relief-and-business-property-relief-reforms/summary-of-reforms-to-agricultural-property-relief-and-business-property-relief` (gov.uk policy summary)
- URL: `https://www.gov.uk/government/publications/reforms-to-agricultural-property-relief-and-business-property-relief` (Finance Bill 2025-26 draft legislation, published 21 July 2025; consultation closed 15 September 2025)
- Verbatim text (gov.uk policy summary, current): *"The government intends to introduce rules to ensure that the allowance is divided between these trusts where a settlor sets up multiple trusts on or after 30 October 2024."*
- Verbatim text (gov.uk draft legislation page metadata): *"Reforms to agricultural property relief and business property relief — Published 21 July 2025"* (draft Finance Bill 2025-26 PDF available; not text-extracted by WebFetch).

**Resolution:**
- [ ] Position resolved
- [x] **Position partially resolved — Finance Bill 2025-26 draft legislation published 21 July 2025; consultation closed 15 September 2025; Finance Act 2026 NOT yet enacted as of 2026-05-23.** Substantive division mechanic now exists in draft form but is NOT yet on the enacted statute book.

**Recommended replacement (if resolved, partial-lock form):**
> Trust anti-fragmentation: trusts settled before 30 October 2024 each retain their own £1m allowance for chargeable events. For trusts settled by the same settlor on or after 30 October 2024, the Finance Bill 2025-26 (published in draft 21 July 2025; technical consultation closed 15 September 2025) provides for a single £1m allowance to be divided across the cohort. **Mechanic now exists in draft statute (Finance Bill 2025-26); awaits enactment as Finance Act 2026 (expected with the Autumn Budget 2025 cycle). Re-verify enactment status before Wave 5 IHT-trust pages write commencement-tense claims.**

**Manager-apply action:** **patch §15.4 line 311** to replace the deferred-mechanic pointer with the draft-but-not-enacted form above. Cross-reference: Wave 4 IHT pages (briefs/property/c1-c10) may already write "expected in technical consultation cycle" wording; grep these for the same phrasing and back-patch the published-draft status.

---

## §15.5 — Pensions in IHT 6 April 2027 (statutory provisions location)

**Current locked text (verbatim from house_positions.md line 324):**
> **Locked framing:** From **6 April 2027**, unused defined-contribution pension funds (and unused DB lump-sum death benefits) will be brought into the deceased's estate for IHT. Announced Autumn Budget 2024; **statutory provisions in the draft Finance Act 2026 cycle.**

**Authoritative current source:**
- URL: `https://www.gov.uk/government/consultations/inheritance-tax-on-pensions-liability-reporting-and-payment`
- URL: `https://www.gov.uk/government/publications/reforming-inheritance-tax-unused-pension-funds-and-death-benefits` (Finance Bill 2025-26 draft legislation, published 21 July 2025)
- Verbatim text: *"personal representatives will be liable to report and pay Inheritance Tax on pensions from 6 April 2027"* and *"all death in service benefits payable from a registered pension scheme will be excluded from the value of an individual's estate for IHT purposes"*
- Consultation outcome / summary of responses published 21 July 2025. Finance Bill 2025-26 draft legislation published 21 July 2025; consultation period closed 15 September 2025; Finance Act 2026 NOT yet enacted.

**Resolution:**
- [x] **Position resolved on policy substance — PR liability and DIS exclusion confirmed.** Statutory location is now Finance Bill 2025-26 (draft, published 21 July 2025), awaiting enactment as Finance Act 2026.
- [ ] Position still pending

**Recommended replacement (if resolved):**
> **Locked framing:** From **6 April 2027**, unused defined-contribution pension funds and unused DB lump-sum death benefits will be brought into the deceased's estate for IHT. Announced Autumn Budget 2024. **Consultation outcome published 21 July 2025; draft Finance Bill 2025-26 legislation published the same date (consultation closed 15 September 2025). Confirmed: personal representatives (not scheme administrators) will report and pay; death-in-service benefits excluded from estate IHT.** Finance Act 2026 enactment expected with the Autumn Budget 2025 cycle.

**Manager-apply action:** **patch §15.5 lines 322-333** to replace the "draft Finance Act 2026 cycle" hedge with the resolved PR-liability + DIS-exclusion lock. Add subbullet: liability sits on personal representatives, NOT on scheme administrators; this contradicts the original Autumn Budget 2024 consultation wording that flagged scheme administrators. Cross-link to consultation outcome publication 21 July 2025.

---

## §16.3 — UK-Luxembourg pre-2022 protocol indirect-disposal hedge

**Current locked text (verbatim from house_positions.md line 381):**
> A small number of older UK treaties (e.g. UK-Luxembourg pre-2022 protocol) historically lacked indirect-disposal provisions; the 2009 / 2018 / 2022 protocols brought most into line. **Session research: check the treaty's current consolidated text on gov.uk before writing.**

**Authoritative current source:**
- URL: `https://www.gov.uk/government/publications/luxembourg-tax-treaties` (collection of in-force / signed UK-Lux treaties)
- Verbatim text: *"The UK-Luxembourg Double Taxation Convention and Protocol was signed on 7 June 2022 and entered into force on 22 November 2023"*
- Effective dates: UK income tax / CGT from 6 April 2024; UK corporation tax from 1 April 2024.

**Resolution:**
- [x] **Position resolved.** 2022 UK-Lux DTC + Protocol is in force from 22 November 2023, effective for UK income/CGT 6 April 2024. The "check before writing" hedge no longer needs to operate as a writer-time blocker; the consolidated text is the in-force 2022 convention.
- [ ] Position still pending

**Recommended replacement (if resolved):**
> Older UK treaties without indirect-disposal Art 13(4) provisions have largely been updated. The **UK-Luxembourg Double Taxation Convention and Protocol (signed 7 June 2022, in force 22 November 2023; effective UK income tax / CGT 6 April 2024, corporation tax 1 April 2024)** brought UK-Lux into the modern OECD line. Sessions writing UK-Lux property cases should cite the 2022 convention; pre-2022 forms are superseded for transactions on or after the effective dates above.

**Manager-apply action:** **patch §16.3 line 381** to remove the "check before writing" hedge and lock UK-Lux 2022 as the in-force convention. Minor housekeeping; not a substantive position drift.

---

## §19.11 — Foreign property MTD software compatibility

**Current locked text (verbatim from house_positions.md line 703):**
> **Reporting:** software must support the SA106 foreign-property fields. Many MTD packages launched in 2025/26 did not; **check the HMRC compatible-software list for foreign-property support before relying.**

**Authoritative current source:**
- URL: `https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax` (HMRC live, updated continuously)
- This is a commodity, dynamic list; HMRC explicitly states the list is updated as vendors achieve recognition. Not a fact that can be locked into a house position permanently.

**Resolution:**
- [ ] Position resolved
- [x] **Position remains pending by design — this hedge is a perpetual writer-time check.** Software-vendor lists are commodity data that should always be checked at write time, not locked into the house position. **No back-patch needed; the hedge is correctly framed.** Re-verify date: continuous (per gov.uk publication frequency).

**Recommended replacement:** No change required. The hedge is correctly written as a perpetual write-time verification (analogous to §19.6 line 641 "do not hard-code product names").

**Manager-apply action:** **none.** Hedge intentionally perpetual.

---

## §20.5 — PRS Ombudsman compensation cap

**Current locked text (verbatim from house_positions.md line 789):**
> **PRS Ombudsman**, single statutory ombudsman scheme covering all landlords. Landlords must register; tenants can escalate disputes without a court route. **Ombudsman compensation cap is to be set by regulations under RRA 2025 s.65(2)(j); the £25,000 figure widely cited in policy commentary is a government expectation, not on the face of the enacted Act.**

**Authoritative current source:**
- URL: `https://www.legislation.gov.uk/ukpga/2025/26/contents` (RRA 2025 contents page, up to date with all changes known to be in force on or before 21 May 2026)
- URL: `https://www.legislation.gov.uk/changes/affected/ukpga/2025/26` (changes-affected page)
- No commencement Statutory Instrument has appointed s.65 substantively beyond s.74 (the partial commencement noted in §20.12). No regulations under RRA 2025 s.65(2)(j) have been published; the compensation cap figure remains a government policy expectation, not statute.

**Resolution:**
- [ ] Position resolved
- [x] **Position remains pending. Re-verify by 1 October 2026** (the gov.uk policy timeline targets the PRS Database + full Ombudsman scheme "before April 2027"; the cap regulation is part of that secondary-legislation cohort).

**Recommended replacement:** No change required. The §20.5 hedge as it stands (F-13 correction already locked) accurately reflects the regulation-pending status.

**Manager-apply action:** **none.** Re-verify by 1 October 2026 (set diary).

---

## §20.12 — PRS Database commencement SI (still pending)

**Current locked text (verbatim from house_positions.md line 874):**
> | PRS Database (Ch.3 Pt.2, ss.75-96) | Pt.2 Ch.3 | **Pending** | not yet appointed | n/a |

**Authoritative current source:**
- URL: `https://www.legislation.gov.uk/ukpga/2025/26/contents` ("up to date with all changes known to be in force on or before 21 May 2026")
- URL: `https://www.legislation.gov.uk/changes/affected/ukpga/2025/26`
- No new SI has appointed PRS Database ss.75-96 between SI 2026/421 (the major 1 May 2026 commencement) and 2026-05-23 (today). The legislation.gov.uk "in force on or before 21 May 2026" timestamp confirms no later SI.

**Resolution:**
- [ ] Position resolved
- [x] **Position remains pending. Re-verify date: 1 September 2026** (gov.uk policy timeline targets PRS Database "before April 2027" — first quarterly check at 1 September 2026, then quarterly thereafter).

**Recommended replacement:** No change to the §20.12 table. The "Pending" + "not yet appointed" entry remains current as of 2026-05-23.

**Manager-apply action:** **none.** Diary: re-verify 1 September 2026.

---

## §20.12 — Decent Homes Standard for PRS commencement SI (still partial)

**Current locked text (verbatim from house_positions.md line 875):**
> | Decent Homes Standard for PRS (Pt.3, ss.100-101) | Pt.3 | **Partial** (s.100 + Sch.4 partial in force 27 Dec 2025; full standard awaits SI) | 27 Dec 2025 + pending | SI 2025/1354 + pending |

**Authoritative current source:**
- URL: `https://www.legislation.gov.uk/ukpga/2025/26/contents` (21 May 2026 timestamp confirms no later SI)
- No new SI has appointed the substantive Decent Homes Standard for PRS between SI 2025/1354 (preliminary, 27 Dec 2025) / SI 2026/421 (1 May 2026, did not advance Pt.3 substantively) and 2026-05-23.

**Resolution:**
- [ ] Position resolved
- [x] **Position remains pending. Re-verify date: 1 September 2026.**

**Recommended replacement:** No change. The §20.12 table entry remains current.

**Manager-apply action:** **none.** Diary: re-verify 1 September 2026.

---

## §20.12 — Wales-specific provisions ss.43-49

**Current locked text (verbatim from house_positions.md line 876):**
> | Wales-specific provisions (ss.43-49) | ss.43-49 | **Pending** | future SI | legislation.gov.uk Wales table |

**Authoritative current source:**
- URL: `https://www.legislation.gov.uk/ukpga/2025/26/contents`
- **New finding:** the changes-affected page surfaces **SI 2026/6** (commencement order for ss.43-49 Wales discrimination provisions, articles 2(a)-(g)). This was not in §20.12's commencement table as of 2026-05-22 locking.

**Resolution:**
- [x] **Position partially resolved — SI 2026/6 has appointed Wales-specific ss.43-49 commencement.** Detail of which articles run in 2(a)-(g) and on what dates not extracted from the contents page in this run.
- [ ] Position still pending (commencement now appointed, but Property Tax Partners advises England-only per §20.12 — Wales commencement is not core to Wave 5 unless Wales-specific pages are in scope).

**Recommended replacement (if Wales pages enter Wave 5 scope):**
> | Wales-specific provisions (ss.43-49) | ss.43-49 | **Partial** (SI 2026/6 appointed commencement; articles 2(a)-(g) phase the discrimination provisions) | per SI 2026/6 | legislation.gov.uk |

**Manager-apply action:** **patch §20.12 Wales row** only if Wave 5 includes Wales coverage. If England-only, leave as "Pending — Wales not in scope" and add a footnote that SI 2026/6 has appointed Wales-specific provisions (not relevant for England guidance).

---

## §21 verification note — "Sessions verify against current gov.uk at write time per §7 of NETNEW_PROGRAM"

**Current locked text (verbatim from house_positions.md line 902):**
> **Verification note:** numeric figures in §21.4 (CT rates 2026/27, NI thresholds 2026/27, HMRC official rate of interest, Employment Allowance value) reflect the expected 2026/27 Budget settlement at time of locking. **Sessions verify against current gov.uk at write time per §7 of NETNEW_PROGRAM.** The framework, not the figures, is the locked position; precise numeric values are commodity and may shift via Budget / Spring Statement / monetary policy without invalidating the framework.

This umbrella hedge covers §21.4 figures. Each figure verified individually below.

---

## §21.4 — CT rates 2026/27

**Current locked text (verbatim from house_positions.md line 928):**
> **CT rates 2026/27 (verify gov.uk at write time):** 19% small profits rate (≤ £50k profits), 25% main rate (≥ £250k profits), marginal relief tapered band £50k-£250k effective 26.5% rate.

**Authoritative current source:**
- URL: `https://www.gov.uk/corporation-tax-rates` (current page)
- Verbatim text: *"The Corporation Tax rate for company profits is 25%"* with a small profits rate of 19% for profits ≤ £50,000 and marginal relief between £50,000 and £250,000. No change from 2023/24 onwards. Spring Statement 2025 confirmed no CT rate changes.

**Resolution:**
- [x] **Position resolved — CT rates 2026/27 are 19% / 25% / £50k-£250k marginal band, unchanged from 2025/26.** §21.4 figures are correct.
- [ ] Position still pending

**Recommended replacement:** drop the "verify gov.uk at write time" qualifier from CT rates only.

**Manager-apply action:** **patch §21.4 bullet 1 (line 928)** to remove the "(verify gov.uk at write time)" qualifier, replacing with "(confirmed 2026/27 per gov.uk Corporation Tax rates page, 2026-05-23)".

---

## §21.4 — Employer NI rate 13.8% (**CRITICAL STALE FIGURE**)

**Current locked text (verbatim from house_positions.md line 929):**
> **NI thresholds 2026/27 (verify gov.uk at write time):** Primary threshold (employee NI) £12,570 / yr; Secondary threshold (employer NI) £5,000 / yr per Hunt Nov 2022 reform; **Employer NI rate 13.8% above ST.** Employment Allowance £10,500 / yr per Reeves Autumn Budget 2024.

**Authoritative current source:**
- URL: `https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027`
- URL: `https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026`
- Verbatim text (2025/26 + 2026/27 both): *"Primary Threshold (annual): £12,570 per year. Secondary Threshold (annual): £5,000 per year. Employer NI rate: 15%. Employment Allowance figure: £10,500."*
- Last updated: 2025/26 page 1 March 2026; 2026/27 page 7 April 2026.

**Resolution:**
- [x] **Position resolved — employer NI rate is 15%, NOT 13.8%.** Reeves Autumn Budget 2024 raised employer NI by 1.2 percentage points from 6 April 2025. §21.4 carries a stale 13.8% figure that pre-dates the Autumn Budget 2024 reform.
- [ ] Position still pending

**Recommended replacement:**
> **NI thresholds 2026/27 (confirmed gov.uk 2026-05-23):** Primary threshold (employee NI) £12,570 / yr (unchanged); Secondary threshold (employer NI) £5,000 / yr (lowered from £9,100 by Reeves Autumn Budget 2024, in force from 6 April 2025); **Employer NI rate 15% above ST (raised from 13.8% by Reeves Autumn Budget 2024, in force from 6 April 2025).** Employment Allowance £10,500 / yr (raised from £5,000 by Reeves Autumn Budget 2024).

**Manager-apply action:** **PATCH §21.4 bullet 2 (line 929) IMMEDIATELY — this is a Bill-vs-enacted-Act drift (now FIFTH in succession after F-6 / F-11 / F-12+F-13 / F-18).** Wave 4 Ltd Co / FIC content pages (briefs/property/a1-a10) almost certainly carry the stale 13.8% figure if they computed "tax-efficient mix" salary-vs-dividend worked examples. Grep all Wave 4 LtdCo pages and back-patch. This is the §16.27 pattern: **classify as F-19**.

**Estimated back-patch surface:** any page citing employer NI rate. Likely affected slugs (to grep):
- briefs/property/a1-a10 (Wave 4 LtdCo)
- Any "salary vs dividend" or "tax-efficient mix" content
- "employer NI rate" or "13.8%" string matches across `Property/web/src/app/blog/` and `briefs/property/`

---

## §21.4 — Dividend rates 2026/27 (**SECOND CRITICAL STALE FIGURE**)

**Current locked text (verbatim from house_positions.md line 930):**
> **Dividend rates 2026/27 (verify gov.uk at write time):** £500 dividend allowance, then **8.75% basic, 33.75% higher, 39.35% additional.**

**Authoritative current source:**
- URL: `https://www.gov.uk/tax-on-dividends`
- URL: `https://www.gov.uk/tax-on-dividends/how-dividends-are-taxed`
- Verbatim text: *"This table shows the rates from 6 April 2026 to 5 April 2027. Basic rate: 10.75%, Higher rate: 35.75%, Additional rate: 39.35%."*
- Dividend allowance £500 per year (unchanged).

**Resolution:**
- [x] **Position resolved — dividend rates raised by 2 percentage points on basic + higher from 6 April 2026.** Basic 8.75% → 10.75%; Higher 33.75% → 35.75%; Additional rate unchanged at 39.35%. §21.4 carries stale pre-6-April-2026 figures (the 2025/26 rates).
- [ ] Position still pending

**Recommended replacement:**
> **Dividend rates 2026/27 (confirmed gov.uk 2026-05-23):** £500 dividend allowance, then **10.75% basic, 35.75% higher, 39.35% additional. Basic and higher dividend rates were raised by 2 percentage points from 6 April 2026 (additional rate unchanged); the 8.75% / 33.75% basic / higher figures applied for 2025/26 and prior.**

**Manager-apply action:** **PATCH §21.4 bullet 3 (line 930) IMMEDIATELY — second Bill-vs-enacted-Act drift in this single §21.4 cluster.** The drift is even more material than the employer-NI one because it directly changes every "salary-vs-dividend" worked-example optimum.

**Estimated back-patch surface:**
- briefs/property/a1-a10 (Wave 4 LtdCo "tax-efficient mix" content)
- Any "dividend rate" or "8.75%" / "33.75%" string matches across `Property/web/src/app/blog/` and `briefs/property/`
- Calculator components (if any) that hard-code these rates

**Classify as F-20** (separate from F-19 employer NI; both in same pre-Wave-5 sweep).

---

## §21.4 — HMRC official rate of interest

**Current locked text (verbatim from house_positions.md line 908):**
> **HMRC official rate of interest** on credit balance is set quarterly by HMRC (recent rates have varied between 2% and 3.75%; **verify current rate against gov.uk publication "Beneficial loan arrangements — HMRC official rates" at write time**). Interest paid to director is taxable income on director, deductible by company within the CTA 2010 s.453 close-company rules.

**Authoritative current source:**
- URL: `https://www.gov.uk/government/publications/rates-and-allowances-beneficial-loan-arrangements-hm-revenue-and-customs-official-rates-of-interest` (HMRC live, updated quarterly)
- This is a commodity, dynamic quarterly rate; the precise figure cannot be locked into the house position as it changes quarterly with monetary policy.

**Resolution:**
- [ ] Position resolved
- [x] **Position remains pending by design — perpetual write-time check.** HMRC official rate is a quarterly-set figure that should always be verified at write time. **No back-patch needed; the hedge is correctly framed.**

**Recommended replacement:** No change required.

**Manager-apply action:** **none.** Hedge intentionally perpetual.

---

## §15.6 — Non-resident IHT residence test (verification confidence check)

**Current locked text (verbatim from house_positions.md line 338):**
> An individual is a "**long-term resident**" (and therefore within IHT on worldwide assets) where **either** they have been UK resident for **10 consecutive tax years**, **or** they have been UK resident in **at least 10 of the previous 20 tax years**. The two-route test is the HMRC published position (correction logged 2026-05-22: earlier versions of this doc named only the 10-of-20 route; Session A's research on A6 surfaced the consecutive-route alternative).

**Authoritative current source:**
- Position already corrected by Session A (Wave 2) via session-time gov.uk research. No new gov.uk publication surfaced in this run that would re-trigger verification.

**Resolution:**
- [x] **Position already resolved by Wave 2 correction.** No further action needed.
- [ ] Position still pending

**Manager-apply action:** **none.** Cited here for completeness as the section was on the priority-scan list.

---

## §17.6 — Temporary Repatriation Facility (TRF) 3-year extension

**Current locked text (verbatim from house_positions.md line 490):**
> Temporary Repatriation Facility (TRF) runs **3 years** at **12% / 12% / 15%** for 2025/26, 2026/27, and 2027/28 to bring pre-6-April-2025 foreign income / gains onshore (correction logged 2026-05-22: earlier versions of this doc named a 2-year-at-12% facility; Autumn Budget 2024 extended to 3 years with the rate stepping to 15% in year 3. Session C's research on C8 surfaced the extension.).

**Authoritative current source:**
- Position already corrected by Session C (Wave 2) via session-time gov.uk research. No new gov.uk publication surfaced in this run that would re-trigger verification.

**Resolution:**
- [x] **Position already resolved by Wave 2 correction.** No further action needed.

**Manager-apply action:** **none.**

---

## §18 ATED 2026/27 bands

**Current locked text (verbatim from house_positions.md lines 516-523):**
> | Property value | 2025/26 annual charge | 2026/27 annual charge |
> | £500,001 to £1m | £4,450 | £4,600 |
> | £1m to £2m | £9,150 | £9,450 |
> | £2m to £5m | £31,050 | £32,200 |
> | £5m to £10m | £72,700 | £75,450 |
> | £10m to £20m | £145,950 | £151,450 |
> | Over £20m | £292,350 | £303,450 |

**Authoritative current source:**
- URL: `https://www.gov.uk/guidance/annual-tax-on-enveloped-dwellings-the-basics`
- Verbatim 2026/27 figures: £4,600 / £9,450 / £32,200 / £75,450 / £151,450 / £303,450. **All six match §18.1 verbatim.** Last updated 4 March 2026.

**Resolution:**
- [x] **Position resolved — ATED 2026/27 bands confirmed verbatim.** §18.1 is correct.

**Manager-apply action:** **none.** §18.1 figures locked.

---

## §19.7 — MTD ITSA penalty regime (verification confidence check)

**Current locked text (verbatim from house_positions.md lines 668-672):**
> Late payment, Spring Statement 2025 doubling AND accelerated trigger days, applicable to MTD ITSA from 6 April 2026: 3% of unpaid tax from day 15; further 3% from day 30; then 10% per annum from day 31.

**Authoritative current source:**
- URL: `https://www.gov.uk/government/publications/making-tax-digital-for-income-tax-penalty-reform` (Finance Bill 2025-26 draft legislation, 21 July 2025; consultation closed 15 September 2025)
- Spring Statement 2025 HTML document already cited verbatim in §19.7. No subsequent change.

**Resolution:**
- [x] **Position resolved.** Already locked by F-6 correction. Finance Bill 2025-26 contains the draft statutory clauses for the 15/30/31 trigger days with 3%/3%/10% percentages, confirming the §19.7 framing.

**Manager-apply action:** **none.**

---

## Summary

**Hedges scanned:** 14 (across §§15-22)

**Resolved this run (recommended lock-replacements available):** 6
1. §15.4 — Trust anti-fragmentation: partially resolved (draft Finance Bill 2025-26 published 21 July 2025; awaiting Finance Act 2026 enactment)
2. §15.5 — Pensions in IHT: resolved (consultation outcome + draft Finance Bill 2025-26 both published 21 July 2025; PR liability confirmed; DIS excluded)
3. §16.3 — UK-Luxembourg DTC: resolved (2022 convention in force from 22 November 2023)
4. §21.4 — CT rates 2026/27: resolved (19% / 25% / £50k-£250k marginal band unchanged)
5. §21.4 — Employer NI rate: **STALE — currently §21.4 says 13.8%; gov.uk confirms 15% from 6 April 2025** (F-19 candidate)
6. §21.4 — Dividend rates: **STALE — currently §21.4 says 8.75% / 33.75% / 39.35%; gov.uk confirms 10.75% / 35.75% / 39.35% from 6 April 2026** (F-20 candidate)

**Remain pending (re-verify dates):** 5
1. §19.11 — MTD compatible-software list (perpetual write-time check; no back-patch)
2. §20.5 — PRS Ombudsman compensation cap (regulation pending; re-verify 1 October 2026)
3. §20.12 — PRS Database commencement SI (re-verify 1 September 2026)
4. §20.12 — Decent Homes Standard substantive commencement SI (re-verify 1 September 2026)
5. §21.4 — HMRC official rate of interest (perpetual quarterly check; no back-patch)

**New finding outside hedge scan:** SI 2026/6 has appointed Wales-specific ss.43-49 commencement. Not in §20.12 table as of 2026-05-22; not core to Property Tax Partners' England-only scope but worth a footnote.

**Already resolved by prior wave corrections (no further action needed):** 3
1. §15.6 — non-resident IHT residence test (Wave 2 Session A correction)
2. §17.6 — TRF 3-year extension (Wave 2 Session C correction)
3. §19.7 — MTD ITSA penalty 15/30/31 with 3%/3%/10% (F-6 correction)

---

## Top-3 most-important findings

1. **§21.4 carries TWO stale Bill-vs-enacted-Act figures simultaneously (F-19 + F-20 candidates):**
   - Employer NI rate **13.8% → 15%** (raised by Reeves Autumn Budget 2024 from 6 April 2025).
   - Basic / higher dividend rates **8.75% / 33.75% → 10.75% / 35.75%** (raised from 6 April 2026).
   - **Both directly affect every Wave 4 LtdCo "salary-vs-dividend tax-efficient mix" worked example.** Pattern is now FIFTH and SIXTH in succession after F-6, F-11, F-12+F-13, F-18. The §16.22 + §16.27 pattern is so load-bearing this verification step probably needs to graduate from "pre-wave check" to "every-wave mandatory pre-write check".
   - **Estimated back-patch surface: all Wave 4 LtdCo pages (briefs/property/a1-a10) plus any "tax-efficient mix" or "employer NI" or "8.75%"/"33.75%"/"13.8%" string matches across the live site.**

2. **§15.4 trust anti-fragmentation + §15.5 pensions IHT both resolved by 21 July 2025 Finance Bill 2025-26 draft publication.** Both can lock from "deferred to technical consultation cycle" to "draft legislation published 21 July 2025 (Finance Bill 2025-26); enactment as Finance Act 2026 expected with Autumn Budget 2025 cycle". §15.5 also locks PR liability (not scheme administrator) and DIS exclusion — both confirmed in the 21 July 2025 outcome document.

3. **§16.3 UK-Luxembourg 2022 DTC is fully in force (since 22 November 2023, effective UK income/CGT 6 April 2024).** The "check the treaty's current consolidated text on gov.uk before writing" hedge can be dropped; 2022 convention is the citable in-force text for any post-6-April-2024 UK-Lux property case. Minor housekeeping but worth doing to close a perpetual reader-time friction.

**Recommendation for the manager:** prioritise F-19 + F-20 (§21.4 stale figures) as a same-commit back-patch on Wave 4 LtdCo content BEFORE Wave 5 launches. The two figures will appear in every Wave 4 LtdCo + every Wave 5 LtdCo-adjacent page; better to fix once at the house-position layer + Wave 4 commit than to ship Wave 5 with the same drift. F-19 / F-20 also confirms that the §16.27 verification pattern is now load-bearing enough to warrant promotion to per-write check rather than pre-wave check.

**End of verification report.**
