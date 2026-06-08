/**
 * Resend webhook sink for nurture-email engagement.
 *
 * Resend POSTs delivery events (email.opened / .clicked / .bounced / .complained)
 * keyed by the message id we stored in nurture_sends.resend_id. We stamp the
 * matching send row so vw_nurture_step_funnel reads opens/clicks/bounces, and we
 * suppress the subscriber on a hard bounce or complaint (CAN-SPAM / list hygiene).
 *
 * Auth: a shared secret carried in the webhook URL (?key=...) or an
 * x-webhook-secret header, configured when you create the endpoint in Resend.
 * Refuses to run if NURTURE_WEBHOOK_SECRET is unset.
 */
import { NextResponse, type NextRequest } from "next/server";
import { adminConfigured, adminUpdate } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const maxDuration = 15;
export const dynamic = "force-dynamic";

type ResendEvent = { type?: string; data?: { email_id?: string } };

function authorized(req: NextRequest): boolean {
  const secret = process.env.NURTURE_WEBHOOK_SECRET;
  if (!secret) return false;
  if (new URL(req.url).searchParams.get("key") === secret) return true;
  return req.headers.get("x-webhook-secret") === secret;
}

export async function POST(req: NextRequest) {
  if (!adminConfigured()) return NextResponse.json({ ok: false }, { status: 503 });
  if (!authorized(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  let evt: ResendEvent;
  try {
    evt = (await req.json()) as ResendEvent;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const emailId = evt.data?.email_id;
  const type = evt.type ?? "";
  if (!emailId) return NextResponse.json({ ok: true, skipped: "no_email_id" });

  const nowIso = new Date().toISOString();
  const where = { resend_id: `eq.${emailId}` };

  if (type === "email.opened") {
    await adminUpdate("nurture_sends", where, { opened_at: nowIso });
  } else if (type === "email.clicked") {
    await adminUpdate("nurture_sends", where, { clicked_at: nowIso, opened_at: nowIso });
  } else if (type === "email.bounced") {
    const upd = await adminUpdate<{ subscriber_id: string }>("nurture_sends", where, { bounced_at: nowIso });
    const subId = upd.data[0]?.subscriber_id;
    if (subId) await adminUpdate("subscribers", { id: `eq.${subId}` }, { status: "bounced", updated_at: nowIso });
  } else if (type === "email.complained") {
    const upd = await adminUpdate<{ subscriber_id: string }>("nurture_sends", where, { complained_at: nowIso });
    const subId = upd.data[0]?.subscriber_id;
    if (subId) {
      await adminUpdate("subscribers", { id: `eq.${subId}` }, { status: "complained", updated_at: nowIso });
      await adminUpdate(
        "nurture_state",
        { subscriber_id: `eq.${subId}` },
        { status: "paused", updated_at: nowIso },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
