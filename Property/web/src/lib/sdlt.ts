/**
 * Stamp Duty Land Tax (England & Northern Ireland) — single source of truth.
 * Figures locked from docs/property/house_positions.md §1 (from 1 April 2025):
 *   Standard bands: 0% to 125k, 2% 125k-250k, 5% 250k-925k, 10% 925k-1.5m, 12% above.
 *   Additional-dwelling surcharge: +5% of the whole price (from 31 Oct 2024).
 *   First-time-buyer relief: 0% to 300k, 5% 300k-500k, withdrawn if price > 500k.
 * Used by the SDLT calculator and the incorporation calculator so the two can
 * never disagree on the SDLT figure.
 */
export type SdltBand = { upTo: number; rate: number };

export const STANDARD_SDLT_BANDS: SdltBand[] = [
  { upTo: 125_000, rate: 0 },
  { upTo: 250_000, rate: 0.02 },
  { upTo: 925_000, rate: 0.05 },
  { upTo: 1_500_000, rate: 0.1 },
  { upTo: Infinity, rate: 0.12 },
];

export const FTB_SDLT_BANDS: SdltBand[] = [
  { upTo: 300_000, rate: 0 },
  { upTo: 500_000, rate: 0.05 },
  { upTo: Infinity, rate: 0.12 }, // not reached: FTB relief withdrawn >500k (handled by caller)
];

/** Additional-dwelling surcharge (buy-to-let, second home, or company purchase). */
export const ADDITIONAL_DWELLING_SURCHARGE = 0.05;

/** Marginal SDLT across the given bands (each rate applies only to its slice). */
export function marginalSdlt(price: number, bands: SdltBand[] = STANDARD_SDLT_BANDS): number {
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

/**
 * SDLT on an additional dwelling: standard bands PLUS the 5% surcharge on the
 * whole price. This is the figure a company pays when a rental is transferred
 * into it (a genuine property-letting company is relieved from the 15% Sch 4A
 * rate, so it pays standard rates plus the surcharge).
 */
export function additionalDwellingSdlt(price: number): number {
  return marginalSdlt(price, STANDARD_SDLT_BANDS) + price * ADDITIONAL_DWELLING_SURCHARGE;
}

/**
 * SDLT for a first-time buyer (England & NI). Relief gives 0% to £300,000 and 5%
 * on £300,001–£500,000, but is fully withdrawn once the price exceeds £500,000,
 * in which case standard rates apply.
 */
export function firstTimeBuyerSdlt(price: number): number {
  if (price > 500_000) return marginalSdlt(price, STANDARD_SDLT_BANDS);
  return marginalSdlt(price, FTB_SDLT_BANDS);
}
