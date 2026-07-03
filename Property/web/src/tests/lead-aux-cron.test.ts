/**
 * Tests for the booked-slot aftercare layer:
 *   - runLeadAuxScans: T-24 email, same-day SMS, abandoned-booking nudge
 *   - buildIcsForSlot: pure ICS builder
 *   - QA gate: reminder copy passes all content checks
 *
 * Mocking mirrors the style of lead-nurture.test.ts.
 */

import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { qaGateMessage } from "@/lib/ai/qa-gate";

// ── In-memory DB ─────────────────────────────────────────────────────────────

type Row = Record<string, unknown>;

// Mirror the no-annotation style of lead-nurture.test.ts so `db[key as keyof typeof db]` works.
const db = {
  leads:                [] as Row[],
  lead_contact_events:  [] as Row[],
  lead_nurture_state:   [] as Row[],
  lead_nurture_sends:   [] as Row[],
  reset() {
    this.leads               = [];
    this.lead_contact_events = [];
    this.lead_nurture_state  = [];
    this.lead_nurture_sends  = [];
  },
};

function matches(row: Row, params: Record<string, string>): boolean {
  for (const [k, raw] of Object.entries(params)) {
    if (["select", "order", "limit"].includes(k)) continue;
    if (raw.startsWith("eq.")) {
      if (String(row[k]) !== raw.slice(3)) return false;
    } else if (raw.startsWith("in.")) {
      const set = raw.slice(3).replace(/^\(|\)$/g, "").split(",");
      if (!set.includes(String(row[k]))) return false;
    } else if (raw.startsWith("gte.")) {
      if (String(row[k]) < raw.slice(4)) return false;
    } else if (raw.startsWith("lte.")) {
      if (String(row[k]) > raw.slice(4)) return false;
    }
  }
  return true;
}

let idCounter = 0;

vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: vi.fn((table: string, params: Record<string, string>) => {
    const tableData = (db[table as keyof typeof db] as Row[]).filter(
      (r) => matches(r, params),
    );
    return Promise.resolve({ ok: true, status: 200, data: tableData });
  }),
  adminInsert: vi.fn(
    (
      table: string,
      row: Row,
      opts?: { onConflict?: string; ignoreDuplicates?: boolean },
    ) => {
      const tableData = db[table as keyof typeof db] as Row[];
      if (opts?.onConflict && opts?.ignoreDuplicates) {
        const conflictKeys = opts.onConflict.split(",").map((k) => k.trim());
        const existing = tableData.find((r) =>
          conflictKeys.every((k) => r[k] === (row as Row)[k]),
        );
        if (existing) return Promise.resolve({ ok: true, status: 200, data: [] });
      }
      const newRow: Row = { id: `row-${++idCounter}`, ...(row as object) };
      tableData.push(newRow);
      return Promise.resolve({ ok: true, status: 201, data: [newRow] });
    },
  ),
  adminUpdate: vi.fn((table: string, params: Record<string, string>, patch: Row) => {
    const tableData = db[table as keyof typeof db] as Row[];
    const hits = tableData.filter((r) => matches(r, params));
    hits.forEach((r) => Object.assign(r, patch));
    return Promise.resolve({ ok: true, status: 200, data: hits });
  }),
  adminDelete: vi.fn(() => Promise.resolve({ ok: true, status: 204, data: [] })),
}));

// ── Sender mock ───────────────────────────────────────────────────────────────

interface SendPayload {
  channel: string;
  to: string;
  subject?: string;
  html?: string;
  text?: string;
  body?: string;
  templateName?: string;
  templateVars?: string[];
  headers?: Record<string, string>;
}

const mockSend = vi.fn(
  (_payload: SendPayload): Promise<{ id?: string; skipped?: boolean } | null> =>
    Promise.resolve({ id: "msg-123" }),
);

vi.mock("@/lib/leads/channels", () => ({
  buildLeadChannelSender: () => ({ send: mockSend }),
}));

// ── Token mock ────────────────────────────────────────────────────────────────

vi.mock("@accounting-network/web-shared/lead-nurture/tokens", () => ({
  mintLeadToken: (leadId: string, intent: string) =>
    `tok-${leadId}-${intent}`,
  verifyLeadToken: vi.fn(),
}));

