# construction-cis R3 gated resources + specialist assistant brief (Trade Tax Specialists, bfp)

> Instantiation of `docs/_engines/CRO_PARITY_TEMPLATE.md` §2 (R3 - WS5 resources + WS6 widget/assistant) and §4 (R3 QA additions) for construction-cis. Twin of `docs/contractors-ir35/R3_RESOURCES_ASSISTANT_BRIEF.md`; QA both as one diff, two palettes. Ships AFTER this site's R2 (the premium fleet + `cis-tax.ts`) is in the tree, and AFTER the resource-gate prod migration `20260706000001` is applied to construction-cis prod with individual owner sign-off. Model the shape on the SHIPPED Dentists + Medical R3 (freshest): `Dentists/web/src/lib/resources/**`, `Dentists/web/src/components/resources/**`, `Dentists/web/scripts/resources/**`, `Dentists/web/src/lib/support/faq.ts`, `Dentists/web/src/lib/intent/journeyModel.ts`, `Dentists/web/src/lib/assistant/opener.ts`, `Dentists/web/src/components/support/SpecialistWidget.tsx`, and the Medical `incorporation.ts` builder (the LET-free-formula reference). NOT on Property emerald.
>
> This site is HP-LOCKED. Every figure below is traced to `docs/construction-cis/house_positions.md §N`. cis facts are CORRECT (CIS 0/20/30%, PA £12,570, Class 4 6%/2%, employer NIC 15%/£5,000, dividends 10.75/35.75/39.35, AMAP 55p/25p): no rate refresh.
>
> UK English. No em-dashes anywhere, including inside workbook cells (commas, parentheses, full stops, middle dots). No DJH anywhere, including the assistant surface and the resource gate. Do NOT write code from this brief; it is the contract Sonnet workers build to and Opus QA judges against.

Storage prefix: **bfp** (FROZEN). Every new storage/session key is `bfp_*` (never `ptp_`/`dfp_`/`cfp_`). Tokens: construction orange `--accent: #f97316` + slate `--dark: #1e293b`; the site does NOT define `--gold` or `--navy` (those are Dentists-only), so any `var(--gold)`/`var(--navy)` in a ported file is a defect, see §5. No `--primary` in component classNames.

---

## 0. THE R2-BEFORE-R3 DEPENDENCY AND THE cis-SPECIFIC PRE-WORK

R3 has a hard dependency on R2. **Do not build R3 until construction-cis R2 (`docs/construction-cis/R2_PREMIUM_TOOLS_BRIEF.md`) has landed the following in the tree**, because R3 wires into and computes against them:

1. **`src/lib/calculators/cis-tax.ts`** (R2 task 1b): the single source of truth for rates + pure numeric helpers (`cisDeduction`, `saLiability`, `class1EmployeeNi`, `class4Ni`, `gpsThreshold`, plus the rate constants). **The xlsx builders in this brief (§1) golden their default-scenario output cell against these helpers**, exactly as the Dentists builders golden against their compute libs and the Medical `incorporation.ts` builder goldens against `calcIncorporation()`. If a builder needs a number that `cis-tax.ts` does not export, that is a signal the R2 helper is missing, escalate to the manager, do NOT fork the maths into the builder.
2. **`src/lib/calculators/premium/resources.ts`** (R2 topic-to-toolId spine) and **`src/lib/calculators/premium/registry.ts`**: R3's `src/lib/resources/registry.ts` carries a `toolId` field per topic (see the Dentists registry `toolId` line) that must match the R2 tool for that topic, so the gate and the premium island agree on the same topic.
3. **`src/components/blog/BlogPostRenderer.tsx`** already injects `<PremiumUpgrade>` at the mid-split (R2). R3 appends the `<ResourceGate>` immediately AFTER `PremiumUpgrade`, guarded by `hasEnabledResource(premiumTopic)`, in BOTH the mid-split branch and the short-post fallback branch (copy the Dentists renderer lines 234-264 exactly).

cis-specific facts R3 relies on (all from `cis-tax.ts` / HP, no new maths):
- CIS deduction is on the **labour element only**; materials are excluded from the base (HP §1). Every workbook and every FAQ that mentions the deduction states this.
- GPS turnover test uses the **CORRECTED capped rule** (HP §2, and R2 §0 flag 1): sole trader £30,000; partnership/company qualify on `£30,000 per head OR £100,000 whole-business` (pass if turnover meets EITHER route); closely controlled `£30,000 per controller`. The GPS workbook (§1 Tool 3) implements this via the R2 `gpsThreshold({ entityType, heads })` helper, NOT `30000 * heads` uncapped. This is the single most important correctness point in this brief.
- Refund is an **entry service, not a rebate factory** (HP §9, §12.B). No guaranteed-amount language anywhere. Market averages only with "for content, not guaranteed" (HP §13).

