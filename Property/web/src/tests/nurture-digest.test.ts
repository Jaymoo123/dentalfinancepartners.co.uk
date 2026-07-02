/**
 * Unit tests for the PURE composeDigestEmail function in nurture-digest.ts.
 *
 * All tests are synchronous and deterministic: no I/O, no DB, no network.
 * The async functions (gatherDigestData, runNurtureDigest) are NOT tested here
 * because they require a live DB.
 */

import { describe, it, expect } from "vitest";
import { composeDigestEmail } from "@/lib/leads/nurture-digest";
import type { DigestData, StuckLead, FailedSendRow } from "@/lib/leads/nurture-digest";
import type { NurtureHealth } from "@/lib/leads/nurture-health";
import type { NurtureControl } from "@/lib/leads/nurture-control";

// ---------------------------------------------------------------------------
// Fixture helpers
// ---------------------------------------------------------------------------

function makeHealth(overrides: Partial<NurtureHealth> = {}): NurtureHealth {
  return {
    siteKey: "property",
    sends24h: 10,
    sent24h: 8,
    failed24h: 1,
    skipped24h: 1,
    sends1h: 2,
    failed1h: 0,
    skipped1h: 0,
    complaints24h: 0,
    complaints7d: 0,
    bounces24h: 0,
    bounces7d: 0,
    optouts7d: 0,
    replies24h: 1,
    booked24h: 2,
    opened24h: 0,
    clicked24h: 0,
    opened7d: 0,
    clicked7d: 0,
    activeLeads: 5,
    stuckLeads: 0,
    contactable: 3,
    unreachable: 0,
    forwarded: 2,
    ...overrides,
  };
}

function makeControl(overrides: Partial<NurtureControl> = {}): NurtureControl {
  return {
    paused: false,
    pausedReason: null,
    pausedAt: null,
    pausedBy: null,
    lastAlertAt: null,
    lastAlertKey: null,
    lastCronRunAt: null,
    lastDigestRunAt: null,
    ...overrides,
  };
}

const STUCK_LEAD: StuckLead = {
  leadId: "lead-abc-1",
  fullName: "Jane Smith",
  createdAt: "2026-06-01T10:00:00Z",
  overdueHours: 26,
  step: 2,
};

const FAILED_SEND: FailedSendRow = {
  leadId: "lead-abc-2",
  fullName: "John Doe",
  channel: "email",
  step: 1,
  reason: "bounce",
  ts: "2026-06-28T14:30:00Z",
};

