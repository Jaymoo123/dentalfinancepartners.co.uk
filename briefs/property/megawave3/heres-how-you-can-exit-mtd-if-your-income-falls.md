---
slug: heres-how-you-can-exit-mtd-if-your-income-falls
category: making-tax-digital-mtd
intent: A landlord who is in (or about to enter) MTD ITSA and whose qualifying property income has dropped wants to know the operational route OUT of MTD — specifically the three-consecutive-year income exemption under regulations 21-22 of the Income Tax (Digital Requirements) Regulations 2021 (SI 2021/1076), how the notification mechanic works, what happens to the current tax year's quarterly cycle, and how this differs from the digital-exclusion exemption (regulation 20) and the voluntary opt-out route. Property context: the page is written for a landlord whose rental income has fallen below the relevant £50,000 / £30,000 / £20,000 mandate threshold for a sustained period.
---

# Here's How You Can Exit MTD if Your Income Falls: The Three-Year Income Exemption for Landlords

## Statutory anchor

- **Primary — exit mechanic:** Income Tax (Digital Requirements) Regulations 2021 (SI 2021/1076) **regulation 22** — "Income exemption: persons to whom the digital requirements have applied for three tax years". Verified live 2026-05-27 at `https://www.legislation.gov.uk/uksi/2021/1076/contents/made` — Part 8 ("Other exemptions") regulations 21 (general income exemption) and 22 (three-tax-year exit exemption) are the operative sections. The regulations sit under the parent-Act enabling power at **TMA 1970 Schedule A1** (digital-requirements framework) inserted by **Finance (No.2) Act 2017 Schedule 14**.
- **Primary — re-entry / threshold test:** SI 2021/1076 regulation 4 ("Digital start date") + regulation 21 ("Income exemption"). Where a previously-exempt person crosses the qualifying-income threshold in a subsequent tax year, the digital start date re-engages.
- **Supporting — sister exemption:** SI 2021/1076 regulation 20 — "Digital exclusion exemption" (the parallel route for taxpayers who cannot use digital tools by reason of age, disability, remoteness, religion, or other reasonable circumstance — a permanent exemption, distinct from the three-year income-drop exit). Sessions must NOT conflate the two.
- **House position reference:** §19.5 (Exit / income-drop rule — Wave 3 lock) is the primary anchor; §19 (MTD ITSA — Wave 3 extension) for the headline qualifying-income mechanics; §3 (MTD for ITSA applicability) for the threshold schedule (£50,000 from 6 April 2026, £30,000 from 6 April 2027, £20,000 from 6 April 2028). No NEW HP LOCK NEEDED — §19.5 covers the framework; this page extracts and operationalises that lock for a single search-intent.

## Framing differentiator (anti-templating, anti-cannibalisation)

This page is the **operational exit-route** guide for a landlord whose qualifying income has fallen below the mandate threshold. Sibling MW3-A picks in the MTD cluster cover different intents:

- **A6 (`government-to-implement-mtd-for-it-with-lower-threshold`)** — historical / news framing of the £20,000 phase-in.
- **A11 (`how-making-tax-digital-affects-limited-companies`)** — MTD applicability to LtdCo landlords (which falls outside MTD ITSA entirely under §19.3).
- **A16 (`making-tax-digital-major-self-assessment-overhaul-ahead`)** — broader MTD-ITSA overview / overhaul framing.
- **A18 (`what-is-qualifying-income-for-mtd`)** — qualifying-income test definition.
- **A19 (`mtd-made-simple-for-landlords-with-jointly-owned-properties`)** — joint-property test (§19.4).
- **A20 (`mtd-penalties-exemptions-and-what-to-watch`)** — penalty regime + exemption catalogue overview.

