---
slug: a-complete-guide-to-hmrcs-digital-disclosure-service
category: landlord-tax-essentials
intent: A landlord or property-business operator searching this query wants the operational architecture of HMRC's Digital Disclosure Service (DDS) — the gov.uk online portal that hosts the Let Property Campaign, the Worldwide Disclosure Facility, the Card Transaction Programme, and the catch-all voluntary disclosure route. The searcher needs to know what DDS is, which campaign route applies to their facts (residential rental → LPC; offshore → WDF; UK-only non-rental → general DDS), the notification + 90-day disclosure + payment cycle, the Sch 41 unprompted-disclosure mitigation floor, and the boundary at which DDS is the wrong route (deliberate-behaviour cases with criminal-prosecution exposure → CoP9 / CDF instead). Property context: this page is framed for landlords + property-business owners, not generalist self-employed taxpayers.
---

# A Complete Guide to HMRC's Digital Disclosure Service: The DDS Architecture for UK Landlords and Property Operators

## Statutory anchor

- **Primary — disclosure obligation framework:** Taxes Management Act 1970 section 7 — notice of liability to income tax and capital gains tax. Subsection (1C)(a) requires notification within "the period of 6 months from the end of the year of assessment". Verified live 2026-05-27 at `https://www.legislation.gov.uk/ukpga/1970/9/section/7`. Subsection (1A)/(1B) identify the persons within scope (broadly: anyone with untaxed liability not already within self-assessment).
- **Primary — failure-to-notify penalty:** Schedule 41 FA 2008 — penalties for failure to notify chargeability. The penalty bites where a landlord with untaxed rental income misses the s.7 six-month deadline. Sch 41 para 5 sets out the behaviour categories (non-deliberate / deliberate not concealed / deliberate and concealed); Sch 41 para 13 sets the unprompted-disclosure mitigation floor; Sch 41 para 20 codifies the reasonable-excuse defence. House-position-locked at §27.3 with verbatim verification 2026-05-24.
- **Primary — inaccuracy penalty (where returns already filed):** Schedule 24 FA 2007 — penalties for errors. Sch 24 para 4 sets the standard maxima; Sch 24 para 4A imports the offshore Category 1/2/3 uplift; Sch 24 para 14 enables suspension of careless penalties. House-position-locked at §27.2.
- **Supporting — late filing penalties (where SA returns are missed):** Schedule 55 FA 2009. House-position-locked at §27 framework. Sch 55 also covers MTD ITSA from 6 April 2026 under §19.7.
- **Supporting — discovery + extended time limits (the alternative if HMRC opens enquiry first):** TMA 1970 s.29 (discovery) + s.34 (ordinary 4 years) + s.36 (careless 6 years / deliberate 20 years) + s.36A FA 2019 (offshore innocent-error 12 years). House-position-locked at §27.1.
- **Supporting — Failure-to-Correct offshore overlay:** FA 2017 Schedule 18 (FtC regime; pre-30-September-2018 offshore matters carry a minimum 200% penalty post-deadline, reducible to 100% on full unprompted disclosure + asset-based penalty + naming-and-shaming). House-position-locked at §27.6.
- **House position reference:** §27.6 (voluntary disclosure routes — LPC + WDF + DDS + CoP9 architecture) is the primary anchor; §27.2 (Sch 24) and §27.3 (Sch 41) provide the penalty-banding mechanics this page must cite without duplicating. Closure of §27.5 (CoP9) provides the boundary on the deliberate-behaviour side. No NEW HP LOCK NEEDED — fully covered by Wave 7 §27 lock.

## Framing differentiator (anti-templating, anti-cannibalisation)

This page is the **DDS architectural overview** — what the Digital Disclosure Service is as an HMRC online product, which campaign sub-routes sit inside it (LPC + WDF + Card Transaction Programme + general voluntary disclosure), how to choose between them, and how the 90-day disclosure cycle works operationally. The closest pages on our site sit at the campaign-specific layer: `benefits-of-participating-in-the-let-property-campaign` (sibling M3-A-B1 pick, focused on LPC specifically), `let-property-campaign-why-voluntary-disclosure-makes-sense` (sibling M3-A-B3 pick, the why-disclose framing), `let-property-campaign-penalty-calculator` (M3-A-B3, calculator-led), `know-about-let-property-campaign` (M3-A-B2), and `missed-taxes-let-property-campaign-to-the-rescue` (M3-A-B3). All five focus on LPC. None of them describes the **DDS umbrella architecture** — the gov.uk online portal at `tax.service.gov.uk/digital-disclosure` that hosts LPC + WDF + Card Transaction Programme + the catch-all "general voluntary disclosure" route as four distinct campaign tracks within one digital product.

