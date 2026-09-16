# Report 07 — Analytics, experiments and dashboard wiring

Written 2026-08-22. Scope: what the Property redesign port must preserve so the estate
console dashboard does not go dark.

**Method.** Every claim below is VERIFIED by reading the file or running the grep, unless
tagged INFERRED. No production queries were run, nothing was deployed, nothing outside
`tmp/design_migration/` was edited. Snapshot base = `8041183`, designer work = `eb745e1`,
monorepo compared at `HEAD` (`d39b393a`).

---

## 0. Bottom line

Three things can break, in order of severity.

1. **HARD FLAG — Microsoft Clarity comes back if you port `layout.tsx` wholesale.**
   The designer's `layout.tsx:117-119` still passes `clarityProjectId={process.env.NEXT_PUBLIC_CLARITY_ID}`
   to `ConsentedScripts`. The monorepo deleted that prop (`Property/web/src/app/layout.tsx:100`
   passes `gaMeasurementId` only). Clarity was killed under a LOCKED PECR decision
   (memory `clarity_removed_pecr_decision`: "never add disclosures to sites lacking them").
   Porting their layout re-adds a third-party session recorder. It would also fail typecheck
   (`packages/web-shared/analytics/react/ConsentedScripts.tsx:16-18` has no `clarityProjectId`
   in its props type), so the build catches it, but do not "fix" it by re-adding the prop.

2. **Four `data-cta` values die silently if the designer's files win.** They are all
   monorepo additions the designer never saw, so nothing in their diff "removes" them,
   but they vanish with the file. All four are live series in `vw_cta_performance`.

3. **`section_view` continuity is DOM-shaped, not tag-shaped.** `autoCapture` derives
   `section_id` from `h2[id]` and `placement` from the nearest `[data-section]` or the
   nearest section's first heading text. The redesign rewrites every page's headings and
   wrappers. Section series will re-key wholesale on redesigned pages.

Everything else (consent, experiments, sitemap, page titles, ingest) is safe or is a
non-issue, with receipts below.

---

## 1. The pipeline, end to end (VERIFIED)

| Stage | File | What it does |
|---|---|---|
| Init | `packages/web-shared/analytics/init.ts:47-54` | `initAnalytics()` stores siteKey, siteName, `storagePrefix`, posture, `noTrackPrefixes`, `deriveTopic`. Read by every other module via `getSdkConfig()`. |
| Site wiring | `Property/web/src/components/analytics/AnalyticsProvider.tsx:21-33` | Property wrapper. `storagePrefix="ptp"` (FROZEN), `posture="opt-out"`, `noTrackPrefixes=["/embed","/admin"]`, injects `deriveTopic`. **Byte-identical to the designer's copy** (verified by `diff`). |
| Root mount | `Property/web/src/app/layout.tsx:95-110` | `ConsentProvider` > `AnalyticsProvider` > `ConsentedScripts` + `IntentProvider` > `PageShell` + `ReturningBar` + `DeepScrollModal` + `SpecialistWidget`. |
| Consent (React) | `packages/web-shared/analytics/react/ConsentProvider.tsx:43-70` | Holds state, syncs with `consent.ts`. On a no-track prefix it returns bare children (no context) — so `/embed` and `/admin` are fully dark. |
| Consent (source of truth) | `packages/web-shared/analytics/consent.ts:28-90` | Key = `${storagePrefix}_consent` = `ptp_consent`. `isTrackingAllowed()` (`:61-65`) returns `read() !== "denied"` under opt-out. Never reads a fallback key pre-config. |
| Identity | `packages/web-shared/analytics/ids.ts:100-140` | `ptp_vid` (localStorage, persistent), `ptp_sid` + `ptp_sid_ts` (sessionStorage, 30-min idle roll). Returns `""` pre-config so an experiment can never bind to a throwaway id. |
| Auto-capture | `packages/web-shared/analytics/autoCapture.ts:216-243` | Installed once by the provider when `granted`. Delegated listeners: click (capture phase), scroll, pointermove/keydown/touchstart, visibilitychange, pagehide, error, unhandledrejection, plus a 5s engagement interval. |
| Emit | `packages/web-shared/analytics/track.ts:98-146` | Consent gate (`:100`), pre-config buffer with per-`calculator_slug` dedupe (`:101-117`), envelope stamp incl. `consent_state` and `props.exp` from `activeExperimentString()` (`:120,132`), PII scrub (`scrubProps`, `:76-84`). |
| Bus | `packages/web-shared/analytics/bus.ts:32-43` | Synchronous fan-out to in-app subscribers (journey model, proactive assistant), fed **after** the consent gate, each listener try/caught. |
| Transport | `track.ts:154-193` | Batch of ≤40, flush at 12 events / 4s / tab-hide. `navigator.sendBeacon('/api/track')` with `fetch keepalive` fallback. Same-origin (ad-blocker resistant). |
| Route | `Property/web/src/app/api/track/route.ts` | `runtime="nodejs"`, `maxDuration=10`, `dynamic="force-dynamic"`; delegates to the shared factory with `siteKey` from `niche.config.json`. Always 204. |
| Server handler | `packages/web-shared/analytics/server/createTrackHandler.ts:68` | Rejects any name not in `EVENT_NAMES` (`isKnownEvent`). `:73` blanks props over 4096 bytes. `:119` flips `human_confirmed` on the first `INTERACTION_EVENTS` member. `:156` sets `is_bot` from the UA heuristic (`server/bots.ts`). `:172` single RPC `POST /rest/v1/rpc/ingest_web_events`. |
| Tables | `supabase/migrations/20260605000001_create_web_analytics_tables.sql` | `web_events` (+ `props` jsonb), `web_sessions`. Every dashboard view filters `is_bot = false`. |
| Taxonomy | `packages/web-shared/analytics/types.ts:13-54` | 38 allowlisted event names. **Adding a name requires editing this file, or the server drops the event.** |
| In-view helper | `packages/web-shared/analytics/useInViewOnce.ts:20-58` | Callback ref (not effect+ref), so a surface that mounts after variant resolution still records exposure. |
| Web vitals | `packages/web-shared/analytics/react/WebVitals.tsx:23-45` | Mounted only when `granted` (`AnalyticsProvider.tsx:134`). Emits `web_vital` for LCP/INP/CLS/FCP/TTFB, CLS ×1000. |
| Visit memory | `packages/web-shared/analytics/visitMemory.ts` | `bumpVisits`, `isReturning`, `recordEntryTopic`, `recordTopicVisit` — feeds `visit_class`, `entry_topic`, `page_topic` on `page_view`. |
| Form tracking | `packages/web-shared/analytics/react/useFormTracking.ts`, re-exported by `Property/web/src/components/analytics/useFormTracking.ts` (4-line shim) | `form_start`/`form_field_focus`/`form_field_abandon`/`form_submit`/`form_error`/`form_step_*`/`lead_submitted`, keyed by `form_id`. |

