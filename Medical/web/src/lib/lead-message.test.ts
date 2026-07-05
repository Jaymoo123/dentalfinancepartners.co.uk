/**
 * Tests for Medical Accountants UK lead message prefix helpers.
 */

import { describe, it, expect } from "vitest";
import { calculatorMessagePrefix, exitIntentMessagePrefix, healthCheckMessagePrefix } from "./lead-message";

describe("calculatorMessagePrefix", () => {
  it("returns expected format for a calculator slug", () => {
    expect(calculatorMessagePrefix("locum-tax-calculator")).toBe("[Calculator: locum-tax-calculator] ");
  });

  it("returns expected format for the NHS pension calculator", () => {
    expect(calculatorMessagePrefix("nhs-pension-annual-allowance")).toBe("[Calculator: nhs-pension-annual-allowance] ");
  });

  it("returns expected format for incorporation calculator", () => {
    expect(calculatorMessagePrefix("private-practice-incorporation")).toBe("[Calculator: private-practice-incorporation] ");
  });

  it("does not contain DJH", () => {
    expect(calculatorMessagePrefix("any-tool")).not.toContain("DJH");
  });

  it("does not contain an em-dash", () => {
    expect(calculatorMessagePrefix("any-tool")).not.toContain("—");
  });
});

describe("exitIntentMessagePrefix", () => {
  it("returns expected format for a topic label", () => {
    expect(exitIntentMessagePrefix("NHS Pension Planning")).toBe("[Exit intent (NHS Pension Planning)] ");
  });

  it("returns expected format for a category label", () => {
    expect(exitIntentMessagePrefix("Locum Tax")).toBe("[Exit intent (Locum Tax)] ");
  });

  it("does not contain DJH", () => {
    expect(exitIntentMessagePrefix("any-topic")).not.toContain("DJH");
  });

  it("does not contain an em-dash", () => {
    expect(exitIntentMessagePrefix("any-topic")).not.toContain("—");
  });
});

describe("healthCheckMessagePrefix", () => {
  it("includes the role in the prefix", () => {
    const prefix = healthCheckMessagePrefix("gp-partner", ["NHS pension annual allowance charge received"]);
    expect(prefix).toContain("role=gp-partner");
  });

  it("includes high-priority findings (up to 3) in the prefix", () => {
    const findings = ["Finding A", "Finding B", "Finding C", "Finding D"];
    const prefix = healthCheckMessagePrefix("consultant", findings);
    expect(prefix).toContain("Finding A");
    expect(prefix).toContain("Finding B");
    expect(prefix).toContain("Finding C");
    // 4th finding should not appear (only first 3)
    expect(prefix).not.toContain("Finding D");
  });

  it("handles empty findings gracefully", () => {
    const prefix = healthCheckMessagePrefix("locum", []);
    expect(prefix).toContain("no high-priority findings");
  });

  it("does not contain DJH", () => {
    const prefix = healthCheckMessagePrefix("gp-partner", ["Any finding"]);
    expect(prefix).not.toContain("DJH");
  });

  it("does not contain an em-dash", () => {
    const prefix = healthCheckMessagePrefix("gp-partner", ["Any finding"]);
    expect(prefix).not.toContain("—");
  });
});
