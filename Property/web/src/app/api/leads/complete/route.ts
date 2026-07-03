/**
 * "Complete your details" endpoint. A lead who arrived missing a name and/or a
 * phone (typically the email-only "Ask a specialist" widget) supplies the
 * missing detail(s) from a signed link in a nurture email. The link carries a
 * "profile" token, so the lead is identified with nothing to guess or enumerate.
 *
 * The route only ever fills IN what is missing: it never touches the email,
 * never overwrites a good stored name/phone, and only asks for (and accepts)
 * the fields that were below floor at load time. Supplying the last missing
 * field is the moment we can promote the lead for handoff, so a full completion
 * runs the same contactability gate as a booking or a one-tap confirm; a partial
 * completion leaves the detail-capture chase running so the next scheduled email
 * asks for the remainder.
 *
 * FAIL-SAFE: the core UPDATE is the load-bearing write. Verification, the gate,
 * and audit events are all best-effort and wrapped so a downstream hiccup can
 * never 500 the request after the lead's detail has already been saved.
 */

import { NextResponse } from "next/server";
import {
  verifyLeadToken,
  mintLeadToken,
} from "@accounting-network/web-shared/lead-nurture/tokens";
import { computeMissingContact } from "@accounting-network/web-shared/lead-nurture/lead-nurture-shared";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
import { adminSelect, adminUpdate, adminInsert } from "@/lib/supabase/admin";
import { verifyLead } from "@/lib/leads/verify";
import { recordResponseAndEvaluate } from "@/lib/leads/contactability";
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
  email: string | null;
  phone: string | null;
  source: string | null;
};

/** Best-effort booking token; omitted silently if the token secret is unset. */
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

  // 1. Honeypot: a filled enquiry_ref is a bot (or an autofill we choose not to
  //    trust here). Silent accept with no writes, matching the submit route's
  //    de-fang posture, so a bot gets no signal and nothing is mutated.
  if (String(body.enquiry_ref ?? "").trim()) {
    return NextResponse.json({ success: true });
  }

  // 2. Verify the profile token. Mirror book/route.ts: 410 for an expired link
  //    (so the UI can offer a friendly "link expired" path), 401 otherwise.
  const verdict = verifyLeadToken(body.token ?? "", "profile");
  if (!verdict.ok) {
    const status = verdict.reason === "expired" ? 410 : 401;
    return NextResponse.json({ success: false, error: verdict.reason }, { status });
  }
  const leadId = verdict.leadId;

  // 3. Load the lead. If the id no longer resolves, there is nothing to complete.
  let row: LeadRow;
  try {
    const res = await adminSelect<LeadRow>("leads", {
      select: "id,full_name,email,phone,source",
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

  // 4. Nothing missing -> idempotent no-op. A lead who already has both details
  //    (e.g. they resubmitted the full form, or clicked the link twice) just gets
  //    an "all set" response, with a booking token so the UI can offer /book.
  const missing = computeMissingContact(row);
  if (missing.length === 0) {
    return NextResponse.json({
      success: true,
      alreadyComplete: true,
      bookingToken: tryBookingToken(leadId),
    });
  }

  // 5. Build a patch of ONLY the fields that are (a) still missing, (b) supplied,
  //    and (c) valid. A supplied-but-invalid field is a 400 so the form can show a
  //    field error. A field not in `missing` is never touched (so a good stored
  //    name/phone can never be clobbered), and email is never in scope at all.
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

  let phoneChanged = false;
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
      phoneChanged = true;
    }
  }

  const patchKeys = Object.keys(patch) as (keyof typeof patch)[];

  // 6. Persist the missing detail(s). UPDATE by id only, never insert: the lead
  //    already exists, we are filling gaps. This is the load-bearing write.
  if (patchKeys.length > 0) {
    try {
      await adminUpdate("leads", { id: `eq.${leadId}` }, patch);
    } catch (e) {
      console.error("[leads/complete] lead update failed", e);
      return NextResponse.json({ success: false, error: "server" }, { status: 500 });
    }
  }

  // Everything below is best-effort: the detail is saved, so a hiccup in verify /
  // the gate / audit must never turn a successful save into a 500.

  // 7. Re-verify ONLY when the phone changed (a new number is now callable-or-not,
  //    which the gate depends on). A name-only completion cannot change phone
  //    verification, so we skip the (billable) lookup entirely.
  let newPhoneStatus: string | undefined;
  if (phoneChanged && patch.phone) {
    try {
      const v = await verifyLead({ email: row.email ?? "", phone: patch.phone });
      newPhoneStatus = v.phone.status;
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
    } catch (e) {
      console.error("[leads/complete] re-verification failed", e);
    }
  }

  // 9. Recompute what is still missing after the patch (patch beats stored value).
  const stillMissing = computeMissingContact({ ...row, ...patch });

  // 8. Audit the completion (best-effort; allowed event_type per the CHECK).
  try {
    await recordLeadContactEvent(leadId, "operator_update", "web", {
      kind: "details_completed",
      supplied: patchKeys,
      stillMissing,
    });
  } catch (e) {
    console.error("[leads/complete] audit event failed", e);
  }

  // Partial completion: still short of a full contact record. Do NOT record a
  // response / promote; leave the detail-capture chase active so its next
  // scheduled email asks for the remaining field.
  if (stillMissing.length > 0) {
    return NextResponse.json({ success: true, stillMissing });
  }

  // Full completion. If the newly verified phone is known-bad (invalid / VoIP),
  // the lead is not callable by DJH: do NOT promote, flag for manual recheck, and
  // stop the detail-capture chase so no further "add your details" emails fire.
  const phoneKnownBad = newPhoneStatus === "invalid" || newPhoneStatus === "voip";
  if (phoneKnownBad) {
    try {
      await recordLeadContactEvent(leadId, "operator_update", "web", {
        kind: "phone_recheck_needed",
      });
    } catch (e) {
      console.error("[leads/complete] recheck event failed", e);
    }
    try {
      await adminUpdate(
        "lead_nurture_state",
        { lead_id: `eq.${leadId}`, sequence: "eq.property_detail_capture" },
        { status: "stopped", next_action_at: null },
      );
    } catch (e) {
      console.error("[leads/complete] stop detail-capture failed", e);
    }
    return NextResponse.json({ success: true, invalidPhone: true });
  }

  // Phone is callable (or the completion was name-only over an already-good
  // phone): run the gate. recordResponseAndEvaluate records "confirmed", then
  // promotes iff the phone verifies callable and halts the chase via the gate.
  let promoted: boolean | undefined;
  try {
    const result = await recordResponseAndEvaluate(leadId, "confirmed", "web");
    promoted = result?.promoted;
  } catch (e) {
    console.error("[leads/complete] gate evaluation failed", e);
  }

  return NextResponse.json({
    success: true,
    promoted,
    bookingToken: tryBookingToken(leadId),
  });
}
