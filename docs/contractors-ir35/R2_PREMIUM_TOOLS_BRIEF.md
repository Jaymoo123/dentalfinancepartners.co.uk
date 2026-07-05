# contractors-ir35 R2 premium in-blog tools brief (Contractor Tax Accountants, cfp)

> Instantiation of `docs/_engines/CRO_PARITY_TEMPLATE.md` §2 (R2 - WS4) and §4 (R2 QA additions) for contractors-ir35. Twin of `docs/construction-cis/R2_PREMIUM_TOOLS_BRIEF.md`; QA both as one diff, two palettes. Ships AFTER the twin R1 synthetic probe passes. Model the shape on the SHIPPED Dentists/Medical premium fleets (`Dentists/web/src/lib/tools/premium/**`, `Medical/web/src/lib/tools/premium/**`, `Dentists/web/src/components/tools/premium/**`), NOT on Property emerald.
>
> cfp is the clean twin: it already has the golden-tested `lib/calculators/tax2026.ts` engine (2026/27 rates, `tax2026.test.ts` + `tools.test.ts` green) and 6 tools. R2 premium wrappers COMPOSE that engine and never fork the maths. Every figure below is traced to `docs/contractors-ir35/house_positions.md §N` and confirmed against the engine constants.
>
> UK English. No em-dashes (commas, parentheses, full stops, middle dots). No DJH anywhere. Do NOT write code from this brief; it is the contract Sonnet workers build to and Opus QA judges against.

Storage prefix: **cfp** (FROZEN). Grid keys (none used in R2): `cfp:grid:<toolId>`. Never `ptp:`/`bfp:`. Tokens: petrol-cyan `--accent: #0e7490` + amber `--highlight` + neutral; the site does NOT define `--gold`, `--navy` or `--dark` (see §5).

---

## 0. THE COMPUTE ENGINE YOU ARE WRAPPING (no maths forked)

cfp's entire tax surface is one file: `contractors-ir35/web/src/lib/calculators/tax2026.ts` (there is NO separate `uk-tax-rates` module; all rates are inline `const`s in this file, and the header says "Do NOT inline tax rates anywhere else; import from here"). Premium `compute()` imports the exported pure functions and constants from here. Confirmed engine constants (all match HP):

- `PERSONAL_ALLOWANCE = 12570` (HP §5), `PA_TAPER_THRESHOLD = 100000`, `BASIC_RATE_LIMIT = 37700` and `HIGHER_RATE_LIMIT = 112570` (taxable-income band widths = the £50,270/£125,140 gross thresholds minus PA).
- `INCOME_TAX = { basic: 0.2, higher: 0.4, additional: 0.45 }` (HP §5).
- `DIVIDEND_ALLOWANCE = 500`, `DIVIDEND_RATES = { ordinary: 0.1075, upper: 0.3575, additional: 0.3935 }` (HP §5, FA 2026 s.4).
- `NI = { primaryThreshold: 12570, upperEarningsLimit: 50270, employeeMain: 0.08, employeeUpper: 0.02, secondaryThreshold: 5000, employerRate: 0.15, employmentAllowance: 10500 }` (HP §6; EA explicitly NOT applied for a single-director PSC).
- `APPRENTICESHIP_LEVY = 0.005`, `CT = { smallRate: 0.19, mainRate: 0.25, lowerLimit: 50000, upperLimit: 250000, marginalFraction: 3/200 }` (HP §7).

Exported pure functions (call these, never re-implement):
- `personalAllowance(adjustedNetIncome) -> number` (the £100k taper).
- `employeeNI(salary) -> number` (8%/2%).
- `employerNI(salary, { employmentAllowance? }) -> number` (15% above £5,000; EA subtracts £10,500 when passed, floored at 0).
- `corporationTax(profit, { associated? }) -> number` (19/25 with 3/200 marginal relief; limits divided by `associated + 1`).
- `personalTax(salary, dividends) -> { personalAllowance, incomeTaxOnSalary, dividendTax, employeeNI, totalPersonalTax }`.
- `limitedTakeHome({ turnover, salary?, expenses?, employmentAllowance?, associated? }) -> LimitedTakeHome` (the OUTSIDE-IR35 primitive; returns `{ turnover, salary, employerNI, expenses, profitBeforeTax, corporationTax, dividends, incomeTaxOnSalary, employeeNI, dividendTax, netTakeHome, retentionPct }`).
- `umbrellaTakeHome({ assignmentIncome, umbrellaMargin? }) -> UmbrellaTakeHome` (the INSIDE-IR35 / umbrella primitive; solves the employer-cost circularity internally; returns `{ assignmentIncome, umbrellaMargin, grossSalary, employerNI, apprenticeshipLevy, incomeTax, employeeNI, netTakeHome, retentionPct }`).

