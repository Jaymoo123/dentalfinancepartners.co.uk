/**
 * Route-level tests for POST /api/leads/complete (the "complete your details"
 * capture surface).
 *
 * Covers:
 *   1. Token: bad/expired/wrong-intent -> 401/410; honeypot -> success no writes.
 *   2. Full completion (missing phone, valid phone) -> UPDATE not INSERT +
 *      verifyLead called + recordResponseAndEvaluate("confirmed","web").
 *   3. Name-only completion -> verifyLead NOT called (no phone change).
 *   4. Partial completion -> no confirmed, returns stillMissing.
 *   5. Already-complete -> no-op, no writes.
 *   6. Invalid / VoIP phone -> phone_recheck_needed + detail-capture stopped +
 *      no confirmed.
 *   7. Never overwrites a good stored field / never touches email; idempotent
 *      re-submit.
 *
 * Mocking style mirrors leads-submit.test.ts: vi.fn() spies for the admin layer,
 * table-dispatch in adminSelect/adminUpdate, and the token + shared floor modules
 * mocked with real-behaviour implementations so the missing-field logic is
 * genuinely exercised.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Module mocks (declared before importing the route) ───────────────────────

const mockAdminSelect = vi.fn();
const mockAdminUpdate = vi.fn();
const mockAdminInsert = vi.fn();

vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: (...args: unknown[]) => mockAdminSelect(...args),
  adminUpdate: (...args: unknown[]) => mockAdminUpdate(...args),
  adminInsert: (...args: unknown[]) => mockAdminInsert(...args),
}));

const mockVerifyLead = vi.fn();
vi.mock("@/lib/leads/verify", () => ({
  verifyLead: (...args: unknown[]) => mockVerifyLead(...args),
}));

const mockRecordResponseAndEvaluate = vi.fn();
vi.mock("@/lib/leads/contactability", () => ({
  recordResponseAndEvaluate: (...args: unknown[]) => mockRecordResponseAndEvaluate(...args),
}));

const mockRecordLeadContactEvent = vi.fn();
vi.mock("@accounting-network/web-shared/lead-nurture/send", () => ({
  recordLeadContactEvent: (...args: unknown[]) => mockRecordLeadContactEvent(...args),
}));

// Token module: verifyLeadToken is driven per-test; mintLeadToken is a stub.
const mockVerifyLeadToken = vi.fn();
vi.mock("@accounting-network/web-shared/lead-nurture/tokens", () => ({
  verifyLeadToken: (...args: unknown[]) => mockVerifyLeadToken(...args),
  mintLeadToken: () => "book-token-xyz",
}));

// Shared floor + missing-field logic: real-behaviour implementations so the
// route's field selection is genuinely tested (name >= 2 chars, phone >= 10
// digits). This also backs field-floors.ts's re-exports.
vi.mock("@accounting-network/web-shared/lead-nurture/lead-nurture-shared", () => {
  const NAME_MIN_LENGTH = 2;
  const PHONE_MIN_DIGITS = 10;
  const phoneDigitCount = (s?: string | null) => ((s ?? "").match(/\d/g) || []).length;
  const nameMeetsFloor = (n?: string | null) => (n ?? "").trim().length >= NAME_MIN_LENGTH;
  const phoneMeetsFloor = (p?: string | null) => phoneDigitCount(p) >= PHONE_MIN_DIGITS;
  const computeMissingContact = (lead: { full_name?: string | null; phone?: string | null }) => {
    const missing: ("name" | "phone")[] = [];
    if (!nameMeetsFloor(lead.full_name)) missing.push("name");
    if (!phoneMeetsFloor(lead.phone)) missing.push("phone");
    return missing;
  };
  return {
    NAME_MIN_LENGTH,
    PHONE_MIN_DIGITS,
    phoneDigitCount,
    nameMeetsFloor,
    phoneMeetsFloor,
    computeMissingContact,
  };
});

// ── Import route under test (after all mocks) ────────────────────────────────

import { POST } from "@/app/api/leads/complete/route";

// ── Fixtures ─────────────────────────────────────────────────────────────────

const LEAD_ID = "lead-complete-001";
const GOOD_TOKEN = "good.token";

function makeReq(body: Record<string, unknown>): Request {
  return new Request("http://localhost/api/leads/complete", {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(body),
  });
}

/** verifyLeadToken resolves to a valid profile token for LEAD_ID. */
function stubTokenOk() {
  mockVerifyLeadToken.mockReturnValue({ ok: true, leadId: LEAD_ID, intent: "profile" });
}

