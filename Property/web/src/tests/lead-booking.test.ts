/**
 * Native booking flow tests: slot validation, the day generator the picker
 * renders, the human slot label DJH sees, and the "book" token round-trip.
 * All pure — no DB, no network.
 */

import { describe, it, expect, beforeAll } from "vitest";
import {
  CALL_WINDOWS,
  windowByKey,
  isValidBookingDate,
  upcomingWeekdays,
  bookingLabel,
  MAX_DAYS_AHEAD,
} from "@/lib/leads/booking";
import {
  mintLeadToken,
  verifyLeadToken,
} from "@accounting-network/web-shared/lead-nurture/tokens";

// Fixed clocks (UTC): Wed 1 Jul 2026 and Fri 3 Jul 2026.
const WED = new Date("2026-07-01T10:00:00Z");
const FRI = new Date("2026-07-03T10:00:00Z");

describe("upcomingWeekdays", () => {
  it("starts tomorrow and yields only weekdays", () => {
    const days = upcomingWeekdays(5, WED);
    expect(days.map((d) => d.iso)).toEqual([
      "2026-07-02", // Thu
      "2026-07-03", // Fri
      "2026-07-06", // Mon (weekend skipped)
      "2026-07-07",
      "2026-07-08",
    ]);
    expect(days[0].weekday).toBe("Thu");
  });

  it("from a Friday, the first offered day is Monday", () => {
    const days = upcomingWeekdays(3, FRI);
    expect(days[0].iso).toBe("2026-07-06");
    expect(days[0].weekday).toBe("Mon");
  });
});

describe("isValidBookingDate", () => {
  it("accepts a near-term weekday", () => {
    expect(isValidBookingDate("2026-07-07", WED)).toBe(true);
  });
  it("accepts today", () => {
    expect(isValidBookingDate("2026-07-01", WED)).toBe(true);
  });
  it("rejects weekends", () => {
    expect(isValidBookingDate("2026-07-04", WED)).toBe(false); // Saturday
    expect(isValidBookingDate("2026-07-05", WED)).toBe(false); // Sunday
  });
  it("rejects the past", () => {
    expect(isValidBookingDate("2026-06-30", WED)).toBe(false);
  });
  it(`rejects beyond ${MAX_DAYS_AHEAD} days ahead`, () => {
    expect(isValidBookingDate("2026-07-23", WED)).toBe(false); // +22 days (Thu)
    expect(isValidBookingDate("2026-07-22", WED)).toBe(true); // +21 days (Wed)
  });
  it("rejects garbage and calendar rollovers", () => {
    expect(isValidBookingDate("not-a-date", WED)).toBe(false);
    expect(isValidBookingDate("2026-02-31", WED)).toBe(false);
    expect(isValidBookingDate("", WED)).toBe(false);
  });
});

describe("bookingLabel / windows", () => {
  it("builds the human slot label DJH sees", () => {
    expect(bookingLabel("2026-07-14", "morning")).toBe("Tue 14 Jul, morning (9am to 12pm)");
    expect(bookingLabel("2026-07-14", "late_afternoon")).toBe(
      "Tue 14 Jul, late afternoon (3pm to 5:30pm)",
    );
  });
  it("returns null for unknown windows or bad dates", () => {
    expect(bookingLabel("2026-07-14", "midnight")).toBeNull();
    expect(bookingLabel("garbage", "morning")).toBeNull();
  });
  it("exposes exactly three call windows", () => {
    expect(CALL_WINDOWS).toHaveLength(3);
    expect(windowByKey("afternoon")?.hours).toBe("12pm to 3pm");
    expect(windowByKey("nope")).toBeNull();
  });
});

describe("book token", () => {
  beforeAll(() => {
    process.env.LEAD_NURTURE_TOKEN_SECRET = "test-secret-test-secret-test-secret!";
  });

  it("round-trips the book intent", () => {
    const t = mintLeadToken("lead-123", "book");
    const v = verifyLeadToken(t, "book");
    expect(v.ok).toBe(true);
    if (v.ok) expect(v.leadId).toBe("lead-123");
  });

  it("a book token cannot be used as a confirm token", () => {
    const t = mintLeadToken("lead-123", "book");
    const v = verifyLeadToken(t, "confirm");
    expect(v.ok).toBe(false);
    if (!v.ok) expect(v.reason).toBe("wrong-intent");
  });
});
