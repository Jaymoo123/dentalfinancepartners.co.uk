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

## Stage 2 research target list — extended

### Authority URLs (Stage 2 surfaces; RUN session WebFetches at write time per §16.35)

- **`https://www.legislation.gov.uk/ukpga/2017/32/schedule/A1`** — F(No.2)A 2017 Sch A1 (MTD digital reporting + record-keeping powers). Primary parent statute.
- **`https://www.legislation.gov.uk/uksi/2021/1076`** — SI 2021/1076 Income Tax (Digital Requirements) Regs (as amended). Operative regulations; threshold + scope + quarterly cycle + EoPS + final declaration.
- **`https://www.gov.uk/government/publications/spring-statement-2025-document/spring-statement-2025-html`** — Spring Statement 2025 HTML document (per §19.7 lock verification 2026-05-22). Confirms phase 3 £20,000 threshold + accelerated 3%/3%/10% Sch 56 schedule for MTD ITSA.
- **`https://www.legislation.gov.uk/ukpga/2009/10/schedule/55`** — Sch 55 FA 2009 (late-filing — points-based for MTD per §19.7).
- **`https://www.legislation.gov.uk/ukpga/2009/10/schedule/56`** — Sch 56 FA 2009 (late-payment — accelerated 3%/3%/10% from 6 April 2026 for MTD ITSA filers).
- **`https://www.gov.uk/guidance/sign-up-as-an-individual-for-making-tax-digital-for-income-tax`** — gov.uk voluntary opt-in route.
- **`https://www.gov.uk/government/publications/income-tax-extension-of-making-tax-digital`** — HMRC impact assessment confirming the £20k cohort population estimate (verify URL at write time).
- **`https://www.gov.uk/find-software/making-tax-digital-for-income-tax`** — gov.uk MTD-recognised software list (verify URL).
- **`https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim70010`** — BIM70010+ (qualifying-income computation under MTD ITSA). RUN reads child pages directly.

### Competitor URLs (session-side WebSearch at write time)

`<!-- competitor section: session-side WebSearch at write time per §16.31. Recommended search queries: "MTD ITSA £20,000 threshold 2028 phase 3 landlord", "Spring Statement 2025 MTD lower threshold", "qualifying income MTD £20k phase 3 announcement". Target: 3-5 firm-side announcement pages from accountancy practices + MTD-software vendor blogs. -->`

### Case-law

- Typically none on MTD threshold mechanics directly (the threshold is statutory and unlitigated at the time of writing).
- **Perrin v HMRC [2018] UKUT 156 (TCC)** — reasonable excuse four-stage test applies on appeal of any MTD ITSA late-filing or late-payment penalty.

## Worked-example data (RUN session uses these as canvas)

### Example 1 — Bridge population landlord at £22k gross rental (in scope at phase 3, NOT phase 2)

- **Mr Crowborough** owns 2 BTL flats; gross rental income £22,000/year; mortgage interest + agent fees + repairs leave £8,000 net profit. No other qualifying income.
- **Threshold testing:** qualifying income under §19.2 is the GROSS figure = £22,000. Below phase 1 (>£50k) — NOT in scope from 2026/27. Below phase 2 (>£30k) — NOT in scope from 2027/28. ABOVE phase 3 (>£20k) — IN SCOPE from 6 April 2028 (the 2028/29 tax year onwards).
- **Determining return:** the 2026/27 SA return (filed by 31 January 2028) is the determining return per §19.1 lock. Mr Crowborough must check his 2026/27 qualifying income against £20k; if above, phase 3 mandate bites for 2028/29.
- **Planning runway from now to 6 April 2028:**
  - Q4 2026 - Q2 2027: choose MTD-recognised software (HMRC-approved list at gov.uk/find-software).
  - Q2-Q3 2027: optionally opt in voluntarily for 2027/28 to pilot operational workflow before mandate.
  - Q3 2027: appoint accountant via ASA flow under §19.10 if needed (legacy 64-8 OSA route does NOT work for MTD ITSA).
  - 6 April 2028: mandated. Four quarterly updates per business stream (rental + any self-employment) + EoPS + final declaration.

### Example 2 — Gross-test trap: high gross / low net pulls landlord into scope

- **Mrs Tunbridge** owns 1 BTL property; gross rental £22,000/year. Mortgage interest £14,000 + agent fees £1,800 + repairs £2,200 + insurance £600 = total deductible costs £18,600. Net profit only £3,400.
- **Threshold testing:** qualifying income is the GROSS figure £22,000, BEFORE deductions. Above £20k phase 3 threshold → IN SCOPE from 6 April 2028 despite tiny net profit.
- **Why this matters:** the page must lead with this trap. Many landlords assume the threshold is on net profit (where their £3,400 would be safely below £20k). The gross-test cliff catches a meaningful slice of the £20k-£50k bracket.
- **Operational impact:** Mrs Tunbridge's quarterly cycle from 6 April 2028 onwards requires reporting gross rental and allowable deductions four times a year. The £3,400 net profit results in modest CT-on-individuals tax liability but the same quarterly reporting discipline as a £30k net profit landlord.