`page_view` props are built at `AnalyticsProvider.tsx:48-71`: `page_title` (see §8), referrer,
five UTM fields, `device_type`, viewport, `is_entry`, plus `page_topic` / `entry_topic` /
`visit_class` (`:121-128`).

---

## 2. THE `data-cta` TAXONOMY DIFF (the main output)

Extraction method (VERIFIED, reproducible):
`grep -rn 'data-cta="' <src>` for statics and `grep -rn 'data-cta={'` for dynamics, on
`Property/web/src` and `tmp/design_migration/Property_zip/web/src`, plus
`git grep 'data-cta' 8041183` for the snapshot baseline.

No other analytics `data-*` attributes exist on either side beyond the four `autoCapture`
reads (`data-cta`, `data-cta-goal`, `data-cta-placement`, `data-track`, `data-section`,
`data-clickable`). `data-section`, `data-track` and `data-clickable` are used **nowhere**
on either side (VERIFIED — zero hits). One inert extra exists: `data-cta-variant` at
`Property/web/src/app/page.tsx:331`, which `autoCapture` never reads.

### 2.1 Monorepo — complete list

| `data-cta` | Component | Route(s) |
|---|---|---|
| `hero_book` | `app/page.tsx:331` | `/` |
| `hero_calculators` | `app/page.tsx:334` | `/` |
| `home_cta_primary` | `app/page.tsx:~685` | `/` |
| `home_cta_secondary` | `app/page.tsx:~696` | `/` |
| `header_contact` | `components/layout/SiteHeader.tsx:187` | site-wide |
| `header_book` | `components/layout/SiteHeader.tsx:203` | site-wide |
| `header_book_mobile` | `components/layout/SiteHeader.tsx:322` | site-wide (mobile menu) |
| `sticky_cta` | `components/ui/StickyCTA.tsx` (~:100) | site-wide |
| `sticky_cta_close` | `components/ui/StickyCTA.tsx:113` | site-wide |
| `deep_scroll_modal` | `components/intent/DeepScrollModal.tsx:~106` | site-wide |
| `deep_scroll_close` | `components/intent/DeepScrollModal.tsx` | site-wide |
| `returning_bar` | `components/intent/ReturningBar.tsx:~47` | site-wide |
| `returning_bar_close` | `components/intent/ReturningBar.tsx` | site-wide |
| `specialist_widget` | `components/support/SpecialistWidget.tsx` | site-wide |
| `contact_pricing_link` | `app/contact/page.tsx:69-70` | `/contact` |
| `thankyou-return-article` | `app/thank-you/page.tsx:172` | `/thank-you` |
| `see_result` | `components/calculators/premium/PremiumCalculator.tsx:647` | every premium calculator |
| `calc_result_${campaign}` (dynamic) | `components/calculators/PageResultCta.tsx:15` | calculator pages |

Not `data-cta` but emitted as `cta_id` on a manual `track("cta_click", ...)` — same series,
same view, must survive too:

- `assistant_calculator` / `assistant_question` / `assistant_call` — `SpecialistWidget.tsx:339`, `placement="assistant_card"`.
- `result_gate_skip` — `packages/web-shared/leads/ResultGateModal.tsx:32`, `placement="result_gate"`.

### 2.2 Designer snapshot baseline (`8041183`, 13 statics + 1 dynamic)

