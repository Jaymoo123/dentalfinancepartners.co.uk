import { buildOrganization } from "@accounting-network/web-shared/schema";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";

/**
 * Canonical Organization node, ported onto the shared builder
 * (`packages/web-shared/schema/organization.ts`) on 2026-09-28, using Medical's
 * `organization-schema.ts` as the reference. Replaces the hand-rolled object
 * that used to live in `lib/schema.ts`.
 *
 * Every field the hand-rolled version emitted is preserved: name, legalName,
 * alternateName, url, sameAs (Companies House filing), description, address,
 * areaServed (the same ten cities, now as City nodes), knowsAbout and
 * priceRange. Two things change deliberately:
 *   - `@type` is the single "AccountingService" rather than the
 *     ["ProfessionalService", "AccountingService"] pair (owner ruling
 *     2026-09-28: the brand IS the firm, and the firm is an accountancy
 *     practice).
 *   - `parentOrganization` Ashfield Trading Ltd 16358723 is added, per the
 *     brief, so the estate resolves to one opco.
 * The description now comes from `niche.entity.firm` (the entity sentence)
 * rather than the meta description, which is a ranking string.
 */

const SERVICE_AREAS = [
  "London",
  "Manchester",
  "Birmingham",
  "Leeds",
  "Bristol",
  "Glasgow",
  "Edinburgh",
  "Sheffield",
  "Liverpool",
  "Newcastle",
];

const KNOWS_ABOUT = [
  "Divorce financial settlements",
  "Pension sharing on divorce",
  "Capital gains tax on divorce",
  "Spousal maintenance",
  "Divorce finances",
];

// Sister-brand homepages under the same opco (Ashfield Trading Ltd), alongside
// the Companies House filing, so sameAs ties the estate together rather than
// naming one record in isolation. Medical's pattern.
const SISTER_BRAND_HOMEPAGES = [
  "https://www.propertytaxpartners.co.uk",
  "https://www.estateplanningspecialists.co.uk",
  "https://www.medicalaccounts.co.uk",
  "https://www.accountsforlawyers.co.uk",
];

export function buildOrganizationJsonLd() {
  const office = siteConfig.company.registeredOffice;
  return JSON.stringify(
    buildOrganization({
      siteUrl: siteConfig.url,
      siteName: siteConfig.name,
      legalName: siteConfig.company.legalName,
      alternateName: siteConfig.company.tradingName,
      description: niche.entity?.firm ?? siteConfig.description,
      tagline: siteConfig.tagline,
      organizationType: "AccountingService",
      publisherLogoUrl: siteConfig.publisherLogoUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${office.line1}, ${office.line2}`,
        addressLocality: office.city,
        postalCode: office.postcode,
        addressCountry: "GB",
      },
      sameAs: [
        `https://find-and-update.company-information.service.gov.uk/company/${siteConfig.company.number}`,
        ...SISTER_BRAND_HOMEPAGES,
      ],
      serviceAreas: SERVICE_AREAS,
      knowsAbout: KNOWS_ABOUT,
      priceRange: "££",
      parentOrganization: {
        name: siteConfig.company.legalName,
        companyNumber: siteConfig.company.number,
      },
    }),
  );
}