The angle this page takes: an operator (landlord, property-developer, serviced-accommodation host, BTL portfolio owner) who has identified some prior-year unfiled liability needs to know which route inside DDS to use BEFORE they start the disclosure cycle, because the campaign-track choice locks the disclosure window (LPC: notify-then-90-days; WDF: notify-then-90-days extendable to 180; general DDS: 90-day default), the eligibility (residential rent only → LPC; offshore → WDF + FtC overlay; UK-only non-rental → general DDS), and the penalty-banding access (LPC unlocks the most favourable mitigation floors for residential rental income; general DDS is the catch-all with standard Sch 41 floors). This page is the routing layer that the campaign-specific pages assume the reader has already navigated.

## Key questions this page must answer

1. What is the Digital Disclosure Service in product terms — the gov.uk online portal launched 5 September 2016, the campaign sub-tracks it hosts, and how the gov.uk URL routes a user into the right track?
2. What is the legal basis for the disclosure obligation — TMA 1970 s.7 notification, Sch 41 failure-to-notify penalty mechanics, and Sch 24 inaccuracy penalty for already-filed returns containing errors?
3. How do you choose the correct campaign sub-track within DDS — residential rental → LPC; offshore → WDF + FtC overlay; card-acquirer income → Card Transaction Programme; UK-only non-rental → general DDS catch-all?
4. What is the three-step DDS cycle (notify → disclose within 90 days → pay) and how does each step interact with the Sch 41 unprompted-disclosure floor under §27.3?
5. What penalty-banding floor can a disclosing taxpayer expect — Sch 41 para 13: 0% non-deliberate within 12 months unprompted / 10% non-deliberate after 12 months unprompted / 20% deliberate not concealed unprompted / 30% deliberate and concealed unprompted; vs prompted 10% / 35% / 50%?
6. What is the boundary at which DDS is the wrong route — deliberate-fraud cases with criminal-prosecution exposure should go via CoP9 / CDF under §27.5 (HMRC-initiated or taxpayer-requested), not via DDS; offshore deliberate-conduct cases need Sch 18 FtC analysis under §27.6.
7. What does a "reasonable excuse" look like under Sch 41 para 20 and how does Perrin v HMRC [2018] UKUT 156 four-stage test apply at the disclosure-of-historic-non-notification stage?
8. How does record retention interact (§27.7 — TMA 1970 s.12B 5-year-from-31-January for income tax; CA 2006 s.388 6-year for companies)? What records does HMRC expect to support a DDS disclosure?
9. What is the position when DDS is started but the taxpayer cannot pay in full within the 90-day window — the time-to-pay arrangement (TMA 1970 s.108 + CRCA 2005) and how that interacts with the disclosure crystallisation?
10. What is the post-disclosure landscape — closure of any open enquiry under TMA 1970 s.28A; finality of liability subject to the s.29(4)/(5) re-opening conditions; HMRC's discretion on whether to pursue criminal investigation despite a complete DDS disclosure (note: DDS does NOT confer criminal-prosecution immunity — only CoP9 / CDF does).

## Manager pre-decisions placeholder

- **Category routing:** `landlord-tax-essentials` (matches live route at `Property/web/src/app/blog/landlord-tax-essentials/`). DDS is the umbrella for voluntary disclosure routes that apply across landlord scenarios. Manager to confirm or override to `property-accountant-services`.
- **Worked-example numbers:** the Sch 41 para 13 mitigation floor percentages (0% / 10% / 20% / 30% / 35% / 50%) and the FtC 200%/100% post-deadline penalty are rate-by-reference under §16.27. RUN session verifies live at write time.
- **Cross-link targets:**
  - Within MW3 Bucket A: `benefits-of-participating-in-the-let-property-campaign` (A3 sibling — LPC-specific), `know-about-let-property-campaign` (A12), `let-property-campaign-why-voluntary-disclosure-makes-sense` (A15), `let-property-campaign-penalty-calculator` (A14), `missed-taxes-let-property-campaign-to-the-rescue` (A17), `hmrcs-loan-charge-settling-disguised-remuneration-schemes` (A8 — a parallel disclosure-via-settlement-not-DDS scenario).
  - To existing pages: any Wave 7 Bucket B pages on enquiry mechanics, CoP9 / CDF guides where present, and the general tax compliance pillar.

