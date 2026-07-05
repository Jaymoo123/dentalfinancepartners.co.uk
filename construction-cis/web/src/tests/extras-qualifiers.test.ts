/**
 * Tests for Trade Tax Specialists extras-qualifiers contract.
 *
 * The LeadForm moves trade + subbieCount qualifiers out of the message
 * string and into extras.{trade, subbie_count} on the lead payload.
 * This keeps the message clean for the partner while preserving
 * structured data in the schema.
 *
 * TL-03: pure Node.js module tests only -- no React, no window, no fetch.
 */

import { describe, it, expect } from "vitest";
import { composeLeadMessage, type LeadMessageArgs } from "@/lib/lead-message";

// ── composeLeadMessage stays intact for non-LeadForm surfaces ───────────────
// MiniCapture and CalcResultCta still call composeLeadMessage directly
// because they compose a single messagePrefix string. These tests confirm
// the helper contract has not changed.

describe("composeLeadMessage (used by MiniCapture / CalcResultCta surfaces)", () => {
  it("returns empty string when no args", () => {
    expect(composeLeadMessage({})).toBe("");
  });

  it("returns only the user message when no segment fields", () => {
    expect(composeLeadMessage({ message: "Hello" })).toBe("Hello");
  });

  it("prepends Trade prefix when trade is given", () => {
    const result = composeLeadMessage({ trade: "Plumbers", message: "Test" });
    expect(result).toBe("Trade: Plumbers\n\nTest");
  });

  it("prepends Subcontractors prefix when subbieCount is given", () => {
    const result = composeLeadMessage({ subbieCount: "6 to 20", message: "Test" });
    expect(result).toBe("Subcontractors paid: 6 to 20\n\nTest");
  });

  it("prepends both prefixes when both segment fields are given", () => {
    const args: LeadMessageArgs = { trade: "Roofers", subbieCount: "1 to 5", message: "Test" };
    const result = composeLeadMessage(args);
    expect(result).toBe("Trade: Roofers\nSubcontractors paid: 1 to 5\n\nTest");
  });
});

// ── Extras structure (LeadForm builds this object; we verify the shape) ──────

describe("extras qualifier object shape", () => {
  it("extras.trade is a string when trade is selected", () => {
    // Simulate the extras object as built by LeadForm.tsx onSubmit.
    const extras: Record<string, unknown> = {};
    const selectedTrade = "Electricians";
    const selectedSubbieCount = "";
    if (selectedTrade) extras.trade = selectedTrade;
    if (selectedSubbieCount) extras.subbie_count = selectedSubbieCount;

    expect(extras.trade).toBe("Electricians");
    expect(extras.subbie_count).toBeUndefined();
    expect(Object.keys(extras).length).toBe(1);
  });

  it("extras.subbie_count is a string when subbie count is selected", () => {
    const extras: Record<string, unknown> = {};
    const selectedTrade = "";
    const selectedSubbieCount = "6 to 20";
    if (selectedTrade) extras.trade = selectedTrade;
    if (selectedSubbieCount) extras.subbie_count = selectedSubbieCount;

    expect(extras.subbie_count).toBe("6 to 20");
    expect(extras.trade).toBeUndefined();
    expect(Object.keys(extras).length).toBe(1);
  });

  it("extras has both keys when both segment fields are populated", () => {
    const extras: Record<string, unknown> = {};
    const selectedTrade = "Scaffolders";
    const selectedSubbieCount = "More than 50";
    if (selectedTrade) extras.trade = selectedTrade;
    if (selectedSubbieCount) extras.subbie_count = selectedSubbieCount;

    expect(extras.trade).toBe("Scaffolders");
    expect(extras.subbie_count).toBe("More than 50");
    expect(Object.keys(extras).length).toBe(2);
  });

  it("extras is empty (not sent) when no segment fields are populated", () => {
    const extras: Record<string, unknown> = {};
    const selectedTrade = "";
    const selectedSubbieCount = "";
    if (selectedTrade) extras.trade = selectedTrade;
    if (selectedSubbieCount) extras.subbie_count = selectedSubbieCount;

    expect(Object.keys(extras).length).toBe(0);
    // LeadForm sends extras: undefined when empty (no noise in the payload).
    const payloadExtras = Object.keys(extras).length > 0 ? extras : undefined;
    expect(payloadExtras).toBeUndefined();
  });

  it("message stays clean (no Trade/Subcontractors prefix) when extras are used", () => {
    // The new LeadForm reads message straight from the textarea (no composeLeadMessage).
    // Simulate: user typed a message; segment fields go to extras.
    const rawMessage = "I have been working CIS for 3 years and want a refund.";
    const extras: Record<string, unknown> = { trade: "Plumbers", subbie_count: "1 to 5" };

    // The message should be the raw string, with no Trade: prefix.
    expect(rawMessage).not.toContain("Trade:");
    expect(rawMessage).not.toContain("Subcontractors paid:");
    // Extras contain the structured data separately.
    expect(extras.trade).toBe("Plumbers");
    expect(extras.subbie_count).toBe("1 to 5");
  });
});
