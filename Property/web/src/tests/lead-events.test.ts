/**
 * Engagement-signal layer tests.
 *
 * Covers:
 *   1. Webhook route (api/leads/events) — Svix signature verification happy
 *      paths, event recording, unknown provider_id no-op, complaint alert
 *      with 24 h throttle.
 *   2. decideEngagementVariant — pure function unit tests for both rules and
 *      the hesitation-wins-over-channel_shift priority.
 *   3. Sequence step copy — day4_sms and day7_email variant switching,
 *      including the generatedCopy precedence exception for channel_shift.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import crypto from "crypto";

// ── Module mocks (hoisted before imports) ────────────────────────────────────

vi.mock("@accounting-network/web-shared/nurture/admin", () => ({
  adminConfigured: () => true,
}));

const mockAdminSelect = vi.fn();
vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: (...args: unknown[]) => mockAdminSelect(...args),
  adminInsert: vi.fn(() => Promise.resolve({ ok: true, status: 201, data: [] })),
  adminUpdate: vi.fn(() => Promise.resolve({ ok: true, status: 200, data: [] })),
}));

const mockRecordLeadContactEvent = vi.fn().mockResolvedValue(undefined);
vi.mock("@accounting-network/web-shared/lead-nurture/send", () => ({
  recordLeadContactEvent: (...args: unknown[]) => mockRecordLeadContactEvent(...args),
}));

const mockEmailSend = vi.fn().mockResolvedValue({ id: "resend-test-id" });
vi.mock("@/lib/resend", () => ({
  getResend: () => ({ emails: { send: mockEmailSend } }),
  getFromAddress: () => "Test Sender <from@test.com>",
}));

vi.mock("@/lib/lead-routing", () => ({
  resolveLeadTo: () => "operator@test.com",
}));

vi.mock("@/config/niche-loader", () => ({
  getSiteUrl: () => "https://www.propertytaxpartners.co.uk",
}));

// ── Imports (after mocks) ─────────────────────────────────────────────────────

import { NextRequest } from "next/server";
import { POST } from "@/app/api/leads/events/route";
import {
  decideEngagementVariant,
  buildPropertyLeadNurtureConfig,
} from "@/config/lead-nurture";
import type { LeadMessageContext } from "@accounting-network/web-shared/lead-nurture/config";

// ── Signature helpers ─────────────────────────────────────────────────────────

const TEST_SECRET_BYTES = Buffer.from("test-lead-webhook-secret-32chars");
const TEST_SECRET = "whsec_" + TEST_SECRET_BYTES.toString("base64");

/**
 * Build a NextRequest carrying a valid Svix signature for the given payload.
 * Mirrors the exact signing algorithm in verifyResendWebhook.
 */
function makeSignedRequest(payload: unknown, options: { secret?: string } = {}): NextRequest {
  const body = JSON.stringify(payload);
  const secret = options.secret ?? TEST_SECRET;
  const id = "msg-test-123";
  const ts = String(Math.floor(Date.now() / 1000));

  const cleanSecret = secret.startsWith("whsec_") ? secret.slice(6) : secret;
  const secretBytes = Buffer.from(cleanSecret, "base64");
  const signedPayload = `${id}.${ts}.${body}`;
  const sig = crypto.createHmac("sha256", secretBytes).update(signedPayload).digest("base64");

  return new NextRequest("http://localhost/api/leads/events", {
    method: "POST",
    body,
    headers: new Headers({
      "content-type": "application/json",
      "svix-id": id,
      "svix-timestamp": ts,
      "svix-signature": `v1,${sig}`,
    }),
  });
}

/** Default adminSelect stub: no send row found (unknown provider_id). */
function stubNoSend() {
  mockAdminSelect.mockResolvedValue({ ok: true, status: 200, data: [] });
}

/** Stub: return a specific send row, then empty for subsequent calls. */
function stubSendRow(row: { lead_id: string; step: number }) {
  mockAdminSelect.mockResolvedValueOnce({ ok: true, status: 200, data: [row] });
  // Subsequent calls (e.g. complaint alert throttle check) return empty.
  mockAdminSelect.mockResolvedValue({ ok: true, status: 200, data: [] });
}

// ── 1. Webhook route ─────────────────────────────────────────────────────────

