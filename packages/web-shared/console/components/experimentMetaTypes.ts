/**
 * Shared types for experiment metadata.
 *
 * These live in web-shared so ExperimentCards.tsx (also in web-shared) can
 * import them without creating a dependency on any site-local registry.
 * The console's concrete metadata is in console/web/src/config/experimentMeta.ts
 * which implements these types.
 */

export type ExperimentPrimary = {
  /** Headline metric name, e.g. "Engaged the result capture". */
  metricLabel: string;
  /** What "exposed" means for this surface, e.g. "saw the result CTA". */
  exposureLabel: string;
  /** What "acted" means here, e.g. "started a capture / clicked the CTA". */
  actionLabel: string;
  /** Optional quality guardrail (lead_form_length: callable-lead rate). */
  guardrail?: { label: string };
};

export type ExperimentMeta = {
  label: string;
  controlDesc: string;
  treatmentDesc: string;
  /** Present -> route the dashboard card to the building-block (funnel) view. */
  primary?: ExperimentPrimary;
};
