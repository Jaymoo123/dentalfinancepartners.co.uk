/**
 * Lead -> email notification webhook.
 *
 * Receives a Supabase database webhook (pg_net trigger) fired on INSERT into the
 * shared `leads` table, verifies a shared secret header, and emails the new lead
 * as a pre-formatted HTML table to the internal notification inbox. The intent is
 * a "forward-ready" email: open it, forward it to the partner firm, done. No
 * Supabase export, no spreadsheet.
 *
 * Runs independently of the Google Sheets sync (`/api/leads/sync`): each is its
 * own trigger, so an email failure never affects the Sheet and vice versa. The
 * lead is already durably stored in Supabase before this fires, so a send failure
 * never loses a lead, it just needs a re-send.
 *
 * Covers every site (one shared `leads` table; the `source` column distinguishes
 * them), so the same endpoint + trigger serves property, dentists, medical,
 * solicitors, generalist, agency and contractors-ir35.
 *
 * Buyer offer pipeline: when a lead qualifies (sellable tier, offered vertical,
 * non-Property), the notify email additionally carries the anonymised buyer
 * teaser and a one-click "Offer to buyers" action link (scanner-safe confirm
 * page behind it). With LEAD_OFFER_AUTO=1 the offer is sent to buyers directly
 * with no owner click. Offer machinery is wrapped so it can never break the
 * plain notification.
 */