### Example 3 — Joint property with Form 17 election (uneven phase entry)

- **Mr and Mrs Pewsey** jointly own 2 BTL properties; total gross rental £40,000/year (£20,000 each at default 50/50 split). They made a Form 17 election in 2022 to split 75/25 in Mr Pewsey's favour.
- **Form 17 effect:** Mr Pewsey's qualifying income share = 75% × £40,000 = £30,000. Mrs Pewsey's = 25% × £40,000 = £10,000.
- **Phase entry timing:** Mr Pewsey is AT phase 2 threshold (>£30k) → IN SCOPE from 6 April 2027. Mrs Pewsey is BELOW phase 3 threshold (£10k < £20k) → NOT in scope at any phase on current facts.
- **Asymmetric planning:** Mr Pewsey must enter MTD ITSA from 2027/28 with full quarterly + EoPS + final declaration discipline. Mrs Pewsey continues with regular SA. The two spouses face very different planning runways from the same jointly-owned property.
- **Without Form 17:** default 50/50 split means each spouse's share is £20,000 — EXACTLY AT phase 3 threshold. The "above £20,000" wording suggests at-the-threshold sits below the cliff (HMRC operational interpretation to be re-verified at write time per §16.27 rate-by-reference), so neither spouse would be mandated.

### Example 4 — Cross-stream qualifying income aggregation

- **Mr Ashford** owns 1 BTL flat; gross rental £15,000/year. He also has a small self-employed bookkeeping practice: gross self-employment income £8,000/year.
- **Threshold testing:** qualifying income = gross self-employment £8,000 + gross rental £15,000 = £23,000 → ABOVE £20k phase 3 threshold → IN SCOPE from 6 April 2028.
- **Counter-example:** Mr Ashford's neighbour Mr Brackley has £18,000 gross rental + zero other qualifying income. Total £18,000 → BELOW £20k → NOT in scope at any phase.
- **Cliff-edge dynamic:** the cross-stream aggregation under §19.2 lock means landlords with side income unexpectedly cross the threshold. The page must walk this explicitly so readers do not assume rental-only-arithmetic.

## FAQ expansion (RUN session polishes prose; 10-12 FAQs target)

1. **Q: What is the phase 3 £20,000 threshold under MTD ITSA?**
   A: The £20,000 threshold is the third and lowest of the three phased qualifying-income thresholds set by §19.1 lock and HMRC-published mandate timeline. Phase 1 (£50,000) bites from 6 April 2026; phase 2 (£30,000) from 6 April 2027; phase 3 (£20,000) from 6 April 2028. The phase 3 threshold was confirmed at Spring Statement 2025 and Autumn Statement 2025 against the Spring Statement 2025 gov.uk HTML document.

2. **Q: When does the phase 3 threshold actually bite for affected landlords?**
   A: 6 April 2028, for the 2028/29 tax year onwards. The DETERMINING return for phase 3 eligibility is the 2026/27 SA return (filed by 31 January 2028 in the ordinary course) per §19.1 lock. A landlord whose 2026/27 qualifying income exceeds £20,000 receives an HMRC notice of MTD ITSA mandate before the 6 April 2028 start.

3. **Q: What is "qualifying income" for MTD ITSA threshold testing?**
   A: Qualifying income is the SUM of gross self-employment income PLUS gross property rental income BEFORE deductions under §19.2 lock. The gross-test trap catches landlords with high gross / low net (e.g., £22,000 gross rental with £18,000 deductible costs leaves £3,400 net — but the GROSS £22,000 puts the landlord above £20,000 phase 3 threshold).

4. **Q: Who is excluded from MTD ITSA?**
   A: Limited companies (separate CT regime, not in MTD ITSA scope per §19.3 lock); partnerships (currently deferred to a date TBC); trustees (SA900 trust return continues); persons below the current phase threshold; persons granted formal MTD ITSA exemption on digital-exclusion grounds. Joint-ownership through partnership structure currently sits outside MTD ITSA pending the partnership deferral end-date.

5. **Q: How does the joint-property test work under §19.4 lock?**
   A: Each owner tests against their SHARE of gross rental, not the property's total gross. Default 50/50 spouse-split applies absent a Form 17 election. Form 17 elections (TCGA 1992 + ITA 2007 architecture) can bring one spouse into scope earlier than the other where the elected income split is unequal. The page walks the asymmetric-entry scenarios explicitly.

