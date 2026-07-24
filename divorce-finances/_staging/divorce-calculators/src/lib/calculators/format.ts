/**
 * Re-exports the shared formatting helpers (same pattern as construction-cis
 * and wills-probate).
 */
export { gbp, pct } from "@accounting-network/web-shared/tools/format";

/** "£X to £Y" band formatter used across the fleet. No dashes, house style. */
import { gbp as gbpFn } from "@accounting-network/web-shared/tools/format";
export function gbpRange(low: number, high: number): string {
  if (low === high) return gbpFn(low);
  return `${gbpFn(low)} to ${gbpFn(high)}`;
}
