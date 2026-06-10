/**
 * Land and Buildings Transaction Tax (Scotland), 2026/27.
 * Locked from docs/property/house_positions.md §23.4–23.5 (Revenue Scotland,
 * verified 2026-05-23):
 *   Main residential: 0% to 145k, 2% 145k–250k, 5% 250k–325k, 10% 325k–750k, 12% above.
 *   First-time-buyer relief: nil band raised to 175k (max saving £600).
 *   Additional Dwelling Supplement (ADS): 8% of the WHOLE price (since 5 Dec 2024),
 *     with a £40,000 de-minimis (no ADS where the price is below £40,000).
 */
type Band = { upTo: number; rate: number };

const MAIN: Band[] = [
  { upTo: 145_000, rate: 0 },
  { upTo: 250_000, rate: 0.02 },
  { upTo: 325_000, rate: 0.05 },
  { upTo: 750_000, rate: 0.1 },
  { upTo: Infinity, rate: 0.12 },
];

const FTB: Band[] = [
  { upTo: 175_000, rate: 0 },
  { upTo: 250_000, rate: 0.02 },
  { upTo: 325_000, rate: 0.05 },
  { upTo: 750_000, rate: 0.1 },
  { upTo: Infinity, rate: 0.12 },
];

export const ADS_RATE = 0.08;
export const ADS_MIN_PRICE = 40_000;

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

export interface LbttInputs {
  price: number;
  additional: boolean;
  firstTimeBuyer: boolean;
}

export interface LbttResult {
  main: number;
  ads: number;
  total: number;
  effectiveRate: number;
}

export function computeLbtt(i: LbttInputs): LbttResult {
  const bands = i.firstTimeBuyer && !i.additional ? FTB : MAIN;
  const main = marginal(i.price, bands);
  const ads = i.additional && i.price >= ADS_MIN_PRICE ? i.price * ADS_RATE : 0;
  const total = main + ads;
  const effectiveRate = i.price > 0 ? (total / i.price) * 100 : 0;
  return { main, ads, total, effectiveRate };
}