## Stage 2 research target list

- Competitor pages to fetch (Stage 2 sources fresh via Google Search / Bing Search at write time per §16.31; Wave 8 + Wave 9 5/5 dead-rate pattern recurs): 2-4 candidates from tax-investigation specialist sites + accountancy practice voluntary-disclosure pages. Recommended search queries: "HMRC Digital Disclosure Service guide", "DDS notification process gov.uk".
- HMRC manuals + gov.uk anchors: Compliance Handbook CH150000+ (disclosure mitigation); Compliance Handbook CH71000+ (Sch 41 failure-to-notify); gov.uk page at `gov.uk/guidance/admitting-tax-fraud-the-contractual-disclosure-facility-cop9` (CoP9 boundary); gov.uk page at `gov.uk/digital-disclosure` (DDS landing — verify URL at write time).
- Legislation anchors RUN session must verify at write time: TMA 1970 s.7 + s.12B + s.29 + s.34 + s.36 + s.36A; Sch 41 FA 2008 (paras 5, 13, 20); Sch 24 FA 2007 (paras 3, 4, 4A, 9, 10, 14); Sch 18 FA 2017 (FtC).
- Case-law to ground: Perrin v HMRC [2018] UKUT 156 (reasonable excuse four-stage test); HMRC v Tooth [2021] UKSC 17 (deliberate-behaviour test for s.29(4) / s.36(1A) deliberate limb).

## Stage 2 research target list — extended

### Authority URLs (Stage 2 surfaces; RUN session WebFetches at write time per §16.35)

- **`https://www.gov.uk/guidance/admitting-tax-fraud-the-contractual-disclosure-facility-cop9`** — CoP9 / CDF gov.uk landing. Used in the page's boundary section (DDS is NOT for deliberate-fraud cases with criminal-prosecution exposure).
- **`https://www.gov.uk/guidance/let-property-campaign`** — LPC gov.uk landing. Referenced as the residential-rental sub-track within DDS.
- **`https://www.gov.uk/guidance/worldwide-disclosure-facility-make-a-disclosure`** — WDF gov.uk landing. Referenced as the offshore sub-track.
- **`https://tax.service.gov.uk/digital-disclosure`** — DDS portal entry (URL to be re-verified at write time; HMRC restructured portal URLs in 2024-2025).
- **`https://www.legislation.gov.uk/ukpga/1970/9/section/7`** — TMA 1970 s.7 (notification obligation). Quoted verbatim for the "6 months from end of year of assessment" deadline.
- **`https://www.legislation.gov.uk/ukpga/2008/9/schedule/41`** — Sch 41 FA 2008 (failure-to-notify mechanics). Paras 5, 13, 20 quoted verbatim for behaviour bands, mitigation matrix, reasonable excuse.
- **`https://www.legislation.gov.uk/ukpga/2007/11/schedule/24`** — Sch 24 FA 2007 (inaccuracy penalties). Para 4 + 4A + 14 for the inaccuracy-in-filed-returns boundary.
- **`https://www.legislation.gov.uk/ukpga/2017/32/schedule/18`** — Sch 18 FA 2017 (Requirement to Correct / Failure-to-Correct offshore overlay).
- **`https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch71000`** — HMRC Compliance Handbook CH71000+ (Sch 41 failure-to-notify commentary). RUN session reads child pages directly.
- **`https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch150000`** — HMRC Compliance Handbook CH150000+ (disclosure mitigation commentary).
- **`https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2010`** — PIM2010+ (rental income chargeability framework — cross-reference for the LPC sub-track).

### Competitor URLs (session-side WebSearch at write time)

`<!-- competitor section: per §16.31 5/5 dead-rate pattern across Waves 8-9 + Wave 7 firm-domain hostile-to-WebFetch posture, Stage 2 did not pre-fetch firm URLs. RUN session uses Google Search at write time. Recommended search queries: "HMRC Digital Disclosure Service guide landlord", "DDS notification process 90 days gov.uk", "voluntary disclosure HMRC unprompted penalty". Target: 3-5 firm-side tax-investigation pages from BDO / RSM / Crowe / Saffery / Smith & Williamson + a tax-investigation-specialist boutique. -->`

