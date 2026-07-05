# Estate CRO Parity - wave-instantiation TEMPLATE

> Instantiate, do not redesign. Wave 1 (generalist + Solicitors) shipped R1/R2/R3 live. Waves 2-5 (Dentists → Medical → cfp+cis twin → agency) are copies of this shape with per-site inputs swapped in. Read `docs/_engines/CRO_PARITY_PROGRAM.md` (state doc, the continuity artifact) first; this file is its reusable execution recipe.
>
> Reference implementations to copy from (already shipped, at branch `estate-cro-parity`): `generalist/web/**` and `Solicitors/web/**`. Shared machinery: `packages/web-shared/leads/**`, `packages/web-shared/analytics/**`, `packages/web-shared/tools/**`.
>
> Model tiering (locked): Sonnet sub-agents BUILD non-overlapping file packages. Opus sub-agents write per-niche copy + adversarial QA. The manager/architect personally does ALL git, migrations, `packages/web-shared` edits, gates, deploys, rollbacks. Haiku: mechanical greps only.
>
> UK English. No em-dashes anywhere in user-facing copy (commas, parentheses, full stops, middle dots). No DJH mention on any non-Property site.

---

## 1. WAVE SHAPE

Each site ships as THREE separately gated production deploys, in order. Never bundle releases. Factual and compliance fixes are FRONT-LOADED into R1 (they gate the money path and widen exposure once personalisation goes default-ON).

