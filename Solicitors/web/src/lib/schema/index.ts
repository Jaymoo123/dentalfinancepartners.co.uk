/**
 * Barrel export for JSON-LD schema builders + the <JsonLd> React wrapper.
 *
 * Pre-existing builders are re-exported from the legacy single-file modules
 * so callers can migrate at their own pace:
 *   - buildOrganizationJsonLd  (was @/lib/organization-schema)
 *   - buildLocalBusinessJsonLd (was @/lib/local-business-schema)
 *   - buildBreadcrumbJsonLd, buildBlogPostingJsonLd, buildOgImageUrl
 *     (were @/lib/schema)
 *
 * New builders added Phase 1 (2026-05-18):
 *   - JsonLd component (drop-in <script> wrapper)
 *   - buildService           - Service schema for /services + /services/[slug]
 *   - buildWebSite           - WebSite + SearchAction for the home page
 *   - buildFaqPage           - standalone FAQPage for service/guide/calc pages
 *   - buildCollectionPage    - for blog category hubs
 */

export { JsonLd } from "./JsonLd";
export { serialize } from "./serialize";
export type { SchemaThing, ImageObject, PostalAddress } from "./types";

export { buildService } from "./service";
export type { ServiceInput } from "./service";

export { buildWebSite } from "./web-site";

export { buildFaqPage } from "./faq-page";
export type { FaqInput } from "./faq-page";

export { buildCollectionPage } from "./collection-page";
export type { CollectionPageInput } from "./collection-page";

// Re-export the pre-existing single-file builders
export { buildOrganizationJsonLd } from "@/lib/organization-schema";
export { buildLocalBusinessJsonLd } from "@accounting-network/web-shared/lib/local-business-schema";
export {
  buildBreadcrumbJsonLd,
  buildBlogPostingJsonLd,
  buildOgImageUrl,
} from "@/lib/schema";
