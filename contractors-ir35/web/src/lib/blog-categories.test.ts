import { describe, it, expect } from "vitest";
import { getAllCategories } from "./blog";
import { CTA_BY_CATEGORY, CATEGORY_HUBS, ctaCopyForCategory } from "./blog-categories";
import { PAGE_SUMMARIES, pageSummary } from "./page-summaries";

/**
 * The one check these registries need: every category the CORPUS actually
 * contains must have authored copy. Config disagrees with the corpus on other
 * sites in the estate, so the corpus is the source here and this test is what
 * fails if a new category is filed without copy to go with it.
 */
describe("per-category blog copy", () => {
  const slugs = getAllCategories().map((c) => c.slug);

  it("covers every category slug in the corpus", () => {
    expect(slugs.length).toBeGreaterThan(0);
    for (const slug of slugs) {
      expect(CTA_BY_CATEGORY[slug], `CTA copy for ${slug}`).toBeDefined();
      expect(CATEGORY_HUBS[slug], `hub definition for ${slug}`).toBeDefined();
    }
  });

  it("falls back to the general copy for an unmapped slug", () => {
    expect(ctaCopyForCategory("not-a-category")).toBe(CTA_BY_CATEGORY.general);
  });

  it("uses no em-dashes and publishes no fee or turnaround figure", () => {
    const copy = [
      ...Object.values(CTA_BY_CATEGORY).flatMap((c) => [c.heading, c.body, c.button]),
      ...Object.values(CATEGORY_HUBS).flatMap((h) => [h.heading, h.description, h.intro]),
      ...Object.values(PAGE_SUMMARIES),
    ];
    for (const line of copy) {
      expect(line, line).not.toMatch(/—/);
      expect(line, line).not.toMatch(/£\s?\d/);
      expect(line, line).not.toMatch(/\b(within|inside)\s+\d+\s*(hours?|days?|working days?)\b/i);
    }
  });

  it("resolves a page summary by href, ignoring query and hash", () => {
    expect(pageSummary("/ir35-status?utm_source=x")).toBe(PAGE_SUMMARIES["/ir35-status"]);
  });
});
