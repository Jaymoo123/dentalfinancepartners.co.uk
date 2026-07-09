/**
 * Tests for the handoff email (lib/leads/handoff.ts) and the
 * /api/leads/handoff/resend route.
 *
 * sendContactableHandoff sends ONE email to the operator: the original flat
 * evidence-pack format with verified contact details, response behaviour,
 * enrichment, journey and conversation timeline. No grading, no partner names,
 * no action buttons (owner decision 2026-07-04).
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

import { sendContactableHandoff, buildHandoffEmail } from "@/lib/leads/handoff";

type HandoffLead = Parameters<typeof buildHandoffEmail>[0];
type HandoffDossier = Parameters<typeof buildHandoffEmail>[1];

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

const LEAD = BASE_LEAD as unknown as HandoffLead;
const DOSSIER = BASE_DOSSIER as unknown as HandoffDossier;

function seedLead(overrides: Partial<typeof BASE_LEAD> = {}) {
  db.leads.push({ ...BASE_LEAD, ...overrides });
}

beforeEach(() => {
  db.reset();
  vi.clearAllMocks();
  process.env.RESEND_API_KEY = "re_test_key";
  resendSendSpy.mockResolvedValue({ data: { id: "em_test_1" }, error: null });
});

// ── buildHandoffEmail ─────────────────────────────────────────────────────────

describe("buildHandoffEmail()", () => {
  it("subject is exactly 'New qualified enquiry: Jane Smith'", () => {
    const { subject } = buildHandoffEmail(LEAD, DOSSIER, "replied by SMS");
    expect(subject).toBe("New qualified enquiry: Jane Smith");
  });

  it("updated=true -> 'Updated enquiry' subject + refreshed-pack headline", () => {
    const { subject, html, text } = buildHandoffEmail(LEAD, DOSSIER, "sent more info by email", true);
    expect(subject).toBe("Updated enquiry: Jane Smith (new reply since handoff)");
    expect(html).toContain("forward this version");
    expect(text).toContain("Updated enquiry: Jane Smith");
  });

  it("'How they responded' is derived from replies, not the frozen reason", () => {
    const { html } = buildHandoffEmail(LEAD, DOSSIER, "manual re-send");
    expect(html).toContain("Replied by SMS");
    expect(html).not.toContain("manual re-send");

    const multi = {
      ...DOSSIER,
      replies: [
        ...DOSSIER.replies,
        { ts: "2026-07-01T10:35:00Z", channel: "email", body: "Afternoon next week please." },
      ],
    };
    expect(buildHandoffEmail(LEAD, multi, "manual re-send").html).toContain(
      "Replied by SMS, then by email",
    );

    const noReplies = { ...DOSSIER, replies: [] };
    expect(buildHandoffEmail(LEAD, noReplies, "booked a callback").html).toContain(
      "booked a callback",
    );
  });

  it("contains name, verified phone and email, and the enquiry", () => {
    const { html, text } = buildHandoffEmail(LEAD, DOSSIER, "replied by SMS");
    expect(html).toContain("Jane Smith");
    expect(html).toContain("+447700900999");
    expect(html).toContain("valid_mobile");
    expect(html).toContain("EE");
    expect(html).toContain("jane@example.com");
    expect(html).toContain("deliverable");
    expect(html).toContain("I want to understand my CGT position");
    expect(text).toContain("+447700900999");
    expect(text).toContain("I want to understand my CGT position");
  });

  it("contains the extra evidence fields in the detail table", () => {
    const { html } = buildHandoffEmail(LEAD, DOSSIER, "replied by SMS");
    expect(html).toContain("How they responded");
    expect(html).toContain("replied by SMS");
    expect(html).toContain("Response time");
    expect(html).toContain("Best call window");
    expect(html).toContain("Intent");
    expect(html).toContain("Summary");
    expect(html).toContain("From page");
  });

  it("contains the verified/ready headline and the conversation timeline", () => {
    const { html } = buildHandoffEmail(LEAD, DOSSIER, "replied by SMS");
    expect(html).toContain("Contact details verified. Actively responded and ready for a call.");
    expect(html).toContain("Conversation so far");
    expect(html).toContain("Yes, happy to discuss.");
  });

  it("contains the booked callback line when bookingStart is set", () => {
    const withBooking = { ...BASE_DOSSIER, bookingStart: "2026-07-05T14:00:00Z" } as unknown as HandoffDossier;
    const { html, text } = buildHandoffEmail(LEAD, withBooking, "booked a callback");
    expect(html).toContain("Booked callback:");
    expect(text).toContain("Booked callback:");
  });

  it("MUST NOT contain: grading, partner names, action links, internal notices", () => {
    const { html, text } = buildHandoffEmail(LEAD, DOSSIER, "replied by SMS");
    const combined = html + text;
    expect(combined).not.toContain("Grade");
    expect(combined).not.toContain("DJH");
    expect(combined).not.toContain("/api/leads/forwarded/");
    expect(combined).not.toContain("[Internal]");
    expect(combined).not.toContain("Important:");
    expect(combined).not.toContain("I have forwarded");
    expect(combined).not.toContain("log the hand-over");
  });

  it("contains no em-dashes or en-dashes", () => {
    const { html, text } = buildHandoffEmail(LEAD, DOSSIER, "replied by SMS");
    expect(html).not.toMatch(/[—–]/);
    expect(text).not.toMatch(/[—–]/);
  });

  it("role 'landlord' falls back to raw value (raw-fallback test)", () => {
    // BASE_LEAD has role: "landlord" which is not in the niche config map
    const { html } = buildHandoffEmail(LEAD, DOSSIER, "replied by SMS");
    expect(html).toContain("landlord");
  });

  it("role renders the config label for known values", () => {
    const lead = { ...BASE_LEAD, role: "Portfolio owner", extras: null } as unknown as HandoffLead;
    const { html } = buildHandoffEmail(lead, DOSSIER, "replied by SMS");
    expect(html).toContain("Portfolio owner (4-10 properties)");
  });

  it("renders 'In their words' row when extras.role_detail is present", () => {
    const lead = {
      ...BASE_LEAD,
      extras: { role_detail: "I have about 8 buy-to-let flats" },
    } as unknown as HandoffLead;
    const { html } = buildHandoffEmail(lead, DOSSIER, "replied by SMS");
    expect(html).toContain("In their words");
    expect(html).toContain("I have about 8 buy-to-let flats");
  });

  it("does not render 'In their words' row when extras.role_detail is absent", () => {
    const { html } = buildHandoffEmail(LEAD, DOSSIER, "replied by SMS");
    expect(html).not.toContain("In their words");
  });

  it("renders 'Came via' row with surface label when extras.form_id is present", () => {
    const lead = {
      ...BASE_LEAD,
      extras: { form_id: "lead_form" },
    } as unknown as HandoffLead;
    const { html } = buildHandoffEmail(lead, DOSSIER, "replied by SMS");
    expect(html).toContain("Came via");
    expect(html).toContain("Contact form (full enquiry)");
  });

  it("does not render 'Came via' row when extras.form_id is absent", () => {
    const { html } = buildHandoffEmail(LEAD, DOSSIER, "replied by SMS");
    expect(html).not.toContain("Came via");
  });
});

// ── sendContactableHandoff orchestration ──────────────────────────────────────

describe("sendContactableHandoff()", () => {
  it("sends exactly ONE email with the handoff subject", async () => {
    seedLead();
    const result = await sendContactableHandoff(BASE_LEAD.id, "booked a callback");
    expect(result.sent).toBe(true);
    expect(resendSendSpy).toHaveBeenCalledTimes(1);
    const call = resendSendSpy.mock.calls[0][0];
    expect(call.subject).toBe("New qualified enquiry: Jane Smith");
  });

  it("fails 3x -> {sent:false, reason}", async () => {
    seedLead();
    resendSendSpy.mockResolvedValue({ data: null, error: new Error("network error") });
    const result = await sendContactableHandoff(BASE_LEAD.id, "booked a callback");
    expect(result.sent).toBe(false);
    expect(result.reason).toBeTruthy();
    expect(resendSendSpy).toHaveBeenCalledTimes(3);
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

  it("happy path result shape: sent, to, messageId", async () => {
    seedLead();
    const result = await sendContactableHandoff(BASE_LEAD.id, "booked a callback");
    expect(result.sent).toBe(true);
    expect(result.to).toBe("operator@example.com");
    expect(result.messageId).toBeTruthy();
  });
});

// ── Resend route ─────────────────────────────────────────────────────────────

describe("/api/leads/handoff/resend route", () => {
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

  it("happy path: sends the email and records handoff_resent event", async () => {
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