### Case-law

- **Perrin v HMRC [2018] UKUT 156 (TCC)** — reasonable excuse four-stage test (controlling authority for Sch 41 para 20 disclosure-related defences).
- **HMRC v Tooth [2021] UKSC 17** — Supreme Court on the deliberate-behaviour test for s.29(4) / s.36(1A) deliberate limb. Critical for the DDS-vs-CoP9 boundary: deliberate inaccuracy must be intentional; carelessness alone is not "deliberate" for the 20-year limit.
- **HMRC v Lin [2018] UKUT 363 (TCC)** — discovery threshold under s.29; relevant for the counterfactual (what HMRC must show to open assessment outside DDS).

## Worked-example data (RUN session uses these as canvas)

### Example 1 — Residential landlord routing to LPC sub-track

- **Mrs Padmore** owns a single BTL flat in Manchester let since 2018; she has never declared the rental income on her self-assessment return. Gross rents £14,400/year; mortgage interest + agent fees + repairs leave ~£6,000 net rental profit.
- **DDS sub-track:** residential rental → LPC route inside DDS. Mrs Padmore notifies LPC via gov.uk landlord disclosure form; HMRC issues a Disclosure Reference Number (DRN); 90-day window opens.
- **Sch 41 floor:** non-deliberate after 12 months unprompted → 10% mitigation floor. Six tax years × £6,000 net rental at 20% basic-rate income tax = £1,200/year × 6 = £7,200 tax liability + interest under s.86 (~£600 cumulative) + 10% penalty = £720. Total settlement ~£8,520.
- **Counterfactual (no LPC, HMRC discovery):** prompted-disclosure floor 35% non-deliberate → penalty £2,520; same tax + interest. LPC route saves ~£1,800 in penalty alone, plus avoids the s.36 6-year extended-assessment route catching the older years she might otherwise have argued out of scope.

### Example 2 — Offshore rental income routing to WDF + FtC overlay

- **Mr Cunliffe** owns 2 properties in Spain let to tourists since 2015. He is UK-resident and UK-domiciled and has never declared the Spanish rental income on his UK return (mistakenly relied on Spanish withholding tax as final). Gross Spanish rents €18,000/year; UK-equivalent net profit ~£10,000/year.
- **DDS sub-track:** offshore → WDF route inside DDS (NOT LPC; LPC is UK-property-only). FtC overlay applies for pre-30-September-2018 offshore matters under Sch 18 FA 2017.
- **Pre-FtC-deadline penalty:** for the 2015 / 2016 / 2017 / 2018 years that fell within the FtC window and were not corrected by 30 September 2018, the FtC minimum penalty is 200% of unpaid UK tax (reducible to 100% on complete unprompted disclosure + asset-based penalty + naming-and-shaming for £25k+).
- **WDF cycle:** notify → 90 days (extendable to 180 on request) → pay. Documentary requirement: Spanish tax returns + Spanish bank statements + property letting records to substantiate the disclosure.
- **Strategic note:** the FtC 200%/100% overlay makes the offshore-DDS path materially more expensive than LPC; the page's routing-decision section must flag that landlords with offshore rental income face a different cost-benefit profile than UK-only.

### Example 3 — UK-only non-rental income routing to general DDS catch-all

- **Mrs Eastleigh** ran an unincorporated property-management side-business (managing 8 properties for friends and family at 8% commission) from 2019-2024. She received ~£12,000/year in commission income and never declared it. The income is NOT rental income (so LPC does not apply); it is UK-source self-employment income.
- **DDS sub-track:** general DDS catch-all (NOT LPC, NOT WDF, NOT Card Transaction Programme). General DDS uses the same notification → 90-day cycle but does not unlock LPC-specific mitigation floors; it relies on standard Sch 41 paras 5 + 13 architecture.
- **Sch 41 floor:** if Mrs Eastleigh notifies unprompted within 12 months of when liability arose, non-deliberate floor 0%; if after 12 months, 10%. She is now ~3 years late so the 10% floor applies. Six years × £12,000 commission at 20% basic rate = £14,400 tax + £1,200 interest + 10% penalty (£1,440) = ~£17,040.

### Example 4 — Deliberate-fraud case where DDS is the WRONG route

