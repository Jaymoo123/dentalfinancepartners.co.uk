import { siteConfig } from "@/config/site";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${siteConfig.publisherLogoUrl}`,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "customer service",
      areaServed: "GB",
      availableLanguage: "en",
    },
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
