/**
 * Composable JSON-LD schema builders — shared across all niche sites.
 *
 * Every builder is parameterised via SiteSchemaOpts so no builder imports
 * from any site's @/config/*. Callers construct SiteSchemaOpts once from
 * their own siteConfig and pass it through.
 *
 * Pattern:
 *
 *   import { JsonLd, buildBlogPosting, buildBreadcrumb, buildFaqPage } from
 *     "@accounting-network/web-shared/schema";
 *
 *   const data = [
 *     buildBreadcrumb(crumbs, opts),
 *     buildBlogPosting(post, path, opts, author),
 *     ...(post.faqs ? [buildFaqPage(post.faqs)!] : []),
 *   ];
 *
 *   return <JsonLd data={data} />;
 */

export * from "./types";
export * from "./serialize";
export * from "./og";
export { JsonLd } from "./JsonLd";

export * from "./organization";
export * from "./person";
export * from "./breadcrumb";
export * from "./blog-posting";
export * from "./article";
export * from "./faq-page";
export * from "./service";
export * from "./local-business";
export * from "./defined-term";
export * from "./web-application";
export * from "./dataset";
export * from "./course";
export * from "./howto";
export * from "./collection-page";
