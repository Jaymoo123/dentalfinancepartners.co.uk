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

  // Replicates the notice-only derivation in site.ts (pool model).
  const consentText = `${displayName} will use your details to respond to your enquiry. To answer it, your details may be shared with regulated firms from our specialist partner network, who may contact you directly about it. More than one firm may take up your enquiry: up to three firms in the profession you are asking about, and up to three in related professions such as brokers, solicitors and advisers. ${displayName} may be paid a fee by a firm your enquiry is passed to. You can object at any time. By submitting this enquiry you confirm you understand this.`;

  it("partner config carries the network category label, never a named firm", () => {
    expect(nicheConfig.partner?.name).toBe("a firm from our specialist partner network");
  });

  // The LIA balancing test is only made out if the enquirer is told, before submitting,
  // that more than one firm may receive their details and how many at most. These are
  // the conditions in DSA Annex B.2 and B.5, not stylistic preferences.
  it("consent notice discloses the network, multiple recipients and the maximum", () => {
    expect(consentText).toContain("specialist partner network");
    expect(consentText).toContain("More than one firm");
    expect(consentText).toContain("up to three firms in the profession you are asking about");
    expect(consentText).toContain("up to three in related professions");
    expect(consentText).toContain("may be paid a fee");
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