### site.ts config gap (NEW field, coordinated one-line edit)

`construction-cis/web/src/config/site.ts` currently defines only `leadConsentText` (partner-aware). **R3 must ADD an in-house `resourceConsentText`** to `siteConfig`, mirroring the Dentists field (`Dentists/web/src/config/site.ts:70`). Derive it in-house, NEVER through the `partner` branch:

> `resourceConsentText: `I agree to Trade Tax Specialists using my details to send me the free resource I have requested and to respond to any enquiry I submit.``

This is a coordinated shared-config edit (one worker owns site.ts). It must NOT touch the `partner`/`leadConsentText` derivation. The resource gate renders `resourceConsentText`; the assistant enquiry surface renders `leadConsentText` (the widget IS an enquiry, so the partner-aware line is correct there, exactly as Dentists SpecialistWidget does).

---

## 1. THE GATED RESOURCE FLEET (3 gated pairs = xlsx workbook + written guide)

Three topic pairs, each an xlsx model + a NOINDEX written guide, gated behind the email-only ResourceGate. Each pairs with the R2 premium tool for the same topic (the gate is the "take the model home" step after the in-blog calculator). The registry (`src/lib/resources/registry.ts`, ported from Dentists) maps `TopicKey -> CategoryResource` with `toolId`, `xlsx`, `guide`, `magnetTitle`, `magnetBlurbTemplate`, each carrying an `enabled` flag that stays FALSE until its golden test passes (§2).

TopicKeys available (from `src/lib/intent/taxonomy.ts`): `cis-refund`, `gross-payment-status`, `cis-deductions`, `self-assessment`, `limited-company`, `vat-reverse-charge`.

### Pair 1 - CIS refund and deduction workbook (FLAGSHIP)
- **topic:** `cis-refund` (primary). Aliased from `cis-deductions` (the deduction figure is the front half of the refund model, exactly as R2 aliases the deduction blog readers onto the refund planner). `toolId` = `cis-refund-planner-premium` (R2 Tool 1).
- **xlsx file:** `/resources/cis-refund/cis-refund-model.xlsx`; builder `scripts/resources/builders/cis-refund.ts`.
- **builder maths (traced to `cis-tax.ts`, HP §1 + §9 + §11a):** labour-only CIS deduction base (materials excluded), CIS deducted at 20%/30%, allowable expenses, taxable profit, income tax (PA £12,570, 20/40/45), Class 4 NIC (6%/2%), total SA liability, refund/balance = `cisDeducted - totalLiability`. Golden default inputs mirror R2 Tool 1: grossIncome 45000, materials 5000, registered, expenses 4000, otherIncome 0 -> cisDeducted 8000, taxableProfit 36000, incomeTax 4686, Class 4 1405.80, totalLiability 6091.80, refund 1908.20. A "Rates" tab locks the constants (labelled 2026/27 basis); a "Your figures" tab has the highlighted editable inputs; conservation-check cell `cisDeducted - totalLiability = refund/balance`.
- **guide slug:** `cis-refund`; file `content/resources/cis-refund.md`; label "CIS refund and over-deduction guide".
- **guide content (HP §9, §1, §11a, §13):** why over-deduction happens (CIS taken on labour before expenses and allowance, so most registered subbies overpay); the sole-trader route (reclaim via Self Assessment after year-end) vs the limited-company route (reclaim in-year via the Employer Payment Summary, HP §9); worked labour/materials split; refund framed as the entry service to an ongoing advisory relationship, never a rebate-factory claim; market averages caveated "for content, not guaranteed" (HP §13). No "you will get £X".
- **magnetTitle:** "Get the CIS refund and deduction model".

