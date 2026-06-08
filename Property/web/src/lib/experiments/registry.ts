/**
 * A/B experiment registry — the single place to define experiments. Zero
 * third-party deps: assignment is a deterministic hash of the visitor_id, and
 * results come straight from our own web_events via vw_experiment_results.
 *
 * To launch an experiment:
 *   1. Add an entry here with status "running" and weighted variants.
 *   2. In the component, read `const variant = useExperiment("<key>")` and branch
 *      on it. The active assignment is stamped onto every event automatically
 *      (props.exp), so no extra tracking is needed.
 *   3. Watch /admin/analytics -> Experiments. Kill it by setting status "off".
 *
 * Keep it sparing: at low B2B volume most tests never reach significance, so
 * reserve this for big copy/layout swings.
 */
export type Variant = { id: string; weight: number };
export type Experiment = {
  key: string;
  status: "running" | "off";
  variants: Variant[];
};

export const EXPERIMENTS: Experiment[] = [
  // Behaviour-driven personalisation vs the plain generic experience.
  //  - control   (~25%): personalisation suppressed (IntentProvider yields no
  //               actions / useIntent returns null) -> the generic site.
  //  - treatment (~75%): the Part-A behaviour-matched offers (tool/guide/specialist).
  // The arm is registered in IntentProvider so props.exp = "personalization:<arm>"
  // is stamped on every event; vw_experiment_results + the Experiments dashboard
  // panel then show personalization:control vs personalization:treatment.
  {
    key: "personalization",
    status: "running",
    variants: [
      { id: "control", weight: 25 },
      { id: "treatment", weight: 75 },
    ],
  },

  // ── CRO program: each is "current (control) vs new (treatment)", 50/50 so
  // both arms accrue data at the same rate. control always renders today's
  // behaviour; treatment renders the new capture. Results show per-experiment in
  // /admin/analytics -> Experiments.

  // The calculator result: trailing CTA link (control) vs a dramatised result +
  // inline email/phone capture (treatment). The #1 leak (computes -> ~0 leads).
  { key: "calc_result_capture", status: "running", variants: [{ id: "control", weight: 50 }, { id: "treatment", weight: 50 }] },

  // Exit-intent offer: current email-only "free review" (control) vs a topic-aware
  // stronger offer with email+phone (treatment). Reach is extended for both arms.
  { key: "exit_intent_offer", status: "running", variants: [{ id: "control", weight: 50 }, { id: "treatment", weight: 50 }] },

  // The on-page resource block: email-gated Excel download (control) vs a topic-
  // aware "free review" form block (treatment). The gate is dead (50 views, 0 unlocks).
  { key: "gate_to_form", status: "running", variants: [{ id: "control", weight: 50 }, { id: "treatment", weight: 50 }] },

  // Mobile tool slot: "open on desktop" dead-end (control) vs a capture (treatment).
  { key: "mobile_tool_capture", status: "running", variants: [{ id: "control", weight: 50 }, { id: "treatment", weight: 50 }] },

  // Capture length across every new MiniCapture surface: email+phone+note (control)
  // vs email-only (treatment) — volume vs quality.
  { key: "lead_form_length", status: "running", variants: [{ id: "control", weight: 50 }, { id: "treatment", weight: 50 }] },
];

/**
 * Human metadata for the Experiments dashboard (the per-experiment A/B ledger).
 * label = what the test is; controlDesc/treatmentDesc = what each arm does.
 */
export type ExperimentMeta = { label: string; controlDesc: string; treatmentDesc: string };

export const EXPERIMENT_META: Record<string, ExperimentMeta> = {
  personalization: {
    label: "Personalisation (behaviour-driven offers)",
    controlDesc: "Plain generic site (no tailored offers)",
    treatmentDesc: "Behaviour-matched offers (tool / guide / specialist)",
  },
  calc_result_capture: {
    label: "Calculator result capture",
    controlDesc: "Current trailing CTA link to /contact",
    treatmentDesc: "Dramatised result + inline email/phone capture",
  },
  exit_intent_offer: {
    label: "Exit-intent offer",
    controlDesc: "Current email-only 'free review' modal",
    treatmentDesc: "Topic-aware offer with email + phone capture",
  },
  gate_to_form: {
    label: "Resource block: gate vs form",
    controlDesc: "Email-gated Excel download",
    treatmentDesc: "Topic-aware 'free review' form block",
  },
  mobile_tool_capture: {
    label: "Mobile tool slot",
    controlDesc: "'Open on desktop' dead-end prompt",
    treatmentDesc: "Capture (send your numbers / we'll call you)",
  },
  lead_form_length: {
    label: "Capture length",
    controlDesc: "Email + phone + optional note",
    treatmentDesc: "Email only",
  },
};

/** Metadata for an experiment key, with a tidy fallback. */
export function experimentMeta(key: string): ExperimentMeta {
  return (
    EXPERIMENT_META[key] ?? {
      label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      controlDesc: "Control",
      treatmentDesc: "Treatment",
    }
  );
}

/** A running experiment by key, or null (unknown / off). */
export function getExperiment(key: string): Experiment | null {
  return EXPERIMENTS.find((e) => e.key === key && e.status === "running") ?? null;
}

/** All running experiments (for the dashboard to iterate). */
export function runningExperiments(): Experiment[] {
  return EXPERIMENTS.filter((e) => e.status === "running");
}
