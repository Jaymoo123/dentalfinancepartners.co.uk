/**
 * Lead offer pipeline configuration: which leads qualify to be offered to
 * buyer firms, which buyers match a given lead, and the shared per-tier price
 * card. All knobs are env vars so pricing/scope changes need no deploy beyond
 * an env update.
 *
 * Property leads are never offered from the immediate notify path: they run
 * the nurture sequence and become offerable at the READY handoff stage only
 * (the handoff email carries the same offer link).
 */
import { adminSelect } from "@/lib/supabase/admin";
import {
  CASE_TIERS,
  DEFAULT_PRICE_CARD,
  LEGACY_TIER_MAP,
  TIER_RANK,
  type OfferTier,
} from "@/lib/leads/tiers";

export type { OfferTier };

export function tierAtLeast(tier: string, floor: string): boolean {
  return (
    (TIER_RANK[tier as OfferTier] ?? 0) >= (TIER_RANK[floor as OfferTier] ?? 0)
  );
}

/**
 * Resolve the sellable case tier for a value-score row: case_tier when
 * present, else the owner-approved legacy map for rows scored before the
 * case-tier migration. Null = not sellable (legacy low, or unmapped).
 */
export function offerTierFor(score: ScoreLike): OfferTier | null {
  const ct = score?.case_tier;
  if (ct && ct in CASE_TIERS) return ct as OfferTier;
  return LEGACY_TIER_MAP[score?.tier ?? ""] ?? null;
}

/** Sites whose leads are offered immediately on arrival. Default: none until armed. */
export function offeredSources(): string[] {
  return (process.env.LEAD_OFFER_SOURCES || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Per-tier price card in whole GBP, e.g. "essential:15,standard:40,advisory:85".
 * A tier missing from the card is not sellable.
 */
export function tierPrice(tier: string): number | null {
  const raw = process.env.LEAD_OFFER_PRICES || DEFAULT_PRICE_CARD;
  for (const part of raw.split(",")) {
    const [k, v] = part.split(":").map((s) => s.trim());
    if (k === tier) {
      const n = Number(v);
      return Number.isFinite(n) && n >= 0 ? Math.round(n) : null;
    }
  }
  return null;
}

/** Minimum case tier offered to buyers at all (owner decision: every tier). */
export function offerMinTier(): string {
  return (process.env.LEAD_OFFER_MIN_TIER || "essential").trim();
}

/**
 * Sources whose leads are offered only at the nurture READY/handoff stage,
 * never immediately on arrival (owner decision: READY-stage everywhere is the
 * end state; a site joins this list the day its nurture stack is armed).
 * Property is always READY-gated regardless of the env value.
 */
export function readyGatedSources(): string[] {
  const raw = process.env.LEAD_OFFER_READY_GATED_SOURCES ?? "property";
  const list = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (!list.includes("property")) list.push("property");
  return list;
}

/** Fully automatic offer sends (Increment 7). Ships dark. */
export function offerAutoMode(): boolean {
  const v = (process.env.LEAD_OFFER_AUTO || "").trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

type LeadLike = { source?: string; is_test?: boolean };
type ScoreLike = { tier?: string; case_tier?: string | null } | null | undefined;

/**
 * Whether a freshly arrived lead qualifies for the immediate offer path.
 * Property is excluded here by design (READY-stage offers only).
 */
export function offerQualifies(lead: LeadLike, score: ScoreLike): boolean {
  if (lead.is_test) return false;
  const source = (lead.source ?? "").toLowerCase();
  if (!source || readyGatedSources().includes(source)) return false;
  if (!offeredSources().includes(source)) return false;
  const tier = offerTierFor(score);
  if (tier === null) return false;
  if (!tierAtLeast(tier, offerMinTier())) return false;
  return tierPrice(tier) !== null;
}

export type LeadBuyer = {
  id: string;
  ref: string;
  firm_name: string;
  contact_name: string | null;
  email: string;
  status: string;
  sources: string[];
  min_tier: string;
};

/** Active buyers subscribed to this source whose tier floor the lead meets. */
export async function matchingBuyers(source: string, tier: string): Promise<LeadBuyer[]> {
  const res = await adminSelect<LeadBuyer>("lead_buyers", {
    select: "id,ref,firm_name,contact_name,email,status,sources,min_tier",
    status: "eq.active",
    sources: `cs.{${(source || "").toLowerCase()}}`,
  });
  if (!res.ok) return [];
  return res.data.filter((b) => tierAtLeast(tier, b.min_tier));
}
