/**
 * Shared experiment registry types + a mutable default registry.
 *
 * The SDK ships an empty registry. Sites that run experiments call
 * registerExperiments(EXPERIMENTS) early (e.g. in their layout) to populate it.
 * Property's full registry stays in Property until it adopts the shared SDK.
 */

export type Variant = { id: string; weight: number };
export type Experiment = {
  key: string;
  status: "running" | "off";
  variants: Variant[];
};

const registry: Experiment[] = [];

/** Register the site's experiments. Replaces any previously registered set. */
export function registerExperiments(exps: Experiment[]): void {
  registry.splice(0, registry.length, ...exps);
}

/** A running experiment by key, or null (unknown / off). */
export function getExperiment(key: string): Experiment | null {
  return registry.find((e) => e.key === key && e.status === "running") ?? null;
}

/** All running experiments. */
export function runningExperiments(): Experiment[] {
  return registry.filter((e) => e.status === "running");
}
