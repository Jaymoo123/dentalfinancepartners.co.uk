/**
 * Site-parameterised consumption of the estate `first-sentence` guard: the
 * excerpt function behind every related-reading card must stay readable across
 * the WHOLE corpus, not just the posts someone eyeballed.
 *
 * Un-skipped in Phase 3 (blog subsystem): `firstSentence` now lives in
 * `src/lib/blog.ts` and feeds the kit `RelatedArticles` grid on every article,
 * pillar guide and glossary term. Non-article routes stay covered by
 * `src/lib/page-summaries.ts`, asserted below.
 */
import { describe, it, expect } from "vitest";
import { registerFirstSentenceGuard } from "@accounting-network/web-shared/design/guards/first-sentence";
import { firstSentence, getAllPosts } from "@/lib/blog";
import { PAGE_SUMMARIES, pageSummary } from "@/lib/page-summaries";

registerFirstSentenceGuard({
  firstSentence,
  getPosts: () =>
    getAllPosts().map((p) => ({
      slug: p.slug,
      contentHtml: p.contentHtml,
      summary: p.summary,
    })),
  minPosts: 1,
});

describe("page summaries", () => {
  it("gives every registered route one readable sentence", () => {
    const bad: string[] = [];
    for (const [href, summary] of Object.entries(PAGE_SUMMARIES)) {
      if (!href.startsWith("/")) bad.push(`${href}: not an internal route`);
      if (summary.length < 40) bad.push(`${href}: too short (${summary.length})`);
      if (!/\.$/.test(summary)) bad.push(`${href}: does not end in a full stop`);
      if (summary.includes("—")) bad.push(`${href}: contains an em dash`);
    }
    expect(bad, bad.join("\n")).toEqual([]);
  });

  it("resolves a route with a query string or fragment", () => {
    expect(pageSummary("/contact?utm_source=x")).toBe(PAGE_SUMMARIES["/contact"]);
    expect(pageSummary("/contact#section")).toBe(PAGE_SUMMARIES["/contact"]);
    expect(pageSummary("/nope")).toBeUndefined();
  });
});
