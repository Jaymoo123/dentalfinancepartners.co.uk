/**
 * Auxiliary scheduled scans for the Solicitors (Accounts for Lawyers)
 * lead-nurture system.
 *
 * Solicitors has no /book flow, so booked-slot reminders and abandoned-booking
 * nudges are not applicable. This is a deliberate no-op stub.
 *
 * ponytail: phase-2, replies inert while dormant. Add booking reminder and
 * nudge scans here when a /book flow is introduced.
 *
 * House style: no em-dashes. British English.
 */

// ponytail: no-op stub; Solicitors has no /book flow
export async function runLeadAuxScans(): Promise<{ reminders: number; nudges: number }> {
  return { reminders: 0, nudges: 0 };
}