`deep_scroll_close`, `deep_scroll_modal`, `header_book`, `header_book_mobile`, `hero_book`,
`hero_calculators`, `returning_bar`, `returning_bar_close`, `see_result`, `specialist_widget`,
`sticky_cta`, `sticky_cta_close`, `thankyou-return-article`, `calc_result_${campaign}`.

This matters: it proves the four values in §2.3 are **monorepo additions since 17 July**,
not designer deletions. The designer removed nothing they had.

### 2.3 DROPPED — series that go dark if the designer's file wins (4)

| `data-cta` | Lost from | Why it matters |
|---|---|---|
| `header_contact` | `SiteHeader.tsx:187` — absent from designer's `SiteHeader.tsx` (only `header_book` at `:206` and `header_book_mobile` at `:343`) | Site-wide header secondary CTA. A live row in `vw_cta_performance`. |
| `home_cta_primary` | `app/page.tsx` — designer's homepage has no closing CTA block with these ids | Homepage closing CTA pair. |
| `home_cta_secondary` | same | same |
| `contact_pricing_link` | `app/contact/page.tsx:69-70` — designer's `/contact` has no `data-cta` at all | Only instrumented CTA on `/contact`, and the only one carrying `data-cta-goal="pricing"` on that route. |

**Not dropped, despite appearances:** `see_result` survives. The designer refactored it
through a prop — `premium/PremiumCalculator.tsx:650` passes `dataCta="see_result"` into
`calculators/HeldResult.tsx:81` (`data-cta={dataCta}`). Same emitted value. VERIFIED.

### 2.4 RENAMED — zero true renames, but two near-collisions and one aggregation hazard

**No `data-cta` value on either side is a rename of another.** That is the good news.

Three naming problems to settle before the port:

1. **`hero_calculator` (singular)** at designer `app/incorporation/page.tsx` sits alongside
   `hero_calculators` (plural) on five other pages. Almost certainly a slip. Two adjacent
   series in `vw_cta_performance` that a human will misread. **Normalise to plural.**
2. **`calc_see_result`** at designer `components/calculators/ResultGate.tsx:64` duplicates
   the meaning of the existing `see_result`. `ResultGate.tsx` is designer-new (no monorepo
   equivalent). Decide one name; two names for "pressed the reveal button" fragments the
   only conversion diagnostic on the gate.
3. **`hero_book` aggregation.** In the monorepo `hero_book` fires on `/` only. In the
   designer's build it fires on **ten** routes (`/`, `/incorporation`, `/landlord-tax`,
   `/making-tax-digital-landlords`, `/section-24`, `/property-tax-rates`,
   `/research/landlord-tax-index`, and all four `/services/*`). `vw_cta_performance` groups
   by `(site_key, country, cta_id)` and **not** by `page_path`
   (`supabase/migrations/20260608000002_cta_friction_and_timeseries_geo.sql:30`), so the
   historical homepage-only `hero_book` series silently becomes a ten-page blend at the
   moment of deploy. Same for `hero_calculators` (1 → 5 routes) and `triggers_book` (5 routes).
   This is the closest thing to a "silent series break" in the whole diff. Either scope the
   ids per page (`landlord_tax_hero_book`) or accept the blend and annotate the date.

### 2.5 ADDED — 32 new statics + 6 new dynamic families

Statics: `about_hero_book`, `agents_book`, `blog_calculators_all`, `blog_hero_book`,
`blog_hero_guides`, `blog_hub_all_articles`, `blog_sidebar_book`, `blog_skip_to_form`,
`calculators_book`, `case_book`, `cgt_deadline_book`, `clients_book`, `deliverables_book`,
`difference_book`, `disposals_book`, `embed_footer_partnership`, `embed_hero_partnership`,
`fees_book`, `hero_calculator`, `included_book`, `incorporations_book`, `penalties_book`,
`predeparture_book`, `premium_tool_mobile`, `problem_book`, `prompts_book`, `routes_book`,
`section24_book`, `services_hero_book`, `software_book`, `triggers_book`, `worked_example_book`.

Dynamic families: `blog_calc_${tool.slug}` (`app/blog/page.tsx:270`),
`services_calc_${key}` (`app/services/page.tsx:235`), `services_client_${key}` (`:310`),
`blog_hub_${categorySlug}_book` / `blog_hub_${categorySlug}_articles` /
`blog_hub_topic_${topic.slug}` (`components/blog/BlogCategoryHub.tsx:113,122,207`).

Plus manual `cta_id`s from designer-new `ResultGate.tsx`: `calc_see_result`, `calc_confirm_figure`.

Review notes on the additions:

- **This is a genuine upside, not just risk.** Our eight wave-built pages
  (`/landlord-tax`, `/section-24`, `/making-tax-digital-landlords`, the four `/services/*`,
  `/incorporation`) currently carry **zero** `data-cta` (VERIFIED — they do not appear in
  the monorepo grep). The designer instrumented all of them. Port the instrumentation
  even where we keep our content.
