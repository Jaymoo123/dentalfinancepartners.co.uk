/**
 * Guards for the per-category enquiry copy that WP1 puts on 223 articles.
 *
 * Two things can silently break it: a new category slug appearing in content
 * with no key here (the post then falls back to the generic string and the
 * sidebar card stops matching the reader's intent), and a copy edit that
 * reintroduces a banned claim on 223 published pages at once.
 *
 * The third block is the T17 parity guard: the FAQ answers in the JSON-LD and
 * the FAQ answers in the DOM must come from ONE binding, `post.faqs`.
 */
import { describe, it, expect } from "vitest";
import { getAllCategories, getAllPosts, getCategorySlug } from "@/lib/blog";
import { buildBlogPostingJsonLd } from "@/lib/schema";
import { CTA_BY_CATEGORY } from "./cta-copy";

describe("blog CTA copy map", () => {
  it("has a key for every category slug the content produces", () => {
    const slugs = getAllCategories().map((c) => c.slug).sort();
    expect(Object.keys(CTA_BY_CATEGORY).sort()).toEqual(slugs);
  });

  it("carries no em-dash, no pricing and no turnaround promise", () => {
    for (const [slug, copy] of Object.entries(CTA_BY_CATEGORY)) {
      const text = `${copy.heading} ${copy.body} ${copy.button}`;
      expect(text, slug).not.toMatch(/—/);
      expect(text, slug).not.toMatch(/£|\bfixed fee|\bfrom just\b/i);
      expect(text, slug).not.toMatch(/\b24 hours?\b|same day|within \d|\bguarantee/i);
      // No client-count or aggregate-performance claims.
      expect(text, slug).not.toMatch(/\b\d[\d,]*\+?\s+(dentists|practices|clients)\b/i);
      expect(copy.heading.length, slug).toBeGreaterThan(10);
      expect(copy.button.length, slug).toBeGreaterThan(5);
    }
  });
});

describe("T17: FAQ answers have one source", () => {
  it("every schema answer is its post.faqs answer with tags stripped", () => {
    const posts = getAllPosts();
    let answers = 0;
    let verbatim = 0;
    for (const post of posts) {
      if (!post.faqs?.length) continue;
      // Exactly what the renderer emits: verbatim `schema` frontmatter when it
      // exists, the builder otherwise.
      const emitted =
        post.schema?.trim() ||
        buildBlogPostingJsonLd(post, `/blog/${getCategorySlug(post)}/${post.slug}`);
      if (post.schema?.trim()) verbatim += 1;
      const parsed = JSON.parse(emitted);
      const graph: { "@type"?: string }[] = Array.isArray(parsed)
        ? parsed
        : Array.isArray((parsed as { "@graph"?: unknown[] })["@graph"])
          ? ((parsed as { "@graph": { "@type"?: string }[] })["@graph"])
          : [parsed];
      const faqDoc = graph.find((d) => d["@type"] === "FAQPage") as unknown as {
        mainEntity: { name: string; acceptedAnswer: { text: string } }[];
      };
      expect(faqDoc, post.slug).toBeTruthy();
      expect(faqDoc.mainEntity.length, post.slug).toBe(post.faqs.length);
      faqDoc.mainEntity.forEach((q, i) => {
        // The renderer writes post.faqs[i].answer into the <dd>; the schema
        // writes the same string with tags stripped. Same binding, same order.
        expect(q.name, post.slug).toBe(post.faqs![i].question);
        expect(q.acceptedAnswer.text, post.slug).toBe(
          post.faqs![i].answer.replace(/<[^>]+>/g, ""),
        );
        answers += 1;
      });
    }
    expect(answers).toBe(1469);
    expect(verbatim).toBe(48);
  });
});
