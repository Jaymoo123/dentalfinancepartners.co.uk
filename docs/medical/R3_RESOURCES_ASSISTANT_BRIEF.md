# Medical R3 · gated resources (WS5) + SpecialistWidget / proactive assistant (WS6) · build brief

**Site:** Medical Accountants UK · www.medicalaccounts.co.uk · specialist accountancy for UK medical professionals (GP partners, salaried GPs, hospital consultants, locum doctors and private-practice owners; NHS Pension Scheme, private-practice incorporation, GP contracts and premises).
**Programme:** R3 (wave 3) of the estate CRO parity programme. R1 shipped the server chokepoint, intent layer and in-blog mid-scroll capture. R2 (M-2) shipped the 3-tool premium fleet (`nhs-pension-premium`, `locum-take-home-premium`, `incorporation-premium`) on the CORRECTED compute libs (6% Class 4, 2026/27 dividends). R3 adds (WS5) email-gated downloadable resources delivered ON-PAGE and (WS6) the SpecialistWidget / proactive journey-aware deterministic assistant. Both mirror Property's shipped frameworks via the wave-1 generalist and the SHIPPED Dentists R3 ports, re-themed to the Medical navy/copper CSS-variable token system.
**Repo:** `C:\Users\user\Documents\Accounting`. Site root: `Medical/web/`. Vercel link lives at `Medical/.vercel` (NOT `Medical/web/.vercel`); project `prj_50vByZ3rqXQQwCUeENUTBbNBB41n`, key `medical`.
**Author:** Opus architect (design only, no code written). **Workers:** Sonnet build the components/config/xlsx builders; Opus writes the resource-guide bodies + FAQ + assistant copy; the manager does the `src/config/site.ts` edit, taxonomy `resourceId` wiring, all git/migrations/gates/deploys.

This brief is the single source of truth for the Sonnet workers. Do NOT invent figures. Every number traces to an existing Medical compute lib (`Medical/web/src/lib/tools/compute/*`, the CORRECTED R2 libs), a `§N` position in `docs/medical/house_positions.md` (HP, LOCKED 2026-06-03), or the R2 golden test (`Medical/web/src/lib/tools/premium/premium-tools.test.ts`, all figures executed 2026-07-06). Where a fact cannot be traced it is FLAGGED in Section 6 and must NOT ship until the orchestrator resolves it.

Source frameworks studied at HEAD: the SHIPPED Dentists R3 code (`Dentists/web/src/{lib,components,app}/**/resources/**`, `Dentists/web/src/lib/support/faq.ts`, `Dentists/web/src/lib/intent/journeyModel.ts`, `Dentists/web/src/lib/assistant/opener.ts`, `Dentists/web/src/components/support/SpecialistWidget.tsx`, `Dentists/web/src/app/resources/[topic]/page.tsx`) plus the generalist originals. Dentists, like Medical, is a CSS-variable-token site (navy/gold on Dentists; navy/copper on Medical), so the Dentists port is the closest sibling, not the tailwind-utility generalist.

---

## 0. Architecture decisions (read first)

### 0.A Medical is the navy/copper token tier (same posture as R2, same shape as Dentists navy/gold)