/** Stub the lead row returned by the id lookup. */
function stubLead(row: {
  full_name?: string | null;
  email?: string | null;
  phone?: string | null;
  source?: string | null;
}) {
  mockAdminSelect.mockResolvedValue({
    ok: true,
    status: 200,
    data: [
      {
        id: LEAD_ID,
        full_name: row.full_name ?? null,
        email: row.email ?? null,
        phone: row.phone ?? null,
        source: row.source ?? "property",
      },
    ],
  });
}

/** Default verify: a callable mobile. */
function stubVerifyValid() {
  mockVerifyLead.mockResolvedValue({
    phone: { status: "valid_mobile", line_type: "mobile", carrier: "EE", e164: "+447700900000" },
    email: { status: "valid", domain: "example.com" },
    verify_pass: true,
    provider: "twilio",
    raw: {},
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mockAdminUpdate.mockResolvedValue({ ok: true, status: 200, data: [] });
  mockAdminInsert.mockResolvedValue({ ok: true, status: 201, data: [] });
  mockRecordLeadContactEvent.mockResolvedValue(undefined);
  mockRecordResponseAndEvaluate.mockResolvedValue({ promoted: true, reason: "confirmed by one-tap link" });
  stubVerifyValid();
});

// ── 1. Token handling ─────────────────────────────────────────────────────────

describe("token handling", () => {
  it("returns 401 for a bad-signature token", async () => {
    mockVerifyLeadToken.mockReturnValue({ ok: false, reason: "bad-signature" });
    const res = await POST(makeReq({ token: "x.y", phone: "07700900000" }));
    expect(res.status).toBe(401);
    const body = (await res.json()) as { success: boolean };
    expect(body.success).toBe(false);
  });

  it("returns 401 for a wrong-intent token", async () => {
    mockVerifyLeadToken.mockReturnValue({ ok: false, reason: "wrong-intent" });
    const res = await POST(makeReq({ token: "x.y", phone: "07700900000" }));
    expect(res.status).toBe(401);
  });

  it("returns 401 for a malformed token", async () => {
    mockVerifyLeadToken.mockReturnValue({ ok: false, reason: "malformed" });
    const res = await POST(makeReq({ token: "junk", phone: "07700900000" }));
    expect(res.status).toBe(401);
  });

  it("returns 410 for an expired token", async () => {
    mockVerifyLeadToken.mockReturnValue({ ok: false, reason: "expired" });
    const res = await POST(makeReq({ token: "x.y", phone: "07700900000" }));
    expect(res.status).toBe(410);
  });

  it("does not touch the DB when the token is invalid", async () => {
    mockVerifyLeadToken.mockReturnValue({ ok: false, reason: "bad-signature" });
    await POST(makeReq({ token: "x.y", phone: "07700900000" }));
    expect(mockAdminSelect).not.toHaveBeenCalled();
    expect(mockAdminUpdate).not.toHaveBeenCalled();
    expect(mockAdminInsert).not.toHaveBeenCalled();
  });
});

// ── 2. Honeypot ────────────────────────────────────────────────────────────────

describe("honeypot (enquiry_ref non-empty) — ignored, request processed normally", () => {
  it("still verifies the token (honeypot no longer gates this route)", async () => {
    await POST(makeReq({ token: GOOD_TOKEN, phone: "07700900000", enquiry_ref: "bot" }));
    expect(mockVerifyLeadToken).toHaveBeenCalled();
  });
});

// ── 3. Lead lookup ─────────────────────────────────────────────────────────────

describe("lead lookup", () => {
  it("returns 404 when the lead id does not resolve", async () => {
    stubTokenOk();
    mockAdminSelect.mockResolvedValue({ ok: true, status: 200, data: [] });
    const res = await POST(makeReq({ token: GOOD_TOKEN, phone: "07700900000" }));
    expect(res.status).toBe(404);
  });
});

// ── 4. Already complete ────────────────────────────────────────────────────────

describe("already complete (no-op)", () => {
  beforeEach(() => {
    stubTokenOk();
    stubLead({ full_name: "Jane Smith", phone: "07700900000", email: "jane@example.com" });
  });

  it("returns alreadyComplete:true and writes nothing", async () => {
    const res = await POST(makeReq({ token: GOOD_TOKEN, phone: "07711123456" }));
    expect(res.status).toBe(200);
    const body = (await res.json()) as { success: boolean; alreadyComplete: boolean };
    expect(body.success).toBe(true);
    expect(body.alreadyComplete).toBe(true);
    expect(mockAdminUpdate).not.toHaveBeenCalled();
    expect(mockVerifyLead).not.toHaveBeenCalled();
    expect(mockRecordResponseAndEvaluate).not.toHaveBeenCalled();
  });

  it("returns a bookingToken so the UI can offer /book", async () => {
    const res = await POST(makeReq({ token: GOOD_TOKEN }));
    const body = (await res.json()) as { bookingToken?: string };
    expect(body.bookingToken).toBe("book-token-xyz");
  });
});

// ── 5. Full completion (missing phone, valid phone) ────────────────────────────

describe("full completion: missing phone, valid phone supplied", () => {
  beforeEach(() => {
    stubTokenOk();
    // Has a name already; only the phone is missing.
    stubLead({ full_name: "Jane Smith", phone: null, email: "jane@example.com" });
  });

  it("UPDATES the lead (never inserts a new lead row)", async () => {
    await POST(makeReq({ token: GOOD_TOKEN, phone: "07700900000" }));
    const leadUpdates = mockAdminUpdate.mock.calls.filter(([table]) => table === "leads");
    expect(leadUpdates).toHaveLength(1);
    const [, filter, patch] = leadUpdates[0] as [string, Record<string, string>, Record<string, unknown>];
    expect(filter.id).toBe(`eq.${LEAD_ID}`);
    expect(patch.phone).toBe("07700900000");
    // No lead INSERT anywhere.
    const leadInserts = mockAdminInsert.mock.calls.filter(([table]) => table === "leads");
    expect(leadInserts).toHaveLength(0);
  });

  it("re-verifies the new phone and upserts lead_verification", async () => {
    await POST(makeReq({ token: GOOD_TOKEN, phone: "07700900000" }));
    expect(mockVerifyLead).toHaveBeenCalledOnce();
    const [arg] = mockVerifyLead.mock.calls[0] as [{ email: string; phone: string }];
    expect(arg.phone).toBe("07700900000");
    expect(arg.email).toBe("jane@example.com");
    const verInserts = mockAdminInsert.mock.calls.filter(([table]) => table === "lead_verification");
    expect(verInserts).toHaveLength(1);
    const [, , opts] = verInserts[0] as [string, Record<string, unknown>, Record<string, unknown>];
    expect((opts as { onConflict?: string }).onConflict).toBe("lead_id");
  });

  it("runs the gate with recordResponseAndEvaluate('confirmed','web')", async () => {
    await POST(makeReq({ token: GOOD_TOKEN, phone: "07700900000" }));
    expect(mockRecordResponseAndEvaluate).toHaveBeenCalledWith(LEAD_ID, "confirmed", "web");
  });

  it("returns success with promoted flag + a bookingToken", async () => {
    const res = await POST(makeReq({ token: GOOD_TOKEN, phone: "07700900000" }));
    const body = (await res.json()) as { success: boolean; promoted?: boolean; bookingToken?: string };
    expect(body.success).toBe(true);
    expect(body.promoted).toBe(true);
    expect(body.bookingToken).toBe("book-token-xyz");
  });

  it("records a details_completed audit event", async () => {
    await POST(makeReq({ token: GOOD_TOKEN, phone: "07700900000" }));
    const completed = mockRecordLeadContactEvent.mock.calls.find(
      ([, type, , meta]) =>
        type === "operator_update" && (meta as { kind?: string })?.kind === "details_completed",
    );
    expect(completed).toBeDefined();
    const [, , channel, meta] = completed as [string, string, string, Record<string, unknown>];
    expect(channel).toBe("web");
    expect(meta.supplied).toEqual(["phone"]);
    expect(meta.stillMissing).toEqual([]);
  });
});

// ── 6. Name-only completion (verifyLead must NOT run) ──────────────────────────

describe("name-only completion over an already-good phone", () => {
  beforeEach(() => {
    stubTokenOk();
    // Missing name only; phone already present + fine.
    stubLead({ full_name: null, phone: "07700900000", email: "jane@example.com" });
  });

  it("does NOT call verifyLead (no phone change)", async () => {
    await POST(makeReq({ token: GOOD_TOKEN, full_name: "Jane Smith" }));
    expect(mockVerifyLead).not.toHaveBeenCalled();
    const verInserts = mockAdminInsert.mock.calls.filter(([table]) => table === "lead_verification");
    expect(verInserts).toHaveLength(0);
  });

  it("still runs the gate (confirmed) and updates only the name", async () => {
    await POST(makeReq({ token: GOOD_TOKEN, full_name: "Jane Smith" }));
    const [, , patch] = (mockAdminUpdate.mock.calls.find(([table]) => table === "leads") ??
      []) as [string, Record<string, string>, Record<string, unknown>];
    expect(patch.full_name).toBe("Jane Smith");
    expect(patch.phone).toBeUndefined();
    expect(mockRecordResponseAndEvaluate).toHaveBeenCalledWith(LEAD_ID, "confirmed", "web");
  });
});

// ── 7. Partial completion ──────────────────────────────────────────────────────

describe("partial completion (still missing the other field)", () => {
  beforeEach(() => {
    stubTokenOk();
    // Both missing; the lead only supplies the phone this time.
    stubLead({ full_name: null, phone: null, email: "jane@example.com" });
  });

  it("saves the phone but does NOT record confirmed", async () => {
    await POST(makeReq({ token: GOOD_TOKEN, phone: "07700900000" }));
    const [, , patch] = (mockAdminUpdate.mock.calls.find(([table]) => table === "leads") ??
      []) as [string, Record<string, string>, Record<string, unknown>];
    expect(patch.phone).toBe("07700900000");
    expect(mockRecordResponseAndEvaluate).not.toHaveBeenCalled();
  });

  it("returns stillMissing:['name']", async () => {
    const res = await POST(makeReq({ token: GOOD_TOKEN, phone: "07700900000" }));
    const body = (await res.json()) as { success: boolean; stillMissing: string[] };
    expect(body.success).toBe(true);
    expect(body.stillMissing).toEqual(["name"]);
  });

  it("does NOT stop the detail-capture sequence on a partial", async () => {
    await POST(makeReq({ token: GOOD_TOKEN, phone: "07700900000" }));
    const stops = mockAdminUpdate.mock.calls.filter(([table]) => table === "lead_nurture_state");
    expect(stops).toHaveLength(0);
  });
});

// ── 8. Invalid / VoIP phone on full completion ─────────────────────────────────

describe("full completion with a known-bad phone (invalid/voip)", () => {
  beforeEach(() => {
    stubTokenOk();
    stubLead({ full_name: "Jane Smith", phone: null, email: "jane@example.com" });
    mockVerifyLead.mockResolvedValue({
      phone: { status: "voip", line_type: "voip", carrier: null, e164: "+447700900000" },
      email: { status: "valid", domain: "example.com" },
      verify_pass: false,
      provider: "twilio",
      raw: {},
    });
  });

  it("records phone_recheck_needed and does NOT run the gate", async () => {
    await POST(makeReq({ token: GOOD_TOKEN, phone: "07700900000" }));
    const recheck = mockRecordLeadContactEvent.mock.calls.find(
      ([, type, , meta]) =>
        type === "operator_update" && (meta as { kind?: string })?.kind === "phone_recheck_needed",
    );
    expect(recheck).toBeDefined();
    expect(mockRecordResponseAndEvaluate).not.toHaveBeenCalled();
  });

  it("stops the property_detail_capture sequence", async () => {
    await POST(makeReq({ token: GOOD_TOKEN, phone: "07700900000" }));
    const stop = mockAdminUpdate.mock.calls.find(([table]) => table === "lead_nurture_state");
    expect(stop).toBeDefined();
    const [, filter, patch] = stop as [string, Record<string, string>, Record<string, unknown>];
    expect(filter.lead_id).toBe(`eq.${LEAD_ID}`);
    expect(filter.sequence).toBe("eq.property_detail_capture");
    expect(patch.status).toBe("stopped");
    expect(patch.next_action_at).toBeNull();
  });

  it("returns invalidPhone:true", async () => {
    const res = await POST(makeReq({ token: GOOD_TOKEN, phone: "07700900000" }));
    const body = (await res.json()) as { success: boolean; invalidPhone: boolean };
    expect(body.success).toBe(true);
    expect(body.invalidPhone).toBe(true);
  });
});

// ── 9. Supplied-but-invalid field -> 400 ───────────────────────────────────────

describe("supplied-but-invalid field", () => {
  it("returns 400 for a too-short phone and does not update", async () => {
    stubTokenOk();
    stubLead({ full_name: "Jane Smith", phone: null, email: "jane@example.com" });
    const res = await POST(makeReq({ token: GOOD_TOKEN, phone: "12345" })); // 5 digits
    expect(res.status).toBe(400);
    const leadUpdates = mockAdminUpdate.mock.calls.filter(([table]) => table === "leads");
    expect(leadUpdates).toHaveLength(0);
  });

  it("returns 400 for a one-character name and does not update", async () => {
    stubTokenOk();
    stubLead({ full_name: null, phone: "07700900000", email: "jane@example.com" });
    const res = await POST(makeReq({ token: GOOD_TOKEN, full_name: "J" }));
    expect(res.status).toBe(400);
    const leadUpdates = mockAdminUpdate.mock.calls.filter(([table]) => table === "leads");
    expect(leadUpdates).toHaveLength(0);
  });
});

// ── 10. Never overwrites a good field / never touches email ────────────────────

describe("field-scoping guarantees", () => {
  it("ignores a supplied name when only the phone is missing (never overwrites a good name)", async () => {
    stubTokenOk();
    stubLead({ full_name: "Jane Smith", phone: null, email: "jane@example.com" });
    // Attacker/UI sends a name too, but name is NOT missing -> must be ignored.
    await POST(makeReq({ token: GOOD_TOKEN, full_name: "Someone Else", phone: "07700900000" }));
    const [, , patch] = (mockAdminUpdate.mock.calls.find(([table]) => table === "leads") ??
      []) as [string, Record<string, string>, Record<string, unknown>];
    expect(patch.full_name).toBeUndefined();
    expect(patch.phone).toBe("07700900000");
  });

  it("never includes email in the update patch", async () => {
    stubTokenOk();
    stubLead({ full_name: "Jane Smith", phone: null, email: "jane@example.com" });
    await POST(makeReq({ token: GOOD_TOKEN, phone: "07700900000" }));
    const [, , patch] = (mockAdminUpdate.mock.calls.find(([table]) => table === "leads") ??
      []) as [string, Record<string, string>, Record<string, unknown>];
    expect(patch).not.toHaveProperty("email");
  });
});

// ── 11. Best-effort resilience ─────────────────────────────────────────────────

describe("resilience after the core UPDATE", () => {
  it("still returns success when the gate throws (does not 500)", async () => {
    stubTokenOk();
    stubLead({ full_name: "Jane Smith", phone: null, email: "jane@example.com" });
    mockRecordResponseAndEvaluate.mockRejectedValue(new Error("gate down"));
    const res = await POST(makeReq({ token: GOOD_TOKEN, phone: "07700900000" }));
    expect(res.status).toBe(200);
    const body = (await res.json()) as { success: boolean };
    expect(body.success).toBe(true);
  });

  it("still returns success when re-verification throws", async () => {
    stubTokenOk();
    stubLead({ full_name: "Jane Smith", phone: null, email: "jane@example.com" });
    mockVerifyLead.mockRejectedValue(new Error("twilio timeout"));
    const res = await POST(makeReq({ token: GOOD_TOKEN, phone: "07700900000" }));
    expect(res.status).toBe(200);
    const body = (await res.json()) as { success: boolean };
    expect(body.success).toBe(true);
    // Verification threw so status is unknown (not known-bad) -> gate still runs.
    expect(mockRecordResponseAndEvaluate).toHaveBeenCalledWith(LEAD_ID, "confirmed", "web");
  });
});
