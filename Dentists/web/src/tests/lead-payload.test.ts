/**
 * Tests for the Dental Finance Partners lead-message helpers and consent text wiring.
 *
 * Verifies:
 *  - calculatorMessagePrefix and exitIntentMessagePrefix produce correct output.
 *  - The consent text includes "Reflex" (the partner name per data-sharing agreement)
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
  it("consent text includes 'Reflex' (partner name required by data-sharing agreement)", async () => {
    // The niche.config.json partner is "Reflex Accounting". The siteConfig
    // leadConsentText must mention the partner so the disclosure is accurate.
    // We import the site config here rather than duplicating the string in tests
    // so this test fails immediately when the config changes.
    const { siteConfig } = await import("@/config/site");
    const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;
    expect(consentText).toContain("Reflex");
  });

  it("consent text never contains 'DJH' (copy discipline: internal name must not appear)", async () => {
    const { siteConfig } = await import("@/config/site");
    const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;
    expect(consentText).not.toContain("DJH");
  });

  it("consent text mentions 'Dental Finance Partners' brand", async () => {
    const { siteConfig } = await import("@/config/site");
    expect(siteConfig.leadConsentText).toContain("Dental Finance Partners");
  });
});
