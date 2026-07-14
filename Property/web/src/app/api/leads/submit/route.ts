/**
 * Server chokepoint for Property lead submission. Replaces the client-side
 * direct-to-Supabase insert, giving us a place to verify, dedupe, and enrol
 * before anything else happens.
 *
 * Two capture modes:
 *   - "full" (default): name + phone + email + message (the contact form +
 *     MiniCapture). Enrols into the contactability sequence.
 *   - "email_only": email + message, with name/phone optional (the "Ask a
 *     specialist" widget). Validation is relaxed to email + message; the lead is
 *     routed by its missing contact fields into the detail-capture sequence,
 *     which collects the missing name/phone before it can be forwarded.
 * The ResourceGate download surface keeps the shared direct-insert path (Annex
 * B.2 in-house consent, never forwarded, so intentionally not nurtured here).
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
import { enrollLead } from "@/lib/leads/enroll";
import { routePrimarySequence, LEAD_SEQUENCE_NAMES } from "@/config/lead-nurture";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
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
  // Capture mode: "email_only" relaxes validation to email + message (name/phone
  // optional) for the "Ask a specialist" widget; anything else is the full form.
  const emailOnly = String(body.captureMode ?? "full").trim() === "email_only";

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

  // 1. Honeypot: tag-only. Every hit in history was a real human caught by
  //    browser autofill (2 hits, 0 bots, 2026-07-13), so the lead proceeds
  //    through the normal pipeline (verify + nurture + notify); the tag is kept
  //    purely for monitoring. Upgrade path if real bot spam ever appears:
  //    Vercel BotID.
  if (honeypot) {
    baseRow.extras = { ...(baseRow.extras ?? {}), honeypot: true };
  }

  // 2. Validate. email_only requires just a valid email + a short message (name
  //    and phone are collected later by the detail-capture sequence); the full
  //    form still requires name + phone too, so the phone-bearing surfaces are
  //    not weakened.
  const validationFails = emailOnly
    ? !EMAIL_RE.test(email) || message.length < MIN_MESSAGE
    : full_name.length < 2 || !EMAIL_RE.test(email) || digits(phone) < 10 || message.length < MIN_MESSAGE;
  if (validationFails) {
    return NextResponse.json(
      {
        success: false,
        error: emailOnly
          ? "Please enter a valid email and a short message."
          : "Please complete your name, a valid email and phone, and a short message.",
      },
      { status: 400 },
    );
  }

  // 3. Dedupe (best-effort) against a recent same-email/phone lead, else insert.
  //    A dedupe hiccup must NEVER lose a lead, so it is isolated from the insert.
  let leadId: string | null = null;
  let existingRow: { id: string; full_name: string; phone: string; message: string; status: string; extras: Record<string, unknown> | null } | null = null;
  try {
    // Dedupe on email only. Email is regex-validated and (as a standalone eq
    // filter) safe; folding phone into an `or=(...)` group risked breaking the
    // PostgREST filter on stray characters, and stored phones are raw anyway.
    const since = new Date(Date.now() - DEDUPE_WINDOW_MS).toISOString();
    const existing = await adminSelect<{ id: string; full_name: string; phone: string; message: string; status: string; extras: Record<string, unknown> | null }>("leads", {
      select: "id,full_name,phone,message,status,extras",
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

      // A fresh form submission is fresh consent. If the matched lead was
      // closed (opted out) or exhausted (unreachable), reopen it and record
      // re_consented so the contactability gate stops treating the historical
      // opted_out as absolute (it blocks only when no LATER re_consented
      // exists). Without this, a resubmit re-enrolled but the lead stayed
      // closed and could never promote (2026-07-03 incident).
      const reopened =
        existingRow?.status === "closed" || existingRow?.status === "unreachable";
      if (reopened) dedupeUpdate.status = "nurturing";

      // Merge extras so role_detail/form_id survive a resubmit. adminUpdate
      // replaces the whole extras column, so the merge happens here in JS.
      const priorExtras: Record<string, unknown> = { ...(existingRow?.extras ?? {}) };
      const incomingExtras: Record<string, unknown> = { ...(baseRow.extras ?? {}) };
      const mergedExtras: Record<string, unknown> = { ...priorExtras, ...incomingExtras };
      if (role !== "Other") {
        delete mergedExtras.role_detail;
      }
      // role === "Other" + incoming has role_detail -> already spread in above.
      // role === "Other" + no incoming role_detail -> prior value retained (already in merged).
      const bothExtrasEmpty =
        Object.keys(priorExtras).length === 0 && Object.keys(incomingExtras).length === 0;
      if (!bothExtrasEmpty) dedupeUpdate.extras = mergedExtras;

      await adminUpdate("leads", { id: `eq.${leadId}` }, dedupeUpdate);
      if (reopened) {
        await adminInsert("lead_contact_events", {
          lead_id: leadId,
          event_type: "re_consented",
          channel: "web",
        });
      }
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

  // 5. Enrol + fire the instant touch via the shared enrolment path. enrollLead
  //    no-ops while dormant, routes the lead by its missing contact fields
  //    (full form -> contactability; email_only widget -> detail-capture), and
  //    fires the instant touch only on a brand-new enrolment. Best-effort: never
  //    blocks or loses the lead.
  try {
    const lead: NurtureLead = { id: leadId, full_name, email, phone, role, source, message };
    const sequenceName = routePrimarySequence(lead);
    const result = await enrollLead(lead, {
      sequenceName,
      live: !isTest,
      visitorId: baseRow.visitor_id,
    });

    // Fire-and-forget: generate personalised AI copy for later touches, but only
    // for contactability (the detail-capture copy is field-aware static). Uses
    // after() (Next.js 15+) so the response is not blocked.
    if (
      result.newlyEnrolled &&
      sequenceName === LEAD_SEQUENCE_NAMES.contactability &&
      copyAiEnabled()
    ) {
      const seqUrl = `${getSiteUrl().replace(/\/$/, "")}/api/leads/generate-sequence`;
      // GAP-8: prefer a dedicated internal secret over the master token secret.
      const internalToken =
        process.env.LEAD_INTERNAL_SECRET || process.env.LEAD_NURTURE_TOKEN_SECRET || "";
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
  } catch (e) {
    console.error("[leads/submit] enrol/instant-touch failed", e);
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
