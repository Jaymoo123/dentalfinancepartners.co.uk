/**
 * Telegram webhook for the lead-ops approval bot.
 *
 * Auth, two layers: the X-Telegram-Bot-Api-Secret-Token header must match
 * TELEGRAM_WEBHOOK_SECRET (set at setWebhook time; timing-safe compare, 503
 * when unset, 401 on mismatch), and the update's chat id must equal
 * TELEGRAM_CHAT_ID (anything else is logged and silently dropped, so the bot
 * never confirms its own existence to strangers).
 *
 * Every button handler takes its conditional DB transition FIRST and treats
 * zero updated rows as "stale tap": Telegram delivers callbacks at least
 * once and old messages keep live buttons forever, so idempotency lives in
 * the DB guards, never in chat state. Always returns 200 (a non-2xx makes
 * Telegram redeliver into the same failure).
 *
 * callback_data grammar: verb[:arg]:uuid, always <= 64 bytes (one uuid max).
 */

import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { adminConfigured, adminInsert, adminSelect, adminUpdate } from "@/lib/supabase/admin";
import {
  answerCallbackQuery,
  editMessageReplyMarkup,
  ownerChatId,
  sendTelegram,
  webhookSecret,
} from "@/lib/telegram";
import { isBotPaused, setBotPaused } from "@/lib/leads/nurture-control";
import { claimOffer, creditOffer, releaseClaimedOffer } from "@/lib/leads/offer-release";
import { reofferExpired, sendOffers } from "@/lib/leads/offer-send";
import { buildTeaser, tierLabel } from "@/lib/leads/offer-teaser";
import { offerTierFor, tierPrice } from "@/lib/leads/offer-config";
import { setOwnerTier } from "@/lib/leads/case-tier";
import { tierPickerKeyboard, verifiedKeyboard, leadLabel } from "@/lib/leads/bot-notify";
import { eligibleRawLeads, supplyRawLeads, rawPriceGbp } from "@/lib/leads/raw-supply";
import { isSuppressed } from "@/lib/leads/suppression";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
import type { CaseTier } from "@/lib/ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function authorized(req: NextRequest): { ok: boolean; status: number } {
  const secret = webhookSecret();
  if (!secret) return { ok: false, status: 503 };
  const header = req.headers.get("x-telegram-bot-api-secret-token") ?? "";
  try {
    const a = Buffer.from(header.padEnd(256, "\0"), "utf8");
    const b = Buffer.from(secret.padEnd(256, "\0"), "utf8");
    if (a.length !== b.length) return { ok: false, status: 401 };
    return timingSafeEqual(a, b) ? { ok: true, status: 200 } : { ok: false, status: 401 };
  } catch {
    return { ok: false, status: 401 };
  }
}

// ── Update shapes (only the fields we read) ──────────────────────────────────

type TgUpdate = {
  message?: { chat?: { id?: number }; text?: string };
  callback_query?: {
    id: string;
    data?: string;
    message?: { message_id?: number; chat?: { id?: number } };
  };
};

function ok200(body?: unknown): NextResponse {
  return NextResponse.json(body ?? { ok: true }, { status: 200 });
}

// ── Callback handlers ────────────────────────────────────────────────────────

type Toast = { toast: string; stripButtons?: boolean };

const CREDIT_MAP = {
  sb: "spam_bot",
  du: "duplicate_30d",
  wc: "wrong_category",
  dc: "dead_contact",
} as const;

