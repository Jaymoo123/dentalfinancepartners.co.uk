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

// No last-call price: owner decision 2026-08-14 removed the reduced price for an
// unclaimed lead, so a lead holds its published price until it leaves the lane.
export const CASE_TIERS: Record<
  OfferTier,
  { id: OfferTier; label: string; price: number }
> = {
  advisory: { id: "advisory", label: "Advisory", price: 85 },
  standard: { id: "standard", label: "Standard", price: 40 },
  essential: { id: "essential", label: "Essential", price: 15 },
};

/**
 * Shared-claim cap and exclusive price multiplier (owner-locked 2026-08-12).
 * Leads are shared up to the cap; an exclusive claim at multiplier x price
 * locks the lead if no firm has claimed yet. Not yet wired into the live
 * pipeline (single-firm delivery until the pool launches); mirrored here so
 * the drift test keeps the constants honest when it is.
 */
export const CLAIM_SLOTS_PER_LEAD = 3;
export const EXCLUSIVE_MULTIPLIER = 3;

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
