/**
 * "Complete your details" endpoint. A lead who arrived missing a name and/or
 * a phone (typically the email-only "Ask a specialist" widget) supplies the
 * missing detail(s) from a signed link in a nurture email.
 *
 * - Only fills IN what is missing; never touches email; never overwrites a
 *   good stored name/phone.
 * - adminUpdate (patch) is the load-bearing write; everything after is best-effort.
 * - stillMissing partial path returned verbatim so the client can show the
 *   right state without re-fetching.
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
  enquiry_ref?: string;
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

  // Verify the profile token. 410 for expired, 401 otherwise.
  const verdict = verifyLeadToken(body.token ?? "", "profile");
  if (!verdict.ok) {
    const status = verdict.reason === "expired" ? 410 : 401;
    return NextResponse.json({ success: false, error: verdict.reason }, { status });
  }
  const leadId = verdict.leadId;

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
    console.error("[leads/complete/cis] lead lookup failed", e);
    return NextResponse.json({ success: false, error: "server" }, { status: 500 });
  }

  const missing = computeMissingContact(row);
  if (missing.length === 0) {
    return NextResponse.json({
      success: true,
      alreadyComplete: true,
      bookingToken: tryBookingToken(leadId),
    });
  }

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

  if (patchKeys.length > 0) {
    try {
      await adminUpdate("leads", { id: `eq.${leadId}` }, patch);
    } catch (e) {
      console.error("[leads/complete/cis] lead update failed", e);
      return NextResponse.json({ success: false, error: "server" }, { status: 500 });
    }
  }

  const stillMissing = computeMissingContact({ ...row, ...patch });

  try {
    await recordLeadContactEvent(leadId, "operator_update", "web", {
      kind: "details_completed",
      supplied: patchKeys,
      stillMissing,
    });
  } catch (e) {
    console.error("[leads/complete/cis] audit event failed", e);
  }

  if (stillMissing.length > 0) {
    return NextResponse.json({ success: true, stillMissing });
  }

  try {
    await recordLeadContactEvent(leadId, "confirmed", "web");
  } catch (e) {
    console.error("[leads/complete/cis] confirmed event failed", e);
  }
  try {
    await adminUpdate(
      "lead_nurture_state",
      { lead_id: `eq.${leadId}` },
      { status: "contactable", next_action_at: null },
    );
  } catch (e) {
    console.error("[leads/complete/cis] nurture state promote failed (non-fatal)", e);
  }
  try {
    await adminUpdate(
      "leads",
      { id: `eq.${leadId}`, status: "in.(new,nurturing)" },
      { status: "contactable" },
    );
  } catch (e) {
    console.error("[leads/complete/cis] lead promote failed (non-fatal)", e);
  }

  return NextResponse.json({
    success: true,
    bookingToken: tryBookingToken(leadId),
  });
}
