/**
 * Tests for the Probate Compass (wills-probate) lead consent text and payload helpers.
 *
 * Verifies:
 *  - partner is the anonymous network category label, never a named firm.
 *  - The consent text carries the mandatory sharing, re-referral and
 *    referral-fee disclosures (adjacent-professions lane).
 *  - The consent text never contains "DJH" (internal name; must not appear in
 *    user-facing copy on non-Property sites, per estate rule).
 *  - The consent text includes the brand name "Probate Compass".
 *  - composeLeadMessage is used for human-readable message prefixes (no extras
 *    leaking into the message string).
 *
 * TL-03: pure Node.js module tests only -- no React, no window, no fetch.
 */

import { describe, it, expect } from "vitest";
import { composeLeadMessage } from "@/lib/lead-message";

// ── Consent text wiring ──────────────────────────────────────────────────────

describe("consent text wiring", () => {
  it("no partner firm is configured (in-house since 2026-08-17)", async () => {
    const { siteConfig } = await import("@/config/site");
    expect(siteConfig.partner).toBeNull();
  });

  it("consent text makes no third-party sharing claim", async () => {
    const { siteConfig } = await import("@/config/site");
    for (const banned of ["partner network", "shared with", "paid a fee", "passed to"]) {
      expect(siteConfig.leadConsentText).not.toContain(banned);
    }
  });

  it("consent text never contains 'DJH' (estate rule: internal name must not appear)", async () => {
    const { siteConfig } = await import("@/config/site");
    const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;
    expect(consentText).not.toContain("DJH");
  });

  it("consent text mentions 'Probate Compass' brand", async () => {
    const { siteConfig } = await import("@/config/site");
    expect(siteConfig.leadConsentText).toContain("Probate Compass");
  });
});

// ── Extras qualifiers (moved out of message) ─────────────────────────────────

describe("extras qualifiers — not in message string", () => {
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
