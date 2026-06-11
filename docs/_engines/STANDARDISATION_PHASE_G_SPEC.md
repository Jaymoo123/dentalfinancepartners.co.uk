# Standardisation — Phase G: estate-wide experiments rollout

**Status:** CLOSED 2026-06-11. G1 + G2 merged and deployed; the program's final phase. Two real bugs found and fixed by live probes that unit tests and builds could not see: (1) the F1 SDK init race (assignment on throwaway ids — render-phase init fix, PR #21), (2) the useInViewOnce mount-time element capture (exposure never fired for late-mounting experiment surfaces — callback-ref fix, PR #23).

**G2 — ACCEPTED + DEPLOYED + LIVE-VERIFIED (manager, 2026-06-11).** PR #22 merged (CI 10/10 re-checked); generalist + console deployed; then the live exposure probe found the useInViewOnce bug → hotfix PR #23 → generalist + Property redeployed. Final live verification: treatment renders the promo card and control renders nothing (same visitor, ?ab override) · **`experiment_view` rows landed in the prod store for BOTH arms** (control via incremental-scroll probe — instant jump-scroll past a zero-height anchor never intersects; human scrolling does; probe scripts in scripts/g2_*.mjs) · all probe visitors deleted (77 events, 7 sessions). calc_promo_inline is LIVE and accruing. EXPERIMENTS.md published.

**Status history:** EXECUTING — opened 2026-06-11 on user go ("let's do the experiments rollout, comprehensively and to a very high standard"). The last program item.

## Execution log

### G2 -- 2026-06-11 (branch experiments-g2, executor Sonnet)

