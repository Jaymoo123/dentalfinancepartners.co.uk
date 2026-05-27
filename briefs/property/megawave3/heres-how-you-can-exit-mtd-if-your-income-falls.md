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

## Stage 2 research target list — extended

### Authority URLs (Stage 2 surfaces; RUN session WebFetches at write time per §16.35)

- **`https://www.legislation.gov.uk/uksi/2021/1076/contents/made`** — SI 2021/1076 Income Tax (Digital Requirements) Regulations 2021. RUN session reads Part 8 ("Other exemptions") regulations 20, 21, 22 verbatim. Reg 22 heading "Income exemption: persons to whom the digital requirements have applied for three tax years" is verbatim-locked; sessions must NOT paraphrase the heading without the "have applied for three tax years" qualifier.
- **`https://www.legislation.gov.uk/uksi/2021/1076/regulation/4`** — SI 2021/1076 reg 4 (Digital start date). RUN session reads the verbatim definition of digital start date to anchor the re-engagement mechanic.
- **`https://www.legislation.gov.uk/uksi/2021/1076/regulation/20`** — SI 2021/1076 reg 20 (Digital exclusion exemption). RUN session quotes the categories (age, disability, remoteness, religion, other reasonable circumstance) to distinguish from the income-drop exit.
- **`https://www.legislation.gov.uk/uksi/2021/1076/regulation/21`** — SI 2021/1076 reg 21 (Income exemption — general). RUN session anchors the qualifying-income test cross-reference.
- **`https://www.legislation.gov.uk/uksi/2021/1076/regulation/22`** — SI 2021/1076 reg 22 (Three-tax-year income exit). The operative regulation for this page; RUN session quotes verbatim.
- **`https://www.legislation.gov.uk/ukpga/1970/9/schedule/A1`** — TMA 1970 Schedule A1 (parent enabling power for digital requirements). RUN session anchors the statutory architecture.
- **`https://www.legislation.gov.uk/ukpga/2017/32/schedule/14`** — FA (No.2) 2017 Schedule 14 (the inserter of TMA 1970 Sch A1). RUN session reads at write time for the genealogy paragraph.
- **`https://www.gov.uk/guidance/check-if-youll-need-to-sign-up-for-making-tax-digital-for-income-tax`** — HMRC consumer-facing eligibility page. RUN session WebFetches at write time to verify the live URL (Wave 9 HMRC URL rot pattern) and the threshold schedule landed correctly.
- **`https://www.gov.uk/guidance/sign-up-your-business-for-making-tax-digital-for-income-tax`** — HMRC sign-up page. RUN session checks for any HMRC-published sister page on EXIT mechanics (expected late 2026 once operational portal goes live).
- **`https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim75000`** — BIM75000+ HMRC Business Income Manual on rental-income classification (relevant where landlord profile bleeds into self-employment + property aggregation).

### Competitor URLs (session-side WebSearch at write time)

`<!-- competitor section: per §16.31 Wave 8 + Wave 9 5/5 dead-rate pattern, Stage 2 did not pre-fetch firm-domain URLs. RUN session uses Google Search at write time. Recommended search queries: "exit MTD ITSA income falls three years", "SI 2021/1076 regulation 22", "MTD ITSA exit income exemption landlords". Target: 3-5 firm-side pages from MTD-software vendor knowledge bases (Xero, FreeAgent, QuickBooks, Sage MTD content) + accountancy practice MTD blogs. -->`

### Case-law

- **No substantive case-law on reg 22 specifically.** The regulations are too recent for FTT or UT decisions; sessions writing must NOT manufacture authorities. The legal architecture is regulatory-only at this stage. RUN session may cite analogous reasonable-excuse authority (Perrin v HMRC [2018] UKUT 156) only where the page addresses penalty-side consequences of mis-claiming the exit, NOT for the exit mechanic itself.

## Worked-example data (RUN session uses these as canvas)

### Example 1 — Landlord whose rental income falls below threshold after a property sale

