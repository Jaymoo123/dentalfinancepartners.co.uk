/**
 * Shared nurture cron job logic: query due steps and send them.
 *
 * Called from each site's /api/nurture/send route. The route handles
 * SEC-05 (adminConfigured check + secret verification) before calling
 * runNurtureCron.
 *
 * EN-05: claim-before-send is handled in send.ts. Each due row is processed
 * independently; a single step failure does not abort the batch.
 *
 * EN-04: the route passes cronArmed = Boolean(process.env.CRON_SECRET) (or
 * whatever secret env var arms the site). If false this function short-circuits
 * with zero sends (opt-ins are recorded but no email leaves).
 *
 * Status exclusion: the query joins subscribers with status = 'active'; bounced
 * and complained subscribers never appear in the due list.
 */

import { adminSelect } from "./admin";
import { processStep } from "./send";
import type { NurtureConfig } from "./config";
import type { EmailProvider } from "./send";

const BATCH = 50;

type DueRow = {
  subscriber_id: string;
  step: number;
  subscribers: {
    id: string;
    email: string;
    unsubscribe_token: string;
    status: string;
  } | null;
};

export type CronResult = { processed: number; sent: number };

/**
 * Run one cron tick: query due nurture_state rows, send each due step.
 *
 * @param config       Site-specific nurture config.
 * @param provider     Email provider.
 * @param cronArmed    Whether the cron secret is configured (EN-04).
 */
export async function runNurtureCron(
  config: NurtureConfig,
  provider: EmailProvider,
  cronArmed: boolean,
): Promise<CronResult> {
  if (!cronArmed) return { processed: 0, sent: 0 };

  const nowIso = new Date().toISOString();
  const due = await adminSelect<DueRow>("nurture_state", {
    select: "subscriber_id,step,subscribers!inner(id,email,unsubscribe_token,status)",
    sequence: `eq.${config.sequenceName}`,
    status: "eq.active",
    next_send_at: `lte.${nowIso}`,
    "subscribers.status": "eq.active",
    order: "next_send_at.asc",
    limit: String(BATCH),
  });

  let processed = 0;
  let sent = 0;

  for (const row of due.data) {
    const s = row.subscribers;
    if (!s) continue;
    processed++;
    try {
      const ok = await processStep(
        { id: s.id, email: s.email, unsubscribe_token: s.unsubscribe_token },
        row.step,
        config,
        provider,
      );
      if (ok) sent++;
    } catch (err) {
      console.error("[nurture/cron] step failed", err);
    }
  }

  return { processed, sent };
}
