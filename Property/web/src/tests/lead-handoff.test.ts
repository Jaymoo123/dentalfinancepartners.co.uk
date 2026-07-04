/**
 * Tests for the split handoff email system (lib/leads/handoff.ts) and the
 * /api/leads/handoff/resend route.
 *
 * sendContactableHandoff sends two emails: a forwardable brief (Annex-A-safe)
 * and an internal ops email (carries the log button and context). Tests verify
 * content, ordering, subject lines, partial-failure paths, and the resend route.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

// ── In-memory store ───────────────────────────────────────────────────────────
type Row = Record<string, unknown>;
const db = {
  leads: [] as Row[],
  lead_contact_events: [] as Row[],
  lead_verification: [] as Row[],
  lead_enrichment: [] as Row[],
  lead_nurture_sends: [] as Row[],
  vw_visitor_journey: [] as Row[],
  web_events: [] as Row[],
  reset() {
    this.leads = [];
    this.lead_contact_events = [];
    this.lead_verification = [];
    this.lead_enrichment = [];
    this.lead_nurture_sends = [];
    this.vw_visitor_journey = [];
    this.web_events = [];
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
    Promise.resolve({
      ok: true,
      status: 200,
      data: ((db[table as keyof typeof db] as Row[]) || []).filter((r) => matches(r, params)),
    }),
  ),
  adminInsert: vi.fn((table: string, row: Row) => {
    ((db[table as keyof typeof db] as Row[]) || []).push(row);
    return Promise.resolve({ ok: true, status: 201, data: [row] });
  }),
  adminUpdate: vi.fn(() => Promise.resolve({ ok: true, status: 200, data: [] })),
  adminDelete: vi.fn(() => Promise.resolve({ ok: true, status: 204, data: [] })),
}));

const resendSendSpy = vi.fn(
  async (_payload: { subject: string } & Record<string, unknown>): Promise<{ data: { id: string } | null; error: Error | null }> => ({
    data: { id: "em_test_1" },
    error: null,
  }),
);
vi.mock("@/lib/resend", () => ({
  getResend: () => ({ emails: { send: resendSendSpy } }),
  getFromAddress: () => "Property Tax Partners <ops@x>",
}));

vi.mock("@/lib/lead-routing", () => ({
  resolveLeadTo: () => "operator@example.com",
}));

vi.mock("@/config/niche-loader", () => ({
  getSiteUrl: () => "https://www.propertytaxpartners.co.uk",
}));

vi.mock("@accounting-network/web-shared/lead-nurture/tokens", () => ({
  mintLeadToken: vi.fn((_id: string, _type: string) => "tok_test_123"),
}));

vi.mock("@accounting-network/web-shared/lead-nurture/send", () => ({
  recordLeadContactEvent: vi.fn(async (leadId: string, event_type: string, channel: string | null, meta?: unknown) => {
    db.lead_contact_events.push({ lead_id: leadId, event_type, channel, meta: meta ?? null });
  }),
}));

import { sendContactableHandoff, buildForwardableBrief, buildInternalOpsEmail } from "@/lib/leads/handoff";

type HandoffLead = Parameters<typeof buildForwardableBrief>[0];
type HandoffDossier = Parameters<typeof buildForwardableBrief>[1];

const BASE_LEAD = {
  id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
  full_name: "Jane Smith",
  email: "jane@example.com",
  phone: "+447700900999",
  role: "landlord",
  message: "I want to understand my CGT position on selling a rental property.",
  source: "property",
  source_url: "https://www.propertytaxpartners.co.uk/blog/cgt",
  created_at: "2026-07-01T09:00:00Z",
  visitor_id: null,
};

const BASE_DOSSIER = {
  verification: {
    phone_status: "valid_mobile",
    phone_carrier: "EE",
    phone_e164: "+447700900999",
    email_status: "deliverable",
  },
  enrichment: {
    intent_category: "cgt",
    quality_score: 4,
    summary: "Wants to understand CGT on property disposal.",
    ch_company_name: null,
    ch_company_number: null,
    ch_company_status: null,
  },
  journey: null,
  timeline: [
    { ts: "2026-07-01T09:00:00Z", label: "Submitted the enquiry", detail: null },
    { ts: "2026-07-01T10:30:00Z", label: "They replied by SMS", detail: "Yes, happy to discuss." },
  ],
  replies: [
    { ts: "2026-07-01T10:30:00Z", channel: "sms", body: "Yes, happy to discuss." },
  ],
  bookingStart: null,
  responseLatencyMs: 5400000,
  callWindow: "They respond in the mornings (8am to 12pm)",
  touchesBeforeResponse: 1,
};

function seedLead(overrides: Partial<typeof BASE_LEAD> = {}) {
  db.leads.push({ ...BASE_LEAD, ...overrides });
}

beforeEach(() => {
  db.reset();
  vi.clearAllMocks();
  process.env.RESEND_API_KEY = "re_test_key";
  resendSendSpy.mockResolvedValue({ data: { id: "em_test_1" }, error: null });
});

// ── buildForwardableBrief ─────────────────────────────────────────────────────

describe("buildForwardableBrief()", () => {
  it("subject is exactly 'New qualified enquiry: Jane Smith'", () => {
    const { subject } = buildForwardableBrief(BASE_LEAD as unknown as HandoffLead, BASE_DOSSIER as unknown as HandoffDossier);
    expect(subject).toBe("New qualified enquiry: Jane Smith");
  });

  it("contains name, phone, email and enquiry", () => {
    const { html, text } = buildForwardableBrief(BASE_LEAD as unknown as HandoffLead, BASE_DOSSIER as unknown as HandoffDossier);
    expect(html).toContain("Jane Smith");
    expect(html).toContain("+447700900999");
    expect(html).toContain("jane@example.com");
    expect(html).toContain("I want to understand my CGT position");
    expect(text).toContain("Jane Smith");
    expect(text).toContain("+447700900999");
    expect(text).toContain("I want to understand my CGT position");
  });

  it("contains the branded shell marker (PROPERTY TAX)", () => {
    const { html } = buildForwardableBrief(BASE_LEAD as unknown as HandoffLead, BASE_DOSSIER as unknown as HandoffDossier);
    expect(html).toContain("PROPERTY");
    expect(html).toContain("PARTNERS");
  });

  it("contains the booked call row when bookingStart is set", () => {
    const dossierWithBooking = { ...BASE_DOSSIER, bookingStart: "2026-07-05T14:00:00Z" };
    const { html, text } = buildForwardableBrief(BASE_LEAD as unknown as HandoffLead, dossierWithBooking as unknown as HandoffDossier);
    expect(html).toContain("Booked call");
    expect(text).toContain("Booked call");
  });

  it("does NOT contain booked call row when bookingStart is null", () => {
    const { html } = buildForwardableBrief(BASE_LEAD as unknown as HandoffLead, BASE_DOSSIER as unknown as HandoffDossier);
    expect(html).not.toContain("Booked call");
  });

  it("MUST NOT contain: Grade, forwarded API path, Conversation so far, What they read, valid_mobile, Internal", () => {
    const { html, text } = buildForwardableBrief(BASE_LEAD as unknown as HandoffLead, BASE_DOSSIER as unknown as HandoffDossier);
    const combined = html + text;
    expect(combined).not.toContain("Grade");
    expect(combined).not.toContain("/api/leads/forwarded/");
    expect(combined).not.toContain("Conversation so far");
    expect(combined).not.toContain("What they read");
    expect(combined).not.toContain("valid_mobile");
    expect(combined).not.toMatch(/\bInternal\b/);
  });

  it("contains no em-dashes or en-dashes", () => {
    const { html, text } = buildForwardableBrief(BASE_LEAD as unknown as HandoffLead, BASE_DOSSIER as unknown as HandoffDossier);
    expect(html).not.toMatch(/[—–]/);
    expect(text).not.toMatch(/[—–]/);
  });
});

// ── buildInternalOpsEmail ─────────────────────────────────────────────────────

describe("buildInternalOpsEmail()", () => {
  const forwardedUrl = "https://www.propertytaxpartners.co.uk/api/leads/forwarded/tok_test_123";

  it("subject starts with [Internal]", () => {
    const { subject } = buildInternalOpsEmail(BASE_LEAD as unknown as HandoffLead, BASE_DOSSIER as unknown as HandoffDossier, "replied by SMS", forwardedUrl);
    expect(subject).toMatch(/^\[Internal\]/);
  });

  it("contains the amber boundary note", () => {
    const { html } = buildInternalOpsEmail(BASE_LEAD as unknown as HandoffLead, BASE_DOSSIER as unknown as HandoffDossier, "replied by SMS", forwardedUrl);
    expect(html).toContain("Forward ONLY the separate email titled");
    expect(html).toContain("Annex A");
    expect(html).toContain("must not be forwarded");
  });

  it("contains the forwarded-log URL and button copy", () => {
    const { html, text } = buildInternalOpsEmail(BASE_LEAD as unknown as HandoffLead, BASE_DOSSIER as unknown as HandoffDossier, "replied by SMS", forwardedUrl);
    expect(html).toContain(forwardedUrl);
    expect(html).toContain("I have forwarded this to DJH");
    expect(text).toContain("Once forwarded to DJH, log it here:");
    expect(text).toContain(forwardedUrl);
  });

  it("contains timeline content (Conversation so far)", () => {
    const { html } = buildInternalOpsEmail(BASE_LEAD as unknown as HandoffLead, BASE_DOSSIER as unknown as HandoffDossier, "replied by SMS", forwardedUrl);
    expect(html).toContain("Conversation so far");
    expect(html).toContain("They replied by SMS");
  });

  it("contains verification detail (phone status)", () => {
    const { html } = buildInternalOpsEmail(BASE_LEAD as unknown as HandoffLead, BASE_DOSSIER as unknown as HandoffDossier, "replied by SMS", forwardedUrl);
    expect(html).toContain("valid_mobile");
  });

  it("MUST NOT contain: Grade", () => {
    const { html, text } = buildInternalOpsEmail(BASE_LEAD as unknown as HandoffLead, BASE_DOSSIER as unknown as HandoffDossier, "replied by SMS", forwardedUrl);
    expect(html).not.toContain("Grade");
    expect(text).not.toContain("Grade");
  });

  it("omits the button when forwardedUrl is null", () => {
    const { html, text } = buildInternalOpsEmail(BASE_LEAD as unknown as HandoffLead, BASE_DOSSIER as unknown as HandoffDossier, "replied by SMS", null);
    expect(html).not.toContain("I have forwarded this to DJH");
    expect(text).not.toContain("log it here:");
  });

  it("contains no em-dashes or en-dashes", () => {
    const { html, text } = buildInternalOpsEmail(BASE_LEAD as unknown as HandoffLead, BASE_DOSSIER as unknown as HandoffDossier, "replied by SMS", forwardedUrl);
    expect(html).not.toMatch(/[—–]/);
    expect(text).not.toMatch(/[—–]/);
  });
});

// ── sendContactableHandoff orchestration ──────────────────────────────────────

describe("sendContactableHandoff()", () => {
  it("sends brief FIRST then internal email (in order)", async () => {
    seedLead();
    const result = await sendContactableHandoff(BASE_LEAD.id, "booked a callback");
    expect(result.sent).toBe(true);
    expect(resendSendSpy).toHaveBeenCalledTimes(2);
    // First call should be the forwardable brief
    const firstCall = resendSendSpy.mock.calls[0][0] as { subject: string };
    expect(firstCall.subject).toBe("New qualified enquiry: Jane Smith");
    // Second call should be the internal email
    const secondCall = resendSendSpy.mock.calls[1][0] as { subject: string };
    expect(secondCall.subject).toMatch(/^\[Internal\]/);
  });

  it("brief fails 3x -> {sent:false} and internal never attempted", async () => {
    seedLead();
    resendSendSpy.mockResolvedValue({ data: null, error: new Error("network error") });
    const result = await sendContactableHandoff(BASE_LEAD.id, "booked a callback");
    expect(result.sent).toBe(false);
    expect(result.reason).toBeTruthy();
    // Internal never attempted after brief fails
    expect(resendSendSpy).toHaveBeenCalledTimes(3); // 3 retries for brief only
  });

  it("brief ok + internal fails 3x -> {sent:true, internal:{sent:false}}", async () => {
    seedLead();
    // First call (brief) succeeds; all subsequent calls (internal retries) fail.
    resendSendSpy
      .mockResolvedValueOnce({ data: { id: "em_brief" }, error: null })
      .mockResolvedValue({ data: null, error: new Error("internal send error") });
    const result = await sendContactableHandoff(BASE_LEAD.id, "booked a callback");
    expect(result.sent).toBe(true);
    expect(result.internal).toBeDefined();
    expect(result.internal!.sent).toBe(false);
    expect(result.internal!.reason).toBeTruthy();
  });

  it("source:'test' -> skip, zero provider calls", async () => {
    seedLead({ source: "test" });
    const result = await sendContactableHandoff(BASE_LEAD.id, "replied by SMS");
    expect(result.sent).toBe(false);
    expect(result.skipped).toBe("test");
    expect(resendSendSpy).not.toHaveBeenCalled();
  });

  it("missing RESEND_API_KEY -> skip, zero provider calls", async () => {
    seedLead();
    delete process.env.RESEND_API_KEY;
    const result = await sendContactableHandoff(BASE_LEAD.id, "replied by SMS");
    expect(result.sent).toBe(false);
    expect(result.skipped).toBe("no-resend");
    expect(resendSendSpy).not.toHaveBeenCalled();
  });

  it("returns {sent:false, skipped:'no-lead'} when lead does not exist", async () => {
    const result = await sendContactableHandoff("nonexistent-id", "test");
    expect(result.sent).toBe(false);
    expect(result.skipped).toBe("no-lead");
  });
});

// ── HandoffResult shape ───────────────────────────────────────────────────────

describe("HandoffResult shape", () => {
  it("happy path includes sent:true, to, messageId, internal:{sent:true}", async () => {
    seedLead();
    const result = await sendContactableHandoff(BASE_LEAD.id, "booked a callback");
    expect(result.sent).toBe(true);
    expect(result.to).toBe("operator@example.com");
    expect(result.messageId).toBeTruthy();
    expect(result.internal).toBeDefined();
    expect(result.internal!.sent).toBe(true);
  });
});

// ── Resend route ─────────────────────────────────────────────────────────────

describe("/api/leads/handoff/resend route", () => {
  // Mock sendContactableHandoff for route tests so we don't re-exercise the orchestrator.
  beforeEach(() => {
    vi.doMock("@/lib/leads/handoff", () => ({
      sendContactableHandoff: vi.fn(async () => ({
        sent: true,
        to: "operator@example.com",
        messageId: "em_1",
        internal: { sent: true },
      })),
      buildForwardableBrief,
      buildInternalOpsEmail,
    }));
  });

  it("401 without x-internal-token", async () => {
    process.env.LEAD_INTERNAL_SECRET = "secret123";
    const { POST } = await import("@/app/api/leads/handoff/resend/route");
    const req = new Request("http://localhost/api/leads/handoff/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId: BASE_LEAD.id }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("409 when lead status is 'new'", async () => {
    process.env.LEAD_INTERNAL_SECRET = "secret123";
    db.leads.push({ ...BASE_LEAD, status: "new" });
    const { POST } = await import("@/app/api/leads/handoff/resend/route");
    const req = new Request("http://localhost/api/leads/handoff/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-internal-token": "secret123" },
      body: JSON.stringify({ leadId: BASE_LEAD.id }),
    });
    const res = await POST(req);
    expect(res.status).toBe(409);
  });

  it("happy path: sends emails and records handoff_resent event", async () => {
    process.env.LEAD_INTERNAL_SECRET = "secret123";
    db.leads.push({ ...BASE_LEAD, status: "contactable" });
    const { POST } = await import("@/app/api/leads/handoff/resend/route");
    const req = new Request("http://localhost/api/leads/handoff/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-internal-token": "secret123" },
      body: JSON.stringify({ leadId: BASE_LEAD.id }),
    });
    const res = await POST(req);
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);
    const resent = db.lead_contact_events.find(
      (e) => e.event_type === "operator_update" && (e.meta as { kind?: string } | null)?.kind === "handoff_resent",
    );
    expect(resent).toBeDefined();
  });
});
