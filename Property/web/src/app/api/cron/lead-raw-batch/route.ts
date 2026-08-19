/**
 * Daily raw-batch prompt cron: lists leads eligible for the raw Bulk Supply
 * lane (unverified past 24h) and asks the owner on Telegram whether to send
 * today's batch. The SEND happens only on the owner's tap, handled by the
 * Telegram webhook; this cron never supplies anything itself.
 *
 * Dormancy (two layers): CRON_SECRET auth, then bot arm (LEAD_BOT_ENABLED +
 * Telegram env) AND the DB kill switch. Unarmed or paused = counted no-op.
 * Telegram failure falls back to a plain operator email (lead ids only) and
 * retries naturally tomorrow.
 *
 * vercel.json cron: { "path": "/api/cron/lead-raw-batch", "schedule": "0 8 * * *" }
 *
 * House style: no em-dashes. British English. Never throws.
 */

import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { pingHeartbeat } from "@/lib/heartbeat";
import { adminConfigured } from "@/lib/supabase/admin";
import { getResend, getFromAddress } from "@/lib/resend";
import { resolveLeadTo } from "@/lib/lead-routing";
import { botArmed } from "@/lib/telegram";
import { isBotPaused } from "@/lib/leads/nurture-control";
import { eligibleRawLeads } from "@/lib/leads/raw-supply";
import { notifyRawEligible } from "@/lib/leads/bot-notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const authHeader = req.headers.get("authorization") ?? "";
  const expected = `Bearer ${secret}`;
  try {
    const a = Buffer.from(authHeader.padEnd(512, "\0"), "utf8");
    const b = Buffer.from(expected.padEnd(512, "\0"), "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

async function run(req: NextRequest): Promise<NextResponse> {
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  if (!botArmed() || (await isBotPaused())) {
    await pingHeartbeat(process.env.HEARTBEAT_LEAD_RAW_BATCH);
    return NextResponse.json({ ok: true, skipped: "bot_unarmed_or_paused" });
  }

  const split = await eligibleRawLeads();
  const total = split.noNurture.length + split.nurturing.length;
  if (total === 0) {
    await pingHeartbeat(process.env.HEARTBEAT_LEAD_RAW_BATCH);
    return NextResponse.json({ ok: true, eligible: 0 });
  }

  const prompted = await notifyRawEligible({
    noNurture: split.noNurture.map((l) => l.id),
    nurturing: split.nurturing.map((l) => l.id),
  });
  if (!prompted) {
    // Telegram down: the owner must still hear about eligible leads. Ids only
    // (no PII); tomorrow's run re-prompts automatically.
    try {
      if (process.env.RESEND_API_KEY) {
        await getResend().emails.send({
          from: getFromAddress(),
          to: resolveLeadTo(undefined),
          subject: `Raw batch eligible: ${total} leads (Telegram prompt failed)`,
          text: [
            `${total} leads are eligible for the raw batch but the Telegram prompt could not be sent.`,
            `Not in nurture: ${split.noNurture.map((l) => l.id).join(", ") || "none"}`,
            `Mid-nurture: ${split.nurturing.map((l) => l.id).join(", ") || "none"}`,
            "The prompt will retry tomorrow, or supply from the console.",
          ].join("\n"),
        });
      }
    } catch (err) {
      console.error("[lead-raw-batch] email fallback failed", err);
    }
  }

  await pingHeartbeat(process.env.HEARTBEAT_LEAD_RAW_BATCH);
  return NextResponse.json({
    ok: true,
    eligible: total,
    noNurture: split.noNurture.length,
    nurturing: split.nurturing.length,
    prompted,
  });
}

export async function GET(req: NextRequest) {
  return run(req);
}
export async function POST(req: NextRequest) {
  return run(req);
}
