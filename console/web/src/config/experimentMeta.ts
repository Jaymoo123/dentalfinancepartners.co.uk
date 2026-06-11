/**
 * Experiment metadata for the estate console experiments tab.
 *
 * SOURCE OF TRUTH: Property/web/src/lib/experiments/registry.ts
 * Changes there MUST be mirrored here. This duplication is accepted until
 * experiments become an estate-wide concern (at which point the metadata
 * migrates to packages/web-shared).
 *
 * Design note: this file is DATA ONLY (no function calls, no HTTP). The
 * console cannot import Property's site-local registry directly because the
 * monorepo enforces site isolation. Unknown experiment ids arriving from the
 * database still render gracefully via the fallback in getExperimentMeta().
 */

import type {
  ExperimentPrimary,
  ExperimentMeta,
} from "@accounting-network/web-shared/console/components/experimentMetaTypes";

export type { ExperimentPrimary, ExperimentMeta };

/**
 * Known experiment metadata, keyed by experiment id.
 * Mirrored from Property/web/src/lib/experiments/registry.ts EXPERIMENT_META.
 */
export const EXPERIMENT_META: Record<string, ExperimentMeta> = {
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
};

/**
 * Returns the metadata for an experiment key, with a graceful fallback for
 * unknown ids. Unknown ids arrive when a new experiment is live in the DB but
 * has not yet been added to this file.
 *
 * The fallback renders the raw id (title-cased) with generic control/treatment
 * labels so no data is hidden while the operator updates this config.
 */
export function getExperimentMeta(key: string): ExperimentMeta {
  return (
    EXPERIMENT_META[key] ?? {
      label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      controlDesc: "Control",
      treatmentDesc: "Treatment",
    }
  );
}