### Pair 2 - CIS-vs-PAYE comparison workbook
- **topic:** `limited-company` (primary). `toolId` = `cis-vs-paye-premium` (R2 Tool 2).
- **xlsx file:** `/resources/cis-vs-paye/cis-vs-paye-model.xlsx`; builder `scripts/resources/builders/cis-vs-paye.ts`.
- **builder maths (traced to `cis-tax.ts`, HP §11a):** two scenario columns. CIS self-employed side: income tax 20/40 + Class 4 6%/2% on labour profit (via `saLiability`). PAYE employee side: employee Class 1 NIC 8%/2% (via `class1EmployeeNi`) + income tax. Take-home difference = CIS take-home minus PAYE take-home. Golden default mirrors R2 Tool 2: grossEarnings 45000, cisExpenses 5000, cisRate 20. **The workbook must use 8%/2% employee Class 1 on the PAYE side and 6%/2% Class 4 on the CIS side (a rate-mix regression is exactly what the golden guards).** A conservation cell per side (`gross - expenses - totalTax = takeHome` on the CIS side; `gross - totalTax = takeHome` on the PAYE side).
- **guide slug:** `cis-vs-paye`; file `content/resources/cis-vs-paye.md`; label "CIS subcontractor vs PAYE employee guide".
- **guide content (HP §11a, §9):** the two regimes taxed differently; self-employment usually leaves more on the same gross but you carry the CIS deduction timing, no holiday pay, no sick pay; the CIS advance is a cash-flow timing point, not a final tax; employer-side costs and employment rights are out of scope for the worker. Balanced, never "always go self-employed".
- **magnetTitle:** "Get the CIS vs PAYE take-home model".

### Pair 3 - Gross payment status readiness checklist workbook (on the CORRECTED capped rule)
- **topic:** `gross-payment-status`. `toolId` = `cis-gps-readiness-premium` (R2 Tool 3).
- **xlsx file:** `/resources/gross-payment-status/gps-readiness-model.xlsx`; builder `scripts/resources/builders/gps-readiness.ts`.
- **builder maths (traced to `cis-tax.ts` `gpsThreshold`, HP §2 CORRECTED + §1):** a three-test scorecard (business test, turnover test, compliance test). The turnover test implements the HP §2 CORRECTED capped table via `gpsThreshold({ entityType, heads })`: sole trader £30,000; partnership/company qualify on `£30,000 per head OR £100,000 whole-business` (EITHER route); closely controlled `£30,000 per controller`. Inputs (highlighted): entityType, annualTurnover (net CIS turnover, excludes VAT and materials, HP §2), heads, filedOnTime, noOverdueTax. Outputs: per-test pass/fail cells, the qualifying threshold with the route that applies, and the estimated annual cash-flow gain = `turnover * 0.20` (the 20% no longer deducted, HP §1). This is a scorecard, not a money comparison, so there is no take-home headline. **Golden case that proves the cap: partnership, heads 3, turnover 95000 -> qualifies on the £30,000-per-partner route (90000) though below the £100,000 whole-business route -> turnover test PASS.** (This is the case the old fleet tool gets wrong; the workbook golden proves the R3 builder is correct.)
- **guide slug:** `gross-payment-status`; file `content/resources/gross-payment-status.md`; label "Gross payment status readiness and April 2026 guide".
- **guide content (HP §2 CORRECTED + §3):** the three tests, the corrected turnover table by entity type, "net excludes VAT and materials"; then the April 2026 anti-fraud regime (Finance Act 2026, enacted, Royal Assent 18 March 2026, in force 6 April 2026, NEVER "Bill"): the "knew or should have known" standard, failure to do due diligence is itself enough, the 5-year reapplication ban (up from 1 year), the ~£100k/year cash-flow cost on £500k turnover, and the three due-diligence steps (subcontractor re-verification, Companies House check, bank-name verification). Never promise approval. Keep director exposure percentage-free (officer-liability rules generally; do not attach a percentage to ss.62A/62B).
- **magnetTitle:** "Get the GPS readiness checklist".

Topics with NO gated pair in R3 (registry entries with `xlsx:null, guide:null, toolId:null`, magnet points to a specialist call, exactly as Dentists `compliance` does): `self-assessment` (the refund model already surfaces the SA liability), `cis-deductions` (aliases into the refund pair), `vat-reverse-charge` (DRC is a conditions test, not a money tool, HP §7). `cis-deductions` should ALIAS to the `cis-refund` xlsx + guide (same asset, different entry point), mirroring the Dentists `uda-calc -> nhs` alias, so an `expenses`-category blog reader still gets an unlockable model.

