# R2 premium in-blog tool fleet — build brief (Holloway Davies / generalist)

**Status: BUILDABLE. Authored 2026-07-05 by the R2 architect-designer. For Sonnet workers.**

This is the complete, grounded brief for the generalist site's premium in-blog calculator fleet: the R2 CRO-parity workstream that mirrors Property's premium tier. Every number below traces to `docs/generalist/house_positions.md` (`§N`) or to an existing generalist compute lib (which itself traces to `src/lib/uk-tax-rates.ts`, the single canonical rate source). Sonnet workers must NOT invent a rate: wrap or extend the existing compute libs, never fork the maths.

House rules that bind this build (from MEMORY + house_positions): UK English, **no em-dashes** (commas, parentheses, full stops, middle dots only), gold-standard A* bar (each tool must be genuinely more useful than the free public tools it competes with), no DJH mentions, no named-expert claims, additive and SEO-safe (same URLs, server copy/FAQs/schema untouched, islands are client-only children).

---

## 0. Grounding (verified against the real code, do not re-derive)

- **Types are shared, not generalist-local.** `CalcField`, `CalcValues`, `CalcResult`, `CalcResultRow`, `ComputeFn` all come from `@accounting-network/web-shared/tools/types`. `CalcField.type` is `"currency" | "number" | "select" | "toggle"` (a boolean field is `type:"toggle"`, there is no `"checkbox"`). `CalcField` supports `advanced?: boolean` (unused so far — we will use it). `CalcResult` has an optional `verdict?: {text, positive}` for yes/no checkers. `gbp()` and `pct()` live in `@accounting-network/web-shared/tools/format`.
- **The premium tier does NOT exist on generalist yet.** There is no `lib/calculators/` tree and no `premium/` dir anywhere. This build creates `src/lib/calculators/premium/**` and `src/components/calculators/premium/**` from scratch, porting Property's pattern.
- **The 7 existing compute libs are pure and cleanly typed** (`src/lib/tools/compute/*.ts`), each golden-tested in `src/lib/tools/compute/compute.test.ts`. The 7 configs (`src/lib/tools/configs/*.ts`) are thin: they unwrap `values`, call the pure compute fn, and format with `gbp`. This is exactly the seam we reuse: a premium `compute()` calls the SAME exported functions.
- **Canonical rates (2026/27, from `uk-tax-rates.ts`):** dividend 10.75% / 35.75% / 39.35%, allowance £500 (§4). Employer NIC 15% above £5,000 secondary threshold, Employment Allowance £10,500 (§4, §9). CT 19% / 25%, marginal 26.5% (hardcoded `0.265`) between £50k and £250k (§3). CGT 18% / 24%, AEA £3,000 (§5). BADR £1m lifetime, 14% to 5 Apr 2026 then 18% (§5). VAT reg £90,000, FRS limited-cost 16.5% (§7). R&D merged RDEC 20% (taxable, ×0.75 net = 15p), ERIS intensive 30% threshold, 1.86×14.5% ≈ 26.97p payable (§ R&D). AMAP 55p first 10k miles from 6 Apr 2026 (§12). Pension AA £60,000, taper from £260k adjusted income, floor £10,000 (§10).
- **Brand tokens (generalist, NOT Property's emerald):** primary is `orange-500`/`orange-600`, ink is `neutral-900`, accents `slate`. `btnPrimary` and the outline utilities live in `src/components/ui/layout-utils.ts`. The premium components must be re-skinned to orange — do NOT copy Property's emerald class strings verbatim.
- **Analytics event allowlist** (`packages/web-shared/analytics/types.ts`) already contains every event the premium tier needs: `calc_view`, `calc_input_change`, `calc_computed`, `calc_result_viewed`, `cta_click`, `gate_view`, `resource_unlocked`, `lead_submitted`. **Do not add new event names.** The result-gate skip is a `cta_click` with `{cta_id:"result_gate_skip", placement:"result_gate"}` (as Property does).
- **`isConverted()`** is exported from `@accounting-network/web-shared/analytics/visitMemory` (used for the gate bypass).
- **Blog injection point:** `src/components/blog/BlogPostRenderer.tsx`, `splitContentAtMidScroll(html)` splits after the ~60% H2 and injects `<InlineMiniLeadForm topic={post.category} />`. NOTE the existing call passes the HUMAN label `post.category`; our injection MUST use the SLUG via `topicForBlogSlug(categorySlug)` (the helper already exists in `src/lib/intent/taxonomy.ts`). Short posts (<4 H2s) return `after:null` and get no mid-split island — add an end-of-article fallback so they still get the premium tool.
- **Missing deps / primitives (real build cost — flag in the manifest):** generalist has NO `recharts`, NO `@radix-ui/react-slider`, NO `@radix-ui/react-collapsible`, and NO shadcn `ui/{input,label,slider,collapsible,chart}` primitives (only `accordion`). Two options, decided per §5 below.

---

## 1. Tool set — 6 premium tools, one per high-traffic topic

Chosen to (a) map one-to-one onto the intent taxonomy topics that carry the most blog traffic, (b) reuse an existing compute lib with zero maths forked, and (c) each beat the free public equivalent by adding a scenario comparison, a break-even, or a checklist the free tools omit. Topics `compliance` (no primary calculator) and `sole-trader`'s take-home are covered indirectly; the 6 below hit the 6 revenue-intent clusters.

| # | Tool key / slug | Topic (taxonomy `TopicKey`) | Reuses compute lib | Premium value over the free version |
|---|---|---|---|---|
| 1 | `director-pay-premium` | `director-pay` (+ surfaces on `limited-company`, `incorporation`) | `salary-dividend.ts` | Salary vs dividend split with EA on/off scenario + net-cash headline + tax-stack breakdown chart |
| 2 | `incorporation-premium` | `incorporation` | `salary-dividend.ts` + `take-home-pay.ts` | Sole trader vs limited company side-by-side on the SAME profit, with the annual net-cash difference |
| 3 | `vat-scheme-premium` | `vat-mtd` | `vat-scheme.ts` | Standard vs Flat Rate side-by-side with the limited-cost-trader verdict and the annual £ difference |
| 4 | `employer-cost-premium` | `payroll` | `employer-ni.ts` | Editable staff mini-grid → true loaded cost (salary + 15% NIC + EA + 3% pension), per hire and total |
| 5 | `rd-estimator-premium` | `rnd` | `rd-credit.ts` | Qualifying-spend build-up + the ERIS-vs-RDEC branch verdict (intensity test) and the payable/net benefit |
| 6 | `badr-exit-premium` | `exit-cgt` | `badr-cgt.ts` | 2025/26 vs 2026/27 BADR-rate comparison (the live 6 Apr 2026 14%→18% timing lever) + net-proceeds |

Each spec below gives: id/slug, topic, inputs (with defaults), computed outputs, the compute call, and the result-copy angle.

---

### Tool 1 — Salary and dividend take-home planner (`director-pay-premium`)

- **Topic:** `director-pay`. Also surfaced on `limited-company` and `incorporation` posts (their taxonomy `primaryCalculator` is `salary-dividend-optimiser`, so the resource mapping in §3 routes them here too).
- **Reuses:** `modelExtraction(salary, profitBeforeDirector, useEA)` and `findOptimalSalary(profitBeforeDirector, useEA)` from `compute/salary-dividend.ts`. No extension needed.
- **Inputs (`fields`):**
  - `profit` currency, default `80000`, min `0`, max `500000`, step `1000`, help "Company profit before your salary and any employer pension."
  - `salaryChoice` select, default `"optimal"`, options `[{optimal, "Let the tool pick the tax-efficient salary"}, {secondary, "£5,000 (secondary threshold, no employer NIC)"}, {pa, "£12,570 (full personal allowance)"}]`.
  - `useEA` toggle, default `false`, label "Claim the £10,500 Employment Allowance?", help "Only where you have a genuine second employee, not a single-director company (§4)."
- **compute():** resolve the salary from `salaryChoice` (`optimal` → `findOptimalSalary(profit, useEA).salary`; `secondary` → 5000; `pa` → 12570), then `modelExtraction(salary, profit, useEA)`. Headline = `gbp(r.netCash)` labelled "Net cash in your pocket", tone `good`. Breakdown rows: salary, dividend, employer NIC, corporation tax, dividend tax, total tax (strong), net cash (strong). Chart (grouped bar, one bar group "Where the money goes"): net cash vs total tax. `note` must date-tag dividend rates (10.75%/35.75%/39.35% from 6 Apr 2026) and state the EA single-director exclusion.
- **Result-copy angle:** "On £80,000 of profit, a £12,570 salary plus dividends leaves you about £55,890 after all taxes; the tool shows exactly where every pound of the tax goes."

### Tool 2 — Sole trader vs limited company comparison (`incorporation-premium`)

- **Topic:** `incorporation`.
- **Reuses:** for the company leg, `modelExtraction`/`findOptimalSalary` from `salary-dividend.ts`. For the sole-trader leg we need income tax + **Class 4 NIC** (6%/2%, §2), which `take-home-pay.ts` does NOT compute (it does employee Class 1 NIC). **Small extension required:** add a pure helper `soleTraderTax(profit)` to a new thin lib `src/lib/calculators/premium/lib/sole-trader.ts` that reuses `calcIncomeTaxTHP` from `compute/take-home-pay.ts` for the income tax and adds Class 4 (6% between £12,570 and £50,270, 2% above — §2, values from `uk-tax-rates.ts nationalInsurance.selfEmployed`). Do NOT re-implement income tax; import it. Golden-test the new helper.
- **Inputs:** `profit` currency default `80000` min `0` max `500000` step `1000`; `useEA` toggle default `false` (company leg only).
- **compute():** returns TWO `scenarioResults` (sole trader, limited company) always shown side by side (no switcher). Sole trader: income tax + Class 4, net cash = profit − those. Company: `modelExtraction(optimalSalary, profit, useEA)`, net cash = `r.netCash`. Headline = the annual difference, tone `good` if company wins, `warn` if not. `best:true` on the higher net-cash column. `note`: incorporation is a calculation not a default (§1.A), flag admin/dividend-rise, and that this ignores incorporation CGT/goodwill (§1.A) — direct to a specialist.
- **Result-copy angle:** "See the real after-tax gap between staying a sole trader and running a limited company on the same profit, before you weigh the extra admin."

### Tool 3 — VAT scheme chooser: Standard vs Flat Rate (`vat-scheme-premium`)

- **Topic:** `vat-mtd`.
- **Reuses:** `compareVATSchemes(turnover, vatInputs, goodsSpend)` from `compute/vat-scheme.ts`. No extension.
- **Inputs:** `turnover` currency default `100000` min `0` max `500000` step `5000` help "Your VAT-taxable turnover for the year, excluding VAT."; `vatInputs` currency default `2000` min `0` max `100000` step `500` help "The VAT you pay on business purchases and could reclaim."; `goodsSpend` currency default `500` min `0` max `100000` step `500` help "Annual spend on goods (not services). Under 2% of turnover or under £1,000 makes you a limited cost trader at the 16.5% flat rate (§7)."
- **compute():** call `compareVATSchemes`. Use `verdict` = `{text: res.bestScheme === "Standard" ? "Standard VAT accounting wins here" : "The Flat Rate Scheme wins here", positive:true}`. Two `scenarioResults` (Standard: net VAT payable; Flat Rate: flat payment + amount kept), `best` on the winner. Breakdown: VAT collected, standard net, flat rate % applied, flat payment, annual saving (strong). If `res.lctApplies`, the note must explain the 16.5% limited-cost rate is why the FRS is usually unattractive for service businesses (§7).
- **Result-copy angle:** "Enter three numbers and see, in pounds, which VAT scheme leaves your business better off, including the limited-cost-trader trap most contractors fall into."

### Tool 4 — Employer NIC and true cost-of-hire planner (`employer-cost-premium`)

- **Topic:** `payroll`.
- **Reuses:** `calcEmployerNIFleet(employees, useEA, includePension)` and `calcSingleEmployerNi`, `calcMinPensionEmployer` from `compute/employer-ni.ts`. No extension.
- **Inputs:** an editable **mini-grid** of staff (this is the one tool that uses `GridConfig`) plus two scalar toggles.
  - `grid`: columns `[{id:"role", label:"Role", type:"text"}, {id:"salary", label:"Annual salary", type:"currency", step:1000}]`. `rowFactory(i)` → `{id:"emp-"+i+"-"+random, role: i===0 ? "First hire" : "Employee "+(i+1), salary: 30000}`. `minRows:1`, `maxRows:10`, `addLabel:"+ Add an employee"`, `heading:"Your team"`.
  - `useEA` toggle default `true`, label "Claim the £10,500 Employment Allowance?", help "Available where you have at least one non-director employee; not a single-director company (§9)."
  - `includePension` toggle default `true`, label "Include auto-enrolment pension (3% employer)?", help "Minimum employer contribution on qualifying earnings above £6,240 (§9)."
- **compute():** map grid rows to `Employee[]` (`{id, role, salary}`), call `calcEmployerNIFleet`. Headline = `gbp(res.totalEmploymentCost)` labelled "True annual cost of your team", sub = `gbp(res.monthlyTotal) + "/month"`. Breakdown: gross salaries, employer NIC (before EA), EA applied, NIC after EA, pension, total (strong). If `res.eaEligibleWarning` (EA claimed with <2 employees) surface a caution row. `note`: the loaded cost is salary + 15% NIC above £5,000 + 3% pension + payroll running cost + on-costs (§9), and the EA single-director exclusion.
- **Result-copy angle:** "Add your team and see the real cost of employing them, not the headline salaries: employer NIC, the Employment Allowance and the 3% pension all folded in."

### Tool 5 — R&D tax relief estimator (`rd-estimator-premium`)

- **Topic:** `rnd`.
- **Reuses:** `calcRDCredit(totalExpenditure, staffCost, subcontractorCost, consumablesCost, softwareCost)` from `compute/rd-credit.ts`. No extension.
- **Inputs:** `totalExpenditure` currency default `500000` min `0` max `5000000` step `10000` help "Your total operating expenditure for the year (used to test R&D intensity)."; `staffCost` currency default `120000`; `subcontractorCost` currency default `0` help "Only 65% of subcontractor cost qualifies (§ R&D)."; `consumablesCost` currency default `10000`; `softwareCost` currency default `5000`.
- **compute():** call `calcRDCredit`. `verdict` = `{text: res.isIntensive ? "You look R&D-intensive: ERIS route" : "Merged RDEC scheme route", positive:true}`. Headline = `gbp(res.netBenefit)` labelled "Estimated net R&D benefit". Breakdown: qualifying spend (strong), intensity ratio `pct(res.intensityRatio*100)`, credit rate `pct(res.creditRate*100)`, gross credit, net benefit (strong). Chart optional (see §5). `note`: intensity threshold is 30% for periods from 1 Apr 2024; ERIS 1.86×14.5% payable (not taxable), merged RDEC 20% taxable so 15p net; directional estimate only (PAYE cap, loss position, grants, connected parties all bite).
- **Result-copy angle:** "Enter your R&D spend and see whether you clear the 30% intensity test for the more generous ERIS route, and roughly what the claim is worth."

### Tool 6 — Exit and BADR timing planner (`badr-exit-premium`)

- **Topic:** `exit-cgt`.
- **Reuses:** `calcBADR(saleProceeds, originalCost, previousBADRUsed, year, meetsEligibility)` from `compute/badr-cgt.ts`. No extension.
- **Inputs:** `saleProceeds` currency default `600000` min `0` max `5000000` step `10000`; `originalCost` currency default `100000` min `0` max `5000000` step `10000` help "What you originally paid for the business or shares."; `previousBADRUsed` currency default `0` min `0` max `1000000` step `10000` help "BADR you have already claimed against your £1m lifetime limit (§5)."; `meetsEligibility` toggle default `true`, label "Do you meet the BADR conditions throughout the 2 years to sale?", help "5% shares + voting + officer/employee for a share sale; a trading business for an asset sale (§5)."
- **compute():** call `calcBADR` for BOTH years (`"2025/26"` and `"2026/27"`) and present as two `scenarioResults` so the reader sees the 14%→18% step. `best:true` on the lower-tax year (always 2025/26 while eligible). Headline = `gbp(res2026.totalTax)` labelled "CGT if you sell in 2026/27", sub = the £ extra vs 2025/26. Breakdown for the selected year: gain, eligible for BADR, taxed above the £1m limit at 24%, total CGT (strong), net proceeds (strong), effective rate `pct(res.effectiveRate*100)`. `note`: the 6 Apr 2026 step to 18% is a live planning lever for late-2025/26 completions (§5), the £1m lifetime limit, and that asset-vs-share sale structure changes everything (§5) — get it modelled.
- **Result-copy angle:** "See how much more CGT you pay by completing a business sale after 6 April 2026, when the BADR rate steps from 14% to 18%."

---

## 2. Golden test cases (per tool) — vitest goldens, exact figures

Every row below was computed by tracing the exact compute-lib logic. These become `src/lib/calculators/premium/premium.test.ts` (mirror the existing `compute.test.ts` style: a `describe` per tool, `r2 = n => Math.round(n*100)/100` helper for money, one worked-comment per case). Where a tool only re-wraps an existing golden-tested fn, the case asserts the wrapper passes inputs through unchanged. **Trace column states the source.**

### Tool 1 — `director-pay-premium` (via `modelExtraction` / `findOptimalSalary`)

| Inputs | Expected | Trace |
|---|---|---|
| profit 80000, salary optimal (=12570), useEA false | netCash **55889.87**, dividend 52476.46, employerNi 1135.50, corporationTax 13818.04, dividendTax 9156.58, totalTax 24110.13 | `findOptimalSalary(80000,false)` picks 12570; `modelExtraction(12570,80000,false)`. Rates §4. Verified. |
| profit 80000, salary secondary (=5000), useEA false | netCash **55137.21**, dividend 58875, employerNi 0, corporationTax 16125, dividendTax 8737.79 | `modelExtraction(5000,80000,false)`. £5,000 ≤ secondary threshold so employer NIC 0 (§4). Verified. |
| profit 30000, salary optimal, useEA false | assert `salary===12570` (optimal within band) and `netCash > 0` | `findOptimalSalary(30000,false)`. Sanity of the optimiser branch. |

### Tool 2 — `incorporation-premium` (company leg reuse + new `soleTraderTax`)

| Inputs | Expected | Trace |
|---|---|---|
| sole trader, profit 50000 | income tax `(50000-12570)*0.20 = 7486`; Class 4 `(50000-12570)*0.06 = 2245.80`; net `50000-7486-2245.80 = 40268.20` | `calcIncomeTaxTHP(50000).tax` (§2 income tax) + new Class 4 helper (6%, §2). Assert against `calcIncomeTaxTHP`, do not re-derive income tax. |
| sole trader, profit 12570 | income tax 0, Class 4 0, net 12570 | At the personal allowance / lower profits threshold (§2). |
| company vs sole, profit 80000, useEA false | company net **55889.87** (Tool-1 case A) > sole net; difference row = company − sole | Company leg is the verified Tool-1 golden; the comparison is deterministic. |

### Tool 3 — `vat-scheme-premium` (via `compareVATSchemes`)

| Inputs | Expected | Trace |
|---|---|---|
| turnover 100000, vatInputs 2000, goodsSpend 500 | vatCollected 20000, standardNet **18000**, lctApplies **true**, flatRate 0.165, flatNet 19800, bestScheme **"Standard"**, saving 1800 | `compareVATSchemes`. goods 500 < max(1000, 120000×0.02=2400) → LCT 16.5% (§7). Verified. |
| turnover 100000, vatInputs 15000, goodsSpend 30000 | standardNet **5000**, lctApplies **false**, flatRate 0.125, flatNet 15000, bestScheme "Standard", saving 10000 | goods 30000 ≥ 2400 → not LCT, marketing 12.5%. High reclaimable inputs favour Standard. Verified. |
| turnover 90000 (reg threshold), vatInputs 0, goodsSpend 0 | lctApplies true (0 < 1000), bestScheme "Standard" | Registration threshold £90,000 (§7). |

### Tool 4 — `employer-cost-premium` (via `calcEmployerNIFleet`)

| Inputs | Expected | Trace |
|---|---|---|
| 1 employee £30,000, useEA false, pension true | niTotal **3750** `(30000-5000)*0.15`, eaApplied 0, pensionTotal **712.80** `(30000-6240)*0.03`, totalEmploymentCost **34462.80** | `calcEmployerNIFleet`. Employer NIC 15%/£5,000 (§4/§9); pension 3% above £6,240 (§9). Verified. |
| 2 employees £30,000 + £25,000, useEA true, pension true | niTotal **6750**, eaApplied **6750** (capped at niTotal, ≥2 employees), niAfterEA **0**, pensionTotal 1275.60, totalEmploymentCost **56275.60** | EA £10,500 caps at NIC and needs ≥2 employees (§9). Verified. |
| 1 employee £30,000, useEA true | `eaEligibleWarning === true` (EA claimed with <2 employees) | Single-director/one-employee EA exclusion warning (§9). |

### Tool 5 — `rd-estimator-premium` (via `calcRDCredit`)

| Inputs | Expected | Trace |
|---|---|---|
| total 200000, staff 100000, sub/cons/sw 0 | qualifying 100000, intensityRatio **0.5**, isIntensive **true**, creditRate **0.2697**, netBenefit **26970** | 0.5 ≥ 0.30 → ERIS 1.86×14.5% (§ R&D). Verified. |
| total 500000, staff 100000, sub/cons/sw 0 | intensityRatio **0.2**, isIntensive **false**, creditRate 0.20, grossCredit 20000, netBenefit **15000** | 0.2 < 0.30 → merged RDEC 20% taxable ×(1−0.25) = 15p (§ R&D). Verified. |
| total 100000, staff 50000, sub 20000, cons 0, sw 0 | qualifying `50000 + 20000*0.65 = 63000`; intensity 0.63 → intensive | Subcontractor 65% haircut (§ R&D). |

### Tool 6 — `badr-exit-premium` (via `calcBADR`)

| Inputs | Expected | Trace |
|---|---|---|
| sale 600000, cost 100000, prev 0, 2026/27, eligible | gain 500000, badrTax **90000** (500000×0.18), totalTax 90000, netProceeds 510000, effectiveRate 0.18 | BADR 18% from 6 Apr 2026 (§5). Verified. |
| sale 600000, cost 100000, prev 0, 2025/26, eligible | badrTax **70000** (×0.14), netProceeds 530000, effectiveRate 0.14 | BADR 14% to 5 Apr 2026 (§5). Verified. The 20000 gap is the timing headline. |
| sale 1300000, cost 100000, prev 0, 2026/27, eligible | eligibleForBADR 1000000, notEligible 200000, badrTax 180000, standardTax **48000** (200000×0.24), totalTax **228000** | £1m lifetime cap; overflow at 24% (§5). Verified. |
| sale 600000, cost 100000, not eligible | standardTax **120000** (500000×0.24), totalTax 120000, effectiveRate 0.24 | Full standard CGT higher rate when BADR conditions fail (§5). Verified. |

---

## 3. Blog island placement map (topic → premium tool)

The premium tool is resolved from the blog category slug, exactly like Property. Build a generalist `src/lib/resources/registry.ts` (data-only, string-safe for the client bundle) keyed by `TopicKey`, holding at minimum `{ topic, toolId }` per flagship topic (leave `xlsx`/`guide` null for now — R2 is tools-only; the resource/download layer is a later phase). Set `resourceId = topic.key` on the six flagship topics in `taxonomy.ts` (additive; do NOT touch `TopicKey`, `blogCategorySlugs`, or `CALC_SLUG_TO_TOPIC`).

| Topic key | Blog category slug(s) that resolve here | Premium `toolId` |
|---|---|---|
| `director-pay` | `director-pay-and-dividends` | `director-pay-premium` |
| `limited-company` | `limited-company-tax` | `director-pay-premium` (shared — salary/dividend is the limited-company money question) |
| `incorporation` | `incorporation-and-structure` | `incorporation-premium` |
| `vat-mtd` | `vat-and-making-tax-digital` | `vat-scheme-premium` |
| `payroll` | `payroll-and-paye` | `employer-cost-premium` |
| `rnd` | `randd-tax-credits` (note: `&`→`and` so `R&D`→`randd`, per taxonomy comment) | `rd-estimator-premium` |
| `exit-cgt` | `exit-and-capital-gains` | `badr-exit-premium` |
| `sole-trader` | `sole-trader-and-self-employment` | `incorporation-premium` (the sole-trader-vs-ltd question is the natural in-blog tool for this cluster) |
| `compliance` | `bookkeeping-and-compliance`, `corporation-tax` | none (no premium tool; `PremiumUpgrade` renders null — safe) |

**`PremiumUpgrade` injection (mirror Property):** a `src/components/calculators/premium/PremiumUpgrade.tsx` client component takes `topic`, resolves `resourceForTopic(topic)?.toolId`, looks it up in the premium registry, and renders the desktop `PremiumCalculator` (inside `hidden sm:block`) or the `MobileToolSlot` (inside `sm:hidden`). If no config exists it renders `null` — so `BlogPostRenderer` can drop it in unconditionally.

**In `BlogPostRenderer.tsx`**, at the mid-scroll split, inject the premium island ALONGSIDE the existing `InlineMiniLeadForm` (do not remove the lead form). Compute the topic ONCE at the top of the renderer with `topicForBlogSlug(categorySlug)` (the SLUG, not `post.category`). Pass `placement="blog"` and `category={categorySlug}`. For short posts where `midSplit.after === null`, add an end-of-article fallback render of `<PremiumUpgrade topic={topic} placement="blog" category={categorySlug} />` (e.g. just before the FAQ section) so short posts still get a tool.

**`MobileToolSlot` behaviour:** the interactive tool is desktop-only (chart + sliders are cramped on mobile). On mobile, render a topic-aware `MiniCapture` (reuse `src/components/forms/MiniCapture.tsx`) with `formId="mobile_tool"`, `messagePrefix={"[Mobile tool: "+topic+"]"}`, heading from `getTopic(topic)?.ctaCopy`, orange-skinned card (`border-l-4 border-orange-600`). This converts mobile intent instead of dead-ending, matching Property's concluded `mobile_tool_capture` result.

---

## 4. ResultGateModal wiring

Port Property's `ResultGateModal.tsx` to generalist, re-skinned orange, driven by the same three non-negotiables. It is created new under `src/components/calculators/premium/` (or `src/components/calculators/` alongside `CalcResultCta`).

**Which placements gate:** IN-BLOG ONLY. In `PremiumCalculator`, `const gated = placement === "blog" && !isConverted();`. Calculator pages, embeds, and the mobile slot are NEVER gated. (R2 injects premium tools on blog posts only, so in practice every gated instance is a blog placement; keep the `placement` guard anyway so the component is reusable.)

**The three non-negotiables (copy these exactly from Property's behaviour):**
1. **The escape hatch ALWAYS reveals.** Closing the modal by any means (the X, the backdrop click, the Esc key, or the "No thanks, just show my result" link) calls `onReveal()` and shows the figure. The result is never walled off. Each dismissal fires exactly one `track("cta_click", {cta_id:"result_gate_skip", placement:"result_gate"})`.
2. **`isConverted()` visitors are NEVER gated.** They see the result instantly (they are already a lead). Submitting the gate form also marks the visitor converted via the lead path, so they are never re-gated.
3. **Once per session.** A module-scoped `let gateModalShownThisSession = false` in `PremiumCalculator` ensures the interstitial pops at most once per session; after it has shown, pressing "See your result" reveals directly without re-popping.

**Events (reuse the allowlist only — add nothing):**
- Tool lifecycle: `calc_view` (on scroll-into-view), `calc_input_change`, `calc_result_viewed`, `calc_computed` (debounced ~800ms) — all stamped with `{calculator_slug: config.id, placement, tool_kind:"premium", category}`.
- Gate: the interstitial fires `gate_view` on open (allowlisted) and `cta_click`/`result_gate_skip` on dismiss. Form submit goes through `MiniCapture`, which already emits `form_start`/`form_submit`/`lead_submitted`.
- CTA below a non-gated result: `CalcResultCta` (already exists on generalist) via `MiniCapture`. Do NOT invent a new event.

The gate's `MiniCapture` should use `formId="calc_result_gate"`, `messagePrefix={"[Result gate: "+campaign+"]"}`, heading from the derived topic's `ctaCopy`, `messageMinLength`/`messageMinWords` for lead quality (mirror Property: 40 chars / 8 words), and `onSuccess={onReveal}`.

---

## 5. File manifest for the build

All paths under `C:\Users\user\Documents\Accounting\generalist\web\` unless noted. **Nothing outside `generalist/web/` is modified** except the shared analytics allowlist which is NOT touched (all events already exist). Workers author non-overlapping files; only `premium/registry.ts`, `resources/registry.ts`, and `BlogPostRenderer.tsx` are shared-edit and must be coordinated (append-only registry lines).

### New — premium tool configs + maths seam (`src/lib/calculators/premium/`)
- `types.ts` — port of Property's premium types (`PremiumToolConfig`, `PremiumComputeContext`, `PremiumResult`, `GridConfig`, `GridColumn`, `GridRow`, `ScenarioConfig`, `ChartSpec`, `ScenarioResult`). Imports `CalcField`/`CalcValues`/`CalcResult`/`CalcResultRow` from `@accounting-network/web-shared/tools/types` and `TopicKey` from `@/lib/intent/taxonomy`.
- `registry.ts` — `PREMIUM_TOOLS: Record<string, PremiumToolConfig>` + `getPremiumTool()` + `hasPremiumTool()`. One import + one entry per tool.
- `tools/director-pay.ts`
- `tools/incorporation.ts`
- `tools/vat-scheme.ts`
- `tools/employer-cost.ts`
- `tools/rd-estimator.ts`
- `tools/badr-exit.ts`
- `lib/sole-trader.ts` — the ONLY new maths: `soleTraderTax(profit)` reusing `calcIncomeTaxTHP` + Class 4 NIC (§2). Pure, no React.
- `premium.test.ts` — the golden cases in §2 (mirror `compute/compute.test.ts` style).

### New — premium components (`src/components/calculators/premium/`)
- `PremiumCalculator.tsx` — port of Property's renderer, re-skinned orange, reusing the shared `track`/`useInViewOnce`/`isConverted` and the gate logic. Note the primitive gap below.
- `PremiumUpgrade.tsx` — topic → tool bridge (renders null when no config).
- `MobileToolSlot.tsx` — mobile qualified-capture (`MiniCapture`).
- `MiniGrid.tsx` — editable grid (only Tool 4 uses it; port from Property, orange skin, storage key `hd:grid:<toolId>` not `ptp:`).
- `ResultGateModal.tsx` — the gate (§4), orange-skinned.

### New — shadcn/radix primitives OR a lightweight substitute (DECISION REQUIRED, see flags)
Property's `PremiumCalculator` depends on `ui/{input,label,slider,collapsible,chart}` and `recharts`, none of which exist on generalist. **Recommended path (lower risk, fewer new deps):** build the premium components WITHOUT recharts and WITHOUT radix — use native `<input type="range">` for sliders, a `<details>`/`<summary>` for the "Advanced options" and "Show the workings" collapsibles, and a simple CSS bar (two divs with `width:%`) for the comparison visual instead of recharts. This keeps the generalist bundle lean and adds ZERO new dependencies. Files then:
- `src/components/calculators/premium/ui/Field.tsx` — the field renderer (number+slider, select segmented control, toggle) styled with generalist tokens.
- `src/components/calculators/premium/ui/MiniBarChart.tsx` — the CSS/SVG bar visual (no recharts).
If the manager prefers pixel-parity with Property, the alternative is to add `recharts`, `@radix-ui/react-slider`, `@radix-ui/react-collapsible` as deps and port the shadcn `ui/*` primitives — heavier, and a call for the manager (flagged below).

### New — resource registry (data-only)
- `src/lib/resources/registry.ts` — `CategoryResource {topic, toolId, xlsx:null, guide:null}` keyed by `TopicKey`; `RESOURCES` + `resourceForTopic(topic)`. (xlsx/guide left null; R2 is tools-only.)

### Modified (3 files, coordinated)
- `src/lib/intent/taxonomy.ts` — set `resourceId: "<key>"` on the six flagship topics (`director-pay`, `limited-company`→ point at director-pay tool via the resource map, `incorporation`, `vat-mtd`, `payroll`, `rnd`, `exit-cgt`, `sole-trader`). Purely additive to the existing `TOPICS` entries.
- `src/components/blog/BlogPostRenderer.tsx` — compute `const topic = topicForBlogSlug(categorySlug)` once; inject `<PremiumUpgrade topic={topic} placement="blog" category={categorySlug} />` at the mid-split (alongside `InlineMiniLeadForm`) and an end-of-article fallback when `midSplit.after === null`. Import from `@/lib/intent/taxonomy` and the new `PremiumUpgrade`.
- `package.json` — ONLY if the manager chooses the recharts/radix path (recommended path adds no deps).

### Not touched (guardrails)
- `packages/web-shared/**` (types, analytics allowlist, `track`, `format`, `Calculator.tsx`) — reused as-is, never edited.
- `src/lib/tools/**` (the 7 existing compute libs + configs + registry) — reused as-is; premium `compute()` imports the exported pure fns. The fleet registry, gallery, sitemap and `/calculators/*` pages are UNAFFECTED (premium registry is separate).
- `src/lib/uk-tax-rates.ts` — the single rate source; read, never edited.

---

## Build order

1. **Framework (sequential, renders nothing until a config exists):** premium `types.ts` + empty `registry.ts`; `resources/registry.ts` + taxonomy `resourceId`; `PremiumCalculator` + `Field` + `MiniBarChart` + `MiniGrid` + `PremiumUpgrade` + `MobileToolSlot` + `ResultGateModal`; `BlogPostRenderer` injection behind the null-render guard. Ship-safe with an empty registry (nothing renders).
2. **First tool end-to-end (proves the pipe):** `director-pay-premium` config + its goldens; verify blog injection, scroll `calc_view`, gate→reveal, mobile slot, CWV, schema unchanged.
3. **Remaining 5 tools in parallel** (non-overlapping files; only append one registry line each): incorporation (+ the `sole-trader.ts` helper + its golden), vat-scheme, employer-cost (+ mini-grid), rd-estimator, badr-exit. Each = one `tools/*.ts` + golden rows + one registry line.

---

## 10-line summary (for the manager)

1. Six premium in-blog tools, one per revenue-intent taxonomy topic: salary/dividend take-home (`director-pay`), sole-trader-vs-ltd (`incorporation`), VAT scheme chooser (`vat-mtd`), employer cost-of-hire with staff grid (`payroll`), R&D estimator (`rnd`), BADR exit-timing (`exit-cgt`).
2. Every tool wraps an EXISTING pure compute lib (`salary-dividend`, `take-home-pay`, `vat-scheme`, `employer-ni`, `rd-credit`, `badr-cgt`) — zero maths forked; rates trace to `uk-tax-rates.ts` and house_positions.
3. Only ONE new maths seam: a `soleTraderTax(profit)` helper for Tool 2 that reuses `calcIncomeTaxTHP` and adds Class 4 NIC (§2) — golden-tested.
4. All golden figures in §2 were computed by tracing the real lib logic and are exact (e.g. £80k profit → £55,889.87 net; BADR £500k gain 14%→18% = £70k vs £90k).
5. Placement, gate and events mirror Property exactly; blog injection must use `topicForBlogSlug(categorySlug)` (the SLUG), with an end-of-article fallback for <4-H2 short posts.
6. ResultGateModal keeps the three non-negotiables: escape always reveals, `isConverted()` never gated, once per session; events reuse the existing allowlist only (no new event names).
7. Generalist brand is orange-500/600 + neutral-900 (NOT Property's emerald) — components must be re-skinned, not copied verbatim.
8. **Decision needed:** generalist has NO recharts/radix/shadcn `ui/*` primitives. Recommended lean path uses native range inputs, `<details>` collapsibles and a CSS bar (zero new deps); the alternative adds recharts+radix for Property pixel-parity. Manager to choose.
9. R2 is tools-only: the resource/download (xlsx + guide) layer is scaffolded (`resources/registry.ts` with null assets) but deferred to a later phase.

Facts I could NOT fully verify (flag for manager):
- **BADR share-sale 5% conditions and asset-vs-share framing** are asserted in the tool `note` copy from house_positions §5; the tool computes only the rate/limit maths (correct), the eligibility toggle is user-declared — confirm the note wording is not over-claiming.
- **R&D ERIS payable-credit mechanics (86%/14.5%)** are in the compute lib and house_positions §R&D but house_positions Open-Item #4 flags they were "not separately re-verified at source" — the maths matches the lib, but if a manager wants source-grade certainty before shipping the R&D tool's headline £ figure, re-verify 86%/14.5% at gov.uk.
- **Self-employed Class 4 thresholds** (£12,570 / £50,270, 6%/2%) for the new `soleTraderTax` helper come from `uk-tax-rates.ts nationalInsurance.selfEmployed` and §2; confirm the lower/upper profits thresholds align with 2026/27 (the rates file lists `lowerProfitsThreshold 12570` but no explicit Class 4 upper limit — worker should use the income-tax higher-rate limit £50,270 per §2, confirm at build).