There is NO student-loan function and no standalone income-tax export (income tax lives inside `personalTax`). Do not add student loan in R2.

Confirmed engine goldens on the canonical `£500/day x 240 days = £120,000` scenario (these are the seeds; recompute in Node when pinning premium goldens):
- `limitedTakeHome({ turnover: 120000, salary: 12570, expenses: 6000 })`: employerNI 1135.5, profitBeforeTax 100294.5, corporationTax 22828.04, dividends 77466.46, **netTakeHome 71820.95**.
- `umbrellaTakeHome({ assignmentIncome: 120000, umbrellaMargin: 1200 })`: grossSalary 103506.49, employerNI 14775.97, apprenticeshipLevy 517.53, **netTakeHome 69889.87**.
- Gap (outside − inside) on £120k = **~£1,931**.
- `corporationTax(80000)` = 17450; `corporationTax(50000)` = 9500.
- `personalTax(12570, 50000).dividendTax` = 8396.25.

---

## 1. THE PREMIUM TOOL FLEET (4 tools)

Four tools, each mapped to a live cfp intent topic (verified against `contractors-ir35/web/src/lib/intent/taxonomy.ts`), each composing `tax2026.ts` primitives. Topic keys available: `ir35`, `structure`, `company-tax`, `pay-planning`, `basics-expenses`.

### Tool 1 (FLAGSHIP) - Outside vs inside IR35 take-home comparator
- **key / slug (toolId):** `ir35-take-home-compare-premium`
- **topic mapping:** `ir35` (primary). In `taxonomy.ts`, `ir35` covers blog slug `ir35-status` (16 posts, the largest category) and is the default topic for every `/for/*` contractor type; primaryCalculator `outside-ir35-take-home-calculator`. This is the flagship: it answers "how much better off am I outside IR35?", the fundamental question that drives the visit (HP §1).
- **compute reuse:** composes BOTH primitives on the SAME gross: `limitedTakeHome({ turnover, salary, expenses })` for the outside-IR35 side and `umbrellaTakeHome({ assignmentIncome: turnover, umbrellaMargin })` for the inside-IR35 side. Gap = `outside.netTakeHome - inside.netTakeHome`. This is exactly the existing `umbrella-vs-limited-calculator` composition, wrapped with the IR35 framing. NO forked maths.
- **inputs + defaults:** `dayRate` currency 500; `billableDays` number 240; `salary` select "12570"|"6708" default "12570" (the outside-IR35 director salary; HP §8 salary fork, LEL £6,708 vs PA £12,570); `annualExpenses` currency 6000 (advanced); `umbrellaMargin` currency 1200 (advanced; the inside-IR35 umbrella margin, HP §12). Turnover / assignmentIncome = `dayRate * billableDays`.
- **outputs:** two `scenarioResults` tiles, "Outside IR35 (limited company)" and "Inside IR35 (umbrella)", `best` on the higher net. Headline `You keep £X more outside IR35` (or, when inside wins on the numbers, a warn-toned "Inside IR35 is closer than you think here"). Breakdown per scenario: outside = employer NIC, corporation tax, dividends, dividend tax, net; inside = umbrella margin, employer NIC, apprenticeship levy, PAYE, employee NIC, net. Note MUST state 2026/27 basis (dividends 10.75/35.75/39.35, employer NIC 15%/£5,000, CT 19/25 marginal, HP §5-7), that the outside side assumes a genuine outside-IR35 engagement (the take-home advantage is not a reason to mis-declare status; status is the case-law whole-picture test and CEST is not a guarantee, HP §2, §17.A), and that the umbrella deductions (employer NIC + margin + levy) come out of the assignment rate (HP §12).
- **chart series:** groupedBar, valueFormat currency, two data groups (Outside, Inside), two series: `Take-home` (`var(--accent)` cyan) and `Total deductions` (a neutral, `var(--ink-soft)` or `#64748b` slate-500; there is no `--dark` token on cfp, see §5). Rendered only in the `full` variant.
- **result-copy angle:** "IR35 status is not just a compliance label, it is a pay cut. Here is the like-for-like take-home on the same day rate, outside IR35 through your own company versus inside IR35 through an umbrella. The gap is what your status is worth, and why getting the determination right matters." Never present the outside figure as advice to declare outside.

