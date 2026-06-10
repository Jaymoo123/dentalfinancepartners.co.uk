import type { Organization, PostalAddress, SchemaThing, SiteSchemaOpts } from "./types";

export type LocalBusinessInput = {
  city: string;
  url: string;
  name: string;
  description: string;
  address?: Partial<PostalAddress>;
  geo?: { latitude: number; longitude: number };
  areaServed?: string[];
  openingHours?: string[];
};

/**
 * AccountingService (a LocalBusiness sub-type) for UK city pages. The stricter
 * sub-type signals to Google that this is a regulated accountant presence.
 */
export function buildAccountingService(
  input: LocalBusinessInput,
  opts: SiteSchemaOpts,
): Organization {
  const url = input.url.startsWith("http") ? input.url : `${opts.siteUrl}${input.url}`;
  const logoUrl = `${opts.siteUrl}${opts.publisherLogoUrl}`;

  const address: PostalAddress = {
    "@type": "PostalAddress",
    addressLocality: input.address?.addressLocality || input.city,
    addressCountry: input.address?.addressCountry || "GB",
    ...(input.address?.streetAddress ? { streetAddress: input.address.streetAddress } : {}),
    ...(input.address?.addressRegion ? { addressRegion: input.address.addressRegion } : {}),
    ...(input.address?.postalCode ? { postalCode: input.address.postalCode } : {}),
  };

  const out: Organization = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${url}#localbusiness`,
    name: input.name,
    description: input.description,
    url,
    image: logoUrl,
    logo: { "@type": "ImageObject", url: logoUrl },
    ...(opts.email ? { email: opts.email } : {}),
    ...(opts.phone ? { telephone: opts.phone } : {}),
    address,
    areaServed: (input.areaServed || [input.city]).map((c) => ({
      "@type": "City",
      name: c,
    })),
  };

  if (input.geo) {
    (out as Record<string, unknown>).geo = {
      "@type": "GeoCoordinates",
      latitude: input.geo.latitude,
      longitude: input.geo.longitude,
    };
  }

  if (input.openingHours?.length) {
    (out as Record<string, unknown>).openingHoursSpecification = input.openingHours;
  }

  return out;
}

/**
 * Convenience: emit an AccountingService for a city page together with the
 * Breadcrumb (callers pass both to <JsonLd data={[...]} />).
 */
export function buildCityPage(
  input: LocalBusinessInput & { serviceName: string },
  opts: SiteSchemaOpts,
): SchemaThing[] {
  return [buildAccountingService(input, opts)];
}

// ---------------------------------------------------------------------------
// Legacy backward-compat wrapper for existing consumers of
// web-shared/lib/local-business-schema (Dentists/Solicitors/Medical/Property).
// ---------------------------------------------------------------------------

/** @deprecated Use buildAccountingService with SiteSchemaOpts instead. */
export interface LocalBusinessConfig {
  name: string;
  legalName: string;
  description: string;
  url: string;
  logo: string;
  email: string;
  phone: string;
  areaServed: string;
  city: string;
  organizationType: string;
}

/** @deprecated Backward-compat shim kept for existing location page consumers. */
export function buildLocalBusinessJsonLd(config: LocalBusinessConfig): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": config.organizationType,
    name: `${config.name} - ${config.city}`,
    legalName: config.legalName,
    description: config.description,
    url: config.url,
    logo: config.logo,
    image: config.logo,
    address: {
      "@type": "PostalAddress",
      addressLocality: config.city,
      addressCountry: "GB",
    },
    areaServed: {
      "@type": "City",
      name: config.city,
      containedInPlace: { "@type": "Country", name: "United Kingdom" },
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: config.phone,
      email: config.email,
      contactType: "customer service",
      areaServed: "GB",
      availableLanguage: ["English"],
    },
    priceRange: "££",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  };
  return JSON.stringify(schema);
}
