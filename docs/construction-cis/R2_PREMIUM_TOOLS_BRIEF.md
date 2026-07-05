# construction-cis R2 premium in-blog tools brief (Trade Tax Specialists, bfp)

> Instantiation of `docs/_engines/CRO_PARITY_TEMPLATE.md` §2 (R2 - WS4) and §4 (R2 QA additions) for construction-cis. Twin of `docs/contractors-ir35/R2_PREMIUM_TOOLS_BRIEF.md`; QA both as one diff, two palettes. Ships AFTER the twin R1 synthetic probe passes. Model the shape on the SHIPPED Dentists/Medical premium fleets (`Dentists/web/src/lib/tools/premium/**`, `Medical/web/src/lib/tools/premium/**`, `Dentists/web/src/components/tools/premium/**`), NOT on Property emerald.
>
> This site is HP-LOCKED. Every figure below is traced to `docs/construction-cis/house_positions.md §N`. cis facts are CORRECT (CIS 0/20/30%, PA £12,570, Class 4 6%/2%, employer NIC 15%/£5,000, dividends 10.75/35.75/39.35, AMAP 55p/25p): no rate refresh, but see §0, this site has ZERO calculator goldens so R2 goldens start from scratch and the foundational suite is task 1.
>
> UK English. No em-dashes (commas, parentheses, full stops, middle dots). No DJH anywhere. Do NOT write code from this brief; it is the contract Sonnet workers build to and Opus QA judges against.

Storage prefix: **bfp** (FROZEN). Grid keys (none used in R2): `bfp:grid:<toolId>`. Never `ptp:` or `dfp:`. Tokens: construction orange `--accent: #f97316` + slate `--dark: #1e293b`; the site does NOT define `--gold` or `--navy` (those are Dentists-only), see §5.

---

## 0. THE cis-SPECIFIC PRE-WORK (foundational goldens BEFORE any premium wrapper)

The audit finding is load-bearing: **construction-cis has no compute golden tests at all** (confirmed: the six `*.test.ts` under `construction-cis/web` cover blog, leads and niche-config only; zero touch the 8 calculators). Worse, the existing compute functions are **not clean numeric primitives**:

- Every calculator is a `GenericTool` config object; its maths live in a `compute(values: CalcValues) => CalcResult` **property**, not an exported free function. You reuse it by calling `<config>.compute(values)` (e.g. `cisDeductionCalculator.compute({...})`), there is no `computeCisDeduction()` to import.
- `compute()` output is **already `gbp()`-formatted** (`"£" + Math.round(n).toLocaleString("en-GB")`). Every figure is rounded to whole pounds and stringified. There are no raw numbers in `CalcResult`.
- **There is no shared rates module.** PA `12570`, basic band `37700`, UEL `50270`, Class 4 `0.06`/`0.02`, CIS `0`/`0.20`/`0.30` are inline literals duplicated across `cis-deduction`, `cis-refund-estimator`, `cis-self-assessment`, `cis-vs-paye`, `cis-take-home`, `cis-invoice-splitter` and the nested `calcYear` closure in `cis-back-years`.

So R2 for cis is a two-part task and **task 1 gates task 2**:

### Task 1a. Pin the existing 8 computes with a golden characterisation suite
New file `construction-cis/web/src/lib/calculators/tools.test.ts`. For each of the 8 tools, import the config const and assert `<config>.compute(<default inputs>)` returns the EXACT `CalcResult` (headline string + every row string), plus one or two off-default cases per tool that exercise the branch logic (status ladder, higher-rate band, materials exclusion). These are characterisation goldens: they lock CURRENT behaviour to the penny (whole-pound strings) so the extraction in task 1b is provably behaviour-preserving. Derive every expected value by EXECUTING the compute in Node, never by hand. Trace each to the HP section (CIS rates §1, PA/bands §11a, Class 4 §11a). No `typeof`-only assertions.