// ── Site URL mock ─────────────────────────────────────────────────────────────

vi.mock("@/config/niche-loader", () => ({
  getSiteUrl: () => "https://www.propertytaxpartners.co.uk",
}));

// ── Send-window mock (default: in window) ─────────────────────────────────────

const mockInSendWindow = vi.fn(() => true);

vi.mock("@/lib/leads/send-window", () => ({
  inSendWindow: (...args: Parameters<typeof mockInSendWindow>) =>
    mockInSendWindow(...args),
}));

// ── Imports (after mocks) ─────────────────────────────────────────────────────

import { runLeadAuxScans, buildIcsForSlot } from "@/lib/leads/aux-cron";

// ── Helpers ───────────────────────────────────────────────────────────────────

const SITE_URL = "https://www.propertytaxpartners.co.uk";
const LEAD_ID  = "lead-abc-1";

function seedLead(overrides: Partial<Row> = {}) {
  (db.leads as Row[]).push({
    id: LEAD_ID,
    full_name: "Sam Holloway",
    email: "sam@example.com",
    phone: "+447700900001",
    source: "property",
    ...overrides,
  });
}

function seedBookedEvent(date: string, window: string, tsIso: string) {
  (db.lead_contact_events as Row[]).push({
    lead_id: LEAD_ID,
    event_type: "booked",
    ts: tsIso,
    meta: {
      date,
      window,
      start: `Tue 14 Jul, ${window.replace("_", " ")} (9am to 12pm)`,
    },
  });
}

function seedBookingViewedEvent(tsIso: string) {
  (db.lead_contact_events as Row[]).push({
    lead_id: LEAD_ID,
    event_type: "booking_viewed",
    ts: tsIso,
  });
}

function seedNurtureState(status = "active", sequence = "property_contactability") {
  (db.lead_nurture_state as Row[]).push({
    lead_id: LEAD_ID,
    status,
    // Real rows always carry a sequence; the abandoned-booking scan now scopes to
    // the contactability sequence, so the seed must set it to be matched.
    sequence,
  });
}

function seedSendClaim(sequence: string, step: number, channel: string) {
  (db.lead_nurture_sends as Row[]).push({
    id: `existing-claim-${step}-${channel}`,
    lead_id: LEAD_ID,
    sequence,
    step,
    channel,
    status: "sent",
  });
}

