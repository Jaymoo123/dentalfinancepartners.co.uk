/**
 * "Complete your details" endpoint for Dental Finance Partners.
 *
 * A lead who arrived missing a name and/or a phone fills the gap here via a
 * signed profile token. Slim version vs Property: no phone re-verification
 * (Dentists has no Twilio Lookup in the submit path), so accept saved phone
 * as-is and promote on full completion.
 *
 * FAIL-SAFE: the core UPDATE is the load-bearing write. Audit events and
 * promote are best-effort; a downstream hiccup can never 500 after the detail
 * is saved.
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

  // 1. Verify the profile token. 410 for expired so UI can show friendly message.
  const verdict = verifyLeadToken(body.token ?? "", "profile");
  if (!verdict.ok) {
    const status = verdict.reason === "expired" ? 410 : 401;
    return NextResponse.json({ success: false, error: verdict.reason }, { status });
  }
  const leadId = verdict.leadId;

  // 2. Load the lead.
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
    console.error("[leads/complete/dentists] lead lookup failed", e);
    return NextResponse.json({ success: false, error: "server" }, { status: 500 });
  }

  // 3. Already complete: idempotent no-op.
  const missing = computeMissingContact(row);
  if (missing.length === 0) {
    return NextResponse.json({
      success: true,
      alreadyComplete: true,
      bookingToken: tryBookingToken(leadId),
    });
  }

  // 4. Build a patch of only missing + supplied + valid fields.
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

  // 5. Persist.
  if (patchKeys.length > 0) {
    try {
      await adminUpdate("leads", { id: `eq.${leadId}` }, patch);
    } catch (e) {
      console.error("[leads/complete/dentists] lead update failed", e);
      return NextResponse.json({ success: false, error: "server" }, { status: 500 });
    }
  }

  // Everything below is best-effort.

  const stillMissing = computeMissingContact({ ...row, ...patch });

  // 6. Audit event.
  try {
    await recordLeadContactEvent(leadId, "operator_update", "web", {
      kind: "details_completed",
      supplied: patchKeys,
      stillMissing,
    });
  } catch (e) {
    console.error("[leads/complete/dentists] audit event failed (non-fatal)", e);
  }

  // Partial: leave detail-capture chase running.
  if (stillMissing.length > 0) {
    return NextResponse.json({ success: true, stillMissing });
  }

  // Full completion: record 'confirmed' + slim promote.
  try {
    await recordLeadContactEvent(leadId, "confirmed", "web");
  } catch (e) {
    console.error("[leads/complete/dentists] confirmed event failed (non-fatal)", e);
  }
  try {
    await adminUpdate(
      "lead_nurture_state",
      { lead_id: `eq.${leadId}`, status: "eq.active" },
      { status: "contactable", next_action_at: null },
    );
  } catch (e) {
    console.error("[leads/complete/dentists] nurture state promote failed (non-fatal)", e);
  }
  try {
    await adminUpdate(
      "leads",
      { id: `eq.${leadId}`, status: "in.(new,nurturing)" },
      { status: "contactable" },
    );
  } catch (e) {
    console.error("[leads/complete/dentists] lead status promote failed (non-fatal)", e);
  }

  return NextResponse.json({
    success: true,
    bookingToken: tryBookingToken(leadId),
  });
}
