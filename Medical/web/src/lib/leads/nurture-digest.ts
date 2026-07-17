/**
 * Daily digest composer and runner for the Medical Accountants UK
 * lead-nurture system.
 *
 * gatherDigestData: reads three sources in parallel (vw_lead_nurture_health,
 * vw_lead_nurture_stuck, last-7d send_failed events from lead_contact_events)
 * and the control state, then enriches failed-send rows with lead names via a
 * second adminSelect pass on the leads table. All data is filtered to
 * site_key='medical' / source='medical'.
 *
 * composeDigestEmail: PURE. Returns a plain-text subject and body. No em or
 * en dashes anywhere.
 *
 * runNurtureDigest: gathers data, composes, sends one operator email via the
 * shared Resend transport. Returns {sent:false} on dormant days (no sends, no
 * stuck, no failures) so the operator inbox stays quiet when nothing is happening.
 *
 * CONVENTIONS
 *   No em/en dashes in any operator-facing text. Use commas, colons, or
 *   parentheses instead.
 *   Server-only: SUPABASE_SERVICE_ROLE_KEY is never exposed to the browser.
 */

import { adminSelect } from "@/lib/supabase/admin";
import { getResend, getFromAddress } from "@/lib/resend";
import { resolveLeadTo } from "@/lib/lead-routing";
import { getNurtureControl } from "./nurture-control";
import { getNurtureHealth } from "./nurture-health";
import type { NurtureHealth } from "./nurture-health";
import type { NurtureControl } from "./nurture-control";

// ── Types ──────────────────────────────────────────────────────────────────────

export type StuckLead = {
  leadId: string;
  fullName: string | null;
  createdAt: string;
  overdueHours: number;
  step: number;
};

export type FailedSendRow = {
  leadId: string;
  fullName: string | null;
  channel: string;
  step: number;
  reason: string;
  ts: string;
};

export type DigestData = {
  health: NurtureHealth | null;
  control: NurtureControl;
  stuck: StuckLead[];
  failedSends: FailedSendRow[];
  forDate: string;
};

// ── Internal row types ─────────────────────────────────────────────────────────

type StuckViewRow = {
  lead_id: string;
  full_name: string | null;
  created_at: string;
  overdue_hours: number | null;
  step: number | null;
};

type SendFailedEventRow = {
  lead_id: string;
  channel: string | null;
  meta: Record<string, unknown> | null;
  ts: string;
  leads?: { source: string | null } | null;
};

type LeadNameRow = {
  id: string;
  full_name: string | null;
  source: string | null;
};

const n = (v: unknown): number => Number(v) || 0;

// ── gatherDigestData ──────────────────────────────────────────────────────────

export async function gatherDigestData(siteKey: string): Promise<DigestData> {
  const forDate = new Date().toISOString().slice(0, 10);
  const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [health, control, stuckRes, failedRes] = await Promise.all([
    getNurtureHealth(siteKey),
    getNurtureControl(),
    adminSelect<StuckViewRow>("vw_lead_nurture_stuck", {
      select: "lead_id,full_name,created_at,overdue_hours,step",
      order: "overdue_hours.desc",
      limit: "50",
    }).catch(() => ({ ok: false, status: 0, data: [] as StuckViewRow[] })),
    adminSelect<SendFailedEventRow>("lead_contact_events", {
      event_type: "eq.send_failed",
      ts: `gte.${since7d}`,
      select: "lead_id,channel,meta,ts",
      order: "ts.desc",
      limit: "100",
    }).catch(() => ({
      ok: false,
      status: 0,
      data: [] as SendFailedEventRow[],
    })),
  ]);

  const stuck: StuckLead[] = (stuckRes.data ?? []).map((r) => ({
    leadId: r.lead_id,
    fullName: r.full_name ?? null,
    createdAt: r.created_at,
    overdueHours: n(r.overdue_hours),
    step: n(r.step),
  }));

  // Enrich failed sends with lead names; filter to medical source.
  const failedEvents = failedRes.data ?? [];
  let failedSends: FailedSendRow[] = [];

  if (failedEvents.length > 0) {
    const leadIds = [...new Set(failedEvents.map((e) => e.lead_id))];
    const nameRes = await adminSelect<LeadNameRow>("leads", {
      id: `in.(${leadIds.join(",")})`,
      select: "id,full_name,source",
      limit: String(leadIds.length + 1),
    }).catch(() => ({ ok: false, status: 0, data: [] as LeadNameRow[] }));

    const nameMap = new Map<string, { name: string | null; source: string | null }>(
      (nameRes.data ?? []).map((r) => [r.id, { name: r.full_name ?? null, source: r.source ?? null }]),
    );

    // ponytail: JS-filter failed-send events by leads.source==='medical' (vw_lead_nurture_stuck
    // is not site-scoped yet; we filter in application layer for safety).
    failedSends = failedEvents
      .filter((e) => {
        const entry = nameMap.get(e.lead_id);
        return entry?.source === "medical";
      })
      .map((e) => {
        const meta = (e.meta as Record<string, unknown> | null) ?? {};
        const reason = String(meta.reason ?? meta.kind ?? "unknown");
        return {
          leadId: e.lead_id,
          fullName: nameMap.get(e.lead_id)?.name ?? null,
          channel: e.channel ?? "email",
          step: n(meta.step),
          reason,
          ts: e.ts,
        };
      });
  }

  return { health, control, stuck, failedSends, forDate };
}

