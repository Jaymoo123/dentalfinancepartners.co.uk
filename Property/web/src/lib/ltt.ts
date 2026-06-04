/**
 * Land Transaction Tax (Wales), 2026/27.
 * Locked from docs/property/house_positions.md §23.1–23.2 (gov.wales, verified
 * 2026-05-23):
 *   Main residential: 0% to 225k, 6% 225k–400k, 7.5% 400k–750k, 10% 750k–1.5m, 12% above.
 *   Higher rates (additional property) are a STANDALONE band structure, not a
 *   surcharge stacked on the main rates:
 *     5% to 180k, 8.5% 180k–250k, 10% 250k–400k, 12.5% 400k–750k, 15% 750k–1.5m, 17% above.
 *   Wales has no first-time-buyer relief (the £225k nil band already covers most).
 */
type Band = { upTo: number; rate: number };

const MAIN: Band[] = [
  { upTo: 225_000, rate: 0 },
  { upTo: 400_000, rate: 0.06 },
  { upTo: 750_000, rate: 0.075 },
  { upTo: 1_500_000, rate: 0.1 },
  { upTo: Infinity, rate: 0.12 },
];

const HIGHER: Band[] = [
  { upTo: 180_000, rate: 0.05 },
  { upTo: 250_000, rate: 0.085 },
  { upTo: 400_000, rate: 0.1 },
  { upTo: 750_000, rate: 0.125 },
  { upTo: 1_500_000, rate: 0.15 },
  { upTo: Infinity, rate: 0.17 },
];

function marginal(price: number, bands: Band[]): number {
  let prev = 0;
  let tax = 0;
  for (const b of bands) {
    if (price <= prev) break;
    const upper = Math.min(price, b.upTo);
    tax += (upper - prev) * b.rate;
    prev = upper;
  }
  return tax;
}

export interface LttInputs {
  price: number;
  additional: boolean;
}

export interface LttResult {
  tax: number;
  effectiveRate: number;
}

export function computeLtt(i: LttInputs): LttResult {
  const bands = i.additional ? HIGHER : MAIN;
  const tax = marginal(i.price, bands);
  const effectiveRate = i.price > 0 ? (tax / i.price) * 100 : 0;
  return { tax, effectiveRate };
}