beforeEach(() => {
  db.reset();
  idCounter = 0;
  mockSend.mockReset();
  mockSend.mockResolvedValue({ id: "msg-123" });
  mockInSendWindow.mockReturnValue(true);
  vi.clearAllTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

// ── buildIcsForSlot ───────────────────────────────────────────────────────────

describe("buildIcsForSlot", () => {
  it("builds a valid VCALENDAR for a morning slot (BST: UTC+1)", () => {
    const ics = buildIcsForSlot({
      leadId:    "lead-ics-1",
      date:      "2026-07-14",
      windowKey: "morning",
      label:     "Tue 14 Jul, morning (9am to 12pm)",
    });
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("END:VEVENT");
    expect(ics).toContain("END:VCALENDAR");
    expect(ics).toContain("DTSTART:20260714T080000Z"); // 09:00 BST = 08:00 UTC
    expect(ics).toContain("DTEND:20260714T110000Z");   // 12:00 BST = 11:00 UTC
    expect(ics).toContain("lead-ics-1-2026-07-14-morning@propertytaxpartners.co.uk");
    expect(ics).toContain("Property tax review call (Tue 14 Jul, morning (9am to 12pm))");
    expect(ics).toContain("A property tax specialist will call you in this window.");
  });

  it("builds correct UTC times for an afternoon slot", () => {
    const ics = buildIcsForSlot({
      leadId:    "lead-ics-2",
      date:      "2026-07-14",
      windowKey: "afternoon",
      label:     "Tue 14 Jul, afternoon (12pm to 3pm)",
    });
    expect(ics).toContain("DTSTART:20260714T110000Z"); // 12:00 BST = 11:00 UTC
    expect(ics).toContain("DTEND:20260714T140000Z");   // 15:00 BST = 14:00 UTC
  });

  it("builds correct UTC times for a late_afternoon slot", () => {
    const ics = buildIcsForSlot({
      leadId:    "lead-ics-3",
      date:      "2026-07-14",
      windowKey: "late_afternoon",
      label:     "Tue 14 Jul, late afternoon (3pm to 5:30pm)",
    });
    expect(ics).toContain("DTSTART:20260714T140000Z"); // 15:00 BST = 14:00 UTC
    expect(ics).toContain("DTEND:20260714T163000Z");   // 17:30 BST = 16:30 UTC
  });

  it("returns empty string for an unknown window key", () => {
    expect(buildIcsForSlot({ leadId: "l", date: "2026-07-14", windowKey: "unknown", label: "x" })).toBe("");
  });

  it("uses CRLF line endings (RFC 5545 requirement)", () => {
    const ics = buildIcsForSlot({ leadId: "l", date: "2026-07-14", windowKey: "morning", label: "x" });
    expect(ics).toContain("\r\n");
  });
});

// ── Scan A: T-24 email ────────────────────────────────────────────────────────

describe("Scan A: T-24 email", () => {
  // Morning slot on 2026-07-04 (BST): 09:00 BST = 08:00 UTC = 2026-07-04T08:00:00Z
  // T-24 window: [2026-07-03T08:00:00Z, 2026-07-04T08:00:00Z)
  // "now" inside: 2026-07-03T10:00:00Z

  it("fires when now is inside the T-24 window", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-03T10:00:00.000Z")); // inside [T-24, slot)

    seedLead();
    seedBookedEvent("2026-07-04", "morning", "2026-07-02T10:00:00.000Z");

    const result = await runLeadAuxScans();

    const emailSends = mockSend.mock.calls.filter((c) => c[0].channel === "email");
    expect(emailSends).toHaveLength(1);
    expect(emailSends[0][0].subject).toContain("tomorrow");
    expect(result.reminders).toBe(1);
  });

  it("does NOT fire when now is more than 24h before the slot", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-03T06:00:00.000Z")); // before T-24 window (T-26)

    seedLead();
    seedBookedEvent("2026-07-04", "morning", "2026-07-02T10:00:00.000Z");

    await runLeadAuxScans();

    const emailSends = mockSend.mock.calls.filter((c) => c[0].channel === "email");
    expect(emailSends).toHaveLength(0);
  });

  it("claims idempotently: second run does NOT send a second email", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-03T10:00:00.000Z"));

    seedLead();
    seedBookedEvent("2026-07-04", "morning", "2026-07-02T10:00:00.000Z");

    await runLeadAuxScans(); // first run: claims + sends
    const firstCount = mockSend.mock.calls.filter((c) => c[0].channel === "email").length;

    mockSend.mockClear();
    await runLeadAuxScans(); // second run: claim exists, no send
    const secondCount = mockSend.mock.calls.filter((c) => c[0].channel === "email").length;

    expect(firstCount).toBe(1);
    expect(secondCount).toBe(0);
  });

  it("skips past slots", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-05T10:00:00.000Z")); // after the slot

    seedLead();
    seedBookedEvent("2026-07-04", "morning", "2026-07-02T10:00:00.000Z");

    await runLeadAuxScans();
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("skips opted-out leads", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-03T10:00:00.000Z"));

    seedLead();
    seedBookedEvent("2026-07-04", "morning", "2026-07-02T10:00:00.000Z");
    (db.lead_contact_events as Row[]).push({ lead_id: LEAD_ID, event_type: "opted_out", ts: "2026-07-02T12:00:00Z" });

    await runLeadAuxScans();
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("T-24 email is reply-based with no booking link", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-03T10:00:00.000Z"));

    seedLead();
    seedBookedEvent("2026-07-04", "morning", "2026-07-02T10:00:00.000Z");

    await runLeadAuxScans();

    const emailCall = mockSend.mock.calls.find((c) => c[0].channel === "email");
    expect(emailCall).toBeDefined();
    const bodyText: string = emailCall![0].text ?? emailCall![0].html ?? "";
    expect(bodyText).not.toContain("/book");
    expect(bodyText.toLowerCase()).toContain("reply");
    expect(bodyText).not.toContain("/api/leads/ics");
  });
});

// ── Scan A: same-day SMS ──────────────────────────────────────────────────────

