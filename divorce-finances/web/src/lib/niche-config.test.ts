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

  it("site_key is 'divorce-finances' (PF-07 guard)", () => {
    expect(niche.content_strategy.site_key).toBe("divorce-finances");
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

  it("has 6 categories", () => {
    expect(niche.content_strategy.categories).toHaveLength(6);
  });

  it("categories include the 6 expected names", () => {
    const cats = niche.content_strategy.categories as string[];
    expect(cats).toContain("Financial Settlements");
    expect(cats).toContain("Pensions and Divorce");
    expect(cats).toContain("Tax on Divorce");
    expect(cats).toContain("The Family Home");
    expect(cats).toContain("Maintenance and Support");
    expect(cats).toContain("Process and Costs");
  });
});