async function handleSendToPool(leadId: string): Promise<Toast> {
  const [leadRes, scoreRes] = await Promise.all([
    adminSelect<{
      id: string;
      role: string | null;
      message: string | null;
      source: string | null;
      status: string | null;
      submitted_at: string | null;
      created_at: string | null;
      extras: Record<string, unknown> | null;
      is_test: boolean | null;
    }>("leads", {
      select: "id,role,message,source,status,submitted_at,created_at,extras,is_test",
      id: `eq.${leadId}`,
      limit: "1",
    }),
    adminSelect<{ tier: string | null; case_tier: string | null; intent: string | null; work_type: string | null }>(
      "lead_value_scores",
      { select: "tier,case_tier,intent,work_type", lead_id: `eq.${leadId}`, limit: "1" },
    ),
  ]);
  const lead = leadRes.ok ? leadRes.data[0] : undefined;
  const score = scoreRes.ok ? scoreRes.data[0] : undefined;
  if (!lead) return { toast: "Lead not found." };
  if (lead.is_test || lead.source === "test") return { toast: "Test lead, never offered." };
  // A binned lead (handleBin writes 'closed') must never re-enter the pool.
  if (lead.status === "closed") return { toast: "Lead is closed/binned." };
  const tier = offerTierFor({ tier: score?.tier ?? "", case_tier: score?.case_tier });
  if (!tier) return { toast: "No tier set. Tap Change tier first." };

  const teaser = await buildTeaser(lead, {
    tier: score?.tier ?? "",
    case_tier: score?.case_tier,
    intent: score?.intent ?? undefined,
    work_type: score?.work_type ?? undefined,
  });
  const result = await sendOffers(leadId, (lead.source ?? "").toLowerCase(), teaser);
  if (result.offered > 0) {
    return {
      toast: `Offered to ${result.offered} buyer${result.offered === 1 ? "" : "s"} at £${tierPrice(tier) ?? "?"}.`,
      stripButtons: true,
    };
  }
  if (result.matched > 0) return { toast: "Already offered to every matching buyer." };
  // sendOffers may name why it sent nothing; read defensively (field is optional
  // and lands from offer-send separately), fall back to the generic toast.
  const reasonToast: Record<string, string> = {
    suppressed: "Blocked: enquirer opted out",
    "raw-supplied": "Blocked: already raw-supplied",
    consent: "Blocked: stored consent wording not recognised - check the site's consent copy",
    "no-price": "No price for this tier",
    "no-buyers": "No matching signed buyers",
  };
  const reason = (result as { reason?: string }).reason;
  if (reason && reasonToast[reason]) return { toast: reasonToast[reason] };
  return { toast: "Not offered: no eligible buyer, or the lead is blocked (suppressed/supplied/consent)." };
}

async function handleSetTier(leadId: string, code: string): Promise<Toast & { keyboard?: ReturnType<typeof verifiedKeyboard> }> {
  const tier: CaseTier | undefined =
    code === "a" ? "advisory" : code === "s" ? "standard" : code === "e" ? "essential" : undefined;
  if (!tier) return { toast: "Unknown tier." };
  const okWrite = await setOwnerTier(leadId, tier);
  if (!okWrite) return { toast: "Could not save the tier, try again." };
  return {
    toast: `Tier set: ${tierLabel(tier) || tier} £${tierPrice(tier) ?? "?"}.`,
    keyboard: verifiedKeyboard(leadId, tier),
  };
}

async function handleBin(leadId: string): Promise<Toast> {
  const res = await adminUpdate<{ id: string }>(
    "leads",
    { id: `eq.${leadId}`, status: "in.(new,nurturing,contactable)" },
    { status: "closed" },
  );
  if (!res.ok) return { toast: "DB error, try again." };
  if (res.data.length === 0) return { toast: "Cannot bin: the lead has moved on (offered/forwarded?)." };
  // A binned lead must not stay claimable: withdraw its open offers too.
  const withdrawn = await adminUpdate<{ id: string }>(
    "lead_offers",
    { lead_id: `eq.${leadId}`, status: "eq.offered" },
    { status: "lost" },
  );
  const n = withdrawn.ok ? withdrawn.data.length : 0;
  if (n > 0) {
    return { toast: `Binned. ${n} open offer${n === 1 ? "" : "s"} withdrawn.`, stripButtons: true };
  }
  return { toast: "Binned. It will not be offered.", stripButtons: true };
}

async function handleRelease(offerId: string): Promise<Toast> {
  const result = await releaseClaimedOffer(offerId);
  if (result.already) return { toast: "Already released (or not claimable).", stripButtons: true };
  if (result.released) {
    return { toast: `Released to ${result.buyerFirm ?? "the buyer"}.`, stripButtons: true };
  }
  return { toast: "Release email FAILED. Check the email alert and forward manually.", stripButtons: true };
}

