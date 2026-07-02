/**
 * Tests for the echo extensions in enquiry-message.ts:
 *   parseEnquiryEchoes, normaliseEcho, categoryPhrase.
 * All pure -- no DB, no network.
 */

import { describe, it, expect } from "vitest";
import {
  composeEnquiryMessage,
  parseEnquiryEchoes,
  normaliseEcho,
  categoryPhrase,
} from "@/lib/leads/enquiry-message";
import type { EnquiryParts, EnquiryEchoes } from "@/lib/leads/enquiry-message";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const VALID_PARTS: EnquiryParts = {
  situation:
    "I own three buy-to-let properties and need to review my Section 24 position for the current year.",
  prompted: "I received a letter from HMRC about my rental income.",
  callGoal: "Understand my tax liability and what I can offset.",
};

// ---------------------------------------------------------------------------
// parseEnquiryEchoes -- round-trip
// ---------------------------------------------------------------------------

describe("parseEnquiryEchoes round-trip", () => {
  it("recovers all three fields from a composeEnquiryMessage output", () => {
    const msg = composeEnquiryMessage(VALID_PARTS);
    const echoes: EnquiryEchoes = parseEnquiryEchoes(msg);
    expect(echoes.situation).toBe(VALID_PARTS.situation);
    expect(echoes.prompted).toBe(VALID_PARTS.prompted);
    expect(echoes.callGoal).toBe(VALID_PARTS.callGoal);
  });

  it("returns {} for a legacy free-text message (no Situation: prefix)", () => {
    expect(parseEnquiryEchoes("Please call me back about CGT.")).toEqual({});
  });

  it("returns {} for null", () => {
    expect(parseEnquiryEchoes(null)).toEqual({});
  });

  it("returns {} for undefined", () => {
    expect(parseEnquiryEchoes(undefined)).toEqual({});
  });

  it("returns {} for an empty string", () => {
    expect(parseEnquiryEchoes("")).toEqual({});
  });

  it("returns only situation when the message has no Prompted-by section", () => {
    const echoes = parseEnquiryEchoes("Situation: just the situation text");
    expect(echoes.situation).toBe("just the situation text");
    expect(echoes.prompted).toBeUndefined();
    expect(echoes.callGoal).toBeUndefined();
  });

  it("handles internal newlines inside the situation field", () => {
    const parts: EnquiryParts = {
      situation:
        "I have two properties.\n\nOne is in my name, one is in a company.",
      prompted: "Year-end review.",
      callGoal: "Reduce my tax bill.",
    };
    const msg = composeEnquiryMessage(parts);
    const echoes = parseEnquiryEchoes(msg);
    expect(echoes.situation).toBe(parts.situation);
    expect(echoes.prompted).toBe("Year-end review.");
    expect(echoes.callGoal).toBe("Reduce my tax bill.");
  });

  it("does not mutate the output of composeEnquiryMessage", () => {
    const msg = composeEnquiryMessage(VALID_PARTS);
    parseEnquiryEchoes(msg);
    // Re-parsing the same message should produce the same result
    expect(parseEnquiryEchoes(msg).callGoal).toBe(VALID_PARTS.callGoal);
  });
});

// ---------------------------------------------------------------------------
// normaliseEcho
// ---------------------------------------------------------------------------

describe("normaliseEcho -- leading prefix stripping", () => {
  it('strips "I want to " (case-insensitive) and lowercases the first char', () => {
    expect(normaliseEcho("I want to reduce my tax liability")).toBe(
      "reduce my tax liability",
    );
  });

  it('strips "i want to " (already lowercase)', () => {
    expect(normaliseEcho("i want to understand my CGT position")).toBe(
      "understand my CGT position",
    );
  });

  it("strips \"I'd like to \"", () => {
    expect(normaliseEcho("I'd like to review my portfolio structure")).toBe(
      "review my portfolio structure",
    );
  });

  it('strips "I would like to "', () => {
    expect(normaliseEcho("I would like to understand Section 24")).toBe(
      "understand Section 24",
    );
  });

  it('strips "We want to "', () => {
    expect(normaliseEcho("We want to incorporate our properties")).toBe(
      "incorporate our properties",
    );
  });

  it('strips leading "to " (solo)', () => {
    expect(normaliseEcho("to get proper advice on my tax")).toBe(
      "get proper advice on my tax",
    );
  });

  it("lowercases the first character of a phrase with no prefix to strip", () => {
    expect(normaliseEcho("Understand my CGT position")).toBe(
      "understand my CGT position",
    );
  });
});

describe("normaliseEcho -- trailing full stop", () => {
  it("strips a trailing full stop", () => {
    expect(normaliseEcho("understand my CGT position.")).toBe(
      "understand my CGT position",
    );
  });

  it("does not strip a full stop that is not trailing", () => {
    const result = normaliseEcho("get advice on S.24 and CGT");
    expect(result).toBe("get advice on S.24 and CGT");
  });
});

describe("normaliseEcho -- whitespace collapsing", () => {
  it("collapses multiple spaces to one", () => {
    expect(normaliseEcho("understand  my   CGT position")).toBe(
      "understand my CGT position",
    );
  });

  it("trims leading and trailing whitespace before processing", () => {
    expect(normaliseEcho("  get proper tax advice  ")).toBe(
      "get proper tax advice",
    );
  });
});

