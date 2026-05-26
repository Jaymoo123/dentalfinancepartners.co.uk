---
slug: first-time-buyer-relief-calculator
category: property-types-and-specialist-tax
intent: Calculator-page companion to A7 (rates) and A10 (eligibility) in the SDLT first-time buyers' relief cluster. Provides scenario-by-scenario calculation walkthroughs across the £300k nil band, the £300k-£500k 5% band, the £500k absolute cliff edge, and the joint-purchase / additional-dwellings-surcharge interaction. Flags an interactive calculator component as a RUN-phase build candidate (component-spec sketched, build not committed at Stage 1).
---

# First-Time Buyer Relief Calculator: Worked SDLT Calculations Across the £300k Nil Band, the £300k-£500k 5% Slice, the £500k Cliff Edge, and the Joint-Purchase Trap

## Statutory anchor
- Primary: FA 2003 s.57B "First-time buyers" — "(1) Schedule 6ZA provides relief for first-time buyers." Verified at https://www.legislation.gov.uk/ukpga/2003/14/section/57B on 2026-05-26.
- Primary (operative): FA 2003 Schedule 6ZA "Relief for first-time buyers" — para 1(3) caps eligibility at £500,000; para 4 Table A: 0% on first £300,000, 5% on £300,000-£500,000. Verified at https://www.legislation.gov.uk/ukpga/2003/14/schedule/6ZA on 2026-05-26.
- Supporting: FA 2003 s.55 + Table A (standard residential rates that apply when relief is unavailable, including above the £500k cliff edge: 0% to £125k, 2% £125k-£250k, 5% £250k-£925k, 10% £925k-£1.5m, 12% above £1.5m, post-1-April-2025 reversion); FA 2003 Sch 4ZA (5% additional dwellings surcharge — disapplies FTB relief where applicable); HMRC gov.uk SDLT calculator (independent reference; Stage 2 verifies that the gov.uk calculator includes the FTB-relief tickbox option and that the figures match the rate-by-reference output of this page).
- House position reference: §1 main text (rate-table source-of-truth for both the FTB-relief table and the standard residential table); §1.I Wave 9 lock (5% surcharge from 31 October 2024 per FA 2025 s.51). **Same NEW HP-LOCK CANDIDATE as A7 + A10: §1.K "First-Time Buyers' Relief"** — calculator anchors on the locked rate position.

## Framing differentiator (anti-templating, anti-cannibalisation)

This page is the **calculator-and-worked-examples companion** in the FTB cluster. It sits adjacent to A7 (rates) and A10 (eligibility); where A7 lays out the rate table and A10 deep-dives the statutory definition, A11 provides **scenario-by-scenario calculations** across the relevant decision points (single-buyer-under-£300k; single-buyer-£300k-to-£500k; single-buyer-cliff-edge at £499,999 vs £500,001; joint-purchase with all-FTB buyers; joint-purchase with one non-FTB buyer; shared-ownership initial-share election; surcharge interaction).

The site has the gov.uk SDLT calculator (independent reference) and the existing `incorporation-cost-calculator-cgt-sdlt-implications` component (for portfolio incorporation, not FTB). It does NOT currently have a dedicated FTB-relief calculator component. A11 sets out:

1. The **calculation-walkthrough page** — written content showing each scenario calculation step by step, with the rate-by-reference figures (per §16.27 / §16.35 — every calculation verified against the legislation and the gov.uk calculator at write time). This is the Stage 1 / Stage 2 / RUN deliverable.
2. The **interactive calculator component candidate** — a `FirstTimeBuyerReliefCalculator.tsx` React component to be built and wired into the page at RUN phase OR deferred to a later wave. **Stage 2 / RUN decision: build the component now, or ship the calculation-walkthrough page first and add the component in a follow-up.** Existing site component pattern: `Property/web/src/components/calculators/` has `IncorporationCostCalculator.tsx`, `MTDCheckerCalculator.tsx`, `PortfolioProfitabilityCalculator.tsx`, `Section24Calculator.tsx` — follow that pattern for `FirstTimeBuyerReliefCalculator.tsx`. Wire into the page via the same import-and-render pattern.