async function handleClaimForBuyer(offerId: string): Promise<Toast> {
  const { outcome, offer } = await claimOffer(offerId);
  if (outcome !== "claimed") {
    const msg: Record<string, string> = {
      lost: "That lead is closed (exclusive lock or withdrawn).",
      allocated: "That lead has reached its allocation cap.",
      "exclusive-unavailable": "Exclusive is no longer available on that lead.",
      expired: "That offer has expired. Re-offer it from the expiry alert.",
      "not-offered": "That offer is no longer open.",
      suppressed: "The enquirer has objected; the offer was withdrawn.",
      "buyer-ineligible": "The buyer is paused or has no signed agreement.",
      error: "Could not load the offer, try again.",
    };
    return { toast: msg[outcome] ?? "Not claimable.", stripButtons: outcome !== "error" };
  }
  // The owner's tap IS the release approval on this path.
  const release = await releaseClaimedOffer(offerId);
  if (release.released) {
    return {
      toast: `Claimed and released to ${release.buyerFirm ?? "the buyer"} at £${offer?.price_gbp ?? "?"}.`,
      stripButtons: true,
    };
  }
  return {
    toast: "Claimed, but the release email FAILED. Check the email alert.",
    stripButtons: true,
  };
}

/** The unbilled fallback buyer for expired leads (owner decision 2026-08-20). */
const SID_BUYER_REF = "sidekick";

/**
 * [Send to Sid] on an expiry alert: hand the full lead, free, to the unbilled
 * fallback buyer. Straight release, no accept step (owner decision 2026-08-20).
 * The (lead_id, buyer_id) unique key is the idempotency latch; the DSA gate on
 * the buyer row stays load-bearing exactly as on the paid path.
 */
async function handleSendToSid(offerId: string): Promise<Toast> {
  const res = await adminSelect<{ id: string; lead_id: string; status: string; teaser: unknown }>(
    "lead_offers",
    { select: "id,lead_id,status,teaser", id: `eq.${offerId}`, limit: "1" },
  );
  if (!res.ok || res.data.length === 0) return { toast: "Could not load the offer, try again." };
  const offer = res.data[0];
  if (offer.status !== "expired") {
    return { toast: "Only an expired offer can go to Sid.", stripButtons: true };
  }

  // DSA clause 3.5: an objection between expiry and this tap kills the referral.
  if (await isSuppressed(offer.lead_id)) {
    return { toast: "The enquirer has objected; nothing sent.", stripButtons: true };
  }

  const buyerRes = await adminSelect<{ id: string; status: string; dsa_signed_at: string | null }>(
    "lead_buyers",
    { select: "id,status,dsa_signed_at", ref: `eq.${SID_BUYER_REF}`, limit: "1" },
  );
  const sid = buyerRes.ok ? buyerRes.data[0] : undefined;
  if (!sid || sid.status !== "active" || !sid.dsa_signed_at) {
    return { toast: "Sid's buyer row is missing, paused or unsigned; nothing sent." };
  }

  // A lead that sold (or was claimed then credited as bad) never goes to Sid.
  // Test-buyer claims (owner's shadow inbox, Sid himself) are QA/contingency,
  // not sales, so they neither block the hand-off nor break the double-tap
  // latch below (2026-08-20 fix: QA-walk claims wrongly blocked two leads).
  const sold = await adminSelect<{ id: string; buyer_id: string }>("lead_offers", {
    select: "id,buyer_id",
    lead_id: `eq.${offer.lead_id}`,
    status: "in.(claimed,credited)",
  });
  const testBuyers = await adminSelect<{ id: string }>("lead_buyers", {
    select: "id",
    is_test: "eq.true",
  });
  const testIds = new Set((testBuyers.ok ? testBuyers.data : []).map((b) => b.id));
  if (sold.ok && sold.data.some((r) => !testIds.has(r.buyer_id))) {
    return { toast: "This lead was claimed by a buyer; not sending to Sid.", stripButtons: true };
  }

  const ins = await adminInsert<{ id: string }>(
    "lead_offers",
    [
      {
        lead_id: offer.lead_id,
        buyer_id: sid.id,
        teaser: offer.teaser,
        status: "claimed",
        claimed_at: new Date().toISOString(),
        expires_at: new Date().toISOString(),
        price_gbp: 0,
      },
    ],
    { onConflict: "lead_id,buyer_id", ignoreDuplicates: true },
  );
  if (!ins.ok) return { toast: "DB error, try again." };
  if (ins.data.length === 0) return { toast: "Already sent to Sid.", stripButtons: true };

  // Sid owns the relationship now: halt nurture, record the hand-off (same
  // shape as claimOffer; failure never blocks the release).
  try {
    await adminUpdate(
      "lead_nurture_state",
      { lead_id: `eq.${offer.lead_id}` },
      { status: "stopped", next_action_at: null, updated_at: new Date().toISOString() },
    );
    await recordLeadContactEvent(offer.lead_id, "handed_off", "system", {
      reason: "sid_free_handoff",
      offer_id: ins.data[0].id,
      buyer_id: sid.id,
    });
  } catch (err) {
    console.error("[telegram/webhook] sid nurture halt failed", err);
  }

  const release = await releaseClaimedOffer(ins.data[0].id);
  if (release.released) return { toast: "Full details sent to Sid, free.", stripButtons: true };
  return {
    toast: "Latched for Sid but the release email FAILED. Check the email alert.",
    stripButtons: true,
  };
}

