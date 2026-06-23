/**
 * Property Tax Partners experiment registry.
 *
 * DATA VERBATIM from Property/web/src/lib/experiments/registry.ts.
 * This is the single source of truth: Property's runtime imports from here,
 * the estate console reads meta via registries/index.ts keyed by siteKey.
 *
 * To add or retire a Property experiment:
 *   1. Edit this file (status "off" to retire, new entry to launch).
 *   2. Property's useExperiment hook picks it up automatically (re-exports).
 *   3. The console experiments tab updates automatically (reads via registries/index).
 *
 * To launch an experiment:
 *   1. Add an entry with status "running" and weighted variants.
 *   2. In the component, call useExperiment("<key>") and branch on the return.
 *      The active assignment is stamped onto every event automatically (props.exp).
 *   3. Watch /admin/analytics -> Experiments. Kill by setting status "off".
 *
 * Keep it sparing: at low B2B volume most tests never reach significance, so
 * reserve this for big copy/layout swings.
 */
import type { SiteExperimentRegistry } from "../types";

export const propertyRegistry: SiteExperimentRegistry = {
  experiments: [
    // Behaviour-driven personalisation vs the plain generic experience.
    //  - control   (~25%): personalisation suppressed (IntentProvider yields no
    //               actions / useIntent returns null) -> the generic site.
    //  - treatment (~75%): the Part-A behaviour-matched offers (tool/guide/specialist).
    // The arm is registered in IntentProvider so props.exp = "personalization:<arm>"
    // is stamped on every event; vw_experiment_results + the Experiments dashboard
    // panel then show personalization:control vs personalization:treatment.
    {
      // CONCLUDED 2026-06-23: locked ON for everyone (IntentProvider no longer
      // gates on an arm). Kept here (off) so the dashboard can show its history.
      key: "personalization",
      status: "off",
      variants: [
        { id: "control", weight: 25 },
        { id: "treatment", weight: 75 },
      ],
    },

    // CRO program: each is "current (control) vs new (treatment)", 50/50 so
    // both arms accrue data at the same rate. control always renders today's
    // behaviour; treatment renders the new capture. Results show per-experiment
    // in /admin/analytics -> Experiments.

    // The calculator result: trailing CTA link (control) vs a dramatised result +
    // inline email/phone capture (treatment). The #1 leak (computes -> ~0 leads).
    { key: "calc_result_capture", status: "off", variants: [{ id: "control", weight: 50 }, { id: "treatment", weight: 50 }] }, // SHIPPED treatment as default (qualified capture); retired as a test 2026-06-16

    // Exit-intent offer: current email-only "free review" (control) vs a topic-aware
    // stronger offer with email+phone (treatment). Reach is extended for both arms.
    { key: "exit_intent_offer", status: "off", variants: [{ id: "control", weight: 50 }, { id: "treatment", weight: 50 }] }, // CONCLUDED 2026-06-23: locked to treatment (topic-aware offer) in ExitIntentModal

    // The on-page resource block: email-gated Excel download (control) vs a topic-
    // aware "free review" form block (treatment). The gate is dead (50 views, 0 unlocks).
    { key: "gate_to_form", status: "off", variants: [{ id: "control", weight: 50 }, { id: "treatment", weight: 50 }] }, // SHIPPED treatment as default (qualified capture); retired as a test 2026-06-16

    // Mobile tool slot: "open on desktop" dead-end (control) vs a capture (treatment).
    { key: "mobile_tool_capture", status: "off", variants: [{ id: "control", weight: 50 }, { id: "treatment", weight: 50 }] }, // SHIPPED treatment as default (qualified capture); retired as a test 2026-06-16

    // Capture length across every new MiniCapture surface: email+phone+note (control)
    // vs email-only (treatment) -- volume vs quality.
    { key: "lead_form_length", status: "off", variants: [{ id: "control", weight: 50 }, { id: "treatment", weight: 50 }] }, // RETIRED: phone is now mandatory on every capture 2026-06-16

    // NEW lead-capture program, test #1 (launched 2026-06-23): gate the in-blog
    // calculator result behind an interstitial capture (treatment) vs today's
    // inline form below the result (control). Building-block metric = of visitors
    // who reach a calculator result, what fraction start a capture form.
    { key: "result_gate_capture", status: "running", variants: [{ id: "control", weight: 50 }, { id: "treatment", weight: 50 }] },
  ],

  meta: {
    personalization: {
      label: "Personalisation (behaviour-driven offers)",
      controlDesc: "Plain generic site (no tailored offers)",
      treatmentDesc: "Behaviour-matched offers (tool / guide / specialist)",
      // No `primary`: personalisation is scored on conversion, not a single surface.
    },
    calc_result_capture: {
      label: "Calculator result capture",
      controlDesc: "Current trailing CTA link to /contact",
      treatmentDesc: "Dramatised result + inline email/phone capture",
      primary: {
        metricLabel: "Engaged the result",
        exposureLabel: "saw the result CTA",
        actionLabel: "started a capture / clicked the CTA",
      },
    },
    exit_intent_offer: {
      label: "Exit-intent offer",
      controlDesc: "Current email-only 'free review' modal",
      treatmentDesc: "Topic-aware offer with email + phone capture",
      primary: {
        metricLabel: "Engaged the offer",
        exposureLabel: "shown the modal",
        actionLabel: "started the form",
      },
    },
    gate_to_form: {
      label: "Resource block: gate vs form",
      controlDesc: "Email-gated Excel download",
      treatmentDesc: "Topic-aware 'free review' form block",
      primary: {
        metricLabel: "Engaged the block",
        exposureLabel: "saw the block",
        actionLabel: "started the gate / form",
      },
    },
    mobile_tool_capture: {
      label: "Mobile tool slot",
      controlDesc: "'Open on desktop' dead-end prompt",
      treatmentDesc: "Capture (send your numbers / we'll call you)",
      primary: {
        metricLabel: "Engaged the slot",
        exposureLabel: "saw the slot",
        actionLabel: "started the capture",
      },
    },
    lead_form_length: {
      label: "Capture length",
      controlDesc: "Email + phone + optional note",
      treatmentDesc: "Email only",
      primary: {
        metricLabel: "Form completion rate",
        exposureLabel: "started the form",
        actionLabel: "completed the form",
        guardrail: { label: "Callable leads (phone captured)" },
      },
    },
    result_gate_capture: {
      label: "Calculator result-gate interstitial",
      controlDesc: "Result shows with the inline capture form below it (current)",
      treatmentDesc: "A 'See your result' button opens an interstitial capture before the reveal",
      primary: {
        metricLabel: "Started a capture",
        exposureLabel: "reached a calculator result",
        actionLabel: "started the capture form",
      },
    },
  },
};
