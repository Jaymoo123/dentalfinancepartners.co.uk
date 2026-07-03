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

import { describe, it, expect, beforeEach, beforeAll, afterAll, vi } from "vitest";

// The inbound-email AI classify is now gated on the LEAD_COPY_AI_ENABLED flag
// (M4). These tests exercise the AI-classify path, so enable it for the file.
beforeAll(() => {
  process.env.LEAD_COPY_AI_ENABLED = "true";
});
afterAll(() => {
  delete process.env.LEAD_COPY_AI_ENABLED;
});

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

// verifyLead is only invoked when a phone is captured from a reply body; mock it
// so no real Twilio Lookup fires. Existing tests never trigger it (their bodies
// carry no phone), so this is inert for them.
const mockVerifyLead = vi.fn();
vi.mock("@/lib/leads/verify", () => ({
  verifyLead: (...args: unknown[]) => mockVerifyLead(...args),
}));

// Resend's email.received payload is metadata-only; the route fetches the body
// by email_id via fetchReceivedEmailText. Mock it so no network fires.
const mockFetchReceivedText = vi.fn(async (_id: string) => "");
vi.mock("@/lib/leads/inbound-content", () => ({
  fetchReceivedEmailText: (id: string) => mockFetchReceivedText(id),
}));

// Mock the Resend client so the prospect ack email (sent through the REAL
// channels.ts sender when the nurture flags are on) never leaves the process.
const resendSendSpy = vi.fn(async (_opts?: Record<string, unknown>) => ({
  data: { id: "em_ack_1" },
  error: null,
}));
vi.mock("@/lib/resend", () => ({
  getResend: () => ({ emails: { send: resendSendSpy } }),
  getFromAddress: () => "Property Tax Partners <ops@x>",
}));

// ── Imports (after mocks) ─────────────────────────────────────────────────────

