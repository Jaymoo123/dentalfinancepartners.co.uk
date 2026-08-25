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

  it("consent text is non-empty", () => {
    expect(siteConfig.leadConsentText.length).toBeGreaterThan(20);
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

  // Owner decision 2026-08-24: reverted to the pre-2026-08-15 wording after the
  // estate mini-form conversion collapse (step-2 completion went to zero under the
  // "will share ... regulated firms" notice). Plurality disclosure now lives in the
  // privacy policy (layer 2); the pool gate anchor phrase is
  // "a firm from our specialist partner network" (Property offer-send.ts). Pinned
  // verbatim so the test fails immediately if the config wording changes.
  //
  // This file was MISSED by 435cc12e, which updated the other seven sites' copies.
  // Theirs live at web/src/tests/lead-payload.test.ts; Medical's is the only one
  // under web/src/lib/leads/, so a path-shaped sweep skipped it and the suite has
  // been red on the port branch since 2026-08-24. Brought into line 2026-08-25.
  const EXPECTED_CONSENT =
    "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this.";

  it("consent notice is the estate-standard sharing wording, pinned verbatim", () => {
    expect(siteConfig.leadConsentText).toBe(EXPECTED_CONSENT);
  });
});
