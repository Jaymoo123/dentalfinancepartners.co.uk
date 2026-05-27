---
slug: paye-penalties-for-late-submission-and-filing
category: landlord-tax-essentials
intent: A property-business employer (a landlord LtdCo with directors / employees, a portfolio operator with property managers on PAYE, or a serviced-accommodation business with cleaners on payroll) searching this query wants the operational PAYE penalty regime — what triggers a late-filing penalty for the Full Payment Submission (FPS) under Schedule 55 FA 2009 paragraph 6C, what the late-payment escalator looks like under Schedule 56 FA 2009 (item 2), how the RTI grace periods and reasonable-excuse defences interact, and how this layer differs from the general inaccuracy + failure-to-notify regimes covered elsewhere on the site. Property context: this page is written for property-business employers, not generalist SMEs.
---

# PAYE Penalties for Late Submission and Filing: The RTI Regime for Property-Business Employers

## Statutory anchor

- **Primary — late filing:** Finance Act 2009 Schedule 55 paragraph 6C — monthly fixed penalty for late real-time information (RTI) Full Payment Submission (FPS) returns. Operates inside the "amount of penalty: real time information for PAYE and apprenticeship levy" cross-heading at Sch 55 para 6B. Verified live 2026-05-27 at `https://www.legislation.gov.uk/ukpga/2009/10/schedule/55`.
- **Primary — late payment:** Finance Act 2009 Schedule 56 (item 2 in the Table: PAYE). Standard escalator architecture (introduced by FA 2009 s.107 + Sch 56; commenced by SI for PAYE from 2010/11). Verified live 2026-05-27 at `https://www.legislation.gov.uk/ukpga/2009/10/schedule/56`.
- **Supporting:** Income Tax (Pay As You Earn) Regulations 2003 (SI 2003/2682) — the RTI filing obligation itself, the FPS / EPS framework, and the regulation 67B "on or before payment" rule. PAYE late-filing penalty commencement order: Income Tax (Pay As You Earn) (Amendment) Regulations 2014 (SI 2014/472) which switched on Sch 55 para 6C from 6 October 2014 (large employers) and 6 March 2015 (small employers).
- **Supporting — penalty mitigation framework (cross-statute):** Schedule 24 FA 2007 (inaccuracy penalties) and Schedule 41 FA 2008 (failure-to-notify) sit alongside but are NOT the operative regime for RTI late-filing or late-payment. Sessions must not collapse these into Sch 55 / Sch 56 commentary.
- **House position reference:** §27 (HMRC enquiry + tax compliance mechanics — Wave 7 lock) for the general penalty / mitigation architecture; §35 (Payroll mechanics for property-business employers — MW2 extension lock) for the property-business-employer angle; §27.3 (Sch 41 FA 2008) and §27.2 (Sch 24 FA 2007) for the cross-statute boundary. No NEW HP LOCK NEEDED — Sch 55 para 6C + Sch 56 item 2 PAYE-specific mechanics sit naturally inside §35 + §27 architecture. Stage 1b drift review may decide whether to formalise a §27.10 "RTI penalty regime" sub-lock; flag-but-do-not-block.

## Framing differentiator (anti-templating, anti-cannibalisation)

This page is the **PAYE-specific RTI late-filing and late-payment penalty mechanics** guide for property-business employers (landlord LtdCos with director-PAYE, portfolio operators with employed property managers, serviced-accommodation businesses with employed cleaning / front-of-house staff). The closest existing pages on our site are the general TMA 1970 + Sch 24 / Sch 41 architecture pages (`late-filing-and-late-payment-penalties` — also a MW3-A pick, sibling B-batch slot) and the cross-tax penalty mitigation pages framed around self-assessment (LPC + WDF + voluntary disclosure pages in this same wave). None of those pages walk a property-business employer through the **monthly RTI-FPS penalty cycle** (Sch 55 para 6C fixed-monthly penalty, escalating with employee-count bands), the **one-unpenalised-failure-per-tax-year concession** at HMRC operational level, the **on-or-before reporting deadline under reg 67B PAYE Regs 2003**, the **HMRC risk-based late-filing concession in operation since March 2015** (3-day filing window), and the **Sch 56 PAYE late-payment escalator** with its distinctive **5% / 5% / 5% at 6 / 12 / annual** structure that differs from the self-assessment late-payment regime.