### Shared resource machinery to port (from Dentists, re-tokened)
- `src/lib/resources/{registry.ts, copy.ts, content.ts, config.ts, resources.test.ts}`.
- `src/components/resources/{ResourceGate.tsx, CalculatorPageResources.tsx, ExcelPreview.tsx}` (Dentists has these; there is no separate `GateOrForm.tsx` in the Dentists tree, so do NOT invent one; the gate itself contains the form-or-success branch).
- `src/app/resources/[topic]/page.tsx` (NOINDEX guide route, `dynamicParams=false`, `robots:{index:false,follow:false}`, `generateStaticParams` over `publishedGuideTopicsWithFile()`).
- `scripts/resources/{generate-xlsx.ts, builders/index.ts, builders/*.ts, builders/*.test.ts}`.

**config (`src/lib/resources/config.ts`):** `RESOURCE_EMAIL_DELIVERY_ENABLED = false` (no verified Resend from-domain for tradetaxspecialists.co.uk). While false: gate copy makes NO email promise ("Instant access on this page. No spam."), success copy says the download is ready on this page (not "sent by email"), and `/api/resources/deliver` is never fired. Inline `download` + guide read link work regardless.

**ResourceGate wiring (copy Dentists `ResourceGate.tsx` verbatim in behaviour, re-token to orange/slate):**
- Submits through `submitConstructionCisLead` (the R1 chokepoint client) with **`captureMode: "email_only"` AS A FIELD** on the payload (this field ALREADY exists on the cis submit-client at `submit-client.ts:39`). email_only is essential: the gate collects ONLY an email, so full-mode validation would 400 every submission on the empty name/phone (the Dentists D-3 lesson at `ResourceGate.tsx:143`). The message prefix `[Resource: <topic>] <magnetTitle>` keeps the 10-char message floor satisfied.
- **`extras: { resource_gate: true }`** on the insert (the prod trigger from migration `20260706000001` skips notify/enrich on it).
- Consent renders `siteConfig.resourceConsentText` (the NEW in-house field), NOT `leadConsentText`. The rendered gate string must NOT contain any partner name.
- Honeypot field `enquiry_ref`: read the value, pass it through to the submit client, do NOT early-return on a filled honeypot (the F4 silent-drop fix; the server stores the row flagged and returns success).
- Belt-and-braces: render nothing when `!hasEnabledResource(topic)`.
- Events: `gate_view` on scroll-into-view, `resource_unlocked` on success. Both on the existing allowlist. No new event names.

**CalculatorPageResources:** port from Dentists; resolves the topic from the calculator slug via `topicForCalcSlug`, renders the `split` gate below the existing calculator when an asset is enabled, renders nothing otherwise. Mount once per calculator page (the twins use per-slug calculator pages; wire it once in the shared calculator page shell). Never touches the calculator's server-rendered hero/H1/schema.

---

## 2. RESOURCE GOLDEN / QA CASES (executed against the libs, xlsx === compute)

New/ported test files: `src/lib/resources/resources.test.ts` (registry + copy invariants) and one `scripts/resources/builders/<asset>.test.ts` per builder (xlsx-vs-compute goldens). Model on the Dentists `associate.test.ts` and the Medical `incorporation.test.ts`. Every figure derived by EXECUTING the compute in Node, never by hand.

**Per builder (the drift guard, xlsx formula cell === TS `compute()` at default inputs):**
- **cis-refund builder:** default (45000, materials 5000, registered, expenses 4000, otherIncome 0) -> the workbook `refund/balance` cell equals `cisDeduction(...) - saLiability(...).total` from `cis-tax.ts` = 1908.20, to the penny. Assert cisDeducted 8000 (labour base 40000 * 0.20), taxableProfit 36000, incomeTax 4686, Class 4 1405.80. Conservation cell = "OK". Add an unregistered (30%) case and an owe case (low deductions -> negative refund, warn branch). **Dependency note: this goldens against the NEW `cis-tax.ts` helpers, so the R2 extraction must be in the tree first.**
- **cis-vs-paye builder:** default (45000, cisExpenses 5000, cisRate 20) -> the workbook CIS take-home, PAYE take-home and difference each equal the `cis-tax.ts` composition to the penny. **Assert the PAYE side uses 8%/2% employee NIC and the CIS side uses 6%/2% Class 4** (the rate-mix regression a `typeof` test would miss). Conservation cells "OK" both sides.
- **gps-readiness builder:** pin the pass/fail booleans and the qualifying threshold per entity type. **The capped-rule case: partnership, heads 3, turnover 95000 -> qualifies on the £30,000-per-partner route (90000) -> turnover PASS**, though below the £100,000 whole-business route. Sole trader 35000 vs 30000 -> PASS. Assert the annual-gain cell = `turnover * 0.20`. This golden is the correctness proof for the corrected cap.