**Generalist starter experiment `calc_promo_inline`:**
- Registry entry in `packages/web-shared/experiments/registries/generalist.ts`: key `calc_promo_inline`, 50/50 control/treatment, status running, full meta with label/controlDesc/treatmentDesc/primary (metricLabel/exposureLabel/actionLabel). Hypothesis: 69% of sessions engage but ~0% reach /calculators; an inline promo card after the first content sections will lift calculator visits. Primary building-block metric: promo CTA click (experiment_action) / scroll-past (experiment_view). Minimum-exposure note in registry comment (~120 per arm to detect 50% relative lift on 30% baseline).
- Generalist hook composition: `generalist/web/src/lib/experiments.ts` exporting `useExperiment = makeUseExperiment(generalistRegistry)` (two-line composition, mirrors Property shim pattern).
- Component `generalist/web/src/components/blog/CalcPromoCard.tsx` ("use client"): design-system-native (off-white #fafaf7 bg, ink text, orange #f97316 accent, btnPrimary token). Copy: kicker "Free tool", heading "Check your numbers in 60 seconds", one-sentence body, CTA "Try the calculators" linking /calculators with data-cta="calc_promo_inline" + data-cta-placement="blog_inline" + data-cta-goal="calculator". Dual exposure wired via two useExperimentInView calls (treatment ref on card, control ref on invisible zero-height anchor div) -- both arms record experiment_view when position scrolls into view. trackExperimentAction fires on CTA click (treatment arm only).
- Mount: injected in BlogPostRenderer between the mobile TOC and the article body prose div -- structurally after the intro/takeaways material, before the main prose. Client leaf (null first paint = invisible anchor, no above-the-fold layout shift).
- Other four sites (dentists/medical/solicitors/digital-agency): no experiments, no composition wiring -- n/a recorded per spec.

**Console capability map:** `console/web/src/config/capabilities.ts` -- generalist experiments: true added.

**`docs/_engines/EXPERIMENTS.md`** (honesty doc): how to add (registry + 2-line composition + UI branch + capability map + QA override smoke-test); QA override format `?ab=key:variant`; reading results (z-test assumptions, minimum-exposure table 8 rows by baseline/lift combination, building-block vs conversion rationale); per-site traffic table (property ~900, generalist ~35, others <10); the rule (hypothesis + primary metric or no ship); G1 contamination window note.

**Test results:**
- web-shared: 297 passed (293 pre-G2 + 4 new: generalist 1-running-exp, 50/50 shape, primary-meta block, deterministic bucketing sample)
- generalist: 33 passed (unchanged -- no new compute tests needed)
- console: 28 passed (27 pre-G2 + 1 new: generalist experiments capability true)

**Build results:**
- generalist `next build`: green (compiled successfully, warnings only -- pre-existing)
- console `next build`: green

**TypeScript:** all 7 sites + console tsc clean (0 errors)

**Acceptance greps:**
- PF-07: clean (no stray experimentMeta imports outside the shim)
- No content/markdown blog files touched (BlogPostRenderer.tsx is a component, not a content file)

**STOPs / deferred:** none. The card mount point is between the mobile TOC and the article body (before the prose starts). For treatment arm, the card appears right above the prose after hydration -- "after the intro section", within acceptable structural bounds. Alternative "mid-prose" injection (splitting the HTML blob) was deferred as out-of-scope for the light-touch constraint; the chosen point is structurally stable and below the fold.

### G1 -- 2026-06-11 (branch experiments-g1, executor Sonnet)

**Golden continuity suite: 64 triples, all PASS.**
Triples were computed programmatically from Property's CURRENT `assign.ts` before any
file was touched. Coverage: all 6 running Property experiments x 10 fixed visitor ids
(60 triples) + 4 boundary triples probed by searching for hash % total at the 24/25
(personalization 25/75 split) and 49/50 (50/50 split) bucket edges.

**New module layout (`packages/web-shared/experiments/`):**
- `types.ts` -- Variant, Experiment, ExperimentMeta, ExperimentPrimary, SiteExperimentRegistry
- `assign.ts` -- pure `assignVariant(visitorId, experiment)`, registry-decoupled
- `registries/property.ts` -- Property data VERBATIM (6 experiments + full meta)
- `registries/{generalist,dentists,medical,solicitors,agency}.ts` -- empty, typed
- `registries/index.ts` -- `siteRegistries: Record<string, SiteExperimentRegistry>` + `getExperimentMeta(siteKey, key)`
- `react/useExperiment.ts` -- `makeUseExperiment(registry)` factory; ?ab= override + null-until-mounted verbatim
- `react/exposure.ts` -- trackExperimentView, trackExperimentAction, useExperimentInView
- `assign.test.ts` -- 64 golden triples + bucketing edges + override parsing + null contract + registry-map completeness (22 tests total)
- package.json updated with all export-map entries

**`packages/web-shared/console/components/experimentMetaTypes.ts`** -- converted to deprecation re-export from `experiments/types.ts`; all existing imports continue to resolve.

**Property re-point (4 files, zero behaviour change):**
- `lib/experiments/registry.ts` -- re-exports types + data from shared registries/property
- `lib/experiments/assign.ts` -- thin adapter preserving `(visitorId, key)` string signature
- `components/experiments/useExperiment.ts` -- `makeUseExperiment(propertyRegistry)` composition
- `lib/experiments/exposure.ts` -- direct re-export of shared react/exposure.ts

**Console de-dup:**
- `console/web/src/config/experimentMeta.ts` DELETED
- `console/web/src/app/site/[siteKey]/page.tsx` now reads meta via `getExperimentMeta(siteKey, key)` from shared registries/index
- `console/web/src/tests/console.test.ts` updated to import from shared (wrapper + EXPERIMENT_META alias)

**Test results:**
- web-shared: 289 passed (267 original + 22 new golden suite)
- Property: 95 passed (unchanged)
- console: 27 passed (unchanged)

**Build results:**
- Property `next build`: green, 767 pages
- console `next build`: green

**TypeScript:** all 7 sites + console tsc clean (0 errors)

**Acceptance greps:** no console source imports of deleted experimentMeta config; Property experiment files are shims (correct); no other site has experiment imports to re-point.

### G1 — ACCEPTED + DEPLOYED (manager, 2026-06-11) — and the live probe caught a real bug

- G1 merged (PR #20, CI 10/10 re-checked at merge). Property + console deployed.
- **LIVE CONTINUITY PROBE FAILED on first run — correctly.** Golden visitor `v_tester_00001` was assigned treatment/treatment on prod where the goldens say control/control. Root cause was NOT the lifted maths (unit goldens green; the shared module reproduces assignments exactly): **the F1 SDK composition had a pre-config identity race** — React runs child effects before parent effects, so experiment-assigning components called `getVisitorId()` before `initAnalytics` set the `ptp` prefix; the SDK minted throwaway ids under its `sdk` fallback prefix and arms were assigned against an identity that never matches the events. Window: F1 deploy → hotfix (same day, hours; low-double-digit Property sessions affected — recorded for anyone reading that period's experiment data).
- **Hotfix (PR #21):** idempotent render-phase `initAnalytics` in the shared provider (render precedes ALL descendant effects) + `ids.ts`/`consent.ts` refuse fallback keys pre-config (return empty/undecided, never mint, never read a fallback consent). 4 regression tests pin it (293 web-shared total).
- **Re-probe after hotfix deploy: golden visitor assigned control/control on prod — EXACT golden match.** Test visitor rows deleted (16 events, 2 sessions).
- Lesson recorded: unit goldens prove the maths; only a live identity-seeded probe proves the composition. Both are now part of the experiments deploy gate.

## What "high standard" means here (the design constraints)

1. **Assignment continuity is sacred.** Property has live experiments with 12 result rows. The shared module must produce IDENTICAL variant assignments to Property's current code: same djb2 hash, same `${visitorId}:${key}` seed, same weighted bucketing. **Golden tests pin real (visitorId, key) → variant triples computed from the current implementation BEFORE the lift**; a changed assignment is a STOP — it would scramble running experiments.
2. **No flicker, no hydration mismatch.** The hook's null-until-mounted contract (server + first client render = control) is part of the lifted behaviour, verbatim.
3. **Statistical honesty over dashboard theatre.** Traffic reality (7d non-bot): property 906, generalist 35, others single digits. Conversion-metric experiments conclude ONLY on Property at current volumes. The rollout therefore ships: mechanism everywhere · Property's real experiments untouched and continuous · ONE starter on generalist using a fast-accruing building-block metric (clicks, not leads) · empty-but-ready registries elsewhere · and `docs/_engines/EXPERIMENTS.md` stating plainly when results mean something (exposure minimums, the z-test's assumptions, building-block vs conversion metrics, "awaiting exposure" is an answer not a failure).
4. **One source of truth for experiment definitions.** Registries become data-only modules in `packages/web-shared/experiments/registries/<siteKey>.ts`, importable by BOTH the owning site (runtime assignment) and the console (meta display) — this deletes the console's documented experimentMeta duplication properly.
5. **Mechanism ≠ inventory.** Sites without experiments register nothing; the console's existing empty state ("No experiment results yet") is the honest display.

## Clusters

### G1 — shared module + Property re-point + console de-dup *(branch `experiments-g1`)*
**Lift (from Property, the donor):**
- `packages/web-shared/experiments/`: `types.ts` (Experiment/Variant/ExperimentMeta — reconcile with the console's experimentMetaTypes, ONE home), `assign.ts` (djb2 + weighted bucketing, DECOUPLED from any registry import: pure `assignVariant(visitorId, experiment)`), `react/useExperiment.ts` (composition factory `makeUseExperiment(registry)` following the SDK idiom; preserves the `?ab=key:variant` QA override and null-until-mounted contract verbatim), `react/exposure.ts` (useExperimentInView + trackExperimentAction lifted from Property's exposure.ts), `registries/property.ts` (Property's registry data VERBATIM) + `registries/index.ts` (keyed map for console consumption) + empty registries for the other five sites.
- **Golden continuity suite FIRST:** before touching Property's files, compute ≥20 (visitorId, key) → variant triples with the CURRENT Property implementation (cover both running experiments, weighted edges, empty visitor) and pin them as tests the shared `assign` must pass.
- Property re-point: `lib/experiments/{registry,assign}.ts` + `components/experiments/useExperiment.ts` + `lib/experiments/exposure.ts` → thin re-exports or direct imports of the shared module (delete what nothing imports); zero behaviour change (the goldens + 95-test suite prove it).
- Console de-dup: `console/web/src/config/experimentMeta.ts` DELETED; the site page reads meta from `web-shared/experiments/registries` via the keyed map; unknown-id fallback behaviour retained.
- Tests at birth: golden continuity triples · weight bucketing edge cases · override parsing · null/control contract · registry map completeness (every site key has a registry module).

### G2 — generalist starter + estate composition + the honesty doc *(branch `experiments-g2`, after G1 merges)*
- **Generalist starter experiment `calc_promo_inline`** (hypothesis FROM the live funnel data: 69% of sessions engage but 0% reach a calculator — the estate console's own finding): treatment renders an inline "Check your numbers" promo card linking to the relevant calculator inside blog posts (component is additive, design-system-native: off-white/ink/orange, no em-dashes); control renders nothing. **Building-block metric:** promo click-through → `/calculators` visit (fast-accruing), NOT lead conversion. 50/50 split. Registry entry in `registries/generalist.ts` with honest meta (hypothesis, primary metric, minimum exposure note).
- Generalist composes the hook (its own `makeUseExperiment(generalistRegistry)` wiring, mirroring Property's composition).
- Other four sites: NO composition code unless free (they have no experiments; the shared module sits unused — record n/a; do NOT add dead wiring "for readiness", the composition is two lines whenever a real experiment arrives).
- Console capability map: generalist experiments → true.
- `docs/_engines/EXPERIMENTS.md`: how to add an experiment (registry entry + one UI branch), QA override usage, reading results (exposure minimums by baseline rate table, z-test caveats, building-block rationale), the per-site traffic reality, and the rule that experiments ship with a hypothesis + primary metric or not at all.

## Deploy gate (manager, after each cluster)
G1: deploy Property + console → battery: pages 200, an01, lead-pipeline probe, **live assignment continuity check** (visit with a fixed ?ab override + verify a real visitor id buckets identically pre/post via the golden script), console experiments tab renders Property cards from the shared registry. G2: deploy generalist (+ console if capability map changed) → battery + verify exposure events land tagged (`experiment` fields on web_events) for the starter, cards render "awaiting exposure".

## Cross-cluster rules
Executor Sonnet (spec first, STOPs hard, log-in-commit, Co-Authored-By, no em-dashes — user-facing experiment copy included). Manager verifies/merges/deploys between clusters. `next build` is the gate. Re-check `gh pr checks` immediately before merge after any late commit (the F3 lesson). Untouchables unchanged: `api/leads/**`, schema, homepage copy, content files (the promo card injects via the blog renderer's component layer, not content edits).