- **Patel-Estate, the landlord:** owns a 5-property BTL portfolio generating £64,000 gross rental income in 2026/27 (above the £50,000 mandate threshold; mandated into MTD ITSA from 6 April 2026 digital start date).
- **Trigger:** the landlord sells two properties in October 2027, reducing the portfolio to 3 units and gross rental income to £38,000 for 2027/28, £39,000 for 2028/29, £41,000 for 2029/30. All three years fall below the £50,000 cohort threshold (the cohort-context threshold is sticky — the landlord was mandated at the £50k phase so tests against £50k for the exit window).
- **Operational route:** the landlord continues MTD ITSA quarterly cycles throughout 2027/28, 2028/29, 2029/30. At the end of 2029/30 (the third consecutive tax year below threshold), the landlord can notify HMRC under reg 22 of the intention to exit. The exit operates by notification, not automatically; sessions must NOT write "you exit when income drops". HMRC processes the notification; the exit takes effect from the next digital start date (6 April 2030).
- **Outcome:** from 6 April 2030 the landlord exits MTD ITSA quarterly cycles and returns to annual self-assessment. The landlord's chargeability to self-assessment under TMA 1970 s.7 continues; the EXIT is from the digital reporting cycle, not from self-assessment.

### Example 2 — Landlord with an income spike mid-window (failure to qualify)

- **Mawell-Estate, the landlord:** is in year 2 of a three-year qualifying window. 2027/28 income £35,000; 2028/29 income jumps to £52,000 (one-off insurance settlement classified as rental income under HMRC view — verify cohort-specific classification at write time).
- **Effect:** the three-year window resets. The landlord must accumulate THREE new consecutive tax years below the £50,000 threshold before reg 22 engages. The 2028/29 spike does not trigger penalty exposure (the landlord was in MTD ITSA throughout, complying with the quarterly cycle) but it kills the exit-window clock.
- **Operational point:** sessions should warn readers that the three-consecutive-year test is a sticky reset — any single year crossing the cohort threshold resets the clock entirely.

### Example 3 — Joint-property couple, both below threshold

- **Singh-Estate, joint owners:** husband and wife own 4 BTL properties as joint tenants. Joint gross rental income £56,000 in 2026/27. Under §19.4 / SI 2021/1076 reg 8 the qualifying-income test applies to each individual's share. With a 50:50 share each spouse's qualifying income is £28,000 — both BELOW the £50,000 phase threshold but ABOVE the £30,000 second-phase threshold.
- **Effect:** neither spouse is mandated at the April 2026 phase (income below £50k each); both are mandated at April 2027 phase (income above £30k each). From 6 April 2027 both spouses run separate MTD ITSA quarterly cycles. If joint income subsequently falls to £45,000 (each spouse £22,500) for three consecutive tax years, BOTH spouses can independently claim exit under reg 22. The exit is claimed individually, not as a couple; sessions must NOT collapse this into "the couple exits".
- **Operational point:** Form 17 spousal income elections under §24.2 can shift the income split, but the test still applies per-individual against the cohort threshold each was mandated at.

### Example 4 — Digital-exclusion exemption vs three-year income exit

- **Carmichael-Estate, the landlord:** is 72 years old, runs a 2-property portfolio generating £42,000 gross rental income annually, and lives in a rural area with intermittent broadband. The landlord was mandated into MTD ITSA from the April 2027 £30,000 phase. Three months into the first quarterly cycle, the landlord struggles operationally.
- **Two routes:** (a) reg 22 three-year income-drop exit — NOT available; income is stable above the £30,000 cohort threshold; the route does not engage. (b) reg 20 digital-exclusion exemption — available if the landlord can demonstrate that age + rural-broadband circumstances make digital tools impracticable. Reg 20 is the appropriate route here, NOT reg 22.
- **Operational point:** sessions must NOT conflate the two routes. Reg 22 is income-based and requires three years below threshold; reg 20 is circumstance-based (age, disability, remoteness, religion, other reasonable circumstance) and operates permanently once granted. A landlord facing operational difficulties whose income has not dropped should claim reg 20, not reg 22.

