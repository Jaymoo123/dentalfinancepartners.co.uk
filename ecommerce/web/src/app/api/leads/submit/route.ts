/**
 * Server chokepoint for Ecommerce Finance lead submission.
 *
 * Delegates validation, honeypot, and deduplication to the shared factory
 * (createLeadSubmitHandler), then runs the Property-parity tail: real-time
 * phone/email verification (Twilio Lookup + email deliverability, written to
 * lead_verification with a verify_pass/verify_fail contact event) and
 * enrolment into the nurture sequence so the instant touch fires after every
 * new submission. Resource downloads (role "resource") are neither verified
 * nor enrolled: they carry in-house consent and are never chased.
 */

import { NextResponse, type NextRequest } from "next/server";
import { createLeadSubmitHandler, isTestLead } from "@accounting-network/web-shared/leads/server";
import { adminConfigured, adminInsert } from "@/lib/supabase/admin";
import { enrollLead } from "@/lib/leads/enroll";
import { verifyLead } from "@/lib/leads/verify";
import { routePrimarySequence } from "@/config/lead-nurture";
import type { NurtureLead } from "@accounting-network/web-shared/lead-nurture/config";
import { mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";

export const runtime = "nodejs";
export const maxDuration = 10;
export const dynamic = "force-dynamic";

// Shared handler: validates, dedupes, inserts lead, returns { success, leadId }.
const sharedHandler = createLeadSubmitHandler({ source: "ecommerce" });

export async function POST(req: NextRequest) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { success: false, error: "Service unavailable. Please try again shortly." },
      { status: 503 },
    );
  }

  // Clone the request so sharedHandler can consume the body and we can also
  // read it for enrollment context.
  let body: Record<string, unknown> = {};
  let clonedReq: Request;
  try {
    const text = await req.text();
    body = JSON.parse(text) as Record<string, unknown>;
    clonedReq = new Request(req.url, {
      method: req.method,
      headers: req.headers,
      body: text,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Bad request" }, { status: 400 });
  }

  // Run the shared handler (validates, dedupes, inserts).
  const sharedRes = await sharedHandler(clonedReq as NextRequest);
  let json: { success?: boolean; leadId?: string | null; error?: string } = {};
  try {
    json = (await sharedRes.json()) as typeof json;
  } catch {
    return sharedRes;
  }

  if (!json.success || !json.leadId) {
    return NextResponse.json(json, { status: sharedRes.status });
  }

  const source = String(body.source ?? "ecommerce").toLowerCase();
  const full_name = String(body.full_name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const role = String(body.role ?? "Other").trim() || "Other";
  const message = String(body.message ?? "").trim();
  const visitorId = (body.visitor_id as string | undefined) ?? null;

  // Resource downloads are never verified, never enrolled, never chased
  // (in-house consent; the enroll chokepoint refuses them too, this just
  // avoids spending a Twilio Lookup on a download unlock).
  const isResource = role === "resource";
  const isTest = isTestLead({ email, full_name, qa: body.qa === true });

  // Real-time verification (best-effort, never blocks). verifyLead spends a
  // Twilio Lookup on EVERY call, so a caller can opt out with
  // skip_verification, honoured only for a test lead so no real submission can
  // ever dodge verification by setting a flag.
  const skipVerification = isResource || (isTest && body.skip_verification === true);
  let verifyPhone: string | undefined;
  let verifyEmail: string | undefined;
  if (!skipVerification) {
    try {
      const v = await verifyLead({ email, phone });
      verifyPhone = v.phone.status;
      verifyEmail = v.email.status;
      await adminInsert(
        "lead_verification",
        {
          lead_id: json.leadId,
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
      await recordLeadContactEvent(
        json.leadId,
        v.verify_pass ? "verify_pass" : "verify_fail",
        "system",
        { phone: v.phone.status, email: v.email.status },
      );
    } catch (e) {
      console.error("[leads/submit] verification failed", e);
    }
  }

  // Enrol into the nurture sequence (best-effort, never blocks or loses a lead).
  if (!isResource) {
    try {
      const lead: NurtureLead = {
        id: json.leadId,
        full_name,
        email,
        phone,
        role,
        source,
        message,
      };
      const sequenceName = routePrimarySequence(lead);
      await enrollLead(lead, {
        sequenceName,
        // A valid probe (LEAD_PROBE_SECRET) is stored as source "test" by the
        // factory, but the route-local source is still the site literal, so
        // gate live sends on the probe marker and the test heuristics too.
        live: source !== "test" && !isTest && body.probe_secret === undefined,
        visitorId,
      });
    } catch (e) {
      console.error("[leads/submit/ecommerce] enrol/instant-touch failed", e);
    }
  }

  // Mint a signed booking token so the thank-you page can offer the inline slot
  // picker at the highest-intent moment. Best-effort: never blocks the lead.
  let bookingToken: string | undefined;
  try {
    bookingToken = mintLeadToken(json.leadId, "book");
  } catch {
    /* LEAD_NURTURE_TOKEN_SECRET unset -> thank-you page just omits the picker */
  }

  return NextResponse.json(
    {
      ...json,
      bookingToken,
      ...(verifyPhone || verifyEmail
        ? { verify: { phone: verifyPhone ?? "unknown", email: verifyEmail ?? "unknown" } }
        : {}),
    },
    { status: sharedRes.status },
  );
}
