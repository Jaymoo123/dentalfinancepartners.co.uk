---
slug: let-property-campaign-penalty-calculator
category: landlord-tax-essentials
intent: A residential landlord with undisclosed UK rental income — at the decision moment between (i) notify LPC now, (ii) wait and risk HMRC discovery, or (iii) ignore — searching this query wants a working penalty calculator for their LPC exposure. The intent is calculator-led: input years of undisclosed rent, assess behaviour category (non-deliberate / deliberate / deliberate-concealed), assess unprompted-vs-prompted status, identify territory category (Cat 1 / Cat 2 / Cat 3 for offshore rental property), and the calculator returns an estimated penalty range under Schedule 41 FA 2008 para 13. The page must make clear that the calculator is a planning estimator (HMRC has discretion within the floors / maxima; the actual penalty is set in the disclosure-response letter), surface the unprompted-disclosure floor advantage explicitly (0% non-deliberate within 12 months versus 10% prompted floor), and route users with calculator outputs above the 70% deliberate-not-concealed threshold to specialist advice + CoP9 boundary awareness. Property context: residential rental income only — commercial / mixed-use disclosure uses general DDS route, not LPC.
---

# Let Property Campaign Penalty Calculator: Estimating Your Schedule 41 Exposure Before You Notify

## Statutory anchor

- **Primary — calculator's underlying penalty matrix:** Schedule 41 FA 2008 paragraph 13 — disclosure mitigation. The verbatim mitigation floors are (verified live 2026-05-27 at `https://www.legislation.gov.uk/ukpga/2008/9/schedule/41`):
  | Behaviour | Cat 1 max | Cat 2 max | Cat 3 max | Unprompted floor (within 12 months) | Unprompted floor (after 12 months) | Prompted floor |
  |---|---|---|---|---|---|---|
  | Non-deliberate ("other") | 30% | 45% | 60% | **0%** | **10%** | **10%** |
  | Deliberate not concealed | 70% | 105% | 140% | **20%** | **20%** | **35%** |
  | Deliberate and concealed | 100% | 150% | 200% | **30%** | **30%** | **50%** |
  These are the operational inputs to any LPC penalty calculator. The 12-month qualifier on the non-deliberate-unprompted floor (0% vs 10%) is the most operationally important variable for an early-notifier. Verified per §27.3 Wave 7 lock + F-5 correction noted (the 12-month qualifier is in Sch 41 para 13, NOT Sch 24 — sessions writing must not import the Sch 24 careless-floor commentary).
