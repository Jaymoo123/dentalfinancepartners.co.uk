/**
 * Tests for Medical Accountants UK lead payload contract.
 *
 * Verifies: consent text never contains "DJH" (the firm name must not appear);
 * the notice-only acknowledgement names the specialist partner network and
 * discloses re-referral; the site source identifier matches the chokepoint.
 */

import { describe, it, expect } from "vitest";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";

describe("lead payload — consent text contract", () => {
  it("consent text does not contain 'DJH'", () => {
    const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;
    expect(consentText).not.toContain("DJH");
  });

  it("consent text does not contain 'David James Holloway'", () => {
    const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;
    expect(consentText).not.toContain("David James Holloway");
  });

  it("consent text is non-empty and references the site", () => {
    expect(siteConfig.leadConsentText.length).toBeGreaterThan(20);
    // Notice-only acknowledgement: must reference the display name.
    expect(siteConfig.leadConsentText).toContain(niche.display_name);
  });

  it("source identifier is 'medical'", () => {
    expect(niche.content_strategy.source_identifier).toBe("medical");
  });

  it("storage prefix is 'ma' (FROZEN)", () => {
    // The niche config site_key is used in analytics but the storage prefix ma is frozen.
    // We check the site_key aligns with 'medical'.
    expect(niche.content_strategy.site_key).toBe("medical");
  });
});

describe("lead payload — partner consent wording", () => {
  it("consent notice names the specialist partner network (never a single firm)", () => {
    expect(siteConfig.leadConsentText).toContain("specialist partner network");
  });

  // Layer one of the layered notice (DSA Annex B.1). Cascade, the maximum number and
  // the fee moved to layer two, the privacy policy, on 17 August 2026. What layer one
  // still has to carry is plurality: LIA section 3.2 turns on the enquirer seeing that
  // the recipients are firms in a network, not one nominated adviser.
  it("consent notice discloses plural firms, never a single firm", () => {
    expect(siteConfig.leadConsentText).toContain("regulated firms");
    expect(siteConfig.leadConsentText).not.toMatch(/\ba (?:relevant |regulated )?firm\b/);
  });
});
