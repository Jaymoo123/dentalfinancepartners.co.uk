import { siteConfig } from "@/config/site";
import { buildOrganization } from "@accounting-network/web-shared/schema";

// Audience-page metadata titles (the nine /for-* pages), used as knowsAbout so
// the canonical Organization node advertises the same specialisms Google
// already indexes as page titles.
const AUDIENCE_PAGE_TITLES = [
  "Accountant for Hospital Consultants | NHS & Private Tax",
  "Accountants for GP Partners | Partner Tax & Drawings",
  "GP Practice Accountants | Partnership Accounts & Partner Tax",
  "Accountants for Junior Doctors | Locum & Student Loans",
  "Accountants for Locum Doctors | Locum Accountant, IR35 & Tax",
  "Accountants for Doctors With a Limited Company",
  "Accountants for NHS Doctors and GP Partners",
  "NHS Pension Retirement for Doctors | Accountants",
  "Accountants for Salaried GPs | Locum Income & Tax",
];

// Sister-brand homepages (same opco, Ashfield Trading Ltd) added alongside the
// Companies House filing so sameAs ties the estate together, not just this
// one entity record.
const SISTER_BRAND_HOMEPAGES = [
  "https://www.propertytaxpartners.co.uk",
  "https://www.contractortaxaccountants.co.uk",
  "https://www.carehometax.co.uk",
  "https://www.trusteetax.co.uk",
];

export function buildOrganizationJsonLd() {
  const office = siteConfig.company.registeredOffice;
  return buildOrganization({
    siteUrl: siteConfig.url,
    siteName: siteConfig.name,
    legalName: siteConfig.company.legalName,
    alternateName: siteConfig.company.tradingName,
    description: siteConfig.description,
    tagline: siteConfig.tagline,
    // Preserve the hand-rolled "Organization" @type (shared builder defaults
    // to ProfessionalService when this is omitted).
    organizationType: "Organization",
    publisherLogoUrl: siteConfig.publisherLogoUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${office.line1}, ${office.line2}`,
      addressLocality: office.city,
      postalCode: office.postcode,
      addressCountry: "GB",
    },
    // Only verifiable records: the Companies House filing plus sister-brand
    // homepages under the same opco. No LinkedIn URL exists in config.
    sameAs: [
      `https://find-and-update.company-information.service.gov.uk/company/${siteConfig.company.number}`,
      ...SISTER_BRAND_HOMEPAGES,
    ],
    knowsAbout: AUDIENCE_PAGE_TITLES,
    parentOrganization: {
      name: siteConfig.company.legalName,
      companyNumber: siteConfig.company.number,
    },
  });
}
