# Property on-site experiments: lifecycle

The A/B framework lives in `packages/web-shared/experiments/*` (shared, reused by every site) and is wired per-site. Property's surfaces use it via `Property/web/src/lib/experiments/*`. This doc is the contract for launching and concluding an experiment so one is never left half-running again (which is what happened to the 2026 CRO tests).

## How it works
- **Registry** (`packages/web-shared/experiments/registries/property.ts`): each experiment is `{ key, status: "running" | "off", variants:[{id,weight}] }` plus a `meta` block (label + building-block `primary`).
- **Assignment**: `assignVariant(visitorId, experiment)` is a deterministic djb2 hash of `${visitorId}:${key}`. It returns `null` for a null/off/unknown experiment (the SACRED continuity contract is pinned in `assign.test.ts`).
- **Wiring**: a component calls `useExperiment("key")` (or `assignVariant` directly). For a `running` experiment it registers the arm via `setActiveExperiment`, so `track()` stamps `props.exp = "key:arm"` on every event. The active map is **in-memory per page-load**, so ONLY a component that wires an experiment can stamp it.
- **Measurement**: `exposure.ts` fires `experiment_view` (denominator = saw the surface) and `experiment_action` (numerator = took the proximal building-block step). `MiniCapture` does this automatically when passed `experimentKey`. The console Experiments tab reads `vw_experiment_results` / `vw_experiment_funnel`.

## Why we measure the building-block, not the lead
At Property's B2B traffic, conversion-level significance is essentially unreachable (the 2026 tests each had 2–16 lifetime conversions after weeks). Always define the experiment's primary metric as the **proximal action** the change directly moves (e.g. calc-result seen → capture `form_start`), not the lead. Set a **preset decision rule + end date** up front so the test auto-concludes. Run **one experiment at a time** on the highest-traffic surface to concentrate traffic.

## Launching an experiment
1. Add a registry entry `status:"running"` + a `meta.primary` describing the building-block exposure/action labels.
2. Wire the surface: `const v = useExperiment("key")`; render control vs treatment on `v`; pass `experimentKey="key"` to `MiniCapture` (or call `trackExperimentView`/`trackExperimentAction`).
3. Record the decision rule + end date here or in `docs/property/STATE.md`.

## Concluding an experiment (lock to the winner)
Do all four — a partial conclusion is the bug we are avoiding:
1. **Pick the winner** from the building-block metric + the decision rule (conversion is a guardrail only).
2. **Lock it in the component**: delete the `useExperiment`/`assignVariant` call and the losing branch; inline the winner's behaviour unconditionally. (Setting the registry to `off` is NOT enough — `useExperiment` then returns `null`, which renders the CONTROL branch, so a treatment-winner would silently revert. The winner must be hardcoded.)
3. **Remove the instrumentation** for that key (`trackExperimentView/Action`, the `experimentKey` prop) so no stale `experiment_*` events fire.
4. **Set the registry entry `status:"off"`** (keep the entry + meta so the dashboard can still show its history) and update `assign.test.ts` if it pinned that key.
5. **Verify**: build + tests green; after deploy, confirm no NEW `props.exp` rows for the concluded key (the split has stopped).

## Current state (2026-06-23)
All six historical Property experiments are concluded and locked to their winning treatment. `personalization` is locked ON for every visitor; `exit_intent_offer` is locked to the topic-aware offer; `calc_result_capture` / `gate_to_form` / `mobile_tool_capture` / `lead_form_length` were already shipped-as-default and have had their residual scaffolding removed.

**Running now (launched 2026-06-23): `result_gate_capture`** — the first test of the new program, in-blog premium calculators only (embeds + mobile excluded). Treatment holds the result behind a "See your result" button that opens an interstitial capture (`ResultGateModal`) with a small "just show my result" escape, and removes the inline bottom form; control keeps today's behaviour with the bottom form. A converted visitor (any prior lead, via `isConverted()`) is never gated. The interstitial shows at most once per session. Building-block metric: of visitors who reach a calculator result (`experiment_view` fired at first compute in `PremiumCalculator`, both arms), what fraction start the capture form (`experiment_action` on form focus). Diagnostics: `see_result` + `result_gate_skip` cta_clicks (auto-captured via `data-cta`). Guardrail: calculator engagement (`calc_computed`/session, bounce) must not worsen. **Decision rule:** run >=4 weeks AND until each arm has ~150 result exposures, then SHIP treatment if its form-start rate is materially higher and the guardrail holds, else conclude to control (per the lifecycle above). Trust-signals is the next queued test.
