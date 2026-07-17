/**
 * Kill-switch control library for the Trade Tax Specialists lead-nurture system.
 *
 * Reads and writes the lead_nurture_control table, keyed by
 * site_key='construction-cis'. All reads are FAIL-OPEN: a missing table,
 * missing row, or transient DB error returns the all-false/null default so a
 * bad DB state can never block sends. All writes fail silently (log, no throw).
 *
 * NEVER import into a client component: uses the service-role admin client.
 */

import { adminSelect, adminInsert } from "@/lib/supabase/admin";

// ── Types ─────────────────────────────────────────────────────────────────────

export type NurtureControl = {
  paused: boolean;
  pausedReason: string | null;
  pausedAt: string | null;
  pausedBy: string | null;
  lastAlertAt: string | null;
  lastAlertKey: string | null;
  lastCronRunAt: string | null;
  lastDigestRunAt: string | null;
};

type DbRow = {
  paused: boolean;
  paused_reason: string | null;
  paused_at: string | null;
  paused_by: string | null;
  last_alert_at: string | null;
  last_alert_key: string | null;
  last_cron_run_at: string | null;
  last_digest_run_at: string | null;
};

const DEFAULT_CONTROL: NurtureControl = {
  paused: false,
  pausedReason: null,
  pausedAt: null,
  pausedBy: null,
  lastAlertAt: null,
  lastAlertKey: null,
  lastCronRunAt: null,
  lastDigestRunAt: null,
};

const SITE_KEY = "construction-cis";

function toControl(row: DbRow): NurtureControl {
  return {
    paused: row.paused,
    pausedReason: row.paused_reason,
    pausedAt: row.paused_at,
    pausedBy: row.paused_by,
    lastAlertAt: row.last_alert_at,
    lastAlertKey: row.last_alert_key,
    lastCronRunAt: row.last_cron_run_at,
    lastDigestRunAt: row.last_digest_run_at,
  };
}

// ── Reads (fail-open) ─────────────────────────────────────────────────────────

export async function getNurtureControl(): Promise<NurtureControl> {
  try {
    const res = await adminSelect<DbRow>("lead_nurture_control", {
      select: "paused,paused_reason,paused_at,paused_by,last_alert_at,last_alert_key,last_cron_run_at,last_digest_run_at",
      site_key: `eq.${SITE_KEY}`,
      limit: "1",
    });
    if (!res.ok || res.data.length === 0) return DEFAULT_CONTROL;
    return toControl(res.data[0]);
  } catch (err) {
    console.error("[nurture-control/cis] getNurtureControl error, failing open", err);
    return DEFAULT_CONTROL;
  }
}

export async function isNurturePaused(): Promise<boolean> {
  return (await getNurtureControl()).paused;
}

// ── Writes (fail-silently) ────────────────────────────────────────────────────

export async function pauseNurture(reason: string, by: string): Promise<void> {
  const nowIso = new Date().toISOString();
  try {
    const res = await adminInsert(
      "lead_nurture_control",
      {
        site_key: SITE_KEY,
        paused: true,
        paused_reason: reason,
        paused_at: nowIso,
        paused_by: by,
        updated_at: nowIso,
      },
      { onConflict: "site_key" },
    );
    if (!res.ok) {
      console.error("[nurture-control/cis] pauseNurture write failed", res.status);
    }
  } catch (err) {
    console.error("[nurture-control/cis] pauseNurture error", err);
  }
}

export async function resumeNurture(by: string): Promise<void> {
  const nowIso = new Date().toISOString();
  try {
    const res = await adminInsert(
      "lead_nurture_control",
      {
        site_key: SITE_KEY,
        paused: false,
        paused_reason: null,
        paused_at: null,
        paused_by: by,
        updated_at: nowIso,
      },
      { onConflict: "site_key" },
    );
    if (!res.ok) {
      console.error("[nurture-control/cis] resumeNurture write failed", res.status);
    }
  } catch (err) {
    console.error("[nurture-control/cis] resumeNurture error", err);
  }
}

export async function recordGuardrailAlert(key: string): Promise<void> {
  const nowIso = new Date().toISOString();
  try {
    const res = await adminInsert(
      "lead_nurture_control",
      {
        site_key: SITE_KEY,
        last_alert_at: nowIso,
        last_alert_key: key,
        updated_at: nowIso,
      },
      { onConflict: "site_key" },
    );
    if (!res.ok) {
      console.error("[nurture-control/cis] recordGuardrailAlert write failed", res.status);
    }
  } catch (err) {
    console.error("[nurture-control/cis] recordGuardrailAlert error", err);
  }
}

export async function recordCronHeartbeat(): Promise<void> {
  const nowIso = new Date().toISOString();
  try {
    const res = await adminInsert(
      "lead_nurture_control",
      {
        site_key: SITE_KEY,
        last_cron_run_at: nowIso,
        updated_at: nowIso,
      },
      { onConflict: "site_key" },
    );
    if (!res.ok) {
      console.error("[nurture-control/cis] recordCronHeartbeat write failed", res.status);
    }
  } catch (err) {
    console.error("[nurture-control/cis] recordCronHeartbeat error", err);
  }
}

export async function recordDigestHeartbeat(): Promise<void> {
  const nowIso = new Date().toISOString();
  try {
    const res = await adminInsert(
      "lead_nurture_control",
      {
        site_key: SITE_KEY,
        last_digest_run_at: nowIso,
        updated_at: nowIso,
      },
      { onConflict: "site_key" },
    );
    if (!res.ok) {
      console.error("[nurture-control/cis] recordDigestHeartbeat write failed", res.status);
    }
  } catch (err) {
    console.error("[nurture-control/cis] recordDigestHeartbeat error", err);
  }
}
