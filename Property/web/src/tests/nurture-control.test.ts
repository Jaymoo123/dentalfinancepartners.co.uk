/**
 * GATES-3: Kill-switch, cron-auth, and heartbeat tests.
 *
 * Covers:
 *   1. getNurtureControl / isNurturePaused -- fail-open on not-ok / empty / throw
 *   2. getNurtureControl -- maps DB row to camelCase NurtureControl type
 *   3. pauseNurture / resumeNurture / recordGuardrailAlert /
 *      recordCronHeartbeat / recordDigestHeartbeat -- correct upsert payloads
 *      and silent failure on write error or throw
 *   4. Cron route auth -- 401 without / with wrong secret; 200 with correct
 *      bearer; heartbeat written on every authorised tick
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ── Module mocks (hoisted before imports) ─────────────────────────────────────

const mockAdminSelect = vi.fn();
const mockAdminInsert = vi.fn();

vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: (...args: unknown[]) => mockAdminSelect(...args),
  adminInsert: (...args: unknown[]) => mockAdminInsert(...args),
  adminUpdate: vi.fn(() => Promise.resolve({ ok: true, status: 200, data: [] })),
  adminDelete: vi.fn(() => Promise.resolve({ ok: true, status: 200, data: [] })),
}));

// Cron route dependency mocks
const mockRunLeadNurtureCron = vi.fn();
vi.mock("@accounting-network/web-shared/lead-nurture/cron", () => ({
  runLeadNurtureCron: (...args: unknown[]) => mockRunLeadNurtureCron(...args),
}));

vi.mock("@/config/lead-nurture", () => ({
  buildPropertyLeadNurtureConfig: () => ({ steps: [] }),
  buildLeadMessageContext: vi.fn(() => ({})),
}));

const mockLeadNurtureArmed = vi.fn(() => false);
vi.mock("@/lib/leads/channels", () => ({
  buildLeadChannelSender: vi.fn(() => ({})),
  leadNurtureArmed: () => mockLeadNurtureArmed(),
}));

vi.mock("@/lib/leads/aux-cron", () => ({
  runLeadAuxScans: vi.fn().mockResolvedValue({ reminders: 0, nudges: 0 }),
}));

vi.mock("@/lib/leads/nurture-health", () => ({
  runNurtureGuardrails: vi.fn().mockResolvedValue({
    verdict: { breaches: [], shouldPause: false, pauseReason: null },
    alerted: false,
    paused: false,
  }),
}));

// ── Imports (after mocks) ─────────────────────────────────────────────────────

import { NextRequest } from "next/server";
import {
  getNurtureControl,
  isNurturePaused,
  pauseNurture,
  resumeNurture,
  recordGuardrailAlert,
  recordCronHeartbeat,
  recordDigestHeartbeat,
} from "@/lib/leads/nurture-control";
import { GET, POST } from "@/app/api/cron/lead-nurture/route";

// ── Helpers ───────────────────────────────────────────────────────────────────

const FULL_DB_ROW = {
  paused: true,
  paused_reason: "test pause reason",
  paused_at: "2026-07-01T10:00:00.000Z",
  paused_by: "operator@test.com",
  last_alert_at: "2026-07-01T09:00:00.000Z",
  last_alert_key: "complaints_24h",
  last_cron_run_at: "2026-07-01T08:00:00.000Z",
  last_digest_run_at: "2026-07-01T07:00:00.000Z",
};

// ── 1. getNurtureControl: fail-open ───────────────────────────────────────────

describe("getNurtureControl: fail-open", () => {
  beforeEach(() => {
    mockAdminSelect.mockReset();
  });

  it("returns DEFAULT_CONTROL (paused=false, all nulls) when adminSelect returns ok:false", async () => {
    mockAdminSelect.mockResolvedValueOnce({ ok: false, status: 500, data: [] });
    const ctrl = await getNurtureControl();
    expect(ctrl.paused).toBe(false);
    expect(ctrl.pausedReason).toBeNull();
    expect(ctrl.pausedAt).toBeNull();
    expect(ctrl.pausedBy).toBeNull();
    expect(ctrl.lastAlertAt).toBeNull();
    expect(ctrl.lastAlertKey).toBeNull();
    expect(ctrl.lastCronRunAt).toBeNull();
    expect(ctrl.lastDigestRunAt).toBeNull();
  });

  it("returns DEFAULT_CONTROL when adminSelect returns ok:true with empty data", async () => {
    mockAdminSelect.mockResolvedValueOnce({ ok: true, status: 200, data: [] });
    const ctrl = await getNurtureControl();
    expect(ctrl.paused).toBe(false);
    expect(ctrl.lastCronRunAt).toBeNull();
  });

  it("returns DEFAULT_CONTROL and does not throw when adminSelect throws", async () => {
    mockAdminSelect.mockRejectedValueOnce(new Error("DB connection refused"));
    await expect(getNurtureControl()).resolves.toMatchObject({ paused: false });
  });
});

// ── 2. getNurtureControl: row mapping ─────────────────────────────────────────

describe("getNurtureControl: row mapping", () => {
  beforeEach(() => {
    mockAdminSelect.mockReset();
  });

  it("maps all snake_case DB fields to camelCase NurtureControl", async () => {
    mockAdminSelect.mockResolvedValueOnce({ ok: true, status: 200, data: [FULL_DB_ROW] });
    const ctrl = await getNurtureControl();
    expect(ctrl.paused).toBe(true);
    expect(ctrl.pausedReason).toBe("test pause reason");
    expect(ctrl.pausedAt).toBe("2026-07-01T10:00:00.000Z");
    expect(ctrl.pausedBy).toBe("operator@test.com");
    expect(ctrl.lastAlertAt).toBe("2026-07-01T09:00:00.000Z");
    expect(ctrl.lastAlertKey).toBe("complaints_24h");
    expect(ctrl.lastCronRunAt).toBe("2026-07-01T08:00:00.000Z");
    expect(ctrl.lastDigestRunAt).toBe("2026-07-01T07:00:00.000Z");
  });

  it("maps paused=false row with null pause fields correctly", async () => {
    mockAdminSelect.mockResolvedValueOnce({
      ok: true,
      status: 200,
      data: [
        {
          ...FULL_DB_ROW,
          paused: false,
          paused_reason: null,
          paused_at: null,
          paused_by: null,
        },
      ],
    });
    const ctrl = await getNurtureControl();
    expect(ctrl.paused).toBe(false);
    expect(ctrl.pausedReason).toBeNull();
    expect(ctrl.pausedAt).toBeNull();
    // lastCronRunAt and lastDigestRunAt still mapped from non-null columns
    expect(ctrl.lastCronRunAt).toBe("2026-07-01T08:00:00.000Z");
    expect(ctrl.lastDigestRunAt).toBe("2026-07-01T07:00:00.000Z");
  });
});

// ── 3. isNurturePaused ────────────────────────────────────────────────────────

describe("isNurturePaused", () => {
  beforeEach(() => {
    mockAdminSelect.mockReset();
  });

  it("returns false when adminSelect errors (fail-open)", async () => {
    mockAdminSelect.mockRejectedValueOnce(new Error("network timeout"));
    await expect(isNurturePaused()).resolves.toBe(false);
  });

  it("returns false when the control row has paused=false", async () => {
    mockAdminSelect.mockResolvedValueOnce({
      ok: true,
      status: 200,
      data: [{ ...FULL_DB_ROW, paused: false }],
    });
    await expect(isNurturePaused()).resolves.toBe(false);
  });

  it("returns true when the control row has paused=true", async () => {
    mockAdminSelect.mockResolvedValueOnce({
      ok: true,
      status: 200,
      data: [{ ...FULL_DB_ROW, paused: true }],
    });
    await expect(isNurturePaused()).resolves.toBe(true);
  });
});

// ── 4. pauseNurture ───────────────────────────────────────────────────────────

describe("pauseNurture", () => {
  beforeEach(() => {
    mockAdminInsert.mockReset();
  });

  it("upserts id=1 with paused=true, reason, by, timestamps", async () => {
    mockAdminInsert.mockResolvedValueOnce({ ok: true, status: 201, data: [] });
    await pauseNurture("spam complaints", "auto");
    expect(mockAdminInsert).toHaveBeenCalledTimes(1);
    const call = mockAdminInsert.mock.calls[0];
    const table = call[0] as string;
    const payload = call[1] as Record<string, unknown>;
    const opts = call[2];
    expect(table).toBe("lead_nurture_control");
    expect(payload.id).toBe(1);
    expect(payload.paused).toBe(true);
    expect(payload.paused_reason).toBe("spam complaints");
    expect(payload.paused_by).toBe("auto");
    expect(typeof payload.paused_at).toBe("string");
    expect(typeof payload.updated_at).toBe("string");
    expect(opts).toMatchObject({ onConflict: "id" });
  });

  it("does not throw when adminInsert returns ok:false", async () => {
    mockAdminInsert.mockResolvedValueOnce({ ok: false, status: 500, data: [] });
    await expect(pauseNurture("reason", "operator")).resolves.toBeUndefined();
  });

  it("does not throw when adminInsert throws", async () => {
    mockAdminInsert.mockRejectedValueOnce(new Error("DB write failed"));
    await expect(pauseNurture("reason", "operator")).resolves.toBeUndefined();
  });
});

// ── 5. resumeNurture ──────────────────────────────────────────────────────────

describe("resumeNurture", () => {
  beforeEach(() => {
    mockAdminInsert.mockReset();
  });

  it("upserts id=1 with paused=false, clears pause_reason and paused_at, records paused_by", async () => {
    mockAdminInsert.mockResolvedValueOnce({ ok: true, status: 201, data: [] });
    await resumeNurture("djh@example.com");
    const call = mockAdminInsert.mock.calls[0];
    const table = call[0] as string;
    const payload = call[1] as Record<string, unknown>;
    expect(table).toBe("lead_nurture_control");
    expect(payload.id).toBe(1);
    expect(payload.paused).toBe(false);
    expect(payload.paused_reason).toBeNull();
    expect(payload.paused_at).toBeNull();
    expect(payload.paused_by).toBe("djh@example.com");
    expect(typeof payload.updated_at).toBe("string");
  });

  it("does not throw when adminInsert returns ok:false", async () => {
    mockAdminInsert.mockResolvedValueOnce({ ok: false, status: 503, data: [] });
    await expect(resumeNurture("operator")).resolves.toBeUndefined();
  });

  it("does not throw when adminInsert throws", async () => {
    mockAdminInsert.mockRejectedValueOnce(new Error("timeout"));
    await expect(resumeNurture("operator")).resolves.toBeUndefined();
  });
});

// ── 6. recordGuardrailAlert ───────────────────────────────────────────────────

describe("recordGuardrailAlert", () => {
  beforeEach(() => {
    mockAdminInsert.mockReset();
  });

  it("upserts id=1 with last_alert_key and last_alert_at", async () => {
    mockAdminInsert.mockResolvedValueOnce({ ok: true, status: 201, data: [] });
    await recordGuardrailAlert("complaints_24h");
    const call = mockAdminInsert.mock.calls[0];
    const table = call[0] as string;
    const payload = call[1] as Record<string, unknown>;
    expect(table).toBe("lead_nurture_control");
    expect(payload.id).toBe(1);
    expect(payload.last_alert_key).toBe("complaints_24h");
    expect(typeof payload.last_alert_at).toBe("string");
    expect(typeof payload.updated_at).toBe("string");
  });

  it("does not throw when adminInsert returns ok:false", async () => {
    mockAdminInsert.mockResolvedValueOnce({ ok: false, status: 500, data: [] });
    await expect(recordGuardrailAlert("stuck_leads")).resolves.toBeUndefined();
  });

  it("does not throw when adminInsert throws", async () => {
    mockAdminInsert.mockRejectedValueOnce(new Error("table missing"));
    await expect(recordGuardrailAlert("stuck_leads")).resolves.toBeUndefined();
  });
});

// ── 7. recordCronHeartbeat ────────────────────────────────────────────────────

describe("recordCronHeartbeat", () => {
  beforeEach(() => {
    mockAdminInsert.mockReset();
  });

  it("upserts id=1 with last_cron_run_at and updated_at (not last_digest_run_at)", async () => {
    mockAdminInsert.mockResolvedValueOnce({ ok: true, status: 201, data: [] });
    await recordCronHeartbeat();
    const call = mockAdminInsert.mock.calls[0];
    const table = call[0] as string;
    const payload = call[1] as Record<string, unknown>;
    expect(table).toBe("lead_nurture_control");
    expect(payload.id).toBe(1);
    expect(typeof payload.last_cron_run_at).toBe("string");
    expect(typeof payload.updated_at).toBe("string");
    expect("last_digest_run_at" in payload).toBe(false);
  });

  it("does not throw when adminInsert returns ok:false", async () => {
    mockAdminInsert.mockResolvedValueOnce({ ok: false, status: 500, data: [] });
    await expect(recordCronHeartbeat()).resolves.toBeUndefined();
  });

  it("does not throw when adminInsert throws", async () => {
    mockAdminInsert.mockRejectedValueOnce(new Error("connection reset"));
    await expect(recordCronHeartbeat()).resolves.toBeUndefined();
  });
});

// ── 8. recordDigestHeartbeat ──────────────────────────────────────────────────

describe("recordDigestHeartbeat", () => {
  beforeEach(() => {
    mockAdminInsert.mockReset();
  });

  it("upserts id=1 with last_digest_run_at and updated_at (not last_cron_run_at)", async () => {
    mockAdminInsert.mockResolvedValueOnce({ ok: true, status: 201, data: [] });
    await recordDigestHeartbeat();
    const call = mockAdminInsert.mock.calls[0];
    const table = call[0] as string;
    const payload = call[1] as Record<string, unknown>;
    expect(table).toBe("lead_nurture_control");
    expect(payload.id).toBe(1);
    expect(typeof payload.last_digest_run_at).toBe("string");
    expect(typeof payload.updated_at).toBe("string");
    expect("last_cron_run_at" in payload).toBe(false);
  });

  it("does not throw when adminInsert returns ok:false", async () => {
    mockAdminInsert.mockResolvedValueOnce({ ok: false, status: 500, data: [] });
    await expect(recordDigestHeartbeat()).resolves.toBeUndefined();
  });

  it("does not throw when adminInsert throws", async () => {
    mockAdminInsert.mockRejectedValueOnce(new Error("network error"));
    await expect(recordDigestHeartbeat()).resolves.toBeUndefined();
  });
});

// ── 9. Cron route GET/POST auth ───────────────────────────────────────────────

describe("Cron route GET/POST auth", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV };
    mockAdminSelect.mockReset();
    mockAdminInsert.mockReset();
    // isNurturePaused reads the control table via the real getNurtureControl fn
    mockAdminSelect.mockResolvedValue({ ok: true, status: 200, data: [] });
    // recordCronHeartbeat writes via the real fn
    mockAdminInsert.mockResolvedValue({ ok: true, status: 201, data: [] });
    // runLeadNurtureCron returns a minimal result object
    mockRunLeadNurtureCron.mockResolvedValue({ processed: 0 });
    mockLeadNurtureArmed.mockReturnValue(false);
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it("GET returns 401 when CRON_SECRET is not set", async () => {
    delete process.env.CRON_SECRET;
    const req = new NextRequest("http://localhost/api/cron/lead-nurture");
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("GET returns 401 when Authorization bearer is wrong", async () => {
    process.env.CRON_SECRET = "the-real-secret";
    const req = new NextRequest("http://localhost/api/cron/lead-nurture", {
      headers: new Headers({ Authorization: "Bearer wrong-secret" }),
    });
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("GET returns 401 when Authorization header is absent", async () => {
    process.env.CRON_SECRET = "the-real-secret";
    const req = new NextRequest("http://localhost/api/cron/lead-nurture");
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("GET returns 200 with correct bearer token", async () => {
    process.env.CRON_SECRET = "the-real-secret";
    const req = new NextRequest("http://localhost/api/cron/lead-nurture", {
      headers: new Headers({ Authorization: "Bearer the-real-secret" }),
    });
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { ok: boolean };
    expect(body.ok).toBe(true);
  });

  it("POST also accepts the correct bearer token and returns 200", async () => {
    process.env.CRON_SECRET = "post-secret";
    const req = new NextRequest("http://localhost/api/cron/lead-nurture", {
      method: "POST",
      headers: new Headers({ Authorization: "Bearer post-secret" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  it("writes cron heartbeat (adminInsert with last_cron_run_at) on authorised tick even when not armed", async () => {
    process.env.CRON_SECRET = "heartbeat-test-secret";
    mockLeadNurtureArmed.mockReturnValue(false);
    const req = new NextRequest("http://localhost/api/cron/lead-nurture", {
      headers: new Headers({ Authorization: "Bearer heartbeat-test-secret" }),
    });
    await GET(req);
    // recordCronHeartbeat (real fn) calls adminInsert with last_cron_run_at
    const insertCalls = mockAdminInsert.mock.calls as Array<
      [string, Record<string, unknown>, unknown]
    >;
    const heartbeatCall = insertCalls.find(([, payload]) => "last_cron_run_at" in payload);
    expect(heartbeatCall).toBeDefined();
    expect(heartbeatCall![1].id).toBe(1);
    expect(typeof heartbeatCall![1].last_cron_run_at).toBe("string");
  });
});
