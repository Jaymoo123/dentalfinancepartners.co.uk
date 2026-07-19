/**
 * Observability health reader and guardrail evaluator for the Contractor Tax
 * Accountants lead-nurture system.
 *
 * getNurtureHealth: reads vw_lead_nurture_health for site_key='contractors-ir35'.
 * Returns null if the view is absent, the site has no row yet, or any error
 * occurs. A missing view must never block sends (fail-open).
 *
 * evaluateGuardrails: PURE, deterministic, no I/O.
 *
 * runNurtureGuardrails: orchestrator. Reads health, evaluates guardrails,
 * deduplicates operator alert emails (at most one per stable breach key per
 * 24 hours), sends a single alert via the shared Resend transport, and
 * optionally auto-pauses the nurture system via nurture-control.
 *
 * CONVENTIONS
 *   No em/en dashes in any operator-facing text. Use commas, colons, or
 *   parentheses instead.
 *   Server-only: SUPABASE_SERVICE_ROLE_KEY is never exposed to the browser.
 */

import { adminSelect } from "@/lib/supabase/admin";
import { getResend, getFromAddress } from "@/lib/resend";
import { resolveLeadTo } from "@/lib/lead-routing";
import {
  getNurtureControl,
  pauseNurture,
  recordGuardrailAlert,
} from "./nurture-control";

// ── Types ──────────────────────────────────────────────────────────────────────

export type NurtureHealth = {
  siteKey: string;
  sends24h: number;
  sent24h: number;
  failed24h: number;
  skipped24h: number;
  sends1h: number;
  failed1h: number;
  skipped1h: number;
  complaints24h: number;
  complaints7d: number;
  bounces24h: number;
  bounces7d: number;
  optouts7d: number;
  replies24h: number;
  booked24h: number;
  activeLeads: number;
  stuckLeads: number;
  contactable: number;
  unreachable: number;
  forwarded: number;
  opened24h: number;
  clicked24h: number;
  opened7d: number;
  clicked7d: number;
};

export type GuardrailThresholds = {
  complaints24hPause: number;
  complaints7dPause: number;
  failedSend1hRatePause: number;
  failedSend1hMinAttempts: number;
  hardBounceRateAlert: number;
  hardBounceMinSends: number;
  optouts7dAlert: number;
  stuckLeadsAlert: number;
};

export const DEFAULT_THRESHOLDS: GuardrailThresholds = {
  complaints24hPause: 2,
  complaints7dPause: 3,
  failedSend1hRatePause: 0.25,
  failedSend1hMinAttempts: 4,
  hardBounceRateAlert: 0.05,
  hardBounceMinSends: 20,
  optouts7dAlert: 3,
  stuckLeadsAlert: 3,
};

export type GuardrailBreach = {
  rule: string;
  severity: "alert" | "pause";
  detail: string;
};

export type GuardrailVerdict = {
  breaches: GuardrailBreach[];
  shouldPause: boolean;
  pauseReason: string | null;
};

// ── Internal helpers ───────────────────────────────────────────────────────────

const n = (v: number | null | undefined): number => Number(v) || 0;

const EMPTY_VERDICT: GuardrailVerdict = {
  breaches: [],
  shouldPause: false,
  pauseReason: null,
};

// ── PURE guardrail evaluator ───────────────────────────────────────────────────

export function evaluateGuardrails(
  h: NurtureHealth,
  t: GuardrailThresholds = DEFAULT_THRESHOLDS,
): GuardrailVerdict {
  const breaches: GuardrailBreach[] = [];

  if (h.complaints24h >= t.complaints24hPause) {
    breaches.push({
      rule: "complaints_24h",
      severity: "pause",
      detail: `${h.complaints24h} complaint(s) in the last 24 hours (threshold: ${t.complaints24hPause}).`,
    });
  }

  if (h.complaints7d >= t.complaints7dPause) {
    breaches.push({
      rule: "complaints_7d",
      severity: "pause",
      detail: `${h.complaints7d} complaint(s) in the last 7 days (threshold: ${t.complaints7dPause}).`,
    });
  }

  const realAttempts1h = Math.max(0, h.sends1h - h.skipped1h);
  if (
    realAttempts1h >= t.failedSend1hMinAttempts &&
    h.failed1h / realAttempts1h > t.failedSend1hRatePause
  ) {
    const pct = Math.round((h.failed1h / realAttempts1h) * 100);
    breaches.push({
      rule: "failed_send_rate_1h",
      severity: "pause",
      detail:
        `${pct}% of real send attempts failed in the last hour ` +
        `(${h.failed1h} of ${realAttempts1h}; threshold: ${Math.round(t.failedSend1hRatePause * 100)}%).`,
    });
  }

  if (
    h.sent24h >= t.hardBounceMinSends &&
    h.bounces24h / h.sent24h > t.hardBounceRateAlert
  ) {
    const pct = Math.round((h.bounces24h / h.sent24h) * 100);
    breaches.push({
      rule: "hard_bounce_rate",
      severity: "alert",
      detail:
        `Hard bounce rate is ${pct}% ` +
        `(${h.bounces24h} of ${h.sent24h} delivered sends in 24 hours; ` +
        `threshold: ${Math.round(t.hardBounceRateAlert * 100)}%).`,
    });
  }

  if (h.optouts7d >= t.optouts7dAlert) {
    breaches.push({
      rule: "optouts_7d",
      severity: "alert",
      detail: `${h.optouts7d} opt-out(s) in the last 7 days (threshold: ${t.optouts7dAlert}).`,
    });
  }

  if (h.stuckLeads >= t.stuckLeadsAlert) {
    breaches.push({
      rule: "stuck_leads",
      severity: "alert",
      detail: `${h.stuckLeads} lead(s) are stuck in the nurture queue (threshold: ${t.stuckLeadsAlert}).`,
    });
  }

  const pauseBreaches = breaches.filter((b) => b.severity === "pause");
  const shouldPause = pauseBreaches.length > 0;
  const pauseReason = shouldPause
    ? pauseBreaches.map((b) => b.detail).join("; ")
    : null;

  return { breaches, shouldPause, pauseReason };
}

