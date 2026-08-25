/**
 * Site Config - loaded dynamically from niche.config.json.
 * Ashfield Trading is the PARENT entity: this is the corporate site, not a niche brand,
 * so display name and legal entity are the same company (no trading-name split).
 */
import { niche, getSiteUrl } from "./niche-loader";

const office = niche.company.registered_office;
const registeredOfficeLine = [office.line1, office.line2, office.city, office.postcode]
  .filter(Boolean)
  .join(", "); // "20 Ashfield Avenue, Shipley, Bradford, BD18 3AL"

export const siteConfig = {
  name: niche.display_name,
  legalName: niche.legal_name,
  domain: niche.domain,
  tagline: niche.tagline,
  description: niche.description,
  locale: niche.seo.locale,
  get url() {
    return getSiteUrl();
  },
  publisherLogoUrl: niche.brand.publisher_logo_url,
  contact: niche.contact,
  nav: niche.navigation,
  footer: niche.footer_links,
  // Registered company / legal entity. Single source of truth = niche.config.json.
  company: {
    legalName: niche.legal_name, // "Ashfield Trading Ltd"
    tradingName: niche.display_name, // "Ashfield Trading"
    number: niche.company.number,
    placeOfRegistration: niche.company.place_of_registration,
    registeredOffice: niche.company.registered_office,
    registeredOfficeLine,
    enquiryRetentionMonths: niche.company.enquiry_retention_months,
    vatNumber: niche.company.vat_number ?? null,
    legalDisclosure:
      `${niche.display_name} is the trading style of ${niche.legal_name}, a company registered in ` +
      `${niche.company.place_of_registration} (company no. ${niche.company.number}). ` +
      `Registered office: ${registeredOfficeLine}.`,
  },
  // Parent entity handles enquiries in-house; never shared with a partner firm.
  partner: null,
  leadConsentText:
    "I agree to Ashfield Trading Ltd using my details to respond to my enquiry.",
} as const;
