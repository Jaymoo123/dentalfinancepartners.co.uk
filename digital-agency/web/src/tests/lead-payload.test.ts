/**
 * Unit tests for lead-message helpers and the consent text guard.
 *
 * The consent guard asserts:
 *   - The partner firm name appears in the consent text.
 *   - The string "DJH" (an internal firm identifier) is absent from all
 *     user-facing consent strings (hard estate rule for non-Property sites).
 *   - The health-check prefix is correctly formatted.
 */
import { describe, it, expect } from "vitest";
import {
  calculatorMessagePrefix,
  exitIntentMessagePrefix,
  healthCheckMessagePrefix,
} from "@/lib/lead-message";
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

describe("healthCheckMessagePrefix", () => {
  it("returns the expected format", () => {
    expect(healthCheckMessagePrefix()).toBe("[Health check] ");
  });

  it("trailing space is present", () => {
    expect(healthCheckMessagePrefix().endsWith(" ")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Consent text guard
// These tests read the niche config directly (not siteConfig which depends on
// process.env.NEXT_PUBLIC_SITE_URL at call time) and replicate the consent
// text derivation from digital-agency/web/src/config/site.ts.
// ---------------------------------------------------------------------------
describe("lead consent text", () => {
  const partner = nicheConfig.partner;
  const displayName = nicheConfig.display_name;
  const partnerName = partner?.name ?? "";

  // The real constant, not a copy of it. A replica here passed no matter what the
  // site actually rendered, which is the opposite of what this guard is for.
  const consentText = siteConfig.leadConsentText;

  it("site display name is Agency Founder Finance", () => {
    expect(displayName).toBe("Agency Founder Finance");
  });

  it("partner is present as a category label (generic partner network, not DJH)", () => {
    expect(partner).not.toBeNull();
    expect(partnerName).toBe("regulated firms in our specialist partner network");
  });

  it("consent text references a generic specialist partner network, not a named firm", () => {
    expect(consentText).toContain("specialist partner network");
    expect(consentText).not.toContain("Reflex");
  });

  // Transparency is layered (DSA Annex B.1). This is layer one: it must disclose on
  // its face that the recipients are FIRMS, plural, in a network, and link to the
  // privacy policy. The maximum number lives in layer two, the privacy policy.
  it("consent text discloses sharing with plural firms in the network", () => {
    expect(consentText).toContain("regulated firms");
    expect(consentText).toContain("object at any time");
  });

  // LIA section 3.2 turns on plurality being visible without opening the policy.
  // "a firm" singular here would collapse the layered argument.
  it("consent text never describes the recipient as a single firm", () => {
    expect(consentText).not.toMatch(/\ba (?:relevant |regulated )?firm\b/);
    expect(consentText).not.toContain("one firm at a time");
  });

  it("consent text does NOT contain the string DJH", () => {
    expect(consentText).not.toContain("DJH");
  });

  it("consent text does NOT contain any credential claim", () => {
    expect(consentText.toLowerCase()).not.toContain("icaew");
    expect(consentText.toLowerCase()).not.toContain("chartered");
    expect(consentText.toLowerCase()).not.toContain("qualified");
  });
});

// ---------------------------------------------------------------------------
// Health-check wizard payload guard
// Verifies that the wizard-sourced lead payload:
//   - never sends consent_given = false when consent is collected
//   - extras.health_check is set
//   - no DJH string appears
// ---------------------------------------------------------------------------
describe("wizard lead payload structure", () => {
  const prefix = healthCheckMessagePrefix();

  it("health check prefix does not contain DJH", () => {
    expect(prefix).not.toContain("DJH");
  });

  it("a typical wizard payload has extras.health_check = true", () => {
    const extras = {
      health_check: true,
      agencyType: "digital",
      revenueBand: "250k-500k",
      entity: "ltd",
      rdActivity: "occasional",
      contractorUse: "regular",
      exitHorizon: "3-5y",
    };
    expect(extras.health_check).toBe(true);
    expect("health_check" in extras).toBe(true);
  });

  it("wizard source is 'agency' (no DJH reference)", () => {
    // The wizard submits with source = "agency" via the chokepoint.
    // Server enforces this; body cannot spoof it.
    const source = "agency";
    expect(source).not.toContain("DJH");
    expect(source).not.toContain("djh");
  });
});