- **`embed_hero_partnership` / `embed_footer_partnership` are almost certainly dead on
  arrival.** `/embed` is in `noTrackPrefixes` (`AnalyticsProvider.tsx:79`,
  `Property/web/src/components/analytics/AnalyticsProvider.tsx:28`), and
  `ConsentProvider.tsx:64` returns bare children on a no-track prefix, so `autoCapture` is
  never installed there. INFERRED (not runtime-confirmed): these two will emit nothing.
  Either drop them or move `/embed`'s marketing page off the no-track prefix, which is a
  separate decision.
- `blog_hub_${categorySlug}_*` across nine hubs mints ~18-27 new `cta_id` rows.
  `vw_cta_performance` has no cardinality cap; the console table
  (`console/web/src/app/site/[siteKey]/page.tsx:358-359`) renders whatever comes back.
  Acceptable, but the CTA table becomes long. Consider whether the hub id should carry the
  category in `data-cta-placement` instead, keeping `cta_id` at `blog_hub_book`.

### 2.6 `data-cta-goal` semantics change (worth a decision)

The monorepo computes `goal` from the live niche CTA mode, e.g.
`app/page.tsx:687` `data-cta-goal={activeCta.home_cta.primary.href.startsWith("/contact") ? "form" : "pricing"}`,
same pattern at `SiteHeader.tsx:189,205,324` and `StickyCTA.tsx:104`.
The designer hardcodes `data-cta-goal="form"` and hardcodes `href="/contact"`
(`Property_zip/web/src/app/page.tsx:292`).

`goal` is a real column in `vw_cta_performance`
(`20260608000002_cta_friction_and_timeseries_geo.sql:60`). If `packagesMode` is ever
switched on, the designer's hardcoding mislabels every pricing CTA as a form CTA.
**Re-apply our `activeCta` / `niche.cta` wiring on top of their markup.**

---

## 3. What the dashboard actually reads by name (HARD constraints)

Console entry points: `console/web/src/app/site/[siteKey]/page.tsx` and
`.../visitor/[visitorId]/page.tsx`. All data access is through
`packages/web-shared/console/adminData.ts`.

**Verified: no SQL view and no console component hardcodes a `cta_id` or a `section_id`.**
`vw_cta_performance` (`20260608000002...:23,29-30`) does
`e.props->>'cta_id' ... WHERE event_name = 'cta_click' AND props ? 'cta_id'` and groups
dynamically. `vw_section_action` (`20260608000003_dashboard_trackers.sql:89-97`) does the
same on `section_id`. So dropping a value **never errors** — the row just stops appearing,
which is exactly why the diff in §2.3 is dangerous rather than loud.

### Hard by-name dependencies (these DO break loudly or silently-and-permanently)

| Name | Depended on by | Kind |
|---|---|---|
| `form_id = "calc_result_gate"` | `packages/web-shared/console/adminData.ts:512` — `form_id: "eq.calc_result_gate"` literal | **Hardcoded string filter.** Rename it and `getResultGateLeads()` returns null for ever. Designer preserves it (`Property_zip/.../ResultGateModal.tsx:80`). Keep. |
| `event_name` allowlist (38 names) | `createTrackHandler.ts:68` via `types.ts:13-54`; every `vw_*` view filters on literal event names | Off-list names are dropped server-side. The redesign adds **no** new event name (VERIFIED). Do not let one in during the port. |
| `props.exp` format `key:variant` | `vw_experiment_results`, `vw_experiment_funnel`, `20260608000004_experiment_results_unnest.sql` | Format contract; unchanged. |
| `props.surface` | `vw_personalization_results` (`20260606000002_personalization_view.sql:12`) | Values come from the `Surface` union — see §5. |
| `props.placement` | `vw_calculator_conversion_placement_geo` (`20260607000001...:24`), `vw_cta_performance` | `"blog"` vs calculator-page placement drives the gate logic and the view. |
| `props.calculator_slug` | `vw_calculator_conversion*` | From the calculator registry, not the design. Safe. |
| `props.section_id` / `section_text` | `vw_section_action`, `vw_section_engagement` | Derived from `h2[id]`. See §4. |
| `props.field` + `props.form_id` | `vw_form_field_dropoff_geo` (`20260608000001...:184,198`) | Field names on `LeadForm` / `MiniCapture`. Any field rename re-keys the drop-off table. |
| RPCs `web_timeseries`, `estate_kpis`, `web_event_daily` | `adminData.ts:686,716,744` | Session/event-level, not name-level. Unaffected by the redesign. |

Also present as by-name references in *docs and scripts*, not code paths:
`docs/property/EVALUATION_2026-08-13.md:205-217` tabulates `hero_book`, `header_book`,
`specialist_widget`, `deep_scroll_close`, `calc_result_gate`;
`docs/property/BEHAVIOUR_INSIGHTS_2026-07.md:120` the same; `scripts/_behaviour_deep_batch2.py:112-113`
aggregates by `cta_id`; `scripts/score_unscored_leads.py:96` lists `calc_result_gate`,
`specialist_widget`, `mobile_tool`, `resource_block` as `form_id`/role literals. Renaming any
of those makes historical reports non-comparable but breaks nothing at runtime.

---

## 4. autoCapture: what changes when the DOM changes