## FAQ expansion (RUN session polishes prose; 10-12 FAQs target)

1. **Q: Can I exit MTD ITSA if my rental income drops below the threshold?**
   A: Yes, but only via the three-tax-year income-drop exemption at regulation 22 of the Income Tax (Digital Requirements) Regulations 2021 (SI 2021/1076). The exit is claimed by notification to HMRC; it does NOT happen automatically when income falls. Three consecutive complete tax years below the cohort threshold must elapse before the notification can be made. Until exit takes effect, you continue all quarterly MTD ITSA obligations.

2. **Q: What is the cohort threshold for the three-year exit window?**
   A: The threshold is the phase threshold at which you were mandated into MTD ITSA. A landlord mandated from 6 April 2026 at the £50,000 phase tests against £50,000 for the exit; a landlord mandated from 6 April 2027 at the £30,000 phase tests against £30,000; a landlord mandated from 6 April 2028 at the £20,000 phase tests against £20,000. Sessions must NOT write "exit at £30k" without the cohort-context qualifier.

3. **Q: Does the three-year window count partial tax years?**
   A: No. Regulation 22 requires three complete consecutive tax years below the cohort threshold. A mid-year drop in income does not start the clock; the clock starts from the beginning of the first complete tax year in which income falls below threshold. A partial year cannot count toward the three.

4. **Q: What happens if income spikes briefly during the three-year window?**
   A: The clock resets entirely. A single tax year crossing the cohort threshold restarts the three-consecutive-year requirement. Sessions reading regulation 22 should treat the requirement as a strict sticky reset rather than a rolling average.

5. **Q: How do I notify HMRC of an exit under regulation 22?**
   A: HMRC operates the notification through the gov.uk Making Tax Digital portal. As of May 2026 the operational exit-notification page is in development; the canonical mechanism is via the agent services account (ASA) or the taxpayer's individual Personal Tax Account. The notification triggers an HMRC review and confirmation; the exit takes effect from the next digital start date after confirmation.

6. **Q: What is the difference between the three-year income exit and the digital-exclusion exemption?**
   A: Regulation 22 is income-based and requires three consecutive tax years below the cohort threshold; it operates as an exit from active MTD ITSA participation. Regulation 20 is circumstance-based (age, disability, remoteness, religion, or any other reasonable circumstance making digital tools impracticable); it operates as a permanent exemption granted at any point regardless of income. The two routes do not overlap; a landlord may claim whichever is appropriate but cannot stack them.

7. **Q: What happens to my current tax year's quarterly cycle when I exit?**
   A: The exit takes effect from the next digital start date after HMRC confirms the notification, which is the beginning of the following tax year. Quarterly updates for the current tax year remain due until the exit takes effect. Sessions should warn readers that the exit does NOT trigger immediate cessation of the quarterly cycle; the in-year cycle completes.

8. **Q: If I exit MTD ITSA, am I still in self-assessment?**
   A: Yes. The exit is from the digital reporting cycle (quarterly updates), not from chargeability to income tax or from the self-assessment regime itself. A landlord exiting MTD ITSA continues to file an annual self-assessment return under TMA 1970 s.7 if chargeable to tax. Exit from MTD ITSA does not equal exit from self-assessment.

9. **Q: What happens if my income rises above the threshold again after exit?**
   A: A previously-exempt person whose qualifying income subsequently crosses the cohort threshold re-engages with MTD ITSA at the digital start date for the relevant tax year under regulation 4. The lookback test applies to the most recent complete tax year. There is no transition period; once income crosses the threshold the digital start date re-engages.

