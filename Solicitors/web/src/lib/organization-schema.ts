import { siteConfig } from "@/config/site";

export function buildOrganizationJsonLd() {
  const office = siteConfig.company.registeredOffice;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    // Registered legal entity vs the public-facing trading name (brand).
    legalName: siteConfig.company.legalName,
    alternateName: siteConfig.company.tradingName,
    // When Ashfield Trading Ltd becomes VAT-registered, add: vatID: siteConfig.company.vatNumber
    url: siteConfig.url,
    // sameAs links the trading brand to its authoritative public record so AI
    // answer engines and knowledge graphs resolve the firm to a real entity.
    sameAs: [
      `https://find-and-update.company-information.service.gov.uk/company/${siteConfig.company.number}`,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${office.line1}, ${office.line2}`,
      addressLocality: office.city,
      postalCode: office.postcode,
      addressCountry: "GB",
    },
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${siteConfig.publisherLogoUrl}`,
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    description: siteConfig.description,
    slogan: siteConfig.tagline,
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
  };
}
