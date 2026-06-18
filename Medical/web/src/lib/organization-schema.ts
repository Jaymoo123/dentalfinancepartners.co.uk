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
      "NHS pension annual allowance",
      "GP tax returns",
      "Locum doctor tax planning",
      "Private practice incorporation",
      "Medical expense claims",
      "GP partnership accounting",
      "Hospital consultant tax",
      "Making Tax Digital for Income Tax",
    ],
  };
}
