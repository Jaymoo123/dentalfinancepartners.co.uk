/**
 * Tests for POST /api/leads/inbound/twilio
 *
 * Covers:
 * 1. Signature verification: correct HMAC-SHA1 accepted; wrong sig -> 403;
 *    missing TWILIO_AUTH_TOKEN -> 503.
 * 2. URL reconstruction: forwarded request with :443 in the host is accepted
 *    (port-strip correctness); a signature computed over the un-stripped URL
 *    is rejected (403).
 * 3. Intent routing with valid sig + resolvable lead:
 *    - "STOP" / "please stop" -> stopNurture called, NOT recordResponseAndEvaluate
 *    - "YES"                  -> recordResponseAndEvaluate('replied') called
 *    - ambiguous body         -> recordLeadContactEvent operator_update/needs_review only
 * 4. Unknown sender (no lead resolved) -> 200 TwiML, no side effects.
 * 5. Unrecognisable phone (toE164UK returns null) -> 200 TwiML, no side effects.
 * 6. Response is always 200 with empty TwiML and Content-Type: text/xml.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import crypto from "crypto";
import { NextRequest } from "next/server";

// ── Constants ─────────────────────────────────────────────────────────────────

const TEST_AUTH_TOKEN = "test-twilio-auth-token-xyz";
const ROUTE_URL = "http://localhost:3000/api/leads/inbound/twilio";
const KNOWN_E164 = "+447700900123";
const KNOWN_LEAD_ID = "lead-twilio-001";

// ── HMAC helper (mirrors the route's verifyTwilioSignature) ───────────────────

function computeTwilioSig(
  authToken: string,
  url: string,
  params: URLSearchParams,
): string {
  const sortedKeys = Array.from(params.keys()).sort();
  const str = sortedKeys.reduce(
    (acc, key) => acc + key + (params.get(key) ?? ""),
    url,
  );
  return crypto.createHmac("sha1", authToken).update(str).digest("base64");
}

// ── Module mocks (hoisted by Vitest before imports) ───────────────────────────

const mockAdminSelect = vi.fn();
vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: (...args: unknown[]) => mockAdminSelect(...args),
  adminInsert: vi.fn(() => Promise.resolve({ ok: true, status: 201, data: [] })),
  adminUpdate: vi.fn(() => Promise.resolve({ ok: true, status: 200, data: [] })),
}));

// Inline the pure toE164UK logic so we don't need to load the full channels
// module (which pulls in Resend/Twilio SDK env setup at module load time).
vi.mock("@/lib/leads/channels", () => ({
  toE164UK: (raw: string): string | null => {
    const s = (raw || "").replace(/[\s()\-.]/g, "");
    if (!s) return null;
    if (s.startsWith("+")) return /^\+\d{8,15}$/.test(s) ? s : null;
    if (s.startsWith("00")) {
      const e = "+" + s.slice(2);
      return /^\+\d{8,15}$/.test(e) ? e : null;
    }
    if (s.startsWith("0")) {
      const e = "+44" + s.slice(1);
      return /^\+44\d{9,10}$/.test(e) ? e : null;
    }
    if (/^\d{9,10}$/.test(s)) return "+44" + s;
    return null;
  },
}));

const mockStopNurture = vi.fn().mockResolvedValue(undefined);
const mockRecordResponseAndEvaluate = vi.fn().mockResolvedValue({
  promoted: false,
  alreadyPromoted: false,
  reason: "test",
});
vi.mock("@/lib/leads/contactability", () => ({
  stopNurture: (...args: unknown[]) => mockStopNurture(...args),
  recordResponseAndEvaluate: (...args: unknown[]) =>
    mockRecordResponseAndEvaluate(...args),
}));

const mockAcknowledgeReply = vi.fn().mockResolvedValue(undefined);
vi.mock("@/lib/leads/reply-ack", () => ({
  acknowledgeReply: (...args: unknown[]) => mockAcknowledgeReply(...args),
}));

const mockConciergeEnabled = vi.fn().mockReturnValue(false);
const mockHandleInboundReply = vi.fn().mockResolvedValue(undefined);
vi.mock("@/lib/leads/concierge", () => ({
  conciergeEnabled: () => mockConciergeEnabled(),
  handleInboundReply: (...args: unknown[]) => mockHandleInboundReply(...args),
}));

const mockRecordLeadContactEvent = vi.fn().mockResolvedValue(undefined);
vi.mock("@accounting-network/web-shared/lead-nurture/send", () => ({
  recordLeadContactEvent: (...args: unknown[]) =>
    mockRecordLeadContactEvent(...args),
}));

// ── Imports (after mocks) ─────────────────────────────────────────────────────

import { POST } from "@/app/api/leads/inbound/twilio/route";

// ── Request builder ───────────────────────────────────────────────────────────

interface MakeRequestOpts {
  /** Twilio From field (default: KNOWN_E164 UK mobile). */
  from?: string;
  /** Twilio Body field (SMS text). */
  body?: string;
  /** Auth token used to compute the signature (default: TEST_AUTH_TOKEN). */
  authToken?: string;
  /** Force a wrong signature instead of a correctly computed one. */
  wrongSig?: boolean;
  /** x-forwarded-proto header (e.g. "https"). */
  forwardedProto?: string;
  /** x-forwarded-host header (e.g. "www.propertytaxpartners.co.uk:443"). */
  forwardedHost?: string;
  /** The URL the NextRequest is constructed with (default: ROUTE_URL). */
  internalUrl?: string;
}