The angle this page takes: a landlord operating as a property-business employer (e.g. LtdCo with director-salary, family-payroll under Wave-9-locked §21.4 spouse-payroll framework, or a serviced-accommodation operator with employed staff under §35 lock) hits the RTI penalty regime monthly — every FPS submission that misses the on-or-before payment date is a potential trigger. This page is the operational-mechanics layer that explains what Sch 55 para 6C actually does, what the §35-locked property-employer concessions look like, and how to avoid the penalty + appeal it where it is raised.

## Key questions this page must answer

1. What is the statutory hook for a PAYE late-filing penalty (Sch 55 FA 2009 paragraph 6C) and when did it commence (SI 2014/472, large employers from 6 October 2014, small employers from 6 March 2015)?
2. What counts as "late" for an FPS under regulation 67B of the PAYE Regs 2003 — the "on or before payment" rule, and the operational 3-day risk-based concession that HMRC has applied since March 2015?
3. What is the fixed-monthly penalty banding under Sch 55 para 6C, by employee count (1-9 / 10-49 / 50-249 / 250+ bands)?
4. What is the "one unpenalised failure per tax year" concession that HMRC operates at risk-based level, and is it statutory or operational discretion?
5. How does Sch 55 para 6C late-filing escalation interact with the Sch 55 para 18 reasonable-excuse defence and the standard appeal route to FTT (TMA 1970 s.31A + TCEA 2007)?
6. What is the Sch 56 FA 2009 (item 2 PAYE) late-payment penalty escalator — the 1% / 2% / 3% / 4% structure based on the number of times PAYE has been paid late in the tax year, and the additional 5% at 6 months overdue + 5% at 12 months overdue?
7. How does the property-business-employer concession framework under §35 lock (small-employer routine) interact with the RTI regime — does running a single-director payroll change the penalty exposure profile?
8. What is the boundary between a Sch 55 para 6C RTI penalty (filing failure), a Sch 24 FA 2007 penalty (inaccuracy in the FPS data), and a Sch 41 FA 2008 penalty (failure to register for PAYE in the first place)?
9. Where does Specified Charge under regulation 75A PAYE Regs 2003 fit — HMRC's power to issue an estimated PAYE liability where no FPS is filed at all?
10. What are the most common operational triggers for property-business employers (director not yet on payroll system at company formation; spouse-payroll under §21.4 framework not transitioned into RTI; serviced-accommodation seasonal staff missed off FPS during low-let weeks; cessation of letting business mid-tax-year without final FPS marker)?

## Manager pre-decisions placeholder

- **Category routing:** `landlord-tax-essentials` (matches live route at `Property/web/src/app/blog/landlord-tax-essentials/`). PAYE penalties sit inside the landlord-tax-essentials operational pillar; not an MTD-specific page (despite RTI being a separate digital reporting cycle to MTD ITSA, the two regimes do not overlap statutorily). Manager to confirm or override to `property-accountant-services`.
- **Worked-example numbers:** the Sch 55 para 6C fixed-monthly figures (£100 / £200 / £300 / £400) and the Sch 56 escalator percentages (1% / 2% / 3% / 4% + 5% / 5%) are rate-by-reference under §16.27 — RUN session verifies the live published figures at write time. The 12-month-deliberate uplift to up to 100% of tax under Sch 55 para 6 also requires write-time verification.
- **Cross-link targets:**
  - Within MW3 Bucket A: `late-filing-and-late-payment-penalties` (A13 — general TMA/Sch 24/Sch 41 sibling), `corporation-tax-deadlines-and-penalties` (A5 — sibling tax stream for the same LtdCo property-business employer).
  - To existing pages: HR/payroll guides under MW2 Bucket A architecture (where they exist), the §35 payroll-mechanics-for-property-business-employers framing pages.
  - Forward: `how-to-appeal-an-hmrc-penalty` style pages where present.

## Stage 2 research target list