This page covers five things the gov.uk calculator and competitor calculators do not: (a) the **cliff-edge worked example** at £499,999 vs £500,001 with the £2 increase producing a £2,500+ SDLT jump (most competitor calculators just produce a single figure for a given input; they do not illustrate the cliff); (b) the **joint-purchase-with-non-FTB-partner trap** worked through with both before-and-after figures (saving lost, surcharge added); (c) the **shared-ownership initial-share-election** calculation, which the gov.uk calculator handles but does not explain; (d) the **comparison to the standard rate table** at every input — showing the tax-saving figure as a delta, not just the after-relief SDLT figure; (e) the **1 April 2025 reversion narrative** in the worked examples (some users still expect £425k/£625k thresholds).

Distinguish from A7 (which has the rate table but not full worked examples beyond two-three illustrations) by **scenario coverage** (seven distinct scenarios in A11 vs three in A7); from the gov.uk calculator by **explanation depth and trap-illustration**; and from competitor calculators by **the integrated joint-purchase / shared-ownership / cliff-edge handling**. Target length 2,400-2,800 words.

## Key questions this page must answer

1. How do I calculate SDLT under FTB relief for a £250,000 purchase? (Pure-nil-band scenario: chargeable consideration £250k; FTB-relief Table A nil band runs to £300k; SDLT = £0. Compare to standard rate: £2,500. FTB saving £2,500.)
2. How do I calculate SDLT under FTB relief for a £400,000 purchase? (Mid-band scenario: £300k at 0% + £100k at 5% = £5,000. Compare to standard: 0% on £125k + 2% × £125k + 5% × £150k = £0 + £2,500 + £7,500 = £10,000. FTB saving £5,000.)
3. How does the £500,000 cliff edge work? (Worked example pair: £499,999 purchase with FTB relief = £9,999.95 (5% × £199,999). £500,001 purchase: FTB relief unavailable per Sch 6ZA para 1(3); standard residential rates: 0% × £125k + 2% × £125k + 5% × £250k + 5% × £1 = £0 + £2,500 + £12,500 + £0.05 = £15,000.05. £2 increase in consideration = £5,000.10 increase in SDLT.)
4. What if my partner is buying with me and they have owned property before? (Worked example: £450,000 joint purchase by an FTB and a non-FTB partner. FTB relief unavailable (Sch 6ZA para 1(4) — every joint buyer must be an FTB). Sch 4ZA additional dwellings surcharge applies if the non-FTB partner already owns another dwelling (5% on the whole £450k). SDLT calculation: standard rates plus 5% surcharge: 5% × £125k + 7% × £125k + 10% × £200k = £6,250 + £8,750 + £20,000 = £35,000. Compare to "if both were FTBs with no surcharge": 0% × £300k + 5% × £150k = £7,500. The trap costs £27,500.)
5. What about a shared-ownership initial-share purchase? (Worked example: a £250,000 initial share of a £500,000 full-market-value property under shared ownership. Election under Sch 6ZA paras 6A-6D: initial-share-only basis = SDLT computed on £250k under FTB relief = £0 (within £300k nil band). Market-value election = SDLT computed on £500k under FTB relief = £10,000. The initial-share-only basis is generally preferable but locks the buyer out of relief on subsequent staircasing transactions; the market-value election pre-pays SDLT on the whole future-staircased value at FTB rates now. Decision-tree walkthrough.)
6. What is the maximum SDLT saving I can claim? (£5,000 — at a £500,000 purchase by a sole FTB with no surcharge interaction. The saving plateaus at the £500k cliff edge; above it, the saving drops to zero because relief is unavailable.)
7. Do these figures apply in Wales or Scotland? (No. Wales has no FTB-specific relief; the £225k nil band serves the function. Scotland has its own LBTT FTB relief under LBTT(S)A 2013 Sch 4A with different bands. Cross-link to the existing Welsh + Scottish FTB pages.)
8. What about the 1 April 2025 reversion — do I use £300k/£500k or £425k/£625k? (£300k / £500k for all transactions with an effective date on or after 1 April 2025. The £425k / £625k temporary thresholds were in force 23 September 2022 to 31 March 2025. Pre-1-April-2025 effective-date transactions used the higher thresholds; post-1-April-2025 transactions use the lower thresholds. Effective date is per FA 2003 s.119 — earlier of completion or substantial performance.)
9. What documentation do I need to support the relief claim? (Stage 2 sub-agent describes the conveyancer's standard SDLT return process; the FTB declaration; supporting evidence for joint-purchase eligibility — passport, prior-property declarations, overseas-ownership confirmations where relevant.)

## Manager pre-decisions placeholder
- Category routing: `property-types-and-specialist-tax` (cluster cohesion).
- Worked-example numbers: seven scenarios per the Key Questions list; all figures rate-by-reference verified at write per §16.27 / §16.35; cross-check against gov.uk SDLT calculator output at write.
- Component build: defer the React component to a Stage 2 / RUN decision — note in the Work log section that the page is calculator-ready (component-spec sketched in this brief) but the Stage 1 seed does not commit to building the component now; the calculation-walkthrough text alone is sufficient for the page to ship usefully.
- Cross-link targets: A7 `applicable-sdlt-rates-for-first-time-buyers` (rates companion — heavy cross-link); A10 `first-time-buyer-relief-benefits-and-eligibility-requirements` (eligibility companion); A12 `first-time-buyer-relief-overcome-down-payment` (deposit-availability framing); existing `scottish-lbtt-first-time-buyer-relief-eligibility-mechanics`; existing `welsh-ltt-first-time-buyer-relief-mechanics-eligibility-comparison-england-scotland`; existing `sdlt-shared-ownership-staircasing`; existing `second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules`.

## Stage 2 research target list
- Competitor pages to fetch (Stage 2 verifies liveness; flag any still citing £425k/£625k thresholds): gov.uk SDLT calculator (the canonical reference); MoneySavingExpert SDLT calculator; Halifax / Nationwide / Barclays / NatWest first-time-buyer SDLT-saving pages (high-traffic mainstream sources); MoveiQ / Reallymoving / Habito SDLT calculator pages.
- Statutory verification at write: Sch 6ZA Table A (£300k/£500k bands); FA 2003 s.55 Table A (standard residential bands post-1-April-2025); Sch 4ZA surcharge interaction.
- Component-spec reference: `Property/web/src/components/calculators/Section24Calculator.tsx` (similar single-purpose calculator with React Hook-based state management; follow the import + state pattern).

## Stage 2 HP-lock resolution note

§1.K MW1 mini-lock (locked 2026-05-26) is the primary anchor. A11 explicitly listed in §1.K's anchored-pages set. No additional HP work required.

---

## Stage 2 calculator-component decision recommendation

**Recommendation:** ship calculation-walkthrough text only in the first cut; defer `FirstTimeBuyerReliefCalculator.tsx` React component build to a follow-up release. Rationale: (a) the calculation-walkthrough content carries answer-density on its own (seven scenarios with arithmetic illustrate the rate-table mechanics better than an opaque calculator widget would); (b) the gov.uk SDLT calculator is the canonical reference and competes structurally with any in-page widget; (c) RUN session can complete the page within the 19-step workflow without component-build overhead; (d) follow-up release lifts the page to a "calculator + walkthrough" model with no rewrite of the underlying calculation logic. RUN session may override if there is a strong UX argument; log override in work-log. Component-spec reference (for future build): `Property/web/src/components/calculators/Section24Calculator.tsx` (single-purpose state-managed calculator with React hooks).

---

## Closest existing pages (cannibalisation context, §4.5)

- A7 `applicable-sdlt-rates-for-first-time-buyers` (~0.55 sibling). Rate-table reference. **Differentiation:** A11 is the calculation walkthrough; A7 is the rate-table reference. Heavy bidirectional cross-link.
- A10 `first-time-buyer-relief-benefits-and-eligibility-requirements` (~0.50 sibling). Eligibility deep-dive. **Differentiation:** A11 walks the arithmetic; A10 walks the eligibility tests. Heavy bidirectional cross-link.
- A12 `first-time-buyer-relief-overcome-down-payment` (~0.42 sibling). Deposit framing. Cross-link.
- A13 `first-time-buyer-relief-understanding-tax-credits-and-deductions` (next batch). Cluster cohesion once shipped.
- `scottish-lbtt-first-time-buyer-relief-eligibility-mechanics` (~0.25 cannib). **Differentiation:** A11 is England + NI Sch 6ZA arithmetic; Scottish page is LBTT Sch 4A. Companion.
- `welsh-ltt-first-time-buyer-relief-mechanics-eligibility-comparison-england-scotland` (~0.20 cannib). Cross-link.
- `sdlt-shared-ownership-staircasing` (~0.18 cannib). **Differentiation:** A11 covers the FTB-relief shared-ownership election arithmetic; the staircasing page covers the broader staircasing arithmetic. Bidirectional cross-link.
- `second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules` (~0.20 cannib). Sch 4ZA arithmetic for the joint-purchase-trap worked example. Bidirectional cross-link.
- Existing site calculator components for comparison: `IncorporationCostCalculator.tsx`, `MTDCheckerCalculator.tsx`, `PortfolioProfitabilityCalculator.tsx`, `Section24Calculator.tsx` (each rendered into a single dedicated page) — RUN session reviews one for pattern reference if building the component.

**No CANNIBAL flag.** A11 is the FTB-arithmetic walkthrough; no overlapping arithmetic page on site.

---

## Redirect overlap (§4.6)

Stage 2 scan: no 301 entries for the A11 slug. **No middleware edit required.**

---

## Authority links (§4.7)

**Statutory:**
- FA 2003 s.57B — https://www.legislation.gov.uk/ukpga/2003/14/section/57B
- FA 2003 Schedule 6ZA paras 1, 4 (Table A), 6A-6D (shared-ownership) — https://www.legislation.gov.uk/ukpga/2003/14/schedule/6ZA
- FA 2003 s.55 + Table A (standard residential rates) — https://www.legislation.gov.uk/ukpga/2003/14/section/55
- FA 2003 Sch 4ZA (surcharge interaction in joint-purchase trap) — https://www.legislation.gov.uk/ukpga/2003/14/schedule/4ZA
- FA 2003 s.119 — https://www.legislation.gov.uk/ukpga/2003/14/section/119 (effective date — earlier of completion or substantial performance — relevant to the 1 April 2025 reversion question).

**Canonical calculator:**
- gov.uk SDLT calculator — https://www.tax.service.gov.uk/calculate-stamp-duty-land-tax/ (cross-check every worked example against this at write per §16.35).

**HMRC manuals:**
- SDLTM29800+ (FTB relief).
- SDLTM00500+ (residential rate table).
- SDLTM29870 (shared-ownership election with FTB relief).
- SDLTM09766 (surcharge interaction with FTB relief).

**Calculator-component reference (if built):**
- `Property/web/src/components/calculators/Section24Calculator.tsx` — single-purpose state-managed calculator pattern.
- `Property/web/src/components/calculators/IncorporationCostCalculator.tsx` — multi-input calculator with conditional output.

**Cross-references in house_positions.md:** §1.K (**primary anchor**); §1 main text; §1.I (Sch 4ZA surcharge); §23 (devolved cross-jurisdiction).

---

## Stage 2 statutory citation cross-check (§16.36 / §16.40)

| Citation | Quoted text (Stage 1 capture) | Stage 1 verify date | Status |
|---|---|---|---|
| FA 2003 s.57B(1) | "Schedule 6ZA provides relief for first-time buyers." | 2026-05-26 | verified |
| FA 2003 Sch 6ZA para 1(3) | £500,000 absolute cap | 2026-05-26 | verified |
| FA 2003 Sch 6ZA para 4 Table A | 0% to £300k; 5% £300k-£500k | 2026-05-26 | verified |
| FA 2003 Sch 6ZA paras 6A-6D | Shared-ownership election | 2026-05-26 | verified |
| FA 2003 s.55 Table A | 0% to £125k / 2% / 5% / 10% / 12% post-1-April-2025 | 2026-05-26 | verified — **RUN MUST cross-check every worked-example arithmetic against gov.uk SDLT calculator at write per §16.35** |
| FA 2003 Sch 4ZA | 5% additional dwellings surcharge | 2026-05-26 (per §1.I) | verified |
| FA 2003 s.119 | Effective date definition | 2026-05-26 | verified |

**Critical RUN-session requirement:** all seven worked-example scenarios (£250k pure-nil-band; £400k mid-band; £499,999 vs £500,001 cliff-edge pair; £450k joint-purchase trap; £250k shared-ownership initial-share; max-saving scenario; jurisdictional sanity-check) must be **arithmetically verified against the gov.uk SDLT calculator output** at write time. Per-write §16.35 mandate. Discrepancy = flag immediately + reconcile.

**Drift risk: LOW** on Sch 6ZA arithmetic (stable). **MEDIUM** on the post-1-April-2025 standard residential bands (verify at write).

---

## Stage 2 URL liveness verification (§16.31)

RUN session:
1. gov.uk SDLT calculator — verify accessible + producing current-rates output.
2. MSE / Halifax / Nationwide / Barclays / NatWest FTB SDLT calculator pages — site-search + liveness.
3. MoveiQ / Reallymoving / Habito calculator pages — liveness + flag any still using £425k/£625k thresholds.

**Stage 1 status:** competitor URLs at class level; statute URLs verified live 2026-05-26.

---

## Universal rules (§4.8 — verbatim)

### Voice
- **No em-dashes.** Commas, parentheses, full stops, middle dots only.
- Calculator pages: numerical precision is the brand asset. Every figure verified at write. Personas anonymised (Maya for £400k buyer; Daniel-Aisha for joint-purchase trap; the Singh family shared-ownership; etc.).

### Lead-gen architecture
- LeadForm auto-injected. `<aside>` styled by `.prose-blog aside`. No Tailwind classes.

### CTA placement guidance (per this page — calculator + walkthrough, high-intent moments)
- 3 inline `<aside>` CTAs at conversion moments:
  - After the cliff-edge worked example (£499,999 vs £500,001 pair).
  - After the joint-purchase trap worked example.
  - After the shared-ownership election walkthrough.
- Calculator audience is at the moment of calculation; CTA after the calculation-walk-through demonstrates highest intent.

### Schema
- FAQs in frontmatter `faqs:` array (target 10-12 — calculator pages have slightly fewer FAQs because the worked examples carry the answer-density).

### Cannibalisation
- A11 is the arithmetic walkthrough. Read A7 + A10 + A12 sibling briefs + Scottish + Welsh + shared-ownership-staircasing + surcharge pages before writing.

### House positions
- **§1.K is your primary working detail (verbatim-locked 2026-05-26).**
- §1.K do-not-write list (5 items) MUST hold.

### Quality bar
- Word count: 2,400-2,800 body.
- FAQs: 10-12.
- New external authority links: 6-8.
- Six verifications.
- **Calculator pages: every numerical figure cross-checked against gov.uk SDLT calculator output.**

### Anti-templating
- Open with **the £400k worked example as a numbered calculation**, demonstrating the calculation method on a typical input.
- Do NOT lead with "Use our calculator to see how much you could save..." or "Calculating your SDLT can be confusing..." — both saturated competitor leads.
- Vary H2s from A7 (rate-table-led) and A10 (eligibility-led). A11's H2 sequence should foreground the calculation scenarios: pure-nil-band → mid-band → cliff-edge → joint-purchase trap → shared-ownership election → max-saving → jurisdictional comparison.
- Recommended opener pattern: "A first-time buyer purchasing a £400,000 home in England or Northern Ireland pays £5,000 in Stamp Duty Land Tax under the first-time buyers' relief: 0% on the first £300,000 and 5% on the £100,000 above that. Standard residential rates on the same purchase would cost £10,000, so the relief saves £5,000. The page below walks through that calculation and six other scenarios that show where the relief delivers, where it stops, and where the joint-purchase trap reverses the saving entirely."

---

## 19-step workflow (verbatim, NETNEW_PROGRAM §7)

1. Read house_positions.md once (§1.K + §1 main + §1.I + §23).
2. Claim ONE page in MW1 tracker on MAIN.
3. Read brief.
4. Fetch competitor URLs + gov.uk SDLT calculator + MSE / Halifax / Nationwide / Habito calculators.
5. Read each closest-existing page.
6. Plan H2/H3 outline + meta + FAQs + 3 CTAs + 7 worked-example scenarios.
7. Verify factual claims per §16.35. **Cross-check every worked-example arithmetic against gov.uk SDLT calculator.**
8. Hero image: "calculator and house keys" or "first home calculation" via Pexels.
9. Write the markdown file at `Property/web/content/blog/first-time-buyer-relief-calculator.md`.
10. Build: `cd Property/web && npm run build`.
11. Six verifications.
12. Middleware (none).
13. Register in `monitored_pages`.
14. **Commit on branch BEFORE marking tracker done.**
15. Fill in work-log + log component-build decision (text-only vs build now).
16. Mark done on MAIN tracker.
17. Append site-wide flags (F-2..F-49 Bucket A).
18. Log discoveries.
19. Next page.

---

## Per-page work-log (RUN session fills in)

### Decisions
- **Final slug / category:** [confirm or override]
- **H1 chosen:** [final]
- **Meta title + char count:** ___
- **Meta description + char count:** ___
- **Component-build decision:** [text-only ship vs build `FirstTimeBuyerReliefCalculator.tsx` now + reasoning]
- **Why these vs other options:** [reasoning]

### Competitor URLs fetched
- [URLs + status + takeaways]
- gov.uk SDLT calculator cross-check result: [matches / discrepancy noted]

### Existing-page review
- A7 + A10 + A12 sibling reads; differentiation confirmed
- Shared-ownership page read; election treatment differentiation confirmed
- Surcharge page read; joint-purchase trap arithmetic differentiation confirmed

### Worked-example arithmetic verification (CRITICAL per §16.35)
- Scenario 1 £250k: ___ (verified against gov.uk: yes/no)
- Scenario 2 £400k: ___ (verified: yes/no)
- Scenario 3a £499,999 cliff: ___ (verified: yes/no)
- Scenario 3b £500,001 cliff: ___ (verified: yes/no)
- Scenario 4 joint-purchase trap £450k: ___ (verified: yes/no)
- Scenario 5 shared-ownership election: ___ (verified: yes/no)
- Scenario 6 max-saving: ___ (verified: yes/no)
- Discrepancies surfaced: ___

### Citations added
[List]

### Internal links added
1. A7 (rates companion)
2. A10 (eligibility companion)
3. A12 (deposit companion)
4. Scottish + Welsh FTB pages
5. shared-ownership-staircasing
6. additional-dwellings-surcharge-joint-owners
...

### Inline CTA placements
1. After cliff-edge worked example
2. After joint-purchase trap worked example
3. After shared-ownership election walkthrough

### Build attempts
- Attempt 1: [pass/fail]

### Verification (six checks)
- em-dash count: ___
- Tailwind utility classes: ___
- metaTitle length: ___ (limit 62)
- metaDescription length: ___ (limit 158)
- FAQ count: frontmatter ___ ; built HTML JSON-LD ___ ; match: yes/no
- Internal links resolve: yes/no
- Body word count: ___ (target 2,400-2,800)

### Flags raised
- [F-N if any]

### 2-3 sentence summary
[RUN session summary]