### Task 1b. Extract a single-source-of-truth rates + logic module
New file `construction-cis/web/src/lib/calculators/cis-tax.ts` exporting:
- rate constants (verbatim from HP §1 + §11): `CIS_RATES = { gps: 0, registered: 0.20, unregistered: 0.30 }`, `PERSONAL_ALLOWANCE = 12570`, `BASIC_RATE_LIMIT = 37700`, `UEL = 50270`, income-tax `{ basic: 0.2, higher: 0.4, additional: 0.45 }`, Class 4 `{ main: 0.06, upper: 0.02, lowerLimit: 12570, upperLimit: 50270 }`, employee Class 1 `{ main: 0.08, upper: 0.02 }`, VAT standard `0.20`.
- pure numeric helpers returning NUMBERS (not strings): `cisDeduction({ gross, materials, rate })` (labour-only base, HP §1), `saLiability({ profit, otherIncome })` returning `{ incomeTax, class4Ni, total }` (the SA-liability maths that tools 3/4/7/8 all duplicate today), `class1EmployeeNi(gross)`, `class4Ni(profit)`.
- Then refactor the existing 8 tool computes AND the `cis-back-years` `calcYear` closure to import these helpers. Re-run task 1a goldens: they MUST still pass unchanged (behaviour-preserving). This is the only edit to the existing fleet files; the fleet registry, pages, gallery, sitemap and embeds are untouched.

Task 1b matters because the R2 premium tools (§1) COMPOSE these figures (refund into a planner, deduction into a comparison). Composing from `gbp()`-formatted strings would force string-parsing and lose precision. Premium `compute()` must import the numeric helpers from `cis-tax.ts` and never fork the maths.

### Two code-truth flags for the manager to rule on before task 1b (do NOT silently "fix" in a worker)
1. **GPS turnover cap not implemented.** `cis-gps-eligibility-checker` computes `threshold = 30000` for sole traders and `30000 * partners` otherwise, with NO £100,000 whole-business cap, but its explainer prose claims the £100k cap (HP §2 turnover table: partnership/company `£30,000 per partner OR £100,000 total`). The premium GPS scorer (§1 Tool 3) SHOULD implement the HP §2 rule correctly (`Math.min(30000 * n, ...)` is wrong; the HP rule is the LOWER of the two qualifying routes, i.e. you qualify if turnover >= min(per-head, whole-business)). Characterise the existing (capless) behaviour in task 1a; build the premium scorer to the correct HP §2 rule and note the divergence for the manager. Do not retro-change the fleet tool in this wave unless the manager signs it off as a factual fix.
2. **Employer NIC and computed AMAP do not exist in the compute layer.** Employer NIC 15%/£5,000 (HP §11) appears in no compute file; AMAP 55p (HP §11) appears only as field help-text, never computed. The §1 tools below are scoped so NONE of them needs net-new employer-NIC or mileage maths (the CIS-vs-PAYE tool is a subcontractor-vs-employee comparison and correctly uses employee Class 1 NIC, not employer NIC). If a future premium tool needs employer NIC, that is net-new maths with its own goldens, flag it, do not smuggle it in.

---

## 1. THE PREMIUM TOOL FLEET (3 tools)

Three tools, each mapped to a live cis intent topic (verified against `construction-cis/web/src/lib/intent/taxonomy.ts`), each composing existing cis computes via the `cis-tax.ts` helpers from task 1b. Topic keys available: `cis-refund`, `gross-payment-status`, `cis-deductions`, `self-assessment`, `limited-company`, `vat-reverse-charge`.

