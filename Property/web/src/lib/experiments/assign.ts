import { getExperiment } from "./registry";

/** djb2 string hash -> unsigned 32-bit. Stable across server + client. */
function hash(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Deterministic variant for a visitor + experiment. Same (visitor_id, key)
 * always yields the same variant. Returns null when the experiment is off /
 * unknown or there's no visitor_id (treat as control).
 */
export function assignVariant(visitorId: string, key: string): string | null {
  const exp = getExperiment(key);
  if (!exp || !visitorId) return null;
  const total = exp.variants.reduce((a, v) => a + v.weight, 0) || 1;
  let bucket = hash(`${visitorId}:${key}`) % total;
  for (const v of exp.variants) {
    if (bucket < v.weight) return v.id;
    bucket -= v.weight;
  }
  return exp.variants[0]?.id ?? null;
}