- Competitor pages to fetch (Stage 2 sources fresh via Google Search / Bing Search at write time; Wave 8 + Wave 9 5/5 dead-rate pattern recurs — do NOT trust Stage 1 URL guesses; verify with httpx + BeautifulSoup before citing): 2-4 candidates from accountancy practice sites + payroll-software vendor knowledge bases covering "PAYE RTI late filing penalty" and "PAYE late payment penalty escalator".
- HMRC manuals to cite: PAYE Manual PAYE91110 onwards (real-time information penalties); Compliance Handbook CH62000+ (Sch 55) and CH150000+ (Sch 56 read across); Specified Charge guidance in PAYE Manual.
- Legislation anchors: Sch 55 FA 2009 paras 6B-6D (RTI cross-heading); Sch 56 FA 2009 Table item 2 + paras 3-4 (PAYE escalator); SI 2014/472 commencement; reg 67B + reg 75A PAYE Regs 2003.
- Case-law to ground: Perrin v HMRC [2018] UKUT 156 (reasonable excuse four-stage test, controlling authority for Sch 55 para 18 appeals); HMRC v Hok Ltd [2012] UKUT 363 (Sch 55 jurisdiction limitation — FTT cannot consider fairness, only reasonable excuse); Barking Brickwork Contractors v HMRC [2017] UKFTT 366 (illustrative RTI-FPS reasonable-excuse FTT decision).

## Stage 2 research target list — extended

### Authority URLs (Stage 2 surfaces; RUN session WebFetches at write time per §16.35)

- **`https://www.legislation.gov.uk/ukpga/2009/10/schedule/55`** — Sch 55 FA 2009 (late-filing). RUN session reads the verbatim text of paras 6B, 6C, 6D (RTI cross-heading) at write time and quotes para 6C subparagraph (2) banding language directly.
- **`https://www.legislation.gov.uk/ukpga/2009/10/schedule/56`** — Sch 56 FA 2009 (late-payment). Table item 2 covers PAYE. Paras 3-4 give the standard escalator.
- **`https://www.legislation.gov.uk/uksi/2014/472/contents/made`** — SI 2014/472 Income Tax (PAYE) (Amendment) Regulations 2014. RUN session verifies commencement dates 6 October 2014 (large) + 6 March 2015 (small) at write time.
- **`https://www.legislation.gov.uk/uksi/2003/2682/regulation/67B`** — PAYE Regs 2003 reg 67B (on-or-before reporting). RUN session quotes the "on or before making the relevant payment" language.
- **`https://www.legislation.gov.uk/uksi/2003/2682/regulation/75A`** — PAYE Regs 2003 reg 75A (Specified Charge — HMRC estimated PAYE where no FPS filed). Read at write time.
- **`https://www.gov.uk/running-payroll/reporting-to-hmrc`** — gov.uk consumer-facing entry on FPS / EPS reporting.
- **`https://www.gov.uk/government/publications/real-time-information-improving-the-operation-of-paye-late-filing-and-late-payment-penalties`** — HMRC announcement of the 3-day risk-based concession (March 2015). RUN session WebFetches at write time to verify concession is still operationally in force.
- **`https://www.gov.uk/hmrc-internal-manuals/paye-manual/paye91110`** — HMRC PAYE Manual PAYE91110 onwards (RTI penalties index). RUN session reads child page directly.
- **`https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch62000`** — HMRC Compliance Handbook CH62000+ (Sch 55 commentary).

### Competitor URLs (session-side WebSearch at write time)

`<!-- competitor section: per §16.31 Wave 8 + Wave 9 5/5 dead-rate pattern, Stage 2 did not pre-fetch firm-domain URLs. RUN session uses Google Search at write time. Recommended search queries: "PAYE RTI late filing penalty £100 small employer", "Schedule 55 FA 2009 paragraph 6C banding", "PAYE late payment penalty escalator HMRC". Target: 3-5 firm-side pages from BrightPay / Sage / Xero / IRIS / accountancy practice knowledge bases. -->`

### Case-law

