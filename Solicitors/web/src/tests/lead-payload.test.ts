/**
 * Tests for the Solicitors lead-message helpers and consent text wiring.
 *
 * Verifies:
 *  - composeLeadMessage and composeHealthCheckSummary produce correct output.
 *  - The consent notice names the specialist partner network, discloses
 *    re-referral, and never contains "DJH".
 *
 * TL-03: pure Node.js module tests only -- no React, no window, no fetch.
 */

import { describe, it, expect } from "vitest";
import {
  composeLeadMessage,
  composeHealthCheckSummary,
} from "@/lib/lead-message";

// ── composeLeadMessage ──────────────────────────────────────────────────────

describe("composeLeadMessage", () => {
  it("returns empty string when all args are undefined", () => {
    expect(composeLeadMessage({})).toBe("");
  });

  it("returns user message only when no segment fields are filled", () => {
    expect(composeLeadMessage({ message: "Hello" })).toBe("Hello");
  });

  it("returns context prefix when only context is given", () => {
    expect(composeLeadMessage({ context: "Partner" })).toBe("Context: Partner");
  });

  it("returns qualifier prefix when only qualifier is given", () => {
    expect(composeLeadMessage({ qualifier: "LLP" })).toBe("Detail: LLP");
  });

  it("combines both prefix lines when both are given, no user message", () => {
    const result = composeLeadMessage({ context: "Partner", qualifier: "LLP" });
    expect(result).toBe("Context: Partner\nDetail: LLP");
  });

  it("separates prefix block from user message with a blank line", () => {
    const result = composeLeadMessage({ context: "Associate", message: "I need help with SRA compliance." });
    expect(result).toBe("Context: Associate\n\nI need help with SRA compliance.");
  });

  it("trims whitespace from all inputs", () => {
    const result = composeLeadMessage({ context: "  Partner  ", message: "  Hello  " });
    expect(result).toBe("Context: Partner\n\nHello");
  });

  it("ignores empty string context (no prefix line added)", () => {
    const result = composeLeadMessage({ context: "", message: "Just a message." });
    expect(result).toBe("Just a message.");
  });

  it("ignores whitespace-only context", () => {
    const result = composeLeadMessage({ context: "   ", message: "Just a message." });
    expect(result).toBe("Just a message.");
  });

  it("returns only prefix block (no trailing blank line) when message is empty string", () => {
    const result = composeLeadMessage({ context: "Partner", message: "" });
    expect(result).toBe("Context: Partner");
    expect(result.endsWith("\n")).toBe(false);
  });
});

// ── composeHealthCheckSummary ────────────────────────────────────────────────

describe("composeHealthCheckSummary", () => {
  it("always starts with the submission header", () => {
    const result = composeHealthCheckSummary({});
    expect(result).toBe("Firm health check submission");
  });

  it("includes role when provided", () => {
    const result = composeHealthCheckSummary({ role: "Partner" });
    expect(result).toContain("Role: Partner");
  });

  it("includes firmType when provided", () => {
    const result = composeHealthCheckSummary({ firmType: "Sole practitioner" });
    expect(result).toContain("Firm type: Sole practitioner");
  });

  it("includes cofaInPlace as 'yes' when true", () => {
    const result = composeHealthCheckSummary({ cofaInPlace: true });
    expect(result).toContain("COFA in place: yes");
  });

  it("includes cofaInPlace as 'NO' when false (uppercase signals urgency)", () => {
    const result = composeHealthCheckSummary({ cofaInPlace: false });
    expect(result).toContain("COFA in place: NO");
  });

  it("omits cofaInPlace line when undefined", () => {
    const result = composeHealthCheckSummary({});
    expect(result).not.toContain("COFA");
  });

  it("includes topConcern when non-empty", () => {
    const result = composeHealthCheckSummary({ topConcern: "FA 2014 salaried member test" });
    expect(result).toContain("Top concern: FA 2014 salaried member test");
  });

  it("omits topConcern when empty", () => {
    const result = composeHealthCheckSummary({ topConcern: "" });
    expect(result).not.toContain("Top concern");
  });

  it("combines all fields correctly", () => {
    const result = composeHealthCheckSummary({
      role: "Partner",
      firmType: "LLP",
      practiceArea: "Conveyancing",
      entity: "LLP",
      cofaInPlace: true,
      topConcern: "Pre-sale planning",
    });
    expect(result).toContain("Firm health check submission");
    expect(result).toContain("Role: Partner");
    expect(result).toContain("Firm type: LLP");
    expect(result).toContain("Practice area: Conveyancing");
    expect(result).toContain("Entity: LLP");
    expect(result).toContain("COFA in place: yes");
    expect(result).toContain("Top concern: Pre-sale planning");
  });
});

// ── Consent text wiring ──────────────────────────────────────────────────────

describe("consent text wiring", () => {
  // Owner decision 2026-08-24: reverted to the pre-2026-08-15 wording after the
  // estate mini-form conversion collapse (step-2 completion went to zero under the
  // "will share ... regulated firms" notice). Plurality disclosure now lives in the
  // privacy policy (layer 2); the pool gate anchor phrase is
  // "a firm from our specialist partner network" (Property offer-send.ts). We import
  // the site config here rather than duplicating the string in tests so this test
  // fails immediately when the config changes.
  const EXPECTED_CONSENT =
    "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this.";

  it("consent notice is the estate-standard sharing wording, pinned verbatim", async () => {
    const { siteConfig } = await import("@/config/site");
    expect(siteConfig.leadConsentText).toBe(EXPECTED_CONSENT);
  });

  it("consent text never contains 'DJH' (copy discipline: internal name must not appear)", async () => {
    const { siteConfig } = await import("@/config/site");
    const consentText = `${siteConfig.leadConsentText} See our Privacy Policy.`;
    expect(consentText).not.toContain("DJH");
  });
});
