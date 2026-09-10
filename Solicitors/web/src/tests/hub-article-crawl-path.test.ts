/**
 * Site-parameterised consumption of the estate `hub-article-crawl-path`
 * guard: a category hub's article grid must keep every post in the server
 * HTML, hiding off-page cards rather than slicing them out. Slicing deletes
 * the only crawl path to everything past page one.
 *
 * Pointed at the SHARED components in `packages/web-shared/design/blog/`,
 * which is what this site's blog subsystem adopts in the later phases of the
 * port. Today `src/app/blog/[category]/page.tsx` and the seven hand-built
 * hubs still render their own grids, so this guard protects the components
 * they are moving to, not a local fork. If a fork ever lands here, repoint
 * these two paths at it.
 *
 * `forcedSinglePageExpr` is omitted: that check pins Property's specific old
 * escape hatch (`postsPerPage={articleItems.length}`), which has no spelling
 * on this site.
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
