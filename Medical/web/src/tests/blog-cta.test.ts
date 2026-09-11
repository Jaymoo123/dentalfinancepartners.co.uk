/**
 * Guards the per-category blog CTA map.
 *
 * `CTA_BY_CATEGORY` keys on `slugifyCategory()` output and feeds three surfaces
 * (the post `#enquiry-form`, the post sidebar card, the hub lead panel). A
 * missing key silently drops a whole category onto the generic variant copy,
 * which is exactly how Property put 57 posts on the wrong CTA and noticed
 * months later. An orphan key is the same failure in reverse: copy written for
 * a category that no longer exists, which nothing renders and nothing flags.
 *
 * Both directions fail here. The expected set is derived from the POSTS via
 * `getAllCategories()`, never from `niche.config.json`, which lists a ninth
 * category ("Consultant Tax") with zero posts and no hub route.
 *
 * The third test guards the `post.schema` bypass in BlogPostRenderer: a post
 * shipping its own schema string suppresses `buildBlogPostingJsonLd`, so it
 * would render the FAQ `<dl>` while emitting a FAQPage that says something
 * else, or none at all. Today all 88 posts ship `schema: ""`, so the bypass
 * never fires; this fails the moment one starts.
 */
import { describe, it, expect } from "vitest";
import { CTA_BY_CATEGORY } from "@/lib/blog-cta";
import { getAllCategories, getAllPosts } from "@/lib/blog";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("blog CTA map", () => {
  const categorySlugs = getAllCategories().map((c) => c.slug);

  it("derives a non-empty category set from the posts", () => {
    expect(categorySlugs.length).toBeGreaterThan(0);
  });

  it("has an entry for every live category slug", () => {
    const missing = categorySlugs.filter((slug) => !CTA_BY_CATEGORY[slug]);
    expect(missing).toEqual([]);
  });

  it("has no orphan keys", () => {
    const orphans = Object.keys(CTA_BY_CATEGORY).filter(
      (key) => !categorySlugs.includes(key),
    );
    expect(orphans).toEqual([]);
  });

  it("ships complete copy in every entry", () => {
    for (const [slug, copy] of Object.entries(CTA_BY_CATEGORY)) {
      expect(copy.heading.trim(), slug).not.toBe("");
      expect(copy.body.trim(), slug).not.toBe("");
      expect(copy.button.trim(), slug).not.toBe("");
    }
  });
});

describe("blog JSON-LD bypass", () => {
  it("no post carries both a custom schema and faqs", () => {
    const clashes = getAllPosts()
      .filter((p) => p.schema?.trim() && p.faqs && p.faqs.length > 0)
      .map((p) => p.slug);
    expect(clashes).toEqual([]);
  });
});

/**
 * WIRING guard, added after an adversarial review pointed out that everything
 * above tests the DATA and nothing tests the PLUMBING: if the renderer or a hub
 * stopped calling `blogCtaFor()` and fell back to the generic variant copy, all
 * of the assertions above would still pass and all 88 articles plus 8 hubs would
 * quietly show the wrong call to action. That is the exact failure mode of the
 * Property incident these tests were written for, so guarding the map without
 * guarding the call site guards the wrong half.
 *
 * This is a source-level assertion on purpose. The consumers are React Server
 * Components; rendering them in vitest would need a full RSC harness, which is a
 * lot of machinery to prove one import is still wired.
 */
const HUB_SLUGS = Object.keys(CTA_BY_CATEGORY);

describe("blog CTA wiring", () => {
  const CONSUMERS = [
    "src/components/blog/BlogPostRenderer.tsx",
    ...HUB_SLUGS.map((slug) => `src/app/blog/${slug}/page.tsx`),
  ];

  it.each(CONSUMERS)("%s still resolves its CTA copy through blogCtaFor()", (relPath) => {
    const source = readFileSync(join(process.cwd(), relPath), "utf8");
    expect(source, `${relPath} no longer imports blogCtaFor`).toMatch(
      /from\s+["']@\/lib\/blog-cta["']/,
    );
    expect(source, `${relPath} imports blogCtaFor but never calls it`).toMatch(/blogCtaFor\s*\(/);
  });
});
