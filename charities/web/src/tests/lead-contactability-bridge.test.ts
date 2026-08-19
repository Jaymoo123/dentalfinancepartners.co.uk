/**
 * Tests for the pool-intake bridge added to promoteIfContactable
 * (2026-08-19 estate lead-stack port): on promotion the site calls Property's
 * internal /api/leads/pool-intake so the Telegram grade + ping fire from the
 * single estate bot instance. The call is fail-open by contract: a bridge
 * outage must never block promotion or the handoff email.
 *
 * Also covers the 2026-08-15 back-ports: a failed status-flip WRITE returns
 * db-error (not alreadyPromoted), and stopNurture mirrors the opt-out onto
 * same-person sibling rows via the shared web-shared implementation.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const mockAdminSelect = vi.fn();
const mockAdminUpdate = vi.fn();
vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: (...args: unknown[]) => mockAdminSelect(...args),
  adminUpdate: (...args: unknown[]) => mockAdminUpdate(...args),
}));

const mockRecordEvent = vi.fn();
vi.mock("@accounting-network/web-shared/lead-nurture/send", () => ({
  recordLeadContactEvent: (...args: unknown[]) => mockRecordEvent(...args),
}));

const mockMirror = vi.fn();
vi.mock("@accounting-network/web-shared/lead-nurture/opt-out", () => ({
  mirrorOptOutToSiblings: (...args: unknown[]) => mockMirror(...args),
}));

const mockHandoff = vi.fn();
vi.mock("@/lib/leads/handoff", () => ({
  sendContactableHandoff: (...args: unknown[]) => mockHandoff(...args),
}));

vi.mock("@/lib/resend", () => ({
  getResend: () => ({ emails: { send: vi.fn() } }),
  getFromAddress: () => "team@trusteetax.co.uk",
}));
vi.mock("@/lib/lead-routing", () => ({
  resolveLeadTo: () => "ops@example.org",
}));

import { promoteIfContactable, stopNurture } from "@/lib/leads/contactability";

const LEAD_ID = "aaaa1111-2222-3333-4444-555555555555";
const realFetch = global.fetch;
const mockFetch = vi.fn();

/** Contactable verdict: one SMS reply event, no verification row needed. */
function stubContactableReads() {
  mockAdminSelect.mockImplementation((table: string) => {
    if (table === "lead_contact_events") {
      return Promise.resolve({
        ok: true,
        status: 200,
        data: [{ event_type: "replied", channel: "sms", ts: "2026-08-19T10:00:00Z" }],
      });
    }
    return Promise.resolve({ ok: true, status: 200, data: [] });
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  global.fetch = mockFetch as unknown as typeof fetch;
  process.env.LEAD_NURTURE_TOKEN_SECRET = "test-secret-0123456789-0123456789-01";
  delete process.env.LEAD_INTERNAL_SECRET;
  delete process.env.LEAD_OFFER_BASE_URL;
  stubContactableReads();
  // State stop ok; leads flip ok with one row updated.
  mockAdminUpdate.mockImplementation((table: string) =>
    Promise.resolve({
      ok: true,
      status: 200,
      data: table === "leads" ? [{ id: LEAD_ID }] : [],
    }),
  );
  mockHandoff.mockResolvedValue({ sent: true, to: "ops@example.org" });
  mockFetch.mockResolvedValue(new Response(JSON.stringify({ ok: true, pinged: true })));
});

afterEach(() => {
  global.fetch = realFetch;
});

describe("promoteIfContactable pool-intake bridge", () => {
  it("POSTs the lead to Property's pool-intake with the internal token", async () => {
    const result = await promoteIfContactable(LEAD_ID);
    expect(result.promoted).toBe(true);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe("https://www.propertytaxpartners.co.uk/api/leads/pool-intake");
    expect(init.method).toBe("POST");
    expect(init.headers["x-internal-token"]).toBe(process.env.LEAD_NURTURE_TOKEN_SECRET);
    expect(JSON.parse(init.body)).toEqual({ leadId: LEAD_ID });
  });

  it("honours LEAD_OFFER_BASE_URL and prefers LEAD_INTERNAL_SECRET", async () => {
    process.env.LEAD_OFFER_BASE_URL = "https://staging.example.org";
    process.env.LEAD_INTERNAL_SECRET = "dedicated-secret";
    await promoteIfContactable(LEAD_ID);
    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe("https://staging.example.org/api/leads/pool-intake");
    expect(init.headers["x-internal-token"]).toBe("dedicated-secret");
  });

  it("bridge outage is fail-open: promotion + handoff still complete", async () => {
    mockFetch.mockRejectedValue(new Error("bridge down"));
    const result = await promoteIfContactable(LEAD_ID);
    expect(result.promoted).toBe(true);
    expect(mockHandoff).toHaveBeenCalledTimes(1);
    expect(mockRecordEvent).toHaveBeenCalledWith(LEAD_ID, "handed_off", "system", {
      reason: "replied by SMS/WhatsApp",
    });
  });

  it("no secret configured: bridge skipped entirely, promotion unaffected", async () => {
    delete process.env.LEAD_NURTURE_TOKEN_SECRET;
    const result = await promoteIfContactable(LEAD_ID);
    expect(result.promoted).toBe(true);
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

describe("promoteIfContactable db-error back-port (2026-08-15 fix)", () => {
  it("a failed flip WRITE returns db-error, never alreadyPromoted, and no bridge call", async () => {
    mockAdminUpdate.mockImplementation((table: string) =>
      Promise.resolve({ ok: table !== "leads", status: table === "leads" ? 500 : 200, data: [] }),
    );
    const result = await promoteIfContactable(LEAD_ID);
    expect(result).toMatchObject({ promoted: false, alreadyPromoted: false, reason: "db-error" });
    expect(mockFetch).not.toHaveBeenCalled();
    expect(mockHandoff).not.toHaveBeenCalled();
  });

  it("zero rows flipped still means alreadyPromoted (no re-fire)", async () => {
    mockAdminUpdate.mockResolvedValue({ ok: true, status: 200, data: [] });
    const result = await promoteIfContactable(LEAD_ID);
    expect(result).toMatchObject({ promoted: false, alreadyPromoted: true });
    expect(mockHandoff).not.toHaveBeenCalled();
  });
});

describe("stopNurture estate mirror", () => {
  it("calls the shared sibling mirror with the lead + channel", async () => {
    await stopNurture(LEAD_ID, "sms");
    expect(mockMirror).toHaveBeenCalledWith(LEAD_ID, "sms");
    // Primary opt-out effects still happen locally.
    expect(mockRecordEvent).toHaveBeenCalledWith(LEAD_ID, "opted_out", "sms");
  });
});
