/**
 * Estate-wide opt-out mirroring. The person opted out, not the row: a
 * resubmitter has SIBLING lead rows under the same phone/email (possibly on
 * other sites), and suppression is per lead id, so without this their other
 * rows stay contactable, offerable and remindable (found live 2026-08-19: a
 * STOP landed on an enquirer's older row while his newer row kept a booked
 * reminder pending).
 *
 * Lifted verbatim from Property's contactability.stopNurture so every site's
 * stopNurture shares ONE mirror implementation against the shared leads table.
 * Best-effort by contract: any failure here must never block the primary
 * opt-out, so the whole body is wrapped and errors are logged, not thrown.
 */

import { adminSelect, adminUpdate } from "../nurture/admin";
import { recordLeadContactEvent } from "./send";

export async function mirrorOptOutToSiblings(
  leadId: string,
  channel: "email" | "sms" | "whatsapp" | "web",
): Promise<void> {
  const nowIso = new Date().toISOString();
  try {
    const self = await adminSelect<{ phone: string | null; email: string | null }>("leads", {
      id: `eq.${leadId}`,
      select: "phone,email",
      limit: "1",
    });
    const { phone, email } = self.data[0] ?? {};
    const orFilters = [
      phone ? `phone.eq.${phone}` : null,
      email ? `email.eq.${email}` : null,
    ].filter(Boolean);
    if (orFilters.length > 0) {
      const siblings = await adminSelect<{ id: string }>("leads", {
        select: "id",
        or: `(${orFilters.join(",")})`,
        id: `neq.${leadId}`,
        limit: "20",
      });
      for (const sib of siblings.ok ? siblings.data : []) {
        await recordLeadContactEvent(sib.id, "opted_out", channel, {
          mirrored_from: leadId,
          reason: "same person (matching phone/email) opted out",
        });
        await adminUpdate(
          "lead_nurture_state",
          { lead_id: `eq.${sib.id}` },
          { status: "stopped", next_action_at: null, updated_at: nowIso },
        ).catch(() => {});
        await adminUpdate(
          "leads",
          { id: `eq.${sib.id}`, status: "in.(new,nurturing)" },
          { status: "closed" },
        ).catch(() => {});
      }
    }
  } catch (err) {
    console.error("[lead-nurture] sibling opt-out mirror failed", err);
  }
}
