import { siteConfig } from "@/config/site";
import type { SchemaThing } from "./types";

/**
 * Build a WebSite JSON-LD block for the homepage. Includes a SearchAction
 * that earns the SiteLinks Search Box in Google SERPs when the brand query
 * appears (e.g. "dental finance partners").
 */
export function buildWebSite(): SchemaThing {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    inLanguage: "en-GB",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
