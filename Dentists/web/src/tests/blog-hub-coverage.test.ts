/**
 * Guards for the twelve /blog/<category> hubs after the convergence.
 *
 * The hubs are the only full HTML crawl path to all 223 posts, so a post that
 * lands in no hub, or in two, is a link-floor breach and an orphaned article at
 * the same time. The corpus carries case variants of six category labels
 * ("Associate Tax" / "Associate tax", "VAT & Compliance" / "VAT & compliance")
 * which merge into one hub ONLY because slugifyCategory lowercases. That is
 * asserted here rather than assumed.
 */
import { describe, it, expect } from "vitest";
import { getAllPosts, getAllCategories, slugifyCategory } from "@/lib/blog";
import { CTA_BY_CATEGORY } from "@/lib/blog/cta-copy";

const STATIC_HUB_SLUGS = [
  "associate-tax",
  "buying-a-practice",
  "practice-accounting",
  "practice-finance",
  "vat-and-compliance",
];

describe("blog category hubs", () => {
  it("every post lands in exactly one hub", () => {
    const slugs = new Set(getAllCategories().map((c) => c.slug));
    for (const post of getAllPosts()) {
      const matches = [...slugs].filter((s) => slugifyCategory(post.category) === s);
      expect(matches, `${post.slug} (category "${post.category}")`).toHaveLength(1);
    }
  });

  it("case and ampersand variants of a label merge into one hub", () => {
    expect(slugifyCategory("Associate Tax")).toBe(slugifyCategory("Associate tax"));
    expect(slugifyCategory("VAT & Compliance")).toBe("vat-and-compliance");
    expect(slugifyCategory("VAT & compliance")).toBe("vat-and-compliance");
    // The merge is what keeps the hub count at twelve; a label split would show
    // up here as a thirteenth category before it showed up as a broken hub.
    expect(getAllCategories()).toHaveLength(12);
  });

  it("the five static hub routes are real categories, so none shadows an empty page", () => {
    const slugs = getAllCategories().map((c) => c.slug);
    for (const s of STATIC_HUB_SLUGS) expect(slugs).toContain(s);
  });

  it("every hub has its own CTA copy, so none falls through to the generic string", () => {
    for (const c of getAllCategories()) {
      expect(CTA_BY_CATEGORY, `no CTA copy for hub /blog/${c.slug}`).toHaveProperty(c.slug);
    }
  });
});
