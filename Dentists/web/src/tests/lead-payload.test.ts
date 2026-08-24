/**
 * Tests for the Dental Finance Partners lead-message helpers and consent text wiring.
 *
 * Verifies:
 *  - calculatorMessagePrefix and exitIntentMessagePrefix produce correct output.
 *  - The consent notice names the specialist partner network, discloses re-referral,
 *    and never "DJH" (internal name; must not appear in user-facing copy).
 *
 * TL-03: pure Node.js module tests only -- no React, no window, no fetch.
 */

import { describe, it, expect } from "vitest";
import { calculatorMessagePrefix, exitIntentMessagePrefix } from "@/lib/lead-message";

// ── calculatorMessagePrefix ──────────────────────────────────────────────────

describe("calculatorMessagePrefix", () => {
  it("returns correct bracketed prefix for a given slug", () => {
    expect(calculatorMessagePrefix("locum-structure")).toBe("[Calculator: locum-structure] ");
  });

  it("returns correct prefix for principal-extraction", () => {
    expect(calculatorMessagePrefix("principal-extraction")).toBe("[Calculator: principal-extraction] ");
  });

  it("trailing space ensures message appends cleanly", () => {
    const prefix = calculatorMessagePrefix("uda-value");
    const full = `${prefix}My question here.`;
    expect(full).toBe("[Calculator: uda-value] My question here.");
  });

  it("does not modify the slug", () => {
    const slug = "associate-take-home";
    expect(calculatorMessagePrefix(slug)).toContain(slug);
  });
});

// ── exitIntentMessagePrefix ──────────────────────────────────────────────────

describe("exitIntentMessagePrefix", () => {
  it("returns correct bracketed prefix for a topic label", () => {
    expect(exitIntentMessagePrefix("Associate Tax")).toBe("[Exit intent (Associate Tax)] ");
  });

  it("returns correct prefix for another topic", () => {
    expect(exitIntentMessagePrefix("Practice Finance")).toBe("[Exit intent (Practice Finance)] ");
  });

  it("trailing space ensures message appends cleanly", () => {
    const prefix = exitIntentMessagePrefix("Locum Tax");
    const full = `${prefix}My question here.`;
    expect(full).toBe("[Exit intent (Locum Tax)] My question here.");
  });
});

// ── Consent text wiring ──────────────────────────────────────────────────────

describe("consent text wiring", () => {
  // Owner decision 2026-08-24: reverted to the pre-2026-08-15 wording after the
  // estate mini-form conversion collapse (step-2 completion went to zero under the
  // "will share ... regulated firms" notice). Plurality disclosure now lives in the
  // privacy policy (layer 2); the pool gate anchor phrase is
  // "a firm from our specialist partner network" (Property offer-send.ts). The
  // wording is brand-free (identical across sites), so the old brand-mention
  // assertion is gone too. We import the site config rather than duplicating the
  // string so this fails the moment the config changes.
  const EXPECTED_CONSENT =
    "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this.";

  it("consent notice is the estate-standard sharing wording, pinned verbatim", async () => {
    const { siteConfig } = await import("@/config/site");
    expect(siteConfig.leadConsentText).toBe(EXPECTED_CONSENT);
  });

  it("consent text never contains 'DJH' or 'Reflex' (copy discipline: no internal/named-partner mentions)", async () => {
    const { siteConfig } = await import("@/config/site");
    const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;
    expect(consentText).not.toContain("DJH");
    expect(consentText).not.toContain("Reflex");
  });
});
