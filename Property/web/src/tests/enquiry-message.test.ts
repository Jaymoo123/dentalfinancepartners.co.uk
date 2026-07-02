/**
 * Tests for enquiry-message: validate + compose the structured message
 * that is stored in the leads table and forwarded to DJH.
 * All pure — no DB, no network.
 */

import { describe, it, expect } from "vitest";
import {
  SITUATION_MIN_CHARS,
  ENQUIRY_ERRORS,
  validateEnquiryParts,
  composeEnquiryMessage,
} from "@/lib/leads/enquiry-message";
import type { EnquiryParts } from "@/lib/leads/enquiry-message";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Minimal set of valid parts that satisfies every validation rule. */
const VALID_PARTS: EnquiryParts = {
  situation:
    "I have several rental properties and need help understanding my tax position for the current tax year.",
  prompted: "I received a letter from HMRC.",
  callGoal: "Get advice on reducing my tax bill.",
};

// ---------------------------------------------------------------------------
// composeEnquiryMessage
// ---------------------------------------------------------------------------

describe("composeEnquiryMessage", () => {
  it("returns the exact formatted string for known inputs", () => {
    const result = composeEnquiryMessage(VALID_PARTS);
    expect(result).toBe(
      `Situation: ${VALID_PARTS.situation}\n\nPrompted by: ${VALID_PARTS.prompted}\n\nWants from call: ${VALID_PARTS.callGoal}`,
    );
  });

  it("trims leading and trailing whitespace from each part", () => {
    const inner = "a".repeat(SITUATION_MIN_CHARS);
    const parts: EnquiryParts = {
      situation: `  ${inner}  `,
      prompted: "  triggered by a tax return  ",
      callGoal: "  understand my options  ",
    };
    const result = composeEnquiryMessage(parts);
    expect(result).toBe(
      `Situation: ${inner}\n\nPrompted by: triggered by a tax return\n\nWants from call: understand my options`,
    );
  });

  it("preserves internal newlines within the situation field", () => {
    const situationWithNewlines =
      "First paragraph of situation.\n\nSecond paragraph of situation that adds more detail.";
    const parts: EnquiryParts = {
      situation: situationWithNewlines,
      prompted: "tax return",
      callGoal: "tax advice",
    };
    const result = composeEnquiryMessage(parts);
    expect(result).toContain("First paragraph of situation.\n\nSecond paragraph");
    expect(result.startsWith("Situation: First paragraph")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// validateEnquiryParts
// ---------------------------------------------------------------------------

describe("validateEnquiryParts - situation length boundary", () => {
  it(`fails when situation is exactly ${SITUATION_MIN_CHARS - 1} chars (39)`, () => {
    const parts: EnquiryParts = {
      ...VALID_PARTS,
      situation: "a".repeat(SITUATION_MIN_CHARS - 1),
    };
    const errors = validateEnquiryParts(parts);
    expect(errors.situation).toBe(ENQUIRY_ERRORS.situation);
  });

  it(`passes when situation is exactly ${SITUATION_MIN_CHARS} chars (40)`, () => {
    const parts: EnquiryParts = {
      ...VALID_PARTS,
      situation: "a".repeat(SITUATION_MIN_CHARS),
    };
    const errors = validateEnquiryParts(parts);
    expect(errors.situation).toBeUndefined();
  });

  it("fails when situation has 40+ total chars but trims to 39 (whitespace padding does not count)", () => {
    // 39 real chars + trailing space = 40 chars raw, but trim() yields 39
    const parts: EnquiryParts = {
      ...VALID_PARTS,
      situation: "a".repeat(SITUATION_MIN_CHARS - 1) + " ",
    };
    const errors = validateEnquiryParts(parts);
    expect(errors.situation).toBe(ENQUIRY_ERRORS.situation);
  });
});

describe("validateEnquiryParts - prompted length boundary", () => {
  it('fails when prompted is ""', () => {
    const errors = validateEnquiryParts({ ...VALID_PARTS, prompted: "" });
    expect(errors.prompted).toBe(ENQUIRY_ERRORS.prompted);
  });

  it('fails when prompted is "ab" (2 chars)', () => {
    const errors = validateEnquiryParts({ ...VALID_PARTS, prompted: "ab" });
    expect(errors.prompted).toBe(ENQUIRY_ERRORS.prompted);
  });

  it('passes when prompted is "abc" (3 chars)', () => {
    const errors = validateEnquiryParts({ ...VALID_PARTS, prompted: "abc" });
    expect(errors.prompted).toBeUndefined();
  });
});

describe("validateEnquiryParts - callGoal length boundary", () => {
  it('fails when callGoal is ""', () => {
    const errors = validateEnquiryParts({ ...VALID_PARTS, callGoal: "" });
    expect(errors.callGoal).toBe(ENQUIRY_ERRORS.callGoal);
  });

  it('fails when callGoal is "ab" (2 chars)', () => {
    const errors = validateEnquiryParts({ ...VALID_PARTS, callGoal: "ab" });
    expect(errors.callGoal).toBe(ENQUIRY_ERRORS.callGoal);
  });

  it('passes when callGoal is "abc" (3 chars)', () => {
    const errors = validateEnquiryParts({ ...VALID_PARTS, callGoal: "abc" });
    expect(errors.callGoal).toBeUndefined();
  });
});

describe("validateEnquiryParts - all-valid input", () => {
  it("returns exactly {} when all parts satisfy every rule", () => {
    const errors = validateEnquiryParts(VALID_PARTS);
    expect(errors).toEqual({});
  });
});

// ---------------------------------------------------------------------------
// Copy hygiene: no em-dash or en-dash in any error message
// ---------------------------------------------------------------------------

describe("ENQUIRY_ERRORS copy hygiene", () => {
  it("contains no em-dash (U+2014) in any error message", () => {
    for (const value of Object.values(ENQUIRY_ERRORS)) {
      expect(value).not.toContain("—");
    }
  });

  it("contains no en-dash (U+2013) in any error message", () => {
    for (const value of Object.values(ENQUIRY_ERRORS)) {
      expect(value).not.toContain("–");
    }
  });
});

// ---------------------------------------------------------------------------
// Server-contract guard (submit route MIN_MESSAGE = 10)
// ---------------------------------------------------------------------------

describe("server-contract guard", () => {
  it("composed message for minimal valid parts has trimmed length >= 10", () => {
    const result = composeEnquiryMessage(VALID_PARTS);
    expect(result.trim().length).toBeGreaterThanOrEqual(10);
  });

  it('composed message starts with "Situation: "', () => {
    const result = composeEnquiryMessage(VALID_PARTS);
    expect(result.startsWith("Situation: ")).toBe(true);
  });
});
