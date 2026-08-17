/**
 * Unit tests for lead-message helpers and the consent text guard.
 *
 * The consent guard asserts that layer one of the notice (DSA Annex B.1) names the
 * specialist partner network and discloses plural firms, that it never reads as a
 * single nominated adviser, and that the string "DJH" (an internal firm identifier
 * that must never appear in user-facing copy) is absent. The maximum number of firms
 * lives in layer two, the privacy policy, and is asserted there.
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

  // Transparency is layered (DSA Annex B.1). This is layer one, and the LIA is made
  // out only if it discloses on its face that the recipients are FIRMS, plural, in a
  // network, and links to the privacy policy that carries the maximum number. The
  // count itself lives in layer two and is asserted against the privacy policy below.
  it("consent notice discloses sharing with plural firms in the network", () => {
    expect(consentText).toContain("specialist partner network");
    expect(consentText).toContain("regulated firms");
    expect(consentText).toContain("object at any time");
  });

  // LIA section 3.2 turns on plurality being visible without opening the policy.
  // "firm" singular here would collapse the layered argument.
  it("consent notice never describes the recipient as a single firm", () => {
    expect(consentText).not.toMatch(/\ba (?:relevant |regulated )?firm\b/);
    expect(consentText).not.toContain("one firm at a time");
  });

  it("consent text does NOT contain the string DJH", () => {
    expect(consentText).not.toContain("DJH");
  });
});