async function handleReoffer(offerId: string): Promise<Toast> {
  const result = await reofferExpired(offerId);
  const map: Record<string, Toast> = {
    reoffered: { toast: "Re-offered for 24h.", stripButtons: true },
    stale: { toast: "Already re-offered or claimed.", stripButtons: true },
    blocked: { toast: "Blocked: enquirer objected, lead supplied, or buyer ineligible.", stripButtons: true },
    error: { toast: "Could not re-offer, try again." },
  };
  return map[result];
}

async function handleRawSend(includeNurturing: boolean): Promise<string> {
  const split = await eligibleRawLeads();
  const ids = includeNurturing
    ? [...split.noNurture, ...split.nurturing].map((l) => l.id)
    : split.noNurture.map((l) => l.id);
  if (ids.length === 0) return "Nothing eligible any more (leads verify, object or age out).";
  const result = await supplyRawLeads(ids);
  if (result.supplied === 0) {
    return result.reason === "no-raw-buyer"
      ? "No raw buyer configured (LEAD_RAW_BUYER_REF) or the buyer is unsigned/paused."
      : "Nothing supplied: every candidate dropped out at the send-time re-check.";
  }
  const delivery = result.emailSent
    ? `emailed to ${result.buyerFirm}`
    : `LATCHED for ${result.buyerFirm} but the EMAIL FAILED, see the email alert`;
  return `Raw batch: ${result.supplied} lead${result.supplied === 1 ? "" : "s"} ${delivery} at £${rawPriceGbp()} each${result.skipped ? ` (${result.skipped} skipped)` : ""}${result.remaining ? ` (${result.remaining} remaining, tap again)` : ""}.`;
}

async function handleRawPick(): Promise<string> {
  const split = await eligibleRawLeads();
  const all = [...split.noNurture, ...split.nurturing];
  if (all.length === 0) return "Nothing eligible any more.";
  const price = rawPriceGbp();
  let sent = 0;
  for (const lead of all.slice(0, 10)) {
    const ageHours = Math.round((Date.now() - Date.parse(lead.created_at)) / 3600_000);
    const nurturing = split.nurturing.some((l) => l.id === lead.id);
    const okSend = await sendTelegram(
      `${await leadLabel(lead.id)} · ${lead.source} · ${ageHours}h old${nurturing ? " · mid-nurture" : ""}`,
      [[{ text: `Supply £${price}`, callback_data: `rs:${lead.id}` }]],
    );
    if (okSend) sent++;
  }
  return `Sent ${sent} pick message${sent === 1 ? "" : "s"}${all.length > 10 ? ` (first 10 of ${all.length})` : ""}.`;
}

async function handleRawSupplyOne(leadId: string): Promise<Toast> {
  const result = await supplyRawLeads([leadId]);
  if (result.supplied === 1) {
    return {
      toast: result.emailSent
        ? `Supplied to ${result.buyerFirm} at £${rawPriceGbp()}.`
        : `Latched for ${result.buyerFirm} but the EMAIL FAILED, see the email alert.`,
      stripButtons: true,
    };
  }
  return { toast: "Not supplied: already supplied, verified meanwhile, objected, or no raw buyer.", stripButtons: true };
}

