/**
 * Telegram message builders + senders for the lead-ops bot. Transport is
 * lib/telegram.ts; this module owns the content rules:
 *
 *   Lead content in a message is limited to: the enquirer's INITIALS (owner
 *   decision 2026-08-19: readable without putting a name through a US chat
 *   platform the privacy policies do not list), the buyer-redacted teaser,
 *   and the rubric intent_line. NEVER full names, phone numbers, emails,
 *   postcodes or raw enquiry text. Buyer replies are quoted truncated.
 *
 * Every sender returns a boolean and never throws: callers fall back to the
 * existing operator email paths when Telegram is down.
 */
import { sendTelegram, type InlineKeyboard } from "@/lib/telegram";
import { adminSelect } from "@/lib/supabase/admin";
import { renderTeaserText } from "@/lib/leads/offer-send";
import { tierPrice, matchingBuyers } from "@/lib/leads/offer-config";
import { tierLabel, buildTeaser, type TeaserJson } from "@/lib/leads/offer-teaser";
import { escapeHtml } from "@/lib/leads/notify-email";
import type { GradeResult } from "@/lib/leads/case-tier";

/** Short id handle for a lead in bot copy (uniqueness when names collide). */
export function leadRef(leadId: string): string {
  return `L-${leadId.slice(0, 8)}`;
}

/** "Jane Doe" -> "J.D." */
export function initialsOf(fullName?: string | null): string {
  return (fullName ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => `${w[0].toUpperCase()}.`)
    .join("");
}

/**
 * "J.D. (L-3848b527)" — initials for readability, id for uniqueness.
 * Falls back to the bare ref on any read problem.
 */
export async function leadLabel(leadId: string): Promise<string> {
  try {
    const res = await adminSelect<{ full_name: string | null }>("leads", {
      select: "full_name",
      id: `eq.${leadId}`,
      limit: "1",
    });
    const initials = initialsOf(res.ok ? res.data[0]?.full_name : "");
    return initials ? `${initials} (${leadRef(leadId)})` : leadRef(leadId);
  } catch {
    return leadRef(leadId);
  }
}

/** Tier picker row (shared with the webhook's [Change tier] re-render). */
export function tierPickerKeyboard(leadId: string, withBack = false): InlineKeyboard {
  const rows: InlineKeyboard = [
    [
      { text: `Advisory £${tierPrice("advisory") ?? "?"}`, callback_data: `ts:a:${leadId}` },
      { text: `Standard £${tierPrice("standard") ?? "?"}`, callback_data: `ts:s:${leadId}` },
      { text: `Essential £${tierPrice("essential") ?? "?"}`, callback_data: `ts:e:${leadId}` },
    ],
  ];
  if (withBack) rows.push([{ text: "Back", callback_data: `tp0:${leadId}` }]);
  return rows;
}

/** Standard verified-lead keyboard (shared with the webhook's tier re-render). */
export function verifiedKeyboard(leadId: string, tier: string): InlineKeyboard {
  return [
    [{ text: `Send to pool £${tierPrice(tier) ?? "?"}`, callback_data: `sp:${leadId}` }],
    [
      { text: "Change tier", callback_data: `tp:${leadId}` },
      { text: "Hold", callback_data: `hold:${leadId}` },
      { text: "Bin", callback_data: `bin:${leadId}` },
    ],
  ];
}

type ScoreLikeRow = {
  tier: string | null;
  case_tier: string | null;
  intent: string | null;
  work_type: string | null;
};

/**
 * Render the verified-lead approval message. Returns the text + keyboard so
 * the webhook's tier-picker flow can re-render the same message in place.
 */
export async function buildVerifiedMessage(
  leadId: string,
  grade: GradeResult,
): Promise<{ text: string; buttons: InlineKeyboard } | null> {
  const [leadRes, scoreRes] = await Promise.all([
    adminSelect<{
      id: string;
      full_name: string | null;
      role: string | null;
      message: string | null;
      source: string | null;
      submitted_at: string | null;
      created_at: string | null;
      extras: Record<string, unknown> | null;
      is_test: boolean | null;
    }>("leads", {
      select: "id,full_name,role,message,source,submitted_at,created_at,extras,is_test",
      id: `eq.${leadId}`,
      limit: "1",
    }),
    adminSelect<ScoreLikeRow>("lead_value_scores", {
      select: "tier,case_tier,intent,work_type",
      lead_id: `eq.${leadId}`,
      limit: "1",
    }),
  ]);
  const lead = leadRes.ok ? leadRes.data[0] : undefined;
  if (!lead) return null;
  // Test leads never reach the owner's phone (house rule: test traffic stays
  // out of every operator surface).
  if (lead.is_test || lead.source === "test") return null;
  const score = scoreRes.ok ? scoreRes.data[0] : undefined;

  const teaser: TeaserJson = await buildTeaser(lead, {
    tier: score?.tier ?? "",
    case_tier: grade.tier,
    intent: score?.intent ?? undefined,
    work_type: score?.work_type ?? undefined,
  });

  const price = tierPrice(grade.tier);
  const aiDown = grade.source === "deterministic";
  const initials = initialsOf(lead.full_name);
  const label = escapeHtml(initials ? `${initials} (${leadRef(leadId)})` : leadRef(leadId));
  const header = aiDown
    ? `<b>Lead verified: ${label}</b>\nAI grading unavailable. Pick the tier yourself (keyword guess: ${escapeHtml(tierLabel(grade.tier) || grade.tier)}).`
    : `<b>Lead verified: ${label}</b>\nSuggested tier: <b>${escapeHtml(tierLabel(grade.tier) || grade.tier)}</b> £${price ?? "?"}${grade.caseType ? ` · ${escapeHtml(grade.caseType)}` : ""}${grade.intentLine ? `\nWhy: ${escapeHtml(grade.intentLine)}` : ""}`;

  // Sending goes to every matching signed firm, so the ping says how many.
  let poolLine = "";
  try {
    const pool = await matchingBuyers((lead.source ?? "").toLowerCase(), grade.tier);
    poolLine = `\nPool: ${pool.length} matching firm${pool.length === 1 ? "" : "s"}`;
  } catch {
    // best-effort; the count is informational
  }

  const text = `${header}${poolLine}\n\n<pre>${escapeHtml(renderTeaserText(teaser, price))}</pre>`;

  // AI down: no one-tap send; the owner's tier pick IS the classification and
  // the send happens from the re-rendered message after picking.
  const buttons: InlineKeyboard = aiDown
    ? [
        ...tierPickerKeyboard(leadId),
        [
          { text: "Hold", callback_data: `hold:${leadId}` },
          { text: "Bin", callback_data: `bin:${leadId}` },
        ],
      ]
    : verifiedKeyboard(leadId, grade.tier);
  return { text, buttons };
}

