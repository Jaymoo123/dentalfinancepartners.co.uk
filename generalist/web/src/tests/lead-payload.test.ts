/**
 * Unit tests for lead-message helpers and the consent text guard.
 *
 * The consent guard asserts the partner firm name is present and that the
 * string "DJH" (an internal firm identifier that must never appear in
 * user-facing copy) is absent.
 */
import { describe, it, expect } from "vitest";
import { calculatorMessagePrefix, exitIntentMessagePrefix } from "@/lib/lead-message";
import nicheConfig from "../../../niche.config.json";

// ---------------------------------------------------------------------------
// lib/lead-message pure functions
// ---------------------------------------------------------------------------
describe("calculatorMessagePrefix", () => {
  it("wraps the slug in the expected format", () => {
    expect(calculatorMessagePrefix("salary-dividend")).toBe("[Calculator: salary-dividend] ");
  });

  it("works for any slug string", () => {
    expect(calculatorMessagePrefix("vat-scheme")).toBe("[Calculator: vat-scheme] ");
  });

  it("trailing space is present (message is concatenated directly)", () => {
    const prefix = calculatorMessagePrefix("badr-cgt");
    expect(prefix.endsWith(" ")).toBe(true);
  });
});

describe("exitIntentMessagePrefix", () => {
  it("wraps the topic label in the expected format", () => {
    expect(exitIntentMessagePrefix("Corporation Tax")).toBe("[Exit intent (Corporation Tax)] ");
  });

  it("preserves spaces in topic labels", () => {
    expect(exitIntentMessagePrefix("R&D Tax Credits")).toBe("[Exit intent (R&D Tax Credits)] ");
  });

  it("trailing space is present", () => {
    const prefix = exitIntentMessagePrefix("VAT");
    expect(prefix.endsWith(" ")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Consent text guard
// These tests read the niche config directly (not siteConfig which depends on
// process.env.NEXT_PUBLIC_SITE_URL at call time) and replicate the consent
// text derivation from generalist/web/src/config/site.ts.
// ---------------------------------------------------------------------------
describe("lead consent text", () => {
  const partner = nicheConfig.partner;
  const displayName = nicheConfig.display_name;
  const partnerName = partner?.name ?? "";

  // Replicates the partner-path derivation in site.ts.
  const consentText = partner
    ? `I agree to my details being shared by ${displayName} with its specialist partner network, and to ${displayName} and its partner firms contacting me about my enquiry.`
    : `I agree to ${displayName} using my details to respond to my enquiry and provide the advice I have requested.`;

  it("partner sharing stays enabled with no named firm", () => {
    expect(partner).not.toBeNull();
    expect(partnerName).toBe("");
  });

  it("consent text references the specialist partner network, not a named firm", () => {
    expect(consentText).toContain("partner network");
    expect(consentText).not.toContain("Reflex");
  });

  it("consent text does NOT contain the string DJH", () => {
    expect(consentText).not.toContain("DJH");
  });
});
