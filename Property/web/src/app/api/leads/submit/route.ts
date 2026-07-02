/**
 * Server chokepoint for Property lead submission. Replaces the client-side
 * direct-to-Supabase insert for the PHONE-bearing surfaces (contact form +
 * MiniCapture), giving us a place to verify, dedupe, and enrol before anything
 * else happens. Email-only surfaces (SpecialistWidget, ResourceGate) keep the
 * shared path.
 *
 * Flow:
 *   1. Honeypot -> store flagged (never silently lose a possible real lead) + skip.
 *   2. Server-side validation.
 *   3. Dedupe against a recent same-email/phone lead, else insert (service role).
 *   4. Real-time verification (Twilio Lookup + email), stored + logged.
 *   5. Enrol into the contactability sequence and fire the INSTANT touch
 *      synchronously (sub-5-minute speed-to-lead). Only on a brand-new enrolment,
 *      so a resubmit never re-fires step 0 or regresses the schedule.
 *   6. Return a verification verdict for the "verifying your details" UX.
 *
 * FAIL-SAFE: the lead is saved first; verification / enrolment / the instant
 * send are best-effort and never lose or block a lead. The existing AFTER INSERT
 * triggers (notify / enrich / sheets / stitch) still fire on the service-role
 * insert, so the operator heads-up and enrichment are unchanged.
 */

