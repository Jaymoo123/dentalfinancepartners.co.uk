/**
 * Route-level tests for the reconciliation safety-net cron
 * (GET/POST /api/cron/lead-reconcile) and the retro-enrol endpoint
 * (POST /api/leads/enroll).
 *
 * Covers:
 *   lead-reconcile:
 *     1. 401 without a valid CRON_SECRET bearer.
 *     2. Eligibility: excludes source='test', role='resource', honeypot /
 *        suspected_spam, and terminal-status leads; keeps only new/nurturing.
 *     3. Only enrols leads with NO lead_nurture_state row.
 *     4. Calls enrollLead once per eligible un-enrolled lead.
 *     5. ALERT (console.error) when un-enrolled count >= threshold (3).
 *   enroll:
 *     6. 401 without the x-internal-token.
 *     7. 404 when the lead is not found.
 *     8. Calls enrollLead and returns ok:true on success.
 *
 * Mocking style mirrors leads-submit.test.ts: vi.fn() spies for the admin
 * layer + enrollLead, table-dispatch in adminSelect, per-scenario stubs.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ── Module mocks (declared before importing the routes) ──────────────────────

const mockAdminSelect = vi.fn();

vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: (...args: unknown[]) => mockAdminSelect(...args),
}));

const mockEnrollLead = vi.fn();
vi.mock("@/lib/leads/enroll", () => ({
  enrollLead: (...args: unknown[]) => mockEnrollLead(...args),
}));

// routePrimarySequence is deterministic and side-effect-free; stub it so the
// tests do not depend on the real missing-contact routing internals.
vi.mock("@/config/lead-nurture", () => ({
  routePrimarySequence: () => "property_contactability",
}));

// ── Import routes under test (after all mocks) ───────────────────────────────

import { GET, POST } from "@/app/api/cron/lead-reconcile/route";
import { POST as ENROLL_POST } from "@/app/api/leads/enroll/route";

// ── Fixtures / helpers ───────────────────────────────────────────────────────

const CRON_SECRET = "test-cron-secret";
const INTERNAL_SECRET = "test-internal-secret";

function cronReq({ auth }: { auth?: string } = {}): NextRequest {
  const headers = new Headers();
  if (auth !== undefined) headers.set("authorization", auth);
  return new NextRequest("http://localhost/api/cron/lead-reconcile", { method: "GET", headers });
}

function enrollReq(body: unknown, { token }: { token?: string } = {}): Request {
  const headers = new Headers({ "content-type": "application/json" });
  if (token !== undefined) headers.set("x-internal-token", token);
  return new Request("http://localhost/api/leads/enroll", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

/** A minimal eligible (new, property, no flags) lead row. */
function lead(id: string, over: Record<string, unknown> = {}) {
  return {
    id,
    full_name: "Jane Smith",
    email: "jane@example.com",
    phone: "07700900000",
    role: "landlord",
    source: "property",
    message: "Help with my portfolio tax",
    visitor_id: null,
    status: "new",
    extras: null,
    created_at: new Date().toISOString(),
    ...over,
  };
}

/**
 * Stub adminSelect to dispatch by table:
 *   leads              -> the given rows (the lookback scan)
 *   lead_nurture_state -> rows for lead_ids already enrolled (default: none)
 */
