# Build spec: unified premium tools + resources system (Property)

Build-ready spec (grounded in the actual code) for the per-topic interactive tools +
per-category email-gated downloads. Implementation sub-agents follow this.

## Goal
- Per TOPIC (canonical topics in `src/lib/intent/taxonomy.ts`, aligned to blog categories): a
  best-in-class interactive tool ON the page = premium calculator (guided inputs → rich visual
  results, scenario comparison e.g. personal-vs-company) PLUS an optional editable mini-grid.
- Email swap unlocks TWO per-CATEGORY downloads: a real working Excel (.xlsx, live formulas) +
  a comprehensive written guide. Asset is per-category; email-capture COPY is per-PAGE (templated
  from the page's topic/title). Feature-flagged per asset so it never points at a missing file.
- SEO-SAFE + ADDITIVE: same URLs, existing server-rendered copy/FAQs/schema preserved, widgets
  inline (not iframes), no CLS/CWV regression, gate gates DOWNLOADS only (never page content),
  gated guide pages `noindex`.
- Tied to the taxonomy: new category = one registry entry + authored assets. Top categories first
  (Section 24, Incorporation, Capital Gains, Landlord essentials, Stamp duty, MTD), then roll out.

## Grounding (verified facts)
- Taxonomy hub: `src/lib/intent/taxonomy.ts` (TopicKey, TOPICS w/ primaryCalculator + reserved
  `resourceId:null`, CALC_SLUG_TO_TOPIC, topicForBlogSlug/topicForCalcSlug/getTopic);
  `deriveTopic.ts`.
- Calculators: generic config tools (`fields`+`compute`+`explainer`) rendered by shared
  `components/calculators/Calculator.tsx`; 5 bespoke components; `lib/calculators/registry.ts`.
- Ground-truth math centralised + reusable: `src/lib/cgt.ts`, `src/lib/sdlt.ts` (locked constants
  from `docs/property/house_positions.md`). `IncorporationCostCalculator` already imports `lib/sdlt`.
- Mini-grid precedent: `PortfolioProfitabilityCalculator.tsx` already manages editable property rows.
- `recharts@3.8.0` already a dep — use for visual results (code-split, ssr:false).
- Inline injection: `BlogPostRenderer.tsx` `splitContentAtMidScroll(html)` injects
  `<InlineMiniLeadForm topic={post.category}/>` at the ~60% H2; it already receives `categorySlug`.
- Lead pipeline: `InlineMiniLeadForm.tsx` (honeypot `company_url`, consent, `submitLead`,
  `useFormTracking`, visitor/session ids). Row insert → webhooks → `/api/leads/notify` (Resend to
  INTERNAL team) + `/api/leads/sync` (Sheet). NO existing path emails the LEAD — net-new.
- `getResend()`/`getFromAddress()` in `lib/resend.ts`. No `scripts/` dir yet; no `public/resources/`.

## 1. Per-category registry (the spine — build first)
- New `src/lib/resources/registry.ts`: `CategoryResource` keyed by TopicKey: `{ topic, toolId,
  xlsx: {file,label,enabled}|null, guide:{slug,enabled}|null, magnetTitle, magnetBlurbTemplate }`.
  `RESOURCES: Record<TopicKey,CategoryResource>`, `resourceForTopic(topic)`. String/data-only (safe
  in client bundle). `enabled` flags = the feature flag (never render a missing/disabled asset).
- Extend `taxonomy.ts`: set `resourceId = topic.key` for the six flagship topics (purely additive;
  do NOT change TopicKey/slugs/CALC_SLUG_TO_TOPIC).
- New `src/lib/calculators/premium/registry.ts`: `toolId -> PremiumToolConfig` (separate from the
  fleet registry so sitemap/gallery/SEO are untouched).
- Onboarding a category: add TopicKey+slugs (done) → add RESOURCES entry (enabled:false) → add
  PremiumToolConfig → author assets in parallel → flip enabled per asset. No route/renderer edits.

## 2. Premium calculator + editable mini-grid
- `src/lib/calculators/premium/types.ts`: extend existing CalcField/CalcValues/CalcResult; add
  `PremiumToolConfig {id,topic,title,fields:CalcField[],grid?:GridConfig,scenarios?:ScenarioConfig,
  compute:(ctx)=>PremiumResult,chart?:ChartSpec,explainer}`. `PremiumResult` extends CalcResult with
  breakdown rows, series, scenarioResults.
- `components/calculators/premium/PremiumCalculator.tsx` ("use client"): renders any config; reuse
  the field renderer from Calculator.tsx (extract a shared `fields/Field.tsx`), reuse the same
  `track("calc_view"/"calc_input_change"/"calc_computed")` so premium tools appear in the funnel.
  Left = inputs, right = recharts + breakdown rows in the existing slate-900 panel style.
- `components/calculators/premium/MiniGrid.tsx`: generalise the portfolio pattern. `GridConfig
  {columns:GridColumn[],rowFactory,minRows,maxRows,addLabel}`. Rows in client useState; compute gets
  `{values,rows}`. Optional debounced localStorage persistence keyed `ptp:grid:<toolId>` (SSR-guard).
- Scenario comparison: `ScenarioConfig{scenarios:{id,label}[]}`; compute returns scenarioResults;
  render side-by-side + grouped recharts bar. For Incorporation reuse the EXACT math from
  `IncorporationCostCalculator.tsx` — extract to pure `lib/incorporation.ts` (like cgt/sdlt) and have
  both components call it (cannot drift).
- Charts: `components/calculators/premium/ResultChart.tsx`, recharts, `next/dynamic({ssr:false})`,
  fixed aspect/height container (no CLS).
- Enhancing existing calculators: DO NOT modify bespoke pages' server copy/H1/explainer/FAQ/schema.
  Add `<PremiumUpgrade topic=.../>` as an ADDITIONAL client island below the existing calculator,
  gated on a premium config existing. Existing calculator stays the indexable hero.

## 3. Excel (.xlsx) generation
- Library: `exceljs` (devDependency only; build-time, never shipped — writes real formulas, named
  ranges, validation, sheet protection).
- `Property/web/scripts/resources/generate-xlsx.ts` + `builders/<topic>.ts` each `build():Workbook`.
  npm script `"resources:xlsx": "tsx scripts/resources/generate-xlsx.ts"` (add `tsx` devDep). Output
  one workbook per category → `public/resources/<topic>/<topic>-model.xlsx`.
- Sync with ground truth: the generator IMPORTS the same locked constants the calculators use
  (`src/lib/sdlt.ts`, `src/lib/cgt.ts`, `lib/incorporation.ts`) and writes them into a locked `Rates`
  sheet; user-facing formulas reference those cells. Both site math + xlsx rates derive from the same
  modules → cannot drift. Add a golden test asserting the TS `compute` result == the xlsx formula
  result for sample inputs; gate `enabled:true` on it passing. Regeneration is a manual/CI step (not
  `next build`); COMMIT the generated .xlsx (set fixed workbook.created/modified for byte-stable diffs).
- Each workbook: "Start here" sheet, user-input sheet w/ live formulas, locked Rates sheet,
  Notes/assumptions sheet mirroring the on-site disclaimers; data-validation dropdowns for bands.

## 4. The guides (gated) + delivery
- Format: gated print-friendly WEB pages (MDX), NOT generated PDFs (reuses gray-matter +
  addHeadingIds + prose-blog, instantly updatable, `@media print` for save-as-PDF). PDF can be
  generated from the same MDX later if needed.
- Content: `Property/web/content/resources/<topic>.md` (frontmatter topic/title/summary/version/
  lastReviewed). `lib/resources/content.ts`: `getGuideByTopic(topic)` (gray-matter + addHeadingIds).
- Route: `src/app/resources/[topic]/page.tsx`: generateStaticParams from enabled RESOURCES;
  dynamicParams=false; `robots:{index:false,follow:false}`. Guide HTML revealed client-side after
  unlock (or via `?k=` token in the delivery email). Only the DOWNLOAD/guide is gated; no
  blog/calculator content is ever gated.
- Delivery (reveal + email), both from the same successful lead insert:
  - Reveal: on submitLead success, swap to success state with two buttons (xlsx + guide link).
  - Email: new `src/app/api/resources/deliver/route.ts` (nodejs) POST {topic,email,visitor/session}:
    validate topic∈RESOURCES&&enabled, re-validate email, rate-limit, `getResend()`+`getFromAddress()`
    email the lead the two links. SEPARATE from the existing webhook notify/sync (team email
    unchanged). RISK: from-address must be a Resend-VERIFIED domain to email external users — until
    verified, reveal-and-download still works (ship reveal first, email second).

## 5. The email-gate component (per-page intent copy)
- `components/resources/ResourceGate.tsx` ("use client"): FORK `InlineMiniLeadForm.tsx` (keep
  honeypot/consent/submitLead/useFormTracking/ids/validation). Props `{topic, copy}`. Lead payload
  `role:"resource"`, `message:"[Resource: <topic>] <magnetTitle>"`. On success: reveal two downloads
  + `fetch("/api/resources/deliver",...)` + `track("resource_unlocked",{topic})` + generate_lead gtag.
  Feature-flag: if neither xlsx nor guide enabled → render nothing (or fall back to InlineMiniLeadForm);
  per-asset show only the enabled+existing download.
- `lib/resources/copy.ts`: `gateCopy(topic,pageTitle?,override?)` → heading/blurb templated from
  topic.label + magnetTitle + page title/intent (per-PAGE copy, per-CATEGORY asset). Optional override
  (blog frontmatter `resourceCopy:` or a calculator-page prop). Add `resource_unlocked` to the event
  allowlist (types.ts).

## 6. Where it renders (inline, additive, SEO-safe)
- Blog: in `BlogPostRenderer`, compute `topic = topicForBlogSlug(categorySlug)` (helper exists; use
  the SLUG not the human label). At the mid-scroll split, additionally inject `<PremiumUpgrade
  topic/>` and `<ResourceGate topic copy={gateCopy(topic,post.title)}/>` (only if assets enabled;
  else keep InlineMiniLeadForm). All server HTML/FAQs/schema preserved; islands are additive children;
  reserved min-heights, charts ssr:false + sized (no CLS).
- Calculator pages: add `<PremiumUpgrade topic={topicForCalcSlug(slug)}/>` + `<ResourceGate/>` BELOW
  the existing calculator/explainer/FAQ. Existing component/prose/schema unchanged. URLs/metadata same.
- Embeds `/embed/[slug]`: neither tool nor gate (leave untouched).
- SEO checklist: same URLs/copy/FAQ/schema; inline not iframe; gate gates downloads only; gated guide
  noindex; recharts client-only+sized → no CLS/bundle regression.

## 7. Build order
- Phase A (framework, sequential, NO authored assets, all enabled:false → renders nothing → safe to
  ship): registry + taxonomy resourceId; premium types/registry + PremiumCalculator + MiniGrid +
  ResultChart (+ shared Field extraction); ResourceGate + copy + api/resources/deliver; exceljs+tsx
  devDeps + scripts/resources scaffold + resources:xlsx script; injection wiring behind enabled-flag.
- Phase B (Section 24 flagship, end-to-end, proves the pipe): Section 24 PremiumToolConfig
  (personal-vs-company scenario, optional properties mini-grid); section-24 xlsx builder → generate
  the .xlsx; content/resources/section-24.md; the gated resources/[topic] route; flip Section 24
  flags true; verify blog injection + calc-page island + gate→reveal+delivery, CWV, schema unchanged.
- Phase C (roll out Incorporation, Capital Gains, Landlord essentials, Stamp duty, MTD — PARALLEL):
  each = {one PremiumToolConfig} + {one xlsx builder} + {one guide MDX} + {flip flags}; share only
  append-only registry lines (coordinate to avoid conflicts). Guide authoring + xlsx builders + tool
  configs are all parallel once Phase A interfaces are frozen.

## 8. Risks
- External email needs a Resend-verified domain — ship reveal-download first, email second.
- xlsx↔code drift: the golden test is mandatory; gate enabled on it passing.
- `splitContentAtMidScroll` returns after:null for <4 H2 posts → islands not injected; add an
  end-of-article fallback injection so short posts still get the gate.
- Use `topicForBlogSlug(categorySlug)` (slug), not the human `post.category` label.
- CLS: fixed aspect/min-heights + ssr:false dynamic recharts; Lighthouse-QA Section 24 before rollout.
- Bundle: code-split premium tool + recharts so non-flagship slugs are unchanged.
- `stamp-duty` topic has empty `blogCategorySlugs` → surfaces on calculator pages only unless a
  category slug is added (SDLT content currently sits under property-types-and-specialist-tax).
- Commit generated .xlsx with fixed timestamps for byte-stable diffs.
