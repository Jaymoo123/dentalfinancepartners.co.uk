/**
 * Behaviour tests for the Property-parity tail added to /api/leads/submit
 * (2026-08-19 estate lead-stack port): real-time verification written to
 * lead_verification + verify_pass/verify_fail event, resource-download skip,
 * fail-open on verifier errors, and enrolment wiring.
 *
 * The shared factory itself (validation, honeypot, dedupe) is covered by
 * createLeadSubmitHandler.test.ts; here it is stubbed to a success response so
 * only the site tail is under test.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const LEAD_ID = "11111111-2222-3333-4444-555555555555";

const mockFactoryHandler = vi.fn();
vi.mock("@accounting-network/web-shared/leads/server", async (importOriginal) => {
  const real = await importOriginal<Record<string, unknown>>();
  return {
    ...real,
    createLeadSubmitHandler: () => (req: Request) => mockFactoryHandler(req),
  };
});

const mockAdminInsert = vi.fn();
vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminInsert: (...args: unknown[]) => mockAdminInsert(...args),
}));

const mockVerifyLead = vi.fn();
vi.mock("@/lib/leads/verify", () => ({
  verifyLead: (...args: unknown[]) => mockVerifyLead(...args),
}));

const mockEnrollLead = vi.fn();
vi.mock("@/lib/leads/enroll", () => ({
  enrollLead: (...args: unknown[]) => mockEnrollLead(...args),
}));

vi.mock("@/config/lead-nurture", () => ({
  routePrimarySequence: () => "contractors_ir35_contactability",
}));

const mockRecordEvent = vi.fn();
vi.mock("@accounting-network/web-shared/lead-nurture/send", () => ({
  recordLeadContactEvent: (...args: unknown[]) => mockRecordEvent(...args),
}));

vi.mock("@accounting-network/web-shared/lead-nurture/tokens", () => ({
  mintLeadToken: () => "tok-book",
}));

import { POST } from "@/app/api/leads/submit/route";

const VERIFY_OK = {
  phone: { status: "valid_mobile", line_type: "mobile", carrier: "EE", e164: "+447700900123" },
  email: { status: "deliverable", domain: "example.org" },
  verify_pass: true,
  provider: "twilio",
  raw: {},
};

function submitReq(body: Record<string, unknown>): NextRequest {
  return new NextRequest("http://localhost/api/leads/submit", {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(body),
  });
}

const BASE_BODY = {
  full_name: "Sam Carter",
  email: "sam@contractorlimited.co.uk",
  phone: "+447700900123",
  role: "Limited company director",
  message: "Just been told my current contract might be inside IR35, need a review.",
  source: "contractors-ir35",
};

beforeEach(() => {
  vi.clearAllMocks();
  mockFactoryHandler.mockResolvedValue(
    new Response(JSON.stringify({ success: true, leadId: LEAD_ID }), { status: 200 }),
  );
  mockVerifyLead.mockResolvedValue(VERIFY_OK);
  mockEnrollLead.mockResolvedValue({ enrolled: true, newlyEnrolled: true });
  mockAdminInsert.mockResolvedValue({ ok: true, status: 201, data: [{}] });
});

describe("submit tail: verification", () => {
  it("verifies, upserts lead_verification (onConflict lead_id), records verify_pass, enrols", async () => {
    const res = await POST(submitReq(BASE_BODY));
    const json = await res.json();

    expect(json.success).toBe(true);
    expect(mockVerifyLead).toHaveBeenCalledWith({
      email: BASE_BODY.email,
      phone: BASE_BODY.phone,
    });
    const [table, row, opts] = mockAdminInsert.mock.calls[0];
    expect(table).toBe("lead_verification");
    expect(row).toMatchObject({
      lead_id: LEAD_ID,
      phone_status: "valid_mobile",
      phone_e164: "+447700900123",
      verify_pass: true,
    });
    expect(opts).toMatchObject({ onConflict: "lead_id" });
    expect(mockRecordEvent).toHaveBeenCalledWith(LEAD_ID, "verify_pass", "system", {
      phone: "valid_mobile",
      email: "deliverable",
    });
    expect(mockEnrollLead).toHaveBeenCalledTimes(1);
    expect(json.verify).toEqual({ phone: "valid_mobile", email: "deliverable" });
  });

  it("records verify_fail when the verdict fails", async () => {
    mockVerifyLead.mockResolvedValue({
      ...VERIFY_OK,
      phone: { status: "invalid", line_type: null, carrier: null, e164: null },
      verify_pass: false,
    });
    await POST(submitReq(BASE_BODY));
    expect(mockRecordEvent).toHaveBeenCalledWith(
      LEAD_ID,
      "verify_fail",
      "system",
      expect.objectContaining({ phone: "invalid" }),
    );
  });

  it("verifier failure is fail-open: lead still succeeds and still enrols", async () => {
    mockVerifyLead.mockRejectedValue(new Error("Twilio timeout"));
    const res = await POST(submitReq(BASE_BODY));
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(mockEnrollLead).toHaveBeenCalledTimes(1);
    expect(json.verify).toBeUndefined();
  });
});

describe("submit tail: resource downloads", () => {
  it("role='resource' is neither verified nor enrolled, but still succeeds", async () => {
    const res = await POST(
      submitReq({
        ...BASE_BODY,
        full_name: "",
        phone: "",
        role: "resource",
        extras: { resource_gate: true },
        captureMode: "email_only",
      }),
    );
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(mockVerifyLead).not.toHaveBeenCalled();
    expect(mockEnrollLead).not.toHaveBeenCalled();
    expect(mockAdminInsert).not.toHaveBeenCalled();
  });
});

describe("submit tail: test leads + factory failures", () => {
  it("honours skip_verification only for a test lead", async () => {
    await POST(
      submitReq({ ...BASE_BODY, email: "probe@example.com", skip_verification: true }),
    );
    expect(mockVerifyLead).not.toHaveBeenCalled();
    expect(mockEnrollLead).toHaveBeenCalledTimes(1);

    vi.clearAllMocks();
    mockFactoryHandler.mockResolvedValue(
      new Response(JSON.stringify({ success: true, leadId: LEAD_ID }), { status: 200 }),
    );
    mockVerifyLead.mockResolvedValue(VERIFY_OK);
    mockEnrollLead.mockResolvedValue({ enrolled: true, newlyEnrolled: true });
    mockAdminInsert.mockResolvedValue({ ok: true, status: 201, data: [{}] });

    // A REAL lead cannot dodge verification with the same flag.
    await POST(submitReq({ ...BASE_BODY, skip_verification: true }));
    expect(mockVerifyLead).toHaveBeenCalledTimes(1);
  });

  it("factory failure passes through untouched: no verify, no enrol", async () => {
    mockFactoryHandler.mockResolvedValue(
      new Response(JSON.stringify({ success: false, error: "Missing required fields" }), {
        status: 400,
      }),
    );
    const res = await POST(submitReq(BASE_BODY));
    expect(res.status).toBe(400);
    expect(mockVerifyLead).not.toHaveBeenCalled();
    expect(mockEnrollLead).not.toHaveBeenCalled();
  });
});
