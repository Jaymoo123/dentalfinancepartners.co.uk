/**
 * Site Config - Now loaded dynamically from niche.config.json
 * This allows centralized management while keeping niche-specific settings.
 */
import { niche, getSiteUrl } from "./niche-loader";

const office = niche.company.registered_office;
const registeredOfficeLine = [office.line1, office.line2, office.city, office.postcode]
  .filter(Boolean)
  .join(", "); // "20 Ashfield Avenue, Shipley, Bradford, BD18 3AL"

// Specialist partner firm that enquiries are shared with. Single source of truth.
// null = enquiries are handled in-house and NOT shared with any third-party firm.
const partner = niche.partner;
// Lead-form consent wording WITHOUT the trailing "See our Privacy Policy." link
// (each form appends that). Driven by `partner` so the policy and the forms can
// never drift, and so re-adding a partner later is a one-line config change.
const leadConsentText = partner
  ? `I agree to my details being shared by ${niche.display_name} with our specialist partner firm ${partner.name}, an independent data controller that uses them under its own privacy policy, to respond to my enquiry and provide specialist advice.`
  : `I agree to ${niche.display_name} using my details to respond to my enquiry and provide the advice I have requested.`;

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
  // NOTE: contact.email is an internal-routing value only (e.g. nurture reply-to).
  // It is intentionally NOT displayed publicly — public contact goes via /contact.
  contact: niche.contact,
  nav: niche.navigation,
  footer: niche.footer_links,
  locations: niche.locations,
  // Registered company / legal entity. Single source of truth = niche.config.json.
  // Agency Founder Finance (and every estate brand) is a trading name of Ashfield Trading Ltd.
  company: {
    legalName: niche.legal_name, // "Ashfield Trading Ltd"
    tradingName: niche.display_name, // brand, e.g. "Agency Founder Finance"
    number: niche.company.number,
    placeOfRegistration: niche.company.place_of_registration,
    registeredOffice: niche.company.registered_office,
    registeredOfficeLine,
    enquiryRetentionMonths: niche.company.enquiry_retention_months, // change retention in one place
    // VAT: Ashfield Trading Ltd is NOT VAT-registered yet. When it registers, set
    // "company.vat_number" in niche.config.json and wire it where a VAT number should display.
    vatNumber: niche.company.vat_number ?? null,
    // Companies-disclosure line for the footer (Companies Act 2006 / e-commerce regs).
    legalDisclosure:
      `${niche.display_name} is a trading name of ${niche.legal_name}, a company registered in ` +
      `${niche.company.place_of_registration} (company no. ${niche.company.number}). ` +
      `Registered office: ${registeredOfficeLine}.`,
  },
  // Specialist partner firm enquiries are shared with (null = handled in-house).
  partner: partner
    ? { name: partner.name, privacyPolicyUrl: partner.privacy_policy_url ?? null }
    : null,
  // Canonical lead-form consent text (see derivation above). Forms append the link.
  leadConsentText,
  // In-house resource-gate consent text. Derived from the display name ONLY (never
  // the partner branch). Resource downloads are NOT shared with the partner firm.
  // Used by ResourceGate; must NOT contain the partner name "Reflex Accounting".
  resourceConsentText: `I agree to Agency Founder Finance using my details to send me the free resource I have requested and to respond to any enquiry I submit.`,
} as const;

export type LocationEntry = (typeof siteConfig.locations)[number];