/** Representative digest with some stuck leads, some failed sends, paused control. */
function makeFullDigest(overrides: Partial<DigestData> = {}): DigestData {
  return {
    health: makeHealth(),
    control: makeControl({
      paused: true,
      pausedReason: "2 complaints in 24 hours",
      pausedAt: "2026-06-30T08:00:00Z",
      pausedBy: "auto",
    }),
    stuck: [STUCK_LEAD],
    failedSends: [FAILED_SEND],
    forDate: "2026-07-02",
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Basic structure
// ---------------------------------------------------------------------------

describe("composeDigestEmail: basic structure", () => {
  it("returns a non-empty subject string", () => {
    const { subject } = composeDigestEmail(makeFullDigest());
    expect(typeof subject).toBe("string");
    expect(subject.trim().length).toBeGreaterThan(0);
  });

  it("subject includes the forDate", () => {
    const d = makeFullDigest({ forDate: "2026-07-02" });
    const { subject } = composeDigestEmail(d);
    expect(subject).toContain("2026-07-02");
  });

  it("returns a non-empty text string", () => {
    const { text } = composeDigestEmail(makeFullDigest());
    expect(typeof text).toBe("string");
    expect(text.trim().length).toBeGreaterThan(0);
  });

  it("text contains the forDate", () => {
    const d = makeFullDigest({ forDate: "2026-07-02" });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("2026-07-02");
  });
});

// ---------------------------------------------------------------------------
// Copy hygiene: no em-dash or en-dash
// ---------------------------------------------------------------------------

describe("composeDigestEmail: copy hygiene", () => {
  it("text contains no em-dash (U+2014)", () => {
    const { text } = composeDigestEmail(makeFullDigest());
    expect(text).not.toMatch(/—/);
  });

  it("text contains no en-dash (U+2013)", () => {
    const { text } = composeDigestEmail(makeFullDigest());
    expect(text).not.toMatch(/–/);
  });

  it("regex /[\\u2014\\u2013]/ does not match the full output", () => {
    const { subject, text } = composeDigestEmail(makeFullDigest());
    const combined = subject + "\n" + text;
    expect(/[—–]/.test(combined)).toBe(false);
  });

  it("text contains no 'undefined' string", () => {
    const { text } = composeDigestEmail(makeFullDigest());
    expect(text).not.toContain("undefined");
  });

  it("text contains no 'NaN' string", () => {
    const { text } = composeDigestEmail(makeFullDigest());
    expect(text).not.toContain("NaN");
  });

  it("subject contains no em-dash or en-dash", () => {
    const { subject } = composeDigestEmail(makeFullDigest());
    expect(/[—–]/.test(subject)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Pause state
// ---------------------------------------------------------------------------

describe("composeDigestEmail: pause state", () => {
  it("mentions paused state when control.paused is true", () => {
    const d = makeFullDigest({
      control: makeControl({
        paused: true,
        pausedReason: "2 complaints in 24 hours",
        pausedAt: "2026-06-30T08:00:00Z",
        pausedBy: "auto",
      }),
    });
    const { text } = composeDigestEmail(d);
    // The text should clearly signal the system is paused
    expect(text.toLowerCase()).toMatch(/pause/i);
    expect(text).toMatch(/PAUSED/);
  });

  it("includes the pause reason in the text when paused", () => {
    const d = makeFullDigest({
      control: makeControl({
        paused: true,
        pausedReason: "2 complaints in 24 hours",
        pausedAt: "2026-06-30T08:00:00Z",
        pausedBy: "auto",
      }),
    });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("2 complaints in 24 hours");
  });

  it("includes the paused-by field in the text when paused", () => {
    const d = makeFullDigest({
      control: makeControl({
        paused: true,
        pausedReason: "auto-pause",
        pausedAt: "2026-06-30T08:00:00Z",
        pausedBy: "auto",
      }),
    });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("auto");
  });

  it("says 'running' (or equivalent) when control.paused is false", () => {
    const d = makeFullDigest({
      control: makeControl({ paused: false }),
    });
    const { text } = composeDigestEmail(d);
    expect(text.toLowerCase()).toMatch(/running/);
  });
});

// ---------------------------------------------------------------------------
// Health numbers appear in the text
// ---------------------------------------------------------------------------

describe("composeDigestEmail: health numbers", () => {
  it("activeLeads count appears in text", () => {
    const d = makeFullDigest({ health: makeHealth({ activeLeads: 7 }) });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("7");
  });

  it("sends24h count appears in text", () => {
    const d = makeFullDigest({ health: makeHealth({ sends24h: 10 }) });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("10");
  });

  it("sent24h count appears in text", () => {
    const d = makeFullDigest({ health: makeHealth({ sent24h: 8 }) });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("8");
  });

  it("forwarded count appears in text", () => {
    const d = makeFullDigest({ health: makeHealth({ forwarded: 2 }) });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("2");
  });

  it("complaints24h count appears in text", () => {
    const d = makeFullDigest({ health: makeHealth({ complaints24h: 1 }) });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("1");
  });

  it("bounces7d count appears in text when health is provided", () => {
    const d = makeFullDigest({ health: makeHealth({ bounces7d: 4 }) });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("4");
  });
});

// ---------------------------------------------------------------------------
// Stuck leads section
// ---------------------------------------------------------------------------

describe("composeDigestEmail: stuck leads", () => {
  it("lists stuck lead names in the text", () => {
    const d = makeFullDigest({ stuck: [STUCK_LEAD] });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("Jane Smith");
  });

  it("lists stuck lead id in the text", () => {
    const d = makeFullDigest({ stuck: [STUCK_LEAD] });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("lead-abc-1");
  });

  it("reports stuck count in the section header", () => {
    const d = makeFullDigest({ stuck: [STUCK_LEAD] });
    const { text } = composeDigestEmail(d);
    expect(text).toMatch(/STUCK LEADS \(1\)/);
  });

  it("says 'None' when there are no stuck leads", () => {
    const d = makeFullDigest({ stuck: [] });
    const { text } = composeDigestEmail(d);
    expect(text).toMatch(/STUCK LEADS \(0\)/);
    expect(text).toContain("None.");
  });

  it("shows '(unknown)' for a stuck lead with null fullName", () => {
    const anonymous: StuckLead = { ...STUCK_LEAD, fullName: null };
    const d = makeFullDigest({ stuck: [anonymous] });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("(unknown)");
  });

  it("shows the overdueHours value for a stuck lead", () => {
    const d = makeFullDigest({ stuck: [STUCK_LEAD] });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("26");
  });
});

// ---------------------------------------------------------------------------
// Failed sends section
// ---------------------------------------------------------------------------

describe("composeDigestEmail: failed sends", () => {
  it("lists failed send lead names", () => {
    const d = makeFullDigest({ failedSends: [FAILED_SEND] });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("John Doe");
  });

  it("lists failed send lead id", () => {
    const d = makeFullDigest({ failedSends: [FAILED_SEND] });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("lead-abc-2");
  });

  it("reports failed-sends count in the section header", () => {
    const d = makeFullDigest({ failedSends: [FAILED_SEND] });
    const { text } = composeDigestEmail(d);
    expect(text).toMatch(/FAILED SENDS LAST 7 DAYS \(1\)/);
  });

  it("says 'None' when there are no failed sends", () => {
    const d = makeFullDigest({ failedSends: [] });
    const { text } = composeDigestEmail(d);
    expect(text).toMatch(/FAILED SENDS LAST 7 DAYS \(0\)/);
    expect(text).toContain("None.");
  });

  it("includes the failure reason in the text", () => {
    const d = makeFullDigest({ failedSends: [FAILED_SEND] });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("bounce");
  });

  it("includes the channel in the text", () => {
    const d = makeFullDigest({ failedSends: [FAILED_SEND] });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("email");
  });

  it("shows '(unknown)' for a failed send with null fullName", () => {
    const anon: FailedSendRow = { ...FAILED_SEND, fullName: null };
    const d = makeFullDigest({ failedSends: [anon] });
    const { text } = composeDigestEmail(d);
    expect(text).toContain("(unknown)");
  });
});

// ---------------------------------------------------------------------------
// Null health (view missing / no activity)
// ---------------------------------------------------------------------------

describe("composeDigestEmail: null health", () => {
  it("does not throw when health is null", () => {
    const d = makeFullDigest({ health: null });
    expect(() => composeDigestEmail(d)).not.toThrow();
  });

  it("text is non-empty even with null health", () => {
    const d = makeFullDigest({ health: null });
    const { text } = composeDigestEmail(d);
    expect(text.trim().length).toBeGreaterThan(0);
  });

  it("text contains no 'undefined' or 'NaN' with null health", () => {
    const d = makeFullDigest({ health: null });
    const { text } = composeDigestEmail(d);
    expect(text).not.toContain("undefined");
    expect(text).not.toContain("NaN");
  });

  it("text contains no em-dash or en-dash with null health", () => {
    const d = makeFullDigest({ health: null });
    const { text } = composeDigestEmail(d);
    expect(/[—–]/.test(text)).toBe(false);
  });

  it("mentions health unavailability in text", () => {
    const d = makeFullDigest({ health: null });
    const { text } = composeDigestEmail(d);
    // The compose function emits a fallback message when health is null
    expect(text.toLowerCase()).toMatch(/not available|missing|no activity/i);
  });
});

// ---------------------------------------------------------------------------
// Bottleneck notes: high failure rate
// ---------------------------------------------------------------------------

describe("composeDigestEmail: bottleneck notes", () => {
  it("includes a failure-rate note when 24 h failure rate >= 20%", () => {
    const h = makeHealth({ sends24h: 10, failed24h: 3 }); // 30%
    const d = makeFullDigest({ health: h });
    const { text } = composeDigestEmail(d);
    expect(text).toMatch(/failure rate/i);
  });

  it("includes a 1 h impairment note when 1 h failure rate > 25%", () => {
    const h = makeHealth({ sends1h: 4, failed1h: 2 }); // 50%
    const d = makeFullDigest({ health: h });
    const { text } = composeDigestEmail(d);
    expect(text).toMatch(/impaired|failure rate/i);
  });

  it("includes a stuck-leads bottleneck note when stuckLeads >= 3", () => {
    const h = makeHealth({ stuckLeads: 3 });
    const d = makeFullDigest({ health: h });
    const { text } = composeDigestEmail(d);
    expect(text).toMatch(/overdue|stuck/i);
  });

  it("includes a complaints note when complaints24h >= 1", () => {
    const h = makeHealth({ complaints24h: 1 });
    const d = makeFullDigest({ health: h });
    const { text } = composeDigestEmail(d);
    expect(text).toMatch(/complaint/i);
  });
});

// ---------------------------------------------------------------------------
// Multiple stuck leads + failed sends: no 'undefined'/'NaN' in any row
// ---------------------------------------------------------------------------

describe("composeDigestEmail: multi-row robustness", () => {
  it("handles multiple stuck leads without 'undefined' or 'NaN'", () => {
    const stuck: StuckLead[] = [
      STUCK_LEAD,
      { leadId: "lead-xyz-2", fullName: null, createdAt: "2026-06-02T09:00:00Z", overdueHours: 48, step: 3 },
    ];
    const d = makeFullDigest({ stuck });
    const { text } = composeDigestEmail(d);
    expect(text).not.toContain("undefined");
    expect(text).not.toContain("NaN");
  });

  it("handles multiple failed sends without 'undefined' or 'NaN'", () => {
    const failedSends: FailedSendRow[] = [
      FAILED_SEND,
      { leadId: "lead-xyz-3", fullName: null, channel: "sms", step: 0, reason: "rate_limit", ts: "2026-06-29T10:00:00Z" },
    ];
    const d = makeFullDigest({ failedSends });
    const { text } = composeDigestEmail(d);
    expect(text).not.toContain("undefined");
    expect(text).not.toContain("NaN");
  });

  it("all rows: no em-dash or en-dash in multi-row output", () => {
    const stuck: StuckLead[] = [
      STUCK_LEAD,
      { leadId: "l2", fullName: "Alice", createdAt: "2026-05-01T00:00:00Z", overdueHours: 72, step: 1 },
    ];
    const failedSends: FailedSendRow[] = [
      FAILED_SEND,
      { leadId: "l3", fullName: null, channel: "whatsapp", step: 2, reason: "rejected", ts: "2026-06-27T11:00:00Z" },
    ];
    const d = makeFullDigest({ stuck, failedSends });
    const { text } = composeDigestEmail(d);
    expect(/[—–]/.test(text)).toBe(false);
  });
});
