import { siteConfig } from "@/config/site";
import type { SchemaThing } from "./types";

/**
 * Build a CollectionPage JSON-LD block. Use on blog category hubs
 * (/blog/[category]) and the /blog index page. Helps Google understand
 * the page is a curated list rather than an article.
 */
export type CollectionPageInput = {
  name: string;
  description: string;
  path: string;
  numberOfItems?: number;
};

export function buildCollectionPage({
  name,
  description,
  path,
  numberOfItems,
}: CollectionPageInput): SchemaThing {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${siteConfig.url}${path}`,
    inLanguage: "en-GB",
    ...(numberOfItems ? { numberOfItems } : {}),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
