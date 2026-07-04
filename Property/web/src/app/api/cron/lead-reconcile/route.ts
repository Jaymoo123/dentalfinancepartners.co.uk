/**
 * Lead-reconciliation safety-net cron (daily). Catches nurture-ELIGIBLE leads
 * that, for any reason (an outage, a lost trigger, a bug), never got a
 * lead_nurture_state row, and retro-enrols them via the shared idempotent
 * enrollLead path. This is the backstop behind the submit chokepoint: if the
 * primary enrolment ever silently fails, this sweep repairs it within a day.
 *
 * It scans a short lookback window of recent leads, filters to those still
 * eligible for nurture, subtracts the ones that already have a state row, and
 * enrols the survivors. If it finds more than a small threshold of un-enrolled
 * eligible leads, that signals a real regression and it console.error's an ALERT
 * so the miss surfaces in logs / alerting.
 *
 * Deferral: enrollLead is called with deferFirstTouch:true so step 0 is SCHEDULED
 * for the next send window rather than fired immediately. This prevents a 04:30am
 * burst of instant touches every time the cron runs.
 *
 * Same-email dedupe: the scan is ordered created_at.desc, so the newest row per
 * email wins. Two guards run in sequence:
 *   1. In-sweep Set: when two candidates share a lowercased email, the second
 *      (older) one is skipped.
 *   2. Cross-row sibling query: for the surviving candidates, we look up sibling
 *      leads sharing the same email in the leads table (any age). If any sibling
 *      already has a lead_nurture_state row, the candidate is skipped. This catches
 *      duplicate submissions where one half was already enrolled before this sweep.
 * Residual: the sibling query is exact-case; the in-sweep set is lowercased.
 *
 * Age guard: candidates older than MAX_LIVE_ENROL_AGE_HOURS (72h) are not
 * live-enrolled by this cron. Their ids are included in the ALERT payload.
 * For stale leads, use POST /api/leads/enroll for manual one-at-a-time enrolment.
 * Detection and alerting remain at 7-day LOOKBACK_DAYS; only auto-enrolment is
 * gated to 72h.
 *
 * Auth: CRON_SECRET bearer (constant-time), mirroring /api/cron/lead-nurture.
 * enrollLead itself no-ops while dormant, so this is inert until the system is
 * armed (it will still report the un-enrolled counts).
 *
 * SAFETY: DRY-RUN by default. Until env LEAD_RECONCILE_ENABLED=1|true the sweep
 * reports what it WOULD enrol (wouldEnrol) but enrols nothing, so the first prod
 * run cannot fire a burst of belated touches at recent un-enrolled leads. The
 * ALERT still fires in dry-run mode, so regressions surface immediately.
 * wouldEnrol reflects what a live run would actually enrol: after dedupe + age
 * guard, so the daily report is truthful.
 *
 * British English. No em-dashes.
 */

import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { adminConfigured, adminSelect } from "@/lib/supabase/admin";
import { enrollLead } from "@/lib/leads/enroll";
import { routePrimarySequence } from "@/config/lead-nurture";
import type { NurtureLead } from "@accounting-network/web-shared/lead-nurture/config";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

/** How far back to scan for leads missing a nurture-state row. */
const LOOKBACK_DAYS = 7;
/** Max leads to scan per run (guards the query + runtime). */
const SCAN_LIMIT = 500;
/** Un-enrolled count at or above this signals a real regression -> ALERT. */
const ALERT_THRESHOLD = 3;
/**
 * Candidates older than this are not live-enrolled by the cron. Use
 * POST /api/leads/enroll for manual one-at-a-time enrolment of stale leads.
 */
const MAX_LIVE_ENROL_AGE_HOURS = 72;

/** Whether the sweep actually enrols (true) or only reports (dry-run, default). */
function reconcileEnabled(): boolean {
  const v = process.env.LEAD_RECONCILE_ENABLED;
  return v === "1" || v === "true";
}

/**
 * Statuses that mean the lead is already handled / terminal, so a missing
 * state row is expected and MUST NOT be re-enrolled. Only 'new' and 'nurturing'
 * are reconciled: a lead can be 'nurturing' yet have lost / never created its
 * state row, which is exactly the case we repair.
 */
const RECONCILE_STATUSES = new Set(["new", "nurturing"]);