describe("POST /api/leads/events", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV, LEAD_RESEND_WEBHOOK_SECRET: TEST_SECRET };
    mockAdminSelect.mockReset();
    mockRecordLeadContactEvent.mockReset().mockResolvedValue(undefined);
    mockEmailSend.mockReset().mockResolvedValue({ id: "resend-test-id" });
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it("returns 503 when LEAD_RESEND_WEBHOOK_SECRET is not set", async () => {
    delete process.env.LEAD_RESEND_WEBHOOK_SECRET;
    const req = new NextRequest("http://localhost/api/leads/events", {
      method: "POST",
      body: "{}",
      headers: new Headers({ "content-type": "application/json" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(503);
  });

  it("returns 401 when Svix signature is invalid", async () => {
    const body = JSON.stringify({ type: "email.opened", data: { email_id: "msg-123" } });
    const req = new NextRequest("http://localhost/api/leads/events", {
      method: "POST",
      body,
      headers: new Headers({
        "content-type": "application/json",
        "svix-id": "msg-test-123",
        "svix-timestamp": String(Math.floor(Date.now() / 1000)),
        "svix-signature": "v1,invalidsignature",
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("returns 200 and records opened event with step meta", async () => {
    stubSendRow({ lead_id: "lead-abc-123", step: 4 });
    const req = makeSignedRequest({
      type: "email.opened",
      data: { email_id: "resend-msg-111" },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(mockRecordLeadContactEvent).toHaveBeenCalledWith(
      "lead-abc-123",
      "opened",
      "email",
      { step: 4 },
    );
  });

  it("returns 200 and records clicked event with step + url meta", async () => {
    stubSendRow({ lead_id: "lead-abc-456", step: 6 });
    const req = makeSignedRequest({
      type: "email.clicked",
      data: {
        email_id: "resend-msg-222",
        click: { link: "https://www.propertytaxpartners.co.uk/book?t=tok" },
      },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(mockRecordLeadContactEvent).toHaveBeenCalledWith(
      "lead-abc-456",
      "clicked",
      "email",
      { step: 6, url: "https://www.propertytaxpartners.co.uk/book?t=tok" },
    );
  });

  it("returns 200 without recording when provider_id is unknown", async () => {
    stubNoSend();
    const req = makeSignedRequest({
      type: "email.opened",
      data: { email_id: "subscriber-msg-999" },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(mockRecordLeadContactEvent).not.toHaveBeenCalled();
  });

  it("records send_failed with kind=bounce for email.bounced", async () => {
    stubSendRow({ lead_id: "lead-bounce-001", step: 2 });
    const req = makeSignedRequest({
      type: "email.bounced",
      data: { email_id: "resend-msg-333" },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(mockRecordLeadContactEvent).toHaveBeenCalledWith(
      "lead-bounce-001",
      "send_failed",
      "email",
      { step: 2, kind: "bounce" },
    );
  });

  it("records send_failed with kind=complaint for email.complained", async () => {
    // First call: send row. Second call: throttle check (no recent alert).
    // Third call: fetchLeadForAlert.
    mockAdminSelect
      .mockResolvedValueOnce({ ok: true, status: 200, data: [{ lead_id: "lead-cmp-001", step: 3 }] })
      .mockResolvedValueOnce({ ok: true, status: 200, data: [] }) // throttle check
      .mockResolvedValueOnce({ ok: true, status: 200, data: [{ id: "lead-cmp-001", full_name: "Jane Smith", source: "property" }] }); // lead fetch

    process.env.RESEND_API_KEY = "test-key";

    const req = makeSignedRequest({
      type: "email.complained",
      data: { email_id: "resend-msg-444" },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    // send_failed recorded first
    expect(mockRecordLeadContactEvent).toHaveBeenCalledWith(
      "lead-cmp-001",
      "send_failed",
      "email",
      { step: 3, kind: "complaint" },
    );
    // alert email sent
    expect(mockEmailSend).toHaveBeenCalledTimes(1);
    const callArgs = mockEmailSend.mock.calls[0][0] as { subject: string };
    expect(callArgs.subject).toContain("Jane Smith");
    // operator_update event recorded
    expect(mockRecordLeadContactEvent).toHaveBeenCalledWith(
      "lead-cmp-001",
      "operator_update",
      "email",
      { kind: "complaint_alert" },
    );
  });

  it("skips the alert email when a recent complaint_alert already exists (throttle)", async () => {
    const recentAlertEvent = {
      id: "evt-999",
      created_at: new Date(Date.now() - 60_000).toISOString(),
      meta: { kind: "complaint_alert" },
    };
    mockAdminSelect
      .mockResolvedValueOnce({ ok: true, status: 200, data: [{ lead_id: "lead-cmp-002", step: 5 }] })
      .mockResolvedValueOnce({ ok: true, status: 200, data: [recentAlertEvent] }); // throttle check finds one

    process.env.RESEND_API_KEY = "test-key";

    const req = makeSignedRequest({
      type: "email.complained",
      data: { email_id: "resend-msg-555" },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    // send_failed is still recorded
    expect(mockRecordLeadContactEvent).toHaveBeenCalledWith(
      "lead-cmp-002",
      "send_failed",
      "email",
      { step: 5, kind: "complaint" },
    );
    // alert email NOT sent
    expect(mockEmailSend).not.toHaveBeenCalled();
    // operator_update NOT recorded
    expect(mockRecordLeadContactEvent).not.toHaveBeenCalledWith(
      expect.anything(),
      "operator_update",
      expect.anything(),
      { kind: "complaint_alert" },
    );
  });
});

// ── 2. decideEngagementVariant ────────────────────────────────────────────────

describe("decideEngagementVariant", () => {
  const now = Date.now();
  const TWENTY_FIVE_H_AGO = new Date(now - 25 * 60 * 60 * 1000).toISOString();
  const TWENTY_THREE_H_AGO = new Date(now - 23 * 60 * 60 * 1000).toISOString();

  it("returns undefined when there are no events and send count < 3", () => {
    expect(decideEngagementVariant([], 2)).toBeUndefined();
  });

  it("returns undefined when clicked but click is < 24 h old", () => {
    const events = [{ event_type: "clicked", created_at: TWENTY_THREE_H_AGO }];
    expect(decideEngagementVariant(events, 0)).toBeUndefined();
  });

  it("returns undefined when clicked >= 24 h old but booked exists", () => {
    const events = [
      { event_type: "clicked", created_at: TWENTY_FIVE_H_AGO },
      { event_type: "booked", created_at: new Date(now - 60_000).toISOString() },
    ];
    // Use a send count below the channel_shift threshold so only the
    // hesitation rule is in play; booked correctly blocks it.
    expect(decideEngagementVariant(events, 2)).toBeUndefined();
  });

  it("returns hesitation when clicked >= 24 h old and no booking", () => {
    const events = [{ event_type: "clicked", created_at: TWENTY_FIVE_H_AGO }];
    expect(decideEngagementVariant(events, 5)).toBe("hesitation");
  });

  it("returns hesitation when clicked >= 24 h old even if emailSendCount >= 3 and no opens (hesitation wins)", () => {
    const events = [{ event_type: "clicked", created_at: TWENTY_FIVE_H_AGO }];
    // Both rules would fire, but hesitation takes priority.
    expect(decideEngagementVariant(events, 4)).toBe("hesitation");
  });

  it("returns channel_shift when emailSendCount >= 3 and no opens", () => {
    expect(decideEngagementVariant([], 3)).toBe("channel_shift");
    expect(decideEngagementVariant([], 10)).toBe("channel_shift");
  });

  it("returns channel_shift when emailSendCount >= 3 and no opens even with booked event present", () => {
    // booked blocks hesitation; channel_shift still applies
    const events = [{ event_type: "booked", created_at: TWENTY_FIVE_H_AGO }];
    expect(decideEngagementVariant(events, 3)).toBe("channel_shift");
  });

  it("returns undefined when emailSendCount >= 3 but there are open events", () => {
    const events = [{ event_type: "opened", created_at: TWENTY_FIVE_H_AGO }];
    expect(decideEngagementVariant(events, 5)).toBeUndefined();
  });

  it("returns undefined when emailSendCount is exactly 2 and no opens", () => {
    expect(decideEngagementVariant([], 2)).toBeUndefined();
  });
});

// ── 3. Sequence step copy switching ──────────────────────────────────────────

const config = buildPropertyLeadNurtureConfig();
const { steps } = config;

const BASE_CTX: LeadMessageContext = {
  firstName: "Jordan",
  bookingUrl: "https://www.propertytaxpartners.co.uk/book?t=tok123",
  confirmUrl: "https://www.propertytaxpartners.co.uk/api/leads/confirm/tok456",
  optOutUrl: "https://www.propertytaxpartners.co.uk/api/leads/optout/tok789",
  optOutText: "Reply STOP to opt out.",
  siteUrl: "https://www.propertytaxpartners.co.uk",
  callGoalEcho: "understand your portfolio tax position",
  variant: "t0_branded",
  qualityScore: 3,
};

describe("day4_sms copy variants", () => {
  const step = steps.find((s) => s.key === "day4_sms")!;

  it("uses static copy when no engagementVariant", () => {
    const msgs = step.buildMessages({ ...BASE_CTX, engagementVariant: undefined });
    const sms = msgs.find((m) => m.channel === "sms");
    expect(sms?.body).toContain("second-guessing");
    expect(sms?.body).not.toContain("no-strings");
  });

  it("uses hesitation copy when engagementVariant is hesitation", () => {
    const msgs = step.buildMessages({ ...BASE_CTX, engagementVariant: "hesitation" });
    const sms = msgs.find((m) => m.channel === "sms");
    expect(sms?.body).toContain("no-strings");
    expect(sms?.body?.toUpperCase()).toContain("REPLY YES");
    expect(sms?.body).toContain("Reply STOP");
  });

  it("does not use hesitation body when engagementVariant is channel_shift", () => {
    const msgs = step.buildMessages({ ...BASE_CTX, engagementVariant: "channel_shift" });
    const sms = msgs.find((m) => m.channel === "sms");
    // channel_shift does not affect day4_sms; falls back to static copy
    expect(sms?.body).toContain("second-guessing");
  });

  it("generatedCopy wins over hesitation body when present", () => {
    const customSms = "CUSTOM GENERATED: special hesitation override";
    const msgs = step.buildMessages({
      ...BASE_CTX,
      engagementVariant: "hesitation",
      generatedCopy: { day4_sms: { sms: customSms } },
    });
    const sms = msgs.find((m) => m.channel === "sms");
    expect(sms?.body).toBe(customSms);
    expect(sms?.body).not.toContain("no-strings");
  });

  it("hesitation body contains opt-out instruction", () => {
    const msgs = step.buildMessages({ ...BASE_CTX, engagementVariant: "hesitation" });
    const sms = msgs.find((m) => m.channel === "sms");
    expect(sms?.body?.toUpperCase()).toContain("STOP");
  });

  it("no em-dash in hesitation copy", () => {
    const msgs = step.buildMessages({ ...BASE_CTX, engagementVariant: "hesitation" });
    const blob = msgs.map((m) => m.body ?? "").join(" ");
    expect(blob).not.toContain("—");
    expect(blob).not.toContain("–");
  });
});

describe("day7_email copy variants", () => {
  const step = steps.find((s) => s.key === "day7_email")!;

  it("returns an email with standard p2 when no engagementVariant", () => {
    const msgs = step.buildMessages({ ...BASE_CTX, engagementVariant: undefined });
    expect(msgs).toHaveLength(1);
    expect(msgs[0].channel).toBe("email");
    const blob = (msgs[0].html ?? "") + (msgs[0].text ?? "");
    expect(blob).toContain("If a short call would help");
    expect(blob).not.toContain("holding you back");
  });

  it("returns an email with hesitation p2 when engagementVariant is hesitation", () => {
    const msgs = step.buildMessages({ ...BASE_CTX, engagementVariant: "hesitation" });
    expect(msgs).toHaveLength(1);
    expect(msgs[0].channel).toBe("email");
    const blob = (msgs[0].html ?? "") + (msgs[0].text ?? "");
    expect(blob).toContain("holding you back");
    expect(blob).not.toContain("understand your portfolio tax position");
  });

  it("returns SMS (not email) when engagementVariant is channel_shift", () => {
    const msgs = step.buildMessages({ ...BASE_CTX, engagementVariant: "channel_shift" });
    expect(msgs).toHaveLength(1);
    expect(msgs[0].channel).toBe("sms");
    expect(msgs[0].body).toContain("our emails may not be reaching you");
    expect(msgs[0].body?.toUpperCase()).toContain("REPLY YES");
    expect(msgs[0].body).toContain("Reply STOP");
  });

  it("channel_shift SMS bypasses generatedCopy (deliverability trumps personalisation)", () => {
    const msgs = step.buildMessages({
      ...BASE_CTX,
      engagementVariant: "channel_shift",
      generatedCopy: {
        day7_email: {
          subject: "GENERATED subject",
          paragraphs: ["GENERATED paragraph one", "GENERATED paragraph two"],
        },
      },
    });
    // Must still return SMS, not the generated email
    expect(msgs[0].channel).toBe("sms");
    expect(msgs[0].body).toContain("our emails may not be reaching you");
    expect(msgs[0].body).not.toContain("GENERATED");
  });

  it("generatedCopy wins over hesitation p2 (normal precedence)", () => {
    const msgs = step.buildMessages({
      ...BASE_CTX,
      engagementVariant: "hesitation",
      generatedCopy: {
        day7_email: {
          subject: "Generated subject",
          paragraphs: ["Generated paragraph one", "Generated paragraph two"],
        },
      },
    });
    expect(msgs[0].channel).toBe("email");
    const blob = (msgs[0].html ?? "") + (msgs[0].text ?? "");
    expect(blob).toContain("Generated paragraph two");
    expect(blob).not.toContain("holding you back");
  });

  it("no em-dash in any variant", () => {
    const variants: Array<"hesitation" | "channel_shift" | undefined> = [
      undefined,
      "hesitation",
      "channel_shift",
    ];
    for (const v of variants) {
      const msgs = step.buildMessages({ ...BASE_CTX, engagementVariant: v });
      const blob = msgs
        .map((m) => [m.subject, m.html, m.text, m.body].filter(Boolean).join(" "))
        .join(" ");
      expect(blob, `no em-dash in ${v ?? "default"} variant`).not.toContain("—");
      expect(blob, `no en-dash in ${v ?? "default"} variant`).not.toContain("–");
    }
  });
});
