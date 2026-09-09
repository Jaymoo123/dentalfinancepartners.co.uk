/**
 * Site-parameterised consumption of the estate `first-sentence` guard: the
 * excerpt function behind every related-reading card must stay readable across
 * the WHOLE corpus, not just the posts someone eyeballed.
 *
 * SKIPPED FOR NOW. This site has no `firstSentence` implementation yet
 * (`src/lib/blog.ts` exposes no excerpt function, and nothing renders
 * RelatedArticles), so there is nothing to point the guard at. Non-article
 * routes are covered instead by `src/lib/page-summaries.ts`, whose registry is
 * asserted below so the file cannot rot while this guard is dark.
 *
 * un-skip in Phase 3 (blog subsystem): import the site's own `firstSentence`
 * and `getAllPosts`, delete the `describe.skip` wrapper, and call
 * `registerFirstSentenceGuard({ firstSentence, getPosts, minPosts: 1 })`.
 */
import { describe, it, expect } from "vitest";
import { PAGE_SUMMARIES, pageSummary } from "@/lib/page-summaries";

describe.skip("firstSentence corpus guard (un-skip in Phase 3, blog subsystem)", () => {
  it("has a firstSentence implementation to run against", () => {
    expect(false).toBe(true);
  });
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
    expect(pageSummary("/nope")).toBeUndefined();
  });
});