function stubSelects(leadRows: unknown[], enrolledIds: string[] = []) {
  mockAdminSelect.mockImplementation((table: string) => {
    if (table === "leads") {
      return Promise.resolve({ ok: true, status: 200, data: leadRows });
    }
    if (table === "lead_nurture_state") {
      return Promise.resolve({
        ok: true,
        status: 200,
        data: enrolledIds.map((id) => ({ lead_id: id })),
      });
    }
    return Promise.resolve({ ok: true, status: 200, data: [] });
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  process.env.CRON_SECRET = CRON_SECRET;
  process.env.LEAD_INTERNAL_SECRET = INTERNAL_SECRET;
  delete process.env.LEAD_NURTURE_TOKEN_SECRET;
  // Enable actual enrolment for the behaviour tests below; the dry-run default is
  // covered in its own describe block.
  process.env.LEAD_RECONCILE_ENABLED = "1";
  mockEnrollLead.mockResolvedValue({
    enrolled: true,
    newlyEnrolled: true,
    sequenceName: "property_contactability",
  });
});

// ── 1. Auth (lead-reconcile) ──────────────────────────────────────────────────

describe("lead-reconcile auth", () => {
  it("returns 401 without an authorization header", async () => {
    stubSelects([]);
    const res = await GET(cronReq());
    expect(res.status).toBe(401);
    expect(mockEnrollLead).not.toHaveBeenCalled();
  });

  it("returns 401 with the wrong bearer token", async () => {
    stubSelects([]);
    const res = await GET(cronReq({ auth: "Bearer wrong-secret" }));
    expect(res.status).toBe(401);
  });

  it("returns 401 when CRON_SECRET is unset", async () => {
    delete process.env.CRON_SECRET;
    stubSelects([]);
    const res = await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    expect(res.status).toBe(401);
  });

  it("authorises with the correct bearer token (GET and POST)", async () => {
    stubSelects([]);
    const g = await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    expect(g.status).toBe(200);
    const p = await POST(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    expect(p.status).toBe(200);
  });
});

// ── 2. Eligibility exclusions ─────────────────────────────────────────────────

describe("lead-reconcile eligibility", () => {
  it("excludes source='test' leads", async () => {
    stubSelects([lead("t1", { source: "test" })]);
    await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    expect(mockEnrollLead).not.toHaveBeenCalled();
  });

  it("excludes role='resource' leads (Annex B.2 downloads)", async () => {
    stubSelects([lead("r1", { role: "resource" })]);
    await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    expect(mockEnrollLead).not.toHaveBeenCalled();
  });

  it("excludes honeypot leads", async () => {
    stubSelects([lead("h1", { extras: { honeypot: true } })]);
    await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    expect(mockEnrollLead).not.toHaveBeenCalled();
  });

  it("excludes suspected_spam leads", async () => {
    stubSelects([lead("s1", { extras: { suspected_spam: true } })]);
    await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    expect(mockEnrollLead).not.toHaveBeenCalled();
  });

  it.each(["closed", "unreachable", "forwarded", "converted", "archived", "contactable", "contacted", "qualified"])(
    "excludes terminal / handled status '%s'",
    async (status) => {
      stubSelects([lead("x1", { status })]);
      await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
      expect(mockEnrollLead).not.toHaveBeenCalled();
    },
  );

  it("includes status 'new' and 'nurturing'", async () => {
    stubSelects([lead("n1", { status: "new" }), lead("n2", { status: "nurturing" })]);
    await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    expect(mockEnrollLead).toHaveBeenCalledTimes(2);
  });
});

// ── 3. Only enrols leads with no state row ────────────────────────────────────

describe("lead-reconcile state-row subtraction", () => {
  it("does NOT enrol a lead that already has a lead_nurture_state row", async () => {
    stubSelects([lead("a1"), lead("a2")], ["a1"]); // a1 already enrolled
    await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    expect(mockEnrollLead).toHaveBeenCalledTimes(1);
    const [calledLead] = mockEnrollLead.mock.calls[0] as [{ id: string }];
    expect(calledLead.id).toBe("a2");
  });

  it("enrols nothing when every eligible lead already has a state row", async () => {
    stubSelects([lead("a1"), lead("a2")], ["a1", "a2"]);
    const res = await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    const body = (await res.json()) as { missing: number; enrolled: number };
    expect(mockEnrollLead).not.toHaveBeenCalled();
    expect(body.missing).toBe(0);
    expect(body.enrolled).toBe(0);
  });

  it("does not query lead_nurture_state when no lead is eligible", async () => {
    stubSelects([lead("t1", { source: "test" })]);
    await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    const stateCalls = mockAdminSelect.mock.calls.filter(([table]) => table === "lead_nurture_state");
    expect(stateCalls).toHaveLength(0);
  });
});

// ── 4. Calls enrollLead per eligible lead + response counts ────────────────────

describe("lead-reconcile enrolment", () => {
  it("calls enrollLead once per eligible un-enrolled lead with routed sequence", async () => {
    stubSelects([lead("a1"), lead("a2")]);
    await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    expect(mockEnrollLead).toHaveBeenCalledTimes(2);
    const [, opts] = mockEnrollLead.mock.calls[0] as [unknown, Record<string, unknown>];
    expect(opts.sequenceName).toBe("property_contactability");
  });

  it("reports scanned / missing / enrolled in the response", async () => {
    stubSelects([lead("a1"), lead("a2"), lead("t1", { source: "test" })]);
    const res = await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    const body = (await res.json()) as { ok: boolean; scanned: number; missing: number; enrolled: number };
    expect(body.ok).toBe(true);
    expect(body.scanned).toBe(3); // test lead is scanned but not eligible
    expect(body.missing).toBe(2);
    expect(body.enrolled).toBe(2);
  });

  it("counts a dormant enrol (enrolled:false) as not-enrolled", async () => {
    mockEnrollLead.mockResolvedValue({
      enrolled: false,
      newlyEnrolled: false,
      sequenceName: "property_contactability",
      reason: "dormant",
    });
    stubSelects([lead("a1")]);
    const res = await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    const body = (await res.json()) as { missing: number; enrolled: number };
    expect(body.missing).toBe(1);
    expect(body.enrolled).toBe(0);
  });
});

// ── 5. Regression ALERT ────────────────────────────────────────────────────────

describe("lead-reconcile ALERT threshold", () => {
  it("console.error ALERTs when un-enrolled count >= 3", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    stubSelects([lead("a1"), lead("a2"), lead("a3")]);
    const res = await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    const body = (await res.json()) as { alerted: boolean };
    expect(body.alerted).toBe(true);
    expect(spy).toHaveBeenCalledWith(
      "[lead-reconcile] ALERT: N leads were un-enrolled",
      expect.objectContaining({ count: 3, ids: ["a1", "a2", "a3"] }),
    );
    spy.mockRestore();
  });

  it("does NOT ALERT below the threshold (2 missing)", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    stubSelects([lead("a1"), lead("a2")]);
    const res = await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    const body = (await res.json()) as { alerted: boolean };
    expect(body.alerted).toBe(false);
    const alertCalls = spy.mock.calls.filter(([msg]) => String(msg).includes("ALERT"));
    expect(alertCalls).toHaveLength(0);
    spy.mockRestore();
  });
});

