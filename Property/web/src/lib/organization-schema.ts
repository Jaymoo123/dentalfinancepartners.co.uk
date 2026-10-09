import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { audiences } from "@/data/audiences";
import { buildOrganization } from "@accounting-network/web-shared/schema";

// Audience-page metadata titles (the 15 /for/[slug] pages), used as knowsAbout
// so the canonical Organization node advertises the same specialisms Google
// already indexes as page titles.
const AUDIENCE_PAGE_TITLES = audiences.map((audience) => audience.title);

// Sister-brand homepages (same opco, Ashfield Trading Ltd) added alongside the
// Companies House filing so sameAs ties the estate together, not just this
// one entity record.
const SISTER_BRAND_HOMEPAGES = [
  "https://www.medicalaccounts.co.uk",
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
    // When Ashfield Trading Ltd becomes VAT-registered, add: vatID: siteConfig.company.vatNumber
    // What the entity IS, not the marketing meta: the firm-first sentence
    // from niche.config.json entity.firm.
    description: niche.entity?.firm ?? siteConfig.description,
    tagline: siteConfig.tagline,
    // Preserve the hand-rolled "Organization" @type (shared builder defaults
    // to ProfessionalService when this is omitted).
    organizationType: "AccountingService",
    publisherLogoUrl: siteConfig.publisherLogoUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${office.line1}, ${office.line2}`,
      addressLocality: office.city,
      postalCode: office.postcode,
      addressCountry: "GB",
    },
    // Public contact facts (owner, 2026-10-09; blueprint R27): the SMS nurture
    // number, to be swapped for a call-receiving one later, and the named
    // mailbox. Rendered in the lead panel and llms.txt; the same two strings
    // everywhere so the entity and the page agree.
    ...(niche.contact.phone ? { phone: niche.contact.phone } : {}),
    ...(niche.contact.public_email ? { email: niche.contact.public_email } : {}),
    // Only verifiable records: the Companies House filing plus sister-brand
    // homepages under the same opco. No LinkedIn URL exists in config.
    sameAs: [
      `https://find-and-update.company-information.service.gov.uk/company/${siteConfig.company.number}`,
      ...SISTER_BRAND_HOMEPAGES,
    ],
    knowsAbout: [
      ...new Set([
        ...AUDIENCE_PAGE_TITLES,
        "Section 24 mortgage interest relief restriction",
        "Buy-to-let limited company incorporation",
        "Stamp Duty Land Tax",
        "Capital Gains Tax on residential property",
        "Making Tax Digital for Income Tax",
        "Non-resident landlord tax",
        "Furnished holiday lettings",
        "Property portfolio tax planning",
      ]),
    ],
    parentOrganization: {
      name: siteConfig.company.legalName,
      companyNumber: siteConfig.company.number,
    },
  });
}
