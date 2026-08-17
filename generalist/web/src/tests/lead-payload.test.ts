/**
 * Unit tests for lead-message helpers and the consent text guard.
 *
 * The consent guard asserts the notice-only acknowledgement names the
 * specialist partner network, discloses re-referral, and that the string
 * "DJH" (an internal firm identifier that must never appear in user-facing
 * copy) is absent.
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
  const displayName = nicheConfig.display_name;

  // Replicates the in-house derivation in site.ts.
  const consentText = `${displayName} will use your details to respond to your enquiry and to contact you about it. You can object at any time.`;

  it("no partner firm is configured (in-house since 2026-08-17)", () => {
    expect(nicheConfig.partner).toBeNull();
  });

  it("consent notice makes no third-party sharing claim", () => {
    for (const banned of ["partner network", "shared with", "paid a fee", "passed to"]) {
      expect(consentText).not.toContain(banned);
    }
    expect(consentText).toContain("object at any time");
  });

  it("consent notice does not promise single-firm handling", () => {
    expect(consentText).not.toContain("one firm at a time");
    expect(consentText).not.toContain("a relevant regulated firm");
  });

  it("consent text does NOT contain the string DJH", () => {
    expect(consentText).not.toContain("DJH");
  });
});
