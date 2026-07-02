/**
 * LEAD NURTURE SCENARIO PLAYGROUND (safe: no DB, no network, no messages sent).
 *
 * Run:   cd Property/web && npx vitest run src/tests/lead-nurture.playground.test.ts
 * (add --reporter=verbose if your terminal hides console output)
 *
 * Edit the SCENARIOS array below with any lead details / formats you want to try.
 * For each scenario it prints:
 *   - how the phone normalises to E.164 (does the format parse?)
 *   - what verification would decide (verify_pass), given an assumed line-type
 *   - the EXACT instant email / SMS / WhatsApp content that lead would receive
 *   - the contactability verdict + status transition for the chosen response
 *
 * This exercises the REAL code (toE164UK, computePass, the sequence copy, the
 * gate) with the DB + email mocked out, so it is 100% safe to run repeatedly.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

// ── Mocked persistence (in-memory) ───────────────────────────────────────────
type Row = Record<string, unknown>;
const db = { leads: [] as Row[], lead_verification: [] as Row[], lead_contact_events: [] as Row[], lead_nurture_state: [] as Row[] };
function reset() { db.leads = []; db.lead_verification = []; db.lead_contact_events = []; db.lead_nurture_state = []; }
function matches(row: Row, params: Record<string, string>): boolean {
  for (const [k, raw] of Object.entries(params)) {
    if (["select", "order", "limit"].includes(k)) continue;
    if (raw.startsWith("eq.") && String(row[k]) !== raw.slice(3)) return false;
    if (raw.startsWith("in.") && !raw.slice(3).replace(/^\(|\)$/g, "").split(",").includes(String(row[k]))) return false;
  }
  return true;
}
vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: vi.fn((t: string, p: Record<string, string>) => Promise.resolve({ ok: true, status: 200, data: (db[t as keyof typeof db] as Row[]).filter((r) => matches(r, p)) })),
  adminInsert: vi.fn((t: string, r: Row) => { (db[t as keyof typeof db] as Row[]).push(r); return Promise.resolve({ ok: true, status: 201, data: [r] }); }),
  adminUpdate: vi.fn((t: string, p: Record<string, string>, patch: Row) => { const h = (db[t as keyof typeof db] as Row[]).filter((r) => matches(r, p)); h.forEach((r) => Object.assign(r, patch)); return Promise.resolve({ ok: true, status: 200, data: h }); }),
  adminDelete: vi.fn(() => Promise.resolve({ ok: true, status: 204, data: [] })),
}));
const handoffSpy = vi.fn(async () => ({ sent: false, to: "ops", skipped: "test" as const }));
vi.mock("@/lib/leads/handoff", () => ({ sendContactableHandoff: (...a: unknown[]) => handoffSpy(...(a as [])) }));
vi.mock("@accounting-network/web-shared/lead-nurture/send", () => ({
  recordLeadContactEvent: vi.fn(async (leadId: string, event_type: string, channel: string | null) => { db.lead_contact_events.push({ lead_id: leadId, event_type, channel }); }),
}));

import { evaluateContactability, promoteIfContactable } from "@/lib/leads/contactability";
import { computePass, type PhoneStatus, type EmailStatus } from "@/lib/leads/verify";
import { toE164UK } from "@/lib/leads/channels";
import { buildPropertyLeadNurtureConfig } from "@/config/lead-nurture";
import { firstNameOf, type LeadMessageContext } from "@accounting-network/web-shared/lead-nurture/config";

// ── EDIT ME: add / change scenarios ──────────────────────────────────────────
type Response = "none" | "reply_sms" | "reply_whatsapp" | "booked" | "confirmed" | "stop";
interface Scenario {
  label: string;
  name: string;
  email: string;
  phone: string;
  // What Twilio Lookup would say for this number (simulate without calling it):
  assumedPhone: PhoneStatus;
  // What email verification would say:
  assumedEmail: EmailStatus;
  // What the lead does after the instant touch:
  response: Response;
}

const SCENARIOS: Scenario[] = [
  { label: "Clean mobile, books a call", name: "Sarah Jenkins", email: "sarah@gmail.com", phone: "07700 900123", assumedPhone: "valid_mobile", assumedEmail: "deliverable", response: "booked" },
  { label: "Replies YES by SMS", name: "David O'Brien", email: "david.obrien@outlook.com", phone: "+44 7700 900456", assumedPhone: "valid_mobile", assumedEmail: "deliverable", response: "reply_sms" },
  { label: "Landline, confirms by email link", name: "Margaret", email: "m@company.co.uk", phone: "0113 4960000", assumedPhone: "valid_landline", assumedEmail: "deliverable", response: "confirmed" },
  { label: "Mistyped / invalid number, books anyway", name: "Tom", email: "tom@x.com", phone: "0770012", assumedPhone: "invalid", assumedEmail: "deliverable", response: "booked" },
  { label: "Never responds", name: "Priya Patel", email: "priya@business.com", phone: "07700900789", assumedPhone: "valid_mobile", assumedEmail: "deliverable", response: "none" },
  { label: "Opts out (STOP)", name: "Alex", email: "alex@mail.com", phone: "+447700900222", assumedPhone: "valid_mobile", assumedEmail: "deliverable", response: "stop" },
  { label: "Weird formatting + emoji name", name: "Jørg 🏠", email: "jorg@mail.de", phone: "0044 7700 900333", assumedPhone: "valid_mobile", assumedEmail: "deliverable", response: "reply_whatsapp" },
];

// ── Runner ───────────────────────────────────────────────────────────────────
const LID = "sim-lead";
function ctxFor(s: Scenario): LeadMessageContext {
  return {
    firstName: firstNameOf(s.name),
    bookingUrl: "https://www.propertytaxpartners.co.uk/book?t=<token>",
    confirmUrl: "https://www.propertytaxpartners.co.uk/api/leads/confirm/<token>",
    optOutText: "Reply STOP to opt out.",
    siteUrl: "https://www.propertytaxpartners.co.uk",
    callGoalEcho: "review your property tax position",
    variant: "t0_branded",
    qualityScore: 5,
  };
}
function seedResponse(r: Response) {
  if (r === "reply_sms") db.lead_contact_events.push({ lead_id: LID, event_type: "replied", channel: "sms" });
  if (r === "reply_whatsapp") db.lead_contact_events.push({ lead_id: LID, event_type: "replied", channel: "whatsapp" });
  if (r === "booked") db.lead_contact_events.push({ lead_id: LID, event_type: "booked", channel: "web" });
  if (r === "confirmed") db.lead_contact_events.push({ lead_id: LID, event_type: "confirmed", channel: "email" });
}

beforeEach(() => { reset(); vi.clearAllMocks(); });

describe("Lead nurture scenario playground", () => {
  it("prints a full trace for every scenario", async () => {
    const steps = buildPropertyLeadNurtureConfig().steps;
    const lines: string[] = [];
    for (const s of SCENARIOS) {
      reset();
      handoffSpy.mockClear();
      const ctx = ctxFor(s);
      const e164 = toE164UK(s.phone);
      const pass = computePass(s.assumedPhone, s.assumedEmail);
      // Step 0 = t0_email (email only); step 1 = t0_sms (sms + whatsapp)
      const step0 = steps[0].buildMessages(ctx);
      const step1 = steps[1].buildMessages(ctx);
      const email = step0.find((m) => m.channel === "email");
      const sms = step1.find((m) => m.channel === "sms");
      const wa = step1.find((m) => m.channel === "whatsapp");

      // Simulate the lead's response and run the real gate.
      db.leads.push({ id: LID, status: "nurturing" });
      db.lead_nurture_state.push({ lead_id: LID, sequence: "property_contactability", step: 1, status: "active" });
      db.lead_verification.push({ lead_id: LID, phone_status: s.assumedPhone });
      seedResponse(s.response);
      const verdict = await evaluateContactability(LID);
      const promote = s.response === "stop" ? { promoted: false, reason: "opted out" } : await promoteIfContactable(LID);
      const finalStatus = db.leads[0].status;

      lines.push(
        `\n─── ${s.label} ───\n` +
        `  input phone   : "${s.phone}"  ->  E.164: ${e164 ?? "UNPARSEABLE (would ask user to re-check)"}\n` +
        `  verify (${s.assumedPhone} / ${s.assumedEmail}) -> verify_pass: ${pass}\n` +
        `  INSTANT EMAIL : subj "${email?.subject}"\n` +
        `                  "${(email?.text || "").split("\\n")[0]}..."\n` +
        `  INSTANT SMS   : ${sms?.body}\n` +
        `  INSTANT WA    : template=${wa?.templateName} vars=${JSON.stringify(wa?.templateVars)}\n` +
        `  RESPONSE      : ${s.response}\n` +
        `  GATE          : contactable=${verdict.contactable}  reason="${verdict.reason}"\n` +
        `  RESULT        : promoted=${(promote as { promoted: boolean }).promoted}  leads.status=${finalStatus}  handoffFired=${handoffSpy.mock.calls.length > 0}`,
      );
    }
    // eslint-disable-next-line no-console
    console.log(lines.join("\n"));
    expect(SCENARIOS.length).toBeGreaterThan(0);
  });
});
