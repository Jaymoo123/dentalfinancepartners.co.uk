/**
 * Bridge between useExperiment() and the analytics tracker. Components register
 * their active assignment here; track() reads it and stamps `exp` onto every
 * event's props, so experiment exposure is recorded without extra calls.
 */
const active = new Map<string, string>(); // experiment key -> variant id

export function setActiveExperiment(key: string, variant: string): void {
  active.set(key, variant);
}

/** Serialized active assignments ("key:variant,key2:variant2"), or undefined. */
export function activeExperimentString(): string | undefined {
  if (active.size === 0) return undefined;
  return Array.from(active.entries())
    .map(([k, v]) => `${k}:${v}`)
    .join(",");
}
