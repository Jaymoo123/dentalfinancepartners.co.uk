import { describe, it, expect } from "vitest";
import {
  MINI_MESSAGE_MIN_CHARS,
  MINI_MESSAGE_MIN_WORDS,
  OTHER_ROLE_VALUE,
  ROLE_DETAIL_MAX_CHARS,
  validateStep1,
  validateStep2,
  buildRoleExtras,
  isSafeReturnPath,
  buildThankYouUrl,
} from "../lib/leads/capture-steps";

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

// Exactly 20 chars, 4 words: both floors met at the minimum boundary.
// O-n-e(3) + sp(1) + t-w-o(3) + sp(1) + t-h-r-e-e(5) + sp(1) + e-n-o-u-g-h(6) = 20
const MSG_VALID = "One two three enough";

// 20+ chars but only 3 words: char floor met, word floor NOT met (needs 4).
const MSG_20C_3W = "One two threeaaaaaaaaaaaaaaaaaaaaaaaaaaa";

const VALID_S1 = { role: "Landlord", roleDetail: "", message: MSG_VALID };
const VALID_S2 = { fullName: "Jane Smith", email: "jane@example.com", phone: "07700900123" };

// ---------------------------------------------------------------------------
// validateStep1 — step-1 matrix
// ---------------------------------------------------------------------------

