/**
 * Canonical Organization JSON-LD for Ashfield Trading Ltd (the parent entity).
 * Built on the shared buildOrganization, extended with the Companies Act
 * disclosure fields (legalName, company number, registered office) plus the
 * 15 brand sites as subOrganization so knowledge graphs resolve the estate
 * to one real legal entity. No pricing anywhere in structured data.
 */
import { buildOrganization, type SiteSchemaOpts, type SchemaThing } from "@accounting-network/web-shared/schema";
import { siteConfig } from "@/config/site";
import { estateSites } from "@/lib/estate/snapshot";

const opts: SiteSchemaOpts = {
  siteUrl: siteConfig.url,
  siteName: siteConfig.name,
  legalName: siteConfig.company.legalName,
  description: siteConfig.description,
  tagline: siteConfig.tagline,
  organizationType: "Organization",
  publisherLogoUrl: siteConfig.publisherLogoUrl,
  email: siteConfig.contact.email,
  phone: siteConfig.contact.phone,
};

export function buildAshfieldOrganizationJsonLd(): SchemaThing {
  const office = siteConfig.company.registeredOffice;
  return {
    ...buildOrganization(opts),
    legalName: siteConfig.company.legalName,
    identifier: {
      "@type": "PropertyValue",
      name: "Companies House number",
      value: siteConfig.company.number,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${office.line1}, ${office.line2}`,
      addressLocality: office.city,
      postalCode: office.postcode,
      addressCountry: "GB",
    },
    sameAs: [
      `https://find-and-update.company-information.service.gov.uk/company/${siteConfig.company.number}`,
    ],
    subOrganization: estateSites().map((s) => ({
      "@type": "Organization",
      name: s.name,
      url: `https://${s.domain}`,
      parentOrganization: { "@id": `${siteConfig.url}#organization` },
    })),
  };
}