### Tool 2 - Umbrella vs limited company planner
- **key / slug (toolId):** `umbrella-vs-limited-premium`
- **topic mapping:** `structure`. In `taxonomy.ts`, `structure` covers blog slug `umbrella-vs-limited-company` (6 posts), primaryCalculator `umbrella-vs-limited-calculator`. The structural decision is the natural next step after reading the comparison articles.
- **compute reuse:** same two primitives as Tool 1 (`limitedTakeHome` + `umbrellaTakeHome`), but framed as a STRUCTURE choice rather than an IR35 status question, and it surfaces the running-cost / admin trade-off in copy (HP §17.C: umbrella is simpler and often more economic for genuinely inside work; a PSC suits a mixed inside/outside portfolio). Distinct toolId so the two topics get distinct headings and notes even though the maths overlaps Tool 1.
- **inputs + defaults:** `dayRate` currency 500; `billableDays` number 240; `salary` select "12570"|"6708" default "12570"; `annualExpenses` currency 6000; `umbrellaMargin` currency 1200 (all as the fleet `umbrella-vs-limited-calculator`).
- **outputs:** two `scenarioResults` (Limited company, Umbrella), `best` on higher net, headline the annual gap. Breakdown as Tool 1. Note adds the structure trade-off (PSC running costs and admin vs umbrella simplicity, HP §17.C) and the April-2026 umbrella JSL reform (the agency/end client becomes jointly and severally liable, the umbrella stays the employer, so use a compliant umbrella, HP §12). Never "the PSC is always better".
- **chart series:** groupedBar, currency, two groups (Limited, Umbrella), series `Take-home` (`var(--accent)`) and `Total deductions` (neutral).
- **result-copy angle:** "A limited company usually keeps more of your day rate, but it carries running costs, admin and IR35 exposure an umbrella does not. From April 2026 the compliance rules on umbrellas tightened too. Here is the money side; the right answer depends on your mix of inside and outside work."

### Tool 3 - Salary and dividend planner
- **key / slug (toolId):** `salary-dividend-planner-premium`
- **topic mapping:** `pay-planning`. In `taxonomy.ts`, `pay-planning` covers blog slug `pension-and-dividends` (5 posts) and is the topic for `finance-contractors` + `nhs-locum-doctors` `/for` types; primaryCalculator `contractor-salary-dividend-calculator`. Pay-planning readers want the numbers.
- **compute reuse:** wraps `personalTax(salary, dividends)` for the tax on a chosen split, and `limitedTakeHome` to model the optimal-salary fork (`£12,570` vs `£6,708`, the existing `contractor-salary-dividend-calculator` logic). NO forked maths. Uses `DIVIDEND_ALLOWANCE`, `DIVIDEND_RATES`, `personalAllowance` for the band-breakdown rows.
- **inputs + defaults:** `salary` currency 12570 (help: the director salary; the two common targets are £6,708 LEL and £12,570 PA, HP §8); `dividends` currency 50000; optionally `profitAvailable` currency 0 (advanced; when > 0 the tool models the optimal split rather than a user-entered dividend). Keep it close to the fleet `dividend-tax-calculator` + `contractor-salary-dividend-calculator` inputs.
- **outputs:** headline `Tax on this salary and dividend split` = `personalTax().totalPersonalTax`, tone default. Breakdown: personal allowance used, income tax on salary, dividend allowance, dividend tax by band (ordinary 10.75 / upper 35.75 / additional 39.35), employee NIC, total personal tax, net in your pocket. Note states 2026/27 rates (HP §5), the Employment-Allowance salary fork caveat (single-director PSCs cannot claim EA, so the £6,708 vs £12,570 answer depends on EA eligibility, HP §8), and that there is no single universal optimal salary (HP §8, §17). Never publish a one-size-fits-all "optimal salary is £X".
- **chart series:** bar, currency, one group, series `Dividend tax`, `Income tax`, `Employee NIC`, `Net kept` (or a single stacked composition; keep to `var(--accent)` + neutrals). Optional; a clean breakdown table is sufficient.
- **result-copy angle:** "Salary and dividends are taxed very differently, and the 2026/27 dividend rates rose again. Here is exactly how this split is taxed and what you keep. The most efficient salary depends on whether your company can claim the Employment Allowance, so treat this as your starting point, not a fixed answer."

