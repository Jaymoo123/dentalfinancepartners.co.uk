/**
 * Tests for send-window.ts: inSendWindow, computeNextSendMs, bestHourFromTimestamps.
 *
 * All epoch ms fixtures are computed from UTC ISO strings and documented with
 * their Europe/London wall-clock equivalent so the intent is auditable.
 *
 * April 2026 is BST (UTC+1); October 2026 straddles BST->GMT on Sun 25 Oct.
 *
 * Base values (all verified against the Gregorian calendar):
 *   2026-01-01T00:00:00Z  = 1767225600000
 *   2026-04-15T00:00:00Z  = 1776211200000  (Wednesday -- Jan1=Thu + 104 days = Wed)
 */

import { describe, it, expect } from "vitest";
import {
  inSendWindow,
  computeNextSendMs,
  bestHourFromTimestamps,
} from "@/lib/leads/send-window";

// ---------------------------------------------------------------------------
// Epoch ms helpers (computed from UTC ISO strings)
// ---------------------------------------------------------------------------

// April 2026 is BST (UTC+1): London hour = UTC hour + 1

// Wednesday 15 Apr 2026
const WED_APR15_UTC0 = 1776211200000; // 2026-04-15T00:00:00Z  London 01:00 BST
const WED_APR15_L0800 = WED_APR15_UTC0 + 7 * 3600000;  // 2026-04-15T07:00:00Z = London 08:00 BST
const WED_APR15_L0900 = WED_APR15_UTC0 + 8 * 3600000;  // 2026-04-15T08:00:00Z = London 09:00 BST
const WED_APR15_L1000 = WED_APR15_UTC0 + 9 * 3600000;  // 2026-04-15T09:00:00Z = London 10:00 BST
const WED_APR15_L1300 = WED_APR15_UTC0 + 12 * 3600000; // 2026-04-15T12:00:00Z = London 13:00 BST
const WED_APR15_L1400 = WED_APR15_UTC0 + 13 * 3600000; // 2026-04-15T13:00:00Z = London 14:00 BST
const WED_APR15_L2030 = WED_APR15_UTC0 + 19 * 3600000 + 30 * 60000; // 2026-04-15T19:30:00Z = London 20:30 BST
const WED_APR15_L2031 = WED_APR15_UTC0 + 19 * 3600000 + 31 * 60000; // 2026-04-15T19:31:00Z = London 20:31 BST
const WED_APR15_L2200 = WED_APR15_UTC0 + 21 * 3600000; // 2026-04-15T21:00:00Z = London 22:00 BST

// Thursday 16 Apr 2026
const THU_APR16_UTC0 = WED_APR15_UTC0 + 86400000;       // 2026-04-16T00:00:00Z
const THU_APR16_L0200 = THU_APR16_UTC0 + 1 * 3600000;   // 2026-04-16T01:00:00Z = London 02:00 BST
const THU_APR16_L0800 = THU_APR16_UTC0 + 7 * 3600000;   // 2026-04-16T07:00:00Z = London 08:00 BST
const THU_APR16_L1000 = THU_APR16_UTC0 + 9 * 3600000;   // 2026-04-16T09:00:00Z = London 10:00 BST
const THU_APR16_L1700 = THU_APR16_UTC0 + 16 * 3600000;  // 2026-04-16T16:00:00Z = London 17:00 BST

// Friday 17 Apr 2026
const FRI_APR17_UTC0 = THU_APR16_UTC0 + 86400000;
const FRI_APR17_L1000 = FRI_APR17_UTC0 + 9 * 3600000;  // 2026-04-17T09:00:00Z = London 10:00 BST

// Saturday 18 Apr 2026
const SAT_APR18_UTC0 = FRI_APR17_UTC0 + 86400000;
const SAT_APR18_L0700 = SAT_APR18_UTC0 + 6 * 3600000;  // 2026-04-18T06:00:00Z = London 07:00 BST
const SAT_APR18_L1000 = SAT_APR18_UTC0 + 9 * 3600000;  // 2026-04-18T09:00:00Z = London 10:00 BST
const SAT_APR18_L1759 = SAT_APR18_UTC0 + 16 * 3600000 + 59 * 60000; // London 17:59 BST
const SAT_APR18_L1800 = SAT_APR18_UTC0 + 17 * 3600000; // 2026-04-18T17:00:00Z = London 18:00 BST

// Sunday 19 Apr 2026
const SUN_APR19_UTC0 = SAT_APR18_UTC0 + 86400000;
const SUN_APR19_L1400 = SUN_APR19_UTC0 + 13 * 3600000; // 2026-04-19T13:00:00Z = London 14:00 BST

// Monday 20 Apr 2026
const MON_APR20_UTC0 = SUN_APR19_UTC0 + 86400000;
const MON_APR20_L1000 = MON_APR20_UTC0 + 9 * 3600000;  // 2026-04-20T09:00:00Z = London 10:00 BST

