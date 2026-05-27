---
slug: making-tax-digital-major-self-assessment-overhaul-ahead
category: making-tax-digital-mtd
intent: A landlord (sole-trader / individual / portfolio operator) searching this query wants the **system-overhaul framing** of Making Tax Digital for Income Tax Self Assessment — what changes operationally between the legacy annual SA cycle (one return at 31 January, paper-or-digital records, no software requirement, 64-8 agent authorisation, fixed £100 late-filing penalty, 31/46/91 day-trigger late-payment cascade) and the post-6-April-2026 MTD ITSA cycle (four quarterly updates + EoPS + final declaration, mandatory HMRC-recognised software, digital-records-with-digital-links, ASA agent authorisation, points-based late-submission penalty, 15/30/31 day-trigger accelerated late-payment cascade per Spring Statement 2025), the phased mandate timeline (£50k threshold from April 2026; £30k from April 2027; £20k from April 2028), the operational migration cost (software adoption + record-keeping behaviour change + agent re-authorisation), and the strategic implications for landlords near or above the threshold (cash-flow impact, software-vendor lock-in, agent-relationship continuity, the £10,000-threshold-abandonment context). The intent is the "I have heard MTD is coming, tell me what is actually changing" framing — overhaul-narrative not technical-detail.
---

# Making Tax Digital: The Major Self-Assessment Overhaul Ahead for UK Landlords (April 2026 Onwards)

## Statutory anchor

- **Primary — MTD ITSA enabling statute:** Taxes Management Act 1970 **Schedule A1** (inserted by Finance (No.2) Act 2017 Schedule 14) — the architectural insert into TMA 1970 that creates the digital-recording + quarterly-update + end-of-period-statement + final-declaration cycle for income tax. House-position-locked at §19 Wave 3 lock + §19.10-§19.17 Wave 4 extensions 2026-05-22 / 2026-05-23.
- **Primary — operative regulations:** Income Tax (Digital Requirements) Regulations 2021 (**SI 2021/1076**) — the operative statutory instrument setting out the digital-recording requirements (reg 4), the quarterly-update obligations (reg 8), the end-of-period-statement obligations (reg 11), the final-declaration obligations (reg 16), the qualifying-income test (reg 20), the joint-property treatment (reg 21), and the exit / income-drop mechanism (reg 22). Verified per §19 Wave 3 lock against gov.uk on 2026-05-22.
- **Primary — mandate timeline:** Phased threshold introduction per FA 2024 + SI 2024 amendment package + HMRC published commencement schedule. **6 April 2026** — mandatory for sole traders + landlords with qualifying income above **£50,000** (tested against the 2024/25 SA return). **6 April 2027** — mandatory for those above **£30,000** (tested against 2025/26). **6 April 2028** — mandatory for those above **£20,000** (tested against 2026/27). General partnerships originally proposed April 2027, **now deferred** with no confirmed go-live date. Limited companies always outside MTD ITSA (separate "MTD for CT" future cycle, no date — per §19.3 lock).
- **Primary — late-submission penalty regime (FA 2021 Sch 24 points-based — supersedes legacy Sch 55 item 1 for in-scope landlords from 6 April 2026):** points-based architecture; 1 point per missed quarterly update; threshold **4 points** for quarterly filers (2 for annual); £200 penalty per missed submission while at threshold; points reset after 24 months of full compliance. House-position-locked at §19.7 Wave 3 lock + Wave 4 refinements. (Sessions writing must NOT conflate the FA 2021 Sch 24 instrument with FA 2007 Sch 24 — both have the same numerical name; FA 2021 Sch 24 is the new MTD points regime, FA 2007 Sch 24 is the long-standing inaccuracy regime.)
- **Primary — late-payment penalty regime (Spring Statement 2025 reform — supersedes legacy Sch 56 item 1 for in-scope landlords from 6 April 2026):** **3% from day 15, +3% from day 30, +10% per annum from day 31**. House-position-locked at §19.7 Wave 3 lock with verbatim verification against gov.uk Spring Statement 2025 HTML document. The legacy 31/46/91 schedule at 2%/2%/4% remains only for VAT + non-MTD income tax + landlords below threshold. F-1-adjacent correction logged 2026-05-22 (earlier site copy crossed legacy day-triggers with new percentages — sessions must not).
- **Primary — agent authorisation (Agent Services Account):** Pre-MTD agent representation operated via the 64-8 form + Online Services Account (OSA). For MTD ITSA from 6 April 2026, the **Agent Services Account (ASA) is the mandatory route**. Client authorisation flow: agent generates request via ASA → client receives email link to gov.uk authorisation portal → client logs in via Government Gateway and approves specifically for MTD ITSA filing. **Joint owners must each authorise the agent separately** (no spouse-implies-spouse rule). **Re-authorisation on agent change** — ASA authorisations do not transfer. House-position-locked at §19.10 Wave 4 lock.
- **Primary — digital-records-and-digital-links discipline:** Records must be kept digitally for the 7-year retention period (TMA 1970 s.12B). **Digital link** definition (per HMRC notice 700/22 adapted for MTD ITSA): a transfer of data between software / spreadsheet cells that does NOT involve manual transcription or copy-paste. Acceptable: cell references / formulae, linked tables, API extract, CSV import via script. NOT acceptable: copy-paste, manual re-keying, screen-reading. Spreadsheet + bridging software route is acceptable provided the bridging software is on the HMRC-recognised list. House-position-locked at §19.6 + §19.14 + §19.16 Wave 3/4 locks.
- **Primary — software requirement:** HMRC-recognised compatible software mandatory (list at gov.uk/find-software). Software must support: digital record-keeping, quarterly update submissions, end-of-period statement, final declaration. Free-tier options exist but limited (FreeAgent for NatWest customers; HMRC pilot tooling for some segments). Paid options dominate the recognised list. **Vendor names change periodically; sessions must NOT hard-code product names in body content.** House-position-locked at §19.6 Wave 3 lock.
- **Supporting — the £10,000 abandoned threshold context:** The original 2018 MTD ITSA design used a **£10,000 qualifying income threshold** for all sole traders and landlords. Abandoned in late 2022 / early 2023 under the previous government, with the phased £50k / £30k schedule announced 19 December 2022. Sessions encountering legacy guidance / competitor pages from 2019-2022 frequently see the £10,000 figure — sessions writing must NOT carry it forward; the £10,000 was never implemented. House-position-locked at §19.8 Wave 3 lock.
- **House position reference:** §19 (MTD ITSA architecture — Wave 3 lock, primary anchor) including §19.1-§19.9 (Wave 3 core: timeline, qualifying income, excluded categories, joint owners, exit, software, quarterly cycle, penalties, abandoned £10k context, do-not-write list) and §19.10-§19.17 (Wave 4 operational mechanics: ASA, foreign property, pension funds, letting agents, digital links, mid-year cessation, digital records). No NEW HP LOCK NEEDED.

