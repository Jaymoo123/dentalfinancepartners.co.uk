/**
 * Guard: every live blog category resolves to a real per-category CTA entry.
 *
 * The article renderer and the sidebar card both read `CTA_BY_CATEGORY`, keyed
 * on the category SLUG. A category whose slug has no entry falls through to
 * `CTA_FALLBACK`, which is generic copy nobody authored for that topic, and
 * nothing in the build would complain. The category count is DERIVED from the
 * corpus, never typed: the disposition asserted 83 posts and 8 categories from
 * a stale count, and a hardcoded number here would be wrong the first time a
 * category is added.
 */
import { describe, expect, it } from "vitest";
import { getAllCategories } from "@/lib/blog";
import { CTA_BY_CATEGORY } from "@/lib/blog-cta-map";

describe("per-category blog CTA map", () => {
  const categories = getAllCategories();

  it("finds categories to check", () => {
    expect(categories.length).toBeGreaterThan(0);
  });

  it("has an entry for every live category slug", () => {
    const missing = categories
      .map((c) => c.slug)
      .filter((slug) => !(slug in CTA_BY_CATEGORY));
    expect(missing, `category slugs with no CTA_BY_CATEGORY entry: ${missing.join(", ")}`).toEqual([]);
  });

  it("has no entry pointing at a category that no longer exists", () => {
    const live = new Set(categories.map((c) => c.slug));
    const orphans = Object.keys(CTA_BY_CATEGORY).filter((slug) => !live.has(slug));
    expect(orphans, `CTA_BY_CATEGORY keys with no category: ${orphans.join(", ")}`).toEqual([]);
  });

  it("gives every entry a heading, a body and a button label", () => {
    for (const [slug, copy] of Object.entries(CTA_BY_CATEGORY)) {
      expect(copy.heading.length, slug).toBeGreaterThan(10);
      expect(copy.body.length, slug).toBeGreaterThan(40);
      expect(copy.button.length, slug).toBeGreaterThan(5);
    }
  });
});
