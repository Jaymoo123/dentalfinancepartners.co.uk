/**
 * Tests for permanent-failure classification in the Twilio send path.
 *
 * Covers:
 *   1. A 400 response with a permanent Twilio error code (21408) causes
 *      twilioSendMessage to throw with permanentSendFailure === true and the
 *      correct providerCode.
 *   2. A 400 response with a non-permanent Twilio error code (30001) throws a
 *      generic Error with no permanentSendFailure marker.
 *   3. PERMANENT_TWILIO_ERROR_CODES contains the four known permanent codes.
 *
 * Mocking style mirrors inbound-twilio.test.ts and leads-submit.test.ts:
 * vi.mock() for module-level dependencies, vi.fn() stubs per scenario,
 * global fetch replaced with a vi.fn() stub scoped to each test.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ── Module mocks (hoisted before imports) ────────────────────────────────────

// Stub Resend so importing channels.ts does not fail at module load time
// (getResend() calls new Resend(key) which would throw without the env key).
vi.mock("@/lib/resend", () => ({
  getResend: () => ({ emails: { send: vi.fn() } }),
}));

// ── Imports (after vi.mock declarations) ─────────────────────────────────────

import { PERMANENT_TWILIO_ERROR_CODES } from "@/lib/leads/channels";
import { isPermanentSendError } from "@accounting-network/web-shared/lead-nurture/config";

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Build a minimal env to satisfy twilioSendMessage's credential check. */
function setTwilioEnv(): void {
  process.env.TWILIO_ACCOUNT_SID = "ACtest000000000000000000000000000000";
  process.env.TWILIO_AUTH_TOKEN = "test-auth-token";
  process.env.TWILIO_SMS_FROM = "+15005550006";
}

function clearTwilioEnv(): void {
  delete process.env.TWILIO_ACCOUNT_SID;
  delete process.env.TWILIO_AUTH_TOKEN;
  delete process.env.TWILIO_SMS_FROM;
  delete process.env.LEAD_NURTURE_ENABLED;
  delete process.env.LEAD_NURTURE_SMS_ENABLED;
}

/**
 * Stub global fetch to return a 400 with the given Twilio-style JSON body.
 * The real channel sender calls fetch() directly, so we replace globalThis.fetch.
 */
function stubFetch(body: object, status = 400): void {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () =>
      new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
      }),
    ),
  );
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("PERMANENT_TWILIO_ERROR_CODES", () => {
  it("contains the four expected permanent error codes", () => {
    expect(PERMANENT_TWILIO_ERROR_CODES.has(21211)).toBe(true); // invalid To number
    expect(PERMANENT_TWILIO_ERROR_CODES.has(21408)).toBe(true); // geo-permission not enabled
    expect(PERMANENT_TWILIO_ERROR_CODES.has(21610)).toBe(true); // recipient unsubscribed
    expect(PERMANENT_TWILIO_ERROR_CODES.has(21614)).toBe(true); // not a valid mobile
  });
});

describe("twilioSendMessage: permanent failure classification", () => {
  beforeEach(() => {
    setTwilioEnv();
  });

  afterEach(() => {
    clearTwilioEnv();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("throws PermanentSendError (permanentSendFailure=true, providerCode=21408) on a 21408 Twilio rejection", async () => {
    stubFetch({ code: 21408, message: "Permission to send an SMS has not been enabled for the region indicated by the To number.", status: 400 });

    // Drive the send path through sendSms (which calls twilioSendMessage internally).
    // We import channels after mocking so the module sees our stubbed fetch.
    const { toE164UK } = await import("@/lib/leads/channels");
    // Confirm our env produces a valid number so the send path is reached.
    expect(toE164UK("+447700900000")).toBe("+447700900000");

    // Re-import to pick up the stubbed fetch. We call buildLeadChannelSender in
    // armed mode and drive it directly so the inner twilioSendMessage path runs.
    process.env.LEAD_NURTURE_ENABLED = "1";
    process.env.LEAD_NURTURE_SMS_ENABLED = "1";
    const { buildLeadChannelSender } = await import("@/lib/leads/channels");
    const sender = buildLeadChannelSender({ live: true });

    let thrown: unknown;
    try {
      await sender.send({ channel: "sms", to: "+447700900000", body: "Test message" });
    } catch (err) {
      thrown = err;
    }

    expect(thrown).toBeDefined();
    expect(isPermanentSendError(thrown)).toBe(true);
    expect((thrown as { providerCode?: number }).providerCode).toBe(21408);
  });

  it("throws a generic Error (no permanentSendFailure marker) on a non-permanent Twilio error (30001)", async () => {
    stubFetch({ code: 30001, message: "Queue overflow", status: 400 });

    process.env.LEAD_NURTURE_ENABLED = "1";
    process.env.LEAD_NURTURE_SMS_ENABLED = "1";
    const { buildLeadChannelSender } = await import("@/lib/leads/channels");
    const sender = buildLeadChannelSender({ live: true });

    let thrown: unknown;
    try {
      await sender.send({ channel: "sms", to: "+447700900000", body: "Test message" });
    } catch (err) {
      thrown = err;
    }

    expect(thrown).toBeDefined();
    expect(isPermanentSendError(thrown)).toBe(false);
    expect(thrown instanceof Error).toBe(true);
  });
});