import { NextResponse, after } from "next/server";
import { adminConfigured, adminSelect, adminInsert, adminUpdate } from "@/lib/supabase/admin";
import { verifyLead } from "@/lib/leads/verify";
import { buildLeadChannelSender, leadNurtureArmed } from "@/lib/leads/channels";
import {
  buildPropertyLeadNurtureConfig,
  buildLeadMessageContext,
  LEAD_SEQUENCE_NAME,
} from "@/config/lead-nurture";
import { bestHourFromTimestamps } from "@/lib/leads/send-window";
import {
  processLeadStep,
  recordLeadContactEvent,
} from "@accounting-network/web-shared/lead-nurture/send";
import type { NurtureLead } from "@accounting-network/web-shared/lead-nurture/config";
import { mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { copyAiEnabled } from "@/lib/leads/sequence-gen";
import { getSiteUrl } from "@/config/niche-loader";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE = 10;
const DEDUPE_WINDOW_MS = 24 * 3_600_000;

function digits(s: string): number {
  return (s.match(/\d/g) || []).length;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: "Bad request" }, { status: 400 });
  }

  const honeypot = String(body.enquiry_ref ?? "").trim();
  const full_name = String(body.full_name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const role = String(body.role ?? "Other").trim() || "Other";
  const message = String(body.message ?? "").trim();
  const source = (String(body.source ?? "property").trim() || "property").toLowerCase();
  const isTest = source === "test";

  const baseRow = {
    full_name,
    email,
    phone,
    role,
    message,
    source,
    source_url: (body.source_url as string) ?? null,
    submitted_at: (body.submitted_at as string) ?? new Date().toISOString(),
    consent_given: body.consent_given ?? true,
    consent_text: (body.consent_text as string) ?? null,
    consent_at: (body.consent_at as string) ?? new Date().toISOString(),
    visitor_id: (body.visitor_id as string) ?? null,
    session_id: (body.session_id as string) ?? null,
    extras: (body.extras as Record<string, unknown>) ?? null,
  };

  if (!adminConfigured()) {
    return NextResponse.json(
      { success: false, error: "Service unavailable. Please try again shortly." },
      { status: 503 },
    );
  }

  // 1. Honeypot: suspected bot. Store it flagged (so a real lead caught by
  //    browser autofill is NEVER lost) but do not verify / nurture, and return a
  //    success shape so a bot gets no signal. This de-fangs the old silent-drop.
  if (honeypot) {
    try {
      await adminInsert("leads", {
        ...baseRow,
        extras: { ...(baseRow.extras ?? {}), honeypot: true, suspected_spam: true },
      });
    } catch (e) {
      console.error("[leads/submit] honeypot store failed", e);
    }
    return NextResponse.json({ success: true });
  }

  // 2. Validate.
  if (full_name.length < 2 || !EMAIL_RE.test(email) || digits(phone) < 10 || message.length < MIN_MESSAGE) {
    return NextResponse.json(
      { success: false, error: "Please complete your name, a valid email and phone, and a short message." },
      { status: 400 },
    );
  }

  // 3. Dedupe (best-effort) against a recent same-email/phone lead, else insert.
  //    A dedupe hiccup must NEVER lose a lead, so it is isolated from the insert.
  let leadId: string | null = null;
  let existingRow: { id: string; full_name: string; phone: string; message: string } | null = null;
  try {
    // Dedupe on email only. Email is regex-validated and (as a standalone eq
    // filter) safe; folding phone into an `or=(...)` group risked breaking the
    // PostgREST filter on stray characters, and stored phones are raw anyway.
    const since = new Date(Date.now() - DEDUPE_WINDOW_MS).toISOString();
    const existing = await adminSelect<{ id: string; full_name: string; phone: string; message: string }>("leads", {
      select: "id,full_name,phone,message",
      source: `eq.${source}`,
      email: `eq.${email}`,
      created_at: `gte.${since}`,
      order: "created_at.desc",
      limit: "1",
    });
    if (existing.data.length) {
      leadId = existing.data[0].id;
      existingRow = existing.data[0];
    }
  } catch (e) {
    console.error("[leads/submit] dedupe lookup failed (non-fatal)", e);
  }

  if (leadId) {
    try {
      // Adopt corrections: use the newly submitted value when non-empty, so a
      // resubmit can fix a wrong stored phone or populate an email-only prior
      // row (SpecialistWidget/ResourceGate inserts full_name:"", phone:"").
      // Append messages: combine so no context is lost; cap at 4 000 chars,
      // trimming from the front so the most recent context is always retained.
      const MAX_MSG = 4_000;
      const priorMsg = (existingRow?.message ?? "").trim();
      const newMsg   = message.trim();
      let mergedMessage: string;
      if (!priorMsg || priorMsg === newMsg) {
        mergedMessage = newMsg || priorMsg;
      } else {
        const combined = `${priorMsg}\n\n---\n${newMsg}`;
        mergedMessage = combined.length > MAX_MSG ? combined.slice(-MAX_MSG) : combined;
      }

      const dedupeUpdate: Record<string, unknown> = {
        message: mergedMessage,
        role,
        submitted_at: baseRow.submitted_at,
      };
      // Only include full_name / phone when the new submission is non-empty,
      // so a good stored value is never overwritten with a blank.
      if (full_name) dedupeUpdate.full_name = full_name;
      if (phone)     dedupeUpdate.phone    = phone;

      await adminUpdate("leads", { id: `eq.${leadId}` }, dedupeUpdate);
    } catch (e) {
      console.error("[leads/submit] dedupe update failed (non-fatal)", e);
    }
  } else {
    try {
      const ins = await adminInsert<{ id: string }>("leads", baseRow);
      if (!ins.ok || ins.data.length === 0) {
        return NextResponse.json(
          { success: false, error: "Could not save your enquiry. Please try again." },
          { status: 500 },
        );
      }
      leadId = ins.data[0].id;
    } catch (e) {
      console.error("[leads/submit] insert failed", e);
      return NextResponse.json(
        { success: false, error: "Could not save your enquiry. Please try again." },
        { status: 500 },
      );
    }
  }

  // 4. Real-time verification (best-effort, never blocks).
  let verifyPhone: string | undefined;
  let verifyEmail: string | undefined;
  try {
    const v = await verifyLead({ email, phone });
    verifyPhone = v.phone.status;
    verifyEmail = v.email.status;
    await adminInsert(
      "lead_verification",
      {
        lead_id: leadId,
        phone_status: v.phone.status,
        phone_line_type: v.phone.line_type,
        phone_carrier: v.phone.carrier,
        phone_e164: v.phone.e164,
        email_status: v.email.status,
        email_domain: v.email.domain,
        verify_pass: v.verify_pass,
        provider: v.provider,
        raw: v.raw,
      },
      { onConflict: "lead_id" },
    );
    await recordLeadContactEvent(leadId, v.verify_pass ? "verify_pass" : "verify_fail", "system", {
      phone: v.phone.status,
      email: v.email.status,
    });
  } catch (e) {
    console.error("[leads/submit] verification failed", e);
  }

  // 5. Enrol + fire the instant touch (only on a brand-new enrolment, and only
  //    when the system is ARMED). While dormant we save + verify but do NOT
  //    enrol, so no state accumulates and (critically) the high-impact instant
  //    touch is not "spent" as a skipped send before go-live.
  if (leadNurtureArmed()) {
    try {
      const nowIso = new Date().toISOString();

      // Best-effort: derive preferred send hour from prior web sessions
      let bestSendHour: number | null = null;
      if (baseRow.visitor_id) {
        try {
          const sessRes = await adminSelect<{ started_at: string }>("web_sessions", {
            select: "started_at",
            visitor_id: `eq.${baseRow.visitor_id}`,
            order: "started_at.desc",
            limit: "50",
          });
          const timestamps = sessRes.data.map((r) => r.started_at).filter(Boolean);
          bestSendHour = bestHourFromTimestamps(timestamps);
        } catch {
          // non-fatal
        }
      }

      const enrol = await adminInsert<{ lead_id: string }>(
        "lead_nurture_state",
        {
          lead_id: leadId,
          sequence: LEAD_SEQUENCE_NAME,
          step: 0,
          status: "active",
          next_action_at: nowIso,
          ...(bestSendHour !== null ? { best_send_hour: bestSendHour } : {}),
        },
        { onConflict: "lead_id,sequence", ignoreDuplicates: true },
      );
      const newlyEnrolled = enrol.ok && enrol.data.length > 0;
      if (newlyEnrolled) {
        await adminUpdate("leads", { id: `eq.${leadId}`, status: "eq.new" }, { status: "nurturing" });
        const config = buildPropertyLeadNurtureConfig();
        const sender = buildLeadChannelSender({ live: !isTest });
        const lead: NurtureLead = { id: leadId, full_name, email, phone, role, source, message };
        const stateRow = { lead_id: leadId, step: 0, generated_copy: null, copy_status: null, best_send_hour: bestSendHour };
        const ctx = await buildLeadMessageContext(lead, stateRow);
        await processLeadStep(lead, 0, config, sender, ctx);
        // Fire step 1 (SMS) synchronously when we are inside the send window:
        // maximum speed-to-lead at the moment of highest intent. When outside the
        // window the nextActionAt hook already scheduled step 1 at the window open
        // so the cron will fire it at the right time.
        if (ctx.inSmsWindow) {
          await processLeadStep(lead, 1, config, sender, ctx);
        }

        // Fire-and-forget: generate personalised AI copy for later touches.
        // Uses after() (Next.js 15+) so the response is not blocked and the
        // serverless function is kept alive until the fetch dispatches.
        if (copyAiEnabled()) {
          const seqUrl = `${getSiteUrl().replace(/\/$/, "")}/api/leads/generate-sequence`;
          const internalToken = process.env.LEAD_NURTURE_TOKEN_SECRET ?? "";
          after(() => {
            void fetch(seqUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-internal-token": internalToken,
              },
              body: JSON.stringify({ leadId }),
            }).catch(() => {});
          });
        }
      }
    } catch (e) {
      console.error("[leads/submit] enrol/instant-touch failed", e);
    }
  }

  // Signed booking token so the thank-you page can offer the native slot picker
  // immediately (highest-intent moment). Best-effort: needs the token secret.
  let bookingToken: string | undefined;
  if (leadId) {
    try {
      bookingToken = mintLeadToken(leadId, "book");
    } catch {
      /* LEAD_NURTURE_TOKEN_SECRET unset -> thank-you page just omits the picker */
    }
  }

  return NextResponse.json({
    success: true,
    leadId,
    bookingToken,
    verify: verifyPhone && verifyEmail ? { phone: verifyPhone, email: verifyEmail } : undefined,
  });
}
