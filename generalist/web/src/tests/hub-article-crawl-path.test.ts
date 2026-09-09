/**
 * Site-parameterised consumption of the estate `hub-article-crawl-path`
 * guard: a category hub's article grid must keep every post in the server
 * HTML, hiding off-page cards rather than slicing them out.
 *
 * Pointed at the SHARED components in `packages/web-shared/design/blog/`,
 * which is what this site's blog subsystem will consume. If a local fork ever
 * lands here, repoint these two paths at the fork.
 *
 * `forcedSinglePageExpr` is omitted: that check pins Property's specific old
 * escape hatch (`postsPerPage={articleItems.length}`), which has no equivalent
 * spelling on this site.
 */
import { join } from "path";
import { registerHubArticleCrawlPathGuard } from "@accounting-network/web-shared/design/guards/hub-article-crawl-path";

const WEB_SHARED_BLOG = join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "packages",
  "web-shared",
  "design",
  "blog",
);

registerHubArticleCrawlPathGuard({
  hubArticleListPath: join(WEB_SHARED_BLOG, "HubArticleList.tsx"),
  blogCategoryHubPath: join(WEB_SHARED_BLOG, "BlogCategoryHub.tsx"),
});
