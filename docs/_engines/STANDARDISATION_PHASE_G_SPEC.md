# Standardisation — Phase G: estate-wide experiments rollout

**Status:** EXECUTING — opened 2026-06-11 on user go ("let's do the experiments rollout, comprehensively and to a very high standard"). The last program item.

## Execution log
*(appended per cluster)*

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
