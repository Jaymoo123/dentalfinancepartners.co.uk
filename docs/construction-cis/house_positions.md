# Trade Tax Specialists house positions (locked figures and framings)

Site key: **construction-cis**. Locked by the orchestrator on **2026-06-12** before any construction-cis net-new or rewrite session launches. These are the positions every Trade Tax Specialists page must use, cited by section number (`§N` / `§N.A`). This document is **HP-LOCKED ground truth**: no published content (service page, blog cluster, pillar, /for/* trade page, meta or calculator) may contradict it. Correctness is paramount: a wrong rate, threshold or statutory reference here re-seeds the error into every citing page. Every figure below is taken from the FA 2026-verified fact base in `docs/construction-cis/SITE_PLAN.md` §8 and is locked for page writing.

Audience: UK construction-sector taxpayers, in priority order (SITE_PLAN §2): (A) sole-trader subcontractors (primary), (B) limited-company directors in construction (secondary), (C) main contractors who file CIS300 returns and verify subcontractors (tertiary). Tax year referenced throughout is **2026/27** (6 April 2026 to 5 April 2027) unless a figure is explicitly date-banded. The rUK (England, Wales, Northern Ireland) framing applies for the estate-wide income/dividend figures; the CIS scheme itself is UK-wide. This is a **UK-only** site (SITE_PLAN §10): no CIS Ireland, no CIS India, no other geo.

If a session hits a factual conflict between a competitor source and a house position, **append a flag** to the wave's `site_wide_flags` (do not unilaterally re-frame). The orchestrator reconciles at the HP-lock review gate.

No em-dashes anywhere (commas, parentheses, full stops, middle dots only). British English throughout. Every locked figure carries its effective date and, where it matters, its scope (CIS-wide vs estate-wide, company vs individual, contractor vs subcontractor).

**HP-LOCK review (manager, 2026-06-12): LOCKED.** Source of every figure is SITE_PLAN §8 (FA 2026-verified against GOV.UK FA 2026 policy papers and live UK SERP checks at plan-drafting time). **Enacted-status RESOLVED 2026-06-12:** the April 2026 GPS anti-fraud provisions are settled, in-force law — Finance Act 2026 (c. 11) received Royal Assent 18 March 2026; FA 2004 ss.62A/62B and the s.66 amendments are in force from 6 April 2026 (SI 2026/289). Write "Finance Act 2026", never "Finance Bill 2026". **§3 correction 2026-06-12:** the ss.62A/62B liability is 20% of the payment / sums returned, on the payer or return-maker (see §3) — the original "30% of tax lost, directors" claim was wrong and has been corrected. Market refund averages are marketing-sourced and flagged "for content, not guaranteed". Document is LOCKED for page writing.

---

## 1. CIS deduction rates (locked, 2026-06-12)

**Position.** The Construction Industry Scheme requires a contractor to deduct money from a subcontractor's payment and pass it to HMRC as an advance towards the subcontractor's tax and National Insurance. For **2026/27 the three rates are unchanged**:

| Status | Deduction rate |
|---|---|
| Gross Payment Status (GPS) | **0%** |
| Registered subcontractor | **20%** |
| Unregistered subcontractor | **30%** |

- **Mandatory inclusion (labour-only deduction base).** CIS deductions apply to the **labour element only**. The cost of **materials** the subcontractor buys for the job is **excluded** from the deduction base. So a £1,000 invoice made up of £600 labour and £400 materials has the 20% (or 30%) applied to the £600 labour, not the full £1,000. This is one of the most commonly misunderstood rules in CIS. **Every page that discusses CIS deductions, deduction rates, or how much is taken must state the labour-only base clearly.** Treat this as a blocking requirement at QA for any deduction-discussing page.
- **Practical writing rule for sessions:** present the **0% / 20% / 30%** ladder with the status each rate attaches to (GPS / registered / unregistered), and always couple it with the **labour-only** rule and a worked split (labour vs materials). Frame the 20%-vs-30% gap as the reason registration is practically essential for subcontractors (§5). Do NOT apply a CIS deduction to the materials portion. Cross-ref §2 (GPS, the 0% route), §5 (registration), §9 (the refund hook turns on over-deduction).

---

## 2. Gross Payment Status: the three qualifying tests (locked, 2026-06-12)

**Position.** Gross Payment Status (GPS) lets a subcontractor be paid in full with **no CIS deduction (0%, §1)**, settling their tax through Self Assessment or Corporation Tax instead. To hold GPS a subcontractor must pass **three tests, all of which must be met** (2026/27):

**1. Business test.** The applicant carries out construction work (or provides labour for construction work) **in the UK** and runs the business **through a bank account**.

**2. Turnover test.** Net annual CIS turnover must reach the relevant threshold:

| Entity type | Net annual CIS turnover required |
|---|---|
| Sole trader | £30,000 |
| Partnership | £30,000 per partner OR £100,000 total |
| Limited company | £30,000 per director OR £100,000 total |
| Closely controlled company (5 or fewer controllers) | £30,000 per controller |

*£100,000 whole-business threshold RE-VERIFIED against GOV.UK ("what you must do as a CIS subcontractor / gross payment status") 2026-06-12. NOTE for QA agents: legislation.gov.uk serves SI 2005/2045 reg 28 in ORIGINAL format showing the historic £200,000 figure with amendments not applied; GOV.UK's £100,000 is the current law. Do not escalate on the original-format SI text.*

"Net" turnover **excludes VAT and excludes the cost of materials** purchased for jobs (it is the labour/construction-services element, consistent with the §1 deduction base). The measurement period is the **last 12 months** of CIS-relevant construction work.

**3. Compliance test.** All tax obligations met **on time for the past 12 months**: no late Self Assessment returns, no overdue tax bills, no PAYE defaults.

- **Practical writing rule for sessions:** state that **all three tests must be passed**, set out the **turnover table by entity type**, and make the **"net excludes VAT and materials"** definition explicit (it mirrors the §1 labour-only base). Note the **12-month measurement / compliance window**. Always pair the qualifying tests with the April 2026 anti-fraud changes (§3): qualifying is no longer the end of the story, keeping GPS now turns on ongoing due diligence. Cross-ref §1 (0% rate), §3 (revocation), §5 (registration).

---

## 3. April 2026 GPS anti-fraud changes (locked, 2026-06-12)

**Position.** **Finance Act 2026 (c. 11, Royal Assent 18 March 2026)** introduces a tougher GPS regime **in force from 6 April 2026** — **ENACTED, settled law** (verified at legislation.gov.uk 2026-06-12: FA 2026 ss.220-222 insert FA 2004 ss.62A/62B and amend s.66; commencement SI 2026/289). Write "Finance Act 2026" everywhere; never "Finance Bill 2026" or "direction of travel" hedging. This is a genuine first-mover content opportunity (SITE_PLAN §12): only a handful of accountant blogs cover the changes. **Every GPS-related page must include these updates.**

- **Immediate revocation.** HMRC can remove GPS **without advance notice** where a contractor **"knew or should have known"** about fraudulent connections in the supply chain. The **"should have known"** standard means that a **failure to carry out due diligence is sufficient** for revocation: HMRC does not have to prove intent.
- **Five-year reapplication ban.** GPS removed on fraud grounds now triggers a **5-year ban on reapplication** (previously 1 year). The cash-flow cost is severe: roughly **£100,000 a year** for a contractor earning £500,000 a year, because losing GPS means 20% is deducted at source on every payment instead of 0%.
- **Knowledge-based liability (FA 2004 ss.62A/62B, inserted by FA 2026).** A person who **makes a payment under a construction contract** knowing, or having reason to know, that a connected party has **deliberately failed to comply** with CIS obligations is liable to a penalty of **20% of the payment** (s.62A, "Payments made in the knowledge of deliberate failures to comply"). For **returns** made in the knowledge of deliberate failures, the liability is **an amount EQUAL TO the sum the return treats as deducted and paid** — i.e. **100% of the sum returned, no percentage reduction** (s.62B; operative wording "an amount equal to the sum which the return treats as paid on account of the person's liabilities", verified at legislation.gov.uk + HMRC manual CISR16073). **The two quanta differ: s.62A = 20% of the payment; s.62B = the full sum returned. Never write "20%" for s.62B.** The liability attaches to the **payer or return-maker** (which may be a company or an individual). *[CORRECTED 2026-06-13: the 2026-06-12 correction wrongly carried 20% across to s.62B; caught by wave-2 Opus re-QA.]* **Commencement precision:** ss.62A/62B and the s.66 GPS amendments take effect from 6 April 2026 **directly under FA 2026 s.222** (no commencement SI). **SI 2026/289** covers only the regulation-level changes (nil-return reinstatement + Reg 23A public-body exemption). Do not cite SI 2026/289 as the vehicle for ss.62A/62B/s.66. **NEVER state a "30% of tax lost" director penalty under ss.62A/62B** — no 30% figure appears in either section. Where a company's deliberate behaviour produces penalties, HMRC can pursue **officers personally under the existing officer-liability rules**; keep general director-liability framing percentage-free. **Exception (added 2026-06-12):** a page MAY cite a precise statutory officer-liability mechanism where it names the section and states it accurately — e.g. FA 2004 **s.72B** (inserted by FA 2026) allows HMRC to issue a decision notice requiring a company officer to pay **up to 100% of the company's s.72A penalty** (verified at legislation.gov.uk). What remains banned is any uncited or fabricated percentage (the old "30% of tax lost" claim) and attaching percentages to ss.62A/62B, which contain none. *[CORRECTED 2026-06-12: the previous locked text ("directors face penalties of up to 30% of the tax HMRC considers lost under ss.62A/62B") contradicted the operative wording of both sections; caught by wave-2 Opus independent QA against legislation.gov.uk, corroborated by manager re-fetch.]*
- **Due diligence is now essential.** To meet the "should have known" standard, a contractor must, before payment: **re-verify the CIS status of each subcontractor**, run a **Companies House legitimacy check**, and carry out **bank account name verification**.

- **Practical writing rule for sessions:** state the **"knew or should have known"** standard and stress that **failure to do due diligence is itself enough** (no intent required). Use the **5-year ban** (up from 1 year) and the **~£100k/year on £500k turnover** cash-flow framing. Cite **FA 2004 ss.62A/62B (inserted by FA 2026)** for the **20%-of-payment / 20%-of-sums-returned knowledge-based penalties** on the payer or return-maker; keep director exposure general (officer-liability rules), never "30% of tax lost". List the **three due-diligence steps** (subcontractor re-verification, Companies House check, bank name verification). Tag everything **6 April 2026, Finance Act 2026 (enacted, RA 18 March 2026)** — no Bill hedging. Cross-ref §2 (qualifying), §6 (verification feeds the due-diligence duty, contractor audience).

---

## 4. CIS returns and deadlines (locked, 2026-06-12)

**Position.** A contractor must report payments to subcontractors to HMRC on a monthly return.

- **CIS300 (monthly return).** Must be filed by the **19th of the following tax month**. Tax months run to the 5th, so the return covering the month to (for example) 5 May is due by 19 May. Payment of deducted CIS to HMRC is due by the **22nd** (electronic) or the **19th** (cheque).
- **Nil returns, mandatory from April 2026.** Where a contractor makes **no payments** to subcontractors in a tax month, they must still file a **CIS300 nil return** (or pre-notify HMRC of inactivity). The nil-return obligation was **removed in 2015 and reinstated from 6 April 2026**. This is already being missed by contractors (SITE_PLAN §12): high urgency, thin existing coverage.
- **Nil return penalty ladder.** Late filing penalties escalate:

| Lateness | Penalty |
|---|---|
| 1 day late | £100 |
| 2 months late | £200 |
| 6 months late | £300 or 5% of the CIS deductions on the return (whichever is higher) |
| 12 months late | £300 or 5% of the CIS deductions on the return (whichever is higher) |
| 12+ months, information withheld deliberately | additional penalty up to £3,000 or 100% of the CIS deductions (whichever is higher) |

*Ladder verified against GOV.UK "file your monthly returns" guidance 2026-06-12 (Sch 55 FA 2009 CIS-specific paras 8-13; the general paras 3-6 do NOT apply to CIS returns — a QA agent reading those will false-flag the £200 tier). [CORRECTED 2026-06-12: the 12-month tier previously read "£300 or 100%"; the 100% layer applies only to deliberate withholding, as an additional penalty.]*

- **Practical writing rule for sessions:** use the **19th-of-the-following-tax-month** filing deadline and the **22nd electronic / 19th cheque** payment deadlines. State the **nil-return obligation as reinstated from 6 April 2026** (removed 2015) and that inactivity can be pre-notified instead. Reproduce the **penalty ladder** (£100 / £200 / £300-or-5% / £300-or-100%) accurately. This is **contractor-audience** content (persona C, §audience). Cross-ref §3 (due diligence), §6 (verification), §5 (who is a contractor).

---

## 5. CIS registration (locked, 2026-06-12)

**Position.** Registration differs by role.

- **Contractors.** Must register for CIS **before paying the first subcontractor**. In addition, a **non-construction business that spends £3 million or more a year on construction work** is classed as a **"deemed contractor"** and falls within CIS even though construction is not its trade (the **£3m deemed-contractor threshold**).
- **Subcontractors.** Registration is **optional but practically essential**. An **unregistered** subcontractor suffers the **30% rate**, while a **registered** subcontractor suffers **20%** (§1). The 10-point gap is the everyday reason to register.

- **Practical writing rule for sessions:** state that contractors register **before the first subcontractor payment**, and flag the **£3m deemed-contractor threshold** for non-construction businesses (a frequently missed obligation for property developers, large retailers and similar). For subcontractors, frame registration as **optional in law but essential in practice** because of the 20%-vs-30% gap (§1). Cross-ref §1 (rates), §2 (GPS as the next step up), §4 (contractor returns).

---

## 6. CIS subcontractor verification (locked, 2026-06-12)

**Position.** Before paying a subcontractor, a contractor must **verify** the subcontractor's CIS status with HMRC, which tells the contractor whether to deduct at **0% (GPS), 20% (registered) or 30% (unregistered)** (§1). From 6 April 2026 verification also underpins the **due-diligence duty** that protects a contractor against GPS revocation under the "should have known" standard (§3): re-verifying each subcontractor before payment is one of the three core due-diligence steps.

- **Practical writing rule for sessions:** present verification as the step that **sets the deduction rate** and, post-April-2026, as a **fraud-risk control** that feeds the GPS due-diligence duty (§3). Keep this contractor-audience. Cross-ref §1, §3, §4.

---

## 7. VAT domestic reverse charge for construction (locked, 2026-06-12)

**Position.** The VAT domestic reverse charge (DRC) for construction services has been **in force since 1 March 2021** and **FA 2026 made no changes to it**. Under the DRC, the customer (not the supplier) accounts for the VAT to HMRC. The DRC applies only when **ALL** of the following are true:

1. The supply is a **specified CIS service**.
2. **Both supplier and customer are VAT-registered.**
3. **Both are CIS-registered.**
4. The customer is **not the end user** (they will sell the construction services on).
5. The supply is **standard-rated or reduced-rated** (not zero-rated; new-build housing is zero-rated and therefore outside the DRC).

- **End-user exception.** **Property owners, tenants and developers building for their own use are end users**, so normal VAT rules apply to supplies made to them (the supplier charges VAT in the usual way). This exception is widely misunderstood and frequently conflated with the CIS contractor/subcontractor distinction (SITE_PLAN §12).
- **5% de minimis.** If the reverse charge would apply to **5% or less** of the value of an invoice, **normal VAT rules apply** to the whole invoice (the reverse charge is ignored).
- **Practical writing rule for sessions:** list the **five conditions as a cumulative ALL-of test**, then handle the **end-user exception** and the **5% de minimis** explicitly. Any DRC page must include **worked examples** (a sample invoice showing the reverse-charge wording, and a common end-user scenario), because generic DRC guides are thin (SITE_PLAN §7, #8). Do NOT conflate "end user" with being the main contractor. Cross-ref §1 (CIS-registered status), §5 (CIS registration).

---

## 8. Making Tax Digital for Income Tax (MTD ITSA) and CIS (locked, 2026-06-12)

**Position.** MTD for Income Tax mandates digital record-keeping and quarterly reporting via MTD-compatible software for sole traders and partnerships in Self Assessment, phased by income:

- **From April 2026:** sole traders and partnerships with annual income **over £50,000** must comply.
- **From April 2027:** the threshold drops to **£30,000**.
- **CIS nuance (the point most guides miss).** "Income" for the MTD threshold is **gross income** (turnover before expenses), **not net after CIS deductions**. A subcontractor who receives **£48,000 after 20% deductions on £60,000 gross** is tested on the **£60,000 figure**, so they are **within the £50,000 MTD threshold** and in scope from April 2026, even though their banked receipts look like £48,000. This catches subcontractors out.
- **Year-1 penalty grace (2026/27).** HMRC will **not issue penalty points for late quarterly updates** in the first year. However, **late annual returns and late-payment penalties still apply**. The grace covers the quarterly-update points only, not the year-end return or payment.

- **Practical writing rule for sessions:** use **£50,000 from April 2026, £30,000 from April 2027**. Always lead the CIS-specific angle with **"income is gross, not net after CIS deductions"** and run the **£60,000 gross / £48,000 net** worked example (SITE_PLAN §7, #11). State the **year-1 grace as quarterly-update points only** (late annual return and late payment still penalised). This is **time-sensitive urgency** content: the £50k threshold is live now. Cross-ref §1 (deductions reduce receipts, not the gross test), §audience (primarily sole-trader subcontractors, persona A).

---

## 9. CIS refunds: positioning and the over-deduction mechanic (locked, 2026-06-12)

**Position.** Because CIS deductions (§1) are an **advance** against a subcontractor's eventual tax bill, and because the 20%/30% is taken before any expenses or personal allowance are accounted for, registered subcontractors very commonly **overpay** across the year and are due a **refund**. A **sole-trader** subcontractor reclaims via the **Self Assessment** return after the tax year. A **limited-company** subcontractor (persona B) can reclaim **in real time during the year via the Employer Payment Summary (EPS)**, offsetting CIS suffered against PAYE/CIS liabilities rather than waiting up to 18 months for a Self Assessment refund.

- **House positioning (refund as entry service, not rebate factory).** The CIS refund is the **front-door lead magnet** and the strongest single commercial differentiator (SITE_PLAN §3, §5). It is framed as an **entry service into an ongoing advisory relationship**, NOT as a one-shot tax-rebate-factory claim. Trade Tax Specialists is **not a rebate factory** (the RIFT model): we do the refund as the way in, then keep the client compliant for the long term. Pages must NOT chase pure rebate-factory terms (`CIS refund claim no accountant needed`, `DIY CIS refund`) (SITE_PLAN §10).
- **Practical writing rule for sessions:** explain that over-deduction arises because CIS is taken on labour (§1) before expenses and allowances, so most registered subcontractors are owed money. Distinguish the **sole-trader (Self Assessment, after year-end)** route from the **limited-company (EPS, real-time)** route. Always frame the refund as the **entry service to the advisory relationship**, never as a standalone factory claim. Use market refund figures only with the "for content, not guaranteed" caveat (§13). Cross-ref §1, §5, §13.

---

## 10. Public sector CIS exemption, Regulation 23A (locked, 2026-06-12)

**Position.** **New from April 2026:** payments to **local authorities and public sector bodies** are **fully exempt from CIS** under **new Regulation 23A**. Contractors working on public sector contracts no longer apply CIS deductions to those payments and **do not include them in their monthly CIS300 returns** (§4).

- **Practical writing rule for sessions:** state the **Reg 23A** public sector exemption as **new from April 2026**, covering **local authorities and public sector bodies**, with the twin effect: **no CIS deduction** and **excluded from CIS300 returns**. Most relevant to the contractor audience (persona C) and to subcontractors on public works. Cross-ref §4 (returns), §1 (deductions).

---

## 11. FA 2026 estate-wide standard rates (locked, 2026-06-12)

**Position.** These are the estate-wide tax figures used across all Trade Tax Specialists content. They are the same as the other estate sites and are FA 2026-verified.

- **Dividend tax (from 6 April 2026, FA 2026 s.4):** basic **10.75%**, higher **35.75%**, additional **39.35%**. Dividend allowance **£500** (unchanged). Relevant to limited-company directors in construction (persona B) extracting profit.
- **AMAP mileage (from 6 April 2026):** **55p per mile** for the first 10,000 business miles, **25p** thereafter (the first-10,000 rate rose from 45p; 25p is unchanged). Use on every expenses-related page (vans and cars are central to construction trades).
- **Employer NIC (from April 2025):** **15%** on earnings above **£5,000 a year** (was 13.8% above £9,100). Carried into 2026/27.
- **Corporation tax:** **25% main rate** (profits over £250,000), **19% small profits rate** (under £50,000), with **marginal relief** between £50,000 and £250,000.

- **Practical writing rule for sessions:** **never quote a dividend rate without the 2026/27 tag**; use **10.75% / 35.75% / 39.35%** and **block any page quoting the old 8.75% / 33.75%** (SITE_PLAN §12). Use **AMAP 55p/25p from 6 April 2026** and block any page using 45p. Use **employer NIC 15% above £5,000** (not 13.8% / £9,100). Use **CT 25% / 19% with marginal relief**. Cross-ref §9 (limited-company refunds), §audience (persona B).

### 11a. Addendum: supplementary 2026/27 figures (verified 2026-06-12, wave-1 fact audit)

Figures the original §8 plan did not carry but which wave-1 pages needed. Each was web-verified against GOV.UK/HMRC guidance by the wave-1 Opus fact auditor on 2026-06-12. Use these on future pages; re-verify at each Budget.

- **Personal allowance:** £12,570 (frozen). **Income tax:** 20% / 40% / 45%; basic-rate band to **£50,270**.
- **Class 4 NIC (self-employed):** **6%** between £12,570 and £50,270, **2%** above. **Never 9%** (pre-2024 rate, blocked).
- **Class 2 NIC:** £0 payable above the £7,105 small profits threshold (treated as paid); voluntary below.
- **Employee Class 1 NIC:** 8% between £12,570 and £50,270, 2% above.
- **SSP:** **£123.25/week** (from 6 April 2026), max 28 weeks. Block the 2024/25 £116.75 figure.
- **MTD ITSA quarterly update deadlines:** the **7th** (7 Aug / 7 Nov / 7 Feb / 7 May). The 5th dates are period ends, not deadlines.
- **AMAP other vehicles:** motorcycle 24p, bicycle 20p (unchanged by FA 2026).
- **Use-of-home flat rates:** £10 (25-50 hrs/mo) / £18 (51-100) / £26 (101+), max £312/yr.
- **AIA:** £1m, 100% first-year deduction. **Auto-enrolment:** 8% total (5% employee / 3% employer).
- **HMRC CIS helpline:** 0300 200 3210 (Mon-Fri 8am-6pm). **EPS/CIS company repayment target:** 25 working days. **SA online repayment:** typically 5-10 working days.
- **SA refund lookback:** 4 prior tax years. **SA late-filing penalties:** £100 immediate, escalating at 3/6/12 months (distinct from the CIS300 ladder in §4 — never merge them).

---

## 12. House editorial positions (locked, 2026-06-12)

The firm's locked positions on brand, scope and what NOT to chase. Every page must reflect the stance below; do not soften or contradict.

- **12.A Faceless brand.** Trade Tax Specialists is a **faceless brand**: **no named partners**, no named-expert quotes, no personal bylines presented as the authority. Authority is built off-site (data, tools, citations), not through a named individual. Because the brand is faceless, the firm **never self-ranks in "best of" lists** ("best CIS accountants", "top 10 CIS accountants"). We own the **how-to-choose** and **cost/fee** informational variants instead (SITE_PLAN §10).
- **12.B Refund as entry service, not a rebate factory.** The CIS refund is the **entry service** into an ongoing advisory relationship, **not** a one-shot rebate-factory product (the RIFT positioning). We do the refund as the front door; the LTV is the advisory relationship (§9, SITE_PLAN §3). Do NOT chase pure rebate-factory / DIY terms.
- **12.C UK-only geo.** The site is **UK only**. No CIS Ireland, no CIS India, no other jurisdiction (SITE_PLAN §10).
- **12.D Construction-only, no off-mission trades.** Every page is **construction-only**. Do **NOT** build **/for/architects** or **/for/quantity-surveyors**: architects and quantity surveyors provide professional services that are typically **outside CIS**, so the CIS angle does not hold. The civil/structural slot is filled by **/for/civil-engineers** (heavy civil and structural work is CIS-applicable) (SITE_PLAN §10).
- **12.E The don't-chase list (SITE_PLAN §10).** Do not target: **"best CIS accountant" / "top 10" listicles** (faceless brand, §12.A); **"CIS accountant jobs" / "how to become a CIS accountant"** (career intent, off-mission); **"CIS Ireland" / "CIS India"** (out of geo, §12.C); **pure rebate-factory terms** ("CIS refund claim no accountant needed", "DIY CIS refund") (§12.B); **generic SME / sole-trader terms not related to construction**; **architects and quantity surveyors** (§12.D).
- **Practical writing rule for sessions:** when a page touches any of these, state the stance plainly and keep the brand discipline (faceless, no self-ranking, refund-as-entry-service, UK-only, construction-only). Do not draft content that ranks the firm in a "best of" list or that targets a don't-chase term.

---

## 13. Market data (for content, not guaranteed) (locked, 2026-06-12)

**Position.** The following market figures may be used **in content** to size the opportunity and frame the refund hook, but they are **marketing-sourced or third-party-reported and are NOT guaranteed** for any individual client. Always present them as typical/illustrative, never as a promise.

- **Average CIS subcontractor annual tax refund: £2,000 to £3,000.** (Dearne Accountancy reports a £1,840 average first-year client refund; RIFT Refunds uses this figure range in marketing.) The refund hook on /cis-refund and in wave-1 cluster #6 may use the **~£2,000 average** framing, caveated.
- **HMRC-registered CIS subcontractors: 1.4 million or more.** Use to size the addressable market.
- **Monthly fee benchmarks:** sole-trader CIS-return-only **£20 to £50/month**; sole-trader full service **£80 to £150/month**; limited-company full service **£150 to £250+/month**.

- **Practical writing rule for sessions:** present every figure here as **typical / illustrative, not guaranteed**. Attribute the refund average appropriately and never state a specific client "will" get £X back. These are content-sizing figures, not promises. Cross-ref §9 (refund positioning), §audience (fee tiers map to personas A and B). Re-check the refund-average sourcing periodically (Watch items).

---

## Watch items / re-verify before citing

Time-sensitive or externally sourced items that a writer or the orchestrator must re-confirm before citing as settled:

- **April 2026 GPS anti-fraud provisions (§3).** These sit in **Finance Bill 2026** with stated effect from **6 April 2026** (immediate revocation on "knew or should have known", 5-year reapplication ban, director liability ss.62A/62B, due-diligence duty). Confirm the Bill has received **Royal Assent and that ss.62A/62B and the revocation/ban provisions are enacted in the final Act** before describing them as settled law. Until then, frame as "from 6 April 2026 under Finance Bill 2026" rather than as long-standing rules.
- **Nil returns mandatory from April 2026 (§4).** Reinstated from **6 April 2026** (removed 2015). Confirm commencement before publishing as a current obligation; keep the penalty ladder accurate to the latest HMRC figures.
- **Public sector exemption, Regulation 23A (§10).** New from April 2026. Confirm the regulation is in force and the wording of the covered bodies before citing.
- **MTD ITSA thresholds (§8).** £50,000 from April 2026 is live; £30,000 from April 2027 and the year-1 penalty grace should be re-checked against current HMRC guidance, as commencement and grace terms have shifted historically.
- **Market refund averages and fee benchmarks (§13).** **Marketing-sourced / third-party-reported, not guaranteed.** Re-confirm the source figures (Dearne £1,840; RIFT range; 1.4m registered subs) before relying on them in new content, and always caveat.
- **Estate-wide FA 2026 rates (§11).** Dividend 10.75% / 35.75% / 39.35%, AMAP 55p/25p, employer NIC 15% above £5,000, CT 25% / 19% with marginal relief. These match the estate ground-truth records; if a future Budget moves any of them, update §11 and re-sweep citing pages.

---

## Source index

All facts in this document derive from `docs/construction-cis/SITE_PLAN.md` §8 (HP lock, FA 2026-verified), with editorial positions drawn from SITE_PLAN §2 (audience), §3 (positioning), §10 (what NOT to chase) and §12 (SERP surprises). No figure appears here that is not in SITE_PLAN §8. Reference format mirrored from `docs/contractors-ir35/house_positions.md`. Sections with no SITE_PLAN §8 equivalent (for example the contractors-ir35 IR35/MSC/BADR/pensions sections) are intentionally omitted rather than fabricated.
