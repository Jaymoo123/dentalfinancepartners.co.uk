/**
 * Smoke test: Property niche config validates. Ensures the critical fields that
 * the analytics SDK, routing, and lead pipeline depend on are present and correct.
 * This is the F1 regression sentinel — if the config diverges, the test fails
 * before a build lands on prod.
 */
import { describe, it, expect } from "vitest";
// Use a relative path so the test works without Next.js module resolution.
import nicheConfig from "../../../niche.config.json";

describe("Property niche config", () => {
  it("has the correct site_key (analytics FK constraint)", () => {
    expect(nicheConfig.content_strategy.site_key).toBe("property");
  });

  it("has the correct source_identifier (lead pipeline key)", () => {
    expect(nicheConfig.content_strategy.source_identifier).toBe("property");
  });

  it("has a non-empty display_name", () => {
    expect(nicheConfig.display_name).toBeTruthy();
  });

  it("has a non-empty domain", () => {
    expect(nicheConfig.domain).toBeTruthy();
    expect(nicheConfig.domain).toContain("propertytaxpartners");
  });

  it("has a non-empty niche_id", () => {
    expect(nicheConfig.niche_id).toBe("property");
  });
});