Medical has NO radix / recharts / shadcn / lucide-in-islands / clsx / tailwind-merge stack for the R3 surfaces (the calc pages import `lucide-react` for a page icon, but the R3 islands stay dependency-free). Its design system is CSS-variable tokens in `src/app/globals.css` (verified at source): `--navy` (#001b3d), `--navy-soft`, `--navy-muted`, `--navy-light`; `--copper` (#b87333), `--copper-strong` (#a0622b), `--copper-soft` (rgba(184,115,51,0.14)), `--copper-light`; `--background` (#f4f6f9), `--surface` (#fff), `--surface-elevated` (#eef1f6), `--ink` (#001b3d), `--ink-soft` (#2d3f5c), `--muted` (#5c6b80), `--border` (#e2e8f0); semantic aliases `--accent` = `--copper`, `--accent-strong` = `--copper-strong`, `--accent-soft` = `--copper-soft`, and (critically) `--gold` = `--copper`, `--gold-strong` = `--copper-strong`, `--gold-soft` = `--copper-soft`. Fonts: Plus Jakarta Sans (`--font-sans`) + a serif (`--font-serif`) used by MiniCapture headings.

**TOKEN HARDENING (do not regress · Medical-specific).** Medical DOES define `--primary` (`--primary: var(--navy)`), but the LOCKED constraint is **never rely on `var(--primary)`** (estate-portability rule). During the port, every `orange-*`, every `emerald-*` and every `var(--primary)` in the copied Dentists/generalist components MUST be re-skinned to a DEFINED Medical brand token:
- brand accent bar / active states / focus rings / consent-checkbox accent → `var(--copper)` (checkbox: `accent-[var(--copper)]`; focus: `focus:border-[var(--copper)] focus:ring-2 focus:ring-[var(--copper)]/25`). The Dentists R3 components already use `var(--gold)`, which on Medical resolves to copper via the alias, so a copied `var(--gold)` is technically correct; PREFER writing `var(--copper)` explicitly in NEW Medical code so the token intent is legible, and treat any residual `var(--gold)` as acceptable-but-flag-in-QA (it renders identically). Do NOT introduce `orange-*`/`emerald-*`, and do NOT rely on `var(--primary)`.
- dark brand fill (widget header, eyebrow chip background, modal scrim) → `var(--navy)` (white text on it); the widget avatar/pip halo can keep a neutral alert colour.
- sub-labels / helper text → `var(--muted)` / `var(--ink-soft)`; surfaces → `var(--surface)` / `var(--surface-elevated)`; borders → `var(--border)`; card left-accent → `border-[var(--copper)]`.
The existing Medical `MiniCapture` (`src/components/forms/MiniCapture.tsx`) and the Medical `ExitIntentModal` (`src/components/blog/ExitIntentModal.tsx`) are the canonical styling idiom to copy: input class `border-[var(--border)] bg-[var(--surface)] ... focus:border-[var(--copper)] focus:ring-2 focus:ring-[var(--copper)]/25`, card `rounded-2xl border-l-4 border-[var(--copper)] bg-[var(--surface)] p-6 sm:p-8`, headings `font-serif text-[var(--ink)]`, checkbox `accent-[var(--copper)]`, scrim `bg-[var(--navy)]/60`, kicker `text-[var(--copper-strong)]`.

**Success-box colour (F7):** the existing Medical `MiniCapture` keeps an emerald success box (`border-emerald-200 bg-emerald-50 text-emerald-900`), the one non-navy/copper survivor (identical to the Dentists MiniCapture). For NEW R3 surfaces PREFER a copper-tinted success (`border-[var(--copper-soft)] bg-[var(--surface-elevated)] text-[var(--navy)]`) so no new emerald leaks in; matching the existing MiniCapture emerald is acceptable if the worker prefers strict consistency. Orchestrator's call, flag either way in QA.

### 0.B On-page delivery only (email path stubbed)

Property's `ResourceGate` reveals the download links inline AND best-effort-fires `/api/resources/deliver` (a Resend email). **Medical Accountants UK has no verified Resend from-domain**, so R3 ships **on-page delivery only** (identical to the generalist, Solicitors and Dentists ports):

- The inline reveal is the ENTIRE delivery mechanism: on success show the xlsx `<a href download>` + the guide `<a href="/resources/<slug>">` read link.
- Gate the deliver fetch behind a `RESOURCE_EMAIL_DELIVERY_ENABLED = false` constant in `src/lib/resources/config.ts`. While false, the `/api/resources/deliver` POST is NOT fired (wrap the whole `fetch` block in `if (RESOURCE_EMAIL_DELIVERY_ENABLED) { ... }`). Re-enabling later, once a from-domain exists, is a one-line flip.
- Success copy makes NO email promise: `You're in. Your download is ready below.` Footer microcopy: `Instant access on this page. No spam.` Button label `Get the model` / `Unlocking...`. Do NOT ship "we've emailed you a copy".
- No `/api/resources/deliver` route is required in R3. Optionally add a graceful no-op stub returning `{ ok: true, delivered: false, reason: "email-not-configured" }` so the client contract is stable later; do NOT wire the client `fetch` to it now.

### 0.C Consent wording (in-house-only, never partner-shared)

Medical `niche.partner` is `{ name: "Reflex Accounting", privacy_policy_url: null }` (confirmed in `Medical/niche.config.json:17`), so `siteConfig.leadConsentText` names Reflex (the lead pipeline routes owner-inbox + Reflex CC per the CRO programme). **Resource downloads must NOT use that string.** Add a SECOND string `resourceConsentText` to `src/config/site.ts` (the site currently has NO `resourceConsentText` · confirmed read of `src/config/site.ts`), mirroring Property/generalist/Solicitors/Dentists:

```
const resourceConsentText = `I agree to ${niche.display_name} using my email to send me the resource I requested.`;
```

This names only the firm (`Medical Accountants UK`), never Reflex, and is a marketing/legitimate-marketing consent for a one-off resource send. **MANAGER TASK:** add `resourceConsentText` to `siteConfig` and export it (Medical's `siteConfig` derives `leadConsentText` from `partner`; add `resourceConsentText` as a sibling that never references `partner`). The gate appends `" See our Privacy Policy."` + a `/privacy-policy` link and keeps an explicit tick-to-consent checkbox (never notice-only). **The string "DJH" must never appear anywhere** (it does not appear in the Medical codebase today; do not introduce it). **The string "Reflex" must never appear in the resource-gate copy or `resourceConsentText`.**

**Leads source (verified):** `source: "medical"` is `niche.content_strategy.source_identifier` (`Medical/niche.config.json:139`) and is an accepted value of the shared `leads.source` CHECK (per the estate `generalist_lead_source_identifier` note: dentists/property/medical/solicitors/general/agency). No leads-source migration is needed for Medical.

**`extras: { resource_gate: true }` is mandatory on the ResourceGate insert.** The prod notify/enrich skip trigger is estate-shared and LIVE via migration `20260706000001_resource_gate_notify_skip.sql` (`WHEN (coalesce(NEW.extras->>'resource_gate','') <> 'true')`), so a resource-gate row does NOT flow through the lead-notify path (no Reflex CC) and consumes no paid AI/Companies-House enrichment; it stays fully visible in the console + `leads` table as a nurture-pool audience. **MANAGER GATE:** VERIFY this migration is live on the Medical prod DB (individually owner-signed) before R3 ships. The assistant/MiniCapture inserts do NOT carry this flag, only the resource gate.

### 0.D Assistant = Property's DETERMINISTIC Phase-0 machinery only

Journey model + escalating ping + opener copy. **No LLM chat** (`OPENER_LLM_ENRICHMENT_ENABLED = false`). The widget composer's `email_only` capture flows through the existing chokepoint (`submitMedicalLead(payload, honeypot)` with `captureMode: "email_only"`; `submit-client.ts` already supports both). The widget IS an enquiry, so it correctly keeps `siteConfig.leadConsentText` (the Reflex-aware line the server also stamps). No "shared with Reflex" phrasing is added in the assistant's own copy beyond that standard consent line. No booking concierge (there is no `/book` path on Medical · the "call" chip points to `/contact`).

### 0.E xlsx generator (build-time only, adds `exceljs` + `tsx`)

Mirror the generalist/Dentists `scripts/resources/generate-xlsx.ts` + `scripts/resources/builders/*`. Adds `exceljs` + `tsx` as devDependencies (both ABSENT from `Medical/web/package.json` · confirmed; `gray-matter` is already present) and a `"resources:xlsx": "tsx scripts/resources/generate-xlsx.ts"` script. The generator is NOT part of `next build`; run manually. Generated `.xlsx` files are COMMITTED and byte-stable (the generalist `normalizeZipTimestamps` ZIP-header rewrite + fixed `wb.created/modified = 2024-01-01`). Set `wb.creator = wb.lastModifiedBy = "Medical Accountants UK"` (own brand, never Reflex/DJH).

**CRITICAL Medical divergence · no shared `uk-tax-rates.ts` (flag F1).** The generalist builder imports a structured `UK_TAX_RATES` object from `src/lib/uk-tax-rates.ts`. **Medical has NO `uk-tax-rates.ts`** (confirmed absent; same posture as Dentists). Each Medical compute lib hardcodes its own module-level constants (`STANDARD_ALLOWANCE = 60000`, `DIVIDEND_BASIC_RATE = 0.1075`, `PERSONAL_ALLOWANCE = 12570`, etc.). So each Medical xlsx builder MUST source its rate cells from the SAME compute lib the tool uses, one of two ways (orchestrator's call, prefer the first):
1. **Re-export the constants from the compute lib.** Add named exports to the relevant `compute/*.ts` for the constants the builder needs (a pure additive change: `export const STANDARD_ALLOWANCE = 60000;` etc.), then import them in the builder. This makes drift impossible.
2. **Mirror the constants literally in the builder with a `// traced to compute/<lib>.ts` comment**, and let the golden test (Section 4.1) catch any drift (the golden asserts the xlsx formula result === the lib `compute()` at defaults, so a mistyped constant fails the gate). This is the lower-touch route and is acceptable because the golden is the real guard.
Whichever route, the builder's `Rates` sheet carries every rate as a named cell and the `Your figures` formulas reference those named cells (no hard-coded result cells), exactly like the generalist builder (`wb.definedNames.add("Rates!$B$row", "Name")`, blue input cells `fill FFDBEAFE` + `protection: { locked: false }`, `rates.protect()`).

### 0.F R2 dependency (this release sits on top of R2)

R3's blog injection and all three workbooks depend on R2 (M-2) having landed the Medical premium tier. Verified at HEAD: `BlogPostRenderer.tsx` ALREADY injects `<PremiumUpgrade topic={premiumTopic} placement="blog" category={categorySlug} />` at the mid-split (before `InlineMiniLeadForm`) with a short-post fallback, and the premium tier exists (`src/lib/tools/premium/{types,registry,resources}.ts` + 3 configs + `premium-tools.test.ts`). Therefore:
- **R3 ships AFTER R2** (per the release ladder · never bundle). The R3 blog injection is a coordinated append-on-top of R2's `PremiumUpgrade` island in `BlogPostRenderer.tsx` (place the `ResourceGate` at a LATE point, after the premium island and the mid-scroll `InlineMiniLeadForm`, so the free tool leads and the download lands lower).
- All three workbooks reuse the EXISTING R2 compute libs (`nhs-pension.ts`, `locum-tax.ts`, `incorporation.ts`); no new compute lib is created by R3 (contrast Dentists, which needed a new `practice-sale-cgt.ts`). Medical has **no** practice-sale/purchase/CGT workbook because **NHS GP goodwill cannot be sold** (HP §4) · that dental playbook does NOT translate, and there is no valuation/CGT compute lib to trace. See 0.H.

### 0.G Allowlisted events this feature may emit (verified in the shared analytics types, cross-site)
`gate_view`, `resource_unlocked`, `support_opened`, `personalization_shown`, `personalization_clicked`, `personalization_dismissed`, `cta_click`, `form_start`, `form_field_focus`, `form_field_abandon`, `form_submit`, `form_error`, `lead_submitted`, `calc_computed`, `section_view`, `scroll_depth`, `exit_intent_shown`. **No new event names.**

### 0.H Topic model + why only 3 resources (Medical divergence from Dentists' 5)

Medical's taxonomy has FIVE `TopicKey`s (`gp-practice | gp-tax | nhs-pension | locum | incorporation-private` · `src/lib/intent/taxonomy.ts`, confirmed), NOT Dentists' seven. There is no `buying`/`selling`/`uda-calc`/`compliance`. The R2 premium fleet is 3 tools mapping to 4 topics (`resources.ts`: `nhs-pension`→nhs, `locum`→locum, `gp-tax`→locum tool with a gp-tax framing, `incorporation-private`→incorporation; `gp-practice`→`""`). R3 ships **3 gated resource pairs** aligned to the 3 premium TOOLS (not to all 5 topics):
- **NHS pension AA/taper model** (topic `nhs-pension`, flagship) · `nhs-pension-premium`.
- **Doctor take-home model** (topic `locum`, ALSO surfaced on `gp-tax`) · `locum-take-home-premium`.
- **Private-practice incorporation model** (topic `incorporation-private`) · `incorporation-premium`.
- `gp-practice` stays a specialist-contact topic with NO enabled asset (mirrors Dentists `compliance` and the R2 `gp-practice`→`""` mapping). `gp-tax` reuses the `locum` (doctor take-home) asset as an alias entry point (same resource, different topic key · mirrors Dentists `uda-calc`→`nhs`).

The registry is total over the 5 `TopicKey`s: `nhs-pension`, `locum`, `incorporation-private` carry enabled assets; `gp-tax` aliases the `locum` asset; `gp-practice` carries `xlsx: null, guide: null`.

### 0.I /medical-guides relationship (decided)
`/medical-guides` is a hardcoded TypeScript array (`src/lib/medical-guides-data.ts`, `MEDICAL_GUIDES: MedicalGuide[]`, served at `/medical-guides/[slug]`), NOT markdown files. The audit flagged this as a data-model decision: **keep those guides UNGATED, indexable pillar content · untouched.** The R3 gated assets are NEW artefacts: a NEW `content/resources/<topic>.md` set (the site's FIRST `content/resources/` dir · `content/` currently holds only `blog/`) behind a NOINDEX `/resources/[topic]` route, plus the Excel workbooks. The gated guides are tighter, model-companion pieces (how to use the workbook + the decision behind it), NOT copies of the pillar guides. Do NOT gate, move, or noindex any existing `/medical-guides` content or `medical-guides-data.ts`.

### 0.J FLAT routing (Medical-specific, do not regress)
Medical uses FLAT `/blog/[slug]` routing (no `/blog/[category]` segment on posts). The topic is resolved server-side from `post.category` (via `topicFromCategory`) and injected into the intent context via `TopicOverrideProvider`; the premium island and any R3 blog island must take the topic from the `categorySlug` PROP (via `topicForBlogSlug(categorySlug)`), NEVER from `window.location` or URL parsing. Use `scripts/medical_flat_link_audit.py` for link audits, never the shared nested slug tooling (it false-positives on flat routing). There is no dynamic `[category]` hub to touch in R3.

### 0.K Confirmed reusable Medical infrastructure (no rebuild)
- `submitMedicalLead(payload, enquiryRef)` (`src/lib/leads/submit-client.ts`) routes through `/api/leads/submit` with the direct-insert fallback; the `MedicalLeadPayload` type ALREADY declares `extras?: Record<string, unknown>` and `captureMode?: "full" | "email_only"` (confirmed). Used by `MiniCapture`. On a 4xx it returns the route error and does NOT fall back; only 5xx/network falls through and stores the honeypot flag.
- `siteConfig` (`src/config/site.ts`), `niche` (`src/config/niche-loader.ts`), `niche.content_strategy.source_identifier === "medical"`, `niche.lead_form.placeholders.email` (`"sarah@example.com"`, exists).
- `deriveTopic(pathname)` + `getTopic(key)` (5 topics) + `topicForBlogSlug` / `topicForCalcSlug` + `topicFromCategory(category)` (`src/lib/intent/deriveTopic.ts` + `taxonomy.ts`, read-only · already correct).
- `useIntentContext()`, `TopicOverrideProvider`, `useTopicOverride()` (`src/components/intent/IntentProvider.tsx`). IntentProvider is mounted in `layout.tsx:108` inside AnalyticsProvider with `storagePrefix="ma"`, `posture="opt-out"`, `noTrackPrefixes={["/admin", "/embed"]}`.
- `MiniCapture` (already exposes `messagePlaceholder`/`messageMinLength`/`messageMinWords`/`onSuccess`), `useFormTracking` (shared), `btnPrimary` (`src/components/ui/layout-utils.ts`), site-local `@/lib/markdown-utils` (exports BOTH `addHeadingIds` (line 1) AND `extractHeadings` (line 19), confirmed · so the guide loader imports both locally and builds the in-guide TOC · no shared-package routing, flag F5 RESOLVED).
- `ExitIntentModal.tsx` (`src/components/blog/ExitIntentModal.tsx`) ALREADY carries the `ma_assistant_active` stand-down guard (line 91: `if (window.sessionStorage.getItem("ma_assistant_active") === "1") return;`). **This is not a TODO to resolve · it is already wired** (the R1 stub described in `property_assistant_mvp_state`). WS6 only needs the SpecialistWidget to SET `ma_assistant_active` on mount so the guard bites (Section 3.4).
- `PageShell.tsx` mounts `<ExitIntentModal />` last (line 26) and `<StickyCTA />` (line 25); the SpecialistWidget mounts next to `<ExitIntentModal />`.
- Calculator route is a single dynamic `src/app/calculators/[slug]/page.tsx` (`dynamicParams = false`, `generateStaticParams` over the fleet) · mounts `<CalculatorClient slug={slug} variant="page" />` at line 90. There are NO per-slug static pages (single wiring point for `CalculatorPageResources`).

---

## 1. WS5 · Resource set (3 gated Excel + guide pairs)

Each resource is a per-topic pair: a working Excel model (live formulas, traced to a golden-tested compute lib) + a written guide (a noindex web page at `/resources/<topic>`, body raw HTML). Both are gated by one email capture (`ResourceGate`), revealed inline on success. The 3 topics are the SAME three the R2 premium fleet serves, so each resource sits alongside a premium tool and a blog cluster (compounding conversion surface).

Registry shape ported from the SHIPPED Dentists registry (`Dentists/web/src/lib/resources/registry.ts`), re-keyed to the Medical 5-topic `TopicKey`: `XlsxAsset { file, label, enabled }`, `GuideAsset { slug, label, enabled }`, `CategoryResource { topic, toolId, xlsx, guide, magnetTitle, magnetBlurbTemplate }`, `RESOURCES: Record<TopicKey, CategoryResource>` over all 5 keys, plus helpers `resourceForTopic`, `isXlsxEnabled`, `isGuideEnabled`, `hasEnabledResource`, `enabledResourceTopics`, `enabledGuideTopics`, `publishedGuideTopics`. `toolId` reuses the R2 premium tool id for the topic so the two registries agree (`nhs-pension-premium`, `locum-take-home-premium`, `incorporation-premium`). Conventions: `xlsx.file = /resources/<topic>/<topic>-model.xlsx`; `guide.slug = <topic>`.

**Enabled map:** `nhs-pension`, `locum`, `incorporation-private` → enabled xlsx + guide. `gp-tax` → aliases the `locum` asset (same file + same guide slug `locum`, `toolId: locum-take-home-premium`). `gp-practice` → `xlsx: null, guide: null, toolId: ""` (specialist-contact topic, no asset). `publishedGuideTopics()` deduplicates the `gp-tax`→`locum` alias to a single `locum` slug.

**Build gate (per asset):** author the xlsx builder + the guide markdown, run `npm run resources:xlsx`, add + pass the golden test (Section 4.1), THEN flip the single `enabled: true`. Until then the asset renders nothing (belt-and-braces `hasEnabledResource` null guard in the gate).

Standing copy rules for every string below: UK English; **no em-dashes** anywhere including workbook cell text (commas, parentheses, full stops, middle dot `·`); no "DJH"; no "Reflex" in resource-gate copy; no pricing, no client names; A* bar; the firm is NOT a named qualified expert (no chartered/ACA/CTA/named-author/MLR-supervised claim); every NHS-pension / incorporation asset pairs the tax view with the pension-accrual loss (HP §2.C) so no asset reads as an incorporation pitch.

### Asset 1 · NHS Pension annual allowance and taper model  (topic `nhs-pension`, FLAGSHIP)

- **toolId:** `nhs-pension-premium` (R2 Tool 1). **Traces:** `calcNHSPension({ thresholdIncome, pensionGrowth, taxBand })` (`compute/nhs-pension.ts`).
- **File:** `/resources/nhs-pension/nhs-pension-model.xlsx` · **xlsx label:** `NHS Pension annual allowance model (Excel)` · **guide slug/label:** `nhs-pension` / `NHS Pension annual allowance and Scheme Pays guide`.
- **magnetTitle:** `Get the NHS Pension annual allowance model`.
- **Sheets:** `Start here` · `Your figures` · `Rates` · `Notes`.
- **`Your figures` blue inputs (defaults, from R2 Tool 1 config):** Threshold income `£150,000`; NHS pension input amount (growth this year) `£40,000`; Marginal income tax rate `Higher rate (40%)`.
- **Formulas (live cells referencing the `Rates` sheet named cells · mirror `calcNHSPension` branch-for-branch):**
  - `adjustedIncome = thresholdIncome + pensionGrowth`
  - taper trigger `IF(AND(thresholdIncome > 200000, adjustedIncome > 260000), tapered, standard)`
  - `reduction = (adjustedIncome - 260000) / 2`; `annualAllowance = MAX(10000, 60000 - reduction)` (standard `60000` when not tapered)
  - `excess = MAX(0, pensionGrowth - annualAllowance)`
  - `taxCharge = excess * rate` where rate ∈ {0.20, 0.40, 0.45} from the band select
  - `effectiveCost = IF(AND(pensionGrowth>0, taxCharge>0), taxCharge / pensionGrowth * 100, 0)` (shown only when > 0)
  - `Rates` named cells: `STANDARD_ALLOWANCE 60000`, `MIN_ALLOWANCE 10000`, `THRESHOLD_LIMIT 200000`, `ADJUSTED_LIMIT 260000`, `RATE_BASIC 0.20`, `RATE_HIGHER 0.40`, `RATE_ADDITIONAL 0.45`, all labelled "2025/26 basis".
- **Preview (ExcelPreview `single` layout · at the workbook's ACTUAL default inputs, executed 2026-07-05: `calcNHSPension({thresholdIncome:150000, pensionGrowth:40000, taxBand:"higher"})` → adjustedIncome 190000, NOT tapered, standard allowance 60000, excess 0, taxCharge 0):**

  | Your figures (edit the blue cells) | |
  |---|---|
  | Threshold income | **£150,000** (blue) |
  | NHS pension input amount (growth this year) | **£40,000** (blue) |
  | Marginal income tax rate | Higher rate 40% (blue) |
  | Your annual allowance position | |
  | Annual allowance (tapered or standard) | £60,000 (standard) |
  | Adjusted income | £190,000 |
  | Excess over allowance | £0 |
  | headline (navy→copper band): **Estimated annual allowance charge: £0 (within the standard £60,000 allowance)** | |

  Honest framing: at the DEFAULT there is NO charge (headline tone `good`) · the model's job is to let the doctor push threshold income and growth up and watch the taper bite. A worked tapered scenario is stated in the guide and in the golden (Section 4.1, NHS-A: threshold 210000, growth 70000, higher → allowance £50,000, excess £20,000, charge £8,000, effective 11.43%). Because the DEFAULT cell is £0, the preview and the downloaded file both show £0; the tapered figures are the golden's stress cases, NOT the workbook default (mirrors the Dentists practice-sale preview-vs-stress split).
- **Gate copy:** Headline `Get the NHS Pension annual allowance model` · Bullets `Whether your NHS pension growth breaches the annual allowance once the taper is applied, with the estimated tax charge, on live formulas` · `The taper made explicit: threshold income over £200,000 AND adjusted income over £260,000, reducing the allowance to a £10,000 floor (HP §2.B)` · `Measures pension growth (the input amount), not the contributions you paid; carry-forward from the previous three years can remove a charge and is not modelled; where the charge exceeds £2,000 and scheme growth exceeds £60,000, Scheme Pays can settle it by 31 July the following year (HP §2.B, §2.D)` · Button `Get the model`.
- **Surfaces:** calc page `/calculators/nhs-pension-annual-allowance` via `CalculatorPageResources` (`split`); blog category `nhs-pension-planning` (topic `nhs-pension`) via the blog slot; the `/nhs-pension` pillar page could also host it later (out of scope for R3).

### Asset 2 · Doctor take-home pay model  (topic `locum`, aliased on `gp-tax`)

- **toolId:** `locum-take-home-premium` (R2 Tool 2). **Traces:** `calcLocumTax({ grossIncome, expenses, pensionContributions, studentLoanPlan })` (`compute/locum-tax.ts`).
- **File:** `/resources/locum/doctor-take-home-model.xlsx` · **xlsx label:** `Doctor take-home model (Excel)` · **guide slug/label:** `locum` / `Locum and self-employed doctor take-home guide`.
- **magnetTitle:** `Get the doctor take-home model`.
- **Sheets:** `Start here` · `Your figures` · `Rates` · `Notes`.
- **Blue inputs (defaults, from R2 Tool 2 config):** Gross fees / income `£80,000`; Allowable business expenses `£5,000`; Personal pension contributions `£10,000`; Student loan plan `No student loan`.
- **Formulas (live cells · mirror `calcLocumTax` branch-for-branch):**
  - `netIncome = grossIncome - expenses - pensionContributions`
  - `taxableIncome = MAX(0, netIncome - 12570)`
  - income tax banded: `20%` up to `£50,270`, `40%` to `£125,140`, `45%` above (band widths measured from PA · replicate the lib's `min(taxable, BRL-PA)` etc.)
  - `class4 = MIN(MAX(0, netIncome-12570), 50270-12570)*0.06 + MAX(0, netIncome-50270)*0.02`
  - `studentLoan = IF(plan<>none, MAX(0, netIncome - threshold)*0.09, 0)` with thresholds Plan 1 `26065`, Plan 2 `28470`, Plan 4 `32745` (2025/26)
  - `totalDeductions = incomeTax + class4 + studentLoan`; `netTakeHome = netIncome - totalDeductions`; `effectiveRate = totalDeductions / netIncome * 100`
  - `Rates` named cells: `PA 12570`, `BRL 50270`, `HRL 125140`, `NI_LOWER 12570`, `NI_UPPER 50270`, `C4_MAIN 0.06`, `C4_UPPER 0.02`, `SL_PLAN1 26065`, `SL_PLAN2 28470`, `SL_PLAN4 32745`, `SL_RATE 0.09`, all labelled "2025/26 basis".
- **Preview (`single` · at defaults, executed 2026-07-05: `calcLocumTax({grossIncome:80000, expenses:5000, pensionContributions:10000, studentLoanPlan:"none"})` → netIncome 65000, incomeTax 13432, class4 2556.6, take-home 49011.4, effective 24.6%):**

  | Your figures (edit the blue cells) | |
  |---|---|
  | Gross fees / income for the year | **£80,000** (blue) |
  | Allowable business expenses | **£5,000** (blue) |
  | Personal pension contributions | **£10,000** (blue) |
  | Your take-home | |
  | Net income after expenses and pension | £65,000 |
  | Income tax | £13,432 |
  | Class 4 National Insurance | £2,557 |
  | Total deductions | £15,989 |
  | headline (navy→copper band): **Estimated take-home: £49,011 (effective deduction rate 24.6%)** | |

- **Gate copy:** Headline `Get the doctor take-home model` · Bullets `Your take-home as a locum or self-employed doctor after income tax, Class 4 National Insurance and any student loan, with live formulas` · `Class 4 is 6% between £12,570 and £50,270 then 2%; Class 2 is no longer a required payment from 6 April 2024 (HP §8)` · `Models self-employed and locum income; a salaried GP is taxed under PAYE with Class 1 NIC, so use it for the self-employed portion only, and remember PAYE income uses your allowance and basic-rate band first (HP §1)` · Button `Get the model`.
- **Surfaces:** calc page `/calculators/locum-tax-calculator` via `CalculatorPageResources` (`split`); blog categories `locum-tax` (topic `locum`) AND `gp-tax-and-accounts` + `medical-expenses` (topic `gp-tax`, which aliases this asset) via the blog slot. Because the calculator slug `locum-tax-calculator` maps to the `locum` topic in `topicForCalcSlug`, the calc-page island resolves to the `locum` asset; the `gp-tax` alias is a blog-only surface.

### Asset 3 · Private-practice incorporation model  (topic `incorporation-private`)

- **toolId:** `incorporation-premium` (R2 Tool 3). **Traces:** `calcIncorporation({ privateIncome, expenses, desiredSalary, nhsIncome })` (`compute/incorporation.ts`).
- **File:** `/resources/incorporation-private/incorporation-model.xlsx` · **xlsx label:** `Private practice incorporation model (Excel)` · **guide slug/label:** `incorporation-private` / `Private practice incorporation and the NHS Pension trade-off guide`.
- **magnetTitle:** `Get the incorporation comparison model`.
- **Sheets:** `Start here` · `Your figures` · `Rates` · `Notes`.
- **Blue inputs (defaults, from R2 Tool 3 config):** Private practice income `£100,000`; Practice expenses `£15,000`; Your NHS (PAYE) income `£50,000`; Director salary from the company `£12,570`.
- **Formulas (live cells · mirror `calcIncorporation` branch-for-branch):**
  - Sole-trader leg: `stProfit = privateIncome - expenses`; `stTaxable = stProfit + nhsIncome`; income tax on `MAX(0, stTaxable-12570)` via the banded formula; Class 4 on `stProfit` only at `6%`/`2%`; `soleTraderTotalTax = incomeTax + class4`; `soleTraderNetIncome = stTaxable - soleTraderTotalTax`.
  - Ltd leg: `companyProfit = privateIncome - expenses`; `corporationTax = companyProfit * 0.25` (this model uses CT 25% flat · see F2); `profitAfterCT = companyProfit - corporationTax`; `dividendAmount = profitAfterCT - desiredSalary`; `taxableDividends = MAX(0, dividendAmount - 500)`; dividend tax via the banded 10.75%/35.75%/39.35% formula using `totalIncomeBeforeDividends = nhsIncome + desiredSalary` to place the bands (replicate the lib's basic/higher-remaining branches exactly); `nhsIncomeTax = incomeTax(MAX(0, nhsIncome-12570))`; `limitedCompanyTotalTax = corporationTax + dividendTax + nhsIncomeTax`.
  - `taxSavings = soleTraderTotalTax - limitedCompanyTotalTax` (NEGATIVE when incorporating costs more); `savingsPerMonth = taxSavings / 12`.
  - `Rates` named cells: `PA 12570`, `BRL 50270`, `HRL 125140`, `NI_LOWER 12570`, `NI_UPPER 50270`, `C4_MAIN 0.06`, `C4_UPPER 0.02`, `CT_RATE 0.25`, `DIV_ALLOWANCE 500`, `DIV_BASIC 0.1075`, `DIV_HIGHER 0.3575`, `DIV_ADDITIONAL 0.3935`, labelled "2026/27 dividend basis; CT 25% flat in this model (see notes)".
  - **`NHS Pension impact` row is ALWAYS present** (compliance non-negotiable, HP §2.C, §5): a `Notes`/headline row stating `Company dividends are not NHS pensionable, so incorporated private income loses NHS accrual (HP §2.C)`. Never conditional.
- **Preview (`paired` layout · at defaults, executed 2026-07-05: `calcIncorporation({privateIncome:100000, expenses:15000, desiredSalary:12570, nhsIncome:50000})` → soleTraderTotalTax 44881.6, corporationTax 21250, dividendTax 18118.1, limitedCompanyTotalTax 46854.1, taxSavings -1972.5, savingsPerMonth -164.375):**

  | Your figures | | | Sole trader | Limited company |
  |---|---|---|---|---|
  | Private practice income | **£100,000** (blue) | | Total tax and NIC £44,882 | Corporation tax £21,250 |
  | Your NHS (PAYE) income | **£50,000** (blue) | | | Dividend tax £18,118 |
  | Director salary | £12,570 (blue) | | | Total tax £46,854 |
  | | | | | |
  | headline (navy→copper band): **Incorporating costs about £1,973 more here (£164 a month), and gives up NHS pension accrual on the dividends (HP §2.C)** | | | | |

  Honest framing: at the DEFAULT incorporating COSTS MORE tax (the locked HP §5 position that incorporation is not a clear win at typical private-income levels), tone `warn` on the incorporation route, `best` on the sole trader. The £1,973 headline value is `Math.round(Math.abs(-1972.5))` = 1973 (the R2 config's exact behaviour, pinned in the golden INC-A). The NHS-pension-loss line is mandatory regardless of sign.
- **Gate copy:** Headline `Get the incorporation comparison model` · Bullets `Taking your private practice profit as a sole trader against extracting it through a limited company, on the same income, after income tax, Class 4 NIC, corporation tax and dividend tax` · `The NHS Pension trap made explicit: a company cannot hold a GMS or PMS contract and dividends are not NHS pensionable, so incorporated private income loses NHS accrual entirely (HP §2.C)` · `Built on 2026/27 dividend rates (10.75% and 35.75%, FA 2026 s.4); the headline tax gap is modest at typical private-income levels and a director's loan taken ahead of dividends triggers a s.455 charge at 35.75% on loans from 6 April 2026 (HP §5)` · Button `Get the model`.
- **Surfaces:** calc page `/calculators/private-practice-incorporation` via `CalculatorPageResources` (`split`); blog categories `incorporation-and-company-structures` + `private-practice` (topic `incorporation-private`) via the blog slot.

### 1.x Component behaviour (ResourceGate + CalculatorPageResources + ExcelPreview)

Port the SHIPPED Dentists R3 components with these Medical deltas (ship the true `ResourceGate` inline-reveal, NOT `GateOrForm` · the DELIVERABLE is the downloadable resource; keep `GateOrForm` UNPORTED, mirroring the Dentists/Solicitors decision).

- **`ResourceGate.tsx`** (`src/components/resources/`): props `{ topic: TopicKey; copy: GateCopy; split?: boolean; placement?: string; category?: string }`. Copy the Dentists `ResourceGate.tsx` VERBATIM and re-skin `var(--gold)*` → `var(--copper)*` (top accent `h-1 bg-[var(--copper)]`; card `border-[var(--border)] bg-white`; checkbox `accent-[var(--copper)]`; focus `ring-[var(--copper)]/25`; download-button primary `btnPrimary`, secondary guide link `border-2 border-[var(--copper)] text-[var(--navy)] hover:bg-[var(--copper-soft)]`; success box `border-[var(--copper-soft)] bg-[var(--surface-elevated)] text-[var(--navy)]`).
  - **Submit path (HARDENING · use the chokepoint, exactly as the Dentists gate):** route through `submitMedicalLead(payload, honeypot)` (the same path `MiniCapture` uses). Payload: `full_name: ""`, `phone: ""`, `role: "resource"`, `message: "[Resource: <topic>] <magnetTitle>"`, `source: niche.content_strategy.source_identifier` (`"medical"`), `consent_given: consent`, `consent_text: `${siteConfig.resourceConsentText} See our Privacy Policy.``, `consent_at`, `visitor_id`, `session_id`, `source_url`, `extras: { resource_gate: true }`, and **`captureMode: "email_only"`**.
  - **CRITICAL captureMode lesson (Dentists D-3, LOCKED in the spec):** the gate collects ONLY an email. It MUST pass `captureMode: "email_only"` or the server's full-mode validation 400s EVERY submission on the empty `full_name`/`phone`. The message prefix (`[Resource: <topic>] <magnetTitle>`) keeps the 10-char message floor satisfied. This is a shipped, verified requirement · do NOT omit it (the Dentists brief carried it as "captureMode OMITTED" in one line but the SHIPPED code sets `captureMode: "email_only"`; follow the SHIPPED code · `Dentists/web/src/components/resources/ResourceGate.tsx:143`).
  - **Honeypot pass-through (F4):** read `enquiry_ref` but do NOT early-return on a filled value; pass it as the second arg to `submitMedicalLead` so the server stores a real-human autofill hit flagged, never silently dropped (estate-standard fix). QA asserts no early-return remains.
  - **Events:** `track("gate_view", { topic, placement, category? })` once via `useInViewOnce`; `track("resource_unlocked", { topic, placement, category? })` on success; `useFormTracking("resource_gate")` for field focus/blur + `ft.onLead({ source, role: "resource" })` on success + `ft.onError("form","server")` on failure. Optional GA `generate_lead` (event_label `medical_resource_<topic>`). No new event names.
  - **Email OFF:** success copy `You're in. Your download is ready below.`; footer `Instant access on this page. No spam.`; button `Get the model` / `Unlocking...`; the `/api/resources/deliver` fetch guarded by `RESOURCE_EMAIL_DELIVERY_ENABLED` (false, not fired). Inline `download` + guide `/resources/<slug>` links work regardless.
  - Belt-and-braces: `if (!hasEnabledResource(topic)) return null;`. Left column renders `<ExcelPreview topic={topic} />` (hidden on mobile). `@container` split via the `split` prop.
- **`CalculatorPageResources.tsx`** (`src/components/resources/`): resolves topic from the calc slug via `topicForCalcSlug`, renders the R2 `PremiumUpgrade` (existing) + the `ResourceGate` (`split`) under a `Go deeper` label, rendering nothing when neither exists. **Mount ONCE** in the dynamic `src/app/calculators/[slug]/page.tsx` after `<CalculatorClient slug={slug} variant="page" />` (line ~90), passing `slug` + `pageTitle={tool.metaTitle}`. Medical uses a single dynamic `[slug]` route (no per-slug static pages), so this is a single wiring point.
- **`ExcelPreview.tsx`** (`src/components/resources/`): port the Dentists faux-grid (no hooks, safe anywhere) with the 3 `PreviewSpec`s above; layouts `paired` (incorporation) / `single` (nhs-pension, locum); fixed `w-[640px]` grid; the headline band is a `bg-[var(--navy)]` label strip with a `bg-[var(--copper)]` accent (or a `bg-[var(--copper-soft)]` band with `text-[var(--navy)]` · match the token idiom). Every figure = the `gbp()`/`pct()`-rounded default output traced in Section 4.1 (preview and file never disagree). `gbp(n)` = `"£" + Math.round(n).toLocaleString("en-GB")`. Restate any workbook em-dashes without them.

### 1.y Written guides (the value behind the gate)

Three `content/resources/<topic>.md` files (raw HTML body + frontmatter `topic/title/summary/version/lastReviewed`), served by a `src/app/resources/[topic]/page.tsx` NOINDEX route via a `src/lib/resources/content.ts` loader. This is the FIRST `content/resources/` dir on Medical (create it).
- **NOINDEX mechanism (from the shipped Dentists route):** App Router metadata only · `generateMetadata` returns `robots: { index: false, follow: false }` (no `<meta>` tag, no `next/head`). `export const dynamicParams = false;` and `generateStaticParams()` from `publishedGuideTopicsWithFile()` (guides that are enabled AND have a file on disk); `notFound()` when the guide is missing. Await `params` (Promise-typed) in both `generateMetadata` and the page.
- **Loader (`content.ts`) · Medical-favourable delta:** copy the Dentists loader VERBATIM · it uses `gray-matter` (present), imports BOTH `addHeadingIds` AND `extractHeadings` from the site-local `@/lib/markdown-utils` (both confirmed present on Medical), coerces YAML dates via `String()`, and exposes `getGuideByTopic(topic)` + `publishedGuideTopicsWithFile()`. No shared-package routing, no missing-`extractHeadings` blocker (F5 RESOLVED). `guidesDirectory = path.join(process.cwd(), "content", "resources")`.
- **YAML-safe frontmatter (LOCKED):** quote any title containing a colon (e.g. `title: "NHS Pension annual allowance: the taper explained"`), and the loader's `String()` date coercion handles `lastReviewed` whether YAML parses it as a string or a Date. No BOM, no unquoted colon-space scalars.
- Guides authored to the A* bar, compliance-aware, HP-traced, each a model-companion piece distinct from the `/medical-guides` pillars:
  - **nhs-pension guide** (HP §2.B, §2.C, §2.D, §2.A): the annual allowance (£60,000, input amount not contributions), the taper (£200k threshold AND £260k adjusted, £10k floor), carry-forward from the previous three years, Scheme Pays (mandatory where charge > £2,000 AND scheme growth > £60,000, 31 July deadline, worked 2025/26→31 July 2027), the incorporation pension trap cross-link, and a McCloud note (remedy period 1 Apr 2015 to 31 Mar 2022, rollback 1 Oct 2023, deferred choice at retirement · do NOT say "McCloud applies from April 2026").
  - **locum guide** (HP §1, §1.A, §8): self-employment substance-over-label, allowable expenses (indemnity, GMC retention fee, List 3 subscriptions, mileage 55p first 10,000 miles from 6 Apr 2026, home-to-first-site commuting non-deductible), Class 4 6%/2% and Class 2 removed from 6 Apr 2024, student loans, the PSC/IR35 who-decides split (public sector from 2017, medium/large private from 2021, small private = PSC decides), and MTD for ITSA (£50k from 6 Apr 2026, most full-time locums caught).
  - **incorporation-private guide** (HP §5, §2.C, §4, §1.A): incorporation is a PRIVATE-work-only decision (a company cannot hold a GMS/PMS contract and company income is not NHS-pensionable), the CT/dividend maths, the s.455 director's-loan trap (35.75% on post-6-Apr-2026 loans, 9m+1d, s.458 deferred), s.162 incorporation relief now claim-only for transfers from 6 Apr 2026 (FA 2026 s.39), and the mandatory NHS-pension-accrual-loss pairing (never present the tax saving alone).

---

## 2. WS6 · SpecialistWidget FAQ set

Port the SHIPPED Dentists `src/lib/support/faq.ts` to `Medical/web/src/lib/support/faq.ts`: `export type Faq = { q: string; a: string }`, `export const GENERIC: Faq[]`, `export const BY_TOPIC: Partial<Record<TopicKey, Faq[]>>`, `export function faqForTopic(topic): Faq[]` returning `!topic ? GENERIC : (BY_TOPIC[topic] ?? GENERIC)`. Keyed by the Medical 5-topic `TopicKey`. Every answer is short, accurate (no personal calculations), HP-traced with tax-year tags, points to the matching calculator, and ends the deep cases at "ask a specialist for your practice's numbers". No em-dashes, no Reflex/DJH mention, no chartered/qualified/MLR claim. **NHS pension / annual allowance / incorporation and the salaried-vs-partner-vs-locum distinction must be prominent** (they are the site's highest-intent, highest-value questions). Target 11 Q&As (3 GENERIC + 8 topic across 4 topic blocks; `gp-practice` has no block and falls through to GENERIC).

### GENERIC (3, shown when no topic)
1. Q `How quickly will a specialist reply?` · A `Within one working day, and usually sooner. Leave your email and a one-line question and a specialist medical accountant will come back to you personally.`
2. Q `Is the first conversation free?` · A `Yes. The first call to understand your situation and point you in the right direction is free, with no obligation.`
3. Q `What should I have ready?` · A `Roughly: whether you are a GP partner, a salaried GP, a consultant or a locum, whether your income is NHS, private or mixed, and your approximate annual profit or pensionable pay. If you are not sure, we will guide you.`

### BY_TOPIC (key → Q&As, HP reference)

- `nhs-pension` (HP §2.B, §2.C, §2.D, §2.A) · FLAGSHIP block, 3 Q&As:
  1. Q `How does the NHS pension annual allowance work?` · A `Your pension savings can grow by up to £60,000 a year (2025/26) before an income tax charge applies. For the NHS scheme the measure is the growth in your benefits, the pension input amount, not the contributions you paid. The taper reduces the £60,000 where your threshold income is over £200,000 and your adjusted income is over £260,000, down to a £10,000 floor. Our annual allowance calculator estimates your position.`
  2. Q `What is Scheme Pays and when can I use it?` · A `Scheme Pays lets the NHS scheme settle your annual allowance charge for a permanent reduction in your pension. Mandatory Scheme Pays is available where the charge is over £2,000 and your NHS scheme growth alone exceeds £60,000. The election deadline is 31 July in the tax year after the charge, so a 2025/26 charge must be elected by 31 July 2027. Before choosing it, check whether carry-forward from the previous three years removes the charge entirely.`
  3. Q `Does incorporating my private work cost me NHS pension?` · A `Yes, on the incorporated portion. A limited company cannot hold a GMS or PMS contract and company dividends are not NHS pensionable, so private income taken as dividends builds no NHS benefits. For a consultant, only the NHS employment is pensionable, never the private work. Over years to retirement that lost accrual can outweigh the headline tax saving, so we model both sides before you decide.`
- `incorporation-private` (HP §5, §2.C, §5) · 3 Q&As:
  1. Q `Should I incorporate my private practice?` · A `Sometimes, but it is a calculation, not a default, and it applies to private work only. At typical private-income levels the pure tax saving is modest, and the 2026/27 dividend rise to 10.75% and 35.75% narrows it further. The bigger factor is usually the NHS Pension you give up on dividends. Model both before deciding.`
  2. Q `What happens if I overdraw my director's loan account?` · A `A medical company is a close company, so an overdrawn director's loan still outstanding nine months and one day after the year end triggers a section 455 charge at 33.75% on loans made in 2025/26 and 35.75% on loans made from 6 April 2026. It is repaid under section 458 once you clear the loan, but the relief is deferred. A loan over £10,000 is also a benefit in kind.`
  3. Q `Can a limited company hold my NHS contract?` · A `No. A GMS or PMS contract cannot be held by a company, and NHS income is not pensionable through a company. Incorporation is only ever about your private work: insurance medicals, medico-legal, occupational health, cosmetic or self-pay clinics, and PSC locum work that is outside IR35. We keep the NHS side out of the company.`
- `locum` (HP §8, §1, §1.A) · 2 Q&As:
  1. Q `Do I still pay Class 2 National Insurance as a locum?` · A `No. Class 2 stopped being a required payment from 6 April 2024. If your profits are above the small profits threshold you are treated as having paid and keep your state pension entitlement. You pay Class 4 at 6% between £12,570 and £50,270, then 2% above. Our take-home calculator shows the full deduction.`
  2. Q `Does IR35 decide my status, or do I?` · A `It depends on the hirer. For an NHS Trust or other public body, the Trust or the fee-payer in the chain decides your status and operates PAYE on inside-IR35 work. For a medium or large private hospital, the hirer decides and issues a Status Determination Statement. Only a small private client leaves the decision to your own company. A locum across several hirers can hold a mix of inside and outside determinations.`
- `gp-tax` (HP §1, §8, §9) · falls under the same tax cluster; keyed separately, 2 Q&As (the `gp-tax` topic aliases the doctor take-home asset):
  1. Q `Am I taxed differently as a salaried GP, a partner or a locum?` · A `Yes. A GP partner is self-employed and taxed on their profit share, not drawings, through the partnership return and Class 4 NIC. A salaried GP is an employee taxed under PAYE with Class 1 NIC. A locum is usually a sole trader on the self-assessment return, or occasionally through a company. Many doctors hold more than one of these at once, which changes how the bands stack.`
  2. Q `Will I need to use Making Tax Digital?` · A `If your gross self-employed or property income is over £50,000 you are in Making Tax Digital for Income Tax from 6 April 2026, with £30,000 from April 2027 and £20,000 from April 2028. Limited companies are out, and GP partnerships are deferred with no confirmed date. Most full-time locums and unincorporated private GPs are caught from April 2026, so it is worth getting your digital records ready now.`
- `gp-practice`: no `BY_TOPIC` block · `faqForTopic` returns `GENERIC` (matches the Property/Dentists fall-through for the no-tool topic; add later if traffic warrants).

### 2.C Widget capture = email_only via the chokepoint
The composer collects email + message only, submitted via `submitMedicalLead(payload, honeypot)` with `captureMode: "email_only"`, `extras: { capture_channel: "assistant", trigger }`. `source: "medical"`, `role: "Other"`, `message: "[Specialist question (<topic>)] <question>"`, `consent_given: true`, `consent_text: `${siteConfig.leadConsentText} See our Privacy Policy.`` (the widget IS an enquiry, so the Reflex-aware `leadConsentText` is correct here · the server also stamps it). Honeypot `enquiry_ref` passed through (`ft.onError("enquiry_ref","honeypot")` on a hit, no silent drop). Fires `support_opened` on open, `lead_submitted` on success (via `useFormTracking("specialist_widget")`, `ft.onLead({ source, role: "specialist_widget" })`). Success copy: `Thanks, a specialist has your message and will be in touch by email. Please keep an eye on your inbox, and your spam or junk folder, so our reply is not missed.`

---

## 3. WS6 · Assistant Phase-0 (journey model + opener + escalation)

Build the Medical journey model + opener + widget as a 1:1 deterministic port of the SHIPPED Dentists / generalist machinery, keyed to the Medical 5-topic taxonomy and `ma` storage prefix. No LLM (`OPENER_LLM_ENRICHMENT_ENABLED = false`). Pure pattern-rules over events autoCapture already emits.

### 3.1 `src/lib/intent/journeyModel.ts` (new, ported verbatim from Dentists)
- Storage key `ma_journey` (never `dfp_`/`hd_`/`ptp_`). `window.sessionStorage`.
- Copy the structure exactly: internal `PageNode`, `Trail`; exported `type JourneyStage = "researching" | "comparing" | "evaluating-us" | "ready"`, `type JourneyProfile { primaryTopic, secondaryTopic, stage, depth, signals[], pageCount }`; exported `recordPath(pathname)`, `initJourneyModel()`, `getJourneyProfile()`, `profileKey(p)`, `_resetJourneyModel()`. Import the Medical `deriveTopic` from `./deriveTopic` and `TopicKey` from `./taxonomy`. Consumes analytics events `section_view`, `scroll_depth` (reads `props.pct`), `calc_computed`, `form_error` via the shared bus; uses `isReturning` from `visitMemory`.
- **Special-page flags · Medical routes confirmed present:** the model tracks `/about`, `/services`, `/contact` prefixes; ALL THREE routes exist on Medical (`niche.navigation` has `/services`, `/about`, `/contact`), so no flag is dropped. Note: Medical's `deriveTopic` does NOT itself track `/about`/`/services`/`/contact` (it returns null for them), which is correct · the journey model reads the raw pathname prefix for these flags, not `deriveTopic`.
- Topic-weighting (verbatim): `w = sections*2 + maxScrollPct/25 + (computed?4:0) + 1`. Signal set verbatim: `multi-topic`, `visited-about`, `visited-services`, `visited-contact`, `used-calculator`, `returning`, `friction`, `deep-read` (scroll ≥70 or sections ≥4). Stage ladder verbatim: `researching` → `comparing` (distinctTopics ≥2 or pageCount ≥3) → `evaluating-us` (visited /about or /services) → `ready` (used a calc, visited /contact, or returning). Depth formula verbatim.

### 3.2 `src/lib/assistant/opener.ts` (new) · topic nouns/hooks per topic × stage

Port every function from the Dentists opener, re-keyed to the Medical 5 topics: `OPENER_LLM_ENRICHMENT_ENABLED = false`, `TOPIC_NOUN: Record<TopicKey,string>`, `TOPIC_HOOKS: Record<TopicKey,[string,string,string]>`, `variantIndex(pingIndex, stage)` (verbatim: `evaluating-us` +1, `ready` +2, clamp 0..2), `pickOpener(profile, pingIndex)` + `openerFor` alias (dispatch order: COMBO → used-calculator at vi≥2 → topic hook → GENERIC), `frictionOpener(profile)`, `exitOpener(profile)`, a `USED_CALC` triple, a `GENERIC` triple, and the incorporation combo. Voice rules (LOCKED): one sentence, no em-dashes, no figures, no tax advice, never claim the firm is chartered/qualified/MLR-supervised. The opener's only job is to earn the click. NO booking branch (the "call" is `/contact`, not `/book`).

| Topic key | `TOPIC_NOUN` | Hook 1 (curious) | Hook 2 (helpful) | Hook 3 (direct) |
|---|---|---|---|---|
| `nhs-pension` | `your NHS pension` | `Working out whether your NHS pension growth triggers a charge? I can pull up the annual allowance tool that checks it.` | `Not sure where you sit against the taper and the £60,000 allowance? I can run you through the quick calculator.` | `A free call with a specialist will get your annual allowance and Scheme Pays position straight, want me to set one up?` |
| `incorporation-private` | `incorporating your private practice` | `Weighing up incorporating your private work? I can point you to the comparison in a second.` | `Sole trader against a limited company for your private practice, with the NHS pension trade-off, there is a tool that shows both. Want me to line it up?` | `A free call will confirm whether incorporating is worth it for your private work, and what it costs your pension, shall I arrange it?` |
| `locum` | `your take-home` | `Working out what you actually keep as a locum? I can pull up the calculator that does the fiddly part.` | `Want a hand seeing your take-home after tax, Class 4 and any student loan? Happy to point you to it.` | `A free call with a specialist will confirm the most tax-efficient way to work as a locum, want me to set one up?` |
| `gp-tax` | `your tax` | `Sorting how you are taxed as a salaried GP, a partner or a locum? I can point you to a quick answer.` | `Holding an NHS post plus private or locum sessions? The take-home tool shows the self-employed side. Want me to line it up?` | `A free call is the quickest way to get your whole tax position, NHS and private, straight. Fancy a quick call?` |
| `gp-practice` | `your practice accounts` | `Anything I can help you find on your practice accounts, partnership drawings or premises? I can point you to a quick answer.` | `Want a hand keeping on top of your practice finances and the year-end position? Happy to help.` | `A free first call with a specialist is the quickest way to get your practice accounts sorted, want me to set one up?` |

- **Combo (`COMBO_INCORP_NHS_PENSION`)** when both `incorporation-private` and `nhs-pension` are in the profile (the "should I incorporate my private work, and what does it do to my NHS pension?" journey): `[ "Looking at incorporating your private work and worried about your NHS pension? That is exactly the trade-off to get right, and I can help you start on it.", "Incorporating private income against the NHS pension you would give up is a close call for a lot of doctors. Want me to line up the comparison?", "This is exactly what a specialist untangles in one free call. Want me to arrange it?" ]`. Implement via a both-topics check mirroring the Dentists `COMBO_ASSOCIATE_PRINCIPAL` (order-independent).
- `USED_CALC` (fires when `signals.includes("used-calculator")` at vi≥2): `[ "You have already run the numbers. Want me to point out anything worth a specialist eye?", "The calculator gives a picture; a specialist confirms whether it fits your actual practice. Want a quick check?", "Ready to sanity-check those results? A free call goes further than any calculator." ]`.
- `GENERIC`: `[ "Not sure what you are looking for? I can point you to the right tool or a quick answer.", "Happy to help you find what you need. What is the main thing on your mind?", "The quickest way to get a straight answer is a free call with a specialist. Want me to set one up?" ]`.
- `frictionOpener(profile)` and `exitOpener(profile)` ported verbatim (they slot `TOPIC_NOUN[t]`), navy/copper-agnostic (copy only).

### 3.3 Ping escalation thresholds · PORTED VERBATIM from Property/Dentists
- `CADENCE_THRESHOLDS_MS = [30_000, 70_000, 120_000, 180_000]` (ms of VISIBLE page time; first ping 30s, then +40s, +50s, +60s; accrues while `document.visibilityState === "visible"`, pauses when backgrounded; interval 1000ms accumulator).
- `AUTO_OPEN_KEY = "ma_assistant_autoopened"`, `AUTO_OPEN_DELAY_MS = 600`; auto-present ONCE per session (prod-gated by the key, always in dev): desktop opens the panel, mobile (`innerWidth < 640`) surfaces the peek.
- Exit-intent arming: desktop `10_000` ms then `mouseleave` at `clientY <= 0`; mobile `8_000` ms then leave-style scroll (`maxY > 700 && y < 150 && lastY - y > 4`). One instant tailored `exit` ping. Desktop media query `(min-width: 1024px) and (pointer: fine)`.
- Friction: on `form_error` from the analytics bus, instant `frictionOpener()` ping.
- Suppression: `engagedRef` stops the session's cadence on any open/chip click; suppressed entirely for `isConverted()` visitors (from `@accounting-network/web-shared/analytics/visitMemory`; no cross-session lock, so a non-converter can be helped again next session).
- Every ping fires `personalization_shown` with `{ surface:"assistant_nudge", trigger, variant, rule_id:`assistant_<stage>`, topic, stage, signals: signals.slice(0,6).join(","), content: line.slice(0,120) }`; the peek click fires `personalization_clicked`, dismiss fires `personalization_dismissed` (props reused from the last ping). Chip clicks fire `cta_click { cta_id:"assistant_<goal>", placement:"assistant_card", topic }`. `support_opened` fires on open with `{ topic, via }` (`via` ∈ auto/nudge/button). `lead_submitted` on success.

### 3.4 `ma_assistant_active` stand-down wiring
- On mount (when `active`), the widget sets `window.sessionStorage.setItem("ma_assistant_active", "1")` in the init effect (mirrors the Dentists `dfp_assistant_active` set at its line 143).
- **`ExitIntentModal.tsx` needs NO change** · it ALREADY reads `ma_assistant_active` at line 91 and bails (`return`) before `setOpen(true)`. WS6 only supplies the SETTER (the widget). Do NOT re-edit `ExitIntentModal.tsx` for the stand-down (per minimal-intervention). (Belt-and-braces: the widget may also clear the flag on unmount, but the session-scoped set is sufficient and matches the Dentists port.)
- Mount `<SpecialistWidget />` in `PageShell.tsx` next to `<ExitIntentModal />` (line ~26, inside the shell so both exit surfaces sit together and self-gate via `useIntentContext()`). Fixed `bottom-24 right-4 z-[55]`, `print:hidden`. Both `ExitIntentModal` and the widget live in `PageShell`, which is already inside `IntentProvider` at `layout.tsx:108`, so `PageShell` is the correct, consistent slot.

### 3.5 SpecialistWidget copy + tokens
- Header brand `Medical Accountants UK` / subline `A specialist replies within one working day`. Copy the Dentists `SpecialistWidget.tsx` and swap: `submitDentistLead` → `submitMedicalLead`; all `dfp_*` keys → `ma_*`; `var(--gold)*` → `var(--copper)*`; dialog `aria-label="Medical Accountants UK assistant"`; launcher `data-cta="specialist_widget"`. Re-skin: header bar `bg-[var(--navy)] text-white`, avatar/chip accents `bg-[var(--copper)]`, unread pip stays a neutral red alert, chips `border-[var(--copper)] text-[var(--navy)] hover:bg-[var(--copper-soft)]`, primary button `bg-[var(--navy)] text-white` or `btnPrimary`. Success box copper-tinted (F7). Chips: `See your numbers` (→ `/calculators/<journeyTopic.primaryCalculator ?? topic.primaryCalculator>`; for `nhs-pension`→`nhs-pension-annual-allowance`, `locum`/`gp-tax`→`locum-tax-calculator`, `incorporation-private`→`private-practice-incorporation`, `gp-practice`→no calc chip since `primaryCalculator` is null), `Book a free call` (→ `/contact`, no `/book`), the footer `Ask a specialist` reveals the composer. No booking branch. Renders `null` when `useIntentContext()` is null (no-ops on `/embed`, `/admin`, opted-out).

### 3.6 taxonomy `resourceId` wiring (MANAGER)
`src/lib/intent/taxonomy.ts` `TOPICS` currently sets `resourceId: null` on ALL five topics (confirmed · the comment says "null until the asset actually exists"). Once R3 ships, set `resourceId` to the guide slug on the three shipped topics: `nhs-pension` → `"nhs-pension"`, `locum` → `"locum"`, `incorporation-private` → `"incorporation-private"`; `gp-tax` → `"locum"` (aliases the doctor take-home guide); `gp-practice` stays `null`. This is a manager edit (small, additive) · confirm each equals its guide slug before flipping.

---

## 4. Golden / QA cases

### 4.1 xlsx generator outputs vs compute-lib figures (per-tool golden test)
New golden tests live alongside the builders (`scripts/resources/builders/<topic>.test.ts`) OR in the premium test file. Every workbook's default-scenario output cell must equal the TS `compute()` result at the same inputs, to the penny, BEFORE the `enabled` flag is flipped. Every figure below was derived by EXECUTING the current corrected libs (they are the R2 goldens, re-used · `premium-tools.test.ts`). `gbp()` = `£` + `Math.round(n)` with en-GB thousands; percentages one decimal.

| Workbook | Default inputs | Key intermediates | Headline | Golden assertions (raw) |
|---|---|---|---|---|
| nhs-pension (WORKBOOK DEFAULT) | thresholdIncome 150000, pensionGrowth 40000, higher | adjustedIncome 190000; NOT tapered; allowance 60000 | Charge **£0** (within £60,000) | annualAllowance 60000; isTapered false; excess 0; taxCharge 0; effectiveCost 0. THIS is the cell the workbook + preview show |
| nhs-pension (stress, from R2 NHS-A) | thresholdIncome 210000, pensionGrowth 70000, higher | adjustedIncome 280000; reduction 10000; allowance 50000 | (not shown in the file) | allowance 50000; isTapered true; excess 20000; taxCharge 8000; effectiveCost ≈11.4286; conservation excess+allowance=pensionGrowth 70000 |
| nhs-pension (floor, from R2 NHS-C) | 300000, 200000, basic | reduction 120000; allowance floored 10000 | (guide only) | allowance 10000; excess 190000; taxCharge 38000; effectiveCost 19 |
| doctor take-home (WORKBOOK DEFAULT) | grossIncome 80000, expenses 5000, pension 10000, none | netIncome 65000; incomeTax 13432; class4 2556.6 | Take-home **£49,011** (eff 24.6%) | netIncome 65000; incomeTax 13432; nationalInsurance 2556.6; studentLoan 0; totalDeductions 15988.6; netTakeHome 49011.4; conservation netTakeHome+totalDeductions=netIncome 65000 |
| doctor take-home (plan2, from R2 LOC-B) | 80000, 5000, 10000, plan2 | threshold 28470; SL 3287.70 | (guide only) | studentLoanRepayment 3287.7; netTakeHome 45723.7; conservation +totalDeductions=65000 |
| incorporation (WORKBOOK DEFAULT, R2 INC-A) | privateIncome 100000, expenses 15000, salary 12570, nhs 50000 | stProfit 85000; CT 21250; div 51180; divTax 18118.1; nhsIncomeTax 7486 | Incorporating **costs £1,973 more** (£164/mo); pension loss note | soleTraderTotalTax 44881.6; corporationTax 21250; dividendTax 18118.1; limitedCompanyTotalTax 46854.1; taxSavings -1972.5; savingsPerMonth -164.375; headline value "£1,973" (Math.round(abs(-1972.5))); conservation taxSavings=soleTraderTotalTax-limitedCompanyTotalTax. THIS is the cell the workbook + preview show |
| incorporation (stress, from R2 INC-B) | 300000, 20000, 12570, 0 | CT 70000; divTax 64014.435 | (guide only) | soleTraderTotalTax 114031.6; corporationTax 70000; dividendTax 64014.435; limitedCompanyTotalTax 134014.435; taxSavings -19982.835 |

**Hardcoded-rate mirrors each builder MUST replicate (else the golden fails):** NHS pension `STANDARD_ALLOWANCE 60000`, `MIN_ALLOWANCE 10000`, `THRESHOLD_LIMIT 200000`, `ADJUSTED_LIMIT 260000`, rates 0.20/0.40/0.45; locum PA `12570`, bands `50270`/`125140`, Class 4 `0.06`/`0.02`, SL thresholds `26065`/`28470`/`32745` at `0.09`; incorporation CT `0.25` flat, dividend allowance `500`, dividend `0.1075`/`0.3575`/`0.3935`, Class 4 `0.06`/`0.02`. Source each from the matching compute lib per Section 0.E (re-export or literal-with-comment), never re-derive. **Class 4 is 6% (NOT the abolished 9%)** in BOTH `locum-tax.ts` and the corrected `incorporation.ts` (commit 91f95969) · a builder that hardcodes 9% fails the golden.

### 4.2 FAQ + opener + gate + guide fact-check (HP section references)
Every asserted figure must trace to a LOCKED HP position. Verify at build:

| Claim in FAQ/opener/gate/guide | HP § | Must read |
|---|---|---|
| Annual allowance £60,000; taper £200k threshold AND £260k adjusted, £10k floor; input amount not contributions; 3-year carry-forward | §2.B | 2025/26 tagged; never the old £40,000 or £240,000 or £4,000 floor |
| Scheme Pays mandatory where charge > £2,000 AND scheme growth > £60,000; election by 31 July the following year (2025/26 → 31 July 2027) | §2.D | distinguish mandatory from voluntary; the 31 July deadline exact |
| Company dividends NOT NHS pensionable; a company cannot hold GMS/PMS; consultant private work never pensionable | §2.C | never "pension-neutral"; do NOT use the dental "incorporated provider can pension to the NPE ceiling" framing (dental only) |
| Dividend 10.75% / 35.75% / 39.35%, £500 allowance, from 6 Apr 2026 | §5 | tax-year tagged "from 6 April 2026"; never 8.75/33.75 without a "to 5 Apr 2026" tag |
| CT 19% ≤£50k, 25% >£250k, marginal (~26.5%) between; the incorporation MODEL uses CT 25% flat | §5 + F2 | the FAQ states the true CT bands; the WORKBOOK mirrors the lib's 25%-flat simplification and its note flags it |
| s.455 33.75% (2025/26 loans) / 35.75% (from 6 Apr 2026); 9m+1d; s.458 deferred; £10k BIK | §5 | date band + repayable, not permanent |
| Class 4 6%/2%; Class 2 removed as a required payment from 6 Apr 2024 | §8 | do NOT tell a locum to pay weekly Class 2; do NOT use the old 9% Class 4 |
| Student loan thresholds Plan 1 £26,065 / Plan 2 £28,470 / Plan 4 £32,745 (2025/26), 9% | §8 + (tool) | 2025/26 values (the deliberate correction); not the 2024/25 figures |
| Mileage 55p first 10,000 miles from 6 Apr 2026 (45p to 5 Apr 2026), 25p thereafter; home-to-first-site is commuting | §8 | date-tagged |
| IR35 who-decides: public sector from 6 Apr 2017, medium/large private from 6 Apr 2021, small private = PSC decides; SDS with the Trust | §1.A | do NOT say "IR35 abolished" or "IR35 doesn't apply to NHS work" |
| GP partner taxed on profit share not drawings; salaried GP PAYE/Class 1; locum SA103/PSC; consultant PAYE + private-work return | §1 | substance over label; do NOT cite a fixed statutory status test |
| MTD for ITSA £50k/6-Apr-2026, £30k/2027, £20k/2028; companies out; partnerships deferred (no date); most full-time locums caught | §9 | do NOT say MTD applies to companies or to GP partnerships from Apr 2026; not a £10,000 threshold |
| McCloud remedy period 1 Apr 2015 to 31 Mar 2022; rollback 1 Oct 2023; deferred choice at retirement | §2.A | do NOT say "McCloud applies from April 2026" or tell members to choose now |
| NHS GP goodwill cannot be sold since 1 Apr 2004 (SI 2019/251); GP transactions are tangibles/premises/capital accounts, plus any private goodwill | §4 | do NOT write a "sell your NHS goodwill and claim BADR" playbook (that is dental only, and is WHY Medical has no sale/purchase workbook) |
| BADR 14% to 5 Apr 2026, 18% from 6 Apr 2026; £1m lifetime; private-practice/private-company disposals only | §4 | only if any BADR copy surfaces (incorporation guide may reference it in passing); confine to private disposals |

**Opener/gate safety (LOCKED):** no em-dashes; never claim the firm is chartered/qualified/regulated/MLR-supervised; faceless (no named expert); no surveillance framing ("we noticed you're struggling"); reference only what the visitor self-evidently did on the page.

### 4.3 Consent + delivery + behaviour QA (adversarial frame)
- **Consent byte-match:** the rendered resource-gate consent string equals `${siteConfig.resourceConsentText} See our Privacy Policy.` exactly; assert it does NOT contain "Reflex" (grep the rendered WS5 output). Assert `siteConfig.resourceConsentText` names only "Medical Accountants UK".
- Assert the string "DJH" appears nowhere in the WS5/WS6 output.
- Assert `extras.resource_gate === true` on the ResourceGate insert (and NOT on the assistant/MiniCapture inserts).
- **captureMode:** assert the ResourceGate submit sends `captureMode: "email_only"` (D-3 · without it every empty-name/phone submit 400s) AND the widget composer sends `captureMode: "email_only"`.
- With `RESOURCE_EMAIL_DELIVERY_ENABLED === false`: gate copy makes NO email promise; `/api/resources/deliver` is not fired; inline `download` + guide read link work.
- Honeypot `enquiry_ref` non-empty → success UI + a flagged row via the chokepoint, NO silent drop, for BOTH the ResourceGate (F4 · confirm no `if (honeypot !== "") return;` early-return) and the widget composer.
- **Golden recomputation is MANDATORY** (§4.1): recompute every workbook default cell by executing the lib; assert to the penny with conservation checks; reject any `typeof`-only assertion. `hasEnabledResource` false for `gp-practice`; belt-and-braces null guard means a disabled/missing file never renders a broken gate.
- Stand-down: with `ma_assistant_active === "1"`, `ExitIntentModal` does NOT arm; converted visitor → assistant suppressed AND ExitIntentModal behaves as before.
- Assistant: never fires for `isConverted()`; stops on panel open; re-tailors, never repeats a line verbatim; auto-open once per session (prod).
- All events on the allowlist (§0.G); zero off-list names; no `var(--primary)`, no `orange-*`/`emerald-*` leak in a shipped R3 component (grep; residual `var(--gold)` alias is acceptable-but-flag since it resolves to copper).
- FLAT-routing: the blog `ResourceGate`/`PremiumUpgrade` topic comes from `topicForBlogSlug(categorySlug)` (the prop), never `window.location`.
- Standard gates: `npm test --workspace Medical/web`; `npm run build --workspace Medical/web` (MANDATORY · vitest + tsc do not catch prerender failures); `python scripts/predeploy_gate.py --site medical`; `python scripts/spinup_site_check.py medical`; then the post-deploy battery per `CRO_PARITY_TEMPLATE.md` §3. Use `scripts/medical_flat_link_audit.py` for any link audit (never the nested tooling).

---

## 5. File manifest (Medical/web only) + build order

All paths under `Medical/web/`. "new" = create; "modified" = edit existing. No new RUNTIME npm dependency (`exceljs` + `tsx` are build-time devDeps).

### WS5 · resources (data + server + components)
| # | Path | Purpose |
|---|---|---|
| 1 | `src/lib/resources/registry.ts` | download spine (`XlsxAsset`/`GuideAsset`/`CategoryResource`/`RESOURCES` over 5 topics + helpers; 3 enabled + `gp-tax`→locum alias + `gp-practice` null) |
| 2 | `src/lib/resources/copy.ts` | `GateCopy`/`gateCopy(topic,pageTitle?,override?)`; fallback title "Free medical accounting toolkit" |
| 3 | `src/lib/resources/content.ts` | server-only guide loader (`getGuideByTopic`, `publishedGuideTopicsWithFile`; `content/resources`; `addHeadingIds`+`extractHeadings` from local `@/lib/markdown-utils`) |
| 4 | `src/lib/resources/config.ts` | `RESOURCE_EMAIL_DELIVERY_ENABLED = false` |
| 5 | `src/components/resources/ResourceGate.tsx` | navy/copper on-page gate; chokepoint submit with `captureMode: "email_only"` (D-3); honeypot pass-through (no early-return, F4); email path stubbed; `extras.resource_gate` |
| 6 | `src/components/resources/ExcelPreview.tsx` | 3 navy/copper `PreviewSpec`s (nhs-pension single, locum single, incorporation paired) |
| 7 | `src/components/resources/CalculatorPageResources.tsx` | calc-page island: `PremiumUpgrade` + `ResourceGate`, mounted once in `[slug]` |
| 8 | `src/app/resources/[topic]/page.tsx` | NOINDEX guide route (`dynamicParams=false`, `generateStaticParams` from `publishedGuideTopicsWithFile()`, `robots:{index:false,follow:false}`) |
| 9 | `scripts/resources/generate-xlsx.ts` | generator loop (byte-stable ZIP timestamps; `wb.creator = "Medical Accountants UK"`) |
| 10 | `scripts/resources/builders/index.ts` | `BUILDERS` registry (append-only, `{ topic, fileName, build }`) |
| 11 | `scripts/resources/builders/{nhs-pension,locum,incorporation}.ts` | 3 xlsx builders; rates sourced from the matching compute lib (Section 0.E) |
| 12 | `scripts/resources/builders/*.test.ts` (or the premium test file) | golden: xlsx default cell === lib `compute()` (§4.1), blocks the `enabled` flip |
| 13 | `content/resources/{nhs-pension,locum,incorporation-private}.md` | 3 gated guides (HTML body + YAML-safe frontmatter), HP-traced, model-companion pieces (first `content/resources/` dir) |
| 14 | `public/resources/<topic>/<topic>-model.xlsx` × 3 | generated + committed |

### WS6 · assistant + widget + FAQ
| # | Path | Purpose |
|---|---|---|
| 15 | `src/lib/support/faq.ts` | 11 house-traced Q&As (§2), `faqForTopic` |
| 16 | `src/lib/intent/journeyModel.ts` | trail-based journey model, `ma_journey` key, Medical `deriveTopic` |
| 17 | `src/lib/assistant/opener.ts` | topic nouns/hooks + escalation (§3.2), no LLM, no booking |
| 18 | `src/components/support/SpecialistWidget.tsx` | proactive assistant, navy/copper, email_only capture, `ma_` keys, `/contact` call chip |

### Modified files
| # | Path | Change |
|---|---|---|
| A | `src/config/site.ts` | **MANAGER** adds in-house `resourceConsentText` (0.C) + exports it on `siteConfig` (never references `partner`) |
| B | `src/components/blog/BlogPostRenderer.tsx` | inject `<ResourceGate topic={premiumTopic} copy={gateCopy(premiumTopic)} placement="blog" category={categorySlug} />` at a LATE point (AFTER the existing R2 `PremiumUpgrade` island + the mid-scroll `InlineMiniLeadForm`, so the free tool leads and the download lands lower); short-post fallback after the body; renders null when the topic has no enabled asset. Coordinated append-on-top of the existing R2 edit (0.F). Use `premiumTopic = topicForBlogSlug(categorySlug)` (already computed in the renderer) |
| C | `src/app/calculators/[slug]/page.tsx` | mount `<CalculatorPageResources slug={slug} pageTitle={tool.metaTitle} />` once after `<CalculatorClient slug={slug} variant="page" />` (~line 90) |
| D | `src/components/layout/PageShell.tsx` | mount `<SpecialistWidget />` next to `<ExitIntentModal />` (~line 26) |
| E | `src/lib/intent/taxonomy.ts` | **MANAGER** set `resourceId` = guide slug on the 3 shipped topics (+ `gp-tax`→`"locum"`), `gp-practice` stays null (0.J / 3.6) |
| F | `package.json` | add `exceljs` + `tsx` devDeps + `"resources:xlsx": "tsx scripts/resources/generate-xlsx.ts"` script (`gray-matter` already present) |
| G | (optional) relevant `compute/*.ts` | **MANAGER** additive named exports of the rate constants the builders need, IF Section 0.E option 1 chosen (else no change) |

**NOT touched (guardrail):** `src/lib/tools/registry.ts`, `src/lib/tools/premium/*` (R2, separate registry), the shared `Calculator.tsx`/`CalculatorClient.tsx`, the gallery/sitemap/embeds, every existing `compute/*` compute BODY (only additive exports if 0.E option 1), the `/medical-guides` pillars + `src/lib/medical-guides-data.ts`, `ExitIntentModal.tsx` (stand-down already wired at line 91). `Property/**` READ-ONLY (`git diff baseline -- Property/` empty is a gate). `packages/web-shared` NOT edited.

### Build order
1. **A, 1, 2, 4** · config `resourceConsentText` + registry shapes + email flag (assets stay `enabled:false`).
2. **WS6 first (16 → 17 → 15 → 18), D** · journeyModel → opener → faq → SpecialistWidget → mount. No data dependency; lights up immediately (deterministic). (Dentists/Solicitors shipped WS6 first for the same reason.)
3. **9, 10, 11** · generator + builders; run `npm run resources:xlsx` → `public/resources/`.
4. **12** · golden tests; go green (blocks the `enabled` flip).
5. **3, 8, 13** · loader + NOINDEX route + guide md.
6. **5, 6, 7** · gate + preview + calc-page island.
7. **B, C** · inject into blog (on top of R2) + calculator surfaces.
8. **Flip `enabled:true`** per asset (registry) once its golden passes (WS5 live). **E** set `resourceId`s.
9. Full QA (§4) → gates (§3 template) → owner sign-off → deploy (env-override recipe, project `prj_50vByZ3rqXQQwCUeENUTBbNBB41n`, `.vercel` at `Medical/.vercel`) → post-deploy battery. VERIFY migration `20260706000001` is live on Medical prod (owner-signed) before the resource gate ships.

---

## Regression invariants (must not break)
- `ma` storage prefix FROZEN: every new key is `ma_…` (`ma_journey`, `ma_assistant_autoopened`, `ma_assistant_active`). No `dfp_`/`hd_`/`ptp_` leak.
- No new event names (allowlist §0.G). No em-dashes. No "DJH". No "Reflex" in `resourceConsentText`/resource-gate copy. No `var(--primary)`, no `orange-*`/`emerald-*` in shipped R3 components (residual `var(--gold)` alias tolerated, resolves to copper).
- **captureMode: "email_only"** on the ResourceGate AND the widget composer (D-3 · full-mode validation 400s on empty name/phone otherwise).
- FLAT routing: blog islands take the topic from the `categorySlug` prop via `topicForBlogSlug`, never the URL. Link audits use `scripts/medical_flat_link_audit.py`.
- Compute maths NEVER forked · the workbooks and the FAQ trace the existing R2 libs; the only "new" logic is xlsx formulas mirroring those libs, golden-gated. Class 4 is 6%, never 9%.
- The R2 premium tier (`src/lib/tools/premium/*`) is untouched; the WS5 registry is separate and additive.
- The ExitIntentModal `ma_assistant_active` stand-down guard is already present (line 91) · do NOT re-edit it.
- No practice sale/purchase/CGT workbook (NHS GP goodwill cannot be sold, HP §4) · only the 3 tool-aligned resources.

---

## 8-line summary
1. Medical R3 adds 3 email-gated resource pairs (Excel model + noindex guide) delivered ON-PAGE plus the deterministic proactive SpecialistWidget/assistant, both ported from the SHIPPED Dentists R3 code to the Medical navy/copper CSS-variable token system with no new runtime dependency (exceljs + tsx are build-time devDeps to add).
2. The 3 resources align to the 3 R2 premium tools on the CORRECTED libs: NHS pension AA/taper (`calcNHSPension`, flagship, HP §2.B/§2.D), doctor take-home (`calcLocumTax`, also aliased on `gp-tax`, HP §8), and private-practice incorporation (`calcIncorporation`, NHS-pension trap prominent, HP §2.C/§5); `gp-practice` stays a specialist-contact topic with no asset; there is NO sale/purchase/CGT workbook because NHS GP goodwill cannot be sold (HP §4); the `/medical-guides` TS-array pillars stay ungated and untouched.
3. Email delivery is stubbed: the ResourceGate reveals downloads inline only, does NOT call `/api/resources/deliver`, promises no email, and a `RESOURCE_EMAIL_DELIVERY_ENABLED=false` flag makes re-enabling one line; the gate submits through the chokepoint with `captureMode: "email_only"` (the shipped Dentists D-3 lesson · without it every empty-name/phone submit 400s) and passes the honeypot through (no early-return, F4).
4. Consent for downloads uses a NEW in-house-only `resourceConsentText` (names only Medical Accountants UK, never Reflex), distinct from the partner-aware `leadConsentText` the widget enquiry correctly keeps; `extras.resource_gate:true` is set on the gate insert (migration 20260706000001 skip, verify live on Medical prod).
5. The 11-Q&A FAQ puts NHS pension / annual allowance / Scheme Pays and the incorporation pension trap front and centre, plus the salaried-vs-partner-vs-locum and IR35-who-decides distinctions, tracing every figure to a LOCKED HP position with tax-year tags (AA £60k/taper £200k+£260k/£10k floor, dividends 10.75/35.75 from 6 Apr 2026, s.455 35.75%, Class 4 6%, mileage 55p, MTD £50k from Apr 2026).
6. The assistant is a 1:1 deterministic port: Property cadence thresholds verbatim ([30/70/120/180]s), `ma_` storage prefixes, Medical topic nouns/hooks per stage, an incorporation-vs-NHS-pension combo, all three special-page flags kept (about/services/contact all exist), and the `ma_assistant_active` stand-down that the Medical ExitIntentModal ALREADY reads at line 91 (only the setter is new, so ExitIntentModal is not re-edited).
7. Golden checks assert every workbook default cell equals its lib compute to the penny (nhs-pension charge £0 at default with a tapered £8,000 stress case, take-home £49,011, incorporation costs £1,973 more / sole trader wins) with conservation checks and block the `enabled` flip; all events are allowlisted; no `var(--primary)`/orange/emerald leak, no em-dashes, no DJH, no Reflex in gate copy.
8. R3 ships AFTER R2 (never bundled): the blog `ResourceGate` appends on top of the existing R2 `PremiumUpgrade` island in the FLAT-routed `BlogPostRenderer`, `CalculatorPageResources` mounts once in the single dynamic `[slug]` calc page, the workbooks source rates from each compute lib (no shared `uk-tax-rates.ts` on Medical) via additive re-export or literal-with-comment, and deploy uses the `Medical/.vercel` link (project `prj_50vByZ3rqXQQwCUeENUTBbNBB41n`).

## Unverifiable / must-resolve items flagged
- **F1 (no shared rate module):** Medical has NO `src/lib/uk-tax-rates.ts` (the generalist builders import one). Each Medical builder must source rates from the matching compute lib · either add additive named exports to the compute libs (preferred, drift-proof) or mirror the constants literally with a `// traced to compute/<lib>.ts` comment (golden-gated). Orchestrator picks the route before build.
- **F2 (incorporation CT 25% flat):** `incorporation.ts` uses `corporationTax = companyProfit * 0.25` (flat 25%), NOT the full 19%/marginal/25% band structure the FAQ and HP §5 state. The tool config's own note and explainer already flag this simplification. The WORKBOOK must mirror the lib (25% flat) so the golden passes, and its `Notes` sheet must carry the same "CT 25% flat in this model; the true rate is 19% to £50k, 25% above £250k, marginal between (HP §5)" caveat. The FAQ/guide state the TRUE CT bands. This is a conscious model simplification carried from R2, not a stale-figure defect · do NOT "fix" the lib in R3.
- **F3 (locum/incorporation year label):** the locum + incorporation take-home maths use 2025/26 income-tax bands and Class 4 (unchanged into 2026/27); the incorporation DIVIDEND rates are 2026/27 (10.75/35.75). So the doctor-take-home workbook + copy date outputs "2025/26 basis" and the incorporation workbook + copy date the dividend leg "2026/27 dividend basis". A conscious mixed-year choice matching the R2 configs, not an oversight.
- **F4 (honeypot posture):** the generalist ResourceGate early-returns on a filled honeypot. The SHIPPED Dentists gate does NOT (it passes the honeypot to `submitDentistLead`); the Medical gate must copy the Dentists posture (`submitMedicalLead(payload, honeypot)`, no early-return) so a real-human autofill hit is stored flagged, never silently dropped. QA asserts no early-return remains.
- **F5 (guide-loader heading helper) · RESOLVED:** the site-local `@/lib/markdown-utils` exports BOTH `addHeadingIds` (line 1) AND `extractHeadings` (line 19), confirmed at source. The guide loader imports both locally and builds the in-guide TOC. No shared-package routing and no local regex helper is needed (mirrors the Dentists RESOLVED state). Kept in the list for the builder's awareness.
- **F6 (BADR/CGT only if it surfaces):** HP §4 locks BADR (14% to 5 Apr 2026, 18% from 6 Apr 2026, £1m lifetime, private-practice disposals only) and the NHS-goodwill-sale prohibition. Medical has NO sale/purchase/CGT workbook, so no BADR figure is load-bearing in a model. If the incorporation guide references BADR in passing (e.g. on a future exit of an incorporated private practice), it must state the exact date band and confine it to private-practice/private-company disposals, never NHS goodwill. The BADR-eligible path IS HP-traced.
- **F7 (success-box colour):** the existing Medical `MiniCapture` keeps an emerald success box (`emerald-200/50/900`), the one non-navy/copper survivor. R3 surfaces should prefer a copper-tinted success (`bg-[var(--surface-elevated)] border-[var(--copper-soft)] text-[var(--navy)]`) to keep the palette clean; matching the existing MiniCapture emerald is acceptable for strict consistency. Orchestrator's call; QA notes which was chosen.
