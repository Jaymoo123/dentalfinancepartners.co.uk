# Experiments engine

How experiments work across the estate, how to add one, how to read results,
and when results actually mean something.

---

## Mechanic overview

The shared module lives in `packages/web-shared/experiments/`. Each site has
a registry file (`registries/<siteKey>.ts`). The shared `makeUseExperiment`
factory wires a site-specific hook in two lines; the hook hands every
component `null | "control" | "treatment"` and stamps that assignment onto
every analytics event automatically via `setActiveExperiment`.

The console reads metadata from the same registry files (via
`registries/index.ts`) so there is one source of truth for both runtime
assignment and dashboard display.

---

## How to add an experiment

### 1. Registry entry

Open `packages/web-shared/experiments/registries/<siteKey>.ts` and add:

```ts
// experiments array:
{
  key: "my_experiment",
  status: "running",
  variants: [
    { id: "control",   weight: 50 },
    { id: "treatment", weight: 50 },
  ],
},

// meta object:
my_experiment: {
  label: "Short descriptive label",
  controlDesc: "What control renders",
  treatmentDesc: "What treatment renders",
  primary: {
    metricLabel:   "Headline action name",
    exposureLabel: "What 'saw it' means",
    actionLabel:   "What 'did it' means",
  },
},
```

The `primary` block is **required**. An experiment does not ship without a
hypothesis and a primary metric declared in the registry. The console renders
it in the Experiments card; the absence of `primary` falls back to the
conversion-only view, which will never reach significance at current volumes
for most sites.

To retire an experiment set `status: "off"`. The hook returns null for off
experiments (no variant assigned, control behaviour); the console card stops
updating.

### 2. Site hook composition (first experiment on a new site only)

If the site has no `useExperiment` hook yet, create one:

```ts
// generalist/web/src/lib/experiments.ts  (or equivalent path)
"use client";
import { makeUseExperiment } from "@accounting-network/web-shared/experiments/react/useExperiment";
import { <siteKey>Registry }  from "@accounting-network/web-shared/experiments/registries/<siteKey>";
export const useExperiment = makeUseExperiment(<siteKey>Registry);
```

That is the complete composition. No further plumbing is needed.

### 3. UI branch

In your component (must be `"use client"`):

```tsx
import { useExperiment } from "@/lib/experiments";
import {
  useExperimentInView,
  trackExperimentAction,
} from "@accounting-network/web-shared/experiments/react/exposure";

const variant = useExperiment("my_experiment");

// Wire exposure for BOTH arms so control has a denominator.
// Pass an empty string to useExperimentInView for the arm that is not active
// -- it no-ops when experiment is falsy.
const treatmentRef = useExperimentInView<HTMLElement>(
  variant === "treatment" ? "my_experiment" : "",
  "my_surface",
);
const controlRef = useExperimentInView<HTMLDivElement>(
  variant === null || variant === "control" ? "my_experiment" : "",
  "my_surface",
);

if (variant === "treatment") {
  return <div ref={treatmentRef}>...treatment UI...</div>;
}
// control + null (SSR / first render):
return <div ref={controlRef}>...control UI (or invisible anchor)...</div>;
```

The `null` branch is the first render (server + first client paint). Always
treat `null` as control. This is the null-until-mounted contract that
prevents hydration mismatch.

### 4. Console capability map

If the site was not previously running experiments, add it to
`console/web/src/config/capabilities.ts`:

```ts
generalist: { experiments: true, nurture: false, leadIntent: false, personalisation: false },
```

### 5. QA override

Before going live, smoke-test both arms without waiting to be bucketed:

```
https://hollowaydavies.co.uk/blog/tax/some-post?ab=my_experiment:treatment
https://hollowaydavies.co.uk/blog/tax/some-post?ab=my_experiment:control
```

The `?ab=key:variant` override forces the named variant for the current
session only. It does not affect anyone else and it does not write to the
database. Use it to confirm the component branches correctly and that
`experiment_view` + `experiment_action` events land in
`web_events` with the correct `experiment` field.

Multi-experiment override: `?ab=exp1:treatment,exp2:control`.

---

## Reading results

### Where results live

The console Experiments tab (per-site) shows the building-block funnel:
exposures, actions, and the derived rate per arm. Raw rows are in
`vw_experiment_funnel` (or `web_events` filtered to `event_type IN
('experiment_view', 'experiment_action')`).

### The z-test and its assumptions