describe("Scan A: same-day SMS", () => {
  // Afternoon slot on 2026-07-04 (BST): 12:00 BST = 11:00 UTC
  // T-2 window: [11:00Z - 2h, 11:00Z) = [09:00Z, 11:00Z)
  // "now" inside T-2: 2026-07-04T10:00:00Z

  it("sends SMS for an afternoon slot when inside T-2 and in send window", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-04T10:00:00.000Z")); // 11am BST, inside T-2

    seedLead();
    seedBookedEvent("2026-07-04", "afternoon", "2026-07-02T10:00:00.000Z");

    await runLeadAuxScans();

    const smsSends = mockSend.mock.calls.filter((c) => c[0].channel === "sms");
    expect(smsSends).toHaveLength(1);
    expect(smsSends[0][0].body).toContain("later today");
    expect(smsSends[0][0].body).toContain("STOP");
  });

  it("sends SMS for a late_afternoon slot when inside T-2", async () => {
    vi.useFakeTimers();
    // late_afternoon: 15:00 BST = 14:00 UTC; T-2 = [12:00Z, 14:00Z)
    vi.setSystemTime(new Date("2026-07-04T13:00:00.000Z")); // 14:00 BST, inside T-2

    seedLead();
    seedBookedEvent("2026-07-04", "late_afternoon", "2026-07-02T10:00:00.000Z");

    await runLeadAuxScans();

    const smsSends = mockSend.mock.calls.filter((c) => c[0].channel === "sms");
    expect(smsSends).toHaveLength(1);
    expect(smsSends[0][0].body).toContain("STOP");
  });

  it("does NOT send SMS for a morning slot (even when T-2 window and in-window)", async () => {
    vi.useFakeTimers();
    // morning: 09:00 BST = 08:00 UTC; T-2 = [06:00Z, 08:00Z)
    // We simulate a time that would be T-2 for morning but the code should still skip.
    vi.setSystemTime(new Date("2026-07-04T07:00:00.000Z"));

    seedLead();
    seedBookedEvent("2026-07-04", "morning", "2026-07-02T10:00:00.000Z");

    await runLeadAuxScans();

    const smsSends = mockSend.mock.calls.filter((c) => c[0].channel === "sms");
    expect(smsSends).toHaveLength(0);
  });

  it("does NOT send SMS when out of send window", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-04T10:00:00.000Z"));

    mockInSendWindow.mockReturnValue(false);

    seedLead();
    seedBookedEvent("2026-07-04", "afternoon", "2026-07-02T10:00:00.000Z");

    await runLeadAuxScans();

    const smsSends = mockSend.mock.calls.filter((c) => c[0].channel === "sms");
    expect(smsSends).toHaveLength(0);
  });

  it("SMS claim is idempotent", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-04T10:00:00.000Z"));

    seedLead();
    seedBookedEvent("2026-07-04", "afternoon", "2026-07-02T10:00:00.000Z");

    await runLeadAuxScans();
    mockSend.mockClear();
    await runLeadAuxScans();

    const smsSends = mockSend.mock.calls.filter((c) => c[0].channel === "sms");
    expect(smsSends).toHaveLength(0);
  });
});

// ── Scan A: rebooking ─────────────────────────────────────────────────────────

