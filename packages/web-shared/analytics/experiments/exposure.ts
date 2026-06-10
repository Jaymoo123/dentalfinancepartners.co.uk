"use client";

/**
 * Experiment funnel instrumentation — the "building block" layer.
 *
 * Each A/B surface fires two purpose-built events:
 *  - experiment_view   when the visitor actually SEES the surface (denominator)
 *  - experiment_action when they take the proximal building-block step (numerator)
 *
 * Both carry props.experiment=<key>, and track() auto-stamps props.exp with the
 * visitor's active arm, so vw_experiment_funnel can scope each event to the
 * right key:variant.
 */
import { track } from "../track";
import { useInViewOnce } from "../useInViewOnce";

/** Fire the "saw the surface" event for an experiment arm (the denominator). */
export function trackExperimentView(experiment: string, surface: string): void {
  if (!experiment) return;
  track("experiment_view", { experiment, surface });
}

/** Fire the building-block action for an experiment arm (the numerator). */
export function trackExperimentAction(
  experiment: string,
  surface: string,
  extra: Record<string, string | number | boolean> = {},
): void {
  if (!experiment) return;
  track("experiment_action", { experiment, surface, ...extra });
}

/**
 * Ref that fires experiment_view exactly once, when the element scrolls into
 * view (an honest impression). A falsy `experiment` no-ops.
 */
export function useExperimentInView<T extends Element>(experiment: string, surface: string) {
  return useInViewOnce<T>(() => trackExperimentView(experiment, surface));
}
