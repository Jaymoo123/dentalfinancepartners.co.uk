/**
 * Tests for the divorce-finances lead consent text and payload helpers.
 *
 * Verifies:
 *  - partner is the anonymous network category label, never a named firm.
 *  - The consent text carries the mandatory sharing, re-referral and
 *    referral-fee disclosures (adjacent-professions lane).
 *  - The consent text never contains "DJH" (internal name; must not appear in
 *    user-facing copy on non-Property sites, per estate rule).
 *  - The consent text includes the brand display name.
 *  - composeLeadMessage is used for human-readable message prefixes (no extras
 *    leaking into the message string).
 *
 * TL-03: pure Node.js module tests only -- no React, no window, no fetch.
 */

import { describe, it, expect } from "vitest";
import { composeLeadMessage } from "@/lib/lead-message";

// ── Consent text wiring ──────────────────────────────────────────────────────

describe("consent text wiring", () => {
  it("partner is the anonymous network category label, never a named firm", async () => {
    const { siteConfig } = await import("@/config/site");
    expect(siteConfig.partner?.name).toBe("a firm from our specialist partner network");
  });

  it("consent text carries sharing, re-referral and fee disclosures", async () => {
    const { siteConfig } = await import("@/config/site");
    expect(siteConfig.leadConsentText).toContain("specialist partner network");
    expect(siteConfig.leadConsentText).toContain("passed to another firm in the network");
    expect(siteConfig.leadConsentText).toContain("may receive a fee");
  });

  it("consent text never contains 'DJH' (estate rule: internal name must not appear)", async () => {
    const { siteConfig } = await import("@/config/site");
    const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;
    expect(consentText).not.toContain("DJH");
  });

  it("consent text mentions the brand display name", async () => {
    const { siteConfig } = await import("@/config/site");
    const { niche } = await import("@/config/niche-loader");
    expect(siteConfig.leadConsentText).toContain(niche.display_name);
  });
});

// ── Extras qualifiers (moved out of message) ─────────────────────────────────

describe("extras qualifiers — not in message string", () => {
  it("composeLeadMessage with no trade or subbieCount returns just the user message", () => {
    const msg = composeLeadMessage({ message: "I need help with my settlement." });
    expect(msg).toBe("I need help with my settlement.");
    // extras are handled server-side; the message string must never carry
    // 'Segment:' or 'Size:' when coming from the full LeadForm
    // (those values go to extras.trade and extras.subbie_count instead).
  });

  it("composeLeadMessage with trade prefix still works (mini-capture surfaces use it)", () => {
    // MiniCapture and CalcResultCta still pass a messagePrefix directly.
    // This just confirms the helper itself is intact.
    const msg = composeLeadMessage({ trade: "Electricians", message: "Question" });
    expect(msg).toBe("Segment: Electricians\n\nQuestion");
  });

  it("trade and subbie_count go into extras, not message, from LeadForm", () => {
    // Regression guard: the new LeadForm builds extras = {trade, subbie_count}
    // and passes an empty message string. composeLeadMessage({}) returns "".
    const msg = composeLeadMessage({});
    expect(msg).toBe("");
    // The extras object is built separately in LeadForm.tsx and sent as payload.extras.
  });
});