10. **Q: Does the three-year exit operate per-individual for joint-property owners?**
    A: Yes. Under §19.4 / SI 2021/1076 reg 8 the qualifying-income test applies to each individual joint owner's share of the rental income. Each spouse or co-owner tests independently against the cohort threshold each was mandated at. A couple jointly below the threshold each claim exit independently; the exit is not granted to the couple as a unit.

11. **Q: Can I run a "preparing to exit" mode during the three-year window?**
    A: No. Regulation 22 does not contain a transitional or preparatory status. During the three-year window the landlord continues full MTD ITSA compliance — quarterly updates, end-of-period statements, the final declaration. The only operational change is the planning awareness that exit becomes available at the end of year three.

12. **Q: What is the boundary between exiting MTD ITSA and ceasing self-assessment entirely?**
    A: Exiting MTD ITSA (reg 22) returns the landlord to annual self-assessment without quarterly digital updates. Ceasing self-assessment entirely (e.g. on emigration with no UK chargeability, or on cessation of rental business with no remaining liability) is a separate process under TMA 1970 s.7 + HMRC's published cessation route. A landlord whose income has dropped but who still has UK chargeability stays on annual self-assessment after the reg 22 exit; only a landlord who ALSO ceases to have a tax liability can leave self-assessment altogether.

## Universal rules + workflow stubs (RUN session follows)

### Voice + style (verbatim per §4.8)

- **No em-dashes** in body copy. Use commas, parentheses, full stops, middle dots, or restructure the sentence.
- **Specific over generic.** Named legislation (SI 2021/1076 reg 22, reg 21, reg 20, reg 4; TMA 1970 Sch A1; FA (No.2) 2017 Sch 14), specific regulation numbers, anonymised personas.
- **No real names.** Anonymised personas (Patel-Estate, Mawell-Estate, Singh-Estate, Carmichael-Estate in the worked examples above).
- **Lead-gen architecture:** `<LeadForm>` auto-injected at footer. Do not duplicate in body.
- **CSS in markdown:** semantic HTML only. No Tailwind classes. `<aside>` styled by global CSS.
- **FAQs:** 10-14 entries in frontmatter `faqs:` array, auto-emitted as FAQPage JSON-LD by the build.
- **Anti-templating:** this page must hold the **regulation-22 three-tax-year income-drop exit** focus distinctly from sibling A20 (penalties + exemptions catalogue overview), A18 (qualifying-income test), and A19 (joint-property regime). Each H2 should reflect the EXIT mechanic + notification + cohort-threshold focus, not generic MTD architecture.
- **Quality bar (six checks):** zero em-dashes, zero Tailwind, FAQ schema count matches frontmatter array, meta title ≤ 62 chars, meta description ≤ 158 chars, internal links resolve.

### 19-step workflow (verbatim per §7)

1. Read `house_positions.md` at session start (esp §19 cluster + §19.1 threshold schedule + §19.2 qualifying income + §19.4 joint-property + §19.5 exit lock).
2. Claim this page in MW3 page tracker (⬜ → 🟡 with UTC timestamp).
3. Read this brief (framing differentiator, key questions, manager pre-decisions, research target list).
4. Fetch + read competitor URLs via session-side Google Search at write time (per §16.31 dead-rate pattern).
5. Read closest-existing pages: sibling MW3 A18 qualifying-income page, A19 joint-property page, A20 penalties+exemptions catalogue.
6. Plan H2 / H3 outline + meta + 10-14 FAQs + CTA placements — STRICTLY in the regulation-22 exit-mechanic angle; no overlap with sibling-page H2 structures.
7. Verify factual claims against authorities per §16.35 (SI 2021/1076 regs 4, 20, 21, 22 + TMA 1970 Sch A1 + FA (No.2) 2017 Sch 14 verbatim WebFetched from legislation.gov.uk).
8. Fetch hero image from Pexels via `fetch_image_for_post(query)`.
9. Write markdown at `Property/web/content/blog/heres-how-you-can-exit-mtd-if-your-income-falls.md` (full frontmatter list per §4).
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

