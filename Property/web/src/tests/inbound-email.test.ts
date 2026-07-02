/**
 * Tests for the inbound-email blind-spot fix:
 *   - Gate extension: email replied treated exactly like confirmed (requires a
 *     non-bad phone); SMS/WhatsApp replied behaviour is unchanged.
 *   - Regeneration flag: copy_status set to "regenerate" on any replied event.
 *   - Route flow: keyword opt-out short-circuits before AI; AI-null defaults to
 *     genuine_reply; auto_responder records nothing.
 *   - Pure helpers: stripQuotedHistory, extractEmail.
 *
 * Tests that go through the gate use the REAL contactability module with a
 * mocked admin layer (same idiom as lead-nurture.test.ts).
 * Route-flow tests call the POST handler directly with mocked Svix verification
 * and a mocked classify function.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

// ── Shared in-memory store ────────────────────────────────────────────────────

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

// ── Mocks (hoisted by Vitest) ─────────────────────────────────────────────────

vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: vi.fn((table: string, params: Record<string, string>) =>
    Promise.resolve({
      ok: true,
      status: 200,
      data: (db[table as keyof typeof db] as Row[]).filter((r) => matches(r, params)),
    }),
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

const handoffSpy = vi.fn(async () => ({ sent: false, to: "ops@x", skipped: "test" as const }));
vi.mock("@/lib/leads/handoff", () => ({
  sendContactableHandoff: (...a: unknown[]) => handoffSpy(...(a as [])),
}));

vi.mock("@accounting-network/web-shared/lead-nurture/send", () => ({
  recordLeadContactEvent: vi.fn(
    async (leadId: string, event_type: string, channel: string | null, meta?: unknown) => {
      db.lead_contact_events.push({ lead_id: leadId, event_type, channel, meta: meta ?? null });
    },
  ),
}));

// Svix verification always passes in these tests.
vi.mock("@accounting-network/web-shared/nurture/webhook", () => ({
  verifyResendWebhook: vi.fn(() => true),
}));

// Classify mock: default resolved value is set per-test or in beforeEach.
const mockClassify = vi.fn();
vi.mock("@/lib/ai/anthropic", () => ({
  classify: (...args: unknown[]) => mockClassify(...args),
  anthropicConfigured: () => true,
}));

// ── Imports (after mocks) ─────────────────────────────────────────────────────

import {
  evaluateContactability,
  recordResponseAndEvaluate,
} from "@/lib/leads/contactability";
import {
  POST,
  stripQuotedHistory,
  extractEmail,
} from "@/app/api/leads/inbound/email/route";

// ── Fixtures ──────────────────────────────────────────────────────────────────

const LID = "lead-1";
const SENDER = "sam@example.com";

function seedLead(status = "nurturing") {
  db.leads.push({ id: LID, status });
  db.lead_nurture_state.push({
    lead_id: LID,
    sequence: "property_contactability",
    step: 2,
    status: "active",
  });
}

function seedVerification(phone_status: string) {
  db.lead_verification.push({ lead_id: LID, phone_status });
}

function seedEvent(event_type: string, channel: string | null) {
  db.lead_contact_events.push({ lead_id: LID, event_type, channel });
}

beforeEach(() => {
  db.reset();
  vi.clearAllMocks();
  mockClassify.mockResolvedValue("genuine_reply"); // safe default
});

// ── Gate extension: email channel ─────────────────────────────────────────────

describe("contactability gate — email replied", () => {
  it("email replied + valid phone -> qualifies (promotes to contactable)", async () => {
    seedLead("nurturing");
    seedVerification("valid_mobile");

    const result = await recordResponseAndEvaluate(LID, "replied", "email", {
      body: "Yes, I would like to proceed.",
    });

    expect(result.promoted).toBe(true);
    expect(db.leads[0].status).toBe("contactable");
    expect(handoffSpy).toHaveBeenCalledTimes(1);
  });

  it("email replied + voip phone -> held for manual review (not auto-promoted)", async () => {
    seedLead("nurturing");
    seedVerification("voip");

    const result = await recordResponseAndEvaluate(LID, "replied", "email", {
      body: "Call me back.",
    });

    expect(result.promoted).toBe(false);
    expect(result.reason).toMatch(/manual review/i);
    expect(db.leads[0].status).toBe("nurturing"); // unchanged
    expect(handoffSpy).not.toHaveBeenCalled();
  });

  it("email replied + invalid phone -> held for manual review", async () => {
    seedLead("nurturing");
    seedVerification("invalid");

    const result = await recordResponseAndEvaluate(LID, "replied", "email");

    expect(result.promoted).toBe(false);
    expect(result.reason).toMatch(/manual review/i);
  });

  it("email replied + unknown phone status -> qualifies (not known-bad)", async () => {
    seedLead("nurturing");
    seedVerification("unknown");

    const result = await recordResponseAndEvaluate(LID, "replied", "email");

    expect(result.promoted).toBe(true);
    expect(db.leads[0].status).toBe("contactable");
  });

  it("evaluateContactability: email replied reason string is correct", async () => {
    seedVerification("valid_mobile");
    seedEvent("replied", "email");

    const v = await evaluateContactability(LID);

    expect(v.contactable).toBe(true);
    expect(v.reason).toMatch(/replied by email/i);
    // Email reply does NOT prove the phone directly.
    expect(v.phoneProven).toBe(true); // true because phoneGood (valid_mobile)
  });
});

// ── SMS/WhatsApp replied: unchanged behaviour ─────────────────────────────────

describe("contactability gate — SMS/WhatsApp replied (unchanged)", () => {
  it("SMS replied with voip phone -> still contactable (channel proves the number)", async () => {
    seedLead("nurturing");
    seedVerification("voip");

    const result = await recordResponseAndEvaluate(LID, "replied", "sms", { body: "Yes" });

    expect(result.promoted).toBe(true);
    expect(db.leads[0].status).toBe("contactable");
  });

  it("WhatsApp replied with invalid phone -> still contactable", async () => {
    seedLead("nurturing");
    seedVerification("invalid");

    const result = await recordResponseAndEvaluate(LID, "replied", "whatsapp", { body: "Hi" });

    expect(result.promoted).toBe(true);
    expect(db.leads[0].status).toBe("contactable");
  });

  it("SMS replied with no phone record -> still contactable", async () => {
    seedLead("nurturing");
    // No verification row: phoneStatus is null, phoneKnownBad is false.

    const result = await recordResponseAndEvaluate(LID, "replied", "sms", { body: "OK" });

    expect(result.promoted).toBe(true);
  });
});

// ── Regeneration flag ─────────────────────────────────────────────────────────

describe("recordResponseAndEvaluate — copy_status regeneration", () => {
  it("sets copy_status=regenerate on the active nurture state when a lead replies", async () => {
    seedLead("nurturing");
    seedVerification("voip"); // voip keeps it uncontactable so we can inspect state clearly

    await recordResponseAndEvaluate(LID, "replied", "email");

    expect(db.lead_nurture_state[0].copy_status).toBe("regenerate");
  });

  it("sets copy_status=regenerate for SMS replied as well", async () => {
    seedLead("nurturing");
    seedVerification("valid_mobile");

    await recordResponseAndEvaluate(LID, "replied", "sms");

    // The state will have been updated to contactable after promotion; copy_status is still set.
    expect(db.lead_nurture_state[0].copy_status).toBe("regenerate");
  });

  it("does NOT set copy_status for confirmed events (only replied)", async () => {
    seedLead("nurturing");
    seedVerification("valid_mobile");

    await recordResponseAndEvaluate(LID, "confirmed", "email");

    expect(db.lead_nurture_state[0].copy_status).toBeUndefined();
  });

  it("does NOT set copy_status for booked events (only replied)", async () => {
    seedLead("nurturing");
    seedVerification("valid_mobile");

    await recordResponseAndEvaluate(LID, "booked", "web");

    expect(db.lead_nurture_state[0].copy_status).toBeUndefined();
  });
});

// ── stripQuotedHistory ────────────────────────────────────────────────────────

describe("stripQuotedHistory", () => {
  it("returns the full text when there is no quoted block", () => {
    expect(stripQuotedHistory("Hello there.\nI want to book.")).toBe(
      "Hello there.\nI want to book.",
    );
  });

  it("strips lines starting with >", () => {
    const text = "Yes please.\n\n> On 1 Jul wrote:\n> Thanks for your enquiry.";
    expect(stripQuotedHistory(text)).toBe("Yes please.");
  });

  it("strips at an 'On ... wrote:' attribution line", () => {
    const text = "Sounds good.\n\nOn 1 Jul 2026 at 10:00, Property Tax Partners wrote:\nHello Sam";
    expect(stripQuotedHistory(text)).toBe("Sounds good.");
  });

  it("respects the maxLen cap", () => {
    const text = "a".repeat(2000);
    expect(stripQuotedHistory(text, 500).length).toBe(500);
  });

  it("handles text that is entirely a quote (returns empty string)", () => {
    const text = "> This is a quote\n> More quote";
    expect(stripQuotedHistory(text)).toBe("");
  });
});

// ── extractEmail ──────────────────────────────────────────────────────────────

describe("extractEmail", () => {
  it("extracts email from angle-bracket form", () => {
    expect(extractEmail("Sam Jones <sam@example.com>")).toBe("sam@example.com");
  });

  it("handles plain email address", () => {
    expect(extractEmail("sam@example.com")).toBe("sam@example.com");
  });

  it("lower-cases the result", () => {
    expect(extractEmail("SAM@EXAMPLE.COM")).toBe("sam@example.com");
  });

  it("returns null for an empty string", () => {
    expect(extractEmail("")).toBeNull();
  });

  it("returns null for a string without an email", () => {
    expect(extractEmail("Not an email at all")).toBeNull();
  });
});

// ── Inbound email route — POST handler ───────────────────────────────────────

/**
 * Build a minimal Request that satisfies the POST handler.
 * verifyResendWebhook is mocked to return true, so the Svix headers are cosmetic.
 */
