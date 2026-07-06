# digital-agency R3 gated resources + specialist assistant brief (Agency Founder Finance, aff)

> Instantiation of `docs/_engines/CRO_PARITY_TEMPLATE.md` §2 (R3 - WS5 resources + WS6 widget/assistant) and §4 (R3 QA additions) for digital-agency (Wave 5, solo, after the cfp/cis twin and after this site's R2). Model the shape on the SHIPPED Dentists + Medical R3 (freshest): `Dentists/web/src/lib/resources/**`, `Dentists/web/src/components/resources/**`, `Dentists/web/scripts/resources/**`, `Dentists/web/src/lib/support/faq.ts`, `Dentists/web/src/lib/intent/journeyModel.ts`, `Dentists/web/src/lib/assistant/opener.ts`, `Dentists/web/src/components/support/SpecialistWidget.tsx`, and the Medical `incorporation.ts` builder (the LET-free-formula reference). NOT on Property emerald. Twin-sibling shape: `docs/contractors-ir35/R3_RESOURCES_ASSISTANT_BRIEF.md` + `docs/construction-cis/R3_RESOURCES_ASSISTANT_BRIEF.md` (read both; this brief follows their structure, precision and invariant style).
>
> Ships AFTER this site's R2 (`docs/agency/R2_PREMIUM_TOOLS_BRIEF.md`, the premium fleet on `src/lib/tools/premium/**`) is in the tree, and AFTER the resource-gate prod migration `20260706000001` is applied to digital-agency prod with individual owner sign-off. As of authoring, R2 is a landed BRIEF only (no `src/lib/tools/premium/` in the tree yet); R3 does not start until R2 code lands.
>
> aff is a CLEAN-ENGINE site: the 8 fleet compute libs in `src/lib/tools/compute/*` export pure numeric functions with GREEN goldens (`agency-tools.test.ts`), including the CORRECTED `rd-tax-credit.ts` (ERIS threshold 0.30, 86% deduction, 14.5% credit, verified in the tree this session). R3 xlsx builders golden against those libs and NEVER fork the maths. Every figure below is traced to `docs/agency/house_positions.md §N` (LOCKED 2026-07-05) and confirmed by EXECUTING the lib in Node (values shown in §1-§2).
>
> This is a LEAD-GEN site: no pricing, no client names, anonymised social proof, form-first contact (HP §10). NO credential claims anywhere (no ICAEW / ACA / CTA / chartered / "qualified" / "regulated" / MLR-supervised; HP §10). UK English. No em-dashes anywhere, including inside workbook cells (commas, parentheses, full stops, middle dots). No DJH anywhere, including the assistant surface and the resource gate. Do NOT write code from this brief; it is the contract Sonnet workers build to and Opus QA judges against.

Storage prefix: **aff** (FROZEN). Every new storage/session key is `aff_*` (never `ptp_`/`dfp_`/`cfp_`/`bfp_`/`ma_`). Tokens: indigo `--accent: #4f46e5` + slate `--ink: #0f172a` (+ `--accent-strong: #4338ca`, `--ink-soft: #334155`, `--surface: #f8fafc`, `--surface-elevated: #ffffff`, `--muted: #475569`, `--border: #e2e8f0`; optional emphasis `--amber-700: #b45309`). The site does NOT define `--gold`, `--navy` or `--dark` (Dentists-only), so any `var(--gold)`/`var(--navy)`/`var(--dark)` in a ported file is a defect, see §5. The site DOES define `--primary` (#4f46e5) but the estate portability rule forbids `var(--primary)` in component classNames: use `var(--accent)`. Font is Plus Jakarta Sans.

---

## 0. THE R2-BEFORE-R3 DEPENDENCY, THE ENGINES YOU GOLDEN AGAINST, AND THREE aff-SPECIFIC DIVERGENCES

R3 has a hard dependency on R2. **Do not build R3 until digital-agency R2 has landed the following in the tree**, because R3 wires into and computes against them:

1. **The `src/lib/tools/compute/*.ts` libs** are the single source of truth (they predate R2; they are NOT R2 outputs, but R2 is the release that adds the premium wrappers around them). R3's xlsx builders (§1) import the SAME exported pure functions the compute lib and the R2 premium config use, so the workbook and the site never drift:
   - `calcSalaryDividend` from `compute/salary-dividend.ts` (Pair 1)
   - `calcBadrCgt` from `compute/badr-cgt.ts` (Pair 2)
   - `calcVatScheme` from `compute/vat-scheme.ts` (Pair 3)
   **Do NOT add a new rates module and do NOT edit any `compute/*.ts` lib.** If a builder needs a number a lib does not export, escalate to the manager; do not fork the maths into the builder.
2. **`src/lib/tools/premium/resources.ts`** (the R2 topic-to-toolId spine) and **`src/lib/tools/premium/registry.ts`**: R3's `src/lib/resources/registry.ts` carries a `toolId` field per ENABLED topic that MUST match the R2 premium tool for that topic (see the Dentists registry `toolId` line), so the gate and the premium island agree on the same topic. The spine is reproduced in §1; the spine-consistency golden (§2) asserts equality.
3. **`src/components/blog/BlogPostRenderer.tsx`** already injects `<PremiumUpgrade topic={topicKey} placement="blog" category={categorySlug} />` immediately after the mid-split `<InlineMiniLeadForm>` (R2 §3). R3 appends `<ResourceGate topic={topicKey} />` immediately AFTER that `<PremiumUpgrade>`, guarded by `hasEnabledResource(premiumTopic)`. The topic is already computed once at renderer top as `const topicKey = topicForBlogSlug(categorySlug)` (SLUG-level, `BlogPostRenderer.tsx:57`).

### Three aff-specific divergences from the twin R3 briefs (do NOT copy the twins blindly here)

- **A. SINGLE blog injection point, NO short-post fallback branch.** The aff renderer mounts `<InlineMiniLeadForm>` UNCONDITIONALLY at the mid-split (`BlogPostRenderer.tsx:222`), regardless of whether the second content half is null, so a single injection point covers both long and short posts. R2 established this (R2 §3: "this renderer needs NO separate short-post fallback branch, unlike the Dentists renderer; do not add one"). R3's `<ResourceGate>` goes at the SAME single point, right after `<PremiumUpgrade>`. Do NOT add the Dentists-style short-post fallback branch.
- **B. Assistant + exit overlays mount in `app/layout.tsx`, NOT in `PageShell`.** On aff the qualified-lead `ExitIntentModal` is mounted in `src/app/layout.tsx:120` (inside `IntentProvider`, alongside `ReturningBar` and `DeepScrollModal`), NOT in `PageShell` (PageShell only mounts SiteHeader/main/SiteFooter/StickyCTA). So `<SpecialistWidget />` mounts in `app/layout.tsx` next to `<ExitIntentModal />` (line 120), inside `IntentProvider`. Do NOT mount it in PageShell.
- **C. The guide loader uses the site-local `@/lib/markdown-utils`, NOT web-shared.** `src/lib/markdown-utils.ts` EXISTS on aff and exports BOTH `addHeadingIds` and `extractHeadings` (verified this session), so `src/lib/resources/content.ts` ports from the Dentists loader VERBATIM (`import matter from "gray-matter"; import { addHeadingIds, extractHeadings } from "@/lib/markdown-utils";`). Do NOT route through `@accounting-network/web-shared/content/markdown-utils` (that was the cfp/cis workaround because their site-local module lacked the loader; aff does not need it). `gray-matter` (^4.0.3) is already a dependency.

### site.ts config gap (NEW field, coordinated one-line edit)

`digital-agency/web/src/config/site.ts` currently derives only `leadConsentText`, and on aff the `partner` is **`Reflex Accounting`** (`niche.config.json` → `partner.name`), so `leadConsentText` NAMES that partner. **R3 must ADD an in-house `resourceConsentText`** to `siteConfig`, mirroring the Dentists field (`Dentists/web/src/config/site.ts:70`), derived in-house from the display name (`niche.display_name` = "Agency Founder Finance"), NEVER through the `partner` branch:

> `resourceConsentText: \`I agree to Agency Founder Finance using my details to send me the free resource I have requested and to respond to any enquiry I submit.\``

Coordinated shared-config edit (one worker owns site.ts). Do NOT touch the `partner`/`leadConsentText` derivation. The resource gate renders `resourceConsentText` (in-house, must NOT contain "Reflex Accounting"); the assistant enquiry surface renders `leadConsentText` (the widget IS an enquiry, so the partner-aware line naming Reflex Accounting is CORRECT there, exactly as the twins' widgets render their `leadConsentText`).

---

## 1. THE GATED RESOURCE FLEET (3 gated pairs = xlsx workbook + NOINDEX guide)

Three topic pairs, each an xlsx model + a NOINDEX written guide, gated behind the email-only ResourceGate. Each pairs with the R2 premium tool for the same topic (the gate is the "take the model home" step after the in-blog calculator). The registry (`src/lib/resources/registry.ts`, ported from Dentists) maps `TopicKey -> CategoryResource` with `toolId`, `xlsx`, `guide`, `magnetTitle`, `magnetBlurbTemplate`, each with an `enabled` flag that stays FALSE until its golden passes (§2).

TopicKeys available (from `src/lib/intent/taxonomy.ts`, verified): `international`, `pay-planning`, `rnd`, `exit`, `compliance-vat`, `structure`. The registry is EXHAUSTIVE over all six.

### The 3-pair selection and the deliberate no-asset topics

The three gated pairs are the strongest, SAFEST agency money topics per house_positions and the R2 fleet: **pay-planning, exit, compliance-vat.** The other three R2 topics resolve to a specialist-call magnet with NO unlockable file (registry entries with `xlsx:null, guide:null, toolId:null`, exactly as the Dentists `compliance` topic and cfp `company-tax`/`basics-expenses`):
- **`structure`** (R2 tool `employer-cost-to-hire-premium`): the employer cost-to-hire tool is a single-figure cost calculator, not a "take home a working model" asset. No gated pair; resolves to the specialist call. Its 72 structure-category posts (incorporation-and-structure + agency-finance-essentials + agency-accountant-services + contractors-and-ir35) keep the R2 premium island + the specialist-call magnet, no gate.
- **`rnd`** (R2 tool `rd-tax-credit-premium`): a downloadable "R&D benefit model" would encourage over-claiming, which HP §4 EXPRESSLY forbids ("most agency projects do NOT qualify"; "steer founders away from over-claiming, not toward it"; "HMRC is actively auditing claims with penalties up to 100%"). A "take home the R&D model" resource is exactly the wrong signal. `rnd` also has `blogCategorySlugs: []` (no blog category maps to it), so a gate would never surface in-blog anyway. No gated pair; resolves to the specialist call.
- **`international`** (R2 topic excluded, `toolId: ""`): the UAE/relocation cluster. HP §8 locks only the UK-side positions; ALL UAE figures are content-derived with 6 OPEN-ITEMs and a mandatory "get UAE specialist advice" hedge (HP §8.C, §10). No UK-primary relocation compute lib exists. No gated pair; resolves to the specialist call.

### Pair 1 (FLAGSHIP) - Salary and dividend planning workbook
- **topic:** `pay-planning`. `toolId` = `salary-dividend-optimiser-premium` (R2 Tool 1).
- **xlsx file:** `/resources/pay-planning/salary-dividend-model.xlsx`; builder `scripts/resources/builders/salary-dividend.ts`.
- **builder maths (traced to `calcSalaryDividend` in `compute/salary-dividend.ts`, HP §2 + §3):** a full extraction breakdown at a CHOSEN salary (mirroring the lib's internal `modelExtraction`), so the workbook is a "here is the tax stack on this split" model, NOT an in-Excel optimiser loop. Highlighted "Your figures" inputs: `profitBeforeDirector` (default 120000), `salary` (default **12570**, the lib's optimal salary at the default single-director no-EA case), `useEmploymentAllowance` (default **No**). Computed rows (banded, LET-free): employer NI (15% above £5,000, minus the £10,500 EA ONLY when EA=Yes), profit after payroll, corporation tax (19% to £50,000, then the 26.5% marginal band, then 25% over £250,000), dividend (= distributable profit), employee NI (8%/2% banded), income tax on salary (20/40/45 banded, PA £12,570 tapered over £100k), dividend tax (10.75/35.75/39.35 with PA allocated to salary first then the £500 dividend allowance, then basic/higher/additional dividend bands net of salary band occupancy, replicating `calcDividendTax` band ordering EXACTLY), total tax, net cash. A "Rates" tab locks the 2026/27 constants; conservation cell `netCash = salary - employeeNi - incomeTax + dividend - dividendTax`.
- **default golden (EXECUTED, `calcSalaryDividend({ profitBeforeDirector:120000, useEmploymentAllowance:false }).optimal`):** salary **12570**, dividend **81876.46**, employerNi **1135.5**, employeeNi **0**, incomeTax **0**, dividendTax **19667.08**, corporationTax **24418.04**, totalTax **45220.63**, netCash **74779.37**. So the workbook net-cash cell at (120000, 12570, No) = **74779.37** to the penny. Add an EA=Yes case (salary 60000, useEA Yes) = `...({...:120000, useEmploymentAllowance:true}).optimal` → salary **60000**, dividend **47850**, netCash **76279.78** (proves the EA branch lifts salary to the £60,000 loop cap).
- **guide slug:** `pay-planning`; file `content/resources/pay-planning.md`; label "Salary and dividend planning guide 2026/27".
- **guide content (HP §2, §3, §2.A):** salary and dividends are taxed very differently; the 2026/27 dividend rates rose to 10.75/35.75/39.35 with a £500 allowance (FA 2026, tag 2026/27 on every rate); the load-bearing Employment-Allowance caveat (the £10,500 EA is NOT available to a company whose only employee is a single director, so most solo founder-director agencies cannot claim it and often set salary at the £5,000 secondary threshold, while an agency with a genuinely employed non-director can lift salary to £12,570; HP §2); employer NIC 15% above £5,000 from 6 April 2025 (never 13.8%/£9,100); there is NO single universal optimal salary, so treat the model as a starting point (HP §2); optionally the s.455 director's-loan point (an overdrawn loan account is charged at the dividend upper rate, 35.75% on loans from 6 April 2026, temporary with deferred s.458 relief; HP §2.A). Never publish a one-size-fits-all "optimal salary is £X".
- **magnetTitle:** "Get the salary and dividend planner".

### Pair 2 - Agency exit, CGT and BADR workbook
- **topic:** `exit`. `toolId` = `agency-exit-cgt-premium` (R2 Tool 2).
- **xlsx file:** `/resources/exit/agency-exit-cgt-model.xlsx`; builder `scripts/resources/builders/agency-exit-cgt.ts`.
- **builder maths (traced to `calcBadrCgt` in `compute/badr-cgt.ts`, HP §5):** two scenario columns on the SAME gain (two `calcBadrCgt` calls, `meetsEligibility` true and false), so the reader sees the BADR saving. Highlighted inputs: `saleProceeds` (default 750000), `originalCost` (default 50000), `previousBadrUsed` (default 0), `year` (default 2026/27). Computed rows (banded, LET-free): gain = MAX(0, proceeds - cost); BADR rate by year (14% for 2025/26, 18% for 2026/27); eligible slice = MIN(gain, 1,000,000 - previousBadrUsed); overflow slice at standard CGT 24%; BADR tax; total tax; net proceeds; effective rate. A "With BADR" scenario and a "Standard CGT (if you do not qualify)" scenario, each with its own conservation cell (`netProceeds = saleProceeds - totalTax`). A "Rates" tab locks the constants with the EXACT date band (14% to 5 Apr 2026, 18% from 6 Apr 2026).
- **default golden (EXECUTED, `calcBadrCgt({ saleProceeds:750000, originalCost:50000, previousBadrUsed:0, year:"2026/27", meetsEligibility:true })`):** gain **700000**, eligibleForBadr **700000**, badrTax **126000**, standardTax **0**, totalTax **126000**, netProceeds **624000**, effectiveRate **0.18**. Standard-CGT scenario (same inputs, `meetsEligibility:false`): totalTax **168000**, netProceeds **582000**, effectiveRate **0.24**. **Year 2025/26 case** (eligible): badrTax **98000**, netProceeds **652000**, effectiveRate **0.14** (proves the date-band rate switch). **Over-limit case** (saleProceeds 1500000, cost 0, 2026/27, eligible): eligibleForBadr **1000000**, notEligible **500000**, badrTax **180000**, standardTax **120000**, totalTax **300000**, netProceeds **1200000** (proves the £1,000,000 lifetime cap + 24% overflow).
- **guide slug:** `exit`; file `content/resources/exit.md`; label "Agency exit, CGT and BADR guide".
- **guide content (HP §5, §1, §8.A, §9 item 1):** share sale vs asset sale (single CGT layer + BADR on a share sale; double tax layer on an asset sale); CGT 18%/24% from 30 Oct 2024, AEA £3,000; BADR reduced rate on up to a £1,000,000 lifetime limit, **14% for disposals to 5 April 2026 and 18% from 6 April 2026** (state the exact date band EVERY time; NEVER reproduce the "10% to 18%" defect, HP §9 item 1); the 2-year qualifying conditions for a share sale (5% ordinary share capital + 5% voting rights + officer or employee throughout); the 6 Apr 2026 step from 14% to 18% as a live planning lever (unconditional exchange on or before 5 April 2026 fixes 14%, TCGA 1992 s.28); earn-outs usually taxed at the standard CGT rate not the BADR rate (the *Marren v Ingles* right-to-future-payment point, BADR generally does not reach the second disposal), and the income-vs-capital substance test (do not tie an earn-out to the seller's ongoing employment); s.162 incorporation relief to access BADR on a later share sale (HP §1). Include the hedged relocation line (UK-primary only, NO UAE figures): "If you plan to sell after leaving the UK, BADR is not available while you are non-resident and the temporary non-residence rule can pull a non-resident-period disposal back into UK CGT on your return, so take specialist advice before relocating (HP §8.A)." Never imply BADR is automatic.
- **magnetTitle:** "Get the agency exit and BADR model".

### Pair 3 - Agency VAT scheme comparison workbook (standard vs flat rate)
- **topic:** `compliance-vat`. `toolId` = `vat-scheme-comparator-premium` (R2 Tool 3).
- **xlsx file:** `/resources/compliance-vat/vat-scheme-model.xlsx`; builder `scripts/resources/builders/vat-scheme.ts`.
- **builder maths (traced to `calcVatScheme` in `compute/vat-scheme.ts`, HP §6):** two scenario columns (Standard, Flat Rate). Highlighted inputs: `turnover` (ex-VAT, default 180000), `vatInputs` (default 8000), `goodsSpend` (default 500). Computed rows (banded, LET-free): VAT collected = turnover x 20%; gross inclusive = turnover + collected; standard net = collected - input VAT; the limited-cost-trader test = goodsSpend < MAX(£1,000, gross inclusive x 2%); flat rate = IF(LCT, 16.5%, 12.5%); flat payment = gross inclusive x flat rate; best scheme = IF(standard net < flat payment, "Standard", "Flat Rate"); annual difference = ABS(standard net - flat payment). A "Rates" tab locks the constants.
- **default golden (EXECUTED, `calcVatScheme({ turnover:180000, vatInputs:8000, goodsSpend:500 })`):** vatCollected **36000**, grossInclusive **216000**, standardNet **28000**, lctApplies **true**, flatRate **0.165**, flatPayment **35640**, flatKeep **360**, bestScheme **"Standard"**, saving **7640**. So at default the workbook's LCT flag is TRUE, the flat rate cell is **16.5%**, and the best-scheme cell is **"Standard"** with a **£7,640** saving. **High-goods case** (turnover 180000, vatInputs 3000, goodsSpend 10000): standardNet **33000**, lctApplies **false**, flatRate **0.125**, flatPayment **27000**, bestScheme **"Flat Rate"**, saving **6000** (exercises the non-LCT branch). Assert the LCT rate is 16.5% at default (a rate-mix regression a `typeof` test would miss).
- **guide slug:** `compliance-vat`; file `content/resources/compliance-vat.md`; label "Agency VAT scheme guide".
- **guide content (HP §6):** agency services are standard-rated at 20%; register when taxable turnover exceeds £90,000 in any rolling 12 months, deregister below £88,000 (never the old £85,000); MTD for VAT applies to all VAT-registered businesses since April 2022; the Flat Rate Scheme (join at £150,000 or less, 1% first-year discount) and the load-bearing limited-cost-trader trap (goods under 2% of VAT-inclusive turnover or under £1,000 a year force the punitive 16.5% rate; agencies are overwhelmingly labour-and-software businesses so they are nearly always limited-cost traders, which makes the FRS usually a bad deal after reclaiming input VAT, HP §6); the overseas/UAE B2B reverse-charge principle as a place-of-supply CHECK not a fixed outcome (state the principle, advise a check, do not assert an outcome; OPEN-ITEM, HP §6). Balanced, never "always use the flat rate".
- **magnetTitle:** "Get the VAT scheme comparison model".

### The three no-asset topics (registry entries resolving to the specialist call)
`structure`, `rnd`, `international` each get a registry entry with `xlsx:null, guide:null, toolId:null` whose magnet points to a free specialist call (mirror the Dentists `compliance` no-asset entry). No alias into an enabled pair (unlike the cis `cis-deductions -> cis-refund` alias): none of the three shares an enabled topic's asset, and aliasing `structure` onto the pay-planning model would create an in-blog topic mismatch (the R2 structure island shows the employer-cost tool, so appending a salary-dividend gate on the same post would confuse the reader). `resourceForTopic` returns null / no enabled asset for all three; `hasEnabledResource(topic)` is false, so the blog `<ResourceGate>` renders nothing on structure / international posts and the R&D calculator page surfaces no gate (consistent with the §1 honesty boundary).

### Shared resource machinery to port (from Dentists, re-tokened indigo/slate)
- `src/lib/resources/{registry.ts, copy.ts, content.ts, config.ts, resources.test.ts}` (content.ts VERBATIM with `@/lib/markdown-utils`, see §0-C).
- `src/components/resources/{ResourceGate.tsx, CalculatorPageResources.tsx, ExcelPreview.tsx}` (Dentists has these; there is no separate `GateOrForm.tsx` in the Dentists tree, so do NOT invent one; the gate contains its own form-or-success branch).
- `src/app/resources/[topic]/page.tsx` (NOINDEX guide route, `dynamicParams = false`, `robots: { index:false, follow:false }`, `generateStaticParams` over `publishedGuideTopicsWithFile()`).
- `scripts/resources/{generate-xlsx.ts, builders/index.ts, builders/*.ts, builders/*.test.ts}`.

**config (`src/lib/resources/config.ts`):** `RESOURCE_EMAIL_DELIVERY_ENABLED = false` (no verified Resend from-domain for agencyfounderfinance.co.uk). While false: gate copy makes NO email promise ("Instant access on this page. No spam."), success copy says the download is ready on this page (not "sent by email"), and `/api/resources/deliver` is never fired. Inline `download` + guide read link work regardless.

**ResourceGate wiring (copy Dentists `ResourceGate.tsx` verbatim in behaviour, re-token indigo/slate):**
- Submits through `submitAffLead` (the R1 chokepoint client) with **`captureMode: "email_only"` AS A FIELD** on the payload (the field ALREADY exists on the aff submit-client at `submit-client.ts:39`). email_only is essential: the gate collects ONLY an email, so full-mode validation would 400 every submission on the empty name/phone (the Dentists D-3 lesson at `ResourceGate.tsx:143`). Message prefix `[Resource: <topic>] <magnetTitle>` keeps the 10-char message floor satisfied.
- **`extras: { resource_gate: true }`** on the insert (the prod trigger from migration `20260706000001` skips notify/enrich on it).
- Consent renders `siteConfig.resourceConsentText` (the NEW in-house field), NOT `leadConsentText`. The rendered gate string must NOT contain "Reflex Accounting".
- Honeypot field `enquiry_ref`: read the value, pass it through to `submitAffLead(payload, honeypotValue)`, do NOT early-return on a filled honeypot (the F4 silent-drop fix; the server stores the row flagged and returns success).
- Belt-and-braces: render nothing when `!hasEnabledResource(topic)`.
- Events: `gate_view` on scroll-into-view, `resource_unlocked` on success. Both on the existing allowlist (`packages/web-shared/analytics/types.ts`). No new event names.

**CalculatorPageResources:** port from Dentists; resolves the topic from the calculator slug via `topicForCalcSlug`, renders the `split` gate below the existing calculator when an asset is enabled, renders nothing otherwise. The aff calc-slug map (`taxonomy.ts` `CALC_SLUG_TO_TOPIC`) sends `salary-dividend-optimiser`+`pension-contribution-optimiser` → pay-planning (gate enabled), `badr-cgt-calculator`+`agency-valuation` → exit (gate enabled), `vat-scheme-comparator` → compliance-vat (gate enabled), `take-home-pay-calculator`+`employer-ni-calculator` → structure (no asset → renders nothing), `rd-tax-credit-estimator` → rnd (no asset → renders nothing, the deliberate honesty boundary). Mount `<CalculatorPageResources slug={slug} />` ONCE, in `src/app/calculators/[slug]/page.tsx` below the `<CalculatorClient>` section (it is a client component; the server page renders it directly). Never touches the calculator's server-rendered hero/H1/schema.

---

## 2. RESOURCE GOLDEN / QA CASES (executed against the libs, xlsx === compute)

New/ported test files: `src/lib/resources/resources.test.ts` (registry + copy invariants) and one `scripts/resources/builders/<asset>.test.ts` per builder (xlsx-vs-compute goldens). Model on the Dentists `associate.test.ts` and the Medical `incorporation.test.ts`. Every figure below was derived by EXECUTING the compute lib in Node at the default inputs; re-execute to confirm to the penny before pinning. No `typeof`-only assertions.

**Per builder (the drift guard, xlsx formula cell === lib output at default inputs):**
- **salary-dividend builder:** default (profitBeforeDirector 120000, salary 12570, useEA No) → the workbook net-cash cell equals `calcSalaryDividend({ profitBeforeDirector:120000, useEmploymentAllowance:false }).optimal.netCash` = **74779.37**, to the penny. Assert dividend **81876.46**, employerNi **1135.5**, corporationTax **24418.04**, dividendTax **19667.08**, totalTax **45220.63**, and the conservation cell = "OK". Add the EA=Yes case (salary 60000, useEA Yes) → netCash **76279.78** (matches `...({...}, useEmploymentAllowance:true).optimal`). **Dependency note: goldens against the fleet lib, so R2 must be in the tree first (the lib itself predates R2 but the release ordering is R2 then R3).**
- **agency-exit-cgt builder:** default (saleProceeds 750000, originalCost 50000, previousBadrUsed 0, year 2026/27) → the With-BADR total-tax cell equals `calcBadrCgt({...}).totalTax` = **126000**, net proceeds **624000**, effective rate **0.18**; the Standard-CGT scenario (`meetsEligibility:false`) total tax **168000**, net proceeds **582000**. **Year 2025/26 case:** badrTax **98000**, net proceeds **652000**, effective rate **0.14** (the date-band proof). **Over-limit case** (1500000 / 0 / 2026/27): eligible slice **1000000**, overflow **500000**, badrTax **180000**, standardTax **120000**, total tax **300000** (the £1,000,000 cap proof). Conservation cells "OK" both scenarios.
- **vat-scheme builder:** default (turnover 180000, vatInputs 8000, goodsSpend 500) → standardNet cell **28000**, flatRate cell **0.165**, flatPayment cell **35640**, bestScheme cell **"Standard"**, saving cell **7640**, lctApplies **true**. **High-goods case** (180000 / 3000 / 10000): flatRate **0.125**, flatPayment **27000**, bestScheme **"Flat Rate"**, saving **6000**, lctApplies **false**. Assert the LCT rate is 16.5% at default (the rate-mix regression a `typeof` test misses).

**Registry + copy goldens (`resources.test.ts`):**
- `resourceForTopic` maps every TopicKey and returns null for null/undefined; the three no-asset topics (`structure`, `rnd`, `international`) resolve to no enabled xlsx/guide (toolId null, magnet = specialist call).
- `isXlsxEnabled`/`isGuideEnabled`/`hasEnabledResource`/`enabledResourceTopics`/`publishedGuideTopics` behave (mirror the Dentists registry tests). Exactly three enabled topics.
- `toolId` per ENABLED topic equals the R2 premium toolId for that topic (spine consistency): pay-planning → `salary-dividend-optimiser-premium`; exit → `agency-exit-cgt-premium`; compliance-vat → `vat-scheme-comparator-premium`.

**Compliance goldens (copy the Dentists/Medical pattern, blocking):**
- No em-dash (U+2014 or the double-hyphen substitute) in any registry string, `magnetTitle`, `magnetBlurbTemplate`, gate copy, guide frontmatter, OR any workbook cell text (title/label/note/Start-here/Rates-tab label). The builders are em-dash-free.
- The string `"DJH"` appears nowhere in any resource string or workbook cell.
- No credential-claim substring (`ICAEW`, `ACA`, `CTA`, `chartered`, `qualified accountant`, `MLR`) in any registry string, guide frontmatter or workbook cell (HP §10).
- The rendered gate consent string equals `siteConfig.resourceConsentText` exactly and contains no partner name ("Reflex Accounting" absent).
- Every emitted event is on the `packages/web-shared/analytics/types.ts` allowlist.

Run: `npx vitest run --config packages/web-shared/vitest.config.ts digital-agency/web/src/lib/resources/resources.test.ts` and `... digital-agency/web/scripts/resources/builders/`, plus the existing `digital-agency/web/src/lib/tools/compute/agency-tools.test.ts` (must stay GREEN; R3 touches no compute lib). Then regenerate the workbooks (`npm run resources:xlsx --workspace digital-agency/web`) and re-run the builder goldens against the emitted files. Grep the raw output for `failed|npm error` and confirm the exact pass count; never trust an "OK" marker (template §5.1). Flip each `enabled:true` in the registry ONLY after that asset's golden passes.

---

## 3. FAQ SET (11-12 Q&As, salary/dividend + exit/BADR + VAT-limited-cost-trader prominent)

New file `src/lib/support/faq.ts`, ported from Dentists (`GENERIC` + `BY_TOPIC: Partial<Record<TopicKey, Faq[]>>` + `faqForTopic`). 3 generic + 9 topic-scoped = 12 total, spread so every TopicKey has a block (money topics get 2 each). Every answer short, HP-traced with the tax-year tag, points to the matching calculator where one exists, no em-dashes, no DJH, no chartered/qualified/ICAEW/MLR claim (faceless brand, HP §10). Salary/dividend split, exit/BADR and the VAT limited-cost-trader trap are the prominent themes.

**GENERIC (3):** reply time (a specialist replies within one working day); first call is free with no obligation; what to have ready (limited company or sole trader, approximate annual profit, single-director or with employees, VAT-registered or not).

**BY_TOPIC (map the answer to the right topic key):**
- `pay-planning` (2): "What is the most tax-efficient salary and dividend split?" (there is no single universal answer; it depends on Employment Allowance eligibility, and a single-director agency cannot claim the EA so often sets salary at the £5,000 secondary threshold, while an agency with a genuinely employed non-director can lift salary to £12,570; 2026/27; HP §2); "How are my dividends taxed in 2026/27?" (10.75/35.75/39.35 with a £500 allowance, on top of salary, FA 2026; HP §3).
- `exit` (2, prominent): **"How much Business Asset Disposal Relief can I get when I sell my agency?"** (a reduced CGT rate on up to a £1,000,000 lifetime gain, 14% for disposals to 5 April 2026 then 18% from 6 April 2026, if you hold at least 5% of shares and 5% of votes and are an officer or employee throughout the 2 years to disposal; HP §5) - the BADR-prominent answer; "How is an earn-out on my agency sale taxed?" (the right to a future performance-based payment is a separate chargeable asset, the *Marren v Ingles* point, so BADR usually does not reach it and the earn-out is generally taxed at the standard CGT rate; watch the income-vs-capital substance test; HP §5).
- `compliance-vat` (2, prominent): **"Should my agency use the VAT Flat Rate Scheme?"** (most agencies are limited-cost traders, which forces the 16.5% rate on gross takings, usually worse than the standard scheme after reclaiming input VAT; HP §6) - the limited-cost-trader-prominent answer; "When must my agency register for VAT?" (when taxable turnover exceeds £90,000 in any rolling 12 months, deregister below £88,000; MTD for VAT applies since April 2022; HP §6).
- `structure` (1): "Should my agency be a limited company?" (most agencies incorporate once profits are meaningful, for limited liability, retained earnings for hiring, and a share sale on exit, but incorporation is not automatically tax-saving and the 2026/27 dividend rise narrows the advantage; HP §1, §3).
- `rnd` (1, honesty-framed): "Does my agency qualify for R&D tax relief?" (most agency work does not; qualifying R&D must seek an advance in science or technology through genuine technical uncertainty, so routine web or app development, creative design and marketing campaigns are excluded, and HMRC audits claims hard; HP §4).
- `international` (1, hedged): "Can I avoid UK tax by moving my agency to Dubai?" (there is no automatic UK exit charge on unlisted agency shares, but the temporary non-residence rule can tax a non-resident-period disposal on your return unless you are non-resident for 5 complete tax years, and BADR is not available while non-resident; UAE-side figures need a UAE specialist; HP §8.A, §8.C).

`faqForTopic(topic)` returns the topic block or `GENERIC`.

---

## 4. DETERMINISTIC PHASE-0 ASSISTANT (SpecialistWidget + journey model + opener), NO LLM

Port the trio from Dentists, re-token indigo/slate, re-prefix to `aff`, re-noun to agency topics. NO LLM chat (`OPENER_LLM_ENRICHMENT_ENABLED = false`). NO booking branch (digital-agency has `/contact`, no `/book`; verified the route inventory). Suppressed entirely for `isConverted()` visitors (`isConverted` from `@accounting-network/web-shared/analytics/visitMemory`, the same source `IntentProvider.tsx:27` imports it from).

**`src/lib/intent/journeyModel.ts`:** port verbatim; storage key `aff_journey` (never `dfp_`/`ptp_`/`cfp_`/`bfp_`). Trail = pages (topic derived via `deriveTopic` from `@/lib/intent/deriveTopic`), sections, scroll depth, calc use, friction, special-page flags. **All three special-page routes `/about`, `/services`, `/contact` EXIST on digital-agency (verified this session), so keep all three flags.** Stage ladder verbatim: researching → comparing (>=2 topics or >=3 pages) → evaluating-us (visited /about or /services) → ready (used a calc, visited /contact, or returning). `getJourneyProfile()` returns `{ primaryTopic, secondaryTopic, stage, depth, signals, pageCount }`.

**`src/lib/assistant/opener.ts`:** `TOPIC_NOUN` + `TOPIC_HOOKS` (three escalating lines: curious → helpful → direct) per TopicKey, plus `frictionOpener`, `exitOpener`, `variantIndex`, `openerFor`/`pickOpener`. Voice rules LOCKED: one sentence per hook, no em-dashes, no tax-advice imperative, never claim chartered/qualified/ICAEW/MLR-supervised (HP §10), generic-helpful (reference only what the visitor self-evidently did), no surveillance framing, no DJH.

Topic nouns and hooks (agency-specific, all SIX TopicKeys present so the `Record<TopicKey, ...>` is exhaustive):
- `pay-planning` noun "your salary and dividend split": curious "Working out the most efficient salary and dividend split for your agency? I can pull up the optimiser."; helpful "Want to see how a split is taxed after the 2026/27 dividend rise, with the Employment Allowance caveat? Happy to point you to it."; direct "A free call with an agency finance specialist will confirm the sensible split for your company, want me to set one up?"
- `exit` noun "your agency exit": curious "Thinking about selling the agency and what CGT you would pay? I can pull up the exit and BADR model."; helpful "Want the like-for-like bill with and without Business Asset Disposal Relief on your numbers? I can point you to it."; direct "A specialist can talk through your exit, the BADR conditions and the April 2026 rate step in one free call, want me to arrange it?"
- `compliance-vat` noun "your agency VAT": curious "Checking whether the VAT Flat Rate Scheme is worth it for your agency? I can pull up the comparison."; helpful "Not sure if you are a limited-cost trader stuck on the 16.5% rate? I can run you through the quick check."; direct "A free call will get your VAT scheme and registration straight, want me to set one up?"
- `structure` noun "your agency structure": curious "Weighing whether to incorporate your agency? There is a tool that shows the take-home either way."; helpful "Want a hand seeing how your structure affects what you keep, with the employer NI and Employment Allowance in the mix? Happy to point you to it."; direct "A specialist can get your structure decision straight in one free call, want me to arrange it?"
- `rnd` noun "R&D tax relief": curious "Wondering whether your agency work counts as R&D? Most does not, but I can point you to a quick sense-check."; helpful "Want to know what a genuine technical advance looks like before you consider a claim? Happy to walk you through it."; direct "A free call with a specialist is the safest way to check whether you have a real R&D claim, want one?"
- `international` noun "moving your agency abroad": curious "Looking at moving the agency overseas and what it means for UK tax? I can point you to a starting answer."; helpful "Want to understand the temporary non-residence rule before you plan a move? Happy to help."; direct "A free call is the quickest way to get UK-side advice on relocating, and we will flag where you need a local specialist, want one?"

Combo opener (both `pay-planning` and `exit` in the profile, the "take profit efficiently now, sell well later" founder journey): curious/helpful/direct lines matching the Dentists `COMBO_ASSOCIATE_PRINCIPAL` shape. Used-calculator override at the high-intent variant (mirror the Dentists `USED_CALC`). Generic fallback (mirror the Dentists `GENERIC`).

**`src/components/support/SpecialistWidget.tsx`:** port from Dentists, re-token indigo/slate.
- Cadence thresholds ported VERBATIM: `CADENCE_THRESHOLDS_MS = [30_000, 70_000, 120_000, 180_000]`, `AUTO_OPEN_DELAY_MS = 600`. Storage keys `aff_assistant_autoopened` and `aff_assistant_active`.
- Init sets `sessionStorage["aff_assistant_active"] = "1"` so `ExitIntentModal` stands down. **The aff R1 ExitIntentModal already reads `aff_assistant_active` at `src/components/blog/ExitIntentModal.tsx:91`; only the setter is new** (do not re-add the guard). Do NOT reuse the `aff_modal_shown` key (that is the DeepScrollModal/ExitIntentModal per-page cap at `ExitIntentModal.tsx:85,96`, a different concern).
- Suppressed entirely when `isConverted()`. Fires escalating pings at the four dwell thresholds (visible-tab time), instantly on exit-intent and on `form_error` friction; never repeats a line verbatim; stops on engage.
- Capture = `email_only` through the chokepoint (`submitAffLead`, `captureMode: "email_only"` field, honeypot `enquiry_ref` passed through, no silent drop). Consent renders `siteConfig.leadConsentText` (the widget IS an enquiry, so the Reflex-Accounting partner line is correct here). Success copy points to inbox + spam folder. Message prefix `[Specialist question (<topic>)] <question>`.
- Chips: "See your numbers" → `/calculators/<primaryCalculator>` when the topic has one (pay-planning → salary-dividend-optimiser, exit → badr-cgt-calculator, compliance-vat → vat-scheme-comparator, structure → take-home-pay-calculator, rnd → rd-tax-credit-estimator; international has no calc, omit the numbers chip); "Book a free call" → `/contact`. NO `/book` path.
- **Strip any DJH / partner "shared with" phrasing from the assistant surface** beyond the standard server-stamped consent line.
- Events: `personalization_shown`/`personalization_clicked`/`personalization_dismissed`, `support_opened`, `cta_click`, `lead_submitted`. All on the allowlist.
- Mount `<SpecialistWidget />` in `src/app/layout.tsx` next to `<ExitIntentModal />` (line 120, inside `IntentProvider`), NOT in `PageShell` (see §0-B). Add the import + one line.

---

## 5. FILE MANIFEST, BUILD ORDER, REGRESSION INVARIANTS

### File manifest (paths under `digital-agency/web/`)
New (resources lib):
- `src/lib/resources/registry.ts` (TopicKey → CategoryResource; 3 enabled pairs + 3 no-asset topics; exhaustive over all six keys)
- `src/lib/resources/copy.ts`
- `src/lib/resources/content.ts` (guide loader; VERBATIM Dentists port using `@/lib/markdown-utils` + `gray-matter`, see §0-C)
- `src/lib/resources/config.ts` (`RESOURCE_EMAIL_DELIVERY_ENABLED = false`)
- `src/lib/resources/resources.test.ts`

New (resources components):
- `src/components/resources/ResourceGate.tsx` (re-tokened indigo/slate)
- `src/components/resources/CalculatorPageResources.tsx`
- `src/components/resources/ExcelPreview.tsx`

New (resources scripts):
- `scripts/resources/generate-xlsx.ts` (port verbatim: FIXED_DATE + `normalizeZipTimestamps` for byte-stable ZIPs; imports `BUILDERS` from `./builders/index`)
- `scripts/resources/builders/index.ts` (BUILDERS registry; one entry per asset)
- `scripts/resources/builders/{salary-dividend.ts, agency-exit-cgt.ts, vat-scheme.ts}`
- `scripts/resources/builders/{salary-dividend.test.ts, agency-exit-cgt.test.ts, vat-scheme.test.ts}`

New (guide route + content):
- `src/app/resources/[topic]/page.tsx` (NOINDEX)
- `content/resources/{pay-planning.md, exit.md, compliance-vat.md}` (frontmatter + raw-HTML body, mirroring the Dentists guide files; the loader sets `html = addHeadingIds(content.trim())` with no markdown-to-HTML render, so the body IS HTML)

New (support / assistant):
- `src/lib/support/faq.ts`
- `src/lib/intent/journeyModel.ts` (key `aff_journey`)
- `src/lib/assistant/opener.ts`
- `src/components/support/SpecialistWidget.tsx`

New (public assets, generated + COMMITTED):
- `public/resources/pay-planning/salary-dividend-model.xlsx`
- `public/resources/exit/agency-exit-cgt-model.xlsx`
- `public/resources/compliance-vat/vat-scheme-model.xlsx`

Edited (coordinated):
- `src/config/site.ts` (ADD `resourceConsentText`, in-house, one worker; do NOT touch `leadConsentText`/`partner`)
- `src/components/blog/BlogPostRenderer.tsx` (append `<ResourceGate topic={topicKey} />` immediately after `<PremiumUpgrade>` at the SINGLE mid-split point, guarded by `hasEnabledResource(topicKey)`; NO short-post fallback branch, §0-A; coordinated with the R2 owner of this file)
- `src/app/layout.tsx` (mount `<SpecialistWidget />` next to `<ExitIntentModal />` at line 120, §0-B)
- `src/app/calculators/[slug]/page.tsx` (mount `<CalculatorPageResources slug={slug} />` once, below `<CalculatorClient>`)
- `package.json` (add `"resources:xlsx": "tsx --tsconfig tsconfig.json scripts/resources/generate-xlsx.ts"` and add `exceljs` ^4.4.0 as a dependency; both are absent on aff and are required by the generator, matching the Dentists workspace)

NO edit to any `src/lib/tools/compute/*.ts`, the fleet `src/lib/tools/configs/*.ts`, the fleet `registry.ts`, the R2 `src/lib/tools/premium/*`, or any `components/calculators/*.tsx` (the orphaned 12). If a worker touches a compute lib, STOP: the builders wrap them, they do not change them.

### Build order
1. Confirm R2 is in the tree (`src/lib/tools/premium/` present with green `premium-tools.test.ts`; the premium `resources.ts` spine; `PremiumUpgrade` injected in BlogPostRenderer; `agency-tools.test.ts` green). If not, STOP.
2. Add `resourceConsentText` to `site.ts` (config gap). Add `exceljs` + the `resources:xlsx` script to `package.json`.
3. Port the resources lib (registry/copy/content/config) + components (ResourceGate/CalculatorPageResources/ExcelPreview), re-tokened indigo/slate. Keep every asset `enabled:false`.
4. Port `scripts/resources/generate-xlsx.ts` + `builders/index.ts`; author the three builders (maths imports from the `compute/*` libs, LET-free banded formulas, em-dash-free cells).
5. Write the three builder golden tests (execute the `compute/*` libs in Node to derive expected cells); run `resources:xlsx`; goldens green; THEN flip each `enabled:true` one at a time.
6. Author the three guide files (`content/resources/*.md`) + the NOINDEX guide route.
7. `resources.test.ts` (registry/copy/spine/compliance goldens).
8. Port `faq.ts`, `journeyModel.ts` (key `aff_journey`, all three special-page flags), `opener.ts` (agency nouns/hooks), `SpecialistWidget.tsx` (re-tokened, `aff_` keys); mount `<SpecialistWidget />` in `app/layout.tsx` (§0-B).
9. Wire `<ResourceGate>` into BlogPostRenderer (coordinated, single point, no fallback) + `<CalculatorPageResources>` into the calculator page.
10. Manager integration battery (`npm test --workspace digital-agency/web` + `npm run build --workspace digital-agency/web`), then the R3 gate pipeline (migration `20260706000001` signed for digital-agency prod first).

### Regression invariants (Opus QA blocks on these)
- **captureMode field:** the ResourceGate and the SpecialistWidget both pass `captureMode: "email_only"` AS A FIELD on the submit payload (email-only capture; full-mode validation would 400 on the empty name/phone, the D-3 lesson). Both pass the `enquiry_ref` honeypot through without early-return.
- **LET-free formulas:** every xlsx builder uses banded `MIN`/`MAX`/`IF` arithmetic, NOT the Excel-365-only `LET()` (the Medical `incorporation.ts` lesson; `LET` renders `#NAME?` in older Excel / LibreOffice). The Dentists `associate.ts` used `LET` and is NOT the reference to copy for formulas; copy the Medical banded pattern.
- **YAML quoting:** guide frontmatter dates coerced via `String()` in the loader; no unquoted colon-space scalars; no BOM. Frontmatter lints clean in the predeploy gate.
- **Token rules:** indigo/slate only. `var(--accent)` (#4f46e5) for brand accent, `var(--ink)` (#0f172a) for dark fill / a second series (optional emphasis `var(--amber-700)` #b45309); NO `var(--gold)`/`var(--navy)`/`var(--dark)` (Dentists-only; every ported occurrence re-tokened, `--gold → --accent`, `--navy → --ink`), NO `var(--primary)` in classNames (use `--accent`). Workbook header ARGB uses the indigo/slate hexes, not navy/gold. Storage keys `aff_*`.
- **xlsx === compute:** every builder's default-scenario output cell equals the `compute/*` lib output at the same inputs, to the penny (golden recomputation), BEFORE `enabled:true`. Salary-dividend net cash 74779.37; exit With-BADR total tax 126000 (2026/27) and 98000 (2025/26); VAT standard net 28000 with LCT rate 16.5%.
- **Consent byte-match:** the resource gate renders `resourceConsentText` (in-house), NOT `leadConsentText`; the string contains no "Reflex Accounting". The assistant renders `leadConsentText` (correct, it is an enquiry, and the Reflex line is expected there).
- **extras.resource_gate** present on the gate insert; email delivery OFF (`/api/resources/deliver` not fired, no email promise in copy).
- **Assistant:** deterministic Phase-0 only (no LLM, no booking); thresholds `[30/70/120/180]s` verbatim; `aff_assistant_active` stand-down set (R1 ExitIntentModal already reads it at `:91`); suppressed for `isConverted()`; DJH/partner "shared with" phrasing absent from the assistant surface; mounted in `app/layout.tsx` not PageShell.
- **Blog wiring:** `<ResourceGate>` appended at the SINGLE mid-split point after `<PremiumUpgrade>`, guarded by `hasEnabledResource`; NO short-post fallback branch (§0-A). Renders nothing on structure / rnd / international posts.
- **No em-dashes, no "DJH", no credential claims** (`ICAEW`/`ACA`/`CTA`/`chartered`/`qualified`/`MLR`, HP §10) in any authored string OR workbook cell. Events on the allowlist only (no new names). `git diff baseline -- Property/` empty. `packages/web-shared` unchanged (all edits are site-local; if a worker touches web-shared, stop and escalate).
- **HP fidelity:** dividends 10.75/35.75/39.35 + £500 allowance, FA 2026, 2026/27 (HP §3); employer NIC 15% above £5,000, EA £10,500 single-director exclusion (HP §2); CT 19/25 with the 26.5% marginal band (HP §2/§3); BADR 14% to 5 Apr 2026 / 18% from 6 Apr 2026, £1,000,000 lifetime limit, 2-year 5%+5%+officer conditions, earn-out usually standard CGT (Marren v Ingles), NEVER the "10% to 18%" defect (HP §5, §9 item 1); VAT reg £90,000 / dereg £88,000, limited-cost-trader 16.5%, 2%/£1,000 goods test, MTD since April 2022 (HP §6); R&D honesty boundary (no downloadable claim-model; most agency work does not qualify, HP §4); UAE/relocation hedged UK-primary only, no firm UAE figures (HP §8, §8.A, §8.C, §10). Tag 2026/27 on every volatile rate.