- **Perrin v HMRC [2018] UKUT 156 (TCC)** — controlling authority for the Sch 55 para 18 reasonable-excuse four-stage test (identify the obligation; identify the excuse; assess whether it is reasonable in the taxpayer's circumstances; assess whether the failure was remedied within a reasonable time of the excuse ceasing).
- **HMRC v Hok Ltd [2012] UKUT 363 (TCC)** — Sch 55 jurisdictional limit. FTT cannot consider general fairness; only reasonable excuse and statutory framework. Applies directly to RTI penalty appeals.
- **Barking Brickwork Contractors Ltd v HMRC [2017] UKFTT 366 (TC)** — illustrative RTI-FPS reasonable-excuse FTT decision (single-event excuse + remedy timing). RUN session cites where prose needs a concrete FTT example.

## Worked-example data (RUN session uses these as canvas)

### Example 1 — Single-director LtdCo missing FPS for 3 consecutive months

- **Aldridge Lettings Ltd** is a single-director BTL SPV. The director takes a £12,570 PAYE salary spread across 12 monthly payments of £1,047.50. The bookkeeping is done in-house and the director processes payroll the day after pay date each month.
- **Trigger:** in months 4, 5, and 6 of the tax year, the director processes payroll on time but forgets to submit the FPS. HMRC issues the first penalty notice after month 5 (the second failure crosses the "one unpenalised failure per tax year" concession).
- **Penalty exposure under Sch 55 para 6C:** 1-9 employees → £100/month × 2 chargeable failures (months 5 + 6; month 4 is the unpenalised first failure of the tax year) = **£200 fixed penalty**. The director's reasonable-excuse defence under Sch 55 para 18 (workload + single-director burden) is unlikely to succeed under the Perrin four-stage test because forgetfulness is not a reasonable excuse (per HMRC's published view + FTT precedent).
- **Remediation:** submit the missing FPSs immediately; appeal only if a Perrin-stage-2 excuse exists (illness, system failure, bereavement); reasonable-excuse defences for ordinary workload pressures generally fail at FTT.

### Example 2 — Portfolio operator with employed property manager and on-time payment but late FPS

- **Caulfield Estates Ltd** runs a 14-property BTL portfolio with one employed property manager (£32,000/year + auto-enrolment pension). Payroll runs on the 28th of each month. The manager's pay clears the bank on the 28th but the FPS is submitted on the 30th because the bookkeeper batches FPS submissions at month-end.
- **Trigger:** reg 67B PAYE Regs 2003 requires "on or before payment". The 2-day late FPS each month is technically a Sch 55 para 6C failure every month.
- **Operational concession:** HMRC's 3-day risk-based concession (March 2015 onwards) does NOT penalise FPSs filed up to 3 days after the on-or-before deadline, provided this is not a persistent pattern. Caulfield Estates Ltd's persistent 2-day delay risks losing concession protection if HMRC notices the systematic pattern.
- **Remediation:** move the FPS to "on or before" the 28th by automating submission in payroll software. The fix is operational; the penalty risk is real but typically dormant under the 3-day concession.

### Example 3 — Serviced-accommodation cessation mid-tax-year without final FPS marker

- **Kingsgrove Holiday Lets Ltd** runs a serviced-accommodation portfolio with 4 employed cleaners (£14,500-£18,000/year each). The company ceases trading on 31 December (mid-tax-year) and dismisses all four employees with proper P45 issuance. However, the bookkeeper forgets to mark the final FPS as "final submission for tax year" (the "ceased trading" indicator in the FPS schema).
- **Trigger:** HMRC continues to expect monthly FPSs for January, February, March. Three months pass with no FPS. HMRC issues a Specified Charge under reg 75A PAYE Regs 2003 based on prior-month payroll figures, treating Kingsgrove as if it owed PAYE for January-March at the December run-rate (£3,000-£4,000/month notional).
- **Penalty exposure:** Sch 55 para 6C late-filing penalty for each of the 3 missed FPSs (£100 × 3 = £300, less the unpenalised-failure concession = £200); plus the Specified Charge sits as a presumed PAYE liability that the company must reverse.
- **Remediation:** submit Nil EPS (Employer Payment Summary) for each of the 3 months stating "no payments in this period" OR submit a final FPS with the cessation marker retrospectively. The Specified Charge is reduced or withdrawn once the cessation is properly reported. Cross-reference §16.43 historic-cleanup pattern: ceased-trading cases need explicit closure of the PAYE scheme via gov.uk.

### Example 4 — Sch 56 PAYE late-payment escalator across a tax year

- **Northcliffe Properties Ltd** runs a 28-property portfolio with 3 PAYE employees. The company pays PAYE late by 5-15 days in 8 of 12 months in the 2026/27 tax year (cash-flow pressure during a refurb cycle).
- **Sch 56 FA 2009 item 2 PAYE-specific escalator:** the percentage rises with the COUNT of late payments in the tax year, not the lateness duration. 1st default in tax year: no penalty (first-default concession). 2nd / 3rd / 4th default: 1% of unpaid tax. 5th / 6th / 7th default: 2%. 8th / 9th / 10th default: 3%. 11th default onwards: 4%. PLUS additional 5% at 6 months overdue (any single payment) and a further 5% at 12 months overdue.
- **Worked numbers:** Northcliffe's late-payment penalty for 7 chargeable late payments at average £2,500 PAYE / month: 1st default (no penalty) → 2nd-4th at 1% × £2,500 × 3 = £75 → 5th-7th at 2% × £2,500 × 3 = £150 → 8th at 3% × £2,500 = £75 → total = **£300 in-year**. None reaches the 6-month-overdue threshold so no additional 5% / 5% accruals.
- **Cumulative point:** the Sch 56 escalator is mild for a few late payments but punitive for habitual late payers. After ~12 chargeable defaults the in-year cost crosses £1,000; after habitual late-payment + 6-month-overdue triggers, the cumulative cost can reach ~10% of annual PAYE.

