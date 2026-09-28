import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { buildOrganization } from "@accounting-network/web-shared/schema";

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
    // Preserve the hand-rolled "Organization" @type as AccountingService,
    // matching Property's port (shared builder defaults to ProfessionalService
    // when this is omitted).
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
    // answer engines and knowledge graphs resolve the firm to a real entity.
    sameAs: [
      `https://find-and-update.company-information.service.gov.uk/company/${siteConfig.company.number}`,
    ],
    knowsAbout: [
      "SRA Accounts Rules compliance",
      "Trust accounting for solicitors",
      "Law firm partnership tax",
      "LLP conversion planning",
      "Sole practitioner tax returns",
      "Practice succession planning",
      "Legal practice finance and cash flow",
      "Solicitor bookkeeping and VAT compliance",
    ],
    parentOrganization: {
      name: siteConfig.company.legalName,
      companyNumber: siteConfig.company.number,
    },
  });
}