- **Stage 2 author:** MW3 Stage 2 Sub-Agent A (batch M3-A-B2) on 2026-05-27.
- **Stage 2 extensions added:** authority URL list verified against legislation.gov.uk + gov.uk page paths (RUN session re-verifies live at write time per §16.31 + §16.35); 4 worked examples covering canonical exit, mid-window spike reset, joint-property couple, and digital-exclusion-vs-income-exit differentiation; 12 FAQs anchored to reg 22 mechanics + reg 20 boundary + cohort-threshold cohort-context discipline + joint-property per-individual rule; voice + style + 19-step workflow stubs verbatim per §4.8 + §7.
- **§16.36 statutory-citation cross-check:** SI 2021/1076 regs 4, 20, 21, 22 verified live 2026-05-27 (Stage 1 author + Stage 2 review); TMA 1970 Sch A1 + FA (No.2) 2017 Sch 14 architecture anchored to the Stage 1 seed verification + §19 lock alignment. No new drift catches at Stage 2 cross-check; the seed's citations are intact.
- **Anti-templating note:** highest risk on this slug is collapsing into sibling A20 (penalties + exemptions catalogue) breadth-mode or A18 (qualifying-income test) definition-mode. RUN session must hold the reg-22 exit-mechanic + notification + three-consecutive-year + cohort-threshold focus distinctly. The "exit is claimed, not automatic" mechanic and the "single spike resets the clock" mechanic are unique-to-reg-22 anchors for differentiation. The reg 20 / reg 22 differentiation in Example 4 is the most load-bearing anti-collapse signal — both regs sit inside Part 8 ("Other exemptions") but operate on entirely different bases.

### RUN session entry (populate at write time)

[RUN session records: H1 chosen, meta title + description chosen, competitor URLs fetched + key takeaways, existing-page review notes, citations added, internal links added, build attempts pass / fail, six-check verification, flags raised, 2-3 sentence summary.]

---

## Stage 1 seed work log

- **Stage 1 author:** MW3 Stage 1 Sub-Agent A (batch M3-A-B2) on 2026-05-27.
- **Cluster anchor:** MTD for ITSA — the three-tax-year income-drop exit limb specifically. Differentiation framing: operational exit-route depth (notification mechanic, current-year cycle question, re-entry mechanic, joint-owner interaction) inside the regulation-22 limb only; A20 sibling sweeps the full exemption catalogue.
- **HP-lock alignment:** §19.5 (Exit / income-drop rule) primary anchor — this page operationalises that lock for a single search intent. §19.1 (mandate timeline + threshold schedule) secondary. §19.2 (qualifying-income definition) tertiary. §19.4 (joint-property owners — exit interaction). No NEW HP LOCK NEEDED.
- **§16.35 per-write verification note:** SI 2021/1076 regs 20-22 + reg 4 verified live 2026-05-27 against legislation.gov.uk. Threshold schedule (£50k/£30k/£20k) per §19.1 already-verified Wave 3 lock. The "three consecutive tax years" framing is verbatim from reg 22 heading; reg 22 also requires that the digital requirements HAVE APPLIED for three tax years (i.e. you must have been IN for three years before the exit window opens — sessions should not write "three years below threshold" without the "after MTD has applied" precondition).
- **Cannibalisation reasoning:** Closest sibling is A20 (penalties + exemptions catalogue overview). A20 is breadth; A7 is depth-on-one-limb. Both pages co-exist as distinct intents — searcher landing on "exit MTD income drops" wants the operational mechanics; searcher landing on "MTD penalties exemptions" wants the catalogue. Reciprocal cross-link required. No CANNIBAL flag.
- **Drift catches to flag for Stage 1b:** none new this seed. The §19.7 penalty regime correction (15/30/31 day-triggers + 3%/3%/10% percentages) is upstream-of-this-page and does not need re-flagging; sessions must use the corrected figures if they touch penalty content for a landlord who has missed a quarterly cycle while preparing to claim exit.