The closest cannibalisation risk is **A20** (exemptions catalogue). This page differentiates by going **deep on a single exemption** — the regulation-22 three-tax-year income-drop exit — including the notification mechanic, the current-year quarterly-cycle question, the re-engagement risk if income rises again, and how a landlord interaction with HMRC plays out in practice. A20 sweeps the catalogue (digital-exclusion, age, religious, three-year-income); this page lives inside the income-drop limb only. Cross-link reciprocally.

The angle this page takes: a landlord operating in the £50k / £30k / £20k MTD-mandate cohort whose income has subsequently dropped (a sale of one property, void periods, a tenancy break, retirement-driven portfolio scale-down, or a change in joint-ownership share under Form 17 §24.2) is on the hook for the quarterly digital cycle indefinitely **until they actively notify HMRC under reg 22**. The exit is **not automatic**; sessions must not write "you exit when income drops" — that is wrong. The exit is **claimed**, requires **three consecutive tax years below threshold**, and operates by notification to HMRC.

## Key questions this page must answer

1. What is the statutory hook for exiting MTD ITSA (SI 2021/1076 regulation 22) and how does it relate to the headline regulation-4 digital-start-date framework?
2. What does "three consecutive tax years below threshold" mean operationally — is it three full UK tax years, can a partial year count, and what happens if income spikes briefly mid-period?
3. How is the income test for the exit applied — is it the same qualifying-income test under regulation 21 / §19.2 (gross self-employment turnover + gross property rental income, aggregated, before deductions)?
4. What is the notification mechanic — does the landlord notify HMRC of the income drop, does HMRC notify the landlord of exit, or does it operate automatically?
5. What happens to the current tax year's quarterly cycle when exit is achieved — does the landlord still file the remaining quarterly updates for the year in which they exit, or does exit trigger immediate cessation?
6. How does the three-year exit interact with the **digital-exclusion exemption (regulation 20)** — can a landlord switch between the two, and what is the appropriate route for a landlord whose income has dropped AND who has a digital-access difficulty?
7. What is the re-entry mechanic if income rises again — does the landlord re-engage with MTD at the next tax year's digital start date, or is there a transition period?
8. How does the exit interact with the **joint-property owner regime (§19.4)** — if a couple both fall below threshold, does each spouse exit independently or as a couple?
9. What is the operational guidance for a landlord mid-cycle (Year 1 of the three-year test) — should they continue full MTD compliance, or is there a "preparing to exit" status?
10. What is the boundary between **MTD ITSA exit (reg 22)** and **self-assessment cessation entirely** — a landlord exiting MTD remains on the regular self-assessment cycle unless they also cease to have a tax liability.

## Manager pre-decisions placeholder

- **Category routing:** `making-tax-digital-mtd` (matches live route at `Property/web/src/app/blog/making-tax-digital-mtd/`). Confirmed by the page's natural MTD-cluster home; not `landlord-tax-essentials` despite the operational landlord angle. Manager to confirm or override.
- **Worked-example numbers:** the £50,000 / £30,000 / £20,000 thresholds are §19.1-locked rates; the **regulation-22 three-year qualifying-income figure is a moving target** based on whichever phase-threshold applies to the landlord (a landlord mandated at £50k in April 2026 tests against £50k for the three-year exit window; a landlord later mandated at £30k tests against £30k). Sessions must NOT write "exit at £30k" without the cohort-context qualifier. §16.27 rate-by-reference + §16.35 statute-verification at write time.
- **Cross-link targets:**
  - Within MW3 Bucket A: `what-is-qualifying-income-for-mtd` (A18 — the income-test mechanics this exit cites), `mtd-penalties-exemptions-and-what-to-watch` (A20 — broader exemption catalogue), `how-making-tax-digital-affects-limited-companies` (A11 — sibling MTD pick covering the LtdCo carve-out which is a different exemption route entirely), `mtd-made-simple-for-landlords-with-jointly-owned-properties` (A19 — joint-property interactions with exit).
  - To existing pages: any pillar / overview pages on MTD compliance; agent-services-account (ASA) mechanics under §19.10 where the landlord's accountant is the notification channel.
  - Forward: any future page covering MTD-VAT cessation comparison (cross-stream framing — VAT cessation works differently from ITSA exit).

