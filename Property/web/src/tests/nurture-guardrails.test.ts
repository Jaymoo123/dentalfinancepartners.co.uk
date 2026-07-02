/**
 * GATES-4: Guardrail and digest async-layer tests.
 *
 * Covers:
 *   1. getNurtureHealth -- snake_case view column -> NurtureHealth camelCase
 *      mapping (incl. opened24h/clicked24h); null on absent/empty view
 *   2. runNurtureGuardrails -- autopause wiring, alert dedup throttle, and
 *      the not-already-paused guard. Pure evaluateGuardrails matrix is NOT
 *      retested here (covered in nurture-health.test.ts).
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ── Module mocks (hoisted before imports) ─────────────────────────────────────

const mockAdminSelect = vi.fn();

vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: (...args: unknown[]) => mockAdminSelect(...args),
  adminInsert: vi.fn(() => Promise.resolve({ ok: true, status: 201, data: [] })),
  adminUpdate: vi.fn(() => Promise.resolve({ ok: true, status: 200, data: [] })),
  adminDelete: vi.fn(() => Promise.resolve({ ok: true, status: 200, data: [] })),
}));

// nurture-control is called inside runNurtureGuardrails; mock the whole module
// so tests can control the control-row state without a live DB.
const mockGetNurtureControl = vi.fn();
const mockPauseNurture = vi.fn();
const mockRecordGuardrailAlert = vi.fn();

vi.mock("@/lib/leads/nurture-control", () => ({
  getNurtureControl: (...args: unknown[]) => mockGetNurtureControl(...args),
  pauseNurture: (...args: unknown[]) => mockPauseNurture(...args),
  recordGuardrailAlert: (...args: unknown[]) => mockRecordGuardrailAlert(...args),
  isNurturePaused: vi.fn().mockResolvedValue(false),
  resumeNurture: vi.fn().mockResolvedValue(undefined),
  recordCronHeartbeat: vi.fn().mockResolvedValue(undefined),
  recordDigestHeartbeat: vi.fn().mockResolvedValue(undefined),
}));

const mockEmailSend = vi.fn().mockResolvedValue({ id: "resend-test-id" });

vi.mock("@/lib/resend", () => ({
  getResend: () => ({ emails: { send: mockEmailSend } }),
  getFromAddress: () => "Property Tax Partners <noreply@propertytaxpartners.co.uk>",
}));

vi.mock("@/lib/lead-routing", () => ({
  resolveLeadTo: () => "operator@test.com",
}));

// ── Imports (after mocks) ─────────────────────────────────────────────────────

import { getNurtureHealth, runNurtureGuardrails } from "@/lib/leads/nurture-health";

// ── Helpers ───────────────────────────────────────────────────────────────────

/** All-zero health view row (snake_case, matching the DB view). */
function makeHealthViewRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    site_key: "property",
    sends_24h: 0,
    sent_24h: 0,
    failed_24h: 0,
    skipped_24h: 0,
    sends_1h: 0,
    failed_1h: 0,
    skipped_1h: 0,
    complaints_24h: 0,
    complaints_7d: 0,
    bounces_24h: 0,
    bounces_7d: 0,
    optouts_7d: 0,
    replies_24h: 0,
    booked_24h: 0,
    active_leads: 0,
    stuck_leads: 0,
    contactable: 0,
    unreachable: 0,
    forwarded: 0,
    opened_24h: 0,
    clicked_24h: 0,
    opened_7d: 0,
    clicked_7d: 0,
    ...overrides,
  };
}

/** All-null / not-paused control row (camelCase, matching NurtureControl). */
function makeDefaultControl() {
  return {
    paused: false,
    pausedReason: null as string | null,
    pausedAt: null as string | null,
    pausedBy: null as string | null,
    lastAlertAt: null as string | null,
    lastAlertKey: null as string | null,
    lastCronRunAt: null as string | null,
    lastDigestRunAt: null as string | null,
  };
}

// ── 1. getNurtureHealth ───────────────────────────────────────────────────────

describe("getNurtureHealth: fail-open", () => {
  beforeEach(() => {
    mockAdminSelect.mockReset();
  });

  it("returns null when adminSelect returns ok:false", async () => {
    mockAdminSelect.mockResolvedValueOnce({ ok: false, status: 500, data: [] });
    await expect(getNurtureHealth("property")).resolves.toBeNull();
  });

  it("returns null when adminSelect returns ok:true with empty data", async () => {
    mockAdminSelect.mockResolvedValueOnce({ ok: true, status: 200, data: [] });
    await expect(getNurtureHealth("property")).resolves.toBeNull();
  });

  it("returns null when adminSelect throws", async () => {
    mockAdminSelect.mockRejectedValueOnce(new Error("view does not exist"));
    await expect(getNurtureHealth("property")).resolves.toBeNull();
  });
});