6. **Q: What software do I need for MTD ITSA?**
   A: HMRC-recognised compatible software, listed at gov.uk's "Find software for MTD for Income Tax" page. Spreadsheet-plus-bridging is acceptable under §19.14 lock provided digital-link discipline is maintained throughout the data path. The MTD-recognised software list updates periodically as new products gain recognition; do not lock the landlord into a specific product 18 months ahead of mandate — recommend a review near launch date.

7. **Q: What does the quarterly filing cycle look like under MTD ITSA?**
   A: Five obligations per tax year per business stream. Four quarterly updates submitted within 1 month + 7 days of the quarter end (deadlines 7 August / 7 November / 7 February / 7 May for UK-tax-year quarters; calendar-quarter election available under §19.6). End of Period Statement (EoPS) plus final declaration both due 31 January following the tax year end. So a landlord with rental income only files five times per year; a landlord with rental + self-employment files ten times.

8. **Q: What penalty regime applies to MTD ITSA late filing and late payment?**
   A: Late-filing: Schedule 55 FA 2009 points-based regime — 4 quarterly updates missed (or quarterly cycle equivalent) triggers a £200 penalty at the threshold per §19.7 lock. Late-payment: Schedule 56 FA 2009 accelerated 3%/3%/10% schedule from 6 April 2026 for MTD ITSA filers — 3% of unpaid tax from day 15, further 3% from day 30, 10% per annum from day 31. The 5/5/5 legacy Sch 56 schedule continues to apply to non-MTD self-assessment filers.

9. **Q: What is the planning runway for a landlord identified as phase 3 in scope?**
   A: From now to 6 April 2028, the runway is approximately 18-24 months. Use it to: (a) choose MTD-recognised software in Q4 2026 - Q2 2027; (b) optionally opt in voluntarily from 6 April 2026 or 6 April 2027 to pilot the workflow before mandate; (c) appoint accountant via Agent Services Account (ASA) flow under §19.10; (d) reconcile joint-property arithmetic and Form 17 status with spouse; (e) review whether a LtdCo incorporation route (under §11 + §21 architecture) takes the operator out of MTD ITSA scope entirely.

10. **Q: How does cross-stream qualifying income aggregation work?**
    A: Under §19.2 lock, gross self-employment income and gross property rental income are added together for the threshold test. A landlord with £15,000 gross rental + £8,000 gross self-employment side income totals £23,000 → above £20k phase 3 → in scope. A landlord with £18,000 gross rental + zero other qualifying income totals £18,000 → out of phase 3 at the cliff. The aggregation is not at net-profit level; the same gross-test discipline applies across both streams.

11. **Q: What is the exit path under §19.5 lock?**
    A: If qualifying income falls below the relevant threshold for three consecutive tax years post-mandate, the taxpayer can notify HMRC and exit MTD ITSA. Re-entry is automatic if income subsequently rises above the threshold again. The three-consecutive-year buffer prevents in-and-out cycling around the threshold.

12. **Q: Can I take my property business out of MTD ITSA by incorporating?**
    A: Yes — limited companies are outside MTD ITSA per §19.3 lock; they file CT600 annually under the CT regime. However, incorporation has its own tax cost-benefit profile (SDLT on the transfer of properties from individual to LtdCo, market-value CGT on the transfer, ongoing CT compliance under FA 1998 Sch 18 architecture, dividend extraction at 10.75% / 35.75% / 39.35% rates). For some operators the incorporation route is net-positive; for others the MTD ITSA compliance burden is the lesser cost. Specialist advice on the full incorporation comparison is essential before treating MTD ITSA as the driver of incorporation.

## Universal rules + workflow stubs (RUN session follows)

### Voice + style (verbatim per §4.8)

- **No em-dashes** in body copy.
- **Specific over generic.** Named legislation (F(No.2)A 2017 Sch A1, SI 2021/1076, Sch 55 FA 2009, Sch 56 FA 2009 as amended), specific section + paragraph numbers, anonymised personas.
- **No real names.** Anonymised personas (Crowborough, Tunbridge, Pewsey, Ashford, Brackley in worked examples).
- **Lead-gen architecture:** `<LeadForm>` auto-injected at footer.
- **CSS in markdown:** semantic HTML only.
- **FAQs:** 10-14 entries in frontmatter `faqs:` array.
- **Anti-templating:** highest risk is collapsing into seven sibling MTD-architecture pages (A7 exit, A11 LtdCo boundary, A16 top-line, A18 residential, A19 joint-property, A20 penalties, A18-from-picks-yaml qualifying income deep-dive). RUN session must hold the **phase-3 £20k announcement landing-page** angle distinctly — written for the £20k-£50k mid-tier cohort newly entering scope from 6 April 2028.
- **Quality bar (six checks).**