`autoCapture` tags nothing by hand. Everything below is derived from live DOM, which is
exactly what a redesign rewrites. VERIFIED from `autoCapture.ts`.

| Behaviour | Source | Redesign impact |
|---|---|---|
| `cta_click` | `:96-105` — `target.closest("[data-cta]")`; `cta_id`, `cta_label = nearestText`, `placement = data-cta-placement ?? nearestSection`, `goal` | `cta_label` is the button's visible text, capped at 60 chars. **The designer rewrote most CTA copy**, so `cta_label` changes on nearly every surviving `cta_id`. Harmless for counting, confusing for anyone reading the table. |
| fallback `placement` | `:101` | When `data-cta-placement` is absent, placement falls back to `nearestSection()` — i.e. the enclosing section's first `h2`/`h3` **text**. Redesigned section headings silently re-key `placement`. Fix: put `data-cta-placement` on every ported CTA (the designer mostly does). |
| `element_click` | `:130-141, 148-157` — `selector = cssSelector(el)` | `cssSelector` (`:26-35`) = `tag#id.FIRSTCLASS`. The first class of every element. **The designer's new class-naming convention (`CLASS_NAMING_CONVENTIONS.md`) changes the first Tailwind/utility class on essentially every element.** Every `element_click.selector` value in `vw_ux_friction` and the visitor journey re-keys at deploy. Unavoidable; annotate the date. |
| `dead_click` | `:159-168` via `looksClickable` (`:196-208`, walks 3 ancestors for `cursor:pointer`) | New hover/glow treatments that set `cursor:pointer` on non-interactive wrappers (`ScrollGlowGroup`, `StatsCounter` cards) will manufacture `dead_click` noise. Concrete risk: check the designer's card components for `cursor-pointer` on non-links. |
| `rage_click` | `:170-194` | Unchanged semantics; `selector` re-keys as above. |
| `section_view` | `:212-253` — observes **`document.querySelectorAll("h2[id]")`**, requires ≥50% visible for 2s | **The single biggest structural dependency.** If a redesigned page renders `h2` without `id`, that page emits **zero** `section_view`, and `vw_section_action` loses the page entirely. Currently `h2[id]` on Property comes almost entirely from `BlogPostRenderer` (3 fixed ids: `enquiry-form-heading`, `faq-heading`, `related-heading`) plus `PremiumUpgrade`. Both sides have the same four (VERIFIED by grep count and by reading the ids). Marketing pages on **both** sides largely lack `h2[id]` — so this is a pre-existing gap, not a regression. Opportunity: adding `id` to the designer's new section headings would light up `vw_section_action` for the first time on non-blog pages. |
| `scroll_depth` | `:257-274` — milestones 25/50/75/90/100 of `document.scrollHeight` | The redesign makes pages substantially longer. Milestones are percentage-based, so 50% now means a different amount of content. **`scroll_depth` is comparable in shape but not in meaning across the deploy boundary.** The intent engine reads `getMaxScrollPct()` (`:311`) and `DeepScrollModal` triggers off it, so a longer page also moves *when* the modal fires. |
| `engagement_time` | `:278-307` — first real input flips `humanSeen`, emits every 15s engaged, 30s idle cut | Unaffected by DOM. |
| `client_error` | `:311-322` | Unaffected. |
| `contact_click` / `outbound_click` | `:113-129` | `tel:`/`mailto:` hashed (`:53-57`), external host by URL. Only changes if the footer/header link set changes. The designer's footer adds an outbound link to `doublewiredcreative.com` (per `DESIGN_GUIDELINES.md` §1.1, still an owner decision) — that would create a new `outbound_click.target_host` series. |

---

## 5. Experiments layer

**VERIFIED: zero experiments are running for Property.** All seven entries in
`packages/web-shared/experiments/registries/property.ts:24-77` carry `status: "off"`:
`personalization`, `calc_result_capture`, `exit_intent_offer`, `gate_to_form`,
`mobile_tool_capture`, `lead_form_length`, `result_gate_capture`. `docs/Property/EXPERIMENTS_LIFECYCLE.md`
§"Current state (2026-06-30)" says the same, and it is correct against the registry.

Mechanics: `makeUseExperiment` (`packages/web-shared/experiments/react/useExperiment.ts:45-58`)
filters `status === "running"` before assigning; `assignVariant`
(`packages/web-shared/experiments/assign.ts:39-51`) returns `null` for a null/off experiment.
So no arm is registered, `activeExperimentString()` returns nothing, and no event carries
`props.exp`. The console Experiments tab renders history only.

**Therefore the redesign cannot break a live experiment.** No surface it removes is under test.

Two consequences for the port:

- The `assign.ts` continuity contract (djb2, `>>> 0`, declaration-order bucketing, pinned in
  `assign.test.ts`) is SACRED but untouched by both sides. Leave it alone.
- Instrumentation shims must survive even though nothing uses them, per
  `EXPERIMENTS_LIFECYCLE.md` step 3 and the shared brief convention. Monorepo keeps them at
  `Property/web/src/lib/experiments/{active,assign,exposure}.ts` and
  `components/experiments/useExperiment.ts`; the designer has the identical files. Port is a
  no-op here.
