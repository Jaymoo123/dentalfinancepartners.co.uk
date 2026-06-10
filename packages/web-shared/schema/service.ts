import { referencedOrganization } from "./organization";
import type { SchemaThing, SiteSchemaOpts } from "./types";

export type ServiceInput = {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  areaServed?: string | string[];
  hasOfferCatalog?: { name: string; items: string[] };
  audience?: string;
};

/**
 * Service schema for commercial pages. Always associates with the canonical
 * Organization as `provider`.
 */
export function buildService(
  input: ServiceInput,
  opts: SiteSchemaOpts,
): SchemaThing {
  const url = input.url.startsWith("http") ? input.url : `${opts.siteUrl}${input.url}`;

  const out: SchemaThing = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    description: input.description,
    url,
    provider: referencedOrganization(opts),
    ...(input.serviceType ? { serviceType: input.serviceType } : {}),
    ...(input.audience
      ? { audience: { "@type": "Audience", audienceType: input.audience } }
      : {}),
  };

  if (input.areaServed) {
    const areas = Array.isArray(input.areaServed) ? input.areaServed : [input.areaServed];
    out.areaServed = areas.map((a) =>
      a === "United Kingdom" || a === "UK"
        ? { "@type": "Country", name: "United Kingdom" }
        : { "@type": "City", name: a },
    );
  }

  if (input.hasOfferCatalog) {
    out.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: input.hasOfferCatalog.name,
      itemListElement: input.hasOfferCatalog.items.map((label, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Service", name: label },
      })),
    };
  }

  return out;
}