### Tool 4 - Corporation tax planner
- **key / slug (toolId):** `corporation-tax-planner-premium`
- **topic mapping:** `company-tax`. In `taxonomy.ts`, `company-tax` covers blog slugs `limited-company-tax` + `mtd-and-compliance` (6 + 5 posts), primaryCalculator `corporation-tax-calculator`. These posts are about running the company; corp tax is the core.
- **compute reuse:** wraps `corporationTax(profit, { associated })` (19/25 with 3/200 marginal relief, associated-company divisor, HP §7). Uses `CT` for the regime labels and the marginal-band effective-rate row (~26.5%). NO forked maths.
- **inputs + defaults:** `profit` currency 80000; `associatedCompanies` number 0 (help: the £50k and £250k limits are divided by associated companies plus one, HP §7).
- **outputs:** headline `Corporation tax due` = `corporationTax(...)`, tone default. Breakdown: taxable profit, which regime applies (small rate 19% / main rate 25% / marginal), marginal relief amount (when in band), effective rate, tax due, profit after CT (feeds the extraction story). Note states 19% below £50k, 25% above £250k, marginal relief 3/200 (~26.5% effective) between, and the associated-companies divisor shrinking the bands (HP §7); confirms FA 2026 left CT rates unchanged.
- **chart:** none needed (single figure with a regime breakdown). Omit the `chart` spec.
- **result-copy angle:** "Corporation tax is not a flat 19% or 25%, there is a marginal band between £50,000 and £250,000 where the effective rate is about 26.5%, and the bands shrink if you have associated companies. Here is your bill and the regime that applies to you."

Topic-to-tool spine (`resources.ts`, §3): `ir35 -> ir35-take-home-compare-premium`; `structure -> umbrella-vs-limited-premium`; `company-tax -> corporation-tax-planner-premium`; `pay-planning -> salary-dividend-planner-premium`; `basics-expenses -> ""` (broad basics, no single tool fits, R1 already routes this topic to a free specialist review per `taxonomy.ts` ctaCopy). Note `taxonomy.ts` also exports `FOR_SLUG_TO_TOPIC` / `topicForForSlug` for the 12 `/for/*` types, all resolving to `ir35` (flagship) except `finance-contractors`/`nhs-locum-doctors -> pay-planning` and `construction-contractors -> basics-expenses`; premium islands are blog-only in R2, but the spine already covers those topics.

---

## 2. GOLDEN TESTS (premium, derived by EXECUTING the engine)

New file `contractors-ir35/web/src/lib/calculators/premium/premium-tools.test.ts`, modelled on `Medical/web/src/lib/tools/premium/premium-tools.test.ts`. Every figure derived by running the compute in Node, with a conservation check where the maths allows. No `typeof`-only assertions. Because the premium configs wrap `tax2026.ts` directly, the goldens double as proof that the premium result equals the engine primitive.

