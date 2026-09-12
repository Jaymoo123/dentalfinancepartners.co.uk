/**
 * P1-GUARD: every article in the corpus reaches the server HTML of the
 * listing that is supposed to link it.
 *
 * SITE-DERIVED. The estate `hub-article-crawl-path` guard source-scans
 * Property's `HubArticleList` / `BlogCategoryHub` pair for "maps the full
 * array, hides off-page cards". This site does not use those components: both
 * `/blog` and `/blog/[category]` render the LOCAL client component
 * `components/blog/BlogListWithSearch`, which is free to paginate however it
 * likes. Pinning Property's spelling (`hidden={...}` on a card) would pin an
 * implementation, not the invariant, and would fail on a perfectly good fix
 * that drops pagination instead of hiding cards.
 *
 * So this guard asserts the OUTCOME instead, by rendering the component the
 * way the server renders it and counting the article anchors: the whole
 * corpus for /blog, the whole category for each hub. Any pagination scheme
 * that keeps every post in the first server response passes; any scheme that
 * slices fails, whatever it is called.
 *
 * EXPECTED TO FAIL UNTIL THE /blog FIX LANDS. At the time this guard was
 * written the list sliced to 12 of 62 posts, so /blog and the two categories
 * over 12 (IR35 Status: 17, Umbrella vs Limited Company: 13) had no crawl
 * path to the rest. The numbers below are the corpus, derived at runtime, not
 * today's rendered counts: encoding today's broken behaviour would be worse
 * than no test.
 */
import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

(globalThis as { React?: typeof React }).React = React;

import {
  getAllPosts,
  getAllCategories,
  getCategorySlug,
  calculateReadTime,
} from "@/lib/blog";
import { BlogListWithSearch } from "@/components/blog/BlogListWithSearch";

const posts = getAllPosts().map((p) => ({ ...p, categorySlug: getCategorySlug(p) }));
const categories = getAllCategories();
const readTimes = new Map(posts.map((p) => [p.slug, calculateReadTime(p.contentHtml)]));

/** Article hrefs in the server HTML of the list, as a crawler would see them. */
function renderedArticleHrefs(
  listPosts: typeof posts,
  activeCategory?: string,
): string[] {
  const html = renderToStaticMarkup(
    React.createElement(BlogListWithSearch, {
      posts: listPosts,
      categories,
      readTimes,
      activeCategory,
    }),
  );
  return Array.from(html.matchAll(/href="(\/blog\/[a-z0-9-]+\/[a-z0-9-]+)"/g)).map((m) => m[1]);
}

describe("hub and listing crawl path", () => {
  it("has a corpus to test", () => {
    expect(posts.length).toBeGreaterThan(12); // below the page size nothing is provable
    expect(categories.length).toBeGreaterThan(0);
  });

  it("/blog puts every article in the server HTML", () => {
    const hrefs = new Set(renderedArticleHrefs(posts));
    const missing = posts
      .map((p) => `/blog/${p.categorySlug}/${p.slug}`)
      .filter((href) => !hrefs.has(href));
    expect(
      missing.length,
      `${posts.length - missing.length} of ${posts.length} articles reach /blog's server HTML. ` +
        `Missing: ${missing.slice(0, 10).join(", ")}${missing.length > 10 ? ` (+${missing.length - 10})` : ""}. ` +
        "Client-side pagination that slices the array deletes the only crawl path to everything past page one.",
    ).toBe(0);
  });

  it("every category hub puts its whole category in the server HTML", () => {
    const failures: string[] = [];
    for (const cat of categories) {
      const inCat = posts.filter((p) => p.categorySlug === cat.slug);
      const hrefs = new Set(renderedArticleHrefs(inCat, cat.slug));
      const missing = inCat.filter((p) => !hrefs.has(`/blog/${p.categorySlug}/${p.slug}`));
      if (missing.length > 0) {
        failures.push(
          `/blog/${cat.slug}: ${inCat.length - missing.length} of ${inCat.length} articles rendered`,
        );
      }
    }
    expect(failures, failures.join("\n")).toEqual([]);
  });

  it("the article count on a hub matches the count the hub advertises", () => {
    // The hub headline prints cat.count. A count that disagrees with the posts
    // actually rendered is the visible symptom of a sliced grid.
    for (const cat of categories) {
      const inCat = posts.filter((p) => p.categorySlug === cat.slug);
      expect(inCat.length, `${cat.slug} advertises ${cat.count}`).toBe(cat.count);
    }
  });
});
