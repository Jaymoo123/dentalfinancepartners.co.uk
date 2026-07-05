# contractors-ir35 R3 gated resources + specialist assistant brief (Contractor Tax Accountants, cfp)

> Instantiation of `docs/_engines/CRO_PARITY_TEMPLATE.md` §2 (R3 - WS5 resources + WS6 widget/assistant) and §4 (R3 QA additions) for contractors-ir35. Twin of `docs/construction-cis/R3_RESOURCES_ASSISTANT_BRIEF.md`; QA both as one diff, two palettes. Ships AFTER this site's R2 (the premium fleet wrapping `tax2026.ts`) is in the tree, and AFTER the resource-gate prod migration `20260706000001` is applied to contractors-ir35 prod with individual owner sign-off. Model the shape on the SHIPPED Dentists + Medical R3 (freshest): `Dentists/web/src/lib/resources/**`, `Dentists/web/src/components/resources/**`, `Dentists/web/scripts/resources/**`, `Dentists/web/src/lib/support/faq.ts`, `Dentists/web/src/lib/intent/journeyModel.ts`, `Dentists/web/src/lib/assistant/opener.ts`, `Dentists/web/src/components/support/SpecialistWidget.tsx`, and the Medical `incorporation.ts` builder (the LET-free-formula reference). NOT on Property emerald.
>
> cfp is the clean twin: it already has the golden-tested `src/lib/calculators/tax2026.ts` engine (2026/27 rates). R3 xlsx builders golden against that engine and never fork the maths. Every figure below is traced to `docs/contractors-ir35/house_positions.md §N` and confirmed against the engine constants.
>
> UK English. No em-dashes anywhere, including inside workbook cells (commas, parentheses, full stops, middle dots). No DJH anywhere, including the assistant surface and the resource gate. Do NOT write code from this brief; it is the contract Sonnet workers build to and Opus QA judges against.