## Framing differentiator (anti-templating, anti-cannibalisation)

This page is the **system-overhaul framing** of MTD ITSA — the "what is actually changing" cultural-shift narrative for landlords. Sibling MW3-A MTD picks cover different intents (per A11's framing differentiator + queue analysis):

- **A6 (`government-to-implement-mtd-for-it-with-lower-threshold`)** — historical / news framing of the £20,000 phase-in announcement; news-cycle slant.
- **A7 (`heres-how-you-can-exit-mtd-if-your-income-falls`)** — three-tax-year income-exemption exit route under SI 2021/1076 reg 22; exit-mechanic-specific.
- **A11 (`how-making-tax-digital-affects-limited-companies`)** — LtdCo position (three-layer LtdCo picture: MTD ITSA out, MTD VAT in if registered, MTD for CT future cycle); LtdCo-audience-specific.
- **A18 (`what-is-qualifying-income-for-mtd`)** (this batch) — qualifying-income definition deep-dive; technical-input-specific.
- **A19 (`mtd-made-simple-for-landlords-with-jointly-owned-properties`)** — joint-property test (§19.4); joint-owner-audience-specific.
- **A20 (`mtd-penalties-exemptions-and-what-to-watch`)** — penalty regime + exemption catalogue overview; penalty-and-exemption-specific.

None of those addresses the **system-overhaul cultural-shift narrative** — the "I have heard MTD is coming, what is actually changing operationally" framing. The angle this page takes: a landlord at the orientation moment (e.g. has heard MTD is coming from accountant, news article, or HMRC nudge letter) needs the **before-and-after comparison** of how their tax-compliance cycle changes. The page presents the change as a four-axis overhaul: (1) **filing frequency** — one annual return → four quarterly updates + EoPS + final declaration; (2) **record-keeping form** — paper-or-digital → digital-with-digital-links; (3) **software** — optional → mandatory HMRC-recognised; (4) **agent relationship** — 64-8 + OSA → ASA + per-client authorisation. The page also surfaces the strategic implications (cash-flow, software adoption cost, agent continuity, the £10k abandonment context).

## Key questions this page must answer

1. What is MTD for ITSA in one sentence — the digital-recording + quarterly-update + end-of-period-statement + final-declaration cycle for income tax under TMA 1970 Sch A1 (inserted by F(No.2)A 2017 Sch 14) read with SI 2021/1076?
2. What is the mandate timeline — April 2026 £50k threshold, April 2027 £30k, April 2028 £20k, with the threshold tested against the 2024/25 / 2025/26 / 2026/27 SA returns respectively?
3. What is the four-axis overhaul — filing frequency (annual → quarterly + EoPS + final); record form (paper/digital → digital-with-digital-links); software (optional → mandatory HMRC-recognised); agent route (64-8 + OSA → ASA + per-client authorisation)?
4. What does the quarterly-update cycle look like — UK tax-year quarters (5 July / 5 October / 5 January / 5 April), submission deadlines (7 August / 7 November / 7 February / 7 May), EoPS + final declaration both at 31 January following year-end, with calendar-quarter election available from 6 April 2026?
5. What is the penalty regime change — points-based late-submission (1 point per missed update; £200 at 4-point threshold; reset after 24 months full compliance) under FA 2021 Sch 24, replacing legacy fixed £100 + £10/day + 5%/£300 cascade for in-scope landlords; AND accelerated late-payment (3%/3%/10% on 15/30/31 day-triggers) per Spring Statement 2025 reform, replacing legacy 2%/2%/4% on 31/46/91?
6. What is the software requirement — HMRC-recognised compatible software mandatory; list at gov.uk/find-software; spreadsheet + bridging software acceptable; vendor names change periodically (do NOT lock to product); free-tier options limited?
7. What is the digital-links rule — data transfer between software / spreadsheet cells must use cell references / formulae / linked tables / API extract / CSV-via-script; copy-paste / manual re-keying / screen-reading explicitly NOT acceptable?
8. What is the ASA agent-authorisation change — agent registers ASA via gov.uk; client receives authorisation email; client logs in via Government Gateway and approves for MTD ITSA; joint owners authorise separately; re-authorisation on agent change?
9. What is the £10,000-abandoned-threshold context — the original 2018 design used £10k as the threshold for all; abandoned in late 2022 / early 2023; phased £50k / £30k / £20k announced 19 December 2022; legacy competitor pages from 2019-2022 still cite £10k — flag as stale?
10. What are the strategic implications for landlords — cash-flow impact of quarterly software + accountant fees; software-vendor lock-in risk + migration cost; agent-continuity risk on re-authorisation cycle; opportunity for incorporation as an MTD-admin escape route (cross-link to A11 for LtdCo angle); voluntary opt-in available from 6 April 2025 (pilot) or 6 April 2026 (general)?
11. What does the timeline look like for a typical landlord — 2024/25 SA return determines April 2026 mandate; agent should register ASA + obtain client authorisation by Q1 2026; software adoption + chart-of-accounts mapping in Q4 2025 / Q1 2026; first quarterly update due 7 August 2026 covering 6 April → 5 July 2026?
12. What is the partnership + LtdCo position (boundary statement) — general partnerships originally April 2027, now deferred (no confirmed date); LLPs treated as partnerships (deferred); limited companies outside MTD ITSA entirely (file CT600s; MTD for CT future cycle no date) — see A11 for the LtdCo angle?

## Manager pre-decisions placeholder

- **Category routing:** `making-tax-digital-mtd` (the MTD pillar; this page is the orientation-level MTD-overhaul page that other MTD-pillar pages can cross-link to as the "headline overview" anchor). Manager may override to `landlord-tax-essentials` if editorial preference exists — flag at brief gate.
- **Worked-example numbers:**
  - Use the §19.1-locked threshold figures verbatim (£50k April 2026; £30k April 2027; £20k April 2028) and §19.7-locked penalty figures (3%/3%/10% on 15/30/31 day-triggers; £200 at 4-point threshold). Stage 2 must re-verify against gov.uk at write time per §16.27 rate-by-reference + §16.35 statute-verification discipline.
  - Worked illustration: a landlord with £58k gross rental in 2024/25 — in scope April 2026; first quarterly update due 7 August 2026; chart-of-accounts mapping into SA105 categories (gross rent, agent fees, repairs, insurance, council tax, finance costs, other); annual cycle from 7 August 2026 → 7 November 2026 → 7 February 2027 → 7 May 2027 → EoPS + final declaration 31 January 2028. Stage 2 must compute exact dates per §16.27 verification at write time.
  - Anti-cannibal: keep worked-example landlord profile distinct from sibling A6 / A7 / A11 / A18 / A19 / A20 examples (use different income / years / scenario mix).
- **Cross-link targets:**
  - Within MW3 Bucket A: `government-to-implement-mtd-for-it-with-lower-threshold` (A6 — news framing); `heres-how-you-can-exit-mtd-if-your-income-falls` (A7 — exit route); `how-making-tax-digital-affects-limited-companies` (A11 — LtdCo position); `what-is-qualifying-income-for-mtd` (A18, this batch — qualifying income deep-dive); `mtd-made-simple-for-landlords-with-jointly-owned-properties` (A19 — joint-owner test); `mtd-penalties-exemptions-and-what-to-watch` (A20 — penalty + exemption catalogue); `late-filing-and-late-payment-penalties` (A13, this batch — adjacent penalty regime).
  - To existing pages: pillar pages on landlord-tax-essentials; MTD pillar landing; pillar pages on bookkeeping for landlords; pillar pages on agent relationship + accountant change.
  - Forward: any future page on the MTD for CT cycle once HMRC publishes a confirmed go-live date.

## Stage 2 research target list

- Competitor pages to fetch (Stage 2 sources fresh via Google Search / Bing Search at write time; Wave 8 + Wave 9 5/5 dead-rate pattern continues — do NOT trust Stage 1 URL guesses; verify with httpx + BeautifulSoup before citing): 2-4 candidates from accountancy practice sites + MTD-software-vendor knowledge bases + landlord-resource sites covering "MTD ITSA overview" + "what is changing MTD self assessment" + "MTD landlord 2026 overhaul".
- HMRC manuals to cite: SAM50000+ (Self Assessment Manual on record-keeping); PIM2000+ (Property Income Manual for landlord-specific MTD context); HMRC's "Find out about Making Tax Digital" landing page on gov.uk (verify URL at Stage 2 — Wave 9 recurring HMRC URL rot); HMRC's MTD ITSA guidance pages at gov.uk/government/publications/making-tax-digital-for-income-tax (verify URL at Stage 2). Verify currency at write time per §16.35.
- Legislation anchors: TMA 1970 Sch A1 (inserted by F(No.2)A 2017 Sch 14) — verify verbatim insertion. SI 2021/1076 regs 4 / 8 / 11 / 16 / 20 / 21 / 22 — verify each citation at write time. FA 2021 Sch 24 (points-based penalty regime — verify commencement order at write time). Cross-reference §19 (Wave 3 lock) and §19.10-§19.17 (Wave 4 lock).
- Case-law to ground: limited applicability here — the MTD ITSA framework is procedural / structural and the case-law line is still developing post-April-2026 mandate. Sessions should NOT manufacture authorities. If any FTT case on points-based-penalty appeals emerges by Stage 2 RUN, reflect it.

## Stage 2 research target list — extended

### Authority URLs (Stage 2 surfaces; RUN session WebFetches at write time per §16.35)

- **`https://www.legislation.gov.uk/ukpga/2017/32/schedule/14`** — Finance (No.2) Act 2017 Schedule 14 (insertion of TMA 1970 Schedule A1 — the MTD ITSA enabling architecture). RUN session reads para-by-para insert wording for the digital-records + quarterly-update + EoPS + final declaration cycle.
- **`https://www.legislation.gov.uk/uksi/2021/1076/contents`** — Income Tax (Digital Requirements) Regulations 2021 (SI 2021/1076) — the operative statutory instrument. RUN session reads regs 4 (digital records), 8 (quarterly updates), 11 (EoPS), 16 (final declaration), 20 (qualifying income), 21 (joint property), 22 (exit / income-drop) verbatim.
- **`https://www.legislation.gov.uk/ukpga/2021/26/schedule/24`** — Finance Act 2021 Schedule 24 (the points-based late-submission regime). RUN session reads at write time for commencement-order status + verbatim 4-point threshold + £200 penalty + 24-month reset. Sessions must NOT conflate with FA 2007 Sch 24 (the inaccuracy regime, totally different instrument despite the same numerical name).
- **`https://www.gov.uk/government/publications/spring-statement-2025-document/spring-statement-2025-html`** — gov.uk Spring Statement 2025 HTML. RUN session re-verifies the 3% from day 15 / +3% from day 30 / +10% per annum from day 31 verbatim for the accelerated late-payment cascade for MTD ITSA filers.
- **`https://www.gov.uk/government/publications/making-tax-digital-for-income-tax`** — HMRC's MTD ITSA published guidance page (verify URL at write time — recurring HMRC URL rot per Wave 9 audit). The orientation-level source.
- **`https://www.gov.uk/guidance/check-when-to-sign-up-for-making-tax-digital-for-income-tax`** — HMRC's mandate-checker / sign-up guidance.
- **`https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax`** — HMRC's recognised-software list. RUN session must NOT hard-code product names in body content per §19.6 lock (vendor names change periodically).
- **`https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2000`** — Property Income Manual PIM2000+ (landlord-specific MTD context).
- **`https://www.gov.uk/hmrc-internal-manuals/self-assessment-manual/sam50000`** — Self Assessment Manual SAM50000+ (record-keeping framework, the legacy baseline MTD overhauls).
- **`https://www.gov.uk/guidance/agents-online-self-serve-and-the-agent-services-account`** — gov.uk Agent Services Account (ASA) guidance. The agent-route change anchor per §19.10 Wave 4 lock.
- **`https://www.legislation.gov.uk/ukpga/1970/9/section/12B`** — TMA 1970 s.12B (records retention; 7-year period applied to digital MTD records).
- **`https://www.gov.uk/government/publications/making-tax-digital-for-income-tax-self-assessment-the-design`** — original gov.uk MTD ITSA design document (verify URL at write time; this document carries the historical £10,000 threshold context and may have been archived or moved).

### Competitor URLs (session-side WebSearch at write time)

`<!-- competitor section: per §16.31 Wave 8 + Wave 9 5/5 dead-rate pattern, Stage 2 did not pre-fetch firm-domain URLs. RUN session uses Google Search at write time. Recommended search queries: "MTD ITSA overhaul 2026 landlord", "making tax digital self assessment changes", "MTD for income tax what is changing", "quarterly updates landlord 2026". Target: 3-5 firm-side pages from accountancy practice + MTD-software-vendor knowledge bases + landlord-resource sites; ensure differentiation from sibling MW3 A6 news-framing / A7 exit-mechanic / A11 LtdCo / A18 qualifying-income / A19 joint-owner / A20 penalty-catalogue pages. Beware competitor pages still citing the abandoned £10,000 threshold (legacy 2019-2022 framing); RUN session flags these as stale references rather than mimics them. -->`

### Case-law

- Limited applicability — the MTD ITSA framework is procedural / structural and the case-law line is still developing post-April-2026 mandate. RUN session monitors for any FTT case on points-based penalty appeals that emerges between Stage 2 and write time. Sessions should NOT manufacture authorities.

## Worked-example data (RUN session uses these as canvas)

### Example 1 — The mandate timeline as a year-by-year before-and-after

- **Ainsworth-Estate, the £58k April-2026-cohort landlord:** holds 4 BTL properties personally; 2024/25 gross rental income £58,000; expenses ~£24,000; net profit £34,000. The £58k gross figure is tested against the £50,000 April 2026 threshold — Ainsworth-Estate is in scope from 6 April 2026.
- **Year-by-year before-and-after:**
  - **2024/25** (legacy): annual SA return by 31 January 2026; paper or digital records optional; no software requirement; 64-8 agent authorisation; one filing event.
  - **2025/26** (last legacy year): annual SA return by 31 January 2027; same legacy framework. HMRC writes to Ainsworth-Estate in autumn 2025 confirming the April 2026 mandate.
  - **2026/27** (first MTD year): quarterly updates due 7 August 2026 / 7 November 2026 / 7 February 2027 / 7 May 2027; EoPS + final declaration by 31 January 2028; HMRC-recognised software mandatory; digital-records-with-digital-links; ASA agent authorisation; five filing events instead of one. Late-submission and late-payment under FA 2021 Sch 24 + Spring Statement 2025 cascade.
- **Operational point:** the four-axis overhaul (filing frequency / record-form / software / agent route) all happen simultaneously on 6 April 2026 for Ainsworth-Estate. RUN session must teach this transition as a single discrete event, not a phased migration.

### Example 2 — The £30k April-2027-cohort landlord with deferral runway

- **Browning-Estate, the £35k April-2027-cohort landlord:** holds 2 BTL properties personally; 2024/25 gross rental income £35,000. The £35k gross figure is BELOW the £50,000 April 2026 threshold but ABOVE the £30,000 April 2027 threshold (tested against 2025/26 SA return).
- **Timeline:** in scope from 6 April 2027 — assuming 2025/26 gross stays around £35,000. Has an additional year of runway compared to Ainsworth-Estate. RUN session should teach the deferral as planning-window: Browning-Estate can adopt MTD-compatible software in 2026/27 voluntarily (general voluntary opt-in from 6 April 2026) to test the cycle before the mandate bites; or wait until Q4 2026 / Q1 2027 for the mandate transition.
- **Operational point:** the phased mandate creates differentiated planning windows for different cohorts. Sessions writing must NOT collapse all landlords into the April 2026 cohort; the £30k and £20k cohorts have their own timelines.

### Example 3 — Agent route change: the ASA migration in operational detail

- **Crowther-Estate, the agent-represented landlord:** has been represented by an accountancy practice via 64-8 + Online Services Account for legacy SA. Mandate cohort: April 2026 (gross £62,000 in 2024/25).
- **Pre-MTD agent flow (legacy):** 64-8 sent to HMRC; accountant accesses Crowther-Estate's SA via OSA; filing one return per year; no per-year re-authorisation.
- **MTD agent flow (post-April 2026):** accountant must register Agent Services Account (ASA) with HMRC; ASA generates client-authorisation request; Crowther-Estate receives email with authorisation link; logs into gov.uk via Government Gateway; specifically authorises agent for MTD ITSA filing. The authorisation does NOT carry over from the legacy 64-8; it is a fresh authorisation specific to ASA + MTD ITSA. On agent change, re-authorisation is required.
- **Joint-owner mechanic:** Crowther-Estate's spouse jointly owns 2 of the properties. The spouse must SEPARATELY authorise the agent for the spouse's own MTD ITSA filing (no spouse-implies-spouse rule under §19.4 + §19.10 Wave 4 lock).
- **Operational point:** the ASA migration is the most agent-relationship-sensitive part of the overhaul. Sessions writing must NOT assume continuity from 64-8; the re-authorisation is a discrete event the landlord and agent must schedule explicitly. Joint owners must each authorise separately.

### Example 4 — Digital-links discipline: what is acceptable, what is not

- **Davenport-Estate, the spreadsheet-plus-bridging-software landlord:** keeps rental records in a multi-tab spreadsheet (one tab per property, columns for date / source / gross-rent / agent-fee / expenses / category-code); plans to use bridging software to submit MTD ITSA updates. Mandate cohort: April 2026.
- **Acceptable digital-links:** within the spreadsheet, cell references and formulae linking the per-property tabs to a quarterly-summary tab; the bridging software ingests the quarterly-summary tab via CSV export OR direct API extract (both are digital-links). 7-year retention of the spreadsheet meets TMA 1970 s.12B.
- **NOT acceptable:** copying values from the spreadsheet into the bridging software's interface manually; screen-reading the spreadsheet and re-keying into the bridging software; printing the spreadsheet and re-keying into HMRC's gateway. These all break the digital-link chain per §19.16 Wave 4 lock.
- **Operational point:** sessions writing must teach what IS and IS NOT a digital link with specific examples. The boundary trips landlords who assume "having a digital file is enough" — the LINKS BETWEEN files / cells / software must themselves be digital, not manual-transcription bridges.

### Example 5 — The £10k abandoned threshold: a do-not-write list

- **Legacy competitor page Davenport-Estate found in research:** an accountancy firm's 2021 blog post titled "MTD for Income Tax: £10,000 threshold from April 2024 — what landlords need to know". Page is still online (not archived) and ranks in Google for related queries.
- **Status:** STALE. The £10,000 threshold was the original 2018 MTD ITSA design; abandoned in late 2022 / early 2023; replaced by the phased £50,000 (April 2026) / £30,000 (April 2027) / £20,000 (April 2028) schedule announced 19 December 2022. The £10,000 was never implemented.
- **Operational point:** sessions writing this MTD overhaul page must explicitly call out the £10,000-abandoned context as a do-not-write list item. Per §19.8 Wave 3 lock + Wave 7 §16.45 lesson on "do-not-write" patterns, the £10k figure is a recurring drift watchpoint — competitor pages still cite it; RUN session must NOT carry it forward.

## FAQ expansion (RUN session polishes prose; 10-12 FAQs target)

1. **Q: What is Making Tax Digital for Income Tax Self Assessment?**
   A: MTD ITSA is the digital-recording + quarterly-update + end-of-period-statement + final-declaration cycle for income tax under TMA 1970 Schedule A1 (inserted by Finance (No.2) Act 2017 Schedule 14) read with the Income Tax (Digital Requirements) Regulations 2021 (SI 2021/1076). It replaces the legacy annual SA cycle for landlords and sole traders above the qualifying-income threshold from 6 April 2026 onwards in phases.

2. **Q: Who is in scope and from when?**
   A: From 6 April 2026, mandatory for sole traders and landlords with qualifying income above £50,000 (tested against the 2024/25 SA return). From 6 April 2027, the threshold drops to £30,000 (tested against 2025/26). From 6 April 2028, the threshold drops to £20,000 (tested against 2026/27). General partnerships were originally proposed for April 2027 but the start date has been deferred with no confirmed go-live; limited companies are outside MTD ITSA entirely and follow their own future MTD for CT cycle.

3. **Q: What changes operationally compared to the legacy SA cycle?**
   A: Four axes change at once. Filing frequency moves from one annual return to four quarterly updates plus an end-of-period statement plus a final declaration. Record-form moves from paper-or-digital optional to digital-records-with-digital-links mandatory. Software moves from optional to mandatory HMRC-recognised compatible software. Agent route moves from 64-8 plus Online Services Account to Agent Services Account plus per-client MTD-ITSA-specific authorisation.

4. **Q: What does the quarterly cycle look like?**
   A: The UK tax-year quarters end on 5 July, 5 October, 5 January, and 5 April. Submission deadlines are 7 August, 7 November, 7 February, and 7 May. The end-of-period statement and final declaration are both due by 31 January following the tax year. A calendar-quarter election (end of June / September / December / March) is available from 6 April 2026 for landlords who prefer alignment with calendar months.

5. **Q: What is the late-submission penalty regime?**
   A: FA 2021 Schedule 24 points-based architecture. One point per missed quarterly update; threshold is 4 points for quarterly filers (2 for annual); £200 penalty per missed submission once at threshold; points reset after 24 months of full compliance. Sessions must NOT conflate the FA 2021 Sch 24 (new MTD points regime) with FA 2007 Sch 24 (the long-standing inaccuracy regime) — same numerical name, totally different instruments.

6. **Q: What is the late-payment penalty regime?**
   A: For in-scope MTD ITSA landlords from 6 April 2026, the Spring Statement 2025 accelerated cascade applies: 3% from day 15, +3% from day 30, +10% per annum from day 31. This replaces the legacy FA 2009 Schedule 56 5% / 5% / 5% on 30-day / 6-month / 12-month triggers for in-scope filers. Sessions must NOT cross-import the legacy 31/46/91 day-triggers with the new 3%/3%/10% percentages — that is the F-1-adjacent drift watchpoint.

7. **Q: What is a digital link?**
   A: A transfer of data between software, spreadsheet cells, or systems that does not involve manual transcription or copy-paste. Acceptable digital links: cell references and formulae, linked tables, API extract, CSV import via script. Not acceptable: copy-paste, manual re-keying, screen-reading. Spreadsheet plus bridging software is acceptable provided the bridging software is on the HMRC-recognised list and the bridge itself uses a digital-link mechanism (CSV export, API call).

8. **Q: What software do I need?**
   A: HMRC-recognised compatible software supporting digital record-keeping, quarterly update submission, end-of-period statement, and final declaration. The recognised-software list is at gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax. Vendor names change periodically; sessions should NOT hard-code product names. Free-tier options exist but are limited; most landlord-segment landlords use paid options.

9. **Q: How does the Agent Services Account change agent representation?**
   A: Pre-MTD agent representation used 64-8 form plus Online Services Account access. From 6 April 2026 for MTD ITSA, the Agent Services Account (ASA) is mandatory. Agents register the ASA; clients receive a gov.uk authorisation link; clients log in via Government Gateway and specifically authorise the agent for MTD ITSA filing. Joint owners authorise separately (no spouse-implies-spouse rule). On agent change, the ASA authorisation does not carry over and must be re-issued.

10. **Q: What about the £10,000 threshold I keep reading about?**
    A: The £10,000 threshold was the ORIGINAL 2018 MTD ITSA design and was abandoned in late 2022 / early 2023 under the previous government. The phased £50,000 / £30,000 / £20,000 schedule was announced 19 December 2022. The £10,000 figure appears on many 2019-2022 competitor pages still online but it was never implemented. Treat any source citing the £10,000 threshold as stale.

11. **Q: Can I opt into MTD ITSA voluntarily?**
    A: Yes. Voluntary participation is available from 6 April 2025 (pilot) or 6 April 2026 (general voluntary). Voluntary participants are bound by the quarterly cycle and the FA 2021 Sch 24 + Spring Statement 2025 penalty regimes. Voluntary opt-in is most useful for landlords who anticipate crossing the threshold soon and want to test the cycle in a planning window.

12. **Q: What about general partnerships and limited companies?**
    A: General partnerships were originally proposed for April 2027 MTD ITSA, but the start date has been deferred with no confirmed new go-live date. LLPs are treated as partnerships and follow the partnership timeline. Limited companies are outside MTD ITSA entirely; they file CT600s under the existing CT framework, with a separate future MTD for CT cycle (no announced go-live date). Cross-link our LtdCo MTD page for the LtdCo-specific picture.

## Universal rules + workflow stubs (RUN session follows)

### Voice + style (verbatim per §4.8)

- **No em-dashes** in body copy. Use commas, parentheses, full stops, middle dots, or restructure the sentence.
- **Specific over generic.** Named legislation (TMA 1970 Sch A1; F(No.2)A 2017 Sch 14; SI 2021/1076 regs 4 / 8 / 11 / 16 / 20 / 21 / 22; FA 2021 Sch 24; TMA 1970 s.12B); specific paragraph numbers; anonymised personas.
- **No real names.** Anonymised personas (Ainsworth-Estate, Browning-Estate, Crowther-Estate, Davenport-Estate in the worked examples above).
- **Lead-gen architecture:** `<LeadForm>` auto-injected at footer. Do not duplicate in body.
- **CSS in markdown:** semantic HTML only. No Tailwind classes. `<aside>` styled by global CSS.
- **FAQs:** 10-14 entries in frontmatter `faqs:` array, auto-emitted as FAQPage JSON-LD by the build.
- **Anti-templating:** this page is the **system-overhaul cultural-shift framing** of MTD ITSA. RUN session must hold this orientation-level lane distinct from sibling A6 news-framing / A7 exit-mechanic / A11 LtdCo / A18 qualifying-income deep-dive / A19 joint-owner deep-dive / A20 penalty + exemption catalogue. The four-axis overhaul (filing frequency / record-form / software / agent route) is the load-bearing structure. The F-1-adjacent drift watchpoint (legacy 31/46/91 day-triggers crossed with new 3%/3%/10% percentages) and the FA 2021 Sch 24 vs FA 2007 Sch 24 numerical-name collision are the two operative drift risks. The £10,000-abandoned-threshold must be called out explicitly as a do-not-write item per §19.8 Wave 3 lock. No hard-coded software-vendor product names per §19.6 Wave 3 lock.
- **Quality bar (six checks):** zero em-dashes, zero Tailwind, FAQ schema count matches frontmatter array, meta title ≤ 62 chars, meta description ≤ 158 chars, internal links resolve.

### 19-step workflow (verbatim per §7)

1. Read `house_positions.md` at session start (esp §19 MTD ITSA architecture full §19.1-§19.9 Wave 3 lock + §19.10-§19.17 Wave 4 operational extensions).
2. Claim this page in MW3 page tracker (⬜ → 🟡 with UTC timestamp).
3. Read this brief (framing differentiator, key questions, manager pre-decisions, research target list).
4. Fetch + read competitor URLs via session-side Google Search at write time (per §16.31 dead-rate pattern); flag any competitor pages citing the £10,000 threshold as stale references rather than mimics.
5. Read closest-existing pages: sibling MW3 A6 / A7 / A11 / A18 / A19 / A20 / A13; any pillar pages on MTD or SA mechanics.
6. Plan H2 / H3 outline + meta + 10-14 FAQs + CTA placements — STRICTLY in the orientation-level system-overhaul lane; the four-axis structure is the H2 backbone; technical-input deep-dives belong in A18 / A19 / A20 cross-links.
7. Verify factual claims against authorities per §16.35 (TMA 1970 Sch A1 + F(No.2)A 2017 Sch 14 + SI 2021/1076 regs + FA 2021 Sch 24 + Spring Statement 2025 HTML + ASA guidance verbatim WebFetched from legislation.gov.uk + gov.uk).
8. Fetch hero image from Pexels via `fetch_image_for_post(query)`.
9. Write markdown at `Property/web/content/blog/making-tax-digital-major-self-assessment-overhaul-ahead.md` (full frontmatter list per §4).
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

- **Stage 2 author:** MW3 Stage 2 Sub-Agent A (batch M3-A-B3) on 2026-05-27.
- **Stage 2 extensions added:** authority URL list (12 anchors covering TMA 1970 Sch A1 + F(No.2)A 2017 Sch 14 + SI 2021/1076 + FA 2021 Sch 24 + Spring Statement 2025 HTML + gov.uk MTD landing pages + software list + ASA guidance + PIM2000 + SAM50000 + TMA 1970 s.12B + original design document); 5 worked examples covering £50k-cohort-year-by-year-before-and-after (Ainsworth-Estate), £30k-cohort-deferral-runway (Browning-Estate), ASA-migration-with-joint-owner-mechanic (Crowther-Estate), digital-links-discipline (Davenport-Estate), £10k-abandoned-threshold-do-not-write (legacy competitor page); 12 FAQs anchored to the four-axis overhaul + mandate timeline + quarterly cycle + penalty regimes + software + ASA + £10k-abandoned context + voluntary opt-in + partnership/LtdCo position; voice + style + 19-step workflow stubs verbatim per §4.8 + §7.
- **§16.36 statutory-citation cross-check:** TMA 1970 Sch A1 insert by F(No.2)A 2017 Sch 14 verified at Wave 3 §19 lock. SI 2021/1076 regs 4 / 8 / 11 / 16 / 20 / 21 / 22 verified. FA 2021 Sch 24 points regime verified at Wave 3 §19.7 lock against gov.uk. Spring Statement 2025 HTML 3%/3%/10% on 15/30/31 day-triggers verified at Wave 3 §19.7 lock. £50k / £30k / £20k phased thresholds verified at Wave 3 §19.1 lock. £10k-abandoned context verified at Wave 3 §19.8 lock against gov.uk 19 December 2022 announcement. Stage 2 confirms no drift catches at brief-level review.
- **Anti-templating note:** this page sits in the orientation-level system-overhaul lane. The cannibalisation risk against sibling MTD pages (A6 / A7 / A11 / A18 / A19 / A20) is structural — each addresses a different intent slice. RUN session must hold the page in the four-axis overhaul backbone and route deep-dives to the sibling pages via cross-links. The F-1-adjacent drift watchpoint (legacy 31/46/91 day-triggers crossed with new 3%/3%/10% percentages) requires explicit care: sessions writing the §19.7 cascade content must use 15/30/31 day-triggers with the 3%/3%/10% rates. The FA 2021 Sch 24 vs FA 2007 Sch 24 numerical-name collision must be navigated explicitly (the page will mention both Sch 24s in different paragraphs because the penalty regime change cross-references both — the FA 2021 instrument is the new MTD points regime, FA 2007 is the inaccuracy regime). The £10,000-abandoned threshold must be called out as a do-not-write per §19.8 lock + Wave 7 §16.45 do-not-write pattern. Software-vendor product names must NOT be hard-coded per §19.6 lock.

### RUN session entry (populate at write time)

[RUN session records: H1 chosen, meta title + description chosen, competitor URLs fetched + key takeaways, existing-page review notes, citations added, internal links added, build attempts pass / fail, six-check verification, flags raised, 2-3 sentence summary.]

---

## Stage 1 seed work log

- **Stage 1 author:** MW3 Stage 1 Sub-Agent A (batch M3-A-B3) on 2026-05-27.
- **Cluster anchor:** MTD for ITSA — the **system-overhaul cultural-shift framing** specifically. Four-axis overhaul structure: filing frequency / record-form / software / agent route. Differentiated from sibling MTD picks: A6 news-framing, A7 exit-mechanic, A11 LtdCo, A18 qualifying-income deep-dive, A19 joint-owners, A20 penalty + exemption catalogue.
- **HP-lock alignment:** §19 (MTD ITSA architecture — Wave 3 lock, primary anchor) — full §19.1-§19.9 Wave 3 + §19.10-§19.17 Wave 4 extensions. No NEW HP LOCK NEEDED — fully covered.
- **§16.35 per-write verification note:** §19 figures (£50k/£30k/£20k thresholds; 3%/3%/10% on 15/30/31 day-triggers; £200 at 4-point threshold; 24-month points reset; software-list URL; quarterly cycle dates) verified at Wave 3 lock 2026-05-22 against gov.uk + Spring Statement 2025 HTML. Stage 2 + RUN must re-verify against gov.uk at write time per §16.27 rate-by-reference + §16.35 statute-verification discipline — particularly threshold figures (FA 2024 / 2025 may have further amended) and software-vendor list currency.
- **Cannibalisation reasoning:** No CANNIBAL flag. The system-overhaul cultural-shift frame is structurally distinct from sibling MTD picks (each addressing a different intent slice). The risk of A16 drifting into A18 (qualifying-income) territory or A20 (penalty catalogue) territory must be enforced at Stage 2 by holding the overhaul-narrative frame discipline — the page is the orientation-level "what is changing" page, not the deep-dive on any one mechanic.
- **Drift catches to flag for Stage 1b:** none new this seed. The F-1-adjacent risk (legacy 31/46/91 day-triggers crossed with new 3%/3%/10% percentages) recurs here — sessions writing the §19.7 cascade content must use 15/30/31 day-triggers with 3%/3%/10% per Wave 3 §19.7 lock. The FA 2021 Sch 24 vs FA 2007 Sch 24 numerical-name collision is a fresh drift watchpoint — sessions writing must NOT collapse the two Sch 24 instruments (one is the new MTD points regime, the other is the long-standing inaccuracy regime); flag for Stage 2 + Stage 1b cross-check.
