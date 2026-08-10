/**
 * Case-type tier constants for the lead offer pipeline.
 *
 * Hand-written mirror of config/tiers.json (the canonical, owner-signed
 * config). Kept as constants because Next.js bundles cannot fs-read the repo
 * root at runtime; src/tests/tiers-drift.test.ts asserts these values equal
 * the JSON, so any tiers.json change breaks the build until this file is
 * updated. Rubric: docs/CLASSIFY.md. Pricing: docs/LEAD_PRICING.md.
 */

export type OfferTier = "advisory" | "standard" | "essential";

export const CASE_TIERS: Record<
  OfferTier,
  { id: OfferTier; label: string; price: number; lastCallPrice: number }
> = {
  advisory: { id: "advisory", label: "Advisory", price: 85, lastCallPrice: 55 },
  standard: { id: "standard", label: "Standard", price: 40, lastCallPrice: 25 },
  essential: { id: "essential", label: "Essential", price: 15, lastCallPrice: 10 },
};

/** Tier rank for >= comparisons (higher = more valuable). */
export const TIER_RANK: Record<OfferTier, number> = {
  essential: 0,
  standard: 1,
  advisory: 2,
};

/** Default per-tier price card, overridable via LEAD_OFFER_PRICES. */
export const DEFAULT_PRICE_CARD = "essential:15,standard:40,advisory:85";

/**
 * Owner-approved fallback for legacy lead_value_scores rows that predate
 * case_tier (price parity with the old £85/£40 card). Legacy "low" is absent
 * by design: low leads were never sellable and stay unsellable.
 */
export const LEGACY_TIER_MAP: Record<string, OfferTier> = {
  very_high: "advisory",
  high: "advisory",
  medium: "standard",
};