## FAQ expansion (RUN session polishes prose; 10-12 FAQs target)

1. **Q: What is the FPS and when does it need to be filed?**
   A: The Full Payment Submission (FPS) is the real-time information return filed under regulation 67B of the Income Tax (Pay As You Earn) Regulations 2003 (SI 2003/2682). It must be submitted "on or before" the payment date for each employee for each payment cycle. For a monthly payroll, that is the date the employee is paid, not the end of the payroll month.

2. **Q: What is the late-filing penalty for a missed FPS under Schedule 55 FA 2009 paragraph 6C?**
   A: The fixed monthly penalty bands by employee count are: 1-9 employees £100 per month, 10-49 employees £200, 50-249 employees £300, 250+ employees £400. The penalty attaches to each chargeable failure, subject to the operational concession that the first failure in each tax year is unpenalised. Additional uplift up to 5% of unpaid tax (or 100% in deliberate cases) applies after 12 months under Sch 55 para 6.

3. **Q: What is the "one unpenalised failure per tax year" concession and is it statutory?**
   A: It is an HMRC operational concession rather than a statutory exemption. HMRC's RTI penalty operational policy treats the first FPS failure in any tax year as unpenalised provided the employer rectifies promptly. The concession sits inside HMRC's discretion under the Sch 55 framework; it does not appear on the face of paragraph 6C. Employers cannot rely on a future continuation of the concession indefinitely; HMRC has reserved the right to tighten it in any future tax year.

4. **Q: What is the 3-day risk-based filing concession that HMRC has operated since March 2015?**
   A: HMRC announced in February 2015 that, from March 2015 onwards, employers would not face a Sch 55 para 6C penalty where the FPS is filed within 3 days of the on-or-before deadline, provided this is not part of a persistent pattern. The concession remains in operational force at the time of writing but is reviewed periodically and could be withdrawn. Employers with a settled 2-3 day delay pattern should align the FPS submission to the payment date to remove dependence on the concession.

5. **Q: What is the Schedule 56 FA 2009 late-payment penalty escalator for PAYE?**
   A: The escalator at Sch 56 Table item 2 increases with the number of late payments in the tax year: the first default in the tax year is unpenalised; subsequent defaults attract 1% / 1% / 1% / 1% (for the 2nd-4th defaults), then 2% (5th-7th), 3% (8th-10th), 4% (11th onwards). Additional accruals of 5% at 6 months overdue and a further 5% at 12 months overdue apply to any single late payment.

6. **Q: How does the property-business-employer angle change the PAYE penalty exposure?**
   A: Property-business employers (landlord LtdCos with director-PAYE, portfolio operators with employed property managers, serviced-accommodation businesses with employed cleaners) face the same RTI regime as any other employer. The property-specific risk profile is operational: small-employer profile sits in the 1-9 band at £100/month; mid-portfolio sits at 10-49 at £200; large portfolios cross 50 at £300. The seasonal-staff pattern in serviced-accommodation businesses also creates cessation-marker failure risk where seasonal layoffs are not properly reported on the FPS.

7. **Q: What is the reasonable excuse defence under Schedule 55 paragraph 18, and how does Perrin v HMRC apply?**
   A: Sch 55 para 18 disapplies a penalty where the taxpayer has a reasonable excuse and rectifies the failure within a reasonable time of the excuse ceasing. The Upper Tribunal in Perrin v HMRC [2018] UKUT 156 (TCC) set out the four-stage test: identify what was supposed to be done; identify the excuse; assess whether the excuse is reasonable in the taxpayer's specific circumstances; assess whether the failure was remedied within a reasonable time. Ordinary workload pressures, forgetfulness, and routine staff turnover generally fail the reasonable-excuse test. Illness, system failures, and unexpected events more often succeed.

