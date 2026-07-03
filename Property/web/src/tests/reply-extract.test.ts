/**
 * Deterministic UK phone extraction from email reply bodies. No AI, no PII leaves
 * the app; Twilio Lookup verifies downstream so a wrong grab is self-correcting.
 */
import { describe, it, expect } from "vitest";
import { extractUkPhone } from "@/lib/leads/reply-extract";

describe("extractUkPhone", () => {
  it("extracts a plain UK mobile", () => {
    expect(extractUkPhone("Hi I'm Jane, 07700900000, call me Tuesday")).toBe("07700900000");
  });
  it("extracts a spaced UK mobile", () => {
    expect(extractUkPhone("my number is 07700 900000 thanks")).toBe("07700 900000");
  });
  it("extracts an international +44 mobile", () => {
    expect(extractUkPhone("reach me on +44 7700 900000")).toBe("+44 7700 900000");
  });
  it("extracts a UK landline", () => {
    expect(extractUkPhone("office is 020 7946 0000")).toBe("020 7946 0000");
  });
  it("returns null when there is no number", () => {
    expect(extractUkPhone("Please just call me, thanks")).toBeNull();
  });
  it("ignores property values and other non-phone numbers", () => {
    expect(extractUkPhone("property purchased for 350000 now valued at 1,213,000")).toBeNull();
  });
  it("rejects a too-short number", () => {
    expect(extractUkPhone("ext 0123")).toBeNull();
  });
  it("handles empty / null / undefined input", () => {
    expect(extractUkPhone("")).toBeNull();
    expect(extractUkPhone(null)).toBeNull();
    expect(extractUkPhone(undefined)).toBeNull();
  });
});