Per tool, at minimum:
- **Tool 1 (IR35 comparator), default** (dayRate 500, days 240, salary 12570, expenses 6000, umbrellaMargin 1200): outside net **71820.95 -> "£71,821"**, inside net **69889.87 -> "£69,890"**, gap **~1931 -> "£1,931"**. Conservation: outside net == `limitedTakeHome({turnover:120000,salary:12570,expenses:6000}).netTakeHome`; inside net == `umbrellaTakeHome({assignmentIncome:120000,umbrellaMargin:1200}).netTakeHome`; gap == outside − inside. Assert `best` on the outside tile. Add a low-day-rate case where the gap narrows to exercise the warn branch.
- **Tool 2 (umbrella vs limited):** same primitives, same seeds (`limitedTakeHome` vs `umbrellaTakeHome`); assert the limited tile is `best` at default and the gap equals Tool 1's gap (proving both wrap the same maths without divergence).
- **Tool 3 (salary/dividend):** `personalTax(12570, 50000)` -> dividendTax **8396.25**, incomeTaxOnSalary 0, employeeNI 0, totalPersonalTax **8396.25**; headline "£8,396". Conservation: `totalPersonalTax == incomeTaxOnSalary + dividendTax + employeeNI`. Add a higher/additional-rate dividend case to hit the 35.75/39.35 bands.
- **Tool 4 (corporation tax):** `corporationTax(80000)` -> **17450 -> "£17,450"**; `corporationTax(50000)` -> **9500**; a marginal-band case (e.g. profit 100000) pinned to the penny; an associated-companies case (associated 1 halves the limits). Conservation: main-rate minus marginal-relief reconciles.
- **Config-compute goldens:** assert `<config>.compute(defaults).headline.value` string + tone, and that no breakdown row contains `"NaN"` (NaN-safe `Number(v.x) || 0`, mirrors Medical/Dentists configs).
- **Compliance goldens** (copy the Medical pattern): no em-dash (the U+2014 character, or the double-hyphen substitute) in any title/intro/explainer/field label/help/note across all four configs; the string `"DJH"` appears nowhere; every emitted event is on the allowlist.
- **Registry + spine goldens:** `hasPremiumTool` true for the 4 toolIds and false for unknown; `resourceForTopic` maps every TopicKey and returns null for null/undefined; `basics-expenses` resolves to the empty toolId.

Run: `npx vitest run --config packages/web-shared/vitest.config.ts contractors-ir35/web/src/lib/calculators/premium/premium-tools.test.ts`, plus the existing `tax2026.test.ts` and `tools.test.ts` (must stay green; the premium wave touches none of the engine maths). Grep the raw output for `failed|npm error` and confirm the exact pass count (lesson §5.1).

---

## 3. BLOG ISLAND PLACEMENT MAP (nested routing)

contractors-ir35 uses NESTED blog routing (`/blog/[category]/[slug]`), so the topic is derived from the category SLUG exactly like Dentists. Wire in `contractors-ir35/web/src/components/blog/BlogPostRenderer.tsx`, mirroring the Dentists renderer:

- Compute the topic ONCE at the top: `const premiumTopic = topicForBlogSlug(categorySlug)` using the SLUG (`slugifyCategory(post.category)`), NEVER the human `post.category` label.
- At the mid-scroll split, inject `<PremiumUpgrade topic={premiumTopic} placement="blog" category={categorySlug} />` ALONGSIDE the R1 `InlineMiniLeadForm`, BEFORE the second content half. Unconditional injection; `PremiumUpgrade` renders nothing for unmapped topics.
- End-of-article fallback when `midSplit.after === null` (short posts): inject `<PremiumUpgrade>` at the end of the body. Copy the Dentists short-post fallback branch.
- Coordinated shared edit: `BlogPostRenderer.tsx` is append-only shared territory; one worker owns the injection.

Category-slug to topic-to-tool resolution (verify against `taxonomy.ts` + `resources.ts`):

| Blog category (slug) | topic | premium tool surfaced |
|---|---|---|
| IR35 Status (`ir35-status`) | ir35 | ir35-take-home-compare-premium |
| Umbrella vs Limited Company (`umbrella-vs-limited-company`) | structure | umbrella-vs-limited-premium |
| Limited Company Tax (`limited-company-tax`) | company-tax | corporation-tax-planner-premium |
| MTD and Compliance (`mtd-and-compliance`) | company-tax | corporation-tax-planner-premium |
| Pension and Dividends (`pension-and-dividends`) | pay-planning | salary-dividend-planner-premium |
| Contractor Accounting Basics (`contractor-accounting-basics`) | basics-expenses | none (no tool) |
| Expenses and Deductions (`expenses-and-deductions`) | basics-expenses | none (no tool) |

Note: the cfp intent layer is being PORTED in R1 (Worker B ports it from cis). `topicForBlogSlug` and `PremiumUpgrade` therefore depend on R1 landing first; R2 builds on the R1 intent layer being present. Do not build R2 blog wiring against a taxonomy that R1 has not yet shipped.