describe("getNurtureHealth: column mapping", () => {
  beforeEach(() => {
    mockAdminSelect.mockReset();
  });

  it("maps all snake_case view columns to NurtureHealth camelCase fields", async () => {
    const row = makeHealthViewRow({
      site_key: "property",
      sends_24h: 10,
      sent_24h: 8,
      failed_24h: 2,
      skipped_24h: 1,
      sends_1h: 3,
      failed_1h: 1,
      skipped_1h: 0,
      complaints_24h: 1,
      complaints_7d: 2,
      bounces_24h: 0,
      bounces_7d: 1,
      optouts_7d: 2,
      replies_24h: 1,
      booked_24h: 0,
      active_leads: 5,
      stuck_leads: 1,
      contactable: 4,
      unreachable: 1,
      forwarded: 3,
      opened_24h: 4,
      clicked_24h: 2,
      opened_7d: 7,
      clicked_7d: 3,
    });
    mockAdminSelect.mockResolvedValueOnce({ ok: true, status: 200, data: [row] });
    const h = await getNurtureHealth("property");
    expect(h).not.toBeNull();
    expect(h!.siteKey).toBe("property");
    expect(h!.sends24h).toBe(10);
    expect(h!.sent24h).toBe(8);
    expect(h!.failed24h).toBe(2);
    expect(h!.skipped24h).toBe(1);
    expect(h!.sends1h).toBe(3);
    expect(h!.failed1h).toBe(1);
    expect(h!.skipped1h).toBe(0);
    expect(h!.complaints24h).toBe(1);
    expect(h!.complaints7d).toBe(2);
    expect(h!.bounces24h).toBe(0);
    expect(h!.bounces7d).toBe(1);
    expect(h!.optouts7d).toBe(2);
    expect(h!.replies24h).toBe(1);
    expect(h!.booked24h).toBe(0);
    expect(h!.activeLeads).toBe(5);
    expect(h!.stuckLeads).toBe(1);
    expect(h!.contactable).toBe(4);
    expect(h!.unreachable).toBe(1);
    expect(h!.forwarded).toBe(3);
    // Spec explicitly calls out opened24h / clicked24h
    expect(h!.opened24h).toBe(4);
    expect(h!.clicked24h).toBe(2);
    expect(h!.opened7d).toBe(7);
    expect(h!.clicked7d).toBe(3);
  });

  it("coerces null column values to 0 (numeric default)", async () => {
    // All numeric columns are null; site_key present
    const row = {
      site_key: "property",
      sends_24h: null,
      sent_24h: null,
      failed_24h: null,
      skipped_24h: null,
      sends_1h: null,
      failed_1h: null,
      skipped_1h: null,
      complaints_24h: null,
      complaints_7d: null,
      bounces_24h: null,
      bounces_7d: null,
      optouts_7d: null,
      replies_24h: null,
      booked_24h: null,
      active_leads: null,
      stuck_leads: null,
      contactable: null,
      unreachable: null,
      forwarded: null,
      opened_24h: null,
      clicked_24h: null,
      opened_7d: null,
      clicked_7d: null,
    };
    mockAdminSelect.mockResolvedValueOnce({ ok: true, status: 200, data: [row] });
    const h = await getNurtureHealth("property");
    expect(h).not.toBeNull();
    expect(h!.complaints24h).toBe(0);
    expect(h!.opened24h).toBe(0);
    expect(h!.clicked24h).toBe(0);
    expect(h!.stuckLeads).toBe(0);
  });
});

// ── 2. runNurtureGuardrails ───────────────────────────────────────────────────

describe("runNurtureGuardrails: null health (no-op)", () => {
  beforeEach(() => {
    mockAdminSelect.mockReset();
    mockGetNurtureControl.mockReset();
    mockPauseNurture.mockReset();
    mockRecordGuardrailAlert.mockReset();
    mockEmailSend.mockReset();
  });

  it("returns empty verdict with alerted=false, paused=false when health view is absent", async () => {
    mockAdminSelect.mockResolvedValueOnce({ ok: true, status: 200, data: [] });
    const result = await runNurtureGuardrails({ autopauseEnabled: true });
    expect(result.verdict.breaches).toHaveLength(0);
    expect(result.verdict.shouldPause).toBe(false);
    expect(result.alerted).toBe(false);
    expect(result.paused).toBe(false);
    expect(mockPauseNurture).not.toHaveBeenCalled();
    expect(mockEmailSend).not.toHaveBeenCalled();
  });

  it("returns no-op when health has no breaches", async () => {
    // All-zero health: no thresholds breached
    mockAdminSelect.mockResolvedValueOnce({
      ok: true,
      status: 200,
      data: [makeHealthViewRow()],
    });
    const result = await runNurtureGuardrails({ autopauseEnabled: true });
    expect(result.verdict.breaches).toHaveLength(0);
    expect(result.alerted).toBe(false);
    expect(result.paused).toBe(false);
    expect(mockGetNurtureControl).not.toHaveBeenCalled();
    expect(mockPauseNurture).not.toHaveBeenCalled();
  });
});