Storage prefix: **cfp** (FROZEN). Every new storage/session key is `cfp_*` (never `ptp_`/`bfp_`/`dfp_`). Tokens: petrol-cyan `--accent: #0e7490` + amber `--highlight` (#b45309) + neutral; the site does NOT define `--gold`, `--navy` or `--dark`, so any `var(--gold)`/`var(--navy)`/`var(--dark)` in a ported file is a defect, see §5. No `--primary` in component classNames.

---

## 0. THE R2-BEFORE-R3 DEPENDENCY AND THE ENGINE YOU GOLDEN AGAINST

R3 has a hard dependency on R2. **Do not build R3 until contractors-ir35 R2 (`docs/contractors-ir35/R2_PREMIUM_TOOLS_BRIEF.md`) has landed the following in the tree**, because R3 wires into and computes against them:

1. **`src/lib/calculators/tax2026.ts`** is the single source of truth (it predates R2; it is NOT an R2 output, but R2 is the release that adds the premium wrappers around it). R3's xlsx builders (§1) import the SAME exported pure functions the compute lib uses (`limitedTakeHome`, `umbrellaTakeHome`, `personalTax`, `corporationTax`, `personalAllowance`, `employeeNI`, `employerNI`, plus the rate constants `PERSONAL_ALLOWANCE`, `DIVIDEND_RATES`, `NI`, `CT`), so the workbook and the site never drift. There is NO separate `uk-tax-rates` module; all rates are inline consts in `tax2026.ts`. **Do NOT add a new rates module and do NOT edit `tax2026.ts`.**
2. **`src/lib/calculators/premium/resources.ts`** (R2 topic-to-toolId spine) and **`registry.ts`**: R3's `src/lib/resources/registry.ts` carries a `toolId` field per topic that must match the R2 premium tool for that topic (see the Dentists registry `toolId` line), so the gate and the premium island agree on the same topic.
3. **`src/components/blog/BlogPostRenderer.tsx`** already injects `<PremiumUpgrade>` at the mid-split (R2). R3 appends the `<ResourceGate>` immediately AFTER `PremiumUpgrade`, guarded by `hasEnabledResource(premiumTopic)`, in BOTH the mid-split branch and the short-post fallback branch (copy the Dentists renderer lines 234-264 exactly). The cfp intent layer was itself ported in R1 (Worker B), so `topicForBlogSlug`/`getTopic` are present.

Confirmed engine seeds (recompute in Node when pinning; these match HP §5-7):
- `limitedTakeHome({ turnover: 120000, salary: 12570, expenses: 6000 })`: netTakeHome 71820.95.
- `umbrellaTakeHome({ assignmentIncome: 120000, umbrellaMargin: 1200 })`: netTakeHome 69889.87.
- `personalTax(12570, 50000).dividendTax` = 8396.25.
- `corporationTax(80000)` = 17450; `corporationTax(50000)` = 9500.

### site.ts config gap (NEW field, coordinated one-line edit)

`contractors-ir35/web/src/config/site.ts` currently defines only `leadConsentText` (partner-aware). **R3 must ADD an in-house `resourceConsentText`** to `siteConfig`, mirroring the Dentists field (`Dentists/web/src/config/site.ts:70`). Derive it in-house, NEVER through the `partner` branch:

> `resourceConsentText: `I agree to Contractor Tax Accountants using my details to send me the free resource I have requested and to respond to any enquiry I submit.``

Coordinated shared-config edit (one worker owns site.ts). Do NOT touch the `partner`/`leadConsentText` derivation. The resource gate renders `resourceConsentText`; the assistant enquiry surface renders `leadConsentText` (the widget IS an enquiry, so the partner-aware line is correct there).

---

## 1. THE GATED RESOURCE FLEET (3 gated pairs = xlsx workbook + written guide)

Three topic pairs, each an xlsx model + a NOINDEX written guide, gated behind the email-only ResourceGate. Each pairs with the R2 premium tool for the same topic. The registry (`src/lib/resources/registry.ts`, ported from Dentists) maps `TopicKey -> CategoryResource` with `toolId`, `xlsx`, `guide`, `magnetTitle`, `magnetBlurbTemplate`, each with an `enabled` flag that stays FALSE until its golden passes (§2).

TopicKeys available (from `src/lib/intent/taxonomy.ts`): `ir35`, `structure`, `company-tax`, `pay-planning`, `basics-expenses`.

### Pair 1 - Outside-vs-inside IR35 workbook (FLAGSHIP)
- **topic:** `ir35`. `toolId` = `ir35-take-home-compare-premium` (R2 Tool 1).
- **xlsx file:** `/resources/ir35/outside-vs-inside-ir35-model.xlsx`; builder `scripts/resources/builders/ir35-compare.ts`.
- **builder maths (traced to `tax2026.ts`, HP §5-7, §12):** two scenario columns on the SAME gross (`dayRate * billableDays`). Outside side = `limitedTakeHome({ turnover, salary, expenses })`: employer NIC (15% above £5,000), corporation tax (19/25 marginal 3/200), dividends, dividend tax (10.75/35.75/39.35 with £500 allowance), net. Inside side = `umbrellaTakeHome({ assignmentIncome, umbrellaMargin })`: umbrella margin, employer NIC, apprenticeship levy (0.5%), PAYE, employee NIC (8%/2%), net. Gap = outside net minus inside net. Golden default mirrors R2 Tool 1: dayRate 500, billableDays 240, salary 12570, expenses 6000, umbrellaMargin 1200 -> outside net 71820.95, inside net 69889.87, gap ~1931. A "Rates" tab locks the 2026/27 constants; a "Your figures" tab has the highlighted inputs (dayRate, billableDays, salary [£12,570 vs £6,708 fork per HP §8], annualExpenses, umbrellaMargin); a conservation cell (`gap = outsideNet - insideNet`).
- **guide slug:** `ir35`; file `content/resources/ir35.md`; label "Outside vs inside IR35 take-home guide".
- **guide content (HP §1-4, §12, §17.A):** the outside figure assumes a GENUINELY outside-IR35 engagement; the take-home advantage is not a reason to mis-declare status; status is the case-law whole-picture test (Ready Mixed Concrete / Atholl House / Kickabout / PGMOL) and CEST is a first screen, not a guarantee (HP §2, §17.A); under Chapter 10 the fee-payer operates PAYE and there is no 5% allowance (HP §4); the umbrella deductions (employer NIC + margin + levy) come out of the assignment rate (HP §12). Never present the outside figure as advice to declare outside.
- **magnetTitle:** "Get the outside vs inside IR35 model".

### Pair 2 - Umbrella-vs-limited workbook
- **topic:** `structure`. `toolId` = `umbrella-vs-limited-premium` (R2 Tool 2).
- **xlsx file:** `/resources/structure/umbrella-vs-limited-model.xlsx`; builder `scripts/resources/builders/umbrella-vs-limited.ts`.
- **builder maths (traced to `tax2026.ts`):** the SAME two primitives as Pair 1 (`limitedTakeHome` + `umbrellaTakeHome`), framed as a STRUCTURE choice (running costs and admin vs umbrella simplicity, HP §17.C) rather than an IR35-status question. Same golden seeds, so the workbook gap must equal Pair 1's gap to the penny (proves both wrap the same engine). Distinct file so the two topics get distinct headings and notes.
- **guide slug:** `structure`; file `content/resources/structure.md`; label "Umbrella vs limited company guide".
- **guide content (HP §17.C, §12):** a limited company usually keeps more of the day rate but carries running costs, admin and IR35 exposure an umbrella does not; a PSC suits a mixed inside/outside portfolio; the April-2026 umbrella joint-and-several-liability reform (the agency or end client becomes jointly and severally liable, the umbrella stays the employer, so use a compliant umbrella, HP §12). Never "the PSC is always better".
- **magnetTitle:** "Get the umbrella vs limited company model".

### Pair 3 - Salary/dividend planner workbook
- **topic:** `pay-planning`. `toolId` = `salary-dividend-planner-premium` (R2 Tool 3).
- **xlsx file:** `/resources/pay-planning/salary-dividend-model.xlsx`; builder `scripts/resources/builders/salary-dividend.ts`.
- **builder maths (traced to `tax2026.ts`, HP §5, §8):** `personalTax(salary, dividends)` for the tax on a chosen split, using `DIVIDEND_ALLOWANCE` (£500), `DIVIDEND_RATES` (10.75/35.75/39.35) and `personalAllowance` for the band rows; the `£12,570` vs `£6,708` salary fork per HP §8. Golden default: salary 12570, dividends 50000 -> `personalTax(12570, 50000).dividendTax` = 8396.25, incomeTaxOnSalary 0, employeeNI 0, totalPersonalTax 8396.25. Highlighted inputs (salary, dividends); breakdown rows (PA used, income tax on salary, dividend allowance, dividend tax by band, employee NIC, total personal tax, net in pocket); conservation cell (`totalPersonalTax = incomeTaxOnSalary + dividendTax + employeeNI`).
- **guide slug:** `pay-planning`; file `content/resources/pay-planning.md`; label "Salary and dividend planning guide 2026/27".
- **guide content (HP §5, §6, §8):** salary and dividends taxed very differently; the 2026/27 dividend rates rose (from 8.75/33.75); the Employment-Allowance salary fork (single-director PSCs cannot claim EA, so the £6,708 LEL vs £12,570 PA answer depends on EA eligibility, HP §6, §8); there is NO single universal optimal salary (HP §8, §17). Never publish a one-size-fits-all "optimal salary is £X".
- **magnetTitle:** "Get the salary and dividend planner".

Topics with NO gated pair in R3 (registry entries with `xlsx:null, guide:null, toolId:null`, magnet points to a specialist call, exactly as Dentists `compliance` does): `company-tax` (the corporation-tax premium tool is a single-figure calculator, not a "take home a model" asset; if the manager wants a fourth pair later it is a corporation-tax workbook on `corporationTax()`, flagged not built here) and `basics-expenses` (broad basics; R1 routes it to a free specialist review, no single tool fits). Both resolve to the specialist-call magnet, no unlockable file. (This is the deliberate 3-pair scope; the R2 fleet has 4 tools but only 3 map to "download a working model" assets.)

### Shared resource machinery to port (from Dentists, re-tokened cyan/neutral)
- `src/lib/resources/{registry.ts, copy.ts, content.ts, config.ts, resources.test.ts}`.
- `src/components/resources/{ResourceGate.tsx, CalculatorPageResources.tsx, ExcelPreview.tsx}` (no `GateOrForm.tsx` exists in the Dentists tree; the gate contains its own form-or-success branch).
- `src/app/resources/[topic]/page.tsx` (NOINDEX guide route).
- `scripts/resources/{generate-xlsx.ts, builders/index.ts, builders/*.ts, builders/*.test.ts}`.

**config (`src/lib/resources/config.ts`):** `RESOURCE_EMAIL_DELIVERY_ENABLED = false` (no verified Resend from-domain for contractortaxaccountants.co.uk). While false: gate copy makes NO email promise, success copy says the download is ready on this page, `/api/resources/deliver` never fires; inline `download` + guide link work regardless.

**ResourceGate wiring (copy Dentists verbatim in behaviour, re-token cyan/neutral):**
- Submits through `submitContractorsIr35Lead` (the R1 chokepoint client) with **`captureMode: "email_only"` AS A FIELD** on the payload (the field ALREADY exists on the cfp submit-client at `submit-client.ts:35`). email_only is essential: the gate collects ONLY an email, so full-mode validation would 400 on the empty name/phone (the Dentists D-3 lesson at `ResourceGate.tsx:143`). Message prefix `[Resource: <topic>] <magnetTitle>` keeps the 10-char floor satisfied.
- **`extras: { resource_gate: true }`** on the insert (migration `20260706000001` skips notify/enrich on it).
- Consent renders `siteConfig.resourceConsentText` (the NEW in-house field), NOT `leadConsentText`. No partner name in the rendered gate string.
- Honeypot `enquiry_ref` passed through, no early-return on a filled honeypot (F4 fix).
- Render nothing when `!hasEnabledResource(topic)`.
- Events: `gate_view`, `resource_unlocked`. Allowlist only.

**CalculatorPageResources:** port from Dentists; resolves the topic from the calculator slug via `topicForCalcSlug`, renders the `split` gate below the existing calculator when an asset is enabled. Note the cfp calc-slug map sends both IR35 calculators and both pay-planning calculators to their topics, so a `dividend-tax-calculator` page surfaces the pay-planning pair and an `outside-ir35-take-home-calculator` page surfaces the IR35 pair; `corporation-tax-calculator` and the `umbrella-vs-limited-calculator` resolve to topics whose gate exists (structure) or does not (company-tax -> renders nothing). Never touches the calculator's server-rendered hero/H1/schema.

---

## 2. RESOURCE GOLDEN / QA CASES (executed against the engine, xlsx === compute)

New/ported test files: `src/lib/resources/resources.test.ts` and one `scripts/resources/builders/<asset>.test.ts` per builder. Model on the Dentists `associate.test.ts` and the Medical `incorporation.test.ts`. Every figure derived by EXECUTING `tax2026.ts` in Node, never by hand.

**Per builder (xlsx formula cell === engine primitive at default inputs):**
- **ir35-compare builder:** default (dayRate 500, days 240, salary 12570, expenses 6000, umbrellaMargin 1200) -> the workbook outside-net cell equals `limitedTakeHome({turnover:120000,salary:12570,expenses:6000}).netTakeHome` = 71820.95; the inside-net cell equals `umbrellaTakeHome({assignmentIncome:120000,umbrellaMargin:1200}).netTakeHome` = 69889.87; the gap cell = ~1931, to the penny. Conservation cell "OK". Add a low-day-rate case where the gap narrows.
- **umbrella-vs-limited builder:** same seeds, same primitives; assert the workbook gap equals the ir35-compare gap (proves no divergence between the two builders).
- **salary-dividend builder:** default (salary 12570, dividends 50000) -> the workbook dividend-tax cell equals `personalTax(12570, 50000).dividendTax` = 8396.25; total-personal-tax cell = 8396.25; conservation `totalPersonalTax = incomeTaxOnSalary + dividendTax + employeeNI`. Add a higher/additional-rate dividend case to hit the 35.75/39.35 bands.

**Registry + copy goldens (`resources.test.ts`):**
- `resourceForTopic` maps every TopicKey and returns null for null/undefined; the two no-asset topics (`company-tax`, `basics-expenses`) resolve to no enabled xlsx/guide.
- `isXlsxEnabled`/`isGuideEnabled`/`hasEnabledResource`/`enabledResourceTopics`/`publishedGuideTopics` behave (mirror the Dentists registry tests).
- `toolId` per enabled topic equals the R2 premium toolId for that topic.

**Compliance goldens (blocking, copy the Dentists/Medical pattern):**
- No em-dash (U+2014 or double-hyphen) in any registry string, `magnetTitle`, `magnetBlurbTemplate`, gate copy, guide frontmatter, OR any workbook cell text. Builders em-dash-free.
- The string `"DJH"` appears nowhere in any resource string or workbook cell.
- The rendered gate consent string equals `siteConfig.resourceConsentText` exactly, no partner name.
- Every emitted event is on the allowlist.

Run: `npx vitest run --config packages/web-shared/vitest.config.ts contractors-ir35/web/src/lib/resources/resources.test.ts` and `... contractors-ir35/web/scripts/resources/builders/`, plus the existing `tax2026.test.ts` + `tools.test.ts` (must stay green; R3 touches no engine maths). Regenerate workbooks (`npm run resources:xlsx --workspace contractors-ir35/web`) and re-run the builder goldens against the emitted files. Grep the raw output for `failed|npm error` and confirm the exact pass count (lesson §5.1). Flip each `enabled:true` ONLY after that asset's golden passes.

---

## 3. FAQ SET (10-12 Q&As, IR35 status / inside-outside / umbrella prominent)

New file `src/lib/support/faq.ts`, ported from Dentists (`GENERIC` + `BY_TOPIC` + `faqForTopic`). 3 generic + 8-9 topic-scoped = 11-12 total. Every answer short, HP-traced with the tax-year tag, points to the matching calculator, no em-dashes, no DJH, no chartered/qualified/MLR-supervised claim (faceless brand). IR35 status / inside-outside / umbrella are the prominent themes; keep the grey-area hedges from HP §17 (CEST not binding, no single optimal salary, umbrella-vs-PSC depends on the mix).

**GENERIC (3):** reply time (a specialist replies within one working day); first call is free with no obligation; what to have ready (day rate, inside or outside IR35, umbrella or limited, approximate annual billable days).

**BY_TOPIC:**
- `ir35` (3): "How much better off am I outside IR35?" (like-for-like take-home on the same day rate; the gap is what the status is worth; 2026/27 rates; HP §1); **"What decides my IR35 status?"** (the case-law whole-picture test: control, personal service/substitution, mutuality of obligation; working practices over contract wording; HP §2) - the status-prominent answer; "Is a CEST outside result a guarantee?" (no; CEST is a first screen and audit document, HMRC stands behind an accurate result but it does not bind a tribunal and its MOO treatment is narrower than the case law; HP §2, §17.A).
- `structure` (2): **"Umbrella or limited company, which is better?"** (a limited company usually keeps more of the day rate but carries running costs, admin and IR35 exposure; an umbrella is simpler and often more economic for genuinely inside work; the mix drives the answer; HP §17.C) - the umbrella-prominent answer; "What changed for umbrellas in April 2026?" (joint and several liability: the agency or end client becomes jointly and severally liable, the umbrella stays the employer, so use a compliant umbrella; HP §12).
- `pay-planning` (2): "What is the most tax-efficient salary?" (there is no single universal answer; it depends on Employment Allowance eligibility; single-director PSCs cannot claim EA, so the £6,708 LEL vs £12,570 PA answer changes with that; HP §8); "How are my dividends taxed in 2026/27?" (10.75/35.75/39.35 with a £500 allowance, on top of other income; HP §5).
- `company-tax` (1-2): "How much corporation tax will my company pay?" (19% below £50k, 25% above £250k, marginal relief 3/200 about 26.5% between, bands divided by associated companies; FA 2026 left CT rates unchanged; HP §7); optionally "What is a section 455 charge?" (an overdrawn director's loan account still outstanding 9 months and 1 day after the year end is charged at 35.75% on loans from 6 April 2026, repayable under s.458 with deferred relief; HP §14).

`faqForTopic(topic)` returns the topic block or `GENERIC`.

---

## 4. DETERMINISTIC PHASE-0 ASSISTANT (SpecialistWidget + journey model + opener), NO LLM

Port the trio from Dentists, re-token cyan/neutral, re-prefix to `cfp`, re-noun to contractor topics. NO LLM chat (`OPENER_LLM_ENRICHMENT_ENABLED = false`). NO booking branch (contractors-ir35 has `/contact`; confirm there is no `/book` path, mirror the Dentists no-booking posture). Suppressed entirely for `isConverted()`.

**`src/lib/intent/journeyModel.ts`:** port verbatim; storage key `cfp_journey` (never `dfp_`/`ptp_`). **Confirm which of `/about`, `/services`, `/contact` exist on contractors-ir35 before keeping all three special-page flags** (drop any flag whose route 404s). Stage ladder verbatim (researching -> comparing -> evaluating-us -> ready). `getJourneyProfile()` returns `{ primaryTopic, secondaryTopic, stage, depth, signals, pageCount }`.

**`src/lib/assistant/opener.ts`:** `TOPIC_NOUN` + `TOPIC_HOOKS` (three escalating lines) per TopicKey, plus `frictionOpener`, `exitOpener`, `variantIndex`, `openerFor`/`pickOpener`. Voice rules LOCKED (one sentence per hook, no em-dashes, no tax-advice imperative, never chartered/qualified/MLR-supervised, generic-helpful, no surveillance framing, no DJH). All five TopicKeys present (exhaustive `Record<TopicKey, ...>`):
- `ir35` noun "your IR35 take-home": curious "Working out how much better off you are outside IR35? I can pull up the like-for-like calculator."; helpful "Want the outside-versus-inside take-home on your day rate? Happy to point you to it."; direct "A free call with a contractor specialist will confirm your status picture and your take-home, want me to set one up?"
- `structure` noun "umbrella versus limited": curious "Weighing an umbrella against your own limited company? There is a tool that shows both take-homes."; helpful "Want to see the structure trade-off, running costs and admin against umbrella simplicity? I can point you to it."; direct "A specialist can get your structure decision straight in one free call, want me to arrange it?"
- `company-tax` noun "your corporation tax": curious "Sorting your corporation tax? I can pull up the calculator with the marginal band."; helpful "Not sure whether the marginal rate or associated companies apply to you? I can run you through it."; direct "A free call will get your company tax and extraction straight, interested?"
- `pay-planning` noun "your salary and dividend split": curious "Working out your salary and dividend split for 2026/27? I can pull up the planner."; helpful "Want to see how a split is taxed after the dividend-rate rise, with the Employment-Allowance caveat? Happy to point you to it."; direct "A specialist can confirm the most efficient split for your company in one free call, want me to set it up?"
- `basics-expenses` noun "your contractor accounting": curious "Getting to grips with contractor accounting and what you can claim? I can point you to a quick answer."; helpful "Want a hand with the 24-month rule, mileage or the expenses that actually stick? Happy to help."; direct "A free first call is the quickest way to get your contractor set-up reviewed, want one?"

Combo opener (both `ir35` and `structure` in the profile, the "is my status inside, and should I be on an umbrella?" journey): curious/helpful/direct matching the Dentists combo shape. Used-calculator override at the high-intent variant (mirror `USED_CALC`). Generic fallback (mirror `GENERIC`).

**`src/components/support/SpecialistWidget.tsx`:** port from Dentists, re-token cyan/neutral.
- Cadence thresholds VERBATIM: `CADENCE_THRESHOLDS_MS = [30_000, 70_000, 120_000, 180_000]`, `AUTO_OPEN_DELAY_MS = 600`. Storage keys `cfp_assistant_autoopened` and `cfp_assistant_active`.
- Init sets `sessionStorage["cfp_assistant_active"] = "1"` so `ExitIntentModal` stands down. **The cfp R1 ExitIntentModal already reads `cfp_assistant_active` at `ExitIntentModal.tsx:74`; only the setter is new** (do not re-add the guard).
- Suppressed entirely when `isConverted()`. Escalating pings at the four dwell thresholds, instant on exit-intent and `form_error` friction; never repeats a line; stops on engage.
- Capture = `email_only` through the chokepoint (`submitContractorsIr35Lead`, `captureMode: "email_only"` field, honeypot `enquiry_ref` passed through, no silent drop). Consent renders `siteConfig.leadConsentText` (the widget IS an enquiry). Success copy points to inbox + spam folder. Message prefix `[Specialist question (<topic>)] <question>`.
- Chips: "See your numbers" -> `/calculators/<primaryCalculator>` when the topic has one; "Book a free call" -> `/contact`.
- **Strip any DJH / partner "shared with" phrasing from the assistant surface** beyond the standard server-stamped consent line.
- Events: `personalization_shown`/`_clicked`/`_dismissed`, `support_opened`, `cta_click`, `lead_submitted`. Allowlist only.
- Mount `<SpecialistWidget />` in `src/components/layout/PageShell.tsx` next to `<ExitIntentModal />`.

---

## 5. FILE MANIFEST, BUILD ORDER, REGRESSION INVARIANTS

### File manifest (paths under `contractors-ir35/web/`)
New (resources lib):
- `src/lib/resources/registry.ts` (TopicKey -> CategoryResource; 3 enabled pairs + 2 no-asset topics)
- `src/lib/resources/copy.ts`
- `src/lib/resources/content.ts` (**verify whether `@/lib/markdown-utils` exists on cfp; if not, route through `@accounting-network/web-shared/content/markdown-utils` per the template §2 WS5**)
- `src/lib/resources/config.ts` (`RESOURCE_EMAIL_DELIVERY_ENABLED = false`)
- `src/lib/resources/resources.test.ts`

New (resources components):
- `src/components/resources/ResourceGate.tsx` (re-tokened cyan/neutral)
- `src/components/resources/CalculatorPageResources.tsx`
- `src/components/resources/ExcelPreview.tsx`

New (resources scripts):
- `scripts/resources/generate-xlsx.ts` (port verbatim: FIXED_DATE + `normalizeZipTimestamps`)
- `scripts/resources/builders/index.ts`
- `scripts/resources/builders/{ir35-compare.ts, umbrella-vs-limited.ts, salary-dividend.ts}`
- `scripts/resources/builders/{ir35-compare.test.ts, umbrella-vs-limited.test.ts, salary-dividend.test.ts}`

New (guide route + content):
- `src/app/resources/[topic]/page.tsx` (NOINDEX)
- `content/resources/{ir35.md, structure.md, pay-planning.md}`

New (support / assistant):
- `src/lib/support/faq.ts`
- `src/lib/intent/journeyModel.ts` (key `cfp_journey`)
- `src/lib/assistant/opener.ts`
- `src/components/support/SpecialistWidget.tsx`

New (public assets, generated + COMMITTED):
- `public/resources/ir35/outside-vs-inside-ir35-model.xlsx`
- `public/resources/structure/umbrella-vs-limited-model.xlsx`
- `public/resources/pay-planning/salary-dividend-model.xlsx`

Edited (coordinated):
- `src/config/site.ts` (ADD `resourceConsentText`, in-house, one worker; do not touch `leadConsentText`/`partner`)
- `src/components/blog/BlogPostRenderer.tsx` (append `<ResourceGate>` after `<PremiumUpgrade>` at the mid-split AND short-post fallback, guarded by `hasEnabledResource(premiumTopic)`; coordinated with the R2 owner)
- `src/components/layout/PageShell.tsx` (mount `<SpecialistWidget />`)
- calculator page shell (mount `<CalculatorPageResources slug={slug} />` once)
- `package.json` (add `resources:xlsx` if absent)

NO edit to `src/lib/calculators/tax2026.ts` or the 6 fleet tool files. If a worker touches `tax2026.ts`, stop: the builders wrap it, they do not change it.

### Build order
1. Confirm R2 is in the tree (`tax2026.ts` engine present with green `tax2026.test.ts`; premium registry/resources spine; `PremiumUpgrade` injected in BlogPostRenderer; R1 intent layer present). If not, STOP.
2. Add `resourceConsentText` to `site.ts`.
3. Port the resources lib + components, re-tokened cyan/neutral. All assets `enabled:false`.
4. Port `generate-xlsx.ts` + `builders/index.ts`; author the three builders (maths imports from `tax2026.ts`, LET-free formulas, em-dash-free cells).
5. Write the three builder goldens (execute `tax2026.ts` in Node); run `resources:xlsx`; goldens green; THEN flip each `enabled:true` one at a time.
6. Author the three guide markdown files + the NOINDEX guide route.
7. `resources.test.ts`.
8. Port `faq.ts`, `journeyModel.ts` (key `cfp_journey`, verify special-page routes), `opener.ts` (contractor nouns/hooks), `SpecialistWidget.tsx` (re-tokened, `cfp_` keys); mount in PageShell.
9. Wire ResourceGate into BlogPostRenderer (coordinated) + CalculatorPageResources into the calculator page.
10. Manager integration battery (`npm test` + `npm run build --workspace contractors-ir35/web`), then the R3 gate pipeline (migration `20260706000001` signed for cfp prod first).

### Regression invariants (Opus QA blocks on these)
- **captureMode field:** the ResourceGate and the SpecialistWidget both pass `captureMode: "email_only"` AS A FIELD (email-only capture; full-mode validation would 400 on the empty name/phone, the D-3 lesson). Both pass the `enquiry_ref` honeypot through without early-return.
- **LET-free formulas:** every xlsx builder uses banded `MIN`/`MAX`/`IF` arithmetic, NOT `LET()` (the Medical `incorporation.ts` lesson; `LET` renders `#NAME?` in older Excel / LibreOffice). Do NOT copy the Dentists `associate.ts` LET formula; copy the Medical banded pattern.
- **YAML quoting:** guide frontmatter dates coerced via `String()`; no unquoted colon-space scalars; no BOM; frontmatter lints clean.
- **Token rules:** cyan/neutral only. `var(--accent)` (#0e7490) for brand accent, `var(--highlight)` (#b45309) for optional emphasis, a neutral hex/`var(--ink-soft)` for a second series; NO `var(--gold)`/`var(--navy)`/`var(--dark)` (every ported occurrence re-tokened: `--gold -> --accent`, `--navy -> --accent` or `var(--ink)`/`#0f172a`), NO `--primary` in classNames. Workbook header ARGB uses the cyan/neutral hexes. Storage keys `cfp_*`.
- **xlsx === compute:** every builder's default-scenario output cell equals the `tax2026.ts` primitive at the same inputs, to the penny (golden recomputation), BEFORE `enabled:true`. The two structure/IR35 builders share a gap that must match.
- **Consent byte-match:** the resource gate renders `resourceConsentText` (in-house), NOT `leadConsentText`; no partner name. The assistant renders `leadConsentText` (correct).
- **extras.resource_gate** present on the gate insert; email delivery OFF (`/api/resources/deliver` not fired, no email promise).
- **Assistant:** deterministic Phase-0 only (no LLM, no booking); thresholds `[30/70/120/180]s` verbatim; `cfp_assistant_active` stand-down set (R1 ExitIntentModal already reads it); suppressed for `isConverted()`; DJH/partner "shared with" phrasing absent from the assistant surface.
- **No em-dashes, no "DJH"** in any authored string OR workbook cell. Events on the allowlist only. `git diff baseline -- Property/` empty. `packages/web-shared` unchanged.
- **HP fidelity:** dividends 10.75/35.75/39.35 + £500 allowance (HP §5); employer NIC 15%/£5,000, employee 8%/2%, single-director EA exclusion (HP §6, §8); CT 19/25 marginal 3/200 with associated-company divisor (HP §7); IR35 take-home framed WITHOUT implying a status declaration, CEST not a guarantee (HP §2, §17.A); umbrella JSL April 2026 framing on structure surfaces (HP §12); no single universal optimal salary (HP §8, §17); tag 2026/27 on every rate.
