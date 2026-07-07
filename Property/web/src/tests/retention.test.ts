/**
 * Unit tests for retentionCutoffIso (pure date arithmetic) and
 * runLeadRetentionPurge extras scrub (mocked admin layer).
 *
 * All date assertions use getUTC* methods so results are timezone-independent
 * and deterministic in any Node.js locale.
 *
 * Epoch fixtures: noon UTC on the target date to stay clear of day-boundary
 * differences between UTC and BST (where noon UTC is 13:00 local, still the
 * same calendar day).
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { retentionCutoffIso, runLeadRetentionPurge } from "@/lib/leads/retention";

// ---------------------------------------------------------------------------
// Module mocks (hoisted by vitest before imports are evaluated)
// ---------------------------------------------------------------------------

const mockAdminSelectRet = vi.fn();
const mockAdminUpdateRet = vi.fn();

vi.mock("@/lib/supabase/admin", () => ({
  adminSelect: (...args: unknown[]) => mockAdminSelectRet(...args),
  adminUpdate: (...args: unknown[]) => mockAdminUpdateRet(...args),
}));

vi.mock("@/config/site", () => ({
  siteConfig: { company: { enquiryRetentionMonths: 3 } },
}));

// ---------------------------------------------------------------------------
// Epoch fixtures (noon UTC on each date to avoid timezone day-boundary drift)
// ---------------------------------------------------------------------------

const APR15_2026_NOON_UTC = Date.UTC(2026, 3, 15, 12, 0, 0); // 2026-04-15T12:00:00.000Z
const JAN15_2026_NOON_UTC = Date.UTC(2026, 0, 15, 12, 0, 0); // 2026-01-15T12:00:00.000Z
const OCT15_2026_NOON_UTC = Date.UTC(2026, 9, 15, 12, 0, 0); // 2026-10-15T12:00:00.000Z
const MAR31_2026_NOON_UTC = Date.UTC(2026, 2, 31, 12, 0, 0); // 2026-03-31T12:00:00.000Z

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("retentionCutoffIso", () => {
  it("returns a valid ISO 8601 string parseable by Date", () => {
    const result = retentionCutoffIso(APR15_2026_NOON_UTC, 3);
    // toISOString on the re-parsed date must equal the original string
    expect(new Date(result).toISOString()).toBe(result);
  });

  it("subtracts 3 calendar months (April 2026 -> January 2026)", () => {
    const result = retentionCutoffIso(APR15_2026_NOON_UTC, 3);
    const d = new Date(result);
    expect(d.getUTCFullYear()).toBe(2026);
    expect(d.getUTCMonth()).toBe(0); // January (0-indexed)
    expect(d.getUTCDate()).toBe(15);
  });

  it("rolls over the year boundary (January 2026 minus 1 month = December 2025)", () => {
    const result = retentionCutoffIso(JAN15_2026_NOON_UTC, 1);
    const d = new Date(result);
    expect(d.getUTCFullYear()).toBe(2025);
    expect(d.getUTCMonth()).toBe(11); // December (0-indexed)
    expect(d.getUTCDate()).toBe(15);
  });

  it("handles month-end overflow: March 31 minus 1 month (February 31 does not exist)", () => {
    // JavaScript's setMonth(1) on day 31 overflows: 2026 February has 28 days,
    // so the 31st of February rolls forward to 3 March. The cutoff is therefore
    // before the input date, which is the key GDPR-correctness property.
    const result = retentionCutoffIso(MAR31_2026_NOON_UTC, 1);
    const d = new Date(result);
    // The cutoff must be strictly before the reference date.
    expect(d.getTime()).toBeLessThan(MAR31_2026_NOON_UTC);
    // The drift from JS overflow must not escape the same year.
    expect(d.getUTCFullYear()).toBe(2026);
  });

  it("subtracts 6 months (October 2026 -> April 2026)", () => {
    const result = retentionCutoffIso(OCT15_2026_NOON_UTC, 6);
    const d = new Date(result);
    expect(d.getUTCFullYear()).toBe(2026);
    expect(d.getUTCMonth()).toBe(3); // April (0-indexed)
    expect(d.getUTCDate()).toBe(15);
  });

  it("subtracts 12 months (April 2026 -> April 2025)", () => {
    const result = retentionCutoffIso(APR15_2026_NOON_UTC, 12);
    const d = new Date(result);
    expect(d.getUTCFullYear()).toBe(2025);
    expect(d.getUTCMonth()).toBe(3); // April (0-indexed)
    expect(d.getUTCDate()).toBe(15);
  });

  it("with 0 months the cutoff is exactly the same instant as nowMs", () => {
    const result = retentionCutoffIso(APR15_2026_NOON_UTC, 0);
    expect(new Date(result).getTime()).toBe(APR15_2026_NOON_UTC);
  });

  it("the returned cutoff is always earlier than or equal to nowMs", () => {
    // Holds for any positive month count, which is the core retention invariant.
    const fixtures = [
      { ms: APR15_2026_NOON_UTC, months: 3 },
      { ms: JAN15_2026_NOON_UTC, months: 1 },
      { ms: OCT15_2026_NOON_UTC, months: 6 },
      { ms: MAR31_2026_NOON_UTC, months: 1 },
    ];
    for (const { ms, months } of fixtures) {
      const cutoff = new Date(retentionCutoffIso(ms, months)).getTime();
      expect(cutoff).toBeLessThanOrEqual(ms);
    }
  });
});

// ---------------------------------------------------------------------------
// runLeadRetentionPurge extras scrub
// ---------------------------------------------------------------------------

const RET_LEAD_ID = "lead-ret-001";
const RET_NOW_MS = Date.UTC(2026, 6, 7, 12, 0, 0); // 2026-07-07T12:00:00.000Z
const RET_NOW_ISO = new Date(RET_NOW_MS).toISOString();

describe("runLeadRetentionPurge extras scrub", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAdminUpdateRet.mockResolvedValue({ ok: true, status: 200, data: [] });
  });

  it("stamps anonymised_at, removes role_detail, and preserves form_id and honeypot flags", async () => {
    mockAdminSelectRet.mockResolvedValue({
      ok: true,
      status: 200,
      data: [
        {
          id: RET_LEAD_ID,
          email: "jane@example.com",
          extras: {
            form_id: "exit_intent",
            role_detail: "Executor of an estate",
            honeypot: false,
          },
        },
      ],
    });

    await runLeadRetentionPurge({ dryRun: false, nowMs: RET_NOW_MS });

    const leadsCall = mockAdminUpdateRet.mock.calls.find(([table]) => table === "leads");
    expect(leadsCall).toBeDefined();
    const [,, patch] = leadsCall as [string, Record<string, string>, Record<string, unknown>];
    const extras = patch.extras as Record<string, unknown>;
    expect(extras.anonymised_at).toBe(RET_NOW_ISO);
    expect("role_detail" in extras).toBe(false);
    expect(extras.form_id).toBe("exit_intent");
    expect(extras.honeypot).toBe(false);
  });

  it("stamps anonymised_at and omits role_detail when extras is null", async () => {
    mockAdminSelectRet.mockResolvedValue({
      ok: true,
      status: 200,
      data: [{ id: RET_LEAD_ID, email: "jane@example.com", extras: null }],
    });

    await runLeadRetentionPurge({ dryRun: false, nowMs: RET_NOW_MS });

    const leadsCall = mockAdminUpdateRet.mock.calls.find(([table]) => table === "leads");
    expect(leadsCall).toBeDefined();
    const [,, patch] = leadsCall as [string, Record<string, string>, Record<string, unknown>];
    const extras = patch.extras as Record<string, unknown>;
    expect(extras.anonymised_at).toBe(RET_NOW_ISO);
    expect("role_detail" in extras).toBe(false);
  });

  it("returns dryRun:true and does not call adminUpdate when dryRun is set", async () => {
    mockAdminSelectRet.mockResolvedValue({
      ok: true,
      status: 200,
      data: [
        { id: RET_LEAD_ID, email: "jane@example.com", extras: { role_detail: "Executor" } },
      ],
    });

    const result = await runLeadRetentionPurge({ dryRun: true, nowMs: RET_NOW_MS });

    expect(result.dryRun).toBe(true);
    expect(result.candidates).toBe(1);
    expect(mockAdminUpdateRet).not.toHaveBeenCalled();
  });

  it("skips rows that already contain anonymised_at in extras", async () => {
    mockAdminSelectRet.mockResolvedValue({
      ok: true,
      status: 200,
      data: [
        {
          id: RET_LEAD_ID,
          email: "redacted@invalid",
          extras: { anonymised_at: "2026-04-01T00:00:00.000Z", role_detail: "old" },
        },
      ],
    });

    const result = await runLeadRetentionPurge({ dryRun: false, nowMs: RET_NOW_MS });

    expect(result.candidates).toBe(0);
    const leadsUpdates = mockAdminUpdateRet.mock.calls.filter(([table]) => table === "leads");
    expect(leadsUpdates).toHaveLength(0);
  });
});