- The designer's `MiniCapture.tsx:69,104,147,157` still carries local `experimentKey` /
  `exposeOnView` wiring with a local `useInViewOnce`. The monorepo moved `MiniCapture` to
  `packages/web-shared/leads/MiniCapture.tsx` and reduced the Property file to a wrapper
  passing `onExperimentView`/`onExperimentAction` (`Property/web/src/components/forms/MiniCapture.tsx:15,38-39`).
  **Ours wins. Do not port their `MiniCapture`.** (This is the 739-line deletion recorded in
  CONTEXT §4.)

---

## 6. Consent — the designer's `ConsentBanner` change is CLEAN

VERIFIED by full diff of `web/src/components/analytics/` between `8041183` and `eb745e1`.
The entire change is:

```
- className="rounded-lg border-2 border-slate-300 ...">   Decline
+ className="rounded-xl border-2 border-slate-300 ...">   Decline
- className="rounded-lg bg-emerald-600 ...">              Accept
+ className="rounded-xl bg-emerald-600 ...">              Accept
```

Four lines, two of them the `-` side. **`rounded-lg` → `rounded-xl` on two buttons. Nothing
else.** No copy change, no new link, no new disclosure, no behaviour change, no posture
change. **No compliance flag.**

Additional confirmations:

- Property is `posture="opt-out"` (`Property/web/src/components/analytics/AnalyticsProvider.tsx:27`),
  and `ConsentBanner` is mounted **nowhere** on Property on either side. It is dead code on
  this site; the component only mounts on opt-in sites.
- Consent posture, storage key (`ptp_consent`), the "Do not track me" footer control and the
  legitimate-interest `consent_state` stamping (`track.ts:131`) are all unchanged.

**The real consent flag is not the banner — it is Clarity in `layout.tsx`. See §0 item 1.**

---

## 7. Component-level instrumentation: who carries what

| Component | Monorepo | Designer | Verdict |
|---|---|---|---|
| `DeepScrollModal` | `data-cta="deep_scroll_modal"` / `deep_scroll_close`, `data-cta-goal` computed at `:108`, `trackPersonalization` ×5 | Same, only `rounded-lg`→`rounded-xl` ×3 (VERIFIED diff) | Safe. Take their radii, keep our file. Note `EVALUATION_2026-08-13.md:214`: 499 dismissals vs 10 clicks — this modal is on the owner's list, do not quietly re-tune its threshold during the port. |
| `ReturningBar` | `returning_bar` / `returning_bar_close`, `data-cta-goal` at `:49`, `trackPersonalization` ×4 | Identical | Safe. |
| `StickyCTA` | `sticky_cta` / `sticky_cta_close`, `data-cta-placement="sticky"`, `data-cta-goal` at `:104`, `trackPersonalization` ×3 | Same ids; two class tweaks (`border-emerald-800` dropped, `rounded-lg`→`rounded-xl`) | Safe. |
| `SpecialistWidget` | `data-cta="specialist_widget"`, `track("cta_click", {cta_id: "assistant_<goal>", placement:"assistant_card"})` at `:339`, `personalization_shown` ×2, `support_opened` ×2, `useFormTracking("specialist_widget", {flow})` at `:85` | All instrumentation identical. Their change is cosmetic (`next/image` avatar, radii) | Safe. Separately, CONTEXT §6.4 flags an undiagnosed failure mode here — out of scope for this brief. |
| `PremiumCalculator` | `useInViewOnce` at `:498` firing `calc_view`; `calc_input_change` `:509`, `calc_result_viewed` `:512`, `calc_computed` `:516`; `data-cta="see_result"` `:647`; `data-cta-goal="form"` `:659` | Same event set at `:502` etc.; `see_result` moved to a `dataCta` prop on their new `HeldResult.tsx` | Safe, but the `HeldResult` refactor must carry `dataCta` through or `see_result` dies. |
| `ResultGateModal` | Ours is the shared `packages/web-shared/leads/ResultGateModal.tsx` — `result_gate_skip` at `:32`, `formId="calc_result_gate"` at `:77` | Theirs is a local copy with the same two literals | **Ours wins** (shared, and `adminData.ts:512` depends on the form id). |
| `LeadForm` | `useFormTracking("lead_form")` at `:44` | Same | Safe. Field *names* are the drop-off table's key — do not rename fields during a visual port. |
| `GateOrForm` | `formId="resource_block"` at `:21` | Designer has `ResourceGate.tsx` instead (5 track calls) — a component we deleted | Ours wins; their `ResourceGate` is on the CONTEXT §7 dead-components list. |
| `InlineMiniLeadForm` | `formId="inline_mini"` at `:14` | — | Preserve. |
| `StatsCounter` | does not exist | `components/property/StatsCounter.tsx` — IntersectionObserver at `:59-63` for a **count-up animation only**, no `track()`, no `data-cta` | **Carries zero instrumentation.** If the owner wants stats-block engagement measured, it needs adding (new work, not a port). |
| `ScrollGlowGroup` | does not exist | `components/property/ScrollGlowGroup.tsx` — IntersectionObserver at `:54-62`, visual reveal only | Same: no instrumentation. Watch it for `cursor:pointer` on non-interactive wrappers (see §4 `dead_click`). |
| `ResultGate` | does not exist | `components/calculators/ResultGate.tsx:64,77` — `calc_see_result`, `calc_confirm_figure` | New ids; settle the naming collision with `see_result` (§2.4). |

