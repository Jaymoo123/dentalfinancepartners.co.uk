import { niche, getSiteUrl } from "./niche-loader";

const office = niche.company!.registered_office;
const registeredOfficeLine = [office.line1, office.line2, office.city, office.postcode]
  .filter(Boolean)
  .join(", ");

const partner = niche.partner;

const leadConsentText = partner
  ? `I agree to my details being shared by ${niche.display_name} with our specialist partner firm ${partner.name}, an independent data controller that uses them under its own privacy policy, to respond to my enquiry and provide specialist advice, including contacting me about it by email, phone and text message. I can ask them to stop at any time by replying STOP or clicking unsubscribe.`
  : `I agree to ${niche.display_name} using my details to respond to my enquiry and provide the advice I have requested, including contacting me about it by email, phone and text message. I can ask them to stop at any time by replying STOP or clicking unsubscribe.`;

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
