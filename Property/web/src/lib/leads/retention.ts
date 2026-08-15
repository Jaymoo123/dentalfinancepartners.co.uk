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

/** Maximum number of leads processed in a single cron invocation. */
const BATCH_LIMIT = 500;

/**
 * Retention period per source site, in months.
 *
 * This route runs inside the Property app but the `leads` table is shared by every
 * site, so it cannot read each site's own siteConfig at runtime. This is a mirror of
 * `company.enquiry_retention_months` in each site's niche.config.json, in the same
 * spirit as the tiers.ts mirror, and `retention-drift.test.ts` fails if any site's
 * config no longer matches. Each number must equal what that site publishes in its
 * privacy notice, because that published figure is the promise being kept.
 *
 * DEFAULT_MONTHS applies to a source with no entry, and is deliberately the shortest
 * period in use: an unknown site gets the strictest treatment, not the loosest.
 */
export const RETENTION_MONTHS_BY_SOURCE: Record<string, number> = {
  property: 3,
  ashfield: 3,
  dentists: 24,
  medical: 24,
  solicitors: 24,
  generalist: 24,
  care: 24,
  charities: 24,
  crypto: 24,
  ecommerce: 24,
  hospitality: 24,
  pharmacies: 24,
  "startups-tech": 24,
  "construction-cis": 24,
  "contractors-ir35": 24,
  "digital-agency": 24,
  "divorce-finances": 24,
  "wills-probate": 24,
};
const DEFAULT_MONTHS = 3;

/** The longest period any site publishes; the DSA longstop must not be shorter. */
export const MAX_RETENTION_MONTHS = Math.max(
  ...Object.values(RETENTION_MONTHS_BY_SOURCE),
);

/** The shortest period any site publishes; the purge scan must use this. */
export const MIN_RETENTION_MONTHS = Math.min(
  ...Object.values(RETENTION_MONTHS_BY_SOURCE),
  DEFAULT_MONTHS,
);

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
  source: string | null;
  created_at: string;
  extras: Record<string, unknown> | null;
}

export interface RetentionPurgeResult {
  dryRun: boolean;
  /** Cutoff for the shortest period in use; per-source cutoffs are applied per lead. */
  cutoff: string;
  months: number;
  candidates: number;
  anonymised: number;
  /** Candidate count per source, so a run is legible in the cron log. */
  bySource: Record<string, number>;
}

/** True when this lead is past the retention period published by its own site. */
export function isPastRetention(source: string | null, createdAt: string, nowMs: number): boolean {
  const months = RETENTION_MONTHS_BY_SOURCE[(source || "").toLowerCase()] ?? DEFAULT_MONTHS;
  return createdAt < retentionCutoffIso(nowMs, months);
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

  // The query uses the SHORTEST period in use so a single scan covers every site;
  // each candidate is then tested against its own site's published period via
  // isPastRetention. Scanning with the shortest period cannot miss a lead: it
  // fetches everything older than the earliest possible deadline, and the
  // per-lead check discards rows whose own (longer) period has not yet passed.
  // (Scanning with the LONGEST period was the 2026-08 bug: created_at < now-24mo
  // excludes every lead younger than 24 months, which is exactly the population
  // the 3-month sites' promises apply to.)
  const months = MIN_RETENTION_MONTHS;
  const cutoff = retentionCutoffIso(nowMs, months);

  // Every source, not just Property: the `leads` table is shared, and until
  // 2026-08-14 this filtered to source=property, so no other site's data was ever
  // purged despite each publishing a retention promise. Capped at BATCH_LIMIT so a
  // large historical backlog cannot time out a single run. Rows whose extras already
  // contain anonymised_at are filtered out in JS to avoid a complex JSONB filter.
  let candidateRows: LeadRow[] = [];
  try {
    const res = await adminSelect<LeadRow>("leads", {
      select: "id,email,source,created_at,extras",
      created_at: `lt.${cutoff}`,
      order: "created_at.asc",
      limit: String(BATCH_LIMIT),
    });
    if (res.ok) {
      candidateRows = res.data.filter((row) => {
        const ext = row.extras;
        if (ext && typeof ext === "object" && "anonymised_at" in ext) return false;
        return isPastRetention(row.source, row.created_at, nowMs);
      });
    } else {
      console.error("[lead-retention] adminSelect failed", res.status);
    }
  } catch (err) {
    console.error("[lead-retention] failed to fetch candidates", err);
  }

  const candidates = candidateRows.length;
  const bySource: Record<string, number> = {};
  for (const row of candidateRows) {
    const key = (row.source || "unknown").toLowerCase();
    bySource[key] = (bySource[key] ?? 0) + 1;
  }

  if (opts.dryRun) {
    return { dryRun: true, cutoff, months, candidates, anonymised: 0, bySource };
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
      delete mergedExtras.role_detail; // free text; must not outlive the retention window

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

      // 4. Derived data. Until 2026-08-14 the purge stopped at step 3, so material
      //    generated FROM the enquiry outlived the enquiry itself: an AI summary of
      //    the person's circumstances, the company matched to them on a public
      //    register, and the one-line situation shown to buyers. Retention has to
      //    cover what was derived from the data, not just the fields they typed.
      await adminUpdate<unknown>(
        "lead_enrichment",
        { lead_id: `eq.${lead.id}` },
        {
          summary: null,
          raw: null,
          ch_company_number: null,
          ch_company_name: null,
          ch_company_status: null,
        },
      );

      // The case tier and case type stay: they are the billing record for any lead
      // that was sold, which clause 11.1 expressly carves out. The intent line is a
      // description of the enquiry, so it goes.
      await adminUpdate<unknown>(
        "lead_value_scores",
        { lead_id: `eq.${lead.id}` },
        { intent_line: null, rationale: "" },
      );

      // Offers keep tier, price and status for invoicing; the teaser body carries
      // the situation line, which does not survive.
      await adminUpdate<unknown>(
        "lead_offers",
        { lead_id: `eq.${lead.id}` },
        { teaser: { redacted: true, anonymised_at: nowIso } },
      );

      anonymised++;
    } catch (err) {
      console.error(`[lead-retention] error anonymising lead ${lead.id}`, err);
      // Continue to the next lead; never throw.
    }
  }

  return { dryRun: false, cutoff, months, candidates, anonymised, bySource };
}