### Tool 1 - CIS refund and deduction planner
- **key / slug (toolId):** `cis-refund-planner-premium`
- **topic mapping:** `cis-refund` (primary). In `taxonomy.ts`, `cis-refund` covers blog slugs `cis-refunds` + `cis-basics` (the two largest categories, 16 + 5 posts), primaryCalculator `cis-refund-estimator`. This is the flagship: the refund hook is the site's strongest commercial differentiator (HP §9, §12.B).
- **compute reuse:** composes `cisDeduction()` (labour-only 20%/30% base, HP §1) with `saLiability()` (the over-deduction-vs-SA-liability model from `cis-refund-estimator`, HP §9). NO forked maths. The premium layer adds only the presentation and the sole-trader-vs-limited-company reclaim-route framing (HP §9: sole trader reclaims via SA after year-end; limited company reclaims in-year via EPS).
- **inputs + defaults:** `grossIncome` currency 45000; `materialsInvoiced` currency 5000 (help: materials are excluded from the CIS deduction base, HP §1); `status` select registered|unregistered default registered (drives the 20%/30% deduction, HP §1); `expenses` currency 4000; `otherIncome` currency 0; `reclaimRoute` select sole-trader|limited default sole-trader (advanced; changes only the note + timing copy, HP §9, not the arithmetic).
- **outputs:** headline `Estimated CIS refund` = `cisDeducted - totalLiability` (tone good when positive, warn when you owe). Breakdown rows: labour deduction base, CIS deducted at 20%/30%, allowable expenses, taxable profit, income tax, Class 4 NIC, total SA liability, refund/balance. Note states 2026/27 basis (PA £12,570, basic 20%, Class 4 6%/2%, HP §11a), the labour-only base (HP §1), the reclaim route timing (HP §9), and the market-average caveat if referenced (HP §13, "for content, not guaranteed", never "you will get £X").
- **chart series:** groupedBar, valueFormat currency, one datum, two series: `CIS deducted at source` (`var(--accent)` orange) and `Actual tax due` (`var(--dark)` slate). The visual gap IS the refund story. `chart` only rendered in the `full` (calculator-page) variant per PremiumCalculator; blog placement stays compact.
- **result-copy angle:** "Your CIS deductions are an advance, taken on labour before your expenses and allowance. Most registered subcontractors overpay across the year. Here is the gap between what was deducted and what you actually owe." Refund-as-entry-service, never rebate-factory (HP §12.B). No guaranteed-amount language.

### Tool 2 - CIS vs PAYE take-home comparison
- **key / slug (toolId):** `cis-vs-paye-premium`
- **topic mapping:** `limited-company` (primary). In `taxonomy.ts`, `limited-company` covers blog slug `limited-company`, primaryCalculator `cis-vs-paye-comparison`. (The topic label is "Limited company CIS accounting"; the tool answers "am I better off as a self-employed CIS subcontractor or on the books as an employee?", the natural next question in that cluster.)
- **compute reuse:** wraps `cis-vs-paye-comparison`'s existing maths via `cis-tax.ts`: CIS side uses `saLiability()` (income tax 20/40 + Class 4 6%/2% on labour profit); PAYE side uses `class1EmployeeNi()` (employee Class 1 8%/2%, HP §11a) + income tax. Take-home difference = CIS take-home − PAYE take-home. Correctly uses EMPLOYEE Class 1 NIC on the PAYE side, not employer NIC (a subbie-vs-employee comparison; employer NIC is the engager's cost, not the worker's, so it is out of scope here, see §0 flag 2).
- **inputs + defaults:** `grossEarnings` currency 45000; `cisExpenses` currency 5000; `cisRate` select 0|20|30 default 20 (the advance shown, HP §1).
- **outputs:** two `scenarioResults` tiles (CIS self-employed vs PAYE employee), `best` on the higher net take-home. Headline `Take-home difference`. Breakdown per scenario: gross, expenses (CIS only), income tax, NIC (Class 4 vs Class 1), take-home. Note states the 2026/27 rates verbatim (PA £12,570, basic 20%, higher 40%, Class 4 6%/2%, employee Class 1 8%/2%, HP §11a), that CIS take-home ignores employer-side costs and employment rights, and that the CIS advance is a cash-flow timing point not a final tax (HP §9).
- **chart series:** groupedBar, currency, two data groups (CIS, PAYE), two series: `Take-home` (`var(--accent)`) and `Total tax and NIC` (`var(--dark)`).
- **result-copy angle:** "Self-employed CIS and employed PAYE are taxed very differently. Self-employment usually leaves more in your pocket on the same gross, but you carry the CIS deduction timing, no holiday pay and no sick pay. Here is the like-for-like take-home." Balanced, never "always go self-employed".

