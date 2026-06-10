import { referencedOrganization } from "./organization";
import type { SchemaThing, SiteSchemaOpts } from "./types";

export type WebApplicationInput = {
  name: string;
  description: string;
  /** Path (without origin) e.g. /calculators/agency-valuation */
  path: string;
  /** e.g. "FinanceApplication", "BusinessApplication" */
  applicationCategory?: string;
  price?: "0" | string;
};

/**
 * WebApplication / SoftwareApplication schema for calculators and tools.
 * Sets `offers.price = 0` so Google can render the "Free" badge in relevant
 * search surfaces.
 */
export function buildWebApplication(
  input: WebApplicationInput,
  opts: SiteSchemaOpts,
): SchemaThing {
  const url = `${opts.siteUrl}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    "@id": `${url}#tool`,
    name: input.name,
    description: input.description,
    url,
    applicationCategory: input.applicationCategory || "FinanceApplication",
    operatingSystem: "Any (browser)",
    isAccessibleForFree: true,
    publisher: referencedOrganization(opts),
    offers: {
      "@type": "Offer",
      price: input.price || "0",
      priceCurrency: "GBP",
    },
    inLanguage: "en-GB",
  };
}