- **Mr Helmstone** operated a 12-property BTL portfolio under a deliberate concealment scheme: he set up multiple bank accounts in family-member names, routed rental income through them, and filed self-assessment returns showing only his "own" 2 properties. HMRC has not yet opened an enquiry but Mr Helmstone is worried about increasing risk.
- **Boundary:** this fact pattern is deliberate concealment under Sch 41 para 5(b)(ii) and may also involve cheat-the-public-revenue exposure or false-accounting offences. The unprompted-disclosure Sch 41 floor (30% deliberate-and-concealed unprompted) is available BUT it does NOT confer criminal-prosecution immunity.
- **Correct route:** CoP9 / CDF under §27.5 lock. CoP9 is a HMRC-initiated process; CDF is the taxpayer-initiated entry into the CoP9 framework. Both require formal contractual admission of deliberate behaviour and confer criminal-prosecution immunity for the conduct described in the admission (subject to honesty and completeness conditions).
- **Discipline:** a tax-investigation specialist solicitor should be instructed before any disclosure step. DDS is the wrong route here; it could fix the civil exposure but leave the criminal exposure live.

## FAQ expansion (RUN session polishes prose; 10-12 FAQs target)

1. **Q: What is HMRC's Digital Disclosure Service in plain terms?**
   A: The Digital Disclosure Service (DDS) is HMRC's online portal for voluntary disclosure of undeclared tax liabilities. It hosts four distinct campaign tracks: the Let Property Campaign (LPC) for residential rental income; the Worldwide Disclosure Facility (WDF) for offshore matters; the Card Transaction Programme (CTP) for unreported card-acquirer income; and a general catch-all voluntary disclosure route for everything else. DDS launched on 5 September 2016 and remains the primary disclosure entry point for most non-criminal cases.

2. **Q: Which DDS sub-track should I use for my situation?**
   A: Residential rental income (UK landlords with undisclosed rental profit) → LPC. Offshore matters of any kind (foreign rental income, foreign bank interest, offshore investment gains) → WDF, with the Failure-to-Correct overlay applying for pre-30-September-2018 matters. Card-acquirer income (Airbnb hosts who took payments via card terminals) → CTP or LPC depending on the income nature. Anything else (UK-only non-rental matters: side-business income, commissions, other self-employment) → general DDS catch-all route.

3. **Q: What is the three-step DDS cycle?**
   A: Step 1 — notification: complete the notification form on gov.uk; HMRC issues a Disclosure Reference Number. Step 2 — disclosure: complete the full disclosure (tax computation + supporting records) within 90 days of HMRC's acknowledgment. Step 3 — payment: settle the disclosed tax + interest under TMA 1970 s.86 + penalty as agreed under the Sch 41 floor framework. If full payment within 90 days is not feasible, a time-to-pay arrangement under TMA 1970 s.108 can be requested.

4. **Q: What penalty floor does DDS unlock under Schedule 41 FA 2008 paragraph 13?**
   A: For unprompted disclosure: 0% (non-deliberate, within 12 months of when liability arose), 10% (non-deliberate, after 12 months), 20% (deliberate not concealed), 30% (deliberate and concealed). For prompted disclosure: 10% (non-deliberate), 35% (deliberate not concealed), 50% (deliberate and concealed). DDS preserves the unprompted floor provided you notify before HMRC opens an enquiry or contacts you about the matter.

5. **Q: When is DDS the WRONG route?**
   A: Two scenarios. First, deliberate-fraud cases with material criminal-prosecution exposure should go via CoP9 / CDF (under §27.5 lock), not DDS. CoP9 confers criminal-prosecution immunity for conduct disclosed in the formal admission; DDS does not. Second, where HMRC has already opened a formal s.9A enquiry or issued a discovery assessment under s.29, the unprompted-disclosure window has closed; the disclosure becomes prompted and the higher Sch 41 floor applies.

6. **Q: What is the offshore Failure-to-Correct overlay under Schedule 18 FA 2017?**
   A: For offshore matters that should have been corrected by 30 September 2018 but were not, the FtC regime imposes a minimum 200% penalty on the unpaid offshore-related UK tax, reducible to 100% on complete unprompted disclosure. The FtC regime also includes an asset-based penalty (up to 10% of the value of the relevant offshore asset) for cases where the lost tax exceeds £25,000, and naming-and-shaming for cases meeting that threshold. WDF is the DDS sub-track for offshore matters and the FtC overlay sits alongside.