describe("runNurtureGuardrails: autopause wiring", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV, RESEND_API_KEY: "test-resend-key" };
    mockAdminSelect.mockReset();
    mockGetNurtureControl.mockReset();
    mockPauseNurture.mockReset().mockResolvedValue(undefined);
    mockRecordGuardrailAlert.mockReset().mockResolvedValue(undefined);
    mockEmailSend.mockReset().mockResolvedValue({ id: "email-ok" });
    // Health with 2 complaints in 24h: triggers the complaints_24h PAUSE rule
    mockAdminSelect.mockResolvedValue({
      ok: true,
      status: 200,
      data: [makeHealthViewRow({ complaints_24h: 2 })],
    });
    // Default: not paused, no recent alert
    mockGetNurtureControl.mockResolvedValue(makeDefaultControl());
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it("calls pauseNurture when autopauseEnabled=true, breach is PAUSE-severity, and not already paused", async () => {
    const result = await runNurtureGuardrails({ autopauseEnabled: true });
    expect(result.verdict.shouldPause).toBe(true);
    expect(result.paused).toBe(true);
    expect(mockPauseNurture).toHaveBeenCalledTimes(1);
    // second arg is "auto" (automated pause)
    const [, by] = mockPauseNurture.mock.calls[0] as [string, string];
    expect(by).toBe("auto");
  });

  it("sends an alert email and records the alert key when breach is detected", async () => {
    await runNurtureGuardrails({ autopauseEnabled: true });
    expect(mockEmailSend).toHaveBeenCalledTimes(1);
    expect(mockRecordGuardrailAlert).toHaveBeenCalledTimes(1);
    const [key] = mockRecordGuardrailAlert.mock.calls[0] as [string];
    expect(key).toBe("complaints_24h");
  });

  it("does NOT call pauseNurture when autopauseEnabled=false, even on PAUSE-severity breach", async () => {
    const result = await runNurtureGuardrails({ autopauseEnabled: false });
    expect(result.verdict.shouldPause).toBe(true);
    expect(result.paused).toBe(false);
    expect(mockPauseNurture).not.toHaveBeenCalled();
  });

  it("still sends an alert when autopauseEnabled=false (alert is independent of pause)", async () => {
    const result = await runNurtureGuardrails({ autopauseEnabled: false });
    expect(result.alerted).toBe(true);
    expect(mockEmailSend).toHaveBeenCalledTimes(1);
    expect(mockRecordGuardrailAlert).toHaveBeenCalledTimes(1);
  });

  it("does NOT call pauseNurture when system is already paused (guard prevents double-pause)", async () => {
    // System is already paused; lastAlertKey unset so alert would still fire
    mockGetNurtureControl.mockResolvedValueOnce({
      ...makeDefaultControl(),
      paused: true,
    });
    const result = await runNurtureGuardrails({ autopauseEnabled: true });
    expect(result.paused).toBe(false);
    expect(mockPauseNurture).not.toHaveBeenCalled();
    // Alert still fires (paused state does not suppress the email)
    expect(result.alerted).toBe(true);
  });
});

describe("runNurtureGuardrails: alert throttle", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV, RESEND_API_KEY: "test-resend-key" };
    mockAdminSelect.mockReset();
    mockGetNurtureControl.mockReset();
    mockPauseNurture.mockReset().mockResolvedValue(undefined);
    mockRecordGuardrailAlert.mockReset().mockResolvedValue(undefined);
    mockEmailSend.mockReset().mockResolvedValue({ id: "email-ok" });
    // complaints_24h=2 -> breach key = "complaints_24h"
    mockAdminSelect.mockResolvedValue({
      ok: true,
      status: 200,
      data: [makeHealthViewRow({ complaints_24h: 2 })],
    });
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it("does not re-send alert email when the same breach key was alerted within 24 hours", async () => {
    // Control shows this exact key was alerted 1 hour ago (well within 24h window)
    mockGetNurtureControl.mockResolvedValueOnce({
      ...makeDefaultControl(),
      lastAlertKey: "complaints_24h",
      lastAlertAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    });
    const result = await runNurtureGuardrails({ autopauseEnabled: false });
    expect(result.alerted).toBe(false);
    expect(mockEmailSend).not.toHaveBeenCalled();
    expect(mockRecordGuardrailAlert).not.toHaveBeenCalled();
  });

  it("does re-send alert when the same breach key was alerted MORE than 24 hours ago", async () => {
    // lastAlertAt is 25 hours ago -- outside the 24h dedup window
    mockGetNurtureControl.mockResolvedValueOnce({
      ...makeDefaultControl(),
      lastAlertKey: "complaints_24h",
      lastAlertAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
    });
    const result = await runNurtureGuardrails({ autopauseEnabled: false });
    expect(result.alerted).toBe(true);
    expect(mockEmailSend).toHaveBeenCalledTimes(1);
    expect(mockRecordGuardrailAlert).toHaveBeenCalledTimes(1);
  });

  it("does re-send alert when lastAlertKey differs (different breach rule active)", async () => {
    // Different key stored in control: the current breach key is "complaints_24h"
    // but the stored key is "stuck_leads" -> not the same -> alert fires
    mockGetNurtureControl.mockResolvedValueOnce({
      ...makeDefaultControl(),
      lastAlertKey: "stuck_leads",
      lastAlertAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    });
    const result = await runNurtureGuardrails({ autopauseEnabled: false });
    expect(result.alerted).toBe(true);
    expect(mockEmailSend).toHaveBeenCalledTimes(1);
  });
});
