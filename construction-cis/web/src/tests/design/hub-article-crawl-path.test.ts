/**
 * Site instantiation of the estate `hub-article-crawl-path` guard.
 *
 * THE DEFECT IT IS POINTED AT. `/blog` server HTML carries 12 of 82 articles.
 * `BlogListWithSearch` computes `paginatedPosts = filteredAndSortedPosts.slice(
 * startIndex, startIndex + 12)` and maps THAT, with page changes behind two
 * `<button>`s, so 70 posts are absent from the server HTML rather than hidden in
 * it. The blog is 54% of this site's traffic.
 *
 * WHY THE LINK FLOOR CANNOT CATCH IT. `link_baseline.json` was captured from
 * this same page, so the floor already encodes 12. Any guard that compares
 * against the baseline passes the defect straight through. This one compares the
 * hub against the CORPUS instead: `getAllPosts().length` is the denominator, and
 * the rule is that the list must map the full array and hide off-page cards.
 *
 * WHY `it.fails` ON THE RULE ASSERTION. The fix is not in this work package's
 * files (`src/components/blog/*` belongs to the chrome/blog builder), and a
 * guard that is red on arrival emails the owner on every push until someone
 * else lands it. `it.fails` is vitest's idiom for a known defect: it passes
 * while the defect stands, and the moment the list is changed to hide rather
 * than slice it reports "expected test to fail" to whoever made that change.
 *
 * >>> WHEN YOU FIX `BlogListWithSearch`: delete the `.fails` below and delete
 * >>> this note. The assertion is already the correct one.
 *
 * The predicate is IMPORTED from the kit template, not re-implemented, so this
 * site is asserting the estate's rule and not a local paraphrase of it. The
 * template's own `registerHubArticleCrawlPathGuard` is not called, because it
 * registers plain `it`s that cannot be marked as a known defect.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { checkHubArticleList } from "@accounting-network/web-shared/design/guards/hub-article-crawl-path";
import { getAllPosts } from "@/lib/blog";

const SRC = join(__dirname, "..", "..");
const LIST = join(SRC, "components", "blog", "BlogListWithSearch.tsx");

describe("blog hub keeps every post in the server HTML", () => {
  const src = readFileSync(LIST, "utf8");
  const corpus = getAllPosts().length;

  it("has a corpus to compare against", () => {
    expect(corpus).toBeGreaterThan(12);
  });

  it("the hub pages pass the whole corpus to the list component", () => {
    // The page half of the crawl path: if the server component starts slicing,
    // no amount of hiding inside the client component can recover the posts.
    const index = readFileSync(join(SRC, "app", "blog", "page.tsx"), "utf8");
    expect(/const posts = getAllPosts\(\)/.test(index)).toBe(true);
    expect(/posts=\{postsWithCategorySlug\}/.test(index)).toBe(true);
    expect(/getAllPosts\(\)\s*\.slice\(/.test(index)).toBe(false);
  });

  it("BlogListWithSearch.tsx exists and is non-trivial (guards the .fails below from a silent rename/delete)", () => {
    expect(existsSync(LIST)).toBe(true);
    expect(src.length).toBeGreaterThan(500);
  });

  it.fails(
    `renders all ${getAllPosts().length} posts, hiding off-page cards rather than slicing them out`,
    () => {
      const check = checkHubArticleList(src, "posts");
      expect(check.mapsFullArray, "must map the full posts array, not a page-sized slice").toBe(
        true,
      );
      expect(check.slicesArray, "must not slice the posts array for rendering").toBe(false);
      expect(check.hidesOffPageCards, "off-page cards must carry the `hidden` attribute").toBe(true);
    },
  );

  it("the page size is a cap on what is VISIBLE, never on what is rendered", () => {
    // The number itself is fine and is not what this guard objects to; pinning
    // it keeps the failure message above truthful about the 12-of-82 split.
    expect(src).toMatch(/postsPerPage = 12/);
  });
});
