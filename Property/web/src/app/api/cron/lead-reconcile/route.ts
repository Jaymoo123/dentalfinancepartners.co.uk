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
 * Auth: CRON_SECRET bearer (constant-time), mirroring /api/cron/lead-nurture.
 * enrollLead itself no-ops while dormant, so this is inert until the system is
 * armed (it will still report the un-enrolled counts).
 *
 * SAFETY: DRY-RUN by default. Until env LEAD_RECONCILE_ENABLED=1|true the sweep
 * reports what it WOULD enrol (wouldEnrol) but enrols nothing, so the first prod
 * run cannot fire a burst of belated touches at recent un-enrolled leads. The
 * ALERT still fires in dry-run mode, so regressions surface immediately.
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

async function run(req: NextRequest): Promise<NextResponse> {
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const sinceIso = new Date(Date.now() - LOOKBACK_DAYS * 86_400_000).toISOString();

  // 1. Pull the recent Property leads in the lookback window.
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

  // 4. ALERT on a real regression: more than a small threshold of eligible leads
  //    with no state row means the primary enrolment path is dropping leads.
  const alerted = missing >= ALERT_THRESHOLD;
  if (alerted) {
    console.error("[lead-reconcile] ALERT: N leads were un-enrolled", {
      count: missing,
      ids: unEnrolled.map((l) => l.id),
    });
  }

  // 5. Retro-enrol each survivor via the shared path. DRY-RUN by default: unless
  //    LEAD_RECONCILE_ENABLED is set, we only count what WOULD be enrolled, so the
  //    first prod run cannot fire a burst of belated touches. enrollLead also
  //    no-ops while dormant (skippedDormant), a second fail-safe.
  const enabled = reconcileEnabled();
  let enrolled = 0;
  let skippedDormant = 0;
  let wouldEnrol = 0;
  for (const row of unEnrolled) {
    if (!enabled) {
      wouldEnrol += 1;
      continue;
    }
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

  const dryRun = !enabled;
  const summary = { scanned, eligible: eligible.length, missing, enrolled, wouldEnrol, skippedDormant, alerted, dryRun };
  console.log("[lead-reconcile] summary", summary);

  return NextResponse.json({ ok: true, scanned, missing, enrolled, wouldEnrol, alerted, dryRun });
}

export async function GET(req: NextRequest) {
  return run(req);
}
export async function POST(req: NextRequest) {
  return run(req);
}
