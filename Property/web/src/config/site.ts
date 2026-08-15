/**
 * Site Config - Now loaded dynamically from niche.config.json
 * This allows centralized management while keeping niche-specific settings.
 */
import { niche, getSiteUrl } from "./niche-loader";

// Guarded: 7 prod client_error rows showed niche.company undefined in some
// client bundles (partial chunk load). Fall back to empties so the page renders.
const company = (niche?.company ?? {}) as Partial<typeof niche.company>;
const office = (company.registered_office ?? {}) as Partial<
  NonNullable<typeof niche.company>["registered_office"]
>;
const registeredOfficeLine = [office.line1, office.line2, office.city, office.postcode]
  .filter(Boolean)
  .join(", "); // "20 Ashfield Avenue, Shipley, Bradford, BD18 3AL"

// CATEGORY-ROUTING MODEL: partner recipients are disclosed as a category ("a firm
// from our specialist partner network"), never named on-site. The receiving firm
// identifies itself to the enquirer under its own Article 14 notice at first
// contact. The canonical category shape lives in niche.config.json `partner`.

// Lead-form enquiry wording (each form appends "See our Privacy Policy."). This is
// the estate-standard point-of-collection notice; its wording mirrors the standing
// DSA_TEMPLATE Annex B.2. The rendered form text and stored consent_text row both
// equal it verbatim once the trailing link is appended.
const leadConsentText = `${niche.display_name} will use your details to respond to your enquiry. To answer it, your details may be shared with regulated firms from our specialist partner network, who may contact you directly about it. More than one firm may take up your enquiry: up to three firms in the profession you are asking about, and up to three in related professions such as brokers, solicitors and advisers. ${niche.display_name} may be paid a fee by a firm your enquiry is passed to. You can object at any time. By submitting this enquiry you confirm you understand this.`;
// Email-only sign-ups (resource downloads) are NOT shared with any partner firm.
// They keep a tick-to-consent box with their own wording,
// which must never mention the partner. Forms append "See our Privacy Policy."
const resourceConsentText = `I agree to ${niche.display_name} using my email to send me the resource I requested.`;

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
  // It is intentionally NOT displayed publicly (public contact goes via /contact).
  contact: niche.contact,
  nav: niche.navigation,
  footer: niche.footer_links,
  locations: niche.locations,
  // Registered company / legal entity. Single source of truth = niche.config.json.
  // Property Tax Partners (and every estate brand) is a trading name of Ashfield Trading Ltd.
  company: {
    legalName: niche.legal_name, // "Ashfield Trading Ltd"
    tradingName: niche.display_name, // brand, e.g. "Property Tax Partners"
    number: company.number,
    placeOfRegistration: company.place_of_registration,
    registeredOffice: office,
    registeredOfficeLine,
    enquiryRetentionMonths: company.enquiry_retention_months, // change retention in one place
    // VAT: Ashfield Trading Ltd is NOT VAT-registered yet. When it registers, set
    // "company.vat_number" in niche.config.json and wire it where a VAT number should display.
    vatNumber: company.vat_number ?? null,
    // Companies-disclosure line for the footer (Companies Act 2006 / e-commerce regs).
    legalDisclosure:
      `${niche.display_name} is a trading name of ${niche.legal_name}, a company registered in ` +
      `${company.place_of_registration} (company no. ${company.number}). ` +
      `Registered office: ${registeredOfficeLine}.`,
  },
  // Partner category enquiries are shared with (see category-routing note above).
  // Null only if a niche has no partner block at all (handled-in-house sites).
  partner: niche.partner
    ? { name: niche.partner.name, privacyPolicyUrl: niche.partner.privacy_policy_url ?? null }
    : null,
  // Canonical lead-form acknowledgement text (see derivation above). Forms append the link.
  leadConsentText,
  // Consent text for email-only resource downloads (never names the partner). Forms append the link.
  resourceConsentText,
} as const;

export type LocationEntry = (typeof siteConfig.locations)[number];
