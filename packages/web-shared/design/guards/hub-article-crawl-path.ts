/**
 * Guard-test TEMPLATE: keeps every post in the server HTML of a client-side
 * paginated article grid, and stops the wrapping hub from forcing everything
 * back onto one page.
 *
 * Ported from Property's `Property/web/src/tests/hub-article-crawl-path.test.ts`
 * (carve-out 5). Two source-file regressions, source-scanned rather than
 * rendered so the check fires the moment the edit is written, not after a
 * render pass:
 *
 *   1. The article-list component must map over the FULL post array, not a
 *      `.slice()` of it, and must hide off-page cards with the `hidden`
 *      attribute rather than omitting them from the server HTML.
 *   2. The hub wrapper must not go back to forcing every post onto a single
 *      page (Property's old `postsPerPage={articleItems.length}` escape
 *      hatch, which buried the closing CTA behind up to 150 cards).
 *
 * NOTE ON GENERALITY: Property's `HubArticleList`/`BlogCategoryHub` pair has
 * already been extracted into `packages/web-shared/design/blog/` with the
 * same prop names (`posts`, `postsPerPage`). A site that consumes those
 * shared components directly can point this guard at THOSE two files, so one
 * assertion protects every consuming site at once — the paths stay
 * parameters regardless, so a site keeping a local fork (as Property
 * currently does) can point at its own copy instead.
 *
 * ---- Worked example (crypto, the pilot site, consuming the shared components) ----
 *
 *   // crypto/web/src/tests/hub-article-crawl-path.test.ts
 *   import { join } from "path";
 *   import { registerHubArticleCrawlPathGuard } from
 *     "@accounting-network/web-shared/design/guards/hub-article-crawl-path";
 *
 *   const WEB_SHARED_BLOG = join(__dirname, "..", "..", "..", "..", "packages", "web-shared", "design", "blog");
 *
 *   registerHubArticleCrawlPathGuard({
 *     hubArticleListPath: join(WEB_SHARED_BLOG, "HubArticleList.tsx"),
 *     blogCategoryHubPath: join(WEB_SHARED_BLOG, "BlogCategoryHub.tsx"),
 *   });
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";

export interface HubArticleCrawlPathGuardOptions {
  /** Absolute path to the component that renders every post's card. */
  hubArticleListPath: string;
  /** Absolute path to the component that wraps pagination around it. */
  blogCategoryHubPath: string;
  /** The array `hubArticleListPath` must map over in full. Default "posts". */
  postsVariable?: string;
  /**
   * The exact expression that would force everything onto one page, e.g.
   * Property's `postsPerPage={articleItems.length}`. Pass the site's own
   * equivalent if its hub wrapper spells the old escape hatch differently, or
   * omit to skip this specific-regression check (the two article-list checks
   * below still run either way).
   */
  forcedSinglePageExpr?: RegExp;
}

/** Pure predicate over already-read source text; no filesystem access. */
export function checkHubArticleList(src: string, postsVariable = "posts") {
  return {
    mapsFullArray: src.includes(`{${postsVariable}.map(`),
    slicesArray: new RegExp(`${postsVariable}\\.slice\\(`).test(src),
    hidesOffPageCards: /hidden=\{/.test(src),
  };
}

/**
 * Call this from the SITE's own test file (not from web-shared). It registers
 * real `describe`/`it` blocks in whatever vitest run is currently executing,
 * reading `opts.hubArticleListPath` / `opts.blogCategoryHubPath` at call time.
 */
export function registerHubArticleCrawlPathGuard(opts: HubArticleCrawlPathGuardOptions) {
  const postsVariable = opts.postsVariable ?? "posts";
  const hubArticleList = readFileSync(opts.hubArticleListPath, "utf8");
  const blogCategoryHub = readFileSync(opts.blogCategoryHubPath, "utf8");

  describe("category hub article grid keeps every post in the server HTML", () => {
    it("the article list renders every post, not a page-sized slice", () => {
      const check = checkHubArticleList(hubArticleList, postsVariable);
      expect(
        check.mapsFullArray,
        `must map over the full \`${postsVariable}\` array. If this fails because the grid was ` +
          "changed to render a slice, the hub has just dropped every post past the first page out of " +
          "the server HTML, and with it the only crawl path to the rest of the corpus. Paginate by " +
          "hiding, not by slicing.",
      ).toBe(true);
      expect(
        check.slicesArray,
        `must not slice \`${postsVariable}\` for rendering. See the note above.`,
      ).toBe(false);
    });

    it("hides off-page cards rather than omitting them", () => {
      expect(
        checkHubArticleList(hubArticleList, postsVariable).hidesOffPageCards,
        "off-page cards must carry the `hidden` attribute. Without it every card renders at once and " +
          "the pagination bar controls nothing.",
      ).toBe(true);
    });

    if (opts.forcedSinglePageExpr) {
      it("the hub wrapper does not force the whole category onto one page", () => {
        expect(
          opts.forcedSinglePageExpr!.test(blogCategoryHub),
          "the hub wrapper must not pass a page size that equals the full post count. That is the old " +
            "way of protecting the crawl path and it buries whatever closes the page behind every card.",
        ).toBe(false);
      });
    }
  });
}