### Release ladder (per site)
- **R0 backlog (only if the site has undeployed content/factual debt, e.g. generalist G-0):** ship the existing backlog as its own gated release BEFORE any CRO work, so lead-recovery attribution is not muddied.
- **R1 - capture core + intent + blog architecture (WS1+WS2+WS3, plus ALL front-loaded fixes).** Ships FIRST because it kills the live `company_url` silent-drop lead-loss bug and lands the server chokepoint.
  - WS1 capture core: per-site `app/api/leads/submit/route.ts` wrapper (6 lines), `src/lib/leads/submit-client.ts`, LeadForm + MiniCapture + CalcResultCta rewire.
  - WS2 intent layer: `components/intent/*` + `lib/intent/*` port, per-niche taxonomy, personalisation hardcoded ON (no experiment-assign block), intent-aware StickyCTA site-wide.
  - WS3 blog conversion architecture: BlogPostRenderer parity (early tool-island slot, mid InlineMiniLeadForm, bottom LeadForm, NextStepOffer), qualified-lead ExitIntentModal.
  - FRONT-LOADED into R1: every stale tax constant (manager-ordered rate refresh with regenerated goldens BEFORE any premium derivation); every compliance gap (missing opt-out control while cookie/privacy promises one; GA4 mounted outside the consent gate); taxonomy fixes (dynamic `[category]` hub + case-insensitivity where the site's breadcrumbs 404); wizard/health-check rewire to the chokepoint (honeypot + phone-sentinel removal); sitemap holes; placeholder phones.
- **R2 - premium in-blog tools + result gates (WS4).** Per-niche premium fleet on the premium registry pattern, `PremiumUpgrade`/`MobileToolSlot` blog islands, `ResultGateModal` (in-blog only). Golden tests per tool. Ships after R1's synthetic probe passes.
- **R3 - gated resources + specialist widget/assistant (WS5+WS6).** ResourceGate + xlsx/guides (email delivery OFF until a per-site Resend from-domain exists; on-page delivery only), SpecialistWidget + deterministic Phase-0 assistant (journey model + escalating ping, NO LLM chat). Gated on the resource-gate migration being applied to that site's prod (individually owner-signed).

### The workflow that builds each release
1. **Architect (Opus) writes the release brief** modelled on `docs/generalist/R2_PREMIUM_TOOLS_BRIEF.md` + `docs/generalist/R3_RESOURCES_ASSISTANT_BRIEF.md` (and the Solicitors siblings). Brief pins: exact file manifest, per-tool golden figures traced to `house_positions.md §N` + the compute lib, placement map, event allowlist, brand tokens, the hardening invariants below.
2. **Sonnet workers build non-overlapping file territories** in parallel. Registry files and `BlogPostRenderer.tsx` are append-only shared-edit and must be coordinated (one registry line per tool/asset). Workers NEVER fork the maths: wrap the existing compute libs.
3. **Embedded Opus adversarial QA** with golden recomputation (skeleton §4). Findings fixed pre-commit.
4. **Manager integration battery** (§3) on the FINAL tree.
5. **Ship** through the gate pipeline (§3).

### Standing owner authorizations (do not re-ask)
- **Ship-when-green:** R1/R2/R3 deploy sign-off granted in advance, conditional on the full gate pipeline being green (tests, builds, predeploy_gate, spinup, Opus adversarial QA, post-deploy battery). No per-release ask. No artificial post-deploy waits; the 48h/7d checks are monitoring read-backs, never blockers; build phases proceed continuously.
- **Waves 2-5 authorized** as template instantiations, ship-when-green per release. Wave order re-validated with a LIVE traffic query at each wave gate.
- **Prod DB migrations remain INDIVIDUALLY owner-signed** (the auto-mode classifier enforces this correctly). The only prod migration in this program is the resource-gate notify/enrich skip; sign it per site before R3 ships there.

---

## 2. PER-RELEASE WORK-PACKAGE CHECKLISTS

Paths shown with `<site>/web/` root and `<prefix>` = the frozen storage prefix (dfp/ma/cfp/bfp/aff/…). Copy templates from `generalist/web/**` (or `Solicitors/web/**` where noted). Do NOT regress any hardening fix called out in bold.

### R1 - WS1 capture core (WP-A)
- [ ] `src/app/api/leads/submit/route.ts` - 6-line wrapper. Copy `generalist/web/src/app/api/leads/submit/route.ts` verbatim; change only `source:"<site>"`. Keep `runtime="nodejs"`, `maxDuration=10`, `dynamic="force-dynamic"` (SEC-04, statically readable).
- [ ] `src/lib/leads/submit-client.ts` - copy `generalist` version. **Hardening: on a 4xx the client returns the route error and does NOT fall back** (`res.status < 500` path returns; only 5xx / network error falls through to the shared `submitLead`). **In the fallback path a honeypot-flagged submit is stored with `extras:{honeypot:true,suspected_spam:true}`, never silently dropped.** Rename the per-site payload/fn (`submit<Site>Lead`).
- [ ] `src/components/forms/LeadForm.tsx` - rewire to `submit<Site>Lead`. **Kills the live `company_url` client-side silent-drop lead-loss bug.** Honeypot field is `enquiry_ref`, passed through to the server as the honeypot arg (never used to abort client-side). Fold niche qualifiers into the global `leads` schema as OPTIONAL fields; overflow qualifiers go to `extras`, NOT crammed into `message`.
- [ ] `src/components/forms/MiniCapture.tsx` - same rewire + honeypot pass-through; validation aborts must emit `form_error` (do not swallow).
- [ ] `CalcResultCta` - copy the construction-cis template; routes through `MiniCapture`.
- [ ] Any public write surface (health-check `Wizard`) → rewire to the chokepoint: add honeypot, drop the `phone:"-"` sentinel, move qualifiers to `extras`, keep PDF/fulfilment fail-open.
- Guardrail: `packages/web-shared/**` reused as-is (the `createLeadSubmitHandler` factory already exists). No web-shared edit expected in a wave.

### R1 - WS2 intent layer (WP-B)
- [ ] `src/components/intent/*` + `src/lib/intent/*` - port from `generalist` (or the CANONICAL construction-cis intent layer). Includes `IntentProvider`, `StickyCTA`, `NextStepOffer`, `DeepScrollModal`/`ReturningBar`, `deriveTopic`, `taxonomy`.
- [ ] Per-niche `taxonomy.ts` from CONTENT truth (real categories + slugs), NOT the config's stale list.
- [ ] **Personalisation hardcoded default-ON: strip the experiment-assign block entirely; no `useExperiment` callers.** No new experiments this program.
- [ ] **StickyCTA hardening (copy `generalist/web/src/components/ui/StickyCTA.tsx`): `data-cta="sticky_cta"` + `data-cta-placement="sticky"`, `z-50`, and the shown-impression guard** (`shownRuleRef` fires `personalization_shown` exactly once per rule and only while the bar is actually painted). Storage key `<prefix>_sticky_dismissed`.
- [ ] `IntentProvider` mounted in root layout, `storagePrefix:"<prefix>"`, posture `"opt-out"`, self-no-ops on `/embed`, `/admin`, consent-denied.
- [ ] **Compliance (front-loaded): `ConsentToggle` in `SiteFooter`** (copy `generalist/web/src/components/analytics/ConsentToggle.tsx`) if the site promises a "Do not track me" control but lacks it. **GA4 via `ConsentedScripts` ONLY** (pass `gaMeasurementId` into the gate; remove any unconditional site-local GoogleAnalytics from `<head>`).

### R1 - WS3 blog + exit (WP-C)
- [ ] `src/components/blog/BlogPostRenderer.tsx` - parity: early tool-island slot, mid `InlineMiniLeadForm` (via `splitContentAtMidScroll`), bottom `LeadForm`, `NextStepOffer`. Compute the topic ONCE at the top via `topicForBlogSlug(categorySlug)` (the SLUG, never the human `post.category`).
- [ ] `ExitIntentModal.tsx` - qualified-lead template; drop the assistant stand-down guard until WS6.
- [ ] **Dynamic `[category]` hub where breadcrumbs 404** (copy `generalist/web/src/app/blog/[category]/page.tsx`): `generateStaticParams` over content categories, `notFound()` on unmatched, brandless title (root layout appends the brand once). **Where hand-built static hubs coexist, use the Solicitors STATIC-exclusion pattern** (`STATIC_HUB_SLUGS` set excluded from `generateStaticParams` AND `notFound()`-guarded in the page so the static page always wins and is never shadowed). Prefer slug-level category matching so a rename is never needed.
- [ ] **YAML date coercion:** loader-side `String()` coercion on frontmatter dates; frontmatter linting via the predeploy gate. Fix unquoted colon-space scalars and BOM files before the gate.
- [ ] Raw `<img>` blog hero → `next/image`. Sitemap holes filled (guides + `/for-*` + health-check + static routes).

### R2 - WS4 premium tools + gates (WP-D/E/F)
- [ ] `src/lib/calculators/premium/{types.ts,registry.ts,tools/*.ts,lib/*.ts,premium.test.ts}` - port from `generalist/web/src/lib/calculators/premium/**`. One `tools/*.ts` + goldens + one appended registry line per tool. **Wrap existing compute libs; zero maths forked.** New maths (if any) is a thin golden-tested helper.
- [ ] `src/components/calculators/premium/{PremiumCalculator,PremiumUpgrade,MobileToolSlot,MiniGrid,ResultGateModal}.tsx` + `ui/*` - port, re-skinned to the site's tokens (NOT Property emerald). **Grid storage key `<prefix>:grid:<toolId>`, never `ptp:`.** Lean primitive path (native range inputs, `<details>` collapsibles, CSS bar) unless the brief chose recharts/radix.
- [ ] `ResultGateModal` three non-negotiables: **escape hatch ALWAYS reveals** (X, backdrop, Esc, "just show my result" → one `cta_click {cta_id:"result_gate_skip", placement:"result_gate"}` per dismiss); **`isConverted()` visitors NEVER gated**; **once per session** (module-scoped flag). `gated = placement === "blog" && !isConverted()` - only in-blog placements gate; pages/embeds/mobile-slot never.
- [ ] `BlogPostRenderer.tsx` (coordinated edit): inject `<PremiumUpgrade topic={topic} placement="blog" category={categorySlug} />` ALONGSIDE `InlineMiniLeadForm` at the mid-split; end-of-article fallback when `midSplit.after === null` (short posts).
- [ ] Events from the existing allowlist ONLY (`calc_view`, `calc_input_change`, `calc_computed`, `calc_result_viewed`, `cta_click`, `gate_view`, `resource_unlocked`, `lead_submitted`). Add NO new event names.
- [ ] **Golden tests pin EXACT figures with conservation checks** (no `typeof`-only assertions - those let stale tax constants survive). Where a site has zero calculator goldens (construction-cis), R2 goldens start from scratch.

### R3 - WS5 resources (WP-G/H)
- [ ] `src/lib/resources/{registry.ts,copy.ts,content.ts,config.ts,resources.test.ts}` + `src/components/resources/{ResourceGate,GateOrForm,CalculatorPageResources,ExcelPreview}.tsx` - port from `generalist/web/src/**/resources/**`.
- [ ] `scripts/resources/{generate-xlsx.ts,builders/*.ts,builders/*.test.ts}` - one builder per asset, each importing the SAME `uk-tax-rates.ts` constants the compute lib uses (workbook and site can never drift). **xlsx builders are em-dash-free** (copy strings audited). Golden test: xlsx formula result === TS `compute()` at default inputs, BEFORE flipping `enabled:true`.
- [ ] Consent: **resource gate uses in-house `siteConfig.resourceConsentText` (NEW), NOT the partner `leadConsentText`.** Assert the rendered gate string does not contain the partner name. **`extras.resource_gate` set on the insert** (the prod trigger skips notify/enrich on it - LIVE via migration `20260706000001`).
- [ ] Email delivery OFF: `RESOURCE_EMAIL_DELIVERY_ENABLED=false`; gate copy promises no email; `/api/resources/deliver` not fired; inline `download` + guide read link work regardless.
- [ ] NOINDEX guide route `src/app/resources/[topic]/page.tsx`; loader routes through shared `@accounting-network/web-shared/content/markdown-utils` (site-local `@/lib/markdown-utils` does not exist).

### R3 - WS6 widget/assistant (WP-I/J)
- [ ] `src/lib/support/faq.ts` (10 house-traced Q&As), `src/lib/intent/journeyModel.ts` (trail-based, key `<prefix>_journey`), `src/lib/assistant/opener.ts` (topic nouns/hooks + escalation, `variantIndex`, NO LLM, NO booking branch), `src/components/support/SpecialistWidget.tsx` - port from `generalist/web/src/**`.
- [ ] Assistant capture = `email_only` via the chokepoint. **Strip DJH / any partner "shared with" phrasing from the assistant surface** beyond the standard server-stamped consent line. Success copy points to inbox + spam folder.
- [ ] Ping thresholds ported verbatim (`CADENCE_THRESHOLDS_MS = [30_000,70_000,120_000,180_000]`, `AUTO_OPEN_DELAY_MS = 600`). Suppressed entirely for `isConverted()`. Storage keys `<prefix>_assistant_autoopened`, `<prefix>_assistant_active`.
- [ ] `ExitIntentModal.tsx` - wire the `<prefix>_assistant_active` stand-down (bail before `setOpen(true)` when active). Mount `SpecialistWidget` in `PageShell` next to `ExitIntentModal`.

---

## 3. GATE PIPELINE + BATTERIES

### Gate pipeline (verbatim from the state doc - EVERY deploy, no skips)
0. Commits on `estate-cro-parity` + tag `predeploy/<key>/<date>` + push
1. `npm test --workspace <Dir>/web`
2. `npm run build --workspace <Dir>/web` (+ full web-shared battery if touched)
3. `python scripts/predeploy_gate.py --site <key>`
4. `python scripts/spinup_site_check.py <key>` (Dentists needs `--site-dir Dentists`)
5. OWNER SIGN-OFF (diff summary + risks + rollback plan)
6. Deploy (env-override recipe below); verify returned alias = the SITE's domain
7. Post-deploy battery: AN-01 browser pass · headers check · notify-401 probe · `node scripts/estate_synthetic_lead_check.mjs --site <key>` · honeypot-filled browser submit (success UI + NO row) · once-per-site live-form probe via LEAD_PROBE_SECRET (owner pre-warned, no Reflex CC) · `python scripts/honeypot_health.py` · exercise each new surface + confirm events in web_events
8. 48h: console funnel renders, events flowing, no form_error spike
9. 7d: guardrail read vs `docs/<site>/cro_baseline_<date>.md`

Rollback: `vercel rollback --yes` (with env override) THEN `git revert` + gates before that site deploys again. Tag every deploy `deploy/<site>/<date>`.

**Deploy recipe (NEVER bare `vercel deploy` from repo root - root `.vercel` = Property):**
`VERCEL_ORG_ID=team_XF9WAygZX7SGk9Fo4tOAnihH VERCEL_PROJECT_ID=<prj> vercel deploy --prod --yes` (echo the project ID first; confirm target=production via `vercel inspect` - CLI 54.x prints a misleading "Promote to production" hint even on a real `--prod` deploy). CLI auth = stored login (VERCEL_TOKEN in .env is EMPTY; do not use `--token`).

### Manager integration battery (run on the FINAL tree, before gate step 0)
- `npm test --workspace <Dir>/web` (grep output for `failed|npm error` AND assert the expected pass count; never trust an "=== OK ===" marker).
- `npm run build --workspace <Dir>/web` (MANDATORY - vitest + tsc do NOT catch prerender/`next build` failures).
- If `packages/web-shared` was touched (should not be in a wave): `npm test --workspace packages/web-shared` (≥348) + `npm run build --workspace Property/web` + `npm test --workspace Property/web` (~1076) + build sweep of all 9 apps.
- Property-harm audit: `git diff baseline -- Property/` must be EMPTY. Central pipeline probe: `curl -s -o /dev/null -w "%{http_code}" https://www.propertytaxpartners.co.uk/api/leads/notify` = 200 (404 = all-sites incident).

### Post-deploy battery (step 7 detail)
- `node scripts/estate_synthetic_lead_check.mjs --site <key>` (and `--route` mode to prove the chokepoint end-to-end). Synthetic leads ALWAYS `source='test'`.
- Live-form probe A+B+C once per site via `LEAD_PROBE_SECRET` (set per site at deploy time): probe goes through the real form with `probe_secret` matching env; server rewrites to `source='test'` (operator-only, no CC, no enrichment). Proves probe-secret → source='test' rewrite.
- Honeypot-filled browser submit → success UI shown AND no `leads` row written.
- `python scripts/honeypot_health.py` clean.
- **SSR-evidence verification rules (client-rendered surfaces):** curl/chunk-grep MISSES are INCONCLUSIVE, never FAIL. `ssr:false` dynamic imports live in lazy chunks not referenced by the initial HTML; some calculator pages SSR zero config text. For a client-only surface the EVIDENCE is: (a) the component source at the deployed commit, (b) green goldens, (c) deploy provenance (`vercel inspect` target=production, matching commit). Prefer SSR-visible markers when asserting a surface is live. Confirm events flowing in `web_events` post-deploy as the behavioural proof.

---

## 4. QA PROMPT SKELETONS (adversarial, per release)

Give the Opus QA agent the diff, the brief, and this frame. Findings are fixed pre-commit; then the gate re-runs on the final tree.

**Shared adversarial frame (all releases):**
> You are adversarial QA on <site> <release>. Assume the build is wrong. Do not trust pass markers. For every test file, GREP the raw output for `failed|npm error` and confirm the exact expected pass count. Report DEFECTS with file:line and the fix. Blocking checks: (1) no em-dashes in any user-facing string; (2) the string "DJH" appears nowhere; (3) every emitted event is on the `packages/web-shared/analytics/types.ts` allowlist (no new names); (4) `git diff baseline -- Property/` is empty; (5) `packages/web-shared` unchanged (or, if changed, flag for manager-only review). For any CLIENT-RENDERED surface, a curl/chunk-grep miss is INCONCLUSIVE not FAIL - evidence is component source at HEAD + green goldens + deploy provenance.

**R1 QA additions:**
> Verify the chokepoint: honeypot `enquiry_ref` non-empty → stored flagged + success returned (no silent drop). submit-client: 4xx returns the error and does NOT fall back; only 5xx/network falls through, and the fallback stores the honeypot flag. LeadForm no longer has a client-side `company_url` abort. StickyCTA carries `data-cta`+`z-50`+the shown-impression-once guard. GA4 mounts ONLY via `ConsentedScripts`; the opt-out control exists and works. Dynamic `[category]` route `notFound()`s unmatched slugs and excludes hand-built hubs. **Consent byte-match:** the rendered consent string equals the intended site consent text exactly (no partner/DJH leakage).

**R2 QA additions:**
> **Golden recomputation is MANDATORY.** For EVERY premium tool, recompute the default-input result by tracing the compute lib branch-for-branch and assert the golden matches to the penny, with a conservation check (inputs reconcile to outputs). Reject any `typeof`-only assertion. Confirm no maths was forked (premium `compute()` imports the exported pure fns). ResultGate: escape always reveals (one `result_gate_skip` per dismiss), `isConverted()` never gated, once per session. Grid storage key is `<prefix>:grid:*` not `ptp:`.

**R3 QA additions:**
> For every xlsx builder, assert the workbook's default-scenario output cell equals the TS `compute()` result at the same inputs (golden recomputation), and that the builder mirrors the site's hardcoded-rate exceptions. Consent byte-match: resource gate renders `resourceConsentText` (in-house), NOT the partner `leadConsentText`; string must not contain the partner name. `extras.resource_gate` present on the insert. With email delivery OFF: gate copy makes no email promise and `/api/resources/deliver` is not fired. Assistant: `email_only` capture through the chokepoint; honeypot passed through; DJH/partner "shared with" phrasing absent from the assistant surface.

---

## 5. HARD-WON LESSONS (do not relearn)

1. **The npm shim masks failures.** `npm test 2>&1 | tail` in Git Bash can print "OK" over real failures even with `set -e -o pipefail`. NEVER trust "=== OK ===" markers: grep the output for `failed|npm error` AND confirm the expected pass counts before declaring a battery green.
2. **Gates bind to the FINAL tree, not to when you ran them.** ANY edit after a gate re-runs that gate before ship. (S-1 shipped a post-gate content edit that moved 10 URLs and broke 22 internal links in prod for hours; the next gate caught it.)
3. **Category renames MOVE URLs.** Renaming a blog category moves every post under it. Pair any rename with a content-link sweep + a permanent (301/308) redirect in `next.config`. Better: match at slug level so a rename is never needed (the Solicitors STATIC-exclusion + slug-match pattern).
4. **Curl batteries are inconclusive on client-rendered surfaces** (false-alarmed twice). `ssr:false` chunks are not in the initial HTML; some calc pages SSR no config text. Evidence for a client-only surface = source at the deployed commit + green goldens + deploy provenance, plus events flowing in `web_events`. Chunk-grep misses are INCONCLUSIVE.
5. **vitest + tsc do NOT catch prerender failures.** `next build` is MANDATORY in every battery; a green unit suite and clean types can still fail to prerender.
6. **`typeof`-only assertions let stale tax figures survive.** Pin EXACT goldens with conservation checks. (Three live advisory-grade defects were caught this way: dividend rates, the SRA £250 figure, and the employer-NIC secondary threshold 9,100→5,000 that survived behind a `typeof` Ltd test.)
7. **Unquoted YAML colons/dates break builds.** Add loader-side `String()` coercion on frontmatter dates + frontmatter linting in the predeploy gate; strip BOM and fix colon-space scalars before gating.

---

## 6. PER-SITE INSTANTIATION INPUTS

| Wave | Site (key, prefix, project ID) | Audit section | Specific pre-work (front-loaded into R1 unless noted) |
|---|---|---|---|
| 2 | Dentists (`dentists`, `dfp`, `prj_f3tGDR4zozATcYOSLMmCqO2ZInNV`; `--site-dir Dentists`) | `WAVE2_3_PARITY_AUDIT.md` §Dentists | Derive taxonomy from CONTENT truth (12 real categories, 204 posts; config lists only 5); ship dynamic `/blog/[category]` hub (breadcrumbs 404 on ~83 posts) + make hub filters CASE-INSENSITIVE (`=== "Associate tax"` misses 19 "Associate Tax"); compose the existing 74+16 legacy 301s in `middleware.ts`, never replace. Rate fixes (manager-ordered, regenerate goldens): NIC 9100/13.8%→£5,000/15%, dividends 8.75/33.75→10.75/35.75/39.35, "UK 2025/26 rates" copy → 2026/27. Add "Do not track me" control (promised, missing). Rewire health-check `Wizard` to chokepoint (no honeypot, `phone:"-"` sentinel). Sitemap holes. Tokens = CSS truth (navy #001b3d + gold #b8975d), config brand colour is wrong. |
| 3 | Medical (`medical`, `ma`, `prj_50vByZ3rqXQQwCUeENUTBbNBB41n`; **FLAT `/blog/[slug]` routing - use `scripts/medical_flat_link_audit.py`, never nested tooling**) | `WAVE2_3_PARITY_AUDIT.md` §Medical | GA4 gating (currently unconditional in `<head>`, `ConsentedScripts` no-op - the exact Solicitors pre-fix defect); LeadForm is WORST in estate (raw `fetch(rest/v1/leads)` anon-key, `company_url` drop, stray `console.log`) → full chokepoint replacement; guides are a hardcoded TS array (`lib/medical-guides-data.ts`), NOT files → decide the data model before ResourceGate; keyTakeaways surface build (0/73, WS8) + backfill; renderer diverges (boxed header, raw `<img>`, local ToC/ReadingProgress forks); add `/embed` to `noTrackPrefixes`; fix env-example domain (wrong: medicalfinancepartners.co.uk); "Do not track me" promised, missing. TOOLS.md stale vs its own (correct) code - do not seed premium briefs from the doc. `.vercel` lives at `Medical/.vercel` (not `/web/`). Tokens = CSS truth (navy #001b3d + copper #b87333). |
| 4 (twin) | contractors-ir35 (`cfp`, `cfp`, `prj_AJhtTBB8SMdKluzfCNvwCCqU1yii`) + construction-cis (`bfp`, `bfp`, `prj_zaehvfgdTKx0Ftc8GQVedmRnjp4g`) | `WAVE4_5_PARITY_AUDIT.md` §cfp + §cis | **Twin split** (QA as one diff, two palettes). Worker A = cis template-hardening: chokepoint + submit-client + LeadForm/MiniCapture rewire (qualifiers → extras), enquiry_ref, exit modal + mid-scroll InlineMini, **robots.ts rewrite (clone cfp's - cis is a bare stub)**, **embedPrefix fix** (`buildSecurityHeaders` missing embedPrefix → `/embed/*` X-Frame DENY, embeds cannot frame), **placeholder phone `+44 20 0000 0000`**, ConsentToggle. Worker B = cfp intent port from cis (contractor taxonomy 7 cats/6 tools/12 `/for` types), StickyCTA real (`bfp_`→`cfp_` keys), layout mounts, SEC-04, **same embedPrefix + phone fixes**. cis facts CORRECT (10.75, 15%/£5,000, 55p) - no rate refresh. cis has NO calculator goldens → R2 goldens from scratch. WS7 personalization-locked-ON goes live with cis's R1 deploy. Manager expects NO web-shared edits. |
| 5 | digital-agency (`agency`, `aff`, project `agency-founder-finance` - **NO `.vercel` link: relink echo-first before ANYTHING; root `.vercel` = Property**) | `WAVE4_5_PARITY_AUDIT.md` §digital-agency | Solo, after the twin. Order: relink → **author `house_positions.md`** (does not exist; required before any copy) → **newsletter-retirement WP** (strip `components/newsletter/*` surfaces + mounts in PageShell/SiteFooter/homepage/BlogPostRenderer/`/newsletter` page, pull from sitemap:67, **disarm the ARMED daily cron `0 7 * * *` in `web/vercel.json`** + `api/nurture/*` + config/nurture, CRON_SECRET decision) → R1 (health-check `Wizard` → chokepoint as a qualified lead keeping PDF fulfilment fail-open - it currently DROPS consent server-side and its conversions never reach the leads pipeline; GA4 gating - exact Solicitors defect; StickyCTA parity) → R2 (**reconcile the two tool systems first: 12 bespoke calculator components layered over the 8-config fleet** before premium overlays) → R3. Hand-hubs coexist with dynamic `[category]` (the S-1 category-fallout shape → link sweep + 301s, or slug-match). Fix the live BADR defect (`selling-agency-tax-implications.md:143` "10% to 18% on 6 April 2025" → 10→14 (2025) →18 (2026)) in the first content-touching commit. Compute libs CORRECT with goldens. |

At each wave gate, re-query LIVE `web_sessions`/`leads` (never trust repo docs for volume) to re-validate order and size the prize.

---

## 7. STANDING RULES (apply to every wave, every release)

- **Property is untouchable.** `Property/**` READ-ONLY; no Property deploys; never edit `Property/web/src/app/api/leads/**`, `lib/lead-routing.ts`, pg_net triggers, Property Vercel env. `git diff baseline -- Property/` empty is a gate.
- **`packages/web-shared` is additive-only and manager-direct.** No worker edits. A wave should need ZERO web-shared edits (the factory already exists). If touched: full web-shared + Property battery + 9-app build sweep before any deploy.
- **Storage prefixes are FROZEN** (ptp/hd/dfp/ma/afl/aff/cfp/bfp). Every new storage/session key is `<prefix>_…`; grid keys `<prefix>:grid:*`.
- **No em-dashes** in any user-facing copy (commas, parentheses, full stops, middle dots).
- **No DJH** on any non-Property site (visible copy, JSON-LD, assistant, resource gate). Lead post-processing is the ONLY permanent Property difference: non-Property leads → owner inbox + Reflex CC, no nurture/handover.
- **Lighter qualified form:** role + niche qualifiers + name/email/phone mandatory, message optional (≥10 chars when present), consent checkbox kept. NOT Property's 7-field form. Qualifiers fold into the global `leads` schema as optional fields; overflow to `extras`.
- **Personalisation default-ON; NO experiments.** Strip experiment-assign blocks; conclude any running A/B to its winning arm (WS7 already done estate-wide; construction-cis + console changes take effect at their next gated deploys). Infra kept, 0 running.
- **Newsletter surfaces RETIRED** on non-Property sites (generalist exit modal already retired; agency has a full retirement WP incl. an armed cron to disarm).
- **Resource consent is in-house-only** (`resourceConsentText`, never the partner text) + **`extras.resource_gate` on the insert** (the prod notify/enrich skip trigger is LIVE via migration `20260706000001`; apply to each site's prod with individual owner sign-off before R3 ships there).
- **`LEAD_PROBE_SECRET` is set per site at deploy time** (root `.env` + the site's Vercel project) so the once-per-site live-form probe rewrites to `source='test'` with no CC and no enrichment.

---

## RESUME POINTER

Wave 1 shipped R1/R2/R3 (generalist + Solicitors) live and verified. Waves 2-5 are pending as instantiations of this template. Start at Dentists R1; re-query live traffic at the wave gate; follow §2 checklists, §3 gates, §4 QA, §5 lessons, §6 per-site inputs, §7 rules. Detail and current position live in `docs/_engines/CRO_PARITY_PROGRAM.md`.
