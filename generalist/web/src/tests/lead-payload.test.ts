/**
 * Unit tests for lead-message helpers and the consent text guard.
 *
 * The consent guard pins the estate-standard sharing notice verbatim (reverted
 * 2026-08-24 to the pre-2026-08-15 wording; see the test file for why), and
 * asserts that the string "DJH" (an internal firm identifier that must never
 * appear in user-facing copy) is absent.
 */
import { describe, it, expect } from "vitest";
import { calculatorMessagePrefix, exitIntentMessagePrefix } from "@/lib/lead-message";
import { siteConfig } from "@/config/site";
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

  // The real constant, not a copy of it. A replica here passed no matter what the
  // site actually rendered, which is the opposite of what this guard is for.
  const consentText = siteConfig.leadConsentText;

  it("partner config carries the network category label, never a named firm", () => {
    expect(nicheConfig.partner?.name).toBe("regulated firms in our specialist partner network");
  });

  // Owner decision 2026-08-24: reverted to the pre-2026-08-15 wording after the
  // estate mini-form conversion collapse (step-2 completion went to zero under the
  // "will share ... regulated firms" notice). Plurality disclosure now lives in the
  // privacy policy (layer 2); the pool gate anchor phrase is
  // "a firm from our specialist partner network" (Property offer-send.ts).
  const EXPECTED_CONSENT =
    "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this.";
  it("consent notice is the estate-standard sharing wording, pinned verbatim", () => {
    expect(consentText).toBe(EXPECTED_CONSENT);
  });

  it("consent text does NOT contain the string DJH", () => {
    expect(consentText).not.toContain("DJH");
  });
});