// ── 5b. Dry-run default (LEAD_RECONCILE_ENABLED unset) ────────────────────────

describe("lead-reconcile dry-run default", () => {
  it("reports wouldEnrol but enrols nothing when the flag is unset", async () => {
    delete process.env.LEAD_RECONCILE_ENABLED;
    stubSelects([lead("a1"), lead("a2")]);
    const res = await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    const body = (await res.json()) as {
      dryRun: boolean;
      missing: number;
      enrolled: number;
      wouldEnrol: number;
    };
    expect(mockEnrollLead).not.toHaveBeenCalled();
    expect(body.dryRun).toBe(true);
    expect(body.missing).toBe(2);
    expect(body.enrolled).toBe(0);
    expect(body.wouldEnrol).toBe(2);
  });

  it("still ALERTs on a regression while in dry-run", async () => {
    delete process.env.LEAD_RECONCILE_ENABLED;
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    stubSelects([lead("a1"), lead("a2"), lead("a3")]);
    const res = await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    const body = (await res.json()) as { alerted: boolean; dryRun: boolean };
    expect(body.alerted).toBe(true);
    expect(body.dryRun).toBe(true);
    expect(mockEnrollLead).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});

// ── 6-8. Retro-enrol endpoint (/api/leads/enroll) ──────────────────────────────

describe("leads/enroll endpoint", () => {
  it("returns 401 without the x-internal-token", async () => {
    const res = await ENROLL_POST(enrollReq({ leadId: "lead-1" }));
    expect(res.status).toBe(401);
    expect(mockEnrollLead).not.toHaveBeenCalled();
  });

  it("returns 401 with the wrong token", async () => {
    const res = await ENROLL_POST(enrollReq({ leadId: "lead-1" }, { token: "nope" }));
    expect(res.status).toBe(401);
  });

  it("returns 400 when leadId is missing", async () => {
    const res = await ENROLL_POST(enrollReq({}, { token: INTERNAL_SECRET }));
    expect(res.status).toBe(400);
  });

  it("returns 404 when the lead is not found", async () => {
    mockAdminSelect.mockResolvedValue({ ok: true, status: 200, data: [] });
    const res = await ENROLL_POST(enrollReq({ leadId: "missing" }, { token: INTERNAL_SECRET }));
    expect(res.status).toBe(404);
    expect(mockEnrollLead).not.toHaveBeenCalled();
  });

  it("calls enrollLead and returns ok:true with the result on success", async () => {
    mockAdminSelect.mockResolvedValue({
      ok: true,
      status: 200,
      data: [lead("lead-1", { visitor_id: "vis-9" })],
    });
    const res = await ENROLL_POST(enrollReq({ leadId: "lead-1" }, { token: INTERNAL_SECRET }));
    expect(res.status).toBe(200);
    const body = (await res.json()) as { ok: boolean; enrolled: boolean; sequenceName: string };
    expect(body.ok).toBe(true);
    expect(body.enrolled).toBe(true);
    expect(body.sequenceName).toBe("property_contactability");
    expect(mockEnrollLead).toHaveBeenCalledTimes(1);
    const [calledLead, opts] = mockEnrollLead.mock.calls[0] as [{ id: string }, Record<string, unknown>];
    expect(calledLead.id).toBe("lead-1");
    expect(opts.visitorId).toBe("vis-9");
  });
});
