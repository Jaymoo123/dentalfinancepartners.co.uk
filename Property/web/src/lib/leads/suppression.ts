/**
 * Suppression: has this enquirer objected to being referred?
 *
 * The estate promises this in two places, and until 2026-08-14 neither was enforced
 * on the sale path:
 *
 *   - the LIA relies on "we do not share where the enquirer has objected, withdrawn,
 *     or asked us to stop", and treats it as a safeguard in the balancing test;
 *   - DSA clause 3.5 says the Supplier will not Refer, or include in a Bulk Supply,
 *     the data of an enquirer who has objected, and that an objection landing after
 *     an alert but before a Referral stops that Referral.
 *
 * So this is checked twice: before offering a lead to the pool, and again at the
 * moment of claim, because an objection can arrive in between. Checking only at
 * offer time would let a lead alerted at 9am be delivered at 5pm to someone who
 * opted out at noon.
 *
 * Opt-out logic mirrors evaluateContactability: a later re_consented event (the
 * person submitting a fresh enquiry) lifts an earlier opt-out. ISO timestamps
 * compare correctly as strings, and a missing ts sorts as "" so a bare opted_out
 * still blocks.
 */
import { adminSelect } from "@/lib/supabase/admin";

type EventRow = { event_type: string; ts: string | null };

export async function isSuppressed(leadId: string): Promise<boolean> {
  const res = await adminSelect<EventRow>("lead_contact_events", {
    lead_id: `eq.${leadId}`,
    select: "event_type,ts",
  });
  // Fail closed: if we cannot establish that the enquirer has NOT objected, we do
  // not share. Sharing on a failed read is the one outcome with no remedy.
  if (!res.ok) {
    console.error("leads/suppression: could not read contact events, suppressing", leadId);
    return true;
  }
  const latest = (type: string): string | null => {
    const ts = res.data
      .filter((e) => e.event_type === type)
      .map((e) => e.ts ?? "")
      .sort()
      .pop();
    return ts === undefined ? null : ts;
  };
  const optedOutAt = latest("opted_out");
  if (optedOutAt === null) return false;
  const reConsentedAt = latest("re_consented");
  return !(reConsentedAt !== null && reConsentedAt > optedOutAt);
}