## Stage 2 research target list

- Competitor pages to fetch (Stage 2 sources fresh via Google Search / Bing Search at write time; Wave 8 + Wave 9 5/5 dead-rate pattern recurs — do NOT trust Stage 1 URL guesses; verify with httpx + BeautifulSoup before citing): 2-4 candidates from accountancy practice sites + MTD-software-vendor knowledge bases covering "exit MTD ITSA" / "income exemption" / "three year MTD exit".
- HMRC manuals to cite: BIM75000+ where rental-income classification is touched; the HMRC published "Get help with Making Tax Digital for Income Tax" guidance at gov.uk (verify live URL at Stage 2; recurring HMRC URL rot per Wave 9 audit); the published "Sign up for Making Tax Digital for Income Tax" notification page (mirror page for the **exit** flow expected from late 2026 once HMRC operational portal goes live).
- Legislation anchors: SI 2021/1076 regs 4, 20, 21, 22 (already verified above); TMA 1970 Sch A1 (parent enabling power); FA (No.2) 2017 Sch 14 (Sch A1 inserter). Cross-reference §19.1-§19.5 of house_positions.md.
- Case-law to ground: limited — the regs are too recent for substantive case law on regulation 22 specifically. Sessions should NOT manufacture authorities; the legal architecture is regulatory-only at this stage.

## Universal rules + workflow stubs (Stage 2 fills)

[Stage 2 populates from NETNEW_PROGRAM §4: voice + style (no em-dashes, no Tailwind in markdown, FAQ count match, 6-check quality bar) and the 19-step workflow.]

## Work log (Stage 2 + RUN session populate)

[Stage 2 + RUN session record their work here.]

---

## Stage 1 seed work log

- **Stage 1 author:** MW3 Stage 1 Sub-Agent A (batch M3-A-B2) on 2026-05-27.
- **Cluster anchor:** MTD for ITSA — the three-tax-year income-drop exit limb specifically. Differentiation framing: operational exit-route depth (notification mechanic, current-year cycle question, re-entry mechanic, joint-owner interaction) inside the regulation-22 limb only; A20 sibling sweeps the full exemption catalogue.
- **HP-lock alignment:** §19.5 (Exit / income-drop rule) primary anchor — this page operationalises that lock for a single search intent. §19.1 (mandate timeline + threshold schedule) secondary. §19.2 (qualifying-income definition) tertiary. §19.4 (joint-property owners — exit interaction). No NEW HP LOCK NEEDED.
- **§16.35 per-write verification note:** SI 2021/1076 regs 20-22 + reg 4 verified live 2026-05-27 against legislation.gov.uk. Threshold schedule (£50k/£30k/£20k) per §19.1 already-verified Wave 3 lock. The "three consecutive tax years" framing is verbatim from reg 22 heading; reg 22 also requires that the digital requirements HAVE APPLIED for three tax years (i.e. you must have been IN for three years before the exit window opens — sessions should not write "three years below threshold" without the "after MTD has applied" precondition).
- **Cannibalisation reasoning:** Closest sibling is A20 (penalties + exemptions catalogue overview). A20 is breadth; A7 is depth-on-one-limb. Both pages co-exist as distinct intents — searcher landing on "exit MTD income drops" wants the operational mechanics; searcher landing on "MTD penalties exemptions" wants the catalogue. Reciprocal cross-link required. No CANNIBAL flag.
- **Drift catches to flag for Stage 1b:** none new this seed. The §19.7 penalty regime correction (15/30/31 day-triggers + 3%/3%/10% percentages) is upstream-of-this-page and does not need re-flagging; sessions must use the corrected figures if they touch penalty content for a landlord who has missed a quarterly cycle while preparing to claim exit.
