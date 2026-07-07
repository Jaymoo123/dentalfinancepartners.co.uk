/**
 * Self-driving post-deploy watch cron (daily). Reads the deploy_watch schedule,
 * runs any gate whose day has arrived, and emails ONE PASS or ACTION verdict per
 * gate to the operator, then stamps the row sent so it never fires twice.
 *
 * A gate is "due" once now() >= started_at + gate_day days. Gates and their
 * thresholds live in src/config/deploy-watch.ts (pure, unit-tested); this route
 * only supplies the database access (a small query helper over adminSelect) and
 * the email transport (the same Resend transport + operator recipient as the lead
 * handoff).
 *
 * Auth: CRON_SECRET bearer (constant-time), mirroring /api/cron/lead-reconcile.
 * No due rows means a clean no-op 200, so the endpoint is safe to call any time.
 *
 * Query volume is tiny (the watch covers one site's mini-form events over at most
 * 28 days), so the query helper reads web_events through adminSelect and counts
 * client-side. Each read is capped at EVENT_QUERY_CAP rows.
 *
 * British English. No em-dashes.
 *
 * vercel.json cron: { "path": "/api/cron/deploy-watch", "schedule": "30 7 * * *" }
 */

import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { adminConfigured, adminSelect, adminUpdate } from "@/lib/supabase/admin";
import { getResend, getFromAddress } from "@/lib/resend";
import { resolveLeadTo } from "@/lib/lead-routing";
import {
  DEPLOY_WATCHES,
  MINIFORM_FORM_IDS,
  type GateResult,
  type StepQueryOpts,
  type WatchQueryHelper,
} from "@/config/deploy-watch";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

/** Max rows read per web_events query. The watch covers one site over <= 28 days. */
const EVENT_QUERY_CAP = 20000;
/** Max pending gate rows scanned per run. */
const SCAN_LIMIT = 100;

const DAY_MS = 86_400_000;

interface DeployWatchRow {
  id: string;
  watch_key: string;
  started_at: string;
  gate_day: number;
}

interface WebEventRow {
  session_id: string;
  event_name: string;
  props: Record<string, unknown> | null;
  ts: string;
}

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

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Is this a mini-form event in the multi-step flow? */
function isMiniformMulti(r: WebEventRow): boolean {
  const p = r.props ?? {};
  const formId = p.form_id;
  const flow = (p.flow as string | undefined) ?? "single";
  return typeof formId === "string" && (MINIFORM_FORM_IDS as readonly string[]).includes(formId) && flow === "multi";
}

/** Build the web_events query helper the gates read through. */
function makeQueryHelper(nowMs: number): WatchQueryHelper {
  const sinceIso = (days: number) => new Date(nowMs - days * DAY_MS).toISOString();

  async function fetchEvents(eventName: string, sinceDays: number): Promise<WebEventRow[]> {
    const res = await adminSelect<WebEventRow>("web_events", {
      select: "session_id,event_name,props,ts",
      site_key: "eq.property",
      is_bot: "is.false",
      event_name: `eq.${eventName}`,
      ts: `gte.${sinceIso(sinceDays)}`,
      limit: String(EVENT_QUERY_CAP),
    });
    return res.data;
  }

  return {
    async distinctStepSessions(eventName: string, opts: StepQueryOpts): Promise<number> {
      const rows = await fetchEvents(eventName, opts.sinceDays);
      const sessions = new Set<string>();
      for (const r of rows) {
        if (!isMiniformMulti(r)) continue;
        if (opts.step !== undefined && Number((r.props ?? {}).step) !== opts.step) continue;
        sessions.add(r.session_id);
      }
      return sessions.size;
    },

    async stepEventCount(eventName: string, opts: StepQueryOpts): Promise<number> {
      const rows = await fetchEvents(eventName, opts.sinceDays);
      let count = 0;
      for (const r of rows) {
        if (!isMiniformMulti(r)) continue;
        if (opts.step !== undefined && Number((r.props ?? {}).step) !== opts.step) continue;
        count += 1;
      }
      return count;
    },

    async miniformLeadSessions(sinceDays: number): Promise<number> {
      const rows = await fetchEvents("lead_submitted", sinceDays);
      const sessions = new Set<string>();
      for (const r of rows) {
        const formId = (r.props ?? {}).form_id;
        if (typeof formId === "string" && (MINIFORM_FORM_IDS as readonly string[]).includes(formId)) {
          sessions.add(r.session_id);
        }
      }
      return sessions.size;
    },
  };
}

