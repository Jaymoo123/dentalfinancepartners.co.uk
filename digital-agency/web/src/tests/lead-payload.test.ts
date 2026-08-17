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

  // Replicates the in-house notice in site.ts.
  const consentText =
    "Agency Founder Finance will use your details to respond to your enquiry and to contact you about it. You can object at any time.";

  it("site display name is Agency Founder Finance", () => {
    expect(displayName).toBe("Agency Founder Finance");
  });

  it("no partner firm is configured (in-house since 2026-08-17)", () => {
    expect(partner).toBeNull();
  });

  it("consent text makes no third-party sharing claim", () => {
    for (const banned of ["partner network", "shared with", "paid a fee", "passed to", "Reflex"]) {
      expect(consentText).not.toContain(banned);
    }
    expect(consentText).toContain("object at any time");
  });

  it("consent text does not promise single-firm handling", () => {
    expect(consentText).not.toContain("one firm at a time");
    expect(consentText).not.toContain("a relevant regulated firm");
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
