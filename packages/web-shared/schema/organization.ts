import type { Organization, SchemaThing, SiteSchemaOpts } from "./types";

function orgId(opts: SiteSchemaOpts): string {
  return `${opts.siteUrl}#organization`;
}

/**
 * Canonical Organization schema. Use as the top-level Organization on the
 * homepage; reference downstream pages with `referencedOrganization()` so
 * JSON-LD parsers de-duplicate to the single full record.
 */
export function buildOrganization(opts: SiteSchemaOpts): Organization {
  const id = orgId(opts);
  const logoUrl = `${opts.siteUrl}${opts.publisherLogoUrl}`;
  const areaServed = opts.serviceAreas?.length
    ? opts.serviceAreas.map((s) => ({ "@type": "City", name: s }))
    : { "@type": "Country", name: opts.areaServedCountry || "United Kingdom" };
  return {
    "@context": "https://schema.org",
    "@type": (opts.organizationType as Organization["@type"]) || "ProfessionalService",
    "@id": id,
    name: opts.legalName || opts.siteName,
    alternateName: opts.alternateName || opts.siteName,
    url: opts.siteUrl,
    ...(opts.legalName ? { legalName: opts.legalName } : {}),
    ...(opts.description ? { description: opts.description } : {}),
    logo: { "@type": "ImageObject", url: logoUrl },
    image: logoUrl,
    ...(opts.email ? { email: opts.email } : {}),
    ...(opts.phone ? { telephone: opts.phone } : {}),
    ...(opts.address ? { address: opts.address } : {}),
    areaServed,
    ...(opts.knowsAbout?.length ? { knowsAbout: opts.knowsAbout } : {}),
    ...(opts.tagline ? { slogan: opts.tagline } : {}),
    ...(opts.sameAs?.length ? { sameAs: opts.sameAs } : {}),
    ...(opts.contactPoint ? { contactPoint: opts.contactPoint } : {}),
    ...(opts.foundingDate ? { foundingDate: opts.foundingDate } : {}),
    ...(opts.priceRange ? { priceRange: opts.priceRange } : {}),
    ...(opts.parentOrganization
      ? {
          parentOrganization: {
            "@type": "Organization",
            name: opts.parentOrganization.name,
            ...(opts.parentOrganization.url ? { url: opts.parentOrganization.url } : {}),
            ...(opts.parentOrganization.companyNumber
              ? {
                  identifier: {
                    "@type": "PropertyValue",
                    propertyID: "GB Companies House Number",
                    value: opts.parentOrganization.companyNumber,
                  },
                }
              : {}),
          },
        }
      : {}),
  };
}

/**
 * Lightweight reference to the canonical Organization, used as `publisher` or
 * `provider` on downstream schema objects so JSON-LD parsers can de-duplicate
 * to the single full record.
 */
export function referencedOrganization(opts: SiteSchemaOpts): SchemaThing {
  return {
    "@type": "Organization",
    "@id": orgId(opts),
    name: opts.siteName,
    url: opts.siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${opts.siteUrl}${opts.publisherLogoUrl}`,
    },
  };
}

/**
 * WebSite schema for the homepage. Includes a SearchAction so Google can
 * render the sitelinks search box.
 */
export function buildWebSite(opts: SiteSchemaOpts): SchemaThing {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${opts.siteUrl}#website`,
    url: opts.siteUrl,
    name: opts.siteName,
    ...(opts.description ? { description: opts.description } : {}),
    inLanguage: "en-GB",
    publisher: { "@id": orgId(opts) },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${opts.siteUrl}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
