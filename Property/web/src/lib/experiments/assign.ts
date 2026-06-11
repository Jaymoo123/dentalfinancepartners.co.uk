/**
 * Property experiment assignment -- re-export shim.
 *
 * Preserves the original `assignVariant(visitorId, key)` signature that
 * Property components rely on (key is a string, registry lookup is internal).
 * Delegates to the shared pure `assignVariant` + the Property registry.
 *
 * Source of truth: packages/web-shared/experiments/assign.ts
 */
import {
  assignVariant as _sharedAssign,
} from "@accounting-network/web-shared/experiments/assign";
import { getExperiment } from "./registry";

/**
 * Deterministic variant for a visitor + experiment. Same (visitor_id, key)
 * always yields the same variant. Returns null when the experiment is off /
 * unknown or there's no visitor_id (treat as control).
 */
export function assignVariant(visitorId: string, key: string): string | null {
  const exp = getExperiment(key);
  return _sharedAssign(visitorId, exp);
}