- **Primary — calculator's underlying behaviour categorisation:** Schedule 41 FA 2008 paragraph 5 — non-deliberate / deliberate (not concealed) / deliberate and concealed. The behaviour-category test is **facts-based** and HMRC discretion plays a strong role — a calculator can only estimate based on landlord-self-assessed behaviour; the HMRC final categorisation in the disclosure response letter may differ.
- **Primary — what "unprompted" means for the calculator:** unprompted disclosure occurs where the landlord initiates the disclosure **before** HMRC has indicated awareness of the failure. The bright-line tests: (a) no nudge letter received; (b) no enquiry opened; (c) no Connect-system match triggered against a third-party-data flag the landlord is aware of. A landlord who has received a nudge letter has **prompted-disclosure** status; the unprompted-disclosure floor is unavailable. House-position-locked at §27.3 Wave 7 lock 2026-05-24.
- **Primary — what "deliberate" means for the calculator:** HMRC v Tooth [2021] UKSC 17 sets the controlling Supreme Court authority on "deliberate" in the penalty context — the conduct must involve a conscious choice to omit / understate income, knowing it should have been disclosed. The honest-mistake / careless-error population sits in non-deliberate ("other"); the conscious-omission population sits in deliberate-not-concealed; the active-concealment population (false invoices, third-party-conduit bank accounts, document destruction) sits in deliberate-and-concealed.
- **Primary — territory categorisation (Cat 1 / Cat 2 / Cat 3) for offshore rental property:** Sch 41 para 6A imports the offshore Category structure from the HMRC-published list. Cat 1 = domestic + offshore-with-full-information-exchange (e.g. most EU + treaty-partner jurisdictions; Channel Islands post-CRS). Cat 2 = offshore-with-partial-information-exchange. Cat 3 = offshore-with-no-information-exchange. Calculator must reference the current HMRC-published list at write time; territory categorisation changes with treaty updates. House-position-locked at §27.3 Wave 7 lock 2026-05-24.
- **Primary — interest separate from penalty:** TMA 1970 s.86 (interest on income tax + CGT) + FA 2009 s.101 (HMRC interest framework). Interest accrues continuously from the due date of each tax year's liability, is NOT a Sch 41 input, and is NOT mitigated by LPC. The calculator must therefore output (i) estimated penalty range AND (ii) estimated interest accrual separately; the disclosure total is tax + interest + penalty.
- **Supporting — LPC operational anchor:** HMRC published guidance at gov.uk/guidance/let-property-campaign. Campaign open since 9 September 2013 with no announced end date (per §27.6 Wave 7 lock).
- **Supporting — discovery time limit framework (what the landlord is up against if they don't disclose):** TMA 1970 s.29 (discovery threshold) + s.34 (ordinary 4 years) + s.36(1) (careless 6 years) + s.36(1A) (deliberate 20 years) + s.36A (offshore innocent-error 12 years). This sets the **scope** of years HMRC could assess if they discover the failure first. The calculator should display the years-at-risk count as a counterfactual against the years-the-landlord-would-disclose count.
- **House position reference:** §27.3 (Sch 41 mitigation matrix — primary anchor); §27.6 (LPC route + 3-step notify-disclose-pay cycle); §27.1 (discovery time limits — the counterfactual scope); §27.5 (CoP9 / CDF boundary — where the calculator output suggests deliberate behaviour with criminal-prosecution exposure). No NEW HP LOCK NEEDED — fully covered by Wave 7 §27 lock.

## Framing differentiator (anti-templating, anti-cannibalisation)

This page is the **calculator-led LPC penalty estimation page** — distinct from the other six MW3-A LPC-cluster pages by intent:

- **A2 (`a-complete-guide-to-hmrcs-digital-disclosure-service`)** — DDS umbrella route description; not a calculator.
- **A3 (`benefits-of-participating-in-the-let-property-campaign`)** — benefits-tally / decision-layer narrative; not a calculator.
- **A12 (`know-about-let-property-campaign`)** — canonical LPC orientation; not a calculator.
- **A15 (`let-property-campaign-why-voluntary-disclosure-makes-sense`)** (this batch) — why-disclose-voluntarily framing; not a calculator.
- **A17 (`missed-taxes-let-property-campaign-to-the-rescue`)** (this batch) — emotional-rescue framing for landlords mid-discovery; not a calculator.
- **A13 (`late-filing-and-late-payment-penalties`)** (this batch) — general individual-landlord SA penalty regime (Sch 55 + Sch 56 + §19.7 MTD ITSA); broader than LPC.

The angle this page takes: a landlord at the decision moment between (i) notify LPC now, (ii) wait, or (iii) ignore needs **a number** to make the comparison. Narrative pages (A3, A12, A15, A17) provide the architecture; this calculator provides the number. The calculator must support the three behaviour-band x prompted/unprompted x territory-category permutations (~18 cells in the input grid), output estimated penalty range with explicit floor + max bracketing, and surface the counterfactual cost (what HMRC could assess under s.36 / s.36A if discovery comes first — typically higher penalty bracket + more years at risk). The calculator page is the **operational moment of truth** for the landlord — narrative pages route into it, this page produces the number.

Production note: this page should embed (or link to) an actual JavaScript calculator component. The seed defines the calculator's input variables, the Sch 41 mitigation matrix, the output format, and the disclaimers / boundary warnings. The component itself is a build-time artifact for the RUN session (potentially a React component in `Property/web/src/components/calculators/` per existing /calculators pattern); the seed defines the inputs / outputs / labels / disclaimers as content specification.

## Key questions this page must answer

1. What are the inputs the calculator must take — (a) years of undisclosed rental income (start year + end year); (b) undisclosed gross rent per year; (c) allowable deductions per year; (d) behaviour self-assessment (non-deliberate / deliberate / deliberate-concealed); (e) prompted-or-unprompted status (have you received a nudge letter / enquiry?); (f) territory category for the rental property (Cat 1 UK + most EU; Cat 2 partial-info-exchange; Cat 3 no-info-exchange)?
2. What is the calculation logic — for each year of undisclosed rent: tax due (apply marginal rate to net profit; cross-link to S24 mortgage-interest restriction calculator for finance cost handling) + interest accrued (Bank base + 4pp from each year's due date) + penalty estimate (Sch 41 para 13 floor on undisclosed tax, applied behaviour-by-behaviour)?
3. How does the calculator surface the unprompted-disclosure-within-12-months advantage — for non-deliberate landlords, the difference between 0% (unprompted within 12 months) and 10% (prompted, or unprompted after 12 months) is the operationally most important variable; calculator should display this as an explicit "early-notify advantage" line item?
4. How does the calculator handle multi-year disclosures with mixed behaviour patterns — e.g. years 1-3 careless mid-portfolio, years 4-6 deliberate after professional-adviser warning; calculator must allow per-year behaviour input?
5. How does the calculator handle offshore rental property — when the landlord has rental in a Cat 2 / Cat 3 territory, the Sch 41 para 6A uplift multiplies the maxima 1.5x / 2x; calculator must apply this and display the Category-specific bracketing?
6. What disclaimers must the calculator carry — (a) it is a planning estimator; (b) HMRC has discretion within the floor / max bracket; (c) behaviour categorisation is HMRC's call in the disclosure response letter; (d) the calculator does not estimate the FtC overlay (§27.6 — offshore-Failure-to-Correct 200%/100% framework) which can apply on top of Sch 41 for pre-30-September-2018 offshore matters; (e) the calculator does not estimate CoP9 / CDF exposure where the deliberate-concealed self-assessment suggests criminal-prosecution interest; (f) calculator output is not legal advice?
7. How does the calculator display the counterfactual — if the landlord does NOT use LPC and HMRC discovers via s.29, HMRC can assess up to 4 years (s.34) / 6 years (careless s.36(1)) / 20 years (deliberate s.36(1A)) / 12 years (offshore innocent-error s.36A); the penalty cascade then runs at prompted-disclosure floors (10% / 35% / 50%) versus the unprompted floors (0% / 20% / 30%)?
8. When should the calculator route the user to specialist advice instead of LPC — (a) deliberate-and-concealed self-assessment (CoP9 / CDF specialist counsel territory); (b) offshore Cat 2 / Cat 3 with pre-30-September-2018 years (FtC overlay specialist territory); (c) HMRC enquiry already open (separate engagement, not standalone LPC); (d) total estimated liability above a practical threshold where specialist disclosure-counsel adds value?
9. How does the calculator handle the 12-month-from-when-liability-arose test for the 0% floor — TMA 1970 s.7 requires notification within 6 months of the end of the tax year in which liability arose; the 12-month qualifier in Sch 41 para 13 runs from the same starting point (when liability arose, i.e. end of tax year); calculator must display the deadline date for each year of undisclosed rent and indicate whether the 0% floor is still available (within 12 months) or only the 10% floor (after 12 months)?
10. How does the calculator link to the next step — outputs route to `know-about-let-property-campaign` (A12 — the orientation), `benefits-of-participating-in-the-let-property-campaign` (A3 — the benefits-tally), the LPC notification form on gov.uk, or specialist-advice landing (for high-output / specialist-territory cases)?

## Manager pre-decisions placeholder

- **Category routing:** `landlord-tax-essentials` (the calculator-page audience is the LPC-disclosure-decision landlord, broadly in landlord-tax-essentials; calculator components themselves live under `/calculators` and the landing page typically also lives in landlord-tax-essentials). Manager may override to `property-accountant-services` if calculator pages are categorised in that pillar — flag at brief gate.
- **Worked-example numbers:**
  - Use the §27.3-locked Sch 41 para 13 floors verbatim (0% / 10% / 20% / 30% unprompted; 10% / 35% / 50% prompted) + maxima (30% / 45% / 60% non-deliberate Cat 1/2/3; 70% / 105% / 140% deliberate; 100% / 150% / 200% deliberate-concealed). HMRC late-payment interest rate (Bank base + 4pp) is rate-by-reference per §16.27; verify at write time.
  - For worked-example illustrations: use a hypothetical "£18,000 annual rent for 6 years, 25% expenses, careless behaviour, unprompted, UK property" giving a tax estimate of approximately £43,200 (£90,000 net profit @ basic rate / higher rate blend) + interest + 0% penalty (within 12 months) or 10% penalty (after 12 months) — Stage 2 must compute exact numbers using current rates per §16.27 + §16.35 verification at write time.
  - Anti-cannibal: keep worked-example landlord profile distinct from sibling A3 / A12 / A15 / A17 examples (use different rent / years / category mix).
- **Calculator component implementation:** likely React component at `Property/web/src/components/calculators/LpcPenaltyCalculator.tsx`; pattern existing /calculators routes for embedded calc components. State-managed input grid + computed output panel. Stage 2 + RUN session decides component-vs-table-vs-iframe; this seed defines content spec only.
- **Cross-link targets:**
  - Within MW3 Bucket A: `know-about-let-property-campaign` (A12 — orientation); `benefits-of-participating-in-the-let-property-campaign` (A3 — benefits-tally); `let-property-campaign-why-voluntary-disclosure-makes-sense` (A15 — why-disclose); `missed-taxes-let-property-campaign-to-the-rescue` (A17 — emotional-rescue); `a-complete-guide-to-hmrcs-digital-disclosure-service` (A2 — DDS umbrella); `late-filing-and-late-payment-penalties` (A13 — adjacent penalty regime).
  - To existing pages: any pillar page on LPC; pillar page on HMRC enquiries + s.29 discovery (for the counterfactual scope); /calculators landing page; pillar page on section 24 + finance-cost-restriction calculator (for the per-year-tax computation input); landlord-tax-essentials pillar.
  - External: gov.uk LPC notification form; gov.uk LPC published guidance; HMRC penalty calculator (if HMRC publishes a public-facing one — verify at Stage 2; HMRC's internal calculator is not public).

## Stage 2 research target list

- Competitor pages to fetch (Stage 2 sources fresh via Google Search / Bing Search at write time; Wave 8 + Wave 9 5/5 dead-rate pattern continues — do NOT trust Stage 1 URL guesses; verify with httpx + BeautifulSoup before citing): 2-4 candidates from accountancy practice sites + LPC-specialist sites + HMRC penalty-software vendors covering "let property campaign penalty calculator" + "LPC penalty estimator" + "Sch 41 disclosure calculator landlord".
- HMRC manuals to cite: CH80000+ (Compliance Handbook on penalties — calculation worked examples); CH150000+ (Compliance Handbook on disclosure mitigation); CH71000+ (Compliance Handbook on failure-to-notify); LPC operational guidance at gov.uk/guidance/let-property-campaign. Verify URL currency at write time per Wave 9 HMRC URL-rot audit.
- Legislation anchors: Schedule 41 FA 2008 para 5 + para 6A + para 13 + para 20 (behaviour categories + offshore uplift + mitigation matrix + reasonable excuse). TMA 1970 s.7 (notification obligation) + s.29 / s.34 / s.36 / s.36A (discovery + extended time limits) + s.86 (interest). FA 2009 s.101 (HMRC interest framework). Cross-reference §27.3, §27.6, §27.1, §27.5.
- Case-law to ground: HMRC v Tooth [2021] UKSC 17 (deliberate behaviour test — controlling SC authority); Perrin v HMRC [2018] UKUT 156 (reasonable excuse four-stage test). Sessions should NOT manufacture authorities.

## Stage 2 research target list — extended

### Authority URLs (Stage 2 surfaces; RUN session WebFetches at write time per §16.35)

- **`https://www.legislation.gov.uk/ukpga/2008/9/schedule/41`** — Schedule 41 FA 2008 (failure-to-notify penalties). RUN session reads para 5 (behaviour categories) + para 6A (offshore Cat 1/2/3 uplift framework) + para 13 (disclosure mitigation matrix) + para 20 (reasonable excuse) verbatim. The 12-month qualifier on the non-deliberate-unprompted 0% floor is in paragraph 13 (NOT Sch 24 — F-5 Wave 7 lock).
- **`https://www.legislation.gov.uk/ukpga/1970/9/section/7`** — TMA 1970 s.7 (notification of chargeability). The statutory anchor for the failure-to-notify obligation that Sch 41 enforces (typical LPC scenario).
- **`https://www.legislation.gov.uk/ukpga/1970/9/section/29`** — TMA 1970 s.29 (discovery assessments). Anchors the discovery-window architecture that the LPC calculator's counterfactual leverages.
- **`https://www.legislation.gov.uk/ukpga/1970/9/section/34`** — TMA 1970 s.34 (4-year ordinary time limit).
- **`https://www.legislation.gov.uk/ukpga/1970/9/section/36`** — TMA 1970 s.36 (extended time limits): s.36(1) 6-year careless; s.36(1A) 20-year deliberate; s.36A 12-year offshore innocent-error per FA 2019.
- **`https://www.legislation.gov.uk/ukpga/1970/9/section/86`** — TMA 1970 s.86 (interest on unpaid income tax + CGT). Continuously accruing from each year's due date; NOT mitigated by LPC.
- **`https://www.gov.uk/guidance/let-property-campaign`** — HMRC's published Let Property Campaign guidance. RUN session re-verifies live URL + operational status (open since 9 September 2013).
- **`https://www.gov.uk/government/publications/let-property-campaign-disclosure`** — HMRC LPC disclosure form / supporting guidance.
- **`https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch71000`** — Compliance Handbook CH71000+ (Sch 41 failure-to-notify mechanics). Reads child pages for the para-by-para operational framing.
- **`https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch80000`** — Compliance Handbook CH80000+ (penalty calculation worked examples + disclosure mitigation framework).
- **`https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch82400`** — CH82400+ specifically on penalty quality-of-disclosure assessment (the "telling / helping / giving access" framework HMRC applies within the floor/max bracket).
- **`https://www.gov.uk/government/publications/offshore-evaders-penalties-territories`** — HMRC published Category 1 / Category 2 / Category 3 territory list (verify currency at write time; the list updates with treaty changes).
- **`https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2000`** — Property Income Manual PIM2000+ (rental income computation framework that feeds the calculator's tax-due input).

### Competitor URLs (session-side WebSearch at write time)

`<!-- competitor section: per §16.31 Wave 8 + Wave 9 5/5 dead-rate pattern, Stage 2 did not pre-fetch firm-domain URLs. RUN session uses Google Search at write time. Recommended search queries: "let property campaign penalty calculator UK", "LPC penalty estimator landlord", "Sch 41 disclosure calculator", "HMRC voluntary disclosure penalty calculation". Target: 3-5 firm-side pages from tax-investigation specialist firms + accountancy practices + LPC-specialist legal sites; ensure differentiation from sibling MW3 A12 LPC-orientation / A15 strategic-rationale / A17 emotional-rescue pages. Test if any UK firm has published a publicly-accessible LPC calculator (HMRC has not). -->`

### Case-law

- **HMRC v Tooth [2021] UKSC 17** — Supreme Court controlling authority on "deliberate" behaviour in the penalty context. The conduct must involve a conscious choice to omit / understate income knowing it should have been disclosed. RUN session cites where the calculator's behaviour-categorisation input box references "deliberate" and the page explains the legal threshold.
- **Perrin v HMRC [2018] UKUT 156 (TCC)** — Upper Tribunal four-stage test for reasonable excuse under Sch 41 para 20. RUN session cites where the calculator's reasonable-excuse-defence boundary is described.
- **HMRC v Hicks [2020] UKUT 12 (TCC)** — Upper Tribunal on the Sch 41 prompted-vs-unprompted disclosure test. RUN session cites at the prompted/unprompted input box where the legal definition matters.

## Worked-example data (RUN session uses these as canvas)

### Example 1 — Non-deliberate / unprompted / within-12-months / UK property: the 0% headline

- **Hollingsworth-Estate, the recently-realised landlord:** inherited a property in late 2024; let it from January 2025; never registered for self-assessment for 2024/25. Gross rent April 2024 to April 2025 = £14,000; allowable deductions £4,200; net profit £9,800. Realises the failure in March 2026 — within 12 months of the 2024/25 tax-year-end (5 April 2025). Behaviour self-assessment: non-deliberate (genuinely overlooked the SA obligation as accidental landlord). No nudge letter received.
- **Calculator inputs:** years = 2024/25 only; gross rent = £14,000; deductions = £4,200; behaviour = non-deliberate; status = unprompted; territory = Cat 1 UK; tax-year-end = 5 April 2025; realisation-date = March 2026 (within 12 months).
- **Calculator output:** tax due on £9,800 net profit at marginal rate (basic 20% = £1,960 assuming no other income above PA, or higher 40% = £3,920 for a higher-rate taxpayer); interest = TMA s.86 from 31 January 2026 (due date for 2024/25 balance) at current rate (Bank base + 4pp; verify at write time); penalty = 0% (Sch 41 para 13 non-deliberate-unprompted-within-12-months floor).
- **Operational point:** the 0% floor is the headline rescue. RUN session must teach that the 12-month qualifier runs from the date the tax became payable (typically 31 January following the tax year, NOT the tax-year-end itself — sessions occasionally muddle this) per Sch 41 para 13 verbatim. Hollingsworth-Estate's disclosure window for 0% closes ~31 January 2027 (12 months after the 2024/25 tax became payable on 31 January 2026).

### Example 2 — Non-deliberate / unprompted / after-12-months / UK property: the 10% floor

- **Rashleigh-Estate, the older-realisation landlord:** has 6 years of undisclosed rental on a single BTL property let since 2019. Realises the failure in 2026 — all 6 years are past the 12-month window (the most recent tax year, 2024/25, is on the borderline depending on exact realisation date). Gross rent £18,000/year × 6 = £108,000 cumulative; expenses 30% = £32,400; net cumulative profit £75,600. Behaviour: non-deliberate (sloppy assumption that rental income was the letting agent's responsibility). No nudge letter.
- **Calculator inputs:** years 2019/20 to 2024/25; aggregate gross rent £108,000; aggregate deductions £32,400; behaviour non-deliberate; status unprompted; territory Cat 1 UK; per-year tax computation at marginal rate.
- **Calculator output:** tax due across 6 years at marginal rate (basic / higher mix depending on profile); interest accrual TMA s.86 from each year's due date (cumulatively substantial — interest on 2019/20 has been accruing for ~6 years); penalty = 10% across all 6 years (Sch 41 para 13 non-deliberate-unprompted-after-12-months floor); maximum 30% Cat 1.
- **Operational point:** the calculator should DISPLAY both the 10% floor (operative outcome) AND the 30% maximum (worst-case HMRC discretion) so the landlord sees the bracket they are negotiating within. Also display interest separately — interest on 6 years of unpaid 2019-2024 tax is typically the largest single line item, often exceeding the penalty.

### Example 3 — Deliberate / prompted (nudge letter received) / UK property: the 35% prompted-disclosure floor

- **Belmount-Estate, the post-nudge-letter landlord:** holds 4 BTL properties; HMRC sent a nudge letter on 12 February 2026 indicating awareness of likely undisclosed rental. Belmount-Estate has 5 years of undisclosed rental, gross rent £85,000/year, expenses 25% = £21,250/year, net profit £63,750/year. Behaviour self-assessment: deliberate but not concealed (the omission was a knowing choice not to declare; no false invoices or document destruction).
- **Calculator inputs:** years 2020/21 to 2024/25; aggregate gross rent £425,000; aggregate deductions £106,250; behaviour deliberate-not-concealed; status PROMPTED (nudge letter received); territory Cat 1 UK.
- **Calculator output:** tax due across 5 years substantial (£318,750 cumulative net profit at marginal rate); interest accrual cumulative; penalty = 35% across all 5 years (Sch 41 para 13 deliberate-not-concealed PROMPTED floor — the nudge letter cost Belmount-Estate the 20% unprompted floor); maximum 70% Cat 1.
- **Operational point:** the calculator must surface the COUNTERFACTUAL — what would the penalty have been had Belmount-Estate disclosed unprompted before the nudge letter? Answer: 20% floor across 5 years. The 15-percentage-point delta (35% minus 20%) on £318,750 cumulative tax is the cost of having waited until HMRC indicated awareness. Sessions writing must illustrate this delta clearly to teach the rising-cost-of-delay dynamic.

### Example 4 — Offshore Cat 2 / Deliberate / Unprompted: where the calculator routes to specialist

- **Vandenberg-Estate, the offshore landlord:** UK-tax-resident, owns a residential rental property in a Cat 2 partial-info-exchange territory (e.g. certain Middle East or Caribbean jurisdictions per the HMRC published list). 8 years of undisclosed rental; gross local-currency rent equivalent to £35,000/year; expenses 20% = £7,000/year; net profit £28,000/year. Behaviour self-assessment: deliberate-but-not-concealed. No nudge letter. Pre-30-September-2018 years engage the FtC overlay (FA 2017 Sch 18 — 200% penalty cliff on top of Sch 41).
- **Calculator inputs:** years cover 8 historic years some pre-30-September-2018; aggregate gross rent £280,000; aggregate deductions £56,000; behaviour deliberate-not-concealed; status unprompted; territory Cat 2 (1.5x uplift); pre-FtC years flagged.
- **Calculator output:** tax due cumulative; interest accrual; Sch 41 para 13 floor 20% × 1.5x Cat 2 uplift = 30% effective floor on undisclosed tax; maximum 70% × 1.5x = 105% effective maximum. PLUS the FtC overlay for pre-30-September-2018 years (200% standard / 100% reduced — but FtC is OUT OF SCOPE for the LPC route per §27.6 architecture; this landlord needs the WDF + FtC route, not LPC alone).
- **Operational point:** the calculator MUST route Vandenberg-Estate to specialist counsel rather than self-service LPC. The calculator's design includes a routing-to-specialist trigger when: (a) the territory is Cat 2 or Cat 3; (b) any pre-30-September-2018 offshore years are in scope (FtC overlay); (c) the deliberate-and-concealed self-assessment suggests CoP9 territory; (d) HMRC enquiry is already open. Sessions writing must NOT use the LPC calculator to produce a definitive number for these cases — the calculator's role is to flag the specialist boundary, not to compute through it.

### Example 5 — Use-case for the calculator's "early-notify advantage" line

- **Padworth-Estate, the on-the-fence landlord:** has 3 years of undisclosed rental on a single residential property. Most recent year (2024/25) is within the 12-month window for the 0% floor (deadline ~31 January 2027). Earlier 2 years (2022/23 + 2023/24) are past the 12-month window — 10% floor on those years. Behaviour: non-deliberate. Status: unprompted (no nudge letter).
- **Calculator output ("early-notify advantage" line):** the calculator displays a separate line showing the marginal savings from disclosing NOW (before 31 January 2027) versus disclosing AFTER 31 January 2027. Disclosing now: 0% penalty on 2024/25 tax + 10% on 2022/23 + 2023/24. Disclosing after the deadline: 10% on all 3 years. The marginal saving is 10% × 2024/25 tax = a quantifiable "early-notify advantage" figure the landlord can use to schedule the disclosure.
- **Operational point:** the calculator's most operationally-useful output for borderline landlords is the early-notify-advantage line, not just the total estimated penalty. The line gives the landlord a deadline-driven nudge to act NOW rather than defer.

## FAQ expansion (RUN session polishes prose; 10-12 FAQs target)

1. **Q: How does the Let Property Campaign penalty calculator work?**
   A: The calculator takes inputs covering the years of undisclosed rental, gross rent and deductions per year, behaviour self-assessment (non-deliberate, deliberate, deliberate-and-concealed), prompted-or-unprompted disclosure status, and territory category (Cat 1 UK, Cat 2 partial-info-exchange offshore, Cat 3 no-info-exchange offshore). It computes estimated tax due at marginal rate, interest accrual under TMA 1970 s.86, and penalty estimate under Schedule 41 FA 2008 paragraph 13. The output is a planning estimate, not a definitive HMRC assessment.

2. **Q: What are the Schedule 41 unprompted-disclosure floors?**
   A: For non-deliberate behaviour: 0% if disclosed within 12 months of the tax becoming payable, otherwise 10%. For deliberate-not-concealed: 20% (and 35% if prompted). For deliberate-and-concealed: 30% (and 50% if prompted). The unprompted floors apply only while HMRC has not indicated awareness of the failure (no nudge letter, no enquiry, no Connect-system match notified).

3. **Q: What is the difference between unprompted and prompted disclosure?**
   A: Unprompted disclosure occurs where the landlord initiates the disclosure BEFORE HMRC has indicated awareness of the failure. The bright-line tests: no nudge letter received, no enquiry opened, no Connect-system match notified. A landlord who has received a nudge letter has prompted-disclosure status; the unprompted floors are unavailable. The differential (typically 10 to 20 percentage points) is the operationally most important variable for landlords still in the unprompted window.

4. **Q: What does the 12-month qualifier in paragraph 13 mean?**
   A: For non-deliberate failure-to-notify under Sch 41, the 0% unprompted floor applies only where disclosure is made within 12 months of the date the tax became payable (typically 31 January following the tax year). After 12 months, the unprompted floor for non-deliberate behaviour is 10%. This 12-month qualifier exists only in Sch 41 paragraph 13 — it is NOT in Schedule 24 FA 2007 paragraph 10 (inaccuracy penalties), which has no 12-month equivalent on its careless-unprompted floor. The F-5 Wave 7 lock teaches this distinction.

5. **Q: How does the calculator handle offshore rental property?**
   A: Sch 41 paragraph 6A imports the offshore Category structure. Cat 1 = UK + offshore-with-full-information-exchange (most EU + post-CRS Channel Islands etc); Cat 2 = offshore-with-partial-information-exchange; Cat 3 = offshore-with-no-information-exchange. The Category multipliers are 1.0x / 1.5x / 2.0x applied to both the floor and the maximum bracket. The calculator references the current HMRC-published territory list; sessions verify currency at write time.

6. **Q: When does the calculator route me to specialist advice instead of LPC?**
   A: The calculator surfaces a specialist-routing trigger where: (a) the behaviour self-assessment is deliberate-and-concealed (CoP9 / Contractual Disclosure Facility territory with criminal-prosecution exposure); (b) offshore Cat 2 / Cat 3 territory with pre-30-September-2018 years engaging the FtC overlay under FA 2017 Sch 18; (c) HMRC enquiry is already open (the disclosure happens within the open enquiry, not as standalone LPC); (d) total estimated liability where specialist disclosure-counsel adds disproportionate value.

7. **Q: How does the calculator estimate the discovery counterfactual?**
   A: The calculator displays what HMRC could assess if discovery comes first under TMA 1970 s.29: 4 years ordinary (s.34); 6 years careless (s.36(1)); 20 years deliberate (s.36(1A)); 12 years offshore innocent-error (s.36A). The discovered-cases prompted-disclosure floor (10% / 35% / 50%) is the operative penalty rather than the unprompted floor (0% / 20% / 30%). The differential is the rising-cost-of-delay metric.

8. **Q: What about interest on the undisclosed tax?**
   A: Interest accrues under TMA 1970 s.86 from each year's due date (typically 31 January following the tax year) and is NOT mitigated by LPC. The calculator estimates interest as a separate line item using HMRC's published rate (Bank base + 4pp; current rate verified at write time). For multi-year disclosures, interest can be the largest line item in the disclosure total.

9. **Q: Is the calculator's output binding on HMRC?**
   A: No. The calculator is a planning estimator; HMRC has discretion within the floor / maximum bracket and the actual penalty is set in the disclosure-response letter. HMRC considers the quality of the disclosure (the "telling / helping / giving access" framework at CH82400+) when fixing the penalty within the bracket. A complete, prompt, well-evidenced disclosure tends toward the floor; an incomplete or evasive disclosure tends toward the maximum.

10. **Q: How does behaviour categorisation work?**
    A: HMRC v Tooth [2021] UKSC 17 sets the controlling Supreme Court authority on "deliberate" behaviour — the conduct must involve a conscious choice to omit / understate income, knowing it should have been disclosed. Honest-mistake and careless-error populations sit in non-deliberate ("other"); knowing-omission populations sit in deliberate-not-concealed; active-concealment populations (false invoices, third-party-conduit bank accounts, document destruction) sit in deliberate-and-concealed. The calculator's behaviour input is the landlord's self-assessment; HMRC's final categorisation may differ.

11. **Q: What is the early-notify advantage?**
    A: The early-notify advantage is the differential between disclosing within the 12-month window (0% floor on non-deliberate behaviour) and disclosing after the window (10% floor). For a borderline year, this is a quantifiable saving — 10% of the year's undisclosed tax. The calculator displays this as a separate line item so the landlord sees the deadline-driven cost of delay.

12. **Q: How does LPC interact with the Worldwide Disclosure Facility?**
    A: LPC accommodates UK-source residential rental income. WDF is for offshore-source income or assets. A landlord with UK rental income disclosed via LPC and separate offshore rental income disclosed via WDF uses both routes in parallel (each for its respective stream). The calculator on this page is calibrated for LPC; the WDF computation framework is similar but has separate operational requirements outside the calculator's scope.

## Universal rules + workflow stubs (RUN session follows)

### Voice + style (verbatim per §4.8)

- **No em-dashes** in body copy. Use commas, parentheses, full stops, middle dots, or restructure the sentence.
- **Specific over generic.** Named legislation (Sch 41 FA 2008 paras 5 / 6A / 13 / 20; TMA 1970 s.7 / s.29 / s.34 / s.36 / s.86); specific paragraph numbers; anonymised personas.
- **No real names.** Anonymised personas (Hollingsworth-Estate, Rashleigh-Estate, Belmount-Estate, Vandenberg-Estate, Padworth-Estate in the worked examples above).
- **Lead-gen architecture:** `<LeadForm>` auto-injected at footer. Do not duplicate in body.
- **CSS in markdown:** semantic HTML only. No Tailwind classes. `<aside>` styled by global CSS.
- **FAQs:** 10-14 entries in frontmatter `faqs:` array, auto-emitted as FAQPage JSON-LD by the build.
- **Calculator component:** likely a React component at `Property/web/src/components/calculators/LpcPenaltyCalculator.tsx` per the /calculators pattern. Stage 2 + RUN session decides component-vs-table-vs-iframe; the seed defines content specification. Inputs and outputs must match the Sch 41 para 13 matrix verbatim; do NOT introduce a custom mitigation framework.
- **Anti-templating:** this page is the **calculator-led LPC penalty estimation page**. RUN session must hold this lane distinct from sibling A12 LPC-orientation (descriptive frame) / A15 strategic-rationale (philosophical frame) / A17 emotional-rescue (panic-moment frame) / A3 benefits-tally (tactical-numerical narrative) / A2 DDS umbrella (product-architecture frame). The calculator IS the differentiator — RUN session must design and embed an actual JavaScript calculator, not a narrative description of one. The F-5 Wave 7 lock on the Sch 41 12-month qualifier (NOT in Sch 24) is the load-bearing factual differentiation.
- **Quality bar (six checks):** zero em-dashes, zero Tailwind, FAQ schema count matches frontmatter array, meta title ≤ 62 chars, meta description ≤ 158 chars, internal links resolve, calculator computes the matrix correctly across all 18 input-grid cells.

### 19-step workflow (verbatim per §7)

1. Read `house_positions.md` at session start (esp §27.3 Sch 41 mitigation matrix + §27.6 LPC route + §27.1 discovery time limits + §27.5 CoP9 boundary).
2. Claim this page in MW3 page tracker (⬜ → 🟡 with UTC timestamp).
3. Read this brief (framing differentiator, key questions, manager pre-decisions, research target list).
4. Fetch + read competitor URLs via session-side Google Search at write time (per §16.31 dead-rate pattern).
5. Read closest-existing pages: sibling MW3 A12 LPC-orientation / A15 strategic-rationale / A17 emotional-rescue / A3 benefits-tally / A2 DDS / A13 SA-penalty-regime; any pillar pages on LPC or rental-income taxation; existing /calculators page patterns.
6. Plan H2 / H3 outline + meta + 10-14 FAQs + CTA placements — STRICTLY in the calculator-led lane; the calculator IS the page; narrative supports and disclaimers the calculator.
7. Verify factual claims against authorities per §16.35 (Sch 41 FA 2008 paras 5 / 6A / 13 / 20 + TMA 1970 s.7 / s.29 / s.34 / s.36 / s.86 + LPC guidance + Cat 1/2/3 territory list verbatim WebFetched from legislation.gov.uk + gov.uk).
8. Implement calculator component (React) with the 18-cell input grid + floor/max output + early-notify-advantage line + counterfactual line + specialist-routing trigger.
9. Write markdown at `Property/web/content/blog/let-property-campaign-penalty-calculator.md` (full frontmatter list per §4); embed calculator component.
10. Build clean: `cd Property/web && npm run build`.
11. Six verifications: FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title ≤62, meta description ≤158, internal links resolve, calculator passes manual test cells.
12. Apply redirect repointing in `middleware.ts` if brief lists overlap (none identified at Stage 2).
13. Register in `monitored_pages` Supabase table.
14. Commit on session's MW3 worktree branch (per-page commit; do NOT merge to main from worktree).
15. Fill per-page work-log at bottom of this brief.
16. Mark ✅ done in MW3 tracker with 1-line Notes (body word count + 1-sentence summary).
17. Append site-wide issues to MW3 flags file.
18. Append discoveries to session's discovery log.
19. Claim next page.

## Work log (Stage 2 + RUN session populate)

### Stage 2 author entry

- **Stage 2 author:** MW3 Stage 2 Sub-Agent A (batch M3-A-B3) on 2026-05-27.
- **Stage 2 extensions added:** authority URL list (13 anchors covering Sch 41 FA 2008 + TMA 1970 s.7/s.29/s.34/s.36/s.86 + LPC guidance + Compliance Handbook CH71000/CH80000/CH82400 + offshore-evaders-penalties-territories list + PIM2000); 5 worked examples covering 0%-headline-unprompted-within-12-months (Hollingsworth-Estate), 10%-floor-unprompted-after-12-months (Rashleigh-Estate), 35%-prompted-disclosure-after-nudge-letter (Belmount-Estate), offshore-Cat-2-with-FtC-overlay-routes-to-specialist (Vandenberg-Estate), early-notify-advantage-line-for-borderline-landlord (Padworth-Estate); 12 FAQs anchored to calculator mechanics + Sch 41 floors + behaviour categorisation + offshore uplift + discovery counterfactual + specialist-routing + early-notify advantage + LPC-vs-WDF boundary; voice + style + 19-step workflow stubs verbatim per §4.8 + §7 with calculator-component implementation step added at step 8.
- **§16.36 statutory-citation cross-check:** Sch 41 FA 2008 paras 5 + 6A + 13 + 20 verified live at Stage 1 author 2026-05-27 against legislation.gov.uk current-as-amended text. 12-month qualifier in para 13 confirmed; F-5 Wave 7 lock alignment confirmed (qualifier is in Sch 41 only, NOT Sch 24). TMA 1970 s.29 + s.34 + s.36 + s.36A discovery architecture verified. HMRC v Tooth [2021] UKSC 17 + Perrin v HMRC [2018] UKUT 156 verified against UKSC + UT published judgments. HMRC late-payment interest rate (Bank base + 4pp) flagged as rate-by-reference per §16.27. Cat 1/2/3 territory list flagged as currency-sensitive — RUN session re-verifies at write time.
- **Anti-templating note:** the calculator IS the differentiator. RUN session must implement an actual JavaScript calculator (React component embedded in the markdown content), not a narrative description of one. The 18-cell input grid (3 behaviour bands × 2 prompted/unprompted × 3 territory categories) is the canonical structure; the early-notify-advantage line is the operationally-most-useful output for borderline landlords. The specialist-routing trigger must engage on Cat 2/3 + pre-30-September-2018 (FtC overlay) + deliberate-and-concealed (CoP9) + open-HMRC-enquiry. Cannibalisation risk against A12 / A15 / A17 / A3 / A2 / A13 is structural — the calculator-led intent is distinct from each. The F-5 Wave 7 lock (Sch 41 12-month qualifier; Sch 24 no equivalent) is the load-bearing factual differentiation; sessions writing must NOT collapse the two Sch instruments.

### RUN session entry (populate at write time)

[RUN session records: H1 chosen, meta title + description chosen, competitor URLs fetched + key takeaways, existing-page review notes, citations added, internal links added, calculator component implementation notes, build attempts pass / fail, six-check verification, flags raised, 2-3 sentence summary.]

---

## Stage 1 seed work log

- **Stage 1 author:** MW3 Stage 1 Sub-Agent A (batch M3-A-B3) on 2026-05-27.
- **Cluster anchor:** Penalties & enquiries — the **calculator-led LPC penalty estimation page** specifically. Differentiation framing: A14 is the operational-moment-of-truth calculator providing a number; sibling LPC pages (A2, A3, A12, A15, A17) provide narrative architecture that routes into this calculator. The calculator must support the 18-cell input grid (3 behaviour bands × 2 prompted/unprompted × 3 territory categories) and display floor + max bracketing, the early-notify advantage, and the counterfactual cost.
- **HP-lock alignment:** §27.3 (Sch 41 mitigation matrix — primary anchor for calculator computation logic); §27.6 (LPC 3-step cycle + eligibility); §27.1 (discovery time limits for counterfactual); §27.5 (CoP9 boundary for routing-to-specialist when calculator output suggests deliberate-concealed). No NEW HP LOCK NEEDED — fully covered by Wave 7 §27 lock.
- **§16.35 per-write verification note:** Sch 41 para 13 floor + maximum verified at Wave 7 §27.3 lock 2026-05-24 + verified live at Stage 1 author against legislation.gov.uk current-as-amended text on 2026-05-27. The Category 2 / Category 3 uplift multipliers are stable per the underlying Order (verify at write time; territory-categorisation may have changed). HMRC late-payment interest rate is rate-by-reference per §16.27; Stage 2 + RUN must re-verify against gov.uk at write time. Worked-example computations must use current marginal rates per §16.27 + §16.35 verification at write time.
- **Cannibalisation reasoning:** No CANNIBAL flag against sibling MW3-A LPC pages — the calculator-led intent is distinct from narrative-orientation (A12), benefits-tally (A3), why-disclose (A15), emotional-rescue (A17), and DDS-umbrella (A2). Reciprocal cross-link to all five at Stage 2 recommended.
- **Drift catches to flag for Stage 1b:** none new this seed. F-5 (Wave 7 close — Sch 24 careless-floor 12-month qualifier conflation risk) is the closest upstream catch — sessions writing this calculator must NOT import the Sch 24 careless-floor 12-month commentary, because Sch 41 is the operative regime for failure-to-notify (the typical LPC scenario) and the 12-month qualifier is genuinely in Sch 41 para 13. The conflation risk runs the OTHER way (Sch 24 → Sch 41), which is harmless for this Sch-41-anchored calculator, but Stage 1b should confirm Stage 2 does not extend this calculator into Sch 24-anchored scenarios without flagging.