export async function notifyLeadVerified(leadId: string, grade: GradeResult): Promise<boolean> {
  const msg = await buildVerifiedMessage(leadId, grade);
  if (!msg) return false;
  return sendTelegram(msg.text, msg.buttons);
}

export async function notifyClaimHeld(
  offer: { id: string; lead_id: string; price_gbp: number },
  buyerFirm: string,
  opts?: { nudge?: boolean },
): Promise<boolean> {
  const label = escapeHtml(await leadLabel(offer.lead_id));
  const head = opts?.nudge
    ? `<b>Still waiting on you:</b> ${escapeHtml(buyerFirm)} claimed ${label} over an hour ago and the details are NOT yet released.`
    : `<b>${escapeHtml(buyerFirm)} claimed ${label}</b> for £${offer.price_gbp}.\nRelease the full contact details?`;
  return sendTelegram(head, [
    [
      { text: `Release details £${offer.price_gbp}`, callback_data: `rel:${offer.id}` },
      { text: "Credit", callback_data: `crm:${offer.id}` },
    ],
  ]);
}

/** Max chars of a buyer reply quoted into Telegram (business text, not lead PII). */
const BUYER_REPLY_QUOTE_LIMIT = 300;

export async function notifyBuyerReply(
  buyerFirm: string,
  body: string,
  offers: Array<{ id: string; lead_id: string; price_gbp: number; tier?: string }>,
  subject?: string,
): Promise<boolean> {
  const quoted = (body || "").replace(/\s+/g, " ").trim().slice(0, BUYER_REPLY_QUOTE_LIMIT);
  const subjectLine = subject?.trim()
    ? `\nReplying to: <i>${escapeHtml(subject.trim().slice(0, 120))}</i>`
    : "";
  const head = `<b>${escapeHtml(buyerFirm)} replied by email:</b>\n<i>${escapeHtml(quoted || "(empty message)")}</i>${subjectLine}`;
  if (offers.length === 0) {
    return sendTelegram(`${head}\n\nNo open offers for this firm. Reply from your inbox if it needs an answer.`);
  }
  const buttons: InlineKeyboard = [];
  for (const o of offers) {
    buttons.push([
      {
        text: `Claim & release ${await leadLabel(o.lead_id)} · £${o.price_gbp}${o.tier ? ` (${tierLabel(o.tier) || o.tier})` : ""}`,
        callback_data: `br:${o.id}`,
      },
    ]);
  }
  buttons.push([{ text: "Ignore", callback_data: `ign:${offers[0].id}` }]);
  return sendTelegram(
    `${head}\n\nOpen offer${offers.length > 1 ? "s" : ""} for this firm below. Claiming releases full details immediately.`,
    buttons,
  );
}

export async function notifyExpiredOffer(offer: {
  id: string;
  lead_id: string;
  price_gbp: number;
}): Promise<boolean> {
  return sendTelegram(
    `<b>Offer expired unclaimed:</b> ${escapeHtml(await leadLabel(offer.lead_id))} (£${offer.price_gbp}).`,
    [[{ text: "Re-offer for 24h", callback_data: `ro:${offer.id}` }]],
  );
}

export async function notifyRawEligible(split: {
  noNurture: string[];
  nurturing: string[];
}): Promise<boolean> {
  const n = split.noNurture.length;
  const m = split.nurturing.length;
  const lines = [
    `<b>Raw batch check:</b> ${n + m} lead${n + m === 1 ? "" : "s"} unverified past 24h.`,
    `${n} not in nurture, ${m} still mid-nurture (selling those ends their chase and any tiered sale).`,
  ];
  const buttons: InlineKeyboard = [];
  if (n > 0) buttons.push([{ text: `Send batch (${n} non-nurturing)`, callback_data: "rb:s" }]);
  if (m > 0) buttons.push([{ text: `Include mid-nurture too (${n + m})`, callback_data: "rb:n" }]);
  buttons.push([
    { text: "Pick individually", callback_data: "rb:p" },
    { text: "Skip today", callback_data: "rb:k" },
  ]);
  return sendTelegram(lines.join("\n"), buttons);
}

export async function notifySuppliedLeadResponded(leadId: string): Promise<boolean> {
  return sendTelegram(
    `<b>Heads-up:</b> ${escapeHtml(await leadLabel(leadId))} was already sold in a raw batch and has now responded. It stays with the raw buyer; no tiered offer will be made and no automated reply was sent.`,
  );
}
