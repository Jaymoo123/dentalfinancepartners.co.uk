---
slug: government-to-implement-mtd-for-it-with-lower-threshold
category: making-tax-digital-mtd
intent: A landlord searching this query is reacting to the headline announcement that HMRC is bringing more taxpayers into MTD ITSA via the phase-3 £20,000 threshold from 6 April 2028 (the lowest of the three confirmed thresholds at §19.1 lock). The searcher wants the operational consequences — when phase 3 bites, who falls into scope, the qualifying-income aggregation rules (§19.2: gross self-employment + gross property rental, before deductions; the £52,000-gross / £12,000-net counter-intuitive trap), the joint-property treatment under §19.4 (each owner tests share-of-gross, not property-total), the software readiness path, the agent ASA flow under §19.10, the late-payment 3%/3%/10% accelerated schedule under §19.7, the £20,000-cohort population estimate, and the planning window from now to 6 April 2028 for affected landlords.
---

# Government to Implement MTD for IT With Lower £20,000 Threshold: What the Phase-3 Mandate Means for UK Landlords

## Statutory anchor

- **Primary — MTD ITSA mandate framework:** Finance (No.2) Act 2017 Schedule A1 (digital reporting + record-keeping powers); Income Tax (Digital Requirements) Regulations 2021 (SI 2021/1076 as amended) — operative regulations setting threshold, scope, quarterly cycle, EoPS, final declaration. The three-phase mandate timeline is house-position-locked at §19.1 (verified 2026-05-22): 6 April 2026 (qualifying income > £50,000); 6 April 2027 (> £30,000); 6 April 2028 (> £20,000). The £20,000 lower threshold is the phase 3 figure announced at Spring Statement 2025 and confirmed at Autumn Statement 2025.
- **Primary — qualifying-income definition:** Income Tax (Digital Requirements) Regulations 2021 plus HMRC published guidance + §19.2 lock. Qualifying income = gross self-employment turnover **+** gross property rental income, **before deductions**. The two streams are aggregated for the threshold test. House-position-locked at §19.2 verified 2026-05-22.
- **Primary — joint-property test:** §19.4 lock — each owner tests against their **share of gross**, not the property's total gross. Default 50/50 split for spouses absent Form 17 election; Form 17 elections (TCGA 1992 + ITA 2007 architecture) can bring one spouse into scope earlier than the other where the elected income split is unequal.
- **Primary — penalty regime applicable to MTD ITSA:** Schedule 55 FA 2009 (late-filing, points-based for quarterly updates, threshold 4 points, £200 at threshold); Schedule 56 FA 2009 (late-payment) AS AMENDED by Spring Statement 2025 doubling — the operative numbers for MTD ITSA from 6 April 2026 are **3% of unpaid tax from day 15; further 3% from day 30; 10% per annum from day 31**. House-position-locked at §19.7 verified 2026-05-22 against gov.uk Spring Statement 2025 HTML document.
- **Primary — exit / income-drop:** SI 2021/1076 + §19.5 lock. A taxpayer in MTD ITSA can exit if qualifying income falls below the threshold for **three consecutive tax years**.
- **Supporting — record retention overlay:** TMA 1970 s.12B (5-year-from-31-January floor for income tax records); §19.16 + §27.7 lock. MTD-recognised software must support digital records.
- **Supporting — agent representation:** §19.10 lock (Agent Services Account mandatory; 64-8 OSA route does not work for MTD ITSA from 6 April 2026; ASA authorisations do not transfer between agents).
- **House position reference:** §19 (MTD for ITSA — primary anchor — all sub-locks 19.1 through 19.17 apply); §3 (MTD for ITSA headline schedule — older lock superseded operationally by §19); §27 (penalties + record retention framework — general); §35 (payroll mechanics — for property-business employers who are simultaneously MTD ITSA filers). No NEW HP LOCK NEEDED.

## Framing differentiator (anti-templating, anti-cannibalisation)

