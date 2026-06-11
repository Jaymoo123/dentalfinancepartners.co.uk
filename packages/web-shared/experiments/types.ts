/**
 * Shared types for the experiments SDK.
 *
 * Single source of truth for Variant, Experiment, ExperimentMeta, and
 * ExperimentPrimary. Both site runtimes (assignment) and the estate console
 * (metadata display) import from here.
 *
 * Replaces the former split between Property/web/src/lib/experiments/registry.ts
 * (types + data) and packages/web-shared/console/components/experimentMetaTypes.ts
 * (meta-only types). Both those homes are now re-exports of this module.
 */

export type Variant = { id: string; weight: number };

export type Experiment = {
  key: string;
  status: "running" | "off";
  variants: Variant[];
};

/** Headline metric for building-block (surface-level) scoring. */
export type ExperimentPrimary = {
  /** Headline metric name, e.g. "Engaged the result capture". */
  metricLabel: string;
  /** What "exposed" means here, e.g. "saw the result CTA". */
  exposureLabel: string;
  /** What "acted" means here, e.g. "started a capture / clicked the CTA". */
  actionLabel: string;
  /** Optional quality guardrail (lead_form_length: callable-lead rate). */
  guardrail?: { label: string };
};

/**
 * Human metadata for a single experiment, used by the dashboard card renderer.
 * label = what the test is; controlDesc/treatmentDesc = what each arm does.
 *
 * `primary` declares the proximal "building block" this test is scored on.
 * Its PRESENCE routes the dashboard card to the building-block view; its
 * absence (e.g. personalization, a whole-experience test) keeps the
 * conversion-only card.
 */
export type ExperimentMeta = {
  label: string;
  controlDesc: string;
  treatmentDesc: string;
  primary?: ExperimentPrimary;
};

/**
 * The complete registry for one site: the list of experiments + their metadata.
 */
export type SiteExperimentRegistry = {
  experiments: Experiment[];
  meta: Record<string, ExperimentMeta>;
};
