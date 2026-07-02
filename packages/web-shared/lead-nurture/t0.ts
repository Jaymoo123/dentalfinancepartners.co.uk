/**
 * T0 first-touch A/B experiment split.
 *
 * Deterministic FNV-1a hash of the lead UUID, so the same lead always maps to
 * the same variant (retries are stable) AND the split can be recomputed offline
 * or in the console from the lead id alone, with no persisted variant column.
 * This is the single source of truth for the split; Property's copy layer and
 * the console readout both import it so the two can never diverge.
 */

export type T0Variant = "t0_branded" | "t0_personal";

function fnv1a32(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

/** Stable A/B bucket for the T0 experiment from the lead UUID. */
export function t0Variant(leadId: string): T0Variant {
  return fnv1a32(leadId) % 2 === 0 ? "t0_branded" : "t0_personal";
}