**Registry + copy goldens (`resources.test.ts`):**
- `resourceForTopic` maps every TopicKey and returns null for null/undefined; the three no-asset topics (`self-assessment`, `vat-reverse-charge`, and unaliased) resolve to no enabled xlsx/guide; `cis-deductions` aliases to the `cis-refund` asset.
- `isXlsxEnabled`/`isGuideEnabled`/`hasEnabledResource`/`enabledResourceTopics`/`publishedGuideTopics` behave (mirror the Dentists registry tests).
- `toolId` per enabled topic equals the R2 premium toolId for that topic (spine consistency).

**Compliance goldens (copy the Dentists/Medical pattern, blocking):**
- No em-dash (U+2014 or the double-hyphen substitute) in any registry string, `magnetTitle`, `magnetBlurbTemplate`, gate copy, guide frontmatter, OR any workbook cell text (title/label/note/Start-here/Rates-tab label). The builders are em-dash-free.
- The string `"DJH"` appears nowhere in any resource string or workbook cell.
- The rendered gate consent string equals `siteConfig.resourceConsentText` exactly and contains no partner name.
- Every emitted event is on the `packages/web-shared/analytics/types.ts` allowlist.

Run: `npx vitest run --config packages/web-shared/vitest.config.ts construction-cis/web/src/lib/resources/resources.test.ts` and `... construction-cis/web/scripts/resources/builders/`. Then regenerate the workbooks (`npm run resources:xlsx --workspace construction-cis/web`) and re-run the builder goldens against the emitted files. Grep the raw output for `failed|npm error` and confirm the exact pass count; never trust an "OK" marker (lesson §5.1). Flip each `enabled:true` in the registry ONLY after that asset's golden passes.

---

## 3. FAQ SET (10-12 Q&As, CIS deductions / refunds / GPS / materials prominent)

New file `src/lib/support/faq.ts`, ported from Dentists (`GENERIC` + `BY_TOPIC: Partial<Record<TopicKey, Faq[]>>` + `faqForTopic`). 3 generic + 8-9 topic-scoped = 11-12 total. Every answer short, HP-traced with the tax-year tag, points to the matching calculator where one exists, no em-dashes, no DJH, no chartered/qualified/MLR-supervised claim (the firm is a faceless brand, HP §12.A). CIS deductions / refunds / GPS / materials are the prominent themes.

**GENERIC (3):** reply time (a specialist replies within one working day); first call is free with no obligation; what to have ready (sole trader vs limited company, registered vs unregistered vs GPS, approximate annual CIS turnover).

**BY_TOPIC (map the answer to the right topic key):**
- `cis-refund` (2-3): "Am I owed a CIS refund?" (CIS is taken on labour before expenses and allowance, so most registered subbies overpay; HP §9; framed as entry service, no guaranteed amount); "How do I claim a CIS refund?" (sole trader via Self Assessment after year-end; limited company in-year via the Employer Payment Summary; HP §9); "How much is the average CIS refund?" (typical £2,000-£3,000, for content not guaranteed, HP §13).
- `cis-deductions` (2): "How much CIS is deducted from my pay?" (0% GPS / 20% registered / 30% unregistered, HP §1); **"Is CIS deducted on materials?"** (no, the deduction is on the labour element only, materials are excluded; worked £600 labour / £400 materials split; HP §1) - this is the materials-prominent answer.
- `gross-payment-status` (2-3): "How do I qualify for gross payment status?" (all three tests: business, turnover, compliance; the corrected turnover table £30,000 per head OR £100,000 whole-business for partnerships/companies; net excludes VAT and materials; HP §2 CORRECTED); "What changed for GPS in April 2026?" (Finance Act 2026, enacted, in force 6 April 2026; "knew or should have known"; 5-year reapplication ban; due-diligence duty; HP §3); "How much is GPS worth?" (the 20% no longer taken at source, roughly £100k/year cash flow on £500k turnover, HP §3).
- `limited-company` (1-2): "Am I better off as a CIS sole trader or on PAYE?" (self-employment usually leaves more on the same gross but you carry the deduction timing, no holiday/sick pay; 2026/27 rates; HP §11a); optionally "Can my limited company reclaim CIS in-year?" (yes, via the Employer Payment Summary, HP §9).

`faqForTopic(topic)` returns the topic block or `GENERIC`.

