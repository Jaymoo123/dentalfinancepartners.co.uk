/**
 * "Complete your details" endpoint for Accounts for Lawyers.
 *
 * Slim adaptation of Property's /api/leads/complete: drops the phone-verify
 * block (no Twilio Lookup on this site -- accept saved phone as-is). Otherwise
 * follows the same contract:
 *   - verifyLeadToken("profile") gate (410/401);
 *   - load lead, computeMissingContact;
 *   - patch ONLY missing-and-valid fields;
 *   - field-floors validation (isNameOk/isPhoneOk);
 *   - audit event "operator_update";
 *   - partial completion: return stillMissing, keep chase active;
 *   - full completion: record "confirmed" + slim promote (nurture_state +
 *     leads.status contactable);
 *   - mint booking token for all-set CTA.
 */

import { NextResponse } from "next/server";
import {
  verifyLeadToken,
  mintLeadToken,
} from "@accounting-network/web-shared/lead-nurture/tokens";
import { computeMissingContact } from "@accounting-network/web-shared/lead-nurture/lead-nurture-shared";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
import { adminSelect, adminUpdate } from "@/lib/supabase/admin";
import { isNameOk, isPhoneOk } from "@/lib/leads/field-floors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CompleteBody {
  token?: string;
  full_name?: string;
  phone?: string;
  enquiry_ref?: string; // honeypot
}

type LeadRow = {
  id: string;
  full_name: string | null;
  phone: string | null;
};

function tryBookingToken(leadId: string): string | undefined {
  try {
    return mintLeadToken(leadId, "book");
  } catch {
    return undefined;
  }
}

export async function POST(req: Request) {
  let body: CompleteBody;
  try {
    body = (await req.json()) as CompleteBody;
  } catch {
    return NextResponse.json({ success: false, error: "bad-request" }, { status: 400 });
  }

  // Verify the profile token. 410 for expired so the UI can show a warm fallback.
  const verdict = verifyLeadToken(body.token ?? "", "profile");
  if (!verdict.ok) {
    const status = verdict.reason === "expired" ? 410 : 401;
    return NextResponse.json({ success: false, error: verdict.reason }, { status });
  }
  const leadId = verdict.leadId;

  // Load the lead.
  let row: LeadRow;
  try {
    const res = await adminSelect<LeadRow>("leads", {
      select: "id,full_name,phone",
      id: `eq.${leadId}`,
      limit: "1",
    });
    if (!res.data.length) {
      return NextResponse.json({ success: false, error: "not-found" }, { status: 404 });
    }
    row = res.data[0];
  } catch (e) {
    console.error("[leads/complete] lead lookup failed", e);
    return NextResponse.json({ success: false, error: "server" }, { status: 500 });
  }

  // Idempotent: nothing missing.
  const missing = computeMissingContact(row);
  if (missing.length === 0) {
    return NextResponse.json({
      success: true,
      alreadyComplete: true,
      bookingToken: tryBookingToken(leadId),
    });
  }

  // Build patch of ONLY fields that are missing + supplied + valid.
  const patch: { full_name?: string; phone?: string } = {};

  if (missing.includes("name")) {
    const supplied = String(body.full_name ?? "").trim();
    if (supplied) {
      if (!isNameOk(supplied)) {
        return NextResponse.json(
          { success: false, error: "Please enter your full name." },
          { status: 400 },
        );
      }
      patch.full_name = supplied;
    }
  }

  if (missing.includes("phone")) {
    const supplied = String(body.phone ?? "").trim();
    if (supplied) {
      if (!isPhoneOk(supplied)) {
        return NextResponse.json(
          { success: false, error: "Please enter a phone number we can call you on." },
          { status: 400 },
        );
      }
      patch.phone = supplied;
    }
  }

  const patchKeys = Object.keys(patch) as (keyof typeof patch)[];

  // Persist the missing detail(s). This is the load-bearing write.
  if (patchKeys.length > 0) {
    try {
      await adminUpdate("leads", { id: `eq.${leadId}` }, patch);
    } catch (e) {
      console.error("[leads/complete] lead update failed", e);
      return NextResponse.json({ success: false, error: "server" }, { status: 500 });
    }
  }

  // Everything below is best-effort.

  // Audit.
  const stillMissing = computeMissingContact({ ...row, ...patch });
  try {
    await recordLeadContactEvent(leadId, "operator_update", "web", {
      kind: "details_completed",
      supplied: patchKeys,
      stillMissing,
    });
  } catch (e) {
    console.error("[leads/complete] audit event failed", e);
  }

  // Partial completion: leave the detail-capture chase active.
  if (stillMissing.length > 0) {
    return NextResponse.json({ success: true, stillMissing });
  }

  // Full completion: record "confirmed" and slim promote.
  try {
    await recordLeadContactEvent(leadId, "confirmed", "web");
  } catch (e) {
    console.error("[leads/complete] confirmed event failed", e);
  }

  // Flip every nurture row for this lead (a detail-capture lead has no
  // contactability row, so a sequence filter would miss it). Awaited so the
  // serverless instance cannot freeze before the writes land.
  try {
    await adminUpdate(
      "lead_nurture_state",
      { lead_id: `eq.${leadId}` },
      { status: "contactable", next_action_at: null },
    );
  } catch (e) {
    console.error("[leads/complete] nurture state promote failed (non-fatal)", e);
  }
  try {
    await adminUpdate(
      "leads",
      { id: `eq.${leadId}`, status: "in.(new,nurturing)" },
      { status: "contactable" },
    );
  } catch (e) {
    console.error("[leads/complete] lead status promote failed (non-fatal)", e);
  }

  return NextResponse.json({
    success: true,
    bookingToken: tryBookingToken(leadId),
  });
}