import {
  evaluateContactability,
  recordResponseAndEvaluate,
} from "@/lib/leads/contactability";
import { POST } from "@/app/api/leads/inbound/email/route";
import { stripQuotedHistory, extractEmail, htmlToText } from "@/lib/leads/email-parse";

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
  email_id?: string;
  /** Model the real Resend payload, which carries NO body (metadata only). */
  omitText?: boolean;
}): Record<string, unknown> {
  return {
    type: "email.received",
    data: {
      ...(opts.email_id ? { email_id: opts.email_id } : {}),
      from: opts.from ?? `${SENDER}`,
      to: ["hello@propertytaxpartners.co.uk"],
      subject: opts.subject ?? "Re: Property tax",
      ...(opts.omitText ? {} : { text: opts.text ?? "Hello, I want to proceed." }),
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

// ── Phone capture from a reply body ──────────────────────────────────────────

describe("inbound email route — phone capture from reply", () => {
  beforeEach(() => {
    process.env.LEAD_RESEND_INBOUND_SECRET = "whsec_dGVzdA==";
  });

  it("captures + verifies a phone from a phone-less lead's reply and promotes", async () => {
    db.leads.push({ id: LID, status: "nurturing", email: SENDER, phone: "", full_name: "", source: "property" });
    db.lead_nurture_state.push({ lead_id: LID, sequence: "property_detail_capture", step: 1, status: "active" });
    mockClassify.mockResolvedValueOnce("genuine_reply");
    mockVerifyLead.mockResolvedValueOnce({
      phone: { status: "valid_mobile", line_type: "mobile", carrier: "EE", e164: "+447700900000" },
      email: { status: "valid", domain: "example.com" },
      verify_pass: true,
      provider: "twilio",
      raw: {},
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(makeReq(inboundPayload({ text: "Hi, it's Sam. My number is 07700900000, call me Tuesday." })) as any);

    expect(res.status).toBe(200);
    expect(db.leads[0].phone).toBe("07700900000");
    expect(mockVerifyLead).toHaveBeenCalledWith(expect.objectContaining({ phone: "07700900000" }));
    // Phone now verified + replied by email -> promoted.
    expect(db.leads[0].status).toBe("contactable");
  });

  it("does not extract or verify when the lead already has a usable phone", async () => {
    db.leads.push({ id: LID, status: "nurturing", email: SENDER, phone: "07811111111", full_name: "Sam", source: "property" });
    db.lead_nurture_state.push({ lead_id: LID, sequence: "property_contactability", step: 2, status: "active" });
    db.lead_verification.push({ lead_id: LID, phone_status: "valid_mobile" });
    mockClassify.mockResolvedValueOnce("genuine_reply");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(makeReq(inboundPayload({ text: "Yes please, Tuesday afternoon works." })) as any);

    expect(mockVerifyLead).not.toHaveBeenCalled();
    expect(db.leads[0].phone).toBe("07811111111"); // unchanged
  });
});

// ── Metadata-only payload: body fetched by email_id ──────────────────────────
// The REAL Resend email.received event carries no body: only metadata plus an
// email_id to fetch content with. These tests model that production shape.

describe("inbound email route — metadata-only payload (email_id)", () => {
  beforeEach(() => {
    process.env.LEAD_RESEND_INBOUND_SECRET = "whsec_dGVzdA==";
  });

  it("fetches the body by email_id and captures the phone from it", async () => {
    db.leads.push({ id: LID, status: "nurturing", email: SENDER, phone: "", full_name: "", source: "property" });
    db.lead_nurture_state.push({ lead_id: LID, sequence: "property_detail_capture", step: 1, status: "active" });
    mockClassify.mockResolvedValueOnce("genuine_reply");
    mockFetchReceivedText.mockResolvedValueOnce("Hi, Alex here. Best number is 07700900000, Tuesday suits.");
    mockVerifyLead.mockResolvedValueOnce({
      phone: { status: "valid_mobile", line_type: "mobile", carrier: "EE", e164: "+447700900000" },
      email: { status: "valid", domain: "example.com" },
      verify_pass: true,
      provider: "twilio",
      raw: {},
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(makeReq(inboundPayload({ omitText: true, email_id: "rcv-1" })) as any);

    expect(res.status).toBe(200);
    expect(mockFetchReceivedText).toHaveBeenCalledWith("rcv-1");
    expect(db.leads[0].phone).toBe("07700900000");
    expect(db.leads[0].status).toBe("contactable");
  });

  it("keyword opt-out inside the fetched body stops the nurture", async () => {
    db.leads.push({ id: LID, status: "nurturing", email: SENDER, phone: "", full_name: "", source: "property" });
    db.lead_nurture_state.push({ lead_id: LID, sequence: "property_detail_capture", step: 1, status: "active" });
    mockFetchReceivedText.mockResolvedValueOnce("Please unsubscribe me from these emails.");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(makeReq(inboundPayload({ omitText: true, email_id: "rcv-2" })) as any);

    expect(res.status).toBe(200);
    expect(mockClassify).not.toHaveBeenCalled();
    expect(db.lead_contact_events.some((e) => e.event_type === "opted_out")).toBe(true);
    expect(db.leads[0].status).toBe("closed");
  });

  it("a failed body fetch still records the reply (fail-soft)", async () => {
    db.leads.push({ id: LID, status: "nurturing", email: SENDER, phone: "", full_name: "", source: "property" });
    db.lead_nurture_state.push({ lead_id: LID, sequence: "property_detail_capture", step: 1, status: "active" });
    mockClassify.mockResolvedValueOnce("genuine_reply");
    mockFetchReceivedText.mockResolvedValueOnce(""); // fetch failed -> empty body

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(makeReq(inboundPayload({ omitText: true, email_id: "rcv-3" })) as any);

    expect(res.status).toBe(200);
    expect(db.lead_contact_events.some((e) => e.event_type === "replied" && e.channel === "email")).toBe(true);
    expect(mockVerifyLead).not.toHaveBeenCalled();
  });

  it("does not fetch when the payload already carries text", async () => {
    db.leads.push({ id: LID, status: "nurturing", email: SENDER, phone: "07811111111", full_name: "Sam", source: "property" });
    db.lead_nurture_state.push({ lead_id: LID, sequence: "property_contactability", step: 2, status: "active" });
    db.lead_verification.push({ lead_id: LID, phone_status: "valid_mobile" });
    mockClassify.mockResolvedValueOnce("genuine_reply");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(makeReq(inboundPayload({ text: "Yes, Tuesday works.", email_id: "rcv-4" })) as any);

    expect(mockFetchReceivedText).not.toHaveBeenCalled();
  });
});

// ── htmlToText (fallback when the received email has no plain-text part) ─────

describe("htmlToText", () => {
  it("strips tags and keeps the phone number readable", () => {
    const t = htmlToText("<div><p>Hi, Alex here.</p><p>Best number is <b>07700 900000</b>.</p></div>");
    expect(t).toContain("Hi, Alex here.");
    expect(t).toContain("07700 900000");
    expect(t).not.toContain("<");
  });

  it("drops style and script content entirely", () => {
    const t = htmlToText("<style>p{color:red}</style><script>alert(1)</script><p>unsubscribe</p>");
    expect(t).not.toContain("color");
    expect(t).not.toContain("alert");
    expect(t).toContain("unsubscribe");
  });

  it("decodes common entities", () => {
    expect(htmlToText("Tom &amp; Jerry &gt; cartoons")).toBe("Tom & Jerry > cartoons");
  });
});

// ── Outlook/Hotmail quote stripping (2026-07-03 incident) ─────────────────────

describe("stripQuotedHistory — Outlook-family formats", () => {
  it("cuts at the Outlook underscore separator", () => {
    const t = "My number is 07500897741.\n\n________________________________\nFrom: Junayd at Property Tax Partners <junayd@propertytaxpartners.co.uk>\nSent: Thursday, July 3, 2026\nTo: junaydmoughal@hotmail.co.uk\nSubject: Re: your enquiry\n\nThanks for your message... To opt out, just reply STOP.";
    const s = stripQuotedHistory(t);
    expect(s).toContain("07500897741");
    expect(s).not.toContain("STOP");
    expect(s).not.toContain("From:");
  });

  it("cuts at -----Original Message-----", () => {
    const t = "Yes tomorrow works.\n-----Original Message-----\nFrom: x\nTo opt out, just reply STOP.";
    const s = stripQuotedHistory(t);
    expect(s).toBe("Yes tomorrow works.");
  });

  it("cuts at a bare From:/Sent: header block without a separator", () => {
    const t = "Call me Tuesday.\nFrom: Property Tax Partners\nSent: 3 July 2026\nSubject: Re\nquoted stuff STOP";
    const s = stripQuotedHistory(t);
    expect(s).toBe("Call me Tuesday.");
  });

  it("cuts at a hard-wrapped attribution ending in wrote:", () => {
    const t = "Here you go: 07811111111\nOn Thu, 3 Jul 2026 at 14:34, Junayd at Property Tax\nPartners <junayd@propertytaxpartners.co.uk> wrote:\n> original";
    const s = stripQuotedHistory(t);
    expect(s).toBe("Here you go: 07811111111");
  });

  it("does not cut a first line that merely starts with From:", () => {
    const t = "From: my point of view this looks great, call me on 07700900000";
    expect(stripQuotedHistory(t)).toBe(t);
  });
});

// ── Full-route regression: the exact 2026-07-03 Hotmail incident ──────────────

describe("inbound email route — Hotmail reply with quoted footer (regression)", () => {
  beforeEach(() => {
    process.env.LEAD_RESEND_INBOUND_SECRET = "whsec_dGVzdA==";
  });

  it("captures the phone and records replied instead of opting out", async () => {
    db.leads.push({ id: LID, status: "nurturing", email: SENDER, phone: "", full_name: "", source: "property" });
    db.lead_nurture_state.push({ lead_id: LID, sequence: "property_detail_capture", step: 1, status: "active" });
    mockClassify.mockResolvedValueOnce("genuine_reply");
    mockVerifyLead.mockResolvedValueOnce({
      phone: { status: "valid_mobile", line_type: "mobile", carrier: "EE", e164: "+447500897741" },
      email: { status: "valid", domain: "hotmail.co.uk" },
      verify_pass: true,
      provider: "twilio",
      raw: {},
    });
    // Hotmail keeps the whole original underneath with NO ">" prefixes.
    mockFetchReceivedText.mockResolvedValueOnce(
      "Hi, it's Junayd. Best number is 07500 897741, tomorrow afternoon.\n\n" +
      "________________________________\n" +
      "From: Junayd at Property Tax Partners <junayd@propertytaxpartners.co.uk>\n" +
      "Sent: Thursday, July 3, 2026 3:34 PM\n" +
      "To: junaydmoughal@hotmail.co.uk\n" +
      "Subject: Thanks for your message, one quick thing\n\n" +
      "Thanks for reaching out... To opt out, just reply STOP.",
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(makeReq(inboundPayload({ omitText: true, email_id: "rcv-hotmail" })) as any);

    expect(res.status).toBe(200);
    expect(db.lead_contact_events.some((e) => e.event_type === "opted_out")).toBe(false);
    expect(db.lead_contact_events.some((e) => e.event_type === "replied" && e.channel === "email")).toBe(true);
    expect(db.leads[0].phone).toBe("07500 897741");
    expect(db.leads[0].status).toBe("contactable");
  });
});

// ── Prospect ack email (genuine reply -> "Got your reply") ───────────────────
// The ack goes through the REAL channels.ts sender (flag gating + shared
// from/reply-to identity) into the mocked Resend client; the nurture flags set
// below are what arm it.

describe("inbound email route: prospect ack email", () => {
  beforeEach(() => {
    process.env.LEAD_RESEND_INBOUND_SECRET = "whsec_dGVzdA==";
    // buildLeadMessageContext mints confirm/opt-out tokens for the ack email.
    process.env.LEAD_NURTURE_TOKEN_SECRET = "test-secret-test-secret-test-secret!";
    process.env.LEAD_NURTURE_ENABLED = "1";
    process.env.LEAD_NURTURE_EMAIL_ENABLED = "1";
    // Keep the operator-notify path off so the only Resend traffic is the ack.
    delete process.env.RESEND_API_KEY;
  });

  afterAll(() => {
    delete process.env.LEAD_NURTURE_TOKEN_SECRET;
    delete process.env.LEAD_NURTURE_ENABLED;
    delete process.env.LEAD_NURTURE_EMAIL_ENABLED;
  });

  function seedAckLead(source = "property", full_name = "Sam Jones") {
    db.leads.push({
      id: LID,
      status: "nurturing",
      email: SENDER,
      phone: "07811111111",
      full_name,
      source,
    });
    db.lead_nurture_state.push({
      lead_id: LID,
      sequence: "property_contactability",
      step: 2,
      status: "active",
    });
    db.lead_verification.push({ lead_id: LID, phone_status: "valid_mobile" });
  }

  function emailAckEvents() {
    return db.lead_contact_events.filter(
      (e) => e.event_type === "ack_sent" && e.channel === "email",
    );
  }

  it("genuine reply -> one ack email to the prospect + ack_sent/email recorded", async () => {
    seedAckLead();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(makeReq(inboundPayload({})) as any);

    expect(res.status).toBe(200);
    expect(resendSendSpy).toHaveBeenCalledTimes(1);
    const call = resendSendSpy.mock.calls[0][0] as unknown as {
      from: string;
      to: string;
      replyTo: string;
      subject: string;
      html: string;
      text: string;
    };
    expect(call.to).toBe(SENDER);
    expect(call.subject).toBe("Got your reply, Sam");
    // Identity comes from the shared channels.ts helpers, never hardcoded here.
    expect(call.from).toMatch(/<.+@.+>/);
    expect(call.replyTo).toMatch(/@/);
    expect(call.html).toContain("Got your reply, thank you. That is everything we need.");
    expect(call.text).toContain("One of our property tax specialists will call you");
    // Reply-only service email: no booking CTA button.
    expect(call.text).not.toContain("Pick a time");
    // House style: no em or en dashes anywhere in the copy.
    const dashPattern = new RegExp("[" + "\\u2013" + "\\u2014" + "]");
    expect(call.html).not.toMatch(dashPattern);
    expect(call.text).not.toMatch(dashPattern);
    expect(emailAckEvents()).toHaveLength(1);
  });

  it("second genuine reply -> no duplicate ack (idempotent per lead)", async () => {
    seedAckLead();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(makeReq(inboundPayload({})) as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(makeReq(inboundPayload({ text: "Also, evenings suit best." })) as any);

    expect(resendSendSpy).toHaveBeenCalledTimes(1);
    expect(emailAckEvents()).toHaveLength(1);
  });

  it("nameless lead -> subject falls back to plain 'Got your reply'", async () => {
    seedAckLead("property", "");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(makeReq(inboundPayload({})) as any);

    expect(resendSendSpy).toHaveBeenCalledTimes(1);
    const call = resendSendSpy.mock.calls[0][0] as unknown as { subject: string; html: string };
    expect(call.subject).toBe("Got your reply");
    expect(call.html).toContain("Hi there,");
  });

  it("test-source lead -> ack skipped entirely", async () => {
    seedAckLead("test");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(makeReq(inboundPayload({})) as any);

    expect(res.status).toBe(200);
    expect(resendSendSpy).not.toHaveBeenCalled();
    expect(emailAckEvents()).toHaveLength(0);
  });

  it("nurture flags off -> ack skipped and NOT recorded (retries when armed)", async () => {
    seedAckLead();
    delete process.env.LEAD_NURTURE_ENABLED;
    delete process.env.LEAD_NURTURE_EMAIL_ENABLED;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(makeReq(inboundPayload({})) as any);

    expect(res.status).toBe(200);
    expect(resendSendSpy).not.toHaveBeenCalled();
    expect(emailAckEvents()).toHaveLength(0);
  });
});
