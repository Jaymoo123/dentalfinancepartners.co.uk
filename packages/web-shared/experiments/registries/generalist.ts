/**
 * Generalist (Holloway Davies) experiment registry.
 *
 * To add an experiment:
 *   1. Add an entry to `experiments` with status "running" and weighted variants.
 *   2. Add a matching entry to `meta` with label, controlDesc, treatmentDesc, and
 *      a `primary` block (required by the ship gate: no experiment ships without
 *      a hypothesis + primary metric -- see docs/_engines/EXPERIMENTS.md).
 *   3. In the component, call useExperiment("<key>") and branch on the return.
 *      Wire useExperimentInView for BOTH arms so exposure is recorded for control too.
 *   4. Kill by setting status "off".
 *
 * Traffic reality: generalist gets roughly 35 non-bot sessions / 7d.
 * Use building-block (surface-level) metrics only -- conversion experiments
 * will not reach significance at this volume. See EXPERIMENTS.md minimum-exposure
 * table for sample-size guidance before launching.
 */
import type { SiteExperimentRegistry } from "../types";

export const generalistRegistry: SiteExperimentRegistry = {
  experiments: [
    // Hypothesis: engaged blog readers never discover the calculators (69% of
    // sessions engage with content; ~0% reach /calculators). Treatment renders
    // a small inline promo card after the first third of the article body.
    // Primary building-block metric: promo CTA click -> /calculators visit.
    // 50/50 split so both arms accrue exposure at equal rates.
    // Minimum-exposure note: at ~35 sessions/week (~17 per arm), expect 4-6 weeks
    // to reach the ~120-arm minimum needed to detect a 50% relative lift on a
    // 30% baseline click rate. Use "awaiting exposure" until that threshold.
    {
      key: "calc_promo_inline",
      status: "running",
      variants: [
        { id: "control", weight: 50 },
        { id: "treatment", weight: 50 },
      ],
    },
  ],

  meta: {
    calc_promo_inline: {
      label: "Calculator promo inline (blog)",
      controlDesc: "No inline promo card (existing blog body only)",
      treatmentDesc: "Inline promo card after first third of article: 'Check your numbers in 60 seconds'",
      primary: {
        metricLabel: "Clicked through to calculators",
        exposureLabel: "saw the promo card position (scrolled past it)",
        actionLabel: "clicked 'Try the calculators' CTA",
      },
    },
  },
};