### Tool 3 - Gross payment status readiness scorer
- **key / slug (toolId):** `cis-gps-readiness-premium`
- **topic mapping:** `gross-payment-status`. In `taxonomy.ts`, `gross-payment-status` covers blog slugs `cis-compliance` + `cis-advanced` (14 + 6 posts), primaryCalculator `cis-gps-eligibility-checker`. GPS is a genuine first-mover content opportunity (HP §3, §12).
- **compute reuse:** wraps the three-test scorer from `cis-gps-eligibility-checker` (business test, turnover test, compliance test, HP §2) BUT implements the HP §2 turnover table CORRECTLY (see §0 flag 1): sole trader £30,000; partnership/company qualify on `£30,000 per partner OR £100,000 whole-business` (pass if turnover meets EITHER route); closely controlled `£30,000 per controller`. Pull the threshold logic into `cis-tax.ts` as `gpsThreshold({ entityType, heads })`. The annual-saving figure = `turnover * 0.20` (the 20% no-longer-deducted, HP §1).
- **inputs + defaults:** `entityType` select sole_trader|partnership|limited|closely_controlled default sole_trader; `annualTurnover` currency 35000 (net CIS turnover, excludes VAT and materials, HP §2); `heads` number 1 (partners or directors/controllers, drives the per-head route); `filedOnTime` toggle true (compliance test, HP §2); `noOverdueTax` toggle true.
- **outputs:** headline is a readiness verdict, `Ready to apply for GPS` (tone good) or `Not yet, here is the gap` (tone warn), with `verdict` set. Breakdown rows: business test pass/fail, turnover test (your turnover vs the qualifying threshold with the route that applies), compliance test pass/fail, and the estimated annual cash-flow gain from 0% vs 20% at source. When failing, list the specific reasons (below threshold by £X; late filing; overdue tax). Note MUST pair qualifying with the April 2026 anti-fraud regime (HP §3): passing is no longer the end, keeping GPS turns on ongoing due diligence, and cite the 5-year reapplication ban and the ~£100k/year cash-flow cost on £500k turnover (HP §3). Tag Finance Act 2026, enacted, 6 April 2026 (never "Bill", HP §3).
- **chart:** none (this is a pass/fail scorecard, not a money comparison). Omit the `chart` spec entirely; PremiumCalculator renders scenario/breakdown only.
- **result-copy angle:** "Gross payment status means you are paid in full with no 20% taken at source, worth roughly £X a year in cash flow on your turnover. You need all three tests. Here is where you stand, and what April 2026 means for keeping it once you have it." Never promise approval.

Topic-to-tool spine (`resources.ts`, §3): `cis-refund -> cis-refund-planner-premium`; `gross-payment-status -> cis-gps-readiness-premium`; `limited-company -> cis-vs-paye-premium`; `cis-deductions -> cis-refund-planner-premium` (defensive alias: the deduction figure is the front half of the refund planner, so `expenses` blog readers land on the same tool); `self-assessment -> ""` (no dedicated premium tool in R2, the refund planner already surfaces the SA liability); `vat-reverse-charge -> ""` (no calculator, DRC is a conditions test not a money tool, HP §7).

---

## 2. GOLDEN TESTS (premium, task 2, derived by EXECUTING the libs)

New file `construction-cis/web/src/lib/calculators/premium/premium-tools.test.ts`, modelled on `Medical/web/src/lib/tools/premium/premium-tools.test.ts`. Every figure derived by running the compute in Node, with a conservation check where the maths allows. No `typeof`-only assertions (HP-traced exact pounds). Because premium computes now import numeric helpers from `cis-tax.ts`, the premium goldens double as the proof that composition equals the fleet tools.