/** Compose the single operator email for a gate result. British English, no em-dashes. */
function buildWatchEmail(
  gateDay: number,
  result: GateResult,
): { subject: string; html: string; text: string } {
  const status = result.verdict === "ACTION" ? "ACTION NEEDED" : "PASS";
  const subject = `[PTP watch] Day ${gateDay} ${status}: mini-form rollout`;

  const sentence = result.verdict === "ACTION"
    ? esc(result.action ?? "Review the multi-step mini-form rollout.")
    : "No action needed.";

  const listItems = result.lines.map((l) => `<li>${esc(l)}</li>`).join("");

  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;max-width:640px;">
<p style="font-size:16px;"><strong>${esc(result.headline)}</strong></p>
<ul style="font-size:14px;padding-left:18px;">${listItems}</ul>
<p style="font-size:14px;"><strong>${sentence}</strong></p>
<p style="color:#64748b;font-size:12px;">Automated post-deploy watch for the mini-form rollout (day ${gateDay} gate).</p>
</div>`;

  const text =
    `${result.headline}\n\n` +
    result.lines.map((l) => `  ${l}`).join("\n") +
    `\n\n${result.verdict === "ACTION" ? result.action ?? "Review the multi-step mini-form rollout." : "No action needed."}\n\n` +
    `Automated post-deploy watch for the mini-form rollout (day ${gateDay} gate).`;

  return { subject, html, text };
}

async function run(req: NextRequest): Promise<NextResponse> {
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const nowMs = Date.now();

  // 1. Pull every pending gate row (oldest gate first).
  const pendingRes = await adminSelect<DeployWatchRow>("deploy_watch", {
    select: "id,watch_key,started_at,gate_day",
    status: "eq.pending",
    order: "gate_day.asc",
    limit: String(SCAN_LIMIT),
  });

  // 2. Keep only the gates whose day has arrived.
  const due = pendingRes.data.filter(
    (r) => nowMs >= new Date(r.started_at).getTime() + r.gate_day * DAY_MS,
  );

  if (due.length === 0) {
    return NextResponse.json({ ok: true, processed: 0 });
  }

  const q = makeQueryHelper(nowMs);
  const to = resolveLeadTo("property");
  const resendReady = Boolean(process.env.RESEND_API_KEY);

  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (const row of due) {
    const watch = DEPLOY_WATCHES[row.watch_key];
    const gate = watch?.gates[row.gate_day];

    // No gate registered for this (watch_key, gate_day): mark it skipped so the
    // cron does not keep re-scanning it.
    if (!gate) {
      await adminUpdate("deploy_watch", { id: `eq.${row.id}` }, {
        status: "skipped",
        verdict: "skipped",
        sent_at: new Date().toISOString(),
      });
      skipped += 1;
      continue;
    }

    let result: GateResult;
    try {
      result = await gate(q);
    } catch (err) {
      // A transient query failure must not burn the gate: leave it pending so the
      // next daily run retries it.
      console.error("[deploy-watch] gate run failed", row.watch_key, row.gate_day, err);
      failed += 1;
      continue;
    }

    const { subject, html, text } = buildWatchEmail(row.gate_day, result);

    // If Resend is unconfigured, leave the row pending so it sends once the key is
    // set rather than silently swallowing the verdict.
    if (!resendReady) {
      console.error("[deploy-watch] RESEND_API_KEY not set; leaving gate pending", row.gate_day);
      failed += 1;
      continue;
    }

    try {
      await getResend().emails.send({ from: getFromAddress(), to, subject, html, text });
    } catch (err) {
      console.error("[deploy-watch] email send failed; leaving gate pending", row.gate_day, err);
      failed += 1;
      continue;
    }

    await adminUpdate("deploy_watch", { id: `eq.${row.id}` }, {
      status: "sent",
      verdict: result.verdict,
      payload: { headline: result.headline, lines: result.lines, action: result.action ?? null },
      sent_at: new Date().toISOString(),
    });
    sent += 1;
  }

  const summary = { processed: due.length, sent, skipped, failed };
  console.log("[deploy-watch] summary", summary);
  return NextResponse.json({ ok: true, ...summary });
}

export async function GET(req: NextRequest) {
  return run(req);
}
export async function POST(req: NextRequest) {
  return run(req);
}
