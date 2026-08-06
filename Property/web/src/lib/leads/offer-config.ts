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

export type OfferTier = "very_high" | "high" | "medium";

/** Tier rank for >= comparisons (higher = more valuable). */
const TIER_RANK: Record<string, number> = { low: 0, medium: 1, high: 2, very_high: 3 };

export function tierAtLeast(tier: string, floor: string): boolean {
  return (TIER_RANK[tier] ?? 0) >= (TIER_RANK[floor] ?? 0);
}

/** Sites whose leads are offered immediately on arrival. Default: none until armed. */
export function offeredSources(): string[] {
  return (process.env.LEAD_OFFER_SOURCES || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Per-tier price card in whole GBP, e.g. "medium:40,high:85,very_high:150".
 * A tier missing from the card is not sellable. Low is never sellable.
 */
export function tierPrice(tier: string): number | null {
  if (tier === "low") return null;
  const raw = process.env.LEAD_OFFER_PRICES || "medium:40,high:85,very_high:150";
  for (const part of raw.split(",")) {
    const [k, v] = part.split(":").map((s) => s.trim());
    if (k === tier) {
      const n = Number(v);
      return Number.isFinite(n) && n >= 0 ? Math.round(n) : null;
    }
  }
  return null;
}

/** Minimum tier offered to buyers at all (owner decision: medium and up). */
export function offerMinTier(): string {
  return (process.env.LEAD_OFFER_MIN_TIER || "medium").trim();
}

/** Fully automatic offer sends (Increment 7). Ships dark. */
export function offerAutoMode(): boolean {
  const v = (process.env.LEAD_OFFER_AUTO || "").trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

type LeadLike = { source?: string; is_test?: boolean };
type ScoreLike = { tier?: string } | null | undefined;

/**
 * Whether a freshly arrived lead qualifies for the immediate offer path.
 * Property is excluded here by design (READY-stage offers only).
 */
export function offerQualifies(lead: LeadLike, score: ScoreLike): boolean {
  if (lead.is_test) return false;
  const source = (lead.source ?? "").toLowerCase();
  if (!source || source === "property") return false;
  if (!offeredSources().includes(source)) return false;
  const tier = score?.tier ?? "";
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
