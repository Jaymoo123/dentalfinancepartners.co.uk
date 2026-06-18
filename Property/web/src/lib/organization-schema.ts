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
    // No public telephone is advertised: enquiries are handled via the on-site
    // /contact form, so the ContactPoint (which would otherwise be empty) is omitted.
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    knowsAbout: [
      "Section 24 mortgage interest relief restriction",
      "Buy-to-let limited company incorporation",
      "Stamp Duty Land Tax",
      "Capital Gains Tax on residential property",
      "Making Tax Digital for Income Tax",
      "Non-resident landlord tax",
      "Furnished holiday lettings",
      "Property portfolio tax planning",
    ],
  };
}