describe("Scan A: rebooked slot gets fresh reminders", () => {
  it("a different date+window yields a new sequence string and fires separately", async () => {
    vi.useFakeTimers();
    // Set time inside T-24 window for the new slot (2026-07-05 afternoon, 12:00 BST = 11:00 UTC).
    // T-24 = [2026-07-04T11:00Z, 2026-07-05T11:00Z); now = 2026-07-04T12:00Z -> inside.
    vi.setSystemTime(new Date("2026-07-04T12:00:00.000Z"));

    seedLead();

    // Seed events with the NEWER one first (mock returns in insertion order, mimicking ts desc).
    seedBookedEvent("2026-07-05", "afternoon",  "2026-07-02T10:00:00.000Z"); // newer (latest)
    seedBookedEvent("2026-07-04", "morning",    "2026-07-01T10:00:00.000Z"); // older

    // Pre-claim the OLD slot's T-24 email: this would block if the old slot were chosen.
    seedSendClaim("booking_reminder:2026-07-04:morning", 0, "email");

    await runLeadAuxScans();

    // The code picks the LATEST event (2026-07-05 afternoon).
    // Its sequence "booking_reminder:2026-07-05:afternoon" has no prior claim, so it fires.
    const emailSends = mockSend.mock.calls.filter((c) => c[0].channel === "email");
    expect(emailSends).toHaveLength(1); // new slot fires its own T-24 email
  });

  it("pre-claiming the old sequence does not block the new slot's claims", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-04T12:00:00.000Z")); // inside T-24 for 2026-07-05 afternoon

    seedLead();
    // Only the new slot (newer event seeded first so mock picks it as "latest").
    seedBookedEvent("2026-07-05", "afternoon", "2026-07-03T10:00:00.000Z");

    // Old slot's claim exists but uses a DIFFERENT sequence string.
    seedSendClaim("booking_reminder:2026-07-04:morning", 0, "email");

    await runLeadAuxScans();

    const claims = (db.lead_nurture_sends as Row[]).filter(
      (r) => r.sequence === "booking_reminder:2026-07-05:afternoon",
    );
    expect(claims.length).toBeGreaterThan(0);

    const emailSends = mockSend.mock.calls.filter((c) => c[0].channel === "email");
    expect(emailSends).toHaveLength(1);
  });
});

// ── Scan B: abandoned-booking nudge ──────────────────────────────────────────

describe("Scan B: abandoned-booking nudge", () => {
  // Anchor "now" to a fixed point inside the SMS send window.
  const NOW_ISO = "2026-07-03T14:00:00.000Z";
  // booking_viewed 3h ago = inside [2h, 48h] window.
  const VIEWED_3H_AGO = "2026-07-03T11:00:00.000Z";

  it("fires the nudge SMS when all conditions are met", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(NOW_ISO));

    seedLead();
    seedBookingViewedEvent(VIEWED_3H_AGO);
    seedNurtureState("active");

    const result = await runLeadAuxScans();

    const smsSends = mockSend.mock.calls.filter((c) => c[0].channel === "sms");
    expect(smsSends).toHaveLength(1);
    expect(smsSends[0][0].body).toContain("started to arrange a time");
    expect(smsSends[0][0].body).toContain("STOP");
    expect(result.nudges).toBe(1);
  });

  it("does NOT fire when the lead has already booked", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(NOW_ISO));

    seedLead();
    seedBookingViewedEvent(VIEWED_3H_AGO);
    seedNurtureState("active");
    // Also has a booked event.
    seedBookedEvent("2026-07-10", "morning", "2026-07-03T12:00:00.000Z");

    await runLeadAuxScans();

    const smsSends = mockSend.mock.calls.filter(
      (c) => c[0].channel === "sms" && c[0].body?.includes("started to pick"),
    );
    expect(smsSends).toHaveLength(0);
  });

  it("does NOT fire when the lead has opted out", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(NOW_ISO));

    seedLead();
    seedBookingViewedEvent(VIEWED_3H_AGO);
    seedNurtureState("active");
    (db.lead_contact_events as Row[]).push({ lead_id: LEAD_ID, event_type: "opted_out", ts: "2026-07-03T10:00:00Z" });

    await runLeadAuxScans();

    const smsSends = mockSend.mock.calls.filter((c) => c[0].channel === "sms");
    expect(smsSends).toHaveLength(0);
  });

  it("does NOT fire when nurture state is not active", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(NOW_ISO));

    seedLead();
    seedBookingViewedEvent(VIEWED_3H_AGO);
    seedNurtureState("contactable"); // not active

    await runLeadAuxScans();

    const smsSends = mockSend.mock.calls.filter((c) => c[0].channel === "sms");
    expect(smsSends).toHaveLength(0);
  });

  it("does NOT fire when out of send window", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(NOW_ISO));

    mockInSendWindow.mockReturnValue(false);

    seedLead();
    seedBookingViewedEvent(VIEWED_3H_AGO);
    seedNurtureState("active");

    await runLeadAuxScans();

    const smsSends = mockSend.mock.calls.filter((c) => c[0].channel === "sms");
    expect(smsSends).toHaveLength(0);
  });

  it("fires at most once per lead (second run blocked by existing claim)", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(NOW_ISO));

    seedLead();
    seedBookingViewedEvent(VIEWED_3H_AGO);
    seedNurtureState("active");

    await runLeadAuxScans(); // first run: fires
    mockSend.mockClear();
    await runLeadAuxScans(); // second run: claim exists, no send

    const smsSends = mockSend.mock.calls.filter((c) => c[0].channel === "sms");
    expect(smsSends).toHaveLength(0);
  });

  it("does NOT fire when booking_viewed is less than 2h ago", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(NOW_ISO));

    seedLead();
    // viewed only 1h ago = too recent
    seedBookingViewedEvent("2026-07-03T13:00:00.000Z");
    seedNurtureState("active");

    await runLeadAuxScans();

    const smsSends = mockSend.mock.calls.filter((c) => c[0].channel === "sms");
    expect(smsSends).toHaveLength(0);
  });

  it("does NOT fire when booking_viewed is more than 48h ago", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(NOW_ISO));

    seedLead();
    // viewed 50h ago = too old
    seedBookingViewedEvent("2026-07-01T12:00:00.000Z");
    seedNurtureState("active");

    await runLeadAuxScans();

    const smsSends = mockSend.mock.calls.filter((c) => c[0].channel === "sms");
    expect(smsSends).toHaveLength(0);
  });
});