function makeRequest(opts: MakeRequestOpts = {}): NextRequest {
  const internalUrl = opts.internalUrl ?? ROUTE_URL;
  const from = opts.from ?? KNOWN_E164;
  const msgBody = opts.body ?? "";

  // Build the form-encoded body identical to what Twilio POSTs.
  const formData = new URLSearchParams();
  formData.set("Body", msgBody);
  formData.set("From", from);
  formData.set("MessageSid", "SM" + "0".repeat(32));
  const rawBody = formData.toString();

  // Determine the URL Twilio would have signed.
  // Mirrors the route's URL reconstruction so the HMAC matches.
  let sigUrl = internalUrl;
  if (opts.forwardedProto && opts.forwardedHost) {
    const parsed = new URL(internalUrl);
    parsed.protocol = opts.forwardedProto.split(",")[0].trim() + ":";
    parsed.host = opts.forwardedHost.split(",")[0].trim();
    parsed.port = ""; // strip default port, same as the route does
    sigUrl = parsed.toString();
  }

  const authToken = opts.authToken ?? TEST_AUTH_TOKEN;
  const params = new URLSearchParams(rawBody);
  const sig = opts.wrongSig
    ? "badsignatureXXXXXXXXXXXXXXXXXX=="
    : computeTwilioSig(authToken, sigUrl, params);

  const headers = new Headers({
    "content-type": "application/x-www-form-urlencoded",
    "x-twilio-signature": sig,
  });
  if (opts.forwardedProto) headers.set("x-forwarded-proto", opts.forwardedProto);
  if (opts.forwardedHost) headers.set("x-forwarded-host", opts.forwardedHost);

  return new NextRequest(internalUrl, {
    method: "POST",
    body: rawBody,
    headers,
  });
}

// ── adminSelect stubs ─────────────────────────────────────────────────────────

/** resolveLeadId finds the lead in lead_verification on the first query. */
function stubLeadFound() {
  mockAdminSelect.mockResolvedValueOnce({
    ok: true,
    status: 200,
    data: [{ lead_id: KNOWN_LEAD_ID }],
  });
}