---

## 4. ResultGateModal WIRING (three non-negotiables + topicKey-as-prop + MiniCapture extension)

Port `Dentists/web/src/components/tools/premium/ResultGateModal.tsx` to `contractors-ir35/web/src/components/calculators/premium/ResultGateModal.tsx` (cfp puts calculator components under `components/calculators/`, not `components/tools/`). Re-skin to cyan/neutral tokens (§5).

**Three non-negotiables (behaviour copied verbatim):**
1. **Escape hatch ALWAYS reveals.** X, backdrop, Esc, and the "No thanks, just show my result" link each call `skip()`, which fires exactly one `cta_click { cta_id: "result_gate_skip", placement: "result_gate" }` and reveals. `result_gate_skip` is a VALUE on the allowlisted `cta_click` event, not a new event name.
2. **`isConverted()` visitors are NEVER gated.** `gated = placement === "blog" && !isConverted()` in PremiumCalculator; converted visitors see the result instantly + get the non-gated `CalcResultCta`.
3. **Once per session.** Module-scoped `let gateModalShownThisSession = false` in PremiumCalculator.

**topicKey-as-prop:** thread `topicKey` from `PremiumUpgrade -> PremiumCalculator -> ResultGateModal` as a PROP; the gate resolves `getTopic(topicKey)` for its heading and NEVER re-derives from the URL.

**MiniCapture gate props (ADDITIVE EXTENSION REQUIRED):** the Dentists gate passes `messagePlaceholder`, `messageMinLength`, `messageMinWords`, `onSuccess` to MiniCapture. **The contractors-ir35 MiniCapture (`components/forms/MiniCapture.tsx`) does NOT accept any of these four today** (verified: its props are `formId, role, messagePrefix, heading, blurb, submitLabel, successText, className`, and note cfp's MiniCapture, unlike cis's, does NOT carry the `experimentKey`/`exposeOnView` shims). R2 must ADDITIVELY extend the cfp MiniCapture (coordinated shared-form edit, one worker) to accept:
- `messagePlaceholder?: string` -> the message `<textarea>` placeholder (default keeps the current string).
- `messageMinLength?: number` and `messageMinWords?: number` -> tighten `validate()` (default keeps `>= 10 chars`; when set, require both, emitting `form_error` on failure, never swallowing).
- `onSuccess?: () => void` -> called after a successful submit (in addition to the existing state change), so the gate reveals on capture.

Purely additive and backward-compatible: every existing caller (calc_result, inline, exit-intent, mobile) passes none and behaves identically. Must NOT remove the R1 hardening (honeypot `enquiry_ref` passed to the server, validation aborts emit `form_error`, no silent drop). The gate call uses `formId="calc_result_gate"`, `messagePrefix="[Result gate: <toolId>]"`, gate placeholder, `messageMinLength` ~40, `messageMinWords` ~8, `onSuccess={onReveal}`, and a contractor-specific blurb ("A calculator gives the shape of the answer. IR35 status, the salary and dividend split and the umbrella-vs-limited decision are unforgiving in the detail. Tell us your situation and a contractor specialist will confirm your exact figure and the sensible next step, with no obligation.").

**MobileToolSlot:** port to `components/calculators/premium/MobileToolSlot.tsx`; `sm:hidden` swaps the desktop calculator for a topic-aware MiniCapture (`formId="mobile_tool"`, `messagePrefix="[Mobile tool: <topic>]"`, heading = topic `ctaCopy`, contractor desktop-tool blurb, `submitLabel="Send me my figure"`), left border `var(--accent)`.

---

## 5. FILE MANIFEST, BUILD ORDER, REGRESSION INVARIANTS

### File manifest (paths under `contractors-ir35/web/src/`)
New (lib):
- `lib/calculators/premium/types.ts` (port `Medical/web/src/lib/tools/premium/types.ts`; import `CalcField/CalcValues/CalcResult/CalcResultRow` from `@accounting-network/web-shared/tools/types` and `TopicKey` from `@/lib/intent/taxonomy`)
- `lib/calculators/premium/registry.ts` (append-only, one line per tool)
- `lib/calculators/premium/resources.ts` (topic-to-toolId spine, §1)
- `lib/calculators/premium/configs/ir35-take-home-compare.ts`
- `lib/calculators/premium/configs/umbrella-vs-limited.ts`
- `lib/calculators/premium/configs/salary-dividend-planner.ts`
- `lib/calculators/premium/configs/corporation-tax-planner.ts`
- `lib/calculators/premium/premium-tools.test.ts` (goldens)

