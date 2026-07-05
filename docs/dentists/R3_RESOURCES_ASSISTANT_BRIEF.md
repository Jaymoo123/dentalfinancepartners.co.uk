# Dentists R3 · gated resources (WS5) + SpecialistWidget / proactive assistant (WS6) · build brief

**Site:** Dental Finance Partners · www.dentalfinancepartners.co.uk · accountancy for UK dental practices (associates, principals, locums, practice buyers and sellers, NHS pensions and UDA contracts).
**Programme:** R3 (wave 2) of the estate CRO parity programme. R1 shipped the server chokepoint, intent layer and in-blog mid-scroll capture. R2 shipped the premium in-blog calculator fleet + ResultGateModal. R3 adds (WS5) email-gated downloadable resources delivered ON-PAGE and (WS6) the SpecialistWidget / proactive journey-aware assistant. Both mirror Property's shipped frameworks (via the wave-1 generalist + Solicitors ports), re-themed to the Dentists navy/gold CSS-variable token system.
**Repo:** `C:\Users\user\Documents\Accounting`. Site root: `Dentists/web/`.
**Author:** Opus architect (design only, no code written). **Workers:** Sonnet build the components/config/xlsx builders; Opus writes the resource-guide bodies + FAQ + assistant copy; the manager does the `src/config/site.ts` edit, taxonomy `resourceId` wiring, all git/migrations/gates/deploys.

This brief is the single source of truth for the Sonnet workers. Do NOT invent figures. Every number traces to an existing Dentists compute lib (`Dentists/web/src/lib/tools/compute/*` or the R2 premium libs), a `§N` position in `docs/dentists/house_positions.md` (HP, LOCKED 2026-06-03), or `docs/dentists/TOOLS.md` (synced 2026-07-06). Where a fact cannot be traced it is FLAGGED in Section 6 and must NOT ship until the orchestrator resolves it.

Source frameworks studied at HEAD: `generalist/web/src/lib/resources/*`, `generalist/web/src/components/resources/*`, `generalist/web/scripts/resources/*`, `generalist/web/src/lib/support/faq.ts`, `generalist/web/src/lib/intent/journeyModel.ts`, `generalist/web/src/lib/assistant/opener.ts`, `generalist/web/src/components/support/SpecialistWidget.tsx`, plus the Solicitors siblings for the CSS-variable-token deltas (Dentists, like Solicitors, is token-based, NOT tailwind-utility-based like generalist).

---

## 0. Architecture decisions (read first)

### 0.A Dentists is the navy/gold token tier (same posture as R2, same as Solicitors)

