/**
 * Property lead-nurture tests: the contactability gate (the business core), the
 * verification verdict logic, UK phone normalisation, and a golden check on the
 * service sequence copy (no em-dashes, right channels, booking + opt-out present).
 *
 * The gate reads/writes via @/lib/supabase/admin and fires the handoff via
 * ./handoff; both are mocked so the gate logic is tested in isolation with no
 * network and no email.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

// ── Mock the admin REST layer with an in-memory store ────────────────────────
type Row = Record<string, unknown>;
const db = {
  leads: [] as Row[],
  lead_verification: [] as Row[],
  lead_contact_events: [] as Row[],
  lead_nurture_state: [] as Row[],
  reset() {
    this.leads = [];
    this.lead_verification = [];
    this.lead_contact_events = [];
    this.lead_nurture_state = [];
  },
};

function matches(row: Row, params: Record<string, string>): boolean {
  for (const [k, raw] of Object.entries(params)) {
    if (["select", "order", "limit"].includes(k)) continue;
    if (raw.startsWith("eq.")) {
      if (String(row[k]) !== raw.slice(3)) return false;
    } else if (raw.startsWith("in.")) {
      const set = raw.slice(3).replace(/^\(|\)$/g, "").split(",");
      if (!set.includes(String(row[k]))) return false;
    }
  }
  return true;
}

vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: vi.fn((table: string, params: Record<string, string>) =>
    Promise.resolve({ ok: true, status: 200, data: (db[table as keyof typeof db] as Row[]).filter((r) => matches(r, params)) }),
  ),
  adminInsert: vi.fn((table: string, rows: Row) => {
    (db[table as keyof typeof db] as Row[]).push(rows);
    return Promise.resolve({ ok: true, status: 201, data: [rows] });
  }),
  adminUpdate: vi.fn((table: string, params: Record<string, string>, patch: Row) => {
    const hits = (db[table as keyof typeof db] as Row[]).filter((r) => matches(r, params));
    hits.forEach((r) => Object.assign(r, patch));
    return Promise.resolve({ ok: true, status: 200, data: hits });
  }),
  adminDelete: vi.fn(() => Promise.resolve({ ok: true, status: 204, data: [] })),
}));

const handoffSpy = vi.fn(
  async (): Promise<import("@/lib/leads/handoff").HandoffResult> => ({ sent: false, to: "ops@x", skipped: "test" as const }),
);
vi.mock("@/lib/leads/handoff", () => ({ sendContactableHandoff: (...a: unknown[]) => handoffSpy(...(a as [])) }));

// contactability records events via the shared engine's recordLeadContactEvent
// (a different admin module). Mock it to write into the same in-memory store.
vi.mock("@accounting-network/web-shared/lead-nurture/send", () => ({
  recordLeadContactEvent: vi.fn(async (leadId: string, event_type: string, channel: string | null, meta?: unknown) => {
    db.lead_contact_events.push({ lead_id: leadId, event_type, channel, meta: meta ?? null });
  }),
}));

import {
  evaluateContactability,
  promoteIfContactable,
  stopNurture,
} from "@/lib/leads/contactability";
import { computePass } from "@/lib/leads/verify";
import { toE164UK } from "@/lib/leads/channels";
import { buildPropertyLeadNurtureConfig } from "@/config/lead-nurture";
import type { LeadMessageContext } from "@accounting-network/web-shared/lead-nurture/config";

const LID = "lead-1";
function seedLead(status = "nurturing") {
  db.leads.push({ id: LID, status });
  db.lead_nurture_state.push({ lead_id: LID, sequence: "property_contactability", step: 2, status: "active" });
}
function seedVerification(phone_status: string) {
  db.lead_verification.push({ lead_id: LID, phone_status });
}
function seedEvent(event_type: string, channel: string | null, ts?: string) {
  db.lead_contact_events.push({ lead_id: LID, event_type, channel, ...(ts ? { ts } : {}) });
}

beforeEach(() => {
  db.reset();
  vi.clearAllMocks();
});

// ── Contactability gate ──────────────────────────────────────────────────────
describe("contactability gate", () => {
  it("an SMS reply proves the phone -> contactable", async () => {
    seedVerification("unknown");
    seedEvent("replied", "sms");
    const v = await evaluateContactability(LID);
    expect(v.contactable).toBe(true);
    expect(v.reason).toMatch(/replied/i);
  });

  it("a booking with a valid mobile -> contactable", async () => {
    seedVerification("valid_mobile");
    seedEvent("booked", "web");
    const v = await evaluateContactability(LID);
    expect(v.contactable).toBe(true);
    expect(v.reason).toMatch(/booked/i);
  });

  it("confirmed but phone invalid -> NOT auto-contactable (manual review)", async () => {
    seedVerification("invalid");
    seedEvent("confirmed", "email");
    const v = await evaluateContactability(LID);
    expect(v.contactable).toBe(false);
    expect(v.reason).toMatch(/invalid/i);
  });

  it("no response -> not contactable", async () => {
    seedVerification("valid_mobile");
    const v = await evaluateContactability(LID);
    expect(v.contactable).toBe(false);
  });

  it("promotes once and fires the handoff exactly once (idempotent)", async () => {
    seedLead("nurturing");
    seedVerification("valid_mobile");
    seedEvent("booked", "web");

    const r1 = await promoteIfContactable(LID);
    expect(r1.promoted).toBe(true);
    expect(db.leads[0].status).toBe("contactable");
    expect(handoffSpy).toHaveBeenCalledTimes(1);

    const r2 = await promoteIfContactable(LID);
    expect(r2.promoted).toBe(false);
    expect(r2.alreadyPromoted).toBe(true);
    expect(handoffSpy).toHaveBeenCalledTimes(1); // not re-fired
  });

  it("internal-ops-email failure: still records handed_off but also records send_failed kind handoff_internal_failed", async () => {
    seedLead("nurturing");
    seedVerification("valid_mobile");
    seedEvent("booked", "web");
    handoffSpy.mockResolvedValueOnce({
      sent: true,
      to: "operator@example.com",
      messageId: "em_brief",
      internal: { sent: false, reason: "SMTP timeout" },
    });

    const r = await promoteIfContactable(LID);
    expect(r.promoted).toBe(true);
    // handed_off is recorded (the forwardable brief landed)
    const handedOff = db.lead_contact_events.find((e) => e.event_type === "handed_off");
    expect(handedOff).toBeDefined();
    // send_failed is also recorded for the internal failure
    const sendFailed = db.lead_contact_events.find(
      (e) => e.event_type === "send_failed" && (e.meta as { kind?: string } | null)?.kind === "handoff_internal_failed",
    );
    expect(sendFailed).toBeDefined();
  });

  it("stopNurture records opt-out, stops the sequence, and closes the lead", async () => {
    seedLead("nurturing");
    await stopNurture(LID, "sms");
    expect(db.lead_nurture_state[0].status).toBe("stopped");
    expect(db.leads[0].status).toBe("closed"); // so a later confirm link cannot resurrect it
    expect(db.lead_contact_events.some((e) => e.event_type === "opted_out")).toBe(true);
  });

  it("an opted-out lead cannot be resurrected by a later confirm-link click", async () => {
    seedLead("closed");
    seedVerification("valid_mobile");
    seedEvent("opted_out", "sms");
    seedEvent("confirmed", "email"); // in-flight email link clicked AFTER opting out
    const v = await evaluateContactability(LID);
    expect(v.contactable).toBe(false);
    const p = await promoteIfContactable(LID);
    expect(p.promoted).toBe(false);
  });

  it("a fresh form submission (re_consented AFTER opt-out) lifts the block", async () => {
    seedLead("nurturing"); // submit route reopens the lead before the gate runs
    seedVerification("valid_mobile");
    seedEvent("opted_out", "email", "2026-07-03T14:35:00Z");
    seedEvent("re_consented", "web", "2026-07-03T15:00:00Z");
    seedEvent("replied", "sms", "2026-07-03T15:05:00Z");
    const v = await evaluateContactability(LID);
    expect(v.contactable).toBe(true);
    const p = await promoteIfContactable(LID);
    expect(p.promoted).toBe(true);
  });

  it("a re_consented BEFORE the opt-out does NOT lift the block", async () => {
    seedLead("closed");
    seedVerification("valid_mobile");
    seedEvent("re_consented", "web", "2026-07-03T14:00:00Z");
    seedEvent("opted_out", "email", "2026-07-03T14:35:00Z");
    seedEvent("replied", "sms", "2026-07-03T15:05:00Z");
    const v = await evaluateContactability(LID);
    expect(v.contactable).toBe(false);
  });

  it("a booked VoIP number is held for manual review, not auto-contactable", async () => {
    seedLead("nurturing");
    seedVerification("voip");
    seedEvent("booked", "web");
    const v = await evaluateContactability(LID);
    expect(v.contactable).toBe(false);
    expect(v.reason).toMatch(/manual review/i);
  });
});

// ── verify verdict ───────────────────────────────────────────────────────────
describe("verify computePass", () => {
  it("both confirmed bad -> false", () => {
    expect(computePass("invalid", "undeliverable")).toBe(false);
  });
  it("a good mobile -> true even if email unknown", () => {
    expect(computePass("valid_mobile", "unknown")).toBe(true);
  });
  it("a deliverable email -> true even if phone unknown", () => {
    expect(computePass("unknown", "deliverable")).toBe(true);
  });
  it("all unknown (outage) -> fail-open true (response gate decides)", () => {
    expect(computePass("unknown", "unknown")).toBe(true);
  });
});

// ── phone normalisation ──────────────────────────────────────────────────────
describe("toE164UK", () => {
  it("normalises a UK 0-prefixed mobile", () => {
    expect(toE164UK("07700 900123")).toBe("+447700900123");
  });
  it("keeps a valid E.164", () => {
    expect(toE164UK("+447700900123")).toBe("+447700900123");
  });
  it("handles 00 international prefix", () => {
    expect(toE164UK("0044 7700 900123")).toBe("+447700900123");
  });
  it("rejects nonsense", () => {
    expect(toE164UK("hello")).toBeNull();
    expect(toE164UK("")).toBeNull();
  });
});

// ── sequence golden ──────────────────────────────────────────────────────────
describe("Property contactability sequence (golden)", () => {
  // Provide a complete ctx including variant and callGoalEcho so all branches render
  const ctx: LeadMessageContext = {
    firstName: "Sam",
    bookingUrl: "https://ptp.test/book",
    confirmUrl: "https://ptp.test/confirm/tok",
    optOutText: "Reply STOP to opt out.",
    siteUrl: "https://ptp.test",
    callGoalEcho: "review your property tax position",
    variant: "t0_branded",
    qualityScore: 5, // so vip_sameday returns messages
  };
  const steps = buildPropertyLeadNurtureConfig().steps;

  it("the instant touch covers email (step 0) and sms+whatsapp (step 1)", () => {
    const step0Channels = steps[0].buildMessages(ctx).map((m) => m.channel);
    const step1Channels = steps[1].buildMessages(ctx).map((m) => m.channel);
    expect(step0Channels).toContain("email");
    expect(step1Channels).toContain("sms");
    expect(step1Channels).toContain("whatsapp");
  });

  it("every non-conditional step has at least one always-on channel (email or sms)", () => {
    // vip_sameday is conditional on qualityScore === 5; with qualityScore=5 in ctx it returns messages.
    // We skip the assertion for steps that may legitimately return [] (conditional steps).
    for (const step of steps) {
      const msgs = step.buildMessages(ctx);
      if (msgs.length === 0) continue; // conditional step with non-qualifying ctx
      const channels = msgs.map((m) => m.channel);
      expect(channels.some((c) => c === "email" || c === "sms")).toBe(true);
    }
  });

  it("contains no em-dashes anywhere in the copy", () => {
    // Check both t0 variants
    const ctxBranded = { ...ctx, variant: "t0_branded" } as LeadMessageContext;
    const ctxPersonal = { ...ctx, variant: "t0_personal" } as LeadMessageContext;
    for (const activeCtx of [ctxBranded, ctxPersonal]) {
      for (const step of steps) {
        for (const m of step.buildMessages(activeCtx)) {
          const blob = [m.subject, m.html, m.text, m.body].filter(Boolean).join(" ");
          expect(blob).not.toContain("—"); // em dash
          expect(blob).not.toContain("–"); // en dash
        }
      }
    }
  });

  it("sms messages are reply-based (Reply YES) with an opt-out", () => {
    const smsMsgs = steps.flatMap((s) => s.buildMessages(ctx)).filter((m) => m.channel === "sms");
    expect(smsMsgs.length).toBeGreaterThan(0);
    // Step 1 (t0_sms) is the instant SMS touch
    const instantSms = steps[1].buildMessages(ctx).find((m) => m.channel === "sms");
    expect(instantSms?.body?.toUpperCase()).toContain("REPLY YES");
    expect(instantSms?.body).not.toContain("/book");
    expect(instantSms?.body?.toUpperCase()).toContain("STOP");
  });

  it("whatsapp messages use a template (business-initiated)", () => {
    const wa = steps.flatMap((s) => s.buildMessages(ctx)).filter((m) => m.channel === "whatsapp");
    expect(wa.length).toBeGreaterThan(0);
    expect(wa.every((m) => Boolean(m.templateName))).toBe(true);
  });
});