/** resolveLeadId finds nothing in either table. */
function stubLeadNotFound() {
  mockAdminSelect.mockResolvedValue({ ok: true, status: 200, data: [] });
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("POST /api/leads/inbound/twilio", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV, TWILIO_AUTH_TOKEN: TEST_AUTH_TOKEN };
    mockAdminSelect.mockReset();
    mockStopNurture.mockReset().mockResolvedValue(undefined);
    mockRecordResponseAndEvaluate.mockReset().mockResolvedValue({
      promoted: false,
      alreadyPromoted: false,
      reason: "test",
    });
    mockAcknowledgeReply.mockReset().mockResolvedValue(undefined);
    mockConciergeEnabled.mockReset().mockReturnValue(false);
    mockHandleInboundReply.mockReset().mockResolvedValue(undefined);
    mockRecordLeadContactEvent.mockReset().mockResolvedValue(undefined);
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  // ── 1. Signature verification ──────────────────────────────────────────────

  describe("signature verification", () => {
    it("accepts a request with a correct x-twilio-signature", async () => {
      stubLeadNotFound();
      const req = makeRequest();
      const res = await POST(req);
      expect(res.status).toBe(200);
    });

    it("rejects a request with a wrong x-twilio-signature (403)", async () => {
      const req = makeRequest({ wrongSig: true });
      const res = await POST(req);
      expect(res.status).toBe(403);
    });

    it("returns 503 when TWILIO_AUTH_TOKEN is not set", async () => {
      delete process.env.TWILIO_AUTH_TOKEN;
      const req = makeRequest();
      const res = await POST(req);
      expect(res.status).toBe(503);
    });
  });

  // ── 2. URL reconstruction (port-strip) ────────────────────────────────────

  describe("URL reconstruction", () => {
    it("accepts a forwarded request with :443 in x-forwarded-host (port is stripped before HMAC)", async () => {
      stubLeadNotFound();
      // Signature is computed over the port-stripped URL (no :443).
      // If the route's port-strip logic regressed, the HMAC would not match -> 403.
      const req = makeRequest({
        forwardedProto: "https",
        forwardedHost: "www.propertytaxpartners.co.uk:443",
        internalUrl: "http://internal.example.com:3000/api/leads/inbound/twilio",
      });
      const res = await POST(req);
      expect(res.status).toBe(200);
    });

    it("rejects a forwarded request signed over the un-stripped port URL (403)", async () => {
      // Sign the URL with :443 still present.  The route will strip the port
      // before verifying, so the HMACs differ -> 403.
      const rawBody = new URLSearchParams({
        Body: "",
        From: KNOWN_E164,
        MessageSid: "SM" + "0".repeat(32),
      }).toString();
      const params = new URLSearchParams(rawBody);
      const urlWithPort =
        "https://www.propertytaxpartners.co.uk:443/api/leads/inbound/twilio";
      const sig = computeTwilioSig(TEST_AUTH_TOKEN, urlWithPort, params);

      const req = new NextRequest(
        "http://internal.example.com:3000/api/leads/inbound/twilio",
        {
          method: "POST",
          body: rawBody,
          headers: new Headers({
            "content-type": "application/x-www-form-urlencoded",
            "x-twilio-signature": sig,
            "x-forwarded-proto": "https",
            "x-forwarded-host": "www.propertytaxpartners.co.uk:443",
          }),
        },
      );
      const res = await POST(req);
      expect(res.status).toBe(403);
    });
  });

  // ── 3. Intent routing ─────────────────────────────────────────────────────

  describe("intent routing (valid sig + resolvable lead)", () => {
    it('body "STOP" -> stopNurture called, NOT recordResponseAndEvaluate', async () => {
      stubLeadFound();
      const res = await POST(makeRequest({ body: "STOP" }));
      expect(res.status).toBe(200);
      expect(mockStopNurture).toHaveBeenCalledWith(KNOWN_LEAD_ID, "sms");
      expect(mockRecordResponseAndEvaluate).not.toHaveBeenCalled();
    });

    it('body "please stop" -> stopNurture called, NOT recordResponseAndEvaluate', async () => {
      stubLeadFound();
      const res = await POST(makeRequest({ body: "please stop" }));
      expect(res.status).toBe(200);
      expect(mockStopNurture).toHaveBeenCalledWith(KNOWN_LEAD_ID, "sms");
      expect(mockRecordResponseAndEvaluate).not.toHaveBeenCalled();
    });

    it('body "YES" -> recordResponseAndEvaluate called with "replied"', async () => {
      stubLeadFound();
      const res = await POST(makeRequest({ body: "YES" }));
      expect(res.status).toBe(200);
      expect(mockRecordResponseAndEvaluate).toHaveBeenCalledWith(
        KNOWN_LEAD_ID,
        "replied",
        "sms",
        { body: "YES" },
      );
      expect(mockStopNurture).not.toHaveBeenCalled();
    });

    it('ambiguous body "who is this" -> recordLeadContactEvent operator_update/needs_review; NOT stopNurture or recordResponseAndEvaluate', async () => {
      stubLeadFound();
      const res = await POST(makeRequest({ body: "who is this" }));
      expect(res.status).toBe(200);
      expect(mockRecordLeadContactEvent).toHaveBeenCalledWith(
        KNOWN_LEAD_ID,
        "operator_update",
        "sms",
        expect.objectContaining({ kind: "needs_review" }),
      );
      expect(mockStopNurture).not.toHaveBeenCalled();
      expect(mockRecordResponseAndEvaluate).not.toHaveBeenCalled();
    });
  });

  // ── 4. Unknown sender (no lead resolved) ──────────────────────────────────

  describe("unknown sender", () => {
    it("no lead found for phone -> 200 TwiML, no side effects", async () => {
      stubLeadNotFound();
      const res = await POST(makeRequest({ body: "YES" }));
      expect(res.status).toBe(200);
      expect(mockStopNurture).not.toHaveBeenCalled();
      expect(mockRecordResponseAndEvaluate).not.toHaveBeenCalled();
      expect(mockRecordLeadContactEvent).not.toHaveBeenCalled();
    });
  });

  // ── 5. Unrecognisable phone ────────────────────────────────────────────────

  describe("unrecognisable phone", () => {
    it("malformed From field (toE164UK returns null) -> 200 TwiML, no side effects", async () => {
      // "abc" does not satisfy any E.164 UK pattern.
      const res = await POST(makeRequest({ from: "abc", body: "YES" }));
      expect(res.status).toBe(200);
      // adminSelect is never called because we bail out before resolveLeadId.
      expect(mockAdminSelect).not.toHaveBeenCalled();
      expect(mockStopNurture).not.toHaveBeenCalled();
      expect(mockRecordResponseAndEvaluate).not.toHaveBeenCalled();
      expect(mockRecordLeadContactEvent).not.toHaveBeenCalled();
    });
  });

  // ── 6. Response format ────────────────────────────────────────────────────

  describe("response format", () => {
    it("always returns 200 with empty TwiML body and text/xml Content-Type", async () => {
      stubLeadFound();
      const res = await POST(makeRequest({ body: "YES" }));
      expect(res.status).toBe(200);
      expect(res.headers.get("Content-Type")).toContain("text/xml");
      const text = await res.text();
      expect(text).toContain("<Response>");
      expect(text).toContain("</Response>");
    });

    it("returns 200 with TwiML even for an opt-out message (so Twilio does not retry)", async () => {
      stubLeadFound();
      const res = await POST(makeRequest({ body: "STOP" }));
      expect(res.status).toBe(200);
      expect(res.headers.get("Content-Type")).toContain("text/xml");
    });

    it("returns 200 with TwiML for an unknown sender", async () => {
      stubLeadNotFound();
      const res = await POST(makeRequest({ body: "hello" }));
      expect(res.status).toBe(200);
      expect(res.headers.get("Content-Type")).toContain("text/xml");
    });
  });
});