// ── Commands ─────────────────────────────────────────────────────────────────

async function statusText(): Promise<string> {
  const [contactable, offered, held, split, paused] = await Promise.all([
    adminSelect<{ id: string }>("leads", { select: "id", status: "eq.contactable", limit: "100" }),
    adminSelect<{ id: string }>("lead_offers", { select: "id", status: "eq.offered", limit: "100" }),
    adminSelect<{ id: string }>("lead_offers", {
      select: "id",
      status: "eq.claimed",
      released_at: "is.null",
      limit: "100",
    }),
    eligibleRawLeads(),
    isBotPaused(),
  ]);
  const n = (r: { ok: boolean; data: unknown[] }) => (r.ok ? r.data.length : NaN);
  return [
    `<b>Pipeline</b>${paused ? " · BOT PAUSED" : ""}`,
    `Verified, not yet offered: ${n(contactable)}`,
    `Open offers: ${n(offered)}`,
    `Claimed, awaiting your release: ${n(held)}`,
    `Raw-eligible: ${split.noNurture.length} (+${split.nurturing.length} mid-nurture)`,
  ].join("\n");
}

async function monthText(arg?: string): Promise<string> {
  const now = new Date();
  const month =
    arg && /^\d{4}-\d{2}$/.test(arg)
      ? arg
      : `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const [y, m] = [Number(month.slice(0, 4)), Number(month.slice(5, 7))];
  const next = `${y + (m === 12 ? 1 : 0)}-${String((m % 12) + 1).padStart(2, "0")}-01`;

  // Two filters on the same column need a PostgREST and=() group, because the
  // adminSelect params object is a flat map (one key per column).
  const offersRes = await adminSelect<{
    buyer_id: string;
    status: string;
    price_gbp: number;
    released_at: string | null;
  }>("lead_offers", {
    select: "buyer_id,status,price_gbp,released_at",
    status: "in.(claimed,credited)",
    and: `(claimed_at.gte.${month}-01,claimed_at.lt.${next})`,
    limit: "2000",
  });
  let offers = offersRes.ok ? offersRes.data : [];

  // Test buyers (owner's own inbox rows) never appear in a money view.
  const testBuyers = await adminSelect<{ id: string }>("lead_buyers", {
    select: "id",
    is_test: "eq.true",
  });
  if (testBuyers.ok && testBuyers.data.length > 0) {
    const testIds = new Set(testBuyers.data.map((b) => b.id));
    offers = offers.filter((o) => !testIds.has(o.buyer_id));
  }

  const supplyRes = await adminSelect<{ price_gbp: number }>("lead_supply", {
    select: "price_gbp",
    and: `(supplied_at.gte.${month}-01,supplied_at.lt.${next})`,
    limit: "2000",
  });
  const supplies = supplyRes.ok ? supplyRes.data : [];

  let gross = 0;
  let credits = 0;
  let unreleased = 0;
  for (const o of offers) {
    if (o.status === "credited") credits += o.price_gbp;
    else if (o.released_at) gross += o.price_gbp;
    else unreleased++;
  }
  const rawTotal = supplies.reduce((s, r) => s + r.price_gbp, 0);
  return [
    `<b>${month}</b> (invoice view; python script is the source of truth)`,
    `Claimed and released: £${gross}`,
    `Credits: -£${credits}`,
    `Raw supplies: £${rawTotal}`,
    `Net: £${gross - credits + rawTotal}`,
    unreleased ? `⚠ ${unreleased} claimed offer(s) NOT released, excluded. Release or credit them.` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

// ── Route ────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!adminConfigured()) return NextResponse.json({ ok: false }, { status: 503 });
  const auth = authorized(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false }, { status: auth.status });
  }

  let update: TgUpdate;
  try {
    update = (await req.json()) as TgUpdate;
  } catch {
    return ok200();
  }

  const allowedChat = ownerChatId();

  // ── Inline button taps ──
  const cb = update.callback_query;
  if (cb) {
    const chatId = String(cb.message?.chat?.id ?? "");
    if (!allowedChat || chatId !== allowedChat) {
      console.warn("[telegram/webhook] callback from non-allowlisted chat", chatId);
      return ok200();
    }
    const data = cb.data ?? "";
    const messageId = cb.message?.message_id;
    const parts = data.split(":");
    const verb = parts[0];
    const id = parts[parts.length - 1];
    const arg = parts.length === 3 ? parts[1] : undefined;

    // Slow verbs answer immediately and report by follow-up message; quick
    // verbs answer once with the result toast.
    try {
      if (!UUID_RE.test(id) && !["rb"].includes(verb)) {
        await answerCallbackQuery(cb.id, "This button has expired. Use /status.");
        return ok200();
      }

      switch (verb) {
        case "sp": {
          await answerCallbackQuery(cb.id, "Sending to the pool...");
          const result = await handleSendToPool(id);
          if (result.stripButtons && messageId) await editMessageReplyMarkup(messageId, []);
          await sendTelegram(`${await leadLabel(id)}: ${result.toast}`);
          break;
        }
        case "tp": {
          if (messageId) await editMessageReplyMarkup(messageId, tierPickerKeyboard(id, true));
          await answerCallbackQuery(cb.id);
          break;
        }
        case "tp0": {
          const scoreRes = await adminSelect<{ tier: string | null; case_tier: string | null }>(
            "lead_value_scores",
            { select: "tier,case_tier", lead_id: `eq.${id}`, limit: "1" },
          );
          const tier = offerTierFor({
            tier: scoreRes.ok ? (scoreRes.data[0]?.tier ?? "") : "",
            case_tier: scoreRes.ok ? scoreRes.data[0]?.case_tier : null,
          });
          if (tier && messageId) await editMessageReplyMarkup(messageId, verifiedKeyboard(id, tier));
          await answerCallbackQuery(cb.id);
          break;
        }
        case "ts": {
          const result = await handleSetTier(id, arg ?? "");
          if (result.keyboard && messageId) await editMessageReplyMarkup(messageId, result.keyboard);
          await answerCallbackQuery(cb.id, result.toast);
          break;
        }
        case "hold": {
          if (messageId) await editMessageReplyMarkup(messageId, []);
          await answerCallbackQuery(cb.id, "Held. Find it later with /status.");
          break;
        }
        case "bin": {
          const result = await handleBin(id);
          if (result.stripButtons && messageId) await editMessageReplyMarkup(messageId, []);
          await answerCallbackQuery(cb.id, result.toast);
          break;
        }
        case "rel": {
          const result = await handleRelease(id);
          if (result.stripButtons && messageId) await editMessageReplyMarkup(messageId, []);
          await answerCallbackQuery(cb.id, result.toast);
          break;
        }
        case "crm": {
          if (messageId) {
            await editMessageReplyMarkup(messageId, [
              [
                { text: "Spam/bot", callback_data: `cr:sb:${id}` },
                { text: "Duplicate", callback_data: `cr:du:${id}` },
              ],
              [
                { text: "Wrong category", callback_data: `cr:wc:${id}` },
                { text: "Dead contact", callback_data: `cr:dc:${id}` },
              ],
              [{ text: "Back", callback_data: `relm:${id}` }],
            ]);
          }
          await answerCallbackQuery(cb.id);
          break;
        }
        case "relm": {
          const offerRes = await adminSelect<{ price_gbp: number }>("lead_offers", {
            select: "price_gbp",
            id: `eq.${id}`,
            limit: "1",
          });
          const price = offerRes.ok ? offerRes.data[0]?.price_gbp : undefined;
          if (messageId) {
            await editMessageReplyMarkup(messageId, [
              [
                { text: `Release details${price ? ` £${price}` : ""}`, callback_data: `rel:${id}` },
                { text: "Credit", callback_data: `crm:${id}` },
              ],
            ]);
          }
          await answerCallbackQuery(cb.id);
          break;
        }
        case "cr": {
          const reason = CREDIT_MAP[arg as keyof typeof CREDIT_MAP];
          if (!reason) {
            await answerCallbackQuery(cb.id, "Unknown credit reason.");
            break;
          }
          const credited = await creditOffer(id, reason);
          if (credited && messageId) await editMessageReplyMarkup(messageId, []);
          await answerCallbackQuery(
            cb.id,
            credited ? `Credited (${reason}).` : "Not creditable (already credited or never claimed).",
          );
          break;
        }
        case "br": {
          await answerCallbackQuery(cb.id, "Claiming and releasing...");
          const result = await handleClaimForBuyer(id);
          if (result.stripButtons && messageId) await editMessageReplyMarkup(messageId, []);
          await sendTelegram(result.toast);
          break;
        }
        case "ign": {
          if (messageId) await editMessageReplyMarkup(messageId, []);
          await answerCallbackQuery(cb.id, "Ignored.");
          break;
        }
        case "sid": {
          const result = await handleSendToSid(id);
          if (result.stripButtons && messageId) await editMessageReplyMarkup(messageId, []);
          await answerCallbackQuery(cb.id, result.toast);
          break;
        }
        case "ro": {
          const result = await handleReoffer(id);
          if (result.stripButtons && messageId) await editMessageReplyMarkup(messageId, []);
          await answerCallbackQuery(cb.id, result.toast);
          break;
        }
        case "rb": {
          const sub = id; // rb has no uuid; the last segment is the subcommand
          if (sub === "k") {
            if (messageId) await editMessageReplyMarkup(messageId, []);
            await answerCallbackQuery(cb.id, "Skipped today. Tomorrow's check runs as normal.");
            break;
          }
          if (sub === "p") {
            await answerCallbackQuery(cb.id, "Listing...");
            const summary = await handleRawPick();
            await sendTelegram(summary);
            break;
          }
          if (sub === "s" || sub === "n") {
            await answerCallbackQuery(cb.id, "Building the batch...");
            const summary = await handleRawSend(sub === "n");
            if (messageId) await editMessageReplyMarkup(messageId, []);
            await sendTelegram(summary);
            break;
          }
          await answerCallbackQuery(cb.id, "This button has expired.");
          break;
        }
        case "rs": {
          const result = await handleRawSupplyOne(id);
          if (result.stripButtons && messageId) await editMessageReplyMarkup(messageId, []);
          await answerCallbackQuery(cb.id, result.toast);
          break;
        }
        default:
          await answerCallbackQuery(cb.id, "This button has expired. Use /status.");
      }
    } catch (err) {
      console.error("[telegram/webhook] callback handler failed", verb, err);
      await answerCallbackQuery(cb.id, "Something went wrong, try again.").catch(() => {});
    }
    return ok200();
  }

  // ── Commands ──
  const msg = update.message;
  if (msg?.text) {
    const chatId = String(msg.chat?.id ?? "");
    if (!allowedChat) {
      // First-time setup: surface the chat id in logs so the owner can set
      // TELEGRAM_CHAT_ID, but act on nothing.
      console.warn("[telegram/webhook] message received with TELEGRAM_CHAT_ID unset; sender chat id:", chatId);
      return ok200();
    }
    if (chatId !== allowedChat) {
      console.warn("[telegram/webhook] message from non-allowlisted chat", chatId);
      return ok200();
    }
    const text = msg.text.trim();
    const [cmd, cmdArg] = text.split(/\s+/, 2);
    try {
      switch (cmd.replace(/@.*$/, "")) {
        case "/start":
          await sendTelegram("Lead-ops bot connected. Commands: /status /month /pause /resume");
          break;
        case "/status":
          await sendTelegram(await statusText());
          break;
        case "/month":
          await sendTelegram(await monthText(cmdArg));
          break;
        case "/pause":
          await setBotPaused(true);
          await sendTelegram(
            "Bot paused. Claims auto-release again (published real-time terms), no prompts until /resume.",
          );
          break;
        case "/resume":
          await setBotPaused(false);
          await sendTelegram("Bot resumed. Prompts and release-holds are back on.");
          break;
        default:
          await sendTelegram("Commands: /status /month [YYYY-MM] /pause /resume");
      }
    } catch (err) {
      console.error("[telegram/webhook] command failed", cmd, err);
    }
    return ok200();
  }

  return ok200();
}