import { NextResponse, type NextRequest } from "next/server";
import crypto from "node:crypto";
import { getResend, getFromAddress } from "@/lib/resend";
import { resolveLeadCc, resolveLeadTo, ccExcludedSources } from "@/lib/lead-routing";
import { scoreLeadValue } from "@/lib/leads/value-score";
import {
  buildLeadHtml,
  buildLeadText,
  prettySource,
  type LeadRecord,
} from "@/lib/leads/notify-email";
import { offerQualifies, offerAutoMode, offerTierFor, tierPrice } from "@/lib/leads/offer-config";
import { buildTeaser, tierLabel } from "@/lib/leads/offer-teaser";
import {
  sendOffers,
  renderTeaserHtml,
  renderTeaserText,
  offerBaseUrl,
} from "@/lib/leads/offer-send";
import { mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";

export const runtime = "nodejs";
export const maxDuration = 60;

type WebhookPayload = {
  type?: string;
  table?: string;
  schema?: string;
  record?: LeadRecord;
};

function secretsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// ---------------------------------------------------------------------------
// Buyer offer block (appended to the owner notify email)
// ---------------------------------------------------------------------------

type OfferBlock = { html: string; text: string };

/**
 * Scores the lead and, when it qualifies for the buyer pipeline, returns the
 * teaser + action link block for the owner email (or sends offers directly in
 * auto mode). Never throws; any failure returns null and the plain notify email
 * goes out unchanged. Non-qualifying leads still get scored (fire-and-forget,
 * exactly the old behaviour).
 */
async function buildOfferBlock(r: LeadRecord): Promise<OfferBlock | null> {
  try {
    const score = await scoreLeadValue(r);
    if (!score || !offerQualifies(r, score)) return null;

    const teaser = await buildTeaser(r, score);
    const offerTier = offerTierFor(score) ?? "";
    const price = tierPrice(offerTier);

    if (offerAutoMode()) {
      const result = await sendOffers(r.id!, (r.source ?? "").toLowerCase(), teaser);
      const line =
        result.offered > 0
          ? `Auto-offered to ${result.offered} buyer${result.offered === 1 ? "" : "s"}: ${result.buyers.join(", ")}.`
          : result.matched > 0
            ? "Auto-offer attempted but no buyer emails were sent (already offered or send failure, check logs)."
            : "Auto-offer skipped: no active buyers subscribe to this vertical/tier.";
      return {
        html: `<p style="margin:24px 0 6px;color:#94a3b8;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Buyer pipeline</p>
               <p style="margin:0;color:#334155;font-size:14px;">${line}</p>`,
        text: `BUYER PIPELINE\n${line}`,
      };
    }

    const offerUrl = `${offerBaseUrl()}/api/leads/offer/${mintLeadToken(r.id!, "offer")}`;
    return {
      html: `<p style="margin:24px 0 6px;color:#94a3b8;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Buyer teaser (${tierLabel(offerTier)}${price !== null ? ` · £${price}` : ""})</p>
             ${renderTeaserHtml(teaser, price)}
             <table role="presentation" cellpadding="0" cellspacing="0" style="margin:16px 0 0;"><tr><td style="border-radius:6px;background-color:#0f172a;">
               <a href="${offerUrl}" style="display:inline-block;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:6px;">Offer to buyers</a>
             </td></tr></table>`,
      text: `BUYER TEASER (${tierLabel(offerTier)}${price !== null ? `, £${price}` : ""})\n${renderTeaserText(teaser, price)}\n\nOffer to buyers: ${offerUrl}`,
    };
  } catch (err) {
    console.error("leads/notify: offer block failed", err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------

// Health probe: confirms the route is deployed and whether env is wired,
// without leaking any secret values.
export async function GET() {
  return NextResponse.json({
    ok: true,
    secretSet: Boolean(process.env.LEADS_NOTIFY_SECRET || process.env.LEADS_SYNC_SECRET),
    resendSet: Boolean(process.env.RESEND_API_KEY),
    notifyTo: Boolean(process.env.LEADS_NOTIFY_TO),
    notifyToProperty: Boolean(process.env.LEADS_NOTIFY_TO_PROPERTY),
    ccSet: Boolean(process.env.LEADS_NOTIFY_CC),
    // Sites NOT copied to the partner firm (Property by default).
    ccExcludeSources: ccExcludedSources(),
  });
}

export async function POST(req: NextRequest) {
  // Reuse the existing sync secret by default so no new env var is required;
  // a dedicated LEADS_NOTIFY_SECRET takes precedence if set.
  const expected = process.env.LEADS_NOTIFY_SECRET || process.env.LEADS_SYNC_SECRET;
  if (!expected) {
    console.error("leads/notify: no LEADS_NOTIFY_SECRET / LEADS_SYNC_SECRET set");
    return NextResponse.json({ ok: false, error: "Not configured" }, { status: 503 });
  }
  const provided = req.headers.get("x-webhook-secret") || "";
  if (!secretsMatch(provided, expected)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = (await req.json()) as WebhookPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (payload.type && payload.type !== "INSERT") {
    return NextResponse.json({ ok: true, skipped: "not-insert" });
  }
  if (payload.table && payload.table !== "leads") {
    return NextResponse.json({ ok: true, skipped: "not-leads" });
  }

  const r = payload.record;
  if (!r || !r.email) {
    return NextResponse.json({ ok: false, error: "No record" }, { status: 400 });
  }

  if (r.is_test) {
    return NextResponse.json({ ok: true, skipped: "test-lead" });
  }

  // Scoring + buyer offer preparation. Both branches now AWAIT the score:
  // the old fire-and-forget (`void scoreLeadValue(r).catch(() => {})`) is the
  // proven cause of 193/193 leads being graded manually - the route returned
  // before the promise settled, Vercel froze the invocation, and the catch
  // swallowed the evidence. Scoring adds ~1-2s to a webhook nobody is waiting
  // on; a loud failure here is Sentry-visible and the email still sends.
  const source = (r.source ?? "").toLowerCase();
  let offerBlock: OfferBlock | null = null;
  if (source && source !== "property" && source !== "test") {
    offerBlock = await buildOfferBlock(r);
  } else {
    await scoreLeadValue(r).catch((err) =>
      console.error("[notify] scoreLeadValue failed", err),
    );
  }

  // Recipient is source-aware (this one route serves every site): Property's own
  // leads go to the Ashfield Trading inbox (junayd@ashfieldtrading.com); every
  // other site keeps going to the shared internal inbox (junaydmoughal@hotmail.co.uk).
  // The rule lives in resolveLeadTo.
  const to = resolveLeadTo(r.source);
  // Partner (Property Tax Partners) is copied on leads from every site except
  // synthetic test leads (owner instruction 2026-09-01). The rule lives in
  // resolveLeadCc (LEADS_NOTIFY_CC_EXCLUDE_SOURCES, defaults to "test"); an
  // empty list here means no CC header is sent.
  const cc = resolveLeadCc(r.source);
  const partnerCopied = cc.length > 0;
  const nurtureBanner = !partnerCopied && source === "property";
  const subject = `New ${prettySource(r.source) || "website"} lead${r.full_name ? `: ${r.full_name}` : ""}`;

  try {
    const { error } = await getResend().emails.send({
      from: getFromAddress(),
      to,
      ...(cc.length ? { cc } : {}),
      subject,
      html: buildLeadHtml(r, { nurtureBanner, extraHtml: offerBlock?.html }),
      text: buildLeadText(r, { nurtureBanner, extraText: offerBlock?.text }),
      // No reply-to: the lead's address is never placed in the email headers,
      // so the lead can never be contacted from this notification.
    });
    if (error) {
      console.error("leads/notify: resend error", error);
      return NextResponse.json({ ok: false, error: "Send failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("leads/notify: send threw", err);
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
