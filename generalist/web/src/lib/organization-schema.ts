/**
 * Backwards-compatibility shim. The canonical Organization schema lives in
 * `@/lib/schema/organization` and is composable + canonical-@id'd.
 *
 * This file preserves the legacy `buildOrganizationJsonLd()` so the
 * homepage and any other call-sites keep working unchanged.
 *
 * Extended 2026-06-18: adds legalName, alternateName and registered-office
 * address to the JSON-LD output to match the Companies Act / e-commerce
 * disclosure requirements applied estate-wide.
 */
import { siteConfig } from "@/config/site";
import { buildOrganization } from "@/lib/schema";

export function buildOrganizationJsonLd() {
  const base = buildOrganization();
  const office = siteConfig.company.registeredOffice;
  return {
    ...base,
    // Registered legal entity vs the public-facing trading name (brand).
    legalName: siteConfig.company.legalName,
    alternateName: siteConfig.company.tradingName,
    // When Ashfield Trading Ltd becomes VAT-registered, add: vatID: siteConfig.company.vatNumber
    address: {
      "@type": "PostalAddress",
      streetAddress: `${office.line1}, ${office.line2}`,
      addressLocality: office.city,
      postalCode: office.postcode,
      addressCountry: "GB",
    },
  };
}
