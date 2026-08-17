import { niche, getSiteUrl } from "./niche-loader";

const office = niche.company!.registered_office;
const registeredOfficeLine = [office.line1, office.line2, office.city, office.postcode]
  .filter(Boolean)
  .join(", ");

const partner = niche.partner;

// Lead-form notice WITHOUT the trailing "See our Privacy Policy." link (each form
// appends that). IN-HOUSE: enquiries are answered by us and are not shared with any
// partner firm. Reverted estate-wide 2026-08-17 (owner instruction) from the
// 2026-08-15 pool-model sharing notice; production had LEADS_NOTIFY_CC unset, so no
// lead was ever routed under it. If sharing is ever switched back on, this notice AND
// the privacy policy must disclose it BEFORE the first lead is routed.
const leadConsentText =
  "Pharmacy Tax will use your details to respond to your enquiry and to contact you about it. You can object at any time.";

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