8. **Q: What is the difference between a Schedule 55 RTI late-filing penalty and a Schedule 24 FA 2007 inaccuracy penalty?**
   A: Sch 55 para 6C penalises the FAILURE TO FILE the FPS on time; Sch 24 FA 2007 penalises an INACCURACY within an FPS that has been filed. They sit at different points in the compliance cycle and can apply concurrently if an employer files a late FPS that also contains inaccurate data. Sch 41 FA 2008 separately penalises the failure to register for PAYE in the first place.

9. **Q: What is a Specified Charge under regulation 75A and how does it interact with the penalty regime?**
   A: Regulation 75A of the PAYE Regs 2003 gives HMRC the power to issue an estimated PAYE liability where no FPS has been filed at all. The Specified Charge is calculated by reference to prior-period PAYE figures and is treated as if it were the employer's actual liability for the period in question. The Specified Charge does not replace the penalty regime; Sch 55 para 6C late-filing penalties apply on top of the Specified Charge. Submitting the missing FPS (or a Nil EPS where appropriate) typically displaces the Specified Charge.

10. **Q: Can a single-director LtdCo with only director-salary on payroll escape RTI penalties by running a non-RTI annual scheme?**
    A: HMRC operates an Annual PAYE scheme for very small employers where payment is made only once per tax year, but the scheme must be opted into formally and is restricted in scope. A single-director LtdCo running a Personal Allowance salary through monthly payroll cannot retroactively claim Annual scheme treatment to avoid late-filing penalties. The choice must be made prospectively with HMRC's agreement.

11. **Q: How do I appeal a Schedule 55 paragraph 6C penalty?**
    A: Appeals run to HMRC initially (a "review" under TMA 1970 s.49C-G), then to the First-tier Tribunal under TMA 1970 s.31A read with TCEA 2007. The FTT can consider only the reasonable-excuse defence and the statutory framework; HMRC v Hok Ltd [2012] UKUT 363 confirms the FTT cannot consider general fairness or HMRC's failure to send a reminder. Strict 30-day deadlines apply from the date of HMRC's review conclusion or penalty notice.

12. **Q: How does the RTI penalty regime interact with MTD ITSA from 6 April 2026?**
    A: RTI for PAYE and MTD for ITSA are separate digital reporting cycles with no statutory overlap. A landlord LtdCo employing PAYE staff and the same individual landlord-director filing MTD ITSA personally will run both cycles in parallel: the LtdCo's PAYE FPS cycle (monthly, on-or-before payment) and the director's individual MTD ITSA quarterly cycle (rental income + self-employment). The penalty regimes are distinct: Sch 55 para 6C for RTI; the points-based Sch 55 regime as amended for MTD ITSA; and the accelerated Sch 56 3%/3%/10% schedule for MTD ITSA late payment under §19.7.

## Universal rules + workflow stubs (RUN session follows)

### Voice + style (verbatim per §4.8)

- **No em-dashes** in body copy. Use commas, parentheses, full stops, middle dots, or restructure the sentence.
- **Specific over generic.** Named legislation (Sch 55 FA 2009 paragraph 6C, reg 67B PAYE Regs 2003, SI 2014/472), specific section numbers, anonymised personas.
- **No real names.** Anonymised personas (Aldridge, Caulfield, Kingsgrove, Northcliffe in the worked examples above).
- **Lead-gen architecture:** `<LeadForm>` auto-injected at footer. Do not duplicate in body.
- **CSS in markdown:** semantic HTML only. No Tailwind classes. `<aside>` styled by global CSS.
- **FAQs:** 10-14 entries in frontmatter `faqs:` array, auto-emitted as FAQPage JSON-LD by the build.
- **Anti-templating:** this page must hold the **property-business-employer RTI angle** distinctly from the sibling A13 general SA penalty page and the sibling A5 CT penalty page. Each H2 should reflect the RTI / FPS / Sch 55 para 6C focus, not generic penalty-regime structure.
- **Quality bar (six checks):** zero em-dashes, zero Tailwind, FAQ schema count matches frontmatter array, meta title ≤ 62 chars, meta description ≤ 158 chars, internal links resolve.

### 19-step workflow (verbatim per §7)

