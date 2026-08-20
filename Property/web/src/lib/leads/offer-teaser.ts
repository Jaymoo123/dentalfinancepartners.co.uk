/**
 * Anonymised buyer teaser for the lead offer pipeline.
 *
 * A teaser is what a prospective buyer sees BEFORE claiming: structured facts,
 * a one-line situation summary, and the enquiry in the enquirer's own words with
 * the identifying parts removed. Owner decision 2026-08-14: a firm decides on the
 * enquiry itself rather than on a summary of it, and receives the unredacted
 * enquiry and the contact details only if it claims.
 *
 * It must never contain PII. Owner decision 2026-08-20 (after the KAN.AI leak,
 * where regex redaction passed a company name and city verbatim): redaction is
 * two AI passes over the gateway, no regex anywhere.
 *   1. Structured fields (tier, intent, role, site) carry no PII by construction.
 *   2. redactEnquiry rewrites the message with identifiers tokenised and writes
 *      the situation line in the same call.
 *   3. verifyNoIdentifiers independently checks the exact strings that will
 *      render; anything not verified clean is withheld entirely.
 *
 * FAIL-CLOSED: if either pass is unavailable or unhappy, the teaser degrades to
 * structured facts only. No free text ever ships unverified.
 */
import { redactEnquiry, verifyNoIdentifiers } from "@/lib/ai";
import { adminSelect } from "@/lib/supabase/admin";
import { roleLabel, surfaceLabel } from "@/lib/leads/role-labels";
import { offerTierFor } from "@/lib/leads/offer-config";
import { CASE_TIERS, LEGACY_TIER_MAP, type OfferTier } from "@/lib/leads/tiers";

export type TeaserJson = {
  site: string;
  tier: string;
  /** Retired 2026-08-14, kept optional so teasers stored before then still parse. */
  est_band?: string;
  intent: string;
  work_type: string;
  role: string;
  surface: string;
  /** "YYYY-MM-DD HH:MM" UTC since 2026-08-19 (day-only on older teasers). */
  submitted_date: string;
  /** "Yes · Mon 6 Jul, afternoon" / "Yes" / "No" (absent on older teasers). */
  callback_booked?: string;
  situation?: string;
  /** The enquiry in the enquirer's own words, identifiers removed. */
  redacted_message?: string;
  backlog?: boolean;
};

type LeadLike = {
  id?: string;
  role?: string | null;
  message?: string | null;
  source?: string | null;
  submitted_at?: string | null;
  created_at?: string | null;
  extras?: Record<string, unknown> | null;
};

type ScoreLike = {
  tier: string;
  case_tier?: string | null;
  est_value_gbp?: number;
  intent?: string;
  work_type?: string;
};

export function prettySource(source?: string): string {
  if (!source) return "";
  return source
    .split(/[-_]/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

// estBand() removed 2026-08-14. The alert used to carry a banded estimate of what
// the enquirer might be worth. Nothing prices that way any more: the rubric grades
// on case type only and expressly keeps the internal value score out of anything
// buyer-facing (docs/CLASSIFY.md), and DSA Annex A does not list it as shared data.

/**
 * "Yes · Mon 6 Jul, afternoon" when a callback slot is booked (the booked
 * event's human label carries no PII), else "No". Best-effort: a failed read
 * omits the field rather than mislabelling.
 */
async function callbackBooked(leadId?: string): Promise<string | undefined> {
  if (!leadId) return undefined;
  try {
    const res = await adminSelect<{ meta: { start?: string } | null }>("lead_contact_events", {
      select: "meta",
      lead_id: `eq.${leadId}`,
      event_type: "eq.booked",
      order: "ts.desc",
      limit: "1",
    });
    if (!res.ok) return undefined;
    if (res.data.length === 0) return "No";
    const start = res.data[0]?.meta?.start;
    return typeof start === "string" && start ? `Yes · ${start}` : "Yes";
  } catch {
    return undefined;
  }
}

export async function buildTeaser(lead: LeadLike, score: ScoreLike): Promise<TeaserJson> {
  const submitted = lead.submitted_at || lead.created_at || "";
  const fid = typeof lead.extras?.form_id === "string" ? lead.extras.form_id : "";
  const teaser: TeaserJson = {
    site: prettySource(lead.source ?? undefined),
    // Buyer-facing tier is the case tier (legacy rows map via LEGACY_TIER_MAP);
    // the internal value-score tier never reaches a buyer.
    tier: offerTierFor(score) ?? "",
    intent: score.intent ?? "unknown",
    work_type: score.work_type ?? "unknown",
    role: roleLabel(lead.role) || "",
    surface: (fid && surfaceLabel(fid)) || "",
    // Date + time (UTC): buyers judge freshness by the hour, not the day.
    submitted_date: submitted ? submitted.slice(0, 16).replace("T", " ") : "",
  };
  const booked = await callbackBooked(lead.id);
  if (booked) teaser.callback_booked = booked;

  // Two-pass AI redaction, fail-closed: free text ships only when pass 1
  // produced it AND pass 2 verified the exact strings clean. Any failure or
  // doubt leaves the teaser structured-facts-only.
  const message = (lead.message ?? "").trim();
  if (message) {
    const redacted = await redactEnquiry({ message, role: lead.role ?? undefined });
    if (redacted) {
      const body = redacted.redacted_message.replace(/\s+/g, " ").trim().slice(0, 2000);
      const situation = redacted.situation.trim();
      const texts = [body, situation].filter(Boolean);
      if (texts.length > 0 && (await verifyNoIdentifiers(texts))) {
        if (body) teaser.redacted_message = body;
        if (situation) teaser.situation = situation;
      }
    }
  }
  return teaser;
}

/**
 * Buyer-facing tier labels. Legacy value-score ids (stored in old teaser
 * jsonb) map through to their case-tier label so an old id never renders.
 */
export function tierLabel(tier: string): string {
  const resolved: OfferTier | undefined =
    tier in CASE_TIERS ? (tier as OfferTier) : LEGACY_TIER_MAP[tier];
  return resolved ? CASE_TIERS[resolved].label : "";
}