function makeReq(
  payload: Record<string, unknown>,
): Request {
  const now = Math.floor(Date.now() / 1000);
  return new Request("http://localhost/api/leads/inbound/email", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
      "svix-id": "msg_test",
      "svix-timestamp": String(now),
      "svix-signature": "v1,fake",
    }),
    body: JSON.stringify(payload),
  });
}

function inboundPayload(opts: {
  from?: string;
  subject?: string;
  text?: string;
}): Record<string, unknown> {
  return {
    type: "email.received",
    data: {
      from: opts.from ?? `${SENDER}`,
      to: ["hello@propertytaxpartners.co.uk"],
      subject: opts.subject ?? "Re: Property tax",
      text: opts.text ?? "Hello, I want to proceed.",
    },
  };
}

describe("inbound email route — POST", () => {
  beforeEach(() => {
    process.env.LEAD_RESEND_INBOUND_SECRET = "whsec_dGVzdA==";
    // Seed a lead that the route can resolve by email.
    db.leads.push({ id: LID, status: "nurturing", email: SENDER });
    db.lead_nurture_state.push({
      lead_id: LID,
      sequence: "property_contactability",
      step: 2,
      status: "active",
    });
    db.lead_verification.push({ lead_id: LID, phone_status: "valid_mobile" });
  });

  it("genuine_reply triggers recordResponseAndEvaluate and promotes the lead", async () => {
    mockClassify.mockResolvedValueOnce("genuine_reply");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(makeReq(inboundPayload({})) as any);

    expect(res.status).toBe(200);
    // The genuine reply with a valid phone should promote the lead.
    expect(db.leads[0].status).toBe("contactable");
    expect(db.lead_contact_events.some((e) => e.event_type === "replied" && e.channel === "email")).toBe(true);
  });

  it("keyword opt-out in body short-circuits before classify is called", async () => {
    const res = await POST(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      makeReq(inboundPayload({ text: "Please unsubscribe me from this." })) as any,
    );

    expect(res.status).toBe(200);
    expect(mockClassify).not.toHaveBeenCalled();
    expect(db.lead_contact_events.some((e) => e.event_type === "opted_out")).toBe(true);
    expect(db.leads[0].status).toBe("closed");
  });

  it("keyword opt-out in subject short-circuits before classify", async () => {
    const res = await POST(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      makeReq(inboundPayload({ subject: "STOP — do not contact" })) as any,
    );

    expect(res.status).toBe(200);
    expect(mockClassify).not.toHaveBeenCalled();
    expect(db.lead_contact_events.some((e) => e.event_type === "opted_out")).toBe(true);
  });

  it("AI-null (classify returns null) defaults to genuine_reply", async () => {
    mockClassify.mockResolvedValueOnce(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(makeReq(inboundPayload({})) as any);

    expect(res.status).toBe(200);
    // Should have been treated as genuine and recorded a replied event.
    expect(db.lead_contact_events.some((e) => e.event_type === "replied")).toBe(true);
  });

  it("auto_responder records nothing (no event, no promotion)", async () => {
    mockClassify.mockResolvedValueOnce("auto_responder");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(makeReq(inboundPayload({ text: "I am out of office until Monday." })) as any);

    expect(res.status).toBe(200);
    expect(db.lead_contact_events.length).toBe(0);
    expect(handoffSpy).not.toHaveBeenCalled();
    expect(db.leads[0].status).toBe("nurturing"); // unchanged
  });

  it("opt_out from classify triggers stopNurture", async () => {
    mockClassify.mockResolvedValueOnce("opt_out");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(makeReq(inboundPayload({ text: "No thank you." })) as any);

    expect(res.status).toBe(200);
    expect(db.lead_contact_events.some((e) => e.event_type === "opted_out")).toBe(true);
    expect(db.leads[0].status).toBe("closed");
  });

  it("unknown sender email returns 200 with no side-effects", async () => {
    // Sender email does not match any lead in the db.
    const res = await POST(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      makeReq(inboundPayload({ from: "unknown@nowhere.com" })) as any,
    );

    expect(res.status).toBe(200);
    expect(db.lead_contact_events.length).toBe(0);
  });

  it("non-email.received event type is ignored", async () => {
    const payload = { type: "email.delivered", data: { from: SENDER } };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(makeReq(payload) as any);

    expect(res.status).toBe(200);
    expect(mockClassify).not.toHaveBeenCalled();
    expect(db.lead_contact_events.length).toBe(0);
  });

  it("quoted reply history is stripped before classify sees it", async () => {
    // Body has content + a quoted block; classify should only see the clean part.
    const text = "I'm interested.\n\n> On 1 Jul, Property Tax Partners wrote:\n> Thanks for your enquiry.";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(makeReq(inboundPayload({ text })) as any);

    const classifyCall = mockClassify.mock.calls[0]?.[0] as { prompt?: string } | undefined;
    expect(classifyCall?.prompt).toBeDefined();
    expect(classifyCall?.prompt).toContain("I'm interested.");
    expect(classifyCall?.prompt).not.toContain("> On 1 Jul");
  });

  it("returns 503 when LEAD_RESEND_INBOUND_SECRET is absent", async () => {
    delete process.env.LEAD_RESEND_INBOUND_SECRET;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(makeReq(inboundPayload({})) as any);

    expect(res.status).toBe(503);
  });
});