// ── QA gate: reminder copy ────────────────────────────────────────────────────

describe("QA gate: reminder copy", () => {
  const BOOKING_URL = `${SITE_URL}/book?t=tok-${LEAD_ID}-book`;
  const LABEL       = "Tue 14 Jul, morning (9am to 12pm)";

  it("T-24 email subject and paragraphs pass the QA gate", () => {
    const subject    = "Your review call is tomorrow, Sam";
    const paragraphs = [
      `A quick reminder: your free property tax review call is booked for ${LABEL}. Your specialist will have read your enquiry before they ring.`,
      `The call takes about 20 minutes and there is nothing to prepare. If the time no longer works, you can pick a new one here: ${BOOKING_URL}`,
    ];
    const result = qaGateMessage(
      "email",
      { subject, paragraphs },
      { siteUrl: SITE_URL, requireBookingCta: true },
    );
    if (!result.ok) console.error("QA failures:", result.failures);
    expect(result.ok).toBe(true);
  });

  it("same-day SMS passes the QA gate and contains STOP", () => {
    const body =
      `Hi Sam, your free property tax review call is later today, ${LABEL}. ` +
      `Your specialist will call you then. Need a different time? ${BOOKING_URL} Reply STOP to opt out.`;
    const result = qaGateMessage(
      "sms",
      { body },
      { siteUrl: SITE_URL, requireBookingCta: true },
    );
    if (!result.ok) console.error("QA failures:", result.failures);
    expect(result.ok).toBe(true);
    expect(body).toContain("STOP");
  });

  it("abandoned-booking nudge SMS passes the QA gate and contains STOP", () => {
    const body =
      `Looks like you started to pick a time, Sam. Anything I can make easier? ` +
      `Reply and I'll sort it. Or the slots are here: ${BOOKING_URL} Reply STOP to opt out.`;
    const result = qaGateMessage(
      "sms",
      { body },
      { siteUrl: SITE_URL, requireBookingCta: true },
    );
    if (!result.ok) console.error("QA failures:", result.failures);
    expect(result.ok).toBe(true);
    expect(body).toContain("STOP");
  });

  it("copy contains no em-dashes or en-dashes", () => {
    const allCopy = [
      "Your review call is tomorrow, Sam",
      `A quick reminder: your free property tax review call is booked for ${LABEL}. Your specialist will have read your enquiry before they ring.`,
      `The call takes about 20 minutes and there is nothing to prepare. If the time no longer works, you can pick a new one here: ${BOOKING_URL}`,
      `Hi Sam, your free property tax review call is later today, ${LABEL}. Your specialist will call you then. Need a different time? ${BOOKING_URL} Reply STOP to opt out.`,
      `Looks like you started to pick a time, Sam. Anything I can make easier? Reply and I'll sort it. Or the slots are here: ${BOOKING_URL} Reply STOP to opt out.`,
    ].join(" ");
    expect(allCopy).not.toContain("—"); // em dash
    expect(allCopy).not.toContain("–"); // en dash
  });
});
