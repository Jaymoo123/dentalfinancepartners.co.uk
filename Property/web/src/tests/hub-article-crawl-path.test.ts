/**
 * Carve-out 5 guard for the nine /blog/<category> hubs.
 *
 * The hubs are the only full HTML crawl path to the ~750-post corpus: /blog
 * itself renders a searchable, sliced list, so most posts are only reachable
 * from their category hub. `NumberedPagination` renders `<button>`, not
 * `<a href>`, so the moment the hub grid slices to the current page, every post
 * from card 13 onwards leaves the server HTML and the corpus loses its crawl
 * path. That is exactly why the hubs originally shipped with paging disabled
 * (`postsPerPage={articleItems.length}`), which cost the reader a 150-card wall.
 *
 * The fix keeps every card in the server HTML and hides the off-page ones with
 * the `hidden` attribute. Both halves of that are load-bearing and neither is
 * obvious from reading one file, so this guards both:
 *
 *   1. `HubArticleList` must map over ALL posts, not a slice of them.
 *   2. `BlogCategoryHub` must not go back to forcing a single page.
 *
 * A source-file scan rather than a render, following
 * `calculator-tabs-crawl-path.test.ts`: the point is to catch the edit at the
 * moment it is written, not to assert on markup a renderer produces.
 */

import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

const COMPONENTS = join(__dirname, "..", "components", "blog");

const hubArticleList = readFileSync(join(COMPONENTS, "HubArticleList.tsx"), "utf8");
const blogCategoryHub = readFileSync(join(COMPONENTS, "BlogCategoryHub.tsx"), "utf8");

describe("category hub article grid keeps every post in the server HTML", () => {
  it("HubArticleList renders every post, not a page-sized slice", () => {
    expect(
      hubArticleList.includes("{posts.map("),
      "HubArticleList must map over the full `posts` array. If this fails because " +
        "the grid was changed to render a slice, the hubs have just dropped every " +
        "post past card 12 out of the server HTML, and with it the only crawl path " +
        "to most of the corpus. Paginate by hiding, not by slicing.",
    ).toBe(true);

    expect(
      /posts\.slice\(/.test(hubArticleList),
      "HubArticleList must not slice `posts` for rendering. See the note above.",
    ).toBe(false);
  });

  it("HubArticleList hides off-page cards rather than omitting them", () => {
    expect(
      /hidden=\{/.test(hubArticleList),
      "The off-page cards must carry the `hidden` attribute. Without it every " +
        "card renders at once and the pagination bar controls nothing.",
    ).toBe(true);
  });

  it("BlogCategoryHub does not force the whole category onto one page", () => {
    expect(
      /postsPerPage=\{articleItems\.length\}/.test(blogCategoryHub),
      "BlogCategoryHub must not pass `postsPerPage={articleItems.length}`. That " +
        "was the old way of protecting the crawl path and it buried the closing " +
        "LeadCTAPanel behind up to 150 cards. HubArticleList now protects the " +
        "crawl path itself, so the hub can take the default page size.",
    ).toBe(false);
  });
});
