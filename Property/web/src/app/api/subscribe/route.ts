/**
 * Marketing opt-in capture for the nurture engine.
 *
 * Writes an opted-in subscriber (with its OWN marketing consent, never the
 * lead-enquiry consent) to the RLS-locked `subscribers` table via the service
 * role, (re)starts the drip schedule, and sends the welcome email immediately so
 * the opt-in is confirmed in the inbox. Honeypot-protected. Always returns a
 * generic shape so bots learn nothing.
 */
import { NextResponse, type NextRequest } from "next/server";
import { adminConfigured, adminSelect, adminInsert, adminUpdate } from "@/lib/supabase/admin";
import { processStep } from "@/lib/nurture/send";
import { NURTURE_SEQUENCE_NAME } from "@/lib/nurture/sequence";

export const runtime = "nodejs";
export const maxDuration = 15;
export const dynamic = "force-dynamic";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE_KEY = "property";

type Body = {
  email?: string;
  consent?: boolean;
  consent_text?: string;
  visitor_id?: string;
  topic?: string;
  source?: string;
  company_url?: string; // honeypot
};

type SubRow = { id: string; status?: string; unsubscribe_token: string };

export async function POST(req: NextRequest) {
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  if ((body.company_url ?? "").trim() !== "") return NextResponse.json({ ok: true }); // honeypot

  const email = (body.email ?? "").trim().toLowerCase();
  if (!emailRe.test(email) || email.length > 100) {
    return NextResponse.json({ ok: false, error: "bad_email" }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ ok: false, error: "consent_required" }, { status: 400 });
  }

  const nowIso = new Date().toISOString();
  const consentText = (body.consent_text ?? "").slice(0, 500) || "Opted in to property tax updates by email.";
  const visitorId = (body.visitor_id ?? "").slice(0, 64) || null;
  const topic = (body.topic ?? "").slice(0, 64) || null;
  const source = ((body.source ?? "subscribe_form").slice(0, 64)) || "subscribe_form";

  // We always store email lower-cased, so eq is the case-correct lookup.
  const existing = await adminSelect<SubRow>("subscribers", {
    select: "id,status,unsubscribe_token",
    site_key: `eq.${SITE_KEY}`,
    email: `eq.${email}`,
    limit: "1",
  });

  let sub: { id: string; unsubscribe_token: string } | null = null;
  if (existing.ok && existing.data.length) {
    const row = existing.data[0];
    const upd = await adminUpdate<SubRow>(
      "subscribers",
      { id: `eq.${row.id}` },
      {
        status: "active",
        consent_given: true,
        consent_text: consentText,
        consent_at: nowIso,
        visitor_id: visitorId,
        entry_topic: topic,
        source,
        updated_at: nowIso,
      },
    );
    const r = upd.data[0] ?? row;
    sub = { id: r.id, unsubscribe_token: r.unsubscribe_token };
  } else {
    const ins = await adminInsert<SubRow>("subscribers", {
      site_key: SITE_KEY,
      email,
      status: "active",
      consent_given: true,
      consent_text: consentText,
      consent_at: nowIso,
      visitor_id: visitorId,
      entry_topic: topic,
      source,
    });
    if (!ins.ok || !ins.data.length) {
      return NextResponse.json({ ok: false, error: "insert_failed" }, { status: 500 });
    }
    sub = { id: ins.data[0].id, unsubscribe_token: ins.data[0].unsubscribe_token };
  }

  // (Re)start the schedule at step 0, due now. Upsert on the (subscriber,sequence) PK.
  await adminInsert(
    "nurture_state",
    {
      subscriber_id: sub.id,
      sequence: NURTURE_SEQUENCE_NAME,
      step: 0,
      status: "active",
      next_send_at: nowIso,
      updated_at: nowIso,
    },
    { onConflict: "subscriber_id,sequence" },
  );

  // Welcome now + advance to step 1. Best-effort: a send hiccup never fails the
  // opt-in (they are subscribed; the cron will retry step 0).
  try {
    await processStep({ id: sub.id, email, unsubscribe_token: sub.unsubscribe_token }, 0);
  } catch (err) {
    console.error("[subscribe] welcome send failed", err);
  }

  return NextResponse.json({ ok: true });
}
