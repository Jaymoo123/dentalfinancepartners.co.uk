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

## Universal rules + workflow stubs (Stage 2 fills)

[Stage 2 populates from NETNEW_PROGRAM §4: voice + style (no em-dashes, no Tailwind in markdown, FAQ count match, 6-check quality bar) and the 19-step workflow.]

## Work log (Stage 2 + RUN session populate)

[Stage 2 + RUN session record their work here.]

---

## Stage 1 seed work log

- **Stage 1 author:** MW3 Stage 1 Sub-Agent A (batch M3-A-B1) on 2026-05-27.
- **Cluster anchor:** Penalties & enquiries — PAYE-specific RTI architecture. Differentiation framing: monthly RTI late-filing penalty cycle (Sch 55 para 6C) + Sch 56 PAYE-specific late-payment escalator, framed for property-business employers under §35 lock; distinct from the general TMA/Sch 24/Sch 41 self-assessment penalty pages.
- **HP-lock alignment:** §27 (HMRC enquiry + compliance mechanics) primary; §35 (Payroll mechanics for property-business employers) secondary; §27.3 (Sch 41 FA 2008 boundary) tertiary. No NEW HP LOCK NEEDED; possible §27.10 RTI sub-lock candidate flagged for Stage 1b review.
- **§16.35 per-write verification note:** Sch 55 + Sch 56 FA 2009 verified live 2026-05-27 against legislation.gov.uk URLs above. SI 2014/472 commencement dates and the 3-day risk-based concession (HMRC operational announcement) require Stage 2 re-verification at write time per §16.27 rate-by-reference and §16.35 statute-verification disciplines.
- **Cannibalisation reasoning:** sibling MW3-A pick `late-filing-and-late-payment-penalties` (A13) covers general TMA/Sch 24/Sch 41 self-assessment architecture; this page differentiates by being PAYE-specific (Sch 55 para 6C + Sch 56 item 2) within the property-business-employer use case. No CANNIBAL flag — pages co-exist as distinct operational layers within the Penalties & enquiries cluster.
