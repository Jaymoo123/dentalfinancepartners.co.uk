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
 *     4. Calls enrollLead once per eligible un-enrolled lead with deferFirstTouch:true.
 *     5. ALERT (console.error) when un-enrolled count >= threshold (3).
 *     6. Same-email dedupe: in-sweep (two candidates share email -> only newest enrols).
 *     7. Same-email dedupe: cross-row sibling with state row -> candidate skipped.
 *     8. Age guard: candidate older than 72h -> skippedStale, not enrolled;
 *        candidate within 72h -> enrolled normally.
 *     9. Summary / response include skippedDuplicate and skippedStale.
 *    10. Dry-run wouldEnrol excludes duplicates and stale.
 *   enroll:
 *    11. 401 without the x-internal-token.
 *    12. 404 when the lead is not found.
 *    13. Calls enrollLead and returns ok:true on success.
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

/**
 * A minimal eligible (new, property, no flags) lead row.
 *
 * Each lead's email defaults to `<id>@example.com` so that two leads with
 * different ids always have distinct emails unless the caller overrides the
 * email field explicitly. This prevents the in-sweep email dedup from
 * unexpectedly collapsing unrelated test leads.
 */
function lead(id: string, over: Record<string, unknown> = {}) {
  return {
    id,
    full_name: "Jane Smith",
    email: `${id}@example.com`,
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
 * Stub adminSelect to dispatch by table.
 *
 * The route now makes up to four adminSelect calls in the dedupe path:
 *   1. leads              -> main lookback scan (leadRows)
 *   2. lead_nurture_state -> main state check (enrolledIds)
 *   3. leads              -> sibling email query (siblingLeadRows, default: [])
 *   4. lead_nurture_state -> sibling state check (siblingStateIds, default: [])
 *
 * For the common case (no duplicates, no siblings), passing only leadRows and
 * enrolledIds is sufficient because the sibling query returns no extra rows.
 */
function stubSelects(
  leadRows: unknown[],
  enrolledIds: string[] = [],
  siblingLeadRows: { id: string; email: string }[] = [],
  siblingStateIds: string[] = [],
) {
  // Track call count per table to distinguish the main scan from the sibling query.
  const callCount: Record<string, number> = {};

  mockAdminSelect.mockImplementation((table: string) => {
    callCount[table] = (callCount[table] ?? 0) + 1;

    if (table === "leads") {
      // First call: main lookback scan. Second call: sibling email query.
      if (callCount["leads"] === 1) {
        return Promise.resolve({ ok: true, status: 200, data: leadRows });
      }
      return Promise.resolve({ ok: true, status: 200, data: siblingLeadRows });
    }

    if (table === "lead_nurture_state") {
      // First call: main state check. Second call: sibling state check.
      if (callCount["lead_nurture_state"] === 1) {
        return Promise.resolve({
          ok: true,
          status: 200,
          data: enrolledIds.map((id) => ({ lead_id: id })),
        });
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        data: siblingStateIds.map((id) => ({ lead_id: id })),
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
    stubSelects([]);
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

// ── 4. Calls enrollLead with deferFirstTouch:true + routed sequence ────────────

describe("lead-reconcile enrolment", () => {
  it("calls enrollLead with deferFirstTouch:true for each eligible un-enrolled lead", async () => {
    stubSelects([lead("a1"), lead("a2")]);
    await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    expect(mockEnrollLead).toHaveBeenCalledTimes(2);
    for (const call of mockEnrollLead.mock.calls) {
      const [, opts] = call as [unknown, Record<string, unknown>];
      expect(opts.deferFirstTouch).toBe(true);
    }
  });

  it("calls enrollLead with the routed sequenceName", async () => {
    stubSelects([lead("a1")]);
    await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
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

  it("dry-run wouldEnrol excludes duplicates and stale leads", async () => {
    delete process.env.LEAD_RECONCILE_ENABLED;

    // Three candidates: a1 is fresh and unique, a2 shares email with a1 (older
    // duplicate), a3 is fresh but has a sibling with a state row (cross-row dup).
    const now = Date.now();
    const freshIso = new Date(now - 1 * 3_600_000).toISOString();       // 1h ago
    const staleIso = new Date(now - 80 * 3_600_000).toISOString();      // 80h ago (> 72h)
    const dupIso = new Date(now - 2 * 3_600_000).toISOString();         // 2h ago (older dup of a1)

    // a1 = newest, unique email; a3 = unique email with sibling already enrolled;
    // a2 = same email as a1 (older, should be in-sweep deduped).
    const rows = [
      lead("a1", { email: "fresh@example.com", created_at: freshIso }),
      lead("a2", { email: "fresh@example.com", created_at: dupIso }),   // duplicate of a1
      lead("a3", { email: "stale@example.com", created_at: staleIso }), // stale
    ];

    stubSelects(rows);

    const res = await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    const body = (await res.json()) as {
      dryRun: boolean;
      wouldEnrol: number;
      skippedDuplicate: number;
      skippedStale: number;
    };

    expect(body.dryRun).toBe(true);
    // a1 would enrol; a2 deduped; a3 stale
    expect(body.wouldEnrol).toBe(1);
    expect(body.skippedDuplicate).toBe(1);
    expect(body.skippedStale).toBe(1);
  });
});

// ── 6. Same-email dedupe: in-sweep ────────────────────────────────────────────

describe("lead-reconcile in-sweep email dedupe", () => {
  it("when two un-enrolled candidates share an email, only the newest (first in desc order) enrols", async () => {
    const now = Date.now();
    const newerIso = new Date(now - 1 * 3_600_000).toISOString();
    const olderIso = new Date(now - 2 * 3_600_000).toISOString();

    // Scan is ordered created_at.desc, so newer comes first in the array.
    const rows = [
      lead("newer", { email: "dup@example.com", created_at: newerIso }),
      lead("older", { email: "dup@example.com", created_at: olderIso }),
    ];

    stubSelects(rows);

    const res = await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    const body = (await res.json()) as { skippedDuplicate: number };

    // Only "newer" should have been enrolled.
    expect(mockEnrollLead).toHaveBeenCalledTimes(1);
    const [calledLead] = mockEnrollLead.mock.calls[0] as [{ id: string }];
    expect(calledLead.id).toBe("newer");

    expect(body.skippedDuplicate).toBe(1);
  });

  it("email comparison is case-insensitive for the in-sweep set", async () => {
    const now = Date.now();
    const rows = [
      lead("a1", { email: "Mixed@Example.com", created_at: new Date(now - 1_000).toISOString() }),
      lead("a2", { email: "mixed@example.com", created_at: new Date(now - 2_000).toISOString() }),
    ];

    stubSelects(rows);

    await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    expect(mockEnrollLead).toHaveBeenCalledTimes(1);
    const [calledLead] = mockEnrollLead.mock.calls[0] as [{ id: string }];
    expect(calledLead.id).toBe("a1");
  });
});

// ── 7. Same-email dedupe: cross-row sibling with state row ────────────────────

describe("lead-reconcile cross-row sibling dedupe", () => {
  it("skips a candidate when a sibling lead (same email, different id) already has a state row", async () => {
    const rows = [lead("candidate-1", { email: "shared@example.com" })];

    // Sibling lead: different id, same email, already enrolled (state row exists).
    const siblingLead = { id: "sibling-already-enrolled", email: "shared@example.com" };
    const siblingStateId = "sibling-already-enrolled";

    stubSelects(rows, [], [siblingLead], [siblingStateId]);

    const res = await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    const body = (await res.json()) as { skippedDuplicate: number; enrolled: number };

    expect(mockEnrollLead).not.toHaveBeenCalled();
    expect(body.skippedDuplicate).toBe(1);
    expect(body.enrolled).toBe(0);
  });

  it("does NOT skip a candidate when the sibling lead exists but has no state row", async () => {
    const rows = [lead("candidate-2", { email: "nostate@example.com" })];

    // Sibling lead exists but has no state row (siblingStateIds is empty).
    const siblingLead = { id: "sibling-no-state", email: "nostate@example.com" };

    stubSelects(rows, [], [siblingLead], []);

    await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));

    // Should enrol the candidate because the sibling has no state row.
    expect(mockEnrollLead).toHaveBeenCalledTimes(1);
    const [calledLead] = mockEnrollLead.mock.calls[0] as [{ id: string }];
    expect(calledLead.id).toBe("candidate-2");
  });
});

// ── 8. Age guard ──────────────────────────────────────────────────────────────

describe("lead-reconcile age guard (72h)", () => {
  it("does NOT enrol a candidate older than 72h; counts it as skippedStale", async () => {
    const staleIso = new Date(Date.now() - 80 * 3_600_000).toISOString(); // 80h ago
    stubSelects([lead("stale-1", { created_at: staleIso })]);

    const res = await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    const body = (await res.json()) as { skippedStale: number; enrolled: number };

    expect(mockEnrollLead).not.toHaveBeenCalled();
    expect(body.skippedStale).toBe(1);
    expect(body.enrolled).toBe(0);
  });

  it("enrols a candidate that is less than 72h old", async () => {
    const freshIso = new Date(Date.now() - 24 * 3_600_000).toISOString(); // 24h ago
    stubSelects([lead("fresh-1", { created_at: freshIso })]);

    await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    expect(mockEnrollLead).toHaveBeenCalledTimes(1);
    const [calledLead] = mockEnrollLead.mock.calls[0] as [{ id: string }];
    expect(calledLead.id).toBe("fresh-1");
  });

  it("includes stale lead ids in the ALERT payload", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    // Three stale leads to trigger the ALERT threshold.
    const staleIso = new Date(Date.now() - 80 * 3_600_000).toISOString();
    const rows = [
      lead("s1", { created_at: staleIso }),
      lead("s2", { created_at: staleIso }),
      lead("s3", { created_at: staleIso }),
    ];
    stubSelects(rows);

    await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));

    // All three are missing (no state rows) so ALERT fires; their ids appear in
    // the staleIds list within the ALERT payload.
    expect(spy).toHaveBeenCalledWith(
      "[lead-reconcile] ALERT: N leads were un-enrolled",
      expect.objectContaining({ staleIds: expect.arrayContaining(["s1", "s2", "s3"]) }),
    );

    spy.mockRestore();
  });
});

// ── 9. Summary and response include new fields ─────────────────────────────────

describe("lead-reconcile summary fields", () => {
  it("response JSON includes skippedDuplicate and skippedStale", async () => {
    stubSelects([lead("a1")]);
    const res = await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    const body = (await res.json()) as Record<string, unknown>;
    expect("skippedDuplicate" in body).toBe(true);
    expect("skippedStale" in body).toBe(true);
  });

  it("skippedDuplicate is 0 and skippedStale is 0 when there are no duplicates or stale leads", async () => {
    stubSelects([lead("a1")]);
    const res = await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    const body = (await res.json()) as { skippedDuplicate: number; skippedStale: number };
    expect(body.skippedDuplicate).toBe(0);
    expect(body.skippedStale).toBe(0);
  });
});

// ── 10. Dry-run wouldEnrol reflects dedupe + age guard ─────────────────────────
// (Additional cases beyond the combined test in 5b above.)

describe("lead-reconcile dry-run wouldEnrol accuracy", () => {
  it("wouldEnrol is 0 when all candidates are duplicates", async () => {
    delete process.env.LEAD_RECONCILE_ENABLED;
    const now = Date.now();
    const rows = [
      lead("d1", { email: "dup@example.com", created_at: new Date(now - 1_000).toISOString() }),
      lead("d2", { email: "dup@example.com", created_at: new Date(now - 2_000).toISOString() }),
    ];
    stubSelects(rows);
    const res = await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    const body = (await res.json()) as { wouldEnrol: number; skippedDuplicate: number };
    expect(body.wouldEnrol).toBe(1); // d1 enrols, d2 deduped
    expect(body.skippedDuplicate).toBe(1);
  });

  it("wouldEnrol is 0 when the only candidate is stale", async () => {
    delete process.env.LEAD_RECONCILE_ENABLED;
    const staleIso = new Date(Date.now() - 100 * 3_600_000).toISOString();
    stubSelects([lead("old-1", { created_at: staleIso })]);
    const res = await GET(cronReq({ auth: `Bearer ${CRON_SECRET}` }));
    const body = (await res.json()) as { wouldEnrol: number; skippedStale: number };
    expect(body.wouldEnrol).toBe(0);
    expect(body.skippedStale).toBe(1);
  });
});

// ── 11-13. Retro-enrol endpoint (/api/leads/enroll) ───────────────────────────

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