1. Read `house_positions.md` at session start (esp §27 cluster + §35 payroll mechanics + §27.2 + §27.3 boundaries).
2. Claim this page in MW3 page tracker (⬜ → 🟡 with UTC timestamp).
3. Read this brief (framing differentiator, key questions, manager pre-decisions, research target list).
4. Fetch + read competitor URLs via session-side Google Search at write time (per §16.31 dead-rate pattern).
5. Read closest-existing pages: sibling MW3 A13 general SA penalty page, sibling A5 CT penalty page; any existing landlord-tax-essentials operational pages.
6. Plan H2 / H3 outline + meta + 10-14 FAQs + CTA placements — STRICTLY in the property-business-employer RTI angle; no overlap with sibling-page H2 structures.
7. Verify factual claims against authorities per §16.35 (Sch 55 para 6C + Sch 56 item 2 + SI 2014/472 commencement dates + reg 67B + reg 75A verbatim WebFetched from legislation.gov.uk).
8. Fetch hero image from Pexels via `fetch_image_for_post(query)`.
9. Write markdown at `Property/web/content/blog/paye-penalties-for-late-submission-and-filing.md` (full frontmatter list per §4).
10. Build clean: `cd Property/web && npm run build`.
11. Six verifications: FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title ≤62, meta description ≤158, internal links resolve.
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

- **Stage 2 author:** MW3 Stage 2 Sub-Agent A (batch M3-A-B1) on 2026-05-27.
- **Stage 2 extensions added:** authority URL list verified against legislation.gov.uk + gov.uk page paths (RUN session re-verifies live at write time per §16.31 + §16.35); 4 worked examples covering single-director LtdCo, on-time-payment-late-FPS pattern, mid-year cessation, and Sch 56 escalator across a tax year; 12 FAQs anchored to Sch 55 para 6C, Sch 56 item 2, reg 67B, reg 75A, Perrin / Hok case-law, and the MTD ITSA interaction boundary; voice + style + 19-step workflow stubs verbatim per §4.8 + §7.
- **§16.36 statutory-citation cross-check:** Sch 55 FA 2009 paragraph 6C verified live 2026-05-27 (Stage 1 author + Stage 2 review); Sch 56 FA 2009 item 2 verified live 2026-05-27; SI 2014/472 commencement dates anchored to the Stage 1 seed verification + §27 lock alignment. No new drift catches at Stage 2 cross-check; the seed's citations are intact.
- **Anti-templating note:** highest risk on this slug is collapsing into sibling A13 (general SA penalties) structure. RUN session must hold the RTI / FPS / Sch 55 para 6C focus distinctly. The 3-day risk-based concession and the Specified Charge mechanic are unique-to-RTI talking points that anchor differentiation.

### RUN session entry (populate at write time)

[RUN session records: H1 chosen, meta title + description chosen, competitor URLs fetched + key takeaways, existing-page review notes, citations added, internal links added, build attempts pass / fail, six-check verification, flags raised, 2-3 sentence summary.]

---

## Stage 1 seed work log

- **Stage 1 author:** MW3 Stage 1 Sub-Agent A (batch M3-A-B1) on 2026-05-27.
- **Cluster anchor:** Penalties & enquiries — PAYE-specific RTI architecture. Differentiation framing: monthly RTI late-filing penalty cycle (Sch 55 para 6C) + Sch 56 PAYE-specific late-payment escalator, framed for property-business employers under §35 lock; distinct from the general TMA/Sch 24/Sch 41 self-assessment penalty pages.
- **HP-lock alignment:** §27 (HMRC enquiry + compliance mechanics) primary; §35 (Payroll mechanics for property-business employers) secondary; §27.3 (Sch 41 FA 2008 boundary) tertiary. No NEW HP LOCK NEEDED; possible §27.10 RTI sub-lock candidate flagged for Stage 1b review.
- **§16.35 per-write verification note:** Sch 55 + Sch 56 FA 2009 verified live 2026-05-27 against legislation.gov.uk URLs above. SI 2014/472 commencement dates and the 3-day risk-based concession (HMRC operational announcement) require Stage 2 re-verification at write time per §16.27 rate-by-reference and §16.35 statute-verification disciplines.
- **Cannibalisation reasoning:** sibling MW3-A pick `late-filing-and-late-payment-penalties` (A13) covers general TMA/Sch 24/Sch 41 self-assessment architecture; this page differentiates by being PAYE-specific (Sch 55 para 6C + Sch 56 item 2) within the property-business-employer use case. No CANNIBAL flag — pages co-exist as distinct operational layers within the Penalties & enquiries cluster.
