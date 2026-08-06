/**
 * Trade Tax Specialists (construction-cis) experiment registry.
 *
 * Sibling of property.ts / dentists.ts etc. Additive only: this file plus one
 * map entry in registries/index.ts onboards the site; no shared type/assign/
 * makeUseExperiment signature changes.
 *
 * To launch an experiment:
 *   1. Add an entry with status "running" and weighted variants.
 *   2. In the component, call useExperiment("<key>") and branch on the return.
 *      The active assignment is stamped onto every event automatically (props.exp).
 *   3. Watch /admin/analytics -> Experiments. Kill by setting status "off".
 *
 * Keep it sparing: at low volume most tests never reach significance, so reserve
 * this for big copy/layout swings.
 */
import type { SiteExperimentRegistry } from "../types";

export const constructionRegistry: SiteExperimentRegistry = {
  experiments: [
    // Behaviour-driven personalisation vs the plain generic experience.
    //  - control   (~25%): personalisation suppressed (IntentProvider yields no
    //               actions / useIntent returns null) -> the generic site.
    //  - treatment (~75%): behaviour-matched CIS offers (calculator / guide / specialist).
    // The arm is registered in IntentProvider so props.exp = "personalization:<arm>"
    // is stamped on every event; vw_experiment_results + the Experiments dashboard
    // panel then show personalization:control vs personalization:treatment.
    // CONCLUDED 2026-07-05 (estate experiments wind-down, CRO parity program):
    // treatment locked ON for all visitors (IntentProvider assign block removed;
    // personalisation unconditional, mirroring Property's concluded winner).
    // Volume never reached significance; Property's estate-level verdict governs.
    {
      key: "personalization",
      status: "off",
      variants: [
        { id: "control", weight: 25 },
        { id: "treatment", weight: 75 },
      ],
    },
  ],

  meta: {
    personalization: {
      label: "Personalisation (behaviour-driven offers)",
      controlDesc: "Plain generic site (no tailored offers)",
      treatmentDesc: "Behaviour-matched CIS offers (calculator / guide / specialist)",
      // No `primary`: personalisation is scored on conversion, not a single surface.
    },
  },
};
