import { siteConfig } from "@/config/site";
import type { SchemaThing } from "./types";

export type WebApplicationInput = {
  name: string;
  description: string;
  /** Path without origin, e.g. /calculators/associate-take-home */
  path: string;
  /** e.g. "FinanceApplication", "BusinessApplication" */
  applicationCategory?: string;
  price?: "0" | string;
};

/**
 * WebApplication / SoftwareApplication schema for calculator pages.
 * Sets offers.price = 0 so Google can render the "Free" badge.
 */
export function buildWebApplication({
  name,
  description,
  path,
  applicationCategory = "FinanceApplication",
  price = "0",
}: WebApplicationInput): SchemaThing {
  const url = `${siteConfig.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    name,
    description,
    url,
    applicationCategory,
    operatingSystem: "Any (browser)",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "GBP",
    },
    inLanguage: "en-GB",
    provider: {
      // Organization, not AccountingService: this site publishes guidance and
      // introduces dentists to regulated firms, it does not itself provide
      // accounting services (matches the terms page and buildBlogPostingJsonLd).
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
