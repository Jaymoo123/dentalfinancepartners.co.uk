import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { buildOrganization } from "@accounting-network/web-shared/schema";

// Sister-brand homepages (same opco, Ashfield Trading Ltd) added alongside the
// Companies House filing so sameAs ties the estate together, not just this
// one entity record. Pattern from Property/web/src/lib/organization-schema.ts.
const SISTER_BRAND_HOMEPAGES = [
  "https://www.propertytaxpartners.co.uk",
  "https://www.medicalaccounts.co.uk",
  "https://www.contractortaxaccountants.co.uk",
  "https://www.carehometax.co.uk",
];

export function buildOrganizationJsonLd() {
  const office = siteConfig.company.registeredOffice;
  return buildOrganization({
    siteUrl: siteConfig.url,
    siteName: siteConfig.name,
    legalName: siteConfig.company.legalName,
    alternateName: siteConfig.company.tradingName,
    // When Ashfield Trading Ltd becomes VAT-registered, add: vatID: siteConfig.company.vatNumber
    // What the entity IS, not the marketing meta: the firm-first sentence
    // from niche.config.json entity.firm.
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
    // sameAs links the trading brand to its authoritative public record so AI
    // answer engines and knowledge graphs resolve the firm to a real entity,
    // plus sister-brand homepages under the same opco.
    sameAs: [
      `https://find-and-update.company-information.service.gov.uk/company/${siteConfig.company.number}`,
      ...SISTER_BRAND_HOMEPAGES,
    ],
    knowsAbout: [
      "NHS dental contract reporting",
      "Associate and locum dentist tax",
      "IR35 status for dental associates",
      "Dental practice purchase and sale",
      "NHS Pension annual allowance and McCloud remedy",
      "Dental practice VAT",
      "Profit extraction for dental practice owners",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      areaServed: "GB",
      availableLanguage: "en",
      url: `${siteConfig.url}/contact`,
    },
    parentOrganization: {
      name: siteConfig.company.legalName,
      companyNumber: siteConfig.company.number,
    },
  });
}
