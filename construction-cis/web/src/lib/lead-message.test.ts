/**
 * Tests for composeLeadMessage pure helper.
 *
 * TL-03: no react/window/document/fetch — pure Node.js module tests only.
 */

import { describe, it, expect } from "vitest";
import { composeLeadMessage } from "./lead-message";

describe("composeLeadMessage", () => {
  it("returns empty string when all args are undefined", () => {
    expect(composeLeadMessage({})).toBe("");
  });

  it("returns user message only when no segment fields are filled", () => {
    expect(composeLeadMessage({ message: "Hello" })).toBe("Hello");
  });

  it("returns trade prefix when only trade is given", () => {
    expect(composeLeadMessage({ trade: "Roofer" })).toBe("Trade: Roofer");
  });

  it("returns subbieCount prefix when only subbieCount is given", () => {
    expect(composeLeadMessage({ subbieCount: "6 to 20" })).toBe(
      "Subcontractors paid: 6 to 20"
    );
  });

  it("combines both prefix lines when both are given, no user message", () => {
    const result = composeLeadMessage({ trade: "Plumbers", subbieCount: "1 to 5" });
    expect(result).toBe("Trade: Plumbers\nSubcontractors paid: 1 to 5");
  });

  it("separates prefix block from user message with a blank line", () => {
    const result = composeLeadMessage({ trade: "Roofer", message: "I think I am owed a refund." });
    expect(result).toBe("Trade: Roofer\n\nI think I am owed a refund.");
  });

  it("includes both prefix lines and user message, separated by blank line", () => {
    const result = composeLeadMessage({
      trade: "Electricians",
      subbieCount: "6 to 20",
      message: "Please call me back.",
    });
    expect(result).toBe(
      "Trade: Electricians\nSubcontractors paid: 6 to 20\n\nPlease call me back."
    );
  });

  it("trims whitespace from all inputs", () => {
    const result = composeLeadMessage({ trade: "  Roofer  ", message: "  Hello  " });
    expect(result).toBe("Trade: Roofer\n\nHello");
  });

  it("ignores empty string trade (no prefix line added)", () => {
    const result = composeLeadMessage({ trade: "", message: "Just a message." });
    expect(result).toBe("Just a message.");
  });

  it("ignores whitespace-only trade", () => {
    const result = composeLeadMessage({ trade: "   ", message: "Just a message." });
    expect(result).toBe("Just a message.");
  });

  it("returns only prefix block (no trailing blank line) when message is empty string", () => {
    const result = composeLeadMessage({ trade: "Scaffolders", message: "" });
    expect(result).toBe("Trade: Scaffolders");
    expect(result.endsWith("\n")).toBe(false);
  });

  it("returns only user message when trade and subbieCount are empty strings", () => {
    const result = composeLeadMessage({ trade: "", subbieCount: "", message: "Test" });
    expect(result).toBe("Test");
  });
});