---

## 4. DETERMINISTIC PHASE-0 ASSISTANT (SpecialistWidget + journey model + opener), NO LLM

Port the trio from Dentists, re-token to orange/slate, re-prefix to `bfp`, re-noun to CIS topics. NO LLM chat (`OPENER_LLM_ENRICHMENT_ENABLED = false`). NO booking branch (construction-cis has `/contact`, no `/book`). Suppressed entirely for `isConverted()` visitors.

**`src/lib/intent/journeyModel.ts`:** port verbatim; storage key `bfp_journey` (never `dfp_`/`ptp_`). Trail = pages (topic derived via `deriveTopic`), sections, scroll depth, calc use, friction, special-page flags. **Confirm which of `/about`, `/services`, `/contact` exist on construction-cis before keeping all three flags** (Dentists kept all three because all three routes exist; check the cis route inventory and drop any flag whose route 404s). Stage ladder verbatim: researching -> comparing (>=2 topics or >=3 pages) -> evaluating-us (visited /about or /services) -> ready (used a calc, visited /contact, or returning). `getJourneyProfile()` returns `{ primaryTopic, secondaryTopic, stage, depth, signals, pageCount }`.

**`src/lib/assistant/opener.ts`:** `TOPIC_NOUN` + `TOPIC_HOOKS` (three escalating lines: curious -> helpful -> direct) per TopicKey, plus `frictionOpener`, `exitOpener`, `variantIndex`, `openerFor`/`pickOpener`. Voice rules LOCKED: one sentence per hook, no em-dashes, no tax-advice imperative, never claim chartered/qualified/MLR-supervised, generic-helpful (reference only what the visitor self-evidently did), no surveillance framing, no DJH.

Topic nouns and hooks (CIS-specific, all six TopicKeys must be present so the `Record<TopicKey, ...>` is exhaustive):
- `cis-refund` noun "your CIS refund": curious "Working out what CIS refund you are owed? I can pull up the estimator that does the labour-only sums."; helpful "Want a hand seeing how much of your CIS deductions come back after expenses and your allowance? Happy to point you to it."; direct "A free call with a CIS specialist will confirm your refund and the quickest way to claim it, want me to set one up?"
- `gross-payment-status` noun "gross payment status": curious "Checking if you qualify for gross payment status? I can pull up the three-test readiness checker."; helpful "Not sure your turnover clears the GPS threshold for your set-up? I can run you through the quick check."; direct "A specialist can talk through GPS and what April 2026 means for keeping it, free first call, want me to set one up?"
- `cis-deductions` noun "your CIS deductions": curious "Working out how much CIS comes off your pay? Remember it is the labour element only. I can show you the calculator."; helpful "Want to split an invoice into labour and materials to see the real deduction? I can point you to the tool."; direct "A free call will confirm your deductions and whether you are set up on the right rate, interested?"
- `self-assessment` noun "your Self Assessment": curious "Sorting your Self Assessment as a CIS subcontractor? I can pull up the estimator."; helpful "Want to see your SA bill after your CIS deductions are credited? Happy to point you to it."; direct "A specialist can get your Self Assessment and your CIS refund straight in one free call, want me to arrange it?"
- `limited-company` noun "your CIS take-home": curious "Weighing self-employed CIS against going on the books? There is a tool that shows both take-homes."; helpful "Want the like-for-like take-home, CIS self-employed versus PAYE employee, on the same gross? I can point you to it."; direct "A free call will get your structure and your take-home straight, want me to set one up?"
- `vat-reverse-charge` noun "the VAT reverse charge": curious "Trying to work out if the VAT domestic reverse charge applies to your job? I can point you to a quick answer."; helpful "Not sure whether you or your customer accounts for the VAT? Happy to walk you through the conditions."; direct "A free call with a specialist is the quickest way to get the reverse charge right on your invoices, want one?"

Combo opener (both `cis-refund` and `gross-payment-status` in the profile, the "get my refund then step up to GPS" journey): curious/helpful/direct lines matching the Dentists `COMBO_ASSOCIATE_PRINCIPAL` shape. Used-calculator override at the high-intent variant (mirror the Dentists `USED_CALC`). Generic fallback (mirror the Dentists `GENERIC`).