This page is the **phase 3 £20,000 threshold-specific announcement page** — what the lower threshold means, who newly falls into scope, when it bites (6 April 2028), and the planning runway. The seven sibling MTD picks in this same wave bucket A address: `accidental-landlords-mtd-do-you-also-need-to-file-digitally` (A1 tracker — though picks.yaml puts A1 as PAYE-penalties this batch; tracker drift catch already noted), `heres-how-you-can-exit-mtd-if-your-income-falls` (A7 — exit rule under §19.5), `how-making-tax-digital-affects-limited-companies` (A11 — Ltd Cos are OUTSIDE MTD ITSA per §19.3, this page is the negative answer for LtdCos), `making-tax-digital-major-self-assessment-overhaul-ahead` (A16 — top-line introduction), `mtd-explained-for-residential-landlords-what-changes-and-when` (A18 in tracker — descriptive overview for residential landlords), `mtd-made-simple-for-landlords-with-jointly-owned-properties` (A19 — §19.4 joint-property mechanics), `mtd-penalties-exemptions-and-what-to-watch` (A20 — §19.7 penalty regime).

The angle this page takes: distinct from the seven siblings by being **the phase-3 announcement landing page** — written for the £20,000-£50,000 mid-tier landlord who has been told they are NOT in phase 1 (>£50,000 from 2026) or phase 2 (>£30,000 from 2027) but IS in phase 3 (>£20,000 from 2028). The phase-3 cohort is the largest of the three by population — HMRC published impact assessments put the £20,000 cohort at roughly 700,000-800,000 newly-mandated taxpayers, dwarfing the phase-1 and phase-2 cohorts combined. This page is the planning-runway page for that population: what the £20,000 threshold actually catches (gross-test trap, joint-property arithmetic, foreign-property aggregation under §19.11), the operational software-readiness path, and the do-now actions for a landlord identifying as in-scope at phase 3.

## Key questions this page must answer

