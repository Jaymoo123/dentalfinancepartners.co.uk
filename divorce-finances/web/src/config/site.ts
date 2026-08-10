/**
 * Site Config - Now loaded dynamically from niche.config.json
 * This allows centralized management while keeping niche-specific settings.
 */
import { niche, getSiteUrl } from "./niche-loader";

const office = niche.company!.registered_office;
const registeredOfficeLine = [office.line1, office.line2, office.city, office.postcode]
  .filter(Boolean)
  .join(", "); // "20 Ashfield Avenue, Shipley, Bradford, BD18 3AL"

// Partner-network category label (never a named firm). Single source of truth.
const partner = niche.partner ?? null;
// Lead-form consent wording WITHOUT the trailing "See our Privacy Policy." link
// (each form appends that).
// Divorce-finances runs a referral lead model: enquiries are passed to a vetted
// specialist family law firm or accredited mediator, and a referral fee may be
// received. The lead-gen regulatory position (LASPO PI-only ban does not apply to
// family; FCA CMC regime excludes family) permits this, CONDITIONAL on the fee
// disclosure sitting inside this notice. That disclosure is mandatory and
// brand-neutral (no firm named until G1). Do not revert to the generic in-house
// wording for this site.
const leadConsentText =
  `${niche.display_name} will use your details to respond to your enquiry. To answer it, your details may be shared with a relevant regulated professional firm from our specialist partner network (for example a specialist family law firm or accredited mediator), who may contact you directly about your enquiry. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. ${niche.display_name} may receive a fee from the firm it introduces you to. By submitting this enquiry you confirm you understand this.`;

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
  // NOTE: contact.email and contact.phone are internal-routing values only (e.g.
  // nurture reply-to). They are intentionally NOT displayed publicly and are never
  // emitted in JSON-LD. Public contact goes via the /contact form only.
  contact: niche.contact,
  nav: niche.navigation,
  footer: niche.footer_links,
  locations: niche.locations,
  // Registered company / legal entity. Single source of truth = niche.config.json.
  // Every estate brand is a trading name of Ashfield Trading Ltd.
  company: {
    legalName: niche.legal_name, // "Ashfield Trading Ltd"
    tradingName: niche.display_name, // brand trading name
    number: niche.company!.number,
    placeOfRegistration: niche.company!.place_of_registration,
    registeredOffice: niche.company!.registered_office,
    registeredOfficeLine,
    enquiryRetentionMonths: niche.company!.enquiry_retention_months, // change retention in one place
    // VAT: Ashfield Trading Ltd is NOT VAT-registered yet. When it registers, set
    // "company.vat_number" in niche.config.json and wire it where a VAT number should display.
    vatNumber: niche.company!.vat_number ?? null,
    // Companies-disclosure line for the footer (Companies Act 2006 / e-commerce regs).
    legalDisclosure:
      `${niche.display_name} is a trading name of ${niche.legal_name}, a company registered in ` +
      `${niche.company!.place_of_registration} (company no. ${niche.company!.number}). ` +
      `Registered office: ${registeredOfficeLine}.`,
  },
  // Partner-network category label enquiries are shared under (never a named firm).
  partner: partner
    ? { name: partner.name, privacyPolicyUrl: partner.privacy_policy_url ?? null }
    : null,
  // Canonical lead-form consent text (see derivation above). Forms append the link.
  leadConsentText,
  // In-house resource-gate consent text. Derived independently of the partner branch
  // so a resource download is never framed as a data-share with a third-party firm.
  resourceConsentText:
    `I agree to ${niche.display_name} using my details to send me the free resource I have requested and to respond to any enquiry I submit.`,
} as const;

export type LocationEntry = (typeof siteConfig.locations)[number];
