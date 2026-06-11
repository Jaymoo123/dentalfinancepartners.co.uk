/**
 * Property experiment registry -- re-export shim.
 *
 * All data and types now live in the shared module. This file re-exports
 * everything so existing imports across the Property codebase continue to
 * work without change, and so consumers that were importing from this path
 * get the canonical shared types.
 *
 * Source of truth: packages/web-shared/experiments/registries/property.ts
 */
export type {
  Variant,
  Experiment,
  ExperimentMeta,
  ExperimentPrimary,
} from "@accounting-network/web-shared/experiments/types";

import { propertyRegistry } from "@accounting-network/web-shared/experiments/registries/property";

export const EXPERIMENTS = propertyRegistry.experiments;
export const EXPERIMENT_META = propertyRegistry.meta;

export type { SiteExperimentRegistry } from "@accounting-network/web-shared/experiments/types";

/** Metadata for an experiment key, with a tidy fallback. */
export function experimentMeta(key: string) {
  return (
    EXPERIMENT_META[key] ?? {
      label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      controlDesc: "Control",
      treatmentDesc: "Treatment",
    }
  );
}

/** A running experiment by key, or null (unknown / off). */
export function getExperiment(key: string) {
  return EXPERIMENTS.find((e) => e.key === key && e.status === "running") ?? null;
}

/** All running experiments (for the dashboard to iterate). */
export function runningExperiments() {
  return EXPERIMENTS.filter((e) => e.status === "running");
}