**`src/components/support/SpecialistWidget.tsx`:** port from Dentists, re-token orange/slate.
- Cadence thresholds ported VERBATIM: `CADENCE_THRESHOLDS_MS = [30_000, 70_000, 120_000, 180_000]`, `AUTO_OPEN_DELAY_MS = 600`. Storage keys `bfp_assistant_autoopened` and `bfp_assistant_active`.
- Init sets `sessionStorage["bfp_assistant_active"] = "1"` so `ExitIntentModal` stands down. **The cis R1 ExitIntentModal already reads `bfp_assistant_active` at `ExitIntentModal.tsx:87`; only the setter is new** (do not re-add the guard).
- Suppressed entirely when `isConverted()`. Fires escalating pings at the four dwell thresholds (visible-tab time), instantly on exit-intent and on `form_error` friction; never repeats a line verbatim; stops on engage.
- Capture = `email_only` through the chokepoint (`submitConstructionCisLead`, `captureMode: "email_only"` field, honeypot `enquiry_ref` passed through, no silent drop). Consent renders `siteConfig.leadConsentText` (the widget IS an enquiry). Success copy points to inbox + spam folder. Message prefix `[Specialist question (<topic>)] <question>`.
- Chips: "See your numbers" -> `/calculators/<primaryCalculator>` when the topic has one; "Book a free call" -> `/contact`. NO `/book` path.
- **Strip any DJH / partner "shared with" phrasing from the assistant surface** beyond the standard server-stamped consent line.
- Events: `personalization_shown`/`personalization_clicked`/`personalization_dismissed`, `support_opened`, `cta_click`, `lead_submitted`. All on the allowlist.
- Mount `<SpecialistWidget />` in `src/components/layout/PageShell.tsx` next to `<ExitIntentModal />` (the mount point exists; add the import + one line, mirroring the Dentists PageShell).

---

## 5. FILE MANIFEST, BUILD ORDER, REGRESSION INVARIANTS

### File manifest (paths under `construction-cis/web/`)
New (resources lib):
- `src/lib/resources/registry.ts` (TopicKey -> CategoryResource; 3 enabled pairs + aliases + no-asset topics)
- `src/lib/resources/copy.ts`
- `src/lib/resources/content.ts` (guide loader; **verify whether `@/lib/markdown-utils` exists on cis; if it does not, route through `@accounting-network/web-shared/content/markdown-utils` per the template, exactly as the site divergence note in the template §2 WS5**)
- `src/lib/resources/config.ts` (`RESOURCE_EMAIL_DELIVERY_ENABLED = false`)
- `src/lib/resources/resources.test.ts`

New (resources components):
- `src/components/resources/ResourceGate.tsx` (re-tokened orange/slate)
- `src/components/resources/CalculatorPageResources.tsx`
- `src/components/resources/ExcelPreview.tsx`

New (resources scripts):
- `scripts/resources/generate-xlsx.ts` (port verbatim: FIXED_DATE + `normalizeZipTimestamps` for byte-stable ZIPs)
- `scripts/resources/builders/index.ts` (BUILDERS registry; one entry per asset)
- `scripts/resources/builders/{cis-refund.ts, cis-vs-paye.ts, gps-readiness.ts}`
- `scripts/resources/builders/{cis-refund.test.ts, cis-vs-paye.test.ts, gps-readiness.test.ts}`

New (guide route + content):
- `src/app/resources/[topic]/page.tsx` (NOINDEX)
- `content/resources/{cis-refund.md, cis-vs-paye.md, gross-payment-status.md}`

New (support / assistant):
- `src/lib/support/faq.ts`
- `src/lib/intent/journeyModel.ts` (key `bfp_journey`)
- `src/lib/assistant/opener.ts`
- `src/components/support/SpecialistWidget.tsx`

New (public assets, generated + COMMITTED):
- `public/resources/cis-refund/cis-refund-model.xlsx`
- `public/resources/cis-vs-paye/cis-vs-paye-model.xlsx`
- `public/resources/gross-payment-status/gps-readiness-model.xlsx`

Edited (coordinated):
- `src/config/site.ts` (ADD `resourceConsentText`, in-house, one worker; do not touch `leadConsentText`/`partner`)
- `src/components/blog/BlogPostRenderer.tsx` (append `<ResourceGate>` after `<PremiumUpgrade>` at the mid-split AND short-post fallback, guarded by `hasEnabledResource(premiumTopic)`; coordinated with the R2 owner of this file)
- `src/components/layout/PageShell.tsx` (mount `<SpecialistWidget />` next to `<ExitIntentModal />`)
- calculator page shell (mount `<CalculatorPageResources slug={slug} />` once)
- `package.json` (add the `resources:xlsx` script if absent)