// ── vw_lead_nurture_health row (internal) ─────────────────────────────────────

type HealthViewRow = {
  site_key: string;
  sends_24h: number | null;
  sent_24h: number | null;
  failed_24h: number | null;
  skipped_24h: number | null;
  sends_1h: number | null;
  failed_1h: number | null;
  skipped_1h: number | null;
  complaints_24h: number | null;
  complaints_7d: number | null;
  bounces_24h: number | null;
  bounces_7d: number | null;
  optouts_7d: number | null;
  replies_24h: number | null;
  booked_24h: number | null;
  active_leads: number | null;
  stuck_leads: number | null;
  contactable: number | null;
  unreachable: number | null;
  forwarded: number | null;
  opened_24h: number | null;
  clicked_24h: number | null;
  opened_7d: number | null;
  clicked_7d: number | null;
};

// ── getNurtureHealth ──────────────────────────────────────────────────────────

export async function getNurtureHealth(
  siteKey: string = "contractors-ir35",
): Promise<NurtureHealth | null> {
  try {
    const res = await adminSelect<HealthViewRow>("vw_lead_nurture_health", {
      site_key: `eq.${siteKey}`,
      select: "*",
      limit: "1",
    });
    if (!res.ok || res.data.length === 0) return null;
    const r = res.data[0];
    return {
      siteKey: r.site_key ?? siteKey,
      sends24h: n(r.sends_24h),
      sent24h: n(r.sent_24h),
      failed24h: n(r.failed_24h),
      skipped24h: n(r.skipped_24h),
      sends1h: n(r.sends_1h),
      failed1h: n(r.failed_1h),
      skipped1h: n(r.skipped_1h),
      complaints24h: n(r.complaints_24h),
      complaints7d: n(r.complaints_7d),
      bounces24h: n(r.bounces_24h),
      bounces7d: n(r.bounces_7d),
      optouts7d: n(r.optouts_7d),
      replies24h: n(r.replies_24h),
      booked24h: n(r.booked_24h),
      activeLeads: n(r.active_leads),
      stuckLeads: n(r.stuck_leads),
      contactable: n(r.contactable),
      unreachable: n(r.unreachable),
      forwarded: n(r.forwarded),
      opened24h: n(r.opened_24h),
      clicked24h: n(r.clicked_24h),
      opened7d: n(r.opened_7d),
      clicked7d: n(r.clicked_7d),
    };
  } catch {
    return null;
  }
}

// ── runNurtureGuardrails ──────────────────────────────────────────────────────

export async function runNurtureGuardrails(opts: {
  autopauseEnabled: boolean;
}): Promise<{ verdict: GuardrailVerdict; alerted: boolean; paused: boolean }> {
  const health = await getNurtureHealth("contractors-ir35");
  if (!health) {
    return { verdict: EMPTY_VERDICT, alerted: false, paused: false };
  }

  const verdict = evaluateGuardrails(health);

  if (verdict.breaches.length === 0) {
    return { verdict, alerted: false, paused: false };
  }

  const stableKey = verdict.breaches
    .map((b) => b.rule)
    .sort()
    .join("|");

  const control = await getNurtureControl().catch(() => ({
    paused: false,
    pausedReason: null as string | null,
    pausedAt: null as string | null,
    pausedBy: null as string | null,
    lastAlertAt: null as string | null,
    lastAlertKey: null as string | null,
    lastCronRunAt: null as string | null,
    lastDigestRunAt: null as string | null,
  }));

  let alerted = false;

  // Alert only when the breach set CHANGES (owner request 2026-07-19):
  // a persisting identical breach never re-emails, regardless of age.
  const alreadyAlerted = control.lastAlertKey === stableKey && control.lastAlertAt !== null;

  if (!alreadyAlerted && process.env.RESEND_API_KEY) {
    const count = verdict.breaches.length;
    const subject = `Lead nurture guardrail: ${count} signal(s)`;
    const pauseNote = verdict.shouldPause
      ? `Auto-pause: ${opts.autopauseEnabled ? "will be applied." : "disabled by config."}`
      : "No pause applied (alert only).";
    const breachLines = verdict.breaches
      .map((b) => `[${b.severity.toUpperCase()}] ${b.rule}: ${b.detail}`)
      .join("\n");
    const text =
      `Lead nurture guardrail alert.\n\n` +
      breachLines +
      `\n\n${pauseNote}\n` +
      `Timestamp: ${new Date().toISOString()}\n` +
      `Site: contractors-ir35`;

    try {
      await getResend().emails.send({
        from: getFromAddress(),
        to: resolveLeadTo("contractors-ir35"),
        subject,
        text,
      });
      await recordGuardrailAlert(stableKey);
      alerted = true;
    } catch (err) {
      console.error("[nurture-health] guardrail alert send failed", err);
    }
  }

  let paused = false;
  if (opts.autopauseEnabled && verdict.shouldPause && !control.paused) {
    try {
      await pauseNurture(verdict.pauseReason ?? "guardrail", "auto");
      paused = true;
    } catch (err) {
      console.error("[nurture-health] auto-pause failed", err);
    }
  }

  return { verdict, alerted, paused };
}