Personalisation `surface` values are fixed by the `Surface` union
(`Property/web/src/lib/intent/engine.ts:15-20`): `hero_cta`, `sticky_cta`, `next_step`,
`deep_scroll_modal`, `returning_bar`. **The designer's union is byte-identical** (VERIFIED).
`vw_personalization_results` keeps working.

`deriveTopic.ts` and `session.ts` are identical modulo CRLF (VERIFIED with `diff --strip-trailing-cr`).
`taxonomy.ts` is **not**: the monorepo added two topics the designer never had —
`landlord-compliance` and `leasehold` (`Property/web/src/lib/intent/taxonomy.ts`, absent from
theirs). Porting their `taxonomy.ts` would delete two live `page_topic` / `entry_topic`
values. **Ours wins.**

---

## 8. GA4 / GSC / Bing continuity

- **Canonical URLs / metadata template.** `Property/web/src/app/layout.tsx:31-63` sets
  `metadataBase`, `title.template = "%s | ${siteConfig.name}"`, canonical + `en-GB`/`x-default`
  alternates, OG/Twitter. **The designer's `layout.tsx` metadata block is unchanged from the
  snapshot** — their only `layout.tsx` edits are the `<noscript>` animation-fallback style
  block and `<PageShell nav={buildPrimaryNav()}>` (VERIFIED, full diff read). No canonical
  change, no template change.
- **GA4 `page_title`.** GA4 gets the raw `document.title`. Our first-party `page_view.page_title`
  is the site-suffix-stripped version (`AnalyticsProvider.tsx:38-46`). Both are driven by
  per-page `metadata.title`, which is a *content* concern on the eight forked pages, not a
  design one. **Any page where the designer's `metadata.title` differs from ours re-keys that
  page's GA4 title dimension.** Not audited page-by-page here; flag it for the per-page
  reconciliation briefs.
- **Sitemap.** `Property/web/src/app/sitemap.ts:9-35` is a strict **superset** of the
  designer's: theirs adds seven static paths, all of which we already have, and we
  additionally carry `/landlord-compliance`, `/leasehold`, `/landed-estates`,
  `/cost-of-selling-a-property`, `/for-letting-agents`. **Ours wins outright.**
  One concrete regression in theirs: our post loop skips `post.noindex`
  (`sitemap.ts:~92`, `if (post.noindex) continue;`); **theirs does not** — it would submit
  noindexed posts to the sitemap. Do not port their `sitemap.ts`.
- **Bing / GSC.** Nothing in the redesign changes routes, redirects or `robots`. The one
  routing item is the CONTEXT §6.3 middleware shadowing bug, which is a separate brief.
- `SpeedInsights` (`layout.tsx:112`) present and identical on both sides.

---

## 9. ANALYTICS PRESERVATION CHECKLIST

Run every check on a local build (`npm run build && npm start`), never against production.
"Verify" = load the page, open DevTools, confirm the stated thing. Nothing here requires a
paid API call or a production query.

### A. Must survive verbatim (blocking)

| # | Item | Verify after porting |
|---|---|---|
| A1 | `layout.tsx` passes `gaMeasurementId` **only** — no `clarityProjectId` | `grep -rn "clarity" Property/web/src` returns nothing. `npm run build` typechecks. |
| A2 | `AnalyticsProvider` props: `storagePrefix="ptp"`, `posture="opt-out"`, `noTrackPrefixes=["/embed","/admin"]`, `deriveTopic` | Load `/`, DevTools > Application > Local Storage: `ptp_vid` and `ptp_sid` present. |
| A3 | No `ConsentBanner` mounted on Property; no new disclosure text anywhere | `grep -rn "ConsentBanner" Property/web/src` → no mount. Diff footer copy vs current live. |
| A4 | `data-cta="header_contact"` on the header secondary CTA | View source on `/`, search `header_contact`. |
| A5 | `data-cta="home_cta_primary"` and `home_cta_secondary` on the homepage closing block | View source on `/`. |
| A6 | `data-cta="contact_pricing_link"` + `data-cta-goal="pricing"` on `/contact` | View source on `/contact`. |
| A7 | `data-cta="see_result"` still reaches the DOM through `HeldResult`'s `dataCta` prop | Load an in-blog premium calculator, inspect the reveal button. |
| A8 | `formId="calc_result_gate"` and `cta_id="result_gate_skip"` unchanged, from the **shared** `packages/web-shared/leads/ResultGateModal.tsx` | Open the gate, dismiss it, confirm one `cta_click` with `cta_id=result_gate_skip` in the `/api/track` payload. |
| A9 | `form_id` set unchanged: `lead_form`, `inline_mini`, `resource_block`, `specialist_widget`, `calc_result_gate` | `grep -rn 'formId=\|useFormTracking(' Property/web/src` matches the five. |
| A10 | `LeadForm` / `MiniCapture` **field names** unchanged (they key `vw_form_field_dropoff_geo`) | Diff the field `name=` attributes before/after. |
| A11 | Intent `Surface` union unchanged (5 values) and `taxonomy.ts` keeps `landlord-compliance` + `leasehold` | `grep -n "landlord-compliance\|leasehold" Property/web/src/lib/intent/taxonomy.ts`. |
| A12 | `EVENT_NAMES` in `packages/web-shared/analytics/types.ts` **unchanged** — no new event name introduced by the port | `git diff` on that file is empty. If a ported component calls `track()` with a new name, the server drops it silently. |
| A13 | `sitemap.ts` stays ours, including `if (post.noindex) continue` | `curl localhost:3000/sitemap.xml`, confirm the five monorepo-only paths present and a known noindex post absent. |
| A14 | `assign.ts` / `assign.test.ts` untouched | `npm test` — the golden continuity suite is green and asserts 0 running experiments. |