### Build order
1. Confirm R2 is in the tree (`cis-tax.ts`, premium registry/resources spine, `PremiumUpgrade` injected in BlogPostRenderer). If not, STOP.
2. Add `resourceConsentText` to `site.ts` (config gap).
3. Port the resources lib (registry/copy/content/config) + components (ResourceGate/CalculatorPageResources/ExcelPreview), re-tokened. Keep every asset `enabled:false`.
4. Port `scripts/resources/generate-xlsx.ts` + `builders/index.ts`; author the three builders (maths imports from `cis-tax.ts`, LET-free formulas, em-dash-free cells).
5. Write the three builder golden tests (execute `cis-tax.ts` in Node to derive expected cells); run `resources:xlsx`; goldens green; THEN flip each `enabled:true` one at a time.
6. Author the three guide markdown files (`content/resources/*.md`) + the NOINDEX guide route.
7. `resources.test.ts` (registry/copy/spine/compliance goldens).
8. Port `faq.ts`, `journeyModel.ts` (key `bfp_journey`, verify special-page routes), `opener.ts` (CIS nouns/hooks), `SpecialistWidget.tsx` (re-tokened, `bfp_` keys); mount in PageShell.
9. Wire the ResourceGate into BlogPostRenderer (coordinated) + CalculatorPageResources into the calculator page.
10. Manager integration battery (`npm test` + `npm run build --workspace construction-cis/web`), then the R3 gate pipeline (migration `20260706000001` signed for cis prod first).

### Regression invariants (Opus QA blocks on these)
- **captureMode field:** the ResourceGate and the SpecialistWidget both pass `captureMode: "email_only"` AS A FIELD on the submit payload (email-only capture; full-mode validation would 400 on the empty name/phone, the D-3 lesson). Both pass the `enquiry_ref` honeypot through without early-return.
- **LET-free formulas:** every xlsx builder uses banded `MIN`/`MAX`/`IF` arithmetic, NOT the Excel-365-only `LET()` (the Medical `incorporation.ts` lesson; `LET` renders `#NAME?` in older Excel / LibreOffice). The Dentists `associate.ts` used `LET` and is NOT the reference to copy for formulas; copy the Medical banded pattern.
- **YAML quoting:** guide frontmatter dates coerced via `String()` in the loader; no unquoted colon-space scalars; no BOM. Frontmatter lints clean in the predeploy gate.
- **Token rules:** orange/slate only. `var(--accent)` (#f97316) for brand accent, `var(--dark)` (#1e293b) for dark fill; NO `var(--gold)`/`var(--navy)` (Dentists-only; every ported occurrence must be re-tokened), NO `--primary` in classNames. Workbook header ARGB uses the orange/slate hexes, not navy/gold. Storage keys `bfp_*`.
- **xlsx === compute:** every builder's default-scenario output cell equals the `cis-tax.ts` `compute()` at the same inputs, to the penny (golden recomputation), BEFORE `enabled:true`. The GPS builder implements the CORRECTED capped rule (partnership 95000/heads-3 PASS golden).
- **Consent byte-match:** the resource gate renders `resourceConsentText` (in-house), NOT `leadConsentText`; the string contains no partner name. The assistant renders `leadConsentText` (correct, it is an enquiry).
- **extras.resource_gate** present on the gate insert; email delivery OFF (`/api/resources/deliver` not fired, no email promise in copy).
- **Assistant:** deterministic Phase-0 only (no LLM, no booking); thresholds `[30/70/120/180]s` verbatim; `bfp_assistant_active` stand-down set (R1 ExitIntentModal already reads it); suppressed for `isConverted()`; DJH/partner "shared with" phrasing absent from the assistant surface.
- **No em-dashes, no "DJH"** in any authored string OR workbook cell. Events on the allowlist only (no new names). `git diff baseline -- Property/` empty. `packages/web-shared` unchanged (all edits are site-local).
- **HP fidelity:** CIS 0/20/30% labour-only base (HP §1); GPS three-test + corrected £30k/£100k cap (HP §2); April-2026 anti-fraud framing on every GPS surface, "Finance Act 2026" never "Bill" (HP §3); refund as entry service, no guaranteed amount (HP §9, §12.B, §13); PA £12,570, Class 4 6%/2%, employee Class 1 8%/2% (HP §11a); UK-only, construction-only (HP §12.C, §12.D).
