/**
 * Kill-switch control library for the Property lead-nurture system.
 *
 * Reads and writes the single-row lead_nurture_control table (id=1, created
 * by migration 20260702000001). All reads are FAIL-OPEN: a missing table,
 * missing row, or transient DB error returns the all-false/null default so a
 * bad DB state can never block sends. All writes fail silently (log, no
 * throw) for the same reason.
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
};

type DbRow = {
  paused: boolean;
  paused_reason: string | null;
  paused_at: string | null;
  paused_by: string | null;
  last_alert_at: string | null;
  last_alert_key: string | null;
};

const DEFAULT_CONTROL: NurtureControl = {
  paused: false,
  pausedReason: null,
  pausedAt: null,
  pausedBy: null,
  lastAlertAt: null,
  lastAlertKey: null,
};

function toControl(row: DbRow): NurtureControl {
  return {
    paused: row.paused,
    pausedReason: row.paused_reason,
    pausedAt: row.paused_at,
    pausedBy: row.paused_by,
    lastAlertAt: row.last_alert_at,
    lastAlertKey: row.last_alert_key,
  };
}

// ── Reads (fail-open) ─────────────────────────────────────────────────────────

/**
 * Read the single control row (id=1). FAIL-OPEN: returns the all-false/null
 * default on any error (missing table, missing row, network failure, etc.).
 * A missing table must never block sends. Never throws.
 */
export async function getNurtureControl(): Promise<NurtureControl> {
  try {
    const res = await adminSelect<DbRow>("lead_nurture_control", {
      select: "paused,paused_reason,paused_at,paused_by,last_alert_at,last_alert_key",
      id: "eq.1",
      limit: "1",
    });
    if (!res.ok || res.data.length === 0) return DEFAULT_CONTROL;
    return toControl(res.data[0]);
  } catch (err) {
    console.error("[nurture-control] getNurtureControl error, failing open", err);
    return DEFAULT_CONTROL;
  }
}

/**
 * Returns true when the nurture system is paused. Returns false on any error
 * (fail-open). Never throws.
 */
export async function isNurturePaused(): Promise<boolean> {
  return (await getNurtureControl()).paused;
}

// ── Writes (fail-silently) ────────────────────────────────────────────────────

/**
 * Pause all nurture sends. Upserts id=1 with paused=true, recording the
 * reason and operator identity. Fails silently if the table is missing.
 */
export async function pauseNurture(reason: string, by: string): Promise<void> {
  const nowIso = new Date().toISOString();
  try {
    const res = await adminInsert(
      "lead_nurture_control",
      {
        id: 1,
        paused: true,
        paused_reason: reason,
        paused_at: nowIso,
        paused_by: by,
        updated_at: nowIso,
      },
      { onConflict: "id" },
    );
    if (!res.ok) {
      console.error("[nurture-control] pauseNurture write failed", res.status);
    }
  } catch (err) {
    console.error("[nurture-control] pauseNurture error", err);
  }
}

/**
 * Resume nurture sends. Upserts id=1 with paused=false and clears all pause
 * metadata. Records which operator resumed. Fails silently if the table is
 * missing.
 */
export async function resumeNurture(by: string): Promise<void> {
  const nowIso = new Date().toISOString();
  try {
    const res = await adminInsert(
      "lead_nurture_control",
      {
        id: 1,
        paused: false,
        paused_reason: null,
        paused_at: null,
        paused_by: by,
        updated_at: nowIso,
      },
      { onConflict: "id" },
    );
    if (!res.ok) {
      console.error("[nurture-control] resumeNurture write failed", res.status);
    }
  } catch (err) {
    console.error("[nurture-control] resumeNurture error", err);
  }
}

/**
 * Record that a guardrail alert was fired. Upserts id=1 updating only
 * last_alert_at, last_alert_key, and updated_at (the merge-duplicates
 * strategy on the PostgREST upsert means paused state is untouched on
 * conflict). Fails silently if the table is missing.
 */
export async function recordGuardrailAlert(key: string): Promise<void> {
  const nowIso = new Date().toISOString();
  try {
    const res = await adminInsert(
      "lead_nurture_control",
      {
        id: 1,
        last_alert_at: nowIso,
        last_alert_key: key,
        updated_at: nowIso,
      },
      { onConflict: "id" },
    );
    if (!res.ok) {
      console.error("[nurture-control] recordGuardrailAlert write failed", res.status);
    }
  } catch (err) {
    console.error("[nurture-control] recordGuardrailAlert error", err);
  }
}