New (components):
- `components/calculators/premium/PremiumCalculator.tsx` (port Dentists; fix import to `@/components/calculators/CalcResultCta`)
- `components/calculators/premium/PremiumUpgrade.tsx`
- `components/calculators/premium/MobileToolSlot.tsx`
- `components/calculators/premium/ResultGateModal.tsx`
- `components/calculators/premium/PremiumBarChart.tsx` (port Dentists; re-token)

Edited (coordinated, additive):
- `components/forms/MiniCapture.tsx` (ADDITIVE gate props, §4)
- `components/blog/BlogPostRenderer.tsx` (inject `PremiumUpgrade`, §3; depends on the R1 intent layer being present)

NO edit to `lib/calculators/tax2026.ts` or the 6 fleet tool files, and NO new rates module (the engine already is the SSOT). If a worker touches `tax2026.ts`, stop: the premium tools wrap it, they do not change it.

### Build order
1. Premium types + PremiumBarChart + PremiumCalculator + PremiumUpgrade + MobileToolSlot + ResultGateModal (ported, re-tokened cyan/neutral).
2. MiniCapture additive extension (§4).
3. Four premium configs (compute imports `tax2026.ts` primitives, never forks) + resources spine + registry (append a registry line ONLY after that tool's golden passes).
4. `premium-tools.test.ts` goldens, executed to derive figures; existing `tax2026.test.ts` + `tools.test.ts` must stay green.
5. BlogPostRenderer injection (after R1 intent layer confirmed present).
6. Manager integration battery (`npm test` + `npm run build --workspace contractors-ir35/web`), then the R2 gate pipeline.

### Regression invariants (Opus QA blocks on these)
- **Tokens:** cyan/neutral only. Brand accent = `var(--accent)` (#0e7490); optional emphasis = `var(--highlight)` (amber #b45309). The site does NOT define `--gold`, `--navy` or `--dark`, so any `var(--gold)`/`var(--navy)`/`var(--dark)` in a ported file is a defect (the Dentists sources use `--gold`/`--navy`; every occurrence must be re-tokened, `--gold -> --accent`, `--navy -> --accent` or a neutral like `#0f172a`/`var(--ink)`). Do NOT use `--primary` in component classNames (estate portability rule); use `var(--accent)`. Chart second series uses a neutral hex/`var(--ink-soft)` since there is no dark brand token. Grid keys `cfp:grid:*` never `ptp:`/`bfp:`.
- **No maths forked:** every premium `compute()` imports from `tax2026.ts`; QA recomputes each default golden branch-for-branch to the penny with a conservation check, and confirms the premium result equals the engine primitive (outside 71820.95, inside 69889.87, CT80k 17450, div-tax 8396.25).
- **ResultGate:** escape always reveals (one `result_gate_skip` per dismiss), `isConverted()` never gated, once per session.
- **Events:** only the allowlist (`calc_view`, `calc_input_change`, `calc_computed`, `calc_result_viewed`, `cta_click`, `gate_view`, `resource_unlocked`, `lead_submitted`, plus MiniCapture form events). No new names.
- **No em-dashes, no "DJH"** in any authored string. `git diff baseline -- Property/` empty. `packages/web-shared` unchanged (the MiniCapture edit is site-local).
- **HP fidelity:** dividends 10.75/35.75/39.35 + £500 allowance (HP §5); employer NIC 15%/£5,000, employee 8%/2%, single-director EA exclusion (HP §6, §8); CT 19/25 marginal 3/200 with associated-company divisor (HP §7); IR35 take-home framed WITHOUT implying a status declaration, CEST not a guarantee (HP §2, §17.A); umbrella JSL April 2026 framing on structure/umbrella surfaces (HP §12); no single universal optimal salary (HP §8, §17). Tag 2026/27 on every rate.