7. **Q: What records does HMRC expect to support a DDS disclosure?**
   A: HMRC expects the records that would have supported a contemporaneous self-assessment return: rental statements, agent invoices, mortgage statements, repair invoices, tenancy agreements, bank statements showing rental receipts, and any documentation of expenses claimed. The statutory record-retention floor under TMA 1970 s.12B is 5 years from 31 January following the tax year; the firm's practical recommendation under §27.8 is 7 years for property businesses. Missing records do not block a disclosure but they make HMRC's challenge to the disclosure figures more likely.

8. **Q: What is the "reasonable excuse" defence under Schedule 41 paragraph 20 and how does Perrin v HMRC apply?**
   A: Sch 41 para 20 disapplies the failure-to-notify penalty where the taxpayer had a reasonable excuse for the failure and rectified it within a reasonable time of the excuse ceasing. The Upper Tribunal in Perrin v HMRC [2018] UKUT 156 set out the four-stage test: identify the obligation, identify the excuse, assess whether reasonable in the circumstances, assess whether the failure was remedied promptly after the excuse ceased. Where reasonable excuse applies, the Sch 41 penalty falls to nil; the LPC / DDS unprompted-disclosure floor becomes the floor below reasonable excuse rather than the only mitigation lever.

9. **Q: Can I pay in instalments if I cannot afford the full disclosed liability in 90 days?**
   A: Yes. HMRC will typically agree a time-to-pay arrangement under TMA 1970 s.108 + CRCA 2005 where the taxpayer demonstrates inability to pay in full. Interest under TMA 1970 s.86 continues to accrue during the time-to-pay period. The disclosure crystallisation is not blocked by an instalment plan; HMRC closes the disclosure on agreed-figure basis and the instalment arrangement runs alongside.

10. **Q: Does DDS confer criminal-prosecution immunity?**
    A: No. Only the Contractual Disclosure Facility (CDF) under CoP9 confers criminal-prosecution immunity, and only for the conduct described in the formal admission. DDS is a civil-resolution mechanism. Where deliberate fraud is involved with material criminal exposure, the correct route is CoP9 / CDF, not DDS. A tax-investigation specialist solicitor should advise on the route before any disclosure step is taken.

11. **Q: What happens after a DDS disclosure is accepted and paid?**
    A: The disclosed matter is closed for s.29 discovery purposes, subject to the s.29(4)/(5) re-opening conditions (incomplete or deliberately inaccurate disclosure can be re-opened). The taxpayer's ongoing record-keeping obligations under TMA 1970 s.12B continue. Any continuing rental income or other relevant activity from the disclosed period onwards must be brought into the regular self-assessment cycle (or MTD ITSA from 6 April 2026 if the qualifying-income threshold under §19.1 is met).

12. **Q: How does DDS interact with the LPC-specific sibling pages on this site?**
    A: This page is the umbrella architecture. The campaign-specific LPC pages on this site (the benefits-framed page in this same Bucket A batch, the descriptive "know about LPC" page, the calculator-led penalty page, the why-disclose page, and the "missed taxes rescue" page) all sit at the campaign-specific layer below this umbrella. Read this page first to determine which sub-track applies to your facts; then read the campaign-specific page for the depth treatment of your chosen track.

## Universal rules + workflow stubs (RUN session follows)

### Voice + style (verbatim per §4.8)

- **No em-dashes** in body copy.
- **Specific over generic.** Named legislation (TMA 1970 s.7, Sch 41 FA 2008 paras 5/13/20, Sch 18 FA 2017), specific section numbers, anonymised personas.
- **No real names.** Anonymised personas (Padmore, Cunliffe, Eastleigh, Helmstone in the worked examples above).
- **Lead-gen architecture:** `<LeadForm>` auto-injected at footer.
- **CSS in markdown:** semantic HTML only; no Tailwind classes.
- **FAQs:** 10-14 entries in frontmatter `faqs:` array.
- **Anti-templating:** highest risk on this slug is collapsing into sibling LPC-specific pages. RUN session must hold the **DDS umbrella architecture** framing tightly; each sub-track section is a routing-decision pointer (~150-200 words) to the campaign-specific page, not a duplication of campaign-specific mechanics.
- **Quality bar (six checks).**

### 19-step workflow (verbatim per §7)