Per tool, at minimum:
- **Tool 1 (refund planner), default inputs** (grossIncome 45000, materials 5000, registered, expenses 4000, otherIncome 0): pin `cisDeducted` (labour base `40000 * 0.20 = 8000`), `taxableProfit` (`40000 - 4000 = 36000`), income tax (`(36000-12570)*0.2 = 4686`), Class 4 (`(36000-12570)*0.06 = 1405.80`), total liability `6091.80`, refund `8000 - 6091.80 = 1908.20 -> headline "£1,908"`. Conservation: `cisDeducted - totalLiability = refund`. Add an unregistered case (30% base) and an owe case (low deductions) to exercise the warn branch. Execute to confirm every figure to the penny before pinning.
- **Tool 2 (CIS vs PAYE), default** (grossEarnings 45000, cisExpenses 5000, cisRate 20): pin CIS take-home, PAYE take-home and the difference; conservation `cisTakeHome = gross - expenses - cisTotalTax` and `payeTakeHome = gross - payeTotalTax`. Assert the PAYE side uses 8%/2% employee NIC and the CIS side uses 6%/2% Class 4 (a rate-mixing regression is exactly what a `typeof` test would miss).
- **Tool 3 (GPS scorer):** pin the pass/fail booleans and the qualifying threshold for each entity type. Sole trader 35000 vs 30000 -> turnover PASS. Partnership heads 3, turnover 95000 -> qualifies on the £30,000-per-partner route (90000) though below the £100,000 whole-business route -> PASS (this case is the one the existing fleet tool gets wrong; the golden proves the premium scorer is correct). Assert the annual-gain figure = `turnover * 0.20`.
- **Config-compute goldens:** assert `<config>.compute(defaults).headline.value` string, tone, and that no breakdown row contains `"NaN"` (NaN-safe coalescing, `Number(v.x) || 0`, mirrors the Medical/Dentists configs).
- **Compliance goldens** (copy the Medical pattern): no em-dash (the U+2014 character, or the double-hyphen substitute) in any title/intro/explainer/field label/help/note across all three configs; the string `"DJH"` appears nowhere; every emitted event name is on the allowlist.
- **Registry + spine goldens:** `hasPremiumTool` true for the 3 toolIds and false for unknown; `resourceForTopic` maps every TopicKey and returns null for null/undefined; the two empty-string topics (`self-assessment`, `vat-reverse-charge`) resolve to no tool.

Run: `npx vitest run --config packages/web-shared/vitest.config.ts construction-cis/web/src/lib/calculators/premium/premium-tools.test.ts` and the task-1a characterisation suite. Grep the raw output for `failed|npm error` and confirm the exact pass count; never trust an "OK" marker (lesson §5.1).

---

## 3. BLOG ISLAND PLACEMENT MAP (nested routing)

construction-cis uses NESTED blog routing (`/blog/[category]/[slug]`), so the topic is derived from the category SLUG exactly like Dentists. Wire in `construction-cis/web/src/components/blog/BlogPostRenderer.tsx`, mirroring the Dentists renderer:

- Compute the topic ONCE at the top: `const premiumTopic = topicForBlogSlug(categorySlug)` using the SLUG (`slugifyCategory(post.category)`), NEVER the human `post.category` label.
- At the mid-scroll split, inject `<PremiumUpgrade topic={premiumTopic} placement="blog" category={categorySlug} />` ALONGSIDE the R1 `InlineMiniLeadForm`, BEFORE the second content half. `PremiumUpgrade` renders nothing for unmapped topics, so the injection is unconditional and lights up only for `cis-refunds`/`cis-basics`/`cis-compliance`/`cis-advanced`/`limited-company`/`expenses` posts.
- End-of-article fallback: when `midSplit.after === null` (short posts, fewer than the h2 threshold), inject `<PremiumUpgrade>` at the end of the body so short posts still get the island. Copy the Dentists short-post fallback branch exactly.
- Coordinated shared edit: `BlogPostRenderer.tsx` is append-only shared territory; one worker owns the injection. Do not also mount the premium island anywhere else.

Category-slug to topic-to-tool resolution (verify against `taxonomy.ts` + `resources.ts`):

| Blog category (slug) | topic | premium tool surfaced |
|---|---|---|
| CIS Refunds (`cis-refunds`) | cis-refund | cis-refund-planner-premium |
| CIS Basics (`cis-basics`) | cis-refund | cis-refund-planner-premium |
| CIS Compliance (`cis-compliance`) | gross-payment-status | cis-gps-readiness-premium |
| CIS Advanced (`cis-advanced`) | gross-payment-status | cis-gps-readiness-premium |
| Expenses (`expenses`) | cis-deductions | cis-refund-planner-premium (alias) |
| Limited Company (`limited-company`) | limited-company | cis-vs-paye-premium |
| VAT and MTD (`vat-and-mtd`) | vat-reverse-charge | none (no tool) |
| Software and Tools (`software-and-tools`) | vat-reverse-charge | none (no tool) |

---

## 4. ResultGateModal WIRING (three non-negotiables + topicKey-as-prop + MiniCapture extension)

Port `Dentists/web/src/components/tools/premium/ResultGateModal.tsx` to `construction-cis/web/src/components/calculators/premium/ResultGateModal.tsx` (note the twins put calculator components under `components/calculators/`, not `components/tools/`). Re-skin to orange/slate tokens (§5).

