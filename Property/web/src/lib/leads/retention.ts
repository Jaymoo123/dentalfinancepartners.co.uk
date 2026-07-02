/**
 * Lead data retention purge (GDPR anonymisation).
 *
 * The privacy notice promises: "We keep enquiry data for
 * {company.enquiryRetentionMonths} months from the date of your enquiry,
 * after which it is deleted." The data-sharing agreement requires
 * deletion/anonymisation of contact details and message content within 3
 * months of the enquiry date.
 *
 * We ANONYMISE rather than hard-delete so the consent record and audit trail
 * survive (consent_text, consent_at, status, source, created_at are never
 * touched). PII fields (name, email, phone, message, verification data,
 * verbatim event bodies) are stripped or replaced with placeholder values.
 *
 * SHIPS DORMANT: the cron route is DRY-RUN by default. Nothing is mutated
 * until LEAD_RETENTION_PURGE_ENABLED=1 is set in the environment.
 *
 * House style: no em-dashes. British English. Never throws.
 */

import { adminSelect, adminUpdate } from "@/lib/supabase/admin";
import { siteConfig } from "@/config/site";

/** Maximum number of leads processed in a single cron invocation. */
const BATCH_LIMIT = 500;

// ---------------------------------------------------------------------------
// Pure helper (fully unit-tested)
// ---------------------------------------------------------------------------

/**
 * Returns the ISO 8601 timestamp that is exactly `months` calendar months
 * before `nowMs`. Uses JavaScript's Date.setMonth so month-end overflow
 * follows JS semantics (e.g. 31 Mar minus 1 month = 3 Mar in a non-leap
 * year, matching the browser and server runtime behaviour consistently).
 */
export function retentionCutoffIso(nowMs: number, months: number): string {
  const d = new Date(nowMs);
  d.setMonth(d.getMonth() - months);
  return d.toISOString();
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LeadRow {
  id: string;
  email: string;
  extras: Record<string, unknown> | null;
}

export interface RetentionPurgeResult {
  dryRun: boolean;
  cutoff: string;
  months: number;
  candidates: number;
  anonymised: number;
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

/**
 * Identifies leads whose PII has exceeded the configured retention window and
 * (when armed) anonymises them in place.
 *
 * Per-lead anonymisation applied when dryRun=false:
 *   leads              full_name  -> '[redacted]'
 *                      email      -> 'redacted-<id>@invalid'  (unique, no collision)
 *                      phone      -> ''
 *                      message    -> '[redacted]'
 *                      extras     -> merged with { anonymised_at: <nowIso> }
 *   lead_verification  phone_e164 -> null, phone_carrier -> null, raw -> null
 *   lead_contact_events meta      -> null  (event_type/channel/ts kept for audit)
 *
 * Preserved unconditionally: consent_text, consent_at, status, source,
 * created_at. These form the minimal lawful-basis audit trail.
 *
 * A per-lead error is logged and the lead skipped; it will be retried on the
 * next daily run. This function never throws.
 */
export async function runLeadRetentionPurge(opts: {
  dryRun: boolean;
  nowMs?: number;
}): Promise<RetentionPurgeResult> {
  const nowMs = opts.nowMs ?? Date.now();
  const nowIso = new Date(nowMs).toISOString();

  // Resolve the configured retention period. Falls back to 3 months (the
  // minimum mandated by the data-sharing agreement) if the config is
  // unreadable for any reason.
  let months = 3;
  try {
    const configured = siteConfig.company.enquiryRetentionMonths;
    if (typeof configured === "number" && configured > 0) {
      months = configured;
    }
  } catch {
    // Config read failed; 3-month default stands.
  }

  const cutoff = retentionCutoffIso(nowMs, months);

  // Fetch candidate leads: Property source, created before the cutoff, capped
  // at BATCH_LIMIT so a large historical backlog cannot time out a single run.
  // Rows whose extras already contain anonymised_at are filtered out in JS to
  // avoid a complex PostgREST JSONB filter in the query string.
  let candidateRows: LeadRow[] = [];
  try {
    const res = await adminSelect<LeadRow>("leads", {
      select: "id,email,extras",
      source: "eq.property",
      created_at: `lt.${cutoff}`,
      order: "created_at.asc",
      limit: String(BATCH_LIMIT),
    });
    if (res.ok) {
      candidateRows = res.data.filter((row) => {
        const ext = row.extras;
        return !(ext && typeof ext === "object" && "anonymised_at" in ext);
      });
    } else {
      console.error("[lead-retention] adminSelect failed", res.status);
    }
  } catch (err) {
    console.error("[lead-retention] failed to fetch candidates", err);
  }

  const candidates = candidateRows.length;

  if (opts.dryRun) {
    return { dryRun: true, cutoff, months, candidates, anonymised: 0 };
  }

  // Armed: anonymise each candidate lead individually.
  let anonymised = 0;

  for (const lead of candidateRows) {
    try {
      const existingExtras: Record<string, unknown> =
        lead.extras && typeof lead.extras === "object" ? { ...lead.extras } : {};
      const mergedExtras: Record<string, unknown> = {
        ...existingExtras,
        anonymised_at: nowIso,
      };

      // 1. Strip PII from the leads row.
      const leadsRes = await adminUpdate<unknown>(
        "leads",
        { id: `eq.${lead.id}` },
        {
          full_name: "[redacted]",
          email: `redacted-${lead.id}@invalid`,
          phone: "",
          message: "[redacted]",
          extras: mergedExtras,
        },
      );

      if (!leadsRes.ok) {
        console.error(
          `[lead-retention] leads update failed for ${lead.id} (HTTP ${leadsRes.status})`,
        );
        continue;
      }

      // 2. Drop carrier and raw data from the verification row.
      await adminUpdate<unknown>(
        "lead_verification",
        { lead_id: `eq.${lead.id}` },
        { phone_e164: null, phone_carrier: null, raw: null },
      );

      // 3. Null out meta on contact events to remove verbatim message bodies.
      //    event_type, channel, and ts are untouched to preserve the audit trail.
      await adminUpdate<unknown>(
        "lead_contact_events",
        { lead_id: `eq.${lead.id}` },
        { meta: null },
      );

      anonymised++;
    } catch (err) {
      console.error(`[lead-retention] error anonymising lead ${lead.id}`, err);
      // Continue to the next lead; never throw.
    }
  }

  return { dryRun: false, cutoff, months, candidates, anonymised };
}