1. What is the phase-3 £20,000 threshold — when does it bite (from 6 April 2028 for the 2028/29 tax year onwards), and which return identifies whether a taxpayer is in scope (the 2026/27 SA return per §19.1 lock)?
2. What is "qualifying income" under §19.2 — gross self-employment turnover + gross property rental income, BEFORE deductions; the gross-test trap that catches landlords with high gross / low net (e.g. £22,000 gross rental, £15,000 mortgage interest + agent fees + repairs, £7,000 net profit — IN SCOPE at phase 3 despite tiny profit)?
3. Who is excluded from MTD ITSA — limited companies (separate CT regime per §19.3), partnerships (deferred to a date TBC), trustees (SA900 trust return continues), persons below threshold (voluntary opt-in available)?
4. How does the joint-property test work for phase 3 — each owner tests their share-of-gross under §19.4; spouses with £40,000 jointly-owned gross rental income (default 50/50) test £20,000 each, both EXACTLY AT the phase-3 threshold; Form 17 election that splits 75/25 brings the 75% spouse to £30,000 in scope at phase 2, the 25% spouse to £10,000 below phase 3?
5. What software does an in-scope phase-3 filer need — HMRC-recognised compatible software (list at gov.uk's "Find software" page, do not hard-code product names); spreadsheet-plus-bridging acceptable with digital-link discipline under §19.14?
6. What does the quarterly filing cycle look like — five obligations per tax year per business stream: four quarterly updates (deadlines 7 August / 7 November / 7 February / 7 May for UK-tax-year quarters; calendar-quarter election available); EoPS + final declaration both due 31 January following year-end?
7. What does the penalty regime look like for phase-3 filers — Schedule 55 FA 2009 points-based late-filing (4-point threshold, £200 at threshold); Schedule 56 FA 2009 accelerated 3% at day 15 / 3% at day 30 / 10% per annum at day 31 per §19.7 Spring Statement 2025 verified figures?
8. What is the planning runway for a landlord who identifies as in phase 3 — choose software now (Q4 2026 - Q2 2027); pilot with the voluntary-opt-in route from 6 April 2026 or 6 April 2027 to build operational fluency before mandate; appoint accountant via ASA flow under §19.10; reconcile joint-property arithmetic + Form 17 status with spouse; review whether a Ltd Co incorporation route (under §11 + §21 architecture) shifts the operator out of MTD ITSA entirely (Ltd Cos are outside)?
9. What is the cross-stream qualifying-income aggregation effect — a landlord with £15,000 gross rental + £8,000 gross self-employment side-income passes the £20,000 threshold (combined £23,000) and is in scope at phase 3; a landlord with £18,000 gross rental + zero other qualifying income is OUT of phase 3 at the threshold cliff?
10. What is the exit path under §19.5 — if qualifying income falls below £20,000 for three consecutive tax years post-mandate, the taxpayer can notify HMRC and exit; re-entry is automatic if income rises above threshold again?

## Manager pre-decisions placeholder

- **Category routing:** `making-tax-digital-mtd` (matches live route at `Property/web/src/app/blog/making-tax-digital-mtd/`). Phase-3 announcement is squarely MTD pillar. Manager to confirm.
- **Worked-example numbers:** threshold figures (£50,000 / £30,000 / £20,000) anchored to §19.1 lock; penalty figures (3% / 3% / 10% on accelerated 15/30/31 schedule for MTD ITSA) anchored to §19.7 lock. RUN session verifies live at write time.
- **Cross-link targets:**
  - Within MW3 Bucket A: `heres-how-you-can-exit-mtd-if-your-income-falls` (A7 — exit-rule sibling), `how-making-tax-digital-affects-limited-companies` (A11 — Ltd Co boundary), `making-tax-digital-major-self-assessment-overhaul-ahead` (A16), `mtd-explained-for-residential-landlords-what-changes-and-when` (A18 tracker), `mtd-made-simple-for-landlords-with-jointly-owned-properties` (A19), `mtd-penalties-exemptions-and-what-to-watch` (A20), `what-is-qualifying-income-for-mtd` (picks.yaml A18 — gross-test deep-dive).
  - To existing pages: `mtd-quarterly-deadlines-2026-2027-landlords` (existing — quarterly deadline reference), `mtd-rental-income-threshold-exemptions` (existing — threshold + exemptions deep-dive), `best-mtd-software-landlords-2026` (existing — software-choice).

## Stage 2 research target list

- Competitor pages to fetch (Stage 2 sources fresh at write time): 2-4 candidates from accountancy practice + MTD-software vendor announcement pages on the phase-3 £20,000 threshold. Search queries: "MTD ITSA £20,000 threshold 2028 phase 3", "Spring Statement 2025 MTD lower threshold landlords".
- HMRC + gov.uk anchors: gov.uk/government/publications/spring-statement-2025-document/spring-statement-2025-html (Spring Statement 2025 verified at §19.7 lock); gov.uk/guidance/sign-up-as-an-individual-for-making-tax-digital-for-income-tax (voluntary opt-in route); gov.uk/government/publications/income-tax-extension-of-making-tax-digital (HMRC impact assessment confirming the £20,000 cohort estimate); gov.uk/find-software (software list — verify URL at write time).
- Legislation anchors RUN session must verify at write time per §16.35: F(No.2)A 2017 Sch A1; SI 2021/1076 as amended; Sch 55 FA 2009 (late-filing points-based for MTD); Sch 56 FA 2009 (late-payment accelerated for MTD).
- Case-law to ground: typically none on MTD threshold mechanics directly. Reasonable-excuse defence case law (Perrin v HMRC [2018] UKUT 156) applies on appeal.

## Universal rules + workflow stubs (Stage 2 fills)

[Stage 2 populates from NETNEW_PROGRAM §4.]

## Work log (Stage 2 + RUN session populate)

[Stage 2 + RUN session record their work here.]

---

## Stage 1 seed work log

- **Stage 1 author:** MW3 Stage 1 Sub-Agent A (batch M3-A-B1) on 2026-05-27.
- **Cluster anchor:** MTD for ITSA — phase-3 £20,000 threshold landing-page framing. Differentiation framing: written for the £20,000-£50,000 mid-tier landlord cohort entering scope from 6 April 2028 (the largest of the three phase cohorts), distinct from seven sibling MTD pages that cover top-line / Ltd Co boundary / joint-property / exit / penalty / qualifying-income / residential-landlord descriptive frames.
- **HP-lock alignment:** §19 (MTD for ITSA — full Wave 3 + Wave 4 lock applies); §19.1 (phased threshold timeline); §19.2 (qualifying income aggregation); §19.4 (joint-property mechanics); §19.5 (exit rule); §19.7 (penalty regime — Spring Statement 2025 accelerated schedule); §19.10 (ASA); §27 (general penalty + retention framework). No NEW HP LOCK NEEDED.
- **§16.35 per-write verification note:** Threshold + penalty figures anchored to §19 locks verified 2026-05-22 against gov.uk Spring Statement 2025 HTML document. RUN session WebFetches Spring Statement 2025 + SI 2021/1076 current-as-amended text at write time per §16.35.
- **Cannibalisation reasoning:** seven sibling MTD picks in this wave bucket A; this page differentiates by being the phase-3-announcement landing-page (the £20,000 lower threshold news angle), assuming the reader knows phase 1 + 2 timing from the descriptive siblings. No CANNIBAL flag — coherent pillar architecture.
