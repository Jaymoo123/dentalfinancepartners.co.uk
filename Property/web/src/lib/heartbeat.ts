/**
 * Dead-man's-switch ping for Better Stack heartbeats.
 *
 * Called at the END of a successful cron run. Silence is the alert: if the
 * cron dies, the deploy breaks, the route 500s, the env var is deleted or
 * this helper itself rots, the ping stops and Better Stack emails. That
 * inversion is the only structural cure for monitors dying silently -
 * Vercel gives no signal at all for a cron that stops running.
 *
 * Fire-and-forget by design: a monitoring outage must never fail the work.
 */
export async function pingHeartbeat(url: string | undefined): Promise<void> {
  if (!url) return;
  try {
    await fetch(url, { signal: AbortSignal.timeout(3000), cache: "no-store" });
  } catch {
    // Never blocks or fails the caller; a missed ping IS the signal.
  }
}
