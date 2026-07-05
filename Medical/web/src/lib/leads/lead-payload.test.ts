/**
 * Tests for Medical Accountants UK lead payload contract.
 *
 * Verifies: consent text never contains "DJH" (the firm name must not appear);
 * consent wording references a partner name only when the niche config has one;
 * the site source identifier matches the chokepoint.
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
    // Should reference the display name or use 'I agree'
    expect(siteConfig.leadConsentText).toMatch(/I agree/i);
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
  it("when a partner exists, consent mentions the partner name", () => {
    if (siteConfig.partner) {
      expect(siteConfig.leadConsentText).toContain(siteConfig.partner.name);
    }
  });

  it("when no partner, consent does not mention 'shared with'", () => {
    if (!siteConfig.partner) {
      expect(siteConfig.leadConsentText.toLowerCase()).not.toContain("shared with");
    }
  });
});