describe("normaliseEcho -- length rules", () => {
  it("returns empty string for undefined", () => {
    expect(normaliseEcho(undefined)).toBe("");
  });

  it("returns empty string when fewer than 8 chars remain after processing", () => {
    // "sort it" = 7 chars
    expect(normaliseEcho("sort it")).toBe("");
  });

  it("accepts exactly 8 chars", () => {
    // "sort tax" = 8 chars
    expect(normaliseEcho("sort tax")).toBe("sort tax");
  });

  it("truncates at the last word boundary before position 120 (no ellipsis)", () => {
    // Build a string that is exactly 130 chars of clean text
    // "understand my " = 14 chars; repeat "property " (9 chars) to pad
    const base = "understand my ";
    const filler = "property portfolio tax advice on disposal gains and losses ";
    // build to > 120 chars
    const long = base + filler.repeat(3); // 14 + 58*3 = 14 + 174 = 188 chars
    const result = normaliseEcho(long);
    expect(result.length).toBeLessThanOrEqual(120);
    expect(result).not.toContain("...");
    // must end at a word boundary (no partial word)
    expect(result).toMatch(/[a-zA-Z]$/);
  });

  it("accepts a string of exactly 120 chars without truncation", () => {
    // 120 clean chars -- use allowed chars only
    const s = ("understand my property portfolio tax position for the upcoming ").padEnd(120, "x");
    // padEnd with 'x' which is allowed
    const result = normaliseEcho(s);
    expect(result.length).toBe(120);
  });
});

describe("normaliseEcho -- security rejections", () => {
  it("returns empty string for a string containing an email address", () => {
    expect(normaliseEcho("contact me at jeff@example.com for details")).toBe("");
  });

  it("returns empty string for a string containing a URL with http", () => {
    expect(normaliseEcho("see http://example.com for more")).toBe("");
  });

  it("returns empty string for a string containing www.", () => {
    expect(normaliseEcho("visit www.example.com today")).toBe("");
  });

  it("returns empty string for a phone-number-like run of 7+ consecutive digits", () => {
    expect(normaliseEcho("call me on 07700900123 please")).toBe("");
  });

  it("accepts exactly 6 consecutive digits (not phone-like)", () => {
    // "SA105" like a tax reference - 5 digits, no issue
    // Use a 6-digit run: "123456"
    const result = normaliseEcho("reference number 123456 for my SA return");
    expect(result).toBe("reference number 123456 for my SA return");
  });

  it("returns empty string for a character outside the allowlist (exclamation mark)", () => {
    expect(normaliseEcho("get proper tax advice!")).toBe("");
  });

  it("returns empty string for a colon character (outside allowlist)", () => {
    expect(normaliseEcho("advice: portfolio review needed here")).toBe("");
  });

  it("accepts allowed special characters: £ % & ' , . ( ) -", () => {
    const s = "review the £50,000 gain on my buy-to-let (75% owned)";
    expect(normaliseEcho(s)).toBe(s);
  });
});

// ---------------------------------------------------------------------------
// categoryPhrase
// ---------------------------------------------------------------------------

describe("categoryPhrase -- exact mappings", () => {
  it("incorporation", () => {
    expect(categoryPhrase("incorporation")).toBe(
      "work out whether a limited company is the right move",
    );
  });

  it("section24", () => {
    expect(categoryPhrase("section24")).toBe(
      "get on top of what Section 24 means for you",
    );
  });

  it("cgt", () => {
    expect(categoryPhrase("cgt")).toBe(
      "understand the tax position before you sell",
    );
  });

  it("portfolio_structuring", () => {
    expect(categoryPhrase("portfolio_structuring")).toBe(
      "get your portfolio structured properly",
    );
  });

  it("mtd", () => {
    expect(categoryPhrase("mtd")).toBe(
      "get ready for Making Tax Digital",
    );
  });

  it("non_resident", () => {
    expect(categoryPhrase("non_resident")).toBe(
      "get your UK property tax position clear from abroad",
    );
  });

  it("unknown category -> generic fallback", () => {
    expect(categoryPhrase("stamp_duty")).toBe(
      "get your property tax position clear",
    );
  });

  it("undefined category -> generic fallback", () => {
    expect(categoryPhrase(undefined)).toBe(
      "get your property tax position clear",
    );
  });

  it("empty string category -> generic fallback", () => {
    expect(categoryPhrase("")).toBe(
      "get your property tax position clear",
    );
  });

  it("role parameter does not affect the mapping result (reserved)", () => {
    // The mapping is keyed on intentCategory; role is unused
    expect(categoryPhrase("cgt", "landlord")).toBe(
      "understand the tax position before you sell",
    );
  });

  it("no em-dash in any categoryPhrase value", () => {
    const categories = [
      "incorporation",
      "section24",
      "cgt",
      "portfolio_structuring",
      "mtd",
      "non_resident",
      undefined,
    ];
    for (const cat of categories) {
      expect(categoryPhrase(cat)).not.toContain("—"); // em-dash
      expect(categoryPhrase(cat)).not.toContain("–"); // en-dash
    }
  });
});