// October 2026: BST->GMT switch on Sun 25 Oct 2026
// Days from 2026-01-01 to 2026-10-23: 31+28+31+30+31+30+31+31+30+22 = 295 days
const OCT23_UTC0 = 1767225600000 + 295 * 86400000; // 2026-10-23T00:00:00Z  (Friday)
const FRI_OCT23_L1000 = OCT23_UTC0 + 9 * 3600000;  // 2026-10-23T09:00:00Z = London 10:00 BST
// +48h due lands on Sunday 25 Oct 2026 at UTC 09:00 (by then GMT = UTC+0, London 09:00 GMT)
const SUN_OCT25_DUE = FRI_OCT23_L1000 + 48 * 3600000; // 2026-10-25T09:00:00Z = London 09:00 GMT (Sunday)
// Monday 26 Oct 2026 is GMT; 10:00 London = UTC 10:00
const MON_OCT26_UTC0 = OCT23_UTC0 + 3 * 86400000;    // 2026-10-26T00:00:00Z
const MON_OCT26_L1000 = MON_OCT26_UTC0 + 10 * 3600000; // 2026-10-26T10:00:00Z = London 10:00 GMT

// ---------------------------------------------------------------------------
// inSendWindow
// ---------------------------------------------------------------------------

describe("inSendWindow -- weekday email", () => {
  it("returns true at exactly 08:00 BST (window opens)", () => {
    expect(inSendWindow(WED_APR15_L0800, false)).toBe(true);
  });

  it("returns false at 07:59 BST (before window open)", () => {
    const ms = WED_APR15_UTC0 + 6 * 3600000 + 59 * 60000; // London 07:59 BST
    expect(inSendWindow(ms, false)).toBe(false);
  });

  it("returns true at 20:30 BST (last valid minute)", () => {
    expect(inSendWindow(WED_APR15_L2030, false)).toBe(true);
  });

  it("returns false at 20:31 BST (one minute past close)", () => {
    expect(inSendWindow(WED_APR15_L2031, false)).toBe(false);
  });
});

describe("inSendWindow -- weekday SMS", () => {
  it("returns false at 08:00 BST for SMS (window opens at 09:00)", () => {
    expect(inSendWindow(WED_APR15_L0800, true)).toBe(false);
  });

  it("returns true at 09:00 BST for SMS", () => {
    expect(inSendWindow(WED_APR15_L0900, true)).toBe(true);
  });

  it("returns true at 20:30 BST for SMS (shared close)", () => {
    expect(inSendWindow(WED_APR15_L2030, true)).toBe(true);
  });
});

describe("inSendWindow -- Saturday", () => {
  it("returns false at 07:00 BST on Saturday (before 10:00)", () => {
    expect(inSendWindow(SAT_APR18_L0700, false)).toBe(false);
  });

  it("returns true at 10:00 BST on Saturday (window opens)", () => {
    expect(inSendWindow(SAT_APR18_L1000, false)).toBe(true);
  });

  it("returns true at 17:59 BST on Saturday (inside Saturday window)", () => {
    expect(inSendWindow(SAT_APR18_L1759, false)).toBe(true);
  });

  it("returns false at 18:00 BST on Saturday (window closed)", () => {
    expect(inSendWindow(SAT_APR18_L1800, false)).toBe(false);
  });
});