describe("validateStep1", () => {
  it("fails when role is empty", () => {
    const errs = validateStep1({ ...VALID_S1, role: "" });
    expect(errs.role).toBe("Select what best describes you.");
  });

  it("fails when role is Other and roleDetail is empty", () => {
    const errs = validateStep1({ role: OTHER_ROLE_VALUE, roleDetail: "", message: MSG_VALID });
    expect(errs.role).toBeUndefined();
    expect(errs.roleDetail).toBe("Tell us what best describes you.");
  });

  it("passes when role is Other and roleDetail is provided", () => {
    const errs = validateStep1({
      role: OTHER_ROLE_VALUE,
      roleDetail: "Property developer",
      message: MSG_VALID,
    });
    expect(errs.role).toBeUndefined();
    expect(errs.roleDetail).toBeUndefined();
    expect(errs.message).toBeUndefined();
  });

  it("fails when message is 39 chars (below char floor)", () => {
    const errs = validateStep1({ ...VALID_S1, message: "a".repeat(MINI_MESSAGE_MIN_CHARS - 1) });
    expect(errs.message).toBe(
      "Please give a little more detail (a sentence or two) so the right specialist can help.",
    );
  });

  it("fails when message is 20+ chars but only 3 words (below word floor of 4)", () => {
    expect(MSG_20C_3W.length).toBeGreaterThanOrEqual(20);
    expect(MSG_20C_3W.trim().split(/\s+/).filter(Boolean).length).toBe(3);
    const errs = validateStep1({ ...VALID_S1, message: MSG_20C_3W });
    expect(errs.message).toBeDefined();
  });

  it("passes when message meets both char and word floors", () => {
    expect(MSG_VALID.length).toBe(MINI_MESSAGE_MIN_CHARS);
    expect(MSG_VALID.trim().split(/\s+/).filter(Boolean).length).toBe(MINI_MESSAGE_MIN_WORDS);
    const errs = validateStep1(VALID_S1);
    expect(errs.message).toBeUndefined();
  });

  it("opts.minChars=0 and opts.minWords=0 lets an empty message through", () => {
    const errs = validateStep1({ ...VALID_S1, message: "" }, { minChars: 0, minWords: 0 });
    expect(errs.message).toBeUndefined();
  });

  it("opts.minChars override at a higher threshold rejects a message that would otherwise pass", () => {
    const errs = validateStep1({ ...VALID_S1, message: MSG_VALID }, { minChars: 100 });
    expect(errs.message).toBeDefined();
  });

  it("opts.minWords override at a higher threshold rejects a valid-char message", () => {
    // MSG_VALID has 4 words; require 20 words
    const errs = validateStep1({ ...VALID_S1, message: MSG_VALID }, { minWords: 20 });
    expect(errs.message).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// validateStep2 — field-floor parity
// ---------------------------------------------------------------------------

describe("validateStep2", () => {
  it("returns no errors for a fully valid payload", () => {
    expect(validateStep2(VALID_S2)).toEqual({});
  });

  it("errors on an empty name", () => {
    const errs = validateStep2({ ...VALID_S2, fullName: "" });
    expect(errs.fullName).toBeDefined();
  });

  it("errors on a malformed email", () => {
    const errs = validateStep2({ ...VALID_S2, email: "notanemail" });
    expect(errs.email).toBeDefined();
  });

  it("errors on a phone number with too few digits", () => {
    const errs = validateStep2({ ...VALID_S2, phone: "123" });
    expect(errs.phone).toBeDefined();
  });

  it("accepts a well-formed email with subdomain", () => {
    const errs = validateStep2({ ...VALID_S2, email: "user@mail.example.co.uk" });
    expect(errs.email).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// buildRoleExtras
// ---------------------------------------------------------------------------

describe("buildRoleExtras", () => {
  it("returns role_detail object when role is Other and detail is non-empty", () => {
    expect(buildRoleExtras(OTHER_ROLE_VALUE, "Property developer")).toEqual({
      role_detail: "Property developer",
    });
  });

  it("returns undefined for a non-Other role even with detail text", () => {
    expect(buildRoleExtras("Landlord", "some detail")).toBeUndefined();
  });

  it("trims the detail before returning", () => {
    const result = buildRoleExtras(OTHER_ROLE_VALUE, "  trimmed  ");
    expect(result?.role_detail).toBe("trimmed");
  });

  it("caps the detail at ROLE_DETAIL_MAX_CHARS after trimming", () => {
    const long = "a".repeat(ROLE_DETAIL_MAX_CHARS + 50);
    const result = buildRoleExtras(OTHER_ROLE_VALUE, long);
    expect(result?.role_detail.length).toBe(ROLE_DETAIL_MAX_CHARS);
  });

  it("returns undefined when detail is blank whitespace even for Other role", () => {
    expect(buildRoleExtras(OTHER_ROLE_VALUE, "")).toBeUndefined();
    expect(buildRoleExtras(OTHER_ROLE_VALUE, "   ")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// isSafeReturnPath
// ---------------------------------------------------------------------------

describe("isSafeReturnPath", () => {
  it("accepts a normal path with query string and hash", () => {
    expect(isSafeReturnPath("/blog/x?a=1#s")).toBe(true);
  });

  it("rejects a protocol-relative URL (double slash)", () => {
    expect(isSafeReturnPath("//evil.com")).toBe(false);
  });

  it("rejects an absolute URL", () => {
    expect(isSafeReturnPath("https://evil.com")).toBe(false);
  });

  it("rejects a path containing a backslash", () => {
    expect(isSafeReturnPath("/\\evil")).toBe(false);
  });

  it("rejects a path containing a space", () => {
    expect(isSafeReturnPath("/a b")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isSafeReturnPath("")).toBe(false);
  });

  it("rejects a number", () => {
    expect(isSafeReturnPath(42)).toBe(false);
  });

  it("rejects null", () => {
    expect(isSafeReturnPath(null)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// buildThankYouUrl
// ---------------------------------------------------------------------------

describe("buildThankYouUrl", () => {
  it("bt only: appends bt param", () => {
    expect(buildThankYouUrl("tok123")).toBe("/thank-you?bt=tok123");
  });

  it("rt only: appends rt param with encodeURIComponent encoding", () => {
    expect(buildThankYouUrl(undefined, "/blog/x")).toBe("/thank-you?rt=%2Fblog%2Fx");
  });

  it("both bt and rt: appends both params in order", () => {
    expect(buildThankYouUrl("tok123", "/blog/x")).toBe(
      "/thank-you?bt=tok123&rt=%2Fblog%2Fx",
    );
  });

  it("drops an unsafe rt and keeps bt", () => {
    expect(buildThankYouUrl("tok123", "//evil.com")).toBe("/thank-you?bt=tok123");
  });

  it("encodes ? and & characters in rt", () => {
    expect(buildThankYouUrl(undefined, "/foo?a=1&b=2")).toBe(
      "/thank-you?rt=%2Ffoo%3Fa%3D1%26b%3D2",
    );
  });
});
