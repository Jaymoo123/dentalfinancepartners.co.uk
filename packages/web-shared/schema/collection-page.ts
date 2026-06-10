import type { SchemaThing, SiteSchemaOpts } from "./types";

export type CollectionPageInput = {
  name: string;
  description: string;
  path: string;
  inLanguage?: string;
};

/**
 * CollectionPage for blog category indexes, glossary index, calculator index,
 * and other pages that group/list other pages.
 */
export function buildCollectionPage(
  input: CollectionPageInput,
  opts: SiteSchemaOpts,
): SchemaThing {
  const url = `${opts.siteUrl}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#page`,
    name: input.name,
    description: input.description,
    url,
    inLanguage: input.inLanguage || "en-GB",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${opts.siteUrl}#website`,
      url: opts.siteUrl,
      name: opts.siteName,
    },
  };
}