describe("inSendWindow -- Sunday", () => {
  it("returns false at any time on Sunday", () => {
    expect(inSendWindow(SUN_APR19_L1400, false)).toBe(false);
    expect(inSendWindow(SUN_APR19_L1400, true)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// computeNextSendMs -- delay-0
// ---------------------------------------------------------------------------

describe("computeNextSendMs -- delay-0 pass-through", () => {
  it("returns fromMs unchanged when it is inside the window (Wed 10:00 BST)", () => {
    const result = computeNextSendMs(WED_APR15_L1000, 0, { hasSms: false });
    expect(result).toBe(WED_APR15_L1000);
  });

  it("rolls forward from 02:00 BST to same-day 08:00 BST (email window open)", () => {
    // Thu 16 Apr 02:00 BST -> Thu 16 Apr 08:00 BST
    const result = computeNextSendMs(THU_APR16_L0200, 0, { hasSms: false });
    expect(result).toBe(THU_APR16_L0800);
  });

  it("rolls forward from 22:00 BST to next-morning 08:00 BST (email)", () => {
    // Wed 15 Apr 22:00 BST -> Thu 16 Apr 08:00 BST
    const result = computeNextSendMs(WED_APR15_L2200, 0, { hasSms: false });
    expect(result).toBe(THU_APR16_L0800);
  });
});

// ---------------------------------------------------------------------------
// computeNextSendMs -- Saturday
// ---------------------------------------------------------------------------

describe("computeNextSendMs -- Saturday window clamping", () => {
  it("rolls delay-0 from 07:00 BST Saturday to 10:00 BST Saturday", () => {
    // Sat 18 Apr 07:00 BST (outside window) -> Sat 18 Apr 10:00 BST
    const result = computeNextSendMs(SAT_APR18_L0700, 0, { hasSms: false });
    expect(result).toBe(SAT_APR18_L1000);
  });
});

// ---------------------------------------------------------------------------
// computeNextSendMs -- Sunday rolls to Monday
// ---------------------------------------------------------------------------

describe("computeNextSendMs -- Sunday -> Monday", () => {
  it("rolls delay-0 from Sunday 14:00 BST to Monday 08:00 BST (email)", () => {
    // Sun 19 Apr 14:00 BST -> Mon 20 Apr 08:00 BST
    const MON_APR20_L0800 = MON_APR20_UTC0 + 7 * 3600000;
    const result = computeNextSendMs(SUN_APR19_L1400, 0, { hasSms: false });
    expect(result).toBe(MON_APR20_L0800);
  });

  it("delayed send landing on Sunday rolls to Monday at bestSendHour 10", () => {
    // Wed 15 Apr 10:00 BST + 96h = Sun 19 Apr 10:00 BST -> Mon 20 Apr 10:00 BST
    const result = computeNextSendMs(WED_APR15_L1000, 96, {
      hasSms: false,
      bestSendHour: 10,
    });
    expect(result).toBe(MON_APR20_L1000);
  });
});

// ---------------------------------------------------------------------------
// computeNextSendMs -- preferMonday (Thu+48h lands Saturday -> Monday)
// ---------------------------------------------------------------------------

describe("computeNextSendMs -- preferMonday", () => {
  it("Thu 16 Apr 08:00 BST + 48h lands Saturday, preferMonday rolls to Mon 20 Apr 10:00 BST", () => {
    // fromMs = Thu 16 Apr 08:00 BST; due = Sat 18 Apr 08:00 BST (London 08:00 -> clamped to 10)
    // preferMonday -> skip Saturday -> Monday 20 Apr 10:00 BST
    const result = computeNextSendMs(THU_APR16_L0800, 48, {
      hasSms: false,
      bestSendHour: 10,
      preferMonday: true,
    });
    expect(result).toBe(MON_APR20_L1000);
  });
});

// ---------------------------------------------------------------------------
// computeNextSendMs -- bestSendHour lands at correct hour
// ---------------------------------------------------------------------------

describe("computeNextSendMs -- bestSendHour snapping", () => {
  it("bestSendHour 17 places the send at 17:00 BST on the due date", () => {
    // Wed 15 Apr 09:00 BST + 24h -> Thu 16 Apr at 17:00 BST
    const result = computeNextSendMs(WED_APR15_L0900, 24, {
      hasSms: false,
      bestSendHour: 17,
    });
    expect(result).toBe(THU_APR16_L1700);
  });

  it("bestSendHour 3 (below email open 08) clamps to 08:00 BST", () => {
    // Wed 15 Apr 09:00 BST + 24h -> Thu 16 Apr at 08:00 BST (clamped from 03)
    const result = computeNextSendMs(WED_APR15_L0900, 24, {
      hasSms: false,
      bestSendHour: 3,
    });
    expect(result).toBe(THU_APR16_L0800);
  });

  it("bestSendHour 23 (above window close 20) clamps to 20:00 BST", () => {
    // Wed 15 Apr 09:00 BST + 24h -> Thu 16 Apr at 20:00 BST
    const THU_APR16_L2000 = THU_APR16_UTC0 + 19 * 3600000; // UTC 19:00 = London 20:00 BST
    const result = computeNextSendMs(WED_APR15_L0900, 24, {
      hasSms: false,
      bestSendHour: 23,
    });
    expect(result).toBe(THU_APR16_L2000);
  });

  it("bestSendHour 9 on SMS is exactly at open (09:00 BST)", () => {
    const WED_APR15_L0900_sms = WED_APR15_L0900;
    const result = computeNextSendMs(WED_APR15_L1000, 24, {
      hasSms: true,
      bestSendHour: 9,
    });
    // Due date = Thu 16 Apr; hour 9 for SMS is within window [09:00, 20:30]
    const THU_APR16_L0900 = THU_APR16_UTC0 + 8 * 3600000;
    expect(result).toBe(THU_APR16_L0900);
    void WED_APR15_L0900_sms; // suppress unused warning
  });
});

// ---------------------------------------------------------------------------
// computeNextSendMs -- minimum-gap rule
// ---------------------------------------------------------------------------

describe("computeNextSendMs -- minimum-gap guard", () => {
  it("pushes one day when bestSendHour anchor lands before fromMs + max(2h, delay/2)", () => {
    // fromMs = Wed 15 Apr 14:00 BST; delayHours = 1
    // due = Wed 15 Apr 15:00 BST; bestSendHour 10 -> candidate = Wed 15 Apr 10:00 BST
    // minGap = max(2h, 0.5h) = 2h; fromMs + 2h = 16:00 BST
    // 10:00 < 16:00 -> push to Thu 16 Apr 10:00 BST
    const result = computeNextSendMs(WED_APR15_L1400, 1, {
      hasSms: false,
      bestSendHour: 10,
    });
    expect(result).toBe(THU_APR16_L1000);
  });

  it("does NOT push when candidate is already past the minimum gap", () => {
    // fromMs = Wed 15 Apr 09:00 BST; delayHours = 24; minGap = 12h
    // candidate = Thu 16 Apr 10:00 BST; fromMs + 12h = Wed 15 21:00 BST -> candidate passes
    const result = computeNextSendMs(WED_APR15_L0900, 24, {
      hasSms: false,
      bestSendHour: 10,
    });
    expect(result).toBe(THU_APR16_L1000);
  });
});

// ---------------------------------------------------------------------------
// computeNextSendMs -- BST->GMT transition (late October 2026)
// ---------------------------------------------------------------------------

describe("computeNextSendMs -- BST->GMT switch Sun 25 Oct 2026", () => {
  it("delayed send due on Sunday 25 Oct (GMT) rolls to Monday 26 Oct 10:00 GMT", () => {
    // fromMs = Fri 23 Oct 10:00 BST; + 48h due = Sun 25 Oct 09:00 UTC = 09:00 GMT (Sunday)
    // -> roll to Mon 26 Oct 10:00 GMT (UTC 10:00 because London is GMT in late October)
    const result = computeNextSendMs(FRI_OCT23_L1000, 48, {
      hasSms: false,
      bestSendHour: 10,
    });
    // Verify the due epoch is what we computed
    expect(SUN_OCT25_DUE).toBe(FRI_OCT23_L1000 + 48 * 3600000);
    expect(result).toBe(MON_OCT26_L1000);
  });
});

// ---------------------------------------------------------------------------
// bestHourFromTimestamps
// ---------------------------------------------------------------------------

describe("bestHourFromTimestamps", () => {
  it("returns null for fewer than 3 samples", () => {
    expect(bestHourFromTimestamps([])).toBeNull();
    expect(bestHourFromTimestamps(["2026-04-15T09:00:00Z"])).toBeNull();
    expect(
      bestHourFromTimestamps([
        "2026-04-15T09:00:00Z",
        "2026-04-15T10:00:00Z",
      ]),
    ).toBeNull();
  });

  it("returns the modal London hour from 3+ samples", () => {
    // Three timestamps all at London 14:00 BST (UTC 13:00), one outlier
    const timestamps = [
      "2026-04-15T13:00:00Z", // London 14:00 BST
      "2026-04-16T13:00:00Z", // London 14:00 BST
      "2026-04-17T13:00:00Z", // London 14:00 BST
      "2026-04-15T09:00:00Z", // London 10:00 BST (outlier)
    ];
    expect(bestHourFromTimestamps(timestamps)).toBe(14);
  });

  it("returns the modal London hour from 3 samples with a clear mode", () => {
    const timestamps = [
      "2026-04-15T08:00:00Z", // London 09:00 BST
      "2026-04-16T08:00:00Z", // London 09:00 BST
      "2026-04-17T08:00:00Z", // London 09:00 BST
    ];
    expect(bestHourFromTimestamps(timestamps)).toBe(9);
  });

  it("returns a valid hour (not null) when exactly 3 samples are provided", () => {
    const timestamps = [
      "2026-04-15T10:00:00Z",
      "2026-04-15T10:00:00Z",
      "2026-04-15T10:00:00Z",
    ];
    expect(bestHourFromTimestamps(timestamps)).not.toBeNull();
  });

  it("handles BST correctly: UTC 13:00 on a BST date is London 14:00", () => {
    // All three at UTC 13:00 in BST period (April) -> London 14:00
    const timestamps = [
      "2026-04-10T13:00:00Z",
      "2026-04-11T13:00:00Z",
      "2026-04-12T13:00:00Z",
    ];
    expect(bestHourFromTimestamps(timestamps)).toBe(14);
  });

  it("handles GMT correctly: UTC 10:00 in November is London 10:00", () => {
    // All three at UTC 10:00 in GMT period (November) -> London 10:00
    const timestamps = [
      "2026-11-10T10:00:00Z",
      "2026-11-11T10:00:00Z",
      "2026-11-12T10:00:00Z",
    ];
    expect(bestHourFromTimestamps(timestamps)).toBe(10);
  });
});