**Three non-negotiables (copied verbatim in behaviour):**
1. **Escape hatch ALWAYS reveals.** X button, backdrop click, Esc key, and the "No thanks, just show my result" link each call `skip()`, which fires exactly one `cta_click { cta_id: "result_gate_skip", placement: "result_gate" }` and reveals the result. `result_gate_skip` is a VALUE on the allowlisted `cta_click` event, not a new event name.
2. **`isConverted()` visitors are NEVER gated.** Gating is `gated = placement === "blog" && !isConverted()` inside PremiumCalculator; converted visitors see the result instantly and get the non-gated `CalcResultCta` instead.
3. **Once per session.** Module-scoped `let gateModalShownThisSession = false` in PremiumCalculator; the gate opens at most once per session, thereafter "See your result" reveals directly.

**topicKey-as-prop:** thread `topicKey` from `PremiumUpgrade -> PremiumCalculator -> ResultGateModal` as a PROP. The gate resolves `getTopic(topicKey)` for its heading; it NEVER re-derives the topic from the URL.

**MiniCapture gate props (ADDITIVE EXTENSION REQUIRED):** the Dentists ResultGateModal passes `messagePlaceholder`, `messageMinLength`, `messageMinWords` and `onSuccess` to its MiniCapture. **The construction-cis MiniCapture (`components/forms/MiniCapture.tsx`) does NOT accept any of these four props today** (verified: its prop list is `formId, role, messagePrefix, heading, blurb, submitLabel, successText, className, experimentKey, exposeOnView`). So R2 must ADDITIVELY extend the cis MiniCapture (a coordinated shared-form edit, one worker) to accept:
- `messagePlaceholder?: string` -> the message `<textarea>` placeholder (default keeps the current string).
- `messageMinLength?: number` and `messageMinWords?: number` -> tighten the message validation in `validate()` (default keeps the current `>= 10 chars` rule; when set, require at least `messageMinLength` chars AND `messageMinWords` words, emitting `form_error` on failure, never swallowing).
- `onSuccess?: () => void` -> called after a successful submit (in addition to the existing state change), so the gate reveals the result on capture.

This extension is PURELY additive and backward-compatible: every existing MiniCapture caller (calc_result, exit-intent, inline, mobile) passes none of the four and behaves identically. It must NOT remove the R1 hardening (honeypot `enquiry_ref` passed to the server, validation aborts emit `form_error`, no silent drop). Keep the cis experiment shims (`experimentKey`/`exposeOnView`) intact even though R2 does not use them (0 experiments running). The gate MiniCapture call uses `formId="calc_result_gate"`, `messagePrefix="[Result gate: <toolId>]"`, gate-specific placeholder, `messageMinLength` ~40, `messageMinWords` ~8, `onSuccess={onReveal}`, and a CIS-specific blurb ("A calculator gives the shape of the answer. CIS deductions, refunds and gross payment status are unforgiving in the detail. Tell us your situation and a CIS specialist will confirm your exact figure and the sensible next step, with no obligation.").

**MobileToolSlot:** port `Dentists/.../MobileToolSlot.tsx` to `components/calculators/premium/MobileToolSlot.tsx`; the desktop-only chart-heavy calculator is replaced on `sm:hidden` by a topic-aware MiniCapture (`formId="mobile_tool"`, `messagePrefix="[Mobile tool: <topic>]"`, heading = topic `ctaCopy`, CIS desktop-tool blurb, `submitLabel="Send me my figure"`), left border `var(--accent)`.

---

## 5. FILE MANIFEST, BUILD ORDER, REGRESSION INVARIANTS

### File manifest (paths under `construction-cis/web/src/`)
New (lib):
- `lib/calculators/cis-tax.ts` (task 1b SSOT rates + numeric helpers)
- `lib/calculators/tools.test.ts` (task 1a characterisation goldens for the existing 8)
- `lib/calculators/premium/types.ts` (port `Medical/web/src/lib/tools/premium/types.ts`; import `CalcField/CalcValues/CalcResult/CalcResultRow` from `@accounting-network/web-shared/tools/types` and `TopicKey` from `@/lib/intent/taxonomy`)
- `lib/calculators/premium/registry.ts` (append-only, one line per tool)
- `lib/calculators/premium/resources.ts` (topic-to-toolId spine, §1)
- `lib/calculators/premium/configs/cis-refund-planner.ts`
- `lib/calculators/premium/configs/cis-vs-paye.ts`
- `lib/calculators/premium/configs/cis-gps-readiness.ts`
- `lib/calculators/premium/premium-tools.test.ts` (task 2 goldens)

