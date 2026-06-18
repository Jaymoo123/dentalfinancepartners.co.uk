"use client";

/**
 * Construction-CIS experiment exposure instrumentation -- re-export shim.
 *
 * Re-exports the shared exposure helpers verbatim. No behaviour change.
 *
 * Source of truth: packages/web-shared/experiments/react/exposure.ts
 */
export {
  trackExperimentView,
  trackExperimentAction,
  useExperimentInView,
} from "@accounting-network/web-shared/experiments/react/exposure";
