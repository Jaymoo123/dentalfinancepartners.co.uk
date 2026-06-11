"use client";

/**
 * Experiment funnel instrumentation — the "building block" layer.
 *
 * Each A/B surface fires two purpose-built events:
 *  - experiment_view   when the visitor actually SEES the surface (the funnel
 *    denominator), and
 *  - experiment_action when they take the proximal building-block step the
 *    change is designed to cause (the numerator).
 *
 * Both carry props.experiment=<key>, and track() auto-stamps props.exp with the
 * visitor's active arm, so vw_experiment_funnel can scope each event to the
 * right key:variant. This is deliberately DECOUPLED from incidental events
 * (form_start, cta_click), which props.exp tags site-wide for an assigned
 * visitor — the funnel must count only what happened ON the experiment surface.
 *
 * Why a building-block metric: a single micro-change (a shorter form, an inline
 * capture) is too far from a lead to ever reach significance on conversion at
 * B2B volume. Measuring the step it directly moves, over only the people who saw
 * it, gives a readable signal weeks earlier. Conversion stays a secondary guardrail.
 */
import { track } from "@accounting-network/web-shared/analytics/track";
import { useInViewOnce } from "@accounting-network/web-shared/analytics/useInViewOnce";

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
 * view (an honest impression, not a mere mount). A falsy `experiment` no-ops, so
 * it is safe to call unconditionally and attach the ref only in the arm that
 * owns the surface.
 */
export function useExperimentInView<T extends Element>(experiment: string, surface: string) {
  return useInViewOnce<T>(() => trackExperimentView(experiment, surface));
}
