/**
 * Registry smoke tests for the divorce-finances calculator fleet.
 * STUB (scaffold phase): the fleet is empty; these tests pin the registry
 * contract so tool onboarding keeps unique slugs.
 */
import { describe, it, expect } from "vitest";
import { TOOLS, allTools, genericTools } from "./registry";

describe("calculator registry", () => {
  it("is empty at scaffold", () => {
    expect(TOOLS).toHaveLength(0);
  });

  it("helpers agree with the registry", () => {
    expect(allTools()).toHaveLength(TOOLS.length);
    expect(genericTools().length).toBeLessThanOrEqual(TOOLS.length);
  });

  it("slugs are unique", () => {
    const slugs = TOOLS.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