// ── composeDigestEmail ────────────────────────────────────────────────────────

function fmtDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function relativeAge(isoTs: string): string {
  const diffMs = Date.now() - new Date(isoTs).getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

export function composeDigestEmail(d: DigestData): {
  subject: string;
  text: string;
} {
  const subject = `Lead nurture daily digest (${d.forDate})`;
  const lines: string[] = [];

  lines.push(`LEAD NURTURE DAILY DIGEST`);
  lines.push(`Date: ${d.forDate}`);
  lines.push(``);

  if (d.control.paused) {
    const at = d.control.pausedAt ? fmtDate(d.control.pausedAt) : "unknown";
    const by = d.control.pausedBy ?? "unknown";
    const reason = d.control.pausedReason ?? "unknown";
    lines.push(`PAUSE STATE: PAUSED`);
    lines.push(`  Reason: ${reason}`);
    lines.push(`  Paused by: ${by} at ${at}`);
  } else {
    lines.push(`Pause state: running.`);
  }
  lines.push(``);

  lines.push(`CRON LIVENESS`);
  if (d.control.lastCronRunAt === null) {
    lines.push(`  Hourly cron last ran: never recorded.`);
    lines.push(`  WARNING: the hourly cron has not run in over 2 hours; sends may be stalled.`);
  } else {
    lines.push(`  Hourly cron last ran: ${relativeAge(d.control.lastCronRunAt)}`);
    const cronAgeMs = Date.now() - new Date(d.control.lastCronRunAt).getTime();
    if (cronAgeMs > 2 * 60 * 60 * 1000) {
      lines.push(`  WARNING: the hourly cron has not run in over 2 hours; sends may be stalled.`);
    }
  }
  lines.push(``);

  if (d.health) {
    const h = d.health;

    lines.push(`FUNNEL`);
    lines.push(`  Active leads:    ${h.activeLeads}`);
    lines.push(`  Contactable:     ${h.contactable}`);
    lines.push(`  Unreachable:     ${h.unreachable}`);
    lines.push(`  Forwarded:       ${h.forwarded}`);
    lines.push(`  Stuck in queue:  ${h.stuckLeads}`);
    lines.push(``);

    const real24 = Math.max(0, h.sends24h - h.skipped24h);
    lines.push(`SEND ACTIVITY (last 24 h)`);
    lines.push(`  Attempts: ${real24} (${h.sent24h} sent, ${h.failed24h} failed) + ${h.skipped24h} skipped`);
    lines.push(``);

    const real1h = Math.max(0, h.sends1h - h.skipped1h);
    lines.push(`SEND ACTIVITY (last 1 h)`);
    lines.push(`  Attempts: ${real1h} (${Math.max(0, real1h - h.failed1h)} sent, ${h.failed1h} failed) + ${h.skipped1h} skipped`);
    lines.push(``);

    lines.push(`DELIVERABILITY`);
    lines.push(`  Complaints 24 h: ${h.complaints24h}`);
    lines.push(`  Complaints 7 d:  ${h.complaints7d}`);
    lines.push(`  Bounces 24 h:    ${h.bounces24h}`);
    lines.push(`  Bounces 7 d:     ${h.bounces7d}`);
    lines.push(`  Opt-outs 7 d:    ${h.optouts7d}`);
    lines.push(``);

    lines.push(`ENGAGEMENT (last 24 h)`);
    lines.push(`  Replies:  ${h.replies24h}`);
    lines.push(`  Booked:   ${h.booked24h}`);
    lines.push(``);

    const notes: string[] = [];

    if (real24 > 0 && h.failed24h > 0) {
      const failPct = Math.round((h.failed24h / real24) * 100);
      if (failPct >= 20) {
        notes.push(
          `${failPct}% failure rate on send attempts in 24 h. ` +
            `Check Resend delivery logs and domain reputation.`,
        );
      }
    }
    if (real1h > 0 && h.failed1h / real1h > 0.25) {
      const pct = Math.round((h.failed1h / real1h) * 100);
      notes.push(
        `${pct}% failure rate in the last hour (${h.failed1h}/${real1h}). ` +
          `Sending may be impaired right now.`,
      );
    }
    if (h.stuckLeads >= 3) {
      notes.push(
        `${h.stuckLeads} leads are overdue their next send. ` +
          `Review queue scheduling and sequence config.`,
      );
    }
    if (h.complaints24h >= 1) {
      notes.push(
        `${h.complaints24h} complaint(s) in 24 h. ` +
          `Review content and unsubscribe flow.`,
      );
    }
    if (h.optouts7d >= 3) {
      notes.push(
        `${h.optouts7d} opt-out(s) in 7 days. ` +
          `Review sending frequency and message relevance.`,
      );
    }
    if (h.bounces24h > 0 && real24 >= 20) {
      const bouncePct = Math.round((h.bounces24h / real24) * 100);
      if (bouncePct >= 5) {
        notes.push(
          `Hard bounce rate is ${bouncePct}% (${h.bounces24h}/${real24} in 24 h). ` +
            `Consider suppressing undeliverable addresses.`,
        );
      }
    }

    if (notes.length > 0) {
      lines.push(`BOTTLENECK NOTES`);
      for (const note of notes) {
        lines.push(`  * ${note}`);
      }
      lines.push(``);
    }
  } else {
    lines.push(`HEALTH DATA`);
    lines.push(
      `  Not available. The vw_lead_nurture_health view may be missing or ` +
        `the system has no activity yet.`,
    );
    lines.push(``);
  }

  lines.push(`STUCK LEADS (${d.stuck.length})`);
  if (d.stuck.length === 0) {
    lines.push(`  None.`);
  } else {
    for (const s of d.stuck) {
      const name = s.fullName ?? "(unknown)";
      lines.push(
        `  ${name} | step ${s.step} | overdue ${s.overdueHours} h | ` +
          `created ${fmtDate(s.createdAt)} | id: ${s.leadId}`,
      );
    }
  }
  lines.push(``);

  const dedupedFailedSends = ((): FailedSendRow[] => {
    const groups = new Map<string, { row: FailedSendRow; count: number }>();
    for (const f of d.failedSends) {
      const key = `${f.leadId}|${f.step}|${f.channel}`;
      const existing = groups.get(key);
      if (!existing) {
        groups.set(key, { row: f, count: 1 });
      } else {
        existing.count += 1;
      }
    }
    return Array.from(groups.values()).map(({ row, count }) => ({
      ...row,
      reason: count > 1 ? `${row.reason} (x${count} attempts)` : row.reason,
    }));
  })();

  lines.push(`FAILED SENDS LAST 7 DAYS (${dedupedFailedSends.length})`);
  if (dedupedFailedSends.length === 0) {
    lines.push(`  None.`);
  } else {
    for (const f of dedupedFailedSends) {
      const name = f.fullName ?? "(unknown)";
      lines.push(
        `  ${name} | ${f.channel} step ${f.step} | reason: ${f.reason} | ` +
          `${fmtDate(f.ts)} | id: ${f.leadId}`,
      );
    }
  }
  lines.push(``);

  lines.push(`Automated digest from the Medical Accountants UK lead-nurture system.`);

  return { subject, text: lines.join("\n") };
}

// ── runNurtureDigest ──────────────────────────────────────────────────────────

export async function runNurtureDigest(): Promise<{ sent: boolean }> {
  const d = await gatherDigestData("medical");

  const noActivity =
    (d.health === null || d.health.sends24h === 0) &&
    d.stuck.length === 0 &&
    d.failedSends.length === 0;

  if (noActivity) return { sent: false };

  if (!process.env.RESEND_API_KEY) return { sent: false };

  const { subject, text } = composeDigestEmail(d);

  try {
    await getResend().emails.send({
      from: getFromAddress(),
      to: resolveLeadTo("medical"),
      subject,
      text,
    });
    return { sent: true };
  } catch (err) {
    console.error("[nurture-digest] digest email send failed", err);
    return { sent: false };
  }
}
