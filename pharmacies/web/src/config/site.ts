import { niche, getSiteUrl } from "./niche-loader";

const office = niche.company!.registered_office;
const registeredOfficeLine = [office.line1, office.line2, office.city, office.postcode]
  .filter(Boolean)
  .join(", ");

const partner = niche.partner;

// Lead-form data-sharing acknowledgement (legitimate interests, notice-only).
// Static category wording, never a named firm; forms append "See our Privacy Policy."
const leadConsentText =
  "Pharmacy Tax will use your details to respond to your enquiry. To answer it, your details may be shared with a relevant regulated firm from our specialist partner network, who may contact you directly about your enquiry. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this.";

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
  company: {
    legalName: niche.legal_name,
    tradingName: niche.display_name,
    number: niche.company!.number,
    placeOfRegistration: niche.company!.place_of_registration,
    registeredOffice: niche.company!.registered_office,
    registeredOfficeLine,
    enquiryRetentionMonths: niche.company!.enquiry_retention_months,
    vatNumber: niche.company!.vat_number ?? null,
    legalDisclosure:
      `${niche.display_name} is a trading name of ${niche.legal_name}, a company registered in ` +
      `${niche.company!.place_of_registration} (company no. ${niche.company!.number}). ` +
      `Registered office: ${registeredOfficeLine}.`,
  },
  partner: partner
    ? { name: partner.name, privacyPolicyUrl: partner.privacy_policy_url ?? null }
    : null,
  leadConsentText,
} as const;