### 19-step workflow (verbatim per §7)

1. Read `house_positions.md` at session start (esp §19 full Wave 3 + Wave 4 lock — all sub-locks 19.1 through 19.17, §27 penalty framework, §35 payroll mechanics for property-business employers).
2. Claim this page in MW3 tracker.
3. Read this brief.
4. Fetch + read competitor URLs via session-side Google Search.
5. Read closest-existing pages: sibling MW3 A7 (exit), A11 (LtdCo boundary), A16 (top-line), A18 (residential), A19 (joint-property), A20 (penalties), A18-picks-yaml (qualifying income deep-dive); existing MTD-quarterly-deadline + MTD-software pages.
6. Plan H2 / H3 outline + meta + 10-14 FAQs + CTA placements — STRICTLY in the phase-3-announcement landing-page angle. Lead with the £20k threshold + 6 April 2028 + 2026/27 determining return; anchor with the gross-test trap; close with planning runway + LtdCo exit-route consideration.
7. Verify factual claims per §16.35 (F(No.2)A 2017 Sch A1; SI 2021/1076 current as-amended; Spring Statement 2025 HTML; Sch 55 + Sch 56 as amended for MTD ITSA).
8. Fetch hero image.
9. Write markdown at `Property/web/content/blog/government-to-implement-mtd-for-it-with-lower-threshold.md`.
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
- **Stage 2 extensions added:** authority URL list anchored to legislation.gov.uk + gov.uk Spring Statement 2025 HTML + HMRC BIM manual paths; 4 worked examples covering bridge-population landlord at £22k (in scope at phase 3 not phase 2), gross-test trap with high gross / low net, joint-property Form 17 uneven-entry, and cross-stream qualifying income aggregation; 12 FAQs anchored to phase 3 timing + determining return + qualifying income + exclusions + joint-property test + software + quarterly cycle + penalty regime + planning runway + cross-stream aggregation + exit path + LtdCo route; voice + style + 19-step workflow stubs verbatim.
- **§16.36 statutory-citation cross-check:** F(No.2)A 2017 Sch A1 + SI 2021/1076 + Spring Statement 2025 figures anchored to §19 locks verified 2026-05-22. No new drift catches at Stage 2 cross-check. RUN session re-verifies threshold + penalty figures at write time per §16.27 rate-by-reference (these are figures most likely to drift between waves as Budget cycles continue).
- **Anti-templating note:** seven sibling MTD-architecture pages in same wave. RUN session must hold the **phase-3 £20k announcement landing-page** angle distinctly. The £20k cohort population estimate (~700k-800k newly-mandated landlords) is the differentiation anchor; the page is for the largest cohort.

### RUN session entry (populate at write time)

[RUN session records: H1 chosen, meta title + description, competitor URLs fetched, existing-page review notes, citations added, internal links added, build attempts, six-check verification, flags raised, summary.]

---

## Stage 1 seed work log

- **Stage 1 author:** MW3 Stage 1 Sub-Agent A (batch M3-A-B1) on 2026-05-27.
- **Cluster anchor:** MTD for ITSA — phase-3 £20,000 threshold landing-page framing. Differentiation framing: written for the £20,000-£50,000 mid-tier landlord cohort entering scope from 6 April 2028 (the largest of the three phase cohorts), distinct from seven sibling MTD pages that cover top-line / Ltd Co boundary / joint-property / exit / penalty / qualifying-income / residential-landlord descriptive frames.
- **HP-lock alignment:** §19 (MTD for ITSA — full Wave 3 + Wave 4 lock applies); §19.1 (phased threshold timeline); §19.2 (qualifying income aggregation); §19.4 (joint-property mechanics); §19.5 (exit rule); §19.7 (penalty regime — Spring Statement 2025 accelerated schedule); §19.10 (ASA); §27 (general penalty + retention framework). No NEW HP LOCK NEEDED.
- **§16.35 per-write verification note:** Threshold + penalty figures anchored to §19 locks verified 2026-05-22 against gov.uk Spring Statement 2025 HTML document. RUN session WebFetches Spring Statement 2025 + SI 2021/1076 current-as-amended text at write time per §16.35.
- **Cannibalisation reasoning:** seven sibling MTD picks in this wave bucket A; this page differentiates by being the phase-3-announcement landing-page (the £20,000 lower threshold news angle), assuming the reader knows phase 1 + 2 timing from the descriptive siblings. No CANNIBAL flag — coherent pillar architecture.
