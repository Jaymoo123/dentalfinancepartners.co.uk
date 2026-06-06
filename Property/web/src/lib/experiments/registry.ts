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
  // Example (kept off so it changes nothing live):
  // {
  //   key: "sticky_cta_copy",
  //   status: "off",
  //   variants: [
  //     { id: "control", weight: 50 },
  //     { id: "v2", weight: 50 },
  //   ],
  // },
];

/** A running experiment by key, or null (unknown / off). */
export function getExperiment(key: string): Experiment | null {
  return EXPERIMENTS.find((e) => e.key === key && e.status === "running") ?? null;
}
