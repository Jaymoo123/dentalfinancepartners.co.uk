import type { Experiment } from "./types";

/**
 * Pure, registry-decoupled assignment engine.
 *
 * This module knows nothing about any site registry. The caller passes the
 * Experiment object directly so the same hash + bucketing logic can be used
 * by every site without coupling to a shared mutable singleton.
 *
 * Assignment continuity contract (SACRED):
 *   - djb2 hash, seeded with "${visitorId}:${key}"
 *   - unsigned 32-bit output via >>> 0
 *   - bucket = hash % totalWeight
 *   - variants walked in declaration order; first whose weight > bucket wins
 * Any change to the algorithm would break running experiments. The golden
 * continuity suite in assign.test.ts pins real (visitorId, key) -> variant
 * triples computed from Property's live implementation before the lift.
 */

/** djb2 string hash -> unsigned 32-bit. Stable across server + client. */
function hash(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Deterministic variant for a visitor + experiment.
 *
 * Same (visitorId, experiment.key) always yields the same variant. Returns
 * null when the experiment is off / unknown or there is no visitorId (treat
 * as control on the calling side).
 *
 * @param visitorId  The stable visitor identifier (v_... format). Empty string
 *                   or falsy returns null (treat as control).
 * @param experiment The Experiment object from the site registry. Pass null /
 *                   undefined to get null back (unknown or off experiment).
 */
export function assignVariant(
  visitorId: string,
  experiment: Experiment | null | undefined,
): string | null {
  if (!experiment || !visitorId) return null;
  const total = experiment.variants.reduce((a, v) => a + v.weight, 0) || 1;
  let bucket = hash(`${visitorId}:${experiment.key}`) % total;
  for (const v of experiment.variants) {
    if (bucket < v.weight) return v.id;
    bucket -= v.weight;
  }
  return experiment.variants[0]?.id ?? null;
}
