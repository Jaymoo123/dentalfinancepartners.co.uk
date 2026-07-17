/**
 * Auxiliary scheduled sends stub for Holloway Davies.
 *
 * ponytail: no booking flow yet. runLeadAuxScans is a no-op until /book is built.
 * When a booking flow is added, port the full implementation from
 * Property/web/src/lib/leads/aux-cron.ts, replacing all Property-specific copy
 * and domain references.
 *
 * // ponytail: phase-2, replies inert while dormant
 */

export async function runLeadAuxScans(): Promise<{ reminders: number; nudges: number }> {
  // ponytail: no booking flow yet
  return { reminders: 0, nudges: 0 };
}
