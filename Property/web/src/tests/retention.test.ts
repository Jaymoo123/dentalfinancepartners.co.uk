/**
 * Unit tests for retentionCutoffIso (pure date arithmetic).
 *
 * The database path (runLeadRetentionPurge) is not tested here as it requires
 * a live Supabase admin client. All assertions use getUTC* methods so the
 * results are timezone-independent and deterministic in any Node.js locale.
 *
 * Epoch fixtures: noon UTC on the target date to stay clear of day-boundary
 * differences between UTC and BST (where noon UTC is 13:00 local, still the
 * same calendar day).
 */

import { describe, it, expect } from "vitest";
import { retentionCutoffIso } from "@/lib/leads/retention";

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