New (components):
- `components/calculators/premium/PremiumCalculator.tsx` (port Dentists; fix import to `@/components/calculators/CalcResultCta`)
- `components/calculators/premium/PremiumUpgrade.tsx`
- `components/calculators/premium/MobileToolSlot.tsx`
- `components/calculators/premium/ResultGateModal.tsx`
- `components/calculators/premium/PremiumBarChart.tsx` (port Dentists `PremiumBarChart.tsx`; re-token)

Edited (coordinated, append-only or additive):
- `lib/calculators/tools/*.ts` (all 8: refactor to import from `cis-tax.ts`; behaviour-preserving, task-1a goldens must still pass)
- `components/forms/MiniCapture.tsx` (ADDITIVE gate props, §4)
- `components/blog/BlogPostRenderer.tsx` (inject `PremiumUpgrade`, §3)

### Build order
1. Task 1a: write `tools.test.ts` characterisation goldens against the current fleet; green (locks current behaviour).
2. Task 1b: write `cis-tax.ts`; refactor the 8 tool computes to import it; re-run 1a goldens (must be unchanged).
3. Manager rules on the two §0 flags (GPS cap, employer-NIC/AMAP scope) before the GPS premium scorer is built.
4. Premium types + PremiumBarChart + PremiumCalculator + PremiumUpgrade + MobileToolSlot + ResultGateModal (ported, re-tokened).
5. MiniCapture additive extension (§4).
6. Three premium configs (compute imports `cis-tax.ts`, never forks) + resources spine + registry (append a registry line ONLY after that tool's golden passes).
7. `premium-tools.test.ts` (task 2 goldens), executed to derive figures.
8. BlogPostRenderer injection.
9. Manager integration battery (`npm test` + `npm run build --workspace construction-cis/web`), then the R2 gate pipeline.

### Regression invariants (Opus QA blocks on these)
- **Tokens:** orange/slate only. Brand accent = `var(--accent)` (#f97316); dark fill / second chart series = `var(--dark)` (#1e293b, slate). The site does NOT define `--gold` or `--navy`, so any `var(--gold)`/`var(--navy)` in a ported file is a defect (the Dentists sources use both; every occurrence must be re-tokened to `var(--accent)` / `var(--dark)` respectively). Do NOT introduce `--primary` in component classNames (estate portability rule); use `var(--accent)`. Grid storage keys `bfp:grid:*` never `ptp:`/`dfp:` (no grids in R2, but the type parity is present).
- **No maths forked:** every premium `compute()` imports the numeric helpers from `cis-tax.ts`; QA recomputes each default-input golden branch-for-branch to the penny with a conservation check, and confirms the premium result equals the corresponding fleet-tool figure.
- **ResultGate:** escape always reveals (one `result_gate_skip` per dismiss), `isConverted()` never gated, once per session (module flag).
- **Events:** only the allowlist (`calc_view`, `calc_input_change`, `calc_computed`, `calc_result_viewed`, `cta_click`, `gate_view`, `resource_unlocked`, `lead_submitted`, plus MiniCapture form events). No new names.
- **No em-dashes, no "DJH"** in any authored string. `git diff baseline -- Property/` empty. `packages/web-shared` unchanged (the MiniCapture edit is site-local; if a worker touches web-shared, stop and escalate to the manager).
- **HP fidelity:** CIS 0/20/30% on labour-only base (HP §1); PA £12,570, basic 20% / higher 40%, Class 4 6%/2%, employee Class 1 8%/2% (HP §11a); GPS three-test + £30k/£100k thresholds (HP §2); April-2026 anti-fraud framing on every GPS surface (HP §3); refund as entry service not rebate factory (HP §9, §12.B); no guaranteed refund amount (HP §13); UK-only, construction-only (HP §12.C, §12.D).