Dentists has NO radix / recharts / shadcn / lucide / clsx / tailwind-merge stack. Its design system is CSS-variable tokens in `src/app/globals.css`: `--navy` (#001b3d), `--navy-soft`, `--navy-muted`, `--gold` (#b8975d), `--gold-strong`, `--gold-soft`, `--surface` (#fff), `--surface-elevated` (#eef1f6), `--ink` (#001b3d), `--ink-soft`, `--muted`, `--border`, `--background`, and the semantic aliases `--accent` = `--gold`, `--accent-strong` = `--gold-strong`. Fonts: Plus Jakarta Sans (`--font-sans`) + Cormorant Garamond (`--font-serif`).

**TOKEN HARDENING (do not regress · Dentists-specific, carried from the R2 brief).** The generalist R3 components lean on tailwind `orange-*`/`slate-*` utilities. The Solicitors R3 components lean on `var(--primary)`, which Solicitors defines. **Dentists does NOT define `--primary`** (grep confirmed in R2). During the port, every `orange-*` and every `var(--primary)` in the copied components MUST be re-skinned to a DEFINED Dentists token:
- brand accent bar / active states / focus rings / consent-checkbox accent → `var(--gold)` (checkbox: `accent-[var(--gold)]`; focus: `focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/25`);
- dark brand fill (widget header, eyebrow chip background, modal scrim) → `var(--navy)` (white text on it); the widget avatar/pip halo can keep a neutral alert colour;
- sub-labels / helper text → `var(--muted)` / `var(--ink-soft)`; surfaces → `var(--surface)` / `var(--surface-elevated)`; borders → `var(--border)`; card left-accent → `border-[var(--gold)]`.
Do NOT introduce `--primary` and do NOT leave any `var(--primary)` or `orange-*` / `emerald-*` reference in a shipped R3 component. The existing Dentists `MiniCapture` (`src/components/forms/MiniCapture.tsx`) and `ExitIntentModal` are the canonical styling idiom to copy: input class `border-[var(--border)] bg-[var(--surface)] ... focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/25`, card `rounded-2xl border-l-4 border-[var(--gold)] bg-[var(--surface)] p-6`, headings `font-serif text-[var(--ink)]`, checkbox `accent-[var(--gold)]`, scrim `bg-[var(--navy)]/60`. The one exception the existing MiniCapture keeps is the emerald success box (`border-emerald-200 bg-emerald-50 text-emerald-900`); for R3 surfaces prefer a gold-tinted success (`border-[var(--gold-soft)] bg-[var(--surface-elevated)] text-[var(--navy)]`) so no new emerald leaks in, but matching the existing MiniCapture emerald success is acceptable if the worker prefers strict consistency · orchestrator's call, flag either way in QA.

### 0.B On-page delivery only (email path stubbed)

Property's `ResourceGate` reveals the download links inline AND best-effort-fires `/api/resources/deliver` (a Resend email). **Dental Finance Partners has no verified Resend from-domain**, so R3 ships **on-page delivery only** (identical to the generalist + Solicitors ports):

- The inline reveal is the ENTIRE delivery mechanism: on success show the xlsx `<a href download>` + the guide `<a href="/resources/<slug>">` read link.
- Gate the deliver fetch behind a `RESOURCE_EMAIL_DELIVERY_ENABLED = false` constant in `src/lib/resources/config.ts`. While false, the `/api/resources/deliver` POST is NOT fired (the generalist ResourceGate wraps the whole `fetch` block in `if (RESOURCE_EMAIL_DELIVERY_ENABLED) { ... }`). Re-enabling later, once a from-domain exists, is a one-line flip.
- Success copy makes NO email promise: `You're in. Your download is ready below.` Footer microcopy: `Instant access on this page. No spam.` Button label `Get the model` / `Unlocking...`. Do NOT ship "we've emailed you a copy".
- No `/api/resources/deliver` route is required in R3. Optionally add a graceful no-op stub returning `{ ok: true, delivered: false, reason: "email-not-configured" }` so the client contract is stable later; do NOT wire the client `fetch` to it now.

### 0.C Consent wording (in-house-only, never partner-shared)

Dentists `niche.partner` is `{ name: "Reflex Accounting" }` (confirmed in `Dentists/niche.config.json:17`), so `siteConfig.leadConsentText` names Reflex (the lead pipeline routes owner-inbox + Reflex CC per the CRO programme). **Resource downloads must NOT use that string.** Add a SECOND string `resourceConsentText` to `src/config/site.ts` (the site currently has NO `resourceConsentText` · confirmed read), mirroring Property/generalist/Solicitors:

```
const resourceConsentText = `I agree to ${niche.display_name} using my email to send me the resource I requested.`;
```

This names only the firm (`Dental Finance Partners`), never Reflex, and is a marketing/legitimate-marketing consent for a one-off resource send. **MANAGER TASK:** add `resourceConsentText` to `siteConfig` and export it. The gate appends `" See our Privacy Policy."` + a `/privacy-policy` link and keeps an explicit tick-to-consent checkbox (never notice-only). **The string "DJH" must never appear anywhere** (it does not appear in the Dentists codebase today; do not introduce it).

**Leads source (verified):** `source: "dentists"` is a founding value of the `leads.source` CHECK constraint (`supabase/migrations/000_create_core_tables.sql:52` · `CHECK (source IN ('dentists','property') OR source IS NULL)`, later extended for the other niches). No leads-source migration is needed for Dentists.

**`extras: { resource_gate: true }` is mandatory on the ResourceGate insert.** The prod notify/enrich skip is LIVE via migration `supabase/migrations/20260706000001_resource_gate_notify_skip.sql` (verified at source): it rewrites `leads_to_email_trg` (and the enrich trigger) with a `WHEN (coalesce(NEW.extras->>'resource_gate','') <> 'true')` clause, so a resource-gate row does NOT flow through the lead-notify path (no Reflex CC) and consumes no paid AI/Companies-House enrichment; it stays fully visible in the console + `leads` table as a nurture-pool audience. The migration is estate-shared and already applied once; the "individually owner-signed per site" gate in the template is therefore a VERIFICATION that it is live on the Dentists prod DB before R3 ships, not a fresh apply. The assistant/MiniCapture inserts do NOT carry this flag, only the resource gate.

### 0.D Assistant = Property's DETERMINISTIC Phase-0 machinery only

Journey model + escalating ping + opener copy. **No LLM chat** (Phase 5 enrichment stays flagged off, `OPENER_LLM_ENRICHMENT_ENABLED = false`). The widget composer's `email_only` capture flows through the existing chokepoint (`submitDentistLead(payload, honeypot)` with `captureMode: "email_only"`); the widget IS an enquiry so it correctly keeps `siteConfig.leadConsentText` (the Reflex-aware line the server also stamps). No "shared with Reflex" phrasing is added in the assistant's own copy beyond that standard consent line. No booking concierge (Property's `/book` path does not exist here · the "call" chip points to `/contact`).

### 0.E xlsx generator (build-time only, adds `exceljs`)

Mirror the generalist `scripts/resources/generate-xlsx.ts` + `scripts/resources/builders/*`. Adds `exceljs` + `tsx` as devDependencies (verify both against `Dentists/web/package.json`; add whichever is absent) and a `"resources:xlsx": "tsx scripts/resources/generate-xlsx.ts"` script. The generator is NOT part of `next build`; run manually. Generated `.xlsx` files are COMMITTED and byte-stable (the generalist `normalizeZipTimestamps` ZIP-header rewrite + fixed `wb.created/modified = 2024-01-01`). Set `wb.creator = wb.lastModifiedBy = "Dental Finance Partners"` (own brand, never Reflex/DJH).

**CRITICAL Dentists divergence · no shared `uk-tax-rates.ts` (flag F1).** The generalist builder imports a structured `UK_TAX_RATES` object from `src/lib/uk-tax-rates.ts`. **Dentists has NO `uk-tax-rates.ts`** (confirmed absent). Each Dentists compute lib hardcodes its own module-level constants (`NI_SECONDARY = 5000`, `EMPLOYER_NI = 0.15`, `DIVIDEND_BASIC = 0.1075`, CT marginal slice `0.265`, etc.). So each Dentists xlsx builder MUST source its rate cells from the SAME compute lib the tool uses, one of two ways (orchestrator's call, prefer the first):
1. **Re-export the constants from the compute lib.** Add named exports to the relevant `compute/*.ts` for the constants the builder needs (a pure additive change: `export const NI_SECONDARY = 5000;` etc.), then import them in the builder. This makes drift impossible. If the orchestrator prefers zero compute-lib edits, use option 2.
2. **Mirror the constants literally in the builder with a `// traced to compute/<lib>.ts` comment**, and let the golden test (Section 4.1) catch any drift (the golden asserts the xlsx formula result === the lib `compute()` at defaults, so a mistyped constant fails the gate). This is the lower-touch route and is acceptable because the golden is the real guard.
Whichever route, the builder's `Rates` sheet carries every rate as a named cell and the `Your figures`/`Your team` formulas reference those named cells (no hard-coded result cells), exactly like the generalist builder (`wb.definedNames.add("Rates!$B$row", "Name")`, blue input cells `fill FFDBEAFE` + `protection: { locked: false }`, `rates.protect()`).

### 0.F R2 dependency (this release sits on top of R2)

R3's blog/calculator injections and two of the five workbooks depend on R2 having landed the Dentists premium tier. Verified 2026-07-06: the Dentists tree currently has **no** `src/lib/tools/premium/` dir, **no** `compute/practice-sale-cgt.ts`, and `BlogPostRenderer.tsx` still injects only `InlineMiniLeadForm topic={post.category}` (no `PremiumUpgrade` / `topicForBlogSlug`). Therefore:
- **R3 ships AFTER R2** (per the release ladder · never bundle). The R3 blog injection is a coordinated append-on-top of R2's `PremiumUpgrade` injection in `BlogPostRenderer.tsx`.
- The **practice-sale** and **practice-purchase** workbooks reuse R2's `compute/practice-valuation.ts` (exists) and R2's NEW `compute/practice-sale-cgt.ts` (created by R2). If R3 is authored before R2's `practice-sale-cgt.ts` exists, trace the sale workbook's CGT cells to the Solicitors reference `Solicitors/web/src/lib/tools/compute/practice-sale-cgt.ts` (same shape: `calcPracticeSaleCgt({ gain, otherIncome, badrEligible, aeaAvailable?, badrLifetimeRemaining? })`, AEA £3,000, BADR 18%/£1m, CGT 18%/24%) and confirm the Dentists lib matches at R2-integration time.

### Allowlisted events this feature may emit (verified in `packages/web-shared/analytics/types.ts`)
`gate_view`, `resource_unlocked`, `support_opened`, `personalization_shown`, `personalization_clicked`, `personalization_dismissed`, `cta_click`, `form_start`, `form_field_focus`, `form_field_abandon`, `form_submit`, `form_error`, `lead_submitted`, `calc_computed`, `section_view`, `scroll_depth`, `exit_intent_shown`. **No new event names.**

### Confirmed reusable Dentists infrastructure (no rebuild)
- `submitDentistLead(payload, honeypot)` (`src/lib/leads/submit-client.ts`) routes through `/api/leads/submit` with the direct-insert fallback; accepts `captureMode?` and `extras?`. Used by `MiniCapture`.
- `siteConfig` (`src/config/site.ts`), `niche` (`src/config/niche-loader.ts`), `niche.content_strategy.source_identifier === "dentists"` (note the PLURAL), `niche.lead_form.placeholders.email` (exists).
- `deriveTopic(pathname)` + `getTopic(key)` (7 topics) + `topicForBlogSlug` / `topicForCalcSlug` (`src/lib/intent/taxonomy.ts`, read-only · already correct).
- `useIntentContext()` (`src/components/intent/IntentProvider.tsx`) no-ops on `/embed`, `/admin`, opt-out; mounted in `layout.tsx:96` with `storagePrefix "dfp"`.
- `MiniCapture` (already exposes `messagePlaceholder`/`messageMinLength`/`messageMinWords`/`onSuccess`), `useFormTracking` (shared), `btnPrimary` (`src/components/ui/layout-utils.ts`), site-local `@/lib/markdown-utils` (exports BOTH `addHeadingIds` and `extractHeadings`, confirmed · so the guide loader imports both locally and builds the in-guide TOC, unlike generalist which had to route through the shared package and lacked `extractHeadings`).
- `ExitIntentModal.tsx` ALREADY carries the `dfp_assistant_active` stand-down guard (line 82: `if (window.sessionStorage.getItem("dfp_assistant_active") === "1") return;`). **This is not a TODO to resolve · it is already wired.** WS6 only needs the SpecialistWidget to SET `dfp_assistant_active` on mount so the guard bites (Section 3.4).
- `PageShell.tsx` mounts `<ExitIntentModal />` last (line ~24); the SpecialistWidget mounts next to it.

### /dental-guides relationship (decided)
The 6 existing ungated pillar guides (`content/dental-guides/*.md`: associate-tax-survival, goodwill-valuation-and-sale-playbook, nhs-contract-essentials, nhs-pension-scheme-essentials, practice-profit-extraction-partnership-vs-ltd, practice-purchase-financial-due-diligence, served at `/dental-guides/[slug]` via `src/lib/dental-guides.ts`) **stay ungated, indexable pillar content · untouched.** The R3 gated assets are NEW artefacts: a NEW `content/resources/<topic>.md` set behind a NOINDEX `/resources/[topic]` route, plus the Excel workbooks. The gated guides are tighter, model-companion pieces (how to use the workbook + the decision behind it), NOT copies of the pillar guides. Do NOT gate, move, or noindex any existing `/dental-guides` content.

---

## 1. WS5 · Resource set (5 gated Excel + guide pairs)

Each resource is a per-topic pair: a working Excel model (live formulas, traced to a golden-tested compute lib) + a written guide (a noindex web page at `/resources/<topic>`, body raw HTML). Both are gated by one email capture (`ResourceGate`), revealed inline on success. The 5 topics are the SAME five the R2 premium fleet serves, so each resource sits alongside a premium tool and a blog cluster (compounding conversion surface). This exactly matches R2's tool map (`associate`, `principal`, `buying`, `selling`, `nhs`); `compliance` (the sixth topic) stays a specialist-contact topic with NO enabled asset in R3, and the legacy `uda-calc` alias maps to the `nhs` asset defensively.

The registry (`src/lib/resources/registry.ts`) is total over the 7 `TopicKey`s (`associate | principal | buying | selling | nhs | uda-calc | compliance`); the 5 shipped topics carry enabled assets, `compliance` carries `xlsx: null, guide: null`, and `uda-calc` reuses the `nhs` asset. Shape ported verbatim from the generalist registry: `XlsxAsset { file, label, enabled }`, `GuideAsset { slug, label, enabled }`, `CategoryResource { topic, toolId, xlsx, guide, magnetTitle, magnetBlurbTemplate }`, `RESOURCES: Record<TopicKey, CategoryResource>`, plus `resourceForTopic`, `isXlsxEnabled`, `isGuideEnabled`, `hasEnabledResource`, `enabledResourceTopics`, `enabledGuideTopics`, `publishedGuideTopics`. `toolId` reuses the R2 premium tool id for the topic so the two registries agree. Conventions: `xlsx.file = /resources/<topic>/<topic>-model.xlsx`; `guide.slug = <topic>`.

**Build gate (per asset):** author the xlsx builder + the guide markdown, run `npm run resources:xlsx`, add + pass the golden test (Section 4.1), THEN flip the single `enabled: true`. Until then the asset renders nothing (belt-and-braces `hasEnabledResource` null guard in the gate).

Standing copy rules for every string below: UK English; **no em-dashes** anywhere including workbook cell text (commas, parentheses, full stops, middle dot `·`); no "DJH"; no Reflex in resource-gate copy; no pricing, no client names; A* bar; the firm is NOT a named qualified expert (no chartered/ACA/CTA/named-author claim); every NHS-pension/incorporation asset pairs the tax view with the pension-accrual loss (HP §2.C) so no asset reads as an incorporation pitch.

### Asset 1 · Associate take-home and locum-structure model  (topic `associate`)

- **toolId:** `associate-take-home-premium` (R2 Tool 1). **Traces:** `calcAssociateTakeHome(grossFees, associatePct, labPct, expenses, pensionContribution)` (`compute/associate-take-home.ts`) for the headline; `calcLocumStructure(dailyRate, daysPerYear, expenses)` (`compute/locum-structure.ts`) for the structure comparison sheet.
- **File:** `/resources/associate/associate-model.xlsx` · **xlsx label:** `Associate take-home model (Excel)` · **guide slug/label:** `associate` / `Associate and locum tax guide`.
- **magnetTitle:** `Get the associate take-home model`.
- **Sheets:** `Start here` · `Your figures` · `Structure comparison` · `Rates` · `Notes`.
- **`Your figures` blue inputs (defaults, from R2 Tool 1):** Gross fees `£120,000`; Fee split `50%`; Lab fees `8%`; Other expenses `£3,000`; NHS Pension contribution `£0`.
- **Formulas (live cells referencing the `Rates` sheet named cells):**
  - `associateShare = grossFees * associatePct/100` → `120000*0.5 = 60000`
  - `lab = grossFees * labPct/100 * associatePct/100` → `120000*0.08*0.5 = 4800`
  - `profit = MAX(0, associateShare - lab - expenses)` → `52200`
  - `taxableProfit = profit - pensionContribution` → `52200`
  - income tax via the banded PA-taper formula (PA £12,570, taper above £100,000, 20/40/45% to £50,270/£125,140) matching `calcIncomeTax`
  - `class4 = (MIN(taxable,50270)-12570)*0.06 + MAX(0,taxable-50270)*0.02`
  - `class2 = IF(profit > 6725, 52*3.45, 0)` (note: `£3.45/week`, 2025/26 basis · see flag F2)
  - `totalTax = incomeTax + class4 + class2`; `netCash = taxableProfit - totalTax`
- **`Structure comparison` sheet** (advanced): blue inputs Locum day rate `£500`, Locum days `220`, expenses; three-column sole trader / limited company / umbrella from `calcLocumStructure`, best column flagged.
- **Preview (ExcelPreview `single` layout · cells = `gbp()`-rounded defaults, from R2 golden case 1):**

  | Your figures (edit the blue cells) | |
  |---|---|
  | Gross fees you generate a year | **£120,000** (blue) |
  | Your fee split | 50% (blue) |
  | Lab fees (% of gross) | 8% (blue) |
  | Your take-home | |
  | Taxable profit | £52,200 |
  | Income tax | £8,312 |
  | Class 4 and Class 2 NIC | £2,480 |
  | headline (navy→gold band): **Estimated take-home: £41,408 (effective rate 20.7%)** | |

- **Gate copy:** Headline `Get the associate take-home model` · Bullets `What you keep from your fees after income tax, Class 4 and Class 2 NIC, with live formulas` · `A locum structure sheet: sole trader vs limited company vs umbrella side by side` · `Sole-trader associate basis (2025/26 to 2026/27); the NHS Pension contribution is treated as deductible, not all arrangements qualify (HP §2.C)` · Button `Get the model`.
- **Surfaces:** calc page `/calculators/associate-take-home` (and `/calculators/locum-structure`) via `CalculatorPageResources` (`split`); blog categories `associate-tax` + `locum-tax` via the blog slot.

### Asset 2 · Principal profit-extraction model  (topic `principal`)

- **toolId:** `principal-extraction-premium` (R2 Tool 2). **Traces:** `calcPrincipalExtraction(profit, nhsActive, pensionContrib)` (`compute/principal-extraction.ts`).
- **File:** `/resources/principal/principal-extraction-model.xlsx` · **xlsx label:** `Profit extraction model (Excel)` · **guide slug/label:** `principal` / `Practice profit extraction guide`.
- **magnetTitle:** `Get the profit extraction model`.
- **Sheets:** `Start here` · `Your figures` · `Rates` · `Notes`.
- **Blue inputs (defaults, from R2 Tool 2):** Practice profit `£120,000`; Active NHS Pension member `Yes`; Employer pension contribution `£0`.
- **Formulas (live cells):** partnership leg = income tax + Class 4 + Class 2 on `profit - pensionContrib` (the `partnership.net` chain); Ltd leg = £12,570 salary, employer NIC `MAX(0,(12570-5000)*0.15)`, CT on `profitAfterSalary` with the hardcoded `0.265` marginal slice (`Rates!CTMarginalRate`), dividend on the after-CT balance via the banded dividend formula (10.75/35.75/39.35, £500 allowance), less `£2,500` admin (`LTD_ADMIN_COST`). `difference = partnership.net - ltd.net`. Mirror `calcPrincipalExtraction` branch-for-branch; a `pensionImpact` note row shows the NHS-active variant when the toggle is Yes.
- **Preview (`paired` layout · cells from R2 golden case 1):**

  | Your figures | | | Sole trader / partnership | Limited company |
  |---|---|---|---|---|
  | Practice profit | **£120,000** (blue) | | Net cash £76,489 | Net cash £72,279 |
  | Active NHS Pension | Yes (blue) | | Total tax £43,511 | Total tax and admin £47,721 |
  | | | | | |
  | headline (navy→gold band): **Sole trader or partnership keeps £4,210 more, and preserves NHS Pension accrual** | | | | |

  Honest framing: at the default the partnership wins AND preserves pension accrual (HP §5, §2.C). Tone `good` on the partnership advantage; when `nhsActive` the pension-loss note is mandatory.
- **Gate copy:** Headline `Get the profit extraction model` · Bullets `Sole trader or partnership vs limited company on the same profit, after income tax, NIC, corporation tax and dividend tax` · `The NHS Pension trap made explicit: dividends are not pensionable, so an incorporated principal loses accrual on the dividend portion (HP §2.C)` · `Built on 2026/27 rates (dividend 10.75% / 35.75%, employer NIC 15% above £5,000); a director's loan ahead of dividends triggers a s.455 charge at 35.75% on post-6-Apr-2026 loans (HP §5.A)` · Button `Get the model`.
- **Surfaces:** calc page `/calculators/principal-extraction` (`split`); blog categories `practice-accounting`, `practice-finance`, `capital-allowances-and-equipment`.

### Asset 3 · Practice purchase affordability and valuation model  (topic `buying`)

- **toolId:** `practice-purchase-premium` (R2 Tool 3). **Traces:** `calcPracticeValuation(ebitda, mix, region, demand, tangibleAssets)` (`compute/practice-valuation.ts`) + the R2 arithmetic affordability helper `calcAffordability({ purchasePrice, depositPct, interestRate, termYears, ebitda })` (`compute/practice-affordability.ts`, created by R2).
- **File:** `/resources/buying/practice-purchase-model.xlsx` · **xlsx label:** `Practice purchase model (Excel)` · **guide slug/label:** `buying` / `Buying a dental practice: due diligence and affordability guide`.
- **magnetTitle:** `Get the practice purchase model`.
- **Sheets:** `Start here` · `Your figures` · `Affordability` · `Rates` · `Notes`. The `Rates` sheet here carries the valuation MULTIPLE tables (mix base ranges, region + demand adjustments from `practice-valuation.ts`), not tax rates; label them "indicative 2025/26 market multiples, not house tax figures".
- **Blue inputs (defaults, from R2 Tool 3):** Normalised EBITDA `£200,000`; Mix `Mixed`; Region `Midlands`; Demand `Normal`; Tangible assets `£60,000`; Purchase price (default = mid total value); Deposit `20%`; Interest rate `8%` (your assumption); Term `15 years`.
- **Formulas:** goodwill/total range from the mix base ± region ± demand adjustments (`MAX(0.4,...)` / `MAX(0.5,...)` guards); `deposit = purchasePrice*depositPct/100`; `loanAmount = purchasePrice - deposit`; annual repayment via the standard amortising annuity formula (monthly `P·r/(1−(1+r)^−n)` ×12); `coverRatio = ebitda / annualRepayment`.
- **Preview (`single` · cells from R2 golden case 1, valuation `(200000,"mixed","midlands","normal",60000)`):**

  | Your figures (edit the blue cells) | |
  |---|---|
  | Normalised EBITDA | **£200,000** (blue) |
  | Practice mix | Mixed (blue) |
  | Region | Midlands (blue) |
  | Indicative value | |
  | Goodwill range | £170,000 to £230,000 |
  | Total value range | £230,000 to £290,000 |
  | Deposit (20%) · loan | £52,000 · £208,000 |
  | headline (navy→gold band): **Indicative total value £260,000, goodwill 0.85x to 1.15x EBITDA** | |

- **Gate copy:** Headline `Get the practice purchase model` · Bullets `An indicative value range from EBITDA, then a deposit, borrowing and profit-cover sense-check` · `Can the practice pay for itself? The cover ratio compares EBITDA to the annual repayment on your own assumptions` · `The interest rate and term are your assumptions, not house figures; on an asset sale the NHS contract transfers by novation and some commissioners cut value 5 to 10% (HP §3)` · Button `Get the model`.
- **Surfaces:** calc page `/calculators/practice-valuation` (`split`); blog category `buying-a-practice`.

### Asset 4 · Practice sale value and net-of-tax model  (topic `selling`)

- **toolId:** `practice-sale-premium` (R2 Tool 4). **Traces:** `calcPracticeValuation(...)` + R2's `calcPracticeSaleCgt({ gain, otherIncome, badrEligible, aeaAvailable?, badrLifetimeRemaining? })` (`compute/practice-sale-cgt.ts`, created by R2; if not yet present, trace to the Solicitors reference lib per Section 0.F).
- **File:** `/resources/selling/practice-sale-model.xlsx` · **xlsx label:** `Practice sale model (Excel)` · **guide slug/label:** `selling` / `Selling your dental practice: goodwill, CGT and BADR guide`.
- **magnetTitle:** `Get the practice sale model`.
- **Sheets:** `Start here` · `Your figures` · `Rates` · `Notes`. `Rates` carries the valuation multiples AND the CGT/BADR constants (`AEA 3000`, `BADR_RATE 0.18`, `BADR_LIFETIME 1000000`, `CGT_BASIC 0.18`, `CGT_HIGHER 0.24`).
- **Blue inputs (defaults, from R2 Tool 4):** EBITDA `£200,000`; Mix `Mixed`; Region `Midlands`; Demand `Normal`; Tangible assets `£60,000`; Chargeable gain (`0` → defaults to mid goodwill); Other income `£50,000`; BADR expected `Yes`.
- **Formulas:** valuation range as Asset 3; `taxableGain = MAX(0, gain - AEA)`; `gainAtBadr = MIN(taxableGain, BADR_LIFETIME - previousBADR)`; `overflow = taxableGain - gainAtBadr`; standard slice split 18% within remaining basic band given `otherIncome`, 24% above; `totalCgt = gainAtBadr*0.18 + basicSlice*0.18 + higherSlice*0.24`; `netProceeds = gain - totalCgt`. Mirror `calcPracticeSaleCgt` exactly.
- **Preview (`paired` · at the workbook's ACTUAL default inputs, NOT R2's 900000 stress-test case, so preview === downloaded file · executed 2026-07-05: `calcPracticeValuation(200000,"mixed","midlands","normal",60000)` → mid goodwill £200,000; the CGT default gain = that mid goodwill; `calcPracticeSaleCgt({gain:200000, otherIncome:50000, badrEligible:true, aeaAvailable:3000})` → taxableGain 197000, all within £1m BADR, totalCgt 197000×0.18 = 35460, netProceeds 164540):**

  | Your figures | | | Sale value | Net of tax |
  |---|---|---|---|---|
  | EBITDA | **£200,000** (blue) | | Total value £230,000 to £290,000 | Taxable gain £197,000 |
  | Chargeable gain | £200,000 (blue, = mid goodwill) | | | BADR at 18% £35,460 |
  | BADR expected | Yes (blue) | | | Net proceeds £164,540 |
  | headline (navy→gold band): **£164,540 kept after Capital Gains Tax at the 18% BADR rate** | | | | |

  (R2's `900000` case in Section 4.1 exercises the lib's over-£1m branch; it is the golden's stress test, NOT the workbook default. The PREVIEW and the workbook's default cells both use the £200,000 default gain so the two never disagree. Both figures are asserted in the golden, Section 4.1.)

- **Gate copy:** Headline `Get the practice sale model` · Bullets `Indicative value, then roughly what you keep after Capital Gains Tax and Business Asset Disposal Relief` · `The 14% to 18% BADR step: an unconditional exchange on or before 5 April 2026 fixes the 14% rate even if completion follows, a conditional contract does not (HP §4, §4.A)` · `BADR needs a qualifying interest held two years within the £1m lifetime limit; an earn-out is usually taxed at the standard CGT rate, not the BADR rate (HP §4.A)` · Button `Get the model`.
- **Surfaces:** calc page `/calculators/practice-valuation` shares the buying asset by default; the selling asset surfaces on blog category `goodwill-and-practice-sale`. (Because `practice-valuation` is the calculator for BOTH `buying` and `selling` topics, `CalculatorPageResources` on that page resolves to the `buying` asset via `topicForCalcSlug`; the `selling` asset is a blog-only surface. This mirrors the taxonomy, which maps the `practice-valuation` slug to `buying`.)

### Asset 5 · NHS UDA contract value model  (topic `nhs`)

- **toolId:** `uda-nhs-premium` (R2 Tool 5). **Traces:** `calcUdaValue(region, udas, contractValue, yearSigned)` (`compute/uda-value.ts`).
- **File:** `/resources/nhs/uda-value-model.xlsx` · **xlsx label:** `UDA value model (Excel)` · **guide slug/label:** `nhs` / `NHS UDA contract value and pensions guide`.
- **magnetTitle:** `Get the UDA value model`.
- **Sheets:** `Start here` · `Your figures` · `Rates` · `Notes`. `Rates` carries the regional benchmark ranges (England 25 to 35, Wales 25 to 38, NI 21 to 32) and the 2.5% CPI proxy · label all "indicative, not statutory rates".
- **Blue inputs (defaults, from R2 Tool 5):** Region `England`; Annual UDA target `12,000`; Annual contract value `£336,000`; Year last signed `2019`.
- **Formulas:** `effectiveUda = contractValue / udas`; `yearsSinceSigned = 2026 - yearSigned` (CURRENT_YEAR hardcoded 2026, flag F3); `cumulativeCpi = (1+0.025)^years - 1`; `realValuePerUda = effectiveUda / (1+cumulativeCpi)`; benchmark position (`below`/`within`/`above`).
- **Preview (`single` · from R2 golden case 1):**

  | Your figures (edit the blue cells) | |
  |---|---|
  | Region | England (blue) |
  | Annual UDA target | 12,000 (blue) |
  | Annual contract value | £336,000 (blue) |
  | Your UDA value | |
  | Effective UDA value | £28.00 |
  | Regional benchmark | £25 to £35 (within) |
  | Real value today (2026 pounds) | £23.56 |
  | headline (navy→gold band): **£28.00 per UDA, within the £25 to £35 England benchmark** | |

- **Gate copy:** Headline `Get the UDA value model` · Bullets `Your effective value per UDA, against the regional benchmark, with the real-terms erosion since your contract was signed` · `There is no national UDA value: this models your contract as it stands (HP §3)` · `The tool does not model year-end reconciliation: deliver 96% to 100% and the 4% shortfall carries forward, below 96% the commissioner claws back the overpayment (HP §3.A); Scotland uses the item-of-service SDR, not UDAs (HP §3)` · Button `Get the model`.
- **Surfaces:** calc page `/calculators/uda-value` (`split`); blog categories `nhs-contracts` + `nhs-pension`.

### 1.x Component behaviour (ResourceGate + CalculatorPageResources + ExcelPreview)

Port the generalist components with these Dentists deltas. (Decision: ship the true `ResourceGate` inline-reveal, NOT `GateOrForm` · the DELIVERABLE is the downloadable resource. Keep `GateOrForm` UNPORTED for now, mirroring the Solicitors decision; it is a fallback we can swap to later if Dentists sees generalist's 0-unlock pattern.)

- **`ResourceGate.tsx`** (`src/components/resources/`): props `{ topic: TopicKey; copy: GateCopy; split?: boolean; placement?: string; category?: string }`. Re-skin the generalist orange/slate to Dentists tokens (top accent `from-[var(--gold)] to-[var(--gold-strong)]` or a solid `bg-[var(--gold)]` bar; card `border-[var(--border)] bg-[var(--surface)]`; checkbox `accent-[var(--gold)]`; focus `ring-[var(--gold)]/25`; download-button primary `btnPrimary`, secondary guide link `border-2 border-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-soft)]`).
  - **Submit path (HARDENING · use the chokepoint, do NOT copy generalist's early-return):** route through `submitDentistLead(payload, honeypot)` (the same path `MiniCapture` uses), NOT the shared anon `submitLead`. Payload: `full_name: ""`, `phone: ""`, `role: "resource"`, `message: "[Resource: <topic>] <magnetTitle>"`, `source: niche.content_strategy.source_identifier` (`"dentists"`), `consent_given`, `consent_text: `${siteConfig.resourceConsentText} See our Privacy Policy.``, `consent_at`, `visitor_id`, `session_id`, `source_url`, `extras: { resource_gate: true }`, `captureMode` OMITTED. **Pass the honeypot value through** (`enquiry_ref`); do NOT early-return on a filled honeypot (the generalist ResourceGate does `if (honeypot !== "") return;` at line 108 · Dentists must NOT, so a real human caught by browser autofill is stored flagged by the server chokepoint, never silently dropped · flag F4). This is the Solicitors posture and the estate-standard honeypot fix.
  - **Events:** `track("gate_view", { topic, placement, category? })` once via `useInViewOnce`; `track("resource_unlocked", { topic, placement, category? })` on success; `useFormTracking("resource_gate")` for field focus/blur + `ft.onLead({ source, role: "resource" })` on success + `ft.onError("form","server")` on failure. Optional GA `generate_lead` (event_label `dentists_resource_<topic>`). No new event names.
  - **Email OFF:** success copy `You're in. Your download is ready below.`; footer `Instant access on this page. No spam.`; button `Get the model` / `Unlocking...`; the `/api/resources/deliver` fetch guarded by `RESOURCE_EMAIL_DELIVERY_ENABLED` (false, not fired). Inline `download` + guide `/resources/<slug>` links work regardless.
  - Belt-and-braces: `if (!hasEnabledResource(topic)) return null;`. Left column renders `<ExcelPreview topic={topic} />` (hidden on mobile). `@container` split via the `split` prop.
- **`CalculatorPageResources.tsx`** (`src/components/resources/`): resolves topic from the calc slug via `topicForCalcSlug`, renders the R2 `PremiumUpgrade` (existing) + the `ResourceGate` (`split`) under a `Go deeper` label, rendering nothing when neither exists. **Mount ONCE** in the dynamic `src/app/calculators/[slug]/page.tsx` after `<CalculatorClient slug={slug} variant="page" />` (line ~95), passing `slug` + a `pageTitle`. Dentists uses a dynamic `[slug]` route (no per-slug static pages, unlike Property), so this is a single wiring point · there is NO `employer-ni-calculator/page.tsx` on Dentists (that was generalist).
- **`ExcelPreview.tsx`** (`src/components/resources/`): port the generalist faux-grid (no hooks, safe anywhere) with the 5 `PreviewSpec`s above; layouts `paired` / `single`; fixed `w-[640px]` grid; recolour the headline band from orange to a navy→gold band (`bg-[var(--navy)]` label strip with a `bg-[var(--gold)]` accent, or a `bg-[var(--gold-soft)]` band with `text-[var(--navy)]` · match the token idiom). Every figure = the `gbp()`/`pct()`-rounded default output traced in Section 4.1 (preview and file never disagree). Restate any workbook em-dashes without them.

### 1.y Written guides (the value behind the gate)

Five `content/resources/<topic>.md` files (raw HTML body + frontmatter `topic/title/summary/version/lastReviewed`), served by a `src/app/resources/[topic]/page.tsx` NOINDEX route (`robots: { index: false }` + `<meta name="robots" content="noindex">`) via a `src/lib/resources/content.ts` loader.
- **Loader (Dentists-favourable delta · NO wave-1 blocker):** the generalist loader routes `addHeadingIds` through `@accounting-network/web-shared/content/markdown-utils` and defines a LOCAL `extractHeadings`. Dentists has a site-local `@/lib/markdown-utils` that exports BOTH `addHeadingIds` AND `extractHeadings` (confirmed: `src/lib/markdown-utils.ts:1` and `:19`; `addHeadingIds` is already used by `dental-guides.ts`). So the guide loader imports BOTH from `@/lib/markdown-utils` directly and builds the in-guide TOC · unlike generalist, there is NO missing-`extractHeadings` blocker and no local regex helper is needed (flag F5 RESOLVED). `generateStaticParams` from `publishedGuideTopicsWithFile()` (guides that are enabled AND have a file); 404 when the file is missing.
- Guides authored to the A* bar, compliance-aware, HP-traced: the associate guide covers status + expenses + the DFT-to-self-employment transition (HP §1, §1.B, §8); principal pairs extraction with the NHS pension trap (HP §2.C, §5, §5.A); selling covers goodwill, BADR date band + s.28 timing + earn-outs (HP §4, §4.A); buying covers valuation, s.198 fixtures, novation and financing (HP §3, §4, §7, §5.B); nhs covers UDA reconciliation + the incorporation pension trap (HP §3, §3.A, §2.C). Each is a model-companion piece, distinct from the ungated `/dental-guides` pillars.

---

## 2. WS6 · SpecialistWidget FAQ set

Port the generalist `src/lib/support/faq.ts` to `Dentists/web/src/lib/support/faq.ts`: `type Faq = { q; a }`, `const GENERIC: Faq[]`, `const BY_TOPIC: Partial<Record<TopicKey, Faq[]>>`, `faqForTopic(topic): Faq[]` returning `BY_TOPIC[topic] ?? GENERIC`. Keyed by the Dentists 7-topic `TopicKey`. Every answer is short, accurate (no personal calculations), HP-traced with tax-year tags, points to the matching calculator, and ends the deep cases at "ask a specialist for your practice's numbers". No em-dashes, no Reflex/DJH mention, no chartered/qualified claim. **NHS pension / UDA / associate-vs-principal must be prominent** (they are the site's highest-intent, highest-value questions). Target 11 Q&As (3 GENERIC + 8 topic).

### GENERIC (3, shown when no topic)
1. Q `How quickly will a specialist reply?` · A `Within one working day, and usually sooner. Leave your email and a one-line question and a specialist dental accountant will come back to you personally.`
2. Q `Is the first conversation free?` · A `Yes. The first call to understand your situation and point you in the right direction is free, with no obligation.`
3. Q `What should I have ready?` · A `Roughly: whether you are an associate, a principal or a locum, whether your income is NHS, private or mixed, and your approximate annual profit or fees. If you are not sure, we will guide you.`

### BY_TOPIC (key → Q&As, HP reference)

- `associate` (HP §1, §8, §1.B):
  1. Q `Am I self-employed as a dental associate?` · A `Usually yes, but it turns on the substance of the arrangement, not the contract label. The BDA model agreement supports self-employed status and is good evidence, but HMRC weighs control, personal service, financial risk and integration. A rostered, practice-supplied, no-autonomy arrangement carries real status risk.`
  2. Q `What can I claim as an associate?` · A `Costs wholly and exclusively for your work: indemnity, your GDC retention fee (but not restoration fees), List 3 subscriptions, relevant CPD, loupes and instruments via capital allowances, and mileage between practices at 55p a mile for the first 10,000 business miles from 6 April 2026. Home to your first practice is commuting and is not allowable.`
  3. Q `Do I still pay Class 2 National Insurance?` · A `No. Class 2 liability was removed from 6 April 2024. If your profits are above the small profits threshold you are treated as having paid and keep your state pension entitlement. You pay Class 4 at 6% between £12,570 and £50,270, then 2% above.`
- `principal` (HP §5, §2.C, §5.A):
  1. Q `Should I incorporate my practice?` · A `Sometimes, but it is a calculation, not a default. At typical dental profits the pure tax saving is small, and the 2026/27 dividend rise (10.75% and 35.75%) narrows it further. The bigger factor is usually the NHS Pension. Model both before deciding.`
  2. Q `Does a limited company cost me NHS pension?` · A `For an incorporated associate or an officer-route principal, dividends are not pensionable, so you accrue only on the salary you draw. Over a 10 to 15 year run to retirement that lost accrual can outweigh the headline tax saving. An incorporated contract-holding provider can pension drawn income up to the net pensionable earnings ceiling, but not retained profit.`
  3. Q `What happens if I overdraw my director's loan account?` · A `A dental company is a close company, so an overdrawn loan still outstanding nine months and one day after the year end triggers a section 455 charge at 33.75% on 2025/26 loans and 35.75% on loans made from 6 April 2026. It is repayable once you clear the loan, but the relief is deferred. A loan over £10,000 is also a benefit in kind.`
- `buying` (HP §4, §3, §7):
  1. Q `How is a dental practice valued?` · A `Mainly as normalised EBITDA times a market multiple, with goodwill usually 60 to 80% of the price. Multiples are ranges, not a single number, and depend on the NHS or private mix, region and buyer demand. Treat any figure as indicative until a specialist reviews the accounts.`
  2. Q `What should I check before buying a practice?` · A `The NHS contract and whether it novates on an asset sale (some commissioners cut the value 5 to 10% at that point), the CQC registration history, the lease or freehold, the goodwill and fixtures split, and a section 198 fixtures election so you do not lose the capital allowances. A specialist runs the financial due diligence with you.`
- `selling` (HP §4, §4.A, §2.C):
  1. Q `How much tax will I pay when I sell my practice?` · A `Business Asset Disposal Relief gives a reduced Capital Gains Tax rate on qualifying gains up to a £1m lifetime limit: 14% for disposals to 5 April 2026, then 18% from 6 April 2026. Gains above the limit are taxed at 24%. Completing each side of that date can change the bill, so the timing matters.`
  2. Q `Can I fix the 14% rate if I sell around April 2026?` · A `An unconditional exchange of contracts on or before 5 April 2026 fixes the 14% rate even if completion follows later. A contract conditional on something like NHS contract novation does not, because the disposal date is when the condition is met. This is a live planning lever, so take advice on the wording.`
- `nhs` (HP §3, §3.A, §2.C):
  1. Q `Is there a standard UDA value?` · A `No. There is no national UDA value. Each contract's per-UDA value was set at a 2006 baseline and uplifted since, so it varies widely, often £25 to £35 in England. Patient charges go towards the contract value, not on top of it. Use your own contract's value, and our UDA calculator shows where it sits against the regional benchmark.`
  2. Q `What happens if I under-deliver my UDAs?` · A `Deliver 96% to 100% of your target and the shortfall of up to 4% carries forward into next year, it is not clawed back as cash. Deliver below 96% and the commissioner recovers the overpayment for the activity you did not deliver. Track your UDAs against target monthly so there are no year-end surprises.`
  3. Q `Can I pension my dividends as an incorporated dentist?` · A `Generally no. For an incorporated associate, only your PAYE salary is pensionable and dividends are not, which is the incorporation pension trap. A contract-holding provider can pension drawn income up to the net pensionable earnings ceiling, but not retained profit. Always weigh the tax saving against the pension you would lose.`
- `compliance` and `uda-calc`: no `BY_TOPIC` block · `faqForTopic` returns `GENERIC` (matches Property's fall-through; add later if traffic warrants).

### 2.C Widget capture = email_only via the chokepoint
The composer collects email + message only, submitted via `submitDentistLead(payload, honeypot)` with `captureMode: "email_only"`, `extras: { capture_channel: "assistant", trigger }`. `source: "dentists"`, `role: "Other"`, `message: "[Specialist question (<topic>)] <question>"`, `consent_given: true`, `consent_text: `${siteConfig.leadConsentText} See our Privacy Policy.`` (the widget IS an enquiry, so the Reflex-aware `leadConsentText` is correct here · the server also stamps it). Honeypot `enquiry_ref` passed through (`ft.onError("enquiry_ref","honeypot")` on a hit, no silent drop). Fires `support_opened` on open, `lead_submitted` on success (via `useFormTracking("specialist_widget")`). Success copy: `Thanks, a specialist has your message and will be in touch by email. Please keep an eye on your inbox, and your spam or junk folder, so our reply is not missed.`

---

## 3. WS6 · Assistant Phase-0 (journey model + opener + escalation)

Build the Dentists journey model + opener + widget as a 1:1 deterministic port of the generalist/Property machinery, keyed to the Dentists 7-topic taxonomy and `dfp` storage prefix. No LLM (`OPENER_LLM_ENRICHMENT_ENABLED = false`). Pure pattern-rules over events autoCapture already emits.

### 3.1 `src/lib/intent/journeyModel.ts` (new, ported verbatim from generalist)
- Storage key `dfp_journey` (never `hd_`/`ptp_`).
- Copy the structure exactly: `PageNode`, `Trail`, `JourneyStage = "researching" | "comparing" | "evaluating-us" | "ready"`, `JourneyProfile { primaryTopic, secondaryTopic, stage, depth, signals[], pageCount }`, `initJourneyModel()`, `recordPath()`, `getJourneyProfile()`, `profileKey()`, `_resetJourneyModel()`. Import the Dentists `deriveTopic` from `./deriveTopic` and `TopicKey` from `./taxonomy`.
- **Special-page flags port verbatim, no drops:** the model tracks `/about`, `/services`, `/contact` prefixes; ALL THREE routes exist on Dentists (confirmed), so unlike Solicitors no flag is dropped. `deriveTopic` already returns null for home/`/about`/`/services`/`/contact`.
- Topic-weighting (verbatim): `w = sections*2 + maxScrollPct/25 + (computed?4:0) + 1`. Signal set verbatim: `multi-topic`, `visited-about`, `visited-services`, `visited-contact`, `used-calculator`, `returning`, `friction`, `deep-read` (scroll ≥70 or sections ≥4). Stage ladder verbatim: `researching` → `comparing` (≥2 topics or ≥3 pages) → `evaluating-us` (visited /about or /services) → `ready` (used a calc, visited /contact, or returning).

### 3.2 `src/lib/assistant/opener.ts` (new) · topic nouns/hooks per topic × stage

Port every function from the generalist opener: `OPENER_LLM_ENRICHMENT_ENABLED = false`, `TOPIC_NOUN: Record<TopicKey,string>`, `TOPIC_HOOKS: Record<TopicKey,[string,string,string]>`, `variantIndex(pingIndex, stage)` (verbatim: `evaluating-us` +1, `ready` +2, clamp 0..2), `pickOpener(profile, pingIndex)` (dispatch order: COMBO → used-calculator at vi≥2 → topic hook → GENERIC), `frictionOpener(profile)`, `exitOpener(profile)`, a `USED_CALC` triple, a `GENERIC` triple, and the sole-vs-Ltd combo. Voice rules (LOCKED): one sentence, no em-dashes, no figures, no tax advice, never claim the firm is chartered/qualified. The opener's only job is to earn the click. NO booking branch.

| Topic key | `TOPIC_NOUN` | Hook 1 (curious) | Hook 2 (helpful) | Hook 3 (direct) |
|---|---|---|---|---|
| `associate` | `your take-home` | `Working out what you keep as an associate? I can pull up the calculator that does the fiddly part.` | `Want a hand comparing your take-home as a sole trader, or as a locum through a company? Happy to point you to it.` | `A free call with a specialist will confirm the most tax-efficient way to work as an associate, want me to set one up?` |
| `principal` | `your profit extraction` | `Sorting how to take your practice profit? I can point you to the planner in a second.` | `Weighing partnership against a limited company? There is a tool that shows both, with the NHS pension trade-off.` | `A free call will get your extraction and pension trade-off straight, want me to arrange it?` |
| `buying` | `buying a practice` | `Looking at a practice to buy? I can show you an indicative value and an affordability check.` | `Want me to line up the valuation and affordability calculator before you make an offer?` | `A specialist can run the financial due diligence with you, the first call is free, shall I set it up?` |
| `selling` | `selling your practice` | `Thinking about selling? There is a tool that shows an indicative value and what you keep after tax.` | `CGT on a practice sale has a few moving parts. Want me to point you to the calculator and the BADR timing?` | `Before you put a figure on a sale, a specialist can sanity-check the CGT and the timing for you, free. Fancy a quick call?` |
| `nhs` | `your NHS contract` | `Working out what your UDA contract is really worth? I can pull up the tool that checks it.` | `Not sure where your UDA value sits against the benchmark? I can run you through the quick comparison.` | `A specialist can talk through your NHS contract and the pension side, free first call, want me to set one up?` |
| `uda-calc` | `your UDA contract` | `Want to check your effective UDA value? I can pull up the calculator.` | `Not sure your UDA value keeps up with the benchmark? I can point you to the quick checker.` | `A free call is the quickest way to get your NHS contract value straight, interested?` |
| `compliance` | `your accounts and deadlines` | `Anything I can help you find on your practice accounts, VAT or deadlines? I can point you to a quick answer.` | `Want a hand keeping on top of your filing and VAT position? Happy to help.` | `A free first call with a specialist is the quickest way to get your compliance sorted, want me to set one up?` |

- **Combo (`COMBO_ASSOCIATE_PRINCIPAL`)** when both `associate` and `principal` are in the profile (the "should I go from associate to buying in / incorporating?" journey): `[ "Moving from associate towards owning or incorporating? That is a big question, and I can help you start on it.", "Associate versus principal, and whether to incorporate, is a close call for a lot of dentists. Want me to line up the comparison?", "This is exactly what a specialist untangles in one free call. Want me to arrange it?" ]`. Implement via a both-topics check mirroring the generalist `COMBO_SOLE_INC`.
- `USED_CALC` (fires when `signals.includes("used-calculator")` at vi≥2): `[ "You have already run the numbers. Want me to point out anything worth a specialist eye?", "The calculator gives a picture; a specialist confirms whether it fits your actual practice. Want a quick check?", "Ready to sanity-check those results? A free call goes further than any calculator." ]`.
- `GENERIC`: `[ "Not sure what you are looking for? I can point you to the right tool or a quick answer.", "Happy to help you find what you need. What is the main thing on your mind?", "The quickest way to get a straight answer is a free call with a specialist. Want me to set one up?" ]`.
- `frictionOpener(profile)` and `exitOpener(profile)` ported verbatim (they slot `TOPIC_NOUN[t]`), navy/gold-agnostic (copy only).

### 3.3 Ping escalation thresholds · PORTED VERBATIM from Property/generalist
- `CADENCE_THRESHOLDS_MS = [30_000, 70_000, 120_000, 180_000]` (ms of VISIBLE page time; first ping 30s, then +40s, +50s, +60s; accrues while `document.visibilityState === "visible"`, pauses when backgrounded).
- `AUTO_OPEN_KEY = "dfp_assistant_autoopened"`, `AUTO_OPEN_DELAY_MS = 600`; auto-present ONCE per session (prod-gated, always in dev): desktop opens the panel, mobile (`innerWidth < 640`) surfaces the peek.
- Exit-intent arming: desktop `10_000` ms then `mouseleave` at `clientY <= 0`; mobile `8_000` ms then leave-style scroll (`maxY > 700 && y < 150 && lastY - y > 4`). One instant tailored `exit` ping.
- Friction: on `form_error` from the analytics bus, instant `frictionOpener()` ping.
- Suppression: `engagedRef` stops the session's cadence on any open/chip click; suppressed entirely for `isConverted()` visitors (from `@accounting-network/web-shared/analytics/visitMemory`; no cross-session lock, so a non-converter can be helped again next session).
- Every ping fires `personalization_shown` with `{ surface:"assistant_nudge", trigger, variant, rule_id:`assistant_<stage>`, topic, stage, signals: signals.slice(0,6).join(","), content: line.slice(0,120) }`; the peek click fires `personalization_clicked`, dismiss fires `personalization_dismissed` (props reused from the last ping). Chip clicks fire `cta_click { cta_id:"assistant_<goal>", placement:"assistant_card", topic }`.

### 3.4 `dfp_assistant_active` stand-down wiring
- On mount (when `active`), the widget sets `window.sessionStorage.setItem("dfp_assistant_active", "1")` in the init effect (mirrors the generalist `hd_assistant_active`).
- **`ExitIntentModal.tsx` needs NO change** · it already reads `dfp_assistant_active` at line 82 and bails before `setOpen(true)`. WS6 only supplies the SETTER (the widget). Do NOT re-edit ExitIntentModal for the stand-down (per minimal-intervention). (If QA wants belt-and-braces the widget can also clear the flag on unmount, but the session-scoped set is sufficient and matches the generalist.)
- Mount `<SpecialistWidget />` in `PageShell.tsx` next to `<ExitIntentModal />` (line ~24, inside the shell so both exit surfaces sit together and self-gate via `useIntentContext()`). Fixed `bottom-24 right-4`, `print:hidden`. (Property/generalist mount in the layout inside `IntentProvider`; on Dentists both `ExitIntentModal` and the widget live in `PageShell` which is already inside `IntentProvider` at `layout.tsx:96`, so PageShell is the correct, consistent slot.)

### 3.5 SpecialistWidget copy + tokens
- Header brand `Dental Finance Partners` / subline `A specialist replies within one working day`. Re-skin generalist orange/slate to Dentists tokens: header bar `bg-[var(--navy)] text-white`, avatar/chip accents `bg-[var(--gold)]`, unread pip stays a neutral red alert, chips `border-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-soft)]`, primary button `bg-[var(--navy)] text-white` or `btnPrimary`. Chips: `See your numbers` (→ `/calculators/<journeyTopic.primaryCalculator>`), `Book a free call` (→ `/contact`, no `/book`), the footer `Ask a specialist` reveals the composer. No booking branch.

### 3.6 taxonomy `resourceId` wiring (MANAGER)
`src/lib/intent/taxonomy.ts` `TOPICS` currently sets `resourceId` to the topic key string for associate/principal/buying/selling/nhs and `null` for compliance (read: they are already `"associate"`, `"principal"`, etc.). Confirm each shipped topic's `resourceId` equals its guide slug (they do, since guide slug == topic key); no change needed unless a slug diverges. `compliance` stays `null`. This is a read-and-confirm, not necessarily an edit.

---

## 4. Golden / QA cases

### 4.1 xlsx generator outputs vs compute-lib figures (per-tool golden test)
New golden tests live alongside the builders (`scripts/resources/builders/<topic>.test.ts`) OR in the premium test file. Every workbook's default-scenario output cell must equal the TS `compute()` result at the same inputs, to the penny, BEFORE the `enabled` flag is flipped. Every figure below was derived by EXECUTING the current corrected libs (they are the R2 goldens, re-used). `gbp()` = `£` + `Math.round(n)` with en-GB thousands; `pct(n,1)` = one decimal.

| Workbook | Default inputs | Key intermediates | Headline | Golden assertions (raw) |
|---|---|---|---|---|
| associate | grossFees 120000, split 50, lab 8, exp 3000, pension 0 | associateShare 60000; lab 4800; profit 52200; incomeTax 8312; class4 2300.6; class2 179.4 | Take-home **£41,408** (eff 20.7%) | netCash 41408; totalTax 10792; conservation netCash+totalTax=52200 |
| associate · structure sheet | `calcLocumStructure(500,220,8000)` | gross 110000; profit 102000 | (secondary sheet) | soleTrader/ltd/umbrella `net`+`tax` per executed lib; best flagged; each `net+tax=102000` (sole/ltd) |
| principal | profit 120000, nhsActive true, pension 0 | partnership chain; ltd chain (0.265 marginal, £2,500 admin) | Partnership keeps **£4,210 more** | partnership.net 76489; partnership.tax 43511; ltd.net 72279.37; ltd.tax 47720.63; conservation partnership net+tax=120000 |
| practice-purchase | ebitda 200000, mixed, midlands, normal, tangible 60000; deposit 20%, rate 8%, term 15 | multipleLow 0.85; multipleHigh 1.15; goodwill 170000 to 230000; total 230000 to 290000 | Total **£260,000** (mid) | goodwillLow 170000; goodwillHigh 230000; totalLow 230000; totalHigh 290000; deposit 52000; loanAmount 208000; deposit+loan=purchasePrice; cover>1 |
| practice-sale (WORKBOOK DEFAULT) | valuation as above; default gain = mid goodwill 200000; `calcPracticeSaleCgt({gain:200000, otherIncome:50000, badrEligible:true, aeaAvailable:3000})` | taxableGain 197000; all within £1m BADR | Kept **£164,540** | taxableGain 197000; totalCgt 35460 (197000×0.18); netProceeds 164540; net+cgt=gain 200000. THIS is the cell the workbook + preview show |
| practice-sale (stress test, from R2 §2 case 2) | `calcPracticeSaleCgt({gain:900000, otherIncome:50000, badrEligible:true, aeaAvailable:3000})` | taxableGain 897000; within £1m BADR | (not shown in the file) | totalCgt 161460 (897000×0.18); netProceeds 738540 · asserts the lib's within-limit branch at scale |
| uda-value | england, udas 12000, contract 336000, signed 2019 | effectiveUda 28; yearsSince 7; cumulativeCpi ≈0.18869 | **£28.00/UDA** (within) | effectiveUda 28; realValuePerUda ≈23.5554; benchmark 25 to 35; position "within" |

**Hardcoded-rate mirrors each builder MUST replicate (else the golden fails):** CT marginal slice `0.265` (not 3/200); dividend 0.1075/0.3575/0.3935 + £500 allowance; employer NIC 0.15 above £5,000; Class 2 `£3.45/week` at profit > £6,725; Ltd admin `£2,500` (principal) / `£1,800` (locum); CGT AEA £3,000, BADR 0.18/£1m, standard 0.18/0.24; UDA CPI proxy 0.025, benchmarks 25 to 35/25 to 38/21 to 32, CURRENT_YEAR 2026. Source each from the matching compute lib per Section 0.E (re-export or literal-with-comment), never re-derive.

### 4.2 FAQ + opener + gate fact-check (HP section references)
Every asserted figure must trace to a LOCKED HP position. Verify at build:

| Claim in FAQ/opener/gate/guide | HP § | Must read |
|---|---|---|
| Dividend 10.75% / 35.75% / 39.35%, £500 allowance, from 6 Apr 2026 | §5 | tax-year tagged "from 6 April 2026"; never 8.75/33.75 without a "to 5 Apr 2026" tag |
| Employer NIC 15% above £5,000 secondary threshold from 6 Apr 2025; never 13.8%/£9,100 | §5, §13 | current rate only |
| Corporation tax 19% ≤£50k, 25% >£250k, marginal (0.265 slice) between | §5 | |
| s.455 33.75% (2025/26 loans) / 35.75% (from 6 Apr 2026); 9m+1d; s.458 deferred; £10k BIK | §5.A | date band + repayable, not permanent |
| Class 4 6%/2%; Class 2 removed from 6 Apr 2024 | §8 | do NOT tell an associate to pay weekly Class 2 |
| Mileage 55p first 10,000 miles from 6 Apr 2026 (45p to 5 Apr 2026), 25p thereafter | §8 | date-tagged |
| BADR 14% to 5 Apr 2026, 18% from 6 Apr 2026; £1m lifetime; above at 24% | §4 | exact date band each time; never "still 10%" |
| CGT AEA £3,000; standard 18%/24% business-asset from 30 Oct 2024 | §4 + F6 | (AEA/standard-rate not restated verbatim in HP §4 · flag F6) |
| s.28 disposal timing (unconditional exchange = date governs; conditional = condition-met) | §4.A | not blanket "completion governs" |
| Earn-out usually taxed at standard CGT, not BADR (Marren v Ingles) | §4.A | |
| Incorporation is a calculation not a default; pension trap; dividends not pensionable | §5, §2.C | never "always more efficient"; always pair with pension loss |
| NPE provider ceiling 43.9% of TCV; incorporated associate cannot pension dividends | §2.C | provider vs associate distinction kept |
| No national UDA value; bands 1=1/2=3/3=12/urgent=1.2 UDAs; charges go towards not on top | §3 | |
| UDA reconciliation: 96 to 100% carry-forward 4%, below 96% clawback | §3.A | 96% is the clawback line |
| Associate self-employment = substance over the BDA label; status factors | §1 | do NOT say BDA "guarantees" status |
| VAT dental care exempt (Sch 9 Grp 7); cosmetic-only standard-rated; register £90,000 | §6 | £90,000 not £85,000 (if compliance copy surfaces) |
| DFT year salaried/PAYE/officer-pensionable; £42,408 from 1 Apr 2025 | §1.B | not self-employed during DFT |

**Opener/gate safety (LOCKED):** no em-dashes; never claim the firm is chartered/qualified/regulated; faceless (no named expert); no surveillance framing ("we noticed you're struggling"); reference only what the visitor self-evidently did on the page.

### 4.3 Consent + delivery + behaviour QA (adversarial frame)
- **Consent byte-match:** the rendered resource-gate consent string equals `${siteConfig.resourceConsentText} See our Privacy Policy.` exactly; assert it does NOT contain "Reflex" (grep the rendered WS5 output). Assert `siteConfig.resourceConsentText` names only "Dental Finance Partners".
- Assert the string "DJH" appears nowhere in the WS5/WS6 output.
- Assert `extras.resource_gate === true` on the ResourceGate insert (and NOT on the assistant/MiniCapture inserts).
- With `RESOURCE_EMAIL_DELIVERY_ENABLED === false`: gate copy makes NO email promise; `/api/resources/deliver` is not fired; inline `download` + guide read link work.
- Honeypot `enquiry_ref` non-empty → success UI + a flagged row via the chokepoint, NO silent drop, for BOTH the ResourceGate (F4 · confirm the generalist early-return was removed) and the widget composer.
- **Golden recomputation is MANDATORY** (§4.1): recompute every workbook default cell by executing the lib; assert to the penny with conservation checks; reject any `typeof`-only assertion. `hasEnabledResource` false for `compliance`; belt-and-braces null guard means a disabled/missing file never renders a broken gate.
- Stand-down: with `dfp_assistant_active === "1"`, `ExitIntentModal` does NOT arm; converted visitor → assistant suppressed AND ExitIntentModal behaves as before.
- Assistant: never fires for `isConverted()`; stops on panel open; re-tailors, never repeats a line verbatim; auto-open once per session (prod).
- All events on the allowlist; zero off-list names; no `--primary`, no `orange-*`/`emerald-*` leak in a shipped R3 component (grep).
- Standard gates: `npm test --workspace Dentists/web`; `npm run build --workspace Dentists/web` (MANDATORY · vitest + tsc do not catch prerender failures); `python scripts/predeploy_gate.py --site dentists`; `python scripts/spinup_site_check.py dentists --site-dir Dentists`; then the post-deploy battery per `CRO_PARITY_TEMPLATE.md` §3.

---

## 5. File manifest (Dentists/web only) + build order

All paths under `Dentists/web/`. "new" = create; "modified" = edit existing. No new runtime npm dependency (`exceljs` + `tsx` are build-time devDeps).

### WS5 · resources (data + server + components)
| # | Path | Purpose |
|---|---|---|
| 1 | `src/lib/resources/registry.ts` | download spine (`XlsxAsset`/`GuideAsset`/`CategoryResource`/`RESOURCES` over 7 topics/helpers; 5 enabled + `compliance` null + `uda-calc` → nhs asset) |
| 2 | `src/lib/resources/copy.ts` | `GateCopy`/`gateCopy(topic,pageTitle?,override?)`; fallback title "Free dental practice toolkit" |
| 3 | `src/lib/resources/content.ts` | server-only guide loader (`getGuideByTopic`, `publishedGuideTopicsWithFile`; `content/resources`; `addHeadingIds` from local `@/lib/markdown-utils`) |
| 4 | `src/lib/resources/config.ts` | `RESOURCE_EMAIL_DELIVERY_ENABLED = false` |
| 5 | `src/components/resources/ResourceGate.tsx` | navy/gold on-page gate; chokepoint submit; honeypot pass-through (no early-return); email path stubbed; `extras.resource_gate` |
| 6 | `src/components/resources/ExcelPreview.tsx` | 5 navy/gold `PreviewSpec`s (paired/single) |
| 7 | `src/components/resources/CalculatorPageResources.tsx` | calc-page island: `PremiumUpgrade` + `ResourceGate`, mounted once in `[slug]` |
| 8 | `src/app/resources/[topic]/page.tsx` | NOINDEX guide route (`generateStaticParams` from `publishedGuideTopicsWithFile()`) |
| 9 | `scripts/resources/generate-xlsx.ts` | generator loop (byte-stable ZIP timestamps; `wb.creator = "Dental Finance Partners"`) |
| 10 | `scripts/resources/builders/index.ts` | `BUILDERS` registry (append-only, `{ topic, fileName, build }`) |
| 11 | `scripts/resources/builders/{associate,principal,practice-purchase,practice-sale,uda-value}.ts` | 5 xlsx builders; rates sourced from the matching compute lib (Section 0.E) |
| 12 | `scripts/resources/builders/*.test.ts` (or premium test file) | golden: xlsx default cell === lib `compute()` (§4.1), blocks the `enabled` flip |
| 13 | `content/resources/{associate,principal,buying,selling,nhs}.md` | 5 gated guides (HTML body + frontmatter), HP-traced, model-companion pieces |
| 14 | `public/resources/<topic>/<topic>-model.xlsx` × 5 | generated + committed |

### WS6 · assistant + widget + FAQ
| # | Path | Purpose |
|---|---|---|
| 15 | `src/lib/support/faq.ts` | 11 house-traced Q&As (§2), `faqForTopic` |
| 16 | `src/lib/intent/journeyModel.ts` | trail-based journey model, `dfp_journey` key, Dentists `deriveTopic` |
| 17 | `src/lib/assistant/opener.ts` | topic nouns/hooks + escalation (§3.2), no LLM, no booking |
| 18 | `src/components/support/SpecialistWidget.tsx` | proactive assistant, navy/gold, email_only capture, `dfp_` keys, `/contact` call chip |

### Modified files
| # | Path | Change |
|---|---|---|
| A | `src/config/site.ts` | **MANAGER** adds in-house `resourceConsentText` (0.C) + exports it on `siteConfig` |
| B | `src/components/blog/BlogPostRenderer.tsx` | inject `<GateOrForm-less ResourceGate>` · actually: inject `<ResourceGate topic={topic} copy={gateCopy(topic)} placement="blog" category={categorySlug} />` at a LATE split (AFTER R2's `PremiumUpgrade` island + the mid-scroll `InlineMiniLeadForm`, so the free tool leads and the download lands lower); short-post fallback after the body; renders null when the topic has no enabled asset. Coordinated append-on-top of the R2 edit (0.F) |
| C | `src/app/calculators/[slug]/page.tsx` | mount `<CalculatorPageResources slug={slug} pageTitle={tool.metaTitle} />` once after `<CalculatorClient>` (~line 95) |
| D | `src/components/layout/PageShell.tsx` | mount `<SpecialistWidget />` next to `<ExitIntentModal />` (~line 24) |
| E | `src/lib/intent/taxonomy.ts` | **MANAGER** confirm `resourceId` == guide slug on the 5 shipped topics (read-and-confirm; likely no edit) |
| F | `package.json` | add `exceljs` (+ `tsx` if absent) devDep + `"resources:xlsx"` script |
| G | (optional) relevant `compute/*.ts` | **MANAGER** additive named exports of the rate constants the builders need, IF Section 0.E option 1 chosen (else no change) |

**NOT touched (guardrail):** `src/lib/tools/registry.ts`, `src/lib/tools/premium/*` (R2, separate registry), the shared `Calculator.tsx`/`CalculatorClient.tsx`, the gallery/sitemap/embeds, every existing `compute/*` compute BODY (only additive exports if 0.E option 1), the 6 `content/dental-guides/*` pillars + `src/lib/dental-guides.ts`, `ExitIntentModal.tsx` (stand-down already wired). `Property/**` READ-ONLY (`git diff baseline -- Property/` empty is a gate). `packages/web-shared` NOT edited.

### Build order
1. **A, 1, 2, 4** · config `resourceConsentText` + registry shapes + email flag (assets stay `enabled:false`).
2. **WS6 first (16 → 17 → 15 → 18), D** · journeyModel → opener → faq → SpecialistWidget → mount. No data dependency; lights up immediately (deterministic). (Solicitors shipped WS6 first for the same reason.)
3. **9, 10, 11** · generator + builders; run `npm run resources:xlsx` → `public/resources/`.
4. **12** · golden tests; go green (blocks the `enabled` flip).
5. **3, 8, 13** · loader + NOINDEX route + guide md.
6. **5, 6, 7** · gate + preview + calc-page island.
7. **B, C** · inject into blog (on top of R2) + calculator surfaces.
8. **Flip `enabled:true`** per asset (registry) once its golden passes (WS5 live). **E** confirm `resourceId`s.
9. Full QA (§4) → gates (§3 template) → owner sign-off → deploy (env-override recipe, project `prj_f3tGDR4zozATcYOSLMmCqO2ZInNV`, `--site-dir Dentists`) → post-deploy battery. Apply migration `20260706000001` to Dentists prod (owner-signed) before the resource gate ships live.

---

## Regression invariants (must not break)
- `dfp` storage prefix FROZEN: every new key is `dfp_…` (`dfp_journey`, `dfp_assistant_autoopened`, `dfp_assistant_active`). No `hd_`/`ptp_` leak.
- No new event names (allowlist §0). No em-dashes. No "DJH". No "Reflex" in `resourceConsentText`/resource-gate copy. No `--primary`, no `orange-*`/`emerald-*` in shipped R3 components.
- Compute maths NEVER forked · the workbooks and the FAQ trace the existing R2 libs; the only "new" logic is xlsx formulas mirroring those libs, golden-gated.
- `ResultGateModal` and the R2 premium tier are untouched; the WS5 registry is separate and additive.
- The ExitIntentModal stand-down guard is already present · do NOT re-edit it.

---

## 8-line summary
1. R3 adds 5 email-gated resource pairs (Excel model + noindex guide) delivered ON-PAGE, plus the deterministic proactive SpecialistWidget/assistant, both ported from the wave-1 generalist/Property machinery to the Dentists navy/gold CSS-variable token system with no new runtime dependency (exceljs is build-time only).
2. Resources cover the 5 R2 premium-tool topics: associate take-home (`calcAssociateTakeHome`+`calcLocumStructure`), principal extraction (`calcPrincipalExtraction`, NHS-pension trap prominent, HP §2.C/§5), practice purchase (`calcPracticeValuation`+`calcAffordability`), practice sale net-of-CGT (`calcPracticeValuation`+`calcPracticeSaleCgt`, BADR 18%/£1m, HP §4), and UDA value (`calcUdaValue`, HP §3); `compliance` stays a specialist-contact topic with no asset; the 6 existing `/dental-guides` pillars stay ungated and untouched (gated assets are NEW artefacts).
3. Email delivery is stubbed: the ResourceGate reveals downloads inline only, does NOT call `/api/resources/deliver`, and its success copy promises no email; a `RESOURCE_EMAIL_DELIVERY_ENABLED=false` flag makes re-enabling one line once a from-domain exists.
4. Consent for downloads uses a new in-house-only `resourceConsentText` (names only Dental Finance Partners, never Reflex), distinct from the partner-aware `leadConsentText` the widget enquiry correctly keeps; `extras.resource_gate:true` is set on the gate insert (migration 20260706000001 skip); the ResourceGate routes through the chokepoint and passes the honeypot through (no generalist early-return), never silently dropping a real human.
5. The 11-Q&A FAQ puts NHS pension, UDA reconciliation and associate-vs-principal front and centre, tracing every figure to a LOCKED HP position with tax-year tags (dividends 10.75/35.75 from 6 Apr 2026, employer NIC 15%/£5,000, BADR 14→18% at 6 Apr 2026, s.455 35.75%, 96% UDA clawback line, mileage 55p).
6. The assistant is a 1:1 deterministic port: Property cadence thresholds verbatim ([30/70/120/180]s), `dfp_` storage prefixes, Dentists topic nouns/hooks per stage, all three special-page flags kept (about/services/contact all exist), and the `dfp_assistant_active` stand-down that the ExitIntentModal ALREADY reads (only the setter is new, so ExitIntentModal is not re-edited).
7. Golden checks assert every workbook formula equals its lib compute to the penny (netCash 41408, partnership.net 76489, CGT 161460 = 897000×0.18, effectiveUda 28.00) with conservation checks and block the `enabled` flip; all events are allowlisted; no `--primary`/orange leak, no em-dashes, no DJH.
8. R3 ships AFTER R2 (never bundled): the blog injection appends on top of R2's premium island, and the sale/purchase workbooks reuse R2's `practice-valuation.ts` + `practice-sale-cgt.ts`; the workbooks source rates from each compute lib (no shared `uk-tax-rates.ts` on Dentists) via additive re-export or literal-with-comment, golden-gated.

## Unverifiable / must-resolve items flagged
- **F1 (no shared rate module):** Dentists has NO `src/lib/uk-tax-rates.ts` (generalist's builders import one). Each Dentists builder must source rates from the matching compute lib · either add additive named exports to the compute libs (preferred, drift-proof) or mirror the constants literally with a `// traced to compute/<lib>.ts` comment (golden-gated). Orchestrator picks the route before build.
- **F2 (associate lib year label):** `associate-take-home.ts` is headed "UK 2025/26" and uses Class 2 £3.45/week + 2025/26 income-tax bands (unchanged into 2026/27; no dividend/employer-NIC exposure), so it is safe to reuse; the associate workbook + copy date outputs "2025/26 to 2026/27 basis". A conscious choice, not an oversight (carried from R2 flag F2).
- **F3 (UDA CURRENT_YEAR):** `uda-value.ts` hardcodes `CURRENT_YEAR = 2026`; the UDA workbook's `yearsSinceSigned` mirrors it. Fine for 2026; note it needs review when 2026/27 NHS rates publish. Not a stale-figure defect (carried from R2).
- **F4 (honeypot posture):** the generalist ResourceGate early-returns on a filled honeypot (`if (honeypot !== "") return;`). The Dentists ResourceGate must NOT · it routes through `submitDentistLead(payload, honeypot)` and passes the honeypot through so the server chokepoint stores a real-human autofill hit flagged, never silently dropped (estate-standard fix, Solicitors posture). QA asserts no early-return remains.
- **F5 (guide-loader heading helper) · RESOLVED:** the site-local `@/lib/markdown-utils` exports BOTH `addHeadingIds` (line 1) AND `extractHeadings` (line 19), confirmed at source. The guide loader imports both locally and builds the in-guide TOC. No local regex helper is needed and there is NO generalist-style loader blocker. (Kept in the list as a resolved item for the builder's awareness.)
- **F6 (CGT AEA + standard-rate HP trace):** HP §4 locks BADR precisely (18% from 6 Apr 2026, £1m lifetime, primary-source verified) but the excerpt read does not restate the AEA £3,000 nor the standard 18%/24% CGT rates from 30 Oct 2024; the R2 practice-sale lib uses them (estate-standard, cross-site-consistent). Confirm against a Dentists-side/shared CGT ground-truth source before the sale workbook + selling copy cite them, exactly as R2 flag F1 requires. The BADR-eligible path (£1m/18%) IS HP-traced.
- **F7 (success-box colour):** the existing Dentists `MiniCapture` keeps an emerald success box (`emerald-200/50/900`), the one non-navy/gold survivor. R3 surfaces should prefer a gold-tinted success (`bg-[var(--surface-elevated)] border-[var(--gold-soft)] text-[var(--navy)]`) to keep the token palette clean; matching the existing MiniCapture emerald is acceptable for strict consistency. Orchestrator's call; QA notes which was chosen.
