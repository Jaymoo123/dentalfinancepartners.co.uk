/**
 * Smoke tests for the niche config and site key contract.
 *
 * PF-07: siteKey must come from niche.content_strategy.site_key, never a literal.
 * TL-03: no react/window/document/fetch.
 */

import { describe, it, expect } from "vitest";
import { niche } from "@/config/niche-loader";

describe("niche config", () => {
  it("loads and validates without throwing", () => {
    expect(niche).toBeDefined();
  });

  it("has a non-empty site_key", () => {
    expect(niche.content_strategy.site_key).toBeTruthy();
    expect(typeof niche.content_strategy.site_key).toBe("string");
  });

  it("site_key is 'contractors-ir35' (PF-07 guard)", () => {
    expect(niche.content_strategy.site_key).toBe("contractors-ir35");
  });

  it("has a non-empty domain", () => {
    expect(niche.domain).toBeTruthy();
  });

  it("has brand.primary_color defined", () => {
    expect(niche.brand.primary_color).toBeTruthy();
    // Should be a valid hex color or CSS value
    expect(niche.brand.primary_color).toMatch(/^#/);
  });

  it("has a non-empty display_name", () => {
    expect(niche.display_name).toBeTruthy();
  });

  it("has source_identifier set", () => {
    expect(niche.content_strategy.source_identifier).toBeTruthy();
  });

  it("has blog cta_heading and cta_button", () => {
    expect(niche.blog.cta_heading).toBeTruthy();
    expect(niche.blog.cta_button).toBeTruthy();
  });
});