1. Read `house_positions.md` at session start (esp §27.6 LPC + WDF + DDS + CoP9 architecture; §27.2 + §27.3 mechanics; §27.5 CoP9 boundary; §27.1 s.29 + s.36 + s.36A counterfactual).
2. Claim this page in MW3 tracker.
3. Read this brief (framing + key questions + research targets).
4. Fetch + read competitor URLs via session-side Google Search at write time.
5. Read closest-existing pages: the five sibling LPC-specific pages in MW3-A + any existing Wave 7 enquiry-mechanics pages.
6. Plan H2 / H3 outline + meta + 10-14 FAQs + CTA placements — STRICTLY in the umbrella-architecture routing-decision framing.
7. Verify factual claims against authorities per §16.35 (TMA 1970 s.7, Sch 41 paras 5/13/20, Sch 24 paras 4/4A/14, Sch 18 FA 2017, gov.uk DDS portal URL).
8. Fetch hero image.
9. Write markdown at `Property/web/content/blog/a-complete-guide-to-hmrcs-digital-disclosure-service.md`.
10. Build clean.
11. Six verifications.
12. Apply redirect repointing if needed.
13. Register in `monitored_pages`.
14. Commit on session branch.
15. Fill per-page work-log.
16. Mark ✅ done in tracker.
17. Append flags.
18. Append discoveries.
19. Claim next page.

## Work log (Stage 2 + RUN session populate)

### Stage 2 author entry

- **Stage 2 author:** MW3 Stage 2 Sub-Agent A (batch M3-A-B1) on 2026-05-27.
- **Stage 2 extensions added:** authority URL list anchored to legislation.gov.uk + gov.uk + HMRC manual paths (RUN re-verifies live at write time); 4 worked examples covering LPC (residential UK), WDF + FtC (offshore), general DDS catch-all (UK non-rental), and the CoP9 boundary case where DDS is the wrong route; 12 FAQs anchored to DDS sub-track choice, the 3-step cycle, Sch 41 floor matrix, FtC overlay, records, time-to-pay, criminal-immunity boundary, and the campaign-specific sibling-page relationship; voice + style + 19-step workflow stubs verbatim.
- **§16.36 statutory-citation cross-check:** TMA 1970 s.7 verified live 2026-05-27 (Stage 1 author); Sch 41 / Sch 24 / Sch 18 anchored to §27 lock verification 2026-05-24. No new drift catches at Stage 2 cross-check.
- **Anti-templating note:** five sibling LPC-specific pages exist in the same MW3-A wave. RUN session must hold the umbrella-architecture / routing-decision angle distinctly. Each sub-track section signposts OUT to the campaign-specific child, not duplicating mechanics.

### RUN session entry (populate at write time)

[RUN session records: H1 chosen, meta title + description, competitor URLs fetched, existing-page review notes, citations added, internal links added, build attempts, six-check verification, flags raised, summary.]

---

## Stage 1 seed work log

- **Stage 1 author:** MW3 Stage 1 Sub-Agent A (batch M3-A-B1) on 2026-05-27.
- **Cluster anchor:** Let Property Campaign & HMRC voluntary disclosure — DDS umbrella-architecture framing. Differentiation framing: the gov.uk online product layer hosting LPC + WDF + Card Transaction Programme + general voluntary disclosure as sub-tracks, distinct from sibling LPC-specific pages in this same wave.
- **HP-lock alignment:** §27.6 (LPC + WDF + DDS + CoP9 route choice) primary; §27.3 (Sch 41 mechanics) for the penalty-banding floor; §27.2 (Sch 24) for the inaccuracy boundary; §27.5 (CoP9) for the deliberate-fraud boundary; §27.1 (s.29 / s.36 / s.36A) for the HMRC-discovery alternative. No NEW HP LOCK NEEDED.
- **§16.35 per-write verification note:** TMA 1970 s.7 verified live 2026-05-27. Sch 41 / Sch 24 mechanics anchored to §27 lock verified 2026-05-24. FtC + LPC + WDF dates anchored to §27.6 lock. RUN session WebFetches Sch 41 + Sch 24 paragraph language at write time per §16.35.
- **Cannibalisation reasoning:** five sibling LPC-specific pages exist in this same wave bucket; this page differentiates by being the DDS umbrella-architecture layer (the routing-decision layer above the campaign-specific layer). No CANNIBAL flag — sibling pages assume the reader has already navigated to the correct sub-track; this page does the navigation.