interface ReconcileLeadRow {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: string | null;
  source: string | null;
  message: string | null;
  visitor_id: string | null;
  status: string | null;
  extras: Record<string, unknown> | null;
  created_at: string;
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

/**
 * Eligibility predicate for reconciliation. A lead is reconcile-eligible iff:
 *   - source is not 'test' (synthetic probes are never nurtured), AND
 *   - role is not 'resource' (Annex B.2 resource downloads, in-house consent,
 *     intentionally not nurtured), AND
 *   - it is not honeypot / suspected spam (extras flags), AND
 *   - its status is still 'new' or 'nurturing' (any terminal / handled status
 *     is deliberately excluded).
 */
function isReconcileEligible(lead: ReconcileLeadRow): boolean {
  if ((lead.source ?? "") === "test") return false;
  if ((lead.role ?? "") === "resource") return false;
  const extras = lead.extras ?? {};
  if (extras.honeypot === true || extras.suspected_spam === true) return false;
  if (!RECONCILE_STATUSES.has(lead.status ?? "")) return false;
  return true;
}

/**
 * Quote an email address for a PostgREST in.() list value.
 *
 * PostgREST in.() list items that contain commas, parentheses, or other
 * special characters must be double-quoted. Email addresses contain '@' and '.'
 * which are safe unquoted in most PostgREST versions, but the spec also allows
 * embedded double-quotes escaped as two double-quotes. For simplicity and safety
 * we wrap every email in double quotes, escaping any literal double-quote with
 * a second double-quote: e.g. `foo@bar.com` -> `"foo@bar.com"`.
 */
function quotePostgrestEmail(email: string): string {
  return `"${email.replace(/"/g, '""')}"`;
}

async function run(req: NextRequest): Promise<NextResponse> {
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const nowMs = Date.now();
  const sinceIso = new Date(nowMs - LOOKBACK_DAYS * 86_400_000).toISOString();
  const maxAgeMs = MAX_LIVE_ENROL_AGE_HOURS * 3_600_000;

  // 1. Pull the recent Property leads in the lookback window (newest first).
  const scanRes = await adminSelect<ReconcileLeadRow>("leads", {
    select: "id,full_name,email,phone,role,source,message,visitor_id,status,extras,created_at",
    source: "eq.property",
    created_at: `gte.${sinceIso}`,
    order: "created_at.desc",
    limit: String(SCAN_LIMIT),
  });
  const scanned = scanRes.data.length;

  // 2. Keep only the nurture-eligible ones.
  const eligible = scanRes.data.filter(isReconcileEligible);

  // 3. Of those, find which already have a lead_nurture_state row (one query),
  //    and keep only the leads NOT present.
  let unEnrolled: ReconcileLeadRow[] = [];
  if (eligible.length > 0) {
    const ids = eligible.map((l) => l.id);
    const stateRes = await adminSelect<{ lead_id: string }>("lead_nurture_state", {
      select: "lead_id",
      lead_id: `in.(${ids.join(",")})`,
    });
    const enrolledIds = new Set(stateRes.data.map((r) => r.lead_id));
    unEnrolled = eligible.filter((l) => !enrolledIds.has(l.id));
  }

  const missing = unEnrolled.length;

  // 4. Same-email dedupe -- in-sweep pass.
  //    The scan is ordered created_at.desc so the first row seen for a given
  //    email (the newest) wins; later rows (older duplicates) are skipped.
  let skippedDuplicate = 0;
  const seenEmails = new Set<string>();
  const deduped: ReconcileLeadRow[] = [];
  for (const row of unEnrolled) {
    const key = (row.email ?? "").toLowerCase().trim();
    if (seenEmails.has(key)) {
      skippedDuplicate += 1;
      continue;
    }
    seenEmails.add(key);
    deduped.push(row);
  }

  // 5. Same-email dedupe -- cross-row sibling pass.
  //    For the in-sweep survivors, look up any OTHER leads sharing the same email
  //    (no age restriction) that already have a state row. If found, skip the
  //    candidate: that email is already being nurtured via a sibling row.
  //    Note: the sibling query is exact-case on the stored email value; the
  //    in-sweep Set above is lowercased. There is therefore a residual risk of
  //    a case mismatch (e.g. "Jane@example.com" vs "jane@example.com") not being
  //    caught by the cross-row check.
  let afterSiblingDedupe = deduped;
  if (deduped.length > 0) {
    const candidateIds = new Set(deduped.map((l) => l.id));
    const rawEmails = deduped.map((l) => l.email).filter(Boolean) as string[];

    if (rawEmails.length > 0) {
      // Find all leads sharing any of the candidate emails (excluding the
      // candidates themselves, which have no state row by definition).
      const quotedEmails = rawEmails.map(quotePostgrestEmail).join(",");
      const siblingLeadRes = await adminSelect<{ id: string; email: string }>("leads", {
        select: "id,email",
        email: `in.(${quotedEmails})`,
      });

      // Of those sibling leads, find which have a state row.
      const siblingIds = siblingLeadRes.data
        .map((r) => r.id)
        .filter((id) => !candidateIds.has(id));

      const alreadyNurturedEmails = new Set<string>();
      if (siblingIds.length > 0) {
        const siblingStateRes = await adminSelect<{ lead_id: string }>("lead_nurture_state", {
          select: "lead_id",
          lead_id: `in.(${siblingIds.join(",")})`,
        });
        const siblingEnrolledIds = new Set(siblingStateRes.data.map((r) => r.lead_id));
        // Map back from enrolled sibling lead ids to their emails.
        for (const r of siblingLeadRes.data) {
          if (siblingEnrolledIds.has(r.id)) {
            alreadyNurturedEmails.add((r.email ?? "").toLowerCase().trim());
          }
        }
      }

      afterSiblingDedupe = [];
      for (const row of deduped) {
        const key = (row.email ?? "").toLowerCase().trim();
        if (alreadyNurturedEmails.has(key)) {
          skippedDuplicate += 1;
        } else {
          afterSiblingDedupe.push(row);
        }
      }
    }
  }

  // 6. Age guard: candidates older than MAX_LIVE_ENROL_AGE_HOURS are not
  //    live-enrolled by this cron. They are counted as skippedStale and their
  //    ids are included in the ALERT payload for manual follow-up.
  let skippedStale = 0;
  const staleIds: string[] = [];
  const toEnrol: ReconcileLeadRow[] = [];
  for (const row of afterSiblingDedupe) {
    const ageMs = nowMs - new Date(row.created_at).getTime();
    if (ageMs > maxAgeMs) {
      skippedStale += 1;
      staleIds.push(row.id);
    } else {
      toEnrol.push(row);
    }
  }

  // 7. ALERT on a real regression: more than a small threshold of eligible leads
  //    with no state row means the primary enrolment path is dropping leads.
  const alerted = missing >= ALERT_THRESHOLD;
  if (alerted) {
    console.error("[lead-reconcile] ALERT: N leads were un-enrolled", {
      count: missing,
      ids: unEnrolled.map((l) => l.id),
      staleIds,
    });
  }

  // 8. Retro-enrol each survivor via the shared path with deferFirstTouch:true
  //    so step 0 is scheduled for the next send window, not fired at 04:30am.
  //    DRY-RUN by default: unless LEAD_RECONCILE_ENABLED is set, we only count
  //    what WOULD be enrolled. enrollLead also no-ops while dormant (skippedDormant).
  const enabled = reconcileEnabled();
  let enrolled = 0;
  let skippedDormant = 0;
  let wouldEnrol = 0;

  if (!enabled) {
    // Dry-run: report what a live run would enrol (after dedupe + age guard).
    wouldEnrol = toEnrol.length;
  } else {
    for (const row of toEnrol) {
      try {
        const lead: NurtureLead = {
          id: row.id,
          full_name: row.full_name ?? "",
          email: row.email ?? "",
          phone: row.phone ?? "",
          role: row.role ?? undefined,
          source: row.source ?? "property",
          message: row.message ?? undefined,
        };
        const result = await enrollLead(lead, {
          sequenceName: routePrimarySequence(lead),
          visitorId: row.visitor_id,
          deferFirstTouch: true,
        });
        if (result.enrolled) {
          enrolled += 1;
        } else {
          skippedDormant += 1;
        }
      } catch (e) {
        // Best-effort per lead: one failure must not abort the sweep.
        console.error("[lead-reconcile] enrol failed for lead", row.id, e);
      }
    }
  }

  const dryRun = !enabled;
  const summary = {
    scanned,
    eligible: eligible.length,
    missing,
    enrolled,
    wouldEnrol,
    skippedDormant,
    skippedDuplicate,
    skippedStale,
    alerted,
    dryRun,
  };
  console.log("[lead-reconcile] summary", summary);

  return NextResponse.json({
    ok: true,
    scanned,
    missing,
    enrolled,
    wouldEnrol,
    alerted,
    dryRun,
    skippedDuplicate,
    skippedStale,
  });
}

export async function GET(req: NextRequest) {
  return run(req);
}
export async function POST(req: NextRequest) {
  return run(req);
}