### B. Must be decided before the port (owner / plan)

| # | Decision |
|---|---|
| B1 | `hero_book` scoping: accept the 1→10 route blend in `vw_cta_performance`, or scope per page. Recommendation: **accept and annotate the deploy date**, because per-page ids also break the existing homepage series. |
| B2 | `hero_calculator` (singular) → normalise to `hero_calculators`. |
| B3 | `calc_see_result` vs existing `see_result` — pick one. Recommendation: keep `see_result`, drop `calc_see_result`. |
| B4 | `embed_hero_partnership` / `embed_footer_partnership`: drop them, or take `/embed`'s marketing page out of `noTrackPrefixes`. Recommendation: **drop**, they cannot fire. |
| B5 | `data-cta-goal`: re-apply our `activeCta` / `niche.cta` conditional over their hardcoded `"form"`. Recommendation: **re-apply ours.** |
| B6 | `blog_hub_${categorySlug}_*` cardinality: keep as-is, or move the category into `data-cta-placement`. |
| B7 | Add `id` to the designer's new section `h2`s to light up `vw_section_action` on marketing pages for the first time. Net-new capability, cheap while the markup is being rewritten. |
| B8 | Footer credit link to `doublewiredcreative.com` (CONTEXT §7) creates a new `outbound_click.target_host` series. Cosmetic, but it will show up in the dashboard. |

### C. Accept and annotate (unavoidable re-keying)

| # | Item | Why unavoidable |
|---|---|---|
| C1 | `element_click.selector`, `dead_click.selector`, `rage_click.selector` all re-key | `cssSelector()` uses the element's first class name; the redesign changes it everywhere. |
| C2 | `cta_click.cta_label` re-keys on surviving `cta_id`s | It is the button's visible text, and copy changed. |
| C3 | `cta_click.placement` re-keys wherever `data-cta-placement` is absent | Falls back to nearest-section heading text. Mitigate by tagging placement on every ported CTA. |
| C4 | `scroll_depth` percentages mean less content per milestone | Pages are longer. Also shifts when `DeepScrollModal` fires. |
| C5 | `page_title` re-keys on any page whose `metadata.title` changes | Per-page content reconciliation, not this brief. |

**Recommended annotation:** on deploy day, record the date and this checklist's C-list in
`docs/Property/STATE.md` so the next behaviour read does not misdiagnose the discontinuity
as a traffic event. (`standard_terms` §5: segment by intervention date before concluding.)

### D. Post-port smoke test (local, 10 minutes, zero cost)

1. `npm run build` in `Property/web` — must typecheck (this is what catches the Clarity prop).
2. `npm test` — `assign.test.ts` and `analytics.test.ts` green.
3. Load `/` with DevTools Network filtered to `track`. Scroll to the bottom, click the header
   CTA. Confirm one batch POST containing `page_view`, `scroll_depth` ×5, `engagement_time`,
   `cta_click{cta_id:"header_book"}`.
4. Load `/contact`, click the pricing link. Confirm `cta_click{cta_id:"contact_pricing_link", goal:"pricing"}`.
5. Load a blog post with a premium calculator. Confirm `calc_view` → `calc_input_change` →
   `calc_computed`, then press the reveal, confirm `cta_click{cta_id:"see_result"}` and the
   gate's `form_start{form_id:"calc_result_gate"}`; dismiss and confirm `result_gate_skip`.
6. Scroll a blog post past the FAQ. Confirm `section_view{section_id:"faq-heading"}`.
7. Set `localStorage.ptp_consent = "denied"`, reload, confirm **no** `/api/track` requests
   and no GA4 script tag.
8. Load `/embed`, confirm no `/api/track` requests at all.

---

## 10. Open questions this brief could not answer

- Per-page `metadata.title` divergence on the eight forked pages (GA4 `page_title` continuity).
  Belongs to the per-page reconciliation briefs; not audited here.
- Whether the designer's card components set `cursor:pointer` on non-interactive wrappers
  (the `dead_click` noise risk in §4). Needs a rendered page, not a grep.
- Whether `embed_*` CTAs are truly dead. INFERRED from the no-track gate; not runtime-confirmed.
- The `SpecialistWidget` failure mode from CONTEXT §6.4 is not diagnosed here.
