/**
 * Auxiliary scheduled sends for the Dentists lead-nurture system.
 *
 * Dentists has no /book flow, so runLeadAuxScans is a no-op stub.
 * // ponytail: phase-2, booking reminders and abandoned-booking nudges inert
 * while dormant. Wire when a booking surface exists.
 */

export async function runLeadAuxScans(): Promise<{ reminders: number; nudges: number }> {
  // ponytail: phase-2, replies inert while dormant -- no /book route on Dentists.
  return { reminders: 0, nudges: 0 };
}