The console computes a two-proportion z-test: `z = (p1 - p2) / sqrt(p * (1-p) * (1/n1 + 1/n2))` where `p` is the pooled proportion. This assumes:

- Each visitor contributes exactly one exposure and at most one action (the
  building-block model). If the same visitor sees the surface many times, the
  independence assumption is violated and the p-value is optimistic.
- Variant assignment is stable per visitor (it is: djb2 hash of `visitorId:key`
  is deterministic).
- No systematic difference in who lands in each arm other than random chance
  (it is: 50/50 hash bucketing is not correlated with any observable).

The z-test does not correct for multiple comparisons. Running 6 experiments
simultaneously (as on Property) inflates the family-wise false-positive rate.
Treat any single p < 0.05 finding from a multi-experiment dashboard as a
signal, not a certainty. Replicate before acting.

### Minimum-exposure table

A 50/50 split. "Relative lift" = the size of the true effect as a fraction
of the baseline rate. Larger lifts are detectable faster.

| Baseline rate | Relative lift | Approx. per-arm sample needed |
|:---:|:---:|:---:|
| 5% | 50% | ~8,000 |
| 5% | 20% | ~50,000 |
| 10% | 50% | ~4,000 |
| 10% | 20% | ~25,000 |
| 30% | 50% | ~120 |
| 30% | 20% | ~800 |
| 50% | 20% | ~400 |
| 50% | 10% | ~1,600 |

These are approximations at 80% power, two-tailed alpha = 0.05. Use a sample
size calculator for exact figures. The takeaway: conversion experiments
(lead form submission, ~1-3% baseline) need tens of thousands of exposures
per arm. Building-block experiments (CTA clicks, ~20-50% of engaged readers)
need hundreds to low thousands.

"Awaiting exposure" is a correct answer. Do not read results early.

### Building-block vs conversion metrics

A building-block metric is the proximal step the change is designed to cause:
clicking a CTA, engaging a capture form, clicking through to a calculator.
A conversion metric is the final commercial outcome: a lead submitted, a call
booked.

At B2B volumes (Property ~900 non-bot sessions / 7d; generalist ~35), a
conversion-metric experiment on generalist would need roughly 7-10 years to
conclude. Building-block metrics accrue fast enough to be readable in weeks.
Conversion stays a secondary guardrail: watch that the treatment arm is not
lifting clicks while tanking lead quality.

### Per-site traffic reality (7d non-bot sessions as of 2026-06-11)

| Site | ~7d sessions | Appropriate metric |
|---|---|---|
| Property | ~900 | Building-block; conversion as guardrail |
| Generalist | ~35 | Building-block only |
| Dentists | <10 | No experiments yet; too low |
| Medical | <10 | No experiments yet; too low |
| Solicitors | <10 | No experiments yet; too low |
| Digital Agency | <10 | No experiments yet; too low |

These figures change as sites grow. Re-check before launching an experiment
on any low-traffic site.

---

## The rule

**An experiment ships with a hypothesis and a primary metric, or it does not ship.**

The hypothesis must be falsifiable: "X% of sessions do Y but ~0% do Z;
an inline [surface] will lift Z." The primary metric must be a specific,
measurable building-block event, declared in the registry `primary` block
before the experiment goes live.

---

## G1 contamination window note

Experiments ran on Property between the F1 SDK deploy and the same-day G1
SDK init-race hotfix were assigned against throwaway visitor ids (the SDK
minted fallback `sdk_*` prefix ids before `initAnalytics` ran). Those
assignments never matched subsequent events from the same real visitor.

**Treat any experiment_view / experiment_action rows from that window as
noise.** The window was short (hours, low-double-digit sessions). Post-hotfix
golden probe confirmed correct assignment. The contaminated rows were deleted
from the test data; production data from that window is marked unreliable in
the console by checking the `created_at` range against the hotfix deploy
timestamp.

---

## Adding a site (checklist)

1. `packages/web-shared/experiments/registries/<siteKey>.ts` -- add registry
   entry with hypothesis + primary metric (ship gate).
2. `<site>/web/src/lib/experiments.ts` -- two-line composition (first
   experiment on site only; skip if site has this already).
3. Component: `"use client"` leaf with `useExperiment` branch + dual
   `useExperimentInView` for both arms.
4. `console/web/src/config/capabilities.ts` -- set `experiments: true`.
5. Smoke-test both arms with `?ab=key:variant` override.
6. Run full test suite + `next build` on the site before committing.
