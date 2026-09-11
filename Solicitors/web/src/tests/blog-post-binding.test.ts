/**
 * Blog post renderer bindings, asserted against the LIVE corpus and the REAL
 * functions (never a local re-implementation of either).
 *
 * Three bindings, each of which is currently correct and each of which breaks
 * silently in production if it stops being:
 *
 * (a) The renderer emits `post.schema?.trim() || buildBlogPostingJsonLd(...)`.
 *     Every `schema:` value in the corpus is the empty string today, so the
 *     builder always wins and the FAQPage it nests is live on every post. A
 *     post that ships a NON-EMPTY schema alongside faqs would silently lose
 *     that FAQPage.
 * (b) One `post.faqs` array feeds both the visible <dl> and the JSON-LD. If the
 *     builder ever emitted a second FAQPage, or a subset of the questions, the
 *     page and its structured data would disagree.
 * (c) `getRelatedPosts` (src/lib/blog.ts:95) compares the RAW category label,
 *     while every route is keyed on `slugifyCategory()` output. That is safe
 *     only while the label-to-slug map is injective. The day a second spelling
 *     of a category lands, related posts split in half and no route 404s to
 *     say so.
 */
import { describe, it, expect } from "vitest";
import { getAllPosts, getAllCategories, slugifyCategory } from "@/lib/blog";
import { buildBlogPostingJsonLd } from "@/lib/schema";

const posts = getAllPosts();

describe("blog post bindings", () => {
  it("reads a non-empty corpus", () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it("never ships a non-empty schema alongside faqs", () => {
    const offenders = posts
      .filter((p) => (p.schema ?? "").trim().length > 0 && (p.faqs?.length ?? 0) > 0)
      .map((p) => p.slug);
    expect(
      offenders,
      `these posts would drop their FAQPage, the custom schema wins over the builder: ${offenders.join(", ")}`,
    ).toEqual([]);
  });

  it("emits exactly one FAQPage per post, carrying every question", () => {
    const withFaqs = posts.filter((p) => (p.faqs?.length ?? 0) > 0);
    expect(withFaqs.length).toBeGreaterThan(0);

    for (const post of withFaqs) {
      const parsed = JSON.parse(
        buildBlogPostingJsonLd(post, `/blog/${slugifyCategory(post.category)}/${post.slug}`),
      );
      const nodes: Array<Record<string, unknown>> = Array.isArray(parsed) ? parsed : [parsed];
      const faqPages = nodes.filter((n) => n["@type"] === "FAQPage");
      expect(faqPages.length, `${post.slug} emitted ${faqPages.length} FAQPage objects`).toBe(1);
      expect(
        (faqPages[0].mainEntity as unknown[]).length,
        `${post.slug} JSON-LD question count differs from the rendered <dl>`,
      ).toBe(post.faqs!.length);
    }
  });

  it("slugifies categories injectively", () => {
    const categories = getAllCategories();
    const bySlug = new Map<string, string[]>();
    for (const c of categories) {
      bySlug.set(c.slug, [...(bySlug.get(c.slug) ?? []), c.name]);
    }
    const collisions = [...bySlug.entries()].filter(([, labels]) => labels.length > 1);
    expect(
      collisions.map(([slug, labels]) => `${slug} <- ${labels.join(" | ")}`),
      "two category labels share one slug, so getRelatedPosts (src/lib/blog.ts:95) now splits that category: it compares the RAW label while every route is keyed on the slug",
    ).toEqual([]);
    expect(bySlug.size).toBe(categories.length);
  });
});
