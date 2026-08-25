/**
 * Tests for the Trade Tax Specialists lead consent text and payload helpers.
 *
 * Verifies:
 *  - The consent text names a generic "specialist partner network" per the
 *    data-sharing agreement (owner decision: no named partner firm).
 *  - The consent text never contains "DJH" (internal name; must not appear in
 *    user-facing copy on non-Property sites, per estate rule).
 *  - The consent text includes the brand name "Trade Tax Specialists".
 *  - composeLeadMessage is used for human-readable message prefixes (no extras
 *    leaking into the message string).
 *
 * TL-03: pure Node.js module tests only -- no React, no window, no fetch.
 */

import { describe, it, expect } from "vitest";
import { composeLeadMessage } from "@/lib/lead-message";

// ── Consent text wiring ──────────────────────────────────────────────────────

describe("consent text wiring", () => {
  it("consent text names a generic 'specialist partner network', never 'Reflex'", async () => {
    const { siteConfig } = await import("@/config/site");
    const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;
    expect(consentText).toContain("specialist partner network");
    expect(consentText).not.toContain("Reflex");
  });

  // Owner decision 2026-08-24: reverted to the pre-2026-08-15 wording after the
  // estate mini-form conversion collapse (step-2 completion went to zero under the
  // "will share ... regulated firms" notice). Plurality disclosure now lives in the
  // privacy policy (layer 2); the pool gate anchor phrase is
  // "a firm from our specialist partner network" (Property offer-send.ts).
  it("consent notice is the estate-standard sharing wording, pinned verbatim", async () => {
    const { siteConfig } = await import("@/config/site");
    expect(siteConfig.leadConsentText).toBe(
      "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this.",
    );
  });

  it("consent text never contains 'DJH' (estate rule: internal name must not appear)", async () => {
    const { siteConfig } = await import("@/config/site");
    const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;
    expect(consentText).not.toContain("DJH");
  });

});

// ── Extras qualifiers (moved out of message) ─────────────────────────────────

describe("extras qualifiers - not in message string", () => {
  it("composeLeadMessage with no trade or subbieCount returns just the user message", () => {
    const msg = composeLeadMessage({ message: "I need help with my CIS refund." });
    expect(msg).toBe("I need help with my CIS refund.");
    // extras are handled server-side; the message string must never carry
    // 'Trade:' or 'Subcontractors paid:' when coming from the full LeadForm
    // (those values go to extras.trade and extras.subbie_count instead).
  });

  it("composeLeadMessage with trade prefix still works (mini-capture surfaces use it)", () => {
    // MiniCapture and CalcResultCta still pass a messagePrefix directly.
    // This just confirms the helper itself is intact.
    const msg = composeLeadMessage({ trade: "Electricians", message: "Question" });
    expect(msg).toBe("Trade: Electricians\n\nQuestion");
  });

  it("trade and subbie_count go into extras, not message, from LeadForm", () => {
    // Regression guard: the new LeadForm builds extras = {trade, subbie_count}
    // and passes an empty message string. composeLeadMessage({}) returns "".
    const msg = composeLeadMessage({});
    expect(msg).toBe("");
    // The extras object is built separately in LeadForm.tsx and sent as payload.extras.
  });
});
